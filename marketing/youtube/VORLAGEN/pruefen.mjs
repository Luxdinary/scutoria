// pruefen.mjs · prüft Skripte und Shorts gegen die Regeln der Vorlagen (Belegregel, verbotene Wörter, Kennzeichnung, Preis, Namen, Wortzahl).
// Aufruf: node marketing/youtube/VORLAGEN/pruefen.mjs   (vom Ordner C:\Users\Stefa\OneDrive\scutoria aus)
// Ausgabe: ein Bericht je Datei; Befunde sind Hinweise zur Durchsicht, keine automatische Korrektur.
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = join(process.cwd(), 'marketing', 'youtube');
const forbidden = [
  /\bcompliant\b/i, /\bkonform\b/i, /\bcertified\b/i, /\bzertifiziert\w*\b/i, /\bsecure\b/i, /\bsafe\b/i,
  /\bsicher\b/i, /\brechtssicher\b/i, /\bmeets all requirements\b/i, /\berfüllt alle anforderungen\b/i,
  /\bgdpr ready\b/i, /\bai act ready\b/i, /\bStefan\b/, /\bDallinger\b/, /\bich\b/, /\bI\b/,
];
const dashes = [/ – /, /—/, / - /];

function speechLines(text, { fromScript = true } = {}) {
  const lines = text.split(/\r?\n/);
  let start = 0;
  if (fromScript) {
    const i = lines.findIndex((l) => /^## (Script|Skript|Sprechtext)/.test(l));
    if (i >= 0) start = i + 1;
  }
  const out = [];
  for (let i = start; i < lines.length; i++) {
    const l = lines[i];
    if (/^## Regie/.test(l)) break;
    if (/^\s*#/.test(l) || /^\s*\[/.test(l) || /^\s*$/.test(l) || /^\s*\|/.test(l)) continue;
    out.push({ n: i + 1, text: l.trim() });
  }
  return out;
}

const words = (lines) => lines.map((l) => l.text.replace(/<[^>]+>/g, ' ')).join(' ').split(/\s+/).filter(Boolean).length;

function check(file, lines, { lang, kind, schluss = 0 }) {
  const findings = [];
  const joined = lines.map((l) => l.text).join('\n');
  for (const l of lines) {
    for (const re of forbidden) {
      const m = l.text.match(re);
      if (!m) continue;
      // Ausnahmen: der Claim „Ready to show“, der Markername „Unsicher“, Zitate der Produktseite „not secure“.
      const isI = re.source === '\\bI\\b', isIch = re.source === '\\bich\\b';
      if (isI && lang === 'de') continue;
      if (isIch && lang === 'en') continue;
      // Freigegebene Zitate und Fragenkennungen: „no document claims that your business is secure“, „question I four“, „Frage I vier“.
      if (/business is secure or complies/i.test(l.text) || /Betrieb sicher ist oder ein Gesetz/i.test(l.text)) continue;
      if (isI && /\b(question|Frage) I\b/i.test(l.text) && !/\bI\b(?! (four|4|vier))/.test(l.text.replace(/\b(question|Frage) I\b/gi, ''))) continue;
      findings.push(`Zeile ${l.n}: verbotenes Wort „${m[0]}“: ${l.text.slice(0, 100)}`);
    }
    for (const re of dashes) if (re.test(l.text)) findings.push(`Zeile ${l.n}: Gedankenstrich: ${l.text.slice(0, 100)}`);
    if (/!/.test(l.text)) findings.push(`Zeile ${l.n}: Ausrufezeichen: ${l.text.slice(0, 100)}`);
    if (/[\u{1F300}-\u{1FAFF}]/u.test(l.text)) findings.push(`Zeile ${l.n}: Emoji`);
  }
  if (kind === 'long') {
    // Regel seit Stefans Entscheidung vom 1. November 2026 („Ja, für alle“): Der gesprochene Block „Hier ist Scutoria … keine Rechtsberatung“
    // steht im Schlussabschnitt (### 7); der Bildschirmtext ab Sekunde 0 bleibt (KENNZEICHNUNG.md).
    const block = lang === 'en' ? /This is Scutoria\. The voice you hear is synthetic/ : /Hier ist Scutoria\. Die Stimme, die Sie hören, ist synthetisch/;
    const hit = lines.find((l) => block.test(l.text));
    if (!hit) findings.push('Kennzeichnungsblock „Hier ist Scutoria …“ fehlt');
    else if (schluss && hit.n < schluss) findings.push(`Kennzeichnungsblock steht in Zeile ${hit.n}, nicht im Schlussabschnitt (Regel seit 1. November 2026)`);
    if (!/(Synthetische Stimme|Synthetic voice)/.test(file.text || '')) findings.push('Bildschirmtext „Synthetische Stimme“ ab Sekunde 0 fehlt im Einstieg');
    const price = (joined.match(/199 euros per year|199 Euro im Jahr/g) ?? []).length;
    if (price !== 1) findings.push(`Preissatz ${price} mal statt einmal`);
    if (/299|bundle/i.test(joined)) findings.push('Bundle oder 299 im Sprechtext');
  } else {
    if (/199|\b99\b/.test(joined)) findings.push('Preis im Short');
    const closeEn = /Synthetic voice, sources on screen, no legal advice/, closeDe = /Synthetische Stimme, Quellen am Bildschirm, keine Rechtsberatung/;
    if (lang === 'en' && !closeEn.test(joined)) findings.push('Kurzer Kennzeichnungssatz EN fehlt');
    if (lang === 'de' && !closeDe.test(joined)) findings.push('Kurzer Kennzeichnungssatz DE fehlt');
  }
  return findings;
}

// Belegregel-Heuristik: ein Sprechabsatz mit Jahreszahl, Artikel-, Paragraf- oder Fristangabe braucht in den folgenden drei Zeilen eine Quellenzeile.
function sourceCheck(text) {
  const lines = text.split(/\r?\n/);
  const i0 = lines.findIndex((l) => /^## (Script|Skript|Sprechtext)/.test(l));
  const out = [];
  for (let i = Math.max(i0, 0); i < lines.length; i++) {
    const l = lines[i];
    if (/^## Regie/.test(l)) break;
    if (/^\s*[#\[|]/.test(l) || /^\s*$/.test(l)) continue;
    const needs = /\b(19|20)\d\d\b|\b(Article|Artikel|Annex|Anhang|Paragraph|Absatz|Section)\b|\bhours?\b|\bStunden\b|\bmonths?\b|\bMonate?n?\b|\bpercent\b|\bProzent\b|\bmillion\b|\bMillion/i.test(l);
    if (!needs) continue;
    const next = lines.slice(i + 1, i + 5).join('\n');
    if (!/\[(SOURCE|QUELLE)/.test(next)) out.push(`Zeile ${i + 1}: Zahl oder Rechtsaussage ohne Quellenzeile in den nächsten Zeilen: ${l.trim().slice(0, 90)}`);
  }
  return out;
}

const report = [];
const skripte = join(root, 'SKRIPTE');
for (const f of readdirSync(skripte).filter((x) => x.endsWith('.md')).sort()) {
  const text = readFileSync(join(skripte, f), 'utf8');
  const lang = /\.de\.md$/.test(f) ? 'de' : 'en';
  const lines = speechLines(text);
  const n = words(lines);
  const range = lang === 'en' ? [1500, 2000] : [1450, 1900];
  const zeilen = text.split(/\r?\n/);
  const schluss = zeilen.findIndex((l) => /^### 7 /.test(l)) + 1;
  const einstieg = zeilen.slice(0, Math.max(0, zeilen.findIndex((l) => /^### 2 /.test(l)))).join('\n');
  const findings = check({ name: f, text: einstieg }, lines, { lang, kind: 'long', schluss });
  if (n < range[0] || n > range[1]) findings.push(`Wortzahl ${n} außerhalb ${range[0]} bis ${range[1]}`);
  findings.push(...sourceCheck(text));
  const sources = (text.match(/\[(SOURCE|QUELLE):/g) ?? []).length;
  report.push(`${f}: ${n} Wörter Sprechtext, ${sources} Quellenzeilen${findings.length ? '\n  ' + findings.join('\n  ') : ' · ohne Befund'}`);
}

const teile = join(root, 'SHORTS-TEILE');
for (const f of readdirSync(teile).filter((x) => x.endsWith('.md')).sort()) {
  const text = readFileSync(join(teile, f), 'utf8');
  const blocks = text.split(/^### /m).slice(1);
  const lines = [`${f}: ${blocks.length} Shorts`];
  for (const b of blocks) {
    const title = b.split('\n')[0].trim();
    const en = b.split(/^EN\b.*$/m)[1]?.split(/^DE\b.*$/m)[0] ?? '';
    const de = b.split(/^DE\b.*$/m)[1] ?? '';
    const enL = speechLines(en, { fromScript: false }), deL = speechLines(de, { fromScript: false });
    const nEn = words(enL), nDe = words(deL);
    const f1 = check(f, enL, { lang: 'en', kind: 'short' });
    const f2 = check(f, deL, { lang: 'de', kind: 'short' });
    const w = [];
    if (nEn < 150 || nEn > 220) w.push(`EN ${nEn} Wörter außerhalb 150 bis 220`);
    if (nDe < 140 || nDe > 200) w.push(`DE ${nDe} Wörter außerhalb 140 bis 200`);
    lines.push(`  ${title}: EN ${nEn}, DE ${nDe}${[...w, ...f1, ...f2].length ? '\n    ' + [...w, ...f1, ...f2].join('\n    ') : ''}`);
  }
  report.push(lines.join('\n'));
}
console.log(report.join('\n\n'));
