// The document register of the Security Evidence Toolkit: seven documents D1 to D7, as pages (HTML, PDF, DOCX) and workbooks (XLSX).
import { selfDeclarationDoc } from './self-declaration.mjs';
import { actionPlanDoc, actionPlanWorkbook } from './action-plan.mjs';
import { emergencyCardDoc } from './emergency-card.mjs';
import { evidenceListDoc, evidenceListWorkbook } from './evidence-list.mjs';
import { coverLetterDoc } from './cover-letter.mjs';
import { clauseChecklistDoc } from './clause-checklist.mjs';
import { evidenceSummaryDoc } from './evidence-summary.mjs';

export const SECURITY_DOCS = [
  { id: 'self-declaration', nr: 'D1', kind: 'doc', build: selfDeclarationDoc,
    title: { en: 'Security self-declaration', de: 'Selbstauskunft Informationssicherheit' },
    text: { en: 'Nine sections filled from your answers: what is in place, what is partly there, what is planned by when. Dated, with a signature line.', de: 'Neun Abschnitte aus Ihren Antworten: was vorhanden ist, was teilweise, was bis wann geplant ist. Datiert, mit Unterschriftszeile.' } },
  { id: 'action-plan', nr: 'D2', kind: 'doc', build: actionPlanDoc,
    title: { en: 'Action plan', de: 'Maßnahmenplan' },
    text: { en: 'Every “partly” and “not yet” as a measure with responsible, target date in three waves and the evidence that exists afterwards.', de: 'Jedes „teilweise“ und „noch nicht“ als Maßnahme mit Verantwortlichen, Termin in drei Wellen und dem Nachweis, der danach vorliegt.' } },
  { id: 'action-plan-sheet', nr: 'D2', kind: 'xlsx', build: actionPlanWorkbook,
    title: { en: 'Action plan as a worksheet', de: 'Maßnahmenplan als Tabelle' },
    text: { en: 'The same measures as a workbook with a “done on” column and the review sheet.', de: 'Dieselben Maßnahmen als Arbeitsmappe mit der Spalte „erledigt am“ und dem Blatt Wiedervorlage.' } },
  { id: 'emergency-card', nr: 'D3', kind: 'doc', build: emergencyCardDoc,
    title: { en: 'Emergency card', de: 'Notfallkarte' },
    text: { en: 'One page for the wall and the drawer: who to call with the numbers in large type, the first hour, the deadlines, where the backup and the account list are.', de: 'Eine Seite für die Wand und die Schublade: wen anrufen, mit den Nummern in großer Schrift, die erste Stunde, die Fristen, wo Sicherung und Kontenliste liegen.' } },
  { id: 'evidence-list', nr: 'D4', kind: 'doc', build: evidenceListDoc,
    title: { en: 'Evidence list', de: 'Nachweisliste' },
    text: { en: 'Which document proves which answer, what is on file with its attachment number, what is in place and still to be filed, what is missing with its date, and how it comes about.', de: 'Welches Dokument welche Antwort belegt, was mit Anlagennummer vorliegt, was vorhanden ist und noch abzulegen, was mit Termin fehlt, und wie es entsteht.' } },
  { id: 'evidence-list-sheet', nr: 'D4', kind: 'xlsx', build: evidenceListWorkbook,
    title: { en: 'Evidence list as a worksheet', de: 'Nachweisliste als Tabelle' },
    text: { en: 'The same list as a workbook with the columns “where” and “shown on” to fill in.', de: 'Dieselbe Liste als Arbeitsmappe mit den Spalten „wo“ und „vorgelegt am“ zum Ausfüllen.' } },
  { id: 'cover-letter', nr: 'D5', kind: 'doc', build: coverLetterDoc,
    title: { en: 'Cover letter and questionnaire mapping', de: 'Antwortschreiben und Fragebogen-Abgleich' },
    text: { en: 'The letter to the customer or insurer that names the gaps with dates, and the table that maps typical questionnaire questions to the self-declaration and to Article 21(2).', de: 'Der Brief an den Kunden oder Versicherer, der die Lücken mit Terminen nennt, und die Tabelle, die typische Fragebogenfragen der Selbstauskunft und Artikel 21 Absatz 2 zuordnet.' } },
  { id: 'clause-checklist', nr: 'D6', kind: 'doc', build: clauseChecklistDoc,
    title: { en: 'Clause checklist', de: 'Klausel-Prüfliste' },
    text: { en: 'The security clauses customers put into contracts: where each comes from, what it means, what a small business can accept, what to negotiate, your position today. Financial customers under DORA on a second sheet.', de: 'Die Sicherheitsklauseln, die Kunden in Verträge schreiben: woher jede kommt, was sie bedeutet, was ein kleiner Betrieb zusagen kann, was zu verhandeln ist, Ihre Lage heute. Finanzkunden unter DORA auf einem zweiten Blatt.' } },
  { id: 'evidence-summary', nr: 'D7', kind: 'doc', pdfOnly: true, build: evidenceSummaryDoc,
    title: { en: 'Evidence summary', de: 'Nachweisseite' },
    text: { en: 'One dated page with a document number: per area what is in place, what is partly there and what is open, the dates, a signature line.', de: 'Eine datierte Seite mit Dokumentnummer: je Bereich was vorhanden ist, was teilweise und was offen, die Termine, eine Unterschriftszeile.' } },
];

export const SECURITY_PLANNED = [];
