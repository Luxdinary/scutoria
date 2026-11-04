// Builds the one-page reading samples of the example documents (owner's decision E35, 3 November 2026: a preview shows
// one page from each of four parts, never everything). Input: a JSON manifest with entries { src, dst, lang }; the sources
// are the full PDFs of an example run (start a run with kind=example on the local runner, `npm run local`, and download
// each document's PDF). Each sample keeps page 1 of its source and gets a quiet footer line naming the page count.
// Usage: node scripts/leseproben.mjs manifest.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const NOTE = {
  de: (n) => `Leseprobe · Seite 1 von ${n} · Das vollständige Dokument entsteht im Toolkit.`,
  en: (n) => `Sample · page 1 of ${n} · The complete document comes from the toolkit.`,
};

const manifestPath = process.argv[2];
if (!manifestPath) { console.error('manifest.json missing'); process.exit(1); }
const base = dirname(resolve(manifestPath));
const entries = JSON.parse(readFileSync(manifestPath, 'utf8'));

for (const e of entries) {
  const src = await PDFDocument.load(readFileSync(resolve(base, e.src)));
  const n = src.getPageCount();
  const out = await PDFDocument.create();
  const [page] = await out.copyPages(src, [0]);
  out.addPage(page);
  const font = await out.embedFont(StandardFonts.Helvetica);
  const text = (NOTE[e.lang] ?? NOTE.en)(n);
  page.drawText(text, { x: 40, y: 14, size: 7.5, font, color: rgb(0.42, 0.45, 0.52) });
  out.setTitle(`${e.title ?? 'Sample'} (${e.lang === 'de' ? 'Leseprobe' : 'sample'})`);
  out.setProducer('Scutoria');
  out.setCreator('Scutoria');
  const dst = resolve(base, e.dst);
  mkdirSync(dirname(dst), { recursive: true });
  writeFileSync(dst, await out.save());
  console.log(`${e.dst}: page 1 of ${n}`);
}
