// Checks the environment of the website before a deploy or the switch to live: what is set, what is missing, what it means.
// Prints the kind of a secret (test or live, restricted or not), never its value.
// node --env-file-if-exists=.env scripts/preflight.mjs   (npm run preflight)
import { existsSync, accessSync, constants } from 'node:fs';
import { resolve } from 'node:path';
import { config, root } from '../src/config.mjs';

const live = config.siteMode === 'live';
const rows = [];
const info = (what, detail = '') => rows.push(['INFO', what, detail]);
const ok = (what, detail = '') => rows.push(['OK', what, detail]);
const miss = (what, detail = '') => rows.push([live ? 'FEHLT' : 'OFFEN', what, detail]);
const note = (what, detail = '') => rows.push(['HINWEIS', what, detail]);

info('SITE_MODE', config.siteMode);
info('APP_VERSION', config.version);
info('BASE_URL', config.baseUrl);
if (live && !config.baseUrl.startsWith('https://')) miss('BASE_URL', 'live muss mit https:// beginnen');
if (live && config.baseUrl.includes('onrender.com')) note('BASE_URL', 'zeigt noch auf die Render-Adresse, nicht auf scutoria.com');

if (config.legalReviewedAt) ok('LEGAL_REVIEWED_AT', config.legalReviewedAt);
else miss('LEGAL_REVIEWED_AT', 'Rechtsseiten zeigen den Entwurfshinweis und fehlen in der Sitemap');

const key = config.shop.stripeSecretKey;
if (!key) miss('STRIPE_SECRET_KEY', live ? 'live gibt es keine Kasse' : 'die Vorschau nutzt die Probekasse');
else {
  const kind = /^(rk|sk)_live_/.test(key) ? 'live' : /^(rk|sk)_test_/.test(key) ? 'test' : 'unbekannt';
  const restricted = key.startsWith('rk_');
  (live && kind !== 'live' ? note : ok)('STRIPE_SECRET_KEY', `Schlüsselart ${kind}, ${restricted ? 'eingeschränkt' : 'nicht eingeschränkt (eingeschränkter Schlüssel empfohlen)'}`);
}
if (config.shop.stripeWebhookSecret) ok('STRIPE_WEBHOOK_SECRET', config.shop.stripeWebhookSecret.startsWith('whsec_') ? 'Format whsec_' : 'ungewohntes Format');
else miss('STRIPE_WEBHOOK_SECRET', 'der Webhook antwortet mit 503; Lizenzen entstehen nur über die Rückkehrseite');
info('Stripe Tax', `${config.shop.automaticTax ? 'ein' : 'aus'}, Preise ${config.shop.taxBehavior}`);

const euro = (c) => `${(c / 100).toFixed(2).replace('.', ',')} €`;
info('Preis Toolkit 1', `${euro(config.shop.priceCents)} regulär, ${euro(config.shop.pilotPriceCents)} Gründerpreis für ${config.shop.pilotSeats} Käufer`);
for (const [id, p] of Object.entries(config.shop.products ?? {})) info(`Preis ${id}`, `${euro(p.priceCents)} regulär, ${euro(p.pilotPriceCents)} Gründerpreis für ${p.pilotSeats} Käufer`);

if (config.mail.brevoApiKey) ok('BREVO_API_KEY', 'gesetzt');
else miss('BREVO_API_KEY', 'Mails bleiben im Postausgang; Anmeldelinks und Memos kommen nicht an');
info('MAIL_FROM', `${config.mail.fromName} <${config.mail.from}>`);
if (config.memos.brevoListId) ok('BREVO_MEMO_LIST_ID', String(config.memos.brevoListId));
else note('BREVO_MEMO_LIST_ID', 'Memo-Kontakte bleiben nur in der Tabelle memo_contacts');
info('MEMO_PDF_PUBLIC', config.memos.pdfPublic ? 'true (PDF auch ohne Adresse)' : 'false (PDF nur per E-Mail, E11)');

info('PREVIEW_ACCESS_EMAILS', `${config.shop.previewEmails.length} Adresse(n)`);
if (live && !config.shop.previewEmails.length) note('PREVIEW_ACCESS_EMAILS', 'live kann niemand den Generator ohne Kauf prüfen');

try { accessSync(config.dataDir, constants.W_OK); ok('DATA_DIR', `${config.dataDir} beschreibbar`); }
catch { miss('DATA_DIR', `${config.dataDir} fehlt oder ist nicht beschreibbar`); }

const files = [
  'public/tokens.css', 'public/bundle.css', 'public/og/scutoria-en.png', 'public/og/ai-policy-de.png', 'public/og/security-evidence-de.png',
  'public/samples/ai-policy/ai-policy-handbook-en.pdf', 'public/samples/security-evidence/security-evidence-handbook-de.pdf',
  'content/toolkits/ai-policy/handbook.en.md', 'content/toolkits/security-evidence/handbook.de.md',
];
const missing = files.filter((f) => !existsSync(resolve(root, f)));
if (missing.length) miss('Dateien', `fehlen: ${missing.join(', ')}`); else ok('Dateien', 'Tokens, Vorschaubilder, Muster und Handbücher liegen vor');

const width = Math.max(...rows.map((r) => r[1].length));
for (const [state, what, detail] of rows) console.log(`${state.padEnd(7)} ${what.padEnd(width)}  ${detail}`);
const failing = rows.filter((r) => r[0] === 'FEHLT').length;
console.log(failing ? `\n${failing} Punkt(e) fehlen für den Live-Betrieb.` : live ? '\nBereit für den Live-Betrieb.' : '\nVorschau. Offene Punkte gelten erst live.');
process.exit(failing ? 1 : 0);
