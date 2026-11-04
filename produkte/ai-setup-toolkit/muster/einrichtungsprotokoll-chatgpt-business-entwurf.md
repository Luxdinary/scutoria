# Einrichtungsprotokoll · ChatGPT Business

Beispielausgabe als Textentwurf, 4. November 2026, zur Abnahme nach dem Prüfauftrag (Paket 3: zuerst Beispielausgabe und Quellenmatrix, dann Fragebogen). So sieht das Dokument D1 des AI Setup Toolkits später als PDF und DOCX aus, erzeugt aus den vorbelegten Antworten des Beispielbetriebs. Alle Angaben zum Betrieb sind erfunden; die Angaben der Anbieter stammen aus dem Quellenprotokoll `../quellen.md` (Kürzel O1 bis O12, Abruf 4. November 2026). Die englische Fassung entsteht mit dem Bau aus derselben Datenquelle. Information auf Quellenbasis, keine Rechtsberatung.

Marker: **Fakt** = Wortlaut oder Datum beim Anbieter gelesen · **Auslegung** = Schlussfolgerung von Scutoria · **Unsicher** = Anbieterangabe widersprüchlich oder Schalter nicht belegt · **Lücke** = beim Anbieter nicht ermittelbar, der Betrieb entscheidet selbst.

---

**Betrieb:** Muster Elektrotechnik e.U., Österreich, 10 bis 49 Beschäftigte
**Tool:** ChatGPT · **Anbieter:** OpenAI; Vertragspartner für Kunden im EWR: OpenAI Ireland Ltd. (O2) · **Plan:** ChatGPT Business (bis 29. August 2025 „ChatGPT Team“, O4) · **Kontoart:** betrieblich, Workspace des Betriebs
**Verantwortlich für die Einrichtung:** Büroleitung · **Verwaltet die Konten:** Büroleitung, Rolle Owner im Workspace · **Konten:** sechs (Büroleitung als Owner, Geschäftsführung als Admin, vier Mitglieder in Büro und Technik)
**Eingerichtet am:** [trägt der Betrieb ein] · **Protokoll erstellt:** 4. November 2026 · **Anbieterangaben gelesen:** 4. November 2026 · **Wiedervorlage:** 4. Februar 2027 (vierteljährlich) oder früher bei Anlass (geänderte Anbieterbedingungen, neuer Plan, neue Verbindung, Austritt)
**Dokumentnummer:** AS-2026-000001 (Muster)

## 1. Konto und Zugang

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Plan und Mindestgröße | Business ist ein Selbstbedienungsplan für Teams; mindestens zwei bezahlte Sitze, seit 24.8.2026 höchstens 200 je Abonnement (O4). Fakt | Business, sechs Sitze. Geprüft 4.11.2026, Büroleitung |
| Rollen | Owner (Abrechnung, Identität, Konfiguration), Admin (Nutzerverwaltung), Analytics Viewer, Member (O10). Fakt | Owner: Büroleitung. Admin: Geschäftsführung. Vier Member. Geprüft 4.11.2026 |
| Wer darf einladen | Mitglieder können weitere Mitglieder mit dem Standard-Sitztyp einladen; „You currently cannot prevent members from inviting other members“ (O10). Fakt | Nicht einschränkbar. Regel des Betriebs: Kontenliste monatlich mit der Mitgliederliste abgleichen (Workspace settings > Members). Auslegung |
| Workspace-Suche für die eigene Domain | „ChatGPT Business: workspace discovery is on by default“; Owner steuern Verfügbarkeit und Beitritt ohne Freigabe unter Identity & access (O10). Fakt | Nicht geprüft. Offener Punkt 1 |
| SSO und Domainverifizierung | SAML und OIDC sowie Domainverifizierung sind in Business enthalten; kein SCIM (O7). Fakt | Nein; der Betrieb hat keinen Identitätsanbieter. Domainverifizierung nicht eingerichtet. Entscheidung des Betriebs, Wiedervorlage |
| Zweitfaktor | Auf den gelesenen Seiten keine Angabe zu Pflicht oder Schalter. Lücke | Nicht geprüft. Offener Punkt 2 (Regel aus Toolkit 02, Frage C3) |
| Funktionsadresse | Keine Angabe des Anbieters. Lücke; Empfehlung der Aufsicht: Konten ohne Personennamen, Funktions-E-Mail-Adresse (B1 Abschnitt 2.4, B4 Punkt 3) | Owner-Konto läuft auf einer Funktionsadresse des Büros. Mitglieder mit persönlichen Firmenadressen; keine privaten Adressen (Toolkit 01, § 1). Geprüft 4.11.2026 |

## 2. Training und Feedback

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Training mit Workspace-Daten | „By default, OpenAI does not use content from ChatGPT Business … workspaces to train its models“ (O6); „OpenAI does not train on your workspace data“ (O4); Business-Daten „excluded from training by default and … encrypted in transit and at rest“ (O5). Fakt | Voreinstellung des Anbieters, kein Schalter im Workspace nötig. Zur Kenntnis genommen 4.11.2026 |
| Feedback (Daumen hoch oder runter) | Wer Feedback gibt, dessen gesamte Unterhaltung „may be used to train OpenAI models“ (O6). Fakt | Regel des Betriebs: keine Bewertungen abgeben; in die Einweisung aufgenommen. Offener Punkt 3 (Einweisung noch nicht gehalten) |
| Ausdrückliche Freigaben (Opt-in) | Training nur, wenn der Kunde Daten ausdrücklich teilt (O1). Fakt | Keine Freigabe erteilt. Geprüft 4.11.2026 |

## 3. Verlauf, Löschung, Memory

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Verlauf | Jede Person hat ihren eigenen Chat-Verlauf; Owner und Admins sehen private Chats nicht automatisch (O4, O5). Fakt | Verlauf je Person an. Geprüft 4.11.2026 |
| Löschung durch die Person | Gelöschte oder nicht gespeicherte Unterhaltungen werden „within 30 days“ entfernt, „unless longer retention is required by law, or is reasonably necessary to protect our services or any third party from harm“ (O1). Vorgeschichte: Ein US-Gericht hatte 2025 eine Aufbewahrung angeordnet, die am 26.9.2025 endete; Daten aus dem EWR waren danach ausgenommen (O3). Fakt | Regel des Betriebs: Chats mit Angebotsdaten nach Abschluss löschen. Auslegung |
| Aufbewahrungsfrist durch den Admin | „Your workspace admins can control how long your data is retained“ (O1, Business-FAQ); im Zusagenblock derselben Seite wird Business nicht genannt; kein Hilfeartikel zeigt den Schalter. Unsicher | Nicht geprüft. Offener Punkt 4: im Workspace nachsehen, Bildschirmfoto ablegen |
| Memory | Jede Person kann Memory abschalten; Owner steuern Memory für den ganzen Workspace, Abschalten löscht die gespeicherten Memories der Mitglieder; Memories werden nicht zum Training verwendet (O8). Fakt | An (Voreinstellung). Entscheidung des Betriebs: an lassen, weil nur Datenarten ohne Personenbezug zugelassen sind (Register D2). Geprüft 4.11.2026 |
| Temporary Chat | Nicht im Verlauf, keine Memories, nicht zum Training, „may be retained for up to 30 days for safety purposes“ (O6). Fakt | Hinweis in der Einweisung: für Einmalfragen mit heiklem Inhalt. Auslegung |
| Export | Mitglieder können nicht selbst exportieren; Owner exportieren über das Menü der Person, wenn verfügbar (O4, O5). Fakt | Zur Kenntnis genommen |

## 4. Datenstandort und Unterauftragsverarbeiter

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Speicherort | Datenresidenz (Speicherung in Europa) gibt es für „new ChatGPT Enterprise/Edu customers“ und die API; Business wird nicht genannt (O11). Fakt | Keine Standortwahl möglich. Folge für das Register: personenbezogene Daten nur mit Platzhaltern (Maßstab E1). Auslegung |
| Vertragspartner und Übermittlung | EWR-Daten verarbeitet OpenAI Ireland Ltd.; Übermittlungen an Gesellschaften oder Dritte außerhalb des EWR „auf der Grundlage von Vereinbarungen, die Standardvertragsklauseln enthalten … oder einer Angemessenheitsentscheidung“ (O2). Fakt | Zur Kenntnis genommen |
| Unterauftragsverarbeiter | Liste vom 14.10.2026: Cloud-Infrastruktur unter anderem bei Microsoft (27 Länder, darunter Deutschland, Irland, Schweiz, USA), CoreWeave, Oracle, Google Cloud, AWS (USA); Support und Inhaltsmoderation unter anderem TaskUs (Philippinen) und Accenture (USA, Kanada, Philippinen); Merge API nur bei Connectoren (O12). Fakt | Zur Kenntnis genommen; Benachrichtigung siehe Abschnitt 7 |
| Was außerhalb jeder Region bleibt | Metadaten, Logins, Abrechnung und alles, was an externe Apps, MCP oder Websuche geht (O11). Fakt | Betrifft Abschnitt 5 |

## 5. Verbindungen

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Apps und Connectoren | „In ChatGPT Business, apps are enabled by default, and administrators can change workspace-wide app availability“ (Admin Console > Plugins); Google-Drive-Aktionen für Business „on by default“ (O9). Fakt | An (Voreinstellung), geprüft 4.11.2026. Entscheidung des Betriebs: alle nicht benötigten Apps abschalten. Offener Punkt 5 |
| Microsoft-Apps (Outlook, Teams, SharePoint) | Brauchen Microsoft-Graph-Berechtigungen, „that a Microsoft Entra administrator must grant for the organization“ (O9). Fakt | Keine Zustimmung erteilt; keine Verbindung zu Microsoft 365. Geprüft 4.11.2026 |
| Berechtigungsstufe der Apps | Workspace-Voreinstellung wählbar: „Always ask“, „Allow read actions“, „Allow low-risk actions“ (O9). Fakt | Nicht geprüft. Offener Punkt 5 (gemeinsam mit den Apps) |
| Websuche | Informationen an externe Dienste „handled under that provider’s own storage, processing, privacy, and data-residency terms“ (O11). Fakt | An. Hinweis in der Einweisung: keine Betriebsdaten in Suchanfragen. Auslegung |

## 6. Freigaben

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Geteilte Links | Nur für Mitglieder desselben Workspace sichtbar; Außenstehende werden umgeleitet; „Can I disable shared links entirely? No. This feature is available in ChatGPT Enterprise“ (O5). Fakt | Nicht abschaltbar. Regel des Betriebs: keine Links zu Chats mit Kunden- oder Angebotsbezug. Auslegung |
| GPTs | Mitglieder können GPTs erstellen und im Workspace teilen; öffentliche Freigabe nur, wenn Admins sie zulassen (O1). Fakt | Öffentliche Freigabe: nicht geprüft. Offener Punkt 6 |
| Projekte und Dateien | Jede Person hat eigenen Verlauf und wählt, was sie teilt (O5). Fakt | Zur Kenntnis genommen |

## 7. Vertrag

| Einstellung | Angabe des Anbieters (Fundstelle, Abruf 4.11.2026) | Stand im Betrieb |
|---|---|---|
| Geltende Bedingungen | Business „is governed by OpenAI Business Terms and the Enterprise Privacy commitments“ (O4). Fakt; Business Terms nicht gelesen. Lücke | Zur Kenntnis genommen |
| Auftragsverarbeitungsvertrag (Vertragszusatz) | OpenAI „able to execute a Data Processing Addendum … for their use of ChatGPT Business“, Formular ausfüllen (O1); der Zusatz gilt laut eigenem Text durch Klick auf „Ich stimme zu“, Annahme des Bestellformulars oder Nutzung (O2, gültig ab 1.1.2026). Unsicher, welcher Weg genügt | Angenommen durch Nutzung; Formular nicht ausgefüllt. Offener Punkt 7: Formular ausfüllen, Bestätigung im Nachweisordner ablegen |
| Konfiguration als Pflicht des Kunden | Der Kunde ist „für bestimmte Konfigurationen und Designentscheidungen … (z. B. Aufbewahrungsfristen, Löschung usw.) … verantwortlich“ (O2, 3.3). Fakt | Dieses Protokoll ist der Beleg dafür |
| Benachrichtigung über neue Unterauftragsverarbeiter | Formular zum Abonnieren auf der Liste; Widerspruch binnen dreißig Tagen (O2, 2.9; O12). Fakt | Nicht abonniert. Offener Punkt 8 |

## 8. Abweichungen und offene Punkte

| Nr. | Punkt | Wer | Bis |
|---|---|---|---|
| 1 | Workspace-Suche für die eigene Domain prüfen; Beitritt nur mit Freigabe durch Owner | Büroleitung | 18.11.2026 |
| 2 | Zweitfaktor für alle sechs Konten prüfen und in der Kontenliste eintragen | Büroleitung | 18.11.2026 |
| 3 | Einweisung: kein Feedback, Temporary Chat, keine Betriebsdaten in Suchanfragen, Löschregel | Geschäftsführung | 30.11.2026 |
| 4 | Aufbewahrungsfrist im Workspace suchen; wenn vorhanden setzen und Bildschirmfoto ablegen; wenn nicht vorhanden, Befund „kein Schalter“ eintragen | Büroleitung | 18.11.2026 |
| 5 | Nicht benötigte Apps abschalten, Berechtigungsstufe auf „Always ask“ prüfen | Büroleitung | 18.11.2026 |
| 6 | Öffentliche Freigabe von GPTs prüfen und abschalten | Büroleitung | 18.11.2026 |
| 7 | Formular zum Vertragszusatz ausfüllen, Bestätigung ablegen | Geschäftsführung | 30.11.2026 |
| 8 | Benachrichtigung über neue Unterauftragsverarbeiter abonnieren (Funktionsadresse) | Büroleitung | 18.11.2026 |

Befund für die Nachweisseite: ChatGPT Business, eingerichtet, Prüfung offen (acht Punkte mit Termin). Nächste Prüfung der Anbieterangaben durch Scutoria: Februar 2027.

Unterschrift Verantwortliche Rolle: ____________________ Datum: ____________

Quellen: O1 bis O12 im Quellenprotokoll des Toolkits, Abruf 4. November 2026; B1 Datenschutzkonferenz, Orientierungshilfe vom 6. Mai 2024, Abschnitt 2.4; B4 Hamburgischer Beauftragter für Datenschutz, Checkliste vom 13. November 2023, Punkt 3. Anbieterangaben altern; was am Tag der Prüfung im Konto anders aussieht, gilt vor diesem Protokoll.
