// What is for sale: one annual licence per toolkit. Prices come from the configuration (E10, E14 for toolkit 1; E21 for toolkit 2).
import { config } from '../config.mjs';
import { countLicences } from '../db.mjs';

export const PRODUCTS = {
  'ai-policy': {
    id: 'ai-policy',
    months: 12,
    name: { en: 'AI Policy Toolkit', de: 'KI-Richtlinien-Toolkit' },
    description: {
      en: 'Annual licence for one business: generator with thirty-four questions, 29 of them required, seven documents as PDF, DOCX and XLSX, handbook with sources, evidence folder, updates for twelve months.',
      de: 'Jahreslizenz für einen Betrieb: Generator mit vierunddreißig Fragen, davon 29 Pflichtfragen, sieben Dokumente als PDF, DOCX und XLSX, Handbuch mit Quellen, Nachweisordner, Aktualisierungen für zwölf Monate.',
    },
    path: { en: '/toolkits/ai-policy', de: '/de/toolkits/ki-richtlinien' },
  },
  'security-evidence': {
    id: 'security-evidence',
    months: 12,
    name: { en: 'Security Evidence Toolkit', de: 'Sicherheitsnachweis-Toolkit' },
    description: {
      en: 'Annual licence for one business: generator with forty-seven questions, 40 of them required, seven documents as PDF, DOCX and XLSX, handbook with sources, evidence folder, updates for twelve months.',
      de: 'Jahreslizenz für einen Betrieb: Generator mit siebenundvierzig Fragen, davon 40 Pflichtfragen, sieben Dokumente als PDF, DOCX und XLSX, Handbuch mit Quellen, Nachweisordner, Aktualisierungen für zwölf Monate.',
    },
    path: { en: '/toolkits/security-evidence', de: '/de/toolkits/sicherheitsnachweis' },
  },
};

export const productById = (id) => PRODUCTS[id] ?? null;

// The price configuration of a product: the general values, overridden per product where set.
export const priceConfigOf = (product) => ({ priceCents: config.shop.priceCents, pilotPriceCents: config.shop.pilotPriceCents, pilotSeats: config.shop.pilotSeats, ...(config.shop.products?.[product.id] ?? {}) });

// The first buyers of each toolkit pay the founder price (E14, E21); afterwards the regular price (E10, E21).
export async function priceFor(product) {
  const c = priceConfigOf(product);
  const sold = await countLicences(product.id);
  const pilot = sold < c.pilotSeats;
  return { cents: pilot ? c.pilotPriceCents : c.priceCents, pilot, seatsLeft: Math.max(0, c.pilotSeats - sold) };
}

export function fmtPrice(cents, lang) {
  return new Intl.NumberFormat(lang === 'de' ? 'de-AT' : 'en-IE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
