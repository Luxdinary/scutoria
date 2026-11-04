import { config } from '../config.mjs';
import { t, p } from '../i18n.mjs';
import { layout, esc } from '../layout.mjs';
import { loadContent } from '../markdown.mjs';

// key -> content file per language. Legal pages carry a draft notice until LEGAL_REVIEWED_AT is set; the about page does not.
const files = {
  legal: { en: 'legal/legal-notice.en.md', de: 'legal/impressum.de.md', legal: true },
  privacy: { en: 'legal/privacy.en.md', de: 'legal/datenschutz.de.md', legal: true },
  terms: { en: 'legal/terms.en.md', de: 'legal/agb.de.md', legal: true },
  withdrawal: { en: 'legal/withdrawal.en.md', de: 'legal/widerruf.de.md', legal: true },
  about: { en: 'about.en.md', de: 'about.de.md', legal: false },
};

export function legalPage(key, lang) {
  const s = t(lang);
  const entry = files[key];
  const { meta, html } = loadContent(entry[lang]);
  const reviewed = config.legalReviewedAt;
  let head = '';
  if (entry.legal) {
    head = reviewed
      ? `<div class="stamp">${lang === 'de' ? `Stand der rechtlichen Prüfung: ${esc(reviewed)}` : `Legal review: ${esc(reviewed)}`}</div>`
      : `<div class="draft">${esc(s.draft)}</div>`;
  }
  const body = `
<article class="wrap narrow doc">
  ${head}
  ${html}
</article>`;
  return layout({ lang, title: meta.title ?? key, description: meta.description ?? meta.title ?? key, body, alt: { en: p(key, 'en'), de: p(key, 'de') }, noindex: entry.legal && !reviewed });
}

export const legalKeys = Object.keys(files);
