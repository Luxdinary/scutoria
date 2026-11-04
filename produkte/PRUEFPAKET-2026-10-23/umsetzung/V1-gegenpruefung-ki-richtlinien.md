# V1 · Gegenprüfung der Umsetzung: KI-Richtlinien-Toolkit (Commit 109431f)

Stand 23. Oktober 2026. Unabhängige Prüfung, nur gelesen; im Projekt wurde nichts geändert außer dieser Datei. Grundlage: Befunde A1 und A3 (alle A-Befunde), A5 Nr. 42 bis 49 (Produkt- und Startseite), Umsetzungslogs W1, W3, W5, der Diff von 109431f für die genannten Dateien, die neu erzeugten Dateien in `5-nach-korrektur/ki-richtlinien/` und die Musterdateien unter `site/public/samples/ai-policy/`.

## Zusammenfassung

**Ergebnis: 19 Probleme · A 3 · B 4 · C 12.**

Die Umsetzung ist im Kern gelungen. Von den 9 A-Befunden (A1: 3, A3: 6) sind 7 vollständig behoben und am Endprodukt sichtbar, 2 nur teilweise. Dazu kommt ein Rest aus A5 Nr. 42 (A). Neu hineingekommen sind ein ungenauer Fakt zu Art. 4 Abs. 3, ein Widerspruch zwischen Plan D6 und Handbuch bei der Reihenfolge und eine zweiseitige Nachweisseite.

**Die drei A-Probleme:**
1. Handbuch 2.2 „What it rules“ beschreibt das feste Verbot weiter als „keine abschließende Entscheidung über eine Person“, D1 § 2 schließt jetzt Sichten, Reihen, Bewerten und Vorbereiten aus. Genau der Widerspruch, der A3-1 zum A-Befund gemacht hat, steht jetzt im Handbuch.
2. Der Stripe-Kassentext (`shop/products.mjs`, verwendet in `payments.mjs:61`) sagt weiter „thirty-one questions“ / „einunddreißig Fragen“. A5 Nr. 42 ist damit nicht vollständig behoben; die Begründung „andere Datei“ trägt nicht.
3. D4 Teilnehmerliste: Die Folgeseiten 2 und 4 mit 11 von 14 Unterschriftszeilen nennen weder Gruppe noch Einweisungsdatum. Dieser Teil von A3-6 fehlt; die Begründung „nicht machbar ohne blocks.mjs“ trägt nicht, weil der wiederholte Tabellenkopf in `training.mjs` gesetzt wird.

**Empfehlung:** Die drei A-Punkte und B1 bis B4 vor dem Verkauf beheben (alles Textstellen oder wenige Zeilen Code), danach Handbuch, D4, D6 und D7 neu erzeugen, die Muster unter `site/public/samples` ersetzen und Seitenzahlen erneut zählen. Die C-Punkte im selben Durchgang mitnehmen, soweit sie nur Wortlaut sind.

### Was geprüft wurde und hält

**A-Befunde A1 (Handbuch):**
- A-1 Art. 4: behoben in Abschnitt 4, im WKO-Absatz und in 7.1, EN und DE gleich. Wortlaut von Art. 4 Abs. 1 (neu) und der alte Wortlaut stimmen mit EUR-Lex überein. Neuer Fehler beim Zusatz zu Abs. 3, siehe B1.
- A-2 WKO zehn Paragrafen: behoben in 1, 2.6 (jetzt Auslegung mit Quelle S. 27), 7.1, 8.8 und `quellen.md` Q9.
- A-3 DSGVO 72 Stunden: behoben in 2.8 (Fakt und Auslegung), Hilfetext A7 in `questions.json`, zusätzlich D1 § 8.

**A-Befunde A3 (Dokumente):**
- A3-1 D1 § 2: im Dokument behoben (PDF, DOCX, EN, DE), Hilfetext C2 angeglichen; Handbuch 2.2 nicht, siehe A1.
- A3-2 Deepfake-Begriff: D1 § 7 und D5 Punkt 5 wörtlich wie formuliert, mit Quellzeile Rn. 113.
- A3-3 Auswahlliste Register: Werte ohne Komma, Fehlermeldung an. In Excel (Kopie, schreibgeschützt über COM geöffnet) erscheinen die Listen vollständig, „yes with restriction“ ist ein Wert.
- A3-4 Namensspalte: Spalte A „Name“ / „Name“, gelb, Liste „yes/no“ korrekt nach Spalte C verschoben.
- A3-5 private Nutzung: Registerzeile 4 „Private use on own phones or accounts“ mit „no“, D7 „private use reported (question B3), not yet ended“, Status Offen.
- A3-6 Seitenzahlen und Kopfzeilen: in allen sechs PDF-Typen „Page X of Y“ und Kopfzeile auf Folgeseiten; D3 je Tool „Decision for: [Tool]“; D1 Schlussabschnitt mit Unterschrift auf einer Seite. Offen: D4 Gruppe und Datum (A3), D7 jetzt zweiseitig (B3).

**A5 (Seiten):** Fragenzahl 34, davon 29 Pflicht, nachgezählt in `questions.json` (Pflicht fehlt nur bei A11, B2, C2, D1, F1); richtig in `product.mjs`, `home.mjs`, `i18n.mjs`, `start.mjs`. Seitenzahlen Handbuch 24 EN / 26 DE stimmen mit den neu erzeugten PDFs überein, die Muster unter `site/public/samples/ai-policy/` sind byte-gleich mit `5-nach-korrektur`. „Siebzehn Punkte, davon acht offen“ ist vertretbar (7 erledigt, 8.7 und 8.8 mit Nein beantwortet), aus Abschnitt 8 aber nicht ohne Weiteres nachzuzählen (C2).

**Weitere Prüfungen:**
- B-Befunde A1 B-1 bis B-10 und A3 Nr. 7 bis 31 stichprobenartig am Endtext: wie formuliert umgesetzt; Listennummern 10 bis 15 im Handbuch-PDF jetzt richtig.
- EN und DE Handbuch: beide 485 Zeilen; zeilenweiser Abgleich der Marker (Fakt, Auslegung, Unsicher, Lücke, Quelle, Kasten, Tabelle) ohne Abweichung; Zahlen je Zeile gleich bis auf Schreibweisen („third edition“ / „3. Auflage“) und die gewollt verschiedenen Abrufdaten der Geschäftsgeheimnis-Richtlinie.
- Markdown-Tabelle Abschnitt 8: rendert im PDF sauber (EN S. 20), Kopf wiederholt.
- Hausregeln in allen geänderten Dateien und allen PDF-Texten: kein „compliant“, „certified“, „secure“, „safe“ als Versprechen („safety“ nur als Sachbegriff, „does not certify compliance“ verneint), kein Gedankenstrich als Einschub (einziger Strich: Zeitspanne „___:___ – ___:___“ in D4), kein Ausrufezeichen. In den Dokumenten D1 bis D7 keine Anrede. Handbuch DE Abschnitt 0 siezt, siehe C8.
- PDFs: alle 30 PDF-Seiten der Dokumente und beide Handbücher als PNG gerendert (90 Seiten, `C:\Users\Stefa\AppData\Local\Temp\scutoria-v1\png\`), Text in `...\scutoria-v1\txt\`. DOCX: alle korrigierten Sätze enthalten. XLSX: Listen, gelbe Spalten, Zellnotizen und Planwerte mit openpyxl ausgelesen.

### Live gegen die Primärquelle geprüft (alle Abruf 23.10.2026)

| Aussage | Quelle | Ergebnis |
|---|---|---|
| Art. 4 Abs. 1 neuer Wortlaut EN und DE, Abs. 2 und 3 | EUR-Lex, konsolidiert 02024R1689-20260727, EN 001.001 und DE 001.002 | Abs. 1 wörtlich richtig; Abs. 3 richtet sich an das KI-Gremium, nicht an Kommission und Mitgliedstaaten (B1) |
| Art. 4 „is replaced“; Inkrafttreten am dritten Tag | eur-lex.europa.eu/eli/reg/2026/1744/oj/eng, Art. 1 Nr. 5, Art. 4 | richtig |
| Verbot Art. 5 Abs. 1 Buchst. ba und bb ab 2.12.2026 | EUR-Lex konsolidiert EN und DE, Art. 5 Abs. 1, Art. 113 Buchst. a | Wortlaut und Datum richtig; Art. 113 Buchst. c Ziff. i (2.12.2027) richtig |
| Anbieter „puts into service under its own name or trademark“, Betreiber „under its authority“ | EUR-Lex konsolidiert EN, Art. 3 Nr. 3 und 4 | richtig |
| Art. 50 Abs. 5 und 6; Art. 111 Abs. 4 | EUR-Lex konsolidiert EN | richtig |
| DSGVO Art. 4 Nr. 12, Art. 22 Abs. 1, Art. 33 Abs. 1 und 5, EN und DE | EUR-Lex, 02016R0679-20160504 | alle Zitate wörtlich richtig |
| Kommission „no need for a certificate … internal record“, „from 2 August 2026 onwards“, Seitenstand | digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers | richtig, „Last update 20 October 2026“ |
| Leitlinien Rn. 11 (Chatbot in-house unter eigenem Namen), Rn. 113 („can plausibly exist“), Rn. 127 bis 129, Rn. 131 (Produkttexte ohne Aussagen zu Gesundheit, Verbrauchersicherheit, Nachhaltigkeit) | Leitlinien C(2026) 5054, PDF ec.europa.eu/newsroom/dae/redirection/document/131215 | richtig |

### Bewusst offen, nicht gezählt

Nach den Logs offen und deine Entscheidung: Rollenbezeichnungen in Satzmitte („decided by Owner or managing director“, A3-22/33), Rechtsform „Ltd“ im Beispiel (A3-44, A5 Nr. 49), Dokumentnummer „AP-2026-MUSTER“ im englischen Beispiel (A3-42), Layout-C-Punkte aus A1 C-8 und A3 Nr. 35 bis 39.

### Hinweise außerhalb des Prüfbereichs

- `src/memos/start.mjs:7, 21, 30` zitieren die Kommissionsseite zur KI-Kompetenz noch mit „page dated 27 July 2026“ / „Seitenstand 27. Juli 2026“; die Seite trägt „Last update 20 October 2026“ (Abruf 23.10.2026). Für die Memo-Prüfung.
- `src/shop/products.mjs:21, 22` nennt beim Sicherheitsnachweis „forty questions“ / „vierzig Fragen“, die Startseite inzwischen „forty-seven“. Für die Prüfung V2.

---

## Probleme

### 1. Handbuch 2.2 beschreibt das feste Verbot enger als D1 § 2 · A

- **Datei, Zeile:** `site/content/toolkits/ai-policy/handbook.en.md:71`, `handbook.de.md:71`; Folge: Handbuch-PDF EN S. 4, DE S. 4 und Muster unter `site/public/samples/ai-policy/`.
- **Zitat:** „One prohibition is fixed and is not asked: no final decision about a person is based on an AI result.“ / „Ein Verbot ist fest und wird nicht abgefragt: Keine abschließende Entscheidung über eine Person wird auf ein KI-Ergebnis gestützt.“
- **Problem:** D1 § 2 lautet jetzt: „They are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions on hiring, working conditions, promotion, task allocation, performance or termination.“ Das Handbuch erklärt also einen anderen, engeren Paragrafen als den, den der Kunde unterschreibt, und gibt genau die Lesart wieder, die A3-1 als rechtlich riskant eingestuft hat (Vorsortieren von Bewerbungen wäre danach erlaubt). W1 hat den Punkt als Berührungspunkt gemeldet, nachgezogen hat ihn niemand.
- **Korrektur EN (Satz ersetzen):** „One prohibition is fixed and is not asked: AI tools are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions on hiring, working conditions, promotion, task allocation, performance or termination.“
- **Korrektur DE:** „Ein Verbot ist fest und wird nicht abgefragt: KI-Tools werden nicht eingesetzt, um Bewerbungen oder Beschäftigte auszuwählen, zu sichten, zu reihen oder zu bewerten, und nicht, um Entscheidungen über Einstellung, Arbeitsbedingungen, Beförderung, Aufgabenzuteilung, Leistung oder Beendigung vorzubereiten oder zu treffen.“
- Danach Handbuch-PDFs neu erzeugen, Seitenzahl prüfen (Produktseite nennt 24 / 26).

### 2. Kassentext nennt weiter einunddreißig Fragen · A

- **Datei, Zeile:** `site/src/shop/products.mjs:11` (EN), `:12` (DE); ausgegeben als Positionsbeschreibung im Stripe-Checkout (`site/src/shop/payments.mjs:61`, `product_data.description`).
- **Zitat:** „Annual licence for one business: generator with thirty-one questions, …“ / „Jahreslizenz für einen Betrieb: Generator mit einunddreißig Fragen, …“
- **Problem:** Rest von A5 Nr. 42 (A). Der Fragebogen hat 34 Fragen, davon 29 Pflicht (nachgezählt). Produkt- und Startseite sind korrigiert, die Kasse, die der Kunde unmittelbar vor der Zahlung sieht, nicht. W5 nennt als Grund „andere Datei“; die Datei steht ausdrücklich im Ort des Befunds, der Grund trägt nicht.
- **Korrektur EN:** „Annual licence for one business: generator with thirty-four questions, 29 of them required, seven documents as PDF, DOCX and XLSX, handbook with sources, evidence folder, updates for twelve months.“
- **Korrektur DE:** „Jahreslizenz für einen Betrieb: Generator mit vierunddreißig Fragen, davon 29 Pflichtfragen, sieben Dokumente als PDF, DOCX und XLSX, Handbuch mit Quellen, Nachweisordner, Aktualisierungen für zwölf Monate.“
- Hinweis: Live-Gang dieses Texts ist Tor „Veröffentlichen“; falls der Text schon nach Lovable übernommen wurde, dort gleich ändern.

### 3. D4 Teilnehmerliste: Folgeseiten ohne Gruppe und Einweisungsdatum · A

- **Datei, Zeile:** `site/src/toolkit/documents/training.mjs:15` (EN `pCols`), `:34` (DE), `:84` (Tabelle); sichtbar in `example-electrical-ltd-training-en.pdf` und `muster-elektrotechnik-e-u-training-de.pdf`, je S. 2 und 4.
- **Zitat (S. 2):** Kopfzeile „Example Electrical Ltd · Briefing record · 23 October 2026“, darunter „No · Name · Function · Policy received and read · Signature“ mit den Zeilen 4 bis 14.
- **Problem:** A3-6 verlangte für D4 „über der Teilnehmertabelle eine Zeile ‚Group: … · Date: …‘, die bei Seitenwechsel wiederholt wird“. Nicht umgesetzt. Die Kopfzeile trägt das Fassungsdatum 23. Oktober 2026, nicht das Einweisungsdatum 6. November 2026, und keine Gruppe. Im Beispiel haben beide Gruppen dasselbe Datum; S. 2 (Büro) und S. 4 (Montage) sind nur über die Seitenzahl zu unterscheiden. Die Begründung in W3 („nicht machbar ohne blocks.mjs“) trägt nicht: Der Tabellenkopf wird auf jeder Seite wiederholt und kommt aus `training.mjs`.
- **Korrektur (Code, `training.mjs`):** `pCols` als Funktion von Gruppe und Datum, Aufruf in Z. 84 mit `t.pCols(g, fmtDate(A('H3').date, lang))`.
  - EN: `pCols: (g, d) => ['No', \`Name (${g}, ${d})\`, 'Function', 'Policy received and read', 'Signature']` ergibt „Name (Office, 6 November 2026)“.
  - DE: `pCols: (g, d) => ['Nr.', \`Name (${g}, ${d})\`, 'Funktion', 'Richtlinie erhalten und gelesen', 'Unterschrift']` ergibt „Name (Büro, 6. November 2026)“.
  - Prüfen: Kopf erscheint in PDF und DOCX auf jeder Seite.

### 4. Handbuch Abschnitt 4: Art. 4 Abs. 3 falsch wiedergegeben · B

- **Datei, Zeile:** `handbook.en.md:193`, `handbook.de.md:193` (letzter Satz des Fakt-Blocks); Handbuch-PDF EN S. 10, DE S. 11.
- **Zitat:** „… and the new paragraphs 2 and 3 oblige the Commission and the Member States to support providers and deployers, in particular SMEs.“ / „… und die neuen Absätze 2 und 3 verpflichten Kommission und Mitgliedstaaten, Anbieter und Betreiber, insbesondere KMU, zu unterstützen.“
- **Problem:** Neuer Fehler aus der Formulierung von A1 A-1, unter Fakt-Marker. Nur Abs. 2 verpflichtet Kommission und Mitgliedstaaten. Abs. 3: „The Board shall adopt recommendations, taking into account European competence frameworks, to support the Commission and Member States in the promotion of AI literacy …“ / „Das KI-Gremium nimmt unter Berücksichtigung der europäischen Kompetenzrahmen Empfehlungen an, um die Kommission und die Mitgliedstaaten … zu unterstützen.“ Quelle: Verordnung (EU) 2024/1689, Art. 4 Abs. 2 und 3, konsolidierte Fassung vom 27. Juli 2026, EUR-Lex EN und DE, Abruf 23.10.2026.
- **Korrektur EN (Satzende ersetzen):** „… the second sentence rules out a guaranteed level, the new paragraph 2 obliges the Commission and the Member States to support providers and deployers, in particular SMEs, and the new paragraph 3 asks the Board to adopt recommendations on AI literacy.“
- **Korrektur DE:** „… der zweite Satz schließt ein garantiertes Niveau aus, der neue Absatz 2 verpflichtet Kommission und Mitgliedstaaten, Anbieter und Betreiber, insbesondere KMU, zu unterstützen, und der neue Absatz 3 sieht Empfehlungen des KI-Gremiums zur KI-Kompetenz vor.“
- Gleiche Stelle in `produkte/ai-policy-toolkit/quellen.md` Abschnitt 6 prüfen.

### 5. Plan D6: Zieldaten widersprechen der Schrittfolge und dem Handbuch · B

- **Datei, Zeile:** `site/src/toolkit/documents/plan.mjs:9, 21` (Schritte), `:10, 22` (Grundlage), `:12, 24` (Beleg), `:55` (Verantwortliche), `:60` (Zieldaten); `handbook.en.md` und `handbook.de.md:20` (Reihenfolge), `:302` bis `:316` (fünfzehn Schritte); `site/src/pages/product.mjs:107, 145`; `site/src/pages/home.mjs:25, 52`.
- **Zitat (Beispiel-XLSX):** Schritt 9 „Hold the briefing“ 2026-11-06, Schritt 10 „Have each person confirm receipt“ 2026-11-06, Schritt 11 „Create the labelling checklist“ 2026-10-30, Schritt 12 „Enter the effective date, sign the policy“ 2026-11-05. Handbuch 0: „Post the one page. Hold the briefing. Create the labelling checklist … Sign the policy, enter the review date …“
- **Problem:** W3 hat A3-29 mit „Unterschrift am Tag vor der Einweisung“ umgesetzt, W1 hat C-10 (Schrittfolge) bewusst offen gelassen. Ergebnis: Im Plan liegen die Schritte 11 und 12 zeitlich vor 9 und 10, und das Handbuch (Abschnitt 0 und 6) sowie die Produktseite („Post the one page, hold the briefing, sign the policy“) sagen, unterschrieben wird nach der Einweisung. Der Kunde bekommt zwei verschiedene Reihenfolgen.
- **Korrektur (Empfehlung: C-10 umsetzen, Unterschrift zuerst), in Plan und Handbuch gleich:**
  - Neue Schritte 8 bis 12 EN: „8 Sign the policy with an effective date after the briefing.“ · „9 Post the one page and put it in the staff folder.“ · „10 Hold the briefing; have the attendance list signed.“ · „11 Have each person confirm receipt of the policy (date in the overview).“ · „12 Create the labelling checklist per system and per publication, or the dated note "no case at present".“ Schritte 1 bis 7 und 13 bis 15 unverändert.
  - DE: „8 Richtlinie unterschreiben, mit einem Geltungsbeginn nach der Einweisung.“ · „9 Die eine Seite aushängen und in die Ablage der Belegschaft legen.“ · „10 Einweisung durchführen; Teilnehmerliste unterschreiben lassen.“ · „11 Kenntnisnahme der Richtlinie je Person bestätigen lassen (Datum in der Übersicht).“ · „12 Kennzeichnungs-Checkliste je System und je Veröffentlichung anlegen, oder den datierten Vermerk „derzeit kein Fall“.“
  - `plan.mjs`: `basis` = `['6','3','2','2','6','3','3','6','2','4','6','5','6','6','4']`; `evidence` = `{ 2: Register, 4: Richtlinie, 7: Freigabeformulare, 8: unterschriebene Richtlinie, 9: die eine Seite, 10: Teilnehmerlisten, 11: Übersicht je Person, 12: Kennzeichnungs-Checkliste, 14: Blatt Wiedervorlage }`; `resp` = `{ …, 8: A4, 9: A4, 10: H1, 11: H1, 12: A6, … }`; Zieldaten 1 bis 7 Einweisung minus 7 Tage, 8 und 9 Einweisung minus 1 Tag, 10 und 11 Einweisung, 12 bis 14 Geltungsbeginn, 15 „on occurrence“ / „bei Eintritt“.
  - Handbuch 0 EN: „Answer the questions. Read D1 and D2. Fill the register at the providers' pages. Sign the policy with an effective date after the briefing. Post the one page. Hold the briefing. Create the labelling checklist or the note "no case at present". Enter the review date and file everything in one folder. Section 6 walks through the fifteen steps.“ DE: „Fragen beantworten. D1 und D2 lesen. Das Register an den Seiten der Anbieter füllen. Richtlinie unterschreiben, mit einem Geltungsbeginn nach der Einweisung. Die eine Seite aushängen. Die Einweisung durchführen. Die Kennzeichnungs-Checkliste anlegen oder den Vermerk „derzeit kein Fall“. Wiedervorlage eintragen, alles in einem Ordner ablegen. Abschnitt 6 geht die fünfzehn Schritte durch.“
  - Produktseite `product.mjs:107` EN „Sign the policy, post the one page, hold the briefing, freeze a version in your evidence folder. …“, `:145` DE „Die Richtlinie unterschreiben, die eine Seite aushängen, die Einweisung durchführen, eine Fassung im Nachweisordner einfrieren. …“; `home.mjs:25` „Sign, post, brief, send; …“, `:52` „Unterschreiben, aushängen, einweisen, senden; …“.

### 6. D7 Nachweisseite hat jetzt zwei Seiten, DE trennt den Unterschriftsblock · B

- **Datei, Zeile:** `site/src/toolkit/documents/evidence.mjs:26, 44` (drei Unterschriftsfelder), `:84` bis `:90` (`makeDoc`); `site/src/toolkit/documents/blocks.mjs:103` (Umbruchregeln); Aussagen „One page“ in `product.mjs:101, 139` und `handbook.*.md:330`. Betroffen auch `site/public/samples/ai-policy/*evidence*.pdf` (öffentlich).
- **Zitat:** EN S. 2 trägt nur „Signed for the business · Date · Name, function (block letters)“; DE S. 1 endet mit „Unterschrift für den Betrieb · Datum“, S. 2 trägt nur „Name, Funktion (Druckschrift)“.
- **Problem:** Neu durch die Korrekturen (Quellzeile A3-7, Namensfeld A3-42). Produktseite und Handbuch versprechen „One page“ / „Eine Seite“; die Unterschrift steht getrennt vom Inhalt, im Deutschen ist sogar der Unterschriftsblock zerrissen, weil nur `.pg__sign`, nicht `.pg__signs` vor Umbruch geschützt ist.
- **Korrektur (Code):** In `blocks.mjs:103` `.pg__signs` in die Liste mit `break-inside: avoid` aufnehmen. In `evidence.mjs` an `makeDoc` `printCss: '.pg--evidence .pg__signs { grid-template-columns: 2fr 1fr 2fr; }'` übergeben, damit die drei Felder in einer Zeile stehen. Abnahme: D7 EN und DE je genau eine Seite; reicht das nicht, für D7 `@page { margin: 14mm 16mm 16mm 16mm; }` ergänzen. Danach Muster neu erzeugen. Wortlaut EN/DE bleibt.

### 7. Werkzeug „Darf das hinein?“ nennt die alte, enge Regel aus § 2 · B

- **Datei, Zeile:** `site/src/pages/tools.mjs:52` (EN), `:134` (DE).
- **Zitat:** „No final decision about a person is based on an AI result. … (§ 2).“ / „Keine abschließende Entscheidung über eine Person wird auf ein KI-Ergebnis gestützt. … (§ 2).“
- **Problem:** Der Begründungstext verweist auf § 2 der Richtlinie und gibt ihn in der Fassung wieder, die A3-1 ersetzt hat. Die Ampel steht zwar auf Rot, die Begründung lehrt aber die riskante Lesart.
- **Korrektur EN:** „AI tools are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions about them (§ 2 of the policy). Recruitment, assessment, promotion, termination and task allocation are high-risk uses under Annex III of the AI Act.“
- **Korrektur DE:** „KI-Tools werden nicht eingesetzt, um Bewerbungen oder Beschäftigte auszuwählen, zu sichten, zu reihen oder zu bewerten, und nicht, um Entscheidungen über sie vorzubereiten oder zu treffen (§ 2 der Richtlinie). Einstellung, Beurteilung, Beförderung, Kündigung und Aufgabenzuteilung sind Hochrisiko-Verwendungen nach Anhang III der KI-Verordnung.“

### 8. Handbuch 8.2 nennt veraltete Randnummern der Checkliste · C

- **Datei, Zeile:** `handbook.en.md:382`, `handbook.de.md:382`.
- **Zitat:** „the checklist cites points 38 and 154“ / „die Checkliste zitiert Rn. 38 und 154“.
- **Problem:** D5 zitiert jetzt Rn. 38, 113, 119 bis 123, 131, 153 und 154 (`labelling.mjs`).
- **Korrektur EN:** „Resolved. Full text with paragraph numbers; the checklist cites points 38, 113, 119 to 123, 131, 153 and 154.“
- **Korrektur DE:** „Erledigt. Volltext mit Randnummern; die Checkliste zitiert Rn. 38, 113, 119 bis 123, 131, 153 und 154.“

### 9. „Davon acht offen“ ist aus Abschnitt 8 nicht nachzuzählen · C

- **Datei, Zeile:** `product.mjs:112, 150`, `home.mjs:27, 54`; Gegenstelle `handbook.en.md:377`, `handbook.de.md:377`.
- **Zitat:** „seventeen points as of 23 October 2026, of which eight remain open“.
- **Problem:** In der Tabelle stehen 7 Mal „Resolved“, dazu 8.7 „No“ und 8.8 „No law requires either“; die übrigen acht tragen „Open“, „Partly“, „Largely settled“, „Gap“ und anderes. Wer „Resolved“ zählt, kommt auf zehn offene (so auch W1: „7 von 17 erledigt“). Die Zahl ist vertretbar, steht aber nirgends im Handbuch.
- **Korrektur EN (Einleitung 8 ergänzen):** „Seven points are resolved and two are answered with no (8.7, 8.8); eight remain open: 8.4, 8.5, 8.6, 8.9, 8.10, 8.11, 8.12 and 8.17.“
- **Korrektur DE:** „Sieben Punkte sind erledigt, zwei sind mit Nein beantwortet (8.7, 8.8); acht bleiben offen: 8.4, 8.5, 8.6, 8.9, 8.10, 8.11, 8.12 und 8.17.“

### 10. Schritt 5: Handbuch und Plan verschieden formuliert · C

- **Datei, Zeile:** `handbook.en.md:306`, `handbook.de.md:306`; `plan.mjs:9, 21`.
- **Zitat:** Handbuch „Involve the works council and, where present, the data protection officer, before procuring new tools, not after.“ / „Belegschaftsvertretung und, falls vorhanden, Datenschutzbeauftragte einbinden, …“; Plan „Where present, involve the works council and the data protection officer …“ / „Wo vorhanden, Betriebsrat und Datenschutzbeauftragte …“.
- **Problem:** A3 Nr. 41 nur im Plan umgesetzt.
- **Korrektur EN (Handbuch):** „5. Where present, involve the works council and the data protection officer before procuring new tools, not after.“
- **Korrektur DE (Handbuch):** „5. Wo vorhanden, Betriebsrat und Datenschutzbeauftragte vor der Beschaffung neuer Tools einbinden, nicht danach.“

### 11. D5 Punkt 9 weicht vom Handbuch 5 ab · C

- **Datei, Zeile:** `site/src/toolkit/documents/labelling.mjs:57` (EN), `:113` (DE), Quelle `:56, :112`.
- **Zitat:** „Interpretation: labelling does not make a use lawful; data protection, competition law, personality rights and copyright apply separately.“
- **Problem:** Das Handbuch führt denselben Gedanken jetzt als Fakt aus den Leitlinien Rn. 127 bis 129 mit anderer Aufzählung (Datenschutz, Marken- und Urheberrecht, Persönlichkeitsrechte, irreführende Werbung). Am Original bestätigt (Abruf 23.10.2026). Zwei Fassungen derselben Aussage im selben Toolkit.
- **Korrektur EN:** „Paragraphs 1 to 4 leave Chapter III and other transparency obligations for deployers in Union or national law unaffected (Art. 50 (6)). The guidelines add that a label does not make a deep fake lawful: data protection law, trademark and copyright law, personality rights and the rules against misleading advertising continue to apply.“ Quelle: `[['aiAct', 'Art. 50 (6)'], ['guide', 'points 127 to 129']]`.
- **Korrektur DE:** „Die Absätze 1 bis 4 lassen Kapitel III und andere Transparenzpflichten für Betreiber im Unions- oder nationalen Recht unberührt (Art. 50 Abs. 6). Die Leitlinien ergänzen, dass eine Kennzeichnung einen Deepfake nicht rechtmäßig macht: Datenschutzrecht, Marken- und Urheberrecht, Persönlichkeitsrechte und die Regeln gegen irreführende Werbung gelten weiter.“ Quelle: `[['aiAct', 'Art. 50 Abs. 6'], ['guide', 'Rn. 127 bis 129']]`.

### 12. D5 Punkt 1: Artikelangabe nur im Englischen · C

- **Datei, Zeile:** `labelling.mjs:71`.
- **Zitat:** EN „because it uses the system under its authority (Art. 3 (4))“ / DE „weil er das System in eigener Verantwortung verwendet;“.
- **Korrektur DE:** „… weil er das System in eigener Verantwortung verwendet (Art. 3 Nr. 4); …“. EN bleibt.

### 13. D1 § 8: „Frist 72 Stunden“ ohne „unverzüglich“ · C

- **Datei, Zeile:** `site/src/toolkit/documents/policy.mjs:35` (EN), `:75` (DE).
- **Zitat:** „the deadline is 72 hours after becoming aware of it“ / „die Frist beträgt 72 Stunden ab Kenntnis“.
- **Problem:** Wie in A3 Nr. 18 formuliert und freigegeben, aber verkürzt: Art. 33 Abs. 1 DSGVO verlangt die Meldung „without undue delay and, where feasible, not later than 72 hours“ / „unverzüglich und möglichst binnen 72 Stunden“ (EUR-Lex, Abruf 23.10.2026). Die Fassung im Dokument kann als „72 Stunden Zeit“ gelesen werden. Das Handbuch 2.8 zitiert richtig.
- **Korrektur EN:** „… whether the incident must be notified to the data protection authority; notification is due without undue delay and, where feasible, within 72 hours after becoming aware of it, unless it is unlikely to result in a risk to the persons concerned (Art. 33 GDPR).“
- **Korrektur DE:** „… ob der Vorfall der Datenschutzbehörde zu melden ist; gemeldet wird unverzüglich und möglichst binnen 72 Stunden ab Kenntnis, außer der Vorfall führt voraussichtlich zu keinem Risiko für die Betroffenen (Art. 33 DSGVO).“

### 14. Zeilenumbrüche mitten in Daten und Fundstellen · C

- **Datei, Zeile:** `policy.mjs:88` bis `:105` (`fmtDate`, `sourceLine`), `evidence.mjs:21, 39`; sichtbar u. a. D1 EN S. 2 „(Art. / 33 GDPR)“, „retrieved 23 / October 2026“, D7 DE „gilt ab 20. / November 2026“.
- **Korrektur (Code):** In `sourceLine` und in den D7-Details Datumsangaben mit geschützten Leerzeichen ausgeben (`fmtDate(...).replace(/ /g, '\u00a0')`, wie schon im Aushang), „Art.\u00a033“ in `s8b`. Wortlaut EN/DE unverändert.

### 15. Handbuch DE Abschnitt 0 siezt · C

- **Datei, Zeile:** `handbook.de.md:8, 10`.
- **Zitat:** „So benutzen Sie das Toolkit“, „Sie müssen es nicht lesen, bevor Sie anfangen.“
- **Problem:** Nach der genannten Hausregel ist die Stimme in den Dokumenten „du“. Der Punkt ist A1 C-15 und als Entscheidung bei dir offen (Prüfer empfahl dort „Sie“). Sonst kommt im Handbuch und in D1 bis D7 keine Anrede vor.
- **Korrektur DE (falls „du“ gilt):** „## 0. So benutzt du das Toolkit“ und „Du musst es nicht lesen, bevor du anfängst.“ EN unverändert.

### 16. Handbuch 4: Spalten der Übersicht je Person unvollständig · C

- **Datei, Zeile:** `handbook.en.md:211`, `handbook.de.md:211`.
- **Zitat:** „… (question A11): function, first and last briefing, contents, date of acknowledgement of the policy, next briefing, remarks.“
- **Problem:** Die Datei hat jetzt zusätzlich „Name“ (A3-4) und „Uses AI tools for work“.
- **Korrektur EN:** „… (question A11): name, function, use of AI tools for work, first and last briefing, contents, date of acknowledgement of the policy, next briefing, remarks. Names are entered by the business, never by the generator.“
- **Korrektur DE:** „… (Frage A11): Name, Funktion, dienstliche Nutzung von KI-Tools, erste und letzte Einweisung, Inhalte, Datum der Kenntnisnahme der Richtlinie, nächste Einweisung, Bemerkungen. Namen trägt der Betrieb ein, nie der Generator.“

### 17. „Point (bb) adds …“ ohne Bezug · C

- **Datei, Zeile:** `labelling.mjs:54` (EN), `:110` (DE); `handbook.en.md:77`, `handbook.de.md:77`.
- **Zitat:** „…; point (bb) adds child sexual abuse material.“ / „…; Buchstabe bb erfasst Material über sexuellen Kindesmissbrauch.“
- **Problem:** Der Satz nennt Buchstabe ba nie; in D5 steht er als Ankreuzpunkt ohne Erklärung, was „point (bb)“ ist. Inhalt am Original bestätigt (Art. 5 Abs. 1 Buchst. ba und bb, Art. 113 Buchst. a, EUR-Lex konsolidiert EN und DE, Abruf 23.10.2026).
- **Korrektur EN (Satzende):** „… explicit consent (Art. 5(1)(ba)); the same applies to AI systems that generate child sexual abuse material (point (bb)).“
- **Korrektur DE:** „… ausdrückliche Zustimmung (Art. 5 Abs. 1 Buchst. ba); dasselbe gilt für KI-Systeme, die Material über sexuellen Kindesmissbrauch erzeugen (Buchst. bb).“

### 18. D5 Punkt 3: „Until then“ ist mehrdeutig · C

- **Datei, Zeile:** `labelling.mjs:24` (EN), `:80` (DE).
- **Zitat:** „… the notice under paragraph 1 applies since 2 August 2026. Until then enter "no statement" …“ / „… gilt seit dem 2. August 2026. Bis dahin „keine Angabe“ eintragen …“
- **Problem:** „Until then“ folgt auf den 2. August 2026 und liest sich wie dieser; gemeint ist der 2. Dezember 2026 und nur die Spalte zu Abs. 2.
- **Korrektur EN:** „Until 2 December 2026 enter "no statement" in the column for paragraph 2 where the provider says nothing, and set a review date after 2 December 2026.“
- **Korrektur DE:** „Bis zum 2. Dezember 2026 in der Spalte zu Abs. 2 „keine Angabe“ eintragen, wenn der Anbieter nichts sagt, und eine Wiedervorlage nach dem 2. Dezember 2026 setzen.“

### 19. XLSX: Auswahllisten doppelt mit überlappenden Bereichen · C

- **Datei, Zeile:** `site/src/toolkit/documents/xlsx.mjs:69` bis `:72`, `register.mjs:134` bis `:139`; sichtbar in `register-*.xlsx` (F4:F16 und F10:F16, G…, H…; Blatt 2 B5:B11 und B10:B11) und `training-overview-*.xlsx` (C4:C19 und C10:C19).
- **Problem:** Bekannt aus A3 Nr. 38. Geprüft: Excel öffnet die englische Registerkopie (schreibgeschützt, Meldungen unterdrückt) mit vollständigen Listen; ob Excel beim normalen Öffnen eine Reparaturmeldung zeigt, ist nicht geprüft (Stand prüfen). Die Listen reichen eine Zeile über die Tabelle.
- **Korrektur (Code):** Je Spalte genau eine Datenüberprüfung über den Bereich erste bis letzte Tabellenzeile schreiben (in ExcelJS über `ws.dataValidations.add('F4:F15', {...})` statt je Zelle) und in `register.mjs` die Fehlermeldung beim ersten Setzen mitgeben, nicht in einer zweiten Schleife. Kein Wortlaut betroffen.
