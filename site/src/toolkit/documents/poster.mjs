// Document D2: the one page to post. Everything on it is taken from the policy answers, never decided anew.
import { optionLabel } from '../engine.mjs';
import { B, makeDoc, toHtml } from './blocks.mjs';
import { fmtDate, findQ } from './policy.mjs';

const T = {
  en: {
    title: 'AI at work: the one page', sub: (b, d) => `${b} · summary of the AI usage policy effective ${d}`,
    doubtH: 'In doubt: enter nothing, ask.', doubt: (who, how) => `Ask ${who}${how ? ` (${how})` : ''}. No list covers every case; this sentence does.`,
    neverH: 'This never goes into an AI tool, whatever the access:',
    never: ['Data about customers, staff and applicants by which a person is identifiable', 'Access data, passwords, keys, access codes', 'Calculations, prices, contracts, customer lists: everything the business keeps confidential', 'Health data', 'Documents of third parties handed to us in confidence'],
    accessH: 'Only through the business access.', accessForbidden: 'Allowed are the tools listed in the tool register with approval "yes" or "yes with restriction" (within the restriction). Private accounts: not for work tasks.', accessLimited: (t) => `Allowed are the tools listed in the tool register with approval "yes" or "yes with restriction" (within the restriction). Private accounts: only for ${t}.`,
    approvedTools: 'Approved tools (as of ______): ____________________',
    checkH: 'Check before use, every time:', check: ['Figures and prices', 'Names and addresses', 'Deadlines and dates', 'References, standards, sources: AI tools invent them in the correct format'],
    reportH: 'Something happened? Report it.', report: (who, how) => `Entered something confidential, or a mistake went out? Report immediately to ${who}${how ? ` (${how})` : ''}. The report itself has no consequences.`,
    folder: (where) => `The full policy is kept at: ${where}.`,
  },
  de: {
    title: 'KI im Betrieb: die eine Seite', sub: (b, d) => `${b} · Kurzfassung der KI-Nutzungsrichtlinie, gültig ab ${d}`,
    doubtH: 'Im Zweifel: nichts eingeben, sondern fragen.', doubt: (who, how) => `Gefragt wird ${who}${how ? ` (${how})` : ''}. Kein Katalog trifft alle Fälle; dieser Satz schon.`,
    neverH: 'Das kommt nie in ein KI-Tool, gleich über welchen Zugang:',
    never: ['Angaben zu Kunden, Beschäftigten und Bewerbern, mit denen eine Person erkennbar ist', 'Zugangsdaten, Passwörter, Schlüssel, Zutrittscodes', 'Kalkulationen, Preise, Verträge, Kundenlisten: alles, was der Betrieb geheim hält', 'Gesundheitsangaben', 'Unterlagen Dritter, die uns unter Vertraulichkeit übergeben wurden'],
    accessH: 'Nur über den betrieblichen Zugang.', accessForbidden: 'Erlaubt sind die Tools, die im Tool-Register mit Freigabe „ja“ oder „ja mit Einschränkung“ (im Rahmen der Einschränkung) stehen. Private Konten: nicht für dienstliche Aufgaben.', accessLimited: (t) => `Erlaubt sind die Tools, die im Tool-Register mit Freigabe „ja“ oder „ja mit Einschränkung“ (im Rahmen der Einschränkung) stehen. Private Konten: nur für ${t}.`,
    approvedTools: 'Freigegebene Tools (Stand ______): ____________________',
    checkH: 'Vor der Verwendung prüfen, jedes Mal:', check: ['Zahlen und Preise', 'Namen und Anschriften', 'Fristen und Termine', 'Fundstellen, Normen, Quellen: KI-Tools erfinden sie in korrektem Format'],
    reportH: 'Etwas passiert? Sofort melden.', report: (who, how) => `Etwas Vertrauliches eingegeben, ein Fehler nach außen gegangen? Sofort melden an ${who}${how ? ` (${how})` : ''}. Die Meldung selbst hat keine Folgen.`,
    folder: (where) => `Ablage der vollständigen Richtlinie: ${where}.`,
  },
};

// Additions from the policy answers that the fixed lists of the poster already cover: access codes sit in "access codes", standards in "standards".
const COVERED = { D1: ['access'], F1: ['standards'] };

function extraLabels(def, id, a, lang) {
  const q = findQ(def, id);
  const vals = (a?.values ?? []).filter((v) => v !== 'other' && v !== 'none' && !(COVERED[id] ?? []).includes(v)).map((v) => optionLabel(q, v, lang));
  if ((a?.values ?? []).includes('other') && a?.text) vals.push(a.text);
  return vals;
}

export function posterDoc(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const never = [...t.never, ...extraLabels(def, 'D1', A('D1'), lang)];
  const check = [...t.check, ...extraLabels(def, 'F1', A('F1'), lang)];
  // Protected spaces keep the date on one line.
  const effective = fmtDate(A('I1').date, lang).replace(/ /g, ' ');
  const blocks = [
    B.note(t.sub(business, effective)),
    B.h(t.doubtH), B.p(t.doubt(A('A8').text, A('A8').contact)),
    B.h(t.neverH), B.checks(never),
    B.h(t.accessH), B.p(A('B4').value === 'limited' ? t.accessLimited(A('B4').text || '…') : t.accessForbidden), B.p(t.approvedTools),
    B.h(t.checkH), B.checks(check),
    B.h(t.reportH), B.p(t.report(A('A7').text, A('A7').contact)),
  ];
  return makeDoc({ id: 'poster', lang, cls: 'pg--poster', title: t.title, business, blocks, footerLeft: t.folder(A('I3').text || '…'), footerRight: business });
}

export function posterHtml(def, answers, lang) { return toHtml(posterDoc(def, answers, lang)); }
