// The static previews of the two tools on a dark inset, used on the home page and on the tools page. The texts are the tools'
// own (questions, answers, verdicts, placeholders, the count line); nothing here is a new verdict.
import { esc } from '../layout.mjs';
import { PERSONAL_PREVIEW } from './paper.mjs';

// "May this go in?": the four questions with the example's answers and their lamps, and the verdict the tool gives for exactly
// these answers (decide(): "I do not know" about training makes it amber). tx: the tool texts of the language (tools.mjs).
export function previewIn(lang, tx, label) {
  const q = tx.in;
  const rows = [[q.q1, q.data[5][1], 'green'], [q.q2, q.access[0][1], 'green'], [q.q3, q.training[1][1], 'amber'], [q.q4, q.purpose[0][1], 'green']];
  return `<div class="preview" aria-hidden="true">
        <div class="preview__label">${esc(label)}</div>
        <ul class="preview__rows">${rows.map(([question, answer, lamp]) => `<li><span class="lamp lamp--${lamp}"></span><span class="preview__q">${esc(question)}</span><span class="preview__a">${esc(answer)}</span></li>`).join('')}</ul>
        <div class="preview__verdict"><span class="lamp lamp--amber"></span>${esc(q.verdicts.amber)}</div>
      </div>`;
}

// "Is there anything personal in it?": two fictional lines with the tool's placeholders, and the tool's count line.
export function previewPersonal(lang, tx, label) {
  const s = tx.personal;
  const lines = PERSONAL_PREVIEW[lang] ?? PERSONAL_PREVIEW.en;
  const n = lines.join(' ').match(/\[[^\]]+\]/g)?.length ?? 0;
  const mark = (line) => esc(line).replace(/\[[^\]]+\]/g, (m) => `<mark class="pm pm--strong">${m}</mark>`);
  return `<div class="preview" aria-hidden="true">
        <div class="preview__label">${esc(label)}</div>
        <div class="preview__text">${lines.map((l) => `<p>${mark(l)}</p>`).join('')}</div>
        <div class="preview__count">${esc(s.count.replace('%n', String(n)))}</div>
      </div>`;
}
