// robots.txt and sitemap.xml. In preview mode everything is disallowed; live, the public pages are listed with their language alternates.
import { config } from '../config.mjs';
import { languages, p } from '../i18n.mjs';
import { PRODUCTS } from '../shop/products.mjs';
import { handbookPathOf } from './product.mjs';

export function robotsTxt() {
  if (config.siteMode !== 'live') return 'User-agent: *\nDisallow: /\n';
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /account',
    'Disallow: /de/konto',
    'Disallow: /checkout',
    'Disallow: /de/kasse',
    'Disallow: /stripe/',
    'Disallow: /toolkits/ai-policy/run/',
    'Disallow: /de/toolkits/ki-richtlinien/run/',
    'Disallow: /toolkits/security-evidence/run/',
    'Disallow: /de/toolkits/sicherheitsnachweis/run/',
    'Disallow: /memos/*/memo',
    'Disallow: /de/memos/*/memo',
    `Sitemap: ${config.baseUrl}/sitemap.xml`,
    '',
  ].join('\n');
}

// Public pages, one entry per page with both language paths. Legal pages only once they are reviewed.
export function sitemapEntries() {
  const entries = [{ en: p('home', 'en'), de: p('home', 'de') }];
  for (const product of Object.values(PRODUCTS)) {
    entries.push({ en: product.path.en, de: product.path.de });
    entries.push({ en: handbookPathOf(product, 'en'), de: handbookPathOf(product, 'de') });
  }
  for (const key of ['library', 'studio', 'tools', 'toolIn', 'toolPersonal', 'memos', 'memoNis2', 'memoLabelling', 'memoLogin', 'memoStart']) entries.push({ en: p(key, 'en'), de: p(key, 'de') });
  entries.push({ en: p('about', 'en'), de: p('about', 'de') });
  if (config.legalReviewedAt) for (const key of ['legal', 'privacy', 'terms', 'withdrawal']) entries.push({ en: p(key, 'en'), de: p(key, 'de') });
  return entries;
}

export function sitemapXml() {
  const base = config.baseUrl;
  const urls = [];
  for (const e of sitemapEntries()) {
    for (const lang of languages) {
      const links = languages.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${base}${e[l]}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${base}${e.en}"/>`;
      urls.push(`<url><loc>${base}${e[lang]}</loc>${links}</url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}
