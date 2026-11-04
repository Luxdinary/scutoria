// Document D7: the evidence summary. Dated, with a document id, what is regulated and what is open. Open items are listed, never hidden.
import { B, makeDoc, statusWord } from './blocks.mjs';
import { fmtDate, sourceLine } from './policy.mjs';
import { registerRows, privateUseReported } from './register.mjs';
import { trainingGroups } from './training.mjs';
import { labellingCases } from './labelling.mjs';
import { reviewDate } from './plan.mjs';

const T = {
  en: {
    kicker: 'Evidence summary · AI Policy Toolkit', title: (b, d) => `AI rules at ${b}: status on ${d}`,
    prepared: 'Prepared', review: 'Review due', docId: 'Document',
    items: {
      policy: 'AI usage policy', policyOk: (v, d, who) => `Version ${v} · in force since ${d} · signed by ${who}`, policyPlan: (v, d, who) => `Version ${v} · takes effect on ${d} · to be signed by ${who}`,
      register: 'Tool register', registerDetail: (n, u, priv) => `${n} tools recorded · ${u} unclear · ${priv ? 'private use reported (question B3), not yet ended' : 'no private account in use'}`, registerNone: 'No tools recorded yet',
      registerUnknown: (n, u) => `${n} tools recorded · ${u} unclear · private accounts: not known, to be clarified by [date]`, dateGap: '[date]',
      approval: 'Approval checks per tool', approvalDetail: (n) => `${n} form${n === 1 ? '' : 's'} to complete at the provider's pages · standard of the business set`,
      training: 'Briefing and training evidence (Art. 4 AI Act)', trainingPlan: (d, who, g) => `Planned for ${d} · conducted by ${who} · ${g}`,
      labelling: 'Labelling check (Art. 50 AI Act)', labellingNone: (d) => `No case at present, recorded on ${d}`, labellingOpen: (n) => `${n} case${n === 1 ? '' : 's'} to document per system or publication`,
      incident: 'Incident reporting channel', incidentDetail: (who, how) => `${who}${how ? ` · ${how}` : ''} · the report has no consequences`,
      doubt: 'Contact in case of doubt', doubtDetail: (who, how) => `${who}${how ? ` · ${how}` : ''}`,
      notYet: (d) => ` · set in the policy, in force from ${d}`,
      plan: 'Enactment plan', planDetail: (d) => `15 steps with responsibles · review on ${d}`,
    },
    src: [['aiAct', 'Art. 4 and Art. 50']],
    note: 'Open items are listed, not hidden. This summary describes what the business has decided and documented; it does not certify compliance. Source-based. No legal advice.',
    sign: ['Signed for the business', 'Date', 'Name, function (block letters)'],
  },
  de: {
    kicker: 'Nachweisseite · KI-Richtlinien-Toolkit', title: (b, d) => `KI-Regelung bei ${b}: Stand ${d}`,
    prepared: 'Erstellt', review: 'Wiedervorlage', docId: 'Dokument',
    items: {
      policy: 'KI-Nutzungsrichtlinie', policyOk: (v, d, who) => `Fassung ${v} · gültig seit ${d} · unterschrieben von ${who}`, policyPlan: (v, d, who) => `Fassung ${v} · gilt ab ${d} · zu unterschreiben von ${who}`,
      register: 'Tool-Register', registerDetail: (n, u, priv) => `${n} Tools erfasst · ${u} unklar · ${priv ? 'private Nutzung gemeldet (Frage B3), noch nicht beendet' : 'kein privates Konto in Gebrauch'}`, registerNone: 'Noch keine Tools erfasst',
      registerUnknown: (n, u) => `${n} Tools erfasst · ${u} unklar · private Konten: nicht bekannt, zu klären bis [Datum]`, dateGap: '[Datum]',
      approval: 'Freigabeprüfungen je Tool', approvalDetail: (n) => `${n} Formular${n === 1 ? '' : 'e'} an den Anbieterseiten auszufüllen · Maßstab des Betriebs festgelegt`,
      training: 'Einweisung und Schulungsnachweis (Art. 4 KI-VO)', trainingPlan: (d, who, g) => `Geplant für ${d} · Einweisung durch ${who} · ${g}`,
      labelling: 'Kennzeichnungs-Check (Art. 50 KI-VO)', labellingNone: (d) => `Derzeit kein Fall, festgehalten am ${d}`, labellingOpen: (n) => `${n} ${n === 1 ? 'Fall' : 'Fälle'} je System oder Veröffentlichung zu dokumentieren`,
      incident: 'Meldeweg für Vorfälle', incidentDetail: (who, how) => `${who}${how ? ` · ${how}` : ''} · die Meldung hat keine Folgen`,
      doubt: 'Ansprechperson im Zweifel', doubtDetail: (who, how) => `${who}${how ? ` · ${how}` : ''}`,
      notYet: (d) => ` · in der Richtlinie festgelegt, gilt ab ${d}`,
      plan: 'Plan der Inkraftsetzung', planDetail: (d) => `15 Schritte mit Verantwortlichen · Wiedervorlage am ${d}`,
    },
    src: [['aiAct', 'Art. 4 und Art. 50']],
    note: 'Offene Punkte werden aufgeführt, nicht versteckt. Diese Zusammenfassung beschreibt, was der Betrieb entschieden und dokumentiert hat; sie bescheinigt keine Rechtskonformität. Quellenbasiert. Keine Rechtsberatung.',
    sign: ['Unterschrift für den Betrieb', 'Datum', 'Name, Funktion (Druckschrift)'],
  },
};

// An answer such as "The owner" stands inside a sentence here, so its article is written small.
const inSentence = (s, lang) => (s && (lang === 'de' ? /^(Die|Der|Das) / : /^The /).test(s) ? s[0].toLowerCase() + s.slice(1) : s);

export function documentId(run) {
  const year = (run.created_at ?? new Date().toISOString()).slice(0, 4);
  return `AP-${year}-${String(run.id).replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase()}`;
}

export function evidenceDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const effective = A('I1').date;
  const inForce = !!effective && effective <= today;
  // Dates in the details are kept on one line with non-breaking spaces.
  const fd = (iso) => fmtDate(iso, lang).replace(/ /g, '\u00a0');
  const effectiveText = fd(effective) || '…';
  const tools = registerRows(def, answers, lang);
  const unclear = tools.filter((x) => x.account !== 'private').length;
  const privateUse = privateUseReported(answers) || tools.some((x) => x.account === 'private');
  const cases = labellingCases(answers, lang).filter((c) => c.yes).length;
  const groups = trainingGroups(answers, lang).join(', ');
  const I = t.items;
  const item = (label, status, detail) => ({ label, status, word: statusWord(status, lang), detail });
  // Reporting channel and contact come from the policy; before it takes effect they are planned, not regulated.
  const fromPolicy = (label, detail) => (inForce ? item(label, 'ok', detail) : item(label, 'warn', detail + I.notYet(effectiveText)));
  const items = [
    inForce ? item(I.policy, 'ok', I.policyOk(fd(today), effectiveText, A('A4').text)) : item(I.policy, 'warn', I.policyPlan(fd(today), effectiveText, A('A4').text)),
    // E26: when B3 is "unknown", private use is not reported but not known either; an open item with a date to fill.
    tools.length ? (answers.B3?.value === 'unknown' ? { ...item(I.register, 'open', I.registerUnknown(tools.length, unclear)), gapPart: I.dateGap } : item(I.register, unclear || privateUse ? 'open' : 'ok', I.registerDetail(tools.length, unclear, privateUse))) : item(I.register, 'open', I.registerNone),
    item(I.approval, 'open', I.approvalDetail(tools.length)),
    item(I.training, 'warn', I.trainingPlan(fd(A('H3').date) || '…', inSentence(A('H1').text, lang), groups)),
    cases ? item(I.labelling, 'open', I.labellingOpen(cases)) : item(I.labelling, 'ok', I.labellingNone(fd(today))),
    fromPolicy(I.incident, I.incidentDetail(A('A7').text, A('A7').contact)),
    fromPolicy(I.doubt, I.doubtDetail(A('A8').text, A('A8').contact)),
    item(I.plan, 'warn', I.planDetail(fd(reviewDate(answers)) || '…')),
  ];
  const id = ctx.run ? documentId(ctx.run) : 'AP-…';
  return makeDoc({
    id: 'evidence', lang, cls: 'pg--evidence', title: t.title(business, fmtDate(today, lang)), business,
    // The evidence page is one page: the three signature fields stand in one row.
    printCss: '.pg--evidence .pg__signs { grid-template-columns: 2fr 1fr 2fr; }',
    runLeft: `Scutoria · ${t.kicker}`, runRight: id,
    meta: [{ label: t.prepared, value: fmtDate(today, lang) }, { label: t.review, value: fmtDate(reviewDate(answers), lang) || '…' }, { label: t.docId, value: id }],
    blocks: [B.status(items), B.note(t.note), B.note(sourceLine(lang, t.src)), B.sign(t.sign)],
    footerRight: `${business} · ${id}`,
  });
}
