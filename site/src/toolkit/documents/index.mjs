// The document register of the AI Policy Toolkit: what exists, in which formats, and how each is produced.
import JSZip from 'jszip';
import { toHtml, toDocx } from './blocks.mjs';
import { toPdf } from './pdf.mjs';
import { toBuffer } from './xlsx.mjs';
import { policyDoc } from './policy.mjs';
import { posterDoc } from './poster.mjs';
import { registerWorkbook, approvalDoc } from './register.mjs';
import { trainingDoc, trainingWorkbook } from './training.mjs';
import { labellingDoc } from './labelling.mjs';
import { planWorkbook } from './plan.mjs';
import { evidenceDoc } from './evidence.mjs';
import { handbookPdf } from '../handbook.mjs';

export const DOCS = [
  { id: 'policy', nr: 'D1', kind: 'doc', build: policyDoc, title: { en: 'AI usage policy', de: 'KI-Nutzungsrichtlinie' }, text: { en: 'Nine sections, filled from your answers, with signature line.', de: 'Neun Paragrafen, aus Ihren Antworten gefüllt, mit Unterschriftszeile.' } },
  { id: 'poster', nr: 'D2', kind: 'doc', build: posterDoc, title: { en: 'The one page to post', de: 'Die eine Seite zum Aushängen' }, text: { en: 'Rule of doubt, what never goes in, what is checked, where to report.', de: 'Zweifelsregel, was nie hinein darf, was geprüft wird, wohin gemeldet wird.' } },
  { id: 'register', nr: 'D3', kind: 'xlsx', build: registerWorkbook, title: { en: 'Tool register', de: 'Tool-Register' }, text: { en: 'One row per tool, prefilled; approval check sheet; how to use.', de: 'Eine Zeile je Tool, vorbefüllt; Blatt Freigabeprüfung; Anleitung.' } },
  { id: 'approval', nr: 'D3', kind: 'doc', build: approvalDoc, title: { en: 'Approval form per tool', de: 'Freigabeformular je Tool' }, text: { en: 'One page per tool with the seven questions and the decision.', de: 'Eine Seite je Tool mit den sieben Fragen und der Entscheidung.' } },
  { id: 'training', nr: 'D4', kind: 'doc', build: trainingDoc, title: { en: 'Briefing record', de: 'Schulungsnachweis' }, text: { en: 'Attendance list per group with the contents prefilled.', de: 'Teilnehmerliste je Gruppe mit vorbefüllten Inhalten.' } },
  { id: 'training-overview', nr: 'D4', kind: 'xlsx', build: trainingWorkbook, title: { en: 'Briefing overview', de: 'Übersicht Einweisungen' }, text: { en: 'Per person and per briefing; names are entered by the business.', de: 'Je Person und je Einweisung; Namen trägt der Betrieb ein.' } },
  { id: 'labelling', nr: 'D5', kind: 'doc', build: labellingDoc, title: { en: 'Labelling checklist', de: 'Kennzeichnungs-Checkliste' }, text: { en: 'Article 50: role, inventory, provider evidence prefilled; sheets per case.', de: 'Artikel 50: Rolle, Inventar, Anbieternachweis vorbefüllt; Blätter je Fall.' } },
  { id: 'plan', nr: 'D6', kind: 'xlsx', build: planWorkbook, title: { en: 'Enactment plan', de: 'Plan der Inkraftsetzung' }, text: { en: 'Fifteen steps with responsibles and dates; review sheet.', de: 'Fünfzehn Schritte mit Verantwortlichen und Daten; Blatt Wiedervorlage.' } },
  { id: 'evidence', nr: 'D7', kind: 'doc', pdfOnly: true, build: evidenceDoc, title: { en: 'Evidence summary', de: 'Nachweisseite' }, text: { en: 'Dated: what is regulated, what is open, document id, signature.', de: 'Datiert: was geregelt ist, was offen ist, Dokumentnummer, Unterschrift.' } },
];

export const docById = (id, docs = DOCS) => docs.find((d) => d.id === id);

export function formatsOf(d) {
  if (d.kind === 'xlsx') return ['xlsx'];
  return d.pdfOnly ? ['html', 'pdf'] : ['html', 'pdf', 'docx'];
}

const slug = (s) => String(s || 'scutoria').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'scutoria';

export function fileName(d, answers, lang, fmt) {
  return `${slug(answers.A1?.text)}-${d.id}-${lang}.${fmt}`;
}

// Produces one document in one format. Returns { body, type, name }.
export async function produce(d, def, answers, lang, fmt, ctx = {}) {
  const name = fileName(d, answers, lang, fmt);
  if (d.kind === 'xlsx') {
    const wb = d.build(def, answers, lang, ctx);
    return { body: await toBuffer(wb), type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', name };
  }
  const doc = d.build(def, answers, lang, ctx);
  if (fmt === 'html') return { body: toHtml(doc), type: 'text/html', name };
  if (fmt === 'docx') return { body: await toDocx(doc, lang), type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name };
  if (fmt === 'pdf') return { body: await toPdf(doc, lang), type: 'application/pdf', name };
  throw new Error('format');
}

// All documents as one zip: PDF and DOCX for text documents, XLSX for workbooks, plus the handbook as PDF where the toolkit has one.
export async function produceZip(def, answers, lang, ctx = {}, { docs = DOCS, handbook = 'ai-policy' } = {}) {
  const zip = new JSZip();
  for (const d of docs) {
    for (const fmt of formatsOf(d).filter((f) => f !== 'html')) {
      const out = await produce(d, def, answers, lang, fmt, ctx);
      zip.file(out.name, out.body);
    }
  }
  if (handbook) zip.file(`${handbook}-handbook-${lang}.pdf`, await handbookPdf(handbook, lang));
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
