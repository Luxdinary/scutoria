// The page of a toolkit that is not for sale yet: what it will contain, and the generator to try in preview mode.
// It replaces the product page until the toolkit has its documents, its handbook and a released price.
import { config } from '../config.mjs';
import { p } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { canStartRun } from '../shop/session.mjs';
import { toolkitBase } from '../toolkit/registry.mjs';
import { startChoices } from '../toolkit/run-ui.mjs';

const T = {
  en: {
    kicker: (nr) => `Toolkit ${nr} · In preparation`,
    previewNote: 'Preview: the questionnaire, the seven documents and the handbook can be tried while the site is in preview mode. The price follows.',
    start: 'Start the generator', handbook: 'Read the handbook', handbookKicker: 'Handbook', soon: 'In preparation', getH: 'What it contains', getText: 'Seven documents and a handbook, generated for your business from your answers to forty-seven questions, all dated. PDF for filing and printing, DOCX and XLSX for editing, everything as one ZIP.',
    howH: 'How it works',
    steps: [['Answer forty-seven questions', 'Start with your business, or look at the example business first. Four honest answers per status question: in place, partly, not yet with a date, not applicable.'], ['Download the documents', 'The self-declaration, the action plan, the emergency card, the evidence list, the cover letter with the questionnaire mapping, the clause checklist and the evidence summary.'], ['Send, post, keep', 'Attach the self-declaration to the questionnaire, post the emergency card, work through the plan, renew once a year.']],
    waitH: 'Hear about it first', waitText: 'One email when the toolkit is available, with its founder price.', waitLink: 'Join the waiting list',
    notFound: 'Nothing here yet.',
  },
  de: {
    kicker: (nr) => `Toolkit ${nr} · In Vorbereitung`,
    previewNote: 'Vorschau: Fragebogen, die sieben Dokumente und das Handbuch lassen sich ausprobieren, solange die Website im Vorschaumodus ist. Der Preis folgt.',
    start: 'Generator starten', handbook: 'Handbuch lesen', handbookKicker: 'Handbuch', soon: 'In Vorbereitung', getH: 'Was es enthält', getText: 'Sieben Dokumente und ein Handbuch, aus Ihren Antworten auf siebenundvierzig Fragen für Ihren Betrieb erzeugt, alle datiert. PDF zum Ablegen und Drucken, DOCX und XLSX zum Bearbeiten, alles als ein ZIP.',
    howH: 'So läuft es',
    steps: [['Siebenundvierzig Fragen beantworten', 'Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst den Beispielbetrieb an. Vier ehrliche Antworten je Statusfrage: vorhanden, teilweise, noch nicht mit Termin, nicht anwendbar.'], ['Dokumente herunterladen', 'Selbstauskunft, Maßnahmenplan, Notfallkarte, Nachweisliste, Antwortschreiben mit Fragebogen-Abgleich, Klausel-Prüfliste und Nachweisseite.'], ['Senden, aushängen, pflegen', 'Die Selbstauskunft dem Fragebogen beilegen, die Notfallkarte aushängen, den Plan abarbeiten, einmal im Jahr erneuern.']],
    waitH: 'Als Erste erfahren', waitText: 'Eine E-Mail, wenn das Toolkit erhältlich ist, mit seinem Gründerpreis.', waitLink: 'Auf die Warteliste',
    notFound: 'Hier liegt noch nichts.',
  },
};

const handbookPathOf = (tk, lang) => `${toolkitBase(tk, lang)}/${lang === 'de' ? 'handbuch' : 'handbook'}`;

export async function previewProductPage(tk, def, lang, { customer = null } = {}) {
  const s = T[lang] ?? T.en;
  const b = toolkitBase(tk, lang);
  const name = def.name[lang] ?? def.name.en;
  const lead = def.lead?.[lang] ?? def.lead?.en ?? '';
  const canStart = await canStartRun(customer, tk.id);
  const hb = tk.handbook ? handbookPathOf(tk, lang) : null;
  const cards = [
    ...tk.docs.map((d) => `
      <article class="sc-card">
        <div class="sc-card__kicker">${esc(d.nr)} · ${esc(lang === 'de' ? 'Vorschau verfügbar' : 'preview available')}</div>
        <h3 class="sc-card__title sc-card__title--s">${esc(d.title[lang] ?? d.title.en)}</h3>
        <p class="sc-card__text">${esc(d.text[lang] ?? d.text.en)}</p>
      </article>`),
    ...tk.planned.map((d) => `
      <article class="sc-card">
        <div class="sc-card__kicker">${esc(d.nr)} · ${esc(s.soon)}</div>
        <h3 class="sc-card__title sc-card__title--s">${esc(d.title[lang] ?? d.title.en)}</h3>
        <p class="sc-card__text">${esc(d.text[lang] ?? d.text.en)}</p>
      </article>`),
    ...(tk.handbook ? [`
      <article class="sc-card">
        <div class="sc-card__kicker">${esc(s.handbookKicker)}</div>
        <h3 class="sc-card__title sc-card__title--s">${esc(s.handbookKicker)}</h3>
        <p class="sc-card__text">${esc(tk.handbookText?.[lang] ?? '')}</p>
        <div class="sc-card__actions"><a class="sc-btn sc-btn--small" href="${hb}">${esc(s.handbook)}</a><a class="sc-btn sc-btn--secondary sc-btn--small" href="${hb}/pdf">PDF</a></div>
      </article>`] : []),
  ].join('');
  const steps = s.steps.map(([h, text], i) => `<li><span class="steps__n">${i + 1}</span><div><h3 class="heading">${esc(h)}</h3><p class="body muted">${esc(text)}</p></div></li>`).join('');
  const body = `
<section class="wrap hero">
  <div class="label muted">${esc(s.kicker(tk.nr))}</div>
  <h1 class="display">${esc(name)}</h1>
  <p class="lead">${esc(lead)}</p>
  ${config.siteMode !== 'live' ? `<p class="small amber">${esc(s.previewNote)}</p>` : ''}
  <div class="sc-row">${canStart ? startChoices(b,lang) : ''}${hb ? `<a class="sc-btn sc-btn--secondary" href="${hb}">${esc(s.handbook)}</a>` : ''}<a class="sc-btn sc-btn--secondary" href="${p('home', lang)}#access">${esc(s.waitLink)}</a></div>
</section>
<section class="wrap section" id="documents">
  <div class="section__head"><h2 class="title">${esc(s.getH)}</h2><p class="body muted">${esc(s.getText)}</p></div>
  <div class="sc-cards">${cards}</div>
</section>
<section class="wrap section" id="how">
  <div class="section__head"><h2 class="title">${esc(s.howH)}</h2></div>
  <ol class="steps">${steps}</ol>
</section>
<section class="wrap section" id="wait">
  <div class="section__head"><h2 class="title">${esc(s.waitH)}</h2><p class="body muted">${esc(s.waitText)}</p></div>
  <div><a class="sc-btn" href="${p('home', lang)}#access">${esc(s.waitLink)}</a></div>
</section>`;
  return layout({ lang, title: name, description: lead, body, alt: { en: toolkitBase(tk, 'en'), de: toolkitBase(tk, 'de') }, noindex: true });
}
