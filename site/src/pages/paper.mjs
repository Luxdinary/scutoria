// The Paper component: one white sheet on the dark site, used wherever a document is promised. Three sizes: the hero sheet
// (a real A4 proportion, 2 degrees off axis, with the edge of a second sheet behind it), the sample thumbs (linked) and the
// miniatures inside the "how it works" pictures. Every line on a sheet is a real line of the example business's documents
// (policy.mjs, evidence.mjs) or of the handbook; nothing is drafted here. The sheet is wrapped in the paper theme so that it
// reads as paper on the dark ground and keeps the paper values of ink, hairline and the markers. Decorative sheets are hidden
// from assistive technology; a linked thumb carries its title as the link text.
import { esc } from '../layout.mjs';

const T = {
  en: {
    example: 'Example', foot: 'Source-based. No legal advice.', marks: ['Fact', 'Interpretation', 'Uncertain', 'Gap'],
    // The poster's own first heading (poster.mjs) and the status words of the evidence summary.
    poster: 'In doubt: enter nothing, ask.',
    status: { ok: 'in place', warn: 'partly', open: 'not yet' },
    policy: {
      // The purpose paragraph is the policy's own fixed wording (policy.mjs, purpose without further groups).
      d1: { code: 'AP-2026-MUSTER · D1', date: '2026-10-19', title: 'AI usage policy of Example Electrical Ltd', sub: 'In force from 19 October 2026 · version 1',
        lead: 'This policy governs whether, under which conditions and for which purposes AI tools are used for work in this business. The business is the deployer of the tools used; the individual acts on its behalf. It applies to all employees.',
        lines: [['§ 1', 'Permitted tools and access', 'Use takes place through the access provided by the business.'], ['§ 2', 'Permitted and prohibited uses', 'Selection, assessment and termination are not based on an AI result.'], ['§ 3', 'Prohibited inputs', 'In case of doubt nothing is entered.']],
        sign: 'Place, date, signature of the management' },
      // The example's evidence summary rows (evidence.mjs items) with their states.
      d7: { rows: [['AI usage policy, nine sections', 'ok'], ['The one page to post', 'ok'], ['Tool register, four tools', 'ok'], ['Briefing record', 'warn'], ['Labelling checklist', 'open']] },
    },
    security: {
      // The self-declaration's own fixed sentences (self-declaration.mjs); the section titles are its real section titles.
      d1: { code: 'SE-2026-MUSTER · D1', date: '2026-10-19', title: 'Security self-declaration of Example Electrical Ltd', sub: 'State as of 19 October 2026 · for the questionnaire of a customer',
        lead: 'Every field uses one of four answers: in place, partly, not yet with a target date, or not applicable with the reason. An honest "not yet" with a date is a complete answer.',
        lines: [['A', 'Business and role', ''], ['C', 'Access and identities', ''], ['F', 'Incidents and reporting', '']],
        sign: 'Signed for the business (management)' },
      d7: { rows: [['C · Access and identities', 'warn'], ['D · Backup and continuity', 'open'], ['E · Updates and devices', 'ok'], ['G · People and training', 'warn'], ['Emergency card', 'ok']] },
    },
  },
  de: {
    example: 'Beispiel', foot: 'Quellenbasiert. Keine Rechtsberatung.', marks: ['Fakt', 'Auslegung', 'Unsicher', 'Lücke'],
    poster: 'Im Zweifel: nichts eingeben, sondern fragen.',
    status: { ok: 'vorhanden', warn: 'teilweise', open: 'noch nicht' },
    policy: {
      d1: { code: 'AP-2026-MUSTER · D1', date: '2026-10-19', title: 'KI-Nutzungsrichtlinie der Muster Elektrotechnik e.U.', sub: 'In Kraft ab 19. Oktober 2026 · Fassung 1',
        lead: 'Diese Richtlinie regelt, ob, unter welchen Voraussetzungen und zu welchen Zwecken KI-Tools im Betrieb dienstlich eingesetzt werden. Der Betrieb ist Betreiber der eingesetzten Tools; die einzelne Person handelt in seinem Auftrag. Sie gilt für alle Beschäftigten.',
        lines: [['§ 1', 'Zugelassene Tools und Zugänge', 'Die Nutzung erfolgt über den vom Betrieb bereitgestellten Zugang.'], ['§ 2', 'Zulässige und unzulässige Verwendungen', 'Auswahl, Beurteilung und Beendigung werden nicht auf ein KI-Ergebnis gestützt.'], ['§ 3', 'Unzulässige Eingaben', 'Im Zweifel wird nichts eingegeben.']],
        sign: 'Ort, Datum, Unterschrift der Leitung' },
      d7: { rows: [['KI-Nutzungsrichtlinie, neun Paragrafen', 'ok'], ['Die eine Seite zum Aushängen', 'ok'], ['Tool-Register, vier Tools', 'ok'], ['Schulungsnachweis', 'warn'], ['Kennzeichnungs-Checkliste', 'open']] },
    },
    security: {
      d1: { code: 'SE-2026-MUSTER · D1', date: '2026-10-19', title: 'Selbstauskunft der Muster Elektrotechnik e.U.', sub: 'Stand 19. Oktober 2026 · für den Fragebogen eines Kunden',
        lead: 'Jedes Feld trägt eine von vier Antworten: vorhanden, teilweise, noch nicht mit Termin, oder nicht anwendbar mit Grund. Ein ehrliches „noch nicht“ mit Termin ist eine vollständige Antwort.',
        lines: [['A', 'Betrieb und Rolle', ''], ['C', 'Zugang und Identität', ''], ['F', 'Vorfälle und Meldung', '']],
        sign: 'Unterschrift für den Betrieb (Leitung)' },
      d7: { rows: [['C · Zugang und Identität', 'warn'], ['D · Sicherung und Wiederanlauf', 'open'], ['E · Updates und Geräte', 'ok'], ['G · Personal und Schulung', 'warn'], ['Notfallkarte', 'ok']] },
    },
  },
};

// With stamp, the date line presses in once like a rubber stamp when the sheet comes into view (E23: "dated" made visible).
const run = (left, right, stamp = false) => `<div class="paper__run"><span>${esc(left)}</span><span${stamp ? ' class="paper__stamp"' : ''}>${esc(right)}</span></div>`;

// The four markers as index tabs on a sheet's right edge (shape and name, never colour alone).
export const markerTabs = (lang) => {
  const t = T[lang] ?? T.en;
  return `<div class="paper__tabs">${['fact', 'interpretation', 'uncertain', 'gap'].map((c, i) => `<span class="paper__tab sc-mk--${c}"><i class="sc-mk__shape"></i>${esc(t.marks[i])}</span>`).join('')}</div>`;
};

// The hero sheet of a line ('policy' | 'security'): D1 of the example business, with the edge of a second sheet behind it.
// With tabs, the four markers sit on the sheet's right edge like index tabs of a folder (shape and name, never colour alone).
export function paperHero(lang, line = 'policy', { tabs = false } = {}) {
  const t = T[lang] ?? T.en;
  const d = (t[line] ?? t.policy).d1;
  const tabRow = tabs ? markerTabs(lang) : '';
  return `<div class="paperset paperset--hero" aria-hidden="true">${tabRow}
  <div class="paper paper--hero" data-theme="paper">
    ${run(d.code, `${d.date} · ${t.example}`, true)}
    <div class="paper__title">${esc(d.title)}</div>
    <div class="paper__sub">${esc(d.sub)}</div>
    <hr class="paper__rule">
    ${d.lead ? `<p class="paper__lead">${esc(d.lead)}</p>` : ''}
    <dl class="paper__lines">${d.lines.map(([n, h, text]) => `<div class="paper__line"><dt><span class="paper__num">${esc(n)}</span>${esc(h)}</dt>${text ? `<dd>${esc(text)}</dd>` : ''}</div>`).join('')}</dl>
    <div class="paper__sign">${esc(d.sign)}</div>
    <div class="paper__foot"><span>${esc(t.foot)}</span><span>${esc(d.code.split(' · ')[0])}</span></div>
  </div>
</div>`;
}

// One sheet of the hero slide stack (E23): the policy, the one page to post (folded corner), the tool register (ruled
// lines) or the evidence summary (paper clip). Every visible string is an existing string of the example business.
export function paperSheet(lang, line = 'policy', kind = 'policy', sample = null) {
  const t = T[lang] ?? T.en;
  const doc = t[line] ?? t.policy;
  const d = doc.d1;
  const code = d.code.replace('D1', { policy: 'D1', poster: 'D2', register: 'D3', evidence: 'D7' }[kind] ?? 'D1');
  const head = run(code, `${d.date} · ${t.example}`, true);
  const foot = `<div class="paper__foot"><span>${esc(t.foot)}</span><span>${esc(code.split(' · ')[0])}</span></div>`;
  let body = '';
  if (kind === 'policy') {
    body = `<div class="paper__title">${esc(d.title)}</div><div class="paper__sub">${esc(d.sub)}</div><hr class="paper__rule"><p class="paper__lead">${esc(d.lead)}</p><dl class="paper__lines">${d.lines.map(([n, h, text]) => `<div class="paper__line"><dt><span class="paper__num">${esc(n)}</span>${esc(h)}</dt>${text ? `<dd>${esc(text)}</dd>` : ''}</div>`).join('')}</dl><div class="paper__sign">${esc(d.sign)}</div>`;
  } else {
    // D2, D3, D7 carry the content of their own sample sheet (title, drawn body, card sentence), never lines of D1.
    const mini = { poster: 'poster', register: 'table', evidence: 'status' }[kind];
    const [, title = '', text = ''] = sample ?? [];
    body = `${title ? `<div class="paper__title">${esc(title)}</div>` : ''}<div class="mini mini--${mini}"${mini === 'status' ? '' : ' aria-hidden="true"'}>${miniBlock(lang, line, mini)}</div>${text ? `<p class="paper__body">${esc(text)}</p>` : ''}`;
  }
  return `<div class="paper paper--hero paper--${esc(kind)}${kind === 'poster' ? ' paper--fold' : ''}" data-theme="paper">${kind === 'evidence' ? '<i class="paper__clip" aria-hidden="true"></i>' : ''}${head}${body}${foot}</div>`;
}

// A linked sample thumb: a small sheet with the real title of the file; the whole sheet is the link. kind: 'doc' | 'handbook'.
export function paperThumb(lang, { href, title, code, meta = '', kind = 'doc', slide = '' }) {
  const t = T[lang] ?? T.en;
  const marks = kind === 'handbook' ? `<div class="paper__marks">${['fact', 'interpretation', 'uncertain', 'gap'].map((c) => `<i class="sc-mk sc-mk--${c}"><i class="sc-mk__shape"></i></i>`).join('')}</div>` : '';
  const body = kind === 'handbook'
    ? `${marks}<div class="paper__fill paper__fill--text"><i></i><i></i><i></i><i></i><i></i></div>`
    : `<div class="paper__fill"><i></i><i></i><i></i></div><div class="paper__fill paper__fill--short"><i></i><i></i></div>`;
  // In a carousel the slide label sits on a wrapper group, so the link keeps its own name (the document title).
  const link = `<a class="paperset paperset--thumb${kind === 'handbook' ? ' paperset--stack' : ''}" href="${esc(href)}">
  <span class="paper paper--thumb" data-theme="paper">
    ${run(code, t.example)}
    <span class="paper__title">${esc(title)}</span>
    ${body}
    <span class="paper__foot"><span>${esc(meta || t.foot)}</span></span>
  </span>
</a>`;
  return slide ? `<div class="carousel__slide" data-slide role="group" aria-roledescription="slide" aria-label="${esc(slide)}">${link}</div>` : link;
}

// The drawn body of a sample sheet by kind (shared by the product page miniatures and the hero stack).
export function miniBlock(lang, line = 'policy', kind = 'paragraphs') {
  const t = T[lang] ?? T.en;
  const doc = t[line] ?? t.policy;
  const dot = (st) => `<span class="mini__dot mini__dot--${st}"></span>`;
  const bars = (n, short = []) => Array.from({ length: n }, (_, i) => `<i${short.includes(i) ? ' class="mini__s"' : ''}></i>`).join('');
  const blocks = {
    paragraphs: () => doc.d1.lines.slice(0, 2).map(([n, h]) => `<div class="mini__h"><span class="paper__num">${esc(n)}</span>${esc(h)}</div>${bars(2, [1])}`).join(''),
    poster: () => `<div class="mini__big">${esc(t.poster)}</div>${bars(2, [1])}<div class="mini__sig"></div>`,
    table: () => `<div class="mini__tr mini__tr--head"><i></i><i></i><i></i></div>${'<div class="mini__tr"><i></i><i></i><i></i></div>'.repeat(3)}`,
    list: () => '<div class="mini__li"><b></b><i></i></div>'.repeat(4),
    checks: () => '<div class="mini__ck"><b></b><i></i></div>'.repeat(4),
    dated: () => '<div class="mini__dt"><b></b><i></i></div>'.repeat(4),
    status: () => doc.d7.rows.slice(0, 4).map(([label, st]) => `<div class="mini__st">${dot(st)}<span>${esc(label)}</span><span class="mini__state">${esc(t.status[st])}</span></div>`).join(''),
    form: () => ['ok', 'warn', 'open', 'ok'].map((st) => `<div class="mini__fr"><i></i><span class="mini__state">${dot(st)}${esc(t.status[st])}</span></div>`).join(''),
    letter: () => `<div class="mini__addr">${bars(3, [1, 2])}</div>${bars(4, [2])}`,
    card: () => `<div class="mini__grid">${'<div class="mini__box"><b></b><i></i><i class="mini__s"></i></div>'.repeat(4)}</div>`,
    handbook: () => `<div class="paper__marks">${['fact', 'interpretation', 'uncertain', 'gap'].map((c) => `<i class="sc-mk sc-mk--${c}"><i class="sc-mk__shape"></i></i>`).join('')}</div>${bars(5, [2, 4])}`,
  };
  return (blocks[kind] ?? blocks.paragraphs)();
}

// A document miniature on the product page: the same sheet, one per document, varied by the kind of document. The title and the
// card sentence are real text (the sentence is truncated visually, not in the markup); the body of the sheet is drawn as
// bars, rows, boxes and lamps and hidden from assistive technology. Kinds: paragraphs (a policy), poster (one sentence and a
// signature), table (three rows), list (an attendance list), checks (check rows), dated (four dated lines), status (status
// rows with lamps), form (fields with the four honest answers), letter (address block and paragraphs), card (four boxes),
// handbook (a stack, the marker row, the page count).
export function paperMini(lang, { code, fmts, title, text, kind = 'paragraphs', index = 1, total = 8, line = 'policy', pages = '' }) {
  const t = T[lang] ?? T.en;
  const doc = t[line] ?? t.policy;
  const nn = (n) => String(n).padStart(2, '0');
  const block = miniBlock(lang, line, kind);
  return `<article class="paperset paperset--mini${kind === 'handbook' ? ' paperset--stack' : ''}" id="doc-${esc(code)}-${index}">
  <div class="paper paper--mini${kind === 'poster' ? ' paper--fold' : ''}" data-theme="paper">
    ${kind === 'status' ? '<i class="paper__clip" aria-hidden="true"></i>' : ''}
    ${run(`${code} · ${fmts}`, `${nn(index)} / ${nn(total)}`)}
    <h3 class="paper__title">${esc(title)}</h3>
    <div class="mini mini--${esc(kind)}" aria-hidden="true">${block}</div>
    <p class="paper__body">${esc(text)}</p>
    <div class="paper__foot"><span>${esc(pages || t.foot)}</span>${pages ? `<span>${esc(t.foot)}</span>` : ''}</div>
  </div>
</article>`;
}

// The three pictures of "how it works", drawn in CSS: a question list becoming a sheet; three file corners and the ZIP;
// a posted sheet with a signature line. Shared by the home page and the product pages.
export const stepPictures = () => [
  `<div class="pic pic--list"><div class="pic__list"><div class="pic__row"><i class="pic__dot pic__dot--on"></i><i class="pic__bar"></i></div><div class="pic__row"><i class="pic__dot pic__dot--on"></i><i class="pic__bar pic__bar--short"></i></div><div class="pic__row"><i class="pic__dot"></i><i class="pic__bar"></i></div></div><i class="pic__arrow"></i><div class="pic__sheet"><i></i><i></i><i></i><i></i></div></div>`,
  `<div class="pic pic--files"><div class="pic__files"><div class="pic__file">PDF</div><div class="pic__file">DOCX</div><div class="pic__file">XLSX</div></div><span class="pic__zip">ZIP</span></div>`,
  `<div class="pic pic--post"><div class="pic__post"><i class="pic__tape"></i><i></i><i></i><i></i><span class="pic__sig"></span></div></div>`,
];

// Two fictional lines for the "anything personal" preview, obviously fake: the placeholders are the tool's own words.
export const PERSONAL_PREVIEW = {
  en: ['Call [NAME] about the offer, [EMAIL], site visit on [DATE].', 'Invoice [REFERENCE NO] for [NAME], [ADDRESS].'],
  de: ['[NAME] wegen des Angebots anrufen, [E-MAIL], Besichtigung am [DATUM].', 'Rechnung [NUMMER] für [NAME], [ADRESSE].'],
};
