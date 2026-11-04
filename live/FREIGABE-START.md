# Scutoria: Freigabe zum Start

Stand 30. Oktober 2026, 17:30. Vorbereitet von Claude nach deinem Auftrag vom 30.10. („Übernimm den technischen Abschluss …“). Alte Statusangaben wurden heute neu geprüft; was hier steht, ist der geprüfte Stand. Nichts davon ist live geschaltet, bezahlt oder an der Domain geändert.

## 1 Rechtstexte zur Freigabe

Die Texte liegen unter `site/content/legal/`. Die Kennung ist der Anfang der SHA-256-Prüfsumme der Datei; damit ist die Fassung eindeutig. Auf https://scutoria.lovable.app stehen bisher die Fassungen vom 26. und 30. Oktober (Impressum, Datenschutz, AGB und Widerruf vom 18.10.); die heutigen Berichtigungen gehen erst mit deiner Freigabe hinüber.

| Text | Datei | Fassung | Kennung | Offene Klammern |
|---|---|---|---|---|
| Impressum DE | impressum.de.md | Entwurf 30.10.2026 | 49ed4a2b3fbf | 6 |
| Impressum EN | legal-notice.en.md | Entwurf 30.10.2026 | 9a2a33da192e | 6 |
| Datenschutz DE | datenschutz.de.md | Entwurf 30.10.2026 | a8f782756ffd | 15 |
| Datenschutz EN | privacy.en.md | Entwurf 30.10.2026 | 9910cd12cf22 | 15 |
| AGB DE | agb.de.md | Entwurf 30.10.2026 | aad977ae45c0 | 6 |
| AGB EN | terms.en.md | Entwurf 30.10.2026 | a2f9602c1300 | 6 |
| Widerruf mit Muster-Widerrufsformular DE | widerruf.de.md | Entwurf 18.10.2026 | 5a7f4c9d9df4 | 0 |
| Widerruf mit Muster-Widerrufsformular EN | withdrawal.en.md | Entwurf 18.10.2026 | 61ceac0bf2a9 | 0 |

Heute geändert:

- **Datenschutz DE/EN:** Vertragspartner bei Lovable berichtigt. Lovables Nutzungsbedingungen (Fassung vom 28. August 2026, abgerufen 30.10.2026 auf lovable.dev/terms) und der Auftragsverarbeitungsvertrag (lovable.dev/data-processing-agreement, „Last updated: November 6, 2025“, abgerufen 30.10.2026) nennen **Lovable Labs Incorporated, 1 Lincoln St, Boston, MA 02111, USA**, nicht die schwedische Gesellschaft. Damit gehen Daten in die USA; die EU-Standardvertragsklauseln dafür stehen in Lovables Auftragsverarbeitungsvertrag, den es nur im Business-Tarif gibt (Abschnitt 3).
- **AGB DE/EN, Punkt 3:** Der Text sprach von einer Schaltfläche „Zahlungspflichtig bestellen“, die es nicht gibt. Jetzt beschreibt er den echten Ablauf: „Jahreslizenz kaufen“ auf der Website, dann die Zahlungsschaltfläche auf der Seite von Stripe („Bezahlen“). Ob diese Beschriftung § 8 Abs. 2 FAGG genügt, ist mit „Stand prüfen“ markiert.
- **Impressum DE/EN:** Hausnummer 18 aus dem Stripe-Konto eingesetzt.

## 2 Deine Freigabe (Vorlage, soweit möglich vorausgefüllt)

```
Scutoria – Freigabe der Rechtstexte
Ich gebe folgende Fassungen zur Veröffentlichung frei:
* Impressum DE/EN: Entwurf 30.10.2026 (49ed4a2b3fbf / 9a2a33da192e), mit den Angaben unten ergänzt
* Datenschutzerklärung DE/EN: Entwurf 30.10.2026 (a8f782756ffd / 9910cd12cf22)
* AGB DE/EN: Entwurf 30.10.2026 (aad977ae45c0 / a2f9602c1300)
* Widerrufsbelehrung samt Musterformular DE/EN: Entwurf 18.10.2026 (5a7f4c9d9df4 / 61ceac0bf2a9)

Bestätigte Anbieterangaben
Vollständiger Name/Firma: Stefan Dallinger            [bitte bestätigen]
Anschrift einschließlich Hausnummer: Kleinpoppen 18, 3902 Vitis, Österreich   [bitte bestätigen; aus dem Stripe-Konto]
Gewerbebezeichnung: […]                               [laut GISA-Auszug, mit GISA-Zahl]
Gewerbebehörde und WKO-Fachgruppe: BH Waidhofen an der Thaya [bestätigen] / […]
UID beziehungsweise zutreffende Steuerregelung: […]
Kontaktadresse: kontakt@scutoria.com                  [bitte bestätigen]
Noch offene Änderungen oder Fragen: […]
Lovable-Auftragsverarbeitungsvertrag:
[ ] Für unseren Tarif und die verwendeten Dienste nachweislich geklärt; Nachweis: […]
[x] Noch offen. Diese Freigabe umfasst deshalb noch keinen regulären Kundenbetrieb.
Freigabe durch: Stefan Dallinger
Datum: […]
```

Konkret offene Fragen, die nur du beantworten kannst (zu jeder steht im Text eine Klammer):

1. **Umsatzsteuer.** Kleinunternehmer oder Regelbesteuerung, UID-Nummer. Davon hängen Impressum, AGB Punkt 4 und die Preisangabe ab. Der alte Shop weist 20 % aus und sagt „inklusive Umsatzsteuer“ (scutoria.com/de/agb, abgerufen 30.10.2026); die neue Kasse rechnet mit Stripe Tax und Preisen „inklusive“.
2. **Reverse Charge** für Firmenkunden in anderen EU-Ländern mit UID (AGB Punkt 4). Stripe fragt die UID in der Kasse ab.
3. **Vorrang der deutschen Fassung** bei Abweichungen (AGB Punkt 3): ja oder nein.
4. **Dokumente nach Lizenzende** zwölf Monate abrufbar (AGB Punkt 8, Datenschutz „Konto und Lizenz“): ja oder andere Dauer.
5. **Löschfristen:** Warteliste und Memo-Kontakte nach 90 Tagen (Datenschutz): passt das.
6. **Schaltflächenbeschriftung** „Bezahlen“ bei Stripe (AGB Punkt 3): akzeptierst du das ohne weitere Prüfung.
7. **Stripe als Verantwortlicher oder Auftragsverarbeiter** für Rechnung, Steuer und Kundenportal (Datenschutz „Kauf“): Klammer bleibt, bis du sie bestätigst oder prüfen lässt.

## 3 Vertrag mit Lovable (Tor Recht und Geld)

- **Antwort des Lovable-Supports vom 30.10.2026, 13:33** (in deinem Gmail): Der Auftragsverarbeitungsvertrag gilt nur für Business und Enterprise; für Free und Pro gibt es keinen. Weg dorthin ist das Upgrade auf Business. Die Antwort ist laut Fußzeile vom KI-Support-Agenten von Lovable verfasst.
- **Preis:** Pro 25 € im Monat, Business 50 € im Monat bei monatlicher Zahlung, jährlich „2 Monate kostenlos“ (lovable.dev/de/pricing, abgerufen 30.10.2026). Mehrkosten also 25 € im Monat oder rund 250 € im Jahr bei jährlicher Zahlung (Stand prüfen am Zahlschirm).
- **Empfehlung:** Business vor dem ersten echten Kunden. Ohne den Vertrag fehlen die Standardvertragsklauseln für die Übermittlung in die USA, und deine Vorlage sagt selbst: kein regulärer Kundenbetrieb. Die Entscheidung ist deine (Tor Geld); ich wechsle den Tarif nicht.

## 4 Prüfergebnisse vom 30. Oktober 2026

| Prüfung | Ergebnis |
|---|---|
| Veröffentlichte Website https://scutoria.lovable.app | Alle Seiten, Rechtsseiten, Sitemap, Konto und `/wartung.html` antworten mit 200; Vorschaumodus (nicht indexiert) |
| `/health` | Kasse „stripe“, Mail „true“, Webhook „false“ (Signiergeheimnis fehlt noch), Rechtstexte „nicht geprüft“ |
| Kasse | Drei Checkout-Sitzungen bei Stripe live geöffnet, ohne Zahlung (KI-Richtlinien EN, Sicherheitsnachweis EN und DE): Stripe nimmt die Einrichtung mit Steuer, Rechnung, UID-Abfrage und AGB-Zustimmung an. Die Sitzungen verfallen unbezahlt nach 24 Stunden |
| Abo oder Einmalkauf | Einmalkauf (`mode: payment`), keine automatische Verlängerung; Verlängerung, Zahlungsausfall und Kündigung eines Abos entfallen. Die AGB Punkt 8 sagen dasselbe |
| Webhook-Endpunkt | Vorhanden: `/api/public/hooks/stripe` reicht an den Handler weiter. Signatur wird geprüft (HMAC-SHA256 über den Rohtext, 5 Minuten Toleranz, zeitkonstanter Vergleich); Lizenz nur bei `payment_status = paid`; jedes Ereignis nur einmal; eine Lizenz je Checkout-Sitzung (eindeutiger Index in der Datenbank) |
| Gefundene Fehler | (A) Schlägt die Freischaltung im Webhook fehl, wurde das Ereignis trotzdem als erledigt vermerkt; Stripes Wiederholung wäre ignoriert worden. (B) Treffen Rückkehrseite und Webhook gleichzeitig ein, bekam einer der beiden einen Fehler, der Käufer eventuell eine Fehlerseite. Beide behoben bei Lovable am 30.10. (Commit e3dc736, 132 von 132 Tests grün, mit Tests für Wiederholung und gleichzeitige Freischaltung). Noch nicht veröffentlicht |
| Fenster nach Zahlung geschlossen | Dann legt nur der Webhook die Lizenz an. Deshalb gehört der Webhook vor den ersten Verkauf (Abschnitt 5, Punkt 4) |
| Mail | Memo-Mail vom 29.10. mit PDF in Gmail angekommen. Zwei Mails vom 30.10. 15:48 und 15:49 (Memo, Anmeldelink) hat Brevo angenommen, in Gmail sind sie bis 17:30 nicht angekommen, auch nicht im Spam. Brevos Sperre „Autorisierte IPs“ lehnte um 17:05 erneut eine Lovable-Adresse ab. Zusätzlich eingebaut (Commit e3dc736): ein Wiederholungsversuch je Mail bei Netzfehler, 401, 429 oder 5xx, und ein Hinweis auf der Kaufbestätigung, falls die Mail nicht rausging. Die Ursache, Brevos IP-Sperre, löst nur das Abschalten bei Brevo |
| AGB-Link in der Kasse | Stripe verlinkt in der Zustimmung die AGB-Adresse aus deinem Stripe-Konto. Solange scutoria.com noch auf den alten Shop zeigt, führt dieser Link auf die alten AGB. **Folge: Probekauf und erster Verkauf erst nach dem Domainwechsel** |

## 5 Geplante DNS-Änderungen bei GoDaddy

**Sicherung:** `live/dns/dns-sicherung-2026-10-30_1708.txt` (abgefragt über Google Public DNS am 30.10.2026, 17:08). Nameserver: GoDaddy (ns03/ns04.domaincontrol.com).

**Heute eingetragen, bleibt unverändert (E-Mail):**

| Name | Typ | Wert | Zweck |
|---|---|---|---|
| @ | MX | 0 scutoria-com.mail.protection.outlook.com | Postfach kontakt@scutoria.com (Microsoft 365) |
| @ | TXT | v=spf1 include:secureserver.net -all | SPF |
| @ | TXT | NETORGFT21105009.onmicrosoft.com | Microsoft-365-Nachweis |
| @ | TXT | brevo-code:fe292ffdd44e84c1f986f9197de27d17 | Brevo-Nachweis |
| _dmarc | TXT | v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com | DMARC |
| brevo1._domainkey | CNAME | b1.scutoria-com.dkim.brevo.com | Brevo DKIM |
| brevo2._domainkey | CNAME | b2.scutoria-com.dkim.brevo.com | Brevo DKIM |

**Wird geändert (Website):**

| Name | Heute | Neu |
|---|---|---|
| @ | A 216.24.57.1 (Render, alter Shop) | A 185.158.133.1 (Lovable) |
| www | CNAME swk-shop.onrender.com | A 185.158.133.1, oder der Wert, den Lovable im Fenster „Complete setup“ für www anzeigt |
| _lovable | fehlt | TXT `lovable_verify=…` (Wert zeigt Lovable nach „Connect domain“) |
| _lovable.www | fehlt | TXT, falls Lovable ihn für www verlangt |

AAAA-Einträge und CAA-Einträge gibt es heute keine; das ist für Lovable richtig (docs.lovable.dev/features/custom-domain, abgerufen 30.10.2026).

**Ablauf:**

1. Einen Tag vorher: TTL von `@` (A) und `www` (CNAME) bei GoDaddy von 3600 auf 600 Sekunden senken, damit ein Rückweg schnell greift.
2. Lovable: Projekt „Scutoria“, Settings, Domains, „Connect domain“, `scutoria.com` als Hauptdomain, Weiterleitung von www an. Lovable zeigt die Werte.
3. GoDaddy: die drei bis vier Einträge oben ändern oder anlegen, nichts anderes.
4. Warten, bis Lovable „Live“ und ein gültiges Zertifikat meldet (meist Stunden, höchstens 72).
5. Prüfen auf scutoria.com: alle Seiten, Anmeldung, Memo-Mail, Kasse, Kundenportal, Webhook-Test aus dem Stripe-Dashboard.
6. Erst dann, auf dein Wort: alten Shop bei Render pausieren, Wartungsmodus aus.

**Rückweg:** `@` wieder A 216.24.57.1, `www` wieder CNAME swk-shop.onrender.com, TXT `_lovable` darf bleiben. Der alte Shop ist bei Render weiter mit scutoria.com verbunden und antwortet sofort wieder. Mit TTL 600 greift das in etwa zehn Minuten.

## 6 Was du jetzt tun musst

1. **Brevo:** unter https://app.brevo.com/security/authorised_ips die Beschränkung ganz deaktivieren; dann unter Transactional, Logs nachsehen, was mit den zwei Mails vom 30.10. 15:48 und 15:49 passiert ist.
2. **Freigabe** oben ausfüllen (Abschnitt 2), mindestens Gewerbe, Kammer, Steuer und Datum.
3. **Lovable Business** ja oder nein (Abschnitt 3).
4. **Stripe-Dashboard:** Developers, Webhooks, Ziel `https://scutoria.com/api/public/hooks/stripe`, Ereignisse `checkout.session.completed` und `checkout.session.async_payment_succeeded`, Signiergeheimnis als `STRIPE_WEBHOOK_SECRET` in Lovable (Projekt „Scutoria“, Secrets). Prüfe dabei unter Settings, Business, Public details, welche AGB-Adresse eingetragen ist.
5. **Domain:** Wenn du willst, dass ich die Klicks bei Lovable und GoDaddy mache, melde dich im eingebauten Browser bei beiden an und sag Bescheid; ich ändere nur die Einträge aus Abschnitt 5 und erst nach deinem Wort.

## 7 Was ich ohne dein ausdrückliches Wort nicht tue

Live schalten, DNS ändern, Lovable-Tarif wechseln, einen echten Kauf auslösen, den alten Shop pausieren, Rechtstexte ohne deine Freigabe als geprüft markieren.
