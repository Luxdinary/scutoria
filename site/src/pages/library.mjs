// The library (Sapphire Cinema, 3 November 2026): one catalogue of what exists. The two toolkits on sale with cover, facts
// and price, the toolkit in preparation with a typographic cover and the notice form as its only action, and the two
// handbook sample is a button on the toolkit's card (3 November 2026). A topic rail and a search narrow the catalogue; without the script every entry is visible.
// Every product name, text and price is the existing one; the page's own copy lives in ../cinema.mjs (CINEMA.library).
import { t, p } from '../i18n.mjs';
import { layout, esc, crumb } from '../layout.mjs';
import { PRODUCTS, priceFor, fmtPrice } from '../shop/products.mjs';
import { TOOLKITS, toolkitById } from '../toolkit/registry.mjs';
import { book } from './cover.mjs';
import { handbookPathOf } from './product.mjs';
import { HOME29 } from './home-e29.mjs';
import { CINEMA, L } from '../cinema.mjs';

// The question and document counts as the product pages state them (thirty-four questions, 29 required; forty-seven, 40 required).
const FACTS = {
  'ai-policy': { de: 'Bis zu vierunddreißig Fragen, davon 29 Pflichtfragen · Sieben datierte Dokumente', en: 'Up to thirty-four questions, 29 of them required · Seven dated documents' },
  'security-evidence': { de: 'Siebenundvierzig Fragen, davon 40 Pflichtfragen · Sieben datierte Dokumente', en: 'Forty-seven questions, 40 of them required · Seven dated documents' },
};
const W = {
  en: { toolkit: 'Toolkit', licence: 'Annual licence', founder: (n) => `founder price, ${n} left`, crumb: 'Library', topics: { ai: 'AI', security: 'Security', practice: 'Practice' } },
  de: { toolkit: 'Toolkit', licence: 'Jahreslizenz', founder: (n) => `Gründerpreis, noch ${n} frei`, crumb: 'Bibliothek', topics: { ai: 'KI', security: 'Sicherheit', practice: 'Praxis' } },
};
// Product line to topic: the policy line is AI, the security line is Security, the setup line is Practice.
const TOPIC_OF = { policy: 'ai', security: 'security', setup: 'practice' };

const searchText = (parts) => esc(parts.filter(Boolean).join(' ').toLowerCase().replace(/\s+/g, ' '));

function card({ line, topic, kind, stage, kicker, title, href, text, facts = '', price = '', actions, search, extra = '' }) {
  const heading = href ? `<a href="${href}">${esc(title)}</a>` : esc(title);
  return `
      <article class="cine-card cine-card--${esc(line)} cine-entry cine-entry--${esc(kind)} reveal" data-entry data-topic="${esc(topic)}" data-search="${search}">
        ${href ? `<a class="cine-card__stage" href="${href}" tabindex="-1" aria-hidden="true">${stage}</a>` : `<div class="cine-card__stage" aria-hidden="true">${stage}</div>`}
        <div class="cine-card__meta">
          <p class="kicker">${kicker}</p>
          <h2 class="heading">${heading}</h2>
          <p class="body muted">${esc(text)}</p>
          ${facts ? `<p class="cine-card__facts">${facts}</p>` : ''}
          ${price ? `<p class="cine-card__price">${price}</p>` : ''}
          ${extra}
          <div class="sc-row">${actions}</div>
        </div>
      </article>`;
}

export async function libraryPage(lang) {
  const s = t(lang);
  const l = L(lang);
  const c = CINEMA.library;
  const sh = CINEMA.shelf;
  const w = W[lang] ?? W.en;
  const e = HOME29[lang] ?? HOME29.en;
  const onSale = TOOLKITS.filter((tk) => tk.forSale && PRODUCTS[tk.id]);
  const prices = new Map(await Promise.all(onSale.map(async (tk) => [tk.id, await priceFor(PRODUCTS[tk.id])])));
  const soldLines = new Set(onSale.map((tk) => tk.line));
  const planned = s.home.lines.filter((line) => !soldLines.has(line.key));

  const entries = [];
  // The toolkits on sale.
  for (const tk of onSale) {
    const product = PRODUCTS[tk.id];
    const price = prices.get(tk.id);
    const topic = TOPIC_OF[tk.line] ?? 'practice';
    entries.push(card({
      line: tk.line, topic, kind: 'toolkit',
      stage: book(lang, tk, { size: 'offer' }),
      kicker: `${esc(w.toolkit)} ${esc(tk.nr)} · ${esc(l(sh.available))} · ${esc(w.topics[topic])}`,
      title: product.name[lang], href: product.path[lang],
      text: e.products[tk.id][0],
      facts: `${esc(FACTS[tk.id]?.[lang] ?? '')}<br>${esc(l(sh.formats))} · ${esc(l(sh.digital))}`,
      price: `${esc(w.licence)} <strong>${esc(fmtPrice(price.cents, lang))}</strong>${price.pilot ? ` · ${esc(w.founder(price.seatsLeft))}` : ''}`,
      actions: `<a class="sc-btn sc-btn--secondary sc-btn--small" href="${product.path[lang]}">${esc(l(sh.toProduct))}</a><a class="sc-btn sc-btn--secondary sc-btn--small" href="${handbookPathOf(product, lang)}">${esc(l(sh.readHandbook))}</a>`,
      search: searchText([product.name[lang], e.products[tk.id][0], w.topics[topic], l(c.kinds.toolkit), FACTS[tk.id]?.[lang]]),
    }));
  }
  // The toolkit in preparation: listed, not hidden; its only action is the notice form on the home page.
  planned.forEach((line, i) => {
    const nr = `0${onSale.length + i + 1}`;
    const topic = TOPIC_OF[line.key] ?? 'practice';
    entries.push(card({
      line: line.key, topic, kind: 'planned',
      stage: `<div class="cine-cover cine-cover--${esc(line.key)}"><span class="cine-cover__brand">Scutoria</span><span class="cine-cover__title">${esc(line.title)}</span><span class="cine-cover__series">${esc(w.toolkit)} · ${nr}</span></div>`,
      kicker: `${esc(w.toolkit)} ${nr} · ${esc(l(sh.preparing))} · ${esc(w.topics[topic])}`,
      title: line.title, href: '',
      text: line.text,
      actions: `<a class="sc-btn sc-btn--secondary sc-btn--small" href="${p('home', lang)}#access">${esc(l(sh.waitlist))}</a>`,
      search: searchText([line.title, line.text, w.topics[topic], l(sh.preparing)]),
    }));
  });
  const filters = [['all', c.filters.all], ['ai', c.filters.ai], ['security', c.filters.security], ['practice', c.filters.practice]]
    .map(([key, label], i) => `<button class="cine-rail__btn" type="button" data-topic-filter="${key}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(l(label))}</button>`).join('');
  const n = entries.length;
  const countText = n === 1 ? l(c.countOne) : l(c.count).replace('{n}', String(n));
  const texts = esc(JSON.stringify({ one: l(c.countOne), many: l(c.count) }));
  const body = `
<section class="wrap cine-library" aria-labelledby="library-h1">
  <div class="cine-library__head reveal">
    ${crumb(lang, w.crumb)}
    <h1 id="library-h1" class="display">${esc(l(c.h1))}</h1>
    <p class="lead">${esc(l(c.lead))}</p>
  </div>
  <div class="cine-library__body" data-library>
    <aside class="cine-rail" aria-label="${esc(l(c.rail))}">
      <p class="kicker">${esc(l(c.rail))}</p>
      <div class="cine-rail__list" role="group" aria-label="${esc(l(c.rail))}">${filters}</div>
    </aside>
    <div class="cine-catalog">
      <div class="cine-catalog__bar">
        <label class="cine-search"><span class="cine-vh">${esc(l(c.search))}</span><input type="search" data-search placeholder="${esc(l(c.search))}" autocomplete="off"></label>
        <p class="cine-catalog__count" data-count data-texts="${texts}" aria-live="polite">${esc(countText)}</p>
      </div>
      <div class="cine-catalog__grid" data-entries>${entries.join('')}</div>
      <div class="cine-catalog__empty" data-empty hidden>
        <p class="body">${esc(l(c.empty)).replace('{q}', '<span data-query></span>')}</p>
        <button class="sc-btn sc-btn--secondary sc-btn--small" type="button" data-reset>${esc(l(c.reset))}</button>
      </div>
    </div>
  </div>
</section>`;
  const html = layout({ lang, title: l(c.title), description: l(c.description), body, alt: { en: p('library', 'en'), de: p('library', 'de') }, section: 'library' });
  return html.replace('</head>', '<script src="/library.js" defer></script>\n</head>');
}

export function mountLibrary(app) {
  for (const lang of ['en', 'de']) app.get(p('library', lang), async (req, res) => res.type('html').send(await libraryPage(lang)));
}
