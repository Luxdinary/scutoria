# Datenschutz nach dem Umzug zu Lovable: Entwurf und eine offene Vertragsfrage

Stand 23.10.2026. Für Stefan, Tor Recht: nichts davon geht live ohne dein Wort. Keine Rechtsberatung; was mit „Stand prüfen“ markiert ist, bitte mit dem Steuerberater oder einer Datenschutzstelle klären.

## Die offene Vertragsfrage zuerst

Lovable schreibt auf der Seite zum Auftragsverarbeitungsvertrag: „If you're on a Business or Enterprise plan, your usage includes our Data Processing Agreement (DPA).“ Pro wird nicht genannt (lovable.dev/data-processing-agreement, Stand 6.11.2025, abgerufen 23.10.2026). Dein Arbeitsbereich steht auf Pro. Wer Kundendaten (E-Mail-Adressen, Antworten im Generator, Käufe) bei einem Dienstleister verarbeiten lässt, braucht nach Art. 28 DSGVO einen solchen Vertrag mit ihm. Stand prüfen.

Der DPA stützt Übermittlungen außerhalb des EWR auf die EU-Standardvertragsklauseln (Abschnitt 8.2, gleiche Quelle). Vertragspartner ist Lovable Labs Sweden AB, Regeringsgatan 25, 111 53 Stockholm, Schweden (lovable.dev/privacy, Stand 15.9.2026, abgerufen 23.10.2026). Die Liste der Unterauftragsverarbeiter steht im Trust Center (trust.lovable.dev/subprocessors); deren Inhalt ist nicht ermittelbar, weil der Abruf von hier aus gesperrt war.

Preise laut docs.lovable.dev/introduction/subscription-plans (abgerufen 23.10.2026): Pro ab 25 USD im Monat, Business ab 50 USD im Monat. Eigene Domain gibt es in beiden.

Optionen (Tor Geld und Recht):
- **A, Empfehlung:** Lovable-Support schriftlich fragen, ob der DPA auch für Pro abgeschlossen werden kann, und die Antwort ablegen. Kostet nichts. Kommt kein Ja vor dem Live-Gang, dann B.
- **B:** Auf Business wechseln (ab 50 USD im Monat statt 25 USD), damit ist der DPA laut Lovable enthalten.
- **C:** Daten nicht bei Lovable halten (zurück zu Render in Frankfurt oder eigene Datenbank mit eigenem Vertrag). Das macht einen Teil des Umzugs rückgängig.

## Vorschlag für die geänderten Absätze

Nur diese Absätze ändern sich; alles andere in `site/content/legal/datenschutz.de.md` und `privacy.en.md` bleibt. In eckigen Klammern: noch zu prüfen.

### Grundsatz (ersetzt den ersten Satz, denn das Konto setzt seit 19.10. ein Sitzungs-Cookie)

DE: Diese Website setzt ein einziges Cookie: das Sitzungs-Cookie Ihres Kundenkontos, nur wenn Sie sich anmelden, und nur so lange, wie Sie angemeldet bleiben (höchstens 30 Tage). Es ist für die Anmeldung technisch notwendig und braucht keine Einwilligung [§ 165 Abs. 3 TKG 2021, Stand prüfen]. Sie verwendet keine Werbe- oder Analysedienste Dritter und lädt keine Schriften oder Skripte von fremden Servern. Was verarbeitet wird, steht hier vollständig.

EN: This website sets one cookie only: the session cookie of your customer account, only when you sign in and only for as long as you stay signed in (thirty days at most). It is technically necessary for signing in and needs no consent [§ 165(3) Austrian Telecommunications Act 2021, to be checked]. It uses no third-party advertising or analytics services and loads no fonts or scripts from other servers. What is processed is listed here in full.

(Der bisherige Satz „Der einzige Dritte, der Daten erhält, ist der Zahlungsdienst Stripe beim Kauf.“ stimmt nicht mehr und fällt weg; Hosting, Datenbank und Mailversand stehen in den Abschnitten darunter.)

### Hosting, Datenbank und Server-Protokolle (ersetzt den Render-Absatz)

DE: Die Website wird von Lovable Labs Sweden AB, Regeringsgatan 25, 111 53 Stockholm, Schweden, betrieben und ausgeliefert; die Server-Programme laufen [auf der Infrastruktur von Cloudflare, Inc., Stand prüfen]. Ihre Daten aus Konto, Generator, Warteliste und Memo-Anforderungen liegen in einer Datenbank von Lovable Cloud [betrieben mit Supabase, Inc., Stand prüfen] in einem Rechenzentrum von Amazon Web Services in Irland (Region eu-west-1). Beim Aufruf verarbeiten diese Anbieter technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browserkennung) in Protokollen, um den Dienst bereitzustellen und abzusichern. Speicherdauer der Protokolle: [laut Lovable, Stand prüfen]. Rechtsgrundlage: berechtigtes Interesse am sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO) und, für Konto und Kauf, die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Auftragsverarbeitung mit Lovable: [Vertrag nach Art. 28 DSGVO, Stand prüfen]. Soweit Daten in Länder außerhalb des EWR gelangen, geschieht das auf Grundlage der EU-Standardvertragsklauseln [laut Vertrag mit Lovable, Stand prüfen].

EN: The website is run and delivered by Lovable Labs Sweden AB, Regeringsgatan 25, 111 53 Stockholm, Sweden; the server programs run [on infrastructure of Cloudflare, Inc., to be checked]. Your data from the account, the generator, the waitlist and memo requests is held in a Lovable Cloud database [operated with Supabase, Inc., to be checked] in an Amazon Web Services data centre in Ireland (region eu-west-1). When you visit, these providers process technically necessary data (IP address, time, requested address, browser identifier) in logs to provide and secure the service. Log retention: [per Lovable, to be checked]. Legal basis: legitimate interest in secure operation (Art. 6(1)(f) GDPR) and, for account and purchase, performance of the contract (Art. 6(1)(b) GDPR). Data processing agreement with Lovable: [agreement under Art. 28 GDPR, to be checked]. Where data reaches countries outside the EEA, this happens on the basis of the EU standard contractual clauses [per the agreement with Lovable, to be checked].

### Konto und Lizenz (ein Satz ergänzt)

DE, am Ende anfügen: Für die Anmeldung setzen wir das oben genannte Sitzungs-Cookie; Anmeldelinks gelten dreißig Minuten (aus der Willkommensmail sieben Tage) und funktionieren einmal.

EN, append: For signing in we set the session cookie named above; sign-in links are valid for thirty minutes (seven days from the welcome mail) and work once.

## Was sonst noch vor dem Live-Gang offen ist (aus den Entwürfen)

- Impressum: Hausnummer, Bezeichnung und Fachgruppe laut GISA-Auszug, UID sobald erteilt.
- AGB: Preisangabe inklusive Umsatzsteuer und Reverse Charge, Verlängerung (Steuerberater, E19).
- Datenschutz: Speicherdauer 90 Tage für Warteliste und Memo-Kontakte bestätigen; Brevo als Auftragsverarbeiter (Sendinblue SAS, Paris) bestätigen; Aufbewahrung der Generator-Antworten nach Lizenzende.
- Danach `LEGAL_REVIEWED_AT` setzen; erst dann zeigt die Website die Texte ohne Entwurfshinweis.
