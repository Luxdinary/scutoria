// Storage on Lovable Cloud (Postgres), reached only from server code with the service-role key.
// Same exported names and semantics as the SQLite reference, but every function is async.
// Tables: waitlist, hits, runs, customers, licences, tokens, sessions, outbox, stripe_events, memo_contacts.
import { randomBytes } from 'node:crypto';

async function db() {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  return supabaseAdmin;
}

const now = () => new Date().toISOString();
// Timestamps are compared as Date values, never as strings: the database may return +00:00 where the code writes Z.
const ms = (v) => (v ? new Date(v).getTime() : NaN);
const past = (v) => !(ms(v) > Date.now());
export const newId = (bytes = 12) => randomBytes(bytes).toString('base64url');
export const normaliseEmail = (email) => String(email ?? '').trim().toLowerCase();
export const SESSION_DAYS = 30;

async function sha256(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function must(result) {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

// ---------- runs ----------
// A run is one pass through a toolkit's questionnaire; answers are stored as JSON. A frozen run is a dated copy that no longer changes.
export async function createRun(id, product, lang, answers, customerId = null, kind = null) {
  const t = now();
  must(await (await db()).from('runs').insert({ id, product, lang, answers, step: 1, created_at: t, updated_at: t, customer_id: customerId, frozen: 0, parent_id: null, version: null, label: kind }));
}
export async function getRun(id) {
  const row = must(await (await db()).from('runs').select('*').eq('id', id).maybeSingle());
  return row ?? null;
}
export async function saveRun(id, answers, step) {
  must(await (await db()).from('runs').update({ answers, step, updated_at: now() }).eq('id', id).eq('frozen', 0));
}
export async function attachRun(id, customerId) {
  must(await (await db()).from('runs').update({ customer_id: customerId }).eq('id', id).is('customer_id', null));
}
export async function listRuns(customerId, product) {
  return must(await (await db()).from('runs').select('*').eq('customer_id', customerId).eq('product', product).eq('frozen', 0).order('updated_at', { ascending: false }));
}
export async function listVersions(parentId) {
  return must(await (await db()).from('runs').select('*').eq('parent_id', parentId).eq('frozen', 1).order('created_at', { ascending: false }));
}
// Freezes a run: a copy with its own id, the toolkit version and a label; the original keeps changing.
export async function freezeRun(run, version, label) {
  const id = newId(9);
  const t = now();
  must(await (await db()).from('runs').insert({ id, product: run.product, lang: run.lang, answers: run.answers, step: run.step, created_at: t, updated_at: t, customer_id: run.customer_id, frozen: 1, parent_id: run.id, version, label }));
  return getRun(id);
}

// ---------- customers ----------
export async function getCustomer(id) {
  return must(await (await db()).from('customers').select('id, email, lang, stripe_customer_id, created_at').eq('id', id).maybeSingle()) ?? null;
}
export async function getCustomerByEmail(email) {
  return must(await (await db()).from('customers').select('id, email, lang, stripe_customer_id, created_at').eq('email', normaliseEmail(email)).maybeSingle()) ?? null;
}
export async function findOrCreateCustomer(email, lang) {
  const e = normaliseEmail(email);
  const found = await getCustomerByEmail(e);
  if (found) return found;
  const id = newId();
  const { error } = await (await db()).from('customers').insert({ id, email: e, lang, created_at: now() });
  // A parallel request may have created the same address first; then read that row.
  if (error) {
    const again = await getCustomerByEmail(e);
    if (again) return again;
    throw new Error(error.message);
  }
  return getCustomer(id);
}
export async function setStripeCustomer(id, stripeCustomerId) {
  must(await (await db()).from('customers').update({ stripe_customer_id: stripeCustomerId }).eq('id', id));
}

// ---------- tokens (email links): only the hash is stored, one use, limited life ----------
export async function createToken(customerId, purpose = 'login', ttlMinutes = 30) {
  const raw = randomBytes(32).toString('base64url');
  must(await (await db()).from('tokens').insert({ hash: await sha256(raw), customer_id: customerId, purpose, expires_at: new Date(Date.now() + ttlMinutes * 60_000).toISOString() }));
  return raw;
}
export async function consumeToken(raw, purpose = 'login') {
  const hash = await sha256(String(raw ?? ''));
  const row = must(await (await db()).from('tokens').select('*').eq('hash', hash).maybeSingle());
  if (!row || row.purpose !== purpose || row.used_at || past(row.expires_at)) return null;
  // Single use, atomic: the update only lands while used_at is still null; a parallel request updates nothing and gets null.
  const updated = must(await (await db()).from('tokens').update({ used_at: now() }).eq('hash', hash).is('used_at', null).select('customer_id'));
  if (!updated.length) return null;
  return getCustomer(row.customer_id);
}

// ---------- sessions (cookie) ----------
export async function createSession(customerId) {
  const id = randomBytes(32).toString('base64url');
  must(await (await db()).from('sessions').insert({ id, customer_id: customerId, expires_at: new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString(), created_at: now() }));
  return id;
}
export async function getSession(id) {
  const row = must(await (await db()).from('sessions').select('id, customer_id, expires_at').eq('id', String(id ?? '')).maybeSingle());
  if (!row) return null;
  if (past(row.expires_at)) { await deleteSession(row.id); return null; }
  const customer = await getCustomer(row.customer_id);
  return customer ? { id: row.id, customer } : null;
}
export async function deleteSession(id) {
  must(await (await db()).from('sessions').delete().eq('id', String(id ?? '')));
}

// ---------- licences ----------
export async function createLicence({ customerId, product, months = 12, pilot = false, amountCents = 0, currency = 'eur', checkoutSessionId = null }) {
  const id = newId(9);
  const start = new Date();
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + months);
  const { error } = await (await db()).from('licences').insert({ id, customer_id: customerId, product, starts_at: start.toISOString(), ends_at: end.toISOString(), pilot: pilot ? 1 : 0, amount_cents: amountCents, currency, checkout_session_id: checkoutSessionId, created_at: now() });
  // A parallel fulfilment of the same session won the unique key: return its licence, marked as existing.
  if (error?.code === '23505' && checkoutSessionId) { const row = await licenceBySession(checkoutSessionId); if (row) return { ...row, existing: true }; }
  if (error) throw new Error(error.message);
  return must(await (await db()).from('licences').select('*').eq('id', id).single());
}
export async function licenceBySession(sessionId) {
  return must(await (await db()).from('licences').select('*').eq('checkout_session_id', String(sessionId ?? '')).maybeSingle()) ?? null;
}
export async function licencesOf(customerId) {
  return must(await (await db()).from('licences').select('*').eq('customer_id', customerId).order('ends_at', { ascending: false }));
}
export async function hasLicence(customerId, product) {
  const t = Date.now();
  return (await licencesOf(customerId)).some((l) => l.product === product && ms(l.ends_at) > t);
}
export async function countLicences(product) {
  const { count, error } = await (await db()).from('licences').select('*', { count: 'exact', head: true }).eq('product', product);
  if (error) throw new Error(error.message);
  return count ?? 0;
}
export async function licencesDueForReminder(days = 14) {
  const rows = must(await (await db()).from('licences').select('*'));
  const t = Date.now(), until = t + days * 86_400_000;
  return rows.filter((l) => !l.reminder_sent_at && ms(l.ends_at) > t && ms(l.ends_at) <= until &&
    !rows.some(newer => newer.customer_id === l.customer_id && newer.product === l.product && ms(newer.ends_at) > ms(l.ends_at)));
}
export async function claimReminder(id) {
  const rows = must(await (await db()).from('licences').update({ reminder_sent_at: now() }).eq('id', id).is('reminder_sent_at', null).select('id'));
  return rows.length === 1;
}
export async function verifyReminderToken(token) {
  if (!token) return false;
  const result = await (await db()).rpc('verify_reminder_cron_token', { p_token: token });
  return !result.error && result.data === true;
}
export async function markReminder(id) {
  must(await (await db()).from('licences').update({ reminder_sent_at: now() }).eq('id', id));
}

// ---------- outbox: what was sent, or what could not be sent ----------
export async function saveMail(to, subject, body, status) {
  must(await (await db()).from('outbox').insert({ to_email: normaliseEmail(to), subject, body, status, created_at: now() }));
}
export async function lastMailTo(email) {
  const rows = must(await (await db()).from('outbox').select('id, to_email, subject, body, status, created_at').eq('to_email', normaliseEmail(email)).order('id', { ascending: false }).limit(1));
  return rows[0] ?? null;
}

// ---------- Stripe events seen, so that a retried webhook changes nothing ----------
export async function recordStripeEvent(id, type) {
  const { error } = await (await db()).from('stripe_events').insert({ id, type, created_at: now() });
  if (!error) return true;
  if (error.code === '23505') return false; // duplicate event id
  throw new Error(error.message);
}

// A webhook whose fulfilment failed forgets its event id, so that Stripe's retry is processed.
export async function forgetStripeEvent(id) {
  must(await (await db()).from('stripe_events').delete().eq('id', String(id ?? '')));
}

// ---------- waitlist and hits ----------
export async function addToWaitlist(email, lang) {
  must(await (await db()).from('waitlist').upsert({ email: normaliseEmail(email), lang, created_at: now() }, { onConflict: 'email', ignoreDuplicates: true }));
}

// ---------- memo contacts: who asked for a memo by email (E11), and whether they also want the notice about the next toolkit ----------
export async function addMemoContact(email, memo, lang, level, waitlist) {
  must(await (await db()).from('memo_contacts').insert({ email: normaliseEmail(email), memo, lang, level, waitlist: waitlist ? 1 : 0, created_at: now() }));
  if (waitlist) await addToWaitlist(email, lang);
}
export async function countMemoContacts(memo) {
  const { count, error } = await (await db()).from('memo_contacts').select('*', { count: 'exact', head: true }).eq('memo', memo);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

// Counts a page view without any personal data: no IP address, no user agent, no cookie.
export async function countHit(path, lang, referer) {
  let ref = '';
  try { ref = referer ? new URL(referer).hostname : ''; } catch { ref = ''; }
  must(await (await db()).rpc('count_hit', { p_day: now().slice(0, 10), p_path: path, p_lang: lang, p_ref: ref }));
}

export async function hitsSince(day) {
  return must(await (await db()).from('hits').select('day, path, lang, ref, n').gte('day', day).order('day', { ascending: false }).order('n', { ascending: false }));
}

// ---------- rate limits (shared by every Worker isolate) ----------
// Allows one event when every key has fewer than its limit in the window, then records one event per key. Old rows are
// removed now and then. Keys are stored only as SHA-256 hashes, so no address is kept in clear.
export async function rateAllow(limits, windowMs = 3_600_000) {
  const client = await db();
  const since = new Date(Date.now() - windowMs).toISOString();
  const hashed = await Promise.all(limits.map(({ key }) => sha256(key)));
  for (let i = 0; i < limits.length; i++) {
    const { count, error } = await client.from('rate_events').select('*', { count: 'exact', head: true }).eq('key', hashed[i]).gte('at', since);
    if (error) throw new Error(error.message);
    if ((count ?? 0) >= limits[i].limit) return false;
  }
  must(await client.from('rate_events').insert(hashed.map((key) => ({ key }))));
  if (Math.random() < 0.05) await client.from('rate_events').delete().lt('at', new Date(Date.now() - 86_400_000).toISOString());
  return true;
}

// ---------- the preview test checkout (only without a Stripe key) ----------
export async function withdrawalRateAllow(email) {
  const key = await sha256(`withdrawal:${normaliseEmail(email)}`);
  return must(await (await db()).rpc('withdrawal_rate_allow', { p_key: key })) === true;
}

export async function saveTestCheckout(id, data) {
  must(await (await db()).from('test_checkouts').upsert({ id, data }));
}
export async function getTestCheckout(id) {
  const row = must(await (await db()).from('test_checkouts').select('data').eq('id', String(id ?? '')).maybeSingle());
  return row?.data ?? null;
}
