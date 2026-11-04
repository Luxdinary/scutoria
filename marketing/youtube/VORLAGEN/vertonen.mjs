// vertonen.mjs · vertont ein Skript oder einen Text mit der Gemini-API (Text-to-Speech), abschnittsweise, als WAV-Dateien.
// Der Schlüssel kommt aus der Umgebungsvariable GEMINI_API_KEY oder aus einer .env-Datei außerhalb dieses Ordners (--env Pfad);
// er wird nie ausgegeben und nie in den Scutoria-Ordner geschrieben. Ausgabe liegt außerhalb von Git (Standard: C:\Users\Stefa\Videos\scutoria).
//
// Aufrufe (vom Ordner C:\Users\Stefa\OneDrive\scutoria aus, Node 22 oder neuer):
//   Stimmproben:   node marketing/youtube/VORLAGEN/vertonen.mjs --probe --env C:\Automation\faceless-network\.env --voices Charon,Schedar,Sadaltager,Sulafat
//   Ein Skript:    node marketing/youtube/VORLAGEN/vertonen.mjs --skript marketing/youtube/SKRIPTE/01-ai-rules-start.en.md --voice Charon --env C:\Automation\faceless-network\.env
//   Ein Short:     node marketing/youtube/VORLAGEN/vertonen.mjs --short S-01-2 --lang en --voice Charon --env C:\Automation\faceless-network\.env
//   Optionen:      --model gemini-3.8-flash-tts (Standard) | gemini-3.8-flash-lite-tts · --out <Ordner> · --nur 1,2,3 (nur diese Abschnitte)
//                  --gruppen 1-3,4-7 (Standard: zwei Anfragen je Skript) · --einzeln (eine Anfrage je Abschnitt) · --neu (vorhandene Dateien überschreiben)
// Free-Tier, gemessen 2026-10-30: zehn Anfragen je Tag und Modell (HTTP 429 "limit: 10 requests per day on Free Tier"); das Skript bricht dann sofort ab.
// Quelle der Anfrageform: ai.google.dev/gemini-api/docs/speech-generation (Stand 2026-10-28, Abruf 2026-10-29): POST /v1beta/interactions,
// Kopfzeile x-goog-api-key, Antwort als WAV 24 kHz mono 16 Bit, base64 in steps[].content[].data.
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { setDefaultResultOrder } from 'node:dns';
setDefaultResultOrder('ipv4first'); // IPv6-Verbindungen laufen auf diesem Rechner in einen Timeout (geprüft 2026-10-30)

const args = process.argv.slice(2);
const opt = (name, def = null) => { const i = args.indexOf(name); return i >= 0 && i + 1 < args.length ? args[i + 1] : def; };
const flag = (name) => args.includes(name);

const STYLE = {
  en: 'Calm, clear narration for a business audience. Medium pitch, unhurried pace, no brightness, no sales tone. Short sentences with a small pause at each full stop. Read numbers, dates and article references exactly as written. Pronounce "Scutoria" as skoo-TOR-ee-uh. Do not add words.',
  de: 'Ruhige, klare Sprecherstimme für ein geschäftliches Publikum. Mittlere Lage, gelassenes Tempo, keine Fröhlichkeit, kein Verkaufston. Kurze Sätze mit einer kleinen Pause an jedem Punkt. Zahlen, Daten und Artikelangaben genau so lesen, wie sie geschrieben sind. "Scutoria" wird skuh-TOR-i-a ausgesprochen. Keine Wörter hinzufügen.',
};
const PROBE = {
  en: 'This is Scutoria. The voice you hear is synthetic. <short pause> Article four of the AI Act has applied since 2 February 2025. The deadline under Article thirty-three of the GDPR is 72 hours. <short pause> Not yet, with a date, is a complete answer.',
  de: 'Hier ist Scutoria. Die Stimme, die Sie hören, ist synthetisch. <short pause> Artikel vier der KI-Verordnung gilt seit dem 2. Februar 2025. Die Frist nach Artikel dreiunddreißig der DSGVO beträgt 72 Stunden. <short pause> Noch nicht, mit Termin, ist eine vollständige Antwort.',
};

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = opt('--env');
  if (!envPath) throw new Error('Kein Schlüssel: GEMINI_API_KEY setzen oder --env <Pfad zur .env> angeben.');
  const line = readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => /^\s*GEMINI_API_KEY\s*=/.test(l));
  if (!line) throw new Error('GEMINI_API_KEY nicht in der .env-Datei gefunden.');
  return line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');
}

// Sprechtext eines Skripts je Abschnitt (### 1 Hook … ### 7 Verweis): Überschriften, Klammerzeilen und Tabellen fallen weg, Pausen-Tags bleiben.
function sections(markdown) {
  const lines = markdown.split(/\r?\n/);
  let i = lines.findIndex((l) => /^## (Script|Skript|Sprechtext)/.test(l));
  if (i < 0) i = -1;
  const out = [];
  let cur = null;
  for (i = i + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^## /.test(l)) break;
    const h = l.match(/^### (\d+)\s*(.*)$/);
    if (h) { cur = { nr: Number(h[1]), title: h[2].trim(), text: [] }; out.push(cur); continue; }
    if (!cur) continue;
    if (/^\s*[#\[|]/.test(l) || /^\s*$/.test(l)) continue;
    cur.text.push(l.trim());
  }
  return out.map((s) => ({ ...s, text: s.text.join('\n') }));
}

// Sprechtext eines Shorts (EN oder DE) aus SHORTS.md.
function shortText(id, lang) {
  const md = readFileSync(resolve('marketing/youtube/SHORTS.md'), 'utf8');
  const block = md.split(/^### /m).find((b) => b.startsWith(id + ' '));
  if (!block) throw new Error(`Short ${id} nicht in SHORTS.md gefunden.`);
  const re = lang === 'de' ? /^DE\b.*$/m : /^EN\b.*$/m;
  const after = block.split(re)[1];
  if (!after) throw new Error(`Short ${id}: Sprachblock ${lang} fehlt.`);
  const stopAt = lang === 'de' ? /^### |^---/m : /^DE\b.*$/m;
  const part = after.split(stopAt)[0];
  return part.split(/\r?\n/).filter((l) => l.trim() && !/^\s*[#\[|]/.test(l)).map((l) => l.trim()).join('\n');
}

async function speak({ key, model, voice, lang, text }) {
  const body = {
    model,
    input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style: STYLE[lang] }] }] }],
    response_format: { type: 'audio' },
    generation_config: { speech_config: [{ voice }] },
  };
  // Bis zu fünf Versuche bei 429 und 5xx (hohe Nachfrage, Ratenbegrenzung), mit wachsender Wartezeit.
  let res, raw;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      raw = await res.text();
    } catch (e) {
      res = null; raw = `Verbindung: ${e.cause?.code ?? e.message}`;
    }
    if (res && (res.ok || (res.status !== 429 && res.status < 500))) break;
    if (res && res.status === 429 && /per day/i.test(raw)) break; // Tageskontingent erschöpft: Warten hilft erst morgen
    if (attempt === 5) break;
    const wait = 10000 * attempt;
    console.log(`${res ? 'HTTP ' + res.status : raw}, neuer Versuch in ${wait / 1000} s (${attempt} von 5)`);
    await new Promise((r) => setTimeout(r, wait));
  }
  if (!res) throw new Error(raw);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${raw.slice(0, 600).replace(/key=[^&\s"]+/g, 'key=…')}`);
  const json = JSON.parse(raw);
  const audio = (json.steps ?? []).filter((s) => s.type === 'model_output').flatMap((s) => s.content ?? []).filter((c) => c.type === 'audio').pop();
  if (!audio?.data) throw new Error('Antwort ohne Audio: ' + JSON.stringify(Object.keys(json)).slice(0, 200));
  const bytes = Buffer.from(audio.data, 'base64');
  const usage = json.usage ?? json.usage_metadata ?? null;
  return { bytes, usage, mime: audio.mime_type ?? audio.mimeType ?? 'audio/wav' };
}

const seconds = (bytes) => Math.max(0, (bytes.length - 44)) / (24000 * 2);

async function main() {
  const key = flag('--text') ? null : loadKey(); // --text braucht keinen Schlüssel
  const model = opt('--model', 'gemini-3.8-flash-tts');
  const outRoot = opt('--out', 'C:\\Users\\Stefa\\Videos\\scutoria');
  const log = (dir, line) => { appendFileSync(join(dir, 'vertonung.log'), `${new Date().toISOString()} ${line}\n`); console.log(line); };

  if (flag('--probe')) {
    const voices = (opt('--voices', 'Charon,Schedar,Sadaltager,Sulafat')).split(',').map((v) => v.trim());
    const dir = join(outRoot, 'stimme-proben');
    mkdirSync(dir, { recursive: true });
    for (const voice of voices) for (const lang of ['en', 'de']) {
      const file = join(dir, `${voice.toLowerCase()}-${lang}.wav`);
      if (existsSync(file) && !flag('--neu')) { console.log(`vorhanden: ${file}`); continue; }
      const r = await speak({ key, model, voice, lang, text: PROBE[lang] });
      writeFileSync(file, r.bytes);
      log(dir, `${basename(file)} · ${seconds(r.bytes).toFixed(1)} s · ${model} · usage ${JSON.stringify(r.usage)}`);
    }
    return;
  }

  const short = opt('--short');
  if (short) {
    const lang = opt('--lang', 'en');
    const voice = opt('--voice', 'Charon');
    const dir = join(outRoot, 'shorts', short);
    mkdirSync(dir, { recursive: true });
    const text = shortText(short, lang);
    const r = await speak({ key, model, voice, lang, text });
    const file = join(dir, `${short}-${lang}.wav`);
    writeFileSync(file, r.bytes);
    log(dir, `${basename(file)} · ${seconds(r.bytes).toFixed(1)} s · ${text.split(/\s+/).length} Wörter · ${model} · ${voice} · usage ${JSON.stringify(r.usage)}`);
    return;
  }

  const skript = opt('--skript');
  if (!skript) throw new Error('Angeben: --probe, --short <Kennung> oder --skript <Datei>.');
  const lang = /\.de\.md$/.test(skript) ? 'de' : 'en';

  // --text: keine API, nur die Sprechtexte zum Einfügen in AI Studio (je Abschnitt, je Gruppe, ganz) plus die Stilanweisung.
  if (flag('--text')) {
    const name0 = basename(skript).replace(/\.(en|de)\.md$/, '');
    const tdir = join(outRoot, name0, 'sprechtext');
    mkdirSync(tdir, { recursive: true });
    const secs0 = sections(readFileSync(resolve(skript), 'utf8'));
    writeFileSync(join(tdir, `stil-${lang}.txt`), STYLE[lang] + '\n', 'utf8');
    for (const s of secs0) writeFileSync(join(tdir, `${String(s.nr).padStart(2, '0')}-${lang}.txt`), s.text + '\n', 'utf8');
    const g13 = secs0.filter((s) => s.nr <= 3).map((s) => s.text).join('\n\n'), g47 = secs0.filter((s) => s.nr >= 4).map((s) => s.text).join('\n\n');
    writeFileSync(join(tdir, `01-03-${lang}.txt`), g13 + '\n', 'utf8');
    writeFileSync(join(tdir, `04-07-${lang}.txt`), g47 + '\n', 'utf8');
    writeFileSync(join(tdir, `ganz-${lang}.txt`), secs0.map((s) => s.text).join('\n\n') + '\n', 'utf8');
    const w = (t) => t.split(/\s+/).filter(Boolean).length;
    console.log(`Sprechtexte unter ${tdir}: je Abschnitt (${secs0.map((s) => w(s.text)).join(', ')} Wörter), Gruppen 01-03 (${w(g13)}) und 04-07 (${w(g47)}), ganz (${w(g13) + w(g47)}), Stilanweisung stil-${lang}.txt`);
    return;
  }
  const voice = opt('--voice', 'Charon');
  const only = opt('--nur') ? opt('--nur').split(',').map(Number) : null;
  const name = basename(skript).replace(/\.(en|de)\.md$/, '');
  const dir = join(outRoot, name, 'stimme');
  mkdirSync(dir, { recursive: true });
  const secs = sections(readFileSync(resolve(skript), 'utf8'));
  if (!secs.length) throw new Error('Keine Abschnitte gefunden (### 1 … ### 7).');
  // Gruppen: --gruppen 1-3,4-7 fasst Abschnitte zu einer Anfrage zusammen (Standard, weil der Free-Tier zehn Anfragen je Tag und Modell erlaubt, gemessen 2026-10-30).
  const groupSpec = opt('--gruppen', flag('--einzeln') ? '' : '1-3,4-7');
  const groups = groupSpec
    ? groupSpec.split(',').map((g) => { const [a, b] = g.split('-').map(Number); return { from: a, to: b ?? a }; })
    : secs.map((s) => ({ from: s.nr, to: s.nr }));
  let total = 0;
  for (const g of groups) {
    const parts = secs.filter((s) => s.nr >= g.from && s.nr <= g.to && (!only || only.includes(s.nr)));
    if (!parts.length) continue;
    const label = g.from === g.to ? String(g.from).padStart(2, '0') : `${String(g.from).padStart(2, '0')}-${String(g.to).padStart(2, '0')}`;
    const file = join(dir, `${label}-${lang}.wav`);
    if (existsSync(file) && !flag('--neu')) { console.log(`vorhanden: ${file}`); continue; }
    const text = parts.map((s) => s.text).join('\n\n');
    const r = await speak({ key, model, voice, lang, text });
    writeFileSync(file, r.bytes);
    total += seconds(r.bytes);
    log(dir, `${basename(file)} · Abschnitte ${parts.map((s) => s.nr).join(', ')} · ${text.split(/\s+/).length} Wörter · ${seconds(r.bytes).toFixed(1)} s · ${model} · ${voice} · usage ${JSON.stringify(r.usage)}`);
  }
  log(dir, `gesamt ${(total / 60).toFixed(1)} min · ${name} · ${lang}`);
}

main().catch((e) => { console.error('Fehler: ' + e.message); process.exit(1); });
