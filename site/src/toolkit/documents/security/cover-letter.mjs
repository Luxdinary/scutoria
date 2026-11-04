// Document D5 of the Security Evidence Toolkit: the cover letter to the customer or insurer, and the mapping of typical questionnaire
// questions to the self-declaration and to the ten areas of Article 21(2) of the NIS 2 Directive. Gaps are named with dates, never hidden.
// The letter is the business's own letter: its letterhead and address, the recipient's address block, place and date, space for the
// signature. While sender, recipient or the signatory's name are missing it is marked as a draft.
import { B, makeDoc } from '../blocks.mjs';
import { optionLabel } from '../../engine.mjs';
import { questionsOf, isStatusQuestion, statusOf, fieldValue, targetDate, fmtDate, isRoleLabel } from './self-declaration.mjs';
import { planRows } from './action-plan.mjs';
import { attachmentCount } from './evidence-list.mjs';

const T = {
  en: {
    title: 'Cover letter and questionnaire mapping', re: 'Subject', subject: (b) => `Security evidence of ${b}`,
    draft: 'DRAFT', draftLine: (m) => `DRAFT · missing: ${m.join(', ')}. Add the answers before sending.`,
    missing: { sender: 'postal address of the business', recipient: 'recipient', name: 'name of the signatory' },
    senderGap: '[postal address of the business]', recipientGap: '[name and address of the customer or insurer]', placeGap: '[place]', nameGap: '[name]', functionGap: '[function]',
    salutation: 'Dear Sir or Madam,',
    opening: {
      customer: (d) => `Thank you for your security questionnaire. Attached you find our security self-declaration as of ${d}. It answers the questions on the state of our information security; where your questionnaire asks something the self-declaration does not cover, the mapping table on the following page shows where the answer is, or we answer in writing on request.`,
      contract: (d) => `Thank you for the contract documents with security clauses. Attached you find our security self-declaration as of ${d}. We will send our comments on the individual clauses, with proposed wording where needed, separately.`,
      insurer: (d) => `Attached to our application you find our security self-declaration as of ${d}. It describes the state of our information security on that day, with the measures that are in place, those that are partly in place and those planned with a date.`,
      label: (d) => `In preparation of the requested label or audit, attached you find our security self-declaration as of ${d} with the evidence list and the action plan.`,
      own: (d) => `Attached you find our security self-declaration as of ${d}, prepared so that we can answer a security questionnaire at any time.`,
    },
    size: (label, v) => (v === '1' ? 'a one-person business with no IT department of its own' : `a business with ${label} staff and no IT department of its own`),
    deliver: {
      goods: 'We deliver goods or materials and have no access to your data.',
      services: 'We provide services on site or in our workshop and handle some customer data (contacts, plans, orders).',
      it: 'We supply software, IT services or devices with software.',
      access: (x) => `We provide services with access to your systems or networks${x ? ` (${x})` : ''}.`,
    },
    sizeLine: (b, size, deliver) => `${b} is ${size}. ${deliver} The measures described are those of a business of our size; Article 21(1) of the NIS 2 Directive (EU) 2022/2555 names the size of the entity among the criteria of proportionality.`,
    state: (ok, warn, open, na, d1, d3) => `Of the ${ok + warn + open + na} points of the self-declaration, ${ok} are in place today, ${warn} partly, ${open} not yet${na ? `, ${na} not applicable to us` : ''}. For every point that is partly or not yet in place, the attached action plan names the measure, the responsible person and the date: the first wave by ${d1}, the rest by ${d3}. We prefer to name a gap with a date rather than answer yes where it is not true.`,
    stateClean: (ok, na) => `All ${ok} applicable points of the self-declaration are in place today${na ? `; ${na} points do not apply to us` : ''}. We renew the self-declaration once a year and when something essential changes.`,
    deadline: (how, who) => `We report incidents that may affect you ${how}; the report comes from ${who}.`,
    roleWho: (role) => `the ${role.charAt(0).toLowerCase()}${role.slice(1)}`,
    condition: 'If one of the open points is a condition for the contract or the policy, please tell us; we will move it into the first wave.',
    financial: {
      yes: 'Please tell us in writing whether you classify our service as supporting a critical or important function under DORA; the extent of the contractual requirements depends on it.',
      unknown: 'If you are a financial entity under DORA, please tell us in writing whether you classify our service as supporting a critical or important function; the extent of the contractual requirements depends on it.',
      noIct: 'If you are a financial entity under DORA: our service is not an ICT service. Article 30 DORA governs contracts on ICT services; please tell us if you see this differently.',
    },
    attachments: (n) => `Attachments: Security self-declaration; Action plan; Evidence list with the documents numbered ${n > 1 ? `Att. 1 to ${n}` : 'Att. 1'}.`,
    closing: 'Kind regards',
    mappingH: 'Questionnaire mapping', mappingIntro: 'Questionnaires of different customers ask largely the same things in different words and orders. This table maps the typical questions to the sections of the self-declaration and to the areas of Article 21(2) of the NIS 2 Directive, with our answer in short form.',
    head: ['Typical question', 'Self-declaration', 'Art. 21(2)', 'Our answer'],
    none: 'not in Art. 21(2)',
    rows: [
      ['Who is responsible for information security, and how do we reach them?', 'A', '(a), (i)', ['A4']],
      ['Do you have written security rules or a policy?', 'B', '(a)', ['B1']],
      ['Do you hold a certificate (ISO 27001, label) or audit reports?', 'B', '(f)', ['B3']],
      ['Do you have cyber insurance?', 'B', null, ['B2']],
      ['Is multi-factor authentication enforced for email, remote access and administration?', 'C', '(j)', ['C2', 'C3']],
      ['How are access rights removed when staff leave?', 'C', '(i)', ['C4']],
      ['What is your password policy, and are administrator rights restricted?', 'C', '(i)', ['C6', 'C5']],
      ['How often do you back up, is a copy offline, and when was a restore tested?', 'D', '(c)', ['D1', 'D2']],
      ['How long can you bridge an IT outage, have you tested a restore, and is there an emergency plan?', 'D', '(c)', ['D3', 'D2', 'D4']],
      ['Within what time are updates installed, and are all systems supported?', 'E', '(e)', ['E1', 'E2']],
      ['Are devices protected and encrypted, and is the network segmented?', 'E', '(e), (h)', ['E3', 'E5']],
      ['How do you handle vulnerabilities in your products?', 'E', '(e)', ['E4']],
      ['Within what time do you notify us of incidents?', 'F', '(b)', ['F1']],
      ['Have you had incidents in the last 24 months, and do you log them?', 'F', '(b)', ['F3', 'F4']],
      ['Do you train staff, and are they bound to confidentiality?', 'G', '(g), (i)', ['G1', 'G2']],
      ['Which subcontractors process our data, where, and under which contracts?', 'H', '(d)', ['H1', 'H2', 'H3']],
      ['How are our data returned or deleted at the end of the contract?', 'I', null, ['I1']],
    ],
    audit: ['May we audit you, or receive evidence?', 'B, I', '(f)', 'Evidence list (D4): we provide it and the documents behind it on request and renew the self-declaration once a year; on-site audits by arrangement, with notice and at the auditing party\'s cost.'],
    // Short labels for answers that combine several questions ("Password rule: partly, by …; admin rights: not yet, by …").
    short: { A4: 'responsible', B1: 'written rules', B2: 'cyber insurance', B3: 'certificates', C2: 'MFA for email', C3: 'MFA for remote access and administration', C4: 'access removal', C5: 'admin rights', C6: 'password rule', D1: 'backup', D2: 'restore test', D3: 'tolerable downtime', D4: 'emergency plan', E1: 'updates', E2: 'device list', E3: 'protection and encryption', E4: 'vulnerability contact', E5: 'router and guest network', F1: 'reporting deadline', F3: 'incidents', F4: 'incident log', G1: 'briefing', G2: 'confidentiality', H1: 'provider list', H2: 'processing agreements and console settings', H3: 'notice before a provider change', I1: 'return or deletion' },
    word: { yes: 'in place', partly: 'partly', notyet: 'not yet', na: 'not applicable' }, by: (d) => `by ${d}`,
    note: 'Generated with the Scutoria Security Evidence Toolkit from the answers of the business. Gaps are named with dates, never hidden; nothing here promises that the business meets a rule. Sources read at the original on 23 October 2026: Directive (EU) 2022/2555, Art. 21(1) and (2); Regulation (EU) 2022/2554 (DORA), Art. 30. Source-based. No legal advice.',
  },
  de: {
    title: 'Antwortschreiben und Fragebogen-Abgleich', re: 'Betreff', subject: (b) => `Sicherheitsnachweis von ${b}`,
    draft: 'ENTWURF', draftLine: (m) => `ENTWURF · fehlt: ${m.join(', ')}. Vor dem Versand die Antworten ergänzen.`,
    missing: { sender: 'Postanschrift des Betriebs', recipient: 'Empfänger', name: 'Name der unterzeichnenden Person' },
    senderGap: '[Postanschrift des Betriebs]', recipientGap: '[Name und Anschrift des Kunden oder Versicherers]', placeGap: '[Ort]', nameGap: '[Name]', functionGap: '[Funktion]',
    salutation: 'Sehr geehrte Damen und Herren,',
    opening: {
      customer: (d) => `vielen Dank für Ihren Sicherheitsfragebogen. Beigelegt finden Sie unsere Selbstauskunft Informationssicherheit mit Stand ${d}. Sie beantwortet die Fragen zum Stand unserer Informationssicherheit; wo Ihr Fragebogen etwas fragt, was die Selbstauskunft nicht abdeckt, zeigt die Abgleichtabelle auf der folgenden Seite, wo die Antwort steht, oder wir antworten auf Anfrage schriftlich.`,
      contract: (d) => `vielen Dank für die Vertragsunterlagen mit Sicherheitsklauseln. Beigelegt finden Sie unsere Selbstauskunft Informationssicherheit mit Stand ${d}. Unsere Anmerkungen zu den einzelnen Klauseln, wo nötig mit Formulierungsvorschlag, senden wir gesondert.`,
      insurer: (d) => `unserem Antrag legen wir unsere Selbstauskunft Informationssicherheit mit Stand ${d} bei. Sie beschreibt den Stand unserer Informationssicherheit an diesem Tag, mit den Maßnahmen, die vorhanden sind, denen, die teilweise vorhanden sind, und denen, die mit Termin geplant sind.`,
      label: (d) => `zur Vorbereitung des verlangten Gütesiegels oder der Prüfung finden Sie beigelegt unsere Selbstauskunft Informationssicherheit mit Stand ${d}, die Nachweisliste und den Maßnahmenplan.`,
      own: (d) => `beigelegt finden Sie unsere Selbstauskunft Informationssicherheit mit Stand ${d}, erstellt, damit wir einen Sicherheitsfragebogen jederzeit beantworten können.`,
    },
    size: (label, v) => (v === '1' ? 'ein Ein-Personen-Betrieb ohne eigene IT-Abteilung' : `ein Betrieb mit ${label} Beschäftigten ohne eigene IT-Abteilung`),
    deliver: {
      goods: 'Wir liefern Waren oder Material und haben keinen Zugriff auf Ihre Daten.',
      services: 'Wir erbringen Leistungen vor Ort oder in unserer Werkstatt und verarbeiten dabei einige Kundendaten (Kontakte, Pläne, Aufträge).',
      it: 'Wir liefern Software, IT-Dienstleistungen oder Geräte mit Software.',
      access: (x) => `Wir erbringen Leistungen mit Zugriff auf Ihre Systeme oder Netze${x ? ` (${x})` : ''}.`,
    },
    sizeLine: (b, size, deliver) => `${b} ist ${size}. ${deliver} Die beschriebenen Maßnahmen sind die eines Betriebs unserer Größe; Artikel 21 Absatz 1 der NIS-2-Richtlinie (EU) 2022/2555 nennt die Größe der Einrichtung ausdrücklich unter den Kriterien der Verhältnismäßigkeit.`,
    state: (ok, warn, open, na, d1, d3) => `Von den ${ok + warn + open + na} Punkten der Selbstauskunft sind heute ${ok} vorhanden, ${warn} teilweise, ${open} noch nicht${na ? `, ${na} auf uns nicht anwendbar` : ''}. Für jeden Punkt, der teilweise oder noch nicht vorhanden ist, nennt der beigelegte Maßnahmenplan die Maßnahme, die verantwortliche Person und den Termin: die erste Welle bis ${d1}, der Rest bis ${d3}. Wir nennen lieber eine Lücke mit Termin, als ein Ja zu schreiben, das nicht stimmt.`,
    stateClean: (ok, na) => `Alle ${ok} anwendbaren Punkte der Selbstauskunft sind heute vorhanden${na ? `; ${na} Punkte treffen auf uns nicht zu` : ''}. Wir erneuern die Selbstauskunft einmal im Jahr und wenn sich etwas Wesentliches ändert.`,
    deadline: (how, who) => `Vorfälle, die Sie betreffen könnten, melden wir ${how}; die Meldung kommt von ${who}.`,
    roleWho: (role) => role,
    condition: 'Ist einer der offenen Punkte Bedingung für den Vertrag oder die Police, sagen Sie uns bitte Bescheid; wir ziehen ihn in die erste Welle vor.',
    financial: {
      yes: 'Bitte teilen Sie uns schriftlich mit, ob Sie unsere Leistung als Unterstützung einer kritischen oder wichtigen Funktion nach DORA einstufen; davon hängt der Umfang der vertraglichen Anforderungen ab.',
      unknown: 'Wenn Sie ein Finanzunternehmen unter DORA sind, teilen Sie uns bitte schriftlich mit, ob Sie unsere Leistung als Unterstützung einer kritischen oder wichtigen Funktion einstufen; davon hängt der Umfang der vertraglichen Anforderungen ab.',
      noIct: 'Falls Sie ein Finanzunternehmen unter DORA sind: Unsere Leistung ist keine IKT-Dienstleistung. Art. 30 DORA regelt Verträge über IKT-Dienstleistungen; bitte sagen Sie uns, wenn Sie das anders sehen.',
    },
    attachments: (n) => `Anlagen: Selbstauskunft Informationssicherheit; Maßnahmenplan; Nachweisliste mit den Unterlagen ${n > 1 ? `Anl. 1 bis ${n}` : 'Anl. 1'}.`,
    closing: 'Mit freundlichen Grüßen',
    mappingH: 'Fragebogen-Abgleich', mappingIntro: 'Fragebögen verschiedener Kunden fragen zum größten Teil dasselbe, in anderen Worten und anderer Reihenfolge. Diese Tabelle ordnet die typischen Fragen den Abschnitten der Selbstauskunft und den Bereichen des Artikels 21 Absatz 2 der NIS-2-Richtlinie zu, mit unserer Antwort in Kurzform.',
    head: ['Typische Frage', 'Selbstauskunft', 'Art. 21 Abs. 2', 'Unsere Antwort'],
    none: 'nicht in Art. 21 Abs. 2',
    rows: [
      ['Wer ist für Informationssicherheit verantwortlich, und wie erreichen wir die Person?', 'A', 'a, i', ['A4']],
      ['Gibt es schriftliche Sicherheitsregeln oder eine Richtlinie?', 'B', 'a', ['B1']],
      ['Haben Sie ein Zertifikat (ISO 27001, Gütesiegel) oder Prüfberichte?', 'B', 'f', ['B3']],
      ['Haben Sie eine Cyberversicherung?', 'B', null, ['B2']],
      ['Ist Multi-Faktor-Authentifizierung für E-Mail, Fernzugriff und Administration erzwungen?', 'C', 'j', ['C2', 'C3']],
      ['Wie werden Zugriffsrechte beim Ausscheiden entzogen?', 'C', 'i', ['C4']],
      ['Welche Passwortregel gilt, und sind Administratorrechte beschränkt?', 'C', 'i', ['C6', 'C5']],
      ['Wie oft sichern Sie, liegt eine Kopie offline, und wann wurde eine Wiederherstellung geprobt?', 'D', 'c', ['D1', 'D2']],
      ['Wie lange überbrücken Sie einen IT-Ausfall, haben Sie eine Wiederherstellung geprobt, und gibt es einen Notfallplan?', 'D', 'c', ['D3', 'D2', 'D4']],
      ['Innerhalb welcher Zeit werden Updates installiert, und werden alle Systeme unterstützt?', 'E', 'e', ['E1', 'E2']],
      ['Sind Geräte geschützt und verschlüsselt, und ist das Netz segmentiert?', 'E', 'e, h', ['E3', 'E5']],
      ['Wie behandeln Sie Schwachstellen in Ihren Produkten?', 'E', 'e', ['E4']],
      ['Innerhalb welcher Zeit melden Sie uns Vorfälle?', 'F', 'b', ['F1']],
      ['Gab es in den letzten 24 Monaten Vorfälle, und protokollieren Sie sie?', 'F', 'b', ['F3', 'F4']],
      ['Schulen Sie Ihre Beschäftigten, und sind sie zur Vertraulichkeit verpflichtet?', 'G', 'g, i', ['G1', 'G2']],
      ['Welche Unterauftragnehmer verarbeiten unsere Daten, wo, und mit welchen Verträgen?', 'H', 'd', ['H1', 'H2', 'H3']],
      ['Wie werden unsere Daten bei Vertragsende zurückgegeben oder gelöscht?', 'I', null, ['I1']],
    ],
    audit: ['Dürfen wir Sie prüfen oder Nachweise erhalten?', 'B, I', 'f', 'Nachweisliste (D4): Wir legen sie und die Dokumente dahinter auf Anfrage vor und erneuern die Selbstauskunft einmal im Jahr; Prüfungen vor Ort nach Vereinbarung, mit Ankündigung und auf Kosten der prüfenden Seite.'],
    short: { A4: 'Verantwortlich', B1: 'Schriftliche Regeln', B2: 'Cyberversicherung', B3: 'Zertifikate', C2: 'MFA für E-Mail', C3: 'MFA für Fernzugriff und Administration', C4: 'Rechteentzug', C5: 'Administratorrechte', C6: 'Passwortregel', D1: 'Sicherung', D2: 'Wiederherstellungstest', D3: 'Tolerierbare Ausfallzeit', D4: 'Notfallplan', E1: 'Updates', E2: 'Geräteliste', E3: 'Schutz und Verschlüsselung', E4: 'Schwachstellenkontakt', E5: 'Router und Gastnetz', F1: 'Meldefrist', F3: 'Vorfälle', F4: 'Vorfallsprotokoll', G1: 'Einweisung', G2: 'Vertraulichkeit', H1: 'Dienstleisterliste', H2: 'Auftragsverarbeitungsverträge und Konsoleneinstellungen', H3: 'Information vor Dienstleisterwechsel', I1: 'Rückgabe oder Löschung' },
    word: { yes: 'vorhanden', partly: 'teilweise', notyet: 'noch nicht', na: 'nicht anwendbar' }, by: (d) => `bis ${d}`,
    note: 'Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria aus den Antworten des Betriebs. Lücken werden mit Termin genannt, nie versteckt; nichts hier verspricht, dass der Betrieb eine Vorschrift erfüllt. Quellen am Original gelesen am 23. Oktober 2026: Richtlinie (EU) 2022/2555, Art. 21 Abs. 1 und 2; Verordnung (EU) 2022/2554 (DORA), Art. 30. Quellenbasiert. Keine Rechtsberatung.',
  },
};

const upperFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const lowerFirst = (s) => (s && !/^[A-Z]{2}/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const linesOf = (text) => String(text ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
// The town from the last line of an address: "1010 Wien" and "A-1010 Wien" become "Wien".
// The place is the postcode line (a country line may follow it); without a postcode line, the last line.
const POSTCODE = /^(?:[A-Z]{1,3}[- ])?\d{4,5}\s+/;
const townOf = (lines) => (lines.length ? ([...lines].reverse().find((l) => POSTCODE.test(l)) ?? lines[lines.length - 1]).replace(POSTCODE, '').trim() : '');

export function coverLetterDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const fd = (iso) => fmtDate(iso, lang, answers);
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const qs = questionsOf(def);
  const byId = Object.fromEntries(qs.map((q) => [q.id, q]));
  const declDate = fd(A('I2').date || today);
  const asks = A('A6').values ?? [];
  const kind = ['customer', 'contract', 'insurer', 'label', 'own'].find((k) => asks.includes(k)) ?? 'customer';
  const counts = { ok: 0, warn: 0, open: 0, na: 0 };
  for (const q of qs) if (isStatusQuestion(q)) counts[statusOf(q, A(q.id))] += 1;
  const open = planRows(def, answers, lang);
  const sizeLabel = optionLabel(byId.A3, A('A3').value, lang);
  const deliver = A('A7').value === 'access' ? t.deliver.access((A('A7').text ?? '').trim()) : (t.deliver[A('A7').value] ?? t.deliver.services);
  const how = lowerFirst(optionLabel(byId.F1, A('F1').value, lang));

  // Sender, recipient, signatory. What is missing stays a yellow field, and the letter carries the draft mark.
  const sender = linesOf(A('A10').text);
  const recipient = linesOf(A('A11').text);
  const a4 = A('A4');
  const roleLabel = optionLabel(byId.A4, a4.role, lang);
  const hasName = !isRoleLabel(byId.A4, a4.text);
  const name = hasName ? a4.text : '';
  const fn = hasName ? (a4.role === 'other' ? '' : roleLabel) : (a4.text || roleLabel);
  const who = `${hasName ? name : t.roleWho(a4.text || roleLabel)}${a4.contact ? `, ${a4.contact}` : ''}`;
  const missing = [!sender.length && t.missing.sender, !recipient.length && t.missing.recipient, !hasName && t.missing.name].filter(Boolean);
  const town = townOf(sender);
  const financial = A('A12').value ?? 'unknown';

  const letter = [
    ...(missing.length ? [B.gap(t.draftLine(missing))] : []),
    sender.length ? B.lines(sender) : B.lines([t.senderGap], true),
    B.space(1),
    recipient.length ? B.lines(recipient) : B.lines([t.recipientGap], true),
    B.space(1),
    town ? B.p(`${town}, ${fd(today)}`) : B.lines([`${t.placeGap}, ${fd(today)}`], true),
    B.h2(`${t.re}: ${t.subject(business)}`),
    B.p(t.salutation),
    B.p(t.opening[kind](declDate)),
    B.p(t.sizeLine(business, t.size(sizeLabel, A('A3').value), deliver)),
    B.p(open.length ? t.state(counts.ok, counts.warn, counts.open, counts.na, fd(A('I3').date) || '…', fd(targetDate(answers, 3)) || '…') : t.stateClean(counts.ok, counts.na)),
    B.p(t.deadline(how, who)),
    B.p(t.condition),
    // Goods and services without ICT (A7) fall outside Article 30 DORA, as in the clause checklist (D6) and handbook 1.3.
    ...(financial === 'yes' || financial === 'unknown' ? [B.p(['goods', 'services'].includes(A('A7').value) ? t.financial.noIct : t.financial[financial])] : []),
    B.p(t.attachments(attachmentCount(def, answers, lang))),
    B.p(t.closing),
    B.space(3),
    name ? B.lines([name]) : B.lines([t.nameGap], true),
    fn ? B.lines([`${fn}, ${business}`]) : B.lines([`${t.functionGap}, ${business}`], true),
  ];

  // The mapping answers in short form; where a question combines several answers, each part carries its label.
  const part = (id) => {
    const q = byId[id];
    const a = A(id);
    if (!q) return '';
    if (isStatusQuestion(q) && t.word[a.value]) {
      const detail = (a.text ?? '').trim();
      if (a.value === 'yes') return `${t.word.yes}${detail ? ` (${detail})` : ''}`;
      if (a.value === 'na') {
        const o = optionLabel(q, 'na', lang);
        const reason = detail || (o.includes(':') ? o.slice(o.indexOf(':') + 1).trim() : '');
        return `${t.word.na}${reason ? `: ${reason}` : ''}`;
      }
      return `${t.word[a.value]}${detail ? ` (${detail})` : ''}, ${t.by(fd(targetDate(answers, q.prio ?? 2)) || '…')}`;
    }
    return fieldValue(q, a, lang, answers);
  };
  const answer = (ids) => {
    const parts = ids.map((id) => [id, part(id)]).filter(([, p]) => p);
    if (parts.length === 1) return upperFirst(parts[0][1]);
    return parts.map(([id, p], i) => {
      const label = t.short[id] ?? id;
      const text = byId[id]?.type === 'select' && !isStatusQuestion(byId[id]) ? lowerFirst(p) : p;
      return `${i === 0 ? upperFirst(label) : label}: ${text}`;
    }).join('; ');
  };
  const rows = t.rows.map(([q, sec, art, ids]) => [q, sec, art ?? t.none, answer(ids)]);
  rows.push([t.audit[0], t.audit[1], t.audit[2], t.audit[3]]);
  const blocks = [
    ...letter,
    B.pagebreak(),
    B.h(t.mappingH),
    B.p(t.mappingIntro),
    B.table(t.head, rows, [30, 12, 12, 46]),
    B.note(t.note),
  ];
  const draft = missing.length ? t.draft : '';
  // The letterhead is the business itself; no tool name in the head of a letter the business sends.
  return makeDoc({
    id: 'cover-letter', lang, cls: 'pg--letter', title: business, business,
    runRight: draft, pageHead: [business, t.title, fd(today), draft].filter(Boolean).join(' · '),
    meta: [],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fd(today)}`,
    // The letter fits one page in print; the mapping follows on its own pages.
    printCss: '.pg--letter { gap: 8px; } .pg--letter .pg__title { font-size: 22px; } .pg--letter .pg__run { color: #B42318; } .pg--letter .pg__p { font-size: 12.5px; line-height: 1.4; } .pg--letter .pg__h3 { font-size: 13px; margin-top: 2px; } .pg--letter .pg__h { margin-top: 2px; } .pg--letter .pg__table { font-size: 11px; } .pg--letter .pg__space { line-height: 1; font-size: 12px; }',
  });
}
