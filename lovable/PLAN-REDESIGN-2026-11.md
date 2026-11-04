# Redesign nach Variante A: Plan und Kosten

Stand 2. November 2026. Grundlage: ChatGPT-Analyse vom 1.11.2026 (`_berichte/2026-11-01-Erlebnis-Redesign/`, Variante A „Evidence in motion“), die Markenregeln (`.claude/skills/scutoria-brand`), die Entscheidungen E8, E23 und E27 und der aktuelle Code der Startseite bei Lovable (`src/legacy/pages/home.mjs`). Zahlen zu Credits stammen aus Lovable, Projekteinstellungen, Pläne & Credit-Nutzung, abgerufen 2.11.2026, und aus `STAND.md`.

## Kurz

Variante A passt zu Scutoria, wenn wir drei Dinge aus dem ChatGPT-Prototyp nicht übernehmen: keine neue Farbe, keine fremden Schriften, kein Abschied vom Claim. Ich empfehle, in drei Phasen zu bauen. Phase 0 mache ich ohne Credits: alle neuen Texte EN und DE, echte Beispiele mit Quellen, Abnahmekriterien. Phase 1 baut die Startseite neu und kostet geschätzt 15 bis 25 Credits. Phase 2 und 3 folgen nach der Credit-Erneuerung am 23. November.

## Was bleibt, was neu kommt

**Bleibt:** dunkle Seite, helles Papier, Manrope und IBM Plex Mono, Akzentblau nur für die eine Hauptaktion und Links, die vier Marker mit Form, die Produktfarben, die echten Muster-PDFs und Handbücher, die Tools, Preise und Lizenzbedingungen. Keine Tracker, keine fremden Skripte (E23, Markenregel). Die Besucherstatistik von Lovable ist seit 2.11. aus.

**Neu auf der Startseite:**
1. **Einstieg mit Situationswahl.** Der Besucher wählt zwischen drei Alltagslagen: „KI im Betrieb“, „Ein Kunde fragt nach Nachweisen“, „Ein Vorfall“. Das Blatt rechts zeigt dazu das passende echte Musterdokument: KI-Nutzungsrichtlinie (D1), Selbstauskunft (D1 Sicherheit) oder Notfallkarte (D3 Sicherheit).
2. **Dokumentenwerkbank.** Drei direkt wählbare Schritte: die Frage, Ihre Entscheidung, der Nachweis. Ein Knopf „Ablauf zeigen“ spielt die drei Schritte einmal ab. Jeder Schritt ist auch ohne Bewegung erreichbar.
3. **Warum es zählt.** Drei kurze Alltagsfragen statt Angstzahlen: Wer entscheidet im Zweifel? Was können wir dem Kunden zeigen? Wo steht der Meldeweg?
4. **Echtes Tool zum Ausprobieren.** Das vorhandene Tool „Steht da etwas Persönliches drin?“ läuft als kleine Fassung direkt auf der Startseite, mit einem erfundenen Beispieltext und dem ehrlichen Hinweis auf seine Grenzen. Kein vorgetäuschter Prüfer wie im ChatGPT-Prototyp.
5. **Marker zum Anklicken.** Jeder der vier Marker öffnet ein echtes Beispiel aus einem Handbuch mit Aussage, Quelle als Link, Fundstelle und Abrufdatum.
6. **Produkte kürzer.** Pro Toolkit ein Satz Nutzen, eine Ergebnisvorschau, eine kurze Umfangsliste, Preis wie heute. Die langen Aufzählungen wandern auf die Produktseiten.
7. **Bewegung.** Nach den Markenregeln: Das Blatt setzt sich einmal, Marker zeichnen sich einmal, Zustandswechsel 240 bis 450 ms, nichts läuft endlos, reduzierte Bewegung zeigt Endzustände. Dazu ein kleiner Schalter „Bewegung aus“.

## Wo ChatGPT und deine Markenregeln sich widersprechen

| Punkt | ChatGPT-Prototyp | Markenregel oder Entscheidung | Meine Empfehlung |
|---|---|---|---|
| Überschrift | „Wenn jemand fragt, können Sie antworten.“ ersetzt den Claim | Claim „Belegt. Datiert. Vorzeigbar.“ erscheint in drei Takten (Inszenierung vom 20.10.) | Situationsfrage als Überschrift, Claim bleibt als Markenzeile in drei Takten darüber. Entscheidung bei dir (E1 unten) |
| Blatt im Hero | frontal, gerade | ein echtes Blatt, 2 Grad schräg, Rückblatt versetzt | Schräg in Ruhe, gerade und lesbar, sobald ein Schritt gewählt ist |
| Farbe | neues Mint `#62CFBB` für Verbindungen | Farben nur aus den Tokens | Kein Mint, Verbindungen in Akzentblau oder Linienfarbe |
| Schriften | Bahnschrift, Segoe, Consolas, Cambria | nur Manrope und IBM Plex Mono, selbst gehostet | Bestehende Schriften |
| Messung | Kennzahlen zu Auswahl, Demo, Übergängen | kein Tracker | Nur der vorhandene serverseitige Zähler ohne Personenbezug, nach Klärung im Datenschutz |

## Phasen, Inhalt und geschätzte Kosten

Die Credit-Schätzung beruht auf bisherigen Läufen dieses Projekts: Design-Durchgang 12,8 Credits (23.10.), Etappe 2 13,3, Etappe 3 10,1, Bündel vom 30.10. 7,4, Stufe 1 am 2.11. rund 3,1 (Projektverbrauch 67,9 vorher, 71 nachher). Das ist eine Schätzung, kein Angebot von Lovable.

| Phase | Inhalt | Befunde | Credits (Schätzung) |
|---|---|---|---|
| 0 | Claude lokal: alle neuen Texte EN und DE, vier echte Marker-Beispiele mit Quellen, Zuordnung Situation zu Musterdokument, Abnahmeliste | Vorbereitung | 0 |
| 1 | Startseite neu: Situationswahl, Werkbank, Warum es zählt, Tool-Probe, Marker-Panel, kürzere Produkte, Bewegung und Schalter, EN und DE, Tests | F09, F10, F11 | 15 bis 25 |
| 2 | Produktseiten mit Dokument-Ansicht statt langer Listen; Toolseite nach Fragen geordnet, Browserprüfer und Memos getrennt erklärt; Memo ohne Betriebsnamen in der Adresse, Sprachwechsel behält das Ergebnis | F07, F13, F15, Teile F02 | 10 bis 15 |
| 3 | Handbücher mit anklickbaren Originalquellen; Generator mit zwei Einstiegen „Muster ansehen“ und „Eigenen Betrieb erfassen“, Kapitelübersicht und Prüfübersicht vor dem Download | F05, F08, F12 | 15 bis 25, dazu Inhaltsarbeit von mir |
| getrennt | Datenschutzerklärung: Cloudflare-Cookie `__cf_bm`, Memo-Adressen, Wegfall der Besucherstatistik; Statusangaben vereinheitlichen | F02, F06 | 1 bis 2, Tor Recht |

Summe Phase 1 bis 3: geschätzt 40 bis 65 Credits.

**Verfügbar:** 13,1 Credits im Workspace, dazu laut Lovable täglich 5 Build-Credits, die am selben Tag verfallen (lovable.dev/pricing, abgerufen 2.11.2026; ob dein Tarif sie auf 30 im Monat begrenzt, ist dort nicht ermittelbar). Am 23. November kommen 100 Monats-Credits dazu, die zwei Monate gültig bleiben. Mehr Credits gibt es über „Add credits“ oder den höheren Business-Tarif mit 200 Credits im Monat (in Lovable angezeigt mit 100 US-Dollar im Monat statt bisher 50; Stand prüfen, Tor Geld).

## Gesamtbedarf bis zur fertigen Website (Nachtrag 2.11.2026)

Stefan übernahm R1, R2 und R4 (E29) und fragte nach dem Bedarf bis zur endgültig fertigen Website. Schätzung auf derselben Grundlage wie oben:

| Posten | Credits (Schätzung) |
|---|---|
| Phase 1 Startseite | 15 bis 25 |
| Phase 2 Produktseiten, Toolseite, Memos | 10 bis 15 |
| Phase 3 Handbuchquellen, Generator | 15 bis 25 |
| Datenschutzerklärung und Statusangaben | 1 bis 2 |
| Live-Schaltung: Vorschaumodus aus, öffentliche Seiten für Suchmaschinen frei, Stempeltext | 1 bis 2 |
| Erinnerungs-Job für ablaufende Lizenzen | 2 bis 4 |
| Nachbesserungen nach Prüfung der Bedienbarkeit (F16) | 2 bis 5 |
| Puffer für Korrekturrunden, rund ein Fünftel | 10 bis 15 |
| **Summe** | **rund 60 bis 95** |

Verfügbar sind 13,1. Für den Bau ohne Warten auf den 23. November fehlen damit rund 80 Credits.

Preise laut Lovable, Dialog „Mehr Credits hinzufügen“, abgerufen 2.11.2026: einmaliges Aufladen 0,60 US-Dollar je Credit; Aufstocken auf den Business-Tarif mit 200 Credits für 50 US-Dollar heute und danach 100 US-Dollar im Monat (0,50 je Credit); automatisches Aufladen 0,60 je Credit. Aufgeladene Credits gelten zwölf Monate (lovable.dev/pricing, abgerufen 2.11.2026).

Empfehlung: einmalig 80 Credits für rund 48 US-Dollar. Keine laufenden Mehrkosten; die 100 Monats-Credits ab 23. November bleiben als Reserve für Pflege und Korrekturen. Kaufen kann nur Stefan (Tor Geld).

## Vorschlag zur Reihenfolge

1. **Jetzt:** Phase 0 durch mich, ohne Kosten. Du bekommst die neuen Texte zur Freigabe, weil sie freigegebene Texte ersetzen (E23 hielt Texte bisher unverändert).
2. **Nach deiner Textfreigabe:** Phase 1 in der Lovable-Vorschau. Mit 13,1 Credits und den Tagesgutschriften reicht es knapp; sonst ein Teil vor und ein Teil nach dem 23.11. Ich zeige dir die Vorschau mit Bildschirmfotos Desktop und Handy, live geht sie nur auf dein Wort.
3. **Ab 23. November:** Phase 2 und 3 mit den neuen Monats-Credits.
4. **Unabhängig davon:** Gewerbe klären. Das Redesign hängt nicht daran, der Verkauf schon.

## Deine Entscheidungen

| Nr | Frage | Optionen | Empfehlung |
|---|---|---|---|
| R1 | Überschrift | A Claim bleibt Überschrift, Situationswahl darunter. B Situationsfrage als Überschrift, Claim als Markenzeile darüber. C ChatGPT-Satz ersetzt den Claim | B |
| R2 | Blatt im Hero | A schräg bleiben. B gerade wie ChatGPT. C schräg in Ruhe, gerade beim gewählten Schritt | C |
| R3 | Umfang und Budget | A Phase 0 und 1 jetzt, 2 und 3 nach dem 23.11. B alles jetzt mit Credit-Aufladung. C nur Phase 0, Bau später | A |
| R4 | Dritte Situation „Ein Vorfall“ | A mit der Notfallkarte aus dem Sicherheits-Toolkit. B weglassen, bis ein eigenes Toolkit kommt | A |

## Abnahme (Auszug)

- Kauf beider Toolkits EN und DE erreicht in Chrome die Stripe-Kasse (seit Stufe 1 der Fall, bleibt Prüfpunkt).
- Alle Inhalte und Schritte ohne Bewegung und ohne JavaScript lesbar; reduzierte Bewegung zeigt Endzustände; kein Element bewegt sich endlos.
- Mit Tastatur und Touch bedienbar, Dialoge mit Titel, Escape und Rückkehr des Fokus.
- Kein seitliches Scrollen bei 360 Pixeln; lange deutsche Wörter brechen sauber.
- Keine neuen Farben außerhalb der Tokens, keine fremden Skripte, keine erfundenen Zahlen oder Stimmen.
- Jede gezeigte Quelle führt zum Original mit Abrufdatum.
- Bestehende Routen, Muster-PDFs, Handbücher, Generatoren und Memos funktionieren unverändert; die Testsuite bleibt grün.
