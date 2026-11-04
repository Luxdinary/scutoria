# Gemini-Stimme: die Skripte auf Deutsch und Englisch vertonen

Stand 29. Oktober 2026. Nichts wird gekauft, nichts eingerichtet und kein Schlüssel angelegt ohne Stefans Wort (Tor Geld). Alle Preise und Funktionen stammen von Googles eigenen Seiten mit Abrufdatum 29. Oktober 2026 und können sich ändern; vor der ersten Vertonung „Stand prüfen“ auf den genannten Seiten.

## 1. Was Google heute anbietet

| Angebot | Was es ist | Deutsch und Englisch | Liest ein Skript wörtlich? | Bedienung | Kosten | Eignung |
|---|---|---|---|---|---|---|
| Gemini-API Text-to-Speech über Google AI Studio („Generate speech“) | Die TTS-Modelle der Gemini-API im Browser, ohne Code: Text einfügen, Stimme wählen, Stilanweisung, Ausführen, WAV herunterladen | ja, beide; Gemini 3.8 Flash TTS „über 130 Sprachen“, Deutsch gelistet | ja („verbatim transcript“) | Browser, Google-Konto, kein Schlüssel nötig für die Oberfläche | Free-Tier „free of charge“; bezahlt ab Bedarf (Abschnitt 4) | Empfehlung |
| Gemini-API Text-to-Speech über die API | dasselbe Modell, per Programm; Claude könnte die Vertonung übernehmen | ja | ja | braucht einen API-Schlüssel in Stefans Google-Konto | wie oben | Option, wenn Stefan Zeit sparen will (Tor Geld: Schlüssel anlegen) |
| Google Cloud Text-to-Speech | Der Cloud-Dienst mit Stimmfamilien Standard, WaveNet, Neural2, Studio, Chirp 3 HD, Gemini-TTS; Konsole oder API; SSML | ja | ja | Google-Cloud-Projekt; Abrechnung muss aktiviert sein, auch für das Freikontingent | Freikontingent je Stimmfamilie, danach je Million Zeichen (Abschnitt 4) | Rückfalloption; mehr Einrichtung, kein Vorteil für zehn Videos |
| NotebookLM Audio Overview | Zwei synthetische Moderatoren unterhalten sich über hochgeladene Quellen; Ausgabesprache einstellbar, „80+ Sprachen“; auf dem Web herunterladbar | ja | nein: NotebookLM fasst zusammen, es liest kein Skript vor | Browser | in der Grundfassung ohne Kosten (Stand prüfen) | ungeeignet, weil der Wortlaut nicht kontrollierbar ist und jede Quellenzeile verloren ginge |
| Google Vids | Videowerkzeug von Google Workspace, seit 15. April 2026 mit KI-Sprechern in 24 Sprachen, darunter Deutsch, auch für private Google-Konten | ja | ja, je Szene aus dem eingegebenen Skript | Browser | laut Workspace-Updates verfügbar; ob Sprecher dauerhaft kostenlos bleiben, ist offen (Stand prüfen) | Option für Shorts in einem Werkzeug (Bild und Ton zusammen); für Langvideos mit eigenen Aufnahmen weniger geeignet |

Quellen: Google AI for Developers, „Speech generation“ (Stand 2026-10-28) · ai.google.dev/gemini-api/docs/speech-generation · Abruf 2026-10-29; Google AI for Developers, „Pricing“ (Stand 2026-10-28) · ai.google.dev/gemini-api/docs/pricing · Abruf 2026-10-29; Google Cloud, „Text-to-Speech pricing“ · cloud.google.com/text-to-speech/pricing · Abruf 2026-10-29 (Preistabelle über die Sprachfassungen der Seite gelesen); Google, NotebookLM-Hilfe „Generate Audio Overview“ und „Change output language“ · support.google.com/notebooklm · Abruf 2026-10-29; Google Workspace Updates, 15. April 2026, „new more expressive AI voiceovers in Google Vids and 16 additional languages“ und Februar 2026 „Vids avatars, voiceovers, new languages“ · workspaceupdates.googleblog.com · Abruf 2026-10-29; newsbytesapp.com zu geplanten bezahlten Sprechern (Drittquelle, älter) · Abruf 2026-10-29.

## 2. Empfehlung und Begründung

Entschieden von Stefan am 29. Oktober 2026: Option A, Gemini 3.8 Flash TTS in Google AI Studio, Oberfläche „Generate speech“, eine Bibliotheksstimme, keine Stimmnachbildung, keine Stimmgestaltung; Stefan klickt. Am 30. Oktober 2026 hat Stefan seinen Gemini-API-Schlüssel genannt (liegt außerhalb des Scutoria-Ordners); damit ist Option B eingerichtet: `VORLAGEN/vertonen.mjs` vertont Skripte und Shorts über die API, Stefan hört nur noch ab. Die Oberfläche von AI Studio bleibt der Rückweg.

### Vertonung über die API (seit 30. Oktober 2026)

- Skript: `marketing/youtube/VORLAGEN/vertonen.mjs`, Aufruf vom Ordner `C:\Users\Stefa\OneDrive\scutoria`. Der Schlüssel kommt per `--env <Pfad zur .env>` von außerhalb oder aus der Umgebungsvariable `GEMINI_API_KEY`; er wird nie ausgegeben und liegt nie im Scutoria-Ordner.
- Stimmproben: `node marketing/youtube/VORLAGEN/vertonen.mjs --probe --env <Pfad> --voices Charon,Schedar,Sadaltager,Sulafat` schreibt je Stimme eine englische und eine deutsche Probe mit dem Testtext nach `C:\Users\Stefa\Videos\scutoria\stimme-proben\`.
- Ein Skript: `--skript marketing/youtube/SKRIPTE/01-ai-rules-start.en.md --voice Charon` schreibt je Abschnitt eine WAV-Datei (`01-en.wav` bis `07-en.wav`) nach `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\stimme\` und ein Protokoll `vertonung.log` mit Wortzahl, Sekunden, Modell, Stimme und Token je Abschnitt.
- Ein Short: `--short S-01-2 --lang de --voice Charon` nach `C:\Users\Stefa\Videos\scutoria\shorts\S-01-2\`.
- Anfrageform laut Google-Dokumentation (Stand 2026-10-28): `POST /v1beta/interactions`, Stilanweisung als `speech_metadata`, Antwort als WAV 24 kHz mono 16 Bit. Bei hoher Nachfrage (HTTP 503) oder Ratenbegrenzung wiederholt das Skript bis zu fünf Mal.

[Fakt] Free-Tier-Grenze, gemessen am 30. Oktober 2026: zehn Anfragen je Tag und Modell. Die elfte Anfrage an `gemini-3.8-flash-tts` kam mit HTTP 429 zurück („Rate limit exceeded … limit: 10 requests per day on Free Tier … retry in 20h53m“); `gemini-3.8-flash-lite-tts` hat ein eigenes Kontingent (zwei Proben liefen danach durch). Die Ratenbegrenzungs-Seite nennt diese Werte nicht; sie stammen aus der Fehlermeldung der API.
Quelle: Antwort der Gemini-API vom 30. Oktober 2026, Protokoll `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\stimme\vertonung.log`.

[Fakt] Ein Abo hebt diese Grenze nicht: Google AI Pro und Google AI Ultra geben Entwicklern höhere Limits nur in der Oberfläche von AI Studio; „Direct use of the Gemini API (such as using API keys or external applications) is billed and managed separately“, und die Abos sind „separate from Gemini API usage tiers“. Ist das Tageskontingent eines Abos in AI Studio erschöpft, verweist Google auf einen API-Schlüssel mit aktivierter Cloud-Abrechnung je Anfrage.
Quelle: Google AI for Developers, „Google AI plans“, Stand 2026-10-16 · ai.google.dev/gemini-api/docs/google-ai-plans · Abruf 2026-10-30.

[Unsicher] Google AI Pro kostet in Deutschland laut Drittquellen 21,99 Euro je Monat (219,99 Euro je Jahr); ein österreichischer Preis wurde nicht gefunden. Stand prüfen auf one.google.com im eigenen Konto.
Quelle: monsterdealz.de, Stand 16. Oktober 2026; gptprompts.ai (Drittquellen) · Abruf 2026-10-30.

Entschieden von Stefan am 30. Oktober 2026: Weg B, Google AI Pro abonnieren, in Kenntnis dessen, dass das Abo nur die Limits in der Oberfläche von AI Studio hebt. Abo am 30. Oktober 2026 abgeschlossen (Stefan: „abboniert“); Preis und Konto trägt Stefan nach (Stand prüfen).

Probe von AI Studio am 30. Oktober 2026 (Konto mit Abo, Modell Gemini 3.8 Flash TTS, Stimme Charon, Stilanweisung im Stilfeld): Ein Lauf mit 944 Wörtern (Abschnitte 1 bis 3 von Video 01, ohne Pausen-Tags) lief in etwa zwei Minuten durch und ergab 5 Minuten 56 Sekunden Ton; der Tooltip der Oberfläche sagt „Usage in AI Studio UI is free of charge when no API key is selected“. Der Download-Knopf erzeugte im eingebauten Browser der Claude-App keine Datei; die Tonspur ließ sich dort nicht sichern. Zwei Grenzen der Oberfläche: Beim Tippen öffnet „<“ eine Tag-Auswahl, die den Text verschieben kann (Pausen-Tags deshalb weglassen, Punkte reichen), und die Anmeldung muss Stefan selbst vornehmen. Folge: AI Studio bleibt der Weg für Stefans eigenes Klicken; der Standardweg ist die automatische Vertonung über die API (unten), weil sie ohne Stefan läuft.

Stand 30. Oktober 2026, 13:25 Uhr (Wien): Video 01 ist über die API vollständig vertont, automatisch, mit `gemini-3.8-flash-lite-tts` und Charon, weil das Flash-Kontingent des Tages aufgebraucht war: EN 12,5 Minuten (01-03: 950 Wörter, 353 s; 04-07: 1 058 Wörter, 396 s), DE 13,3 Minuten (01-03: 889 Wörter, 379 s; 04-07: 967 Wörter, 420 s), Dateien unter `C:\Users\Stefa\Videos\scutoria\lite\01-ai-rules-start\stimme\`. Gebündelte Anfragen mit rund 1 000 Wörtern gehen durch. Sprechtempo Lite: etwa 160 Wörter je Minute Englisch, 140 Deutsch. Entschieden von Stefan am 30. Oktober 2026: Video 01 wird am 31. Oktober mit Flash neu vertont, danach die weiteren Videos; die Lite-Fassung bleibt als Rückfall liegen, bis die Flash-Dateien da sind. Tagesläufe: `VORLAGEN/vertonen-tag.ps1 -Skripte 01-ai-rules-start,02-security-questionnaire` (acht Anfragen; zwei bleiben für Shorts), am Folgetag 03 und 04, und so weiter; Claude startet den Lauf, sobald eine Sitzung offen ist. Das Flash-Kontingent wird laut API-Meldung vom 30. Oktober, 11:15 Uhr, nach etwa 21 Stunden frei, also am 31. Oktober gegen 08:10 Uhr (Wien). Folge für den Ablauf: Die Langvideos vertont Stefan in AI Studio („Generate speech“) mit dem Abo-Kontingent; Claude legt dafür je Skript die Sprechtexte als Textdateien bereit (`vertonen.mjs --skript … --text`, Ausgabe unter `C:\Users\Stefa\Videos\scutoria\NN-slug\sprechtext\`: je Abschnitt, als Gruppen 01-03 und 04-07, als Ganzes, dazu die Stilanweisung). Der API-Weg bleibt im Free-Tier für Shorts und Nachbesserungen (zehn Anfragen je Tag). Das Abo gehört in das Google-Konto, das AI Studio nutzt; der Schlüssel aus dem anderen Projekt ist davon unabhängig. Wie viele Sprachläufe das Abo je Tag in AI Studio erlaubt und wie lang ein Text je Lauf sein darf, zeigt AI Studio erst nach dem Abschluss (Stand prüfen, hier eintragen).

Die drei Wege, die Tagesgrenze zu behandeln (Tor Geld, Stefan entscheidet und klickt in der Google-Konsole):

| Weg | Was | Kosten | Passt zu |
|---|---|---|---|
| A Cloud-Abrechnung im Projekt des Schlüssels aktivieren (Tier 1) | Abrechnung je Nutzung, laut Google mit Ausgabenlimit („Spend Cap“) oder Vorauszahlung möglich (Stand prüfen in der Konsole) | nach Preisblatt etwa 0,35 US-Dollar je Video in beiden Sprachen, etwa 4,60 US-Dollar für alle zehn Videos und achtzig Shorts bis Jahresende, danach das Doppelte; dazu die Umsatzsteuer | dem API-Weg (`vertonen.mjs`), den Stefan am 30. Oktober gewählt hat; Empfehlung, wenn überhaupt Geld ausgegeben wird |
| B Google AI Pro abonnieren | höhere Limits nur beim Klicken in AI Studio (Option A der Stimme); dazu Gemini-App, NotebookLM, Vids und Speicher | etwa 21,99 Euro je Monat (Deutschland, Stand prüfen) | nur, wenn Stefan selbst in AI Studio klicken will oder die anderen Teile des Abos braucht; für die API ohne Wirkung |
| C Free-Tier behalten | zehn Anfragen je Tag und Modell; vier je Video, eine je Short | nichts | dem Wochentakt des Plans mit zwei Vertonungstagen je Woche; langsam, aber ausreichend |

Folgen: `vertonen.mjs` fasst ein Skript standardmäßig in zwei Anfragen zusammen (Abschnitte 1 bis 3 und 4 bis 7, Option `--gruppen`), also vier Anfragen je Video in beiden Sprachen und eine je Short. Im Free-Tier sind das je Tag zwei Langvideos oder ein Langvideo plus sechs Shorts; der Wochentakt des Plans (ein Video, acht Shorts) braucht zwei Tage je Woche. Ein bezahlter Tarif (Abrechnung im Google-Projekt aktivieren) hebt die Grenze; das ist eine Ausgabe und braucht Stefans Wort, auch wenn die Beträge bei Cent je Video liegen (Abschnitt 4). Probe-Dateien des Lite-Modells zum Vergleich: `C:\Users\Stefa\Videos\scutoria\lite\stimme-proben\`.

Gemessen am 30. Oktober 2026 mit dem Testtext (48 englische, 49 deutsche Wörter): 20 bis 22 Sekunden je Probe, also etwa 130 bis 140 Wörter je Minute in beiden Sprachen; die Abrechnung lag bei 25 Audio-Token je Sekunde, wie das Preisblatt sagt (Probe: 547 Ausgabe-Token für 22,0 Sekunden). Für die Skripte heißt das: Englisch 1 900 bis 2 000 Wörter laufen auf 14 bis 15 Minuten, Deutsch 1 750 bis 1 870 Wörter auf 13 bis 14 Minuten. Wer zwölf Minuten will, kürzt Abschnitt 4 oder setzt in der Stilanweisung „slightly faster pace“ (Stand prüfen am ersten Skript).

- Kein Kauf, kein Schlüssel, keine Einrichtung außer einem Google-Konto, das Stefan hat.
- Liest wörtlich, nimmt Pausen-Tags und eine Stilanweisung an, gibt WAV in 24 kHz aus, das Clipchamp direkt verwendet.
- Dieselbe Stimme in Deutsch und Englisch (die Modelle sind mehrsprachig; ob die gewählte Stimme in beiden Sprachen gleich gut klingt, entscheidet das Ohr in Schritt 2 der Anleitung).
- Jede Audioausgabe trägt laut Google ein SynthID-Wasserzeichen; das ist der Anbieternachweis für die Kennzeichnung (KENNZEICHNUNG.md, Abschnitt 4.5).
- Gemini 3.8 Flash-Lite TTS ist die günstigere Variante; Flash ist in der Preisliste als die bessere geführt, und der Unterschied ist bei zehn Videos ohne Bedeutung (Abschnitt 4).

Stimmnachbildung („voice replication“) und Stimmgestaltung bieten die 3.8-Modelle an; Nachbildung ist über AI Studio im EWR nicht verfügbar und für Scutoria ohnehin ausgeschlossen (keine echte Stimme, kein Deepfake). Quelle: Google Blog, „Gemini 3.8 Flash TTS and Gemini 3.8 Flash-Lite TTS“ · blog.google · Abruf 2026-10-29.

## 3. Stimmen, Sprachen, Steuerung, Grenzen

[Fakt] Modelle mit Text-to-Speech: Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`), Gemini 3.8 Flash-Lite TTS, Gemini 3.1 Flash TTS Preview, Gemini 2.5 Pro Preview TTS. 30 vorgefertigte Studio-Stimmen mit Beschreibungswort (etwa „Bright“, „Warm“), darunter Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Sulafat; eine erweiterte Stimmbibliothek mit hunderten weiteren. Steuerung nicht über SSML, sondern über eine Stilanweisung in natürlicher Sprache (etwa „speaking slowly“), Pausen und Geräusche als Tags im Text (`<short pause>`, `<long pause>`, `<laugh>`), Zeichensetzung, Auslassungspunkte, Großschreibung für Betonung. Ein Lauf kann bis zu zwei Sprecher haben. Ausgabe WAV, 24 kHz, mono, 16 Bit. Eine Höchstlänge des Eingabetexts nennt die Seite nicht.
Quelle: Google AI for Developers, „Speech generation“, Stand 2026-10-28 · Abruf 2026-10-29.

[Fakt] Das Preisblatt rechnet Audio mit 25 Tokens je Sekunde; die Ratenbegrenzungs-Seite nennt für die TTS-Modelle keine Werte und verweist auf die Anzeige der aktiven Limits in AI Studio.
Quelle: Google AI for Developers, „Pricing“ und „Rate limits“, beide Stand 2026-10-28 · Abruf 2026-10-29.

[Lücke] Die Höchstlänge je Lauf und die Free-Tier-Grenzen je Tag sind auf den Seiten nicht genannt; sie stehen erst in AI Studio nach der Anmeldung. Deshalb: abschnittsweise vertonen (ein Lauf je Skriptabschnitt, 150 bis 500 Wörter) und die Limits beim ersten Mal notieren.

Stimmwahl (Vorschlag, durch Hören zu entscheiden): drei Kandidaten aus der Standardliste anhören, mit demselben Testtext in beiden Sprachen (dem Kennzeichnungssatz und zwei Sätzen mit Zahlen); gesucht ist eine ruhige Stimme mittlerer Lage ohne „Bright“, die Zahlen und Fachwörter sauber trennt. Die Wahl wird hier eingetragen und für alle Videos beibehalten: Stimme EN: offen. Stimme DE: offen. Stand prüfen, ob eine Stimme beide Sprachen trägt.

## 4. Kosten je Minute, nachgerechnet

Grundlage: 25 Tokens je Sekunde Audio, also 1 500 Tokens je Minute; ein Langvideo mit 12 Minuten Sprechzeit hat 18 000 Audio-Tokens; der Eingabetext (etwa 1 800 Wörter) hat ungefähr 2 500 Text-Tokens (Schätzung, 1,4 Tokens je Wort; Google nennt keine Umrechnung für Text).

| Modell | Eingabe (Text) je 1 Mio. Tokens | Ausgabe (Audio) je 1 Mio. Tokens | Ausgabe je Minute Audio | 12-Minuten-Video, eine Sprache | 10 Videos in zwei Sprachen plus 80 Shorts (etwa 340 Minuten) |
|---|---|---|---|---|---|
| Gemini 3.8 Flash TTS, bis 31.12.2026 | 0,50 USD | 9,00 USD | 0,0135 USD | etwa 0,16 USD | etwa 4,60 USD |
| Gemini 3.8 Flash TTS, ab 1.1.2027 | 1,00 USD | 18,00 USD | 0,027 USD | etwa 0,33 USD | etwa 9,20 USD |
| Gemini 3.8 Flash-Lite TTS, bis 31.12.2026 | 0,50 USD | 6,00 USD | 0,009 USD | etwa 0,11 USD | etwa 3,10 USD |
| Gemini 3.8 Flash-Lite TTS, ab 1.1.2027 | 1,00 USD | 12,00 USD | 0,018 USD | etwa 0,22 USD | etwa 6,10 USD |
| Gemini 3.1 Flash TTS Preview | 1,00 USD | 20,00 USD | 0,030 USD | etwa 0,36 USD | etwa 10,20 USD |
| Gemini 2.5 Flash Preview TTS | 0,50 USD | 10,00 USD | 0,015 USD (Google nennt hier keine Umrechnung je Sekunde) | etwa 0,18 USD | etwa 5,10 USD |

Free-Tier: Die Preisseite führt die Flash-Modelle als „free of charge“ im Free-Tier; Gemini 2.5 Pro Preview TTS ist nicht im Free-Tier. Google nennt die Ausgabe auch je 10 Sekunden: 0,00225 USD (Flash) und 0,0015 USD (Flash-Lite) bis Ende 2026, danach das Doppelte.
Quelle: Google AI for Developers, „Pricing“, Stand 2026-10-28 · Abruf 2026-10-29. Preise in US-Dollar ohne Umsatzsteuer; Umrechnung in Euro nicht vorgenommen.

Zum Vergleich Google Cloud Text-to-Speech (je Million Zeichen, Freikontingent je Monat): Standard 4 USD (4 Mio. frei), WaveNet 4 USD (Angaben zum Freikontingent widersprechen sich zwischen 1 und 4 Mio.), Neural2 16 USD (1 Mio. frei), Studio 160 USD (1 Mio. frei), Chirp 3 HD 30 USD (1 Mio. frei), Instant Custom Voice 60 USD (kein Freikontingent); Gemini-TTS dort nach Tokens wie oben, ohne Free-Tier. Ein 12-Minuten-Skript hat etwa 11 000 Zeichen, liegt also auch nach Monaten im Freikontingent; die Abrechnung muss trotzdem aktiviert sein. Quelle: Google Cloud, „Text-to-Speech pricing“ · Abruf 2026-10-29; Stand prüfen, weil die Seite in dieser Sitzung nur über ihre Sprachfassungen lesbar war.

Fazit für das Tor Geld: Die gesamte Vertonung der ersten zwölf Wochen liegt im Free-Tier oder im einstelligen Dollarbereich. Es gibt nichts zu kaufen. Ein Abo ist nicht nötig.

## 5. Anleitung Schritt für Schritt (AI Studio, ohne Code)

Die Oberfläche von AI Studio ändert sich; die Schritte folgen Googles Blog und Drittanleitungen (Abruf 2026-10-29) und werden beim ersten Durchgang gegen die Oberfläche geprüft und hier berichtigt.

1. **Anmelden.** aistudio.google.com mit dem Google-Konto öffnen, das Stefan dafür bestimmt. Beim ersten Mal die Nutzungsbedingungen lesen; Stand prüfen, ob Eingaben im Free-Tier zur Verbesserung von Googles Produkten verwendet werden dürfen (die Skripte sind öffentliche Texte ohne Personenbezug, deshalb unkritisch; trotzdem wissen, was gilt).
2. **Stimme wählen.** Im Bereich „Generate media“ den Punkt „Gemini speech“ (oder „Generate speech“) öffnen. Modell: Gemini 3.8 Flash TTS. Einzelsprecher. Drei Stimmen mit dem Testtext aus Abschnitt 6 anhören, je einmal Englisch, je einmal Deutsch. Entscheidung in Abschnitt 3 eintragen.
3. **Stilanweisung einfügen** (Abschnitt 6), je Sprache.
4. **Sprechtext erzeugen.** PowerShell im Ordner `marketing\youtube\VORLAGEN`: `.\sprechtext.ps1 -Skript ..\SKRIPTE\01-ai-rules-start.en.md`. Die Datei `01-ai-rules-start.en.sprechtext.txt` enthält nur den gesprochenen Text mit den Pausen-Tags.
5. **Abschnittsweise einfügen.** Den Text der Abschnitte 1 bis 3 einfügen, ausführen, anhören. Dann 4 bis 7. Bei Shorts der ganze Text in einem Lauf.
6. **Hören und berichtigen.** Liest die Stimme eine Zahl, eine Abkürzung oder „Scutoria“ falsch, den Sprechtext an der Stelle umschreiben (Abschnitt 7), nicht die Stimme wechseln. Neu ausführen.
7. **Herunterladen.** WAV sichern nach `C:\Users\Stefa\Videos\scutoria\NN-slug\stimme\`, benennen `01-hook.wav`, `02-problem.wav` und so weiter. Nichts davon in den Git-Ordner.
8. **Eintragen.** Datum, Modell, Stimme und Lauf-Nummer in der Kopfzeile des Skripts vermerken („vertont 2026-11-06, Gemini 3.8 Flash TTS, Stimme Kore“). Das ist der Nachweis je Veröffentlichung für die Checkliste (KENNZEICHNUNG.md, Abschnitt 5, Punkt 5).
9. **Deutsch** mit der deutschen Stilanweisung wiederholen.

Wenn Stefan das Anhören und Einfügen abgeben will: Mit einem API-Schlüssel kann Claude die Schritte 4 bis 8 selbst ausführen und die WAV-Dateien ablegen; der Schlüssel liegt dann in Stefans Google-Konto, nicht im Ordner. Das ist eine Einrichtung und braucht Stefans Wort.

## 6. Stilanweisung und Testtext

Stilanweisung EN (in das Feld für den Stil oder als erste Zeile, je nach Oberfläche):

> Calm, clear narration for a business audience. Medium pitch, unhurried pace, no brightness, no sales tone. Short sentences with a small pause at each full stop. Read numbers, dates and article references exactly as written. Pronounce „Scutoria“ as skoo-TOR-ee-uh. Do not add words.

Stilanweisung DE:

> Ruhige, klare Sprecherstimme für ein geschäftliches Publikum. Mittlere Lage, gelassenes Tempo, keine Fröhlichkeit, kein Verkaufston. Kurze Sätze mit einer kleinen Pause an jedem Punkt. Zahlen, Daten und Artikelangaben genau so lesen, wie sie geschrieben sind. „Scutoria“ wird skuh-TOR-i-a ausgesprochen. Keine Wörter hinzufügen.

Testtext EN:

> This is Scutoria. The voice you hear is synthetic. <short pause> Article four of the AI Act has applied since 2 February 2025. The deadline under Article thirty-three of the GDPR is 72 hours. <short pause> Not yet, with a date, is a complete answer.

Testtext DE:

> Hier ist Scutoria. Die Stimme, die Sie hören, ist synthetisch. <short pause> Artikel vier der KI-Verordnung gilt seit dem 2. Februar 2025. Die Frist nach Artikel dreiunddreißig der DSGVO beträgt 72 Stunden. <short pause> Noch nicht, mit Termin, ist eine vollständige Antwort.

## 7. Aussprache und Schreibweise im Sprechtext

Die Quellenzeile am Bildschirm trägt die amtliche Kurzform; der Sprechtext schreibt, was gehört werden soll.

| Begriff | Sprechtext EN | Sprechtext DE |
|---|---|---|
| Art. 50(4) | Article fifty, paragraph four | Artikel fünfzig, Absatz vier |
| Art. 3(60) | Article three, point sixty | Artikel drei, Nummer sechzig |
| Annex III | Annex three | Anhang drei |
| NIS2, NIS-2 | NIS two | NIS zwei |
| DSGVO, GDPR | the GDPR | die DSGVO (oder „die Datenschutz-Grundverordnung“ beim ersten Mal) |
| KI-VO | the AI Act | die KI-Verordnung |
| MFA | multi-factor authentication (beim ersten Mal), danach MFA | Multi-Faktor-Authentifizierung, danach MFA |
| ISO 27001 | ISO twenty-seven thousand and one | ISO siebenundzwanzigtausendeins |
| NIST SP 800-63B | the NIST digital identity guidelines | die NIST-Leitlinien zur digitalen Identität |
| DIN SPEC 27076 | DIN SPEC two seven zero seven six | DIN SPEC zwei sieben null sieben sechs |
| EUR-Lex | EUR-Lex | EUR-Lex |
| CERT.at | CERT dot A T | CERT Punkt A T |
| 0800 888 133 | zero eight hundred, eight eight eight, one three three | null acht hundert, acht acht acht, eins drei drei |
| kontakt@scutoria.com | kontakt at scutoria dot com | kontakt at scutoria Punkt com |
| scutoria.com | scutoria dot com | scutoria Punkt com |
| 2 August 2026 | 2 August 2026 (die Stimme liest Daten) | 2. August 2026 |
| 199 € | 199 euros | 199 Euro |
| D1, D7 | document D one, D seven | Dokument D eins, D sieben |
| § 25 MedienG | section twenty-five of the Media Act | Paragraf fünfundzwanzig Mediengesetz |
| e.U. (Muster Elektrotechnik e.U.) | the example business | der Beispielbetrieb (Rechtsform nicht aussprechen) |

Regeln: Keine Klammern im Sprechtext. Keine Abkürzungen mit Punkt („Abs.“, „Nr.“, „z. B.“); ausschreiben. Jahreszahlen als Zahl lassen. Lange Zahlen mit Leerzeichen gruppieren („15 000 000 Euro“ liest die Stimme als fünfzehn Millionen; bei Zweifel „fifteen million euros“ schreiben). Betonung durch Satzbau, nicht durch Großschreibung, außer bei einem einzelnen Wort, auf das es ankommt.

## 8. Formatierung der Skripte für die Vertonung

- Die Skripte unter `SKRIPTE/` sind so gebaut, dass `sprechtext.ps1` den reinen Sprechtext extrahiert: Überschriften und alle Zeilen in eckigen Klammern (`[SCREEN]`, `[SOURCE]`, `[QUELLE]`, `[MARKER]`) fallen weg, die Pausen-Tags bleiben.
- `<short pause>` steht nach dem Hook und am Ende jedes Abschnitts, `<long pause>` vor dem Verweis. Mehr Pausen machen die Stimme stockend; Punkte reichen.
- Ein Lauf je Abschnittsgruppe (1 bis 3, 4 bis 7); die Dateien werden im Schnitt aneinandergelegt. So lässt sich ein Abschnitt neu vertonen, ohne alles zu wiederholen.
- Jede Änderung am Sprechtext nach Stefans Freigabe (etwa eine Umschreibung für die Aussprache) ist eine Änderung des Wortlauts: Stefan hört den Abschnitt ab oder liest die geänderte Zeile und bestätigt sie im Prüfprotokoll (KENNZEICHNUNG.md, Abschnitt 7), weil eine inhaltliche Änderung nach der Prüfung die Ausnahme der menschlichen Prüfung aufhebt. Reine Ausspracheschreibweisen („Article fifty“ statt „Art. 50“) ändern den Inhalt nicht; sie werden trotzdem vermerkt.

## 9. Offene Punkte

1. Stimme je Sprache wählen (Schritt 2), hier eintragen.
2. Free-Tier-Grenzen und Höchstlänge je Lauf in AI Studio ablesen und hier eintragen.
3. Nutzungsbedingungen des Free-Tier zur Verwendung von Eingaben lesen (Stand prüfen).
4. Entscheidung, ob Claude mit API-Schlüssel vertont (Tor Geld, Einrichtung).
5. Google Vids als Werkzeug für Shorts einmal ausprobieren, falls der Clipchamp-Weg zu lang ist (Stand prüfen, Kosten der Sprecher).
