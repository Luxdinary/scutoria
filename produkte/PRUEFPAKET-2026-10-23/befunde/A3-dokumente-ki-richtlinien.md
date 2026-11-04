# A3 · Prüfung der sieben Dokumente des KI-Richtlinien-Toolkits (Beispielbetrieb, EN und DE)

Stand 23.10.2026. Prüfer: Claude (Teilprüfung A3). Nur gelesen, im Projekt nichts verändert außer dieser Datei.

## Kurzfassung

**Angesehen:** 36 PDF-Seiten, alle als PNG gerendert (Maßstab 1,3) und einzeln angeschaut: D1 Richtlinie 3+3, D2 Aushang 1+1, D3 Freigabeformular 6+6, D4 Teilnehmerliste 4+4, D5 Kennzeichnungs-Checkliste 3+3, D7 Nachweisseite 1+1.
**Geöffnet:** 12 PDF, 10 DOCX (Struktur über das XML: Formatvorlagen, Tabellen, Kopf- und Fußzeile, Felder; python-docx ist nicht installiert, eine Darstellung über Word hing an einem Dialog und wurde abgebrochen), 6 XLSX (openpyxl und rohes XML: Blätter, Fixierung, Spaltenbreiten, Datenüberprüfung, Füllfarben, Druckeinstellungen).
**Live geprüft am 23.10.2026:** KI-Verordnung konsolidiert 27.07.2026 auf EUR-Lex (EN und DE: Art. 3 Nr. 3, 4, 60; Art. 4; Art. 25 Abs. 1; Art. 50; Art. 111 Abs. 4; Art. 113; Anhang III Nr. 4), DSGVO Art. 22 und 33, Leitlinien der Kommission zu Art. 50 C(2026) 5054 (Rn. 12, 38, 113, 123, 131, 133 bis 138, 153, 154), Kommissionsseite „AI literacy, questions and answers“ (letzte Aktualisierung 20.10.2026).

**Ergebnis:** 44 Befunde. **A: 6, B: 25, C: 13.**

Die Daten laufen sauber durch den Satz (Datum, Tools, Funktionen sind in D1 bis D7 gleich, EN und DE sind inhaltsgleich). Die schweren Punkte liegen woanders: zwei Rechtsformulierungen sind enger als das Gesetz und führen zu falschen Entscheidungen (Personalentscheidungen in D1, Deepfake-Begriff in D1 und D5), zwei Arbeitsdateien sind an einer Stelle kaputt (Auswahlliste im Register, keine Namensspalte in der Übersicht je Person), die Nachweisseite verschweigt die gemeldete private Nutzung, und die PDFs haben weder Seitenzahlen noch Kopfzeilen auf Folgeseiten, sodass Unterschriftsseiten keinem Dokument zuzuordnen sind.

**Empfehlung:** Zuerst die sechs A-Befunde beheben (alle sind Generator-Änderungen an wenigen Stellen), dann Befund 7 (Belegzeilen mit Abrufdatum) als ein Durchgang über alle Texte, dann den Rest.

Zeilenangaben beziehen sich auf `site/src/toolkit/documents/<datei>.mjs` im Stand vom 19.10.2026; „EN-Zeile/DE-Zeile“ meint den englischen und den deutschen Textblock derselben Datei.

---

## A: falsch, irreführend, rechtlich riskant oder unbrauchbar

### 1. D1 § 2 schließt nur „abschließende Entscheidungen“ über Personen aus
- **Ort:** example-electrical-ltd-policy-en.pdf S. 1, muster-…-policy-de.pdf S. 1, beide DOCX; `policy.mjs` Z. 16 (EN), Z. 52 (DE).
- **Zitat:** „They are not used for final decisions about persons: selection, assessment and termination are not based on an AI result.“ / „Nicht eingesetzt werden sie für abschließende Entscheidungen über Personen …“
- **Befund:** Anhang III Nr. 4 erfasst schon das Sichten, Filtern und Bewerten von Bewerbungen, die Aufgabenzuteilung nach Verhalten und die Leistungsbewertung, nicht erst die abschließende Entscheidung. Wer einen allgemeinen Textassistenten dafür einsetzt, ändert dessen Zweckbestimmung und kann nach Art. 25 Abs. 1 lit. c selbst Anbieter eines Hochrisiko-Systems werden (Pflichten ab 2.12.2027, Art. 113 lit. c i). Der Text erlaubt also genau das Vorsortieren von Bewerbungen, das das Handbuch 2.2 ausschließen will („must not rank applicants“, „everything that concerns applications … is excluded“). Widerspruch zum Handbuch und rechtlich riskant.
- **Schwere:** A
- **Quelle:** Verordnung (EU) 2024/1689, Anhang III Nr. 4 lit. a und b, Art. 25 Abs. 1 lit. c, Art. 113 lit. c i, konsolidiert 27.07.2026, https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727, abgerufen 23.10.2026.
- **Korrektur:**
  EN: „They are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions on hiring, working conditions, promotion, task allocation, performance or termination.“
  DE: „Nicht eingesetzt werden sie, um Bewerbungen oder Beschäftigte auszuwählen, zu sichten, zu reihen oder zu bewerten, und nicht, um Entscheidungen über Einstellung, Arbeitsbedingungen, Beförderung, Aufgabenzuteilung, Leistung oder Beendigung vorzubereiten oder zu treffen.“

### 2. Deepfake-Begriff zu eng: „zeigt Wirkliches“ statt „ähnelt“
- **Ort:** D1 § 7 (policy-en.pdf S. 2, policy-de.pdf S. 2), `policy.mjs` Z. 30, 66; D5 Punkt 5, zweiter Prüfpunkt (labelling-en.pdf S. 2, labelling-de.pdf S. 2), `labelling.mjs` Z. 26, 55.
- **Zitat:** D1 „images, audio and video that show things that exist“ / „Bild-, Ton- und Videoinhalte, die wirklich Vorhandenes zeigen“. D5 „Does the content show real persons, objects …“ / „Zeigt der Inhalt wirkliche Personen …“
- **Befund:** Art. 3 Nr. 60 verlangt, dass der Inhalt wirklichen Personen, Orten oder Ereignissen „ähnelt“ (EN „resembles existing“). Die Leitlinien Rn. 113 stellen klar: Es genügt, dass etwas existiert, plausibel existieren kann oder plausibel existiert haben könnte; realistische KI-Personen zählen dazu. Das Handbuch nennt als Beispiel genau so einen Fall (erfundener Techniker vor einem Schaltschrank, Abschnitt 5). Mit der Frage „zeigt der Inhalt wirkliche Personen?“ antwortet der Betrieb bei diesem Bild „nein“ und kennzeichnet nicht. Der Beispielbetrieb hat G2 = ja, die Frage trifft ihn also direkt. Das Handbuch zitiert den Begriff richtig; die Dokumente nicht.
- **Schwere:** A
- **Quelle:** Art. 3 Nr. 60 und Art. 50 Abs. 4 UAbs. 1 KI-VO, konsolidiert 27.07.2026, EUR-Lex EN und DE, abgerufen 23.10.2026; Leitlinien C(2026) 5054 vom 20.07.2026, Rn. 113, https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems, abgerufen 23.10.2026.
- **Korrektur:**
  D1 EN: „… images, audio and video that resemble real persons, objects, places or events and could be taken for genuine, including realistic people or scenes that never existed; …“
  D1 DE: „… Bild-, Ton- und Videoinhalte, die wirklichen Personen, Gegenständen, Orten oder Ereignissen ähneln und für echt gehalten werden könnten, auch realistische Personen oder Szenen, die es nie gab; …“
  D5 EN: „Does the content resemble real or plausibly real persons, objects, places, entities or events (invented but realistic people or scenes count), and could a person take it for genuine? Deep fake: yes / no, one sentence of reasoning: [sentence]“
  D5 DE: „Ähnelt der Inhalt wirklichen oder plausibel wirklichen Personen, Gegenständen, Orten, Einrichtungen oder Ereignissen (erfundene, aber realistische Personen oder Szenen zählen mit), und könnte eine Person ihn für echt halten? Deepfake: ja / nein, Begründung in einem Satz: [Satz]“

### 3. D3 Register: Auswahlliste „Freigabe“ ist kaputt
- **Ort:** example-electrical-ltd-register-en.xlsx und muster-…-register-de.xlsx, Blatt „Register“/„Register“, Spalte H; `register.mjs` Z. 13, 41 mit `xlsx.mjs` Z. 55.
- **Beschreibung:** Die Liste wird als Komma-Text geschrieben: `"yes,yes, with restriction,no,unclear"`. Excel trennt am Komma; die Auswahl zeigt daher „yes“, „yes“, „ with restriction“, „no“, „unclear“ (DE: „ja“, „ja“, „ mit Einschränkung“, …). Eine der vier vorgesehenen Entscheidungen lässt sich nicht korrekt auswählen; wer „ with restriction“ wählt, erzeugt einen sinnlosen Eintrag. Fehlermeldung bei Falscheingabe ist aus (`showErrorMessage` fehlt), die Liste schützt also auch sonst nicht.
- **Schwere:** A
- **Korrektur:** Werte ohne Komma: EN „yes with restriction“, DE „ja mit Einschränkung“ (auch in der Notiz Z. 10, 38 und bei den Entscheidungen des Freigabeformulars Z. 30, 58 gleich schreiben). Besser: Listen auf ein ausgeblendetes Blatt „Listen“ legen und per Bereich referenzieren; `showErrorMessage: true` mit kurzer Meldung setzen.

### 4. D4 Übersicht „je Person“ hat keine Namensspalte
- **Ort:** example-electrical-ltd-training-overview-en.xlsx Blatt „Per person“, muster-…-training-overview-de.xlsx Blatt „Je Person“; `training.mjs` Z. 20, 39.
- **Beschreibung:** Spalten: Funktion, benutzt KI-Tools, erste/letzte Einweisung, Inhalte, Kenntnisnahme am, nächste Einweisung, Bemerkungen. Die Notiz sagt „Names are entered by the business“, es gibt aber keine Spalte dafür. Bei zwei Monteuren mit gleicher Funktion ist nicht festzuhalten, wer die Richtlinie wann zur Kenntnis genommen hat; genau dafür verweist D1 („the confirmation is recorded in the briefing overview“) und Plan-Schritt 10 auf diese Datei. Damit erfüllt die Datei ihren Zweck nicht.
- **Schwere:** A
- **Korrektur:** Erste Spalte „Name“ / „Name“ (Breite 26), gelb markiert; Notiz ergänzen: EN „Enter one name per row; the generator never fills names.“ DE „Je Zeile einen Namen eintragen; der Generator trägt nie Namen ein.“

### 5. D7 meldet „0 private Konten“, obwohl der Betrieb private Nutzung angegeben hat
- **Ort:** example-electrical-ltd-evidence-en.pdf (Zeile Tool register), muster-…-evidence-de.pdf; `evidence.mjs` Z. 15, 31, 56 bis 57, 64; `register.mjs` Z. 67 bis 81 (registerRows); Beispieldaten `questions.json` B2/B3.
- **Zitat:** „3 tools recorded · 3 unclear · 0 private accounts not permitted“ / „3 Tools erfasst · 3 unklar · 0 private Konten nicht zulässig“
- **Befund:** Frage B3 („Werden Tools auf privaten Telefonen oder über private Konten dienstlich benutzt?“) ist im Beispiel mit „ja“ beantwortet, und das Handbuch beschreibt zwei Monteure mit privat eingerichtetem Assistenten (Handbuch 0 und 2.1). B3 wird von keinem Dokument ausgewertet; das Register hat keine Zeile für diese Nutzung, und die Nachweisseite meldet einem Versicherer oder Kunden „0“. Das widerspricht dem eigenen Satz „Open items are listed, not hidden“. Dazu ist „0 private accounts not permitted“ doppeldeutig (liest sich wie „private Konten sind nicht unzulässig“).
- **Schwere:** A
- **Korrektur:** B3 = ja oder unbekannt erzeugt im Register eine eigene Zeile „Private use on own phones or accounts“ / „Private Nutzung auf eigenen Telefonen oder Konten“ mit Freigabe „no“/„nein“ und dem Vermerk aus `notePrivate`, und in D7 den Status „Open“. Text: EN „3 tools recorded · 3 unclear · private use reported (question B3), not yet ended“; DE „3 Tools erfasst · 3 unklar · private Nutzung gemeldet (Frage B3), noch nicht beendet“. Ohne private Nutzung: EN „no private account in use“, DE „kein privates Konto in Gebrauch“.

### 6. PDFs ohne Seitenzahlen und ohne Kopfzeile auf Folgeseiten; Unterschriftsseiten nicht zuzuordnen
- **Ort:** alle sechs PDF-Typen; `pdf.mjs` Z. 21 (`page.pdf` ohne `displayHeaderFooter`), `blocks.mjs` Z. 42 und 45 (Kopf- und Fußzeile nur als Block am Anfang und Ende), Z. 88 bis 90.
- **Beschreibung:** Kopfzeile nur auf Seite 1, Fußzeile nur am Ende, keine Seitenzahl. Folgen im Beispiel: D3 Freigabeformular S. 2, 4, 6 enthalten Entscheidung und zwei Unterschriften, aber keinen Toolnamen, keinen Betrieb, kein Datum (welches Tool wurde freigegeben?); D4 S. 2 und 4 tragen Teilnehmerzeilen 4 bis 14 mit Unterschriften ohne Gruppe und Datum; D1 S. 3 (EN) besteht nur aus der Unterschriftslinie und der Fußnote, die Seite ist austauschbar. Die DOCX haben Kopfzeile und „Seite X von Y“, die PDFs nicht. Für Nachweise gegenüber Versicherern oder Kunden ist das ein echter Mangel.
- **Schwere:** A
- **Korrektur:** In `pdf.mjs` `displayHeaderFooter: true` mit `headerTemplate` (Betrieb · Titel · Fassung) und `footerTemplate` („Page X of Y“ / „Seite X von Y“), Ränder anpassen. Zusätzlich: im Freigabeformular über „Decision“ die Zeile „Decision for: [tool]“ / „Entscheidung für: [Tool]“ und Fragen, Entscheidung und Unterschriften als ein Block mit `break-inside: avoid` (oder Fragentabelle kompakter, siehe 35), damit ein Tool auf eine Seite passt; in D4 über der Teilnehmertabelle eine Zeile „Group: … · Date: …“, die bei Seitenwechsel wiederholt wird (im `thead`); in D1 den Schlussabschnitt mit Unterschrift zusammenhalten.

---

## B: ungenau, unklar, unbelegt

### 7. Belegregel: Rechtsaussagen ohne Fundstelle mit Abrufdatum, Auslegungen ohne Marker
- **Ort:** D4 Hinweis (`training.mjs` Z. 10, 29), D5 überall (`labelling.mjs` Z. 9 bis 34, 39 bis 64), D7 Zeilen „(Art. 4 AI Act)“, „(Art. 50 AI Act)“ (`evidence.mjs` Z. 17 bis 18, 33 bis 34), D1 Zweck („The business is the deployer“).
- **Befund:** Die Hausregel verlangt bei jeder Zahl, Frist und Rechtsaussage Quelle und Abrufdatum oder die klare Kennzeichnung als eigene Regel. In den Dokumenten stehen nur Artikelnummern ohne Fassung und Datum („applicable since 2 August 2026 (Art. 113)“), Leitlinien ohne Randnummer („according to the Commission guidelines“), und Auslegungen des Handbuchs als glatte Aussagen (D5 „for advertising it usually does not apply“, D5 „not published and do not trigger the deployer duties“; im Handbuch beide als INTERPRETATION markiert). Die Marker Fakt/Auslegung/Unsicher/Lücke kommen in keinem der sieben Dokumente vor, obwohl `blocks.mjs` sie bereitstellt (`B.mk`).
- **Schwere:** B
- **Korrektur:** Je Rechtsaussage eine Quellzeile im Muster EN „Source: Regulation (EU) 2024/1689, Art. 50 and Art. 113, consolidated version of 27 July 2026, EUR-Lex, retrieved 19 October 2026.“ / DE „Quelle: Verordnung (EU) 2024/1689, Art. 50 und Art. 113, konsolidierte Fassung vom 27. Juli 2026, EUR-Lex, abgerufen am 19. Oktober 2026.“ Auslegungen mit `B.mk('interpretation', …)` setzen. Abrufdaten zentral aus einer Konstante, damit sie mit dem Handbuch gleich bleiben.

### 8. D4: „eine interne Aufzeichnung genügt“ ist mehr als die Kommission sagt
- **Ort:** training-en.pdf S. 1 und 3, training-de.pdf S. 1 und 3, DOCX; `training.mjs` Z. 10, 29.
- **Zitat:** „According to the European Commission no certificate is required; an internal record of training and guidance suffices.“ / „… eine interne Aufzeichnung der Schulungen genügt.“
- **Befund:** Die Kommission schreibt, es brauche kein Zertifikat und Organisationen „can keep“ eine interne Aufzeichnung. „Genügt“ macht daraus eine Aussage über Ausreichen, die zwei Sätze vorher selbst verneint wird („It does not record that it was sufficient“). Quelle und Datum fehlen. Hinweis: Die Seite trägt jetzt „Last update 20 October 2026“ und nennt nur noch „from 2 August 2026 onwards“ für Aufsicht und Durchsetzung (für die Handbuchprüfung, Abschnitt 4 und 8.15).
- **Schwere:** B
- **Quelle:** European Commission, AI literacy, questions and answers, https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers, abgerufen 23.10.2026.
- **Korrektur:**
  EN: „The European Commission states that no certificate is needed and that organisations can keep an internal record of trainings and other guiding initiatives (AI literacy Q&A, retrieved 23 October 2026; guidance, not law). This sheet is such a record.“
  DE: „Die Europäische Kommission schreibt, dass kein Zertifikat nötig ist und Organisationen eine interne Aufzeichnung der Schulungen und anderer Anleitungen führen können (KI-Kompetenz, Fragen und Antworten, abgerufen am 23. Oktober 2026; Leitfaden, kein Gesetz). Dieses Blatt ist eine solche Aufzeichnung.“

### 9. D5: veralteter Satz „Wortlaut am Amtsblatt zu prüfen“
- **Ort:** labelling-en.pdf S. 1, labelling-de.pdf S. 1; `labelling.mjs` Z. 9, 39.
- **Zitat:** „The wording of Article 50 is to be checked against the Official Journal before any use beyond this checklist (handbook, open points).“
- **Befund:** Handbuch 8.1 sagt „Resolved“, der Wortlaut ist gelesen. Der Satz verunsichert und verweist auf einen offenen Punkt, den es nicht mehr gibt. Wortlaut von Art. 50 heute gegen EUR-Lex geprüft: D5 DE Punkt 7 stimmt mit Art. 50 Abs. 5 überein.
- **Schwere:** B
- **Korrektur:** EN „The wording was read at the consolidated text of 27 July 2026 (EUR-Lex, retrieved 19 October 2026); check for later amendments at each review.“ DE „Der Wortlaut ist an der konsolidierten Fassung vom 27. Juli 2026 gelesen (EUR-Lex, abgerufen am 19. Oktober 2026); bei jeder Wiedervorlage auf spätere Änderungen prüfen.“

### 10. D5 Punkt 3: Übergangsfrist unnötig unsicher formuliert
- **Ort:** labelling-en.pdf S. 1 bis 2, labelling-de.pdf S. 2; `labelling.mjs` Z. 19, 21, 49, 51.
- **Zitat:** „Art. 111 (4) as amended (to be checked)“, „the provider may have time for paragraph 2 until 2 December 2026“.
- **Befund:** Art. 111 Abs. 4 ist durch die Verordnung (EU) 2026/1744 eingefügt (nicht „geändert“) und heute in der konsolidierten Fassung nachgelesen: Anbieter generativer Systeme, die vor dem 2.8.2026 in Verkehr gebracht wurden, haben für Abs. 2 bis 2.12.2026 Zeit. Leitlinien Rn. 153: gilt nur für die Kennzeichnung nach Abs. 2, der Hinweis nach Abs. 1 gilt seit 2.8.2026. Das Handbuch führt das als Fakt.
- **Schwere:** B
- **Quelle:** Art. 111 Abs. 4 KI-VO, konsolidiert 27.07.2026, EUR-Lex, abgerufen 23.10.2026; Leitlinien C(2026) 5054 Rn. 153.
- **Korrektur:** Quellzeile EN „Art. 50 (1) and (2); Art. 111 (4), inserted by Regulation (EU) 2026/1744“, DE „Art. 50 Abs. 1 und 2; Art. 111 Abs. 4, eingefügt durch Verordnung (EU) 2026/1744“. Hinweis EN „For generative systems placed on the market before 2 August 2026 the provider has until 2 December 2026 for paragraph 2; the notice under paragraph 1 applies since 2 August 2026. Until then enter "no statement" and set a review date after 2 December 2026.“ DE entsprechend.

### 11. D5 Punkt 8: „published after“ statt „on or after“, Leitlinien nicht als Quelle genannt
- **Ort:** labelling-en.pdf S. 3, labelling-de.pdf S. 3; `labelling.mjs` Z. 31 bis 32, 60 bis 61.
- **Befund:** Leitlinien Rn. 154: Text, vor dem 2.8.2026 erzeugt und „on or after that date“ veröffentlicht, ist zu kennzeichnen. Ein am 2.8.2026 veröffentlichter Text fällt nach D5 durch. Die Quellzeile nennt nur Art. 113 und 111 Abs. 4, die Aussage stammt aber aus den Leitlinien.
- **Schwere:** B
- **Korrektur:** EN „… text generated before but published on or after that date must be labelled: check against the original.“ Quelle „Art. 113; Commission guidelines C(2026) 5054, point 154“. DE „… ein vorher erzeugter, aber an oder nach diesem Tag veröffentlichter Text schon …“, Quelle „Art. 113; Leitlinien der Kommission C(2026) 5054, Rn. 154“.

### 12. D5 Punkt 9: Art. 50 Abs. 6 sagt nicht, was ihm zugeschrieben wird
- **Ort:** labelling-en.pdf S. 3, labelling-de.pdf S. 3; `labelling.mjs` Z. 33 bis 34, 62 bis 63.
- **Befund:** Abs. 6 lässt Kapitel III und andere Transparenzpflichten unberührt. Datenschutz, Wettbewerbsrecht, Persönlichkeitsrechte und Urheberrecht nennt er nicht. Die Aussage ist richtig als Auslegung, falsch als Zitat dieser Fundstelle.
- **Schwere:** B
- **Quelle:** Art. 50 Abs. 6 KI-VO, EUR-Lex, abgerufen 23.10.2026.
- **Korrektur:** EN „Paragraphs 1 to 4 leave Chapter III and other transparency obligations in Union or national law unaffected (Art. 50 (6)). Interpretation: labelling does not make a use lawful; data protection, competition law, personality rights and copyright apply separately.“ DE „Die Absätze 1 bis 4 lassen Kapitel III und andere Transparenzpflichten im Unions- oder nationalen Recht unberührt (Art. 50 Abs. 6). Auslegung: Die Kennzeichnung macht die Nutzung nicht rechtmäßig; Datenschutz, Wettbewerbsrecht, Persönlichkeitsrechte und Urheberrecht gelten daneben.“

### 13. D5 Punkt 4: „Datenschutzerklärung oder Fußzeile“ steht nicht in den Leitlinien
- **Ort:** Generatortext, im Beispiel nicht sichtbar (G1 = nein); `labelling.mjs` Z. 24, 53.
- **Befund:** Rn. 38 nennt Hinweise nur in Geschäftsbedingungen, URLs oder Dokumentation, dazu unklare Signale wie „Assistent“ und allgemeine Hinweise. Datenschutzerklärung und Fußzeile sind Zusätze ohne Beleg.
- **Schwere:** B
- **Quelle:** Leitlinien C(2026) 5054, Rn. 38, abgerufen 23.10.2026.
- **Korrektur:** EN „… a notice only in terms and conditions, URLs or documentation, or a generic label such as "assistant", does not suffice on its own (Commission guidelines C(2026) 5054, point 38).“ DE „… ein Hinweis nur in Geschäftsbedingungen, über Links oder in Dokumentationen, oder eine allgemeine Bezeichnung wie „Assistent“, genügt allein nicht (Leitlinien C(2026) 5054, Rn. 38).“

### 14. D5 Punkt 6: Ausnahme für Angebots- und Produkttexte ohne den Vorbehalt der Leitlinien
- **Ort:** labelling-en.pdf S. 2, labelling-de.pdf S. 2; `labelling.mjs` Z. 28, 57.
- **Zitat:** „not pure offer and product texts“ / „nicht: reine Angebots- und Produkttexte“.
- **Befund:** Rn. 131 nimmt Werbung und Produktbeschreibungen nur aus, wenn sie keine Aussagen etwa zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit enthalten. Ein Elektrobetrieb schreibt in Produkt- und Angebotstexten oft über Sicherheit. Ohne den Vorbehalt kreuzt er „nein“ an, wo „ja“ möglich ist.
- **Schwere:** B
- **Quelle:** Leitlinien C(2026) 5054, Rn. 131, abgerufen 23.10.2026.
- **Korrektur:** EN „(… not: advertising and product texts without claims on health, consumer safety or sustainability; product texts with such claims, for example on electrical safety, count as covered; mixed texts in doubt as covered)“. DE „(… nicht: Werbe- und Produkttexte ohne Aussagen zu Gesundheit, Verbrauchersicherheit oder Nachhaltigkeit; Produkttexte mit solchen Aussagen, etwa zur elektrischen Sicherheit, gelten als erfasst; Mischtexte im Zweifel wie erfasste behandeln)“.

### 15. D5 Punkt 5: „Ausnahme“ für künstlerische Werke ist eine abgeschwächte Pflicht
- **Ort:** labelling-en.pdf S. 2, labelling-de.pdf S. 2; `labelling.mjs` Z. 26, 55 (vierter Prüfpunkt).
- **Befund:** Der Prüfpunkt spricht von „exception“/„Ausnahme“. Nach Art. 50 Abs. 4 UAbs. 1 und Rn. 123 bleibt die Offenlegung, nur in einer Form, die das Werk nicht stört. Ein Leser versteht „Ausnahme“ als „keine Kennzeichnung“. „Bei Werbung greift sie in der Regel nicht“ ist eine Auslegung (Leitlinien: Einzelfall), ohne Marker.
- **Schwere:** B
- **Quelle:** Art. 50 Abs. 4 UAbs. 1 KI-VO; Leitlinien C(2026) 5054, Rn. 119 bis 123, abgerufen 23.10.2026.
- **Korrektur:** EN „Evidently artistic, creative, satirical or fictional work: the duty is reduced, not removed; the AI origin is still disclosed in a way that does not hamper the work. Reasoning: [reasoning or "not claimed"]. Interpretation: advertising rarely qualifies; case by case.“ DE „Offensichtlich künstlerisches, kreatives, satirisches oder fiktionales Werk: Die Pflicht ist abgeschwächt, nicht aufgehoben; der KI-Ursprung wird weiterhin offengelegt, ohne das Werk zu stören. Begründung: [Begründung oder „nicht beansprucht“]. Auslegung: Werbung fällt selten darunter; Einzelfall.“

### 16. D5 Punkt 1: Betreiberbegriff im Englischen ungenau, „wesentlich verändert“ ohne Bezug
- **Ort:** labelling-en.pdf S. 1; `labelling.mjs` Z. 12, 14 (EN), 44 (DE).
- **Befund:** EN „uses the system under its own responsibility“ ist die Rückübersetzung des deutschen „in eigener Verantwortung“; der amtliche englische Text sagt „under its authority“ (Art. 3 Nr. 4). Die DE-Fassung ist korrekt. „Substantially modified“ ist ein Begriff aus Art. 25 für Hochrisiko-Systeme; die Quellzeile nennt nur Art. 3.
- **Schwere:** B
- **Quelle:** Art. 3 Nr. 4, Art. 25 Abs. 1 KI-VO, EUR-Lex EN und DE, abgerufen 23.10.2026.
- **Korrektur:** EN „… is the deployer because it uses the system under its authority (Art. 3 (4)) …“; dritter Prüfpunkt EN „No tool is offered to others under the business's own name, and no tool is used for a purpose listed as high-risk (Annex III). If either applies, the business may become a provider (Art. 3 (3), Art. 25); ask a specialist.“ DE „Kein Tool wird unter eigenem Namen an andere abgegeben, und keines wird für einen Hochrisiko-Zweck nach Anhang III eingesetzt. Trifft eines zu, kann der Betrieb Anbieter werden (Art. 3 Nr. 3, Art. 25); Fachperson fragen.“

### 17. D5 ohne Unterschrift und ohne Anleitung für mehrere Fälle
- **Ort:** labelling-en.pdf und labelling-de.pdf S. 3; `labelling.mjs` Z. 79 bis 106.
- **Befund:** Die Checkliste hält Entscheidungen der verantwortlichen Person fest, hat aber weder Datum noch Unterschrift am Ende. Punkte 5 und 6 gelten „je Bild“ und „je Veröffentlichung“, erscheinen aber einmal, ohne Hinweis, dass sie je Fall zu kopieren sind, und mit Platzhaltern in eckigen Klammern, in die man auf Papier nicht schreiben kann.
- **Schwere:** B
- **Korrektur:** Am Ende `B.sign` mit EN „Date, signature of the person responsible for labelling“ / DE „Datum, Unterschrift der für die Kennzeichnung verantwortlichen Person“. Unter Punkt 5 und 6 EN „Copy this block for each image, audio, video or text; in the DOCX the block is ready to copy.“ DE „Diesen Block je Bild, Ton, Video oder Text kopieren; im DOCX ist er dafür vorbereitet.“ Platzhalter als Feldzeilen mit Schreiblinie statt „[…]“.

### 18. D1 § 8: keine Prüfung, ob eine Datenpanne nach Art. 33 DSGVO zu melden ist
- **Ort:** policy-en.pdf S. 2, policy-de.pdf S. 2; `policy.mjs` Z. 32, 68.
- **Befund:** Der Abschnitt regelt die interne Meldung, sagt aber nicht, was die empfangende Person dann tut. Wurden Kundendaten versehentlich in ein externes Tool eingegeben, kann eine Verletzung des Schutzes personenbezogener Daten vorliegen; dann gilt die 72-Stunden-Frist. Ob die Fehleingabe eine solche Verletzung ist, ist Auslegung (Stand prüfen); die Frage gehört aber in die Regel, sonst weiß die Büroleitung nicht, dass eine Uhr läuft.
- **Schwere:** B
- **Quelle:** Verordnung (EU) 2016/679, Art. 4 Nr. 12 und Art. 33 Abs. 1, https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02016R0679-20160504, abgerufen 23.10.2026.
- **Korrektur:** EN „If personal data were concerned, [A7] checks the same day whether the incident must be notified to the data protection authority; the deadline is 72 hours after becoming aware of it, unless it is unlikely to result in a risk to the persons concerned (Art. 33 GDPR).“ DE „Sind personenbezogene Daten betroffen, prüft [A7] noch am selben Tag, ob der Vorfall der Datenschutzbehörde zu melden ist; die Frist beträgt 72 Stunden ab Kenntnis, außer der Vorfall führt voraussichtlich zu keinem Risiko für die Betroffenen (Art. 33 DSGVO).“ Satz als Auslegung markieren.

### 19. D1 § 2 erlaubt „Angebotsentwürfe“, § 3 verbietet Preise, Kalkulationen und Kundendaten
- **Ort:** policy-en.pdf S. 1; `policy.mjs` Z. 15, 19, 51, 55; Optionstext `questions.json` C1 „quotes“.
- **Befund:** Für Beschäftigte ist nicht klar, wie ein Angebotsentwurf ohne Preise, Kalkulation und Kundenangaben aussieht. Ohne Klarstellung wird entweder § 3 gebrochen oder die erlaubte Nutzung nicht genutzt.
- **Schwere:** B
- **Korrektur:** Optionstext EN „Drafts of quotes and offers (text only; prices, calculations and customer details are added outside the tool)“, DE „Entwürfe für Angebote (nur Text; Preise, Kalkulation und Kundenangaben werden außerhalb des Tools eingesetzt)“.

### 20. D1 § 3 gegen § 4 und gegen den Freigabemaßstab
- **Ort:** `policy.mjs` Z. 19, 24, 55, 60 (Variante E1 = „approved“); im Beispiel sichtbar als Maßstab im Freigabeformular und Register (`register.mjs` Z. 102, 135).
- **Befund:** § 3 sagt „never … whatever the access“ für personenbezogene Daten. Mit E1 = „approved“ erlaubt § 4 sie in freigegebenen Tools: offener Widerspruch in derselben Richtlinie. Im Beispiel (E1 = Platzhalter) lautet der Maßstab „Without a data processing agreement, no approval for personal data“, obwohl § 3 personenbezogene Daten ohnehin ausschließt; der Leser fragt sich, wofür dann geprüft wird.
- **Schwere:** B
- **Korrektur:** Bei E1 = „approved“ beginnt § 3 mit EN „Except as allowed in § 4, …“ / DE „Soweit § 4 nichts anderes zulässt, …“. Bei E1 ≠ „approved“ im Freigabeformular unter dem Maßstab EN „Under § 3 and § 4 of the policy no personal data are entered at present; this standard applies once § 4 is changed.“ DE „Nach § 3 und § 4 der Richtlinie werden derzeit keine personenbezogenen Daten eingegeben; der Maßstab greift, sobald § 4 geändert wird.“

### 21. Begriff „approved/freigegeben“ in D1 und D2, Register kennt nur „yes/ja“
- **Ort:** D1 § 1 (`policy.mjs` Z. 11, 47), D2 (`poster.mjs` Z. 12, 22), Register Spalte H (`register.mjs` Z. 13, 41).
- **Befund:** Richtlinie und Aushang erlauben Tools mit dem Vermerk „approved“ / „freigegeben“. Im Register heißt die Spalte „Approval“ und die Werte sind „yes / yes with restriction / no / unclear“. Ob „yes with restriction“ als „approved“ gilt, bleibt offen.
- **Schwere:** B
- **Korrektur:** EN „… listed in the tool register with approval "yes" or "yes with restriction" (within the restriction) …“ DE „… die im Tool-Register mit Freigabe „ja“ oder „ja mit Einschränkung“ (im Rahmen der Einschränkung) stehen …“. Gleich im Aushang.

### 22. Verantwortliche: „Owner or managing director“ ist keine Person, Bezeichnungen und Geschlecht wechseln
- **Ort:** D1 Kopf und § 7, D5 Kopf, D6 Spalte B, D7; Quelle der Texte `engine.mjs` Z. 45 (Rollenlabel wird zum Antworttext), `questions.json` A4, A6, A9, H1.
- **Befund:** Dieselbe Person heißt „Owner or managing director“ / „Inhaber oder Geschäftsführung“ (A4, A6), „The owner“ / „Die Inhaberin“ (H1) und „the owner“ / „die Inhaberin“ (A9 Vertretung). Eine Richtlinie mit „Verantwortlich: Inhaber oder Geschäftsführung“ benennt keine Person; im Deutschen wechselt zudem Inhaber und Inhaberin. Für Versicherer und Beschäftigte unklar, ob zwei Personen gemeint sind.
- **Schwere:** B
- **Korrektur:** Rollenlabel und Antworttext trennen: Auswahl „Inhaberin oder Inhaber / Geschäftsführung“ bleibt im Fragebogen, in die Dokumente geht EN „the owner“ / DE „die Inhaberin“ (Beispiel) oder der eingegebene Name. Beispiel einheitlich auf „the owner (Maria Example)“ / „die Inhaberin (Maria Muster)“, wenn Namen erwünscht sind; sonst nur Funktion, aber immer dieselbe.

### 23. D2 Aushang: Ansprechperson ohne Erreichbarkeit, zugelassene Tools nicht genannt
- **Ort:** poster-en.pdf, poster-de.pdf; `poster.mjs` Z. 9, 12, 14, 19, 22, 24; Beispiel `questions.json` A7, A8 contact.
- **Befund:** „Ask Office management (in person or by phone)“: keine Telefonnummer, kein Name. Für Monteure auf der Baustelle ist das nicht direkt nutzbar. „Allowed are the tools in the register marked "approved"“: Wer vor dem Aushang steht, sieht nicht, welche Tools das sind, und das Register liegt im Büro.
- **Schwere:** B
- **Korrektur:** Kontaktfeld im Fragebogen mit Pflicht-Telefon („in person or by phone, ext. 12“). Auf dem Aushang eine Zeile EN „Approved tools (as of ______): ____________________“ / DE „Freigegebene Tools (Stand ______): ____________________“ zum Ausfüllen oder aus dem Register, sobald eine Zeile „yes“ hat.

### 24. D3 Freigabeformular: erlaubte Antworten fehlen, „welche Einschränkung“ hat kein Feld
- **Ort:** approval-en.pdf und approval-de.pdf je Tool; `register.mjs` Z. 132 bis 135.
- **Befund:** Die Spalte „Answer“ ist leer; die vier Antworten, die das Register vorgibt (yes / no / no statement on the page checked / not surveyed), stehen nicht auf dem Formular. Wer es von Hand ausfüllt, schreibt frei. „approved with restriction (which)“ hat keine Schreiblinie.
- **Schwere:** B
- **Korrektur:** Kopf der Spalte EN „Answer (yes / no / no statement / not surveyed)“, DE „Antwort (ja / nein / keine Angabe / nicht erhoben)“, oder vier kleine Kästchen je Zeile. Unter „approved with restriction“ eine Feldzeile EN „Restriction:“ / DE „Einschränkung:“.

### 25. D3 XLSX Blatt „Approval check“: kein Toolfeld, Auswahlliste auf den falschen Zeilen
- **Ort:** register-en.xlsx Blatt „Approval check“, register-de.xlsx „Freigabeprüfung“; `register.mjs` Z. 100 bis 105.
- **Befund:** Das Blatt heißt „je Tool“, hat aber kein Feld für das Tool. Die Liste ja/nein/… liegt auf B4:B14, also auch auf „Decision“, „Standard of the business“, „Checked by“, „Review due“. Die vorbefüllten Werte („Without a data processing agreement …“, „Office management“) verletzen damit die eigene Prüfregel, und für die Entscheidung bietet die Liste „yes/no“ statt der drei Entscheidungen.
- **Schwere:** B
- **Korrektur:** Erste Zeile „Tool“ / „Tool“ (gelb). Liste nur auf die sieben Fragezeilen; Zeile „Decision“ mit eigener Liste „approved without restriction, approved with restriction, not approved“ (ohne Kommas im Wert, siehe 3). Hinweis EN „Copy this sheet once per tool“ / DE „Dieses Blatt je Tool kopieren“, oder ein Blatt mit einer Spalte je Tool.

### 26. D3 Register: gelbe Markierung unvollständig, Zweck für alle Tools gleich
- **Ort:** register-en.xlsx und register-de.xlsx, Blatt „Register“; `register.mjs` Z. 89, 96.
- **Befund:** Gelb sind nur Freigabe, Geprüft am, Wiedervorlage. Leer und vom Betrieb auszufüllen sind aber auch „Name and provider“, „Users“ und „Data kinds“; sie sind weiß, obwohl die Notiz sagt „Yellow cells: the business decides“. Die Spalte „Purpose“ trägt bei jedem Tool alle Zwecke aus C1 (auch der Übersetzungsdienst „drafts of quotes …“), ebenso im Freigabeformular „Purpose in the business“.
- **Schwere:** B
- **Korrektur:** `gapColumns: [3, 4, 5, 7, 8, 9, 10]`. Zweck vorbefüllen nur, wenn eindeutig (Übersetzungsdienst → „translations“), sonst gelb mit Hinweis EN „Keep only the purposes this tool is used for.“ / DE „Nur die Zwecke stehen lassen, für die dieses Tool benutzt wird.“

### 27. D3 Vermerk zum geteilten Konto klingt wie eine Freigabe
- **Ort:** Register Zeile 3 Spalte K; `register.mjs` Z. 16, 44.
- **Zitat:** „Shared account: one account for several people; no personal names, functional address.“
- **Befund:** Ein Login für mehrere Personen kann gegen die Bedingungen des Anbieters verstoßen und macht nicht nachvollziehbar, wer was eingegeben hat (wichtig für § 8). Der Vermerk beschreibt nur und nennt keine Prüffrage. Stand prüfen je Anbieter.
- **Schwere:** B
- **Korrektur:** EN „Shared account: one login for several people. Check that the provider's terms allow it and how inputs can be traced to a person if an incident is reported.“ DE „Geteiltes Konto: ein Zugang für mehrere Personen. Prüfen, ob die Bedingungen des Anbieters das erlauben und wie sich Eingaben bei einer Meldung einer Person zuordnen lassen.“

### 28. D4 Teilnehmerliste ohne Unterschrift der durchführenden Person
- **Ort:** training-en.pdf S. 2 und 4, training-de.pdf S. 2 und 4; `training.mjs` Z. 85.
- **Befund:** Die Teilnehmenden unterschreiben, die Person, die eingewiesen hat, nicht. Damit fehlt die Bestätigung, dass die angekreuzten Inhalte tatsächlich behandelt wurden.
- **Schwere:** B
- **Korrektur:** Nach den Feldern `B.sign` mit EN „Date, signature of the person conducting the briefing“ / DE „Datum, Unterschrift der einweisenden Person“.

### 29. D6 Plan: Zieldaten und Reihenfolge
- **Ort:** plan-en.xlsx und plan-de.xlsx, Blatt „Plan“; `plan.mjs` Z. 47 bis 48.
- **Befund:** (a) Schritt 14 „Enter the review“ bekommt als Zieldatum den Überprüfungstermin selbst (20.11.2027); der Schritt ist aber beim Inkraftsetzen zu erledigen. (b) Schritt 10 (Kenntnisnahme bestätigen) liegt am Tag der Einweisung (6.11.), Schritt 12 (Richtlinie unterschreiben) erst am 20.11.: Beschäftigte bestätigen den Erhalt eines nicht unterschriebenen Entwurfs. (c) Schritte 1 bis 8, 11, 13, 15 haben kein Zieldatum; der Plan sagt dem Inhaber nicht, was bis zur Einweisung fertig sein muss.
- **Schwere:** B
- **Korrektur:** Schritt 14 Zieldatum = Geltungsbeginn; Schritt 12 Zieldatum = Tag vor der Einweisung (Unterschrift vor Aushändigung), Geltungsbeginn bleibt I1. Schritte 1 bis 8 und 11 mit Vorschlag „Einweisung minus 7 Tage“, Schritt 13 = Geltungsbeginn, Schritt 15 „bei Eintritt“. Alternativ Handbuch-Reihenfolge anpassen; dann beide gemeinsam.

### 30. D7: „Regulated“ für Meldeweg und Ansprechperson, obwohl die Richtlinie noch nicht gilt; Titel verspricht zu viel
- **Ort:** evidence-en.pdf, evidence-de.pdf; `evidence.mjs` Z. 11, 27, 68 bis 69.
- **Befund:** Die Richtlinie steht auf „Planned“ (gilt ab 20.11.2026), Meldeweg und Ansprechperson stammen aus genau dieser Richtlinie und stehen trotzdem grün auf „Regulated“. Der Titel „What Example Electrical Ltd has regulated“ über einer Seite mit sechs von acht Punkten offen oder geplant wirkt gegenüber Versicherern wie mehr, als da ist.
- **Schwere:** B
- **Korrektur:** Status von Meldeweg und Ansprechperson an den Status der Richtlinie koppeln (vor Geltungsbeginn „Planned“, Detail EN „set in the policy, in force from …“ / DE „in der Richtlinie festgelegt, gilt ab …“). Titel EN „AI rules at Example Electrical Ltd: status on 23 October 2026“, DE „KI-Regelung bei Muster Elektrotechnik e.U.: Stand 23. Oktober 2026“.

### 31. Antworten A2 (Land) und A3 (Größe) gehen in kein Dokument ein
- **Ort:** alle Generatoren (keine Verwendung von A2, A3, B3 außer der Anzeige im Fragebogen); D5 Punkt 9 (`labelling.mjs` Z. 34, 63).
- **Befund:** D5 schreibt für jedes Land „Authority and sanctions in the own member state: to be checked“. Für Deutschland nennt das Handbuch 7.2 die Bundesnetzagentur (KI-MIG § 2); für Österreich „nicht benannt, Stand 19.10.2026“. Die Checkliste könnte das je Land mit Stand ausgeben. Die Frage A2-Hinweistext verspricht das („Decides which chamber and authority notes … shows“), aber nur für das Handbuch. Live nicht nachgeprüft (KI-MIG: nicht verifizierbar in dieser Prüfung; Sache der Handbuchprüfung).
- **Schwere:** B
- **Korrektur:** In D5 Punkt 9 je A2 eine Zeile mit Quelle und Stand aus dem Handbuch, z. B. DE (AT) „Österreich: Marktüberwachungsbehörde nach Stand 19. Oktober 2026 nicht benannt (Handbuch 7.1). Erneut prüfen am: [Datum]“; (DE) „Deutschland: Bundesnetzagentur nach § 2 Abs. 1 KI-MIG (Handbuch 7.2, Stand 19. Oktober 2026)“.

---

## C: Lesbarkeit, Optik, Stil

### 32. D2 Aushang ist für die Wand zu klein gesetzt
- **Ort:** poster-en.pdf, poster-de.pdf; Stil `pg--poster` in `public/site.css` bzw. `printCss` in `blocks.mjs` Z. 73 bis 93.
- **Beschreibung:** Fließtext etwa 11 pt, Überschriften 12 pt, Titel 18 pt; unteres Viertel der Seite leer. Aus einem Meter Abstand kaum lesbar. Die Unterzeile bricht mitten im Datum („effective 20 / November 2026“, DE „gültig ab 20. / November 2026“). Ankreuzkästchen vor der Verbotsliste lesen sich auf einem Aushang wie „ankreuzen, wenn erlaubt“. Doppelungen: „Access codes to customer sites“ steht schon in „Access data, passwords, keys, access codes“; „Standard and norm numbers“ steht schon in „References, standards, sources“.
- **Korrektur:** Eigenes `printCss` für den Aushang: Fließtext 15 bis 16 pt, Überschriften 20 pt, Titel 30 pt, Seite füllen; geschützte Leerzeichen im Datum; vor der Verbotsliste ein Kreuz- oder Verbotszeichen statt Kästchen; D1-Zusätze nur anhängen, wenn sie nicht in der Grundliste enthalten sind.

### 33. Grammatik bei Funktionsbezeichnungen
- **Ort:** D1 DE durchgehend, D2, D5, D7 (alle Satzbausteine mit `${who}`): `policy.mjs` Z. 47, 49, 56, 64, 66, 68, 70; `evidence.mjs` Z. 30, 33; `training.mjs` Groß/klein der Gruppen.
- **Beschreibung:** DE „Das Register führt Büroleitung.“, „verwaltet Büroleitung“, „gibt Büroleitung frei“, „meldet … an Büroleitung“, „entscheidet Inhaber oder Geschäftsführung“, „durchgeführt von Die Inhaberin“, „zu unterschreiben von Inhaber oder Geschäftsführung“, „für Freie Mitarbeit“. EN „kept by Office management“, „decided by Owner or managing director“, „conducted by The owner“, Zielgruppe „field staff“ klein neben „Office“.
- **Korrektur:** Antworttexte mit Artikel speichern (DE „die Büroleitung“, „die Inhaberin“; EN „the office manager“, „the owner“) und Satzbausteine so bauen, dass am Satzanfang großgeschrieben wird; DE-Optionen von A11 als „freie Mitarbeitende“, „überlassene Arbeitskräfte“, „beauftragte Dienstleister“ in Satzform; Gruppennamen einheitlich groß.

### 34. Mehrdeutige Bezüge und holprige Stellen
- **Ort:** `policy.mjs` Z. 9, 45 („It applies …“ / „Sie gilt …“ nach „die einzelne Person“), Z. 30, 66 („It concerns …“ / „Sie betrifft …“), Z. 74 („liegen: …“); `poster.mjs` Z. 24 („Passiert ist passiert: melden.“), Z. 25 („liegt: …“).
- **Korrektur:** DE „Die Richtlinie gilt für …“; „Die Kennzeichnung betrifft …“; „Ablage der Richtlinie und der übrigen Nachweise: …“; Aushang „Etwas passiert? Sofort melden.“ (EN „Something happened? Report it.“).

### 35. Seitenumbrüche und Restflächen
- **Ort:** D1 EN S. 3 (Unterschrift allein, Seite zu 85 % leer); D3 je Tool zwei Seiten, zweite Seite zu 70 % leer, obwohl die Notiz „One page per tool“ sagt; D5 S. 1 endet mit der Überschrift „3 · Provider evidence“ und ihrer Quellzeile, die Tabelle steht auf S. 2; nach jedem Seitenwechsel im Freigabeformular und in D4 eine sichtbare gestrichelte Linie am Seitenkopf (Bildschirmstil von `.pg__break`); DE-Kopfzeilen brechen zweizeilig um; DE-Titel D5 beginnt die zweite Zeile mit „·“.
- **Korrektur:** `.pg__break` im Druck ohne Rahmen; Überschrift, Quellzeile und folgende Tabelle als ein Block halten; Freigabeformular kompakter (Fragen 10 pt, Zeilen enger), damit ein Tool auf eine Seite passt, oder Notiz in „Two pages per tool“ ändern; Kopfzeile kürzen (nur Betrieb · Kurztitel); Titel D5 DE „Kennzeichnungs-Checkliste nach Artikel 50 KI-Verordnung“.

### 36. Wichtige Rechtsaussagen in kleinem Grau
- **Ort:** Einleitungsnotizen D3, D4, D5 und Quellzeilen in D5 (etwa 9,4 pt grau, Kopfzeile etwa 8 pt).
- **Beschreibung:** Die Rechtsgrundlage von D5 und der Kommissionssatz in D4 stehen in der kleinsten, hellsten Schrift der Seite.
- **Korrektur:** Notizen auf 10,5 pt und dunkleres Grau (Kontrast mindestens 7:1 zu Weiß), Quellzeilen 9 pt sind in Ordnung.

### 37. D4 Formular: Zeilenhöhe und Feld „Form“
- **Ort:** training-en.pdf, training-de.pdf; `training.mjs` Z. 76, 84.
- **Beschreibung:** Teilnehmerzeilen etwa 8 mm hoch, knapp für Unterschriften; Tabelle bricht nach 3 Zeilen (EN) bzw. 2 Zeilen (DE Gruppe 2) um. „Form“ ist ein gelber Text zum Durchstreichen.
- **Korrektur:** Zeilenhöhe 10 bis 11 mm, Teilnehmertabelle auf eine eigene Seite mit wiederholtem Kopf; „Form“ als vier Kästchen.

### 38. XLSX: Daten als Text, kein Drucklayout, doppelte Prüfbereiche
- **Ort:** plan-*.xlsx, training-overview-*.xlsx, register-*.xlsx; `xlsx.mjs` Z. 14 bis 65; `plan.mjs` Z. 48, `training.mjs` Z. 104.
- **Beschreibung:** Daten stehen als Text „2026-11-06“ statt als Datum (keine Sortierung nach Datum, keine Datumsanzeige im Landesformat). `fitToWidth` ist gesetzt, aber ohne `fitToPage`, daher wirkungslos: das Register (11 Spalten, rund 230 Zeichen breit) druckt im Hochformat über drei Seiten, ohne Wiederholungszeilen. Jede Datenüberprüfung ist doppelt mit überlappenden Bereichen geschrieben (F10:F16 und F4:F16) und reicht eine Zeile über die Tabelle; ob Excel dabei eine Reparaturmeldung zeigt, ist nicht verifiziert. „Basis (handbook)“ zeigt nur „6“. Plan und Übersicht haben kein Anleitungsblatt.
- **Korrektur:** Datumswerte als `Date` mit Zahlenformat `dd.mm.yyyy` (DE) bzw. `d mmm yyyy` (EN) und Datumsprüfung auf Datumsspalten; `pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 }` und `printTitlesRow`; Prüfbereich einmal je Spalte und nur bis zur letzten Tabellenzeile; „Handbook section 6“ / „Handbuch Abschnitt 6“; kurzes Blatt „How to use“ / „Anleitung“ auch in Plan und Übersicht.

### 39. DOCX: Titel ohne Formatvorlage, Freigabeformular ohne Überschriften, keine Sprache
- **Ort:** alle DOCX; `blocks.mjs` Z. 111, 137 bis 138, 121.
- **Beschreibung:** Der Dokumenttitel ist ein fetter Absatz, keine Vorlage „Titel“ oder „Überschrift 1“; „Decision“ (h2) ist ohne Vorlage, das Freigabeformular hat daher gar keine Überschrift im Navigationsbereich. Überschriften ohne „Absätze nicht trennen“ (keepNext), können am Seitenende hängen. Keine Dokumentsprache gesetzt; Word prüft die Rechtschreibung in der Sprache der Installation. Schrift Arial statt der Schrift der PDFs.
- **Korrektur:** Titel mit `HeadingLevel.TITLE` oder `HEADING_1`, h2 mit `HEADING_3`; `keepNext: true` auf Überschriften; in `styles.default.document.run` `language: { value: lang === 'de' ? 'de-AT' : 'en-GB' }`.

### 40. D3 Register: Satz zu Tool-Namen ist interne Begründung
- **Ort:** Register Notiz und Anleitung Punkt 2; `register.mjs` Z. 10, 31, 38, 59.
- **Zitat:** „Tool names are allowed here because the review date stands next to them.“
- **Beschreibung:** Der Kunde fragt sich, wer hier etwas „erlaubt“. Der Satz stammt aus der Begründung, warum das Handbuch keine Anbieter nennt.
- **Korrektur:** EN „Enter the tool name with the date you checked it; provider terms change.“ DE „Tool-Namen mit dem Prüfdatum eintragen; Anbieterbedingungen ändern sich.“

### 41. D6 Schritt 5 setzt einen Betriebsrat voraus
- **Ort:** plan-en.xlsx Zeile 8, `plan.mjs` Z. 9, 21.
- **Zitat:** „Involve the works council and, where present, the data protection officer …“
- **Korrektur:** EN „Where present, involve the works council and the data protection officer before procuring new tools, not after.“ DE „Wo vorhanden, Betriebsrat und Datenschutzbeauftragte vor der Beschaffung neuer Tools einbinden, nicht danach.“

### 42. Unterschriften ohne Namen, Nachweisseite ohne Fassung
- **Ort:** D1 (`policy.mjs` Z. 39, 75), D7 (`evidence.mjs` Z. 24, 40, 76).
- **Beschreibung:** Unterschriftslinien ohne Feld für Name und Funktion in Druckschrift. D7 nennt die Fassung der Richtlinie nicht, gegen die sie zählt. D7 DE mischt „Prüfung fällig“ (Kopf) und „Wiedervorlage“ (Zeile Plan). Dokumentnummer im EN-Beispiel „AP-2026-MUSTER“.
- **Korrektur:** Unter jeder Linie EN „Name, function (block letters)“ / DE „Name, Funktion (Druckschrift)“; D7 Zeile Richtlinie EN „Version 23 October 2026 · takes effect …“ / DE „Fassung 23. Oktober 2026 · gilt ab …“; DE einheitlich „Wiedervorlage“; Beispiel-ID EN „AP-2026-EXAMPLE“.

### 43. Generator: doppelter Schlüssel `p4`
- **Ort:** `labelling.mjs` Z. 22 und 23 (EN).
- **Beschreibung:** `p4` steht zweimal; ohne Wirkung, aber ein Zeichen für Kopierreste.
- **Korrektur:** Z. 23 streichen.

### 44. Beispielbetrieb „Ltd“ in Österreich
- **Ort:** `questions.json` A1 default EN, A2 = AT.
- **Beschreibung:** Eine österreichische Elektrofirma als „Ltd“ wirkt im Muster unstimmig; DE „e.U.“ ist ein Einzelunternehmen, passt aber zur Inhaberin.
- **Korrektur:** EN „Example Electrical e.U.“ oder neutral „Example Electrical (sole trader)“.

---

## Hinweise außerhalb meines Bereichs (für die anderen Prüfungen)
- Kommissionsseite „AI literacy, questions and answers“: jetzt „Last update 20 October 2026“, Aufsicht und Durchsetzung „from 2 August 2026 onwards“. Handbuch Abschnitt 4 und offener Punkt 8.15 beziehen sich auf die Seite vom 27.07.2026 mit dem Widerspruch 2./3. August; bitte in der Handbuchprüfung neu lesen.
- Handbuch Abschnitt 5 schreibt Art. 50 Abs. 6 dieselbe Liste (Datenschutz, Wettbewerbsrecht …) zu wie D5 (Befund 12).
- Fragebogen und Dokumentregister sprechen mit „Sie“ („Ergänzen Sie“ in `questions.json` D1 und F1, „aus Ihren Antworten“ in `index.mjs` Z. 16); in den Dokumenten selbst kommt keine Anrede vor, kein „Sie“, kein Gedankenstrich als Einschub, kein Ausrufezeichen, keines der verbotenen Wörter.

## Was gut ist und bleiben soll
1. **Ein Datensatz, sieben Dokumente, zwei Sprachen:** Datum (Fassung 23.10.2026, Einweisung 6.11.2026, Geltung 20.11.2026, Wiedervorlage 20.11.2027), die drei Tools und die Funktionen sind in D1 bis D7 identisch, EN und DE sind inhaltlich deckungsgleich. Das ist die Grundlage dafür, dass ein Prüfer den Ordner als Einheit liest.
2. **Ehrlicher Ton ohne Überversprechen:** D7 zeigt Offenes rot und Geplantes gelb und sagt „does not certify compliance“; D4 sagt „does not record that it was sufficient“; das Register nennt „unclear“ einen Befund, kein Versäumnis; die Freigabe verlangt Fundstelle und Datum beim Anbieter. Diese Haltung unterscheidet das Produkt von Vorlagen, die „DSGVO-konform“ versprechen.
3. **Arbeitsnahe Struktur:** sieben Prüffragen mit Spalte „Fundstelle beim Anbieter, Datum“, D5 zeigt nur die Punkte, die der Betrieb nach seinen Antworten braucht, und gibt den amtlichen Wortlaut von Art. 50 Abs. 5 im Deutschen genau wieder; die DOCX haben Kopfzeile, „Seite X von Y“, wiederholte Tabellenköpfe und § -Überschriften als Formatvorlage, sind also gut weiterzubearbeiten.
