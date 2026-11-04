# Preis für Toolkit 2: Entscheidung am Tor Geld

Stand 19. Oktober 2026. Du entscheidest, Claude setzt um. Nichts davon ist live; die Website läuft noch im Vorschaumodus.

## Was schon entschieden ist

- E7: Jahreslizenz je Toolkit plus Bundle.
- E10: Preisniveau als Hypothese 149 / 199 / 249 € pro Jahr.
- E14: zehn Pilotkäufer zu 99 €, ohne Gespräch.
- T5 (Bauplan Toolkit 2): Preis erst am Tor Geld, nach dem Handbuch; Arbeitshypothese 249 € regulär, 149 € Gründerpreis.
- Toolkit 1 steht heute auf 199 € regulär und 99 € Gründerpreis für die ersten zehn Käufer (`site/src/config.mjs`, `PRICE_YEAR_CENTS`, `PRICE_PILOT_CENTS`, `PILOT_SEATS`; Stand 19.10.2026). Preisangabe wie bei Toolkit 1: Umsatzsteuer laut Kasse über Stripe Tax (E19); das Steuerverhalten steht in der Konfiguration derzeit auf „inklusive“ (`STRIPE_TAX_BEHAVIOR`), der Umsatzsteuer-Status bleibt beim Steuerberater (Stand prüfen).

Entschieden am 19. Oktober 2026: Option B (E21). 199 € regulär, 99 € Gründerpreis für die ersten zehn Käufer je Toolkit, Bundle 299 € später.

## Was Toolkit 2 liefert, und was der Markt verlangt

Vierzig Fragen, sieben datierte Dokumente (Selbstauskunft, Maßnahmenplan, Notfallkarte, Nachweisliste, Antwortschreiben mit Abgleich, Klausel-Prüfliste, Nachweisseite), ein Handbuch mit 38 am Original gelesenen Quellen, Konto mit Nachweisordner, zwölf Monate Aktualisierungen. Mehr Umfang als Toolkit 1 (31 Fragen, 23 Seiten Handbuch) und ein konkreterer Anlass: Ein Kunde oder Versicherer wartet auf Antwort.

| Vergleichswert | Betrag | Quelle, Abruf |
|---|---|---|
| Cyber Trust Austria, Label Standard (Selbstdeklaration zu 14 Fragen, ein Jahr gültig) | 950 € im ersten Jahr, 900 € danach | cyber-trust.at/labeluebersicht, 19.10.2026 |
| Cyberversicherung für einen kleinen Betrieb, Jahresprämie bei 500.000 € Versicherungssumme | 600 € pro Jahr, Selbstbehalt 1.000 € | Funk International Austria mit Beazley, Antragsformular Juli 2022 (Maklerformular, Sekundärquelle), 19.10.2026 |
| BSI CyberRisikoCheck nach DIN SPEC 27076 | „ein Beratertag“; Preis je IT-Dienstleister nicht ermittelbar (Suche 19.10.2026 ohne Preisangabe) | BVMW-Leitfaden August 2023, S. 8, 19.10.2026 |
| Normtext ISO/IEC 27001:2022 | CHF 155 | IEC Webstore, 19.10.2026 |
| Freie Vorlagen für die Kundenseite (Fragebogen an Lieferanten, 67 Fragen) | kostenlos | orbiqhq.com, 19.10.2026 (Sekundärquelle) |
| Vorlagenpaket „669 templates“ (englisch, Richtlinien ohne Generator und Quellen) | 40 USD einmalig | templates.securityscientist.net, 19.10.2026 (Sekundärquelle) |

Lesart: Was ein Betrieb sonst für denselben Zweck ausgibt (Label, Beratertag, Police), liegt bei mehreren hundert bis tausend Euro im Jahr. Was er kostenlos bekommt, ist die Fragebogenvorlage des Kunden, nicht die Antwort mit Nachweisen. Ein Preis zwischen 199 und 249 € ist in diesem Umfeld nicht der Engpass; der Engpass ist Reichweite (F4: keine bekannten Kunden, Anzeigen-Test E15 noch offen).

## Optionen

| | A: Bauplan-Hypothese | B: wie Toolkit 1 | C: Empfehlung |
|---|---|---|---|
| Regulär, Jahreslizenz | 249 € | 199 € | 249 € |
| Gründerpreis, erste zehn Käufer | 149 € | 99 € | 99 € |
| Bundle Toolkit 1 plus 2 (später, E7) | 349 € statt 448 € | 299 € statt 398 € | 349 € statt 448 € |
| Einnahme der zehn Gründerkäufe | 1.490 € | 990 € | 990 € |
| Wirkung | Höchster Preis, Gründerpreis ohne Signal | Ein Preis für alles, am einfachsten zu erklären | Oberes Preisniveau aus E10, Gründerregel aus E14 für jedes Toolkit gleich: „99 € für die ersten zehn Käufer“ |
| Risiko | 149 € als Einstieg bei null Verkäufen bisher ist die höchste Hürde | Unterschätzt den Umfang; Preiserhöhung später ist schwerer als Senkung | Rabatt von 60 % kann wie ein Lockpreis wirken; Gegenmittel ist die Begründung „Gründerpreis, zehn Plätze, danach 249 €“ auf der Seite |

Nicht ermittelbar: ob 199 oder 249 € mehr verkauft. Es gibt keine Verkaufsdaten und keine bekannten Kunden. Die Zahlen oben sind Marktanker, keine Nachfragedaten.

## Empfehlung

Option C: 249 € regulär, 99 € Gründerpreis für die ersten zehn Käufer, Bundle 349 € erst nach dem ersten Verkaufsmonat oder wenn ein Gründerkontingent ausverkauft ist. Gründe: E10 sieht 249 € als oberes Niveau vor, und Toolkit 2 ist das Produkt mit dem stärksten Termindruck beim Kunden; E14 hat die Gründerregel schon auf 99 € festgelegt, und eine Regel für alle Toolkits ist leichter zu erklären als zwei. Überprüfung: nach den ersten zehn Verkäufen oder am 31. Januar 2027, je nachdem, was früher eintritt.

Wenn du B wählst, weil ein Preis für alles dir wichtiger ist als der Umfang, ist das eine saubere Entscheidung; dann bleibt Toolkit 1 die Referenz und beide Toolkits kosten 199 € oder 99 €.

## Was nach deiner Entscheidung passiert

Claude: Preise je Toolkit in der Konfiguration (`PRICE_*`-Variablen je Produkt, Gründerplätze je Toolkit getrennt gezählt), Toolkit 2 in die Produktliste und auf „zum Verkauf“, Produktseite mit Preis und Kasse, Startseite „Jetzt erhältlich“ für beide, Memos auf die Produktseite umgeleitet, Sitemap, Tests, Muster-Zip. Das Bundle kommt als eigenes Produkt, sobald du den Zeitpunkt freigibst.

Stefan (bestehende Aufgaben): Stripe-Schlüssel und Brevo-Schlüssel als Umgebungsvariablen bei Render, Docker-Hub-Konto, Umsatzsteuer-Frage mit dem Steuerberater, Rechtsprüfung der Entwürfe. Live geht nichts ohne das Tor Veröffentlichen.

## Quellen

- Dossier Scutoria Neustart, Entscheidungen E7, E10, E14, E15, E19, Frage F4; https://claude.ai/artifact/Svu6tyyfTezCn7naCSo2eY, gelesen 19.10.2026.
- `produkte/security-evidence-toolkit/BAUPLAN.md`, Abschnitt 6 und T5, 19.10.2026.
- Cyber Trust Austria, Labelübersicht, cyber-trust.at/labeluebersicht, abgerufen 19.10.2026 (Quellenprotokoll S14).
- Funk International Austria mit Beazley, Versicherungsantrag und Risikofragebogen Cyber-Versicherung, Juli 2022, abgerufen 19.10.2026 (Quellenprotokoll S20, Maklerformular).
- BVMW mit BSI, Leitfaden CyberRisiko-Check, August 2023, abgerufen 19.10.2026 (Quellenprotokoll S15).
- IEC Webstore, ISO/IEC 27001:2022, abgerufen 19.10.2026 (Quellenprotokoll S24).
- orbiqhq.com, EU-Lieferanten-Sicherheitsfragebogen; templates.securityscientist.net; Websuche 19.10.2026, Sekundärquellen, Stand prüfen.
