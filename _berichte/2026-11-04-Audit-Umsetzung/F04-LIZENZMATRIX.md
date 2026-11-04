# F04: Lizenzmatrix und Abgleich von Produktseite, AGB und Verhalten

Stand 4.11.2026. Geprüft am Quellstand in `site/` (lokale Live-Instanz mit einer abgelaufenen und einer gültigen Lizenz) und an der Lovable-Datenbank (Löschjob, Funktion gelesen). Deployment-Stand bei Lovable: unverändert (2a3a59ee vom 3.11.2026); die Korrektur F04-1 liegt nur im Quellstand.

## 1. Matrix

| Leistung | Produktseite (Fakten unter dem Preis) | AGB und Terms live | Code vor dem 4.11. | Befund |
|---|---|---|---|---|
| Generator, neuer Lauf | „Generator und Aktualisierungen brauchen eine Lizenz“ | § 2: Generator für zwölf Monate; § 8: nach Ablauf nicht mehr | `canStartRun`: live nur mit Lizenz, deren `ends_at` in der Zukunft liegt | stimmt |
| Generator, bestehenden Lauf ändern | wie oben | § 8: Generator nach Ablauf nicht mehr | Frageseiten, Speichern der Antworten und Prüfseite hatten keine Lizenzprüfung: ein Kunde mit abgelaufener Lizenz konnte Antworten ändern und daraus neue Dokumente erzeugen | Widerspruch, behoben (F04-1) |
| Erzeugte Dokumente nach Ablauf | „Nach dem Ende der Lizenz bleibt Ihr Nachweisordner zugänglich“ | § 8 live: „[zwölf weitere Monate, Stand prüfen]“; Entwurf A/B: zwölf Monate, danach gelöscht | Dokumentseite, HTML, PDF, DOCX, XLSX und ZIP bleiben erreichbar; das Handbuch liegt nur mit Lizenz im ZIP | stimmt; die Klammer ist F01 |
| Handbuch | „Handbuch mit Quellen“ | § 2: zwölf Monate | Vollfassung und PDF nur mit gültiger Lizenz, sonst Leseprobe; nach Ablauf wieder Leseprobe | stimmt |
| Aktualisierungen | „Aktualisierungen brauchen eine Lizenz“ | § 9: innerhalb der Laufzeit; „zeigt im Konto an, welche Dokumente betroffen sind“ | Das Konto zeigt zu jeder eingefrorenen Fassung die Toolkit-Version und einen Hinweis, wenn das Toolkit seither eine neuere Version hat; welche Dokumente betroffen sind, zeigt es nicht. Nicht eingefrorene Läufe entstehen bei jedem Abruf aus den aktuellen Vorlagen, auch nach Ablauf | zwei Abweichungen, Textvorschlag F04-2 |
| Konto, Rechnungen, Lizenzliste nach Ablauf | Konto bleibt | § 11 | Anmeldung, Lizenz mit Kennzeichen „abgelaufen“, Rechnungen, Dokumente | stimmt |
| Löschfrist | nicht genannt | Entwurf § 8 und Datenschutz „Konto und Lizenz“: zwölf Monate nach Lizenzende; Läufe ohne Konto 90 Tage | Lovable-Datenbank: pg_cron-Job `scutoria-retention-daily`, Zeitplan `0 3 * * *`, aktiv, ruft `public.apply_retention()`. Funktion am 4.11.2026 gelesen: Läufe ohne Lizenz 90 Tage nach der letzten Änderung, Läufe mit Lizenz zwölf Monate nach dem letzten Lizenzende; Warteliste zwölf Monate, Memo-Kontakte 90 Tage, Versandprotokoll zwölf Monate, Sitzungen und Tokens nach Ablauf, Ratenzähler 24 Stunden | stimmt mit E32 R1 bis R4 und R7; ein Löschfall mit Zählern ist bisher nicht angefallen (jüngste Daten) |
| Erinnerung vor dem Ende | „Eine Erinnerung vor dem Ende“ | § 8: „Vor dem Ablauf erhalten Sie eine Erinnerung“ | Endpunkt `/api/public/hooks/reminders` fertig (vierzehn Tage vorher, eine Mail je Lizenz, keine für erneuerte Lizenzen); Schalter `reminders` in `content/site-settings.json` auf „off“; kein pg_cron-Job angelegt (Datenbank am 4.11.2026 gelesen: nur der Löschjob existiert) | Versprechen ohne laufenden Betrieb, Entscheidung F04-3; die erste Erinnerung wäre frühestens Mitte Oktober 2027 fällig (Probekauf im November 2026 vorausgesetzt) |
| Widerruf | Verbraucher stimmen dem sofortigen Beginn zu | § 6 | Die Kasse holt die Zustimmung ein; Funktion „Vertrag widerrufen“ nach E32 R8 | stimmt |
| Zahlung und Rechnung | Stripe, Rechnung per E-Mail, UID an der Kasse | § 4 | Stripe Checkout, Rechnungen im Konto | stimmt; Umsatzsteuer-Text ist F01 |

## 2. Korrekturen und Vorschläge

### F04-1 Lauf nach Lizenzende nur noch lesbar (im Quellstand umgesetzt)

- `site/src/shop/session.mjs`: neue Funktion `canEditRun(run, productId)`. Im Live-Modus darf ein Lauf mit Konto nur geändert werden, solange der Inhaber eine gültige Lizenz für das Toolkit hat. Läufe ohne Konto (Vorschaumodus) bleiben offen.
- `site/src/toolkit/routes.mjs`: Frageseite (Anzeigen und Speichern) und Prüfseite (Anzeigen und Abschließen) leiten einen gesperrten Lauf auf seine Dokumentseite. Dort steht der Hinweis „Ihre Lizenz ist abgelaufen. Diese Dokumente bleiben abrufbar; Änderungen an den Antworten und ein neuer Lauf brauchen eine neue Lizenz.“ mit dem Link „Lizenz kaufen“ zum Preis; der Knopf „Antworten ändern“ fehlt; alle Formate und das ZIP bleiben. Englisch: „Your licence has ended. These documents stay available; changing the answers or starting a new run needs a new licence.“
- `site/src/shop/routes.mjs`: Das Konto zeigt „Weiter“ je Lauf nur mit gültiger Lizenz; „Dokumente“ und „Fassung einfrieren“ bleiben; der Hinweis „Für den Generator ist eine Lizenz nötig“ stand schon vorher dort.
- Unverändert: Ein Lauf bleibt über seinen Link ohne Anmeldung änderbar, solange die Lizenz des Inhabers gilt (bisheriges Verhalten, nicht Teil des Befunds).
- Geprüft am 4.11.2026 an einer lokalen Live-Instanz (SQLite-Referenz, Port 8791): abgelaufene Lizenz bis 4.10.2026, gültige bis 4.11.2027, je ein Beispiellauf. 28 Prüfpunkte bestanden, darunter: Frageseite des abgelaufenen Laufs leitet auf die Dokumentseite (303); Dokumentseite 200 mit Hinweis und ohne Link zur Prüfseite; ZIP 200 (258 kB) und erstes Dokument als HTML 200; Speichern einer Antwort, Prüfseite und Abschluss der Prüfseite leiten um (303); Konto zeigt „abgelaufen“ ohne „Weiter“, aber mit „Dokumente“; neuer Lauf wird mit `m=licence` abgewiesen; gültige Lizenz: Frageseite 200, Prüfseite 200, Konto mit „Weiter“ und Startwahl; Vorschaumodus (Port 8787): anonymer Lauf startet und bleibt änderbar.
- Offen: Übertragung der drei Dateien an Lovable (`src/legacy/shop/session.mjs`, `src/legacy/toolkit/routes.mjs`, `src/legacy/shop/routes.mjs`) mit Vitest-Fällen in `src/test/` nach demselben Muster wie die Prüfpunkte oben, dann Veröffentlichung. Beides nur auf Stefans Wort (Tor Veröffentlichen, Credits).

### F04-2 Aktualisierungen: Text an das Verhalten angleichen (Vorschlag, Tor Recht)

- Option A (Empfehlung): AGB § 9 Satz 1 neu: „Ändern sich Rechtslage, Fristen oder die Oberfläche eines beschriebenen Werkzeugs, aktualisiert Scutoria das Produkt innerhalb der Lizenzlaufzeit; das Konto zeigt zu jeder eingefrorenen Fassung die Version des Toolkits und ob es seither eine neuere gibt.“ AGB § 8 letzter Satz neu: „Generator und Änderungen an den Antworten stehen nach Ablauf nicht mehr zur Verfügung.“ Terms § 9: „If the law, a deadline or the interface of a described tool changes, Scutoria updates the product during the licence term; the account shows for every frozen version the toolkit version and whether a newer one exists.“ Terms § 8: „the generator and changes to the answers are no longer available.“ Produktseite: Satz „Generator und Aktualisierungen brauchen eine Lizenz“ wird zu „Generator und Änderungen brauchen eine Lizenz“ (EN: „The generator and changes need a licence“).
- Option B: Abgelaufene Läufe beim Lizenzende automatisch einfrieren und danach die Vorlagen von damals liefern. Aufwand M bei Lovable, weil eingefrorene Fassungen heute Antworten speichern, nicht Vorlagen. Nicht empfohlen.
- Bis zur Entscheidung bleibt der Text; der Unterschied wirkt nur bei Kunden mit abgelaufener Lizenz.

### F04-3 Erinnerung: Betrieb herstellen oder Satz zurücknehmen (Entscheidung Stefan)

- Option A (Empfehlung): Erinnerungsjob anlegen. pg_cron täglich 06:00 UTC ruft den Endpunkt mit dem Token aus dem Vault (SQL liegt bei Lovable in `docs/reminder-schedule.sql`), Schalter `reminders` auf „on“, Vitest mit Attrappe; danach ein protokollierter Probelauf (Zähler ohne Versand). Eine Lovable-Runde, Schätzung 1 bis 2 Credits. Frist: vor Mitte Oktober 2027; kein Zeitdruck, aber vor dem Vergessen.
- Option B: Den Satz „Eine Erinnerung vor dem Ende“ auf der Produktseite und in AGB § 8 und Terms § 8 streichen, bis der Betrieb steht. Tor Recht.
- Bis zur Entscheidung bleibt das Versprechen stehen; ein Verstoß kann erst ab Oktober 2027 eintreten.

## 3. Was nach Entwurf A/B und F04-1 noch offen ist

- AGB live § 8 Klammer zur Frist (F01, mit dem Live-Gang der Entwürfe).
- AGB § 9 und Produktseite zu Aktualisierungen (F04-2, Stefans Wort).
- Erinnerung (F04-3, Stefans Wort).
- Übertragung von F04-1 an Lovable und Veröffentlichung (Stefans Wort).

## 4. Prüfprotokoll

Skript `check_f02_f04.py` (Scratchpad der Sitzung), Lauf vom 4.11.2026 gegen `http://127.0.0.1:8791` (Live-Modus) und `http://127.0.0.1:8787` (Vorschaumodus): 28 Punkte, alle bestanden; die Punkte zu den Videozählern (F02) sind darin enthalten.
