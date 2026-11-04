// Document D2 of the Security Evidence Toolkit: the action plan. Every "partly" and "not yet" becomes a measure with a priority,
// a responsible person, a target date in one of three waves and the evidence that exists afterwards. As a page (HTML, PDF, DOCX) and as a workbook.
import { B, makeDoc } from '../blocks.mjs';
import { addMonths } from '../plan.mjs';
import { workbook, addSheet } from '../xlsx.mjs';
import { optionLabel } from '../../engine.mjs';
import { questionsOf, isStatusQuestion, targetDate, sectionTitle, fmtDate, drawerWord } from './self-declaration.mjs';
import { MEASURES, TECHNICAL } from './measures.mjs';

const T = {
  en: {
    title: 'Action plan', kicker: 'Action plan · Security Evidence Toolkit', business: 'Business', date: 'Date', firstWave: 'First wave by',
    intro: (n, b) => `${n} measure${n === 1 ? '' : 's'} for ${b}, taken from every answer that was “partly” or “not yet”. Three waves: what questionnaires and insurers ask first comes first. A measure is done when its evidence exists in the evidence folder.`,
    none: 'Nothing open: every answer is in place or not applicable. Keep the review date and repeat the questionnaire when something changes.',
    wave: (n, d) => `Wave ${n} · by ${d}`, head: ['No.', 'Measure', 'Today', 'Responsible', 'Evidence afterwards'],
    today: { partly: 'Partly', notyet: 'Not yet' }, with: 'with',
    reviewH: 'Review', fixed: 'Fixed date', occasions: 'Occasions',
    // One list of review occasions for the plan, the help text of question I4 and the handbook.
    occasionList: ['a new customer questionnaire', 'a departure or a change of contact person', 'a new provider', 'a change to the backup', 'an incident'],
    note: 'Generated with the Scutoria Security Evidence Toolkit from the answers of the business. The plan is a commitment of the business to itself; the dates are its own. Password length of fifteen characters (measure C6): NIST SP 800-63B-4, July 2025, section 3.1.1.2, retrieved 19 October 2026; see the handbook, question C6. Source-based. No legal advice.',
    sheet: 'Plan', sheetTitle: (b) => `Action plan · ${b}`,
    sheetNote: 'One row per measure, in three waves. Enter the date in “Done on” when the evidence exists. Yellow: the business fills in.',
    cols: ['No.', 'Area', 'Measure', 'Today', 'Wave', 'Target date', 'Responsible', 'Evidence afterwards', 'Done on'],
    revSheet: 'Review', revTitle: 'Review: occasions and fixed date', revCols: ['Occasion', 'Responsible', 'Date', 'Done on'],
    itProvider: 'IT provider',
  },
  de: {
    title: 'Maßnahmenplan', kicker: 'Maßnahmenplan · Sicherheitsnachweis-Toolkit', business: 'Betrieb', date: 'Datum', firstWave: 'Erste Welle bis',
    intro: (n, b) => `${n} Maßnahme${n === 1 ? '' : 'n'} für ${b}, aus jeder Antwort, die „teilweise“ oder „noch nicht“ war. Drei Wellen: Was Fragebögen und Versicherer zuerst fragen, kommt zuerst. Eine Maßnahme ist erledigt, wenn ihr Nachweis im Nachweisordner liegt.`,
    none: 'Nichts offen: Jede Antwort ist vorhanden oder nicht anwendbar. Halten Sie den Wiedervorlagetermin, und wiederholen Sie den Fragebogen, wenn sich etwas ändert.',
    wave: (n, d) => `Welle ${n} · bis ${d}`, head: ['Nr.', 'Maßnahme', 'Heute', 'Verantwortlich', 'Nachweis danach'],
    today: { partly: 'Teilweise', notyet: 'Noch nicht' }, with: 'mit',
    reviewH: 'Wiedervorlage', fixed: 'Fester Termin', occasions: 'Anlässe',
    occasionList: ['ein neuer Kundenfragebogen', 'ein Austritt oder der Wechsel einer Ansprechperson', 'ein neuer Dienstleister', 'eine Änderung der Sicherung', 'ein Vorfall'],
    note: 'Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria aus den Antworten des Betriebs. Der Plan ist eine Zusage des Betriebs an sich selbst; die Termine sind seine eigenen. Passwortlänge von fünfzehn Zeichen (Maßnahme C6): NIST SP 800-63B-4, Juli 2025, Abschnitt 3.1.1.2, abgerufen am 19. Oktober 2026; siehe Handbuch, Frage C6. Quellenbasiert. Keine Rechtsberatung.',
    sheet: 'Plan', sheetTitle: (b) => `Maßnahmenplan · ${b}`,
    sheetNote: 'Eine Zeile je Maßnahme, in drei Wellen. Das Datum in „Erledigt am“ eintragen, wenn der Nachweis vorliegt. Gelb: Der Betrieb trägt ein.',
    cols: ['Nr.', 'Bereich', 'Maßnahme', 'Heute', 'Welle', 'Zieldatum', 'Verantwortlich', 'Nachweis danach', 'Erledigt am'],
    revSheet: 'Wiedervorlage', revTitle: 'Wiedervorlage: Anlässe und fester Termin', revCols: ['Anlass', 'Verantwortlich', 'Datum', 'Erledigt am'],
    itProvider: 'IT-Betreuung',
  },
};

const upper = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function reviewDateOf(answers) {
  return addMonths(answers.I2?.date, answers.I4?.value || 12);
}

// The open measures, sorted by wave and by the order of the questionnaire.
export function planRows(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const resp = A('A4').text || '…';
  // The provider's name only (A5); its emergency number is a question of its own (A9) and goes on the emergency card.
  const provider = ['provider', 'both'].includes(A('A5').value) ? (A('A5').text || t.itProvider) : '';
  const rows = [];
  for (const q of questionsOf(def)) {
    if (!isStatusQuestion(q)) continue;
    const a = A(q.id);
    if (a.value !== 'partly' && a.value !== 'notyet') continue;
    const m = MEASURES[q.id]?.[lang] ?? MEASURES[q.id]?.en;
    if (!m) continue;
    const prio = q.prio ?? 2;
    const measure = lang === 'de' && q.id === 'D4' ? m.measure.replace(' die Lade ', ` die ${drawerWord(answers)} `) : m.measure;
    rows.push({
      id: q.id,
      area: sectionTitle(q.block, lang),
      measure,
      today: `${t.today[a.value]}${a.text ? `: ${a.text}` : ''}`,
      prio,
      target: targetDate(answers, prio),
      responsible: TECHNICAL.has(q.id) && provider ? `${resp} ${t.with} ${provider}` : resp,
      evidence: m.evidence,
    });
  }
  rows.sort((x, y) => x.prio - y.prio);
  return rows.map((r, i) => ({ ...r, nr: i + 1 }));
}

export function actionPlanDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const fd = (iso) => fmtDate(iso, lang, answers);
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const rows = planRows(def, answers, lang);
  const blocks = [B.p(rows.length ? t.intro(rows.length, business) : t.none)];
  for (const wave of [1, 2, 3]) {
    const list = rows.filter((r) => r.prio === wave);
    if (!list.length) continue;
    blocks.push(B.h(t.wave(wave, fd(targetDate(answers, wave)) || '…')));
    blocks.push(B.table(t.head, list.map((r) => [String(r.nr), r.measure, r.today, r.responsible, r.evidence]), [6, 40, 18, 16, 20]));
  }
  blocks.push(B.h(t.reviewH));
  blocks.push(B.fields([{ label: t.fixed, value: fd(reviewDateOf(answers)) || '…' }, { label: t.occasions, value: upper(t.occasionList.join('; ')) }]));
  blocks.push(B.note(t.note));
  return makeDoc({
    id: 'action-plan', lang, cls: 'pg--plan', title: t.title, business,
    runLeft: `Scutoria · ${t.kicker}`, runRight: fd(today), pageHead: `${business} · ${t.title} · ${fd(today)}`,
    meta: [{ label: t.business, value: business }, { label: t.date, value: fd(today) }, { label: t.firstWave, value: fd(A('I3').date) || '…' }],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fd(today)}`,
  });
}

export function actionPlanWorkbook(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const rows = planRows(def, answers, lang).map((r) => [r.nr, r.area, r.measure, r.today, r.prio, r.target, r.responsible, r.evidence, '']);
  const wb = workbook();
  addSheet(wb, t.sheet, { title: t.sheetTitle(business), note: t.sheetNote, columns: t.cols.map((h, i) => ({ header: h, width: [6, 22, 60, 30, 9, 13, 24, 36, 13][i] })), rows, gapColumns: [9], minRows: 3 });
  addSheet(wb, t.revSheet, { title: t.revTitle, columns: t.revCols.map((h, i) => ({ header: h, width: [60, 24, 14, 14][i] })), rows: [...t.occasionList.map((o) => [upper(o), A('A4').text || '', '', '']), [t.fixed, A('A4').text || '', reviewDateOf(answers), '']], gapColumns: [3, 4] });
  return wb;
}

export const measureLabel = (q, lang) => optionLabel(q, 'yes', lang);
