// Two languages, English first. URLs: English at /, German under /de/.
export const languages = ['en', 'de'];

export const paths = {
  home: { en: '/', de: '/de/' },
  legal: { en: '/legal', de: '/de/impressum' },
  privacy: { en: '/privacy', de: '/de/datenschutz' },
  terms: { en: '/terms', de: '/de/agb' },
  withdrawal: { en: '/withdrawal', de: '/de/widerruf' },
  about: { en: '/about', de: '/de/ueber' },
  waitlist: { en: '/waitlist', de: '/de/warteliste' },
  account: { en: '/account', de: '/de/konto' },
  login: { en: '/account/login', de: '/de/konto/anmelden' },
  logout: { en: '/account/logout', de: '/de/konto/abmelden' },
  invoices: { en: '/account/invoices', de: '/de/konto/rechnungen' },
  checkoutSuccess: { en: '/checkout/success', de: '/de/kasse/erfolg' },
  checkoutTest: { en: '/checkout/test', de: '/de/kasse/test' },
  tools: { en: '/tools', de: '/de/tools' },
  toolIn: { en: '/tools/may-this-go-in', de: '/de/tools/darf-das-hinein' },
  toolPersonal: { en: '/tools/anything-personal', de: '/de/tools/etwas-persoenliches' },
  memos: { en: '/memos', de: '/de/memos' },
  memoNis2: { en: '/memos/nis2', de: '/de/memos/nis2' },
  memoLabelling: { en: '/memos/ai-labelling', de: '/de/memos/ki-kennzeichnung' },
  memoLogin: { en: '/memos/sign-in-security', de: '/de/memos/anmeldesicherheit' },
  memoStart: { en: '/memos/where-to-start', de: '/de/memos/wo-anfangen' },
  library: { en: '/library', de: '/de/bibliothek' },
  studio: { en: '/studio', de: '/de/studio' },
  withdraw: { en: '/withdraw', de: '/de/vertrag-widerrufen' },
};

export const strings = {
  en: {
    nav: { products: 'Products', tools: 'Tools', access: 'Account', discover: 'Discover', library: 'Library', studio: 'Studio', account: 'Account', menu: 'Menu', main: 'Main navigation', motionOn: 'Motion: on', motionOff: 'Motion: off' },
    preview: 'Preview',
    draft: 'Draft. This text has not yet been legally reviewed.',
    footer: { about: 'About', legal: 'Legal notice', privacy: 'Privacy', terms: 'Terms', withdrawal: 'Withdrawal', withdraw: 'Withdraw from contract', tag: 'Source-based. No legal advice.', toolkits: 'Toolkits', knowledge: 'Knowledge', memos: 'Memos', handbook: 'Handbook', account: 'Account', legalHead: 'Legal' },
    switchTo: 'Deutsch',
    home: {
      kicker: 'Security · Business · AI',
      lead: 'For businesses without an IT department: the documents a customer, an insurer or your own staff ask for, generated from your answers, sourced and dated.',
      lines: [
        { key: 'policy', title: 'AI Policy Toolkit', text: 'Usage policy, tool register, training evidence, labelling check and an evidence page. Thirty-four questions, 29 of them required, one dated document set.' },
        { key: 'security', title: 'Security Evidence Toolkit', text: 'The security questionnaire from your major customer or insurer, answered honestly: self-declaration, action plan, emergency card.' },
        { key: 'setup', title: 'AI Setup Toolkit', text: 'Claude, ChatGPT and Microsoft 365 Copilot set up so that nothing leaves the business unnoticed. Setup record and data-flow register.' },
      ],
      waitlist: { title: 'Hear about the next toolkit', text: 'One email when the next toolkit is available. No newsletter unless you ask for it.', label: 'Your email address', consent: 'I agree that Scutoria stores my address to send this one notice. Details in the privacy notice.', button: 'Notify me', thanks: 'Thank you. You will hear from us once, when the next toolkit is available.', error: 'Please enter a valid email address and tick the consent box.', failed: 'Your address could not be saved. Please try again in a minute.' },
    },
    account: {
      title: 'Your account', lead: 'Sign in with your email address. We send a link; there is no password.',
      emailLabel: 'Email address', sendLink: 'Send sign-in link',
      sent: 'If an account exists for this address, a sign-in link is on its way. It is valid for thirty minutes.',
      sentPreview: 'Preview: no mail service is configured, so the link is shown here.',
      invalid: 'This link is no longer valid. Request a new one.',
      limit: 'Too many requests for this address. Please try again in an hour.',
      signedInAs: 'Signed in as', logout: 'Sign out',
      licences: 'Your licences', noLicence: 'No licence yet.', buy: 'Buy the AI Policy Toolkit', validUntil: 'valid until', pilot: 'founder price', invoices: 'Invoices and receipts',
      noPortal: 'Invoices are available once a purchase through Stripe exists.',
      folder: 'Evidence folder', folderText: 'Every run of the generator and every frozen version. Frozen versions keep their date and their wording; the live run keeps changing with your answers.',
      newRun: 'Start a new run', needLicence: 'A licence is needed to start the generator.',
      cols: ['Business', 'Created', 'Last changed', ''], continue: 'Continue', documents: 'Documents', freeze: 'Freeze this version',
      versions: 'Frozen versions', versionOf: 'Version of', toolkitVersion: 'toolkit version', updated: 'The toolkit has been updated since this version; a new run uses the current templates.', current: 'current',
      none: 'No runs yet.', frozenNote: 'Frozen version: the answers no longer change. Documents carry the date of freezing.',
    },
    shop: {
      price: 'Annual licence', pilotPrice: (n) => `Founder price for the first ten buyers, ${n} left`, regular: 'per year, twelve months, no automatic renewal',
      buy: 'Buy annual licence', buyNote: 'Payment through Stripe. Access starts immediately after payment.',
      start: 'Start the generator', needLicence: 'The generator needs a licence. Buy one, or sign in if you already have one.', signIn: 'Sign in',
      unavailable: 'The checkout is not configured yet. Please try again later.',
      consent: 'I agree to the terms and request that access to the digital content starts immediately. I know that I thereby lose my right of withdrawal.',
      successTitle: 'Thank you. Your licence is active.', successText: (email) => `We sent the sign-in link to ${email}. The link is valid for seven days; you can request a new one on the account page at any time.`,
      successPreview: 'Preview: no mail service is configured, so the sign-in link is shown here.',
      successMailFailed: 'The email with your sign-in link could not be sent right away. Open your account and request a new sign-in link; if nothing arrives, write to kontakt@scutoria.com.',
      testTitle: 'Test checkout', testText: 'This is the preview checkout without payment. It exists only while the site is in preview mode and no Stripe key is set.', testEmail: 'Email address for the account', testPay: 'Complete test purchase',
      vat: 'VAT according to the checkout; VAT ID can be entered.',
    },
  },
  de: {
    nav: { products: 'Produkte', tools: 'Tools', access: 'Konto', discover: 'Entdecken', library: 'Bibliothek', studio: 'Studio', account: 'Konto', menu: 'Menü', main: 'Hauptnavigation', motionOn: 'Bewegung: an', motionOff: 'Bewegung: aus' },
    preview: 'Vorschau',
    draft: 'Entwurf. Dieser Text wurde noch nicht rechtlich geprüft.',
    footer: { about: 'Über Scutoria', legal: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', withdrawal: 'Widerruf', withdraw: 'Vertrag widerrufen', tag: 'Quellenbasiert. Keine Rechtsberatung.', toolkits: 'Toolkits', knowledge: 'Wissen', memos: 'Memos', handbook: 'Handbuch', account: 'Konto', legalHead: 'Rechtliches' },
    switchTo: 'English',
    home: {
      kicker: 'Sicherheit · Wirtschaft · KI',
      lead: 'Für Betriebe ohne IT-Abteilung: die Dokumente, nach denen ein Kunde, ein Versicherer oder die eigene Belegschaft fragt, aus Ihren Antworten erzeugt, belegt und datiert.',
      lines: [
        { key: 'policy', title: 'KI-Richtlinien-Toolkit', text: 'Nutzungsrichtlinie, Tool-Register, Schulungsnachweis, Kennzeichnungs-Check und Nachweisseite. Vierunddreißig Fragen, davon 29 Pflichtfragen, ein datierter Dokumentensatz.' },
        { key: 'security', title: 'Sicherheitsnachweis-Toolkit', text: 'Der Sicherheitsfragebogen Ihres Großkunden oder Versicherers, ehrlich beantwortet: Selbstauskunft, Maßnahmenplan, Notfallkarte.' },
        { key: 'setup', title: 'KI-Einrichtungs-Toolkit', text: 'Claude, ChatGPT und Microsoft 365 Copilot so eingerichtet, dass nichts unbemerkt den Betrieb verlässt. Einrichtungsprotokoll und Datenfluss-Register.' },
      ],
      waitlist: { title: 'Vom nächsten Toolkit erfahren', text: 'Eine E-Mail, wenn das nächste Toolkit erhältlich ist. Kein Newsletter, außer Sie wünschen ihn.', label: 'Ihre E-Mail-Adresse', consent: 'Ich bin einverstanden, dass Scutoria meine Adresse speichert, um diese eine Nachricht zu senden. Einzelheiten in der Datenschutzerklärung.', button: 'Benachrichtigen', thanks: 'Danke. Sie hören einmal von uns, sobald das nächste Toolkit erhältlich ist.', error: 'Bitte eine gültige E-Mail-Adresse eingeben und die Einwilligung ankreuzen.', failed: 'Ihre Adresse konnte nicht gespeichert werden. Bitte versuchen Sie es in einer Minute erneut.' },
    },
    account: {
      title: 'Ihr Konto', lead: 'Melden Sie sich mit Ihrer E-Mail-Adresse an. Wir senden einen Link; ein Passwort gibt es nicht.',
      emailLabel: 'E-Mail-Adresse', sendLink: 'Anmeldelink senden',
      sent: 'Wenn zu dieser Adresse ein Konto besteht, ist ein Anmeldelink unterwegs. Er gilt dreißig Minuten.',
      sentPreview: 'Vorschau: Es ist kein Mailversand eingerichtet, deshalb steht der Link hier.',
      invalid: 'Dieser Link ist nicht mehr gültig. Fordern Sie einen neuen an.',
      limit: 'Zu viele Anfragen für diese Adresse. Bitte in einer Stunde noch einmal versuchen.',
      signedInAs: 'Angemeldet als', logout: 'Abmelden',
      licences: 'Ihre Lizenzen', noLicence: 'Noch keine Lizenz.', buy: 'KI-Richtlinien-Toolkit kaufen', validUntil: 'gültig bis', pilot: 'Gründerpreis', invoices: 'Rechnungen und Belege',
      noPortal: 'Rechnungen sind verfügbar, sobald ein Kauf über Stripe vorliegt.',
      folder: 'Nachweisordner', folderText: 'Jeder Lauf des Generators und jede eingefrorene Fassung. Eingefrorene Fassungen behalten Datum und Wortlaut; der laufende Lauf ändert sich mit Ihren Antworten.',
      newRun: 'Neuen Lauf starten', needLicence: 'Für den Generator ist eine Lizenz nötig.',
      cols: ['Betrieb', 'Angelegt', 'Zuletzt geändert', ''], continue: 'Weiter', documents: 'Dokumente', freeze: 'Fassung einfrieren',
      versions: 'Eingefrorene Fassungen', versionOf: 'Fassung vom', toolkitVersion: 'Toolkit-Stand', updated: 'Das Toolkit wurde seit dieser Fassung aktualisiert; ein neuer Lauf nutzt die aktuellen Vorlagen.', current: 'aktuell',
      none: 'Noch keine Läufe.', frozenNote: 'Eingefrorene Fassung: Die Antworten ändern sich nicht mehr. Die Dokumente tragen das Datum des Einfrierens.',
    },
    shop: {
      price: 'Jahreslizenz', pilotPrice: (n) => `Gründerpreis für die ersten zehn Käufer, noch ${n} frei`, regular: 'pro Jahr, zwölf Monate, keine automatische Verlängerung',
      buy: 'Jahreslizenz kaufen', buyNote: 'Zahlung über Stripe. Der Zugang beginnt sofort nach der Zahlung.',
      start: 'Generator starten', needLicence: 'Der Generator braucht eine Lizenz. Kaufen Sie eine, oder melden Sie sich an, wenn Sie schon eine haben.', signIn: 'Anmelden',
      unavailable: 'Die Kasse ist noch nicht eingerichtet. Bitte später noch einmal versuchen.',
      consent: 'Ich stimme den AGB zu und verlange, dass der Zugang zum digitalen Inhalt sofort beginnt. Ich weiß, dass ich dadurch mein Widerrufsrecht verliere.',
      successTitle: 'Danke. Ihre Lizenz ist aktiv.', successText: (email) => `Wir haben den Anmeldelink an ${email} gesendet. Er gilt sieben Tage; auf der Kontoseite können Sie jederzeit einen neuen anfordern.`,
      successPreview: 'Vorschau: Es ist kein Mailversand eingerichtet, deshalb steht der Anmeldelink hier.',
      successMailFailed: 'Die E-Mail mit Ihrem Anmeldelink konnte nicht sofort versendet werden. Öffnen Sie Ihr Konto und fordern Sie einen neuen Anmeldelink an; falls nichts ankommt, schreiben Sie an kontakt@scutoria.com.',
      testTitle: 'Probekasse', testText: 'Das ist die Vorschau-Kasse ohne Zahlung. Sie existiert nur, solange die Website im Vorschaumodus ist und kein Stripe-Schlüssel gesetzt ist.', testEmail: 'E-Mail-Adresse für das Konto', testPay: 'Probekauf abschließen',
      vat: 'Umsatzsteuer laut Kasse; UID kann eingegeben werden.',
    },
  },
};

export function langFromPath(path) {
  return path === '/de' || path.startsWith('/de/') ? 'de' : 'en';
}

export function t(lang) {
  return strings[lang] ?? strings.en;
}

export function p(key, lang) {
  return paths[key]?.[lang] ?? paths[key]?.en ?? '/';
}
