// video-bauen.mjs · baut aus Skript, Tonspur und Szenenplan ein fertiges Video (1920 × 1080, MP4) mit ffmpeg.
// Bild: Seiten der lokalen Website (Edge ohne Fenster), Seiten der Muster-PDFs (Python, pypdfium2), Textkarten und Quellenzeilen
// aus dem Designsystem (HTML, Edge). Ton: die WAV-Gruppen aus vertonen.mjs. Zeiten: Wortanteil je Absatz, an Pausen der Tonspur gerastet.
//
// Aufrufe (vom Ordner C:\Users\Stefa\OneDrive\scutoria aus):
//   node marketing/youtube/VORLAGEN/video-bauen.mjs --skript marketing/youtube/SKRIPTE/01-ai-rules-start.en.md --plan
//       schreibt <Arbeitsordner>/plan.json (Absätze mit Zeiten, Bildanweisung, Quelle, Marker) und zeigt die Liste
//   … --bilder    rendert alle Bilder des Szenenplans (SZENEN/<slug>.<lang>.json) in <Arbeitsordner>/bild/
//   … --video     setzt das Video zusammen: <Arbeitsordner>/export/<slug>.<lang>.mp4 und .srt
//   Optionen: --stimme <Ordner mit 01-03-xx.wav, 04-07-xx.wav> (Standard: C:\Users\Stefa\Videos\scutoria\<slug>\stimme)
//             --arbeit <Arbeitsordner> (Standard: C:\Users\Stefa\Videos\scutoria\<slug>) · --server http://127.0.0.1:8787
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, resolve, dirname } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (n, d = null) => { const i = args.indexOf(n); return i >= 0 && i + 1 < args.length ? args[i + 1] : d; };
const flag = (n) => args.includes(n);
const EDGE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'].find(existsSync);
const ROOT = 'C:\\Users\\Stefa\\OneDrive\\scutoria';
const W = 1920, H = 1080, FPS = 30;

const skript = opt('--skript');
if (!skript) throw new Error('--skript <Datei> angeben');
const lang = /\.de\.md$/.test(skript) ? 'de' : 'en';
const slug = basename(skript).replace(/\.(en|de)\.md$/, '');
const arbeit = opt('--arbeit', `C:\\Users\\Stefa\\Videos\\scutoria\\${slug}`);
const stimme = opt('--stimme', join(arbeit, 'stimme'));
const server = opt('--server', 'http://127.0.0.1:8787');
const bildDir = join(arbeit, 'bild', lang); // je Sprache: Seiten, Karten und Overlays unterscheiden sich
mkdirSync(bildDir, { recursive: true });

// ---------- 1. Skript lesen: Abschnitte und Absätze mit Bildanweisung, Marker, Quelle ----------
function parseScript(md) {
  const lines = md.split(/\r?\n/);
  let i = lines.findIndex((l) => /^## (Script|Skript|Sprechtext)/.test(l));
  const segs = [];
  let section = 0, sectionTitle = '', screen = '', marker = '';
  for (i = i + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^## /.test(l)) break;
    const h = l.match(/^### (\d+)\s*(.*)$/);
    if (h) { section = Number(h[1]); sectionTitle = h[2].trim(); continue; }
    const sc = l.match(/^\[SCREEN:\s*(.*)\]\s*$/); if (sc) { screen = sc[1]; continue; }
    const mk = l.match(/^\[MARKER:\s*(.*)\]\s*$/); if (mk) { marker = mk[1].trim(); continue; }
    const so = l.match(/^\[(SOURCE|QUELLE):\s*(.*)\]\s*$/);
    if (so) { const last = segs[segs.length - 1]; if (last && !last.source) last.source = so[2].trim(); continue; }
    if (/^\s*[#\[|]/.test(l) || /^\s*$/.test(l)) continue;
    const text = l.trim();
    const pause = /^<(short|long) pause>$/.test(text);
    segs.push({ nr: segs.length, section, sectionTitle, screen, marker: pause ? '' : marker, source: '', text, pause, words: pause ? 0 : text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length });
    if (!pause) marker = '';
  }
  return segs;
}

// ---------- 2. Zeiten: Wortanteil je Absatz innerhalb der WAV-Gruppe, an Pausen gerastet ----------
function wavSeconds(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  return Number(out.trim());
}
function silences(file) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', 'silencedetect=noise=-38dB:d=0.4', '-f', 'null', '-'], { encoding: 'utf8' });
  const txt = r.stderr + r.stdout;
  const starts = [...txt.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const ends = [...txt.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
  return starts.map((s, k) => ({ start: s, end: ends[k] ?? s, mid: (s + (ends[k] ?? s)) / 2 }));
}
function timeline(segs) {
  const groups = [{ file: join(stimme, `01-03-${lang}.wav`), sections: [1, 2, 3] }, { file: join(stimme, `04-07-${lang}.wav`), sections: [4, 5, 6, 7] }];
  let t0 = 0;
  const out = [];
  for (const g of groups) {
    if (!existsSync(g.file)) throw new Error(`Tonspur fehlt: ${g.file}`);
    const dur = wavSeconds(g.file);
    const sil = silences(g.file);
    const inG = segs.filter((s) => g.sections.includes(s.section));
    // Pausen-Tags bekommen ein festes Gewicht (etwa eine Sekunde), Absätze ihren Wortanteil.
    const weight = (s) => (s.pause ? (s.text.includes('long') ? 1.5 : 0.9) : s.words / 2.6);
    const total = inG.reduce((a, s) => a + weight(s), 0);
    const trail = 0.6; // Nachlauf am Ende der Datei
    const usable = dur - trail;
    let acc = 0;
    let prevEnd = 0;
    inG.forEach((s, k) => {
      acc += weight(s);
      let end = (acc / total) * usable;
      if (k === inG.length - 1) end = dur;
      else {
        // an die nächste Pause rasten, höchstens vier Sekunden entfernt, nie vor dem Vorgänger
        const near = sil.filter((p) => Math.abs(p.mid - end) <= 4 && p.mid > prevEnd + 0.8).sort((a, b) => Math.abs(a.mid - end) - Math.abs(b.mid - end))[0];
        if (near) end = near.start + 0.15;
      }
      out.push({ ...s, group: g.file, start: t0 + prevEnd, end: t0 + end, dur: end - prevEnd });
      prevEnd = end;
    });
    t0 += dur;
  }
  return { segs: out, total: t0 };
}

// ---------- 3. Bilder: Szenenplan lesen und rendern ----------
const SZENEN = join(ROOT, 'marketing', 'youtube', 'SZENEN', `${slug}.${lang}.json`);
// zoom > 1 nimmt die Seite in einem schmaleren Fenster mit höherem Gerätefaktor auf: das Bild bleibt width × height Pixel groß, der Text wird größer (für schmale Dokumentspalten).
function edgeShot({ url, out, width = W, height = H, wait = 2500, reduced = true, zoom = 1 }) {
  const profile = join(process.env.TEMP, 'scutoria-edge-video');
  const a = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${profile}`, `--window-size=${Math.round(width / zoom)},${Math.round(height / zoom)}`, `--virtual-time-budget=${wait}`, `--screenshot=${out}`];
  if (zoom !== 1) a.push(`--force-device-scale-factor=${zoom}`);
  if (reduced) a.push('--force-prefers-reduced-motion');
  a.push(url);
  spawnSync(EDGE, a, { stdio: 'ignore', timeout: 90000 });
  if (!existsSync(out)) throw new Error(`Bild nicht erzeugt: ${out} (${url})`);
}
function pdfPage({ file, page, out, scale = 2.4 }) {
  const py = `import pypdfium2 as pdfium\npdf = pdfium.PdfDocument(r"${file}")\npdf[${page - 1}].render(scale=${scale}).to_pil().save(r"${out}")\n`;
  const r = spawnSync('python', ['-c', py], { encoding: 'utf8' }); // ohne -I: pypdfium2 liegt im Benutzer-Site-Ordner; die PDFs sind eigene Dateien
  if (r.status !== 0 || !existsSync(out)) throw new Error(`PDF-Seite nicht erzeugt: ${file} S. ${page}: ${r.stderr.slice(0, 300)}`);
}
// Textkarte oder Overlay als HTML aus dem Designsystem, gerendert mit Edge auf 1920 × 1080 (Overlays mit durchsichtigem Grund).
function htmlFrame({ html, out, transparent = false }) {
  const tmp = out.replace(/\.png$/, '.html');
  const fonts = `${ROOT.replace(/\\/g, '/')}/site/public/fonts`;
  const doc = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:"Manrope";src:url("file:///${fonts}/manrope-latin-wght-normal.woff2") format("woff2");font-weight:200 800}
  @font-face{font-family:"Manrope";src:url("file:///${fonts}/manrope-latin-ext-wght-normal.woff2") format("woff2");font-weight:200 800}
  @font-face{font-family:"IBM Plex Mono";src:url("file:///${fonts}/ibm-plex-mono-latin-400-normal.woff2") format("woff2");font-weight:400}
  @font-face{font-family:"IBM Plex Mono";src:url("file:///${fonts}/ibm-plex-mono-latin-ext-400-normal.woff2") format("woff2");font-weight:400}
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:${transparent ? 'transparent' : '#0b1120'};font-family:"Manrope",sans-serif;color:#e9eef8}
  .mark{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:16px}.mark svg{width:34px;height:34px}.word{font-weight:700;font-size:22px;letter-spacing:.18em;text-transform:uppercase}
  .card{position:absolute;left:72px;right:72px;top:300px;font-size:92px;font-weight:800;letter-spacing:-.03em;line-height:1.05;text-wrap:balance}
  .card.small{font-size:60px;top:340px}.lead{position:absolute;left:72px;right:72px;top:620px;font-size:36px;line-height:1.45;color:#a1adc4;max-width:1200px}
  .ov{position:absolute;left:72px;top:60px;font-size:30px;font-weight:700;background:rgba(18,27,47,.92);padding:14px 22px;border-radius:12px}
  .src{position:absolute;left:0;right:0;bottom:0;background:rgba(18,27,47,.94);padding:20px 72px;font-family:"IBM Plex Mono",monospace;font-size:24px;line-height:1.4;color:#a1adc4;border-top:1px solid rgba(226,232,246,.12)}
  .mk{position:absolute;left:72px;bottom:118px;display:flex;align-items:center;gap:12px;font-family:"IBM Plex Mono",monospace;font-size:22px;letter-spacing:.08em;text-transform:uppercase;background:rgba(18,27,47,.92);padding:10px 18px;border-radius:999px}
  .mk i{display:inline-block;width:18px;height:18px}.mk.fact{color:#4f8cff}.mk.fact i{background:#4f8cff}.mk.interpretation{color:#b07cff}.mk.interpretation i{background:#b07cff;transform:rotate(45deg);width:15px;height:15px}
  .mk.uncertain{color:#ffd166}.mk.uncertain i{border:2px solid #ffd166;border-radius:50%;background:linear-gradient(90deg,#ffd166 50%,transparent 50%)}.mk.gap{color:#ff6b6b}.mk.gap i{border:2px dashed #ff6b6b;border-radius:50%}
  .foot{position:absolute;left:72px;bottom:48px;font-family:"IBM Plex Mono",monospace;font-size:22px;color:#a1adc4}
  .stamp{position:absolute;right:72px;top:68px;font-family:"IBM Plex Mono",monospace;font-size:22px;letter-spacing:.08em;color:#a1adc4;text-transform:uppercase}
  </style></head><body>${html}</body></html>`;
  writeFileSync(tmp, doc, 'utf8');
  const profile = join(process.env.TEMP, 'scutoria-edge-video');
  const a = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${profile}`, `--window-size=${W},${H}`, '--virtual-time-budget=1500', `--screenshot=${out}`];
  if (transparent) a.push('--default-background-color=00000000');
  a.push('file:///' + tmp.replace(/\\/g, '/'));
  spawnSync(EDGE, a, { stdio: 'ignore', timeout: 90000 });
  if (!existsSync(out)) throw new Error(`Bild nicht erzeugt: ${out}`);
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MARK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#4f8cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l6.5 3.2v11.6L12 21.5l-6.5-4.2V5.7L12 2.5z"/><path d="M12 6v12"/><path d="M8.5 12h7"/></svg>';
const brand = () => `<div class="mark">${MARK_SVG}<div class="word">Scutoria</div></div>`;
const MK_WORD = { en: { fact: 'Fact', interpretation: 'Interpretation', uncertain: 'Uncertain', gap: 'Gap' }, de: { fact: 'Fakt', interpretation: 'Auslegung', uncertain: 'Unsicher', gap: 'Lücke' } };
const mkClass = (m) => ({ fact: 'fact', fakt: 'fact', interpretation: 'interpretation', auslegung: 'interpretation', uncertain: 'uncertain', unsicher: 'uncertain', gap: 'gap', lücke: 'gap' }[String(m).toLowerCase()] ?? '');

// Overlay je Absatz: Marker-Chip unten links, Quellenzeile als Band unten, optional ein kurzer Bildschirmtext oben links.
function overlayHtml({ marker, source, text, stamp }) {
  const c = mkClass(marker);
  return `${text ? `<div class="ov">${esc(text)}</div>` : ''}${stamp ? `<div class="stamp">${esc(stamp)}</div>` : ''}${c ? `<div class="mk ${c}"><i></i>${MK_WORD[lang][c]}</div>` : ''}${source ? `<div class="src">${esc(source)}</div>` : ''}`;
}

function renderScenes(plan) {
  if (!existsSync(SZENEN)) throw new Error(`Szenenplan fehlt: ${SZENEN}`);
  const scenes = JSON.parse(readFileSync(SZENEN, 'utf8'));
  const done = new Set();
  for (const sc of scenes.szenen) {
    if (sc.gleich) { done.add(sc.id); continue; } // nutzt das Bild einer anderen Szene, nur mit anderer Bewegung
    const out = join(bildDir, `${sc.id}.png`);
    if (existsSync(out) && !flag('--neu')) { done.add(sc.id); continue; }
    if (sc.art === 'seite') edgeShot({ url: server + sc.url, out, width: W, height: sc.hoehe ?? H, wait: sc.warten ?? 2500, zoom: sc.zoom ?? 1 });
    else if (sc.art === 'pdf') pdfPage({ file: resolve(ROOT, sc.datei), page: sc.seite ?? 1, out });
    else if (sc.art === 'karte') htmlFrame({ out, html: `${brand()}<div class="card${sc.klein ? ' small' : ''}">${esc(sc.titel)}</div>${sc.text ? `<div class="lead">${esc(sc.text)}</div>` : ''}${sc.fuss ? `<div class="foot">${esc(sc.fuss)}</div>` : ''}` });
    else if (sc.art === 'bild') { if (!existsSync(resolve(ROOT, sc.datei))) throw new Error(`Bild fehlt: ${sc.datei}`); }
    done.add(sc.id);
    console.log(`Bild: ${sc.id}`);
  }
  // Overlays je Absatz mit Marker oder Quelle oder Bildschirmtext
  for (const s of plan.segs) {
    const szene = scenes.absatz[String(s.nr)] ?? {};
    const ovText = szene.text ?? '';
    if (!s.marker && !s.source && !ovText && !szene.stempel) continue;
    const out = join(bildDir, `ov-${String(s.nr).padStart(3, '0')}.png`);
    if (existsSync(out) && !flag('--neu')) continue;
    htmlFrame({ out, transparent: true, html: overlayHtml({ marker: s.marker, source: s.source, text: ovText, stamp: szene.stempel }) });
    console.log(`Overlay: Absatz ${s.nr}`);
  }
  return scenes;
}

// ---------- 4. Video: je Absatz ein Clip (Bild mit langsamer Bewegung + Overlay), dann alles aneinander, Ton darunter ----------
function fmtT(t) { const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s.toFixed(3).padStart(6, '0').replace('.', ',')}`; }
function buildVideo(plan, scenes) {
  const clipDir = join(arbeit, 'clips', lang); mkdirSync(clipDir, { recursive: true });
  const exportDir = join(arbeit, 'export'); mkdirSync(exportDir, { recursive: true });
  const list = [];
  const srt = [];
  let srtN = 0;
  // Welche Szene gilt für welchen Absatz: scenes.absatz[nr].szene, sonst die zuletzt gesetzte.
  // Aufeinanderfolgende Absätze mit derselben Szene bilden einen Lauf: die Bewegung geht über den ganzen Lauf, nicht je Absatz von vorn.
  let current = scenes.start ?? scenes.szenen[0].id;
  const runs = [];
  for (const s of plan.segs) {
    const a = scenes.absatz[String(s.nr)] ?? {};
    if (a.szene) current = a.szene;
    const dur = Math.max(0.4, s.dur);
    const last = runs[runs.length - 1];
    if (last && last.id === current && !a.szene) { last.items.push({ s, off: last.dur }); last.dur += dur; }
    else runs.push({ id: current, items: [{ s, off: 0 }], dur });
  }
  for (const run of runs) {
    const sc = scenes.szenen.find((x) => x.id === run.id);
    if (!sc) throw new Error(`Szene ${run.id} fehlt`);
    const img = sc.art === 'bild' ? resolve(ROOT, sc.datei) : join(bildDir, `${sc.gleich ?? sc.id}.png`);
    // Bewegung: Seitenbilder (hoch) fahren langsam nach unten; PDF-Seiten fahren langsam über die Seite; Karten stehen.
    const bewegung = sc.bewegung ?? (sc.art === 'seite' && (sc.hoehe ?? H) > H ? 'scroll' : sc.art === 'pdf' ? 'pdf' : 'still');
    const R = run.dur.toFixed(2);
    for (const { s, off } of run.items) {
      const ov = join(bildDir, `ov-${String(s.nr).padStart(3, '0')}.png`);
      const dur = Math.max(0.4, s.dur);
      const clip = join(clipDir, `c${String(s.nr).padStart(3, '0')}.mp4`);
      const tt = `(t+${off.toFixed(2)})`; // Zeit innerhalb des Laufs
      let vf;
      if (bewegung === 'scroll') {
        const von = sc.von ?? 56, bis = sc.bis ?? null; // oben die Leiste (56 px) abschneiden
        const maxY = bis != null ? bis : `ih-${H}`;
        vf = `[0:v]crop=${W}:${H}:0:'min(${maxY},${von}+(${maxY}-${von})*${tt}/${R})'[bg]`;
      } else if (bewegung === 'fix') {
        vf = `[0:v]crop=${W}:${H}:0:${sc.von ?? 56}[bg]`;
      } else if (bewegung === 'pdf') {
        // A4-Seite auf dunklem Grund, auf `zoom` Pixel Höhe gebracht (Standard 1560), fährt über den Lauf von oben nach unten
        const zoom = sc.zoom ?? 1560;
        vf = `[0:v]scale=-2:${zoom}[p];color=c=0x0b1120:s=${W}x${H}:r=${FPS}:d=${dur.toFixed(2)}[g];[g][p]overlay=(W-w)/2:'-(h-${H})*min(1,${tt}/${R})'[bg]`;
      } else {
        vf = `[0:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=0x0b1120[bg]`;
      }
      const inputs = ['-loop', '1', '-framerate', String(FPS), '-i', img];
      let filter = vf;
      if (existsSync(ov)) { inputs.push('-loop', '1', '-framerate', String(FPS), '-i', ov); filter += `;[bg][1:v]overlay=0:0:format=auto[v]`; } else filter += `;[bg]copy[v]`;
      if (!existsSync(clip) || flag('--neu')) {
        const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...inputs, '-filter_complex', filter, '-map', '[v]', '-t', dur.toFixed(3), '-r', String(FPS), '-pix_fmt', 'yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', clip], { encoding: 'utf8' });
        if (r.status !== 0) throw new Error(`Clip ${s.nr} fehlgeschlagen: ${r.stderr.slice(0, 500)}`);
        console.log(`Clip ${s.nr}: ${dur.toFixed(1)} s · ${sc.id}${off ? ` (+${off.toFixed(1)} s im Lauf)` : ''}`);
      }
      list.push(`file '${clip.replace(/\\/g, '/').replace(/'/g, "'\\''")}'`);
      if (!s.pause) { srtN++; srt.push(`${srtN}\n${fmtT(s.start)} --> ${fmtT(s.end - 0.05)}\n${s.text.replace(/<[^>]+>/g, '').trim()}\n`); }
    }
  }
  const listFile = join(clipDir, 'liste.txt');
  writeFileSync(listFile, list.join('\n') + '\n', 'utf8');
  const audioList = join(clipDir, 'ton.txt');
  writeFileSync(audioList, [`01-03-${lang}.wav`, `04-07-${lang}.wav`].map((f) => `file '${join(stimme, f).replace(/\\/g, '/')}'`).join('\n') + '\n', 'utf8');
  const out = join(exportDir, `${slug}.${lang}.mp4`);
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile, '-f', 'concat', '-safe', '0', '-i', audioList, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', out], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`Zusammensetzen fehlgeschlagen: ${r.stderr.slice(0, 500)}`);
  writeFileSync(join(exportDir, `${slug}.${lang}.srt`), srt.join('\n'), 'utf8');
  console.log(`Video: ${out}`);
  console.log(`Untertitel: ${join(exportDir, `${slug}.${lang}.srt`)}`);
  return out;
}

// ---------- Ablauf ----------
const segs = parseScript(readFileSync(resolve(skript), 'utf8'));
const plan = timeline(segs);
writeFileSync(join(arbeit, `plan.${lang}.json`), JSON.stringify(plan, null, 1), 'utf8');
if (flag('--plan')) {
  for (const s of plan.segs) console.log(`${String(s.nr).padStart(3)} §${s.section} ${fmtT(s.start).slice(3, 8)}-${fmtT(s.end).slice(3, 8)} ${String(s.dur.toFixed(1)).padStart(5)}s ${s.marker ? '[' + s.marker + '] ' : ''}${s.pause ? s.text : s.text.slice(0, 70)}${s.screen ? '  ⟶ ' + s.screen.slice(0, 60) : ''}`);
  console.log(`gesamt ${(plan.total / 60).toFixed(2)} min, ${plan.segs.length} Absätze`);
}
if (flag('--bilder') || flag('--video')) {
  const scenes = renderScenes(plan);
  if (flag('--video')) buildVideo(plan, scenes);
}
