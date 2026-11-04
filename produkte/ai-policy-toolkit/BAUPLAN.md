# AI Policy Toolkit · Bauplan

Stand 18. Oktober 2026, Entwurf zur Freigabe. Englischer Produktname **AI Policy Toolkit**, deutscher Name **KI-Richtlinien-Toolkit**. Produktlinie 1, Farbe `line-policy`.

Rohmaterial: KI-Nachweis-Kit (C1, 26 Seiten DE und EN, mit Beilagen als DOCX und XLSX), Branchenkit C6 (Kanzlei, Steuerberatung, Ordination), Band 2 „KI-Richtlinien für die Belegschaft“ (nur über Verweise in C1 bekannt, Lieferdatei fehlt), Band 1 Teil II und III. Die neun Regelbereiche, die sechs Prüffragen je Tool, die neun Kennzeichnungspunkte, die fünfzehn Schritte der Inkraftsetzung und die vierzehn benannten Unsicherheiten werden übernommen; neu sind der Generator, die Nachweisseite und das Cockpit.

## 1. Versprechen

Ein Betrieb ohne IT-Abteilung beantwortet in rund dreißig Minuten etwa dreißig Fragen. Danach hält er sieben fertige, datierte Dokumente in der Hand, dazu ein Handbuch, das jede Entscheidung mit Quelle begründet, und ein Konto, in dem alles liegt und zwölf Monate lang nachgezogen wird. Das Toolkit behauptet nirgends, dass der Betrieb damit eine Vorschrift erfüllt; es belegt, was er geregelt hat, seit wann, für welche Tools und wer davon weiß.

Auslöser beim Kunden: „Unsere Leute nutzen ChatGPT, wir brauchen eine Regel“, „der Kunde oder die Kammer fragt nach unserer KI-Richtlinie“, „wir müssen Schulung nachweisen“.

## 2. Die sieben Dokumente

| Nr. | Dokument | Format | Entsteht aus | Vorbild |
|---|---|---|---|---|
| D1 | KI-Nutzungsrichtlinie (AI usage policy), neun Paragrafen, Kopf mit Geltungsbeginn, Fassung, Verantwortlich; Schluss mit Bekanntgabe, Wiedervorlage, Unterschrift | DOCX und PDF | Fragen A, B, C, D, E, F, G, I | nutzungsrichtlinie.docx |
| D2 | Die eine Seite zum Aushängen (poster): Zweifelsregel, was nie hinein darf, nur betrieblicher Zugang, was geprüft wird, Meldeweg, Ablageort | PDF und DOCX | aus D1 übernommen, nie neu entschieden | kurzfassung-aushang.docx |
| D3 | Tool-Register mit vorbefüllten Zeilen (Art, Bezeichnung, Zweck, Nutzerkreis, Kontoart, Freigabe „unklar“ oder „nein“ bei privat) und Freigabeformular je Tool mit vorbefülltem Kopf und den sieben Prüffragen | XLSX und DOCX | Fragen B, C, I4 | tool-register.xlsx, freigabeformular.docx |
| D4 | Schulungsnachweis: Teilnehmerliste je Zielgruppe mit den vorbefüllten Inhalten der Einweisung, Übersicht je Person (ohne Namen, der Betrieb trägt sie ein) | DOCX und XLSX | Fragen A, H | schulungsnachweis.docx und .xlsx |
| D5 | Kennzeichnungs-Checkliste nach Art. 50: Punkte 1 bis 3 vorbefüllt (Rolle, Inventar der Einsatzarten, Anbieternachweis je Tool aus dem Register), Punkte 4 bis 9 als Blätter je System oder Veröffentlichung; bei viermal nein der datierte Vermerk „derzeit kein Fall“ | DOCX | Fragen A6, B, G | kennzeichnungs-checkliste.docx |
| D6 | Plan der Inkraftsetzung: fünfzehn Schritte mit Verantwortlichen und Zieldaten, Blatt Wiedervorlage mit vier Anlässen und Termin | XLSX | Fragen A, H, I | inkraftsetzung.xlsx |
| D7 | Nachweisseite (evidence summary): Betrieb, Dokumentnummer, Erstellungsdatum, Prüfdatum, je Nachweis der Status Geregelt, Prüfung fällig oder Offen, Unterschriftszeile | PDF | alle Antworten und der Stand im Cockpit | neu, Bauteil EvidencePage |

Dazu das Handbuch (Abschnitt 4) als PDF und im Konto, in beiden Sprachen.

Was der Generator nie abfragt: Namen von Beschäftigten, Kundendaten, Zugangsdaten. Personen kommen als Rolle vor; Namen trägt der Betrieb selbst in die Dokumente ein. Tool-Namen sind erlaubt, weil im Register ein Datum danebensteht.

## 3. Der Fragebogen

Etwa dreißig Fragen in neun Blöcken, eine Frage je Schritt, Fortschrittsanzeige „Frage 12 von 31“. Antworttypen: Auswahl (OptionCard), Mehrfachauswahl, kurzer Text (Field), Datum. Jede Frage hat einen Hinweis in einer Zeile und einen Verweis auf den Handbuchabschnitt. Vorbelegungen sind markiert; wer durchklickt, bekommt den Beispielbetrieb aus dem Kit, nicht leere Felder.

### Block A · Der Betrieb (11 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| A1 | Name des Betriebs, wie er auf den Dokumenten stehen soll | Text | alle Köpfe |
| A2 | Land des Betriebs: Österreich, Deutschland, anderes EU-Land (welches) | Auswahl | Ländernotizen im Handbuch, Kammerhinweise, Schritt 5 des Plans |
| A3 | Größe: 1, 2 bis 9, 10 bis 49, 50 bis 249, 250 und mehr Beschäftigte | Auswahl | Wortwahl der Richtlinie, Zielgruppen der Einweisung |
| A4 | Wer ist für die Regelung verantwortlich: Inhaber oder Geschäftsführung, Büroleitung, andere Funktion (welche) | Auswahl mit Text | Kopf D1, Schritt 1 D6 |
| A5 | Wer führt das Tool-Register (Vorbelegung: wie A4) | Auswahl mit Text | § 1, D3 |
| A6 | Wer entscheidet über Kennzeichnung (Vorbelegung: wie A4) | Auswahl mit Text | § 7, D5 |
| A7 | An wen werden Vorfälle gemeldet, und wie ist die Person erreichbar | Auswahl mit Text | § 8, D2 |
| A8 | Wer wird im Zweifel gefragt (Vorbelegung: wie A7) | Auswahl mit Text | § 9, D2 |
| A9 | Wer gibt Schriftstücke frei, die den Betrieb verlassen, und wer vertritt | zwei Texte | § 6 |
| A10 | Gibt es eine Belegschaftsvertretung oder Datenschutzbeauftragte: keine, Betriebsrat, Datenschutzbeauftragte, beides | Auswahl | Schritt 5 D6, Ländernotiz |
| A11 | Wer arbeitet außer den Angestellten mit den Tools: niemand, freie Mitarbeit, überlassene Arbeitskräfte, beauftragte Dienstleister | Mehrfach | Geltung in D1, Personenkreis in D4 |

### Block B · Tools, die heute benutzt werden (5 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| B1 | Welche Arten von KI-Tools werden benutzt: Textassistent, Übersetzung, Bildgenerator, Transkription oder Besprechungsnotizen, Assistent in der Bürosoftware, Suche mit KI, sonstige, noch keine | Mehrfach | Zeilen in D3, Punkt 2 in D5 |
| B2 | Je gewählter Art: Bezeichnung und Anbieter (optional), Kontoart betrieblich, geteilt, privat, unbekannt | Text und Auswahl je Zeile | Zeilen in D3, Punkt 3 in D5 |
| B3 | Werden Tools auf privaten Telefonen oder über private Konten dienstlich benutzt: ja, nein, unbekannt | Auswahl | § 1, Zeilen „privat“ in D3 |
| B4 | Private Konten für dienstliche Aufgaben: nicht zulässig, zulässig nur für (welche Aufgaben) | Auswahl mit Text | § 1, D2 |
| B5 | Wer verwaltet die betrieblichen Konten | Text | Frage 6 je Tool in D3, Schritt 6 D6 |

### Block C · Zulässige Verwendungen (2 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| C1 | Wofür werden die Tools eingesetzt: Entwürfe für Angebote, Zusammenfassungen, Übersetzungen, Formulierungshilfe in der Korrespondenz, Besprechungsnotizen, Recherche und erste Entwürfe, Bilder und Grafiken, Programmcode, sonstiges (Text) | Mehrfach mit Text | § 2, Inhalte der Einweisung |
| C2 | Gibt es neben Entscheidungen über Personen weitere Verwendungen, die ausgeschlossen werden sollen (Text, oder keine) | Text | § 2 |

Fest in § 2, keine Frage: keine abschließenden Entscheidungen über Personen (Anhang III Nr. 4 der KI-Verordnung).

### Block D · Was nie hinein darf (1 Frage)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| D1 | Die fünf festen Datenarten werden gezeigt (Angaben zu Kunden, Beschäftigten, Bewerbern; Zugangsdaten und Schlüssel; Kalkulationen, Preise, Verträge, Kundenlisten; Gesundheitsangaben; vertrauliche Unterlagen Dritter). Welche weiteren gibt es im Betrieb: Kalkulationsblätter je Auftrag, Zutrittscodes, Akten und Fallunterlagen, Patientendaten, Rezepturen und Verfahren, Quellcode, Vertragsentwürfe, sonstige (Text) | Mehrfach mit Text | § 3, D2 |

Fest in § 3 und D2: die Zweifelsregel.

### Block E · Unvermeidbarer Personenbezug (1 Frage)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| E1 | Regel für Aufgaben mit Personenbezug: nie (Personenbezug kommt nicht in ein Tool); Platzhalter (Angaben werden nachher eingesetzt); nur in Tools, die im Register für personenbezogene Daten freigegeben sind; mit Beispiel aus dem Betrieb (Text) | Auswahl mit Text | § 4 |

### Block F · Prüfung vor Verwendung (1 Frage)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| F1 | Fest: Zahlen, Namen, Fristen, Fundstellen. Was im Betrieb zusätzlich immer geprüft wird: Normbezeichnungen, Artikelnummern, Preise, Rechtszitate, Fachbegriffe, technische Daten, sonstiges (Text) | Mehrfach mit Text | § 5, D2, Inhalte der Einweisung |

### Block G · Kennzeichnung, Bestand nach Art. 50 (4 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| G1 | Spricht ein KI-System direkt mit Kunden oder anderen Personen (Chat, Sprache, Avatar): ja, nein | Auswahl | Punkt 2 D5, Blatt 4 |
| G2 | Erzeugt oder verändert der Betrieb mit KI Bilder, Ton oder Video, die veröffentlicht werden: ja, nein | Auswahl | Punkt 2 D5, Blatt 5 |
| G3 | Veröffentlicht der Betrieb KI-erzeugten oder KI-veränderten Text: ja, nein; wenn ja: auch zu Themen von öffentlichem Interesse (Recht, Gesundheit, Sicherheit, Umwelt, Förderungen): ja, nein, unsicher | Auswahl | Punkt 2 D5, Blatt 6 |
| G4 | Emotionserkennung oder biometrische Kategorisierung: ja, nein | Auswahl | Punkt 2 D5; bei ja Hinweis auf Fachperson |

Viermal nein: D5 trägt „derzeit kein Fall“ mit Datum und Wiedervorlage ein.

### Block H · Einweisung (5 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| H1 | Wer führt die Einweisung durch | Text | D4 |
| H2 | Eine Einweisung für alle, oder getrennt nach Gruppen (welche, z. B. Büro, Montage, neu Eingetretene) | Auswahl mit Text | ein Blatt je Gruppe in D4, Inhalte je Gruppe |
| H3 | Geplanter Termin der Einweisung | Datum | Schritt 9 D6, Vorbelegung Geltungsbeginn I1 (vierzehn Tage danach) |
| H4 | Wiederholung: bei jedem neuen Tool und jährlich; halbjährlich; legt der Betrieb später fest | Auswahl | Spalte „nächste Einweisung“ in D4 |
| H5 | Aufbewahrung des Nachweises: drei Jahre, fünf Jahre, Dauer der Beschäftigung plus ein Jahr, anders (Text). Hinweis: kein belegtes Mindestmaß | Auswahl mit Text | Kopf in D4 |

### Block I · Inkraftsetzung und Wiedervorlage (4 Fragen)

| Nr. | Frage | Typ | Füllt |
|---|---|---|---|
| I1 | Geltungsbeginn der Richtlinie (Vorbelegung: nach der Einweisung) | Datum | Kopf D1, D2, Schritt 12 D6 |
| I2 | Wiedervorlage: sechs Monate, zwölf Monate; die vier Anlässe sind fest (neues oder geändertes Tool, geänderte Anbieterbedingungen, geänderte Rechtslage, abweichende Praxis) | Auswahl | Schluss D1, Blatt 2 D6, Prüfdatum D7 |
| I3 | Wo der Nachweisordner liegt (Pfad oder Ort) | Text | D2, Schritt 13 D6 |
| I4 | Maßstab für Freigaben (optional): ohne Auftragsverarbeitungsvertrag keine Freigabe für personenbezogene Daten; ohne Ausschluss des Trainings keine Freigabe; wird je Tool entschieden | Auswahl | Feld „Maßstab“ im Freigabeformular D3 |

## 4. Das Handbuch

Sechzehn bis zwanzig Seiten auf Papier, Bauteil DocumentPage, mit den vier Markern und Quellenzeilen; englisch und deutsch mit gleichen Abschnittsnummern.

0. So benutzen Sie das Toolkit: dreißig Minuten, sieben Dokumente, was es nicht ist.
1. Warum eine Richtlinie, und was sie nicht ist: keine ausdrückliche Pflicht in KI-Verordnung und Datenschutzrecht; Empfehlungen von Datenschutzkonferenz, BSI und Wirtschaftskammer; Geschäftsgeheimnis und angemessene Maßnahmen; die vier Angaben, die aus Text eine Regelung machen.
2. Die neun Regelbereiche: je Bereich was die Richtlinie sagt, warum, welche Entscheidung dahintersteht, mit Quelle.
3. Tools, Konten und die sieben Prüffragen: vier vertragliche Kriterien, Voreinstellungen und Kontoart, der fünfte Punkt als Einordnung, der Eintrag „unklar“.
4. Schulung: Art. 4 KI-Verordnung seit 2. Februar 2025, was die Kommission als Nachweis genügen lässt, Zielgruppen, Wiederholung und Aufbewahrung als Lücken.
5. Kennzeichnung: Art. 50 seit 2. August 2026 in drei Fällen für Betreiber, die neun Punkte, was nicht „veröffentlicht“ ist.
6. In Kraft setzen und pflegen: fünfzehn Schritte, vier Anlässe, der Termin.
7. Ländernotizen: Österreich (Muster der Wirtschaftskammer, zwei überholte Stellen, Kammern), Deutschland (Datenschutzkonferenz, BSI, Mitbestimmung), andere Mitgliedstaaten (was fehlt).
8. Offene Punkte: die vierzehn Unsicherheiten aus dem Kit, nachgeprüft und datiert.
9. Glossar.
10. Quellen.

Stand 19. Oktober 2026: gebaut als `site/content/toolkits/ai-policy/handbook.en.md` und `handbook.de.md` (23 bzw. 25 Seiten als PDF, Abschnitte 0 bis 10 wie oben, Abschnitt 8 mit siebzehn offenen Punkten). Das Quellenprotokoll steht in `quellen.md` neben diesem Bauplan.

## 5. Quellen und was vor dem Start zu prüfen ist

Das Kit stützt sich auf dreizehn Quellen mit Abrufdatum 8. und 14. September 2026. Vor der Veröffentlichung des Toolkits prüft Claude jede Quelle erneut am Original und trägt das neue Abrufdatum ein. Drei Stellen sind im Kit ausdrücklich nur aus Kopien oder Auszügen belegt und werden zuerst geprüft:

1. Wortlaut des Art. 50 und des Art. 3 Nr. 60 der Verordnung (EU) 2024/1689 am Amtsblatt (EUR-Lex, CELEX 32024R1689).
2. Verordnung (EU) 2026/1744 vom 8. Juli 2026 (Art. 50 Abs. 7, Art. 111 Abs. 4, Fristen in Art. 113) im Amtsblatt.
3. Leitlinien der Kommission zu Art. 50, C(2026) 5054 final, 20. Juli 2026, mit Randnummern.

Danach: konsolidierte Fassung der KI-Verordnung (Art. 4, Art. 26 Abs. 2, Art. 113, Anhang III Nr. 4), Fragen und Antworten der Kommission zur KI-Kompetenz, Orientierungshilfe der Datenschutzkonferenz vom 6. Mai 2024, BSI „Generative KI-Modelle“ Version 2.0 vom 17. Januar 2025 (M16), WKO KI-Guidelines für KMU 3. Auflage April 2026, DSGVO Art. 24 Abs. 1, Richtlinie (EU) 2016/943 Art. 2 Nr. 1. Für Deutschland kommen Entsprechungen zur WKO dazu (IHK, DIHK), soweit auffindbar; für andere Mitgliedstaaten wird nicht gesucht, sondern die Lücke benannt.

Band 2 selbst liegt nicht vor. Wo das Kit auf Band 2 verweist, übernimmt das Handbuch die Aussage nur, wenn sie an der Primärquelle nachgeprüft ist; sonst wird sie als Lücke geführt.

## 6. Technischer Weg

- Fragebogen: eine Definitionsdatei `fragen.json` mit Texten in beiden Sprachen, Typen, Optionen, Vorbelegungen und Zuordnung zu Dokumentfeldern. Der Server rendert je Schritt eine Seite mit den Bauteilen OptionCard und Field, speichert die Antworten je Lauf in SQLite und erlaubt Zurück und Weiter ohne Datenverlust.
- Dokumente: HTML-Vorlagen je Dokument im Seitensystem (DocumentPage, EvidencePage) und PDF daraus über einen eingebauten Chromium-Druck (Playwright im Docker-Image). DOCX über die Bibliothek `docx`, XLSX über `exceljs`. Alle Dateien als Einzeldownload und als Zip, mit Fassungszeile und Dokumentnummer AP-JJJJ-NNNN.
- Konto: Zugang per E-Mail-Link (kein Passwort), Lizenzstand, Nachweisordner mit allen erzeugten Fassungen, Hinweis „aktualisiert“, wenn Vorlage oder Handbuch sich geändert haben.
- Kasse: Stripe Checkout mit Zustimmung zum sofortigen Beginn und Verlust des Widerrufsrechts, Stripe Tax, UID-Abfrage, Kundenportal; Webhook legt Lizenz und Konto an. Pilotpreis 99 € für die ersten zehn Käufer, danach 199 € pro Jahr (Hypothese E10).
- Vorschau für Stefan: ein Vorschauzugang ohne Kauf, damit jeder Stand vor dem Live-Gang angesehen werden kann.

## 7. Umfang der ersten Fassung

Enthalten: Fragebogen, die sieben Dokumente, Handbuch, Konto, Kasse, beide Sprachen.

Nicht enthalten, als Aktualisierung innerhalb der Lizenz geplant: die Freigabeprüfung je Tool als interaktives Formular im Konto (in der ersten Fassung als vorbefülltes DOCX), die Branchenmodule Kanzlei, Steuerberatung und Ordination aus C6, die Erinnerung zur Wiedervorlage per E-Mail.

Zwei Entscheidungen für Stefan, beide mit Empfehlung:

| Nr. | Frage | Empfehlung |
|---|---|---|
| T1 | Erste Fassung ohne Branchenmodule? | Ja. Die Module kommen als Aktualisierung, sobald das Grundprodukt Käufer hat. |
| T2 | Freigabeprüfung je Tool in der ersten Fassung als Dokument statt als interaktives Formular? | Ja. Das Dokument ist dasselbe Verfahren; das Formular im Konto folgt mit Toolkit-Aktualisierung 1. |

## 8. Reihenfolge der Arbeit bis 15. November

1. Fragebogen als `fragen.json` und Generator-Oberfläche, mit dem Beispielbetrieb als Vorbelegung. Stefan klickt sich durch.
2. Dokument D1 und D2 aus den Antworten, als Vorschau im Browser und als PDF. Stefan liest.
3. D3 bis D6, danach D7 und der Nachweisordner im Konto.
4. Handbuch: Quellen prüfen, Text in beiden Sprachen, Satz im Seitensystem.
5. Kasse und Zugang, Vorschau-Deploy bei Render, Probekauf im Testmodus.
6. Produktseite, Startseite mit Warteliste auf Verkauf umgestellt, Live-Freigabe durch Stefan.
