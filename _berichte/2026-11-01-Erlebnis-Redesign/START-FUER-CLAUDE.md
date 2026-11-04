# Scutoria verbessern: Auftrag an Claude

Dieses Paket ist ein vollständiges Analyse- und Konzeptbriefing für die bestehende Website https://scutoria.com/de/ und https://scutoria.com/. Prüfstand: 01.11.2026. Die aktuell bestätigte Seite beginnt mit „Belegt. Datiert. Vorzeigbar.“ und zeigt einen blauen Toolkit-Buchkörper neben einem hellen Dokumentstapel auf Navy.

## Ziel

Verbessere Scutoria zu einem verständlichen, wertigen und gern erkundeten Produkterlebnis. Besucher sollen die Bedeutung von KI-Regeln, Sicherheitsnachweisen und den kostenlosen Tools anhand konkreter Arbeitssituationen verstehen. Nützliche Interaktion ist das Ziel. Lange Besuchszeit allein ist kein Erfolgsnachweis.

Die bestehende Navy-/Blau-Farbwelt ist ausdrücklich gewünscht. Erhalte ihre Wiedererkennung. Die Website hat bereits Animationen. Entwickle daraus eine bessere Erklärung und mehr eigene Handlungsmöglichkeiten; ergänze nicht einfach mehr Effekte.

## Zuerst lesen und ansehen

1. `ANALYSE-UND-REDESIGN.md`: vollständige Analyse, neue Dramaturgie, Seitenkonzepte, Texte EN/DE, Animationen, Kriterien, Grenzen und technischer Befundanhang.
2. `erlebnis-a.html`: empfohlene Hauptrichtung „Evidence in motion“. Die Dateien starten Englisch; der Sprachschalter öffnet Deutsch. Im Browser auch `?lang=de` möglich.
3. `erlebnis-b.html`: erkundbare Zusammenhänge zwischen Menschen, Tools, Zugängen, Regeln und Nachweisen.
4. `erlebnis-c.html`: interaktiver Praxisguide, besonders als Leserichtung für Handbücher geeignet.
5. `erneute-browserpruefung.json`, `crawl-results.json` und `belege-basis`: aktuelle Bestands- und frühere Funktionsbelege desselben Tages.

Die HTML-Prototypen sind eigenständige Erlebnisdemos. Nicht ungeprüft als Shopcode übernehmen. Insbesondere die Platzhalter-Demo enthält vorbereitete fiktive Texte und ist keine allgemeine Erkennungsfunktion. Die Dokumentauszüge sind illustrativ. Es gibt keine Zahlung im Prototyp.

## Empfohlene Umsetzung

Nutze A als Basis. Im Hero wählt der Besucher eine Alltagssituation. Aus einer Frage wird eine betriebliche Entscheidung und daraus ein verständliches Musterdokument. Jeder Schritt ist direkt erreichbar; ein nutzergestarteter Ablauf erklärt den Zusammenhang zusätzlich.

Die neue Startseite soll Situation, Relevanz, kleine eigene Toolhandlung, passende Produkte, prüfbare Quellenmethode und Anwendung im Betrieb verbinden. Kostenlose Tools stärker sichtbar machen. Zwei Browserprüfer und vier Memo-Generatoren hinsichtlich Ausgabe und Datenfluss sauber unterscheiden.

Optional den Zusammenhangsplan aus B als Erklärmodul verwenden. Den Praxisguide aus C für vertiefende Inhalte übernehmen. Keine drei konkurrierenden Hero-Inszenierungen übereinanderstapeln.

## Technische Arbeit

Prüfe zunächst das tatsächliche Repository, Framework, Routing, Build und die vorhandenen Komponenten. Bestehende Tools, Generatoren, Dateiausgaben und Sprachrouten erhalten. Keine Infrastruktur erfinden oder ohne Anlass austauschen.

Wichtige Befunde aus dem Audit zuerst reproduzieren:

- Kaufbuttons beider Produkte führen im verwendeten In-App-Browser nicht sichtbar zu Stripe. Die englischen Kauf-Endpunkte lieferten separat HTTP-Weiterleitungen. CSP mit `form-action 'self'` ist eine plausible, noch unbewiesene Ursache. Gewöhnliche Zielbrowser gegenprüfen, keine pauschale CSP-Abschaltung.
- Mobil verschwinden die Hauptlinks ohne Ersatzmenü.
- Öffentliche Vorschau, Kaufversprechen, frei laufende Generatoren und Rechtstextentwürfe sind nicht konsistent erklärt.
- Die Website sperrt Indexierung und Crawling. Das kann für die Vorschau beabsichtigt sein. Erst bei bewusster Veröffentlichung gezielt ändern.
- Originalquellen in den Online-Handbüchern anklickbar und an der relevanten Aussage nachprüfbar machen.
- Betriebsnamen und Antworten nicht unnötig in Ergebnis-URLs oder Messereignisse übernehmen.

## Animation und Bedienung

Nutze Animation zur Erklärung: Frage > Entscheidung > Nachweis, sichtbare Auswahl, verständlicher Vorher-/Nachher-Unterschied, Quellenpanel. Keine dekorative Dauerbewegung, kein Scrollzwang und keine künstlichen Ladezeiten. `prefers-reduced-motion`, zusätzlicher Bewegungsschalter und vollständige statische Zustände sind Teil des Konzepts.

Alle Hauptfunktionen müssen per Tastatur und Touch erreichbar sein. Dialoge brauchen Titel, Escape, Fokusbindung und Rückkehr zum Auslöser. Keine wesentlichen Inhalte ausschließlich über Hover. Produktionsinhalt muss auch bei ausfallendem Animations-JavaScript lesbar bleiben.

Die Analyse enthält konkrete vorgeschlagene Bewegungswerte und Abnahmekriterien. Diese sind Entwurfswerte, keine gemessenen Qualitätsdaten. Ladeleistung und Bedienung nach Umsetzung messen.

## Inhalte und Freigaben

Produkte und Website Englisch zuerst, Deutsch im selben Lauf. Berichte an Stefan Deutsch. Keine erfundenen Statistiken, Kundenstimmen, Sicherheitsgarantien, Zertifizierungen oder künstliche Knappheit. Keine persönliche Gründerinszenierung. Rechtliche Aussagen und Fristen an Originalquellen prüfen; offene Punkte sichtbar lassen.

Preise, Abos, Ausgaben, Rechtstexte und Live-Veröffentlichung nicht eigenmächtig ändern. Keine Stripe-Einstellungen, Render-Umgebungsvariablen oder Berechtigungen ohne Stefans ausdrückliche Freigabe. Implementierung lokal oder in der vorgesehenen Vorschau vorbereiten und konkret zeigen, bevor eine Veröffentlichung zur Entscheidung steht.

## Erwartetes Ergebnis

Eine funktionierende Vorschau mit neuer Startseite und konsistenten Anschlussseiten, nutzbaren Interaktionen und ruhigen Animationen. Liefere Screenshots für Desktop und Mobil, eine Liste der Änderungen, tatsächlich ausgeführte Prüfungen und verbleibende Grenzen. Trenne bestätigte Fehler, Ursachenhypothesen und Designentscheidungen. Eine Live-Veröffentlichung ist durch dieses Briefing nicht beauftragt.
