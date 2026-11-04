// Public withdrawal form: no account mutation or automatic refund; both emails use the outbox-backed sender.
import { z } from 'zod';
import { layout, esc } from './layout.mjs';
import { config } from './config.mjs';
import { PRODUCTS } from './shop/products.mjs';
import { sameOrigin } from './shop/session.mjs';
import { getCustomerByEmail, licencesOf, withdrawalRateAllow } from './db.mjs';
import { sendMail } from './mail.mjs';
import { viennaTime } from './contract.mjs';

export const withdrawPaths = { en: '/withdraw', de: '/de/vertrag-widerrufen' };
export const withdrawalSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254).transform((s) => s.toLowerCase()),
  contract: z.enum(['ai-policy', 'security-evidence']),
  reference: z.string().trim().max(160).default(''),
  message: z.string().trim().max(3000).default(''),
}).strict();
const T = {
  en: {
    title: 'Withdraw from contract', intro: 'Here consumers can withdraw from a contract with Scutoria. Tell us which contract you mean. You receive a confirmation of receipt by email straight away. If the withdrawal is valid, we refund all payments within fourteen days using the means of payment you used. Details are in the withdrawal notice.',
    notice: 'Withdrawal notice', name: 'Name', email: 'Email address used for the purchase', contract: 'Contract', reference: 'Order date or invoice number (optional)', message: 'Message (optional)', submit: 'Confirm withdrawal', subject: 'We have received your withdrawal', received: 'Time of receipt',
    next: 'We will check it and get back to you within two working days. If the withdrawal is valid, we refund all payments within fourteen days using the means of payment you used.',
    invalid: 'Please enter your name, a valid purchase email address and the contract. Check the length of your entries.', limit: 'Too many requests for this address. Please try again in an hour.', error: 'The confirmation could not be sent. Please contact kontakt@scutoria.com.',
  },
  de: {
    title: 'Vertrag widerrufen', intro: 'Hier können Verbraucher einen Vertrag mit Scutoria widerrufen. Geben Sie an, welchen Vertrag Sie meinen. Sie erhalten sofort eine Eingangsbestätigung per E-Mail. Ist der Widerruf wirksam, erstatten wir alle Zahlungen binnen vierzehn Tagen über das Zahlungsmittel, das Sie verwendet haben. Einzelheiten stehen in der Widerrufsbelehrung.',
    notice: 'Widerrufsbelehrung', name: 'Name', email: 'Beim Kauf verwendete E-Mail-Adresse', contract: 'Vertrag', reference: 'Bestelldatum oder Rechnungsnummer (freiwillig)', message: 'Nachricht (freiwillig)', submit: 'Widerruf bestätigen', subject: 'Eingang Ihres Widerrufs', received: 'Zeitpunkt des Eingangs',
    next: 'Wir prüfen ihn und melden uns innerhalb von zwei Werktagen. Ist der Widerruf wirksam, erstatten wir alle Zahlungen binnen vierzehn Tagen über das Zahlungsmittel, das Sie verwendet haben.',
    invalid: 'Bitte geben Sie Ihren Namen, eine gültige Kauf-E-Mail-Adresse und den Vertrag an. Prüfen Sie die Länge Ihrer Eingaben.', limit: 'Zu viele Anfragen für diese Adresse. Bitte in einer Stunde noch einmal versuchen.', error: 'Die Bestätigung konnte nicht gesendet werden. Bitte schreiben Sie an kontakt@scutoria.com.',
  },
};
export function withdrawalMails(input, lang, receivedAt, licences = []) {
  const s = T[lang], receipt = viennaTime(receivedAt, lang);
  const details = `${s.received}: ${receipt}\n${s.name}: ${input.name}\n${s.email}: ${input.email}\n${s.contract}: ${PRODUCTS[input.contract].name[lang]}\n${s.reference}: ${input.reference}\n${s.message}: ${input.message}`;
  return [
    { to: input.email, subject: s.subject, text: `${details}\n\n${s.next}\n\nScutoria, kontakt@scutoria.com` },
    { to: 'kontakt@scutoria.com', subject: `${s.subject} · ${PRODUCTS[input.contract].name[lang]}`, text: `${details}\n\nLicences:\n${licences.map((l) => `${l.product} | ${l.starts_at} | ${l.ends_at} | ${l.checkout_session_id ?? ''}`).join('\n')}\n\nScutoria, kontakt@scutoria.com` },
  ];
}
export function withdrawPage(lang, { error = '', receivedAt = null } = {}) {
  const s = T[lang];
  const field = (key, label, type, max, required = false) => `<label class="sc-field"><span class="sc-field__label">${esc(label)}</span><input class="sc-field__input" name="${key}" type="${type}" maxlength="${max}"${required ? ' required' : ''} autocomplete="${key === 'name' ? 'name' : key === 'email' ? 'email' : 'off'}"></label>`;
  const body = `<section class="wrap hero"><h1 class="title">${esc(s.title)}</h1><p class="lead">${esc(s.intro)}</p><p><a href="${lang === 'de' ? '/de/widerruf' : '/withdrawal'}">${esc(s.notice)}</a></p></section><section class="wrap section"><div class="prose">${error ? `<p class="notice notice--error" role="alert">${esc(s[error])} <a href="mailto:kontakt@scutoria.com">kontakt@scutoria.com</a></p>` : ''}${receivedAt ? `<h2 class="heading">${esc(s.subject)}</h2><p>${esc(s.received)}: ${esc(viennaTime(receivedAt, lang))}</p><p>${esc(s.next)}</p>` : `<form method="post" action="${withdrawPaths[lang]}">${field('name', s.name, 'text', 120, true)}${field('email', s.email, 'email', 254, true)}<fieldset class="tool__q"><legend class="heading">${esc(s.contract)}</legend><div class="sc-options">${Object.values(PRODUCTS).map((p) => `<label class="sc-option"><input type="radio" name="contract" value="${p.id}" required><span class="sc-option__dot" aria-hidden="true"></span><span class="sc-option__title">${esc(p.name[lang])}</span></label>`).join('')}</div></fieldset>${field('reference', s.reference, 'text', 160)}<label class="sc-field"><span class="sc-field__label">${esc(s.message)}</span><textarea class="sc-field__input" name="message" maxlength="3000" rows="5"></textarea></label><button class="sc-btn" type="submit">${esc(s.submit)}</button></form>`}</div></section>`;
  return layout({ lang, title: s.title, description: s.intro, body, alt: withdrawPaths, noindex: true });
}
export function mountWithdrawal(app) {
  for (const lang of ['en', 'de']) {
    app.get(withdrawPaths[lang], (req, res) => res.type('html').send(withdrawPage(lang)));
    app.post(withdrawPaths[lang], async (req, res) => {
      res.set('Cache-Control', 'no-store');
      // Browsers include Origin on POST; Referer covers clients that omit it. Missing or cross-origin sources fail closed.
      let origin = req.get('origin');
      try { if (!origin && req.get('referer')) origin = new URL(req.get('referer')).origin; } catch { return res.status(403).end(); }
      if (!origin || !sameOrigin({ get: (key) => key === 'origin' ? origin : req.get(key) })) return res.status(403).end();
      if (!String(req.get('content-type') ?? '').includes('application/x-www-form-urlencoded')) return res.status(415).end();
      const pairs = new URLSearchParams(new TextDecoder().decode(req.rawBody ?? []));
      if ([...pairs.keys()].some((key) => pairs.getAll(key).length !== 1)) return res.status(400).type('html').send(withdrawPage(lang, { error: 'invalid' }));
      const result = withdrawalSchema.safeParse(req.body);
      if (!result.success) return res.status(400).type('html').send(withdrawPage(lang, { error: 'invalid' }));
      try {
        if (!await withdrawalRateAllow(result.data.email)) return res.status(429).type('html').send(withdrawPage(lang, { error: 'limit' }));
        const receivedAt = new Date().toISOString();
        const customer = await getCustomerByEmail(result.data.email);
        const licences = customer ? await licencesOf(customer.id) : [];
        const mails = withdrawalMails(result.data, lang, receivedAt, licences);
        const outcomes = await Promise.all(mails.map((mail) => sendMail(mail)));
        if (outcomes.some((mail) => !mail.sent)) return res.status(503).type('html').send(withdrawPage(lang, { error: 'error' }));
        return res.type('html').send(withdrawPage(lang, { receivedAt }));
      } catch {
        return res.status(503).type('html').send(withdrawPage(lang, { error: 'error' }));
      }
    });
  }
}