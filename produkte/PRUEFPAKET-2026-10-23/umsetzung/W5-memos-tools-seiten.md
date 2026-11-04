# W5 · Memos, Tools, Produkt- und Startseite: Umsetzung der Befunde A5

Stand 23.10.2026. Grundlage: `befunde/A5-memos-tools-seiten.md`, Freigabe E25 (alle A- und B-Korrekturen wie formuliert, C-Punkte nur, wo sie reinen Wortlaut betreffen). Bearbeitet wurden nur die W5 zugeteilten Dateien. Nichts committet.

## Ergebnis in Zahlen

50 Befunde: **43 umgesetzt**, **4 teilweise** (Nr. 5, 30, 40, 49), **3 nicht umgesetzt** (Nr. 43, 44 zurückgestellt bis Neusatz; Nr. 48 C-Punkt mit Code). Teile in fremden Dateien sind in der Tabelle als „andere Datei“ vermerkt (Nr. 42, 43, 49).

Befunde aus A1 bis A4, die in W5-Dateien liegen: keine gefunden. Die `quellen.md`-Punkte aus A1 und A2 betreffen `produkte/ai-policy-toolkit/quellen.md` und `produkte/security-evidence-toolkit/quellen.md` (andere Datei), der Memo-Verweis auf der Notfallkarte (A4 Nr. 38) den Dokumentgenerator, die Manrope-Ligaturen (A4 Nr. 1, L) CSS und PDF-Satz.

## Tabelle

| Nr. | Status | Datei | Notiz |
|---|---|---|---|
| 1 | umgesetzt | src/memos/nis2.mjs | Option geteilt: „wesentlich oder kritisch“ (wesentlich) und „wichtig“ (wichtig, außer eine andere Regel macht wesentlich). |
| 2 | umgesetzt | nis2.mjs | Öffentliche Verwaltung nach Zentralregierung, regionaler, lokaler Ebene/Bildung; Titel wie formuliert, DE-Regionaltitel um die Fundstelle ergänzt (EN hat sie). |
| 3 | umgesetzt | nis2.mjs | Größenoption „mittel“ im Wortlaut des Befunds. |
| 4 | umgesetzt | nis2.mjs | Frage als Mehrfachauswahl „mehr als nur geringer Umfang“, „Software“ gestrichen, Hinweis zu Cloud und IT-Betreuung ergänzt. Folge: ein Projekttest scheitert (siehe unten). |
| 5 | teilweise | nis2.mjs | DNS-Option eng gefasst, Registrar-Option ergänzt. Einstufung der Registrare formuliert der Befund nicht: Memo sagt „größenunabhängig erfasst (Art. 2 Abs. 4), Einstufung und Pflichten klärt dieses Memo nicht“, Ergebnis Gelb. |
| 6 | umgesetzt | nis2.mjs | Qualifiziert (wesentlich) und nicht qualifiziert (wichtig) getrennt; ein großer nicht qualifizierter Anbieter wird über die Anhang-I-Größenregel wesentlich (Art. 3 Abs. 1 Buchst. a, wie im eigenen Fakt-Absatz des Memos). |
| 7 | umgesetzt | nis2.mjs | Unabhängigkeitsklausel für DE und AT; Quelle auf 2026-10-23. |
| 8 | umgesetzt | nis2.mjs | Option „kritische Anlage nach deutschen Schwellenwerten“, ergibt wesentlich (§ 28 Abs. 1 Nr. 1 BSIG). |
| 9 | umgesetzt | nis2.mjs | Satz zu Registrierung und Mein Unternehmenskonto wie formuliert; Behördenname beim ersten Vorkommen ausgeschrieben gelassen. |
| 10 | umgesetzt | nis2.mjs | „besonders wichtige Einrichtung“ nur bei Land Deutschland. |
| 11 | umgesetzt | nis2.mjs | Nachfrist 31.7.2026 ergänzt, als „Unsicher“ markiert, weil nur Sekundärquellen. |
| 12 | umgesetzt | src/memos/labelling.mjs | Neue Anbieterfrage (ja / nur Standardbearbeitung / nein); nur „ja“ löst Art. 50 Abs. 2 aus; unbeantwortet zählt als „ja“; „Standardbearbeitung“ ergibt Gelb mit Prüfpunkt. |
| 13 | umgesetzt | labelling.mjs | Titel „ab dem 2. Dezember 2026“, wenn Art. 50 Abs. 2 die einzige Pflicht und das System vor dem 2.8.2026 in Verkehr war. |
| 14 | umgesetzt | labelling.mjs | „Beides/unsicher“ ohne Prüfung ergibt Rot. Für gelbe Fälle ohne Prüfung brauchte es einen neutralen Titel: „Partly. No duty found, but points to check.“ / „Teilweise. Keine Pflicht gefunden, aber Punkte zu prüfen.“ (eigener Wortlaut). |
| 15 | umgesetzt | labelling.mjs | Art. 50 Abs. 6 als Fakt, Rest als Auslegung, Wettbewerbsrecht entfällt. |
| 16 | umgesetzt | labelling.mjs, start.mjs | Leitlinien als „Inhalt gebilligt am 20.7.2026 (C(2026) 5054 final, Anhang)“; im englischen Text „To be checked“ statt „Stand prüfen“. |
| 17 | umgesetzt | labelling.mjs | Quelle Abschnitt 6.1.1, Rn. 113 ff. |
| 18 | umgesetzt | labelling.mjs | Verbot nach Art. 5 Abs. 1 Buchst. ba im Fall Bild/Ton/Video. |
| 19 | umgesetzt | labelling.mjs, src/memos/pages.mjs | Wegen der neuen Frage aus Nr. 12 „zwei bis sieben Fragen“; die Karte im Memo-Index zeigt jetzt eine Spanne. |
| 20 | umgesetzt | src/memos/login.mjs | Titel und Ergebnisse wie formuliert; zusätzlich DE-Detail „abgesichert“ ersetzt durch „haben einen zweiten Faktor“. URL bleibt `/anmeldesicherheit`. |
| 21 | umgesetzt | login.mjs | „Viele Einbrüche …“ (Variante ohne Zahl, weil Verizon nur über Zusammenfassungen gelesen). |
| 22 | umgesetzt | login.mjs | Schritt 3 offen, sobald Austritte „Nein“ oder „unbekannt“. |
| 23 | umgesetzt | login.mjs | NIST-Satz und Schritt 2 wie formuliert. |
| 24 | umgesetzt | login.mjs | Edition 2023 und IT-Grundschutz++ mit Quellen; EN „to be checked“. |
| 25 | umgesetzt | login.mjs | ENISA-Satz wie formuliert, Schritt 4 in der Quelle. |
| 26 | umgesetzt | src/memos/start.mjs | Angekreuztes Tool gilt als Nutzung „Konten unbekannt“ (Rot), Satz „Sie haben KI-Tools angekreuzt …“, „brauchbarer Anfang“ gestrichen. |
| 27 | umgesetzt | start.mjs | „Derzeit kein Fall“, „Nicht im Einsatz“; „Geregelt“ nur mit schriftlichen Regeln, sonst „Vorhanden“ (eigener Wortlaut). |
| 28 | umgesetzt | start.mjs | Eigener erster Schritt für betriebliche Konten mit Personenbezug. |
| 29 | umgesetzt | start.mjs | „Begonnen; einige Schritte sind offen.“ und Verweis „für jeden Schritt dieses Plans“. |
| 30 | teilweise | pages.mjs, src/memos/routes.mjs | Einwilligung, howText und Mailtext angepasst. `BREVO_MEMO_LIST_ID` ist eine Render-Variable: nicht setzen, bis die Datenschutzerklärung endgültig ist (Hinweis im Code-Kommentar). |
| 31 | umgesetzt | public/tools/may-this-go-in.js, src/pages/tools.mjs | „Etwas anderes“ ergibt Gelb mit dem formulierten Grund. |
| 32 | umgesetzt | tools.mjs | Satz zum privaten Konto bei Rot; „(Art. 9 DSGVO)“ im Grund und als Quellenzeile. |
| 33 | umgesetzt | public/tools/personal.js | Namen enden an der Wortgrenze; Titelketten („Herrn Dr. Huber“) und Zeilenende abgedeckt. |
| 34 | umgesetzt | personal.js | Stichwort plus Trennzeichen plus Rest der Zeile (bis 60 Zeichen); Füllwörter, „für …:“, WLAN, WiFi, Schlüssel, pw. Zusätzlich: Wert mit Ziffer direkt nach einem Passwortwort („PIN 4711“) zählt auch ohne Trennzeichen. |
| 35 | umgesetzt | personal.js, tools.mjs | Wortstämme wie formuliert plus „Bandscheib…“ aus der Testliste des Befunds; das ganze Wort wird ersetzt; Liste im Grenzen-Text genannt. |
| 36 | umgesetzt | personal.js, tools.mjs | Exakte Länge AT 20, DE 22, sonst 15 bis 34, Ende an der Gruppengrenze; falsche Prüfziffer ergibt Gelb „Möglicherweise IBAN“. |
| 37 | umgesetzt | personal.js | Zweiteilige Straßennamen, Hausnummer vorne (englisch), kein `i`-Flag; Hausnummern 1 bis 1899, damit „Spring 2024“ keine Adresse ist. |
| 38 | umgesetzt | personal.js, tools.mjs | RV-Nummer immer; Steuer-ID, Versichertennummer, Ausweis nach ihrer Bezeichnung, Steuer-ID ohne Bezeichnung nur mit gültiger Prüfziffer; Versichertennummer ohne Bezeichnung Gelb. |
| 39 | umgesetzt | personal.js | Trennzeichen bei Zugangsdaten; Befund/Operation ohne Gesundheitskontext Gelb; Telefon nur mit „+“ oder Trennzeichen; Jahreszahl nach „Jahr“, „seit“, „bis“ u. a. keine Postleitzahl. |
| 40 | teilweise | personal.js | Leerzeichen nach dem Namen und Länge der Adress-Wortkette über Nr. 33 und 37 erledigt. Nicht umgesetzt (C, Erkennungslogik statt Wortlaut): „Geburtstag“, Datum in Worten, ISO-Datum, „Rechnung Nr.“, „Re.-Nr.“. |
| 41 | umgesetzt | tools.mjs | Grenzen-Text wie formuliert, ergänzt um die erfassten Gesundheits- und Zugangswörter (Nr. 35). Kartentexte tools.mjs:21 und :101 unverändert, dafür ist keine Korrektur formuliert. |
| 42 | umgesetzt / andere Datei | src/pages/product.mjs, home.mjs, src/i18n.mjs, start.mjs | „Vierunddreißig Fragen, davon 29 Pflichtfragen“ (Zählung siehe unten). `src/shop/products.mjs:11-12` sagt noch „thirty-one“/„einunddreißig“: andere Datei. |
| 43 | nicht umgesetzt | product.mjs, product-security.mjs, home.mjs | Zurückgestellt: Seitenzahl nach Neusatz (Liste unten). Muster-PDFs unter `public/samples` neu erzeugen: andere Datei. |
| 44 | nicht umgesetzt | product.mjs, product-security.mjs, home.mjs | Zurückgestellt bis zur Neuauszählung der offenen Punkte (Liste unten); danach den formulierten Satz mit „davon [n] offen“ einsetzen. |
| 45 | umgesetzt | src/pages/product-security.mjs | FAQ wie formuliert, mit „EUR-Lex, Abruf 2026-10-23“. |
| 46 | umgesetzt | product.mjs, product-security.mjs, home.mjs | Minutenangaben entfernt, „Der Beispielbetrieb ist vorbelegt, Sie ändern nur, was abweicht“. Beim KI-Toolkit die genaue Zahl aus Nr. 42 statt „rund dreißig“. |
| 47 | umgesetzt | i18n.mjs | „Zwanzig Fragen“ ersetzt, `soon` gelöscht (nirgends verwendet). |
| 48 | nicht umgesetzt | product.mjs, i18n.mjs | C-Punkt, verlangt Code (Satz aus `pilotSeats` bauen), nicht nur Wortlaut; `shop.pilotPrice` wird zudem in `src/shop/routes.mjs` genutzt (andere Datei). Bei PILOT_SEATS=10 stimmt der Text. |
| 49 | teilweise / andere Datei | product.mjs, product-security.mjs | „neun Abschnitte, darunter …“ umgesetzt. „Example Electrical Ltd“ steht in den Vorgaben von `questions.json` und in den Musterdateinamen: andere Datei. |
| 50 | umgesetzt | tools.mjs, personal.js | Kommentare wie formuliert; derselbe Satz auch in personal.js Zeile 1. |

## Fragenzahl KI-Toolkit (Nr. 42)

`content/toolkits/ai-policy/questions.json` hat beim letzten Lauf (23.10.2026, Ende W5) 34 Fragen, davon 29 Pflicht und 5 freiwillig (A11, B2, C2, D1, F1). Mit `steps()` aus `src/toolkit/engine.mjs` und den Vorgaben des Beispielbetriebs werden 34 Fragen gestellt; B2 erscheint nur, wenn B1 eine Tool-Art außer „keine“ hat (sonst 33). Der Befund nennt als erste Variante genau diese Zahl, deshalb „Vierunddreißig Fragen, davon 29 Pflichtfragen“. Skript: `C:\Users\Stefa\AppData\Local\Temp\scutoria-w5\count-questions.mjs`.

**Achtung:** `questions.json` beider Toolkits wird parallel von anderen Agenten geändert. Beim Sicherheitsnachweis zählt die Datei am Ende von W5 **47 Fragen, davon 40 Pflicht** (vorher 40/39). Die Seiten sagen weiter „vierzig“. Bitte beide Zahlen nach Abschluss der Fragebogen-Korrekturen neu zählen und diese Stellen anpassen:

- KI: product.mjs:92, 93, 105, 130, 131, 143; home.mjs:21, 25, 48, 52; i18n.mjs:39, 83; src/memos/start.mjs:189; andere Datei: src/shop/products.mjs:11, 12.
- Sicherheitsnachweis: product-security.mjs:24, 25, 37, 57, 62, 63, 75, 95; home.mjs:22, 25, 49, 52; src/pages/toolkit-preview.mjs:13, 15, 22, 24; andere Datei: src/shop/products.mjs:21, 22.

## Seitenzahl nach Neusatz

Nicht geändert, nach dem endgültigen Satz der Handbücher aus der PDF-Datei setzen:

- src/pages/product.mjs:19 (`PAGES`: „23 pages“, „25 Seiten“, „33 pages“, „37 Seiten“)
- src/pages/product.mjs:30 („23 pages“), :36 („25 Seiten“), :102 („Twenty-three pages“), :140 („Fünfundzwanzig Seiten“)
- src/pages/product-security.mjs:9 („33 pages“), :16 („37 Seiten“), :34 („Thirty-three pages“), :72 („Siebenunddreißig Seiten“)
- src/pages/home.mjs:22 („a handbook of thirty-three pages“), :34 („23 pages“), :35 („33 pages“), :49 („Handbuch von siebenunddreißig Seiten“), :60 („25 Seiten“), :61 („37 Seiten“)

## Zahl der offenen Punkte nach Neuauszählung

Nicht geändert; Satz aus Nr. 44 einsetzen, sobald die Handbücher fertig sind:

- src/pages/product.mjs:112 („seventeen“), :150 („siebzehn“)
- src/pages/product-security.mjs:44 („twenty-three“), :82 („dreiundzwanzig“)
- src/pages/home.mjs:27 und :54 (beide Zahlen)

## Prüfung

**Tools** (`C:\Users\Stefa\AppData\Local\Temp\scutoria-w5\tools-check.mjs`): 93 Prüfungen, alle bestanden. Enthalten: alle Teststrings aus Nr. 33 bis 39, Regressionen aus den Projekttests, „kein Passwort/keine IBAN-Ziffer bleibt in der Kopie mit Platzhaltern“, Laufzeit (Bindestrich-Ketten unter 1 ms, 50 000 Zeichen Text 9 ms), 2000 gemischte Texte ohne überlappende Funde, „Darf das hinein?“ mit allen 216 Einfach- (198 Rot, 17 Gelb, 1 Grün) und 1152 Teilmengen-Kombinationen: Grün nur bei keinen Daten, freigegebenem Konto, ohne Training, zulässiger Aufgabe; „Etwas anderes“ nie Grün.

**Memos** (`C:\Users\Stefa\AppData\Local\Temp\scutoria-w5\memos-check.mjs`): 40 Prüfungen, alle bestanden. Jeder Zweig durchgerechnet: NIS2 79 488 Auswertungen, Kennzeichnung 15 066, Anmeldung 73 728, Start 27 648, jeweils EN und DE. Geprüft u. a.: Zentralregierung immer Rot mit formuliertem Titel, regional und lokal Gelb, deutscher Begriff nur bei Deutschland, kein „sicher/secure“ in einem Anmelde-Titel, Austritt offen heißt Schritt 3 offen, angekreuztes Tool nie „brauchbarer Anfang“, „Geregelt“ nie ohne schriftliche Regeln, „Beides“ ohne Prüfung immer Rot.

**Projekttests:** `node --disable-warning=ExperimentalWarning --test test/` bricht unter Node 24.14.1 ab (`MODULE_NOT_FOUND`, ein Ordner als Argument wird nicht unterstützt), unabhängig von W5. Gelaufen mit dem Paketskript `--test "test/*.test.mjs"`: vor W5 39 von 39 bestanden, danach **36 von 39**. Fehlschläge, Tests nicht verändert:

1. `test/memos.test.mjs:21` „answers are read only …“: erwartet `sector: 'health'`, jetzt `['health']`. Folge von Nr. 4 (Mehrfachauswahl). Test auf `sector: ['health']` anpassen.
2. `test/security.test.mjs:19` „forty questions in nine blocks“: 47 statt 40. Ursache ist die geänderte `security-evidence/questions.json` (anderer Agent), nicht W5.
3. `test/security.test.mjs:53` „preview page of toolkit 2 …“: erwartet „Question 1 of 40“; gleiche Ursache.

## Für Stefan

- **Render:** `BREVO_MEMO_LIST_ID` nicht setzen, bis die Datenschutzerklärung endgültig ist (Nr. 30).
- **Recht, vor Livegang lesen:** eigene Formulierungen, die der Befund nicht vorgab: neutraler gelber Titel im Kennzeichnungs-Memo, Status „Vorhanden“, Registrar-Satz (Nr. 5), Prüfpunkt „Standardbearbeitung“ (Nr. 12), Art.-9-Quellenzeile (Wortlaut am Original nicht gelesen, EUR-Lex lieferte eine leere Seite; im Quellenprotokoll vermerkt). Empfehlung: Registrar-Einstufung (Art. 2 Abs. 4, Art. 28) einmal am Original prüfen lassen.
- **Entscheidung C-Punkte mit Code:** Nr. 48 (Gründerplätze aus der Konfiguration) und Rest von Nr. 40. Empfehlung: beide umsetzen, geringes Risiko.
- **Hinweis ohne Befund:** labelling.mjs:113 „the safe course is to pause it“ / „der sichere Weg“ verwendet ein gesperrtes Wort; Vorschlag „the cautious course“ / „der vorsichtige Weg“. Die Memos zeigen weiter „Quellen geprüft: 19.10.2026“, obwohl einzelne Quellen jetzt 23.10.2026 tragen. Vorbestehend: Der E-Mail-Ausdruck braucht bei 50 000 Zeichen ohne Leerzeichen rund 0,7 s.

Quellenprotokoll ergänzt: `produkte/memos/QUELLEN.md`, Abschnitt 6.
