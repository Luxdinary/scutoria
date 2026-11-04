Design and motion pass (owner decision E23, 23 Oct 2026). Do this now, in one go. Do not publish.

The owner wants the site to use what Lovable can do: more animation, slides, reworked graphics and a richer design. The identity stays: a dark night archive in which the only light is paper. Texts stay byte-identical. Everything below is additive on top of tokens.css, bundle.css and site.css and the server-rendered pages in src/legacy; keep all class names that exist.

Hard rules
- No visible text changes. New elements are either purely visual (aria-hidden) or reuse text, codes and numbers that already exist on the page (document numbers D1 to D7, sample sheet contents from src/legacy/pages/paper.mjs, prices, dates). The only new copy allowed is the slider control labels given below.
- Self-hosted vanilla JavaScript and CSS only. No CDN, no library unless you can bundle it locally and it stays small; total added JavaScript at most 15 KB gzipped. Transform and opacity only, no layout shift (CLS under 0.05), smooth on a mid-range phone.
- prefers-reduced-motion: final states at once, no autoplay, no parallax, no scroll-linked motion.
- Every auto-advancing slider: visible pause button, pauses on hover, on focus inside and when the tab is hidden, operable by keyboard (arrow keys) and swipe, dots or index tabs to jump, region with aria-roledescription "carousel", each slide labelled "n of m". Nothing may be reachable only by waiting.
- CSP stays default-src 'self' with no inline styles; set styles through classes or CSS custom properties set from JS via element.style.setProperty (allowed by CSP since it is not an inline style attribute in the HTML).
- No glassmorphism, neon glow, gradient mesh, custom cursor, countdown, confetti, chatbot, stock photos, faces, AI images with fake text.

Slider control labels (new copy, approved by Claude Code for the owner)
- EN: Pause, Play, Previous, Next, "Slide {n} of {m}"
- DE: Anhalten, Abspielen, Zurück, Weiter, "Folie {n} von {m}"

Motion system
- Add motion tokens to tokens.css (durations 180, 320, 560, 900 ms; easings: out-quint, in-out-cubic, a soft spring-like cubic-bezier for paper).
- Extend public/site.js (or a new public/motion.js loaded with defer) with: reveal variants via data attributes (rise, fade, wipe for paper that unveils top to bottom, stagger for children), scroll progress for elements with data-scroll (sets a CSS variable 0..1), pointer parallax for elements with data-depth (desktop and fine pointer only, max 6 degrees tilt).
- Cross-document View Transitions (@view-transition { navigation: auto }) for soft page changes; give the product covers a view-transition-name so the cover glides from the home offer card to the product page hero.
- A thin reading-progress rule under the top bar in the colour of the current product line (accent blue elsewhere).

Home page
1. Hero: turn the single hero sheet into a slide stack of four sample sheets (policy, the one page to post, tool register, evidence summary), built from content that already exists in paper.mjs and the samples section. Every 7 seconds the top sheet slides off to the side and settles at the back of the stack; the marker tabs on its edge re-animate for the new sheet. Index tabs with the document numbers, pause button. The cover behind follows the pointer with a slight tilt and sinks on scroll (parallax). The large shield mark in the background draws its outline once.
2. A date stamp motif: on each sample sheet, the existing date line (for example 2026-10-19 · EXAMPLE) gets a rubber-stamp treatment in IBM Plex Mono that presses in once when the sheet comes into view (scale and slight rotation, then rest). "Dated" is the brand promise; make it visible.
3. Products: the hardcover covers turn from about 18 degrees to rest as their card scrolls in (scroll-linked), lift and turn on hover. The price filing line draws in. Founder seats: a row of ten small seat marks next to the existing "10 left" line, filled from the same real number (countLicences); no new text.
4. How it works: scrollytelling on desktop. The step pictures sit in a sticky column and change as each step text passes the middle of the viewport, with the scroll-filled rule as progress. On phones, the steps become a horizontal swipe slider with snap points and dots.
5. Marker band: the four marker tiles draw their shapes in sequence; hovering or focusing a tile highlights the matching marked passage in a sample excerpt next to it, if such an excerpt already exists on the page; otherwise keep the draw sequence only.
6. Samples: a horizontal carousel of the sample sheets with scroll snap, previous and next buttons and drag on desktop; the existing links stay the click target.
7. Tools: each tool preview plays a short demo once when it enters the view (the input fills, the result appears), using the preview's own existing text; replay on hover.
8. Shelf and waitlist: covers slide onto the shelf staggered.

Product pages
1. Hero: the hardcover opens as the visitor scrolls the first screen: the front cover swings open around the spine (3D, transform only) and reveals the first page of the policy sheet. Reduced motion: shows the closed cover and the sheet side by side.
2. Document set: turn the docs grid into a filing-cabinet slider with index tabs D1 to D7 along the top; on desktop the sheets fan out slightly as the section scrolls in, on phones it is a swipe slider. Every sheet stays a link where it is one today.
3. Marker band draws in sequence; the price box filing line draws; smooth open and close for any details/summary elements.

Tools page and other pages
- Tool cards lift on hover with the preview animating; legal and about pages only get the reveal and the reading-progress rule.

Graphics rework
- Covers: richer hardcovers. Cloth texture via an inline SVG noise filter, a blind-embossed shield on the front, a subtle foil sheen on the title (single linear sheen, not a gradient mesh), a spine with two bands, visible page edges at the fore-edge, a soft contact shadow. Policy blue and security teal stay the line colours; setup amber for the coming line.
- Paper: fine paper grain, layered realistic shadow, a folded corner on the one page to post, a paper clip on the evidence summary, ruled lines on the tool register.
- Background: the shield mark and a faint archive index grid; nothing that competes with the paper as a light source.
- Icons for the tools in one line style (1.5 px stroke, round caps).

Check before you report
- Screenshots at 1440 and 390 wide, English and German, with and without reduced motion: home, both product pages, tools.
- No visible text changed (compare the text content of every page against the stage-1 output), no console errors, no horizontal scroll at 390, CLS under 0.05.
- Report: what you built, files changed, the added JavaScript size, anything you skipped and why.
