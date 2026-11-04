# Scutoria: Business Atlas × Signal Studio
## Präziser Umsetzungsbrief für Claude

Stand: 3. November 2026. Designstudie, keine Liveänderung. Für Stefan und die Umsetzung durch Claude.

## 1. Entscheidung und Zielbild

Stefan bevorzugt eine Mischung der bisherigen Richtungen Business Atlas und Signal Studio. Der Claude-Entwurf aus `Studiovarainte.pdf` ist für ihn eine Verbesserung, erreicht aber noch nicht den gewünschten Premiumcharakter. Gewünscht ist eine Website, auf der man gern Inhalte erkundet und den praktischen Wert von KI-Wissen, Sicherheit, Anleitungen und Tools versteht.

Drei neue Alternativen stehen zur Auswahl:

| Variante | Schwerpunkt | Charakter | Empfehlung |
|---|---|---|---|
| 1 Atlas Studio | ungefähr 60 % Atlas, 40 % Studio | Dunkle, erkundbare Betriebswelt mit integriertem Lernstudio | Beste Balance für die gewünschte Mischung |
| 2 Signal Journey | ungefähr 35 % Atlas, 65 % Studio | Filmische Bühne mit Themenkapiteln und verbundenem Lernweg | Wenn Erlebnis und Medien im Vordergrund stehen |
| 3 Open Campus | ungefähr 55 % Atlas, 45 % Studio | Heller Wissenscampus mit dunklen Medieninseln | Wenn Lesen und Offenheit besonders wichtig sind |

Diese Verhältnisse sind gestalterische Orientierung, keine Messwerte. Eine Variante als Grundsystem wählen. Nicht alle drei Hero-Aufbauten auf einer Seite kombinieren.

## 2. Was aus Claudes PDF erhalten bleiben soll

Die PDF wurde vollständig visuell auf sieben Seiten geprüft. Sie enthält keine extrahierbare Textebene. Sichtbar sind unter anderem die Scutoria-Navigation, die Botschaft „Jemand fragt. Was zeigen Sie?“, auswählbare Betriebssituationen, eine gezeigte KI-Nutzungsrichtlinie sowie ein geplanter Studio- und Shortsbereich. Die ersten Seiten sind weitgehend leer; andere Flächen sind sehr blass. Das kann durch Druckhintergründe, einen eingefrorenen Animationszustand oder den PDF-Export entstanden sein. Daraus folgt kein sicherer Befund über die tatsächlichen Bildschirmfarben oder die Laufzeitfunktion der Website.

Erhalten: konkrete Alltagssituationen; der Zusammenhang Frage, Entscheidung, Arbeitsunterlage; sichtbare Quellenmethodik; ehrliche Verfügbarkeitsangaben; konsistente EN/DE-Struktur; funktionsfähige vorhandene Tools und Produktwege.

Gestalterisch verändern: große Textkarten im Studio durch echte Bildkompositionen und klare Medienformate ersetzen. Nicht veröffentlichte Medien nicht mit riesigen leeren Platzhaltern bewerben. Die geplante Produktionsmenge muss kein Hauptverkaufsargument für Besucher sein. Stattdessen zeigen, welches Thema ein Format verständlich macht und welches Tool oder Dokument dazugehört. Die PDF erlaubt keine Bewertung der tatsächlichen Animationen; die folgenden Motion-Vorgaben sind neue Gestaltungsvorschläge.

## 3. Dateien und verbindliche Referenzreihenfolge

1. `vorlage-01.jpg`, `vorlage-02.jpg` oder `vorlage-03.jpg`: komplette Bildvorlage der gewählten Seitenfamilie.
2. `screenshots/0N-home-full.jpg`: vollständige Startseite mit Reihenfolge, Abständen und Hintergrundwechseln.
3. `variante-N.html?lang=de` und die fünf Seitentypen: interaktive Referenz.
4. `design.css`: tatsächliche Farb-, Layout-, Responsive- und Motion-Werte.
5. `app.js`: Beispielkomponenten, Auswahlzustände, Dialoge und Storyboard.
6. `assets/hybrid-N.webp`: fertig nutzbares optimiertes Hero-Bild; PNG als Originalmaster.
7. Dieses Briefing: Begründung und Übertragung in die vorhandene Produktionscodebasis.

Die Symbolbilder sind kein Ersatz für das Seitenlayout. Eine bildliche Websitevorlage besteht aus Header, Navigation, Text, Bild, Bedienelementen und Folgesektionen. Nicht nur das Bild übernehmen und den Rest beim alten Textkartenlayout belassen.

Die HTML-Prototypen sind ohne Build-Schritt lokal nutzbar. Externe Produktlinks führen zu Bestandsreferenzen; bestehende Routen müssen vor Übernahme in der Produktionscodebasis geprüft werden. Die Prototypen enthalten weder Kasse noch Konto. Vorhandene Konto-, Checkout- und Rechtstexte erhalten und gestalterisch passend integrieren.

## 4. Gemeinsame Designidee

Ein Thema wird als zusammenhängender Weg dargestellt:

**Betriebssituation → Erklärung im Studio → passendes Tool → passende Arbeitsunterlage.**

Die Betriebswelt ist die Orientierungsebene. Das Studio erklärt den Zusammenhang. Tools ermöglichen einen konkreten Versuch. Produkte vertiefen und strukturieren die Anwendung. Besucher sollen nicht vier voneinander getrennte Angebotswelten verstehen müssen.

Beispiel: Die Themenauswahl „Sicherheitsnachweise“ ändert die Frage auf „Ein Kunde fragt: Wie schützen Sie seine Daten?“, zeigt eine passende dokumentbezogene Erklärung und verlinkt das Sicherheitsnachweis-Toolkit. Für einen Vorfall führt der Prototyp zu den Tools, weil kein weiteres bestehendes Produkt behauptet werden soll. In Produktion redaktionell korrekte Inhalte und Verknüpfungen hinterlegen. Die kurzen Beispielsätze sind Illustrationen für das Layout, keine vollständige fachliche Handlungsanweisung.

## 5. Variante 1: Atlas Studio

### Gestalterische Absicht

Den Atlas nicht als graues Dashboard interpretieren. Er wird zu einer präzise beleuchteten, dunklen Betriebswelt mit sichtbaren Arbeitsräumen, Buchregal und Studio. Die Sidebar gibt Orientierung; die Bildbühne erzeugt Tiefe. Medien sind ein Bestandteil dieses Wissensraums.

### Farben und Typografie

- Grundfläche: `#0A1323`.
- Sidebar: `#0C1A2E`.
- Inhaltsfläche: `#111F35`.
- zweite Fläche: `#172A45`.
- Linien: `#2C405C`.
- Hauptschrift: `#F0F5FF`.
- Nebenfarbe: `#AEBDD1`.
- Akzent: `#74A6FF`; primäre Taste `#3269DF`.

Im Prototyp Bahnschrift für Headlines, Segoe UI für Lesetext, Consolas für Metadaten. In der bestehenden Website die vorhandenen Manrope und IBM Plex Mono lokal verwenden, sofern weiterhin verfügbar. Dabei Gewichtung, Größen und Zeilenumbrüche visuell nachstellen, nicht ungeprüft gleiche Pixelwerte für andere Schriften übernehmen.

### Exakter Aufbau bei 1440 px

- Feste linke Navigationsleiste: 164 px breit, über die gesamte Fensterhöhe; 17 px Innenabstand. Markenname oben, vier Hauptziele im mittleren oberen Bereich, kurze Markenmethodik unten.
- Inhalt beginnt rechts neben der Sidebar. Entwurfsleiste nur im Prototyp, in Produktion entfernen.
- Header 83 px hoch. Keine zweite sichtbare Hauptnavigation zusätzlich zur Sidebar. Stattdessen ruhige Kontextzeile und Sprach-/Bewegungswahl. Ein bestehendes Konto darf dort als kleiner Utility-Link ergänzt werden.
- Hero mit 42 px Außenabstand, Raster `.9fr 1.1fr`, 24 px Lücke. Titel 58 px, kurze Einleitung etwa 15–17 px, zwei klar unterscheidbare Handlungen.
- Bildbühne 515 px hoch, Ausschnitt rechtsbetont. Hero-Asset `hybrid-1.webp`, `object-position:72% center` als Ausgangspunkt.
- Drei Themenpunkte sind echte HTML-Buttons über dem Bild. Keine Texte in die Bilddatei einbrennen. Die zugehörigen Themen bleiben zusätzlich als gleichwertige Leiste unter dem Hero erreichbar.
- Themenleiste: drei gleiche Spalten; aktive Fläche dezent heller. Ein Klick ändert Frage, Entscheidung, Dokumenttitel und Zielverknüpfung weiter unten.
- Danach 65 px Abschnittsabstand und das Szenario-Modul: links Auswahl, konkrete Frage und Erklärweg; rechts eine helle Arbeitsunterlage. Dokumentrotation nur etwa -1,5 Grad, keine verstreuten Papierstapel.
- Studio-Modul: Bild links, Text rechts, ungefähr 1,15:0,85. Große sichtbare Vorschau, zentrierte Starttaste, klare Kennzeichnung als Formatkonzept bis reale Medien vorliegen.
- Bibliothek: vier sorgfältig inszenierte Cover auf der Startseite, vertiefender Katalog auf eigener Seite.

### Unterseiten

Bibliothek: linke Themenleiste, Suche über dem Katalog, drei Cover pro Reihe. Produktseite: Text links, symbolische Produktwelt mit eigenem Buchobjekt rechts; darunter echter Lieferumfang, Muster und ein passendes Erklärformat. Tools: linke Liste, rechts ruhiger Arbeitsbereich mit Eingabe und Ausgabe; fachliche Bedienbarkeit hat Vorrang vor dekorativer Animation. Studio: große Hauptbühne plus drei kompakte Themenwege, darunter vertikale Formate.

### Eigenes Erkennungsmerkmal

Die dunkle Betriebswelt mit aktivem Themenpunkt und der unmittelbar folgenden hellen Arbeitsunterlage. Beide müssen zusammenpassen. Ohne das Szenario-Modul wäre die Illustration nur Dekoration.

## 6. Variante 2: Signal Journey

### Gestalterische Absicht

Filmische Wirkung zuerst, Atlas als erkundbare Ebene im Bild. Die Website fühlt sich wie ein kuratiertes Lernprogramm an, bleibt aber durch direkte Tool- und Produktverknüpfungen praktisch.

### Farben und Aufbau

Grundfläche `#080F1D`, Flächen `#101C31` und `#182D4B`; Schrift- und Akzentrollen wie Variante 1. Normale obere Hauptnavigation, keine Sidebar.

- Hero: 30 px Seitenabstand, 24 px oberer Abstand, mindestens 630 px hoch, feine Kontur und 10 px Eckenradius.
- Die neue Bildwelt `hybrid-2.webp` liegt über die gesamte Bühne. Links eine gezielte dunkle Verlaufsebene nur zur Textlesbarkeit. Die Architektur und der Medienrahmen rechts bleiben deutlich sichtbar.
- Textblock links mit 45 px Innenabstand, Titel 65 px, Einleitung maximal etwa 430 px breit. Kein Text auf den hellen Reflexionen rechts.
- Bildpunkte rechts kennzeichnen die Themen. Am unteren Bühnenrand drei gleich breite Themenkapitel mit aktiver heller Oberkante. Der Prototyp verwendet keine erfundenen Videolängen oder Fortschrittsdaten.
- Folgeabschnitt mit mehr Luft und weniger Kartenrahmen: Situation links, Arbeitsunterlage rechts. Diese Ruhe gleicht die visuelle Intensität des Heroes aus.
- Studiomodul mit größerem Bildanteil, ungefähr 1,4:1.
- Kuratierte Buchreihe auf der Startseite horizontal; Katalog selbst bleibt ein kontrolliertes Raster. Kein horizontaler Seitenüberlauf.

### Unterseiten

Studio als stärkste Hauptseite: Bühne links etwa doppelt so breit wie die Themenliste rechts. Videos, Shorts und Arbeitsmittel visuell miteinander verbinden. Bibliothek mit horizontaler Themenauswahl und dreispaltigem Raster. Produkt und Toolseiten bleiben diszipliniert, statt überall den filmischen Hero zu wiederholen.

### Eigenes Erkennungsmerkmal

Der dreidimensionale Filmrahmen enthält die Betriebswelt. Das Thema wird unten als Kapitel ausgewählt und als Frage, Erklärung, Tool und Dokument fortgeführt. Kein automatisch startendes Werbevideo.

## 7. Variante 3: Open Campus

### Gestalterische Absicht

Ein heller Wissensraum mit Tiefe und ein dunkles Studio als bewusster Kontrast. Diese Richtung darf nicht wieder zu weißen Textkarten auf weißem Hintergrund werden. Das große räumliche Motiv und der sichtbare Hell-Dunkel-Wechsel sind wesentlich.

### Farben und Aufbau

- Grundfläche `#EDF3F9`.
- Inhaltsflächen `#FFFFFF`.
- Sekundärflächen `#E0EAF5`.
- Linien `#C9D8E9`.
- Schrift `#17334F`.
- Nebenfarbe `#536B85`.
- Akzent `#2C62CE`; Taste `#285FD5`.
- Studioinsel `#11223D`, mit heller Schrift und kühlen blauen Metadaten.

Normale obere Navigation. Hero mit 55 px oberem und 42 px seitlichem Abstand, Raster ungefähr .8fr:1.2fr. Titel 65 px, kurze Nutzenbeschreibung links. `hybrid-3.webp` rechts, etwa 510 px hoch, ohne schweren Kartenrahmen. Die Illustration zeigt bereits hellen Betrieb, Buchraum und dunkles Studio als eine architektonische Einheit.

Themenleiste als weiße Fläche unter dem Hero. Szenariomodul auf leicht blauer Fläche mit heller Arbeitsunterlage. Danach die markante dunkle Studioinsel mit Bild links und Text rechts. Katalog mit vier Coverkarten, klaren hellen Produktflächen und horizontaler Themenwahl. Tools erhalten eine dunkle Kopfzone über heller Eingabe/Ausgabe, um Aufgabe und Arbeitsebene zu trennen.

### Eigenes Erkennungsmerkmal

Der Übergang vom hellen Arbeits- und Wissensbereich in ein dunkles Studio. Diese Änderung wird durch den Inhalt begründet, nicht zufällig dekorativ eingesetzt.

## 8. Bewegung: genaue Zustände

| Element | Auslöser | Verhalten | Dauer / Grenze | Reduzierte Bewegung |
|---|---|---|---|---|
| Hero-Text | erster Seitenaufbau | von 14 px unterhalb und transparent in Endposition | 650 ms, einmal | sofort Endposition |
| Hero-Bild | erster Seitenaufbau | ruhiger gemeinsamer Einstieg | 900 ms, einmal | sofort Endposition |
| Themenpunkt | Klick / Tastaturaktivierung | aktiver Hintergrund, ARIA-Zustand; zugehörige Inhalte wechseln | 200 ms Feedback | sofortiger Zustandswechsel |
| Themen-Bildfeedback | Themenwechsel | minimale Schärfung/Skalierung 1,015 → 1 | 450 ms, einmal | kein Zoomen |
| Buch | Hover und sichtbarer Tastaturfokus | Drehung auf neutral und 7 px anheben | 300 ms | keine Bewegung; Fokus bleibt sichtbar |
| Taste | Hover | 2 px anheben | 200 ms | Farb-/Fokusfeedback ohne Bewegung |
| Storyboard | ausdrücklicher Start | Frage → Entscheidung → Arbeitsgrundlage | 2400 ms je Schritt, Ende nach letztem Schritt | manuelles Weiter, kein Timer |
| Dialog | Öffnen / Escape | Inhalt sichtbar; Fokus hinein und danach zurück | keine Zwangsanimation | identisch bedienbar |

Der Prototyp enthält diese grundlegenden Zustände. Keine permanente Parallaxe, kein unendliches Blinken, kein Scroll-Hijacking, kein automatisch startender Ton. WebGL ist dafür nicht erforderlich. Die räumlichen Bilder sind statische Renderings mit HTML-Interaktion, keine tatsächlich begehbaren 3D-Modelle. Eine echte Kamerafahrt oder das Aufklappen einzelner Räume wäre ein eigener Asset- und Implementierungsauftrag.

Für eine optionale spätere Produktionsverfeinerung: einmalige Scroll-Reveals nur für dekorative Bildgruppen. Texte dürfen nicht unsichtbar bleiben, wenn JavaScript oder IntersectionObserver ausfallen. Keine zusätzlichen Reveal-Effekte nur hinzufügen, um die Website „animierter“ zu nennen.

## 9. Responsive: konkrete Regeln

- Ab 1150 px und darunter bei Atlas Studio Sidebar 130 px. Schrift und Bildhöhe reduzieren; Inhalte weiterhin lesbar halten.
- Ab 760 px Sidebar ausblenden. Markenheader, Sprache, Bewegung und Menü anzeigen. Menü enthält die vier Hauptziele und muss sich auch per Escape schließen.
- Mobile Hero-Reihenfolge: Text → Bild mit Themenpunkten → vertikale Themenleiste. Auch bei Signal Journey steht Text auf einer ruhigen Fläche und nicht über einer unlesbaren Miniatur des Desktopbilds.
- Mobile Seitenabstände etwa 19 px. H1 typischerweise 44–47 px; lange Titel natürlich umbrechen.
- Bildbühne ungefähr 310–320 px hoch. Mobilen Ausschnitt separat wählen; die HTML-Themenpunkte müssen weiterhin zum Bildausschnitt passen.
- Szenariomodul, Produktdetail und Toolbereich einspaltig. Eingabe und Ergebnis untereinander. Keine zweispaltige Desktop-Arbeitsfläche auf 390 px erzwingen.
- Katalog zwei Spalten, Cover etwa 122 × 175 px. Filter dürfen als einzelne kontrollierte Leiste horizontal scrollen, die ganze Seite nicht.
- Vertikale Medien auf Mobil zwei nebeneinander. Im Prototyp ist der dritte Teaser auf Mobil ausgeblendet; Produktion muss weitere Inhalte über eine vollständige Studioübersicht erreichbar halten.
- 360, 390, 768, 1024 und 1440 px als manuelle Abnahmegrößen verwenden. In diesem Durchlauf wurden 390 und 1440 px systematisch geprüft; 360 und Zwischenbreiten sind zusätzliche Produktionsabnahme.

## 10. Inhalte und Bestand sauber übertragen

Die Demo zeigt 20 Titel, davon zwei als bestehende Toolkits markiert. Die weiteren 18 Titel sind Gestaltungsvorschläge und kein bestätigter Produktplan. Zehn Toolplätze enthalten sechs Bestandsreferenzen und vier Ausbaukonzepte. In Produktion ausschließlich tatsächlich verfügbare Inhalte als verfügbar darstellen.

Das Toolbeispiel ersetzt lokal nur E-Mail-Adressen. Es darf keine echte bestehende Prüfung ersetzen. Andere Toolauswahlen zeigen ausschließlich den jeweiligen Layoutplatz und deaktivieren die vereinfachte Bedienung. Alle vorhandenen Originalfunktionen, Dateierzeugung und Datenschutzinformationen anhand der echten Codebasis erhalten.

Die kurzen Storyboards sind Textsequenzen zur Visualisierung des Lernwegs. Sie sind keine produzierten YouTube-Videos. Die Bilder sind symbolisch, sie zeigen weder die Infrastruktur eines Kunden noch eine technische Sicherheitsgarantie. Buchdarstellungen ausdrücklich mit digitalem Lieferumfang verbinden. Keine physische Lieferung suggerieren.

Für Rechts- und Handbuchseiten die gewählte Typografie, Navigation und Flächenlogik übernehmen; lange Texte brauchen ruhige Lesefläche, Inhaltsverzeichnis, Quellen und Dokumentstand. Diese zusätzlichen Seitentypen sind nicht als eigene Bildvorlagen ausgearbeitet.

## 11. Komponenten, die Claude in der vorhandenen Codebasis anlegen soll

- `SiteShell`: Header, optionale Sidebar, Menü, Sprachwahl, Motion-Präferenz.
- `WorkplaceHero`: Bild, echte HTML-Themenpunkte, gewählte Situation, passende mobile Darstellung.
- `TopicPath`: einzige gemeinsame Datenquelle für Thema, Frage, Erklärung, Tool-ID, Produkt-ID und tatsächlichen Veröffentlichungsstatus.
- `ScenarioWorkbench`: konkrete Frage, Entscheidung, Dokumentmuster und die drei nächsten Handlungen.
- `StudioFeature`: Poster, Titel, Format, Veröffentlichungsstatus, verknüpfte Inhalte.
- `MediaTopicList` und `ShortsCollection`: unterschiedliche Seitenverhältnisse, keine austauschbaren Textkarten.
- `BookCover` und `CatalogueCard`: reproduzierbare Coverfamilie, Titel und Format außerhalb des Bildes zusätzlich als HTML.
- `LibraryFilters`: Suche, Themenwahl, Ergebniszahl, sinnvoller Leerzustand.
- `ToolWorkspace`: vorhandene Originalfunktion mit neuer Hülle, saubere Fehler- und Ergebniszustände.
- `SourceMethod`: vorhandene Quellenlogik sichtbar und lesbar einbetten.

Diese Namen sind vorgeschlagene Verantwortungsbereiche, keine Behauptung über das aktuelle Framework. Vor Umsetzung vorhandene Komponenten und Routing prüfen. Nicht den Prototyp als zweite isolierte Website in die Produktion einbauen.

## 12. Produktionsqualität und Abnahme

1. Nach Auswahl einer Richtung zuerst Startseite plus je eine Bibliotheks-, Produkt-, Tool- und Studioseite als zusammenhängende Familie lokal vorlegen.
2. Visuell mit der Bildvorlage vergleichen: gleiche Haupthierarchie, ähnliche Bildanteile, passende Textbreiten, erkennbare Hell-Dunkel-Zonen und echte Coverobjekte. Nicht nach der bloßen Existenz ähnlicher CSS-Farben abnehmen.
3. Die drei Themenwege müssen fachlich passende Inhalte und funktionierende Ziele öffnen. Verfügbarkeit darf nicht erfunden werden.
4. EN und DE vollständig prüfen, einschließlich Dialogen, Fehlermeldungen und Metadaten. Die neue Prototyp-Fassung bietet beide Sprachen, ersetzt aber keine abschließende Sprachredaktion.
5. Tastaturbedienung, sichtbaren Fokus, Dialogfokus, Escape, Menüzustand und Live-Ausgabe prüfen. Keine vollständige WCAG-Zertifizierung aus diesem Prototyp ableiten.
6. Motion aus und Betriebssystempräferenz prüfen. Inhalt bleibt vollständig nutzbar. Video nur mit bewusster Aktivierung und später mit Untertiteln/Transkript.
7. Hero-WebP priorisieren und Abmessungen reservieren, Folgebilder lazy laden, Video erst nach Aktivierung. Die drei neuen WebP-Dateien haben jeweils ungefähr 160–210 KB. Keine externen Fonts oder Animationsbibliotheken nur für diesen Look hinzufügen.
8. Bestehende Produkt-, Tool-, Konto-, Checkout-, Sprach- und Quellenseiten regressionstesten. Preise und rechtsrelevante Texte nicht aus dem Designprototyp ableiten.
9. PDF-Druckansicht separat behandeln: dunkle Hintergründe bewusst ersetzen oder drucken, Animationen auf Endzustand setzen, leere Seiten vermeiden. Eine gute Bildschirmseite muss nicht ohne Print-CSS ein brauchbarer PDF-Ausdruck sein.
10. Erst nach Stefans Freigabe veröffentlichen. Keine Zahlungs- oder Infrastruktureinstellungen für eine Designumstellung verändern.

## 13. Direkt an Claude übergebbarer Arbeitsauftrag

„Meine gewünschte Richtung ist **[Atlas Studio / Signal Journey / Open Campus]**. Verwende das beigefügte ZIP als präzise visuelle und interaktive Referenz. Lies zuerst diesen Umsetzungsbrief, betrachte `vorlage-0N.jpg` und die vollständige Startseite. Prüfe dann die tatsächliche bestehende Codebasis. Übertrage die gewählte Bildsprache, Hauptproportionen, Navigation, Coverfamilie und Motion-Zustände auf meine vorhandene Scutoria-Website. Besonders wichtig ist die inhaltliche Verbindung Betriebssituation → Erklärung → Tool → digitale Arbeitsunterlage. Erhalte bestehende Funktionen, Quellen, Sprachen, Kaufwege und tatsächliche Produktdaten. Zusätzliche Titel, Toolplätze und Storyboards sind Gestaltungskonzepte und dürfen nicht als verfügbare Angebote ausgegeben werden. Verwende die mitgelieferten Bilddateien statt leerer Platzhalter. Zeige mir zuerst fünf zusammenhängende Seitentypen lokal in Desktop und Mobil und gleiche sie mit der Bildvorlage ab. Veröffentliche erst nach meiner Freigabe.“

## 14. Herkunft und Grenzen

Ausgangspunkt ist die von Stefan bereitgestellte PDF und die beiden eigenen vorherigen Websitevarianten. Die drei neuen Hero-Illustrationen wurden mit dem integrierten Bildgenerator erstellt; genaue Prompts in `BILD-PROMPTS.json`, Assets mit PNG-Master und optimiertem WebP. Frühere eigene Atlas-/Studio-/Produktbilder werden ergänzend wiederverwendet. Keine externen Beispielseiten kopiert.

Dies ist eine Gestaltungs- und Umsetzungsreferenz, kein erneuter vollständiger Livewebsite-Audit. Beobachtungen aus dem PDF sind bewusst von neuen Vorschlägen getrennt. Die Drive-Gedächtnisquelle war in dieser Sitzung nicht verbunden. Lokale Projektregeln wurden berücksichtigt; keine lokalen Gedächtnisdateien angelegt und nichts an der Livewebsite verändert.
