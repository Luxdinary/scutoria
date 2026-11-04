// The home page in Sapphire Cinema (the owner's choice of 3 November 2026, hero option 2): the stage with the symbolic
// image, three topic paths with real links, the studio module, the situations with their real sample documents (E29),
// the shelf with the toolkits, how it works, the method block with markers and samples, the tools, the closing step and
// the notice form. Every product, price, tool and legal text is the existing one; the new copy lives in ../cinema.mjs.
import { config } from '../config.mjs';
import { t, p } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { PRODUCTS, priceFor, fmtPrice } from '../shop/products.mjs';
import { handbookPathOf } from './product.mjs';
import { MEMOS } from '../memos/index.mjs';
import { TOOLKITS, toolkitById } from '../toolkit/registry.mjs';
import { paperThumb, stepPictures } from './paper.mjs';
import { book, SLIDER, ICONS } from './cover.mjs';
import { TOOL_TEXTS } from './tools.mjs';
import { previewIn, previewPersonal } from './previews.mjs';
import { HOME29, workbench, markerModule, tryBlock, finishHome } from './home-e29.mjs';
import { CINEMA, L } from '../cinema.mjs';
import { studioText } from '../studio-data.mjs';

const T = {
  en: {
    ctaHandbook: 'Read the sample', seeProduct: 'See the product page',
    howH: 'How it works',
    steps: [['Answer', 'Up to thirty-four or forty-seven questions. Start with your business or look at the example first. Stop and come back any time.'], ['Download', 'Seven dated documents as PDF, DOCX and XLSX, all as one ZIP.'], ['Enact', 'Sign, post, brief, send; freeze a version in your evidence folder. Updates during the licence.']],
    trust: 'Every rule in the documents has a reason in the handbook, and every reason has a source with its retrieval date. What is not settled is marked, not hidden: every uncertainty is listed with its status, seventeen points in the AI Policy Toolkit, of which eight remain open, and twenty-three in the Security Evidence Toolkit, of which thirteen remain open, as of 23 October 2026. Read the handbook samples before you buy, or look at the example pages of the fictional example business.',
    marks: ['Fact', 'Interpretation', 'Uncertain', 'Gap'],
    meanings: ['Read at the original source, with retrieval date.', 'Our conclusion, open to argument.', 'Sources contradict each other or the law is open.', 'No source answers it, so you decide and the field stays open on purpose.'],
    samplesH: 'See it before you buy',
    samples: {
      'ai-policy': [['AI usage policy', 'sample-d1-policy-en.pdf', 'D1', 'Page 1 of 3'], ['Evidence summary', 'sample-d7-evidence-en.pdf', 'D7', '1 page'], ['Handbook', null, 'HB', '4 of 24 pages']],
      'security-evidence': [['Security self-declaration', 'sample-d1-self-declaration-en.pdf', 'D1', 'Page 1 of 3'], ['Emergency card', 'sample-d3-emergency-card-en.pdf', 'D3', '1 page'], ['Handbook', null, 'HB', '4 of 37 pages']],
    },
    pdf: 'PDF', online: 'Read the handbook sample', sample: 'Sample',
    toolsH: 'Tools for your staff', toolsText: 'Two small tools that run in the browser and send nothing. Share them with colleagues.',
    tools: [['May this go in?', 'Four questions before you paste something into an AI tool. A traffic light with reasons.', 'toolIn'], ['Is there anything personal in it?', 'Marks what identifies a person in a text and replaces it with placeholders.', 'toolPersonal']],
    openTool: 'Open', allTools: 'All tools', example: 'Example',
    memosText: 'And four memo generators: a few questions, then a dated memo with sources for your business, sent as PDF.',
    toolkit: 'Toolkit', licence: 'Annual licence', founder: (n) => `founder price, ${n} left`, topic: { policy: 'AI', security: 'Security', setup: 'Practice' },
  },
  de: {
    ctaHandbook: 'Leseprobe lesen', seeProduct: 'Zur Produktseite',
    howH: 'So läuft es',
    steps: [['Beantworten', 'Bis zu vierunddreißig oder siebenundvierzig Fragen. Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst das Beispiel an. Jederzeit unterbrechen und zurückkommen.'], ['Herunterladen', 'Sieben datierte Dokumente als PDF, DOCX und XLSX, alles als ein ZIP.'], ['In Kraft setzen', 'Unterschreiben, aushängen, einweisen, senden; eine Fassung im Nachweisordner einfrieren. Aktualisierungen während der Lizenz.']],
    trust: 'Jede Regel in den Dokumenten hat eine Begründung im Handbuch, und jede Begründung eine Quelle mit Abrufdatum. Was nicht geklärt ist, wird markiert, nicht versteckt: Jede Unsicherheit wird mit ihrem Stand aufgeführt, siebzehn Punkte im KI-Richtlinien-Toolkit, davon acht offen, und dreiundzwanzig im Sicherheitsnachweis-Toolkit, davon dreizehn offen, zum Stand 23. Oktober 2026. Lesen Sie die Leseproben der Handbücher vor dem Kauf, oder sehen Sie die Beispielseiten des erfundenen Beispielbetriebs an.',
    marks: ['Fakt', 'Auslegung', 'Unsicher', 'Lücke'],
    meanings: ['Am Original gelesen, mit Abrufdatum.', 'Unsere Schlussfolgerung, über die sich streiten lässt.', 'Quellen widersprechen sich oder die Rechtslage ist offen.', 'Keine Quelle beantwortet die Frage, Sie entscheiden, und das Feld bleibt absichtlich offen.'],
    samplesH: 'Vorher ansehen',
    samples: {
      'ai-policy': [['KI-Nutzungsrichtlinie', 'leseprobe-d1-richtlinie-de.pdf', 'D1', 'Seite 1 von 3'], ['Nachweisseite', 'leseprobe-d7-nachweis-de.pdf', 'D7', '1 Seite'], ['Handbuch', null, 'HB', '4 von 26 Seiten']],
      'security-evidence': [['Selbstauskunft Informationssicherheit', 'leseprobe-d1-selbstauskunft-de.pdf', 'D1', 'Seite 1 von 3'], ['Notfallkarte', 'leseprobe-d3-notfallkarte-de.pdf', 'D3', '1 Seite'], ['Handbuch', null, 'HB', '4 von 40 Seiten']],
    },
    pdf: 'PDF', online: 'Leseprobe des Handbuchs lesen', sample: 'Leseprobe',
    toolsH: 'Tools für Ihre Belegschaft', toolsText: 'Zwei kleine Werkzeuge, die im Browser laufen und nichts senden. Teilen Sie sie mit Kolleginnen und Kollegen.',
    tools: [['Darf das hinein?', 'Vier Fragen, bevor Sie etwas in ein KI-Tool einfügen. Eine Ampel mit Gründen.', 'toolIn'], ['Steht da etwas Persönliches drin?', 'Markiert, was in einem Text eine Person erkennbar macht, und ersetzt es durch Platzhalter.', 'toolPersonal']],
    openTool: 'Öffnen', allTools: 'Alle Tools', example: 'Beispiel',
    memosText: 'Und vier Memo-Generatoren: ein paar Fragen, dann ein datiertes Memo mit Quellen für Ihren Betrieb, als PDF zugesandt.',
    toolkit: 'Toolkit', licence: 'Jahreslizenz', founder: (n) => `Gründerpreis, noch ${n} frei`, topic: { policy: 'KI', security: 'Sicherheit', setup: 'Praxis' },
  },
};

const PATH_ICONS = {
  ai: '<svg class="cine-path__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>',
  security: '<svg class="cine-path__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3l9 9-9 9-9-9z"/></svg>',
  practice: '<svg class="cine-path__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 18L18 6M9 6h9v9"/></svg>',
};

// The hero: the stage with the symbolic image (the one WebP, responsive sizes), text over the navy gradient at the left.
function heroStage(lang) {
  const l = L(lang);
  const h = CINEMA.hero;
  return `
<section class="wrap cine-hero" aria-labelledby="hero-h1">
  <div class="cine-stage">
    <img class="cine-stage__img" src="/img/studio-stage-1600.webp" srcset="/img/studio-stage-800.webp 800w, /img/studio-stage-1200.webp 1200w, /img/studio-stage-1600.webp 1672w" sizes="(max-width: 760px) 100vw, 1160px" width="1672" height="941" alt="" fetchpriority="high" decoding="async">
    <div class="cine-stage__scrim" aria-hidden="true"></div>
    <div class="cine-stage__copy">
      <p class="kicker">${esc(l(h.meta))}</p>
      <h1 id="hero-h1" class="cine-h1">${esc(l(h.h1))}</h1>
      <p class="cine-lead">${esc(l(h.lead))}</p>
      <div class="sc-row cine-actions"><a class="sc-btn" href="${p('library', lang)}">${esc(l(h.primary))}</a><a class="sc-btn sc-btn--secondary" href="${p('tools', lang)}">${esc(l(h.secondary))}</a></div>
      <p class="cine-claim">${esc(config.brand.claim[lang])}</p>
    </div>
    <p class="cine-stage__badge" aria-hidden="true">${esc(l(h.badge))}</p>
  </div>
</section>`;
}

// Three ways in: a choice that shows the explanation, the tool and the working document behind each topic. Without the
// script all three panels are visible; home.js turns them into a choice.
function topicPaths(lang) {
  const l = L(lang);
  const c = CINEMA.paths;
  const rows = c.items.map((it, i) => `<button class="cine-path" type="button" data-path aria-pressed="${i === 0 ? 'true' : 'false'}">${PATH_ICONS[it.id]}<span class="cine-path__text"><strong>${esc(l(it.title))}</strong><span>${esc(l(it.text))}</span></span></button>`).join('');
  const panels = c.items.map((it, i) => `<div class="cine-path__panel${i === 0 ? ' is-current' : ''}" data-path-panel>
      <span class="kicker">${esc(l(c.labels.explanation))}</span><a href="${esc(l(it.explanation.href))}">${esc(l(it.explanation.label))}</a>
      <span class="kicker">${esc(l(c.labels.tool))}</span><a href="${esc(l(it.tool.href))}">${esc(l(it.tool.label))}</a>
      <span class="kicker">${esc(l(c.labels.document))}</span><a href="${esc(l(it.document.href))}">${esc(l(it.document.label))}</a>
    </div>`).join('');
  return `
<section class="wrap cine-paths" aria-label="${esc(l(c.title))}" data-paths>
  <div class="cine-paths__row" role="group" aria-label="${esc(l(c.title))}">${rows}</div>
  <div class="cine-paths__panels" aria-live="polite">${panels}</div>
</section>`;
}

function studioModule(lang) {
  const l = L(lang);
  const c = CINEMA.studioModule;
  const st = CINEMA.studio.status.production;
  return `
<section class="wrap">
  <div class="cine-feature reveal">
    <div class="cine-feature__copy">
      <p class="kicker">${esc(l(c.kicker))}</p>
      <h2 class="title">${esc(studioText(l(c.h2), lang))}</h2>
      <p class="body">${esc(studioText(l(c.text), lang))}</p>
      <div class="sc-row"><a class="sc-btn" href="${p('studio', lang)}">${esc(l(c.button))}</a><span class="sc-pill sc-pill--green">${esc(l(st))}</span></div>
    </div>
    <img class="cine-feature__img" src="/img/studio-stage-m-800.webp" width="800" height="450" alt="" loading="lazy" decoding="async">
  </div>
</section>`;
}

export async function homePage(lang, state = {}) {
  const s = t(lang);
  const x = T[lang] ?? T.en;
  const e = HOME29[lang];
  const l = L(lang);
  const w = s.home.waitlist;
  const onSale = TOOLKITS.filter((tk) => tk.forSale && PRODUCTS[tk.id]).map((tk) => PRODUCTS[tk.id]);
  const prices = new Map(await Promise.all(onSale.map(async (product) => [product.id, await priceFor(product)])));
  const soldLines = new Set(TOOLKITS.filter((tk) => tk.forSale).map((tk) => tk.line));
  const nextLines = s.home.lines.filter((line) => !soldLines.has(line.key));
  let notice = '';
  if (state.waitlist === 'ok') notice = `<div class="notice notice--ok">${esc(w.thanks)}</div>`;
  if (state.waitlist === 'error') notice = `<div class="notice notice--error">${esc(w.error)}</div>`;
  if (state.waitlist === 'failed') notice = `<div class="notice notice--error">${esc(w.failed)}</div>`;

  // The shelf: the toolkits on sale as covers with their facts and price, then what is in preparation.
  const sh = CINEMA.shelf;
  const cards = onSale.map((product, i) => {
    const tk = toolkitById(product.id);
    const price = prices.get(product.id);
    const priceLine = `${esc(x.licence)} <strong>${esc(fmtPrice(price.cents, lang))}</strong>${price.pilot ? ` · ${esc(x.founder(price.seatsLeft))}` : ''}`;
    return `
    <article class="cine-card cine-card--${esc(tk.line)} reveal reveal--${i + 1}">
      <a class="cine-card__stage" href="${product.path[lang]}" tabindex="-1" aria-hidden="true">${book(lang, tk, { size: 'offer' })}</a>
      <div class="cine-card__meta">
        <p class="kicker">${esc(x.toolkit)} ${esc(tk.nr)} · ${esc(l(sh.available))} · ${esc(x.topic[tk.line] ?? tk.line)}</p>
        <h3 class="heading"><a href="${product.path[lang]}">${esc(product.name[lang])}</a></h3>
        <p class="body muted">${esc(e.products[product.id][0])}</p>
        <p class="cine-card__facts">${esc(l(sh.formats))} · ${esc(l(sh.digital))}</p>
        <p class="cine-card__price">${priceLine}</p>
        <div class="sc-row"><a class="sc-btn sc-btn--secondary sc-btn--small" href="${product.path[lang]}">${esc(l(sh.toProduct))}</a><a class="sc-btn sc-btn--secondary sc-btn--small" href="${handbookPathOf(product, lang)}">${esc(l(sh.readHandbook))}</a></div>
      </div>
    </article>`;
  }).join('');
  const planned = nextLines.map((line, i) => `
    <article class="cine-card cine-card--${esc(line.key)} cine-card--planned reveal reveal--${onSale.length + i + 1}">
      <div class="cine-card__stage" aria-hidden="true"><div class="cine-cover cine-cover--${esc(line.key)}"><span class="cine-cover__brand">Scutoria</span><span class="cine-cover__title">${esc(line.title)}</span><span class="cine-cover__series">${esc(x.toolkit)} · 0${onSale.length + i + 1}</span></div></div>
      <div class="cine-card__meta">
        <p class="kicker">${esc(x.toolkit)} 0${onSale.length + i + 1} · ${esc(l(sh.preparing))} · ${esc(x.topic[line.key] ?? line.key)}</p>
        <h3 class="heading">${esc(line.title)}</h3>
        <p class="body muted">${esc(line.text)}</p>
        <div class="sc-row"><a class="sc-btn sc-btn--secondary sc-btn--small" href="#access">${esc(l(sh.waitlist))}</a></div>
      </div>
    </article>`).join('');

  // How it works: the three steps with their pictures (E23 scrollytelling, unchanged).
  const pictures = stepPictures();
  const sl = SLIDER[lang] ?? SLIDER.en;
  const steps = x.steps.map(([h, text], i) => `<li><div class="steps__pic" aria-hidden="true">${pictures[i]}</div><span class="steps__n">${i + 1}</span><div class="steps__text"><h3 class="heading">${esc(h)}</h3><p class="body muted">${esc(text)}</p></div></li>`).join('');
  const scrollyDots = x.steps.map((_, i) => `<button class="carousel__tab" type="button" aria-pressed="${i === 0 ? 'true' : 'false'}">${i + 1}</button>`).join('');
  const scrolly = `<div class="scrolly" data-scrolly><div class="scrolly__pics" aria-hidden="true">${pictures.map((pic) => `<div class="scrolly__pic">${pic}</div>`).join('')}</div><ol class="steps steps--band">${steps}</ol><div class="scrolly__dots">${scrollyDots}</div></div>`;

  // The samples (E35): one-page PDFs of the example business and the handbook's reading sample, per toolkit.
  const samples = onSale.map((product) => {
    const list = x.samples[product.id] ?? [];
    const thumbs = list.map(([label, file, code, meta], i) => paperThumb(lang, { href: file ? `/samples/${product.id}/${file}` : handbookPathOf(product, lang), title: label, code: `${code} · ${file ? x.pdf : x.sample}`, meta, kind: code === 'HB' ? 'handbook' : 'doc', slide: sl.slide(i + 1, list.length) })).join('');
    return `
    <div class="samples__group samples__group--${esc(toolkitById(product.id).line)} reveal">
      <h3 class="heading">${esc(product.name[lang])}</h3>
      <div class="carousel" data-carousel="scroll" role="region" aria-roledescription="carousel" aria-label="${esc(product.name[lang])}">
        <div class="carousel__track" data-track>${thumbs}</div>
        <div class="carousel__ui"><button class="carousel__btn" type="button" data-prev aria-label="${esc(sl.prev)}">${ICONS.prev}</button><button class="carousel__btn" type="button" data-next aria-label="${esc(sl.next)}">${ICONS.next}</button></div>
      </div>
      <p class="samples__more small"><a href="${handbookPathOf(product, lang)}">${esc(x.online)}</a></p>
    </div>`;
  }).join('');

  const tools = x.tools.map(([title, text, key], i) => `
      <article class="sc-card sc-card--tool reveal reveal--${i + 1}">
        <div class="sc-card__kicker">${esc((TOOL_TEXTS[lang] ?? TOOL_TEXTS.en).index.noNetwork)}</div>
        <h3 class="sc-card__title">${esc(title)}</h3>
        <p class="sc-card__text">${esc(text)}</p>
        ${i === 0 ? previewIn(lang, TOOL_TEXTS[lang] ?? TOOL_TEXTS.en, x.example) : previewPersonal(lang, TOOL_TEXTS[lang] ?? TOOL_TEXTS.en, x.example)}
        <div class="sc-card__actions"><a class="sc-btn sc-btn--secondary sc-btn--small" href="${p(key, lang)}">${esc(x.openTool)}</a></div>
      </article>`).join('');

  const m = CINEMA.method;
  const body = `
${heroStage(lang)}
${topicPaths(lang)}
${studioModule(lang)}
<section class="wrap section cine-situations" id="situations">
  <div class="section__head reveal">
    <p class="kicker">${esc(l(CINEMA.situations.kicker))}</p>
    <h2 class="title">${esc(e.h1)}</h2>
    <p class="body muted">${esc(e.lead)}</p>
    <p class="small muted">${esc(e.note)}</p>
  </div>
  ${workbench(lang)}
</section>
<section class="wrap section" id="products">
  <div class="section__head section__head--row reveal">
    <div><p class="kicker">${esc(l(sh.kicker))}</p><h2 class="title">${esc(l(sh.h2))}</h2></div>
    <a class="cine-more" href="${p('library', lang)}">${esc(l(sh.all))} →</a>
  </div>
  <div class="cine-shelf">${cards}${planned}</div>
</section>
<section class="wrap section" id="how">
  <div class="section__head reveal"><h2 class="title">${esc(x.howH)}</h2></div>
  ${scrolly}
</section>
<section class="wrap section" id="trust">
  <div class="cine-method reveal">
    <div class="cine-method__head">
      <div class="section__head"><p class="kicker">${esc(l(m.kicker))}</p><h2 class="title">${esc(l(m.h2))}</h2><p class="body muted">${esc(l(m.text))}</p></div>
      <p class="body">${esc(x.trust)}</p>
    </div>
    ${markerModule(lang, x.marks, x.meanings)}
  </div>
  <div class="section__head reveal"><h2 class="title title--s">${esc(x.samplesH)}</h2></div>
  <div class="samples__groups">${samples}</div>
</section>
<section class="wrap section" id="tools">
  <div class="section__head reveal"><h2 class="title">${esc(x.toolsH)}</h2><p class="body muted">${esc(x.toolsText)}</p></div>
  ${tryBlock(lang)}
  <div class="sc-cards sc-cards--tools">${tools}</div>
  <p class="body muted">${esc(x.memosText)}</p>
  <ul class="samples">${MEMOS.map((memo) => `<li><a href="${p(memo.pathKey, lang)}">${esc(memo.title[lang])}</a></li>`).join('')}</ul>
  <div><a href="${p('tools', lang)}">${esc(x.allTools)}</a></div>
</section>
<section class="wrap">
  <div class="cine-closing reveal">
    <h2 class="title">${esc(l(CINEMA.closing.h2))}</h2>
    <a class="sc-btn" href="${p('library', lang)}">${esc(l(CINEMA.closing.button))}</a>
  </div>
</section>
<section class="wrap section" id="access">
  <div class="wait reveal">
    <div class="section__head">
      <h2 class="title">${esc(w.title)}</h2>
      <p class="body muted">${esc(w.text)}</p>
    </div>
    <form class="wait__form" method="post" action="${p('waitlist', lang)}">
      ${notice}
      <label class="sc-field">
        <span class="sc-field__label">${esc(w.label)}</span>
        <input class="sc-field__input" type="email" name="email" id="email" required autocomplete="email" inputmode="email">
      </label>
      <label class="wait__consent"><input type="checkbox" name="consent" id="consent" value="yes" required><span>${esc(w.consent)}</span></label>
      <div><button class="sc-btn" type="submit">${esc(w.button)}</button></div>
    </form>
  </div>
</section>`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Scutoria',
    url: config.baseUrl,
    logo: `${config.baseUrl}/og/scutoria-${lang}.png`,
    email: config.brand.email,
    description: s.home.lead,
  };
  return finishHome(layout({ lang, title: config.brand.claim[lang], description: s.home.lead, body, alt: { en: p('home', 'en'), de: p('home', 'de') }, jsonLd, section: 'home' }), lang);
}
