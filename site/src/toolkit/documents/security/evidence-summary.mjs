// Document D7 of the Security Evidence Toolkit: the evidence summary. One dated page with a document number: per area what is in place,
// what is partly there and what is open, the dates that matter, and a signature line. Open items are listed, never hidden.
import { B, makeDoc } from '../blocks.mjs';
import { questionsOf, isStatusQuestion, statusOf, targetDate, sectionTitle, fmtDate } from './self-declaration.mjs';
import { reviewDateOf, planRows } from './action-plan.mjs';

const T = {
  en: {
    kicker: 'Evidence summary · Security Evidence Toolkit', title: (b) => `What ${b} has in place`,
    prepared: 'Prepared', review: 'Review due', docId: 'Document', firstWave: 'First measures by',
    areaDetail: (ok, warn, open, na) => [ok ? `${ok} in place` : '', warn ? `${warn} partly` : '', open ? `${open} not yet` : '', na ? `${na} not applicable` : ''].filter(Boolean).join(' · '),
    items: {
      decl: 'Security self-declaration', declDetail: (d, who) => `State as of ${d} · to be signed by ${who}`,
      plan: 'Action plan', planDetail: (n, d) => (n ? `${n} measure${n === 1 ? '' : 's'} open · first wave by ${d}` : 'No open measures'),
      card: 'Emergency card', cardOk: 'Posted · contacts and deadlines on it', cardOpen: (d) => `To print and post by ${d}`,
      contact: 'Responsible for information security', contactDetail: (who, how) => `${who}${how ? ` · ${how}` : ''}`,
      deadline: 'Reporting deadline to customers',
    },
    note: 'Open items are listed, not hidden. This summary describes what the business has in place and documented on the date above; it certifies nothing and establishes no legal consequence. Source-based. No legal advice.',
    sign: ['Signed for the business (management)', 'Date'],
    // The same three words as the self-declaration (D1).
    word: { ok: 'In place', warn: 'Partly', open: 'Not yet' },
  },
  de: {
    kicker: 'Nachweisseite · Sicherheitsnachweis-Toolkit', title: (b) => `Was ${b} vorweisen kann`,
    prepared: 'Erstellt', review: 'Prüfung fällig', docId: 'Dokument', firstWave: 'Erste Maßnahmen bis',
    areaDetail: (ok, warn, open, na) => [ok ? `${ok} vorhanden` : '', warn ? `${warn} teilweise` : '', open ? `${open} noch nicht` : '', na ? `${na} nicht anwendbar` : ''].filter(Boolean).join(' · '),
    items: {
      decl: 'Selbstauskunft Informationssicherheit', declDetail: (d, who) => `Stand ${d} · zu unterschreiben von ${who}`,
      plan: 'Maßnahmenplan', planDetail: (n, d) => (n ? `${n} Maßnahme${n === 1 ? '' : 'n'} offen · erste Welle bis ${d}` : 'Keine offenen Maßnahmen'),
      card: 'Notfallkarte', cardOk: 'Ausgehängt · Kontakte und Fristen darauf', cardOpen: (d) => `Zu drucken und auszuhängen bis ${d}`,
      contact: 'Verantwortlich für Informationssicherheit', contactDetail: (who, how) => `${who}${how ? ` · ${how}` : ''}`,
      deadline: 'Meldefrist an Kunden',
    },
    note: 'Offene Punkte werden aufgeführt, nicht versteckt. Diese Zusammenfassung beschreibt, was der Betrieb am oben genannten Datum vorweisen und belegen kann; sie bescheinigt nichts und stellt keine Rechtsfolge fest. Quellenbasiert. Keine Rechtsberatung.',
    sign: ['Unterschrift für den Betrieb (Leitung)', 'Datum'],
    word: { ok: 'Vorhanden', warn: 'Teilweise', open: 'Noch nicht' },
  },
};

export function securityDocumentId(run) {
  const year = (run?.created_at ?? new Date().toISOString()).slice(0, 4);
  return `SE-${year}-${String(run?.id ?? '').replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase() || '……'}`;
}

export function evidenceSummaryDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const fd = (iso) => fmtDate(iso, lang, answers);
  const item = (label, status, detail, word) => ({ label, status, word: word ?? t.word[status], detail });
  const items = [];
  for (const area of ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']) {
    const counts = { ok: 0, warn: 0, open: 0, na: 0 };
    for (const q of questionsOf(def)) if (q.block === area && isStatusQuestion(q)) counts[statusOf(q, A(q.id))] += 1;
    const status = counts.open ? 'open' : counts.warn ? 'warn' : 'ok';
    // A mixed area shows its weakest state with the number of points in it.
    const mixed = [counts.ok, counts.warn, counts.open].filter(Boolean).length > 1;
    items.push(item(sectionTitle(area, lang), status, t.areaDetail(counts.ok, counts.warn, counts.open, counts.na), mixed ? `${t.word[status]} (${counts[status]})` : undefined));
  }
  const open = planRows(def, answers, lang).length;
  const I = t.items;
  items.push(item(I.decl, 'ok', I.declDetail(fd(A('I2').date || today), A('A4').text || '…')));
  // The plan itself is in place; its open measures are counted in the detail and in the areas above.
  items.push(item(I.plan, 'ok', I.planDetail(open, fd(A('I3').date) || '…')));
  items.push(item(I.card, A('D4').value === 'yes' ? 'ok' : 'open', A('D4').value === 'yes' ? I.cardOk : I.cardOpen(fd(targetDate(answers, 1)) || '…')));
  items.push(item(I.contact, 'ok', I.contactDetail(A('A4').text || '…', A('A4').contact)));
  const f1 = questionsOf(def).find((q) => q.id === 'F1');
  const f1Label = f1 ? (f1.options.find((o) => o.v === A('F1').value) ?? {})[lang] ?? '' : '';
  items.push(item(I.deadline, 'ok', f1Label || '…'));
  const id = securityDocumentId(ctx.run);
  return makeDoc({
    id: 'evidence-summary', lang, cls: 'pg--evidence', title: t.title(business), business,
    runLeft: `Scutoria · ${t.kicker}`, runRight: id,
    pageHead: `${business} · ${t.kicker.split(' · ')[0]} · ${fd(today)}`,
    meta: [{ label: t.prepared, value: fd(today) }, { label: t.review, value: fd(reviewDateOf(answers)) || '…' }, { label: t.docId, value: id }],
    blocks: [B.status(items), B.note(t.note), B.sign(t.sign)],
    footerRight: `${business} · ${id}`,
    // One page in print: thirteen rows, the note and the signature.
    printCss: '@page { size: A4; margin: 12mm 16mm 12mm 16mm; } .pg--evidence { gap: 10px; } .pg--evidence .sc-ev__item { padding: 5px 0; font-size: 13px; } .pg--evidence .sc-ev__item small { font-size: 11px; } .pg--evidence .pg__note { font-size: 10.5px; } .pg--evidence .pg__signs { margin-top: 10px; } .pg--evidence .pg__sign { margin-top: 18px; }',
  });
}
