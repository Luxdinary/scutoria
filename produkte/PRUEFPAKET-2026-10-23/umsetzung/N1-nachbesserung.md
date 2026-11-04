# N1 · Nachbesserung nach den Gegenprüfungen V1 und V2

Stand 23. Oktober 2026. Grundlage: `V1-gegenpruefung-ki-richtlinien.md` (19 Probleme) und `V2-gegenpruefung-sicherheit-memos-tools.md` (22 Probleme), Freigabe E25. Geändert wurden nur Dateien unter `site\` (content, src, public, test) und die `quellen.md` unter `produkte\`. Nichts committet, nichts deployt.

**Ergebnis:** Alle A- und B-Probleme sind behoben, wie die Berichte sie formulieren, außer V2-8 (laut Auftrag nicht angefasst). Von den C-Problemen sind alle mit Wortlaut oder kleiner Darstellungsfolge umgesetzt; offen bleiben V1-15 (deine Entscheidung) und V1-19 (nur Code, kein Wortlaut). `npm test`: 39 von 39 bestanden. Die Nachweisseite D7 hat wieder genau eine Seite (EN und DE), die Notfallkarte bleibt einseitig (AT, DE, EU, je EN und DE).

**Empfehlung:** Vor dem Livegang V2-2 und V2-5 durch das Tor „Recht“ geben und den Kassentext (V1-2, V2-9) durch das Tor „Veröffentlichen“; steht er schon in Lovable, dort gleich ändern.

## Änderungen je Problem

| Problem | Status | Datei | Anmerkung |
|---|---|---|---|
| V1-1 (A) | behoben | `content/toolkits/ai-policy/handbook.en.md`, `handbook.de.md` (2.2) | Festes Verbot im Wortlaut von D1 § 2, EN und DE wie formuliert. |
| V1-2 (A) | behoben | `src/shop/products.mjs` | „thirty-four questions, 29 of them required“ / „vierunddreißig Fragen, davon 29 Pflichtfragen“, Stil der Produktseite. Gleich V2-1. Livegang: Tor „Veröffentlichen“, Lovable nachziehen. |
| V1-3 (A) | behoben | `src/toolkit/documents/training.mjs` | `pCols(g, d)`; Kopf „Name (Büro, 6. November 2026)“ / „Name (Office, 6 November 2026)“ steht auf jeder Seite der Teilnehmerliste (PDF S. 1 bis 4 geprüft), im DOCX als wiederholte Kopfzeile (`tblHeader`). Ohne Datum steht „…“. |
| V1-4 (B) | behoben | Handbuch KI, Abschnitt 4; `produkte/ai-policy-toolkit/quellen.md` Abschnitt 6 | Abs. 2 Kommission und Mitgliedstaaten, Abs. 3 KI-Gremium. Neuer Eintrag im Quellenprotokoll mit Abruf 23.10.2026. |
| V1-5 (B) | behoben | `src/toolkit/documents/plan.mjs`; Handbuch KI 0 und 6; `src/pages/product.mjs`; `src/pages/home.mjs` | Empfehlung umgesetzt: Unterschrift zuerst. Schritte 8 bis 12, `basis`, `evidence`, `resp` und Zieldaten wie formuliert. Beispiel: 8 und 9 am 5.11., 10 und 11 am 6.11., 12 bis 14 am 20.11.2026, 15 „bei Eintritt“. |
| V1-6 (B) | behoben | `src/toolkit/documents/blocks.mjs`, `evidence.mjs` | `.pg__signs` vor Umbruch geschützt, drei Unterschriftsfelder in einer Zeile (2fr 1fr 2fr). D7 EN und DE je 1 Seite; die engeren Ränder waren nicht nötig. Wortlaut unverändert. |
| V1-7 (B) | behoben | `src/pages/tools.mjs` | Begründung „Darf das hinein?“ im Wortlaut von § 2, EN und DE. |
| V1-8 (C) | behoben | Handbuch KI 8.2 | Rn. 38, 113, 119 bis 123, 131, 153 und 154. |
| V1-9 (C) | behoben | Handbuch KI, Einleitung 8 | Sieben erledigt, zwei mit Nein, acht offen mit Nummern. |
| V1-10 (C) | behoben | Handbuch KI 6, Schritt 5 | Gleich wie im Plan. |
| V1-11 (C) | behoben | `src/toolkit/documents/labelling.mjs` (Punkt 9) | Wortlaut und Quelle Leitlinien Rn. 127 bis 129 ergänzt. |
| V1-12 (C) | behoben | `labelling.mjs` (Punkt 1, DE) | „(Art. 3 Nr. 4)“. |
| V1-13 (C) | behoben | `src/toolkit/documents/policy.mjs` (§ 8) | „unverzüglich und möglichst binnen 72 Stunden“ / „without undue delay and, where feasible, within 72 hours“. |
| V1-14 (C) | behoben | `policy.mjs` (`sourceLine`, `s8b`), `evidence.mjs` | Geschützte Leerzeichen im Abrufdatum, in den D7-Details und bei „Art. 33“; zusätzlich im Datum „27. Juli 2026“ der Quellzeile. |
| V1-15 (C) | offen | Handbuch KI DE Abschnitt 0 | Deine Entscheidung „Sie“ oder „du“, nicht geändert. |
| V1-16 (C) | behoben | Handbuch KI 4 | Spalten der Übersicht je Person vollständig. |
| V1-17 (C) | behoben | Handbuch KI 2.2, `labelling.mjs` (Punkt 8) | Buchst. ba und bb benannt. |
| V1-18 (C) | behoben | `labelling.mjs` (Punkt 3) | „Bis zum 2. Dezember 2026 in der Spalte zu Abs. 2 …“. |
| V1-19 (C) | offen | `src/toolkit/documents/xlsx.mjs`, `register.mjs` | Nur Code (doppelte Datenüberprüfungen), kein Wortlaut; nicht umgesetzt. Ob Excel beim normalen Öffnen eine Reparaturmeldung zeigt, ist weiter ungeprüft. |
| V2-1 (A) | behoben | `src/shop/products.mjs` | Siehe V1-2. |
| V2-2 (A) | behoben | `src/pages/product-security.mjs` (FAQ „Was speichern Sie über mich?“) | Wortlaut wie formuliert. Tor „Recht“: vor Livegang freigeben. Datenschutzerklärung gegengelesen: Abschnitt Kundenkonto nennt „Ihre Antworten im Generator“ ohne gegenteilige Aussage; ein Hinweis, dass Antworten Namen und Telefonnummern Dritter enthalten können, fehlt dort. Rechtstext nicht geändert, Stand prüfen. |
| V2-3 (B) | behoben | `content/toolkits/security-evidence/questions.json` (F2), Handbuch Sicherheit 4.2 | Schwelle „außer ein Risiko ist unwahrscheinlich“. |
| V2-4 (B) | behoben | `src/toolkit/documents/security/cover-letter.mjs` | Frage nach Überbrückung, Wiederherstellungstest und Notfallplan, Antwortteile D3, D2, D4. |
| V2-5 (B) | behoben | `cover-letter.mjs` | Bei A7 „Waren“ oder „Leistungen“ der neue Absatz statt der Einstufungsfrage, gleiche Regel wie D6. Alle 24 Kombinationen A7 × A12 × Sprache durchgespielt. Tor „Recht“. |
| V2-6 (B) | behoben | `src/toolkit/documents/security/emergency-card.mjs`; `produkte/security-evidence-toolkit/quellen.md` S49 | csirtsnetwork.eu am 23.10.2026 geöffnet: Abschnitt „CSIRTs Network Members“ mit Liste je Mitgliedstaat (z. B. CERT.at, CERT-Bund); ENISA-Adresse liefert 404. Quellenhinweis der Karte angepasst. DE behält „Ihres Landes“ wie die übrige Karte. |
| V2-7 (B) | behoben | Handbuch Sicherheit 5.1 und 6.3; `src/memos/nis2.mjs`; `quellen.md` S48 (Sicherheit) und W11 (Memos) | Beide Fristen, Quellen mit Abruf 23.10.2026. EN mit „in principle“ für den Gleichlauf mit DE „grundsätzlich“. |
| V2-8 (B) | nicht angefasst | `public/site.css` | Laut Auftrag: Ligaturregel ist schon ergänzt. Dieselbe Regel in Lovable nachziehen. |
| V2-9 (B) | behoben | `src/shop/products.mjs` | „forty-seven questions, 40 of them required“ / „siebenundvierzig Fragen, davon 40 Pflichtfragen“. |
| V2-10 (B) | behoben | `src/memos/labelling.mjs` | „cautious course“ / „vorsichtige Weg“. |
| V2-11 (B) | behoben | `public/tools/personal.js`, `src/pages/tools.mjs`, `test/tools.test.mjs` | Trenner „heißt“, „für … ist“, Zeilenumbruch nach „lautet“, Stichwort „Zugang“; Grenzen-Text EN und DE. Die vier Sätze als Prüfungen im bestehenden Test (Testzahl bleibt 39), Wert zur Laufzeit zusammengesetzt. |
| V2-12 (C) | behoben | `emergency-card.mjs` | „binnen eines Monats nach der Meldung“ für AT, DE und EU; dazu „§ 34“ mit geschütztem Leerzeichen. |
| V2-13 (C) | behoben | Handbuch Sicherheit 4.1 | Schritt 2 wie auf der Karte. |
| V2-14 (C) | behoben | Handbuch Sicherheit D2 | Dauer gegen D3, nicht „Antwort auf D3“. |
| V2-15 (C) | behoben | `personal.js`, `tools.mjs` | „Behinderung“ und „Schwerbehind…“ rot, „behindert“ gelb, „Schwarztee“ kein Treffer (geprüft). Grenzen-Text nennt „Behinderung, Schwerbehind…“ und „behindert“ bei den nur möglichen Wörtern. |
| V2-16 (C) | behoben | `tools.mjs` | „Anschrift ohne Hausnummer“. |
| V2-17 (C) | behoben | `src/pages/product-security.mjs`, `src/pages/paper.mjs` | „Sicherung und Wiederanlauf“. |
| V2-18 (C) | behoben | `src/pages/toolkit-preview.mjs` | 47 Fragen, „je Statusfrage“. |
| V2-19 (C) | behoben | `product-security.mjs` (D3) | Kontakte AT geprüft, DE teils einzutragen. |
| V2-20 (C) | behoben | `src/toolkit/documents/security/self-declaration.mjs` | I3 vor I4. |
| V2-21 (C) | behoben | `src/memos/shared.mjs`, `pages.mjs`, alle vier Memos | Neues Feld `sourcesUpdated`: „Quellen geprüft: 19. Oktober 2026; berichtigte Stellen 23. Oktober 2026“, im Memo und auf der Formularseite. |
| V2-22 (C) | behoben | Handbuch Sicherheit 6 | Spaltenkopf und Einleitung mit 23. Oktober 2026. |

**Folgekorrektur ohne eigene Problemnummer:** Durch die längeren Texte aus V1-11, V1-17 und V1-18 rutschte im deutschen D5 die Unterschrift allein auf eine fünfte Seite. `labelling.mjs` bekommt dafür etwas engere Druckränder (16/18/17/18 mm) und einen kleineren Abstand vor der Unterschrift; D5 hat wieder 4 Seiten in EN und DE, Unterschrift auf S. 4.

## Erzeugt und angesehen

- Muster neu erzeugt nach `C:\Users\Stefa\AppData\Local\Temp\scutoria-fix-out\` (beide Toolkits mit PDF, dazu die Memos und die Notfallkarte für DE und EU), Text und PNG je Seite mit pypdfium2.
- Seitenzahlen: Handbuch KI 24 EN / 26 DE, Handbuch Sicherheit 37 EN / 40 DE (wie auf Produkt- und Startseite). D7 1 / 1 (vorher 2 / 2). Notfallkarte 1 Seite in AT, DE, EU, je EN und DE. Alle übrigen Dokumente und Memos haben dieselbe Seitenzahl wie in `5-nach-korrektur`.
- Angesehen: D7 EN und DE, D4 alle Seiten (Kopf mit Gruppe und Datum), D1 S. 3, D5 DE S. 2 und 4 als Bild und S. 1 und 3 im Text, Plan D6 (Werte ausgelesen), D5-Abgleich S. 2, D1 Sicherheit S. 3, Karte AT EN/DE und EU DE, die geänderten Handbuchseiten (KI EN S. 1, 4, 10, 11, 16, 19; DE S. 4, 5, 11, 17, 21; Sicherheit EN S. 15, 26, 28, 30, 31; DE S. 17, 29, 31, 33, 34), Memo-Kopf NIS2.
- `site/public/samples`: die 18 dort liegenden PDFs durch die neu erzeugten ersetzt. `produkte/PRUEFPAKET-2026-10-23/5-nach-korrektur` liegt außerhalb meines Bereichs und ist damit nicht mehr aktuell.
- Hausregeln in allen hinzugefügten Zeilen geprüft: kein „compliant“, „certified“, „secure“, „safe“, „sicher“ als Versprechen, kein Gedankenstrich als Einschub, kein Ausrufezeichen.

## Deine Entscheidungen (nicht angefasst)

1. Anrede „Sie“ oder „du“ in den Handbüchern (V1-15, Handbuch KI DE Abschnitt 0 siezt). Hinweis: Notfallkarte und Antwortschreiben des Sicherheitsnachweises siezen durchgehend; der neue Kartentext (V2-6) folgt dem.
2. Namen statt Rollen in den Dokumenten und die deutsche Form der Inhaberrolle (etwa „Inhaber oder Geschäftsführung“, „prüft Büroleitung“, „to be signed by Owner or managing director“ auf D7, Verantwortliche im Plan D6).
3. Rechtsform des Beispielbetriebs („e.U.“, „GmbH“, „Ltd“), dazu die Dokumentnummer „AP-2026-MUSTER“ im englischen Beispiel.
4. Eigener Text auf der Nachweisseite, wenn B3 „wissen wir nicht“ lautet.
5. Ob Memo-Kontakte in die Brevo-Liste gehen.
6. Aus V2: erfundene Anschriften und ein erfundener Name für den Beispielbetrieb, damit das öffentliche D5-Muster den fertigen Brief ohne Entwurfsvermerk zeigt (W4, offen Nr. 2).

## Weitere offene Hinweise

- Tore: V2-2 und V2-5 „Recht“; Kassentext V1-2/V2-9 „Veröffentlichen“; V2-8 und der Kassentext auch in Lovable.
- Start-Memo (`src/memos/start.mjs`, Quellen): zitiert die Kommissionsseite zur KI-Kompetenz mit „Seitenstand 27. Juli 2026, Abruf 2026-10-18“; die Seite trägt laut V1 heute „Last update 20 October 2026“. Kein Problem der Listen V1/V2, nicht geändert; beim nächsten Memo-Lauf neu abrufen.
- Datenschutzerklärung, Abschnitt Kundenkonto: siehe V2-2, Stand prüfen.

## Test

`npm test` in `site`: 39 Tests, 39 bestanden, 0 fehlgeschlagen (nach allen Änderungen erneut gelaufen). Kein bestehender Test musste wegen Wortlaut angepasst werden; in `tools.test.mjs` kamen Prüfungen für V2-11 und V2-15 in den bestehenden Test zu Zugangsdaten hinzu.
