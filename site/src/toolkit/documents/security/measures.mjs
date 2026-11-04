// The measures behind the status questions of the Security Evidence Toolkit: what to do to reach "in place", and what shows it afterwards.
// Used by the action plan (D2) and the evidence list (D4). Technical measures are shared with the IT provider where the business has one.
export const TECHNICAL = new Set(['C2', 'C3', 'C5', 'D1', 'D2', 'E1', 'E2', 'E3', 'E5', 'H2']);

export const MEASURES = {
  B1: {
    en: { measure: 'Write the security rules for staff on one or two pages: devices, passwords, email, payments, what to report and to whom. The management signs them, every person acknowledges them.', evidence: 'Signed rules with date; acknowledgement list.' },
    de: { measure: 'Die Sicherheitsregeln für die Belegschaft auf ein bis zwei Seiten schreiben: Geräte, Passwörter, E-Mail, Zahlungen, was gemeldet wird und an wen. Die Leitung unterschreibt, jede Person bestätigt die Kenntnisnahme.', evidence: 'Unterschriebene Regeln mit Datum; Liste der Kenntnisnahmen.' },
  },
  C1: {
    en: { measure: 'Give every person their own account. Replace shared logins with delegated access to shared mailboxes; where a tool allows one login only, keep its password in the password manager with a named owner and change it at every departure.', evidence: 'Screenshot of the user list in the admin console, one account per person.' },
    de: { measure: 'Jeder Person ein eigenes Konto geben. Geteilte Logins durch delegierten Zugriff auf gemeinsame Postfächer ersetzen; wo ein Tool nur ein Login erlaubt, liegt das Passwort mit benannter verantwortlicher Person im Passwort-Manager und wird bei jedem Austritt geändert.', evidence: 'Bildschirmfoto der Benutzerliste in der Administrationskonsole, ein Konto je Person.' },
  },
  C2: {
    en: { measure: 'Switch on multi-factor authentication for every email account: an authenticator app or a security key, a code by SMS only as a last resort. Keep the recovery codes offline.', evidence: 'Screenshot of the setting per account or the administrator report.' },
    de: { measure: 'Multi-Faktor-Authentifizierung für jedes E-Mail-Konto einschalten: Authenticator-App oder Sicherheitsschlüssel, ein Code per SMS nur als letzte Möglichkeit. Die Wiederherstellungscodes offline aufbewahren.', evidence: 'Bildschirmfoto der Einstellung je Konto oder der Administratorbericht.' },
  },
  C3: {
    en: { measure: 'Switch on multi-factor authentication for remote access (VPN, remote desktop), every administrator account, the cloud consoles and online banking.', evidence: 'Screenshots or administrator report per system.' },
    de: { measure: 'Multi-Faktor-Authentifizierung für Fernzugriff (VPN, Remote Desktop), jedes Administratorkonto, die Cloud-Konsolen und das Online-Banking einschalten.', evidence: 'Bildschirmfotos oder Administratorbericht je System.' },
  },
  C4: {
    en: { measure: 'Write the list of all accounts per person and add an offboarding checklist that disables them on the day of leaving. Test it on the next departure.', evidence: 'Account list; offboarding checklist with dates.' },
    de: { measure: 'Die Liste aller Konten je Person schreiben und eine Austrittscheckliste anlegen, die sie am Tag des Ausscheidens deaktiviert. Beim nächsten Austritt proben.', evidence: 'Kontenliste; Austrittscheckliste mit Daten.' },
  },
  C5: {
    en: { measure: 'Remove administrator rights from the daily accounts and create separate administrator accounts that are used only for administration.', evidence: 'Account list showing daily and administrator accounts.' },
    de: { measure: 'Administratorrechte aus den täglichen Konten entfernen und getrennte Administratorkonten anlegen, die nur für die Administration benutzt werden.', evidence: 'Kontenliste mit täglichen und Administratorkonten.' },
  },
  C6: {
    en: { measure: 'Roll out a password manager for everyone and write the rule: one long password per account, fifteen characters or more where there is no second factor, changed only on suspicion, checked against breach lists.', evidence: 'Written rule; password manager rolled out (licence or screenshot).' },
    de: { measure: 'Einen Passwort-Manager für alle einführen und die Regel schreiben: ein langes Passwort je Konto, fünfzehn Zeichen oder mehr ohne zweiten Faktor, nur bei Verdacht geändert, gegen Leck-Listen geprüft.', evidence: 'Schriftliche Regel; Passwort-Manager eingeführt (Lizenz oder Bildschirmfoto).' },
  },
  D1: {
    en: { measure: 'Set up daily automatic backups of all business data with one copy out of reach of an attacker: offline, on a rotated disk, or in a cloud copy that cannot be deleted from the office.', evidence: 'Backup settings and schedule; where the copy out of reach is.' },
    de: { measure: 'Tägliche automatische Sicherung aller Geschäftsdaten einrichten, mit einer Kopie außerhalb der Reichweite eines Angreifers: offline, auf einer gewechselten Platte oder in einer Cloud-Kopie, die sich vom Büro aus nicht löschen lässt.', evidence: 'Sicherungseinstellungen und Zeitplan; wo die Kopie außer Reichweite liegt.' },
  },
  D2: {
    en: { measure: 'Restore one folder from the backup, stop the time, write down date, duration and result. Repeat once a year.', evidence: 'Restore test record with date and duration.' },
    de: { measure: 'Einen Ordner aus der Sicherung zurückspielen, die Zeit stoppen, Datum, Dauer und Ergebnis notieren. Einmal im Jahr wiederholen.', evidence: 'Protokoll des Wiederherstellungstests mit Datum und Dauer.' },
  },
  D4: {
    en: { measure: 'Print the emergency card of this toolkit, post it, put one copy in the drawer of the responsible person and one with the deputy at home. Check the numbers before printing.', evidence: 'Emergency card, posted and dated.' },
    de: { measure: 'Die Notfallkarte dieses Toolkits drucken, aushängen, eine Kopie in die Lade der verantwortlichen Person und eine zur Vertretung nach Hause. Die Nummern vor dem Druck prüfen.', evidence: 'Notfallkarte, ausgehängt und datiert.' },
  },
  E1: {
    en: { measure: 'Switch on automatic updates on every computer, phone and server. Check once a month that they ran, and note the check.', evidence: 'Update settings; monthly check note.' },
    de: { measure: 'Automatische Updates auf jedem Computer, Telefon und Server einschalten. Einmal im Monat prüfen, ob sie gelaufen sind, und die Prüfung notieren.', evidence: 'Update-Einstellungen; Notiz der monatlichen Prüfung.' },
  },
  E2: {
    en: { measure: 'Write the device list: device, user, system, supported until. Replace or take off the network every device whose system is no longer supported.', evidence: 'Device list with dates.' },
    de: { measure: 'Die Geräteliste schreiben: Gerät, Nutzer, System, unterstützt bis. Jedes Gerät ersetzen oder vom Netz nehmen, dessen System nicht mehr unterstützt wird.', evidence: 'Geräteliste mit Daten.' },
  },
  E3: {
    en: { measure: 'Switch on the built-in protective software on every computer and encryption on every laptop and phone; note both in the device list.', evidence: 'Screenshot of the protection and encryption status per device.' },
    de: { measure: 'Die eingebaute Schutzsoftware auf jedem Computer und die Verschlüsselung auf jedem Notebook und Telefon einschalten; beides in der Geräteliste vermerken.', evidence: 'Bildschirmfoto des Schutz- und Verschlüsselungsstatus je Gerät.' },
  },
  E4: {
    en: { measure: 'Publish a contact for vulnerability reports and state the support period of your products.', evidence: 'Published contact and support statement.' },
    de: { measure: 'Einen Kontakt für Schwachstellenmeldungen veröffentlichen und den Unterstützungszeitraum der eigenen Produkte angeben.', evidence: 'Veröffentlichter Kontakt und Angabe zum Unterstützungszeitraum.' },
  },
  E5: {
    en: { measure: 'Update the router or firewall, change its administrator password, switch off remote administration, separate the guest network from the business network.', evidence: 'Router settings and the date of the check.' },
    de: { measure: 'Router oder Firewall aktualisieren, das Administratorpasswort ändern, die Fernadministration abschalten, das Gastnetz vom Betriebsnetz trennen.', evidence: 'Router-Einstellungen und das Datum der Prüfung.' },
  },
  F2: {
    en: { measure: 'Name who checks after an incident whether personal data is affected and who reports to the data protection authority within 72 hours of becoming aware. Put both on the emergency card.', evidence: 'Emergency card; the names in the rules.' },
    de: { measure: 'Benennen, wer nach einem Vorfall prüft, ob personenbezogene Daten betroffen sind, und wer binnen 72 Stunden nach Kenntnis an die Datenschutzbehörde meldet. Beides auf die Notfallkarte.', evidence: 'Notfallkarte; die Namen in den Regeln.' },
  },
  F4: {
    en: { measure: 'Start an incident log: one page per incident with what happened, how, what was missing, what was changed, who checked it.', evidence: 'Incident log, even if still empty, with a date.' },
    de: { measure: 'Ein Vorfallsprotokoll anlegen: eine Seite je Vorfall mit dem, was passiert ist, auf welchem Weg, was gefehlt hat, was geändert wurde, wer es geprüft hat.', evidence: 'Vorfallsprotokoll, auch wenn noch leer, mit Datum.' },
  },
  G1: {
    en: { measure: 'Hold a half-hour briefing on phishing, passwords, payments and the reporting channel. Keep the attendance list with date and contents. Repeat once a year and for every new hire.', evidence: 'Attendance list with date and contents.' },
    de: { measure: 'Eine halbstündige Einweisung zu Phishing, Passwörtern, Zahlungen und dem Meldeweg halten. Die Teilnehmerliste mit Datum und Inhalten aufbewahren. Einmal im Jahr und bei jedem Neueintritt wiederholen.', evidence: 'Teilnehmerliste mit Datum und Inhalten.' },
  },
  G2: {
    en: { measure: 'Check the employment contracts for a confidentiality clause; add a signed addendum where it is missing.', evidence: 'Clause in the contracts or signed addenda.' },
    de: { measure: 'Die Dienstverträge auf eine Vertraulichkeitsklausel prüfen; wo sie fehlt, einen unterschriebenen Zusatz nachholen.', evidence: 'Klausel in den Verträgen oder unterschriebene Zusätze.' },
  },
  G3: {
    en: { measure: 'Write the call-back rule: every change of bank details and every unusual payment request is confirmed by a call to a number already known before anything is paid.', evidence: 'Written rule, signed and dated.' },
    de: { measure: 'Die Rückrufregel schreiben: Jede Änderung von Bankdaten und jede ungewöhnliche Zahlungsaufforderung wird vor der Zahlung per Anruf unter einer schon bekannten Nummer bestätigt.', evidence: 'Schriftliche Regel, unterschrieben und datiert.' },
  },
  H1: {
    en: { measure: 'Write the list of providers that handle your data or your customers\' data: provider, country, purpose, contract, contact.', evidence: 'Provider list with country and purpose.' },
    de: { measure: 'Die Liste der Dienstleister schreiben, die Ihre Daten oder die Ihrer Kunden verarbeiten: Anbieter, Land, Zweck, Vertrag, Kontakt.', evidence: 'Dienstleisterliste mit Land und Zweck.' },
  },
  H2: {
    en: { measure: 'Obtain the data processing agreement from every provider that processes personal data on your behalf, and switch on multi-factor authentication and set up a second administrator account for a second person in every provider console.', evidence: 'Agreements filed; console settings.' },
    de: { measure: 'Von jedem Dienstleister, der personenbezogene Daten im Auftrag verarbeitet, den Auftragsverarbeitungsvertrag einholen, und in jeder Anbieterkonsole die Multi-Faktor-Authentifizierung einschalten und ein zweites Administratorkonto für eine zweite Person einrichten.', evidence: 'Verträge abgelegt; Konsoleneinstellungen.' },
  },
  H3: {
    en: { measure: 'Add to the rules that the customer is informed before a provider that handles their data is changed; keep a template email.', evidence: 'Rule; template email.' },
    de: { measure: 'In die Regeln aufnehmen, dass der Kunde informiert wird, bevor ein Dienstleister gewechselt wird, der seine Daten verarbeitet; eine Vorlage für die E-Mail bereithalten.', evidence: 'Regel; E-Mail-Vorlage.' },
  },
  I1: {
    en: { measure: 'Write down how customer data is returned or deleted at the end of a contract and who confirms it in writing.', evidence: 'Rule; confirmation template.' },
    de: { measure: 'Aufschreiben, wie Kundendaten am Vertragsende zurückgegeben oder gelöscht werden und wer das schriftlich bestätigt.', evidence: 'Regel; Vorlage der Bestätigung.' },
  },
};

// Evidence that rests on a document of another answer: the account list (C4), the emergency card (D4), the written rules (B1).
// The evidence list never marks such evidence as in place while that other answer is not "in place".
export const DEPENDS = { C5: ['C4'], F2: ['D4', 'B1'], H3: ['B1'] };
