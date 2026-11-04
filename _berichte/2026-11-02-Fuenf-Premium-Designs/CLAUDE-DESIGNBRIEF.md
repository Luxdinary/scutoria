# Scutoria – fünf Premium-Websitevarianten

Stand: 2. November 2026. Lokale Designstudie für Stefan und die Übergabe an Claude. Ausgangspunkt: aktuelle Website https://scutoria.com/de/ und ihre vorhandene Produkt-, Tool- und Nachweisstruktur. Keine Veröffentlichung erfolgt.

## Ergebnis und Verwendung

`index.html` öffnet die Vergleichsgalerie. `variante-1.html` bis `variante-5.html` sind eigenständige responsive Prototypen. Jede Richtung enthält Startseite, Bibliothek, Produktdetail, Tools und Videostudio. Navigation erfolgt über `?page=home|library|product|tools|media&lang=de|en`. HTML-Dateien funktionieren direkt lokal; ein Server ist optional. Alle Assets liegen bei. EN/DE sind in einem gemeinsamen Datensatz angelegt.

Für Claude zuerst die große `vorlage-0N.jpg` der gewünschten Richtung, dann dieses Briefing und die entsprechende HTML-Datei mit `ui.css`, `ui.js`, `config.js` und `assets` übergeben. Die einzelnen Screenshots liegen unter `screenshots`. `vergleich.jpg` zeigt alle fünf Startseiten. Die Bildvorlagen zeigen echte gerenderte Websiteprototypen; die zusätzlichen PNG/WebP-Dateien sind die darin verwendeten Symbolbilder.

**Empfehlung:** Sapphire Vault als Markenbasis, dazu das klare Katalogprinzip des Knowledge Pavilion und das Videostudio des Signal Studio. Eine Grundsprache auswählen; nicht fünf konkurrierende Hero-Stile mischen. Falls die Marke bewusst heller werden soll, Knowledge Pavilion als vollständige Alternative wählen.

## Gestalterische Diagnose

Die aktuelle Website hat bereits einen konkreten Nutzen, dokumentbasierte Szenarien, eine Tooldemo, Quellen und nachvollziehbare Arbeitsunterlagen. Das zentrale Designproblem ist die geringe visuelle Differenzierung zwischen Erklärung, Produkt, Tool und Lerninhalt. Wiederkehrende Textflächen und ähnliche Sektionen lassen hochwertige digitale Produkte weniger greifbar erscheinen. Das ist eine qualitative Designbeurteilung, kein gemessener Nachweis über Absprünge oder Verweildauer.

Ein großer Katalog braucht mehr als zusätzliche Karten: eine erkennbare Coverfamilie, Themenwege, sichtbare Formate, sorgfältig inszenierte Produktmuster und Verbindungen zwischen Anleitung, Tool und Video. Animation soll Zusammenhänge erklären und Reaktionen fühlbar machen. Längere Verweildauer allein ist kein Qualitätsziel; Besucher sollen schneller verstehen und bei weiterführenden Inhalten freiwillig bleiben.

Die fünf Varianten verwenden deshalb eigenständige Bildwelten, räumliche Buchobjekte, wechselnde Seitentypen, selektive Bewegung und einen sichtbaren Lernbereich. Die vorhandene Scutoria-Positionierung „Belegt. Datiert. Vorzeigbar.“ bleibt erkennbar. Kein Personenmarketing nötig.

## Variante 1 – Sapphire Vault

**Wirkung:** souverän, präzise, ruhig und hochwertig. Digitale Unterlagen bekommen durch Glas, Licht, Buchrücken und Dokumentflächen eine greifbare Form.

**Designsprache:** Navy `#080F20`, Flächen `#111D34` und `#172A49`, Schrift `#EDF3FF`, Nebenfarbe `#A8B9D2`, Akzent `#4F8CFF`. Silberne Kanten und zurückhaltendes Saphirglas. Keine flächige Neonästhetik.

**Layout:** maximal etwa 1240 px Inhaltsbreite. Zweigeteilter Hero mit kleinerer Textspalte und dominanter Produktbühne. Danach drei Themenwege, Buchsammlung, visuelles Lernmodul und Quellenmethodik. Bibliothek mit linker Themenleiste und drei Karten pro Reihe. Produktseite mit großem Objekt und Inhaltsreitern. Toolbereich mit Auswahlliste links und Arbeitsfläche rechts. Studio mit einem größeren Video und zwei vertikalen Formaten.

**Bewegung:** sanfter Einstieg, geringe Neigung der Bildfläche auf präzisen Zeigegeräten, Buch hebt sich bei Hover/Fokus, Themenwechsel liefert Textfeedback. In der Produktion zusätzlich eine einmalige, kurze Öffnungssequenz der Produktbühne denkbar; dafür wären getrennte Bildebenen oder ein echtes 3D-Modell erforderlich. Das mitgelieferte Bild ist kein bewegliches 3D-Modell.

**Stärken/Grenzen:** stärkste Kontinuität zur dunklen Marke und hohe Produktwertigkeit. Lange Lesetexte sollten einen hellen Lesemodus oder ausreichend ruhige Leseflächen erhalten. Glasmotiv als Metapher für geordnetes Wissen behandeln, nicht als Aussage über Datenspeicherung oder technische Sicherheit.

Referenz: `vorlage-01.jpg`, `variante-1.html`, `assets/01-sapphire-vault.webp`.

## Variante 2 – Knowledge Pavilion

**Wirkung:** heller Fachverlag trifft Wissensmuseum. Fachlichkeit wird zugänglich, ohne den Premiumcharakter zu verlieren.

**Designsprache:** kühles Porzellan `#EDF3F9`, Weiß `#FFFFFF`, Navy `#102D4D`, Cobalt `#245CE5`, Linien in Blaugrau `#CFDAE7`. Große, ruhige Typografie; rechteckige redaktionelle Flächen und großzügige Abstände.

**Layout:** Headline zuerst; breite Architekturvisualisierung darunter rechts versetzt. Mehr sichtbare Fläche statt vieler umrandeter Kästchen. Bibliothek mit horizontalen Themenfiltern und vier Coverkarten. Produktdetail als helle Doppelseite. Toolbereich bleibt eine klar abgegrenzte Arbeitsfläche. Videoformate erscheinen wie Kapitel eines Lernmagazins.

**Bewegung:** kurze Fade/Translate-Einstiege, minimale Objektreaktion, klare Farbänderung bei Filterwahl. Für Produktion optional dezente Kapitelenthüllung beim Scrollen, ohne Text während des Lesens zu bewegen.

**Stärken/Grenzen:** beste Lesbarkeit und größte Offenheit für einen umfangreichen Wissenskatalog. Das Architekturmotiv darf nicht die ganze Seite dominieren; echte Muster und Tooloberflächen sollen weiter unten übernehmen. Weniger technisch-dramatisch als Richtung 1.

Referenz: `vorlage-02.jpg`, `variante-2.html`, `assets/02-knowledge-pavilion.webp`.

## Variante 3 – Business Atlas

**Wirkung:** Scutoria als Orientierungssystem für den betrieblichen Alltag. Man entdeckt Beziehungen zwischen Aufgaben, Menschen, Daten und Verantwortung.

**Designsprache:** kühles Arbeitsflächen-Grau `#E2EBF4`, Weiß `#FFFFFF`, Navy `#142C4D`, Blau `#326AE3`, seitliche dunkle Navigationsfläche. Kleine nummerierte Metadaten, klar strukturierte Funktionsflächen, isometrische Betriebswelt.

**Layout:** feste linke Navigation am Desktop, Hauptinhalt rechts. Hero mit anklickbaren Themenpunkten auf einer Betriebsvisualisierung und zugehöriger Erklärung. Themen führen zu passenden Inhalten. Bibliothek und Tools wirken wie übersichtliche Arbeitsräume; mobile Navigation wechselt zu einem kompakten Menü. Kein Miniatur-Desktop auf dem Smartphone.

**Bewegung:** Hotspot-Auswahl wechselt Beschreibung und aktiven Zustand. In einer späteren Produktion könnten Linien einmalig die gewählte Verbindung markieren; keine endlos blinkenden Netze. Fokus muss dieselben Informationen wie Hover liefern.

**Stärken/Grenzen:** höchste inhaltliche Entdeckbarkeit und gutes Potenzial für interaktive Lernwege. Größerer Aufwand für semantisch korrekte Verknüpfungen. Keine erfundenen Echtzeitdaten, Sicherheits-Scores oder Betriebszustände darstellen. Das Bild illustriert Zusammenhänge, es überwacht kein Unternehmen.

Referenz: `vorlage-03.jpg`, `variante-3.html`, `assets/03-business-atlas.webp`.

## Variante 4 – Signal Studio

**Wirkung:** filmisches digitales Lernstudio. Inhalte werden nicht nur verkauft, sondern angesehen, ausprobiert und miteinander verbunden.

**Designsprache:** sehr dunkles Navy `#080B17`, Cobalt `#346FEF`, eisblaue Schrift `#EEF4FF`, zurückhaltende violette Lichtkante nur in der Bildwelt. Große Bildbühne, markante Schnitte und horizontale Sammlungen.

**Layout:** bildfüllender Hero mit kontrollierter Textüberlagerung. Die Buchsammlung wird horizontal erkundet. Studio mit einem großen YouTube-Format und vertikalen Reels. Produkt- und Toolseiten behalten klare Informationshierarchie. Mobil steht Text außerhalb der dichten Bildzone; vertikale Formate nutzen die verfügbare Breite.

**Bewegung:** im Prototyp auf Wunsch startbare, endliche Text-Storyboards mit Pause/Weiter. In Produktion echte kurze stumme Vorschau nur nach bewusster Aktivierung oder sparsam im sichtbaren Bereich; Untertitel und feste Posterbilder. Keine Sound-Autoplays. Verbindung „Video erklärt → Tool ausprobieren → Anleitung vertiefen“ sichtbar machen.

**Stärken/Grenzen:** stärkste Erlebniswirkung für den geplanten Videoausbau. Gute Inhalte und Posterbilder sind entscheidend; ohne echte Medien kann eine große Videobühne leer wirken. Die mitgelieferten Storyboards sind Layoutdemos und keine fertigen Erklärvideos.

Referenz: `vorlage-04.jpg`, `variante-4.html`, `assets/04-signal-studio.webp`.

## Variante 5 – Blue Edition

**Wirkung:** markante digitale Editionsmarke. Die Produkte erscheinen als sorgfältig gestaltete Werkzeuge und Publikationen.

**Designsprache:** Ultramarin `#194BE0`, Weiß `#FFFFFF`, kühles Hellblau `#EDF3FA`, Navy `#163559`, silberne Produktdetails. Große Typografie, wenig Zierlinien, kantige Buchflächen, konsequente Coverfamilie.

**Layout:** große blaue Hero-Fläche mit kurzer Botschaft und skulpturalem Buch. Darunter helle redaktionelle Abschnitte. Vier Spalten im Katalog, eine klare horizontale Filterleiste, plakative Produktbühne. Werkzeuge bekommen eine blaue Kopfzeile und helle Arbeitsflächen. Medien erscheinen als eigene Editionen.

**Bewegung:** leichte Coverrotation bei Hover, klare Taste- und Ergebnisreaktion, ruhige Einstiege. Für Produktion kann ein einzelnes Buch beim Einstieg wenige Grad aufklappen; dafür eigenständige Schichten/3D-Asset erstellen. Kein endloses Blättern.

**Stärken/Grenzen:** höchste Wiedererkennbarkeit bei verhältnismäßig einfacher Umsetzung. Die große blaue Fläche braucht sorgfältige Dosierung und darf längere Lesebereiche nicht übernehmen. Digitalen Lieferumfang ausdrücklich nennen, damit die Buchdarstellungen keinen physischen Versand suggerieren.

Referenz: `vorlage-05.jpg`, `variante-5.html`, `assets/05-blue-edition.webp`.

## Gemeinsames Seitensystem für die Umsetzung

1. **Startseite:** kurze Nutzenbotschaft, dominante passende Visualisierung, eindeutiger Einstieg in Wissen oder Tool, drei Themenwege, kuratierte aktuelle Angebote, Lerninhalte, Quellenprinzip. Keine komplette Produktliste im Hero.
2. **Bibliothek:** Suche, Thema, Format, tatsächlicher Verfügbarkeitsstatus, konsistente Cover, sprechende Titel. Bei 20 Titeln keine 20 ungewichteten Textkarten. Geplante Inhalte getrennt von kaufbaren Angeboten führen. Die Demo-Themenzuordnung ist exemplarisch und muss redaktionell geprüft werden.
3. **Produktdetail:** reales Ergebnis und Anwendungsfall, echtes Dokumentmuster, Lieferumfang und Dateiformate, Inhaltsstruktur, Aktualisierungsstand, Grenzen, verknüpftes Tool/Video, bestehender Kaufweg. Im Prototyp sind Preis und Checkout bewusst nicht nachgebaut; vorhandene Produktlogik in der Umsetzung erhalten.
4. **Toolseite:** klare Aufgabe, verständliche Eingabe, sichtbare Ausgabe, Hilfetext, realer Verarbeitungsort/Datenschutzhinweis, passende Anleitung und Video. Die lokale Demo ersetzt ausschließlich E-Mail-Adressen und ist kein vollwertiger Sicherheitscheck. Andere Toolauswahlen sind Layoutvorschauen. Nicht als produktive Prüfung übernehmen.
5. **Studio:** YouTube und Reels anhand von Aufgabe, Thema und Länge auffindbar machen. Poster statt sofort geladener Player. Detailansicht mit Transkript, Kernaussagen und passenden Arbeitsmitteln. Neue Videoformate hier sind Konzepte.
6. **Weitere vorhandene Seiten:** Handbuch, Quellen, Methodik, Über Scutoria und rechtliche Seiten mit dem gewählten Header, Typografie- und Abstandssystem versehen. Lange Dokumente brauchen Inhaltsverzeichnis, Anker, angenehme Zeilenlänge und sichtbaren Stand. Diese fünf zusätzlichen Seitentypen wurden nicht als eigene Prototypen ausgearbeitet.

## Typografie, Layout und Bewegung – konkrete Vorgaben an Claude

- Im Prototyp lokale Bahnschrift/Segoe UI und Consolas. Für die bestehende Website bevorzugt die vorhandenen Manrope/IBM Plex Mono lokal weiterverwenden und die Rollen übertragen: Headlines kräftig, Lesetext ruhig, Metadaten monospaced. Keine neue externe Font-Abhängigkeit erforderlich.
- Desktop-Inhalt ungefähr 1240 px, großzügige 60–80 px Abschnittsabstände, mobil 20–24 px Seitenabstand und 40–48 px Abschnittsabstand. Fließtext 16–18 px, Zeilenhöhe 1,6–1,7; Lesetext etwa 65–75 Zeichen breit.
- Produktbilder und echte Arbeitsmuster übernehmen mehr Erklärarbeit als zusätzliche Textabsätze. Keine generischen Schloss-, Roboter- und Handschlagbilder als Hauptelemente.
- Animationstoken für die spätere Umsetzung: Feedback 160–220 ms, Karten 240–360 ms, Eintritte 500–700 ms, nur einmal. Maximal 12–18 px Translation. Keine Scrollsperren oder erzwungenen Filmsequenzen.
- Nur `transform` und `opacity` animieren, wenn möglich. Große Blur-Effekte nicht flächig bewegen. Offscreen-Animationen pausieren. Kein WebGL nur für Dekoration erforderlich.
- `prefers-reduced-motion` respektieren und Bewegungsschalter anbieten. Inhalt bleibt sofort zugänglich. Alle wesentlichen Funktionen per Tastatur; Fokus sichtbar, Dialog mit Escape und Fokus-Rückgabe, ausreichend große Bedienelemente.
- Responsive Bilder mit passenden Ausschnitten und festen Abmessungen verwenden. WebP liegt optimiert vor, PNG als Master. LCP-Herobild priorisieren, weitere Bilder lazy laden. Für echte Videos Poster und explizite Player-Aktivierung.
- Mobile Karten und Tooloberflächen neu anordnen, nicht nur skalieren. Horizontales Scrollen nur als bewusst erkennbare Sammlung, nicht für ganze Seiten.

## Arbeitsauftrag für Claude (direkt verwendbar)

„Überarbeite das visuelle System meiner bestehenden Scutoria-Website anhand der ausgewählten Variante und der beigefügten Bildvorlage. Prüfe zuerst die vorhandene Codebasis, Komponenten und Produktdaten. Erhalte bestehende Routen, Sprachen, funktionsfähige Tools, Kaufabwicklung und Quellenstruktur. Übertrage Layout, Farbrollen, Typografie, Coverfamilie, Bildsprache und dosierte Bewegung konsistent auf Startseite, Bibliothek, Produktdetail, Toolbereich und Studio. Verwende reale bestehende Produktdaten. Die zusätzlichen Katalogtitel, Videoformate und Toolideen des Prototyps sind Gestaltungskonzepte und dürfen nicht als bereits verfügbar veröffentlicht werden. Baue zuerst eine zusammenhängende Seitenfamilie zum lokalen Review. Ersetze keine echten Toolfunktionen durch die vereinfachte Demo. Prüfe anschließend Mobilansichten, Tastaturbedienung, Bewegung aus, EN/DE, Ladeverhalten, bestehende Routen und Kaufwege. Veröffentliche erst nach meiner Freigabe.“

## Prüfung und Grenzen

25 deutsche Desktopansichten bei 1440 × 1000 px erfasst; alle hatten geladene Bilder und keinen horizontalen Seitenüberlauf. Fünf mobile Startseiten bei 390 × 844 px ebenfalls ohne horizontalen Überlauf. Suchtest „Richtlinien“ ergab einen passenden Eintrag; lokale E-Mail-Demo lieferte den erwarteten Platzhalter; Sprachwechsel und mobile Menüöffnung wurden bedient. Zweites Toolkit führt zur passenden Produktdetailüberschrift. Syntaxprüfung `node --check ui.js` erfolgreich. Weitere Interaktionsprüfungen stehen in `INTERAKTIONSTEST.md`.

Das ist eine Designstudie, kein vollständiger Accessibility-, Sicherheits-, Rechts- oder Produktionsaudit. Die 25 Screenshots sind repräsentative Ansichten, keine lückenlose Erfassung aller Scrollpositionen. Zusätzliche Titel und vier zusätzliche Tools demonstrieren die geplante Kataloggröße. Bilder wurden mit dem integrierten Bildgenerator erstellt; die vollständigen Prompts stehen in `BILD-PROMPTS.json`. Illustrationen sind symbolisch und belegen keine technischen Sicherheitsmerkmale. Keine fiktiven Kundenstimmen, Zertifikate oder Erfolgszahlen hinzugefügt.

Die nach Projektregeln vorgesehene Google-Drive-Gedächtnisquelle war mangels verbundenem Drive-Konnektor in dieser Sitzung nicht zugänglich. Die lokale Scutoria-AGENTS.md wurde gelesen. Es wurden keine lokalen Gedächtnisdateien angelegt.
