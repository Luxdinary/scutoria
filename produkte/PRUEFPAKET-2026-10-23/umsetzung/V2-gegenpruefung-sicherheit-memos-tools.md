# V2 · Gegenprüfung Commit 109431f: Sicherheitsnachweis, Memos, Tools

Stand 23. Oktober 2026. Unabhängige Prüfung des Teils „Sicherheitsnachweis-Toolkit, Memos, Tools“ aus Commit 109431f gegen die Befunde A2, A4, A5 und die Protokolle W2, W4, W5. Im Projekt wurde nichts geändert; geschrieben wurde nur diese Datei. Skripte, Renderings und Rechtstexte liegen in `C:\Users\Stefa\AppData\Local\Temp\scutoria-v2\`.

## Zusammenfassung

**Ergebnis: 22 Probleme. A: 2 · B: 9 · C: 11.**

- **A-Befunde aus A2 (4), A4 (7) und A5 (9):** 18 sind im Endtext, in der Logik und in den neu erzeugten PDFs so behoben, wie formuliert. Nicht behoben ist A5 Nr. 42 im Checkout: `shop/products.mjs` sagt weiter „thirty-one questions“ (Problem 1). A4 Nr. 1 („(c)“ als „©“) ist nur im Druck behoben, auf der Website nicht (Problem 8). Die Begründung „B-16 nicht umgesetzt“ in W2 trägt: Die Seite „Erpressungstrojaner: Was tun bei Infektion?“ enthält den zitierten Satz heute wörtlich.
- **Neuer Fehler mit Rechtsfolge:** Die neuen Fragen für Brief und Karte (Name der unterzeichnenden Person, Telefon, Anschriften) machen die Datenschutz-Antwort auf der Produktseite falsch („never asks for … names of staff; people appear as roles“). Das ist Tor „Recht“ (Problem 2).
- **Zahlen und Querbezüge:** 47 Fragen, 40 Pflicht, 24 Statusfragen stimmen in `questions.json`, Handbuch 6.13, Produktseite und Startseite. Handbuch 37 Seiten EN, 40 Seiten DE stimmt mit den PDFs und der Produktseite. „Twenty-three points, thirteen open“ stimmt mit Abschnitt 6 (10 erledigt, 13 offen). NIS-2-Frühwarnung an das CSIRT steht in Handbuch F1, 4.2, Glossar und Notfallkarte gleich. Abweichend: Checkout-Text und Vorschauseite sagen noch „forty“ (Probleme 9, 18), Handbuch und NIS2-Memo nennen verschiedene Registrierungsfristen für Österreich (Problem 7).
- **EN und DE:** Handbuch Zeile für Zeile verglichen (593 Zeilen je Sprache, Marker, Zahlen, Daten, Fundstellen): gleich, bis auf die bekannte DE-Ergänzung in Quelle Nr. 25. Karte, Brief, Memos, Tools, Produktseite inhaltsgleich, bis auf den Abschnittsnamen D auf der DE-Produktseite (Problem 17) und „if so“ gegen „dann“ (Problem 3).
- **Hausregeln:** keine Gedankenstriche als Einschub (einziger Halbgeviertstrich DE Zeile 154 steht im wörtlichen Zitat der Durchführungsverordnung), keine Ausrufezeichen, keine Zusagen wie „compliant“, „certified“, „secure“. Ein Verstoß: „the safe course“ / „der sichere Weg“ im Kennzeichnungs-Memo (Problem 10). Alle Memo-Ergebnistitel sind frei davon.
- **Memos:** Entscheidungslogik in Node durchgespielt (Skript `memos-check.mjs`): Behörde „wichtig“ ergibt wichtig, bei großem Anhang-I-Betrieb wesentlich; Zentralregierung immer Rot mit „regardless of size“; regional und lokal Gelb mit eigenem Titel; deutscher Begriff nur bei Deutschland; Anmelde-Memo Grün „The three first steps are in place. Keep them dated.“, Austritt „Nein“ oder „unbekannt“ macht Rot; Start-Memo mit schwächsten Antworten und angekreuztem Übersetzungstool ergibt Rot „Start here“ und „You ticked AI tools, so AI is in use.“, nie mehr „sound start“.
- **Tools:** Alle Teststrings der Befunde bestehen („Sehr geehrte Frau Huber,“ → `[NAME],`; „Das Passwort ist Sommer2024“ und „… lautet Sommer2024“ → `[SECRET]`; alle Gesundheitswörter aus Nr. 35 rot, „Befunde“ und „Operationen“ ohne Kontext gelb). Wörtlich „Passwort ist X“ und „Passwort lautet X“ bleiben grün, weil Werte unter drei Zeichen absichtlich nicht zählen; mit echten Passwörtern greift die Erkennung. Lücken bei verbreiteten Satzformen und zwei neue Fehlalarme: Probleme 11 und 15.
- **PDFs:** alle 32 neu erzeugten PDFs gerendert und die geänderten Seiten angesehen. Notfallkarte EN und DE je eine Seite, als DOCX in Word ebenfalls je eine Seite. „(c)“ erscheint in Handbuch, D5 und D6 als „(c)“. D1 ist nach Unterschrift versendbar. Das D5-Muster trägt absichtlich „DRAFT/ENTWURF“, weil der Beispielbetrieb keine Anschriften und keinen Namen hat; mit ausgefüllten Fragen A4, A10, A11 entsteht ein vollständiger Brief ohne Entwurfsvermerk (eigener Lauf, Skript `d5.mjs`). Empfehlung: dem Beispielbetrieb erfundene Anschriften und einen erfundenen Namen geben, damit das öffentliche Muster den fertigen Brief zeigt; das entscheidest du (W4, offen Nr. 2).
- **Tests:** `npm test` 39 von 39 bestanden.

**Empfehlung:** Probleme 1 und 2 vor jedem Livegang beheben; beide sind reine Textänderungen, Problem 2 geht durch das Tor „Recht“. Dann 3, 5 und 7 (Rechtsaussagen und Fristen), dann 6 und 8 (toter Link auf der Karte, „©“ auf der Website). Der Rest im nächsten Textlauf.

## Live geprüft am 23.10.2026 (Primärquellen)

| Aussage | Quelle | Ergebnis |
|---|---|---|
| Art. 32 Abs. 1 Buchst. a, c, d DSGVO, Wortlaut EN und DE (A2 A-1) | ABl.-Fassung über publications.europa.eu, CELEX 32016R0679 | stimmt wörtlich |
| Art. 33 Abs. 1 DSGVO mit Ausnahme „unlikely to result in a risk“ (B-11) | dto. | stimmt; siehe aber Problem 3 |
| Art. 23 Abs. 1 und Abs. 4 Buchst. d RL 2022/2555: CSIRT, Abschlussbericht ein Monat nach der Meldung (A-3) | CELEX 32022L2555, EN und DE | stimmt |
| Art. 2 Abs. 2 Buchst. f, Art. 3 Abs. 1 Buchst. d und Abs. 2 RL 2022/2555 (A5 Nr. 1, 2) | dto. | stimmt |
| Art. 30 Abs. 2 und 3, Abs. 3 Buchst. e Ziff. i, letzter UAbs. DORA (A-4, A4 Nr. 18) | CELEX 32022R2554 | stimmt |
| Art. 2 Abs. 2 UAbs. 2 DVO 2024/2690 (B-2) | CELEX 32024R2690 | stimmt |
| Art. 71 Abs. 2 CRA: Art. 14 ab 11.9.2026 (B-22) | CELEX 32024R2847 | stimmt |
| § 34 Abs. 1 NISG 2026: sektorspezifisches CSIRT, sonst nationales CSIRT (A-3) | ris.bka.gv.at, Geltende Fassung | stimmt wörtlich |
| § 45 Abs. 1 Z 3 und Z 8 NISG 2026 (B-4), § 29 Abs. 3 (B-5) | dto. | stimmt |
| WKO-Hotline 0800 888 133, Mo bis So 0 bis 24 Uhr, Experten Mo bis Fr 8 bis 18 Uhr, Rückruf Montag (B-6, Karte) | wko.at/it-sicherheit/cyber-security-hotline, Seitendatum 01.06.2026 | stimmt |
| WKO: Registrierung bis 31.12.2026, Selbstdeklaration bis 30.09.2027 (B-5) | wko.at/it-sicherheit/nis-faq, Seitendatum 08.10.2026 | stimmt |
| Bundesamt für Cybersicherheit: „Grundsätzlich bis 1. Jänner 2027, aufgrund § 33 Abs. 2 AVG bis spätestens 4. Jänner 2027“ | bundesamt-cybersicherheit.gv.at/303/registrierung.html | stimmt mit NIS2-Memo, weicht vom Handbuch ab (Problem 7) |
| CERT.at +43 1 5056416 78, reports@cert.at; NISG-Meldungen über die USP-Meldeplattform (Karte) | cert.at/de/services/vorfall-melden | stimmt |
| Datenschutzbehörde +43 1 52 152-0, dsb@dsb.gv.at (Karte) | dsb.gv.at | stimmt |
| against-cybercrime@bmi.gv.at, keine Anzeige über die Meldestelle (Karte) | bundeskriminalamt.at/602 | stimmt |
| Polizei 133, Euro-Notruf 112 (Karte AT) | polizei.gv.at/alle/notrufe.html (Suchauszug) | stimmt |
| Polizei 110, 112 (Karte DE, Handbuch 5.2) | bundesnetzagentur.de, Notruf | stimmt |
| BSI Service-Center 0800 274 1000, Mo bis Do 8 bis 17, Fr 8 bis 16 Uhr (Karte DE) | bsi.bund.de, Service-Center | stimmt |
| onlinesicherheit.gv.at „sofort abgewürgt, also stromlos gemacht werden“, Stand 23. Juli 2022 (B-16) | onlinesicherheit.gv.at, Erpressungstrojaner: Was tun bei Infektion? | stimmt; W2 hat recht |
| ENISA-CSIRT-Inventar auf der EU-Karte | enisa.europa.eu/topics/incident-management/csirt-inventory | HTTP 404 (Problem 6) |
| EDPB-Mitgliederliste auf der EU-Karte | edpb.europa.eu/about-edpb/about-edpb/members_en | leitet auf our-members_en, erreichbar |

Nicht ermittelbar: ob ENISA das Inventar nur verschoben hat (Seite node/17673 liefert „Access denied“, Startseite verlinkt es nicht mehr). Die Rechtstexte der EU wurden über den Cellar des Amts für Veröffentlichungen gelesen, nicht über EUR-Lex.

## Probleme

### 1. Checkout nennt beim KI-Toolkit weiter „thirty-one questions“ (A5 Nr. 42 offen)
- **Datei, Zeile:** `site/src/shop/products.mjs:11` und `:12`; verwendet als Produktbeschreibung im Stripe-Checkout (`site/src/shop/payments.mjs:61`) und als Rückfall auf der Startseite (`home.mjs:95`).
- **Zitat:** „Annual licence for one business: generator with thirty-one questions, …“ / „Generator mit einunddreißig Fragen“
- **Problem:** Genau die Zahl, die A5 Nr. 42 als A-Befund gemeldet hat. Seiten und Memo sagen jetzt „thirty-four, 29 of them required“, die Beschreibung im Kaufvorgang nicht. W5 hat die Stelle als „andere Datei“ vermerkt, der Commit hat sie nicht geändert. Falsche Leistungsbeschreibung im Moment des Vertragsschlusses.
- **Schwere:** A
- **Korrektur EN:** „Annual licence for one business: generator with thirty-four questions, 29 of them required, seven documents as PDF, DOCX and XLSX, handbook with sources, evidence folder, updates for twelve months.“
- **Korrektur DE:** „Jahreslizenz für einen Betrieb: Generator mit vierunddreißig Fragen, davon 29 Pflichtfragen, sieben Dokumente als PDF, DOCX und XLSX, Handbuch mit Quellen, Nachweisordner, Aktualisierungen für zwölf Monate.“

### 2. Produktseite: Datenschutz-Antwort ist durch die neuen Fragen falsch geworden
- **Datei, Zeile:** `site/src/pages/product-security.mjs:55` (EN) und `:93` (DE).
- **Zitat:** „The generator never asks for passwords, access data, IP addresses or names of staff; people appear as roles, incidents only as a level.“ / „Der Generator fragt nie nach … Namen von Beschäftigten; Personen kommen als Rolle vor …“
- **Problem:** Seit A4 Nr. 6 und Nr. 8 fragt der Generator nach Telefon und E-Mail der verantwortlichen Person (A4), nach der Notfallnummer des Dienstleisters (A9), nach Anschriften (A10, A11) und verlangt für einen Brief ohne Entwurfsvermerk den Namen der unterzeichnenden Person („DRAFT · missing: … name of the signatory“). Die Aussage über verarbeitete Personendaten ist damit unrichtig; Tor „Recht“.
- **Schwere:** A
- **Korrektur EN:** „Your email address, your answers and the runs of the generator. The generator never asks for passwords, access data or IP addresses. Names and phone numbers appear only where you enter them for the cover letter and the emergency card: the contact person, the signatory, the IT provider and the recipient; incidents appear only as a level. No tracking cookies; page views are counted without any personal data.“
- **Korrektur DE:** „Ihre E-Mail-Adresse, Ihre Antworten und die Läufe des Generators. Der Generator fragt nie nach Passwörtern, Zugangsdaten oder IP-Adressen. Namen und Telefonnummern stehen nur dort, wo Sie sie für das Antwortschreiben und die Notfallkarte eintragen: Ansprechperson, unterzeichnende Person, IT-Dienstleister und Empfänger; Vorfälle kommen nur als Stufe vor. Keine Tracking-Cookies; Seitenaufrufe werden ohne Personenbezug gezählt.“ Datenschutzerklärung Abschnitt Kundenkonto daraufhin gegenlesen.

### 3. Schwelle der 72-Stunden-Meldung verkehrt: „nur wenn ein Risiko wahrscheinlich ist“
- **Datei, Zeile:** `site/content/toolkits/security-evidence/questions.json:292` (Hilfetext F2); `handbook.en.md:415`, `handbook.de.md:415`.
- **Zitat:** Hilfetext EN „whether a risk to the persons concerned is likely; only then does the report go to the authority“; Handbuch EN „whether a risk to the persons concerned is likely; if so, the report goes to the authority“, DE „ob ein Risiko für die Betroffenen wahrscheinlich ist; dann geht die Meldung an die Behörde“.
- **Problem:** Art. 33 Abs. 1 DSGVO verlangt die Meldung, „es sei denn, dass die Verletzung … voraussichtlich nicht zu einem Risiko … führt“. Gemeldet wird also schon, wenn ein Risiko nicht unwahrscheinlich ist, nicht erst, wenn es wahrscheinlich ist. Die Wendung stammt aus der formulierten Korrektur B-11 und widerspricht dem Fakt-Block F2 und der Notfallkarte („unless there is unlikely to be a risk to people“). Zusätzlich: EN „if so“ ist eine Bedingung, DE „dann“ nur zeitlich.
- **Schwere:** B
- **Korrektur EN:** Hilfetext: „The GDPR deadline runs from the moment you become aware. The named person decides within the first day whether personal data is affected; unless a risk to the persons concerned is unlikely, the report goes to the authority within 72 hours. Every breach is written down either way (F4). The emergency card names the person and the authority.“ Handbuch 4.2: „… whether personal data is affected; unless a risk to the persons concerned is unlikely, the report goes to the authority of the country (section 5); …“
- **Korrektur DE:** Hilfetext: „Die DSGVO-Frist läuft ab Kenntnis. Die benannte Person entscheidet am ersten Tag, ob personenbezogene Daten betroffen sind; außer ein Risiko für die Betroffenen ist unwahrscheinlich, geht die Meldung binnen 72 Stunden an die Behörde. Aufgeschrieben wird jede Verletzung (F4). Die Notfallkarte benennt die Person und die Behörde.“ Handbuch 4.2: „… ob personenbezogene Daten betroffen sind; außer ein Risiko für die Betroffenen ist unwahrscheinlich, geht die Meldung an die Behörde des Landes (Abschnitt 5); …“

### 4. D5-Abgleich beantwortet die Frage nach der Wiederanlaufzeit mit der tolerierbaren Ausfallzeit
- **Datei, Zeile:** `site/src/toolkit/documents/security/cover-letter.mjs:56` (EN), `:116` (DE); sichtbar in D5 S. 2.
- **Zitat:** „What is your recovery time, and is there an emergency plan?“ → „Tolerable downtime: about a day; emergency plan: not yet …“
- **Problem:** Nach B-20 sind tolerierbare Ausfallzeit (D3) und Wiederanlaufzeit (RTO, gemessen mit D2) zweierlei, und das Glossar sagt „The RTO must be shorter than the tolerable downtime“. Der Kunde liest „recovery time … about a day“ als zugesagte RTO, also genau die Verwechslung, die B-20 beseitigen sollte.
- **Schwere:** B
- **Korrektur EN:** Frage „How long can you bridge an IT outage, have you tested a restore, and is there an emergency plan?“, Antwortteile `['D3', 'D2', 'D4']`.
- **Korrektur DE:** Frage „Wie lange überbrücken Sie einen IT-Ausfall, haben Sie eine Wiederherstellung geprobt, und gibt es einen Notfallplan?“, Antwortteile `['D3', 'D2', 'D4']`.

### 5. D5: DORA-Absatz auch für Lieferanten ohne IKT-Leistung
- **Datei, Zeile:** `cover-letter.mjs:38` bis `:41`, `:98` bis `:101`, Einbau `:184`.
- **Zitat:** „If you are a financial entity under DORA, please tell us in writing whether you classify our service as supporting a critical or important function; the extent of the contractual requirements depends on it.“
- **Problem:** Der Absatz erscheint bei A12 „ja“ oder „unbekannt“ unabhängig von A7. Für Waren oder Leistungen ohne IKT sagen Handbuch 1.3 (A-4) und D6 Teil B („By your answer to A7 you supply no ICT services … ask for them to be removed“), dass Art. 30 DORA nicht greift. Der Brief bittet die Bank dagegen um eine Einstufung nach DORA und räumt so die Anwendbarkeit stillschweigend ein. Widerspruch zwischen D5, D6 und Handbuch.
- **Schwere:** B
- **Korrektur EN:** Bei A7 `goods` oder `services` statt des Absatzes: „If you are a financial entity under DORA: our service is not an ICT service. Article 30 DORA governs contracts on ICT services; please tell us if you see this differently.“
- **Korrektur DE:** „Falls Sie ein Finanzunternehmen unter DORA sind: Unsere Leistung ist keine IKT-Dienstleistung. Art. 30 DORA regelt Verträge über IKT-Dienstleistungen; bitte sagen Sie uns, wenn Sie das anders sehen.“ Tor „Recht“.

### 6. Notfallkarte „anderes EU-Land“: Link zum ENISA-Inventar ist tot
- **Datei, Zeile:** `site/src/toolkit/documents/security/emergency-card.mjs:59` (EN), `:110` (DE), Quellenhinweis `:43`, `:94`.
- **Zitat:** „[national CSIRT of your country: ENISA CSIRT inventory, enisa.europa.eu/topics/incident-management/csirt-inventory]“
- **Problem:** Die Adresse liefert am 23.10.2026 HTTP 404 (curl, WebFetch und Browser); die Startseite der ENISA verlinkt kein Inventar mehr. Ein Betrieb im Notfall findet über die Karte kein CSIRT. A4 Nr. 7 nennt die Adresse als am selben Tag abgerufen.
- **Schwere:** B
- **Korrektur EN:** „[national CSIRT of your country: members list of the EU CSIRTs Network, csirtsnetwork.eu]“, Quelle „csirtsnetwork.eu, members“ mit Abrufdatum; vor dem Einbau die Mitgliederseite einmal öffnen.
- **Korrektur DE:** „[Nationales CSIRT Ihres Landes: Mitgliederliste des CSIRTs-Netzwerks der EU, csirtsnetwork.eu]“, Quelle „csirtsnetwork.eu, Mitglieder“.

### 7. Österreich: Handbuch und NIS2-Memo nennen verschiedene Registrierungsfristen
- **Datei, Zeile:** `handbook.en.md:439`, `handbook.de.md:439` (und offener Punkt 6.3); `site/src/memos/nis2.mjs:220`, `:221`.
- **Zitat:** Handbuch „register within three months of entry into force, according to the chamber of commerce by 31 December 2026“; Memo „that is by 1 January 2027 … the authority names 4 January 2027 as the last day“.
- **Problem:** Beide Angaben sind belegt, aber ein Käufer beider Produkte bekommt zwei Fristen. Die Behörde selbst schreibt heute: „Grundsätzlich bis 1. Jänner 2027, aufgrund § 33 Abs. 2 AVG bis spätestens 4. Jänner 2027“. Das Handbuch nennt die Behörde nicht, das Memo nennt die Kammer nicht.
- **Schwere:** B
- **Korrektur EN:** Handbuch: „covered entities register within three months of entry into force through the business service portal (USP): according to the cybersecurity authority by 1 January 2027, at the latest 4 January 2027 under § 33(2) AVG; the chamber of commerce names 31 December 2026, and registering by that earlier date leaves no doubt;“ Quelle ergänzen „Bundesamt für Cybersicherheit, Registrierung · retrieved 2026-10-23“. Memo nach dem Satz zum 4. Januar: „The chamber of commerce names 31 December 2026; registering by that date leaves no doubt.“
- **Korrektur DE:** Handbuch: „erfasste Einrichtungen registrieren sich binnen drei Monaten ab Inkrafttreten über das Unternehmensserviceportal (USP): laut Cybersicherheitsbehörde grundsätzlich bis 1. Jänner 2027, wegen § 33 Abs. 2 AVG spätestens bis 4. Jänner 2027; die Wirtschaftskammer nennt den 31. Dezember 2026, und wer bis dahin registriert, lässt keinen Zweifel;“ Quelle „Bundesamt für Cybersicherheit, Registrierung · abgerufen 23.10.2026“. Memo: „Die Wirtschaftskammer nennt den 31. Dezember 2026; wer bis dahin registriert, lässt keinen Zweifel.“

### 8. „(c)“ wird auf der Website weiter als „©“ gezeigt (A4 Nr. 1 nur im Druck behoben)
- **Datei, Zeile:** `site/public/site.css` (keine Regel gegen Ligaturen); Druck-CSS `site/src/toolkit/documents/blocks.mjs:107` ist richtig.
- **Zitat:** Online-Handbuch D1 „the Directive's area (c)“, Dokumentvorschau D5 „Art. 21(2)“-Spalte „(c)“, Memo-Seiten „Art. 3(1)(c)“.
- **Problem:** Mit der selbst gehosteten Manrope und ohne Ligatur-Regel rendert Chromium „Art. 21(2)(c)“ als „Art. 21(2)©“ (eigener Test, `lig.png`). A4 Nr. 1 verlangte die Regel ausdrücklich auch in `site.css`; W4 verweist auf Lovable, aber `site.css` wurde im selben Commit geändert und die Seite läuft bis zum Umzug weiter. Gilt ebenso für die Lovable-Fassung.
- **Schwere:** B
- **Korrektur EN und DE (CSS, kein Text):** in `site/public/site.css` ergänzen: `body { font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-contextual; font-feature-settings: "liga" 0, "dlig" 0, "calt" 0; }`; dieselbe Regel in Lovable.

### 9. Checkout beim Sicherheitsnachweis: „forty questions“
- **Datei, Zeile:** `site/src/shop/products.mjs:21`, `:22`.
- **Zitat:** „generator with forty questions“ / „Generator mit vierzig Fragen“
- **Problem:** Produktseite, Startseite und Handbuch 6.13 sagen 47 Fragen, davon 40 Pflicht. Der Text im Kaufvorgang weicht ab.
- **Schwere:** B
- **Korrektur EN:** „generator with forty-seven questions, 40 of them required“
- **Korrektur DE:** „Generator mit siebenundvierzig Fragen, davon 40 Pflichtfragen“

### 10. Kennzeichnungs-Memo: „the safe course“ / „der sichere Weg“
- **Datei, Zeile:** `site/src/memos/labelling.mjs:113` (EN), `:114` (DE).
- **Zitat:** „until then, the safe course is to pause it.“ / „bis dahin ist Aussetzen der sichere Weg.“
- **Problem:** Gesperrtes Wort der Hausregel in einem veröffentlichten Memo. W5 hat es nur als Hinweis notiert, nicht geändert.
- **Schwere:** B
- **Korrektur EN:** „until then, the cautious course is to pause it.“
- **Korrektur DE:** „bis dahin ist Aussetzen der vorsichtige Weg.“

### 11. Tool „Steht da etwas Persönliches drin?“: verbreitete Passwort-Sätze bleiben grün
- **Datei, Zeile:** `site/public/tools/personal.js:28` bis `:36` (`SECRET_KEY`, `SECRET_SEP`); Grenzen-Text `site/src/pages/tools.mjs:88`, `:170`.
- **Zitat (Test):** „Das Passwort für den Server ist Sommer2024“, „Mein Passwort heißt Sommer2024“, „Das neue Passwort lautet⏎Sommer2024“, „Zugang: admin / Sommer2024“ → jeweils grün, Passwort bleibt in der Platzhalter-Kopie. „Passwort ist X“ bleibt grün, weil Werte unter drei Zeichen nicht zählen (vertretbar).
- **Problem:** Gleiche Fehlerklasse wie A5 Nr. 34: Ergebnis „nichts Offensichtliches“ bei Text mit Klartext-Passwort. „für …“ wird nur mit „:“ oder „=“ erkannt, „heißt“ fehlt, nach „lautet“ ist kein Zeilenumbruch erlaubt, „Zugang“ ist kein Stichwort.
- **Schwere:** B
- **Korrektur (Code, EN und DE gleich):** `SECRET_SEP` um `/^[ \t]+(?:heißt|heisst)[ \t]*:?[ \t]+/iu` und `/^[ \t]+(?:für|for|des|der|vom|of)[ \t]+[^:=\n]{1,40}?[ \t]+(?:ist|is|lautet|heißt)[ \t]*:?[ \t]+/iu` ergänzen; in der Regel für „is/ist/lautet“ nach dem Wort `(?:\r?\n[ \t]*)?` zulassen; „Zugang“ in `SECRET_KEY`. Grenzen-Text EN: „… followed by ":", "=", "is", "ist", "lautet", "heißt", by "für …" with one of these, or a value with a digit.“ DE: „… gefolgt von „:“, „=“, „ist“, „is“, „lautet“, „heißt“, von „für …“ mit einem davon oder einem Wert mit Ziffer.“ Testfälle der vier Sätze aufnehmen.

### 12. Notfallkarte: „final report within one month“ ohne Bezugspunkt
- **Datei, Zeile:** `emergency-card.mjs:32` bis `:34`, `:83` bis `:85`.
- **Zitat:** „… within 24 hours of becoming aware, notification within 72 hours, final report within one month“
- **Problem:** Im selben Satz wie „of becoming aware“ liest man den Monat ab Kenntnis. Richtlinie Art. 23 Abs. 4 Buchst. d, § 34 NISG 2026 und Handbuch F1: einen Monat nach der Meldung. Folge nur eine zu frühe Meldung, daher C.
- **Schwere:** C
- **Korrektur EN:** „final report within one month of the notification“
- **Korrektur DE:** „Abschlussbericht (bzw. Abschlussmeldung) binnen eines Monats nach der Meldung“

### 13. Handbuch 4.1 beschreibt den alten Schritt 2 der Karte
- **Datei, Zeile:** `handbook.en.md:411`, `handbook.de.md:411`.
- **Zitat:** „disconnect, do not delete and do not plug in the backup, call, write down“ / „nicht löschen und die Sicherung nicht anstecken“
- **Problem:** Die Karte sagt seit A4 Nr. 11 „Stop the backup jobs and disconnect the NAS or backup disk from the network“.
- **Schwere:** C
- **Korrektur EN:** „disconnect; do not delete, stop the backup jobs and disconnect the backup from the network; call; write down“
- **Korrektur DE:** „trennen; nicht löschen, Sicherungsaufträge stoppen und die Sicherung vom Netz trennen; anrufen; aufschreiben“

### 14. Handbuch D2: „macht aus dem Test die Antwort auf D3“
- **Datei, Zeile:** `handbook.en.md:221`, `handbook.de.md:221`.
- **Zitat:** „Noting the duration is our addition; it turns the test into the answer to D3.“
- **Problem:** Nach B-20 misst der Test die Wiederanlaufzeit, D3 ist die tolerierbare Ausfallzeit; das Glossar trennt beides.
- **Schwere:** C
- **Korrektur EN:** „Noting the duration is our addition; it shows whether the IT is back within the time the business can bridge (D3).“
- **Korrektur DE:** „Die notierte Dauer ist unser Zusatz; sie zeigt, ob die IT innerhalb der Zeit wieder läuft, die der Betrieb überbrücken kann (D3).“

### 15. Tool: neue Fehlalarme „behindert“ und „Schwarztee“ auf Rot
- **Datei, Zeile:** `personal.js:15` (`'arzt\\p{L}*'`, `'behinder\\p{L}*'` ohne Wortanfang).
- **Zitat (Test):** „Der Stau behindert den Verkehr“ → `[HEALTH]`, rot; „Wir trinken Schwarztee“ → `[HEALTH]`, rot.
- **Problem:** Das Verb „behindern“ ist in Betriebstexten häufig; Rot ohne Gesundheitsbezug untergräbt die Ampel (vgl. A5 Nr. 39).
- **Schwere:** C
- **Korrektur:** `behinderung\p{L}*` und `${B}Schwerbehind\p{L}*` als Gesundheitswort, `${B}behindert\p{L}*${E}` nur in `HEALTH_MAYBE` (gelb); `(?<!schw)arzt\p{L}*`. Grenzen-Text EN und DE: „Behinder…“ durch „Behinderung“ ersetzen.

### 16. Grenzen-Text nennt zweiteilige Straßennamen als Lücke, die es nicht mehr gibt
- **Datei, Zeile:** `site/src/pages/tools.mjs:88`, `:170`.
- **Zitat:** „… or a two-part street name can stay unmarked.“ / „… oder ein zweiteiliger Straßenname kann unmarkiert bleiben.“
- **Problem:** Seit A5 Nr. 37 werden „Wiener Straße 4“, „Lange Gasse 7/3“, „Am Graben 3“ erkannt (getestet).
- **Schwere:** C
- **Korrektur EN:** „… or an address without a house number can stay unmarked.“
- **Korrektur DE:** „… oder eine Anschrift ohne Hausnummer kann unmarkiert bleiben.“

### 17. Produktseite DE: Abschnitt D heißt noch „Sicherung und Betrieb“
- **Datei, Zeile:** `site/src/pages/product-security.mjs:65`; ebenso Vorschaubild `site/src/pages/paper.mjs:49`.
- **Zitat:** „Organisation, Zugang und Identität, Sicherung und Betrieb, …“
- **Problem:** D1 heißt seit A4 Nr. 33 „D · Sicherung und Wiederanlauf“.
- **Schwere:** C
- **Korrektur EN:** keine (EN „backup and continuity“ passt).
- **Korrektur DE:** „Sicherung und Wiederanlauf“ an beiden Stellen.

### 18. Vorschauseite: „from forty answers“
- **Datei, Zeile:** `site/src/pages/toolkit-preview.mjs:13` (EN), `:22` (DE).
- **Zitat:** „generated for your business from forty answers“ / „aus vierzig Antworten für Ihren Betrieb erzeugt“
- **Problem:** Die Schritte darunter sagen 47 Fragen. Außerdem gilt „Four honest answers per question“ (Zeile 15, 24) nur für die 24 Statusfragen.
- **Schwere:** C
- **Korrektur EN:** „generated for your business from your answers to forty-seven questions“; Schritt: „Four honest answers per status question: …“
- **Korrektur DE:** „aus Ihren Antworten auf siebenundvierzig Fragen für Ihren Betrieb erzeugt“; Schritt: „Vier ehrliche Antworten je Statusfrage: …“

### 19. Produktseite D3: Kontakte für Deutschland sind teils Lücken
- **Datei, Zeile:** `product-security.mjs:29` (EN), `:67` (DE).
- **Zitat:** „Contacts for Austria and Germany, checked at the originals.“
- **Problem:** Für Deutschland stehen BSI Service-Center und 110/112 auf der Karte; ZAC und Landesdatenschutzbehörde sind gelbe Felder zum Ausfüllen (A4 Nr. 7, teilweise).
- **Schwere:** C
- **Korrektur EN:** „Contacts for Austria checked at the originals; for Germany the BSI Service-Center and the police numbers, with the ZAC and the data protection authority of your federal state to fill in.“
- **Korrektur DE:** „Kontakte für Österreich am Original geprüft; für Deutschland BSI Service-Center und Polizeinotruf, ZAC und Landesdatenschutzbehörde Ihres Bundeslands tragen Sie ein.“

### 20. D1: I4 steht vor I3
- **Datei, Zeile:** `site/src/toolkit/documents/security/self-declaration.mjs:172`, `:173`.
- **Zitat:** D1 S. 3 „I4 · Review of this self-declaration“ vor „I3 · First measures by“.
- **Problem:** Reihenfolge der Kennungen, die A4 Nr. 13 gerade sichtbar gemacht hat.
- **Schwere:** C
- **Korrektur EN und DE:** die beiden `items.push` tauschen.

### 21. Memos: „Sources checked: 19 October 2026“, obwohl Quellen am 23.10. erneut gelesen wurden
- **Datei, Zeile:** `nis2.mjs:73`, `labelling.mjs:47`, `login.mjs:50`, `start.mjs:40` (`sourcesDate`), angezeigt über `shared.mjs:79` und `pages.mjs:100`.
- **Zitat:** „Sources checked: 19 October 2026“ / „Quellen geprüft: 19. Oktober 2026“
- **Problem:** Kopf des Memos und einzelne Quellenzeilen („retrieved 2026-10-23“) widersprechen sich.
- **Schwere:** C
- **Korrektur EN:** Feld zu „Sources checked: 19 October 2026; corrected points 23 October 2026“ (neues Feld `sourcesUpdated`).
- **Korrektur DE:** „Quellen geprüft: 19. Oktober 2026; berichtigte Stellen 23. Oktober 2026“.

### 22. Handbuch Abschnitt 6: Spaltenkopf „Status on 19 October 2026“
- **Datei, Zeile:** `handbook.en.md:461`, `handbook.de.md:461`; Einleitung Zeile 459.
- **Zitat:** „| No. | Question | Status on 19 October 2026 |“
- **Problem:** Einträge 6.3, 6.13, 6.21, 6.23 tragen Stand 23.10.; Produkt- und Startseite sagen „as of 23 October 2026“.
- **Schwere:** C
- **Korrektur EN:** „Status on 23 October 2026“; Einleitung „… checked again at the originals on 19 October 2026, the corrected points on 23 October 2026; …“
- **Korrektur DE:** „Stand 23. Oktober 2026“; Einleitung entsprechend.

## Stand der A-Befunde im Einzelnen

| Befund | Stand im Commit |
|---|---|
| A2 A-1 Art. 32 DSGVO | behoben, Wortlaut EN und DE am Amtsblatt bestätigt |
| A2 A-2 Versicherer „unverzüglich, spätestens eine Woche“ | behoben in 1.4, F1, 4.2 |
| A2 A-3 Frühwarnung an CSIRT | behoben in F1, 4.2, Glossar, Karte AT/DE/EU; Monatsfrist auf der Karte unscharf (Problem 12) |
| A2 A-4 DORA nur für IKT | behoben in 1.3 und D6 Teil B; Folgefehler im Brief (Problem 5) |
| A4 Nr. 1 „(c)“ | im Druck behoben; Website offen (Problem 8) |
| A4 Nr. 2 Nachweise „vorhanden“ | behoben, D4 zeigt „in place: file the evidence“ ohne Nummer |
| A4 Nr. 3 NIS-2-Zeile der Karte | behoben, je Land |
| A4 Nr. 4 Karte eine Seite | behoben, PDF und DOCX je 1 Seite (Word gezählt) |
| A4 Nr. 5 Vertragsvariante | behoben wie formuliert |
| A4 Nr. 6 D1 und D5 versendbar | behoben; Muster absichtlich Entwurf, ausgefüllt vollständig |
| A4 Nr. 7 Karte DE und EU | teilweise wie formuliert; EU-Link tot (Problem 6) |
| A5 Nr. 1, 2, 20, 26 Memo-Logik und Titel | behoben, durchgerechnet |
| A5 Nr. 33, 34, 35 Tool | behoben für alle Teststrings; Restlücken Problem 11 und 15 |
| A5 Nr. 42 „einunddreißig Fragen“ | Seiten behoben, Checkout nicht (Problem 1) |
| A5 Nr. 45 „zehn Bereiche“ | behoben, mit Quelle |
