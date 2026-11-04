// Routes of the memo generators (E11). The questions are a GET form, so the answers live in the address of the result page and
// nothing is stored for a memo that is only read. Asking for the PDF by email stores the address with the memo and its result once,
// counts the request without personal data, and sends the memo as attachment; without a mail service the preview shows the PDF link
// instead. BREVO_MEMO_LIST_ID adds every address to a Brevo list: leave it unset until the privacy notice is final (review A5, Nr. 30).
import { config } from '../config.mjs';
import { languages, p } from '../i18n.mjs';
import { addMemoContact, countHit, rateAllow } from '../db.mjs';
import { sendMail, addToBrevoList } from '../mail.mjs';
import { sameOrigin, originOf } from '../shop/session.mjs';
import { toPdf } from '../toolkit/documents/pdf.mjs';
import { MEMOS } from './index.mjs';
import { readAnswers, missingKeys, answersQuery, today } from './shared.mjs';
import { memosIndexPage, memoFormPage, memoResultPage, memoMail } from './pages.mjs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Three memo mails per address and hour, and a ceiling for the whole server, so that nobody turns the PDF renderer into a load test.
// Counted in the database, so the limits hold across every Worker isolate.
const allow = (email) => rateAllow([{ key: 'memo-server', limit: 120 }, { key: `memo:${email}`, limit: 3 }]);

// The PDF without an address: only when configured, or in preview mode without a mail service (so that the memo can be checked).
export const pdfOpen = () => config.memos.pdfPublic || (config.siteMode !== 'live' && !config.mail.brevoApiKey);

export function evaluateMemo(memo, answers, lang, date = today()) {
  const result = memo.evaluate(answers, lang, date);
  return { ...result, date };
}

export function mountMemos(app) {
  for (const lang of languages) {
    app.get(p('memos', lang), (req, res) => res.type('html').send(memosIndexPage(lang)));
    for (const memo of MEMOS) {
      const path = p(memo.pathKey, lang);

      app.get(path, (req, res) => {
        const answers = readAnswers(memo, req.query);
        res.type('html').send(memoFormPage(memo, lang, { answers, m: String(req.query.m ?? '') }));
      });

      app.get(`${path}/memo`, (req, res) => {
        const answers = readAnswers(memo, req.query);
        if (Object.hasOwn(req.query, 'business')) return res.redirect(303, `${path}/memo?${answersQuery(memo, answers)}`);
        if (missingKeys(memo, answers).length) return res.redirect(303, `${path}?${answersQuery(memo, answers)}&m=incomplete`);
        const result = evaluateMemo(memo, answers, lang);
        const m = String(req.query.m ?? '');
        const pdfLink = m === 'preview' && pdfOpen() ? `${path}/memo.pdf?${answersQuery(memo, answers)}` : null;
        res.type('html').send(memoResultPage(memo, lang, answers, result, { m, email: String(req.query.e ?? ''), pdfLink }));
      });

      app.get(`${path}/memo.pdf`, async (req, res) => {
        if (!pdfOpen()) return res.status(404).end();
        const answers = readAnswers(memo, req.query);
        if (missingKeys(memo, answers).length) return res.redirect(303, `${path}?${answersQuery(memo, answers)}&m=incomplete`);
        const result = evaluateMemo(memo, answers, lang);
        try {
          const pdf = await toPdf(result.doc, lang);
          res.type('application/pdf').set('Content-Disposition', `inline; filename="scutoria-memo-${memo.id}-${lang}-${result.date}.pdf"`).send(pdf);
        } catch (e) {
          console.error('memo pdf', e.message);
          res.status(503).type('text/plain').send('PDF not available');
        }
      });

      app.post(`${path}/send`, async (req, res) => {
        if (!sameOrigin(req)) return res.status(403).end();
        const answers = readAnswers(memo, req.body ?? {}, { pdfBusiness: true });
        const back = `${path}/memo?${answersQuery(memo, answers)}`;
        if (missingKeys(memo, answers).length) return res.redirect(303, `${path}?${answersQuery(memo, answers)}&m=incomplete`);
        const email = String(req.body?.email ?? '').trim().toLowerCase();
        const consent = req.body?.consent === 'yes';
        const waitlist = req.body?.waitlist === 'yes';
        if (!EMAIL.test(email) || email.length > 254 || !consent) return res.redirect(303, `${back}&m=error`);
        let allowed;
        try { allowed = await allow(email); } catch (e) { console.error('memo rate limit', e.message); return res.redirect(303, `${back}&m=busy`); }
        if (!allowed) return res.redirect(303, `${back}&m=limit`);
        const result = evaluateMemo(memo, answers, lang);
        let pdf;
        try {
          pdf = await toPdf(result.doc, lang);
        } catch (e) {
          console.error('memo pdf', e.message);
          return res.redirect(303, `${back}&m=busy`);
        }
        // Store the contact before anything is sent; if storing fails, nothing leaves the server.
        try {
          await addMemoContact(email, memo.id, lang, result.level, waitlist);
        } catch (e) {
          console.error('memo contact', e.message);
          return res.redirect(303, `${back}&m=busy`);
        }
        // Counting is separate: a counting error neither blocks the mail nor leads to a second contact row on retry.
        await countHit(`${path}/sent`, lang, '').catch((e) => console.error('memo count', e.message));
        const link = `${originOf(req)}${back}`;
        const mail = memoMail(memo, lang, result, link);
        const name = `scutoria-memo-${memo.id}-${lang}-${result.date}.pdf`;
        const out = await sendMail({ to: email, subject: mail.subject, text: mail.text, attachments: [{ name, content: Buffer.from(pdf).toString('base64') }] });
        // Awaited: on Workers a promise left running after the response may be cut off.
        if (config.memos.brevoListId) await addToBrevoList(email, config.memos.brevoListId).catch((e) => console.error('brevo list', e.message));
        if (!out.sent && out.reason === 'no-mail-service' && pdfOpen()) return res.redirect(303, `${back}&m=preview`);
        // A mail that failed for any other reason is not "on its way".
        if (!out.sent) return res.redirect(303, `${back}&m=busy`);
        return res.redirect(303, `${back}&m=sent`);
      });
    }
  }
}
