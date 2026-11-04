# Bau-Brief: drei Scutoria-Varianten als Artefakte (2.11.2026)

Stefan hat entschieden: Seitenfamilie je Variante (Start, Bibliothek, Produkt, Tools, Studio), echter Bestand plus Konzepttitel mit Kennzeichnung, Licht und Material erlaubt aber kein Neon, KI-Symbolbilder der ChatGPT-Studie als Platzhalter. Er bewertet die Varianten gegen die ChatGPT-Prototypen (vorlage-01 bis 05) und gibt eine frei. Das aktuelle Scutoria-Design hat er mit 3 von 5 benotet: zu viele gleich aussehende Textflächen, Produkte wenig greifbar. Die Varianten müssen deutlich hochwertiger und greifbarer wirken, ohne Markenregeln zu verletzen.

## Ablage

- Ordner: `C:\Users\Stefa\AppData\Local\Temp\claude\C--Users-Stefa-OneDrive-scutoria\2bd5f3e6-fc88-4cc8-85f2-34265e43c491\scratchpad\varianten\`
- Datensatz: `sc-data.js` im selben Ordner. Den Inhalt (`window.SC = {...}`) wörtlich in ein `<script>` am Ende der HTML-Datei kopieren (nicht per src laden). Alle Texte kommen aus `SC`; eigene Texte nur, wo der Datensatz nichts hergibt, und dann in beiden Sprachen, kurz, Sie-Form, keine Ausrufezeichen, keine Emojis, kein Gedankenstrich als Einschub.
- Bilder: `assets/01-sapphire-vault.webp`, `02-knowledge-pavilion.webp`, `03-business-atlas.webp`, `04-signal-studio.webp`, `05-blue-edition.webp` (1536×1024 Querformat, KI-Symbolbilder). Im HTML relativ als `assets/<name>.webp` referenzieren; sie werden beim Veröffentlichen mitgegeben. Keine anderen externen Bilder, keine data-URIs über 20 KB.
- Ergebnis: genau eine Datei `variante-a.html`, `variante-b.html` oder `variante-c.html` (je nach Auftrag), höchstens 450 KB.

## Artefakt-Regeln (Claude.ai-Seitenvertrag)

- Kein `<!doctype>`, `<html>`, `<head>`, `<body>`. Die Datei beginnt mit `<title>` (zwei bis vier Wörter, z. B. `Scutoria Variante Saphir`), dann `<meta name="claude:viewport-fit-sides" content="cover">`, dann `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap">`, dann `<style>`, dann der Inhalt, dann die Skripte.
- Keine Bibliotheken, keine externen Skripte, keine iframes, kein `alert`/`confirm`/`prompt`, kein `window.print`, keine `<a download>`. Dialoge als `<dialog>` mit Escape und Fokusrückgabe.
- Einthemig: Variante A und C dunkel (`:root{color-scheme:dark}`), B hell (`color-scheme:light`). Alle Farben als Tokens auf `:root`; `body` mit explizitem `background` und `color`. Keine Medienabfrage für das Thema.
- Seitenrand: `padding-left:max(16px,env(safe-area-inset-left,0px))`, `padding-right:max(16px,env(safe-area-inset-right,0px))` am äußeren Wrapper, senkrecht mit `padding-block`. Bei 400 px Breite kein waagrechtes Scrollen der Seite; Flex- und Grid-Kinder mit Text bekommen `min-width:0`; Bilder `max-width:100%`. Waagrechtes Scrollen nur in bewusst erkennbaren Sammlungen (Shorts-Reihe, Karussell) mit `overflow-x:auto` und sichtbarem Hinweis.
- Seitenwechsel über den Hash, nur einfache Token: `#de-start`, `#de-bibliothek`, `#de-produkt`, `#de-tools`, `#de-studio` und `#en-start`, `#en-library`, `#en-product`, `#en-tools`, `#en-studio`. Ohne Hash: `#de-start`. Beim Wechsel rendert ein `<main>` neu, scrollt nach oben, setzt `document.title` und `lang` am Wrapper. Sichtbarkeit nur mit `el.hidden`.
- Genau eine `<h1>` je Seitenansicht. Kopfleiste, Fußzeile und Navigation bleiben stehen. Tastatur: alles erreichbar, sichtbarer Fokusring (2 px, 3 px Abstand), `aria-pressed` an Umschaltern, `aria-selected` an Reitern, Bedienelemente mindestens 44 px hoch.
- Bewegung nur mit `transform` und `opacity`: Rückmeldung 160 bis 220 ms, Karten 240 bis 360 ms, Eintritte 500 bis 700 ms und nur einmal, höchstens 12 bis 18 px Weg. `prefers-reduced-motion` zeigt Endzustände; dazu ein Schalter „Bewegung: an/aus“ in der Kopfleiste (Text aus `SC.ui`). Keine Scrollsperren, keine Endlosschleifen außer einem leisen Atmen von Ampeln (4 s), keine Zähler, kein Konfetti, kein Cursor, kein Chatbot.
- Größe der gerenderten Seite unter 16 MB; die Datei selbst unter 450 KB.

## Harte Inhaltsregeln (Markenrecht und UWG, nicht verhandelbar)

- Keine erfundenen Zahlen, Prozentwerte, Kundenzahlen, Sterne, Logos, Zitate von Kunden. Keine Siegel, Abzeichen oder Wörter wie „verified“, „zertifiziert“, „compliant“, „sicher“, „erfüllt alle Anforderungen“, „GDPR ready“, „AI Act ready“. Kein „Live“, „Simulator“, „Compliance Check“.
- Alles mit `status: "concept"` trägt sichtbar das Wort „Konzept“/„Concept“ (Pille auf dem Cover und in der Karte), ist nicht kaufbar und öffnet beim Klick nur einen Dialog mit `SC.ui.conceptNote` bzw. `conceptToolNote`. Konzept-Cover sind sichtbar anders: Umriss statt Fläche, gedämpfte Farbe, kein Produktbild.
- Preise nur aus `SC.products[].price`: „99 €“ Gründerpreis für die ersten zehn Käufer, „danach 199 € im Jahr“. Kaufknöpfe verlinken auf `SC.meta.live + product.url[lang]` (neuer Tab, `rel="noopener"`), dazu der Hinweis `SC.ui.buyNote`. Keine Kasse im Entwurf.
- Das Wartelistenformular sendet nichts (`preventDefault`) und zeigt `SC.ui.waitlistDraft`.
- Videos: nichts ist veröffentlicht. Poster mit echtem Titel, Nummer, Sprache und Status (`inProduction`/`planned`), dazu `SC.ui.previewSoon`. Kein Play-Overlay, das Abspielen verspricht; ein Klick öffnet einen Dialog mit Titel, Status, `SC.ui.noVideoNote` und den Verweisen „Dazu passt“ (Toolkit, Tool, Handbuch, jeweils Live-Link). Kein Autoplay, kein Ton.
- Marker immer mit Form (Fakt: gefülltes Quadrat, Auslegung: Raute, Unsicher: halber Kreis, Lücke: gestrichelter Kreis), nie Farbe allein. Marker-Farben dunkel: Fakt #4f8cff, Auslegung #b07cff, Unsicher #ffd166, Lücke #ff6b6b; hell: #1f5fd1, #6b3fc9, #7a4b00, #b42318.
- Das Dokumentblatt (Hero und Produktseite) ist das echte Muster aus `SC.situations`: Kopf mit `code`, `date`, `name`, `business`; die zwei `lines`; Quellenzeile in Mono; darunter `SC.ui.exampleNote`. Auf dem Blatt immer Papierfarben (#fbfbfd Fläche, #141a24 Text, #5a6472 Nebentext), geschichteter Schatten, kein Leuchten.
- Fußzeile jeder Variante: die Rechtslinks aus `SC.ui.legal` (Live-Links), `SC.ui.noLegal`, `SC.ui.draftNote`, Stand aus `SC.meta.stand`. Bildunterschrift bei jedem Symbolbild: „Symbolbild, KI-generiert, Platzhalter“ / „Symbolic image, AI-generated, placeholder“ (klein, Mono).

## Marke, für alle drei

- Scutum-Marke als Inline-SVG: Schildform aus den Punkten (12,2.5) (18.5,5.7) (18.5,17.3) (12,21.5) (5.5,17.3) (5.5,5.7) zurück zu (12,2.5), Kreuzlinien (12,6)–(12,18) und (8.5,12)–(15.5,12), Strichstärke 1.8, `viewBox="0 0 24 24"`, Farbe accent. Daneben der Wortmarke-Text „SCUTORIA“ in Manrope 800, Laufweite 0.14em. Kein Bild für die Wortmarke.
- Schrift: Manrope für Überschriften und Text; IBM Plex Mono für Kicker, Quellen, Preise, Dokumentnummern, Daten, Status. Keine dritte Schrift. Fließtext 16 bis 18 px, Zeilenhöhe 1,55 bis 1,7, Absätze höchstens 65ch. Eine Versalienstufe (Kicker 12 px, Laufweite 0.14em).
- Nur ein Akzent für den Hauptknopf und Links; Produktlinien aus `SC.lines` (policy blau, security türkis, setup bernstein, foundations hellgrau) als Streifen auf Covern und als Serienbalken.
- Coverfamilie (CSS, kein Bild): Buchobjekt mit Rücken, Fläche Verlauf #11151d nach #090b10 (einziger erlaubter Verlauf), Linienstreifen oben in der Linienfarbe, „SCUTORIA · 01“ in Mono, Titel in Manrope 700/800 weiß, darunter Serienzeile „KI · WIRTSCHAFT · SICHERHEIT“ in #cfd6e3. Konzept-Cover: nur Umriss, Pille „Konzept“. Bei Hover und Fokus hebt sich ein verlinktes Cover 8 px (240 ms).
- Wirkung „Licht und Material“: Glas- und Metallkanten als 1 px helle Linien, Flächen mit leicht transparentem Blau (rgba(79,140,255,0.06) bis 0.12), sanfte Lichtbänder als flächige Verläufe im Hintergrund höchstens eines je Seite; keine Unschärfe über 24 px, kein Cyan (#00d4ff und Nachbarn), kein Glühen um Knöpfe, keine Neonrahmen.
- Das echte Produkt tut die Erklärarbeit: das Dokumentblatt, die Buchobjekte, die Marker und die Ampeln sind die Blickfänge. Symbolbilder sind Bühne oder Hintergrund, nie der Inhalt.

## Seitenfamilie, für alle drei

Start: Hero (variantenspezifisch) mit `SC.hero`, Claim, Eyebrow, Situationswahl (3 Pillen aus `SC.situations`, wechselt Frage und Dokumentblatt mit 240 ms Fade und 12 px Weg), die drei Schritte `SC.ui.steps`. Danach: drei Wege (`SC.paths`), Toolkits (`SC.products`, zwei groß mit Buchobjekt, Frage- und Dokumentzahl, Preis, Knöpfe „Muster ansehen“ und Live-Link; das dritte als „In Vorbereitung“), „So läuft es“ (`SC.how`, drei Schritte mit einer Linie, die sich beim Scrollen füllt), „Warum es im Alltag zählt“ (`SC.why`), Marker (`SC.markers`, die vier Formen zeichnen sich einmal, wenn sie zu 30 % sichtbar sind), „Vorher ansehen“ (Handbuch-Links beider Toolkits), Tools-Teaser (sechs echte), Studio-Teaser (Langvideo 01 und zwei Shorts-Poster), Warteliste, Fußzeile.

Bibliothek: `h1` = `SC.ui.libraryTitle`, Intro, Suche (filtert Titel), Themenfilter `SC.ui.filters` (Alle/KI/Sicherheit/Praxis gegen `topic`), Statuszeile `SC.ui.countLine`. Karten: die drei `SC.products` (Verfügbar, In Vorbereitung) zuerst, dann die 18 `SC.concepts` als Konzepte. Echte Karten verlinken auf die Produktseite (`#de-produkt`), die Produktseite merkt sich das gewählte Produkt in einer Variablen (`state.product`, Standard `ai-policy`).

Produkt: `h1` = Produktname; Kicker mit Nummer und Status; `lead`; Knöpfe „Muster ansehen“ (Dialog mit dem Dokumentblatt der passenden Situation) und Live-Link; Umschalter auf das andere Toolkit. Reiter `SC.ui.productTabs`: Überblick (`short`, Fragen, `documents`, `formats`), Inhalt (Liste `docs`), Ablauf (`SC.how`), Grenzen (`limits`, `SC.ui.isNotText`). Preiskarte: „99 €“ groß in Mono, `founder`, `regular`, `licence`, Kaufknopf mit `buyNote`. Handbuch-Link. Markerleiste.

Tools: `h1` = `SC.ui.toolsPageTitle`, Intro `SC.ui.toolsIntro`. Liste aller zehn `SC.tools` (Nummer, Name, Art aus `SC.toolKinds`; Konzepte gedämpft mit Pille). Arbeitsfläche: Kicker `demoKicker`, Titel des gewählten Tools, Textfeld mit `demoSample`, Knopf `demoRun` ersetzt E-Mail-Muster durch „[E-Mail entfernt]“ bzw. „[email removed]“ und schreibt das Ergebnis in die Ausgabe (aria-live), Hinweis `demoLimit`, Link `demoLive` auf das echte Tool des gewählten Eintrags (bei Konzepten: Dialog `conceptToolNote`, kein Link).

Studio: `h1` = `SC.ui.studioTitle`, Intro. Großes Poster Langvideo 01 (16:9, CSS-Poster: Linienfarbe als Streifen, Nummer, Titel, Sprache DE/EN, Status), daneben zwei Shorts-Poster (9:16). Reihe aller zwölf `SC.shorts` (9:16-Karten mit Hook, Kennung, Status „Geplant“, waagrecht scrollbar mit Pfeilen). Programmliste aller zehn `SC.videos` mit Status, Linienfarbe und „Dazu passt“-Links (Toolkit, Tool, Handbuch, alle Live-Links). Hinweis `noVideoNote`.

## Variante A „Saphir“ (dunkel, Produktbühne)

Grundlage ChatGPT 01 Sapphire Vault, dazu das Katalogprinzip von 02 und das Studio von 04. Wirkung: souverän, präzise, ruhig, hochwertig; digitale Unterlagen bekommen durch Glas, Licht, Buchrücken und Dokumentflächen eine greifbare Form.
- Farben: ground #080f20, surface #111d34, raised #172a49, ink #edf3ff, muted #a8b9d2, accent #4f8cff, button #2f6be6, hairline rgba(226,232,246,0.12), silver #cfd6e3 für Kanten. Inhaltsbreite 1240 px, Abschnittsabstand 80 bis 96 px.
- Hero zweigeteilt: links schmalere Textspalte (Eyebrow, H1 in 56 bis 64 px, Lead, zwei Knöpfe, `forWhom`), rechts die dominante Produktbühne: `assets/01-sapphire-vault.webp` als Bühne (object-fit cover, Radius 20 px, dunkler Scrim unten), darauf das echte Dokumentblatt 2 Grad gedreht mit Rückblatt (14 px rechts, 10 px unten), daneben die drei Buchobjekte der Toolkits als kleine Reihe auf der Bühne. Bei präzisen Zeigegeräten neigt sich die Bühne bis 2 Grad zur Maus (nur transform). Beim Laden setzt sich das Blatt einmal (700 ms). Die Situationspillen stehen unter der Textspalte.
- Bibliothek mit linker Themenleiste (sticky), drei Karten je Reihe; Produktseite mit großem Objekt (Buch auf der Bühne) rechts und Inhaltsreitern; Tools mit Auswahlliste links und Arbeitsfläche rechts; Studio mit einem großen Poster und zwei vertikalen.
- Bewegung: sanfter Einstieg, Buch hebt sich bei Hover/Fokus, Themenwechsel liefert Textrückmeldung.

## Variante B „Verlag“ (hell, Ultramarin)

Grundlage ChatGPT 02 Knowledge Pavilion plus 05 Blue Edition. Wirkung: heller Fachverlag trifft Wissensmuseum; markante Editionsmarke. Die bewusste Abkehr von der dunklen Website.
- Farben: ground #edf3f9 (Porzellan), surface #ffffff, raised #f4f7fb, ink #102d4d (Navy), muted #5a6b80, hairline #cfdae7, accent #245ce5 (Links, Icons), ultramarin #194be0 (Hero-Band, Hauptknopf; Text darauf weiß), light #edf3fa. Marker in den hellen Werten. Dokumentblatt weiß mit Haarlinie und Schatten.
- Hero: Headline zuerst, groß (64 bis 72 px, Navy) auf Porzellan; darunter ein breites Ultramarin-Band (Radius 24 px) mit `assets/05-blue-edition.webp` rechts versetzt (Buchskulptur) und links auf dem Band das Dokumentblatt plus die Situationspillen (weiß auf Ultramarin). Große ruhige Typografie, rechteckige redaktionelle Flächen, großzügige Abstände, wenig umrandete Kästchen.
- Bibliothek mit waagrechten Themenfiltern und vier Coverkarten je Reihe auf hellem Grund; Produktdetail als helle Doppelseite (zwei Spalten mit Mittellinie: links Text und Reiter, rechts Objekt und Preis) mit `assets/02-knowledge-pavilion.webp` als ruhigem Band darüber; Tools als klar abgegrenzte Arbeitsfläche mit Navy-Kopfzeile; Studio wie Kapitel eines Lernmagazins (nummerierte Kapitel, Poster rechteckig, viel Weißraum).
- Bewegung: kurze Fade/Translate-Einstiege, minimale Objektreaktion, klare Farbänderung bei Filterwahl, leichte Coverrotation bei Hover (3 Grad).

## Variante C „Studio“ (dunkel, Medien zuerst)

Grundlage ChatGPT 04 Signal Studio plus die Hub-Idee von Gemini (Reels-Reihe, Startrampe der Tools, Bibliothek als Karussell), ohne Neon, ohne Siegel, ohne Zahlen. Wirkung: filmisches Lernstudio; Inhalte werden angesehen, ausprobiert und verbunden.
- Farben: ground #080b17, surface #0f1527, raised #16203a, ink #eef4ff, muted #9fb0cc, accent #346fef, button #2f6be6, hairline rgba(226,232,246,0.12). Kein Violett in der Oberfläche (nur im Bild).
- Hero bildfüllend: `assets/04-signal-studio.webp` über die volle Breite (Höhe 72 vh am Desktop, 56 vh mobil, object-fit cover), darüber ein Scrim von links (rgba(8,11,23,0.92) nach transparent) für Lesbarkeit; links Eyebrow, H1 (64 bis 76 px), Lead, zwei Knöpfe und ein dritter leiser Textknopf „Video 01 · in Produktion“ (öffnet die Studio-Seite); rechts unten das Dokumentblatt mit den Situationspillen. Mobil steht der Text unter dem Bild, nicht darauf.
- Unter dem Hero zuerst das Studio: großes Poster Langvideo 01 plus die waagrechte 9:16-Reihe der Shorts (Hooks, Status). Dann die Startrampe: die zehn Tools als Software-Kacheln mit Inline-SVG-Icon (einfach, 24 px), Name, Art, Knopf „Öffnen“ (echte als Live-Link, Konzepte mit Pille und Dialog). Dann die Bibliothek als Karussell (Cover, waagrecht, Pfeile), dann die zwei Toolkits groß, Marker, Warteliste.
- Bibliothek: drei waagrechte Themenreihen (KI, Sicherheit, Praxis) mit Covern, darüber Suche und Statuszeile. Produkt und Tools: klare Hierarchie wie A, in C-Farben. Studio: Filter nach Thema (Linie) und Format (Langvideo/Short), Detaildialog mit Status, „Dazu passt“ und `noVideoNote`.
- Bewegung: Poster heben sich 8 px, die Shorts-Reihe scrollt mit Trägheit (natives Scroll-Snap), Hero-Text tritt in drei Takten ein. Kein Autoplay, kein Ton.

## Selbstprüfung vor der Rückmeldung

1. Datei beginnt mit `<title>`; enthält kein `<html`, `<head`, `<body`, `<!doctype`; keine `http`-Verweise außer fonts.googleapis.com, fonts.gstatic.com und `https://scutoria.com/...`.
2. Alle fünf Seiten rendern in beiden Sprachen ohne JS-Fehler (`node -e` mit einem einfachen DOM ist nicht nötig; dafür den Render-Code als reine Funktionen schreiben und einmal mit `node` die Datenfunktionen gegen `sc-data.js` laufen lassen, wenn sinnvoll).
3. `grep -ci` auf „verified“, „compliant“, „zertifiziert“, „simulator“, „compliance“, „%“ im sichtbaren Text: null Treffer (außer in CSS).
4. Jedes Konzept trägt das Wort Konzept/Concept; jedes Video den Status; keine Zahl außerhalb des Datensatzes.
5. Kurze Rückmeldung: Dateipfad, Größe, was gebaut wurde, Abweichungen vom Brief mit Grund.
