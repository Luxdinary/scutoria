# Scutoria: vollständige Analyse und Erlebnis-Redesign

Stand und Abrufdatum: 01.11.2026. Ausgangspunkt: https://scutoria.com/de/ und die englische Fassung https://scutoria.com/.

Dieses Dokument ist die fachliche Übergabe an Claude. Es verbindet die erneute Bestandsprüfung mit einer neuen Gestaltungsperspektive: Scutoria soll ein Thema verständlich machen, zum Ausprobieren einladen und die Bedeutung der Produkte durch konkrete Alltagssituationen zeigen. Die folgenden Konzepte sind Vorschläge zur Entscheidung. Keine Live-Änderung wurde vorgenommen.

## 1. Ergebnis und Empfehlung

Scutoria besitzt bereits eine erkennbare visuelle Identität und funktionierende Produktbestandteile. Navy, Blau, Buchkörper, Dokumentblätter und die vier Aussagenmarker passen zum Thema. Die Website braucht keine beliebige neue Markenwelt. Sie braucht eine stärkere Verbindung zwischen dem Alltag des Besuchers, der Erklärung des Problems, der eigenen Interaktion und dem Nutzen der Dokumente.

Der aktuelle Auftritt sagt ausführlich, was enthalten ist. Er lässt Besucher noch zu selten selbst erleben, warum sie es benötigen und was sich durch die Nutzung verändert. Aus Dokumentenlisten sollte eine nachvollziehbare Geschichte werden: Eine Frage kommt auf. Der Betrieb trifft eine Entscheidung. Ein Dokument hält diese Entscheidung fest. Eine Quelle macht die Begründung prüfbar. Offene Punkte bleiben sichtbar.

**Empfehlung:** Erlebnis A „Evidence in motion“ als Grundlage. Es führt die vorhandene Dokumentenwelt weiter und macht den Produktnutzen im ersten Bildschirm verständlicher. Der Zusammenhangsplan aus B eignet sich als ergänzendes Erklärmodul. Die Kapitelstruktur aus C eignet sich für Lerninhalte und Handbücher. Nicht alle drei Hero-Konzepte gleichzeitig kombinieren.

Die passenden bewegten Elemente sind damit nicht bloße Dekoration: Ein Verbindungsweg wird sichtbar, ein Musterdokument verändert sich durch eine Auswahl, persönliche Angaben werden in einer Beispieldemo durch Platzhalter ersetzt, eine Aussage öffnet ihre Begründung. Das sind verständliche Reaktionen auf Handlungen des Besuchers.

**Wichtig:** Längere Besuchszeit allein ist kein Qualitätsnachweis. Besucher können auch lange bleiben, weil sie sich nicht zurechtfinden. Das Ziel ist freiwillige, nützliche Beschäftigung: Situation verstehen, Tool ausprobieren, Ergebnis lesen, Produkt zuordnen und bei Bedarf zurückkehren. Ob die Vorschläge das erreichen, muss nach Umsetzung untersucht werden. Eine Steigerung von Verweildauer oder Verkäufen wird hier nicht behauptet.

## 2. Prüfgrundlage und Grenzen

### Neu geprüft

- Ein erneuter Crawl erreichte 60 intern verlinkte Ziele: 38 HTML-Seiten und 22 PDF-Endpunkte. Alle lieferten HTTP 200. Grundlage: `crawl-results.json` dieses Pakets, Abruf 01.11.2026. Darunter sind auch unterschiedliche URLs auf Handbuch-PDFs; die Zahl bedeutet nicht 22 eigenständige Produkte.
- Die deutsche Startseite, Produktdarstellung, Toolübersicht und vorhandenen Interaktionsmuster wurden neu im Browser betrachtet. Desktopprüfung mit 1440 × 1000 Pixeln, Mobilprüfung mit 390 × 844 Pixeln. Diese Größen sind die Testumgebung, keine Aussage über Geräteverteilung.
- Die tatsächlichen deutschen Kaufbuttons beider Toolkits wurden erneut bedient. Beide führten im verwendeten In-App-Browser nicht sichtbar zu Stripe. Es erschien keine verständliche Fehlermeldung. Beleg: `erneute-browserpruefung.json` sowie die beiden Kauf-Screenshots.
- Auf der deutschen mobilen Startseite verschwinden die Hauptlinks. Ein Ersatzmenü ist nicht vorhanden. Beleg: `live-mobil.jpg` und `erneute-browserpruefung.json`.
- Der aktuelle Quelltext enthält einen automatisch fortschreitenden Dokumentstapel mit Pausensteuerung und zwei weitere Carousel-Bereiche. Die Seite hat also bereits ein Bewegungssystem. Dessen Qualität und Aufgabe werden unten differenziert beurteilt.
- Die aktuellen ausgelieferten Schriften sind Manrope und IBM Plex Mono. Quelle: berechnete Styles im Browser, 01.11.2026. Die Prototypen arbeiten bewusst mit lokalen Ersatzschriften, damit das Übergabepaket ohne Fontdienst lauffähig bleibt.

### Bereits am selben Tag geprüft und als Beleg übernommen

Im ersten Funktionsaudit wurden beide englischen Dokumentgeneratoren mit dem fiktiven vorbefüllten Betrieb bis zur Dokumentübersicht durchlaufen. Der KI-Fragebogen umfasst laut Website 34 Fragen, der Sicherheitsfragebogen 47. Die Pflichtfeldprüfung im KI-Einstieg funktionierte; eigene Testläufe konnten nach Neuladen weiterverwendet werden. Der Sicherheitslauf wurde schrittweise mit wiederholtem Neuladen geprüft. Das ist kein Nachweis für beliebige Browser, Geräte oder Kundenkonten.

Alle vier englischen Memo-Generatoren lieferten in je einem Testfall ein Ergebnis. Die beiden Browsertools wurden mit ausgewählten fiktiven Eingaben geprüft. Es wurden 53 Dateiabrufe strukturell untersucht: 35 PDFs waren parsebar; 18 ZIP- oder Office-Dateien besaßen lesbare Archive. Quelle und Abruf: ursprüngliche `document-checks.json`, 01.11.2026; im Unterordner `belege-basis` enthalten. Diese Prüfungen wurden nicht als vollständig neue Durchläufe ausgegeben.

Die früher getesteten englischen Kaufbuttons zeigten dasselbe Verhalten wie jetzt die deutschen. Ein separater HTTP-Test der englischen Kauf-Endpunkte lieferte 303-Weiterleitungen zu Stripe. Die ausgelieferte Sicherheitsrichtlinie enthält `form-action 'self'`. Eine dadurch blockierte externe Weiterleitung ist eine plausible Hypothese, aber keine bewiesene Ursache. Nicht eigenmächtig eine Sicherheitsrichtlinie abschalten.

### Nicht nachgewiesen

Keine echte Zahlung, keine Zustellung eines Login- oder Memo-Mails, kein Rechnungstest, kein Lizenzablauf, keine vollständige Kundenkonto- oder Backendprüfung. Keine vollständige juristische Gegenprüfung der Handbücher. Keine visuelle Vollabnahme aller Word-, Excel- und PDF-Ausgaben. Kein Penetrationstest, keine vollständige WCAG-Konformitätsprüfung, keine belastbare Core-Web-Vitals- oder Lighthouse-Messung. Keine Analytics- oder Nutzertestdaten über Interesse, Aufenthaltsdauer, Abbruch oder Kaufentscheidung.

Der Google-Drive-Konnektor war in dieser Sitzung nicht verbunden. `00 START.md` und die Scutoria-Übersicht im Gedächtnis konnten deshalb nicht gelesen werden. Die lokalen Scutoria-Arbeitsregeln wurden gelesen. Die Website wurde als aktuelle Primärquelle betrachtet; ältere lokale Hostingangaben wurden nicht als heutiger Stand übernommen.

## 3. Für wen das Erlebnis funktionieren muss

Die Website richtet sich laut eigener Darstellung an Betriebe ohne eigene IT-Abteilung. Daraus ergeben sich unterschiedliche Einstiege. Das sind abgeleitete Nutzungssituationen, keine durch Interviews belegten Personas.

### Leitung oder Büromanagement: „Wir müssen etwas regeln.“

Diese Person braucht verständliche Regeln und Verantwortung, ohne ein Fachstudium beginnen zu müssen. Sie möchte schnell erkennen, was sie selbst entscheiden muss, welche Informationen benötigt werden und welche Dokumente entstehen. Ein langer Absatz mit Dateiformaten und Paragraphen beantwortet diese erste Frage nur indirekt.

### Ein Kunde oder Versicherer fragt: „Was können wir vorzeigen?“

Diese Person hat eine konkrete Anfrage auf dem Tisch. Sie braucht eine ehrliche Übersicht über Vorhandenes und Fehlendes, keine pauschale Zusage und keine suggerierte Zertifizierung. Die Website sollte genau diese Anfrage sichtbar inszenieren und zeigen, wie ein datierter, eingeschränkter Nachweis aussieht.

### Beschäftigte: „Darf ich das in ein KI-Tool einfügen?“

Diese Person sucht eine kurze, hilfreiche Entscheidungshilfe. Ein kleiner, unmittelbar bedienbarer Einstieg macht die Bedeutung des Themas viel deutlicher als ein Werbetext. Danach kann ein sachlicher Anschluss erklären, warum der Betrieb darüber hinaus gemeinsame Regeln benötigt.

### Neugierige ohne akuten Anlass: „Warum betrifft mich das?“

Diese Person muss erst eine Alltagssituation erkennen. Ein Mini-Beispiel, eine kurze Frage oder eine sichtbare Veränderung bietet einen Grund weiterzulesen. Druck, dramatische Hackerbilder und unbelegte Schadenszahlen würden die nüchterne Marke schwächen.

## 4. Was erhalten bleiben sollte

- Die dunkle Navy-Basis und das klare Blau. Sie geben Scutoria bereits Wiedererkennung.
- Die materielle Dokumentensprache. Buch, Blatt, Register und Nachweis passen besser zum Produkt als abstrakte Cyberkugeln.
- Die ehrliche Unterscheidung von Fakt, Auslegung, Unsicher und Lücke. Das kann ein prägendes Interaktionselement werden.
- Die Möglichkeit, vor einem Kauf Muster und Handbücher anzusehen.
- Die breite zweisprachige Basis. Englisch zuerst, Deutsch im selben Umsetzungslauf.
- Die eigenständigen kostenlosen Tools. Sie sind ein guter Einstieg in das Thema und dürfen visuell stärker auftreten.
- Die vorhandene Unterstützung für reduzierte Bewegung und die Pausensteuerung des aktuellen Hero-Stapels. Nicht entfernen, sondern bei jedem neuen Effekt mitdenken.

Nicht empfehlenswert wären eine beliebige neue Farbpalette, eine inszenierte persönliche Gründerfigur, erfundene Kundenlogos oder unbelegte Erfolgskennzahlen. Der Anbieter muss nicht mit Namen und Gesicht als Marketingfigur auftreten. Reale Anbieterangaben gehören dorthin, wo sie sachlich erforderlich sind.

## 5. Warum die heutige Seite noch nicht zum längeren Erkunden einlädt

### Der Einstieg ist ein Markenmotto, noch keine erkannte Situation

„Belegt. Datiert. Vorzeigbar.“ ist eine gute Haltung. Die erste inhaltliche Übersetzung folgt aber als langer Absatz. Die beiden primären Links heißen wie die Produkte. Wer die Kategorien noch nicht kennt, muss sie zuerst lernen. Eine Alltagsfrage könnte sofort das eigene Problem spiegeln.

### Produktumfang überwiegt das spürbare Ergebnis

Die Texte zählen Dokumente, Pflichtfragen und Quellenmethodik auf. Das ist für eine vertiefte Kaufprüfung wichtig. Für den Einstieg fehlt der Moment: „Diese Frage kenne ich, so könnte unsere Antwort aussehen.“ Der Nutzen sollte vor dem Inventar kommen, ohne den Umfang zu verstecken.

### Der Dokumentstapel ist eindrucksvoll, erklärt aber vor allem sich selbst

Die bestehende Animation zeigt, dass Dokumente vorhanden sind. Sie zeigt weniger klar, wie aus einer Eingabe eine betriebliche Entscheidung und daraus ein Datensatz oder Dokument wird. Eine ausgewählte Kundenfrage mit einem nachvollziehbaren Übergang wäre inhaltlich stärker. Der Stapel darf als Wiedererkennung bleiben; sein automatischer Wechsel sollte nicht die Hauptaufgabe übernehmen.

### Die Tools erscheinen zu spät als eigene Erfahrung

Auf der Startseite werden zunächst Produkte, Preise, Ablauf, Belegsystem und Muster vorgestellt. Die direkt nützlichen Helfer kommen danach. Wer noch nicht kaufen möchte, bekommt erst spät etwas zum Ausprobieren. Ein kontrolliertes fiktives Beispiel auf der Startseite kann diese Hürde senken.

### Die Toolübersicht bleibt trotz animierter Beispiele überwiegend ein Katalog

Die Übersicht zeigt bereits anschauliche Miniaturen. Sie könnten stärker als echte Einstiege funktionieren: mit einer klar benannten Handlung, einer verständlichen Art des Ergebnisses und einem Hinweis auf die unterschiedliche Datenverarbeitung. Das Wort „Tools“ allein erklärt weder Ausgangsfrage noch Ergebnis.

### Das Belegsystem wird erklärt, aber nicht selbstverständlich erlebbar gemacht

Quellen und Abrufdaten wirken bisher wie ein methodischer Textblock. Ein Besucher sollte eine Aussage auswählen und unmittelbar ihren Beleg, die genaue Fundstelle, die Auslegung und einen offenen Punkt sehen können. In den vier erfassten Online-Handbüchern wurden keine externen HTML-Links auf Primärquellen gefunden. Grundlage: aktuelles Linkinventar, 01.11.2026.

### Status und Kundenwege unterbrechen das Vertrauen

Vorschau, Kaufversprechen, frei laufende Generatoren und öffentliche Rechtstextentwürfe stehen gleichzeitig im Raum. Das kann eine bewusst offene Testphase sein. Der Status muss aber konsistent benannt werden. Ein interaktiveres Design löst weder einen unterbrochenen Kaufweg noch unvollständige Pflichtinformationen.

## 6. Neue Dramaturgie der Startseite

Die folgende Reihenfolge ist ein Vorschlag, kein aus Nutzertests abgeleitetes Optimum.

### Einstieg: eine Frage, die der Besucher kennt

Kernfrage: Was kann ich mit Scutoria für meinen Betrieb klären oder zeigen? Links stehen eine klare Überschrift und kurze Erläuterung. Rechts befindet sich eine ruhige, frontal lesbare Dokumentvorschau. Darunter wählt der Besucher zwischen KI-Nutzung, Kundenanfrage und Vorbereitung auf einen Vorfall. Der Dokumentinhalt reagiert auf seine Auswahl.

Im Hero sollten Zielgruppe, Ergebnis, Demo und nächster Schritt sichtbar sein. Ein als Entwurf gekennzeichneter Demo-Ablauf ist von einem echten Generatorlauf zu unterscheiden. Kein automatischer Start eines Kundenlaufs und keine echten Betriebsdaten in der Hero-Demo.

### Relevanz: die betriebliche Folge erklären

Drei kurze Alltagssituationen statt eines Angstabschnitts: Ein KI-Tool wird genutzt, ohne gemeinsame Regeln. Ein Kunde bittet um Belege. Ein Vorfall erfordert einen bekannten Meldeweg. Je Situation genau erklären, welche Entscheidung oder Vorbereitung hilft. Nicht behaupten, Dokumente verhinderten einen Angriff oder garantierten die Annahme durch Kunden.

### Erste eigene Handlung: ein fiktives Toolbeispiel

Eine Nachricht enthält einen erfundenen Namen und eine Beispieladresse. Per Knopfdruck werden die erkannten Stellen durch Platzhalter ersetzt. Danach wird der Unterschied erklärt und die Grenze genannt: Der Kontext kann eine Person weiter erkennbar machen. Der Besucher erhält einen sichtbaren Effekt und eine Einsicht, bevor er zu einem umfangreicheren Formular wechselt.

Das Demo-Modul darf nicht heimlich einen echten Textprüfer vortäuschen. Der Prototyp verwendet vorbereitete Texte, keine Erkennung. Die Produktionsumsetzung kann den echten lokal arbeitenden Prüfer einbinden, wenn dessen Verhalten und Grenzen sauber übernommen werden.

### Tools erkunden: passende Fragen statt nur Kategorien

Zwei Browserprüfungen und vier Memo-Generatoren klar unterscheiden. Jede Karte nennt Ausgangsfrage, Art des Ergebnisses und Datenverarbeitung. Browserprüfung und Memo dürfen nicht unter einem pauschalen „sendet nichts“ zusammengefasst werden. Beim Memo muss das Ergebnis vor einem optionalen E-Mail-Schritt lesbar bleiben.

### Produkt: aus einer Einsicht eine wiederholbare Regel machen

Nun werden die beiden verfügbaren Toolkits verglichen. Jedes erhält einen klaren Anwendungsfall, eine echte Ergebnisvorschau, eine kurze Umfangsliste und eine passende nächste Handlung. Preise und Lizenzbedingungen bleiben nachvollziehbar, werden aber nicht als erstes Argument vor die erkannte Aufgabe gestellt. Keine neue Preisentscheidung in diesem Konzept.

### Methode: die Begründung selbst öffnen

Das vierteilige Markersystem wird interaktiv. Jede Kategorie zeigt an einem fachlich geprüften Beispiel, was sie bedeutet. Ein Quellenpanel verbindet Aussage und Originalfundstelle. Auf Mobil kann ein Dialog oder eine eigene Seite verwendet werden; es darf keine nur auf Hover erreichbare Information geben.

### Ablauf: den Aufwand ehrlich zeigen

Eigene Daten erfassen, Antworten prüfen, Dokumente lesen, herunterladen und im Betrieb anwenden. Eine Bearbeitungszeit darf erst nach Messung realer Szenarien genannt werden. Das Fragensystem braucht eine Kapitelübersicht, sichtbaren Speicherstatus und eine klare Wiederaufnahme. „Muster ausprobieren“ und „Eigenen Betrieb erfassen“ müssen unterschiedliche Einstiege sein.

### Abschluss: mehrere sinnvolle nächste Schritte

Ein Besucher darf kaufen wollen, erst ein Tool nutzen oder zunächst ein Muster lesen. Drei gleich laute primäre Buttons sind nicht nötig. Der Abschluss priorisiert eine zum Inhalt passende Handlung und verlinkt die Alternativen ruhiger. Kein künstlicher Zeitdruck und keine unbelegte Knappheit ergänzen.

## 7. Neue grafische Varianten

Alle drei Varianten sind neue, eigenständige interaktive HTML-Prototypen. Sie sind nicht die früheren Varianten A, B und C. Die Farben bleiben an Scutoria orientiert. Englisch und Deutsch sind über den Sprachschalter verfügbar. Die Prototypen demonstrieren das Erlebnis, ersetzen aber keine vollständige Shopimplementierung.

### A: Evidence in motion, empfohlene Hauptrichtung

Signatur: Die betriebliche Frage wird zur Entscheidung und zum vorzeigbaren Dokument. Große klare Typografie links, Dokumentenwerkbank rechts. Eine diskrete Linie verbindet die Schritte. Die Dokumentfläche bleibt frontal und lesbar. Die Alltagssituation verändert das Beispiel. Der Besucher kann jeden Schritt gezielt öffnen oder den Ablauf einmal abspielen.

Wirkung als Gestaltungshypothese: Wertigkeit des heutigen Auftritts bleibt erhalten, der Nutzen wird greifbarer. Das Konzept ist näher an einer fertigen Produktwebsite als an einer abstrakten Sicherheitsinszenierung.

Datei: `erlebnis-a.html`. Deutsch: `erlebnis-a.html?lang=de`.

```text
Marke / Navigation / Bewegung / Sprache
Alltagsfrage + Nutzen     | Dokumentenwerkbank
                         | Frage > Entscheidung > Nachweis
Situationswahl: KI / Kunde / Vorfall
Warum es im Alltag zählt
Kleine Tooldemo > alle Tools
Produkte > Methode > Anwendung
```

### B: Connected business, stärkste Erkundungsrichtung

Signatur: Ein auswählbarer Zusammenhangsplan verbindet Menschen, KI-Tools, Zugänge, Regeln und Nachweise. Jede Auswahl öffnet eine praktische Frage und erklärt, warum der Bereich mit den anderen zusammenhängt. Der Plan ist ausdrücklich kein Sicherheits-Score und keine Bewertung des echten Betriebs.

Wirkung als Gestaltungshypothese: Fördert neugieriges Erkunden und zeigt, warum das Thema mehrere Bereiche betrifft. Erfordert besonders klare Beschriftung, damit die Grafik nicht als Überwachung oder technisch vollständige Systemkarte verstanden wird.

Datei: `erlebnis-b.html`. Deutsch: `erlebnis-b.html?lang=de`.

```text
Marke / Navigation
Zentrierte These + kurzer Nutzen
Zusammenhangsplan       | Frage zum gewählten Bereich
Menschen / Tools /      | Begründung / Muster öffnen
Zugänge / Regeln / Belege
Werkzeuge > Quellenmethode > Dokumentensätze
```

### C: Living field guide, stärkste Leserichtung

Signatur: Ein lebendiger Praxisguide mit drei Einstiegskapiteln: vor dem Einfügen in ein KI-Tool, bei einer Kundenanfrage, vor einem Vorfall. Ein ausgewähltes Kapitel verbindet eine kurze Erklärung mit dem passenden Dokument. Eine tiefblaue Titelfläche und helle Leseflächen staffeln die Seite.

Wirkung als Gestaltungshypothese: Besonders passend für Besucher, die einordnen und lernen möchten. Gute Basis für Handbücher, Quellen und vertiefende Praxisbeispiele. Als alleinige Startseite muss es deutlich genug zum Produkt führen, damit kein unübersichtliches Magazin entsteht.

Datei: `erlebnis-c.html`. Deutsch: `erlebnis-c.html?lang=de`.

```text
Blaue Titelfläche       | Drei Kapitel zum Auswählen
Ausgewählte Situation  | Passendes Dokument
Helle Tooldemo / dunkle Vertiefung
Methode > Dokumentensätze > Anwendung
```

### Gemeinsame Gestaltungstokens

Bestandsfarben aus der Live-Website, Abruf 01.11.2026: Navy `#0B1120`, Aktionsblau `#2F6BE6`, Akzentblau `#4F8CFF`, Sekundärtext `#A1ADC4`, heller Text `#E9EEF8`. Ergänzende Entwurfsfarben: Papier `#F1F5FC`, ruhiges Mint `#62CFBB`, Linien `#2A3B57`. Mint markiert Verbindungen oder hilfreiche Rückmeldungen, keinen behaupteten geprüften Sicherheitszustand.

Die Prototypen verwenden Bahnschrift beziehungsweise lokale Systemersatzschriften für Überschriften, Segoe UI für Fließtext, Consolas für Funktionsbeschriftung und Cambria nur im Musterdokument. In der Produktion kann die vorhandene Manrope-/IBM-Plex-Kombination bleiben. Zuerst Hierarchie, Größen, Zeilenlängen und Abstände verbessern, bevor ein Fontwechsel beschlossen wird.

Die Farben der Aussagenmarker dürfen nicht allein Bedeutung tragen. Kategorie und Erklärung müssen zusätzlich lesbar sein. Dokumente, Kategorien und Produktarten sollen dieselbe Sprache auf allen Seiten behalten.

## 8. Animation und Visual Experience

Alle Zeit- und Bewegungswerte in diesem Abschnitt sind **vorgeschlagene Entwurfswerte**, keine gemessenen Bestandswerte und keine rechtlichen Grenzwerte. Sie müssen mit dem tatsächlichen Inhalt auf echten Geräten geprüft werden.

### Bewegungssystem

- Mikroreaktion: etwa 120 bis 180 ms. Fokus, gedrückter Zustand und dezente Buttonreaktion. Keine Bewegungsverzögerung vor der eigentlichen Aktion.
- Zustandswechsel: etwa 240 bis 450 ms. Dokument-, Quellen- oder Demowechsel. Inhalt erscheint unmittelbar; Bewegung verdeutlicht nur den Wechsel.
- Einmalige Eingangsbewegung: etwa 500 bis 700 ms mit kleiner Verschiebung von etwa 8 bis 14 px. Kein langer Introfilm und kein blockierender Ladebildschirm.
- Erklärsequenz: im Prototyp zwei nutzergestartete Zwischenstufen von jeweils etwa 950 ms. Danach ein stehendes Ergebnis. Jeder Zustand ist auch direkt erreichbar.
- Bewegungsverlauf: ruhiges Abbremsen, zum Beispiel `cubic-bezier(.2,.8,.2,1)`. Kein federndes Springen von Rechtstexten oder Formularelementen.

### Konkrete Szenen

| Modul | Auslöser | Sichtbarer Effekt | Inhaltlicher Zweck | Mobil / reduzierte Bewegung |
| --- | --- | --- | --- | --- |
| Hero-Eingang | Seitenaufruf | Überschrift und Dokument setzen sich einmal ruhig zusammen | Orientierung und Wertigkeit | Kleine Bewegung; bei Reduktion sofort sichtbar |
| Dokumentweg | Knopf „Ablauf zeigen“ | Frage, Entscheidung und Nachweis wechseln; Verbindung wird nachgezogen | Produktentstehung erklären | Gleiche direkte Schrittwahl; bei Reduktion stehender Endzustand |
| Situationswahl | KI, Kunde oder Vorfall wählen | Dokumenttitel und erklärende Zeilen ändern sich | Eigenen Anlass wiedererkennen | Buttons bleiben sichtbar; kein Hover nötig |
| Zusammenhangsplan | Knoten wählen | Knoten und zugehörige Erklärung werden hervorgehoben | Abhängigkeiten verstehen | Untereinander angeordnete Grafik und Erklärung; alle Fragen als Text erreichbar |
| Platzhalter-Demo | „Platzhalter zeigen“ | Erfundener Name und Beispieladresse werden durch Platzhalter ersetzt | Sofortige Einsicht, Grenze danach erklären | Inhalt bleibt vollständig lesbar; kein tatsächliches Senden |
| Quellenpanel | Aussage oder Marker wählen | Präziser Beleg öffnet sich neben dem Text oder in Dialog | Vertrauen prüfbar machen | Dialog oder eigene Seite; Fokus zurück zum Auslöser |
| Produktkarte | Hover oder Fokus | Buchkörper hebt sich dezent; Handlung bleibt unverändert | Greifbarkeit des Angebots | Statisch bei Touch; keine versteckten Inhalte |
| Generatorfortschritt | Antwort bestätigen | Aktuelles Kapitel und nächster Abschnitt ändern sich | Orientierung in einem längeren Ablauf | Keine erzwungene horizontale Bewegung |
| Export | Erfolgreiche echte Dateierzeugung | Bestätigung und Download werden sichtbar | Abschluss vermitteln | Nur nach echtem Erfolg, kein inszenierter Fortschritt |
| Scrollabschnitte | Abschnitt wird erreicht | Optional kurze einmalige Hervorhebung | Seitenrhythmus unterstützen | Ohne JavaScript alles sichtbar; keine unsichtbaren Restabschnitte |

### Was nicht eingesetzt werden sollte

Keine Partikelwolke ohne Erklärung, kein endlos rotierendes Schild, kein Cursorzwang, kein vom Scrollen abgekoppelter Seitentransport und kein künstliches Warten auf ein Demoergebnis. Kein automatisches Weiterschalten während des Lesens eines Dokuments. Auf Mobil keine schwere Hintergrundgrafik, die Inhalt und Bedienung verdrängt. Eine kurze Reaktion ist sinnvoller als Bewegung an jedem Element.

### Zugänglichkeit und technische Basis

Die W3C-Erläuterung zu WCAG 2.2, Kriterium 2.2.2 beschreibt Pausen- oder Stoppmöglichkeiten für bestimmte automatisch laufende bewegte Inhalte. Nicht jede kurze Transition fällt darunter. Kriterium 2.3.3 betrifft abschaltbare, nicht wesentliche bewegte Interaktionen und ist Level AAA. Es wird hier als zusätzliche Gestaltungsanforderung vorgeschlagen, nicht als behauptete gesetzliche Pflicht. Quellen: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html und https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html, Abruf 01.11.2026.

Die Umsetzung soll `prefers-reduced-motion` respektieren und zusätzlich einen verständlichen Bewegungsschalter anbieten. Auch bei ausgeschalteter Bewegung müssen die gleichen Inhalte, Ergebnisse und Handlungen verfügbar bleiben. Nicht wesentliche Animationen bei verborgenem Tab beenden; Sequenzen vor einem neuen Start abbrechen. Keine konkurrierenden Timer.

Für Animationen bevorzugt `transform` und `opacity` einsetzen. Kontinuierliche Layoutänderungen vermeiden und nachmessen. Diese technische Richtung folgt https://web.dev/articles/animations-guide, Abruf 01.11.2026. Es ist keine Garantie für gute Performance; Schrift, Bilder, Layout, tatsächlicher Code und Endgeräte müssen ebenfalls geprüft werden.

## 9. Texte, die Bedeutung vermitteln

### Hero-Vorschlag A

Englisch zuerst:

> When someone asks, have an answer.
>
> Who may use AI? What can you show a customer? Explore how your answers become clear rules and dated evidence.
>
> Explore an example / See the toolkits

Deutsch:

> Wenn jemand fragt, können Sie antworten.
>
> Wer darf KI nutzen? Was können Sie einem Kunden zeigen? Entdecken Sie, wie aus Ihren Antworten klare Regeln und datierte Nachweise werden.
>
> Ein Beispiel erleben / Toolkits ansehen

Diese Formulierung ist ein Gestaltungsentwurf. Vor Veröffentlichung darauf prüfen, dass „antworten können“ nicht als Zusage einer vollständigen oder rechtlich verbindlichen Antwort verstanden wird. Die konkrete Ergebnisvorschau muss die Grenzen erkennbar machen.

### Warum das Thema wichtig ist

Geeignete Aussagen sind konkrete betriebliche Fragen: Wer entscheidet im Zweifel? Wer prüft ein Ergebnis? Wo steht ein Meldekontakt? Was ist bereits vorhanden? Was fehlt noch? Sie machen die Bedeutung erkennbar, ohne eine neue unbelegte Rechts- oder Schadensbehauptung einzuführen.

Nicht verwenden: erfundene Angriffsquoten, garantierte Bußgeldvermeidung, automatische Konformität, angebliche Anerkennung durch alle Versicherer oder künstliche Kundenbewertungen. Fachliche Rechtsaussagen und Fristen müssen weiterhin am Original geprüft, datiert und gegebenenfalls als unsicher gekennzeichnet werden.

### Verständlicher Nutzen der Produkte

KI-Richtlinien-Toolkit: Von verstreuten Einzelentscheidungen zu gemeinsamen, überprüfbaren Regeln für Tools, Eingaben, Prüfung und Verantwortung. Sicherheitsnachweis-Toolkit: Von einer Kundenfrage zu einer ehrlichen Darstellung von Vorhandenem, Fehlendem und geplanten Schritten. Das sind vorgeschlagene Nutzenbeschreibungen; der tatsächliche Lieferumfang muss beim Übertragen mit dem Produkt abgeglichen werden.

Die vier Aussagenmarker sind kein ständig wiederholter Warnblock. Erkläre die Methode an einem guten Beispiel, biete bei Bedarf Vertiefung an und kennzeichne konkrete Aussagen dort, wo die Kennzeichnung gebraucht wird. Das schafft einen besseren Lesefluss als immer neue allgemeine Disclaimer.

## 10. Seitenweise Umsetzung

### Startseite

Ein klarer Hero, eine Situationswahl, eine unmittelbar bedienbare Beispieldemo, ein sinnvoll gruppierter Toolbereich und eine nachvollziehbare Produktauswahl. Dokumentvorschau und Quellenmethode mit echter Vertiefung verknüpfen. Vorbereitete Produkte als solche kennzeichnen und nicht gleichgewichtig neben verfügbare Produkte stellen.

### Produktseiten

Für wen ist das Set, welche Frage löst es, welche konkreten Dateien entstehen, was muss der Betrieb selbst entscheiden, was deckt es nicht ab, wie wird es angewendet und was gilt für Lizenz und Zugang? Dokumentliste über einen klar beschrifteten Viewer statt einer langen Folge gleichartiger Absätze. Echte PDFs bleiben direkt verlinkt. Preise und Bedingungen nicht verändern, solange sie nicht ausdrücklich entschieden sind.

Im Vorschaubetrieb muss der Generatorzugang genauso erklärt werden wie auf der Startseite. Der Weg von Muster zu eigenem Betrieb ist explizit. Keine vorausgefüllte behauptete Sicherheitsmaßnahme ohne bewusste Übernahme.

### Toolübersicht und Toolseiten

Nach Fragen gruppieren, Browserprüfer und Memos unterscheiden. Je Tool: Eingabe, Ausgabe, Grenzen, Datenverarbeitung und nächster Schritt. Fiktive Beispiele als solche kennzeichnen. Bei einem negativen Befund eine konkrete Alternative anbieten. Eine rote Ampel allein erklärt noch nicht, was der Beschäftigte jetzt tun kann.

Der Textprüfer braucht eine klare Erklärung, dass Mustererkennung unvollständig sein kann. Ein nicht markierter Text ist kein Nachweis unbedenklicher Weitergabe. In der bisherigen Stichprobe konnte die Zugangsdatenersetzung auch den nachfolgenden Satz mit entfernen; das sollte als funktionaler Randfall geprüft werden.

### Memo-Eingabe und Ergebnis

Nur zutreffende Folgefragen zeigen. Ergebnis direkt lesen lassen. PDF und E-Mail als nachvollziehbaren Zusatzweg erklären. Ergebnis und gewählte Antworten beim Sprachwechsel erhalten. Keine freien Betriebsnamen in Ergebnisadressen. Der aktuelle Hinweis, dass nichts gespeichert werde, muss technische Übermittlung und mögliche Logs präzise berücksichtigen.

### Online-Handbücher

Kapitelübersicht, sinnvoller Lesebereich, genaue Kapitelanker und anklickbare Originalbelege. Im Absatz eine kurze Aussage, daneben oder darunter Begründung und Stand. Der Leser soll nicht auf einer leeren Domain nach der gemeinten Quelle suchen müssen. Optional ein Begriffsglossar und verwandte Tools verlinken. Kein neues unkontrolliertes KI-Fragefeld über Rechtsfragen ergänzen.

### Generatoren

Kapitel, Speicherstand, Zurück, Bearbeiten und spätere Wiederaufnahme klar darstellen. Die bestehende Funktion schrittweise verbessern, nicht wegen des Redesigns blind ersetzen. Vor dem Export eine Prüfübersicht mit offenen und unveränderten Mustereinträgen. Inline-Hilfe „Warum wir das fragen“ statt eines alleinstehenden Kapitelzeichens.

### Dokumentausgabe und Konto

Dateien nach Zweck und Format gruppieren. Stand, Version, Betriebszuordnung und Quellenfassung verständlich anzeigen. Ein Dokument erklärt seine nächste Verwendung: prüfen, ausfüllen, unterschreiben, aushängen, einweisen oder weitergeben. Kundenkonten und Versionierung sind zunächst im tatsächlichen System zu prüfen; ihr vollständiges Verhalten wurde nicht getestet.

### Über-Seite, Rechtstexte und Fehlerzustände

Methode und Verantwortlichkeit ohne erfundene Personeninszenierung zeigen. Öffentliche Entwurfsplatzhalter vor einem Verkaufsstart schließen. Eigene Fehlerseiten für ungültige Links, fehlende Datei und unterbrochene Aktion. Nach einem Fehler einen konkreten Rückweg anbieten. Rechtliche Inhalte bleiben fachlich zu prüfen und benötigen vor Veröffentlichung Stefans Freigabe.

## 11. Erfolg sinnvoll messen

Noch liegen keine entsprechenden Messdaten vor. Folgende Größen sind Vorschläge für die spätere Auswertung, keine aktuellen Werte:

- Anteil der Besucher, die eine Situation bewusst auswählen und anschließend ein Dokument oder Tool öffnen.
- Verhältnis von Demo-Starts zu bewussten Ergebnisansichten; nicht bloß Scrollposition als Interesse zählen.
- Beginn und Abschluss echter Tool- oder Generatorläufe getrennt betrachten. Abbrüche nach Kapitel auswerten, ohne Eingabetexte zu übertragen.
- Öffnungen von Musterdateien und Originalquellen als eigene Handlungen betrachten.
- Übergänge vom Tool zum passenden Produkt messen, ohne den kostenlosen Nutzen hinter einer Kaufhürde zu verstecken.
- Wiederkehr und Verständnis mit geeigneten Tests untersuchen. Ein erfolgreicher kurzer Besuch kann besser sein als ein langer verwirrter Besuch.

Vor Einführung neuer Messung tatsächliche Datenflüsse und Datenschutzhinweise klären. Keine Namen, E-Mail-Adressen, Tool-Eingaben, rechtlichen Antworten, generierten Inhalte oder vollständigen Ergebnis-URLs als Ereignisparameter erfassen. Eine mögliche Ereignisstruktur besteht nur aus Modul-ID, Handlung, Sprache und anonymem aggregierten Zähler. Ob die konkrete Technik tatsächlich ohne Personenbezug funktioniert, muss gesondert geprüft werden.

Für frühe Nutzertests sollten Menschen aus der Zielgruppe ohne Erklärung die Aufgabe lösen: passendes Toolkit finden, mit einem Beispiel beginnen, einen Quellenverweis öffnen und erklären, was das Ergebnis leistet und was nicht. Welche Häufigkeit oder Erfolgsquote genügt, ist vor dem Test zu definieren; hier werden keine erfundenen Zielwerte gesetzt.

## 12. Technische und redaktionelle Abnahme

### Funktionskern

Alle bestehenden öffentlichen Routen, echten Tools, Muster-PDFs, Handbücher und Generatoren vor Umbau inventarisieren. Ein Redesign darf funktionierende Ausgabe nicht versehentlich ersetzen. Die beiden Produktkaufwege müssen im gewöhnlichen Zielbrowser geprüft werden, nicht nur per Serverantwort. Checkout-Fehler benötigen eine sichtbare Rückmeldung. Zahlung, Rechnungen und E-Mail-Zustellung in einer geeigneten Testumgebung abnehmen.

### Zugänglichkeit

Alle Hauptaktionen funktionieren mit Tastatur und sichtbarem Fokus. Keine wesentliche Information nur per Hover. Auswahlelemente haben verständliche Namen und sichtbare Auswahlzustände. Dynamische Ergebnisse werden angemessen angekündigt, ohne jeden Buchstaben vorzulesen. Dialoge haben Titel, Schließen, Escape, Fokusbindung und Rückkehr zum Auslöser. Das Mobilmenü besitzt einen nachvollziehbaren Zustand und bleibt unabhängig von dekorativer Bewegung bedienbar.

### Bewegung

Direktwahl und animierte Sequenz liefern denselben Endinhalt. Mehrfaches Starten erzeugt keine überlappenden Abläufe. Ausschalten während der Sequenz zeigt den vollständigen Inhalt. Bei reduzierter Bewegung wird die Erklärung nicht übersprungen, sondern statisch angeboten. Navigation und Scrollen bleiben unter Kontrolle des Besuchers.

### Darstellung und Performance

Schmale Mobilansicht, Tablet und Desktop prüfen. Lange deutsche Wörter, vergrößerte Schrift und browserabhängige Umbrüche berücksichtigen. Keine seitlich abgeschnittenen Kaufaktionen oder Dialoge. Produktionsseiten liefern Hauptinhalt bereits ohne Animations-JavaScript. Die Prototypen sind bewusst kleine JavaScript-Demos; sie sind nicht als serverseitige Produktionsarchitektur zu übernehmen.

Ladeleistung nach Umsetzung auf echten Geräten messen. Die Demo ohne Grafikbibliothek zeigt, dass für die vorgeschlagene Erlebnisidee kein großes 3D-Paket zwingend nötig ist. Ob ein vorhandenes Framework eingesetzt wird, muss aus dem tatsächlichen Repository folgen. Nicht vorsorglich den gesamten Shop neu aufsetzen.

### Veröffentlichung

Keine automatische Veröffentlichung aus diesem Briefing ableiten. Vorschau- und Verkaufszustand zuerst bewusst festlegen. Öffentliche Marketingseiten erst zur gewünschten Veröffentlichung gezielt für Suchmaschinen freigeben; Konto und private Ergebnisse nicht versehentlich indexierbar machen. Geld, Recht und Veröffentlichung bleiben Stefans Entscheidungstore. Keine Render-Umgebungsvariablen und keine Stripe-Einstellungen eigenmächtig ändern.

## 13. Arbeitsreihenfolge für Claude

1. Dieses Dokument, `START-FUER-CLAUDE.md`, die drei Prototypen und die technischen Belege lesen. Die bestätigte Live-Website ist die Ausgangslage. Die früheren Designs sind nicht das Ziel dieses neuen Auftrags.
2. Tatsächliches Repository, Framework, Routing, Build, vorhandene Styles, Tests, Generatoren und Hostingwege prüfen. Aus dem ausgelieferten HTML keine nicht belegte Backendarchitektur ableiten.
3. Bestandsprobleme von Gestaltungsideen trennen. Kaufweg, mobile Navigation und Statuskommunikation gezielt reproduzieren. Eine mögliche CSP-Ursache nicht als bewiesen behandeln.
4. Variante A in einer lokalen oder vorgesehenen Vorschau umsetzen. Bestehende Markenfarben und gegebenenfalls vorhandene Fonts nutzen. Elemente aus B oder C nur dort ergänzen, wo sie eine konkrete Frage erklären.
5. Inhalt zuerst fertigstellen: Seitenstruktur und Texte EN/DE; dann Interaktionen; dann zurückhaltende Animation. Keine unüberprüften rechtlichen Aussagen aus dem Prototyp als Produktinhalt übernehmen.
6. Echte Tools und Quellen an die entsprechenden Stellen anschließen. Vorbereitete Demonstrationen nicht als allgemeine Erkennung oder echter Export ausgeben. Quelle und offene Punkte müssen tatsächlich nachprüfbar sein.
7. Kernfunktionen, Datenfluss, Tastatur, reduzierte Bewegung, Mobilansicht, Fehlerzustände und Zielbrowser testen. In einem Änderungsbericht offen nennen, was erfolgreich geprüft wurde und was noch fehlt.
8. Eine konkrete Vorschau mit Screenshots und offenen Entscheidungen vorlegen. Erst nach ausdrücklicher Freigabe live veröffentlichen. Keine Preise, Verträge oder Kontoberechtigungen aus eigener Initiative ändern.

## 14. Quellen und Belegdateien

Primärquelle, Abruf 01.11.2026: https://scutoria.com/de/ sowie alle im aktuellen `crawl-results.json` erfassten Routen. Besonders relevant: https://scutoria.com/de/tools, https://scutoria.com/de/toolkits/ki-richtlinien, https://scutoria.com/de/toolkits/sicherheitsnachweis, https://scutoria.com/de/datenschutz, https://scutoria.com/robots.txt und https://scutoria.com/sitemap.xml.

Bewegung und technische Einordnung, Abruf 01.11.2026: W3C zu Pause/Stop/Hide und Animation from Interactions sowie web.dev zu performanten Animationen, Links in Abschnitt 8. Indexierung: https://developers.google.com/search/docs/crawling-indexing/block-indexing. Mögliche Formularweiterleitungsprobleme: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action. Die MDN-Dokumentation beschreibt Unterschiede der Browser bei Weiterleitungen; daher bleibt die Ursache ein Prüfauftrag.

Alle eigenen Testzahlen stammen aus den beigefügten Protokollen. Entwurfswerte sind als Vorschläge gekennzeichnet. Die in den Produkten enthaltenen Rechtsaussagen werden mit diesem Designbericht nicht fachlich freigegeben.

## 15. Vollständiger technischer Befundanhang

Die folgenden Befunde übernehmen die vollständige Beobachtungs- und Maßnahmenliste des Basis-Audits vom 01.11.2026. Neu bestätigt wurden insbesondere die deutschen Kaufwege, die mobile Navigation, die Indexierungssperren, der öffentliche Entwurfsstand und die Linkstruktur der Online-Handbücher. Die damaligen Generator- und Dateiprüfungen sind als Basisbelege ausgewiesen. Priorität P0 bedeutet hier vor einer Verkaufsfreigabe zu klären; P1 bedeutet hohe Wirkung; P2 ist eine anschließende Verbesserung. Ein bewusst beibehaltener Vorschaubetrieb ist nicht automatisch ein Fehler.

<!-- TECHNISCHER-ANHANG -->

### F01: Kaufweg im Test ohne sichtbare Reaktion (P0)

**Beobachtung:** Bei beiden englischen Produktseiten blieb der Browser nach Klick auf den tatsächlichen Kaufbutton auf der Seite. Kein Stripe-Checkout und keine verständliche Fehlermeldung erschienen. Die Kauf-Endpunkte antworteten beim gesonderten POST-Test mit HTTP 303 zu checkout.stripe.com.

**Beleg, 01.11.2026:** Produktseiten beider Toolkits; eigene Browser- und HTTP-Tests.

**Auswirkung und Einordnung:** Ein echtes Funktionsproblem im geprüften In-App-Browser. Die Ursache ist noch nicht bewiesen. Der ausgelieferte CSP-Header enthält form-action 'self'; das passt als mögliche Ursache zu einer blockierten externen Formularweiterleitung. Browserabhängigkeit gezielt gegenprüfen.

**Änderungsvorschlag:** Kaufnavigation in normalem Chrome und Firefox reproduzieren; CSP-Verstoß und Netzwerkantwort erfassen. Nur das notwendige Checkout-Ziel zulassen oder einen geeigneten servergestützten Checkout-Link verwenden. Keine pauschale Abschaltung der Sicherheitsrichtlinie. Bei Fehlern sichtbare Meldung mit erneutem Versuch.

**Abnahmekriterium:** Beide Produkte in EN und DE erreichen Stripe im Zielbrowser. Preis, Laufzeit und Produkt stimmen überein. Abbruch führt sinnvoll zurück; Fehlersimulation zeigt eine verständliche Meldung.

### F02: Verkaufsversprechen trifft auf öffentliche Entwürfe (P0)

**Beobachtung:** Die Website zeigt Preview/Vorschau und zugleich Available now/Jetzt erhältlich, einen Preis und Kaufbuttons. Produktseiten weisen auf lizenzfreie Generatoren im Vorschaumodus hin. Die Datenschutzerklärung beginnt mit einem Entwurfsvermerk und enthält offene Angaben wie [90 days], [to be checked], Hosting-, Aufbewahrungs- und Vertragsplatzhalter.

**Beleg, 01.11.2026:** Startseite, beide Produktseiten, /privacy und /de/datenschutz.

**Auswirkung und Einordnung:** Der Betriebsstatus ist unklar. Das ist besonders bei einem Angebot für verlässliche Regeln und Nachweise ein starker Vertrauensbruch. Hier wird keine konkrete Rechtsverletzung festgestellt.

**Änderungsvorschlag:** Verbindlich zwischen öffentlicher Testphase und Verkaufsbetrieb entscheiden. Für Testphase Zugang und Beispieldaten klar erklären und Verkaufsaktionen passend begrenzen. Vor Verkaufsfreigabe tatsächliche Datenflüsse und Vertragsgrundlagen klären und Rechtstexte prüfen lassen. Danach konsistente Statusanzeigen.

**Abnahmekriterium:** Ein klarer Status auf Startseite, Produktseiten, Generator und Kasse. Keine offenen redaktionellen Platzhalter in veröffentlichten Pflichtinformationen. Rechts- und Veröffentlichungsfreigabe durch Stefan.

### F03: Mobile Hauptnavigation verschwindet (P1)

**Beobachtung:** Bei 390 Pixel Breite sind Produkte, Tools und Konto im Header ausgeblendet. Ein Menüknopf oder ein gleichwertiger Ersatz fehlt. Die Startseite enthält einzelne Produkt- und Toollinks, aber keinen gleichwertigen mobilen Kontozugang.

**Beleg, 01.11.2026:** Eigene DOM- und Sichtprüfung der deutschen Startseite; ist-mobil.jpg.

**Auswirkung und Einordnung:** Besucher verlieren auf kleinen Bildschirmen Orientierung und wiederkehrende Kunden ihren direkten Einstieg.

**Änderungsvorschlag:** Ein zugängliches mobiles Menü mit Produkte, kostenlose Tools, Handbücher und Konto einführen. Schließen, Escape, Fokusführung und aktiver Zustand berücksichtigen.

**Abnahmekriterium:** Alle Hauptziele sind bei schmalem Bildschirm mit Tastatur und Touch erreichbar. Keine horizontale Seitenverschiebung; der Kontozugang bleibt verfügbar.

### F04: Suchmaschinen bleiben im Vorschaumodus (P1)

**Beobachtung:** Alle 38 erfassten HTML-Seiten enthalten noindex, nofollow. robots.txt enthält User-agent: * und Disallow: /. Eine Sitemap ist trotzdem abrufbar.

**Beleg, 01.11.2026:** Eigener Crawl: crawl-results.json; /robots.txt; /sitemap.xml.

**Auswirkung und Einordnung:** Für eine Vorschau plausibel. Für den Verkaufsstart verhindert dies die reguläre Erschließung der Inhalte. robots.txt allein garantiert außerdem keine vollständige Entfernung einer URL aus Suchergebnissen.

**Änderungsvorschlag:** Indexierungsregeln je Umgebung festlegen. Bei Verkaufsfreigabe öffentliche Marketingseiten gezielt freigeben, private Ergebnisse und Konto ausschließen. Sitemap und Canonicals prüfen; Search Console anschließend mit echter URL-Prüfung nutzen.

**Abnahmekriterium:** Öffentliche Zielseiten sind crawlbar und enthalten kein unbeabsichtigtes noindex. Private Seiten bleiben geschützt. Keine Aussage über Rankings ohne Messung.

### F05: Quellen sind nicht direkt nachprüfbar verlinkt (P1)

**Beobachtung:** In allen vier Online-Handbüchern wurden keine externen HTML-Links zu Originalquellen gefunden. Quellen stehen als Text, teilweise mit Domain und Abrufdatum. Auch im geprüften NIS2-Memo stehen die Quellen überwiegend als Text.

**Beleg, 01.11.2026:** Linkinventar der Online-Handbücher in EN/DE; NIS2-Ergebnis.

**Auswirkung und Einordnung:** Das stärkste Markenversprechen kostet den Leser zusätzliche Sucharbeit. Eine bibliografische Angabe beweist zudem noch nicht, dass die konkrete Aussage korrekt daraus folgt.

**Änderungsvorschlag:** Jede Quelle als anklickbaren Originalbeleg mit genauem Titel, Fundstelle, Dokumentdatum und Abrufdatum aufbereiten. Aussagen mit Quellen-IDs verbinden. Geänderte oder nicht mehr erreichbare Quellen sichtbar behandeln.

**Abnahmekriterium:** Jeder wesentliche Quellenverweis führt zum richtigen Primärdokument und zur nachvollziehbaren Fundstelle. Quellenstichproben werden fachlich gegengeprüft.

### F06: Datenschutzaussage und ausgelieferter Cookie widersprechen sich (P1)

**Beobachtung:** /privacy behauptet, die Website setze nur einen Kontositzungs-Cookie beim Einloggen. Bereits der anonyme HTTP-Abruf der Startseite lieferte Set-Cookie für __cf_bm. Der Cookie-Wert wurde für den Bericht nicht übernommen.

**Beleg, 01.11.2026:** Anonymer HTTP-Abruf; Antwortheader in der Beweissicherung nur mit geschwärztem Wert.

**Auswirkung und Einordnung:** Die Beschreibung bildet mindestens diesen beobachteten technischen Vorgang nicht vollständig ab. Ob und welche Einwilligung erforderlich ist, wurde hier nicht rechtlich bewertet.

**Änderungsvorschlag:** Cookies und Datenflüsse in einem frischen Browser vollständig inventarisieren, Hosting- und Bot-Schutz-Konfiguration zuordnen und die tatsächliche Verarbeitung präzise dokumentieren. Die Formulierung „nur ein Cookie“ erst nach verifizierter Bestandsaufnahme verwenden.

**Abnahmekriterium:** Cookie- und Netzwerk-Inventar passen zur Datenschutzerklärung; jedes beobachtete System ist erklärt. Rechtliche Einordnung separat prüfen lassen.

### F07: Antworten und Betriebsname stehen in Memo-URLs (P1)

**Beobachtung:** Das NIS2-Memo übergibt country, size, sector und supplier in der Ergebnisadresse. Das Formular und die Datenschutzerklärung nennen ausdrücklich auch den optionalen Betriebsnamen als URL-Inhalt.

**Beleg, 01.11.2026:** NIS2-Browserlauf und /privacy.

**Auswirkung und Einordnung:** URL-Inhalte können in Verlauf, kopierten Links und technischen Logs auftauchen. „Nichts gespeichert“ ist deshalb als pauschale Aussage zu ungenau, selbst wenn die Anwendung keinen Datensatz anlegt.

**Änderungsvorschlag:** Betriebsnamen aus URLs entfernen. Für Ergebnisse kurzlebige und angemessen geschützte Referenzen oder eine andere geeignete Zustandsübergabe verwenden. Log-, Cache- und Referrer-Verhalten bewusst prüfen.

**Abnahmekriterium:** Ergebnisadressen enthalten keine freien Betriebs- oder Kontaktnamen. Datenschutztext beschreibt Anwendung und technische Übermittlung getrennt und zutreffend.

### F08: Musterantworten wirken zu leicht wie fertige Kundenangaben (P1)

**Beobachtung:** Beide Generatoren starten unmittelbar mit einem komplett vorbefüllten erfundenen Betrieb. Das erleichtert den Test, macht aber ungeprüft übernommene Antworten wahrscheinlich. Ein deutlich getrenntes „Muster ausprobieren“ und „Eigenen Betrieb erfassen“ fehlt am Einstieg.

**Beleg, 01.11.2026:** Eigene Durchläufe beider Generatoren bis zur Dokumentübersicht.

**Auswirkung und Einordnung:** Gerade Aussagen über vorhandene Schutzmaßnahmen dürfen nicht versehentlich aus dem Beispiel zum eigenen Nachweis werden.

**Änderungsvorschlag:** Zwei Einstiege anbieten: Muster ansehen und eigenen Betrieb erfassen. Im eigenen Lauf Beispielwerte nur als Hilfetext zeigen; bewusste Bestätigung vor Übernahme. Vor Export Übersicht über übernommene, geänderte und offene Antworten.

**Abnahmekriterium:** Ein neuer echter Lauf erzeugt keine behaupteten Unternehmensmerkmale allein aus Musterdefaults. Vor Ausgabe muss der Nutzer die Zusammenfassung prüfen.

### F09: Die Startseite erklärt Umfang vor Kundennutzen (P2)

**Beobachtung:** Lange Absätze zählen Dokumente, Pflichtfragen, Fundstellen und offene Punkte auf. Für einen Besucher ohne IT-Abteilung ist dadurch die Produktwahl unnötig aufwendig. Beide Hero-Buttons nennen Produktnamen, aber nicht die Situation des Besuchers.

**Beleg, 01.11.2026:** Visuelle und redaktionelle Prüfung der Startseiten EN/DE.

**Auswirkung und Einordnung:** Der Besucher muss erst das Angebot lernen, bevor er seinen eigenen Bedarf erkennt.

**Änderungsvorschlag:** Mit zwei Kundensituationen führen: KI im Betrieb regeln oder Sicherheitsfragebogen beantworten. Dokumentdetails dahinter staffeln. Fachbegriffe über konkrete Alltagssituationen erklären.

**Abnahmekriterium:** Im ersten Bildschirm sind Zielgruppe, Ergebnis und nächster Schritt klar. In einem Nutzertest können passende Besucher ihr Produkt ohne Erläuterung zuordnen.

### F10: Zu viele gleichartige Abschnitte und Wiederholungen (P2)

**Beobachtung:** Die Startseite kombiniert Produkttexte, Preisblöcke, Ablauf, Belegsystem, Mustercarousels, Tools, Memos, Produktvorschau und Benachrichtigung. Produktseiten wiederholen Teile davon ausführlich.

**Beleg, 01.11.2026:** Startseite und Produktseiten, Desktop und Mobil.

**Auswirkung und Einordnung:** Alles bekommt ähnliches Gewicht. Dadurch wirkt die Seite lang, aber nicht abgeschlossen und entschieden.

**Änderungsvorschlag:** Startseite auf Auswahl, Ergebnisvorschau, Ablauf und Vertrauensbelege konzentrieren. Ausführliche Dokumentlisten und Quellenmethodik auf klar verlinkte Detailseiten verschieben.

**Abnahmekriterium:** Jeder Abschnitt beantwortet eine eigene Besucherfrage. Die primäre Handlung bleibt eindeutig; keine doppelte Darstellung ohne neue Information.

### F11: Dokumente als Dekoration statt lesbare Produktvorschau (P2)

**Beobachtung:** Der Hero zeigt einen gedrehten, bewegten Dokumentstapel mit kleinen Beschriftungen. Das vermittelt Materialität, ist aber zum Prüfen der Ergebnisse weniger geeignet als eine ruhige und vergrößerbare Vorschau.

**Beleg, 01.11.2026:** Visuelle Prüfung, ist-desktop.jpg; ausgeliefertes motion.js.

**Auswirkung und Einordnung:** Viel Aufwand steckt in Präsentationseffekten, während der konkrete Nutzen erst weiter unten lesbar wird.

**Änderungsvorschlag:** Eine statische Dokumentvorschau mit manuell wählbaren Tabs und echtem Muster-PDF verwenden. Die Bewegung auf kurze, zweckmäßige Übergänge reduzieren. Pause- und Reduced-Motion-Unterstützung beibehalten.

**Abnahmekriterium:** Dokumenttitel, Beispielcharakter und wesentliche Inhalte sind ohne Bewegung lesbar. Alle Dokumente lassen sich bewusst öffnen und vergrößern.

### F12: Generator braucht stärkere Orientierung und Rückkehrhilfe (P2)

**Beobachtung:** Die Fragebögen zeigen Fragenummer, Bereich, Zurück und Weiter sowie Handbuchverweise als bloße Ziffern. Eine sichtbare Kapitelübersicht, ein verständlicher Speicherstatus und eine belastbare geräteübergreifende Rückkehr wurden im anonymen Test nicht nachgewiesen. Neuladen desselben Testlaufs funktionierte.

**Beleg, 01.11.2026:** Beide Generatoren; Kontoeinstieg; eigene Reload-Tests.

**Auswirkung und Einordnung:** Lange Fragebögen benötigen mehr Sicherheit über Aufwand, Fortschritt und die nächsten Schritte.

**Änderungsvorschlag:** Kapitelanzeige mit aktuellem Abschnitt, Speicherhinweis mit tatsächlichem Speicherort, gezieltes Bearbeiten der Antworten und eine abschließende Prüfübersicht ergänzen. Handbuchlinks „Warum wir das fragen“ statt nur „2“ nennen. Dauer erst nach Messung echter Durchläufe nennen.

**Abnahmekriterium:** Besucher sehen, was gespeichert wurde und wie sie zurückkehren. Jede Antwort ist aus der Prüfübersicht erreichbar; Fehler erhalten eine konkrete Erklärung.

### F13: Sprachwechsel verliert das Memo-Ergebnis (P2)

**Beobachtung:** Das erzeugte NIS2-Memo verlinkt mit „Deutsch“ auf das deutsche Eingabeformular ohne die Ergebnisparameter. Gleiches Muster war bei weiteren Memo-Ergebnisseiten sichtbar.

**Beleg, 01.11.2026:** Eigene erzeugte Memo-Seiten.

**Auswirkung und Einordnung:** Der Sprachwechsel fühlt sich wie ein Neustart an.

**Änderungsvorschlag:** Ergebniszustand beim Sprachwechsel sicher erhalten oder deutlich ankündigen, falls ein Neustart notwendig ist.

**Abnahmekriterium:** Die gleichen Antworten und das gleiche Ergebnis bleiben beim Wechsel EN/DE erhalten; die gewählte Sprache bleibt konsistent.

### F14: Fehlerseite mit falschem Inhalt (P2)

**Beobachtung:** Der bewusst unbekannte Pfad /audit-missing-page-20261101 liefert zwar HTTP 404, sein HTML enthält aber die Startseite mit ihrem Titel und Inhalt.

**Beleg, 01.11.2026:** Eigener technischer Negativtest.

**Auswirkung und Einordnung:** Ein Nutzer erfährt nicht klar, dass sein Link ungültig ist.

**Änderungsvorschlag:** Eine echte Fehlerseite mit kurzer Erklärung, Rückweg und Produkt- oder Toolauswahl gestalten.

**Abnahmekriterium:** Status 404 und sichtbare Meldung „Seite nicht gefunden“ stimmen überein. Keine Startseitenkopie als Fehlerinhalt.

### F15: Kleine redaktionelle Widersprüche (P2)

**Beobachtung:** Die KI-Produktseite verspricht „Access starts immediately“ und später „Answers today … documents tomorrow“, obwohl der Test unmittelbar zur Ausgabe führte. /about spricht von drei Toolkits, während die Startseite zwei verkaufbare und eines in Vorbereitung zeigt. Die Zielgruppengröße schwankt zwischen etwa fünfzig und einigen Hundert Mitarbeitern.

**Beleg, 01.11.2026:** /toolkits/ai-policy, /about und Startseite.

**Auswirkung und Einordnung:** Solche Details summieren sich zum Gefühl einer zusammengebauten, nicht abschließend redigierten Seite.

**Änderungsvorschlag:** Leistungsumfang, Status, Zielgruppe und Ablauf zentral definieren und in beiden Sprachen konsistent ausspielen. Verfügbare und geplante Produkte sprachlich trennen.

**Abnahmekriterium:** Kein Widerspruch zu Lieferzeit, Zielgruppe oder Verfügbarkeit zwischen Startseite, Detailseite und Konto.

### F16: Barrierefreiheit noch nicht abschließend nachgewiesen (P2)

**Beobachtung:** Alle erfassten statischen HTML-Seiten haben eine H1. Memo-Ergebnisse zeigen allerdings eine zweite H1 im Dokument. Der Header beginnt mit normalen Navigationslinks; ein Sprunglink zum Hauptinhalt war in den geprüften Ansichten nicht sichtbar. Kontrast, Fokus und Screenreader-Verhalten wurden nicht vollständig vermessen.

**Beleg, 01.11.2026:** Crawl sowie DOM-Snapshots der Memos.

**Auswirkung und Einordnung:** Die technische Grundlage ist brauchbar, eine vollständige zugängliche Bedienung ist damit noch nicht belegt.

**Änderungsvorschlag:** Überschriftenstruktur, Sprunglink, Fokus nach Navigation, Statusmeldungen, Tastaturbedienung und Kontraste gezielt prüfen. Slidersteuerung für Hilfstechnologien verständlich benennen.

**Abnahmekriterium:** Alle Kernabläufe sind allein mit Tastatur ausführbar; Fokus bleibt sichtbar. Die Prüfung gegen definierte Kriterien ist dokumentiert, nicht nur ein automatischer Score.

### F17: Öffentlich sichtbare Baukastenkennzeichnung (P2)

**Beobachtung:** Die Website enthält ein „Edit with Lovable“-Badge mit Projektlink. Das ist in den Accessibility-Snapshots sichtbar.

**Beleg, 01.11.2026:** Startseite und alle geprüften Seitentypen.

**Auswirkung und Einordnung:** Für eine seriöse, eigenständige Marke wirkt das wie eine nicht abgeschlossene Veröffentlichung.

**Änderungsvorschlag:** Badge im vorgesehenen Veröffentlichungsprozess entfernen, soweit der Plattformtarif das erlaubt. Vorschaubanner und interne Arbeitshinweise nur in der Testumgebung anzeigen.

**Abnahmekriterium:** Öffentliche Besucher sehen keine Editoraktion oder interne Projektkennzeichnung.

### F18: Dateiformate funktionieren, Inhaltsqualität ist eine eigene Prüfaufgabe (P2)

**Beobachtung:** Beide Musterläufe erzeugen Dateilinks. 53 Abrufe wurden strukturell geprüft: 35 PDFs waren parsebar, 18 ZIP-/Office-Dateien hatten lesbare Archive. KI-ZIP enthält 15 Einträge, Sicherheits-ZIP 16. Das beweist weder korrekte Rechtsaussagen noch vollständiges Layout in Word und Excel.

**Beleg, 01.11.2026:** document-checks.json; beide Generatorläufe.

**Auswirkung und Einordnung:** Ein erfolgreicher Download ist ein guter Befund, aber keine inhaltliche Produktabnahme.

**Änderungsvorschlag:** Ein Referenzszenario je Zielgruppe fachlich prüfen, abweichende Antworten gezielt testen und alle Dokumente in den Zielanwendungen visuell abnehmen. Versionen und Quellenänderungen nachvollziehbar dokumentieren.

**Abnahmekriterium:** Keine widersprüchlichen Angaben zwischen Antworten und Ausgabe; bearbeitbare Dateien öffnen sauber in Word und Excel. Fachliche und visuelle Abnahme getrennt protokollieren.

## 16. Prüfung der neuen Prototypen

Die Datei `prototyp-tests.json` dokumentiert 18 erfolgreiche Interaktionsprüfungen und 12 geprüfte Kombinationen aus Variante und Bildschirmbreite. Die Breiten waren 360, 390, 768 und 1440 Pixel. Keine dieser Layoutprüfungen zeigte horizontales Überlaufen. Geprüft wurden unter anderem Situationswahl, Dokumentansichten, Quellen- und Produktdialoge, Sprachwechsel, Mobilmenü, Platzhalter-Demo, Sequenzstart, Endzustand sowie der manuelle Bewegungsschalter. Escape schloss den geprüften Produktdialog und gab den Fokus an den Auslöser zurück.

Die Betriebssystempräferenz für reduzierte Bewegung wurde nicht emuliert. Ihre CSS-Regel ist im Quelltext vorhanden; der manuelle Schalter wurde bedient. Das ist keine vollständige Barrierefreiheits- oder Browserkompatibilitätsabnahme. Die Umsetzung muss nach Integration in die wirkliche Website erneut geprüft werden. Quelle: eigene Prototypprüfung am 01.11.2026.
