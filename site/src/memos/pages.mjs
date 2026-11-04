// The pages of the memo generators: the index, the questions of one memo, and the result with the memo itself and the email form.
import { config } from '../config.mjs';
import { p, t } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { toHtml } from '../toolkit/documents/blocks.mjs';
import { fmtDate } from '../toolkit/documents/policy.mjs';
import { PRODUCTS } from '../shop/products.mjs';
import { TOOLKITS } from '../toolkit/registry.mjs';
import { MEMOS } from './index.mjs';
import { L, asks, answersQuery } from './shared.mjs';
import { toolNav, workspaceHead } from '../pages/tools.mjs';

const T = {
  en: {
    index: {
      title: 'Memo generators', description: 'Four free memo generators: NIS2, labelling under Article 50 of the AI Act, sign-in security, where to start with AI rules. A few questions, then a dated memo with sources for your business, sent as PDF.',
      kicker: 'Free memos', lead: 'A few questions, then a dated memo for your business: what applies, since when, what to do next, every statement with its source and retrieval date. You read the result here; the PDF comes by email.',
      open: 'Start', questions: (min, max) => (min === max ? `${max} questions` : `${min} to ${max} questions`), tools: 'The two mini tools for your staff', toolsText: 'Run in the browser and send nothing.',
    },
    form: { kicker: 'Memo generator', create: 'Create the memo', optional: 'optional', incomplete: 'Please answer every question marked with an asterisk.', required: 'required', sources: 'Sources checked', howText: 'Your answers travel only in the address of the result page; nothing is stored for a memo you only read. The memo appears on the next page; the PDF comes by email if you ask for it.' },
    result: {
      kicker: 'Your memo', edit: 'Change the answers', pdfH: 'Keep the memo', pdfText: 'Get this memo as a dated PDF by email, with every source and the next steps. We send it once; no newsletter.',
      emailLabel: 'Email address', consent: 'I agree that Scutoria stores my address, the memo and its result to send this memo once. Details in the privacy notice.', waitlist: 'Also tell me once when the next toolkit is available.',
      send: 'Send the memo as PDF', sent: 'The memo is on its way. Check your inbox and, if nothing arrives, the spam folder.', preview: 'Preview: no mail service is configured, so the PDF is here instead.', download: 'Download the PDF', error: 'Please enter a valid email address and tick the consent box.', limit: 'Too many requests for this address. Please try again in an hour.', busy: 'The memo could not be produced right now. Please try again in a minute.',
      nextH: 'What to do next', toolkit: 'The matching toolkit', note: 'Information based on sources, not legal advice. The memo decides nothing on behalf of your business.',
    },
  },
  de: {
    index: {
      title: 'Memo-Generatoren', description: 'Vier freie Memo-Generatoren: NIS2, Kennzeichnung nach Artikel 50 der KI-Verordnung, Sicherheit der Anmeldung, wo mit KI-Regeln anfangen. Ein paar Fragen, dann ein datiertes Memo mit Quellen für Ihren Betrieb, als PDF zugesandt.',
      kicker: 'Freie Memos', lead: 'Ein paar Fragen, dann ein datiertes Memo für Ihren Betrieb: was gilt, seit wann, was als Nächstes zu tun ist, jede Aussage mit Quelle und Abrufdatum. Das Ergebnis lesen Sie hier; das PDF kommt per E-Mail.',
      open: 'Starten', questions: (min, max) => (min === max ? `${max} Fragen` : `${min} bis ${max} Fragen`), tools: 'Die zwei Mini-Tools für Ihre Belegschaft', toolsText: 'Laufen im Browser und senden nichts.',
    },
    form: { kicker: 'Memo-Generator', create: 'Memo erstellen', optional: 'freiwillig', incomplete: 'Bitte jede mit Stern markierte Frage beantworten.', required: 'Pflichtfeld', sources: 'Quellen geprüft', howText: 'Ihre Antworten stehen nur in der Adresse der Ergebnisseite; für ein Memo, das Sie nur lesen, wird nichts gespeichert. Das Memo erscheint auf der nächsten Seite; das PDF kommt per E-Mail, wenn Sie es anfordern.' },
    result: {
      kicker: 'Ihr Memo', edit: 'Antworten ändern', pdfH: 'Memo behalten', pdfText: 'Dieses Memo als datiertes PDF per E-Mail, mit allen Quellen und den nächsten Schritten. Wir senden es einmal; kein Newsletter.',
      emailLabel: 'E-Mail-Adresse', consent: 'Ich bin einverstanden, dass Scutoria meine Adresse, das Memo und sein Ergebnis speichert, um dieses Memo einmal zu senden. Einzelheiten in der Datenschutzerklärung.', waitlist: 'Außerdem einmal Bescheid geben, wenn das nächste Toolkit erhältlich ist.',
      send: 'Memo als PDF senden', sent: 'Das Memo ist unterwegs. Prüfen Sie Ihren Posteingang und, wenn nichts ankommt, den Spam-Ordner.', preview: 'Vorschau: Es ist kein Mailversand eingerichtet, deshalb steht das PDF hier.', download: 'PDF herunterladen', error: 'Bitte eine gültige E-Mail-Adresse eingeben und die Einwilligung ankreuzen.', limit: 'Zu viele Anfragen für diese Adresse. Bitte in einer Stunde noch einmal versuchen.', busy: 'Das Memo konnte gerade nicht erzeugt werden. Bitte in einer Minute noch einmal versuchen.',
      nextH: 'Was als Nächstes zu tun ist', toolkit: 'Das passende Toolkit', note: 'Information auf Quellenbasis, keine Rechtsberatung. Das Memo entscheidet nichts anstelle Ihres Betriebs.',
    },
  },
};

const lightHtml = (level) => `<div class="light light--${esc(level)}" aria-hidden="true"><span class="light__lamp light__lamp--red"></span><span class="light__lamp light__lamp--amber"></span><span class="light__lamp light__lamp--green"></span></div>`;

// The toolkit a memo points to: its product page where it is for sale, otherwise the waiting list.
const toolkitLink = (memo, lang) => {
  const tk = TOOLKITS.find((k) => k.line === memo.toolkit && k.forSale);
  const pr = tk ? PRODUCTS[tk.id] : null;
  if (pr) return `<a href="${pr.path[lang]}">${esc(pr.name[lang])}</a>`;
  const line = t(lang).home.lines.find((l) => l.key === memo.toolkit);
  return `<a href="${p('home', lang)}#access">${esc(line?.title ?? '')}</a> <span class="small muted">${esc(lang === 'de' ? 'in Vorbereitung, Warteliste' : 'in preparation, waiting list')}</span>`;
};

export function memosIndexPage(lang) {
  const s = T[lang].index;
  const cards = MEMOS.map((m, i) => `
      <article class="cine-tool reveal reveal--${(i % 4) + 1}">
        <p class="kicker">${esc(s.questions(m.questions.filter((q) => q.type !== 'text' && !q.when).length, m.questions.filter((q) => q.type !== 'text').length))} · ${esc(lang === 'de' ? 'PDF per E-Mail' : 'PDF by email')}</p>
        <h2 class="heading">${esc(m.title[lang])}</h2>
        <p class="body muted">${esc(m.teaser[lang])}</p>
        <div class="sc-row"><a class="sc-btn" href="${p(m.pathKey, lang)}">${esc(s.open)}</a></div>
      </article>`).join('');
  const body = `
<section class="wrap cine-pagehead">
  <p class="kicker">${esc(s.kicker)}</p>
  <h1 class="display">${esc(s.title)}</h1>
  <p class="lead">${esc(s.lead)}</p>
</section>
<section class="wrap section">
  <div class="cine-tools cine-tools--memos">${cards}</div>
  <p class="body muted">${esc(s.tools)} <a href="${p('tools', lang)}">${esc(t(lang).nav.tools)}</a>. ${esc(s.toolsText)}</p>
</section>`;
  return layout({ lang, title: s.title, description: s.description, body, alt: { en: p('memos', 'en'), de: p('memos', 'de') }, section: 'tools' });
}

function questionHtml(q, lang, answers, s) {
  const req = q.required !== false && q.type !== 'text';
  const hint = q.hint?.[lang] ? `<p class="small muted">${esc(q.hint[lang])}</p>` : '';
  const legend = `<legend class="heading">${esc(q.label[lang])}${req ? ' <span class="amber" aria-label="' + esc(s.required) + '">*</span>' : ` <span class="small muted">(${esc(s.optional)})</span>`}</legend>`;
  if (q.type === 'text') {
    return `<fieldset class="tool__q">${legend}${hint}<label class="sc-field"><span class="sc-field__label">${esc(q.label[lang])}</span><input class="sc-field__input" type="text" name="${esc(q.key)}" maxlength="80" value="${esc(answers[q.key] ?? '')}" autocomplete="organization"></label></fieldset>`;
  }
  const type = q.type === 'checks' ? 'checkbox' : 'radio';
  const chosen = (v) => (q.type === 'checks' ? Array.isArray(answers[q.key]) && answers[q.key].includes(v) : answers[q.key] === v);
  const opts = q.options.map((o) => `<label class="sc-option"><input type="${type}" name="${esc(q.key)}" value="${esc(o.v)}"${chosen(o.v) ? ' checked' : ''}><span class="sc-option__dot${type === 'checkbox' ? ' sc-option__dot--box' : ''}"></span><span><span class="sc-option__title">${esc(o.label[lang])}</span>${o.hint?.[lang] ? `<span class="sc-option__hint">${esc(o.hint[lang])}</span>` : ''}</span></label>`).join('');
  return `<fieldset class="tool__q">${legend}${hint}<div class="sc-options">${opts}</div></fieldset>`;
}

export function memoFormPage(memo, lang, { answers = {}, m = '' } = {}) {
  const s = T[lang].form;
  const path = p(memo.pathKey, lang);
  const notice = m === 'incomplete' ? `<div class="notice notice--error">${esc(s.incomplete)}</div>` : '';
  const body = `
<section class="wrap cine-toolpage">
  ${toolNav(lang, memo.pathKey)}
  <div class="cine-workspace">
  ${workspaceHead(s.kicker, memo.title[lang], memo.lead[lang])}
  <div class="cine-workspace__body">
  <form class="tool__form memo__form" method="get" action="${path}/memo">
    ${notice}
    ${memo.questions.filter((q) => q.key !== 'business').map((q) => questionHtml(q, lang, answers, s)).join('')}
    <div class="sc-row"><button class="sc-btn" type="submit">${esc(s.create)}</button></div>
    <p class="small muted">${esc(s.howText)} ${esc(s.sources)}: ${esc(fmtDate(memo.sourcesDate, lang))}${memo.sourcesUpdated ? `; ${esc(lang === 'de' ? 'berichtigte Stellen' : 'corrected points')} ${esc(fmtDate(memo.sourcesUpdated, lang))}` : ''}.</p>
  </form>
  </div>
  </div>
</section>`;
  return layout({ lang, title: memo.title[lang], description: memo.description[lang], body, alt: { en: p(memo.pathKey, 'en'), de: p(memo.pathKey, 'de') }, section: 'tools' });
}

export function memoResultPage(memo, lang, answers, result, { m = '', email = '', pdfLink = null } = {}) {
  const s = T[lang].result;
  const path = p(memo.pathKey, lang);
  const query = answersQuery(memo, answers);
  const hidden = memo.questions.filter((q) => q.key !== 'business' && answers[q.key] != null && asks(q, answers)).map((q) => (Array.isArray(answers[q.key]) ? answers[q.key] : [answers[q.key]]).map((v) => `<input type="hidden" name="${esc(q.key)}" value="${esc(v)}">`).join('')).join('');
  let notice = '';
  if (m === 'sent') notice = `<div class="notice notice--ok">${esc(s.sent)}</div>`;
  if (m === 'preview') notice = `<div class="notice notice--ok">${esc(s.preview)}${pdfLink ? ` <a href="${esc(pdfLink)}">${esc(s.download)}</a>` : ''}</div>`;
  if (m === 'error') notice = `<div class="notice notice--error">${esc(s.error)}</div>`;
  if (m === 'limit') notice = `<div class="notice notice--error">${esc(s.limit)}</div>`;
  if (m === 'busy') notice = `<div class="notice notice--error">${esc(s.busy)}</div>`;
  const form = m === 'sent' || m === 'preview' ? notice : `
      <form method="post" action="${path}/send" class="memo__sendform">
        ${notice}
        ${hidden}
        <label class="sc-field"><span class="sc-field__label">${lang === 'de' ? 'Name des Betriebs auf dem PDF (freiwillig)' : 'Name of the business on the PDF (optional)'}</span><input class="sc-field__input" type="text" name="business" maxlength="80" autocomplete="organization"></label>
        <label class="sc-field"><span class="sc-field__label">${esc(s.emailLabel)}</span><input class="sc-field__input" type="email" name="email" required autocomplete="email" inputmode="email" value="${esc(email)}"></label>
        <label class="wait__consent"><input type="checkbox" name="consent" value="yes" required><span>${esc(s.consent)}</span></label>
        <label class="wait__consent"><input type="checkbox" name="waitlist" value="yes"><span>${esc(s.waitlist)}</span></label>
        <div><button class="sc-btn" type="submit">${esc(s.send)}</button></div>
      </form>`;
  const body = `
<section class="wrap cine-toolpage">
  ${toolNav(lang, memo.pathKey)}
  <div class="cine-workspace">
  <div class="cine-workspace__head memo__head">
    <p class="kicker">${esc(s.kicker)} · ${esc(fmtDate(result.date, lang))}</p>
    <h1 class="title">${esc(memo.title[lang])}</h1>
    <div class="memo__verdict">${lightHtml(result.level)}<div><p class="heading">${esc(result.title)}</p><p class="body muted">${esc(result.text)}</p></div></div>
    <div class="sc-row"><a class="sc-btn sc-btn--secondary sc-btn--small" href="${path}?${esc(query)}">${esc(s.edit)}</a></div>
  </div>
  <div class="cine-workspace__body">
  <div class="memo__grid">
    <aside class="memo__send">
      <div class="label muted">${esc(s.pdfH)}</div>
      <p class="body">${esc(s.pdfText)}</p>
      ${form}
      <div class="label muted">${esc(s.toolkit)}</div>
      <p class="body">${toolkitLink(memo, lang)}</p>
      <p class="small muted">${esc(s.note)}</p>
    </aside>
    <div class="docwrap memo__doc" data-theme="paper">${toHtml(result.doc).replace(/<h1\b/g, '<h2').replace(/<\/h1>/g, '</h2>')}</div>
  </div>
  </div>
  </div>
</section>`;
  const title = `${memo.title[lang]} · ${lang === 'de' ? 'Memo' : 'Memo'}`;
  return layout({ lang, title, description: memo.description[lang], body, alt: { en: `${p(memo.pathKey, 'en')}/memo?${query}`, de: `${p(memo.pathKey, 'de')}/memo?${query}` }, noindex: true, section: 'tools' });
}

export const memoMail = (memo, lang, result, link) => {
  const x = L(lang);
  const steps = result.steps.slice(0, 3).map((st, i) => `${i + 1}. ${st}`).join('\n');
  const subject = x(`Your memo: ${memo.title.en}`, `Ihr Memo: ${memo.title.de}`);
  const text = x(
    `Here is your memo "${memo.title.en}" of ${fmtDate(result.date, 'en')}, attached as PDF.\n\nResult: ${result.title}\n${result.text}\n\nThe first steps:\n${steps}\n\nThe memo on the web, with the same answers:\n${link}\n\nThe memo is information based on the sources it lists, not legal advice. We sent it once because you asked for it; your address, the memo and its result are stored only for this. Details in the privacy notice.\n\nScutoria\n${config.brand.email}`,
    `Hier ist Ihr Memo „${memo.title.de}“ vom ${fmtDate(result.date, 'de')}, als PDF angehängt.\n\nErgebnis: ${result.title}\n${result.text}\n\nDie ersten Schritte:\n${steps}\n\nDas Memo im Web, mit denselben Antworten:\n${link}\n\nDas Memo ist eine Information auf Grundlage der genannten Quellen, keine Rechtsberatung. Wir haben es einmal gesendet, weil Sie es angefordert haben; Ihre Adresse, das Memo und sein Ergebnis sind nur dafür gespeichert. Einzelheiten in der Datenschutzerklärung.\n\nScutoria\n${config.brand.email}`,
  );
  return { subject, text };
};
