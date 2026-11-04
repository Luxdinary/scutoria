# Studio Balance: Korrektur für Claude

Stand: 3. November 2026. Dies ist eine lokale Gestaltungsreferenz, keine freigegebene Endgestaltung und keine Liveänderung.

## Stefans Rückmeldung ist maßgeblich

Signal Studio aus den ursprünglichen fünf Varianten war sein Favorit, aber zu dunkel. Der danach erzeugte Mix ging zu weit in Richtung Betriebsatlas. Atlas Studio und Signal Journey gefallen ihm nicht. Open Campus gefällt ihm im Ansatz, ist aber zu hell.

Daraus folgt: Signal Studio bleibt die Hauptreferenz. Nicht erneut einen dunklen Büroatlas oder ein sehr helles Wissenspavillon-Layout bauen. Gesucht ist eine mittlere Farbhelligkeit mit erhaltener filmischer Bildsprache.

## Was diese Fassung konkret verändert

Die ursprüngliche Signal-Studio-Struktur und das originale Motiv mit Filmflächen, Büchern und vertikalen Medienframes werden wiederverwendet. Das neue Büroarchitekturmotiv entfällt. Das Hauptlayout bleibt medienorientiert: große Bildbühne, klarer Titel, Themenwege, Studiomodul, kuratierte Buchsammlung und Quellenmethodik.

Die vorher beinahe schwarze Grundfläche wird durch gedämpftes Graublau ersetzt. Gleichzeitig werden die beinahe weißen Open-Campus-Flächen vermieden. Dunkles Navy erscheint vorwiegend innerhalb der Bildmotive, nicht als flächige Hintergrundfarbe der gesamten Website.

## Farbrollen dieser Korrektur

| Rolle | Wert |
|---|---|
| Seitenhintergrund | `#91A6BE` |
| Inhaltsflächen | `#A9BDD2` |
| Header | `#9AAFC6` |
| Sekundärflächen | `#7E99B5` |
| Hero-Textzone | `#40617F` |
| Studio-Textfläche | `#577B8E` |
| Hauptschrift auf mittleren Flächen | `#142E4B` |
| Lesetext | `#334E6D` |
| Linien | `#829BB7` |
| Kobaltblauer Primärbutton | `#2C5DCC` |
| Helle Schrift nur auf Hero-/Bildflächen | `#F5F8FF` |

Diese Werte dienen als konkrete visuelle Arbeitsfassung. Sie sind nicht bereits von Stefan freigegebene Markenfarben. Vor Produktion Kontrastwerte für alle tatsächlichen Kombinationen prüfen. Nicht pauschal die Deckkraft der gesamten Seite reduzieren, um sie heller zu machen: Das würde Bild und Schrift auswaschen.

## Layout und Bildbehandlung

- Das ursprüngliche Signal-Studio-Asset verwenden: `assets/04-signal-studio.webp`.
- Desktop: filmische Bildbühne ungefähr 560 px hoch. Links eine stahlblaue Lesbarkeitsfläche als gezielter Verlauf, rechts die klar sichtbaren Filmframes. Kein weißer Schleier über die gesamte Illustration.
- Textzone ungefähr zwei Drittel der Bühne einschließlich auslaufendem Verlauf; eigentliche Lesetextbreite etwa 430 px. H1 ungefähr 66 px im lokalen Prototyp; natürlich umbrechen.
- Seitenbreite und allgemeine Struktur bleiben nahe dem ursprünglichen Signal Studio. Vorhandene Manrope/IBM Plex Mono können in der Produktionsseite weiterverwendet werden. Der Prototyp nutzt lokale Ersatzschriften.
- Den helleren Flächen klare dunkle Schrift geben. Helle Schrift nur innerhalb entsprechend dunklerer Bild- und Herozonen einsetzen.
- Studioflächen dürfen stärker blau und dunkler als der Seitenhintergrund sein, aber nicht wieder beinahe schwarz werden.
- Bücher erhalten räumliche Cover und gedämpfte blaue Präsentationsflächen. Keine weißen Standardkarten einführen.
- Mobile: Textzone oberhalb der Bildfläche, beide als zusammenhängende Bühne. Text bleibt lesbar, das Bild wird nicht auf eine winzige Desktopansicht verkleinert.

## Bewegung und Funktionen

Die vorhandenen Prototypfunktionen bleiben erhalten: begrenzte Einstiege, Hover-/Fokusreaktion der Bücher, Themenwechsel, filterbare Bibliothek, Produktreiter, lokale E-Mail-Demo und startbare endliche Storyboards. Bewegungsschalter und Systempräferenz respektieren. Es handelt sich bei den Storyboards nicht um fertige Videos; die Tooldemo ersetzt keine produktive Sicherheitsprüfung.

Fünf Seitentypen sind in EN/DE vorhanden. Deutschsprachige Desktop-Unterseiten bei 1440 × 1000 und alle fünf mobilen Seiten bei 390 × 844 wurden auf horizontalen Überlauf geprüft, ohne Befund. Hauptstartseite wurde zusätzlich visuell geprüft. Dies war eine gezielte visuelle Korrektur auf dem bestehenden Prototypcode, kein neuer vollständiger Funktions- oder Accessibility-Audit.

## Direkt übergebbarer Auftrag

„Signal Studio war mein Favorit, aber zu dunkel. Open Campus war mir zu hell. Die nachfolgenden Varianten Atlas Studio und Signal Journey sollen nicht weiterverfolgt werden. Verwende deshalb diese Studio-Balance-Fassung als konkrete nächste Arbeitsreferenz: die ursprüngliche filmische Signal-Studio-Bildwelt und Struktur, ergänzt um mittlere Stahlblau- und Graublauflächen. Übertrage keine neue Büroatlas-Ästhetik. Gleiche zuerst Hero, Header, Studiomodul und eine Produkt-/Toolfläche mit den Screenshots ab. Behalte reale Produkte, Funktionen, Kaufwege und Quellen bei. Dies ist eine Richtung zum Review, keine Zustimmung zur Veröffentlichung.“

## Dateien

- `studio-balance.html`: interaktive Seitenfamilie.
- `balance.css`: gezielte Farb- und Layoutkorrekturen über dem ursprünglichen `ui.css`.
- `screenshots/startseite.jpg`: wichtigste aktuelle Bildvorlage.
- `screenshots/startseite-komplett.jpg`: vollständige Startseite.
- `screenshots/library.jpg`, `product.jpg`, `tools.jpg`, `media.jpg`, `mobil.jpg`: ergänzende Ansichten.
- `vergleich.jpg`: ursprüngliches Signal Studio, aktuelle Korrektur und vorheriges Open Campus nebeneinander.

Es wurde kein neues Bild generiert. Das ursprüngliche eigene Signal-Studio-Asset wird bewusst wiederverwendet. Neue Katalogtitel und Medienformate bleiben Konzeptinhalte. Die Livewebsite wurde nicht verändert.


## Aktuelle Feinabstimmung nach Stefans weiterem Feedback

Die Studio-Balance-Fassung wurde etwas dunkler. Die Bildwelt und der Seitenaufbau bleiben erhalten. Zusätzlich bekommt die Palette drei gezielte Farbfamilien: Saphirblau für KI und primäre Handlungen, gedämpftes Petrol für Sicherheitsnachweise und das Studiomodul sowie zurückhaltendes Indigo für Lern-/Medienakzente. Silberblau dient den Dokument- und Quellenflächen. Keine neuen unabhängigen Designvarianten.

Farbzuordnung: Seitenhintergrund `#91A6BE`, Header `#9AAFC6`, Hero-Textzone `#40617F`, Studio/Petrol `#577B8E`, Sicherheitsakzent `#174D60`, Indigo `#434C89`, Silberblau `#ADBECF`. Die Bildflächen behalten ihre klaren Blauwerte; nicht das ganze Bild abdunkeln. Diese Fassung ist der aktuelle Arbeitsstand. `vorher` enthält ausschließlich die vorherige hellere Referenz.


## Zusätzliche Variante: Studio Sapphire

Stefan wünscht zusätzlich eine dunkle Fassung wie Sapphire Vault. Diese ist als eigene Alternative angelegt; die mittlere Studio-Balance-Fassung bleibt erhalten.

Einstieg: `studio-sapphire.html?lang=de`. Gemeinsame Grundstile und Funktionen aus `ui.css`, `ui.js` und `config.js`; die zusätzliche Farb- und Layoutdatei heißt `sapphire.css`. Die Themenvariante wird über `data-theme="sapphire"` erkannt. Navigation und Produktlinks bleiben innerhalb der gewählten Variante.

Farbrollen: Hintergrund `#080F20`, Inhaltsflächen `#111D34`, zweite Fläche `#172A49`, Schrift `#EDF3FF`, Nebenfarbe `#A8B9D2`, Linien `#2D4264`, Saphirakzent `#75A7FF`, Primärbutton `#306CEA`. Hero-Textzone tiefes Navy, keine mittelgraue Überlagerung. Dezente Petrol- und Indigoabstufungen bleiben nur auf ausgewählten Karten.

Die filmische Signal-Studio-Bildwelt und derselbe Aufbau der aktuellen Studio-Balance-Fassung bleiben erhalten. Das ist eine Farbvariante, kein Wechsel zurück zum ursprünglichen Sapphire-Vault-Produktmotiv. Referenzen: `screenshots/sapphire-startseite.jpg`, `sapphire-komplett.jpg`, `sapphire-mobil.jpg` sowie die vier ergänzenden Unterseitenbilder. Unterseiten bei 1440 px und alle fünf mobilen Seitentypen bei 390 px auf horizontalen Überlauf geprüft, ohne Befund. Keine Liveänderung.
