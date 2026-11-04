# A4 · Prüfung der sieben Dokumente des Sicherheitsnachweis-Toolkits (Beispielbetrieb, EN und DE)

Stand 23.10.2026. Prüfer: Claude (Teilprüfung A4). Im Projekt nur gelesen; geschrieben wurde nur diese Datei. Renderings und Kopien liegen außerhalb des Projekts unter `C:\Users\Stefa\AppData\Local\Temp\scutoria-review-a4\`.

## Kurzfassung

**Angesehen:** alle 43 PDF-Seiten der 14 Dokument-PDFs, als PNG gerendert (Maßstab 1,3) und einzeln angeschaut: D1 Selbstauskunft 3 (EN) + 4 (DE), D2 Maßnahmenplan 4 + 4, D3 Notfallkarte 1 + 1, D4 Nachweisliste 5 + 5, D5 Antwortschreiben 3 + 3, D6 Klausel-Prüfliste 4 + 4, D7 Nachweisseite 1 + 1. Dazu die beiden Notfallkarten- und die beiden Antwortschreiben-DOCX als Kopie in Word 16 geöffnet, gezählt und als PDF gerendert (9 Seiten).
**Geöffnet:** 12 DOCX (python-docx: Formatvorlagen, Tabellen, Kopf- und Fußzeile, Seitenfelder, Platzhalter), 4 XLSX (openpyxl, rohes XML und read-only in Excel: Blätter, Fixierung, Spaltenbreiten, Datenüberprüfung, Datentypen, Füllfarben, Druckeinstellungen). Generator: alle 9 Dateien in `site/src/toolkit/documents/security/`, dazu `blocks.mjs`, `xlsx.mjs`, `pdf.mjs`, `policy.mjs` (fmtDate), `site/public/site.css`, `questions.json`, `BAUPLAN.md`, `quellen.md`; Handbuch EN für den Abgleich.
**Live geprüft am 23.10.2026:** RL (EU) 2022/2555 Art. 21 und 23, DVO (EU) 2024/2690 Art. 1 und Anhang Nr. 5.1.4, 5.2, 11.6.2, DSGVO Art. 33, DORA Art. 30 (alle über den Cellar des Amts für Veröffentlichungen, weil EUR-Lex dem Abruf leere Seiten lieferte); § 34 NISG 2026 (RIS); CERT.at „Vorfall melden“; WKO Cyber-Security-Hotline; Datenschutzbehörde (Startseite und „Meldung Data Breach“); Bundeskriminalamt Meldestellen; polizei.gv.at Notrufe; BSI IT-Notfallkarte, BSI Service-Center, BSI Meldeseite für Unternehmen, BSI-Anleitung NIS-2-Meldung; polizei.de ZAC; BfDI Landesbehörden; EDPB-Mitgliederliste; ENISA CSIRT-Inventar; onlinesicherheit.gv.at (Suche). Der Sage-Hook hat keinen Abruf blockiert.

**Ergebnis:** 40 Befunde. **A: 7, B: 16, C: 17.**

Alle österreichischen Nummern, Adressen und Mailadressen der Notfallkarte stimmen am 23.10.2026 mit den Originalen überein. Zahlen, Termine und Zählungen laufen über D1, D2, D4, D5 und D7 in EN und DE gleich durch (24 Punkte: 7 vorhanden, 10 teilweise, 6 noch nicht, 1 nicht anwendbar; 16 Maßnahmen; Wellen 22.11.2026, 21.01.2027, 21.04.2027; Wiedervorlage 23.10.2027). Verbotene Wörter, Gedankenstriche und Ausrufezeichen kommen in keinem Dokument vor.

Die schweren Punkte: In den EN-PDFs wird „(c)“ als „©“ gesetzt (falsche Fundstellen beim Kunden); die Nachweisliste meldet vier Nachweise als vorhanden, die es nach den eigenen Antworten nicht gibt; die NIS-2-Zeile der Notfallkarte nennt für Österreich den falschen Meldeempfänger; die Karte passt als DOCX (das man zum Ausfüllen braucht) nicht auf eine Seite und hat für Deutschland und andere EU-Länder keine einzige wählbare Fachnummer; das Antwortschreiben verspricht in der Vertragsvariante eine Anlage, die es so nicht gibt.

**Kann ein Inhaber D1 und D5 so an einen Großkunden schicken?** Nein. Beide PDFs tragen Platzhalter in eckigen Klammern, D5 zusätzlich den gelben DORA-Bedingungsabsatz, die Scutoria-Kopfzeile und keinen Briefkopf mit Absender; im Beispiel stehen statt Name und Telefonnummer Beschreibungen („mobile phone and the office email address“). Nach dem Ausfüllen im DOCX und mit echten Kontaktdaten ist D1 versendbar; D5 braucht zusätzlich die Korrekturen aus Befund 6, 15 bis 17.

**Empfehlung:** Zuerst Befund 1 (eine CSS-Zeile, wirkt auch auf Handbuch und andere Toolkits), dann 2 und 3 (Text und Logik), dann 4, 6 und 7 als ein Umbau der Notfallkarte und des Briefs (Fragen ergänzen, damit das PDF ohne Platzhalter entsteht). Danach die B-Befunde.

Zeilenangaben beziehen sich auf `site/src/toolkit/documents/security/<datei>.mjs` im Stand vom 19.10.2026, sonst ist die Datei genannt.

---

## A: falsch, irreführend, rechtlich riskant oder unbrauchbar

### 1. „(c)“ erscheint in den EN-PDFs als Copyright-Zeichen „©“
- **Ort:** example-electrical-ltd-cover-letter-en.pdf S. 2 (Spalte „Art. 21(2)“, Zeilen Backup und Recovery: „©“ statt „(c)“); example-electrical-ltd-clause-checklist-en.pdf S. 1 (A3 „point 5.1.4©“), S. 3 (B3 „DORA, Art. 30(2)©“), S. 4 (B12 „DORA, Art. 30(3)©“). Quelltext: `cover-letter.mjs` Z. 39 bis 40, `clause-checklist.mjs` Z. 16. Ursache: Die Schrift Manrope ersetzt die Zeichenfolge „(c)“ per Ligatur durch „©“; die Textebene des PDFs enthält korrekt „(c)“, sichtbar ist „©“ (Zoom geprüft). DE ist nicht betroffen (dort „c“ und „Buchst. c“).
- **Befund:** Falsche Rechtsfundstelle in Dokumenten, die an Kunden gehen. Wirkt vermutlich auf jedes PDF und jede Webseite mit Manrope, also auch auf Handbuch, Memos und das KI-Toolkit.
- **Schwere:** A
- **Korrektur (Layout):** In `blocks.mjs` `printCss()` (Z. 82 ff.) und in `site/public/site.css` für `.pg` und den Fließtext ergänzen: `font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-contextual; font-feature-settings: "liga" 0, "dlig" 0, "calt" 0;`. Danach alle PDFs neu erzeugen und nach „©“ im Bild suchen (Textsuche reicht nicht, weil die Textebene „(c)“ enthält).

### 2. Nachweisliste meldet Nachweise als „vorhanden“, die nach den eigenen Antworten fehlen
- **Ort:** example-electrical-ltd-evidence-list-en.pdf S. 1 bis 2 und muster-…-evidence-list-de.pdf S. 1 bis 2, beide XLSX; `evidence-list.mjs` Z. 80 (jede Antwort „yes“ wird Anlage mit Nummer), Nachweistexte in `measures.mjs` Z. 12 (C1), 16 (C2), 56 (E3), 84 (G3).
- **Zitat und Widerspruch:**
  - A4 „Account list without shared logins“ / „Kontenliste ohne geteilte Logins“ = vorhanden. Dieselbe Kontenliste steht unter C4 und C5 als „missing, 21 January 2027“; das Handbuch sagt zu C4 „The example business has no written list“.
  - A7 „Settings per device in the device list“ / „Einstellungen je Gerät in der Geräteliste“ = vorhanden. E2 sagt „no written list“, die Geräteliste fehlt bis 21.01.2027.
  - A5 „… recovery codes stored offline“ = vorhanden. Die Notfallkarte führt den Ort der Wiederherstellungscodes als gelbe Lücke „[place, outside the computers]“.
  - A9 „Written rule; part of the briefing“ / „Teil der Einweisung“ = vorhanden. G1: Eine Einweisung hat es nie gegeben.
- **Befund:** Ein Kunde, der D1 und D4 nebeneinander liest, findet dieselbe Unterlage einmal als Anlage und einmal als fehlend. Das untergräbt genau die Ehrlichkeit, auf der das Produkt aufbaut. Zusätzlich weiß das Toolkit bei „yes“ nur, dass die Maßnahme besteht, nicht, dass die Unterlage im Ordner liegt.
- **Schwere:** A
- **Korrektur:** (a) Nachweistexte für „yes“ so fassen, dass sie nicht von einer fehlenden Unterlage abhängen:
  - C1 EN „Screenshot of the user list in the admin console, one account per person.“ DE „Bildschirmfoto der Benutzerliste in der Administrationskonsole, ein Konto je Person.“
  - C2 EN „Screenshot of the setting per account or the administrator report.“ DE „Bildschirmfoto der Einstellung je Konto oder der Administratorbericht.“ (Wiederherstellungscodes zur Notfallkarte verschieben.)
  - E3 EN „Screenshot of the protection and encryption status per device.“ DE „Bildschirmfoto des Schutz- und Verschlüsselungsstatus je Gerät.“
  - G3 EN „Written rule, signed and dated.“ DE „Schriftliche Regel, unterschrieben und datiert.“
  (b) In `evidenceRows` bei „yes“ den Status „in place, file the evidence“ / „vorhanden, Nachweis ablegen“ ohne Anlagennummer setzen, bis der Betrieb in einer Frage oder in der XLSX-Spalte „Where“ bestätigt, dass die Datei liegt; erst dann eine Nummer vergeben. (c) Eine Konsistenzprüfung im Generator: Ein Nachweis, dessen Text eine Unterlage nennt, die eine andere Antwort als fehlend führt, darf nicht „vorhanden“ sein.

### 3. Notfallkarte: NIS-2-Frühwarnung an „die Behörde“; in Österreich geht sie an das CSIRT, und „erheblich“ fehlt
- **Ort:** example-electrical-ltd-emergency-card-en.pdf und muster-…-emergency-card-de.pdf, Abschnitt „Deadlines“/„Fristen“; `emergency-card.mjs` Z. 24 (EN), Z. 48 (DE).
- **Zitat:** „Early warning to the authority within 24 hours of becoming aware; see the NIS2 memo on scutoria.com.“ / „Frühwarnung an die Behörde binnen 24 Stunden nach Kenntnis …“
- **Befund:** § 34 Abs. 1 und 2 NISG 2026: Meldung jedes erheblichen Cybersicherheitsvorfalls an das sektorspezifische CSIRT, sonst an das nationale CSIRT; das CSIRT leitet an die Behörde weiter. CERT.at verweist für NISG-2026-Meldungen auf die USP-Meldeplattform (nim.services.usp.gv.at). Art. 23 Abs. 1 und 4 RL 2022/2555: CSIRT oder zuständige Behörde, nur für erhebliche Vorfälle, danach Meldung binnen 72 Stunden und Abschlussbericht binnen eines Monats. Die Karte schickt einen betroffenen österreichischen Betrieb an die falsche Stelle und lässt die Schwelle und die Folgefristen weg. Für Deutschland stimmt „Behörde“ (BSI über das BSI-Portal, Erstmeldung 24 h, Folgemeldung 72 h, Abschlussmeldung ein Monat).
- **Schwere:** A
- **Quelle:** NISG 2026 § 34, BGBl. I Nr. 94/2025, https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40273895/NOR40273895.pdf; CERT.at, https://www.cert.at/de/services/vorfall-melden; RL (EU) 2022/2555 Art. 23 Abs. 1, 3, 4 (Cellar, CELEX 32022L2555); BSI, https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/BSI-Portal/NIS-2-Anleitung-Meldung/Anleitung-Meldung_node.html; alle abgerufen 23.10.2026.
- **Korrektur:** Text je Land.
  AT EN: „Only for a significant incident: early warning to CERT.at or your sector CSIRT via the USP reporting platform within 24 hours of becoming aware, notification within 72 hours, final report within one month (§ 34 NISG 2026).“
  AT DE: „Nur bei einem erheblichen Vorfall: Frühwarnung an CERT.at oder das CSIRT Ihres Sektors über die USP-Meldeplattform binnen 24 Stunden nach Kenntnis, Meldung binnen 72 Stunden, Abschlussbericht binnen eines Monats (§ 34 NISG 2026).“
  DE EN: „Only for a significant incident: initial report to the BSI via the BSI portal within 24 hours of becoming aware, follow-up within 72 hours, final report within one month.“
  DE DE: „Nur bei einem erheblichen Vorfall: Erstmeldung an das BSI über das BSI-Portal binnen 24 Stunden nach Kenntnis, Folgemeldung binnen 72 Stunden, Abschlussmeldung binnen eines Monats.“
  EU: „Only for a significant incident: early warning to your national CSIRT or authority within 24 hours, notification within 72 hours, final report within one month (Art. 23(4) Directive (EU) 2022/2555).“

### 4. Die Notfallkarte als DOCX hat zwei Seiten; ausfüllen kann man nur das DOCX
- **Ort:** example-electrical-ltd-emergency-card-en.docx und muster-…-emergency-card-de.docx (Word 16: je 2 Seiten; „Afterwards“/„Danach“ und Quellenhinweis auf S. 2); `blocks.mjs` Z. 109 bis 130 (DOCX ohne eigenes Karten-Layout: Ränder 2 cm, Arial 10,5 pt, Abstände der Normaldokumente), Z. 142 (Aufzählung). PDF: 1 Seite.
- **Befund:** Die Karte muss genau eine Seite haben. Das PDF enthält drei gelbe Lücken (Bank, E-Mail- und Cloud-Anbieter, Ort der Wiederherstellungscodes) und hat keine Formularfelder; wer die Lücken füllt, druckt also aus dem DOCX, und dann hängen zwei Seiten an der Wand. Zusätzlich setzt das DOCX vor die nummerierten Schritte noch einen Aufzählungspunkt („• 1. Disconnect“).
- **Schwere:** A
- **Korrektur (Layout):** (a) Die drei Lücken als Fragen in den Fragebogen (Sperrnummer der Bank, Support des Mail- und Cloud-Anbieters, Ort der Codes und der Kontenliste), damit das PDF vollständig entsteht; (b) für `id: 'emergency-card'` ein eigenes DOCX-Profil: Ränder 1 cm, Grundschrift 9,5 pt, Feldertabelle ohne Leerabsatz danach, Abstände 2 pt, Schritte als nummerierte Liste ohne Aufzählungspunkt; (c) im Build eine Seitenprüfung (PDF und DOCX je 1 Seite) als Test.

### 5. Antwortschreiben, Variante „Vertrag“: verspricht eine Anlage mit Formulierungen, die es nicht gibt, und würde den Verhandlungsleitfaden an den Kunden schicken
- **Ort:** `cover-letter.mjs` Z. 16 (EN), Z. 59 (DE), Anlagenliste Z. 27 und 70. Im Beispiel nicht sichtbar (A6 = customer), wirkt bei jedem Käufer, der A6 = „contract“ ankreuzt und „customer“ nicht.
- **Zitat:** „our remarks on the individual clauses are in the enclosed clause checklist. We can sign what is marked there as acceptable; for the other points we propose the wording noted there.“
- **Befund:** D6 markiert nichts als „für uns zusagbar“ und enthält keine vorgeschlagenen Formulierungen; es ist ein interner Leitfaden („negotiate away certifications per person“, „ask for … cost sharing“, „Zertifizierungen je Person wegverhandeln“). Wer D6 beilegt, zeigt dem Kunden seine Verhandlungslinie. Dazu fehlt D6 in der Anlagenliste, die immer nur D1, D2, D4 nennt.
- **Schwere:** A
- **Korrektur:** Text ändern, bis es eine kundentaugliche Fassung gibt.
  EN: „thank you for the contract documents with security clauses. Attached you find our security self-declaration as of {d}. We will send our comments on the individual clauses, with proposed wording where needed, separately.“
  DE: „vielen Dank für die Vertragsunterlagen mit Sicherheitsklauseln. Beigelegt finden Sie unsere Selbstauskunft Informationssicherheit mit Stand {d}. Unsere Anmerkungen zu den einzelnen Klauseln, wo nötig mit Formulierungsvorschlag, senden wir gesondert.“
  Später: aus D6 ein eigenes Kundenblatt „Clause, our position, proposed wording“ / „Klausel, unsere Position, vorgeschlagene Formulierung“ erzeugen und nur dieses in die Anlagenliste aufnehmen.

### 6. D1 und D5 sind als PDF nicht versendbar
- **Ort:** example-electrical-ltd-self-declaration-en.pdf S. 1, muster-…-self-declaration-de.pdf S. 1 („Prepared for: [customer or insurer, entered per recipient]“; `self-declaration.mjs` Z. 154); example-electrical-ltd-cover-letter-en.pdf S. 1 und DE S. 1 (zweimal „[name and address of the customer or insurer]“, gelber Absatz „[If the recipient is a financial entity under DORA: …]“, Kopfzeile „SCUTORIA · COVER LETTER · SECURITY EVIDENCE TOOLKIT“, Titel „Cover letter and questionnaire mapping“ über dem Brief); `cover-letter.mjs` Z. 117 bis 128, 142 bis 148.
- **Befund:** Das PDF ist das Hauptformat, hat aber keine Formularfelder. Der Brief hat keinen Briefkopf mit Absenderanschrift, kein Datum und keinen Ort im Brieftext, keinen Raum für die Unterschrift zwischen Grußformel und Name, und er trägt die Marke des Werkzeugs statt der des Betriebs. Der DORA-Absatz steht in jedem Brief, auch an einen Elektroinstallateur-Kunden ohne Finanzbezug. Ein Inhaber, der das PDF verschickt, verschickt sichtbar eine unausgefüllte Vorlage.
- **Schwere:** A
- **Korrektur:** Fragen ergänzen: Empfänger (Name, Anschrift), „Ist der Empfänger eine Bank, ein Versicherer oder ein anderes Finanzunternehmen?“ (ja, nein, unbekannt), Absenderanschrift. Daraus: Briefkopf mit Absender, Empfängerblock, „Ort, Datum“, Betreff, drei Leerzeilen für die Unterschrift, Name und Funktion. DORA-Absatz nur bei „ja“ oder „unbekannt“, dann ohne Klammern. Kopfzeile ohne „Scutoria“ (höchstens klein im Fuß „erstellt mit …“). Fehlen Pflichtangaben, das PDF sichtbar als „DRAFT“ / „ENTWURF“ kennzeichnen. In D1 die Zeile „Prepared for“ weglassen, wenn kein Empfänger erfasst ist.

### 7. Notfallkarte für Deutschland und andere EU-Länder: keine wählbare Fachnummer, keine gelbe Lücke
- **Ort:** `emergency-card.mjs` Z. 30 und 31 (EN), Z. 54 und 55 (DE). Im österreichischen Beispiel nicht sichtbar.
- **Zitat:** DE: „Zentrale Ansprechstelle Cybercrime (ZAC) der Polizei Ihres Bundeslands: polizei.de, Bereich ZAC“; „BSI, IT-Notfallkarte und Maßnahmen: bsi.bund.de/dok/13003500“; „Landesdatenschutzbehörde Ihres Bundeslands: Liste beim BfDI, „Landesbehörden““. EU: „National hotline or chamber of your country“, „Data protection authority of your country, within 72 hours“.
- **Befund:** Die Karte sagt „Die Nummern stehen auf dieser Karte“, für Deutschland steht dort außer 110 und 112 keine Nummer. Die BSI-Seite ist eine Erklärseite zur IT-Notfallkarte ohne Kontakt, kein Computer-Notfallteam. Die Felder sind nicht gelb markiert, der Betrieb merkt also nicht, dass er nachtragen muss. Deutschland ist Kernmarkt.
- **Schwere:** A
- **Quelle (verifiziert):** polizei.de, Tabelle „Erreichbarkeiten der Zentralen Ansprechstellen Cybercrime“, eine Nummer je Land (z. B. Bayern +49 89 1212-3300, Baden-Württemberg +49 711 5401-2444, Nordrhein-Westfalen +49 211 939-4040), https://www.polizei.de/Polizei/DE/Einrichtungen/ZAC/zac_node.html; BSI Service-Center 0800 274 1000, Montag bis Donnerstag 8 bis 17 Uhr, Freitag 8 bis 16 Uhr, https://www.bsi.bund.de/DE/Service-Navi/Kontakt/Service-Center/service-center_node.html; BSI-Seite für Unternehmen: Meldung über das Meldeformular im Melde- und Informationsportal, keine Telefonnummer; BfDI-Liste der 16 Landesbehörden, https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html; EDPB-Mitgliederliste mit allen Aufsichtsbehörden, https://www.edpb.europa.eu/about-edpb/about-edpb/members_en; ENISA CSIRT-Inventar, https://www.enisa.europa.eu/topics/incident-management/csirt-inventory; alle abgerufen 23.10.2026.
- **Korrektur:** Für DE eine Frage „Bundesland“ und die 16 ZAC-Nummern und 16 Landesdatenschutzbehörden als Tabelle im Generator (mit Abrufdatum); bis dahin die drei Felder gelb: EN „[ZAC of your federal state: number from polizei.de/ZAC]“, DE „[ZAC Ihres Bundeslands: Nummer von polizei.de, ZAC]“. Computer-Notfallteam DE: „BSI Service-Center 0800 274 1000 (Mon to Thu 8:00 to 17:00, Fri 8:00 to 16:00); reports by companies via the BSI reporting portal“ / „BSI Service-Center 0800 274 1000 (Mo bis Do 8 bis 17 Uhr, Fr 8 bis 16 Uhr); Meldung für Unternehmen über das Melde- und Informationsportal des BSI“. EU: alle drei Felder gelb, mit genauen Listen-URLs (ENISA CSIRT-Inventar, EDPB-Mitgliederliste).

---

## B: ungenau, unklar, unbelegt

### 8. Auf der Karte fehlen die Nummern der eigenen Leute und des IT-Dienstleisters
- **Ort:** beide Notfallkarten-PDF, „Who to call“: „Owner or managing director, mobile phone and the office email address“, „office management“, „Example IT Services Ltd, emergency line in the service contract“; `emergency-card.mjs` Z. 78 bis 80 (nur `deputy` wird gelb, und nur wenn leer); Beispieldaten `questions.json` A4 und A5 (`default`, `defaultText`).
- **Befund:** Die Karte behauptet „The numbers are on this card“, für die drei wichtigsten Anrufe steht keine Nummer. Das Beispiel zeigt Käufern also eine Karte ohne Nummern. Gleiches in D1 Abschnitt A, D5 (Brief und Abgleich), D6 A9 und D7.
- **Schwere:** B
- **Korrektur:** A4 und A5 je ein Pflichtfeld „phone“ / „Telefon“; Feld gelb, wenn keine Ziffern darin stehen. Beispieldaten mit erkennbar fiktiven Nummern, z. B. EN „Managing director, +43 660 000 00 01 (example), office@example.at“, DE „Inhaberin, +43 660 000 00 01 (Beispiel), buero@muster.at“; IT-Dienstleister „Example IT Services Ltd, emergency line +43 1 000 00 00 (example)“.

### 9. Die Karte ist aus der Entfernung nicht lesbar; Bauplan verlangt großen Satz
- **Ort:** beide Notfallkarten-PDF; `emergency-card.mjs` Z. 113 (Fließtext 11,5 px ≈ 8,6 pt, Felder 11 px ≈ 8,3 pt, Hinweis 9,5 px ≈ 7,1 pt); BAUPLAN.md Z. 162 „D3 als einseitige PDF-Karte (Variante der DocumentPage mit großem Satz)“.
- **Befund:** Die Nummern stehen in 8 pt grauer Beschriftung zwischen Fließtext, nichts ist hervorgehoben; unten bleibt rund ein Fünftel der Seite leer. An der Wand neben dem Feuerlöscher liest man aus einem Meter nur die Überschriften.
- **Schwere:** B
- **Korrektur (Layout):** Block „Who to call“ nach oben, zweispaltig, Nummern 14 bis 16 pt fett, Bezeichnung 10 pt; die vier Schritte als große nummerierte Zeilen (11 bis 12 pt, erster Satz fett: „Disconnect.“); Fristen als drei Kästen; freien Platz unten nutzen. Rot-Akzent nur für die Kopfzeile „In an emergency / Im Notfall“.

### 10. DSGVO-Zeile auf der Karte verkürzt Art. 33
- **Ort:** Notfallkarten-PDF, „Personal data affected?“; `emergency-card.mjs` Z. 23 (EN), Z. 47 (DE).
- **Zitat:** „report to the data protection authority without undue delay and within 72 hours of becoming aware.“
- **Befund:** Art. 33 Abs. 1: „where feasible, not later than 72 hours“, und keine Meldung, wenn die Verletzung „unlikely to result in a risk“; Abs. 2: Wer als Auftragsverarbeiter für einen Kunden tätig ist, meldet an den Kunden, nicht an die Behörde; Abs. 5: jede Verletzung dokumentieren. Die Karte macht aus der Regel „immer melden, spätestens 72 h“ und übergeht den Auftragsverarbeiter-Fall, der beim Beispielbetrieb (Kundendaten, Pläne) naheliegt.
- **Schwere:** B
- **Quelle:** DSGVO Art. 33 Abs. 1, 2, 5 (Cellar, CELEX 32016R0679); Datenschutzbehörde „unverzüglich und möglichst binnen 72 Stunden“, https://www.dsb.gv.at/eingabe-an-die-dsb/-meldung-data-breach; abgerufen 23.10.2026.
- **Korrektur:** EN „{who} checks. Report to the data protection authority without undue delay and where possible within 72 hours of becoming aware, unless there is unlikely to be a risk to people; if you process the data for a customer, inform the customer at once instead. Record every breach (GDPR Art. 33).“ DE „{who} prüft. Meldung an die Datenschutzbehörde unverzüglich und möglichst binnen 72 Stunden nach Kenntnis, außer es besteht voraussichtlich kein Risiko für Personen; verarbeiten Sie die Daten für einen Kunden, stattdessen sofort den Kunden informieren. Jede Verletzung dokumentieren (DSGVO Art. 33).“

### 11. Erste Stunde: der dauernd verbundene NAS ist nicht abgedeckt; Quellenangabe deckt die Ausschalt-Regel nicht
- **Ort:** Notfallkarten-PDF, Schritt 2 und Quellenhinweis; `emergency-card.mjs` Z. 15 und 28 (EN), Z. 39 und 52 (DE).
- **Befund:** Schritt 2 „do not plug in the backup“ hilft bei einer Wechselplatte. Der Beispielbetrieb sichert nur auf einen NAS im Netz ohne Offline-Kopie (D1); der wird mit verschlüsselt, wenn er nicht sofort getrennt wird. Die TOP 12 des BSI fragen ausdrücklich, ob Sicherungen gestoppt und geschützt wurden (laut Handbuch Abschnitt 4). Zweitens: Der Hinweis nennt onlinesicherheit.gv.at als Vorbild der Schritte; dort steht aber „sofort … stromlos machen“. Die Abwägung der Karte ist eigene Auslegung (Handbuch sagt das), auf der Karte fehlt der Hinweis.
- **Schwere:** B
- **Quelle:** onlinesicherheit.gv.at, „Erpressungstrojaner: Was tun bei Infektion?“, https://www.onlinesicherheit.gv.at/Services/Technologie-Schwerpunkte/Ransomware/Erpressungstrojaner-Was-tun-bei-Infektion.html (Suchergebnis 23.10.2026); Handbuch EN Z. 393 bis 397.
- **Korrektur:** Schritt 2 EN „Do not delete, do not reinstall. Stop the backup jobs and disconnect the NAS or backup disk from the network; never connect a backup to an infected device.“ DE „Nicht löschen, nicht neu aufsetzen. Sicherungsaufträge stoppen und NAS oder Sicherungsplatte vom Netz trennen; nie eine Sicherung an ein infiziertes Gerät anschließen.“ Hinweis ergänzen: EN „On switching off, the sources differ; the card follows our weighing (handbook, section 4).“ DE „Beim Ausschalten weichen die Quellen ab; die Karte folgt unserer Abwägung (Handbuch, Abschnitt 4).“

### 12. „Not applicable“ ohne Grund, obwohl die Option den Grund trägt
- **Ort:** D1 EN S. 2 und DE S. 2 („Vulnerability contact …: Not applicable“), D5 Abgleich, D6 A6 „E4: Not applicable“; `self-declaration.mjs` Z. 94; Option in `questions.json` E4 „Not applicable: we supply no software or devices“.
- **Befund:** D1 schreibt selbst „not applicable with the reason“, zeigt den Grund aber nicht; `fieldValue` ersetzt die Option durch das nackte Statuswort. Ebenso gehen die Zusätze der Teilweise-Optionen verloren (F2 „Partly: known in principle, nothing written down“, D4 „Partly: contacts are known …“). Hausregel „nicht anwendbar mit Grund“ verletzt.
- **Schwere:** B
- **Korrektur:** In `fieldValue` für `na` und `partly` den Optionstext verwenden, wenn kein Freitext vorliegt: `optionLabel(q, v, lang)`; Ergebnis EN „Not applicable: we supply no software or devices“, DE „Nicht anwendbar: Wir liefern keine Software und keine Geräte“. Für Status-Fragen ohne begründete N/A-Option ein Pflichtfeld „Reason / Grund“.

### 13. Kennungen kollidieren und sind in D1 nicht sichtbar
- **Ort:** D1 (keine Fragekennungen), D4 „Proves: C1 · …“, D6 „Your position: B1: … C2: … D1: …“, D5 Zeile „May we audit you“ mit Abschnitt „D4“; `cover-letter.mjs` Z. 50 und 93; `evidence-list.mjs` Z. 85 (Anlagen „A1“ bis „A10“); `clause-checklist.mjs` Z. 111 bis 113 (Klauseln „A1“ bis „A11“, „B1“ bis „B15“).
- **Befund:** „D4“ heißt gleichzeitig Nachweisliste (Dokument), Notfallplan (Frage) und steht im Abgleich in der Spalte „Self-declaration“, wo nur Abschnitte A bis I stehen; ein Kunde sucht dort den Notfallplan. „A4“ ist Frage (Verantwortliche Person), Anlage (Kontenliste) und in D6 eine Klausel. D4 und D6 verweisen auf Kennungen, die D1 nicht druckt.
- **Schwere:** B
- **Korrektur:** In D1 vor jedes Feld die Kennung setzen („C1 · One account per person …“). Anlagen „Att. 1 bis 10“ / „Anl. 1 bis 10“; Klauseln „K1 bis K11“ und „DORA 1 bis 15“. D5 Zeile „May we audit you“: Spalte Selbstauskunft „B, I“, Antwort beginnt mit EN „Evidence list (D4): …“ / DE „Nachweisliste (D4): …“.

### 14. D5 Abgleich: zusammengeklebte Antworten ohne Bezug
- **Ort:** example-electrical-ltd-cover-letter-en.pdf S. 2 bis 3, DE S. 2 bis 3; `cover-letter.mjs` Z. 129.
- **Zitat:** „Partly · planned by 21 January 2027 · Not yet · planned by 21 January 2027“ (Passwortregel und Adminrechte); „None known · Not yet · planned by 21 January 2027“; „Partly · … · Partly · … · Not yet · …“ (Dienstleister).
- **Befund:** Der Kunde kann nicht erkennen, welcher Teil seiner Frage welche Antwort hat.
- **Schwere:** B
- **Korrektur:** `answer()` mit Kurzlabel je Teil: EN „Password rule: partly, by 21 January 2027; admin rights: not yet, by 21 January 2027“; DE „Passwortregel: teilweise, bis 21. Jänner 2027; Administratorrechte: noch nicht, bis 21. Jänner 2027“.

### 15. D5: „the Directive“ ohne Namen und Fundstelle
- **Ort:** D5 EN und DE S. 1, zweiter Absatz; `cover-letter.mjs` Z. 21 und 64.
- **Zitat:** „the Directive names the size of the entity expressly among the criteria of proportionality.“
- **Befund:** Im Brief ist vorher keine Richtlinie genannt; die Aussage stimmt (Art. 21 Abs. 1 UAbs. 2), steht aber ohne Beleg im Kundenschreiben. Belegregel.
- **Schwere:** B
- **Quelle:** RL (EU) 2022/2555 Art. 21 Abs. 1 UAbs. 2, Cellar CELEX 32022L2555, abgerufen 23.10.2026.
- **Korrektur:** EN „Article 21(1) of the NIS 2 Directive (EU) 2022/2555 names the size of the entity among the criteria of proportionality.“ DE „Artikel 21 Absatz 1 der NIS-2-Richtlinie (EU) 2022/2555 nennt die Größe der Einrichtung ausdrücklich unter den Kriterien der Verhältnismäßigkeit.“

### 16. D6 Einleitung: falscher Anwendungsbereich der DVO 2024/2690
- **Ort:** D6 EN und DE S. 1; `clause-checklist.mjs` Z. 12 und 56.
- **Zitat:** „For digital infrastructure entities the Commission has listed eight contract contents“ / „Für Anbieter digitaler Infrastruktur …“
- **Befund:** Art. 1 DVO: DNS, TLD, Cloud, Rechenzentren, CDN, Managed Service und Managed Security Service Provider, Online-Marktplätze, Suchmaschinen, soziale Netzwerke, Vertrauensdienste. Das ist mehr als „digitale Infrastruktur“; gerade die Managed Service Provider sind für kleine Lieferanten der typische Fall.
- **Schwere:** B
- **Quelle:** DVO (EU) 2024/2690 Art. 1 (Cellar CELEX 32024R2690), abgerufen 23.10.2026.
- **Korrektur:** EN „For cloud, data centre, managed and managed security service providers, online marketplaces and other digital providers, the Commission has listed eight contract contents (Implementing Regulation (EU) 2024/2690, Annex, point 5.1.4)“. DE „Für Cloud- und Rechenzentrumsanbieter, Managed-Service- und Managed-Security-Anbieter, Online-Marktplätze und weitere digitale Anbieter hat die Kommission acht Vertragsinhalte aufgezählt (Durchführungsverordnung (EU) 2024/2690, Anhang, Nr. 5.1.4)“.

### 17. D6 A6 Schwachstellen: „alle anderen: nicht anwendbar“ ist zu eng
- **Ort:** D6 EN und DE S. 1 bis 2, Zeile A6; `clause-checklist.mjs` Z. 23 und 67.
- **Befund:** Nr. 5.1.4 Buchst. f betrifft Schwachstellen, „that present a risk to the security of the network and information systems of the relevant entities“. Das trifft auch einen Elektroinstallateur, der vernetzte Geräte (Gebäudetechnik, Zutritt, PV-Wechselrichter) beim Kunden einbaut oder Fernzugriff hat. Das Handbuch sagt „installs but does not manufacture“; der Rat in D6 lässt den Installateur trotzdem „not applicable“ schreiben.
- **Schwere:** B
- **Quelle:** DVO (EU) 2024/2690 Anhang Nr. 5.1.4 Buchst. f, abgerufen 23.10.2026.
- **Korrektur:** EN „Software and device suppliers: accept a contact and a deadline. Installers of connected devices or anyone with remote access: accept passing on manufacturer updates and reporting known vulnerabilities without undue delay. Everyone else: ‘not applicable, we supply and install no software or connected devices’.“ DE entsprechend: „Software- und Gerätelieferanten: Kontakt und Frist zusagen. Wer vernetzte Geräte einbaut oder Fernzugriff hat: Weitergabe der Herstellerupdates und Meldung bekannter Schwachstellen ohne unangemessene Verzögerung zusagen. Alle anderen: ‚nicht anwendbar, wir liefern und installieren keine Software und keine vernetzten Geräte‘.“

### 18. D6 Teil B: Kleinstunternehmer-Übertragung als allgemeiner Rat; gleicher Rat in 15 Zeilen
- **Ort:** D6 S. 3 bis 4 (EN und DE); `clause-checklist.mjs` Z. 49 bis 50, 93 bis 94, 112 bis 113.
- **Befund:** Art. 30 Abs. 3 letzter UAbs. DORA: Die Übertragung der Prüfrechte an einen unabhängigen Dritten (vom IKT-Dienstleister benannt) gibt es nur, wenn das Finanzunternehmen ein Kleinstunternehmen ist; die Einleitung sagt das richtig, der Rat „ask for the microenterprise delegation“ in jeder Zeile nicht. Zudem steht derselbe Absatz neunmal und sechsmal, inklusive „the location clause needs your provider list“ in Zeilen, die nichts mit Orten zu tun haben.
- **Schwere:** B
- **Quelle:** Verordnung (EU) 2022/2554 Art. 30 Abs. 2, 3 (Cellar CELEX 32022R2554), abgerufen 23.10.2026.
- **Korrektur:** Rat je Zeile oder ein Absatz über der Tabelle; Satz ändern: EN „If the financial entity is a microenterprise, ask to delegate audit rights to an independent third party you appoint (Art. 30(3) DORA, last subparagraph).“ DE „Ist das Finanzunternehmen ein Kleinstunternehmen, die Übertragung der Prüfrechte an einen von Ihnen benannten unabhängigen Dritten vorschlagen (Art. 30 Abs. 3 letzter UAbs. DORA).“

### 19. D7: anderes Statusvokabular, „signed by“ vor der Unterschrift, andere Bereichsnamen
- **Ort:** example-electrical-ltd-evidence-summary-en.pdf, DE ebenso; `blocks.mjs` Z. 28 (`STATUS_WORD`: Regulated, Planned, Open); `evidence-summary.mjs` Z. 14 und 28, Z. 55 (Bereichstitel aus `questions.json`).
- **Befund:** D1 arbeitet mit „in place, partly, not yet, not applicable“; D7 mit „Regulated / Planned / Open“, wobei „Planned“ für „teilweise“ steht und „Open“ für Bereiche, deren Punkte ebenfalls einen Termin haben. „State as of … · signed by Owner or managing director“ behauptet eine Unterschrift, die beim Erzeugen nicht existiert. Bereichsnamen weichen ab: D1 „H · Own providers and cloud“, „I · Evidence and end of contract“ / D7 „H · Your own providers and the cloud“, „I · Evidence, dates and review“ (DE „Nachweise und Vertragsende“ gegen „Nachweise, Termine und Wiedervorlage“).
- **Schwere:** B
- **Korrektur:** Pillen EN „In place / Partly / Not yet“, DE „Vorhanden / Teilweise / Noch nicht“ (Bereich mit gemischtem Stand: schlechtester Wert plus Zähler). „signed by“ ersetzen durch EN „to be signed by {who}“ / DE „zu unterschreiben von {who}“. Eine Quelle für Bereichstitel (entweder `questions.json` oder `T.sections`) in allen Dokumenten und Tabellen.

### 20. PDFs ohne Seitenzahlen, Folgeseiten ohne Kopf- und Fußzeile
- **Ort:** alle mehrseitigen PDFs (D1, D2, D4, D5, D6); `pdf.mjs` Z. 21 (`page.pdf` ohne `displayHeaderFooter`). Die DOCX haben „Page x of y“.
- **Befund:** Die unterschriebene Selbstauskunft hat drei oder vier lose Seiten ohne Betrieb, Titel, Datum und Seitenzahl; einzelne Seiten sind keinem Dokument zuzuordnen. D1 DE hat vier Seiten, EN drei: ohne Zählung merkt der Kunde nicht, ob eine fehlt.
- **Schwere:** B
- **Korrektur (Layout):** `page.pdf({ displayHeaderFooter: true, headerTemplate, footerTemplate })` mit Betrieb, Dokumenttitel, Datum und „Page <span class=pageNumber></span> of <span class=totalPages></span>“ / „Seite … von …“, Ränder entsprechend vergrößern.

### 21. Handbuch und Dokumente widersprechen sich beim Beispielbetrieb
- **Ort:** Handbuch EN Z. 118 (B1 „completed in the first wave“; „not for payments“), Z. 178 (C5 „not yet, first wave“), Z. 379 und 509 („D1 and D5 refer to the numbers“), Z. 375 (Anlässe der Wiedervorlage); D2 EN und DE S. 2 (B1 und C5 in Welle 2, 21.01.2027), D1 G3 „Call-back rule for payments: In place“, D1 und D5 ohne Anlagennummern, D2 „Occasions“.
- **Befund:** Laut Handbuch liegen B1 und C5 in der ersten Welle, laut Plan in der zweiten (Priorität 2 in `questions.json`). Das Handbuch sagt, der Beispielbetrieb habe keine Zahlungsregel, D1 sagt „vorhanden“. D1 und D5 verweisen nicht auf Anlagennummern. Die Auslöser der Wiedervorlage im Handbuch (u. a. „a departure“) sind andere als die vier in D2.
- **Schwere:** B
- **Korrektur:** Dokumente als Maßstab nehmen und das Handbuch angleichen (Welle 2 für B1 und C5; B1-Beispieltext ohne „payments“), oder Prioritäten in `questions.json` ändern. In D1 im Schlusssatz die Anlagen nennen: EN „Attachments: see the evidence list (D4), Att. 1 to 10.“ DE „Anlagen: siehe Nachweisliste (D4), Anl. 1 bis 10.“ Eine gemeinsame Liste der Wiedervorlage-Anlässe.

### 22. D2: Spalte „Responsible“ enthält den Vertragshinweis des Dienstleisters
- **Ort:** D2 EN und DE, Maßnahmen 1, 2, 3, 8, 10, 11, 15; XLSX Spalte G; `action-plan.mjs` Z. 51 und 68.
- **Zitat:** „Owner or managing director with Example IT Services Ltd, emergency line in the service contract“
- **Befund:** A5 hat nur ein Textfeld für Name und Erreichbarkeit; im Plan steht deshalb der Hinweis auf die Notfallnummer als Teil der Verantwortlichkeit. Die schmale Spalte wird sieben bis neun Zeilen hoch (DE mit Worttrennung mitten im Wort, siehe 23).
- **Schwere:** B
- **Korrektur:** A5 in „Name des Dienstleisters“ und „Notfallnummer“ teilen; im Plan nur den Namen: EN „Managing director with Example IT Services Ltd“, DE „Geschäftsführung mit Muster IT-Service GmbH“.

### 23. Passwortregel „nur bei Verdacht ändern“ ohne Hinweis auf die DVO
- **Ort:** D2 Maßnahme 9, D4 C6, D6 A1 (Rat „Accept the measures of your self-declaration“); `measures.mjs` Z. 32.
- **Befund:** DVO 2024/2690 Anhang Nr. 11.6.2 Buchst. c verlangt für die erfassten Anbieter den Wechsel „at predefined intervals“. Ein Kunde dieser Gruppe kann die Anforderung weitergeben. Das Handbuch markiert den Punkt als unsicher; D2 und D6 schweigen. Ebenso steht „fifteen characters or more“ ohne Quelle (NIST SP 800-63B-4).
- **Schwere:** B
- **Quelle:** DVO (EU) 2024/2690 Anhang Nr. 11.6.2 Buchst. c, abgerufen 23.10.2026; Handbuch EN Z. 182.
- **Korrektur:** D6 A1 Rat ergänzen: EN „If the customer passes on point 11.6.2(c) of the Implementing Regulation (periodic password change), agree that a password manager with long unique passwords and multi-factor authentication replaces it, or accept a yearly change for administrator accounts.“ DE „Gibt der Kunde Nr. 11.6.2 Buchst. c der Durchführungsverordnung weiter (regelmäßiger Passwortwechsel), vereinbaren, dass Passwort-Manager mit langen Einzelpasswörtern und Multi-Faktor-Authentifizierung ihn ersetzen, oder einen jährlichen Wechsel für Administratorkonten zusagen.“ Im Handbuch-Verweis am Fuß von D2 die Quelle für 15 Zeichen nennen.

---

## C: Lesbarkeit, Optik, Stil

### 24. DE-Tabellen trennen Wörter mitten im Wort
- **Ort:** D2 DE S. 1 bis 3 („Geschäftsführ|ung“, „Administrationsk|onsole“, „Betreuungsver|trag“, „Werkstattrechne|r“), D6 DE S. 1 bis 2 („Cybersicherheitsanf|orderungen“, „Durchführungsver|ordnung“, „Auftragsverarbeitun|gsvertrag“), D5 DE S. 2 („Selbstausk|unft“), D4 DE S. 5; `site/public/site.css` Z. 387 `overflow-wrap: anywhere`.
- **Korrektur (Layout):** `overflow-wrap: break-word; hyphens: auto;` (html lang ist gesetzt), Spalte „Verantwortlich“ auf 20 %, Kopf „Selbstauskunft“ kürzen zu „Abschn.“; in D6 „DVO (EU) 2024/2690, Anh. 5.1.4 a“ und die Langform einmal im Fuß.

### 25. Fast leere Schlussseiten
- **Ort:** D1 DE S. 4 (nur Hinweis und Fuß), D2 EN und DE S. 4, D4 EN S. 5 (eine Zeile N/A), D5 EN und DE S. 3, D6 S. 2 (halbe Seite leer vor Teil B).
- **Korrektur (Layout):** Hinweis und Fuß mit `break-before: avoid` an den letzten Block binden; Fußnotentext volle Breite statt der schmalen Spalte (`.pg__note` ohne `max-width`).

### 26. Datumsformate gemischt
- **Ort:** Kopf „23 October 2026“ / Fuß „Emergency card · 2026-10-23“ in allen PDFs; XLSX Daten als Text „2026-11-22“; `*.mjs` jeweils `footerRight: … ${today}`.
- **Korrektur:** Fuß mit `fmtDate(today, lang)`.

### 27. Gestrichelte Linie am Seitenanfang
- **Ort:** D5 S. 2, D6 S. 3 (EN und DE); `site.css` Z. 255 `.pg__break` mit `border-top: 1px dashed`.
- **Korrektur (Layout):** In `printCss()` `.pg__break { border: 0; margin: 0; }`.

### 28. D4 Spalte „Where“ wiederholt den Ordnerpfad in jeder Zeile
- **Ort:** D4 EN und DE S. 1 bis 2 (Zeilen sechs bis sieben Zeilen hoch); `evidence-list.mjs` Z. 57, 99.
- **Korrektur:** Spalte im PDF streichen (Ordner steht im Kopf) oder nur einen Dateinamen eintragen; Breite der Spalte „Evidence“ erhöhen.

### 29. D6 Tabellenschrift 7,9 pt
- **Ort:** `clause-checklist.mjs` Z. 130 (10,5 px). 
- **Korrektur:** 12 px und Querformat für Teil A, oder Spalte „Source“ verkürzen (siehe 24).

### 30. EN-Brief: Kleinschreibung nach der Anrede, holprige Sätze
- **Ort:** D5 EN S. 1; `cover-letter.mjs` Z. 15 bis 19, 21, 24.
- **Zitat:** „Dear Sir or Madam, / thank you for …“; „Incidents that may affect you we report within 24 hours …; the report comes from Owner or managing director (mobile phone …)“; „We deliver services on site or in our workshop, with some customer data“.
- **Korrektur:** EN Großschreibung nach der Anrede („Thank you for …“, „Attached to our application …“). „We report incidents that may affect you {how}; the report comes from {who}.“ „We provide services on site or in our workshop and handle some customer data (contacts, plans, orders).“ DE: „Wir erbringen Leistungen vor Ort oder in unserer Werkstatt und verarbeiten dabei einige Kundendaten (Kontakte, Pläne, Aufträge).“; „die Meldung kommt von {who}“ mit Namen statt Rolle (Befund 8) löst „von Inhaber oder Geschäftsführung“.

### 31. D6 DE: „liest … eine Rechtsberatung“
- **Ort:** D6 DE S. 1; `clause-checklist.mjs` Z. 56.
- **Korrektur:** „Einen Vertrag, auf den es ankommt, lassen Sie vor der Unterschrift anwaltlich prüfen.“

### 32. H2 DE „eine zweite Administratorin“
- **Ort:** D2 DE Maßnahme 15, D4 DE; `measures.mjs` Z. 92.
- **Korrektur:** „ein zweites Administratorkonto für eine zweite Person einrichten“ (EN analog „a second administrator account for a second person“).

### 33. Abschnitt D heißt im DE „Sicherung und Betrieb“
- **Ort:** D1, D2, D4, D7 DE; `self-declaration.mjs` Z. 36; `questions.json` Block D.
- **Befund:** „Betrieb“ ist im ganzen Toolkit das Unternehmen; EN sagt „continuity“.
- **Korrektur:** „Sicherung und Wiederanlauf“.

### 34. Österreichisch auch für deutsche Betriebe
- **Ort:** `policy.mjs` Z. 84 (`de-AT` fest: „Jänner“), Notfallkarte DE „Lade“, „Notfallnummer laut Betreuungsvertrag“.
- **Korrektur:** Gebietsschema nach A2: `de-DE` bei DE („Januar“, „Schublade“), `de-AT` bei AT.

### 35. XLSX: Daten als Text, keine Hilfen
- **Ort:** beide Maßnahmenplan- und Nachweislisten-XLSX; `xlsx.mjs` Z. 38 bis 63, `action-plan.mjs` Z. 105 bis 108, `evidence-list.mjs` Z. 124.
- **Befund:** Zieldatum, Fällig und Wiedervorlage sind Text („2026-11-22“, in Excel als String gelesen), „Done on“/„Shown on“ ohne Datumsprüfung, kein Autofilter, keine Spalte „overdue“, keine bedingte Formatierung, Druck hochformatig ohne Anpassung (Plan ist rund 210 Zeichen breit), Spalte „Priority“ mit 1 bis 3 statt „Wave“ wie im PDF. In der Nachweisliste zwei überlappende Auswahllisten (E4:E30 und E10:E30), harmlos, aber unsauber. Fixierung der Kopfzeile, Spaltenbreiten, gelbe Eingabespalten und Hinweiszeile sind gut.
- **Korrektur:** Daten als echte Datumswerte mit Format `dd.mm.yyyy`; Datumsprüfung in „Done on“ und „Shown on“; Autofilter auf die Kopfzeile; Spalte „Status“ mit Formel `=IF(I4<>"","done",IF(F4<TODAY(),"overdue","open"))` / `=WENN(I4<>"";"erledigt";WENN(F4<HEUTE();"überfällig";"offen"))` und roter Formatierung bei überfällig; Querformat, `fitToPage: true, fitToWidth: 1, fitToHeight: 0`; Spaltenkopf „Wave“ / „Welle“; Schleife in `xlsx.mjs` Z. 54 auf `lastRow` begrenzen.

### 36. DOCX: Titel ohne Überschriftenformat, Werkzeugmarke in der Kopfzeile
- **Ort:** alle DOCX; `blocks.mjs` Z. 111 (Titel als fetter Absatz), Z. 124 (Kopfzeile „Scutoria · …“).
- **Korrektur:** Titel mit „Title“ oder „Heading 1“ (Navigation, Barrierefreiheit); bei D1 und D5 die Kopfzeile mit dem Betrieb statt Scutoria.

### 37. Notfallkarte: Feldbezeichnung „Customers that may be affected“ passt nicht zum Wert
- **Ort:** Karte „Deadlines“; `emergency-card.mjs` Z. 23, 47, 91.
- **Korrektur:** EN „Inform customers who may be affected“, DE „Kunden informieren, die betroffen sein könnten“; dazu „list of customer contacts: [place]“ / „Liste der Kundenkontakte: [Ort]“ als gelbes Feld.

### 38. Notfallkarte: Hotline-Hinweis ergänzen, Verweis aufs Memo streichen, Stand aktualisieren
- **Ort:** `emergency-card.mjs` Z. 24, 28 bis 29, 48, 52 bis 53, 104.
- **Befund:** Laut WKO ist das Call-Center rund um die Uhr erreichbar, die IT-Security-Fachleute aber nur Montag bis Freitag 8 bis 18 Uhr; „see the NIS2 memo on scutoria.com“ hilft im Notfall nicht; „Numbers as of 19 October 2026“ ist am 23.10.2026 erneut bestätigt.
- **Quelle:** WKO, https://www.wko.at/it-sicherheit/cyber-security-hotline (Seitendatum 01.06.2026), abgerufen 23.10.2026.
- **Korrektur:** EN „… around the clock, free for members; IT security experts Mon to Fri 8:00 to 18:00“, DE „… rund um die Uhr, für Mitglieder kostenlos; IT-Security-Fachleute Mo bis Fr 8 bis 18 Uhr“. Memo-Verweis streichen. Stand „23 October 2026“ / „23. Oktober 2026“ und als Konstante mit Quellenprotokoll pflegen.

### 39. D5 Anlagen mit internen Kürzeln, „none“ in der Artikelspalte
- **Ort:** D5 S. 1 „Attachments: Security self-declaration (D1); Action plan (D2); Evidence list … (D4)“; Abgleich Spalte „Art. 21(2)“ „none“/„keiner“; `cover-letter.mjs` Z. 27, 35, 48, 70, 78, 91.
- **Korrektur:** EN „Attachment 1: Security self-declaration; Attachment 2: Action plan; Attachment 3: Evidence list“, DE „Anlage 1: …“. Statt „none“ / „keiner“: „not in Art. 21(2)“ / „nicht in Art. 21 Abs. 2“.

### 40. Kleinigkeiten
- D1: „every 12 months …“ klein, „Size: 10 to 49“ ohne „staff“/„Beschäftigte“, keine Zeile für Name und Funktion unter der Unterschrift (`self-declaration.mjs` Z. 26, 28, 51).
- D2: „Occasions“ als Semikolonkette mit Großbuchstaben nach dem Semikolon, besser Aufzählung (`action-plan.mjs` Z. 90).
- D4: „How it comes about: produced by the toolkit“ bei der fehlenden Notfallkarte; besser EN „Fill in the yellow fields, print, post, date.“ DE „Gelbe Felder ausfüllen, drucken, aushängen, datieren.“ (`evidence-list.mjs` Z. 64).
- Wellen: Code rechnet +60 und +150 Tage (21.01. und 21.04.), Handbuch und Hinweis zu I3 sagen „zwei und fünf Monate“ (22.01. und 22.04.); `self-declaration.mjs` Z. 63 auf `addMonths` umstellen.
- EN gerade Anführungszeichen ("partly") neben typografischen in DE.

---

## Was gut funktioniert

1. **Durchgängige Zahlen und Termine.** Zählungen, Wellen, Wiedervorlage und Maßnahmenzahl stimmen in D1, D2, D4, D5, D7 und in beiden Sprachen überein; EN und DE sind inhaltsgleich, und die ehrlichen Stufen mit Termin ziehen sich vom Fragebogen bis zum Brief („We prefer to name a gap with a date rather than answer yes where it is not true“).
2. **Österreichische Notfallkontakte und Rechtsstellen sind sauber.** WKO-Hotline 0800 888 133, CERT.at reports@cert.at und +43 1 5056416 78, Polizei 133 und 112, against-cybercrime@bmi.gv.at (ohne Anzeige, richtig so beschrieben), Datenschutzbehörde dsb@dsb.gv.at und +43 1 52 152-0 stimmen am 23.10.2026 mit den Originalen; die Fundstellen der DVO 2024/2690 Nr. 5.1.4 a bis h und 5.2 und die 9 plus 6 Inhalte nach Art. 30 Abs. 2 und 3 DORA sind vollständig und richtig zugeordnet, ebenso die Zuordnung der Fragen zu Art. 21 Abs. 2 a bis j im Abgleich.
3. **Gute Bausteine für die Praxis.** Die Nachweisseite D7 ist eine klare, einseitige Übersicht mit Dokumentnummer und Unterschrift; die Notfallkarte als PDF passt auf eine Seite und enthält die richtigen vier Handgriffe; die XLSX haben fixierte Kopfzeilen, sinnvolle Breiten, gelbe Eingabespalten und eine Wiedervorlage mit festem Termin; die DOCX haben Seitenzahlen und sind sauber editierbar.
