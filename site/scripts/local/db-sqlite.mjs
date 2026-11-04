// SQLite through Node's built-in driver. One file in DATA_DIR; tables are created on start, later columns are added when missing.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomBytes, createHash } from 'node:crypto';
import { config } from '../../src/config.mjs';
const dataDir = process.env.DATA_DIR || resolve(process.cwd(), 'site-data');

mkdirSync(dataDir, { recursive: true });
export const db = new DatabaseSync(resolve(dataDir, 'scutoria.db'));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS waitlist (
    email TEXT PRIMARY KEY,
    lang TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS hits (
    day TEXT NOT NULL,
    path TEXT NOT NULL,
    lang TEXT NOT NULL,
    ref TEXT NOT NULL,
    n INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, path, lang, ref)
  );
  CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    product TEXT NOT NULL,
    lang TEXT NOT NULL,
    answers TEXT NOT NULL,
    step INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    lang TEXT NOT NULL,
    stripe_customer_id TEXT,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS licences (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    product TEXT NOT NULL,
    starts_at TEXT NOT NULL,
    ends_at TEXT NOT NULL,
    pilot INTEGER NOT NULL DEFAULT 0,
    amount_cents INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'eur',
    checkout_session_id TEXT UNIQUE,
    reminder_sent_at TEXT,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tokens (
    hash TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    purpose TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS outbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS stripe_events (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS memo_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    memo TEXT NOT NULL,
    lang TEXT NOT NULL,
    level TEXT NOT NULL,
    waitlist INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
`);

// Columns added after the first version: a run belongs to a customer and can be a frozen version of another run.
function addColumn(table, column, ddl) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
  if (!cols.includes(column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
}
addColumn('runs', 'customer_id', 'TEXT');
addColumn('runs', 'frozen', 'INTEGER NOT NULL DEFAULT 0');
addColumn('runs', 'parent_id', 'TEXT');
addColumn('runs', 'version', 'TEXT');
addColumn('runs', 'label', 'TEXT');

const now = () => new Date().toISOString();
export const newId = (bytes = 12) => randomBytes(bytes).toString('base64url');
const sha256 = (s) => createHash('sha256').update(s).digest('hex');

// ---------- runs ----------
// A run is one pass through a toolkit's questionnaire; answers are stored as JSON. A frozen run is a dated copy that no longer changes.
const insertRun = db.prepare('INSERT INTO runs (id, product, lang, answers, step, created_at, updated_at, customer_id, frozen, parent_id, version, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const selectRun = db.prepare('SELECT id, product, lang, answers, step, created_at, updated_at, customer_id, frozen, parent_id, version, label FROM runs WHERE id = ?');
const updateRun = db.prepare('UPDATE runs SET answers = ?, step = ?, updated_at = ? WHERE id = ? AND frozen = 0');
const attachRunStmt = db.prepare('UPDATE runs SET customer_id = ? WHERE id = ? AND customer_id IS NULL');
const selectRunsOf = db.prepare('SELECT id, product, lang, answers, step, created_at, updated_at, customer_id, frozen, parent_id, version, label FROM runs WHERE customer_id = ? AND product = ? AND frozen = 0 ORDER BY updated_at DESC');
const selectVersionsOf = db.prepare('SELECT id, product, lang, answers, step, created_at, updated_at, customer_id, frozen, parent_id, version, label FROM runs WHERE parent_id = ? AND frozen = 1 ORDER BY created_at DESC');
const parse = (row) => (row ? { ...row, answers: JSON.parse(row.answers) } : null);

export function createRun(id, product, lang, answers, customerId = null) {
  const t = now();
  insertRun.run(id, product, lang, JSON.stringify(answers), 1, t, t, customerId, 0, null, null, null);
}
export function getRun(id) {
  return parse(selectRun.get(id));
}
export function saveRun(id, answers, step) {
  updateRun.run(JSON.stringify(answers), step, now(), id);
}
export function attachRun(id, customerId) {
  attachRunStmt.run(customerId, id);
}
export function listRuns(customerId, product) {
  return selectRunsOf.all(customerId, product).map(parse);
}
export function listVersions(parentId) {
  return selectVersionsOf.all(parentId).map(parse);
}
// Freezes a run: a copy with its own id, the toolkit version and a label; the original keeps changing.
export function freezeRun(run, version, label) {
  const id = newId(9);
  const t = now();
  insertRun.run(id, run.product, run.lang, JSON.stringify(run.answers), run.step, t, t, run.customer_id, 1, run.id, version, label);
  return getRun(id);
}

// ---------- customers ----------
const selectCustomer = db.prepare('SELECT id, email, lang, stripe_customer_id, created_at FROM customers WHERE id = ?');
const selectCustomerByEmail = db.prepare('SELECT id, email, lang, stripe_customer_id, created_at FROM customers WHERE email = ?');
const insertCustomer = db.prepare('INSERT INTO customers (id, email, lang, created_at) VALUES (?, ?, ?, ?)');
const updateStripeCustomer = db.prepare('UPDATE customers SET stripe_customer_id = ? WHERE id = ?');
export const normaliseEmail = (email) => String(email ?? '').trim().toLowerCase();
export function getCustomer(id) {
  return selectCustomer.get(id) ?? null;
}
export function getCustomerByEmail(email) {
  return selectCustomerByEmail.get(normaliseEmail(email)) ?? null;
}
export function findOrCreateCustomer(email, lang) {
  const e = normaliseEmail(email);
  const found = selectCustomerByEmail.get(e);
  if (found) return found;
  const id = newId();
  insertCustomer.run(id, e, lang, now());
  return selectCustomer.get(id);
}
export function setStripeCustomer(id, stripeCustomerId) {
  updateStripeCustomer.run(stripeCustomerId, id);
}

// ---------- tokens (email links): only the hash is stored, one use, limited life ----------
const insertToken = db.prepare('INSERT INTO tokens (hash, customer_id, purpose, expires_at) VALUES (?, ?, ?, ?)');
const selectToken = db.prepare('SELECT hash, customer_id, purpose, expires_at, used_at FROM tokens WHERE hash = ?');
const useToken = db.prepare('UPDATE tokens SET used_at = ? WHERE hash = ? AND used_at IS NULL');
export function createToken(customerId, purpose = 'login', ttlMinutes = 30) {
  const raw = randomBytes(32).toString('base64url');
  insertToken.run(sha256(raw), customerId, purpose, new Date(Date.now() + ttlMinutes * 60_000).toISOString());
  return raw;
}
export function consumeToken(raw, purpose = 'login') {
  const row = selectToken.get(sha256(String(raw ?? '')));
  if (!row || row.purpose !== purpose || row.used_at || row.expires_at < now()) return null;
  useToken.run(now(), row.hash);
  return getCustomer(row.customer_id);
}

// ---------- sessions (cookie) ----------
const insertSession = db.prepare('INSERT INTO sessions (id, customer_id, expires_at, created_at) VALUES (?, ?, ?, ?)');
const selectSession = db.prepare('SELECT id, customer_id, expires_at FROM sessions WHERE id = ?');
const deleteSessionStmt = db.prepare('DELETE FROM sessions WHERE id = ?');
export const SESSION_DAYS = 30;
export function createSession(customerId) {
  const id = randomBytes(32).toString('base64url');
  insertSession.run(id, customerId, new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString(), now());
  return id;
}
export function getSession(id) {
  const row = selectSession.get(String(id ?? ''));
  if (!row) return null;
  if (row.expires_at < now()) { deleteSessionStmt.run(row.id); return null; }
  const customer = getCustomer(row.customer_id);
  return customer ? { id: row.id, customer } : null;
}
export function deleteSession(id) {
  deleteSessionStmt.run(String(id ?? ''));
}

// ---------- licences ----------
const insertLicence = db.prepare('INSERT INTO licences (id, customer_id, product, starts_at, ends_at, pilot, amount_cents, currency, checkout_session_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const selectLicence = db.prepare('SELECT * FROM licences WHERE id = ?');
const selectLicenceBySession = db.prepare('SELECT * FROM licences WHERE checkout_session_id = ?');
const selectLicencesOf = db.prepare('SELECT * FROM licences WHERE customer_id = ? ORDER BY ends_at DESC');
const countLicencesStmt = db.prepare('SELECT COUNT(*) AS n FROM licences WHERE product = ?');
const selectDue = db.prepare('SELECT * FROM licences WHERE reminder_sent_at IS NULL AND ends_at > ? AND ends_at <= ?');
const markReminderStmt = db.prepare('UPDATE licences SET reminder_sent_at = ? WHERE id = ?');
export function createLicence({ customerId, product, months = 12, pilot = false, amountCents = 0, currency = 'eur', checkoutSessionId = null }) {
  const id = newId(9);
  const start = new Date();
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + months);
  insertLicence.run(id, customerId, product, start.toISOString(), end.toISOString(), pilot ? 1 : 0, amountCents, currency, checkoutSessionId, now());
  return selectLicence.get(id);
}
export function licenceBySession(sessionId) {
  return selectLicenceBySession.get(String(sessionId ?? '')) ?? null;
}
export function licencesOf(customerId) {
  return selectLicencesOf.all(customerId);
}
export function hasLicence(customerId, product) {
  const t = now();
  return selectLicencesOf.all(customerId).some((l) => l.product === product && l.ends_at > t);
}
export function countLicences(product) {
  return countLicencesStmt.get(product).n;
}
export function licencesDueForReminder(days = 14) {
  return selectDue.all(now(), new Date(Date.now() + days * 86_400_000).toISOString());
}
export function markReminder(id) {
  markReminderStmt.run(now(), id);
}

// ---------- outbox: what was sent, or what could not be sent ----------
const insertMail = db.prepare('INSERT INTO outbox (to_email, subject, body, status, created_at) VALUES (?, ?, ?, ?, ?)');
const selectLastMail = db.prepare('SELECT id, to_email, subject, body, status, created_at FROM outbox WHERE to_email = ? ORDER BY id DESC LIMIT 1');
export function saveMail(to, subject, body, status) {
  insertMail.run(normaliseEmail(to), subject, body, status, now());
}
export function lastMailTo(email) {
  return selectLastMail.get(normaliseEmail(email)) ?? null;
}

// ---------- Stripe events seen, so that a retried webhook changes nothing ----------
const insertEvent = db.prepare('INSERT OR IGNORE INTO stripe_events (id, type, created_at) VALUES (?, ?, ?)');
export function recordStripeEvent(id, type) {
  return insertEvent.run(id, type, now()).changes > 0;
}

// ---------- waitlist and hits ----------
const insertWaitlist = db.prepare('INSERT OR IGNORE INTO waitlist (email, lang, created_at) VALUES (?, ?, ?)');
export function addToWaitlist(email, lang) {
  insertWaitlist.run(normaliseEmail(email), lang, now());
}

// ---------- memo contacts: who asked for a memo by email (E11), and whether they also want the notice about the next toolkit ----------
const insertMemoContact = db.prepare('INSERT INTO memo_contacts (email, memo, lang, level, waitlist, created_at) VALUES (?, ?, ?, ?, ?, ?)');
export function addMemoContact(email, memo, lang, level, waitlist) {
  insertMemoContact.run(normaliseEmail(email), memo, lang, level, waitlist ? 1 : 0, now());
  if (waitlist) addToWaitlist(email, lang);
}
export function countMemoContacts(memo) {
  return db.prepare('SELECT COUNT(*) AS n FROM memo_contacts WHERE memo = ?').get(memo).n;
}

const upsertHit = db.prepare('INSERT INTO hits (day, path, lang, ref, n) VALUES (?, ?, ?, ?, 1) ON CONFLICT(day, path, lang, ref) DO UPDATE SET n = n + 1');
// Counts a page view without any personal data: no IP address, no user agent, no cookie.
export function countHit(path, lang, referer) {
  let ref = '';
  try { ref = referer ? new URL(referer).hostname : ''; } catch { ref = ''; }
  upsertHit.run(now().slice(0, 10), path, lang, ref);
}

export function hitsSince(day) {
  return db.prepare('SELECT day, path, lang, ref, n FROM hits WHERE day >= ? ORDER BY day DESC, n DESC').all(day);
}
