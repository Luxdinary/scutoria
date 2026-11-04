// Memo 3 of E11: "Where does our sign-in stand?" Three steps for a business without an IT department, built on NIST SP 800-63B-4,
// the BSI (press releases and IT-Grundschutz ORP.4), CISA's ranking of MFA methods, ENISA's SME guide and the Austrian pages,
// with the NIS2 wording on multi-factor authentication read at the original.
import { B } from '../toolkit/documents/blocks.mjs';
import { L, S, BUSINESS_Q, buildDoc } from './shared.mjs';

const SRC = {
  nist: S('NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management, July 2025, sections 3.1.1.1, 3.1.1.2 and 3.2.2 · pages.nist.gov/800-63-4/sp800-63b.html · retrieved 2026-10-19, section 3.1.1.2 · retrieved 2026-10-23', 'NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management, Juli 2025, Abschnitte 3.1.1.1, 3.1.1.2 und 3.2.2 · pages.nist.gov/800-63-4/sp800-63b.html · Abruf 2026-10-19, Abschnitt 3.1.1.2 · Abruf 2026-10-23'),
  bsiPress: S('BSI, press releases of 31 January 2025 ("Passwortwechseln war gestern") and 30 January 2026 ("Der Ändere-dein-Passwort-Tag braucht ein Update") · bsi.bund.de · retrieved 2026-10-19', 'BSI, Pressemitteilungen vom 31. Januar 2025 („Passwortwechseln war gestern“) und 30. Januar 2026 („Der Ändere-dein-Passwort-Tag braucht ein Update“) · bsi.bund.de · Abruf 2026-10-19'),
  orp: S('BSI, IT-Grundschutz-Kompendium, module ORP.4 Identity and Access Management, requirements A1, A2, A8, A22, A23, and module ORP.2 Personnel, A2, edition 2023 · bsi.bund.de · retrieved 2026-10-19', 'BSI, IT-Grundschutz-Kompendium, Baustein ORP.4 Identitäts- und Berechtigungsmanagement, Anforderungen A1, A2, A8, A22, A23, und Baustein ORP.2 Personal, A2, Edition 2023 · bsi.bund.de · Abruf 2026-10-19'),
  cisa: S('CISA, fact sheet "Implementing Phishing-Resistant MFA", October 2022, pp. 1 to 3 · cisa.gov · retrieved 2026-10-19', 'CISA, Fact Sheet „Implementing Phishing-Resistant MFA“, Oktober 2022, S. 1 bis 3 · cisa.gov · Abruf 2026-10-19'),
  figures: S('CISA, news release of 6 June 2022 and blog of 5 May 2022 · cisa.gov · retrieved 2026-10-19; Microsoft Digital Defense Report 2023 and Microsoft Research, "How effective is multifactor authentication at deterring cyberattacks?", May 2023 · microsoft.com · retrieved 2026-10-19', 'CISA, Pressemitteilung vom 6. Juni 2022 und Blog vom 5. Mai 2022 · cisa.gov · Abruf 2026-10-19; Microsoft Digital Defense Report 2023 und Microsoft Research, „How effective is multifactor authentication at deterring cyberattacks?“, Mai 2023 · microsoft.com · Abruf 2026-10-19'),
  nis2: S('Directive (EU) 2022/2555, Art. 21(2), points (g), (i) and (j) · EUR-Lex · retrieved 2026-10-19; BSI-Gesetz, § 30(2), no. 10 · gesetze-im-internet.de · retrieved 2026-10-19; NISG 2026, § 32(4), lit. j · ris.bka.gv.at · retrieved 2026-10-19', 'Richtlinie (EU) 2022/2555, Art. 21 Abs. 2 Buchst. g, i und j · EUR-Lex · Abruf 2026-10-19; BSI-Gesetz, § 30 Abs. 2 Nr. 10 · gesetze-im-internet.de · Abruf 2026-10-19; NISG 2026, § 32 Abs. 4 lit. j · ris.bka.gv.at · Abruf 2026-10-19'),
  at: S('onlinesicherheit.gv.at (Federal Chancellery and A-SIT), "Passwort-Auswahl" (updated 9 December 2025), "Passwort-Umgang" (6 February 2020), news on FIDO security keys (19 September 2023) · retrieved 2026-10-19', 'onlinesicherheit.gv.at (Bundeskanzleramt und A-SIT), „Passwort-Auswahl“ (Stand 9. Dezember 2025), „Passwort-Umgang“ (6. Februar 2020), Beitrag zu FIDO-Sicherheitsschlüsseln (19. September 2023) · Abruf 2026-10-19'),
  wko: S('WKO, "Passwörter: Die Schlüssel zu Computer und Internet", status 6 June 2016, and WKO Kärnten, "Passwort vergessen, Konto gesperrt", updated 28 January 2026 · wko.at · retrieved 2026-10-19', 'WKO, „Passwörter: Die Schlüssel zu Computer und Internet“, Stand 6. Juni 2016, und WKO Kärnten, „Passwort vergessen, Konto gesperrt“, aktualisiert 28. Jänner 2026 · wko.at · Abruf 2026-10-19'),
  enisa: S('ENISA, "Cybersecurity guide for SMEs: 12 steps to securing your business", June 2021, steps 4 and 5 and the remote-access step (step 4 · retrieved 2026-10-23); ENISA, "Cybersecurity for SMEs: Challenges and Recommendations", June 2021, pp. 36 to 37 · enisa.europa.eu · retrieved 2026-10-19', 'ENISA, „Cybersecurity guide for SMEs: 12 steps to securing your business“, Juni 2021, Schritte 4 und 5 und der Schritt zum Fernzugriff (Schritt 4 · Abruf 2026-10-23); ENISA, „Cybersecurity for SMEs: Challenges and Recommendations“, Juni 2021, S. 36 bis 37 · enisa.europa.eu · Abruf 2026-10-19'),
};

const SOURCES = S([
  'NIST Special Publication 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management, July 2025, published 1 August 2025, supersedes revision 3: sections 3.1.1.1, 3.1.1.2, 3.2.2, 4.2. pages.nist.gov/800-63-4/sp800-63b.html and doi.org/10.6028/NIST.SP.800-63B-4 · retrieved 2026-10-19.',
  'BSI, press release of 31 January 2025, "Passwortwechseln war gestern", and of 30 January 2026, "Der Ändere-dein-Passwort-Tag braucht ein Update"; consumer pages "Sichere Passwörter erstellen", "Umgang mit Passwörtern" and "Zwei-Faktor-Authentisierung" (undated). bsi.bund.de · retrieved 2026-10-19.',
  'BSI, IT-Grundschutz-Kompendium, edition 2023: ORP.4 Identitäts- und Berechtigungsmanagement (A1, A2, A8, A9, A22, A23); ORP.2 Personal (A2). bsi.bund.de · retrieved 2026-10-19. Edition 2023 is the latest full edition; the BSI is introducing IT-Grundschutz++ (to be checked at bsi.bund.de; heise, "IT-Grundschutz++", and SVA, flyer 2026 · retrieved 2026-10-23).',
  'CISA, fact sheet "Implementing Phishing-Resistant MFA", October 2022; news release of 6 June 2022, "More Than a Password" campaign; blog "Walk this way to enable MFA", 5 May 2022. cisa.gov · retrieved 2026-10-19.',
  'Microsoft, Digital Defense Report 2023 (reporting period July 2022 to June 2023); Microsoft Research, "How effective is multifactor authentication at deterring cyberattacks?", May 2023; Microsoft Security Blog, 20 August 2019. microsoft.com · retrieved 2026-10-19.',
  'ENISA, "Cybersecurity guide for SMEs: 12 steps to securing your business", June 2021, and "Cybersecurity for SMEs: Challenges and Recommendations", June 2021. enisa.europa.eu · retrieved 2026-10-19.',
  'Austria: onlinesicherheit.gv.at, "Passwort-Auswahl" (9 December 2025), "Passwort-Umgang" (6 February 2020), "Mehrfaktor-Authentifizierung" (6 October 2020), news on FIDO security keys (19 September 2023); WKO, "Mehr Sicherheit durch Mehr-Faktor-Authentifizierung" (12 September 2022), "Passwörter: Die Schlüssel zu Computer und Internet" (6 June 2016), WKO Kärnten news of 28 January 2026. retrieved 2026-10-19.',
  'Directive (EU) 2022/2555 (NIS 2), Art. 21(2). eur-lex.europa.eu · retrieved 2026-10-19. Germany: BSI-Gesetz of 2 December 2025, § 30(2). gesetze-im-internet.de · retrieved 2026-10-19. Austria: NISG 2026, BGBl. I No. 94/2025, § 32(4), in force since 1 October 2026. ris.bka.gv.at · retrieved 2026-10-19.',
], [
  'NIST Special Publication 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management, Juli 2025, veröffentlicht am 1. August 2025, ersetzt Revision 3: Abschnitte 3.1.1.1, 3.1.1.2, 3.2.2, 4.2. pages.nist.gov/800-63-4/sp800-63b.html und doi.org/10.6028/NIST.SP.800-63B-4 · Abruf 2026-10-19.',
  'BSI, Pressemitteilung vom 31. Januar 2025, „Passwortwechseln war gestern“, und vom 30. Januar 2026, „Der Ändere-dein-Passwort-Tag braucht ein Update“; Verbraucherseiten „Sichere Passwörter erstellen“, „Umgang mit Passwörtern“ und „Zwei-Faktor-Authentisierung“ (undatiert). bsi.bund.de · Abruf 2026-10-19.',
  'BSI, IT-Grundschutz-Kompendium, Edition 2023: ORP.4 Identitäts- und Berechtigungsmanagement (A1, A2, A8, A9, A22, A23); ORP.2 Personal (A2). bsi.bund.de · Abruf 2026-10-19. Die Edition 2023 ist die letzte Vollausgabe; das BSI führt IT-Grundschutz++ ein (Stand prüfen auf bsi.bund.de; heise, „IT-Grundschutz++“, und SVA, Flyer 2026 · Abruf 2026-10-23).',
  'CISA, Fact Sheet „Implementing Phishing-Resistant MFA“, Oktober 2022; Pressemitteilung vom 6. Juni 2022 zur Kampagne „More Than a Password“; Blog „Walk this way to enable MFA“, 5. Mai 2022. cisa.gov · Abruf 2026-10-19.',
  'Microsoft, Digital Defense Report 2023 (Berichtszeitraum Juli 2022 bis Juni 2023); Microsoft Research, „How effective is multifactor authentication at deterring cyberattacks?“, Mai 2023; Microsoft Security Blog, 20. August 2019. microsoft.com · Abruf 2026-10-19.',
  'ENISA, „Cybersecurity guide for SMEs: 12 steps to securing your business“, Juni 2021, und „Cybersecurity for SMEs: Challenges and Recommendations“, Juni 2021. enisa.europa.eu · Abruf 2026-10-19.',
  'Österreich: onlinesicherheit.gv.at, „Passwort-Auswahl“ (9. Dezember 2025), „Passwort-Umgang“ (6. Februar 2020), „Mehrfaktor-Authentifizierung“ (6. Oktober 2020), Beitrag zu FIDO-Sicherheitsschlüsseln (19. September 2023); WKO, „Mehr Sicherheit durch Mehr-Faktor-Authentifizierung“ (12. September 2022), „Passwörter: Die Schlüssel zu Computer und Internet“ (6. Juni 2016), WKO Kärnten, Beitrag vom 28. Jänner 2026. Abruf 2026-10-19.',
  'Richtlinie (EU) 2022/2555 (NIS 2), Art. 21 Abs. 2. eur-lex.europa.eu · Abruf 2026-10-19. Deutschland: BSI-Gesetz vom 2. Dezember 2025, § 30 Abs. 2. gesetze-im-internet.de · Abruf 2026-10-19. Österreich: NISG 2026, BGBl. I Nr. 94/2025, § 32 Abs. 4, in Kraft seit 1. Oktober 2026. ris.bka.gv.at · Abruf 2026-10-19.',
]);

const YPNU = (en, de) => [
  { v: 'yes', label: S('Yes', 'Ja') },
  { v: 'partly', label: S(en, de) },
  { v: 'no', label: S('No', 'Nein') },
  { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
];

export const login = {
  id: 'login',
  pathKey: 'memoLogin',
  toolkit: 'security',
  sourcesDate: '2026-10-19',
  sourcesUpdated: '2026-10-23',
  title: S('Where does our sign-in stand?', 'Wo steht unsere Anmeldung?'),
  teaser: S('Multi-factor authentication, passwords, shared accounts, leavers, recovery: eight questions, then the three steps that come first, with NIST, BSI, CISA and ENISA as sources.', 'Multi-Faktor-Authentifizierung, Passwörter, geteilte Konten, Austritte, Wiederherstellung: acht Fragen, dann die drei Schritte, die zuerst kommen, mit NIST, BSI, CISA und ENISA als Quellen.'),
  description: S('Free memo generator: eight questions on multi-factor authentication, passwords and accounts, then a dated memo with the three steps that come first for a business without an IT department, sourced from NIST SP 800-63B, the BSI, CISA and ENISA. By Scutoria.', 'Freier Memo-Generator: acht Fragen zu Multi-Faktor-Authentifizierung, Passwörtern und Konten, dann ein datiertes Memo mit den drei Schritten, die für einen Betrieb ohne IT-Abteilung zuerst kommen, belegt mit NIST SP 800-63B, BSI, CISA und ENISA. Von Scutoria.'),
  lead: S('Many break-ins start with a sign-in: a guessed or stolen password, no second factor, an account that still works after someone left. Eight questions, then a memo with the three steps that come first, every statement with its source.', 'Viele Einbrüche beginnen mit einer Anmeldung: ein erratenes oder gestohlenes Passwort, kein zweiter Faktor, ein Konto, das nach dem Austritt noch funktioniert. Acht Fragen, dann ein Memo mit den drei Schritten, die zuerst kommen, jede Aussage mit Quelle.'),
  questions: [
    BUSINESS_Q,
    { key: 'mfaMail', type: 'radio', label: S('Is multi-factor authentication switched on for every email account (Microsoft 365, Google Workspace, other)?', 'Ist die Multi-Faktor-Authentifizierung für jedes E-Mail-Konto eingeschaltet (Microsoft 365, Google Workspace, andere)?'), short: S('MFA on email', 'MFA bei E-Mail'), options: YPNU('For some accounts', 'Für manche Konten') },
    { key: 'mfaAdmin', type: 'radio', label: S('Is it switched on for admin accounts, remote access (VPN, remote desktop), online banking, the web shop and cloud consoles?', 'Ist sie für Administratorkonten, Fernzugriff (VPN, Remote Desktop), Online-Banking, den Webshop und Cloud-Konsolen eingeschaltet?'), short: S('MFA on admin and remote access', 'MFA bei Administration und Fernzugriff'), options: YPNU('For some of them', 'Für manche davon') },
    { key: 'method', type: 'radio', label: S('Which second factor is used most?', 'Welcher zweite Faktor wird am meisten verwendet?'), short: S('Second factor', 'Zweiter Faktor'), options: [
      { v: 'fido', label: S('A security key or a passkey', 'Ein Sicherheitsschlüssel oder ein Passkey') },
      { v: 'app', label: S('An authenticator app, or a push notification with number matching', 'Eine Authenticator-App, oder eine Push-Benachrichtigung mit Zahlenabgleich') },
      { v: 'sms', label: S('A code by SMS, voice call or email', 'Ein Code per SMS, Anruf oder E-Mail') },
      { v: 'none', label: S('None, or we do not know', 'Keiner, oder wir wissen es nicht') },
    ] },
    { key: 'manager', type: 'radio', label: S('Does everyone use a password manager, so that every account has its own long password?', 'Nutzen alle einen Passwort-Manager, sodass jedes Konto ein eigenes langes Passwort hat?'), short: S('Password manager', 'Passwort-Manager'), options: YPNU('Some do', 'Manche') },
    { key: 'shared', type: 'radio', label: S('Are there shared accounts, one login used by several people?', 'Gibt es geteilte Konten, ein Login für mehrere Personen?'), short: S('Shared accounts', 'Geteilte Konten'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'no', label: S('No', 'Nein') },
      { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
    ] },
    { key: 'rules', type: 'radio', label: S('What are the password rules?', 'Wie lauten die Passwortregeln?'), short: S('Password rules', 'Passwortregeln'), options: [
      { v: 'length', label: S('Long passwords, at least 12 to 15 characters, changed only when there is a suspicion', 'Lange Passwörter, mindestens 12 bis 15 Zeichen, nur bei Verdacht geändert') },
      { v: 'rotation', label: S('A forced change every 30 to 90 days', 'Ein erzwungener Wechsel alle 30 bis 90 Tage') },
      { v: 'none', label: S('No rules', 'Keine Regeln') },
      { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
    ] },
    { key: 'offboarding', type: 'radio', label: S('When someone leaves, are their accounts disabled the same day, from a list of all accounts?', 'Werden beim Austritt einer Person ihre Konten am selben Tag deaktiviert, anhand einer Liste aller Konten?'), short: S('Leavers', 'Austritte'), options: YPNU('Usually, without a list', 'Meist, ohne Liste') },
    { key: 'recovery', type: 'radio', label: S('Do you know how you would regain access to the main admin account if the phone or the administrator were unavailable, with recovery codes kept offline?', 'Wissen Sie, wie Sie wieder an das wichtigste Administratorkonto kämen, wenn das Telefon oder die Administratorin ausfällt, mit offline aufbewahrten Wiederherstellungscodes?'), short: S('Recovery', 'Wiederherstellung'), options: [
      { v: 'yes', label: S('Yes', 'Ja') },
      { v: 'no', label: S('No', 'Nein') },
      { v: 'unknown', label: S('We do not know', 'Wir wissen es nicht') },
    ] },
  ],

  evaluate(answers, lang, date) {
    const t = L(lang);
    const a = answers;
    const bad = (v) => v === 'no' || v === 'unknown';

    // The three steps and where the business stands on each.
    const mfaStatus = bad(a.mfaMail) || bad(a.mfaAdmin) ? 'open' : (a.mfaMail === 'partly' || a.mfaAdmin === 'partly' || a.method === 'sms' || a.method === 'none') ? 'warn' : 'ok';
    const pwStatus = a.shared === 'yes' || (a.manager !== 'yes' && a.rules !== 'length') ? 'open' : (a.manager !== 'yes' || a.rules !== 'length' || a.shared === 'unknown') ? 'warn' : 'ok';
    const acctStatus = bad(a.offboarding) ? 'open' : (a.offboarding !== 'yes' || a.recovery !== 'yes') ? 'warn' : 'ok';
    const statuses = [mfaStatus, pwStatus, acctStatus];
    const level = statuses.includes('open') ? 'red' : statuses.includes('warn') ? 'amber' : 'green';
    const word = (s) => (s === 'ok' ? t('Done', 'Erledigt') : s === 'warn' ? t('Partly', 'Teilweise') : t('Open', 'Offen'));

    const status = [
      { label: t('Step 1: a second factor on every account that matters', 'Schritt 1: ein zweiter Faktor auf jedem Konto, das zählt'), status: mfaStatus, detail: mfaStatus === 'ok' ? t('Email, admin and remote access are covered with an app or a security key.', 'E-Mail, Administration und Fernzugriff haben einen zweiten Faktor per App oder Sicherheitsschlüssel.') : mfaStatus === 'warn' ? t('Gaps remain, or the second factor is a code by SMS or email.', 'Es bleiben Lücken, oder der zweite Faktor ist ein Code per SMS oder E-Mail.') : t('Email or admin accounts without a second factor, or nobody knows.', 'E-Mail- oder Administratorkonten ohne zweiten Faktor, oder niemand weiß es.') },
      { label: t('Step 2: one long password per account, kept by a password manager', 'Schritt 2: ein langes Passwort je Konto, verwaltet von einem Passwort-Manager'), status: pwStatus, detail: pwStatus === 'ok' ? t('Password manager for everyone, length instead of forced changes, no shared logins.', 'Passwort-Manager für alle, Länge statt erzwungener Wechsel, keine geteilten Logins.') : pwStatus === 'warn' ? t('Partly: the manager, the rule or the shared logins are not settled.', 'Teilweise: Manager, Regel oder geteilte Logins sind nicht geklärt.') : t('Shared logins, or neither a password manager nor a length rule.', 'Geteilte Logins, oder weder Passwort-Manager noch Längenregel.') },
      { label: t('Step 3: one account per person, leavers off the same day, recovery tested', 'Schritt 3: ein Konto je Person, Austritte am selben Tag, Wiederherstellung geprobt'), status: acctStatus, detail: acctStatus === 'ok' ? t('List of accounts, same-day offboarding, recovery codes offline.', 'Kontenliste, Deaktivierung am Austrittstag, Wiederherstellungscodes offline.') : acctStatus === 'warn' ? t('Offboarding or recovery is not settled.', 'Austritte oder Wiederherstellung sind nicht geklärt.') : t('Accounts of leavers are not disabled the same day, or nobody knows.', 'Konten ausgetretener Personen werden nicht am selben Tag deaktiviert, oder niemand weiß es.') },
    ].map((i) => ({ ...i, word: word(i.status) }));
    const extra = [B.h(t('Where you stand', 'Wo Sie stehen')), B.status(status)];

    const verdict = {
      level,
      title: level === 'red' ? t('At least one of the three first steps is open.', 'Mindestens einer der drei ersten Schritte ist offen.') : level === 'amber' ? t('Halfway: the three steps are started, not finished.', 'Halb geschafft: Die drei Schritte sind begonnen, nicht fertig.') : t('The three first steps are in place. Keep them dated.', 'Die drei ersten Schritte sind umgesetzt. Halten Sie das datiert fest.'),
      text: t(`Step 1 ${word(mfaStatus).toLowerCase()}, step 2 ${word(pwStatus).toLowerCase()}, step 3 ${word(acctStatus).toLowerCase()}. The three steps are what the authorities cited below recommend first and what security questionnaires from customers and insurers ask about.`, `Schritt 1 ${word(mfaStatus).toLowerCase()}, Schritt 2 ${word(pwStatus).toLowerCase()}, Schritt 3 ${word(acctStatus).toLowerCase()}. Die drei Schritte sind das, was die unten genannten Stellen zuerst empfehlen, und das, wonach Sicherheitsfragebögen von Kunden und Versicherern fragen.`),
    };

    const findings = [];
    findings.push({ kind: 'fact', text: t(
      'The US standards body NIST published revision 4 of its Digital Identity Guidelines in July 2025; it supersedes revision 3. For passwords it requires: a minimum of 15 characters where the password is the only factor, and at least 8 characters where it is part of multi-factor authentication; no other composition rules such as required mixtures of character types; no periodic change, but a forced change where there is evidence of compromise; a check of every new password against a blocklist of commonly used, expected or compromised passwords; and that password managers and autofill are allowed; it recommends allowing paste. Failed attempts are rate-limited.',
      'Die US-Normungsstelle NIST hat im Juli 2025 die Revision 4 ihrer Digital Identity Guidelines veröffentlicht; sie ersetzt die Revision 3. Für Passwörter verlangt sie: mindestens 15 Zeichen, wenn das Passwort der einzige Faktor ist, und mindestens 8 Zeichen, wenn es Teil einer Multi-Faktor-Authentifizierung ist; keine weiteren Kompositionsregeln wie vorgeschriebene Mischungen von Zeichenarten; keinen regelmäßigen Wechsel, aber einen erzwungenen Wechsel bei Hinweisen auf eine Kompromittierung; eine Prüfung jedes neuen Passworts gegen eine Sperrliste häufig benutzter, erwartbarer oder kompromittierter Passwörter; und dass Passwort-Manager und automatisches Ausfüllen erlaubt sind; Einfügen zu erlauben, empfiehlt sie. Fehlversuche werden begrenzt.',
    ), source: SRC.nist[lang] });
    findings.push({ kind: 'fact', text: t(
      'The German Federal Office for Information Security (BSI) writes that the advice to change passwords regularly is outdated: regular changes without a reason lead to weaker passwords, and employers should neither demand nor technically enforce them. A password is changed when there is a suspicion that it has leaked. Instead the BSI recommends strong passwords, a second factor or passkeys, and a password manager. Its IT-Grundschutz module ORP.4 requires that every user identifier can be attributed to one person, that unneeded identifiers and permissions are removed on personnel changes, that a password is never used for more than one system, that systems ask for a change only with a valid reason and avoid purely time-driven changes, and that a written copy exists only for an emergency and is kept securely.',
      'Das Bundesamt für Sicherheit in der Informationstechnik (BSI) schreibt, dass der Rat zum regelmäßigen Passwortwechsel überholt ist: Regelmäßige, anlassunabhängige Wechsel führen erfahrungsgemäß zu schwächeren Passwörtern, und Arbeitgeber sollten sie weder fordern noch technisch erzwingen. Ein Passwort wird geändert, wenn der Verdacht besteht, dass es abgeflossen ist. Stattdessen empfiehlt das BSI starke Passwörter, einen zweiten Faktor oder Passkeys und einen Passwort-Manager. Sein IT-Grundschutz-Baustein ORP.4 verlangt, dass jede Benutzerkennung eindeutig einer Person zugeordnet werden kann, dass bei personellen Veränderungen nicht mehr benötigte Kennungen und Berechtigungen entfernt werden, dass ein Passwort nie mehrfach verwendet wird, dass Systeme nur mit validem Grund zum Wechsel auffordern und rein zeitgesteuerte Wechsel vermeiden, und dass eine schriftliche Hinterlegung nur für den Notfall existiert und sicher aufbewahrt wird.',
    ), source: `${SRC.bsiPress[lang]}; ${SRC.orp[lang]}` });
    findings.push({ kind: 'fact', text: t(
      'The US cybersecurity agency CISA ranks the forms of multi-factor authentication from strongest to weakest: phishing-resistant methods (FIDO/WebAuthn security keys and passkeys, PKI); app-based one-time codes, push notifications with number matching and hardware tokens; push notifications without number matching; and codes by SMS or voice call, which are vulnerable to phishing, SS7 and SIM-swap attacks and should be used only as a last resort. For small and medium businesses that cannot implement phishing-resistant MFA at once, CISA names app- or token-based codes and push with number matching as the best options. In June 2022 CISA\'s director said that multi-factor authentication can make you 99 % less likely to get hacked; a Microsoft study of real attack data found that it reduces the risk of compromise by 99.2 %.',
      'Die US-Cybersicherheitsbehörde CISA ordnet die Formen der Multi-Faktor-Authentifizierung von stark nach schwach: phishing-resistente Verfahren (FIDO/WebAuthn-Sicherheitsschlüssel und Passkeys, PKI); App-basierte Einmalcodes, Push-Benachrichtigungen mit Zahlenabgleich und Hardware-Token; Push-Benachrichtigungen ohne Zahlenabgleich; und Codes per SMS oder Anruf, die für Phishing, SS7- und SIM-Swap-Angriffe anfällig sind und nur als letzte Möglichkeit verwendet werden sollten. Für kleine und mittlere Betriebe, die phishing-resistente MFA nicht sofort umsetzen können, nennt CISA App- oder Token-Codes und Push mit Zahlenabgleich als beste Optionen. Im Juni 2022 sagte die Direktorin der CISA, Multi-Faktor-Authentifizierung mache es um 99 % unwahrscheinlicher, gehackt zu werden; eine Microsoft-Studie mit echten Angriffsdaten fand, dass sie das Risiko einer Kompromittierung um 99,2 % senkt.',
    ), source: `${SRC.cisa[lang]}; ${SRC.figures[lang]}` });
    findings.push({ kind: 'fact', text: t(
      'ENISA\'s guide for small and medium businesses encourages a passphrase of at least three random common words; for ordinary passwords it still suggests mixed character types, which NIST no longer requires. It asks never to reuse or share passwords, to enable multi-factor authentication, to use a dedicated password manager, to enforce strong passwords and where possible MFA for remote access, and to revoke an employee\'s access to business systems when they leave.',
      'Der Leitfaden der ENISA für kleine und mittlere Betriebe empfiehlt eine Passphrase aus mindestens drei zufälligen Wörtern; für gewöhnliche Passwörter rät er weiter zu gemischten Zeichenarten, die NIST nicht mehr verlangt. Er verlangt, Passwörter nie wiederzuverwenden oder zu teilen, die Multi-Faktor-Authentifizierung zu aktivieren, einen eigenen Passwort-Manager zu nutzen, für den Fernzugriff starke Passwörter und möglichst MFA zu erzwingen, und dass der Zugang von Beschäftigten zu den Systemen beim Austritt entzogen wird.',
    ), source: SRC.enisa[lang] });
    findings.push({ kind: 'fact', text: t(
      'The Austrian portal onlinesicherheit.gv.at recommends at least twelve characters for normal accounts and longer passwords or additional authentication for accounts with special rights, at least twenty characters for wireless networks and encrypted files, a change whenever there is a suspicion that a password became known to others, and password managers; it describes security keys as an effective measure against phishing and man-in-the-middle attacks. A WKO page of 2016 still online recommends eight characters and a change every three to six months; the WKO\'s own news of January 2026 says the opposite: length matters, at least twelve characters, change only on a concrete suspicion.',
      'Das österreichische Portal onlinesicherheit.gv.at empfiehlt mindestens zwölf Zeichen für normale Konten und längere Passwörter oder zusätzliche Authentifizierung für Konten mit besonderen Rechten, mindestens zwanzig Zeichen für WLAN und verschlüsselte Dateien, einen Wechsel bei jedem Verdacht, dass ein Passwort anderen bekannt wurde, und Passwort-Manager; Sicherheitsschlüssel beschreibt es als wirksame Maßnahme gegen Phishing und Man-in-the-Middle-Angriffe. Eine noch online stehende WKO-Seite von 2016 empfiehlt acht Zeichen und einen Wechsel alle drei bis sechs Monate; die eigene WKO-Meldung vom Jänner 2026 sagt das Gegenteil: Länge zählt, mindestens zwölf Zeichen, Wechsel nur bei konkretem Verdacht.',
    ), source: `${SRC.at[lang]}; ${SRC.wko[lang]}` });
    findings.push({ kind: 'fact', text: t(
      'For businesses covered by NIS 2, the measures must include basic cyber hygiene and cybersecurity training, access control policies, and the use of multi-factor or continuous authentication where appropriate. Germany and Austria wrote this wording into their laws.',
      'Für Betriebe, die unter NIS 2 fallen, müssen die Maßnahmen grundlegende Cyberhygiene und Schulungen, Konzepte für die Zugriffskontrolle und die Verwendung von Multi-Faktor- oder kontinuierlicher Authentifizierung umfassen, soweit angemessen. Deutschland und Österreich haben diesen Wortlaut in ihre Gesetze übernommen.',
    ), source: SRC.nis2[lang] });

    if (a.shared === 'yes') findings.push({ kind: 'interpretation', text: t(
      'A shared login cannot be attributed to a person, cannot bind a second factor to one phone, and keeps working after someone has left. Replace it with one account per person and delegated access to the shared mailbox or system; where a tool allows only one login, keep the password in the password manager with a named owner and change it at every departure.',
      'Ein geteiltes Login lässt sich keiner Person zuordnen, kann keinen zweiten Faktor an ein Telefon binden und funktioniert nach einem Austritt weiter. Ersetzen Sie es durch ein Konto je Person und delegierten Zugriff auf das gemeinsame Postfach oder System; wo ein Tool nur ein Login erlaubt, liegt das Passwort mit benannter verantwortlicher Person im Passwort-Manager und wird bei jedem Austritt geändert.',
    ) });
    if (a.rules === 'rotation') findings.push({ kind: 'interpretation', text: t(
      'Your forced change every 30 to 90 days is the rule that NIST and the BSI advise against: it produces predictable variations. Replace it with length, the blocklist check and the second factor, and change a password when there is a suspicion.',
      'Ihr erzwungener Wechsel alle 30 bis 90 Tage ist die Regel, von der NIST und BSI abraten: Sie erzeugt vorhersehbare Varianten. Ersetzen Sie sie durch Länge, die Sperrlistenprüfung und den zweiten Faktor, und ändern Sie ein Passwort bei Verdacht.',
    ) });
    if (a.method === 'sms') findings.push({ kind: 'interpretation', text: t(
      'A code by SMS or email is better than no second factor, but it is the weakest form; move email and admin accounts to an authenticator app or a security key first, and keep SMS as the fallback.',
      'Ein Code per SMS oder E-Mail ist besser als kein zweiter Faktor, aber die schwächste Form; stellen Sie zuerst E-Mail- und Administratorkonten auf eine Authenticator-App oder einen Sicherheitsschlüssel um, und behalten Sie SMS als Rückfallweg.',
    ) });
    if (a.recovery !== 'yes') findings.push({ kind: 'interpretation', text: t(
      'Multi-factor authentication without a tested recovery locks the business out when a phone is lost or the administrator is unavailable. Recovery codes printed and kept offline, a second administrator, and a dated test of the procedure are part of the same step.',
      'Multi-Faktor-Authentifizierung ohne geprobte Wiederherstellung sperrt den Betrieb aus, wenn ein Telefon verloren geht oder die Administratorin ausfällt. Ausgedruckte, offline aufbewahrte Wiederherstellungscodes, eine zweite Administratorin und ein datierter Test des Verfahrens gehören zum selben Schritt.',
    ) });
    findings.push({ kind: 'gap', text: t(
      'No source read gives a legal minimum for the sign-in security of a business outside NIS 2. The standards above are what the authorities recommend and what security questionnaires ask; a contract with a customer or an insurer may demand more.',
      'Keine gelesene Quelle nennt ein gesetzliches Mindestmaß für die Anmeldesicherheit eines Betriebs außerhalb von NIS 2. Die Maßstäbe oben sind das, was die Behörden empfehlen und wonach Sicherheitsfragebögen fragen; ein Vertrag mit einem Kunden oder Versicherer kann mehr verlangen.',
    ) });
    findings.push({ kind: 'uncertain', text: t(
      'The BSI consumer pages carry no date; the IT-Grundschutz module read is from edition 2023, the latest full edition; the BSI is introducing IT-Grundschutz++ (to be checked at bsi.bund.de). CISA does not name the research behind its 99 % figure; the figure is reported as its statement, not as a measurement of this memo.',
      'Die Verbraucherseiten des BSI tragen kein Datum; der gelesene IT-Grundschutz-Baustein stammt aus der Edition 2023, der letzten Vollausgabe; das BSI führt IT-Grundschutz++ ein (Stand prüfen auf bsi.bund.de). CISA nennt die Forschung hinter seiner 99-%-Zahl nicht; die Zahl wird als dessen Aussage wiedergegeben, nicht als Messung dieses Memos.',
    ) });

    const steps = [];
    steps.push(mfaStatus === 'ok'
      ? t('Keep the second factor on every account that matters, and move any remaining SMS codes to an app or a security key.', 'Lassen Sie den zweiten Faktor auf jedem Konto, das zählt, und stellen Sie verbliebene SMS-Codes auf App oder Sicherheitsschlüssel um.')
      : t('This week: switch on multi-factor authentication for every email account and every admin, remote, banking, shop and cloud account; use an authenticator app or a security key, SMS only as a last resort.', 'Diese Woche: Multi-Faktor-Authentifizierung für jedes E-Mail-Konto und jedes Administrator-, Fernzugriffs-, Banking-, Shop- und Cloud-Konto einschalten; Authenticator-App oder Sicherheitsschlüssel, SMS nur als letzte Möglichkeit.'));
    steps.push(pwStatus === 'ok'
      ? t('Keep the rule: one long password per account in the password manager, changed on suspicion, checked against breach lists.', 'Behalten Sie die Regel: ein langes Passwort je Konto im Passwort-Manager, bei Verdacht geändert, gegen Leck-Listen geprüft.')
      : t('Roll out a password manager for everyone; one long password per account, 15 characters or more where there is no second factor; at least 12 elsewhere (onlinesicherheit.gv.at; NIST sets 8 as the floor with MFA); no forced rotation; change on suspicion; no shared logins.', 'Führen Sie einen Passwort-Manager für alle ein; ein langes Passwort je Konto, 15 Zeichen oder mehr ohne zweiten Faktor; sonst mindestens 12 (onlinesicherheit.gv.at; NIST setzt mit MFA 8 als Untergrenze); kein erzwungener Wechsel; Änderung bei Verdacht; keine geteilten Logins.'));
    steps.push(acctStatus === 'ok'
      ? t('Keep the list of accounts current and test the admin recovery once a year.', 'Halten Sie die Kontenliste aktuell und proben Sie die Wiederherstellung des Administratorkontos einmal im Jahr.')
      : t('Write a list of all accounts and who holds them; an offboarding checklist that disables accounts the same day; recovery codes printed and kept offline; a second administrator; a dated test of the recovery.', 'Schreiben Sie eine Liste aller Konten und wer sie hat; eine Austrittscheckliste, die Konten am selben Tag deaktiviert; ausgedruckte, offline aufbewahrte Wiederherstellungscodes; eine zweite Administratorin; ein datierter Test der Wiederherstellung.'));
    steps.push(t('Write the three steps down as a one-page sign-in rule and keep a dated note of what was switched on when; this is the evidence a questionnaire asks for.', 'Schreiben Sie die drei Schritte als einseitige Anmelderegel auf und halten Sie datiert fest, was wann eingeschaltet wurde; das ist der Nachweis, nach dem ein Fragebogen fragt.'));

    const pointer = t('The Security Evidence Toolkit turns these steps and the other measures a customer or insurer asks about into a self-declaration, an action plan and an emergency card: scutoria.com/toolkits/security-evidence.', 'Das Sicherheitsnachweis-Toolkit macht aus diesen Schritten und den weiteren Maßnahmen, nach denen Kunden oder Versicherer fragen, eine Selbstauskunft, einen Maßnahmenplan und eine Notfallkarte: scutoria.com/de/toolkits/sicherheitsnachweis.');
    const doc = buildDoc({ memo: login, lang, answers: a, date, verdict, findings, steps, pointer, sources: SOURCES[lang], extra });
    return { level, title: verdict.title, text: verdict.text, steps, doc, statuses };
  },
};
