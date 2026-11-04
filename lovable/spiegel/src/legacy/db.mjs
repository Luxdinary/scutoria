// Storage on Lovable Cloud (Postgres), reached only from server code with the service-role key.
// Same exported names and semantics as the SQLite reference, but every function is async.
// Tables: waitlist, hits, runs, customers, licences, tokens, sessions, outbox, stripe_events, memo_contacts.
// Mirror of the Lovable project, commit 506c909 (23 Oct 2026). consumeToken is made atomic in the next stage.
import { randomBytes } from 'node:crypto';

async function db() {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  return supabaseAdmin;
}

const now = () => new Date().toISOString();
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
export async function createRun(id, product, lang, answers, customerId = null) {
  const t = now();
  must(await (await db()).from('runs').insert({ id, product, lang, answers, step: 1, created_at: t, updated_at: t, customer_id: customerId, frozen: 0, parent_id: null, version: null, label: null }));
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
  const row = must(await (await db()).from('tokens').select('*').eq('hash', await sha256(String(raw ?? ''))).maybeSingle());
  if (!row || row.purpose !== purpose || row.used_at || row.expires_at < now()) return null;
  must(await (await db()).from('tokens').update({ used_at: now() }).eq('hash', row.hash).is('used_at', null));
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
  if (row.expires_at < now()) { await deleteSession(row.id); return null; }
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
  must(await (await db()).from('licences').insert({ id, customer_id: customerId, product, starts_at: start.toISOString(), ends_at: end.toISOString(), pilot: pilot ? 1 : 0, amount_cents: amountCents, currency, checkout_session_id: checkoutSessionId, created_at: now() }));
  return must(await (await db()).from('licences').select('*').eq('id', id).single());
}
export async function licenceBySession(sessionId) {
  return must(await (await db()).from('licences').select('*').eq('checkout_session_id', String(sessionId ?? '')).maybeSingle()) ?? null;
}
export async function licencesOf(customerId) {
  return must(await (await db()).from('licences').select('*').eq('customer_id', customerId).order('ends_at', { ascending: false }));
}
export async function hasLicence(customerId, product) {
  const t = now();
  return (await licencesOf(customerId)).some((l) => l.product === product && l.ends_at > t);
}
export async function countLicences(product) {
  const { count, error } = await (await db()).from('licences').select('*', { count: 'exact', head: true }).eq('product', product);
  if (error) throw new Error(error.message);
  return count ?? 0;
}
export async function licencesDueForReminder(days = 14) {
  return must(await (await db()).from('licences').select('*').is('reminder_sent_at', null).gt('ends_at', now()).lte('ends_at', new Date(Date.now() + days * 86_400_000).toISOString()));
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
