# Befund: roter Test e26 (Seitenzahl des englischen D5-Musters)

Stand 4.11.2026, vormittags. Lokal aus dem Lovable-Spiegel reproduziert. Bei Lovable wurde nichts geändert und keine Nachricht gesendet. Diese Datei ist die einzige Projektdatei aus dieser Prüfung; sie wird nicht versioniert.

## Kurzfassung

- Der Test `src/test/e26.test.ts` erwartet für das D5-Antwortschreiben in beiden Sprachen drei PDF-Seiten (Zeile 37). Er baut das Dokument ohne festes Datum, und drei Termine im Dokument rechnen aus „heute“: Stand der Selbstauskunft (heute), erste Welle (heute plus 30 Tage) und die Zieltermine der Tabelle (heute plus 30, 90, 180 Tage). Je nach Tag sind die Datumswörter ein paar Zehntelpunkte breiter oder schmaler, einzelne Tabellenzeilen brechen anders um, und der Schlussabsatz passt auf Seite 2 oder nicht.
- Das englische Dokument sitzt genau auf der Kante: An 167 von 457 geprüften Tagen fehlen 1,61 pt für den Schlussabsatz (an 13 davon 13,76 pt), er rutscht auf Seite 3, drei Seiten, Test grün. An 290 Tagen bleiben 10,54 oder 22,69 pt übrig, zwei Seiten, Test rot. Das deutsche Dokument hat an allen 457 Tagen drei Seiten: Bis 29.1.2027 läuft seine Tabelle auf Seite 3 über (Reserve 79 pt); an 122 Tagen im Jahr 2027 endet sie auf Seite 2, und der Hinweis steht allein auf Seite 3 (Fehlbetrag 50 pt).
- Lokal: 4.11.2026 EN 3 Seiten, DE 3 Seiten. 3.11.2026 EN 2 Seiten, DE 3 Seiten. Die Lovable-Meldung „EN 2 statt 3“ entspricht einem Lauf mit UTC-Datum 3.11. Beim Schreiben des Tests (E26 bei Lovable erledigt 30.10.) war er grün; rot ist er am 3. bis 11.10., 1.11., 3.11., 7.11., dann durchgehend vom 1.12.2026 bis 3.6.2027.
- Auf den Drei-Seiten-Tagen enthält die dritte englische Seite nur den dreizeiligen Hinweisabsatz und die Namenszeile. Die Erwartung „3 Seiten“ schreibt also eine fast leere Seite fest. Dasselbe Bild zeigt das deutsche Dokument an den 122 Tagen im Jahr 2027.
- Code (`pdf.mjs`, `cover-letter.mjs`, `security/index.mjs`), Schriften und Bibliotheksversionen sind bei Lovable und im Spiegel gleich (geprüft, Abschnitt 4).
- Empfehlung: Option A (Test mit festem Datum und Strukturprüfung statt starrer Seitenzahl), später Option B (Hinweisabsatz nie allein auf einer Seite). Option C (Hinweistext kürzen) nur mit deiner Freigabe, Tor Recht.

## 1. Teststand

| Was | Wert | Quelle, Abrufdatum |
|---|---|---|
| Testdatei | `src/test/e26.test.ts` bei Lovable, `describe("E26 public D5 sample letters")`, je Sprache `it("…, 3 pages")`; Zeile 37: `expect((await PDFDocument.load(bytes)).getPageCount()).toBe(3)` | Lovable `read_file`, Projekt 6e8cf66c, 4.11.2026 |
| Antworten im Test | `defaultAnswers(def, lang)` aus `engine.mjs`, dazu A10 „Example Electrical Ltd / Beispielgasse 12 / 1234 Musterstadt / Austria“, A11 „Sample Wholesale GmbH / Purchasing / Musterplatz 5 / 1234 Musterstadt / Austria“ (deutsch: Muster Elektrotechnik e.U., Beispiel Großhandel GmbH, Österreich), A4.text „Alex Beispiel“ | ebd., Zeilen 12 bis 23 |
| Aufruf | `SECURITY_DOCS[cover-letter].build(def, answers, lang, {})`, leerer Kontext, dann direkt `toPdf(doc, lang)` aus `pdf.mjs` (nicht über `produce()` und nicht über den Server) | ebd., Zeilen 22 und 32 |
| Lovable-Meldung | EN 2 Seiten statt 3, DE grün; Baseline 247 Tests, 1 rot, schon vor dem 3.11. | Auftrag des Hauptagenten, 4.11.2026. Der genaue Zeitpunkt (UTC-Datum) des Lovable-Laufs ist nicht ermittelbar, weil keine Nachricht an Lovable gesendet wurde |
| E26 bei Lovable | erledigt 30.10.2026 (e3dc736, 132 Tests) | `AUFGABEN.md`, Zeile 56, gelesen 4.11.2026 |
| Lovable-Testumgebung | `vitest.config.ts`: environment jsdom, setupFiles `src/test/setup.ts` (nur `scrollTo` und `matchMedia`), keine feste Systemzeit; der Test selbst setzt `@vitest-environment node` | Lovable `read_file`, 4.11.2026 |

## 2. Lokale Reproduktion

Skript: `C:\Users\Stefa\AppData\Local\Temp\claude\C--Users-Stefa-OneDrive-scutoria\2bd5f3e6-fc88-4cc8-85f2-34265e43c491\scratchpad\d5\d5-render.mjs`. Es baut das Dokument genau wie der Test (gleiche Antworten, leerer Kontext, `toPdf` direkt) und zählt die Seiten mit `PDFDocument.load(bytes).getPageCount()`. Für andere Tage wird `new Date()` ohne Argument auf den gewünschten Tag gesetzt; alles andere läuft unverändert. Aufruf aus dem Scratchpad-Ordner:

```
node --disable-warning=ExperimentalWarning --import "file:///C:/Users/Stefa/OneDrive/scutoria/site/scripts/local/register.mjs" d5-render.mjs today
node ... d5-render.mjs at 2026-11-03
node ... d5-render.mjs sweep 2026-10-01 2027-12-31
```

Ergebnisse (lokal, Node 24.22.1, 4.11.2026):

| Tag (UTC) | EN Seiten | DE Seiten | Inhalt der letzten Seite |
|---|---|---|---|
| 4.11.2026 (heute) | 3 | 3 | EN Seite 3: nur Hinweisabsatz (3 Zeilen) und Namenszeile. DE Seite 3: wiederholte Tabellenkopfzeile, letzte Zeile „Dürfen wir Sie prüfen…“, Hinweis, Namenszeile |
| 3.11.2026 | 2 | 3 | EN: Tabelle, Hinweis und Namenszeile passen auf Seite 2; die Namenszeile steht 2,5 pt unter dem unteren Rand, direkt über der Fußlinie |
| 30.10.2026 (Tag der E26-Umsetzung) | 3 | 3 | wie 4.11. |

Quelle: Ausgaben `today`, `at 2026-11-03`, `slack 2026-10-20 2026-11-12` und `sweep` des Skripts, 4.11.2026; PDFs unter `…\scratchpad\d5\out\`.

Ein Lauf am 3.11. über den lokalen Server lieferte laut Auftrag drei Seiten. Das widerspricht nicht: Der Server baut mit `produce()` und `ctxOf(run)` (`routes.mjs`, Zeile 50) und mit den Antworten des Laufs, nicht mit den Testantworten. Mit den Testantworten ergibt der 3.11. lokal zwei Seiten.

## 3. Ursache mit Fundstellen

### 3.1 Das Tagesdatum fließt in den Text ein

| Stelle | Was passiert | Datei, Zeile (Spiegel; bei Lovable identisch) |
|---|---|---|
| Stichtag des Briefs | `const today = ctx.today ?? new Date().toISOString().slice(0, 10);` Der Test übergibt `{}`, also gilt das Laufdatum | `site/src/toolkit/documents/security/cover-letter.mjs`, Zeile 148 |
| Standardantworten | I2 (Stand) `"+0"`, I3 (erste Welle) `"+30"`; `isoPlus` rechnet ab `new Date()` | `content/toolkits/security-evidence/questions.json`, Zeilen 403 und 407; `site/src/toolkit/engine.mjs`, Zeilen 28 und 39 |
| Zieltermine der Tabelle | `targetDate` = I3 plus 0, 60 oder 150 Tage je Priorität, also heute plus 30, 90, 180 Tage | `site/src/toolkit/documents/security/self-declaration.mjs`, Zeilen 78 bis 81; Verwendung in `cover-letter.mjs`, Zeilen 185 und 210 |
| Schreibweise | `toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })`, zum Beispiel „4 December 2026“ | `self-declaration.mjs`, Zeile 68 |

Am 4.11. stehen in der englischen Tabelle die Termine „4 December 2026“ (Priorität 1), „2 February 2027“ (Priorität 2) und „3 May 2027“ (Priorität 3); am 3.11. „3 December 2026“, „1 February 2027“, „2 May 2027“.

### 3.2 Das englische Dokument sitzt auf der Seitenkante

Der Brief steht auf Seite 1 (Reserve 228,9 pt EN, 213,7 pt DE), dann erzwingt `B.pagebreak()` (Zeile 227) die Abgleichtabelle ab Seite 2, gefolgt vom Hinweisabsatz `B.note(t.note)` (Zeile 231). Das Druck-CSS des Briefs setzt `.pg__p` auf 12,5 px (Zeile 242); daraus macht `printSettings` den Faktor K = 12,5 / 15 = 0,8333 (`pdf.mjs`, Zeile 24). Das Layout läuft auf einer virtuellen Seite von 1010,3 pt Höhe mit 68,0 pt unterem Rand (20 mm), also 881,0 pt nutzbar; alle Maße unten sind virtuelle Punkte, auf dem Papier mal 0,8333.

Rechnung für den 4.11. (EN): Die Tabelle endet mit der letzten Grundlinie bei y = 129,7. Zeilenunterkante = 129,7 minus 10,15 = 119,55; danach `lay.y -= 8` (Zeile 585), also 111,55. Der Hinweis hat 3 Zeilen zu 9 pt mit Zeilenhöhe 1,45 plus 6 pt Abstand = 45,15 pt (Zeilen 252 und 365). Prüfung `this.y - h < MB` (Zeile 242): 111,55 minus 45,15 = 66,40, das ist kleiner als 68,03. Es fehlen 1,61 pt, der Hinweis wandert auf Seite 3. Auf dem Papier sind das 1,34 pt oder 0,47 mm.

Am 3.11. ist die Tabelle eine Zeile kürzer (12,15 pt = 9 pt mal 1,35, Zeile 554): Reserve plus 10,54 pt, zwei Seiten.

Quelle: Ausgabe `slack 2026-10-20 2026-11-12` des Skripts, 4.11.2026. Die Spanne über alle 457 Tage steht in Abschnitt 3.5.

### 3.3 Der Auslöser zwischen 3.11. und 4.11.

Manrope hat proportionale Ziffern. Breiten bei 9 pt: „1“ 3,51 pt, „2“ 5,13 pt, „3“ 4,98 pt, „4“ 5,31 pt. „3 December 2026“ misst 72,92 pt, „4 December 2026“ 73,25 pt (Quelle: `widthOfTextAtSize` mit pdf-lib 1.17.1 und `manrope-400.ttf`, 4.11.2026).

Die Antwortspalte ist 262,27 pt breit. Zeile 8 der Tabelle („How often do you back up…“, Antwort „Backup: partly (daily to the NAS in the office, no offline copy), by 4 December 2026; restore test: not yet, by 4 December 2026“) bricht mit „4 December“ in drei Zeilen um, mit „3 December“ in zwei; die Frage links hat zwei Zeilen, also wächst die Zeilenhöhe von zwei auf drei Zeilen. Ein Unterschied von 0,33 pt in einem Datumswort entscheidet über die Seitenzahl. Zeile 14 („Have you had incidents…“) wechselt mit „1 February“ gegen „2 February“ ebenfalls von einer auf zwei Antwortzeilen, ohne die Zeilenhöhe zu ändern (die Frage hat zwei Zeilen). Quelle: Ausgabe `rowlines 2026-11-03 2026-11-04 en` und `pdftotext` der beiden PDFs, 4.11.2026.

### 3.4 Verlauf über 457 Tage (1.10.2026 bis 31.12.2027)

| | Tage mit 2 Seiten | Tage mit 3 Seiten |
|---|---|---|
| EN | 290 | 167 |
| DE | 0 | 457 |

Die englische Tabelle endet an allen 457 Tagen auf Seite 2; ob der Hinweis noch darunter passt, entscheidet die Seitenzahl (Reserve je Tag in Abschnitt 3.5). Tage mit EN = 2 (Test rot): 3. bis 11.10.2026; 1.11., 3.11., 7.11.2026; 1.12.2026 bis 3.6.2027; 5.6., 9.6.2027; 3.7. bis 1.8.2027; 2. bis 10.9., 12.9., 14.9., 18.9.2027; 2. bis 11.10.2027; 1. bis 9.11.2027; 2. bis 31.12.2027. Alle anderen Tage EN = 3 (Test grün), darunter der 30.10. (E26-Umsetzung), der 2.11. und der 4.11. Vollständige Liste: `…\scratchpad\d5\out-sweep.txt` und `out\sweep-2026-10-01-2027-12-31.json`. Quelle: Ausgabe `sweep`, 4.11.2026.

Folgerung: Die Lovable-Meldung (EN 2) passt zu einem Lauf mit UTC-Datum 3.11. Läuft der Test bei Lovable am 4.11. (UTC) erneut, müsste er grün sein; ab 1.12.2026 ist er bis Juni 2027 jeden Tag rot. Stand prüfen: Sollte Lovable am 4.11. (UTC) weiterhin zwei Seiten melden, gibt es einen weiteren Unterschied, den diese Prüfung nicht gefunden hat.

### 3.5 Reserve-Spanne über alle Tage

Reserve für den Hinweisabsatz nach der Tabelle, virtuelle Punkte, je Tag vom 1.10.2026 bis 31.12.2027 (Quelle: Ausgabe `slack 2026-10-01 2027-12-31`, Datei `out-slack.txt`, ausgewertet mit `summarize-slack.awk`, 4.11.2026):

| Sprache | Tabelle endet auf | Reserve | Tage | Ergebnis |
|---|---|---|---|---|
| EN | Seite 2 (alle 457 Tage) | plus 22,69 pt | 218 | 2 Seiten |
| EN | Seite 2 | plus 10,54 pt | 72 | 2 Seiten |
| EN | Seite 2 | minus 1,61 pt | 154 | 3 Seiten, Seite 3 nur Hinweis und Name |
| EN | Seite 2 | minus 13,76 pt | 13 (12., 16., 18., 21., 22., 24. bis 31.8.2027) | 3 Seiten, Seite 3 nur Hinweis und Name |
| DE | Seite 3 | plus 79,14 pt | 335 (1.10.2026 bis 29.1.2027, 8.2., 10.2. bis 1.3., 21.3., 23. bis 31.3., 2.7. bis 31.12.2027) | 3 Seiten, Seite 3 mit letzter Tabellenzeile |
| DE | Seite 2 | minus 50,21 pt | 122 (30.1. bis 7.2., 9.2., 2. bis 20.3., 22.3., 1.4. bis 1.7.2027) | 3 Seiten, Seite 3 nur Hinweis und Name |

Die Reserve springt nur in Vielfachen einer Tabellenzeile (12,15 pt), weil sich mit den Datumswörtern ganze Umbrüche ändern. Das englische Dokument liegt nie weiter als 13,76 pt vor und nie weiter als 22,69 pt hinter der Kante, also innerhalb von zwei Tabellenzeilen. Die deutsche Tabelle liegt um 50 bis 80 pt um das Seitenende, also innerhalb einer Zeilenhöhe der letzten Tabellenzeile (4 Zeilen, 58,6 pt).

### 3.6 Was nicht die Ursache ist

| Vermutung | Befund | Quelle |
|---|---|---|
| Anderer Code bei Lovable | `src/legacy/toolkit/documents/pdf.mjs` (671 Zeilen) und `security/cover-letter.mjs` (244 Zeilen) sind mit dem Spiegel zeichengleich (`diff` ohne Unterschied); `security/index.mjs` ebenso | Abschriften unter `…\scratchpad\d5\lovable\`, `diff --strip-trailing-cr`, 4.11.2026 |
| Andere Schriften | `public/fonts/ttf/manrope-400.ttf` bei Lovable als Text gelesen (58.959 Zeichen) stimmt Zeichen für Zeichen mit der gleich dekodierten lokalen Datei überein; `sha256` ist bei Lovable nicht ausführbar, die verlustbehaftete Textdekodierung ist der nächstbeste Vergleich. Lokale Prüfsummen: manrope-400 `099cab64…3eb0`, manrope-700 `dc97369c…0553`, ibm-plex-mono-400 `ffe3d5d1…68ce`, ibm-plex-mono-500 `f0a06050…a9f8` | `cmp`, `sha256sum`, 4.11.2026 |
| Andere Bibliotheken | Lovable `package.json`: `pdf-lib ^1.17.1`, `@pdf-lib/fontkit ^1.1.1`; npm-Stand 4.11.2026: 1.17.1 und 1.1.1 sind die neuesten, lokal installiert 1.17.1 und 1.1.1. Gleiche Schrift und gleiche fontkit-Fassung heißt gleiche Metriken | Lovable `read_file`, `npm view`, 4.11.2026 |
| Schriftlader | Lovable `src/legacy/runtime/files.mjs` liest die TTF als Base64 (`?inline`) und gibt dieselben Bytes zurück wie `readFileSync` lokal | Lovable `read_file`, 4.11.2026 |
| Anderer Codepfad (`renderFitted`) | Verkleinert nur `pg--card` (Notfallkarte) und `evidence-summary`; der Brief (`pg--letter`) geht direkt nach `renderPdf` | `pdf.mjs`, Zeilen 606 und 607 |
| Andere Schriftgröße | K kommt aus dem `printCss` des Dokuments, auf beiden Seiten gleich (12,5 px) | `cover-letter.mjs`, Zeile 242; `pdf.mjs`, Zeile 24 |
| Andere Anschrift oder Antworten | Reproduktion nutzt exakt die Testantworten (E26-Anschriften, „Alex Beispiel“) | Abschnitt 2 |
| Feste Systemzeit im Test | keine; `vitest.config.ts` und `src/test/setup.ts` setzen nichts | Lovable `read_file`, 4.11.2026 |
| Zeitzone | `toISOString()` liefert das UTC-Datum, lokal wie bei Lovable | `cover-letter.mjs`, Zeile 148; `engine.mjs`, Zeile 28 |

### 3.7 Layout- und Inhaltsbefund am Dokument

- EN, Drei-Seiten-Tage: Seite 3 trägt nur den Hinweisabsatz (3 Zeilen, grau, 9 pt) und die Namenszeile „Example Electrical Ltd“. Eine fast leere Schlussseite.
- EN, Zwei-Seiten-Tage: Die Namenszeile wird gezeichnet, obwohl sie 2,5 pt unter den unteren Rand reicht, weil `footerLeft` nur vor dem Absenken um 13 pt prüft (`pdf.mjs`, Zeilen 638 bis 640). Sie steht 7,6 pt über der Fußlinie.
- DE, heute und bis 29.1.2027: Seite 3 beginnt mit der wiederholten Kopfzeile und der letzten Tabellenzeile; danach Hinweis und Namenszeile. An 122 Tagen im Jahr 2027 (Abschnitt 3.5) endet die Tabelle auf Seite 2, und Seite 3 trägt wie im Englischen nur Hinweis und Namenszeile. Die Seitenzahl bleibt dabei immer 3, deshalb ist der deutsche Test an jedem Tag grün.
- Seite 1 beginnt in beiden Sprachen mit dem Betriebsnamen als Titel (`title: business`, `cover-letter.mjs`, Zeile 236) und darunter gleich noch einmal als erste Zeile der Absenderanschrift. Der Name steht also zweimal untereinander. Das betrifft den Test nicht, fällt aber beim Lesen auf.
- Die öffentlichen Leseproben (E35) sind einseitig und tragen die Fußzeile „Page 1 of 3“ beziehungsweise „Seite 1 von 3“; die Produktseite nennt dieselbe Angabe (`site/src/pages/product-security.mjs`, Zeilen 7 und 14). Die vom Test bei `GEN_SAMPLES` geschriebenen Dateien `example-electrical-ltd-cover-letter-en.pdf` und `muster-elektrotechnik-e-u-cover-letter-de.pdf` liegen bei Lovable nicht mehr (`read_file`: 404, 4.11.2026); nur der alte Schnappschuss `site/data/snapshot/toolkits-security-evidence.html` verlinkt sie noch.

## 4. Optionen

### Option A: Test anpassen (empfohlen)

Der Test prüft, was E26 verlangt (kein Entwurfsvermerk, keine gelben Felder, Anschriften und Name im PDF), und zusätzlich eine Seitenzahl, die vom Tag abhängt. Vorschlag in zwei Teilen:

1. Datum festnageln, damit der Test an jedem Tag dasselbe Dokument baut: in `sampleLetter` `answers.I2 = { date: "2026-10-30" }` und `answers.I3 = { date: "2026-11-29" }` setzen und `build(def, answers, lang, { today: "2026-10-30" })` übergeben (der zweite `describe` in derselben Datei arbeitet schon mit `{ today: "2026-10-30" }`). Alternative: `vi.useFakeTimers({ toFake: ["Date"] })` mit `vi.setSystemTime("2026-10-30T12:00:00Z")`.
2. Struktur statt starrer Zahl prüfen: der Brief vollständig auf Seite 1 (alle Briefläufe mit `p === 0`, zum Beispiel die Namenszeile und „Owner or managing director, …“), die Überschrift „Questionnaire mapping“ beziehungsweise „Fragebogen-Abgleich“ auf Seite 2, Hinweisabsatz vorhanden, Seitenzahl 2 oder 3 (`expect([2, 3]).toContain(pages)`). Mit festem Datum 30.10. ergeben beide Sprachen 3 Seiten; wer die starre 3 behalten will, kann sie dann behalten, schreibt damit aber die fast leere dritte Seite fest.

Aufwand: eine Lovable-Runde, etwa zehn geänderte Zeilen in einer Testdatei, kein Produktcode. Lokal vorab prüfbar (Skript in Abschnitt 2). Kein Tor berührt.

### Option B: Layout anpassen

Regel im Renderer: Der Hinweisabsatz am Ende einer Tabelle steht nie allein auf einer Seite. Umsetzung in `pdf.mjs`, Tabellenfall (Zeilen 554 bis 585): Vor dem Zeichnen der letzten Zeile prüfen, ob Zeile plus 8 pt plus Hinweishöhe noch passen; wenn nicht, die letzte Zeile mit auf die neue Seite nehmen. Dazu die Schlusszeile (`footerLeft`, Zeilen 638 bis 640) so prüfen, dass sie nicht unter den Rand reicht. Ergebnis: EN auf Drei-Seiten-Tagen eine Seite 3 mit Tabellenzeile, Hinweis und Name (wie DE heute), auf Zwei-Seiten-Tagen unverändert; DE an den 122 Tagen des Jahres 2027 ebenso. Die Seitenzahl bleibt tagesabhängig, das Bild ist sauber.

Aufwand: mittel. Etwa 15 bis 20 Zeilen in `pdf.mjs`, betrifft alle Dokumente mit Tabelle und Hinweis, also alle 247 Tests laufen lassen und die vier Leseproben-Seiten gegenprüfen (Seite 1 ändert sich nicht). Lokal im Spiegel vorab testbar. Kein Tor berührt. Allein löst B den Test nicht; B gehört zu A.

### Option C: Inhalt ändern

C1: Hinweisabsatz (`t.note`, `cover-letter.mjs`, Zeilen 71 und 131) in beiden Sprachen so kürzen, dass er zwei Zeilen hat. Spart 13,05 pt; EN wäre an 444 von 457 Tagen zweiseitig, an den 13 Augusttagen 2027 mit 13,76 pt Fehlbetrag weiter dreiseitig, DE bliebe dreiseitig. Erst ein einzeiliger Hinweis (26,1 pt gespart) machte EN an allen 457 Tagen zweiseitig. Der Test müsste dann EN 2 und DE 3 erwarten, die Leseprobe EN „Page 1 of 3“ und die Angabe in `product-security.mjs` müssten auf 2 wechseln. Der Satz ist der Quellen- und Haftungshinweis des Dokuments (Tor Recht), also nur mit deiner Freigabe. Aufwand klein, aber er ändert ein Produktdokument, um einen Test zu beruhigen.

C2: Inhalt ergänzen, damit EN sicher drei Seiten hat (zum Beispiel eine Schlussbemerkung unter der Tabelle). Nicht empfohlen: Text als Füllmaterial, und die Kante verschiebt sich nur.

## 5. Empfehlung

Option A jetzt, in einer Lovable-Runde zusammen mit der nächsten ohnehin geplanten Änderung, damit die Credits nicht allein für den Test anfallen. Option B in die nächste Layoutrunde aufnehmen (fast leere dritte Seite, Namenszeile unter dem Rand, doppelter Betriebsname auf Seite 1). Option C nicht wegen des Tests; nur falls du den Hinweistext ohnehin kürzen willst.

Den Test einfach auf „2 Seiten“ umzustellen wäre falsch: Am 4.11. hätte er mit 2 ebenso rot geschlagen wie am 3.11. mit 3, und ab 1.12.2026 wechselt die Lage erneut.

## 6. Offen, Stand prüfen

- UTC-Datum des Lovable-Laufs, der „EN 2“ gemeldet hat: nicht ermittelbar ohne Nachricht an Lovable. Ein erneuter Lauf am 4.11. (UTC) müsste grün sein; wenn nicht, bleibt ein unbekannter Unterschied.
- Lovables Node-Version: nicht ermittelbar. Die Datumsschreibweise „4 December 2026“ ist in allen Node-Fassungen mit vollem ICU gleich; lokal Node 24.22.1.
- Prüfsummen der Lovable-Schriften: nur über die Textdekodierung verglichen, nicht per `sha256` (bei Lovable nicht ausführbar).

## 7. Zwischendateien (nicht im Projekt)

Ordner `C:\Users\Stefa\AppData\Local\Temp\claude\C--Users-Stefa-OneDrive-scutoria\2bd5f3e6-fc88-4cc8-85f2-34265e43c491\scratchpad\d5\`:

- `d5-render.mjs`: Reproduktionsskript (Modi `today`, `at`, `rows`, `rowlines`, `slack`, `sweep`)
- `out\d5-en-real-today.pdf`, `out\d5-de-real-today.pdf` (4.11.), `out\d5-en-2026-11-03.pdf`, `out\d5-de-2026-11-03.pdf`
- `out-sweep.txt`, `out\sweep-2026-10-01-2027-12-31.json`: Seitenzahlen je Tag
- `out-slack.txt`: Reserve je Tag; `summarize-slack.awk`: Auswertung dazu
- `lovable\pdf.mjs`, `lovable\cover-letter.mjs`: Abschriften der Lovable-Dateien für den `diff`
- `manrope-400-local-lossy.txt`: lokal gleich dekodierte Schriftdatei für den Vergleich mit Lovable
