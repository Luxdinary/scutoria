// One document model, three outputs: HTML (preview and PDF source), DOCX (editable copy), print HTML for Chromium.
// A document is { lang, title, business, runLeft, runRight, meta, blocks, footerLeft, footerRight }.
import { readText, readBase64 } from '../../runtime/files.mjs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, AlignmentType, Header, Footer, PageNumber, TabStopType, TabStopPosition } from 'docx';
import { root } from '../../config.mjs';
import { esc } from '../../layout.mjs';

export const B = {
  h: (text, n) => ({ t: 'h', text, n }),
  h2: (text) => ({ t: 'h2', text }),
  p: (text) => ({ t: 'p', text }),
  gap: (text) => ({ t: 'gap', text }),
  note: (text) => ({ t: 'note', text }),
  ul: (items) => ({ t: 'ul', items }),
  checks: (items) => ({ t: 'checks', items }),
  fields: (items) => ({ t: 'fields', items }),
  table: (head, rows, widths) => ({ t: 'table', head, rows, widths }),
  sign: (labels) => ({ t: 'sign', labels }),
  pagebreak: () => ({ t: 'pagebreak' }),
  status: (items) => ({ t: 'status', items }),
  // A statement with its marker (fact, interpretation, uncertain, gap) and its source line; the memos are built from these.
  mk: (kind, text, source) => ({ t: 'mk', kind, text, source }),
  // The result of a memo: a traffic-light level (red, amber, green), a title and one paragraph.
  verdict: (level, title, text) => ({ t: 'verdict', level, title, text }),
  sources: (items) => ({ t: 'sources', items }),
  // Numbered steps whose first sentence is set in bold: items are { lead, text }.
  steps: (items) => ({ t: 'steps', items }),
  // Contacts with the number in large type: items are { label, number, text, gap, gapText }.
  calls: (items) => ({ t: 'calls', items }),
  // Boxes side by side: items are { label, parts: [{ text, gap }] }.
  boxes: (items) => ({ t: 'boxes', items }),
  // Lines kept together, for example an address block.
  lines: (items, gap) => ({ t: 'lines', items, gap }),
  // Empty lines, for example the space for a signature.
  space: (n = 3) => ({ t: 'space', n }),
};
const STATUS_WORD = { en: { ok: 'Regulated', warn: 'Planned', open: 'Open' }, de: { ok: 'Geregelt', warn: 'Geplant', open: 'Offen' } };
const STATUS_COLOR = { ok: '0F766E', warn: '7A4B00', open: 'B42318' };
export const statusWord = (s, lang) => (STATUS_WORD[lang] ?? STATUS_WORD.en)[s] ?? s;
// A status detail may end in a part to fill (gapPart), shaded like every other gap.
const splitGap = (i) => { const d = String(i.detail ?? ''); const k = i.gapPart ? d.lastIndexOf(i.gapPart) : -1; return k < 0 ? [d, ''] : [d.slice(0, k), d.slice(k)]; };
export const statusDetailParts = splitGap;
const statusDetailHtml = (i) => { const [a, g] = splitGap(i); return esc(a) + (g ? `<span class="pg__gap">${esc(g)}</span>` : ''); };
const MARK_WORD = { en: { fact: 'Fact', interpretation: 'Interpretation', uncertain: 'Uncertain', gap: 'Gap' }, de: { fact: 'Fakt', interpretation: 'Auslegung', uncertain: 'Unsicher', gap: 'Lücke' } };
export const markWord = (kind, lang) => (MARK_WORD[lang] ?? MARK_WORD.en)[kind] ?? kind;
const markChip = (kind, lang) => `<span class="sc-mk sc-mk--${esc(kind)}"><i class="sc-mk__shape"></i>${esc(markWord(kind, lang))}</span>`;
const LEVEL_COLOR = { green: STATUS_COLOR.ok, amber: STATUS_COLOR.warn, red: STATUS_COLOR.open };

export function makeDoc(d) {
  return { meta: [], blocks: [], ...d };
}

// ---------- HTML ----------
export function toHtml(d) {
  const run = d.runLeft || d.runRight ? `<div class="pg__run"><span>${esc(d.runLeft ?? '')}</span><span>${esc(d.runRight ?? '')}</span></div>` : '';
  const meta = d.meta.length ? `<div class="pg__meta">${d.meta.map((m) => `<span>${esc(m.label)}: ${esc(m.value)}</span>`).join('')}</div>` : '';
  const blocks = d.blocks.map((b) => blockHtml(b, d.lang)).join('');
  const foot = d.footerLeft || d.footerRight ? `<div class="pg__foot"><span>${esc(d.footerLeft ?? '')}</span><span>${esc(d.footerRight ?? '')}</span></div>` : '';
  return `<article class="pg${d.cls ? ' ' + esc(d.cls) : ''}">${run}<h1 class="pg__title">${esc(d.title)}</h1>${meta}${blocks}${foot}</article>`;
}

function blockHtml(b, lang = 'en') {
  switch (b.t) {
    case 'mk': return `<div class="pg__marked"><p class="pg__p">${markChip(b.kind, lang)} ${esc(b.text)}</p>${b.source ? `<div class="sc-source">${esc(b.source)}</div>` : ''}</div>`;
    case 'verdict': return `<div class="pg__verdict pg__verdict--${esc(b.level)}"><span class="pg__lamp" aria-hidden="true"></span><div><div class="pg__verdict-title">${esc(b.title)}</div><p class="pg__p">${esc(b.text)}</p></div></div>`;
    case 'sources': return `<ol class="pg__sources">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
    case 'h': return `<h2 class="pg__h">${b.n ? `<span class="pg__num">${esc(b.n)}</span> ` : ''}${esc(b.text)}</h2>`;
    case 'h2': return `<h3 class="pg__h3">${esc(b.text)}</h3>`;
    case 'p': return `<p class="pg__p">${esc(b.text)}</p>`;
    case 'gap': return `<p class="pg__p pg__gap">${esc(b.text)}</p>`;
    case 'note': return `<p class="pg__note">${esc(b.text)}</p>`;
    case 'ul': return `<ul class="pg__ul">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    case 'checks': return `<ul class="pg__list">${b.items.map((x) => `<li><span class="pg__box" aria-hidden="true"></span>${esc(x)}</li>`).join('')}</ul>`;
    case 'fields': return `<dl class="pg__fields">${b.items.map((f) => `<dt>${esc(f.label)}</dt><dd class="${f.gap ? 'pg__gap' : ''}">${esc(f.value ?? '')}</dd>`).join('')}</dl>`;
    // Column widths (percent) come as HTML attributes, because inline styles are blocked by the site's security policy.
    case 'table': return `<div class="pg__tablewrap"><table class="pg__table${b.widths ? ' pg__table--fixed' : ''}">${b.widths ? `<colgroup>${b.widths.map((w) => `<col width="${Number(w)}%">`).join('')}</colgroup>` : ''}${b.head ? `<thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>` : ''}<tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'sign': return `<div class="pg__signs">${b.labels.map((l) => `<div class="pg__sign"><span>${esc(l)}</span></div>`).join('')}</div>`;
    case 'pagebreak': return '<div class="pg__break"></div>';
    case 'status': return `<div class="sc-ev__list">${b.items.map((i) => `<div class="sc-ev__item"><div>${esc(i.label)}<small>${statusDetailHtml(i)}</small></div><span class="sc-pill ${i.status === 'ok' ? 'sc-pill--green' : i.status === 'warn' ? 'sc-pill--amber' : 'sc-pill--red'}">${esc(i.word)}</span></div>`).join('')}</div>`;
    case 'steps': return `<div class="pg__steps">${b.items.map((s, i) => `<p class="pg__p pg__step"><strong>${i + 1}. ${esc(s.lead)}</strong>${s.text ? ` ${esc(s.text)}` : ''}</p>`).join('')}</div>`;
    case 'calls': return `<div class="pg__calls">${b.items.map((c) => `<div class="pg__call"><div class="pg__call-label">${esc(c.label)}</div>${c.number ? `<div class="pg__call-num${c.gap ? ' pg__gap' : ''}">${esc(c.number)}</div>` : ''}${c.text ? `<div class="pg__call-text${c.gapText ? ' pg__gap' : ''}">${esc(c.text)}</div>` : ''}</div>`).join('')}</div>`;
    case 'boxes': return `<div class="pg__boxes">${b.items.map((x) => `<div class="pg__boxitem"><div class="pg__boxlabel">${esc(x.label)}</div>${(x.parts ?? []).map((p) => `<p class="pg__p${p.gap ? ' pg__gap' : ''}">${esc(p.text)}</p>`).join('')}</div>`).join('')}</div>`;
    case 'lines': return `<p class="pg__p pg__lines${b.gap ? ' pg__gap' : ''}">${b.items.map((x) => esc(x)).join('<br>')}</p>`;
    case 'space': return Array.from({ length: b.n }, () => '<p class="pg__p pg__space" aria-hidden="true">&#160;</p>').join('');
    default: return '';
  }
}

// ---------- Print HTML for Chromium: self-contained, fonts inlined ----------
let cssCache = null;
export function printCss() {
  if (cssCache) return cssCache;
  let tokens = readText('public/tokens.css');
  tokens = tokens.replace(/url\("\/fonts\/([^"]+)"\)/g, (m, file) => {
    try { return `url("data:font/woff2;base64,${readBase64('public/fonts/' + file)}")`; } catch { return m; }
  });
  const bundle = readText('public/bundle.css');
  const site = readText('public/site.css');
  cssCache = tokens + '\n' + bundle + '\n' + site + `
    html, body { background: #ffffff; }
    body { padding: 0; margin: 0; }
    .pg { border: none; max-width: none; width: auto; padding: 0; }
    .pg__break { page-break-before: always; break-before: page; height: 0; }
    .pg__section, .pg__h, .pg__h3 { break-after: avoid; }
    .pg__table tr, .pg__list li, .pg__sign, .pg__signs, .pg__marked, .pg__verdict { break-inside: avoid; }
    .pg__foot { break-before: avoid; margin-top: 14px; }
    @page { size: A4; margin: 18mm 18mm 20mm 18mm; }
    /* Manrope turns "(c)" into a copyright sign through a ligature; legal references need the plain characters. */
    html, body, .pg, .pg * { font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-contextual; font-feature-settings: "liga" 0, "dlig" 0, "calt" 0; }
    .pg__steps { display: flex; flex-direction: column; gap: 4px; }
    .pg__calls { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }
    .pg__call { border-top: 1px solid var(--hairline); padding-top: 3px; break-inside: avoid; }
    .pg__call-label { font-size: 10pt; line-height: 1.25; color: var(--ink-muted); }
    .pg__call-num { font-size: 15pt; line-height: 1.2; font-weight: 800; }
    .pg__call-text { font-size: 8.5pt; line-height: 1.3; }
    .pg__boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .pg__boxitem { border: 1px solid var(--hairline); border-radius: 4px; padding: 6px 8px; display: flex; flex-direction: column; gap: 3px; break-inside: avoid; }
    .pg__boxlabel { font-weight: 700; font-size: 10pt; line-height: 1.3; }
  `;
  return cssCache;
}

// Running header on follow-up pages and the page number on every page, as CSS margin boxes (Chromium 131 and later).
// The header text is the document's pageHead, or its run line.
const cssString = (s) => `"${String(s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ')}"`;
function pageBoxCss(d, lang) {
  const head = d.pageHead ?? [d.runLeft, d.runRight].filter(Boolean).join(' · ');
  const page = lang === 'de' ? '"Seite " counter(page) " von " counter(pages)' : '"Page " counter(page) " of " counter(pages)';
  const box = 'font-family: "Manrope", Arial, sans-serif; font-size: 7.5pt; color: #5b6472; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0;';
  return `@page { @top-left { content: ${cssString(head)}; ${box} vertical-align: bottom; padding-bottom: 3mm; } @bottom-right { content: ${page}; ${box} vertical-align: top; padding-top: 2.5mm; } } @page :first { @top-left { content: none; } }`;
}

// A document may carry its own print rules (d.printCss), for example the one-page emergency card with tighter margins.
export function toPrintHtml(d, lang) {
  return `<!doctype html><html lang="${lang}" data-theme="paper"><head><meta charset="utf-8"><title>${esc(d.title)}</title><style>${printCss()}${pageBoxCss(d, lang)}${d.printCss ?? ''}</style></head><body>${toHtml(d)}</body></html>`;
}

// ---------- DOCX ----------
const GAP_FILL = 'FFF3BF';
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thin = { style: BorderStyle.SINGLE, size: 4, color: 'BBBBBB' };
const thinBorders = { top: thin, bottom: thin, left: thin, right: thin };

const para = (text, opts = {}) => new Paragraph({ children: [new TextRun({ text, ...opts.run })], spacing: { after: 120, ...opts.spacing }, ...opts.p });

// The DOCX layout profile. Normal documents: 2 cm margins, 10.5 pt. A document may ask for a compact profile (d.docx), for example the
// emergency card, which must stay on one Word page: { margin (twips), size (half-points), compact: true }.
function profileOf(d) {
  const x = d.docx ?? {};
  const compact = !!x.compact;
  return { compact, margin: x.margin ?? 1134, size: x.size ?? 21, after: compact ? 40 : 120, small: compact ? 16 : 18, big: compact ? 24 : 28 };
}

export async function toDocx(d, lang) {
  const P = profileOf(d);
  const children = [];
  children.push(new Paragraph({ children: [new TextRun({ text: d.title, bold: true, size: P.compact ? 28 : 32 })], spacing: { after: P.compact ? 60 : 160 } }));
  if (d.meta.length) {
    children.push(new Paragraph({ children: d.meta.flatMap((m, i) => [new TextRun({ text: `${m.label}: `, color: '555555', size: 18 }), new TextRun({ text: m.value ?? '', size: 18 }), ...(i < d.meta.length - 1 ? [new TextRun({ text: '    ', size: 18 })] : [])]), spacing: { after: P.compact ? 80 : 240 } }));
  }
  for (const b of d.blocks) children.push(...blockDocx(b, P));
  if (d.footerLeft) children.push(new Paragraph({ children: [new TextRun({ text: d.footerLeft, italics: true, color: '555555', size: 16 })], spacing: { before: P.compact ? 80 : 360 } }));

  const m = P.margin;
  const doc = new Document({
    creator: 'Scutoria',
    title: d.title,
    styles: { default: { document: { run: { font: 'Arial', size: P.size } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: m, right: m, bottom: m, left: m, ...(P.compact ? { header: 284, footer: 284 } : {}) } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: d.runLeft ?? '', size: 16, color: '555555' }), new TextRun({ text: `\t${d.runRight ?? ''}`, size: 16, color: '555555' })], tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: `${d.footerRight ?? ''}\t`, size: 16, color: '555555' }), new TextRun({ children: [lang === 'de' ? 'Seite ' : 'Page ', PageNumber.CURRENT, lang === 'de' ? ' von ' : ' of ', PageNumber.TOTAL_PAGES], size: 16, color: '555555' })], tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }] })] }) },
      children,
    }],
  });
  return Packer.toBuffer(doc);
}

const gapShade = { type: ShadingType.CLEAR, fill: GAP_FILL };
const topOnly = { top: thin, bottom: noBorder, left: noBorder, right: noBorder };

function blockDocx(b, P = profileOf({})) {
  const after = P.after;
  switch (b.t) {
    case 'mk': return [new Paragraph({ children: [new TextRun({ text: `[${String(b.kind ?? '').toUpperCase()}] `, bold: true, color: '555555', size: 16 }), new TextRun({ text: b.text })], spacing: { after: b.source ? 40 : 120 } }), ...(b.source ? [para('→ ' + b.source, { run: { color: '555555', size: 16 } })] : [])];
    case 'verdict': return [new Paragraph({ children: [new TextRun({ text: b.title, bold: true, size: 26, color: LEVEL_COLOR[b.level] ?? '000000' })], spacing: { after: 80 } }), para(b.text)];
    case 'sources': return b.items.map((x, i) => new Paragraph({ children: [new TextRun({ text: `${i + 1}. ${x}`, size: 18 })], spacing: { after: 60 } }));
    case 'h': return [new Paragraph({ children: [...(b.n ? [new TextRun({ text: b.n + ' ', bold: true, color: '1F5FD1' })] : []), new TextRun({ text: b.text, bold: true, ...(P.compact ? { size: 22 } : {}) })], heading: HeadingLevel.HEADING_2, spacing: P.compact ? { before: 100, after: 40 } : { before: 280, after: 120 } })];
    case 'h2': return [new Paragraph({ children: [new TextRun({ text: b.text, bold: true, size: 22 })], spacing: { before: P.compact ? 80 : 200, after: P.compact ? 40 : 80 } })];
    case 'p': return [para(b.text, { spacing: { after } })];
    case 'gap': return [new Paragraph({ children: [new TextRun({ text: b.text, shading: gapShade })], spacing: { after } })];
    case 'note': return [para(b.text, { run: { italics: true, color: '555555', size: P.compact ? 15 : 18 }, spacing: { after } })];
    case 'ul': return b.items.map((x) => new Paragraph({ children: [new TextRun({ text: x })], bullet: { level: 0 }, spacing: { after: 60 } }));
    case 'checks': return b.items.map((x) => new Paragraph({ children: [new TextRun({ text: '☐  ' + x })], spacing: { after: 80 } }));
    case 'steps': return b.items.map((s, i) => new Paragraph({ children: [new TextRun({ text: `${i + 1}. ${s.lead}`, bold: true }), ...(s.text ? [new TextRun({ text: ` ${s.text}` })] : [])], spacing: { after: P.compact ? 40 : 80 } }));
    case 'calls': {
      const cell = (c) => new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, borders: topOnly, children: c ? [
        new Paragraph({ children: [new TextRun({ text: c.label, size: P.small, color: '555555' })] }),
        ...(c.number ? [new Paragraph({ children: [new TextRun({ text: c.number, bold: true, size: P.big, shading: c.gap ? gapShade : undefined })] })] : []),
        ...(c.text ? [new Paragraph({ children: [new TextRun({ text: c.text, size: P.small, shading: c.gapText ? gapShade : undefined })], spacing: { after: 40 } })] : []),
      ] : [new Paragraph({ text: '' })] });
      const rows = [];
      for (let i = 0; i < b.items.length; i += 2) rows.push(new TableRow({ cantSplit: true, children: [cell(b.items[i]), cell(b.items[i + 1])] }));
      return [new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }), ...(P.compact ? [] : [new Paragraph({ text: '', spacing: { after: 120 } })])];
    }
    case 'boxes': {
      const w = Math.floor(100 / Math.max(b.items.length, 1));
      const row = new TableRow({ cantSplit: true, children: b.items.map((x) => new TableCell({ width: { size: w, type: WidthType.PERCENTAGE }, borders: thinBorders, children: [
        new Paragraph({ children: [new TextRun({ text: x.label, bold: true, size: P.small + 2 })], spacing: { after: 20 } }),
        ...(x.parts ?? []).map((p) => new Paragraph({ children: [new TextRun({ text: p.text, size: P.small, shading: p.gap ? gapShade : undefined })], spacing: { after: 20 } })),
      ] })) });
      return [new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [row] }), ...(P.compact ? [] : [new Paragraph({ text: '', spacing: { after: 120 } })])];
    }
    case 'lines': return [new Paragraph({ children: b.items.map((x, i) => new TextRun({ text: x, break: i ? 1 : 0, shading: b.gap ? gapShade : undefined })), spacing: { after } })];
    case 'space': return Array.from({ length: b.n }, () => new Paragraph({ text: '' }));
    case 'fields': return [new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: b.items.map((f) => new TableRow({ children: [
        new TableCell({ width: { size: 32, type: WidthType.PERCENTAGE }, borders: noBorders, children: [new Paragraph({ children: [new TextRun({ text: f.label, color: '555555', size: 18 })] })] }),
        new TableCell({ width: { size: 68, type: WidthType.PERCENTAGE }, borders: noBorders, shading: f.gap ? gapShade : undefined, children: [new Paragraph({ children: [new TextRun({ text: f.value ?? '' })] })] }),
      ] })),
    }), ...(P.compact ? [] : [new Paragraph({ text: '', spacing: { after: 120 } })])];
    case 'table': {
      const cols = b.head ? b.head.length : (b.rows[0]?.length ?? 1);
      const widths = b.widths ?? Array(cols).fill(Math.floor(100 / cols));
      const cell = (text, i, head) => new TableCell({ width: { size: widths[i], type: WidthType.PERCENTAGE }, borders: thinBorders, shading: head ? { type: ShadingType.CLEAR, fill: 'EEEEEE' } : undefined, children: [new Paragraph({ children: [new TextRun({ text: String(text ?? ''), bold: !!head, size: 18 })] })] });
      const rows = [];
      if (b.head) rows.push(new TableRow({ tableHeader: true, children: b.head.map((h, i) => cell(h, i, true)) }));
      for (const r of b.rows) rows.push(new TableRow({ children: r.map((c, i) => cell(c, i, false)) }));
      return [new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }), new Paragraph({ text: '', spacing: { after: 120 } })];
    }
    case 'sign': return [new Paragraph({ text: '', spacing: { before: 400 } }), ...b.labels.map((l) => new Paragraph({ children: [new TextRun({ text: '_____________________________________________' }), new TextRun({ text: l, break: 1, size: 16, color: '555555' })], spacing: { after: 200 } }))];
    case 'pagebreak': return [new Paragraph({ text: '', pageBreakBefore: true })];
    case 'status': return [new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: b.items.map((i) => new TableRow({ children: [
        new TableCell({ width: { size: 76, type: WidthType.PERCENTAGE }, borders: thinBorders, children: [new Paragraph({ children: [new TextRun({ text: i.label })] }), new Paragraph({ children: splitGap(i).map((x, k) => (x ? new TextRun({ text: x, size: 16, color: '555555', shading: k === 1 ? gapShade : undefined }) : null)).filter(Boolean) })] }),
        new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, borders: thinBorders, children: [new Paragraph({ children: [new TextRun({ text: i.word, bold: true, color: STATUS_COLOR[i.status] ?? '000000' })] })] }),
      ] })),
    }), new Paragraph({ text: '', spacing: { after: 120 } })];
    default: return [];
  }
}
