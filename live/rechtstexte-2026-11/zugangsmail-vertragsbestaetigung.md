# Ergänzung der Zugangsmail: Vertragsbestätigung (Entwurf 2. November 2026)

Wo: Vorlage `welcome` in `src/legacy/mail.mjs` bei Lovable (die Mail nach dem Kauf). Heute dankt sie, nennt die Laufzeit und schickt den Anmeldelink. Sie bestätigt weder den Vertrag noch die Zustimmung zum sofortigen Beginn. Der Absatz unten kommt nach dem Dank und vor den Anmeldelink. Platzhalter in geschweiften Klammern füllt der Code aus der Lizenz.

## Deutsch

> Ihre Bestellung: Jahreslizenz für das {Produkt}, gekauft am {Kaufdatum}, Preis {Betrag} Euro, gültig bis {Enddatum}, ohne automatische Verlängerung. Es gelten unsere AGB in der Fassung vom {AGB-Fassung}: {Link zu den AGB}. In der Kasse haben Sie ausdrücklich verlangt, dass der Zugang zum digitalen Inhalt sofort beginnt, und bestätigt, dass Sie dadurch Ihr Rücktrittsrecht verlieren (§ 18 Abs. 1 Z 11 FAGG). Die Rechnung finden Sie im Konto unter „Rechnungen und Belege“.

## Englisch

> Your order: annual licence for the {product}, bought on {purchase date}, price {amount} euro, valid until {end date}, no automatic renewal. Our terms in the version of {terms version} apply: {link to the terms}. At checkout you expressly requested that access to the digital content starts immediately and confirmed that you thereby lose your right of withdrawal (section 18 (1) 11 FAGG). You find the invoice in the account under "Invoices and receipts".

## Warum

Für das Erlöschen des Rücktrittsrechts bei digitalen Inhalten verlangt das FAGG neben der Zustimmung auch eine Bestätigung des Vertrags auf einem dauerhaften Datenträger (Einzelheiten und Quelle in der Freigabe-Unterlage, Punkt R6). Die Zugangsmail ist dieser Datenträger. Ob die Stripe-Quittung das bereits leistet, ist nicht ermittelbar, weil ihr Inhalt von den Kontoeinstellungen abhängt.
