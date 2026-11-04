# Scutoria: Gegenprüfung des Umsetzungsberichts

Prüfstand: 02.11.2026. Grundlage: der von Stefan beigefügte Claude-Umsetzungsbericht als Text und PDF sowie eine eigene aktuelle Außenprüfung von https://scutoria.com/de/ und ausgewählten Anschlussseiten.

## Einschätzung

Die Umsetzung ist ein deutlicher Fortschritt gegenüber der am 01.11.2026 geprüften Website. Die empfohlene Richtung A ist erkennbar umgesetzt und sinnvoll an die bestehende Marke angepasst: Claim, vorhandene Schriften und Farben bleiben erhalten; das Dokument wird durch eine eigene Situationswahl und nachvollziehbare Schritte erschließbar. Die Startseite erklärt heute wesentlich besser, wozu die Produkte dienen.

Besonders gelungen ist, dass die kleine Textprüfung tatsächlich auf eine neu eingegebene fiktive Nachricht reagiert. Sie ist keine fest vorbereitete Vorher-/Nachher-Attrappe. Die Verbindung aus Quelle, Beispiel und Handbuch ist ebenfalls substanzieller geworden.

Ich würde die neue Richtung beibehalten und gezielt verfeinern. Ein weiterer grundsätzlicher Designwechsel wäre anhand dieser Gegenprüfung nicht begründet. Ob Besucher freiwillig länger erkunden und das Angebot besser verstehen, ist durch die Umsetzung und technische Tests allein noch nicht nachgewiesen.

## Was ich unabhängig bestätigen konnte

Eigene Browser- und HTTP-Prüfung, Abrufdatum für alle folgenden Belege: 02.11.2026.

| Bereich | Eigene Beobachtung | Einordnung |
| --- | --- | --- |
| Neuer Hero | „Jemand fragt. Was zeigen Sie?“; Claim bleibt als Markenzeile; Situationswahl und Werkbank vorhanden | Redesign veröffentlicht |
| Situationswahl | Kundenanfrage zeigt Selbstauskunft, Vorfall zeigt Notfallkarte; Schritt „Die Frage“ ist direkt anwählbar | In Stichprobe bedienbar |
| Textprüfung | Vorbelegtes Beispiel wird ersetzt; zusätzlich eingegebenes „Bitte Herrn Emil Muster unter emil@example.org zurückrufen“ wird zu Namen- und E-Mail-Platzhaltern | Reaktion auf freie fiktive Eingabe bestätigt; keine vollständige Erkennungsprüfung |
| Kaufweg | Klick auf den KI-Kaufbutton der deutschen Startseite öffnet https://checkout.stripe.com/ | Frühere Kauf-Unterbrechung für diesen Weg nicht mehr reproduziert; keine Zahlung |
| CSP | form-action erlaubt zusätzlich checkout.stripe.com und billing.stripe.com | Beschriebene Headeränderung vorhanden |
| Mobilmenü | Bei 390 Pixeln Menü vorhanden; Konto erreichbar; Escape schließt, Fokus kehrt zu „Menü“ zurück | Frühere Navigationslücke in dieser Stichprobe geschlossen |
| Generator-Einstiege | „Mit Ihrem Betrieb beginnen“ startet mit leerem Namensfeld und Beispiel als Hilfetext; Musterlauf hat eigenen Beispielhinweis | Trennung sichtbar und am Einstieg funktional |
| Orientierung | Abschnitt, Fragenstand, aufklappbare Abschnittsliste, Speicherhinweis und ausführlicher Handbuchlink vorhanden | Einstieg verbessert; vollständiger neuer Durchlauf hier nicht wiederholt |
| Online-Handbücher | Alle vier EN-/DE-Handbücher enthalten ausgehende Links zu Quellen | Zuvor fehlende Verlinkung vorhanden; Zuordnung und fachlicher Inhalt nicht vollständig neu gegengeprüft |
| Badge und Analytics | Kein Lovable-Badge und kein __l5e-Statistik-Skript in den geprüften HTML-Antworten | Entfernung dieser Bestandteile bestätigt; keine vollständige Netzwerkanalyse |
| Fehlerseite | Der zuvor verwendete ungültige Prüfpfad liefert 404 und „Page not found“ | Frühere Startseitenkopie als Fehlerinhalt ersetzt |
| Redaktion | Über-Seite nennt etwa fünfzig Beschäftigte und zwei Toolkits mit einem weiteren in Vorbereitung | Genannte Textkorrekturen sichtbar |
| Datenschutz | __cf_bm wird erklärt; Entwurfsvermerk und weitere Klammerstellen bleiben öffentlich | Aktualisiert, weiterhin nicht abschließend bereinigt |
| Vorschau | noindex und vollständige robots.txt-Sperre bestehen weiter | Gemäß Bericht bewusst beibehalten |

Der HTTP-Abgleich umfasste 15 gezielt ausgewählte Ziele. Darunter waren 13 reguläre HTML-Seiten, robots.txt und ein absichtlich ungültiger Pfad. Alle regulären Seiten antworteten erfolgreich; die Fehlerseite lieferte 404. Die 14 erfassten HTML-Antworten einschließlich Fehlerseite hatten jeweils eine H1. Das ist eine Stichprobe und kein erneuter vollständiger Crawl. Beleg: `live-gegenpruefung.json`.

Die externen Links in den Handbüchern wurden gezählt, nicht als lauter unterschiedliche Originaldokumente interpretiert. Die Zahl der Links allein bestätigt weder die im Claude-Bericht genannte Gesamtzahl geprüfter Quellen noch die Richtigkeit jeder Zuordnung.

## Was aus dem Claude-Bericht stammt und nicht von mir neu bewiesen wurde

- Die 216 erfolgreichen automatisierten Tests, die einzelnen Commits und die vollständige axe-Prüfung. Ich habe diese Tests in diesem Lauf nicht selbst ausgeführt und keine entsprechende Codeabnahme vorgenommen.
- Die vollständige Tastaturabnahme aller Generator- und Kontoseiten. Menü und Teile der Startseite habe ich selbst bedient; den kompletten neuen Fragebogen habe ich nicht erneut durchlaufen.
- Vollständiger Betrieb ohne JavaScript, genaue Animationstimer, Speicherung der Bewegungswahl und Fehlerfreiheit sämtlicher Übergänge. Diese Punkte wurden nicht vollständig neu abgenommen.
- Memo-Sprachwechsel, vollständige Prüfseite, Erinnerungsjob, Live-Schalter und Lizenzberechtigung. Der Bericht dokumentiert sie; sie sind hier keine unabhängig bestätigten End-to-End-Ergebnisse.
- Tatsächliche Mailzustellung, Rechnung, Webhook-Verarbeitung, automatische Lizenzfreischaltung und Zugriff nach einer Zahlung. Das Öffnen von Stripe beweist diese nachgelagerten Schritte nicht.
- Unveränderter oder inhaltlich korrekter Dateiinhalt. F18 bleibt eine eigene Produktprüfung.

Auch „axe ohne gemeldete Verstöße“ und ein dokumentierter Tastaturdurchgang sollten als konkrete Prüfergebnisse bezeichnet werden. Sie sind kein vollständiger Nachweis für Barrierefreiheit. Der Bericht nennt selbst die ausstehende Screenreader-Prüfung. F16 lässt sich deshalb präziser als „wesentlich verbessert und teilweise nachgewiesen“ beschreiben, ohne die geleistete Arbeit kleinzureden.

## Kleine Präzisierung zu den Fragenzahlen

Die KI-Produktseite nennt 34 Fragen. Der leere Lauf zeigte zunächst „Frage 1 von 33“, der vorbelegte Musterlauf „Frage 1 von 34“. Damit ist eine vom Einstieg beziehungsweise den vorhandenen Antworten abhängige Zählung plausibel. Ein Zählfehler ist dadurch nicht belegt. Wenn die Zahl im Verlauf angepasst wird, sollte die Oberfläche das verständlich machen; gegebenenfalls „bis zu 34 Fragen“ oder ein kurzer Hinweis auf antwortabhängige Folgefragen. Diese Formulierung erst nach Prüfung der tatsächlichen Logik festlegen.

## Was ich als Nächstes priorisieren würde

1. **Die vollständige technische Kaufkette belegen.** Der nächste fehlende Nachweis ist nicht der Weg zu Stripe, sondern Zahlung, Webhook, Lizenz, Konto, Dokumentzugriff und Rechnung gemeinsam. Das muss in einer passenden Testumgebung oder durch Stefans bewusst ausgeführten Probekauf geprüft werden. Hier wurde keine Zahlung veranlasst.
2. **Memo-PDF und E-Mail-Zustellung nach den Änderungen prüfen.** Auch den Umgang mit dem optionalen Betriebsnamen anhand des wirklichen Datenflusses prüfen.
3. **Bekannte redaktionelle Restarbeiten schließen.** Abschnitt 0 der Handbücher beschreibt noch die alte Vorbelegung; die ungemessene Zeitangabe und die verbliebenen Rechtstextentwürfe sind im Claude-Bericht bereits benannt. Keine neue rechtliche Bewertung dieses Berichts.
4. **F05 und F10 weiterführen.** Memo- und PDF-Quellen sowie die langen Produktseiten sind ausdrücklich noch offen. Auf Produktseiten würde ich Nutzen, Ergebnisvorschau und klare Dateiauswahl stärker staffeln.
5. **Verständlichkeit mit Menschen und einem Screenreader prüfen.** Findet ein Erstbesucher sein Produkt? Versteht er Muster, eigene Angaben und Quellenmarker? Kann er das Ergebnis richtig einordnen? Technische Fehlerfreiheit allein beantwortet diese Fragen nicht.

Deine im Bericht festgehaltene Entscheidung E31, den Kaufzugang offen zu lassen, wird hier nicht verändert oder erneut zur Freigabe gestellt. Ebenso ist die Indexierungssperre im bewusst beibehaltenen Vorschaumodus kein neu zu meldender Fehler.

## Gestalterischer Feinschliff

Die neue Startseite sollte zunächst ihre Stärke ausspielen: eine konkrete Frage, ein lesbarer Auszug, ein eigener kleiner Versuch. Die Einleitung ließe sich noch knapper formulieren. Das Toolbeispiel liegt weiterhin relativ weit unten; als nächste gestalterische Variante wäre ein früherer Hinweis oder Sprunglink darauf sinnvoll. Das ist eine Empfehlung zur Prüfung, keine nachgewiesene Verbesserung von Verweildauer oder Verkauf.

Die Markenanpassungen an A sind nachvollziehbar. Eigene Farben und Fremdschriften waren in meinem Prototyp Anschauungsmittel, keine zwingende Vorgabe. Der Claim als Markenzeile und das leicht geneigte, bei Interaktion lesbare Blatt können die bestehende Identität gut weiterführen.

## Quellen und Grenzen

Bericht: die von Stefan beigefügte Datei „Pasted text.txt“ sowie die PDF „Umsetzungsbericht scutoria.com Fremdanalyse vom 1. November 2026 und Redesign.pdf“. Der PDF-Text wurde eingelesen; eine gestalterische PDF-Prüfung war nicht Gegenstand. Das verlinkte Claude-Artefakt verlangte eine Anmeldung und wurde nicht als zusätzlich gelesener Inhalt ausgegeben.

Live-Quellen: https://scutoria.com/de/, https://scutoria.com/de/tools, beide deutschen Produktseiten, vier Online-Handbücher, Datenschutz, Impressum, AGB, Über-Seite, robots.txt und Fehlerpfad. Abrufdatum 02.11.2026. URL-Inventar, Status, H1, Skript- und Linkbeobachtungen in `live-gegenpruefung.json`; ausgewählte Bedienungen in `bedienpruefung.json`.

Google-Drive-Gedächtnis war weiterhin nicht verbunden. Die lokalen Scutoria-Arbeitsregeln wurden gelesen. Es wurde nichts an Live-Code, Preisen, Stripe-Einstellungen, Datenschutztexten oder Veröffentlichungsstatus verändert.
