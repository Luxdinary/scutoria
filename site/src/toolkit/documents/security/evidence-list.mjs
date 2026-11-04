// Document D4 of the Security Evidence Toolkit: the evidence list. Which document proves which answer, whether it exists, where it is,
// and the attachment number for the customer. Only what is on file gets a number: the documents of this toolkit, the policy and the
// certificates. A measure answered "in place" is marked "in place, file the evidence" until the business has filed it; what is missing
// gets the date from the action plan.
import { B, makeDoc } from '../blocks.mjs';
import { workbook, addSheet } from '../xlsx.mjs';
import { optionLabel } from '../../engine.mjs';
import { questionsOf, isStatusQuestion, targetDate, sectionTitle, fmtDate } from './self-declaration.mjs';
import { MEASURES, DEPENDS } from './measures.mjs';

const T = {
  en: {
    title: 'Evidence list', kicker: 'Evidence list · Security Evidence Toolkit', business: 'Business', date: 'Date', folder: 'Evidence folder',
    intro: (n, m, f) => `${n} pieces of evidence a questionnaire typically asks for. ${m} are on file or produced by this toolkit and carry an attachment number. ${f} measures are in place by your answers; their evidence gets a number once it is filed. The rest carry the date from the action plan. A customer reads this list as the table of attachments of the self-declaration.`,
    existH: 'Available: attachments', fileH: 'In place: file the evidence', missingH: 'Missing: with target date', naH: 'Not applicable',
    fileIntro: 'These measures are in place by your answers. Put the evidence in the evidence folder, enter in the workbook where it is, and only then give it the next attachment number.',
    head: ['No.', 'Evidence', 'Proves', 'Status', 'Where'], headFile: ['Evidence', 'Proves'], headMissing: ['Evidence', 'Proves', 'Due', 'How it comes about'],
    status: { have: 'available', file: 'in place, file the evidence', missing: 'missing', na: 'not applicable', toolkit: 'produced by the toolkit' },
    att: (n) => `Att. ${n}`,
    cardHow: 'Fill in the yellow fields, print, post, date.',
    dependsOn: (ids) => `Rests on ${ids.join(' and ')}, not yet in place; follows with the measure for ${ids.join(' and ')}.`,
    standing: {
      decl: ['Security self-declaration (D1)', 'All sections'],
      roles: ['Responsibilities: responsible person, deputy, contact', 'Section A'],
      plan: ['Action plan with target dates (D2)', 'Every “partly” and “not yet”'],
      card: ['Emergency card, printed and posted (D3)', 'Sections D and F'],
      policy: ['Cyber insurance policy with the reporting deadline', 'Section B'],
      cert: (x) => [`Certificate or report: ${x}`, 'Section B'],
    },
    sheet: 'Evidence', sheetTitle: (b) => `Evidence list · ${b}`,
    sheetNote: 'One row per piece of evidence. “Available” rows carry the attachment number. “In place, file the evidence” rows get the next number once the file is in the folder and “Where” is filled in. “Missing” rows carry the date from the action plan. Yellow: the business fills in.',
    cols: ['Attachment', 'Area', 'Evidence', 'Proves', 'Status', 'Due', 'Where', 'Shown on', 'How it comes about'],
    note: 'Generated with the Scutoria Security Evidence Toolkit from the answers of the business. Whether a customer accepts a piece of evidence is the customer\'s decision. Source-based. No legal advice.',
  },
  de: {
    title: 'Nachweisliste', kicker: 'Nachweisliste · Sicherheitsnachweis-Toolkit', business: 'Betrieb', date: 'Datum', folder: 'Nachweisordner',
    intro: (n, m, f) => `${n} Nachweise, die ein Fragebogen typischerweise verlangt. ${m} liegen vor oder entstehen mit diesem Toolkit und tragen eine Anlagennummer. ${f} Maßnahmen sind nach Ihren Antworten vorhanden; ihr Nachweis bekommt eine Nummer, sobald er abgelegt ist. Die übrigen tragen den Termin aus dem Maßnahmenplan. Ein Kunde liest diese Liste als Anlagenverzeichnis der Selbstauskunft.`,
    existH: 'Vorhanden: Anlagen', fileH: 'Vorhanden: Nachweis ablegen', missingH: 'Fehlt: mit Termin', naH: 'Nicht anwendbar',
    fileIntro: 'Diese Maßnahmen sind nach Ihren Antworten vorhanden. Den Nachweis im Nachweisordner ablegen, in der Arbeitsmappe eintragen, wo er liegt, und erst dann die nächste Anlagennummer vergeben.',
    head: ['Nr.', 'Nachweis', 'Belegt', 'Status', 'Wo'], headFile: ['Nachweis', 'Belegt'], headMissing: ['Nachweis', 'Belegt', 'Fällig', 'So entsteht er'],
    status: { have: 'vorhanden', file: 'vorhanden, Nachweis ablegen', missing: 'fehlt', na: 'nicht anwendbar', toolkit: 'aus dem Toolkit' },
    att: (n) => `Anl. ${n}`,
    cardHow: 'Gelbe Felder ausfüllen, drucken, aushängen, datieren.',
    dependsOn: (ids) => `Beruht auf ${ids.join(' und ')}, noch nicht vorhanden; folgt mit der Maßnahme zu ${ids.join(' und ')}.`,
    standing: {
      decl: ['Selbstauskunft Informationssicherheit (D1)', 'Alle Abschnitte'],
      roles: ['Zuständigkeiten: verantwortliche Person, Vertretung, Erreichbarkeit', 'Abschnitt A'],
      plan: ['Maßnahmenplan mit Terminen (D2)', 'Jedes „teilweise“ und „noch nicht“'],
      card: ['Notfallkarte, gedruckt und ausgehängt (D3)', 'Abschnitte D und F'],
      policy: ['Police der Cyberversicherung mit Meldefrist', 'Abschnitt B'],
      cert: (x) => [`Zertifikat oder Bericht: ${x}`, 'Abschnitt B'],
    },
    sheet: 'Nachweise', sheetTitle: (b) => `Nachweisliste · ${b}`,
    sheetNote: 'Eine Zeile je Nachweis. Zeilen „vorhanden“ tragen die Anlagennummer. Zeilen „vorhanden, Nachweis ablegen“ bekommen die nächste Nummer, sobald die Datei im Ordner liegt und „Wo“ ausgefüllt ist. Zeilen „fehlt“ tragen den Termin aus dem Maßnahmenplan. Gelb: Der Betrieb trägt ein.',
    cols: ['Anlage', 'Bereich', 'Nachweis', 'Belegt', 'Status', 'Fällig', 'Wo', 'Vorgelegt am', 'So entsteht er'],
    note: 'Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria aus den Antworten des Betriebs. Ob ein Kunde einen Nachweis anerkennt, entscheidet der Kunde. Quellenbasiert. Keine Rechtsberatung.',
  },
};

// The rows of the evidence list: the standing documents first, then one row per status question.
export function evidenceRows(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const folder = A('A8').text || '';
  const rows = [];
  const push = (area, evidence, proves, status, due, how, src = '') => rows.push({ area, evidence, proves, status, due, where: status === 'have' ? folder : '', how, src });
  const st = t.standing;
  const orgArea = sectionTitle('A', lang);
  push(orgArea, st.decl[0], st.decl[1], 'have', '', '', 'toolkit');
  push(orgArea, st.roles[0], st.roles[1], 'have', '', '', 'toolkit');
  push(orgArea, st.plan[0], st.plan[1], 'have', '', '', 'toolkit');
  const cardArea = sectionTitle('D', lang);
  if (A('D4').value === 'yes') push(cardArea, st.card[0], st.card[1], 'have', '', '', 'toolkit');
  else push(cardArea, st.card[0], st.card[1], 'missing', targetDate(answers, 1), t.cardHow, 'toolkit');
  const orgB = sectionTitle('B', lang);
  if (A('B2').value === 'yes') push(orgB, st.policy[0], st.policy[1], 'have', '', '');
  const certQ = questionsOf(def).find((q) => q.id === 'B3');
  for (const v of A('B3').values ?? []) {
    if (v === 'none') continue;
    const label = v === 'other' && A('B3').text ? A('B3').text : optionLabel(certQ, v, lang);
    push(orgB, st.cert(label)[0], st.cert(label)[1], 'have', '', '');
  }
  const qs = questionsOf(def);
  const byId = Object.fromEntries(qs.map((q) => [q.id, q]));
  for (const q of qs) {
    if (!isStatusQuestion(q) || q.id === 'D4') continue;
    const m = MEASURES[q.id]?.[lang] ?? MEASURES[q.id]?.en;
    if (!m) continue;
    const a = A(q.id);
    const area = sectionTitle(q.block, lang);
    const proves = `${q.id} · ${q.label[lang] ?? q.label.en}`;
    if (a.value === 'yes') {
      // Consistency: evidence that rests on a document another answer lists as missing is not in place either.
      const open = (DEPENDS[q.id] ?? []).filter((id) => A(id).value !== 'yes' && A(id).value !== 'na');
      if (open.length) {
        const due = open.map((id) => targetDate(answers, byId[id]?.prio ?? 2)).filter(Boolean).sort().pop() ?? '';
        push(area, m.evidence, proves, 'missing', due, t.dependsOn(open));
      } else push(area, m.evidence, proves, 'file', '', '');
    } else if (a.value === 'na') push(area, m.evidence, proves, 'na', '', '');
    else push(area, m.evidence, proves, 'missing', targetDate(answers, q.prio ?? 2), m.measure);
  }
  let n = 0;
  return rows.map((r) => ({ ...r, nr: r.status === 'have' ? t.att(++n) : '' }));
}

// How many attachments carry a number today; the self-declaration names the range ("Att. 1 to 3").
export function attachmentCount(def, answers, lang) {
  return evidenceRows(def, answers, lang).filter((r) => r.status === 'have').length;
}

export function evidenceListDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const fd = (iso) => fmtDate(iso, lang, answers);
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const rows = evidenceRows(def, answers, lang);
  const have = rows.filter((r) => r.status === 'have');
  const file = rows.filter((r) => r.status === 'file');
  const missing = rows.filter((r) => r.status === 'missing');
  const na = rows.filter((r) => r.status === 'na');
  const blocks = [B.p(t.intro(rows.length, have.length, file.length))];
  blocks.push(B.h(t.existH));
  blocks.push(B.table(t.head, have.map((r) => [r.nr, r.evidence, r.proves, r.src === 'toolkit' ? t.status.toolkit : t.status.have, r.where]), [8, 36, 30, 12, 14]));
  if (file.length) {
    blocks.push(B.h(t.fileH));
    blocks.push(B.p(t.fileIntro));
    blocks.push(B.table(t.headFile, file.map((r) => [r.evidence, r.proves]), [50, 50]));
  }
  if (missing.length) {
    blocks.push(B.h(t.missingH));
    blocks.push(B.table(t.headMissing, missing.map((r) => [r.evidence, r.proves, fd(r.due) || '…', r.how]), [26, 24, 12, 38]));
  }
  if (na.length) {
    blocks.push(B.h(t.naH));
    blocks.push(B.ul(na.map((r) => `${r.evidence} (${r.proves})`)));
  }
  blocks.push(B.note(t.note));
  return makeDoc({
    id: 'evidence-list', lang, cls: 'pg--list', title: t.title, business,
    runLeft: `Scutoria · ${t.kicker}`, runRight: fd(today), pageHead: `${business} · ${t.title} · ${fd(today)}`,
    meta: [{ label: t.business, value: business }, { label: t.date, value: fd(today) }, { label: t.folder, value: A('A8').text || '…' }],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fd(today)}`,
  });
}

export function evidenceListWorkbook(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const list = evidenceRows(def, answers, lang);
  const rows = list.map((r) => [r.nr, r.area, r.evidence, r.proves, t.status[r.status], r.due, r.where, '', r.status === 'have' ? '' : r.how]);
  // The attachment number of an "in place" row is the business's to give, once the evidence is filed.
  const gaps = list.map((r, i) => (r.status === 'file' ? { r: i, c: 1 } : null)).filter(Boolean);
  const wb = workbook();
  addSheet(wb, t.sheet, { title: t.sheetTitle(business), note: t.sheetNote, columns: t.cols.map((h, i) => ({ header: h, width: [9, 22, 44, 44, 14, 13, 26, 13, 50][i] })), rows, gapColumns: [7, 8], gaps, lists: { 5: ['have', 'file', 'missing', 'na'].map((k) => t.status[k]) } });
  return wb;
}
