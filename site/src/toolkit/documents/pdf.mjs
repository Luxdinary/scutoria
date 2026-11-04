// PDF without a browser (owner's decision, 23 Oct 2026): the block model of a document is laid out
// directly with pdf-lib. A4, the margins of the print CSS (18mm/18mm/20mm), the header line with
// document number and date, the footer line with page numbers, and the four markers as drawn shapes.
// Fonts are the self-hosted Manrope and IBM Plex Mono as static TTF instances, embedded subsetted.
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { readBinary } from '../../runtime/files.mjs';
import { markWord } from './blocks.mjs';

const A4_W = 595.28;
const A4_H = 841.89;
const MM = 2.8346;
// A document may carry its own print rules (d.printCss), e.g. the one-page emergency card with tighter margins and smaller
// type. The renderer follows them: the @page margins, and the document's paragraph size relative to the base print CSS
// (.pg__p 15px) as a scale factor K. Layout runs on a virtual page of A4/K, which is then scaled by K onto A4, so every type
// size, gap and rule shrinks together and the margins land exactly on the given millimetres.
const BASE_P_PX = 15;
let K = 1, PAGE_W = A4_W, PAGE_H = A4_H, ML = 18 * MM, MR = 18 * MM, MT = 18 * MM, MB = 20 * MM, CW = PAGE_W - ML - MR;
export function printSettings(css = '') {
  const page = /@page\s*\{[^}]*margin:\s*([^;}]+)/.exec(css);
  const mm = page ? page[1].trim().split(/\s+/).map((v) => parseFloat(v)) : [];
  const [t, r = t, b = t, l = r] = mm.length ? mm : [18, 18, 20, 18];
  const pSize = /\.pg__p\b[^{]*\{[^}]*font-size:\s*([\d.]+)px/.exec(css);
  const k = pSize ? Math.min(1, parseFloat(pSize[1]) / BASE_P_PX) : 1;
  return { k, margins: { top: t, right: r, bottom: b, left: l } };
}
function applySettings(css, fit = 1) {
  const { k, margins } = printSettings(css);
  K = k * fit; PAGE_W = A4_W / K; PAGE_H = A4_H / K;
  ML = margins.left * MM / K; MR = margins.right * MM / K; MT = margins.top * MM / K; MB = margins.bottom * MM / K;
  CW = PAGE_W - ML - MR;
}

const C = {
  ink: rgb(0.11, 0.11, 0.13),
  gray: rgb(0.36, 0.36, 0.38),
  accent: rgb(0.12, 0.37, 0.82), // policy blue, the one accent
  gapFill: rgb(1, 0.953, 0.749), // FFF3BF
  headFill: rgb(0.933, 0.929, 0.953), // EEEEF3
  border: rgb(0.733, 0.733, 0.733),
  ok: rgb(0.059, 0.463, 0.431),
  warn: rgb(0.478, 0.294, 0),
  open: rgb(0.706, 0.137, 0.094),
  violet: rgb(0.427, 0.157, 0.851), // only the interpretation marker
  paper: rgb(1, 1, 1),
};
const LEVEL_COLOR = { green: C.ok, amber: C.warn, red: C.open };
const STATUS_COLOR = { ok: C.ok, warn: C.warn, open: C.open };

// The font bytes are cached, but every PDF embeds its own copy: an embedded font belongs to its document.
let fontBytes = null;
function loadFontBytes() {
  if (!fontBytes) {
    fontBytes = {
      regular: readBinary('public/fonts/ttf/manrope-400.ttf'),
      bold: readBinary('public/fonts/ttf/manrope-700.ttf'),
      mono: readBinary('public/fonts/ttf/ibm-plex-mono-400.ttf'),
      monoMedium: readBinary('public/fonts/ttf/ibm-plex-mono-500.ttf'),
    };
  }
  return fontBytes;
}
async function loadFonts(pdf) {
  pdf.registerFontkit(fontkit);
  const b = loadFontBytes();
  const [regular, bold, mono, monoMedium] = await Promise.all([
    pdf.embedFont(b.regular, { subset: true, features: { liga: false } }),
    pdf.embedFont(b.bold, { subset: true, features: { liga: false } }),
    pdf.embedFont(b.mono, { subset: true, features: { liga: false } }),
    pdf.embedFont(b.monoMedium, { subset: true, features: { liga: false } }),
  ]);
  return { regular, bold, mono, monoMedium };
}

// Words wider than the line (narrow table cells, label columns) are broken like the print CSS (overflow-wrap: anywhere):
// first at a hyphen or slash, then at a syllable boundary with a hyphen (a small German-leaning rule: break before a
// consonant that starts a syllable, never inside ch, ck, ph, th, sch, qu), otherwise hard at the last fitting character.
let LANG = 'en';
let FIT = 1; // the card's fit factor; below 1 (very long answers) the 10 pt floor gives way so the card stays one page
const VOWEL = /[aeiouyäöüàáâéèêíóôúAEIOUYÄÖÜ]/;
const LETTER = /\p{L}/u;
const NOSPLIT = new Set(['ch', 'ck', 'ph', 'th', 'qu', 'sc']);
function breakPoints(w) {
  const out = [];
  for (let i = 2; i <= w.length - 2; i++) {
    const a = w[i - 1], b = w[i], c = w[i + 1];
    if (a === '-' || a === '/') { out.push({ i, hy: false }); continue; }
    if (!LETTER.test(a) || !LETTER.test(b) || !LETTER.test(c ?? '')) continue;
    if (VOWEL.test(b) || !VOWEL.test(c)) continue; // syllable starts with consonant + vowel
    const pair = (a + b).toLowerCase();
    if (NOSPLIT.has(pair) || (b.toLowerCase() === 'c' && /[hk]/i.test(c))) continue;
    if (w.slice(i - 1, i + 2).toLowerCase() === 'sch' || (a.toLowerCase() === 's' && w.slice(i, i + 2).toLowerCase() === 'ch')) continue;
    if (!VOWEL.test(w.slice(0, i)) || !VOWEL.test(w.slice(i))) continue;
    out.push({ i, hy: true });
  }
  return out;
}
function breakWord(word, font, size, width) {
  const parts = [];
  let w = word;
  while (w && font.widthOfTextAtSize(w, size) > width) {
    let cut = null;
    for (const bp of breakPoints(w)) {
      const head = w.slice(0, bp.i) + (bp.hy ? '-' : '');
      if (font.widthOfTextAtSize(head, size) <= width) cut = bp; else break;
    }
    if (cut) { parts.push(w.slice(0, cut.i) + (cut.hy ? '-' : '')); w = w.slice(cut.i); continue; }
    let n = 1;
    while (n < w.length && font.widthOfTextAtSize(w.slice(0, n + 1), size) <= width) n++;
    parts.push(w.slice(0, n));
    w = w.slice(n);
  }
  if (w) parts.push(w);
  return parts;
}
function wrap(text, font, size, width) {
  const lines = [];
  for (const raw of String(text ?? '').split('\n')) {
    let line = '';
    const words = [];
    for (const word of raw.split(/\s+/).filter(Boolean)) {
      if (font.widthOfTextAtSize(word, size) <= width) { words.push(word); continue; }
      // Fill the rest of the current line first only via the next pass; long words start their pieces on their own.
      words.push(...breakWord(word, font, size, width));
    }
    for (const word of words) {
      const cand = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(cand, size) <= width) line = cand;
      else {
        if (line) lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }
  return lines.length ? lines : [''];
}

// Bold phone numbers on the emergency card: a run of digits (with spaces, +, -) at least three long, not part of a URL.
const PHONE = /(?<![\w/.@-])\+?\d[\d \-]{1,}\d(?![\w/.@])/g;
function richTokens(text, f) {
  const s = String(text ?? '');
  const bold = new Array(s.length).fill(false);
  for (const m of s.matchAll(PHONE)) for (let i = m.index; i < m.index + m[0].length; i++) bold[i] = true;
  const out = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(s))) {
    // split a word where boldness changes (e.g. "112)")
    let start = m.index;
    for (let i = m.index + 1; i <= m.index + m[0].length; i++) {
      if (i === m.index + m[0].length || bold[i] !== bold[start]) {
        out.push({ t: s.slice(start, i), font: bold[start] ? f.bold : f.regular, joined: start !== m.index });
        start = i;
      }
    }
  }
  // A phone number stays on one line: bold words separated by spaces are kept as one token.
  const merged = [];
  for (const t of out) {
    const prev = merged[merged.length - 1];
    if (prev && prev.font === f.bold && t.font === f.bold && !t.joined) prev.t += ` ${t.t}`;
    else merged.push({ ...t });
  }
  return merged;
}
function richLines(text, f, size, width) {
  const lines = [];
  let line = [], lw = 0;
  const sp = f.regular.widthOfTextAtSize(' ', size);
  for (const tok of richTokens(text, f)) {
    const pieces = tok.font.widthOfTextAtSize(tok.t, size) > width ? breakWord(tok.t, tok.font, size, width) : [tok.t];
    pieces.forEach((t, pi) => {
      const tw = tok.font.widthOfTextAtSize(t, size);
      const gap = line.length && !(tok.joined && pi === 0) ? sp : 0;
      if (line.length && lw + gap + tw > width) { lines.push(line); line = []; lw = 0; }
      const g = line.length && !(tok.joined && pi === 0) ? sp : 0;
      line.push({ t, font: tok.font, x: lw + g });
      lw += g + tw;
    });
  }
  lines.push(line);
  return lines;
}

// Running header like the print version: uppercase, letter spacing 0.08em.
const upper = (t) => String(t).toLocaleUpperCase(LANG === 'de' ? 'de-DE' : 'en-GB');
function spacedWidth(t, font, size) {
  const chars = [...t];
  return chars.reduce((a, ch) => a + font.widthOfTextAtSize(ch, size), 0) + size * 0.08 * Math.max(chars.length - 1, 0);
}
function drawSpaced(page, t, x, y, size, font, color) {
  for (const ch of t) {
    page.drawText(ch, { x, y, size, font, color });
    x += font.widthOfTextAtSize(ch, size) + size * 0.08;
  }
}

// Optional recorder of every drawn text run (page index, position, width), used by the overlap check in the tests.
let RUNS = null;
export function recordRuns(arr) { RUNS = arr; }
let UNKNOWN_BLOCKS = null;
export function recordUnknownBlocks(arr) { UNKNOWN_BLOCKS = arr; }
function instrument(page, index, f) {
  if (!RUNS) return;
  const orig = page.drawText.bind(page);
  page.drawText = (t, o) => {
    RUNS.push({ doc: RUNS.current, p: index, t, x: o.x, y: o.y, size: o.size, w: o.font.widthOfTextAtSize(t, o.size), right: PAGE_W - MR, left: ML });
    return orig(t, o);
  };
  void f;
}

class Layout {
  constructor(pdf, fonts, doc, lang) {
    this.pdf = pdf;
    this.f = fonts;
    this.doc = doc;
    this.lang = lang;
    this.pages = [];
    this.newPage();
  }
  newPage() {
    this.page = this.pdf.addPage([PAGE_W, PAGE_H]);
    this.pages.push(this.page);
    instrument(this.page, this.pages.length - 1);
    this.y = PAGE_H - MT;
    // Header line: document number left, date right, thin rule below.
    const d = this.doc;
    if (d.runLeft || d.runRight) {
      const hy = this.y;
      if (d.runLeft) drawSpaced(this.page, upper(d.runLeft), ML, hy, 7.5, this.f.mono, C.gray);
      if (d.runRight) {
        const t = upper(d.runRight);
        drawSpaced(this.page, t, PAGE_W - MR - spacedWidth(t, this.f.mono, 7.5), hy, 7.5, this.f.mono, C.gray);
      }
      this.page.drawLine({ start: { x: ML, y: hy - 6 }, end: { x: PAGE_W - MR, y: hy - 6 }, thickness: 0.5, color: C.border });
      this.y = hy - 20;
    }
  }
  ensure(h) {
    if (this.y - h < MB) this.newPage();
  }
  // Measures a block, then draws it on one page when it fits on a fresh page (keep together).
  keep(height, draw) {
    const full = PAGE_H - MT - MB - 20;
    if (height <= full) this.ensure(height);
    draw();
  }
  text(text, { font = this.f.regular, size = 10.5, color = C.ink, width = CW, x = ML, lh = 1.45, after = 6, indentFirst = 0, gap = false } = {}) {
    const lines = wrap(text, font, size, width - indentFirst);
    const h = lines.length * size * lh + after;
    this.ensure(h);
    if (gap) this.page.drawRectangle({ x, y: this.y - lines.length * size * lh, width, height: lines.length * size * lh, color: C.gapFill });
    lines.forEach((ln, i) => {
      this.page.drawText(ln, { x: x + (i === 0 ? indentFirst : 0), y: this.y - size, size, font, color });
      this.y -= size * lh;
    });
    this.y -= after;
    return h;
  }
}

// The four markers, always as their shape: fact square, interpretation diamond, uncertain half-circle, gap dashed circle.
function drawMarker(page, kind, x, y, s) {
  switch (kind) {
    case 'fact':
      page.drawRectangle({ x, y, width: s, height: s, color: C.ink });
      break;
    case 'interpretation': {
      const h = s / 2;
      page.drawSvgPath(`M ${x + h} ${y} L ${x + s} ${y + h} L ${x + h} ${y + s} L ${x} ${y + h} Z`, { color: C.violet });
      break;
    }
    case 'uncertain': {
      const h = s / 2;
      page.drawSvgPath(`M ${x} ${y} A ${h} ${h} 0 0 1 ${x} ${y + s} Z`, { color: C.warn });
      break;
    }
    case 'gap':
      page.drawCircle({ x: x + s / 2, y: y + s / 2, size: s / 2, borderColor: C.open, borderWidth: 1, borderDashArray: [2, 2] });
      break;
  }
}

// On the emergency card (it hangs on a wall) labels are at least 10 pt on the printed page, in ink; phone numbers bold.
const isCard = (lay) => lay.doc.cls === 'pg--card';
function labelStyle(lay) {
  return isCard(lay) ? { size: FIT >= 1 ? Math.max(9, 10 / K) : 9, color: C.ink, font: lay.f.regular } : { size: 9, color: C.gray, font: lay.f.regular };
}
const valueSize = (lay) => (isCard(lay) && FIT >= 1 ? Math.max(10.5, 10 / K) : 10.5);
function valueLines(lay, it) {
  if (isCard(lay)) return richLines(it.value ?? '', lay.f, valueSize(lay), CW * 0.64);
  return wrap(it.value ?? '', lay.f.regular, 10.5, CW * 0.64).map((t) => [{ t, font: lay.f.regular, x: 0 }]);
}
function fieldHeight(lay, it) {
  const ls = labelStyle(lay);
  return Math.max(wrap(it.label, ls.font, ls.size, CW * 0.3).length * ls.size * 1.4, valueLines(lay, it).length * valueSize(lay) * 1.4) + 6;
}

function blockHeight(lay, b) {
  const f = lay.f;
  switch (b.t) {
    case 'h': return wrap(b.text, f.bold, 13, CW - (b.n ? 30 : 0)).length * 13 * 1.3 + 16;
    case 'h2': return wrap(b.text, f.bold, 11.5, CW).length * 11.5 * 1.3 + 12;
    case 'p': return wrap(b.text, f.regular, 10.5, CW).length * 10.5 * 1.45 + 6;
    case 'lines': return wrap(b.items.join('\n'), f.regular, 10.5, b.gap ? CW - 12 : CW).length * 10.5 * 1.45 + 6;
    case 'space': return b.n * 10.5 * 1.45;
    case 'gap': return wrap(b.text, f.regular, 10.5, CW - 12).length * 10.5 * 1.45 + 12;
    case 'note': return wrap(b.text, f.regular, 9, CW).length * 9 * 1.4 + 6;
    case 'ul': return b.items.reduce((a, x) => a + wrap(x, f.regular, 10.5, CW - 18).length * 10.5 * 1.45 + 3, 6);
    case 'checks': return b.items.reduce((a, x) => a + wrap(x, f.regular, 10.5, CW - 22).length * 10.5 * 1.45 + 5, 6);
    case 'fields': return b.items.reduce((a, it) => a + fieldHeight(lay, it), 6);
    case 'sources': return b.items.reduce((a, x) => a + wrap(x, f.mono, 8.5, CW - 20).length * 8.5 * 1.5 + 3, 6);
    case 'mk': return wrap(b.text, f.regular, 10.5, CW).length * 10.5 * 1.45 + 14 + (b.source ? wrap(b.source, f.mono, 8, CW).length * 8 * 1.4 + 8 : 0) + 6;
    case 'verdict': return wrap(b.title, f.bold, 11.5, CW - 26).length * 11.5 * 1.3 + wrap(b.text, f.regular, 10.5, CW - 26).length * 10.5 * 1.45 + 18;
    case 'sign': return b.labels.length * 54 + 10;
    case 'status': return b.items.reduce((a, i) => a + Math.max(wrap(i.label, f.regular, 10.5, CW - 110).length * 10.5 * 1.4 + (i.detail ? wrap(i.detail, f.regular, 8.5, CW - 110).length * 8.5 * 1.4 : 0), 16) + 8, 4);
    default: return 0;
  }
}

function drawBlock(lay, b) {
  const f = lay.f;
  const page = () => lay.page;
  switch (b.t) {
    case 'h': {
      lay.ensure(blockHeight(lay, b) + 14); // heading stays with what follows
      if (b.n) {
        const nw = f.bold.widthOfTextAtSize(String(b.n), 13);
        page().drawText(String(b.n), { x: ML, y: lay.y - 13, size: 13, font: f.bold, color: C.accent });
        lay.text(b.text, { font: f.bold, size: 13, x: ML + nw + 8, width: CW - nw - 8, lh: 1.3, after: 12 });
      } else {
        lay.text(b.text, { font: f.bold, size: 13, lh: 1.3, after: 12 });
      }
      break;
    }
    case 'h2':
      lay.ensure(blockHeight(lay, b) + 12);
      lay.text(b.text, { font: f.bold, size: 11.5, lh: 1.3, after: 9 });
      break;
    case 'p':
      lay.text(b.text, { size: 10.5 });
      break;
    case 'lines': {
      const text = b.items.join('\n');
      lay.text(text, { size: 10.5, lh: 1.45, gap: b.gap, x: b.gap ? ML + 6 : ML, width: b.gap ? CW - 12 : CW });
      break;
    }
    case 'space': {
      const h = blockHeight(lay, b);
      lay.ensure(h);
      lay.y -= h;
      break;
    }
    case 'gap': {
      // Open point: the yellow of the gap cells, behind the text.
      const lines = wrap(b.text, f.regular, 10.5, CW - 12);
      const h = lines.length * 10.5 * 1.45 + 12;
      lay.ensure(h);
      page().drawRectangle({ x: ML, y: lay.y - h + 6, width: CW, height: h, color: C.gapFill });
      lay.text(b.text, { size: 10.5, x: ML + 6, width: CW - 12, after: 6 });
      break;
    }
    case 'note':
      lay.text(b.text, { size: 9, color: C.gray });
      break;
    case 'steps':
      for (const [i, item] of b.items.entries()) {
        lay.text(`${i + 1}. ${item.lead}`, { font: f.bold, size: 10.5, after: 2 });
        if (item.text) lay.text(item.text, { size: 10.5, after: 5 });
      }
      break;
    case 'calls': {
      const gap = 16, width = (CW - gap) / 2;
      const ls = labelStyle(lay);
      for (let i = 0; i < b.items.length; i += 2) {
        const row = b.items.slice(i, i + 2);
        const height = (c) => wrap(c.label, f.regular, ls.size, width).length * ls.size * 1.25
          + (c.number ? wrap(c.number, f.bold, 14, width).length * 17 + 2 : 0)
          + (c.text ? wrap(c.text, f.regular, 9, width).length * 12 : 0) + 8;
        const h = Math.max(...row.map(height));
        lay.ensure(h);
        const y0 = lay.y;
        row.forEach((c, col) => {
          lay.y = y0;
          const x = ML + col * (width + gap);
          lay.text(c.label, { x, width, font: f.regular, size: ls.size, lh: 1.25, after: 0 });
          if (c.number) lay.text(c.number, { x, width, font: f.bold, size: 14, lh: 17 / 14, after: 2, gap: c.gap });
          if (c.text) lay.text(c.text, { x, width, size: 9, lh: 12 / 9, after: 0, gap: c.gapText });
        });
        lay.y = y0 - h;
      }
      break;
    }
    case 'boxes': {
      const gap = 10, width = (CW - gap * (b.items.length - 1)) / b.items.length;
      const height = (item) => wrap(item.label, f.bold, 10, width - 12).length * 13
        + (item.parts ?? []).reduce((h, p) => h + wrap(p.text, f.regular, 9, width - 12).length * 12 + 4, 0) + 12;
      const h = Math.max(...b.items.map(height));
      lay.ensure(h);
      const y0 = lay.y;
      b.items.forEach((item, col) => {
        const x = ML + col * (width + gap);
        page().drawRectangle({ x, y: y0 - h, width, height: h, borderColor: C.border, borderWidth: 0.5 });
        lay.y = y0 - 6;
        lay.text(item.label, { x: x + 6, width: width - 12, font: f.bold, size: 10, lh: 1.3, after: 0 });
        for (const p of item.parts ?? []) lay.text(p.text, { x: x + 6, width: width - 12, size: 9, lh: 12 / 9, after: 4, gap: p.gap });
      });
      lay.y = y0 - h - 8;
      break;
    }
    case 'ul':
      for (const item of b.items) {
        const lines = wrap(item, f.regular, 10.5, CW - 18);
        lay.ensure(lines.length * 10.5 * 1.45 + 3);
        page().drawText('•', { x: ML + 4, y: lay.y - 10.5, size: 10.5, font: f.regular, color: C.ink });
        lines.forEach((ln) => {
          page().drawText(ln, { x: ML + 18, y: lay.y - 10.5, size: 10.5, font: f.regular, color: C.ink });
          lay.y -= 10.5 * 1.45;
        });
        lay.y -= 3;
      }
      lay.y -= 3;
      break;
    case 'checks':
      for (const item of b.items) {
        const lines = wrap(item, f.regular, 10.5, CW - 22);
        lay.ensure(lines.length * 10.5 * 1.45 + 5);
        page().drawRectangle({ x: ML + 2, y: lay.y - 11, width: 8, height: 8, borderColor: C.ink, borderWidth: 0.8 });
        lines.forEach((ln) => {
          page().drawText(ln, { x: ML + 22, y: lay.y - 10.5, size: 10.5, font: f.regular, color: C.ink });
          lay.y -= 10.5 * 1.45;
        });
        lay.y -= 5;
      }
      lay.y -= 1;
      break;
    case 'fields':
      for (const it of b.items) {
        const lh = fieldHeight(lay, it);
        const ls = labelStyle(lay);
        lay.ensure(lh);
        const y0 = lay.y;
        lay.text(it.label, { size: ls.size, color: ls.color, font: ls.font, width: CW * 0.3, lh: 1.4, after: 0 });
        lay.y = y0;
        const vlines = valueLines(lay, it);
        const vs = valueSize(lay);
        if (it.gap) {
          const vh = vlines.length * vs * 1.4 + 4;
          page().drawRectangle({ x: ML + CW * 0.34 - 4, y: y0 - vh + 4, width: CW * 0.66, height: vh, color: C.gapFill });
        }
        let y = y0;
        for (const ln of vlines) {
          for (const tk of ln) page().drawText(tk.t, { x: ML + CW * 0.34 + tk.x, y: y - vs, size: vs, font: tk.font, color: C.ink });
          y -= vs * 1.4;
        }
        lay.y = y0 - lh;
      }
      lay.y -= 4;
      break;
    case 'sources':
      b.items.forEach((x, i) => {
        const lines = wrap(x, f.mono, 8.5, CW - 20);
        lay.ensure(lines.length * 8.5 * 1.5 + 3);
        page().drawText(`${i + 1}.`, { x: ML, y: lay.y - 8.5, size: 8.5, font: f.mono, color: C.gray });
        lines.forEach((ln) => {
          page().drawText(ln, { x: ML + 20, y: lay.y - 8.5, size: 8.5, font: f.mono, color: C.gray });
          lay.y -= 8.5 * 1.5;
        });
        lay.y -= 3;
      });
      lay.y -= 3;
      break;
    case 'mk': {
      lay.keep(blockHeight(lay, b), () => {
        const s = 8;
        drawMarker(page(), b.kind, ML, lay.y - 10.5, s);
        const word = markWord(b.kind, lay.lang);
        page().drawText(word, { x: ML + s + 5, y: lay.y - 9.5, size: 8, font: f.monoMedium, color: C.gray });
        const ww = f.monoMedium.widthOfTextAtSize(word, 8);
        lay.y -= 14;
        lay.text(b.text, { size: 10.5, after: b.source ? 2 : 6 });
        void ww;
        if (b.source) {
          // The arrow is drawn, not typeset: the mono subset has no U+2192 glyph.
          const ay = lay.y - 6.5;
          page().drawLine({ start: { x: ML, y: ay }, end: { x: ML + 8, y: ay }, thickness: 0.8, color: C.gray });
          page().drawSvgPath(`M ${ML + 5.5} ${ay - 2.5} L ${ML + 8.5} ${ay} L ${ML + 5.5} ${ay + 2.5}`, { borderColor: C.gray, borderWidth: 0.8 });
          lay.text(b.source, { font: f.mono, size: 8, color: C.gray, x: ML + 14, width: CW - 14, after: 8 });
        }
      });
      break;
    }
    case 'verdict': {
      lay.keep(blockHeight(lay, b), () => {
        const color = LEVEL_COLOR[b.level] ?? C.ink;
        page().drawCircle({ x: ML + 6, y: lay.y - 8, size: 6, color });
        const y0 = lay.y;
        lay.text(b.title, { font: f.bold, size: 11.5, color, x: ML + 26, width: CW - 26, lh: 1.3, after: 4 });
        lay.text(b.text, { size: 10.5, x: ML + 26, width: CW - 26, after: 10 });
        void y0;
      });
      break;
    }
    case 'status':
      for (const i of b.items) {
        const labelLines = wrap(i.label, f.regular, 10.5, CW - 110);
        const detailLines = i.detail ? wrap(i.detail, f.regular, 8.5, CW - 110) : [];
        const h = Math.max(labelLines.length * 10.5 * 1.4 + detailLines.length * 8.5 * 1.4, 14) + 8;
        lay.ensure(h);
        const y0 = lay.y;
        page().drawRectangle({ x: ML, y: y0 - h + 4, width: CW, height: h, borderColor: C.border, borderWidth: 0.5 });
        labelLines.forEach((ln) => {
          page().drawText(ln, { x: ML + 8, y: lay.y - 11, size: 10.5, font: f.regular, color: C.ink });
          lay.y -= 10.5 * 1.4;
        });
        detailLines.forEach((ln) => {
          const gk = i.gapPart ? ln.lastIndexOf(i.gapPart) : -1;
          if (gk >= 0) {
            const gx = ML + 8 + f.regular.widthOfTextAtSize(ln.slice(0, gk), 8.5);
            page().drawRectangle({ x: gx - 1, y: lay.y - 8.5 * 1.4 + 1, width: f.regular.widthOfTextAtSize(i.gapPart, 8.5) + 2, height: 8.5 * 1.4, color: C.gapFill });
          }
          page().drawText(ln, { x: ML + 8, y: lay.y - 9, size: 8.5, font: f.regular, color: C.gray });
          lay.y -= 8.5 * 1.4;
        });
        const word = String(i.word ?? '');
        const ww = f.bold.widthOfTextAtSize(word, 9);
        page().drawText(word, { x: PAGE_W - MR - ww - 8, y: y0 - 12, size: 9, font: f.bold, color: STATUS_COLOR[i.status] ?? C.ink });
        lay.y = y0 - h;
      }
      lay.y -= 4;
      break;
    case 'sign': {
      lay.keep(blockHeight(lay, b), () => {
        for (const l of b.labels) {
          lay.y -= 30;
          page().drawLine({ start: { x: ML, y: lay.y }, end: { x: ML + 200, y: lay.y }, thickness: 0.8, color: C.ink });
          lay.y -= 12;
          page().drawText(String(l), { x: ML, y: lay.y, size: 8, font: f.regular, color: C.gray });
          lay.y -= 12;
        }
      });
      break;
    }
    case 'pagebreak':
      lay.newPage();
      break;
    case 'table': {
      const cols = b.head ? b.head.length : (b.rows[0]?.length ?? 1);
      const widths = b.widths ?? Array(cols).fill(Math.floor(100 / cols));
      const colW = widths.map((w) => (CW * w) / 100);
      const cellLines = (text, ci, head) => wrap(text ?? '', head ? f.bold : f.regular, 9, colW[ci] - 10);
      const rowHeight = (cells, head) => Math.max(...cells.map((c, ci) => cellLines(c, ci, head).length), 1) * 9 * 1.35 + 10;
      const drawRow = (cells, head) => {
        const h = rowHeight(cells, head);
        if (lay.y - h < MB) {
          lay.newPage();
          if (!head && b.head) drawRow(b.head, true); // repeat the header row
        }
        const y0 = lay.y;
        if (head) page().drawRectangle({ x: ML, y: y0 - h, width: CW, height: h, color: C.headFill });
        let x = ML;
        cells.forEach((c, ci) => {
          let ty = y0 - 12;
          for (const ln of cellLines(c, ci, head)) {
            page().drawText(ln, { x: x + 5, y: ty, size: 9, font: head ? f.bold : f.regular, color: C.ink });
            ty -= 9 * 1.35;
          }
          x += colW[ci];
        });
        // grid lines
        page().drawLine({ start: { x: ML, y: y0 - h }, end: { x: PAGE_W - MR, y: y0 - h }, thickness: 0.5, color: C.border });
        let gx = ML;
        for (const w of colW) {
          page().drawLine({ start: { x: gx, y: y0 }, end: { x: gx, y: y0 - h }, thickness: 0.5, color: C.border });
          gx += w;
        }
        page().drawLine({ start: { x: gx, y: y0 }, end: { x: gx, y: y0 - h }, thickness: 0.5, color: C.border });
        lay.y = y0 - h;
      };
      lay.ensure(rowHeight(b.head ?? b.rows[0] ?? [''], true));
      if (b.head) drawRow(b.head, true);
      for (const r of b.rows) drawRow(r, false);
      lay.y -= 8;
      break;
    }
    default:
      lay.unknownBlocks.push({ type: b.t, document: lay.doc.id ?? lay.doc.title });
      break;
  }
}

// Lays out one document (the block model of blocks.mjs) and returns the PDF bytes.
// The page settings are module state, so documents are laid out one after another (a small queue), never interleaved.
let queue = Promise.resolve();
export function toPdf(doc, lang = 'en') {
  const run = queue.then(() => renderFitted(doc, lang));
  queue = run.catch(() => {});
  return run;
}
// A one-page document (the emergency card, pg--card) fills its page and stays on one page: the type starts larger than
// the print CSS and steps down until the card fits; with very long answers it keeps shrinking below it, in steps of
// 8 percent, at most four times.
const CARD_FITS = [1.4, 1.34, 1.28, 1.22, 1.17, 1.12, 1.08, 1.04, 1, 0.92, 0.8464, 0.7787, 0.7164];
async function renderFitted(doc, lang) {
  if (doc.cls !== 'pg--card' && doc.id !== 'evidence-summary') return renderPdf(doc, lang);
  let out;
  const fits = doc.cls === 'pg--card' ? CARD_FITS : [1, 0.96, 0.92, 0.88, 0.84];
  for (const fit of fits) {
    out = await renderPdf(doc, lang, fit);
    if ((await PDFDocument.load(out)).getPageCount() === 1) break;
  }
  return out;
}
async function renderPdf(doc, lang, fit = 1) {
  applySettings(doc.printCss ?? '', fit);
  LANG = lang;
  FIT = fit;
  if (RUNS) RUNS.length = 0; // only the final layout counts
  if (UNKNOWN_BLOCKS) UNKNOWN_BLOCKS.length = 0;
  const pdf = await PDFDocument.create();
  pdf.setTitle(String(doc.title ?? ''));
  pdf.setCreator('Scutoria');
  const fonts = await loadFonts(pdf);
  const lay = new Layout(pdf, fonts, doc, lang);
  lay.unknownBlocks = UNKNOWN_BLOCKS ?? [];

  // Title and meta line.
  lay.text(doc.title, { font: fonts.bold, size: 16, lh: 1.25, after: 8 });
  if (doc.meta?.length) {
    lay.text(doc.meta.map((m) => `${m.label}: ${m.value}`).join('   '), { font: fonts.mono, size: 8, color: C.gray, after: 14 });
  }
  for (const b of doc.blocks ?? []) drawBlock(lay, b);

  // Closing line: footerLeft is printed in full once at the end of the
  // document (like the pg__foot block in the print HTML). Never cut.
  if (doc.footerLeft) {
    for (const line of wrap(doc.footerLeft, fonts.mono, 8.5, CW)) {
      if (lay.y < MB) lay.newPage();
      lay.y -= 13;
      lay.page.drawText(line, { x: ML, y: lay.y, size: 8.5, font: fonts.mono, color: C.gray });
    }
    lay.y -= 6;
  }

  // Footer on every page: the footer line left, page numbers right.
  const total = lay.pages.length;
  lay.pages.forEach((pg, i) => {
    const fy = MB - 22;
    pg.drawLine({ start: { x: ML, y: fy + 12 }, end: { x: PAGE_W - MR, y: fy + 12 }, thickness: 0.5, color: C.border });
    // Running footer: footerRight and the page number; footerRight wraps onto
    // a second line rather than being cut.
    const nums = lang === 'de' ? `Seite ${i + 1} von ${total}` : `Page ${i + 1} of ${total}`;
    const nw = fonts.mono.widthOfTextAtSize(nums, 7.5);
    pg.drawText(nums, { x: PAGE_W - MR - nw, y: fy, size: 7.5, font: fonts.mono, color: C.gray });
    if (doc.footerRight) {
      const lines = wrap(doc.footerRight, fonts.mono, 7.5, CW - nw - 12);
      lines.forEach((line, li) => {
        pg.drawText(line, { x: ML, y: fy - li * 10, size: 7.5, font: fonts.mono, color: C.gray });
      });
    }
  });
  if (K !== 1) lay.pages.forEach((pg) => { pg.scaleContent(K, K); pg.setSize(A4_W, A4_H); });
  applySettings('');

  return Buffer.from(await pdf.save());
}

// Kept for callers of the old Chromium module (tests close the browser at the end).
export async function closeBrowser() {}
