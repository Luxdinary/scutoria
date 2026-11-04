// The Security Evidence Toolkit (toolkit 2): the questionnaire, the preview page, a run through the generator, the first document.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), 'scutoria-sec-test-'));
process.env.SITE_MODE = 'preview';
const { app } = await import('../src/server.mjs');
const { loadQuestions, steps, defaultAnswers, isComplete } = await import('../src/toolkit/engine.mjs');
const { targetDate, statusOf, questionsOf } = await import('../src/toolkit/documents/security/self-declaration.mjs');

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const get = (path) => fetch(base + path, { redirect: 'manual' });
const post = (path, body = '') => fetch(base + path, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });

test('the questionnaire has forty questions in nine blocks, every text in both languages, and complete defaults', () => {
  const def = loadQuestions('security-evidence');
  assert.equal(def.blocks.length, 9);
  const qs = questionsOf(def);
  assert.equal(qs.length, 47);
  for (const q of qs) {
    assert.ok(q.label.en && q.label.de, `${q.id} label`);
    assert.ok(q.hint.en && q.hint.de, `${q.id} hint`);
    for (const o of q.options ?? q.roles ?? []) assert.ok(o.en && o.de, `${q.id} option ${o.v}`);
    if (q.type === 'select' && (q.options ?? []).some((o) => o.v === 'notyet')) assert.ok(q.prio >= 1 && q.prio <= 3, `${q.id} has a priority`);
  }
  for (const lang of ['en', 'de']) {
    const answers = defaultAnswers(def, lang);
    const list = steps(def, answers);
    assert.equal(list.length, 47, `${lang} steps`);
    for (const q of list) assert.ok(isComplete(q, answers[q.id]), `${lang} default for ${q.id}`);
  }
});

test('target dates follow the three waves and statuses follow the honest levels', () => {
  const def = loadQuestions('security-evidence');
  const answers = defaultAnswers(def, 'en');
  answers.I3 = { date: '2026-11-30' };
  assert.equal(targetDate(answers, 1), '2026-11-30');
  assert.equal(targetDate(answers, 2), '2027-01-29');
  assert.equal(targetDate(answers, 3), '2027-04-29');
  const byId = Object.fromEntries(questionsOf(def).map((q) => [q.id, q]));
  assert.equal(statusOf(byId.C2, { value: 'yes' }), 'ok');
  assert.equal(statusOf(byId.D1, { value: 'partly' }), 'warn');
  assert.equal(statusOf(byId.D2, { value: 'notyet' }), 'open');
  assert.equal(statusOf(byId.E4, { value: 'na' }), 'na');
  assert.equal(statusOf(byId.A2, { value: 'AT' }), 'info');
});

test('the preview page of toolkit 2 answers in both languages and the generator runs through to the self-declaration', async () => {
  for (const [path, expect] of [['/toolkits/security-evidence', 'Security Evidence Toolkit'], ['/de/toolkits/sicherheitsnachweis', 'Sicherheitsnachweis-Toolkit']]) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes(expect) && html.includes('/start'), `${path} product page`);
  }
  const start = await post('/toolkits/security-evidence/start');
  assert.equal(start.status, 303);
  const first = start.headers.get('location');
  assert.match(first, /\/toolkits\/security-evidence\/run\/[A-Za-z0-9_-]+\/1$/);
  const runBase = first.replace(/\/1$/, '');
  const step1 = await (await get(first)).text();
  assert.ok(step1.includes('Question 1 of 47') && step1.includes('Example Electrical Ltd'), 'first step');
  assert.ok(/href="\/toolkits\/security-evidence\/handbook#s\d+"/.test(step1), 'the question links to its handbook section');
  const r1 = await post(runBase + '/1', 'text=Test+Trade+Ltd');
  assert.equal(r1.status, 303);
  const step13 = await (await get(runBase + '/13')).text();
  assert.ok(step13.includes('Question 13 of 47') && step13.includes('Yes, in place and written down'), 'a status question');
  const docs = await (await get(runBase + '/documents')).text();
  assert.ok(docs.includes('Security self-declaration') && docs.includes('Emergency card'), 'documents page lists the documents');
  const decl = await (await get(runBase + '/documents/self-declaration/html')).text();
  assert.ok(decl.includes('Test Trade Ltd') && decl.includes('C · Access and identities') && decl.includes('Not yet · planned by'), 'self-declaration carries the name, the sections and the target dates');
  assert.ok(decl.includes('It is not a certification'), 'the closing sentence');
  const pdf = await get(runBase + '/documents/self-declaration/pdf');
  assert.equal(pdf.status, 200);
  assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 4).toString(), '%PDF');
  // D2: the action plan lists the open measures in waves, as a page and as a workbook.
  assert.ok(docs.includes('Action plan') && docs.includes('Emergency card'), 'documents page lists D2 and D3');
  const plan = await (await get(runBase + '/documents/action-plan/html')).text();
  assert.ok(plan.includes('Wave 1') && plan.includes('Wave 2') && plan.includes('Restore one folder from the backup') && plan.includes('with Example IT Services Ltd'), 'plan has waves, measures and the provider as co-responsible');
  assert.ok(plan.includes('Not yet · planned') === false && plan.includes('Review'), 'plan carries the review');
  const sheet = await get(runBase + '/documents/action-plan-sheet/xlsx');
  assert.equal(sheet.status, 200);
  assert.equal(Buffer.from(await sheet.arrayBuffer()).subarray(0, 2).toString(), 'PK');
  // D3: the emergency card carries the Austrian contacts of the example business and the four steps of the first hour.
  const card = await (await get(runBase + '/documents/emergency-card/html')).text();
  assert.ok(card.includes('0800 888 133') && card.includes('reports@cert.at') && card.includes('72 hours') && card.includes('1. Disconnect.') && card.includes('4. Write down.'), 'card contents');
  assert.ok(card.includes('blocking number from the card'), 'gap fields the business fills');
  const cardPdf = await get(runBase + '/documents/emergency-card/pdf');
  assert.equal(cardPdf.status, 200);
  assert.equal(Buffer.from(await cardPdf.arrayBuffer()).subarray(0, 4).toString(), '%PDF');
  // D4 to D7: evidence list, cover letter with mapping, clause checklist, evidence summary.
  assert.ok(docs.includes('Evidence list') && docs.includes('Cover letter') && docs.includes('Clause checklist') && docs.includes('Evidence summary') && !docs.includes('In preparation'), 'documents page lists D4 to D7 and nothing is in preparation');
  const list = await (await get(runBase + '/documents/evidence-list/html')).text();
  assert.ok(list.includes('Att. 1') && list.includes('Available: attachments') && list.includes('Missing: with target date') && list.includes('Restore test record'), 'evidence list');
  const listSheet = await get(runBase + '/documents/evidence-list-sheet/xlsx');
  assert.equal(listSheet.status, 200);
  assert.equal(Buffer.from(await listSheet.arrayBuffer()).subarray(0, 2).toString(), 'PK');
  const letter = await (await get(runBase + '/documents/cover-letter/html')).text();
  assert.ok(letter.includes('Thank you for your security questionnaire') && letter.includes('Test Trade Ltd') && letter.includes('Within 24 hours') && letter.includes('Questionnaire mapping') && letter.includes('(j)'), 'cover letter and mapping');
  const clauses = await (await get(runBase + '/documents/clause-checklist/html')).text();
  assert.ok(clauses.includes('point 5.1.4(d)') && clauses.includes('DORA, Art. 30(3)(e)') && clauses.includes('Part B') && clauses.includes('F1:'), 'clause checklist with sources and positions');
  const summary = await (await get(runBase + '/documents/evidence-summary/html')).text();
  assert.ok(summary.includes('SE-') && summary.includes('Open items are listed') && summary.includes('C · Access and identities'), 'evidence summary');
  for (const [id, fmt, type] of [['evidence-list', 'docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], ['cover-letter', 'pdf', 'application/pdf'], ['clause-checklist', 'docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], ['evidence-summary', 'pdf', 'application/pdf']]) {
    const r = await get(`${runBase}/documents/${id}/${fmt}`);
    assert.equal(r.status, 200, `${id}.${fmt}`);
    assert.ok(r.headers.get('content-type').startsWith(type), `${id}.${fmt} type`);
  }
  assert.equal((await get(runBase + '/documents/evidence-summary/docx')).status, 404, 'the summary is PDF only');
  const zip = await get(runBase + '/documents/all/zip');
  assert.equal(zip.status, 200);
  assert.ok(zip.headers.get('content-type').startsWith('application/zip'));
  // A run of toolkit 2 is not served under toolkit 1's address.
  const cross = await get(runBase.replace('security-evidence', 'ai-policy') + '/documents');
  assert.equal(cross.status, 404);
  // German run
  const startDe = await post('/de/toolkits/sicherheitsnachweis/start');
  const firstDe = startDe.headers.get('location');
  const stepDe = await (await get(firstDe)).text();
  assert.ok(stepDe.includes('Frage 1 von 47') && stepDe.includes('Muster Elektrotechnik'));
  const declDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/self-declaration/html')).text();
  assert.ok(declDe.includes('Selbstauskunft Informationssicherheit') && declDe.includes('Noch nicht · geplant bis') && declDe.includes('keine Zertifizierung'));
  const cardDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/emergency-card/html')).text();
  assert.ok(cardDe.includes('Die erste Stunde') && cardDe.includes('Notruf 133') && cardDe.includes('binnen 72 Stunden'), 'German card');
  const planDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/action-plan/html')).text();
  assert.ok(planDe.includes('Welle 1') && planDe.includes('Wiedervorlage'), 'German plan');
  const letterDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/cover-letter/html')).text();
  assert.ok(letterDe.includes('Sehr geehrte Damen und Herren') && letterDe.includes('Fragebogen-Abgleich'), 'German letter');
  const clausesDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/clause-checklist/html')).text();
  assert.ok(clausesDe.includes('Nr. 5.1.4 Buchst. d') && clausesDe.includes('Teil B'), 'German clauses');
  const summaryDe = await (await get(firstDe.replace(/\/1$/, '') + '/documents/evidence-summary/html')).text();
  assert.ok(summaryDe.includes('Nachweisseite') && summaryDe.includes('Offene Punkte werden aufgeführt'), 'German summary');
  const zipDe = await get(firstDe.replace(/\/1$/, '') + '/documents/all/zip');
  assert.equal(zipDe.status, 200);
});

test('the handbook of toolkit 2 renders in both languages with markers, source lines, a box, the open points and a PDF', async () => {
  for (const [path, lang, expect] of [['/toolkits/security-evidence/handbook', 'en', ['Why you are asked', 'sc-mk--fact', 'sc-mk--interpretation', 'sc-mk--uncertain', 'sc-mk--gap', 'Which password rule should a supplier promise?', 'id="s2-5"', 'Open points', '6.17', 'retrieved 2026-10-19', 'NISV 2026']], ['/de/toolkits/sicherheitsnachweis/handbuch', 'de', ['Warum Sie gefragt werden', 'sc-mk--fact', 'Welche Passwortregel soll ein Lieferant zusagen?', 'Offene Punkte', 'abgerufen 19.10.2026', 'Quellenbasiert. Keine Rechtsberatung.']]]) {
    const r = await get(path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    for (const s of expect) assert.ok(html.includes(s), `${lang} handbook has ${s}`);
    assert.ok(html.includes('class="sc-source"'), `${lang} handbook has source lines`);
    assert.ok(!html.includes('[FACT]') && !html.includes('[FAKT]'), `${lang} markers are rendered, not printed`);
    const pdf = await get(path + '/pdf');
    assert.equal(pdf.status, 200, `${path}/pdf`);
    const buf = Buffer.from(await pdf.arrayBuffer());
    assert.equal(buf.subarray(0, 4).toString(), '%PDF');
    assert.ok(buf.length > 60000, `${path}/pdf size ${buf.length}`);
  }
  // The preview page and the documents page link to the handbook.
  const preview = await (await get('/toolkits/security-evidence')).text();
  assert.ok(preview.includes('href="/toolkits/security-evidence/handbook"') && preview.includes('Read the handbook'), 'preview page links the handbook');
});

test('the product page of toolkit 2 sells it in both languages at the founder price (E21), with samples; home and sitemap list it', async () => {
  const page = await (await get('/toolkits/security-evidence')).text();
  for (const s of ['Toolkit 02 · Available now', 'What you get', 'Security self-declaration', 'Clause checklist', 'How it works', 'What it is, and what it is not', 'sc-mk--gap', 'See it before you buy', '/samples/security-evidence/example-electrical-ltd-self-declaration-en.pdf', 'Price and licence', '€99.00', 'Founder price for the first ten buyers,', '10 left', 'Buy annual licence', 'action="/toolkits/security-evidence/buy"', 'Start the generator', 'Read the handbook', 'faq__item', '"offers"', '"price":"99.00"']) assert.ok(page.includes(s), `product page has ${s}`);
  assert.ok(!page.includes('The price follows') && !page.includes('Join the waiting list'), 'the price box replaces the waiting list');
  const pageDe = await (await get('/de/toolkits/sicherheitsnachweis')).text();
  for (const s of ['Toolkit 02 · Jetzt erhältlich', 'Was Sie bekommen', 'Selbstauskunft Informationssicherheit', '99,00', 'Jahreslizenz kaufen', '/samples/security-evidence/muster-elektrotechnik-e-u-emergency-card-de.pdf', 'href="/de/toolkits/sicherheitsnachweis/handbuch"']) assert.ok(pageDe.includes(s), `product page de has ${s}`);
  for (const f of ['example-electrical-ltd-emergency-card-en.pdf', 'muster-elektrotechnik-e-u-evidence-summary-de.pdf', 'security-evidence-handbook-de.pdf']) {
    const r = await get('/samples/security-evidence/' + f);
    assert.equal(r.status, 200, f);
    assert.ok(r.headers.get('content-type').startsWith('application/pdf'), `${f} type`);
  }
  // The home page sells both toolkits and keeps the third in preparation; the sitemap lists toolkit 2 and its handbook.
  const home = await (await get('/')).text();
  for (const s of ['href="/toolkits/ai-policy"', 'href="/toolkits/security-evidence"', 'action="/toolkits/security-evidence/buy"', 'AI Setup Toolkit', 'In preparation', '/samples/security-evidence/security-evidence-handbook-en.pdf']) assert.ok(home.includes(s), `home has ${s}`);
  assert.equal((home.match(/sc-pill--green/g) ?? []).length, 2, 'two toolkits marked available');
  const sitemap = await (await get('/sitemap.xml')).text();
  for (const s of ['<loc>https://scutoria.com/toolkits/security-evidence</loc>', '<loc>https://scutoria.com/de/toolkits/sicherheitsnachweis/handbuch</loc>']) assert.ok(sitemap.includes(s), `sitemap has ${s}`);
  // The memos point to the product page now.
  const memo = await (await get('/de/memos/anmeldesicherheit/memo?mfaMail=yes&mfaAdmin=yes&method=app&manager=yes&shared=no&rules=length&offboarding=yes&recovery=yes')).text();
  assert.ok(memo.includes('href="/de/toolkits/sicherheitsnachweis"') && memo.includes('scutoria.com/de/toolkits/sicherheitsnachweis'), 'sign-in memo links the toolkit page');
});

test.after(async () => { const { closeBrowser } = await import('../src/toolkit/documents/pdf.mjs'); await closeBrowser(); server.close(); });
