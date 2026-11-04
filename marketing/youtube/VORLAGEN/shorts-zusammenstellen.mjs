// shorts-zusammenstellen.mjs · baut SHORTS.md aus den Teildateien unter SHORTS-TEILE/ (Kopf, Übersichtstabelle, dann alle Shorts).
// Aufruf: node marketing/youtube/VORLAGEN/shorts-zusammenstellen.mjs   (vom Ordner C:\Users\Stefa\OneDrive\scutoria aus)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'marketing', 'youtube');
const teile = join(root, 'SHORTS-TEILE');
const files = readdirSync(teile).filter((f) => f.endsWith('.md')).sort();
const rows = [];
const parts = [];
for (const f of files) {
  const text = readFileSync(join(teile, f), 'utf8').replace(/^# .*\n+/, '');
  parts.push(text.trim());
  for (const block of text.split(/^### /m).slice(1)) {
    const head = block.split('\n')[0].trim();
    const [id, ...rest] = head.split(' · ');
    const metaLine = block.split('\n').slice(1, 4).find((l) => /Priorität:/.test(l)) ?? '';
    const prio = metaLine.match(/Priorität:\s*(\d)/)?.[1] ?? '';
    const thema = metaLine.match(/Thema:\s*(\d+)/)?.[1] ?? f.slice(0, 2);
    const hookEn = block.match(/^Hook EN:\s*(.*)$/m)?.[1]?.trim() ?? '';
    rows.push({ id: id.trim(), title: rest.join(' · ').trim(), thema, prio, hookEn });
  }
}
const date = new Date().toISOString().slice(0, 10);
const byPrio = (p) => rows.filter((r) => r.prio === String(p)).length;
const head = `# Shorts und Reels: ${rows.length} Stück, je Englisch und Deutsch

Stand ${date}. Zusammengestellt aus \`SHORTS-TEILE/\` mit \`VORLAGEN/shorts-zusammenstellen.mjs\`; Änderungen bitte in den Teildateien, dann neu zusammenstellen. Jeder Short folgt \`VORLAGEN/SKRIPT-SHORT.md\`: 65 bis 90 Sekunden, ein Gedanke, Hook in drei Sekunden, Quellenzeile am Bildschirm, Verweis auf Langvideo und Seite, kurzer Kennzeichnungssatz am Schluss. Priorität 1 (${byPrio(1)} Stück) wird zuerst produziert, Priorität 2 (${byPrio(2)}) in der zweiten Welle, Priorität 3 (${byPrio(3)}) als Reserve.

## Übersicht

| Kennung | Thema | Arbeitstitel | Priorität | Hook EN |
|---|---|---|---|---|
${rows.map((r) => `| ${r.id} | ${r.thema} | ${r.title.replace(/\|/g, '/')} | ${r.prio} | ${r.hookEn.replace(/\|/g, '/')} |`).join('\n')}

`;
writeFileSync(join(root, 'SHORTS.md'), head + parts.join('\n\n') + '\n', 'utf8');
console.log(`SHORTS.md geschrieben: ${rows.length} Shorts aus ${files.length} Dateien`);
