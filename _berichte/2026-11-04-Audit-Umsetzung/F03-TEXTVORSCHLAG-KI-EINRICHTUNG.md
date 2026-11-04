# F03: Versprechen des KI-Einrichtungs-Toolkits durch eine prüfbare Beschreibung ersetzen

Stand 4.11.2026. Textvorschlag zur Freigabe; auf der Website ist noch nichts geändert.

## Fundstellen

| Ort | Datei und Zeile | Wortlaut heute |
|---|---|---|
| Startseite, Karte des nächsten Toolkits (Linie „setup“), Englisch | `site/src/i18n.mjs`, Zeile 44 | Claude, ChatGPT and Microsoft 365 Copilot set up so that nothing leaves the business unnoticed. Setup record and data-flow register. |
| Startseite, Karte des nächsten Toolkits, Deutsch | `site/src/i18n.mjs`, Zeile 89 | Claude, ChatGPT und Microsoft 365 Copilot so eingerichtet, dass nichts unbemerkt den Betrieb verlässt. Einrichtungsprotokoll und Datenfluss-Register. |
| Produktplanung, Tabelle Stufe 1, Zeile Toolkit 03 | `produkte/PLANUNG-2026-11.md`, Zeile 40 | „Wir haben Claude, ChatGPT oder Copilot gekauft; wie stellen wir es ein, damit nichts unbemerkt den Betrieb verlässt?“ |

Die Zeile in der Planung ist die Frage des Kunden in Anführungszeichen, kein Versprechen von Scutoria. Sie kann bleiben. Die Produktbeschreibung des Bauplans für Toolkit 03 (eigene Sitzung) bekommt denselben Wortlaut wie die Website.

## Warum der Satz weg muss

Der Satz verspricht ein Ergebnis („nichts verlässt unbemerkt den Betrieb“), das kein Dokument und keine Einstellung garantieren kann: Datenflüsse hängen von Anbieter-Einstellungen ab, die sich ändern, von Konten, die der Betrieb nicht kennt, und vom Verhalten der Beschäftigten. Die Markenregel verbietet genau solche Zusagen (nie „secure“, „safe“, „meets all requirements“; offene Punkte nie verstecken). Prüfbar ist nur, was das Toolkit tatsächlich liefert: ein datiertes Einrichtungsprotokoll je Konto und ein Datenfluss-Register mit offenen Punkten und Wiedervorlage.

## Vorschlag A (Empfehlung)

Angelehnt an den Vorschlag des Prüfberichts, ohne Gedankenstrich, mit dem Satz zu den beiden Dokumenten.

- Deutsch: Konten, Einstellungen und Datenflüsse für Claude, ChatGPT und Microsoft 365 Copilot nachvollziehbar dokumentiert, mit offenen Punkten und Wiedervorlage. Einrichtungsprotokoll und Datenfluss-Register.
- Englisch: Accounts, settings and data flows for Claude, ChatGPT and Microsoft 365 Copilot documented so they can be checked, with open points and a review date. Setup record and data-flow register.

## Vorschlag B (kürzer)

- Deutsch: Welche Einstellungen bei Claude, ChatGPT und Microsoft 365 Copilot gesetzt sind und welche Daten wohin fließen: dokumentiert, datiert, mit offenen Punkten. Einrichtungsprotokoll und Datenfluss-Register.
- Englisch: Which settings are set in Claude, ChatGPT and Microsoft 365 Copilot and which data goes where: documented, dated, with open points. Setup record and data-flow register.

Empfehlung: A. Er nennt die Wiedervorlage, die der Bauplan für Toolkit 03 ohnehin vorsieht (vierteljährliche Prüfung der Anbieterquellen), und passt zur Zeile der beiden Dokumente.

## Änderung in der Datei (Vorschlag A)

```diff
--- site/src/i18n.mjs
-        { key: 'setup', title: 'AI Setup Toolkit', text: 'Claude, ChatGPT and Microsoft 365 Copilot set up so that nothing leaves the business unnoticed. Setup record and data-flow register.' },
+        { key: 'setup', title: 'AI Setup Toolkit', text: 'Accounts, settings and data flows for Claude, ChatGPT and Microsoft 365 Copilot documented so they can be checked, with open points and a review date. Setup record and data-flow register.' },
...
-        { key: 'setup', title: 'KI-Einrichtungs-Toolkit', text: 'Claude, ChatGPT und Microsoft 365 Copilot so eingerichtet, dass nichts unbemerkt den Betrieb verlässt. Einrichtungsprotokoll und Datenfluss-Register.' },
+        { key: 'setup', title: 'KI-Einrichtungs-Toolkit', text: 'Konten, Einstellungen und Datenflüsse für Claude, ChatGPT und Microsoft 365 Copilot nachvollziehbar dokumentiert, mit offenen Punkten und Wiedervorlage. Einrichtungsprotokoll und Datenfluss-Register.' },
```

Nach der Freigabe: Änderung in `site/src/i18n.mjs`, Spiegel bei Lovable `src/legacy/i18n.mjs`, Veröffentlichung nur auf Stefans Wort (Tor Veröffentlichen).

## Prüfung nach der Umsetzung

- Startseite DE und EN zeigen den neuen Wortlaut auf der Karte des Toolkits in Vorbereitung.
- Volltextsuche nach „unbemerkt“ und „unnoticed“ im Ordner `site/src` liefert keinen Treffer mehr.
- Der Bauplan für Toolkit 03 verwendet denselben Satz als Produktbeschreibung.
