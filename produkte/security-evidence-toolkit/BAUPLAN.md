# Security Evidence Toolkit · Bauplan

Stand 19. Oktober 2026, Entwurf zur Freigabe. Englischer Produktname **Security Evidence Toolkit**, deutscher Name **Sicherheitsnachweis-Toolkit**. Produktlinie 2, Farbe `line-security`.

Rohmaterial: Lieferanten-Antwortkit (C4, 36 Seiten DE und EN, mit Beilagen: Fragenkatalog mit zwölf Themenfeldern und 48 Fragen, Selbstauskunft mit neun Abschnitten und 32 Feldern, Nachweisliste mit dreizehn Nachweisen, Antwortschreiben, Klausel-Prüfliste mit 23 Klauseln, Blatt „Vorher aufschreiben“ mit sieben Punkten), „Was Ihr Großkunde verlangen wird“ (A3, 51 Seiten) und „Sicher ohne IT-Abteilung“ (A5, 50 Seiten, mit dem Notfallabschnitt: erste Stunde, erster Tag, Notfallkarte, Meldewege in Österreich). Übernommen werden die drei ehrlichen Antwortstufen (haben wir, teilweise, noch nicht mit Termin, dazu nicht anwendbar mit Grund), die neun Abschnitte der Selbstauskunft, die sieben Vorher-Punkte als Pflichtfragen und die Notfallkarte. Neu sind der Generator, der Maßnahmenplan in drei Wellen, die Nachweisseite und die Verbindung zu den freien Memos (NIS2-Betroffenheit, Anmeldesicherheit). Die Quellen des alten Kits wurden im September 2026 ausdrücklich „unter erschwerten Bedingungen“ aus nichtamtlichen Kopien gelesen; für das Toolkit wird jede Quelle neu am Original gelesen (Abschnitt 5).

## 1. Versprechen

Ein Betrieb ohne IT-Abteilung beantwortet in rund vierzig Minuten vierzig Fragen, jede mit einer von vier ehrlichen Antworten: vorhanden, teilweise, noch nicht mit Termin, nicht anwendbar mit Grund. Danach hält er sieben datierte Dokumente in der Hand: die Selbstauskunft, die jedem Fragebogen beiliegt, den Maßnahmenplan, der aus jedem „noch nicht“ einen Termin macht, die Notfallkarte für die Wand, die Nachweisliste, das Antwortschreiben an den Kunden, die Klausel-Prüfliste für den Vertrag und die Nachweisseite. Dazu ein Handbuch, das jede Frage mit der Quelle begründet, aus der sie stammt, und ein Konto, in dem alles liegt und zwölf Monate lang nachgezogen wird.

Vier Dinge verspricht das Toolkit nie, und sie stehen in keinem Dokument: dass der Betrieb „alle Anforderungen“ einer Vorschrift erfüllt; dass seine Systeme „sicher“ sind; eine Frist, Prüfung oder Haftung, die er nicht halten kann; ein Ja, das bei der ersten Nachfrage zerfällt. Ein ehrliches „noch nicht, bis Ende des Quartals“ ist eine vollständige, brauchbare Antwort; das ist der Grundgedanke des alten Kits, und er bleibt.

Auslöser beim Kunden: „Unser Großkunde hat einen Sicherheitsfragebogen geschickt“, „der Versicherer fragt nach MFA und Backups“, „im Vertrag steht eine NIS2-Lieferantenklausel“, „wir sollen ein Gütesiegel vorlegen“. Die Memos auf der Website (NIS2, Anmeldung) enden mit dem Verweis auf dieses Toolkit.

## 2. Die sieben Dokumente

| Nr. | Dokument | Format | Entsteht aus | Vorbild | Stand |
|---|---|---|---|---|---|
| D1 | Selbstauskunft Informationssicherheit (security self-declaration): neun Abschnitte A bis I, Übersichtstabelle je Bereich (vorhanden, teilweise, noch nicht, nicht anwendbar), je Feld die Antwort mit Termin, Schlusssatz „beschreibt den Stand am … keine Zertifizierung“, Unterschrift der Leitung, Empfänger als offenes Feld je Kunde | PDF und DOCX | alle Blöcke | selbstauskunft.docx | gebaut 19.10. als HTML, PDF, DOCX |
| D2 | Maßnahmenplan (action plan): jedes „teilweise“ und „noch nicht“ als Maßnahme mit Priorität 1 bis 3, Verantwortlichen (technische Maßnahmen gemeinsam mit der IT-Betreuung), Zieldatum in drei Wellen (I3, plus zwei Monate, plus fünf Monate), Nachweis, der danach vorliegt; Blatt Wiedervorlage mit vier Anlässen und festem Termin | XLSX sowie PDF und DOCX | Statusfragen mit `prio`, A4, A5, I2, I3, I4; Maßnahmentexte in `measures.mjs` | inkraftsetzung.xlsx (Toolkit 1), nachweisliste.xlsx | gebaut 19.10. |
| D3 | Notfallkarte (emergency card): eine Seite für die Wand und die Lade: die vier Handgriffe der ersten Stunde (trennen, nicht löschen, anrufen, aufschreiben), kein Lösegeld ohne Rücksprache; die Person und ihre Vertretung; der IT-Dienstleister; Hotline, Computer-Notfallteam, Polizei, Datenschutzbehörde mit 72-Stunden-Frist, Versicherer, Bank und Anbieter als gelbe Felder; Meldefrist an Kunden, Personenbezug, NIS2-Hinweis; wo Sicherung, Wiederherstellungscodes und Kontenliste liegen; danach: Passwörter und zweiter Faktor. Kontakte je Land (Österreich, Deutschland, andere EU-Länder) am Original gelesen, Protokoll `quellen.md` | PDF, DOCX, Vorschau | A2, A4, A5, B2, D1, D3, F1, A8 | A5 Abschnitt 10.5, BSI IT-Notfallkarte, BSI Top 12 | gebaut 19.10. |
| D4 | Nachweisliste (evidence list): je Frage der Nachweis, den Kunden und Versicherer annehmen (Kontenliste, Bildschirmfoto der MFA-Einstellung, Protokoll des Wiederherstellungstests, Teilnehmerliste, Dienstleisterliste, Vertrag, Police), ob er vorliegt, wo er liegt, Anlagennummer | XLSX | alle Statusfragen, A8 | nachweisliste.xlsx | gebaut 19.10. (`evidence-list.mjs`: Anlagennummern für Vorhandenes, Termin und „so entsteht er“ für Fehlendes; Seite und XLSX) |
| D5 | Antwortschreiben und Fragebogen-Abgleich (cover letter and mapping): der Begleitbrief an den Kunden, der die Lücken mit Terminen nennt; die Tabelle, die die typischen Fragen eines Fragebogens (zwölf Themenfelder des alten Katalogs) und die zehn Bereiche des Art. 21 Abs. 2 NIS2 den Abschnitten der Selbstauskunft zuordnet | DOCX | A6, A7, Statusfragen | antwortschreiben.docx, fragenkatalog.xlsx | gebaut 19.10. (`cover-letter.mjs`: Brief je Anlass aus A6, Zählung der Punkte, Fristen, Anlagen; Abgleich von achtzehn typischen Fragen mit Abschnitt, Art. 21 Abs. 2 und Kurzantwort) |
| D6 | Klausel-Prüfliste (clause checklist): die Sicherheitsklauseln, die Kunden in Verträge schreiben (Meldefrist, Prüfrechte, Unterauftragnehmer, Rückgabe und Löschung, Beendigung, bei Finanzkunden die DORA-Inhalte), je Klausel was sie bedeutet, was ein kleiner Betrieb zusagen kann, was zu verhandeln ist; als Auslegung markiert, keine Rechtsberatung | DOCX | A6, A7, F1, H3, I1 | klausel-pruefliste.docx | gebaut 19.10. (`clause-checklist.mjs`: Teil A elf Klauseln, acht aus Durchführungsverordnung 2024/2690 Anhang 5.1.4, Verzeichniseintrag 5.2, DSGVO Art. 28 Abs. 3, Haftung ohne Rechtsgrundlage; Teil B fünfzehn aus DORA Art. 30 Abs. 2 und 3; je Klausel Herkunft, Bedeutung, Zusagen und Verhandeln, Lage aus den Antworten) |
| D7 | Nachweisseite (evidence summary): datiert, Dokumentnummer SE-JJJJ-NNNN, je Bereich der Status, offene Punkte aufgeführt, Unterschriftszeile | PDF | alle Antworten | Bauteil EvidencePage (Toolkit 1) | gebaut 19.10. (`evidence-summary.mjs`, Dokumentnummer SE-JJJJ-NNNNNN) |

Dazu das Handbuch (Abschnitt 4) als PDF und im Konto, in beiden Sprachen.

Was der Generator nie abfragt: Passwörter, Zugangsdaten, IP-Adressen, Namen von Beschäftigten. Personen kommen als Rolle vor, Dienstleister als Firma. Vorfälle werden nur als Stufe erfasst (keine, ja behoben, unbekannt), ohne Hergang.

## 3. Der Fragebogen

Vierzig Fragen in neun Blöcken, eine Frage je Schritt, „Frage 12 von 40“. Die Blöcke folgen den neun Abschnitten der Selbstauskunft, damit jede Antwort ohne Umweg ein Feld füllt. Die Statusfragen tragen eine Priorität (`prio` 1 bis 3), die der Maßnahmenplan in Wellen übersetzt. Vorbelegt ist derselbe Beispielbetrieb wie in Toolkit 1 (Muster Elektrotechnik e.U., Österreich, zehn bis neunundvierzig Beschäftigte), mit einem realistischen Mischbild: MFA bei E-Mail ja, bei der Cloud-Konsole nicht; Sicherung täglich, aber keine Kopie außer Reichweite; nie geprobte Wiederherstellung; kein Notfallplan; ein alter Werkstattrechner.

Gebaut am 19. Oktober 2026 als `site/content/toolkits/security-evidence/questions.json`, lokal unter `/toolkits/security-evidence` und `/de/toolkits/sicherheitsnachweis`.

### Block A · Der Betrieb und die Anfrage (8 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| A1 | Name des Betriebs | Text | alle Köpfe |
| A2 | Land: Österreich, Deutschland, anderes EU-Land | Auswahl | Kontakte der Notfallkarte, Ländernotizen |
| A3 | Größe: 1, 2 bis 9, 10 bis 49, 50 bis 249, 250 und mehr | Auswahl | Abschnitt A der Selbstauskunft (Verhältnismäßigkeit nach Art. 21 Abs. 1 NIS2) |
| A4 | Verantwortlich für Informationssicherheit, Erreichbarkeit, Vertretung | Rolle mit Kontakt und Vertretung | Abschnitt A, Notfallkarte, Plan |
| A5 | IT-Betreuung: Dienstleister, selbst, beides (Name und Notfallerreichbarkeit) | Auswahl mit Text | Notfallkarte, Abschnitt A |
| A6 | Wer fragt: Kundenfragebogen, Vertrag mit Klauseln, Versicherungsantrag, Gütesiegel, niemand | Mehrfach | Antwortschreiben, Reihenfolge der Nachweise, Klausel-Prüfliste |
| A7 | Leistung und Zugriff: Waren, Leistungen mit Kundendaten, Software oder IT, Zugriff auf Kundensysteme | Auswahl mit Text | Abschnitt A, Umfang der Klausel-Prüfliste, Frage E4 |
| A8 | Wo der Nachweisordner liegt | Text | Nachweisliste, Notfallkarte |

### Block B · Organisation (3 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| B1 | Schriftliche Sicherheitsregeln für die Belegschaft | Status | 2 |
| B2 | Cyberversicherung: ja (Versicherer, Notfallnummer, Meldefrist), beantragt, nein | Auswahl mit Text | 3 |
| B3 | Zertifikate, Gütesiegel, Prüfungen: keine, ISO 27001, Cyber Trust Austria, TISAX, Sicherheitscheck, anderes | Mehrfach | Anlagen |

### Block C · Zugang und Identität (6 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| C1 | Ein Konto je Person, keine geteilten Logins | Status | 2 |
| C2 | MFA für jedes E-Mail-Konto | Status | 1 |
| C3 | MFA für Fernzugriff, Administration, Cloud-Konsolen, Banking | Status (mit nicht anwendbar) | 1 |
| C4 | Rechteentzug beim Ausscheiden anhand einer Kontenliste | Status | 2 |
| C5 | Tägliche Arbeit ohne Administratorrechte | Status | 2 |
| C6 | Passwortregel: Manager, Länge, Wechsel nur bei Verdacht | Status | 2 |

### Block D · Sicherung und Betrieb (4 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| D1 | Sicherung täglich, automatisch, eine Kopie außer Reichweite | Status mit Text | 1 |
| D2 | Wiederherstellung in den letzten zwölf Monaten geprobt, Dauer notiert | Status mit Text | 1 |
| D3 | Überbrückbare Wiederanlaufzeit: Stunden, ein Tag, Tage, eine Woche | Auswahl | Abschnitt D |
| D4 | Schriftlicher Notfallplan | Status | 1 |

### Block E · Updates und Geräte (5 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| E1 | Updates automatisch innerhalb von Tagen auf allen Geräten | Status | 1 |
| E2 | Geräteliste, nur unterstützte Geräte und Programme | Status mit Text | 2 |
| E3 | Schutzsoftware aktiv, Notebooks und Telefone verschlüsselt | Status mit Text | 1 |
| E4 | Schwachstellenkontakt und Unterstützungszeitraum eigener Produkte (nur Software- und Gerätelieferanten) | Status mit nicht anwendbar | 3 |
| E5 | Router oder Firewall aktuell, Administratorpasswort geändert, Fernadministration aus, Gastnetz getrennt | Status mit Text | 2 |

### Block F · Vorfälle und Meldung (4 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| F1 | Meldefrist an den Kunden: 24 Stunden telefonisch durch die Leitung, 48, 72 Stunden, nächster Werktag | Auswahl | Abschnitt F, Notfallkarte, Klausel-Prüfliste |
| F2 | Wer prüft Personenbezug und meldet binnen 72 Stunden an die Datenschutzbehörde | Status | 1 |
| F3 | Vorfälle der letzten 24 Monate: keine, ja behoben und dokumentiert, unbekannt | Auswahl mit Text | Abschnitt F |
| F4 | Vorfallsprotokoll | Status | 2 |

### Block G · Personal und Schulung (3 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| G1 | Einweisung in den letzten zwölf Monaten mit Teilnehmerliste | Status mit Text | 2 |
| G2 | Vertraulichkeit schriftlich | Status | 3 |
| G3 | Rückrufregel für Zahlungen und Bankdatenänderungen | Status | 1 |

### Block H · Eigene Lieferanten und Cloud (3 Fragen)

| Nr. | Frage | Typ | Prio |
|---|---|---|---|
| H1 | Dienstleisterliste mit Land und Zweck | Status | 2 |
| H2 | Auftragsverarbeitungsverträge und Sicherheitseinstellungen der Anbieter | Status | 2 |
| H3 | Kunde vor Dienstleisterwechsel informiert | Status mit nicht anwendbar | 3 |

### Block I · Nachweise, Termine und Wiedervorlage (4 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| I1 | Rückgabe oder Löschung der Kundendaten bei Vertragsende | Status (Prio 3) | Abschnitt I, Klausel-Prüfliste |
| I2 | Datum der Selbstauskunft (Vorbelegung: heute) | Datum | Kopf D1, D7 |
| I3 | Termin der ersten Maßnahmenwelle (Vorbelegung: in dreißig Tagen) | Datum | alle Termine in D1, D2, D7 |
| I4 | Überprüfung: sechs oder zwölf Monate | Auswahl | Abschnitt I, Wiedervorlage D2, Prüfdatum D7 |

Von den vierzig Fragen sind 24 Statusfragen (davon drei mit „nicht anwendbar“); sie liefern die Übersichtstabelle der Selbstauskunft, den Maßnahmenplan und die Nachweisseite. Die übrigen sechzehn sind Angaben zum Betrieb, zur Anfrage, zur Versicherung, zu Zertifikaten, zur Wiederanlaufzeit, zur Meldefrist, zu Vorfällen und zu den Terminen.

## 4. Das Handbuch

Sechzehn bis zwanzig Seiten auf Papier, Bauteil DocumentPage, mit den vier Markern und Quellenzeilen; englisch und deutsch mit gleichen Abschnittsnummern.

Gebaut am 19. Oktober 2026 (`site/content/toolkits/security-evidence/handbook.en.md`, `handbook.de.md`): neun Abschnitte 0 bis 8 wie unten, 49 Quellenzeilen, ein Unsicher-Kasten (Passwortwechsel: Durchführungsverordnung Nr. 11.6.2 Buchst. c gegen NIST und BSI), 23 offene Punkte (die sechzehn des alten Kits nachgeprüft, sieben neue), 38 Quellen. 33 Seiten englisch, 37 deutsch, also mehr als geplant, weil jede der 24 Statusfragen ihre eigene Quellenzeile mit Versicherer-, Label- und Verordnungsfundstellen trägt; ob gekürzt wird, entscheidet Stefan bei der Freigabe. Im Generator unter `/toolkits/security-evidence/handbook` und `/de/toolkits/sicherheitsnachweis/handbuch`, als PDF, im Zip, als Verweis aus jeder Frage.

0. So benutzen Sie das Toolkit: vierzig Minuten, sieben Dokumente, die vier Antworten, was es nicht ist.
1. Warum Sie gefragt werden: die Lieferkettenpflicht erfasster Kunden (Art. 21 Abs. 2 Buchst. d und Abs. 3 NIS2, Durchführungsverordnung 2024/2690 für digitale Anbieter, DORA für Finanzkunden), die Versicherer, die Gütesiegel; warum die Größe des Betriebs den Maßstab setzt (Art. 21 Abs. 1).
2. Die Bereiche der Selbstauskunft: je Abschnitt B bis I, was gefragt wird, warum, welche Quelle die Frage begründet (Art. 21 Abs. 2 NIS2, ENISA-Leitfaden mit zwölf Schritten, BSI CyberRisikoCheck nach DIN SPEC 27076, Cyber Trust Austria, VdS 10000, NIST SP 800-63B für Passwörter und MFA, CISA zur Rangfolge der Verfahren, DSGVO Art. 28 und 32 für Dienstleister), und was ein kleiner Betrieb realistisch vorlegen kann.
3. Nachweise: was ein Fragebogen als Beleg annimmt, wie jeder Nachweis in einer Stunde entsteht, die Anlagennummern, die Wiedervorlage.
4. Der Notfall: die erste Stunde und der erste Tag, die Meldefristen (DSGVO Art. 33 und 34: 72 Stunden an die Behörde, Benachrichtigung der Betroffenen; NIS2 Art. 23 Abs. 4 für erfasste Kunden: 24 Stunden, 72 Stunden, ein Monat; Police des Versicherers), Lösegeld, Dokumentation nach dem Vorfall.
5. Ländernotizen: Österreich (Bundesamt für Cybersicherheit, Cyber-Security-Hotline der Wirtschaftskammern, CERT.at, Bundeskriminalamt, Datenschutzbehörde, Cyber Trust Austria, Informationssicherheitshandbuch); Deutschland (BSI mit CyberRisikoCheck, IT-Notfallkarte und Allianz für Cyber-Sicherheit, Meldestelle, VdS 10000, Landesdatenschutzbehörden); andere Mitgliedstaaten als Lücke.
6. Offene Punkte: die Unsicherheiten des alten Kits (Abschnitt 9 von C4), nachgeprüft und datiert, dazu neue.
7. Glossar der Fragebogen-Begriffe (Asset-Inventar, RTO, MFA, Segmentierung, Auftragsverarbeitung, Unterauftragnehmer, Prüfrecht).
8. Quellen mit Abrufdatum.

## 5. Quellen und was vor dem Handbuch zu prüfen ist

Schon am Original gelesen, Abruf 19. Oktober 2026 (Protokoll `produkte/memos/QUELLEN.md`, weil die Memos dieselben Quellen brauchten): Richtlinie (EU) 2022/2555 Art. 2, 3, 20, 21, 23 Abs. 4, 26, 34, Anhänge I und II, englisch und deutsch; Empfehlung 2003/361/EG Anhang Art. 2, 3, 6; BSI-Gesetz §§ 28, 30, 32, 33; NISG 2026 §§ 3a, 24, 25, 26, 29, 32, 51 und die Seiten des Bundesamts für Cybersicherheit; DSGVO Art. 28 Abs. 1 und 3, Art. 32 Abs. 1; NIST SP 800-63B-4 Abschnitte 3.1.1.1, 3.1.1.2, 3.2.2, 4.2; BSI-Pressemitteilungen zu Passwörtern vom 31.1.2025 und 30.1.2026, BSI-Verbraucherseiten, IT-Grundschutz ORP.4 und ORP.2 (Edition 2023); CISA „Implementing Phishing-Resistant MFA“ (Oktober 2022); Microsoft-Zahlen zur MFA-Wirkung; ENISA-Leitfaden für KMU (Juni 2021, Schritt 5 und Fernzugriff) und ENISA-Bericht Juni 2021; onlinesicherheit.gv.at und WKO zu Passwörtern und MFA.

Vor dem Handbuch neu am Original zu lesen, in dieser Reihenfolge:

1. DSGVO Art. 33 und 34 (Meldung an die Behörde binnen 72 Stunden, Benachrichtigung der Betroffenen, Dokumentationspflicht Art. 33 Abs. 5), EUR-Lex konsolidiert.
2. Durchführungsverordnung (EU) 2024/2690 vom 17. Oktober 2024 mit Anhang: die Inhalte zur Lieferkette (Verzeichnis der Lieferanten, Kontaktstelle je Lieferant, Vertragsinhalte, Meldung von Vorfällen durch Lieferanten), auf die sich Kundenfragebögen und die Klausel-Prüfliste stützen. Das alte Kit kannte sie nur aus einer nichtamtlichen Kopie.
3. ENISA, Leitfaden „12 steps“ (vollständige Liste der zwölf Schritte aus dem PDF) und die technische Umsetzungsleitlinie zu Art. 21 Abs. 2 (2025), Titel, Datum, Gliederung.
4. BSI CyberRisikoCheck und DIN SPEC 27076: die sechs Themenbereiche und 27 Anforderungen, Zielgruppe, ob die DIN SPEC kostenfrei ist; BSI IT-Notfallkarte; BSI „Top 10 Ransomware-Maßnahmen“.
5. Cyber Trust Austria: Anforderungskatalog Standard und Gold, Fassung und Datum, wer das Label von Lieferanten verlangt; Österreichisches Informationssicherheitshandbuch (Herausgeber, Fassung).
6. VdS 10000 (Versicherer-Standard für KMU): Fassung, Gliederung, Verhältnis zur Cyberversicherung.
7. Zwei oder drei öffentliche Cyber-Risikofragebögen von Versicherern oder Maklern im deutschsprachigen Raum als Nebenquelle: welche Fragen sie wörtlich stellen.
8. SIG Lite und VDA ISA/TISAX als Beispiele für Kundenfragebögen (Herausgeber, Fassung, ob öffentlich); ISO/IEC 27001:2022 Anhang A (vier Themen, 93 Maßnahmen; die Norm selbst kostenpflichtig).
9. DORA (Verordnung (EU) 2022/2554) Art. 28 und 30 für die Vertragsinhalte mit Finanzkunden (Teil C der Klausel-Prüfliste).
10. Österreich: Cyber-Security-Hotline der Wirtschaftskammern (Nummer vor dem Druck prüfen), CERT.at (Meldeweg), Bundeskriminalamt (Anzeige), Datenschutzbehörde (Meldeformular); Deutschland: BSI-Meldestelle, Zentrale Ansprechstellen Cybercrime der Polizei, Landesdatenschutzbehörden.

Der Rechercheauftrag zu den Punkten 3 bis 8 ist am 19. Oktober 2026 ausgewertet; die Befunde stehen im Quellenprotokoll `produkte/security-evidence-toolkit/quellen.md` (Abschnitt 2, Quellen S14 bis S24) mit der Fundstelle je Frage des Fragebogens. Keine Frage blieb ohne Quelle: B2 (Cyberversicherung) trägt „Versicherer fragen danach, keine Rechtsgrundlage“, G2 und G3 tragen den Marker Auslegung, weil kein Katalog sie im Wortlaut stellt. Punkte 1, 2, 9 und 10 sind ebenfalls gelesen (S1 bis S13); die Restliste steht in Abschnitt 3 des Protokolls.

## 6. Technischer Weg

- Fragebogen: `questions.json` mit beiden Sprachen, Typen, Optionen, Vorbelegungen, `prio` je Statusfrage; dieselbe Engine wie Toolkit 1 (eine Frage je Schritt, SQLite je Lauf, Zurück und Weiter). Der Generator kennt jetzt eine Registratur der Toolkits (`site/src/toolkit/registry.mjs`): Adresse, Dokumente, geplante Dokumente, ob Handbuch und Preis vorhanden sind. Toolkits ohne Preis zeigen statt der Produktseite eine Vorschauseite mit dem Generator (`site/src/pages/toolkit-preview.mjs`) und bleiben aus Sitemap und Shop.
- Dokumente: Blockmodell wie Toolkit 1 (`blocks.mjs`), D1 gebaut in `site/src/toolkit/documents/security/self-declaration.mjs` (Status je Feld, Zieldaten in drei Wellen aus I3, Übersichtstabelle); D2 und D4 als XLSX über `exceljs`, D3 als einseitige PDF-Karte (Variante der DocumentPage mit großem Satz), D5 und D6 als DOCX, D7 als PDF mit Dokumentnummer SE-JJJJ-NNNN.
- Konto, Kasse, Lizenz: wie Toolkit 1; Produkt-ID `security-evidence`; live braucht der Generator eine Lizenz, in der Vorschau läuft er frei. Nachweisordner im Konto zeigt Läufe beider Toolkits, sobald Toolkit 2 in der Produktliste steht.
- Preis: entschieden am 19. Oktober 2026 (E21, Memo `PREIS.md`): 199 Euro pro Jahr regulär, 99 Euro Gründerpreis für die ersten zehn Käufer je Toolkit, wie Toolkit 1; Bundle aus Toolkit 1 und 2 zu 299 Euro später als eigenes Produkt (E7). Konfiguration `PRICE_SECURITY_YEAR_CENTS`, `PRICE_SECURITY_PILOT_CENTS`, `PILOT_SEATS_SECURITY` mit Rückfall auf die allgemeinen Werte; Gründerplätze je Toolkit gezählt.
- Verbindung zu den Memos: das NIS2-Memo und das Anmelde-Memo verweisen auf die Warteliste; nach dem Verkaufsstart auf die Produktseite. Später: Antworten des Anmelde-Memos in Block C vorbelegen.
- Produktseite und Muster (gebaut 19. Oktober): `site/src/pages/product.mjs` bedient jetzt alle Toolkits der Registratur, die Texte von Toolkit 2 stehen in `product-security.mjs`; ohne freigegebenen Preis zeigt die Seite „Der Preis folgt“ mit der Warteliste statt der Kasse, bleibt noindex und außerhalb der Sitemap; Vorschaubilder `site/public/og/security-evidence-*.png`. Muster des Beispielbetriebs: alle sieben Dokumente als PDF, DOCX und XLSX in beiden Sprachen plus Handbuch-PDFs unter `produkte/security-evidence-toolkit/muster/` (32 Dateien, erzeugt mit `node data/samples.mjs security-evidence … pdf`), zehn PDFs öffentlich unter `site/public/samples/security-evidence/`.

## 7. Umfang der ersten Fassung

Enthalten: Fragebogen, die sieben Dokumente, Handbuch, Konto, Kasse, beide Sprachen.

Nicht enthalten, als Aktualisierung innerhalb der Lizenz geplant: Branchenzusätze (Software-Lieferanten mit Schwachstellenmeldung, Finanzkunden mit DORA-Teil C als eigenes Blatt), ein Fragebogen-Import (die Fragen des Kunden einfügen und automatisch zuordnen), die Erinnerung zur Wiedervorlage per E-Mail.

Entscheidungen, von Stefan am 19. Oktober 2026 wie empfohlen bestätigt (zusammen mit der Freigabe von Fragebogen und Selbstauskunft):

| Nr. | Frage | Entscheidung |
|---|---|---|
| T3 | Selbstauskunft entlang der neun Abschnitte des alten Kits, nicht entlang der zehn Bereiche des Art. 21 Abs. 2 NIS2? | Ja. Die neun Abschnitte folgen dem, was Fragebögen fragen; die Zuordnung zu den zehn Bereichen steht in D5, damit NIS2-Kunden ihr Vokabular wiederfinden. |
| T4 | Klausel-Prüfliste in der ersten Fassung, als Dokument mit Marker „Auslegung“ und ohne Rechtsberatung? | Ja. Der Vertrag kommt beim Kunden gleich nach dem Fragebogen; ohne Prüfliste fehlt die Hälfte des Anlasses. |
| T5 | Preis-Hypothese 249 Euro regulär, 149 Euro für zehn Gründerkäufer? | Festlegen erst am Tor Geld, nach dem Handbuch. Bis dahin „in Vorbereitung“ ohne Preis. |
| T6 | Notfallkarte zusätzlich als freies Werkzeug wie im alten Shop? | Nein. Die freien Werkzeuge sind die Memos und die zwei Mini-Tools; die Notfallkarte ist der sichtbarste Teil des Toolkits und bleibt darin. |

## 8. Reihenfolge der Arbeit bis 31. Dezember

1. Fragebogen und Generator-Vorschau mit dem Beispielbetrieb, dazu D1 als Vorschau, PDF und DOCX (gebaut 19. Oktober; von Stefan am 19. Oktober freigegeben).
2. D2 Maßnahmenplan und D3 Notfallkarte (gebaut 19. Oktober; Quellen der Karte in `quellen.md`; von Stefan am 19. Oktober freigegeben).
3. D4 Nachweisliste, D5 Antwortschreiben mit Abgleich, D6 Klausel-Prüfliste, D7 Nachweisseite; Zip (gebaut 19. Oktober; von Stefan am 19. Oktober freigegeben). Muster des Beispielbetriebs folgen mit der Produktseite.
4. Quellenprotokoll (S1 bis S32 und Fundstelle je Frage eingetragen am 19. Oktober) und Handbuch in beiden Sprachen, Satz im Seitensystem (gebaut 19. Oktober; von Stefan am 19. Oktober freigegeben, die Länge bleibt).
5. Produktseite (gebaut 19. Oktober, mit den Mustern des Beispielbetriebs; von Stefan am 19. Oktober freigegeben), Preis entschieden am 19. Oktober (E21 nach Memo `PREIS.md`: 199 € regulär, 99 € Gründerpreis für die ersten zehn Käufer, Bundle 299 € später), Toolkit 2 in der Produktliste mit Kasse, Startseite „Jetzt erhältlich“ für beide Toolkits, Memos auf die Produktseite umgeleitet (alles 19. Oktober).
6. Live-Gang am Tor Veröffentlichen; Bundle (E7, 299 €) nach dem ersten Verkaufsmonat als eigenes Produkt.
