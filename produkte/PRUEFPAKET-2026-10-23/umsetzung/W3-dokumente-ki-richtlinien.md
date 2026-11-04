# W3 · Umsetzung der Befunde: Dokumente des KI-Richtlinien-Toolkits

Stand 23.10.2026. Grundlage: Freigabe E25 („alle A- und B-Korrekturen wie in den Befunddateien formuliert; C-Punkte, soweit sie nur den Wortlaut betreffen“). Befunddateien: `befunde/A3-dokumente-ki-richtlinien.md` (Hauptdatei), die Punkte aus `A1-handbuch-ki-richtlinien.md`, die in `questions.json` oder in meinen Generatoren liegen, und die Punkte aus `A5-memos-tools-seiten.md`, die meine Dateien betreffen (nur A5 Nr. 49, siehe Befund 44).

Geänderte Dateien (nur diese, nichts committet):
`site/src/toolkit/documents/policy.mjs`, `poster.mjs`, `register.mjs`, `training.mjs`, `labelling.mjs`, `plan.mjs`, `evidence.mjs`, `site/content/toolkits/ai-policy/questions.json`.
Sicherung der Ausgangsstände: Scratch-Ordner der Sitzung, `w3-orig/`.

## Zählung

| Status | A3 (44) | A1-Punkte (5) | Summe |
|---|---|---|---|
| umgesetzt | 32 | 5 | 37 |
| teilweise | 7 | 0 | 7 |
| nicht umgesetzt | 2 | 0 | 2 |
| andere Datei | 3 | 0 | 3 |

## Befunde A3

| Befund | Status | Datei | Notiz |
|---|---|---|---|
| A3-1 Personalentscheidungen | umgesetzt | policy.mjs, questions.json | § 2 EN/DE wörtlich nach Befund; Hilfetext C2 im Fragebogen an die neue Regel angeglichen (Folgeänderung, sonst stünde dort weiter „abschließende Entscheidungen“). |
| A3-2 Deepfake-Begriff | umgesetzt | policy.mjs, labelling.mjs | D1 § 7 und D5 Punkt 5 wörtlich; in D5 steht „Begründung in einem Satz“ wegen Befund 17 als Feldzeile statt „[Satz]“. |
| A3-3 Auswahlliste Freigabe | umgesetzt | register.mjs | Werte ohne Komma („yes with restriction“, „ja mit Einschränkung“), auch in Notiz und Entscheidungen; Fehlermeldung mit Titel und Text EN/DE. Ausgeblendetes Blatt „Lists“ und `showErrorMessage` hat parallel der Bearbeiter von xlsx.mjs eingebaut; beides passt zusammen. |
| A3-4 Namensspalte | umgesetzt | training.mjs | Erste Spalte „Name“, Breite 26, gelb; Notizsatz nach Befund ersetzt den alten Satz „Names are entered by the business“. Auswahlliste und gelbe Spalten mitverschoben. |
| A3-5 Private Nutzung | umgesetzt | register.mjs, evidence.mjs | B3 = ja oder unbekannt: eigene Registerzeile mit Freigabe „no“/„nein“ und Vermerk; D7 „Open“ mit dem Text aus dem Befund. Hinweis: Bei B3 = „Wissen wir nicht“ steht ebenfalls „private use reported“; siehe offene Punkte. |
| A3-6 Seitenzahlen, Kopfzeilen | andere Datei | blocks.mjs, pdf.mjs | Laut Auftrag andere Datei; der Bearbeiter von blocks.mjs hat Kopfzeile und Seitenzahl als CSS-Seitenränder eingebaut, die Live-Ausgabe bei Lovable druckt sie ohnehin. In meinen Dateien zusätzlich: Überschrift „Decision for: [Tool]“ / „Entscheidung für: [Tool]“. Nicht machbar ohne blocks.mjs: Zeile „Gruppe · Datum“ im wiederholten Tabellenkopf (D4), Blöcke zusammenhalten (D1, D3). |
| A3-7 Belegregel | umgesetzt | policy.mjs, labelling.mjs, training.mjs, evidence.mjs | Quellzeilen nach dem Muster des Befunds in D1 (Zweck, § 7, § 8), D4 (über Befund 8), D5 (alle Punkte und Grundlage), D7. Abrufdatum zentral als `RETRIEVED` in policy.mjs, Wert 2026-10-23 (Auftrag: neues Datum für alles Geänderte; der Befund nannte 19.10.). Auslegungen als „Interpretation:“ / „Auslegung:“ im Text, nicht mit `B.mk`, weil blocks.mjs im DOCX den Marker englisch druckt („[INTERPRETATION]“ auch im deutschen Dokument). Das Handbuch ist Markdown und kann die Konstante nicht lesen; seine Abrufdaten pflegt die Handbuchumsetzung. |
| A3-8 „genügt“ (Kommission) | umgesetzt | training.mjs | Satz EN/DE wörtlich, Datum aus der Konstante. |
| A3-9 Amtsblatt-Satz | umgesetzt | labelling.mjs | Wörtlich, Abrufdatum 23.10.2026 statt 19.10.2026 (am 23.10. gegen EUR-Lex geprüft, Befund A3). |
| A3-10 Übergangsfrist | umgesetzt | labelling.mjs | Quellzeile und Hinweis EN wörtlich; DE von mir sinngleich übertragen; Rn. 153 als Quelle ergänzt. |
| A3-11 „on or after“ | umgesetzt | labelling.mjs | Wörtlich; Quelle Art. 113 und Rn. 154 (dazu Art. 5 wegen A1 B-6). |
| A3-12 Art. 50 Abs. 6 | umgesetzt | labelling.mjs | Wörtlich. |
| A3-13 Rn. 38 | umgesetzt | labelling.mjs | Wörtlich (wirkt nur bei G1 = ja). |
| A3-14 Produkttexte | umgesetzt | labelling.mjs | Wörtlich; Quelle Rn. 131 ergänzt. |
| A3-15 Künstlerische Werke | umgesetzt | labelling.mjs | Wörtlich; „Reasoning“ als Feldzeile nach Befund 17. |
| A3-16 Betreiberbegriff | umgesetzt | labelling.mjs | EN „under its authority (Art. 3 (4))“, Prüfpunkt 3 EN/DE wörtlich; Quelle um Art. 25 und Anhang III ergänzt. |
| A3-17 Unterschrift, Kopierhinweis, Feldzeilen | umgesetzt | labelling.mjs | Unterschrift am Ende, Kopierhinweis unter Punkt 5 und 6, alle „[…]“-Platzhalter in D5 als Feldzeilen mit Schreiblinie. |
| A3-18 Art. 33 DSGVO | umgesetzt | policy.mjs | Satz EN/DE wörtlich in § 8, als Auslegung markiert, mit Quellzeile. |
| A3-19 Angebotsentwürfe | umgesetzt | questions.json | Optionstext C1 EN/DE wörtlich. |
| A3-20 § 3 gegen § 4 | umgesetzt | policy.mjs, register.mjs | E1 = approved: § 3 beginnt mit dem Vorbehalt. Sonst Satz unter dem Maßstab im Freigabeformular und in der XLSX-Spalte „Bemerkung“; nur wenn der Maßstab den Personenbezug betrifft (I4 = no-dpa-no-personal), weil er bei den anderen Maßstäben nicht passt. |
| A3-21 „approved“ | umgesetzt | policy.mjs, poster.mjs | Wörtlich in D1 § 1 und im Aushang. |
| A3-22 Verantwortliche Personen | nicht umgesetzt | (engine.mjs) | Braucht engine.mjs Z. 45 (Rollenlabel wird Antworttext, nicht meine Datei) und deine Entscheidung: Namen in den Dokumenten ja oder nein, und welche deutsche Form für die Rolle Inhaber/Inhaberin gilt, wenn ein Kunde sie wählt. |
| A3-23 Aushang: Kontakt, Tools | teilweise | poster.mjs, questions.json | Zeile „Approved tools (as of ______)“ / „Freigegebene Tools (Stand ______)“ ergänzt; Beispielkontakt A7/A8 mit „ext. 12“ / „Durchwahl 12“. Telefon als Pflichtfeld braucht engine.mjs (andere Datei). |
| A3-24 Antworten, Einschränkung | umgesetzt | register.mjs | Spaltenkopf wörtlich; Feldzeile „Restriction“ / „Einschränkung“ unter der zweiten Entscheidung; „(which)“ entfällt dadurch. |
| A3-25 Blatt Freigabeprüfung | umgesetzt | register.mjs | Zeile „Tool“ gelb; Antwortliste nur auf den sieben Fragezeilen; Entscheidungszeile mit eigener Liste; Hinweis „Copy this sheet once per tool“ / „Dieses Blatt je Tool kopieren“ in der Notiz. |
| A3-26 Gelbe Spalten, Zweck | umgesetzt | register.mjs | `gapColumns: [3, 4, 5, 7, 8, 9, 10]`. Zweck nur eindeutig vorbefüllt (Übersetzungsdienst, analog Bildgenerator und Transkription, wenn der Zweck in C1 gewählt ist); sonst alle Zwecke, gelb, Hinweis als Zellnotiz im XLSX und im Freigabeformular nach dem Wert. |
| A3-27 Geteiltes Konto | umgesetzt | register.mjs | Wörtlich. |
| A3-28 Unterschrift einweisende Person | umgesetzt | training.mjs | Wörtlich. |
| A3-29 Plan: Zieldaten | umgesetzt | plan.mjs | Erste Variante des Befunds: 1 bis 8 und 11 Einweisung minus 7 Tage, 12 Tag vor der Einweisung, 13 und 14 Geltungsbeginn, 15 „on occurrence“ / „bei Eintritt“. Schritt 5 ohne Datum, wenn er „entfällt“. |
| A3-30 D7 Status und Titel | umgesetzt | evidence.mjs | Meldeweg und Ansprechperson vor Geltungsbeginn „Planned“ mit Zusatz nach Befund; Titel EN/DE wörtlich. |
| A3-31 Behörde je Land | umgesetzt | labelling.mjs | AT und DE nach den Beispielen, EN von mir übertragen; anderes EU-Land wie bisher „Stand prüfen“. Stand 23.10.2026 (A1 hat KI-MIG § 2 Abs. 1 und die fehlende Benennung in AT am 23.10. bestätigt). Grundsatz in D5 lautet jetzt „nennt keine Strafe“ statt „keine Behörde und keine Strafe“, weil Punkt 9 für DE eine Behörde nennt. |
| A3-32 Aushang zu klein | teilweise | poster.mjs | Geschützte Leerzeichen im Datum, doppelte Zusätze (Zutrittscodes, Normen) entfernt. Schriftgrößen sind CSS (andere Datei); Verbotszeichen statt Kästchen ist Gestaltung, kein Wortlaut. |
| A3-33 Grammatik Funktionen | teilweise | questions.json, policy.mjs, evidence.mjs | A11 DE „Freie Mitarbeitende“ und kleingeschrieben im Satz; Gruppe EN „Field staff“; D7 „conducted by the owner“ / „Einweisung durch die Inhaberin“. Rest hängt an Befund 22. |
| A3-34 Bezüge | umgesetzt | policy.mjs, poster.mjs | „Die Richtlinie gilt“, „Die Kennzeichnung betrifft“, „Ablage …:“, „Etwas passiert? Sofort melden.“; EN gleichgezogen. |
| A3-35 Umbrüche, Kopfzeilen | teilweise | register.mjs, training.mjs, labelling.mjs | Kurze Kopfzeilen (Betrieb · Kurztitel); Titel D5 DE wörtlich, EN gleichgezogen; Formularnotiz „One form per tool“ statt „One page per tool“ (neutral, weil die Seitenzahl vom Renderer abhängt). Druckrahmen, Zusammenhalten, kompakteres Formular: CSS, andere Datei. |
| A3-36 Kleines Grau | andere Datei | site.css, blocks.mjs | Nur Schriftgröße und Kontrast. |
| A3-37 D4 Formular | teilweise | training.mjs | „Form“ als vier Kästchen. Zeilenhöhe und eigene Seite mit wiederholtem Kopf: CSS/blocks.mjs. |
| A3-38 XLSX | teilweise | plan.mjs | „Handbook section 6“ / „Handbuch Abschnitt 6“, Spalte breiter. Datumswerte, Druckeinrichtung, einfacher Prüfbereich: xlsx.mjs (andere Datei). Anleitungsblatt für Plan und Übersicht ist neuer Inhalt, nicht umgesetzt. |
| A3-39 DOCX-Formatvorlagen | andere Datei | blocks.mjs | Titel, Überschriften, keepNext, Sprache. |
| A3-40 Satz zu Tool-Namen | umgesetzt | register.mjs | Notiz und Anleitung Punkt 2 wörtlich. |
| A3-41 Plan Schritt 5 | umgesetzt | plan.mjs | Wörtlich. |
| A3-42 Unterschriften, Fassung | teilweise | policy.mjs, evidence.mjs | Zeile „Name, function (block letters)“ / „Name, Funktion (Druckschrift)“ in D1 und D7; D7 „Version … · takes effect …“; DE „Wiedervorlage“. Beispiel-ID „AP-2026-EXAMPLE“ nicht: Die ID kommt aus `data/samples.mjs` (Lauf-ID „muster1“), und `documentId` kürzt auf 6 Zeichen. |
| A3-43 Doppelter Schlüssel p4 | umgesetzt | labelling.mjs | Fiel beim Neuschreiben der Datei weg; ohne Wirkung auf den Text. |
| A3-44 „Ltd“ in Österreich | nicht umgesetzt | questions.json | Widerspricht A5 Nr. 49 („GmbH“ statt „e.U.“); hängt zusammen mit Handbuch, Produktseiten und dem Test `http.test.mjs` („Example Electrical Ltd“). Entscheidung nötig. |

## Punkte aus A1 (Handbuchprüfung) in meinen Dateien

| Befund | Status | Datei | Notiz |
|---|---|---|---|
| A1 A-3 Hilfetext A7 | umgesetzt | questions.json | Satz zur 72-Stunden-Meldung EN/DE wörtlich angehängt. |
| A1 B-6 Neues Verbot ab 2.12.2026 (Teil D5) | umgesetzt | labelling.mjs | In D5 Punkt 8 „Stichtage“ mit dem Wortlaut aus B-6, Quelle Art. 5 Abs. 1 Buchst. ba und bb, Art. 113. Handbuchteil macht die Handbuchumsetzung. |
| A1 C-2 Hilfetext G2 | umgesetzt | questions.json | Wörtlich. |
| A1 C-11 Verweis A1/A3 | umgesetzt | questions.json | `ref` auf „handbook 0“. |
| A1 C-14 Hilfetexte B3, G1 | umgesetzt | questions.json | Wörtlich. |

A1 B-10 („auch D6 prüfen“): D6 ist eine XLSX ohne nummerierte Liste, nicht betroffen.

## Zusätzlich, ohne Befund

- `evidence.mjs`: „2 Falle“ zu „2 Fälle“ korrigiert (Grammatikfehler, bei der Prüfung aufgefallen).

## Prüfung

Erzeugt mit `SAMPLE_DATE=2026-10-23 node data/samples.mjs ai-policy C:/Users/Stefa/AppData/Local/Temp/scutoria-w3-out` (DOCX und XLSX, je EN und DE, 16 Dateien). Vergleich mit einem Lauf vor den Änderungen (`scutoria-w3-base`).

- DOCX (python-docx): D1, D2, D3-Formular, D4, D5 in beiden Sprachen Zeile für Zeile gegen den Ausgangsstand verglichen; jede geänderte Stelle steht wie oben beschrieben, die nicht geänderten Stellen sind unverändert.
- XLSX (openpyxl): Register mit Listen ohne Komma, Fehlermeldung an, Zeile „Private use“ / „Private Nutzung“, gelbe Spalten C, D, E, G bis J, Zellnotiz bei mehrdeutigem Zweck; Freigabeprüfung mit Zeile „Tool“, Antwortliste B5 bis B11, Entscheidungsliste B12, Hinweis in D13; Übersicht mit Spalte „Name“ (gelb), Liste jetzt in Spalte C; Plan mit Zieldaten 30.10., 6.11., 5.11., 20.11., „on occurrence“ und „Handbook section …“.
- D7 ist nur PDF; geprüft über das Dokumentmodell in beiden Sprachen, dazu Varianten: E1 = approved (Vorbehalt in § 3, kein Maßstabssatz), Richtlinie schon in Kraft (Meldeweg „Regulated“), B3 = nein („no private account in use“), B3 = unbekannt, A2 = DE und EU (Punkt 9), G1 = ja (Punkt 4), kein Fall (Auslegungssatz mit Rn. 131).
- Hausregeln: keine Ausrufezeichen, keine verbotenen Wörter, kein Gedankenstrich als Einschub in meinen Dateien; `questions.json` ist gültiges JSON.
- Bekannt, nicht von mir: ExcelJS schreibt die Prüfbereiche doppelt und überlappend (z. B. F4:F16 und F10:F16); ob Excel dabei eine Reparaturmeldung zeigt, ist weiter nicht geprüft (Befund 38, xlsx.mjs).

## Tests

`node --disable-warning=ExperimentalWarning --test "test/*.test.mjs"` (der im Auftrag genannte Aufruf mit `test/` läuft unter Node 24 nicht, deshalb das Muster aus `package.json`): 39 Tests, 36 bestanden, 3 fehlgeschlagen. Alle Tests zum KI-Richtlinien-Toolkit bestehen (Generatorlauf EN und DE, alle Formate, Überschriften in D5, Nachweisseite, Handbuch).

Fehlgeschlagen, alle außerhalb meiner Dateien und durch parallele Änderungen anderer Bearbeiter:
1. `memos.test.mjs:21` „answers are read only from the known questions and values“: NIS2-Memo liefert `sector` jetzt als Liste statt als Wert.
2. `security.test.mjs:19` „the questionnaire has forty questions …“: Fragebogen Sicherheitsnachweis hat jetzt 47 statt 40 Fragen.
3. `security.test.mjs:53` „the preview page of toolkit 2 …“: Abbruch bei „first step“, vermutlich dieselbe Ursache.

Die Tests wurden nicht verändert.

## Für dich offen

1. **Befund 22 und Rest von 33 (Verantwortliche):** Sollen Namen in die Dokumente, oder nur Funktionen? Und welche deutsche Form steht für die Rolle Inhaber? Empfehlung: nur Funktion, mit Artikel, geschlechtsneutral („die Geschäftsführung“ / „the management“), dazu eine kleine Änderung in engine.mjs, damit die Dokumentform getrennt vom Auswahltext gespeichert wird.
2. **Befund 44 und A5 Nr. 49 (Rechtsform des Beispielbetriebs):** „e.U.“ und „GmbH“ werden vorgeschlagen. Empfehlung: EN „Example Electrical e.U.“, passend zum deutschen „Muster Elektrotechnik e.U.“; Handbuch, Produktseiten und der Test müssen im selben Zug mit.
3. **B3 = „Wissen wir nicht“:** D7 schreibt dann „private use reported (question B3)“. Empfehlung: eigener Wortlaut „private use not ruled out (question B3)“ / „private Nutzung nicht ausgeschlossen (Frage B3)“; braucht dein Wort, weil der Befund nur einen Text vorgibt.
4. **Abstimmung mit der Handbuchumsetzung:** Falls A1 C-10 (Schritt 12 vor Schritt 8) im Handbuch umgesetzt wird, muss die Reihenfolge in plan.mjs mitziehen. Die Dokumente nennen jetzt den 23.10.2026 als Abrufdatum; im Handbuch stehen bei unveränderten Stellen weiter 2026-10-19.
5. **A4 Nr. 34 (`de-AT` fest in `fmtDate`, policy.mjs):** nicht in meinem Auftrag; die Funktion nutzen auch Memos, Shop und Sicherheitsdokumente. Wer das umsetzt, braucht policy.mjs.
6. **Fragebogenversion:** `questions.json` steht weiter auf „2026-10-19“. Ein Anheben zeigt Kunden mit eingefrorenen Läufen „aktualisiert“ an; das gehört zur Veröffentlichung und damit zu deinem Tor.
