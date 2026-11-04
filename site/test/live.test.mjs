// The live site: the generator needs a licence, unknown addresses get no sign-in link, and the test checkout does not exist.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), 'scutoria-live-'));
process.env.SITE_MODE = 'live';
process.env.PREVIEW_ACCESS_EMAILS = 'preview@example.com';
const { app } = await import('../src/server.mjs');

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const get = (path, headers = {}) => fetch(base + path, { redirect: 'manual', headers });
const post = (path, body, cookie) => fetch(base + path, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded', ...(cookie ? { cookie } : {}) }, body });

test('live: health, no preview badge, generator gated, no sign-in link for unknown addresses, no test checkout', async () => {
  assert.equal((await (await get('/health')).json()).mode, 'live');
  const home = await (await get('/')).text();
  assert.ok(!home.includes('noindex'), 'live pages are indexable');
  const robots = await (await get('/robots.txt')).text();
  assert.ok(robots.includes('Allow: /') && robots.includes('Disallow: /account') && robots.includes('Sitemap: https://scutoria.com/sitemap.xml'), 'live robots allow the public pages');
  const product = await (await get('/toolkits/ai-policy')).text();
  assert.ok(product.includes('Sign in') && product.includes('Buy annual licence') && !product.includes('Start the generator'), 'product page asks for a licence');
  const start = await post('/toolkits/ai-policy/start', '');
  assert.equal(start.status, 303);
  assert.ok(start.headers.get('location').includes('m=licence'));
  const login = await post('/account/login', 'email=nobody%40example.com');
  assert.equal(login.status, 303);
  assert.equal(login.headers.get('location'), '/account?m=sent');
  const page = await (await get('/account?m=sent&e=nobody%40example.com')).text();
  assert.ok(!page.includes('/account/login/'), 'no link is shown live');
  const buy = await post('/toolkits/ai-policy/buy', '');
  assert.ok(buy.headers.get('location').includes('m=unavailable'), 'no Stripe key: checkout unavailable, never the test checkout');
  assert.equal((await get('/checkout/test/cs_test_x')).status, 404);
  const wh = await fetch(base + '/stripe/webhook', { method: 'POST', headers: { 'content-type': 'application/json', 'stripe-signature': 't=1,v1=00' }, body: '{}' });
  assert.equal(wh.status, 503);
});

test('live: a preview address may use the generator without a purchase', async () => {
  const r = await post('/account/login', 'email=preview%40example.com');
  assert.equal(r.status, 303);
  // the mail is not sent (no service) and the link is not shown live; the token is read from the outbox directly
  const { lastMailTo } = await import('../src/db.mjs');
  const mail = lastMailTo('preview@example.com');
  assert.ok(mail && mail.status === 'not-sent');
  const link = mail.body.match(/https?:\/\/\S+/)[0];
  assert.ok(link.startsWith('https://scutoria.com/account/login/'), 'live links use the configured base address');
  const login = await get(new URL(link).pathname);
  assert.equal(login.status, 303);
  const setCookie = login.headers.get('set-cookie');
  assert.ok(setCookie.includes('Secure') && setCookie.includes('HttpOnly'));
  const cookie = setCookie.split(';')[0];
  const start = await post('/toolkits/ai-policy/start', '', cookie);
  assert.equal(start.status, 303);
  assert.match(start.headers.get('location'), /\/toolkits\/ai-policy\/run\/[A-Za-z0-9_-]+\/1$/);
});

test.after(() => server.close());
