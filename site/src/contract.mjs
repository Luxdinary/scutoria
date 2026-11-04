// Contract details and the unchanged terms rendered through the existing block PDF renderer.
import MarkdownIt from 'markdown-it';
import { readText } from './runtime/files.mjs';
import { toPdf } from './toolkit/documents/pdf.mjs';
import { config } from './config.mjs';

export const viennaDate = (value, lang) => new Intl.DateTimeFormat(lang === 'de' ? 'de-AT' : 'en-GB', { timeZone: 'Europe/Vienna', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
export const viennaTime = (value, lang) => new Intl.DateTimeFormat(lang === 'de' ? 'de-AT' : 'en-GB', { timeZone: 'Europe/Vienna', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }).format(new Date(value));
export const viennaDay = (value) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value));

export function contractParagraph(licence, product, lang) {
  const purchase = viennaDate(licence.created_at ?? licence.starts_at, lang), end = viennaDate(licence.ends_at, lang);
  const amount = (licence.amount_cents / 100).toFixed(2).replace('.', lang === 'de' ? ',' : '.');
  const terms = `${config.baseUrl}${lang === 'de' ? '/de/agb' : '/terms'}`;
  return lang === 'de'
    ? `Ihre Bestellung: Jahreslizenz für das ${product}, gekauft am ${purchase}, Preis ${amount} Euro, gültig bis ${end}, ohne automatische Verlängerung. Es gelten unsere AGB: ${terms}. In der Kasse haben Sie ausdrücklich verlangt, dass der Zugang zum digitalen Inhalt sofort beginnt, und bestätigt, dass Sie dadurch Ihr Rücktrittsrecht verlieren (§ 18 Abs. 1 Z 11 FAGG).`
    : `Your order: annual licence for the ${product}, bought on ${purchase}, price ${amount} euro, valid until ${end}, no automatic renewal. Our terms apply: ${terms}. At checkout you expressly requested that access to the digital content starts immediately and confirmed that you thereby lose your right of withdrawal (section 18 (1) 11 FAGG).`;
}

const md = new MarkdownIt({ html: false, typographer: false });
export function termsModel(lang) {
  const raw = readText(`content/legal/${lang === 'de' ? 'agb.de' : 'terms.en'}.md`);
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const tokens = md.parse(body, {}), blocks = [];
  let title = '', heading = false;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== 'inline') continue;
    const text = (token.children ?? []).map((c) => c.type === 'softbreak' || c.type === 'hardbreak' ? '\n' : c.content).join('');
    const prior = tokens[i - 1];
    if (prior?.type === 'heading_open' && prior.tag === 'h1' && !title) { title = text; continue; }
    heading = prior?.type === 'heading_open';
    blocks.push(heading ? { t: 'h', text } : { t: 'p', text });
  }
  return { id: 'contract-terms', title, blocks };
}
export async function termsAttachment(lang, licence) {
  const bytes = await toPdf(termsModel(lang), lang);
  return { name: `scutoria-${lang === 'de' ? 'agb' : 'terms'}-${viennaDay(licence.created_at ?? licence.starts_at)}.pdf`, content: Buffer.from(bytes).toString('base64') };
}