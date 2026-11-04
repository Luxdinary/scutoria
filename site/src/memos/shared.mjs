// What the four memo generators share (E11): the wording helper, how answers are read from a query or a form,
// the rows "what you told us", and the builder that turns findings into a dated memo page on paper.
import { B, makeDoc } from '../toolkit/documents/blocks.mjs';
import { fmtDate } from '../toolkit/documents/policy.mjs';
import { config } from '../config.mjs';

export const L = (lang) => (en, de) => (lang === 'de' ? de : en);
export const S = (en, de) => ({ en, de });
export const today = () => new Date().toISOString().slice(0, 10);

// The optional business name, the same question in every memo. It appears in the head of the memo and nowhere else.
export const BUSINESS_Q = { key: 'business', type: 'text', required: false, label: S('Business name', 'Name des Betriebs'), hint: S('Optional. Appears in the head of the memo.', 'Freiwillig. Erscheint im Kopf des Memos.') };

const one = (raw) => String(Array.isArray(raw) ? raw[0] ?? '' : raw ?? '');

// Reads the answers of a memo from a query or a form body. Unknown keys and values are dropped, so nothing unvalidated reaches a memo.
export function readAnswers(memo, src = {}, { pdfBusiness = false } = {}) {
  const out = {};
  for (const q of memo.questions) {
    if (q.key === 'business' && !pdfBusiness) continue;
    const raw = src[q.key];
    if (q.type === 'text') {
      const s = one(raw).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
      if (s) out[q.key] = s;
    } else if (q.type === 'checks') {
      const list = (Array.isArray(raw) ? raw : raw == null ? [] : [raw]).map(String);
      const valid = new Set(q.options.map((o) => o.v));
      const picked = [...new Set(list.filter((v) => valid.has(v)))];
      if (picked.length) out[q.key] = picked;
    } else {
      const v = one(raw);
      if (q.options.some((o) => o.v === v)) out[q.key] = v;
    }
  }
  return out;
}

// Whether a question is asked for these answers (some only follow an earlier answer).
export const asks = (q, answers) => (q.when ? q.when(answers) : true);

// The keys of required questions still unanswered; a memo is produced only when this is empty.
export function missingKeys(memo, answers) {
  return memo.questions
    .filter((q) => q.required !== false && q.type !== 'text' && asks(q, answers) && (answers[q.key] == null || (Array.isArray(answers[q.key]) && answers[q.key].length === 0)))
    .map((q) => q.key);
}

export function answersQuery(memo, answers) {
  const sp = new URLSearchParams();
  for (const q of memo.questions) {
    if (q.key === 'business') continue;
    const v = answers[q.key];
    if (v == null) continue;
    if (Array.isArray(v)) v.forEach((x) => sp.append(q.key, x));
    else sp.set(q.key, v);
  }
  return sp.toString();
}

export const has = (answers, key, v) => Array.isArray(answers[key]) && answers[key].includes(v);

// "What you told us": one row per answered question, in the memo's language.
export function answerRows(memo, answers, lang) {
  const rows = [];
  for (const q of memo.questions) {
    if (q.key === 'business' || answers[q.key] == null || !asks(q, answers)) continue;
    const label = q.short?.[lang] ?? q.label[lang];
    if (q.type === 'text') rows.push({ label, value: answers[q.key] });
    else if (q.type === 'checks') rows.push({ label, value: q.options.filter((o) => answers[q.key].includes(o.v)).map((o) => o.label[lang]).join('; ') });
    else rows.push({ label, value: q.options.find((o) => o.v === answers[q.key])?.label[lang] ?? '' });
  }
  return rows;
}

// The memo page: result, answers, findings with markers and sources, next steps, the pointer to the toolkit, the sources, the closing note.
export function buildDoc({ memo, lang, answers, date, verdict, findings, steps, pointer, sources, extra = [] }) {
  const t = L(lang);
  const meta = [];
  if (answers.business) meta.push({ label: t('Business', 'Betrieb'), value: answers.business });
  meta.push({ label: t('Date', 'Datum'), value: fmtDate(date, lang) });
  meta.push({ label: t('Sources checked', 'Quellen geprüft'), value: fmtDate(memo.sourcesDate, lang) + (memo.sourcesUpdated ? `; ${t('corrected points', 'berichtigte Stellen')} ${fmtDate(memo.sourcesUpdated, lang)}` : '') });
  const blocks = [
    B.verdict(verdict.level, verdict.title, verdict.text),
    B.h(t('What you told us', 'Was Sie angegeben haben')),
    B.fields(answerRows(memo, answers, lang)),
    ...extra,
    B.h(t('Findings', 'Befunde')),
    ...findings.map((f) => B.mk(f.kind, f.text, f.source)),
    B.h(t('What to do next', 'Was als Nächstes zu tun ist')),
    B.checks(steps),
    ...(pointer ? [B.note(pointer)] : []),
    B.h(t('Sources', 'Quellen')),
    B.sources(sources),
    B.note(t(
      `This memo is information based on the sources listed, generated on ${fmtDate(date, 'en')} from the answers above. It is not legal advice and decides nothing on behalf of your business. Every statement carries its marker, every source its retrieval date; check the sources again before you rely on a date.`,
      `Dieses Memo ist eine Information auf Grundlage der genannten Quellen, erzeugt am ${fmtDate(date, 'de')} aus den Antworten oben. Es ist keine Rechtsberatung und entscheidet nichts anstelle Ihres Betriebs. Jede Aussage trägt ihren Marker, jede Quelle ihr Abrufdatum; prüfen Sie die Quellen erneut, bevor Sie sich auf eine Frist verlassen.`,
    )),
  ];
  return makeDoc({
    lang,
    cls: 'pg--memo',
    runLeft: 'Memo · Scutoria',
    runRight: fmtDate(date, lang),
    title: memo.title[lang],
    meta,
    blocks,
    footerLeft: `Scutoria · ${config.baseUrl.replace(/^https?:\/\//, '')} · ${config.brand.email}`,
    footerRight: `Memo ${memo.id} · ${date}`,
  });
}
