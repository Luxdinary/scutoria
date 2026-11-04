# Prüfbericht Produkte, 23. Oktober 2026

Für Stefan. Geprüft wurde alles, was ein Kunde bekommt oder liest: beide Toolkits (Handbücher, sieben Dokumente je Toolkit in PDF, DOCX und XLSX, Fragebögen), die vier Memos, die zwei Tools, Produkt- und Startseite, dazu die PDFs, wie Lovable sie ausliefert. Fünf Prüfungen liefen parallel; jede Rechtsaussage wurde heute am Original gelesen (EUR-Lex bzw. Amtsblatt über publications.europa.eu, RIS, BSI, WKO, DSB und so weiter). Die Einzelbefunde mit Fundstelle, Quelle und fertigem Korrekturtext in EN und DE stehen im Ordner `befunde`.

## Das Urteil in drei Sätzen

Die Produkte sind inhaltlich stark: rund 300 der knapp 370 einzeln geprüften Aussagen in den Handbüchern stimmen wörtlich oder sinngleich, alle Telefonnummern und Adressen stimmen, EN und DE sagen überall dasselbe, und die Tools senden wirklich nichts. Fehlerfrei sind sie noch nicht: Es gibt **31 schwere Befunde (A)**, dazu 100 ungenaue oder unbelegte Stellen (B) und 78 Punkte zu Lesbarkeit und Stil (C). Die meisten A-Befunde sind kurze Textkorrekturen; vier sind Logikfehler in Memos und Tools, die ein falsches Ergebnis ausgeben.

| Bereich | Befunde | A | B | C | Datei |
|---|---|---|---|---|---|
| Handbuch KI-Richtlinien | 28 | 3 | 10 | 15 | `befunde/A1-…` |
| Handbuch Sicherheitsnachweis | 43 | 4 | 25 | 14 | `befunde/A2-…` |
| Dokumente KI-Richtlinien | 44 | 6 | 25 | 13 | `befunde/A3-…` |
| Dokumente Sicherheitsnachweis | 40 | 7 | 16 | 17 | `befunde/A4-…` |
| Memos, Tools, Produktseiten | 50 | 9 | 24 | 17 | `befunde/A5-…` |
| PDF-Ausgabe von Lovable | 4 | 2 | 0 | 2 | `befunde/L-…` |
| **Gesamt** | **209** | **31** | **100** | **78** | |

Einige Befunde kommen doppelt vor, weil zwei Prüfungen dieselbe Stelle gefunden haben (z. B. NIS2-Frühwarnung, „©“).

## Bereits behoben (kein Text geändert, keine Freigabe nötig)

- Lovable-PDFs: lange deutsche Wörter liefen in Tabellen in die Nachbarspalte. Jetzt wird umgebrochen, alle 26 PDFs bestehen eine neue automatische Prüfung auf überlappenden Text.
- Notfallkarte: füllt jetzt die Seite, Beschriftungen mindestens 10 pt, Telefonnummern fett, weiterhin genau eine Seite.
- Kopfzeile der PDFs wie die Druckfassung.
- Läuft gerade: Die Schrift Manrope setzt „(c)“ als „©“, in PDFs und auf der Website („Art. 21 Abs. 2 (c)“ sah aus wie ein Copyright-Zeichen).

## Die 31 schweren Befunde (A), kurz

**Handbuch KI-Richtlinien**
1. Art. 4 KI-VO: Die Änderung 2026/1744 hat den ganzen Artikel ersetzt, nicht nur einen Satz ergänzt; die Kritik an der WKO ist dadurch teils unberechtigt.
2. Das WKO-Muster hat zehn Paragrafen, nicht neun; sein Paragraf 10 empfiehlt genau die Freigabe nach außen, für die das Handbuch „keine Quelle“ meldet.
3. Beim Meldeweg fehlt die DSGVO-Pflicht, Datenschutzverletzungen binnen 72 Stunden zu melden und jede zu dokumentieren (Art. 33).

**Handbuch Sicherheitsnachweis**
4. „Den Lieferanten bindet nur der Vertrag“: Art. 32 DSGVO verpflichtet ihn direkt.
5. Meldefrist Versicherer: „unverzüglich, spätestens eine Woche“, nicht „eine Woche“.
6. NIS2-Frühwarnung geht an das CSIRT (§ 34 NISG 2026), nicht „an die Behörde“; derselbe Fehler steht auf der Notfallkarte.
7. DORA-Klauseln (Art. 30) gelten nur für IKT-Dienstleistungen, nicht für jeden Lieferanten einer Bank.

**Dokumente KI-Richtlinien**
8. Richtlinie § 2 verbietet nur „abschließende“ Entscheidungen über Personen; Sichten und Reihen von Bewerbungen mit KI bleibt erlaubt (Hochrisiko nach Anhang III Nr. 4).
9. Deepfake-Definition „zeigt“ statt „ähnelt“ (Art. 3 Nr. 60); ein erfundenes, realistisches Bild würde nicht gekennzeichnet.
10. Tool-Register: Die Auswahlliste „Freigabe“ ist kaputt (Komma in „ja, mit Einschränkung“).
11. Schulungsnachweis, Blatt „Je Person“: Die Spalte für den Namen fehlt.
12. Nachweisseite meldet „0 private Konten“, obwohl das Beispiel private Konten angibt (Frage B3 wird nicht ausgewertet).
13. Druckfassung ohne Seitenzahlen auf Folgeseiten. (In Lovables PDFs schon behoben.)

**Dokumente Sicherheitsnachweis**
14. „(c)“ als „©“ gedruckt (läuft gerade).
15. Nachweisliste führt vier Nachweise als „vorhanden“, die es nach den eigenen Antworten nicht gibt.
16. Notfallkarte: NIS2-Frühwarnung an „die Behörde“ statt an das CSIRT, „erheblich“ fehlt (wie Nr. 6).
17. Notfallkarte als DOCX hat in Word zwei Seiten, und nur dort lassen sich die gelben Lücken füllen.
18. Antwortschreiben verspricht eine Klausel-Prüfliste mit Formulierungen, die es so nicht gibt; beigelegt sähe der Kunde den internen Verhandlungsleitfaden.
19. Selbstauskunft und Antwortschreiben sind nicht versandfertig: Platzhalter, DORA-Absatz in jedem Brief, Scutoria-Kopfzeile, kein Absender, kein Unterschriftsplatz.
20. Notfallkarte für Deutschland und andere EU-Länder ohne wählbare Fachnummer, Felder nicht gelb markiert.

**Memos, Tools, Produktseiten**
21. NIS2-Memo: Mitteilung „wichtige Einrichtung“ ergibt immer „wesentlich“.
22. NIS2-Memo: Öffentliche Verwaltung unter 50 Beschäftigten bekommt Grün, obwohl die Zentralregierung unabhängig von der Größe erfasst ist.
23. Anmelde-Memo: Das grüne Ergebnis heißt „Grundlegend sicher“; „sicher“ ist auf der Verbotsliste.
24. Start-Memo: Die schwächsten Antworten ergeben „Ein brauchbarer Anfang“; angekreuzte KI-Tools werden ignoriert.
25. Personen-Tool: Namen vor Komma oder Punkt („Sehr geehrte Frau Huber,“) werden übersehen.
26. Personen-Tool: „Passwort ist X“ wird nicht erkannt, bei „Passwort lautet X“ bleibt das Passwort in der Kopie stehen.
27. Personen-Tool: Häufige Gesundheitswörter fehlen (krank, Krankmeldung, Befund, Krebs, sick).
28. „Einunddreißig Fragen“ stimmt nicht: Der Fragebogen hat 34 Fragen (von mir nachgezählt), davon laut Prüfung 29 Pflichtfragen.
29. Sicherheits-Produktseite: „die zehn Bereiche, nach denen jeder NIS-2-Kunde fragen muss“ ist als Rechtsaussage falsch.

**PDF-Ausgabe Lovable**
30. Tabellen-Überlappung (behoben).
31. „©“-Ligatur (läuft).

## Was gut ist und bleiben soll

- Jede Aussage trägt ihren Marker; Fakt und Auslegung sind fast überall richtig getrennt, offene Punkte bleiben sichtbar.
- Daten, Zahlen und Fristen sind zwischen EN und DE und zwischen den Dokumenten gleich.
- Die Struktur ist arbeitsnah: Prüffragen mit Fundstelle und Datum, ehrliche Antwortstufen, DOCX gut bearbeitbar.
- Die Tools senden nichts und setzen kein Cookie, wie versprochen.

## Was nicht geprüft werden konnte

- Perplexity: verlangt eine Anmeldung; die Gegenprobe steht aus, bis du dich im eingebauten Browser anmeldest. Die Prüfung am Original ist als Beleg ohnehin stärker.
- Einzelne Quellen waren nicht erreichbar (Login, DNS-Fehler, Bot-Sperre); sie sind in den Befunddateien je Bereich als „nicht verifizierbar“ aufgeführt, die Archivkopien vom 19.10. wurden ersatzweise gelesen.
- Ob die Minutenangaben (30 bzw. 40 Minuten) stimmen, ist nicht gemessen.

## Vorschlag für das Vorgehen

1. **Du gibst frei** (Tor Recht, weil sich Texte ändern, die live gehen). Empfehlung: alle A- und B-Korrekturen so übernehmen, wie sie in den Befunddateien formuliert sind; C-Punkte im selben Durchgang, wo sie nur Wortlaut oder Satz betreffen.
2. **Ich setze sie zuerst lokal um** (kostet keine Credits), erzeuge alle Dokumente, Handbücher und Memos neu und lasse die geänderten Stellen noch einmal gegenprüfen.
3. **Dann übertrage ich sie gebündelt an Lovable** als genaue Ersetzungsliste, damit wenig Credits draufgehen (rechnerisch sind noch rund 30 übrig, Stand prüfen), und lege die neu gerenderten Handbuch-PDFs bei.
4. Danach neues Prüfpaket für deinen Blick.
