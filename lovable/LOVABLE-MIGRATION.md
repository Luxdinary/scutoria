# Scutoria: migration notes for Lovable

Read this first. It is the brief for importing this code into Lovable (23 October 2026).

## What this is

A finished website and shop for Scutoria, built as Node 22 + Express 5 with server-rendered HTML and SQLite (node:sqlite). English at `/`, German under `/de/`. The design and every text are approved by the owner. The goal is a faithful rebuild on Lovable's stack: the same pages, routes, texts, look and behaviour. It is not a redesign and not a rewrite of the copy.

Scutoria sells dated document toolkits to EU businesses without an IT department (up to about fifty staff). A questionnaire generates a dated document set (PDF, DOCX, XLSX) for the business, with a handbook that gives a source and retrieval date for every rule.

## Non-negotiable

1. **Texts verbatim.** All copy lives in `content/` (Markdown and JSON), `src/i18n.mjs`, `src/pages/*.mjs`, `src/memos/*.mjs` and `src/toolkit/documents/**/*.mjs`. Do not rewrite, shorten, translate, summarise or add copy. English and German are equal. No emoji, no exclamation marks, no em dash as an aside.
2. **Design verbatim.** `public/tokens.css`, `public/bundle.css` and `public/site.css` are the design. Keep them as they are and keep every class name of the rendered HTML. Do not restyle with Tailwind or shadcn, do not add colours, gradients, glass, glow or new animations. Make sure no CSS reset (Tailwind preflight) changes the look; the CSS was written without one. `public/site.js` is the only behaviour script (sticky bar, reveal, marker drawing); port it as it is.
3. **Same URL paths.** Keep every path from `src/i18n.mjs` (`paths`), the toolkit routes in `src/toolkit/registry.mjs` and `src/toolkit/routes.mjs`, and the memo routes in `src/memos/`. The site will replace an existing domain; paths must not change.
4. **No third-party scripts, no analytics, no trackers, no cookie banner, no external fonts.** Fonts are self-hosted from `public/fonts/` (Manrope, IBM Plex Mono). The only cookie is the session cookie of the account. Page views are counted without personal data (table `hits`).
5. **Preview mode stays on.** `SITE_MODE=preview`: every page carries `noindex, nofollow`, the header shows the small preview chip, and without a Stripe key a test checkout without payment exists. Do not publish the project.
6. **Privacy rules of the product.** Sign-in only by email link, no passwords. The generator never asks for passwords or names of staff. Legal pages show a draft notice while `LEGAL_REVIEWED_AT` is empty.
7. **Secrets only as secrets.** The Stripe secret key, the Stripe webhook secret and the Brevo API key are entered by the owner in the secret form. Never in code, never in chat.

## What the app does

| Area | Where in the code | Notes |
|---|---|---|
| Public pages | `src/pages/home.mjs`, `product.mjs`, `product-security.mjs`, `paper.mjs`, `cover.mjs`, `previews.mjs`, `legal.mjs`, `seo.mjs`, `src/layout.mjs` | Home, two product pages, legal pages, about, sitemap, robots, JSON-LD, Open Graph images in `public/og/` |
| Handbooks | `src/toolkit/handbook.mjs`, `content/toolkits/*/handbook.*.md` | Markdown with the markers `[FACT] [INTERPRETATION] [UNCERTAIN] [GAP]` (German `[FAKT] [AUSLEGUNG] [UNSICHER] [LÜCKE]`), `Source:` lines, `::: uncertain` boxes; anchors `#sN` and `#sN-M` |
| Tools | `src/pages/tools.mjs`, `public/tools/*.js` | Run in the browser and send nothing; their pages forbid network requests (`TOOLS_CSP`) |
| Memo generators | `src/memos/` | Four forms; the answers sit in the address of the result page; result with the memo on paper; the PDF only by email after consent; three requests per address and hour |
| Generator | `src/toolkit/engine.mjs`, `routes.mjs`, `documents/` | `questions.json` per toolkit; step pages; documents D1 to D7 per toolkit as HTML preview, PDF, DOCX (`docx`), XLSX (`exceljs`) and one ZIP (`jszip`) |
| Accounts | `src/shop/` | Email-link sign-in (token 30 minutes, single use, stored as hash), session cookie 30 days, licences of twelve months without renewal, founder seats counted per toolkit, evidence folder with runs and frozen versions |
| Payments | `src/shop/payments.mjs`, `routes.mjs` | Stripe Checkout in payment mode with automatic tax, tax ID collection, required billing address, invoice creation, required terms consent with the custom text from `src/i18n.mjs`; webhook `POST /stripe/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`; billing portal |
| Mail | `src/mail.mjs` | Brevo transactional API: sign-in link, welcome mail after purchase, reminder fourteen days before a licence ends, memo PDF as attachment; memo contacts into Brevo list `BREVO_MEMO_LIST_ID` |
| PDF | `src/toolkit/documents/pdf.mjs`, `blocks.mjs` | Today Chromium prints the document HTML with the print CSS (A4, fixed margins). Choose a method on Lovable that keeps this A4 layout and say which before building it |
| Specification | `test/*.test.mjs` | 39 tests describe the behaviour precisely; treat them as the specification |
| Configuration | `src/config.mjs`, `.env.example`, `README.md` | Every variable and its meaning |

## Order of work

1. Design, layout, public pages in both languages.
2. Tools and handbooks.
3. Memo generators.
4. Accounts and generator with the documents.
5. Payments and mail.

After each part, compare with the running reference site in preview mode: https://scutoria-site.onrender.com (English) and https://scutoria-site.onrender.com/de/ (German).
