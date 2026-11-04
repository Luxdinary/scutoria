# Befunde: PDFs, wie Lovable sie an Kunden ausliefert

Stand 23.10.2026. Geprüft: alle 26 PDFs beider Toolkits (EN, DE), erzeugt mit Lovables Renderer (pdf-lib, Stand Commit a3666f4) lokal nachgebaut, Ordner `4-lovable-pdf-ausgabe`. Vergleich mit der bisherigen Chromium-Fassung in `1-…` und `2-…`. Erzeugung je PDF 0,05 bis 0,4 s.

## Zusammenfassung

- 1 Befund der Stufe A (Text überlagert sich in Tabellen), 2 der Stufe C.
- Seitenzahlen weichen ab, weil der Satz dichter ist: Richtlinie 3 → 2, Maßnahmenplan 4 → 3, Nachweisliste 5 → 4, Klausel-Prüfliste DE 4 → 6, EN 4 → 5. Die Notfallkarte bleibt in EN und DE auf genau einer Seite.
- Gut: Kopf- und Fußzeile mit „Seite n von m“, Freigabeformular mit Ankreuzfeldern, gelbe Felder zum Ausfüllen, Marker als Formen, Schriften eingebettet.

## L1, Stufe A: Lange Wörter laufen in Tabellen in die Nachbarspalte

- Ort: `muster-elektrotechnik-e-u-clause-checklist-de.pdf` Seite 1 bis 6 (z. B. „Durchführungsverordnung“ in der Spalte „Herkunft“ überlagert den Text der Spalte „Was sie bedeutet“; „Auftragsverarbeitungsvertrag“ in „Klausel“); `muster-elektrotechnik-e-u-action-plan-de.pdf` Seite 1 („Administrationskonsole“). Automatisch erkannt: 7 Überlagerungen; in EN keine gefunden, weil die Wörter kürzer sind.
- Ursache: Der Renderer bricht Zeilen nur an Leerzeichen um. Ein Wort, das breiter ist als die Zelle, wird über den Zellrand hinaus gezeichnet. Die Chromium-Fassung bricht solche Wörter (`overflow-wrap: anywhere` im Druck-CSS, `.pg__table--fixed`).
- Korrektur (an Lovable): In Tabellenzellen und allen schmalen Spalten Wörter, die nicht in die Zellbreite passen, zeichengenau umbrechen, im Deutschen möglichst an Silbengrenzen mit Trennstrich (Hyphenation), sonst hart; Spaltenbreiten wie im Druck-CSS der festen Tabellen; danach alle Tabellen beider Toolkits in EN und DE neu rendern und automatisch auf überlappende Textzeilen prüfen.

## L4, Stufe A: Die Schrift Manrope setzt „(c)“ als „©“

- Ort: alle PDFs beider Fassungen (Chromium und Lovable), z. B. `example-electrical-ltd-clause-checklist-en.pdf` Seite 1: „point 5.1.4(c)“ erscheint als „5.1.4©“. Gefunden vom Prüf-Agenten A4, von mir in beiden Fassungen vergrößert bestätigt. Im Textlayer steht weiter „(c)“, nur das gezeichnete Zeichen ist falsch; Suchen und Kopieren gehen also, das Auge sieht ein Copyright-Zeichen. Wahrscheinlich auch auf den Webseiten (Handbuch online), weil dort dieselbe Schrift mit Standard-Ligaturen läuft.
- Ursache: Manrope hat eine Standard-Ligatur „(c)“ → „©“; Browser und der PDF-Renderer wenden Standard-Ligaturen an.
- Korrektur: auf der Website `font-variant-ligatures: no-common-ligatures` für Fließtext (oder `font-feature-settings: "liga" 0`), im PDF-Renderer die Ligaturen beim Einbetten abschalten (pdf-lib `embedFont(..., { features: { liga: false } })`), danach EN- und DE-Handbuch online und alle PDFs auf „©“ an Stellen mit „(c)“ prüfen.

## L2, Stufe C: Notfallkarte nutzt die Seite nicht aus

- Ort: `*-emergency-card-*.pdf`. Die Karte hängt an der Wand; die Beschriftungen links (Verantwortlich, IT-Dienstleister, Hotline …) stehen in 9 pt grau, darunter bleibt rund ein Fünftel der Seite leer.
- Korrektur: Schrift der Karte so weit vergrößern, dass sie die Seite füllt, aber eine Seite bleibt (Beschriftungen mindestens 10 pt in Tintenfarbe, Telefonnummern fett); die bestehende Schrumpf-Regel für lange Antworten behalten.

## L3, Stufe C: Kopfzeile anders gesetzt als die Druckfassung

- Ort: alle PDFs, Kopfzeile. Chromium: Versalien mit Sperrung („MUSTER ELEKTROTECHNIK E.U. · KI-NUTZUNGSRICHTLINIE“); Lovable: normale Schreibung, kleiner.
- Korrektur: Kopfzeile in Versalien mit 0,08 em Sperrung, wie die Druckfassung; kein Text ändert sich.
