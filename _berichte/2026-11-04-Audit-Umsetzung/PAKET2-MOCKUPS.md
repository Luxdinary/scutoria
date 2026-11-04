# Paket 2: Mockups vor der Umsetzung (F05 bis F08)

Stand 4.11.2026. Die Mockups entstanden aus dem echten Seiteninhalt: die Startseite und die Studio-Seite wurden aus dem Quellstand vom 4.11. (mit den neuen Videozählern aus F02) als Dateien gerendert und mit einem Überlagerungs-Stylesheet (`mockups/mockup.css`) und drei Markup-Eingriffen (Demo, kompaktes Studio, Dokumentausschnitt auf den Produktkarten) umgebaut. Auf der Website und bei Lovable ist nichts geändert. Alle Bilder liegen in `mockups/`.

## 1. Bilder

| Datei | Was | Breite |
|---|---|---|
| `ist-de-1440-oben.png`, `ist-de-1440-ganz.png` | Startseite heute (Quellstand 4.11.), Anfang und ganze Seite | 1440 px |
| `neu-de-1440-oben.png`, `neu-de-1440-ganz.png` | Vorschlag, Anfang und ganze Seite | 1440 px |
| `neu-en-1440-oben.png` | Vorschlag Englisch, Anfang | 1440 px |
| `ist-de-1240-1440-oben.png` | nur die Inhaltsbreite auf 1240 px gestellt, sonst heute | 1440 px |
| `neu-de-1160-1440-oben.png` | Vorschlag mit der heutigen Breite 1160 px | 1440 px |
| `studio-ist-de-1440-oben.png`, `studio-neu-de-1440-oben.png`, `studio-neu-de-1440-ganz.png` | Studio-Seite heute und mit Poster-Szenen | 1440 px |
| `ist-de-390-oben.jpg` | Startseite heute, Handy | 390 px |
| `neu-de-390-oben.jpg`, `neu-de-390-demo.jpg`, `neu-de-390-papier.jpg`, `neu-de-390-regal.jpg`, `neu-de-390-studio.jpg` | Vorschlag, Handy: Hero, Demo, Nachweisseite in der Demo, Regal, Studio kompakt | 390 px |

Desktop-Bilder mit Chrome ohne Fenster bei reduzierter Bewegung (Endzustände), Handy-Bilder mit der Geräteemulation des Browser-Bereichs (Werte in CSS-Pixeln, Bilddatei doppelt so groß).

## 2. Was sich ändert, je mit Befund

1. Inhaltsbreite (F06). Heute begrenzt `.wrap` den Rahmen auf 1240 px, der Inhalt ist nach Abzug der Ränder 1160 px breit. Vorschlag: Rahmen 1240 px plus Ränder, Inhalt 1240 px wie in der gewählten Vorlage. Vergleich: `ist-de-1240-1440-oben.png` gegen `ist-de-1440-oben.png` (nur Breite) und `neu-de-1160-1440-oben.png` gegen `neu-de-1440-oben.png` (alles neu, Breite verschieden). Der Unterschied ist klein; die Vorlage spricht für 1240.
2. H1 ohne festen Umbruch (F06). Heute fällt „KI verstehen. Wissen im Alltag nutzen.“ bei 1440 px in drei Zeilen (66 px). Vorschlag: Schriftgröße clamp bis 60 px, Breite 21 Zeichen, `text-wrap: balance`: zwei ausgewogene Zeilen in beiden Sprachen, kein `<br>`, auf dem Handy 36 px statt 45 px.
3. Knöpfe (F06). Heute Pille (999 px). Vorschlag: Token `radius-btn` 8 px für Aktionsknöpfe; Status- und Kategorie-Pillen bleiben rund. Alternative 6 px.
4. Hero auf dem Handy (F06). Heute 800 px hoch bei 390 px Breite, bevor der erste Inhalt kommt (gemessen am Quellstand). Vorschlag: Innenabstand 22/20 px statt 29/24 px, H1 36 px, Lead 15 px, Bild 220 px statt 270 px: 673 px. Text bleibt über dem Bild, volle Textbreite, Bild bleibt.
5. Dokumenten-Demo (Erlebnisgestaltung des Berichts, neu). Drei Schritte: Frage B3 „Werden Tools auf privaten Telefonen oder über private Konten dienstlich benutzt?“ mit der Antwort „Wissen wir nicht“, die Entscheidung (eigene Zeile im Tool-Register, offener Punkt mit Datum auf der Nachweisseite, Regel aus Frage B4) und die Nachweisseite mit der offenen Zeile „Tool-Register · offen · 3 Tools erfasst · 1 unklar · private Konten: nicht bekannt, zu klären bis [Datum] · Zuständig: Inhaber oder Geschäftsführung“. Alle Texte stammen aus `questions.json`, `register.mjs`, `evidence.mjs` und den Leseproben; die Zahlen „3 Tools, 1 unklar“ sind Beispielwerte des Mockups, im Produkt kommen sie aus den Antworten. In der Umsetzung: drei Reiter, Wechsel nach Klick in 320 ms (dur-2), ohne Skript alle drei Spalten sichtbar wie im Mockup, Endzustand ohne Bewegung lesbar, Fokus bleibt auf dem Reiter.
6. Reihenfolge der Startseite (Empfehlung des Berichts). Hero, drei Wege, Demo, verfügbare Toolkits, Studio kompakt, Methode mit Markern und Leseproben, Beispielbetrieb (Werkbank aus E29), Tools, nächster Schritt, Benachrichtigung. Im Mockup entfällt der Abschnitt „So funktioniert es“ (drei Schritte mit Bildern), weil die Demo denselben Ablauf zeigt; er kann alternativ nach der Demo bleiben.
7. Studio kompakt mit Poster-Szene (F02, F05). Halbe Höhe, Zähler aus `studio.json`, Poster mit einer Szene aus dem Tool-Register statt der großen Ziffer. Auf der Studio-Seite bekommt jedes Poster eine Szene je Linie: Tool-Register mit markierter offener Zeile (KI-Regeln), Selbstauskunft mit den Zählern der Bereiche (Sicherheit), datierte Nachweisseite mit Status und Unterschriftszeile (Grundlagen). Begriffe und Zahlen stammen aus den Dokumenten und Leseproben; keine erfundenen Oberflächen, Kunden, Prüfzeichen oder Erfolgszahlen. Wiedererkennbare Familie, drei Motive.
8. Produktkarten (F05). Cover plus ein Blatt mit vier echten Zeilen aus der Leseprobe des Dokuments D1 (Titel, Betrieb und Geltungsbeginn, erste Überschrift, markierte Zeile). Die Karte des Toolkits in Vorbereitung bleibt ohne Blatt.
9. Bewegung (F07). Hero-Bild 560 ms statt 900 ms (dur-3 statt dur-4), Hero-Text 560 ms gestaffelt wie heute, Themenwahl 180 ms (dur-1), Demo 320 ms (dur-2), Hover 3 bis 4 px statt 6 bis 8 px, Knöpfe 1 px. Reduzierte Bewegung zeigt Endzustände (vorhanden); der vollständige Laufzeittest mit umgestellter Systemeinstellung gehört zur Umsetzung.
10. Gestaltungsquellen (F08). Die Startseite lädt fünf Stylesheets und vier Skripte. Gemessen am 4.11.2026 gegen scutoria.com mit gzip: HTML 9,8 kB, Stylesheets zusammen 31,7 kB (tokens 1,8, bundle 6,9, site 10,4, motion 5,5, cinema 7,2), Skripte 7,4 kB, Hero-Bild 118 kB (1600 px) beziehungsweise 74 kB (1200 px) und 49 kB (Handy), zwei Schriftdateien 40 kB. Unkomprimiert 145 kB CSS. Die statischen Dateien kommen ohne `Cache-Control`, jede Seite lädt sie neu. Vorschlag für die Umsetzung: Scrims, Bühnenschatten, Papier- und Lampenfarben als Token in `design/project/tokens.json`; Inventur der Regeln je Stylesheet mit Nutzungsprüfung (Selektoren gegen das gerenderte HTML aller Seiten), erst dann Zusammenführung, keine Löschung; Cache-Header für `/tokens.css` bis `/cinema.css`, Bilder und Schriften (bei Lovable prüfen). Core Web Vitals: nicht ermittelbar ohne Feldmessung; eine Labormessung mit Lighthouse gehört zur Umsetzung, vorher und nachher.

## 3. Geprüft im Mockup

- Keine horizontale Scrollbreite bei 360, 390 und 768 px (scrollWidth gleich Breite). Die Blätter des Leseproben-Karussells ragen nur in ihrem eigenen Scroller über den Rand, wie heute.
- Hero-Höhe bei 390 px: 800 px heute, 673 px im Vorschlag.
- H1 bei 1440 px: drei Zeilen heute, zwei im Vorschlag, Deutsch und Englisch.
- Nicht geprüft (Umsetzung): Tastaturfokus und Reihenfolge der Demo, Screenreader-Ausgabe des Reiterwechsels, Kontraste der neuen Flächen mit axe, Lighthouse.

## 4. Entscheidungen

| Nr. | Frage | Optionen | Empfehlung |
|---|---|---|---|
| P1 | Inhaltsbreite | A 1240 px wie die Vorlage; B 1160 px bleibt | A |
| P2 | Aktionsknöpfe | A 8 px; B 6 px; C Pille bleibt | A |
| P3 | Reihenfolge | A wie Mockup, „So funktioniert es“ entfällt; B wie Mockup, der Abschnitt bleibt nach der Demo | A |
| P4 | Dokumenten-Demo | A wie Mockup (drei Reiter, Frage B3); B keine Demo, nur neue Reihenfolge | A |
| P5 | Studio kompakt und Poster-Szenen | A wie Mockup; B Studio wie heute, nur Szenen auf der Studio-Seite; C alles wie heute | A |
| P6 | Produktkarten mit Blatt | A wie Mockup; B nur Cover | A |
| P7 | Umsetzung | nach deinem Wort: Quellstand `site/` ändern, lokal prüfen (Vorher/Nachher-Bilder, 360/390/768/1440, Interaktionen, Fokus, reduzierte Bewegung, Lighthouse), dann eine Lovable-Runde zusammen mit F02 und F04-1 (Schätzung 6 bis 12 Credits, weil CSS und Markup an sechs Stellen plus Tests), Veröffentlichung nur auf dein Wort | |

Was du nicht entscheiden musst: Scrims und Schatten als Token, Hover-Werte, Bewegungsdauern innerhalb der Spannen des Berichts; das setzt Claude um und weist es im Abschlussbericht aus.
