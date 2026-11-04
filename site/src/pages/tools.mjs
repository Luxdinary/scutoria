// The free mini tools (E11): "May this go in?" and "Is there anything personal in it?". Both run in the browser and send nothing.
// The scripts make no network calls; the page's policy additionally blocks connections and form posts.
import { p, t } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { PRODUCTS } from '../shop/products.mjs';
import { handbookPathOf } from './product.mjs';
import { MEMOS } from '../memos/index.mjs';
import { previewIn, previewPersonal } from './previews.mjs';

// The policy of the tool pages: no connections, no form posting, nothing from third parties. Own images, scripts and styles still load.
export const TOOLS_CSP = "default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'";

const T = {
  en: {
    index: {
      title: 'Tools', description: 'Two tools for staff who use AI at work: a traffic light before you paste something, and a check for personal data in a text. Both run in your browser and send nothing.', example: 'Example',
      lead: 'For staff who use AI tools at work. Both run in your browser and send nothing anywhere; the tools themselves set no cookie. Share the link with colleagues.',
      memosH: 'Four memo generators', memos: 'A few questions, then a dated memo for your business: what applies, since when, what to do next, every statement with its source. You read it here; the PDF comes by email.', openMemo: 'Start', allMemos: 'All memo generators', memoKicker: 'Memo by email',
      tools: [
        { key: 'in', title: 'May this go in?', text: 'Before you paste something into an AI tool: four quick questions, one traffic light, the reasons and what to do instead.' },
        { key: 'personal', title: 'Is there anything personal in it?', text: 'Paste a text. The tool marks email addresses, phone numbers, IBANs, names, addresses, health terms and access data, and replaces them with placeholders if you want.' },
      ],
      open: 'Open the tool', noNetwork: 'Runs in your browser. Sends nothing.',
      // Sapphire Cinema (3 November 2026): the group heading and the two kinds in the tool list.
      checksH: 'Two checks in the browser', kindCheck: 'Browser check', kindMemo: 'Memo generator',
    },
    in: {
      title: 'May this go in?', description: 'Four questions before you paste something into an AI tool: a traffic light with reasons, from the AI Policy Toolkit by Scutoria. Runs in the browser, sends nothing.',
      lead: 'Before you paste something into an AI tool at work. Four questions, one traffic light. Nothing you tick leaves your browser.',
      q1: 'What is in the text or file?', q1hint: 'Tick everything that applies.',
      data: [
        ['persons', 'Details about customers, staff or applicants by which a person can be identified'],
        ['access', 'Access data, passwords, keys or access codes'],
        ['business', 'Calculations, prices, contracts, customer lists or other confidential business information'],
        ['health', 'Health information'],
        ['third', 'Documents a third party handed over in confidence'],
        ['none', 'None of these'],
      ],
      q2: 'Which account would you use?',
      access: [['approved', 'A business account for a tool approved in the register'], ['unapproved', 'A business account, but the tool is not in the register or not approved'], ['unknown', 'I do not know which account or tool this is'], ['private', 'A private account or a privately installed app']],
      q3: 'Does the provider train its models on your inputs?',
      training: [['no', 'No, excluded by contract or switched off'], ['unknown', 'I do not know'], ['yes', 'Yes, or it cannot be switched off']],
      q4: 'What is the task?',
      purpose: [['allowed', 'A draft, summary, translation, wording or research'], ['person', 'A decision about a person: hiring, assessment, promotion, termination, task allocation'], ['other', 'Something else']],
      resultH: 'Result', reasonsH: 'Why', nextH: 'What to do',
      start: 'Answer the four questions.',
      verdicts: { red: 'No. Do not enter it like this.', amber: 'Not yet. Clarify first.', green: 'Yes, with the usual check.' },
      reasons: {
        'data:persons': 'Details that identify a customer, employee or applicant never go into a tool (your policy, § 3). Removing names and addresses is often not enough, because the context brings the person back.',
        'data:access': 'Access data, passwords, keys and codes never go into a tool (§ 3).',
        'data:business': 'Calculations, prices, contracts and customer lists are business secrets. They are protected only while the business takes reasonable steps to keep them secret (§ 3).',
        'data:health': 'Health information is sensitive by law (Art. 9 GDPR) and never goes into a tool (§ 3).',
        'data:third': 'Documents handed over in confidence by a third party never go into a tool (§ 3).',
        'purpose:person': 'AI tools are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions about them (§ 2 of the policy). Recruitment, assessment, promotion, termination and task allocation are high-risk uses under Annex III of the AI Act.',
        'access:private': 'Private accounts are not used for work: profiles of individual employees can arise, and nobody checked the provider (§ 1).',
        'access:unknown': 'Clarify which tool and which account this is. Only tools approved in the register are used for work (§ 1).',
        'access:unapproved': 'The tool is not approved yet. Ask the person who keeps the register to check it with the seven questions (§ 1).',
        'training:yes': 'The provider may learn from your inputs. Whether that is acceptable for this task is a decision of the business, recorded in the register.',
        'training:unknown': 'Whether the provider trains on inputs is the first of the seven questions of the approval check. Ask the person who keeps the register.',
        'purpose:other': 'Check whether the task is among the permitted uses of your policy (§ 2) before you start.',
        ok: 'Nothing speaks against it. The text contains no protected data, the account is approved, the task is allowed.',
      },
      next: {
        red: ['Do the task without the tool, or draft it with placeholders such as [customer] and [site] and insert the details afterwards outside the tool (§ 4).', 'Check the text first with "Is there anything personal in it?".', 'If the account is private: ask for access through a business account.'],
        amber: ['Ask the person who keeps the tool register before you enter anything.'],
        green: ['Read and check the result before you use it: figures, names, deadlines and references, and whatever your business always checks (§ 5).', 'If the result leaves the business, the named person releases it (§ 6).'],
      },
      doubt: 'In doubt: enter nothing, ask the person named in § 9 of your policy.',
      share: 'Copy the link for colleagues', copied: 'Copied',
      note: 'The sections refer to the AI usage policy of the AI Policy Toolkit. A business without such a policy can start with the toolkit; the rules above are the same for everyone.',
      sources: [
        ['Fact', 'Annex III, point 4 of Regulation (EU) 2024/1689 lists AI systems for recruitment, selection, promotion, termination, task allocation and monitoring as high-risk. Consolidated version of 27 July 2026, EUR-Lex, retrieved 2026-10-19.'],
        ['Fact', 'The German data protection authorities advise that employees should not work through private accounts, because profiles of individual employees can arise, and that removing names and addresses is regularly not enough. Orientierungshilfe of 6 May 2024, sections 2.4 and 3.1, retrieved 2026-10-18.'],
        ['Fact', 'Information is a trade secret only if it has been subject to reasonable steps to keep it secret. Directive (EU) 2016/943, Art. 2(1)(c), retrieved 2026-10-18.'],
        ['Fact', 'Data concerning health are a special category of personal data; processing them is prohibited unless one of the exceptions of Article 9(2) applies. Regulation (EU) 2016/679 (GDPR), Art. 9(1), EUR-Lex, retrieved 2026-10-23.'],
        ['Interpretation', 'The traffic light applies the nine areas of the usage policy; it is not legal advice and decides nothing on behalf of your business.'],
      ],
    },
    personal: {
      title: 'Is there anything personal in it?', description: 'Paste a text and see what identifies a person: email addresses, phone numbers, IBANs, names, addresses, health terms, access data. Runs in the browser, sends nothing. By Scutoria.',
      lead: 'Paste a text. The check runs in your browser while you type; nothing is sent anywhere. Then replace what it found with placeholders.',
      textLabel: 'Your text', textPlaceholder: 'Paste the text you want to put into an AI tool.',
      viewH: 'What the check marks', resultH: 'Result', findingsH: 'Found',
      start: 'Paste a text to start.', empty: 'Nothing pasted yet.',
      verdicts: { red: 'Yes. Personal or confidential details are in it. Do not paste it as it is.', amber: 'Possibly. Numbers, dates or places that may identify someone in context.', green: 'Nothing found. But a text can identify a person through context even without names.' },
      count: '%n marked',
      labels: { secret: 'Access data or key', iban: 'IBAN', ibanmaybe: 'Possibly an IBAN', svnr: 'Social security number (AT)', idde: 'Social security, insurance or tax number (DE)', email: 'Email address', phone: 'Phone number', health: 'Health term', healthmaybe: 'Possibly a health term', birthdate: 'Date of birth', address: 'Street address', name: 'Name', reference: 'Customer, order or contract number', postal: 'Postal code and place', plate: 'Licence plate', date: 'Date', idnum: 'Long number, possibly an identifier' },
      placeholders: { secret: 'ACCESS DATA', iban: 'IBAN', ibanmaybe: 'IBAN', svnr: 'SOCIAL SECURITY NO', idde: 'ID NUMBER', email: 'EMAIL', phone: 'PHONE', health: 'HEALTH', healthmaybe: 'HEALTH', birthdate: 'DATE OF BIRTH', address: 'ADDRESS', name: 'NAME', reference: 'REFERENCE NO', postal: 'PLACE', plate: 'LICENCE PLATE', date: 'DATE', idnum: 'NUMBER' },
      phBtn: 'Replace with placeholders', phLabel: 'Copy with placeholders', copy: 'Copy', copied: 'Copied',
      limits: 'The check finds patterns: names after a salutation or a label such as "Customer:", street names, common identifiers and a list of health and access words. Health words covered: krank…, Arzt…, Ärzt…, Therap…, Befund…, Diagnos…, Operation…, Behinderung, Schwerbehind…, Reha…, Kur, Krebs, Covid, Corona, AU-Bescheinigung, arbeitsunfähig…, Bandscheib…, Burnout, Depression, Allergie, Medikament, schwanger; sick, ill, illness, cancer, diabetes, diagnosis, therapy, medication, disability, pregnant, allergy, surgery, hospital. "Befund", "Operation" and "behindert" without another health word count only as possible. Access words covered: password, Passwort, Kennwort, PIN, API key, secret, token, login, WLAN, WiFi, Schlüssel, pw, Zugang, Zugangsdaten, Zugangscode, followed by ":", "=", "is", "ist", "lautet", "heißt", by "für …" with one of these, or a value with a digit. A name without salutation, a nickname, a rare job title or an address without a house number can stay unmarked. Treat green as "nothing obvious".',
      sources: [
        ['Fact', 'To avoid entering personal data, it is regularly not enough to remove names and addresses, because the connection to a person can be restored from the context. German data protection authorities, Orientierungshilfe of 6 May 2024, section 3.1, retrieved 2026-10-18.'],
        ['Fact', 'Entering personal data into an AI application and transferring it to the provider each need a legal basis under the GDPR. Same source, sections 1.9 and 3.1.'],
        ['Interpretation', 'The placeholder rule, draft with [customer] and [site], insert afterwards outside the tool, is the practical middle way for a small business; it is § 4 of the usage policy in the AI Policy Toolkit.'],
      ],
    },
  },
  de: {
    index: {
      title: 'Tools', description: 'Zwei Tools für Beschäftigte, die KI bei der Arbeit nutzen: eine Ampel, bevor Sie etwas einfügen, und eine Prüfung auf Personenbezug in einem Text. Beide laufen im Browser und senden nichts.', example: 'Beispiel',
      lead: 'Für Beschäftigte, die KI-Tools bei der Arbeit nutzen. Beide laufen im Browser und senden nichts; die Tools selbst setzen kein Cookie. Teilen Sie den Link mit Kolleginnen und Kollegen.',
      memosH: 'Vier Memo-Generatoren', memos: 'Ein paar Fragen, dann ein datiertes Memo für Ihren Betrieb: was gilt, seit wann, was als Nächstes zu tun ist, jede Aussage mit Quelle. Sie lesen es hier; das PDF kommt per E-Mail.', openMemo: 'Starten', allMemos: 'Alle Memo-Generatoren', memoKicker: 'Memo per E-Mail',
      tools: [
        { key: 'in', title: 'Darf das hinein?', text: 'Bevor Sie etwas in ein KI-Tool einfügen: vier kurze Fragen, eine Ampel, die Gründe und was Sie stattdessen tun.' },
        { key: 'personal', title: 'Steht da etwas Persönliches drin?', text: 'Text einfügen. Das Tool markiert E-Mail-Adressen, Telefonnummern, IBANs, Namen, Adressen, Gesundheitsbegriffe und Zugangsdaten und ersetzt sie auf Wunsch durch Platzhalter.' },
      ],
      open: 'Tool öffnen', noNetwork: 'Läuft im Browser. Sendet nichts.',
      checksH: 'Zwei Prüfungen im Browser', kindCheck: 'Browserprüfung', kindMemo: 'Memo-Generator',
    },
    in: {
      title: 'Darf das hinein?', description: 'Vier Fragen, bevor Sie etwas in ein KI-Tool einfügen: eine Ampel mit Gründen, aus dem KI-Richtlinien-Toolkit von Scutoria. Läuft im Browser, sendet nichts.',
      lead: 'Bevor Sie bei der Arbeit etwas in ein KI-Tool einfügen. Vier Fragen, eine Ampel. Nichts, was Sie ankreuzen, verlässt Ihren Browser.',
      q1: 'Was steht im Text oder in der Datei?', q1hint: 'Alles ankreuzen, was zutrifft.',
      data: [
        ['persons', 'Angaben zu Kunden, Beschäftigten oder Bewerbern, mit denen eine Person erkennbar ist'],
        ['access', 'Zugangsdaten, Passwörter, Schlüssel oder Zutrittscodes'],
        ['business', 'Kalkulationen, Preise, Verträge, Kundenlisten oder andere vertrauliche Geschäftsinformationen'],
        ['health', 'Gesundheitsangaben'],
        ['third', 'Unterlagen, die ein Dritter unter Vertraulichkeit übergeben hat'],
        ['none', 'Nichts davon'],
      ],
      q2: 'Welches Konto würden Sie benutzen?',
      access: [['approved', 'Ein betriebliches Konto für ein im Register freigegebenes Tool'], ['unapproved', 'Ein betriebliches Konto, aber das Tool steht nicht im Register oder ist nicht freigegeben'], ['unknown', 'Ich weiß nicht, welches Konto oder Tool das ist'], ['private', 'Ein privates Konto oder eine privat installierte App']],
      q3: 'Trainiert der Anbieter seine Modelle mit Ihren Eingaben?',
      training: [['no', 'Nein, vertraglich ausgeschlossen oder abgeschaltet'], ['unknown', 'Weiß ich nicht'], ['yes', 'Ja, oder es lässt sich nicht abschalten']],
      q4: 'Was ist die Aufgabe?',
      purpose: [['allowed', 'Ein Entwurf, eine Zusammenfassung, Übersetzung, Formulierung oder Recherche'], ['person', 'Eine Entscheidung über eine Person: Einstellung, Beurteilung, Beförderung, Kündigung, Aufgabenzuteilung'], ['other', 'Etwas anderes']],
      resultH: 'Ergebnis', reasonsH: 'Warum', nextH: 'Was tun',
      start: 'Beantworten Sie die vier Fragen.',
      verdicts: { red: 'Nein. So nicht eingeben.', amber: 'Noch nicht. Erst klären.', green: 'Ja, mit der üblichen Prüfung.' },
      reasons: {
        'data:persons': 'Angaben, mit denen ein Kunde, eine beschäftigte Person oder eine Bewerberin erkennbar ist, kommen nie in ein Tool (Ihre Richtlinie, § 3). Namen und Anschriften zu entfernen reicht oft nicht, weil der Zusammenhang die Person zurückbringt.',
        'data:access': 'Zugangsdaten, Passwörter, Schlüssel und Codes kommen nie in ein Tool (§ 3).',
        'data:business': 'Kalkulationen, Preise, Verträge und Kundenlisten sind Geschäftsgeheimnisse. Sie sind nur geschützt, solange der Betrieb angemessene Maßnahmen zur Geheimhaltung trifft (§ 3).',
        'data:health': 'Gesundheitsangaben sind von Gesetzes wegen besonders geschützt (Art. 9 DSGVO) und kommen nie in ein Tool (§ 3).',
        'data:third': 'Unterlagen, die ein Dritter unter Vertraulichkeit übergeben hat, kommen nie in ein Tool (§ 3).',
        'purpose:person': 'KI-Tools werden nicht eingesetzt, um Bewerbungen oder Beschäftigte auszuwählen, zu sichten, zu reihen oder zu bewerten, und nicht, um Entscheidungen über sie vorzubereiten oder zu treffen (§ 2 der Richtlinie). Einstellung, Beurteilung, Beförderung, Kündigung und Aufgabenzuteilung sind Hochrisiko-Verwendungen nach Anhang III der KI-Verordnung.',
        'access:private': 'Private Konten werden nicht dienstlich benutzt: Es können Profile einzelner Beschäftigter entstehen, und niemand hat den Anbieter geprüft (§ 1).',
        'access:unknown': 'Klären Sie zuerst, welches Tool und welches Konto das ist. Dienstlich werden nur Tools benutzt, die im Register freigegeben sind (§ 1).',
        'access:unapproved': 'Das Tool ist noch nicht freigegeben. Bitten Sie die Person, die das Register führt, es mit den sieben Fragen zu prüfen (§ 1).',
        'training:yes': 'Der Anbieter kann aus Ihren Eingaben lernen. Ob das für diese Aufgabe in Ordnung ist, entscheidet der Betrieb und hält es im Register fest.',
        'training:unknown': 'Ob der Anbieter mit Eingaben trainiert, ist die erste der sieben Fragen der Freigabeprüfung. Fragen Sie die Person, die das Register führt.',
        'purpose:other': 'Prüfen Sie, ob die Aufgabe zu den zulässigen Verwendungen Ihrer Richtlinie gehört (§ 2), bevor Sie beginnen.',
        ok: 'Nichts spricht dagegen. Der Text enthält keine geschützten Daten, das Konto ist freigegeben, die Aufgabe ist zulässig.',
      },
      next: {
        red: ['Erledigen Sie die Aufgabe ohne das Tool, oder schreiben Sie den Entwurf mit Platzhaltern wie [Kunde] und [Objekt] und setzen Sie die Angaben nachher außerhalb des Tools ein (§ 4).', 'Prüfen Sie den Text vorher mit „Steht da etwas Persönliches drin?“.', 'Wenn das Konto privat ist: Bitten Sie um Zugang über ein betriebliches Konto.'],
        amber: ['Fragen Sie die Person, die das Tool-Register führt, bevor Sie etwas eingeben.'],
        green: ['Lesen und prüfen Sie das Ergebnis vor der Verwendung: Zahlen, Namen, Fristen und Fundstellen, und was Ihr Betrieb immer prüft (§ 5).', 'Verlässt das Ergebnis den Betrieb, gibt es die benannte Person frei (§ 6).'],
      },
      doubt: 'Im Zweifel: nichts eingeben, die in § 9 Ihrer Richtlinie genannte Person fragen.',
      share: 'Link für Kolleginnen und Kollegen kopieren', copied: 'Kopiert',
      note: 'Die Paragrafen beziehen sich auf die KI-Nutzungsrichtlinie des KI-Richtlinien-Toolkits. Ein Betrieb ohne eine solche Richtlinie kann mit dem Toolkit beginnen; die Regeln oben gelten für alle gleich.',
      sources: [
        ['Fakt', 'Anhang III Nr. 4 der Verordnung (EU) 2024/1689 führt KI-Systeme für Einstellung, Auswahl, Beförderung, Kündigung, Aufgabenzuweisung und Beobachtung als Hochrisiko. Konsolidierte Fassung vom 27. Juli 2026, EUR-Lex, Abruf 2026-10-19.'],
        ['Fakt', 'Die deutschen Datenschutzaufsichtsbehörden raten, dass Beschäftigte nicht über private Accounts arbeiten sollten, weil Profile einzelner Beschäftigter entstehen können, und dass das Entfernen von Namen und Anschriften regelmäßig nicht reicht. Orientierungshilfe vom 6. Mai 2024, Abschnitte 2.4 und 3.1, Abruf 2026-10-18.'],
        ['Fakt', 'Eine Information ist nur dann ein Geschäftsgeheimnis, wenn sie angemessenen Geheimhaltungsmaßnahmen unterliegt. Richtlinie (EU) 2016/943, Art. 2 Nr. 1 Buchst. c, Abruf 2026-10-18.'],
        ['Fakt', 'Gesundheitsdaten sind eine besondere Kategorie personenbezogener Daten; ihre Verarbeitung ist untersagt, außer eine Ausnahme des Artikels 9 Absatz 2 greift. Verordnung (EU) 2016/679 (DSGVO), Art. 9 Abs. 1, EUR-Lex, Abruf 2026-10-23.'],
        ['Auslegung', 'Die Ampel wendet die neun Regelbereiche der Nutzungsrichtlinie an; sie ist keine Rechtsberatung und entscheidet nichts anstelle Ihres Betriebs.'],
      ],
    },
    personal: {
      title: 'Steht da etwas Persönliches drin?', description: 'Text einfügen und sehen, was eine Person erkennbar macht: E-Mail-Adressen, Telefonnummern, IBANs, Namen, Adressen, Gesundheitsbegriffe, Zugangsdaten. Läuft im Browser, sendet nichts. Von Scutoria.',
      lead: 'Fügen Sie einen Text ein. Die Prüfung läuft in Ihrem Browser, während Sie tippen; nichts wird gesendet. Danach ersetzen Sie die Funde durch Platzhalter.',
      textLabel: 'Ihr Text', textPlaceholder: 'Fügen Sie den Text ein, den Sie in ein KI-Tool geben möchten.',
      viewH: 'Was die Prüfung markiert', resultH: 'Ergebnis', findingsH: 'Gefunden',
      start: 'Fügen Sie einen Text ein.', empty: 'Noch nichts eingefügt.',
      verdicts: { red: 'Ja. Persönliche oder vertrauliche Angaben stehen drin. So nicht einfügen.', amber: 'Möglicherweise. Zahlen, Daten oder Orte, die im Zusammenhang jemanden erkennbar machen können.', green: 'Nichts gefunden. Aber ein Text kann eine Person auch ohne Namen über den Zusammenhang erkennbar machen.' },
      count: '%n markiert',
      labels: { secret: 'Zugangsdaten oder Schlüssel', iban: 'IBAN', ibanmaybe: 'Möglicherweise IBAN', svnr: 'Sozialversicherungsnummer (AT)', idde: 'Sozialversicherungs-, Versicherten- oder Steuernummer (DE)', email: 'E-Mail-Adresse', phone: 'Telefonnummer', health: 'Gesundheitsbegriff', healthmaybe: 'Möglicherweise Gesundheitsbegriff', birthdate: 'Geburtsdatum', address: 'Straßenadresse', name: 'Name', reference: 'Kunden-, Auftrags- oder Vertragsnummer', postal: 'Postleitzahl und Ort', plate: 'Kennzeichen', date: 'Datum', idnum: 'Lange Zahl, möglicherweise eine Kennung' },
      placeholders: { secret: 'ZUGANGSDATEN', iban: 'IBAN', ibanmaybe: 'IBAN', svnr: 'SV-NUMMER', idde: 'KENNNUMMER', email: 'E-MAIL', phone: 'TELEFON', health: 'GESUNDHEIT', healthmaybe: 'GESUNDHEIT', birthdate: 'GEBURTSDATUM', address: 'ADRESSE', name: 'NAME', reference: 'NUMMER', postal: 'ORT', plate: 'KENNZEICHEN', date: 'DATUM', idnum: 'KENNUNG' },
      phBtn: 'Durch Platzhalter ersetzen', phLabel: 'Kopie mit Platzhaltern', copy: 'Kopieren', copied: 'Kopiert',
      limits: 'Die Prüfung findet Muster: Namen nach einer Anrede oder einer Feldbezeichnung wie „Kunde:“, Straßennamen, gängige Kennungen und eine Liste von Gesundheits- und Zugangswörtern. Erfasste Gesundheitswörter: krank…, Arzt…, Ärzt…, Therap…, Befund…, Diagnos…, Operation…, Behinderung, Schwerbehind…, Reha…, Kur, Krebs, Covid, Corona, AU-Bescheinigung, arbeitsunfähig…, Bandscheib…, Burnout, Depression, Allergie, Medikament, schwanger; sick, ill, illness, cancer, diabetes, diagnosis, therapy, medication, disability, pregnant, allergy, surgery, hospital. „Befund“, „Operation“ und „behindert“ ohne weiteres Gesundheitswort zählen nur als möglich. Erfasste Zugangswörter: Passwort, Kennwort, password, PIN, API-Key, Secret, Token, Login, WLAN, WiFi, Schlüssel, pw, Zugang, Zugangsdaten, Zugangscode, gefolgt von „:“, „=“, „ist“, „is“, „lautet“, „heißt“, von „für …“ mit einem davon oder einem Wert mit Ziffer. Ein Name ohne Anrede, ein Spitzname, eine seltene Berufsbezeichnung oder eine Anschrift ohne Hausnummer kann unmarkiert bleiben. Nehmen Sie Grün als „nichts Offensichtliches“.',
      sources: [
        ['Fakt', 'Um die Eingabe personenbezogener Daten zu vermeiden, reicht es regelmäßig nicht, Namen und Anschriften zu entfernen, weil sich der Personenbezug aus dem Zusammenhang herstellen lässt. Datenschutzkonferenz, Orientierungshilfe vom 6. Mai 2024, Abschnitt 3.1, Abruf 2026-10-18.'],
        ['Fakt', 'Für die Eingabe personenbezogener Daten in eine KI-Anwendung und die Übermittlung an den Anbieter ist jeweils eine Rechtsgrundlage nach der DSGVO nötig. Dieselbe Quelle, Abschnitte 1.9 und 3.1.'],
        ['Auslegung', 'Die Platzhalter-Regel, Entwurf mit [Kunde] und [Objekt], Angaben nachher außerhalb des Tools einsetzen, ist der praktikable Mittelweg für einen kleinen Betrieb; sie ist § 4 der Nutzungsrichtlinie im KI-Richtlinien-Toolkit.'],
      ],
    },
  },
};

// The home page draws its tool previews from these texts, so that nothing is worded twice.
export const TOOL_TEXTS = T;

const MARK = { Fact: 'fact', Fakt: 'fact', Interpretation: 'interpretation', Auslegung: 'interpretation' };
const chip = (word) => `<span class="sc-mk sc-mk--${MARK[word] ?? 'fact'}"><i class="sc-mk__shape"></i>${esc(word)}</span>`;
const sourcesHtml = (items) => `<div class="prose">${items.map(([w, text]) => `<p class="small">${chip(w)} ${esc(text)}</p>`).join('')}</div>`;
const lightHtml = () => `<div class="light light--off" id="light" aria-hidden="true"><span class="light__lamp light__lamp--red"></span><span class="light__lamp light__lamp--amber"></span><span class="light__lamp light__lamp--green"></span></div>`;
const config = (obj) => `<script type="application/json" id="tool-config">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const toolPaths = (lang) => ({ in: p('toolIn', lang), personal: p('toolPersonal', lang) });

// Sapphire Cinema (3 November 2026): the six real tools in one list, numbered, with their kind. The tool pages and the memo
// pages show it beside the workspace; the current tool carries aria-current. Nothing here is a demo or a planned tool.
export function toolEntries(lang) {
  const s = T[lang].index;
  const paths = toolPaths(lang);
  return [
    ...s.tools.map((x) => ({ key: x.key, href: paths[x.key], title: x.title, kind: s.kindCheck })),
    ...MEMOS.map((m) => ({ key: m.pathKey, href: p(m.pathKey, lang), title: m.title[lang], kind: s.kindMemo })),
  ];
}
export function toolNav(lang, current) {
  const items = toolEntries(lang).map((e, i) => `<li><a href="${e.href}"${e.key === current ? ' aria-current="page"' : ''}><span class="cine-toolnav__n">${String(i + 1).padStart(2, '0')}</span><span class="cine-toolnav__t">${esc(e.title)}<small>${esc(e.kind)}</small></span></a></li>`).join('');
  return `<nav class="cine-toolnav" aria-label="${esc(t(lang).nav.tools)}"><ol class="cine-toolnav__list">${items}</ol></nav>`;
}
// The head of a workspace: kind, the page's h1 and its lead (the existing texts, which name where the tool runs and its limits).
export const workspaceHead = (kicker, title, lead) => `<div class="cine-workspace__head"><p class="kicker">${esc(kicker)}</p><h1 class="title">${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div>`;

export function toolsPage(lang) {
  const s = T[lang].index;
  const paths = toolPaths(lang);
  const product = PRODUCTS['ai-policy'];
  // The two browser tools with their previews, then the four memo generators; every card is a real tool.
  const tx = T[lang] ?? T.en;
  const cards = s.tools.map((x, i) => `
      <article class="cine-tool cine-tool--check reveal reveal--${i + 1}">
        <p class="kicker">${esc(s.noNetwork)}</p>
        <h3 class="heading">${esc(x.title)}</h3>
        <p class="body muted">${esc(x.text)}</p>
        ${i === 0 ? previewIn(lang, tx, s.example) : previewPersonal(lang, tx, s.example)}
        <div class="sc-row"><a class="sc-btn" href="${paths[x.key]}">${esc(s.open)}</a></div>
      </article>`).join('');
  const memoCards = MEMOS.map((m, i) => `
      <article class="cine-tool reveal reveal--${(i % 4) + 1}">
        <p class="kicker">${esc(s.memoKicker)}</p>
        <h3 class="heading">${esc(m.title[lang])}</h3>
        <p class="body muted">${esc(m.teaser[lang])}</p>
        <div class="sc-row"><a class="sc-btn sc-btn--secondary" href="${p(m.pathKey, lang)}">${esc(s.openMemo)}</a></div>
      </article>`).join('');
  const body = `
<section class="wrap cine-pagehead">
  <p class="kicker">Scutoria · ${esc(t(lang).nav.tools)}</p>
  <h1 class="display">${esc(s.title)}</h1>
  <p class="lead">${esc(s.lead)}</p>
</section>
<section class="wrap section" id="checks">
  <div class="section__head reveal"><h2 class="title">${esc(s.checksH)}</h2></div>
  <div class="cine-tools cine-tools--checks">${cards}</div>
</section>
<section class="wrap section" id="memos">
  <div class="section__head reveal"><h2 class="title">${esc(s.memosH)}</h2><p class="body muted">${lang === 'de' ? 'Ihre Antworten gehen an unseren Server und kommen als Memo auf der nächsten Seite zurück; sie stehen nur in der Adresse dieser Seite. Für ein Memo, das Sie nur lesen, wird nichts gespeichert. Wenn Sie das PDF per E-Mail anfordern, speichern wir Ihre Adresse, um es zu senden.' : 'Your answers go to our server and come back as a memo on the next page; they appear only in the address of that page. For a memo you only read, nothing is stored. If you ask for the PDF by e-mail, we store your address to send it.'}</p><p class="body muted">${esc(s.memos)}</p></div>
  <div class="cine-tools cine-tools--memos">${memoCards}</div>
  <p class="body muted reveal"><a href="${p('memos', lang)}">${esc(s.allMemos)}</a> · <a href="${product.path[lang]}">${esc(product.name[lang])}</a></p>
</section>`;
  return layout({ lang, title: s.title, description: s.description, body, alt: { en: p('tools', 'en'), de: p('tools', 'de') }, section: 'tools' });
}

const options = (name, items, type) => items.map(([v, label]) => `<label class="sc-option"><input type="${type}" name="${name}" value="${esc(v)}"><span class="sc-option__dot${type === 'checkbox' ? ' sc-option__dot--box' : ''}"></span><span class="sc-option__title">${esc(label)}</span></label>`).join('');

export function mayThisGoInPage(lang) {
  const s = T[lang].in;
  const product = PRODUCTS['ai-policy'];
  const body = `
<section class="wrap cine-toolpage">
  ${toolNav(lang, 'in')}
  <div class="cine-workspace">
  ${workspaceHead(T[lang].index.noNetwork, s.title, s.lead)}
  <div class="cine-workspace__body">
  <div class="tool__grid">
    <form id="tool-form" class="tool__form">
      <fieldset class="tool__q"><legend class="heading">${esc(s.q1)}</legend><p class="small muted">${esc(s.q1hint)}</p><div class="sc-options">${options('data', s.data, 'checkbox')}</div></fieldset>
      <fieldset class="tool__q"><legend class="heading">${esc(s.q2)}</legend><div class="sc-options">${options('access', s.access, 'radio')}</div></fieldset>
      <fieldset class="tool__q"><legend class="heading">${esc(s.q3)}</legend><div class="sc-options">${options('training', s.training, 'radio')}</div></fieldset>
      <fieldset class="tool__q"><legend class="heading">${esc(s.q4)}</legend><div class="sc-options">${options('purpose', s.purpose, 'radio')}</div></fieldset>
    </form>
    <aside class="tool__result" aria-live="polite">
      <div class="label muted">${esc(s.resultH)}</div>
      ${lightHtml()}
      <p class="heading" id="verdict">${esc(s.start)}</p>
      <div class="label muted">${esc(s.reasonsH)}</div>
      <ul class="tool__list" id="reasons"></ul>
      <div class="label muted">${esc(s.nextH)}</div>
      <ul class="tool__list" id="next"></ul>
      <button class="sc-btn sc-btn--secondary sc-btn--small" type="button" id="share-btn">${esc(s.share)}</button>
    </aside>
  </div>
  <p class="small muted">${esc(s.note)} <a href="${product.path[lang]}">${esc(product.name[lang])}</a> · <a href="${handbookPathOf(product, lang)}#s2">${lang === 'de' ? 'Handbuch, Abschnitt 2' : 'Handbook, section 2'}</a></p>
  ${sourcesHtml(s.sources)}
  </div>
  </div>
</section>
${config({ start: s.start, verdicts: s.verdicts, reasons: s.reasons, next: s.next, doubt: s.doubt, copied: s.copied })}
<script type="module" src="/tools/may-this-go-in.js"></script>`;
  return layout({ lang, title: s.title, description: s.description, body, alt: { en: p('toolIn', 'en'), de: p('toolIn', 'de') }, section: 'tools' });
}

export function anythingPersonalPage(lang) {
  const s = T[lang].personal;
  const product = PRODUCTS['ai-policy'];
  const body = `
<section class="wrap cine-toolpage">
  ${toolNav(lang, 'personal')}
  <div class="cine-workspace">
  ${workspaceHead(T[lang].index.noNetwork, s.title, s.lead)}
  <div class="cine-workspace__body">
  <div class="tool__grid tool__grid--wide">
    <div class="tool__form">
      <label class="sc-field"><span class="sc-field__label">${esc(s.textLabel)}</span><textarea class="sc-field__input sc-field__area tool__text" id="text" rows="10" placeholder="${esc(s.textPlaceholder)}" spellcheck="false"></textarea></label>
      <div class="label muted">${esc(s.viewH)} <span id="count"></span></div>
      <div class="tool__view" id="view"></div>
      <div class="sc-row"><button class="sc-btn" type="button" id="placeholder-btn" disabled>${esc(s.phBtn)}</button><button class="sc-btn sc-btn--secondary" type="button" id="copy-btn" hidden>${esc(s.copy)}</button></div>
      <label class="sc-field"><span class="sc-field__label">${esc(s.phLabel)}</span><textarea class="sc-field__input sc-field__area tool__text" id="placeholders" rows="6" readonly hidden></textarea></label>
    </div>
    <aside class="tool__result" aria-live="polite">
      <div class="label muted">${esc(s.resultH)}</div>
      ${lightHtml()}
      <p class="heading" id="verdict">${esc(s.start)}</p>
      <div class="label muted">${esc(s.findingsH)}</div>
      <ul class="tool__list tool__list--findings" id="findings"></ul>
      <p class="small muted">${esc(s.limits)}</p>
    </aside>
  </div>
  ${sourcesHtml(s.sources)}
  <p class="small muted"><a href="${product.path[lang]}">${esc(product.name[lang])}</a> · <a href="${handbookPathOf(product, lang)}#s2-4">${lang === 'de' ? 'Handbuch, Abschnitt 2.4' : 'Handbook, section 2.4'}</a></p>
  </div>
  </div>
</section>
${config({ start: s.start, empty: s.empty, verdicts: s.verdicts, labels: s.labels, placeholders: s.placeholders, count: s.count, copied: s.copied })}
<script type="module" src="/tools/personal.js"></script>`;
  return layout({ lang, title: s.title, description: s.description, body, alt: { en: p('toolPersonal', 'en'), de: p('toolPersonal', 'de') }, section: 'tools' });
}
