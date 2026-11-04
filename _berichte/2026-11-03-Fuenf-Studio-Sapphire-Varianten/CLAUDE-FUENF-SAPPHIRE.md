# Fünf Varianten aus Studio Sapphire

Stand: 3. November 2026. Lokale Designprototypen für Stefan und Claude. Keine Änderung an scutoria.com.

## Ausgangspunkt

Stefan möchte fünf Varianten aus der dunklen Studio-Sapphire-Fassung. Diese verbindet die filmische Bildsprache des ursprünglichen Signal Studio mit der Navy-/Saphirpalette von Sapphire Vault. Keine erneute Interpretation als Büroarchitektur und keine Rückkehr zu hellen Open-Campus-Flächen.

Die fünf Richtungen unterscheiden sich in Komposition, Navigation, Flächenhierarchie und Gewichtung der Produkte/Medien. Die gleiche eigene Studio-Illustration wird bewusst verwendet, damit der Seitenaufbau direkt vergleichbar bleibt. Es wurden für diese Runde keine neuen Rasterbilder generiert. Bildliche Websitevorlagen sind gerenderte Screenshots der tatsächlichen HTML-Prototypen.

## Auswahlhilfe

| Variante | Kennzeichen | Schwerpunkt |
|---|---|---|
| 1 Sapphire Cinema | große Bildbühne, Textüberlagerung, zurückhaltender Glasakzent | engste Fortsetzung der zuletzt gewünschten Richtung |
| 2 Sapphire Editorial | Text und Bild getrennt, ruhigeres Raster, Publikationen zuerst | klare Produktvermittlung und hochwertige Bibliothek |
| 3 Sapphire Panorama | zentrierter Titel, breite Filmfläche darunter | offenerer Eindruck innerhalb einer dunklen Farbwelt |
| 4 Sapphire Channel | seitliche Navigation, Hauptformat und Themenliste | Lernportal mit sichtbaren Einstiegen |
| 5 Sapphire Collection | asymmetrische Komposition mit breitem und vertikalem Medienframe | eigenständige Editionsmarke für digitale Produkte |

Empfehlung für die Auswahl: Variante 1 als naheste Referenz zum letzten Wunsch ansehen; Variante 3 für mehr Luft ohne hellen Hintergrund; Variante 5 für die stärkste Veränderung der Komposition. Das ist keine Auswahlentscheidung für Stefan.

## Dateien zuerst ansehen

- `index.html`: Vergleichsgalerie und Links zu allen Seitentypen.
- `vergleich.jpg`: alle fünf Startseiten nebeneinander.
- `vorlage-0N.jpg`: große Vorlage mit Startseite, Mobilansicht und vier Unterseiten.
- `screenshots/0N-home-full.jpg`: vollständige Startseite.
- `variante-N.html?lang=de`: jeweiliger interaktiver Entwurf.
- `?page=home|library|product|tools|media&lang=de|en`: Seitentypen und Sprache.
- `ui.css`: gemeinsames Ausgangssystem; `sapphire.css`: gemeinsame dunkle Palette; `varianten.css`: gezielte Unterschiede der fünf Richtungen.
- `ui.js`: Rendering, Varianten-Hero, Navigation und Interaktionen. `config.js`: EN/DE-Inhalte und Variantennamen.

Die Prototypen sind ohne Build-Schritt lokal aufrufbar. Zum Teilen mit Claude das gesamte ZIP und die Bildvorlage der ausgewählten Richtung übergeben. Nicht nur die Bilddatei im Assets-Ordner übernehmen: Layout, Typografie und Inhaltsrhythmus sind wesentliche Teile des Designs.

## Gemeinsame Designvorgaben

Die Grundrollen stammen aus Sapphire Vault: Hintergrund `#080F20`, Inhaltsfläche `#111D34`, zweite Fläche `#172A49`, Hauptschrift `#EDF3FF`, Nebenfarbe `#A8B9D2`, Linien `#2D4264`, Akzent `#75A7FF`, primäre Taste `#306CEA`. Dunkle Flächen sollen sich durch abgestufte Blauwerte unterscheiden. Nicht jede Sektion im gleichen beinahe schwarzen Rechteck darstellen. Licht und Materialität kommen vor allem aus der Bildwelt.

Lokale Prototyp-Schriften sind Bahnschrift für Headlines, Segoe UI für Lesetext und Consolas für Metadaten. Für die reale Website vorhandene Manrope/IBM Plex Mono weiterverwenden, falls diese weiterhin die Brandfonts sind. Den visuellen Eindruck und die Umbrüche abgleichen, statt fremde Fontmetriken blind zu übernehmen.

Gemeinsame Inhaltsbreite ungefähr 1240 px. Abschnittsabstände meist 55 px. Fließtext 16–18 px und ruhige Zeilenhöhe. Die Entwurfsleiste oberhalb der Navigation ist nur für den Vergleich und gehört nicht in eine veröffentlichte Website.

## 1. Sapphire Cinema

**Designsprache:** tiefes Navy, ruhige saphirblaue Leuchtkanten, große Bühne. Das Motiv wirkt als Teil der Website, nicht als kleines Bild neben einem langen Text.

**Startseite:** Bildbühne ungefähr 560 px hoch. Text links über kontrolliert abgedunkelter Zone, H1 ungefähr 66 px, Fließtext maximal etwa 430 px breit. Der Filmrahmen rechts bleibt klar sichtbar. Kleine Glasplakette unten rechts. Danach Themenleiste, Studiomodul, horizontale kuratierte Buchsammlung und Quellenmethodik.

**Unterseiten:** Bibliothek mit Themenleiste links und dreispaltigem Katalog. Produktdetail und Toolbereich bleiben in der bekannten klaren Zweiteilung. Studio mit einem dominanten Querformat und zwei vertikalen Formaten. Rahmen fein, Flächenabstufungen zurückhaltend.

**Mobil:** Hero-Text oberhalb des Bildes, als zusammenhängende Bühne; keine unlesbare Desktopüberlagerung. Glasplakette entfällt. Themen untereinander, Katalog zweispaltig.

**Bewegung:** ursprüngliche sanfte Eintritte und geringe Bildflächenreaktion; Cover hebt sich bei Hover/Fokus. Keine dauernd schwebenden Dekorationen.

Referenz: `vorlage-01.jpg`, `variante-1.html`.

## 2. Sapphire Editorial

**Designsprache:** digitaler Fachverlag in dunkler Ausführung. Mehr optische Ruhe durch getrennte Text- und Bildflächen.

**Farben:** Hintergrund `#0C1729`, Fläche `#182A43`, zweite Fläche `#203959`, Linien `#385371`, Akzent `#8CB7F7`.

**Startseite:** Zweispaltiger Hero `.95fr 1.05fr`, 55 px Lücke. H1 ungefähr 68 px. Bild etwa 485 px hoch, rechtsbetonter Ausschnitt. Unter dem Bild eine schmale redaktionelle Leiste mit bewusst startbarer Storyboard-Vorschau. Themenleiste als klar gefasste Fläche. Danach Produkte vor dem Studiomodul, vier sorgfältige Cover pro Reihe.

**Unterseiten:** horizontale Katalogfilter und vier Spalten. Produktbühne am Desktop links, Produktbeschreibung rechts; mobil normale Lesereihenfolge. Studio mit drei gleich breiten Spalten und bewusst verschiedenen Formatproportionen. Quellenfläche etwas heller als der Hintergrund, weiterhin dunkel.

**Mobil:** Text vor Bild. Katalog zwei Spalten. Das größere erste Medienformat nimmt die ganze Breite ein. Keine zweite Desktopspalte erzwingen.

**Bewegung:** subtile Coverbewegung und klare Tastenreaktionen. Zurückhaltender als Cinema. Das Bild muss ohne Bewegung überzeugen.

Referenz: `vorlage-02.jpg`, `variante-2.html`.

## 3. Sapphire Panorama

**Designsprache:** großzügiger, zentrierter Wissens- und Medienauftritt. Mehr Luft entsteht durch Komposition und Blauabstufungen, ohne einen hellen Hintergrund einzuführen.

**Farben:** Hintergrund `#0C1A2E`, Fläche `#172E48`, zweite Fläche `#213C5B`, Linien `#3A5878`, Akzent `#9CC6FF`.

**Startseite:** Titel zuerst, zentriert und ungefähr 62 px groß, maximale Breite etwa 950 px. Einleitung maximal etwa 690 px. Darunter breite Bildbühne etwa 350 px hoch, gut sichtbare Starttaste und kleine Formatbeschreibung. Danach Themenleiste. Studio vor der Produktauswahl. Die Startseite nutzt ein vierspaltiges Coverraster statt eines horizontalen Regals.

**Unterseiten:** horizontale Filter und breites Katalograster. Produktdetail mit großzügigerem Spaltenabstand. Arbeitsflächen der Tools in einem etwas helleren dunklen Blau. Quellenblock klar vom Grundhintergrund abgesetzt.

**Mobil:** Titel und Handlungen linksbündig, Bild ungefähr 280 px hoch. Die Desktopzentrierung darf auf kleinen Geräten nicht zu schmalen Textsäulen führen. Katalog zwei Spalten.

**Bewegung:** Vorschau nur nach bewusster Aktivierung. Eine kurze einmalige Bildenthüllung reicht. Kein automatisch laufender Hintergrundfilm.

Referenz: `vorlage-03.jpg`, `variante-3.html`.

## 4. Sapphire Channel

**Designsprache:** ein kuratierter Lernkanal mit gut sichtbaren Themen. Die Sidebar ist eine Mediennavigation, keine Betriebsüberwachung. Keine erfundenen Nutzungsdaten oder Fortschrittsanzeigen.

**Farben:** Hintergrund `#0B1727`, Fläche `#12283B`, zweite Fläche `#183B50`, Linien `#30526B`, Akzent `#98C2EF`. Ein leichter Petrolanteil differenziert den Kanal innerhalb der Saphirfamilie.

**Startseite:** linke feste Navigation 164 px breit, bei mittleren Desktopbreiten 135 px. Oben eine kompakte Titel-/Nutzenzeile. Darunter Hauptformat links und Themenliste rechts, Raster ungefähr 1.65:1. Die Hauptbühne ist etwa 405 px hoch; Text und Starttaste liegen im unteren Bildbereich. Rechts drei Themen mit kleinem Poster, Titel und direkter Vorschau. Danach Themenleiste und vertiefende Module.

**Unterseiten:** Katalog zwei Spalten innerhalb des verfügbaren Raums. Tools mit stärker vertikaler Arbeitsfläche, damit die Sidebar nicht zu schmalen Eingaben führt. Studio zeigt Hauptformat über die gesamte Breite und darunter zwei vertikale Formate.

**Mobil:** Sidebar entfällt vollständig, normales Menü erscheint. Titel, Hauptformat und Themenliste stehen untereinander. Alle vier kuratierten Buchkarten bleiben auf Mobil sichtbar. Die feste Desktop-Seitenreserve darf keinen horizontalen Überlauf verursachen.

**Bewegung:** Themenliste öffnet ein startbares Storyboard. Fokus und Auswahl müssen deutlich sein. Keine Navigation nur per Hover.

Referenz: `vorlage-04.jpg`, `variante-4.html`.

## 5. Sapphire Collection

**Designsprache:** digitale Editionen und Medienobjekte als zusammenhängende Kollektion. Stärker grafisch, mit einer bewusst asymmetrischen Komposition.

**Farben:** Hintergrund `#10172D`, Fläche `#1B2949`, zweite Fläche `#283B64`, Linien `#3E5279`, Akzent `#A8C2FF`, Taste `#456BDD`. Der Indigoanteil bleibt Teil einer dunklen blauen Familie, kein buntes Farbschema.

**Startseite:** Hero ungefähr `.9fr 1.1fr`, 35 px Lücke. Große H1 etwa 70 px links. Rechts ein breiter Bildrahmen und eine überlagerte vertikale Medienkarte. Diese Karte trägt einen eigenen lesbaren Titel und eine Startaktion, nicht nur ein dekoratives Smartphone. Visualgruppe etwa 515 px hoch. Kuratierte Produkte kommen vor dem Studiomodul. Cover sind leicht gedreht und stärker als eigenständige Editionen inszeniert.

**Unterseiten:** horizontaler Katalogfilter, vier Spalten, etwas größere Coverbühnen. Produktbühne und Toolarbeitsfläche stärker grafisch und weniger gerundet. Studio mit Hauptformat plus zwei schmaleren Vertikalformaten.

**Mobil:** Visualgruppe etwa 360 px hoch, vertikale Karte ungefähr 125 × 220 px. Karte darf den Textbereich nicht verdecken. Zwei Katalogspalten, lesbare Titel als HTML unter jedem Cover.

**Bewegung:** vertikale Karte richtet sich bei Hover und sichtbarem Tastaturfokus auf. Bei reduzierter Bewegung keine Rotation/Translation. Kein endloses Schweben.

Referenz: `vorlage-05.jpg`, `variante-5.html`.

## Inhalte, Funktionen und Grenzen

Die Demo zeigt die bekannte Bibliothek mit 20 Titeln als Ausbaukonzept, davon zwei als bestehende Toolkits markiert. Zusätzliche Titel sind keine bereits verfügbaren Angebote. Zehn Toolplätze dienen der Skalierungsvorschau; die vier zusätzlichen Toolkonzepte bleiben gekennzeichnet. Neue Medienformate sind Konzepte.

Bibliothekssuche, Themenfilter, Produktreiter, Musterdialog, Sprachwahl, Bewegungswahl und Storyboardbedienung sind vorhanden. Die Tooldemo ersetzt ausschließlich E-Mail-Adressen und darf keine vorhandene produktive Prüfung ersetzen. Die Filmwelt besteht aus einer statischen Illustration mit echten HTML-Bedienelementen. Es gibt keinen fertigen Videofilm und kein echtes 3D-System.

Motion-Grundwerte aus dem Prototyp: Tasten ungefähr 200 ms, Cover ungefähr 300–400 ms, Hero-Eintritte 650–900 ms. Storyboards werden bewusst gestartet und enden nach wenigen Schritten. Systempräferenz und Bewegungsschalter berücksichtigen. Für Produktion Inhalte auch bei ausfallendem JavaScript zugänglich halten.

Die zusätzlichen Produkttitel, tatsächlichen Lieferumfänge, externen Routen und Inhalte vor Übernahme in der echten Codebasis prüfen. Bestehende Preise, Kaufabwicklung, Konto, Quellen und Rechtstexte erhalten. Keine neuen Kundenstimmen, Zertifizierungen oder Sicherheitsgarantien aus dem Design ableiten.

## Abnahme für Claude

1. Gewählte Variante in der echten vorhandenen Codebasis als zusammenhängendes System übertragen. Keine zweite isolierte Website einbauen.
2. Hero, Hauptnavigation, Bildanteil, Textbreite und Reihenfolge der Folgesektionen mit der entsprechenden Bildvorlage abgleichen.
3. Bibliothek, Produktdetail, Toolseite und Studio in derselben Richtung umsetzen. Header allein umzubauen reicht nicht.
4. Reale Inhalte und Funktionen erhalten, Konzeptangebote nicht als erhältlich veröffentlichen.
5. Desktop und Mobil, EN/DE, Tastatur, Dialogfokus, Bewegung aus und bestehende Produktionsrouten prüfen.
6. Originalbild optimiert verwenden, Abmessungen reservieren, spätere Bilder lazy laden. Video erst bewusst aktivieren. Keine zusätzliche Animationsbibliothek allein für diese Effekte erforderlich.
7. Stefan die lokale Umsetzung zur Beurteilung zeigen. Keine Veröffentlichung ohne Freigabe.

## Direkt verwendbarer Auftrag

„Meine ausgewählte Richtung ist **[Nummer und Name]**. Betrachte zuerst `vorlage-0N.jpg` und die vollständige Startseite, lies dann diesen Brief. Übertrage diese Komposition und ihre dunklen Farbrollen auf meine bestehende Scutoria-Website. Die Signal-Studio-Bildwelt und die Saphirpalette sind die Basis; eine neue Büroatlas-Bildwelt oder sehr helle Grundflächen sind nicht gewünscht. Erhalte echte Produkte, Tools, Quellen, Sprachen und Kaufwege. Verwende die Konzepttitel und Storyboards ausschließlich als Layoutreferenz. Zeige mir zuerst eine zusammenhängende Familie aus Startseite, Bibliothek, Produktdetail, Toolbereich und Studio in Desktop und Mobil. Prüfe die Umsetzung gegen die Bildvorlagen und veröffentliche erst nach meiner Freigabe.“

## Prüfung und Einordnung

25 deutsche Desktopansichten bei 1440 × 1000 erfasst, Bilder geladen und ohne horizontalen Seitenüberlauf. 25 deutsche Mobilansichten bei 390 × 844 geprüft; ein Sidebar-Überlauf bei Channel wurde korrigiert. Die fünf Startseiten wurden vollständig und als Mobilansicht gespeichert. Weitere Sprach- und Interaktionsergebnisse stehen in `PRUEFUNG.md` und den JSON-Protokollen.

Dies ist keine neue vollständige Livewebsite-, WCAG-, Sicherheits- oder Rechtsprüfung. Es sind visuelle Varianten auf gemeinsamem Funktionscode. Die Livewebsite wurde nicht verändert. Google-Drive-Gedächtnis war in dieser Sitzung weiterhin nicht verbunden; lokale Projektregeln und der laufende Gesprächskontext wurden berücksichtigt.
