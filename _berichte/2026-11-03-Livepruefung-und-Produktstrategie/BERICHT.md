# Scutoria: Liveprüfung und Produktstrategie

Prüfung am 3. November 2026. Grundlage: die tatsächlich im Browser geöffnete Website, HTTP-Abrufe, Sapphire-Cinema-Übergabepaket und der lokale Projektstand einschließlich E37 bis E40. Dieser Bericht ändert keine Website und ersetzt keine rechtliche Prüfung.

## Ergebnis

Sapphire Cinema ist auf der aktuellen Website angekommen. Navy, Saphirblau, Bildbühne, große Typografie und digitale Medien passen zusammen. Ein weiterer grundlegender Stilwechsel wäre derzeit wenig hilfreich. Das verbleibende Gefühl von „halb fertig“ entsteht vor allem dadurch, dass die Gestaltung ein Medienangebot ankündigt, dessen Videos noch fehlen, und dass ausführliche Textkarten die einzelnen Seiten dominieren.

Die nächste Verbesserung sollte echte Produktnutzung sichtbar machen: Antworten eingeben, die Veränderung eines Dokuments verstehen, eine Leseprobe lesen und einen passenden nächsten Schritt finden. Mehr Bewegung allein löst das nicht. Die Bildbühne schafft Atmosphäre; eine nachvollziehbare Dokumenten-Demo schafft zusätzlich Verständnis und Kaufvertrauen.

Die Produktplanung ist als Themenlandkarte stark, als Produktionsplan zu breit. 29 Toolkits und 29 E-Books erzeugen erheblichen Pflegebedarf. Die bereits entschiedene Reihenfolge 03 → 08 → 12 → 05 → 09 bleibt Ausgangspunkt. Vor jedem Bau braucht es eine klare Abgrenzung zum Bestand und einen Nachweis, weshalb jemand dieses zusätzliche Produkt benötigt. Die Reihenfolge ist eine strategische Entscheidung, keine durch Kundendaten belegte Rangliste.

## Was geprüft wurde – und was offen bleibt

- Browser: deutsche Startseite, Bibliothek, Studio, KI-Produktseite, Konto und beide lokalen Browser-Tools. Desktop 1440 × 1000; mobile Startseite und Bibliothek bei 390 × 844. Mobiles Menü geöffnet und zur Bibliothek navigiert.
- Funktion: Startseiten-Themenwechsel, Bibliothek-Suche einschließlich Nulltreffer und Zurücksetzen, personenbezogene Muster mit fiktiven Daten erkennen/ersetzen, Ampel mit unkritischem Fall und Zugangsdaten-Fall.
- HTTP: alle 32 Sitemap-Ziele; zusätzlich 27 interne Startseiten-Ziele, Statusseiten, Weiterleitung /agb, vier öffentliche Beispiel-PDFs und Zugriff auf das vollständige KI-Handbuch-PDF.
- Planung: alle 29 Toolkit-Themen und 29 E-Book-Themen, Staffelung, Preislogik, Überschneidungen, Länder, Pflege und E37–E40.
- Nicht ausgeführt: Kauf, Login-Mail, Memo-Mail, Wartelisten-Anmeldung, Widerruf, lizenzierter Generator und vollständiger Download eines Käufers. Kein neuer Datensatz und keine Bestellung erzeugt. Keine Last-, Penetrations-, vollständige WCAG- oder Core-Web-Vitals-Prüfung. HTTP 200 beweist keine vollständige fachliche Richtigkeit.
- Die Google-Drive-Gedächtnisdateien konnten mangels verfügbarem Drive-Konnektor in dieser Sitzung nicht gelesen werden. Lokale AGENTS.md und aktuelle Projektentscheidungen wurden berücksichtigt.

## Verifizierte Ergebnisse

| Prüfung | Ergebnis | Einordnung |
|---|---|---|
| Sitemap | 32 von 32 Zielen HTTP 200, jeweils ein H1 | Technisch positiver Befund, keine Vollprüfung jedes Formulars |
| Interne Startseiten-Ziele | 27 von 27 erfolgreich | Keine defekten Ziele in dieser Auswahl |
| Bibliothek | 3 Einträge: 2 verfügbar, 1 in Vorbereitung | Keine separaten doppelten Handbuch-Produkte |
| Suche | „zzzz“ → 0 Einträge; Zurücksetzen stellt Bestand wieder her | Funktionsprüfung bestanden |
| Themenwechsel | Sicherheitsnachweise zeigt dazu passende Handbuch-/Memo-/Produktlinks | Sinnvolle Interaktion |
| Platzhalter-Tool | Name, E-Mail und Telefon erkannt; Ausgabe mit [NAME], [E-MAIL], [TELEFON] | Fiktiver Testfall bestanden; keine allgemeine Erkennungsgarantie |
| Ampel | Unkritischer Fall positiv; Zugangsdaten negativ; „Nichts davon“ wird abgewählt | Zwei Pfade bestanden |
| Mobil | Kein horizontaler Überlauf auf geprüfter Startseite/Bibliothek; Menü navigiert | Nur diese Ansichten und Breite geprüft |
| Vier KI-Beispiel-PDFs | D1, D2, D5 und D7 jeweils 1 Seite | Beschränkte Vorschau bestätigt |
| Vollständiges KI-Handbuch-PDF | Ohne Lizenz 303 zur HTML-Leseprobe | Lizenzgrenze an diesem Endpunkt bestätigt |
| /health | live, Stripe, Webhook und Mail konfiguriert; legalReviewed false | Konfiguration, kein erfolgreicher Kaufnachweis |
| robots.txt | Allgemein Allow; Konto, Kasse und Run-Pfade ausgeschlossen | Suchmaschinenfreigabe aktiv; keine Garantie für Indexierung |
| Header/Footer | Bewegungsschalter und Vorschau-Chip entfernt; Produkte nicht in zwei Footer-Spalten dupliziert | Entspricht neueren Entscheidungen |

Rohdaten: [HTTP-Prüfung](belege/http-pruefung.json), [Sitemap-Prüfung](belege/sitemap-pruefung.json), [Startseiten-Links und CSS](belege/home-links-und-css.json). Die Titelzeichen in der Sitemap-Rohdatei sind durch die automatische Zeichensatzwahl des Prüfskripts teils falsch dekodiert; daraus wird ausdrücklich kein Website-Zeichensatzfehler abgeleitet.

## Priorisierte Befunde

### F01 · Dringend · Offene Betreiber- und Steuerangaben sind öffentlich

Live /de/impressum enthält unter anderem „[Bezeichnung laut GISA-Auszug]“, „[Fachgruppe laut GISA]“ sowie alternative Umsatzsteuerfassungen. /de/agb enthält ebenfalls alternative Steuertexte, interne Prüfklammern und in der Vertragspartnerzeile noch „Kleinpoppen“ ohne die im Impressum vorhandene Hausnummer. Der Live-Modus und die Suchmaschinenfreigabe sind bereits aktiv.

Das ist kein neuer Wunsch nach einem Freigabeprozess: E39 erlaubt den Start ausdrücklich. Der Befund bleibt trotzdem bestehen. Claude soll die konkreten offenen Felder in einer kurzen Liste zusammentragen, mit Stefans Unterlagen abgleichen und eine vollständige, überprüfbare DE/EN-Fassung vorbereiten. Keine Daten erfinden und Prüfhinweise nicht pauschal entfernen. Erst danach nach den bestehenden Projektregeln veröffentlichen. Aus diesem Audit folgt keine Aussage, ob das Gewerbe tatsächlich vorliegt oder welche Steuerregel zutrifft.

### F02 · Hoch · Das Studio verkauft derzeit überwiegend Zukunft

Live werden zehn Langvideos und vierzig Shorts angekündigt. Die aktuelle studio.json enthält zehn Langvideos und zwölf Shorts; zwei Langvideos stehen auf „production“, kein Video auf „published“. Das Studio benennt den fehlenden Upload ehrlich. Die große Platzierung vor der Produktauswahl lenkt Besucher trotzdem auf ein Angebot, das sie noch nicht ansehen können.

Die 40 sind möglicherweise das Ziel 10 × 4, aber nicht der derzeit konkret erfasste Bestand. Eine gemeinsame Datenquelle muss zwischen „geplant“, „in Produktion“ und „ansehen“ unterscheiden. Bis zum ersten Video auf der Startseite eine kompakte Produktionsvorschau plus nutzbare Dokumenten-Demo zeigen. Auf der Studioseite die nächsten zwei bis drei Beiträge hervorheben, den langen Plan als aufklappbares Programm führen. Keine Play-Schaltfläche ohne abspielbares Medium.

### F03 · Hoch · Das Einrichtungsversprechen ist zu absolut

Live in der Bibliothek: „Claude, ChatGPT und Microsoft 365 Copilot so eingerichtet, dass nichts unbemerkt den Betrieb verlässt.“ Einstellungen können solche vollständige Kontrolle nicht allgemein belegen. Die Planung sagt zudem selbst, dass Anbieterquellen erst noch geprüft werden müssen.

Vorschlag zur Textfreigabe: „Konten, Einstellungen und Datenflüsse für Claude, ChatGPT und Microsoft 365 Copilot nachvollziehbar dokumentieren – mit offenen Punkten und Wiedervorlage.“ Der konkrete Leistungsumfang muss zu den tatsächlich untersuchten Kontoarten passen.

### F04 · Hoch · Der Jahreswert muss deutlicher werden

€99 pro Toolkit und Jahr, ohne automatische Verlängerung, wird konsistent dargestellt. Das sichtbare Produkt ist zunächst ein einmalig erzeugter Dokumentensatz. Weshalb der Zugang zwölf Monate wertvoll bleibt, kommt später und abstrakter zur Sprache.

Direkt bei Preis und Ergebnis ergänzen: Was wird aktualisiert? Wie erkennt der Käufer eine betroffene Fassung? Was kann er selbst erneut erzeugen? Was bleibt nach Ablauf verfügbar und wie lange? Eine echte Beispielsituation „Anbieter ändert Einstellung → Hinweis → betroffene Dokumente überprüfen“ zeigen. Keine Updatehäufigkeit versprechen, die organisatorisch nicht getragen wird. Lokal steht reminders auf off; daraus ist kein Live-Ausfall bewiesen. Die zugesagte Ablauf-Erinnerung braucht einen dokumentierten Betriebsnachweis.

### F05 · Mittel · Gute Bühne, noch zu viele gleichartige Textflächen

Der Hero wirkt hochwertig. Studio-Karten und Produktinformationen fallen darunter häufig auf Farbfläche plus Text zurück. Besonders die Studio-Poster enthalten noch keine erklärende Szene oder sichtbare Handlung. Das ist der stärkste gestalterische Rest des ursprünglichen Problems.

Pro Thema eine sachliche Illustration aus dem tatsächlichen Ablauf verwenden: ein Tool-Register mit markierter offener Zeile, eine Entscheidung mit zugehörigem Dokument, eine datierte Nachweisseite. Wiedererkennbare Coverfamilie, aber unterschiedliche Motive. Keine erfundenen Oberflächen, Kunden, Prüfzeichen oder Erfolgszahlen. Quellen und Grenzen in lesbaren Details belassen, nicht jede Karte mit demselben langen Hinweis beschweren.

### F06 · Mittel · Desktop-Rhythmus und Formensprache nachschärfen

Die beobachtete Desktop-Inhaltsbreite beträgt etwa 1160 px gegenüber 1240 px in der ausgewählten Vorlage. Der Hero-Titel fällt mit der Markenschrift in drei statt zwei Zeilen. Live sind die Hauptbuttons stärker pillenförmig; die Vorlage verwendet kompaktere Ecken. Diese Unterschiede sind keine Funktionsfehler, vermindern aber die Nähe zum ausgewählten Entwurf.

Zwei lokale Vergleichsbilder mit gleicher Markenschrift anlegen: aktuelle Breite und 1240 px, jeweils 1440 px Viewport. H1 auf 2–3 ausgewogene Zeilen optimieren, ohne auf Mobil feste Umbrüche zu erzwingen. Für Aktionsbuttons 6–8 px Radius als Vorschlag testen; Kategorielabels dürfen Pillen bleiben. Mobile Copy über dem Bild und die volle Textbreite erhalten. Die aktuelle mobile Hero-Höhe schiebt Inhalte weit nach unten: Innenabstand und Titelgröße maßvoll verdichten, Bild nicht entfernen.

### F07 · Mittel · Bewegung erklärt noch zu wenig

Die Styles enthalten bereits Einblendungen, gestaffelten Hero-Eintritt und Reduced-Motion-Regeln. Die Bühne verwendet statische WebP-Bilder. Deshalb wäre „es gibt keine Animation“ falsch. Die Dauerwirkung bleibt dennoch überwiegend statisch. Eine vollständige Laufzeitprüfung mit geänderter Betriebssystem-Bewegungspräferenz wurde nicht durchgeführt.

Empfohlen wird die unten beschriebene Folge aus Nutzeraktion und sichtbarem Ergebnis. Kein neues Animationsframework allein für diese Effekte. Im alten bundle.css existiert noch eine unendliche Lampenanimation; das beweist keine aktive Animation auf der aktuellen Seite. Vor Bereinigung Nutzung prüfen.

### F08 · Mittel · Mehrere Gestaltungsquellen erhöhen den Pflegeaufwand

Die Startseite lädt fünf Stylesheets mit zusammen rund 145 kB unkomprimiert. Das ist keine gemessene Performanceverletzung. Es erklärt aber, weshalb alte und neue Regeln schwerer zu kontrollieren sind. Lokal stehen in cinema.css trotz Token-Regel noch direkte Farbwerte und Schatten, etwa beim Scrim.

Erst vorhandene Regeln/Nutzung inventarisieren, dann Cinema-Farb- und Scrim-Werte in design/project/tokens.json führen und generieren. Keine pauschale Löschung alter CSS-Dateien. Vorher/Nachher-Bilder und relevante Interaktionen prüfen; Transfergröße und Core Web Vitals erst messen, bevor von einer langsamen Website gesprochen wird.

## Konkrete Erlebnisgestaltung für Claude

Die gewählte Richtung bleibt Sapphire Cinema. Tiefes Navy, Saphir für aktive Zustände, ruhige Flächen und helle Dokumente als Kontrast. Die hellen Inhalte sind lesbare Arbeitsunterlagen innerhalb der dunklen Bühne; keine komplette Aufhellung der Website.

| Bereich | Gestaltung und Interaktion | Bewegungsregel |
|---|---|---|
| Hero | Bestehende Bildbühne erhalten; klare Hauptaktion und sofort nutzbare Nebenaktion | Einmaliger Eintritt 450–650 ms, 8–16 px Bewegung; keine Dauerschleife |
| Themenwahl | Auswahl zeigt gleichzeitig passende Erklärung, Tool und Produkt | 180–240 ms Überblendung, Fokus bleibt auf Auswahl; Status programmatisch ausgeben |
| Dokumenten-Demo | Links eine fiktive Antwort, rechts sichtbar die geänderte Zeile; drei Schritte „Frage → Entscheidung → Dokument“ | Nur nach Klick, 250–400 ms; finale Ansicht auch ohne Animation verständlich |
| Produktkarten | Echtes Cover plus Ausschnitt eines erzeugten Dokuments; klarer Nutzen statt bloßer Dateizahl | Hover höchstens 3–4 px; gleichwertiger Fokuszustand, kein nötiger Hover auf Touch |
| Studio | Veröffentlichte Medien visuell dominant; Produktionsvorschau kleiner und eindeutig | Player erst mit echtem Upload; kein automatischer Ton, eingebettete Fremdinhalte bewusst laden |
| Leseseite | Papierfläche, Inhaltsnavigation, sichtbare Markierungen, Kapitel-/Quellenbezug | Keine Parallaxe hinter Fließtext, keine verdeckten Absätze |
| Rückkehr | Datum und tatsächliche Änderung am Produkt zeigen | Keine erfundenen Aktualitätsstempel; Wiedervorlage an konkrete Änderung koppeln |

Reduced Motion: sofortiger Endzustand, keine Verschiebung oder automatische Abfolge. Bei normaler Bewegung kein Scroll-Zwang, kein horizontal gefangenes Kapitel und keine Animation, die Lesen verzögert. Die Angaben sind neue Umsetzungsvorschläge, keine bereits gemessenen Live-Dauern.

Empfohlene Startseitenfolge: Hero → drei Einstiege → kurze nutzbare Dokumenten-Demo → zwei verfügbare Toolkits → kompaktes Studio → Arbeitsweise/Quellen → nächster Schritt. Das Studio darf nach Veröffentlichung echter Videos wieder mehr Raum erhalten. Den von Stefan gewählten Hero-Text nicht eigenmächtig ersetzen. Im Untertext konkretisieren, dass aus Wissen betriebliche Regeln und bearbeitbare Nachweise entstehen.

## Produktplanung: aktueller Entscheidungsstand

E34: €99 pro Toolkit/Jahr. E35: beschränkte Leseproben. E36: Toolkits zuerst, E-Books danach, Videos parallel. E37: E-Books €29 einmalig, in zugehöriger Toolkit-Linie enthalten; auch Grundlagen nur Leseprobe; €299-Bundle gestrichen. E38: 03 → 08 → 12 → 05 → 09, Ländernotizen AT/DE, Randthemen zurückgestellt. E39: Live-Modus jetzt, keine vorgelagerte Anwaltsprüfung als Startbedingung. E40: Betrieb und Dokumentation nachziehen.

Diese Entscheidungen nicht wieder als offene F1–F8-Fragen vorlegen. Im Plan stehen noch „Grundlagen, frei“, kostenlose Methodenbücher und alte Preisoptionen neben den später eingetragenen Entscheidungen. Das ist ein Dokumentationsfehler, keine neue Preisfrage.

## Bewertung sämtlicher Toolkit-Themen

Die Einschätzung bewertet Zielgruppenpassung, Abgrenzung und Pflege; sie ist keine gemessene Nachfrage und keine Freigabe fachlicher Inhalte. „Weiterführen“ bedeutet nicht sofort parallel bauen.

| Nr. | Thema | Einschätzung und notwendige Abgrenzung |
|---|---|---|
| 01 | KI-Richtlinien | Kerneinstieg erhalten; Pflege und praktischen Jahreswert sichtbar machen |
| 02 | Sicherheitsnachweise | Zweiten Kern erhalten; viele spätere Module dürfen diesen Inhalt nicht nochmals verkaufen |
| 03 | KI-Einrichtung | Entschiedener nächster Bau; Kontotypen und Anbieterumfang eng definieren, Quellen zuerst prüfen |
| 04 | KI-Einweisung | Eigene Schulungsunterlagen/Übung als Mehrwert nötig; Teilnehmernachweis allein ist schon in 01 |
| 05 | KI-Kennzeichnung | Eigenes Kanalregister und Redaktionsablauf gegenüber D5 aus 01 abgrenzen |
| 06 | Hochrisiko-Betreiber | Reserve; hohe Fach- und Pflegeanforderung, klare Einsatzfälle erforderlich |
| 07 | Anbieter/Betreiber | Reserve; eigener Chatbot erzeugt komplexe Rollenfragen, keine pauschale Einstufung |
| 08 | Verarbeitungsverzeichnis | Passender nächster Schwerpunkt; Vorbelegungen sind Beispiele, keine automatisch wahren Betriebsangaben |
| 09 | Auftragsverarbeitung | Register nützlich; EU-Rechenzentrum nicht mit vollständiger Drittlandklärung gleichsetzen |
| 10 | Betroffenenanfragen | Prozess und Fristen helfen; Ausnahmen, Identität und Antwortentwürfe besonders prüfen |
| 11 | Aufbewahren/Löschen | Später; länder-/datenartspezifisch, keine universelle Fristentabelle behaupten |
| 12 | Datenpanne | Entschieden weit vorne; Vorbereitung und akuten Vorfall trennen, keine automatische Meldeentscheidung |
| 13 | Datenschutzinformationen | Inventar als Grenze klar; vollständige Rechtstexte sind nicht automatisch abgedeckt |
| 14 | NIS2-Betroffenheit | Länderumsetzung und Ausnahmen pflegen; Mehrwert gegenüber freiem Memo belegen |
| 15 | Lieferantensicherheit | Stark mit 02/09 verknüpft; belastbare Lieferantenbewertung statt zweiter Dienstleisterliste |
| 16 | Vorfallmeldungen | Überschneidet 12/19; getrennte Empfänger/Fristen sauber modellieren, kein pauschaler Meldeknopf |
| 17 | Zugänge | Praktisch, aber 02-Abgrenzung braucht echten On-/Offboarding-Ablauf und Rechtepflege |
| 18 | Sicherung/Wiederanlauf | Praktisch, wenn Wiederherstellungsprobe und Nachweis statt bloß Backup-Checkliste |
| 19 | IT-Notfall | Eigenständige Übung/Arbeitsfolge nötig; Notfallkarte schon in 02 berücksichtigen |
| 20 | Mobile Arbeit | Später; technische Regeln und arbeitsrechtliche Vereinbarung unterscheiden |
| 21 | Geräte | Inventar/Lebenszyklus plausibel; mit 17/18/20 gemeinsame Daten statt Mehrfacheingabe |
| 22 | Phishing/Zahlungsbetrug | Gut als Tool/Video/Übung; eigenständigen Jahrespreis erst durch wiederkehrenden Nutzen begründen |
| 23 | Cyberversicherung | Antrags-/Nachweisvorbereitung; individuelle Police und Beratung nicht ersetzen |
| 24 | Hinweisgeber | Randzielgruppe des bisherigen Kleinbetriebsfokus; Reserve beibehalten |
| 25 | Barrierefreiheit | Später; kein automatisches Bestehen durch Checkliste, Ausnahmen und tatsächliche Prüfung trennen |
| 26 | E-Rechnung | Eigene Steuer-/Länderpflege; nicht nebenbei als einfacher vorhandener Generator planen |
| 27 | Produktsicherheit | Separate Hersteller-/Händlerzielgruppe; Reserve beibehalten |
| 28 | Website-Pflichtangaben | Hohe Rechtsnähe; keine universelle Textfreigabe aus wenigen Antworten |
| 29 | Cyber Resilience Act | Spezifische Herstellerzielgruppe und hoher Pflegebedarf; Reserve |

## E-Books: 29 Themen, aber eine klare Informationsarchitektur

Alle Themen sind erfasst: Grundlagen 03/27; KI 01/04/05/06/07/08/09/10/28; DSGVO 11/12/13/14/15; Sicherheit 02/16/17/18/19/20/21/29; weitere Pflichten 22/23/24/25/26. Zwei Handbücher sind bereits vorhanden, 27 Bücher neu geplant.

Die Stärke ist der Zusammenhang aus Leserfrage, Quellen und Arbeitsunterlage. Das Risiko ist die Dreifachverpackung desselben Inhalts als Handbuch, E-Book und Toolkit. Im Plan heißt das E-Book einerseits „Lesefassung des Handbuchs“, andererseits eigener Kauf. Deshalb vor der ersten E-Book-Kasse eine eindeutige Produktbeziehung festlegen: Welches Buch ist in welchem Toolkit enthalten? Ist es dieselbe Fassung? Welche Updates gelten zwölf Monate? Was bleibt nach Lizenzablauf herunterladbar? Was passiert, wenn ein Buchkäufer später das Toolkit kauft? Letzteres braucht eine bewusste Regel, kein stillschweigend angenommenes Upgrade.

€29 ist beschlossen und wird hier nicht neu verhandelt. Für diesen Preis braucht jedes Buch eine eigene nützliche Leserfrage und ausreichende Tiefe. Die Kapitelgerüste sind dafür eine gute Grundlage, aber Seitenzahl allein belegt Qualität nicht. Absolute oder ungeprüfte Nutzenbehauptungen wie „Was nie …“, „an einem Nachmittag“ und „eine Regel, die sie stoppt“ sachlich präzisieren. Die 72-Stunden-Frist nicht als allgemeine Frist ab Vorfall oder für jede Datenpanne darstellen; Auslöser, Risikoausnahme und Dokumentationspflicht unterscheiden.

## Empfohlener Bauablauf innerhalb der beschlossenen Reihenfolge

1. Toolkit 03 als enges Minimum definieren: zuerst konkrete Business-Kontoarten und klar benannte Funktionen. Je Anbieter Quelle, Abrufdatum, Kontotyp, geprüfter Bildschirm, Aussage und offene Grenze erfassen. „Unbekannt“ muss ein gültiges Ergebnis sein. Keine Behauptung über private und geschäftliche Konten aus einer einzigen Hilfeseite übernehmen.
2. Toolkit 08: Datenmodell je Verarbeitungstätigkeit testen, Änderungen/Versionierung zeigen, Vorbelegungen ausdrücklich bestätigen lassen. Der pauschale Plan-Satz, dies sei stets „das erste Dokument“, das eine Behörde anfordere, ist nicht belegt und sollte entfallen.
3. Toolkit 12: zunächst Vorsorge-/Übungsprodukt. Meldung, Nichtmeldung und fortlaufende Ergänzung als unterschiedliche Wege behandeln; zuständige Stelle und Fristbeginn quellenbezogen. Akute Vorfälle brauchen einen klaren Hinweis auf zuständige Fachstellen.
4. Toolkit 05: Freitext/Chatbot/Bild/Deepfake und Rollen trennen; zusätzliches Kanalregister gegenüber vorhandener D5-Checkliste konkret zeigen.
5. Toolkit 09: Dienstleisterregister mit Vertrag, Rolle, Unterauftragnehmern und relevanten Übermittlungen; Ergebnis „noch zu prüfen“ ermöglichen.

Für jeden Bau zunächst ein Beispielergebnis zeigen, dann erst den ganzen Fragebogen bauen. Die kleinste überzeugende Ausgabe ist ein besserer Abnahmepunkt als ein langer abstrakter Bauplan. Fachlich riskante Entscheidungslogik braucht stärkere Gegenprüfung als reine Inventare. Das respektiert E38/E39: Die nicht gewünschte pauschale Startbedingung „Anwalt zuerst“ wird nicht erneut eingeführt. Ein Haftungshinweis allein belegt jedoch keine Richtigkeit der Logik.

## Pflege und Nachfrage

Die Aufwandstufen S/M/L messen vorwiegend Bauumfang. Zusätzlich pro Produkt die laufende Pflege erfassen: Rechtsänderung, Anbieteränderung, Länderversion, EN/DE-Abgleich, PDF-Regression, bestehende Käufer informieren. Anbieteränderungen können vor dem Quartalstermin eintreten; neben turnusmäßiger Prüfung braucht es anlassbezogene Wiedervorlage und einen Verantwortlichen. Die Website darf Aktualität nur behaupten, wenn sie nachvollziehbar dokumentiert ist.

Die 29 + 29 bleiben Themenreserve. In Bearbeitung höchstens ein neues Toolkit und dessen zugehöriger Wissensinhalt; Videos aus demselben Beispiel ableiten. Das ist ein Vorschlag zur Arbeitsorganisation, keine Änderung der von Stefan genehmigten Reihenfolge. Vor Erweiterungen die wiederkehrenden Aufgaben des bestehenden Angebots sichtbar machen.

Ohne Gespräche lassen sich Signale schriftlich sammeln: freiwillige Themenwahl, konkrete Frage in der Warteliste, vorhandene Verkäufe und Supportfragen. Keine Analytik oder Tracker ohne eigenen Auftrag einbauen. „Memo sammelt schon Nachfrage“ ist erst belegt, wenn entsprechende Zahlen vorliegen. Verweildauer allein ist kein Qualitätsziel: Erfolgreiche Toolnutzung, verstandenes Ergebnis und sinnvoller nächster Schritt sind bessere beobachtbare Ziele.

## Quellengegenprüfung

Die in der Planung genannten verschobenen Hochrisiko-Termine sind nicht mit dem ursprünglichen Zeitplan zu verwechseln: Die aktuelle [FAQ der Europäischen Kommission](https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act) und der [AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline) nennen 2. Dezember 2027 für Anhang III und 2. August 2028 für eingebettete Hochrisikosysteme. Die Kommission beschreibt den Omnibus als am 27. Juli 2026 in Kraft getreten. Abruf 3.11.2026. Damit ist dieser zentrale Kalenderanker der Planung bestätigt; nicht jede dortige Artikelauslegung ist damit überprüft.

Der direkte Abruf der [konsolidierten EUR-Lex-Fassung](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:02024R1689-20260727) und der DSGVO wurde vom Bot-Schutz blockiert. Eine vollständige unabhängige Prüfung der Rechtsquellen wird deshalb nicht behauptet. Weitere Produktquellen, insbesondere Anbietereinstellungen und die vollständigen nationalen Rechtslagen, wurden in diesem Audit nicht neu geprüft.

Primäre Projektquellen: ENTSCHEIDUNGEN.md (E33–E40), produkte/PLANUNG-2026-11.md, site/content/studio.json, site/content/site-settings.json, aktuelle Marken-SKILL.md, site/src/toolkit/routes.mjs, Cinema-Übergabepaket. Der ältere über den Websuchdienst gelieferte Shopstand wurde ausdrücklich verworfen; maßgeblich sind Browser und direkte Live-Abrufe.

## Übergabe

Claude soll zuerst F01–F04 in konkrete Korrekturen und Betriebsnachweise übersetzen, dann F05–F08 als einen begrenzten Design-Durchgang behandeln. Separater Auftrag: [ARBEITSAUFTRAG-FUER-CLAUDE.md](ARBEITSAUFTRAG-FUER-CLAUDE.md). Screenshots im Ordner belege dokumentieren den geprüften Zustand; sie sind keine neuen Designvarianten.
