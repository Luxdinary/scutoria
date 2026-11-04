# Sapphire Cinema: Brief für die Unterseiten (3. November 2026)

Gilt für die vier Bauer von Bibliothek, Studio, Produktseiten und Toolseiten. Rangfolge: Stefans Anweisung, dann `_berichte/2026-11-03-Sapphire-Cinema-Claude-Uebergabe/ANLEITUNG-FUER-CLAUDE.md` (Abschnitte 9 bis 12, 15 bis 18), dann dieser Brief. Die Startseite und die Hülle (Kopfleiste, Fußzeile) sind fertig; sie zeigen die Sprache.

## Stand des Codes

- `site/` ist der gespiegelte Lovable-Code (Express-5-kompatibel, Worker-Laufzeit). Lokal läuft er mit `scripts/local/` (Node-Hooks für Dateien und Datenbank). Der Server auf Port 8787 läuft bereits und gehört der Hauptsitzung; er wird NICHT neu gestartet. Seiten prüfst du ohne Server: `node --disable-warning=ExperimentalWarning --import ./scripts/local/register.mjs scripts/local/render.mjs ./src/pages/<modul>.mjs <exportierteFunktion> de <ausgabe.html> '[weitere JSON-Argumente]' <deine.css>` schreibt die gerenderte Seite als Datei (Assets zeigen auf den laufenden Server; deine CSS-Datei wird zusätzlich eingebunden). Dann `bash scripts/local/shot.sh <ausgabe.html> 1440 1400 <bild.png>` und das Bild mit Read ansehen. Handybreite: Chrome ohne Fenster kann unter Windows nicht schmaler als etwa 500 px; prüfe 760 px und lies dein CSS für 390 px gegen; die Hauptsitzung prüft 375 px im Browser-Bereich.
- CSP ohne Inline-Stile: kein `style="..."` im HTML. Zustände über Klassen, Daten über `data-*`, Farben je Produktlinie über Modifikatorklassen (`--policy`, `--security`, `--setup`).
- Texte: Sie-Form, kein Ausrufezeichen, kein Gedankenstrich als Einschub, Zahlen oft ausgeschrieben. Bestehende Texte (Produkte, Tools, Preise, Rechtstexte) bleiben byteidentisch. Neue Texte stehen in `src/cinema.mjs` (`CINEMA`, Blätter `{ de, en }`, Zugriff `L(lang)(blatt)`); fehlt ein Text, ergänze ihn dort in beiden Sprachen (kurz) und melde ihn.
- Markenregeln (`.claude/skills/scutoria-brand`): keine erfundenen Zahlen, Siegel, Kundenstimmen; nie „compliant“, „zertifiziert“, „sicher“, „verified“; Marker immer mit Form; Akzent nur für Links, Icons, aktive Zustände; Knopf `button`-Token.
- Keine Konzepttitel, keine erfundenen Tools, keine Storyboards: nur der echte Bestand (zwei Toolkits, KI-Einrichtungs-Toolkit in Vorbereitung, zwei Handbücher, sechs Tools, das Videoprogramm mit Status).

## Gestaltungsvokabular (vorhanden in `public/cinema.css`)

- Tokens: `--ground`, `--header`, `--surface`, `--surface-raised`, `--surface-studio`, `--surface-sources`, `--petrol-muted`, `--indigo-muted`, `--border` (sichtbare dünne Kontur), `--hairline` (feine Trennlinie), `--ink`, `--ink-muted`, `--accent` (#75a7ff), `--button`, Linienfarben `--line-policy/--line-security/--line-setup`, Cover `--cover-ground`, Abstände `--space-2..24`, `--radius-sm` (6 px), Bewegung `--dur-1..4`, `--ease-feedback`, `--ease-enter`. Seitenrand über `.wrap` (1240 px, 40/24/20 px Rand).
- Klassen: `.kicker` (Mono, Versalien, Akzent), `.display` (Seiten-H1, 600), `.title` (H2), `.heading` (H3), `.lead`, `.body`, `.muted`, `.section`, `.section__head`, `.section__head--row` (Kopf mit Link rechts), `.cine-more` (Textlink mit Pfeil), `.sc-btn`, `.sc-btn--secondary`, `.sc-btn--small`, `.sc-row`, `.sc-pill`, `.sc-pill--green`, `.sc-card` (Fläche mit Kontur).
- Bausteine der Startseite zum Wiederverwenden: `.cine-card` mit `.cine-card__stage` (Coverbühne, Linienfarbe über `.cine-card--policy` usw.) und `.cine-card__meta` (kicker, heading, body, `.cine-card__facts`, `.cine-card__price`, sc-row); `.cine-cover` (typografisches Ersatzcover für geplante Titel); `.cine-feature` (Text links, Bild rechts); `.cine-method`; `book(lang, tk, { size: 'offer' })` aus `pages/cover.mjs` für die echten 3D-Cover; `.reveal` für den einmaligen Eintritt (site.js).
- Neue Klassen nur mit Präfix `cine-` und nur in deiner eigenen CSS-Datei im Scratchpad (`C:\Users\Stefa\AppData\Local\Temp\claude\C--Users-Stefa-OneDrive-scutoria\2bd5f3e6-fc88-4cc8-85f2-34265e43c491\scratchpad\cinema-<teil>.css`); die Hauptsitzung hängt sie an `cinema.css` an. Nichts in `cinema.css`, `site.css`, `layout.mjs`, `i18n.mjs`, `server.mjs` ändern.
- `layout({ ..., section })` setzt den aktiven Navigationspunkt: `library` (auch Produktseiten), `tools`, `studio`.

## Mobil (bis 760 px) und Bedienung

Eine Spalte, keine festen Kartenhöhen, Titel nie abschneiden, Seite nie waagrecht scrollen (nur bewusste Sammlungen mit `overflow-x: auto`). Tastatur: alles erreichbar, sichtbarer Fokus (global vorhanden), Bedienflächen 44 px, Reiter entweder vollständig (role=tablist mit Pfeiltasten) oder als normale Abschnitte. Ohne JavaScript bleibt alles sichtbar und bedienbar.

## Abgabe

Pfade der geänderten und neuen Dateien, deine CSS-Datei, zwei Screenshots (1440 und 760) je Hauptseite, Abweichungen vom Paket mit Grund, offene Punkte. Keine Commits.
