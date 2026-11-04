# Bauplan E-Book-Verkauf

Stand 4. November 2026. Reine Planung, kein Code geändert, nichts an Lovable gesendet. Grundlage: E37 vom 3.11.2026 (jedes E-Book 29 Euro einmalig, Leseprobe nach E35, im Toolkit seiner Linie enthalten, auch die zwei Grundlagenbücher nur als Leseprobe, Bundle gestrichen), E34 (99 Euro pro Jahr je Toolkit), E35 (Vorschau aus vier Kapiteln je eine Seite), E32 R6 (Vertragsbestätigung in der Zugangsmail), E19 (alles über Stripe), E39 (Website live). Der Bau folgt nach deiner Freigabe in eigenen Lovable-Runden; Übertragen kostet Credits (Tor Geld), Veröffentlichen braucht dein zweites Wort (Tor Veröffentlichen), Rechtstexte dein Lesen (Tor Recht). Quellen mit Abrufdatum stehen in Abschnitt 12 als Q1 bis Q15; Rechtsaussagen sind Information auf Quellenbasis, keine Rechts- oder Steuerberatung, Unsicheres trägt „Stand prüfen“. Nachtrag vom 4.11.2026 nach dem Prüfauftrag vom 3.11. (Paket 3, Punkt 5, Q15): Zuordnung E-Book, Handbuch, Toolkit in 1.1, die Regeln (a) bis (e) in 1.2, ihre AGB-Sätze in Teil 5, die Entscheidungen D11 und D12. Entschieden am 4.11.2026: Stefan übernimmt alle Empfehlungen D1 bis D12 („Empfehlungen übernehmen“, E41); die AGB-Sätze bleiben Entwürfe bis zu seiner Freigabe vor dem Übertragen (Tor Recht).

## 0. Kurzfassung

- Die Kasse läuft heute schon im Zahlungsmodus von Stripe (Einmalzahlung mit Steuer, UID-Feld, Rechnung, AGB-Häkchen). Ein E-Book braucht deshalb keine zweite Kasse, sondern einen zweiten Produkttyp in der Produktliste, eine andere Zugriffsregel (Einmalkauf ohne Ablauf statt Jahreslizenz), eigene Texte in Mail und Vertragsbestätigung, eine Seite mit Leseprobe und Kaufknopf, die Lieferung als PDF im Konto und Ergänzungen in AGB und Widerruf.
- Aufwand: Maschine (Teile 1 bis 4) zusammen M, dazu je E-Book der Inhalt (nicht Teil dieses Plans; nach `produkte/PLANUNG-2026-11.md` 03 S, 04 M, 17 M, 16 M, 15 S). Lovable: eine Runde für Maschine plus E-Book 03 (geschätzt 9 bis 14 Credits), danach je E-Book 1 bis 2 Credits (Abschnitt 9).
- D1 bis D12 sind entschieden (4.11.2026, E41): alle Empfehlungen übernommen, die Spalte „Empfehlung“ in Abschnitt 10 ist damit die Entscheidung. Offen bleiben Frage S6 an den Steuerberater (D4 bis zur Antwort unverändert), deine Freigabe der Rechtstexte vor dem Übertragen und dein Wort zum Start des Baus (nach Toolkit 03 oder parallel).

## 1. Was feststeht und was offen ist

| Festgelegt (Quelle) | Offen (Entscheidung in Abschnitt 10) |
|---|---|
| 29 Euro einmalig je E-Book (E37) | Ob die zwei Handbücher 01 und 02 auch einzeln zu 29 Euro verkauft werden (D1) |
| Leseprobe: vier Kapitel, je eine Seite, nie mehr (E35, E37) | Ob das Methodenbuch 03 in jedem Toolkit enthalten ist (D2) |
| Im Toolkit seiner Linie enthalten (E37) | Die genaue Zuordnung E-Book zu Toolkit (D3) |
| Auch 03 und 27 nur als Leseprobe (E37, F3) | Stripe-Steuercode für E-Books, Frage an den Steuerberater (D4) |
| Bundle 299 Euro gestrichen (E37) | Zugriff nach Ablauf der Toolkit-Lizenz (D5), Umgang mit Fassungen (D6) |
| Versionspflege zwölf Monate (E37) | PDF auch als Mailanhang (D7), Fußzeile (D8), Wasserzeichen (D9), Reihenfolge der Runden (D10) |
| Widerruf bei digitalen Inhalten mit Zustimmung zum sofortigen Beginn (E37; Kasse heute schon so) | Doppelkauf und späterer Toolkit-Kauf, Regeln (a) und (d) in 1.2 (D11) |
| Erste fünf E-Books: 03, 04, 17, 16, 15 (PLANUNG Abschnitt 5) | Umfang der Leseprobe, Regel (e) in 1.2 (D12); die Zuordnung E-Book, Handbuch, Toolkit steht in 1.1 |

### 1.1 Zuordnung E-Book, Handbuch, Toolkit

Regel: Ein E-Book erklärt, ein Toolkit erzeugt; wo beides zu einem Thema gehört, ist das E-Book die Lesefassung des Handbuchs, nicht sein Ersatz (PLANUNG Abschnitt 4). Die Handbücher 01 und 02 tragen in der Planung die E-Book-Nummern 01 und 02; Handbuch und E-Book sind dort dieselbe Datei. Die Zuordnung steht je E-Book als Liste `includedIn` in `products.mjs`, nicht als Automatik über die Linie; jede Änderung ist eine Zeile im Dossier.

| Nr | E-Book | Lesefassung von | Linie | Enthalten in (heute) | Später (Pipeline) |
|---|---|---|---|---|---|
| 01 | Handbuch: KI-Regeln verstehen | ist das Handbuch von Toolkit 01 | KI | Toolkit 01 | einzeln nur bei D1 A |
| 02 | Handbuch: Nachweise verstehen | ist das Handbuch von Toolkit 02 | Sicherheit | Toolkit 02 | einzeln nur bei D1 A |
| 03 | Belegt. Datiert. Vorzeigbar. | Methodenbuch aus Abschnitt 0 beider Handbücher; Lesefassung keines einzelnen Handbuchs | Grundlagen | Toolkit 01 und 02 (D2) | jedes weitere Toolkit |
| 04 | Die KI-Verordnung für Betriebe ohne Jurist | Handbuch 01, Abschnitte 1, 4, 5 und 7, erweitert um Verbote, Hochrisiko und Kalender | KI | Toolkit 01 | 04, 05, 06, 07 |
| 15 | Die Datenpanne: 72 Stunden | Handbuch 02, Abschnitt „Der Notfall“; später das Handbuch von Toolkit 12 | Sicherheit, später DSGVO | Toolkit 02 | 12, 16 |
| 16 | NIS2 erklärt | Handbuch 02 („Warum Sie gefragt werden“, Lieferkette) und NIS2-Memo; später die Handbücher 14 und 15 | Sicherheit | Toolkit 02 | 14, 15 |
| 17 | Sicher ohne IT-Abteilung | Handbuch 02 (Bereiche der Selbstauskunft, Nachweise) | Sicherheit | Toolkit 02 | 17, 18, 21 |

Nachträglich erscheinende E-Books der Linie: Option A sofort in laufenden Lizenzen enthalten (die Liste wird beim Aufruf ausgewertet, kein Code nötig); Option B nur für Lizenzen, die nach dem Erscheinen gekauft wurden (Datumsvergleich je Lizenz). Empfehlung A (Teil von D3); der AGB-Satz steht in Teil 5.

### 1.2 Fünf Regeln (a) bis (e), je mit Optionen und Empfehlung

Keine der Empfehlungen baut eine neue Preispolitik ein; wo eine Option den Preis berührt, steht „Tor Geld“.

(a) Doppelkauf, E-Book zuerst, später das Toolkit der Linie, das es enthält:

- A Keine Anrechnung. Das Toolkit kostet 99 Euro; der Einzelkauf bleibt mit seinen Rechten bestehen (Zugriff ohne Ablauf, Fassungen zwölf Monate ab E-Book-Kauf). Für: eine Regel, kein Gutschein, kein Zählwerk, keine neue Preispolitik. Gegen: 128 Euro für etwas, das zu 99 Euro enthalten ist.
- B Anrechnung über einen Stripe-Gutschein: 29 Euro auf die erste Jahreslizenz des Toolkits seiner Linie, Code in der Zugangsmail des E-Books, Kasse mit `discounts`. Für: fair gegenüber Frühkäufern. Gegen: ein zweiter Preis (70 Euro für die erste Lizenz, Tor Geld), Weitergabe des Codes, Steuer auf den Rabatt, Aufwand M, eigener AGB-Satz.
- C Hinweis vor dem Kauf: Die E-Book-Seite nennt vor dem Kaufknopf „Im <Toolkit> enthalten, 99 Euro pro Jahr“; der Doppelkauf bleibt eine bewusste Wahl, angerechnet wird nichts.
- Empfehlung: A mit C (D11). B ist eine Preisentscheidung und steht dir offen; dieser Plan baut sie nicht ein.

(b) Updatezeitraum des E-Books (E37: zwölf Monate Versionspflege), und was danach gilt:

- A Der Zugriff bleibt, und der Käufer sieht weiterhin die jeweils aktuelle Fassung; die zwölf Monate sind die Zusage, alles danach ist freiwillig (D6 A).
- B Nach zwölf Monaten bleibt die letzte Fassung aus dem Zeitraum; alte Fassungen liegen als Archiv im Bündel (D6 B).
- C Nach zwölf Monaten wird eine neue Fassung als neuer Kauf angeboten. Das wäre eine neue Preispolitik (Tor Geld), nicht eingebaut.
- Gesetzlicher Boden unabhängig von der Wahl: § 7 Abs. 2 Z 1 VGG, Aktualisierungen für den Zeitraum, den der Verbraucher vernünftigerweise erwarten kann (Q5, Stand prüfen).
- Empfehlung A.

(c) Lizenzablauf des Toolkits, enthaltenes E-Book:

- A Lesbar bis zum Lizenzende; heruntergeladene Dateien bleiben beim Kunden (D5 A).
- B Zwölf weitere Monate lesbar, wie die erzeugten Dokumente nach AGB 8 (D5 B).
- C Dauerhaft lesbar, als wäre es gekauft. Gegen: aus der Jahreslizenz würde ein Dauerrecht, die Versionspflege wäre unklar, und die Lizenz wäre günstiger als die Einzelkäufe ihrer E-Books (Preispolitik, Tor Geld).
- Empfehlung A.

(d) Späterer Toolkit-Kauf nach einem E-Book-Kauf, und der umgekehrte Fall:

- Regel: Der Einzelkauf behält seine Rechte (Zugriff ohne Ablauf, Fassungen zwölf Monate ab E-Book-Kauf). Die Lizenz fügt das Toolkit hinzu, nicht das E-Book noch einmal; das Konto zeigt es als „gekauft“, nicht als „enthalten“; nach dem Lizenzende bleibt es. Angerechnet wird nach (a).
- Umgekehrt, Toolkit zuerst, dann Einzelkauf eines enthaltenen E-Books: Option A die Seite zeigt den Zugriff über die Lizenz und bietet den Einzelkauf leise an („damit das E-Book nach dem Lizenzende bleibt“); Option B die Kasse verweigert den Kauf, solange die Lizenz läuft.
- Empfehlung A (Teil von D11).

(e) Was die Leseprobe zeigt (E35, E37) und was nur gegen Kauf:

- Die Leseprobe zeigt: Titel, Untertitel, die Zeile zum Quellenstand („Quellen am … gelesen“), das Inhaltsverzeichnis mit „In der Leseprobe“ und „Im E-Book“, aus vier Kapiteln je eine Seite in ganzen Absätzen, je „Ende der Leseprobe aus Kapitel n“, den Kaufknopf und den Hinweis auf das Toolkit. Die vier Kapitel stehen im Vorspann der Datei (`sample`) und beantworten die Leserfrage, zum Beispiel für 04: Anbieter oder Betreiber, Artikel 4, Artikel 50, Kalender bis 2028. Nie ausgewählt: „Quellen“, „Glossar“, „Offene Punkte“.
- Nur gegen Kauf oder über eine Lizenz: alle übrigen Kapitel, die Kapitel „Offene Punkte“ und „Quellen“, die PDF-Datei, beide Sprachfassungen als Datei (die Leseprobe selbst gibt es auf der Seite in beiden Sprachen).
- Offen: Option A die Quellenliste bleibt im E-Book, sichtbar sind die Zeile zum Quellenstand und die Zahl der Quellen in der Faktenzeile (streng nach E35); Option B die Quellenliste ist in jeder Leseprobe ganz sichtbar (Vorschlag aus PLANUNG F3, von dir nicht entschieden).
- Empfehlung A (D12).

## 2. Der Bestand, auf dem gebaut wird

Gelesen am 4.11.2026 in `site/src/` (Spiegel von `src/legacy/` bei Lovable).

| Modul | Was es heute tut | Was sich für E-Books ändert |
|---|---|---|
| `shop/products.mjs` | `PRODUCTS` mit zwei Toolkits, je `months: 12`, Name, Beschreibung, Pfad; `priceFor` zählt Gründerplätze (seit E34 null) | Feld `type` (toolkit oder ebook), Linie, Nummer, Zuordnung; fünf E-Book-Einträge; Preis 29 Euro ohne Zählwerk |
| `shop/payments.mjs` | Stripe Checkout `mode: 'payment'`, Stripe Tax, UID-Abfrage, Rechnungsadresse Pflicht, Kunde immer anlegen, Rechnung erzeugen, AGB-Häkchen mit eigenem Text, Metadaten `product` und `lang` | Steuercode je Produkttyp; bestehenden Stripe-Kunden mitgeben; sonst gleich |
| `shop/fulfil.mjs` | Bezahlte Sitzung wird Kunde plus Lizenzzeile (`months` aus dem Produkt), Zugangsmail mit Vertragsabsatz und AGB-PDF | Mailvorlage und Vertragsabsatz je Typ; Lizenzzeile bleibt |
| `shop/session.mjs` | `isLicensed`: Vorschauadressen oder Lizenz mit `ends_at` in der Zukunft | Neue Regel `canReadEbook` (Abschnitt 5) |
| `shop/routes.mjs` | Konto (Lizenzen, Nachweisordner je Toolkit), Kaufroute je Produkt, Erfolgsseite, Test-Kasse, Webhook | Kontoblock „E-Books“; Schleifen über `PRODUCTS` nur noch für Toolkits; Erfolgstext je Typ |
| `shop/reminders.mjs`, `db.mjs` | Erinnerung vierzehn Tage vor `ends_at`; Tabelle `licences` mit `product`, `starts_at`, `ends_at`, `amount_cents`, `checkout_session_id` | E-Books aus der Erinnerung ausnehmen; keine neue Tabelle (Abschnitt 3) |
| `toolkit/handbook.mjs` | Markdown mit vier Markern, Quellenzeilen, Boxen; Vollfassung und fertiges PDF nur mit Lizenz; `handbookSampleArticle` baut die Leseprobe aus `SAMPLE_CHAPTERS` und `PAGE_COUNT` | Wird zum allgemeinen Buchmodul für Handbücher und E-Books; Kapitelwahl und Seitenzahl aus dem Vorspann der Datei |
| `pages/library.mjs` | Katalog: zwei Toolkits, eines in Vorbereitung, Themenleiste KI, Sicherheit, Praxis | Karten vom Typ `ebook` |
| `pages/seo.mjs`, `scripts/build-og.mjs`, `layout.mjs` | Sitemap aus `PRODUCTS` plus Handbuchpfade; OG-Bilder je Toolkit und Sprache, PNGs liegen in `public/og/`; Fußzeile nennt jedes Produkt einmal | E-Book-Seiten in die Sitemap, zehn OG-Bilder, Fußzeile (D8) |
| `mail.mjs`, `contract.mjs` | Vorlagen `login`, `welcome`, `reminder`; `contractParagraph` sagt „Jahreslizenz … gültig bis“ | Vorlage `ebook`, Vertragsabsatz für den Einmalkauf |
| `withdraw.mjs` | Formular „Vertrag widerrufen“ mit fester Liste der zwei Toolkits | Liste aus `PRODUCTS` |
| `runtime/files.mjs` | Bündelt `content/**` (Text) und `content/toolkits/*/handbook.*.pdf` (binär) in den Worker | Muster `content/ebooks/*/book.*.pdf` dazu |
| `content/legal/agb.de.md`, `widerruf.de.md` (und EN) | Jahreslizenz-Regeln; Widerruf mit Erlöschen bei digitalen Inhalten | Ergänzungen in Abschnitt 7 |

Befund: Die Toolkit-Kasse nutzt schon alles, was E37 verlangt (Zahlungsmodus, Stripe Tax, UID, Rechnung, Zustimmung); der eigentliche Unterschied ist die Lizenzlogik, und die steckt in fünf Dateien.

## 3. Teil 1: Produkttyp „ebook“ in Produktliste und Lizenztabelle

Aufwand S (acht Dateien, rund achtzig Zeilen, vier Tests).

- `PRODUCTS` bekommt je Eintrag `type` (`toolkit` oder `ebook`), `nr` (Nummer der Planung), `line` (`policy`, `security`, `foundations`) und bei E-Books `includedIn` (Liste der Toolkit-Kennungen, D3). Kennungen `ebook-03`, `ebook-04`, `ebook-15`, `ebook-16`, `ebook-17`; Pfade `/ebooks/<slug>` und `/de/ebooks/<slug>`:

| Nr | Kennung | Titel DE / EN (PLANUNG 4.1 bis 4.4) | Slug EN / DE | Linie | Enthalten in (Vorschlag D3) |
|---|---|---|---|---|---|
| 03 | `ebook-03` | Belegt. Datiert. Vorzeigbar. / Sourced. Dated. Ready to show. | `sourced-dated-ready-to-show` / `belegt-datiert-vorzeigbar` | foundations | beiden Toolkits (D2) |
| 04 | `ebook-04` | Die KI-Verordnung für Betriebe ohne Jurist / The AI Act for businesses without a lawyer | `ai-act-without-a-lawyer` / `ki-verordnung-ohne-jurist` | policy | `ai-policy` |
| 17 | `ebook-17` | Sicher ohne IT-Abteilung / No IT department | `no-it-department` / `sicher-ohne-it-abteilung` | security | `security-evidence` |
| 16 | `ebook-16` | NIS2 erklärt / NIS2 explained | `nis2-explained` / `nis2-erklaert` | security | `security-evidence` |
| 15 | `ebook-15` | Die Datenpanne: 72 Stunden / The data breach: 72 hours | `data-breach-72-hours` / `datenpanne-72-stunden` | security | `security-evidence` (bis Toolkit 12 besteht) |

- Preis: `config.shop.ebookPriceCents` mit Vorgabe 2900 (`PRICE_EBOOK_CENTS`, E37; E9 bleibt nur Herkunft des Betrags). `priceFor` liefert für E-Books `{ cents: 2900, pilot: false, seatsLeft: 0 }` ohne Datenbankzählung. Kein anderer Betrag wird genannt.
- Lizenztabelle: keine neue Tabelle, keine neue Spalte. Drei Wege standen zur Wahl: A dieselbe Tabelle `licences` mit `product = 'ebook-…'` und `ends_at` als Ende der Versionspflege (zwölf Monate), der Zugriff selbst läuft nicht ab; B neue Spalte `kind`; C eigene Tabelle `purchases`. Empfehlung A: keine Schemaänderung bei Lovable, Webhook und `fulfilCheckout` bleiben unverändert, `licenceBySession` schützt weiter vor Doppelanlage. Die Bedeutung von `ends_at` je Typ steht als Kommentar in `products.mjs`.
- `hasLicence` bleibt für Toolkits (Ablauf zählt). Neu `ownsProduct(customerId, product)` ohne Datumsprüfung für E-Books.
- Erinnerung: `sendReminders` überspringt Produkte vom Typ `ebook` (nichts verlängert sich). Der Filter liegt in `reminders.mjs`, nicht in der Datenbankabfrage, damit `licencesDueForReminder` unverändert bleibt.
- Schleifen über `Object.values(PRODUCTS)` in `shop/routes.mjs` (Nachweisordner je Produkt, Kaufrouten), `pages/seo.mjs` (Handbuchpfade) und `withdraw.mjs` (Vertragsliste) werden typbewusst: Nachweisordner und Handbuchpfade nur für Toolkits, Kaufrouten und Widerrufsliste für beide.
- Tests (lokal `node --test`, heute 39 Tests in sechs Dateien, Zählung 4.11.2026): Preis 29 Euro ohne Gründerstaffel; `ownsProduct` wahr trotz abgelaufenem `ends_at`; Erinnerung überspringt E-Books; Widerrufsformular nimmt `ebook-03` an.

## 4. Teil 2: Kasse (Stripe Checkout im Zahlungsmodus)

Aufwand S (fünf Dateien, vier Tests). Alles Folgende gilt für beide Produkttypen, Abweichungen sind markiert.

| Anforderung | Heute in `payments.mjs` | Für E-Books |
|---|---|---|
| Einmalzahlung | `mode: 'payment'` | unverändert |
| Stripe Tax | `automatic_tax.enabled` aus der Konfiguration, `tax_behavior` inklusive (E19, E21; Steuerberater offen S1 bis S5) | unverändert; dazu `product_data.tax_code` je Typ (D4). Stripe führt für digitale Bücher den Code `txcd_10302000` (heruntergeladen, ohne Abo, dauerhaftes Recht) und allgemein `txcd_10000000` (elektronisch erbrachte Dienstleistung) (Q9). Ob ein E-Book als elektronische Publikation dem ermäßigten Satz unterliegt (Österreich 10 Prozent nach § 10 Abs. 2 Z 9 UStG 1994, Q6; Deutschland 7 Prozent nach § 12 Abs. 2 Nr. 14 UStG, Q7; Stand prüfen), entscheidet der Steuerberater; bis zur Antwort bleibt der Code unverändert (Vorgabe aus den Stripe-Steuereinstellungen, nicht ermittelbar ohne Dashboard) |
| UID-Abfrage | `tax_id_collection.enabled: true`, nicht verpflichtend | unverändert (Q8: `required` bleibt `never`, Verbraucher haben keine UID) |
| Rechnung | `invoice_creation.enabled: true`; Stripe beschreibt das Feld als Rechnung für Einmalzahlungen (Q8); Abruf im Kundenportal „Rechnungen und Belege“ | unverändert; `invoice_data.description` nennt Titel und Fassung des E-Books |
| Zustimmung zu AGB und sofortigem Beginn | `consent_collection.terms_of_service: 'required'` (braucht die AGB-Adresse in den öffentlichen Stripe-Einstellungen, Q8) mit dem Text „Ich stimme den AGB zu und verlange, dass der Zugang zum digitalen Inhalt sofort beginnt. Ich weiß, dass ich dadurch mein Widerrufsrecht verliere.“ | unverändert. Der Text deckt § 18 Abs. 1 Z 11 lit. a und b FAGG (ausdrückliche Zustimmung zum Beginn vor Ablauf der Frist, Bestätigung der Kenntnisnahme, Q3); lit. c verlangt zusätzlich die Bestätigung nach § 7 Abs. 3 FAGG auf einem dauerhaften Datenträger, die „auch eine Bestätigung der Zustimmung und Kenntnisnahme“ enthalten muss (Q2). Das leistet die Zugangsmail (E32 R6), siehe Teil 3 |
| Vertragsbestätigung | `contractParagraph`: „Jahreslizenz … gültig bis … ohne automatische Verlängerung“ plus AGB-PDF als Anhang | neuer Absatz für den Einmalkauf (Wortlaut in Teil 3) |
| Beschriftung der Zahlungsschaltfläche | Stripe zeigt „Bezahlen“ / „Pay“ (`submit_type` Vorgabe `pay`); AGB 3 trägt dazu schon die Klammer „Stand prüfen“ | § 8 Abs. 2 FAGG verlangt „zahlungspflichtig bestellen“ oder eine gleichartige, eindeutige Formulierung (Fassung gültig ab 27.9.2026, Q4; Stand prüfen). Vorschlag für beide Typen: `custom_text.submit.message` mit „Mit „Bezahlen“ bestellen Sie zahlungspflichtig.“ direkt über der Schaltfläche; ändert keine Stripe-Einstellung, nur den Aufruf |
| Bestehende Kunden | `customer_creation: 'always'` mit `customer_email`; jeder Kauf legt einen neuen Stripe-Kunden an, `setStripeCustomer` überschreibt die Kennung im Konto; das Kundenportal zeigt dann nur die Rechnungen des letzten Kaufs | Wer schon eine Stripe-Kundenkennung hat, bekommt sie als `customer` mitgegeben, dazu `customer_update.address: 'auto'`, damit Stripe die in der Kasse eingegebene Rechnungsadresse speichert und für die Steuer verwendet (Q8a); sonst wie heute. Betrifft E-Books stärker, weil Mehrfachkäufe wahrscheinlicher sind |
| Metadaten | `product`, `lang`, `pilot` | `product` trägt die E-Book-Kennung; `fulfilCheckout` erkennt den Typ über `productById` |
| Erfolgsseite | „Danke. Ihre Lizenz ist aktiv.“ | je Typ: „Danke. Ihr E-Book liegt in Ihrem Konto.“ |
| Test-Kasse (nur Vorschau ohne Stripe-Schlüssel) | `testGateway` liefert dieselbe Sitzungsform | unverändert, dient den Tests |

Abbruch und Fehler: `cancel_url` zurück auf die E-Book-Seite mit `?m=cancel`; bei einem Stripe-Fehler `?m=unavailable` wie heute.

## 5. Teil 3: Lieferung als PDF im Konto, Zugriff für Toolkit-Käufer

Aufwand M (neues Buchmodul, Routen, Kontoblock, Zugriffsregel, Bauskript, sechs Tests).

- Ablage: `content/ebooks/<kennung>/book.de.md` und `book.en.md` (Markdown im Dialekt der Handbücher: Vorspann mit `title`, `subtitle`, `version`, `retrieved`, neu `pages` und `sample` mit den vier Kapitelnummern; vier Marker, Quellenzeilen, Boxen) und die fertigen `book.de.pdf`, `book.en.pdf`. Die PDFs entstehen lokal aus der Druckfassung wie die Handbuch-PDFs (Edge ohne Fenster, Skript neu `scripts/build-ebooks.mjs` nach dem Muster von `build-og.mjs`) und werden mitgeliefert; der Server rendert nichts.
- Bündelgröße: `runtime/files.mjs` nimmt `content/ebooks/*/book.*.pdf` als binäre Datei auf. Die vier Handbuch-PDFs wiegen 448 bis 500 KB (gemessen 4.11.2026); fünf E-Books in zwei Sprachen kommen auf etwa 5 MB, als Base64 im Bündel etwa ein Drittel mehr. Cloudflare erlaubt je Worker 64 MiB unkomprimiert (Q10, Stand 29.10.2026); eine eigene Grenze von Lovables Build ist nicht ermittelbar. Prüfpunkt je Runde: Lovable nennt die Bündelgröße im Bericht. Rückfallweg, falls die Grenze doch greift: privater Speicher bei Lovable Cloud mit signierten Adressen (eine Runde mehr, eine Speicherregel).
- Buchmodul: `toolkit/handbook.mjs` wird zu `book.mjs` verallgemeinert (Verzeichnis und Dateiname als Parameter; Kapitelwahl und Seitenzahl aus dem Vorspann statt aus `SAMPLE_CHAPTERS` und `PAGE_COUNT`). Handbuchseiten verhalten sich danach genau wie heute; das sichern die bestehenden Leseproben-Tests.
- Routen (neu `ebooks/routes.mjs`, EN und DE): `GET /ebooks/<slug>` die Seite (Teil 4); `GET /ebooks/<slug>/pdf` mit Zugriff die Datei (`Content-Disposition: attachment`, Dateiname `scutoria-ebook-03-de.pdf`, Kopf `X-Robots-Tag: noindex`), ohne Zugriff 303 auf die Seite; `POST /ebooks/<slug>/buy` die Kasse. Beide Sprachfassungen des PDFs stehen jedem Käufer offen.
- Zugriffsregel `canReadEbook(customer, ebook)` in `shop/session.mjs`: wahr bei Vorschauadresse, bei eigener E-Book-Zeile (ohne Datumsprüfung) oder bei laufender Toolkit-Lizenz aus `includedIn`. Nach Ablauf der Toolkit-Lizenz: Option A der Zugriff endet mit der Lizenz, heruntergeladene Dateien bleiben beim Kunden; Option B zwölf weitere Monate wie die erzeugten Dokumente (AGB 8). Empfehlung A (D5): einfach zu erklären, deckt sich mit „Generator und Aktualisierungen stehen dann nicht mehr zur Verfügung“.
- Fassungen: Option A jeder Käufer sieht immer die aktuelle Fassung; die zwölf Monate sind die Zusage, nicht die Grenze; Option B alte Fassungen archivieren und nach Ablauf die letzte Fassung des Zeitraums ausliefern. Empfehlung A (D6): kein Archiv im Bündel, ein Satz in AGB 8 und 9. Zum Vergleich die gesetzliche Aktualisierungspflicht: § 7 Abs. 2 Z 1 VGG verlangt bei einmaliger Bereitstellung Aktualisierungen für den Zeitraum, den der Verbraucher vernünftigerweise erwarten kann (Q5, Stand prüfen); zwölf Monate sind die vertragliche Konkretisierung, nicht ihre Obergrenze.
- Kontoblock „E-Books“ (in `accountPage`): je Zeile Titel, gekauft am, Fassung vom, neue Fassungen bis, Knöpfe „Lesen“, „PDF Deutsch“, „PDF English“; darunter die über ein Toolkit enthaltenen E-Books mit „enthalten im … bis <Lizenzende>“. Ist ein neues PDF jünger als der Kauf, steht „aktualisiert am <Fassung>“ daneben (wie `updated` im Nachweisordner).
- Zugangsmail (`templates.ebook`, DE und EN): Betreff „Ihr E-Book „<Titel>““; Text: Dank, Vertragsabsatz, Hinweis auf das AGB-PDF im Anhang, Anmeldelink sieben Tage, „Im Konto finden Sie das E-Book zum Lesen und als PDF in beiden Sprachen. Rechnung und Beleg: im Konto unter „Rechnungen und Belege“.“ Das PDF selbst nur im Konto (Option A, Empfehlung D7) oder zusätzlich als Anhang (Option B, etwa 0,5 MB je Mail).
- Vertragsabsatz für den Einmalkauf (DE; EN im selben Lauf): „Ihre Bestellung: E-Book „<Titel>“, gekauft am <Datum>, Preis <Betrag> Euro, einmalig, ohne Laufzeit; neue Fassungen für mindestens zwölf Monate, bis <Datum>. Es gelten unsere AGB: <Adresse>. In der Kasse haben Sie ausdrücklich verlangt, dass der Zugang zum digitalen Inhalt sofort beginnt, und bestätigt, dass Sie dadurch Ihr Rücktrittsrecht verlieren (§ 18 Abs. 1 Z 11 FAGG).“
- Toolkit-Käufer: Die Toolkit-Produktseite und der Nachweisordner nennen die enthaltenen E-Books mit Link („Enthalten: E-Book 04 …“). Neuer Text auf einer freigegebenen Seite, also deine Freigabe vor dem Übertragen.
- Löschfristen: Der tägliche Löschlauf (E32 R4) liegt bei Lovable außerhalb des Spiegels. Er darf E-Book-Zeilen nicht wie abgelaufene Lizenzen behandeln. Prüfpunkt in Runde A: Lovable zeigt die Regel und bestätigt die Ausnahme; die Datenschutzerklärung bekommt einen Satz (Teil 5).

## 6. Teil 4: E-Book-Seite, Bibliothek, Sitemap, OG-Bild

Aufwand M (neue Seite, Bibliothek, Fußzeile, Stil, Sitemap, OG-Skript, fünf Tests). Gestaltung nach E33 (Sapphire Cinema): dunkle Bühne, das Buch als helles Papier, Farben nur aus den Tokens, keine neuen Schriften, kein Skript von außen.

- Seite `pages/ebook.mjs`: Kicker „E-Book 03 · Wissen · <Thema>“, Titel, Leserfrage als Lead (aus der Planung), Faktenzeile (Seiten je Sprache, Deutsch und Englisch, PDF, Fassung vom, Quellen mit Abrufdatum), dann die Preisbox: „29 Euro, einmalig · Umsatzsteuer laut Kasse · neue Fassungen für mindestens zwölf Monate · enthalten im <Toolkit>“ mit dem Kaufknopf „E-Book kaufen“ und darunter der Satz „Zahlung über Stripe. Der Zugang beginnt sofort nach der Zahlung.“ wie bei den Toolkits. Dazu die Angaben nach § 4 Abs. 1 Z 17 und 18 FAGG (Funktionalität, Kompatibilität digitaler Leistungen, Q1): „PDF ohne Kopierschutz, lesbar mit gängigen PDF-Programmen, etwa 0,5 MB je Datei“. Darunter die Leseprobe als Papierbogen (Inhaltsverzeichnis mit „In der Leseprobe“ und „Im E-Book“, vier Kapitelauszüge, je „Ende der Leseprobe aus Kapitel n“, Knopf „E-Book kaufen“ und die Zeile „Im <Toolkit> enthalten, 99 Euro pro Jahr“). Mit Zugriff zeigt dieselbe Adresse den Volltext mit PDF-Knöpfen und ohne Kaufknopf; wer nur über eine Lizenz Zugriff hat, sieht stattdessen die leise Zeile „Einzeln kaufen, 29 Euro, damit das E-Book nach dem Lizenzende bleibt“ (Regel d, D11). Kein Siegel, keine Prozentzahl, kein Zählwerk.
- Bibliothek: Karten vom Typ `ebook` mit typografischem Cover (Variante der bestehenden `cine-cover`, Nummer, Titel, Reihe „E-Book“; kein neues 3D-Buch), Kicker „E-Book 03 · erhältlich · Praxis“, Fakten „n Seiten · PDF · Deutsch und Englisch“, Preis „29 Euro einmalig“, Knöpfe „Zum E-Book“ und „Leseprobe lesen“. Themenleiste wie heute (03 unter Praxis, 04 unter KI, 15 bis 17 unter Sicherheit); die Zählung der Einträge läuft mit. Der Text der Bibliothek in `cinema.mjs` bekommt die Wörter „E-Book“ und „einmalig“ in beiden Sprachen.
- Fußzeile (E36: jedes Produkt einmal): Option A die E-Books einzeln unter „Wissen“ (Nummer und Kurztitel), Option B eine Zeile „E-Books“ zur Bibliothek. Empfehlung A (D8), weil die Regel sonst für E-Books nicht gilt; bei mehr als acht E-Books neu entscheiden.
- Handbuchseiten: Falls D1 ja, bekommt die Leseprobe des Handbuchs neben „Zum Toolkit“ den Knopf „Handbuch als E-Book kaufen, 29 Euro“.
- Sitemap: `sitemapEntries` nimmt alle Produktpfade auf, Handbuchpfade nur für Toolkits; robots bleibt (die PDF-Route antwortet ohne Zugriff mit 303 und trägt `noindex`).
- OG-Bilder: `build-og.mjs` bekommt je E-Book und Sprache eine Karte (Kicker „E-Book 03 · PDF“, Titel, Leserfrage, Fußzeile „Quellenbasiert · Keine Rechtsberatung“), ohne Betrag wie seit E34; zehn PNGs zu je 36 bis 52 KB wie die bestehenden (gemessen 4.11.2026). Die E-Book-Seite übergibt `og.image`.
- Startseite und Studio: in dieser Runde unverändert. Das Feld `ebook` je Video in `studio.json` (PLANUNG Abschnitt 5) kommt, wenn das erste E-Book live ist.

## 7. Teil 5: Rechtstexte, Entwurf (Tor Recht, deine Freigabe vor dem Übertragen)

Aufwand S für den Entwurf; EN im selben Lauf. Keine Rechtsberatung; die Klammern bleiben, bis du oder ein Anwalt sie schließt. Änderungen an freigegebenen Texten (E27) brauchen deine neue Freigabe; `legalReviewedAt` bleibt leer.

AGB (`agb.de.md`):

- Vorspann: `status: entwurf 2026-11-xx, E-Books als zweiter Produkttyp (E37)`.
- 2 Leistung, neuer zweiter Absatz: „Scutoria verkauft außerdem E-Books: digitale Bücher als PDF-Datei, einmalig bezahlt, ohne Laufzeit. Ein E-Book umfasst die Datei in beiden Sprachen (Deutsch und Englisch), das Lesen im Kundenkonto und neue Fassungen für mindestens zwölf Monate ab Kauf. Welche E-Books in einer Toolkit-Lizenz enthalten sind, steht auf der Produktseite des Toolkits; der Zugriff darauf gilt für die Dauer der Lizenz.“
- 3 Bestellung, erster Satz: „Mit „Jahreslizenz kaufen“ oder „E-Book kaufen“ gelangen Sie auf die Zahlungsseite von Stripe; …“ (Rest unverändert, Klammer zu § 8 Abs. 2 FAGG bleibt, dazu der Hinweistext über der Schaltfläche aus Teil 2).
- 5 Zugang und Lieferung, neuer Absatz: „E-Books stehen nach Zahlungseingang sofort im Kundenkonto zum Lesen und Herunterladen bereit; die Zugangsmail bestätigt den Vertrag und Ihre Zustimmung zum sofortigen Beginn. E-Books sind PDF-Dateien ohne Kopierschutz, lesbar mit gängigen PDF-Programmen, [etwa 0,5 MB je Datei, Stand prüfen nach dem Bau]. Mit der Bereitstellung im Konto gilt die Lieferung als erfolgt.“
- 6 Widerruf, Zusatz am Ende: „Das gilt für Jahreslizenzen und E-Books gleichermaßen.“
- 7 Nutzungsrecht, neuer Absatz: „Ein E-Book ist für den Käufer bestimmt; kauft ein Betrieb, dürfen seine Beschäftigten es lesen. Erlaubt sind Speichern, Ausdrucken und die Nutzung im eigenen Betrieb. Nicht erlaubt sind Weitergabe, Weiterverkauf, Veröffentlichung und das Entfernen von Quellen- und Herkunftsangaben.“
- 8 Laufzeit, neuer Absatz: „E-Books haben keine Laufzeit; der Zugriff im Konto bleibt bestehen, solange das Konto besteht. Neue Fassungen erhalten Sie für mindestens zwölf Monate ab Kauf; was Scutoria danach bereitstellt, ist freiwillig. E-Books aus einer Toolkit-Lizenz sind so lange im Konto abrufbar wie die Lizenz; heruntergeladene Dateien bleiben bei Ihnen.“ (bei D5 Option B: „… und zwölf weitere Monate“).
- 9 Aktualisierungen, Zusatz: „Bei E-Books ersetzt eine neue Fassung die bisherige im Konto; das Datum der Fassung steht auf der ersten Seite und im Konto. Gesetzliche Aktualisierungspflichten bleiben unberührt.“

Regeln (a) bis (e) aus 1.2 als AGB-Sätze (Entwurf nach den Empfehlungen; eckige Klammern zeigen die Alternative):

- Zuordnung (AGB 2): „Welche E-Books eine Toolkit-Lizenz enthält, steht auf der Produktseite des Toolkits. Erscheint während der Laufzeit ein weiteres E-Book der Linie, gehört es dazu. [Alternative: Es gilt der Stand zum Zeitpunkt des Kaufs.]“
- (a) und (d) (AGB 2): „Ein einzeln gekauftes E-Book bleibt ein Einzelkauf mit den Rechten aus Punkt 8, auch wenn Sie später ein Toolkit erwerben, das es enthält. Eine Anrechnung des Kaufpreises auf eine Lizenz findet nicht statt. [Alternative: Der Kaufpreis wird einmalig auf die erste Jahreslizenz des Toolkits seiner Linie angerechnet; den Gutschein erhalten Sie mit der Zugangsmail.] Haben Sie über eine Lizenz Zugriff auf ein E-Book, weist die Produktseite vor einem Einzelkauf darauf hin.“
- (b) (AGB 9, ersetzt den Zusatz oben): „Neue Fassungen eines E-Books erhalten Sie für mindestens zwölf Monate ab Kauf. Danach kann Scutoria weitere Fassungen bereitstellen; ein Anspruch darauf besteht nicht. Gesetzliche Aktualisierungspflichten bleiben unberührt.“
- (c) (AGB 8, ersetzt den letzten Satz des Absatzes oben): „E-Books aus einer Toolkit-Lizenz stehen im Konto zur Verfügung, solange die Lizenz läuft. [Alternative: … und zwölf weitere Monate.] Heruntergeladene Dateien bleiben bei Ihnen.“
- (e) (AGB 2): „Leseproben zeigen das Inhaltsverzeichnis und aus vier Kapiteln je eine Seite. Alle übrigen Kapitel, die Listen der Quellen und der offenen Punkte und die PDF-Datei erhalten Sie mit dem Kauf oder über eine Lizenz, die das E-Book enthält.“

Widerruf (`widerruf.de.md`): im Muster-Widerrufsformular „… Vertrag über den Kauf der folgenden Lizenz oder des folgenden E-Books: …“; der Absatz „Erlöschen des Widerrufsrechts bei digitalen Inhalten“ passt unverändert (vierzehn Tage ab Vertragsabschluss nach § 11 Abs. 1 und Abs. 2 Z 3 FAGG, Q3a). Das Formular „Vertrag widerrufen“ listet die E-Books automatisch (Teil 1).

Datenschutz (`datenschutz.de.md`, Abschnitt Kundenkonto und Kauf): ein Satz „Beim Kauf eines E-Books gilt dasselbe wie beim Kauf einer Lizenz; die Kaufdaten bleiben gespeichert, solange das Konto besteht, danach gelten die gesetzlichen Aufbewahrungsfristen für Rechnungsdaten.“ (E32 R3 nennt zwölf Monate nach Lizenzende; E-Books enden nicht.)

Produktseite (Pflichtangaben vor dem Kauf, § 4 Abs. 1 Z 8, 17, 18 FAGG, Q1): Widerrufshinweis mit Link, Format, Sprachen, Seitenzahl, Dateigröße, Fassung, Dauer der Fassungspflege; Preis als Endpreis für Verbraucher so wie bei den Toolkits („Umsatzsteuer laut Kasse“, Variante A oder B nach dem Steuerberater, E19).

## 8. Teil 6: Tests und Prüfpunkte

Lokal (`npm test`, neue Tests in `test/ebooks.test.mjs`, geschätzt zwanzig Fälle):

- Produkte: fünf E-Books im Katalog, Preis 29 Euro, `type` und `includedIn` gesetzt, Toolkits unverändert.
- Zugriff: Fremder nein; Käufer ja, auch nach `ends_at`; Toolkit-Lizenz laufend ja, abgelaufen nein (oder ja binnen zwölf Monaten bei D5 B); Vorschauadresse ja.
- Kasse: Testkauf eines E-Books legt Lizenzzeile mit `months: 12` an, sendet die Mail `ebook` mit dem Vertragsabsatz (Satz zur Zustimmung enthalten, kein „gültig bis“), AGB-PDF hängt an; Erfolgsseite mit dem E-Book-Text; doppelte Sitzung erzeugt keine zweite Zeile.
- Erinnerung: Lauf im Trockenmodus zählt E-Books nicht.
- Seiten: ohne Zugriff Leseprobe (Titel endet auf „Leseprobe“, vier `pg__sample-end`, kein PDF-Knopf, Kaufformular vorhanden); mit Zugriff Volltext, PDF 200 mit `attachment`, kein Kaufformular; PDF ohne Zugriff 303; beide Sprachen; `noindex` nur auf der PDF-Route; OG-Bild je Sprache verlinkt.
- Bibliothek: fünf Karten vom Typ `ebook`, Preis „29“, Themenfilter, Zählung; Fußzeile nennt jedes E-Book einmal (D8 A).
- Sitemap: zehn neue Adressen, keine Handbuchpfade für E-Books; robots unverändert.
- Widerruf: Formular zeigt sieben Verträge, Schema nimmt `ebook-15` an.
- Handbuch-Leseproben: die bestehenden Tests bleiben grün (Regression des Buchmoduls).

Bei Lovable (vitest `src/test/`, Stand 266 bestanden zu 1 rot am 3.11.2026): dieselben Fälle in Lovables Form, Axe-Audit auf `/ebooks/<slug>` und `/de/ebooks/<slug>` bei 1280 und 360 px, Bündelgröße im Bericht.

Nach der Veröffentlichung, von außen (wie bei E34/E35): Seiten 200 mit genau einer h1; PDF-Route 303; Sitemap mit den neuen Adressen; OG-Bild 200; `/health` unverändert; Kaufweg bis zur Stripe-Seite: Betrag 29,00 Euro, Häkchen mit dem Zustimmungstext, UID-Feld, Hinweistext über der Schaltfläche.

Probekauf (Tor Geld, dein Wort): ein E-Book zu 29 Euro mit deiner Karte, danach Erstattung im Stripe-Dashboard; geprüft werden Zugangsmail (Vertragsabsatz, AGB-PDF), Rechnung (Produktname, Steuer, UID-Zeile), Konto (E-Book-Zeile, beide PDFs), Webhook-Ereignis, Kundenportal mit allen Rechnungen desselben Kunden. Läuft zusammen mit dem offenen Probekauf zu 99 Euro (AUFGABEN.md, nach E39): danach zeigt das Konto das enthaltene E-Book unter der Toolkit-Lizenz.

## 9. Teil 7: Reihenfolge und Lovable-Runden

Übergabe byteweise wie am 3.11.2026 erprobt (Gedächtnisnotiz, UEBERGABE Abschnitt 5): je Datei Upload-Adresse und PUT, höchstens zehn Anhänge je Nachricht, sonst ein ZIP; Zielpfad und sha256 je Datei im Auftrag; „complete files, replace byte for byte, do not reformat, do not deploy“; Projektwissen vorher ergänzen (zweiter Produkttyp, Preis 29 Euro, Leseprobe). Abbildung `site/src/X` auf `src/legacy/X`, `site/content/X` auf `content/X`, `site/public/X` auf `public/X`. Vergleichswerte (Q11): zehn neue Dateien 1,0 Credit; zehn Ersetzungen mit Testanpassung und Axe 6,1; Runde E34/E35 mit 31 Dateien als ZIP 7,5; Folgerunde mit einer Datei 1,2; Live-Schalter 3,1. Kontostand nicht ermittelbar ohne Blick in den Editor.

| Schritt | Wer | Inhalt | Aufwand, Credits |
|---|---|---|---|
| 0 | Stefan | D1 bis D10 entscheiden | |
| 1 | Claude | E-Book 03 schreiben (DE und EN, Markdown im Handbuchdialekt, Quellen am Original), PDF bauen; Freigabe des Textes durch dich | Inhalt S (PLANUNG), eigene Sitzung |
| 2 | Claude | Teile 1 bis 4 lokal bauen, Rechtstexte nach Teil 5 einsetzen, `npm test` und `npm run preflight` grün, Commit | Maschine M |
| 3 | Stefan | Rechtstexte (Tor Recht) und die neuen Seitentexte lesen und freigeben | |
| 4 | Claude, auf dein Wort | Runde A an Lovable: rund 32 Dateien als ZIP (10 neue Module und Inhalte, 22 Ersetzungen samt vier Rechtstexten), Tests anpassen lassen, Axe, Bündelgröße und Löschlauf im Bericht; Vorschau prüfen (Desktop, Handy, DE und EN, Kaufweg bis Stripe) | 8 bis 12 Credits, plus Folgerunde 1 bis 2 |
| 5 | Stefan | Veröffentlichung freigeben (zweites Wort) | |
| 6 | Claude | Veröffentlichen, Prüfung von außen, STAND, AUFGABEN, Dossier, Commit, Drive-Log | |
| 7 | Stefan | Probekauf 29 Euro, Erstattung; Claude prüft (Abschnitt 8) | Tor Geld |
| 8 bis 11 | Claude je E-Book | 04, 17, 16, 15: je zwei Markdown-Dateien, zwei PDFs, zwei OG-Bilder, ein Eintrag in `products.mjs` (sieben Dateien); Freigabe des Textes, Übertragen, Veröffentlichen je auf dein Wort | Inhalt je M oder S; je 1 bis 2 Credits |

Summe Lovable für Maschine und fünf E-Books: geschätzt 13 bis 22 Credits. Reihenfolge-Option (D10): A Maschine und E-Book 03 in einer Runde, danach je E-Book eine kleine Runde (Empfehlung: ein echtes Produkt geht früh live, jede weitere Runde ist klein); B Maschine erst, wenn zwei E-Books fertig sind (spart eine Runde, verschiebt den ersten Verkauf).

## 10. Deine Entscheidungen

D1 bis D12, entschieden am 4.11.2026: Stefan übernimmt alle Empfehlungen (E41). Die Tabelle bleibt als Begründung stehen; die Spalte „Empfehlung“ ist die Entscheidung.

| Nr | Frage | Optionen | Empfehlung |
|---|---|---|---|
| D1 | Die Handbücher 01 und 02 auch einzeln als E-Book zu 29 Euro? | A ja, gleiche Regel, Kaufknopf auf der Handbuch-Leseprobe; B nein, nur mit Toolkit | A: „jedes E-Book 29 Euro“ (E37) gilt dann ohne Ausnahme, Seite und Leseprobe gibt es schon; Käufer bekommen nur das Buch, nicht den Generator |
| D2 | Methodenbuch 03 in jedem Toolkit enthalten? | A ja; B nur einzeln | A: es erklärt die Marker, die alle Produkte tragen; kostet nichts zusätzlich |
| D3 | Zuordnung E-Book zu Toolkit und nachträglich erscheinende E-Books der Linie | Tabellen in 1.1 und Abschnitt 3; Nachträgliche: A sofort in laufenden Lizenzen enthalten, B nur für Käufe nach dem Erscheinen | wie dort und A; 15 wandert zu Toolkit 12, sobald es besteht |
| D4 | Steuercode in Stripe Tax | A `txcd_10302000` (digitales Buch, ermäßigter Satz, wo er gilt); B `txcd_10000000` wie allgemeine digitale Leistung; C Vorgabe aus den Stripe-Einstellungen unverändert | C bis zur Antwort des Steuerberaters; Frage S6 an ihn: „Gilt für unsere E-Books der ermäßigte Satz für elektronische Publikationen, und welchen Stripe-Steuercode sollen wir setzen?“ |
| D5 | Zugriff auf enthaltene E-Books nach Ablauf der Toolkit-Lizenz (Regel c) | A endet mit der Lizenz; B zwölf weitere Monate; C dauerhaft wie gekauft | A; C wäre eine Preisentscheidung |
| D6 | Fassungen und Updatezeitraum (Regel b) | A immer die aktuelle Fassung, zwölf Monate als Zusage; B Archiv alter Fassungen; C neue Fassung nach zwölf Monaten als neuer Kauf | A; C wäre eine Preisentscheidung |
| D7 | PDF in der Zugangsmail | A nur im Konto; B auch als Anhang | A; B später möglich |
| D8 | Fußzeile | A jedes E-Book einzeln unter „Wissen“; B eine Zeile „E-Books“ | A bis acht E-Books |
| D9 | Wasserzeichen mit Käuferkennung im PDF | A nein, AGB 7 genügt vorerst; B ja, Fußzeile „Lizenziert für <E-Mail>“ je Download | A; B kostet Rechenzeit je Download auf dem Worker und eine Runde mehr |
| D10 | Reihenfolge | A Maschine plus 03, dann je E-Book; B erst mit zwei fertigen E-Books | A |
| D11 | Doppelkauf und späterer Toolkit-Kauf (Regeln a und d) | A keine Anrechnung, Hinweis „im Toolkit enthalten“ vor dem Kauf, Einzelkauf trotz Lizenz möglich mit Hinweis; B Anrechnung von 29 Euro per Gutschein auf die erste Jahreslizenz der Linie; C Einzelkauf bei laufender Lizenz gesperrt | A; B ist eine Preisentscheidung am Tor Geld und nicht eingebaut |
| D12 | Umfang der Leseprobe (Regel e) | A Quellenliste nur im E-Book, Zeile zum Quellenstand sichtbar; B Quellenliste in jeder Leseprobe ganz sichtbar | A |

## 11. Risiken und Grenzen

- Steuer: Ermäßigter Satz, OSS und Steuercode hängen am Steuerberater (S1 bis S6). Ein Verkauf vorher trägt dasselbe Risiko wie bei den Toolkits (E31, E39): möglicherweise falscher Steuerausweis über Stripe Tax; Stand prüfen, keine Steuerberatung. Bei inklusiven Preisen zahlt auch ein Unternehmer mit UID aus einem anderen EU-Land 29 Euro, die Rechnung weist dann keine Umsatzsteuer aus; so arbeitet die Toolkit-Kasse heute (Frage S4).
- Recht: Keine Anwaltsprüfung vor dem Start (E39); die Klammern in AGB 3 und 5 bleiben sichtbar. § 8 Abs. 2 FAGG wurde zuletzt mit BGBl. I Nr. 59/2026 geändert (gültig ab 27.9.2026, Q4), § 4 mit Wirkung ab 1.10.2026 (Q1): beide Fassungen sind jung, Stand prüfen.
- Technik: Bündelgröße bei Lovable nicht ermittelbar; Rückfallweg beschrieben. Der Löschlauf (R4) liegt außerhalb des Spiegels; eine falsche Regel könnte E-Book-Zeilen löschen, deshalb Prüfpunkt vor der Veröffentlichung.
- Kopien: PDF ohne Kopierschutz lässt sich weitergeben; AGB 7 regelt es, technisch verhindert es nichts (D9).
- Inhalt: Die Maschine ist klein gegen den Inhalt. Jedes E-Book hat 20 bis 40 Seiten je Sprache mit Quellen am Original (PLANUNG Abschnitt 4); ohne fertiges E-Book 03 bleibt Runde A ohne Produkt.
- Kundenportal: Ohne die Änderung für bestehende Kunden (Teil 2) sieht ein Mehrfachkäufer nur die Rechnungen seines letzten Kaufs; die Rechnungen selbst bleiben bei Stripe erhalten.

## 12. Quellen

Abgerufen am 4.11.2026, wenn nicht anders angegeben.

- Q1 § 4 Abs. 1 Z 8, 17, 18 FAGG, RIS (Gesetzesnummer 20008847), Fassung gültig ab 1.10.2026, zuletzt geändert durch BGBl. I Nr. 59/2026.
- Q2 § 7 Abs. 3 FAGG, RIS, Fassung vom 20.7.2022, BGBl. I Nr. 109/2022: Bestätigung des Vertrags auf einem dauerhaften Datenträger, „gegebenenfalls … auch eine Bestätigung der Zustimmung und Kenntnisnahme des Verbrauchers nach § 18 Abs. 1 Z 11“.
- Q3 § 18 Abs. 1 Z 11 lit. a bis c FAGG, RIS, Fassung vom 20.7.2022.
- Q3a § 11 Abs. 1 und Abs. 2 Z 3 FAGG, RIS, Fassung vom 4.11.2026: vierzehn Tage, bei digitalen Inhalten ab Vertragsabschluss.
- Q4 § 8 Abs. 2 FAGG, RIS, Fassung gültig ab 27.9.2026, BGBl. I Nr. 59/2026: „zahlungspflichtig bestellen“ oder gleichartige, eindeutige Formulierung.
- Q5 § 7 VGG (Verbrauchergewährleistungsgesetz), RIS (Gesetzesnummer 20011654), BGBl. I Nr. 175/2021, in Kraft seit 1.1.2022: Aktualisierungspflicht, Abs. 2 Z 1 bei einmaliger Bereitstellung.
- Q6 § 10 Abs. 1 und Abs. 2 Z 9 UStG 1994, RIS (Gesetzesnummer 10004873), angezeigte Fassung mit Inkrafttreten 1.7.2026: 20 Prozent; 10 Prozent für elektronische Publikationen im Sinne der Anlage 1 Z 33 mit Ausnahmen (Stand prüfen).
- Q7 § 12 Abs. 1 und Abs. 2 Nr. 14 UStG (Deutschland), gesetze-im-internet.de, Seite ohne Standdatum: 19 Prozent; 7 Prozent für elektronische Erzeugnisse mit Ausnahmen (Stand prüfen).
- Q8 Stripe API, Checkout Session erstellen (docs.stripe.com/api/checkout/sessions/create): `mode` payment; `invoice_creation` „Generate a post-purchase Invoice for one-time payments“; `consent_collection.terms_of_service` required mit AGB-Adresse in den Dashboard-Einstellungen; `tax_id_collection.enabled`, `required` never oder if_supported; `line_items.price_data.tax_behavior` inclusive oder exclusive; `product_data.tax_code` „recommended if calculating taxes“; `customer_update` nur mit `customer`.
- Q8a Stripe, Steuern in Checkout einziehen (docs.stripe.com/payments/checkout/taxes): bei bestehendem Kunden ohne Versandadresse `customer_update.address` auf `auto` setzen, damit die in der Kasse eingegebene Rechnungsadresse gespeichert und für die Steuer verwendet wird; ohne eigenen Steuercode gilt der Standardcode aus den Steuereinstellungen.
- Q9 Stripe Tax, Steuercodes (docs.stripe.com/tax/tax-codes): `txcd_10302000` Digital Books, downloaded, non subscription, permanent rights; `txcd_10302001` limited rights; `txcd_10000000` General, Electronically Supplied Services.
- Q10 Cloudflare Workers, Limits (developers.cloudflare.com/workers/platform/limits), Stand 29.10.2026: Worker 64 MiB unkomprimiert, keine Grenze komprimiert; statische Dateien höchstens 25 MiB je Datei.
- Q11 Credits und Ablauf: STAND.md und UEBERGABE-2026-11-03.md (Nachträge 3.11.2026), Gedächtnisnotiz „Lovable-Übergabe Ablauf“ (3.11.2026).
- Q12 Entscheidungen E19, E27, E31, E32, E34, E35, E36, E37, E39 in ENTSCHEIDUNGEN.md; Produktplanung `produkte/PLANUNG-2026-11.md` Abschnitte 4 bis 7.
- Q13 Code in `site/src/` und `site/content/legal/`, Stand Commit 12233cd; Dateigrößen mit `du -k` am 4.11.2026; Tests gezählt mit `grep` am 4.11.2026.
- Q14 Markenregeln `.claude/skills/scutoria-brand/SKILL.md` (Stand 3.11.2026): keine Siegel, keine Prozentzahlen, kein fremdes Skript, Papier hell auf dunkler Bühne.
- Q15 Prüfauftrag `_berichte/2026-11-03-Livepruefung-und-Produktstrategie/ARBEITSAUFTRAG-FUER-CLAUDE.md`, Paket 3, Punkt 5 (3.11.2026; der Ordner `_berichte/` liegt außerhalb von Git).
