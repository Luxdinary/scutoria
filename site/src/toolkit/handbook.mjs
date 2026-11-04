// The handbook of a toolkit: markdown with four markers, source lines and uncertainty boxes,
// rendered as a document page (HTML) and printed to PDF. Cached per language until the file changes.
import { readText, readBinary } from '../runtime/files.mjs';
import MarkdownIt from 'markdown-it';
import { esc } from '../layout.mjs';
import { printCss } from './documents/blocks.mjs';
import { linkSourceLine } from './source-links.mjs';

const md = new MarkdownIt({ html: false, linkify: true, typographer: false });

// [FACT] text … → marker chip. Keys per language; the class is shared with the design system.
const MARKS = {
  en: { FACT: ['fact', 'Fact'], INTERPRETATION: ['interpretation', 'Interpretation'], UNCERTAIN: ['uncertain', 'Uncertain'], GAP: ['gap', 'Gap'] },
  de: { FAKT: ['fact', 'Fakt'], AUSLEGUNG: ['interpretation', 'Auslegung'], UNSICHER: ['uncertain', 'Unsicher'], 'LÜCKE': ['gap', 'Lücke'] },
};
const WORDS = {
  en: { version: 'Version', uncertain: 'Uncertain', gap: 'Gap', tag: 'Source-based. No legal advice.' },
  de: { version: 'Fassung', uncertain: 'Unsicher', gap: 'Lücke', tag: 'Quellenbasiert. Keine Rechtsberatung.' },
};

const chip = (cls, word) => `<span class="sc-mk sc-mk--${cls}"><i class="sc-mk__shape"></i>${esc(word)}</span>`;

function frontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

// ::: uncertain Title / ::: gap Title … last line is the meta line.
function box(kind, title, inner, lang) {
  const w = WORDS[lang] ?? WORDS.en;
  const lines = inner.trim().split('\n').map((s) => s.trim()).filter(Boolean);
  const meta = lines.length > 1 ? lines.pop() : '';
  const cls = kind === 'gap' ? 'gap' : 'uncertain';
  return `<div class="sc-unc"><div class="sc-unc__title">${chip(cls, w[cls])}${esc(title)}</div><div class="sc-unc__text">${lines.map(esc).join('<br>')}</div>${meta ? `<div class="sc-unc__meta">${esc(meta)}</div>` : ''}</div>`;
}

function renderMd(src, lang) {
  if (!src.trim()) return '';
  const marks = MARKS[lang] ?? MARKS.en;
  let html = md.render(src);
  html = html.replace(/<p>\[([A-ZÄÖÜ]+)\] /g, (m0, key) => (marks[key] ? `<p class="pg__p pg__marked">${chip(marks[key][0], marks[key][1])} ` : m0));
  html = html.replace(/<p>(Source|Quelle):([\s\S]*?)<\/p>/g, (m0, w, rest) => `<div class="sc-source">${linkSourceLine(md.utils.unescapeAll(`${w}:${rest.replace(/<[^>]*>/g,'')}`))}</div>`);
  html = html.replace(/<h2>(\d+)\. ([^<]*)<\/h2>/g, (m0, n, t) => `<h2 class="pg__h" id="s${n}"><span class="pg__num">${n}</span> ${t}</h2>`);
  html = html.replace(/<h3>(\d+)\.(\d+) ([^<]*)<\/h3>/g, (m0, a, b, t) => `<h3 class="pg__h3" id="s${a}-${b}"><span class="pg__num">${a}.${b}</span> ${t}</h3>`);
  html = html
    .replace(/<p>/g, '<p class="pg__p">')
    .replace(/<ul>/g, '<ul class="pg__ul">')
    .replace(/<ol>/g, '<ol class="pg__ul">')
    .replace(/<table>/g, '<div class="pg__tablewrap" tabindex="0"><table class="pg__table">')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<blockquote>/g, '<blockquote class="pg__quote">');
  return html;
}

function renderBody(body, lang) {
  const parts = [];
  const re = /^::: *(uncertain|gap) *(.*)\n([\s\S]*?)\n:::[ \t]*$/gm;
  let last = 0;
  let m;
  while ((m = re.exec(body))) {
    parts.push(renderMd(body.slice(last, m.index), lang));
    parts.push(box(m[1], m[2], m[3], lang));
    last = m.index + m[0].length;
  }
  parts.push(renderMd(body.slice(last), lang));
  return parts.join('');
}

const cache = new Map();
function load(toolkit, lang) {
  const file = `content/toolkits/${toolkit}/handbook.${lang}.md`;
  const mtime = 0;
  const key = `${toolkit}:${lang}`;
  const hit = cache.get(key);
  if (hit && hit.mtime === mtime) return hit;
  const { meta, body } = frontMatter(readText(file));
  const entry = { mtime, meta, body, html: renderBody(body, lang), pdf: null };
  cache.set(key, entry);
  return entry;
}

export function handbookMeta(toolkit, lang) {
  return load(toolkit, lang).meta;
}

// The article: run line, title, subtitle, retrieval note, body, foot. Same frame as the generated documents.
export function handbookArticle(toolkit, lang) {
  const w = WORDS[lang] ?? WORDS.en;
  const { meta, html } = load(toolkit, lang);
  const run = `<div class="pg__run"><span>Scutoria · ${esc(meta.title ?? '')}</span><span>${esc(w.version)} ${esc(meta.version ?? '')}</span></div>`;
  const head = `<h1 class="pg__title">${esc(meta.title ?? '')}</h1>${meta.subtitle ? `<p class="pg__p pg__lead">${esc(meta.subtitle)}</p>` : ''}${meta.retrieved ? `<div class="pg__meta"><span>${esc(meta.retrieved)}</span></div>` : ''}`;
  const foot = `<div class="pg__foot"><span>${esc(w.tag)}</span><span>Scutoria · ${esc(meta.title ?? '')} · ${esc(w.version)} ${esc(meta.version ?? '')}</span></div>`;
  return `<article class="pg pg--handbook">${run}${head}${html}${foot}</article>`;
}

// Print: sections flow, headings stay with their text, boxes, tables and source lines are not split.
const HANDBOOK_PRINT = `
  .pg--handbook .sc-unc, .pg--handbook .sc-source, .pg--handbook .pg__marked { break-inside: avoid; }
  .pg--handbook .pg__h, .pg--handbook .pg__h3 { break-after: avoid; }
  .pg--handbook .pg__table tr { break-inside: avoid; }
  .pg--handbook .pg__table thead { display: table-header-group; }
`;

export function handbookPrintHtml(toolkit, lang) {
  const entry = load(toolkit, lang);
  return `<!doctype html><html lang="${lang}" data-theme="paper"><head><meta charset="utf-8"><title>${esc(entry.meta.title ?? 'Handbook')}</title><style>${printCss()}${HANDBOOK_PRINT}</style></head><body>${handbookArticle(toolkit, lang)}</body></html>`;
}

// Handbooks are finished PDFs (owner's decision, 23 Oct 2026): the prebuilt file is served, not rendered. Since E35
// (3 November 2026) the file lives in content/, outside the public folder, and the route serves it to licence holders only.
export async function handbookPdf(toolkit, lang) {
  const entry = load(toolkit, lang);
  if (entry.pdf) return entry.pdf;
  entry.pdf = readBinary(`content/toolkits/${toolkit}/handbook.${lang}.pdf`);
  return entry.pdf;
}

// The reading sample (E35, 3 November 2026): a preview never shows everything. Four chapters, one page's worth of each,
// a contents list that says what the sample holds and what the toolkit holds, and the way to the toolkit.
const SAMPLE_CHAPTERS = { 'ai-policy': ['1', '2', '4', '6'], 'security-evidence': ['1', '2', '3', '4'] };
const PAGE_COUNT = { 'ai-policy': { en: 24, de: 26 }, 'security-evidence': { en: 37, de: 40 } };
const SAMPLE_WORDS = {
  en: { sample: 'Reading sample', lead: (pages) => `Four pages from four chapters. The complete handbook, ${pages} pages with every chapter and source, comes with the toolkit.`, contents: 'Contents', inSample: 'In the sample', inToolkit: 'In the toolkit', end: (no) => `End of the sample from chapter ${no}. The chapter continues in the toolkit.`, cta: 'To the toolkit' },
  de: { sample: 'Leseprobe', lead: (pages) => `Vier Seiten aus vier Kapiteln. Das vollständige Handbuch, ${pages} Seiten mit allen Kapiteln und Quellen, ist Teil des Toolkits.`, contents: 'Inhalt', inSample: 'In der Leseprobe', inToolkit: 'Im Toolkit', end: (no) => `Ende der Leseprobe aus Kapitel ${no}. Das Kapitel geht im Toolkit weiter.`, cta: 'Zum Toolkit' },
};

// "## 3. Title" starts a chapter; what comes before the first one is the preamble and stays out of the contents list.
function splitChapters(body) {
  const chapters = [];
  let cur = null;
  for (const line of body.split('\n')) {
    const m = line.match(/^## (\d+)\. (.*)$/);
    if (m) { cur = { no: m[1], title: m[2].trim(), lines: [] }; chapters.push(cur); continue; }
    if (cur) cur.lines.push(line);
  }
  return chapters;
}

// Blocks are paragraphs, lists, tables and headings separated by blank lines; a ::: box counts as one block.
function blocks(lines) {
  const out = [];
  let cur = [];
  let inBox = false;
  const flush = () => { if (cur.length) { out.push(cur.join('\n')); cur = []; } };
  for (const line of lines) {
    if (inBox) { cur.push(line); if (/^:::\s*$/.test(line)) { inBox = false; flush(); } continue; }
    if (/^:::\s*\w+/.test(line)) { flush(); inBox = true; cur.push(line); continue; }
    if (!line.trim()) { flush(); continue; }
    cur.push(line);
  }
  flush();
  return out;
}

// One page's worth of a chapter: whole blocks up to the budget, never ending on a sub-heading.
function excerpt(lines, budget) {
  const take = [];
  let len = 0;
  for (const b of blocks(lines)) {
    if (take.length && len + b.length > budget) break;
    take.push(b);
    len += b.length + 2;
  }
  while (take.length > 1 && /^#{3,}\s/.test(take[take.length - 1])) take.pop();
  return take.join('\n\n');
}

export function handbookSampleArticle(toolkit, lang, { productHref = '' } = {}) {
  const w = WORDS[lang] ?? WORDS.en;
  const sw = SAMPLE_WORDS[lang] ?? SAMPLE_WORDS.en;
  const { meta, body } = load(toolkit, lang);
  const chapters = splitChapters(body);
  const pages = PAGE_COUNT[toolkit]?.[lang] ?? 0;
  // A page of the printed handbook holds about this much markdown; the sample takes that much of each chosen chapter.
  const budget = Math.max(1200, Math.round(body.length / Math.max(1, pages)));
  const chosen = SAMPLE_CHAPTERS[toolkit] ?? chapters.slice(1, 5).map((c) => c.no);
  const run = `<div class="pg__run"><span>Scutoria · ${esc(meta.title ?? '')}</span><span>${esc(sw.sample)} · ${esc(w.version)} ${esc(meta.version ?? '')}</span></div>`;
  const head = `<h1 class="pg__title">${esc(meta.title ?? '')}</h1><p class="pg__p pg__lead pg__sample-lead">${esc(sw.sample)}: ${esc(sw.lead(pages))}</p>${meta.retrieved ? `<div class="pg__meta"><span>${esc(meta.retrieved)}</span></div>` : ''}`;
  const toc = `<h2 class="pg__h">${esc(sw.contents)}</h2><ol class="pg__toc">${chapters.map((c) => {
    const inSample = chosen.includes(c.no);
    return `<li><span>${esc(c.no)}. ${esc(c.title)}</span><span class="pg__toc-note${inSample ? ' pg__toc-note--sample' : ''}">${esc(inSample ? sw.inSample : sw.inToolkit)}</span></li>`;
  }).join('')}</ol>`;
  const parts = chosen.map((no) => {
    const c = chapters.find((x) => x.no === no);
    if (!c) return '';
    return `${renderBody(`## ${c.no}. ${c.title}\n\n${excerpt(c.lines, budget)}`, lang)}<p class="pg__sample-end">${esc(sw.end(c.no))}</p>`;
  }).join('');
  const cta = productHref ? `<p class="pg__sample-cta"><a class="sc-btn" href="${esc(productHref)}">${esc(sw.cta)}</a></p>` : '';
  const foot = `<div class="pg__foot"><span>${esc(w.tag)}</span><span>Scutoria · ${esc(meta.title ?? '')} · ${esc(sw.sample)}</span></div>`;
  return `<article class="pg pg--handbook pg--sample">${run}${head}${toc}${parts}${cta}${foot}</article>`;
}
