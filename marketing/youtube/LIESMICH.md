# YouTube und Instagram: Überblick und offene Entscheidungen

Stand 29. Oktober 2026, 23:20 Uhr (Wien). Von Stefan am 29. Oktober 2026 geprüft und freigegeben („Überprüft freigegeben“), auf Nachfrage ausdrücklich auch die zehn Empfehlungen unten und alle zwanzig Skripte zur Vertonung. Nichts ist veröffentlicht, kein Konto angelegt, nichts gekauft, kein Schlüssel eingerichtet; das Wort „öffentlich“ je Video bleibt ein eigener Schritt (Tor Veröffentlichen), und jede Änderung an einem Skript nach der Freigabe braucht Stefans erneute Prüfung (KENNZEICHNUNG.md, Abschnitt 4.3). Produktion kann beginnen, sobald du die Entscheidungen unten getroffen hast; öffentlich wird das erste Video erst nach dem Live-Gang der Website mit geprüftem Impressum.

## Was hier liegt

| Datei | Inhalt | Für dich |
|---|---|---|
| `KONZEPT.md` | Zielgruppe, Kanalversprechen, Tonlage, Formatlogik Short zu Langvideo zu Website, Nachweis, dass alles ohne Gesicht und Namen funktioniert | lesen, freigeben |
| `KANAL.md` | Einrichtung YouTube und Instagram: Kanalstruktur (Entscheidung), Name, Handle, Beschreibung EN und DE, Profilbild und Banner, Links, Endscreens, Playlists, Einstellungen, Impressumspflicht in Österreich mit Quellen | lesen, Entscheidung 1 und 2 treffen, dann anlegen |
| `THEMEN.md` | Zehn Langvideo-Themen mit Nutzen, Produktbezug, Suchbegriffen EN und DE, Quellen, Shorts, Reihenfolge mit Begründung | lesen, Reihenfolge bestätigen |
| `VORLAGEN/` | Faktenblatt (einzige Quelle für Produktaussagen), Skript-Vorlage Langvideo, Short-Vorlage, Shotlist, Metadaten (Titel, Beschreibung, Tags, Kapitel, Thumbnail), Produktionsablauf Schritt für Schritt, Hilfsskripte (`sprechtext.ps1`, `pruefen.mjs`, `shorts-zusammenstellen.mjs`, `vertonen.mjs`, `vertonen-tag.ps1`, `video-bauen.mjs`) | nachschlagen |
| `ANIMATION/` | Animierte Erklärwelt: Probe 01, Video 01 komplett (`video-01/`, ein Akt je Skriptabschnitt), Bausteine (`lib/`), `rendern.mjs` (nimmt eine Szene Bild für Bild auf und setzt sie mit dem Ton zusammen), `woerter.py`, `ausrichten.py`, `marken.py`, `ton-fassung.py` (Tonspur neu schneiden, Stimmlage angleichen), `tonhoehe.py` und `stimmlage.py` (Tonhöhe messen); Vorlage für weitere Videos in `VORLAGE-PARALLEL.md` (seit 30. Oktober 2026) | Probe ansehen, Richtung entscheiden |
| `SZENEN/` | Szenenpläne je Video und Sprache für den automatischen Bild- und Schnittweg (welche Seite, PDF-Seite oder Textkarte zu welchem Absatz; seit 30. Oktober 2026 für Video 01) | nachschlagen |
| `SKRIPTE/` | Zehn Sprechskripte, je Englisch (`.en.md`) und Deutsch (`.de.md`), mit Metadaten, Bildschirmanweisungen, Quellenzeilen und Regie-Tabelle | je Video lesen und freigeben |
| `SHORTS.md` | Alle Shorts und Reels (Hook, Sprechtext EN und DE, Bildidee, Verweis, Priorität); Teildateien je Thema unter `SHORTS-TEILE/` | je Welle lesen und freigeben |
| `GEMINI-STIMME.md` | Googles Angebote für die Stimme, Empfehlung (AI Studio, Gemini 3.8 Flash TTS, Free-Tier), Kosten je Minute mit Quelle, Anleitung ohne Code, Stilanweisung, Aussprache | lesen, Entscheidung 3 treffen, Stimme wählen |
| `KENNZEICHNUNG.md` | Was Scutoria selbst kennzeichnen muss: YouTube-Regel, Instagram-Regel, Artikel 50 nach der Änderungsverordnung, die eigene Checkliste D5 ausgefüllt, Wortlaut aller Hinweise, Prüfprotokoll | lesen, Weg bestätigen |
| `PLAN.md` | Zwölf Wochen, Takt, Aufwand je Woche für dich, was Claude übernimmt, Anpassungsregeln | lesen, Entscheidung 4 treffen |
| `ASSETS/` | Profilbild, Banner, Endscreen-Hintergrund, Thumbnail-Vorlage als HTML und fertige PNG; `rendern.ps1` erzeugt die PNG neu aus den HTML-Dateien mit dem vorhandenen Edge | ansehen, hochladen, wenn der Kanal steht |

## So fängst du an (Woche 0 nach PLAN.md)

1. Google-Konto für die Marke bestimmen oder anlegen (Entscheidung 10); YouTube-Kanal und Instagram-Konto nach `KANAL.md` einrichten, nichts hochladen. Claude prüft die Profile danach gegen KANAL.md.
2. `GEMINI-STIMME.md`, Abschnitt 5: AI Studio öffnen, drei Stimmen mit dem Testtext anhören, eine wählen; die Wahl trägt Claude in GEMINI-STIMME.md ein.
3. `VORLAGEN/PRODUKTION.md`, Schritt 0 und 3: Aufnahmeprofil einrichten, die Standardaufnahmen A1 bis A18 aufnehmen, die Shotlist von Video 01 abarbeiten.
4. Sprechtext von Video 01 mit `VORLAGEN/sprechtext.ps1` erzeugen, Stimme erzeugen, schneiden, als „nicht gelistet“ hochladen; Claude prüft; dein Wort macht es öffentlich, frühestens nach dem Live-Gang der Website mit geprüftem Impressum (Entscheidung 6).

## Entscheidungen vom 29. Oktober 2026 (Stefan: alle zehn wie empfohlen)

| Nr. | Frage | Optionen | Entschieden | Warum |
|---|---|---|---|---|
| 1 | Kanalstruktur YouTube | A ein Kanal, Videos je Sprache, Sprach-Playlists, übersetzte Metadaten · B zwei Kanäle · C ein Video mit zwei Tonspuren | A, später C prüfen | Eine Marke, ein Impressum, Abonnenten zusammen; C braucht erweiterte Funktionen, die ein neuer Kanal nicht hat |
| 2 | Handle | `@scutoria` · `@scutoria_eu` · `@scutoriatoolkits` | `@scutoria`, sonst `@scutoria_eu` | Kürzester Name, gleich auf YouTube und Instagram; ob frei, zeigt sich beim Anlegen |
| 3 | Stimme | A Google AI Studio, Gemini 3.8 Flash TTS, Free-Tier, du klickst · B Claude vertont über die Gemini-API mit einem Schlüssel aus deinem Google-Konto · C Google Cloud Text-to-Speech | A zum Start; B, sobald der Takt läuft und dir das Einfügen zu viel Zeit kostet | A kostet nichts und braucht keine Einrichtung; B spart dir etwa eine Stunde je Woche, verlangt aber einen Schlüssel (Tor Geld, auch wenn der Free-Tier reicht) |
| 4 | Takt der Shorts | A vier Shorts je Sprache und Woche (alle vierzig in zehn Wochen) · B zwei je Sprache und Woche, Rest in Woche 11 und 12 | A, mit der Rückfallregel aus PLAN.md | Die Shorts eines Themas nutzen die Aufnahmen des Langvideos; später nachzuproduzieren kostet mehr |
| 5 | Reihenfolge der Themen | A wie THEMEN.md (Problemvideo, Problemvideo, Rundgang, dann abwechselnd) · B Rundgang zuerst | A | Zwei Problemvideos holen Suchende; der Rundgang als drittes Video hat dann Zuschauer, auf die Endscreens zeigen |
| 6 | Startzeitpunkt | A erstes Video öffentlich erst nach Live-Gang der Website mit geprüftem Impressum · B früher, nicht gelistet an Bekannte | A | Impressumspflicht für den Kanal (KANAL.md, Abschnitt 7) und die Links in jeder Beschreibung führen auf die Website; du hast keine Bekannten als Kunden (F4) |
| 7 | Instagram | A jetzt anlegen, nur Reels und Bio · B später | A | Gleicher Aufwand wie ein Upload; das Handle ist dann reserviert |
| 8 | Kennzeichnung | A beide Wege: Hinweis in Stimme, Bild und Beschreibung, dazu deine dokumentierte Prüfung mit Impressum als redaktionelle Verantwortung · B nur Hinweis | A | Die Stimme ist nach unserer Lesung kein Deepfake, die Skripte sind aber KI-entworfene Texte zu Angelegenheiten von öffentlichem Interesse; mit beiden Wegen hängt nichts an einer Lesung (KENNZEICHNUNG.md, 4.3) |
| 9 | Monetarisierung | A keine Bewerbung in den ersten zwölf Wochen · B bewerben, sobald möglich | A | Der Kanal verkauft das Toolkit, nicht Werbezeit; YouTubes Regeln zu KI-Inhalten und Personas sind in Bewegung |
| 10 | Google-Konto | Welches Google-Konto trägt den YouTube-Kanal und AI Studio | ein eigenes Konto für Scutoria (kontakt@scutoria.com oder ein neues Google-Konto) | Marke und Person getrennt (E8); Claude kann dir die Schritte zum Anlegen aufschreiben, legt es aber nicht an |

Nachtrag 30. Oktober 2026: Stefan hat seinen Gemini-API-Schlüssel genannt (liegt außerhalb des Scutoria-Ordners). Damit läuft die Vertonung über `VORLAGEN/vertonen.mjs` (GEMINI-STIMME.md, Abschnitt 2); Stefan hört ab statt zu klicken. Stimmproben für Charon, Schedar, Sadaltager und Sulafat liegen unter `C:\Users\Stefa\Videos\scutoria\stimme-proben\`; Stefan wählte am 30. Oktober Charon für Video 01. Der Free-Tier erlaubt zehn Anfragen je Tag und Modell (GEMINI-STIMME.md, Abschnitt 2); Video 01 ist deshalb erst zu zwei von sieben Abschnitten vertont (EN). Stefan entschied am 30. Oktober Weg B: Google AI Pro abonnieren, mit dem Wissen, dass das Abo nur die Oberfläche von AI Studio betrifft. Nachtrag 30. Oktober, 13:25 Uhr (Wien): Stefan will nicht eingebunden sein; deshalb ist die automatische Vertonung über die API der Standardweg (Claude startet sie, Stefan hört ab). Video 01 ist in beiden Sprachen fertig vertont, mit dem Lite-Modell und Charon, unter `C:\Users\Stefa\Videos\scutoria\lite\01-ai-rules-start\stimme\` (EN 12,5 min, DE 13,3 min). AI Studio mit dem Abo bleibt für eigenes Klicken; der Download aus dem Browser-Fenster der App geht dort nicht. Entscheidung Stefan, 30. Oktober: Video 01 wird am 31. Oktober mit Flash neu vertont, danach die weiteren Videos im Takt von zwei je Tag (`VORLAGEN/vertonen-tag.ps1`). Die Tagesläufe startet Claude in der jeweils nächsten offenen Sitzung; keine geplante Aufgabe in Windows (Stefan, 30. Oktober). Reihenfolge der Läufe: 31.10. Video 01 und 02, dann je Tag die nächsten zwei nach THEMEN.md, danach die Shorts nach Priorität. Nachtrag 30. Oktober, 16:00 Uhr (Wien): Video 01 ist in beiden Sprachen komplett gebaut, Bild und Ton, ohne Aufnahme und ohne Schnitt von Hand: `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\export\01-ai-rules-start.en.mp4` (12,5 min) und `01-ai-rules-start.de.mp4` (13,3 min), je mit SRT; Standbilder zur Prüfung unter `…\01-ai-rules-start\stills\`. Werkzeug: `VORLAGEN/video-bauen.mjs` mit den Szenenplänen `SZENEN/01-ai-rules-start.en.json` und `.de.json` (PRODUKTION.md, Schritt 3). Die Stimme ist noch die Lite-Probe; am 31. Oktober kommt Flash, danach wird das Video ohne neue Bilder neu zusammengesetzt. Was du prüfen solltest: ein paar Minuten ansehen, ob die Bildwechsel zum Gesprochenen passen (die Grenzen sind geschätzt, ein bis drei Sekunden Versatz sind möglich) und ob dir die Bildsprache reicht (Seiten des Angebots, Handbuch, Muster-PDFs, Textkarten); Stellen melden, Claude verschiebt sie im Szenenplan. Entscheidung dabei keine; wenn du nichts sagst, baut Claude die weiteren Videos auf demselben Weg. Nachtrag 30. Oktober, 17:20 Uhr (Wien): Du hast die Fassung mit Bildschirmfotos mit Note 5 bewertet und einen neuen Gestaltungsauftrag gegeben. Daraufhin entstand eine Probe von 61 Sekunden in einer eigenen animierten 2D-Welt (Figuren ohne Gesicht, Weg der Schritte, Register, Zugangswege, Anbieter), auf der unveränderten deutschen Tonspur: `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\probe\probe-01-animation.de.mp4`. Szene, Renderer und Storyboard unter `ANIMATION/` (`ANIMATION/probe-01/STORYBOARD.md`). Der Weg mit Bildschirmfotos (`video-bauen.mjs`) ruht, bis du über die Richtung entschieden hast. Nachtrag 30. Oktober, 22:30 Uhr (Wien): Du hast die Probe mit Note 1 bewertet und „Passt, weiterbauen“ gesagt. Video 01 ist jetzt komplett in der animierten Erklärwelt gebaut, alle sieben Abschnitte, Deutsch und Englisch, auf der Lite-Tonspur: `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\animation\01-ai-rules-start.animiert.de.mp4` (13:39 mit 20 Sekunden Endbild) und `.en.mp4` (12:49). Szenen, Storyboard und Bausteine unter `ANIMATION/video-01/` und `ANIMATION/lib/`. Die Wortzeiten kommen aus Whisper mit Pausenerkennung und werden auf den freigegebenen Sprechtext gelegt (`ANIMATION/ausrichten.py`); mit der Flash-Stimme werden nur die Wortzeiten neu ermittelt, die Szene bindet sich selbst neu. Was du prüfen solltest: das Video ansehen und eine Note geben; offene Fragen stehen in `ANIMATION/video-01/STORYBOARD.md` unter „Abweichungen“. Der Weg mit Bildschirmfotos ist damit abgelöst. Nachtrag 30. Oktober, 23:55 Uhr (Wien): Fassung 2 von Video 01 nach deinem Hinweis (Stimmlage unterschiedlich; Werbung für Scutoria und KI-Hinweis erst am Schluss; Einstieg mit einer Frage). Ergebnis: `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\animation\01-ai-rules-start.animiert.fassung2.de.mp4` (13:51 mit Endbild) und `.fassung2.en.mp4` (13:09), je mit `.klein.mp4`. Der Einstieg fragt jetzt „Nutzt Ihre Belegschaft schon KI-Tools, ohne dass der Betrieb etwas entschieden hat?“ (neu vertont mit Flash); der Block „Hier ist Scutoria … keine Rechtsberatung“ steht am Schluss vor „Als Nächstes“, als eigene Bühne. Der Bildschirmtext ab Sekunde 0 und die Marke „Synthetische Stimme“ bleiben; die Abweichung von der Regel „gesprochen in den ersten 20 Sekunden“ ist in KENNZEICHNUNG.md, Abschnitt 6, als deine Entscheidung vermerkt, das Prüfprotokoll hat eine Zeile für Fassung 2. Die Tonspur ist jetzt die Flash-Stimme; die Stimmlage ist je Satz und über die Zeit angeglichen (Spanne der Minutenmittel Deutsch von 2,3 auf 0,6 Halbtöne, Englisch von 2,6 auf 0,7). Dabei fiel auf: Flash spricht die Marke `<short pause>` an Abschnittsenden teils mit („Pause“, „Short pause“); in Video 01 sind diese Stellen herausgeschnitten, Video 02 hat sie noch (Englisch sechs Stellen). `VORLAGEN/pruefen.mjs` meldet für 01 jetzt erwartungsgemäß „Kennzeichnungssatz am Schluss fehlt“, weil der lange Block den kurzen Schlusssatz ersetzt. Was du prüfen solltest: das Video ansehen und die Fassung 2 des Skripts freigeben (Kopfzeile der beiden Skripte); dazu entscheiden, ob Frage-Einstieg und Hinweis am Schluss auch für 02 bis 10 gelten.

Folgen der Entscheidungen, eingetragen am 29. Oktober 2026: KANAL.md Abschnitt 1 und 2 (Option A, Handle `@scutoria`, sonst `@scutoria_eu`), GEMINI-STIMME.md Abschnitt 2 (AI Studio, Free-Tier; API-Schlüssel erst auf erneutes Wort), PLAN.md Abschnitt 1 (vier Shorts je Sprache und Woche mit Rückfallregel), KENNZEICHNUNG.md Abschnitt 4.3 und 7 (beide Wege; Prüfprotokoll mit zwanzig Zeilen). Die Skripte tragen die Freigabe in der Kopfzeile. Die vierzig Shorts in SHORTS.md sind mit der Gesamtfreigabe freigegeben; ihr Prüfvermerk steht je Short beim Upload im Prüfprotokoll.

## Was vor dem ersten Upload noch zu prüfen ist (Stand prüfen)

- Artikel 50 und Artikel 3 Nr. 60 bei EUR-Lex erneut lesen; in dieser Sitzung war EUR-Lex nicht erreichbar, der Wortlaut kam vom AI Act Service Desk der Kommission (KENNZEICHNUNG.md, offene Punkte 1 und 2).
- Die Leitlinien der Kommission, Rn. 113 bis 124, zur Stimme als Merkmal einer Person am Original lesen.
- Metas Transparenz-Seite zu „AI info“ und den Hinweis beim Teilen eines Reels in der App prüfen.
- Free-Tier-Grenzen und Höchstlänge je Lauf in AI Studio ablesen; Nutzungsbedingungen des Free-Tier lesen.
- Impressum der Website: Satz zu YouTube und Instagram ergänzen, Rechtsprüfung (Tor Recht, LIVE-GANG.md).
- Ob der Handle frei ist; ob YouTube dem neuen Kanal „Related video“ für Shorts freigibt (erweiterte Funktionen).

## Was Claude als Nächstes tun kann, sobald du entschieden hast

- Die Profile im Browser gegen KANAL.md prüfen, sobald sie angelegt sind.
- Je Video die Overlay-Liste (Bildschirmtexte und Quellenzeilen in Reihenfolge) und das Thumbnail aus der Vorlage erzeugen.
- Die Untertitel korrigieren, wenn du die SRT-Datei ablegst.
- Mit API-Schlüssel die Vertonung übernehmen (Entscheidung 3 B).
- Nach vier Wochen das erste Lagebild aus YouTube Studio schreiben.

## Stand der Skripte (Prüfung vom 29. Oktober 2026)

Geprüft mit `node marketing/youtube/VORLAGEN/pruefen.mjs`: Wortzahl des reinen Sprechtexts, verbotene Wörter, Ausrufezeichen, Gedankenstriche, Namen, Kennzeichnungssätze am Anfang und Schluss, Preissatz genau einmal, kein Preis in Shorts, Quellenzeilen. Ergebnis: kein Befund. Die Heuristik „Zahl ohne Quellenzeile“ meldet nur Produktzahlen (Fragen, Dokumente, offene Punkte, Preis), die per Bildschirmanweisung auf Produktseite oder Handbuch gezeigt werden; die Konvention steht im Faktenblatt, Abschnitt 9.

| Skript | EN Wörter (etwa Minuten bei 150) | DE Wörter (etwa Minuten bei 125) | Quellenzeilen je Fassung |
|---|---|---|---|
| 01 KI-Regeln: womit anfangen | 1 994 (13,3) | 1 842 (14,7) | 15 |
| 02 Sicherheitsfragebogen | 1 992 (13,3) | 1 790 (14,3) | 20 |
| 03 Rundgang durch beide Toolkits | 1 869 (12,5) | 1 710 (13,7) | 34 |
| 04 Was nie hinein darf | 1 909 (12,7) | 1 774 (14,2) | 13 |
| 05 Artikel 4 | 1 984 (13,2) | 1 865 (14,9) | 12 |
| 06 MFA, Sicherung, Updates | 1 964 (13,1) | 1 789 (14,3) | 13 |
| 07 Artikel 50 | 1 932 (12,9) | 1 869 (15,0) | 25 |
| 08 Erste Stunde, 72 Stunden | 1 971 (13,1) | 1 768 (14,1) | 14 |
| 09 Sieben Fragen je Tool | 1 973 (13,2) | 1 847 (14,8) | 17 |
| 10 NIS2 | 1 981 (13,2) | 1 860 (14,9) | 26 |
| Shorts | 40, je EN 167 bis 216 Wörter | je DE 143 bis 198 Wörter | je Short eine bis drei |

Die deutschen Fassungen laufen bei 125 Wörtern je Minute auf 14 bis 15 Minuten, also am oberen Rand deines Rahmens. Wenn dir zwölf Minuten wichtiger sind, ist Abschnitt 4 (Beleg) die Stelle zum Kürzen; die tatsächliche Sprechgeschwindigkeit der gewählten Gemini-Stimme entscheidet, und sie wird beim ersten Video gemessen.

## Hinweise aus dem Schreiben, die du sehen solltest

- Produktzahlen tragen je nach Skript eine Produkt-Quellenzeile (02, 03, 09) oder nur die Bildschirmanweisung auf die Seite (01, 04 bis 08, 10). Beides ist zulässig; auf Wunsch zieht Claude die Zeile überall nach.
- Video 03 sagt nach dem Preissatz, dass der Gründerpreis je Toolkit zählt (E21). Wenn du das als zweite Preisaussage siehst, wird der Satz gestrichen.
- Video 05 spricht die Vorbelegungen des Beispielbetriebs für Wiederholung und Aufbewahrung der Einweisung („bei jedem neuen Tool und jährlich“, „fünf Jahre“) als dessen eigene Entscheidung ohne Rechtsquelle; die Lücke wird so genannt.
- Video 06 zitiert im Unsicher-Teil zum Passwortwechsel die ENISA-Angabe aus dem Handbuch-Kasten (Juni 2025, Seite 142); das ist die Zitatangabe des Kastens, keine eigene Quellenzeile des Handbuchs.
- Video 08 spricht nur die Nummern, die im Handbuch stehen (Hotline der Wirtschaftskammern, CERT.at, 133, 112, 110), und sagt, dass die Karte vor dem Druck geprüft wird; die Nummern der Datenschutzbehörde und des BSI Service-Center auf der Musterkarte werden nicht gesprochen.
- Video 10 markiert die Einordnung „ein Elektroinstallateur ist Handwerk, nicht Herstellung elektrischer Ausrüstungen“ als Auslegung, weil keine Quelle sie trifft.
- Endscreens: Die Regie-Tabellen nennen als nächstes Video entweder das der Reihenfolge oder den Rundgang 03; beim Upload wird nach PLAN.md gesetzt.
- Video 07 zeigt in Abschnitt 5 die eigene Kennzeichnung des Kanals als zweites Beispiel; das ist Absicht (KENNZEICHNUNG.md, Abschnitt 5).

## Fertig heißt

Du öffnest diese Datei, wählst ein Thema, gibst das Skript frei, erzeugst mit `VORLAGEN/sprechtext.ps1` den Sprechtext, gibst ihn in die Gemini-Stimme (GEMINI-STIMME.md, Abschnitt 5) und nimmst die Shots nach der Regie-Tabelle am Ende des Skripts auf (SHOTLIST.md, Codes A1 bis A18). Den Rest beschreibt PRODUKTION.md.
