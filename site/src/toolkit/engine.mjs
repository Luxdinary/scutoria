// The questionnaire engine: loads questions.json, computes the steps for a run, renders a step, parses an answer.
import { readText } from '../runtime/files.mjs';
import { root } from '../config.mjs';
import { esc } from '../layout.mjs';

const cache = new Map();
export function loadQuestions(product) {
  if (!cache.has(product)) cache.set(product, JSON.parse(readText(`content/toolkits/${product}/questions.json`)));
  return cache.get(product);
}

// Flat list of questions in order; B2 only appears when B1 has at least one tool kind other than "none".
export function steps(def, answers) {
  const list = [];
  for (const block of def.blocks) {
    for (const q of block.questions) {
      if (q.dependsOn) {
        const dep = answers[q.dependsOn];
        const kinds = Array.isArray(dep?.values) ? dep.values.filter((v) => v !== 'none') : [];
        if (kinds.length === 0) continue;
      }
      list.push({ ...q, block });
    }
  }
  return list;
}

const isoPlus = (days) => { const d = new Date(); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); };

// The example business from the kit, so that clicking through produces a complete document set.
export function defaultAnswers(def, lang) {
  const a = {};
  for (const block of def.blocks) {
    for (const q of block.questions) {
      const d = q.default;
      switch (q.type) {
        case 'text':
        case 'textarea': a[q.id] = { text: typeof d === 'object' ? (d[lang] ?? d.en ?? '') : (d ?? '') }; break;
        case 'date': a[q.id] = { date: typeof d === 'string' && d.startsWith('+') ? isoPlus(Number(d.slice(1))) : (d ?? '') }; break;
        case 'select': a[q.id] = { value: d ?? '', text: q.defaultText ? (q.defaultText[lang] ?? q.defaultText.en) : '' }; break;
        case 'multi': a[q.id] = { values: Array.isArray(d) ? [...d] : [], text: '' }; break;
        case 'role': {
          const roleOpt = q.roles.find((r) => r.v === (d?.role ?? 'owner')) ?? q.roles[0];
          a[q.id] = { role: roleOpt.v, text: roleOpt[lang] ?? roleOpt.en, contact: d?.contact ? (d.contact[lang] ?? d.contact.en) : '', deputy: d?.deputy ? (d.deputy[lang] ?? d.deputy.en) : '' };
          break;
        }
        case 'tools': a[q.id] = { rows: d ? JSON.parse(JSON.stringify(d)) : {} }; break;
        default: a[q.id] = {};
      }
    }
  }
  return a;
}

export function optionLabel(q, value, lang) {
  const opts = q.options ?? q.roles ?? q.accounts ?? [];
  const o = opts.find((x) => x.v === value);
  return o ? (o[lang] ?? o.en) : value;
}

// Parses a submitted form body into the stored answer for a question.
export function parseAnswer(q, body, lang) {
  const s = (v) => String(v ?? '').trim().slice(0, 2000);
  switch (q.type) {
    case 'text':
    case 'textarea': return { text: s(body.text) };
    case 'date': return { date: /^\d{4}-\d{2}-\d{2}$/.test(s(body.date)) ? s(body.date) : '' };
    case 'select': return { value: s(body.value), text: s(body.text) };
    case 'multi': {
      const raw = body.values === undefined ? [] : (Array.isArray(body.values) ? body.values : [body.values]);
      const allowed = new Set((q.options ?? []).map((o) => o.v));
      return { values: raw.map(s).filter((v) => allowed.has(v)), text: s(body.text) };
    }
    case 'role': {
      const role = s(body.role);
      const roleOpt = q.roles.find((r) => r.v === role) ?? q.roles[0];
      return { role: roleOpt.v, text: s(body.text) || (roleOpt[lang] ?? roleOpt.en), contact: s(body.contact), deputy: s(body.deputy) };
    }
    case 'tools': {
      const rows = {};
      const allowed = new Set((q.accounts ?? []).map((o) => o.v));
      for (const key of Object.keys(body)) {
        const m = key.match(/^tool_(\w+)_(name|account)$/);
        if (!m) continue;
        rows[m[1]] ??= { name: '', account: 'unknown' };
        if (m[2] === 'name') rows[m[1]].name = s(body[key]);
        else rows[m[1]].account = allowed.has(s(body[key])) ? s(body[key]) : 'unknown';
      }
      return { rows };
    }
    default: return {};
  }
}

export function isComplete(q, a) {
  if (!q.required) return true;
  switch (q.type) {
    case 'text':
    case 'textarea': return !!a?.text;
    case 'date': return !!a?.date;
    case 'select': return !!a?.value;
    case 'multi': return (a?.values?.length ?? 0) > 0;
    case 'role': return !!a?.text;
    default: return true;
  }
}

// HTML for the form controls of one question.
export function renderControls(q, a, lang, answers) {
  const L = (o) => esc(o[lang] ?? o.en);
  const textField = (name, label, value, id) => `
    <label class="sc-field"><span class="sc-field__label">${esc(label)}</span><input class="sc-field__input" type="text" name="${name}" id="${id}" value="${esc(value ?? '')}"></label>`;
  switch (q.type) {
    case 'text':
      return `<label class="sc-field"><span class="sc-field__label">${lang === 'de' ? 'Antwort' : 'Answer'}</span><input class="sc-field__input" type="text" name="text" id="f-text" value="${esc(a?.text ?? '')}" ${q.required ? 'required' : ''}></label>`;
    case 'textarea':
      return `<label class="sc-field"><span class="sc-field__label">${lang === 'de' ? 'Antwort' : 'Answer'}</span><textarea class="sc-field__input sc-field__area" name="text" id="f-text" rows="3" ${q.required?'required':''}>${esc(a?.text ?? '')}</textarea></label>`;
    case 'date':
      return `<label class="sc-field"><span class="sc-field__label">${lang === 'de' ? 'Datum' : 'Date'}</span><input class="sc-field__input" type="date" name="date" id="f-date" value="${esc(a?.date ?? '')}" ${q.required ? 'required' : ''}></label>`;
    case 'select':
      return `<div class="sc-options" role="radiogroup">${q.options.map((o, i) => `
        <label class="sc-option"><input type="radio" name="value" value="${esc(o.v)}" ${a?.value === o.v ? 'checked' : ''} ${q.required && i === 0 ? 'required' : ''}><span class="sc-option__dot"></span><span><span class="sc-option__title">${L(o)}</span>${o.text ? `<span class="sc-option__hint">${L(o.text)}</span>` : ''}</span></label>`).join('')}</div>
        ${q.options.some((o) => o.text) ? textField('text', lang === 'de' ? 'Falls zutreffend: Angabe dazu' : 'If applicable: details', a?.text, 'f-text') : ''}`;
    case 'multi':
      return `<div class="sc-options">${q.options.map((o) => `
        <label class="sc-option"><input type="checkbox" name="values" value="${esc(o.v)}" ${(a?.values ?? []).includes(o.v) ? 'checked' : ''}><span class="sc-option__dot sc-option__dot--box"></span><span><span class="sc-option__title">${L(o)}</span>${o.text ? `<span class="sc-option__hint">${L(o.text)}</span>` : ''}</span></label>`).join('')}</div>
        ${q.options.some((o) => o.text) ? textField('text', lang === 'de' ? 'Falls „etwas anderes“: was?' : 'If "something else": what?', a?.text, 'f-text') : ''}`;
    case 'role':
      return `<div class="sc-options" role="radiogroup">${q.roles.map((o) => `
        <label class="sc-option"><input type="radio" name="role" value="${esc(o.v)}" ${a?.role === o.v ? 'checked' : ''} ${q.required?'required':''}><span class="sc-option__dot"></span><span><span class="sc-option__title">${L(o)}</span></span></label>`).join('')}</div>
        ${textField('text', lang === 'de' ? 'So soll es auf den Dokumenten stehen (Rolle oder Name)' : 'As it should appear on the documents (role or name)', a?.text, 'f-text')}
        ${q.contact ? textField('contact', lang === 'de' ? 'Erreichbar wie?' : 'How to reach them?', a?.contact, 'f-contact') : ''}
        ${q.deputy ? textField('deputy', lang === 'de' ? 'Stellvertretung' : 'Deputy', a?.deputy, 'f-deputy') : ''}`;
    case 'tools': {
      const dep = answers[q.dependsOn];
      const b1 = (dep?.values ?? []).filter((v) => v !== 'none');
      const kindQ = { options: [] };
      return `<div class="sc-stack">${b1.map((kind) => {
        const row = a?.rows?.[kind] ?? { name: '', account: 'unknown' };
        const kindLabel = optionLabel(toolKindQuestion(q, answers), kind, lang);
        return `<fieldset class="tool-row"><legend class="sc-field__label">${esc(kindLabel)}</legend>
          <label class="sc-field"><span class="sc-field__hint">${lang === 'de' ? 'Bezeichnung und Anbieter (optional)' : 'Name and provider (optional)'}</span><input class="sc-field__input" type="text" name="tool_${esc(kind)}_name" id="tool-${esc(kind)}-name" value="${esc(row.name)}"></label>
          <label class="sc-field"><span class="sc-field__hint">${lang === 'de' ? 'Kontoart' : 'Account kind'}</span><select class="sc-field__input" name="tool_${esc(kind)}_account" id="tool-${esc(kind)}-account">${q.accounts.map((o) => `<option value="${esc(o.v)}" ${row.account === o.v ? 'selected' : ''}>${L(o)}</option>`).join('')}</select></label>
        </fieldset>`;
      }).join('')}</div>`;
    }
    default: return '';
  }
}

function toolKindQuestion(q, answers) {
  // B2 reads the option labels of B1 for its headings.
  return q._kindQuestion ?? q;
}

export function attachKindQuestion(def) {
  for (const block of def.blocks) for (const q of block.questions) if (q.type === 'tools') {
    const dep = def.blocks.flatMap((b) => b.questions).find((x) => x.id === q.dependsOn);
    q._kindQuestion = dep;
  }
  return def;
}
