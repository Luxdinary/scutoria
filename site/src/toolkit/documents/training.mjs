// Document D4: the briefing record (attendance list per group, DOCX and PDF) and the overview per person (XLSX).
import { optionLabel } from '../engine.mjs';
import { B, makeDoc } from './blocks.mjs';
import { workbook, addSheet } from './xlsx.mjs';
import { findQ, fmtDate, RETRIEVED } from './policy.mjs';

const T = {
  en: {
    title: 'Briefing record: attendance list', shortTitle: 'Briefing record', allStaff: 'All staff',
    note: (d) => `This sheet records that a briefing took place: when, with whom, with which contents. It does not record that it was sufficient. The European Commission states that no certificate is needed and that organisations can keep an internal record of trainings and other guiding initiatives (AI literacy Q&A, retrieved ${d}; guidance, not law). This sheet is such a record. Format, minimum duration, repetition and retention are not prescribed by any source consulted.`,
    fBusiness: 'Business', fDate: 'Date, duration', fBy: 'Conducted by', fForm: 'Form', forms: '☐ meeting   ☐ walk-through of the policy   ☐ one-to-one   ☐ online', fGroup: 'Target group', fVersion: 'Policy version',
    contentsH: 'Contents covered (tick)',
    contents: ['The business\'s own usage policy, section by section (§ 1 to § 9)', 'The permitted tools and access; why private accounts are not used for work (§ 1, register)', 'What never goes into a tool, and the rule of doubt (§ 3, poster)', 'Two or three use cases from the business, worked through together (§ 2)', 'Typical failure patterns: invented figures, names, deadlines, references in the correct format; what is checked before use (§ 5)', 'The reporting channel, and that the report itself has no consequences (§ 8)', 'When and how to label, if the business publishes AI content (§ 7, checklist)', 'Who is asked in case of doubt (§ 9)'],
    contentsGap: 'Business-specific contents, e.g. the tool used in daily work, examples from this group',
    participantsH: 'Participants', pCols: (g, d) => ['No', `Name (${g}, ${d})`, 'Function', 'Policy received and read', 'Signature'],
    retention: 'This sheet is kept for', next: 'Next briefing', signBy: 'Date, signature of the person conducting the briefing',
    noteGroups: 'One sheet per target group: the duty asks to consider prior knowledge and context, so a briefing that is the same for everyone fits only if everyone does the same.',
    ovSheet: 'Per person', ovTitle: (b) => `Briefing overview per person · ${b}`,
    ovNote: 'One row per person who uses AI tools for work, including freelancers and contractors working with business tools. Enter one name per row; the generator never fills names. No source states a minimum retention or a repetition duty; the business sets both.',
    ovCols: ['Name', 'Function', 'Uses AI tools for work', 'First briefing', 'Last briefing', 'Contents covered', 'Policy acknowledged on', 'Next briefing', 'Remarks'],
    yesno: ['yes', 'no'],
    brSheet: 'Briefings', brTitle: 'Register of briefings',
    brCols: ['Date', 'Conducted by', 'Form', 'Duration', 'Participants', 'Target group', 'Attendance list (file)'],
    repeat: { 'tool-yearly': 'on every new tool and once a year', half: 'every six months', later: 'to be set by the business' },
    keep: { '3y': 'three years', '5y': 'five years', employment: 'duration of employment plus one year' },
  },
  de: {
    title: 'Schulungsnachweis: Teilnehmerliste einer Einweisung', shortTitle: 'Schulungsnachweis', allStaff: 'Alle Beschäftigten',
    note: (d) => `Dieses Blatt belegt, dass eine Einweisung stattgefunden hat: wann, mit wem, mit welchen Inhalten. Es belegt nicht, dass sie ausreicht. Die Europäische Kommission schreibt, dass kein Zertifikat nötig ist und Organisationen eine interne Aufzeichnung der Schulungen und anderer Anleitungen führen können (KI-Kompetenz, Fragen und Antworten, abgerufen am ${d}; Leitfaden, kein Gesetz). Dieses Blatt ist eine solche Aufzeichnung. Format, Mindestdauer, Wiederholung und Aufbewahrung sind in keiner herangezogenen Quelle vorgeschrieben.`,
    fBusiness: 'Betrieb', fDate: 'Datum, Dauer', fBy: 'Durchgeführt von', fForm: 'Form', forms: '☐ Besprechung   ☐ Rundgang durch die Richtlinie   ☐ Einzelgespräch   ☐ online', fGroup: 'Zielgruppe', fVersion: 'Fassung der Richtlinie',
    contentsH: 'Behandelte Inhalte (ankreuzen)',
    contents: ['Die eigene Nutzungsrichtlinie, Bereich für Bereich (§ 1 bis § 9)', 'Die zugelassenen Tools und Zugänge; warum private Konten nicht dienstlich benutzt werden (§ 1, Register)', 'Was nie in ein Tool hinein darf, und die Zweifelsregel (§ 3, Aushang)', 'Zwei oder drei Anwendungsfälle aus dem eigenen Betrieb, gemeinsam durchgespielt (§ 2)', 'Typische Fehlerbilder: erfundene Zahlen, Namen, Fristen, Fundstellen in korrektem Format; was vor der Verwendung geprüft wird (§ 5)', 'Der Meldeweg, und dass die Meldung selbst keine Folgen hat (§ 8)', 'Wann und wie gekennzeichnet wird, sofern der Betrieb KI-Inhalte veröffentlicht (§ 7, Checkliste)', 'Wer im Zweifel gefragt wird (§ 9)'],
    contentsGap: 'Betriebseigene Inhalte, z. B. das eigene Tool im Alltag, Beispiele aus dieser Gruppe',
    participantsH: 'Teilnehmende', pCols: (g, d) => ['Nr.', `Name (${g}, ${d})`, 'Funktion', 'Richtlinie erhalten und gelesen', 'Unterschrift'],
    retention: 'Aufbewahrung dieses Blattes', next: 'Nächste Einweisung', signBy: 'Datum, Unterschrift der einweisenden Person',
    noteGroups: 'Je Zielgruppe ein Blatt: Die Pflicht verlangt, Vorkenntnisse und Einsatzzusammenhang zu berücksichtigen; eine Einweisung, die für alle dieselbe ist, passt nur, wenn alle dasselbe tun.',
    ovSheet: 'Je Person', ovTitle: (b) => `Übersicht Einweisungen je Person · ${b}`,
    ovNote: 'Eine Zeile je Person, die KI-Tools dienstlich benutzt, auch freie Mitarbeit und Dienstleister, die mit betrieblichen Tools arbeiten. Je Zeile einen Namen eintragen; der Generator trägt nie Namen ein. Keine Quelle nennt eine Mindestaufbewahrung oder eine Wiederholungspflicht; beides legt der Betrieb fest.',
    ovCols: ['Name', 'Funktion', 'Benutzt KI-Tools dienstlich', 'Erste Einweisung', 'Letzte Einweisung', 'Behandelte Inhalte', 'Kenntnisnahme der Richtlinie am', 'Nächste Einweisung', 'Bemerkungen'],
    yesno: ['ja', 'nein'],
    brSheet: 'Einweisungen', brTitle: 'Verzeichnis der Einweisungen',
    brCols: ['Datum', 'Durchgeführt von', 'Form', 'Dauer', 'Teilnehmende', 'Zielgruppe', 'Teilnehmerliste (Datei)'],
    repeat: { 'tool-yearly': 'bei jedem neuen Tool und jährlich', half: 'halbjährlich', later: 'legt der Betrieb fest' },
    keep: { '3y': 'drei Jahre', '5y': 'fünf Jahre', employment: 'Dauer der Beschäftigung plus ein Jahr' },
  },
};

export function trainingGroups(answers, lang) {
  const t = T[lang] ?? T.en;
  const h2 = answers.H2 ?? {};
  if (h2.value === 'groups' && h2.text) return h2.text.split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
  return [t.allStaff];
}

const keepLabel = (answers, lang) => {
  const t = T[lang] ?? T.en;
  const h5 = answers.H5 ?? {};
  return h5.value === 'other' ? (h5.text || '…') : (t.keep[h5.value] ?? '…');
};
const repeatLabel = (answers, lang) => (T[lang] ?? T.en).repeat[answers.H4?.value] ?? '…';

export function trainingDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const groups = trainingGroups(answers, lang);
  const blocks = [];
  groups.forEach((g, i) => {
    if (i > 0) blocks.push(B.pagebreak());
    blocks.push(B.note(t.note(fmtDate(RETRIEVED, lang))));
    blocks.push(B.fields([
      { label: t.fBusiness, value: business },
      { label: t.fDate, value: `${fmtDate(A('H3').date, lang)} · ___:___ – ___:___`, gap: true },
      { label: t.fBy, value: A('H1').text },
      { label: t.fForm, value: t.forms, gap: true },
      { label: t.fGroup, value: g },
      { label: t.fVersion, value: fmtDate(today, lang) },
    ]));
    if (groups.length > 1) blocks.push(B.note(t.noteGroups));
    blocks.push(B.h(t.contentsH));
    blocks.push(B.checks([...t.contents, t.contentsGap]));
    blocks.push(B.h(t.participantsH));
    blocks.push(B.table(t.pCols(g, fmtDate(A('H3').date, lang) || '…'), Array.from({ length: 14 }, (_, k) => [String(k + 1), '', '', '☐', '']), [6, 32, 24, 18, 20]));
    blocks.push(B.fields([{ label: t.retention, value: keepLabel(answers, lang) }, { label: t.next, value: repeatLabel(answers, lang) }]));
    blocks.push(B.sign([t.signBy]));
  });
  return makeDoc({ id: 'training', lang, title: t.title, business, runLeft: `${business} · ${t.shortTitle}`, runRight: fmtDate(today, lang), blocks, footerRight: business });
}

export function trainingWorkbook(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const wb = workbook();
  addSheet(wb, t.ovSheet, {
    title: t.ovTitle(business), note: t.ovNote,
    columns: t.ovCols.map((h, i) => ({ header: h, width: [26, 24, 16, 16, 16, 30, 18, 16, 30][i] })),
    rows: [], minRows: 15, lists: { 3: t.yesno }, gapColumns: [1, 4, 5, 7, 8],
  });
  const groups = trainingGroups(answers, lang);
  addSheet(wb, t.brSheet, {
    title: t.brTitle,
    columns: t.brCols.map((h, i) => ({ header: h, width: [14, 22, 24, 12, 14, 22, 30][i] })),
    rows: groups.map((g) => [A('H3').date ?? '', A('H1').text ?? '', '', '', '', g, '']),
    minRows: 10, gapColumns: [3, 4, 5, 7],
  });
  return wb;
}
