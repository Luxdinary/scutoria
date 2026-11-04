# Vorlage: ein weiteres Video parallel in der animierten Erklärwelt bauen

Stand 30. Oktober 2026, abends. Für Stefan und für einen zweiten Claude-Chat. Ziel: Ein weiteres Video (zum Beispiel Video 02) bekommt denselben Schnitt, dasselbe Layout und dieselbe Bildsprache wie Video 01, ohne dass sich die beiden Chats in die Quere kommen.

## 1. Was du tun musst

1. Im Code-Tab der Claude-App eine neue Sitzung im Ordner `C:\Users\Stefa\OneDrive\scutoria` öffnen. Nur dort gelten automatisch `CLAUDE.md`, die Markenregeln (Skill `scutoria-brand`) und die Werkzeuge.
2. Den Text aus Abschnitt 7 einfügen und die Videonummer eintragen. Mehr nicht.
3. Am Ende das Video ansehen und eine Note geben, wie bei der Probe.

## 2. Was vorhanden sein muss

| Was | Wo | Stand |
|---|---|---|
| Freigegebenes Skript EN und DE | `marketing/youtube/SKRIPTE/NN-slug.en.md` und `.de.md` | Video 01 bis 10 liegen vor |
| Tonspur je Sprache, zwei Dateien (Abschnitte 1 bis 3, 4 bis 7) | Flash: `C:\Users\Stefa\Videos\scutoria\NN-slug\stimme\`; Lite-Probe: `C:\Users\Stefa\Videos\scutoria\lite\NN-slug\stimme\` | Nur Video 01 ist vertont (Lite). Video 01 und 02 werden am 31. Oktober mit Flash vertont |
| Bausteine der Bildwelt | `marketing/youtube/ANIMATION/lib/welt.js` | seit 30. Oktober; wird mit Video 01 erweitert |
| Aufnahme Bild für Bild, Ton dazu | `marketing/youtube/ANIMATION/rendern.mjs` | fertig |
| Wortzeiten aus der Tonspur | `marketing/youtube/ANIMATION/woerter.py` (Whisper large-v3, lokal, auf dem Prozessor) | fertig |
| Muster mit Note 1 | `ANIMATION/probe-01/` (Szene, Storyboard, Gestaltungsblatt) | fertig |
| Muster für ein ganzes Video | `ANIMATION/video-01/` (Szene, ein Akt je Skriptabschnitt) | im Bau |
| Gestaltungsauftrag | `C:\Users\Stefa\Videos\scutoria\01-ai-rules-start\Produktionsprompt-Darstellung-Scutoria.de.md` | dein Auftrag vom 30. Oktober |

Ohne Tonspur kann der zweite Chat schon Storyboard und Szenen bauen, aber keine Zeiten binden. Für Video 02 gibt es zwei Wege:

- **Empfehlung: heute mit der Lite-Stimme vertonen.** Das sind vier Anfragen im kostenlosen Kontingent des Lite-Modells; heute wurden dort vier von zehn verbraucht. Der Chat speichert in den Ordner `lite\`, damit der Flash-Lauf morgen nichts überschreibt. Morgen werden nur die Wortzeiten neu ermittelt, die Szene bindet sich von selbst neu.
- **Oder bis morgen warten.** Dann kommt die Flash-Stimme aus dem geplanten Lauf am 31. Oktober, und der Chat beginnt mit Storyboard und Szenen ohne Zeiten.

## 3. Das gemeinsame Layout (fest)

**Bild:** 1920 × 1080, 30 Bilder je Sekunde, H.264 (crf 17), Ton AAC 192 kbit/s. Seitenrand links und rechts 96 px.

**Feste Einblendungen**, alle aus `welt.js`, nie von Hand nachgebaut:
- Oben links der Kopf: Kicker in IBM Plex Mono, 24 px, blau, gesperrt, zum Beispiel „2 · DIE LAGE IM KLEINEN BETRIEB“. Darunter der Titel in Manrope 800, 60 px. Funktion `kopf(ab, bis, kicker, titel)`.
- Oben rechts immer „SYNTHETISCHE STIMME“ (EN „SYNTHETIC VOICE“), Mono 18 px.
- Unten links der Marker als Kapsel: Form und Wort, nie Farbe allein. Fakt ist ein blaues Quadrat, Auslegung eine violette Raute, Unsicher ein bernsteinfarbener Halbkreis, Lücke ein roter gestrichelter Kreis. Funktion `marke(ab, bis, art, quelle)`.
- Darunter die Quellenleiste über die ganze Breite: „Quelle: …“ wörtlich aus dem `[QUELLE]` des Skripts, mit Abrufdatum, Mono 22 px, ein- oder zweizeilig. Sie steht, solange der belegte Absatz gesprochen wird. Auslegung zeigt nur den Marker.
- Im Einstieg unten links ab Sekunde 0: „Synthetische Stimme · Quellen am Bildschirm · Keine Rechtsberatung“.
- Inhalt der Szene zwischen y 220 und y 860, solange Kopf und Marker stehen. Bei Nahfahrten wird der Kopf zurückgenommen (`dimmen`).

- **Aufbau seit 1. November 2026 (Stefan: „Ja, für alle“):** Das Video beginnt mit einer Frage. Der gesprochene Block „Hier ist Scutoria … keine Rechtsberatung“ kommt am Schluss vor „Als Nächstes“, als eigene Bühne (`offenlegungsBuehne()` in `lib/dokumente.js`). Die Bildschirmzeile im Einstieg und die Marke „SYNTHETISCHE STIMME“ bleiben ab Sekunde 0. Die Stimmlage wird über das ganze Video angeglichen (`stimmlage.py`, `ton-fassung.py`).
- Rechts oben unter „SYNTHETISCHE STIMME“ erscheint einmal mitten im Video das freie Angebot von scutoria.com als Kapsel (Abschnitt 3a).

**Bildwelt „Nachtarchiv“:** dunkler Raum mit ruhigen Archivregalen. Das einzige Licht ist Papier: Memo, Register, Regeln und Eingaben sind helle Blätter. Werkzeuge und Bildschirme leuchten blau. Keine Bildschirmfotos der Website; Seiten werden als vereinfachte Blätter nachgebaut, nur mit dem Ausschnitt, der gerade erklärt wird.

**Figuren ohne Gesicht.** Die Rolle erkennt man an Silhouette, Kleidung und Werkzeug. Für den erfundenen Betrieb Muster Elektrotechnik gilt eine feste Besetzung: Büro mit kurzem Haar und grauem Hemd, Büro mit Dutt und braunem Hemd, Montage mit Helm, Reflexstreifen und Telefon, dazu Inhaberin und Lehrling. Die Figuren handeln: tippen, zeigen, halten, reichen weiter.

**Farben mit fester Bedeutung:** Blau für den aktiven Vorgang und den betrieblichen Weg. Bernstein für Offenes und Unklares, dann gestrichelt. Rot nur für ein Risiko. Grün nur für einen erreichten Zustand. Violett nur für den Marker Auslegung. Kein Schutzschild, kein grünes Zertifikat, kein Countdown, kein Konfetti.

**Schrift:** nur Manrope und IBM Plex Mono, aus `site/public/fonts`. Beschriftungen im Bild mindestens 26 px, nur Schlagworte.

**Bewegung:** jede Bildaktion hängt an einem gesprochenen Wort, `cue('…')`; keine geschätzten Zeiten. Kleine Reaktionen um 0,3 s, Objektaktionen 0,6 bis 1,2 s, mit Beschleunigung und Abbremsung. Übergänge über ein Objekt: Ein Punkt öffnet sich als Kreis zur nächsten Szene (`kreis`), Rückweg mit `kreisRaus`. Sonst Überblendung (`blende`, 0,7 s) oder Kamerafahrt. Bei Nahfahrten wird der Rand abgedunkelt.

**Text und Recht:** Der Sprechtext bleibt unverändert. Beispielwerte sind erfunden und so markiert, Adressen nur mit der Endung `.example`. Nie „compliant“, „zertifiziert“, „sicher“ als Versprechen. Am Ende 20 Sekunden ruhiges Endbild.

## 3a. Freies Angebot in der Mitte (Entscheidung Stefan, 30. Oktober 2026)

Stefan auf die Frage „Soll das freie Angebot in 01 bis 10 schon in der Mitte als Bild erscheinen?“: „Ja, einbauen“. Der Sprechtext bleibt unverändert; es ist nur ein Bildelement.

- **Form:** Kapsel rechts oben, rechtsbündig an x 1824, etwa y 150, unter „SYNTHETISCHE STIMME“. Oben: Mono-Kicker „FREI AUF SCUTORIA.COM“ (EN „FREE ON SCUTORIA.COM“). Darunter der Pfad. Symbol und blauer Rand. Unten links bleibt für Marker und Quellenleiste frei.
- **Zeit:** am Wortanker einblenden, etwa 7 Sekunden stehen lassen, ruhig ausblenden. Einmal je Video.
- **Staffel 2:** Stelle und Angebot stehen je Video in `THEMEN-STAFFEL-2.de.md` unter „Hinweis in der Mitte“.

| Video | Freies Angebot | Wortanker DE | Wortanker EN | Pfad DE / EN |
|---|---|---|---|---|
| 01 | Memo „Womit fangen wir bei KI-Regeln an?“ | Das freie Memo stellt sieben Fragen | The free memo asks seven questions | `/de/memos/wo-anfangen` / `/memos/where-to-start` |
| 02 | Handbuch des Sicherheitsnachweis-Toolkits, frei lesbar | Das Handbuch unseres Toolkits sagt es so | handbook of our toolkit puts it this way | `/de/toolkits/sicherheitsnachweis/handbuch` / `/toolkits/security-evidence/handbook` |
| 03 | Muster des Beispielbetriebs, frei als PDF | Für diesen Rundgang nehmen wir einen Beispielbetrieb | For this walk we use one example business | `/de/toolkits/ki-richtlinien` / `/toolkits/ai-policy` (Abschnitt „Vorher ansehen“) |
| 04 | Tools „Darf das hinein?“ und „Steht da etwas Persönliches drin?“ | Zwei freie Tools machen daraus | two free tools your staff can use today | `/de/tools/darf-das-hinein`, `/de/tools/etwas-persoenliches` / `/tools/may-this-go-in`, `/tools/anything-personal` |
| 05 | Handbuch des KI-Richtlinien-Toolkits, Abschnitt 4, frei lesbar | Schritt eins: Lesen Sie den Artikel | Step one: read the article | `/de/toolkits/ki-richtlinien/handbuch` / `/toolkits/ai-policy/handbook` |
| 06 | Memo „Wo steht unsere Anmeldung?“ | Eins: Multi-Faktor-Authentifizierung auf jedem E-Mail-Konto | One: multi-factor authentication on every email account | `/de/memos/anmeldesicherheit` / `/memos/sign-in-security` |
| 07 | Memo „Müssen wir kennzeichnen, was unsere KI erzeugt?“ | Denken Sie an drei Dinge | Think of three things | `/de/memos/ki-kennzeichnung` / `/memos/ai-labelling` |
| 08 | Muster der Notfallkarte, frei als PDF | Die Notfallkarte ist das Dokument D3 | The emergency card is document D3 | `/de/toolkits/sicherheitsnachweis` / `/toolkits/security-evidence` (Abschnitt „Vorher ansehen“) |
| 09 | Tool „Darf das hinein?“ | Frage eins. Training mit Geschäftsdaten | Question one (Abschnitt 3) | `/de/tools/darf-das-hinein` / `/tools/may-this-go-in` |
| 10 | Memo „Sind wir von NIS2 betroffen?“ | Unser freies Memo | Our free memo | `/de/memos/nis2` / `/memos/nis2` |

Die Wortanker stehen so in den freigegebenen Skripten, Abschnitte 2 und 3 (`SKRIPTE/NN-slug.de.md` und `.en.md`, Stand 29. Oktober 2026). Die Pfade stehen im Faktenblatt, Abschnitte 3, 4, 6 und 7.

## 4. Arbeitsablauf im zweiten Chat

Alle Befehle von `C:\Users\Stefa\OneDrive\scutoria` aus. `NN-slug` ist zum Beispiel `02-security-questionnaire`.

1. **Lesen:** `CLAUDE.md`, Skill `scutoria-brand`, den Gestaltungsauftrag, `ANIMATION/probe-01/STORYBOARD.md`, den Kopf von `ANIMATION/lib/welt.js` (alle Bausteine sind dort beschrieben) und `ANIMATION/video-01/` als Muster.
2. **Tonspur**, nur wenn keine da ist und Stefan den Lite-Weg will:
   ```
   node marketing/youtube/VORLAGEN/vertonen.mjs --skript marketing/youtube/SKRIPTE/NN-slug.en.md --voice Charon --model gemini-3.8-flash-lite-tts --out C:\Users\Stefa\Videos\scutoria\lite --env C:\Automation\faceless-network\.env
   ```
   Dasselbe mit `.de.md`. Der Schlüssel bleibt in `C:\Automation\faceless-network\.env`, wird nie ausgegeben und nie in den Scutoria-Ordner kopiert.
3. **Wortzeiten** je Sprache:
   ```
   python marketing/youtube/ANIMATION/woerter.py --sprache de --aus C:\Users\Stefa\Videos\scutoria\NN-slug\animation --js marketing/youtube/ANIMATION/video-NN/woerter-de.js <stimme>\01-03-de.wav <stimme>\04-07-de.wav
   ```
   Dauert auf dem Prozessor einige Minuten je Sprache; im Hintergrund starten. Danach die Zeiten auf den freigegebenen Sprechtext legen (Nachtrag 30. Oktober, abends: Whisper verhört sich sonst an einzelnen Stellen, und Anker fehlen):
   ```
   python marketing/youtube/ANIMATION/ausrichten.py --sprache de --woerter C:\Users\Stefa\Videos\scutoria\NN-slug\animation\woerter-de.json --text C:\Users\Stefa\Videos\scutoria\NN-slug\sprechtext\ganz-de.txt --ton C:\Users\Stefa\Videos\scutoria\NN-slug\animation\ton-de.wav --js marketing/youtube/ANIMATION/video-NN/woerter-de.js
   ```
   Nachtrag 30. Oktober, spät: Die Flash-Stimme spricht die Marke `<short pause>` an Abschnittsenden teils mit („Pause“, „Eine kurze Pause“, „Short pause“, „Long pause“). Vor dem Ausrichten in `woerter-<lang>.json` nach „pause“ suchen und die Pegel an den Marken-Stellen ansehen (ein Laut von etwa 0,6 s zwischen zwei Pausen); solche Stellen und eine ungleiche Stimmlage behebt `ton-fassung.py` mit einer Schnittliste (Muster: `video-01/schnitt-fassung2.json`, Felder `von_s`/`bis_s`; `--woerter-aus` rechnet die Wortzeiten mit, danach `ausrichten.py` auf die neue Spur). Prüfen mit `python marketing/youtube/ANIMATION/stimmlage.py <ton.wav>`: Spanne der Minutenmittel unter einem Halbton.
   Marker und Quellen kommen wörtlich aus dem Skript: `python marketing/youtube/ANIMATION/marken.py marketing/youtube/SKRIPTE/NN-slug marketing/youtube/ANIMATION/video-NN/marken.js`; im Akt setzt `belegt()` Marker und Quellenleiste für den nächsten belegten Absatz. Die Kapsel aus Abschnitt 3a ist `freiesAngebot(zeit, { de: pfad, en: pfad })`. Weitere Bausteine: `lib/betrieb.js` (Haus des Beispielbetriebs mit Besetzung) und `lib/dokumente.js` (Memo, Weg der sechs Schritte).
4. **Storyboard** `ANIMATION/video-NN/STORYBOARD.md` im Format der Probe: Zeit, Gesprochen, Erklärziel, Bildhandlung, Ergebnisbild, Text im Bild; dazu Abweichungen und offene Punkte.
5. **Szene:** `video-01/szene.html` nach `video-NN/` kopieren, die Liste `TEILE` anpassen. Je Skriptabschnitt eine Datei `teil-N.js` mit einem Akt:
   ```js
   akt({ name: 'einstieg', bauen() {
     const b = buehne('buero'); this.buehnen = [b]; this.b = b;
     this.t1 = at({ de: 'Ihre Belegschaft', en: 'Your staff' });   // Wortanker, in Sprechreihenfolge
     shot(b, this.t1 - 0.4);                                         // ab wann die Bühne zu sehen ist
     kopf(this.t1, this.t1 + 8, { de: '1 · EINSTIEG', en: '1 · OPENING' }, { de: 'Titel', en: 'Title' });
   }, zeichnen(t) { kamera(this.b, [960, 540], 1); /* Bewegungen mit P(), pop(), rein(), fahrt() */ } });
   ```
   Jede Beschriftung als `{ de, en }`, damit eine Szene beide Sprachen trägt.
6. **Prüfen:** Fehlen Wortanker?
   ```
   node marketing/youtube/ANIMATION/rendern.mjs --szene marketing/youtube/ANIMATION/video-NN/szene.html --lang de --pruefen
   ```
   Dann Standbilder an den kritischen Stellen (`--standbilder 12.5,30,61.2 --ordner …`) ansehen: keine Überdeckung, Kopf, Marker und Quelle lesbar, nichts außerhalb des Rands.
7. **Rendern**, erst Deutsch, dann Englisch:
   ```
   node marketing/youtube/ANIMATION/rendern.mjs --szene marketing/youtube/ANIMATION/video-NN/szene.html --lang de --ton C:\Users\Stefa\Videos\scutoria\NN-slug\animation\ton-de.wav --aus C:\Users\Stefa\Videos\scutoria\NN-slug\animation\NN-slug.de.mp4 --parallel 6
   ```
   Für eine Probe zuerst nur einen Ausschnitt mit `--von` und `--bis`.
8. **Abgabe:** Video an Stefan schicken, nur den eigenen Ordner `ANIMATION/video-NN/` committen, Log-Eintrag in Google Drive schreiben.

## 5. Regeln, damit sich die Chats nicht stören

- Der zweite Chat ändert nur `ANIMATION/video-NN/` und Dateien unter `C:\Users\Stefa\Videos\scutoria\NN-slug\`.
- `lib/welt.js`, `rendern.mjs` und `woerter.py` werden nur gelesen. Fehlt ein Baustein, kommt er in `video-NN/bausteine.js` und wird im Bericht genannt; der Chat von Video 01 übernimmt ihn später in die Bibliothek. Die Bibliothek wird nur erweitert, nie umgebaut, damit fertige Szenen weiter laufen.
- `LIESMICH.md`, `STAND.md`, `AUFGABEN.md` und die Skripte bleiben unberührt; Ergebnisse stehen im Storyboard und im Bericht.
- Vor jedem Commit nach API-Schlüsseln suchen (Muster `AIza` mit 35 Zeichen). Commit nur mit `git add marketing/youtube/ANIMATION/video-NN`.
- Drei Tore bleiben: kein Geld, kein Recht live, nichts veröffentlichen, keine Konten. Gelöscht wird nichts; was weg soll, kommt nach `C:\Users\Stefa\Documents\_zum_loeschen\<Datum Thema>`.

## 6. Grenzen, die du kennen solltest

- Der Aufwand ist Handarbeit von Claude. Für ein Video von 13 Minuten sind mehrere Arbeitssitzungen zu erwarten (Schätzung, nicht gemessen).
- Zwei Chats rechnen gleichzeitig auf demselben Rechner. Whisper und das Rendern teilen sich die 24 Prozessorkerne; beides läuft dann langsamer.
- Die Bibliothek ist frisch. Wenn der zweite Chat auf einen Fehler darin stößt, meldet er ihn, statt ihn selbst zu ändern.

## 7. Text zum Einfügen in den neuen Chat

```
Baue Video NN (Skript marketing/youtube/SKRIPTE/NN-slug.de.md und .en.md) als animierte Erklärwelt im selben Schnitt, Layout und Design wie Video 01.
Lies zuerst marketing/youtube/ANIMATION/VORLAGE-PARALLEL.md und halte dich an alle Regeln dort, besonders Abschnitt 5: Du änderst nur ANIMATION/video-NN/ und nichts an lib/welt.js, rendern.mjs, woerter.py, LIESMICH.md oder den Skripten.
Tonspur: [Lite heute vertonen | auf die Flash-Stimme vom 31. Oktober warten].
Reihenfolge: Storyboard, dann ein Ausschnitt von 60 Sekunden zur Abnahme, dann das ganze Video Deutsch, dann Englisch.
Schick mir den Ausschnitt, bevor du weiterbaust. Nichts veröffentlichen, keine Konten, kein Geld.
```
