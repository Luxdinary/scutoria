# Freigabe: bereinigte Rechtstexte (Entwurf 2. November 2026)

Für Stefan. Die bereinigten Fassungen von Impressum, AGB, Datenschutz und Widerruf liegen in `live/rechtstexte-2026-11/`, je Deutsch und Englisch. Impressum und AGB gibt es in zwei Varianten: **A** Kleinunternehmer, **B** Regelbesteuerung. Keine Rechts- oder Steuerberatung; unsichere Punkte tragen „Stand prüfen“.

## Kurz

- Alle Klammern „Stand prüfen“ aus den Entwürfen sind mit Quelle aufgelöst. Übrig bleiben nur Stellen, die du oder der Steuerberater füllen müsst: Wortlaut der Gewerbeberechtigung und Fachgruppe aus dem GISA-Auszug, die UID-Nummer, ein Satz zu Geschäftskunden in anderen EU-Staaten und das Datum der Veröffentlichung.
- **Drei Befunde aus dem Code, die die heutigen Texte nicht oder falsch beschreiben:**
  1. **Löschfristen:** Nichts wird automatisch gelöscht. Die versprochenen Fristen, etwa „nach 90 Tagen“, sind nicht umgesetzt.
  2. **Versandprotokoll:** Die Website protokolliert jede Mail (Empfänger, Betreff, Zeitpunkt, Ergebnis; bei Fehlern auch den Text). Das steht nirgends.
  3. **Missbrauchsschutz:** Er speichert einen Hashwert der E-Mail-Adresse für 24 Stunden. Auch das steht nirgends.
- **Zwei Befunde aus dem Gesetz (FAGG), Stand prüfen:**
  1. **Vertragsbestätigung fehlt:** Damit das Rücktrittsrecht bei digitalen Inhalten erlischt, muss der Kunde zustimmen, den Verlust bestätigen und eine Vertragsbestätigung bekommen (§ 18 Abs. 1 Z 11 lit c in Verbindung mit § 7 Abs. 3 FAGG). Unsere Zugangsmail bestätigt den Vertrag heute nicht. Bis das behoben ist, könnte ein Verbraucher trotz sofortigem Zugang innerhalb von 14 Tagen zurücktreten.
  2. **Rücktrittsfunktion fehlt:** Seit 1. Oktober 2026 verlangt § 13a FAGG für Verträge, die online geschlossen werden, eine Online-Funktion zum Rücktritt, beschriftet „Vertrag widerrufen“ oder gleichwertig. Die gibt es auf scutoria.com nicht.
- **Empfehlung:** Erst die Entscheidungen R1 bis R10 unten, dann der Steuerberater, dann eine Lovable-Runde, die Texte und Technik zusammen umsetzt. Live geht alles erst auf dein Wort.

## Deine Entscheidungen

| Nr | Frage | Empfehlung | Wirkt in |
|---|---|---|---|
| R1 | Wie lange bleibt eine Adresse für die Benachrichtigung über das nächste Toolkit gespeichert? Heute steht „90 Tage“, das nächste Toolkit hat aber keinen Termin. | bis zur Benachrichtigung, spätestens zwölf Monate | Datenschutz |
| R2 | Wie lange bleiben Memo-Anforderungen gespeichert? | 90 Tage | Datenschutz |
| R3 | Wie lange bleiben Antworten und Dokumente nach Lizenzende abrufbar? Danach werden sie gelöscht. | zwölf Monate | Datenschutz, AGB § 8 |
| R4 | Sollen die Fristen automatisch durchgesetzt werden? Lovable kann das als tägliche Löschung in der Datenbank bauen, ohne Geheimnis und ohne Aufruf von außen. Ohne R4 dürfen die Texte keine Fristen versprechen. | ja | Technik |
| R5 | Gilt bei Abweichungen zwischen Deutsch und Englisch die deutsche Fassung? | ja | AGB § 3 |
| R6 | Soll die Zugangsmail nach dem Kauf eine Vertragsbestätigung enthalten (Produkt, Preis, Laufzeit, AGB-Fassung, Ihre Zustimmung zum sofortigen Beginn)? Text in `zugangsmail-vertragsbestaetigung.md`. | ja | Mail, AGB § 6, Widerruf |
| R7 | Wie lange bleibt das Versandprotokoll gespeichert? | zwölf Monate | Datenschutz |
| R8 | Soll Lovable die Funktion „Vertrag widerrufen“ bauen: Link im Fußbereich jeder Seite, Formular mit E-Mail-Adresse und Bestellung, Eingangsbestätigung per E-Mail, Meldung an kontakt@scutoria.com? | ja; ob sie für unseren Fall nötig ist, klärt am besten ein Anwalt (R10) | Technik, AGB § 6, Widerruf |
| R9 | Sollen Memo-Adressen weiter zusätzlich in die Kontaktliste 2 bei Brevo wandern? Die Liste dient keinem eigenen Zweck, die Einwilligung deckt nur den einmaligen Versand, und die Löschung dort wäre Handarbeit. | nein, ausschalten | Datenschutz, Technik |
| R10 | Sollen die Texte vor dem regulären Verkauf von einem Anwalt geprüft werden? Offene Punkte für ihn: Schaltfläche in der Stripe-Kasse (§ 8 Abs. 2 FAGG), ein gemeinsames Häkchen für AGB und sofortigen Beginn, Pflicht zur Rücktrittsfunktion (§ 13a FAGG). Danach könnte das Datum der Rechtsprüfung eingetragen werden (`legalReviewedAt`). | ja, vor dem ersten regulären Verkauf (Tor Geld) | alle |

## Fragen an den Steuerberater

| Nr | Frage |
|---|---|
| S1 | Kleinunternehmer nach § 6 Abs. 1 Z 27 UStG oder Regelbesteuerung? Die Grenze liegt bei 55.000 Euro Jahresumsatz, gerechnet als gesamtes vereinbartes Entgelt (RIS, UStG § 6, und Unternehmensserviceportal, abgerufen 2.11.2026). Davon hängt ab, ob Variante A oder B gilt. |
| S2 | Verkäufe an Verbraucher in anderen EU-Staaten (elektronisch erbrachte Leistungen): Ab welchem Umsatz gilt die Umsatzsteuer des Kundenlandes, und ist eine Registrierung im OSS nötig? |
| S3 | Verkäufe an Unternehmen in anderen EU-Staaten mit UID: Gilt Reverse-Charge auch als Kleinunternehmer? Braucht Scutoria dafür eine UID? Welcher Satz gehört in AGB und Rechnung? |
| S4 | Stripe Tax ist eingeschaltet (Preise inklusive Steuer). Welche Registrierungen sind in Stripe einzutragen, oder soll die automatische Steuerberechnung aus? Als Kleinunternehmer darf die Kasse keine Umsatzsteuer ausweisen. |
| S5 | Erfüllen die Rechnungen, die Stripe erzeugt, die Angaben nach § 11 UStG, einschließlich des Kleinunternehmer-Hinweises in Variante A? |

## Gewerbe (du)

- Aus dem GISA-Auszug: der genaue Wortlaut der Gewerbeberechtigung und die Fachgruppe der Wirtschaftskammer.
- **Behörde:** Gewerbebehörde ist die Bezirkshauptmannschaft Waidhofen an der Thaya. Vitis liegt in diesem Bezirk (noe.gv.at, abgerufen 2.11.2026), und erste Instanz ist die Bezirksverwaltungsbehörde (§ 333 GewO). Die Klammer „Stand prüfen“ ist deshalb gestrichen.

## Was sich je Datei ändert (gegenüber der Fassung, die live ist)

- **Impressum:** Behörde ohne Klammer. Hinweis auf das Ende der EU-Plattform zur Streitbeilegung mit Verordnung (EU) 2024/3228. Umsatzsteuer je nach Variante.
- **AGB:**
  - Hausnummer ergänzt; XLSX im Leistungsumfang.
  - Keine Beschriftung der Stripe-Schaltfläche mehr im Text, weil sie nicht belegt ist.
  - Deutsche Fassung gilt bei Abweichungen.
  - Umsatzsteuer je nach Variante.
  - Rücktrittsrecht mit Hinweis auf Vertragsbestätigung und Rücktrittsfunktion.
  - Dokumente nach Lizenzende zwölf Monate abrufbar, danach gelöscht.
- **Datenschutz:**
  - Hausnummer; § 165 Abs. 3 TKG 2021 ohne Klammer.
  - Cloudflare als Auslieferung über Lovable.
  - Server-Protokolle: Lovable ist dafür selbst verantwortlich und nennt keine feste Frist.
  - Neu: Abschnitte „Schutz vor Missbrauch“ und „E-Mail-Versand und Versandprotokoll“. Brevo mit der Gesellschaft für Kunden in Österreich (Brevo GmbH, Berlin).
  - Die Benachrichtigung heißt jetzt „über das nächste Toolkit“, statt „sobald das erste Produkt erhältlich ist“.
  - Der Newsletter-Abschnitt und die Brevo-Kontaktliste entfallen.
  - Stripe-Rollen nach Stripes eigener Darstellung.
  - Alle Fristen nach R1 bis R4 und R7.
- **Widerruf:** Hausnummer, Rücktrittsfunktion, Bedingungen des Erlöschens vollständig mit Bestätigung.

## Noch Stand prüfen

- **Brevo:** Für Kunden in Österreich nennen die Bedingungen die Brevo GmbH in Berlin als Vertragspartner. Ob das bei dir gilt, zeigt die Brevo-Rechnung. Steht dort Brevo SAS, ändere ich die Angabe.
- **Schaltfläche in der Stripe-Kasse:** Laut Stripe-Dokumentation steht in der Kasse „Buy“ bzw. ein Kauf-Wort. Den deutschen Wortlaut zeigt erst der Probekauf. § 8 Abs. 2 FAGG verlangt „zahlungspflichtig bestellen“ oder eine gleichwertig eindeutige Formulierung (R10).
- **Häkchen in der Kasse:** Es fasst Zustimmung zu den AGB und Verlangen des sofortigen Beginns in einem Kästchen zusammen. Ob getrennte Häkchen nötig sind, gehört zu R10.

## Was nach deiner Freigabe passiert

1. Ich übertrage die gewählten Fassungen (A oder B nach dem Steuerberater) byte-genau zu Lovable.
2. Eine Lovable-Runde baut dazu:
   - die tägliche Löschung (R4)
   - die Vertragsbestätigung in der Zugangsmail (R6)
   - die Funktion „Vertrag widerrufen“ (R8)
   - das Ende der Brevo-Liste (R9)
   - die Umleitungen `/en` und `/imprint`, „Bis zu vierunddreißig Fragen“ und die neuen Vorschaubilder
3. Veröffentlichen nur auf dein Wort. Danach Live-Schalter und Probekauf, wenn das Gewerbe steht.

## Quellen (alle abgerufen am 2. November 2026)

- **TKG 2021 § 165 Abs. 3 (Cookies ohne Einwilligung, wenn unbedingt erforderlich):** https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20011678&Paragraf=165
- **FAGG:**
  - § 8 Abs. 2: https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20008847&Paragraf=8
  - § 18 Abs. 1 Z 11: https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20008847&Paragraf=18
  - § 13a in der Fassung BGBl. I Nr. 59/2026, in Kraft seit 1.10.2026 für Verträge ab diesem Tag: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20008847
  - Das Gesetz nennt das Recht „Rücktrittsrecht“, die amtlichen Muster heißen „Widerrufsbelehrung“ und „Muster-Widerrufsformular“.
- **UStG § 6 Abs. 1 Z 27 (Kleinunternehmergrenze 55.000 Euro):**
  - https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=6
  - https://www.usp.gv.at/themen/steuern-finanzen/umsatzsteuer-ueberblick/weitere-informationen-zur-umsatzsteuer/weitere-steuertatbestaende-und-befreiungen/kleinunternehmen.html
- **Verordnung (EU) 2024/3228 (Ende der Plattform zur Online-Streitbeilegung am 20. Juli 2025):** http://data.europa.eu/eli/reg/2024/3228/oj
- **Vitis, Bezirk Waidhofen an der Thaya:** https://noe.gv.at/noe/Vitis.html
- **§ 333 GewO:** https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10007517&Paragraf=333
- **Lovable:**
  - Nutzungsbedingungen, Stand 28.8.2026: https://lovable.dev/terms
  - Auftragsverarbeitungsvertrag, Stand 6.11.2025, mit Anschrift Boston und der Rolle als selbst Verantwortlicher für Protokolldaten: https://lovable.dev/data-processing-agreement
  - Unterauftragsverarbeiter (Cloudflare für Routing, DNS und Workers; Supabase für Datenbanken): https://trust.lovable.dev/subprocessors
  - Cloud auf Basis von Supabase: https://docs.lovable.dev/features/cloud
- **Brevo:** Nutzungsbedingungen, Fassung 1.10.2025 (Brevo SAS, Paris; für Kunden in Deutschland, der Schweiz und Österreich Brevo GmbH, Berlin; Auftragsverarbeitung als Anhang): https://www.brevo.com/legal/termsofuse/
- **Stripe:**
  - Privacy Center (Rollen als Auftragsverarbeiter und als Verantwortlicher): https://stripe.com/ie/legal/privacy-center
  - Datenschutzerklärung, Stand 28.4.2026: https://stripe.com/ie/privacy
  - Anschrift Stripe Payments Europe, Limited: https://stripe.com/ie/legal/france-legal-notice
  - Schaltfläche der Kasse (`submit_type`): https://docs.stripe.com/api/checkout/sessions/create
- **Cloudflare, „Cloudflare Cookies“, Stand 12.10.2026 (`__cf_bm`, 30 Minuten ohne Aktivität):** https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- **Code bei Lovable, gelesen am 2.11.2026:**
  - `src/legacy/db.mjs`: keine Löschung, Sitzungen 30 Tage, Missbrauchsschutz mit SHA-256 und 24 Stunden.
  - `src/legacy/mail.mjs`: Versandprotokoll; Zugangsmail ohne Vertragsbestätigung.
  - `src/legacy/config.mjs`: Stripe Tax an, Preise inklusive Steuer, Brevo-Liste 2.
  - `src/legacy/memos/routes.mjs`: Memo-Adressen in die Brevo-Liste.
