// Document D3 of the Security Evidence Toolkit: the emergency card. One page for the wall and the drawer: who to call with the numbers
// in large type, the first hour, the deadlines, where the backup and the account list are. Contacts for Austria and Germany were read
// at the original on 23 October 2026 (see the source note); numbers change, so the card says to check them before printing.
// Every field the business still has to fill is yellow, also a contact without a number.
import { B, makeDoc } from '../blocks.mjs';
import { optionLabel } from '../../engine.mjs';
import { fmtDate, drawerWord } from './self-declaration.mjs';

// The date on which the contacts, the deadlines and their sources were last checked at the original.
export const CARD_CHECKED = '2026-10-23';

const T = {
  en: {
    title: 'Emergency card', run: 'In an emergency', business: 'Business', date: 'Printed', where: 'Hangs',
    whereText: () => 'next to the fire extinguisher; one copy in the drawer of the responsible person, one with the deputy at home. Nothing on this card is in the computer that may be encrypted.',
    callH: 'Who to call',
    responsible: 'Responsible', deputy: 'Deputy', provider: 'IT provider', none: 'none', hotline: 'Hotline', cert: 'Computer emergency team', police: 'Police', dpa: 'Data protection authority', insurer: 'Cyber insurer', noInsurer: 'no policy; decide with the management', bank: 'Bank', bankGap: 'blocking number from the card or online banking', mail: 'Email and cloud provider', mailGap: 'customer portal and support number',
    phoneGap: '[phone number]',
    hourH: 'The first hour',
    hour: [
      ['Disconnect.', 'Pull the network cable, switch Wi-Fi off; if it is unclear which device is affected, disconnect the router from the internet. Do not switch off if help arrives shortly, because traces are lost; switch off if nobody comes and the encryption spreads visibly.'],
      ['Do not delete, do not reinstall.', 'Stop the backup jobs and disconnect the NAS or backup disk from the network; never connect a backup to an infected device.'],
      ['Call.', 'The responsible person, the IT provider, the hotline. The numbers are on this card, not in the encrypted computer.'],
      ['Write down.', 'Time, device, what was on the screen, who did what; a photo of the screen with the phone. The authority and the insurer will ask.'],
    ],
    noRansom: 'No ransom without talking to the police and the insurer first: experts advise against paying, and payment guarantees nothing.',
    deadlinesH: 'Deadlines',
    customer: 'Inform customers who may be affected', customerList: 'List of customer contacts: [place]',
    personal: 'Personal data affected?', personalText: (who) => `${who} checks. Report to the data protection authority without undue delay and where possible within 72 hours of becoming aware, unless there is unlikely to be a risk to people; if you process the data for a customer, inform the customer at once instead. Record every breach (GDPR Art. 33).`,
    nis2: 'Business covered by NIS 2?',
    nis2Text: {
      at: 'Only for a significant incident: early warning to CERT.at or your sector CSIRT via the USP reporting platform within 24 hours of becoming aware, notification within 72 hours, final report within one month of the notification (§\u00a034 NISG 2026).',
      de: 'Only for a significant incident: initial report to the BSI via the BSI portal within 24 hours of becoming aware, follow-up within 72 hours, final report within one month of the notification.',
      eu: 'Only for a significant incident: early warning to your national CSIRT or authority within 24 hours, notification within 72 hours, final report within one month of the notification (Art. 23(4) Directive (EU) 2022/2555).',
    },
    whereH: 'Where things are',
    backup: 'Backup', backupGap: 'what, where, who restores', keys: 'Recovery codes and account list', keysGap: 'place, outside the computers', folder: 'Evidence folder', recovery: 'We can bridge', afterH: 'Afterwards',
    after: 'Change the passwords of email, bank and cloud from a clean device, check the second factor, write one page about what happened and what was changed.',
    note: (d, src) => `Model: the IT-Notfallkarte of the BSI and the Alliance for Cyber Security; first-hour steps after onlinesicherheit.gv.at and the BSI. On switching off, the sources differ; the card follows our weighing (handbook, section 4). Numbers and deadlines as of ${d}; check them before printing. Sources, retrieved ${d}: ${src}. Generated with the Scutoria Security Evidence Toolkit. No legal advice.`,
    sources: {
      at: 'GDPR Art. 33; NISG 2026 § 34; cert.at, Vorfall melden; wko.at, Cyber-Security-Hotline; dsb.gv.at; bmi.gv.at, Meldestellen',
      de: 'GDPR Art. 33; bsi.bund.de, Service-Center and NIS-2 reporting guide; polizei.de, ZAC; bfdi.bund.de, Landesbehörden',
      eu: 'GDPR Art. 33; Directive (EU) 2022/2555 Art. 23; csirtsnetwork.eu, members; edpb.europa.eu, members',
    },
    at: {
      hotline: { number: '0800 888 133', text: 'Cyber-Security-Hotline of the Austrian Economic Chambers, around the clock, free for members; IT security experts Mon to Fri 8:00 to 18:00' },
      cert: { number: '+43 1 5056416 78', text: 'CERT.at, reports@cert.at' },
      police: { number: '133 · 112', text: 'Emergency 133 (Euro emergency 112); report at the nearest police station; tips to the cybercrime desk of the Bundeskriminalamt: against-cybercrime@bmi.gv.at' },
      dpa: { number: '+43 1 52 152-0', text: 'Datenschutzbehörde, Vienna: online form or dsb@dsb.gv.at' },
    },
    de: {
      hotline: { gap: '[ZAC of your federal state: number from polizei.de/ZAC]' },
      cert: { number: '0800 274 1000', text: 'BSI Service-Center (Mon to Thu 8:00 to 17:00, Fri 8:00 to 16:00); reports by companies via the BSI reporting portal' },
      police: { number: '110 · 112', text: 'Emergency 110 (Euro emergency 112); report at the ZAC or any police station' },
      dpa: { gap: '[data protection authority of your federal state: list at bfdi.bund.de, “Landesbehörden”]' },
    },
    eu: {
      hotline: { gap: '[national hotline or chamber of your country]' },
      cert: { gap: '[national CSIRT of your country: members list of the EU CSIRTs Network, csirtsnetwork.eu]' },
      police: { number: '112', text: 'Euro emergency 112; report at the nearest police station' },
      dpa: { gap: '[data protection authority of your country: EDPB members list, edpb.europa.eu/about-edpb/about-edpb/members_en]' },
    },
  },
  de: {
    title: 'Notfallkarte', run: 'Im Notfall', business: 'Betrieb', date: 'Gedruckt', where: 'Hängt',
    whereText: (drawer) => `neben dem Feuerlöscher; eine Kopie in der ${drawer} der verantwortlichen Person, eine bei der Vertretung zu Hause. Nichts auf dieser Karte liegt in dem Rechner, der gerade verschlüsselt sein könnte.`,
    callH: 'Wen anrufen',
    responsible: 'Verantwortlich', deputy: 'Vertretung', provider: 'IT-Dienstleister', none: 'keiner', hotline: 'Hotline', cert: 'Computer-Notfallteam', police: 'Polizei', dpa: 'Datenschutzbehörde', insurer: 'Cyberversicherer', noInsurer: 'keine Police; mit der Leitung entscheiden', bank: 'Bank', bankGap: 'Sperrnummer laut Karte oder Online-Banking', mail: 'E-Mail- und Cloud-Anbieter', mailGap: 'Kundenportal und Supportnummer',
    phoneGap: '[Telefonnummer]',
    hourH: 'Die erste Stunde',
    hour: [
      ['Trennen.', 'Netzkabel ziehen, WLAN aus; wenn unklar ist, welches Gerät betroffen ist, den Router vom Internet trennen. Nicht ausschalten, wenn in Kürze Hilfe kommt, weil Spuren verloren gehen; ausschalten, wenn niemand kommt und sich die Verschlüsselung sichtbar ausbreitet.'],
      ['Nicht löschen, nicht neu aufsetzen.', 'Sicherungsaufträge stoppen und NAS oder Sicherungsplatte vom Netz trennen; nie eine Sicherung an ein infiziertes Gerät anschließen.'],
      ['Anrufen.', 'Die verantwortliche Person, den IT-Dienstleister, die Hotline. Die Nummern stehen auf dieser Karte, nicht im verschlüsselten Rechner.'],
      ['Aufschreiben.', 'Uhrzeit, Gerät, was am Bildschirm zu sehen war, wer was getan hat; ein Foto des Bildschirms mit dem Telefon. Behörde und Versicherer fragen danach.'],
    ],
    noRansom: 'Kein Lösegeld ohne Rücksprache mit Polizei und Versicherer: Fachleute raten von der Zahlung ab, und eine Zahlung garantiert nichts.',
    deadlinesH: 'Fristen',
    customer: 'Kunden informieren, die betroffen sein könnten', customerList: 'Liste der Kundenkontakte: [Ort]',
    personal: 'Personenbezogene Daten betroffen?', personalText: (who) => `${who} prüft. Meldung an die Datenschutzbehörde unverzüglich und möglichst binnen 72 Stunden nach Kenntnis, außer es besteht voraussichtlich kein Risiko für Personen; verarbeiten Sie die Daten für einen Kunden, stattdessen sofort den Kunden informieren. Jede Verletzung dokumentieren (DSGVO Art. 33).`,
    nis2: 'Betrieb unter NIS 2?',
    nis2Text: {
      at: 'Nur bei einem erheblichen Vorfall: Frühwarnung an CERT.at oder das CSIRT Ihres Sektors über die USP-Meldeplattform binnen 24 Stunden nach Kenntnis, Meldung binnen 72 Stunden, Abschlussbericht binnen eines Monats nach der Meldung (§\u00a034 NISG 2026).',
      de: 'Nur bei einem erheblichen Vorfall: Erstmeldung an das BSI über das BSI-Portal binnen 24 Stunden nach Kenntnis, Folgemeldung binnen 72 Stunden, Abschlussmeldung binnen eines Monats nach der Meldung.',
      eu: 'Nur bei einem erheblichen Vorfall: Frühwarnung an das nationale CSIRT oder die Behörde binnen 24 Stunden, Meldung binnen 72 Stunden, Abschlussbericht binnen eines Monats nach der Meldung (Art. 23 Abs. 4 Richtlinie (EU) 2022/2555).',
    },
    whereH: 'Wo liegt was',
    backup: 'Sicherung', backupGap: 'was, wo, wer stellt wieder her', keys: 'Wiederherstellungscodes und Kontenliste', keysGap: 'Ort, außerhalb der Rechner', folder: 'Nachweisordner', recovery: 'Wir überbrücken', afterH: 'Danach',
    after: 'Passwörter von E-Mail, Bank und Cloud von einem sauberen Gerät aus ändern, den zweiten Faktor prüfen, eine Seite schreiben: was passiert ist und was geändert wurde.',
    note: (d, src) => `Vorbild: die IT-Notfallkarte des BSI und der Allianz für Cyber-Sicherheit; die Schritte der ersten Stunde nach onlinesicherheit.gv.at und BSI. Beim Ausschalten weichen die Quellen ab; die Karte folgt unserer Abwägung (Handbuch, Abschnitt 4). Nummern und Fristen mit Stand ${d}; vor dem Druck prüfen. Quellen, abgerufen am ${d}: ${src}. Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria. Keine Rechtsberatung.`,
    sources: {
      at: 'DSGVO Art. 33; NISG 2026 § 34; cert.at, Vorfall melden; wko.at, Cyber-Security-Hotline; dsb.gv.at; bmi.gv.at, Meldestellen',
      de: 'DSGVO Art. 33; bsi.bund.de, Service-Center und Anleitung NIS-2-Meldung; polizei.de, ZAC; bfdi.bund.de, Landesbehörden',
      eu: 'DSGVO Art. 33; Richtlinie (EU) 2022/2555 Art. 23; csirtsnetwork.eu, Mitglieder; edpb.europa.eu, Mitglieder',
    },
    at: {
      hotline: { number: '0800 888 133', text: 'Cyber-Security-Hotline der Wirtschaftskammern, rund um die Uhr, für Mitglieder kostenlos; IT-Security-Fachleute Mo bis Fr 8 bis 18 Uhr' },
      cert: { number: '+43 1 5056416 78', text: 'CERT.at, reports@cert.at' },
      police: { number: '133 · 112', text: 'Notruf 133 (Euro-Notruf 112); Anzeige bei der nächsten Polizeidienststelle; Hinweise an die Cybercrime-Meldestelle des Bundeskriminalamts: against-cybercrime@bmi.gv.at' },
      dpa: { number: '+43 1 52 152-0', text: 'Datenschutzbehörde, Wien: Online-Formular oder dsb@dsb.gv.at' },
    },
    de: {
      hotline: { gap: '[ZAC Ihres Bundeslands: Nummer von polizei.de, ZAC]' },
      cert: { number: '0800 274 1000', text: 'BSI Service-Center (Mo bis Do 8 bis 17 Uhr, Fr 8 bis 16 Uhr); Meldung für Unternehmen über das Melde- und Informationsportal des BSI' },
      police: { number: '110 · 112', text: 'Notruf 110 (Euro-Notruf 112); Anzeige bei der ZAC oder jeder Dienststelle' },
      dpa: { gap: '[Landesdatenschutzbehörde Ihres Bundeslands: Liste beim BfDI, „Landesbehörden“]' },
    },
    eu: {
      hotline: { gap: '[Nationale Hotline oder Kammer Ihres Landes]' },
      cert: { gap: '[Nationales CSIRT Ihres Landes: Mitgliederliste des CSIRTs-Netzwerks der EU, csirtsnetwork.eu]' },
      police: { number: '112', text: 'Euro-Notruf 112; Anzeige bei der nächsten Polizeidienststelle' },
      dpa: { gap: '[Datenschutzbehörde Ihres Landes: Mitgliederliste des EDSA, edpb.europa.eu/about-edpb/about-edpb/members_en]' },
    },
  },
};

// The first phone number in a free text, with a following note in brackets ("+43 660 000 00 01 (example)"), and the rest of the text.
const PHONE = /\+?\d[\d \-/().]{3,}\d(?:\s*\([^)]*\))?/;
export function splitPhone(text) {
  const s = String(text ?? '').trim();
  const m = s.match(PHONE);
  if (!m) return { number: '', rest: s };
  const rest = (s.slice(0, m.index) + s.slice(m.index + m[0].length)).replace(/\s*[,;]\s*[,;]\s*/g, ', ').replace(/^[\s,;:]+|[\s,;:]+$/g, '');
  return { number: m[0].trim(), rest };
}

export function emergencyCardDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const fd = (iso) => fmtDate(iso, lang, answers);
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const country = A('A2').value === 'DE' ? 'de' : A('A2').value === 'AT' ? 'at' : 'eu';
  const c = t[country];
  const q = (id) => def.blocks.flatMap((bl) => bl.questions).find((x) => x.id === id);
  const a4 = A('A4');
  const who = a4.text || '…';

  // A contact the business enters: the number in large type; yellow when no number is in it.
  const person = (label, text, extra) => {
    const { number, rest } = splitPhone(text);
    const detail = [extra, rest].filter(Boolean).join(', ');
    return number ? { label, number, text: detail } : { label, number: t.phoneGap, gap: true, text: detail || '…' };
  };
  // A fixed contact of the country: a number, or a yellow field the business fills in.
  const fixed = (label, x) => (x.gap ? { label, text: x.gap, gapText: true } : { label, number: x.number, text: x.text });
  const hasProvider = ['provider', 'both'].includes(A('A5').value);
  const providerName = A('A5').text || optionLabel(q('A5'), A('A5').value, lang);
  const insurer = A('B2').value === 'yes'
    ? person(t.insurer, A('B2').text || optionLabel(q('B2'), 'yes', lang))
    : { label: t.insurer, text: t.noInsurer };
  const entered = (label, text, gapText) => {
    const s = String(text ?? '').trim();
    if (!s) return { label, text: `[${gapText}]`, gapText: true };
    const { number, rest } = splitPhone(s);
    return number ? { label, number, text: rest } : { label, text: s };
  };
  const calls = [
    person(t.responsible, a4.contact, who),
    person(t.deputy, a4.deputy),
    hasProvider ? person(t.provider, A('A9').text, providerName) : { label: t.provider, text: t.none },
    fixed(t.hotline, c.hotline),
    fixed(t.cert, c.cert),
    fixed(t.police, c.police),
    fixed(t.dpa, c.dpa),
    insurer,
    entered(t.bank, A('F5').text, t.bankGap),
    entered(t.mail, A('F6').text, t.mailGap),
  ];

  const backup = A('D1').value && A('D1').value !== 'notyet' && A('D1').text ? A('D1').text : '';
  const keys = String(A('F7').text ?? '').trim();
  const blocks = [
    B.h(t.callH),
    B.calls(calls),
    B.h(t.hourH),
    B.steps(t.hour.map(([lead, text]) => ({ lead, text }))),
    B.p(t.noRansom),
    B.h(t.deadlinesH),
    B.boxes([
      { label: t.customer, parts: [{ text: optionLabel(q('F1'), A('F1').value, lang) }, { text: t.customerList, gap: true }] },
      { label: t.personal, parts: [{ text: t.personalText(who) }] },
      { label: t.nis2, parts: [{ text: t.nis2Text[country] }] },
    ]),
    B.h(t.whereH),
    B.fields([
      { label: t.backup, value: backup || `[${t.backupGap}]`, gap: !backup },
      { label: t.keys, value: keys || `[${t.keysGap}]`, gap: !keys },
      { label: t.folder, value: A('A8').text || '…' },
      { label: t.recovery, value: optionLabel(q('D3'), A('D3').value, lang) },
    ]),
    B.h(t.afterH),
    B.p(t.after),
    B.p(`${t.where} ${t.whereText(drawerWord(answers))}`),
    B.note(t.note(fd(CARD_CHECKED), t.sources[country])),
  ];
  return makeDoc({
    id: 'emergency-card', lang, cls: 'pg--card', title: `${t.title} · ${business}`, business,
    runLeft: t.run, runRight: fd(today), pageHead: `${business} · ${t.title} · ${fd(today)}`,
    meta: [{ label: t.business, value: business }, { label: t.date, value: fd(today) }],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fd(today)}`,
    // The Word copy is the one the business fills in and prints, so it must stay on one page as well.
    docx: { margin: 567, size: 19, compact: true },
    // One page in print: who to call at the top with the numbers in large type, the four steps in large lines, the deadlines as three boxes.
    // Red only for the header line "In an emergency".
    printCss: '@page { size: A4; margin: 9mm 11mm 11mm 11mm; } .pg--card { gap: 4px; } .pg--card .pg__run { color: #B42318; font-weight: 700; border-bottom-color: #B42318; padding-bottom: 5px; } .pg--card .pg__title { font-size: 20px; } .pg--card .pg__meta { font-size: 10px; } .pg--card .pg__h { font-size: 13px; margin-top: 3px; } .pg--card .pg__calls { gap: 2px 18px; } .pg--card .pg__call-num { font-size: 14.5pt; } .pg--card .pg__call-text { font-size: 8pt; line-height: 1.25; } .pg--card .pg__steps { gap: 2px; } .pg--card .pg__step { font-size: 11pt; line-height: 1.28; } .pg--card .pg__p { font-size: 10.5px; line-height: 1.32; } .pg--card .pg__boxes { gap: 6px; } .pg--card .pg__boxitem { padding: 4px 7px; gap: 2px; } .pg--card .pg__boxes .pg__p { font-size: 8pt; line-height: 1.28; } .pg--card .pg__boxlabel { font-size: 9.5pt; } .pg--card .pg__fields { font-size: 10.5px; line-height: 1.28; gap: 1px 10px; } .pg--card .pg__note { font-size: 7.5pt; line-height: 1.3; max-width: none; } .pg--card .pg__foot { margin-top: 4px; font-size: 9px; padding-top: 4px; }',
  });
}
