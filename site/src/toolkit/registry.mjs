// The toolkits the generator knows: their address slugs, their documents and whether a handbook and a price exist yet.
// Only toolkits in the shop's PRODUCTS are for sale; the others run in preview mode so that each stand can be read before it is finished.
import { DOCS } from './documents/index.mjs';
import { SECURITY_DOCS, SECURITY_PLANNED } from './documents/security/index.mjs';

export const TOOLKITS = [
  {
    id: 'ai-policy', nr: '01', line: 'policy', slugs: { en: 'ai-policy', de: 'ki-richtlinien' }, docs: DOCS, planned: [], handbook: true, forSale: true,
    handbookText: {
      en: 'The reasoning behind every document: nine areas, seven questions, Article 4, Article 50, country notes, open points, sources with retrieval dates.',
      de: 'Die Begründung hinter jedem Dokument: neun Regelbereiche, sieben Prüffragen, Artikel 4, Artikel 50, Ländernotizen, offene Punkte, Quellen mit Abrufdatum.',
    },
  },
  {
    id: 'security-evidence', nr: '02', line: 'security', slugs: { en: 'security-evidence', de: 'sicherheitsnachweis' }, docs: SECURITY_DOCS, planned: SECURITY_PLANNED, handbook: true, forSale: true,
    handbookText: {
      en: 'The reasoning behind every question: why you are asked, the sources per area, evidence in an hour, the emergency, country notes, open points, sources with retrieval dates.',
      de: 'Die Begründung hinter jeder Frage: warum Sie gefragt werden, die Quellen je Bereich, Nachweise in einer Stunde, der Notfall, Ländernotizen, offene Punkte, Quellen mit Abrufdatum.',
    },
  },
];

export const toolkitById = (id) => TOOLKITS.find((tk) => tk.id === id) ?? null;
export const toolkitBase = (tk, lang) => (lang === 'de' ? '/de/toolkits/' : '/toolkits/') + (tk.slugs[lang] ?? tk.slugs.en);
