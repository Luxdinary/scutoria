// rendern.mjs · nimmt eine animierte Szene (HTML mit window.render(t)) Bild für Bild auf und setzt sie mit dem Ton zu einer MP4 zusammen.
// Die Szene ist eine reine Funktion der Zeit; deshalb ist jedes Bild reproduzierbar und Standbilder für die Prüfung sind exakt die Bilder des Videos.
// Aufruf (von C:\Users\Stefa\OneDrive\scutoria aus):
//   Prüfen:      node marketing/youtube/ANIMATION/rendern.mjs --szene <szene.html> --lang de --pruefen
//   Standbilder: node marketing/youtube/ANIMATION/rendern.mjs --szene <szene.html> --lang de --standbilder 1.5,9.9,20.4 --ordner <ordner>
//   Video:       node marketing/youtube/ANIMATION/rendern.mjs --szene <szene.html> --lang de --ton <ton.wav> --aus <video.mp4> [--von 0] [--bis 60] [--parallel 6] [--fps 30]
//   Ohne --dauer/--bis läuft das Video bis window.ENDE (Tonspur plus Nachlauf der Szene, z. B. Endbild).
// Werkzeuge: Playwright aus site/node_modules mit seinem Chromium (lokal, ohne Netz), ffmpeg.
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve, join, dirname } from 'node:path';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..', '..', '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const has = (n) => args.includes(n);
const { chromium } = await import(pathToFileURL(join(ROOT, 'site', 'node_modules', 'playwright', 'index.mjs')).href);

const szene = resolve(opt('--szene'));
const lang = opt('--lang', 'de');
const fps = Number(opt('--fps', 30));
const url = pathToFileURL(szene).href + `?lang=${lang}`;
const browser = await chromium.launch();

async function seite(log = true) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  if (log) { page.on('console', (m) => console.log('[seite]', m.text())); page.on('pageerror', (e) => console.log('[fehler]', e.message)); }
  await page.goto(url);
  await page.evaluate(() => window.ready);
  return page;
}
const page = await seite();
const info = await page.evaluate(() => ({ ende: window.ENDE || 0, fehlt: window.ANKER_FEHLT || [], akte: (window.AKTE_NAMEN || []),
  zeiten: (typeof AKTE !== 'undefined' ? AKTE : []).map((a) => a.name + ': ' + Object.entries(a).filter(([k, v]) => /^t[A-Z0-9]/.test(k) && typeof v === 'number').map(([k, v]) => `${k.slice(1)} ${v.toFixed(2)}`).join(' · ')) }));

if (has('--pruefen')) {
  console.log(`Sprache ${lang} · Ende ${info.ende.toFixed(2)} s · Akte: ${info.akte.join(', ')}`);
  if (info.fehlt.length) { console.log(`Fehlende Wortanker (${info.fehlt.length}):`); info.fehlt.forEach((f) => console.log('  ' + f)); }
  else console.log('Alle Wortanker gefunden.');
  if (has('--zeiten')) info.zeiten.forEach((z) => console.log(z));
  await browser.close(); process.exit(info.fehlt.length ? 2 : 0);
}

const still = opt('--standbilder');
if (still) {
  const dir = resolve(opt('--ordner'));
  mkdirSync(dir, { recursive: true });
  for (const s of still.split(',')) {
    const t = Number(s);
    await page.evaluate((x) => window.render(x), t);
    writeFileSync(join(dir, `t${t.toFixed(2).padStart(7, '0')}.png`), await page.screenshot({ type: 'png' }));
  }
  await browser.close();
  console.log('Standbilder:', dir);
  process.exit(0);
}

const von = Number(opt('--von', 0));
const bis = opt('--dauer') ? von + Number(opt('--dauer')) : Number(opt('--bis', info.ende));
const ton = resolve(opt('--ton'));
const aus = resolve(opt('--aus'));
const n = Math.round((bis - von) * fps);
const teile = Math.max(1, Number(opt('--parallel', 1)));
const tmp = join(tmpdir(), `scutoria-teile-${Date.now()}`); // eigene Zwischendateien dieses Laufs, werden am Ende entfernt
mkdirSync(tmp, { recursive: true });
const t0 = Date.now();
let fertig = 0;

async function teil(k, page) {
  const a = Math.floor((n * k) / teile), b = Math.floor((n * (k + 1)) / teile);
  const datei = join(tmp, `teil-${String(k).padStart(2, '0')}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(fps), datei], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = a; i < b; i++) {
    await page.evaluate((x) => window.render(x), von + i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (++fertig % 600 === 0) console.log(`Bild ${fertig}/${n} · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end();
  await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error(`ffmpeg ${c}`)))));
  return datei;
}
const seiten = [page];
for (let k = 1; k < teile; k++) seiten.push(await seite(false));
const dateien = await Promise.all(seiten.map((p, k) => teil(k, p)));
await browser.close();
const liste = join(tmp, 'liste.txt');
writeFileSync(liste, dateien.map((d) => `file '${d.replace(/\\/g, '/')}'`).join('\n'));
await new Promise((r, j) => {
  const ff = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', liste, '-ss', String(von), '-i', ton,
    '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', 'apad', '-c:a', 'aac', '-b:a', '192k', '-t', String(bis - von), '-movflags', '+faststart', aus], { stdio: ['ignore', 'inherit', 'inherit'] });
  ff.on('close', (c) => (c === 0 ? r() : j(new Error(`ffmpeg ${c}`))));
});
rmSync(tmp, { recursive: true, force: true });
console.log(`Video: ${aus} · ${(bis - von).toFixed(1)} s · ${((Date.now() - t0) / 1000).toFixed(0)} s Rechenzeit`);
