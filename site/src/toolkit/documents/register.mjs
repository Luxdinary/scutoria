// Document D3: the tool register (XLSX) and the approval form per tool (DOCX, PDF).
import { optionLabel } from '../engine.mjs';
import { B, makeDoc } from './blocks.mjs';
import { workbook, addSheet } from './xlsx.mjs';
import { findQ, joinList, multiLabels, fmtDate } from './policy.mjs';

// List values never contain a comma: Excel splits a list at every comma.
const T = {
  en: {
    sheet: 'Register', title: (b) => `Tool register · ${b}`,
    note: 'One row per tool actually in use. A row without a date is not evidence. Approval: yes, yes with restriction, no, unclear ("unclear" is a finding, not a failure). Yellow cells: the business decides. Enter the tool name with the date you checked it; provider terms change.',
    cols: ['No', 'Tool kind', 'Name and provider', 'Purpose', 'Users', 'Account kind', 'Data kinds', 'Approval', 'Reviewed on', 'Review due', 'Note'],
    data: ['no personal data', 'personal data', 'trade secrets', 'third-party data', 'mixed'],
    approval: ['yes', 'yes with restriction', 'no', 'unclear'],
    notePrivate: 'Private account: not permitted for work (§ 1 of the policy). Either a business account or use ends on the effective date.',
    noteUnknown: 'Account kind unknown: clarify first, then check.',
    noteShared: 'Shared account: one login for several people. Check that the provider\'s terms allow it and how inputs can be traced to a person if an incident is reported.',
    privateUse: 'Private use on own phones or accounts',
    purposeHint: 'Keep only the purposes this tool is used for.',
    listError: { title: 'Not in the list', text: 'Choose a value from the list.' },
    checkSheet: 'Approval check', checkTitle: 'Approval check per tool: seven questions, checked at the provider\'s own pages or contract',
    checkNote: 'A blank field is a finding ("no statement on the page checked"); a filled field without source and date is not. The standard of the business applies to every tool alike. Copy this sheet once per tool.',
    checkCols: ['Question', 'Answer (yes / no / no statement / not surveyed)', 'Source at the provider, date', 'Wording / remark'],
    checkTool: 'Tool',
    answers: ['yes', 'no', 'no statement on the page checked', 'not surveyed'],
    questions: [
      '1 Training with business data: are inputs used to train the models? Can this be excluded or opted out?',
      '2 Data processing agreement: is one offered, and for which services?',
      '3 Place of processing: is there a reliable commitment to processing in the EU, with which exceptions?',
      '4 Third-party rights: does the provider indemnify against third-party claims, and what is excluded (own inputs)?',
      '5 Deletion and input history: can it be set that no input history is kept beyond the session and inputs are not used for training?',
      '6 Access and account kind: is there a business account without personal names, with a functional address? Who manages it?',
      '7 Lawfulness of model development: is there an official or court finding about the provider? Usually "not surveyed" for a business without a legal department.',
    ],
    decision: 'Decision', decisionFor: (tool) => `Decision for: ${tool}`, decisions: ['approved without restriction', 'approved with restriction', 'not approved'], restriction: 'Restriction', reason: 'Reason', standard: 'Standard of the business', checker: 'Checked by', due: 'Review due', signChecker: 'Date, signature of the checking person', signMgmt: 'Date, signature of the management',
    standardNote: 'Under § 3 and § 4 of the policy no personal data are entered at present; this standard applies once § 4 is changed.',
    howSheet: 'How to use', how: ['1. Every tool in use gets a row, also with "unclear".', '2. Enter the tool name with the date you checked it; provider terms change.', '3. Check each tool with the seven questions on sheet 2 or with the approval form.', '4. Check at the provider\'s page or contract, not at an article about the provider.', '5. "No statement on the page checked" is a finding; enter it as such.', '6. The standard of the business (approval form) applies to every tool alike.', '7. After the decision: update approval, review date and review due in the row.', '8. Private accounts are not approved; the policy decides this in § 1.', '9. A changed provider term triggers a new check, regardless of the review date.', '10. File the signed approval form with this register.'],
    formTitle: 'Approval form: check a tool and decide', shortTitle: 'Approval form', formNote: 'One form per tool. Checked at the provider\'s page or contract; the concluded contract prevails. A blank field is a finding; a filled field without source and date is not. The form sets no benchmark for approval; the management decides.',
    fTool: 'Tool (name in the business)', fProvider: 'Provider, product, tariff', fKind: 'Tool kind', fPurpose: 'Purpose in the business', fUsers: 'Users', fAccount: 'Account kind', fData: 'Data kinds', fChecker: 'Checking person',
    afterwards: 'After the decision: update the row in the tool register (approval, review date, review due) and file this form with it.',
  },
  de: {
    sheet: 'Register', title: (b) => `Tool-Register · ${b}`,
    note: 'Eine Zeile je Tool, das tatsächlich benutzt wird. Eine Zeile ohne Datum ist kein Nachweis. Freigabe: ja, ja mit Einschränkung, nein, unklar („unklar“ ist ein Befund, kein Versäumnis). Gelbe Felder: Der Betrieb entscheidet. Tool-Namen mit dem Prüfdatum eintragen; Anbieterbedingungen ändern sich.',
    cols: ['Nr.', 'Tool-Art', 'Bezeichnung und Anbieter', 'Zweck', 'Nutzerkreis', 'Kontoart', 'Datenarten', 'Freigabe', 'Geprüft am', 'Wiedervorlage', 'Vermerk'],
    data: ['keine personenbezogenen Daten', 'personenbezogene Daten', 'Geschäftsgeheimnisse', 'Angaben Dritter', 'gemischt'],
    approval: ['ja', 'ja mit Einschränkung', 'nein', 'unklar'],
    notePrivate: 'Privates Konto: nicht dienstlich zulässig (§ 1 der Richtlinie). Entweder betriebliches Konto oder die Nutzung endet mit dem Geltungsbeginn.',
    noteUnknown: 'Kontoart unbekannt: zuerst klären, dann prüfen.',
    noteShared: 'Geteiltes Konto: ein Zugang für mehrere Personen. Prüfen, ob die Bedingungen des Anbieters das erlauben und wie sich Eingaben bei einer Meldung einer Person zuordnen lassen.',
    privateUse: 'Private Nutzung auf eigenen Telefonen oder Konten',
    purposeHint: 'Nur die Zwecke stehen lassen, für die dieses Tool benutzt wird.',
    listError: { title: 'Nicht in der Liste', text: 'Bitte einen Wert aus der Liste wählen.' },
    checkSheet: 'Freigabeprüfung', checkTitle: 'Freigabeprüfung je Tool: sieben Fragen, geprüft an der Seite oder dem Vertrag des Anbieters',
    checkNote: 'Ein leeres Feld ist ein Befund („auf der geprüften Seite keine Angabe“); ein ausgefülltes Feld ohne Fundstelle und Datum ist keiner. Der Maßstab des Betriebs gilt für alle Tools gleich. Dieses Blatt je Tool kopieren.',
    checkCols: ['Frage', 'Antwort (ja / nein / keine Angabe / nicht erhoben)', 'Fundstelle beim Anbieter, Datum', 'Wortlaut / Bemerkung'],
    checkTool: 'Tool',
    answers: ['ja', 'nein', 'auf der geprüften Seite keine Angabe', 'nicht erhoben'],
    questions: [
      '1 Training mit Geschäftsdaten: Werden Eingaben zum Training der Modelle verwendet? Lässt sich das ausschließen oder abwählen?',
      '2 Auftragsverarbeitungsvertrag: Wird einer angeboten, und für welche Dienste?',
      '3 Ort der Verarbeitung: Gibt es eine belastbare Zusage zur Verarbeitung in der Union, mit welchen Ausnahmen?',
      '4 Rechte Dritter: Stellt der Anbieter bei Ansprüchen Dritter frei, und was ist ausgenommen (eigene Eingaben)?',
      '5 Löschung und Eingabe-Historie: Lässt sich einstellen, dass keine Eingabe-Historie über die Sitzung hinaus gespeichert wird und Eingaben nicht zum Training verwendet werden?',
      '6 Zugang und Kontoart: Gibt es ein betriebliches Konto ohne Personennamen mit Funktionsadresse? Wer verwaltet es?',
      '7 Rechtmäßigkeit der Modellentwicklung: Liegt eine behördliche oder gerichtliche Feststellung zum Anbieter vor? Ein Betrieb ohne Rechtsabteilung lässt die Zeile in der Regel als „nicht erhoben“ stehen.',
    ],
    decision: 'Entscheidung', decisionFor: (tool) => `Entscheidung für: ${tool}`, decisions: ['freigegeben ohne Einschränkung', 'freigegeben mit Einschränkung', 'nicht freigegeben'], restriction: 'Einschränkung', reason: 'Begründung', standard: 'Maßstab des Betriebs', checker: 'Prüfende Person', due: 'Wiedervorlage', signChecker: 'Datum, Unterschrift der prüfenden Person', signMgmt: 'Datum, Unterschrift der Leitung',
    standardNote: 'Nach § 3 und § 4 der Richtlinie werden derzeit keine personenbezogenen Daten eingegeben; der Maßstab greift, sobald § 4 geändert wird.',
    howSheet: 'Anleitung', how: ['1. Jedes benutzte Tool bekommt eine Zeile, auch mit „unklar“.', '2. Tool-Namen mit dem Prüfdatum eintragen; Anbieterbedingungen ändern sich.', '3. Jedes Tool mit den sieben Fragen auf Blatt 2 oder mit dem Freigabeformular prüfen.', '4. Geprüft wird an der Seite oder dem Vertrag des Anbieters, nicht an einem Artikel über ihn.', '5. „Auf der geprüften Seite keine Angabe“ ist ein Befund; so eintragen.', '6. Der Maßstab des Betriebs (Freigabeformular) gilt für alle Tools gleich.', '7. Nach der Entscheidung: Freigabe, Prüfdatum und Wiedervorlage in der Zeile nachziehen.', '8. Private Konten werden nicht freigegeben; das entscheidet § 1 der Richtlinie.', '9. Geänderte Anbieterbedingungen lösen eine neue Prüfung aus, unabhängig von der Wiedervorlage.', '10. Das unterschriebene Freigabeformular zu diesem Register ablegen.'],
    formTitle: 'Freigabeformular: ein Tool prüfen und entscheiden', shortTitle: 'Freigabeformular', formNote: 'Ein Formular je Tool. Geprüft wird an der Seite oder dem Vertrag des Anbieters; maßgeblich ist der abgeschlossene Vertrag. Ein leeres Feld ist ein Befund; ein ausgefülltes Feld ohne Fundstelle und Datum ist keiner. Das Formular gibt keinen Maßstab vor; die Leitung entscheidet.',
    fTool: 'Tool (Bezeichnung im Betrieb)', fProvider: 'Anbieter, Produkt, Tarif', fKind: 'Tool-Art', fPurpose: 'Zweck im Betrieb', fUsers: 'Nutzerkreis', fAccount: 'Kontoart', fData: 'Datenarten', fChecker: 'Prüfende Person',
    afterwards: 'Nach der Entscheidung: Zeile im Tool-Register nachziehen (Freigabe, Prüfdatum, Wiedervorlage) und dieses Blatt dazu ablegen.',
  },
};

// The tools the business named, in the order of B1.
export function registerRows(def, answers, lang) {
  const b1 = findQ(def, 'B1');
  const b2 = findQ(def, 'B2');
  const kinds = (answers.B1?.values ?? []).filter((v) => v !== 'none');
  const rows = answers.B2?.rows ?? {};
  const t = T[lang] ?? T.en;
  return kinds.map((kind, i) => {
    const r = rows[kind] ?? { name: '', account: 'unknown' };
    const kindLabel = kind === 'other' && answers.B1?.text ? answers.B1.text : optionLabel(b1, kind, lang);
    const accountLabel = optionLabel(b2, r.account, lang);
    const approval = r.account === 'private' ? t.approval[2] : t.approval[3];
    const note = r.account === 'private' ? t.notePrivate : r.account === 'unknown' ? t.noteUnknown : r.account === 'shared' ? t.noteShared : '';
    return { n: i + 1, kind, kindLabel, name: r.name, account: r.account, accountLabel, approval, note };
  });
}

// Question B3: tools used on private phones or through private accounts ("yes" or "we do not know"). The register gets its own row for it, the evidence summary shows it as open.
export function privateUseReported(answers) {
  return ['yes', 'unknown'].includes(answers.B3?.value);
}

// The purpose of a tool is prefilled only where the tool kind decides it; otherwise every purpose from C1 stands and the business keeps the ones that apply.
const PURPOSE_OF_KIND = { translation: 'translations', image: 'images', transcription: 'meetings' };
function toolPurpose(def, answers, lang, kind) {
  const c1 = findQ(def, 'C1');
  const own = PURPOSE_OF_KIND[kind];
  if (own && (answers.C1?.values ?? []).includes(own)) return { text: multiLabels(c1, { values: [own] }, lang)[0], clear: true };
  return { text: joinList(multiLabels(c1, answers.C1, lang), lang), clear: false };
}

const listRule = (values, t) => ({ type: 'list', allowBlank: true, formulae: [`"${values.join(',')}"`], showErrorMessage: true, errorStyle: 'stop', errorTitle: t.listError.title, error: t.listError.text });

// Rows of a sheet whose first column holds the given text.
function rowOf(ws, text) {
  for (let r = 1; r <= ws.rowCount; r++) if (ws.getCell(r, 1).value === text) return r;
  return 0;
}

export function registerWorkbook(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const wb = workbook();
  const b2 = findQ(def, 'B2');
  const tools = registerRows(def, answers, lang);
  const purposes = tools.map((r) => toolPurpose(def, answers, lang, r.kind));
  const rows = tools.map((r, i) => [r.n, r.kindLabel, r.name, purposes[i].text, '', r.accountLabel, '', r.approval, '', '', r.note]);
  if (privateUseReported(answers)) rows.push([tools.length + 1, t.privateUse, '', '', '', optionLabel(b2, 'private', lang), '', t.approval[2], '', '', t.notePrivate]);
  const ws = addSheet(wb, t.sheet, {
    title: t.title(business), note: t.note,
    columns: t.cols.map((h, i) => ({ header: h, width: [6, 22, 26, 30, 18, 16, 22, 20, 14, 14, 40][i] })),
    rows, minRows: 12,
    lists: { 6: b2.accounts.map((o) => o[lang] ?? o.en), 7: t.data, 8: t.approval },
    gapColumns: [3, 4, 5, 7, 8, 9, 10],
  });
  // A value outside the list is refused with a short message.
  for (let r = 1; r <= ws.rowCount; r++) {
    for (const c of [6, 7, 8]) {
      const dv = ws.getCell(r, c).dataValidation;
      if (dv?.type === 'list') ws.getCell(r, c).dataValidation = { ...dv, showErrorMessage: true, errorStyle: 'stop', errorTitle: t.listError.title, error: t.listError.text };
    }
  }
  // Where the purpose could not be decided from the tool kind, the cell says what to do.
  const first = rowOf(ws, 1);
  if (first) purposes.forEach((p, i) => { if (!p.clear) ws.getCell(first + i, 4).note = t.purposeHint; });

  const i4 = findQ(def, 'I4');
  const standardNote = A('E1').value !== 'approved' && A('I4').value === 'no-dpa-no-personal' ? t.standardNote : '';
  const check = addSheet(wb, t.checkSheet, {
    title: t.checkTitle, note: t.checkNote,
    columns: t.checkCols.map((h, i) => ({ header: h, width: [70, 30, 34, 40][i] })),
    rows: [[t.checkTool, '', '', ''], ...t.questions.map((q) => [q, '', '', '']), [t.decision, '', '', ''], [t.standard, optionLabel(i4, A('I4').value, lang), '', standardNote], [t.checker, A('A5').text, '', ''], [t.due, '', '', '']],
    gapColumns: [2, 3, 4],
  });
  // The answer list sits on the seven question rows only; the decision row has its own list.
  for (const q of t.questions) { const r = rowOf(check, q); if (r) check.getCell(r, 2).dataValidation = listRule(t.answers, t); }
  const dr = rowOf(check, t.decision);
  if (dr) check.getCell(dr, 2).dataValidation = listRule(t.decisions, t);
  addSheet(wb, t.howSheet, { columns: [{ header: t.howSheet, width: 110 }], rows: t.how.map((x) => [x]) });
  return wb;
}

export function approvalDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const i4 = findQ(def, 'I4');
  const standardNote = A('E1').value !== 'approved' && A('I4').value === 'no-dpa-no-personal';
  const tools = registerRows(def, answers, lang);
  const list = tools.length ? tools : [{ kind: '', kindLabel: '…', name: '', accountLabel: '…' }];
  const blocks = [];
  list.forEach((tool, i) => {
    if (i > 0) blocks.push(B.pagebreak());
    const purpose = toolPurpose(def, answers, lang, tool.kind);
    blocks.push(B.note(t.formNote));
    blocks.push(B.fields([
      { label: t.fTool, value: tool.name || tool.kindLabel, gap: !tool.name },
      { label: t.fProvider, value: '', gap: true },
      { label: t.fKind, value: tool.kindLabel },
      { label: t.fPurpose, value: purpose.clear ? purpose.text : `${purpose.text}. ${t.purposeHint}`, gap: !purpose.clear },
      { label: t.fUsers, value: '', gap: true },
      { label: t.fAccount, value: tool.accountLabel },
      { label: t.fData, value: '', gap: true },
      { label: t.fChecker, value: A('A5').text },
    ]));
    blocks.push(B.table(t.checkCols, t.questions.map((q) => [q, '', '', '']), [40, 16, 22, 22]));
    blocks.push(B.h2(t.decisionFor(tool.name || tool.kindLabel)));
    blocks.push(B.checks(t.decisions.slice(0, 2)));
    blocks.push(B.fields([{ label: t.restriction, value: '', gap: true }]));
    blocks.push(B.checks(t.decisions.slice(2)));
    blocks.push(B.fields([{ label: t.reason, value: '', gap: true }, { label: t.standard, value: optionLabel(i4, A('I4').value, lang) }, { label: t.due, value: '', gap: true }]));
    if (standardNote) blocks.push(B.note(t.standardNote));
    blocks.push(B.sign([t.signChecker, t.signMgmt]));
    blocks.push(B.note(t.afterwards));
  });
  return makeDoc({ id: 'approval', lang, title: t.formTitle, business, runLeft: `${business} · ${t.shortTitle}`, runRight: fmtDate(ctx.today ?? new Date().toISOString().slice(0, 10), lang), blocks, footerRight: business });
}
