// Document D5: the labelling checklist under Article 50 of the AI Act. Points 1 to 3 are prefilled; points 4 to 9 appear where the answers call for them.
import { B, makeDoc } from './blocks.mjs';
import { fmtDate, sourceLine, RETRIEVED } from './policy.mjs';
import { registerRows } from './register.mjs';

// Items of a point: a string is a line to tick; { c, f } is a line to tick followed by field lines to write on; { f } is field lines only.
const LINE = '________________________________________';

const T = {
  en: {
    title: 'Labelling checklist under Article 50 of the AI Act', shortTitle: 'Labelling checklist',
    basis: (d) => `Legal basis: Article 50 of Regulation (EU) 2024/1689 (AI Act), applicable since 2 August 2026 (Art. 113). This sheet classifies; it does not determine whether a rule applies and names no penalty. Points 1 to 3 apply once per business with a review date; points 4 to 9 per system or per publication. The wording was read at the consolidated text of 27 July 2026 (EUR-Lex, retrieved ${d}); check for later amendments at each review.`,
    fBusiness: 'Business', fResp: 'Responsible for labelling (§ 7 of the policy)', fDate: 'Date',
    p1: '1 · Role clarification (standing)', p1src: [['aiAct', 'Art. 3 (3) and (4), Art. 25 and Annex III']],
    p1a: (tools) => `Recorded for each tool in the register: provider (name, product). The business is the deployer because it uses the system under its authority (Art. 3 (4)); employees acting on instruction are not deployers themselves. Tools in the register: ${tools}.`,
    p1b: (who) => `Decides on use in the business: ${who}.`,
    p1c: 'No tool is offered to others under the business\'s own name, and no tool is used for a purpose listed as high-risk (Annex III). If either applies, the business may become a provider (Art. 3 (3), Art. 25); ask a specialist.',
    p2: '2 · Inventory of uses (standing)', p2src: [['aiAct', 'Art. 50 (1), (3) and (4)']],
    cases: ['An AI system talks directly to customers or other people (chat, voice, avatar): Art. 50 (1)', 'The business creates or alters images, audio or video with AI that get published: Art. 50 (4) first subparagraph', 'The business publishes AI-generated or AI-altered text: Art. 50 (4) second subparagraph', 'The business uses emotion recognition or biometric categorisation: Art. 50 (3)'],
    yes: 'yes', no: 'no', unsure: 'yes, scope unsure',
    noCase: (d) => `Four times no: points 4 to 9 do not apply at present. Date: ${d}. File this sheet; the review is in the enactment plan. Interpretation: internal use without external effect and individual correspondence that a person checks and sends are not "published" and do not trigger the deployer duties of paragraph 4 (Commission guidelines C(2026) 5054, point 131).`,
    p3: '3 · Provider evidence (standing, per tool)', p3src: [['aiAct', 'Art. 50 (1) and (2); Art. 111 (4), inserted by Regulation (EU) 2026/1744'], ['guide', 'point 153']],
    p3cols: ['Tool', 'Notice of interaction with AI (para. 1): source, date', 'Machine-readable marking of outputs (para. 2): source, date', 'Checked on'],
    p3note: 'Paragraphs 1 and 2 address the provider; the business records what the provider says and claims nothing itself. For generative systems placed on the market before 2 August 2026 the provider has until 2 December 2026 for paragraph 2; the notice under paragraph 1 applies since 2 August 2026. Until 2 December 2026 enter "no statement" in the column for paragraph 2 where the provider says nothing, and set a review date after 2 December 2026.',
    p4: '4 · Chatbot or voice assistant (per system)', p4src: [['aiAct', 'Art. 50 (1) and (5)'], ['guide', 'point 38']],
    p4items: [
      { c: 'Notice text that one is interacting with an AI system', f: ['Wording'] },
      { c: 'Place of the notice: before the first answer in the chat window / audible at the start of the call', f: ['Where'] },
      'Checked that the provider\'s notice appears before the first answer; a notice only in terms and conditions, URLs or documentation, or a generic label such as "assistant", does not suffice on its own (Commission guidelines C(2026) 5054, point 38)',
      { c: 'Screenshot or recording filed', f: ['Date'] },
    ],
    p5: '5 · Deepfake check (per image, audio or video)', p5src: [['aiAct', 'Art. 3 (60); Art. 50 (4) first subparagraph and (5)'], ['guide', 'points 113 and 119 to 123']],
    p5items: [
      { f: ['Content (name, place of publication)'] },
      { c: 'Does the content resemble real or plausibly real persons, objects, places, entities or events (invented but realistic people or scenes count), and could a person take it for genuine? Deep fake: yes / no', f: ['One sentence of reasoning'] },
      { c: 'If yes: disclosure that the content was artificially generated or manipulated, visible or audible, with placement and date', f: ['How, where, when'] },
      { c: 'Evidently artistic, creative, satirical or fictional work: the duty is reduced, not removed; the AI origin is still disclosed in a way that does not hamper the work. Interpretation: advertising rarely qualifies; case by case.', f: ['Reasoning (or "not claimed")'] },
    ],
    copy: 'Copy this block for each image, audio, video or text; in the DOCX the block is ready to copy.',
    p6: '6 · Text check (per publication)', p6src: [['aiAct', 'Art. 50 (4) second subparagraph'], ['guide', 'point 131']],
    p6items: [
      { f: ['Text (title, place of publication)', 'Generated on', 'Published on'] },
      'Publicly accessible (website, blog, social media, open mailing list)? yes / no',
      'Does the text inform the public on matters of public interest (indications: law, health, safety, environment, subsidies; not: advertising and product texts without claims on health, consumer safety or sustainability; product texts with such claims, for example on electrical safety, count as covered; mixed texts in doubt as covered)? yes / no',
      { c: 'Both yes: either disclosure', f: ['Wording, place'] },
      { c: 'or exception: human review or editorial control; no change by AI after the review; editorial responsibility held by a named person or the business', f: ['Reviewed by (name, kind of review, date)', 'Editorial responsibility (person or business; where publicly named, e.g. legal notice)'] },
    ],
    p7: '7 · Timing and form (per case)', p7src: [['aiAct', 'Art. 50 (5)']],
    p7items: ['The information is provided at the latest at the time of the first interaction or exposure, in a clear and distinguishable manner.', { c: 'It meets the applicable accessibility requirements', f: ['How checked (to be verified)'] }],
    p8: '8 · Key dates (per content)', p8src: [['aiAct', 'Art. 5 (1), first subparagraph, points (ba) and (bb); Art. 113'], ['guide', 'point 154']],
    p8items: [
      'Article 50 applies since 2 August 2026. There is no transition period for the business as deployer.',
      { c: 'According to the guidelines, content generated before 2 August 2026 need not be labelled retroactively; text generated before but published on or after that date must be labelled: check against the original.', f: ['Content generated on', 'Published on'] },
      'From 2 December 2026 it is also prohibited to use an AI system that generates or manipulates realistic images, videos, audio or similar material of an identifiable natural person\'s intimate parts, or of an identifiable natural person engaged in sexually explicit activities, without that person\'s freely given, specific, informed, unambiguous and explicit consent (Art. 5(1)(ba)); the same applies to AI systems that generate child sexual abuse material (point (bb)).',
    ],
    p9: '9 · Delimitation', p9src: [['aiAct', 'Art. 50 (6)'], ['guide', 'points 127 to 129']],
    p9a: 'Paragraphs 1 to 4 leave Chapter III and other transparency obligations for deployers in Union or national law unaffected (Art. 50 (6)). The guidelines add that a label does not make a deep fake lawful: data protection law, trademark and copyright law, personality rights and the rules against misleading advertising continue to apply.',
    authority: {
      AT: (d) => ({ c: `Austria: no market surveillance authority designated as of ${d} (handbook 7.1).`, f: ['Check again on'] }),
      DE: (d) => `Germany: Federal Network Agency (Bundesnetzagentur) under § 2 (1) KI-MIG (handbook 7.2, as of ${d}).`,
      EU: () => ({ c: 'Authority and sanctions in the own member state: to be checked. This checklist names none.', f: ['Checked on'] }),
    },
    review: 'Review: on every new publication and once a year, and when a tool is added or a provider changes its terms.',
    sign: 'Date, signature of the person responsible for labelling',
  },
  de: {
    title: 'Kennzeichnungs-Checkliste nach Artikel 50 KI-Verordnung', shortTitle: 'Kennzeichnungs-Checkliste',
    basis: (d) => `Rechtsgrundlage: Artikel 50 der Verordnung (EU) 2024/1689 (KI-Verordnung), anwendbar seit 2. August 2026 (Art. 113). Dieses Blatt ordnet ein; es stellt keine Betroffenheit fest und nennt keine Strafe. Die Punkte 1 bis 3 gelten einmal je Betrieb mit Wiedervorlage; die Punkte 4 bis 9 je System oder je Veröffentlichung. Der Wortlaut ist an der konsolidierten Fassung vom 27. Juli 2026 gelesen (EUR-Lex, abgerufen am ${d}); bei jeder Wiedervorlage auf spätere Änderungen prüfen.`,
    fBusiness: 'Betrieb', fResp: 'Verantwortlich für Kennzeichnung (§ 7 der Richtlinie)', fDate: 'Datum',
    p1: '1 · Rollenklärung (Bestand)', p1src: [['aiAct', 'Art. 3 Nr. 3 und 4, Art. 25 und Anhang III']],
    p1a: (tools) => `Für jedes Tool im Register festgehalten: Anbieter (Name, Produkt). Der Betrieb ist Betreiber, weil er das System in eigener Verantwortung verwendet (Art. 3 Nr. 4); Beschäftigte, die auf Weisung handeln, sind keine eigenen Betreiber. Tools im Register: ${tools}.`,
    p1b: (who) => `Über Einsatz und Nutzung entscheidet im Betrieb: ${who}.`,
    p1c: 'Kein Tool wird unter eigenem Namen an andere abgegeben, und keines wird für einen Hochrisiko-Zweck nach Anhang III eingesetzt. Trifft eines zu, kann der Betrieb Anbieter werden (Art. 3 Nr. 3, Art. 25); Fachperson fragen.',
    p2: '2 · Inventar der Einsatzarten (Bestand)', p2src: [['aiAct', 'Art. 50 Abs. 1, 3 und 4']],
    cases: ['Ein KI-System spricht direkt mit Kunden oder anderen Personen (Chat, Sprache, Avatar): Art. 50 Abs. 1', 'Der Betrieb erzeugt oder verändert mit KI Bild, Ton oder Video, das veröffentlicht wird: Art. 50 Abs. 4 Unterabsatz 1', 'Der Betrieb veröffentlicht KI-erzeugten oder KI-veränderten Text: Art. 50 Abs. 4 Unterabsatz 2', 'Der Betrieb setzt Emotionserkennung oder biometrische Kategorisierung ein: Art. 50 Abs. 3'],
    yes: 'ja', no: 'nein', unsure: 'ja, Umfang unsicher',
    noCase: (d) => `Viermal nein: Die Punkte 4 bis 9 entfallen derzeit. Datum: ${d}. Blatt ablegen; die Wiedervorlage steht im Plan der Inkraftsetzung. Auslegung: Interne Nutzung ohne Außenwirkung und Einzelkorrespondenz, die eine Person prüft und selbst versendet, sind nicht „veröffentlicht“ und lösen die Betreiberpflichten nach Absatz 4 nicht aus (Leitlinien C(2026) 5054, Rn. 131).`,
    p3: '3 · Anbieternachweis (Bestand, je Tool)', p3src: [['aiAct', 'Art. 50 Abs. 1 und 2; Art. 111 Abs. 4, eingefügt durch Verordnung (EU) 2026/1744'], ['guide', 'Rn. 153']],
    p3cols: ['Tool', 'Hinweis auf die Interaktion mit KI (Abs. 1): Fundstelle, Datum', 'Maschinenlesbare Kennzeichnung der Ausgaben (Abs. 2): Fundstelle, Datum', 'Geprüft am'],
    p3note: 'Abs. 1 und 2 richten sich an den Anbieter; der Betrieb hält fest, was der Anbieter dazu sagt, und behauptet nichts selbst. Für generative Systeme, die vor dem 2. August 2026 in Verkehr gebracht wurden, hat der Anbieter für Abs. 2 bis zum 2. Dezember 2026 Zeit; der Hinweis nach Abs. 1 gilt seit dem 2. August 2026. Bis zum 2. Dezember 2026 in der Spalte zu Abs. 2 „keine Angabe“ eintragen, wenn der Anbieter nichts sagt, und eine Wiedervorlage nach dem 2. Dezember 2026 setzen.',
    p4: '4 · Chatbot oder Sprachassistent (je System)', p4src: [['aiAct', 'Art. 50 Abs. 1 und 5'], ['guide', 'Rn. 38']],
    p4items: [
      { c: 'Hinweistext, dass man mit einem KI-System interagiert', f: ['Wortlaut'] },
      { c: 'Ort des Hinweises: vor der ersten Antwort im Chatfenster / hörbar am Gesprächsanfang', f: ['Wo'] },
      'Geprüft, dass der Hinweis des Anbieters vor der ersten Antwort erscheint; ein Hinweis nur in Geschäftsbedingungen, über Links oder in Dokumentationen, oder eine allgemeine Bezeichnung wie „Assistent“, genügt allein nicht (Leitlinien C(2026) 5054, Rn. 38)',
      { c: 'Bildschirmfoto oder Aufzeichnung abgelegt', f: ['Datum'] },
    ],
    p5: '5 · Deepfake-Prüfung (je Bild, Ton oder Video)', p5src: [['aiAct', 'Art. 3 Nr. 60; Art. 50 Abs. 4 Unterabsatz 1 und Abs. 5'], ['guide', 'Rn. 113 und 119 bis 123']],
    p5items: [
      { f: ['Inhalt (Bezeichnung, Ort der Veröffentlichung)'] },
      { c: 'Ähnelt der Inhalt wirklichen oder plausibel wirklichen Personen, Gegenständen, Orten, Einrichtungen oder Ereignissen (erfundene, aber realistische Personen oder Szenen zählen mit), und könnte eine Person ihn für echt halten? Deepfake: ja / nein', f: ['Begründung in einem Satz'] },
      { c: 'Bei ja: Offenlegung, dass der Inhalt künstlich erzeugt oder manipuliert wurde, sichtbar oder hörbar, mit Platzierung und Datum', f: ['Wie, wo, wann'] },
      { c: 'Offensichtlich künstlerisches, kreatives, satirisches oder fiktionales Werk: Die Pflicht ist abgeschwächt, nicht aufgehoben; der KI-Ursprung wird weiterhin offengelegt, ohne das Werk zu stören. Auslegung: Werbung fällt selten darunter; Einzelfall.', f: ['Begründung (oder „nicht beansprucht“)'] },
    ],
    copy: 'Diesen Block je Bild, Ton, Video oder Text kopieren; im DOCX ist er dafür vorbereitet.',
    p6: '6 · Textprüfung (je Veröffentlichung)', p6src: [['aiAct', 'Art. 50 Abs. 4 Unterabsatz 2'], ['guide', 'Rn. 131']],
    p6items: [
      { f: ['Text (Titel, Ort der Veröffentlichung)', 'Erzeugt am', 'Veröffentlicht am'] },
      'Öffentlich zugänglich (Website, Blog, soziale Medien, offener Verteiler)? ja / nein',
      'Informiert der Text die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse (Anhaltspunkte: Recht, Gesundheit, Sicherheit, Umwelt, Förderungen; nicht: Werbe- und Produkttexte ohne Aussagen zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit; Produkttexte mit solchen Aussagen, etwa zur elektrischen Sicherheit, gelten als erfasst; Mischtexte im Zweifel wie erfasste behandeln)? ja / nein',
      { c: 'Beides ja: entweder Offenlegung', f: ['Wortlaut, Ort'] },
      { c: 'oder Ausnahme: menschliche Überprüfung oder redaktionelle Kontrolle; nach der Prüfung keine Änderung durch KI; redaktionelle Verantwortung trägt eine benannte Person oder der Betrieb', f: ['Geprüft von (Name, Art der Prüfung, Datum)', 'Redaktionelle Verantwortung (Person oder Betrieb; wo öffentlich benannt, z. B. Impressum)'] },
    ],
    p7: '7 · Zeitpunkt und Form (je Fall)', p7src: [['aiAct', 'Art. 50 Abs. 5']],
    p7items: ['Die Information wird spätestens zum Zeitpunkt der ersten Interaktion oder Aussetzung in klarer und eindeutiger Weise bereitgestellt.', { c: 'Sie entspricht den geltenden Barrierefreiheitsanforderungen', f: ['Wie geprüft (Stand prüfen)'] }],
    p8: '8 · Stichtage (je Inhalt)', p8src: [['aiAct', 'Art. 5 Abs. 1 Unterabs. 1 Buchst. ba und bb; Art. 113'], ['guide', 'Rn. 154']],
    p8items: [
      'Artikel 50 gilt seit dem 2. August 2026. Für den Betrieb als Betreiber gibt es keine Übergangsfrist.',
      { c: 'Nach den Leitlinien müssen vor dem 2. August 2026 erzeugte Inhalte nicht nachträglich gekennzeichnet werden; ein vorher erzeugter, aber an oder nach diesem Tag veröffentlichter Text schon: am Original prüfen.', f: ['Inhalt erzeugt am', 'Veröffentlicht am'] },
      'Ab dem 2. Dezember 2026 ist außerdem die Verwendung eines KI-Systems verboten, das realistische Bild-, Video-, Ton- oder ähnliche Inhalte erzeugt oder manipuliert, in denen intime Körperteile einer bestimmbaren natürlichen Person oder eine an eindeutig sexuellen Handlungen beteiligte bestimmbare Person dargestellt werden, ohne deren aus freien Stücken erfolgende, spezifische, aufgeklärte, eindeutige und ausdrückliche Zustimmung (Art. 5 Abs. 1 Buchst. ba); dasselbe gilt für KI-Systeme, die Material über sexuellen Kindesmissbrauch erzeugen (Buchst. bb).',
    ],
    p9: '9 · Abgrenzung', p9src: [['aiAct', 'Art. 50 Abs. 6'], ['guide', 'Rn. 127 bis 129']],
    p9a: 'Die Absätze 1 bis 4 lassen Kapitel III und andere Transparenzpflichten für Betreiber im Unions- oder nationalen Recht unberührt (Art. 50 Abs. 6). Die Leitlinien ergänzen, dass eine Kennzeichnung einen Deepfake nicht rechtmäßig macht: Datenschutzrecht, Marken- und Urheberrecht, Persönlichkeitsrechte und die Regeln gegen irreführende Werbung gelten weiter.',
    authority: {
      AT: (d) => ({ c: `Österreich: Marktüberwachungsbehörde nach Stand ${d} nicht benannt (Handbuch 7.1).`, f: ['Erneut prüfen am'] }),
      DE: (d) => `Deutschland: Bundesnetzagentur nach § 2 Abs. 1 KI-MIG (Handbuch 7.2, Stand ${d}).`,
      EU: () => ({ c: 'Behörde und Sanktionen im eigenen Mitgliedstaat: Stand prüfen. Diese Checkliste nennt keine.', f: ['Geprüft am'] }),
    },
    review: 'Wiedervorlage: bei jeder neuen Veröffentlichung und einmal im Jahr, dazu wenn ein Tool hinzukommt oder ein Anbieter seine Bedingungen ändert.',
    sign: 'Datum, Unterschrift der für die Kennzeichnung verantwortlichen Person',
  },
};

export function labellingCases(answers, lang) {
  const t = T[lang] ?? T.en;
  const g3 = answers.G3?.value;
  return [
    { yes: answers.G1?.value === 'yes', word: answers.G1?.value === 'yes' ? t.yes : t.no },
    { yes: answers.G2?.value === 'yes', word: answers.G2?.value === 'yes' ? t.yes : t.no },
    { yes: g3 && g3 !== 'no', word: g3 === 'no' || !g3 ? t.no : g3 === 'unsure' ? t.unsure : t.yes },
    { yes: answers.G4?.value === 'yes', word: answers.G4?.value === 'yes' ? t.yes : t.no },
  ];
}

// Lines to tick and field lines to write on, in the order of the items.
function itemBlocks(items) {
  const out = [];
  let ticks = [];
  const flush = () => { if (ticks.length) { out.push(B.checks(ticks)); ticks = []; } };
  for (const it of items) {
    if (typeof it === 'string') { ticks.push(it); continue; }
    if (it.c) ticks.push(it.c);
    if (it.f) { flush(); out.push(B.fields(it.f.map((label) => ({ label, value: LINE })))); }
  }
  flush();
  return out;
}

export function labellingDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const today = fmtDate(ctx.today ?? new Date().toISOString().slice(0, 10), lang);
  const retrieved = fmtDate(RETRIEVED, lang);
  const src = (parts) => B.note(sourceLine(lang, parts));
  const tools = registerRows(def, answers, lang);
  const toolNames = tools.map((x) => x.name ? `${x.kindLabel} (${x.name})` : x.kindLabel).join(', ') || '…';
  const cases = labellingCases(answers, lang);
  const anyCase = cases.some((c) => c.yes);
  const blocks = [
    B.note(t.basis(retrieved)),
    B.fields([{ label: t.fBusiness, value: business }, { label: t.fResp, value: A('A6').text }, { label: t.fDate, value: today }]),
    B.h(t.p1), src(t.p1src), B.checks([t.p1a(toolNames), t.p1b(A('A6').text), t.p1c]),
    B.h(t.p2), src(t.p2src),
    B.table(null, t.cases.map((c, i) => [c, cases[i].word]), [80, 20]),
    ...(anyCase ? [] : [B.p(t.noCase(today))]),
    B.h(t.p3), src(t.p3src),
    B.table(t.p3cols, (tools.length ? tools : [{ kindLabel: '…', name: '' }]).map((x) => [x.name ? `${x.kindLabel} (${x.name})` : x.kindLabel, '', '', '']), [25, 30, 30, 15]),
    B.note(t.p3note),
  ];
  const section = (title, parts, items, copy) => { blocks.push(B.h(title), src(parts), ...itemBlocks(items)); if (copy) blocks.push(B.note(t.copy)); };
  if (cases[0].yes) section(t.p4, t.p4src, t.p4items);
  if (cases[1].yes) section(t.p5, t.p5src, t.p5items, true);
  if (cases[2].yes) section(t.p6, t.p6src, t.p6items, true);
  if (anyCase) {
    section(t.p7, t.p7src, t.p7items);
    section(t.p8, t.p8src, t.p8items);
    const country = t.authority[A('A2').value] ?? t.authority.EU;
    section(t.p9, t.p9src, [t.p9a, country(retrieved)]);
  }
  blocks.push(B.p(t.review));
  blocks.push(B.sign([t.sign]));
  // Four pages: slightly tighter margins keep the signature with the last section (the German text is longer).
  return makeDoc({ id: 'labelling', lang, cls: 'pg--labelling', title: t.title, business, runLeft: `${business} · ${t.shortTitle}`, runRight: today, blocks, footerRight: business, printCss: '@page { size: A4; margin: 16mm 18mm 17mm 18mm; } .pg--labelling .pg__sign { margin-top: 20px; }' });
}
