# Scutoria: Sapphire Cinema umsetzen

**Detaillierte Übergabe an Claude. Stand: 3. November 2026.**

Stefan hat **Sapphire Cinema, Variante 1 der fünf Studio-Sapphire-Entwürfe**, als Favoriten gewählt. Diese Anleitung konkretisiert ausschließlich diese Richtung. Sie ist keine Freigabe für eine Veröffentlichung.

## 1. Auftrag und Ziel

Übertrage Sapphire Cinema auf die bestehende Scutoria-Website und ihre vorhandenen Seiten. Erhalte reale Inhalte, funktionsfähige Tools, Produktdaten, Kaufwege, Konto, Quellen und Sprachstruktur. Besucher sollen ein Thema verstehen, eine Erklärung entdecken, ein passendes Tool ausprobieren und die entsprechende digitale Arbeitsunterlage finden.

Die große filmische Bildbühne, dunkles Navy, saphirblaue Akzente, räumliche Produktdarstellung und ein ruhiger Seitenrhythmus tragen den Premiumcharakter. Es reicht nicht, die alte Website dunkelblau einzufärben oder nur das Hero-Bild auszutauschen.

Arbeite in der tatsächlichen bestehenden Codebasis. Ermittle Framework, Routing und Datenquellen aus dem Projekt. Dieser Brief behauptet keinen aktuellen Tech-Stack. Die HTML-Demo ist eine visuelle und interaktive Referenz, keine neue Produktionsarchitektur.

## 2. Referenzen und Rangfolge

Zuerst ansehen:

1. `referenzen/home.jpg`: ausgewählte Desktopkomposition.
2. `referenzen/home-full.jpg`: vollständige Startseite und Reihenfolge der Sektionen.
3. `referenzen/mobile-home.jpg` und `mobile-home-full.jpg`: korrigierte Mobilreferenz.
4. `referenzen/library.jpg`, `product.jpg`, `tools.jpg`, `media.jpg`: Unterseiten.
5. `prototyp/sapphire-cinema.html?lang=de`: isolierter interaktiver Entwurf; EN per Sprachschalter oder `?lang=en`.
6. `DESIGN-TOKENS.css`: semantische Gestaltungsrollen.
7. Diese Anleitung: Produktionsverhalten, Zustände und Abnahme.

Rangfolge: Stefans aktuelle Anweisung vor diesem Brief; dieser Cinema-Brief vor früheren Variantenbriefen. Die Desktopbilder legen die Komposition fest. Mobil gelten die korrigierten Bilder dieses Pakets. Prototypdetails wie Entwurfsleiste und vereinfachte Toolfunktion sind keine Produktionsvorgabe.

Editorial, Panorama, Channel und Collection gehören nicht zu diesem Auftrag. Keine Sidebar, keine neue Büroatlas-Architektur und keinen zentrierten Panorama-Hero hinzufügen. Der frühere Vergleich mit den Varianten ist abgeschlossen; Sapphire Cinema wird konkret ausgearbeitet.

## 3. Gestaltungsmerkmale

- Große zusammenhängende Bühne: Text links, leuchtende Medienframes rechts.
- Tiefes Navy statt reinem Schwarz, mit unterscheidbaren blauen Flächenebenen.
- Saphir gezielt für Handlungen, Fokus, aktive Zustände und Lichtkanten.
- Cover, echte Dokumentmuster und formatgerechte Poster statt gleichartiger Textkarten.
- Inhaltliche Verbindung von Erklärung, Tool und digitalem Produkt.
- Ruhige, funktionale Bewegung; kein permanentes Spektakel.
- Vertrauen durch Quellen, Stand, Grenzen und tatsächlichen Lieferumfang.

Die abstrakte Film- und Bücherwelt ist ein Symbolbild. Sie zeigt kein Kundensystem und belegt keine technische Sicherheitsgarantie. Bezeichnungen wie Vault oder Sapphire begründen keine Aussagen über Speicherung oder Verschlüsselung.

## 4. Zuerst den Bestand erfassen

Erstelle intern eine Route-/Komponentenübersicht aus der tatsächlichen Codebasis:

| Bereich | Erfassen und erhalten |
|---|---|
| Startseite | relevante Szenarien, Nutzenargumente, reale CTA-Ziele |
| Bibliothek/Shop | Produkte, Formate, Themen, Slugs, Verfügbarkeit |
| Produktseiten | tatsächlicher Lieferumfang, Muster, Preise, Updates und Checkout-Ziele |
| Tools | Originalfunktion, Datenverarbeitung, Eingaben, Ausgaben/Downloads, Grenzen |
| Studio | echte Medien, Poster, Sprachen und Veröffentlichungsstatus |
| Handbuch/Quellen | Belege, Inhaltsverzeichnisse, Anker und Stand |
| Konto/Kasse | Authentifizierung, Navigation und bestehende Zahlungswege |
| Rechtliches | bestehende freigegebene Texte und Links |
| Sprache/SEO | Sprachrouten, Metadaten, Canonicals und Weiterleitungen |

Keine echte Integration durch eine Attrappe ersetzen. Keine Zahlungs-, Authentifizierungs- oder Infrastrukturkonfiguration allein wegen des Designs verändern. Falls etwas fehlt, als offene Abhängigkeit benennen und unabhängig mögliche Arbeit fortsetzen. Eine Prototyproute beweist nicht, dass dieselbe Route in Produktion existiert.

## 5. Farb- und Flächensystem

Semantische Tokens verwenden und mit dem vorhandenen System konsolidieren:

| Token | Wert | Rolle |
|---|---|---|
| `--sc-bg` | `#080F20` | Seitenhintergrund |
| `--sc-header` | `#0B1529` | Header |
| `--sc-surface` | `#111D34` | Inhaltsflächen |
| `--sc-surface-raised` | `#172A49` | hervorgehobene Flächen |
| `--sc-surface-studio` | `#11223D` | Studiomodul |
| `--sc-surface-sources` | `#11223C` | Methodikfläche |
| `--sc-text` | `#EDF3FF` | Hauptschrift |
| `--sc-text-muted` | `#A8B9D2` | ergänzende Texte |
| `--sc-border` | `#2D4264` | Konturen |
| `--sc-accent` | `#75A7FF` | Fokus, Links, Icons |
| `--sc-primary` | `#306CEA` | primäre Handlung |
| `--sc-petrol-muted` | `#142C40` | dezente zweite Medien-/Coverfläche |
| `--sc-indigo-muted` | `#1A2645` | dezente dritte Medien-/Coverfläche |

Konturen dünn und sichtbar. Nicht um jeden Absatz eine Karte legen. Sektionen durch Raum, Schrift und bewusste Flächenwechsel gliedern. Helle Papierflächen sind für Dokumentmuster erlaubt, keine Grundlage für weiße Hauptseiten. Petrol/Indigo bleiben Nuancen; die Marke bleibt Navy/Saphir.

## 6. Typografie und Abstände

Die Demo nutzt Bahnschrift, Segoe UI und Consolas. In der realen Website vorhandene Manrope/IBM Plex Mono lokal weiterverwenden, sofern diese weiterhin die vorgesehenen Brandfonts sind. Fontmetriken visuell abgleichen; keine externe Schriftabhängigkeit nur für diesen Look ergänzen.

| Rolle | Desktop | Mobil | Regel |
|---|---|---|---|
| Hero-H1 | etwa 66 px / 600 / 1,06 | etwa 45 px / 1,08 | natürliche EN/DE-Umbrüche |
| Seiten-H1 | etwa 58–60 px | etwa 43 px | lange Produktnamen responsiv reduzieren |
| H2 | etwa 40–46 px | etwa 31–34 px | erkennbare Hierarchie |
| Karten-H3 | etwa 20–24 px | etwa 18–22 px | Titel lesbar halten |
| Hero-Text | 17 px / 1,65 | 16 px | Desktop etwa 430 px maximale Breite |
| Lesetext | 16–18 px | 16 px | angenehme Zeilenlänge |
| Utility/Metadaten | Produktion 11–12 px anstreben | 11–12 px | kleine Demowerte nicht blind übernehmen |
| Buttons | etwa 12–14 px / 600 | etwa 12–14 px | ausreichende Bedienfläche |

Abstandsskala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 72 px. Die Referenz nutzt teils 23/35/55 px; im Produktionssystem konsolidieren, solange der visuelle Rhythmus erhalten bleibt. Hauptinhalt maximal etwa 1240 px. Auf breiten Bildschirmen äußeren Raum lassen, nicht unbegrenzt strecken.

## 7. Header, Navigation und Footer

Desktop: klebender Header etwa 80 px hoch. Logo links, Navigation und Utility rechts. Hauptziele Entdecken, Bibliothek, Tools, Studio. Bestehendes Konto als Utility erhalten. Keine zweite Hauptnavigation.

Aktive Seite mit heller Schrift und feiner Saphir-Unterkante. Sprachwechsel führt zur entsprechenden Seite der anderen Sprache. Motion-Präferenz im Produktionssystem für weitere Seitenbesuche innerhalb der Sitzung erhalten.

Mobil: Logo, Sprache/Motion und Menü. Bei Platzmangel Utility-Funktionen ins Menü verschieben statt Schrift winzig zu machen. Sichtbarer offener Zustand, Escape und korrekte Fokusführung. Bei einem echten Overlay Fokus hinein und nach Schließen zurück; bei eingeblendeter Linkliste logische Tab-Reihenfolge.

Footer: tatsächliche Produkt-/Wissensbereiche, Quellen/Methodik, Konto und bestehende rechtliche Links. Galerie-, Claude- und Prototypverweise entfernen. Die Entwurfsleiste über dem Header gehört nicht in Produktion.

## 8. Startseite im Detail

### 8.1 Hero

Referenz: `referenzen/home.jpg`. Bühne innerhalb des etwa 1240-px-Containers, etwa 35 px unter dem Header, ungefähr 560 px hoch, 9 px Radius und feine blaue Kontur.

Asset: `prototyp/assets/04-signal-studio.webp`, 1672 × 941 px, ungefähr 198 KB. Dieses vorhandene Motiv verwenden, keinen neuen Bildstil erzeugen. Für kleinere Geräte bei Bedarf responsive Ableitungen erstellen.

`object-fit: cover`, Ausgangspunkt `object-position: 68% center`. Rechts bleiben die Medienframes erkennbar und brillant. Keine große Unschärfe oder graue Überlagerung über das ganze Motiv.

Text links über dem Bild. Overlayfläche etwa 65 % der Bühne; das ist nicht die Textzeilenlänge. Innenabstand etwa 48 px. H1 maximal etwa 570 px breit, Einleitung etwa 430 px. Text bleibt echtes HTML.

Lesbarkeit durch gezielten Navyverlauf: links etwa `#081328` deckend, über weich auslaufendes `#0C1B34` zu transparent. Rechte Bildhälfte nicht pauschal abdunkeln.

Referenzinhalt:

- Metazeile: Sicherheit · Wirtschaft · KI / Security · Business · AI.
- H1: KI verstehen. Wissen im Alltag nutzen. / Understand AI. Put knowledge to work.
- Einleitung: Nutzen von Anleitungen, digitalen Werkzeugen und verständlichen Erklärungen für KI und Sicherheit im Betrieb.
- Primär: Wissen entdecken, Ziel reale Bibliothek.
- Sekundär: Ein Tool ausprobieren, Ziel geeigneter vorhandener Toolbereich.
- Claim: Belegt. Datiert. Vorzeigbar.

Texte mit dem tatsächlichen Angebot abgleichen. Die Auswahl bestätigt die Hierarchie, erlaubt aber keine erfundenen Versprechen. Eine H1 pro Seite. Kleine Glasplakette unten rechts nur sekundär; auf Mobil ausblenden.

### 8.2 Themenwege

Drei Einstiege: KI im Betrieb, Sicherheitsnachweise, Wissen anwenden. Symbol, kurzer Titel und Zusatztext. Aktiv als leicht hellere Navyfläche mit Saphirakzent.

Die Demo ändert nur den Rückmeldungstext. In Produktion sinnvoll konkretisieren: passende Erklärung, vorhandenes Tool und passende Arbeitsunterlage anzeigen oder direkt zugänglich machen. Kein großer Klickbereich, der nur einen kaum sichtbaren Satz ändert.

Eine gemeinsame echte Datenquelle verwenden: Themen-ID, lokalisierter Titel, Zusammenfassung und optionale IDs von Erklärung, Tool und Produkt. Fehlende Inhalte nicht mit toten CTAs ersetzen. Auswahlzustand und Wechsel für assistive Technik verständlich machen; Fokus nicht überraschend verschieben.

### 8.3 Studio vor Produkten

Das Studiomodul steht vor der kuratierten Produktauswahl. Text links, Bild rechts, ungefähr 1:1,15. Innenabstand etwa 42 px, deutliche H2, kurzer Absatz und ein Hauptlink zum Studio. YouTube/Reels/E-Books nur sekundär.

Echte veröffentlichte Medien können ein Poster mit bewusst startbarem Player erhalten. Solange Inhalte geplant sind, ehrlichen Status zeigen und keinen funktionslosen Play-Knopf verwenden. Die Referenzillustration belegt keinen fertigen Film.

### 8.4 Kuratierte Produkte

Ausgewählte aktuelle Angebote, nicht die komplette Shopliste. Desktop als horizontale Sammlung mit großen räumlichen Covern, erkennbarem nächsten Element und/oder klaren Bedienelementen. Die Seite selbst darf nicht horizontal überlaufen.

Unter dem Cover: Titel als HTML, tatsächlicher Status, Format und klares Ziel. Digitalen Lieferumfang nennen, damit kein physischer Versand suggeriert wird. Katalogdarstellung auf eigener Seite.

### 8.5 Methodik und Abschluss

Ruhige Quellenfläche in `#11223C`: kurze Erklärung und bestehende Unterscheidung Fakt, Auslegung, Unsicher, Lücke. Elemente öffnen echte Erläuterungen oder führen zur Methodik. Chips sind kein Nachweis für Sicherheit/Rechtskonformität.

Am Ende ein eindeutiger nächster Schritt, dann Footer. Keine wiederholte Serie gleich großer Handlungen in jedem Absatz.

## 9. Bibliothek und Katalog

Desktop: Themenleiste etwa 180 px links, etwa 38 px Lücke, rechts Suche, Ergebniszahl und drei Katalogspalten. Bei engeren Breiten kontrolliert reduzieren. Mobil Filter über dem Katalog, zwei Spalten; bei sehr kleinen Geräten und langen Titeln ist eine Spalte als robuste Lösung zulässig.

Planungsgröße: bis zu 20 E-Books und 10 Tools. Das ist eine Skalierungsanforderung, keine Aussage über den heutigen Bestand. Der reale Datenbestand bestimmt die Verfügbarkeit.

Produktdaten mindestens: stabile ID/Slug, lokalisierter Titel, Kurzbeschreibung, tatsächliches Format, Themen, Verfügbarkeit, reales Ziel, Cover und optional bestätigter Preis. Keine Kategorien aus Prototypindex oder Modulo-Rechnung ableiten. Die Beispielzuordnung der Demo ist keine Redaktion.

Suche und Filter zusammen anwenden, Ergebniszahl aktualisieren und Zustand bei Rückkehr aus einem Produkt sinnvoll bewahren. Bestehende URL-/Routingkonvention verwenden. Wunschlisten und zusätzliche Filter nicht ohne Bedarf erfinden.

| Zustand | Verhalten |
|---|---|
| Laden | wenige strukturtreue Platzhalter mit reservierten Abmessungen |
| Keine Treffer | Suchbegriff nennen, Filter zurücksetzen anbieten |
| Katalog leer | hilfreicher Hinweis und vorhandener sinnvoller Einstieg |
| Geplant | eindeutig kennzeichnen, kein Kaufbutton |
| Fehler | verständlich erklären und erneutes Laden anbieten |
| Cover fehlt | konsistentes typografisches Ersatzcover mit echtem Titel |

## 10. Produktdetail

Referenz: `referenzen/product.jpg`. Zwei ungefähr gleiche Spalten, etwa 55 px Lücke. Links Titel, konkrete Anwendung, echte Formate und Handlungen. Rechts hochwertige Produktinszenierung. Mobil Botschaft und Handlungen zuerst, danach Muster/Objekt.

Unter der Bühne in sinnvoller Reihenfolge:

1. Bei welcher konkreten Aufgabe hilft das Produkt?
2. Was ist tatsächlich enthalten? Dateien, Formate und reale Beispiele.
3. Überblick, Inhalt und Anwendung als Abschnitte oder vollständig bedienbare Reiter.
4. Echter Dokumentausschnitt oder verfügbarer Musterdownload.
5. Aktualisierungsstand, Quellen und Grenzen aus dem Bestand.
6. Passende Erklärung und vorhandenes Tool.
7. Vorhandener Kauf-/Downloadweg mit bestätigten Produktdaten.

Die Demotaste „Aktuelle Produktseite“ ist keine endgültige Kauf-UX. In Produktion den echten bestehenden Kaufweg verwenden. Keine Preise oder Lieferbestandteile erfinden. Nicht denselben KI-Text auf das Sicherheitsnachweis-Toolkit kopieren.

Lange Namen vollständig darstellen, responsiv skalieren und sprachabhängige Umbrüche prüfen. Keine unlesbaren Buchstabenstapel. Metadaten nicht über den Titel legen. Digitale Buchdarstellung nicht als physisch lieferbares Produkt beschreiben.

## 11. Toolseiten

Desktop: etwa 260 px Auswahlliste, etwa 30 px Lücke, rechts die Arbeitsfläche. Eingabe und Ausgabe nebeneinander, mobil untereinander. Funktionale Bedienbarkeit hat Vorrang vor dekorativer Inszenierung.

Vor Eingabe sichtbar: Aufgabe, zulässige Eingabe, tatsächlicher Verarbeitungsort und relevante Grenzen. Nur dann „bleibt im Browser“ schreiben, wenn die Implementierung das bestätigt. Keine pauschalen Datenschutzversprechen über alle Werkzeuge.

Originalfunktionen erhalten. Die beiliegende Demo ersetzt ausschließlich E-Mail-Adressen und zeigt das Layout. Sie ist ausdrücklich kein Ersatz für ein vorhandenes Tool.

| Zustand | Produktionsverhalten |
|---|---|
| leer | verständliche Eingabehilfe, Beispiel getrennt aktivierbar |
| Fokus | klarer Fokus, sichtbares Label |
| ungültig | konkrete feldbezogene Fehlermeldung |
| läuft | doppelte Ausführung verhindern, verständlicher Status |
| erfolgreich | sichtbares Ergebnis; Kopieren/Download falls real vorhanden |
| unklar/begrenzt | Grenzen benennen, keine falsche Freigabe |
| Fehler | Eingabe erhalten, Wiederholen ermöglichen, keine Stacktraces |
| zurückgesetzt | Ein-/Ausgabe kontrolliert zurücksetzen |

Keine Eingaben ungefragt an Analytics senden. Bestehende Datenschutzlogik nicht für Animationen umbauen. Keine künstlich verlangsamte Prüfung oder dekorativen Countdown einführen.

## 12. Studio, Videos und Reels

Referenz: `referenzen/media.jpg`. Dominantes Querformat plus zwei schmalere Vertikalformate, ungefähr 1,4:0,75:0,75 und 24 px Abstand. Formatgerechte Poster und lesbare Titel statt leerer großer Textkästen.

Pro Medienobjekt: tatsächlicher Titel, Sprache, Format, Status, Poster, reales Playerziel/interner Inhalt und passende Tool-/Produktverknüpfungen. Dauer nur anzeigen, wenn bekannt. Geplant ist nicht veröffentlicht.

Player nach bewusster Aktivierung laden. Kein Sound-Autoplay. Reale Videos brauchen Untertitel oder verständliche Textalternative; Transkript/Kernaussagen machen den Inhalt zusätzlich nutzbar. Externe Dienste entsprechend der bestehenden Einbettungs-/Consent-Lösung integrieren.

Storyboards der Demo sind endliche animierte Textfolgen, keine produzierten Erklärvideos. Sie nicht als fertige Medien veröffentlichen. Wenn noch keine Videos vorhanden sind, wenige ehrliche Vorankündigungen oder vorhandene Anleitungen zeigen. Keine Wand leerer „kommt bald“-Player.

## 13. Handbuch, Quellen und übrige Seiten

Header, Footer, Farbrollen und Typografie auf vorhandene übrige Seiten übertragen. Lange Dokumente brauchen jedoch keine große Bildbühne.

Handbuch/Quellen: ruhige Lesespalte, Inhaltsverzeichnis, zuverlässige Anker, Stand und echte Belege. Erläuterungen und offene Punkte sichtbar halten. Bestehende Rechtsaussagen nicht für stärkere Werbewirkung umformulieren.

Konto, Kasse, Fehler- und Erfolgsseiten: Verhalten erhalten, visuell konsistent gestalten. Formulare brauchen sichtbare Feldgrenzen und Zustände. Verständliche 404-Seite mit Rückweg. Keine funktionalen Bereiche entfernen, um den Prototyp exakt zu kopieren.

## 14. Komponenten und Zuständigkeiten

| Komponente | Verantwortung | Zustände |
|---|---|---|
| SiteShell | Header/Footer, Sprache, Motion, aktive Route | Desktop, Mobil, Menü |
| CinemaHero | Text, Bild, echte Handlungsziele | geladen, Bild fehlt, Motion aus |
| TopicPaths | tatsächliche Themen- und Inhaltsverknüpfungen | aktiv, leer, gewechselt |
| StudioFeature | Poster, Status, echtes Ziel | veröffentlicht, geplant, fehlt |
| ProductShelf | kuratierte Produkt-IDs | Scrollanfang/-ende, Tastatur, leer |
| ProductCard/BookCover | echter Titel, Format, Status, Cover | verfügbar, geplant, Fokus |
| LibraryFilters | Suche und Themen | laden, Treffer, leer, Fehler |
| ProductDetail | Produktdaten und Kaufweg | Muster, Abschnitte/Reiter |
| ToolWorkspace | originale Funktion mit neuer Hülle | Ein-/Ausgabe, Fehler, Grenzen |
| MediaCard/Player | tatsächliche Medien | Poster, aktiviert, lädt, Fehler |
| MethodBlock | Quellenmethodik | Erläuterung offen/geschlossen |
| Dialog | Titel, Inhalt und Aufrufer | Fokus, Escape, Rückgabe |

Das sind Verantwortungsbereiche, keine verpflichtenden Dateinamen und keine Behauptung über das Framework. Bestehende passende Komponenten erweitern statt doppelt anlegen.

## 15. Animationen

| Element | Auslöser | Effekt | Referenzdauer | Reduzierte Bewegung |
|---|---|---|---|---|
| Hero-Text | erster Aufbau | Fade + maximal 16 px Versatz | 700 ms, einmal | sofort Endzustand |
| Hero-Bild | erster Aufbau | ruhiger gemeinsamer Eintritt | 900 ms, einmal | sofort Endzustand |
| Taste | Hover | maximal 3 px anheben | 200 ms | kein Versatz |
| Cover | Hover/sichtbarer Fokus | aufrichten + maximal 8 px anheben | 400 ms | nur Fokus/Fläche |
| Bildfläche | präziser Zeiger, optional | geringe Neigung, etwa ±2,5°/±2° | 350 ms Rückkehr | aus |
| Toolergebnis | echtes Ergebnis | Fade + maximal 6 px Versatz | etwa 300 ms | sofort sichtbar |
| Themenwahl | Klick/Tastatur | Zustand/Inhalt aktualisieren | 160–220 ms Feedback | sofortiger Wechsel |
| Demo-Storyboard | bewusster Start | wenige endliche Textschritte | 2000 ms je Schritt | manuell, kein Timer |

Easing für Produktion: Bedienfeedback `ease-out` oder `cubic-bezier(.2,.7,.2,1)`, Eintritte `cubic-bezier(.2,.65,.3,1)`. Das präzisiert die Demo, die teilweise CSS-Standard-Easing verwendet.

Bevorzugt `transform`/`opacity`, keine Layoutanimation ganzer Seiten. Keine Scrollsperren, kein endloses Blinken, keine permanente Parallaxe. Inhalte bleiben zugänglich, wenn JavaScript oder Observer ausfallen. Keine neue Animationsbibliothek nur für diese Effekte nötig.

## 16. Responsive und mobile Präzisierung

| Element | Desktop | mittlere Breite | Mobil bis etwa 760 px |
|---|---|---|---|
| Container | max. 1240 px, regulär 40 px Außenraum | etwa 24 px Außenraum | etwa 19 px Außenraum |
| Hero | Text über Bild, etwa 560 px Bühne | Textoverlay etwas breiter | Text vor Bild |
| Hero-Overlayfläche | etwa 65 % | bis etwa 73 % | **100 % Inhaltsbreite** |
| Hero-Bild | rechtsbetonter Ausschnitt | Frames erhalten | etwa 270 px hoch |
| Studiomodul | zwei Spalten | Lesebreite sichern | **eine Spalte** |
| Themen | drei Spalten | lesbare Einstiege | untereinander |
| Katalog | Filter links + drei Spalten | angemessen reduzieren | Filter oben + zwei Spalten |
| Produkt | zwei Spalten | Umbrüche prüfen | eine Spalte |
| Tool | Auswahl + Arbeit, Ein-/Ausgabe nebeneinander | Platz abhängig | Arbeit untereinander |
| Studio | Querformat + zwei Vertikalformate | Titel nicht quetschen | Hauptformat volle Breite |

Der alte Cinema-Entwurf in der Fünfergalerie hatte durch CSS-Spezifität einen schmalen mobilen Textblock und ein nicht sauber umgestelltes Studiomodul. **Der isolierte Prototyp dieses Pakets korrigiert beides.** Diese mobile Präzisierung übernehmen. Nicht durch globales `overflow-x:hidden` Layoutfehler verstecken.

Deutsche Langtexte natürlich umbrechen. Keine festen Kartenhöhen, die Titel abschneiden. URLs/Dateinamen kontrolliert umbrechen. Layout mit fehlenden Bildern, langen Titeln und größerer Systemschrift prüfen.

## 17. Bedienbarkeit

- Fokusreihenfolge Header/Navigation → Hauptinhalt → relevante Handlungen → Footer. Sprung zum Hauptinhalt anbieten.
- Alle wesentlichen Funktionen mit Tastatur und Touch. Hover nur ergänzend.
- Projektspezifische Abnahmeschwelle: Lesetextkombinationen mindestens 4,5:1 Kontrast; große Headlines und grafische Konturen gesondert prüfen. Das ist kein bereits erteiltes Konformitätszeugnis.
- Wichtige Bedienflächen etwa 44 × 44 px anstreben. Kleine Demotasten nicht ungeprüft übernehmen.
- Reiter vollständig mit geeignetem Tastaturverhalten umsetzen oder verständliche normale Abschnitte verwenden. ARIA-Rollen allein genügen nicht.
- Dialog mit verständlichem Titel, Fokus hinein, nicht bedienbarem Hintergrund, Escape/Schließen und Rückgabe an Aufrufer. Lange Inhalte innerhalb der Fensterhöhe scrollbar.
- Eingaben mit sichtbaren Labels, konkreten Fehlern und maßvoll angekündigter Ausgabe. Keine unerwarteten Fokuswechsel beim Tippen.
- Motion aus: dieselben Inhalte und Handlungen ohne Effekte.

## 18. Laden, Ausfälle und Performance

Hero-Abmessungen reservieren und Bild priorisieren. Das wichtigste Hero-Bild nicht lazy laden. Folgebilder lazy laden, responsive Größen und Ausschnitte verwenden. Die vorhandene WebP-Datei ist der Ausgangspunkt, kein Grund für unnötige große Neugenerierungen.

Player erst nach Aktivierung. Keine schweren Hintergrundvideos/WebGL-Szene für das statische Motiv. Glasunschärfe lokal und nicht großflächig animiert. Keine unnötigen Drittanbieter-Skripte ergänzen.

Bei fehlendem Hero-Bild bleiben Navyfläche, Titel und Handlungen lesbar. Bei Tool-/Videofehlern Zustand erklären und Eingabe/Alternativinhalt erhalten. Keine leeren weißen Flächen im dunklen Layout.

Für Druck/PDF eine bewusste Druckdarstellung verwenden: Animationen auf Endzustand, keine zufällig eingefrorenen Transparenzen oder leeren Seiten.

## 19. Umsetzungsreihenfolge

1. Codebasis, Routen und reale Daten erfassen.
2. Tokens und gemeinsame Shell integrieren.
3. Startseite nach Desktop- und korrigierter Mobilreferenz umsetzen.
4. Reale Bibliothek, ein reales Produkt, ein originales Tool und Studio als zusammenhängende Familie umsetzen.
5. System auf weitere vorhandene Seiten übertragen, einschließlich Handbuch/Konto/Kasse.
6. Zustände, Sprache, reduzierte Bewegung und Ausfälle fertigstellen.
7. Tests und visuellen Abgleich durchführen, Befunde beheben.
8. Reviewbaren lokalen/privaten Stand mit Screenshots und Änderungsübersicht vorlegen.

Routineentscheidungen zu CSS/Komponenten innerhalb dieser Richtung selbstständig treffen. Nicht nach jeder Sektion um neue Bestätigung bitten. Die Gestaltungsrichtung ist gewählt. Veröffentlichung ist eine getrennte Handlung und benötigt Stefans Freigabe.

## 20. Visuelle Abnahme

Bei 1440 px mit `referenzen/home.jpg` vergleichen:

- Navygrundfläche und normaler oberer Header; keine Sidebar.
- Große filmische Bühne, links lesbarer Text, rechts brillante Medienframes.
- Vergleichbare Titelgröße, Textbreite, Innenabstände und CTA-Hierarchie.
- Themen direkt unter dem Hero.
- Studio vor kuratierter Produktauswahl.
- Räumliche Cover und eigenständige Quellenfläche.
- Keine weißen Standardkarten oder Büroatlas-Architektur.

Bei 390 px mit der korrigierten Mobilreferenz vergleichen:

- Textblock nutzt volle Inhaltsbreite.
- Bild folgt als Teil derselben Bühne.
- Studiomodul einspaltig.
- Kein horizontaler Seitenüberlauf oder verdeckte Bedienung.
- Lesbare Titel und bewusste Bildausschnitte.

Nicht nur „ungefähr blau und ähnlich“ abnehmen. Screenshots mit demselben Viewport und deaktivierter Bewegung vergleichen. Unterschiede durch echte Produktionsfonts bewusst ausgleichen, nicht mit ungünstigen Textbreiten kaschieren.

## 21. Prüfmatrix

Mindestens 360, 390, 768, 1024 und 1440 px sowie breite Ansicht prüfen. Zusätzlich deutlich größere Textdarstellung. EN/DE mit den längsten realen Titeln kontrollieren.

| Prüffeld | Nachweis |
|---|---|
| Layout | fünf Hauptseitentypen Desktop/Mobil als Screenshots |
| Navigation | Hauptziele und relevante Bestandsrouten funktionieren |
| Sprache | passende Seite wechselt, Dialoge und Fehler übersetzt |
| Bibliothek | Suche, Filter, Rücksetzen, keine Treffer, geplante Angebote |
| Produkte | korrekte Daten je Produkt, Muster und echter Kaufweg |
| Tools | vorhandene Normal-, Fehler- und Grenzfälle bleiben korrekt |
| Medien | reale Player, Status, Textalternative und Verknüpfungen |
| Tastatur | Fokus, Menü, Dialog, Reiter und Scrollsammlungen |
| Bewegung | Systempräferenz/Schalter, keine verlorenen Inhalte |
| Ausfälle | Hero fehlt, Player scheitert, Toolfehler, langsames Netz |
| SEO/Routing | bestehende Metadaten, Canonicals und Sprachrouten erhalten |
| Veröffentlichung | keine ungeplanten Liveänderungen |

Tests auf die echte Codebasis abstimmen. Prototyp-Prüfungen sind keine Produktionsfreigabe. Sinnvolle Nutzerabläufe testen, keine Tests, die nur die eigenen CSS-Werte oder die Implementierung wiederholen.

## 22. Abschlussbericht an Stefan

Zeige:

1. Link/Ort des reviewbaren Stands.
2. Umgesetzte Haupt- und Bestandsseiten.
3. Desktop-/Mobilbilder im Vergleich zur Cinema-Referenz.
4. Welche Originalfunktionen und Kaufwege geprüft wurden.
5. Offene Punkte und tatsächlich fehlende Inhalte.
6. Bewusste Abweichungen und ihren Grund.

Nicht „fertig“ melden, wenn nur der Hero geändert wurde oder Produkt-/Toolwege Attrappen sind. Keine Veröffentlichung vor Freigabe.

## 23. Herkunft und Grenzen

Grundlage sind Stefans Auswahl im Gespräch und die eigenen lokalen Cinema-Entwürfe. Diese Anleitung behauptet weder einen erneuten vollständigen Liveaudit noch Zugriff auf die aktuelle Produktionscodebasis. Die Drive-Gedächtnisquelle war nicht verbunden; lokale Projektregeln wurden gelesen.

Die Fünferfamilie bleibt erhalten. Dieses Paket isoliert Cinema, präzisiert Produktionszustände und korrigiert die mobile Darstellung. Zusätzliche Katalogtitel und Medienformate sind Gestaltungsmuster. Keine Preise, neuen Produktversprechen oder rechtlichen Freigaben ergänzt. Die Livewebsite wurde nicht verändert.
