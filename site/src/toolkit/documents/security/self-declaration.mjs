// Document D1 of the Security Evidence Toolkit: the self-declaration. Nine sections filled from the answers, with the three honest
// levels of the old kit: in place, partly, not yet with a target date. It describes one day and certifies nothing.
import { B, makeDoc } from '../blocks.mjs';
import { optionLabel } from '../../engine.mjs';
import { attachmentCount } from './evidence-list.mjs';

const T = {
  en: {
    title: 'Security self-declaration', kicker: 'Self-declaration · Security Evidence Toolkit',
    business: 'Business', date: 'State as of', recipient: 'Prepared for', firstWave: 'First measures by', review: 'Review',
    intro: (b, d) => `This self-declaration describes the state of information security at ${b} on ${d}. Every field uses one of four answers: in place, partly, not yet with a target date, or not applicable with the reason. An honest “not yet” with a date is a complete answer.`,
    overviewH: 'Overview', overviewHead: ['Area', 'In place', 'Partly', 'Not yet', 'N/A'],
    sections: { A: 'A · Business and role', B: 'B · Organisation', C: 'C · Access and identities', D: 'D · Backup and continuity', E: 'E · Updates and devices', F: 'F · Incidents and reporting', G: 'G · People and training', H: 'H · Own providers and cloud', I: 'I · Evidence and end of contract' },
    labels: {
      A1: 'Business', A2: 'Country', A3: 'Size', A4: 'Responsible for information security', A5: 'IT looked after by', A7: 'What we deliver and access', A8: 'Evidence folder',
      B1: 'Written security rules', B2: 'Cyber insurance', B3: 'Certificates, labels, audits',
      C1: 'One account per person, no shared logins', C2: 'Multi-factor authentication, email', C3: 'Multi-factor authentication, remote access, administration, cloud, banking', C4: 'Access removed on leaving, from an account list', C5: 'Daily work without administrator rights', C6: 'Password rule and password manager',
      D1: 'Backup, daily and automatic, one copy out of reach', D2: 'Restore tested, with the time recorded', D3: 'Tolerable downtime: how long we can bridge without IT', D4: 'Emergency plan',
      E1: 'Updates within days, automatic', E2: 'Device list, supported devices and programs only', E3: 'Protective software, encrypted laptops and phones', E4: 'Vulnerability contact and support period for own products', E5: 'Router or firewall current, guest network separated',
      F1: 'Reporting deadline to the customer', F2: 'Personal data check and 72-hour report', F3: 'Incidents in the last 24 months', F4: 'Incident log',
      G1: 'Briefing in the last twelve months, with record', G2: 'Confidentiality in writing', G3: 'Call-back rule for payments',
      H1: 'List of providers with country and purpose', H2: 'Processing agreements and provider security settings', H3: 'Customer informed before a provider changes',
      I1: 'Return or deletion of customer data at contract end', I4: 'Review of this self-declaration',
    },
    status: { yes: 'In place', partly: 'Partly', notyet: 'Not yet', na: 'Not applicable' },
    planned: (d) => `planned by ${d}`, every: (n) => `Every ${n} months, and when something essential changes`,
    staff: (size, v) => (v === '1' ? size : `${size} staff`),
    closing: (d, n) => `This self-declaration describes the state on ${d}. It is not a certification and establishes no legal consequence. Attachments: see the evidence list (D4), ${n > 1 ? `Att. 1 to ${n}` : 'Att. 1'}.`,
    sign: ['Signed for the business (management)', 'Name, function (block letters)', 'Place, date'],
    note: 'Generated with the Scutoria Security Evidence Toolkit from the answers of the business. Source-based. No legal advice.',
  },
  de: {
    title: 'Selbstauskunft Informationssicherheit', kicker: 'Selbstauskunft · Sicherheitsnachweis-Toolkit',
    business: 'Betrieb', date: 'Stand', recipient: 'Erstellt für', firstWave: 'Erste Maßnahmen bis', review: 'Überprüfung',
    intro: (b, d) => `Diese Selbstauskunft beschreibt den Stand der Informationssicherheit bei ${b} am ${d}. Jedes Feld trägt eine von vier Antworten: vorhanden, teilweise, noch nicht mit Termin, oder nicht anwendbar mit Grund. Ein ehrliches „noch nicht“ mit Termin ist eine vollständige Antwort.`,
    overviewH: 'Übersicht', overviewHead: ['Bereich', 'Vorhanden', 'Teilweise', 'Noch nicht', 'N. a.'],
    sections: { A: 'A · Betrieb und Rolle', B: 'B · Organisation', C: 'C · Zugang und Identität', D: 'D · Sicherung und Wiederanlauf', E: 'E · Updates und Geräte', F: 'F · Vorfälle und Meldung', G: 'G · Personal und Schulung', H: 'H · Eigene Lieferanten und Cloud', I: 'I · Nachweise und Vertragsende' },
    labels: {
      A1: 'Betrieb', A2: 'Land', A3: 'Größe', A4: 'Verantwortlich für Informationssicherheit', A5: 'IT betreut durch', A7: 'Was wir liefern und worauf wir zugreifen', A8: 'Nachweisordner',
      B1: 'Schriftliche Sicherheitsregeln', B2: 'Cyberversicherung', B3: 'Zertifikate, Gütesiegel, Prüfungen',
      C1: 'Ein Konto je Person, keine geteilten Logins', C2: 'Multi-Faktor-Authentifizierung, E-Mail', C3: 'Multi-Faktor-Authentifizierung, Fernzugriff, Administration, Cloud, Banking', C4: 'Rechteentzug beim Ausscheiden, anhand einer Kontenliste', C5: 'Tägliche Arbeit ohne Administratorrechte', C6: 'Passwortregel und Passwort-Manager',
      D1: 'Sicherung, täglich und automatisch, eine Kopie außer Reichweite', D2: 'Wiederherstellung geprobt, Dauer notiert', D3: 'Tolerierbare Ausfallzeit: wie lange wir ohne IT überbrücken', D4: 'Notfallplan',
      E1: 'Updates innerhalb von Tagen, automatisch', E2: 'Geräteliste, nur unterstützte Geräte und Programme', E3: 'Schutzsoftware, verschlüsselte Notebooks und Telefone', E4: 'Schwachstellenkontakt und Unterstützungszeitraum eigener Produkte', E5: 'Router oder Firewall aktuell, Gastnetz getrennt',
      F1: 'Meldefrist an den Kunden', F2: 'Prüfung auf Personenbezug und 72-Stunden-Meldung', F3: 'Vorfälle der letzten 24 Monate', F4: 'Vorfallsprotokoll',
      G1: 'Einweisung in den letzten zwölf Monaten, mit Nachweis', G2: 'Vertraulichkeit schriftlich', G3: 'Rückrufregel für Zahlungen',
      H1: 'Liste der Dienstleister mit Land und Zweck', H2: 'Auftragsverarbeitungsverträge und Sicherheitseinstellungen der Anbieter', H3: 'Kunde informiert vor dem Wechsel eines Dienstleisters',
      I1: 'Rückgabe oder Löschung der Kundendaten bei Vertragsende', I4: 'Überprüfung dieser Selbstauskunft',
    },
    status: { yes: 'Vorhanden', partly: 'Teilweise', notyet: 'Noch nicht', na: 'Nicht anwendbar' },
    planned: (d) => `geplant bis ${d}`, every: (n) => `Alle ${n} Monate, und wenn sich etwas Wesentliches ändert`,
    staff: (size, v) => (v === '1' ? size : `${size} Beschäftigte`),
    closing: (d, n) => `Diese Selbstauskunft beschreibt den Stand am ${d}. Sie ist keine Zertifizierung und stellt keine Rechtsfolge fest. Anlagen: siehe Nachweisliste (D4), ${n > 1 ? `Anl. 1 bis ${n}` : 'Anl. 1'}.`,
    sign: ['Unterschrift für den Betrieb (Leitung)', 'Name, Funktion (Druckschrift)', 'Ort, Datum'],
    note: 'Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria aus den Antworten des Betriebs. Quellenbasiert. Keine Rechtsberatung.',
  },
};

const STATUS_VALUES = new Set(['yes', 'partly', 'notyet', 'na']);
const addDays = (iso, days) => { const d = new Date(`${iso}T00:00:00Z`); if (Number.isNaN(d.getTime())) return ''; d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); };

// Dates in the documents: English as in the United Kingdom, German as in Austria for Austrian businesses ("Jänner") and as in Germany
// for all others ("Januar").
export function fmtDate(iso, lang, answers) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return iso;
  const locale = lang === 'de' ? (answers && answers.A2?.value && answers.A2.value !== 'AT' ? 'de-DE' : 'de-AT') : 'en-GB';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// One source for the area titles in every document and table of this toolkit: "C · Access and identities".
export const sectionTitle = (area, lang) => (T[lang] ?? T.en).sections[area] ?? area;

// The word for "drawer": Austrian for Austrian businesses, standard German for all others.
export const drawerWord = (answers) => (answers?.A2?.value && answers.A2.value !== 'AT' ? 'Schublade' : 'Lade');

// The target date of a measure: the first wave on the date of I3, the second two months later, the third five months later.
export function targetDate(answers, prio = 2) {
  const first = answers.I3?.date || '';
  if (!first) return '';
  return addDays(first, prio === 1 ? 0 : prio === 2 ? 60 : 150);
}

export const questionsOf = (def) => def.blocks.flatMap((b) => b.questions.map((q) => ({ ...q, block: b.id })));

// Is this a status question (in place, partly, not yet, not applicable)? Only those are counted and planned.
export const isStatusQuestion = (q) => q.type === 'select' && (q.options ?? []).some((o) => o.v === 'notyet');

// Status of one answer for the overview and the evidence page: ok, warn, open, na, or info for plain facts.
export function statusOf(q, a) {
  if (!isStatusQuestion(q)) return 'info';
  const v = a?.value;
  if (v === 'yes') return 'ok';
  if (v === 'partly') return 'warn';
  if (v === 'na') return 'na';
  return 'open';
}

// Is the text of a role answer only the role label, without a name? Then the documents ask for the name.
export function isRoleLabel(q, text) {
  const t = String(text ?? '').trim();
  return !t || (q?.roles ?? []).some((r) => r.en === t || r.de === t);
}

// The text of one field of the self-declaration. "Partly" and "not applicable" carry the reason of the chosen option when no free text
// is given ("Not applicable: we supply no software or devices").
export function fieldValue(q, a, lang, answers) {
  const t = T[lang] ?? T.en;
  const detail = (a?.text ?? '').trim();
  if (!q) return '';
  if (q.type === 'text' || q.type === 'textarea') return a?.text ?? '';
  if (q.type === 'date') return fmtDate(a?.date, lang, answers);
  if (q.type === 'role') return `${a?.text ?? ''}${a?.contact ? `, ${a.contact}` : ''}${a?.deputy ? (lang === 'de' ? `; Vertretung: ${a.deputy}` : `; deputy: ${a.deputy}`) : ''}`;
  if (q.type === 'multi') return (a?.values ?? []).map((v) => optionLabel(q, v, lang)).join(', ') + (detail ? ` (${detail})` : '');
  if (q.type === 'select') {
    const v = a?.value;
    if (isStatusQuestion(q) && STATUS_VALUES.has(v)) {
      const word = t.status[v];
      if (v === 'yes') return word + (detail ? `: ${detail}` : '');
      const base = detail ? `${word}: ${detail}` : (v === 'na' || v === 'partly' ? optionLabel(q, v, lang) : word);
      if (v === 'na') return base;
      const planned = targetDate(answers, q.prio ?? 2);
      return `${base} · ${t.planned(fmtDate(planned, lang, answers) || '…')}`;
    }
    if (q.id === 'A3') return t.staff(optionLabel(q, v, lang), v);
    return optionLabel(q, v, lang) + (detail ? ` (${detail})` : '');
  }
  return '';
}

export function selfDeclarationDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const fd = (iso) => fmtDate(iso, lang, answers);
  const business = A('A1').text || '…';
  const date = A('I2').date || ctx.today || new Date().toISOString().slice(0, 10);
  const qs = questionsOf(def);
  const byId = Object.fromEntries(qs.map((q) => [q.id, q]));

  // Overview per area: how many fields are in place, partly, not yet, not applicable.
  const areas = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const rows = areas.map((area) => {
    const counts = { ok: 0, warn: 0, open: 0, na: 0 };
    for (const q of qs) if (q.block === area && isStatusQuestion(q)) counts[statusOf(q, A(q.id))] += 1;
    return [t.sections[area], String(counts.ok), String(counts.warn), String(counts.open), String(counts.na)];
  });
  const total = rows.reduce((acc, r) => ({ ok: acc.ok + Number(r[1]), warn: acc.warn + Number(r[2]), open: acc.open + Number(r[3]), na: acc.na + Number(r[4]) }), { ok: 0, warn: 0, open: 0, na: 0 });
  rows.push([lang === 'de' ? 'Gesamt' : 'Total', String(total.ok), String(total.warn), String(total.open), String(total.na)]);

  // Every field carries its question id, so that the evidence list (D4) and the clause checklist (D6) can point to it.
  const field = (id) => ({ label: `${id} · ${t.labels[id] ?? byId[id]?.label?.[lang] ?? id}`, value: fieldValue(byId[id], A(id), lang, answers) });
  const sectionFields = {
    A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A7', 'A8'],
    B: ['B1', 'B2', 'B3'],
    C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    D: ['D1', 'D2', 'D3', 'D4'],
    E: ['E1', 'E2', 'E3', 'E4', 'E5'],
    F: ['F1', 'F2', 'F3', 'F4'],
    G: ['G1', 'G2', 'G3'],
    H: ['H1', 'H2', 'H3'],
    I: ['I1'],
  };
  const blocks = [
    B.p(t.intro(business, fd(date))),
    B.h(t.overviewH),
    B.table(t.overviewHead, rows, [44, 14, 14, 14, 14]),
  ];
  for (const [area, ids] of Object.entries(sectionFields)) {
    blocks.push(B.h(t.sections[area]));
    const items = ids.filter((id) => byId[id]).map(field);
    if (area === 'I') {
      items.push({ label: `I3 · ${t.firstWave}`, value: fd(A('I3').date) || '…' });
      items.push({ label: `I4 · ${t.labels.I4}`, value: t.every(A('I4').value || '12') });
    }
    blocks.push(B.fields(items));
  }
  blocks.push(B.p(t.closing(fd(date), attachmentCount(def, answers, lang))));
  blocks.push(B.sign(t.sign));
  blocks.push(B.note(t.note));

  // "Prepared for" only when a recipient is entered (A11), with its first line.
  const recipient = String(A('A11').text ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0] ?? '';
  return makeDoc({
    id: 'self-declaration', lang, cls: 'pg--self-declaration', title: t.title, business,
    runLeft: `${business} · ${t.title}`, runRight: fd(date),
    meta: [{ label: t.business, value: business }, { label: t.date, value: fd(date) }, ...(recipient ? [{ label: t.recipient, value: recipient }] : [])],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fd(date)}`,
    // Signature, name and function, place and date stay together and close to the closing sentence.
    // The question ids before the labels make the label column longer; slightly smaller fields keep the document at its former length.
    printCss: '.pg--self-declaration .pg__fields { font-size: 13px; line-height: 1.4; gap: 4px 14px; } .pg--self-declaration .pg__signs { gap: 0 32px; } .pg--self-declaration .pg__sign { margin-top: 30px; }',
  });
}
