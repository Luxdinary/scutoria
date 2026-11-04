# Sapphire Cinema: Abschlussbericht der Umsetzung

Stand 3. November 2026, 13:52 (Wiener Zeit). Für dich, Stefan. Veröffentlicht am 3.11. um 16:30 nach deinem „Ja, veröffentlichen“ (Lovable-Deployment ae2b12b2); scutoria.com zeigt den Cinema-Stand.

## Wo der Stand liegt

- Code: Ordner `site/` im Scutoria-Ordner, Commits e66e907 (Spiegel von Lovable plus Runde 1) und bbf6ba0 (Runde 2). Der lokale Starter `npm run local` in `site/` zeigt die echten Seiten auf http://localhost:8787 (Kasse und Konto mit der alten SQLite-Datenbank, alles andere wie bei Lovable).
- Bilder: `design/cinema-2026-11-03/bilder/` (Desktop 1440 px, Handy 375 px, Referenz `referenz-home.jpg` aus dem Paket).
- Bei Lovable: übertragen am 3.11. nach deinem „Ja, übertragen“, in drei Runden (Auftrag `lovable/AUFTRAG-CINEMA-2026-11-03.md`, Projektwissen `lovable/KNOWLEDGE-CINEMA.md`). Vorschau: https://id-preview--6e8cf66c-609e-4034-8911-ceeb9b422c84.lovable.app (Lovable-Login nötig).

## Was umgesetzt ist

| Bereich | Stand |
|---|---|
| Tokens | Cinema-Farbrollen in `design/project/tokens.json` (Navy #080f20, Flächen #111d34 und #172a49, Akzent #75a7ff, Knopf #306cea, Kontur #2d4264, Studio- und Methodikflächen, Petrol und Indigo als Nuancen), Kopfleiste 80 px, Inhaltsbreite 1240 px, Bewegungswerte; `tokens.css` daraus erzeugt. |
| Hülle | Kopfleiste mit Entdecken, Bibliothek, Tools, Studio, Konto, Bewegung, Sprache und Vorschau-Chip; Handy mit Menü; vierspaltige Fußzeile (Toolkits, Wissen, Konto, Rechtliches). |
| Startseite | Hero-Option 2 nach deiner Wahl: Bühne mit dem Symbolbild, „KI verstehen. Wissen im Alltag nutzen.“, Wissen entdecken, Ein Tool ausprobieren, Claim, Plakette. Drei Wege mit echten Verweisen (Erklärung, Tool, Arbeitsunterlage), Studiomodul, dann die Situationen mit den echten Musterdokumenten als eigene Sektion, Regal mit beiden Toolkits und dem dritten in Vorbereitung, So läuft es, Methodikblock mit Markern und Mustern, Tools, Schlusszeile, Warteliste. |
| Bibliothek | Neu: `/de/bibliothek`, `/library`. Fünf echte Einträge (zwei Toolkits, eines in Vorbereitung, zwei frei lesbare Handbücher), Themenleiste, Suche, Zählung, Leerzustand mit Zurücksetzen. Ohne Skript alles sichtbar. |
| Produktseiten | Kopf mit Bühne (Cover und Blatt), Formatzeile „Digitale Lieferung, kein Versand“, Flächen für Grenzen und Preis, Block „Dazu passt“. Kaufweg, Preise, Reiter, Muster, FAQ und Texte unverändert. |
| Tools | Übersicht als zwei Gruppen; jede Toolseite und jede Memo-Seite als Arbeitsfläche mit Auswahlliste links. Logik, Formulare, CSP und Texte unverändert. |
| Studio | Neu: `/de/studio`, `/studio`. Langvideo 01 als Poster mit Status „In Produktion“, zwei Shorts, Reihe aller zwölf Shorts, Programm der zehn Videos mit „Dazu passt“, Hinweis, dass noch nichts veröffentlicht ist. Kein Player, kein Play-Knopf. |
| Übrige Seiten | Impressum, Datenschutz, AGB, Widerruf, Über, Konto, Kasse, Handbücher, Generator, Vertrag widerrufen, Seite nicht gefunden laufen mit der neuen Hülle; Handbuch und Dokumente bleiben Papier. |

## Übertragung an Lovable

- Runde 1: die zehn neuen Dateien (`cinema.mjs`, `library.mjs`, `studio.mjs`, `cinema.css`, `library.js`, vier Bildgrößen, `studio.json`) byteweise abgelegt. Lovable-Commit 851e405, 1,0 Credit.
- Runde 2: die zehn Ersetzungen (`layout.mjs`, `i18n.mjs`, `server.mjs`, `home.mjs`, `product.mjs`, `tools.mjs`, `seo.mjs`, `memos/pages.mjs`, `tokens.css`, `home.js`) byteweise; alle SHA-256-Werte stimmen mit den lokalen überein. Lovable passte fünf Tests an (app-routing: vier neue Routen; home-e29, header-csp-404, e30: neue Hülle und 404-Seite; phase4-axe: Bibliothek und Studio dazu, 144 statt 128 Prüfungen). Suite danach 250 bestanden, 2 rot: der ältere D5-PDF-Fehler (Englisch zwei statt drei Seiten; war schon vor der Übertragung rot, Stand 247 zu 1) und die Kontrastprüfung. Lovable-Commit 5b3043a, 6,1 Credits.
- Axe-Audit von Lovable (Desktop 1280 px und Handy 360 px, zehn Seiten): Startseite Marker „Fakt“ 4,45:1 statt 4,5:1; Studio Posternummer 1,25:1; 404 Hauptknopf 1,95:1 (eine alte Regel in `site.css` färbte die Links dieser Zeile hellblau). Die übrigen Seiten ohne Befund; alle zehn Seiten Status 200, je eine h1, kein Überlauf, keine Skriptfehler; Navigation, Themenwege und Platzhalter-Ersetzung liefen.
- Runde 3: die drei Befunde lokal behoben und geprüft, drei Dateien übergeben: Marker „Fakt“ auf das Akzentblau #75a7ff (5,97:1 auf der erhöhten Fläche; `tokens.json` und `tokens.css`), Posternummer als reine CSS-Dekoration ohne Textknoten (der Kicker trägt die Zahl weiter als Text; `studio.mjs` und `cinema.css`), 404-Hauptknopf wieder weiß auf Blau (4,71:1; `cinema.css`). Lovable übernahm sie byteweise (Hashes geprüft); die Kontrastprüfung läuft wieder sauber (144 Prüfungen ohne Befund), Suite 251 bestanden und 1 rot (nur noch der ältere D5-PDF-Fehler). Lovable-Commit 039c979, 1,5 Credits. Die ganze Übertragung kostete 8,6 Credits.
- Veröffentlichung (Deployment ae2b12b2), von außen geprüft: 32 Adressen EN und DE (Start, Bibliothek, Studio, Produkte, Handbücher, Tools, Memos, Über, Konto, Widerruf, Rechtsseiten, zwei Fehladressen) mit erwartetem Status, genau einer h1, Cinema-Hülle und vierspaltiger Fußzeile; `tokens.css` mit dem neuen Fakt-Marker, `cinema.css` mit den Kontrastregeln, vier Bildgrößen des Symbolbilds; Sitemap mit 32 Adressen samt Bibliothek und Studio; robots weiter Disallow (Vorschaumodus) und `/health` unverändert (Vorschau, Kasse stripe, Webhook, Mail, memoList false); Umleitungen `/agb`, `/en/`, `/imprint`, www und scutoria.lovable.app wie bisher; 404 mit drei Knöpfen und noindex; kein Lovable-Abzeichen.
- Vorschau in deinem Chrome (Desktop, 1568 px breit): 37 Adressen aus der Sitemap plus Konto, Widerruf und zwei Fehladressen abgerufen; jede Seite mit genau einer h1, der Cinema-Hülle, vier Navigationseinträgen und der vierspaltigen Fußzeile; Fehladressen liefern Status 404 mit der neuen Seite. Startseite DE, Bibliothek, Studio, Produktseite KI-Richtlinien und Tool „Darf das hinein?“ gesichtet, Konsole ohne Meldungen.

## Was geprüft ist

- Alle Routen antworten (21 Adressen, DE und EN), Sitemap enthält Bibliothek und Studio, `/health` unverändert.
- 1440 px: Startseite DE und EN, Bibliothek, Studio, Tools, Toolseite, Memo-Seite, Produktseite, 404 gegen die Referenzen gesichtet (Bilder im Ordner).
- 375 px (Browser-Bereich mit Geräteemulation): Startseite, Bibliothek, Studio, Toolseite, Produktseite, Memo-Seite ohne waagrechtes Scrollen; Menü öffnet und schließt; Bibliotheksfilter und Suche funktionieren; Themenwege schalten um.
- Konsole ohne Fehler; genau eine h1 je Seite; Landmarken Kopf, Navigation, Hauptinhalt, Fuß.
- Bewegung: Eintritte nur einmal, Schalter „Bewegung: aus“ und Systemeinstellung zeigen Endzustände.

## Nicht geprüft

- In der Lovable-Vorschau nur Desktop im Bild; Handybreite dort nur über Lovables eigenes Audit (360 px, kein Überlauf) und lokal (375 px). Kaufweg und Konto in der Vorschau nur aufgerufen, nicht durchgespielt.
- Tastaturbedienung der Karussells, Reiter und Dialoge nur stichprobenartig; kein Bildschirmlesertest; keine Messung der Ladezeit.
- 360 px, 768 px, 1024 px und sehr große Schrift nur über die CSS-Regeln, nicht im Bild.

## Bewusste Abweichungen vom Paket

- Hero-Text nach deiner Wahl (Option 2): „KI verstehen. Wissen im Alltag nutzen.“; die Situationen folgen als eigene Sektion.
- Die Themenwege zeigen bei der Auswahl drei echte Verweise statt eines Rückmeldungssatzes.
- Keine Konzepttitel, keine Konzept-Tools, keine Storyboards, keine Play-Knöpfe: nur der echte Bestand.
- Die Tool-Auswahlliste wechselt bei 900 px in eine Reihe, nicht bei 760 px (Platz).
- Das Symbolbild ist das Motiv des Pakets in vier Größen; eigene Bilder über Higgsfield können es später ersetzen.

## Offene Punkte

1. Live; der Vorschaumodus (robots Disallow, Kauf nach E31) bleibt, bis du ihn aufhebst.
2. Produkt- und Toolseite importieren sich gegenseitig (Tool-Titel im Block „Dazu passt“); läuft, kann bei Gelegenheit in `cinema.mjs` wandern.
3. Die alte Startseiten-Datei `pages/home-e29.mjs` bleibt als Baustein (Werkbank, Marker, Demo) in Gebrauch.
4. Vorschaubilder (OG) zeigen noch das alte Motiv; neu erzeugen, wenn das endgültige Symbolbild steht.
5. Der ältere Testfehler D5-PDF Englisch (zwei statt drei Seiten) war schon vor der Übertragung rot und gehört nicht zur Gestaltung; eigene kleine Runde bei Gelegenheit.
6. Lovables fünf angepasste Testdateien liegen nur bei Lovable; `site/` enthält keine Tests.
