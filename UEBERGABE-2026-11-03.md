# Übergabebericht Scutoria

Stand 3. November 2026, 20:15 Wiener Zeit. Verfasst von Claude (Claude Code, Modell Claude Fable 5.1) für Stefan Dallinger und für jede KI, die ohne Zugriff auf den bisherigen Chat weiterarbeitet. Grundlage sind die Projektdateien im Ordner `C:\Users\Stefa\OneDrive\scutoria` (`STAND.md`, `ENTSCHEIDUNGEN.md`, `AUFGABEN.md`, `LIVE-GANG.md`, `BERICHT-2026-10-23.md`, `live/FREIGABE-START.md`, `live/FREIGABE-RECHTSTEXTE-2026-11.md`, `produkte/PLANUNG-2026-11.md`, `lovable/*.md`, `design/cinema-2026-11-03/BERICHT.md`), die Regeln in `CLAUDE.md` und `.claude/skills/scutoria-brand/SKILL.md` sowie der Verlauf der Sitzungen vom 2. und 3. November 2026. Nichts ist geschätzt; wo eine Angabe nicht belegbar ist, steht „nicht ermittelbar“ mit Grund, wo sie unsicher ist, „Stand prüfen“ oder „unsicher“.

Hinweis zum Zeitpunkt: Der Hauptteil beschreibt den Stand um 20:15, als bei Lovable noch eine Arbeitsrunde lief (Abschnitt 4.2). Der Nachtrag am Ende enthält das Ergebnis dieser Runde, die Folgerunde, die Veröffentlichung und die Live-Prüfung; wo der Hauptteil „laufend“ oder „noch live“ sagt, gilt der Nachtrag.

---

## 1. Ziel und Zweck des Projekts, Hintergrund und Motivation

**Was Scutoria ist.** Scutoria (scutoria.com) verkauft datierte Dokument-Toolkits an Betriebe in der EU ohne IT-Abteilung, bis etwa fünfzig Beschäftigte. Ein Toolkit ist ein Fragengenerator: Der Betrieb beantwortet Fragen in Blöcken, daraus entstehen datierte, quellenbasierte Dokumente (zum Beispiel KI-Nutzungsrichtlinie, Tool-Register, Schulungsnachweis, Nachweisseite; beim zweiten Toolkit Selbstauskunft Informationssicherheit, Maßnahmenplan, Notfallkarte, Antwortschreiben) als PDF, DOCX und XLSX, dazu ein Handbuch, das jede Frage erklärt und jede Aussage mit einem von vier Markern (Fakt, Auslegung, Unsicher, Lücke) und einer Quelle mit Abrufdatum versieht. Verkauft als Jahreslizenz, seit 3.11.2026 zu 99 Euro pro Jahr je Toolkit (E34). Englisch und Deutsch sind gleichwertig; die Website siezt. Die Marke hat kein Gesicht, keine Beratung, keinen Chat; keine Rechts- oder Steuerberatung.

**Drei Produktarten (E36, 3.11.2026):** Toolkits mit Jahreslizenz zuerst, danach E-Books („Wissen“, Lesewerke im Stil der Handbücher), Videos (YouTube, Langvideos und Shorts) parallel. Dazu frei: zwei Browser-Tools und vier Memo-Generatoren.

**Hintergrund.** Vor dem Neustart lief auf scutoria.com ein alter Shop (zehn Titel, acht freie Tools, Premium 9 Euro im Monat, Render-Dienst `swk-shop`, Stripe live, Brevo), live seit 9. September 2026 mit null Kundenverkäufen (STAND.md, Abschnitt „Live“, 18.10.2026). Am 18. Oktober 2026 begann der Neustart als komplett neues Projekt in einem neuen Ordner (E3), ohne GitHub (E2), mit einem Entscheidungsdossier als Artefakt auf claude.ai. Der alte Shop steht seit 30.10.2026 im Wartungsmodus bei Render und bekommt keinen Verkehr mehr, weil scutoria.com seit dem 30.10.2026 auf Lovable zeigt.

**Stefans Motivation und Rahmen (Fragenkatalog vom 18.10.2026, ENTSCHEIDUNGEN.md):**
- Ziel in zwölf Monaten: „Gewinn bis Dezember 2026.“ (F1)
- Zeit: „Sieben Tage pro Woche, vier bis sechs Stunden täglich.“ (F2)
- Nie selbst machen: „Programmieren, Gespräche, Kundenkontakt. Nur Entscheidungsträger.“ (F3)
- Bekannte mögliche Kunden: „Keine.“ (F4)
- Abbruchkriterium: „Scheitern ist keine Option.“ (F5)
- Was „fertig“ heißt: „Ein Nebenverdienst, der ohne ihn läuft.“ (F6)
- Öffentlich mit Namen: „Nicht namentlich, kein Gesicht.“ (F7)
- Rolle von Englisch: „Hauptteil, weil es in Europa mehr Kunden erreicht.“ (F8)

**Rollen (CLAUDE.md des Projekts):** „Stefan entscheidet, liest, gibt frei. Er programmiert nicht, führt keine Gespräche, hat keinen Kundenkontakt und tritt nicht mit Namen oder Gesicht auf. Einzige Ausnahme: das Impressum, weil das Gesetz es verlangt.“ „Claude baut, schreibt, gestaltet, recherchiert, deployt. Entscheidungen werden als Optionen mit Empfehlung vorgelegt, nie stillschweigend getroffen.“

---

## 2. Anforderungen, Vorgaben, Regeln und Präferenzen

### 2.1 Grundregeln aus `CLAUDE.md` (global, `C:\Users\Stefa\.claude\CLAUDE.md`)

Wörtlich:
- „Antworte immer auf Deutsch.“
- „Das Gedächtnis liegt seit 20.10.2026 in Google Drive › Claude-Gedächtnis (Google-Drive-Konnektor). Zu Beginn einer Sitzung, die Stefans Projekte, Dateien oder das System betrifft, lies dort zuerst `00 START.md` und die passende Übersicht im Ordner `Übersichten`. START regelt Orte, Ablauf, Schreib- und Grundregeln; bei Widerspruch gilt die Übersicht.“
- „Inhalte liegen in OneDrive (`C:\Users\Stefa\OneDrive`), das Gedächtnis nie lokal.“
- „`OneDrive\Notizen` und Obsidian sind aufgelöst; `C:\Obsidian` nie lesen, schreiben oder anlegen.“
- „Scutoria: im Ordner `C:\Users\Stefa\OneDrive\scutoria` gilt die dortige `CLAUDE.md`.“
- „Claude löscht nichts; was weg soll, kommt nach `C:\Users\Stefa\Documents\_zum_loeschen\<Datum Thema>`.“

### 2.2 Arbeitsregeln aus `CLAUDE.md` des Projekts (Stand 18.10.2026)

Wörtlich:
- „Dieser Ordner ist das einzige Projekt. Alte Repositories, Vault-Notizen, das Cowork-Projekt und der Ordner `C:\Users\Stefa\Claude` sind Archiv und werden nicht fortgeführt.“
- „Drei Tore, bei denen Claude immer fragt: Geld (Preise, Abos, Ausgaben), Recht (Texte, die live gehen), Veröffentlichen (Beiträge, Mails an Kunden, Live-Deploys).“
- „Produkte, Website, Tools, Beiträge: Englisch zuerst, Deutsch im selben Lauf.“
- „Dokumente für Stefan: Deutsch, du-Form, knapp, mit Empfehlung. Keine Emojis, keine Gedankenstriche als Einschub.“
- „Belegregel: Jede Zahl, Frist und Rechtsaussage trägt Quelle und Abrufdatum. Was nicht belegbar ist, heißt ‚nicht ermittelbar‘ mit Grund. Keine Rechts- oder Steuerberatung; Unsicheres wird mit ‚Stand prüfen‘ markiert.“
- „Git lokal, kein GitHub. Die Git-Datenbank liegt außerhalb von OneDrive unter `C:\Users\Stefa\.scutoria-git`; der Ordner selbst enthält nur die Zeigerdatei `.git`. Nach jedem Commit sichert ein Hook die Historie als Bundle nach `_archiv/git-history.bundle`.“
- „Der alte Shop (Render-Dienst `swk-shop`, scutoria.com) läuft unberührt, bis der neue live ist. Keine Umgebungsvariablen bei Render, keine Stripe-Einstellungen ohne Stefans Wort.“ (Hinweis: Dieser Satz ist seit 30.10.2026 überholt, scutoria.com zeigt auf Lovable; der alte Shop steht im Wartungsmodus. Die Regel „keine Stripe-Einstellungen, keine Render-Änderungen ohne Stefans Wort“ gilt weiter.)
- „Deploy-Weg: Entscheidung E18 (offen). Kasse und Umsatzsteuer: E19 (offen).“ (E18 ist durch E22, Umzug zu Lovable, abgelöst; E19 ist entschieden: alles über Stripe, Umsatzsteuer klärt der Steuerberater.)
- „Keine Geheimnisse im Ordner. `.env`-Dateien sind ignoriert.“
- „Quellen der Wahrheit: 1. Das Dossier: https://claude.ai/artifact/Svu6tyyfTezCn7naCSo2eY (Entscheidungen in der Datenbank, Sammlungen `entscheidungen` und `fragen`; mit ArtifactData auslesen). 2. `ENTSCHEIDUNGEN.md` (Export), `STAND.md`, `AUFGABEN.md`. Bei Widerspruch gilt das Dossier.“

### 2.3 Markenregeln aus `.claude/skills/scutoria-brand/SKILL.md`

Wörtlich (Auszug):
- „Scutoria sells dated document toolkits to EU businesses with no IT department, up to about fifty staff. English and German are equal. The brand has no face, no founder story, no consulting, no chat.“
- „Voice on the site: ‚Sie‘. Voice inside the documents: ‚du‘. Short sentences, concrete things, numbers often written out. No emoji. No em dash as an aside. No exclamation marks in marketing.“
- „Never write: compliant, certified, secure, safe, ‚meets all requirements‘, ‚GDPR ready‘, ‚AI Act ready‘. Never hide an open point. A complete answer may be ‚not yet, with a date‘. Not legal advice. No customer logos, testimonials, star ratings, or invented counts.“
- „Two worlds, one system. The site is dark. Documents are light paper. Type: Manrope for headings and text, IBM Plex Mono for kickers, sources, markers, prices, document numbers. Both self-hosted. No third font. No Google Fonts. No third-party script, cookie, or tracker.“
- „Accent blue is for the one primary action and for links. Each product line has its own colour. Four markers, always with their shape, never colour alone: fact square, interpretation diamond, uncertain half-circle, gap dashed circle. Status lamps: green, amber, red.“
- „The mark is a small shield with cross lines. Do not add a person, a photograph, a gradient mesh, glassmorphism, neon, a custom cursor, a countdown, confetti, or a chatbot.“
- „Tokens are the source of truth: design/project/tokens.json builds public/tokens.css. No hard-coded colours in components.“
- „If this file conflicts with a design skill, this file wins.“

Die Gestaltungsrichtung dieser Datei (Nachtarchiv, Option A vom 20.10.2026) ist durch E33 „Sapphire Cinema“ vom 3.11.2026 abgelöst; die Markenregeln (Schriften, Marker, keine Tracker, verbotene Wörter) gelten weiter. Die Markendatei selbst wurde nicht umgeschrieben (offen, siehe Abschnitt 9).

### 2.4 Stefans Vorgaben im Wortlaut (Chat, chronologisch)

- 18.10.2026, E14: „Keine Beratung, keine Gespräche: Piloten sind Käufer mit zwei schriftlichen Fragen.“ E7 und E9: Name „Werkstatt“ abgelehnt („Autowerkstatt-Assoziation“).
- 23.10.2026, E22: „Nach dem Back-Up, Umzug auf Loveable komplett“. E23: „nutze das komplette Potential von Lovable“ (ein Design-Durchgang mit mehr Animationen und Slides, Texte unverändert). E25: „Ja, ich gebe alle A- und B-Korrekturen so frei, wie sie in den Befunddateien formuliert sind; C-Punkte nimm mit, wo sie nur Wortlaut betreffen. Erst lokal, dann gebündelt an Lovable.“
- 30.10.2026: „Abarbeite alle Schritte“, „Übernimm den technischen Abschluss“, „mache Punkt 1 bis 3“, „Du veröffentlichst“, „mach du das, veröffentlich“; E27: „deine Texte habe ich durchgelesen und sind freigegeben“.
- 2.11.2026: „Ja, Stufe 1 bauen“; „Credits aufgeladen. Ich will jetzt eine fertige Website haben“; E29: „Ich übernehme die 4 Empfehlungen bis auf den Creditplan“; E30: „Beides veröffentlichen“; E31: „Offen lassen“ (Kauf im Vorschaumodus); E32: „Empfehlungen übernehmen“ (R1 bis R9); Ordner: „Empfehlungen übernehmen“.
- 2.11.2026 abends (Designstudie): „Claude dein Design von Scutoria ist einfach nur ein 3 von 5 (Schulnote). Ich habe ChatGPT und Gemini gebeten Designs zu erstellen. Hier gefallen mir die Varainten von ChatGPT am besten. Eine Mischung aus allen Designs ist hier glaube ich ein guter Kompromiss. Nun bevor du jetzt wieder alles auf loveable umstellst, erstelle Artefakte mit 3 Varainten und dann gebe ich eine Varainte frei. Fragen?“ Antworten auf Claudes vier Fragen: „Seitenfamilie (Empfehlung)“, „Bestand plus Katalogkonzept“, „Licht und Material, kein Neon (Empfehlung)“, „Ja, als Platzhalter (Empfehlung)“ (KI-Symbolbilder der ChatGPT-Studie als Platzhalter). Danach: „Andere Variante“ (keine der drei).
- 3.11.2026 (ChatGPT-Übergabepaket, von Stefan eingefügt): „SAPPHIRE CINEMA IST MEINE AUSGEWÄHLTE GESTALTUNGSRICHTUNG. … Prüfe die echte bestehende Codebasis und übertrage die Gestaltung … Erhalte reale Produkte, Originaltools, Datenverarbeitung, Quellen, Konto, Sprachen und Kaufwege. … Implementiere die komplette zusammenhängende Seitenfamilie … Arbeite innerhalb dieser gewählten Richtung selbstständig und frage nicht bei jeder Routineentscheidung erneut nach. … Zeige mir einen reviewbaren lokalen/privaten Stand mit Desktop-/Mobilbildern, geprüften Funktionen und konkreten offenen Punkten. Veröffentliche erst nach meiner ausdrücklichen Freigabe.“ Dazu: keine Konzepttitel, keine Tool-Demos, keine Storyboards als Produktionsmerkmale; korrigierte Mobil-Referenzen verwenden. Zur Hero-Frage: „Zeige mir die 2 Unterschiede“, dann „Option 2“.
- 3.11.2026: „Versuch es noch einmal“ (nach einer Sitzungsunterbrechung), „Ja, übertragen“ (an Lovable), „Ja, veröffentlichen“.
- 3.11.2026 abends, wörtlich (mit drei Bildschirmfotos der Live-Seite): „Motion und Preive entfernen / Warum gibt es 2mal KI-Richtlinien und 2mal Sicherheitsnachweis? / Wir machen nur 99€ pro Jahr. ohne die 10 lizensen frei. / Dann wie sieht die Planung der nächsten Lizens und E-Bokks aus? / Wenn E-Books oder Kits Preview haben dann nicht alles herzeigen sondern aus 4 Kapiteln eine Seite. / Scutoira / Biblitotekh ist nicht klickbar / Produktpaltee wie sieht das jetzt genau aus? / Es kann toolkits, wissen, yotube(videos/reels) geben. Aber fokus auf Toolkits mit Lizens danach dann die E-Books. Ich will jetzt mind. 20 Toolkits und 20 E-Books in Planung haben. Videos werden bereits bearbeitet“.
- 3.11.2026, 20:02: „Ja, beides“ (Runde E34/E35 an Lovable übertragen und danach veröffentlichen).
- 3.11.2026, danach: Auftrag für diesen Übergabebericht.

### 2.5 Was Stefan ausdrücklich nicht will

- Keine Gründerstaffel, kein „noch n frei“ (E34). Kein Name „Werkstatt“ (E7, E9).
- Keinen Bewegungsschalter („Motion: on“) und keinen Chip „Preview“ in der Kopfleiste (3.11.2026 abends). Der Vorschaumodus selbst (robots gesperrt) blieb unangetastet; dazu hat Stefan nichts gesagt.
- Kein Produkt doppelt in Bibliothek und Fußzeile.
- Vorschauen zeigen nie alles: „aus 4 Kapiteln eine Seite“ (E35).
- Kein Neon, keine Siegel, keine Prozentzahlen, keine Konzepttitel als Produktionsmerkmale (Designstudie und Cinema-Paket).
- Kein Lovable-Abzeichen, keine Besucherstatistik von Lovable (2.11.2026, Markenregel „kein Tracker“).
- Keine Gespräche, kein Kundenkontakt, keine Beratung, kein Gesicht, kein Name außer im Impressum.
- Nichts veröffentlichen, kein Geld ausgeben, keine Rechtstexte live stellen ohne sein Wort; Lovable-Credits sind Ausgaben.
- Claude löscht nichts (Verschieben nach `_zum_loeschen`).

### 2.6 Arbeitsweise, die sich bewährt hat

- Lovable-Runden: Dateien lokal bauen, byteweise mit SHA-256 übergeben, Lovable nur Tests anpassen lassen und berichten lassen; nie deployen lassen (Gedächtnisnotiz `lovable-uebergabe-ablauf.md`).
- Jede Zahl mit Quelle und Datum, Unsicheres mit „Stand prüfen“.
- Am Ende jeder Sitzung ein Log-Eintrag in Google Drive (Ordner „Claude-System › Log-Eingang“, Titel `JJJJ-MM-TT HH:MM Scutoria`, Wiener Zeit; die Uhrzeit per PowerShell bestimmen, weil Git Bash still UTC liefert).
- Entscheidungen sofort in `ENTSCHEIDUNGEN.md` und in die Dossier-Datenbank (Sammlung `entscheidungen`, Felder `label`, `wahl`, `notiz`, `zeit`).

---

## 3. Chronologischer Verlauf

Datum, was geschah, was entschieden oder verworfen wurde, Begründung. Quellen: STAND.md, ENTSCHEIDUNGEN.md, AUFGABEN.md, soweit nicht anders angegeben.

**18.10.2026.** Neustart. Entscheidungen E1 bis E16 (Block A und B) und E17 bis E20 (Block C): Fundament und Werbung parallel (E1), nur lokale Kopie ohne GitHub (E2), komplett neu (E3), Render und Stripe behalten (E4, später durch E22 abgelöst), drei Produktlinien (E5), erste Linie KI-Regeln (E6), Jahreslizenz je Produkt plus Bundle (E7), nur Marke ohne Gesicht (E8), Band 1 zu 29 Euro überall enthalten (E9), Preisniveau-Hypothese 149/199/249 Euro (E10, durch E34 ersetzt), vier Memo-Generatoren und zwei Mini-Tools (E11), Marker sichtbar (E12), EU-weit ab Start, Englisch primär (E13), zehn Piloten zu 99 Euro ohne Gespräch (E14, durch E34 ersetzt), 300 Euro Anzeigen-Test (E15), ein Termin pro Woche (E16), Name „Toolkit“ (E17), Docker-Image ohne GitHub (E18, abgelöst), alles über Stripe (E19), Über-Seite ohne Namen (E20). Projektgerüst, Designsystem (Artefakt https://claude.ai/artifact/UCNUpomPkoPTME8FZXJKyG), Website-Gerüst (Node 22, Express 5, SQLite), Rechtstextentwürfe, Rohmaterial aus den alten Titeln.

**19.10.2026.** Toolkit 1 (KI-Richtlinien) komplett: Fragebogen, sieben Dokumente D1 bis D7, Handbuch (Quellen am Original), Konto per E-Mail-Link, Nachweisordner, Stripe-Kasse (Vorschau mit Probekasse), Verkaufsseiten, zwei freie Tools, vier Memo-Generatoren, Toolkit 2 (Sicherheitsnachweis) vorgezogen und komplett gebaut, Handbuch 2, Muster, Produktseite. E21: Preis Toolkit 2 wie Toolkit 1 (199 Euro regulär, 99 Euro Gründerpreis für zehn Käufer, Bundle 299 Euro später; durch E34 ersetzt). Live-Grundlagen (robots, Sitemap, OG-Bilder), `LIVE-GANG.md`, Docker-Probe. Stefan gab Texte, Handbücher, Dokumente frei.

**20.10.2026.** Docker Hub eingerichtet (Benutzer `luxdinary`, Repository öffentlich entstanden). Design-Runden 1, 2, 2b, 2c nach vier Briefen Stefans; Stefan entschied Option A „Nachtarchiv mit leiser Dynamik“ und „Cover in Farbe“. Produktseiten und Tools-Seite in Runde 2; „lasse das freie weg“ (nur noch „Tools“).

**21.10.2026.** Stefan: „Das Design ist fertig.“ Designsystem nachgezogen, Render-Dienst `scutoria-site` angelegt (Vorschau https://scutoria-site.onrender.com).

**22.10.2026.** Stripe-Testmodus gestrichen, direkt live (Stefan).

**23.10.2026.** Bericht `BERICHT-2026-10-23.md` (Kasse funktionierte nicht, weil bei `STRIPE_SECRET_KEY` die Kennung statt des Tokens stand). E22: Umzug komplett zu Lovable nach Sicherung (Merkzeichen `vor-lovable-2026-10-23`, Ablage `_archiv/vor-lovable-2026-10-23/`). Begründung laut Bericht: eigene Domain und Abzeichen-Ausblendung nur im bezahlten Plan; stärkstes Gegenargument war, dass die Render-Fassung fertig war. E23: 100 Credits zugekauft (105 gesamt), komplett fertige Website, Design-Durchgang mit Animationen. E24: Datenbank-Region Europa durch Remix in das Projekt „Scutoria“ (`6e8cf66c-609e-4034-8911-ceeb9b422c84`, AWS eu-west-1), weil die erste Datenbank in us-west-2 lag. Import in Etappen, Design-Durchgang, zwei Korrekturrunden, Produktprüfung mit 209 Befunden (E25 alle A- und B-Korrekturen; E26 Produktentscheidungen). Befund: Lovables Auftragsverarbeitungsvertrag nur für Business und Enterprise.

**26.10.2026.** Lagebild: alles gebaut, 120 Tests grün, nicht veröffentlicht, keine Schlüssel. Live-Schalter in `content/site-settings.json`. `LIVE-GANG.md` für den Lovable-Weg neu.

**29./30.10.2026.** Stefan trug `STRIPE_SECRET_KEY` und `BREVO_API_KEY` in Lovable ein (Stolpersteine: Archivprojekt, falscher Brevo-Wert, Brevo-IP-Sperre). Kundenportal „Scutoria Toolkits“ angelegt. Support-Mail zum Auftragsverarbeitungsvertrag; Antwort: nur Business. E28: Business-Tarif (50 statt 25 Euro im Monat). Testdaten gelöscht. Veröffentlicht auf https://scutoria.lovable.app (Vorschaumodus). E27: Rechtstexte freigegeben (Veröffentlichungsentscheidung, keine Rechtsprüfung; `legalReviewedAt` bleibt leer). Alter Shop in den Wartungsmodus. Stripe-Webhook angelegt, Geheimnis eingetragen. DNS bei GoDaddy auf Lovable umgestellt (A @ und www 185.158.133.1, TXT `_lovable` und `_lovable.www`); scutoria.com live auf Lovable, Zertifikat bis 28.01.2027. Befund: Für Stefan ist im GISA kein Gewerbe auffindbar (obwohl E1 „Gewerbe bei der WKO angemeldet“ sagt); Klärung bei Stefan. GitHub-Repository `Luxdinary/scutoria` des alten Shops von Stefan gelöscht; Banner im alten Shop deshalb nicht möglich, stattdessen Wartungsseite.

**1.11.2026.** Stefan ließ scutoria.com von ChatGPT analysieren (Befunde F01 bis F18 in `_berichte/2026-11-01-Erlebnis-Redesign/ANALYSE-UND-REDESIGN.md`, unversioniert).

**2.11.2026.** Gegenprüfung: F01 bestätigt (CSP `form-action 'self'` blockierte die Weiterleitung zur Stripe-Kasse in Chrome), F03 (kein Mobilmenü), F14 (404 mit Startseiteninhalt), F17 (Lovable-Abzeichen), Ereignis-Skript und Cloudflare-Cookie. Stufe 1 gebaut und veröffentlicht (CSP mit Stripe-Zielen, Mobilmenü, echte 404). Abzeichen aus, Besucherstatistik aus. E29: Redesign nach Variante A, Phasen 1 bis 5 bei Lovable (216 Tests), E30: Redesign und Datenschutzerklärung veröffentlicht. E31: Kauf im Vorschaumodus bleibt offen (Claudes Empfehlung war Sperren). Rechtstexte bereinigt (`live/FREIGABE-RECHTSTEXTE-2026-11.md`), E32: R1 bis R9 übernommen (tägliche Löschung, Vertragsbestätigung, Funktion „Vertrag widerrufen“, Ende der Brevo-Liste), Runde veröffentlicht (Deployment 60d7d25a). Markenpaket `design/markenpaket/`. Ordner aufgeräumt. Abends Designstudie: drei Varianten als Artefakte (A Saphir, B Verlag, C Studio); Stefan: „Andere Variante“.

**3.11.2026, vormittags bis 16:30.** Stefan wählte „Sapphire Cinema“ aus dem ChatGPT-Übergabepaket (E33), Hero-Option 2 „KI verstehen. Wissen im Alltag nutzen.“ Lovable-Code vollständig nach `site/` gespiegelt, lokaler Starter gebaut, Cinema in zwei Runden lokal umgesetzt (Commits e66e907, bbf6ba0), Bericht `design/cinema-2026-11-03/BERICHT.md`. Nach „Ja, übertragen“: drei Lovable-Runden byteweise (Commits 851e405, 5b3043a, 039c979; 1,0 + 6,1 + 1,5 = 8,6 Credits), fünf Tests angepasst, drei Kontrastbefunde behoben, Suite 251 zu 1 (einziger roter Test: englisches D5-Muster-PDF mit zwei statt drei Seiten, schon vorher rot). Nach „Ja, veröffentlichen“: Deployment ae2b12b2 um 16:30, von außen geprüft (32 Adressen). Lokale Commits 0b86240, 4d1d7fe.

**3.11.2026, abends.** Stefans Rückmeldung (Abschnitt 2.4). Umgesetzt lokal (Commit c09b0eb): Kopfleiste ohne Bewegungsschalter und Vorschau-Chip; Fußzeile und Bibliothek mit jedem Produkt einmal; Brotkrumen verlinkt; E34 Preis 99 Euro ohne Gründerstaffel; E35 Leseproben (Handbuch als vier Kapitelauszüge, Beispielbetrieb je eine Seite aus vier Dokumenten, Vollfassungen nur mit Lizenz); E36 Produktpalette; Produktplanung `produkte/PLANUNG-2026-11.md` (29 Toolkits, 29 E-Books). Um 20:03 die Runde als ein ZIP an Lovable gesendet (Abschnitt 4.2). Stefan: „Ja, beides“ (übertragen und veröffentlichen). Danach der Auftrag für diesen Bericht.

Verworfen oder abgelöst, mit Grund: Render als Hosting (E4, E18; abgelöst durch E22, weil Lovable gewählt wurde), Docker Hub (nicht mehr gebraucht seit E22), Nachtarchiv-Design und Variante A des Redesigns (abgelöst durch E33, weil Stefan das Design mit 3 von 5 bewertete und die ChatGPT-Richtung wählte), die drei Claude-Varianten vom 2.11. (Stefan: „Andere Variante“), Gründerpreis und 199 Euro (E34), Preishypothesen E10 und E14 (E34), öffentliche Handbuch-PDFs und vollständige Beispiel-PDFs (E35), Banner im alten Shop (GitHub-Repository gelöscht, stattdessen Wartungsseite), Umzug der YouTube-Unterlagen (2.11. abgesagt, Stefan pausierte die Aufträge), Memo-Adressen in der Brevo-Liste (E32 R9).

---

## 4. Aktueller Stand im Detail

### 4.1 Live auf scutoria.com (Deployment ae2b12b2 vom 3.11.2026, 16:30)

- Gestaltung Sapphire Cinema: tiefes Navy, saphirblaue Akzente, Kopfleiste 80 px mit Entdecken, Bibliothek, Tools, Studio, Konto, Bewegungsschalter, Sprache und Vorschau-Chip (die letzten beiden Elemente werden mit der laufenden Runde entfernt), vierspaltige Fußzeile, Startseite mit Bildbühne (Hero-Option 2), Themenwege, Studiomodul, Situationen mit Musterdokument, Regal mit beiden Toolkits und dem dritten in Vorbereitung, Methodikblock, Tools, Warteliste. Neue Seiten Bibliothek (`/library`, `/de/bibliothek`) und Studio (`/studio`, `/de/studio`). Produkt-, Tool- und Memo-Seiten in der Cinema-Hülle. 404-Seite mit drei Knöpfen.
- Noch live bis zur Veröffentlichung am Abend (siehe Nachtrag): Bewegungsschalter und Chip „Vorschau“ in der Kopfleiste; Bibliothek mit fünf Einträgen (zwei Toolkits, eines in Vorbereitung, zwei Handbücher); Fußzeile mit „Handbuch: …“ unter Wissen; Preis 99 Euro Gründerpreis „noch 10 frei“, regulär 199 Euro; Handbücher vollständig frei lesbar samt PDF; vollständige Beispiel-PDFs öffentlich unter `/samples/`.
- Vorschaumodus (`siteMode: preview` in `content/site-settings.json`): `robots.txt` sperrt alles, jede Seite trägt `noindex, nofollow`; die echte Stripe-Kasse ist erreichbar (E31); der Generator läuft ohne Lizenz. `/health` am 3.11.2026 von außen: `{"ok":true,"version":"dev","mode":"preview","checkout":"stripe","webhook":true,"mail":true,"memoList":false,"legalReviewed":false}`.
- Rechtstexte live: Datenschutz und Widerruf in der Fassung vom 2.11.2026 (E32), Impressum und AGB in der Fassung vom 30.10.2026 (E27) mit Klammern „Stand prüfen“; `legalReviewedAt` leer, Hinweis „noch nicht rechtlich geprüft“ sichtbar.
- Geprüft am 3.11.2026 nach der Veröffentlichung: 32 Adressen EN und DE mit erwartetem Status, je genau einer H1, Cinema-Hülle, vierspaltiger Fußzeile; Sitemap mit 32 Adressen; Umleitungen `/agb`, `/en/`, `/imprint`, www und scutoria.lovable.app; kein Lovable-Abzeichen. Nicht geprüft: Kaufweg bis zur Zahlung (nie bezahlt), Tastatur und Bildschirmleser auf der Live-Seite.
- Verkäufe: keine bekannt (E31 vom 2.11.: „Bisher kein Kauf“; danach nicht erneut geprüft, nicht ermittelbar ohne Blick ins Stripe-Dashboard).

### 4.2 Bei Lovable in Arbeit (nicht live): Runde E34/E35/E36

- Gesendet 3.11.2026 um 20:03 Wiener Zeit (19:03:13 UTC) als eine Nachricht mit dem Anhang `runde-e34-e35.zip` (31 Dateien plus `MANIFEST.sha256`; ZIP-Prüfsumme f8be412d73af037ab3199fb43aace6dde8e0ef89b6bf094e35e59ef60b80a05c), Lovable-Projekt `6e8cf66c-609e-4034-8911-ceeb9b422c84`, Nachricht `umsg_01m6hcpgp9e5bsmekss4x71wv3`, Thread „main“. Abfrage über den Lovable-Konnektor: `get_message` mit dieser Kennung; beim Schreiben dieses Berichts (20:11) Status „running“.
- Inhalt: 15 Textdateien (`src/legacy/layout.mjs`, `i18n.mjs`, `config.mjs`, `cinema.mjs`, `memos/pages.mjs`, `pages/home.mjs`, `pages/library.mjs`, `pages/product.mjs`, `pages/product-security.mjs`, `pages/studio.mjs`, `runtime/files.mjs`, `toolkit/handbook.mjs`, `toolkit/routes.mjs`, `public/cinema.css`, `scripts/leseproben.mjs`) und 16 Leseproben-PDFs unter `public/samples/`. Lovable soll die 14 alten Beispiel-PDFs löschen, die vier Handbuch-PDFs nach `content/toolkits/<toolkit>/handbook.<sprache>.pdf` verschieben, prüfen, ob Umgebungswerte `PRICE_*` oder `PILOT_SEATS*` gesetzt sind (nur Namen melden, Werte nie), die Testsuite anpassen (nie Sicherheitstests schwächen), Axe auf acht Seiten laufen lassen und SHA-256 je Datei berichten. Die vollständigen Prüfsummen stehen in `lovable/AUFTRAG-E34-E35-2026-11-03.md` (Kurzform) und im Manifest des ZIP (Scratchpad der Sitzung, nicht versioniert).
- Was danach zu tun ist (Stefans Wort „Ja, beides“ liegt vor): Ergebnis lesen, Prüfsummen vergleichen, Testzahlen prüfen, Vorschau in Stefans Chrome oder per Abruf prüfen, dann `deploy_project` über den Konnektor, danach `python <Scratchpad>\live_check_e34.py https://scutoria.com wait` oder gleichwertige Abrufe (Prüfpunkte: Kopfleiste ohne Schalter und Chip, Fußzeilenspalten, Bibliothek mit drei Einträgen, Brotkrumen-Link, Preis 99, Handbuchseite als Leseprobe mit vier Auszügen und Titel „Leseprobe“, `…/handbuch/pdf` antwortet 303, alte Beispiel-PDFs 404, neue 200, 32 Seiten wie bisher). Dann STAND.md, AUFGABEN.md, Commit, Drive-Log.
- Kosten dieser Runde: nicht ermittelbar, bis Lovable das Ergebnis mit `cost_credits` meldet.

### 4.3 Lokaler Stand (Ordner, Commit c09b0eb vom 3.11.2026, 20:00)

- `site/` ist seit 3.11. der vollständige Spiegel des Lovable-Codes (`site/src/X` entspricht bei Lovable `src/legacy/X`, `site/public/X` entspricht `public/X`, `site/content/X` entspricht `content/X`), plus die Änderungen vom 3.11. abends, die bei Lovable gerade eingespielt werden. Nicht gespiegelt: Lovables Tests (`src/test/*`), Lovables eigene Dateien (`src/routes`, `src/lib`, `drizzle`, `docs`), `.env`.
- Nicht committet und nicht zu committen: `.claude/launch.json` (lokale Startkonfiguration, geändert), `_berichte/` (Fremdberichte, unversioniert), `_archiv/`.
- Letzte Commits: c09b0eb (Runde E34/E35/E36 lokal), 4d1d7fe (Cinema veröffentlicht), 0b86240 (Cinema übertragen), 22ab72d (E33), bbf6ba0, e66e907 (Cinema lokal), 136 Commits insgesamt.

### 4.4 Fertig

- Zwei Toolkits (KI-Richtlinien: 34 Fragen, 29 Pflicht; Sicherheitsnachweis: 47 Fragen, 40 Pflicht) mit je sieben Dokumenten, Handbuch (24/26 und 37/40 Seiten je Sprache), Mustern, Produktseiten, Kasse über Stripe Checkout (Zahlungsmodus, Stripe Tax, UID-Abfrage, Rechnung, AGB-Zustimmung), Webhook, Kundenportal, Konto per E-Mail-Link, Nachweisordner mit eingefrorenen Fassungen, Mails über Brevo, Vertragsbestätigung in der Zugangsmail, tägliche Löschung (pg_cron `scutoria-retention-daily` 03:00 UTC), Funktion „Vertrag widerrufen“.
- Vier Memo-Generatoren, zwei Browser-Tools, Über-Seite, Rechtsseiten, Sitemap, OG-Bilder, Barrierefreiheit per Axe in der Testsuite (0 Verstöße bei 144 Prüfungen, Stand 3.11.), Mobilmenü, echte 404-Seite.
- Sapphire Cinema live; Bibliothek und Studio als Seiten; Videoprogramm in `site/content/studio.json` (zehn Langvideos, zwölf Shorts geplant, zwei Langvideos in Produktion, nichts veröffentlicht).
- Domain scutoria.com auf Lovable mit Zertifikat; Mail-Einträge unverändert.
- Dossier mit E1 bis E36; `ENTSCHEIDUNGEN.md` als Export; Produktplanung mit 29 Toolkits und 29 E-Books.

### 4.5 Teilweise erledigt

- Runde E34/E35/E36: lokal fertig und geprüft, bei Lovable in Arbeit, nicht veröffentlicht (Abschnitt 4.2).
- Rechtstexte: Datenschutz und Widerruf final (E32); Impressum und AGB warten auf Steuerberater (Variante A Kleinunternehmer oder B Regelbesteuerung, Entwürfe in `live/rechtstexte-2026-11/`) und auf den GISA-Auszug; Anwaltsprüfung R10 offen; `legalReviewedAt` leer.
- Live-Gang: Website live, aber im Vorschaumodus; Live-Schalter (`siteMode: live`) erst nach Klärung des Gewerbes (E30); Probekauf nicht gemacht; Webhook-Geheimnis durch kein echtes Ereignis bestätigt.
- Erinnerungsmails: Endpunkt fertig, Schalter `reminders` auf „off“, der tägliche Aufruf (pg_cron 06:00 UTC, Token im Vault) ist nicht angelegt, SQL liegt bei Lovable in `docs/reminder-schedule.sql`; nicht dringend.
- OG-Vorschaubilder: Fragenzahlen korrigiert (E32), Motiv noch das alte (nicht Cinema); neu erzeugen, wenn das endgültige Symbolbild steht.
- Testsuite bei Lovable: ein roter Test (englisches D5-Muster-PDF liefert zwei statt drei Seiten, `src/test/e26.test.ts:37`), Ursache offen; dafür liegt in der Claude-Desktop-App eine vorgeschlagene Sitzungskarte „D5-PDF Englisch: zwei statt drei Seiten“ (Task task_9d236e9f), nicht gestartet.
- Markenpaket und Markenbuch: Logo, Favicon, Profilbild vorhanden; `design/project/README.md` und `.claude/skills/scutoria-brand/SKILL.md` beschreiben noch das Nachtarchiv, nicht Sapphire Cinema.
- Videos: Produktion läuft außerhalb dieses Ordners (Stefan: „Videos werden bereits bearbeitet“); Unterlagen in `marketing/youtube/`; nichts veröffentlicht.

### 4.6 Nicht begonnen

- Toolkit 03 KI-Einrichtung (Bauplan, Fragen, Dokumente, Handbuch) und alle weiteren Toolkits und E-Books der Planung; E-Book-Verkaufsmechanik (Preismodell offen, F1).
- Streichung des Bundles (E7, 299 Euro) im Dossier, falls Stefan F2 bejaht.
- Live-Modus, Probekauf, Search Console (DNS-Eintrag liefert Claude), Anzeigen-Test 300 Euro (E15), LinkedIn-Markenseite, Newsletter Nr. 1, zehn Partner-Mails, Pilot-Fragebogen (Phase-2-Plan in AUFGABEN.md, seit 18.10. unverändert).
- Render: `swk-shop` ganz anhalten (Suspend) und `scutoria-site` abschalten (je 7 Dollar im Monat, Stefans Wort); Docker-Hub-Repository auf privat stellen oder löschen (nicht mehr gebraucht).
- Testläufe `31gO4vCuOPHa` und `IWks5J6kh4oA` in der Lovable-Datenbank löschen (Stefans Wort); Stefans Gmail-Adresse aus Brevo-Liste 2 nehmen (Stefan in Brevo).
- Test mit Menschen und Bildschirmleser-Prüfung (F16).

---

## 5. Technisches Setup

### 5.1 Geräte und Software

- Stefans Laptop, Windows 11 Pro (Build 10.0.26300), Systemzeitzone Asia/Beirut (eine Stunde vor Wien); Wiener Zeit per PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'W. Europe Standard Time')`.
- Claude Desktop-App (Code-Tab) mit eingebautem Browser (Vorschau lokaler Server, Geräteemulation 375 px) und Erweiterung „Claude in Chrome“ (Stefans Chrome, dort ist er bei Lovable angemeldet; Tab mit der Lovable-Vorschau beziehungsweise scutoria.com zuletzt Tab 474199737).
- Node 22 (ESM, `--disable-warning=ExperimentalWarning`), npm, Python 3.13 (Microsoft-Store-Installation), Git (Git Bash), PowerShell 5.1, Google Chrome (auch headless für Bildschirmfotos; Hinweis: headless unter Windows klemmt die Fensterbreite auf etwa 500 px, Handy-Renderings dort unbrauchbar, stattdessen die App-Vorschau mit Emulation), Docker Desktop (seit E22 nicht mehr gebraucht).
- Gedächtnisdateien der Claude-Sitzungen: `C:\Users\Stefa\.claude\projects\C--Users-Stefa-OneDrive-scutoria\memory\` (`MEMORY.md`, `lovable-uebergabe-ablauf.md`, `wiener-zeit-bestimmen.md`, `artefakt-pruefung-werkzeuge.md`, `finanzprojekt-ablage.md`, `gemini-api-schluessel-fundort.md`).
- Scratchpad der Sitzung vom 3.11. (temporär, kann verschwinden): `C:\Users\Stefa\AppData\Local\Temp\claude\C--Users-Stefa-OneDrive-scutoria\2bd5f3e6-fc88-4cc8-85f2-34265e43c491\scratchpad\` mit `runde-e34-e35.zip`, `samples-e35.zip`, `live_check_e34.py`, `beispiel\` (vollständige Beispiel-PDFs vom lokalen Lauf, Manifest), `batch1.py`, `batch2.py`, `upload_cinema.py`.

### 5.2 Projektordner und Git

- Ordner: `C:\Users\Stefa\OneDrive\scutoria` (OneDrive-synchronisiert). Git-Datenbank: `C:\Users\Stefa\.scutoria-git`; der Ordner enthält nur die Zeigerdatei `.git`. Hook sichert nach jedem Commit `_archiv/git-history.bundle`. Commit-Befehl: `git --git-dir=C:/Users/Stefa/.scutoria-git --work-tree=C:/Users/Stefa/OneDrive/scutoria -c user.name=Scutoria -c user.email=kontakt@scutoria.com commit`; Commit-Nachrichten enden mit `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. In Git Bash vorher `cd /c/Users/Stefa/OneDrive/scutoria` und Pfadangaben mit `:/…`, weil das Arbeitsverzeichnis zwischen Aufrufen wechselt. Nie committen: `.claude/launch.json`, `_berichte/`, `_archiv/`.
- Struktur (README.md und Verzeichnis): `STAND.md`, `ENTSCHEIDUNGEN.md`, `AUFGABEN.md`, `LIVE-GANG.md`, `BERICHT-2026-10-23.md`, `AGENTS.md`, `CLAUDE.md`, `README.md`; `site/` (Website und Kasse, Spiegel des Lovable-Codes: `src/`, `public/`, `content/`, `scripts/`, `data/`, `test/` alt); `design/` (`project/` mit `tokens.json`, `design-system.json`, `components/`, `fonts/`, `README.md` Markenbuch; `markenpaket/`; `cinema-2026-11-03/` mit Bericht und Bildern; `varianten-2026-11/`; `VARIANTEN-2026-11-02.md`; `RUNDE-2-*.md`; `briefs/`); `produkte/` (`ai-policy-toolkit/` und `security-evidence-toolkit/` mit `BAUPLAN.md`, `quellen.md`, `muster/`, `PREIS.md`; `memos/QUELLEN.md`; `PRUEFPAKET-2026-10-23/`; `PLANUNG-2026-11.md`); `lovable/` (Aufträge, `KNOWLEDGE.md`, `KNOWLEDGE-CINEMA.md`, `LOVABLE-MIGRATION.md`, `ANLEITUNG-STRIPE-BREVO.md`, `ANFRAGE-LOVABLE-DPA.md`, `PLAN-REDESIGN-2026-11.md`, `REDESIGN-PHASE-0-TEXTE.md`, `wartungsseite.html`, `spiegel/`); `live/` (`FREIGABE-START.md`, `FREIGABE-RECHTSTEXTE-2026-11.md`, `rechtstexte-2026-11/`, `dns/`); `marketing/youtube/` (Konzept, Themen, Skripte, Szenen, Shorts, Vorlagen, `ANIMATION`); `rohmaterial/`; `dossier/scutoria-neustart.html`; `_berichte/` (Fremdberichte von ChatGPT und Gemini, unversioniert); `_archiv/` (Sicherungen, Quellenkopien, unversioniert); `.claude/` (`launch.json`, `skills/scutoria-brand/SKILL.md`).

### 5.3 Website-Code (Lovable-Fassung, gespiegelt in `site/`)

- Stack bei Lovable: TanStack Start auf Cloudflare Workers; der Original-Code läuft über einen Express-kompatiblen Mini-Router (`src/legacy/runtime/express.mjs`, `app.handle(Request)`), Dateien über `src/legacy/runtime/files.mjs` (Vite `import.meta.glob`; Inhalte aus `content/**`, CSS aus `public/*.css`, Schriften, TTF-Instanzen und seit E35 die Handbuch-PDFs aus `content/toolkits/*/handbook.*.pdf`), Datenbank `src/legacy/db.mjs` auf Supabase (Lovable Cloud, AWS eu-west-1) über `@/integrations/supabase/client.server`, Catch-all-Route `src/routes/$.tsx` mit `src/lib/legacy-handler.ts` (neue Express-Routen brauchen keine Registrierung). Tests mit Vitest (`src/test/*.test.ts`, 252 Tests am 3.11., davon 1 rot), Axe-Audit in der Suite, Playwright-Skripte für Bildschirmprüfungen.
- Wichtige Module: `src/legacy/layout.mjs` (Hülle, Kopfleiste, Fußzeile, `crumb()`), `i18n.mjs` (Pfade und Texte), `config.mjs` (Konfiguration aus Umgebung und `content/site-settings.json`; Preise `PRICE_YEAR_CENTS` 9900, `PILOT_SEATS` 0), `cinema.mjs` (Cinema-Texte DE/EN), `pages/home.mjs` (Startseite), `pages/home-e29.mjs` (Bausteine Werkbank, Marker, Demo), `pages/library.mjs`, `pages/studio.mjs`, `pages/product.mjs` und `product-security.mjs`, `pages/tools.mjs`, `pages/seo.mjs`, `pages/paper.mjs`, `pages/cover.mjs`, `memos/`, `toolkit/` (`registry.mjs`, `engine.mjs`, `routes.mjs`, `handbook.mjs` mit `handbookSampleArticle`, `documents/` mit `pdf.mjs` auf pdf-lib), `shop/` (`products.mjs`, `payments.mjs`, `fulfil.mjs`, `session.mjs` mit `isLicensed`, `canStartRun`, `routes.mjs`, `reminders.mjs`), `mail.mjs`, `withdraw.mjs`. Öffentliche Dateien: `public/tokens.css` (aus `design/project/tokens.json` mit `npm run build:assets`), `bundle.css`, `site.css`, `motion.css`, `cinema.css`, `generator.css`, `site.js`, `motion.js`, `transitions.js`, `home.js`, `library.js`, `tools/*.js`, `fonts/`, `img/studio-stage-*.webp`, `og/*.png`, `samples/` (seit E35 nur einseitige Leseproben).
- Inhalte: `content/toolkits/<toolkit>/questions.json`, `handbook.de.md`, `handbook.en.md`, seit E35 `handbook.de.pdf`, `handbook.en.pdf`; `content/legal/*.md`; `content/about.*.md`; `content/site-settings.json` (`siteMode` preview, `legalReviewedAt` leer, `baseUrl`, `previewEmails` leer, `stripePortalConfiguration` bpc_1UW1cYBCc2IivCxLlJwB1pDp, `reminders` off); `content/studio.json`.
- Sicherheitsregel (CSP): `default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; form-action 'self' https://checkout.stripe.com https://billing.stripe.com; frame-ancestors 'none'; base-uri 'none'; object-src 'none'`. Keine Inline-Styles, nur Klassen.
- Lokaler Starter (`site/scripts/local/`): `register.mjs` (Modul-Hooks, die `src/runtime/files.mjs` auf den Dateisystemleser und `src/db.mjs` auf die alte SQLite-Datenbank umbiegen), `serve.mjs` (Port 8787), `render.mjs`, `shot.sh`; Start mit `npm run local` in `site/` oder über `.claude/launch.json` (Konfiguration `scutoria-site`, `DATA_DIR` `C:\Users\Stefa\Videos\scutoria\site-data`, `SITE_MODE` preview). Nach Codeänderungen Neustart nötig. Die TTF-Schriften in `site/public/fonts/ttf/` wurden am 3.11. von scutoria.com geholt, damit der PDF-Renderer lokal läuft. `site/scripts/leseproben.mjs` baut die einseitigen Leseproben aus vollständigen PDFs; `site/scripts/build-og.mjs` die OG-Bilder; `site/scripts/build-assets.mjs` die Tokens, das Bundle und kopiert Schriften und Logos.
- Alte Express-Fassung (bis 23.10.2026): `site/src/server.mjs` lief als `npm run dev` mit SQLite; heute nur noch als Teil des Spiegels und des lokalen Starters.

### 5.4 Lovable

- Workspace „stefan's Lovable“, Tarif Business seit 30.10.2026 (E28; 50 Euro im Monat laut lovable.dev/de/pricing, abgerufen 30.10.2026). Projekt „Scutoria“, Kennung `6e8cf66c-609e-4034-8911-ceeb9b422c84`, Editor https://lovable.dev/projects/6e8cf66c-609e-4034-8911-ceeb9b422c84, Vorschau https://id-preview--6e8cf66c-609e-4034-8911-ceeb9b422c84.lovable.app (nur mit Lovable-Anmeldung), veröffentlicht unter https://scutoria.lovable.app, das auf https://scutoria.com weiterleitet. Archivprojekt „Scutoria Migration“ `1f1d2707-b98b-48de-8831-f1b78ea4bf6c` (Datenbank in den USA, nur Testdaten).
- Geheimnisse liegen ausschließlich in Lovables Secrets-Formular (Projekt, More, Settings, Secrets): `STRIPE_SECRET_KEY` (eingeschränkter Live-Schlüssel), `STRIPE_WEBHOOK_SECRET`, `BREVO_API_KEY`; dazu Lovables verwaltetes `LOVABLE_CRON_SECRET`. Nie Werte im Chat oder im Ordner.
- Projektwissen (Project Knowledge) steht seit 3.11. auf dem Text aus `lovable/KNOWLEDGE-CINEMA.md`; ohne passendes Projektwissen verweigert Lovable Umgestaltungen („never restyle“).
- Konnektor-Ablauf (Gedächtnisnotiz): `get_file_upload_url` je Datei, PUT mit den zwei Headern aus der Antwort, `send_message` mit höchstens zehn Anhängen (oder ein ZIP), `wait=false`, dann `get_message` mit `thread_id` „main“; das Ergebnis enthält `cost_credits` und `commit_sha`; `deploy_project` veröffentlicht (nur auf Stefans Wort). Die Vorschau zeigt neuen Code manchmal erst, nachdem der Lovable-Editor geöffnet wurde.
- Credits: 100 zugekauft am 23.10. (105 gesamt); Stand laut Editor am 30.10. abends 14,9 übrig; Projekt-Credits laut Einstellungen 67,9 vor Stufe 1 (2.11.); Stefan hat am 2.11. „Credits aufgeladen“ (Betrag nicht ermittelbar, nicht genannt); Cinema-Übertragung 8,6 Credits (3.11.). Aktueller Kontostand: nicht ermittelbar ohne Blick in den Editor (Stand prüfen).

### 5.5 Domain, DNS, Dienste, Konten

- Domain scutoria.com bei GoDaddy (Nameserver ns03/ns04.domaincontrol.com). Einträge: A `@` 185.158.133.1, A `www` 185.158.133.1, TXT `_lovable` und `_lovable.www` (Lovable-Prüfwerte), MX scutoria-com.mail.protection.outlook.com (Microsoft 365 für kontakt@scutoria.com), SPF, Microsoft-365-Nachweis, Brevo-Code, DMARC, Brevo-DKIM-CNAMEs, autodiscover. Sicherungen: `live/dns/godaddy-zone-2026-10-30_vor-wechsel.txt`, `live/dns/dns-sicherung-2026-10-30_1708.txt`. Rückweg zum alten Shop: A `@` 216.24.57.1, www CNAME swk-shop.onrender.com. Zertifikat Google Trust Services bis 28.01.2027.
- Stripe: Livekonto „Scutoria“, Stripe Tax aktiv (Herkunft Kleinpoppen 18), Preise „inklusive“; Kundenportal „Scutoria Toolkits“ `bpc_1UW1cYBCc2IivCxLlJwB1pDp` (live, nicht Standard); Webhook-Ziel „Scutoria Toolkits“ `we_1UWIEyBCc2IivCxLa46T2Nwx` auf `https://scutoria.com/api/public/hooks/stripe` mit `checkout.session.completed` und `checkout.session.async_payment_succeeded`, API-Version 2026-08-26.dahlia; alter Endpunkt „Scutoria Shop“ laut Stefan deaktiviert (nicht selbst gesehen). Public details: AGB-Adresse `https://scutoria.com/agb` (leitet per 301 auf `/de/agb`). Keine Stripe-Produkte nötig: die Kasse erzeugt den Betrag aus `config.mjs`. Zugang aus Claude-Sitzungen nur lesend über den Stripe-Konnektor, wenn verbunden.
- Brevo: Gratis-Plan (300 Mails am Tag), Absender kontakt@scutoria.com aktiv, Domain authentifiziert, Liste 2 (nicht mehr befüllt seit E32 R9; enthält noch Stefans Gmail-Adresse), IP-Sperre für API-Schlüssel deaktiviert (30.10.). Für Kunden in Österreich Vertragspartner laut Bedingungen Brevo GmbH, Berlin (Stand prüfen anhand der Rechnung).
- Render: Workspace „My Workspace“ `tea-dae2uppt0dsc738l20p0`; `swk-shop` (alter Shop, Wartungsmodus mit `https://scutoria.lovable.app/wartung.html`, läuft und kostet weiter, Betrag nicht ermittelbar ohne Rechnung); `scutoria-site` `srv-dbc4eirncjis738b33bg` (Rückweg, Frankfurt, Starter, 7 Dollar im Monat plus 0,25 Dollar je GB, Image `docker.io/luxdinary/scutoria-site:2026-10-21-02`). Render-Konnektor vorhanden (nur auf Stefans Wort benutzen).
- Docker Hub: Benutzer `luxdinary`, Repository `scutoria-site` öffentlich; nicht mehr gebraucht.
- Microsoft 365: Postfach kontakt@scutoria.com. Stefans Gmail stefan.dallinger.me@gmail.com (für Support-Mails und Testzustellungen genutzt).
- Google Drive: „Claude-Gedächtnis“ mit `00 START.md` und Übersichten; Log-Eingang Ordner-ID `1V22KU5F65VYe2dl4NK27-phR6tSpSHcO` (Einträge nur anlegen, nie ändern).
- Artefakte auf claude.ai: Dossier https://claude.ai/artifact/Svu6tyyfTezCn7naCSo2eY (Datenbank mit Sammlungen `entscheidungen` und `fragen`), Designsystem https://claude.ai/artifact/UCNUpomPkoPTME8FZXJKyG (Version 8, Nachtarchiv), Website-Kopie https://claude.ai/artifact/7uH6poU6JSXsBMY7S912VM (Stand 19.10., veraltet), Design-Leinwand https://claude.ai/artifact/QbSwfFPDK1hUxZs6J3HT8W (veraltet), Varianten A https://claude.ai/artifact/HjgSNP8juM56nRhH2LwWVX, B https://claude.ai/artifact/WrmZ8WcWBzkd91CPe6rnSw, C https://claude.ai/artifact/SLQu8t5Sn7arL85A49nnKD (nicht gewählt), Umsetzungsbericht für ChatGPT https://claude.ai/artifact/QGmU9bRZqetCXSxyxMHofj.
- Videoproduktion außerhalb des Ordners: `C:\Automation\faceless-network` (Higgsfield, Gemini-Schlüssel in dessen `.env`, nie in den Scutoria-Ordner); YouTube-Kanal-Unterlagen in `Business\03 Kanäle\Scutoria` und `marketing/youtube/`. Näheres nicht Teil dieser Sitzung (nicht ermittelbar hier).

### 5.6 Zeitpläne und Automatik

- Lovable-Datenbank: pg_cron-Job `scutoria-retention-daily` täglich 03:00 UTC (E32 R4, Migrationen 0002 und 0003).
- Erinnerungsmails: nicht geplant (Schalter „off“, Job nicht angelegt).
- Google Drive: geplante Aufgaben „Tageslog“ (täglich 21:51 Wien) und „Monatslog“ (am 1., 06:50 Wien) fassen die Log-Einträge zusammen (Systemweit, nicht Scutoria-spezifisch).
- Stefan-Takt laut E16: ein Termin pro Woche, 30 Minuten (nicht geprüft, ob gelebt).

---

## 6. Zahlen, Daten, Preise und Fakten mit Quelle

| Fakt | Wert | Quelle, Datum |
|---|---|---|
| Preis je Toolkit | 99 Euro pro Jahr, keine Gründerstaffel | E34, Stefan 3.11.2026 |
| Frühere Preise | 199 Euro regulär, 99 Euro Gründerpreis für zehn Käufer je Toolkit, Bundle 299 Euro später | E21, 19.10.2026; Hypothese 149/199/249 E10, 18.10.2026 (beide ersetzt) |
| E-Book-Preismarke | 29 Euro für Band 1, überall enthalten (nur Herkunft der Zahl) | E9, 18.10.2026; Preismodell offen (F1) |
| Lizenz | Jahreslizenz, zwölf Monate, keine automatische Verlängerung, Erinnerung vor Ablauf (nicht aktiv) | Annahme A1, Produktseite, STAND 19.10. |
| Umsatzsteuer | Stripe Tax an, Preise „inklusive“; Kleinunternehmer oder Regelbesteuerung offen (Grenze 55.000 Euro nach § 6 Abs. 1 Z 27 UStG, RIS und USP, abgerufen 2.11.2026) | E19, E21, FREIGABE-RECHTSTEXTE-2026-11 |
| Toolkit 1 | 34 Fragen, 29 Pflicht; Handbuch 24 (EN) und 26 (DE) Seiten; 8 von 17 offenen Punkten | STAND 23.10.2026, PAGES in product.mjs |
| Toolkit 2 | 47 Fragen, 40 Pflicht, 24 Statusfragen; Handbuch 37 (EN) und 40 (DE) Seiten; 13 von 23 offenen Punkten | STAND 23.10.2026 |
| Tests bei Lovable | 251 bestanden, 1 rot (D5-PDF Englisch), vor der laufenden Runde | Lovable-Bericht Runde 3, 3.11.2026 |
| Axe | 144 Prüfungen ohne Befund | Lovable-Bericht Runde 3, 3.11.2026 |
| Lovable-Credits | 105 gesamt nach Zukauf 23.10.; 14,9 übrig laut Editor 30.10. abends; 67,9 Projekt-Credits vor Stufe 1 am 2.11.; Aufladung 2.11. (Betrag nicht genannt); am 3.11. verbraucht: Cinema 8,6, Runde E34/E35/E36 7,5, Folgerunde 1,2, zusammen 17,3 | STAND; aktueller Stand nicht ermittelbar |
| Lovable-Tarif | Business, 50 Euro im Monat; Pro 25 Euro | lovable.dev/de/pricing, abgerufen 30.10.2026; E28 |
| Render `scutoria-site` | 7 Dollar im Monat plus 0,25 Dollar je GB Datenträger | Render-Formular 21.10.2026 |
| Render `swk-shop` | Plan „starter“, Betrag nicht ermittelbar ohne Rechnung | Render-Konnektor 21.10.2026 |
| Brevo | 300 Mails am Tag, Gratis-Plan | Brevo-Konnektor 21.10.2026 |
| Alter Shop | null Kundenverkäufe seit Live-Gang 9.9.2026 | STAND 18.10.2026 |
| Verkäufe neue Website | keiner bekannt bis 2.11.; danach nicht geprüft | E31; nicht ermittelbar ohne Stripe-Dashboard |
| Domain-Zertifikat | gültig bis 28.01.2027 | STAND 30.10.2026 |
| DNS Lovable | A 185.158.133.1 | docs.lovable.dev/features/custom-domain, abgerufen 26. und 30.10.2026 |
| Deployments | Runde E34/E35/E36 f670a92c (3.11. 20:35); Cinema ae2b12b2 (3.11. 16:30); E32-Runde 60d7d25a (2.11.); Redesign 511d0a08… (2.11.); Stufe 1 543e03be… (2.11.); frühere 2fef5100…, 6c53bcdb… (30.10.) | STAND |
| Lovable-Commits 3.11. | Cinema 851e405, 5b3043a, 039c979; Runde E34/E35/E36 fa04401; Folgerunde ab0b322 | Lovable-Berichte 3.11.2026 |
| Lokale Commits 3.11. | e66e907, bbf6ba0, 22ab72d, 0b86240, 4d1d7fe, c09b0eb; 136 Commits insgesamt | git log |
| Live-Prüfung 3.11. 16:30 | 32 Adressen, 32 Sitemap-Einträge | Prüfskript der Sitzung |
| Anschrift des Anbieters | Kleinpoppen 18, 3902 Vitis, Österreich (Hausnummer aus dem Stripe-Konto, von Stefan nicht bestätigt) | FREIGABE-START 30.10.2026 |
| Gewerbebehörde | Bezirkshauptmannschaft Waidhofen an der Thaya | noe.gv.at und § 333 GewO, abgerufen 2.11.2026 |
| GISA | kein Eintrag für Stefan auffindbar | gisa.gv.at, 30.10.2026 |
| KI-Verordnung | Art. 4 seit 2.2.2025, Art. 50 seit 2.8.2026, Hochrisiko Anhang III ab 2.12.2027 | PLANUNG-2026-11, Q1 (EUR-Lex, abgerufen 3.11.2026) |
| NISG 2026 | Kernteile seit 1.10.2026, Registrierung binnen drei Monaten (Behörde: 1. bzw. 4.1.2027; WKO: 31.12.2026) | PLANUNG P3, Stand prüfen |
| FAGG § 13a | Online-Rücktrittsfunktion seit 1.10.2026 | RIS, abgerufen 2.11.2026, Stand prüfen |
| Planung | 29 Toolkits (2 verfügbar, 1 in Vorbereitung, 26 neu; Stufe 1: 9), 29 E-Books (2 vorhanden, 27 neu) | produkte/PLANUNG-2026-11.md, 3.11.2026 |
| Videoprogramm | 10 Langvideos, 12 Shorts geplant, 2 Langvideos in Produktion, nichts veröffentlicht | site/content/studio.json, Stefan 3.11.2026 |
| Lovable-Vertragspartner | Lovable Labs Incorporated, Boston, USA; Auftragsverarbeitungsvertrag nur Business und Enterprise | lovable.dev/terms (28.8.2026), DPA (6.11.2025), Support 30.10.2026 |

Nicht ermittelbar: aktueller Lovable-Credit-Stand (nur im Editor sichtbar), Stripe-Umsätze und Käufe nach dem 2.11. (kein Dashboard-Zugang), Betrag der Render-Rechnung für `swk-shop`, ob das Webhook-Geheimnis zu Stripe passt (erst ein echtes Ereignis zeigt es), Gewerbebezeichnung und Fachgruppe (GISA-Auszug bei Stefan), Steuerstatus (Steuerberater), Kosten der laufenden Lovable-Runde (bis zum Bericht).

---

## 7. Getroffene und offene Entscheidungen

### 7.1 Getroffen (E1 bis E36, Kurzfassung; Details in ENTSCHEIDUNGEN.md und im Dossier)

- Strategie: Neustart komplett neu (E3), lokal ohne GitHub (E2), drei Produktlinien (E5), erste Linie KI-Regeln (E6), Marke ohne Gesicht (E8, E20), EU-weit mit Englisch primär (E13), keine Beratung (E14), 300 Euro Anzeigen-Test (E15), Wochentakt (E16), Name „Toolkit“ (E17).
- Technik: alles über Stripe (E19), Umzug zu Lovable (E22) mit 100 Credits (E23), Datenbank in Europa (E24), Lovable Business wegen Auftragsverarbeitungsvertrag (E28).
- Produkt: Korrekturen aus der Prüfung (E25), Produktentscheidungen (E26: „Sie“ im Handbuch, Funktionen statt Namen, B3-Lücke, Musteranschrift), Marker sichtbar (E12), Tools und Memos (E11), Vorschauen aus vier Kapiteln je eine Seite (E35), Palette Toolkits vor E-Books (E36).
- Preise: 99 Euro pro Jahr je Toolkit ohne Gründerstaffel (E34); Jahreslizenz je Produkt plus Bundle (E7, Bundle fraglich, F2); E-Book 29 Euro nur als Herkunft (E9).
- Recht: Rechtstexte freigegeben als Veröffentlichungsentscheidung ohne Rechtsprüfung (E27, E30), R1 bis R9 übernommen (E32), Kauf im Vorschaumodus offen (E31).
- Gestaltung: Nachtarchiv (20.10., abgelöst), Redesign Variante A (E29, abgelöst), Sapphire Cinema mit Hero-Option 2 (E33).

### 7.2 Offen, mit Für und Wider

1. **E-Book-Preismodell (F1 der Planung, Tor Geld).** A alles frei: größte Reichweite, kein Erlös aus Wissen, Texte kopierbar. B Einheitspreis einmalig (Arbeitshypothese 29 Euro, 19 Euro als Variante), im Toolkit der Linie enthalten, zwei Grundlagenbücher frei: eine Regel, Einzelkauf möglich, aber zweiter Produkttyp im Shop, Widerruf bei digitalen Inhalten, Versionspflege, Lieferung als PDF im Konto fehlt noch. C nur mit Toolkit: am einfachsten, aber Wissen nicht „eigenständig verkauft“. Empfehlung in der Planung: B; Betrag ist Stefans Entscheidung.
2. **Bundle zu 299 Euro streichen (F2).** Für: mit 99 Euro je Toolkit hinfällig, eine Regel weniger. Wider: E7 nennt das Bundle; eine Linienlizenz könnte später sinnvoll sein. Empfehlung: streichen, später als neue Entscheidung.
3. **Impressum und AGB Variante A (Kleinunternehmer) oder B (Regelbesteuerung).** Hängt an S1 bis S5 beim Steuerberater; bis dahin die alten Fassungen mit Klammern live. Risiko: falscher Umsatzsteuer-Ausweis über Stripe Tax bei einem echten Kauf (Stand prüfen, keine Steuerberatung).
4. **Anwaltsprüfung R10 vor dem regulären Verkauf.** Für: Schaltflächenbeschriftung in der Stripe-Kasse (§ 8 Abs. 2 FAGG), gemeinsames Häkchen, Pflicht zur Rücktrittsfunktion; danach `legalReviewedAt` setzbar. Wider: Kosten, Verzögerung. Empfehlung in E32: ja, vor dem ersten regulären Verkauf.
5. **Live-Schalter (`siteMode` live) und Probekauf.** Für: Suchmaschinen sehen die Seite, Generator nur mit Lizenz, Vorschau-Chip ohnehin weg. Wider: Gewerbe im GISA nicht auffindbar, Steuerstatus offen, Rechtstexte nicht anwaltlich geprüft. E30 bindet den Live-Schalter an die Klärung des Gewerbes.
6. **Kauf im Vorschaumodus (E31, „Offen lassen“).** Claudes Empfehlung war Sperren mit Verweis auf die Warteliste; Stefan ließ ihn offen. Risiko bleibt, Reichweite gering (Suchmaschinen gesperrt).
7. **Generator im Vorschaumodus ohne Lizenz.** Jeder kann mit eigenen Angaben vollständige Dokumente erzeugen (Teil von E31). E35 ändert daran nichts; ob Stefan das weiter will, ist nicht gefragt worden.
8. **Render-Dienste abschalten.** `swk-shop` (Suspend) und `scutoria-site` (Rückweg) kosten weiter; Abschalten nur auf Stefans Wort. Wider: Rückweg verschwindet.
9. **Reihenfolge der nächsten Toolkits (F4):** 03 KI-Einrichtung zuerst, weil angekündigt; Alternative wären die breiter treffenden DSGVO-Toolkits 08 und 12.
10. **Länderabdeckung (F5), Randthemen (F6), Abgrenzung 01 zu 04 bis 07 (F7), Rechtsprüfung vor DSGVO-Toolkits (F8), freie E-Books ganz frei oder Leseprobe (F3):** Empfehlungen in `produkte/PLANUNG-2026-11.md`, Abschnitt 7.
11. **D5-PDF-Testfehler:** Testerwartung oder Renderer anpassen; Ursache noch nicht gesucht.
12. **Markenbuch und Markendatei an Sapphire Cinema angleichen:** bisher nicht beauftragt; Risiko, dass eine neue Sitzung das Nachtarchiv als gültig liest (die Dateien sagen es noch).
13. **Umzug der YouTube-Unterlagen** (Business-Hauptsitzung, später).

---

## 8. Probleme, Fehler, Risiken

### 8.1 Gelöst

- Kaufweg in Chrome blockiert (F01): CSP `form-action` ohne Stripe-Ziele; am 2.11. mit `https://checkout.stripe.com https://billing.stripe.com` behoben und live geprüft.
- Stripe-Schlüssel im Oktober falsch gesetzt (Kennung statt Token bei Render): mit dem Umzug zu Lovable erledigt (Schlüssel am 29./30.10. in Lovable eingetragen, `/health` meldet Kasse „stripe“).
- Brevo lehnte Lovables wechselnde IP-Adressen ab (401): IP-Sperre für API-Schlüssel am 30.10. deaktiviert; Testmails kamen an.
- Webhook-Fehler (A: Ereignis als erledigt vermerkt trotz Fehlschlag; B: gleichzeitige Freischaltung): am 30.10. behoben (Lovable-Commit e3dc736).
- Domain antwortete nach dem DNS-Wechsel mit 421: Lovable verlangt TXT-Einträge `_lovable` und `_lovable.www`; nach dem Eintragen live.
- Lovable-Datenbank zuerst in den USA: Remix mit EU-Datenbank (E24).
- Lovable-Abzeichen und Besucherstatistik: am 2.11. ausgeschaltet.
- Mobilmenü fehlte, 404 lieferte Startseite: Stufe 1 am 2.11.
- Kontrastbefunde nach Cinema (Fakt-Marker 4,45:1, Posternummer 1,25:1, 404-Knopf 1,95:1): am 3.11. behoben (Marker auf Akzentblau #75a7ff, Posternummer als CSS-Dekoration, Knopf wieder weiß); Axe ohne Befund.
- Lovable-Vorschau zeigte neuen Code erst nach Öffnen des Editors (2.11.): bekannt, Vorschau nach jeder Runde im Editor oder per Abruf prüfen.
- Lovable nimmt höchstens zehn Anhänge je Nachricht: Runden teilen oder ein ZIP senden (3.11.).
- Lokaler PDF-Renderer fand die TTF-Schriften nicht: am 3.11. von scutoria.com geholt (`site/public/fonts/ttf/`).
- Headless Chrome unter Windows klemmt die Fensterbreite: Handyprüfungen in der App-Vorschau mit Emulation.
- Full-Beispiel-PDFs und Handbuch-PDFs waren öffentlich: mit E35 entfernt (bei Lovable in der laufenden Runde).

### 8.2 Offen oder Risiko

- **Gewerbe:** GISA kennt keinen Eintrag für Stefan, E1 sagt „angemeldet“. Ohne Klärung kein regulärer Kundenbetrieb (E27), kein Live-Schalter (E30). Keine Rechtsberatung, Stand prüfen.
- **Steuer:** Kleinunternehmer oder Regelbesteuerung offen; Stripe Tax rechnet derzeit mit Umsatzsteuer „inklusive“; bei einem echten Kauf im Vorschaumodus (E31) möglicherweise falscher Ausweis.
- **Rechtstexte** nicht anwaltlich geprüft (R10 offen); Impressum und AGB mit Klammern live.
- **Webhook-Geheimnis** nie durch ein echtes Ereignis bestätigt; außerdem war es am 30.10. auf einem Kontroll-Screenshot kurz sichtbar: in Stripe neu erzeugen, in Lovable ersetzen, neu veröffentlichen (empfohlen, offen).
- **Umgebungswerte bei Lovable:** Ob `PRICE_*` oder `PILOT_SEATS*` dort gesetzt sind und die 99 Euro überschreiben, prüft die laufende Runde (Schritt 3 des Auftrags).
- **Testsuite:** ein roter Test (D5 Englisch); Lovable passt Tests bei jeder Runde an, Anweisung lautet immer „Sicherheits-, CSP-, 404-, Weiterleitungs-, PDF-, Lösch-, Widerrufs- und Zahlungstests nie schwächen“; nach jeder Runde den Bericht lesen.
- **Generator offen** im Vorschaumodus (E31): vollständige Dokumente ohne Kauf möglich.
- **Vorschaumodus:** keine Indexierung, keine Reichweite; Anzeigen-Test (E15) und Search Console warten.
- **Kosten laufen:** Lovable Business, Render `swk-shop` und `scutoria-site`, ohne Umsatz.
- **Backups:** Code liegt bei Lovable und im Spiegel `site/` (gespiegelt am 3.11.; Lovables spätere Teständerungen nicht gespiegelt). Kein GitHub (E2). Git-Bundle in `_archiv/`. Lovable-Code-Download als ZIP wäre im Business-Tarif möglich (nicht gemacht).
- **Veraltete Dateien:** `CLAUDE.md` (Satz zum alten Shop), `.claude/skills/scutoria-brand/SKILL.md` und `design/project/README.md` (Nachtarchiv statt Cinema), Website-Artefakt und Design-Leinwand (Stand 19./21.10.).
- **Zwischenergebnisse im Scratchpad** (ZIP, Manifest, Prüfskript) können mit der Sitzung verschwinden; alles Wesentliche ist committet, das Manifest nicht (die Prüfsummen stehen in der Lovable-Nachricht und im Chat).
- **Cloudflare-Cookie `__cf_bm`** wird gesetzt (in der Datenschutzerklärung seit E30 genannt).
- **Zwei Testläufe** in der Lovable-Datenbank (`31gO4vCuOPHa`, `IWks5J6kh4oA`) und Stefans Gmail-Adresse in Brevo-Liste 2.

---

## 9. Offene Aufgaben und nächste Schritte in Reihenfolge, mit Abhängigkeiten

1. **Laufende Lovable-Runde abschließen (Claude, sofort).** `get_message` für `umsg_01m6hcpgp9e5bsmekss4x71wv3` abrufen, bis `response.status` „completed“ ist. Prüfsummen mit der Liste in Abschnitt 4.2 und `lovable/AUFTRAG-E34-E35-2026-11-03.md` vergleichen; Testzahlen (erwartet: alle bis auf D5 grün), Axe, Umgebungswerte (Namen) lesen. Weicht etwas ab: kleine Korrekturrunde mit byteweisen Dateien. Dann Vorschau prüfen (Kopfleiste, Bibliothek, Handbuch-Leseprobe, Preis).
2. **Veröffentlichen (Claude, Stefans Wort „Ja, beides“ liegt vor).** `deploy_project` für das Projekt; danach die Live-Prüfung (Abschnitt 4.2). Dann STAND.md (neuer Punkt mit Deployment-Kennung, Credits, Prüfergebnis), AUFGABEN.md (Zeilen 147 und 149 auf erledigt), Commit, Drive-Log. Abhängig von Schritt 1.
3. **Stefan: Fragen F1 bis F8** in `produkte/PLANUNG-2026-11.md` beantworten; danach E37 ff. ins Dossier (Claude). Abhängig davon: Bundle streichen (F2), Bauplan Toolkit 03 (F4), E-Book-Mechanik (F1, F3), Feld `ebook` in `studio.json`.
4. **Stefan: Gewerbe (GISA-Auszug, Fachgruppe), Steuerberater S1 bis S5.** Abhängig davon: Impressum und AGB Variante A oder B (Claude überträgt byteweise, Lovable-Runde, Veröffentlichung auf Wort), Umsatzsteuer-Einstellung in Stripe (Stefan).
5. **Anwaltsprüfung R10** (Stefan beauftragt), danach `legalReviewedAt` setzen (Claude, Lovable-Runde).
6. **Live-Schalter und Probekauf** (nach 4 und 5, Stefans Wort): `siteMode` auf „live“, Veröffentlichung, Probekauf 99 Euro mit Erstattung im Stripe-Dashboard, Prüfung von Willkommensmail, Konto, Lizenz, Generatorlauf, Nachweisordner, Rechnung im Kundenportal, Webhook-Ereignis. Vorher Webhook-Geheimnis neu erzeugen (Empfehlung).
7. **Danach:** Render `swk-shop` Suspend und `scutoria-site` abschalten (Stefans Wort), Search Console (Claude liefert den DNS-Eintrag), Sitemap einreichen, Anzeigen-Test 300 Euro (E15), Erinnerungs-Job (pg_cron-SQL, Token im Vault) anlegen lassen und `reminders` auf „on“ (nicht dringend).
8. **Claude, unabhängig von Stefan:** D5-PDF-Testfehler untersuchen (Sitzungskarte vorhanden); OG-Bilder mit dem Cinema-Motiv neu erzeugen und übertragen; Markenbuch und Markendatei an Cinema angleichen (nach Stefans Wort, weil es Texte für Sitzungen ändert); `CLAUDE.md` Satz zum alten Shop berichtigen; Tastatur- und Bildschirmleserprüfung der Cinema-Seiten.
9. **Produktaufbau (nach Schritt 3):** Toolkit 03 KI-Einrichtung nach dem Bauweg in Abschnitt 3.8 der Planung (Bauplan, Quellenprotokoll, Fragen, Dokumente, Handbuch, Muster, Leseproben, Produktseite, Lovable-Runde, Freigaben an den drei Toren); E-Books 03 „Belegt. Datiert. Vorzeigbar.“ und 04 KI-Verordnung.
10. **Laufend:** Drive-Log am Ende jeder Sitzung; Entscheidungen sofort ins Dossier und in ENTSCHEIDUNGEN.md; STAND.md und AUFGABEN.md nachführen; nie veröffentlichen, Geld ausgeben oder Rechtstexte live stellen ohne Stefans Wort.

---

## 10. Offene Fragen an Stefan

1. F1: E-Book-Preismodell A, B oder C, und welcher Betrag bei B (Arbeitshypothese 29 Euro, Variante 19 Euro)?
2. F2: Bundle zu 299 Euro (E7, E21) streichen?
3. F3: Die zwei Grundlagen-E-Books ganz frei lesbar (PDF gegen E-Mail wie die Memos) oder nur Leseprobe?
4. F4: Toolkit 03 KI-Einrichtung zuerst, dann 08, 12, 05, 09?
5. F5: Weiter nur Österreich und Deutschland mit Ländernotizen, andere Mitgliedstaaten als Lücke?
6. F6: Randthemen 24 Hinweisgeber, 25 Barrierefreiheit, 27 Produktsicherheit, 29 CRA in der Planung lassen (Stufe 2 und 3)?
7. F7: Abgrenzung von Toolkit 01 zu 04 bis 07 wie empfohlen (andere Dokumente, Querverweise im Konto)?
8. F8: Keine Rechtsprüfung als Bedingung für die DSGVO-Toolkits, weil sie Nachweise und keine Rechtstexte erzeugen?
9. Gewerbe: Liegt ein GISA-Auszug vor (Wortlaut der Gewerbeberechtigung, Fachgruppe)? Die öffentliche Abfrage zeigt keinen Eintrag.
10. Steuerberater: Antworten auf S1 bis S5 (Kleinunternehmer oder Regelbesteuerung, OSS, Reverse Charge, Stripe Tax, Rechnungen)?
11. Anwaltsprüfung R10: beauftragen, und wann?
12. Live-Schalter und Probekauf: wann, und soll der Generator bis dahin weiter ohne Lizenz laufen (E31)?
13. Soll das Webhook-Geheimnis in Stripe neu erzeugt werden (war am 30.10. auf einem Screenshot sichtbar)?
14. Render: `swk-shop` ganz anhalten und `scutoria-site` abschalten?
15. Dürfen die zwei Testläufe in der Lovable-Datenbank gelöscht werden, und nimmst du deine Gmail-Adresse aus Brevo-Liste 2?
16. Darf Claude Markenbuch, Markendatei und `CLAUDE.md` an den Cinema-Stand angleichen?
17. Umzug der YouTube-Unterlagen (`marketing/youtube`) später: ja oder bleibt?
18. Hausnummer Kleinpoppen 18 und Kontaktadresse kontakt@scutoria.com bestätigen (Freigabevorlage in `live/FREIGABE-START.md`).

---

## 11. Begriffe und Abkürzungen

- **Toolkit:** Fragengenerator mit datierten Dokumenten, Handbuch, Mustern und Jahreslizenz. Toolkit 01 KI-Richtlinien (AI Policy Toolkit), 02 Sicherheitsnachweis (Security Evidence Toolkit), 03 KI-Einrichtung (AI Setup Toolkit, in Vorbereitung).
- **D1 bis D7:** Die Dokumente eines Toolkits (zum Beispiel D1 Richtlinie oder Selbstauskunft, D7 Nachweisseite). **HB:** Handbuch.
- **Handbuch:** Erklärwerk je Toolkit mit vier Markern, Quellenzeilen und offenen Punkten; seit E35 öffentlich als Leseprobe (vier Kapitel, je etwa eine Seite), Vollfassung nur mit Lizenz.
- **Leseprobe / Sample:** Vorschau nach E35: nie alles, aus vier Kapiteln je eine Seite; bei Beispiel-PDFs Seite 1 von vier Dokumenten mit Hinweiszeile.
- **Marker:** Fakt (Quadrat), Auslegung (Raute), Unsicher (Halbkreis), Lücke (gestrichelter Kreis); immer mit Form, nie nur Farbe.
- **Beispielbetrieb:** Muster Elektrotechnik e.U. (DE) / Example Electrical Ltd (EN), erfundener Betrieb mit erfundener Anschrift; Grundlage aller Muster.
- **Memo-Generator:** Freies Formular, Ergebnis als datiertes Memo-PDF per E-Mail (NIS2, KI-Kennzeichnung, Anmeldesicherheit, Wo anfangen).
- **Tools:** Zwei Browser-Werkzeuge ohne Datenübertragung („Darf das hinein?“, „Steht da etwas Persönliches drin?“); im Sprachgebrauch der Website umfasst „Tools“ auch die Memo-Generatoren.
- **Nachweisseite / Nachweisordner:** Datierte Zusammenfassung je Lauf; Ordner im Konto mit Läufen und eingefrorenen Fassungen.
- **Jahreslizenz:** Zwölf Monate für einen Betrieb, ohne automatische Verlängerung. **Gründerpreis / Pilot seats:** frühere Staffel (zehn Käufer zu 99 Euro), seit E34 abgeschafft; im Code bleiben die Felder mit null Plätzen.
- **Vorschaumodus (SITE_MODE preview):** Seiten mit noindex, robots gesperrt, Generator ohne Lizenz; früher mit Chip „Vorschau“. **Live-Schalter:** `siteMode` in `content/site-settings.json`.
- **Drei Tore:** Geld, Recht, Veröffentlichen; dort fragt Claude immer.
- **Belegregel:** Quelle und Abrufdatum je Zahl, Frist und Rechtsaussage; „nicht ermittelbar“ und „Stand prüfen“ als Kennzeichnungen.
- **Dossier:** Entscheidungsartefakt auf claude.ai mit Datenbank (`entscheidungen`, `fragen`); `ENTSCHEIDUNGEN.md` ist der Export.
- **E-Nummern:** Entscheidungen E1 bis E36. **F-Nummern:** drei verschiedene Reihen: Fragenkatalog vom 18.10. (F1 bis F8 in ENTSCHEIDUNGEN.md), Befunde der ChatGPT-Analyse vom 1.11. (F01 bis F18), Fragen der Produktplanung vom 3.11. (F1 bis F8). **R-Nummern:** Entscheidungen R1 bis R10 der Rechtstext-Bereinigung (E32). **S-Nummern:** Fragen S1 bis S5 an den Steuerberater. **A-Nummern:** Annahmen A1 bis A4 der Rechtstexte. **T-Nummern:** Entscheidungen in den Bauplänen der Toolkits. **Q- und P-Kürzel:** Quellen der Produktplanung.
- **Sapphire Cinema:** Gestaltungsrichtung seit E33 (Navy, saphirblaue Akzente, Bildbühne, Bibliothek, Studio). **Nachtarchiv:** frühere Richtung (20.10. bis 2.11.). **Saphir, Verlag, Studio:** die drei nicht gewählten Claude-Varianten vom 2.11.
- **Tokens:** `design/project/tokens.json`, daraus `public/tokens.css`; `bundle.css` die Bausteine des Designsystems, `site.css` Seitenaufbau, `cinema.css` die Cinema-Komponenten, `motion.css`/`motion.js` Bewegung.
- **Lovable:** Plattform, auf der die Website gebaut und gehostet wird (KI-Agent, Credits je Runde, Projektwissen, Vorschau, Publish). **Lovable Cloud:** Datenbank auf Supabase. **Connector / Konnektor:** die Lovable-Anbindung in Claude (Dateien hochladen, Nachrichten senden, Ergebnis abrufen, veröffentlichen).
- **TanStack Start, Cloudflare Workers, Vite, Supabase:** Lovables Technik; der Original-Code läuft darin über einen Express-Adapter.
- **CSP:** Content-Security-Policy, die Sicherheitsregel jeder Seite (keine fremden Skripte, keine Inline-Styles).
- **Axe, WCAG:** Prüfwerkzeug und Norm für Barrierefreiheit; läuft in der Testsuite.
- **pdf-lib:** PDF-Erzeugung ohne Browser bei Lovable und im lokalen Starter.
- **Brevo:** Mailversand (Transaktionsmails). **Stripe Checkout, Stripe Tax, Kundenportal, Webhook:** Kasse, Steuerberechnung, Rechnungsportal, Rückmeldung nach Zahlung.
- **Render:** früheres Hosting; `swk-shop` alter Shop (Wartungsmodus), `scutoria-site` Rückweg. **GoDaddy:** Domain-Registrar und DNS.
- **GISA:** Gewerbeinformationssystem Austria. **WKO:** Wirtschaftskammer Österreich. **FAGG:** Fern- und Auswärtsgeschäfte-Gesetz (Österreich). **UID:** Umsatzsteuer-Identifikationsnummer. **OSS:** One-Stop-Shop der EU-Umsatzsteuer. **Reverse Charge:** Umkehr der Steuerschuld bei Firmenkunden in anderen EU-Staaten.
- **KI-VO / AI Act:** Verordnung (EU) 2024/1689. **DSGVO / GDPR:** Verordnung (EU) 2016/679. **NIS2:** Richtlinie (EU) 2022/2555; **NISG 2026** die österreichische Umsetzung. **CRA:** Cyber Resilience Act, Verordnung (EU) 2024/2847. **DORA:** Verordnung (EU) 2022/2554 (Finanzsektor).
- **OG-Bilder:** Vorschaubilder für geteilte Links (`public/og/`).
- **Scratchpad:** temporärer Arbeitsordner einer Claude-Sitzung. **Drive-Log:** Log-Eintrag je Sitzung in Google Drive. **Sitzungskarte:** in der Claude-Desktop-App vorgeschlagene, noch nicht gestartete Folgesitzung.

---

## Nachtrag: Ergebnis der Lovable-Runden, Veröffentlichung und Live-Prüfung (3.11.2026, 20:35)

- **Runde 1** (ZIP mit 31 Dateien, Nachricht `umsg_01m6hcpgp9e5bsmekss4x71wv3`): abgeschlossen, Lovable-Commit fa04401, 7,5 Credits. Alle 31 Prüfsummen stimmen mit dem Manifest überein. Handbuch-PDFs nach `content/toolkits/<toolkit>/handbook.<sprache>.pdf` verschoben, 14 alte Beispiel-PDFs gelöscht. Keine der sechs Preis-Umgebungsvariablen in `.env`, Secrets oder Prozessumgebung; keine Wrangler-Konfiguration vorhanden. Tests angepasst (`home-e29`, `header-csp-404`, `e30`, `e25`, `phase4`, `stage5`), neu `src/test/e35-previews.test.ts`; Suite 266 bestanden, 1 rot (englisches D5-PDF, bekannt). Axe ohne Befund auf den acht Seiten bei 1280 und 360 px; Regression 144 Prüfungen ohne Befund. Lovable änderte außerdem `AGENTS.md`, `roadmap.md` und sein Projektgedächtnis. Zwei gemeldete Grenzen: sechs Werkbank-Links der Startseite zeigten auf gelöschte PDFs (Runde 2); der Entwicklungsserver liefert `/content/toolkits/ai-policy/handbook.en.pdf` ohne Lizenz aus, während die Handbuch-Endpunkte die Lizenz prüfen; für die veröffentlichte Fassung siehe die Live-Prüfung unten.
- **Runde 2** (`home-e29.mjs`, Nachricht `umsg_01m6he2tr7fh6rv0hkvs9g1xs0`, gesendet 20:28): abgeschlossen, Lovable-Commit ab0b322, 1,2 Credits. Prüfsumme fe7e60a0621c557a424acda41778c4376ffc75f88ab8d2336a11049a5d4d90c0 stimmt; Suite 266 zu 1; alle 14 Musterlinks auf `/` und `/de/` zeigen auf vorhandene Dateien und liefern 200. Lokal Commit 0ec211d.
- **Veröffentlichung:** Deployment `f670a92c-e134-4ab9-aa2f-30bd4eeaee6e`, ausgelöst über den Konnektor auf Stefans Wort „Ja, beides“.
- **Live-Prüfung von außen (scutoria.com):** neuer Stand nach 7 Sekunden ausgeliefert; Kopfleiste ohne Bewegungsschalter und Vorschau-Chip, kein Gründerpreis, Preis 99,00 auf Startseite und Produktseite; Fußzeile Toolkits (zwei Toolkits, Bibliothek), Wissen (Tools, Memos, Studio, Über Scutoria), Konto (Konto, Vertrag widerrufen), Rechtliches; Bibliothek mit drei Einträgen, Brotkrumen-Link und „Leseprobe lesen“; Studio-Brotkrume verlinkt; Produktseite mit vier einseitigen Mustern und Handbuch-Leseprobe; Handbuchseiten DE und EN als Leseprobe (Titel „Leseprobe“ bzw. „Reading sample“, vier Auszüge, kein PDF-Knopf), PDF-Routen antworten 303; alte Beispiel- und Handbuch-PDFs 404, auch `/content/toolkits/…/handbook.*.pdf` 404 (kein Leck in der veröffentlichten Fassung); alle Musterlinks der Startseite 200; 32 von 32 Adressen wie erwartet; `/health`, robots (Disallow) und Sitemap (32) unverändert.
- **Lovable-Credits am 3.11.2026:** Cinema 8,6, Runde E34/E35/E36 7,5, Folgerunde 1,2; zusammen 17,3. Kontostand nicht ermittelbar ohne Editor.
- **Damit erledigt:** Abschnitt 4.2 und die Schritte 1 und 2 in Abschnitt 9. Nächster Schritt: Abschnitt 9, Schritt 3 (Stefans Antworten F1 bis F8) und Schritt 4 (Gewerbe, Steuerberater); Claude-Aufgaben in Schritt 8.

## Zweiter Nachtrag: Antworten auf die offenen Fragen, Live-Schalter (3.11.2026, 21:10)

- Stefan hat alle Fragen aus Abschnitt 10 beantwortet (zwanzig Antworten, Dossier E37 bis E40, `ENTSCHEIDUNGEN.md`, Commit 24f3419): E37 E-Books 29 Euro einmalig und im Toolkit enthalten, auch die Grundlagenbücher nur als Leseprobe, Bundle gestrichen; E38 Reihenfolge 03, 08, 12, 05, 09, Länder Österreich und Deutschland, Randthemen bleiben, 01 bleibt Einstieg, keine Anwaltsbedingung für DSGVO-Toolkits; E39 Live-Schalter jetzt, kein Anwalt vor dem Start, Webhook-Geheimnis bleibt, Anschrift bestätigt, GISA-Auszug und Steuerantwort liefert Stefan nach; E40 Render abschalten, Testdaten löschen, Markendateien angleichen, YouTube bleibt, D5 in eigener Sitzung, Search Console danach.
- Umgesetzt: `CLAUDE.md`, Markendatei und Markenbuch an Sapphire Cinema angeglichen; `produkte/PLANUNG-2026-11.md` mit den Antworten nachgeführt; Lovable-Runde Live-Schalter (`content/site-settings.json` auf live, Lovable-Commit 2b83016, 3,1 Credits; SITE_MODE nirgends gesetzt; die zwei Testläufe gelöscht; Suite 266 zu 1); Deployment 2a3a59ee um 21:10.
- Live-Prüfung von außen: Live-Modus nach 2 Sekunden ausgeliefert: `/health` meldet mode live; robots erlaubt die öffentlichen Seiten und sperrt Konto, Kasse, Stripe und die Generatorläufe; Startseite, Bibliothek, Produkt- und Handbuchseite ohne noindex, ohne Chip und ohne Schalter, Konto und Widerruf mit noindex; Generatorstart ohne Lizenz EN und DE antwortet 303 mit ?m=licence; Produktseite mit Kaufknopf und Preis 99, ohne Startformular und ohne Vorschauhinweis; Kauf antwortet 303 zur Stripe-Kasse (Sitzung verfällt unbezahlt); Handbuch-Leseprobe mit vier Auszügen; Sitemap 32 Adressen, Rechtsseiten wie vorgesehen erst nach der Rechtsprüfung.
- Damit gilt für Abschnitt 4.1: Vorschaumodus beendet; Abschnitt 7.2 Punkte 1 bis 7 und 9 bis 13 entschieden; Abschnitt 9 Schritte 1 bis 3 erledigt, Schritt 5 entfällt (kein Anwalt), Schritt 6 wartet nur noch auf Impressum und AGB nach GISA und Steuerantwort und auf den Probekauf; Abschnitt 10 beantwortet. Offen bei Stefan: GISA-Auszug, Steuerantwort weitergeben, Render-Dienste, Brevo-Liste, Search Console, Sitzungskarte D5, Probekauf. Offen bei Claude: Bauplan Toolkit 03, E-Book-Verkauf (E37), Impressum und AGB nach den Nachlieferungen, OG-Bilder.
- Lovable-Credits am 3.11.2026 gesamt: 20,4 (17,3 plus 3,1).
