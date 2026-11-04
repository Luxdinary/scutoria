// Scutoria website. Express 5, server-rendered HTML, SQLite in Node. English at /, German under /de/.
import express from './runtime/express.mjs';
import { config } from './config.mjs';
import { languages, paths, p } from './i18n.mjs';
import { homePage } from './pages/home.mjs';
import { legalPage, legalKeys } from './pages/legal.mjs';
import { robotsTxt, sitemapXml } from './pages/seo.mjs';
import { toolsPage, mayThisGoInPage, anythingPersonalPage, TOOLS_CSP } from './pages/tools.mjs';
import { layout, esc } from './layout.mjs';
import { addToWaitlist, countHit } from './db.mjs';
import { mountToolkit } from './toolkit/routes.mjs';
import { mountShop } from './shop/routes.mjs';
import { mountMemos } from './memos/routes.mjs';
import { mountWithdrawal } from './withdraw.mjs';
import { mountLibrary } from './pages/library.mjs';
import { mountStudio } from './pages/studio.mjs';

export const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

// Security headers. Everything, fonts included, is served from here; no third-party requests.
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; form-action 'self' https://checkout.stripe.com https://billing.stripe.com; frame-ancestors 'none'; base-uri 'none'; object-src 'none'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
  });
  next();
});

// redirect: false, so that /tools (a page) is not redirected to the /tools/ folder of the modules.
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Health with a configuration status that names no values: which checkout runs, whether the webhook secret, the mail key,
// the memo list and the legal review date are set. Lets the live-go be checked from outside without reading any secret.
app.get('/health', (req, res) => res.json({
  ok: true, version: config.version, mode: config.siteMode,
  checkout: config.shop.stripeSecretKey ? 'stripe' : (config.siteMode !== 'live' ? 'test' : 'none'),
  webhook: Boolean(config.shop.stripeWebhookSecret),
  mail: Boolean(config.mail.brevoApiKey),
  memoList: Boolean(config.memos?.brevoListId),
  legalReviewed: Boolean(config.legalReviewedAt),
}));
app.get('/robots.txt', (req, res) => res.type('text/plain').send(robotsTxt()));
app.get('/sitemap.xml', (req, res) => res.type('application/xml').send(sitemapXml()));

// Page views, aggregated per day, path, language and referrer host. No personal data.
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.includes('.') && req.path !== '/health') {
    // Awaited before the page is rendered: on Workers a promise left running after the response may be cut off.
    return countHit(req.path, req.path.startsWith('/de') ? 'de' : 'en', req.get('referer')).catch(() => { /* counting never breaks a page */ }).then(() => next());
  }
  next();
});

for (const lang of languages) {
  app.get(p('home', lang), async (req, res) => res.type('html').send(await homePage(lang, { waitlist: req.query.w })));
  for (const key of legalKeys) app.get(p(key, lang), (req, res) => res.type('html').send(legalPage(key, lang)));
  // The free tools: pages whose security policy forbids any network request, so "sends nothing" is enforced by the browser.
  app.get(p('tools', lang), (req, res) => res.type('html').send(toolsPage(lang)));
  app.get(p('toolIn', lang), (req, res) => res.set('Content-Security-Policy', TOOLS_CSP).type('html').send(mayThisGoInPage(lang)));
  app.get(p('toolPersonal', lang), (req, res) => res.set('Content-Security-Policy', TOOLS_CSP).type('html').send(anythingPersonalPage(lang)));
  app.post(p('waitlist', lang), async (req, res) => {
    const email = String(req.body?.email ?? '').trim();
    const consent = req.body?.consent === 'yes';
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
    if (!valid || !consent) return res.redirect(303, `${p('home', lang)}?w=error#access`);
    try {
      await addToWaitlist(email, lang);
    } catch (e) {
      console.error('waitlist', e.message);
      return res.redirect(303, `${p('home', lang)}?w=failed#access`);
    }
    return res.redirect(303, `${p('home', lang)}?w=ok#access`);
  });
}
app.get('/de', (req, res) => res.redirect(301, paths.home.de));
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const to = req.path === '/imprint' ? '/legal' : req.path === '/en' || req.path === '/en/' ? '/' : req.path.startsWith('/en/') ? req.path.slice(3) : null;
  if (!to) return next();
  const q = req.originalUrl.indexOf('?');
  return res.redirect(301, to + (q >= 0 ? req.originalUrl.slice(q) : ''));
});
// Old shop paths on scutoria.com (Stripe links to /agb): permanent redirects, query string kept.
for (const [from, to] of [['/agb', '/de/agb'], ['/datenschutz', '/de/datenschutz'], ['/impressum', '/de/impressum'], ['/widerruf', '/de/widerruf']]) {
  const go = (req, res) => { const q = req.originalUrl.indexOf('?'); res.redirect(301, to + (q >= 0 ? req.originalUrl.slice(q) : '')); };
  app.get(from, go); app.get(from + '/', go);
}
mountToolkit(app);
mountShop(app);
mountMemos(app);
mountWithdrawal(app);
mountLibrary(app);
mountStudio(app);

app.use(async (req, res) => {
  const lang = req.path.startsWith('/de') ? 'de' : 'en';
  res.status(404).type('html').send(notFoundPage(lang));
});


const NOT_FOUND = {
  en: { title: 'Page not found', text: 'The address you opened does not exist on scutoria.com. It may have moved or been mistyped.', links: ['Start page', 'Library', 'Free tools'], code: 'Error 404' },
  de: { title: 'Seite nicht gefunden', text: 'Die aufgerufene Adresse gibt es auf scutoria.com nicht. Vielleicht wurde sie verschoben oder falsch eingegeben.', links: ['Startseite', 'Bibliothek', 'Kostenlose Tools'], code: 'Fehler 404' },
};
export function notFoundPage(lang) {
  const n = NOT_FOUND[lang];
  const hrefs = [p('home', lang), p('library', lang), p('tools', lang)];
  const body = `<section class="wrap hero cine-simple"><p class="kicker">${esc(n.code)}</p><h1 class="display">${esc(n.title)}</h1><p class="lead">${esc(n.text)}</p><div class="sc-row notfound__links">${hrefs.map((h, i) => `<a class="sc-btn${i ? ' sc-btn--secondary' : ''}" href="${h}">${esc(n.links[i])}</a>`).join('')}</div></section>`;
  return layout({ lang, title: n.title, description: n.text, body, noindex: true });
}
