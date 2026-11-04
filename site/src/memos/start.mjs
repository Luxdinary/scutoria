// Memo 4 of E11: "Where do we start with AI rules?" The situation of the business, the one first step, the plan in order,
// and the toolkit that does it. The findings reuse the verified statements of the AI Policy Toolkit handbook (sections 1, 2, 4, 5).
import { B } from '../toolkit/documents/blocks.mjs';
import { L, S, BUSINESS_Q, buildDoc, has } from './shared.mjs';

const SRC = {
  art4: S('Regulation (EU) 2024/1689, Art. 4(1) and Art. 113, point (a), consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-19; European Commission, AI literacy, questions and answers, page dated 27 July 2026 · retrieved 2026-10-18', 'Verordnung (EU) 2024/1689, Art. 4 Abs. 1 und Art. 113 Buchst. a, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-19; Europäische Kommission, Fragen und Antworten zur KI-Kompetenz, Seitenstand 27. Juli 2026 · Abruf 2026-10-18'),
  dsk: S('German data protection conference (DSK), Orientierungshilfe "Künstliche Intelligenz und Datenschutz", version 1.0 of 6 May 2024, sections 2.2, 2.4, 2.5 and 3.1 · retrieved 2026-10-18', 'Datenschutzkonferenz, Orientierungshilfe „Künstliche Intelligenz und Datenschutz“, Version 1.0 vom 6. Mai 2024, Abschnitte 2.2, 2.4, 2.5 und 3.1 · Abruf 2026-10-18'),
  gdpr: S('Regulation (EU) 2016/679 (GDPR), Art. 24(1), Art. 28(1) and (3), Art. 32(1), consolidated version of 4 May 2016 · EUR-Lex · retrieved 2026-10-19', 'Verordnung (EU) 2016/679 (DSGVO), Art. 24 Abs. 1, Art. 28 Abs. 1 und 3, Art. 32 Abs. 1, konsolidierte Fassung vom 4. Mai 2016 · EUR-Lex · Abruf 2026-10-19'),
  art50: S('Regulation (EU) 2024/1689, Art. 50(3) and (4), Art. 113 · retrieved 2026-10-19; Guidelines, annex to C(2026) 5054 final, content approved on 20 July 2026, point 131 · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 3 und 4, Art. 113 · Abruf 2026-10-19; Leitlinien, Anhang zu C(2026) 5054 final, Inhalt gebilligt am 20. Juli 2026, Rn. 131 · Abruf 2026-10-23'),
  highrisk: S('Regulation (EU) 2024/1689, Annex III, point 4, Art. 5(1), point (f), Art. 113, points (a) and (c), as amended by Regulation (EU) 2026/1744 · retrieved 2026-10-18 and 2026-10-19', 'Verordnung (EU) 2024/1689, Anhang III Nr. 4, Art. 5 Abs. 1 Buchst. f, Art. 113 Buchst. a und c in der Fassung der Verordnung (EU) 2026/1744 · Abruf 2026-10-18 und 2026-10-19'),
  policy: S('Regulation (EU) 2024/1689, Art. 4; Regulation (EU) 2016/679, Art. 24(1); Directive (EU) 2016/943, Art. 2(1), point (c) · retrieved 2026-10-18 and 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 4; Verordnung (EU) 2016/679, Art. 24 Abs. 1; Richtlinie (EU) 2016/943, Art. 2 Nr. 1 Buchst. c · Abruf 2026-10-18 und 2026-10-19'),
  authority: S('KI-Marktüberwachungs- und Innovationsförderungsgesetz of 22 July 2026, BGBl. 2026 I No. 223, § 2(1) · gesetze-im-internet.de · retrieved 2026-10-19; Datenschutzbehörde (Austria), page on artificial intelligence and data protection · dsb.gv.at · retrieved 2026-10-19', 'KI-Marktüberwachungs- und Innovationsförderungsgesetz vom 22. Juli 2026, BGBl. 2026 I Nr. 223, § 2 Abs. 1 · gesetze-im-internet.de · Abruf 2026-10-19; Datenschutzbehörde (Österreich), Seite „Künstliche Intelligenz und Datenschutz“ · dsb.gv.at · Abruf 2026-10-19'),
};

const SOURCES = S([
  'Regulation (EU) 2024/1689 of 13 June 2024 (AI Act), consolidated version of 27 July 2026: Art. 4, Art. 5(1)(f), Art. 26(2), Art. 50, Art. 113, Annex III point 4. eur-lex.europa.eu · retrieved 2026-10-19.',
  'Regulation (EU) 2026/1744 of 8 July 2026 (Digital Omnibus on AI), in force since 27 July 2026: Art. 1, points (5), (39) and (40). eur-lex.europa.eu/eli/reg/2026/1744/oj · retrieved 2026-10-18.',
  'Regulation (EU) 2016/679 (GDPR), consolidated version of 4 May 2016: Art. 24(1), Art. 28(1) and (3), Art. 32(1). eur-lex.europa.eu · retrieved 2026-10-19.',
  'Directive (EU) 2016/943 on the protection of trade secrets: Art. 2(1)(c). eur-lex.europa.eu · retrieved 2026-10-18.',
  'European Commission, AI literacy, questions and answers, page dated 27 July 2026. digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers · retrieved 2026-10-18. Guidance, not law.',
  'European Commission, Guidelines on the transparency obligations under Article 50, content approved on 20 July 2026 (C(2026) 5054 final, annex), point 131. digital-strategy.ec.europa.eu · retrieved 2026-10-23. To be checked: formal adoption in all languages. Guidance, not law.',
  'Datenschutzkonferenz (German data protection authorities), Orientierungshilfe "Künstliche Intelligenz und Datenschutz", version 1.0 of 6 May 2024, sections 1.9, 2.2, 2.4, 2.5, 3.1. datenschutzkonferenz-online.de · retrieved 2026-10-18. Guidance, not law.',
  'Germany: KI-Marktüberwachungs- und Innovationsförderungsgesetz of 22 July 2026, BGBl. 2026 I No. 223, § 2(1). gesetze-im-internet.de · retrieved 2026-10-19. Austria: Datenschutzbehörde, page on artificial intelligence and data protection, undated. dsb.gv.at · retrieved 2026-10-19.',
], [
  'Verordnung (EU) 2024/1689 vom 13. Juni 2024 (KI-Verordnung), konsolidierte Fassung vom 27. Juli 2026: Art. 4, Art. 5 Abs. 1 Buchst. f, Art. 26 Abs. 2, Art. 50, Art. 113, Anhang III Nr. 4. eur-lex.europa.eu · Abruf 2026-10-19.',
  'Verordnung (EU) 2026/1744 vom 8. Juli 2026 (Digitaler Omnibus zur KI), in Kraft seit 27. Juli 2026: Art. 1 Nr. 5, 39 und 40. eur-lex.europa.eu/eli/reg/2026/1744/oj · Abruf 2026-10-18.',
  'Verordnung (EU) 2016/679 (DSGVO), konsolidierte Fassung vom 4. Mai 2016: Art. 24 Abs. 1, Art. 28 Abs. 1 und 3, Art. 32 Abs. 1. eur-lex.europa.eu · Abruf 2026-10-19.',
  'Richtlinie (EU) 2016/943 über den Schutz von Geschäftsgeheimnissen: Art. 2 Nr. 1 Buchst. c. eur-lex.europa.eu · Abruf 2026-10-18.',
  'Europäische Kommission, Fragen und Antworten zur KI-Kompetenz, Seitenstand 27. Juli 2026. digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers · Abruf 2026-10-18. Auslegungshilfe, kein Rechtsakt.',
  'Europäische Kommission, Leitlinien zu den Transparenzpflichten nach Artikel 50, Inhalt gebilligt am 20. Juli 2026 (C(2026) 5054 final, Anhang), Rn. 131. digital-strategy.ec.europa.eu · Abruf 2026-10-23. Stand prüfen: förmliche Annahme in allen Sprachen. Auslegungshilfe, kein Rechtsakt.',
  'Datenschutzkonferenz, Orientierungshilfe „Künstliche Intelligenz und Datenschutz“, Version 1.0 vom 6. Mai 2024, Abschnitte 1.9, 2.2, 2.4, 2.5, 3.1. datenschutzkonferenz-online.de · Abruf 2026-10-18. Auslegungshilfe, kein Rechtsakt.',
  'Deutschland: KI-Marktüberwachungs- und Innovationsförderungsgesetz vom 22. Juli 2026, BGBl. 2026 I Nr. 223, § 2 Abs. 1. gesetze-im-internet.de · Abruf 2026-10-19. Österreich: Datenschutzbehörde, Seite „Künstliche Intelligenz und Datenschutz“, undatiert. dsb.gv.at · Abruf 2026-10-19.',
]);

export const start = {
  id: 'start',
  pathKey: 'memoStart',
  toolkit: 'policy',
  sourcesDate: '2026-10-19',
  sourcesUpdated: '2026-10-23',
  title: S('Where do we start with AI rules?', 'Womit fangen wir bei KI-Regeln an?'),
  teaser: S('Seven questions about how AI is used in your business today, then a memo with your situation, the one first step and the plan in order, with the articles and dates.', 'Sieben Fragen dazu, wie KI heute in Ihrem Betrieb genutzt wird, dann ein Memo mit Ihrer Lage, dem einen ersten Schritt und dem Plan in Reihenfolge, mit Artikeln und Stichtagen.'),
  description: S('Free memo generator: seven questions, then a dated start memo for AI rules in your business, with the first step, the plan and the sources: AI Act Article 4 and Article 50, GDPR, the German data protection authorities. By Scutoria.', 'Freier Memo-Generator: sieben Fragen, dann ein datiertes Start-Memo für KI-Regeln in Ihrem Betrieb, mit erstem Schritt, Plan und Quellen: KI-Verordnung Artikel 4 und 50, DSGVO, Datenschutzkonferenz. Von Scutoria.'),
  lead: S('Staff use AI tools whether or not the business has decided anything. Seven questions, then a memo that names your situation, the one step to take first, and the plan in order, every statement with its source.', 'Die Belegschaft nutzt KI-Tools, ob der Betrieb etwas entschieden hat oder nicht. Sieben Fragen, dann ein Memo, das Ihre Lage benennt, den einen Schritt, der zuerst kommt, und den Plan in Reihenfolge, jede Aussage mit Quelle.'),
  questions: [
    BUSINESS_Q,
    { key: 'usage', type: 'radio', label: S('Do your staff use AI tools at work today?', 'Nutzt Ihre Belegschaft heute KI-Tools bei der Arbeit?'), short: S('AI in use', 'KI im Einsatz'), options: [
      { v: 'business', label: S('Yes, with business accounts the business set up', 'Ja, mit betrieblichen Konten, die der Betrieb eingerichtet hat') },
      { v: 'private', label: S('Yes, with private accounts, or we do not know', 'Ja, mit privaten Konten, oder wir wissen es nicht') },
      { v: 'no', label: S('No, as far as we know', 'Nein, soweit wir wissen') },
    ] },
    { key: 'kinds', type: 'checks', required: false, label: S('Which kinds of tools?', 'Welche Arten von Tools?'), short: S('Kinds of tools', 'Arten von Tools'), options: [
      { v: 'text', label: S('Text assistants such as ChatGPT, Claude, Gemini or Copilot', 'Textassistenten wie ChatGPT, Claude, Gemini oder Copilot') },
      { v: 'office', label: S('AI built into Microsoft 365, Google Workspace or other business software', 'KI in Microsoft 365, Google Workspace oder anderer Geschäftssoftware') },
      { v: 'media', label: S('Image, audio or video generators', 'Bild-, Ton- oder Videogeneratoren') },
      { v: 'translate', label: S('Translation tools', 'Übersetzungstools') },
      { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
    ] },
    { key: 'data', type: 'radio', label: S('Do customer, staff or applicant details go into the tools?', 'Kommen Angaben zu Kunden, Beschäftigten oder Bewerbern in die Tools?'), short: S('Personal data in tools', 'Personenbezug in Tools'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'sometimes', label: S('Sometimes', 'Manchmal') },
      { v: 'no', label: S('No', 'Nein') },
      { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
    ] },
    { key: 'rules', type: 'radio', label: S('Are there written rules for AI use?', 'Gibt es schriftliche Regeln für die KI-Nutzung?'), short: S('Written rules', 'Schriftliche Regeln'), options: [
      { v: 'yes', label: S('Yes, a policy or similar', 'Ja, eine Richtlinie oder Ähnliches') },
      { v: 'partly', label: S('A few sentences or an email', 'Ein paar Sätze oder eine E-Mail') },
      { v: 'no', label: S('No', 'Nein') },
    ] },
    { key: 'briefed', type: 'radio', label: S('Have staff been briefed on AI use, and is there a record of it?', 'Wurde die Belegschaft zur KI-Nutzung eingewiesen, und gibt es einen Nachweis?'), short: S('Briefing', 'Einweisung'), options: [
      { v: 'documented', label: S('Yes, with a record', 'Ja, mit Nachweis') },
      { v: 'informal', label: S('Informally, without a record', 'Informell, ohne Nachweis') },
      { v: 'no', label: S('No', 'Nein') },
    ] },
    { key: 'published', type: 'radio', label: S('Do you publish AI-generated text, images, audio or video, or run a chatbot for customers?', 'Veröffentlichen Sie KI-erzeugte Texte, Bilder, Töne oder Videos, oder betreiben Sie einen Chatbot für Kunden?'), short: S('Published AI output', 'Veröffentlichte KI-Ausgaben'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'no', label: S('No', 'Nein') },
    ] },
    { key: 'hr', type: 'radio', label: S('Is AI used for decisions about people, such as hiring, assessment, promotion, termination or task allocation, or for emotion recognition?', 'Wird KI für Entscheidungen über Personen eingesetzt, etwa Einstellung, Beurteilung, Beförderung, Kündigung oder Aufgabenzuteilung, oder für Emotionserkennung?'), short: S('Decisions about people', 'Entscheidungen über Personen'), options: [
      { v: 'yes', label: S('Yes, or planned', 'Ja, oder geplant') },
      { v: 'no', label: S('No', 'Nein') },
    ] },
  ],

  evaluate(answers, lang, date) {
    const t = L(lang);
    const a = answers;
    // A ticked kind of tool means AI is in use, even if the first answer was "No, as far as we know": the usage then counts as
    // "yes, accounts unknown" (Art. 4 applies to the business as a deployer).
    const kindsTicked = (Array.isArray(a.kinds) ? a.kinds : []).filter((k) => k !== 'unknown');
    const contradicted = a.usage === 'no' && kindsTicked.length > 0;
    const usage = contradicted ? 'private' : a.usage;
    const dataRisk = a.data === 'yes' || a.data === 'sometimes' || a.data === 'unknown';
    const accountsOpen = usage === 'private' || (usage !== 'no' && dataRisk);
    const rulesOpen = a.rules !== 'yes';
    const briefingOpen = a.briefed !== 'documented';

    // The one first step, by priority.
    let first;
    if (a.hr === 'yes') first = { key: 'hr', text: t('Pause AI-supported decisions about people and any emotion recognition until a specialist has assessed them.', 'Setzen Sie KI-gestützte Entscheidungen über Personen und jede Emotionserkennung aus, bis eine Fachperson sie beurteilt hat.') };
    else if (accountsOpen) first = { key: 'accounts', text: usage === 'business'
      ? t('Check that training on inputs is switched off and a processing agreement is in place for each tool; post the one page.', 'Prüfen Sie je Tool, dass das Training mit Eingaben abgeschaltet ist und ein Auftragsverarbeitungsvertrag vorliegt; hängen Sie die eine Seite aus.')
      : t('Set up business accounts with training on inputs switched off, and post the one page: what never goes into a tool.', 'Richten Sie betriebliche Konten ein, bei denen das Training mit Eingaben abgeschaltet ist, und hängen Sie die eine Seite aus: was nie in ein Tool darf.') };
    else if (rulesOpen) first = { key: 'rules', text: t('Write the usage policy: nine areas, signed by the management, with the one page to post.', 'Schreiben Sie die Nutzungsrichtlinie: neun Regelbereiche, von der Leitung unterschrieben, mit der einen Seite zum Aushängen.') };
    else if (briefingOpen) first = { key: 'briefing', text: t('Brief the team on the rules and keep the record: date, contents, who attended.', 'Weisen Sie das Team in die Regeln ein und führen Sie den Nachweis: Datum, Inhalte, wer dabei war.') };
    else if (a.published === 'yes') first = { key: 'labelling', text: t('Run the labelling check under Article 50 for everything you publish or run for customers.', 'Machen Sie den Kennzeichnungs-Check nach Artikel 50 für alles, was Sie veröffentlichen oder für Kunden betreiben.') };
    else first = { key: 'evidence', text: t('Date it: freeze an evidence page with what is regulated and what is open, and set a review date.', 'Datieren Sie es: Frieren Sie eine Nachweisseite ein, was geregelt ist und was offen, und setzen Sie einen Wiedervorlagetermin.') };

    const level = a.hr === 'yes' || accountsOpen ? 'red' : (rulesOpen || briefingOpen || a.published === 'yes') ? 'amber' : 'green';

    // The situation in one paragraph.
    const parts = [];
    parts.push(contradicted ? t('You ticked AI tools, so AI is in use.', 'Sie haben KI-Tools angekreuzt, also ist KI im Einsatz.') : usage === 'no' ? t('AI tools are not in use as far as you know.', 'KI-Tools sind, soweit Sie wissen, nicht im Einsatz.') : usage === 'business' ? t('AI tools are in use with business accounts.', 'KI-Tools sind mit betrieblichen Konten im Einsatz.') : t('AI tools are in use with private accounts or without the business knowing which.', 'KI-Tools sind mit privaten Konten im Einsatz, oder der Betrieb weiß nicht, welche.'));
    if (usage !== 'no') parts.push(a.data === 'no' ? t('No personal data goes in.', 'Personenbezogene Angaben kommen nicht hinein.') : a.data === 'unknown' ? t('Nobody knows whether personal data goes in.', 'Niemand weiß, ob personenbezogene Angaben hineinkommen.') : t('Personal data goes in at least sometimes.', 'Personenbezogene Angaben kommen zumindest manchmal hinein.'));
    parts.push(a.rules === 'yes' ? t('Written rules exist.', 'Schriftliche Regeln gibt es.') : a.rules === 'partly' ? t('The rules are a few sentences.', 'Die Regeln sind ein paar Sätze.') : t('There are no written rules.', 'Schriftliche Regeln gibt es nicht.'));
    parts.push(a.briefed === 'documented' ? t('The team has been briefed, with a record.', 'Das Team ist eingewiesen, mit Nachweis.') : a.briefed === 'informal' ? t('The team has been briefed informally, without a record.', 'Das Team ist informell eingewiesen, ohne Nachweis.') : t('The team has not been briefed.', 'Das Team ist nicht eingewiesen.'));
    if (a.published === 'yes') parts.push(t('AI output reaches customers or the public.', 'KI-Ausgaben erreichen Kunden oder die Öffentlichkeit.'));
    if (a.hr === 'yes') parts.push(t('AI touches decisions about people.', 'KI berührt Entscheidungen über Personen.'));
    const situation = parts.join(' ');

    const verdict = {
      level,
      title: level === 'red' ? t('Start here: one step before anything else.', 'Fangen Sie hier an: ein Schritt vor allem anderen.') : level === 'amber' ? (rulesOpen && briefingOpen ? t('Started, but open: written rules and a dated briefing are missing.', 'Begonnen, aber offen: Schriftliche Regeln und eine datierte Einweisung fehlen.') : t('Started; some steps are open.', 'Begonnen; einige Schritte sind offen.')) : t('The basics are in place. Keep them dated.', 'Die Grundlagen stehen. Halten Sie sie datiert.'),
      text: `${situation} ${t('First step:', 'Erster Schritt:')} ${first.text}`,
    };

    // Where you stand: the five steps of the plan with their status.
    const W = (en, de) => t(en, de);
    const status = [
      { label: W('Business accounts, training on inputs off, tool register', 'Betriebliche Konten, Training mit Eingaben aus, Tool-Register'), status: usage === 'no' ? 'warn' : accountsOpen ? 'open' : 'ok', detail: usage === 'no' ? W('Nothing in use yet; decide before the first tool arrives.', 'Noch nichts im Einsatz; entscheiden, bevor das erste Tool kommt.') : accountsOpen ? W('Private accounts or unknown data flows.', 'Private Konten oder unbekannte Datenflüsse.') : W('Business accounts, no personal data.', 'Betriebliche Konten, kein Personenbezug.') },
      { label: W('Written usage policy with the one page to post', 'Schriftliche Nutzungsrichtlinie mit der einen Seite zum Aushängen'), status: a.rules === 'yes' ? 'ok' : a.rules === 'partly' ? 'warn' : 'open', detail: a.rules === 'yes' ? W('Exists; check it against the nine areas.', 'Vorhanden; an den neun Regelbereichen prüfen.') : a.rules === 'partly' ? W('A few sentences; not yet a policy.', 'Ein paar Sätze; noch keine Richtlinie.') : W('Missing.', 'Fehlt.') },
      { label: W('Briefing with record (Article 4 AI Act)', 'Einweisung mit Nachweis (Artikel 4 KI-Verordnung)'), status: a.briefed === 'documented' ? 'ok' : a.briefed === 'informal' ? 'warn' : 'open', detail: a.briefed === 'documented' ? W('Record exists; set the next date.', 'Nachweis vorhanden; nächsten Termin setzen.') : a.briefed === 'informal' ? W('Happened, but nothing shows it.', 'Hat stattgefunden, aber nichts belegt es.') : W('Not yet.', 'Noch nicht.') },
      { label: W('Labelling check (Article 50 AI Act)', 'Kennzeichnungs-Check (Artikel 50 KI-Verordnung)'), status: a.published === 'yes' ? 'open' : 'ok', okWord: W('No case at present', 'Derzeit kein Fall'), detail: a.published === 'yes' ? W('AI output reaches the public; check the three deployer cases.', 'KI-Ausgaben erreichen die Öffentlichkeit; die drei Betreiberfälle prüfen.') : W('No case at present; record it with a date.', 'Derzeit kein Fall; mit Datum festhalten.') },
      { label: W('Decisions about people kept out', 'Entscheidungen über Personen ausgeschlossen'), status: a.hr === 'yes' ? 'open' : 'ok', okWord: W('Not used', 'Nicht im Einsatz'), detail: a.hr === 'yes' ? W('High-risk use or prohibited practice to assess.', 'Hochrisiko-Verwendung oder verbotene Praktik zu prüfen.') : W('Excluded; write it into the policy.', 'Ausgeschlossen; in die Richtlinie schreiben.') },
    ].map(({ okWord, ...i }) => ({ ...i, word: i.status === 'ok' ? (okWord ?? (a.rules === 'yes' ? W('Regulated', 'Geregelt') : W('In place', 'Vorhanden'))) : i.status === 'warn' ? W('Partly', 'Teilweise') : W('Open', 'Offen') }));
    const extra = [B.h(t('Where you stand', 'Wo Sie stehen')), B.status(status)];

    const findings = [];
    if (a.hr === 'yes') findings.push({ kind: 'fact', text: t(
      'AI systems for the recruitment or selection of persons, for decisions on promotion or termination, for task allocation based on behaviour or traits, and for monitoring and evaluating performance are high-risk under Annex III, point 4. The obligations for Annex III high-risk systems apply from 2 December 2027, moved from August 2026 by Regulation (EU) 2026/1744. Since 2 February 2025 the use of AI systems to infer the emotions of a natural person in the workplace is prohibited, except for medical or safety reasons.',
      'KI-Systeme für die Einstellung oder Auswahl von Personen, für Entscheidungen über Beförderung oder Kündigung, für die Aufgabenzuweisung aufgrund von Verhalten oder Eigenschaften und für die Beobachtung und Bewertung der Leistung sind Hochrisiko nach Anhang III Nr. 4. Die Pflichten für Hochrisiko-Systeme nach Anhang III gelten ab dem 2. Dezember 2027, durch die Verordnung (EU) 2026/1744 von August 2026 verschoben. Seit dem 2. Februar 2025 ist es verboten, KI-Systeme zur Ableitung der Emotionen einer natürlichen Person am Arbeitsplatz zu verwenden, außer aus medizinischen Gründen oder Sicherheitsgründen.',
    ), source: SRC.highrisk[lang] });
    if (usage !== 'no' || dataRisk) findings.push({ kind: 'fact', text: t(
      'The German data protection authorities advise that employees should not have to work with private accounts, because profiles of individual employees can arise; that accounts should be set at commissioning so that no inputs are used for training and no input history is kept beyond the session; that clear internal instructions should be issued and documented on whether, under which conditions and for which purposes AI applications may be used; and that removing names and addresses is regularly not enough to avoid personal data, because the connection to a person can be restored from the context.',
      'Die deutschen Datenschutzaufsichtsbehörden raten, dass Beschäftigte nicht mit privaten Accounts arbeiten müssen sollten, weil Profile einzelner Beschäftigter entstehen können; dass Accounts schon bei Inbetriebnahme so eingestellt werden, dass keine Eingaben zu Trainingszwecken verarbeitet und keine Eingabe-Historie über die Sitzung hinaus gespeichert wird; dass klare interne Weisungen erteilt und dokumentiert werden, ob, unter welchen Voraussetzungen und zu welchen Zwecken KI-Anwendungen eingesetzt werden dürfen; und dass es regelmäßig nicht reicht, Namen und Anschriften zu entfernen, weil sich der Personenbezug aus dem Zusammenhang herstellen lässt.',
    ), source: SRC.dsk[lang] });
    if (dataRisk) findings.push({ kind: 'fact', text: t(
      'Where a provider processes personal data on behalf of the business, the business may use only processors providing sufficient guarantees, and the processing is governed by a contract that sets out subject-matter, duration, nature and purpose, the type of data and the obligations of both sides. Controller and processor implement technical and organisational measures appropriate to the risk.',
      'Verarbeitet ein Anbieter personenbezogene Daten im Auftrag des Betriebs, darf der Betrieb nur Auftragsverarbeiter einsetzen, die hinreichende Garantien bieten, und die Verarbeitung erfolgt auf Grundlage eines Vertrags, der Gegenstand, Dauer, Art und Zweck, die Art der Daten und die Pflichten beider Seiten festlegt. Verantwortlicher und Auftragsverarbeiter treffen dem Risiko angemessene technische und organisatorische Maßnahmen.',
    ), source: SRC.gdpr[lang] });
    findings.push({ kind: 'fact', text: t(
      'Article 4(1) of the AI Act asks providers and deployers to take measures to support the development of AI literacy of their staff and of other persons dealing with the operation and use of AI systems on their behalf, taking into account their knowledge, experience, education and the context of use; it does not require guaranteeing any specific level for any individual. The article has applied since 2 February 2025. The Commission writes that no certificate is needed and that organisations can keep an internal record of trainings.',
      'Artikel 4 Absatz 1 der KI-Verordnung verlangt von Anbietern und Betreibern Maßnahmen, um die Entwicklung der KI-Kompetenz ihres Personals und anderer Personen zu unterstützen, die in ihrem Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind, unter Berücksichtigung von Kenntnissen, Erfahrung, Ausbildung und Einsatzkontext; ein bestimmtes Niveau muss für niemanden garantiert werden. Der Artikel gilt seit dem 2. Februar 2025. Die Kommission schreibt, dass kein Zertifikat nötig ist und dass Organisationen ein internes Verzeichnis der Schulungen führen können.',
    ), source: SRC.art4[lang] });
    findings.push({ kind: 'interpretation', text: t(
      'Neither the AI Act nor the GDPR contains a provision that explicitly requires a written AI usage policy. Article 4 asks for measures that support literacy, Article 24(1) GDPR asks the controller for technical and organisational measures that are reviewed and updated, and the Trade Secrets Directive protects information only if reasonable steps were taken to keep it secret. A policy is the usual way to meet all three at once, not a duty of its own.',
      'Weder die KI-Verordnung noch die DSGVO enthält eine Vorschrift, die ausdrücklich eine schriftliche KI-Nutzungsrichtlinie verlangt. Artikel 4 verlangt Maßnahmen, die Kompetenz fördern, Artikel 24 Absatz 1 DSGVO verlangt vom Verantwortlichen technische und organisatorische Maßnahmen, die überprüft und aktualisiert werden, und die Geschäftsgeheimnisrichtlinie schützt Informationen nur, wenn angemessene Geheimhaltungsmaßnahmen getroffen wurden. Eine Richtlinie ist der übliche Weg, alle drei zugleich zu erfüllen, keine eigene Pflicht.',
    ), source: SRC.policy[lang] });
    if (a.published === 'yes') findings.push({ kind: 'fact', text: t(
      'Article 50 has applied since 2 August 2026. For a business that uses tools made by others, three cases matter: emotion recognition or biometric categorisation (information of the persons exposed), real-looking AI images, audio or video (disclosure as artificially generated), and AI text published to inform the public on matters of public interest (label, unless a documented human review and a named editorial responsibility exist). Internal use and individual correspondence are not published in the sense of the Commission\'s guidelines.',
      'Artikel 50 gilt seit dem 2. August 2026. Für einen Betrieb, der fremde Tools nutzt, zählen drei Fälle: Emotionserkennung oder biometrische Kategorisierung (Information der betroffenen Personen), echt wirkende KI-Bilder, Töne oder Videos (Offenlegung als künstlich erzeugt) und KI-Texte, die veröffentlicht werden, um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren (Kennzeichnung, außer bei dokumentierter menschlicher Prüfung und benannter redaktioneller Verantwortung). Interne Nutzung und Einzelkorrespondenz sind nicht veröffentlicht im Sinn der Leitlinien der Kommission.',
    ), source: SRC.art50[lang] });
    findings.push({ kind: 'gap', text: t(
      'How often a briefing is repeated and how long its record is kept is stated in no source we read. A new or changed tool is an obvious occasion to repeat; the business sets the rhythm.',
      'Wie oft eine Einweisung wiederholt wird und wie lange der Nachweis aufbewahrt wird, steht in keiner gelesenen Quelle. Ein neues oder geändertes Tool ist ein naheliegender Anlass zur Wiederholung; den Rhythmus setzt der Betrieb.',
    ) });
    findings.push({ kind: 'uncertain', text: t(
      'Which authority supervises Articles 4 and 50 is national law. Germany has named the Federal Network Agency (Act of 22 July 2026, in force since 29 July 2026). For Austria, as of 19 October 2026, no official source names the market surveillance authority; the duties apply regardless.',
      'Welche Behörde die Artikel 4 und 50 beaufsichtigt, ist nationales Recht. Deutschland hat die Bundesnetzagentur benannt (Gesetz vom 22. Juli 2026, in Kraft seit 29. Juli 2026). Für Österreich nennt zum Stand 19. Oktober 2026 keine amtliche Quelle die Marktüberwachungsbehörde; die Pflichten gelten trotzdem.',
    ), source: SRC.authority[lang] });

    // The plan in order; the first step leads.
    const plan = [];
    if (a.hr === 'yes') plan.push(t('Pause AI-supported decisions about people and emotion recognition; have a specialist assess them against Annex III and Article 5(1)(f) before any restart.', 'KI-gestützte Entscheidungen über Personen und Emotionserkennung aussetzen; vor einem Neustart durch eine Fachperson an Anhang III und Artikel 5 Absatz 1 Buchstabe f messen lassen.'));
    plan.push(accountsOpen
      ? t('Business accounts for approved tools, training on inputs switched off, one row per tool in a register with the seven approval questions; no private accounts for work.', 'Betriebliche Konten für freigegebene Tools, Training mit Eingaben abgeschaltet, eine Zeile je Tool in einem Register mit den sieben Freigabefragen; keine privaten Konten für die Arbeit.')
      : t('Keep the tool register current: one row per tool, training on inputs off, the processor contract filed where personal data is involved.', 'Das Tool-Register aktuell halten: eine Zeile je Tool, Training mit Eingaben aus, der Auftragsverarbeitungsvertrag abgelegt, wo Personenbezug im Spiel ist.'));
    plan.push(rulesOpen
      ? t('Write the usage policy in nine areas: permitted tools and accounts, permitted and prohibited uses, what never goes in, handling unavoidable personal data, review before use, release of documents leaving the business, labelling, reporting incidents, responsibility in case of doubt. Post the one page.', 'Die Nutzungsrichtlinie in neun Regelbereichen schreiben: erlaubte Tools und Konten, erlaubte und verbotene Nutzungen, was nie hinein darf, Umgang mit unvermeidbarem Personenbezug, Prüfung vor Verwendung, Freigabe von Dokumenten, die den Betrieb verlassen, Kennzeichnung, Meldung von Vorfällen, Verantwortung im Zweifel. Die eine Seite aushängen.')
      : t('Check the existing policy against the nine areas and date the current version.', 'Die bestehende Richtlinie an den neun Regelbereichen prüfen und die aktuelle Fassung datieren.'));
    plan.push(briefingOpen
      ? t('Brief the team: the policy section by section, what never goes in, two or three use cases from the business, the failure patterns, the reporting channel. Keep the attendance list with date and contents.', 'Das Team einweisen: die Richtlinie Abschnitt für Abschnitt, was nie hinein darf, zwei oder drei Anwendungsfälle aus dem Betrieb, die Fehlermuster, der Meldeweg. Die Teilnehmerliste mit Datum und Inhalten aufbewahren.')
      : t('Set the date of the next briefing and brief every new tool.', 'Den Termin der nächsten Einweisung setzen und jedes neue Tool einweisen.'));
    plan.push(a.published === 'yes'
      ? t('Run the labelling check under Article 50 for every chatbot, every real-looking image, audio or video and every published text; record the result per case.', 'Den Kennzeichnungs-Check nach Artikel 50 für jeden Chatbot, jedes echt wirkende Bild, Ton oder Video und jeden veröffentlichten Text machen; das Ergebnis je Fall festhalten.')
      : t('Record "no labelling case at present" with a date, and ask again when AI output starts to reach customers or the public.', '„Derzeit kein Kennzeichnungsfall“ mit Datum festhalten, und erneut fragen, sobald KI-Ausgaben Kunden oder die Öffentlichkeit erreichen.'));
    plan.push(t('Freeze an evidence page with the date: what is regulated, what is open, who is responsible, when it is reviewed next.', 'Eine Nachweisseite mit Datum einfrieren: was geregelt ist, was offen ist, wer verantwortlich ist, wann die nächste Überprüfung ist.'));

    const pointer = t('The AI Policy Toolkit produces the documents for every step of this plan: the usage policy, the one page to post, the tool register with approval form, the briefing record, the labelling checklist, the enactment plan and the evidence summary, from thirty-four questions, 29 of them required, with a handbook that marks every statement.', 'Das KI-Richtlinien-Toolkit erzeugt die Dokumente für jeden Schritt dieses Plans: die Nutzungsrichtlinie, die eine Seite zum Aushängen, das Tool-Register mit Freigabeformular, den Schulungsnachweis, die Kennzeichnungs-Checkliste, den Plan der Inkraftsetzung und die Nachweisseite, aus vierunddreißig Fragen, davon 29 Pflichtfragen, mit einem Handbuch, das jede Aussage markiert.');
    const doc = buildDoc({ memo: start, lang, answers: a, date, verdict, findings, steps: plan, pointer, sources: SOURCES[lang], extra });
    return { level, title: verdict.title, text: verdict.text, steps: plan, doc, first: first.key };
  },
};
