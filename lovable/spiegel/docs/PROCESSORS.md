# Processors used by this app

Facts only. Everything uncertain is marked "to confirm". This list feeds the privacy texts before the site goes live; the owner updates the texts.

| Service | What it does for the app | What data it sees | Status |
| --- | --- | --- | --- |
| Lovable (hosting and preview) | Serves the site and the preview | Page requests, account sessions | active |
| Lovable Cloud database | Stores accounts, runs, licences, tokens, sessions, outbox, waitlist, memo contacts, page counts | Email addresses, questionnaire answers, purchase records | active |
| Cloudflare Workers (runtime under Lovable) | Runs the server code | Page requests | active, to confirm exact subprocessor chain |
| Stripe | Checkout, invoices, customer portal | Buyer email, payment data | planned, stage 5; secret via secret form |
| Brevo | Transactional mail (sign-in links, licences, memos, reminders) | Recipient email address, mail content | planned, stage 5; secret via secret form |

Notes:
- Page views are counted without personal data (day, path, language, referrer host only).
- The site sets one cookie: the account session cookie.
- No analytics, no trackers, no third-party scripts, no external fonts.
- On Render (previous host) the processors were Render, Stripe and Brevo; the move replaces Render with Lovable, Lovable Cloud and the Workers runtime.
