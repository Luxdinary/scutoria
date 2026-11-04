// The studio: the planned explainers and shorts of the YouTube programme (content/studio.json), each tied to a toolkit,
// a tool and a handbook. Nothing is published yet, so the posters are typographic, carry the real titles and the honest
// status, and promise no player. Sapphire Cinema, 3 November 2026 (package section 12).
import { p } from '../i18n.mjs';
import { layout, esc, crumb } from '../layout.mjs';
import { PRODUCTS } from '../shop/products.mjs';
import { memoById } from '../memos/index.mjs';
import { TOOL_TEXTS } from './tools.mjs';
import { STUDIO as DATA, studioText } from '../studio-data.mjs';
import { CINEMA, L } from '../cinema.mjs';

const STATUS_CLASS = { production: 'sc-pill sc-pill--green', planned: 'sc-pill', published: 'sc-pill sc-pill--accent' };

const handbookPath = (id, lang) => `${PRODUCTS[id].path[lang]}/${lang === 'de' ? 'handbuch' : 'handbook'}`;
const videoByNo = (no) => DATA.videos.find((v) => v.no === no) ?? null;

// The tool behind a video: one of the memo generators or the browser check "May this go in?".
function toolLink(id, lang) {
  if (!id) return null;
  if (id === 'may-this-go-in') return { label: (TOOL_TEXTS[lang] ?? TOOL_TEXTS.en).in.title, href: p('toolIn', lang) };
  const memo = memoById(id);
  return memo ? { label: memo.title[lang], href: p(memo.pathKey, lang) } : null;
}

function statusPill(status, lang) {
  const l = L(lang);
  const label = CINEMA.studio.status[status] ?? CINEMA.studio.status.planned;
  return `<span class="${STATUS_CLASS[status] ?? 'sc-pill'}">${esc(l(label))}</span>`;
}

// A landscape poster for an explainer: line colour, the number large, the title, the languages and the status.
function videoPoster(video, lang, { tone = 1 } = {}) {
  const l = L(lang);
  const c = CINEMA.studio;
  return `<article class="cine-poster cine-poster--wide cine-poster--${esc(video.line)} cine-poster--tone-${tone}">
    <p class="cine-poster__kicker">${esc(l(c.featured).replace(/01$/, video.no))}<span>${esc(l(c.languages))}</span></p>
    <span class="cine-poster__no" aria-hidden="true" data-no="${esc(video.no)}"></span>
    <h3 class="cine-poster__title">${esc(l(video.title))}</h3>
    <p class="cine-poster__foot">${statusPill(video.status, lang)}<span class="cine-poster__soon">${esc(l(c.previewSoon))}</span></p>
  </article>`;
}

// A portrait poster for a short: the hook as its title, the code and the format, the status.
function shortPoster(short, lang, { tone = 2 } = {}) {
  const l = L(lang);
  const c = CINEMA.studio;
  const video = videoByNo(short.video);
  return `<article class="cine-poster cine-poster--tall cine-poster--${esc(video?.line ?? 'foundations')} cine-poster--tone-${tone}">
    <p class="cine-poster__kicker">${esc(l(c.short))} ${esc(short.id)}<span>${esc(l(c.format))}</span></p>
    <h3 class="cine-poster__title cine-poster__title--hook">${esc(l(short.hook))}</h3>
    <p class="cine-poster__foot">${statusPill(short.status, lang)}</p>
  </article>`;
}

function programme(lang) {
  const l = L(lang);
  const c = CINEMA.studio;
  const items = DATA.videos.map((video) => {
    const product = PRODUCTS[video.product];
    const tool = toolLink(video.tool, lang);
    const links = [
      product ? `<a href="${product.path[lang]}">${esc(product.name[lang])}</a>` : '',
      tool ? `<a href="${tool.href}">${esc(tool.label)}</a>` : '',
      product ? `<a href="${handbookPath(video.product, lang)}">${esc(l(c.handbook))}</a>` : '',
    ].filter(Boolean).join('<span class="cine-prog__dot" aria-hidden="true">·</span>');
    return `<li class="cine-prog cine-prog--${esc(video.line)}">
      <span class="cine-prog__no" aria-hidden="true">${esc(video.no)}</span>
      <div class="cine-prog__body">
        <h3 class="heading">${esc(l(video.title))}</h3>
        <p class="cine-prog__related"><span class="kicker">${esc(l(c.related))}</span>${links}</p>
      </div>
      <div class="cine-prog__status">${statusPill(video.status, lang)}<span class="cine-prog__langs">${esc(l(c.languages))}</span></div>
    </li>`;
  }).join('');
  return `<ol class="cine-programme">${items}</ol>`;
}

export function studioPage(lang) {
  const l = L(lang);
  const c = CINEMA.studio;
  const first = DATA.videos[0];
  const shorts = DATA.shorts;
  const body = `
<section class="wrap cine-page-head">
  ${crumb(lang, l(c.title))}
  <h1 class="display">${esc(l(c.h1))}</h1>
  <p class="lead">${esc(studioText(l(c.lead), lang))}</p>
</section>
<section class="wrap section cine-studio" aria-labelledby="studio-featured">
  <h2 id="studio-featured" class="title title--s">${esc(l(c.featured))}</h2>
  <div class="cine-studio__featured">
    ${videoPoster(first, lang, { tone: 1 })}
    ${shortPoster(shorts[0], lang, { tone: 2 })}
    ${shortPoster(shorts[1], lang, { tone: 3 })}
  </div>
  <p class="small muted">${esc(l(c.note))}</p>
</section>
<section class="wrap section" aria-labelledby="studio-shorts">
  <h2 id="studio-shorts" class="title title--s">${esc(l(c.shorts))}</h2>
  <div class="cine-shorts" tabindex="0">
    ${shorts.map((short, i) => shortPoster(short, lang, { tone: (i % 3) + 1 })).join('')}
  </div>
</section>
<section class="wrap section" aria-labelledby="studio-programme">
  <h2 id="studio-programme" class="title title--s">${esc(l(c.programme))}</h2>
  ${programme(lang)}
  <p class="small muted">${esc(l(c.note))}</p>
</section>`;
  return layout({ lang, title: l(c.title), description: l(c.description), body, alt: { en: p('studio', 'en'), de: p('studio', 'de') }, section: 'studio' });
}

export function mountStudio(app) {
  for (const lang of ['en', 'de']) app.get(p('studio', lang), (req, res) => res.type('html').send(studioPage(lang)));
}
