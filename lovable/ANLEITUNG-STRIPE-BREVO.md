# Anleitung: Schlüssel für Stripe und Brevo in Lovable eintragen

Stand 23.10.2026. Dauer etwa 15 Minuten. Du brauchst: Zugang zu Stripe, Brevo und Lovable, dein Handy für die Stripe-Bestätigung.

Grundregel: Schlüssel nur in die Felder bei Stripe, Brevo und Lovable kopieren. Nie in den Chat, nie in eine Datei. Ein Schlüssel wird jeweils nur einmal angezeigt; wenn du ihn verlierst, legst du einfach einen neuen an.

**Render: nichts zu tun.** Die Schlüssel kommen jetzt in das Lovable-Projekt „Scutoria“. Der Render-Dienst `scutoria-site` (Rückweg) und der alte Shop `swk-shop` bleiben unverändert.

---

## Teil 1: Stripe, eingeschränkter Live-Schlüssel (5 Minuten)

1. Öffne https://dashboard.stripe.com/apikeys und prüfe oben, dass du im **Live-Modus** bist (nicht „Sandbox“ oder „Testmodus“).
2. Klicke auf **Eingeschränkten Schlüssel erstellen** (englisch: „Create restricted key“).
3. Falls Stripe fragt, wofür der Schlüssel ist oder einen vorkonfigurierten Satz anbietet: wähle die Variante **ohne Berechtigungen** bzw. eigene Berechtigungen.
4. **Schlüsselname:** `scutoria-lovable`
5. Alle Berechtigungen stehen auf **Keine**. Stelle genau diese zwei auf **Schreiben** (englisch „Write“):
   - **Checkout Sessions** (im Bereich Checkout)
   - **Customer portal** bzw. **Kundenportal** (im Bereich Billing)
   Alles andere bleibt auf Keine. Grund: Die Website ruft nur diese zwei Dinge bei Stripe auf (Kasse öffnen und prüfen, Kundenportal öffnen). Laut Stripe schließt „Schreiben“ das Lesen ein (docs.stripe.com/keys/restricted-api-keys, abgerufen 23.10.2026). Die genaue Beschriftung im Dashboard kann leicht abweichen, Stand prüfen.
6. Klicke **Schlüssel erstellen** und bestätige mit dem Code, den Stripe dir schickt.
7. Jetzt erscheint der Schlüssel. **Wichtig:** Er beginnt mit `rk_live_` und ist lang. Nicht verwechseln mit der kurzen Kennung, die mit `mk_` beginnt (das war beim letzten Mal der Fehler). Klicke auf den Wert, um ihn zu kopieren.
8. Lass das Stripe-Fenster offen und mach direkt mit Teil 3, Schritt 1 bis 4 weiter (Schlüssel einfügen). Danach bei Stripe ins Feld **Notiz hinzufügen** „in Lovable, Projekt Scutoria“ schreiben und **Fertig** klicken.

## Teil 2: Brevo, API-Schlüssel und Freigabe für wechselnde Server (5 Minuten)

Die Domain scutoria.com ist bei Brevo bereits authentifiziert und verifiziert (Brevo-Connector, 23.10.2026). Der Absender kontakt@scutoria.com ist aktiv.

1. Melde dich bei https://app.brevo.com an.
2. Oben rechts auf deinen Kontonamen klicken, dann **SMTP & API**, Reiter **API-Schlüssel** (englisch „API Keys“).
3. Klicke **Neuen API-Schlüssel generieren** („Generate a new API key“), Name: `scutoria-lovable`.
4. Der Schlüssel beginnt mit `xkeysib-`. Kopieren und direkt in Teil 3 einfügen (er wird nur einmal angezeigt).
5. **Wichtig für Lovable:** Lovables Server haben keine feste IP-Adresse. Brevo blockiert API-Aufrufe von unbekannten IP-Adressen, wenn die Sperre aktiv ist. Öffne in Brevo die Sicherheitseinstellungen: Kontoname oben rechts, **Sicherheit** bzw. **Security**, Punkt **Autorisierte IPs** („Authorised IPs“). Wenn dort die Sperre unbekannter IP-Adressen aktiv ist, schalte sie für die API aus. Stand prüfen: Lage und Name des Menüpunkts können abweichen; wenn du ihn nicht findest, sag es mir, dann prüfe ich es beim ersten Testversand.

## Teil 3: In Lovable eintragen (3 Minuten)

1. Öffne das Projekt **Scutoria** (nicht „Scutoria Migration“): https://lovable.dev/projects/6e8cf66c-609e-4034-8911-ceeb9b422c84
2. In der Leiste oben: **More** (Mehr) → **Settings** → **Secrets** (docs.lovable.dev/features/secrets, abgerufen 23.10.2026).
3. Klicke **Add secret** und lege diese zwei Einträge an, Name genau so geschrieben (Großbuchstaben, Unterstriche):

| Name | Wert |
|---|---|
| `STRIPE_SECRET_KEY` | der Stripe-Schlüssel aus Teil 1, beginnt mit `rk_live_` |
| `BREVO_API_KEY` | der Brevo-Schlüssel aus Teil 2, beginnt mit `xkeysib-` |

4. Speichern. Lovable zeigt den Wert danach nicht mehr an; das ist richtig so.

## Erfahrung vom 29. und 30. Oktober 2026

Beim ersten Eintragen gab es drei Stolpersteine. Sie sind behoben, hier für das nächste Mal:

- **Projekt prüfen.** Links oben im Editor muss „Scutoria“ stehen, nicht „Scutoria Migration“. Die Adresse des richtigen Projekts enthält `6e8cf66c`. Einträge im Archivprojekt erreichen die Website nie.
- **API-Schlüssel, nicht SMTP-Schlüssel.** Brevo hat im Menü „SMTP & API“ zwei Reiter. Nur ein Schlüssel aus dem Reiter „API-Schlüssel“ (beginnt mit `xkeysib-`) funktioniert; ein SMTP-Schlüssel oder ein Schlüssel aus einem anderen Konto ergibt bei Brevo „Key not found“ (Fehler 401).
- **IP-Sperre bei Brevo aus.** Mit eingeschalteter Sperre „Autorisierte IPs“ (https://app.brevo.com/security/authorised_ips) lehnt Brevo jeden Aufruf von Lovable ab (Fehler 401, „unrecognised IP address“), weil Lovable wechselnde Adressen hat.
- **Neustart nach dem Eintragen.** Die Vorschau liest die Schlüssel beim Start. Nach neuen Einträgen den Lovable-Agenten bitten, den Vorschau-Server neu zu starten (0,6 Credits), sonst meldet `/health` weiter den alten Stand.

Dann schreib mir nur „eingetragen“. Ich prüfe danach über Lovable, ob die Website beide Schlüssel sieht, ohne sie anzuzeigen. Den echten Test (Anmeldelink an deine Adresse, Kasse bis zur Stripe-Seite) mache ich erst nach deinem OK.

---

## Später, nicht heute

- **Stripe-Webhook** (nach dem Veröffentlichen, weil Stripe die Website dann von außen erreichen muss): Stripe Workbench → Webhooks → Ziel hinzufügen, Adresse `https://<Adresse der veröffentlichten Website>/api/public/hooks/stripe`, Ereignisse `checkout.session.completed` und `checkout.session.async_payment_succeeded`. Das Signatur-Geheimnis (beginnt mit `whsec_`) kommt dann als `STRIPE_WEBHOOK_SECRET` in Lovable. Bis dahin legt die Rückkehrseite nach dem Kauf die Lizenz an. Den Webhook des alten Shops nicht anfassen.
- **Erinnerungsmails** vor Lizenzende: erst nötig, wenn die erste Lizenz fast ein Jahr alt ist. Einrichtung später, ohne dass ein Geheimnis im Chat landet.
- **Echter Kauf zu 99 €** mit anschließender Rückerstattung durch dich: nach dem Veröffentlichen.
