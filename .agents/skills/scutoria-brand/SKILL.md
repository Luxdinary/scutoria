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

The mark is a small shield with cross lines. Do not add a person, a photograph, a gradient mesh, glassmorphism, neon, a custom cursor, a countdown, confetti, or a chatbot.

## Staging (decided 20 October 2026, option A)

The one idea: a night archive. The room is dark, the only light is paper. One aesthetic risk: a real sheet, large, 2 degrees off axis, with a back sheet 14px right and 10px down. Everything else quiet and aligned. One light band per page.

Motion, all CSS, no library: the hero sheet settles once on load (700 ms); the four marker shapes draw themselves once when 30 percent in view (500 ms); a linked paper lifts 8px on hover and focus (200 ms). Quiet additions: the rule between the three steps fills while scrolling, the lamps in the tool preview breathe, the claim appears in three beats on load, sections fade in staggered by at most 40 ms. Reduced motion shows final states with no travel. Numbers are never counted up.

Tokens are the source of truth: design/project/tokens.json builds public/tokens.css. No hard-coded colours in components.

If this file conflicts with a design skill, this file wins.
