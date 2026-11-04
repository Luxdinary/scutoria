// Routes of the generator for every toolkit in the registry: start a run, step through the questions, preview and download the documents.
// Order matters: the documents routes are registered before the numbered step routes.
import { randomBytes } from 'node:crypto';
import { layout, esc } from '../layout.mjs';
import { createRun, getRun, saveRun } from '../db.mjs';
import { p, t } from '../i18n.mjs';
import { loadQuestions, attachKindQuestion, steps, defaultAnswers, parseAnswer, isComplete, renderControls } from './engine.mjs';
import { docById, formatsOf, produce, produceZip, fileName } from './documents/index.mjs';
import { handbookArticle, handbookPdf, handbookMeta, handbookSampleArticle } from './handbook.mjs';
import { currentCustomer, canStartRun, isLicensed, canEditRun } from '../shop/session.mjs';
import { productPage, hasProductPage } from '../pages/product.mjs';
import { previewProductPage } from '../pages/toolkit-preview.mjs';
import { TOOLKITS, toolkitBase } from './registry.mjs';
import { RUN_TEXT, exampleNotice, answerText, sameAnswer, sectionsList } from './run-ui.mjs';

const handbookPath = (tk, lang) => `${toolkitBase(tk, lang)}/${lang === 'de' ? 'handbuch' : 'handbook'}`;

const S = {
  en: { expired: 'Your licence has ended. These documents stay available; changing the answers or starting a new run needs a new licence.', expiredBuy: 'Buy a licence', step: (i, n) => `Question ${i} of ${n}`, back: 'Back', next: 'Next', finish: 'Show the documents', docs: 'Your documents', docsText: 'Generated from your answers. Change an answer and the documents follow. PDF for filing and printing, DOCX and XLSX for editing.', edit: 'Change answers', all: 'All documents as ZIP', ref: 'Handbook', refSoon: (n) => `Handbook, section ${n} (in preparation)`, required: 'Please answer this question.', missing: 'Nothing here yet.', fmt: { html: 'Preview', pdf: 'PDF', docx: 'DOCX', xlsx: 'XLSX' }, back2: 'Back to the documents', handbook: 'Handbook', handbookKicker: 'Handbook', handbookText: 'The reasoning behind every document: nine areas, seven questions, Article 4, Article 50, country notes, open points, sources with retrieval dates.', backStart: 'Back to the toolkit', sample: 'Reading sample', frozen: 'Frozen version', account: 'Account', soon: 'In preparation' },
  de: { expired: 'Ihre Lizenz ist abgelaufen. Diese Dokumente bleiben abrufbar; Änderungen an den Antworten und ein neuer Lauf brauchen eine neue Lizenz.', expiredBuy: 'Lizenz kaufen', step: (i, n) => `Frage ${i} von ${n}`, back: 'Zurück', next: 'Weiter', finish: 'Dokumente anzeigen', docs: 'Ihre Dokumente', docsText: 'Aus Ihren Antworten erzeugt. Ändern Sie eine Antwort, die Dokumente folgen. PDF zum Ablegen und Drucken, DOCX und XLSX zum Bearbeiten.', edit: 'Antworten ändern', all: 'Alle Dokumente als ZIP', ref: 'Handbuch', refSoon: (n) => `Handbuch, Abschnitt ${n} (in Vorbereitung)`, required: 'Bitte beantworten Sie diese Frage.', missing: 'Hier liegt noch nichts.', fmt: { html: 'Vorschau', pdf: 'PDF', docx: 'DOCX', xlsx: 'XLSX' }, back2: 'Zurück zu den Dokumenten', handbook: 'Handbuch', handbookKicker: 'Handbuch', handbookText: 'Die Begründung hinter jedem Dokument: neun Regelbereiche, sieben Prüffragen, Artikel 4, Artikel 50, Ländernotizen, offene Punkte, Quellen mit Abrufdatum.', backStart: 'Zurück zum Toolkit', sample: 'Leseprobe', frozen: 'Eingefrorene Fassung', account: 'Konto', soon: 'In Vorbereitung' },
};

// "handbook 2, 3" → links to the sections of the handbook, or plain text while the handbook is not written yet.
function refText(ref, lang, hb, s) {
  const nums = String(ref ?? '').match(/\d+/g) ?? [];
  if (!nums.length) return esc(ref ?? '');
  if (!hb) return esc(s.refSoon(nums.join(', ')));
  return nums.map((n) => `<a href="${hb}#s${n}">${lang==='de'?'Warum wir das fragen: Handbuch, Abschnitt':'Why we ask: handbook, section'} ${n}</a>`).join(', ');
}

function page(lang, title, body, alt) {
  return layout({ lang, title, description: title, body, alt, noindex: true }).replace('<html lang=', '<html data-generator lang=').replace('</head>','<link rel="stylesheet" href="/generator.css">\n</head>');
}

export function mountToolkit(app) {
  for (const tk of TOOLKITS) mountOne(app, tk);
}

function mountOne(app, tk) {
  const def = attachKindQuestion(loadQuestions(tk.id));
  const name = (lang) => def.name[lang] ?? def.name.en;
  const toolsQ = def.blocks.flatMap((bl) => bl.questions).find((q) => q.type === 'tools') ?? null;

  for (const lang of ['en', 'de']) {
    const b = toolkitBase(tk, lang);
    const alt = { en: toolkitBase(tk, 'en'), de: toolkitBase(tk, 'de') };
    const s = S[lang];
    const notFound = (res) => res.status(404).type('html').send(page(lang, name(lang), `<section class="wrap hero"><h1 class="title">${esc(name(lang))}</h1><p class="lead">${esc(s.missing)}</p></section>`, alt));
    // Frozen versions carry the date of freezing on every document; live runs carry today's date.
    const ctxOf = (run) => ({ run, today: run.frozen ? String(run.created_at).slice(0, 10) : new Date().toISOString().slice(0, 10) });
    const hb = tk.handbook ? handbookPath(tk, lang) : null;
    const hbAlt = { en: handbookPath(tk, 'en'), de: handbookPath(tk, 'de') };

    // The product page: pages/product.mjs for every toolkit with texts (with a price, or with "the price follows");
    // pages/toolkit-preview.mjs only for a toolkit that has no product page yet.
    app.get(b, async (req, res) => {
      const customer = await currentCustomer(req);
      if (hasProductPage(tk.id)) return res.type('html').send(await productPage(lang, { customer, m: String(req.query.m ?? '') }, tk));
      res.type('html').send(await previewProductPage(tk, def, lang, { customer }));
    });

    // The handbook: one page per language, independent of a run. Licence holders get the whole handbook with its PDF;
    // everyone else gets the reading sample, four pages from four chapters (E35, 3 November 2026).
    if (tk.handbook) {
      app.get(hb, async (req, res) => {
        const full = await isLicensed(await currentCustomer(req), tk.id);
        const meta = handbookMeta(tk.id, lang);
        const bar = `<a class="sc-btn sc-btn--secondary sc-btn--small" href="${b}">${esc(s.backStart)}</a>${full ? ` <a class="sc-btn sc-btn--small" href="${hb}/pdf">PDF</a>` : ''}`;
        const article = full ? handbookArticle(tk.id, lang) : handbookSampleArticle(tk.id, lang, { productHref: `${b}#price` });
        const body = `<section class="wrap docwrap" data-theme="paper"><div class="docwrap__bar">${bar}</div>${article}</section>`;
        const title = full ? (meta.title ?? s.handbook) : `${meta.title ?? s.handbook} · ${s.sample}`;
        res.type('html').send(layout({ lang, title, description: meta.title ?? s.handbook, body, alt: hbAlt }));
      });
      app.get(`${hb}/pdf`, async (req, res, next) => {
        try {
          if (!(await isLicensed(await currentCustomer(req), tk.id))) return res.redirect(303, hb);
          const pdf = await handbookPdf(tk.id, lang);
          res.set('Content-Disposition', `inline; filename="${tk.id}-handbook-${lang}.pdf"`);
          res.type('application/pdf').send(pdf);
        } catch (e) { next(e); }
      });
    }

    // Starting a run: open in preview mode, licence or preview access when live. A signed-in customer's run lands in the evidence folder.
    app.post(`${b}/start`, async (req, res) => {
      const customer = await currentCustomer(req);
      if (!(await canStartRun(customer, tk.id))) return res.redirect(303, `${b}?m=licence`);
      const id = randomBytes(9).toString('base64url');
      const kind = req.body?.kind === 'example' ? 'example' : 'own';
      await createRun(id, tk.id, lang, kind === 'example' ? defaultAnswers(def, lang) : {}, customer?.id ?? null, kind);
      res.redirect(303, `${b}/run/${id}/1`);
    });

    app.get(`${b}/run/:id/documents`, async (req, res) => {
      const run = await getRun(req.params.id);
      if (!run || run.product !== tk.id) return notFound(res);
      const editable = await canEditRun(run, tk.id);
      if (!run.frozen && editable && req.query.checked !== '1') return res.redirect(303, `${b}/run/${run.id}/review`);
      const licensed = await isLicensed(await currentCustomer(req), tk.id);
      const cards = tk.docs.map((d) => `
    <article class="sc-card">
      <div class="sc-card__kicker">${esc(d.nr)}</div>
      <h3 class="sc-card__title">${esc(d.title[lang] ?? d.title.en)}</h3>
      <p class="sc-card__text">${esc(d.text[lang] ?? d.text.en)}</p>
      <div class="sc-card__actions">${formatsOf(d).map((f) => `<a class="sc-btn ${f === 'html' ? '' : 'sc-btn--secondary'} sc-btn--small" href="${b}/run/${esc(run.id)}/documents/${d.id}/${f}">${esc(s.fmt[f])}</a>`).join('')}</div>
    </article>`).join('') + tk.planned.map((d) => `
    <article class="sc-card">
      <div class="sc-card__kicker">${esc(d.nr)} · ${esc(s.soon)}</div>
      <h3 class="sc-card__title">${esc(d.title[lang] ?? d.title.en)}</h3>
      <p class="sc-card__text">${esc(d.text[lang] ?? d.text.en)}</p>
    </article>`).join('') + (tk.handbook ? `
    <article class="sc-card">
      <div class="sc-card__kicker">${esc(s.handbookKicker)}</div>
      <h3 class="sc-card__title">${esc(s.handbook)}</h3>
      <p class="sc-card__text">${esc(tk.handbookText?.[lang] ?? s.handbookText)}</p>
      <div class="sc-card__actions">${licensed ? `<a class="sc-btn sc-btn--small" href="${hb}">${esc(s.fmt.html)}</a><a class="sc-btn sc-btn--secondary sc-btn--small" href="${hb}/pdf">PDF</a>` : `<a class="sc-btn sc-btn--small" href="${hb}">${esc(s.sample)}</a>`}</div>
    </article>` : '');
      const expiredNote = !run.frozen && !editable ? `<div class="notice">${esc(s.expired)} <a href="${b}#price">${esc(s.expiredBuy)}</a></div>` : '';
      const frozenNote = run.frozen ? `<div class="notice"><strong>${esc(s.frozen)}</strong> · ${esc(run.label ?? '')} · ${esc(t(lang).account.frozenNote)}</div>` : '';
      const body = `
<section class="wrap hero">
  <div class="label muted">${esc(name(lang))}</div>
  <h1 class="title">${esc(s.docs)}</h1>
  <p class="lead">${esc(s.docsText)}</p>
  ${frozenNote}${expiredNote}
  <div class="sc-row"><a class="sc-btn" href="${b}/run/${esc(run.id)}/documents/all/zip">${esc(s.all)}</a>${run.frozen || !editable ? '' : `<a class="sc-btn sc-btn--secondary" href="${b}/run/${esc(run.id)}/review">${esc(s.edit)}</a>`}${run.customer_id ? `<a class="sc-btn sc-btn--secondary" href="${p('account', lang)}">${esc(s.account)}</a>` : ''}</div>
</section>
<section class="wrap section">
  <div class="sc-cards">${cards}</div>
</section>`;
      res.type('html').send(page(lang, s.docs, body, { en: `${toolkitBase(tk, 'en')}/run/${run.id}/documents`, de: `${toolkitBase(tk, 'de')}/run/${run.id}/documents` }));
    });

    app.get(`${b}/run/:id/documents/all/zip`, async (req, res, next) => {
      try {
        const run = await getRun(req.params.id);
        if (!run || run.product !== tk.id) return notFound(res);
        const licensed = await isLicensed(await currentCustomer(req), tk.id);
        const zip = await produceZip(def, run.answers, lang, ctxOf(run), { docs: tk.docs, handbook: tk.handbook && licensed ? tk.id : null });
        res.set('Content-Disposition', `attachment; filename="${fileName({ id: 'toolkit' }, run.answers, lang, 'zip')}"`);
        res.type('application/zip').send(zip);
      } catch (e) { next(e); }
    });

    app.get(`${b}/run/:id/documents/:doc/:fmt`, async (req, res, next) => {
      try {
        const run = await getRun(req.params.id);
        const d = docById(req.params.doc, tk.docs);
        const fmt = req.params.fmt;
        if (!run || run.product !== tk.id || !d || !formatsOf(d).includes(fmt)) return notFound(res);
        const out = await produce(d, def, run.answers, lang, fmt, ctxOf(run));
        if (fmt === 'html') {
          const body = `<section class="wrap docwrap" data-theme="paper"><div class="docwrap__bar"><a class="sc-btn sc-btn--secondary sc-btn--small" href="${b}/run/${esc(run.id)}/documents">${esc(s.back2)}</a> <a class="sc-btn sc-btn--small" href="${b}/run/${esc(run.id)}/documents/${d.id}/pdf">PDF</a></div>${out.body}</section>`;
          return res.type('html').send(page(lang, d.title[lang] ?? d.title.en, body, { en: `${toolkitBase(tk, 'en')}/run/${run.id}/documents/${d.id}/html`, de: `${toolkitBase(tk, 'de')}/run/${run.id}/documents/${d.id}/html` }));
        }
        res.set('Content-Disposition', `${fmt === 'pdf' ? 'inline' : 'attachment'}; filename="${out.name}"`);
        res.type(out.type).send(out.body);
      } catch (e) { next(e); }
    });

    app.get(`${b}/run/:id/review`, async (req, res) => {
      const run=await getRun(req.params.id);
      if (!run || run.product!==tk.id) return notFound(res);
      if (run.frozen) return res.redirect(303,`${b}/run/${run.id}/documents`);
      if (!(await canEditRun(run, tk.id))) return res.redirect(303, `${b}/run/${run.id}/documents?checked=1`);
      const list=steps(def,run.answers), defaults=defaultAnswers(def,lang), x=RUN_TEXT[lang];
      const groups=def.blocks.map(block=>`<section class="run-review-section"><h2 class="heading">${esc(block.id)} · ${esc(block.title[lang]??block.title.en)}</h2><dl>${list.filter(q=>q.block.id===block.id).map(q=>{
        const n=list.findIndex(v=>v.id===q.id)+1,a=run.answers[q.id],value=answerText(q,a,lang);
        return `<div class="run-review-answer"><dt>${esc(q.short?.[lang]??q.label[lang]??q.label.en)} <a href="${b}/run/${esc(run.id)}/${n}?review=1">${x.change}</a></dt><dd>${value?esc(value):`<span class="mono">${q.required?(lang==='de'?'Fehlt, Pflichtfrage':'Missing, required'):x.open}</span>`}${value&&sameAnswer(a,defaults[q.id])?`<span class="small mono run-from-example">${x.from}</span>`:''}</dd></div>`;
      }).join('')}</dl></section>`).join('');
      const body=`<section class="wrap step run-review"><h1 class="title">${x.review}</h1>${exampleNotice(run,b,lang)}${groups}<form method="post" action="${b}/run/${esc(run.id)}/review"><button class="sc-btn" type="submit">${esc(s.finish)}</button></form></section>`;
      res.type('html').send(page(lang,x.review,body,{en:`${toolkitBase(tk,'en')}/run/${run.id}/review`,de:`${toolkitBase(tk,'de')}/run/${run.id}/review`}));
    });
    app.post(`${b}/run/:id/review`, async (req,res)=>{
      const run=await getRun(req.params.id);
      if(!run||run.product!==tk.id)return notFound(res);
      if(!(await canEditRun(run,tk.id)))return res.redirect(303,`${b}/run/${run.id}/documents?checked=1`);
      const list=steps(def,run.answers),missing=list.findIndex(q=>!isComplete(q,run.answers[q.id]));
      if(missing>=0)return res.redirect(303,`${b}/run/${run.id}/${missing+1}?e=1&review=1`);
      res.redirect(303,`${b}/run/${run.id}/documents?checked=1`);
    });

    app.get(`${b}/run/:id/:n`, async (req, res) => {
      const run = await getRun(req.params.id);
      if (!run || run.product !== tk.id) return notFound(res);
      if (run.frozen) return res.redirect(303, `${b}/run/${run.id}/documents`);
      if (!(await canEditRun(run, tk.id))) return res.redirect(303, `${b}/run/${run.id}/documents?checked=1`);
      const list = steps(def, run.answers);
      const n = Math.min(Math.max(Number(req.params.n) || 1, 1), list.length);
      const q = list[n - 1];
      const a = run.answers[q.id];
      const err = req.query.e === '1';
      const x=RUN_TEXT[lang], sample=defaultAnswers(def,lang)[q.id];
      const body = `
<section class="wrap step">
  <div class="step__head">
    <span class="label muted">${x.section} ${esc(q.block.id)} · ${esc(q.block.title[lang] ?? q.block.title.en)} · ${esc(s.step(n,list.length))}</span>
    <h1 class="heading">${esc(q.label[lang] ?? q.label.en)}</h1>
    <p class="body muted">${esc(q.hint?.[lang] ?? q.hint?.en ?? '')}</p>
  </div>
  ${exampleNotice(run,b,lang)}
  ${sectionsList(def,list,run,b,lang)}
  <form method="post" action="${b}/run/${esc(run.id)}/${n}" class="step__form" data-question="${esc(q.id)}" data-required="${Boolean(q.required)}">
    ${req.query.review==='1'?'<input type="hidden" name="review" value="1">':''}
    ${err ? `<div class="notice notice--error">${esc(s.required)}</div>` : ''}
    ${renderControls(q, a, lang, run.answers)}
    ${run.label==='own'?`<p class="small muted run-hint">${x.hint} ${esc(answerText(q,sample,lang))}</p>`:''}
    <div class="step__actions">
      ${n > 1 ? `<a class="sc-btn sc-btn--secondary" href="${b}/run/${esc(run.id)}/${n - 1}">${esc(s.back)}</a>` : '<span></span>'}
      <button class="sc-btn" type="submit">${n === list.length ? esc(s.finish) : esc(s.next)}</button>
    </div>
    <div class="step__ref small">${refText(q.ref, lang, hb, s)}</div>
    <p class="small muted run-save">${x.saved}${run.customer_id?' '+x.account:''}</p>
  </form>
</section>`;
      res.type('html').send(page(lang, `${s.step(n, list.length)} · ${name(lang)}`, body, { en: `${toolkitBase(tk, 'en')}/run/${run.id}/${n}`, de: `${toolkitBase(tk, 'de')}/run/${run.id}/${n}` }));
    });

    app.post(`${b}/run/:id/:n`, async (req, res) => {
      const run = await getRun(req.params.id);
      if (!run || run.product !== tk.id) return notFound(res);
      if (run.frozen) return res.redirect(303, `${b}/run/${run.id}/documents`);
      if (!(await canEditRun(run, tk.id))) return res.redirect(303, `${b}/run/${run.id}/documents?checked=1`);
      const list = steps(def, run.answers);
      const n = Math.min(Math.max(Number(req.params.n) || 1, 1), list.length);
      const q = list[n - 1];
      const answer = parseAnswer(q, req.body ?? {}, lang);
      if (!isComplete(q, answer)) return res.redirect(303, `${b}/run/${run.id}/${n}?e=1${req.body?.review==='1'?'&review=1':''}`);
      run.answers[q.id] = answer;
      // The tool rows follow the chosen tool kinds (AI Policy Toolkit: B2 follows B1).
      if (toolsQ && q.id === toolsQ.dependsOn && run.answers[toolsQ.id]) {
        const kinds = (answer.values ?? []).filter((v) => v !== 'none');
        const rows = {};
        for (const k of kinds) rows[k] = run.answers[toolsQ.id].rows?.[k] ?? { name: '', account: 'unknown' };
        run.answers[toolsQ.id] = { rows };
      }
      await saveRun(run.id, run.answers, n);
      const after = steps(def, run.answers);
      res.redirect(303, req.body?.review==='1'||n >= after.length ? `${b}/run/${run.id}/review` : `${b}/run/${run.id}/${n + 1}`);
    });
  }
}
