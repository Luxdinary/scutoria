// The account (sign-in by email link, licences, evidence folder) and the checkout (Stripe, or the test checkout in preview), both languages.
import express from '../runtime/express.mjs';
import { config } from '../config.mjs';
import { languages, p, t } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { getCustomer, getCustomerByEmail, findOrCreateCustomer, createToken, consumeToken, licencesOf, licenceBySession, listRuns, listVersions, getRun, freezeRun, lastMailTo, recordStripeEvent, forgetStripeEvent, normaliseEmail, rateAllow } from '../db.mjs';
import { sendMail, templates } from '../mail.mjs';
import { loadQuestions } from '../toolkit/engine.mjs';
import { startChoices } from '../toolkit/run-ui.mjs';
import { fmtDate } from '../toolkit/documents/policy.mjs';
import { PRODUCTS, productById, priceFor, fmtPrice } from './products.mjs';
import { createCheckout, retrieveCheckout, portalUrl, verifyStripeSignature, testGateway, testCheckoutAvailable } from './payments.mjs';
import { fulfilCheckout } from './fulfil.mjs';
import { currentCustomer, signIn, signOut, sameOrigin, originOf, canStartRun } from './session.mjs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const page = (lang, title, body, alt, noindex = true) => layout({ lang, title, description: title, body, alt, noindex });
const day = (iso, lang) => fmtDate(String(iso ?? '').slice(0, 10), lang);

// Five sign-in requests per address and hour; no address book, no IP. Counted in the database, so every Worker isolate
// shares the brake. If the count cannot be read, the request goes through (signing in never depends on the brake).
async function allow(email) {
  try {
    return await rateAllow([{ key: `login:${email}`, limit: 5 }]);
  } catch (e) {
    console.error('rate limit', e.message);
    return true;
  }
}

// In preview mode, when no mail service is configured, the link of the last unsent mail is shown on the page.
async function previewLink(email) {
  if (config.siteMode === 'live' || !email) return null;
  const m = await lastMailTo(email);
  if (!m || m.status !== 'not-sent') return null;
  return (m.body.match(/https?:\/\/[^\s]+\/(?:account\/login|de\/konto\/anmelden)\/[^\s]+/) ?? [null])[0];
}

async function loginPage(lang, m, email) {
  const s = t(lang).account;
  const acct = p('account', lang);
  let notice = '';
  if (m === 'sent') notice = `<div class="notice notice--ok">${esc(s.sent)}</div>`;
  if (m === 'invalid') notice = `<div class="notice notice--error">${esc(s.invalid)}</div>`;
  if (m === 'limit') notice = `<div class="notice notice--error">${esc(s.limit)}</div>`;
  const link = m === 'sent' ? await previewLink(email) : null;
  const linkBox = link ? `<p class="small amber">${esc(s.sentPreview)}</p><div class="linkbox"><a href="${esc(link)}">${esc(link)}</a></div>` : '';
  const body = `
<section class="wrap acct">
  <div class="section__head"><h1 class="title">${esc(s.title)}</h1><p class="body muted">${esc(s.lead)}</p></div>
  <form class="login" method="post" action="${p('login', lang)}">
    ${notice}${linkBox}
    <label class="sc-field"><span class="sc-field__label">${esc(s.emailLabel)}</span><input class="sc-field__input" type="email" name="email" required autocomplete="email" inputmode="email" value="${esc(email ?? '')}"></label>
    <div><button class="sc-btn" type="submit">${esc(s.sendLink)}</button></div>
  </form>
</section>`;
  return page(lang, s.title, body, { en: p('account', 'en'), de: p('account', 'de') });
}

async function accountPage(lang, customer, m) {
  const s = t(lang).account;
  const sh = t(lang).shop;
  const acct = p('account', lang);
  const nowIso = new Date().toISOString();
  const licences = await licencesOf(customer.id);
  const licHtml = licences.length
    ? licences.map((l) => `<div class="lic"><strong>${esc(productById(l.product)?.name[lang] ?? l.product)}</strong><span>${esc(s.validUntil)} ${esc(day(l.ends_at, lang))}</span>${l.pilot ? `<span class="sc-pill sc-pill--accent">${esc(s.pilot)}</span>` : ''}${l.ends_at < nowIso ? `<span class="sc-pill sc-pill--red">${lang === 'de' ? 'abgelaufen' : 'expired'}</span>` : ''}</div>`).join('')
    : `<p class="body">${esc(s.noLicence)}</p>`;
  const notice = m === 'noportal' ? `<div class="notice">${esc(s.noPortal)}</div>` : '';
  const folders = (await Promise.all(Object.values(PRODUCTS).map(async (product) => {
    const def = loadQuestions(product.id);
    const path = product.path[lang];
    const runs = await listRuns(customer.id, product.id);
    const canEdit = await canStartRun(customer, product.id);
    const rows = (await Promise.all(runs.map(async (run) => {
      const versions = await listVersions(run.id);
      const vHtml = versions.length ? `<ul class="acct__versions">${versions.map((v) => `<li><span>${esc(s.versionOf)} ${esc(day(v.created_at, lang))}</span><span>${esc(s.toolkitVersion)} ${esc(v.version ?? '')} ${v.version === def.version ? `(${esc(s.current)})` : ''}</span><a href="${path}/run/${esc(v.id)}/documents">${esc(s.documents)}</a>${v.version !== def.version ? `<span class="acct__hint">${esc(s.updated)}</span>` : ''}</li>`).join('')}</ul>` : '';
      return `<tr><td><strong>${esc(run.answers.A1?.text || '…')}</strong><br><span class="small muted">${esc(run.id)}</span></td><td>${esc(day(run.created_at, lang))}</td><td>${esc(day(run.updated_at, lang))}</td><td><div class="acct__actions">${canEdit ? `<a class="sc-btn sc-btn--small sc-btn--secondary" href="${path}/run/${esc(run.id)}/${run.step}">${esc(s.continue)}</a>` : ''}<a class="sc-btn sc-btn--small sc-btn--secondary" href="${path}/run/${esc(run.id)}/documents">${esc(s.documents)}</a><form method="post" action="${acct}/runs/${esc(run.id)}/freeze"><button class="sc-btn sc-btn--small" type="submit">${esc(s.freeze)}</button></form></div></td></tr>${vHtml ? `<tr><td colspan="4">${vHtml}</td></tr>` : ''}`;
    }))).join('');
    const start = canEdit
      ? startChoices(path,lang)
      : `<div class="notice">${esc(s.needLicence)} <a href="${path}">${esc(s.buy)}</a></div>`;
    return `
  <div class="acct__block" id="folder">
    <div class="section__head"><h2 class="heading">${esc(s.folder)} · ${esc(product.name[lang])}</h2><p class="body muted">${esc(s.folderText)}</p></div>
    ${rows ? `<table class="acct__table"><thead><tr>${s.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>` : `<p class="body">${esc(s.none)}</p>`}
    ${start}
  </div>`;
  }))).join('');
  const buyLink = licences.some((l) => l.ends_at > nowIso) ? '' : `<a class="sc-btn" href="${p('home', lang)}#products">${esc(s.buy)}</a>`;
  const body = `
<section class="wrap acct">
  <div class="acct__head"><h1 class="title">${esc(s.title)}</h1><form method="post" action="${p('logout', lang)}" class="sc-row"><span class="small muted">${esc(s.signedInAs)} ${esc(customer.email)}</span><button class="sc-btn sc-btn--secondary sc-btn--small" type="submit">${esc(s.logout)}</button></form></div>
  ${notice}
  <div class="acct__block">
    <h2 class="heading">${esc(s.licences)}</h2>
    ${licHtml}
    <div class="sc-row">${buyLink}<a class="sc-btn sc-btn--secondary" href="${p('invoices', lang)}">${esc(s.invoices)}</a></div>
  </div>
  ${folders}
</section>`;
  return page(lang, s.title, body, { en: p('account', 'en'), de: p('account', 'de') });
}

export function mountShop(app) {
  const notFound = (res, lang) => res.status(404).type('html').send(page(lang, '404', `<section class="wrap hero"><p class="lead">${esc(t(lang).account.invalid)}</p></section>`));

  for (const lang of languages) {
    const acct = p('account', lang);
    const alt = { en: p('account', 'en'), de: p('account', 'de') };

    app.get(acct, async (req, res) => {
      const customer = await currentCustomer(req);
      const m = String(req.query.m ?? '');
      if (!customer) return res.type('html').send(await loginPage(lang, m, config.siteMode !== 'live' ? normaliseEmail(req.query.e) : ''));
      res.type('html').send(await accountPage(lang, customer, m));
    });

    app.post(p('login', lang), async (req, res, next) => {
      try {
        if (!sameOrigin(req)) return res.status(403).end();
        const email = normaliseEmail(req.body?.email);
        if (!EMAIL.test(email) || email.length > 254) return res.redirect(303, `${acct}?m=invalid`);
        if (!(await allow(email))) return res.redirect(303, `${acct}?m=limit`);
        let customer = await getCustomerByEmail(email);
        // Live: only existing customers and the preview addresses get a link, and the answer never says which. Preview: anyone.
        if (!customer && (config.siteMode !== 'live' || config.shop.previewEmails.includes(email))) customer = await findOrCreateCustomer(email, lang);
        if (customer) {
          const token = await createToken(customer.id, 'login', 30);
          await sendMail({ to: email, ...templates.login[lang](`${originOf(req)}${p('login', lang)}/${token}`) });
        }
        res.redirect(303, `${acct}?m=sent${config.siteMode !== 'live' ? `&e=${encodeURIComponent(email)}` : ''}`);
      } catch (e) { next(e); }
    });

    app.get(`${p('login', lang)}/:token`, async (req, res) => {
      const customer = await consumeToken(req.params.token, 'login');
      if (!customer) return res.redirect(303, `${acct}?m=invalid`);
      await signIn(res, customer.id);
      res.redirect(303, acct);
    });

    app.post(p('logout', lang), async (req, res) => {
      if (!sameOrigin(req)) return res.status(403).end();
      await signOut(req, res);
      res.redirect(303, p('home', lang));
    });

    app.get(p('invoices', lang), async (req, res) => {
      const customer = await currentCustomer(req);
      if (!customer) return res.redirect(303, acct);
      try {
        const url = await portalUrl(customer.stripe_customer_id, `${originOf(req)}${acct}`);
        if (!url) return res.redirect(303, `${acct}?m=noportal`);
        res.redirect(303, url);
      } catch (e) { console.error('portal', e.message); res.redirect(303, `${acct}?m=noportal`); }
    });

    app.post(`${acct}/runs/:id/freeze`, async (req, res) => {
      if (!sameOrigin(req)) return res.status(403).end();
      const customer = await currentCustomer(req);
      if (!customer) return res.redirect(303, acct);
      const run = await getRun(req.params.id);
      if (!run || run.customer_id !== customer.id || run.frozen) return res.redirect(303, acct);
      const def = loadQuestions(run.product);
      await freezeRun(run, def.version ?? config.version, `${run.answers.A1?.text ?? ''} ${new Date().toISOString().slice(0, 10)}`.trim());
      res.redirect(303, `${acct}#folder`);
    });

    // Checkout: one route per product. The customer is sent to Stripe (or to the test checkout) and returns to the success page.
    for (const product of Object.values(PRODUCTS)) {
      const path = product.path[lang];
      app.post(`${path}/buy`, async (req, res) => {
        if (!sameOrigin(req)) return res.status(403).end();
        const customer = await currentCustomer(req);
        const origin = originOf(req);
        try {
          const { url } = await createCheckout({
            product, lang, price: await priceFor(product), email: customer?.email,
            successUrl: `${origin}${p('checkoutSuccess', lang)}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${origin}${path}?m=cancel`,
            consentText: t(lang).shop.consent,
          });
          res.redirect(303, url);
        } catch (e) {
          console.error('checkout', e.message);
          res.redirect(303, `${path}?m=unavailable`);
        }
      });
    }

    app.get(p('checkoutSuccess', lang), async (req, res, next) => {
      try {
        const sh = t(lang).shop;
        const id = String(req.query.session_id ?? '');
        let licence = await licenceBySession(id);
        if (!licence && id) {
          const session = await retrieveCheckout(id).catch(() => null);
          const result = session ? await fulfilCheckout(session, originOf(req)) : null;
          licence = result?.licence ?? null;
        }
        if (!licence) return notFound(res, lang);
        const email = (await getCustomer(licence.customer_id))?.email ?? '';
        const link = await previewLink(email);
        const lastMail = email ? await lastMailTo(email).catch(() => null) : null;
        const mailFailed = String(lastMail?.status ?? '').startsWith('error');
        const body = `
<section class="wrap hero">
  <h1 class="title">${esc(sh.successTitle)}</h1>
  <p class="lead">${esc(sh.successText(email))}</p>
  ${link ? `<p class="small amber">${esc(sh.successPreview)}</p><div class="linkbox"><a href="${esc(link)}">${esc(link)}</a></div>` : ''}
  ${mailFailed ? `<div class="notice notice--error">${esc(sh.successMailFailed)}</div>` : ''}
  <div class="sc-row"><a class="sc-btn" href="${acct}">${esc(t(lang).account.title)}</a></div>
</section>`;
        res.type('html').send(page(lang, sh.successTitle, body, alt));
      } catch (e) { next(e); }
    });

    // The test checkout page: preview mode without a Stripe key only.
    app.get(`${p('checkoutTest', lang)}/:id`, async (req, res) => {
      const entry = testCheckoutAvailable() ? await testGateway.get(req.params.id) : null;
      if (!entry) return notFound(res, lang);
      const sh = t(lang).shop;
      const body = `
<section class="wrap acct">
  <div class="section__head"><h1 class="title">${esc(sh.testTitle)}</h1><p class="body amber">${esc(sh.testText)}</p></div>
  <div class="price"><div class="label muted">${esc(entry.product.name[lang])}</div><div class="price__amount">${esc(fmtPrice(entry.price.cents, lang))}</div><div class="price__note">${esc(entry.price.pilot ? sh.pilotPrice(entry.price.seatsLeft) : sh.regular)}</div></div>
  <form class="login" method="post" action="${p('checkoutTest', lang)}/${esc(entry.id)}">
    <label class="sc-field"><span class="sc-field__label">${esc(sh.testEmail)}</span><input class="sc-field__input" type="email" name="email" required value="${esc(entry.email)}"></label>
    <label class="wait__consent"><input type="checkbox" name="consent" value="yes" required><span>${esc(sh.consent)}</span></label>
    <div><button class="sc-btn" type="submit">${esc(sh.testPay)}</button></div>
  </form>
</section>`;
      res.type('html').send(page(lang, sh.testTitle, body, alt));
    });

    app.post(`${p('checkoutTest', lang)}/:id`, async (req, res, next) => {
      try {
        if (!sameOrigin(req)) return res.status(403).end();
        const entry = testCheckoutAvailable() ? await testGateway.get(req.params.id) : null;
        if (!entry) return notFound(res, lang);
        const email = normaliseEmail(req.body?.email);
        if (!EMAIL.test(email) || req.body?.consent !== 'yes') return res.redirect(303, `${p('checkoutTest', lang)}/${entry.id}`);
        const session = await testGateway.complete(entry.id, email);
        await fulfilCheckout(session, originOf(req));
        res.redirect(303, entry.successUrl.replace('{CHECKOUT_SESSION_ID}', entry.id));
      } catch (e) { next(e); }
    });
  }

  // Stripe webhook: raw body for the signature, idempotent per event id, fulfilment when the session is paid.
  app.post('/stripe/webhook', express.raw({ type: '*/*', limit: '1mb' }), async (req, res) => {
    if (!config.shop.stripeWebhookSecret) return res.status(503).send('webhook not configured');
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
    if (!verifyStripeSignature(raw, req.get('stripe-signature'), config.shop.stripeWebhookSecret)) return res.status(400).send('bad signature');
    let event;
    try { event = JSON.parse(raw); } catch { return res.status(400).send('bad json'); }
    if (!event?.id || !(await recordStripeEvent(event.id, String(event.type ?? '')))) return res.json({ received: true, duplicate: true });
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      try { await fulfilCheckout(event.data?.object, originOf(req)); } catch (e) { console.error('fulfil', e.message); await forgetStripeEvent(event.id).catch((x) => console.error('forget event', x.message)); return res.status(500).send('fulfilment failed'); }
    }
    res.json({ received: true });
  });
}
