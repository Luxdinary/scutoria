// Fourteen days before a licence ends, one reminder mail (A1: no automatic renewal). Called by a daily schedule through the protected route /api/public/hooks/reminders; there is no loop inside the server.
import { config } from '../config.mjs';
import { p } from '../i18n.mjs';
import { licencesDueForReminder, claimReminder, getCustomer } from '../db.mjs';
import { sendMail, templates } from '../mail.mjs';
import { fmtDate } from '../toolkit/documents/policy.mjs';
import { productById } from './products.mjs';

export async function sendReminders(origin = config.baseUrl, days = 14) {
  const due = await licencesDueForReminder(days);
  if (config.reminders !== 'on') {
    console.info(`reminders dry-run: ${due.length}`);
    return { dryRun: true, due: due.length, sent: 0 };
  }
  let n = 0;
  for (const licence of due) {
    const customer = await getCustomer(licence.customer_id);
    const product = productById(licence.product);
    if (!customer || !product) continue;
    // Claim before the external action: concurrent calls and provider ambiguity never cause a second send.
    if (!(await claimReminder(licence.id))) continue;
    const lang = customer.lang === 'de' ? 'de' : 'en';
    await sendMail({ to: customer.email, ...templates.reminder[lang](`${origin}${p('account', lang)}`, product.name[lang], fmtDate(licence.ends_at.slice(0, 10), lang)) });
    n++;
  }
  return { dryRun: false, due: due.length, sent: n };
}
