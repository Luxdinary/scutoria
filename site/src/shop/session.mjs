// Who is signed in: a cookie with a random session id, nothing else. Same-origin checks for every form that changes state.
import { config } from '../config.mjs';
import { getSession, createSession, deleteSession, hasLicence, getCustomer } from '../db.mjs';

export function parseCookies(req) {
  const out = {};
  for (const part of String(req.get('cookie') ?? '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export async function currentCustomer(req) {
  if (req._customer !== undefined) return req._customer;
  const sid = parseCookies(req).sid;
  req._customer = sid ? ((await getSession(sid))?.customer ?? null) : null;
  return req._customer;
}

const cookieFlags = () => `Path=/; HttpOnly; SameSite=Lax${config.siteMode === 'live' ? '; Secure' : ''}`;

export async function signIn(res, customerId) {
  const sid = await createSession(customerId);
  res.append('Set-Cookie', `sid=${sid}; ${cookieFlags()}; Max-Age=${30 * 86400}`);
  return sid;
}

export async function signOut(req, res) {
  const sid = parseCookies(req).sid;
  if (sid) await deleteSession(sid);
  res.append('Set-Cookie', `sid=; ${cookieFlags()}; Max-Age=0`);
}

// Forms on this site post to this site. A request with a foreign Origin is refused.
export function sameOrigin(req) {
  const origin = req.get('origin');
  if (!origin) return true;
  try { return new URL(origin).host === req.get('host'); } catch { return false; }
}

// The origin for links in mails: the configured address when live, the request's own host in preview and tests.
export function originOf(req) {
  return config.siteMode === 'live' ? config.baseUrl : `${req.protocol}://${req.get('host')}`;
}

export async function isLicensed(customer, productId) {
  if (!customer) return false;
  if (config.shop.previewEmails.includes(customer.email)) return true;
  return hasLicence(customer.id, productId);
}

// In preview mode the generator is open; live, it needs a licence.
export async function canStartRun(customer, productId) {
  return config.siteMode !== 'live' || (await isLicensed(customer, productId));
}

// A run can be changed while its owner holds a licence (terms, section 8: after the end the documents stay readable,
// the generator does not). Runs without an owner come from the preview mode and stay open there.
export async function canEditRun(run, productId) {
  if (config.siteMode !== 'live' || !run?.customer_id) return true;
  return isLicensed(await getCustomer(run.customer_id), productId);
}
