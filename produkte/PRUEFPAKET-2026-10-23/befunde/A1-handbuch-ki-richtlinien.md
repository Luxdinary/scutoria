# A1 · Handbuch KI-Richtlinien-Toolkit · Prüfbefunde

Prüfdatum 23. Oktober 2026. Geprüft wurden `site/content/toolkits/ai-policy/handbook.en.md` und `handbook.de.md` (beide 450 Zeilen, Zeilennummern sind in EN und DE gleich), `questions.json` (Hilfetexte), `produkte/ai-policy-toolkit/quellen.md` und die gerenderten PDFs `ai-policy-handbook-en.pdf` (24 Seiten) und `-de.pdf` (25 Seiten). Nichts im Projekt wurde geändert.

## Kurzfassung

- **Geprüft:** rund 157 Einzelaussagen (34 Fakt-Blöcke mit oft mehreren Aussagen, 17 Auslegungen, 6 Unsicher-Stellen, 4 Lücken, 36 Quellenzeilen, Glossar, 13 Quellenangaben in Abschnitt 10, 17 offene Punkte, 11 Hilfetexte mit Sachaussagen in `questions.json`). Jede Quelle wurde heute am Original geöffnet.
- **Bestätigt ohne Befund:** rund 136 Aussagen, wörtlich oder sinngleich. Alle Zahlen, Daten, Artikel und Randnummern stimmen zwischen EN und DE überein; die Marker stehen in beiden Fassungen an denselben Stellen.
- **Mit Befund:** 21 Aussagen, dazu Lücken, Lesbarkeit und Layout. **28 Befunde: A 3 · B 10 · C 15.**
- **Hausregeln:** keine Gedankenstriche, keine Ausrufezeichen, keine verbotenen Versprechen („compliant“, „certified“, „secure“, „safe“ usw. kommen nur verneint vor). Offene Frage zur Anrede siehe C-15.

Die drei A-Befunde in einem Satz: Die Änderungsgeschichte von Art. 4 ist falsch dargestellt (A-1); das WKO-Muster hat zehn, nicht neun Paragrafen, und sein Paragraf 10 empfiehlt genau die Freigabe, für die das Handbuch „keine Quelle“ meldet (A-2); beim Meldeweg fehlt die 72-Stunden-Meldepflicht der DSGVO (A-3).

**Empfehlung:** A-1 bis A-3 und B-1, B-6, B-10 vor dem Verkauf beheben; sie sind klein im Umfang. Die übrigen B- und C-Punkte im selben Durchgang mitnehmen, wenn das Handbuch ohnehin neu gerendert wird.

**Arbeitsweg:** EUR-Lex lieferte über WebFetch eine leere Seite (Browser-Prüfung), deshalb alle Rechtstexte im eingebauten Browser geöffnet und den Text aus der Seite gelesen. PDFs (Leitlinien, DSK, BSI, WKO) in einen eigenen Scratch-Ordner geladen und seitenweise durchsucht. Der Sage-Hook hat einen Abruf von rtr.at als mögliche Prompt-Injection markiert (Risiko 80,4 %); blockiert wurde nichts, die Seite enthielt keine Anweisungen. Die Browserleiste wurde zwischendurch von einem anderen Agenten benutzt; ich habe danach in einem eigenen Tab gearbeitet und jede Auslesung am Seitentitel gegengeprüft.

---

## Befunde

### A-1 · Art. 4: Änderung durch die Verordnung (EU) 2026/1744 falsch beschrieben

- **Ort:** beide Handbücher, Abschnitt 4 „Training: Article 4 of the AI Act“ / „Schulung: Artikel 4“, Zeile 183; Folgestellen Zeile 211 (WKO-Absatz in Abschnitt 4) und Zeile 318 (7.1 Österreich).
- **Zitat:** „The second sentence was added by Regulation (EU) 2026/1744, in force since 27 July 2026.“ · Zeile 211: „Article 4 asks to support, excludes a guaranteed level, and has applied since 2 February 2025“.
- **Befund:** Die Änderungsverordnung hat Art. 4 nicht um einen Satz ergänzt, sondern **vollständig ersetzt**. Bis 26. Juli 2026 verlangte Satz 1 Maßnahmen, um „nach besten Kräften sicherzustellen“, dass das Personal „über ein ausreichendes Maß an KI-Kompetenz verfügen“; erst seit 27. Juli 2026 heißt es „zu unterstützen“, dazu kamen Satz 2 und die neuen Absätze 2 und 3. Das Handbuch erweckt den Eindruck, die Unterstützungspflicht gelte in dieser Form seit 2. Februar 2025. Folge: Die Kritik an der WKO („Sicherstellung“) trifft nur halb. Die WKO gab den bis 26. Juli 2026 geltenden Wortlaut richtig wieder; überholt ist er erst seit 27. Juli 2026. Falsch war von Anfang an nur „seit Ende 2025“.
- **Schwere:** A (Fakt-Marker, irreführend).
- **Quelle:** EUR-Lex, Originalfassung, `eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689`, Art. 4: „Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff …“; DE-Fassung `…/DE/TXT/HTML/?uri=CELEX:32024R1689`: „… um nach besten Kräften sicherzustellen, dass ihr Personal … über ein ausreichendes Maß an KI-Kompetenz verfügen …“. ELI `eur-lex.europa.eu/eli/reg/2026/1744/oj/eng`, Art. 1 Nr. 5: „Article 4 is replaced by the following“. Dokumentinfo `…/EN/ALL/?uri=CELEX:32024R1689`: „Modified by 32026R1744 Replacement article 4 27/07/2026“. Konsolidierte Fassung 02024R1689-20260727, Art. 4 Abs. 1 bis 3 mit Marker M1. Alle Abruf 23.10.2026.
- **Korrektur EN (Zeile 183, die letzten beiden Sätze ersetzen):** „Article 4 has applied since 2 February 2025. Regulation (EU) 2026/1744 replaced the whole article with effect from 27 July 2026. Until 26 July 2026 the first sentence required measures "to ensure, to their best extent, a sufficient level of AI literacy"; since 27 July 2026 it requires measures "to support the development of AI literacy", the second sentence rules out a guaranteed level, and the new paragraphs 2 and 3 oblige the Commission and the Member States to support providers and deployers, in particular SMEs.“ Quelle: „Regulation (EU) 2024/1689, Art. 4 in the original version (OJ L, 2024/1689, 12.7.2024) and in the consolidated version of 27 July 2026; Regulation (EU) 2026/1744, Art. 1, point (5) · EUR-Lex · retrieved 2026-10-23“.
  Zeile 211, letzter Teil: „The description of the duty on the same page reproduces the wording that applied until 26 July 2026 ("ensure") and has been out of date since 27 July 2026. Its date "since the end of 2025" was never right: Article 4 has applied since 2 February 2025, as the chamber's own page 33 says.“ Zeile 318 entsprechend.
- **Korrektur DE (Zeile 183):** „Der Artikel gilt seit dem 2. Februar 2025. Die Verordnung (EU) 2026/1744 hat ihn mit Wirkung ab dem 27. Juli 2026 vollständig ersetzt. Bis zum 26. Juli 2026 verlangte der erste Satz Maßnahmen, „um nach besten Kräften sicherzustellen“, dass das Personal „über ein ausreichendes Maß an KI-Kompetenz“ verfügt; seit dem 27. Juli 2026 verlangt er Maßnahmen, um die Entwicklung der KI-Kompetenz „zu unterstützen“, der zweite Satz schließt ein garantiertes Niveau aus, und die neuen Absätze 2 und 3 verpflichten Kommission und Mitgliedstaaten, Anbieter und Betreiber, insbesondere KMU, zu unterstützen.“ Zeile 211: „Die Beschreibung der Pflicht auf derselben Seite gibt den bis zum 26. Juli 2026 geltenden Wortlaut wieder („Sicherstellung“) und ist seit dem 27. Juli 2026 überholt. Die Angabe „seit Ende 2025“ war nie richtig: Artikel 4 gilt seit dem 2. Februar 2025, wie die Kammer auf Seite 33 selbst schreibt.“ Zeile 318 entsprechend.

### A-2 · WKO-Muster: zehn Paragrafen, und Paragraf 10 empfiehlt die Freigabe nach außen

- **Ort:** beide Handbücher, Abschnitt 1, Zeile 36; 7.1, Zeile 318; 2.6, Zeile 119 (Marker Lücke); 8, Zeile 362 (Punkt 8.8). Außerdem `quellen.md`, Q9 („#1 bis #9“).
- **Zitat:** „a free model policy for employees with nine numbered paragraphs“ · Zeile 119: „[GAP] No source we read requires a release by a second person.“ · 8.8: „No source requires either.“
- **Befund:** Das Muster „Richtlinien für Mitarbeitende“ hat die Paragrafen #1 bis #10. #10 steht auf S. 27, also innerhalb der zitierten Seiten 14 bis 27, und regelt die Freigabe KI-generierter externer Kommunikation (E-Mails, Angebote, Verträge, Marketing) durch eine qualifizierte Person vor dem Versand; die Tipps dazu verlangen, festzulegen, wer wofür freigabeberechtigt ist. Die PDF-Datei ist dieselbe, die am 18.10. gelesen wurde (erzeugt 3.7.2026, laut Metadaten). Die Zahl ist also falsch, und der Lücke-Marker in 2.6 sowie 8.8 übersehen die einzige gelesene Quelle, die § 6 der Richtlinie stützt. Das ist keine Rechtspflicht, aber eine fachliche Empfehlung derselben Art wie DSK und BSI, auf die sich das Handbuch sonst stützt.
- **Schwere:** A (Fakt falsch; Marker falsch).
- **Quelle:** `wko.at/noe/digitalisierung/ki-guidelines/ki-guidelines.pdf`, 3. Auflage April 2026, S. 14 (#1), 16 (#2), 17 (#3), 19 (#4), 20 (#5), 22 (#6), 23 (#7), 24 (#8), 25 (#9), 27 (#10 „Besondere Sorgfalt bei externer Kommunikation“: KI-generierte externe Kommunikation „muss von einer qualifizierten Person freigegeben werden, bevor sie versendet wird“), Abruf 23.10.2026.
- **Korrektur EN:** Zeile 36: „… a free model policy for employees with ten numbered paragraphs (#1 to #10) …“; Zeile 318: „… a model policy for employees in ten paragraphs from page 14.“ Zeile 119 ersetzen: „[INTERPRETATION] No law we read requires a release by a second person. The Austrian Economic Chamber recommends it in its model paragraph 10: AI-generated external communication is released by a qualified person before it is sent, and the business sets who may release what. That is professional practice, not law. The section is the organisational counterpart of the review duty: whoever drops it puts the whole review on the author. The business may remove the section; the handbook only says what that means.“ Quelle: „Wirtschaftskammer Österreich, KI-Guidelines für KMU, 3rd edition, April 2026, p. 27 · wko.at · retrieved 2026-10-23“. 8.8 Status: „No law requires either. The chamber's model (#10) recommends the release; the reporting channel rests on interpretation and on the GDPR duties in section 2.8.“
- **Korrektur DE:** Zeile 36: „… ein kostenloses Muster „Richtlinien für Mitarbeitende“ mit zehn nummerierten Paragrafen (#1 bis #10).“ Zeile 318 entsprechend. Zeile 119: „[AUSLEGUNG] Kein Gesetz, das wir gelesen haben, verlangt eine Freigabe durch eine zweite Person. Die Wirtschaftskammer Österreich empfiehlt sie in ihrem Musterparagrafen #10: KI-generierte externe Kommunikation gibt vor dem Versand eine qualifizierte Person frei, und der Betrieb legt fest, wer was freigeben darf. Das ist fachlicher Stand, kein Recht. Der Paragraf ist die organisatorische Entsprechung zur Prüfpflicht …“ (Rest wie bisher), Quelle „Wirtschaftskammer Österreich, KI-Guidelines für KMU, 3. Auflage, April 2026, S. 27 · wko.at · Abruf 2026-10-23“. 8.8: „Kein Gesetz verlangt beides. Das Kammer-Muster (#10) empfiehlt die Freigabe; der Meldeweg stützt sich auf Auslegung und auf die DSGVO-Pflichten in Abschnitt 2.8.“ In `quellen.md` Q9 „#1 bis #10“.

### A-3 · Meldung von Vorfällen: die DSGVO-Meldepflicht binnen 72 Stunden fehlt

- **Ort:** beide Handbücher, 2.8 „Reporting incidents (§ 8)“, Zeilen 129 bis 131; 8.8, Zeile 362; `questions.json` A7 (Zeile 56 ff.).
- **Zitat:** „[INTERPRETATION] No source we read requires such a channel.“
- **Befund:** Der typische Vorfall im Beispielbetrieb (Kundendaten über das private Konto eines Monteurs in einem Assistenten) kann eine Verletzung des Schutzes personenbezogener Daten sein, nämlich eine „unbefugte Offenlegung“. Dann muss der Betrieb als Verantwortlicher unverzüglich und möglichst binnen 72 Stunden die Aufsichtsbehörde informieren, außer es besteht voraussichtlich kein Risiko, und jede Verletzung dokumentieren. Das Handbuch behandelt die Meldung rein intern; wer ihm folgt, kann die Frist verpassen. Ob eine bestimmte Eingabe eine solche Verletzung ist, ist Einzelfallprüfung (Stand prüfen).
- **Schwere:** A (rechtlich riskante Lücke).
- **Quelle:** EUR-Lex, DSGVO konsolidiert 02016R0679-20160504 (aktuelle konsolidierte Fassung laut Dokumentinfo), Art. 4 Nr. 12: „a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data transmitted, stored or otherwise processed“; Art. 33 Abs. 1: „without undue delay and, where feasible, not later than 72 hours after having become aware of it … unless the personal data breach is unlikely to result in a risk“; Art. 33 Abs. 5: „The controller shall document any personal data breaches …“. Abruf 23.10.2026.
- **Korrektur EN (nach dem „What it rules“-Absatz von 2.8 einfügen):** „[FACT] If personal data reach a tool or account the business has not approved, this can be a personal data breach, which the GDPR defines as "a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data". The controller notifies the supervisory authority "without undue delay and, where feasible, not later than 72 hours after having become aware of it", unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons, and documents every breach with its facts, effects and the remedial action taken.“ Quelle: „Regulation (EU) 2016/679, Art. 4(12), Art. 33(1) and (5) · EUR-Lex · retrieved 2026-10-23“. Dann: „[INTERPRETATION] Whether a given input is such a breach is decided case by case. The report under § 8 is the moment the business learns of it: the person named in question A7 records the case the same day and decides, with a specialist where needed, whether the authority must be notified within the 72 hours. No source we read requires an internal channel in these words; the duties above presuppose one. A business that punishes the report learns about incidents last …“ (Rest wie bisher).
- **Korrektur DE:** „[FAKT] Gelangen personenbezogene Daten in ein Tool oder Konto, das der Betrieb nicht freigegeben hat, kann das eine Verletzung des Schutzes personenbezogener Daten sein, also „eine Verletzung der Sicherheit, die, ob unbeabsichtigt oder unrechtmäßig, zur Vernichtung, zum Verlust, zur Veränderung, oder zur unbefugten Offenlegung von beziehungsweise zum unbefugten Zugang zu personenbezogenen Daten führt“. Der Verantwortliche meldet sie „unverzüglich und möglichst binnen 72 Stunden“, nachdem sie ihm bekannt wurde, der zuständigen Aufsichtsbehörde, es sei denn, sie führt voraussichtlich nicht zu einem Risiko für die Rechte und Freiheiten natürlicher Personen, und er dokumentiert jede Verletzung mit Fakten, Auswirkungen und Abhilfemaßnahmen.“ Quelle „Verordnung (EU) 2016/679, Art. 4 Nr. 12, Art. 33 Abs. 1 und 5 · EUR-Lex · Abruf 2026-10-23“. „[AUSLEGUNG] Ob eine bestimmte Eingabe eine solche Verletzung ist, wird im Einzelfall entschieden. Die Meldung nach § 8 ist der Zeitpunkt, an dem der Betrieb davon erfährt: Die in Frage A7 genannte Person hält den Fall am selben Tag fest und entscheidet, wenn nötig mit einer Fachperson, ob innerhalb der 72 Stunden an die Behörde gemeldet werden muss. Keine Quelle verlangt einen internen Meldeweg mit diesen Worten; die Pflichten oben setzen ihn voraus …“. Den A7-Hilfetext um „Personal data may have to be reported to the authority within 72 hours“ / „Personenbezogene Daten können binnen 72 Stunden meldepflichtig sein“ ergänzen.

### B-1 · Kommissionsseite zur KI-Kompetenz: Widerspruch inzwischen behoben, Datum veraltet

- **Ort:** beide Handbücher, Abschnitt 4, Zeilen 187 bis 189 („page dated 27 July 2026“), Zeilen 203 bis 205 (Marker Unsicher), 8.15 (Zeile 369), Quellen Nr. 6 (Zeile 437).
- **Zitat:** „The Commission's page says in one answer "The supervision and enforcement rules apply from 3 August 2026 onwards" and in another "as of 2 August 2026".“
- **Befund:** Die Seite trägt jetzt „Last update 20 October 2026“ und nennt an beiden Stellen nur noch den 2. August 2026. Der Unsicher-Block und 8.15 sind damit überholt; das Seitendatum stimmt nicht mehr.
- **Schwere:** B (veraltet).
- **Quelle:** `digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers`, Abruf 23.10.2026: „The supervision and enforcement rules apply from 2 August 2026 onwards.“ und „… will start supervising and enforcing the rules as of 2 August 2026.“; Fußzeile „Last update 20 October 2026“.
- **Korrektur EN:** Zeile 203: „[FACT] Supervision of Article 4 starts with the general application of the AI Act. The Commission's page says: "The supervision and enforcement rules apply from 2 August 2026 onwards." The Regulation itself applies from 2 August 2026 … (Rest unverändert, ohne den letzten Satz)“. Quellen „page last updated 20 October 2026 · retrieved 2026-10-23“. 8.15: „Resolved on 23 October 2026: the page, updated on 20 October 2026, gives 2 August 2026 in both answers.“
- **Korrektur DE:** Zeile 203: „[FAKT] Die Aufsicht über Artikel 4 beginnt mit der allgemeinen Geltung der KI-Verordnung. Die Seite der Kommission sagt: „The supervision and enforcement rules apply from 2 August 2026 onwards.“ Die Verordnung selbst gilt ab dem 2. August 2026 …“. Quellen „Seitenstand 20. Oktober 2026 · Abruf 2026-10-23“. 8.15: „Erledigt am 23. Oktober 2026: Die Seite nennt seit ihrer Aktualisierung vom 20. Oktober 2026 an beiden Stellen den 2. August 2026.“

### B-2 · Art. 50 Abs. 6 sagt nicht, was das Handbuch ihm zuschreibt

- **Ort:** beide Handbücher, Abschnitt 5, Zeilen 270 bis 272.
- **Zitat:** „[FACT] … Paragraphs 1 to 4 are without prejudice to other transparency obligations in Union or national law, and data protection, competition law, personality rights and copyright remain unaffected. Source: … Art. 50(6)“.
- **Befund:** Art. 50 Abs. 6 sagt nur: Abs. 1 bis 4 lassen Kapitel III unberührt und berühren andere Transparenzpflichten für Betreiber nicht. Datenschutz, Urheberrecht, Persönlichkeitsrechte und irreführende Werbung stehen in den Leitlinien Rn. 127 bis 129. Inhalt richtig, Quelle falsch.
- **Schwere:** B (unbelegt an der genannten Stelle).
- **Quelle:** EUR-Lex konsolidiert 02024R1689-20260727, Art. 50 Abs. 6: „Paragraphs 1 to 4 shall not affect the requirements and obligations set out in Chapter III, and shall be without prejudice to other transparency obligations laid down in Union or national law for deployers of AI systems.“ Leitlinien C(2026) 5054, Rn. 127 (Datenschutzrecht bei identifizierbaren Personen), Rn. 128 (Marken- und Urheberrecht), Rn. 129 (Persönlichkeitsrechte; Kennzeichnung erlaubt keine rechtswidrigen Deepfakes, etwa irreführende Werbung), PDF `ec.europa.eu/newsroom/dae/redirection/document/131215`, S. 40 bis 41, Abruf 23.10.2026.
- **Korrektur EN:** „[FACT] Paragraphs 1 to 4 do not affect the requirements of Chapter III and are without prejudice to other transparency obligations for deployers in Union or national law.“ Quelle Art. 50(6). „[FACT] The guidelines add that a label does not make a deep fake lawful: data protection law, trademark and copyright law, personality rights and the rules against misleading advertising continue to apply.“ Quelle „Guidelines C(2026) 5054, points 127 to 129 · retrieved 2026-10-23“.
- **Korrektur DE:** „[FAKT] Die Absätze 1 bis 4 lassen die Anforderungen des Kapitels III unberührt und berühren andere Transparenzpflichten für Betreiber im Unionsrecht oder im nationalen Recht nicht.“ „[FAKT] Die Leitlinien ergänzen, dass eine Kennzeichnung einen Deepfake nicht rechtmäßig macht: Datenschutzrecht, Marken- und Urheberrecht, Persönlichkeitsrechte und die Regeln gegen irreführende Werbung gelten weiter.“ Quelle „Leitlinien C(2026) 5054, Rn. 127 bis 129 · Abruf 2026-10-23“.

### B-3 · DSK 2.5 nennt die Voreinstellungen als Beispiel, nicht als Rat

- **Ort:** beide Handbücher, Abschnitt 3, Zeile 167; Glossar „Input history / Eingabe-Historie“, Zeile 393.
- **Zitat:** „The data protection authorities advise that … the functions … should be set …“ · DE „Die Datenschutzaufsicht rät, dass …“; Glossar „The guidance recommends switching it off“.
- **Befund:** Die DSK schreibt im Abschnitt zu Art. 25 DSGVO: „Zum Beispiel können für Accounts …“ die Funktionen so gewählt werden. Es ist ein Beispiel für Datenschutz durch Voreinstellung, keine ausdrückliche Empfehlung. Der zweite Teil („dürfen … nicht automatisch veröffentlicht werden“) ist dagegen verbindlich formuliert und richtig wiedergegeben.
- **Schwere:** B (ungenau unter Fakt-Marker).
- **Quelle:** DSK, Orientierungshilfe KI und Datenschutz, Version 1.0 vom 6.5.2024, Abschnitt 2.5, S. 11, `datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf`, Abruf 23.10.2026.
- **Korrektur EN:** „[FACT] As an example of data protection by design and by default under Article 25 GDPR, the data protection authorities name accounts for employees whose functions for training and input history are set when the account is put into operation so that no inputs are processed for training and no input history is kept beyond the session. Outputs belonging to the account must not be published automatically.“ Glossar: „The guidance names switching it off beyond the session, when the account is set up, as an example of privacy-friendly default settings.“
- **Korrektur DE:** „[FAKT] Als Beispiel für Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen nach Art. 25 DSGVO nennt die Datenschutzaufsicht, dass für Accounts, die Beschäftigte nutzen sollen, „die Funktionen zur Nutzung von Eingaben für das KI-Training und zur Eingabe-Historie bereits bei Inbetriebnahme eines Accounts so gewählt werden“ können, dass keine Eingabedaten zu Trainingszwecken verarbeitet werden und keine Eingabe-Historie über die Sitzung hinaus gespeichert wird. Zum Account gehörende Ausgaben dürfen nicht automatisch veröffentlicht werden.“ Glossar: „Die Orientierungshilfe nennt das Abschalten über die Sitzung hinaus bei der Einrichtung des Kontos als Beispiel für datenschutzfreundliche Voreinstellungen.“

### B-4 · DSK 1.9: Training ist „vorzugswürdig“, nicht „entscheidend“

- **Ort:** beide Handbücher, 2.4, Zeile 99.
- **Zitat:** „The guidance also treats the question whether the provider trains on the inputs as decisive for the choice of tool.“
- **Befund:** DSK 1.9 verlangt zu prüfen, ob Ein- und Ausgaben zum Training verwendet werden und ob das abwählbar ist; ist das nicht möglich und sind personenbezogene Daten betroffen, braucht auch dieser Zweck eine Rechtsgrundlage; „Datenschutzrechtlich vorzugswürdig“ sind Anwendungen ohne Training. „Entscheidend“ steht dort nicht. Der erste Satz des Blocks (Rechtsgrundlage für Eingabe und Übermittlung) ist durch 3.1, S. 12 belegt.
- **Schwere:** B (überzeichnet unter Fakt-Marker).
- **Quelle:** DSK, Orientierungshilfe vom 6.5.2024, Abschnitt 1.9, S. 7; Abschnitt 3.1, S. 12, Abruf 23.10.2026.
- **Korrektur EN:** „The guidance asks to check whether inputs and outputs are used for training and whether this can be excluded; where it cannot and personal data are concerned, that purpose needs a legal basis too. Applications that do not use inputs and outputs for training are, in its words, preferable from a data protection point of view.“
- **Korrektur DE:** „Die Orientierungshilfe verlangt zu prüfen, ob Ein- und Ausgaben zum Training verwendet werden und ob sich das ausschließen lässt; ist das nicht möglich und sind personenbezogene Daten betroffen, braucht auch dieser Zweck eine Rechtsgrundlage. Datenschutzrechtlich „vorzugswürdig“ sind Anwendungen, die Ein- und Ausgaben nicht zum Training verwenden.“

### B-5 · Festes Verbot in § 2: die heute geltende Grundlage fehlt

- **Ort:** beide Handbücher, 2.2, Zeilen 71 bis 81.
- **Zitat:** „One prohibition is fixed … no final decision about a person is based on an AI result.“ Begründet wird nur mit Anhang III (Pflichten ab 2.12.2027).
- **Befund:** Die Regel stützt sich schon heute auf Art. 22 Abs. 1 DSGVO; die DSK leitet daraus in 1.6 ab, dass der entscheidende Mensch echten Entscheidungsspielraum braucht und eine bloß formelle Beteiligung nicht reicht, mit dem Beispiel einer KI, die Bewerbungen auswertet und selbst zu Gesprächen einlädt (Verstoß gegen Art. 22 Abs. 1). Ohne diesen Bezug wirkt das Verbot wie Vorsorge für 2027.
- **Schwere:** B (unvollständig belegt).
- **Quelle:** EUR-Lex, DSGVO Art. 22 Abs. 1: „The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her.“ DSK, Orientierungshilfe vom 6.5.2024, Abschnitt 1.6, S. 5. Abruf 23.10.2026.
- **Korrektur EN (neuer Block vor der Auslegung in 2.2):** „[FACT] The fixed prohibition also rests on law that applies today. The GDPR gives every person "the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her". The German data protection authorities add that the person deciding must have real room for decision and that a merely formal human involvement is not enough; an AI application that evaluates all applications and sends interview invitations on its own breaches this rule.“ Quelle „Regulation (EU) 2016/679, Art. 22(1) · EUR-Lex; Datenschutzkonferenz, Orientierungshilfe of 6 May 2024, section 1.6, p. 5 · retrieved 2026-10-23“.
- **Korrektur DE:** „[FAKT] Das feste Verbot stützt sich auch auf Recht, das heute gilt. Nach der DSGVO hat jede Person das Recht, keiner ausschließlich auf automatisierter Verarbeitung, einschließlich Profiling, beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber „rechtliche Wirkung entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt“. Die deutsche Datenschutzaufsicht ergänzt, dass der entscheidende Mensch einen tatsächlichen Entscheidungsspielraum braucht und eine lediglich formelle Beteiligung nicht genügt; eine KI, die alle Bewerbungen auswertet und selbstständig zu Gesprächen einlädt, verstößt gegen diese Regel.“ Quelle „Verordnung (EU) 2016/679, Art. 22 Abs. 1 · EUR-Lex; Datenschutzkonferenz, Orientierungshilfe vom 6. Mai 2024, Abschnitt 1.6, S. 5 · Abruf 2026-10-23“. Hinweis: Der amtliche deutsche Wortlaut enthält Gedankenstriche; deshalb hier als Teilzitat.

### B-6 · Neues Verbot ab 2. Dezember 2026 fehlt

- **Ort:** beide Handbücher, 2.2 (Zeilen 77 bis 79), Abschnitt 5 Punkt „key dates / Stichtage“ der Checkliste (Zeile 241); Glossar.
- **Befund:** Die Verordnung (EU) 2026/1744 hat in Art. 5 Abs. 1 die Buchstaben ba und bb eingefügt; sie gelten ab 2. Dezember 2026, also in sechs Wochen. Verboten ist dann auch die **Verwendung** eines KI-Systems, das realistische intime Darstellungen einer bestimmbaren Person ohne deren ausdrückliche Zustimmung erzeugt (ba), sowie die Erzeugung von Material über sexuellen Kindesmissbrauch (bb). Für einen Betrieb mit Bildgenerator (Beispielbetrieb: G2 = ja) gehört das in § 2 und in die Stichtage; es ist das einzige neue Verbot, das Betreiber betrifft.
- **Schwere:** B (fehlende Frist).
- **Quelle:** EUR-Lex konsolidiert 02024R1689-20260727, Art. 5 Abs. 1 Unterabs. 1 Buchst. ba und bb (Marker M1); Art. 113 Buchst. a: „… with the exception of Article 5(1), first subparagraph, points (ba) and (bb), and Article 5(1a) and (1b) which shall apply from 2 December 2026“. Abruf 23.10.2026.
- **Korrektur EN (an Zeile 77 anhängen):** „From 2 December 2026 it is also prohibited to use an AI system that generates or manipulates realistic images, videos, audio or similar material of an identifiable natural person's intimate parts, or of an identifiable natural person engaged in sexually explicit activities, without that person's freely given, specific, informed, unambiguous and explicit consent; point (bb) adds child sexual abuse material.“ Quelle „Regulation (EU) 2024/1689, Art. 5(1), first subparagraph, points (ba) and (bb), and Art. 113, point (a), consolidated version of 27 July 2026 · EUR-Lex · retrieved 2026-10-23“. In D5 unter Stichtage aufnehmen.
- **Korrektur DE:** „Ab dem 2. Dezember 2026 ist außerdem die Verwendung eines KI-Systems verboten, das realistische Bild-, Video-, Ton- oder ähnliche Inhalte erzeugt oder manipuliert, in denen intime Körperteile einer bestimmbaren natürlichen Person oder eine an eindeutig sexuellen Handlungen beteiligte bestimmbare Person dargestellt werden, ohne deren aus freien Stücken erfolgende, spezifische, aufgeklärte, eindeutige und ausdrückliche Zustimmung; Buchstabe bb erfasst Material über sexuellen Kindesmissbrauch.“ Quelle „Verordnung (EU) 2024/1689, Art. 5 Abs. 1 Unterabs. 1 Buchst. ba und bb sowie Art. 113 Buchst. a, konsolidierte Fassung vom 27. Juli 2026 · EUR-Lex · Abruf 2026-10-23“.

### B-7 · Zwei Fakt-Marker passen nicht

- **Ort:** beide Handbücher, 2.3, Zeile 89; Abschnitt 4, Zeilen 195 bis 197.
- **Zitat:** Zeile 89 „[FACT] The trade secret reasoning is in section 1. The example business added …“ · Zeile 195 „[FACT] The duty asks to take into account … A briefing that is the same for everyone therefore fits only if everyone does the same. In the example business …“.
- **Befund:** Zeile 89 ist ein Querverweis plus Beispielbetrieb, ohne Quelle; kein Fakt. Zeile 195 mischt den Artikelinhalt (Fakt) mit einer Schlussfolgerung und der Entscheidung des Beispielbetriebs (Auslegung). Hausregel: Fakt nur für das, was die Quelle wörtlich sagt.
- **Schwere:** B.
- **Quelle:** Art. 4 Abs. 1 (konsolidiert, siehe A-1), Abruf 23.10.2026.
- **Korrektur EN:** Zeile 89 ohne Marker: „The trade secret reasoning is in section 1. The example business added the calculation sheets per job and the access codes to customer sites.“ Zeile 195 teilen: „[FACT] Article 4(1) asks to take into account the technical knowledge, experience, education and training of the persons and the context the AI systems are to be used in.“ (Quelle wie bisher) „[INTERPRETATION] A briefing that is the same for everyone therefore fits only if everyone does the same. In the example business …“.
- **Korrektur DE:** entsprechend: Zeile 89 ohne Marker; Zeile 195 „[FAKT] Artikel 4 Absatz 1 verlangt, die technischen Kenntnisse, die Erfahrung, die Aus- und Fortbildung der Personen und den Kontext zu berücksichtigen, in dem die KI-Systeme eingesetzt werden sollen.“ und „[AUSLEGUNG] Eine Einweisung, die für alle dieselbe ist, passt deshalb nur, wenn alle dasselbe tun. Im Beispielbetrieb …“.

### B-8 · Mitbestimmung: Art. 88 DSGVO trägt die Aussage nicht, die DSK schon

- **Ort:** beide Handbücher, Abschnitt 6, Zeilen 296 bis 298.
- **Zitat:** „the GDPR itself leaves the processing of employees' data to more specific national rules“.
- **Befund:** Art. 88 Abs. 1 erlaubt („may“) den Mitgliedstaaten spezifischere Vorschriften durch Gesetz oder Kollektivvereinbarung; die DSGVO gilt aber voll weiter, und über Betriebsratsbeteiligung sagt Art. 88 nichts. Die passende Quelle hat das Handbuch schon: DSK 2.2 (S. 10) schreibt, dass die Einführung einer KI-Anwendung in einigen Fällen einen betrieblichen Mitbestimmungstatbestand erfüllt, und empfiehlt eine Dienst- oder Betriebsvereinbarung.
- **Schwere:** B (Quelle trägt die Aussage nicht, Formulierung überzeichnet).
- **Quelle:** EUR-Lex, DSGVO Art. 88 Abs. 1: „Member States may, by law or by collective agreements, provide for more specific rules …“; DSK, Orientierungshilfe vom 6.5.2024, Abschnitt 2.2, S. 10. Abruf 23.10.2026.
- **Korrektur EN:** „… is national labour law and differs between member states; Article 88 GDPR allows member states to lay down more specific rules on employee data by law or collective agreement. The German data protection authorities write that introducing an AI application will in some cases trigger co-determination, and they suggest a works agreement between management and works council.“ Quelle ergänzen „Datenschutzkonferenz, Orientierungshilfe of 6 May 2024, section 2.2, p. 10 · retrieved 2026-10-23“.
- **Korrektur DE:** „… ist nationales Arbeitsrecht und von Mitgliedstaat zu Mitgliedstaat verschieden; Art. 88 DSGVO erlaubt den Mitgliedstaaten, für Beschäftigtendaten spezifischere Vorschriften durch Gesetz oder Kollektivvereinbarung zu erlassen. Die deutsche Datenschutzaufsicht schreibt, dass die Einführung einer KI-Anwendung in einigen Fällen einen betrieblichen Mitbestimmungstatbestand erfüllt, und empfiehlt eine Dienst- oder Betriebsvereinbarung.“ Quelle ergänzen „Datenschutzkonferenz, Orientierungshilfe vom 6. Mai 2024, Abschnitt 2.2, S. 10 · Abruf 2026-10-23“.

### B-9 · Anbieterbegriff verkürzt; Chatbot unter eigenem Namen nicht erwähnt

- **Ort:** beide Handbücher, Abschnitt 5, Zeile 217; Unsicher-Kasten Zeilen 261 bis 264; 8.5 (Zeile 359).
- **Zitat:** „a provider develops a system or has it developed and places it on the market under its own name“.
- **Befund:** Art. 3 Nr. 3 nennt auch, wer ein System „unter ihrem eigenen Namen oder ihrer Handelsmarke in Betrieb nimmt“. Gerade das ist für den Chatbot-Fall wichtig: Ein Betrieb, der einen Assistenten unter eigenem Namen auf seiner Website in Betrieb nimmt, kann selbst Anbieter mit der Pflicht aus Abs. 1 sein. Die Leitlinien nennen als Anbieter-Beispiel eine Organisation, die einen Chatbot selbst entwickelt und unter eigenem Namen für die eigene Nutzung in Betrieb nimmt. Ob schon die Einbindung eines fremden Chatbots unter eigener Marke reicht, klären die gelesenen Quellen nicht. Der Kasten sollte diesen Fall nennen, statt nur auf den Bildschirm-Nachweis zu verweisen (Stand prüfen).
- **Schwere:** B (verkürzte Definition mit Folgen für eine offene Rechtsfrage).
- **Quelle:** EUR-Lex konsolidiert, Art. 3 Nr. 3: „… places it on the market or puts the AI system into service under its own name or trademark …“; Leitlinien C(2026) 5054, Rn. 11 (Beispiel In-house-Chatbot unter eigenem Namen), S. 5. Commission FAQ Art. 50 (`digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act`, Stand 24.7.2026) beantwortet den Fall nicht. Abruf 23.10.2026.
- **Korrektur EN:** Zeile 217: „… a provider develops a system or has it developed and places it on the market or puts it into service under its own name or trademark.“ Kasten ergänzen: „One case follows from the definitions: a business that puts a chatbot into service under its own name or trademark may itself be a provider and then carries the duty under paragraph 1. The guidelines give as an example of a provider an organisation that develops a chatbot in-house and puts it into service under its own name. Whether embedding a third-party chatbot under one's own brand is enough, the sources read do not say. A business that plans this asks a specialist first.“
- **Korrektur DE:** Zeile 217: „… Anbieter ist, wer ein System entwickelt oder entwickeln lässt und es unter eigenem Namen oder eigener Marke in Verkehr bringt oder in Betrieb nimmt.“ Kasten: „Ein Fall folgt aus den Begriffen: Ein Betrieb, der einen Chatbot unter eigenem Namen oder eigener Marke in Betrieb nimmt, kann selbst Anbieter sein und trägt dann die Pflicht aus Absatz 1. Die Leitlinien nennen als Beispiel eines Anbieters eine Organisation, die einen Chatbot selbst entwickelt und unter eigenem Namen in Betrieb nimmt. Ob schon die Einbindung eines fremden Chatbots unter eigener Marke genügt, sagen die gelesenen Quellen nicht. Wer das plant, fragt vorher eine Fachperson.“

### B-10 · PDF: Schritte 10 bis 15 erscheinen als 0 bis 5

- **Ort:** `ai-policy-handbook-en.pdf` S. 15 und `-de.pdf` S. 16, Liste „The fifteen steps / Die fünfzehn Schritte“.
- **Befund:** Bei zweistelligen Listennummern wird die erste Ziffer abgeschnitten; im Text- und Bildbefund steht „9. Hold the briefing“, dann „0. Have each person confirm receipt“, „1. Create the labelling checklist“ bis „5. On every new hire“. Die Liste hat damit zweimal 1 bis 5, und der Verweis „Step 5“ im Unsicher-Block darunter wird mehrdeutig. Andere nummerierte Listen (Quellen 10 bis 13) sind korrekt.
- **Schwere:** B (falsche Nummerierung im Produkt).
- **Quelle:** eigene Darstellung beider PDFs mit pypdfium2 (Seiten als PNG im Scratch-Ordner) und Textebene der PDFs, 23.10.2026.
- **Korrektur EN/DE:** im PDF-Stylesheet den Platz für die Listenmarke vergrößern (etwa `ol { padding-left: 2.4em; }` oder `list-style-position: outside` mit ausreichendem Einzug), danach alle Dokumente mit Listen über 9 Einträgen prüfen, auch D6.

### C-1 · Briefe und interne Texte: Leitlinien sagen es ausdrücklich

- **Ort:** beide, Abschnitt 5, Zeile 259 (erster Satz der Auslegung); 2.7 Zeile 123.
- **Befund:** Dass Einzelkorrespondenz und interne Texte nicht „veröffentlicht“ sind, ist keine Auslegung: Rn. 131 nennt ausdrücklich „private, interpersonal correspondence (for professional purposes), or organisation-internal texts“ als nicht veröffentlicht. Das stärkt die Regel in § 7.
- **Schwere:** C.
- **Quelle:** Leitlinien C(2026) 5054, Rn. 131, S. 41 bis 42, Abruf 23.10.2026.
- **Korrektur EN:** „[FACT] The guidelines name private, interpersonal correspondence, also for professional purposes, and organisation-internal texts as not published.“ Quelle „Guidelines C(2026) 5054, point 131 · retrieved 2026-10-23“. Die Beispiele (Website-Beitrag, Monteur-Bild) bleiben Auslegung.
- **Korrektur DE:** „[FAKT] Die Leitlinien nennen private, zwischenmenschliche Korrespondenz, auch zu beruflichen Zwecken, und organisationsinterne Texte ausdrücklich als nicht veröffentlicht.“ Quelle „Leitlinien C(2026) 5054, Rn. 131 · Abruf 2026-10-23“.

### C-2 · Deepfake-Beispiel und Hilfetext G2 zu absolut

- **Ort:** beide, Abschnitt 5, Zeile 259; `questions.json` G2, Zeile 232.
- **Zitat:** „An AI-generated image of a technician … is a deep fake“ · G2 „A realistic AI image of a scene that never happened is a deepfake and must be disclosed“.
- **Befund:** Die Leitlinien stützen die Richtung: Es genügt, wenn das Dargestellte existiert, plausibel existieren kann oder plausibel existiert haben könnte (Rn. 113); hohe Fotorealistik macht einen Deepfake wahrscheinlicher, entscheidet aber nicht allein, es zählt auch der Einsatzzusammenhang (Rn. 114). „Advertising usually cannot rely on the artistic exception“ ist durch Rn. 122 und 124 gedeckt. Die Quellen fehlen, und „ist“ sollte „ist in der Regel“ heißen.
- **Schwere:** C.
- **Quelle:** Leitlinien C(2026) 5054, Rn. 113 („can plausibly exist or could have plausibly existed in reality“), Rn. 114, Rn. 122, Rn. 124, S. 33 bis 39, Abruf 23.10.2026.
- **Korrektur EN:** „… is in most cases a deep fake, because it shows a realistic scene that could have happened; the guidelines count persons, objects and places that could plausibly exist, and treat photorealism as a strong but not decisive sign. … Advertising usually cannot rely on the artistic exception.“ Quelle „Guidelines C(2026) 5054, points 113, 114, 122 and 124 · retrieved 2026-10-23“. G2: „A realistic AI image of a scene that never happened is usually a deepfake and is disclosed; a stylised graphic is not.“
- **Korrektur DE:** „… ist in der Regel ein Deepfake, weil es eine echt wirkende Szene zeigt, die so hätte stattfinden können; die Leitlinien zählen Personen, Gegenstände und Orte, die plausibel existieren könnten, und werten Fotorealismus als starkes, aber nicht allein entscheidendes Zeichen.“ G2: „Ein realistisches KI-Bild einer Szene, die es nicht gab, ist in der Regel ein Deepfake und wird offengelegt; eine stilisierte Grafik nicht.“

### C-3 · Zwei Aufzählungen aus den Leitlinien verkürzt

- **Ort:** beide, Abschnitt 5, Zeile 243 (Rn. 38) und Zeile 247 (Rn. 131).
- **Befund:** Rn. 38 nennt fünf Techniken, das Handbuch vier; es fehlen „technische oder fähigkeitsbezogene Beschreibungen“ (etwa „dieses System nutzt LLMs“) und irreführende menschenähnliche Darstellungen. Rn. 131 zählt zu öffentlichem Interesse auch wirtschaftliche, finanzielle, politische, wissenschaftliche und kulturelle Entwicklungen; das Handbuch nennt nur „economic or financial questions“. `quellen.md` schreibt dazu abweichend „wirtschaftliche und politische Fragen“.
- **Schwere:** C.
- **Quelle:** Leitlinien C(2026) 5054, Rn. 38 (S. 15) und Rn. 131 (S. 41 bis 42), Abruf 23.10.2026.
- **Korrektur EN:** Rn. 38: „… unclear signals such as a generic "assistant" or human-like representations that may mislead; generalised disclosures; and purely technical descriptions such as "this system uses LLMs".“ Rn. 131: „… consumer safety and economic, financial, political, scientific or cultural developments that may be a subject of public debate.“
- **Korrektur DE:** Rn. 38: „… unklare Signale wie ein allgemeiner „Assistent“ oder irreführende menschenähnliche Darstellungen; pauschale Hinweise; und rein technische Beschreibungen wie „dieses System nutzt LLMs“.“ Rn. 131: „… Verbrauchersicherheit sowie wirtschaftliche, finanzielle, politische, wissenschaftliche oder kulturelle Entwicklungen, die Gegenstand öffentlicher Debatte sein können.“ `quellen.md` angleichen.

### C-4 · Berichtigungen, Punkt 8.1 und 8.16

- **Ort:** beide, Quellen Nr. 1 (Zeile 429); 8.1 (Zeile 355); 8.16 (Zeile 370).
- **Befund:** Die englische konsolidierte Fassung (Kopfzeile 02024R1689, EN, 27.07.2026, 001.001) enthält keine Berichtigung; die Berichtigungen zu 2024/1689 betreffen laut Dokumentinfo andere Sprachfassungen (ES, DE, FR, GA, LT, HU, SK, SL, SV, NL, CS). Die deutsche Fassung (001.002) enthält C1 (ABl. L 90802 vom 9.10.2025, betrifft Art. 3 Nr. 40) und C2 (ABl. L 90810 vom 29.9.2026, betrifft Art. 6 Abs. 1b). Keine berührt eine Stelle, die das Handbuch zitiert; 8.16 lässt sich schließen. 8.1 antwortet auf „am Amtsblatt gelesen?“ mit der konsolidierten Fassung, die keine Rechtswirkung hat, und verweist auf „sections 5 and 10“; Abschnitt 10 enthält keinen Wortlaut.
- **Schwere:** C.
- **Quelle:** EUR-Lex konsolidiert EN und DE (Kopfzeilen, Liste „Berichtigt durch“, Marker C1 und C2); `eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32024R1689` (aktuelle konsolidierte Fassung 27/07/2026; „Corrected by 32024R1689R(01) (ES, DE, FR, …)“). Abruf 23.10.2026.
- **Korrektur EN:** Quelle 1: „… including the amendments by Regulation (EU) 2026/1744; the German version also incorporates the corrigenda of 9 October 2025 and 29 September 2026, which concern Art. 3(40) and Art. 6(1b) only.“ 8.1: „Resolved. Paragraphs 1 to 6 are unchanged original text of OJ L, 2024/1689, paragraph 7 comes from OJ L, 2026/1744; read in the English and German consolidated text at EUR-Lex. The wording in section 5 is from there.“ 8.16: „Resolved on 23 October 2026: the corrigendum concerns the German wording of Art. 6(1b) only and touches no passage quoted here.“
- **Korrektur DE:** sinngleich: „… die deutsche Fassung enthält zusätzlich die Berichtigungen vom 9. Oktober 2025 und 29. September 2026; sie betreffen nur Art. 3 Nr. 40 und Art. 6 Abs. 1b.“ 8.1 „… der Wortlaut in Abschnitt 5 stammt daher.“ 8.16 „Erledigt am 23. Oktober 2026: Die Berichtigung betrifft nur den deutschen Wortlaut von Art. 6 Abs. 1b und keine hier zitierte Stelle.“

### C-5 · Deutschland: mehr ist inzwischen lesbar

- **Ort:** beide, 7.2, Zeilen 339 bis 343; Abschnitt 4, Zeile 203 (Folgen bei Art. 4); Quellen Nr. 13.
- **Befund:** (1) Amtliche Kurzbezeichnung laut Vollzitat: „KI-Marktüberwachungs-und-Innovationsförderungs-Gesetz“ (KI-MIG); die DE-Quellenzeile in 7.2 schreibt „KI-Marktüberwachungs- und Innovationsförderungsgesetz“. (2) Die Abgrenzung ist lesbar: § 2 Abs. 2 bis 8 (u. a. Produktaufsichten nach Anhang I, BaFin für Finanzbereich). (3) § 15 KI-MIG enthält keinen Bußgeldtatbestand zu Art. 4; Ordnungswidrigkeiten nur zu Art. 21, 27, 45 und 86, bis 50 000 EUR; § 16 regelt für Verstöße nach Art. 99 Abs. 3 bis 5 das OWiG-Verfahren. Für einen deutschen Betrieb heißt das nach dem veröffentlichten Text: kein Bußgeld für Art. 4 (Auslegung, Stand prüfen, weil der Text dokumentarisch noch nicht bearbeitet ist). (4) Die Bundesnetzagentur bietet KMU einen KI-Service Desk an. (5) Die Kommissionsliste führt die Bundesnetzagentur noch mit Sternchen („Benennung ausstehend“), obwohl das Gesetz seit 29.7.2026 gilt.
- **Schwere:** C.
- **Quelle:** `gesetze-im-internet.de/ki-mig/BJNR0DF0B0026.html` (Vollzitat; §§ 2, 6, 8, 9, 15, 16; Fußnote „dokumentarisch noch nicht bearbeitet“; Inkrafttreten nach Art. 5 am 29.7.2026); Bundesnetzagentur, Pressemitteilung vom 29.07.2026, `bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2026/20260729_KI_VO.html`; Kommission, `digital-strategy.ec.europa.eu/en/policies/market-surveillance-authorities-under-ai-act` (Stand 7.9.2026). Abruf 23.10.2026.
- **Korrektur EN (7.2 ergänzen):** „[FACT] The act sets no fine for Article 4: its § 15 lists administrative offences under Articles 21, 27, 45 and 86 only, with fines of up to EUR 50 000. The Federal Network Agency runs an AI service desk for SMEs.“ Quelle „KI-MIG, §§ 15 and 16 · gesetze-im-internet.de, marked as not yet documentarily processed · retrieved 2026-10-23; Bundesnetzagentur, press release of 29 July 2026 · retrieved 2026-10-23“. Unsicher-Block: ersten Satz streichen oder auf § 2 Abs. 2 bis 8 verweisen.
- **Korrektur DE:** „[FAKT] Das Gesetz sieht für Artikel 4 kein Bußgeld vor: § 15 nennt Ordnungswidrigkeiten nur zu den Artikeln 21, 27, 45 und 86, mit Geldbußen bis 50 000 Euro. Die Bundesnetzagentur bietet KMU einen KI-Service Desk an.“ Quellenzeile mit Kurzbezeichnung „KI-Marktüberwachungs-und-Innovationsförderungs-Gesetz (KI-MIG) vom 22. Juli 2026 (BGBl. 2026 I Nr. 223)“.

### C-6 · Österreich: Prüfstand aktualisieren

- **Ort:** beide, 7.1, Zeilen 324 bis 335; Glossar Zeile 419; Quellen Nr. 12.
- **Befund:** Weiterhin keine Behörde benannt; das bestätigt das Handbuch. Neu und belegbar: (1) RIS-Volltextsuche im Bundesgesetzblatt am 23.10.2026: „Künstliche Intelligenz“ ergibt als einziges einschlägiges Gesetz BGBl. I Nr. 6/2024 (Änderung KOG und TKG 2021, KI-Servicestelle); „2024/1689“ ergibt keinen Treffer. Damit ist der in `quellen.md` offene Punkt „RIS-Volltextsuche nicht geprüft“ erledigt. (2) Die Kommissionsliste der Kontaktstellen führt Österreich mit „-“ (Stand 7.9.2026). (3) Der Antrag 517/A(E) wurde zweimal vertagt, am 26.11.2025 und am 3.6.2026. (4) Die DSB schreibt zu ihrer Zuständigkeit nach Art. 74 Abs. 8 ausdrücklich „(nach aktueller Rechtslage) gemäß §§ 18, § 31 DSG“; das Handbuch lässt den Vorbehalt weg.
- **Schwere:** C.
- **Quelle:** RIS, BGBl. authentisch ab 2004, Suche 23.10.2026; `digital-strategy.ec.europa.eu/en/policies/market-surveillance-authorities-under-ai-act`; `parlament.gv.at/gegenstand/XXVIII/A/517`; `dsb.gv.at/kuenstlichebrintelligenz/kuenstliche-intelligenz-datenschutz`. Abruf 23.10.2026.
- **Korrektur EN:** „… acts as market surveillance authority, under current law pursuant to §§ 18 and 31 DSG, for certain high-risk systems … The motion … was adjourned in committee on 26 November 2025 and again on 3 June 2026. A full-text search of the Federal Law Gazette in the RIS on 23 October 2026 found no act that designates the authority; the Commission's list of contact points shows no entry for Austria (as of 7 September 2026).“ Kasten und Glossar: „as of 23 October 2026“.
- **Korrektur DE:** sinngleich; „Zuletzt geprüft 2026-10-23“.

### C-7 · Geschäftsgeheimnis: amtlicher deutscher Wortlaut und nationale Gesetze

- **Ort:** DE, Abschnitt 1, Zeilen 42 bis 44; EN entsprechend.
- **Befund:** Das deutsche Handbuch zitiert die Richtlinie englisch mit eigener Übersetzung, obwohl der amtliche deutsche Text vorliegt. Für den Betrieb gilt außerdem das nationale Umsetzungsgesetz, das dieselbe Voraussetzung enthält: Deutschland § 2 Nr. 1 Buchst. b GeschGehG, Österreich § 26b Abs. 1 Z 3 UWG.
- **Schwere:** C.
- **Quelle:** EUR-Lex DE `…/DE/TXT/HTML/?uri=CELEX:32016L0943`, Art. 2 Nr. 1 Buchst. c: „sie sind Gegenstand von den Umständen entsprechenden angemessenen Geheimhaltungsmaßnahmen durch die Person, die die rechtmäßige Kontrolle über die Informationen besitzt“; `gesetze-im-internet.de/geschgehg/__2.html`; RIS `NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10002665&Paragraf=26b`. Abruf 23.10.2026.
- **Korrektur DE:** „… die dritte lautet: „sie sind Gegenstand von den Umständen entsprechenden angemessenen Geheimhaltungsmaßnahmen durch die Person, die die rechtmäßige Kontrolle über die Informationen besitzt“. In Österreich steht dieselbe Voraussetzung in § 26b Abs. 1 Z 3 UWG, in Deutschland in § 2 Nr. 1 Buchst. b GeschGehG.“ Quelle mit „deutsche Fassung“ und den beiden Gesetzen.
- **Korrektur EN:** Satz anhängen: „Austria implements this in § 26b(1)(3) UWG, Germany in § 2 no. 1(b) GeschGehG.“

### C-8 · PDF-Layout

- **Ort:** beide PDFs.
- **Befund:** Keine Seitenzahlen, kein Inhaltsverzeichnis; Kopfzeile nur auf S. 1, Fußzeile nur auf der letzten Seite. Letzte Seite fast leer (EN S. 24 und DE S. 25 tragen nur den Rest der Quelle 13 und die Fußzeile). ISO-Daten in Quellenzeilen brechen am Bindestrich um („retrieved 2026-10-“ / „19“): EN 4-mal (S. 2, 10, 15, 15), DE 5-mal (S. 11, 13, 14, 15, 15); in DE Quelle 13 bricht „29.“ / „Juli 2026“. Marker, Unsicher-Kästen, Tabelle in Abschnitt 8 (Kopf wird wiederholt) und Anführungszeichen sind sauber.
- **Schwere:** C.
- **Quelle:** eigene Darstellung der PDFs, 23.10.2026.
- **Korrektur:** laufende Fußzeile mit Seitenzahl und Fassung; kurzes Inhaltsverzeichnis nach dem Titel; Datumsangaben in Quellenzeilen mit `white-space: nowrap` oder geschütztem Bindestrich (U+2011) bzw. geschütztem Leerzeichen nach dem Tag; Witwenschutz für den letzten Listeneintrag.

### C-9 · Lesbarkeit für den Inhaber eines 10-Personen-Betriebs

- **Ort und Befund:**
  - Abschnitt 0, Zeile 12: sieben Kürzel D1 bis D7 in einem Absatz; beim ersten Lesen schwer zu behalten. Als kurze Liste setzen.
  - Abschnitt 4, Zeile 193: die acht Schulungsinhalte stehen in einem Satz mit Semikolons. Als nummerierte Liste setzen.
  - Abschnitt 3, Fragen 1 und 5: das Abwählen des Trainings wird zweimal gefragt. Frage 5 auf Löschung und Eingabe-Historie beschränken.
  - Abschnitt 3, Zeile 155: „Tool names are allowed here, unlike in the handbook“ ist eine Redaktionsregel, die den Kunden verwirrt. Streichen oder ersetzen durch „The register names the tools, with the date of the check next to each.“
  - Abschnitt 1, Zeile 53: „a protective measure that legal consequences can attach to“ ist unklar. Konkret sagen: „It is evidence of an organisational measure, and breaches of it can have consequences under employment law.“ (Arbeitsrechtlicher Teil Stand prüfen.)
  - Glossar: es fehlen „controller / Verantwortlicher“, „processor / Auftragsverarbeiter“, „co-determination / Mitbestimmung“ und eine Erklärung von „Annex III / Anhang III“ bei der ersten Nennung in 2.2.
- **Schwere:** C.
- **Korrektur:** wie oben; Glossareinträge EN/DE: „Controller. The business that decides why and how personal data are processed (Art. 4(7) GDPR).“ / „Verantwortlicher. Der Betrieb, der über Zweck und Mittel der Verarbeitung personenbezogener Daten entscheidet (Art. 4 Nr. 7 DSGVO).“ (Art. 4 Nr. 7 nicht wörtlich zitiert; vor Aufnahme am Wortlaut prüfen.)

### C-10 · Reihenfolge der Schritte

- **Ort:** beide, Abschnitt 6, Zeilen 280 bis 294; Abschnitt 0, Zeile 20.
- **Befund:** Schritt 8 (Aushang) und 10 (Kenntnisnahme bestätigen) liegen vor Schritt 12 (Geltungsbeginn eintragen, unterschreiben). Beschäftigte bestätigen damit eine noch nicht unterschriebene Richtlinie, und der Aushang hängt vor dem Inkrafttreten. Das widerspricht nicht der Regel „Geltungsbeginn nach der Einweisung“, wirkt aber unordentlich.
- **Schwere:** C.
- **Korrektur EN:** Schritt 12 vor Schritt 8 ziehen und so formulieren: „Sign the policy with an effective date after the briefing.“ DE: „Richtlinie unterschreiben, mit einem Geltungsbeginn nach der Einweisung.“

### C-11 · Kopplung Generator und Handbuch

- **Ort:** `questions.json` I4 (Zeile 306 ff.), A1 und A3 (`ref: handbook 6`); Handbuch Abschnitt 3, Zeile 177; Abschnitt 0, Zeile 10.
- **Befund:** I4 ist mit „no-dpa-no-personal“ vorbelegt, das Handbuch sagt „recommends none of the three“ und nennt die Wahl des Beispielbetriebs nicht; die Vorbelegung wirkt wie eine Empfehlung. A1 (Name) und A3 (Größe) verweisen auf Abschnitt 6, der dazu nichts sagt. „About thirty answers“: der Generator hat 34 Fragen.
- **Schwere:** C.
- **Korrektur EN:** Zeile 177 ergänzen: „The example business chose the first; the generator shows that choice as its prefilled value, not as a recommendation.“ A1/A3 auf „handbook 0“ setzen. Zeile 10 „thirty-four answers“ oder „about thirty-five answers“. DE entsprechend („Der Beispielbetrieb hat die erste gewählt; der Generator zeigt diese Wahl als Vorbelegung, nicht als Empfehlung.“).

### C-12 · Fehlende praktische Schritte und Anlaufstellen

- **Befund:** Belegte, für den Beispielbetrieb unmittelbar nützliche Punkte fehlen:
  - DSK 2.4, S. 11: Verlangt ein Dienst bei der Registrierung eine Mobilnummer, stellt der Arbeitgeber das Telefon. Passt genau zu den zwei Monteuren in 2.1.
  - BSI M16, S. 49: Regeln durch technische Maßnahmen stützen, etwa Dienste gezielt sperren oder freischalten. Passt zu § 1.
  - DSK 3.1, S. 12 bis 13: Werden personenbezogene Daten verarbeitet, sind die Betroffenen zu informieren (Art. 13, 14 DSGVO). Passt zu E1 „approved“.
  - DSK 3.3, S. 14 bis 15: Ergebnisse mit Personenbezug vor der Weiterverarbeitung prüfen. Stärkt § 5.
  - Anlaufstellen: Kommission „living repository of AI literacy practices“ (laut Q&A Grundlage der künftigen Beispiele nach Art. 4 Abs. 2), RTR-KI-Servicestelle `ki.rtr.at` (AT), KI-Service Desk der Bundesnetzagentur (DE).
- **Schwere:** C.
- **Quelle:** DSK-Orientierungshilfe 6.5.2024, Abschnitte 2.4, 3.1, 3.3; BSI v2.0, M16, S. 49; Commission Q&A (Stand 20.10.2026); RTR-Pressemitteilung vom 2.7.2026; Bundesnetzagentur-Pressemitteilung vom 29.7.2026. Abruf 23.10.2026.
- **Korrektur:** je ein Satz in 2.1, 2.4, 2.5 und 4 mit Quelle; Anlaufstellen in 7.1 und 7.2 als „Where to ask / Wo man fragen kann“.

### C-13 · Weitere überholte Stellen im WKO-Muster

- **Ort:** beide, 7.1, Zeilen 318 bis 322.
- **Befund:** Weil das Handbuch empfiehlt, WKO-Formulierungen zu übernehmen, sollten auch diese Stellen genannt werden: S. 20 nennt „im August 2027 die Regelungen für alle Systeme“ (allgemeine Geltung ist seit 2.8.2026); S. 25 schreibt, Unternehmen seien verpflichtet, Personen bei Interaktion mit KI zu informieren (Art. 50 Abs. 1 ist Anbieterpflicht); S. 11 spricht von einer Pflicht, KI-Kompetenz „nachweisen und dokumentieren“ zu können, die Art. 4 nicht enthält.
- **Schwere:** C.
- **Quelle:** WKO-Guidelines S. 11, 20, 25; Art. 113 und Art. 50 Abs. 1 (konsolidiert). Abruf 23.10.2026.
- **Korrektur EN:** „Page 20 also dates the rules for all systems to August 2027, while the Regulation has applied generally since 2 August 2026; page 25 presents the notice for interacting systems as a duty of every business, while Article 50(1) addresses providers.“ DE sinngleich.

### C-14 · Hilfetexte B3 und G1

- **Ort:** `questions.json` B3 (Zeile 128), G1 (Zeile 228).
- **Befund:** B3 „Supervisory authorities recommend …“ / „Die Aufsicht empfiehlt …“ verallgemeinert die deutsche DSK; der Generator ist für Österreich vorbelegt. G1 „Article 50 (1)“ mit Leerzeichen; „before the first answer“ ist strenger formuliert als Art. 50 Abs. 5 („at the latest at the time of the first interaction“), als Prüfpunkt aber vertretbar.
- **Schwere:** C.
- **Korrektur EN:** B3 „The German data protection authorities recommend business devices and accounts.“ G1 „Article 50(1) of the AI Act: … the business checks that it appears at the first interaction, before the first answer.“ **DE:** B3 „Die deutsche Datenschutzaufsicht empfiehlt betriebliche Geräte und Konten.“ G1 „… prüft, dass er bei der ersten Interaktion erscheint, vor der ersten Antwort.“

### C-15 · Anrede im deutschen Handbuch klären

- **Ort:** DE, Abschnitt 0, Zeilen 8 und 10 („So benutzen Sie das Toolkit“, „Sie müssen es nicht lesen, bevor Sie anfangen“); sonst durchgehend unpersönlich.
- **Befund:** Die mir genannte Hausregel lautet „Website Sie, in Dokumenten du“; `design/project/README.md` sagt dagegen, der Leser werde mit „Sie“ angesprochen. Ob das Handbuch als Dokument (du) oder als Teil des Kundenauftritts (Sie) gilt, ist nicht festgelegt.
- **Schwere:** C (Entscheidung nötig).
- **Empfehlung:** „Sie“ beibehalten, weil das Handbuch sich an die Inhaberin als Kundin richtet, und die Regel so präzisieren: „du“ nur in Dokumenten, die sich an Beschäftigte richten. Entscheidung bei dir.

---

## Bestätigt (Auswahl, Abruf 23.10.2026)

- **KI-Verordnung, konsolidiert 27.07.2026 (EN 001.001, DE 001.002; aktuelle konsolidierte Fassung laut EUR-Lex):** Art. 3 Nr. 1, 3, 4, 56, 60 wörtlich bzw. sinngleich; Art. 4 Abs. 1 wörtlich (EN und DE); Art. 5 Abs. 1 Buchst. f; Art. 26 Abs. 2; Art. 50 Abs. 1 bis 7 (Abs. 1 bis 6 Ursprungstext, Abs. 7 M1); Art. 99 Abs. 1 (M1), Abs. 3, Abs. 4 Buchst. g (15 000 000 EUR oder 3 %, höherer Betrag), Abs. 6 (KMU: niedrigerer Betrag); Art. 111 Abs. 4 (2. Dezember 2026, M1); Art. 113 (allgemein 2.8.2026; Buchst. a 2.2.2025; Buchst. b Sanktionskapitel 2.8.2025; Buchst. c 2.12.2027 Anhang III und 2.8.2028 Anhang I); Anhang III Nr. 4 a und b; Art. 74 Abs. 8.
- **VO (EU) 2026/1744:** 8. Juli 2026, „Digital Omnibus on AI“, ABl. L 2026/1744 vom 24.7.2026, Inkrafttreten am dritten Tag nach Veröffentlichung (Art. 4) = 27.7.2026; Art. 1 Nr. 5, 20, 39, 40 wie angegeben.
- **DSGVO** (aktuelle konsolidierte Fassung 04/05/2016): Art. 24 Abs. 1 (EN und DE wörtlich), Art. 28 Abs. 3, Art. 88 Abs. 1.
- **Geschäftsgeheimnis-RL** Art. 2 Nr. 1 Buchst. a bis c, EN wörtlich.
- **Leitlinien C(2026) 5054 final vom 20.7.2026, 51 Seiten:** Rn. 12, 14, 16, 38, 131, 133 bis 136, 138, 153, 154 inhaltlich richtig wiedergegeben.
- **Kommission Q&A KI-Kompetenz:** „There is no need for a certificate …“, Personenkreis, Hochrisiko-Schulungspflicht bleibt, Art. 4 gilt seit 2.2.2025.
- **DSK-Orientierungshilfe** Version 1.0 vom 6.5.2024, 15 Seiten: 2.2 (S. 10, Zitat wörtlich), 2.4 (S. 10 bis 11), 1.10 (S. 7), 1.12 (S. 8, wörtlich), 3.1 (S. 12, wörtlich). Keine neuere Fassung gefunden.
- **BSI** „Generative KI-Modelle“, Version 2.0 vom 17.01.2025, 71 Seiten: M16 auf S. 49, Zitate wörtlich.
- **WKO** 3. Auflage April 2026, 41 Seiten: S. 5, 11, 17, 20, 29, 39 (Hochrisiko „August 2026“), S. 26 („Sicherstellung“, „seit Ende 2025“), S. 33 (2.2.2025), #9-Inhalte S. 26, „Work in progress“ S. 5.
- **RTR:** Selbstbeschreibung, § 20c KOG und § 194a TKG, keine Aufsichtsbefugnis genannt; Pressemitteilung 2.7.2026 nennt keine Behörde; Sanktionsseite nennt keine österreichische Behörde.
- **DSB:** „Es ist noch nicht fixiert, wer dies in Österreich sein wird.“; Zuständigkeit für Datenschutzfragen; Art. 74 Abs. 8.
- **Parlament:** 517/A(E), XXVIII. GP, „KI-Behörde endlich benennen“, eingebracht 15.10.2025, vertagt 3.6.2026.
- **KI-MIG:** 22.7.2026, BGBl. 2026 I Nr. 223, in Kraft 29.7.2026; § 2 Abs. 1, § 6 Abs. 1, § 8 Abs. 1, § 9 Abs. 4 wie angegeben; Hinweis „dokumentarisch noch nicht bearbeitet“.
- **EN und DE:** alle Zahlen, Daten, Artikel- und Randnummern zeilengleich; Marker an denselben Stellen.

## Nicht verifizierbar

1. **„Two web searches on 18 and 19 October 2026 found no act“ (7.1):** frühere Suchen sind nicht nachvollziehbar. Ersetzt durch die eigene RIS-Suche vom 23.10.2026 (C-6).
2. **„page dated 27 July 2026“ (Q&A):** der Stand vom 18.10. ist nicht mehr abrufbar; heute 20.10.2026 (B-1).
3. **Rechtsstatus der Leitlinien C(2026) 5054:** Das PDF ist der Anhang zu einer Mitteilung, die den Inhalt eines Entwurfs billigt. Ob die förmliche Mitteilung inzwischen im ABl. C veröffentlicht ist, wurde nicht ermittelt; die Webseite (aktualisiert 31.7.2026) sagt nur „adopted these guidelines“. Für die Aussage „guidance, not law“ ohne Belang.
4. **RTR-Rechtsgrundlage:** § 20c KOG und § 194a TKG nur über die RTR-Seite und den RIS-Titel von BGBl. I Nr. 6/2024 bestätigt; Gesetzestext nicht geöffnet.
5. **KI-MIG-Wortlaut:** gelesen in der nichtamtlichen Fassung von gesetze-im-internet.de mit dem Hinweis „dokumentarisch noch nicht bearbeitet“; das amtliche BGBl. (recht.bund.de) wurde nicht geöffnet.
6. **DSB-Seite:** undatiert; wie aktuell sie ist, ist nicht ermittelbar.
7. **Parlamentsseite 517/A(E):** Der Seitenkopf zeigt „Status Beschlossen“, der Verfahrensverlauf endet mit „vertagt“ am 3.6.2026; ein Plenarbeschluss ist nicht verzeichnet. Widerspruch auf der Seite selbst, nicht auflösbar.
8. **Ob eine KI-Eingabe eine Datenschutzverletzung nach Art. 4 Nr. 12 DSGVO ist (A-3):** Einzelfallfrage; EDPB-Leitlinien zur Meldung von Verletzungen nicht geöffnet. Stand prüfen.
9. **Ob ein Betrieb mit fremdem Chatbot unter eigener Marke Anbieter wird (B-9):** von den gelesenen Quellen nicht entschieden.
10. **Arbeitsrechtliche Folgen von Richtlinienverstößen (C-9) und Art. 4 Nr. 7 DSGVO (Glossarvorschlag):** nicht am Original geprüft; vor Aufnahme prüfen.
11. **Auslegungen und Lücken:** als Meinung nicht verifizierbar; geprüft nur auf Stimmigkeit mit den Quellen.
