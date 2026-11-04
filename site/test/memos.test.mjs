// The memo generators (E11): the logic of the four memos, the pages, the PDF and the email request.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), 'scutoria-memo-test-'));
process.env.SITE_MODE = 'preview';
const { app } = await import('../src/server.mjs');
const { MEMOS, memoById } = await import('../src/memos/index.mjs');
const { readAnswers, missingKeys } = await import('../src/memos/shared.mjs');
const { lastMailTo, countMemoContacts } = await import('../src/db.mjs');

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const get = (path) => fetch(base + path, { redirect: 'manual' });
const post = (path, body) => fetch(base + path, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
const ev = (id, answers, lang = 'en') => memoById(id).evaluate(answers, lang, '2026-10-19');

test('answers are read only from the known questions and values', () => {
  const memo = memoById('nis2');
  const a = readAnswers(memo, { country: 'at', size: 'huge', sector: 'health', special: ['dns', 'bogus'], supplier: 'no', business: '  Example <Ltd>  ', extra: 'x' });
  assert.deepEqual(a, { business: 'Example <Ltd>', country: 'at', sector: ['health'], special: ['dns'], supplier: 'no' });
  assert.deepEqual(missingKeys(memo, a), ['size']);
  assert.deepEqual(missingKeys(memo, { ...a, size: 'large' }), []);
});

test('NIS2 memo: essential, important, regardless of size, not in scope, and the sole-provider case', () => {
  const essential = ev('nis2', { country: 'at', size: 'large', sector: 'health', supplier: 'no' });
  assert.equal(essential.category, 'essential');
  assert.equal(essential.level, 'red');
  assert.ok(essential.title.includes('essential entity'));
  const important = ev('nis2', { country: 'de', size: 'medium', sector: 'food', supplier: 'yes' }, 'de');
  assert.equal(important.category, 'important');
  assert.ok(important.title.includes('wichtige Einrichtung'));
  const dns = ev('nis2', { country: 'eu', size: 'small', sector: 'digital', special: ['dns'], supplier: 'no' });
  assert.equal(dns.category, 'essential');
  const none = ev('nis2', { country: 'de', size: 'small', sector: 'postal', supplier: 'yes' });
  assert.equal(none.category, 'none');
  assert.equal(none.level, 'green');
  const sole = ev('nis2', { country: 'at', size: 'small', sector: 'none', special: ['sole'], supplier: 'no' });
  assert.equal(sole.category, 'maybe');
  assert.equal(sole.level, 'amber');
  // The national findings are there, with their dates.
  const at = JSON.stringify(ev('nis2', { country: 'at', size: 'large', sector: 'energy', supplier: 'no' }).doc);
  assert.ok(at.includes('1 January 2027') && at.includes('1 October 2026'), 'Austrian deadlines');
  const de = JSON.stringify(ev('nis2', { country: 'de', size: 'large', sector: 'energy', supplier: 'no' }).doc);
  assert.ok(de.includes('6 December 2025') && de.includes('6 March 2026'), 'German dates');
});

test('labelling memo: internal use is green, deep fakes are red, the reviewed text is the exception, providers see the transition date', () => {
  const internal = ev('labelling', { role: 'deployer', uses: ['internal'] });
  assert.equal(internal.level, 'green');
  const deepfake = ev('labelling', { role: 'deployer', uses: ['media'], mediaArt: 'no' });
  assert.equal(deepfake.level, 'red');
  assert.ok(deepfake.text.includes('deep fakes'));
  const reviewed = ev('labelling', { role: 'deployer', uses: ['text'], textTopic: 'public', textReview: 'yes' });
  assert.equal(reviewed.level, 'amber');
  assert.ok(reviewed.text.includes('exception'));
  const unreviewed = ev('labelling', { role: 'deployer', uses: ['text'], textTopic: 'public', textReview: 'no' }, 'de');
  assert.equal(unreviewed.level, 'red');
  assert.ok(unreviewed.text.includes('Art. 50 Abs. 4 Unterabs. 2'));
  const provider = ev('labelling', { role: 'provider', uses: ['chat'], providerPre: 'yes' });
  assert.equal(provider.level, 'red');
  assert.ok(JSON.stringify(provider.doc).includes('2 December 2026'));
});

test('sign-in memo: no second factor is red, everything in place is green', () => {
  const bad = ev('login', { mfaMail: 'no', mfaAdmin: 'unknown', method: 'none', manager: 'no', shared: 'yes', rules: 'rotation', offboarding: 'no', recovery: 'no' });
  assert.equal(bad.level, 'red');
  assert.deepEqual(bad.statuses, ['open', 'open', 'open']);
  const good = ev('login', { mfaMail: 'yes', mfaAdmin: 'yes', method: 'app', manager: 'yes', shared: 'no', rules: 'length', offboarding: 'yes', recovery: 'yes' }, 'de');
  assert.equal(good.level, 'green');
  const sms = ev('login', { mfaMail: 'yes', mfaAdmin: 'yes', method: 'sms', manager: 'yes', shared: 'no', rules: 'length', offboarding: 'yes', recovery: 'yes' });
  assert.equal(sms.level, 'amber');
  assert.ok(JSON.stringify(sms.doc).includes('15 characters'));
});

test('start memo: decisions about people come first, a settled business gets the evidence step', () => {
  const hr = ev('start', { usage: 'business', data: 'no', rules: 'yes', briefed: 'documented', published: 'no', hr: 'yes' });
  assert.equal(hr.level, 'red');
  assert.equal(hr.first, 'hr');
  const priv = ev('start', { usage: 'private', data: 'unknown', rules: 'no', briefed: 'no', published: 'yes', hr: 'no' }, 'de');
  assert.equal(priv.level, 'red');
  assert.equal(priv.first, 'accounts');
  const settled = ev('start', { usage: 'business', data: 'no', rules: 'yes', briefed: 'documented', published: 'no', hr: 'no' });
  assert.equal(settled.level, 'green');
  assert.equal(settled.first, 'evidence');
});

test('every memo has a form page in both languages and the index lists all four', async () => {
  for (const lang of ['en', 'de']) {
    const index = await get(lang === 'de' ? '/de/memos' : '/memos');
    assert.equal(index.status, 200);
    const html = await index.text();
    for (const m of MEMOS) assert.ok(html.includes(m.title[lang]), `${lang} index lists ${m.id}`);
  }
  for (const path of ['/memos/nis2', '/memos/ai-labelling', '/memos/sign-in-security', '/memos/where-to-start', '/de/memos/nis2', '/de/memos/ki-kennzeichnung', '/de/memos/anmeldesicherheit', '/de/memos/wo-anfangen']) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes('method="get"') && html.includes('/memo"'), `${path} has the form`);
  }
});

const nis2Query = 'country=at&size=large&sector=health&supplier=no&business=Example+Hospital';

test('the result page needs complete answers and then shows the memo', async () => {
  const incomplete = await get('/memos/nis2/memo?country=at');
  assert.equal(incomplete.status, 303);
  assert.ok(incomplete.headers.get('location').includes('m=incomplete'));
  const r = await get(`/memos/nis2/memo?${nis2Query}`);
  assert.equal(r.status, 200);
  const html = await r.text();
  assert.ok(html.includes('essential entity') && html.includes('Example Hospital') && html.includes('noindex'), 'memo rendered');
  assert.ok(html.includes('data-theme="paper"') && html.includes('sc-mk--fact'), 'memo on paper with markers');
  const de = await (await get('/de/memos/nis2/memo?country=de&size=medium&sector=food&supplier=unknown')).text();
  assert.ok(de.includes('wichtige Einrichtung') && de.includes('6. März 2026'));
});

test('the PDF of a memo is available in preview mode without a mail service', async () => {
  const r = await get(`/de/memos/anmeldesicherheit/memo.pdf?mfaMail=no&mfaAdmin=no&method=none&manager=no&shared=yes&rules=rotation&offboarding=no&recovery=no`);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('content-type'), 'application/pdf');
  const buf = Buffer.from(await r.arrayBuffer());
  assert.equal(buf.subarray(0, 4).toString(), '%PDF');
});

test('asking for the memo by email needs consent, stores the contact, keeps the mail in the outbox and is rate-limited', async () => {
  const body = `${nis2Query}&email=memo%40example.com&consent=yes&waitlist=yes`;
  const noConsent = await post('/memos/nis2/send', `${nis2Query}&email=memo%40example.com`);
  assert.equal(noConsent.status, 303);
  assert.ok(noConsent.headers.get('location').includes('m=error'));
  const ok = await post('/memos/nis2/send', body);
  assert.equal(ok.status, 303, 'send');
  assert.ok(ok.headers.get('location').includes('m=preview'), ok.headers.get('location'));
  const mail = lastMailTo('memo@example.com');
  assert.ok(mail && mail.subject.startsWith('Your memo') && mail.status === 'not-sent');
  assert.ok(mail.body.includes('/memos/nis2/memo?'), 'the mail links back to the memo');
  assert.equal(countMemoContacts('nis2'), 1);
  const page = await (await get(ok.headers.get('location'))).text();
  assert.ok(page.includes('memo.pdf?'), 'preview shows the PDF link');
  await post('/memos/nis2/send', body);
  await post('/memos/nis2/send', body);
  const fourth = await post('/memos/nis2/send', body);
  assert.ok(fourth.headers.get('location').includes('m=limit'));
  const foreign = await fetch(base + '/memos/nis2/send', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: 'https://evil.example' }, body });
  assert.equal(foreign.status, 403);
});

test('the memos are in the sitemap and the result pages are kept out of robots', async () => {
  const sitemap = await (await get('/sitemap.xml')).text();
  assert.ok(sitemap.includes('/memos/nis2') && sitemap.includes('/de/memos/ki-kennzeichnung'));
  assert.ok(!sitemap.includes('/memos/nis2/memo'));
  const privacy = await (await get('/privacy')).text();
  assert.ok(privacy.includes('Memo generators'));
});

test.after(async () => { const { closeBrowser } = await import('../src/toolkit/documents/pdf.mjs'); await closeBrowser(); server.close(); });
