Scutoria macht Informationssicherheit, Compliance und den Einsatz von KI für Betriebe ohne IT-Abteilung umsetzbar. Jedes Produkt ist belegt, datiert und vorzeigbar. Alles in diesem System folgt diesem Satz: ruhig, sachlich, überprüfbar.

Die Website und alle Produkte erscheinen auf Englisch, danach auf Deutsch. Dieses Markenbuch und die Regeln der Bauteile sind deutsch, weil wir so arbeiten; die Vorschauen zeigen englische Produkttexte, weil der Kunde sie so sieht. Der englische Claim lautet „Sourced. Dated. Ready to show.“, auf Deutsch „Belegt. Datiert. Vorzeigbar.“

## Stand 3. November 2026: Sapphire Cinema (E33)

Seit dem 3. November 2026 gilt die Gestaltungsrichtung „Sapphire Cinema“ (Entscheidung E33, Übergabepaket in `_berichte/2026-11-03-Sapphire-Cinema-Claude-Uebergabe/`, Umsetzung in `site/public/cinema.css`, Texte in `site/src/cinema.mjs`, Bericht `design/cinema-2026-11-03/BERICHT.md`). Was unten zum „Nachtarchiv“ der Runde 2 vom 20. Oktober 2026 steht, ist damit abgelöst; die Regeln zu Inhalt, Sprache, Markern, Schrift, Raster, Zuständen, Icons und Dokumenten gelten weiter.

- Farbe: tiefes Navy als Grund (`ground` #080f20, `surface` #111d34, `surface-raised` #172a49), Akzent `accent` #75a7ff, Knopf `button` #306cea, Kontur `border` #2d4264, Flächen `surface-studio`, `surface-sources`, `petrol-muted`, `indigo-muted`; der Marker Fakt läuft im Akzentblau. Papier bleibt das Licht für Dokumente, Muster und Handbuchseiten; auf der Startseite gibt es dazu eine große Bildbühne (Symbolbild `site/public/img/studio-stage-*.webp`, später eigene Bilder). Kein helles Band, kein Neon, keine Siegel.
- Kopfleiste 80 px (64 px unter 760 px) mit Entdecken, Bibliothek, Tools, Studio, Konto und Sprachwechsel; ohne Bewegungsschalter und ohne Vorschau-Chip (3. November 2026). Fußzeile vierspaltig, jedes Produkt einmal. Brotkrumen „Scutoria / …“ verlinken auf die Startseite. Inhaltsbreite `page-wide` 1240 px.
- Seitenfamilie: Startseite (Bühne mit Hero-Option 2 „KI verstehen. Wissen im Alltag nutzen.“, Themenwege, Studiomodul, Situationen mit Musterdokument, Regal, Methodik, Tools, Warteliste), Bibliothek als Katalog mit Themenleiste und Suche, Studio mit Postern und Programm, Produktseiten mit Bühne aus Cover und Blatt, Tool- und Memoseiten als Arbeitsfläche mit Auswahlliste, 404 mit drei Knöpfen.
- Vorschauen nach E35: nie alles zeigen; Handbuch als Leseprobe aus vier Kapiteln, Beispielbetrieb je eine Seite aus vier Dokumenten.
- Bewegung aus den Tokens `motion` (`dur-1` 180 ms bis `dur-4` 900 ms, `ease-feedback`, `ease-enter`): Eintritte einmal, Karten heben bei Hover und Fokus, nichts läuft in Schleife, nichts zählt hoch; reduzierte Bewegung zeigt Endzustände. Kontrast jedes Textpaars mindestens 4,5:1 (große Schrift 3:1); dekorative Zahlen liegen in CSS-`content`, nicht in Textknoten.
- Nur echter Bestand: zwei Toolkits, eines in Vorbereitung, zwei Handbücher, sechs Tools, das Videoprogramm. Keine Konzepttitel, keine Prozentzahlen, keine erfundenen Zahlen.

## Inhalt und Sprache

- Englisch zuerst, Deutsch danach, mit gleicher Gliederung und gleichen Abschnittsnummern. Nie ein Produkt nur auf Deutsch veröffentlichen.
- Die Marke spricht. „Scutoria“ und „wir“; nie ein Name, ein Foto oder eine Unterschrift. Das Impressum ist der einzige Ort, an dem ein Name steht.
- Der Leser wird mit „you“ beziehungsweise „Sie“ angesprochen, ruhig und direkt. Keine Ausrufezeichen, keine Emojis, keine Einschübe mit Gedankenstrichen, keine Versprechen („Sie sind dann compliant“). Sagen, was geregelt ist und was offen bleibt.
- Jede Zahl, jede Frist und jede Rechtsaussage trägt direkt darunter eine Quellenzeile: Herausgeber, Titel, Datum des Dokuments, Abrufdatum, Link. Gesetzt in `source` und `ink-muted`. Siehe Bauteil SourceLine.
- Was nicht belegbar ist, heißt „nicht ermittelbar“, mit Grund und Datum der letzten Prüfung, in einer UncertaintyBox. Nie schätzen, runden oder plausibel auffüllen.
- Jede Aussage trägt einen von vier Markern, im Text und in Legenden, jeder als Form plus Wort, nie Farbe allein:
  - Fakt, gefülltes Quadrat in `marker-fact`: steht so in der genannten Quelle.
  - Auslegung, Raute in `marker-interpretation`: unsere Einordnung, als solche gekennzeichnet.
  - Unsicher, halber Kreis in `marker-uncertain`: nicht abschließend geklärt; der Grund bleibt sichtbar.
  - Lücke, gestrichelter Kreis in `marker-gap`: fehlt; wird benannt, nicht gefüllt.
- Jedes Produkt endet mit „Quellen“ und „Offene Punkte“. Offene Punkte stehen auch auf der Nachweisseite, nie versteckt.
- Auf jeder Produktseite und jedem Tool-Ergebnis steht „Source-based. No legal advice.“ beziehungsweise „Quellenbasiert. Keine Rechtsberatung.“ Kein Tool stellt fest, ob eine Vorschrift für einen bestimmten Betrieb gilt.
- Durchgehend normale Groß- und Kleinschreibung. Versalien nur in `label` und `stamp`, mit deren Laufweite.
- Daten im Fließtext als 18 October 2026 beziehungsweise 18. Oktober 2026, in `stamp`-Zeilen als 2026-10-18. Preise und Zahlen mit Tabellenziffern.
- Produktlinien und ihre Farben: KI-Regeln (`line-policy`), Sicherheitsnachweis (`line-security`), KI-Einrichtung (`line-setup`), Grundlagen (`line-foundations`). Der Produkttyp heißt in beiden Sprachen „Toolkit“ (E17, 18. Oktober 2026): AI Policy Toolkit und KI-Richtlinien-Toolkit, Security Evidence Toolkit und Sicherheitsnachweis-Toolkit, AI Setup Toolkit und KI-Einrichtungs-Toolkit.

## Farbe

- Zwei Themen. Die Website läuft dunkel auf `ground`; Handbücher, Memos und Nachweisseiten laufen auf Papier. Auf der Website erscheint Papier als Blatt (`paper`, `paper-ink`) auf dem dunklen Grund: das einzige Licht im Raum, kein helles Band. Das Druck-Cover nutzt in beiden Themen `cover-ground`; das Website-Cover (Book) seine Linienfarbe.
- Text in `ink`, Nebentext in `ink-muted`, auf `ground`, `surface` oder `surface-raised`. Jedes Paar hält in beiden Themen mindestens 4,5:1; die Erklärungen zu den Farben nennen die Werte.
- `accent` ist der einzige Akzent: Links, Icons, gewählte Rahmen, die Scutum-Marke, der Fokusring. Nie einen Knopf mit `accent` unter weißem Text füllen; dafür `button` mit Text in `on-accent`.
- `signal-red`, `signal-amber` und `signal-green` sind Bedeutungsfarben, keine Akzente. Sie kommen nur in Ampel, Fehlern, Hinweisen, Erfolgsmeldungen und Status-Chips vor, immer mit Wort oder Symbol, mit Text in `on-signal` auf der Fläche. Als Text auf einer Fläche die `-text`-Varianten.
- Die vier Marker haben eigene Farben. `marker-interpretation` kommt sonst nirgends vor.
- Verläufe nur auf Covern: das Website-Cover läuft von `cover` nach `cover-deep`, beide aus der Linienfarbe und `ground` gemischt; das Druck-Cover von `cover-ground` nach `cover-ground-deep`. Kein Leuchten an Knöpfen, kein Glas, keine Lichtkegel, kein Neon: der Grund ist flach (entschieden 20. Oktober 2026, Runde 2).
- Linienfarbe als Kennung, sparsam: der Mono-Kicker „Toolkit 01“ beim Angebot, ein 3-px-Balken neben der Überschrift einer Mustergruppe, der Streifen oben auf einer Marker-Kachel in der Markerfarbe. Sonst keine farbigen Ränder an Karten.

## Schrift

- Manrope ist die eine Textschrift, selbst gehostet aus `fonts/`, variabel von 200 bis 800. IBM Plex Mono ist die Belegschrift, nur für `source` und `stamp`: Quellenzeilen, Daten, Versionszeilen, Dokumentnummern, Legenden. Auf der Website wird sie ebenfalls selbst gehostet (keine Anfragen an Google Fonts); nur die Vorschauen hier laden sie von Google Fonts.
- Website-Stufen: `display` für die H1, `title` für H2 und Kartentitel, `heading` für H3 und Formularfragen, `lead` unter der H1, `body` für Text und Optionen, `small` für Hinweise und Fußzeilen, `label` für Kicker und Pillen. Die Größen skalieren zwischen 390 und 1440 px Breite mit den clamp-Formeln in den Erklärungen; die Zeilenhöhen bleiben fest.
- Dokument-Stufen: `doc-title`, `doc-heading`, `doc-body` (etwa 11 pt im Druck), `doc-caption` für Kopf- und Fußzeile und Seitenzahlen.
- Absätze höchstens `measure` (62ch) breit, am Absatz gesetzt, nicht an der Karte. Überschriften ausgleichen (`text-wrap: balance`), Absätze mit `text-wrap: pretty`. Deutsche Überschriften dürfen trennen (`hyphens: auto`); lange Produktnamen in der H1 tragen ein weiches Trennzeichen an der Wortfuge.

## Abstände, Radien, Rahmen

- Das 4-px-Raster: `space-1` bis `space-24`, nichts dazwischen. Geschwister mit gap setzen. Karteninnenabstand `space-6` am Handy und `space-8` am Desktop; `space-8` zwischen Formularfragen; `space-16` bis `space-24` zwischen Seitenabschnitten.
- Radien: `radius-sm` für Chips, `radius-field` für Felder, Optionskarten und Kästen, `radius-card` für Karten und Cover, `radius-pill` für Knöpfe und Pillen.
- Rahmen tragen die Struktur: `hairline` für Trennlinien und Kartenränder, `border-control` für Felder, Optionskarten und Zweitknöpfe. Schatten nur auf dunklem Grund: `shadow-card` für Karten, `shadow-paper` für ein Papierblatt, `shadow-paper-lift` für ein verlinktes Blatt bei Hover und Fokus; auf Papier Rahmen statt Schatten. Ein Papierblatt hat 2 px Radius, es ist keine Karte.

## Zustände und Bewegung

- Jedes Bedienelement zeigt fünf Zustände: Ruhe, Hover (Fläche eine Stufe dunkler oder Rahmen eine Stufe heller; kein Versatz, kein Wachsen), Fokus (`focus`-Ring, 2 px, 3 px Abstand, auch an Optionskarten mit verstecktem Eingabefeld), Aktiv (noch eine Stufe dunkler), Gewählt (`accent`-Rahmen und `accent-tint`-Fläche), Deaktiviert (50 Prozent Deckkraft, Cursor not-allowed).
- Bewegung ist kurz und einmalig (Runde 2, 20. Oktober 2026): Das Hero-Blatt und das Cover setzen sich beim Laden einmal in 700 ms; die vier Markerformen zeichnen sich einmal, wenn ihre Reihe zu 30 Prozent sichtbar ist (500 ms); ein verlinktes Blatt hebt bei Hover und Fokus 8 px und vertieft seinen Schatten (200 ms); das Cover dreht bei Hover sieben Grad weiter (500 ms, nur mit Maus). Leise dazu: der Claim erscheint in drei Schlägen, Blöcke kommen beim Scrollen aus 20 px Weg und leichter Unschärfe (Handy: 10 px, keine Unschärfe), gestaffelt um höchstens 40 ms; die Linie zwischen den drei Schritten füllt sich beim Scrollen; die Ampeln einer Vorschau atmen. Nichts blinkt, nichts zählt hoch, nichts springt. Bei reduzierter Bewegung steht alles sofort im Endzustand. Übergänge an Knöpfen nur bei Farbe und Rahmen, 150 ms.

## Seitenaufbau

- Die feste Leiste ist `bar` hoch; oben auf der Seite ist sie durchsichtig, nach 8 px Scroll trägt sie `ground` zu 92 Prozent und eine `hairline` darunter, ohne Weichzeichner. Der Vorschau-Chip ist eine kleine Mono-Umrandung, nie eine gelbe Pille.
- Abschnitte trennt Raum, 96 px am Handy und 160 px am Desktop, keine Haarlinie unter jedem Block. Der Hero ist ein Raster aus zwölf Spalten: Text in den ersten sechs, die Bühne mit Cover und Blatt in den letzten fünf; am Handy erst der Text, dann die Bühne. Das Schild darf einmal als Wasserzeichen unter 5 Prozent hinter dem Hero stehen.
- Textseiten sind `page-narrow` breit; Shop-, Tool- und Generatorseiten `page-wide`, Absätze darin auf `measure` begrenzt.
- Auf dem ersten Bildschirm jeder Seite steht etwas Lesbares: Kicker, H1, ein Satz. Kein Abschnitt ist eine Bildschirmhöhe hoch.
- Am Handy steht alles in einer Spalte: Karten, Optionen, Knöpfe in voller Breite. Knöpfe in nebeneinanderliegenden Karten stehen auf einer Grundlinie (Flex-Spalte, Knopf mit margin-top auto).

## Icons und Marke

- Die Scutum-Marke ist das einzige Logo: `assets/Logos/scutum-mark.svg` auf Dunkel, `assets/Logos/scutum-mark-ink.svg` auf Papier; `favicon.svg` ist die Kachel. Das Wortzeichen SCUTORIA wird als Text in Manrope 700 gesetzt, Versalien, Laufweite 0,18em; es gibt keine Bilddatei des Wortzeichens.
- Oberflächen-Icons sind Strich-Icons: 1,8 px, runde Enden und Ecken, 24-px-Raster, in `accent` oder `ink`. Keine gefüllten Icon-Sets, keine Emojis, keine Illustrationen, die nichts sagen.
- Marker werden vom Bauteil Marker als Formen gezeichnet, nie als Emoji.

## Produkte

- Cover auf der Website: Book, ein Hardcover in CSS mit Rücken, Buchblock und Deckel, in der Linienfarbe (`book--colour`, entschieden 20. Oktober 2026; `book--dark` bleibt als Variante). Der Deckel folgt dem Aufbau des Druck-Covers: Marke und Linie oben, „Toolkit · 01“, Titel, Nummer als Kontur, der Claim als Balken, die Formate. Im Hero steht es hinter dem Blatt, im Angebot neben dem Text. Violett bleibt dem Auslegungs-Marker vorbehalten; die Sicherheitslinie ist Türkis.
- Cover im Druck: ProductCover. Ein Streifen von 5 Prozent Breite in der Linienfarbe am linken Rand, Marke und SCUTORIA oben links, der Linienname oben rechts, der Titelblock im oberen Drittel, die Nummer als Kontur unten rechts, ein Serienbalken, danach nur die Formatzeile. Kein Autor, kein Datum, kein Geltungsraum auf einem Cover.
- Papier: Paper, das weiße Blatt auf dem dunklen Grund, überall dort, wo ein Dokument versprochen wird. Im Hero in A4-Proportion, 2 Grad gedreht, mit der Kante eines zweiten Blatts dahinter, Laufzeile in Mono, Titel, Linie, echten Zeilen des Beispielbetriebs, Unterschriftslinie und der Fußzeile „Source-based. No legal advice.“; die vier Marker als Index-Reiter am rechten Rand. Als verlinktes Muster klein mit echtem Titel; auf der Produktseite als Miniatur je Dokumentart (Paragrafen, Aushang, Tabelle, Liste, Checkliste, datierte Zeilen, Statuszeilen, Formular, Brief, Karte, Handbuch-Stapel). Nur echte Zeilen, nie entworfene; der Körper eines Blatts ist für Hilfstechnik ausgeblendet, Titel und Satz sind echter Text.
- Marker auf der Website: groß als Kacheln (dunkle Fläche, 3-px-Streifen oben in der Markerfarbe, gestrichelt für Lücke, Form und Name in der Markerfarbe, die Bedeutung darunter) über dem Text, der sie erklärt; auf dem Hero-Blatt als farbige Reiter.
- Handbuch- und Memoseiten: DocumentPage. Kopfzeile mit Produkt und Version, Abschnittstitel, eine Aussage je Absatz mit ihrem Marker, darunter die Quellenzeile, Unsicherheitsboxen gestrichelt, Fußzeile mit Seitenzahlen. Immer auf Papier.
- Nachweisseite: EvidencePage. Datiert, mit Dokumentnummer, was geregelt und was offen ist als Status-Chips, eine Unterschriftszeile. Die Seite, die ein Betrieb auf den Tisch legt.
- Generatorschritte: Field und OptionCard in einer Card, eine Frage je Schritt, „Question 3 of 20“ als `label`, Knopfreihe rechtsbündig am Desktop und gestapelt am Handy.
