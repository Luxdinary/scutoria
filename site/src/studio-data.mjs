// One source for the video programme: content/studio.json. The counters on the home page and on the studio page are
// derived from it, so the site never states more videos or shorts than the programme lists (audit F02, 4 November 2026).
// A programme target (studio.json "target") is named as a target, never as inventory.
import { readText } from './runtime/files.mjs';

export const STUDIO = JSON.parse(readText('content/studio.json'));

const ONES = {
  de: ['keine', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'],
  en: ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
};
const TENS = { de: { 20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig' }, en: { 20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty' } };

// Numbers written out, as the site does elsewhere ("Siebenundvierzig Fragen"); counts above fifty-nine stay digits.
export function numberWord(n, lang = 'en') {
  const L = lang === 'de' ? 'de' : 'en';
  n = Math.max(0, Math.trunc(Number(n) || 0));
  if (n < 20) return ONES[L][n];
  const tens = Math.floor(n / 10) * 10, ones = n % 10;
  if (!TENS[L][tens]) return String(n);
  if (!ones) return TENS[L][tens];
  return L === 'de' ? `${ONES.de[ones]}und${TENS.de[tens]}` : `${TENS.en[tens]}-${ONES.en[ones]}`;
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const count = (list, status) => list.filter((x) => x.status === status).length;

export function studioCounts() {
  const videos = STUDIO.videos ?? [], shorts = STUDIO.shorts ?? [];
  return {
    videos: videos.length,
    shorts: shorts.length,
    videosInProduction: count(videos, 'production'),
    shortsInProduction: count(shorts, 'production'),
    published: count(videos, 'published') + count(shorts, 'published'),
    targetShorts: Math.trunc(Number(STUDIO.target?.shorts) || 0),
  };
}

// The status sentence follows the programme: what is published, what is in production, or that everything is planned.
function statusSentence(c, lang) {
  const w = (n) => numberWord(n, lang);
  if (lang === 'de') {
    if (c.published > 0) return `${cap(w(c.published))} ${c.published === 1 ? 'ist' : 'sind'} veröffentlicht, ${w(c.videosInProduction + c.shortsInProduction)} in Produktion.`;
    if (c.videosInProduction > 0) return `${cap(w(c.videosInProduction))} ${c.videosInProduction === 1 ? 'Erklärvideo ist' : 'Erklärvideos sind'} in Produktion, veröffentlicht ist noch keines; Termine folgen.`;
    return 'Alle sind geplant; Termine folgen.';
  }
  if (c.published > 0) return `${cap(w(c.published))} ${c.published === 1 ? 'is' : 'are'} published, ${w(c.videosInProduction + c.shortsInProduction)} in production.`;
  if (c.videosInProduction > 0) return `${cap(w(c.videosInProduction))} ${c.videosInProduction === 1 ? 'explainer is' : 'explainers are'} in production, none is published yet; dates follow.`;
  return 'All of them are planned; dates follow.';
}

function targetSentence(c, lang) {
  if (!(c.targetShorts > c.shorts)) return '';
  return lang === 'de' ? ` Das Programm ist auf ${numberWord(c.targetShorts, 'de')} Shorts angelegt.` : ` The programme is laid out for ${numberWord(c.targetShorts, 'en')} shorts.`;
}

// Fills {videos}, {shorts} (capitalised as {Videos}, {Shorts}), {status} and {target} in a text from cinema.mjs.
export function studioText(text, lang = 'en') {
  const c = studioCounts();
  const map = {
    videos: numberWord(c.videos, lang), Videos: cap(numberWord(c.videos, lang)),
    shorts: numberWord(c.shorts, lang), Shorts: cap(numberWord(c.shorts, lang)),
    status: statusSentence(c, lang), target: targetSentence(c, lang),
  };
  return String(text).replace(/\{(videos|Videos|shorts|Shorts|status|target)\}/g, (m, k) => map[k]);
}
