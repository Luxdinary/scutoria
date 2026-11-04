# F01: Platzhalter in Impressum und AGB, Deutsch und Englisch

Stand 4.11.2026. Live-Stand sind die Dateien in `site/content/legal/` (byte-gleich mit Lovable `content/legal/`, Veröffentlichung 2a3a59ee vom 3.11.2026). Die vorbereiteten Volltexte liegen in `live/rechtstexte-2026-11/` (Fassung 2.11.2026, Varianten A Kleinunternehmer und B Regelbesteuerung). Die Unterschiede Live gegen Entwurf stehen als acht Diff-Dateien in `F01-diffs/`. Auf der Website ist nichts geändert: Rechtstexte gehen nur auf Stefans Wort live (Tor Recht).

## 1. Jeder Platzhalter im Live-Stand

| Datei | Zeile | Platzhalter | Was fehlt | Wer liefert es | Entwurf A/B |
|---|---|---|---|---|---|
| `impressum.de.md` | 23 | `[Bezeichnung laut GISA-Auszug]` | Wortlaut der Gewerbeberechtigung | Stefan: GISA-Auszug (E39) | bleibt Klammer `[Wortlaut laut GISA-Auszug]` |
| `impressum.de.md` | 24 | `[Stand prüfen]` hinter „Bezirkshauptmannschaft Waidhofen an der Thaya“ | Beleg | Claude, belegt (siehe 2.) | Klammer gestrichen |
| `impressum.de.md` | 25 | `[Fachgruppe laut GISA]` | Fachgruppe der Wirtschaftskammer NÖ | Stefan: GISA-Auszug oder WKO-Mitgliedsdaten | bleibt Klammer `Fachgruppe [laut GISA-Auszug]` |
| `impressum.de.md` | 30 | `[Umsatzsteuer-Identifikationsnummer, sobald erteilt]` oder `[Kleinunternehmer …]` | Variante A oder B, UID falls erteilt | Stefan: Antwort des Steuerberaters (S1 bis S5) | A: Kleinunternehmer-Satz, Restklammer `[UID-Nummer, falls erteilt: ATU…]`; B: `[ATU…]` |
| `impressum.de.md` | 34 | `[Stand prüfen]` hinter „Online-Streitbeilegung … 20. Juli 2025 eingestellt“ | Beleg | Claude, belegt (siehe 2.) | Klammer gestrichen, Quelle „Verordnung (EU) 2024/3228“ eingefügt |
| `impressum.de.md` | 4 | Status-Zeile „Hausnummer aus dem Stripe-Konto (Stand prüfen)“ | Bestätigung der Anschrift | erledigt: Stefan 3.11.2026 (E39: Kleinpoppen 18, 3902 Vitis) | Status-Zeile neu |
| `legal-notice.en.md` | 23, 24, 25, 30, 34 | dieselben fünf Klammern auf Englisch | wie oben | wie oben | wie oben |
| `agb.de.md` | 10 | kein Platzhalter, aber „Kleinpoppen, 3902 Vitis“ ohne Hausnummer | Hausnummer | erledigt (E39) | „Kleinpoppen 18“ |
| `agb.de.md` | 14 | kein Platzhalter, aber „PDF und DOCX“; die Produktseite nennt PDF, DOCX und XLSX | Abgleich mit `site/src/shop/products.mjs` | Claude | „PDF, DOCX und XLSX“ |
| `agb.de.md` | 20 | `[Beschriftung der Schaltfläche nach § 8 Abs. 2 FAGG, Stand prüfen]` | Prüfung, ob die Zahlungsschaltfläche der Stripe-Kasse § 8 Abs. 2 FAGG genügt | nicht ermittelbar ohne Anwalt; Stefan hat entschieden, ohne Anwalt zu starten (E39, R10) | Klammer und der Zusatz („Bezahlen“) gestrichen; die Schaltfläche beschriftet Stripe je nach Zahlungsart |
| `agb.de.md` | 20 | `[bei Abweichungen gilt die deutsche Fassung, Stand prüfen]` | Entscheidung | erledigt: E32 R5 (2.11.2026) | Satz ohne Klammer |
| `agb.de.md` | 24 | `[Die Preise verstehen sich inklusive Umsatzsteuer.]` oder `[Scutoria ist Kleinunternehmer …]`, `[das Reverse-Charge-Verfahren, Stand prüfen]` | Variante A oder B, Satz zu Unternehmern in anderen EU-Staaten | Stefan: Steuerantwort (S2, S3) | A: Kleinunternehmer-Satz, Restklammer `[Satz zu Unternehmern in anderen EU-Mitgliedstaaten …, Frage S3.]`; B: Reverse-Charge-Satz, Restklammer `[Wortlaut … bestätigen, Fragen S2 und S3.]` |
| `agb.de.md` | 40 | `[zwölf weitere Monate, Stand prüfen]` | Entscheidung und Umsetzung der Löschfrist | erledigt: E32 R3 und R4; Löschjob läuft (siehe F04) | „zwölf Monate im Konto abrufbar und werden danach gelöscht“ |
| `agb.de.md` | 62 (Entwurf) | `[Datum der Veröffentlichung]` | Datum | Claude beim Live-Gang | neu im Entwurf |
| `terms.en.md` | 10, 14, 20, 24, 40 | dieselben Stellen auf Englisch, dazu `[date of publication]` im Entwurf | wie oben | wie oben | wie oben |

Unverändert und schon in der Fassung vom 2.11.2026 live: `datenschutz.de.md`, `privacy.en.md`, `widerruf.de.md`, `withdrawal.en.md` (null Zeilen Unterschied zu den Entwürfen).

## 2. Belege für die zwei Klammern, die Claude auflösen kann

- Gewerbebehörde: Die Marktgemeinde Vitis liegt im politischen Bezirk Waidhofen an der Thaya (Land Niederösterreich, Gemeindeseite noe.gv.at/noe/Vitis.html, abgerufen 4.11.2026). Behörde erster Instanz nach der Gewerbeordnung ist die Bezirksverwaltungsbehörde (§ 333 GewO 1994, RIS ris.bka.gv.at/eli/bgbl/1994/194/P333/NOR40032668, abgerufen 4.11.2026; Stand prüfen: nur die Zusammenfassung der Suchtreffer gelesen, nicht die geltende Fassung im Volltext). Für Vitis ist das die Bezirkshauptmannschaft Waidhofen an der Thaya.
- Streitbeilegung: Verordnung (EU) 2024/3228 hebt die Verordnung (EU) Nr. 524/2013 mit Wirkung vom 20. Juli 2025 auf; die Plattform zur Online-Streitbeilegung wurde eingestellt, neue Beschwerden waren ab 20. März 2025 nicht mehr möglich (EUR-Lex eur-lex.europa.eu/eli/reg/2024/3228/oj/eng, abgerufen 4.11.2026). Der Satz in den Entwürfen stimmt.

Keine Rechtsberatung; die Texte bleiben Entwürfe bis zu Stefans Freigabe.

## 3. Was nach den Entwürfen noch fehlt (nur Stefan)

1. GISA-Auszug: Wortlaut der Gewerbeberechtigung und Fachgruppe der WKNÖ (Impressum DE/EN, Zeilen 23 und 25). Falls eine GISA-Zahl auf dem Auszug steht: mit angeben, sie kann ins Impressum.
2. Steuerantwort: Variante A oder B; UID, falls erteilt; der Satz zu Unternehmern in anderen EU-Mitgliedstaaten (Impressum Zeile 30, AGB § 4, Terms § 4). Danach auch die Einstellung von Stripe Tax und die Rechnungstexte prüfen (Tor Geld).
3. Fassungsdatum: setzt Claude beim Live-Gang.

Alles andere ist in den Entwürfen bereits aufgelöst.

## 4. Optionen für den Live-Gang

- Option 1 (Empfehlung): Warten, bis GISA-Auszug und Steuerantwort da sind, dann Variante A oder B vollständig in einer Lovable-Runde zusammen mit F02 (Zähler) und F04 (Lizenzsperre) einspielen und einmal veröffentlichen. Eine Runde, ein Tor Recht, ein Tor Veröffentlichen.
- Option 2: Zwischenfassung jetzt. Nur die bestätigten Punkte gehen live (Hausnummer in AGB und Terms § 1, XLSX in § 2, Sprachfassungs-Regel, Löschfrist zwölf Monate, Quellen bei Gewerbebehörde und Streitbeilegung, Rücktrittsfunktion in § 6); die GISA- und Steuer-Klammern bleiben sichtbar. Kostet eine eigene Runde (Schätzung 1 bis 3 Credits) und eine Veröffentlichung. Nutzen: die AGB nennen die vollständige Anschrift schon heute.
- Keine Option: Klammern pauschal streichen oder „Stand prüfen“ ohne Beleg entfernen.

## 5. Prüfung nach dem Live-Gang

- Keine eckige Klammer mehr in `site/content/legal/*.md` (bis auf die zwei, die auf GISA und Steuer warten, falls Option 2).
- Abruf von außen: `/de/impressum`, `/legal-notice`, `/de/agb`, `/terms` zeigen die neue Fassung mit Fassungsdatum; Prüfsummen der vier Dateien lokal und bei Lovable gleich.
- Zugangsmail nach dem Kauf nennt dieselbe Anschrift (Vorlage `live/rechtstexte-2026-11/zugangsmail-vertragsbestaetigung.md`).
