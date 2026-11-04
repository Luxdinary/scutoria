import { readText } from '../runtime/files.mjs';
import { esc } from '../layout.mjs';
let mapping;
export function sourceMapping() { return mapping ??= JSON.parse(readText('content/toolkits/source-links.json')); }
export function linkSourceLine(text) {
  const candidates = [];
  for (const source of sourceMapping().sources) for (const pattern of source.patterns) {
    let from = 0, start;
    while ((start = text.indexOf(pattern, from)) !== -1) {
      candidates.push({ start, end: start + pattern.length, url: source.url }); from = start + 1;
    }
  }
  candidates.sort((a,b) => (b.end-b.start)-(a.end-a.start) || a.start-b.start);
  const chosen = [];
  for (const c of candidates) if (!chosen.some(v => c.start < v.end && c.end > v.start)) chosen.push(c);
  chosen.sort((a,b) => a.start-b.start);
  let at=0, html='';
  for (const c of chosen) {
    const match=text.slice(c.start,c.end), label=match.replace(/(?:,\s*§[\s;·]*|[\s;·]+)$/u,'');
    html+=esc(text.slice(at,c.start))+`<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(label)}</a>`+esc(match.slice(label.length)); at=c.end;
  }
  return html+esc(text.slice(at));
}