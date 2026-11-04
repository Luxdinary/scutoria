# A2 · Handbuch Sicherheitsnachweis-Toolkit · Prüfbefunde

Prüfdatum 23. Oktober 2026. Geprüft wurden `site/content/toolkits/security-evidence/handbook.en.md` und `handbook.de.md` (beide 570 Zeilen, Zeilennummern in EN und DE gleich), die Hilfetexte in `questions.json`, `produkte/security-evidence-toolkit/quellen.md` und `BAUPLAN.md` sowie die gerenderten PDFs `security-evidence-handbook-en.pdf` (33 Seiten) und `-de.pdf` (37 Seiten). Nichts im Projekt wurde geändert; Arbeitskopien und Bilder liegen nur im Scratch-Ordner der Sitzung.

## Kurzfassung

- **Geprüft:** rund 210 Einzelaussagen mit Zahl, Frist, Rechtsaussage, Kontakt oder Quellenangabe (EN und DE jeweils als eine Aussage gezählt, wenn gleichlautend), dazu 24 Hilfetexte in `questions.json` und 7 Seiten der gerenderten PDFs.
- **Bestätigt ohne Befund:** rund 165 Aussagen. Alle Telefonnummern und Adressen im Handbuch stimmen: WKO-Hotline 0800 888 133, CERT.at reports@cert.at und +43 1 5056416 78, Polizei 133, Euro-Notruf 112, against-cybercrime@bmi.gv.at (keine Anzeige), dsb@dsb.gv.at, Polizei Deutschland 110, ZAC-Liste bei polizei.de, Landesdatenschutzbehörden bei der BfDI. Alle wörtlichen Zitate aus NIS-2-Richtlinie, Durchführungsverordnung (EU) 2024/2690, DORA, DSGVO, CRA, NISG 2026, NISV 2026 und den Versichererformularen stimmen in EN und DE, mit einer Ausnahme (B-16).
- **Mit Befund:** **43 Befunde: A 4 · B 25 · C 14.**
- **Hausregeln:** Keine verbotenen Versprechen, keine Gedankenstriche als Einschub, keine eigenen Ausrufezeichen (zwei stehen in wörtlichen Zitaten des Bundeskriminalamts, DE Zeile 327, und sind zulässig).

Die vier A-Befunde in je einem Satz:
1. **A-1** Das Handbuch sagt dem Lieferanten, ihn binde nur der Vertrag; es verschweigt, dass Art. 32 DSGVO jeden Betrieb mit personenbezogenen Daten unmittelbar zu Sicherheitsmaßnahmen verpflichtet (der Artikel steht nur in der Quellenliste).
2. **A-2** Die Meldefrist an den Versicherer wird als „eine Woche“ wiedergegeben; die Bedingungen verlangen „unverzüglich, spätestens innerhalb einer Woche“ und die sofortige Meldung über die Hotline. Wer die Woche ausnützt, riskiert eine Obliegenheitsverletzung.
3. **A-3** Die NIS-2-Frühwarnung geht laut Handbuch an „die Behörde“; Richtlinie und NISG 2026 nennen das CSIRT (in Österreich § 34 NISG 2026). Der Fehler steht auch auf der Notfallkarte.
4. **A-4** DORA-Vertragsinhalte gelten nur für IKT-Dienstleistungen; das Handbuch sagt jedem kleinen Lieferanten einer Bank oder eines Versicherers, er werde diese Klauseln unterschreiben sollen und meist „ja“ sagen.

**Empfehlung:** A-1 bis A-4 und B-1, B-5, B-6, B-9, B-16, B-24 vor dem Verkauf beheben; das sind Textänderungen von je ein bis drei Sätzen. Die übrigen B-Punkte im selben Durchgang. Bei den C-Punkten zuerst C-1 und C-2 (Layout im Notfallabschnitt, Seitenzahlen), dann C-4 (Kurzanleitung für den Fragebogen), weil sie den Nutzen für den Zehn-Personen-Betrieb am meisten erhöhen.

**Arbeitsweg und Grenzen:**
- EUR-Lex antwortet automatisierten Abrufen mit einer Bot-Abwehr (HTTP 202, `x-amzn-waf-action: challenge`). Die Abwehr wurde nicht umgangen. Stattdessen wurden die amtlichen Amtsblatt-Texte über den Cellar des Amts für Veröffentlichungen geladen (`publications.europa.eu/resource/celex/<CELEX>`, XHTML der ABl.-Fassung), englisch und deutsch: Richtlinie (EU) 2022/2555, Durchführungsverordnung (EU) 2024/2690, Verordnung (EU) 2022/2554, Verordnung (EU) 2016/679, Verordnung (EU) 2024/2847, Empfehlung 2003/361/EG.
- NISV 2026 heute live aus dem RIS (`ris.bka.gv.at/Dokumente/BgblAuth/BGBLA_2026_II_290/BGBLA_2026_II_290.pdf`) im Wortlaut gelesen; BSIG live bei gesetze-im-internet.de.
- Versichererformulare (Mannheimer, Markel, Allianz, Beazley, Funk, Donau), Cyber-Trust-Austria-Policy, NIST SP 800-63B-4, CISA, ENISA (12 Schritte, KMU-Bericht, Implementation Guidance), ENX, VdS, BSI TOP 12, BSI ORP.4, NISG 2026 (BGBl.) und der Kommissionstext der Durchführungsverordnung wurden aus den Archivkopien unter `_archiv/quellen/2026-10-19/` heute vollständig ausgelesen. Diese Kopien sind die am 19.10. geladenen Originale; sie wurden heute nicht erneut aus dem Netz geladen. Wo das für ein Ergebnis wichtig ist, steht es beim Befund.
- Sage-Hook: Abruf von beck-aktuell.de blockiert (Urteilsbericht zu OLG Schleswig, Ersatz über goerg.de); Prompt-Injection-Warnung bei cyber-trust.at (79,8 %) und webstore.iec.ch (96,2 % und 80,0 %), keine Anweisung befolgt, nur Daten übernommen; ein lokaler `grep` nach „password“ in einer ENISA-Textdatei wurde als Zugriff auf Zugangsdaten markiert und vom Nutzer freigegeben.

---

## Befunde

### A-1 · Art. 32 DSGVO fehlt; „was Sie bindet, ist der Vertrag“

- **Ort:** beide Handbücher, 1.1, Zeile 38 (Auslegung); Quellenliste Abschnitt 8, Nr. 4, Zeile 524 (nennt „Art. 32(1)“, ohne dass der Text ihn verwendet). Folgestellen: D1, D2, E3 (Zeilen 201 bis 255), deren Quellenzeilen nur Versicherer, Label und Durchführungsverordnung nennen.
- **Zitat:** EN „The Directive binds the customer, not you; what binds you is the contract that follows (section 1.2 and D6).“ DE „Die Richtlinie bindet den Kunden, nicht Sie; Sie bindet der Vertrag, der folgt“.
- **Befund:** Die einzige Rechtsnorm, die den kleinen Lieferanten selbst unmittelbar zu Sicherheitsmaßnahmen verpflichtet, ist Art. 32 DSGVO; er gilt für jeden Verantwortlichen und Auftragsverarbeiter, also auch für den Beispielbetrieb mit Kundenkontakten, Plänen und Aufträgen. Art. 32 Abs. 1 nennt ausdrücklich Verschlüsselung, die Fähigkeit zur raschen Wiederherstellung und ein Verfahren zur regelmäßigen Überprüfung, genau die Themen von D1, D2 und E3. Der Satz in 1.1 erweckt den Eindruck, ohne Vertrag gebe es keine Pflicht. Das ist rechtlich irreführend und nimmt dem Betrieb das stärkste Argument, warum die Maßnahmen ohnehin geschuldet sind. Zusätzlich ist „Die Richtlinie bindet den Kunden“ ungenau: Eine Richtlinie bindet die Mitgliedstaaten; den Kunden binden BSIG oder NISG 2026.
- **Schwere:** A (rechtlich irreführend).
- **Quelle:** Verordnung (EU) 2016/679, ABl. L 119 vom 4.5.2016, über `publications.europa.eu/resource/celex/32016R0679`, Abruf 23.10.2026, Art. 32 Abs. 1: „the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia … (a) the pseudonymisation and encryption of personal data; … (c) the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident; (d) a process for regularly testing, assessing and evaluating the effectiveness“. DE: „treffen der Verantwortliche und der Auftragsverarbeiter geeignete technische und organisatorische Maßnahmen … c) die Fähigkeit, die Verfügbarkeit der personenbezogenen Daten und den Zugang zu ihnen bei einem physischen oder technischen Zwischenfall rasch wiederherzustellen“.
- **Korrektur EN (Zeile 38, letzter Satz):** „The Directive and the national laws that transpose it bind the customer, not you. What binds you is the contract that follows (section 1.2 and D6) and, wherever you handle personal data, the GDPR itself: Article 32 requires every controller and processor to take appropriate technical and organisational measures, among them encryption, the ability to restore personal data in a timely manner after an incident, and a process for regularly testing the measures.“ Neuer Fakt-Block mit Quellenzeile „Regulation (EU) 2016/679, Art. 32(1)(a) to (d) · EUR-Lex · retrieved 2026-10-23“; in den Quellenzeilen von D1, D2 und E3 „Regulation (EU) 2016/679, Art. 32(1)(a), (c), (d)“ ergänzen.
- **Korrektur DE:** „Die Richtlinie und die nationalen Gesetze, die sie umsetzen, binden den Kunden, nicht Sie. Sie bindet der Vertrag, der folgt (Abschnitt 1.2 und D6), und überall dort, wo Sie personenbezogene Daten verarbeiten, die DSGVO selbst: Art. 32 verpflichtet jeden Verantwortlichen und Auftragsverarbeiter zu geeigneten technischen und organisatorischen Maßnahmen, darunter Verschlüsselung, die Fähigkeit, die Daten nach einem Zwischenfall rasch wiederherzustellen, und ein Verfahren zur regelmäßigen Überprüfung der Maßnahmen.“ Quellenzeile „Verordnung (EU) 2016/679, Art. 32 Abs. 1 Buchst. a bis d · EUR-Lex · abgerufen 23.10.2026“.

### A-2 · Meldefrist an den Versicherer: „eine Woche“ statt „unverzüglich, spätestens eine Woche“

- **Ort:** 1.4, Zeile 68; B2, Zeile 122 und Quellenzeile 124; F1, Zeile 277; 4.2 „Insurer, bank, police“, Zeile 405.
- **Zitat:** EN Zeile 405 „The policy names its deadline; the Austrian conditions we read say one week.“ Zeile 68 „to notify the insurer at the latest within one week of becoming aware“. DE Zeile 405 „die gelesenen österreichischen Bedingungen sagen eine Woche“.
- **Befund:** Teil D 7.1.4 der Donau-Bedingungen verlangt die Information „umfassend und unverzüglich, spätestens innerhalb einer Woche“ und im nächsten Satz die unverzügliche Meldung über die bekanntgegebene Hotline „zwecks Einschaltung von Experten“. Die Woche ist die äußerste Grenze, nicht die Frist. Im Notfallabschnitt und auf der Karte liest ein Betrieb „eine Woche“ und wartet; das kann den Versicherungsschutz kosten. Die Fakt-Wiedergabe in Zeile 68 („at the latest within one week“) ist knapp richtig, lässt aber „unverzüglich“ weg.
- **Schwere:** A (im Notfall irreführend, Folge: Obliegenheitsverletzung möglich).
- **Quelle:** Donau Versicherung AG, „1046A – Allgemeine Bedingungen für die Cyberversicherung“, Stand 04.08.2025, Teil D 7.1.4, S. 10 f. (Archivkopie `_archiv/quellen/2026-10-19/toolkit2/donau-avb-cyberversicherung-2025.pdf`, gelesen 23.10.2026): „Der Versicherungsnehmer hat den Versicherer umfassend und unverzüglich, spätestens innerhalb einer Woche ab Kenntnis, falls erforderlich auch fernmündlich, … zu informieren.“ und „Insbesondere hat der Versicherungsnehmer den Versicherer zwecks Einschaltung von Experten unverzüglich über die bekannt gegebene Hotline zu informieren.“
- **Korrektur EN (Zeile 405):** „The policy names its deadline. The Austrian conditions we read require notice without undue delay and at the latest within one week, and a call to the insurer's hotline without undue delay so that experts can be engaged: call first, then send the written notice.“ Zeile 68: „… to notify the insurer without undue delay and at the latest within one week of becoming aware, to call its hotline without undue delay …“. F1 entsprechend.
- **Korrektur DE (Zeile 405):** „Die Police nennt ihre Frist. Die gelesenen österreichischen Bedingungen verlangen die Meldung unverzüglich, spätestens innerhalb einer Woche, und den sofortigen Anruf bei der Hotline des Versicherers, damit Experten eingeschaltet werden: zuerst anrufen, dann schriftlich melden.“ Zeile 68: „… zur Meldung an den Versicherer „unverzüglich, spätestens innerhalb einer Woche ab Kenntnis“ und zum unverzüglichen Anruf bei der Hotline …“.

### A-3 · NIS-2-Frühwarnung geht an das CSIRT, nicht an „die Behörde“

- **Ort:** F1, Zeile 277; 4.2 „Customers under NIS 2“, Zeile 403. Folgestelle außerhalb des Handbuchs: Notfallkarte (Muster DE: „Betrieb unter NIS 2? Frühwarnung an die Behörde binnen 24 Stunden nach Kenntnis“).
- **Zitat:** EN Zeile 277 „Covered entities themselves must send their authority an early warning … an incident notification within 72 hours and a final report within one month“. Zeile 403 „the same deadlines apply to you towards your authority“. DE „ihrer Behörde … eine Frühwarnung“.
- **Befund:** Art. 23 Abs. 1 und 4 der Richtlinie: Meldung an das CSIRT „or, where applicable, its competent authority“. In Österreich ist der Adressat das sektorspezifische CSIRT, mangels eines solchen das nationale CSIRT (§ 34 Abs. 1 NISG 2026); das CSIRT leitet an die Behörde weiter. In Deutschland ist das BSI zugleich Meldestelle. Für den Hauptmarkt Österreich ist „Behörde“ also falsch, und auf der Notfallkarte führt es im Ernstfall an die falsche Stelle. Zweitens: Der Abschlussbericht ist „not later than one month after the submission of the incident notification“ fällig, nicht ein Monat ab Kenntnis.
- **Schwere:** A (Rechtsaussage falsch für Österreich, wirkt auf die Notfallkarte).
- **Quelle:** Richtlinie (EU) 2022/2555, über `publications.europa.eu/resource/celex/32022L2555`, Abruf 23.10.2026, Art. 23 Abs. 1: „notify, without undue delay, its CSIRT or, where applicable, its competent authority“; Abs. 4 Buchst. d: „a final report not later than one month after the submission of the incident notification under point (b)“. NISG 2026, BGBl. I Nr. 94/2025, § 34 Abs. 1 (Archivkopie, gelesen 23.10.2026): „dem für sie zuständigen sektorspezifischen CSIRT …, in Ermangelung eines solchen dem nationalen CSIRT, unverzüglich jeden erheblichen Cybersicherheitsvorfall (§ 35) zu melden. Das CSIRT leitet die Meldung unverzüglich an die Cybersicherheitsbehörde weiter.“
- **Korrektur EN (Zeile 277):** „Covered entities themselves must send their CSIRT, or where the law says so their authority, an early warning … within 24 hours of becoming aware of a significant incident, an incident notification within 72 hours and a final report no later than one month after that notification. In Austria the report goes to the sector CSIRT or, if there is none, the national CSIRT; in Germany to the BSI.“ Quellenzeile um „NISG 2026, § 34(1) and (2)“ ergänzen. Zeile 403: „… the same deadlines apply to you towards your CSIRT (Austria) or the BSI (Germany).“
- **Korrektur DE (Zeile 277):** „Erfasste Einrichtungen selbst müssen ihrem CSIRT oder, wo das Gesetz es vorsieht, ihrer Behörde … binnen 24 Stunden nach Kenntnis eines erheblichen Sicherheitsvorfalls eine Frühwarnung, binnen 72 Stunden eine Meldung und spätestens einen Monat nach dieser Meldung einen Abschlussbericht übermitteln. In Österreich geht die Meldung an das sektorspezifische CSIRT, mangels eines solchen an das nationale CSIRT; in Deutschland an das BSI.“ Zeile 403: „… gelten dieselben Fristen für Sie gegenüber Ihrem CSIRT (Österreich) oder dem BSI (Deutschland).“ Notfallkarte entsprechend (Bereich A4 informieren).

### A-4 · DORA: Art. 30 gilt nur für IKT-Dienstleistungen

- **Ort:** 1.3, Zeile 64 (Auslegung); Folgestelle Glossar „Audit right“, Zeile 493.
- **Zitat:** EN „A small supplier of an insurer or a bank meets these as a finished clause set it is asked to sign. Part B of D6 explains each; the honest answer to most is "yes, within these limits", and the audit right is the one to negotiate: unrestricted access is written for cloud providers, not for an electrician with one server.“
- **Befund:** Art. 30 Abs. 2 und 3 DORA regeln „contractual arrangements on the use of ICT services“. Wer einer Bank Elektroinstallation, Material oder Reinigung liefert, ist kein IKT-Drittdienstleister; die DORA-Pflichtinhalte treffen ihn nicht. Der Absatz sagt jedem kleinen Lieferanten, er werde den Klauselsatz vorgelegt bekommen und solle meist zustimmen, und das Beispiel des Elektrikers suggeriert, gerade er sei gemeint. Das kann dazu führen, dass ein Betrieb Prüf-, Zugangs- und Ausstiegsrechte akzeptiert, die rechtlich nicht verlangt sind. Außerdem gilt Abs. 3 Buchst. e nicht nur für Cloud-Anbieter, sondern für jeden IKT-Dienstleister, der kritische oder wichtige Funktionen unterstützt.
- **Schwere:** A (irreführend, rechtlich riskant beim Vertragsabschluss).
- **Quelle:** Verordnung (EU) 2022/2554, über `publications.europa.eu/resource/celex/32022R2554`, Abruf 23.10.2026, Art. 30 Abs. 2: „The contractual arrangements on the use of ICT services shall include at least the following elements“; Abs. 3: „The contractual arrangements on the use of ICT services supporting critical or important functions shall include, in addition …“; Abs. 3 Buchst. e Ziff. i: „unrestricted rights of access, inspection and audit by the financial entity, or an appointed third party, and by the competent authority“.
- **Korrektur EN (Zeile 64):** „These contents are mandatory only where you provide ICT services to the financial entity: software, IT support, hosting, devices you operate for it. A supplier of goods or of services without ICT, such as an electrical installation, is not covered by Article 30, even if the bank sends the same clause set; it may say so and ask for the clauses to be removed. If you do provide ICT services, Part B of D6 explains each clause; the audit right of Article 30(3)(e) applies only where your service supports a critical or important function, and it is the one to negotiate.“ Marker bleibt Auslegung.
- **Korrektur DE (Zeile 64):** „Diese Inhalte sind nur Pflicht, wenn Sie dem Finanzunternehmen IKT-Dienstleistungen erbringen: Software, IT-Betreuung, Hosting, Geräte, die Sie für das Unternehmen betreiben. Wer Waren oder Leistungen ohne IKT liefert, etwa eine Elektroinstallation, fällt nicht unter Art. 30, auch wenn die Bank denselben Klauselsatz schickt; er darf darauf hinweisen und um Streichung bitten. Wer IKT-Dienstleistungen erbringt, findet in Teil B von D6 jede Klausel erklärt; das Prüfrecht nach Art. 30 Abs. 3 Buchst. e gilt nur, wenn die Leistung eine kritische oder wichtige Funktion unterstützt, und es ist die Klausel zum Verhandeln.“ Bereich A4 prüfen, ob D6 Teil B für Lieferanten ohne IKT-Leistung (Frage A7 „goods“ oder „services“) überhaupt erscheint.

---

### B-1 · Versicherer: „Was alle fragen“, „jedes Formular“, „stellen sie an den Anfang“

- **Ort:** 1.4, Zeile 68; D1, Zeile 201; C2, Zeile 146; D2, Zeile 209; E1, Zeile 235; E2, Zeile 243; Quellenzeile 1.4, Zeile 70.
- **Zitat:** EN Zeile 68 „What all of them ask: daily backups on separate systems with a tested restore …; multi-factor authentication …; annual training …“. Zeile 201 „Every insurer form asks for it“. Zeile 146 „The insurers put it first: Beazley's critical requirement 2 and Funk's question 2 …“. Zeile 209 „Markel requires a restore test“.
- **Befund:** (1) Nicht alle sechs Quellen fragen das. Der Allianz-Bogen ist ein IT-Haftpflichtbogen für IT-Unternehmen und fragt weder nach Sicherung noch nach Schulung (nur 1.2, 2.5.1 bis 2.5.5); die Donau-Bedingungen sind kein Formular. (2) „Täglich“ verlangt nicht jeder: Markel verlangt bis 1 Mio. € Umsatz wöchentliche Sicherung, Beazley sagt ausdrücklich, bei wenigen Änderungen „können monatliche Backups ausreichen“. (3) MFA steht bei Beazley und Funk an zweiter Stelle, die Sicherung an erster; „put it first“ ist falsch. (4) Markel und Mannheimer stellen Ja/Nein-Fragen; „requires“ trifft nur auf Abschnitt 4 Nr. 5 und 6 von Markel zu (Voraussetzung für das vereinfachte Antragsmodell). (5) Der Mannheimer-Bogen gilt „für Unternehmen ab 10 Mio. Euro Umsatz“; die Quellenzeile in 1.4 lässt das weg. (6) „Beazley and Funk exclude end-of-support software“ (E2): Bei Beazley ist das eine „wichtige“, nicht zwingende Anforderung; sie wirkt nur auf den Selbstbehalt.
- **Schwere:** B (Fakt-Marker deckt die Verallgemeinerung nicht).
- **Quelle:** Archivkopien `_archiv/quellen/2026-10-19/toolkit2/`, gelesen 23.10.2026: Beazley S. 1: „Wenn Sie nur wenige kritische Daten haben und nur wenige Änderungen vornehmen, können monatliche Backups ausreichen.“; S. 2: „**nicht zwingend vor Abschluss einer Cyber-Deckung erforderlich, sind alle drei Punkte erfüllt, wird der Selbstbehalt … gestrichen“. Markel Abschnitt 4 Nr. 5: „bis 1.000.000 € Umsatz mindestens wöchentliche, ab 1.000.000 € Umsatz mindestens tägliche“. Allianz FH---0403Z0 (9.25), Seiten 1 bis 5: Fragen 1.2 und 2.5.1 bis 2.5.5, keine Frage zu Sicherung oder Schulung. Mannheimer HF_060 0424, S. 1: „Fragebogen Cyber-Risiken für Unternehmen ab 10 Mio. Euro Umsatz“. Funk, S. 2: Fragen 1 (Sicherung) und 2 (MFA).
- **Korrektur EN:** Zeile 68: „Six public documents of insurers were read in full: four application forms for cyber cover (Mannheimer, for businesses from 10 million euro turnover; Markel; Beazley; Funk with Beazley), one questionnaire for IT liability (Allianz) and one set of policy conditions (Donau). Most of them ask: backups on separate systems with a tested restore (…); …“ und am Ende „How often to back up varies: Markel asks for weekly backups below one million euro turnover and daily above, Beazley says monthly may be enough where little changes.“ Zeile 201: „Most insurer forms ask about it: …“. Zeile 146: „The insurers rank it among their few mandatory conditions: Beazley's critical requirement 2 and Funk's question 2 …“. Zeile 209 und Folgestellen: „Markel asks whether …“ statt „requires“. Quellenzeile 1.4: Titel vollständig, mit „für Unternehmen ab 10 Mio. Euro Umsatz“ und „IT-Haftpflicht“.
- **Korrektur DE:** Zeile 68: „Sechs öffentliche Unterlagen von Versicherern wurden ganz gelesen: vier Anträge oder Fragebögen für Cyberversicherungen (Mannheimer, für Unternehmen ab 10 Mio. Euro Umsatz; Markel; Beazley; Funk mit Beazley), ein Fragebogen zur IT-Haftpflicht (Allianz) und ein Bedingungswerk (Donau). Die meisten fragen: Sicherung auf getrennte Systeme mit geprüfter Wiederherstellung (…) …“ und „Wie oft gesichert wird, ist uneinheitlich: Markel fragt unter einer Million Euro Umsatz nach wöchentlicher, darüber nach täglicher Sicherung; Beazley hält bei wenigen Änderungen auch monatliche Sicherungen für ausreichend.“ Zeile 201: „Die meisten Versichererformulare fragen danach“. Zeile 146: „Die Versicherer zählen sie zu ihren wenigen zwingenden Bedingungen“. „Markel verlangt“ durch „Markel fragt, ob“ ersetzen, wo es um Abschnitt 6 und 7 geht.

### B-2 · Durchführungsverordnung Art. 2 Abs. 2: Dokumentationspflicht zu weit wiedergegeben

- **Ort:** 1.6, Zeile 92 (Fakt).
- **Zitat:** EN „adds that an entity which considers a requirement not appropriate, applicable or feasible documents its reasons“. DE „dass eine Einrichtung, die eine Anforderung für nicht angemessen, nicht anwendbar oder nicht durchführbar hält, die Gründe dokumentiert“.
- **Befund:** Art. 2 Abs. 2 Unterabs. 2 erlaubt das nur bei Anforderungen, die der Anhang ausdrücklich „where appropriate“, „where applicable“ oder „to the extent feasible“ stellt. Für alle anderen Anforderungen gibt es kein Abweichen mit Begründung. Der Fakt-Satz ist weiter als die Quelle.
- **Schwere:** B.
- **Quelle:** Durchführungsverordnung (EU) 2024/2690, über `publications.europa.eu/resource/celex/32024R2690`, Abruf 23.10.2026, Art. 2 Abs. 2 Unterabs. 2: „Where the Annex to this Regulation provides that a technical or methodological requirement … shall be applied "where appropriate", "where applicable" or "to the extent feasible", and where a relevant entity considers it not appropriate, not applicable or not feasible …, the relevant entity shall in a comprehensible manner document its reasoning to that effect.“
- **Korrektur EN:** „… and adds that where the Annex qualifies a requirement with "where appropriate", "where applicable" or "to the extent feasible", an entity which considers it not appropriate, applicable or feasible documents its reasons; …“
- **Korrektur DE:** „… und fügt hinzu, dass eine Einrichtung bei Anforderungen, die der Anhang mit „soweit angemessen“, „soweit anwendbar“ oder „soweit durchführbar“ versieht, die Gründe dokumentiert, wenn sie eine solche Anforderung für nicht angemessen, nicht anwendbar oder nicht durchführbar hält; …“ (Wortlaut der DE-Fassung vor Übernahme gegenlesen.)

### B-3 · „Kann nicht mehr verlangen als von sich selbst“

- **Ort:** 1.6, Zeile 96 (Auslegung).
- **Zitat:** EN „a customer that must document why a measure is appropriate for itself cannot demand more of a ten-person supplier than of itself.“
- **Befund:** Das ist als Rechtsaussage formuliert und stimmt nicht: Die Verhältnismäßigkeit nach Art. 21 Abs. 1 betrifft die eigenen Maßnahmen der Einrichtung; vertraglich kann ein Kunde von einem Lieferanten verlangen, was er will. Ein Lieferant, der sich darauf beruft, steht in der Verhandlung schlecht da. Als Argument ist der Gedanke brauchbar, als „cannot“ nicht.
- **Schwere:** B.
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 21 Abs. 1 Unterabs. 2 (Abruf 23.10.2026): „When assessing the proportionality of those measures, due account shall be taken of the degree of the entity's exposure to risks, the entity's size …“; eine Grenze für Anforderungen an Lieferanten enthält die Vorschrift nicht.
- **Korrektur EN:** „Proportionality is written for the entity, not for its suppliers, and no law stops a customer from asking more of a supplier than of itself. But a customer that must justify its own measures by its size has a good reason to accept a small supplier's answers measured by the supplier's size, and you may say so.“
- **Korrektur DE:** „Die Verhältnismäßigkeit ist für die Einrichtung geschrieben, nicht für ihre Lieferanten, und kein Gesetz hindert einen Kunden, von einem Lieferanten mehr zu verlangen als von sich selbst. Ein Kunde, der seine eigenen Maßnahmen mit seiner Größe begründen muss, hat aber einen guten Grund, die Antworten eines kleinen Lieferanten an dessen Größe zu messen, und Sie dürfen das so sagen.“

### B-4 · „Das Gesetz bestraft die versteckte Lücke, nicht die dokumentierte“

- **Ort:** 1.7, Zeile 104 (Auslegung).
- **Zitat:** EN „The law knows the gap with a plan as the normal state; it punishes the hidden gap, not the documented one.“
- **Befund:** Als allgemeine Aussage falsch: In Deutschland ist die Nichtumsetzung von Risikomanagementmaßnahmen bußgeldbewehrt, unabhängig davon, ob sie dokumentiert ist. Für Österreich gibt es aber eine echte Grundlage, die das Handbuch nicht nennt: Nach § 45 Abs. 1 Z 3 NISG 2026 ist die Nichtumsetzung von § 32 nur strafbar, „soweit dieser Umstand der Cybersicherheitsbehörde nicht nur aufgrund einer Selbstdeklaration“ bekannt wurde; strafbar sind dagegen wissentlich falsche Angaben in der Selbstdeklaration (§ 45 Abs. 4 Z 8). Das stützt den Gedanken des Toolkits stark, gilt aber für die Einrichtung (den Kunden) und nur in Österreich.
- **Schwere:** B (Rechtsaussage ohne Beleg und zu allgemein; Beleg vorhanden).
- **Quelle:** NISG 2026, BGBl. I Nr. 94/2025, § 45 Abs. 1 Z 3 und Abs. 4 Z 8, S. 33 (Archivkopie, gelesen 23.10.2026): „3. Risikomanagementmaßnahmen gemäß § 32 nicht umsetzt, soweit dieser Umstand der Cybersicherheitsbehörde nicht nur aufgrund einer Selbstdeklaration gemäß § 33 Abs. 1 bekanntgeworden ist,“ und „8. in einer Selbstdeklaration gemäß § 33 Abs. 1 wissentlich falsche Angaben über die Umsetzung von Risikomanagementmaßnahmen macht“.
- **Korrektur EN:** Neuer Fakt-Block vor der Auslegung: „[FACT] Austria makes the point in its penalty provisions: failing to implement the measures of § 32 is an offence only insofar as the authority did not learn of it solely from the entity's self-declaration, while knowingly false statements in a self-declaration are an offence of their own. Source: NISG 2026, § 45(1) point 3 and (4) point 8 · ris.bka.gv.at · retrieved 2026-10-23“. Auslegung: „The law treats a documented gap with a plan as a normal state; Austria even spares the gap that an entity reports itself and punishes the false answer instead. …“
- **Korrektur DE:** „[FAKT] Österreich sagt es in seinen Strafbestimmungen: Die Nichtumsetzung der Maßnahmen nach § 32 ist nur strafbar, soweit die Behörde davon nicht nur aus der Selbstdeklaration der Einrichtung erfahren hat; wissentlich falsche Angaben in einer Selbstdeklaration sind dagegen eigens strafbar.“ Quelle wie oben. Auslegung: „Das Gesetz behandelt die dokumentierte Lücke mit Plan als Normalzustand; Österreich verschont sogar die Lücke, die eine Einrichtung selbst meldet, und bestraft stattdessen die falsche Antwort. …“

### B-5 · Österreich: Registrierung „bis 1. Januar 2027“

- **Ort:** 5.1, Zeile 423 (Fakt).
- **Zitat:** EN „covered entities register by 1 January 2027“. DE „registrieren sich bis 1. Januar 2027“.
- **Befund:** § 29 Abs. 3 NISG 2026 nennt kein Datum, sondern „innerhalb von drei Monaten ab Inkrafttreten“ (1.10.2026). Die WKO nennt „bis spätestens 31.12.2026“ über das USP und für die Selbstdeklaration „bis 30.09.2027“. Ein vom Gesetz nicht genanntes Datum als Fakt, das vom Datum der Kammer abweicht, ist riskant; der frühere Tag ist der sichere.
- **Schwere:** B.
- **Quelle:** NISG 2026, § 29 Abs. 3 (Archivkopie, gelesen 23.10.2026): „Die Registrierung gemäß Abs. 2 hat innerhalb von drei Monaten ab Inkrafttreten dieses Bundesgesetzes zu erfolgen.“ § 51 Abs. 2: Inkrafttreten „Nach Ablauf von neun Monaten nach der Kundmachung … mit dem nächstfolgenden Monatsersten“ (Kundmachung 23.12.2025, also 1.10.2026). WKO, „Fragen und Antworten zu NISG 2026“, `wko.at/it-sicherheit/nis-faq`, Seitendatum 08.10.2026, Abruf 23.10.2026: „bis spätestens 31.12.2026 über das USP (Unternehmensserviceportal) registrieren“; „bis 30.09.2027 Informationen hinsichtlich umgesetzter Risikomanagementmaßnahmen gemäß § 32 übermitteln“.
- **Korrektur EN:** „covered entities register within three months of entry into force, according to the chamber of commerce by 31 December 2026 through the business service portal (USP), and send a self-declaration within twelve months of the registration duty arising, according to the chamber by 30 September 2027; …“ Quellenzeile um „WKO, Fragen und Antworten zu NISG 2026, 8 October 2026“ ergänzen. Offenen Punkt 6.3 entsprechend aktualisieren.
- **Korrektur DE:** „erfasste Einrichtungen registrieren sich binnen drei Monaten ab Inkrafttreten, laut Wirtschaftskammer bis 31. Dezember 2026 über das Unternehmensserviceportal (USP), und übermitteln binnen zwölf Monaten nach Eintritt der Registrierungspflicht eine Selbstdeklaration, laut Wirtschaftskammer bis 30. September 2027; …“

### B-6 · WKO-Hotline: rund um die Uhr nur das Callcenter

- **Ort:** 5.1, Zeile 423 (Fakt). Folgestelle: Notfallkarte („rund um die Uhr, für Mitglieder kostenlos“).
- **Zitat:** EN „The Cyber-Security-Hotline of the chambers of commerce answers at 0800 888 133 around the clock, free for members, with a free first consultation by an IT security firm.“
- **Befund:** Nummer, Mitgliederbindung und kostenloses Erstgespräch stimmen. Rund um die Uhr erreichbar ist aber nur das Callcenter; die IT-Security-Firmen haben Bereitschaft Montag bis Freitag 8 bis 18 Uhr, am Wochenende wird ein Rückruf für Montag vereinbart. Wer Samstagnacht verschlüsselt wird, erwartet nach dem Text einen Experten. Weitere Einsätze zahlt der Betrieb selbst. Nichtmitglieder (etwa Freiberufler ohne Kammermitgliedschaft) sind nicht erfasst.
- **Schwere:** B (im Notfall wichtig; Nummer richtig).
- **Quelle:** WKO, „Cyber-Security-Hotline“, `wko.at/it-sicherheit/cyber-security-hotline`, Seitendatum 01.06.2026, Abruf 23.10.2026: „Montag bis Sonntag, 0 – 24 Uhr“ (Hotline); „Montag bis Freitag (werktags): 8 – 18 Uhr“ (Bereitschaft der IT-Security-Experten); „Bei Anruf am Wochenende vereinbaren Sie einen Rückruf für Montag, falls kein Feiertag“; „Das Erstgespräch mit der vom Callcenter zugewiesenen IT-Security-Firma ist kostenlos,“ „ein weiterer Einsatz muss vom Kunden an die Firma bezahlt werden.“
- **Korrektur EN:** „The Cyber-Security-Hotline of the chambers of commerce takes calls at 0800 888 133 around the clock, free for members; it passes the call to an IT security firm on duty Monday to Friday, 8 am to 6 pm, whose first consultation is free; at weekends a call-back is arranged for Monday; further work is paid by the business.“
- **Korrektur DE:** „Die Cyber-Security-Hotline der Wirtschaftskammern nimmt unter 0800 888 133 rund um die Uhr Anrufe an, für Mitglieder kostenlos; sie vermittelt eine IT-Security-Firma mit Bereitschaft Montag bis Freitag, 8 bis 18 Uhr, deren Erstgespräch kostenlos ist; am Wochenende wird ein Rückruf für Montag vereinbart; weitere Einsätze zahlt der Betrieb.“ Notfallkarte: „0800 888 133, rund um die Uhr; Experten Mo bis Fr 8 bis 18 Uhr“.

### B-7 · Deutschland: „das geänderte BSI-Gesetz“

- **Ort:** 1.1, Zeilen 40 und 42; 5.2, Zeilen 431 und 433; Quellenliste Nr. 19, Zeile 545.
- **Zitat:** EN „In Germany the amended BSI Act has been in force since 6 December 2025.“ Quellenzeile „BSI-Gesetz as amended by the German NIS 2 transposition act“.
- **Befund:** Das NIS2UmsuCG hat in Art. 1 ein neues BSI-Gesetz erlassen („BSI-Gesetz vom 2. Dezember 2025“), nicht das alte geändert. Es wurde seither am 23. Juli 2026 geändert (BGBl. 2026 I Nr. 226). Die Registrierungsfrist („binnen drei Monaten“) trägt keine Paragrafenangabe (§ 33 Abs. 1 BSIG). Inkrafttreten 6.12.2025 bestätigt.
- **Schwere:** B (ungenau, Zitat unvollständig).
- **Quelle:** gesetze-im-internet.de, `gesetze-im-internet.de/bsig_2025/BJNR12D0B0025.html`, Abruf 23.10.2026: „BSI-Gesetz vom 2. Dezember 2025 (BGBl. 2025 I Nr. 301, S. 2), das zuletzt durch Artikel 8 Absatz 1 des Gesetzes vom 23. Juli 2026 (BGBl. 2026 I Nr. 226) geändert worden ist“; „Es tritt gem. Art. 30 dieses G am 6.12.2025 in Kraft.“ § 33 Abs. 1 (`…/bsig_2025/__33.html`): „spätestens drei Monate, nachdem sie erstmals oder erneut als eine der vorgenannten Einrichtungen gelten“.
- **Korrektur EN:** „In Germany the new BSI Act (BSI-Gesetz of 2 December 2025, enacted by the NIS 2 transposition act) has been in force since 6 December 2025.“ Quellenzeile: „BSI-Gesetz of 2 December 2025, BGBl. 2025 I No. 301, last amended on 23 July 2026, BGBl. 2026 I No. 226, § 33(1) · gesetze-im-internet.de · retrieved 2026-10-23“.
- **Korrektur DE:** „In Deutschland ist das neue BSI-Gesetz (BSI-Gesetz vom 2. Dezember 2025, erlassen mit dem NIS-2-Umsetzungsgesetz) seit 6. Dezember 2025 in Kraft.“ Quellenzeile: „BSI-Gesetz vom 2.12.2025, BGBl. 2025 I Nr. 301, zuletzt geändert am 23.7.2026, BGBl. 2026 I Nr. 226, § 33 Abs. 1 · gesetze-im-internet.de · abgerufen 23.10.2026“.

### B-8 · Polizeinotruf 110 ohne Quelle

- **Ort:** 5.2, Zeile 431 und Quellenzeile 433.
- **Zitat:** EN „the police emergency number is 110“.
- **Befund:** Die Nummer stimmt, steht aber auf keiner der zitierten Seiten (polizei.de ZAC nennt sie nicht; `quellen.md` vermerkt das selbst). Nach der Belegregel braucht sie eine Quelle.
- **Schwere:** B (unbelegt).
- **Quelle:** Bundesnetzagentur, „Notruf“, `bundesnetzagentur.de/DE/Fachthemen/Telekommunikation/Nummerierung/Notruf/start.html`, Abruf 23.10.2026: „Die Rufnummer 110 ist die bundesweit einheitliche kurzstellige Rufnummer der Polizei.“ und „Die Rufnummer 112 steht in der gesamten Europäischen Union als einheitliche Notrufnummer zur Verfügung.“
- **Korrektur EN:** Quellenzeile 433 ergänzen: „Bundesnetzagentur, Notruf · retrieved 2026-10-23“; im Text „the police emergency number is 110, the European 112“.
- **Korrektur DE:** „der Polizei-Notruf ist 110, der Euro-Notruf 112“; Quelle „Bundesnetzagentur, Notruf · abgerufen 23.10.2026“.

### B-9 · F3: Gerichtsentscheidungen nur aus zweiter Hand, Art und Datum zweifelhaft

- **Ort:** F3, Zeilen 293 und 295 (Fakt); Quellenliste Nr. 38, Zeile 570; offener Punkt 6.23.
- **Zitat:** EN „Two German courts dealt with cyber policies where the answers in the application did not match the facts.“ Quelle „OLG Schleswig, judgment of 8 January 2025, 16 U 63/24, both known from secondary sources only“.
- **Befund:** (1) Fakt-Marker passt nicht: Die Entscheidungen wurden nicht gelesen. (2) Das OLG hat durch Beschluss nach § 522 ZPO entschieden, nicht durch Urteil; als Datum nennen die Sekundärquellen teils den 8., teils den 9. Januar 2025 (vorher Hinweisbeschluss vom 14.10.2024). (3) Inhalt: Das LG Kiel bejahte eine Anfechtung wegen arglistiger Täuschung, weil Risikofragen „ins Blaue hinein“ beantwortet wurden; „did not match the facts“ ist zu schwach für die praktische Botschaft (wer ohne Prüfung „ja“ ankreuzt, kann den gesamten Schutz verlieren).
- **Schwere:** B.
- **Quelle:** GÖRG, „Cyber-Versicherung: Kein Schutz bei unsorgfältiger Beantwortung der Risikofragen“, 25.04.2025, `goerg.de/de/aktuelles/veroeffentlichungen/25-04-2025/…`, Abruf 23.10.2026: „OLG Schleswig-Holstein, Beschluss vom 8. Januar 2025, Az. 16 U 63/24“; „LG Kiel, Urteil vom 23. Mai 2024, Az. 5 O 128/21“. Weitere Suchtreffer (deubner-steuern.de) nennen „Beschluss vom 09.01.2025“. Der Bericht von beck-aktuell.de konnte nicht gelesen werden (Sage-Hook).
- **Korrektur EN:** Marker für den zweiten Satz auf [UNCERTAIN]: „Two German courts dealt with a cyber policy where the application's risk questions had been answered without checking: the regional court of Kiel upheld the insurer's rescission for fraudulent misrepresentation, the higher regional court of Schleswig rejected the appeal by order. The decisions were not read; dates and wording come from law firm reports.“ Quelle: „LG Kiel, judgment of 23 May 2024, 5 O 128/21; OLG Schleswig, order under § 522 ZPO of 8 or 9 January 2025 (sources differ), 16 U 63/24; GÖRG, Legal Update, 25 April 2025 · retrieved 2026-10-23“.
- **Korrektur DE:** „[UNSICHER] Zwei deutsche Gerichte haben über eine Cyberpolice entschieden, bei der die Risikofragen im Antrag ohne Prüfung beantwortet worden waren: Das LG Kiel bestätigte die Anfechtung des Versicherers wegen arglistiger Täuschung, das OLG Schleswig wies die Berufung durch Beschluss zurück. Die Entscheidungen selbst wurden nicht gelesen; Daten und Inhalt stammen aus Kanzleiberichten.“ Quelle: „LG Kiel, Urteil vom 23.5.2024, 5 O 128/21; OLG Schleswig, Beschluss nach § 522 ZPO vom 8. oder 9.1.2025 (Angaben weichen ab), 16 U 63/24; GÖRG, Legal Update, 25.4.2025 · abgerufen 23.10.2026“.

### B-10 · F3: „24 Monate sind der übliche Zeitraum der Formulare“

- **Ort:** F3, Zeile 297 (Auslegung); `questions.json` F3.
- **Zitat:** EN „The 24 months are the usual period of the forms, not a legal term.“
- **Befund:** Keines der gelesenen Formulare nennt 24 Monate: Markel fragt nach den letzten 5 Jahren, Allianz nach dem Schadenverlauf der letzten drei Jahre, Mannheimer ohne Zeitraum. Die Aussage ist unbelegt und widerspricht den eigenen Quellen. Für den Betrieb heißt das: Wer einem Versicherer antwortet, muss dessen Zeitraum nehmen, nicht die 24 Monate des Toolkits.
- **Schwere:** B.
- **Quelle:** Archivkopien, gelesen 23.10.2026: Markel Abschnitt 4 Nr. 3: „Hat der Antragsteller in den letzten 5 Jahren Schäden …“; Allianz S. 3: „Schadenverlauf der letzten drei Jahre“; Mannheimer Abschnitt 12: „Waren Sie bereits von einem Cyber-Schaden betroffen?“
- **Korrektur EN:** „The 24 months are our choice, not a legal term; the forms we read ask for three years (Allianz), five years (Markel) or without a limit (Mannheimer). When you fill in an insurer's form, use its period.“
- **Korrektur DE:** „Die 24 Monate sind unsere Wahl, kein Rechtsbegriff; die gelesenen Formulare fragen nach drei Jahren (Allianz), fünf Jahren (Markel) oder ohne Grenze (Mannheimer). Wer einen Versicherungsantrag ausfüllt, nimmt dessen Zeitraum.“

### B-11 · F2 und 4.2: Ausnahme „kein Risiko“ bei der 72-Stunden-Meldung fehlt

- **Ort:** F2, Zeile 285 (Fakt); 4.2 „Personal data: 72 hours“, Zeile 401; `questions.json` F2.
- **Zitat:** EN „A controller must notify a personal data breach to the supervisory authority "without undue delay and, where feasible, not later than 72 hours after having become aware of it"“.
- **Befund:** Art. 33 Abs. 1 enthält im selben Satz die Ausnahme „unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons“. Ohne sie liest der Betrieb, jede Datenpanne sei zu melden; die Prüfung, ob ein Risiko besteht, ist aber genau die Aufgabe der benannten Person in F2. Die Dokumentationspflicht nach Abs. 5 gilt auch ohne Meldung (steht in F4 richtig).
- **Schwere:** B.
- **Quelle:** Verordnung (EU) 2016/679, Art. 33 Abs. 1 (Abruf 23.10.2026): „… unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons.“ DE: „es sei denn, dass die Verletzung des Schutzes personenbezogener Daten voraussichtlich nicht zu einem Risiko für die Rechte und Freiheiten natürlicher Personen führt.“
- **Korrektur EN (Zeile 285):** Zitat um „, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons“ ergänzen. Zeile 401: „… the named person decides within the first day whether personal data is affected and whether a risk to the persons concerned is likely; if so, the report goes to the authority …; every breach is written down either way (F4).“
- **Korrektur DE (Zeile 285):** „…, es sei denn, dass die Verletzung … voraussichtlich nicht zu einem Risiko für die Rechte und Freiheiten natürlicher Personen führt“ ergänzen. Zeile 401: „… entscheidet am ersten Tag, ob personenbezogene Daten betroffen sind und ob ein Risiko für die Betroffenen wahrscheinlich ist; dann geht die Meldung an die Behörde …; aufgeschrieben wird jede Verletzung (F4).“

### B-12 · E3: „Ein verlorenes Notebook ohne Verschlüsselung ist eine meldepflichtige Datenpanne“

- **Ort:** E3, Zeile 255 (Auslegung).
- **Zitat:** EN „a lost laptop without encryption is a reportable data breach, with encryption it is a lost laptop.“
- **Befund:** Zu absolut. Meldepflichtig ist der Verlust nur, wenn personenbezogene Daten darauf sind und ein Risiko für die Betroffenen wahrscheinlich ist (Art. 33 Abs. 1). Auch mit Verschlüsselung ist der Verlust eine Verletzung, die dokumentiert wird (Art. 33 Abs. 5); die Verschlüsselung entlastet bei der Benachrichtigung der Betroffenen (Art. 34 Abs. 3 Buchst. a) und in der Regel bei der Risikoeinschätzung.
- **Schwere:** B (Rechtsaussage ungenau).
- **Quelle:** Verordnung (EU) 2016/679, Art. 33 Abs. 1 und 5, Art. 34 Abs. 3 Buchst. a (Abruf 23.10.2026): „… such as encryption“.
- **Korrektur EN:** „a lost laptop with personal data and without encryption is usually a breach you must report within 72 hours; with encryption it is usually a lost laptop that you note in the incident log.“
- **Korrektur DE:** „ein verlorenes Notebook mit personenbezogenen Daten und ohne Verschlüsselung ist meist eine Datenpanne, die binnen 72 Stunden zu melden ist; mit Verschlüsselung ist es meist ein verlorenes Notebook, das im Vorfallsprotokoll vermerkt wird.“

### B-13 · G2: Auftragsverarbeitungsvertrag „in Ihrem Namen“; Widerspruch zum Hilfetext

- **Ort:** G2, Zeile 323 (Auslegung); `questions.json` G2, Zeile 310.
- **Zitat:** Handbuch EN „No questionnaire we read asks this in so many words; the question stands because the data processing agreement your customer signs with you promises it on your behalf.“ Hilfetext EN „Customer questionnaires ask for it“.
- **Befund:** (1) Den Auftragsverarbeitungsvertrag schließt der Lieferant selbst als Auftragsverarbeiter; er verspricht nichts „in Ihrem Namen“. (2) Er gibt es nur, wenn der Lieferant Daten im Auftrag des Kunden verarbeitet; der Beispielbetrieb (Elektriker mit Kontakten und Plänen) ist dafür meist eigener Verantwortlicher. (3) Hilfetext und Handbuch widersprechen sich.
- **Schwere:** B.
- **Quelle:** Verordnung (EU) 2016/679, Art. 28 Abs. 3 Buchst. b (Abruf 23.10.2026): „that persons authorised to process the personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality“; Art. 28 Abs. 3 Satz 1: Vertrag „that is binding on the processor with regard to the controller“.
- **Korrektur EN (Zeile 323):** „No questionnaire we read asks this in so many words. The question stands because a data processing agreement, where you process personal data on your customer's behalf, makes you promise it, and because it is the simplest proof that staff know what may not leave the business.“ Hilfetext G2: „Not every questionnaire asks, but a data processing agreement requires it; most employment contracts already contain a clause. Check, do not assume.“
- **Korrektur DE:** „Kein gelesener Fragebogen fragt das mit diesen Worten. Die Frage steht, weil ein Auftragsverarbeitungsvertrag, wo Sie Daten im Auftrag Ihres Kunden verarbeiten, Sie genau das zusagen lässt, und weil sie der einfachste Beleg ist, dass die Belegschaft weiß, was den Betrieb nicht verlassen darf.“ Hilfetext: „Nicht jeder Fragebogen fragt danach, aber ein Auftragsverarbeitungsvertrag verlangt es; die meisten Dienstverträge enthalten schon eine Klausel. Nachsehen, nicht annehmen.“

### B-14 · G3: „Kein Sicherheitsfragebogen fragt danach“; Markel fragt nach dem Vier-Augen-Prinzip

- **Ort:** G3, Zeile 331 (Auslegung), Quellenzeile 329; offener Punkt 6.7; `questions.json` G3, Zeile 318.
- **Zitat:** Handbuch EN „This is the one question that no security questionnaire asks and that costs small businesses the most money.“ Hilfetext EN „Insurers ask for it; it costs nothing.“
- **Befund:** (1) Markel fragt nach dem Vier-Augen-Prinzip für Überweisungen über 10.000 € (Abschnitt 4 Nr. 6, für Betriebe über 10 Mio. € Umsatz; Abschnitt 9 bei Online-Zahlungsmethoden) und nach Fake-President-Vorfällen (Abschnitt 4 Nr. 3). Die Aussage ist damit falsch, der Hilfetext „Insurers ask for it“ teilweise belegt; beide widersprechen sich. (2) „costs small businesses the most money“ ist eine Größenaussage ohne Quelle.
- **Schwere:** B.
- **Quelle:** Markel, Fragebogen Pro Cyber v2 (Archivkopie, gelesen 23.10.2026), Abschnitt 4 Nr. 6: „Vier-Augen-Prinzip: Überweisungen über 10.000 € werden erst nach einer zusätzlichen Freigabe durchgeführt.“; Abschnitt 9: „Werden Überweisungen über 10.000 € im 4-Augen-Prinzip geprüft?“; Abschnitt 4 Nr. 3: „Gab es Vorfälle wie Fake-President-Angriffe oder Vertrauensschäden?“
- **Korrektur EN:** „Customer questionnaires rarely ask this; among the insurers, Markel asks larger businesses about a four-eyes rule for transfers above 10,000 euro. It is priority 1 because it needs no technology: a rule, a known number, two people.“ Markel in die Quellenzeile 329 aufnehmen. Hilfetext G3: „The one rule against payment fraud and the "boss scam". Some insurers ask about a four-eyes rule for payments; it costs nothing.“
- **Korrektur DE:** „Kundenfragebögen fragen das selten; unter den Versicherern fragt Markel größere Betriebe nach dem Vier-Augen-Prinzip für Überweisungen über 10.000 Euro. Sie hat Priorität 1, weil sie keine Technik braucht: eine Regel, eine bekannte Nummer, zwei Personen.“ Hilfetext: „Die eine Regel gegen Zahlungsbetrug und die Chef-Masche. Manche Versicherer fragen nach dem Vier-Augen-Prinzip bei Zahlungen; sie kostet nichts.“

### B-15 · H1: Auslegung im Fakt-Block, doppelte Verneinung

- **Ort:** H1, Zeile 337 (Fakt).
- **Zitat:** EN „The GDPR's record of processing activities is not required of businesses with fewer than 250 staff unless the processing is not occasional, which for email and file storage it is not.“
- **Befund:** Der Nebensatz „which for email and file storage it is not“ ist eine Auslegung (verbreitet, aber nicht Wortlaut) und gehört nicht unter Fakt. Die doppelte Verneinung versteht ein Betriebsinhaber nicht; die Folgerung (das Verzeichnis ist zu führen) steht nirgends. Art. 30 Abs. 5 nennt außerdem zwei weitere Rückausnahmen (Risiko, besondere Kategorien).
- **Schwere:** B (Marker passt nicht) mit C-Anteil (Lesbarkeit).
- **Quelle:** Verordnung (EU) 2016/679, Art. 30 Abs. 5 (Abruf 23.10.2026): „shall not apply to an enterprise or an organisation employing fewer than 250 persons unless the processing it carries out is likely to result in a risk …, the processing is not occasional, or the processing includes special categories of data …“.
- **Korrektur EN:** Fakt: „The GDPR exempts businesses with fewer than 250 staff from the record of processing activities only where the processing is occasional, unlikely to result in a risk and involves no special categories of data.“ Neue Auslegung: „Email, accounting and file storage are not occasional, so in our reading almost every business keeps the record; the provider list of H1 is a good start for it.“
- **Korrektur DE:** Fakt: „Die DSGVO befreit Unternehmen mit weniger als 250 Mitarbeitern vom Verzeichnis der Verarbeitungstätigkeiten nur, wenn die Verarbeitung gelegentlich erfolgt, voraussichtlich kein Risiko birgt und keine besonderen Datenkategorien umfasst.“ Auslegung: „E-Mail, Buchhaltung und Dateiablage sind nicht gelegentlich; nach unserer Lesart führt deshalb fast jeder Betrieb das Verzeichnis, und die Dienstleisterliste aus H1 ist ein guter Anfang dafür.“

### B-16 · 4.1: Zitat aus onlinesicherheit.gv.at nicht wörtlich, Seitentitel falsch

- **Ort:** 4.1, Zeile 393 (Fakt) und Quellenzeile 395; Quellenliste Nr. 15, Zeile 538; `quellen.md` S7.
- **Zitat:** DE „dass ein infizierter Computer „sofort abgewürgt, also stromlos gemacht werden“ sollte“. Quelle „onlinesicherheit.gv.at, Erpressungstrojaner, Stand 23.7.2022“ bzw. Nr. 15 „Erpressungstrojaner: Was tun bei Infektion?“.
- **Befund:** Die Seite mit Stand 23. Juli 2022 heißt „Ransomware“ (Themen › Erste Hilfe › Schadsoftware entfernen) und sagt „Im Falle einer Infektion sollte der Computer sofort vom Strom genommen werden.“ Die Wendung „abgewürgt, also stromlos gemacht“ steht dort nicht und war im Netz nicht auffindbar. Ein Zitat in Anführungszeichen, das so nicht im Original steht, verletzt die Belegregel, auch wenn der Sinn gleich ist. Die Seite fügt hinzu, dass das Ausschalten eine Lösegeldzahlung zur Entschlüsselung unmöglich machen kann; das ist für die Abwägung in der Auslegung relevant.
- **Schwere:** B.
- **Quelle:** `onlinesicherheit.gv.at/Themen/Erste-Hilfe/Schadsoftware-entfernen/Ransomware.html`, „Letzte Aktualisierung: 23. Juli 2022“, Abruf 23.10.2026 (HTML geladen und durchsucht): „Im Falle einer Infektion sollte der Computer sofort vom Strom genommen werden. Das kann durch ein längeres Drücken auf den Start-Knopf erreicht werden. Man muss sich hierbei jedoch bewusst sein, dass diese Aktion die Möglichkeit der Lösegeldzahlung zur Entschlüsselung unmöglich machen kann.“ „Melden Sie den Vorfall daher in der nächsten Polizeidienststelle.“
- **Korrektur EN:** Quellenzeile: „onlinesicherheit.gv.at (Federal Chancellery and A-SIT), Ransomware, Erste Hilfe › Schadsoftware entfernen, last updated 23 July 2022 · retrieved 2026-10-23“; Nr. 15 entsprechend.
- **Korrektur DE:** „dass ein infizierter Computer „sofort vom Strom genommen werden“ sollte“; Quellenzeile und Nr. 15 wie oben; `quellen.md` S7 berichtigen.

### B-17 · D4: „eine Übung am Schreibtisch ist der Test, den das Label will“

- **Ort:** D4, Zeile 229 (Auslegung).
- **Zitat:** EN „a drill once a year, even at the desk, is the test the label wants.“
- **Befund:** Das Kriterium von B14 verlangt einen Test mindestens alle zwei Jahre, der „zumindest die Daten- und Servicewiederherstellung umfassen“ muss, und einen Notfallplan „inkl. Backupkonzept“. Eine reine Schreibtischübung erfüllt das nicht. Wer das Label anstrebt, braucht den Wiederherstellungstest aus D2.
- **Schwere:** B.
- **Quelle:** Cyber Trust Austria, Schema Policy 2026, Version 6.0 vom 8.9.2025, S. 16, B14 (Archivkopie, gelesen 23.10.2026): „Die Pläne müssen mindestens alle zwei Jahre getestet werden. Der Test muss zumindest die Daten- und Servicewiederherstellung umfassen.“
- **Korrektur EN:** „… a drill once a year, even at the desk, keeps it alive; the label's B14 wants a test at least every two years that includes restoring data and services, which is the restore test of D2.“
- **Korrektur DE:** „… eine Übung einmal im Jahr, auch am Schreibtisch, hält sie lebendig; die Frage B14 des Labels verlangt mindestens alle zwei Jahre einen Test, der die Wiederherstellung von Daten und Diensten umfasst, also den Wiederherstellungstest aus D2.“

### B-18 · Label und CyberRisikoCheck: „die Antworten hier sind die Antworten dort“

- **Ort:** 1.5, Zeile 88; 5.1, Zeile 427; 5.2, Zeile 435 (Auslegungen).
- **Zitat:** EN Zeile 427 „its fourteen Standard questions overlap with blocks B to H of this toolkit, so the answers here are the answers there.“ Zeile 88 „both of which ask the questions of blocks B to H in their own words“.
- **Befund:** Überschneidung ja, Deckung nein. Die Kriterien des Standard-Labels sind in mehreren Punkten strenger oder anders als die Toolkit-Fragen: B1 verlangt eine Richtlinie auf Basis eines Regelwerks, von der Geschäftsführung freigegeben und alle zwei Jahre überprüft; B4 ein Verzeichnis mit Name, Version und Verantwortlichem; B7 ein Dokument zur sicheren Konfiguration; B13 Protokolle Server 90, Clients 60 Tage; B14 einen Wiederherstellungstest. G3 und die Dienstleisterfragen H fragt das Standard-Label nicht (A11 ist Silber und Gold). Ein Betrieb, der „die Antworten hier sind die Antworten dort“ glaubt, scheitert womöglich an der Validierung.
- **Schwere:** B (irreführend für die Entscheidung, das Label zu beantragen).
- **Quelle:** Cyber Trust Austria, Schema Policy 2026, S. 14 bis 16, B1, B4, B7, B13, B14, und S. 18, A11 (Archivkopie, gelesen 23.10.2026); z. B. B13: „Die Server-Protokolle werden zumindest 90 Tage aufbewahrt, die Client-Protokolle zumindest 60 Tage.“
- **Korrektur EN (Zeile 427):** „… its fourteen Standard questions overlap with blocks B to G of this toolkit; the answers here are a good draft for the label, but its criteria go further in places (a reviewed policy, a versioned asset list, documented configuration, log retention, a restore test).“ Zeile 88 entsprechend „both cover much of blocks B to G“.
- **Korrektur DE:** „… seine vierzehn Standard-Fragen überschneiden sich mit den Blöcken B bis G dieses Toolkits; die Antworten hier sind ein guter Entwurf für das Label, seine Kriterien gehen aber stellenweise weiter (überprüfte Richtlinie, Inventar mit Versionen, dokumentierte Konfiguration, Aufbewahrung von Protokollen, Wiederherstellungstest).“

### B-19 · Glossar „Significant incident“

- **Ort:** Glossar, Zeile 501.
- **Zitat:** EN „Under the Implementing Regulation an incident with a loss above 500 000 euro or five percent of turnover, among other criteria; the threshold at which your customer's own deadlines start.“
- **Befund:** (1) Es fehlt „whichever is lower“ und „has caused or is capable of causing“; ohne das klingt die Schwelle viel höher. (2) Art. 3 der Durchführungsverordnung gilt nur für die digitalen Anbieter. Für die meisten Kunden gilt Art. 23 Abs. 3 der Richtlinie (schwere Betriebsstörung oder finanzieller Verlust, erheblicher Schaden für andere), in Österreich für alle § 5 NISV 2026 mit derselben Geldschwelle. „die Schwelle, ab der die eigenen Fristen Ihres Kunden laufen“ stimmt so nur für digitale Anbieter.
- **Schwere:** B.
- **Quelle:** Durchführungsverordnung (EU) 2024/2690, Art. 3 Abs. 1 Buchst. a: „has caused or is capable of causing direct financial loss for the relevant entity that exceeds EUR 500 000 or 5 % of the relevant entity's total annual turnover in the preceding financial year, whichever is lower“; Richtlinie (EU) 2022/2555, Art. 23 Abs. 3; NISV 2026, BGBl. II Nr. 290/2026, § 5 Abs. 1 Z 1 („je nachdem, welcher Wert niedriger ist“), alle Abruf 23.10.2026.
- **Korrektur EN:** „Significant incident. An incident that causes or can cause severe disruption or financial loss to the entity, or considerable damage to others (Art. 23(3) of the Directive). For digital providers, and in Austria for every covered entity, one criterion is a direct financial loss above 500 000 euro or 5 percent of the previous year's turnover, whichever is lower. Only a significant incident starts your customer's 24-hour clock.“
- **Korrektur DE:** „Erheblicher Sicherheitsvorfall. Ein Vorfall, der eine schwere Betriebsstörung oder einen finanziellen Verlust der Einrichtung oder einen erheblichen Schaden für andere verursacht hat oder verursachen kann (Art. 23 Abs. 3 der Richtlinie). Für digitale Anbieter und in Österreich für jede erfasste Einrichtung ist ein Kriterium ein direkter finanzieller Verlust über 500.000 Euro oder 5 Prozent des Vorjahresumsatzes, je nachdem, welcher Wert niedriger ist. Erst ein erheblicher Vorfall startet die 24-Stunden-Uhr Ihres Kunden.“

### B-20 · D3, Glossar, Hilfetext: „Wiederanlaufzeit“ und RTO verwechselt

- **Ort:** Glossar „Recovery time“, Zeile 475; `questions.json` D3, Zeile 193.
- **Zitat:** Glossar EN „How long the business can bridge without its IT (question D3) and how long a restore takes (D2). Questionnaires call it RTO.“ Hilfetext EN „Questionnaires call this the recovery time objective.“ DE „Fragebögen nennen das Wiederanlaufzeit.“
- **Befund:** D3 fragt, wie lange der Betrieb ohne IT überbrücken kann; das ist die maximal tolerierbare Ausfallzeit. Die RTO ist die Zielzeit, in der die IT wieder laufen soll, und muss kürzer sein. Markel trennt beides ausdrücklich („Wie schnell würde der Umsatz … beeinträchtigt“ und „Wie schnell können Sie Ihr IT-System … wieder in Notbetrieb nehmen (Wiederanlaufzeit)?“). Wer die D3-Antwort („etwa einen Tag“) als RTO einträgt, verspricht eine Wiederherstellung, die er nie getestet hat.
- **Schwere:** B (führt beim Ausfüllen von Fragebögen zu falschen Angaben).
- **Quelle:** Markel, Fragebogen Pro Cyber v2, Abschnitt 7.3, S. 7 (Archivkopie, gelesen 23.10.2026), beide Fragen wörtlich wie oben.
- **Korrektur EN:** Glossar: „Tolerable downtime and recovery time. How long the business can bridge without its IT (D3) is the tolerable downtime; how long it takes to get the IT running again is the recovery time, which questionnaires call RTO and which the restore test (D2) measures. The RTO must be shorter than the tolerable downtime.“ Hilfetext D3: „Questionnaires ask this as "maximum tolerable downtime". It is not the same as the recovery time (RTO), which the restore test measures.“
- **Korrektur DE:** Glossar: „Tolerierbare Ausfallzeit und Wiederanlaufzeit. Wie lange der Betrieb ohne IT überbrückt (D3), ist die tolerierbare Ausfallzeit; wie lange es dauert, bis die IT wieder läuft, ist die Wiederanlaufzeit, in Fragebögen RTO, die der Wiederherstellungstest (D2) misst. Die Wiederanlaufzeit muss kürzer sein als die tolerierbare Ausfallzeit.“ Hilfetext: „Fragebögen nennen das maximal tolerierbare Ausfallzeit. Sie ist nicht dasselbe wie die Wiederanlaufzeit (RTO), die der Wiederherstellungstest misst.“

### B-21 · 4.2: Rechtsaussagen ohne Marker und ohne eigene Quelle

- **Ort:** 4.2, Zeilen 401 und 403.
- **Zitat:** EN Zeile 403 „Your customer's early warning is due within 24 hours of its own awareness; your call is what starts its clock.“
- **Befund:** Die beiden Absätze tragen weder Marker noch Quellenzeile, obwohl sie Fristen und Rechtsfolgen nennen; der Verweis auf Abschnitt 2.5 ersetzt die Quelle nach der Hausregel nicht. Inhaltlich: Die Uhr des Kunden startet nur bei einem erheblichen Vorfall des Kunden; ein Anruf des Lieferanten startet sie nicht automatisch.
- **Schwere:** B.
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 23 Abs. 4 Buchst. a (Abruf 23.10.2026): „within 24 hours of becoming aware of the significant incident“.
- **Korrektur EN:** Marker [INTERPRETATION] setzen; Satz: „If your incident is significant for your customer, its early warning is due within 24 hours of its own awareness, and your call may be the moment it becomes aware.“ Quellenzeile „Directive (EU) 2022/2555, Art. 23(4); Regulation (EU) 2016/679, Art. 33(1) · retrieved 2026-10-23“.
- **Korrektur DE:** „Ist Ihr Vorfall für Ihren Kunden erheblich, ist dessen Frühwarnung binnen 24 Stunden nach seiner eigenen Kenntnis fällig, und Ihr Anruf kann der Moment sein, in dem er Kenntnis erlangt.“ Marker und Quelle wie EN.

### B-22 · E4: „bevor die Verordnung gilt“; Art. 14 CRA gilt schon

- **Ort:** E4, Zeile 263 (Auslegung).
- **Zitat:** EN „A business that ships devices or software can publish a contact address and a support statement today, before the Regulation applies“.
- **Befund:** Der Fakt-Block (Zeile 259) sagt richtig, dass die Meldepflicht für aktiv ausgenutzte Schwachstellen seit 11. September 2026 gilt. Die Auslegung erweckt den Eindruck, für Hersteller gelte noch nichts. Ein Software- oder Gerätelieferant muss heute schon melden. Für ihn ist das der wichtigste praktische Punkt.
- **Schwere:** B.
- **Quelle:** Verordnung (EU) 2024/2847, Art. 71 Abs. 2 (Abruf 23.10.2026): „This Regulation shall apply from 11 December 2027. However, Article 14 shall apply from 11 September 2026 …“.
- **Korrektur EN:** „A business that ships devices or software already has one duty today: since 11 September 2026 it reports actively exploited vulnerabilities in its products under Article 14. The contact address and the support statement it can publish now, before the rest of the Regulation applies in December 2027; …“
- **Korrektur DE:** „Ein Betrieb, der Geräte oder Software liefert, hat schon heute eine Pflicht: Seit 11. September 2026 meldet er aktiv ausgenutzte Schwachstellen seiner Produkte nach Art. 14. Kontaktadresse und Angabe zum Unterstützungszeitraum kann er jetzt veröffentlichen, bevor der Rest der Verordnung im Dezember 2027 gilt; …“

### B-23 · Abschnitt 3: „Niemand prüft …“ und „in der Praxis angenommen“

- **Ort:** Abschnitt 3, Zeile 379 und Zeile 383 (Auslegung).
- **Zitat:** EN Zeile 379 „Nobody audits a ten-person supplier“; DE „Niemand prüft einen Zehn-Personen-Lieferanten vor Ort“. Zeile 383 „Thirteen of these come from the old supplier response kit and have been accepted in practice by customers and insurers“.
- **Befund:** (1) Ohne Marker und ohne Beleg; widerspricht 1.2 und 1.3, wo Prüfrechte (Durchführungsverordnung 5.1.4 Buchst. e, DORA Art. 30 Abs. 3 Buchst. e) Thema sind. EN und DE sagen nicht dasselbe („audits“ gegen „vor Ort“). (2) „accepted in practice“ ist eine Erfahrungsaussage ohne Quelle; das alte Kit wurde nicht verkauft und nicht ausgewertet.
- **Schwere:** B.
- **Quelle:** Durchführungsverordnung (EU) 2024/2690, Anhang Nr. 5.1.4 Buchst. e: „the right to audit or right to receive audit reports“ (Abruf 23.10.2026).
- **Korrektur EN:** „An on-site audit of a ten-person supplier is rare; what the reviewer wants is a dated document per answer …“ und „Thirteen of these come from the old supplier response kit; none requires a tool you do not already have.“
- **Korrektur DE:** „Eine Prüfung vor Ort ist bei einem Zehn-Personen-Lieferanten selten; die prüfende Person will je Antwort ein datiertes Dokument …“ und „Dreizehn davon stammen aus dem alten Lieferanten-Antwortkit; keiner braucht ein Werkzeug, das Sie nicht schon haben.“

### B-24 · PDF: „(c)“ wird als „©“ gesetzt

- **Ort:** EN-PDF Seite 13, D1 Fakt-Block (Markdown Zeile 201): „the Directive's area (c) names backup management“.
- **Zitat:** gerendert „the Directive's area © names backup management and disaster recovery.“
- **Befund:** Die Fließtextschrift ersetzt die Zeichenfolge „(c)“ durch das Copyright-Zeichen (Ligatur der Schrift; die Textebene enthält „(c)“, das Bild zeigt „©“). Damit ist eine Rechtsfundstelle im Druck unlesbar. In den Quellenzeilen (Monospace) tritt es nicht auf, in DE nicht, weil dort „Bereich c“ steht. Gleiches Risiko in allen anderen Dokumenten mit Fließtext „(c)“, etwa D6 „Art. 30(2)(c)“.
- **Schwere:** B (Inhalt im Druck verfälscht).
- **Quelle:** eigene Darstellung, `security-evidence-handbook-en.pdf`, Seite 13, gerendert mit pypdfium2 bei 300 dpi, 23.10.2026.
- **Korrektur EN und DE:** Im Seiten-CSS für die Fließtextschrift die Ligaturen und kontextuellen Alternativen abschalten (`font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-contextual; font-feature-settings: "liga" 0, "dlig" 0, "calt" 0;`) oder „(c)“ im Quelltext mit einem schmalen geschützten Leerzeichen bzw. `&#40;c&#41;` absichern; danach alle PDFs beider Toolkits nach „©“ im gerenderten Bild prüfen.

### B-25 · Hilfetexte mit falschen oder unbelegten Sachaussagen (`questions.json`)

- **Ort und Zitat:**
  - C6, Zeile 163: EN „Length instead of forced changes; the standards bodies say so since 2025. A forced change every ninety days is no longer the rule.“
  - C2, Zeile 130: EN „The question every insurer asks first.“
  - B2, Zeile 97: EN „No law requires it, but nearly every questionnaire asks.“
  - E2, Zeile 224: EN „An old operating system without updates is the most common finding in small businesses.“
  - F1, Zeile 263: EN „A customer covered by NIS 2 must send an early warning within 24 hours of becoming aware, which is why the deadline is in almost every contract.“
- **Befund:** C6: NIST hat den Zwangswechsel 2017 aufgegeben, das BSI im IT-Grundschutz spätestens mit ORP.4 (Edition 2023 enthält „Reine zeitgesteuerte Wechsel SOLLTEN vermieden werden“); „seit 2025“ ist falsch. „Nicht mehr die Regel“ widerspricht dem Unsicher-Kasten des Handbuchs: Die Durchführungsverordnung verlangt Wechsel in festgelegten Abständen. C2: Allianz fragt nicht nach E-Mail-MFA, Beazley und Funk nennen die Sicherung zuerst (siehe B-1). B2: Das Handbuch sagt in B2 das Gegenteil („no questionnaire we read asks for it as a condition“). E2: Häufigkeitsaussage ohne Quelle. F1: es fehlt „eines erheblichen Vorfalls“, „in fast jedem Vertrag“ ist unbelegt.
- **Schwere:** B.
- **Quelle:** NIST SP 800-63B-4, Juli 2025, Abschnitt 3.1.1.2 Nr. 6 (Archivkopie, gelesen 23.10.2026): „Verifiers and CSPs SHALL NOT require subscribers to change passwords periodically.“; BSI IT-Grundschutz ORP.4, Edition 2023 (Archivkopie): „Reine zeitgesteuerte Wechsel SOLLTEN vermieden werden.“; Durchführungsverordnung (EU) 2024/2690, Anhang Nr. 11.6.2 Buchst. c (Abruf 23.10.2026): „require the change of authentication credentials initially, at predefined intervals and upon suspicion that the credentials were compromised“.
- **Korrektur EN:** C6: „Length instead of forced changes: NIST and the BSI have advised against routine changes for years. Some customers still ask for intervals; the handbook (section 2.2) says how to answer.“ C2: „One of the first questions insurers ask, and a mandatory condition for some.“ B2: „No law requires it. Insurers ask, and the answer feeds the emergency card. "No" is a complete answer. …“ E2: „An old operating system without updates is a frequent finding; insurers exclude or ask about it.“ F1: „… must send an early warning within 24 hours of becoming aware of a significant incident, which is why customers write a deadline into the contract.“
- **Korrektur DE:** C6: „Länge statt erzwungener Wechsel: NIST und BSI raten seit Jahren von Routinewechseln ab. Manche Kunden verlangen noch Intervalle; das Handbuch (Abschnitt 2.2) sagt, wie man antwortet.“ C2: „Eine der ersten Fragen der Versicherer, bei manchen eine zwingende Bedingung.“ B2: „Kein Gesetz verlangt sie. Versicherer fragen danach, und die Antwort gehört auf die Notfallkarte. „Nein“ ist eine vollständige Antwort. …“ E2: „Ein altes Betriebssystem ohne Updates ist ein häufiger Befund; Versicherer fragen danach oder schließen es aus.“ F1: „… muss binnen 24 Stunden nach Kenntnis eines erheblichen Vorfalls eine Frühwarnung senden; deshalb schreiben Kunden eine Frist in den Vertrag.“

---

### C-1 · PDF: E-Mail-Adressen reißen Absätze im Kontaktteil auseinander

- **Ort:** 5.1 Österreich, EN-PDF Seite 26, DE-PDF Seite 29.
- **Zitat:** gerendert „CERT.at takes reports at / reports@cert.at / and +43 1 5056416 78 …“, „email to / dsb@dsb.gv.at / , immediately and if possible within 72 hours.“
- **Befund:** Jede verlinkte E-Mail-Adresse wird als eigener Block mit Abstand gesetzt; Sätze brechen um, eine Zeile beginnt mit Komma. Gerade der Kontaktteil muss im Notfall schnell lesbar sein.
- **Schwere:** C (Layout).
- **Quelle:** eigene Darstellung der PDFs, 23.10.2026.
- **Korrektur EN und DE:** Links im Fließtext als Inline-Element setzen (`display: inline`, kein Absatzabstand). Besser zusätzlich: die Kontakte in 5.1 und 5.2 als kleine Tabelle (Stelle, Nummer, E-Mail, Erreichbarkeit) statt als Fließtext.

### C-2 · PDF: kein Inhaltsverzeichnis, keine Seitenzahlen

- **Ort:** beide PDFs, alle Seiten.
- **Befund:** 33 bzw. 37 Seiten ohne Seitenzahl und ohne Inhaltsverzeichnis. Die Generatorfragen verweisen auf „handbook 2“; der Leser muss 20 Seiten blättern, um C3 zu finden.
- **Schwere:** C.
- **Korrektur EN und DE:** Seitenzahl in die Fußzeile („Page 12 of 33“ / „Seite 12 von 37“); auf Seite 1 ein Inhaltsverzeichnis mit Abschnitten und den Fragen B1 bis I4 mit Seitenzahl.

### C-3 · Fakt-Blöcke mit Klauselnummern sind für den Betriebsinhaber kaum lesbar

- **Ort:** 1.4 (Zeile 68, ein Satz mit rund 200 Wörtern), C3 (158), D1 (201), E1 (235), E3 (251) und weitere.
- **Zitat:** „(Mannheimer 4.1, 4.2, 4.5, 4.6, 4.9; Markel section 4 point 5 and 7.2; Beazley critical requirement 1; Funk 1)“.
- **Befund:** Die Fundstellen sind für die Prüfung wertvoll, im Fließtext aber Ballast. Der Inhaber eines Zehn-Personen-Betriebs braucht je Frage einen Satz „was verlangt wird“ und einen „was Sie vorlegen“.
- **Schwere:** C.
- **Korrektur EN und DE:** Je Fakt-Block mit einem Satz in Klartext beginnen („Four of the six insurer documents ask whether backups are kept separate and tested.“ / „Vier der sechs Versichererunterlagen fragen, ob Sicherungen getrennt aufbewahrt und getestet werden.“), die Klauselnummern nur in die Quellenzeile.

### C-4 · Es fehlt eine Kurzanleitung „Ich habe einen Fragebogen bekommen“

- **Ort:** Abschnitt 0, „The order of work“, Zeile 22.
- **Befund:** Die Reihenfolge ist da, aber die häufigsten praktischen Fragen fehlen: wie man das eigene Formular des Kunden ausfüllt, wenn es nur Ja/Nein kennt (Antwort „teilweise, siehe Selbstauskunft Abschnitt C, Termin …“ ins Kommentarfeld); was tun, wenn der Kunde ein Zertifikat verlangt; wie man um Fristverlängerung bittet; dass Antworten vertraulich sind und nur an die benannte Kontaktperson gehen (keine Netzpläne, keine Zugangsdaten); dass die Leitung unterschreibt und eine Kopie in den Nachweisordner kommt; welche Fragen man dem IT-Dienstleister weitergibt.
- **Schwere:** C (Anwendbarkeit).
- **Korrektur EN:** Neuer Kasten „If a customer questionnaire is on your desk“ mit sechs Schritten: deadline and contact; answer in the customer's form with the status and the reference to D1; never tick "yes" without evidence (see F3 on insurers); send D1, D5 and the D4 attachments to the named person only, marked confidential; ask for more time in writing if needed; file the sent version.
- **Korrektur DE:** „Wenn ein Kundenfragebogen auf dem Tisch liegt“: Frist und Ansprechperson notieren; im Formular des Kunden mit Status und Verweis auf D1 antworten; nie „ja“ ohne Beleg ankreuzen (siehe F3); D1, D5 und die Anlagen aus D4 nur an die benannte Person, als vertraulich gekennzeichnet; bei Bedarf schriftlich um Aufschub bitten; die gesendete Fassung ablegen.

### C-5 · Glossar: Lücken bei Fachwörtern

- **Ort:** Glossar, Zeilen 471 bis 513.
- **Befund:** Im Text verwendet, im Glossar nicht erklärt: VPN, NAS, CVSS, EDR/Endpoint-Schutz, SOC, TLPT, Jump-Host, CSIRT (nach A-3 nötig), USP (nach B-5), AVV als Abkürzung.
- **Schwere:** C.
- **Korrektur EN und DE:** Je ein Satz, z. B. „CVSS. A score from 0 to 10 for how severe a vulnerability is; Markel wants 8.0 and above handled without delay.“ / „CVSS. Eine Punktzahl von 0 bis 10 für die Schwere einer Schwachstelle; Markel will ab 8,0 unverzügliche Behandlung.“

### C-6 · Abschnitt 6 ist ein internes Prüfprotokoll

- **Ort:** Abschnitt 6, Zeilen 441 bis 469.
- **Befund:** Punkte wie 6.9 (GDV-Muster), 6.12 (ENISA-Zahlen gestrichen), 6.13 (Zahl der Felder), 6.16 (Begleithandbuch des alten Kits) sagen dem Käufer nichts; das „alte Lieferanten-Antwortkit vom September 2026“ kennt er nicht. 6.21 ist erledigt: §§ 3 bis 5 NISV 2026 heute im Wortlaut gelesen und vom Handbuch richtig wiedergegeben (§ 4 Abs. 3: „zumindest jährlich, zu überprüfen“). 6.3 kann mit den WKO-Daten (B-5) aktualisiert werden.
- **Schwere:** C.
- **Korrektur EN und DE:** Abschnitt 6 auf die für den Leser offenen Punkte kürzen (Passwortwechsel, Rechtsverweise des Labels, VDA-ISA-Version, DORA-Nebenrechtsakte), Rest in `quellen.md`; 6.21 als erledigt mit Quelle „NISV 2026, BGBl. II Nr. 290/2026, §§ 3 bis 5 · ris.bka.gv.at · retrieved 2026-10-23“.

### C-7 · Verweise im Generator und Anlässe der Wiedervorlage uneinheitlich

- **Ort:** `questions.json`: D4 `ref` „handbook 4“ (Zeile 207), F3 und F4 „handbook 4“ (285, 293), B3 „handbook 3“ (113), I1 „handbook 3“ (367); I4 Hilfetext (378). Handbuch I4 (Zeile 375) und Abschnitt 3 (Zeile 387).
- **Befund:** D4, F3, F4 werden in 2.3 und 2.5 erklärt, B3 in 2.1 und 1.5, I1 in 2.8; Abschnitt 4 und 3 helfen dort kaum. „handbook 2“ bei 30 Fragen ist zu grob. Die Anlässe der Wiedervorlage: Handbuch „neuer Kundenfragebogen, Austritt, neuer Dienstleister, Vorfall“, Hilfetext I4 „Dienstleister, Ansprechperson oder Sicherung wechselt, Wiederherstellungstest, Vorfall“.
- **Schwere:** C.
- **Korrektur:** `ref` auf Unterabschnitt und Frage („handbook 2.3 D4“); eine einzige Liste der Anlässe in Handbuch, Hilfetext und D2 verwenden, etwa „neuer Kundenfragebogen, Austritt oder Wechsel einer Ansprechperson, neuer Dienstleister, Änderung der Sicherung, Vorfall“.

### C-8 · Passwortkasten: stützende Quellen fehlen

- **Ort:** C6, Zeilen 182 bis 193.
- **Befund:** Der Kasten sagt „No court or authority decision on this conflict was searched“. Es gibt zwei naheliegende Stützen, die schon im Projekt liegen: ENISA, NIS2 Technical Implementation Guidance (Quellenliste Nr. 26), empfiehlt zu Nr. 11.6.2, Passwortwechsel „as necessary, for example after a security incident“ zu erzwingen, verweist auf NIST und nennt als gute Praxis 8 Zeichen mit MFA, 14 ohne. Und das Label (B6) verweist für Passwortkriterien auf „BSI, NIST 800“. Außerdem ist BSI ORP.4 die Primärquelle für die BSI-Haltung, nicht nur die Pressemitteilungen.
- **Schwere:** C (Verbesserung, kein Fehler).
- **Quelle:** ENISA, NIS2 Technical Implementation Guidance, Version 1.0, Juni 2025, S. 142 (Archivkopie, gelesen 23.10.2026): „Best-practice implementation includes, as a minimum, an 8-character password for accounts using MFA and a 14-character password for accounts not using MFA.“ und „enforce password changes as necessary, for example after a security incident or upon termination or change of employment …“; Cyber Trust Austria, Schema Policy 2026, B6: „Referenz: BSI, NIST 800, etc.“
- **Korrektur EN:** Im Kasten ergänzen: „ENISA's advisory guidance on the Implementing Regulation reads point 11.6.2 the toolkit's way: change passwords "as necessary, for example after a security incident", and use at least 8 characters with MFA and 14 without.“ Quelle: „ENISA, NIS2 Technical Implementation Guidance, June 2025, p. 142 · retrieved 2026-10-23“.
- **Korrektur DE:** „Die (unverbindliche) Umsetzungsleitlinie der ENISA liest Nr. 11.6.2 wie das Toolkit: Wechsel „as necessary, for example after a security incident“, und mindestens 8 Zeichen mit MFA, 14 ohne.“

### C-9 · Quellenangaben: Titel, URLs, Alter, Zuschreibung

- **Ort:** Abschnitt 8 und einzelne Quellenzeilen.
- **Befund:** (1) Für die meisten Quellen fehlt die URL (Versichererformulare, ENISA, NIST, CISA, BSI-Pressemitteilungen); eine Nachprüfung ist so mühsam. (2) Alter der Formulare nicht genannt (Funk „Stand Juli 2022“, Beazley ohne Datum). (3) „The German BSI's twelve questions“ (4.1): Die TOP 12 sind ein gemeinsames Produkt von BKA, Charter of Trust, DIHK, eco, Initiative Wirtschaftsschutz, NIFIS, VOICE und Allianz für Cyber-Sicherheit. (4) „The BSI list ends with checking access rights“ (4.3): Die Liste ist ein Kreis ohne festes Ende; zuletzt stehen dort Überwachung und Wiederaufbau. (5) „Platinum rests on the fifty requirements of the Implementing Regulation“ (1.5): Die Zahl 50 ist die Zählung von Cyber Trust Austria. (6) Der Link `bsi.bund.de/…/IT-Notfallkarte/…/it-notfallkarte_node.html` leitet auf eine 404-Seite um; die Karte liegt bei `allianz-fuer-cybersicherheit.de/Webs/ACS/DE/…/IT-Notfallkarte/it-notfallkarte_node.html`, die drei Kernbotschaften bestätigt die dortige FAQ.
- **Schwere:** C.
- **Korrektur EN und DE:** URLs ergänzen; „Funk … Stand Juli 2022“, „Beazley, undated“; 4.1: „the TOP 12 measures of the Allianz für Cyber-Sicherheit and partners“ / „die TOP 12 der Allianz für Cyber-Sicherheit und ihrer Partner“; 4.3: „The TOP 12 include checking access rights“ / „Zu den TOP 12 gehört die Prüfung der Zugangsberechtigungen“; 1.5: „on the fifty requirements into which the scheme divides the Implementing Regulation“ / „auf den fünfzig Anforderungen, in die das Schema die Durchführungsverordnung gliedert“.

### C-10 · Unbelegte Wirkungsaussagen in Auslegungen

- **Ort:** C5, Zeile 178; C2, Zeile 154; 1.4, Zeile 72.
- **Zitat:** „This is the one measure that costs nothing and stops most malware from installing.“ · „the first thing an attacker does with a mailbox is reset the passwords of everything else“ · „The insurers ask the same seven things“ (1.4 nennt neun).
- **Befund:** Zahl- und Wirkungsaussagen ohne Quelle; „seven“ passt nicht zur Aufzählung.
- **Schwere:** C.
- **Korrektur EN:** „… costs nothing and keeps much malware from installing itself“; „one of the first things an attacker does with a mailbox is to reset passwords elsewhere“; „The insurers ask largely what the law makes customers ask“. **DE** entsprechend: „… nichts kostet und viel Schadsoftware am Installieren hindert“; „eines der ersten Dinge, die ein Angreifer mit einem Postfach tut, ist, andere Passwörter zurückzusetzen“; „Die Versicherer fragen weitgehend dasselbe, was das Gesetz die Kunden fragen lässt“.

### C-11 · Begriff „digitale Anbieter“ doppelt belegt

- **Ort:** 1.1, Zeile 30 („digital providers“ als Sektor); 1.2, Zeile 48 („For digital providers (DNS, cloud, data centres, managed services, …)“); 5.2, 5.3, Glossar „Relevant entities“.
- **Befund:** In der Richtlinie sind „digital providers“ nur Marktplätze, Suchmaschinen und soziale Netzwerke (Anhang II); DNS, Cloud und Rechenzentren sind „digital infrastructure“, Managed Services „ICT service management“. Das Handbuch nutzt denselben Begriff einmal eng, einmal weit. Managed-Service-Anbieter (der IT-Dienstleister des Beispielbetriebs) fehlen in der Sektorenliste von 1.1.
- **Schwere:** C.
- **Korrektur EN:** 1.2: „For the providers named in Article 21(5) of the Directive (DNS, TLD registries, cloud, data centres, content delivery, managed and managed security services, online marketplaces, search engines, social networks, trust services; "digital providers" in this handbook) …“; 1.1 Sektorenliste um „managed IT services“ ergänzen. **DE** entsprechend: „Für die in Art. 21 Abs. 5 der Richtlinie genannten Anbieter (…; in diesem Handbuch „digitale Anbieter“) …“; 1.1 „verwaltete IT-Dienste“ ergänzen.

### C-12 · KMU-Definition: verbundene Unternehmen fehlen

- **Ort:** 1.1, Zeile 30; `questions.json` A3.
- **Befund:** Die Größe richtet sich nach der Empfehlung 2003/361/EG einschließlich Partner- und verbundener Unternehmen (Anhang Art. 3 und 6). Ein Zehn-Personen-Betrieb in einer größeren Gruppe ist kein KMU. Für die Frage „bin ich selbst betroffen“ (4.2) ist das der häufigste Irrtum.
- **Schwere:** C.
- **Quelle:** Empfehlung 2003/361/EG, Anhang Art. 2 Abs. 1 (Abruf 23.10.2026 über `publications.europa.eu/resource/celex/32003H0361`): „fewer than 250 persons and which have an annual turnover not exceeding EUR 50 million, and/or an annual balance sheet total not exceeding EUR 43 million“; Art. 6 (Einbeziehung der Daten von Partner- und verbundenen Unternehmen).
- **Korrektur EN:** Nach dem zweiten Satz: „The figures of partner and linked enterprises count as well (Annex, Art. 3 and 6), so a small business owned by a larger group may be covered.“ **DE:** „Die Zahlen von Partner- und verbundenen Unternehmen werden mitgerechnet (Anhang Art. 3 und 6); ein kleiner Betrieb einer größeren Gruppe kann deshalb erfasst sein.“

### C-13 · Deutschland: kein telefonischer Erstkontakt genannt; Zahlungsregel: Empfängerüberprüfung

- **Ort:** 5.2, Zeile 431; G3, Zeile 331.
- **Befund:** Für Österreich nennt das Handbuch eine Hotline, für Deutschland keine. Das BSI-Service-Center (0800 274 1000, Montag bis Donnerstag 8 bis 17, Freitag 8 bis 16 Uhr, kostenfrei) berät bei Vorfällen; für Unternehmen nennen BSI-Unterlagen die Online-Meldung der Allianz für Cyber-Sicherheit. Bei G3 fehlt der Hinweis, dass Banken seit 9. Oktober 2025 bei Überweisungen den Empfängernamen gegen die IBAN prüfen; das hilft, ersetzt den Rückruf aber nicht. Beide Angaben stammen nur aus Suchtreffern und sind vor einer Übernahme am Original zu lesen.
- **Schwere:** C (Vorschlag).
- **Quelle:** BSI, Kontakt / Service-Center, `bsi.bund.de/DE/Service-Navi/Kontakt/Service-Center/service-center_node.html` (Suchtreffer-Auszug, nicht vollständig geladen, 23.10.2026); WKO Oberösterreich, „Elektronischer Betrug“, `wko.at/ooe/news/elektronischer-betrug` (Suchtreffer-Auszug).
- **Korrektur:** nach Prüfung am Original in 5.2 einen Satz zum BSI-Service-Center und in G3 einen Satz zur Empfängerüberprüfung ergänzen, je mit Quelle und Abrufdatum.

### C-14 · Kleinere Genauigkeiten

- **Ort und Befund:**
  - 1.1, Zeile 38: „The Directive binds the customer“ (Richtlinie bindet die Mitgliedstaaten; mit A-1 erledigt).
  - Glossar „Support period“, Zeile 503: „at least five years“ ohne „shorter where the product is expected to be in use for less“.
  - 1.6, Zeile 92 EN: Erwägungsgrund 5 ohne „and logging“ (DE hat „und Protokollierung“).
  - C2, Zeile 150: NIST definiert Phishing-Resistenz als Eigenschaft des Authentifizierungsprotokolls („the ability of the authentication protocol“), nicht des Authentifikators.
  - F2, Zeile 285: „the German authorities are those of the federal states“; laut BfDI „grundsätzlich“, mit Ausnahmen (etwa Telekommunikation beim BfDI).
  - 1.5, Zeile 84: Preis „CHF 155“ stimmt heute (IEC Webstore), ist aber ein veränderlicher Preis: „Stand prüfen“ und Abrufdatum direkt dahinter.
- **Schwere:** C.
- **Quelle:** Verordnung (EU) 2024/2847, Art. 13 Abs. 8 (Abruf 23.10.2026): „Where the product with digital elements is expected to be in use for less than five years, the support period shall correspond to the expected use time.“; NIST SP 800-63B-4, Abschnitt 3.2.5; BfDI, `bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html`, Abruf 23.10.2026: „wird auch der nicht-öffentliche Bereich grundsätzlich von den Landesdatenschutzbehörden betreut“; IEC Webstore, `webstore.iec.ch/publication/79694`, Abruf 23.10.2026: „CHF 155.-“, Ausgabe 3.0, 2022-10-25.
- **Korrektur EN und DE:** jeweils den fehlenden Halbsatz ergänzen; F2: „in Germany, as a rule, the data protection authorities of the federal states“ / „in Deutschland grundsätzlich die Landesdatenschutzbehörden“.

---

## Bestätigt (Auswahl der geprüften Kernaussagen)

- NIS-2: Art. 2 Abs. 1 und 2, Schwellen der KMU-Empfehlung (50 Personen oder Umsatz und Bilanzsumme je über 10 Mio. €; bis 249, 50 Mio. € oder 43 Mio. €), Art. 21 Abs. 1 bis 4 und Buchst. c, d, e, g, h, i, j, Art. 23 Abs. 4 (24 h, 72 h, ein Monat), deutsche Zitate in 1.1, 1.6, 1.7 wörtlich.
- Durchführungsverordnung (EU) 2024/2690: Veröffentlichung 18.10.2024, Inkrafttreten 7.11.2024 (Art. 16), Anhang 1.1, 2.2.1, 2.3, 3.1.1, 4.1.2, 4.2.2 Buchst. a und c, 4.2.6, 5.1.4 Buchst. a bis h, 5.2, 6.6.1, 6.7.2 Buchst. d, 6.9.1, 6.10, 8.1.1, 10.3, 11.3.2 Buchst. a und b, 11.5, 11.6.2 Buchst. a, c, d, f, 11.7.1, 12.4.1, 12.5, Erwägungsgrund 5, Art. 3 Abs. 1 Buchst. a; EN und DE wörtlich.
- NISG 2026: Kundmachung 23.12.2025, Inkrafttreten 1.10.2026 (§ 51 Abs. 2), § 3a Bundesamt für Cybersicherheit, § 32 Abs. 1, 3, 4 Buchst. a bis j, § 33 Abs. 1 bis 3 wörtlich. NISV 2026: BGBl. II Nr. 290/2026, ausgegeben 1.10.2026, § 2 wörtlich, § 4 Abs. 1 und 3 sinngleich, § 5 Abs. 1 Z 1.
- DORA Art. 30 Abs. 2 Buchst. a bis i und Abs. 3 Buchst. a bis f; DSGVO Art. 28 Abs. 1 bis 3, Art. 30 Abs. 5, Art. 33 Abs. 1 bis 3 und 5, Art. 34 Abs. 1 und 3 Buchst. a; CRA Art. 13 Abs. 8 und 17, Art. 71 (11.12.2027; Art. 14 ab 11.9.2026).
- Kontakte Österreich und Deutschland wie in der Kurzfassung; BKA-Seite CEO-Fraud (Stand 29.6.2026, MFA für E-Mail als erste technische Maßnahme, Vier-Augen-Prinzip, Rückrufverfahren, Hausbank, Anzeige); WKO Oberösterreich vom 22.7.2025 (telefonische Rückfrage unter bekannter Nummer).
- Cyber Trust Austria: vier Stufen, B1 bis B14, A1 bis A11, Gültigkeit ein Jahr, Version 6.0 vom 8.9.2025, Platinum mit mindestens 85 %; Zielgruppe Lieferanten nach NISG 2026 (Website). BSI CyberRisikoCheck: 27 Anforderungen, sechs Themenbereiche, ein bis zwei Stunden, DIN SPEC kostenfrei nach Anmeldung, „keine IT-Sicherheitszertifizierung“, 1.000. Dienstleister am 6.6.2025, keine NIS-2-Konformität, knapp 56 %. VdS: Zertifikat drei Jahre, jährliche reduzierte Re-Audits; Allianz 1.2 und Mannheimer 9.2 nennen VdS 10000. ISO/IEC 27001:2022: 93 Maßnahmen, vier Themen, CHF 155. TISAX: drei Prüfstufen.
- Versichererformulare: alle zitierten Klauselnummern (Mannheimer 4.1 bis 9.2, Abschnitt 15 mit § 19 Abs. 5 VVG; Markel 4 Nr. 5 und 6, 6.2 bis 6.4, 7.2, 7.3; Allianz 1.2, 2.5.1, 2.5.3 bis 2.5.5; Beazley 1 bis 4 und „zwingende Voraussetzung“; Funk 1 bis 7; Donau Teil D 7.1.3, Teil E zur Zwei-Faktor-Authentifizierung) stehen dort mit dem angegebenen Inhalt.
- NIST SP 800-63B-4 (Juli 2025, 15 bzw. 8 Zeichen, keine Kompositionsregeln, kein periodischer Wechsel, Sperrliste, Passwort-Manager); CISA Oktober 2022 (Reihung, SMS als letzte Möglichkeit, „any form of MFA is better than no MFA“); BSI-Pressemitteilungen vom 31.1.2025 („Passwortwechseln war gestern“) und 30.1.2026 („Der Ändere-dein-Passwort-Tag braucht ein Update“) existieren; ENISA 12 Schritte (Schritte 1 bis 10 wie zitiert) und KMU-Bericht (gekapertes Postfach, Rechteentzug beim Austritt); BSI TOP 12 (Stand September 2019, Inhalte wie zitiert); IT-Notfallkarte (drei Kernbotschaften laut FAQ der Allianz für Cyber-Sicherheit).

## Nicht verifizierbar

- **EUR-Lex-Webseiten:** Bot-Abwehr (HTTP 202 mit `x-amzn-waf-action: challenge`); nicht umgangen. Die Rechtstexte wurden stattdessen in der amtlichen Fassung über `publications.europa.eu/resource/celex/…` gelesen. Die im Handbuch genannten EUR-Lex-URLs selbst wurden nicht geöffnet.
- **Versichererformulare, Cyber-Trust-Austria-Policy, NIST, CISA, ENISA, ENX, VdS, BSI ORP.4 und TOP 12, NISG 2026 im BGBl.:** heute nur in den Archivkopien vom 19.10.2026 gelesen, nicht erneut aus dem Netz geladen (Zeitgründe); ob die Originale seither geändert wurden, ist nicht ermittelbar.
- **Shared Assessments SIG** (21 Risikodomänen, Abonnement): `sharedassessments.org/sig` leitet auf eine Microsoft-Anmeldeseite um.
- **IT-Notfallkarte „analog zum bekannten Format ‚Verhalten im Brandfall‘“:** Die Formulierung steht weder auf `bsi.bund.de/dok/13003500` noch auf den heute erreichbaren Seiten der Allianz für Cyber-Sicherheit; der BSI-Tiefenlink endet in 404. Nur Sekundärquellen (borncity.com, mimikama.org) geben sie wieder.
- **Österreichisches Informationssicherheitshandbuch, Version 4.4.0 vom 6.11.2023:** Die Website zeigt keine Versionsnummer; bestätigt nur durch die Archivkopie.
- **Bundesamt für Cybersicherheit:** `www.bacs.gv.at` ist nicht auflösbar (DNS-Fehler); die „pages on registration and duties“ (Quelle Nr. 9) konnten nicht geöffnet werden. Die Registrierungsdaten wurden deshalb über die WKO geprüft (B-5).
- **OLG Schleswig 16 U 63/24 und LG Kiel 5 O 128/21:** Entscheidungstexte nicht öffentlich gefunden; der Bericht von beck-aktuell.de wurde vom Sage-Hook blockiert. Datum des OLG-Beschlusses in den Sekundärquellen uneinheitlich (8. oder 9.1.2025).
- **BSI-Pressemitteilungen zu Passwörtern:** Existenz und Kernaussage über die Suchtreffer auf bsi.bund.de bestätigt, Volltext nicht geladen.
- **BSI-Seite „NIS-2 regulierte Unternehmen“:** nennt kein Datum der Registrierungsfrist („bereits abgelaufen“); Sekundärquellen und eine IHK nennen eine vom BSI eingeräumte Nachfrist bis 31.7.2026. Für das Handbuch nicht entscheidend, da beide Daten vorbei sind.
- **VDA-ISA-Version (offener Punkt 6.19), Text der DIN SPEC 27076, Listenpreis VdS 10000:** nicht erneut geprüft (Anmeldung bzw. Kauf nötig).
- **ENISA „12 steps“, Veröffentlichungsdatum 28.6.2021:** im PDF selbst kein Datum gefunden; nicht ermittelbar ohne die ENISA-Publikationsseite.
