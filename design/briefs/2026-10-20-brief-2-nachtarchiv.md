# Brief 2 (20.10.2026): Das Nachtarchiv

Quelle: von Stefan am 20.10.2026 eingereicht, Verfasser nicht genannt. Wortlaut unverändert; die Skill-Tabelle wurde aus der zerfallenen Einfügung wiederhergestellt.

---

Die Texte sind schon das Wertvollste an der Seite. Steril wirkt sie, weil das, was man kauft, nie zu sehen ist: nur schwarze Kästen, eine Schriftgröße und blaue Knöpfe. Das gelbe PREVIEW im Kopf ist gerade lauter als das Produkt.

Nicht neu texten lassen. Inszenieren. Die zwei Welten, die du schon festgelegt hast, werden der Raum: nachts das Archiv, als einziges Licht das Papier.

## Skills, die sich lohnen

Drei reichen. Mehr machen Claude nicht geschmackssicherer, sondern widersprüchlich.

| Skill | Wofür | Grenze |
| --- | --- | --- |
| frontend-design von Anthropic | Zwingt Claude, erst ein Layout zu planen, statt wieder drei gleiche Karten zu bauen | Darf die Marke nicht neu erfinden. Dein Prompt steht über dem Skill |
| webapp-testing von Anthropic, oder das Playwright-Plugin | Claude muss die Seite selbst in 1440 und 390, Englisch und Deutsch, screenshotten | Darf dabei keine Sätze „verbessern“ |
| impeccable von Paul Bakaus | Danach, und nur die Befehle critique, typeset, polish | Nicht animate über die ganze Seite, nicht colorize |

Installieren, dann mit /frontend-design ausdrücklich aufrufen. Ohne den Aufruf überspringt Claude den Skill oft.

Weglassen: theme-factory (färbt eure Tokens um), ui-ux-pro-max und Komponentenbibliotheken wie 21st.dev (liefern genau die gleiche SaaS-Karte), canvas-design für Fotos, alles mit Analytics, Chat, Heatmaps oder Cookie-Banner. Figma brauchst du nicht, solange du nicht selbst zeichnest.

Dazu eine eigene Skill-Datei, damit jede spätere Sitzung die Marke schon kennt. Ablegen als .claude/skills/scutoria-brand/SKILL.md:

```markdown
---
name: scutoria-brand
description: Brand, claim and interface rules for the Scutoria site. Use on any page, component, style or copy change.
---

# Scutoria

Scutoria sells dated document toolkits to EU businesses with no IT department, up to about fifty staff. English and German are equal. The brand has no face, no founder story, no consulting, no chat.

Voice on the site: "Sie". Voice inside the documents: "du". Short sentences, concrete things, numbers often written out. No emoji. No em dash as an aside. No exclamation marks in marketing.

Never write: compliant, certified, secure, safe, "meets all requirements", "GDPR ready", "AI Act ready". Never hide an open point. A complete answer may be "not yet, with a date". Not legal advice. No customer logos, testimonials, star ratings, or invented counts.

Two worlds, one system. The site is dark. Documents are light paper. Type: Manrope for headings and text, IBM Plex Mono for kickers, sources, markers, prices, document numbers. Both self-hosted. No third font. No Google Fonts. No third-party script, cookie, or tracker.

Accent blue is for the one primary action and for links. Each product line has its own colour. Four markers, always with their shape, never colour alone: fact square, interpretation diamond, uncertain half-circle, gap dashed circle. Status lamps: green, amber, red.

The mark is a small shield with cross lines. Do not add a person, a photograph, a gradient mesh, glassmorphism, a custom cursor, a countdown, confetti, or a chatbot.

If this file conflicts with a design skill, this file wins.
```

## Der Prompt

In Claude Code, im Projektordner, nach dem Skill. Erst nur die Startseite. Wenn das Papier stimmt, schreibst du: Continue with the product page.

```text
/frontend-design

Redesign the Scutoria marketing pages so the existing brand finally becomes visible. This is a staging job, not a rebrand and not a rewrite. Read .claude/skills/scutoria-brand/SKILL.md and the existing token files before you touch anything. Paste the current tokens into your plan. Do not invent a new palette, a new font, or a new tagline.

Work in the current stack. Do not change framework, router, payment, Stripe, prices, licence logic, the generator, question content, document output, or the wording of legal pages. Shared header and footer may change visually. Anything else on account, generator, and legal pages stays untouched in this pass.

Do the homepage first, then stop and show screenshots. Continue only when told.

## What is wrong

The pages are a stack of identical dark cards, one type size, and blue buttons. The hero's right half is empty. The thing for sale, a dated paper document, never appears. The four markers are a tiny legend. "In preparation" has the same weight as the product on sale. "How it works" is three equal text columns. Sample documents are underlined links. The gold PREVIEW chip in the header is the loudest colour on the page. The writing is already precise. Do not make it warmer, punchier, or more premium. Premium here is paper, scale, and quiet.

## The one idea

A night archive. The room is dark. The only light is paper. Pleasure is the relief of a clear desk, not entertainment. No military imagery, no founder, no staff, no stock office, no people.

Take one aesthetic risk and no second one: a real A4 sheet, large, set 2 degrees off axis, with a second sheet 14px to the right and 10px down. It may break the grid. Everything else stays quiet and aligned.

## Do not add

A third font. Serifs. Gradient meshes. Glass panels. Neon. Purple. A new accent. Stock or generated photos. Isometric scenes. Illustrations of teams. Custom cursors. Cursor trails. Scroll hijacking. Parallax. Countdown timers. Fake live counters. "Trusted by". Testimonials. Star ratings. EU-flag badges. "GDPR compliant" or "AI Act ready" stamps. A second or third price tier. A chat bubble. A cookie banner. Analytics. Any script or font from another domain. Emoji. Exclamation marks. Em dashes in new interface strings. Confetti. Bouncing buttons. Sound.

Do not count numbers up. "10 left" and "17 open points" are stamps, not animations. If a number is not already in the content or bound to real data, do not invent it and do not fake a live stock counter.

## Motion, only three

1. On first load the hero sheet settles from 16px below and 2.5 degrees to its resting 2 degrees. 700ms, ease-out, once.
2. When the marker row is 30 percent in view, the four shapes draw themselves once, 500ms.
3. On hover and focus, a paper lifts 8px and its shadow deepens, 200ms.

Everything else is opacity or 8px, 150 to 200ms, staggered at most 40ms. No pin on mobile. If you use a pinned "how it works" sequence, one viewport maximum, desktop only, and the final state is what reduced-motion and small screens see immediately. Honour prefers-reduced-motion by showing final states with no travel. Keep a visible 2px focus ring. Do not add Framer Motion if CSS can do this.

## Paper component

Build one Paper component and use it everywhere a document is promised. Cards with 16px radius are for tools. Paper has a 2px radius. It is not an app card.

Use tokens. If --paper and --ink do not exist, add them once. Do not hardcode colours inside components.

The sheet:
- aspect-ratio 1 / 1.414
- width min(440px, 100%) in the hero, smaller in grids
- padding about 7 percent
- a mono running head, 11px, uppercase, tracking wide: document code, date, "Example"
- a Manrope title
- a 1px rule
- three short lines, each starting with a real marker shape
- a signature rule near the foot
- a mono footer: "Source-based. No legal advice." and the German equivalent on German pages
- layered shadow, soft, no glow
- a faint grain, one same-origin SVG filter or a single image under 20kb

The back sheet is only an edge, not a second readable document.

Hero sheet content must be real lines already used for the example business, the electrical contractor in Austria. Label it "Example". No staff names. If you cannot find a real sentence in the repo, stop and ask. Do not draft a policy.

Vary the eight document miniatures on the product page with the same component:
- usage policy: several short paragraphs
- one page to post: one large sentence and a signature
- tool register: three table rows
- briefing record: a short attendance list
- labelling checklist: check rows
- enactment plan: four dated lines
- evidence summary: status rows using the existing lamps and shapes
- handbook: a stack of three edges and the real page count if the content already says 23

Use the existing card sentence as the truncated body. Keep the codes D1 to D8 and the file types PDF, DOCX, XLSX in mono.

## Homepage

Header. Keep the items: mark, Products, Free tools, Account, language. Account stays text, no avatar. Language is the word "Deutsch" or "English", never a flag. Sticky after 8px of scroll, with a 1px line and a 92 percent background. No heavy blur. If PREVIEW is a real mode flag, keep it, but as a small mono outline chip, not a gold button, and not in the main eye line. Gold currently beats the product.

Hero, desktop 12 columns. Columns 1 to 6: existing kicker, existing headline, existing subcopy, the two existing buttons. Columns 7 to 12: the paper, vertically centred, allowed to cross the right margin. At 1440 by 900 the headline and the sheet are both visible without scrolling. Mobile 390: headline, subcopy, buttons, then the sheet at about 86 percent width. Do not push the sheet below a long text block. Do not add a new headline.

Primary button stays the solid blue "Buy annual licence". Secondary stays the quiet outline "Read the handbook". Do not add a third hero action.

Offer. Keep one price, the founder price and the licence facts you already show. Set the amount in Manrope, large. Set "Annual licence" and the founder line in mono. Do not turn "10 left" into a banner. A mono line is enough. The surrounding column keeps the existing product sentences. Remove the feeling that this block is another generic card if you can do it with the paper beside it, but do not delete facts: twelve months, no automatic renewal, VAT at checkout, Stripe, access after payment.

How it works. Keep the three steps and their exact sentences. Stop presenting them as three identical columns. Desktop: one wide band. Step 1 shows a short question list becoming a sheet. Step 2 shows three file corners labelled PDF, DOCX, XLSX and the word ZIP. Step 3 shows a posted sheet with a signature line. A thin rule connects the existing numbers. Mobile: stack, same pictures, no pin.

Markers. This is the eye-catcher. Four items in a row, shape about 28px, name, and the existing one-line meaning. Under them, the existing paragraph, including the open-point count and the date already published. Do not invent seventeen rows. If the page only has the sentence, show the sentence. You may add the mono label "Listed, not hidden." in both languages if it does not add a claim. No other new claims.

Samples. The existing handbook and example-file links become small paper thumbs with the real titles. They remain links. Do not gate them.

Free tools. Two tools, finally different. Left, "May this go in?": four rows and four lamps, static, labelled "Example", using sample reasons already shipped in that tool. If no sample exists, show the four questions with empty lamps, not invented verdicts. Right, "Is there anything personal in it?": two fictional lines with placeholders already in the product's language, such as [person], [email], [date]. Obviously fake. No real-looking address. The buttons still open the real tools. Both tools keep "Runs in the browser. Sends nothing."

In preparation. Same facts, lower contrast, no filled button, a mono label "Not on sale" / "Nicht im Verkauf". They must look shelved, not like a second offer. Do not add email capture on the cards. The page already has one notice form.

Notice form. Keep one email, the existing consent checkbox, and the existing promise of one message. Make it feel like a filing line: mono label, a single rule under the field, the blue button. The checkbox stays a real checkbox with a connected label. Do not split it into steps. Do not add a newsletter.

Footer. Keep every existing link and the lines "Source-based. No legal advice." and the contact address. No new columns.

## Product page

Same header, footer, paper, and markers.

Hero. Keep the kicker, title, and the thirty-one-questions sentence. Actions, in this order of weight: solid "Buy annual licence", solid or strong "Start the generator", quiet "Read the handbook", quiet text "Sign in". Four equal buttons are wrong. If preview mode must be explained, keep the existing sentence in mono under the buttons, not as a gold chip.

What you get. The eight papers above, in a grid. Hover and focus lift the sheet and do not hide the title. Keyboard users can reach each download or detail if one already exists. Do not add new downloads.

How it works. All three steps in one band. Step 3 must not sit alone at the top of the next screen.

What it is and what it is not. Keep every sentence, including the sources and the open-points sentence. Set the four markers large above the text, not only inside it. Do not shorten the disclaimer.

See it before you buy. This is the one light band on this page. Background is paper, text is ink. The example business stays fictional and is labelled as such. Three or four paper thumbs for the files you already offer, with their real names. The handbook shows its page count only if you already publish it.

Price. One licence, one amount, the existing bullet list. No comparison table, no "Pro". Keep withdrawal, privacy, and the rule that businesses start access immediately. Do not restyle bullets into icons that add meaning.

Questions. Keep the accordion, the questions, and the answers. More air. The control is a button, operable by keyboard, with state announced. A marker may sit beside an answer only when that answer is already a fact, an interpretation, an uncertainty, or a gap. Do not invent answers. Do not animate them shut in a way that breaks the page for reduced motion.

Closing. Keep the two existing actions and the existing closing sentence.

## Free tools page

Same quiet header. The existing introduction stays. The two tool cards use the previews described above, at a larger size, each on a dark inset, not on paper. Paper is reserved for documents. Under them, keep the sentence about the four memo generators and the link to the AI Policy Toolkit. Do not design those generators in this pass.

## Light and rhythm

One light band per page, no more. Homepage: the marker and sample band. Product page: "See it before you buy". Free tools: none. Other sections stay dark and are separated by space, 120 to 160px, not by a hairline under every block. Body text measure stays under about 62 characters. Hero headline uses a fluid size that feels large on 1440, without overflow at 390. German strings are longer. Check "Gründerpreis", "Nachweisordner", "Kennzeichnung nach Artikel 50", and the button labels at 390 and at 200 percent zoom. No horizontal scroll.

The shield mark may appear once as a watermark under 5 percent opacity behind the hero. Nowhere else as decoration.

## Copy rules for anything new

You may add only these interface labels, in English and German, matched to the existing tone:

- Example / Beispiel
- Document 01 of 08 and the real codes you already use
- Not on sale / Nicht im Verkauf
- Listed, not hidden / Aufgeführt, nicht versteckt
- Runs in the browser. Sends nothing. Only if that sentence is not already there

Nothing else. No new promises. If a German string is missing and the English one is legal or technical, stop and list it. Do not silently translate a legal nuance. Site chrome uses "Sie". Do not introduce "du" on the website.

## Accessibility and weight

Body text on dark must reach 4.5 to 1. Muted grey that fails is a bug, not a style. Marker meaning never depends on colour alone. Touch targets at least 44px. Images, if any, have a name or are hidden from assistive tech when they repeat the text. The page must be usable with a keyboard from header to footer. No layout shift when fonts load. Self-hosted fonts only, with a metric fallback so the text does not jump.

## How to work

1. Write a short plan: tokens you found, files you will edit, the paper states. Then build the homepage only.
2. Screenshot before and after, English and German, at 1440 and 390. Read the screenshots. Fix overlap, cramped German, and weak contrast before you show them.
3. In the browser network panel, confirm the new page requests no foreign script, font, or image.
4. Check reduced motion, keyboard focus, and the homepage path: buy, handbook, both free tools, the notice form, footer.
5. Stop.

When told to continue, repeat that check for the product page, then the free tools page. Do not restyle further pages. Do not refactor unrelated code. Do not rename routes.

## Done means

A visitor sees a sheet of paper within the first screen and understands it is an example of the file they would generate. The four markers are readable without squinting. The page on sale is louder than the two that are not. The gold preview chip no longer wins the screen. Every existing claim is still there, and no new claim has appeared. English and German both fit. The source still has no tracker and no foreign script.
```

Wenn die Startseite zurückkommt und das Blatt wie ein Formular aussieht, ist der Prompt zu schwach getroffen worden. Es soll wie ein gedrucktes Dokument auf einem dunklen Tisch liegen, leicht schräg, mit Datum und Quellenzeile. Sag Claude dann nur: das Blatt größer, die Drehung behalten, die Karten nicht zurückholen.

Den gelben PREVIEW-Knopf und die acht gleichen Produktkästen würde ich als Erstes prüfen. Daran siehst du sofort, ob Claude inszeniert oder wieder nur Kästen stapelt.
