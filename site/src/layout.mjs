// The HTML frame of every page: head, top bar, main, footer. Styles come from tokens.css, bundle.css, site.css, motion.css
// and cinema.css (Sapphire Cinema, the owner's choice of 3 November 2026: navy frame, sapphire accents, one navigation).
import { config } from './config.mjs';
import { t, p } from './i18n.mjs';
import { PRODUCTS } from './shop/products.mjs';

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export const mark = (size = 22, cls = '') =>
  `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5l6.5 3.2v11.6L12 21.5l-6.5-4.2V5.7L12 2.5z"/><path d="M12 6v12"/><path d="M8.5 12h7"/></svg>`;


// alt: the page's own path per language; it gives the canonical address, the language alternates and the share address.
// og: { image, type } for shared links; jsonLd: structured data for search engines (a data block, not a script that runs).
// section: which main navigation entry is current (home, library, tools, studio); product pages belong to the library.
export function layout({ lang, title, description, body, alt, noindex = false, theme = 'dark', og = {}, jsonLd = null, line = '', section = '' }) {
  const s = t(lang);
  const other = lang === 'en' ? 'de' : 'en';
  const altHref = alt?.[other] ?? p('home', other);
  const preview = config.siteMode !== 'live';
  const canonical = alt?.[lang] ? `${config.baseUrl}${alt[lang]}` : '';
  const ogImage = og.image ?? `${config.baseUrl}/og/scutoria-${lang}.png`;
  const current = (key) => (section === key ? ' aria-current="page"' : '');
  const nav = [['home', s.nav.discover], ['library', s.nav.library], ['tools', s.nav.tools], ['studio', s.nav.studio]];
  return `<!doctype html>
<html lang="${lang}" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="/transitions.js" blocking="render"></script>
<title>${esc(title)} · Scutoria</title>
<meta name="description" content="${esc(description)}">
${preview || noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">\n<link rel="alternate" hreflang="${lang}" href="${esc(canonical)}">\n<link rel="alternate" hreflang="x-default" href="${config.baseUrl}${esc(alt.en ?? alt[lang])}">` : ''}
<link rel="alternate" hreflang="${other}" href="${config.baseUrl}${esc(altHref)}">
<meta property="og:site_name" content="Scutoria">
<meta property="og:type" content="${esc(og.type ?? 'website')}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${lang === 'de' ? 'de_AT' : 'en_GB'}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
<link rel="stylesheet" href="/tokens.css">
<link rel="stylesheet" href="/bundle.css">
<link rel="stylesheet" href="/site.css">
<link rel="stylesheet" href="/motion.css">
<link rel="stylesheet" href="/cinema.css">
<script src="/site.js" defer></script>
<script src="/motion.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">${lang === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
<header class="bar">
  <div class="bar__inner">
    <a class="bar__brand" href="${p('home', lang)}" aria-label="Scutoria">${mark(24, 'bar__mark')}<span class="bar__word">Scutoria</span></a>
    <button class="bar__menu" type="button" aria-expanded="false" aria-controls="bar-nav"><span class="bar__burger" aria-hidden="true"><i></i><i></i><i></i></span>${esc(s.nav.menu)}</button>
    <nav class="bar__nav" id="bar-nav" aria-label="${esc(s.nav.main)}">
      ${nav.map(([key, label]) => `<a href="${p(key, lang)}"${current(key)}>${esc(label)}</a>`).join('\n      ')}
      <div class="bar__util">
        <a class="bar__account" href="${p('account', lang)}"${current('account')}>${esc(s.nav.account)}</a>
        <a class="bar__lang" href="${altHref}" lang="${other}" hreflang="${other}">${esc(s.switchTo)}</a>
      </div>
    </nav>
  </div>
</header>
<div class="readbar" aria-hidden="true"><i></i></div>
<main id="main" tabindex="-1" class="main${line ? ` main--${esc(line)}` : ''}">
${body}
</main>
<footer class="foot">
  <div class="foot__inner">
    <div class="foot__brand">${mark(18)}<span>Scutoria</span><span class="foot__claim">${esc(config.brand.claim[lang])}</span></div>
    <div class="foot__cols">
      <div class="foot__col">
        <p class="foot__h">${esc(s.footer.toolkits)}</p>
        <a href="${PRODUCTS['ai-policy'].path[lang]}">${esc(PRODUCTS['ai-policy'].name[lang])}</a>
        <a href="${PRODUCTS['security-evidence'].path[lang]}">${esc(PRODUCTS['security-evidence'].name[lang])}</a>
        <a href="${p('library', lang)}">${esc(s.nav.library)}</a>
      </div>
      <div class="foot__col">
        <p class="foot__h">${esc(s.footer.knowledge)}</p>
        <a href="${p('tools', lang)}">${esc(s.nav.tools)}</a>
        <a href="${p('memos', lang)}">${esc(s.footer.memos)}</a>
        <a href="${p('studio', lang)}">${esc(s.nav.studio)}</a>
        <a href="${p('about', lang)}">${esc(s.footer.about)}</a>
      </div>
      <div class="foot__col">
        <p class="foot__h">${esc(s.footer.account)}</p>
        <a href="${p('account', lang)}">${esc(s.nav.account)}</a>
        <a href="${p('withdraw', lang)}">${esc(s.footer.withdraw)}</a>
      </div>
      <div class="foot__col">
        <p class="foot__h">${esc(s.footer.legalHead)}</p>
        <a href="${p('legal', lang)}">${esc(s.footer.legal)}</a>
        <a href="${p('privacy', lang)}">${esc(s.footer.privacy)}</a>
        <a href="${p('terms', lang)}">${esc(s.footer.terms)}</a>
        <a href="${p('withdrawal', lang)}">${esc(s.footer.withdrawal)}</a>
      </div>
    </div>
    <div class="foot__tag">${esc(s.footer.tag)} · ${esc(config.brand.email)}</div>
  </div>
</footer>
</body>
</html>`;
}

// The breadcrumb kicker of the Cinema pages (3 November 2026, owner's request): the brand links home, the current page stays text.
export function crumb(lang, label) {
  return `<p class="kicker cine-crumb"><a href="${p('home', lang)}">Scutoria</a><span class="cine-crumb__sep" aria-hidden="true">/</span><span aria-current="page">${esc(label)}</span></p>`;
}
