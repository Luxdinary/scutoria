# Auftrag an Lovable: Sapphire Cinema übernehmen (Entwurf, 3. November 2026)

Gesendet am 3.11.2026 nach Stefans Wort („Ja, übertragen“) in drei Runden: Teil 1 (zehn neue Dateien), Teil 2 (zehn Ersetzungen und Tests), Runde 3 (drei Kontrastbefunde). Verlauf und Ergebnis in `STAND.md` und `design/cinema-2026-11-03/BERICHT.md`. Veröffentlichen (deploy) ist davon getrennt und braucht ein zweites Wort.

## Was Lovable bekommt

Vollständige Dateien aus `site/` (Stand Commit bbf6ba0), hochgeladen über den Konnektor und im Auftrag als „byteweise übernehmen“ markiert. Abbildung: `site/src/X` → `src/legacy/X`, `site/public/X` → `public/X`, `site/content/X` → `content/X`.

| Bei Lovable | Art | Inhalt |
|---|---|---|
| `src/legacy/layout.mjs` | ersetzen | neue Kopfleiste (Entdecken, Bibliothek, Tools, Studio, Konto, Bewegung, Sprache), vierspaltige Fußzeile, lädt `cinema.css`, Parameter `section` |
| `src/legacy/i18n.mjs` | ersetzen | Pfade `library`, `studio`, `withdraw`; Texte `nav.*`, `footer.*` ergänzt |
| `src/legacy/server.mjs` | ersetzen | `mountLibrary`, `mountStudio`, Seite nicht gefunden neu |
| `src/legacy/cinema.mjs` | neu | alle neuen Texte DE/EN (`CINEMA`, `L`) |
| `src/legacy/pages/home.mjs` | ersetzen | Startseite Sapphire Cinema, Hero-Option 2 |
| `src/legacy/pages/library.mjs` | neu | Bibliothek |
| `src/legacy/pages/studio.mjs` | neu | Studio |
| `src/legacy/pages/product.mjs` | ersetzen | Produktkopf mit Bühne, Flächen, „Dazu passt“ |
| `src/legacy/pages/tools.mjs` | ersetzen | Tool-Übersicht, Arbeitsfläche, `toolNav`, `workspaceHead` |
| `src/legacy/pages/seo.mjs` | ersetzen | Sitemap mit `library` und `studio` |
| `src/legacy/memos/pages.mjs` | ersetzen | Memo-Seiten in der Arbeitsfläche |
| `public/tokens.css` | ersetzen | Cinema-Farbrollen, Bewegungswerte, `--bar: 80px`, `--page-wide: 1240px` (aus `design/project/tokens.json` erzeugt) |
| `public/cinema.css` | neu | alle Cinema-Komponenten |
| `public/home.js` | ersetzen | Themenwege, Schutz für den entfallenen Knopf |
| `public/library.js` | neu | Filter und Suche der Bibliothek |
| `public/img/studio-stage-800.webp`, `-1200.webp`, `-1600.webp`, `-m-800.webp` | neu | das Symbolbild in vier Größen |
| `content/studio.json` | neu | Videoprogramm mit Status |

Unverändert bleiben: `site.css`, `bundle.css`, `motion.css`, `motion.js`, `site.js`, `transitions.js`, alle Toolkit-, Shop-, Mail-, Datenbank-, Rechts- und Handbuchdateien.

## Text des Auftrags (Entwurf)

Apply the uploaded files byte for byte at the paths listed; they are complete files, not patches. Do not restyle anything and do not touch files that are not listed. Then: (1) add `/library`, `/de/bibliothek`, `/studio` and `/de/studio` to the routing test; (2) update the tests that assert the old home markup and the old tool overview (home-e29, header-csp-404, phase4, phase4-axe, transitions) to the new markup: one h1 per page, the navigation entries Discover, Library, Tools, Studio, the `.cine-stage` hero, the `.cine-paths` row, the `.cine-shelf`; (3) run the whole suite and the axe audit on home, library, studio, a product page, a tool page and a memo page in both languages; (4) report test results and any file you had to touch beyond the list, with the reason. Do not deploy.

Vorher: Projektwissen auf `lovable/KNOWLEDGE-CINEMA.md` setzen (set_project_knowledge), sonst verweigert Lovable die Umgestaltung („never restyle“).

## Schätzung

Eine Runde Dateien übernehmen und Tests anpassen: nach den bisherigen Runden 5 bis 12 Credits (Korrekturrunden am 23.10. kosteten 11,6 und 12,3; Etappe 1 der Übernahme 3,7). Stand der Credits im Lovable-Konto prüfen (STAND vom 23.10.: rund 40 übrig, seither drei Runden E29, E30 und E32).

## Danach

Vorschau in Stefans Chrome prüfen (Startseite, Bibliothek, Studio, Produkt, Tool, Memo, Handbuch, Konto, 404, DE und EN, Handy), Befunde als zweite kleine Runde. Veröffentlichen nur auf Stefans Wort.
