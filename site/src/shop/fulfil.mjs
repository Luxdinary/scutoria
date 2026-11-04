// A paid checkout becomes a customer and a licence; the sign-in link goes out by mail. All steps are safe to repeat: the licence carries the session id, the customer is found by email.
import { findOrCreateCustomer, setStripeCustomer, createLicence, licenceBySession, attachRun, createToken, countLicences } from '../db.mjs';
import { sendMail, templates } from '../mail.mjs';
import { p } from '../i18n.mjs';
import { productById, priceConfigOf } from './products.mjs';
import { termsAttachment } from '../contract.mjs';

export async function fulfilCheckout(session, origin) {
  const sessionId = String(session?.id ?? '');
  const email = String(session?.customer_details?.email ?? session?.customer_email ?? '').trim().toLowerCase();
  const productId = String(session?.metadata?.product ?? '');
  const lang = session?.metadata?.lang === 'de' ? 'de' : 'en';
  const product = productById(productId);
  if (!sessionId || !email || !product || session?.payment_status !== 'paid') return null;
  const existing = await licenceBySession(sessionId);
  if (existing) return { licence: existing, customer: null };
  const customer = await findOrCreateCustomer(email, lang);
  if (session.customer) await setStripeCustomer(customer.id, String(session.customer));
  if (session.metadata?.runId) await attachRun(String(session.metadata.runId), customer.id);
  const licence = await createLicence({
    customerId: customer.id,
    product: productId,
    months: product.months,
    pilot: session.metadata?.pilot === '1' || (await countLicences(product.id)) < priceConfigOf(product).pilotSeats,
    amountCents: Number(session.amount_total ?? 0),
    currency: String(session.currency ?? 'eur'),
    checkoutSessionId: sessionId,
  });
  if (licence?.existing) return { licence, customer };
  const token = await createToken(customer.id, 'login', 60 * 24 * 7);
  const attachments = [];
  try { attachments.push(await termsAttachment(lang, licence)); } catch { console.error('Terms PDF could not be produced'); }
  await sendMail({ to: email, ...templates.welcome[lang](`${origin}${p('login', lang)}/${token}`, product.name[lang], licence, attachments.length > 0), attachments });
  return { licence, customer };
}
