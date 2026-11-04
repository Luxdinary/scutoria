# Design Runde 2: zwei Briefs, eine Richtung

Stand 20.10.2026. Entscheidung für dich, Empfehlung am Ende. Die beiden Briefs liegen im Wortlaut unter `design/briefs/`.

## Lage

Du hast am 20.10.2026 zwei Briefs geschickt, die sich im Kern ausschließen.

| Punkt | Brief 1 (Gemini: Dynamik) | Brief 2 (Nachtarchiv) |
| --- | --- | --- |
| Blickfang | Scanner-Strahl über dem Dokument, Maus-Spotlight auf jeder Karte, Bento-Raster, atmende Ampeln, Zeitachse mit Federung, Slogan Wort für Wort | Ein großes, echtes Papierblatt, 2 Grad schräg, als einziges Licht im dunklen Raum; die vier Marker groß als Blickfang |
| Oberfläche | Glas, Glühen, Lichtkegel (wie Runde 1) | Kein Glas, kein Neon, kein Verlauf; Ruhe, Maßstab, Papier |
| Bewegung | Dauerhaft (Scanner 4 Sekunden endlos, Pulsieren, Spotlight) | Drei kurze Bewegungen, einmalig; alles andere 150 bis 200 ms |
| Technik | framer-motion, lucide-react, Tailwind | Reines CSS, keine Bibliothek |
| Umfang | Effekte auf das Bestehende setzen | Jede Sektion neu inszeniert: Hero, Preis, Ablauf, Marker, Muster, Tools, „In Vorbereitung“, Formular, Vorschau-Chip |

Zwei Sachfragen unabhängig vom Geschmack:

- framer-motion und lucide-react sind React-Bibliotheken. Die Seite hat kein React (Express, Server-HTML, CSP ohne Fremdskripte). Sie einzubauen wäre ein Umbau des Frontends. Dieselben Effekte gehen mit CSS und einem lokalen Skript von etwa 5 KB; die Icons gibt es als SVG-Dateien.
- Der Marker „RECHTSKONFORM“ aus Brief 1 verstößt gegen die Markenregel (keine Konformitäts- oder Sicherheitsaussagen). Er müsste ohnehin durch echte Marker ersetzt werden: Fakt, Quelle, Datiert.

## Optionen

**A: Nachtarchiv mit leiser Dynamik (Empfehlung).**
Brief 2 als Grundlage: Papier-Baustein, großes Blatt im Hero, Marker als Blickfang, Ablauf als ein Band mit verbindender Linie, Tools mit echten Vorschauen, Muster als Papier-Miniaturen, „In Vorbereitung“ abgelegt, Vorschau-Chip leise, ein helles Band je Seite. Dazu aus Brief 1 nur, was leise bleibt: die Linie zwischen den drei Schritten füllt sich beim Scrollen (CSS, ohne Federung), die Ampeln in der Tool-Vorschau atmen sanft, der Slogan erscheint beim Laden in drei Schlägen, Sektionen blenden gestaffelt ein. Kein Scanner, kein Spotlight, kein Glas, kein React.
Reihenfolge wie in Brief 2: erst die Startseite, Screenshots 1440 und 390 in beiden Sprachen, Stopp; dann Produktseite; dann Freie Tools.

**B: Brief 1 pur auf Runde 1.**
Scanner, Spotlight, Bento, atmende Ampeln, Zeitachse, Slogan-Stagger; mit lokalem Skript statt framer-motion und SVG-Icons statt lucide-react. Ergebnis: eine aktuelle SaaS-Vorlage. Das Papier bleibt klein, das Produkt bleibt Dekoration.

**C: Brief 2 streng.**
Genau drei Bewegungen, sonst nichts. Am ruhigsten, am wenigsten „lebendig“.

## Empfehlung

A. Das Produkt ist Papier; Brief 2 stellt es in die Mitte, Brief 1 schmückt drumherum. Dein Wunsch „nicht statisch“ wird durch die vier leisen Bewegungen plus Hover-Lift erfüllt, ohne dass die Seite ein Dashboard wird. A ist außerdem leichter (keine Bibliothek, schnellere Seiten) und altert langsamer.

Unter A fallen weg: Glaskarten, Lichtkegel und Glühen aus Runde 1. Bleiben: Midnight-Grund, Hover-Lift, Akkordeon, Preis-Fakten, alle Texte, beide Sprachen.

## Skills und Werkzeuge

- frontend-design (Anthropic) ist im Katalog, nicht aktiviert. Nutzen: zwingt zu einem Layoutplan vor dem Bauen. Ich rufe ihn für die Startseite auf, wenn du ihn aktivierst; dein Brief steht über dem Skill.
- Das Plugin „Design“ (Anthropic) ist aktiviert; design-critique und accessibility-review nutze ich für die Prüfung.
- webapp-testing und impeccable sind hier nicht im Katalog. Screenshots in 1440 und 390, Netzwerkprüfung (keine fremden Anfragen), reduzierte Bewegung und Tastaturpfad mache ich mit den vorhandenen Playwright-Skripten.
- Die Markendatei `.claude/skills/scutoria-brand/SKILL.md` lege ich nach deiner Entscheidung an, damit ihre Regeln zur gewählten Richtung passen.
