# W4 · Umsetzung der Befunde an den Dokumenten des Sicherheitsnachweis-Toolkits

Stand 23.10.2026. Freigabe: E25 (alle A- und B-Korrekturen wie formuliert, C nur wo Wortlaut). Bearbeitet nur die eigenen Dateien: `site/src/toolkit/documents/security/*`, `blocks.mjs`, `xlsx.mjs`, `site/content/toolkits/security-evidence/questions.json` (`documents/index.mjs` brauchte keine Änderung). Nicht committet.

## Kurzfassung

- **Zählung:** 57 Zeilen (A3-35/36/38/39 in einer Zeile). umgesetzt 37 · teilweise 13 · nicht umgesetzt 7 (fünf davon C-Layout, dazu A2 C-12 und A5-49) · andere Datei 0 (Teile in fremden Dateien stehen bei „teilweise“).
- **Notfallkarte:** eine Seite als PDF und als DOCX (in Word 16 gezählt, EN und DE), Nummern groß oben, NIS-2-Zeile je Land richtig, drei neue Fragen statt drei Dauerlücken.
- **D1 und D5 versendbar:** Brief mit Briefkopf, Empfänger, Ort und Datum, Unterschriftsraum, ohne Scutoria-Kopf; DORA-Absatz nur bei Finanzkunden; solange Absender, Empfänger oder Name fehlen, steht „DRAFT/ENTWURF“ darauf.
- **„(c)“ statt „©“:** in den lokalen PDFs behoben (geprüft bei vierfachem Zoom). Seitenzahlen und Kopfzeile ab Seite 2 kommen jetzt per CSS, auch in den KI-PDFs.
- **Für dich zu entscheiden:** siehe Abschnitt „Offen für Stefan“ am Ende (Fragenzahl 47 auf der Produktseite, Muster ohne Adresse, Bundesland-Tabelle, „Ltd“).

## Änderungsprotokoll

| Befund | Status | Datei | Notiz |
|---|---|---|---|
| A4-1 | umgesetzt | blocks.mjs | Ligaturen im Druck-CSS aus (`liga`, `dlig`, `calt`); „(c)“ in D5 und D6 gezoomt geprüft. `site.css`: Lovable. |
| A4-2 | umgesetzt | measures.mjs, evidence-list.mjs | (a) vier Nachweistexte wie formuliert; (b) Status „in place, file the evidence“ / „vorhanden, Nachweis ablegen“ ohne Nummer, in der XLSX gelbe Anlagenspalte; (c) Prüfung `DEPENDS` (C5 an C4, F2 an D4 und B1, H3 an B1). |
| A4-3 | umgesetzt | emergency-card.mjs | NIS-2-Zeile je Land (AT, DE, EU) wie formuliert; Quellen mit Abruf 23.10.2026 in der Fußnote. |
| A4-4 | teilweise | questions.json, blocks.mjs, emergency-card.mjs | (a) Fragen F5 Bank, F6 Mail/Cloud, F7 Codes und Kontenliste; (b) DOCX-Profil 1 cm, 9,5 pt, 2 pt, Felder ohne Leerabsatz, Schritte ohne Aufzählungspunkt: Word zählt 1 Seite. (c) Seitenprüfung als Test fehlt: `test/` ist nicht meine Datei. |
| A4-5 | teilweise | cover-letter.mjs | Vertragsvariante EN/DE wie formuliert. Kundenblatt aus D6 („später“) offen. |
| A4-6 | umgesetzt | questions.json, cover-letter.mjs, self-declaration.mjs | Fragen A10 Absender, A11 Empfänger, A12 Finanzunternehmen (ja/nein/unbekannt). Briefkopf, Empfängerblock, Ort und Datum, Betreff, drei Leerzeilen, Name und Funktion; DORA-Absatz nur bei ja oder unbekannt, ohne Klammern; keine Scutoria-Kopfzeile; ENTWURF-Kennzeichnung bei fehlenden Pflichtangaben; D1 „Erstellt für“ nur mit Empfänger. |
| A4-7 | teilweise | emergency-card.mjs | DE: ZAC und Landesdatenschutzbehörde gelb mit Fundort, BSI Service-Center 0800 274 1000 mit Zeiten; EU: drei Felder gelb mit ENISA- und EDPB-Liste. Frage „Bundesland“ mit 16 + 16 Einträgen nicht gebaut: im Befund sind nur 3 der 16 ZAC-Nummern belegt. |
| A4-8 | teilweise | questions.json, emergency-card.mjs | Beispielnummern wie formuliert (A4-Kontakt, neue Frage A9 Notfallnummer IT); Feld gelb, wenn keine Ziffer darin steht (auch Vertretung). Pflichtfeld nicht erzwingbar und „Managing director“ statt Rollenwort nur über `engine.mjs` (fremde Datei). |
| A4-9 | umgesetzt | emergency-card.mjs, blocks.mjs | Neue Blöcke `calls`, `steps`, `boxes`: Wen anrufen oben, zweispaltig, Nummern 14,5 pt fett, Bezeichnung 10 pt; Schritte 11 pt, erster Satz fett; Fristen als drei Kästen; Rot nur in der Kopfzeile „In an emergency / Im Notfall“. |
| A4-10 | umgesetzt | emergency-card.mjs | DSGVO-Zeile wie formuliert. |
| A4-11 | umgesetzt | emergency-card.mjs | Schritt 2 und Hinweis zur Abwägung wie formuliert. |
| A4-12 | umgesetzt | self-declaration.mjs | `fieldValue` nimmt bei „teilweise“ und „nicht anwendbar“ den Optionstext. Alle N/A-Optionen tragen schon einen Grund. |
| A4-13 | umgesetzt | self-declaration.mjs, evidence-list.mjs, clause-checklist.mjs, cover-letter.mjs | Kennung vor jedem D1-Feld; „Att./Anl. n“; Klauseln K1 bis K11 und DORA 1 bis 15; Abgleichzeile „B, I“ mit „Evidence list (D4): …“. |
| A4-14 | umgesetzt | cover-letter.mjs | Antworten mit Kurzlabel je Teil („Password rule: partly, by …; admin rights: …“). |
| A4-15 | umgesetzt | cover-letter.mjs | Satz wie formuliert; Quelle mit Abruf 23.10.2026 in der Fußnote von D5. |
| A4-16 | umgesetzt | clause-checklist.mjs | Anwendungsbereich wie formuliert. |
| A4-17 | umgesetzt | clause-checklist.mjs | K6-Rat wie formuliert. |
| A4-18 | umgesetzt | clause-checklist.mjs | Rat als Absatz über den zwei Teiltabellen (keine 15-fache Wiederholung), Satz zur Übertragung wie formuliert. |
| A4-19 | umgesetzt | evidence-summary.mjs, self-declaration.mjs | Pillen In place/Partly/Not yet, gemischter Bereich mit Zähler; „to be signed by“; Bereichstitel aus einer Quelle (`sectionTitle`) in D1, D2, D4, D7. Zeile Maßnahmenplan jetzt „In place“, Notfallkarte „Not yet“. |
| A4-20 | umgesetzt | blocks.mjs | CSS-Randboxen statt `pdf.mjs`: ab Seite 2 Betrieb · Titel · Datum, auf jeder Seite „Page x of y“. |
| A4-21 | teilweise | self-declaration.mjs, cover-letter.mjs, action-plan.mjs, questions.json | Anlagensatz in D1 und D5 mit Zahl aus der Nachweisliste (im Beispiel „1 to 3“, nicht 10, wegen A4-2); Anlässe nach A2 C-7 in D2 und I4. Handbuch: W2 hat angeglichen. |
| A4-22 | umgesetzt | questions.json, action-plan.mjs | A5 nur Name, A9 Notfallnummer; Plan zeigt „… with Example IT Services Ltd“. |
| A4-23 | umgesetzt | clause-checklist.mjs, action-plan.mjs | K1-Rat wie formuliert; D2-Fuß: NIST SP 800-63B-4, Abschnitt 3.1.1.2, abgerufen 19.10.2026 (Archivkopie). |
| A4-24 | nicht umgesetzt | | C, Layout (Worttrennung, Spaltenbreiten). |
| A4-25 | nicht umgesetzt | | C, Layout. D1 hat jetzt trotzdem EN und DE drei Seiten (vorher 3 und 4). |
| A4-26 | umgesetzt | alle Dokumente | Fuß mit ausgeschriebenem Datum. |
| A4-27 | nicht umgesetzt | | C, Layout (gestrichelte Linie bleibt sichtbar). |
| A4-28 | teilweise | evidence-list.mjs | „Wo“ nur noch bei Anlagen gefüllt; Spalte im PDF bleibt (Layout). |
| A4-29 | nicht umgesetzt | | C, Layout. |
| A4-30 | umgesetzt | cover-letter.mjs | Großschreibung, Sätze wie formuliert; „von {who}“ mit Namen, sobald einer erfasst ist. |
| A4-31 | umgesetzt | clause-checklist.mjs | |
| A4-32 | umgesetzt | measures.mjs | EN und DE. |
| A4-33 | umgesetzt | self-declaration.mjs, questions.json | „Sicherung und Wiederanlauf“. |
| A4-34 | umgesetzt | self-declaration.mjs, emergency-card.mjs, action-plan.mjs, index.mjs | Eigenes `fmtDate`: de-AT für AT, sonst de-DE („Januar“); „Schublade“ außerhalb AT. `policy.mjs` unberührt. |
| A4-35 | teilweise | action-plan.mjs | Nur Wortlaut: Spaltenkopf „Wave/Welle“. Datumswerte, Filter, Statusformel, Querformat nicht (kein Wortlaut). |
| A4-36 | teilweise | self-declaration.mjs, cover-letter.mjs | Kopfzeile D1 mit Betrieb, D5 ohne. DOCX-Formatvorlage „Titel“ nicht (kein Wortlaut). |
| A4-37 | umgesetzt | emergency-card.mjs | Inklusive gelbem Feld „Liste der Kundenkontakte: [Ort]“. |
| A4-38 | umgesetzt | emergency-card.mjs | Expertenzeiten, Memo-Verweis weg, Stand als Konstante `CARD_CHECKED` (23.10.2026) mit Quellenliste je Land. |
| A4-39 | teilweise | cover-letter.mjs | Kürzel D1/D2/D4 weg, „none“ zu „not in Art. 21(2)“. Nummerierung „Attachment 1 bis 3“ nicht übernommen: kollidiert mit A4-13 (Anlage 2 wäre im Brief der Plan, in D4 die Zuständigkeiten). |
| A4-40 | teilweise | mehrere | I4 groß, „staff/Beschäftigte“, Zeile Name und Funktion, Anlässe klein nach Semikolon, Kartentext in D4, typografische Anführungszeichen EN. Wellen per `addMonths` nicht: Rechenänderung, Test prüft +60 Tage. |
| A2 A-3 | umgesetzt | emergency-card.mjs | wie A4-3. |
| A2 A-4 | umgesetzt | clause-checklist.mjs | Bei A7 = Waren oder Leistungen ohne IT steht in Teil B der Hinweis aus A-4 (Art. 30 nur für IKT, Streichung erbitten); Teil B bleibt sichtbar. |
| A2 B-6 | umgesetzt | emergency-card.mjs | wie A4-38. |
| A2 B-10 | umgesetzt | questions.json | F3-Hilfetext. |
| A2 B-11 | umgesetzt | questions.json | F2-Hilfetext. |
| A2 B-13 | umgesetzt | questions.json | G2-Hilfetext. |
| A2 B-14 | umgesetzt | questions.json | G3-Hilfetext. |
| A2 B-20 | umgesetzt | questions.json, self-declaration.mjs | D3-Hilfetext; Folgeänderung D1-Bezeichnung „Tolerable downtime / Tolerierbare Ausfallzeit“ (trug denselben Fehler). |
| A2 B-24 | umgesetzt | blocks.mjs | wie A4-1. |
| A2 B-25 | umgesetzt | questions.json | Hilfetexte B2, C2, C6, E2, F1. |
| A2 C-7 | teilweise | questions.json, action-plan.mjs | Anlässe gleich mit Handbuch. `ref`-Werte nicht: `routes.mjs` macht aus „handbook 2.3 D4“ drei Links (2, 3, 4). |
| A2 C-12 | nicht umgesetzt | questions.json | Satz zu verbundenen Unternehmen passt nicht zu A3 (Größe für den Brief); im Handbuch erledigt (W2). |
| A3-3 | umgesetzt | xlsx.mjs | Listen mit Komma über verstecktes Blatt „Lists“, Fehlermeldung bei Falscheingabe; in Excel gelesen. Registerwerte: W3. |
| A3-6 | teilweise | blocks.mjs | Seitenzahl und Kopfzeile wie A4-20; Freigabeformular, D4-Kopf, D1-Schluss der KI-Dokumente: andere Dateien. |
| A3-35/36/38/39 | nicht umgesetzt | | C, Layout und Technik. |
| A5-46 | teilweise | questions.json | Lead ohne „forty minutes“: „Forty-seven questions; the example business is prefilled …“. Produktseite (fremd) sagt noch „Forty questions“. |
| A5-49 | nicht umgesetzt | questions.json | „Example Electrical Ltd“ bleibt: andere Rechtsform ändert alle Musterdateinamen, die Produktseite und Tests verlinken. |

## Prüfung

- **Sicherheitsnachweis:** `samples.mjs security-evidence … pdf` läuft durch (14 PDF, 12 DOCX, 4 XLSX). Seiten EN/DE: D1 3/3, D2 3/3, D3 1/1, D4 4/4, D5 3/3, D6 4/4, D7 1/1. Als PNG angesehen: Karte EN und DE, D5 EN S. 1 bis 2 und DE S. 1, D6 EN S. 1 und 3, D1 EN S. 1 und 3, D4 EN S. 1, D2 EN S. 3, D7 EN; „(c)“ bei vierfachem Zoom.
- **Notfallkarte in Word 16:** EN und DE je 1 Seite (`ComputeStatistics`), als PDF exportiert und angesehen.
- **Varianten:** Deutschland mit Namen, Absender, Empfänger, Finanzkunde, IT-Lieferant; anderes EU-Land, Ein-Personen-Betrieb, ohne Dienstleister. Texte geprüft, Karte jeweils 1 Seite, Brief vollständig ohne ENTWURF.
- **KI-Richtlinien:** `samples.mjs ai-policy … pdf` läuft durch (12 PDF). Seitenzahlen und Kopfzeile erscheinen. D7 Nachweisseite hat jetzt 2 Seiten; Ursache ist der neue Inhalt aus W3 (Quellzeile, Namenszeile), nicht `blocks.mjs`.
- **XLSX:** openpyxl und Excel: Liste im versteckten Blatt wird gelesen, Fehlermeldung an; KI-Register unverändert lesbar.
- **Hausregeln:** keine verbotenen Wörter, keine Gedankenstriche, keine Ausrufezeichen in den geänderten Dateien.

## Tests

`node --test test/*.test.mjs`: 39 Tests, 36 bestanden, 3 fehlgeschlagen. Tests nicht geändert.
1. `memos.test.mjs` „answers are read only from the known questions and values“: Sektor jetzt Liste; Memos, nicht meine Datei.
2. `security.test.mjs` „the questionnaire has forty questions …“: 47 statt 40 Fragen (neue Fragen aus A4-4, A4-6, A4-8, A4-22).
3. `security.test.mjs` „the preview page of toolkit 2 …“: „Question 1 of 40“.

Mit einer Kopie außerhalb des Projekts (47 Fragen, erste Statusfrage jetzt Schritt 16 statt 12, „Att. 1“ statt „A1“, „Thank you“ groß) bestehen alle fünf Sicherheitstests.

## Offen für Stefan

1. **Fragenzahl:** 47 Fragen (40 Pflicht, 7 freiwillig für Brief und Karte). Produktseite und Tests sagen 40. Empfehlung: Produktseite „forty required questions“ oder „47 Fragen“, Tests auf 47 anpassen.
2. **Muster ohne Adressen:** Ohne belegte Anschrift bleibt das D5-Muster ein ENTWURF mit gelben Feldern. Empfehlung: so lassen, es zeigt den Mechanismus ehrlich.
3. **Bundesland-Tabelle für Deutschland:** 16 ZAC-Nummern und 16 Landesbehörden erst nach Recherche mit Abrufdatum.
4. **„Ltd“ beim österreichischen Beispiel:** ändert Dateinamen, Links und Tests; gemeinsam mit den Seiten entscheiden.
5. **Version** in `questions.json` steht auf 2026-10-23; nach dem Deploy sehen Käufer im Konto „aktualisiert“. Musterdateien unter `site/public/samples` sind nicht neu erzeugt (Veröffentlichen-Tor).
