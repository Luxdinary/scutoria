// Renders the preview images for shared links (Open Graph, 1200 by 630) from the design tokens into public/og/.
// Runs locally with the installed Edge (like the PDF print); the PNGs are committed, the server only serves them.
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { printCss } from '../src/toolkit/documents/blocks.mjs';
import { mark, esc } from '../src/layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '..', 'public', 'og');
mkdirSync(out, { recursive: true });

const cards = [
  { file: 'scutoria-en', kicker: 'Security · Business · AI', title: 'Sourced. Dated.\nReady to show.', sub: 'The documents a customer, an insurer or your own staff ask for, generated from your answers.', foot: 'Source-based · No legal advice' },
  { file: 'scutoria-de', kicker: 'Sicherheit · Wirtschaft · KI', title: 'Belegt. Datiert.\nVorzeigbar.', sub: 'Die Dokumente, nach denen ein Kunde, ein Versicherer oder die eigene Belegschaft fragt, aus Ihren Antworten erzeugt.', foot: 'Quellenbasiert · Keine Rechtsberatung' },
  { file: 'ai-policy-en', kicker: 'Toolkit 01 · Annual licence', title: 'AI Policy Toolkit', sub: 'AI usage policy, tool register, training evidence, labelling check, evidence page. Up to thirty-four questions, one dated document set.', foot: 'Source-based · No legal advice' },
  { file: 'ai-policy-de', kicker: 'Toolkit 01 · Jahreslizenz', title: 'KI-Richtlinien-Toolkit', sub: 'KI-Nutzungsrichtlinie, Tool-Register, Schulungsnachweis, Kennzeichnungs-Check, Nachweisseite. Bis zu vierunddreißig Fragen, ein datierter Dokumentensatz.', foot: 'Quellenbasiert · Keine Rechtsberatung' },
  { file: 'security-evidence-en', kicker: 'Toolkit 02 · Annual licence', title: 'Security Evidence\nToolkit', sub: 'The security questionnaire from your customer or insurer, answered honestly: self-declaration, action plan, emergency card, evidence list, cover letter, clause checklist. Forty-seven questions.', foot: 'Source-based · No legal advice' },
  { file: 'security-evidence-de', kicker: 'Toolkit 02 · Jahreslizenz', title: 'Sicherheitsnachweis-\nToolkit', sub: 'Der Sicherheitsfragebogen Ihres Kunden oder Versicherers, ehrlich beantwortet: Selbstauskunft, Maßnahmenplan, Notfallkarte, Nachweisliste, Antwortschreiben, Klausel-Prüfliste. Siebenundvierzig Fragen.', foot: 'Quellenbasiert · Keine Rechtsberatung' },
];

const css = `${printCss()}
  html, body { background: var(--ground); color: var(--ink); margin: 0; }
  .card { width: 1200px; height: 630px; padding: 64px 80px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: var(--ground); font-family: var(--font-sans); }
  .brand { display: flex; align-items: center; gap: 14px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; font-size: 22px; }
  .brand svg { color: var(--accent); }
  .kicker { font-family: var(--font-mono); font-size: 20px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
  .t { font-size: 86px; line-height: 1.02; font-weight: 800; letter-spacing: -0.035em; white-space: pre-line; margin: 20px 0 24px; }
  .sub { font-size: 28px; line-height: 1.35; color: var(--ink-muted); max-width: 920px; }
  .foot { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 20px; letter-spacing: 0.08em; color: var(--ink-muted); }
`;

const channel = process.env.PDF_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined);
const browser = await chromium.launch({ headless: true, channel });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const c of cards) {
  const html = `<!doctype html><html data-theme="dark"><head><meta charset="utf-8"><style>${css}</style></head><body><div class="card"><div class="brand">${mark(40)}Scutoria</div><div><div class="kicker">${esc(c.kicker)}</div><div class="t">${esc(c.title)}</div><div class="sub">${esc(c.sub)}</div></div><div class="foot"><span>scutoria.com</span><span>${esc(c.foot)}</span></div></div></body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(out, `${c.file}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('written', `public/og/${c.file}.png`);
}
await browser.close();
