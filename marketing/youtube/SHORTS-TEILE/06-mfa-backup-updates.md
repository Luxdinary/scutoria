# Shorts zu Video 06 · MFA, Sicherung, Updates

Stand 2026-10-29, Entwurf zur Freigabe. Vier Shorts nach VORLAGEN/SKRIPT-SHORT.md, je Englisch und Deutsch, dieselbe Datei für YouTube Shorts und Instagram Reels (9:16). Bildschirmtext ab Sekunde 0 in jedem Short: „Synthetic voice · Sources on screen“ beziehungsweise „Synthetische Stimme · Quellen am Bildschirm“. Kein Preis. Keine Person, kein Name. Quellenzeilen wörtlich aus FAKTEN-PRODUKTE.md Abschnitt 9, dem Handbuch des Sicherheitsnachweis-Toolkits oder dem Memo `login.mjs`.

### S-06-1 · Change passwords only on suspicion / Passwörter nur bei Verdacht wechseln
Thema: 06 · Priorität: 1 · Verweis: Langvideo 06, Kapitel „Where the sources disagree“ / „Wo die Quellen sich widersprechen“; Seite /memos/sign-in-security (EN), /de/memos/anmeldesicherheit (DE)
Bildidee: Bildschirmaufnahme Handbuch online, Abschnitt 2.2, Kasten „Which password rule should a supplier promise?“ / „Welche Passwortregel soll ein Lieferant zusagen?“, langsam auf den Kasten zoomen; Hook als Bildschirmtext in Manrope 700; beim Satz zur Durchführungsverordnung halber Kreis plus „Uncertain“ / „Unsicher“; Quellenzeile auf dem Band unten; letzte 10 Sekunden Papierblatt mit dem Memo-Titel auf dunklem Grund.
Hook EN: Still forcing password changes every few months? NIST and the BSI disagree.
Hook DE: Noch erzwungene Passwortwechsel alle paar Monate? NIST und BSI widersprechen.

EN (199 Wörter):
If your business still forces a password change every few months, two sources call that rule outdated. The NIST digital identity guidelines of July 2025 require at least fifteen characters where the password is the only factor, and eight where a second factor is used. No composition rules. No periodic change, unless there is evidence of compromise. The German BSI said the same in public on 31 January 2025, and again on 30 January 2026: regular changes without a reason lead to weaker passwords. One source points the other way. The Implementing Regulation under NIS two requires the change of authentication data at predefined intervals. So this is open, and we mark it that way.
[SOURCE: NIST SP 800-63B-4, July 2025, sections 3.1.1.1 and 3.1.1.2 · retrieved 2026-10-19; BSI press releases of 31 January 2025 and 30 January 2026 · retrieved 2026-10-19; Implementing Regulation (EU) 2024/2690, Annex 11.6.2 · retrieved 2026-10-19]
What a business can do today: one long password per account, kept in a password manager, changed when there is a suspicion, and a second factor on every account that matters. If a customer insists on intervals and cites the Regulation, agree an interval for the accounts without a second factor and keep MFA everywhere else. Write down which rule applies.
The whole thing is in the video linked below. The memo is free on scutoria.com. Synthetic voice, sources on screen, no legal advice.

DE (186 Wörter):
Wenn Ihr Betrieb noch alle paar Monate einen Passwortwechsel erzwingt, nennen zwei Quellen diese Regel überholt. Die Digital Identity Guidelines der NIST vom Juli 2025 verlangen mindestens fünfzehn Zeichen, wo das Passwort der einzige Faktor ist, und acht, wo ein zweiter Faktor dazukommt. Keine Kompositionsregeln. Kein regelmäßiger Wechsel, außer es gibt einen Hinweis auf eine Kompromittierung. Das BSI hat am 31. Januar 2025 und noch einmal am 30. Januar 2026 öffentlich dasselbe gesagt: Regelmäßige Wechsel ohne Anlass führen zu schwächeren Passwörtern. Eine Quelle weist in die andere Richtung: Die Durchführungsverordnung zu NIS zwei verlangt die Änderung von Authentifizierungsdaten in vorab festgelegten Zeitabständen. Das ist offen, und so markieren wir es.
[QUELLE: NIST SP 800-63B-4, Juli 2025, Abschnitte 3.1.1.1 und 3.1.1.2 · Abruf 2026-10-19; BSI-Pressemitteilungen vom 31. Januar 2025 und 30. Januar 2026 · Abruf 2026-10-19; Durchführungsverordnung (EU) 2024/2690, Anhang 11.6.2 · Abruf 2026-10-19]
Was ein Betrieb heute tun kann: ein langes Passwort je Konto im Passwort-Manager, bei Verdacht geändert, und ein zweiter Faktor auf jedem Konto, das zählt. Besteht ein Kunde auf Intervallen und beruft sich auf die Verordnung, vereinbaren Sie ein Intervall für die Konten ohne zweiten Faktor und behalten MFA überall sonst. Schreiben Sie auf, welche Regel gilt.
Das Ganze steht im verlinkten Video. Das Memo ist frei auf scutoria.com. Synthetische Stimme, Quellen am Bildschirm, keine Rechtsberatung.

### S-06-2 · A backup you can reach is a backup an attacker can reach / Eine Sicherung, die Sie erreichen, erreicht auch ein Angreifer
Thema: 06 · Priorität: 1 · Verweis: Langvideo 06, Kapitel „Five measures, five pieces of evidence“ / „Fünf Maßnahmen, fünf Belege“; Seite /toolkits/security-evidence/handbook (EN), /de/toolkits/sicherheitsnachweis/handbuch (DE)
Bildidee: Bildschirmaufnahme Handbuch online, Abschnitt 2.3, Frage D1, erst der Fakt-Absatz mit Quadrat plus „Fact“ / „Fakt“, dann der Auslegungs-Absatz mit Raute plus „Interpretation“ / „Auslegung“; danach Generator Toolkit 02, Statusfrage D1 mit den vier Antworten, „partly“ / „teilweise“ markiert; Hook als Bildschirmtext; Quellenzeile auf dem Band unten; letzte 10 Sekunden Papierblatt mit dem Handbuch-Titel.
Hook EN: A backup you can reach is a backup an attacker can reach.
Hook DE: Eine Sicherung, die Sie erreichen, erreicht auch ein Angreifer.

EN (206 Wörter):
Most insurer forms ask the same two things about your backup: how often it runs, and whether the media are separated from the active systems. Markel asks for backups on separated systems at least weekly below one million euro turnover, and daily above. Beazley's first critical requirement is tested offline backups. The Implementing Regulation under NIS two requires backup copies in a location that is not in the same network as the system.
[SOURCE: Mannheimer, 4.1, 4.5, 4.6, 4.7, 4.9; Markel, section 4 point 5; Beazley, 1; Funk, 1; Implementing Regulation (EU) 2024/2690, Annex 4.2.2(c); ENISA, 12 steps, step 9; Directive (EU) 2022/2555, Art. 21(2)(c) · retrieved 2026-10-19; Regulation (EU) 2016/679, Art. 32(1)(a), (c), (d) · retrieved 2026-10-23]
Our interpretation: out of reach is the whole point. A backup on a disk that is always connected, or in a cloud folder the office account can delete, is the next encrypted backup. It runs every night, and on the day it matters it is encrypted with everything else.
What a business can do today: keep the nightly backup, and add one copy the office account cannot touch: offline, for example on a disk that is disconnected after the run, or otherwise out of an attacker's reach. Then one screenshot of the settings and one sentence on where the copy is. That is the evidence a questionnaire accepts.
The whole thing is in the video linked below. The handbook is free to read on scutoria.com. Synthetic voice, sources on screen, no legal advice.

DE (188 Wörter):
Die meisten Versichererformulare fragen zweierlei zu Ihrer Sicherung: wie oft sie läuft und ob die Speichermedien von den aktiven Systemen getrennt sind. Markel verlangt Sicherungen auf separierten Systemen, unter einer Million Euro Umsatz mindestens wöchentlich, darüber täglich. Beazleys erste kritische Anforderung sind getestete Offline-Backups. Die Durchführungsverordnung zu NIS zwei verlangt Sicherungskopien an einem Ort, der nicht im selben Netz liegt wie das System.
[QUELLE: Mannheimer, 4.1, 4.5, 4.6, 4.7, 4.9; Markel, Abschnitt 4 Nr. 5; Beazley, 1; Funk, 1; Durchführungsverordnung (EU) 2024/2690, Anhang Nr. 4.2.2 Buchst. c; ENISA, 12 steps, Schritt 9; Richtlinie (EU) 2022/2555, Art. 21 Abs. 2 Buchst. c · abgerufen 19.10.2026; Verordnung (EU) 2016/679, Art. 32 Abs. 1 Buchst. a, c und d · abgerufen 23.10.2026]
Unsere Auslegung: Außer Reichweite ist der ganze Sinn. Eine Sicherung auf einer immer angeschlossenen Platte oder in einem Cloud-Ordner, den das Bürokonto löschen kann, ist die nächste verschlüsselte Sicherung. Sie läuft jede Nacht, und am Tag, an dem es darauf ankommt, wird sie mit allem anderen verschlüsselt.
Was ein Betrieb heute tun kann: die nächtliche Sicherung behalten und eine Kopie dazunehmen, die das Bürokonto nicht anfassen kann: offline, etwa auf einer Platte, die nach dem Lauf abgesteckt wird, oder sonst außerhalb der Reichweite eines Angreifers. Dann ein Bildschirmfoto der Einstellungen und ein Satz, wo die Kopie liegt. Das ist der Beleg, den ein Fragebogen annimmt.
Das Ganze steht im verlinkten Video. Das Handbuch ist frei lesbar auf scutoria.com. Synthetische Stimme, Quellen am Bildschirm, keine Rechtsberatung.

### S-06-3 · SMS is last, but above nothing / SMS kommt zuletzt, aber vor gar nichts
Thema: 06 · Priorität: 2 · Verweis: Langvideo 06, Kapitel „Five measures, five pieces of evidence“ / „Fünf Maßnahmen, fünf Belege“; Seite /memos/sign-in-security (EN), /de/memos/anmeldesicherheit (DE)
Bildidee: Bildschirmaufnahme Memo „Where does our sign-in stand?“ / „Wo steht unsere Anmeldung?“, Frage „Which second factor is used most?“ mit den vier Antworten, Mauszeiger ruht auf „A code by SMS“; dann Ergebnisseite, Schritt 1 mit Ampel; Hook als Bildschirmtext; bei der CISA-Reihung Quadrat plus „Fact“ / „Fakt“ und eine vierzeilige Liste stark bis schwach; Quellenzeile auf dem Band unten.
Hook EN: SMS codes are the weakest second factor. Still better than none.
Hook DE: SMS-Codes sind der schwächste zweite Faktor. Besser als keiner.

EN (167 Wörter):
Which second factor should your business use? CISA, the US cybersecurity agency, ranks the forms of multi-factor authentication from strongest to weakest: security keys and passkeys first; then authenticator apps and push notifications with number matching; then push without number matching; and codes by SMS or voice call last, because they are open to phishing and SIM-swap attacks. Last among MFA methods still means above a password alone. For small businesses that cannot move to security keys at once, CISA names app codes and push with number matching as the best options.
[SOURCE: CISA, fact sheet "Implementing Phishing-Resistant MFA", October 2022, pp. 1 to 3 · cisa.gov · retrieved 2026-10-19]
Insurers ask for MFA for cloud services, email, remote access and administrators.
[SOURCE: Mannheimer, Fragebogen Cyber-Risiken (HF_060 0424); Markel, Pro Cyber v2; Allianz, IT-Haftpflicht 9.25; Beazley, Sicherheitsanforderungen; Funk with Beazley, July 2022; Donau, AVB Cyber 2025 · retrieved 2026-10-19 and 2026-10-23]
What a business can do today: switch email and administrator accounts to an authenticator app or a security key first, and keep SMS as the fallback. Then one screenshot of the MFA settings per system, dated. That is the evidence.
The whole thing is in the video linked below. The memo is free on scutoria.com. Synthetic voice, sources on screen, no legal advice.

DE (143 Wörter):
Welchen zweiten Faktor soll Ihr Betrieb nutzen? Die CISA, die US-Cybersicherheitsbehörde, ordnet die Formen der Multi-Faktor-Authentifizierung von stark nach schwach: Sicherheitsschlüssel und Passkeys zuerst; dann Authenticator-Apps und Push-Benachrichtigungen mit Zahlenabgleich; dann Push ohne Zahlenabgleich; und Codes per SMS oder Anruf zuletzt, weil sie für Phishing und SIM-Swap-Angriffe anfällig sind. Zuletzt unter den MFA-Verfahren heißt immer noch: über dem Passwort allein. Für kleine Betriebe, die nicht sofort auf Sicherheitsschlüssel umstellen können, nennt die CISA App-Codes und Push mit Zahlenabgleich als beste Optionen.
[QUELLE: CISA, Fact Sheet „Implementing Phishing-Resistant MFA“, Oktober 2022, S. 1 bis 3 · cisa.gov · Abruf 2026-10-19]
Versicherer verlangen MFA für Cloud-Dienste, E-Mail, Fernzugriff und Administratoren.
[QUELLE: Mannheimer, Fragebogen Cyber-Risiken (HF_060 0424); Markel, Pro Cyber v2; Allianz, IT-Haftpflicht 9.25; Beazley, Sicherheitsanforderungen; Funk mit Beazley, Juli 2022; Donau, AVB Cyber 2025 · Abruf 2026-10-19 und 2026-10-23]
Was ein Betrieb heute tun kann: zuerst E-Mail- und Administratorkonten auf eine Authenticator-App oder einen Sicherheitsschlüssel umstellen und SMS als Rückfallweg behalten. Dann ein datiertes Bildschirmfoto der MFA-Einstellungen je System. Das ist der Beleg.
Das Ganze steht im verlinkten Video. Das Memo ist frei auf scutoria.com. Synthetische Stimme, Quellen am Bildschirm, keine Rechtsberatung.

### S-06-4 · Test the restore, note the minutes / Wiederherstellung proben, Minuten notieren
Thema: 06 · Priorität: 2 · Verweis: Langvideo 06, Kapitel „Five measures, five pieces of evidence“ / „Fünf Maßnahmen, fünf Belege“; Seite /toolkits/security-evidence/handbook (EN), /de/toolkits/sicherheitsnachweis/handbuch (DE)
Bildidee: Bildschirmaufnahme Generator Toolkit 02, Statusfrage D2 mit den vier Antworten, „not yet, with a date“ / „noch nicht, mit Termin“ markiert; dann Muster D4 Nachweisliste im Lesemodus, Zeile D2 mit dem Beleg „one line: date, duration, result“ / „eine Zeile: Datum, Dauer, Ergebnis“; Hook als Bildschirmtext; Raute plus „Interpretation“ / „Auslegung“ beim Zusatz der Dauer; Quellenzeile auf dem Band unten.
Hook EN: A backup nobody has restored from is a hope, not a backup.
Hook DE: Eine Sicherung, aus der nie zurückgespielt wurde, ist eine Hoffnung.

EN (182 Wörter):
Most insurer forms we read ask whether the backup has been tested. Mannheimer asks for the date of the last successful restore test. Markel asks whether all backups are restore-tested at least once a year. Beazley and Funk want backups tested regularly. The Implementing Regulation under NIS two requires regular testing of the recovery of backup copies.
[SOURCE: Mannheimer, 4.2; Markel, 7.2; Beazley, 1; Funk, 1; Implementing Regulation (EU) 2024/2690, Annex 4.2.6 · retrieved 2026-10-19; Regulation (EU) 2016/679, Art. 32(1)(a), (c), (d) · retrieved 2026-10-23]
Our interpretation: the test itself is small. Pick one folder. Restore it from the backup to a different place. Stop the time. Then write one line: date, duration, result. Noting the duration is our addition, because it shows whether the IT is back within the time the business can bridge.
What a business can do today: run that test once, and put the line into the evidence folder. Once a year is the rhythm the forms ask. If the test has never been done, the honest answer is not yet, with a date, and the date goes into the self-declaration.
The whole thing is in the video linked below. The handbook is free to read on scutoria.com. Synthetic voice, sources on screen, no legal advice.

DE (173 Wörter):
Die meisten Versichererformulare, die wir gelesen haben, fragen, ob die Sicherung getestet wurde. Mannheimer fragt nach dem Datum des letzten erfolgreichen Rücksicherungstests. Markel fragt, ob mindestens einmal im Jahr ein Wiederherstellungstest für alle Sicherungen erfolgt. Beazley und Funk wollen regelmäßig getestete Sicherungen. Die Durchführungsverordnung zu NIS zwei verlangt regelmäßige Tests der Wiederherstellung von Sicherungskopien.
[QUELLE: Mannheimer, 4.2; Markel, 7.2; Beazley, 1; Funk, 1; Durchführungsverordnung (EU) 2024/2690, Anhang Nr. 4.2.6 · abgerufen 19.10.2026; Verordnung (EU) 2016/679, Art. 32 Abs. 1 Buchst. a, c und d · abgerufen 23.10.2026]
Unsere Auslegung: Der Test selbst ist klein. Nehmen Sie einen Ordner. Spielen Sie ihn aus der Sicherung an einen anderen Ort zurück. Stoppen Sie die Zeit. Dann eine Zeile: Datum, Dauer, Ergebnis. Die notierte Dauer ist unser Zusatz, weil sie zeigt, ob die IT innerhalb der Zeit wieder läuft, die der Betrieb überbrücken kann.
Was ein Betrieb heute tun kann: diesen Test einmal machen und die Zeile in den Nachweisordner legen. Einmal im Jahr ist der Rhythmus, den die Formulare fragen. Wurde nie getestet, lautet die ehrliche Antwort „noch nicht, mit Termin“, und der Termin steht in der Selbstauskunft.
Das Ganze steht im verlinkten Video. Das Handbuch ist frei lesbar auf scutoria.com. Synthetische Stimme, Quellen am Bildschirm, keine Rechtsberatung.
