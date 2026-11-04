// Runtime configuration. Everything comes from the environment; nothing secret lives in the repository.
// Lovable: no file system on the server; content and public files are bundled through runtime/files.mjs.
export const root = '';
const env = (typeof process !== 'undefined' && process.env) ? process.env : {};
// Non-secret site settings live in content/site-settings.json (changed only through a reviewed code change); an environment variable, when set, wins.
import { readText } from './runtime/files.mjs';
const site = JSON.parse(readText('content/site-settings.json'));

export const config = {
  port: Number(env.PORT ?? 8080),
  host: env.HOST ?? '0.0.0.0',
  baseUrl: (env.BASE_URL ?? site.baseUrl ?? 'https://scutoria.com').replace(/\/$/, ''),
  // preview: noindex and a preview badge, the generator and a test checkout run without a licence; live: indexable, licence required.
  siteMode: (env.SITE_MODE ?? site.siteMode) === 'live' ? 'live' : 'preview',
  // Set to the ISO date of the legal review; empty means the legal pages show a draft notice.
  legalReviewedAt: env.LEGAL_REVIEWED_AT ?? site.legalReviewedAt ?? '',
  reminders: (env.REMINDERS ?? site.reminders) === 'on' ? 'on' : 'off',
  dataDir: '',
  brand: {
    name: 'Scutoria',
    claim: { en: 'Sourced. Dated. Ready to show.', de: 'Belegt. Datiert. Vorzeigbar.' },
    email: 'kontakt@scutoria.com',
  },
  version: env.APP_VERSION ?? 'dev',
  // Shop: Stripe Checkout when a secret key is set, otherwise a test checkout in preview mode only. E34 (3 November 2026): every toolkit costs 99 euro a year, no founder tier; the pilot fields stay, at zero seats, for licences sold earlier.
  shop: {
    stripeSecretKey: env.STRIPE_SECRET_KEY ?? '',
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET ?? '',
    automaticTax: env.STRIPE_AUTOMATIC_TAX !== 'false',
    taxBehavior: env.STRIPE_TAX_BEHAVIOR === 'exclusive' ? 'exclusive' : 'inclusive',
    priceCents: Number(env.PRICE_YEAR_CENTS ?? 9900),
    pilotPriceCents: Number(env.PRICE_PILOT_CENTS ?? 9900),
    pilotSeats: Number(env.PILOT_SEATS ?? 0),
    // Per-product overrides. E21 (19.10.2026) and E34 (3.11.2026): toolkit 2 has the same price as toolkit 1.
    products: {
      'security-evidence': {
        priceCents: Number(env.PRICE_SECURITY_YEAR_CENTS ?? env.PRICE_YEAR_CENTS ?? 9900),
        pilotPriceCents: Number(env.PRICE_SECURITY_PILOT_CENTS ?? env.PRICE_PILOT_CENTS ?? 9900),
        pilotSeats: Number(env.PILOT_SEATS_SECURITY ?? env.PILOT_SEATS ?? 0),
      },
    },
    // Addresses that may use the generator without a purchase (Stefan's preview access when live).
    // Stripe customer portal configuration id (bpc_...); empty uses the account's default portal.
    stripePortalConfiguration: String(site.stripePortalConfiguration ?? ''),
    previewEmails: String(env.PREVIEW_ACCESS_EMAILS ?? (site.previewEmails ?? []).join(',')).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
  },
  // Mail through Brevo's transactional API. Without a key, mails are kept in the outbox and, in preview mode, links are shown on the page.
  mail: {
    brevoApiKey: env.BREVO_API_KEY ?? '',
    from: env.MAIL_FROM ?? 'kontakt@scutoria.com',
    fromName: env.MAIL_FROM_NAME ?? 'Scutoria',
  },
  // Memo generators (E11): the memo comes by email as a PDF. MEMO_PDF_PUBLIC=true also offers the PDF as a direct download without an address.
  // BREVO_MEMO_LIST_ID adds every memo contact to that Brevo list (the "memo contacts" list of the concept).
  memos: {
    pdfPublic: env.MEMO_PDF_PUBLIC === 'true',
    brevoListId: Number(env.BREVO_MEMO_LIST_ID ?? 0) || 0,
  },
};
