// Document D6 of the Security Evidence Toolkit: the clause checklist. The security clauses customers put into contracts, where each
// comes from, what it means, what a small supplier can accept, what to negotiate, and the supplier's own position from the answers.
// Part A follows the eight contract contents of Implementing Regulation (EU) 2024/2690, Annex, point 5.1.4, plus three clauses without a legal
// source; part B the elements DORA requires in contracts of financial entities (Art. 30(2) and (3)). Advice columns are interpretation.
import { B, makeDoc } from '../blocks.mjs';
import { questionsOf, fieldValue, fmtDate } from './self-declaration.mjs';

const T = {
  en: {
    title: 'Clause checklist', kicker: 'Clause checklist · Security Evidence Toolkit', business: 'Business', date: 'Date',
    intro: 'Customers covered by the NIS 2 Directive must address supply chain security, including the security-related aspects of their relationships with suppliers (Art. 21(2)(d)). For cloud, data centre, managed and managed security service providers, online marketplaces and other digital providers, the Commission has listed eight contract contents (Implementing Regulation (EU) 2024/2690, Annex, point 5.1.4); many other customers copy them. Financial customers under DORA must include nine elements in every contract on ICT services and six more where the service supports a critical or important function. This list names each clause, what it means, what a business of your size can accept, what to negotiate, and your position today. The advice columns are interpretation, not legal advice; a contract that matters is read by a lawyer before signing.',
    partA: 'Part A · Clauses every customer may bring', partB: 'Part B · Additional clauses of financial customers (DORA)',
    partBIntro: 'Only if the customer is a financial entity (bank, insurer, payment or investment firm). Ask in writing whether the customer classifies your service as supporting a critical or important function; the six clauses of Art. 30(3) apply only then. For a microenterprise as financial entity, the audit rights of Art. 30(3)(e) may be delegated to an independent third party.',
    head: ['No.', 'Clause', 'Source', 'What it means', 'Accept and negotiate', 'Your position'],
    src: { dvo: (p) => `Implementing Regulation (EU) 2024/2690, Annex, point 5.1.4(${p})`, dvoDir: 'Implementing Regulation (EU) 2024/2690, Annex, point 5.2', gdpr: 'GDPR, Art. 28(3)', none: 'No legal source; usual in contracts', dora2: (p) => `DORA, Art. 30(2)(${p})`, dora3: (p) => `DORA, Art. 30(3)(${p})` },
    a: [
      ['Cybersecurity requirements for the supplier', 'dvo:a', 'The customer specifies measures you must keep, sometimes “state of the art” or a standard.', 'Accept the measures of your self-declaration and the dates of your action plan; replace “state of the art” by a reference to the self-declaration; no standard you do not hold. If the customer passes on point 11.6.2(c) of the Implementing Regulation (periodic password change), agree that a password manager with long unique passwords and multi-factor authentication replaces it, or accept a yearly change for administrator accounts.', ['B1', 'C2', 'D1']],
      ['Awareness, skills, training, certifications of your staff', 'dvo:b', 'Your staff must be briefed; certifications are sometimes demanded.', 'Accept a yearly briefing with record; negotiate away certifications per person.', ['G1']],
      ['Background verification of your staff', 'dvo:c', 'Checks on staff who work for the customer.', 'Accept identity check at hiring and written confidentiality; background checks only as far as national law allows, at the customer\'s request and cost.', ['G2']],
      ['Notification of incidents without undue delay', 'dvo:d', 'You must report incidents that put the customer\'s systems at risk.', 'Accept the deadline you can keep at night and on holiday; name the channel and the person; negotiate hour counts that start at your becoming aware.', ['F1']],
      ['Right to audit or to receive audit reports', 'dvo:e', 'The customer may inspect you or wants reports.', 'Accept: evidence list and documents on request, self-declaration yearly, written answers; negotiate on-site audits to once a year, with notice, at the auditing party\'s cost.', ['B3']],
      ['Handling of vulnerabilities', 'dvo:f', 'You must fix vulnerabilities in what you deliver.', 'Software and device suppliers: accept a contact and a deadline. Installers of connected devices or anyone with remote access: accept passing on manufacturer updates and reporting known vulnerabilities without undue delay. Everyone else: “not applicable, we supply and install no software or connected devices”.', ['E4']],
      ['Subcontracting and requirements for subcontractors', 'dvo:g', 'The customer wants to know and approve your subcontractors and pass requirements down to them.', 'Accept the list of providers, information before a change and flow-down as far as the provider\'s terms allow; negotiate approval rights into notification rights.', ['H1', 'H3']],
      ['Obligations at the end of the contract: return and disposal of information', 'dvo:h', 'At termination you return or delete what you received.', 'Accept return or deletion with written confirmation within an agreed period.', ['I1']],
      ['Directory entry: a contact point for security', 'dvoDir', 'The customer keeps a registry of suppliers with contact points.', 'Accept: name the responsible person and the deputy with phone and email.', ['A4']],
      ['Data processing agreement', 'gdpr', 'Where you process personal data on the customer\'s behalf, a contract with the contents of Art. 28(3) is mandatory.', 'Accept the customer\'s standard agreement; check that sub-processors and deletion match your provider list.', ['H2']],
      ['Liability, penalties, proof of insurance', 'none', 'Caps, contractual penalties, cyber insurance as a condition.', 'Negotiate a cap, exclude consequential loss, no penalty for a late report made in good faith; show the policy if you have one, do not promise one you do not.', ['B2']],
    ],
    b2: [
      ['Description of all functions and ICT services, whether subcontracting is permitted and under which conditions', 'a'],
      ['Locations (regions or countries) of the services and of data processing, with advance notice before a change', 'b'],
      ['Availability, authenticity, integrity and confidentiality of data, including personal data', 'c'],
      ['Access, recovery and return of data in an accessible format at insolvency, discontinuation or termination', 'd'],
      ['Service level descriptions, including updates and revisions', 'e'],
      ['Assistance at an ICT incident at no additional cost or at a cost determined in advance', 'f'],
      ['Full cooperation with the customer\'s competent and resolution authorities', 'g'],
      ['Termination rights and minimum notice periods', 'h'],
      ['Participation in the customer\'s security awareness programmes and resilience training', 'i'],
    ],
    b3: [
      ['Full service level descriptions with quantitative and qualitative targets', 'a'],
      ['Notice periods and reporting of developments that may affect the service', 'b'],
      ['Business contingency plans, tested, and ICT security measures in line with the customer\'s framework', 'c'],
      ['Participation in the customer\'s threat-led penetration testing', 'd'],
      ['Ongoing monitoring: unrestricted access, inspection and audit rights of the customer and its authority', 'e'],
      ['Exit strategy: a mandatory transition period and migration support', 'f'],
    ],
    b2H: 'Nine elements of every contract on ICT services (Art. 30(2))', b3H: 'Six more where the service supports a critical or important function (Art. 30(3))',
    b2Advice: 'Accept and negotiate: accept what describes your service truthfully; the location clause (DORA 2) needs your provider list; assistance at incidents (DORA 6) within your reporting deadline; cooperation with authorities is standard.',
    b3Advice: 'Accept and negotiate: only for services the customer classifies as critical or important. Audit rights and testing participation are the costly clauses: ask for cost sharing, and agree the transition period to what you can deliver. If the financial entity is a microenterprise, ask to delegate audit rights to an independent third party you appoint (Art. 30(3) DORA, last subparagraph).',
    noIct: 'Article 30 applies only to contracts on ICT services. By your answer to A7 you supply no ICT services; if a financial customer sends these clauses anyway, you may point this out and ask for them to be removed.',
    headB: ['No.', 'Clause', 'Source'],
    note: 'Generated with the Scutoria Security Evidence Toolkit from the answers of the business. Sources read at the original on 19 October 2026: Directive (EU) 2022/2555, Art. 21(2)(d) and (3); Implementing Regulation (EU) 2024/2690, Annex, points 5.1.4 and 5.2; Regulation (EU) 2022/2554 (DORA), Art. 28(8) and Art. 30(1) to (4); Regulation (EU) 2016/679, Art. 28(3). Read again on 23 October 2026: Directive (EU) 2022/2555, Art. 21; Implementing Regulation (EU) 2024/2690, Art. 1 and Annex, points 5.1.4, 5.2 and 11.6.2; Regulation (EU) 2022/2554, Art. 30. The advice is interpretation. No legal advice.',
  },
  de: {
    title: 'Klausel-Prüfliste', kicker: 'Klausel-Prüfliste · Sicherheitsnachweis-Toolkit', business: 'Betrieb', date: 'Datum',
    intro: 'Kunden, die unter die NIS-2-Richtlinie fallen, müssen die Sicherheit der Lieferkette regeln, einschließlich der sicherheitsbezogenen Aspekte ihrer Beziehungen zu Lieferanten (Art. 21 Abs. 2 Buchst. d). Für Cloud- und Rechenzentrumsanbieter, Managed-Service- und Managed-Security-Anbieter, Online-Marktplätze und weitere digitale Anbieter hat die Kommission acht Vertragsinhalte aufgezählt (Durchführungsverordnung (EU) 2024/2690, Anhang, Nr. 5.1.4); viele andere Kunden übernehmen sie. Finanzkunden unter DORA müssen neun Inhalte in jeden Vertrag über IKT-Dienstleistungen aufnehmen und sechs weitere, wenn die Leistung eine kritische oder wichtige Funktion unterstützt. Diese Liste nennt jede Klausel, woher sie kommt, was sie bedeutet, was ein Betrieb Ihrer Größe zusagen kann, was zu verhandeln ist, und Ihre Lage heute. Die Ratschläge sind Auslegung, keine Rechtsberatung; einen Vertrag, auf den es ankommt, lassen Sie vor der Unterschrift anwaltlich prüfen.',
    partA: 'Teil A · Klauseln, die jeder Kunde bringen kann', partB: 'Teil B · Zusätzliche Klauseln von Finanzkunden (DORA)',
    partBIntro: 'Nur wenn der Kunde ein Finanzunternehmen ist (Bank, Versicherer, Zahlungs- oder Wertpapierfirma). Fragen Sie schriftlich, ob der Kunde Ihre Leistung als Unterstützung einer kritischen oder wichtigen Funktion einstuft; die sechs Klauseln des Art. 30 Abs. 3 gelten nur dann. Ist das Finanzunternehmen ein Kleinstunternehmen, können die Prüfrechte des Art. 30 Abs. 3 Buchst. e an einen unabhängigen Dritten übertragen werden.',
    head: ['Nr.', 'Klausel', 'Herkunft', 'Was sie bedeutet', 'Zusagen und verhandeln', 'Ihre Lage'],
    src: { dvo: (p) => `Durchführungsverordnung (EU) 2024/2690, Anhang, Nr. 5.1.4 Buchst. ${p}`, dvoDir: 'Durchführungsverordnung (EU) 2024/2690, Anhang, Nr. 5.2', gdpr: 'DSGVO, Art. 28 Abs. 3', none: 'Keine Rechtsgrundlage; in Verträgen üblich', dora2: (p) => `DORA, Art. 30 Abs. 2 Buchst. ${p}`, dora3: (p) => `DORA, Art. 30 Abs. 3 Buchst. ${p}` },
    a: [
      ['Cybersicherheitsanforderungen an den Lieferanten', 'dvo:a', 'Der Kunde schreibt Maßnahmen vor, die Sie einhalten müssen, manchmal „Stand der Technik“ oder eine Norm.', 'Die Maßnahmen Ihrer Selbstauskunft und die Termine Ihres Maßnahmenplans zusagen; „Stand der Technik“ durch einen Verweis auf die Selbstauskunft ersetzen; keine Norm, die Sie nicht haben. Gibt der Kunde Nr. 11.6.2 Buchst. c der Durchführungsverordnung weiter (regelmäßiger Passwortwechsel), vereinbaren, dass Passwort-Manager mit langen Einzelpasswörtern und Multi-Faktor-Authentifizierung ihn ersetzen, oder einen jährlichen Wechsel für Administratorkonten zusagen.', ['B1', 'C2', 'D1']],
      ['Sensibilisierung, Fähigkeiten, Schulung, Zertifizierungen Ihrer Beschäftigten', 'dvo:b', 'Ihre Beschäftigten müssen eingewiesen sein; manchmal werden Zertifizierungen verlangt.', 'Eine jährliche Einweisung mit Nachweis zusagen; Zertifizierungen je Person wegverhandeln.', ['G1']],
      ['Überprüfung des Hintergrunds Ihrer Beschäftigten', 'dvo:c', 'Prüfungen der Personen, die für den Kunden arbeiten.', 'Identitätsprüfung bei Einstellung und schriftliche Vertraulichkeit zusagen; Hintergrundprüfungen nur, soweit nationales Recht es erlaubt, auf Wunsch und Kosten des Kunden.', ['G2']],
      ['Meldung von Vorfällen ohne unangemessene Verzögerung', 'dvo:d', 'Sie müssen Vorfälle melden, die die Systeme des Kunden gefährden.', 'Die Frist zusagen, die Sie auch nachts und im Urlaub halten; Weg und Person benennen; Stundenfristen ab Ihrer Kenntnis verhandeln.', ['F1']],
      ['Prüfrecht oder Recht auf Prüfberichte', 'dvo:e', 'Der Kunde darf Sie prüfen oder will Berichte.', 'Zusagen: Nachweisliste und Dokumente auf Anfrage, Selbstauskunft jährlich, schriftliche Antworten; Prüfungen vor Ort auf einmal im Jahr, mit Ankündigung und auf Kosten der prüfenden Seite verhandeln.', ['B3']],
      ['Behandlung von Schwachstellen', 'dvo:f', 'Sie müssen Schwachstellen in dem beheben, was Sie liefern.', 'Software- und Gerätelieferanten: Kontakt und Frist zusagen. Wer vernetzte Geräte einbaut oder Fernzugriff hat: Weitergabe der Herstellerupdates und Meldung bekannter Schwachstellen ohne unangemessene Verzögerung zusagen. Alle anderen: „nicht anwendbar, wir liefern und installieren keine Software und keine vernetzten Geräte“.', ['E4']],
      ['Unterauftragnehmer und Anforderungen an sie', 'dvo:g', 'Der Kunde will Ihre Unterauftragnehmer kennen, genehmigen und Anforderungen an sie weitergeben.', 'Dienstleisterliste, Information vor einem Wechsel und Weitergabe, soweit die Bedingungen des Anbieters es erlauben, zusagen; Genehmigungsrechte zu Informationsrechten verhandeln.', ['H1', 'H3']],
      ['Pflichten bei Vertragsende: Rückgabe und Vernichtung von Informationen', 'dvo:h', 'Bei Beendigung geben Sie zurück oder löschen, was Sie erhalten haben.', 'Rückgabe oder Löschung mit schriftlicher Bestätigung innerhalb einer vereinbarten Frist zusagen.', ['I1']],
      ['Verzeichniseintrag: eine Kontaktstelle für Sicherheit', 'dvoDir', 'Der Kunde führt ein Verzeichnis seiner Lieferanten mit Kontaktstellen.', 'Zusagen: verantwortliche Person und Vertretung mit Telefon und E-Mail benennen.', ['A4']],
      ['Auftragsverarbeitungsvertrag', 'gdpr', 'Wo Sie personenbezogene Daten im Auftrag des Kunden verarbeiten, ist ein Vertrag mit den Inhalten des Art. 28 Abs. 3 Pflicht.', 'Den Standardvertrag des Kunden zusagen; prüfen, dass Unterauftragsverarbeiter und Löschung zu Ihrer Dienstleisterliste passen.', ['H2']],
      ['Haftung, Vertragsstrafen, Versicherungsnachweis', 'none', 'Haftungsgrenzen, Vertragsstrafen, Cyberversicherung als Bedingung.', 'Eine Obergrenze verhandeln, Folgeschäden ausschließen, keine Strafe für eine in gutem Glauben verspätete Meldung; die Police zeigen, wenn es eine gibt, keine versprechen, die es nicht gibt.', ['B2']],
    ],
    b2: [
      ['Beschreibung aller Funktionen und IKT-Dienstleistungen, ob Unterauftragsvergabe zulässig ist und unter welchen Bedingungen', 'a'],
      ['Orte (Regionen oder Länder) der Leistung und der Datenverarbeitung, mit Vorabinformation vor einer Änderung', 'b'],
      ['Verfügbarkeit, Authentizität, Integrität und Vertraulichkeit der Daten, einschließlich personenbezogener Daten', 'c'],
      ['Zugang, Wiederherstellung und Rückgabe der Daten in zugänglichem Format bei Insolvenz, Geschäftsaufgabe oder Vertragsende', 'd'],
      ['Beschreibung der Dienstleistungsgüte, einschließlich Aktualisierungen', 'e'],
      ['Unterstützung bei einem IKT-Vorfall ohne Zusatzkosten oder zu vorab festgelegten Kosten', 'f'],
      ['Volle Zusammenarbeit mit den zuständigen Behörden und Abwicklungsbehörden des Kunden', 'g'],
      ['Kündigungsrechte und Mindestkündigungsfristen', 'h'],
      ['Teilnahme an den Sensibilisierungsprogrammen und Resilienzschulungen des Kunden', 'i'],
    ],
    b3: [
      ['Vollständige Beschreibung der Dienstleistungsgüte mit quantitativen und qualitativen Zielen', 'a'],
      ['Kündigungsfristen und Berichtspflichten über Entwicklungen, die die Leistung beeinträchtigen könnten', 'b'],
      ['Geprüfte Notfallpläne und IKT-Sicherheitsmaßnahmen nach dem Rahmen des Kunden', 'c'],
      ['Teilnahme an den bedrohungsorientierten Penetrationstests des Kunden', 'd'],
      ['Laufende Überwachung: uneingeschränkte Zugangs-, Inspektions- und Prüfrechte des Kunden und seiner Behörde', 'e'],
      ['Ausstiegsstrategie: verpflichtender Übergangszeitraum und Unterstützung beim Wechsel', 'f'],
    ],
    b2H: 'Neun Inhalte jedes Vertrags über IKT-Dienstleistungen (Art. 30 Abs. 2)', b3H: 'Sechs weitere, wenn die Leistung eine kritische oder wichtige Funktion unterstützt (Art. 30 Abs. 3)',
    b2Advice: 'Zusagen und verhandeln: zusagen, was Ihre Leistung wahrheitsgemäß beschreibt; die Ortsklausel (DORA 2) braucht Ihre Dienstleisterliste; Unterstützung bei Vorfällen (DORA 6) innerhalb Ihrer Meldefrist; Zusammenarbeit mit Behörden ist üblich.',
    b3Advice: 'Zusagen und verhandeln: nur für Leistungen, die der Kunde als kritisch oder wichtig einstuft. Prüfrechte und Testteilnahme sind die teuren Klauseln: nach Kostenteilung fragen, und den Übergangszeitraum auf das vereinbaren, was Sie leisten können. Ist das Finanzunternehmen ein Kleinstunternehmen, die Übertragung der Prüfrechte an einen von Ihnen benannten unabhängigen Dritten vorschlagen (Art. 30 Abs. 3 letzter UAbs. DORA).',
    noIct: 'Art. 30 gilt nur für Verträge über IKT-Dienstleistungen. Nach Ihrer Antwort zu A7 erbringen Sie keine IKT-Dienstleistungen; schickt ein Finanzkunde die Klauseln trotzdem, dürfen Sie darauf hinweisen und um Streichung bitten.',
    headB: ['Nr.', 'Klausel', 'Herkunft'],
    note: 'Erzeugt mit dem Sicherheitsnachweis-Toolkit von Scutoria aus den Antworten des Betriebs. Quellen am Original gelesen am 19. Oktober 2026: Richtlinie (EU) 2022/2555, Art. 21 Abs. 2 Buchst. d und Abs. 3; Durchführungsverordnung (EU) 2024/2690, Anhang, Nr. 5.1.4 und 5.2; Verordnung (EU) 2022/2554 (DORA), Art. 28 Abs. 8 und Art. 30 Abs. 1 bis 4; Verordnung (EU) 2016/679, Art. 28 Abs. 3. Erneut gelesen am 23. Oktober 2026: Richtlinie (EU) 2022/2555, Art. 21; Durchführungsverordnung (EU) 2024/2690, Art. 1 und Anhang, Nr. 5.1.4, 5.2 und 11.6.2; Verordnung (EU) 2022/2554, Art. 30. Die Ratschläge sind Auslegung. Keine Rechtsberatung.',
  },
};

export function clauseChecklistDoc(def, answers, lang, ctx = {}) {
  const t = T[lang] ?? T.en;
  const A = (id) => answers[id] ?? {};
  const business = A('A1').text || '…';
  const today = ctx.today ?? new Date().toISOString().slice(0, 10);
  const byId = Object.fromEntries(questionsOf(def).map((q) => [q.id, q]));
  const position = (ids) => ids.map((id) => `${id}: ${fieldValue(byId[id], A(id), lang, answers)}`).join(' · ');
  const srcOf = (key) => {
    if (key.startsWith('dvo:')) return t.src.dvo(key.slice(4));
    return t.src[key] ?? key;
  };
  // Clause numbers K1 to K11 and DORA 1 to 15, so that they do not collide with the question ids (A1, B1, …) and attachment numbers.
  const rowsA = t.a.map(([clause, src, means, advice, ids], i) => [`K${i + 1}`, clause, srcOf(src), means, advice, position(ids)]);
  const rowsB2 = t.b2.map(([clause, p], i) => [`DORA ${i + 1}`, clause, t.src.dora2(p)]);
  const rowsB3 = t.b3.map(([clause, p], i) => [`DORA ${t.b2.length + i + 1}`, clause, t.src.dora3(p)]);
  const noIct = ['goods', 'services'].includes(A('A7').value);
  const blocks = [
    B.p(t.intro),
    B.h(t.partA),
    B.table(t.head, rowsA, [5, 17, 16, 18, 24, 20]),
    B.pagebreak(),
    B.h(t.partB),
    B.p(t.partBIntro),
    ...(noIct ? [B.p(t.noIct)] : []),
    B.h2(t.b2H),
    B.p(t.b2Advice),
    B.table(t.headB, rowsB2, [10, 60, 30]),
    B.h2(t.b3H),
    B.p(t.b3Advice),
    B.table(t.headB, rowsB3, [10, 60, 30]),
    B.note(t.note),
  ];
  return makeDoc({
    id: 'clause-checklist', lang, cls: 'pg--clauses', title: t.title, business,
    runLeft: `Scutoria · ${t.kicker}`, runRight: fmtDate(today, lang, answers), pageHead: `${business} · ${t.title} · ${fmtDate(today, lang, answers)}`,
    meta: [{ label: t.business, value: business }, { label: t.date, value: fmtDate(today, lang, answers) }],
    blocks,
    footerLeft: business, footerRight: `${t.title} · ${fmtDate(today, lang, answers)}`,
    printCss: '.pg--clauses .pg__table { font-size: 10.5px; } .pg--clauses .pg__table th, .pg--clauses .pg__table td { padding: 4px 5px; }',
  });
}

export const clauseCount = (lang) => ({ a: (T[lang] ?? T.en).a.length, b: (T[lang] ?? T.en).b2.length + (T[lang] ?? T.en).b3.length });
