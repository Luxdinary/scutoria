// The product page of a toolkit: what you get, how it works, what it is not, samples, price and licence, questions.
// English first, German in the same file. Nothing here promises compliance; the wording follows the handbook.
// Toolkit 1 sells with a price; a toolkit without a released price shows the same page with "the price follows" and the waiting list.
import { config } from '../config.mjs';
import { p, t } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { PRODUCTS, priceFor, fmtPrice, priceConfigOf } from '../shop/products.mjs';
import { isLicensed, canStartRun } from '../shop/session.mjs';
import { toolkitById, toolkitBase } from '../toolkit/registry.mjs';
import { SECURITY_TEXTS, SECURITY_SAMPLES } from './product-security.mjs';
import { heroStage } from './cover.mjs';
import { paperThumb, paperMini, stepPictures } from './paper.mjs';
import { startChoices } from '../toolkit/run-ui.mjs';
import { CINEMA, L } from '../cinema.mjs';
import { TOOL_TEXTS } from './tools.mjs';
import { MEMOS } from '../memos/index.mjs';

// "Goes with": the tool and the studio behind each toolkit (Sapphire Cinema, 3 November 2026). Labels are the existing ones.
const RELATED = { 'ai-policy': { toolKey: 'toolIn', toolTitle: (lang) => (TOOL_TEXTS[lang] ?? TOOL_TEXTS.en).in.title }, 'security-evidence': { toolKey: 'memoLogin', toolTitle: (lang) => MEMOS.find((m) => m.pathKey === 'memoLogin')?.title[lang] ?? '' } };

// The kind of miniature per document (paper.mjs paperMini), and the published page counts of the handbooks.
const KINDS = {
  'ai-policy': { D1: 'paragraphs', D2: 'poster', D3: 'table', D4: 'list', D5: 'checks', D6: 'dated', D7: 'status', HB: 'handbook' },
  'security-evidence': { D1: 'form', D2: 'dated', D3: 'card', D4: 'table', D5: 'letter', D6: 'checks', D7: 'status', HB: 'handbook' },
};
const PAGES = { 'ai-policy': { en: '24 pages', de: '26 Seiten' }, 'security-evidence': { en: '37 pages', de: '40 Seiten' } };

export const handbookPathOf = (product, lang) => `${product.path[lang]}/${lang === 'de' ? 'handbuch' : 'handbook'}`;
const handbookOf = (tk, lang) => `${toolkitBase(tk, lang)}/${lang === 'de' ? 'handbuch' : 'handbook'}`;

// The samples (E35, 3 November 2026): one page from each of four documents of the example business, built by
// scripts/leseproben.mjs, and the handbook's reading sample; an entry without a file links to the handbook page.
const SAMPLES = {
  'ai-policy': {
    en: [
      { label: 'AI usage policy', file: 'sample-d1-policy-en.pdf', code: 'D1', meta: 'Page 1 of 3' },
      { label: 'The one page to post', file: 'sample-d2-poster-en.pdf', code: 'D2', meta: '1 page' },
      { label: 'Labelling checklist', file: 'sample-d5-labelling-en.pdf', code: 'D5', meta: 'Page 1 of 4' },
      { label: 'Evidence summary', file: 'sample-d7-evidence-en.pdf', code: 'D7', meta: '1 page' },
      { label: 'Handbook', code: 'HB', meta: '4 of 24 pages' },
    ],
    de: [
      { label: 'KI-Nutzungsrichtlinie', file: 'leseprobe-d1-richtlinie-de.pdf', code: 'D1', meta: 'Seite 1 von 3' },
      { label: 'Die eine Seite zum Aushängen', file: 'leseprobe-d2-aushang-de.pdf', code: 'D2', meta: '1 Seite' },
      { label: 'Kennzeichnungs-Checkliste', file: 'leseprobe-d5-kennzeichnung-de.pdf', code: 'D5', meta: 'Seite 1 von 4' },
      { label: 'Nachweisseite', file: 'leseprobe-d7-nachweis-de.pdf', code: 'D7', meta: '1 Seite' },
      { label: 'Handbuch', code: 'HB', meta: '4 von 26 Seiten' },
    ],
  },
  'security-evidence': SECURITY_SAMPLES,
};

// Shared wording of every product page: buttons, notices, price box, licence facts.
const COMMON = {
  en: {
    buy: 'Buy annual licence', start: 'Start the generator', handbook: 'Read the handbook', handbookSample: 'Read the sample', sampleWord: 'Sample', signIn: 'Sign in', account: 'Account', wait: 'Join the waiting list',
    preview: 'Preview: the generator runs without a licence while the site is in preview mode.',
    cancelled: 'The purchase was cancelled. Nothing was charged.',
    getH: 'What you get', getText: 'Seven documents and a handbook, all generated for your business, all dated. PDF for filing and printing, DOCX and XLSX for editing, everything as one ZIP.',
    howH: 'How it works', honestH: 'What it is, and what it is not', marks: ['Fact', 'Interpretation', 'Uncertain', 'Gap'],
    samplesH: 'See it before you buy',
    priceH: 'Price and licence',
    priceSoonTitle: 'The price follows', priceSoon: 'The toolkit is being finished. Like every Scutoria toolkit it will cost 99 euro a year; the generator can be tried in preview. One email when it is available.',
    facts: [
      'One licence covers one business and its staff. Adapt the documents, use them internally, show them to customers, insurers and authorities.',
      'Twelve months from purchase, no automatic renewal. A reminder before the end; renewal is a new purchase.',
      'Payment through Stripe: card and the methods offered for your country. Invoice by email; a VAT ID can be entered at checkout.',
      'Access starts immediately after payment, with your consent at checkout. Businesses have no right of withdrawal; consumers consent to immediate access and thereby waive it.',
      'After the licence ends, your evidence folder stays accessible. The generator and updates need a licence.',
    ],
    termsLink: 'Terms', withdrawalLink: 'Withdrawal notice', privacyLink: 'Privacy',
    faqH: 'Questions',
    vat: 'VAT according to the checkout; VAT ID can be entered.', buyNote: 'Payment through Stripe. Access starts immediately after payment.',
    price: 'Annual licence', pilotPrice: 'Founder price for the first ten buyers,', seatsLeft: (n) => `${n} left`, regular: 'per year, twelve months, no automatic renewal',
  },
  de: {
    buy: 'Jahreslizenz kaufen', start: 'Generator starten', handbook: 'Handbuch lesen', handbookSample: 'Leseprobe lesen', sampleWord: 'Leseprobe', signIn: 'Anmelden', account: 'Konto', wait: 'Auf die Warteliste',
    preview: 'Vorschau: Der Generator läuft ohne Lizenz, solange die Website im Vorschaumodus ist.',
    cancelled: 'Der Kauf wurde abgebrochen. Es wurde nichts abgebucht.',
    getH: 'Was Sie bekommen', getText: 'Sieben Dokumente und ein Handbuch, alle für Ihren Betrieb erzeugt, alle datiert. PDF zum Ablegen und Drucken, DOCX und XLSX zum Bearbeiten, alles als ein ZIP.',
    howH: 'So läuft es', honestH: 'Was es ist, und was es nicht ist', marks: ['Fakt', 'Auslegung', 'Unsicher', 'Lücke'],
    samplesH: 'Vorher ansehen',
    priceH: 'Preis und Lizenz',
    priceSoonTitle: 'Der Preis folgt', priceSoon: 'Das Toolkit wird fertiggestellt. Wie jedes Scutoria-Toolkit wird es 99 Euro pro Jahr kosten; der Generator lässt sich in der Vorschau ausprobieren. Eine E-Mail, wenn es erhältlich ist.',
    facts: [
      'Eine Lizenz gilt für einen Betrieb und seine Beschäftigten. Passen Sie die Dokumente an, nutzen Sie sie intern, zeigen Sie sie Kunden, Versicherern und Behörden.',
      'Zwölf Monate ab Kauf, keine automatische Verlängerung. Eine Erinnerung vor dem Ende; die Verlängerung ist ein neuer Kauf.',
      'Zahlung über Stripe: Karte und die Verfahren, die für Ihr Land angeboten werden. Rechnung per E-Mail; eine UID kann an der Kasse eingegeben werden.',
      'Der Zugang beginnt sofort nach der Zahlung, mit Ihrer Zustimmung an der Kasse. Unternehmen haben kein Widerrufsrecht; Verbraucher stimmen dem sofortigen Beginn zu und verzichten damit darauf.',
      'Nach dem Ende der Lizenz bleibt Ihr Nachweisordner zugänglich. Generator und Aktualisierungen brauchen eine Lizenz.',
    ],
    termsLink: 'AGB', withdrawalLink: 'Widerrufsbelehrung', privacyLink: 'Datenschutz',
    faqH: 'Fragen',
    vat: 'Umsatzsteuer laut Kasse; UID kann eingegeben werden.', buyNote: 'Zahlung über Stripe. Der Zugang beginnt sofort nach der Zahlung.',
    price: 'Jahreslizenz', pilotPrice: 'Gründerpreis für die ersten zehn Käufer,', seatsLeft: (n) => `noch ${n} frei`, regular: 'pro Jahr, zwölf Monate, keine automatische Verlängerung',
  },
};

const T = {
  en: {
    kicker: 'Toolkit 01 · Available now',
    title: 'AI Policy Toolkit',
    lead: 'Up to thirty-four questions, 29 of them required: an AI usage policy, a tool register, training evidence, a labelling check and an evidence page for your business. Start with your business, or look at the example business first. Generated from your answers, sourced and dated.',
    description: 'AI usage policy, tool register, training evidence, labelling checklist and evidence page for businesses without an IT department. Generated from thirty-four questions, 29 of them required, sourced and dated.',
    docs: [
      ['D1', 'AI usage policy', 'Nine sections from your answers, among them: tools and access, permitted and prohibited uses, what never goes in, review, release, labelling, reporting, who decides in doubt. Signed by the management.', 'PDF · DOCX'],
      ['D2', 'The one page to post', 'The rule of doubt, what never goes into a tool, what is checked before use, where incidents are reported. Taken from the policy, so the two cannot contradict each other.', 'PDF · DOCX'],
      ['D3', 'Tool register and approval form', 'One row per tool actually in use, prefilled from your answers; seven questions per tool, checked at the provider; "unclear" is a finding, not a failure.', 'XLSX · PDF · DOCX'],
      ['D4', 'Briefing record', 'Attendance list per group with the contents prefilled, and an overview per person. The internal record the European Commission describes for Article 4.', 'PDF · DOCX · XLSX'],
      ['D5', 'Labelling checklist, Article 50', 'Role, inventory of uses and provider evidence prefilled; sheets per chatbot, deep fake and published text; or the dated note "no case at present".', 'PDF · DOCX'],
      ['D6', 'Enactment plan', 'Fifteen steps with responsibles and target dates, and the review sheet with four occasions and a fixed date.', 'XLSX'],
      ['D7', 'Evidence summary', 'One page, dated, with a document number: what is regulated, what is planned, what is open. Open items are listed, not hidden.', 'PDF'],
      ['HB', 'Handbook', 'Twenty-four pages: the reasoning behind every document, every statement marked as fact, interpretation, uncertain or gap, every source with retrieval date.', 'PDF · online'],
    ],
    steps: [
      ['Answer up to thirty-four questions', 'Start with your business, or look at the example business first. Every question names the handbook section that explains it. Stop and come back any time.'],
      ['Download seven dated documents', 'Preview in the browser, PDF for filing, DOCX and XLSX for editing, all as one ZIP. Change an answer and the documents follow.'],
      ['Enact and keep', 'Sign the policy, post the one page, hold the briefing, freeze a version in your evidence folder. During the licence, updates show you which versions predate a change.'],
    ],
    honest: [
      'It is not legal advice, and no document claims that your business complies with a rule. The documents show what you decided, since when, for which tools, and who knows about it.',
      'Every statement that matters carries a marker. Fact: read at the original source, with retrieval date. Interpretation: our conclusion, open to argument. Uncertain: sources contradict each other or the law is open. Gap: no source answers it, so you decide and the field stays open on purpose.',
      'Every uncertainty is listed with its status: seventeen points as of 23 October 2026, of which eight remain open, in section 8 of the handbook.',
      'Sources: the AI Act in the consolidated version of 27 July 2026, the Commission guidelines on Article 50 of 20 July 2026, the Commission answers on AI literacy, the German data protection authorities and the BSI, the Austrian Economic Chamber. Country notes for Austria and Germany; other member states are marked as a gap.',
    ],
    samplesText: 'One page from each of four documents of the fictional example business, an electrical contractor with ten to forty-nine staff in Austria, plus four pages from the handbook. No real person appears in them.',
    faq: [
      ['Who is it for?', 'Businesses with up to about fifty staff without an IT or legal department, anywhere in the EU. The generator asks for your country and the handbook has notes for Austria and Germany.'],
      ['Do I have to read the handbook first?', 'No. Start with the questions; each one links to the section that explains it. The handbook is there when a customer, an insurer or your staff ask why a rule says what it says.'],
      ['Which rules does it cover?', 'Article 4 of the AI Act, in application since 2 February 2025, and Article 50, since 2 August 2026, together with Annex III for employment; Article 24 of the GDPR and the Trade Secrets Directive; the Commission guidelines and answers; the guidance of the German and Austrian bodies. Every statement in the handbook carries its source and retrieval date.'],
      ['What happens when the law or a tool changes?', 'We update the templates and the handbook during your licence. Your evidence folder shows which frozen versions predate an update, so you know what to redo.'],
      ['Can a consultant use it for clients?', 'Not without a separate agreement. The licence covers one business. A consultant who wants to use it for clients writes to kontakt@scutoria.com.'],
      ['What do you store about me?', 'Your email address, your answers and the runs of the generator. The generator never asks for names of staff. No tracking cookies; page views are counted without any personal data.'],
      ['Is this the same as the free model of the Austrian chamber?', 'No. The chamber publishes a good model policy. This toolkit adds what the model lacks: the register, the approval form, the briefing record, the labelling checklist, the enactment plan, the evidence page, and a handbook that explains every open field and says where the model is out of date.'],
    ],
    ctaH: 'Ready when you are', ctaText: 'Start with your business or look at the example first; the dated set of documents is ready as soon as you finish.',
  },
  de: {
    kicker: 'Toolkit 01 · Jetzt erhältlich',
    title: 'KI-Richtlinien-Toolkit',
    lead: 'Bis zu vierunddreißig Fragen, davon 29 Pflichtfragen: eine KI-Nutzungsrichtlinie, ein Tool-Register, ein Schulungsnachweis, ein Kennzeichnungs-Check und eine Nachweisseite für Ihren Betrieb. Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst den Beispielbetrieb an. Aus Ihren Antworten erzeugt, belegt und datiert.',
    description: 'KI-Nutzungsrichtlinie, Tool-Register, Schulungsnachweis, Kennzeichnungs-Checkliste und Nachweisseite für Betriebe ohne IT-Abteilung. Aus vierunddreißig Fragen, davon 29 Pflichtfragen, erzeugt, belegt und datiert.',
    docs: [
      ['D1', 'KI-Nutzungsrichtlinie', 'Neun Paragrafen aus Ihren Antworten, darunter: Tools und Zugänge, zulässige und unzulässige Verwendungen, was nie hinein darf, Prüfung, Freigabe, Kennzeichnung, Meldung, wer im Zweifel entscheidet. Von der Leitung unterschrieben.', 'PDF · DOCX'],
      ['D2', 'Die eine Seite zum Aushängen', 'Die Zweifelsregel, was nie in ein Tool hinein darf, was vor der Verwendung geprüft wird, wohin Vorfälle gemeldet werden. Aus der Richtlinie übernommen, damit beide sich nicht widersprechen können.', 'PDF · DOCX'],
      ['D3', 'Tool-Register und Freigabeformular', 'Eine Zeile je tatsächlich benutztes Tool, aus Ihren Antworten vorbefüllt; sieben Fragen je Tool, geprüft beim Anbieter; „unklar“ ist ein Befund, kein Versäumnis.', 'XLSX · PDF · DOCX'],
      ['D4', 'Schulungsnachweis', 'Teilnehmerliste je Gruppe mit vorbefüllten Inhalten und eine Übersicht je Person. Die interne Aufzeichnung, die die Europäische Kommission für Artikel 4 beschreibt.', 'PDF · DOCX · XLSX'],
      ['D5', 'Kennzeichnungs-Checkliste, Artikel 50', 'Rolle, Inventar der Einsatzarten und Anbieternachweis vorbefüllt; Blätter je Chatbot, Deepfake und veröffentlichtem Text; oder der datierte Vermerk „derzeit kein Fall“.', 'PDF · DOCX'],
      ['D6', 'Plan der Inkraftsetzung', 'Fünfzehn Schritte mit Verantwortlichen und Zieldaten und das Blatt Wiedervorlage mit vier Anlässen und festem Termin.', 'XLSX'],
      ['D7', 'Nachweisseite', 'Eine Seite, datiert, mit Dokumentnummer: was geregelt ist, was geplant, was offen. Offene Punkte werden aufgeführt, nicht versteckt.', 'PDF'],
      ['HB', 'Handbuch', 'Sechsundzwanzig Seiten: die Begründung hinter jedem Dokument, jede Aussage als Fakt, Auslegung, Unsicher oder Lücke markiert, jede Quelle mit Abrufdatum.', 'PDF · online'],
    ],
    steps: [
      ['Bis zu vierunddreißig Fragen beantworten', 'Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst den Beispielbetrieb an. Jede Frage nennt den Handbuchabschnitt, der sie erklärt. Sie können jederzeit unterbrechen und zurückkommen.'],
      ['Sieben datierte Dokumente herunterladen', 'Vorschau im Browser, PDF zum Ablegen, DOCX und XLSX zum Bearbeiten, alles als ein ZIP. Ändern Sie eine Antwort, die Dokumente folgen.'],
      ['In Kraft setzen und pflegen', 'Die Richtlinie unterschreiben, die eine Seite aushängen, die Einweisung durchführen, eine Fassung im Nachweisordner einfrieren. Während der Lizenz zeigen Aktualisierungen, welche Fassungen älter sind als eine Änderung.'],
    ],
    honest: [
      'Es ist keine Rechtsberatung, und kein Dokument behauptet, dass Ihr Betrieb eine Vorschrift erfüllt. Die Dokumente zeigen, was Sie entschieden haben, seit wann, für welche Tools und wer davon weiß.',
      'Jede Aussage, auf die es ankommt, trägt einen Marker. Fakt: am Original gelesen, mit Abrufdatum. Auslegung: unsere Schlussfolgerung, über die sich streiten lässt. Unsicher: Quellen widersprechen sich oder die Rechtslage ist offen. Lücke: keine Quelle beantwortet die Frage, Sie entscheiden, und das Feld bleibt absichtlich offen.',
      'Jede Unsicherheit wird mit ihrem Stand aufgeführt: siebzehn Punkte zum Stand 23. Oktober 2026, davon acht offen, in Abschnitt 8 des Handbuchs.',
      'Quellen: die KI-Verordnung in der konsolidierten Fassung vom 27. Juli 2026, die Leitlinien der Kommission zu Artikel 50 vom 20. Juli 2026, die Antworten der Kommission zur KI-Kompetenz, die deutschen Datenschutzaufsichtsbehörden und das BSI, die Wirtschaftskammer Österreich. Ländernotizen für Österreich und Deutschland; andere Mitgliedstaaten sind als Lücke markiert.',
    ],
    samplesText: 'Je eine Seite aus vier Dokumenten des erfundenen Beispielbetriebs, ein Elektrotechnikbetrieb mit zehn bis neunundvierzig Beschäftigten in Österreich, dazu vier Seiten aus dem Handbuch. Keine echte Person kommt darin vor.',
    faq: [
      ['Für wen ist es gedacht?', 'Für Betriebe mit bis zu etwa fünfzig Beschäftigten ohne IT- oder Rechtsabteilung, überall in der EU. Der Generator fragt nach Ihrem Land, und das Handbuch hat Notizen für Österreich und Deutschland.'],
      ['Muss ich zuerst das Handbuch lesen?', 'Nein. Beginnen Sie mit den Fragen; jede verweist auf den Abschnitt, der sie erklärt. Das Handbuch ist da, wenn ein Kunde, ein Versicherer oder Ihre Belegschaft fragt, warum eine Regel sagt, was sie sagt.'],
      ['Welche Vorschriften deckt es ab?', 'Artikel 4 der KI-Verordnung, anwendbar seit 2. Februar 2025, und Artikel 50, seit 2. August 2026, dazu Anhang III für die Beschäftigung; Artikel 24 der DSGVO und die Geschäftsgeheimnis-Richtlinie; die Leitlinien und Antworten der Kommission; die Empfehlungen der deutschen und österreichischen Stellen. Jede Aussage im Handbuch trägt Quelle und Abrufdatum.'],
      ['Was passiert, wenn sich das Recht oder ein Tool ändert?', 'Wir aktualisieren Vorlagen und Handbuch während Ihrer Lizenz. Ihr Nachweisordner zeigt, welche eingefrorenen Fassungen älter sind als eine Aktualisierung, damit Sie wissen, was neu zu machen ist.'],
      ['Darf ein Berater es für Kunden benutzen?', 'Nicht ohne gesonderte Vereinbarung. Die Lizenz gilt für einen Betrieb. Wer es für Kunden nutzen möchte, schreibt an kontakt@scutoria.com.'],
      ['Was speichern Sie über mich?', 'Ihre E-Mail-Adresse, Ihre Antworten und die Läufe des Generators. Der Generator fragt nie nach Namen von Beschäftigten. Keine Tracking-Cookies; Seitenaufrufe werden ohne Personenbezug gezählt.'],
      ['Ist das dasselbe wie das kostenlose Muster der Wirtschaftskammer?', 'Nein. Die Kammer veröffentlicht ein gutes Muster für eine Richtlinie. Dieses Toolkit ergänzt, was dem Muster fehlt: Register, Freigabeformular, Schulungsnachweis, Kennzeichnungs-Checkliste, Plan der Inkraftsetzung, Nachweisseite und ein Handbuch, das jede offene Stelle erklärt und sagt, wo das Muster überholt ist.'],
    ],
    ctaH: 'Wenn Sie so weit sind', ctaText: 'Beginnen Sie mit Ihrem Betrieb oder sehen Sie zuerst das Beispiel an; der datierte Dokumentensatz steht bereit, sobald Sie fertig sind.',
  },
};

const TEXTS = { 'ai-policy': T, 'security-evidence': SECURITY_TEXTS };
export const hasProductPage = (id) => Boolean(TEXTS[id]);
// The sample sheet entries [nr, title, text, formats] of a toolkit, for the home hero stack.
export const sampleDocs = (id, lang) => TEXTS[id]?.[lang]?.docs ?? [];

export const markerRow = (words) => `<div class="marks">${['fact', 'interpretation', 'uncertain', 'gap'].map((c, i) => `<span class="sc-mk sc-mk--${c} sc-mk--chip"><i class="sc-mk__shape"></i>${esc(words[i])}</span>`).join('')}</div>`;

// The four markers large, as the eye-catcher of a page: the shape (drawn once when the row comes into view, site.js adds
// is-in), the name in mono and, where given, the existing one-line meaning. Shapes carry pathLength 100 so that the draw
// transition in site.css works for every shape alike. Colour never carries the meaning alone: the shapes differ.
const SHAPES = {
  fact: '<rect x="5" y="5" width="22" height="22" pathLength="100"/>',
  interpretation: '<path d="M16 3.5 28.5 16 16 28.5 3.5 16Z" pathLength="100"/>',
  uncertain: '<circle class="markers__ring" cx="16" cy="16" r="11.5" pathLength="100"/><path class="markers__half" d="M16 4.5a11.5 11.5 0 0 0 0 23Z" pathLength="100"/>',
  gap: '<circle class="markers__dash" cx="16" cy="16" r="11.5" pathLength="100"/>',
};
export const markerBand = (words, meanings = null) => `<ul class="markers draw">${['fact', 'interpretation', 'uncertain', 'gap'].map((c, i) => `<li class="markers__item sc-mk--${c}"><div class="markers__tab"><svg class="markers__shape" viewBox="0 0 32 32" aria-hidden="true">${SHAPES[c]}</svg><span class="markers__name">${esc(words[i])}</span></div>${meanings ? `<p class="markers__text">${esc(meanings[i])}</p>` : ''}</li>`).join('')}</ul>`;

// The price as a filing line, not a card: the amount large in Manrope, the licence and the founder line in mono, the facts
// as plain lines, the one solid button. Used on the product page and the home page.
export function priceBox(lang, product, price, { id = '' } = {}) {
  const s = COMMON[lang] ?? COMMON.en;
  // The founder seats follow the product configuration; the filled ones are the seats taken
  // (the same real number the line states). Decorative, no new text.
  const pilotSeats = priceConfigOf(product).pilotSeats;
  const seats = price.pilot ? `<div class="seats" aria-hidden="true">${Array.from({ length: pilotSeats }, (_, i) => `<i${i < pilotSeats - price.seatsLeft ? ' class="seats__taken"' : ''}></i>`).join('')}</div>` : '';
  return `
  <div class="price draw-line"${id ? ` id="${id}"` : ''}>
    <div class="price__kicker">${esc(s.price)} · ${esc(product.name[lang])}</div>
    <div class="price__amount">${esc(fmtPrice(price.cents, lang))}</div>
    ${price.pilot ? `<div class="price__founder">${esc(s.pilotPrice)} ${esc(s.seatsLeft(price.seatsLeft))}</div>${seats}` : ''}
    <div class="price__note">${esc(s.regular)}</div>
    <div class="price__note">${esc(s.vat)}</div>
    <form method="post" action="${product.path[lang]}/buy"><button class="sc-btn" type="submit">${esc(s.buy)}</button></form>
    <div class="price__note">${esc(s.buyNote)}</div>
  </div>`;
}

// The box of a toolkit whose price is not released yet: the waiting list instead of the buy button.
function priceSoonBox(lang, s, name) {
  return `
  <div class="price">
    <div class="label muted">${esc(s.price)} · ${esc(name)}</div>
    <div class="price__amount price__amount--soon">${esc(s.priceSoonTitle)}</div>
    <div class="price__note">${esc(s.priceSoon)}</div>
    <div><a class="sc-btn" href="${p('home', lang)}#access">${esc(s.wait)}</a></div>
  </div>`;
}

export async function productPage(lang, { customer = null, m = '' } = {}, tk = toolkitById('ai-policy')) {
  const texts = TEXTS[tk.id] ?? T;
  const s = { ...(COMMON[lang] ?? COMMON.en), ...(texts[lang] ?? texts.en) };
  const sh = t(lang).shop;
  const product = tk.forSale ? PRODUCTS[tk.id] : null;
  const b = toolkitBase(tk, lang);
  const hb = tk.handbook ? handbookOf(tk, lang) : null;
  const name = product ? product.name[lang] : s.title;
  const licensed = product ? await isLicensed(customer, product.id) : false;
  const price = product ? await priceFor(product) : null;
  const notice = m === 'licence' ? `<div class="notice notice--error">${esc(sh.needLicence)}</div>` : m === 'unavailable' ? `<div class="notice notice--error">${esc(sh.unavailable)}</div>` : m === 'cancel' ? `<div class="notice">${esc(s.cancelled)}</div>` : '';
  const canStart = await canStartRun(customer, tk.id);
  // The actions in order of weight: the solid buy button, the strong start button, the quiet handbook button, the sign-in text.
  const startForm = (cls) => (canStart ? startChoices(b,lang) : '');
  const handbookLabel = licensed ? s.handbook : s.handbookSample;
  const handbookLink = hb ? `<a class="sc-btn sc-btn--secondary" href="${hb}">${esc(handbookLabel)}</a>` : '';
  const accountLink = `<a class="hero__link" href="${p('account', lang)}">${esc(customer ? s.account : s.signIn)}</a>`;
  const waitLink = `<a class="sc-btn sc-btn--strong" href="${p('home', lang)}#access">${esc(s.wait)}</a>`;
  const cta = product
    ? (licensed ? [startForm(''), handbookLink, accountLink] : [`<a class="sc-btn" href="#price">${esc(s.buy)}</a>`, startForm('sc-btn--strong'), handbookLink, accountLink]).join('')
    : [startForm(''), waitLink, handbookLink, accountLink].join('');
  const ctaEnd = product
    ? `${licensed ? startForm('') : `<a class="sc-btn" href="#price">${esc(s.buy)}</a>`}${handbookLink}`
    : `${startForm('')}${waitLink}${handbookLink}`;
  // The documents as paper miniatures, one per document, varied by kind; the handbook as a stack with its page count.
  const docs = s.docs.map(([nr, title, text, fmts], i) => paperMini(lang, { code: nr, fmts, title, text, kind: KINDS[tk.id]?.[nr] ?? 'paragraphs', index: i + 1, total: s.docs.length, line: tk.line, pages: nr === 'HB' ? (PAGES[tk.id]?.[lang] ?? '') : '' })).join('');
  const pics = stepPictures();
  const steps = s.steps.map(([h, text], i) => `<li class="reveal reveal--${i + 1}"><div class="steps__pic" aria-hidden="true">${pics[i]}</div><span class="steps__n">${i + 1}</span><div class="steps__text"><h3 class="heading">${esc(h)}</h3><p class="body muted">${esc(text)}</p></div></li>`).join('');
  const sampleList = SAMPLES[tk.id] ?? {};
  const samples = (sampleList[lang] ?? sampleList.en ?? []).map((x) => paperThumb(lang, { href: x.file ? `/samples/${tk.id}/${x.file}` : hb, title: x.label, code: `${x.code ?? 'PDF'} · ${x.file ? 'PDF' : s.sampleWord}`, meta: x.meta ?? '', kind: x.code === 'HB' ? 'handbook' : 'doc' })).join('');
  const faq = s.faq.map(([q, a]) => `<details class="faq__item"><summary>${esc(q)}</summary><p class="body">${esc(a)}</p></details>`).join('');
  const priceBlock = product
    ? (licensed ? `<div class="notice notice--ok">${esc(t(lang).account.licences)}: ${esc(product.name[lang])} · <a href="${p('account', lang)}">${esc(s.account)}</a></div>` : priceBox(lang, product, price))
    : priceSoonBox(lang, s, name);
  // The filing-cabinet index tabs: the document numbers D1 to D7 and HB, each jumping to its sheet.
  const docTabs = [...new Set(s.docs.map(([nr]) => nr))].map((nr) => `<a class="carousel__tab" href="#doc-${esc(nr)}-${s.docs.findIndex(([code]) => code === nr) + 1}">${esc(nr)}</a>`).join('');
  // Sapphire Cinema (3 November 2026): the message and the actions left, the product stage right; on a phone the stage follows.
  const l = L(lang);
  const status = l(product ? CINEMA.shelf.available : CINEMA.shelf.preparing);
  const related = RELATED[tk.id];
  const body = `
<section class="wrap cine-product-hero" aria-labelledby="product-h1">
  <div class="cine-product-hero__text">
    <p class="kicker">Toolkit ${esc(tk.nr)} · ${esc(status)}</p>
    <h1 id="product-h1" class="display display--product">${esc(s.title).replace('Sicherheitsnachweis-', 'Sicherheits&shy;nachweis-')}</h1>
    <p class="lead">${esc(s.lead)}</p>
    ${config.siteMode !== 'live' ? `<p class="small mono">${esc(s.preview)}</p>` : ''}
    ${notice}
    <div class="sc-row">${cta}</div>
    <p class="cine-product-hero__facts">${esc(l(CINEMA.shelf.formats))} · ${esc(l(CINEMA.shelf.digital))}</p>
  </div>
  <div class="cine-product-stage reveal">
    ${heroStage(lang, tk, { openBook: true })}
  </div>
</section>
<section class="wrap section" id="documents">
  <div class="section__head reveal"><h2 class="title">${esc(s.getH)}</h2><p class="body muted">${esc(s.getText)}</p></div>
  <div class="docs__tabs">${docTabs}</div>
  <div class="docs docs--${esc(tk.line)}" tabindex="0" role="region" aria-label="${esc(s.getH)}">${docs}</div>
</section>
<section class="wrap section" id="how">
  <div class="section__head reveal"><h2 class="title">${esc(s.howH)}</h2></div>
  <ol class="steps steps--band">${steps}</ol>
</section>
<section class="wrap section" id="honest">
  <div class="cine-panel cine-panel--method reveal">
    <div class="section__head"><h2 class="title">${esc(s.honestH)}</h2></div>
    ${markerBand(s.marks)}
    <div class="prose">${s.honest.map((x) => `<p class="body">${esc(x)}</p>`).join('')}</div>
    ${hb ? `<div><a class="sc-btn sc-btn--secondary" href="${hb}">${esc(handbookLabel)}</a></div>` : ''}
  </div>
</section>
<section class="wrap section" id="samples">
  <div class="section__head reveal"><h2 class="title">${esc(s.samplesH)}</h2><p class="body muted">${esc(s.samplesText)}</p></div>
  <div class="thumbs reveal">${samples}</div>
  ${related ? `<div class="cine-related reveal"><p class="kicker">${esc(l(CINEMA.studio.related))}</p><a class="cine-related__link" href="${p(related.toolKey, lang)}">${esc(related.toolTitle(lang))}</a><a class="cine-related__link" href="${p('studio', lang)}">${esc(t(lang).nav.studio)}</a></div>` : ''}
</section>
<section class="wrap section" id="price">
  <div class="section__head reveal"><h2 class="title">${esc(s.priceH)}</h2></div>
  <div class="pricing cine-panel cine-panel--price reveal">
    ${priceBlock}
    <ul class="facts facts--check">${s.facts.map((x) => `<li>${esc(x)}</li>`).join('')}<li class="facts__links"><a href="${p('terms', lang)}">${esc(s.termsLink)}</a> · <a href="${p('withdrawal', lang)}">${esc(s.withdrawalLink)}</a> · <a href="${p('privacy', lang)}">${esc(s.privacyLink)}</a></li></ul>
  </div>
</section>
<section class="wrap section" id="faq">
  <div class="section__head reveal"><h2 class="title">${esc(s.faqH)}</h2></div>
  <div class="faq reveal">${faq}</div>
</section>
<section class="wrap section" id="cta">
  <div class="section__head reveal"><h2 class="title">${esc(s.ctaH)}</h2><p class="body muted">${esc(s.ctaText)}</p></div>
  <div class="sc-row reveal">${ctaEnd}</div>
</section>`;
  const url = `${config.baseUrl}${b}`;
  const image = `${config.baseUrl}/og/${tk.id}-${lang}.png`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: s.description,
    image,
    url,
    brand: { '@type': 'Brand', name: 'Scutoria' },
    ...(price ? { offers: { '@type': 'Offer', url, price: (price.cents / 100).toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition' } } : {}),
  };
  const html=layout({ lang, title: s.title, description: s.description, body, alt: { en: toolkitBase(tk, 'en'), de: toolkitBase(tk, 'de') }, og: { image, type: 'website' }, jsonLd, noindex: !tk.forSale, line: tk.line, section: 'library' });
  return canStart?html.replace('</head>','<link rel="stylesheet" href="/generator.css">\n</head>'):html;
}
