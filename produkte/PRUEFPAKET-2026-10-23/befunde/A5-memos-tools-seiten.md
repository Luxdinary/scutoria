# A5 · Memos, Tools, Produkt- und Startseite: Befunde

Prüfung am 23.10.2026. Geprüft wurden der Code im Ordner `site/` (nichts verändert), die 16 Memo-PDFs in `3-memos`, die Handbuch-PDFs in `1-…` und `2-…` und die öffentlichen Musterdateien unter `site/public/samples`. Testskripte liegen unter `C:\Users\Stefa\AppData\Local\Temp\scutoria-review-a5\`.

Hinweis: Laut E22 zieht die Website zu Lovable um. Wo diese Texte und Regeln nach Lovable übernommen wurden, gelten die Befunde dort ebenso.

## Kurzfassung

**Was geprüft wurde**

1. Vier Memo-Generatoren: jeder Zweig der Entscheidungslogik, nicht nur die Muster-PDFs. Rechtsstand live geprüft: NIS-2-Richtlinie Art. 2, 3, 6 Nr. 20, 23 Abs. 4, 34 (EUR-Lex), BSIG §§ 28 und 33, NISG 2026 §§ 3a, 25, 26, 29 und 51 (RIS), KI-Verordnung in der konsolidierten Fassung vom 27.7.2026 (Art. 4, 5, 50, 99, 111, 113), die Leitlinien der Kommission zu Art. 50, KI-MIG, NIST SP 800-63B-4, CISA, ENISA.
2. Zwei Tools: alle 216 Antwortkombinationen von „Darf das hinein?“ in Node durchgerechnet; „Steht da etwas Persönliches drin?“ mit gut 110 Testtexten geprüft (IBAN mit Mod-97, österreichische SV-Nummer mit Prüfziffer, deutsche Kennungen, E-Mail, Telefon, Namen, Adressen, Gesundheit, Zugangsdaten, Laufzeit).
3. Jede Zahl und Zusage auf Produkt- und Startseite gegen Fragenkatalog, Dokumentregister, PDFs und Handbücher.

**Was hält**

- „Läuft im Browser, sendet nichts“ stimmt. Beide Tool-Skripte enthalten keinen `fetch`, kein `sendBeacon`, kein `XMLHttpRequest`, keinen WebSocket. Die Tool-Seiten senden `connect-src 'none'` und `form-action 'none'`. `site.js` macht keine Netzwerkanfragen, die Tool-Routen setzen kein Cookie.
- Bestätigt: sieben Dokumente je Toolkit mit den genannten Formaten, neun Paragrafen bzw. neun Abschnitte, sieben Prüffragen, fünfzehn Schritte, vier Anlässe plus fester Termin, achtzehn Fragebogen-Zeilen mit allen zehn Buchstaben des Art. 21 Abs. 2, vierzig Fragen beim Sicherheitsnachweis, Handbuch DE 25 Seiten, Sicherheits-Handbuch 33/37 Seiten, Preise 99 € und 199 € passend zu E14 und E21.
- Bestätigt am Original: Bußgelder NIS2 und KI-VO, Meldefristen 24 h / 72 h / ein Monat, Art. 4 KI-VO in der neuen Fassung, 2.12.2026 für Art. 50 Abs. 2 (Altsysteme), 2.12.2027 für Anhang III, BSIG § 33 (drei Monate, zwei Wochen), NISG 2026 § 25 und § 29 Abs. 3 (drei Monate ab 1.10.2026), KI-MIG mit Bundesnetzagentur seit 29.7.2026.

**Befunde nach Schwere: 50 insgesamt**

- **A (falsch, irreführend oder rechtlich riskant): 9.** Nr. 1, 2, 20, 26, 33, 34, 35, 42, 45.
- **B (ungenau, veraltet oder unbelegt): 24.**
- **C (Lesbarkeit, Anwendbarkeit, Stil): 17.**

**Empfehlung:** Vor dem Livegang die neun A-Befunde beheben. Am dringendsten sind drei: der falsche Grünwert für Behörden im NIS2-Memo (Nr. 2), die Passwort-Lecks in der Platzhalter-Funktion (Nr. 34) und die Zahl „einunddreißig Fragen“ (Nr. 42).

---

## 1. NIS2-Memo (`site/src/memos/nis2.mjs`)

### Nr. 1 · Behördliche Mitteilung „wichtig“ ergibt „wesentlich“

- **Ort:** nis2.mjs:91 (Option `critical`), nis2.mjs:112 (Logik)
- **Zitat:** „An authority has identified us as a critical entity or notified us that we are an essential or important entity“ → `category = 'essential'`
- **Befund:** Die Option bündelt drei Fälle: kritische Einrichtung (CER), als wesentlich eingestuft, als wichtig eingestuft. Jeder davon ergibt im Memo „Wahrscheinlich ja: eine wesentliche Einrichtung“. Wer von der Behörde als *wichtig* eingestuft wurde, bekommt damit die falsche Kategorie, also auch den falschen Bußgeldrahmen (10 Mio. € / 2 % statt 7 Mio. € / 1,4 %) und die falsche Aufsicht (ex ante statt ex post).
- **Schwere:** A
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 3 Abs. 1 Buchst. e und f sowie Abs. 2, https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022L2555, Abruf 23.10.2026. Art. 3 Abs. 2: „This includes entities identified by Member States as important entities pursuant to Article 2(2), points (b) to (e).“
- **Korrektur EN:** Split the option into two: “An authority has identified us as a critical entity or notified us that we are an essential entity” (→ essential) and “An authority has notified us that we are an important entity” (→ important, unless another rule makes it essential).
- **Korrektur DE:** Option teilen: „Eine Behörde hat uns als kritische Einrichtung eingestuft oder uns mitgeteilt, dass wir eine wesentliche Einrichtung sind“ (→ wesentlich) und „Eine Behörde hat uns mitgeteilt, dass wir eine wichtige Einrichtung sind“ (→ wichtig, außer eine andere Regel macht sie wesentlich).

### Nr. 2 · Öffentliche Verwaltung unter 50 Beschäftigten bekommt Grün

- **Ort:** nis2.mjs:16 (Sektor `public`), nis2.mjs:116 bis 124 (Logik)
- **Zitat:** Sektor „Public administration at central or regional level“, Größe „small“ → „Likely not directly in scope.“ (grün)
- **Befund:** Für die öffentliche Verwaltung gilt die Größengrenze nicht. Einrichtungen der Zentralregierung sind unabhängig von der Größe erfasst und *wesentlich*; regionale nur nach einer risikobasierten Bewertung des Mitgliedstaats. Das Memo prüft für `public` nur die Unternehmensgröße: klein ergibt Grün, mittel ergibt „wichtig“, groß ergibt „wesentlich“. Alle drei Ergebnisse sind falsch begründet, das grüne ist sachlich falsch und beruhigend. (Die Empfehlung 2003/361/EG passt auf Behörden ohnehin nicht.)
- **Schwere:** A
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 2 Abs. 2 Buchst. f, Art. 3 Abs. 1 Buchst. d, Anhang I Nr. 10, EUR-Lex wie oben, Abruf 23.10.2026. Art. 2 Abs. 2: „Regardless of their size, this Directive also applies … (f) the entity is a public administration entity: (i) of central government …“
- **Korrektur EN:** Ask separately: “central government”, “regional level”, “local level or education”. Central government → “Likely yes: an essential entity, regardless of size (Art. 2(2)(f)(i), Art. 3(1)(d))”. Regional → amber “Possibly: in scope only if the member state’s risk-based assessment identifies you (Art. 2(2)(f)(ii))”. Local or education → amber “Only if national law extends the scope (Art. 2(5))”.
- **Korrektur DE:** Getrennt fragen: „Zentralregierung“, „regionale Ebene“, „lokale Ebene oder Bildung“. Zentralregierung → „Wahrscheinlich ja: eine wesentliche Einrichtung, unabhängig von der Größe (Art. 2 Abs. 2 Buchst. f Ziff. i, Art. 3 Abs. 1 Buchst. d)“. Regional → Gelb „Möglicherweise: nur erfasst, wenn die risikobasierte Bewertung des Mitgliedstaats Sie einstuft“. Lokal oder Bildung → Gelb „Nur wenn das nationale Recht den Anwendungsbereich ausdehnt (Art. 2 Abs. 5)“.

### Nr. 3 · Größenoptionen überschneiden sich

- **Ort:** nis2.mjs:82 und 83
- **Zitat:** medium: „50 to 249 staff, or …“; large: „250 or more staff, or turnover above EUR 50 million and balance sheet above EUR 43 million“
- **Befund:** Ein Betrieb mit 60 Beschäftigten, 60 Mio. € Umsatz und 50 Mio. € Bilanzsumme passt auf beide Antworten. Nach der Empfehlung ist er groß. Wählt er „medium“, wird ein Anhang-I-Betrieb als „wichtig“ statt „wesentlich“ eingestuft.
- **Schwere:** B
- **Quelle:** Empfehlung 2003/361/EG, Anhang Art. 2 Abs. 1; NISG 2026 § 25 Abs. 3 („sofern sie nicht bereits als großes Unternehmen gilt“), https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20013065, Abruf 23.10.2026.
- **Korrektur EN:** “50 to 249 staff, unless turnover is above EUR 50 million and the balance sheet total above EUR 43 million; or fewer than 50 staff with turnover and balance sheet total both above EUR 10 million”.
- **Korrektur DE:** „50 bis 249 Beschäftigte, außer der Umsatz liegt über 50 Mio. € und die Bilanzsumme über 43 Mio. €; oder weniger als 50 Beschäftigte mit Umsatz und Bilanzsumme jeweils über 10 Mio. €“.

### Nr. 4 · Frage nach der „Haupttätigkeit“ statt nach jeder Tätigkeit einer Anhang-Art

- **Ort:** nis2.mjs:85; Option „none“ nis2.mjs:25
- **Zitat:** „Which sector describes your main activity?“ und „None of these: … software not listed above“
- **Befund:** Die Richtlinie stellt auf Einrichtungen „einer in Anhang I oder II genannten Art“ ab, nicht auf die Haupttätigkeit. Nur bei der Abfallbewirtschaftung zählt die Haupttätigkeit. Deutschland erlaubt lediglich, *vernachlässigbare* Tätigkeiten außer Acht zu lassen (§ 28 Abs. 3 BSIG). Ein mittlerer Händler, der nebenbei in nennenswertem Umfang elektrische Ausrüstungen herstellt, wählt „none“ und bekommt Grün. Dazu kommt „software not listed above“: Cloud-Dienste (Anhang I) können auch SaaS umfassen, das lädt zu einer falschen „none“-Antwort ein.
- **Schwere:** B
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 2 Abs. 1, Anhang II Nr. 2 („excluding undertakings for whom waste management is not their principal economic activity“), EUR-Lex, Abruf 23.10.2026; BSIG § 28 Abs. 3, https://www.gesetze-im-internet.de/bsig_2025/__28.html, Abruf 23.10.2026.
- **Korrektur EN:** “Which of these activities does your business carry out to a more than negligible extent? Tick all that apply.” Drop “software not listed above” from the “none” label and add the hint “Cloud, data centre and managed IT services are listed under digital infrastructure and ICT service management.”
- **Korrektur DE:** „Welche dieser Tätigkeiten übt Ihr Betrieb in mehr als nur geringem Umfang aus? Alles ankreuzen, was zutrifft.“ „nicht oben genannte Software“ aus der Option „Nichts davon“ streichen, Hinweis ergänzen: „Cloud, Rechenzentren und IT-Betreuung für Unternehmen stehen unter digitaler Infrastruktur und IKT-Dienstleistungsmanagement.“

### Nr. 5 · „DNS-Dienst“ zu weit gefasst

- **Ort:** nis2.mjs:89 und 113
- **Zitat:** „We run a top-level domain registry or a DNS service“
- **Befund:** Wer einen eigenen DNS-Server betreibt (häufig in Betrieben mit IT-Betreuung), kann das ankreuzen und bekommt „wesentliche Einrichtung“. Erfasst sind aber nur öffentlich zugängliche rekursive Resolver und autoritative Auflösung *für Dritte*. Zugleich fehlen die Domain-Registrierungsdienste (Registrare), die nach Art. 2 Abs. 4 größenunabhängig erfasst sind.
- **Schwere:** B
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 6 Nr. 20 („authoritative domain name resolution services for third-party use“), Art. 2 Abs. 4, EUR-Lex, Abruf 23.10.2026.
- **Korrektur EN:** “We run a top-level domain registry, or provide DNS resolution to the public or authoritative DNS for other businesses (not just for our own domain)”; separate option “We sell domain name registrations (registrar or reseller)”.
- **Korrektur DE:** „Wir betreiben ein Namenregister einer Domäne oberster Stufe oder bieten DNS-Auflösung für die Öffentlichkeit oder autoritatives DNS für andere Betriebe an (nicht nur für die eigene Domain)“; eigene Option „Wir verkaufen Domain-Registrierungen (Registrar oder Wiederverkäufer)“.

### Nr. 6 · Qualifizierte Vertrauensdiensteanbieter bekommen „wichtig“ als Ergebnis

- **Ort:** nis2.mjs:88 und 114
- **Zitat:** `if (sp('trust')) { category = category ?? 'important'; …` mit Begründung „qualified ones are essential, others important“
- **Befund:** Das Memo fragt nicht, ob der Anbieter qualifiziert ist. Die Überschrift sagt dann „Likely yes: an important entity“, die Begründung im selben Absatz „qualified ones are essential“. Für einen qualifizierten Anbieter ist die Überschrift falsch.
- **Schwere:** B
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 3 Abs. 1 Buchst. b, EUR-Lex, Abruf 23.10.2026.
- **Korrektur EN:** Two options: “We are a qualified trust service provider” (→ essential) and “We are a trust service provider, not qualified” (→ important).
- **Korrektur DE:** Zwei Optionen: „Wir sind qualifizierter Vertrauensdiensteanbieter“ (→ wesentlich) und „Wir sind Vertrauensdiensteanbieter, nicht qualifiziert“ (→ wichtig).

### Nr. 7 · Deutschland kennt die Unabhängigkeitsklausel für Konzerne auch

- **Ort:** nis2.mjs:145 und 146
- **Zitat:** „A business that belongs to a group adds the group’s figures; Austria does not add them where the entity is organisationally, technically and operationally independent.“
- **Befund:** Der Satz legt nahe, nur Österreich rechne bei Unabhängigkeit nicht zusammen. § 28 Abs. 4 BSIG enthält dieselbe Ausnahme: Die Daten von Partner- oder verbundenen Unternehmen werden nicht hinzugerechnet, wenn die Einrichtung mit Blick auf ihre IT-Systeme rechtlich, wirtschaftlich und tatsächlich unabhängig ist. Deutsche Konzerntöchter bekommen damit ein zu strenges Ergebnis. Die eigene Quellenangabe SRC.sizeNat nennt sogar § 28 Abs. 4.
- **Schwere:** B
- **Quelle:** BSIG § 28 Abs. 4, https://www.gesetze-im-internet.de/bsig_2025/__28.html, Abruf 23.10.2026 (Daten „nicht hinzuzurechnen“, wenn unabhängig); NISG 2026 § 25 Abs. 4, RIS, Abruf 23.10.2026.
- **Korrektur EN:** “A business that belongs to a group adds the group’s figures. Germany (§ 28(4) BSIG) and Austria (§ 25(4) NISG 2026) do not add them where the entity is independent of its partner or linked enterprises as regards its network and information systems.”
- **Korrektur DE:** „Ein Betrieb einer Gruppe rechnet die Zahlen der Gruppe hinzu. Deutschland (§ 28 Abs. 4 BSIG) und Österreich (§ 25 Abs. 4 NISG 2026) rechnen sie nicht hinzu, wenn die Einrichtung in Bezug auf ihre Netz- und Informationssysteme von den Partner- oder verbundenen Unternehmen unabhängig ist.“

### Nr. 8 · Deutsche Betreiber kritischer Anlagen fehlen

- **Ort:** nis2.mjs:90 und 91 (Sonderfälle), nis2.mjs:170 (Deutschland-Befund)
- **Zitat:** Sonderfall „An authority has identified us as a critical entity …“
- **Befund:** In Deutschland sind Betreiber kritischer Anlagen unabhängig von der Größe besonders wichtige Einrichtungen (§ 28 Abs. 1 Nr. 1 BSIG). Sie stufen sich über Schwellenwerte selbst ein; eine Behördenmitteilung gibt es typischerweise nicht. Ein kleiner Betreiber findet im Memo keine passende Antwort und kann Grün bekommen.
- **Schwere:** B
- **Quelle:** BSIG § 28 Abs. 1 Nr. 1, https://www.gesetze-im-internet.de/bsig_2025/__28.html, Abruf 23.10.2026.
- **Korrektur EN:** Add for Germany: “We operate a critical facility (kritische Anlage) under the German thresholds” → essential (besonders wichtige Einrichtung) regardless of size.
- **Korrektur DE:** Für Deutschland ergänzen: „Wir betreiben eine kritische Anlage nach den deutschen Schwellenwerten“ → besonders wichtige Einrichtung, unabhängig von der Größe.

### Nr. 9 · ELSTER-Pflicht wird § 33 zugeschrieben

- **Ort:** nis2.mjs:170 und 171
- **Zitat:** „… through the BSI portal, which requires an ELSTER organisation certificate (§ 33)“
- **Befund:** § 33 BSIG nennt weder das BSI-Portal noch ELSTER, sondern eine gemeinsam von BSI und BBK eingerichtete Registrierungsmöglichkeit. Die ELSTER-Voraussetzung stammt von den BSI-Seiten (Mein Unternehmenskonto).
- **Schwere:** C
- **Quelle:** BSIG § 33 Abs. 1 und 6, https://www.gesetze-im-internet.de/bsig_2025/__33.html, Abruf 23.10.2026.
- **Korrektur EN:** “Entities register with the BSI within three months of first qualifying (§ 33). The BSI runs this through its portal, which requires a ‘Mein Unternehmenskonto’ with an ELSTER organisation certificate (BSI, ‘Registrierungspflicht’).”
- **Korrektur DE:** „Die Einrichtungen registrieren sich binnen drei Monaten beim BSI (§ 33). Das BSI wickelt das über sein Portal ab, das ein Mein Unternehmenskonto mit ELSTER-Organisationszertifikat voraussetzt (BSI, „Registrierungspflicht“).“

### Nr. 10 · „(in Deutschland: besonders wichtige Einrichtung)“ auch bei Österreich

- **Ort:** nis2.mjs:127
- **Zitat:** „eine wesentliche Einrichtung (in Deutschland: besonders wichtige Einrichtung)“
- **Befund:** Der Klammerzusatz erscheint in jedem deutschsprachigen Memo, auch bei Land Österreich oder anderem EU-Staat. Für Österreich irritiert das, dort heißt es „wesentliche Einrichtung“.
- **Schwere:** C
- **Quelle:** eigene Prüfung des Codes; NISG 2026 § 24, RIS, Abruf 23.10.2026.
- **Korrektur EN:** Show the German term only when the country is Germany.
- **Korrektur DE:** Den Klammerzusatz nur bei Land Deutschland zeigen.

### Nr. 11 · BSI-Nachfrist bis 31.7.2026 fehlt

- **Ort:** nis2.mjs:170, 174, 223
- **Zitat:** „that deadline ended on 6 March 2026, and the BSI writes that the statutory registration deadline has passed“
- **Befund:** Inhaltlich richtig. Es fehlt aber, dass das BSI eine Nachfrist bis 31.7.2026 eingeräumt hatte, die ebenfalls verstrichen ist. Wer davon gehört hat, findet es im Memo nicht wieder.
- **Schwere:** C
- **Quelle:** BSI, Seite „NIS-2-regulierte Unternehmen“: „Die gesetzliche Registrierungsfrist ist bereits abgelaufen.“, https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html, Abruf 23.10.2026; Nachfrist 31.7.2026 nur in Sekundärquellen gefunden (IHK Braunschweig, ZfK), Abruf 23.10.2026, Stand prüfen.
- **Korrektur EN:** Add: “The BSI had allowed late registrations until 31 July 2026; that period has also ended.”
- **Korrektur DE:** Ergänzen: „Das BSI hatte Nachmeldungen bis 31. Juli 2026 zugelassen; auch diese Frist ist abgelaufen.“

---

## 2. Kennzeichnungs-Memo (`site/src/memos/labelling.mjs`)

### Nr. 12 · Jeder Anbieter bekommt die Markierungspflicht nach Art. 50 Abs. 2

- **Ort:** labelling.mjs:197 bis 206; Muster `memo-labelling-weak-en.pdf`
- **Zitat:** `if (isProvider(a)) { duties.push('machine-readable marking of generated content (Art. 50(2))') …`
- **Befund:** Art. 50 Abs. 2 trifft nur Anbieter von KI-Systemen, die synthetische Audio-, Bild-, Video- oder Textinhalte *erzeugen*, und gilt nicht für reine Assistenzfunktionen bei Standardbearbeitung. Das Memo fragt das nicht. Das Muster „weak“ (Rolle „Beides“, Nutzung „nur intern“) bekommt Rot mit Markierungspflicht, obwohl nichts auf ein generatives eigenes System hindeutet.
- **Schwere:** B
- **Quelle:** VO (EU) 2024/1689 Art. 50 Abs. 2 Satz 1 und 3, konsolidierte Fassung 27.7.2026, https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727, Abruf 23.10.2026 („This obligation shall not apply to the extent the AI systems perform an assistive function for standard editing …“).
- **Korrektur EN:** Add for providers: “Does your system generate or substantially alter audio, image, video or text?” (yes / only standard editing / no). Only “yes” triggers the Art. 50(2) duty.
- **Korrektur DE:** Für Anbieter ergänzen: „Erzeugt oder verändert Ihr System Ton, Bild, Video oder Text wesentlich?“ (ja / nur Standardbearbeitung / nein). Nur „ja“ löst die Pflicht aus Art. 50 Abs. 2 aus.

### Nr. 13 · „trifft Sie jetzt“, obwohl die Pflicht erst am 2.12.2026 greift

- **Ort:** labelling.mjs:239 mit 203 und 204
- **Zitat:** „Yes. At least one duty of Article 50 applies to you now.“
- **Befund:** Ist die einzige gefundene Pflicht die Markierung nach Abs. 2 und war das System vor dem 2.8.2026 in Verkehr, gilt sie erst ab 2.12.2026. Die Überschrift „jetzt“ widerspricht dem Schritt im selben Memo.
- **Schwere:** B
- **Quelle:** VO (EU) 2024/1689 Art. 111 Abs. 4 in der Fassung der VO (EU) 2026/1744, EUR-Lex konsolidiert 27.7.2026, Abruf 23.10.2026 („… shall take the necessary steps in order to comply with Article 50(2) by 2 December 2026“).
- **Korrektur EN:** If the only duty is Art. 50(2) and the system was on the market before 2 August 2026: “Yes. A duty of Article 50 applies to you from 2 December 2026.”
- **Korrektur DE:** Ist Art. 50 Abs. 2 die einzige Pflicht und war das System vor dem 2. August 2026 in Verkehr: „Ja. Eine Pflicht aus Artikel 50 trifft Sie ab dem 2. Dezember 2026.“

### Nr. 14 · „Beides oder unsicher“ plus „keine Prüfung“ ergibt nur Gelb mit Ausnahme-Überschrift

- **Ort:** labelling.mjs:160 bis 167 und 236 bis 241
- **Zitat:** Gelb: „Partly. No label where the exception holds, but conditions to keep and cases to check.“
- **Befund:** Bei Thema „mixed“ wird die Antwort zur Prüfung (`textReview`) nicht ausgewertet. Wer öffentlich-interessante Texte mitveröffentlicht und angibt, dass niemand prüft, bekommt Gelb mit einer Überschrift, die eine greifende Ausnahme nahelegt. Eine schwache Antwort erhält so ein halb beruhigendes Ergebnis.
- **Schwere:** B
- **Quelle:** VO (EU) 2024/1689 Art. 50 Abs. 4 Unterabs. 2; Leitlinien C(2026) 5054 final, Rn. 133 bis 135, Abruf 23.10.2026.
- **Korrektur EN:** For “mixed” with review “no” or “sometimes”: red, duty “label or documented review for published text on matters of public interest”. Amber title only where a review exists: “Partly: labelling is not needed where your documented review holds; some texts still need sorting.”
- **Korrektur DE:** Bei „Beides oder unsicher“ mit Prüfung „nein“ oder „manchmal“: Rot, Pflicht „Kennzeichnung oder dokumentierte Prüfung für veröffentlichte Texte zu Angelegenheiten von öffentlichem Interesse“. Gelbe Überschrift nur bei vorhandener Prüfung: „Teilweise: Keine Kennzeichnung, wo Ihre dokumentierte Prüfung greift; einige Texte sind noch zu sortieren.“

### Nr. 15 · Fakt zu Art. 50 Abs. 6 enthält Aussagen, die dort nicht stehen

- **Ort:** labelling.mjs:225 bis 228
- **Zitat:** „Labelling does not make a use lawful: … and data protection, competition law, personality rights and copyright remain unaffected.“ (Marker Fakt, Quelle Art. 50 Abs. 6)
- **Befund:** Art. 50 Abs. 6 sagt nur, dass Abs. 1 bis 4 Kapitel III nicht berühren und andere Transparenzpflichten im Unions- oder nationalen Recht unberührt lassen. Datenschutz, Wettbewerbsrecht, Persönlichkeitsrechte und Urheberrecht nennt er nicht. Der Satz „Kennzeichnung macht eine Nutzung nicht rechtmäßig“ ist Auslegung, kein Fakt.
- **Schwere:** B
- **Quelle:** VO (EU) 2024/1689 Art. 50 Abs. 6, EUR-Lex konsolidiert 27.7.2026, Abruf 23.10.2026.
- **Korrektur EN:** Fact: “Paragraphs 1 to 4 do not affect the requirements of Chapter III and are without prejudice to other transparency obligations in Union or national law (Art. 50(6)).” Separate interpretation: “A label does not make a use lawful; data protection, personality rights and copyright still apply.”
- **Korrektur DE:** Fakt: „Die Absätze 1 bis 4 lassen die Anforderungen des Kapitels III und andere Transparenzpflichten im Unions- oder nationalen Recht unberührt (Art. 50 Abs. 6).“ Getrennt als Auslegung: „Eine Kennzeichnung macht eine Nutzung nicht rechtmäßig; Datenschutz, Persönlichkeitsrechte und Urheberrecht gelten weiter.“

### Nr. 16 · Status der Leitlinien ungenau

- **Ort:** labelling.mjs:6 bis 16 und 26; start.mjs:10 und 22
- **Zitat:** „Guidelines … C(2026) 5054 final of 20 July 2026 … Guidance, not law.“
- **Befund:** C(2026) 5054 final ist der Anhang zur Mitteilung „Approval of the content of the draft Communication … Guidelines“. Die Kommissionsseite spricht von angenommenen Leitlinien (Veröffentlichung 20.7.2026, zuletzt aktualisiert 31.7.2026). Ob die förmliche Annahme in allen Sprachfassungen erfolgt ist, war nicht feststellbar. Die Nummer bezeichnet also den Billigungsakt.
- **Schwere:** B
- **Quelle:** Kommission, https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems, Abruf 23.10.2026; Deckblatt C(2026) 5054 final („Approval of the content of the draft Communication from the Commission“), gelesen über die Kopie https://www.dirittobancario.it/wp-content/uploads/2026/07/Guidelines-European-Commission-20-July-2026.pdf, Abruf 23.10.2026.
- **Korrektur EN:** “European Commission, Guidelines on the transparency obligations under Article 50, content approved on 20 July 2026 (C(2026) 5054 final, annex); Stand prüfen: formal adoption in all languages.”
- **Korrektur DE:** „Europäische Kommission, Leitlinien zu den Transparenzpflichten nach Artikel 50, Inhalt gebilligt am 20. Juli 2026 (C(2026) 5054 final, Anhang); Stand prüfen: förmliche Annahme in allen Sprachen.“

### Nr. 17 · Auslegung zum Monteur-Bild ohne Quelle

- **Ort:** labelling.mjs:120 bis 123
- **Zitat:** „A photo-like AI image of a technician in front of a switch cabinet on a website is a deep fake …“
- **Befund:** Inhaltlich gedeckt: Die Leitlinien lassen genügen, dass Personen oder Szenen „plausibly exist“, und nennen die Darstellung beruflicher Dienstleistungen als Ereignis. Die Auslegung trägt aber keine Quelle.
- **Schwere:** C
- **Quelle:** Leitlinien C(2026) 5054 final, Abschnitt 6.1.1, Rn. 113 ff. (Kriterien „Existing“ und „Events“), Abruf 23.10.2026.
- **Korrektur EN:** Add source: “Guidelines C(2026) 5054, section 6.1.1 (point 113 ff.: realistic persons and depictions of professional services count)”.
- **Korrektur DE:** Quelle ergänzen: „Leitlinien C(2026) 5054, Abschnitt 6.1.1 (Rn. 113 ff.: realistische Personen und Darstellungen beruflicher Dienstleistungen zählen)“.

### Nr. 18 · Neues Verbot ab 2.12.2026 bei Bild- und Videoerzeugung nicht erwähnt

- **Ort:** labelling.mjs:108 bis 126
- **Zitat:** kein Zitat, der Hinweis fehlt
- **Befund:** Mit der VO (EU) 2026/1744 kommt in Art. 5 Abs. 1 Buchst. ba und bb ein Verbot für KI-Systeme, die intime oder sexuelle Darstellungen identifizierbarer Personen ohne Einwilligung erzeugen, anwendbar ab 2.12.2026. Für den Fall „media“ wäre ein Satz dazu angebracht.
- **Schwere:** C
- **Quelle:** VO (EU) 2024/1689 Art. 5 Abs. 1 Buchst. ba und bb, Art. 113 Buchst. a, EUR-Lex konsolidiert 27.7.2026, Abruf 23.10.2026.
- **Korrektur EN:** “From 2 December 2026 it is prohibited to use AI systems that generate realistic intimate or sexual depictions of an identifiable person without explicit consent (Art. 5(1)(ba)).”
- **Korrektur DE:** „Ab 2. Dezember 2026 ist es verboten, KI-Systeme zu verwenden, die realistische intime oder sexuelle Darstellungen einer identifizierbaren Person ohne ausdrückliche Einwilligung erzeugen (Art. 5 Abs. 1 Buchst. ba).“

### Nr. 19 · „Sechs Fragen“ sind höchstens sechs

- **Ort:** labelling.mjs:47 und 48; pages.mjs:58 (Karte zählt alle Fragen)
- **Zitat:** „six questions“
- **Befund:** Immer gestellt werden zwei Fragen (Rolle, Einsatzarten), vier nur bedingt.
- **Schwere:** C
- **Quelle:** eigene Prüfung des Codes.
- **Korrektur EN:** “Two to six questions”.
- **Korrektur DE:** „Zwei bis sechs Fragen“.

---

## 3. Anmelde-Memo (`site/src/memos/login.mjs`)

### Nr. 20 · Ergebnis „Grundlegend sicher“

- **Ort:** login.mjs:107 (auch Titel login.mjs:51)
- **Zitat:** „Secure on the basics. Keep it dated.“ / „Grundlegend sicher. Halten Sie es datiert.“; rot: „Not yet secure“ / „Noch nicht sicher“
- **Befund:** Die Hausregel verbietet „secure“/„sicher“ als Zusage. Das grüne Ergebnis bescheinigt Sicherheit allein aus acht Selbstauskünften. Updates, Backups und Endgeräte bleiben dabei ungeprüft. Ein Betrieb kann den Satz einem Kunden oder Versicherer vorlegen.
- **Schwere:** A
- **Quelle:** Hausregeln (Auftrag A5; CLAUDE.md Scutoria); Code.
- **Korrektur EN:** Green: “The three first steps are in place. Keep them dated.” Red: “At least one of the three first steps is open.” Title: “Where does our sign-in stand?”
- **Korrektur DE:** Grün: „Die drei ersten Schritte sind umgesetzt. Halten Sie das datiert fest.“ Rot: „Mindestens einer der drei ersten Schritte ist offen.“ Titel: „Wo steht unsere Anmeldung?“

### Nr. 21 · „Die meisten Einbrüche beginnen mit einer Anmeldung“ ist unbelegt

- **Ort:** login.mjs:54
- **Zitat:** „Most break-ins start with a sign-in …“
- **Befund:** Die Aussage hat keine Quelle und ist in dieser Form nicht gedeckt. Der Verizon DBIR 2025 nennt Missbrauch von Zugangsdaten als häufigsten ersten Angriffsweg, aber mit 22 % (Ausnutzung von Schwachstellen 20 %, Phishing 16 %). Das ist keine Mehrheit.
- **Schwere:** B
- **Quelle:** Verizon DBIR 2025, Zusammenfassungen https://www.tenable.com/blog/cybersecurity-snapshot-verizon-dbir-zeroday-vulnerability-exploits-surge-vpn-edge-device-04-25-2025 und https://www.optery.com/?p=23515, Abruf 23.10.2026 (Original nicht gelesen).
- **Korrektur EN:** “Many break-ins start with a sign-in: …” or with figure and source: “Stolen or guessed credentials were the most common way in, at 22 % of breaches (Verizon DBIR 2025).”
- **Korrektur DE:** „Viele Einbrüche beginnen mit einer Anmeldung: …“ oder mit Zahl und Quelle: „Gestohlene oder erratene Zugangsdaten waren der häufigste Weg hinein, bei 22 % der Vorfälle (Verizon DBIR 2025).“

### Nr. 22 · Austritte ohne Kontosperre ergeben nur „Teilweise“

- **Ort:** login.mjs:93
- **Zitat:** `acctStatus = bad(a.offboarding) && bad(a.recovery) ? 'open' : …`
- **Befund:** „Offen“ gibt es in Schritt 3 nur, wenn Austritte *und* Wiederherstellung fehlen. Wer beim Austritt nicht sperrt oder es nicht weiß, bekommt „Teilweise“, bei sonst guten Antworten insgesamt Gelb „Halb geschafft“. In Schritt 1 genügt dagegen eine einzige schwache Antwort für „Offen“. BSI ORP.4 und ENISA zählen den Entzug beim Austritt zu den Grundlagen.
- **Schwere:** B
- **Quelle:** ENISA, Cybersecurity guide for SMEs, 2021, https://www.enisa.europa.eu/publications/cybersecurity-guide-for-smes, Abruf 23.10.2026 (Fernlöschung bei Ende der Beschäftigung; Zugriff nur auf benötigte Systeme).
- **Korrektur EN:** Step 3 is “Open” if offboarding is “No” or “We do not know”, regardless of recovery.
- **Korrektur DE:** Schritt 3 ist „Offen“, sobald Austritte mit „Nein“ oder „Wir wissen es nicht“ beantwortet sind, gleich wie die Wiederherstellung steht.

### Nr. 23 · Kleinere Ungenauigkeiten bei NIST und Schritt 2

- **Ort:** login.mjs:113 und 168
- **Zitat:** „For passwords it requires: … that password managers, autofill and paste are allowed.“ / „15 characters or more where there is no second factor and at least 12 elsewhere“
- **Befund:** NIST verlangt Passwort-Manager und Autofill (SHALL), Einfügen nur als SHOULD. Die „12“ im Schritt stammt aus Österreich, NIST verlangt mit MFA mindestens 8. Beides als Zusammenführung kenntlich machen.
- **Schwere:** C
- **Quelle:** NIST SP 800-63B-4, Abschnitt 3.1.1.2, https://pages.nist.gov/800-63-4/sp800-63b.html, Abruf 23.10.2026 („Verifiers SHOULD permit claimants to use the 'paste' function“).
- **Korrektur EN:** “… requires that password managers and autofill are allowed, and recommends allowing paste.” Step: “15 characters or more where there is no second factor; at least 12 elsewhere (onlinesicherheit.gv.at; NIST sets 8 as the floor with MFA).”
- **Korrektur DE:** „… verlangt, dass Passwort-Manager und automatisches Ausfüllen erlaubt sind, und empfiehlt, Einfügen zu erlauben.“ Schritt: „15 Zeichen oder mehr ohne zweiten Faktor; sonst mindestens 12 (onlinesicherheit.gv.at; NIST setzt mit MFA 8 als Untergrenze).“

### Nr. 24 · IT-Grundschutz: „neuere Edition nicht geprüft“ lässt sich jetzt beantworten

- **Ort:** login.mjs:10, 22, 158
- **Zitat:** „Whether a newer edition exists was not checked.“
- **Befund:** Edition 2023 ist weiterhin die letzte Vollausgabe. Parallel führt das BSI IT-Grundschutz++ ein. Das ist nur über Sekundärquellen belegt, deshalb Stand prüfen.
- **Schwere:** C
- **Quelle:** heise, „IT-Grundschutz++“, https://heise.de/-9994578; SVA-Flyer 2026, https://www.sva.de/sites/default/files/2026-09/flyer-bsi-it-grundschutz-bausteine-sva-2026.pdf; Abruf 23.10.2026.
- **Korrektur EN:** “Edition 2023 is the latest full edition; the BSI is introducing IT-Grundschutz++ (Stand prüfen at bsi.bund.de).”
- **Korrektur DE:** „Die Edition 2023 ist die letzte Vollausgabe; das BSI führt IT-Grundschutz++ ein (Stand prüfen auf bsi.bund.de).“

### Nr. 25 · ENISA-Wiedergabe glättet einen Widerspruch

- **Ort:** login.mjs:125 und 126
- **Zitat:** „ENISA’s guide … asks everyone to use a passphrase of at least three random common words …“
- **Befund:** ENISA „ermutigt“ (encourage) zur Passphrase und empfiehlt für normale Passwörter weiter Groß- und Kleinbuchstaben, Ziffern und Sonderzeichen. Das widerspricht NIST (keine Kompositionsregeln). Bei WKO 2016 benennt das Memo einen solchen Widerspruch ausdrücklich, hier nicht.
- **Schwere:** C
- **Quelle:** ENISA, Cybersecurity guide for SMEs, 28.6.2021, Schritt 4, PDF https://www.enisa.europa.eu/sites/default/files/publications/ENISA%20Cybersecurity%20guide%20for%20SMEs-online-single_page.pdf, Abruf 23.10.2026.
- **Korrektur EN:** “ENISA encourages a passphrase of at least three random common words; for ordinary passwords it still suggests mixed character types, which NIST no longer requires.”
- **Korrektur DE:** „Die ENISA empfiehlt eine Passphrase aus mindestens drei zufälligen Wörtern; für gewöhnliche Passwörter rät sie weiter zu gemischten Zeichenarten, die NIST nicht mehr verlangt.“

---

## 4. Start-Memo (`site/src/memos/start.mjs`)

### Nr. 26 · Schwächste Antworten ergeben „Ein brauchbarer Anfang“

- **Ort:** start.mjs:102 und 116; Frage `kinds` start.mjs:52 bis 58 wird nirgends ausgewertet; Muster `memo-start-weak-*.pdf`
- **Zitat:** „A sound start; two or three steps are open.“ / „Ein brauchbarer Anfang; zwei oder drei Schritte sind offen.“
- **Befund:** Das Muster „weak“ (KI „Nein, soweit wir wissen“, Tools „Übersetzungstools“, keine Regeln, keine Einweisung) bekommt Gelb mit „brauchbarer Anfang“. Der Lagesatz lautet „KI-Tools sind, soweit Sie wissen, nicht im Einsatz“, obwohl ein KI-Tool angekreuzt ist. Ein Übersetzungstool wie DeepL ist ein KI-System. Damit gilt Art. 4 (KI-Kompetenz) für den Betrieb als Betreiber, und das Memo verneint den Einsatz. Eine schwache und widersprüchliche Antwort bekommt ein beruhigendes Ergebnis.
- **Schwere:** A
- **Quelle:** VO (EU) 2024/1689 Art. 4 Abs. 1 in der Fassung VO (EU) 2026/1744, EUR-Lex konsolidiert 27.7.2026, Abruf 23.10.2026 („Providers and deployers of AI systems shall take measures to support the development of AI literacy …“).
- **Korrektur EN:** If any kind of tool is ticked, treat usage as “yes, unknown accounts” and say: “You ticked AI tools, so AI is in use.” Amber title: “Started, but open: written rules and a dated briefing are missing.” Never use “sound start” when rules and briefing are both “No”.
- **Korrektur DE:** Ist eine Tool-Art angekreuzt, Nutzung als „ja, Konten unbekannt“ werten und sagen: „Sie haben KI-Tools angekreuzt, also ist KI im Einsatz.“ Gelbe Überschrift: „Begonnen, aber offen: Schriftliche Regeln und eine datierte Einweisung fehlen.“ „Brauchbarer Anfang“ nie, wenn Regeln und Einweisung beide „Nein“ sind.

### Nr. 27 · Status „Geregelt“ für nichts Geschriebenes

- **Ort:** start.mjs:126 bis 128
- **Zitat:** „Labelling check … REGULATED“, „Decisions about people kept out … REGULATED“ (auch bei „keine schriftlichen Regeln“)
- **Befund:** Nur weil eine Frage mit „Nein“ beantwortet ist, steht „Geregelt“ da. Geregelt ist erst etwas, das schriftlich festgehalten ist. Das Muster „weak“ zeigt zweimal „Geregelt“ ohne Richtlinie.
- **Schwere:** B
- **Quelle:** eigene Prüfung des Codes und der PDFs.
- **Korrektur EN:** Use “No case at present” and “Not used” instead of “Regulated”, and “Regulated” only if written rules exist.
- **Korrektur DE:** „Derzeit kein Fall“ und „Nicht im Einsatz“ statt „Geregelt“; „Geregelt“ nur, wenn schriftliche Regeln bestehen.

### Nr. 28 · Erster Schritt „betriebliche Konten einrichten“ trotz betrieblicher Konten

- **Ort:** start.mjs:89 und 96
- **Zitat:** „Set up business accounts with training on inputs switched off …“
- **Befund:** Bei „betriebliche Konten“ mit Personenbezug wird derselbe erste Schritt ausgegeben wie bei privaten Konten.
- **Schwere:** C
- **Quelle:** eigene Prüfung des Codes.
- **Korrektur EN:** For business accounts with personal data: “Check that training on inputs is switched off and a processing agreement is in place for each tool; post the one page.”
- **Korrektur DE:** Bei betrieblichen Konten mit Personenbezug: „Prüfen Sie je Tool, dass das Training mit Eingaben abgeschaltet ist und ein Auftragsverarbeitungsvertrag vorliegt; hängen Sie die eine Seite aus.“

### Nr. 29 · Zählfehler in Überschrift und Verweis

- **Ort:** start.mjs:116 und 182
- **Zitat:** „two or three steps are open“; „does steps 2 to 5“
- **Befund:** Gelb erscheint auch, wenn nur ein Schritt offen ist. Die Schrittnummern verschieben sich, wenn „Entscheidungen über Personen“ vorne steht. Das Tool-Register gehört zu Schritt 1, nicht zu 2 bis 5.
- **Schwere:** C
- **Quelle:** eigene Prüfung des Codes.
- **Korrektur EN:** “Started; some steps are open.” Pointer: “The AI Policy Toolkit produces the documents for every step of this plan: …”
- **Korrektur DE:** „Begonnen; einige Schritte sind offen.“ Verweis: „Das KI-Richtlinien-Toolkit erzeugt die Dokumente für jeden Schritt dieses Plans: …“

---

## 5. Memo-Seiten (`site/src/memos/pages.mjs`, `routes.mjs`)

### Nr. 30 · Einwilligung und Zusagen enger als die Speicherung

- **Ort:** pages.mjs:19 und 33 (howText), pages.mjs:22 und 36 (consent), pages.mjs:155 (Mail); routes.mjs:97 bis 100
- **Zitat:** „Your answers go into the address of the result page and nowhere else.“; „I agree that Scutoria stores my address to send this memo.“; Mail: „your address is stored only for this“
- **Befund:** Beim PDF-Versand werden neben der Adresse auch Memo und Ergebnis (rot/gelb/grün) gespeichert. Ist `BREVO_MEMO_LIST_ID` gesetzt, kommt *jede* Adresse in eine Brevo-Kontaktliste, auch ohne Häkchen für die Warteliste. Die Datenschutzerklärung nennt das (in Klammern, als Entwurf). Das Einwilligungsfeld und die Mail sagen es nicht. Außerdem gehen die Antworten zur Erzeugung an den Server; „nowhere else“ ist zu absolut.
- **Schwere:** B
- **Quelle:** Code; `site/content/legal/privacy.en.md` Abschnitt „Memo generators“.
- **Korrektur EN:** Consent: “I agree that Scutoria stores my address, the memo and its result to send this memo once. Details in the privacy notice.” howText: “Your answers travel only in the address of the result page; nothing is stored for a memo you only read.” Do not set `BREVO_MEMO_LIST_ID` until the privacy notice is final.
- **Korrektur DE:** Einwilligung: „Ich bin einverstanden, dass Scutoria meine Adresse, das Memo und sein Ergebnis speichert, um dieses Memo einmal zu senden. Einzelheiten in der Datenschutzerklärung.“ howText: „Ihre Antworten stehen nur in der Adresse der Ergebnisseite; für ein Memo, das Sie nur lesen, wird nichts gespeichert.“ `BREVO_MEMO_LIST_ID` erst setzen, wenn die Datenschutzerklärung endgültig ist.

---

## 6. Tool „Darf das hinein?“ (`site/public/tools/may-this-go-in.js`, Texte in `tools.mjs`)

Alle 216 Kombinationen durchgerechnet: 198 rot, 16 gelb, 2 grün. Jede Datenkategorie, privates Konto und Personenentscheidung ergeben Rot; unbekannte oder nicht freigegebene Konten und Training „ja“ oder „weiß nicht“ ergeben Gelb. Das ist schlüssig, mit einer Ausnahme:

### Nr. 31 · „Etwas anderes“ als Aufgabe ergibt Grün mit „Aufgabe ist zulässig“

- **Ort:** may-this-go-in.js:12; tools.mjs:58 und 138 (Grund `ok`)
- **Zitat:** „Nothing speaks against it. … the task is allowed.“
- **Befund:** Bei Aufgabe „Something else“ (keine Daten, freigegebenes Konto, kein Training) kommt Grün mit der Begründung, die Aufgabe sei zulässig. Gefragt wurde das aber nicht. Unklare Antwort, beruhigendes Ergebnis.
- **Schwere:** B
- **Quelle:** eigener Test in Node (`in-test.mjs`).
- **Korrektur EN:** “Something else” → amber, reason: “Check whether the task is among the permitted uses of your policy (§ 2) before you start.”
- **Korrektur DE:** „Etwas anderes“ → Gelb, Grund: „Prüfen Sie, ob die Aufgabe zu den zulässigen Verwendungen Ihrer Richtlinie gehört (§ 2), bevor Sie beginnen.“

### Nr. 32 · Kleinigkeiten in den Texten

- **Ort:** tools.mjs:62 und 142 (Gelb-Schritt), tools.mjs:50 und 130 (Gesundheit)
- **Zitat:** Gelb: „If the account is private: ask for access …“; „Health information is sensitive by law“
- **Befund:** Ein privates Konto ergibt immer Rot, der Hinweis steht aber bei Gelb. „Von Gesetzes wegen besonders geschützt“ hat keine Quelle (Art. 9 DSGVO).
- **Schwere:** C
- **Quelle:** Code; VO (EU) 2016/679 Art. 9 Abs. 1.
- **Korrektur EN:** Move the private-account line to the red steps; add “(Art. 9 GDPR)” to the health reason and to the sources.
- **Korrektur DE:** Satz zum privaten Konto zu den roten Schritten verschieben; „(Art. 9 DSGVO)“ beim Gesundheitsgrund und in den Quellen ergänzen.

---

## 7. Tool „Steht da etwas Persönliches drin?“ (`site/public/tools/personal.js`)

Testergebnisse siehe `personal-test.mjs` und `personal-test2.mjs` im Testordner. Richtig erkannt: gültige IBAN AT und DE (mit und ohne Leerzeichen), gültige SV-Nummer AT mit Prüfziffer, falsche Prüfziffer wird verworfen, E-Mail, Telefonnummern AT und DE in allen getesteten Schreibweisen, „Herr/Frau/Mr Name“ mit folgendem Leerzeichen, „Kunde: Name“, Kundennummer, Geburtsdatum nach „geb.“, Stripe- und GitHub-Schlüssel.

### Nr. 33 · Namen vor Satzzeichen werden nicht erkannt, Grün „Nichts gefunden“

- **Ort:** personal.js:20 (`NAME_SALUTATION`, verlangt Leerzeichen oder Textende nach dem Namen)
- **Zitat:** Test: „Sehr geehrte Frau Huber,“ → grün; „Termin mit Herrn Müller.“ → grün; „Invoice for Mrs Gruber, 5 High Street.“ → grün
- **Befund:** Die häufigste Stelle eines Namens in Briefen und Mails, die Anrede mit Komma, wird übersehen; ebenso jeder Name am Satzende. Das Tool meldet dann „Nichts gefunden“. Auch das Beispiel auf der Startseite („… for [NAME], [ADDRESS].“) liefert das Tool für den naheliegenden Ausgangstext nicht: Der Name bleibt unmarkiert.
- **Schwere:** A
- **Quelle:** eigener Test in Node, 23.10.2026.
- **Korrektur EN:** Change the name pattern to end at a word boundary, for example `(?:[\p{Lu}][\p{L}'-]+)(?:\s+[\p{Lu}][\p{L}'-]+){0,2}(?=[\s,.;:!?)]|$)`, and add test cases for comma, full stop and line end.
- **Korrektur DE:** Das Namensmuster an einer Wortgrenze enden lassen (Muster wie links) und Testfälle für Komma, Punkt und Zeilenende ergänzen.

### Nr. 34 · Zugangsdaten: Lücken und Passwort im Klartext nach dem Ersetzen

- **Ort:** personal.js:10 (`SECRET`)
- **Zitat:** Test: „Das Passwort ist Sommer2024“ → grün; „Das Passwort lautet Sommer2024“ → Platzhalter-Text „Das [ZUGANGSDATEN] Sommer2024“; „Zugangsdaten: user admin / pw Garten77“ → „[ZUGANGSDATEN] admin / pw Garten77“; „Kennwort für das WLAN: Garten77“ → grün
- **Befund:** Das Muster markiert das Stichwort und das *nächste Wort*. Kurze Füllwörter („ist“, „is“) brechen die Erkennung ganz ab; bei längeren Füllwörtern wird das Füllwort ersetzt und das eigentliche Passwort bleibt in der „Kopie mit Platzhaltern“ stehen. Die Funktion verspricht genau das Gegenteil.
- **Schwere:** A
- **Quelle:** eigener Test in Node, 23.10.2026.
- **Korrektur EN:** Treat the keyword plus the rest of the line (up to 60 characters) as access data, allow filler words (“is”, “ist”, “lautet”, “für …:”), add “WLAN”, “WiFi”, “Schlüssel”, “pw”; test that no password survives placeholderize.
- **Korrektur DE:** Stichwort plus Rest der Zeile (bis 60 Zeichen) als Zugangsdaten werten, Füllwörter zulassen („ist“, „is“, „lautet“, „für …:“), „WLAN“, „WiFi“, „Schlüssel“, „pw“ ergänzen; testen, dass nach dem Ersetzen kein Passwort übrig bleibt.

### Nr. 35 · Gesundheit: häufigste Wörter fehlen

- **Ort:** personal.js:9 (`HEALTH`, nur Ganzwörter)
- **Zitat:** Test grün bei: „ist seit Montag krank“ (ohne Namen), „Krankmeldung“, „Arzttermin“, „Psychotherapie“, „Befunde“, „Sie hat Krebs.“, „Er hat Diabetes.“, „AU-Bescheinigung“, „Arbeitsunfähigkeitsbescheinigung“, „Bandscheibenvorfall“, „Covid positiv“, „Schwerbehinderung“, „off sick“, „cancer“
- **Befund:** Gesundheitsdaten sind besondere Kategorien nach Art. 9 DSGVO, und das Tool wirbt mit „Gesundheitsbegriffen“. Wegen `\b…\b` ohne Wortstämme fehlen die Alltagsbegriffe einer Personalabteilung; Mehrzahl- und Zusammensetzungen („Befunde“, „Operationen“, „Krankenhausaufenthalt“) fallen durch. Ergebnis ist Grün.
- **Schwere:** A
- **Quelle:** eigener Test in Node; VO (EU) 2016/679 Art. 9 Abs. 1.
- **Korrektur EN:** Use stems without the closing boundary (krank\w*, arzt\w*, ärzt\w*, therap\w*, befund\w*, diagnos\w*, operation\w*, behinder\w*, sick, ill, cancer, diabetes, AU-Bescheinigung, Arbeitsunfähig\w*, Kur\b, Reha\w*, Covid, Corona, Krebs, Schwerbehind\w*) and say in the limits text which words are covered.
- **Korrektur DE:** Wortstämme ohne schließende Wortgrenze verwenden (Liste wie links) und im Grenzen-Text sagen, welche Begriffe abgedeckt sind.

### Nr. 36 · IBAN mit folgendem BIC oder Großbuchstaben-Wort

- **Ort:** personal.js:13 (`IBAN`)
- **Zitat:** Test: „IBAN: AT61 1904 3002 3457 3201 BIC: BKAUATWW“ → nur „002 3457 3201“ als Telefon; Platzhalter-Text „IBAN: AT61 1904 3[TELEFON] BIC: …“. Ebenso mit „BAWAG“ oder „EUR 500“ danach, kleingeschrieben oder mit Tippfehler in der Prüfziffer.
- **Befund:** Der Ausdruck nimmt ein folgendes Wort aus Großbuchstaben in die IBAN auf, die Prüfsumme schlägt fehl, und es gibt keinen zweiten Versuch. Das Ergebnis bleibt zwar Rot (über Telefon), die Kopie mit Platzhaltern zeigt aber einen Teil der IBAN, und die Bezeichnung ist falsch. Eine IBAN mit falscher Prüfziffer wird gar nicht als Kontonummer gemeldet.
- **Schwere:** B
- **Quelle:** eigener Test in Node.
- **Korrektur EN:** Match the exact length per country (AT 20, DE 22, generally 15 to 34) without a free tail, case-insensitive; report an IBAN-shaped string with a failed checksum as amber “possibly an IBAN”.
- **Korrektur DE:** Exakte Länge je Land prüfen (AT 20, DE 22, sonst 15 bis 34) ohne freien Rest, ohne Groß-/Kleinschreibung; IBAN-förmige Zeichenfolge mit falscher Prüfziffer gelb als „möglicherweise IBAN“ melden.

### Nr. 37 · Straßennamen aus zwei Wörtern werden nicht erkannt

- **Ort:** personal.js:18 (`ADDRESS`)
- **Zitat:** Test: „Mariahilfer Straße 12“, „Wiener Straße 4“, „Lange Gasse 7/3“, „Am Graben 3“, „12 Baker Street“ → keine Adresse
- **Befund:** Erkannt werden nur Straßennamen in einem Wort („Hauptstraße 5“). In Österreich und Deutschland sind zweiteilige Namen häufig. Wegen des Flags `i` passt das Muster zugleich auf Kleinbuchstaben und nimmt Wörter davor mit („Lieferung an Hauptstraße 5“).
- **Schwere:** B
- **Quelle:** eigener Test in Node.
- **Korrektur EN:** Allow a separate street word after one or two capitalised words (“Wiener Straße”, “Lange Gasse”, “Am Graben”), house number first for English addresses, and remove the `i` flag from the leading capital.
- **Korrektur DE:** Ein eigenständiges Straßenwort nach einem oder zwei großgeschriebenen Wörtern zulassen („Wiener Straße“, „Lange Gasse“, „Am Graben“), Hausnummer vorne für englische Adressen, Flag `i` beim großen Anfangsbuchstaben entfernen.

### Nr. 38 · Deutsche Kennungen fehlen

- **Ort:** personal.js:4 bis 24
- **Zitat:** Test grün: „RV-Nr. 12 150385 M 123“, „Versichertennummer A123456789“, „Steuer-ID 12 345 678 901“, „Ausweis L01X00T47“; „Steuer-ID 12345678901“ nur gelb
- **Befund:** Deutschland ist gleichrangiger Markt. Rentenversicherungsnummer, Krankenversichertennummer (zugleich Gesundheitsbezug) und Steuer-ID werden nicht oder nur schwach erkannt. Die österreichische SV-Nummer dagegen schon.
- **Schwere:** B
- **Quelle:** eigener Test in Node.
- **Korrektur EN:** Add patterns for the German pension insurance number (2 digits, 6 digits date, letter, 3 digits), the health insurance number (letter plus 9 digits), the tax ID (11 digits, also in groups) and the ID card number (9 characters), labelled “Social security, insurance or tax number (DE)”.
- **Korrektur DE:** Muster ergänzen für Rentenversicherungsnummer (2 Ziffern, 6 Ziffern Datum, Buchstabe, 3 Ziffern), Krankenversichertennummer (Buchstabe und 9 Ziffern), Steuer-ID (11 Ziffern, auch gruppiert) und Ausweisnummer (9 Zeichen), Bezeichnung „Sozialversicherungs-, Versicherten- oder Steuernummer (DE)“.

### Nr. 39 · Fehlalarme auf Rot

- **Ort:** personal.js:9, 10, 15, 19
- **Zitat:** Test rot: „Passwort-Manager“, „password policy“, „login page“, „Secret Santa“ (Zugangsdaten), „Befund aus dem Audit“, „Die Operation Lagerumzug“ (Gesundheit), EAN „4006381333931“ (Telefon); gelb: „im Jahr 2024 Umsatz“ (Ort)
- **Befund:** Gerade Texte über Sicherheit und Audits, also die eigene Zielgruppe, landen auf Rot. Das untergräbt das Vertrauen in die Ampel.
- **Schwere:** B
- **Quelle:** eigener Test in Node.
- **Korrektur EN:** Require a separator (“:”, “=”, “is”, “ist”, “lautet”) between keyword and value for access data; drop “Befund” and “Operation” or require a health context; accept phone numbers only with a separator or leading “+”/“0” plus at least one space or slash; no postal match when the four digits are a year from 1900 to 2099 followed by a noun.
- **Korrektur DE:** Für Zugangsdaten ein Trennzeichen zwischen Stichwort und Wert verlangen („:“, „=“, „ist“, „lautet“); „Befund“ und „Operation“ streichen oder Gesundheitskontext verlangen; Telefonnummern nur mit Trennzeichen oder führendem „+“/„0“ mit Leer- oder Schrägstrich; keine Postleitzahl, wenn die vier Ziffern eine Jahreszahl 1900 bis 2099 vor einem Hauptwort sind.

### Nr. 40 · Kleinere Lücken und Schönheitsfehler

- **Ort:** personal.js:17 (Geburtsdatum), 22 (Belegnummern), 20 (Leerzeichen), 18 (Laufzeit)
- **Zitat:** Test: „geboren am 3. Mai 1985“, „DOB: 1985-05-03“ → grün; „Geburtstag 03.05.1985“ → nur Datum gelb; „Rechnung Nr. 2026-0142“ → grün; Platzhalter-Text „Bitte [NAME]zurückrufen“; eine Kette von 150 Bindestrich-Wörtern ohne Leerzeichen blockiert die Prüfung 21 Sekunden
- **Befund:** Geburtsdatum in Worten oder ISO-Form und das Stichwort „Geburtstag“ fehlen; „Rechnung Nr.“ fehlt bei den Belegnummern; der Namens-Platzhalter frisst das folgende Leerzeichen; der Adress-Ausdruck verhält sich bei langen Bindestrich-Ketten exponentiell (normale Texte und URLs bis 50 000 Zeichen unter 10 ms).
- **Schwere:** C
- **Quelle:** eigener Test in Node (`perf3.mjs`).
- **Korrektur EN:** Add “Geburtstag”, dates in words and ISO dates; add “Rechnung Nr.”, “Re.-Nr.”; exclude the trailing space from name matches; cap the length of the address word chain.
- **Korrektur DE:** „Geburtstag“, Datum in Worten und ISO-Datum ergänzen; „Rechnung Nr.“, „Re.-Nr.“ ergänzen; folgendes Leerzeichen aus dem Namensfund nehmen; Länge der Wortkette im Adress-Ausdruck begrenzen.

### Nr. 41 · Werbetexte des Tools versprechen mehr, als es kann

- **Ort:** tools.mjs:21, 76, 86 (und DE 101, 156, 166); Vorschau paper.mjs:140 und 141
- **Zitat:** „The tool marks email addresses, phone numbers, IBANs, names, addresses, health terms and access data …“; Grenzen: „A first name without a salutation … can … stay unmarked.“
- **Befund:** Nach Nr. 33 bis 38 erkennt das Tool Namen nur nach Anrede oder Feldbezeichnung, Adressen nur bei einteiligen Straßennamen, Gesundheit nur bei einer kurzen Wortliste. Der Grenzen-Text nennt nur den Vornamen ohne Anrede.
- **Schwere:** B
- **Quelle:** eigene Tests.
- **Korrektur EN:** Limits: “The check finds patterns: names after a salutation or a label such as ‘Customer:’, street names, common identifiers and a list of health and access words. A name without salutation, a nickname, a rare job title or a two-part street name can stay unmarked. Treat green as ‘nothing obvious’.”
- **Korrektur DE:** Grenzen: „Die Prüfung findet Muster: Namen nach einer Anrede oder einer Feldbezeichnung wie ‚Kunde:‘, Straßennamen, gängige Kennungen und eine Liste von Gesundheits- und Zugangswörtern. Ein Name ohne Anrede, ein Spitzname, eine seltene Berufsbezeichnung oder ein zweiteiliger Straßenname kann unmarkiert bleiben. Nehmen Sie Grün als ‚nichts Offensichtliches‘.“

---

## 8. Produkt- und Startseite

### Nr. 42 · „Einunddreißig Fragen“: Der Generator stellt 34

- **Ort:** product.mjs:92, 93, 105, 130, 131, 143; home.mjs:21, 25, 48, 52; shop/products.mjs:11 und 12; start.mjs:182
- **Zitat:** „Thirty-one questions, thirty minutes …“ / „Einunddreißig Fragen, dreißig Minuten …“
- **Befund:** `content/toolkits/ai-policy/questions.json` (Version 2026-10-19) enthält 34 Fragen in neun Blöcken, davon 29 Pflicht- und 5 freiwillige Fragen (A11, B2, C2, D1, F1). Schon der erste Commit hatte 34. „31“ passt auf keine Zählweise. Das Handbuch sagt „about thirty answers“. Beim Sicherheitsnachweis stimmt die Zahl (40, davon 39 Pflicht).
- **Schwere:** A
- **Quelle:** questions.json, gezählt mit Node; Git-Verlauf (Commits 3849aca, 690c74a).
- **Korrektur EN:** “Thirty-four questions, 29 of them required” or “About thirty questions” (as the handbook says). Same in products.mjs and the start memo pointer.
- **Korrektur DE:** „Vierunddreißig Fragen, davon 29 Pflichtfragen“ oder „Rund dreißig Fragen“ (wie im Handbuch). Ebenso in products.mjs und im Verweis des Start-Memos.

### Nr. 43 · Handbuch „23 Seiten“: Der aktuelle Stand hat 24, die Website zeigt den alten

- **Ort:** product.mjs:19 (`PAGES`), 30, 102; home.mjs:34
- **Zitat:** „Handbook … 23 pages“ / „Twenty-three pages“
- **Befund:** `PRUEFPAKET-2026-10-23/1-ki-richtlinien-toolkit/ai-policy-handbook-en.pdf` (heute erzeugt) hat 24 Seiten. `site/public/samples/ai-policy/ai-policy-handbook-en.pdf` (19.10.) hat 23 Seiten und ist damit veraltet; auch die übrigen Muster-PDFs in `site/public/samples/ai-policy` weichen in Größe und Stand vom Prüfpaket ab. DE (25) und Sicherheit (33/37) stimmen.
- **Schwere:** B
- **Quelle:** Seitenzählung mit pypdf, 23.10.2026.
- **Korrektur EN:** Regenerate the samples from the current build and set the page count from the file (“24 pages”), or drop the page count.
- **Korrektur DE:** Muster aus dem aktuellen Stand neu erzeugen und die Seitenzahl aus der Datei setzen („24 Seiten“), oder die Seitenzahl weglassen.

### Nr. 44 · „Siebzehn“ und „dreiundzwanzig offene Punkte“ zählen erledigte mit

- **Ort:** product.mjs:112 und 150; product-security.mjs:44 und 82; home.mjs:27 und 54
- **Zitat:** „Open points are listed, never hidden: seventeen as of 19 October 2026 …“; „twenty-three …“
- **Befund:** Die Tabellen haben 17 bzw. 23 Zeilen, aber viele sind erledigt. KI-Richtlinien: 8.1, 8.2, 8.3, 8.13, 8.14 „Resolved“, 8.7 „No“, also etwa 11 offen. Sicherheitsnachweis: 6.1, 6.2, 6.4, 6.5, 6.16 „Resolved“, 6.13 „Closed“, 6.12 „Dropped“, 6.9 „Replaced“, 6.10 „No“, also etwa 14 offen. „Offene Punkte“ ist damit ungenau.
- **Schwere:** B
- **Quelle:** content/toolkits/ai-policy/handbook.en.md Abschnitt 8; content/toolkits/security-evidence/handbook.en.md Abschnitt 6; PDFs im Prüfpaket.
- **Korrektur EN:** “Every uncertainty is listed with its status: seventeen points as of 19 October 2026, of which [n] remain open, in section 8 of the handbook.”
- **Korrektur DE:** „Jede Unsicherheit wird mit ihrem Stand aufgeführt: siebzehn Punkte zum Stand 19. Oktober 2026, davon [n] offen, in Abschnitt 8 des Handbuchs.“ (n nach Neuauszählung einsetzen.)

### Nr. 45 · „die zehn Bereiche, nach denen jeder NIS-2-Kunde fragen muss“

- **Ort:** product-security.mjs:50 und 88
- **Zitat:** „The self-declaration covers the ten areas every NIS 2 customer must ask about …“ / „… nach denen jeder NIS-2-Kunde fragen muss …“
- **Befund:** Die Richtlinie verpflichtet erfasste Einrichtungen, die Sicherheit der Lieferkette zu behandeln und Schwachstellen und Praktiken ihrer Lieferanten zu berücksichtigen (Art. 21 Abs. 2 Buchst. d, Abs. 3). Eine Pflicht, Lieferanten zu allen zehn Bereichen des Art. 21 Abs. 2 zu befragen, enthält sie nicht. Das ist eine Rechtsaussage auf einer Verkaufsseite, die so nicht stimmt.
- **Schwere:** A
- **Quelle:** Richtlinie (EU) 2022/2555, Art. 21 Abs. 2 Buchst. d und Abs. 3, EUR-Lex, Abruf 23.10.2026.
- **Korrektur EN:** “The self-declaration follows the ten areas of Article 21(2) of the NIS 2 Directive, which customers covered by it often use to structure their questionnaires …”
- **Korrektur DE:** „Die Selbstauskunft folgt den zehn Bereichen des Art. 21 Abs. 2 der NIS-2-Richtlinie, an denen erfasste Kunden ihre Fragebögen häufig ausrichten …“

### Nr. 46 · „Dreißig Minuten“, „vierzig Minuten“ sind unbelegt

- **Ort:** product.mjs:92, 125, 130, 163; product-security.mjs:24, 57, 62, 95; home.mjs:21, 22, 48, 49
- **Zitat:** „Thirty-one questions, thirty minutes“; „Forty questions, forty minutes“
- **Befund:** Für die Zeitangaben gibt es keine Messung. Mit vorbelegtem Beispielbetrieb mag es reichen; belegt ist es nicht.
- **Schwere:** B
- **Quelle:** nicht ermittelbar (keine Messung im Projekt gefunden).
- **Korrektur EN:** “About thirty questions; the example business is prefilled, so you change only what differs.” Or measure with three test runs and state “typically about N minutes in our tests”.
- **Korrektur DE:** „Rund dreißig Fragen; der Beispielbetrieb ist vorbelegt, Sie ändern nur, was abweicht.“ Oder mit drei Probeläufen messen und „in unseren Tests meist etwa N Minuten“ schreiben.

### Nr. 47 · Alte Texte in i18n

- **Ort:** i18n.mjs:38, 40, 83, 85
- **Zitat:** „Twenty questions, one dated document set.“; „Available November 2026“
- **Befund:** Die Kurzbeschreibung der KI-Linie nennt zwanzig Fragen. Sie erscheint, sobald das Toolkit nicht als verkäuflich markiert ist (Regal, Memo-Verweis). „Available November 2026“ wird nicht mehr verwendet.
- **Schwere:** C
- **Quelle:** Code.
- **Korrektur EN:** Same wording as Nr. 42; delete `soon`.
- **Korrektur DE:** Wortlaut wie Nr. 42; `soon` löschen.

### Nr. 48 · „Ersten zehn Käufer“ fest im Text, Plätze aus der Konfiguration

- **Ort:** product.mjs:52, 63, 73, 84; i18n.mjs (shop.pilotPrice)
- **Zitat:** „Founder price for the first ten buyers,“
- **Befund:** Die Zahl der Gründerplätze kommt aus `PILOT_SEATS`, der Text sagt fest „zehn“. Bei geänderter Konfiguration widerspräche der Text dem Zähler.
- **Schwere:** C
- **Quelle:** config.mjs:32 bis 38; ENTSCHEIDUNGEN E14, E21.
- **Korrektur EN:** Build the sentence from `pilotSeats`.
- **Korrektur DE:** Den Satz aus `pilotSeats` erzeugen.

### Nr. 49 · Beispielbetrieb „Ltd“ in Österreich; D1-Beschreibungen nennen acht von neun Teilen

- **Ort:** product.mjs:115 und 95; product-security.mjs:27
- **Zitat:** „Example Electrical Ltd … in Austria“; „Nine sections …: tools and access, …“ (acht aufgezählt)
- **Befund:** „Ltd“ ist eine britische oder irische Rechtsform, kein österreichischer Betrieb. In beiden D1-Beschreibungen steht „neun“, aufgezählt werden acht (es fehlt § 4 bzw. Abschnitt A).
- **Schwere:** C
- **Quelle:** policy.mjs:117 bis 127; security/self-declaration.mjs:13.
- **Korrektur EN:** “Example Electrical GmbH” or “an example electrical contractor”; list all nine, or write “nine sections, among them …”.
- **Korrektur DE:** Rechtsform passend wählen oder neutral benennen; alle neun aufzählen oder „neun Abschnitte, darunter …“.

### Nr. 50 · Hinweis zur Garantie „sendet nichts“

- **Ort:** tools.mjs:1, 2, 10 und 11 (Kommentar)
- **Zitat:** „the page's security policy forbids network requests, so the promise is enforced, not just stated“
- **Befund:** Die Zusage hält (siehe Kurzfassung). Die Content-Security-Policy verbietet aber nicht jede Anfrage: Bilder, Skripte und Styles vom eigenen Server und Seitenwechsel bleiben möglich. Die Zusage ruht also auf dem Code, die CSP sichert nur einen Teil ab. Für Texte nach außen genügt „sendet nichts“; „erzwungen“ nicht verwenden.
- **Schwere:** C
- **Quelle:** TOOLS_CSP in tools.mjs:11; Code der beiden Skripte.
- **Korrektur EN:** Comment: “The scripts make no network calls; the page’s policy additionally blocks connections and form posts.”
- **Korrektur DE:** Kommentar: „Die Skripte machen keine Netzwerkaufrufe; die Richtlinie der Seite sperrt zusätzlich Verbindungen und Formularversand.“

---

## 9. Was nicht verifiziert werden konnte, und warum

| Aussage | Wo | Grund |
|---|---|---|
| „20 141 Einrichtungen registriert (Stand 30.9.2026)“ | nis2.mjs:170 | Seite „NIS-2 in Zahlen“ unter der vermuteten Adresse 404, Hauptseite ohne Zahlen, Websuche ohne Treffer. Sekundärquellen nennen „mehr als 19 000“ zum 31.7.2026. Nicht verifizierbar. |
| Bundesamt für Cybersicherheit: Erstregistrierung bis 1.1.2027, „letzter Tag 4.1.2027“, Seiten vom 2. und 5.10.2026 | nis2.mjs:180 | Seiten nicht gefunden. Das Gesetz (§ 29 Abs. 3 NISG 2026: drei Monate ab 1.10.2026) ist geprüft; der 4.1.2027 ist rechnerisch plausibel (1.1.2027 Feiertag, 2. und 3.1. Wochenende), aber nicht an der Behördenseite belegt. |
| NISV 2026 „kundgemacht am 1.10.2026“ | nis2.mjs:180; product-security.mjs:45 | RIS bestätigt BGBl. II Nr. 290/2026 und Inkrafttreten mit Ablauf des Kundmachungstags, zeigt das Datum aber nicht. |
| BSI-Pressemitteilungen 31.1.2025 und 30.1.2026; BSI-Verbraucherseiten | login.mjs:9, 117 | Websuche fand keine BSI-Originale, nur Presseberichte. Nicht verifiziert. |
| onlinesicherheit.gv.at „Passwort-Auswahl“ u. a.; WKO-Seiten 2016 und 2026 | login.mjs:129 | Adresse lieferte 404; aus Zeitgründen nicht weiter gesucht. |
| Microsoft 99,2 % (DDR 2023, Studie Mai 2023) | login.mjs:121 | Nicht live geöffnet; aus der Studie von 2023 bekannt (99,22 %). |
| Kommission, FAQ KI-Kompetenz (Stand 27.7.2026) | start.mjs:7, 145 | Nicht geöffnet. Art. 4 selbst ist am Original geprüft. |
| DSK-Orientierungshilfe vom 6.5.2024 | start.mjs:8; tools.mjs:70 | Nicht erneut geöffnet. |
| Kommission, Übersichtsseite Umsetzung NIS2 (Stand 1.7.2025) und Meldung 8.7.2026 | nis2.mjs:189 | Die Klage gegen IE, ES, FR, NL am 8.7.2026 ist über Law Society Gazette und Hunton bestätigt, nicht über die Kommissionsmeldung selbst. Laut Presse könnte die Klage gegen NL zurückgezogen werden (Stand prüfen). |
| Leitlinien C(2026) 5054 | labelling.mjs | Volltext über eine Drittkopie (dirittobancario.it) gelesen, weil die Kommissionsseite nur verlinkt; Inhalt der Rn. 12 bis 16, 38, 113 ff., 131, 133 bis 138, 153, 154 bestätigt. Ob die förmliche Annahme in allen Sprachen erfolgt ist: nicht ermittelbar. |
| Österreich: keine benannte KI-Marktüberwachungsbehörde | labelling.mjs:230; start.mjs:161 | RTR-Seite nennt keine; Websuche fand keine amtliche Benennung. Bestätigt als „nichts gefunden“, nicht als Negativbeweis. |
| Zeitangaben „dreißig“ und „vierzig Minuten“ | Produktseiten | Keine Messung vorhanden. |

Zugriffswege: EUR-Lex lieferte über den Abruf eine leere Seite; die Richtlinie und die konsolidierte KI-Verordnung wurden deshalb im eingebauten Browser gelesen. PDFs von CISA, ENISA und der Kommission wurden lokal mit pypdf ausgelesen. Der Sage-Filter hat in dieser Prüfung keinen Abruf gesperrt.
