# Runde 2, Plan: die Startseite als Nachtarchiv

Stand 20.10.2026. Grundlage: Option A (Brief 2 mit leiser Dynamik), siehe `RUNDE-2-RICHTUNG.md`. Erst die Startseite, dann Screenshots, dann Stopp.

## Tokens, die es gibt (design/project/tokens.json)

| Gruppe | Werte |
| --- | --- |
| Grund | ground #0b1120 (dunkel) / #f6f7fa (Papier); surface #121b2f / #ffffff; surface-raised #19243b / #eef1f6 |
| Text | ink #e9eef8 / #141a24; ink-muted #a1adc4 / #5a6472 (8,4:1 dunkel, 6,0:1 Papier) |
| Linien | hairline rgba(226,232,246,0.12); border-control rgba(226,232,246,0.34) |
| Akzent | accent #4f8cff; accent-strong; accent-tint; button #2f6be6, button-hover, button-active; on-accent #fff; focus #4f8cff |
| Signale | signal-green #2ec4b6, signal-amber #ffd166, signal-red #ff6b6b, on-signal; die drei als Text (…-text) |
| Marker | marker-fact (Quadrat) #4f8cff, marker-interpretation (Raute) #b07cff, marker-uncertain (Halbkreis) #ffd166, marker-gap (gestrichelter Kreis) #ff6b6b |
| Linien der Produkte | line-policy #4f8cff, line-security #2ec4b6, line-setup #f2b544 |
| Schrift | Manrope (display, title, heading, lead, body, small, label), IBM Plex Mono (source 13px, stamp 12px) |
| Raster | 4-px-Raster space-1 bis space-24; radius-sm 6, radius-field 12, radius-card 20, radius-pill; control 48, bar 56; measure 68ch |
| Schatten | shadow-card, shadow-paper |

Änderungen an den Tokens: glass, glass-border, glass-border-strong, glow-accent, glow-security, glow-amber fallen weg (Runde 1, jetzt untersagt). Neu: paper (#fbfbfd, das Blatt auf dem dunklen Tisch), paper-ink (#141a24), shadow-paper weicher und geschichtet ohne Leuchten, shadow-paper-lift für Hover. measure von 68ch auf 62ch.

## Dateien

- design/project/tokens.json, design/project/components/bundle.css (Knöpfe ohne Heben, Karten ohne Glas, Marker ohne Glühen)
- site/public/site.css (Kopf, Hero, Angebot, Ablauf, helles Band, Tools-Vorschauen, Regal, Formular; der Premium-Block von Runde 1 wird ersetzt)
- site/public/site.js (neu, lokal, etwa 40 Zeilen: Leiste nach 8px, Einblendung, Marker zeichnen)
- site/src/layout.mjs (Leiste, Vorschau-Chip, Skript), site/src/pages/paper.mjs (Papier-Baustein), site/src/pages/home.mjs, site/src/pages/product.mjs (Preisblock, Hero-Blatt)
- site/data/snapshot.mjs (site.js mitkopieren), .claude/skills/scutoria-brand/SKILL.md (Markendatei)

## Papier: Zustände

- Ruhe: 2 Grad gedreht; das hintere Blatt 14px rechts, 10px tiefer, nur eine Kante.
- Laden: setzt sich einmal aus 16px tiefer und 2,5 Grad in 700 ms (ease-out).
- Hover und Fokus, nur bei verlinkten Blättern (Muster): hebt 8px, Schatten tiefer, 200 ms.
- Reduzierte Bewegung: Endzustand sofort, kein Weg.
- Größen: Hero min(440px, 100%), Muster 160px, Miniaturen in den Ablauf-Bildern.

## Inhalt des Hero-Blatts (nur echte Zeilen)

D1 des Beispielbetriebs: Laufzeile „AP-2026-MUSTER · D1“ und „2026-10-19 · Example“, Titel und Untertitel wie bisher in paper.mjs, danach § 1, § 2, § 3 mit je einem festen Satz aus policy.mjs, Unterschriftszeile „Place, date, signature of the management“, Fußzeile „Source-based. No legal advice.“ Die Markerformen stehen nicht auf den Richtlinienzeilen, denn die Richtlinie trägt keine Marker; sie stehen im Marker-Band und auf dem Handbuch-Muster.

## Abweichungen vom Brief, bewusst

- Markerformen nicht auf den Hero-Zeilen (Grund oben).
- Leise Dynamik aus Option A: die Linie im Ablauf füllt sich beim Scrollen (CSS), die Ampeln in der Tool-Vorschau atmen, der Slogan erscheint in drei Schlägen, Sektionen blenden gestaffelt ein.
- Karten behalten den Radius-Token 20px statt 16px.
- Die Startseite hat zwei verkaufte Toolkits; die zwei Hero-Knöpfe bleiben die zwei Produktlinks (der Brief kennt nur eines).
