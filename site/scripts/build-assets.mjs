// Builds site/public from the design system: tokens.css from design/project/tokens.json,
// plus bundle.css, the Manrope files and the logos. One source of truth: the design folder.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const design = resolve(site, '..', 'design', 'project');
const out = resolve(site, 'public');
mkdirSync(resolve(out, 'fonts'), { recursive: true });

const t = JSON.parse(readFileSync(resolve(design, 'tokens.json'), 'utf8'));
const themes = t.color.themes.map((x) => x.id);
const first = themes[0];
const val = (tok, th) => (typeof tok.value === 'string' ? tok.value : (tok.value[th] ?? tok.value[first]));
const colorLines = (th) => [...t.color.tokens, ...(t.shadow?.tokens ?? [])].map((k) => `  --${k.name}: ${val(k, th)};`).join('\n');

let css = `/* Scutoria. Generated from design/project/tokens.json by scripts/build-assets.mjs. Do not edit by hand. */\n`;
css += `:root, [data-theme="${first}"] {\n${colorLines(first)}\n  color-scheme: dark;\n}\n`;
for (const th of themes.slice(1)) css += `[data-theme="${th}"] {\n${colorLines(th)}\n  color-scheme: light;\n}\n`;
const plain = [...t.spacing.tokens, ...t.radius.tokens, ...(t.size?.tokens ?? []), ...(t.motion?.tokens ?? [])];
css += `:root {\n${plain.map((k) => `  --${k.name}: ${k.value};`).join('\n')}\n${Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join('\n')}\n}\n`;
for (const g of t.type.groups) {
  for (const s of g.styles) {
    css += `.${s.name} { font-family: var(--font-${s.family ?? g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : ''} }\n`;
  }
}
const latin = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const latinExt = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF';
for (const f of t.type.fonts) {
  const file = basename(f.file);
  copyFileSync(resolve(design, f.file), resolve(out, 'fonts', file));
  css += `@font-face { font-family: "${f.family}"; src: url("/fonts/${file}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style ?? 'normal'}; font-display: swap; unicode-range: ${file.includes('latin-ext') ? latinExt : latin}; }\n`;
}
// The evidence family, IBM Plex Mono, is self-hosted too (no requests to Google Fonts): copied from the fontsource package.
const plex = resolve(site, 'node_modules', '@fontsource', 'ibm-plex-mono', 'files');
for (const [w, file] of [[400, 'ibm-plex-mono-latin-400-normal.woff2'], [500, 'ibm-plex-mono-latin-500-normal.woff2'], [400, 'ibm-plex-mono-latin-ext-400-normal.woff2'], [500, 'ibm-plex-mono-latin-ext-500-normal.woff2']]) {
  copyFileSync(resolve(plex, file), resolve(out, 'fonts', file));
  css += `@font-face { font-family: "IBM Plex Mono"; src: url("/fonts/${file}") format("woff2"); font-weight: ${w}; font-style: normal; font-display: swap; unicode-range: ${file.includes('latin-ext') ? latinExt : latin}; }\n`;
}
writeFileSync(resolve(out, 'tokens.css'), css);
copyFileSync(resolve(design, 'components', 'bundle.css'), resolve(out, 'bundle.css'));
for (const logo of ['favicon.svg', 'scutum-mark.svg', 'scutum-mark-ink.svg']) copyFileSync(resolve(design, 'assets', 'Logos', logo), resolve(out, logo));
console.log(`tokens.css: ${t.color.tokens.length} colours, ${themes.length} themes, ${t.type.groups.reduce((n, g) => n + g.styles.length, 0)} type styles; bundle.css, ${t.type.fonts.length} fonts and 3 logos copied.`);
