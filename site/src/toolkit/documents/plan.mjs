// Document D6: the enactment plan (XLSX): fifteen steps with responsibles and target dates, plus the review sheet.
import { workbook, addSheet } from './xlsx.mjs';

const T = {
  en: {
    sheet: 'Plan', title: (b) => `Enactment plan · ${b}`,
    note: 'A rule does not apply because it is written. Four things make a text a rule in force: an effective date, a named responsible person, a traceable way of announcement and a confirmation of receipt. Every step gets a date in "done on" or "n/a" with a reason. Yellow: the business decides.',
    cols: ['Step', 'Responsible', 'Target date', 'Done on', 'Evidence (file, folder)', 'Basis (handbook)'],
    steps: ['1 Name the person responsible for the rule.', '2 Take stock: which tools are actually in use; create the register, also with "unclear".', '3 Take the four decisions of the management: who may use, for what, with which data, who releases.', '4 Complete the usage policy; no yellow passage left open.', '5 Where present, involve the works council and the data protection officer before procuring new tools, not after.', '6 Set up business accounts; set training and input-history options; use a functional address.', '7 Approval check per tool, fill in the form, update the register.', '8 Sign the policy with an effective date after the briefing.', '9 Post the one page and put it in the staff folder.', '10 Hold the briefing; have the attendance list signed.', '11 Have each person confirm receipt of the policy (date in the overview).', '12 Create the labelling checklist per system and per publication, or the dated note "no case at present".', '13 Set up the folder: one folder with the evidence.', '14 Enter the review: date and occasions.', '15 On every new hire: briefing and acknowledgement, add to the overview.'],
    basis: ['6', '3', '2', '2', '6', '3', '3', '6', '2', '4', '6', '5', '6', '6', '4'], basisLabel: (n) => `Handbook section ${n}`, onOccurrence: 'on occurrence',
    na: 'n/a: no works council, no data protection officer', naAsk: 'ask a specialist before procurement',
    evidence: { 2: 'Tool register (D3)', 4: 'AI usage policy (D1)', 7: 'Approval forms (D3)', 8: 'Signed policy (D1)', 9: 'The one page (D2)', 10: 'Attendance lists (D4)', 11: 'Overview per person (D4)', 12: 'Labelling checklist (D5)', 14: 'Sheet "Review"' },
    revSheet: 'Review', revTitle: 'Review: occasions and fixed date',
    revCols: ['Occasion', 'Responsible', 'Date', 'Done on'],
    occasions: ['A new or changed tool', 'Changed terms of a provider', 'A changed legal situation', 'Practice deviates from the rule: decide which of the two changes', 'Fixed date'],
  },
  de: {
    sheet: 'Plan', title: (b) => `Plan der Inkraftsetzung · ${b}`,
    note: 'Eine Regelung gilt nicht, weil sie geschrieben ist. Vier Angaben machen aus einem Text eine geltende Regelung: ein Datum des Inkrafttretens, eine benannte verantwortliche Person, ein nachvollziehbarer Weg der Bekanntgabe und eine Bestätigung der Kenntnisnahme. Jeder Schritt bekommt ein Datum in „erledigt am“ oder „entfällt“ mit Grund. Gelb: Der Betrieb entscheidet.',
    cols: ['Schritt', 'Verantwortlich', 'Zieldatum', 'Erledigt am', 'Beleg (Datei, Ordner)', 'Grundlage (Handbuch)'],
    steps: ['1 Verantwortliche Person für die Regelung benennen.', '2 Bestand aufnehmen: Welche Tools werden tatsächlich benutzt; Register anlegen, auch mit „unklar“.', '3 Die vier Entscheidungen der Leitung treffen: wer darf, wofür, mit welchen Daten, wer gibt frei.', '4 Nutzungsrichtlinie ausfüllen; keine gelbe Stelle mehr offen.', '5 Wo vorhanden, Betriebsrat und Datenschutzbeauftragte vor der Beschaffung neuer Tools einbinden, nicht danach.', '6 Betriebliche Konten einrichten; Voreinstellungen zu Training und Eingabe-Historie setzen; Funktionsadresse verwenden.', '7 Freigabeprüfung je Tool, Formular ausfüllen, Register nachziehen.', '8 Richtlinie unterschreiben, mit einem Geltungsbeginn nach der Einweisung.', '9 Die eine Seite aushängen und in die Ablage der Belegschaft legen.', '10 Einweisung durchführen; Teilnehmerliste unterschreiben lassen.', '11 Kenntnisnahme der Richtlinie je Person bestätigen lassen (Datum in der Übersicht).', '12 Kennzeichnungs-Checkliste je System und je Veröffentlichung anlegen, oder den datierten Vermerk „derzeit kein Fall“.', '13 Ablage anlegen: ein Ordner mit den Nachweisen.', '14 Wiedervorlage eintragen: Termin und Anlässe.', '15 Bei Neueintritt: Einweisung und Kenntnisnahme nachholen, Übersicht ergänzen.'],
    basis: ['6', '3', '2', '2', '6', '3', '3', '6', '2', '4', '6', '5', '6', '6', '4'], basisLabel: (n) => `Handbuch Abschnitt ${n}`, onOccurrence: 'bei Eintritt',
    na: 'entfällt: kein Betriebsrat, keine Datenschutzbeauftragte', naAsk: 'vor der Beschaffung Fachperson fragen',
    evidence: { 2: 'Tool-Register (D3)', 4: 'KI-Nutzungsrichtlinie (D1)', 7: 'Freigabeformulare (D3)', 8: 'Unterschriebene Richtlinie (D1)', 9: 'Die eine Seite (D2)', 10: 'Teilnehmerlisten (D4)', 11: 'Übersicht je Person (D4)', 12: 'Kennzeichnungs-Checkliste (D5)', 14: 'Blatt „Wiedervorlage“' },
    revSheet: 'Wiedervorlage', revTitle: 'Wiedervorlage: Anlässe und fester Termin',
    revCols: ['Anlass', 'Verantwortlich', 'Datum', 'Erledigt am'],
    occasions: ['Ein neues oder geändertes Tool', 'Geänderte Bedingungen eines Anbieters', 'Eine geänderte Rechtslage', 'Die Praxis weicht von der Regel ab: entscheiden, welche von beiden geändert wird', 'Fester Termin'],
  },
};

export function addMonths(iso, months) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return '';
  d.setUTCMonth(d.getUTCMonth() + Number(months));
  return d.toISOString().slice(0, 10);
}

export function addDays(iso, days) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return '';
  d.setUTCDate(d.getUTCDate() + Number(days));
  return d.toISOString().slice(0, 10);
}

export function reviewDate(answers) {
  return addMonths(answers.I1?.date, answers.I2?.value || 12);
}

export function planWorkbook(def, answers, lang) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const resp = { 1: A('A4').text, 2: A('A5').text, 3: A('A4').text, 4: A('A4').text, 5: A('A4').text, 6: A('B5').text, 7: A('A5').text, 8: A('A4').text, 9: A('A4').text, 10: A('H1').text, 11: A('H1').text, 12: A('A6').text, 13: A('A4').text, 14: A('A4').text, 15: A('H1').text };
  // Target dates: preparation one week before the briefing, signature and posting the day before it (signed before it is handed out), briefing and acknowledgement on the briefing day, labelling checklist, folder and review entry on the effective date.
  const briefing = A('H3').date ?? '';
  const effective = A('I1').date ?? '';
  const prep = addDays(briefing, -7);
  const dayBefore = addDays(briefing, -1);
  const dates = { 1: prep, 2: prep, 3: prep, 4: prep, 5: prep, 6: prep, 7: prep, 8: dayBefore, 9: dayBefore, 10: briefing, 11: briefing, 12: effective, 13: effective, 14: effective, 15: t.onOccurrence };
  const none = A('A10').value === 'none';
  const rows = t.steps.map((s, i) => {
    const n = i + 1;
    const done = n === 5 && none ? t.na : '';
    const evidence = n === 13 ? (A('I3').text ?? '') : (t.evidence[n] ?? (n === 5 && !none ? t.naAsk : ''));
    return [s, resp[n] ?? '', done ? '' : (dates[n] ?? ''), done, evidence, t.basisLabel(t.basis[i])];
  });
  const wb = workbook();
  addSheet(wb, t.sheet, { title: t.title(business), note: t.note, columns: t.cols.map((h, i) => ({ header: h, width: [70, 22, 14, 14, 30, 20][i] })), rows, gapColumns: [2, 3, 4] });
  addSheet(wb, t.revSheet, { title: t.revTitle, columns: t.revCols.map((h, i) => ({ header: h, width: [60, 22, 14, 14][i] })), rows: t.occasions.map((o, i) => [o, A('A4').text, i === 4 ? reviewDate(answers) : '', '']), gapColumns: [3, 4] });
  return wb;
}
