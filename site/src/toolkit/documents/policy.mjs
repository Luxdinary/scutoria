// Document D1: the AI usage policy, built from the answers. Nine sections, head and closing, in both languages.
import { optionLabel } from '../engine.mjs';
import { B, makeDoc, toHtml } from './blocks.mjs';

const T = {
  en: {
    title: 'AI usage policy', business: 'Business', effective: 'Effective from', version: 'Version', responsible: 'Responsible',
    purposeH: 'Purpose and scope',
    purpose: (others) => `This policy governs whether, under which conditions and for which purposes AI tools are used for work in this business. The business is the deployer of the tools used; the individual acts on its behalf. The policy applies to all employees${others ? ` and, as far as agreed by contract, to ${others}` : ''}.`,
    purposeSrc: [['aiAct', 'Art. 3 (4)']],
    s1: 'Permitted tools and access',
    s1a: (keeper) => `Only AI tools listed in the business's tool register with approval "yes" or "yes with restriction" (within the restriction) may be used for work. The register is kept by ${keeper}. Use takes place through the access provided by the business.`,
    s1forbidden: 'Private accounts are not permitted for work tasks.', s1limited: (t) => `Private accounts are permitted for work tasks only for: ${t}.`,
    s1b: (admin) => `Business accounts carry no personal names; a functional email address of the business is used. The business accounts are managed by ${admin}.`,
    s2: 'Permitted and prohibited uses',
    s2a: (uses) => `AI tools are used in this business for the following tasks: ${uses}.`,
    s2b: 'They are not used to select, filter, rank or assess applicants or staff, nor to prepare or make decisions on hiring, working conditions, promotion, task allocation, performance or termination.',
    s2c: (more) => `They are also not used for: ${more}.`,
    s3: 'Prohibited inputs',
    s3a: (except) => `${except ? 'Except as allowed in § 4, the' : 'The'} following is never entered into an AI tool, regardless of the access used: data about customers, staff and applicants by which a person can be identified; access data, passwords, keys and access codes; calculations, prices, contracts, customer lists and other information the business keeps confidential; health data; documents of third parties handed over in confidence`,
    s3b: (who) => `In case of doubt nothing is entered; ${who} is asked first.`,
    s4: 'Handling unavoidable personal data',
    s4never: 'If a task cannot avoid personal data, the task is not done with an AI tool. Removing names and addresses is not enough where the context brings the person back.',
    s4placeholders: (ex) => `If a task cannot avoid personal data, the text is drafted with placeholders and the details are inserted afterwards outside the tool${ex ? ` (for example: ${ex})` : ''}. Removing names and addresses is not enough where the context brings the person back.`,
    s4approved: 'If a task cannot avoid personal data, it is done only in a tool that the register approves for personal data. Removing names and addresses is not enough where the context brings the person back.',
    s5: 'Review before use',
    s5a: (extra) => `Every result of an AI tool is read and checked by the person using it before it is used. At least figures, names, deadlines and references are checked${extra ? `, and in this business also ${extra}` : ''}.`,
    s6: 'Release of documents leaving the business',
    s6a: (who, deputy) => `Documents that were produced or edited with an AI tool and leave the business are released by ${who}${deputy ? `; in their absence by ${deputy}` : ''}.`,
    s7: 'Labelling',
    s7a: (who) => `Whether and how it is disclosed that content was generated or altered with AI is decided by ${who} using the labelling checklist of the business. Labelling concerns AI systems that talk directly to people; images, audio and video that resemble real persons, objects, places or events and could be taken for genuine, including realistic people or scenes that never existed; and texts published on matters of public interest. Internal drafts and individual correspondence that a person checks and sends are not labelled.`,
    s7src: [['aiAct', 'Art. 3 (60) and Art. 50'], ['guide', 'point 113']],
    s8: 'Reporting incidents',
    s8a: (who, how) => `Anyone who notices that something confidential was entered into an AI tool by mistake or that a faulty result has left the business reports it immediately to ${who}${how ? ` (${how})` : ''}. The report itself has no consequences for the person reporting.`,
    s8b: (who) => `Interpretation: if personal data were concerned, ${who} checks the same day whether the incident must be notified to the data protection authority; notification is due without undue delay and, where feasible, within 72 hours after becoming aware of it, unless it is unlikely to result in a risk to the persons concerned (Art.\u00a033 GDPR).`,
    s8src: [['gdpr', 'Art. 4 (12) and Art. 33 (1)']],
    s9: 'Responsibility in case of doubt',
    s9a: (who, how) => `Anyone unsure whether a task, an input or a tool is permitted asks ${who}${how ? ` (${how})` : ''} before entering anything.`,
    closingH: 'Announcement, review, signature',
    announce: 'This policy is handed to every person it applies to; each person confirms receipt and reading, and the confirmation is recorded in the briefing overview.',
    review: (months) => `The policy is reviewed when a tool is added or changed, when a provider changes its terms, when the legal situation changes, and when practice deviates from the rule; in any case after ${months} months.`,
    folder: (where) => `The policy and the other evidence are kept at: ${where}.`,
    signature: 'Place, date, signature of the management', nameLine: 'Name, function (block letters)',
    note: 'Generated with the Scutoria AI Policy Toolkit. Source-based. No legal advice. The reasoning behind every section is in the handbook.',
  },
  de: {
    title: 'KI-Nutzungsrichtlinie', business: 'Betrieb', effective: 'Geltungsbeginn', version: 'Fassung', responsible: 'Verantwortlich',
    purposeH: 'Zweck und Geltung',
    purpose: (others) => `Diese Richtlinie regelt, ob, unter welchen Voraussetzungen und zu welchen Zwecken KI-Tools im Betrieb dienstlich eingesetzt werden. Der Betrieb ist Betreiber der eingesetzten Tools; die einzelne Person handelt in seinem Auftrag. Die Richtlinie gilt für alle Beschäftigten${others ? ` und, soweit vertraglich vereinbart, für ${others}` : ''}.`,
    purposeSrc: [['aiAct', 'Art. 3 Nr. 4']],
    s1: 'Zugelassene Tools und Zugänge',
    s1a: (keeper) => `Für dienstliche Aufgaben dürfen nur KI-Tools benutzt werden, die im Tool-Register des Betriebs mit Freigabe „ja“ oder „ja mit Einschränkung“ (im Rahmen der Einschränkung) stehen. Das Register führt ${keeper}. Die Nutzung erfolgt über den vom Betrieb bereitgestellten Zugang.`,
    s1forbidden: 'Private Konten sind für dienstliche Aufgaben nicht zulässig.', s1limited: (t) => `Private Konten sind für dienstliche Aufgaben nur zulässig für: ${t}.`,
    s1b: (admin) => `Betriebliche Konten tragen keine Personennamen; als E-Mail-Adresse dient eine Funktionsadresse des Betriebs. Die betrieblichen Konten verwaltet ${admin}.`,
    s2: 'Zulässige und unzulässige Verwendungen',
    s2a: (uses) => `KI-Tools werden im Betrieb für folgende Aufgaben eingesetzt: ${uses}.`,
    s2b: 'Nicht eingesetzt werden sie, um Bewerbungen oder Beschäftigte auszuwählen, zu sichten, zu reihen oder zu bewerten, und nicht, um Entscheidungen über Einstellung, Arbeitsbedingungen, Beförderung, Aufgabenzuteilung, Leistung oder Beendigung vorzubereiten oder zu treffen.',
    s2c: (more) => `Nicht eingesetzt werden sie außerdem für: ${more}.`,
    s3: 'Unzulässige Eingaben',
    s3a: (except) => `${except ? 'Soweit § 4 nichts anderes zulässt, werden folgende Angaben nie' : 'Folgende Angaben werden nie'} in ein KI-Tool eingegeben, gleich über welchen Zugang: Angaben zu Kunden, Beschäftigten und Bewerbern, mit denen eine Person erkennbar ist; Zugangsdaten, Passwörter, Schlüssel und Zutrittscodes; Kalkulationen, Preise, Verträge, Kundenlisten und andere Informationen, die der Betrieb geheim hält; Gesundheitsangaben; Unterlagen Dritter, die unter Vertraulichkeit übergeben wurden`,
    s3b: (who) => `Im Zweifel wird nichts eingegeben, sondern ${who} gefragt.`,
    s4: 'Umgang mit unvermeidbaren personenbezogenen Daten',
    s4never: 'Lässt sich ein Personenbezug in einer Aufgabe nicht vermeiden, wird die Aufgabe nicht mit einem KI-Tool erledigt. Das Entfernen von Namen und Anschriften genügt nicht, wenn sich der Bezug aus dem Zusammenhang wiederherstellen lässt.',
    s4placeholders: (ex) => `Lässt sich ein Personenbezug in einer Aufgabe nicht vermeiden, wird der Text mit Platzhaltern formuliert, und die Angaben werden nachher außerhalb des Tools eingesetzt${ex ? ` (zum Beispiel: ${ex})` : ''}. Das Entfernen von Namen und Anschriften genügt nicht, wenn sich der Bezug aus dem Zusammenhang wiederherstellen lässt.`,
    s4approved: 'Lässt sich ein Personenbezug in einer Aufgabe nicht vermeiden, wird sie nur in einem Tool erledigt, das im Register für personenbezogene Daten freigegeben ist. Das Entfernen von Namen und Anschriften genügt nicht, wenn sich der Bezug aus dem Zusammenhang wiederherstellen lässt.',
    s5: 'Prüfung vor Verwendung',
    s5a: (extra) => `Jedes Ergebnis eines KI-Tools wird von der Person, die es verwendet, gelesen und geprüft, bevor es verwendet wird. Geprüft werden mindestens Zahlen, Namen, Fristen und Fundstellen${extra ? `, im Betrieb außerdem ${extra}` : ''}.`,
    s6: 'Freigabe nach außen gerichteter Erzeugnisse',
    s6a: (who, deputy) => `Schriftstücke, die mit einem KI-Tool erstellt oder überarbeitet wurden und den Betrieb verlassen, gibt ${who} frei${deputy ? `; bei Abwesenheit ${deputy}` : ''}.`,
    s7: 'Kennzeichnung',
    s7a: (who) => `Ob und wie offengelegt wird, dass ein Inhalt mit KI erzeugt oder verändert wurde, entscheidet ${who} anhand der Kennzeichnungs-Checkliste des Betriebs. Die Kennzeichnung betrifft KI-Systeme, die direkt mit Personen sprechen; Bild-, Ton- und Videoinhalte, die wirklichen Personen, Gegenständen, Orten oder Ereignissen ähneln und für echt gehalten werden könnten, auch realistische Personen oder Szenen, die es nie gab; und Texte, die öffentlich zu Themen von öffentlichem Interesse veröffentlicht werden. Interne Entwürfe und Einzelkorrespondenz, die eine Person prüft und selbst versendet, werden nicht gekennzeichnet.`,
    s7src: [['aiAct', 'Art. 3 Nr. 60 und Art. 50'], ['guide', 'Rn. 113']],
    s8: 'Meldung von Vorfällen',
    s8a: (who, how) => `Wer bemerkt, dass versehentlich etwas Vertrauliches in ein KI-Tool eingegeben wurde oder ein fehlerhaftes Ergebnis nach außen gelangt ist, meldet das unverzüglich an ${who}${how ? ` (${how})` : ''}. Die Meldung selbst hat keine Folgen für die meldende Person.`,
    s8b: (who) => `Auslegung: Sind personenbezogene Daten betroffen, prüft ${who} noch am selben Tag, ob der Vorfall der Datenschutzbehörde zu melden ist; gemeldet wird unverzüglich und möglichst binnen 72 Stunden ab Kenntnis, außer der Vorfall führt voraussichtlich zu keinem Risiko für die Betroffenen (Art.\u00a033 DSGVO).`,
    s8src: [['gdpr', 'Art. 4 Nr. 12 und Art. 33 Abs. 1']],
    s9: 'Zuständigkeit für Zweifelsfälle',
    s9a: (who, how) => `Wer unsicher ist, ob eine Aufgabe, eine Eingabe oder ein Tool zulässig ist, fragt ${who}${how ? ` (${how})` : ''}, bevor etwas eingegeben wird.`,
    closingH: 'Bekanntgabe, Überprüfung, Unterschrift',
    announce: 'Diese Richtlinie wird jeder Person ausgehändigt, für die sie gilt; jede Person bestätigt Erhalt und Kenntnisnahme, die Bestätigung wird in der Übersicht zur Einweisung festgehalten.',
    review: (months) => `Die Richtlinie wird überprüft, wenn ein Tool hinzukommt oder sich ändert, wenn ein Anbieter seine Bedingungen ändert, wenn sich die Rechtslage ändert und wenn die Praxis von der Regel abweicht; in jedem Fall nach ${months} Monaten.`,
    folder: (where) => `Ablage der Richtlinie und der übrigen Nachweise: ${where}.`,
    signature: 'Ort, Datum, Unterschrift der Leitung', nameLine: 'Name, Funktion (Druckschrift)',
    note: 'Erzeugt mit dem Scutoria KI-Richtlinien-Toolkit. Quellenbasiert. Keine Rechtsberatung. Die Begründung zu jedem Paragrafen steht im Handbuch.',
  },
};

export function fmtDate(iso, lang) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// Every legal statement in the documents carries a source line with one retrieval date, kept here so that all documents state the same date.
export const RETRIEVED = '2026-10-23';
const SRC = {
  en: { label: 'Source', aiAct: (a) => `Regulation (EU) 2024/1689, ${a}, consolidated version of 27\u00a0July\u00a02026, EUR-Lex`, gdpr: (a) => `Regulation (EU) 2016/679, ${a}, EUR-Lex`, guide: (a) => `Commission guidelines C(2026) 5054, ${a}`, retrieved: (d) => `retrieved ${d}` },
  de: { label: 'Quelle', aiAct: (a) => `Verordnung (EU) 2024/1689, ${a}, konsolidierte Fassung vom 27.\u00a0Juli\u00a02026, EUR-Lex`, gdpr: (a) => `Verordnung (EU) 2016/679, ${a}, EUR-Lex`, guide: (a) => `Leitlinien der Kommission C(2026) 5054, ${a}`, retrieved: (d) => `abgerufen am ${d}` },
};
// parts: [['aiAct', 'Art. 50'], ['guide', 'point 154']] gives "Source: Regulation (EU) 2024/1689, Art. 50, consolidated version …, EUR-Lex; Commission guidelines …, retrieved 23 October 2026."
export function sourceLine(lang, parts) {
  const s = SRC[lang] ?? SRC.en;
  // Non-breaking spaces keep the retrieval date on one line.
  return `${s.label}: ${parts.map(([k, a]) => s[k](a)).join('; ')}, ${s.retrieved(fmtDate(RETRIEVED, lang).replace(/ /g, '\u00a0'))}.`;
}

export const joinList = (items, lang) => {
  const list = items.filter(Boolean);
  if (list.length <= 1) return list.join('');
  const and = lang === 'de' ? ' und ' : ' and ';
  return list.slice(0, -1).join(', ') + and + list[list.length - 1];
};

// Option labels for use inside a sentence. English labels start lowercase; German keeps its capitalised nouns.
export function multiLabels(q, a, lang, lower = true) {
  const vals = (a?.values ?? []).filter((v) => v !== 'none');
  const inSentence = (s) => (lower && lang === 'en' && s ? s[0].toLowerCase() + s.slice(1) : s);
  const labels = vals.filter((v) => v !== 'other').map((v) => inSentence(optionLabel(q, v, lang)));
  if (vals.includes('other') && a?.text) labels.push(a.text);
  return labels;
}

export function findQ(def, id) { return def.blocks.flatMap((b) => b.questions).find((q) => q.id === id); }

export const T_POLICY = T;

// Builds the structured policy from the answers.
export function policyModel(def, answers, lang, today = new Date().toISOString().slice(0, 10)) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  // The German options of A11 begin with an adjective ("Freie Mitarbeitende"), which is written small inside the sentence.
  const others = joinList(multiLabels(findQ(def, 'A11'), A('A11'), lang).map((s) => (lang === 'de' && s ? s[0].toLowerCase() + s.slice(1) : s)), lang);
  const uses = joinList(multiLabels(findQ(def, 'C1'), A('C1'), lang), lang);
  const extraData = multiLabels(findQ(def, 'D1'), A('D1'), lang);
  const extraChecks = joinList(multiLabels(findQ(def, 'F1'), A('F1'), lang), lang);
  const b4 = A('B4');
  const e1 = A('E1');
  const s4 = e1.value === 'never' ? t.s4never : e1.value === 'approved' ? t.s4approved : t.s4placeholders(e1.text);
  // A paragraph is a string; { note } is a source line printed small under it.
  const src = (parts) => ({ note: sourceLine(lang, parts) });
  const sections = [
    { n: '', title: t.purposeH, paras: [t.purpose(others), src(t.purposeSrc)] },
    { n: '§ 1', title: t.s1, paras: [t.s1a(A('A5').text), b4.value === 'limited' ? t.s1limited(b4.text || '…') : t.s1forbidden, t.s1b(A('B5').text)] },
    { n: '§ 2', title: t.s2, paras: [t.s2a(uses || '…'), t.s2b, ...(A('C2').text ? [t.s2c(A('C2').text)] : [])] },
    { n: '§ 3', title: t.s3, paras: [t.s3a(e1.value === 'approved') + (extraData.length ? '; ' + extraData.join('; ') : '') + '.', t.s3b(A('A8').text)] },
    { n: '§ 4', title: t.s4, paras: [s4] },
    { n: '§ 5', title: t.s5, paras: [t.s5a(extraChecks)] },
    { n: '§ 6', title: t.s6, paras: [t.s6a(A('A9').text, A('A9').deputy)] },
    { n: '§ 7', title: t.s7, paras: [t.s7a(A('A6').text), src(t.s7src)] },
    { n: '§ 8', title: t.s8, paras: [t.s8a(A('A7').text, A('A7').contact), t.s8b(A('A7').text), src(t.s8src)] },
    { n: '§ 9', title: t.s9, paras: [t.s9a(A('A8').text, A('A8').contact)] },
    { n: '', title: t.closingH, paras: [t.announce, t.review(A('I2').value || '12'), t.folder(A('I3').text || '…')], signature: [t.signature, t.nameLine] },
  ];
  return { t, lang, title: t.title, business: A('A1').text || '…', effective: fmtDate(A('I1').date, lang), version: fmtDate(today, lang), responsible: A('A4').text, sections };
}

export function policyDoc(def, answers, lang, ctx = {}) {
  const m = policyModel(def, answers, lang, ctx.today);
  const blocks = [];
  for (const s of m.sections) {
    blocks.push(B.h(s.title, s.n));
    for (const p of s.paras) blocks.push(typeof p === 'string' ? B.p(p) : B.note(p.note));
    if (s.signature) blocks.push(B.sign(s.signature));
  }
  return makeDoc({
    id: 'policy', lang, title: m.title, business: m.business,
    runLeft: `${m.business} · ${m.title}`, runRight: `${m.t.version} ${m.version}`,
    meta: [{ label: m.t.business, value: m.business }, { label: m.t.effective, value: m.effective }, { label: m.t.responsible, value: m.responsible }],
    blocks, footerLeft: m.t.note, footerRight: `${m.business} · ${m.title}`,
  });
}

export function policyHtml(def, answers, lang) { return toHtml(policyDoc(def, answers, lang)); }
