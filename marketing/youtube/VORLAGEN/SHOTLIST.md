# Vorlage · Shotlist für Bildschirmaufnahmen

Stand 29. Oktober 2026. Die Shotlist sagt, was aufgenommen wird, bevor die Stimme läuft. Jede Zeile ist eine Aufnahme von einigen Sekunden bis zwei Minuten; geschnitten wird nach dem Sprechtext. Es gibt keine Kamera, kein Gesicht, keinen Namen: nur den Bildschirm.

## Aufnahmeumgebung (einmal einrichten, siehe PRODUKTION.md)

- Browser: Microsoft Edge oder Chrome im Vollbild (F11), Lesezeichenleiste aus, keine Erweiterungen sichtbar, Zoom 125 Prozent, Fenster 1920 × 1080. Dunkles Thema des Betriebssystems, damit Übergänge nicht blenden.
- Website: die Live-Seite scutoria.com, oder davor der lokale Server im Modus „live“ (ohne Vorschau-Chip). Nie eine Adresse mit „onrender“ oder „lovable“ im Bild. Nie ein Konto mit echter E-Mail im Bild; das Konto des Beispielbetriebs heißt in der Aufnahme nur „Example Electrical Ltd“.
- Dokumente: die Muster-PDFs aus `produkte/*/muster/` im Browser-PDF-Viewer oder in Edge, Seitenansicht „Einzelseite“, Werkzeugleiste ausgeblendet. Für Tabellen (XLSX) der Excel-Lesemodus ohne Menüband.
- Mauszeiger: langsam, gerade, nie kreisen. Scrollen in gleichmäßigen Schritten (Mausrad drei Stufen, Pause, drei Stufen).
- Ton: aus. Die Stimme kommt später aus der Gemini-Datei.
- Jede Aufnahme beginnt mit zwei Sekunden Ruhe und endet mit zwei Sekunden Ruhe.

## Format der Shotlist

| Nr. | Dauer | Was zu sehen ist | Handlung | Bildschirmtext (Overlay) | Für Abschnitt |
|---|---|---|---|---|---|
| 1 | 0:08 | Startseite EN, oberer Rand | Seite laden, Claim erscheint in drei Schlägen, zwei Sekunden halten | keiner | 1 Hook |
| 2 | 0:20 | Startseite, Abschnitt „How it works“ | langsam scrollen über die drei Schritte | „34 questions · 7 documents“ | 3 Lösung |
| 3 | 0:30 | Muster D1, Seite 1 | PDF öffnen, Kopf mit Geltungsbeginn halten, auf § 1 scrollen | „Example Electrical Ltd · fictional“ | 5 Beispielbetrieb |

## Standardaufnahmen, die jedes Video braucht (einmal aufnehmen, oft verwenden)

| Code | Dauer | Inhalt |
|---|---|---|
| A1 | 0:10 | Startseite EN laden, Claim in drei Schlägen, Hero-Blatt setzt sich (700 ms) |
| A2 | 0:10 | Startseite DE laden, dasselbe |
| A3 | 0:20 | Die vier Marker-Kacheln, Formen zeichnen sich beim Scrollen |
| A4 | 0:15 | Fußzeile mit „Source-based. No legal advice.“ beziehungsweise „Quellenbasiert. Keine Rechtsberatung.“ |
| A5 | 0:20 | Produktseite Toolkit 01, „What you get“, langsam über D1 bis HB scrollen |
| A6 | 0:20 | Produktseite Toolkit 02, dasselbe |
| A7 | 0:15 | Preisblock Toolkit 01 (Betrag, Gründerzeile, Lizenzfakten), ohne zu klicken |
| A8 | 0:15 | Preisblock Toolkit 02 |
| A9 | 0:30 | Generator Toolkit 01, Frage 1 bis 4 mit vorbelegtem Beispielbetrieb, „Question 3 of 34“ sichtbar |
| A10 | 0:30 | Generator Toolkit 02, eine Statusfrage mit den vier Antworten |
| A11 | 0:20 | Handbuch online, Abschnitt 0, eine Aussage mit Marker und Quellenzeile, zoomen auf die Quellenzeile |
| A12 | 0:20 | Memo-Übersicht `/memos` mit den vier Karten |
| A13 | 0:30 | Tool „May this go in?“: vier Fragen ankreuzen, Ampel springt |
| A14 | 0:30 | Tool „Is there anything personal in it?“: erfundenen Text einfügen, Markierungen, Platzhalter |
| A15 | 0:20 | Muster D7 Nachweisseite Toolkit 01, Statuszeilen |
| A16 | 0:20 | Muster D3 Notfallkarte Toolkit 02 |
| A17 | 0:20 | Muster D1 Selbstauskunft, Übersichtstabelle |
| A18 | 0:10 | Endscreen-Hintergrund: dunkler Grund, Scutum-Marke klein, Platz für zwei Elemente |

Die Codes A1 bis A18 dürfen in den Shotlists der Skripte als Kurzform stehen („[SCREEN: A9]“).

## Bildschirmtext (Overlays)

- Schrift Manrope, Gewicht 700 für Titelzeilen, 400 für Sätze; Quellenzeilen in IBM Plex Mono 400, Größe wie `source` (etwa 13 px auf 1080p entsprechend 26 px).
- Farben aus `design/project/tokens.json`: Text `#e9eef8`, Nebentext `#a1adc4`, Akzent `#4f8cff`, Linienfarbe Blau `#4f8cff` (Toolkit 01) oder Türkis `#2ec4b6` (Toolkit 02), Markerfarben Fakt `#4f8cff`, Auslegung `#b07cff`, Unsicher `#ffd166`, Lücke `#ff6b6b`.
- Ein Overlay je Gedanke, höchstens zwei Zeilen, unten links; die Quellenzeile unten über die ganze Breite auf einem Band aus `#121b2f` mit 92 Prozent Deckkraft.
- Marker immer als Form plus Wort: Quadrat Fact, Raute Interpretation, halber Kreis Uncertain, gestrichelter Kreis Gap. Nie Farbe allein.
- Kein Ausrufezeichen, kein Emoji, keine Pfeile als Dekoration.

## Was nie ins Bild kommt

Ein Gesicht, ein Name (auch nicht im Browserprofil oben rechts), eine echte E-Mail-Adresse, eine Lovable- oder Render-Adresse, ein Vorschau-Chip, ein Konto mit echten Daten, Benachrichtigungen des Betriebssystems, der Desktop. Vor jeder Aufnahme: Benachrichtigungen aus (Windows: Nicht stören), Browserprofil ohne Namen, Downloads-Leiste geschlossen.
