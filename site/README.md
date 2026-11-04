# Website

Node 22, Express 5, SQLite aus Node selbst, serverseitig gerendertes HTML. Englisch unter `/`, Deutsch unter `/de/`. Keine Abhängigkeit außer Express und Markdown-it.

| Befehl | Was |
|---|---|
| `npm install` | Abhängigkeiten holen (einmal). |
| `npm run build:assets` | `public/tokens.css`, `bundle.css`, Schriften und Logos aus `../design/project/` erzeugen. Nach jeder Änderung am Designsystem. |
| `npm run dev` | Lokal starten mit Neuladen: http://localhost:8080 |
| `npm test` | Seiten, Warteliste, Kopfzeilen prüfen. |
| `docker build -t scutoria-site .` | Image lokal bauen. |
| `powershell -File scripts\deploy.ps1` | Tokens bauen, Tests, Image bauen und in die private Registry laden (E18). Braucht Docker Desktop, `docker login` und `SCUTORIA_IMAGE`. |
| `npm run build:og` | Vorschaubilder für geteilte Links nach `public/og/` rendern (über Edge). Nach Änderungen an Claim oder Produktnamen. |

Render: `render.yaml` beschreibt den Dienst (Image aus Docker Hub, Frankfurt, Starter-Plan mit 1 GB Datenträger unter `/app/data` für SQLite, Health-Check `/health`, Umgebungsvariablen; Geheimnisse nur im Dashboard). Der Dienst wird angelegt, sobald das Image in der Registry liegt.

Umgebung (bei Render als Umgebungsvariablen, lokal in `site/.env`, die ignoriert ist und mit `--env-file-if-exists=.env` geladen wird):

| Variable | Bedeutung |
|---|---|
| `PORT`, `HOST`, `BASE_URL` | Adresse; `BASE_URL` steht in Mails und Rückkehradressen, wenn `SITE_MODE=live`. |
| `SITE_MODE` | `preview` (Vorschau-Badge, noindex, Generator und Probekasse ohne Lizenz) oder `live` (Lizenzpflicht, keine Probekasse). |
| `LEGAL_REVIEWED_AT` | Datum der Rechtsprüfung; leer zeigt den Entwurfshinweis. |
| `DATA_DIR`, `APP_VERSION` | SQLite-Ordner; Versionsanzeige. |
| `STRIPE_SECRET_KEY` | Eingeschränkter Schlüssel für Checkout Sessions und Kundenportal. Nie im Chat, nie im Repository. Fehlt er, gibt es live keine Kasse und in der Vorschau die Probekasse. |
| `STRIPE_WEBHOOK_SECRET` | Signiergeheimnis des Webhooks `POST /stripe/webhook` (Ereignisse `checkout.session.completed`, `checkout.session.async_payment_succeeded`). Fehlt es, antwortet der Webhook mit 503. |
| `STRIPE_AUTOMATIC_TAX`, `STRIPE_TAX_BEHAVIOR` | Stripe Tax ein (`true`, Standard) oder aus; Preise `inclusive` (Standard) oder `exclusive`. Nach der Steuerantwort setzen. |
| `PRICE_YEAR_CENTS`, `PRICE_PILOT_CENTS`, `PILOT_SEATS` | Jahrespreis (19900), Gründerpreis (9900) und Zahl der Gründerplätze (10) für alle Toolkits; je Toolkit überschreibbar, etwa `PRICE_SECURITY_YEAR_CENTS`, `PRICE_SECURITY_PILOT_CENTS`, `PILOT_SEATS_SECURITY`. Gründerplätze werden je Toolkit gezählt. E10, E14, E21. |
| `PREVIEW_ACCESS_EMAILS` | Adressen, die live ohne Kauf den Generator benutzen dürfen (Stefans Vorschauzugang), durch Komma getrennt. |
| `BREVO_API_KEY`, `MAIL_FROM`, `MAIL_FROM_NAME` | Transaktionsmails über Brevo. Ohne Schlüssel bleiben Mails im Postausgang (Tabelle `outbox`); die Vorschau zeigt Links direkt auf der Seite. |
| `MEMO_PDF_PUBLIC` | `true` bietet das Memo-PDF der vier Memo-Generatoren auch ohne E-Mail-Adresse zum Download an. Standard: Das PDF kommt nur per E-Mail (Konzept E11); in der Vorschau ohne Mailschlüssel wird der Link gezeigt. |
| `BREVO_MEMO_LIST_ID` | Nummer der Brevo-Kontaktliste „Memo-Kontakte“. Gesetzt, wird jede Adresse, die ein Memo anfordert, dort eingetragen. Ohne Wert bleiben die Kontakte nur in der Tabelle `memo_contacts`. |
| `PDF_CHANNEL` | Browser für den PDF-Druck (siehe unten). |

Konto und Kasse: Anmeldung per E-Mail-Link (`/account`, `/de/konto`; Token dreißig Minuten, einmal gültig, nur als Hash gespeichert; Sitzung als HttpOnly-Cookie dreißig Tage). Kauf über `POST /toolkits/ai-policy/buy`: Stripe Checkout im Zahlungsmodus mit Stripe Tax, UID-Abfrage, Rechnungsadresse, Rechnung, Pflicht-Zustimmung zu AGB und sofortigem Beginn (Verlust des Widerrufsrechts). Die Lizenz entsteht im Webhook oder beim Rückkehr-Aufruf `/checkout/success`, je Checkout-Sitzung nur einmal; der Kunde bekommt eine Willkommensmail mit Anmeldelink (sieben Tage gültig). Jahreslizenz zwölf Monate ohne Verlängerung; vierzehn Tage vor Ablauf eine Erinnerungsmail. Im Konto: Lizenzen, Rechnungen über das Stripe-Kundenportal, Nachweisordner mit allen Läufen und eingefrorenen Fassungen (Kopie mit Datum und Toolkit-Stand aus `questions.json`, Feld `version`; Hinweis, wenn das Toolkit seither aktualisiert wurde). Probekasse: `/checkout/test/:id`, nur im Vorschaumodus ohne Stripe-Schlüssel.

Inhalte: `content/legal/*.md` sind die Rechtstexte je Sprache mit Kopfblock (`title`, `description`). Die Seite zeigt sie als Entwurf, solange `LEGAL_REVIEWED_AT` leer ist.

PDF: Die Dokumente des Toolkits werden über einen Chromium-Browser gedruckt (Playwright). Am Laptop nutzt der Server automatisch das installierte Edge; `PDF_CHANNEL=chrome` oder leer (Playwright-Chromium) sind Alternativen. Im Docker-Image liegt Chromium bei.

Handbuch: `content/toolkits/ai-policy/handbook.en.md` und `handbook.de.md`, gerendert von `src/toolkit/handbook.mjs`. Konventionen im Markdown: Absätze beginnen mit `[FACT]`, `[INTERPRETATION]`, `[UNCERTAIN]`, `[GAP]` (deutsch `[FAKT]`, `[AUSLEGUNG]`, `[UNSICHER]`, `[LÜCKE]`) und werden zu Markern; Absätze, die mit `Source:` oder `Quelle:` beginnen, werden zu Quellenzeilen; `::: uncertain Titel` … `:::` (letzte Zeile ist die Meta-Zeile) wird zum Unsicherheitskasten; `## 2. Titel` bekommt die Sprungmarke `#s2`, `### 2.1 Titel` die Marke `#s2-1`. Seiten: `/toolkits/ai-policy/handbook` und `/de/toolkits/ki-richtlinien/handbuch`, PDF unter `/pdf`. Die gerenderte Fassung wird je Sprache zwischengespeichert, bis sich die Datei ändert.

Messung: Seitenaufrufe werden ohne Personenbezug gezählt (Tag, Pfad, Sprache, verweisende Domain). Keine IP-Adresse, kein User-Agent, kein Cookie.

Seiten: Startseite `src/pages/home.mjs`, Produktseite `src/pages/product.mjs` (Texte beider Sprachen im jeweiligen Modul), Rechts- und Über-Seiten aus `content/`. Freie Tools: Seiten in `src/pages/tools.mjs`, Logik als Browser-Module in `public/tools/` (von den Tests direkt importiert); die Tool-Seiten tragen eine eigene Sicherheitsregel mit `connect-src 'none'`, damit „sendet nichts“ vom Browser erzwungen wird. Inline-Styles sind auf allen Seiten durch die Sicherheitsregel wirkungslos; Farben kommen aus Klassen (`muted`, `amber`). Die Produktseite bedient alle Toolkits der Registratur (`src/toolkit/registry.mjs`); die Texte von Toolkit 2 stehen in `src/pages/product-security.mjs`, und ein Toolkit ohne Preis zeigt „Der Preis folgt“ mit der Warteliste statt der Kasse. Muster-PDFs des Beispielbetriebs liegen unter `public/samples/ai-policy/` und `public/samples/security-evidence/` und werden nach einem neuen Musterlauf (`node data/samples.mjs <toolkit> <ziel> pdf`) von Hand aus `../produkte/<toolkit>-toolkit/muster/` kopiert.
