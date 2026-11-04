import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), 'scutoria-test-'));
process.env.SITE_MODE = 'preview';
const { app } = await import('../src/server.mjs');

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const get = (path) => fetch(base + path, { redirect: 'manual' });

test('health answers', async () => {
  const r = await get('/health');
  assert.equal(r.status, 200);
  assert.equal((await r.json()).ok, true);
});

test('every page in both languages answers 200 with the right lang', async () => {
  const pages = [['/', 'en'], ['/about', 'en'], ['/legal', 'en'], ['/privacy', 'en'], ['/terms', 'en'], ['/withdrawal', 'en'], ['/de/', 'de'], ['/de/ueber', 'de'], ['/de/impressum', 'de'], ['/de/datenschutz', 'de'], ['/de/agb', 'de'], ['/de/widerruf', 'de']];
  for (const [path, lang] of pages) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes(`<html lang="${lang}"`), `${path} lang`);
    assert.ok(html.includes('/tokens.css'), `${path} tokens`);
  }
});

test('preview mode sets noindex and the security headers', async () => {
  const r = await get('/');
  assert.ok((await r.text()).includes('noindex'));
  assert.ok(r.headers.get('content-security-policy').includes("frame-ancestors 'none'"));
});

test('the about page names no person and no third-party host appears in any page', async () => {
  for (const path of ['/about', '/de/ueber', '/', '/de/']) {
    const html = await (await get(path)).text();
    assert.ok(!/Dallinger/.test(html), `${path} must not name a person`);
    assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(html), `${path} must not load fonts from Google`);
  }
  const legal = await (await get('/de/impressum')).text();
  assert.ok(/Dallinger/.test(legal), 'the legal notice must name the provider');
});

test('waitlist accepts a valid address with consent and rejects the rest', async () => {
  const ok = await fetch(base + '/waitlist', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'email=test%40example.com&consent=yes' });
  assert.equal(ok.status, 303);
  assert.ok(ok.headers.get('location').includes('w=ok'));
  const bad = await fetch(base + '/de/warteliste', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'email=nope&consent=yes' });
  assert.equal(bad.status, 303);
  assert.ok(bad.headers.get('location').includes('w=error'));
});

test('the AI Policy generator runs through with the example business and renders both documents', async () => {
  const start = await fetch(base + '/toolkits/ai-policy/start', { method: 'POST', redirect: 'manual' });
  assert.equal(start.status, 303);
  const first = start.headers.get('location');
  assert.match(first, /\/toolkits\/ai-policy\/run\/[A-Za-z0-9_-]+\/1$/);
  const runBase = first.replace(/\/1$/, '');
  const step1 = await (await get(first)).text();
  assert.ok(step1.includes('Question 1 of'), 'progress label');
  assert.ok(step1.includes('Example Electrical Ltd'), 'example business prefilled');
  // answer A1 with a new name, keep the rest as prefilled by walking every step with an empty body where allowed
  const post = (path, body) => fetch(base + path, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
  const r1 = await post(runBase + '/1', 'text=Test+Trade+Ltd');
  assert.equal(r1.status, 303);
  const docs = await (await get(runBase + '/documents')).text();
  assert.ok(docs.includes('Your documents'));
  const policy = await (await get(runBase + '/documents/policy/html')).text();
  assert.ok(policy.includes('Test Trade Ltd'), 'policy carries the business name');
  assert.ok(policy.includes('§ 9') && policy.includes('Responsibility in case of doubt'), 'policy has nine sections');
  assert.ok(policy.includes('calculation sheets per job'), 'policy carries the extra data kinds of the example');
  const poster = await (await get(runBase + '/documents/poster/html')).text();
  assert.ok(poster.includes('In doubt: enter nothing, ask.'));
  // every document in every format answers with the right media type
  const expected = { html: 'text/html', pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
  const docFormats = { policy: ['html', 'pdf', 'docx'], poster: ['html', 'docx'], register: ['xlsx'], approval: ['html', 'docx'], training: ['html', 'docx'], 'training-overview': ['xlsx'], labelling: ['html', 'docx'], plan: ['xlsx'], evidence: ['html', 'pdf'] };
  for (const [id, fmts] of Object.entries(docFormats)) {
    for (const fmt of fmts) {
      const r = await get(`${runBase}/documents/${id}/${fmt}`);
      assert.equal(r.status, 200, `${id}.${fmt}`);
      assert.ok(r.headers.get('content-type').startsWith(expected[fmt]), `${id}.${fmt} type`);
      const buf = Buffer.from(await r.arrayBuffer());
      assert.ok(buf.length > 500, `${id}.${fmt} size`);
      if (fmt === 'pdf') assert.equal(buf.subarray(0, 4).toString(), '%PDF', `${id}.pdf header`);
      if (fmt === 'docx' || fmt === 'xlsx') assert.equal(buf.subarray(0, 2).toString(), 'PK', `${id}.${fmt} zip header`);
    }
  }
  const labelling = await (await get(runBase + '/documents/labelling/html')).text();
  assert.ok(labelling.includes('5 · Deepfake check') && labelling.includes('6 · Text check') && !labelling.includes('4 · Chatbot'), 'labelling sheets follow the inventory answers');
  const evidence = await (await get(runBase + '/documents/evidence/html')).text();
  assert.ok(evidence.includes('AP-') && evidence.includes('Open items are listed'), 'evidence summary has an id and the note');
  const zip = await get(runBase + '/documents/all/zip');
  assert.equal(zip.status, 200);
  assert.ok(zip.headers.get('content-type').startsWith('application/zip'));
  // German run
  const startDe = await fetch(base + '/de/toolkits/ki-richtlinien/start', { method: 'POST', redirect: 'manual' });
  const firstDe = startDe.headers.get('location');
  const stepDe = await (await get(firstDe)).text();
  assert.ok(stepDe.includes('Frage 1 von'));
  const policyDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/policy/html')).text();
  assert.ok(policyDe.includes('KI-Nutzungsrichtlinie') && policyDe.includes('Zuständigkeit für Zweifelsfälle'));
});

test('the handbook renders in both languages with markers, source lines, boxes and a PDF', async () => {
  for (const [path, lang] of [['/toolkits/ai-policy/handbook', 'en'], ['/de/toolkits/ki-richtlinien/handbuch', 'de']]) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes(`<html lang="${lang}"`), `${path} lang`);
    for (const cls of ['sc-mk--fact', 'sc-mk--interpretation', 'sc-mk--uncertain', 'sc-mk--gap', 'sc-unc__title', 'class="sc-source"']) assert.ok(html.includes(cls), `${path} has ${cls}`);
    assert.ok(!/\[(FACT|FAKT|GAP|LÜCKE|UNCERTAIN|UNSICHER|INTERPRETATION|AUSLEGUNG)\]/.test(html), `${path} leaves no raw marker`);
    assert.ok(!html.includes(':::'), `${path} leaves no raw fence`);
    for (let n = 0; n <= 10; n++) assert.ok(html.includes(`id="s${n}"`), `${path} section ${n}`);
    assert.ok(html.includes('2026-10-19'), `${path} carries the retrieval date`);
    assert.ok(!/Dallinger/.test(html), `${path} names no person`);
    const pdf = await get(path + '/pdf');
    assert.equal(pdf.status, 200, `${path}/pdf`);
    assert.ok(pdf.headers.get('content-type').startsWith('application/pdf'));
    const buf = Buffer.from(await pdf.arrayBuffer());
    assert.equal(buf.subarray(0, 4).toString(), '%PDF');
    assert.ok(buf.length > 60000, `${path}/pdf size ${buf.length}`);
  }
  // the question pages link to the handbook sections
  const start = await fetch(base + '/toolkits/ai-policy/start', { method: 'POST', redirect: 'manual' });
  const step = await (await get(start.headers.get('location'))).text();
  assert.ok(/href="\/toolkits\/ai-policy\/handbook#s\d+"/.test(step), 'step page links to a handbook section');
});

const post = (path, body, cookie) => fetch(base + path, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded', ...(cookie ? { cookie } : {}) }, body });
const linkIn = (html) => html.match(/href="(http:\/\/127\.0\.0\.1:\d+\/(?:de\/konto\/anmelden|account\/login)\/[A-Za-z0-9_-]+)"/)?.[1];

test('account: the sign-in link works once, and preview mode shows it when no mail service is set', async () => {
  const r = await post('/account/login', 'email=owner%40example.com');
  assert.equal(r.status, 303);
  const loc = r.headers.get('location');
  assert.ok(loc.startsWith('/account?m=sent'), loc);
  const page = await (await get(loc)).text();
  const link = linkIn(page);
  assert.ok(link, 'preview shows the sign-in link');
  const path = new URL(link).pathname;
  const login = await get(path);
  assert.equal(login.status, 303);
  const cookie = login.headers.get('set-cookie').split(';')[0];
  assert.match(cookie, /^sid=/);
  assert.ok(login.headers.get('set-cookie').includes('HttpOnly'));
  const acct = await (await fetch(base + '/account', { headers: { cookie } })).text();
  assert.ok(acct.includes('owner@example.com') && acct.includes('No licence yet'), 'account page');
  const again = await get(path);
  assert.ok(again.headers.get('location').includes('m=invalid'), 'a token works once');
  const bad = await post('/account/login', 'email=not-an-address');
  assert.ok(bad.headers.get('location').includes('m=invalid'));
  const de = await (await get('/de/konto')).text();
  assert.ok(de.includes('Anmeldelink senden'));
});

test('checkout: the test checkout creates a licence, the account shows it, and the evidence folder freezes versions', async () => {
  const buy = await post('/toolkits/ai-policy/buy', '');
  assert.equal(buy.status, 303);
  const testUrl = buy.headers.get('location');
  assert.match(testUrl, /^\/checkout\/test\/cs_test_/);
  const page = await (await get(testUrl)).text();
  assert.ok(page.includes('99.00'), 'founder price shown');
  assert.ok(page.includes('lose my right of withdrawal'), 'consent text shown');
  const pay = await post(testUrl, 'email=buyer%40example.com&consent=yes');
  assert.equal(pay.status, 303);
  const successUrl = new URL(pay.headers.get('location'));
  const success = successUrl.pathname + successUrl.search;
  assert.match(success, /^\/checkout\/success\?session_id=cs_test_/);
  const sp = await (await get(success)).text();
  assert.ok(sp.includes('Your licence is active'), 'success page');
  const link = linkIn(sp);
  assert.ok(link, 'preview shows the welcome sign-in link');
  const login = await get(new URL(link).pathname);
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const acct = await (await fetch(base + '/account', { headers: { cookie } })).text();
  assert.ok(acct.includes('AI Policy Toolkit') && acct.includes('valid until') && acct.includes('founder price'), 'licence listed');
  // the second visit of the success page changes nothing
  const sp2 = await (await get(success)).text();
  assert.ok(sp2.includes('Your licence is active'));
  // a run started while signed in lands in the folder
  const start = await post('/toolkits/ai-policy/start', '', cookie);
  assert.equal(start.status, 303);
  const runId = start.headers.get('location').replace(/\/1$/, '').split('/').pop();
  const folder = await (await fetch(base + '/account', { headers: { cookie } })).text();
  assert.ok(folder.includes('Example Electrical Ltd') && folder.includes(runId), 'run in the folder');
  // freeze a version
  const freeze = await post(`/account/runs/${runId}/freeze`, '', cookie);
  assert.equal(freeze.status, 303);
  const after = await (await fetch(base + '/account', { headers: { cookie } })).text();
  assert.ok(after.includes('Version of') && after.includes('2026-10-19'), 'frozen version listed with the toolkit version');
  const ids = [...after.matchAll(/\/toolkits\/ai-policy\/run\/([A-Za-z0-9_-]+)\/documents/g)].map((m) => m[1]);
  const frozenId = ids.find((id) => id !== runId);
  assert.ok(frozenId, 'frozen run id');
  const docs = await (await get(`/toolkits/ai-policy/run/${frozenId}/documents`)).text();
  assert.ok(docs.includes('Frozen version') && !docs.includes('Change answers'), 'frozen documents page');
  const edit = await post(`/toolkits/ai-policy/run/${frozenId}/1`, 'text=Changed');
  assert.ok(edit.headers.get('location').endsWith('/documents'), 'a frozen run cannot be changed');
  const stranger = await post(`/account/runs/${runId}/freeze`, '');
  assert.ok(stranger.headers.get('location').startsWith('/account'), 'freezing needs the owner');
  // the webhook refuses without a secret
  const wh = await fetch(base + '/stripe/webhook', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  assert.equal(wh.status, 503);
});

test('the home page sells the AI Policy Toolkit and the product page explains it, in both languages, with samples', async () => {
  const home = await (await get('/')).text();
  for (const s of ['Available now', '99.00', 'href="/toolkits/ai-policy"', 'In preparation', 'How it works', 'sc-mk--fact', '/samples/ai-policy/ai-policy-handbook-en.pdf']) assert.ok(home.includes(s), `home has ${s}`);
  assert.ok(!home.includes('Available November') && !home.includes('#tools'), 'no stale promise, no dead link');
  const homeDe = await (await get('/de/')).text();
  for (const s of ['Jetzt erhältlich', '99,00', 'In Vorbereitung', 'So läuft es']) assert.ok(homeDe.includes(s), `home de has ${s}`);
  const product = await (await get('/toolkits/ai-policy')).text();
  for (const s of ['What you get', 'AI usage policy', 'Evidence summary', 'How it works', 'What it is, and what it is not', 'See it before you buy', 'Price and licence', 'Questions', 'Buy annual licence', 'Start the generator', 'sc-mk--gap', 'faq__item', 'href="/terms"']) assert.ok(product.includes(s), `product page has ${s}`);
  const productDe = await (await get('/de/toolkits/ki-richtlinien')).text();
  for (const s of ['Was Sie bekommen', 'Jahreslizenz kaufen', 'Fragen', 'Vorher ansehen', 'href="/de/agb"']) assert.ok(productDe.includes(s), `product page de has ${s}`);
  for (const f of ['example-electrical-ltd-policy-en.pdf', 'muster-elektrotechnik-e-u-evidence-de.pdf', 'ai-policy-handbook-de.pdf']) {
    const r = await get('/samples/ai-policy/' + f);
    assert.equal(r.status, 200, f);
    assert.ok(r.headers.get('content-type').startsWith('application/pdf'), `${f} type`);
  }
});

test('robots, sitemap, canonical links, share images and structured data are in place', async () => {
  const robots = await (await get('/robots.txt')).text();
  assert.equal(robots, 'User-agent: *\nDisallow: /\n', 'preview disallows everything');
  const sitemap = await get('/sitemap.xml');
  assert.ok(sitemap.headers.get('content-type').startsWith('application/xml'));
  const xml = await sitemap.text();
  for (const s of ['<loc>https://scutoria.com/</loc>', '<loc>https://scutoria.com/toolkits/ai-policy</loc>', '<loc>https://scutoria.com/de/toolkits/ki-richtlinien/handbuch</loc>', 'hreflang="x-default"', 'hreflang="de" href="https://scutoria.com/de/toolkits/ki-richtlinien"']) assert.ok(xml.includes(s), `sitemap has ${s}`);
  assert.ok(!xml.includes('/legal'), 'legal pages are not listed before the legal review');
  const home = await (await get('/')).text();
  for (const s of ['<link rel="canonical" href="https://scutoria.com/">', 'hreflang="x-default" href="https://scutoria.com/"', 'property="og:image" content="https://scutoria.com/og/scutoria-en.png"', '"@type":"Organization"']) assert.ok(home.includes(s), `home has ${s}`);
  const product = await (await get('/de/toolkits/ki-richtlinien')).text();
  for (const s of ['<link rel="canonical" href="https://scutoria.com/de/toolkits/ki-richtlinien">', 'og/ai-policy-de.png', '"@type":"Product"', '"price":"99.00"', '"priceCurrency":"EUR"']) assert.ok(product.includes(s), `product has ${s}`);
  for (const f of ['scutoria-en', 'scutoria-de', 'ai-policy-en', 'ai-policy-de']) {
    const r = await get(`/og/${f}.png`);
    assert.equal(r.status, 200, f);
    assert.ok(r.headers.get('content-type').startsWith('image/png'));
  }
});

test('the free tools have pages in both languages whose security policy forbids network requests', async () => {
  for (const [path, needle] of [['/tools', 'May this go in?'], ['/de/tools', 'Darf das hinein?'], ['/tools/may-this-go-in', 'tool-form'], ['/de/tools/darf-das-hinein', 'Nichts davon'], ['/tools/anything-personal', 'placeholder-btn'], ['/de/tools/etwas-persoenliches', 'Durch Platzhalter ersetzen']]) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes(needle), `${path} has ${needle}`);
    if (path.includes('may-this') || path.includes('darf-das') || path.includes('personal') || path.includes('persoenlich')) {
      assert.ok(r.headers.get('content-security-policy').includes("connect-src 'none'"), `${path} forbids network requests`);
      assert.ok(html.includes('id="tool-config"') && html.includes('type="module" src="/tools/'), `${path} loads its module`);
    }
  }
  for (const f of ['/tools/personal.js', '/tools/may-this-go-in.js']) {
    const r = await get(f);
    assert.equal(r.status, 200, f);
    assert.ok(r.headers.get('content-type').includes('javascript'), `${f} type`);
  }
  const home = await (await get('/')).text();
  assert.ok(home.includes('href="/tools/may-this-go-in"') && home.includes('href="/tools"'), 'home links to the tools');
  const xml = await (await get('/sitemap.xml')).text();
  assert.ok(xml.includes('<loc>https://scutoria.com/de/tools/etwas-persoenliches</loc>'), 'tools in the sitemap');
});

test('static assets from the design system are served', async () => {
  for (const path of ['/tokens.css', '/bundle.css', '/site.css', '/favicon.svg', '/fonts/manrope-latin-wght-normal.woff2']) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
  }
});

test.after(async () => { const { closeBrowser } = await import('../src/toolkit/documents/pdf.mjs'); await closeBrowser(); server.close(); });
