// Payments: Stripe Checkout through the REST API when a secret key is configured; a test checkout in preview mode when it is not.
// No SDK, no third-party script on the site: the customer is sent to Stripe's hosted page and comes back with a session id.
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { config } from '../config.mjs';
import { saveTestCheckout, getTestCheckout } from '../db.mjs';
import { productById } from './products.mjs';

export const stripeConfigured = () => Boolean(config.shop.stripeSecretKey);
// The test checkout exists only in preview mode and only without a Stripe key; it never exists on the live site.
export const testCheckoutAvailable = () => config.siteMode !== 'live' && !stripeConfigured();

// Form-encodes nested parameters the way Stripe expects: line_items[0][price_data][currency]=eur
export function encodeForm(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) v.forEach((item, i) => (item !== null && typeof item === 'object' ? encodeForm(item, `${key}[${i}]`, out) : out.append(`${key}[${i}]`, String(item))));
    else if (typeof v === 'object') encodeForm(v, key, out);
    else out.append(key, String(v));
  }
  return out;
}

export async function stripeRequest(method, path, params = {}, idempotencyKey = null) {
  const headers = { authorization: `Bearer ${config.shop.stripeSecretKey}` };
  if (method === 'POST') headers['content-type'] = 'application/x-www-form-urlencoded';
  if (idempotencyKey) headers['idempotency-key'] = idempotencyKey;
  const query = method === 'GET' && Object.keys(params).length ? `?${encodeForm(params)}` : '';
  const res = await fetch(`https://api.stripe.com${path}${query}`, { method, headers, body: method === 'POST' ? encodeForm(params).toString() : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${data.error?.message ?? 'request failed'}`);
  return data;
}

// Webhook signature: Stripe-Signature: t=<unix>,v1=<hmac sha256 of "<t>.<raw body>" with the endpoint secret>
export function verifyStripeSignature(rawBody, header, secret, toleranceSeconds = 300, nowSeconds = Date.now() / 1000) {
  if (!secret || !header) return false;
  const parts = String(header).split(',').map((s) => s.trim());
  const t = parts.find((s) => s.startsWith('t='))?.slice(2);
  const sigs = parts.filter((s) => s.startsWith('v1=')).map((s) => s.slice(3));
  if (!t || !sigs.length || !/^\d+$/.test(t)) return false;
  if (Math.abs(nowSeconds - Number(t)) > toleranceSeconds) return false;
  const expected = createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex');
  return sigs.some((s) => s.length === expected.length && timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}

// For tests and local checks: produces the header Stripe would send.
export function signPayload(rawBody, secret, t = Math.floor(Date.now() / 1000)) {
  return `t=${t},v1=${createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex')}`;
}

// ---------- checkout sessions ----------
// Returns { id, url }. The customer pays on Stripe's page; the licence is created by the webhook or on return.
export async function createCheckout({ product, lang, price, email, successUrl, cancelUrl, consentText }) {
  if (!stripeConfigured()) {
    if (!testCheckoutAvailable()) throw new Error('checkout not configured');
    return testGateway.create({ product, lang, price, email, successUrl, cancelUrl });
  }
  const params = {
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [{ quantity: 1, price_data: { currency: 'eur', unit_amount: price.cents, tax_behavior: config.shop.taxBehavior, product_data: { name: product.name[lang], description: product.description[lang] } } }],
    automatic_tax: { enabled: config.shop.automaticTax },
    tax_id_collection: { enabled: true },
    billing_address_collection: 'required',
    customer_creation: 'always',
    invoice_creation: { enabled: true },
    consent_collection: { terms_of_service: 'required' },
    custom_text: { terms_of_service_acceptance: { message: consentText } },
    locale: lang,
    metadata: { product: product.id, lang, pilot: price.pilot ? '1' : '0' },
    ...(email ? { customer_email: email } : {}),
  };
  const s = await stripeRequest('POST', '/v1/checkout/sessions', params, `checkout-${randomBytes(8).toString('hex')}`);
  return { id: s.id, url: s.url };
}

export async function retrieveCheckout(id) {
  if (!stripeConfigured()) return (await testGateway.get(id))?.session ?? null;
  return stripeRequest('GET', `/v1/checkout/sessions/${encodeURIComponent(id)}`);
}

export async function portalUrl(stripeCustomerId, returnUrl) {
  if (!stripeConfigured() || !stripeCustomerId) return null;
  const params = { customer: stripeCustomerId, return_url: returnUrl };
  if (config.shop.stripePortalConfiguration) params.configuration = config.shop.stripePortalConfiguration;
  const s = await stripeRequest('POST', '/v1/billing_portal/sessions', params);
  return s.url;
}

// ---------- the test checkout: a page on this site that completes a purchase without payment ----------
// Sessions live in the database (table test_checkouts), so that every Worker isolate sees the same test checkout.
export const testGateway = {
  async create({ product, lang, price, email, successUrl, cancelUrl }) {
    const id = `cs_test_${randomBytes(8).toString('hex')}`;
    await saveTestCheckout(id, { id, productId: product.id, lang, price, email: email ?? '', successUrl, cancelUrl, session: null, created: Date.now() });
    const base = lang === 'de' ? '/de/kasse/test' : '/checkout/test';
    return { id, url: `${base}/${id}` };
  },
  async get(id) {
    const data = await getTestCheckout(String(id ?? ''));
    if (!data) return null;
    const product = productById(data.productId);
    return product ? { ...data, product } : null;
  },
  // Produces the same shape the webhook delivers for checkout.session.completed.
  async complete(id, email) {
    const entry = await testGateway.get(id);
    if (!entry) return null;
    const session = {
      id, object: 'checkout.session', payment_status: 'paid', status: 'complete', customer: null, customer_details: { email },
      amount_total: entry.price.cents, currency: 'eur', metadata: { product: entry.product.id, lang: entry.lang, pilot: entry.price.pilot ? '1' : '0' },
    };
    const { product, ...data } = entry;
    await saveTestCheckout(id, { ...data, session });
    return session;
  },
};
