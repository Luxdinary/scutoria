// Memo 2 of E11: "Must we label what our AI produces?" Article 50 of the AI Act, read at the original and through the
// Commission's guidelines (content approved on 20 July 2026, annex to C(2026) 5054 final). The findings reuse the verified statements of the AI Policy Toolkit handbook, section 5.
import { L, S, BUSINESS_Q, buildDoc, has } from './shared.mjs';

const SRC = {
  act50: S('Regulation (EU) 2024/1689, Art. 3(3) and (4), Art. 50, Art. 113, consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-19; Guidelines, annex to C(2026) 5054 final, points 12 to 16 · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 3 Nr. 3 und 4, Art. 50, Art. 113, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-19; Leitlinien, Anhang zu C(2026) 5054 final, Rn. 12 bis 16 · Abruf 2026-10-23'),
  emotion: S('Regulation (EU) 2024/1689, Art. 50(3), Art. 5(1), point (f), Art. 113, point (a) · retrieved 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 3, Art. 5 Abs. 1 Buchst. f, Art. 113 Buchst. a · Abruf 2026-10-19'),
  deepfake: S('Regulation (EU) 2024/1689, Art. 50(4), first subparagraph, and Art. 3(60) · retrieved 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 4 Unterabs. 1 und Art. 3 Nr. 60 · Abruf 2026-10-19'),
  text: S('Regulation (EU) 2024/1689, Art. 50(4), second subparagraph · retrieved 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 4 Unterabs. 2 · Abruf 2026-10-19'),
  g131: S('Guidelines, annex to C(2026) 5054 final, point 131 with examples · retrieved 2026-10-23. Guidance, not law.', 'Leitlinien, Anhang zu C(2026) 5054 final, Rn. 131 mit Beispielen · Abruf 2026-10-23. Auslegungshilfe, kein Rechtsakt.'),
  g133: S('Guidelines, annex to C(2026) 5054 final, points 133 to 138 · retrieved 2026-10-23', 'Leitlinien, Anhang zu C(2026) 5054 final, Rn. 133 bis 138 · Abruf 2026-10-23'),
  g154: S('Guidelines, annex to C(2026) 5054 final, point 154 · retrieved 2026-10-23', 'Leitlinien, Anhang zu C(2026) 5054 final, Rn. 154 · Abruf 2026-10-23'),
  g38: S('Guidelines, annex to C(2026) 5054 final, point 38 · retrieved 2026-10-23', 'Leitlinien, Anhang zu C(2026) 5054 final, Rn. 38 · Abruf 2026-10-23'),
  chat: S('Regulation (EU) 2024/1689, Art. 50(1) · retrieved 2026-10-19; Guidelines, annex to C(2026) 5054 final, points 12 to 16 · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 1 · Abruf 2026-10-19; Leitlinien, Anhang zu C(2026) 5054 final, Rn. 12 bis 16 · Abruf 2026-10-23'),
  marking: S('Regulation (EU) 2024/1689, Art. 50(2) and Art. 111(4), the latter inserted by Regulation (EU) 2026/1744, Art. 1, point (39) · retrieved 2026-10-18 and 2026-10-19; Guidelines, annex to C(2026) 5054 final, point 153 · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 2 und Art. 111 Abs. 4, Letzterer eingefügt durch Verordnung (EU) 2026/1744, Art. 1 Nr. 39 · Abruf 2026-10-18 und 2026-10-19; Leitlinien, Anhang zu C(2026) 5054 final, Rn. 153 · Abruf 2026-10-23'),
  none: S('Guidelines, annex to C(2026) 5054 final, point 131 · retrieved 2026-10-23; Regulation (EU) 2024/1689, Art. 4 · retrieved 2026-10-19', 'Leitlinien, Anhang zu C(2026) 5054 final, Rn. 131 · Abruf 2026-10-23; Verordnung (EU) 2024/1689, Art. 4 · Abruf 2026-10-19'),
  manner: S('Regulation (EU) 2024/1689, Art. 50(5) · retrieved 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 5 · Abruf 2026-10-19'),
  fines: S('Regulation (EU) 2024/1689, Art. 99(4), point (g), and Art. 99(6) · retrieved 2026-10-19', 'Verordnung (EU) 2024/1689, Art. 99 Abs. 4 Buchst. g und Abs. 6 · Abruf 2026-10-19'),
  lawful: S('Regulation (EU) 2024/1689, Art. 50(6), consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 6, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-23'),
  markingEx: S('Regulation (EU) 2024/1689, Art. 50(2), first and third sentence, consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 50 Abs. 2 Satz 1 und 3, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-23'),
  g113: S('Guidelines C(2026) 5054, section 6.1.1 (point 113 ff.: realistic persons and depictions of professional services count) · retrieved 2026-10-23', 'Leitlinien C(2026) 5054, Abschnitt 6.1.1 (Rn. 113 ff.: realistische Personen und Darstellungen beruflicher Dienstleistungen zählen) · Abruf 2026-10-23'),
  intimate: S('Regulation (EU) 2024/1689, Art. 5(1), points (ba) and (bb), and Art. 113, point (a), consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-23', 'Verordnung (EU) 2024/1689, Art. 5 Abs. 1 Buchst. ba und bb, und Art. 113 Buchst. a, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-23'),
  authority: S('KI-Marktüberwachungs- und Innovationsförderungsgesetz of 22 July 2026, BGBl. 2026 I No. 223, § 2(1) · gesetze-im-internet.de · retrieved 2026-10-19; Datenschutzbehörde (Austria), page on artificial intelligence and data protection · dsb.gv.at · retrieved 2026-10-19', 'KI-Marktüberwachungs- und Innovationsförderungsgesetz vom 22. Juli 2026, BGBl. 2026 I Nr. 223, § 2 Abs. 1 · gesetze-im-internet.de · Abruf 2026-10-19; Datenschutzbehörde (Österreich), Seite „Künstliche Intelligenz und Datenschutz“ · dsb.gv.at · Abruf 2026-10-19'),
};

const SOURCES = S([
  'Regulation (EU) 2024/1689 of 13 June 2024 (AI Act), consolidated version of 27 July 2026: Art. 3(3), (4) and (60), Art. 4, Art. 5(1)(f), Art. 50, Art. 99(4)(g) and (6), Art. 111(4), Art. 113. eur-lex.europa.eu · retrieved 2026-10-19; Art. 5(1)(ba) and (bb), Art. 50(2) and (6), Art. 111(4) · retrieved 2026-10-23.',
  'Regulation (EU) 2026/1744 of 8 July 2026 (Digital Omnibus on AI), in force since 27 July 2026: Art. 1, points (20) and (39). eur-lex.europa.eu/eli/reg/2026/1744/oj · retrieved 2026-10-18.',
  'European Commission, Guidelines on the transparency obligations under Article 50, content approved on 20 July 2026 (C(2026) 5054 final, annex): points 12 to 16, 38, 113 ff., 131, 133 to 138, 153 and 154. digital-strategy.ec.europa.eu · retrieved 2026-10-23. To be checked: formal adoption in all languages. Guidance, not law.',
  'Germany: KI-Marktüberwachungs- und Innovationsförderungsgesetz of 22 July 2026, BGBl. 2026 I No. 223, § 2(1). gesetze-im-internet.de · retrieved 2026-10-19.',
  'Austria: Datenschutzbehörde, page on artificial intelligence and data protection, undated. dsb.gv.at · retrieved 2026-10-19.',
], [
  'Verordnung (EU) 2024/1689 vom 13. Juni 2024 (KI-Verordnung), konsolidierte Fassung vom 27. Juli 2026: Art. 3 Nr. 3, 4 und 60, Art. 4, Art. 5 Abs. 1 Buchst. f, Art. 50, Art. 99 Abs. 4 Buchst. g und Abs. 6, Art. 111 Abs. 4, Art. 113. eur-lex.europa.eu · Abruf 2026-10-19; Art. 5 Abs. 1 Buchst. ba und bb, Art. 50 Abs. 2 und 6, Art. 111 Abs. 4 · Abruf 2026-10-23.',
  'Verordnung (EU) 2026/1744 vom 8. Juli 2026 (Digitaler Omnibus zur KI), in Kraft seit 27. Juli 2026: Art. 1 Nr. 20 und 39. eur-lex.europa.eu/eli/reg/2026/1744/oj · Abruf 2026-10-18.',
  'Europäische Kommission, Leitlinien zu den Transparenzpflichten nach Artikel 50, Inhalt gebilligt am 20. Juli 2026 (C(2026) 5054 final, Anhang): Rn. 12 bis 16, 38, 113 ff., 131, 133 bis 138, 153 und 154. digital-strategy.ec.europa.eu · Abruf 2026-10-23. Stand prüfen: förmliche Annahme in allen Sprachen. Auslegungshilfe, kein Rechtsakt.',
  'Deutschland: KI-Marktüberwachungs- und Innovationsförderungsgesetz vom 22. Juli 2026, BGBl. 2026 I Nr. 223, § 2 Abs. 1. gesetze-im-internet.de · Abruf 2026-10-19.',
  'Österreich: Datenschutzbehörde, Seite „Künstliche Intelligenz und Datenschutz“, undatiert. dsb.gv.at · Abruf 2026-10-19.',
]);

const isProvider = (a) => a.role === 'provider' || a.role === 'both';
const isDeployer = (a) => a.role === 'deployer' || a.role === 'both';

export const labelling = {
  id: 'labelling',
  pathKey: 'memoLabelling',
  toolkit: 'policy',
  sourcesDate: '2026-10-19',
  sourcesUpdated: '2026-10-23',
  title: S('Must we label what our AI produces?', 'Müssen wir kennzeichnen, was unsere KI erzeugt?'),
  teaser: S('Chatbots, AI images, published texts: which of the duties of Article 50 of the AI Act apply to your business, since when, and what to do.', 'Chatbots, KI-Bilder, veröffentlichte Texte: Welche Pflichten aus Artikel 50 der KI-Verordnung treffen Ihren Betrieb, seit wann, und was ist zu tun.'),
  description: S('Free memo generator: two to seven questions, then a dated memo on the labelling duties of Article 50 of the AI Act for your business, with the articles and the Commission guidelines as sources. By Scutoria.', 'Freier Memo-Generator: zwei bis sieben Fragen, dann ein datiertes Memo zu den Kennzeichnungspflichten nach Artikel 50 der KI-Verordnung für Ihren Betrieb, mit den Artikeln und den Leitlinien der Kommission als Quellen. Von Scutoria.'),
  lead: S('Article 50 of the AI Act has applied since 2 August 2026. Two to seven questions, then a memo that names the paragraphs that apply to you, the exceptions, the dates and the next steps, every statement with its source.', 'Artikel 50 der KI-Verordnung gilt seit dem 2. August 2026. Zwei bis sieben Fragen, dann ein Memo, das die Absätze nennt, die Sie treffen, die Ausnahmen, die Stichtage und die nächsten Schritte, jede Aussage mit Quelle.'),
  questions: [
    BUSINESS_Q,
    { key: 'role', type: 'radio', label: S('Which describes your business?', 'Was trifft auf Ihren Betrieb zu?'), short: S('Role', 'Rolle'), options: [
      { v: 'deployer', label: S('We use AI tools made by others', 'Wir nutzen KI-Tools anderer Anbieter'), hint: S('A deployer under the AI Act.', 'Betreiber im Sinn der KI-Verordnung.') },
      { v: 'provider', label: S('We develop AI systems or place them on the market under our own name', 'Wir entwickeln KI-Systeme oder bringen sie unter eigenem Namen in Verkehr'), hint: S('A provider under the AI Act.', 'Anbieter im Sinn der KI-Verordnung.') },
      { v: 'both', label: S('Both', 'Beides') },
    ] },
    { key: 'uses', type: 'checks', label: S('What do you do with AI? Tick everything that applies.', 'Wofür setzen Sie KI ein? Alles ankreuzen, was zutrifft.'), short: S('Uses', 'Einsatzarten'), options: [
      { v: 'chat', label: S('A chatbot or voice assistant that talks to customers or the public', 'Ein Chatbot oder Sprachassistent spricht mit Kunden oder der Öffentlichkeit') },
      { v: 'media', label: S('We generate or edit images, audio or video that look like real people, places or events', 'Wir erzeugen oder bearbeiten Bilder, Ton oder Video, die wie echte Personen, Orte oder Ereignisse wirken') },
      { v: 'text', label: S('We publish AI-written or AI-edited text: website, blog, social media, newsletter, press', 'Wir veröffentlichen KI-geschriebene oder KI-bearbeitete Texte: Website, Blog, soziale Medien, Newsletter, Presse') },
      { v: 'emotion', label: S('We use emotion recognition or biometric categorisation of people', 'Wir setzen Emotionserkennung oder biometrische Kategorisierung von Personen ein') },
      { v: 'internal', label: S('Only internal: drafts, analysis, code, translations, summaries that are not published', 'Nur intern: Entwürfe, Analysen, Code, Übersetzungen, Zusammenfassungen, die nicht veröffentlicht werden') },
    ] },
    { key: 'textTopic', type: 'radio', when: (a) => has(a, 'uses', 'text'), label: S('What are the published texts about?', 'Worum geht es in den veröffentlichten Texten?'), short: S('Published texts', 'Veröffentlichte Texte'), hint: S('Only if you publish AI-written text.', 'Nur wenn Sie KI-geschriebene Texte veröffentlichen.'), options: [
      { v: 'public', label: S('Matters of public interest: politics, administration, justice, health, environment, consumer safety, economic or financial questions', 'Angelegenheiten von öffentlichem Interesse: Politik, Verwaltung, Justiz, Gesundheit, Umwelt, Verbrauchersicherheit, Wirtschafts- oder Finanzfragen') },
      { v: 'commercial', label: S('Our own products, services and advertising, without claims about health, safety or sustainability', 'Unsere eigenen Produkte, Leistungen und Werbung, ohne Aussagen zu Gesundheit, Sicherheit oder Nachhaltigkeit') },
      { v: 'mixed', label: S('Both, or unsure', 'Beides oder unsicher') },
    ] },
    { key: 'textReview', type: 'radio', when: (a) => has(a, 'uses', 'text'), label: S('Before publication, does a person with the relevant knowledge check the substance of the text, and is a person or the company named as editorially responsible, for example in the legal notice?', 'Prüft vor der Veröffentlichung eine Person mit Sachkenntnis den Inhalt, und ist eine Person oder das Unternehmen als redaktionell verantwortlich benannt, etwa im Impressum?'), short: S('Review and responsibility', 'Prüfung und Verantwortung'), hint: S('Only if you publish AI-written text.', 'Nur wenn Sie KI-geschriebene Texte veröffentlichen.'), options: [
      { v: 'yes', label: S('Yes, both', 'Ja, beides') },
      { v: 'no', label: S('No, or only spell-checking or a quick look', 'Nein, oder nur Rechtschreibprüfung oder ein kurzer Blick') },
      { v: 'mixed', label: S('Sometimes, or unsure', 'Manchmal oder unsicher') },
    ] },
    { key: 'mediaArt', type: 'radio', when: (a) => has(a, 'uses', 'media'), label: S('Are those images, audio or video part of an evidently artistic, creative, satirical or fictional work?', 'Sind diese Bilder, Töne oder Videos Teil eines offensichtlich künstlerischen, kreativen, satirischen oder fiktionalen Werks?'), short: S('Artistic work', 'Künstlerisches Werk'), hint: S('Only if you generate real-looking images, audio or video.', 'Nur wenn Sie echt wirkende Bilder, Töne oder Videos erzeugen.'), options: [
      { v: 'no', label: S('No, they are used for advertising, documentation or information', 'Nein, sie dienen Werbung, Dokumentation oder Information') },
      { v: 'yes', label: S('Yes, evidently artistic or fictional', 'Ja, offensichtlich künstlerisch oder fiktional') },
      { v: 'mixed', label: S('Both', 'Beides') },
    ] },
    { key: 'providerGen', type: 'radio', when: (a) => isProvider(a), label: S('Does your system generate or substantially alter audio, image, video or text?', 'Erzeugt oder verändert Ihr System Ton, Bild, Video oder Text wesentlich?'), short: S('Generates or alters content', 'Erzeugt oder verändert Inhalte'), hint: S('Only for providers.', 'Nur für Anbieter.'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'standard', label: S('Only standard editing', 'Nur Standardbearbeitung') },
      { v: 'no', label: S('No', 'Nein') },
    ] },
    { key: 'providerPre', type: 'radio', when: (a) => isProvider(a), label: S('Was your system placed on the market before 2 August 2026?', 'Wurde Ihr System vor dem 2. August 2026 in Verkehr gebracht?'), short: S('On the market before 2 August 2026', 'Vor dem 2. August 2026 in Verkehr'), hint: S('Only for providers.', 'Nur für Anbieter.'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'no', label: S('No, or not yet on the market', 'Nein, oder noch nicht in Verkehr') },
    ] },
  ],

  evaluate(answers, lang, date) {
    const t = L(lang);
    const a = answers;
    const duties = [];
    const checks = [];
    let markingDuty = false; // the duty of Art. 50(2), which has a transition date
    let reviewHolds = false; // the exception of Art. 50(4), second subparagraph, holds for the texts described
    let mixedReviewed = false; // texts to sort, but the documented review exists
    const findings = [{ kind: 'fact', text: t(
      'Article 50 of the AI Act has applied since 2 August 2026. Paragraphs 1 and 2 address providers, paragraphs 3 and 4 deployers. A deployer is anyone using an AI system under its authority, except in a personal non-professional activity. Where the deployer is a company, its employees acting under its instructions are not separate deployers; the company is.',
      'Artikel 50 der KI-Verordnung gilt seit dem 2. August 2026. Die Absätze 1 und 2 richten sich an Anbieter, die Absätze 3 und 4 an Betreiber. Betreiber ist, wer ein KI-System in eigener Verantwortung verwendet, außer im Rahmen einer persönlichen und nicht beruflichen Tätigkeit. Ist der Betreiber ein Unternehmen, sind die Beschäftigten, die auf seine Weisung handeln, keine eigenen Betreiber; das Unternehmen ist es.',
    ), source: SRC.act50[lang] }];
    const steps = [];

    if (has(a, 'uses', 'emotion')) {
      duties.push(t('information of the persons exposed to emotion recognition or biometric categorisation (Art. 50(3)), and the prohibition of Art. 5(1)(f) to check', 'Information der Personen, die Emotionserkennung oder biometrischer Kategorisierung ausgesetzt sind (Art. 50 Abs. 3), und das Verbot des Art. 5 Abs. 1 Buchst. f zu prüfen'));
      findings.push({ kind: 'fact', text: t(
        'A deployer of an emotion recognition system or a biometric categorisation system informs the persons exposed to it of its operation. Separately, since 2 February 2025 it is prohibited to use AI systems to infer the emotions of a natural person in the workplace or in education institutions, except for medical or safety reasons.',
        'Ein Betreiber eines Emotionserkennungssystems oder eines Systems zur biometrischen Kategorisierung informiert die davon betroffenen Personen über den Betrieb des Systems. Davon unabhängig ist es seit dem 2. Februar 2025 verboten, KI-Systeme zur Ableitung der Emotionen einer natürlichen Person am Arbeitsplatz oder in Bildungseinrichtungen zu verwenden, außer aus medizinischen Gründen oder Sicherheitsgründen.',
      ), source: SRC.emotion[lang] });
      findings.push({ kind: 'interpretation', text: t(
        'This case is outside what a memo can settle. Whether your use falls under the prohibition or only under the information duty needs a specialist; until then, the cautious course is to pause it.',
        'Dieser Fall liegt außerhalb dessen, was ein Memo klären kann. Ob Ihre Nutzung unter das Verbot oder nur unter die Informationspflicht fällt, braucht eine Fachperson; bis dahin ist Aussetzen der vorsichtige Weg.',
      ) });
      steps.push(t('Pause the emotion recognition or biometric categorisation until a specialist has assessed it against Article 5(1)(f) and Article 50(3).', 'Setzen Sie Emotionserkennung oder biometrische Kategorisierung aus, bis eine Fachperson sie an Artikel 5 Absatz 1 Buchstabe f und Artikel 50 Absatz 3 gemessen hat.'));
    }

    if (has(a, 'uses', 'media')) {
      const art = a.mediaArt ?? 'no';
      if (art !== 'yes') duties.push(t('disclosure of deep fakes (Art. 50(4), first subparagraph)', 'Offenlegung von Deepfakes (Art. 50 Abs. 4 Unterabs. 1)'));
      else duties.push(t('limited disclosure of AI content in artistic or fictional works (Art. 50(4), first subparagraph)', 'eingeschränkte Offenlegung von KI-Inhalten in künstlerischen oder fiktionalen Werken (Art. 50 Abs. 4 Unterabs. 1)'));
      findings.push({ kind: 'fact', text: t(
        'A deployer that generates or manipulates image, audio or video content constituting a deep fake discloses that the content has been artificially generated or manipulated. A deep fake is AI-generated or manipulated content that resembles existing persons, objects, places, entities or events and would falsely appear to a person to be authentic or truthful.',
        'Ein Betreiber, der Bild-, Ton- oder Videoinhalte erzeugt oder manipuliert, die ein Deepfake sind, legt offen, dass die Inhalte künstlich erzeugt oder manipuliert wurden. Ein Deepfake ist ein durch KI erzeugter oder manipulierter Inhalt, der wirklichen Personen, Gegenständen, Orten, Einrichtungen oder Ereignissen ähnelt und einer Person fälschlicherweise als echt oder wahrheitsgemäß erscheinen würde.',
      ), source: SRC.deepfake[lang] });
      if (art !== 'no') findings.push({ kind: 'fact', text: t(
        'Where the content forms part of an evidently artistic, creative, satirical, fictional or analogous work, the duty is limited to disclosing the existence of such generated or manipulated content in an appropriate manner that does not hamper the display or enjoyment of the work.',
        'Ist der Inhalt Teil eines offensichtlich künstlerischen, kreativen, satirischen, fiktionalen oder analogen Werks, beschränkt sich die Pflicht darauf, das Vorhandensein solcher erzeugten oder manipulierten Inhalte in geeigneter Weise offenzulegen, die die Darstellung oder den Genuss des Werks nicht beeinträchtigt.',
      ), source: SRC.deepfake[lang] });
      findings.push({ kind: 'interpretation', text: t(
        'A photo-like AI image of a technician in front of a switch cabinet on a website is a deep fake, because it shows a real-looking scene that never happened; a stylised graphic of a lightning bolt is not. Advertising usually cannot rely on the artistic exception.',
        'Ein fotorealistisches KI-Bild eines Monteurs vor einem Schaltschrank auf der Website ist ein Deepfake, weil es eine echt wirkende Szene zeigt, die es nie gab; eine stilisierte Grafik eines Blitzes nicht. Werbung kann sich in der Regel nicht auf die künstlerische Ausnahme berufen.',
      ), source: SRC.g113[lang] });
      findings.push({ kind: 'fact', text: t(
        'From 2 December 2026 it is prohibited to use AI systems that generate realistic intimate or sexual depictions of an identifiable person without explicit consent (Art. 5(1)(ba)).',
        'Ab 2. Dezember 2026 ist es verboten, KI-Systeme zu verwenden, die realistische intime oder sexuelle Darstellungen einer identifizierbaren Person ohne ausdrückliche Einwilligung erzeugen (Art. 5 Abs. 1 Buchst. ba).',
      ), source: SRC.intimate[lang] });
      if (art !== 'yes') steps.push(t('For each AI-generated or AI-edited image, audio or video that looks real: add a visible disclosure such as "artificially generated" where people see it, and keep a dated list.', 'Für jedes KI-erzeugte oder KI-bearbeitete Bild, Ton oder Video, das echt wirkt: einen sichtbaren Hinweis wie „künstlich erzeugt“ dort anbringen, wo Menschen es sehen, und eine datierte Liste führen.'));
      if (art !== 'no') steps.push(t('For artistic or fictional works: disclose the existence of AI content in a way that does not hamper the work, for example in the credits or the caption.', 'Für künstlerische oder fiktionale Werke: das Vorhandensein von KI-Inhalten so offenlegen, dass es das Werk nicht beeinträchtigt, etwa im Abspann oder in der Bildunterschrift.'));
    }

    if (has(a, 'uses', 'text')) {
      const topic = a.textTopic ?? 'mixed';
      const review = a.textReview ?? 'mixed';
      findings.push({ kind: 'fact', text: t(
        'A deployer that generates or manipulates text which is published with the purpose of informing the public on matters of public interest discloses that the text has been artificially generated or manipulated. This does not apply where the content has undergone a process of human review or editorial control and a natural or legal person holds editorial responsibility for the publication.',
        'Ein Betreiber, der Text erzeugt oder manipuliert, der veröffentlicht wird, um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren, legt offen, dass der Text künstlich erzeugt oder manipuliert wurde. Das gilt nicht, wenn der Inhalt einem Verfahren der menschlichen Überprüfung oder redaktionellen Kontrolle unterzogen wurde und eine natürliche oder juristische Person die redaktionelle Verantwortung für die Veröffentlichung trägt.',
      ), source: SRC.text[lang] });
      findings.push({ kind: 'fact', text: t(
        'The Commission\'s guidelines read the three elements as follows. Published means accessible to an indeterminate, fairly large number of unrelated readers. Informing means communicating knowledge, opinions or facts; short texts without such content do not inform. Matters of public interest are those relevant to society at large, such as politics, public administration, justice, fundamental rights, public security, public health, environmental protection, consumer safety and economic or financial questions. Outside the scope by the guidelines\' own examples: a company\'s advertisements and product descriptions that make no claims about health, consumer safety or sustainability, a consultant\'s advice to a client, and a chatbot summary visible only to the person who asked.',
        'Die Leitlinien der Kommission lesen die drei Elemente so. Veröffentlicht heißt: für eine unbestimmte, größere Zahl nicht zusammengehöriger Leser zugänglich. Informieren heißt: Wissen, Meinungen oder Tatsachen vermitteln; kurze Texte ohne solchen Gehalt informieren nicht. Angelegenheiten von öffentlichem Interesse sind solche, die für die Gesellschaft insgesamt von Bedeutung sind, etwa Politik, öffentliche Verwaltung, Justiz, Grundrechte, öffentliche Sicherheit, öffentliche Gesundheit, Umweltschutz, Verbrauchersicherheit sowie wirtschaftliche und finanzielle Fragen. Außerhalb liegen nach den eigenen Beispielen der Leitlinien die Werbung und Produktbeschreibungen eines Unternehmens ohne Aussagen zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit, die Beratung eines Beraters für einen Kunden und die Zusammenfassung eines Chatbots, die nur die fragende Person sieht.',
      ), source: SRC.g131[lang] });
      if (topic !== 'commercial') findings.push({ kind: 'fact', text: t(
        'The exception needs both conditions: the text has undergone human review or editorial control, and a natural or legal person holds editorial responsibility. Human review means the deliberate examination of the substance by persons with relevant knowledge; fact-checking is the minimum. Spell-checking, the mere existence of an editorial policy, automated review or a cursory approval do not count. Any substantive AI change after the review voids the exception. Editorial responsibility can be named online in the terms or legal information of a website and offline in a colophon.',
        'Die Ausnahme braucht beide Bedingungen: Der Text hat eine menschliche Überprüfung oder redaktionelle Kontrolle durchlaufen, und eine natürliche oder juristische Person trägt die redaktionelle Verantwortung. Menschliche Überprüfung heißt die bewusste Prüfung der Substanz durch Personen mit Sachkenntnis; eine Faktenprüfung ist das Mindeste. Rechtschreibprüfung, die bloße Existenz einer Redaktionsrichtlinie, automatische Prüfung oder eine flüchtige Freigabe zählen nicht. Jede inhaltliche Änderung durch KI nach der Prüfung hebt die Ausnahme auf. Die redaktionelle Verantwortung kann online in den Geschäftsbedingungen oder Rechtsinformationen einer Website und offline im Impressum benannt werden.',
      ), source: SRC.g133[lang] });
      if (topic === 'public' && review === 'yes') {
        reviewHolds = true;
        checks.push(t('published text: exception of the documented review applies, to be recorded per publication', 'veröffentlichte Texte: Ausnahme der dokumentierten Prüfung greift, je Veröffentlichung festzuhalten'));
        findings.push({ kind: 'interpretation', text: t(
          'For the texts you described, your answers meet both conditions of the exception: no label is needed. Keep a dated record per publication of who reviewed the substance and when, keep the editorial responsibility named, and make no AI change after the review.',
          'Für die beschriebenen Texte erfüllen Ihre Antworten beide Bedingungen der Ausnahme: Eine Kennzeichnung ist nicht nötig. Halten Sie je Veröffentlichung datiert fest, wer den Inhalt wann geprüft hat, lassen Sie die redaktionelle Verantwortung benannt, und ändern Sie nach der Prüfung nichts mehr per KI.',
        ) });
        steps.push(t('Keep a dated record per publication: who reviewed the substance and when; keep the editorial responsibility named in your legal notice; no AI change after the review.', 'Je Veröffentlichung datiert festhalten: Wer hat den Inhalt wann geprüft; die redaktionelle Verantwortung im Impressum benannt lassen; nach der Prüfung keine Änderung mehr per KI.'));
      } else if (topic === 'public') {
        duties.push(t('label or documented review for published text on matters of public interest (Art. 50(4), second subparagraph)', 'Kennzeichnung oder dokumentierte Prüfung für veröffentlichte Texte zu Angelegenheiten von öffentlichem Interesse (Art. 50 Abs. 4 Unterabs. 2)'));
        steps.push(t('For each published text on a matter of public interest: either label it as artificially generated, or set up a substantive review by a person with relevant knowledge and name the editorially responsible person in your legal notice; keep a dated record per publication.', 'Für jeden veröffentlichten Text zu einer Angelegenheit von öffentlichem Interesse: entweder als künstlich erzeugt kennzeichnen, oder eine inhaltliche Prüfung durch eine Person mit Sachkenntnis einrichten und die redaktionell verantwortliche Person im Impressum benennen; je Veröffentlichung datiert festhalten.'));
      } else if (topic === 'commercial') {
        checks.push(t('product and advertising texts without claims about health, safety or sustainability: no duty from paragraph 4', 'Produkt- und Werbetexte ohne Aussagen zu Gesundheit, Sicherheit oder Nachhaltigkeit: keine Pflicht aus Absatz 4'));
        findings.push({ kind: 'interpretation', text: t(
          'By the guidelines\' own examples, your product, service and advertising texts without claims about health, consumer safety or sustainability are not texts on matters of public interest, so paragraph 4 does not require a label for them. A text that makes such a claim is a case to check.',
          'Nach den eigenen Beispielen der Leitlinien sind Ihre Produkt-, Leistungs- und Werbetexte ohne Aussagen zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit keine Texte zu Angelegenheiten von öffentlichem Interesse; Absatz 4 verlangt für sie keine Kennzeichnung. Ein Text mit einer solchen Aussage ist ein Prüffall.',
        ) });
        steps.push(t('Keep the line clear: a product or advertising text that starts making claims about health, consumer safety or sustainability becomes a case to check.', 'Die Grenze im Blick behalten: Ein Produkt- oder Werbetext, der Aussagen zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit macht, wird zum Prüffall.'));
      } else {
        // Both, or unsure: without a documented review the texts on matters of public interest carry the duty (red);
        // with the review, the exception can hold and only the sorting remains (amber).
        if (review === 'yes') {
          reviewHolds = true;
          mixedReviewed = true;
        } else {
          duties.push(t('label or documented review for published text on matters of public interest (Art. 50(4), second subparagraph)', 'Kennzeichnung oder dokumentierte Prüfung für veröffentlichte Texte zu Angelegenheiten von öffentlichem Interesse (Art. 50 Abs. 4 Unterabs. 2)'));
          steps.push(t('For each published text on a matter of public interest: either label it as artificially generated, or set up a substantive review by a person with relevant knowledge and name the editorially responsible person in your legal notice; keep a dated record per publication.', 'Für jeden veröffentlichten Text zu einer Angelegenheit von öffentlichem Interesse: entweder als künstlich erzeugt kennzeichnen, oder eine inhaltliche Prüfung durch eine Person mit Sachkenntnis einrichten und die redaktionell verantwortliche Person im Impressum benennen; je Veröffentlichung datiert festhalten.'));
        }
        checks.push(t('published texts to sort: matters of public interest versus product and advertising texts', 'veröffentlichte Texte zu sortieren: Angelegenheiten von öffentlichem Interesse gegenüber Produkt- und Werbetexten'));
        findings.push({ kind: 'interpretation', text: t(
          'Your publications need sorting: texts that inform the public on matters of public interest need the label or the documented review; product and advertising texts without such claims do not. Decide per group, and in doubt treat a text as a matter of public interest.',
          'Ihre Veröffentlichungen brauchen eine Sortierung: Texte, die die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse informieren, brauchen die Kennzeichnung oder die dokumentierte Prüfung; Produkt- und Werbetexte ohne solche Aussagen nicht. Entscheiden Sie je Gruppe, und behandeln Sie im Zweifel einen Text als Angelegenheit von öffentlichem Interesse.',
        ) });
        steps.push(t('Sort your publications into texts on matters of public interest and product or advertising texts; for the first group, label or set up the documented review.', 'Sortieren Sie Ihre Veröffentlichungen in Texte zu Angelegenheiten von öffentlichem Interesse und Produkt- oder Werbetexte; für die erste Gruppe kennzeichnen oder die dokumentierte Prüfung einrichten.'));
      }
      findings.push({ kind: 'fact', text: t(
        'Content generated before 2 August 2026 need not be marked or labelled retroactively. Text generated before but published on or after that date needs the label. The Commission encourages labelling pre-existing deep fakes without disproportionate effort.',
        'Inhalte, die vor dem 2. August 2026 erzeugt wurden, müssen nicht nachträglich markiert oder gekennzeichnet werden. Text, der vorher erzeugt, aber an oder nach diesem Tag veröffentlicht wird, braucht die Kennzeichnung. Die Kommission ermutigt dazu, bestehende Deepfakes ohne unverhältnismäßigen Aufwand nachträglich zu kennzeichnen.',
      ), source: SRC.g154[lang] });
    }

    if (has(a, 'uses', 'chat')) {
      if (isDeployer(a)) {
        checks.push(t('chatbot of a provider: the provider\'s notice must appear before the first answer', 'Chatbot eines Anbieters: Der Hinweis des Anbieters muss vor der ersten Antwort erscheinen'));
        findings.push({ kind: 'uncertain', text: t(
          'Paragraph 1 addresses the provider, who must design a system that interacts with people so that they are informed they interact with an AI system, unless that is obvious. Whether a business that embeds such a system has an own duty under paragraph 1 is not settled in the guidelines. Check that the provider\'s notice appears before the first answer, and keep a dated screenshot.',
          'Absatz 1 richtet sich an den Anbieter, der ein System für die direkte Interaktion so gestalten muss, dass die Personen informiert werden, dass sie mit einem KI-System interagieren, es sei denn, das ist offensichtlich. Ob einen Betrieb, der ein solches System einbindet, eine eigene Pflicht aus Absatz 1 trifft, ist in den Leitlinien nicht geklärt. Prüfen Sie, dass der Hinweis des Anbieters vor der ersten Antwort erscheint, und legen Sie ein datiertes Bildschirmfoto ab.',
        ), source: SRC.chat[lang] });
        steps.push(t('Open your chatbot as a visitor: the AI notice must appear before the first answer, not only in terms or documentation; keep a dated screenshot and the provider\'s statement.', 'Öffnen Sie Ihren Chatbot als Besucher: Der KI-Hinweis muss vor der ersten Antwort erscheinen, nicht nur in Geschäftsbedingungen oder Dokumentation; datiertes Bildschirmfoto und die Aussage des Anbieters ablegen.'));
      }
      if (isProvider(a)) {
        duties.push(t('notice that people interact with an AI system (Art. 50(1))', 'Hinweis, dass Personen mit einem KI-System interagieren (Art. 50 Abs. 1)'));
        findings.push({ kind: 'fact', text: t(
          'Providers design AI systems intended to interact directly with natural persons so that these persons are informed that they are interacting with an AI system, unless this is obvious from the point of view of a reasonably well-informed, observant and circumspect person, taking into account the circumstances and the context of use.',
          'Anbieter gestalten KI-Systeme, die für die direkte Interaktion mit natürlichen Personen bestimmt sind, so, dass diese Personen informiert werden, dass sie mit einem KI-System interagieren, es sei denn, dies ist aus Sicht einer angemessen informierten, aufmerksamen und verständigen natürlichen Person aufgrund der Umstände und des Kontexts der Nutzung offensichtlich.',
        ), source: SRC.chat[lang] });
        steps.push(t('Document how your system informs users before the first answer, and test it as a new user would see it.', 'Dokumentieren Sie, wie Ihr System die Nutzer vor der ersten Antwort informiert, und testen Sie es so, wie ein neuer Nutzer es sieht.'));
      }
      findings.push({ kind: 'fact', text: t(
        'Certain techniques are not necessary and, used alone, insufficient for the notice: disclosures contained only in terms and conditions, URLs or documentation; machine-readable markings that are not perceivable at the point of interaction; unclear signals such as a generic "assistant"; and generalised disclosures.',
        'Bestimmte Techniken sind für den Hinweis nicht nötig und allein nicht ausreichend: Hinweise nur in Geschäftsbedingungen, URLs oder Dokumentation; maschinenlesbare Markierungen, die beim Nutzen nicht wahrnehmbar sind; unklare Signale wie ein allgemeiner „Assistent“; und pauschale Hinweise.',
      ), source: SRC.g38[lang] });
    }

    // Art. 50(2) only for systems that generate or substantially alter content; an unanswered question counts as "yes".
    const gen = a.providerGen ?? 'yes';
    if (isProvider(a) && gen !== 'yes') {
      findings.push({ kind: 'fact', text: t(
        'Providers of AI systems that generate synthetic audio, image, video or text content mark the outputs in a machine-readable format. The duty does not apply to the extent the AI systems perform an assistive function for standard editing or do not substantially alter the input data provided by the deployer or its semantics.',
        'Anbieter von KI-Systemen, die synthetische Audio-, Bild-, Video- oder Textinhalte erzeugen, kennzeichnen die Ausgaben in einem maschinenlesbaren Format. Die Pflicht gilt nicht, soweit die KI-Systeme eine unterstützende Funktion für die Standardbearbeitung ausführen oder die vom Betreiber bereitgestellten Eingabedaten oder deren Semantik nicht wesentlich verändern.',
      ), source: SRC.markingEx[lang] });
      if (gen === 'standard') {
        checks.push(t('machine-readable marking (Art. 50(2)): not needed while your system only performs standard editing; record why', 'maschinenlesbare Kennzeichnung (Art. 50 Abs. 2): nicht nötig, solange Ihr System nur Standardbearbeitung leistet; festhalten, warum'));
        steps.push(t('Record with a date why your system only performs standard editing and does not substantially alter the input; check again when its functions change.', 'Halten Sie datiert fest, warum Ihr System nur Standardbearbeitung leistet und die Eingaben nicht wesentlich verändert; prüfen Sie erneut, wenn sich seine Funktionen ändern.'));
      }
    }
    if (isProvider(a) && gen === 'yes') {
      markingDuty = true;
      duties.push(t('machine-readable marking of generated content (Art. 50(2))', 'maschinenlesbare Kennzeichnung erzeugter Inhalte (Art. 50 Abs. 2)'));
      findings.push({ kind: 'fact', text: t(
        'Providers of AI systems that generate synthetic audio, image, video or text content ensure that the outputs are marked in a machine-readable format and detectable as artificially generated or manipulated. Providers of such systems placed on the market before 2 August 2026 have until 2 December 2026 for this marking duty; the guidelines confirm that the transition concerns only the marking duty, not the notice for interacting systems.',
        'Anbieter von KI-Systemen, die synthetische Audio-, Bild-, Video- oder Textinhalte erzeugen, stellen sicher, dass die Ausgaben in einem maschinenlesbaren Format gekennzeichnet und als künstlich erzeugt oder manipuliert erkennbar sind. Anbieter solcher Systeme, die vor dem 2. August 2026 in Verkehr gebracht wurden, haben für diese Kennzeichnungspflicht bis zum 2. Dezember 2026 Zeit; die Leitlinien bestätigen, dass die Übergangsregel nur die Markierungspflicht betrifft, nicht den Hinweis bei interagierenden Systemen.',
      ), source: SRC.marking[lang] });
      steps.push(a.providerPre === 'yes'
        ? t('Your system was on the market before 2 August 2026: implement the machine-readable marking by 2 December 2026 and record the date your system was placed on the market.', 'Ihr System war vor dem 2. August 2026 in Verkehr: Setzen Sie die maschinenlesbare Kennzeichnung bis zum 2. Dezember 2026 um, und halten Sie das Datum des Inverkehrbringens fest.')
        : t('Implement and document the machine-readable marking of outputs before you place the system on the market, or now if it is already on the market since 2 August 2026.', 'Setzen Sie die maschinenlesbare Kennzeichnung der Ausgaben um und dokumentieren Sie sie, bevor Sie das System in Verkehr bringen, oder jetzt, wenn es seit dem 2. August 2026 in Verkehr ist.'));
    }

    const onlyInternal = !has(a, 'uses', 'chat') && !has(a, 'uses', 'media') && !has(a, 'uses', 'text') && !has(a, 'uses', 'emotion');
    if (onlyInternal && !isProvider(a)) {
      findings.push({ kind: 'interpretation', text: t(
        'Internal use without external effect, and individual correspondence that a person checks and sends, are not "published" in the sense of the guidelines, because they reach no indeterminate number of readers. From your answers no labelling duty under Article 50 follows. What remains: the duty to support the AI literacy of your staff under Article 4, and your own rules on what goes into a tool.',
        'Interne Nutzung ohne Außenwirkung und Einzelkorrespondenz, die eine Person prüft und selbst versendet, sind nicht „veröffentlicht“ im Sinn der Leitlinien, weil sie keine unbestimmte Zahl von Lesern erreichen. Aus Ihren Antworten folgt keine Kennzeichnungspflicht nach Artikel 50. Was bleibt: die Pflicht, die KI-Kompetenz der Belegschaft nach Artikel 4 zu fördern, und Ihre eigenen Regeln, was in ein Tool darf.',
      ), source: SRC.none[lang] });
      steps.push(t('Record "no case at present" with today\'s date in your tool register or labelling checklist, and ask the question again when a new use starts.', 'Halten Sie „derzeit kein Fall“ mit dem heutigen Datum im Tool-Register oder in der Kennzeichnungs-Checkliste fest, und stellen Sie die Frage erneut, wenn eine neue Einsatzart beginnt.'));
    }

    if (duties.length) findings.push({ kind: 'fact', text: t(
      'The information is provided in a clear and distinguishable manner at the latest at the time of the first interaction or exposure, and conforms to the applicable accessibility requirements.',
      'Die Informationen werden spätestens zum Zeitpunkt der ersten Interaktion oder Aussetzung in klarer und eindeutiger Weise bereitgestellt und müssen den geltenden Barrierefreiheitsanforderungen entsprechen.',
    ), source: SRC.manner[lang] });
    findings.push({ kind: 'fact', text: t(
      'Fines for breaches of the transparency obligations of Article 50 go up to EUR 15 000 000 or 3 % of the total worldwide annual turnover, whichever is higher; for SMEs the lower of the two amounts applies.',
      'Geldbußen für Verstöße gegen die Transparenzpflichten des Artikels 50 reichen bis zu 15 000 000 EUR oder 3 % des gesamten weltweiten Jahresumsatzes, je nachdem, welcher Betrag höher ist; bei KMU gilt der niedrigere der beiden Werte.',
    ), source: SRC.fines[lang] });
    findings.push({ kind: 'fact', text: t(
      'Paragraphs 1 to 4 do not affect the requirements of Chapter III and are without prejudice to other transparency obligations in Union or national law (Art. 50(6)).',
      'Die Absätze 1 bis 4 lassen die Anforderungen des Kapitels III und andere Transparenzpflichten im Unions- oder nationalen Recht unberührt (Art. 50 Abs. 6).',
    ), source: SRC.lawful[lang] });
    findings.push({ kind: 'interpretation', text: t(
      'A label does not make a use lawful; data protection, personality rights and copyright still apply.',
      'Eine Kennzeichnung macht eine Nutzung nicht rechtmäßig; Datenschutz, Persönlichkeitsrechte und Urheberrecht gelten weiter.',
    ) });
    findings.push({ kind: 'uncertain', text: t(
      'Which authority supervises Article 50 is national law. Germany has named the Federal Network Agency (Act of 22 July 2026, in force since 29 July 2026). For Austria, as of 19 October 2026, no official source names the market surveillance authority; the duties apply regardless, because the Regulation is directly applicable.',
      'Welche Behörde Artikel 50 beaufsichtigt, ist nationales Recht. Deutschland hat die Bundesnetzagentur benannt (Gesetz vom 22. Juli 2026, in Kraft seit 29. Juli 2026). Für Österreich nennt zum Stand 19. Oktober 2026 keine amtliche Quelle die Marktüberwachungsbehörde; die Pflichten gelten trotzdem, weil die Verordnung unmittelbar anwendbar ist.',
    ), source: SRC.authority[lang] });

    steps.push(t('Write the result into your tool register or labelling checklist with today\'s date, and set a review date; a new tool or a new kind of use is the occasion to ask the questions again.', 'Tragen Sie das Ergebnis mit dem heutigen Datum in Ihr Tool-Register oder Ihre Kennzeichnungs-Checkliste ein, und setzen Sie einen Wiedervorlagetermin; ein neues Tool oder eine neue Einsatzart ist der Anlass, die Fragen erneut zu stellen.'));

    const level = duties.length ? 'red' : checks.length ? 'amber' : 'green';
    const join = (items) => items.join(lang === 'de' ? '; ' : '; ');
    // Only the marking duty, for a system on the market before 2 August 2026: it applies from 2 December 2026, not now (Art. 111(4)).
    const onlyLaterMarking = markingDuty && duties.length === 1 && a.providerPre === 'yes';
    const redTitle = onlyLaterMarking
      ? t('Yes. A duty of Article 50 applies to you from 2 December 2026.', 'Ja. Eine Pflicht aus Artikel 50 trifft Sie ab dem 2. Dezember 2026.')
      : t('Yes. At least one duty of Article 50 applies to you now.', 'Ja. Mindestens eine Pflicht aus Artikel 50 trifft Sie jetzt.');
    // The amber title speaks of the exception only where a documented review exists.
    const amberTitle = mixedReviewed
      ? t('Partly: labelling is not needed where your documented review holds; some texts still need sorting.', 'Teilweise: Keine Kennzeichnung, wo Ihre dokumentierte Prüfung greift; einige Texte sind noch zu sortieren.')
      : reviewHolds
        ? t('Partly. No label where the exception holds, but conditions to keep and cases to check.', 'Teilweise. Keine Kennzeichnung, wo die Ausnahme greift, aber Bedingungen einzuhalten und Fälle zu prüfen.')
        : t('Partly. No duty found, but points to check.', 'Teilweise. Keine Pflicht gefunden, aber Punkte zu prüfen.');
    const verdict = level === 'red'
      ? { level, title: redTitle, text: t(`Duties found: ${join(duties)}.`, `Gefundene Pflichten: ${join(duties)}.`) + (checks.length ? ' ' + t(`Also to check: ${join(checks)}.`, `Außerdem zu prüfen: ${join(checks)}.`) : '') }
      : level === 'amber'
        ? { level, title: amberTitle, text: t(`To check: ${join(checks)}.`, `Zu prüfen: ${join(checks)}.`) }
        : { level, title: t('No labelling duty under Article 50 follows from your answers.', 'Aus Ihren Antworten folgt keine Kennzeichnungspflicht nach Artikel 50.'), text: t('Your AI use stays internal or reaches no public. Record the result with a date and ask again when a new use starts.', 'Ihre KI-Nutzung bleibt intern oder erreicht keine Öffentlichkeit. Halten Sie das Ergebnis datiert fest, und fragen Sie erneut, wenn eine neue Einsatzart beginnt.') };

    const pointer = t('The labelling checklist (D5) of the AI Policy Toolkit records this per tool and per publication, with the provider evidence and the key dates prefilled.', 'Die Kennzeichnungs-Checkliste (D5) des KI-Richtlinien-Toolkits hält das je Tool und je Veröffentlichung fest, mit Anbieternachweis und Stichtagen vorbefüllt.');
    const doc = buildDoc({ memo: labelling, lang, answers: a, date, verdict, findings, steps, pointer, sources: SOURCES[lang] });
    return { level, title: verdict.title, text: verdict.text, steps, doc };
  },
};
