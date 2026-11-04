# Abschlussbericht zum Prüfauftrag vom 3.11.2026 (F01 bis F08)

Stand 4.11.2026. Grundlage: `_berichte/2026-11-03-Livepruefung-und-Produktstrategie/ARBEITSAUFTRAG-FUER-CLAUDE.md` und `BERICHT.md`. Zwei Stände werden getrennt geführt: der Quellstand (`site/` im Projektordner, lokal geprüft) und der Deployment-Stand (scutoria.com, Lovable-Veröffentlichung 2a3a59ee vom 3.11.2026). Heute wurde nichts veröffentlicht und keine Lovable-Runde gefahren (0 Credits). Rechtstexte, Preise und Veröffentlichungen bleiben bei dir (drei Tore).

## Befunde

| Nr. | Status | Fundstelle | Änderung | Prüfung | Verbleibende Grenze |
|---|---|---|---|---|---|
| F01 Platzhalter Impressum und AGB | vorbereitet, nicht live | `site/content/legal/impressum.de.md` 23, 24, 25, 30, 34; `legal-notice.en.md` gleich; `agb.de.md` 10, 14, 20, 24, 40; `terms.en.md` gleich | Platzhalterliste mit Zuständigkeit je Klammer (`F01-PLATZHALTER-IMPRESSUM-AGB.md`), acht Diffs Live gegen Entwurf A und B (`F01-diffs/`), Belege für zwei Klammern (Gewerbebehörde, Streitbeilegung) mit Quelle und Abrufdatum; Anschrift Kleinpoppen 18 in den Entwürfen | Diff-Zählung: Impressum 12, AGB 17, Legal notice 12, Terms 15 geänderte Zeilen je Variante; Datenschutz und Widerruf 0 Unterschied | Gewerbe-Wortlaut, Fachgruppe, Steuervariante und UID fehlen (Stefan); Fassungsdatum beim Live-Gang; kein pauschales Streichen von „Stand prüfen“ |
| F02 Videozähler | im Quellstand umgesetzt | `site/src/cinema.mjs` 231, 235, 403; `site/src/pages/home.mjs`; `site/src/pages/studio.mjs`; neu `site/src/studio-data.mjs`; `site/content/studio.json` | Zähler, Status und Ziel kommen aus `studio.json` (zehn Erklärvideos, zwölf Shorts, zwei in Produktion, keines veröffentlicht; vierzig nur als „angelegt“ mit Quelle im Datensatz); Zahlwörter wie auf der Seite üblich | Lokal in beiden Instanzen: Startseite DE/EN und Studio DE/EN zeigen die abgeleiteten Texte, „vierzig Shorts“ nur im Zielsatz | Deployment zeigt noch „vierzig Shorts“ bis zur nächsten Runde; Spiegel bei Lovable `src/legacy/…` plus `content/studio.json` |
| F03 Einrichtungsversprechen | Textvorschlag, nicht geändert | `site/src/i18n.mjs` 44 und 89; Kundenfrage in `produkte/PLANUNG-2026-11.md` 40 | Vorschlag A (Empfehlung) und B in beiden Sprachen mit Diff (`F03-TEXTVORSCHLAG-KI-EINRICHTUNG.md`); Bauplan Toolkit 03 bekam denselben Rahmen | Volltextsuche nach „unbemerkt“ und „unnoticed“: nur die zwei Zeilen und die Kundenfrage | Freigabe des Wortlauts durch dich, dann Quellstand und Lovable |
| F04 Jahreswert und Lizenz | Matrix fertig, eine Korrektur im Quellstand | Produktseite Fakten; AGB § 2, 8, 9; `shop/session.mjs`; `toolkit/routes.mjs`; `shop/routes.mjs`; Lovable-Datenbank | Lizenzmatrix (`F04-LIZENZMATRIX.md`): Generator, Dokumente, Handbuch, Aktualisierungen, Zugang nach Ablauf, Löschfrist, Erinnerung, Widerruf, Zahlung. Korrektur F04-1: Lauf nach Lizenzende nur lesbar (`canEditRun`), Hinweis auf der Dokumentseite, kein „Weiter“ im Konto. Löschjob bei Lovable gelesen (`scutoria-retention-daily`, täglich 03:00 UTC, `apply_retention()`: 90 Tage ohne Lizenz, zwölf Monate nach Lizenzende) | 28 Prüfpunkte an einer lokalen Live-Instanz mit abgelaufener und gültiger Lizenz bestanden; Vorschaumodus unverändert offen | Erinnerung: Endpunkt fertig, Schalter „off“, kein Job (F04-3, deine Entscheidung); Aktualisierungssatz in AGB § 9 (F04-2, Tor Recht); F04-1 noch nicht bei Lovable |
| F05 Textflächen und Poster | Mockup, nicht umgesetzt | Startseite Studio-Modul und Produktkarten, Studio-Seite Poster | Poster-Szenen aus dem Ablauf (Tool-Register mit offener Zeile, Selbstauskunft mit Zählern, datierte Nachweisseite), Karten mit Blatt aus der Leseprobe, Studio kompakt; nur echte Begriffe und Zahlen aus den Dokumenten | Bilder 1440 und 390 px in `mockups/`; keine Überläufe | Umsetzung nach P5 und P6 |
| F06 Breite, H1, Knöpfe, Hero mobil | Mockup, nicht umgesetzt | `cinema.css` `.wrap`, `.cine-h1`, `.cine-stage__copy`; `bundle.css` `.sc-btn` | 1240 px Inhalt, H1 zwei Zeilen ohne `<br>`, 8 px Ecken, Hero mobil 673 statt 800 px | Vergleichsbilder 1160 gegen 1240 bei 1440 px; H1 in beiden Sprachen zwei Zeilen; Handy gemessen | Entscheidungen P1 bis P4 |
| F07 Bewegung | Mockup und Werte, nicht umgesetzt | `cinema.css` Hero-Eintritt, Hover, Reduced Motion; Demo neu | Hero 560 ms, Themenwahl 180 ms, Demo 320 ms nach Klick, Hover 3 bis 4 px; Reduced Motion zeigt Endzustände | im Mockup Endzustände geprüft (Chrome ohne Fenster mit reduzierter Bewegung) | vollständiger Laufzeittest mit Systemeinstellung in der Umsetzung |
| F08 Gestaltungsquellen | gemessen, Plan, nicht umgesetzt | fünf Stylesheets, `cinema.css` Scrims und Schatten | Messung 4.11.2026 (gzip): CSS 31,7 kB, HTML 9,8 kB, JS 7,4 kB, Hero-Bild 118 kB, Schriften 40 kB; keine `Cache-Control` auf statischen Dateien; Token-Plan für Scrims, Schatten, Papier, Lampen | Werte in `PAKET2-MOCKUPS.md` Abschnitt 2.10 | Inventur je Stylesheet und Lighthouse vorher/nachher in der Umsetzung; keine Löschung alter Dateien |

## D5: roter Test (Seitenzahl des englischen Antwortschreibens)

Reproduziert und erklärt (`_berichte/2026-11-04-D5-Seitenzahl/BEFUND.md`): Drei Termine im Dokument rechnen aus dem Tagesdatum; das englische Dokument sitzt mit 1,6 pt auf der Seitenkante, an 290 von 457 Tagen zwei Seiten, sonst drei; der Lovable-Lauf „EN 2“ passt zum UTC-Datum 3.11. Empfehlung: Option A (Test mit festem Datum und Strukturprüfung statt starrer Seitenzahl), Option B (Hinweisabsatz nie allein auf einer Seite) in die nächste Layoutrunde, Option C (Text kürzen) nur mit deiner Freigabe. Bei Lovable wurde nichts geändert.

## Pakete

- Paket 1: erledigt, siehe Tabelle. Quellstand geändert für F02 und F04-1; Rechtstexte und Versprechen nur als Vorlagen.
- Paket 2: Mockups geliefert (`PAKET2-MOCKUPS.md`, Bilder in `mockups/`), Umsetzung wartet auf P1 bis P7.
- Paket 3: Planung wird von einem Unteragenten bereinigt (`produkte/PLANUNG-2026-11.md`, Protokoll `PAKET3-PLANUNG.md`); Nachtrag unten, sobald fertig. Die Baupläne für Toolkit 03 und den E-Book-Verkauf laufen in eigenen Sitzungen.

## Nächste Lovable-Runde (nach deinem Wort)

Inhalt: F02 (fünf Dateien), F04-1 (drei Dateien), D5 Option A (eine Testdatei), dazu Vitest-Fälle in `src/test/` nach den 28 Prüfpunkten; nach Freigabe F03 (eine Datei) und, wenn GISA und Steuerantwort da sind, F01 Variante A oder B (vier Dateien). Paket 2 folgt als eigene Runde nach P1 bis P7. Schätzung: 3 bis 5 Credits für die erste Runde, 6 bis 12 für Paket 2. Veröffentlichung nur auf dein Wort, danach Prüfung von außen wie bisher.

## Deine Entscheidungen, gesammelt

1. F03: Vorschlag A oder B.
2. F01: Option 1 (warten auf GISA und Steuer, dann alles) oder Option 2 (Zwischenfassung jetzt).
3. F04-2: Aktualisierungssatz Option A (Text angleichen) oder B (Code: einfrieren).
4. F04-3: Erinnerung Option A (Job anlegen, Schalter an) oder B (Satz streichen).
5. Paket 2: P1 bis P7.
6. Lovable-Runde mit F02, F04-1 und D5 Option A: ja oder später.

## Nachtrag Paket 3 (4.11.2026, nach dem Unteragenten)

`produkte/PLANUNG-2026-11.md` ist bereinigt (275 Zeilen neu, 53 geändert; Protokoll `PAKET3-PLANUNG.md`): E37, E38 und E41 überall eingearbeitet, Überholtes gekennzeichnet statt gelöscht (Abschnitt 9); 29 plus 29 Themen als Reserve, verbindlich nur 03, 08, 12, 05, 09 mit je einer Produktkarte (neuer Abschnitt 5a, Bau und Pflege getrennt); Toolkit 03 auf neun Kontotypen begrenzt mit Anbieterquelle und Abrufdatum 4.11.2026 je Zeile und vierteljährlicher Prüfung; neuer Abschnitt 4a mit den Regeln E-Book, Handbuch, Toolkit und „keine Doppelinhalte“; neuer Abschnitt 5.4 zur Logik von 12 und 16 (vier Überschneidungen, Empfehlung B: abgrenzen, gemeinsame Vorfallsprotokoll-Vorlage); Nachfrage ohne Daten durchgestrichen oder als Annahme gekennzeichnet (5.3); Quellen Q31 bis Q50 mit Abrufdatum. Neue Entscheidungen für dich: F9 (Zuschnitt 12 und 16, Empfehlung B), F10 (E-Book 27 in jedem Toolkit, Empfehlung A), F11 (E-Book-Maschine nach Toolkit 03, Empfehlung A). Zwei Hinweise an den Bauplan Toolkit 03: Der Versprechenssatz in Abschnitt 1 war im Nachtrag der Bauplan-Sitzung schon entfernt (der Unteragent hatte nur die committete Fassung gelesen); die Unsicherheit zur Trainings-Voreinstellung bei Claude-Verbraucherkonten hat Claude in `produkte/ai-setup-toolkit/quellen.md`, Abschnitt 7, Punkt 5 nachgetragen. Die Entscheidung F10 (E-Book 27) muss nach deinem Wort in Tabelle 1.1 des Bauplans E-Book-Verkauf nachgezogen werden.
