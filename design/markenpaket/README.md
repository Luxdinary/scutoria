# Markenpaket Scutoria

Stand 2. November 2026. Alles, was man für Logo, Profile und Vorschaubilder braucht, an einem Ort. Die Ansicht aller Dateien: `index.html` im Browser öffnen. Neu erzeugen nach einer Änderung an der Marke: `python design/markenpaket/erzeugen.py` im Projektordner.

Quelle der Wahrheit bleibt das Designsystem in `design/project/` (Markenbuch `README.md`, Farben `tokens.json`, Logos `assets/Logos/`). Dieses Paket enthält Exporte und Kopien davon; geändert wird nie hier, sondern dort.

## Inhalt

| Ordner | Was | Wofür |
|---|---|---|
| `logo/svg/` | `scutum-mark.svg` (Blau `#4f8cff`, für dunkle Flächen), `scutum-mark-ink.svg` (Tinte `#141a24`, für Papier und Druck), `favicon.svg` (Kachel) | Druck, Präsentationen, alles, was Vektoren nimmt |
| `logo/png/` | dieselben Marken freigestellt in 64, 128, 256, 512 und 1024 Pixeln | Programme ohne SVG |
| `favicon/` | Kachel in 16, 32, 48, 192, 512 Pixeln, `favicon.ico` (16/32/48), `apple-touch-icon-180.png` ohne Rundung | Browser, Lesezeichen, Handy-Startbildschirm |
| `profilbild/` | Marke auf Grund `#0b1120` in 400, 800 und 1080 Pixeln, wie das YouTube-Profilbild | Profilbild auf YouTube, LinkedIn, Instagram, Google-Unternehmensprofil |
| `vorschaubilder/` | die sechs Bilder, die beim Teilen eines Links erscheinen (Startseite, KI-Richtlinien, Sicherheitsnachweis, je EN und DE) | Kopie aus `site/public/og/` |
| `youtube/` | Banner (2560 × 1440), Profil (800 × 800), Endscreen EN und DE (1920 × 1080), Thumbnail-Vorlage (2560 × 1440) | Kopie aus `marketing/youtube/ASSETS/` (dort liegen auch die HTML-Quellen) |

## Woanders, nicht kopiert

- Thumbnails je YouTube-Folge: `OneDrive\Business\02 Marke\Scutoria\YouTube-Planung\<Folge>\Thumbnails\`.
- Higgsfield-Clips und Standbilder für Videos (30. Oktober 2026, acht Clips, Lizenzzeilen in `LICENSE.md`): `C:\Automation\faceless-network\brands\ai_security\assets\higgsfield\`, Spiegel in `OneDrive\Business\05 Produktion\_Demos\scutoria-regie\higgsfield-assets\`. Abgleich am 2. November 2026: Die Farben der Clips (Prompt-Blatt Fassung 2) sind die Scutoria-Tokens; kein Cyan, kein Glow, kein Schild-Symbol im Bild.
- Das Designsystem als Artefakt: https://claude.ai/artifact/UCNUpomPkoPTME8FZXJKyG.

## Regeln in Kürze (aus dem Markenbuch)

- **Marke:** die Scutum-Marke ist das einzige Logo. Schutzraum eine Schildbreite, Mindestgröße 20 Pixel am Bildschirm. Nicht umfärben, füllen, drehen oder mit Effekten versehen. Auf Dunkel die blaue Marke, auf Papier die Tinten-Marke.
- **Wortzeichen:** SCUTORIA wird als Text gesetzt: Manrope 700, Versalien, Laufweite 0,18em. Es gibt bewusst keine Bilddatei des Wortzeichens (Markenbuch). Wo ein Kanal nur Bilder nimmt, zeigt das YouTube-Banner, wie Marke und Wortzeichen nebeneinander stehen.
- **Schriften:** nur Manrope (Überschriften und Text) und IBM Plex Mono (Kennzeilen, Quellen, Nummern, Preise). Beide selbst gehostet, Dateien in `design/project/fonts/`.
- **Farben (dunkel):**

| Name | Wert | Einsatz |
|---|---|---|
| ground | `#0b1120` | Grund der Seite |
| surface | `#121b2f` | Flächen |
| surface-raised | `#19243b` | erhobene Flächen |
| ink | `#e9eef8` | Text |
| ink-muted | `#a1adc4` | Nebentext |
| accent | `#4f8cff` | die eine Hauptaktion, Links, die Marke |
| button | `#2f6be6` | Fläche des Hauptknopfs |
| paper | `#fbfbfd` | das Papierblatt, einziges Licht im Raum |
| signal-green / amber / red | `#2ec4b6` / `#ffd166` / `#ff6b6b` | Ampeln; Grün auch die Sicherheitslinie |
| Marker Auslegung | `#b07cff` | nur der Auslegungs-Marker |

- **Nie:** Cyan, Neon, Glow, Glas-Effekte, Verlaufsnetze, Hacker im Kapuzenpulli, Schloss und Kette, Gesichter oder Personen, Kundenlogos, Kundenstimmen, Sternbewertungen.
