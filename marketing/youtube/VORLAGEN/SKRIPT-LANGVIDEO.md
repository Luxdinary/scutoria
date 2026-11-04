# Vorlage · Sprechskript Langvideo (10 bis 15 Minuten)

Stand 29. Oktober 2026. Jedes Langvideo folgt dieser Vorlage, englisch zuerst, deutsch im selben Lauf, mit gleicher Gliederung und gleichen Abschnittsnummern. Dateinamen: `SKRIPTE/NN-slug.en.md` und `SKRIPTE/NN-slug.de.md`.

## Maße

| Größe | Wert |
|---|---|
| Sprechzeit | 10 bis 15 Minuten |
| Wörter Englisch | 1 500 bis 2 000 (Richtwert 150 Wörter je Minute) |
| Wörter Deutsch | 1 450 bis 1 900 (deutsche Wörter sind länger; Richtwert 125 Wörter je Minute) |
| Hook | erste 30 Sekunden, höchstens 70 Wörter |
| Kennzeichnung | Bildschirmtext „Synthetische Stimme · Quellen am Bildschirm · Keine Rechtsberatung“ ab Sekunde 0; gesprochen der Block „Hier ist Scutoria … keine Rechtsberatung“ in Abschnitt 7 vor dem Endscreen (Stefans Entscheidung vom 1. November 2026, `KENNZEICHNUNG.md`; bis dahin in den ersten 20 Sekunden und am Schluss) |
| Quellenzeile | unter jeder Zahl, Frist und Rechtsaussage, als Bildschirmtext |
| Abschnitte | sieben, immer in dieser Reihenfolge |

## Die sieben Abschnitte

1. **Hook** (0:00 bis 0:30). Eine Frage, die das Problem des Zuschauers trifft, dann in einem Satz, was das Video liefert. Am Bildschirm steht ab Sekunde 0 die Kennzeichnungszeile; gesprochen wird der Hinweis erst in Abschnitt 7.
2. **Problem** (0:30 bis 2:30). Die Lage im Betrieb, konkret, mit dem Beispielbetrieb oder einer typischen Situation. Kein Alarm, keine Angst, keine erfundenen Zahlen.
3. **Lösung** (2:30 bis 7:00). Was der Betrieb tut, in nachvollziehbaren Schritten. Hier liegt der Nutzen des Videos; der Zuschauer soll etwas mitnehmen, auch ohne Kauf.
4. **Beleg** (durchgehend, mit Schwerpunkt 7:00 bis 9:00). Die Quellen, die die Schritte tragen, mit Marker: Fakt, Auslegung, Unsicher, Lücke. Was offen ist, wird genannt, nicht versteckt.
5. **Beispielbetrieb** (9:00 bis 11:00). Der erfundene Elektrotechnikbetrieb mit zehn bis neunundvierzig Beschäftigten in Österreich: wie seine Antwort aussieht, welches Dokument dabei herauskommt, am Bildschirm das Musterdokument.
6. **Was es nicht ist** (11:00 bis 12:00). Der freigegebene Satz des Toolkits („not legal advice …“), die offenen Punkte, der Hinweis, dass ein Betrieb selbst entscheidet.
7. **Verweis** (12:00 bis Ende). Zuerst das freie Memo oder Tool zum Thema, dann das Toolkit mit dem einen Preissatz, dann der gesprochene Block „Hier ist Scutoria … keine Rechtsberatung“, dann der Endscreen (letzte 20 Sekunden: Bildschirm ruhig, Stimme nennt das nächste Video).

## Format der Datei

```
# NN · Titel des Videos
Linie: policy | security · Sprechzeit Ziel: 12 min · Wörter: n · Fassung: 2026-10-29, Entwurf zur Freigabe

## Metadaten
Titel (höchstens 70 Zeichen): …
Beschreibung: … (Vorlage METADATEN.md)
Tags: …
Kapitel: 00:00 … (mindestens drei, erstes 00:00, jedes mindestens zehn Sekunden)
Thumbnail-Text (höchstens fünf Wörter): …
Shotlist: VORLAGEN/SHOTLIST.md, Zeilen für dieses Video stehen unten im Abschnitt Regie

## Script

### 1 Hook
[SCREEN: Startseite scutoria.com, ruhig, Claim in drei Schlägen]
Gesprochener Text …
[SOURCE: Quellenzeile als Bildschirmtext]

### 2 Problem
…
```

Regeln für die Zeilen:

- Gesprochener Text steht als Absatz ohne Präfix. Er wird so, wie er dasteht, in die Gemini-Stimme gegeben.
- `[SCREEN: …]` ist eine Bildschirmanweisung für die Aufnahme: welche Seite, welche Stelle, scrollen, zoomen, Bildschirmtext.
- `[SOURCE: …]` beziehungsweise `[QUELLE: …]` ist die Quellenzeile, die als Bildschirmtext unten eingeblendet wird, in IBM Plex Mono, während die Aussage gesprochen wird. Sie steht direkt unter dem Absatz mit der Aussage.
- `[MARKER: Fact]` (Interpretation, Uncertain, Gap) steht vor einer Aussage, die im Video mit ihrer Form gezeigt wird.
- Zeilen in eckigen Klammern und Überschriften werden vom Skript `VORLAGEN/sprechtext.ps1` entfernt; übrig bleibt der reine Sprechtext für die Stimme.
- Pausen in der Stimme: `<short pause>` nach dem Hook und am Ende jedes Abschnitts, `<long pause>` vor dem Verweis. Sonst nur Satzzeichen. (Gemini-Tags, siehe `GEMINI-STIMME.md`.)

## Sprache im gesprochenen Text

- Englisch: „you“, ruhig, kurze Sätze, keine Ausrufezeichen, keine Gedankenstriche als Einschub, keine Emojis. Deutsch: „Sie“, dieselben Regeln.
- Zahlen im gesprochenen Text so, dass die Stimme sie richtig liest: „Article fifty, paragraph four“ statt „Art. 50(4)“; „two August twenty twenty-six“ darf „2 August 2026“ bleiben; „NIS two“ statt „NIS2“ (deutsch „NIS zwei“); „the GDPR“ (deutsch „die DSGVO“); „multi-factor authentication“ beim ersten Mal ausgeschrieben, danach „MFA“ (deutsch „Multi-Faktor-Authentifizierung“, danach „MFA“); „ISO twenty-seven thousand and one“ (deutsch „ISO siebenundzwanzigtausendeins“); „EUR-Lex“ bleibt; „Scutoria“ bleibt. Die Quellenzeile am Bildschirm trägt dagegen die amtliche Kurzform.
- Die Marke spricht als „we“ beziehungsweise „wir“. Nie „ich“. Nie ein Name.
- Verbotene Wörter: siehe `FAKTEN-PRODUKTE.md`, Abschnitt 1. Statt „secure“ oder „compliant“: „in place“, „regulated“, „documented“, „dated“; deutsch „geregelt“, „dokumentiert“, „datiert“, „vorhanden“.
- Jede Zahl, Frist und Rechtsaussage im Sprechtext hat eine `[SOURCE]`-Zeile direkt darunter. Was nicht belegt ist, heißt im Video „we found no source for this“ beziehungsweise „dafür haben wir keine Quelle gefunden“, mit Marker Lücke, oder wird weggelassen.
- Was im Handbuch als Auslegung, Unsicher oder Lücke markiert ist, bleibt es im Video, mit dem Marker ausgesprochen: „Our interpretation: …“, „This is open: …“ (deutsch „Unsere Auslegung: …“, „Das ist offen: …“).
- Der Kennzeichnungssatz (Pflicht, Wortlaut aus `KENNZEICHNUNG.md`):
  - EN am Anfang: „This is Scutoria. The voice you hear is synthetic. The script was drafted with an AI tool, then checked by us, sentence by sentence. Every number and every legal statement carries its source on screen. Source-based, no legal advice.“
  - EN am Schluss: „The voice was synthetic, the sources are in the description, and nothing here is legal advice.“
  - DE am Anfang: „Hier ist Scutoria. Die Stimme, die Sie hören, ist synthetisch. Das Skript wurde mit einem KI-Tool entworfen und von uns Satz für Satz geprüft. Jede Zahl und jede Rechtsaussage trägt ihre Quelle am Bildschirm. Quellenbasiert, keine Rechtsberatung.“
  - DE am Schluss: „Die Stimme war synthetisch, die Quellen stehen in der Beschreibung, und nichts davon ist Rechtsberatung.“
- Der Preissatz (einmal, im Verweis): „The toolkit costs 199 euros per year. The first ten buyers pay 99.“ / „Das Toolkit kostet 199 Euro im Jahr. Die ersten zehn Käufer zahlen 99.“
- Der Verweis nennt Adressen so, dass sie hörbar sind: „scutoria dot com, slash memos“ ist unnötig; besser: „The memo is free on scutoria.com; the link is in the description.“ Deutsch: „Das Memo ist frei auf scutoria.com; der Link steht in der Beschreibung.“

## Prüfliste vor der Freigabe (Claude prüft, Stefan liest)

1. Wortzahl im Bereich, beide Sprachen gleiche Gliederung.
2. Kennzeichnungssatz am Anfang und am Schluss vorhanden.
3. Jede Zahl, Frist, Rechtsaussage mit `[SOURCE]`-Zeile; jede Quellenzeile aus `FAKTEN-PRODUKTE.md` oder dem Handbuch, mit Abrufdatum.
4. Kein verbotenes Wort (Suche: compliant, konform, certified, zertifiziert, secure, sicher als Zusage, safe, ready, rechtssicher, erfüllt alle, meets all).
5. Kein Name, kein „ich“, kein Ausrufezeichen, kein Gedankenstrich als Einschub, kein Emoji.
6. Preis nur im freigegebenen Satz; kein Bundle.
7. Beispielbetrieb erfunden und als erfunden benannt; keine echte Person.
8. Verweis: Memo oder Tool zuerst, Toolkit danach.
9. Offene Punkte des Themas genannt.
10. Sprechtext mit `sprechtext.ps1` extrahiert, einmal laut mitgelesen (Fachwörter, Zahlen).
