# Produktionsablauf Schritt für Schritt

Stand 29. Oktober 2026. Werkzeuge: nur kostenlose oder schon vorhandene. Nichts wird gekauft, nichts abonniert, kein Konto ohne Stefans Wort (Tore Geld und Veröffentlichen). Ein Langvideo in einer Sprache braucht nach dem Einrichten etwa zwei bis drei Stunden Stefans Zeit; die zweite Sprache etwa eine Stunde zusätzlich, weil die Aufnahmen weitgehend dieselben sind.

## Werkzeuge

| Zweck | Werkzeug | Kosten | Beleg |
|---|---|---|---|
| Bildschirmaufnahme | Windows 11 Snipping Tool (eingebauter Bildschirmrekorder) für kurze Aufnahmen; OBS Studio für lange Aufnahmen | frei | Microsoft, Seite „Steps Recorder deprecation“ nennt den eingebauten Bildschirmrekorder des Snipping Tool seit 2023 · support.microsoft.com · Abruf 2026-10-29; OBS Studio: „Free and open source software for video recording and live streaming“, Windows 10 und 11 · obsproject.com · Abruf 2026-10-29 |
| Stimme | Google AI Studio, „Generate speech“ mit Gemini 3.8 Flash TTS (Gemini-API, Free-Tier), Ausgabe WAV 24 kHz | Free-Tier „free of charge“ laut Preisseite; Mengen und Grenzen in GEMINI-STIMME.md | ai.google.dev, Pricing und Speech generation, Stand 2026-10-28 · Abruf 2026-10-29 |
| Schnitt, Untertitel, Export | Microsoft Clipchamp (in Windows 11 enthalten), Export 1080p ohne Wasserzeichen im freien Plan | frei laut Drittquellen; Stand prüfen in der App | costbench.com, toolradar.com, kingy.ai (Drittquellen, uneinheitlich) · Abruf 2026-10-29. Microsoft-Preisseite in dieser Sitzung nicht gelesen. |
| Untertitel YouTube | automatische Untertitel in YouTube Studio, danach korrigieren | frei | YouTube-Hilfe „Use automatic captioning“: Deutsch und Englisch enthalten, in Studio bearbeitbar · support.google.com · Abruf 2026-10-29 |
| Grafiken (Thumbnail, Banner, Overlays) | SVG aus dem Designsystem (`design/project/`), Export als PNG über den Browser; Claude erzeugt die Dateien | frei | eigene Dateien |
| Tonbearbeitung (nur bei Bedarf) | Audacity (frei, offen) oder Clipchamp | frei | nicht geprüft; nur falls die WAV-Datei Störungen hat |

Nicht verwendet: Stockfotos, KI-Bilder von Personen, Musik mit Lizenzfragen, Avatare, fremde Vorlagen.

## Ablauf je Video

### 0. Vorbereitung (einmal)

1. Aufnahmeprofil im Browser anlegen: neues Edge-Profil ohne Namen und ohne Anmeldung, Lesezeichenleiste aus, Zoom 125 Prozent, dunkles Thema.
2. Windows: Benachrichtigungen aus („Nicht stören“), Desktop leer, Taskleiste ausgeblendet oder nie im Bild (Vollbild F11).
3. Ordner anlegen: `C:\Users\Stefa\Videos\scutoria\NN-slug\` mit Unterordnern `aufnahmen`, `stimme`, `schnitt`, `export`. Videodateien kommen nicht in den OneDrive-Ordner `scutoria` (zu groß für Git); nur Skripte und Metadaten liegen dort.
4. Google AI Studio einmal öffnen und die Stimme wählen (GEMINI-STIMME.md, Schritt 2). Eine Probedatei mit dem Kennzeichnungssatz erzeugen und anhören.
5. Clipchamp öffnen, ein Projekt „Vorlage 16:9“ mit dem Endscreen-Hintergrund (A18) und einer Textvorlage für Overlays und Quellenzeilen (Manrope, IBM Plex Mono) speichern; dasselbe als „Vorlage 9:16“ für Shorts.

### 1. Skript freigeben (Stefan liest, 20 bis 30 Minuten)

1. `SKRIPTE/NN-slug.en.md` öffnen, einmal lesen; Fachwörter und Zahlen prüfen. Was falsch ist, markieren; Claude bessert nach.
2. Freigabe als Datum in der Kopfzeile des Skripts („freigegeben 2026-11-05“). Ohne diese Zeile wird nicht vertont (Tor Veröffentlichen).
3. Dasselbe für die deutsche Fassung.
4. Prüfprotokoll: Claude trägt in `KENNZEICHNUNG.md`, Tabelle „Prüfprotokoll“, Video, Datum, Prüfer „Stefan“ ein. Das ist der Nachweis der menschlichen Prüfung (Art. 50 Abs. 4 Unterabs. 2, Ausnahme).

### 2. Stimme erzeugen (Stand 30. Oktober 2026, 13:25 Uhr Wien: automatisch über die API, Stefan hört nur ab)

Standardweg: Claude vertont jedes freigegebene Skript mit `vertonen.mjs` über die API, zwei Anfragen je Sprache (Abschnitte 1 bis 3 und 4 bis 7), eine je Short; im Free-Tier zehn Anfragen je Tag und Modell, also zwei Langvideos je Tag. Ergebnis unter `C:\Users\Stefa\Videos\scutoria\NN-slug\stimme\` als `01-03-en.wav`, `04-07-en.wav`, `01-03-de.wav`, `04-07-de.wav`, Protokoll `vertonung.log`. Stefan hört ab und meldet falsch gelesene Stellen; Claude schreibt um, Stefan bestätigt die Zeile im Prüfprotokoll, Claude vertont die Gruppe neu (`--neu --gruppen 4-7`). AI Studio mit dem Abo bleibt der Weg, wenn Stefan selbst klicken will; dafür legt Claude die Sprechtexte bereit: `node marketing/youtube/VORLAGEN/vertonen.mjs --skript marketing/youtube/SKRIPTE/NN-slug.en.md --text` schreibt nach `C:\Users\Stefa\Videos\scutoria\NN-slug\sprechtext\` die Dateien `stil-en.txt` (Stilanweisung), `01-en.txt` bis `07-en.txt` (je Abschnitt), `01-03-en.txt` und `04-07-en.txt` (Gruppen) und `ganz-en.txt`; Deutsch entsprechend. Stefan fügt in AI Studio zuerst die Gruppen ein; lehnt AI Studio den Text als zu lang ab, die Abschnitte einzeln. Shorts und Neuvertonungen einzelner Abschnitte übernimmt Claude über die API (`--short`, `--nur`), zehn Anfragen je Tag. Falsch gelesene Stellen: Stefan meldet, Claude schreibt den Sprechtext um, Stefan bestätigt die Zeile im Prüfprotokoll, der Abschnitt wird neu erzeugt.

1. Sprechtext extrahieren (Alternative zu `--text`): PowerShell, `VORLAGEN\sprechtext.ps1 -Skript SKRIPTE\NN-slug.en.md`. Ergebnis `NN-slug.en.sprechtext.txt`.
2. In AI Studio „Generate speech“: Modell Gemini 3.8 Flash TTS, Stimme wie festgelegt, Stilanweisung aus GEMINI-STIMME.md einfügen, Sprechtext abschnittsweise einfügen (je Abschnitt 1 bis 3 ein Lauf, je Abschnitt 4 bis 7 ein Lauf; Grenzen in GEMINI-STIMME.md).
3. Anhören. Falsch gelesene Zahlen oder Namen im Sprechtext umschreiben (etwa „Article fifty“), neu erzeugen.
4. WAV-Dateien herunterladen nach `stimme\`, benennen `01-hook.wav`, `02-problem.wav` und so weiter.
5. Dasselbe für Deutsch mit der deutschen Stimme.

### 3. Bild und Schnitt automatisch (Stand 30. Oktober 2026, 16:00 Uhr Wien: Standardweg, Stefan sieht nur das Ergebnis)

Standardweg: Claude baut das Video aus Skript, Stimme und Szenenplan mit `VORLAGEN/video-bauen.mjs`; Stefan nimmt nichts auf und schneidet nichts. Video 01 ist so am 30. Oktober 2026 in beiden Sprachen als Probe entstanden (mit der Lite-Stimme).

- Voraussetzungen, alle schon da: der lokale Site-Server (`node site/src/server.mjs`, Port 8787, SITE_MODE preview; die Kopfleiste mit dem Wort „Preview“ wird abgeschnitten), Microsoft Edge ohne Fenster für Bildschirmfotos, ffmpeg 8.1.2 (winget), Python mit pypdfium2 und Pillow (Windows-Store-Python). Nichts geht nach außen, nichts wird hochgeladen, nichts kostet.
- Eingaben: `SKRIPTE/NN-slug.xx.md` (Absätze, `[SCREEN]`, `[SOURCE]`/`[QUELLE]`, `[MARKER]`, Pausen-Tags), die Tonspur `C:\Users\Stefa\Videos\scutoria\NN-slug\stimme\01-03-xx.wav` und `04-07-xx.wav` (bei der Lite-Probe unter `…\scutoria\lite\NN-slug\stimme\`), der Szenenplan `SZENEN/NN-slug.xx.json`: welche Seite, welche PDF-Seite, welche Textkarte zu welchem Absatz, mit Bildschirmtext und Stempel; Pixelwerte je Sprache am lokalen Server gemessen (Datum steht im Plan).
- Ablauf im Skript: 1. Zeitplan: Absatzgrenzen nach Wortanteil, an Sprechpausen gerastet (ffmpeg silencedetect, −38 dB, 0,4 s). 2. Bilder: Seiten als hohe Bildschirmfotos (bis 39 000 px; Dokumentseiten wie Handbuch und Memo 1,5-fach vergrößert, damit der Text lesbar ist), PDF-Seiten mit pypdfium2, Textkarten und Overlays (Marker-Chip, Quellenband, Bildschirmtext links oben, Stempel rechts oben) aus HTML im Designsystem. 3. Je Absatz ein Clip mit langsamer Fahrt (`scroll`, `fix`, `pdf`, `still`); die Fahrt läuft über zusammenhängende Absätze derselben Szene durch. 4. Zusammensetzen, Ton darunter, SRT aus dem Skript.
- Aufruf (PowerShell, von `C:\Users\Stefa\OneDrive\scutoria` aus, Server läuft): `node marketing/youtube/VORLAGEN/video-bauen.mjs --skript marketing/youtube/SKRIPTE/NN-slug.en.md --stimme "C:\Users\Stefa\Videos\scutoria\NN-slug\stimme" --video`; `--plan` zeigt nur den Zeitplan, `--bilder` erzeugt nur die Bilder, `--neu` erzwingt neue Bilder und Clips. Nach einer neuen Tonspur (zum Beispiel Flash statt Lite) genügt es, den Ordner `clips\xx\` zu löschen; die Bilder bleiben. Ergebnis: `C:\Users\Stefa\Videos\scutoria\NN-slug\export\NN-slug.en.mp4` und `.srt`; Arbeitsdateien unter `bild\en\`, `clips\en\`, `plan.en.json`; Deutsch entsprechend mit `de`.
- Grenzen (Stand 30. Oktober 2026): Die Absatzgrenzen sind geschätzt (Wortanteil plus Pausenraster), nicht aus einer Transkription; an einzelnen Bildwechseln sind ein bis drei Sekunden Versatz möglich. Stefan meldet die Stelle, Claude verschiebt den Wechsel im Szenenplan. Der Generator zeigt Frage 1 mit dem vorbelegten Beispielbetrieb (eine Frage je Seite). Der Szenenplan je Video ist Handarbeit von Claude (etwa eine Stunde je Sprache beim ersten Mal, danach weniger, weil Seiten und Maße gleich bleiben).
- Prüfung vor der Abnahme: Standbilder aus der Mitte von 22 Absätzen als Kontaktbögen unter `…\NN-slug\stills\` (am 30. Oktober für Video 01 EN und DE angesehen: kein „Preview“, keine abgeschnittenen Texte, Quellenband lesbar), Dauer der MP4 gleich der Tonspur, SRT vorhanden. Stefan sieht das Video an und meldet Stellen; mehr braucht es nicht.

Ersatzweg, wenn Stefan selbst aufnehmen oder schneiden will: Schritte 3a und 4.

### 3a. Aufnahmen von Hand (Ersatzweg, 60 bis 90 Minuten für beide Sprachen)

1. Shotlist des Skripts öffnen (Abschnitt Regie oder die Codes A1 bis A18 aus SHOTLIST.md).
2. Je Zeile eine Aufnahme: Snipping Tool, Bildschirmrekorder, Bereich 1920 × 1080 wählen, Ton aus, Aufnahme, zwei Sekunden Ruhe am Anfang und Ende. Lange Aufnahmen (Generator durchklicken, Handbuch scrollen) mit OBS.
3. Dateien benennen wie die Shotlist: `01-startseite-claim.mp4`.
4. Englische und deutsche Seiten nacheinander aufnehmen; Dokumente einmal je Sprache.

### 4. Schnitt in Clipchamp (Ersatzweg, 60 Minuten je Sprache)

1. Projekt aus „Vorlage 16:9“ öffnen, umbenennen.
2. Stimme einfügen: alle WAV-Abschnitte in der Reihenfolge auf die Tonspur.
3. Aufnahmen auf die Videospur legen, nach dem Sprechtext kürzen; ein Bild je Gedanke, Wechsel ohne Effekte (harter Schnitt oder 200 ms Überblendung).
4. Overlays: Bildschirmtext aus den `[SCREEN]`-Zeilen, Quellenzeilen aus den `[SOURCE]`-Zeilen, Marker als Form und Wort. Quellenzeile steht, solange die Aussage gesprochen wird, mindestens vier Sekunden.
5. Anfang: zwei Sekunden dunkler Grund mit „Synthetic voice · Sources on screen“ als Text, dann der Hook.
6. Ende: Endscreen-Hintergrund A18 für die letzten 20 Sekunden unter dem Verweis.
7. Export 1080p, 30 fps, MP4, nach `export\NN-slug.en.mp4`.

### 5. Untertitel (20 Minuten je Sprache)

Standardweg: `video-bauen.mjs` schreibt die SRT aus dem Skript, mit den geschätzten Absatzgrenzen als Zeiten; Stefan prüft sie beim Ansehen mit. Die folgenden Schritte gelten für den Ersatzweg.

1. Nach dem Upload die automatischen Untertitel in YouTube Studio öffnen und gegen den Sprechtext korrigieren (Zahlen, Fachwörter, „Scutoria“).
2. Alternativ: Clipchamp erzeugt Untertitel beim Export; prüfen, als SRT sichern, bei YouTube hochladen.
3. Die korrigierte SRT-Datei auch für Instagram verwenden (Reels: eingebrannte Untertitel, weil Ton oft aus ist).

### 6. Upload (30 Minuten für beide Sprachen)

1. YouTube Studio, Video hochladen, Metadaten aus dem Skript (Titel, Beschreibung, Tags, Kapitel), Thumbnail hochladen.
2. Attribute: „AI use“ auf Ja (KENNZEICHNUNG.md). Zielgruppe: nicht für Kinder.
3. Übersetzung: Titel und Beschreibung der anderen Sprache als Übersetzung eintragen (Mehrsprachige Funktionen).
4. Endscreen: nächstes Video und Abonnieren. Playlists zuordnen.
5. Sichtbarkeit „nicht gelistet“ speichern. Stefan prüft das Video im Browser (Bild, Ton, Untertitel, Beschreibung). Erst mit Stefans Wort auf „öffentlich“ (Tor Veröffentlichen).
6. Angepinnten Kommentar setzen (METADATEN.md).

### 7. Shorts und Reels (je 30 Minuten für vier Shorts in einer Sprache)

1. Stimme je Short erzeugen (ein Lauf je Short).
2. Aufnahme 9:16: Browserfenster auf 608 × 1080 ziehen (Entwicklerwerkzeuge, Geräteemulation „Handy“, 390 × 844 bei 2,77-facher Skalierung) oder 16:9-Aufnahme in Clipchamp auf 9:16 zuschneiden mit Textfläche oben und unten.
3. Projekt aus „Vorlage 9:16“, Hook als Bildschirmtext ab Sekunde 0, eingebrannte Untertitel, Quellenzeile, Verweis.
4. YouTube: als Short hochladen (vertikal, bis 3 Minuten), „Related video“ auf das Langvideo setzen (braucht erweiterte Funktionen, siehe KANAL.md). Instagram: dieselbe Datei als Reel, Bildunterschrift mit Quellen und „Synthetische Stimme“, Link nur in der Bio.

## Was Claude übernimmt

Skripte, Metadaten, Shotlists, Sprechtext-Extrakt, Overlay-Texte als Liste je Video, Thumbnail- und Banner-SVGs, Untertitel-Korrektur als Textdatei (wenn Stefan die SRT ablegt), Kommentar-Entwürfe, Prüfprotokoll, Planung. Seit 30. Oktober 2026 außerdem: Vertonung über die Gemini-API (Schritt 2) und Bild und Schnitt automatisch (Schritt 3, `video-bauen.mjs`, Szenenpläne unter `SZENEN/`).

## Was nur Stefan macht

Freigabe der Skripte, Anhören der Stimme, Ansehen des fertigen Videos, Upload, das Wort „öffentlich“. Aufnahme und Schnitt von Hand nur, wenn er es so will (Ersatzweg). Kein Schritt davon braucht Programmieren oder ein Gespräch.
