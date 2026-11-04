// The 3D cover of a toolkit: a hardcover with spine, page block and lid, built in CSS 3D from the design system's cover
// (brand and line in the head, series, title, the big number, the claim as the bar, the formats). Two variants: the cover in
// the line's own colour (book--colour: blue for the policy line, teal for security) and the design system's dark cover with
// the line as a stripe (book--dark). The cover is decorative; the page names the toolkit in text beside it.
// The hero stage puts the cover behind the paper sheet: the toolkit and the document it produces, in one picture.
// E23 (23 Oct 2026): the home hero is a slide stack of four sample sheets in front of the cover; the product hero's cover
// opens on scroll. The slider control labels are the only new copy, approved by the owner.
import { config } from '../config.mjs';
import { esc, mark } from '../layout.mjs';
import { PRODUCTS } from '../shop/products.mjs';
import { markerTabs, paperHero, paperSheet } from './paper.mjs';

// The line's short name, the first words of the product names.
const LINE = { policy: { en: 'AI Policy', de: 'KI-Richtlinien' }, security: { en: 'Security Evidence', de: 'Sicherheitsnachweis' }, setup: { en: 'AI Setup', de: 'KI-Einrichtung' } };

// Slider control labels (the only new copy of the motion pass, approved by the owner, E23).
export const SLIDER = {
  en: { pause: 'Pause', play: 'Play', prev: 'Previous', next: 'Next', slide: (n, m) => `Slide ${n} of ${m}` },
  de: { pause: 'Anhalten', play: 'Abspielen', prev: 'Zurück', next: 'Weiter', slide: (n, m) => `Folie ${n} von ${m}` },
};

export const ICONS = {
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  pause: '<svg class="carousel__pause" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>',
  play: '<svg class="carousel__play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>',
};

export function book(lang, tk, { size = 'offer', variant = 'colour' } = {}) {
  const name = PRODUCTS[tk.id]?.name[lang] ?? tk.id;
  const line = LINE[tk.line]?.[lang] ?? tk.line;
  return `<div class="book book--${esc(tk.line)} book--${esc(size)} book--${esc(variant)}" aria-hidden="true">
    <div class="book__shadow"></div>
    <div class="book__body">
      <div class="book__face book__back"></div>
      <div class="book__face book__spine"><span>${esc(name)}</span></div>
      <div class="book__face book__pages"></div>
      <div class="book__face book__top"></div>
      <div class="book__face book__bottom"></div>
      <div class="book__face book__first"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="book__face book__cover">
        <div class="book__emboss">${mark(64)}</div>
        <div class="book__head"><span class="book__brand">${mark(12)}Scutoria</span><span class="book__linename">${esc(line)}</span></div>
        <div class="book__series">Toolkit · ${esc(tk.nr)}</div>
        <div class="book__title">${esc(name)}</div>
        <div class="book__num">${esc(tk.nr)}</div>
        <div class="book__bar">${esc(config.brand.claim[lang])}</div>
        <div class="book__formats">PDF · DOCX · XLSX</div>
      </div>
    </div>
  </div>`;
}

// The hero stage: the toolkit's cover behind, the sheet of its first document in front, with the four markers as tabs.
// With openBook the front cover swings open around the spine as the first screen scrolls (motion.js sets --open).
export function heroStage(lang, tk, { openBook = false } = {}) {
  return `<div class="stage${openBook ? ' stage--open' : ''}"${openBook ? ' data-open-book' : ''}>${book(lang, tk, { size: 'hero' })}${paperHero(lang, tk.line, { tabs: true })}</div>`;
}

// The home hero (E23): a slide stack of four sample sheets of the example business — the policy, the one page to post,
// the tool register, the evidence summary — in front of the cover. Every seven seconds the top sheet slides off to the
// side and settles at the back; index tabs carry the document numbers, plus pause, previous, next, keyboard and swipe.
export function heroStack(lang, tk, samples = []) {
  const sl = SLIDER[lang] ?? SLIDER.en;
  const kinds = ['policy', 'poster', 'register', 'evidence'];
  const codes = ['D1', 'D2', 'D3', 'D7'];
  const name = PRODUCTS[tk.id]?.name[lang] ?? tk.id;
  const sheets = kinds.map((k, i) => `<div class="paperset stack__sheet" data-slide role="group" aria-roledescription="slide" aria-label="${esc(sl.slide(i + 1, kinds.length))}">${paperSheet(lang, tk.line, k, samples.find(([nr]) => nr === codes[i]) ?? null)}</div>`).join('');
  const tabs = codes.map((c, i) => `<button class="carousel__tab" type="button" data-tab="${i}" aria-pressed="${i === 0 ? 'true' : 'false'}">${c}</button>`).join('');
  return `<div class="stage stage--stack" data-depth data-sink>
    ${book(lang, tk, { size: 'hero' })}
    <div class="carousel" data-carousel="stack" data-auto="on" role="region" aria-roledescription="carousel" aria-label="${esc(name)}">
      <div class="stack" data-stage>${sheets}<div class="stack__tabs" aria-hidden="true">${markerTabs(lang)}</div></div>
      <div class="carousel__ui">
        <button class="carousel__btn" type="button" data-prev aria-label="${esc(sl.prev)}">${ICONS.prev}</button>
        <div class="carousel__tabs">${tabs}</div>
        <button class="carousel__btn" type="button" data-next aria-label="${esc(sl.next)}">${ICONS.next}</button>
        <button class="carousel__btn" type="button" data-pause aria-label="${esc(sl.pause)}" aria-pressed="false">${ICONS.pause}${ICONS.play}</button>
      </div>
    </div>
  </div>`;
}
