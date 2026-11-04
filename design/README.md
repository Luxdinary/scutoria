# Design

Das Designsystem von Scutoria liegt als Dateien unter `project/` und ist als Design-System-Artefakt veröffentlicht: https://claude.ai/artifact/UCNUpomPkoPTME8FZXJKyG

| Pfad | Inhalt |
|---|---|
| `project/tokens.json` | Farben in zwei Themen (Dunkel für die Website, Papier für Dokumente), Schriftstufen, Abstände, Radien, Schatten, Größen. Werte aus dem alten Shop übernommen, Papier-Thema und Marker neu. |
| `project/README.md` | Das Markenbuch, englisch, weil Produkte und Website englisch zuerst entstehen. |
| `project/components/` | Bauteile mit Regeln und Vorschau: Button, Field, OptionCard, Pill, Card, Marker, SourceLine, UncertaintyBox, ProductCover, DocumentPage, EvidencePage. `bundle.css` enthält ihre Stile. `Cover/` ist das Titelbild des Systems. |
| `project/fonts/` | Manrope, selbst gehostet; Lizenz unter `project/licenses/`. |
| `project/assets/Logos/` | Scutum-Marke (dunkel und Tinte) und Favicon, exakte Kopien aus dem alten Shop. Im Artefakt als hochgeladene Dateien, im Index `project/design-system.json` verzeichnet. |

Änderungen: Datei hier ändern, dann mit dem Artifact-Werkzeug neu veröffentlichen (`root` = dieser Ordner, Dateien unter `project/`). Den Index nur anfassen, wenn Titel oder Logos sich ändern.

Offen für Phase 1: Tabelle, Leiste (TopBar), Ampel-Ergebnis, Memo-Seite als Variante der Dokumentseite, Formular-Fortschritt.
