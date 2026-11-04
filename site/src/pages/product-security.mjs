// The texts of the product page of the Security Evidence Toolkit (toolkit 2). English first, German in the same file.
// The price comes from the configuration (E21: like toolkit 1); the page shows the price box of product.mjs.
export const SECURITY_SAMPLES = {
  en: [
    { label: 'Security self-declaration', file: 'sample-d1-self-declaration-en.pdf', code: 'D1', meta: 'Page 1 of 3' },
    { label: 'Emergency card', file: 'sample-d3-emergency-card-en.pdf', code: 'D3', meta: '1 page' },
    { label: 'Cover letter and questionnaire mapping', file: 'sample-d5-cover-letter-en.pdf', code: 'D5', meta: 'Page 1 of 3' },
    { label: 'Evidence summary', file: 'sample-d7-evidence-summary-en.pdf', code: 'D7', meta: '1 page' },
    { label: 'Handbook', code: 'HB', meta: '4 of 37 pages' },
  ],
  de: [
    { label: 'Selbstauskunft Informationssicherheit', file: 'leseprobe-d1-selbstauskunft-de.pdf', code: 'D1', meta: 'Seite 1 von 3' },
    { label: 'Notfallkarte', file: 'leseprobe-d3-notfallkarte-de.pdf', code: 'D3', meta: '1 Seite' },
    { label: 'Antwortschreiben mit Fragebogen-Abgleich', file: 'leseprobe-d5-antwortschreiben-de.pdf', code: 'D5', meta: 'Seite 1 von 3' },
    { label: 'Nachweisseite', file: 'leseprobe-d7-nachweisseite-de.pdf', code: 'D7', meta: '1 Seite' },
    { label: 'Handbuch', code: 'HB', meta: '4 von 40 Seiten' },
  ],
};

export const SECURITY_TEXTS = {
  en: {
    kicker: 'Toolkit 02 · Available now',
    title: 'Security Evidence Toolkit',
    lead: 'Forty-seven questions, 40 of them required: the security questionnaire from your major customer or insurer, answered honestly. A dated self-declaration, an action plan with dates, an emergency card, an evidence list, a cover letter and a clause checklist for your business. Start with your business, or look at the example business first. Generated from your answers, sourced and dated.',
    description: 'Security self-declaration, action plan, emergency card, evidence list, cover letter and clause checklist for businesses without an IT department. Generated from forty-seven questions, 40 of them required, sourced and dated.',
    docs: [
      ['D1', 'Security self-declaration', 'Nine sections from your answers, among them: organisation, access and identity, backup and continuity, updates and devices, incidents and reporting, people, providers, evidence. Four honest answers per field: in place, partly, not yet with a date, not applicable. Signed by the management; the document you attach to a questionnaire.', 'PDF · DOCX'],
      ['D2', 'Action plan', 'Every "partly" and "not yet" as a measure with priority, responsible person, target date in one of three waves and the evidence that exists afterwards; technical measures together with your IT provider. With a review sheet.', 'XLSX · PDF · DOCX'],
      ['D3', 'Emergency card', 'One page for the wall and the drawer: the first hour, whom to call, the deadlines, where the backup and the account list are. Contacts for Austria checked at the originals; for Germany the BSI Service-Center and the police numbers, with the ZAC and the data protection authority of your federal state to fill in.', 'PDF · DOCX'],
      ['D4', 'Evidence list', 'Per question the proof a customer or insurer accepts, whether it exists, where it is, its attachment number. What is missing carries a date and a sentence on how it arises.', 'XLSX · PDF · DOCX'],
      ['D5', 'Cover letter and questionnaire mapping', 'The letter to the customer or insurer that names the gaps with their dates, and the table that maps eighteen typical questions and the ten areas of Article 21(2) of the NIS 2 Directive to the sections of your self-declaration.', 'PDF · DOCX'],
      ['D6', 'Clause checklist', 'The security clauses customers write into contracts: where each comes from, what it means, what a small business can promise and what to negotiate, with your position from your answers. Financial customers under DORA on a second sheet.', 'PDF · DOCX'],
      ['D7', 'Evidence summary', 'One page, dated, with a document number: per area what is in place, partly there or open, the documents, the deadlines, a signature line. Open items are listed, not hidden.', 'PDF'],
      ['HB', 'Handbook', 'Thirty-seven pages: why every question is asked, which source stands behind it, what a small business can honestly show. Every statement marked as fact, interpretation, uncertain or gap, every source with retrieval date.', 'PDF · online'],
    ],
    steps: [
      ['Answer forty-seven questions', 'Start with your business, or look at the example business first. Every question names the handbook section that explains it. Stop and come back any time.'],
      ['Download seven dated documents', 'Preview in the browser, PDF for filing, DOCX and XLSX for editing, all as one ZIP. Change an answer and the documents follow.'],
      ['Send, post, keep', 'Attach the self-declaration and the cover letter to the questionnaire, post the emergency card, work through the first wave of the plan, freeze a version in your evidence folder. Review once a year or when the next questionnaire arrives.'],
    ],
    honest: [
      'It is not legal advice, not an audit and not a certificate, and no document claims that your business is secure or complies with a law. The documents show what you have in place on a given date, what you will do by when, and who answers for it.',
      'Every statement that matters carries a marker. Fact: read at the original source, with retrieval date. Interpretation: our conclusion, open to argument. Uncertain: sources contradict each other or the law is open. Gap: no source answers it, so you decide and the field stays open on purpose.',
      'Every uncertainty is listed with its status: twenty-three points as of 23 October 2026, of which thirteen remain open, in section 6 of the handbook.',
      'Sources: the NIS 2 Directive and the Commission\'s Implementing Regulation 2024/2690 in English and German, DORA, the GDPR, the Cyber Resilience Act, the Austrian NISG 2026 with its regulation of 1 October 2026, the German BSI Act; the forms of six cyber insurers, the Austrian label, the BSI CyberRisikoCheck, VdS 10000, ENISA, NIST and CISA. Country notes for Austria and Germany; other member states are marked as a gap.',
    ],
    samplesText: 'One page from each of four documents of the fictional example business, an electrical contractor with ten to forty-nine staff in Austria whose customer has sent a questionnaire, plus four pages from the handbook. No real person appears in them.',
    faq: [
      ['Who is it for?', 'Businesses with up to about fifty staff without an IT or legal department, anywhere in the EU, that are asked for security evidence: by a larger customer, a contract, an insurer or a label. The generator asks for your country and the handbook has notes for Austria and Germany.'],
      ['My customer sent a questionnaire with its own questions. Does this answer it?', 'Mostly. Questionnaires ask the same things in different words. The self-declaration follows the ten areas of Article 21(2) of the NIS 2 Directive (EUR-Lex, retrieved 2026-10-23), which customers covered by it often use to structure their questionnaires, and the mapping in D5 shows which section answers which typical question. What your customer asks beyond that, you answer with the same four honest levels.'],
      ['What if the honest answer is "not yet"?', 'Then you say so, with a date. "Not yet, by the end of the quarter, responsible: the office manager with the IT provider" is a complete answer; the handbook explains why the law that covers your customer expects exactly that of the customer itself. The action plan carries the date, the cover letter names it.'],
      ['Does it give us a certificate or a label?', 'No. It gives you a self-declaration with evidence, which is what most customers and insurers ask for first. If someone wants an external check, the handbook says which one fits a small business: the CyberRisikoCheck in Germany, the Standard label in Austria, and why ISO 27001 is rarely the first step.'],
      ['Do I need my IT provider?', 'For the technical measures, yes: multi-factor authentication, backups, updates, the router. The action plan marks these and names the provider next to you. The organisational measures, the rules, the lists and the emergency card, you do yourself.'],
      ['What happens when the law or a questionnaire changes?', 'We update the templates and the handbook during your licence. Your evidence folder shows which frozen versions predate an update, so you know what to redo.'],
      ['What do you store about me?', 'Your email address, your answers and the runs of the generator. The generator never asks for passwords, access data or IP addresses. Names and phone numbers appear only where you enter them for the cover letter and the emergency card: the contact person, the signatory, the IT provider and the recipient; incidents appear only as a level. No tracking cookies; page views are counted without any personal data.'],
    ],
    ctaH: 'Ready when you are', ctaText: 'Start with your business or look at the example first; the dated set of documents is ready as soon as you finish.',
  },
  de: {
    kicker: 'Toolkit 02 · Jetzt erhältlich',
    title: 'Sicherheitsnachweis-Toolkit',
    lead: 'Siebenundvierzig Fragen, davon 40 Pflichtfragen: der Sicherheitsfragebogen Ihres Großkunden oder Versicherers, ehrlich beantwortet. Eine datierte Selbstauskunft, ein Maßnahmenplan mit Terminen, eine Notfallkarte, eine Nachweisliste, ein Antwortschreiben und eine Klausel-Prüfliste für Ihren Betrieb. Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst den Beispielbetrieb an. Aus Ihren Antworten erzeugt, belegt und datiert.',
    description: 'Selbstauskunft Informationssicherheit, Maßnahmenplan, Notfallkarte, Nachweisliste, Antwortschreiben und Klausel-Prüfliste für Betriebe ohne IT-Abteilung. Aus siebenundvierzig Fragen, davon 40 Pflichtfragen, erzeugt, belegt und datiert.',
    docs: [
      ['D1', 'Selbstauskunft Informationssicherheit', 'Neun Abschnitte aus Ihren Antworten, darunter: Organisation, Zugang und Identität, Sicherung und Wiederanlauf, Updates und Geräte, Vorfälle und Meldung, Personal, Dienstleister, Nachweise. Vier ehrliche Antworten je Feld: vorhanden, teilweise, noch nicht mit Termin, nicht anwendbar. Von der Leitung unterschrieben; das Dokument, das Sie dem Fragebogen beilegen.', 'PDF · DOCX'],
      ['D2', 'Maßnahmenplan', 'Jedes „teilweise“ und „noch nicht“ als Maßnahme mit Priorität, Verantwortlichen, Termin in einer von drei Wellen und dem Nachweis, der danach vorliegt; technische Maßnahmen gemeinsam mit Ihrer IT-Betreuung. Mit Blatt Wiedervorlage.', 'XLSX · PDF · DOCX'],
      ['D3', 'Notfallkarte', 'Eine Seite für die Wand und die Lade: die erste Stunde, wen anrufen, die Fristen, wo Sicherung und Kontenliste liegen. Kontakte für Österreich am Original geprüft; für Deutschland BSI Service-Center und Polizeinotruf, ZAC und Landesdatenschutzbehörde Ihres Bundeslands tragen Sie ein.', 'PDF · DOCX'],
      ['D4', 'Nachweisliste', 'Je Frage der Beleg, den Kunde oder Versicherer annehmen, ob er vorliegt, wo er liegt, seine Anlagennummer. Was fehlt, trägt einen Termin und einen Satz, wie es entsteht.', 'XLSX · PDF · DOCX'],
      ['D5', 'Antwortschreiben und Fragebogen-Abgleich', 'Der Brief an den Kunden oder Versicherer, der die Lücken mit Terminen nennt, und die Tabelle, die achtzehn typische Fragen und die zehn Bereiche des Art. 21 Abs. 2 der NIS-2-Richtlinie den Abschnitten Ihrer Selbstauskunft zuordnet.', 'PDF · DOCX'],
      ['D6', 'Klausel-Prüfliste', 'Die Sicherheitsklauseln, die Kunden in Verträge schreiben: woher jede kommt, was sie bedeutet, was ein kleiner Betrieb zusagen kann, was zu verhandeln ist, mit Ihrer Lage aus den Antworten. Finanzkunden unter DORA auf einem zweiten Blatt.', 'PDF · DOCX'],
      ['D7', 'Nachweisseite', 'Eine Seite, datiert, mit Dokumentnummer: je Bereich, was vorhanden, teilweise da oder offen ist, die Dokumente, die Fristen, eine Unterschriftszeile. Offene Punkte werden aufgeführt, nicht versteckt.', 'PDF'],
      ['HB', 'Handbuch', 'Vierzig Seiten: warum jede Frage gestellt wird, welche Quelle dahintersteht, was ein kleiner Betrieb ehrlich vorweisen kann. Jede Aussage als Fakt, Auslegung, Unsicher oder Lücke markiert, jede Quelle mit Abrufdatum.', 'PDF · online'],
    ],
    steps: [
      ['Siebenundvierzig Fragen beantworten', 'Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst den Beispielbetrieb an. Jede Frage nennt den Handbuchabschnitt, der sie erklärt. Sie können jederzeit unterbrechen und zurückkommen.'],
      ['Sieben datierte Dokumente herunterladen', 'Vorschau im Browser, PDF zum Ablegen, DOCX und XLSX zum Bearbeiten, alles als ein ZIP. Ändern Sie eine Antwort, die Dokumente folgen.'],
      ['Senden, aushängen, pflegen', 'Selbstauskunft und Antwortschreiben dem Fragebogen beilegen, die Notfallkarte aushängen, die erste Welle des Plans abarbeiten, eine Fassung im Nachweisordner einfrieren. Einmal im Jahr überprüfen oder wenn der nächste Fragebogen kommt.'],
    ],
    honest: [
      'Es ist keine Rechtsberatung, kein Audit und kein Zertifikat, und kein Dokument behauptet, dass Ihr Betrieb sicher ist oder ein Gesetz erfüllt. Die Dokumente zeigen, was Sie an einem Datum vorweisen können, was Sie bis wann tun werden und wer dafür einsteht.',
      'Jede Aussage, auf die es ankommt, trägt einen Marker. Fakt: am Original gelesen, mit Abrufdatum. Auslegung: unsere Schlussfolgerung, über die sich streiten lässt. Unsicher: Quellen widersprechen sich oder die Rechtslage ist offen. Lücke: keine Quelle beantwortet die Frage, Sie entscheiden, und das Feld bleibt absichtlich offen.',
      'Jede Unsicherheit wird mit ihrem Stand aufgeführt: dreiundzwanzig Punkte zum Stand 23. Oktober 2026, davon dreizehn offen, in Abschnitt 6 des Handbuchs.',
      'Quellen: die NIS-2-Richtlinie und die Durchführungsverordnung 2024/2690 der Kommission auf Englisch und Deutsch, DORA, die DSGVO, der Cyber Resilience Act, das österreichische NISG 2026 mit seiner Verordnung vom 1. Oktober 2026, das deutsche BSI-Gesetz; die Formulare von sechs Cyberversicherern, das österreichische Gütesiegel, der CyberRisikoCheck des BSI, VdS 10000, ENISA, NIST und CISA. Ländernotizen für Österreich und Deutschland; andere Mitgliedstaaten sind als Lücke markiert.',
    ],
    samplesText: 'Je eine Seite aus vier Dokumenten des erfundenen Beispielbetriebs, ein Elektrotechnikbetrieb mit zehn bis neunundvierzig Beschäftigten in Österreich, dessen Kunde einen Fragebogen geschickt hat, dazu vier Seiten aus dem Handbuch. Keine echte Person kommt darin vor.',
    faq: [
      ['Für wen ist es gedacht?', 'Für Betriebe mit bis zu etwa fünfzig Beschäftigten ohne IT- oder Rechtsabteilung, überall in der EU, die nach einem Sicherheitsnachweis gefragt werden: von einem größeren Kunden, einem Vertrag, einem Versicherer oder einem Gütesiegel. Der Generator fragt nach Ihrem Land, und das Handbuch hat Notizen für Österreich und Deutschland.'],
      ['Mein Kunde hat einen Fragebogen mit eigenen Fragen geschickt. Beantwortet das Toolkit ihn?', 'Zum größten Teil. Fragebögen fragen dasselbe in anderen Worten. Die Selbstauskunft folgt den zehn Bereichen des Art. 21 Abs. 2 der NIS-2-Richtlinie (EUR-Lex, Abruf 2026-10-23), an denen erfasste Kunden ihre Fragebögen häufig ausrichten, und der Abgleich in D5 zeigt, welcher Abschnitt welche typische Frage beantwortet. Was Ihr Kunde darüber hinaus fragt, beantworten Sie mit denselben vier ehrlichen Stufen.'],
      ['Was, wenn die ehrliche Antwort „noch nicht“ ist?', 'Dann sagen Sie es, mit Termin. „Noch nicht, bis Ende des Quartals, verantwortlich: die Büroleitung mit dem IT-Dienstleister“ ist eine vollständige Antwort; das Handbuch erklärt, warum das Gesetz, das Ihren Kunden erfasst, genau das vom Kunden selbst verlangt. Der Maßnahmenplan trägt den Termin, das Antwortschreiben nennt ihn.'],
      ['Bekommen wir damit ein Zertifikat oder ein Gütesiegel?', 'Nein. Sie bekommen eine Selbstauskunft mit Nachweisen, und das ist, was die meisten Kunden und Versicherer zuerst verlangen. Will jemand eine externe Prüfung, sagt das Handbuch, welche zu einem kleinen Betrieb passt: in Deutschland der CyberRisikoCheck, in Österreich das Label Standard, und warum ISO 27001 selten der erste Schritt ist.'],
      ['Brauche ich meine IT-Betreuung?', 'Für die technischen Maßnahmen ja: Multi-Faktor-Authentifizierung, Sicherung, Updates, der Router. Der Maßnahmenplan markiert sie und nennt die Betreuung neben Ihnen. Die organisatorischen Maßnahmen, die Regeln, die Listen und die Notfallkarte machen Sie selbst.'],
      ['Was passiert, wenn sich das Recht oder ein Fragebogen ändert?', 'Wir aktualisieren Vorlagen und Handbuch während Ihrer Lizenz. Ihr Nachweisordner zeigt, welche eingefrorenen Fassungen älter sind als eine Aktualisierung, damit Sie wissen, was neu zu machen ist.'],
      ['Was speichern Sie über mich?', 'Ihre E-Mail-Adresse, Ihre Antworten und die Läufe des Generators. Der Generator fragt nie nach Passwörtern, Zugangsdaten oder IP-Adressen. Namen und Telefonnummern stehen nur dort, wo Sie sie für das Antwortschreiben und die Notfallkarte eintragen: Ansprechperson, unterzeichnende Person, IT-Dienstleister und Empfänger; Vorfälle kommen nur als Stufe vor. Keine Tracking-Cookies; Seitenaufrufe werden ohne Personenbezug gezählt.'],
    ],
    ctaH: 'Wenn Sie so weit sind', ctaText: 'Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst das Beispiel an; der datierte Dokumentensatz steht bereit, sobald Sie fertig sind.',
  },
};
