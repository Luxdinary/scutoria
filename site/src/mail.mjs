// Transactional mail through Brevo. Without an API key nothing leaves the server: the mail is kept in the outbox,
// and preview pages show the link instead. Nothing here names a person; the sender is the brand address.
import { config } from './config.mjs';
import { saveMail } from './db.mjs';
import { esc } from './layout.mjs';
import { contractParagraph } from './contract.mjs';

const textToHtml = (text) => `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#111">${esc(text).split('\n\n').map((para) => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('')}</div>`;

export const mailRetry = { ms: 1500 };
const RETRY_MS_GET = () => mailRetry.ms;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Returns { sent: boolean }. A failed or impossible send is recorded, never thrown at the user.
// attachments: [{ name, content }] with the content as a base64 string (a memo PDF, for example).
export async function sendMail({ to, subject, text, html, attachments = [] }) {
  const { brevoApiKey, from, fromName } = config.mail;
  if (!brevoApiKey) {
    await saveMail(to, subject, text, 'not-sent');
    return { sent: false, reason: 'no-mail-service' };
  }
  const body = JSON.stringify({ sender: { name: fromName, email: from }, to: [{ email: to }], subject, textContent: text, htmlContent: html ?? textToHtml(text), ...(attachments.length ? { attachment: attachments.map((a) => ({ name: a.name, content: a.content })) } : {}) });
  const post = () => fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': brevoApiKey, 'content-type': 'application/json', accept: 'application/json' },
    body,
  });
  // One retry after a short pause when the request throws or Brevo answers 401, 429 or 5xx; only the final outcome is recorded.
  const retryable = (status) => status === 401 || status === 429 || status >= 500;
  try {
    let res;
    try { res = await post(); } catch { await sleep(RETRY_MS_GET()); res = await post(); }
    if (!res.ok && retryable(res.status)) { await sleep(RETRY_MS_GET()); res = await post(); }
    if (!res.ok) {
      await saveMail(to, subject, text, `error ${res.status}`);
      return { sent: false, reason: `brevo ${res.status}` };
    }
    await saveMail(to, subject, '', 'sent');
    return { sent: true };
  } catch (e) {
    await saveMail(to, subject, text, `error ${e.message}`);
    return { sent: false, reason: e.message };
  }
}

// Adds an address to a Brevo contact list (the memo contacts, E11). Without a key or a list id nothing happens. Never throws.
export async function addToBrevoList(email, listId) {
  const { brevoApiKey } = config.mail;
  if (!brevoApiKey || !listId) return { added: false, reason: 'not-configured' };
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email, listIds: [Number(listId)], updateEnabled: true }),
    });
    return { added: res.ok, reason: res.ok ? '' : `brevo ${res.status}` };
  } catch (e) {
    return { added: false, reason: e.message };
  }
}

export const templates = {
  login: {
    en: (link) => ({ subject: 'Your Scutoria sign-in link', text: `Sign in with this link. It is valid for thirty minutes and works once:\n\n${link}\n\nIf you did not request it, ignore this email; nothing happens.\n\nScutoria\nkontakt@scutoria.com` }),
    de: (link) => ({ subject: 'Ihr Anmeldelink bei Scutoria', text: `Melden Sie sich mit diesem Link an. Er gilt dreißig Minuten und funktioniert einmal:\n\n${link}\n\nWenn Sie ihn nicht angefordert haben, ignorieren Sie diese E-Mail; es passiert nichts.\n\nScutoria\nkontakt@scutoria.com` }),
  },
  welcome: {
    en: (link, product, licence, attached = false) => ({ subject: `Your access to the ${product}`, text: `Thank you. Your annual licence for the ${product} is active for twelve months.\n\n${contractParagraph(licence, product, 'en')}\n\n${attached ? 'The terms are attached as a PDF.\n\n' : ''}Sign in here; the link is valid for seven days, and you can request a new one on the account page at any time:\n\n${link}\n\nIn the account you find the generator, the handbook and your evidence folder. Invoice and receipt: in the account under "Invoices and receipts".\n\nScutoria\nkontakt@scutoria.com` }),
    de: (link, product, licence, attached = false) => ({ subject: `Ihr Zugang zum ${product}`, text: `Danke. Ihre Jahreslizenz für das ${product} ist zwölf Monate aktiv.\n\n${contractParagraph(licence, product, 'de')}\n\n${attached ? 'Die AGB liegen als PDF bei.\n\n' : ''}Melden Sie sich hier an; der Link gilt sieben Tage, und auf der Kontoseite können Sie jederzeit einen neuen anfordern:\n\n${link}\n\nIm Konto finden Sie den Generator, das Handbuch und Ihren Nachweisordner. Rechnung und Beleg: im Konto unter „Rechnungen und Belege“.\n\nScutoria\nkontakt@scutoria.com` }),
  },
  reminder: {
    en: (accountUrl, product, endDate) => ({ subject: `Your ${product} licence ends on ${endDate}`, text: `Your annual licence for the ${product} ends on ${endDate}. It does not renew automatically.\n\nTo keep the generator and the updates, buy a new annual licence in your account:\n\n${accountUrl}\n\nThe documents you have produced stay in your evidence folder.\n\nScutoria\nkontakt@scutoria.com` }),
    de: (accountUrl, product, endDate) => ({ subject: `Ihre Lizenz für das ${product} endet am ${endDate}`, text: `Ihre Jahreslizenz für das ${product} endet am ${endDate}. Sie verlängert sich nicht automatisch.\n\nUm Generator und Aktualisierungen zu behalten, kaufen Sie in Ihrem Konto eine neue Jahreslizenz:\n\n${accountUrl}\n\nDie bisher erzeugten Dokumente bleiben in Ihrem Nachweisordner.\n\nScutoria\nkontakt@scutoria.com` }),
  },
};
