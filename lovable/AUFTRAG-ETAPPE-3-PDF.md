Stage 3 and the PDF (rest of stage 4). Do this now, in one go, without stopping in between. No design changes. Do not publish.

A. PDF without a browser (owner decision 2026-10-23)
1. Replace the Chromium path (src/legacy/toolkit/documents/pdf.chromium-reference.mjs.txt) with a renderer that runs in this runtime, for example pdf-lib with @pdf-lib/fontkit, bundled locally. Embed the self-hosted Manrope and IBM Plex Mono (subset if possible). The callers that need it are documents/index.mjs (generated documents, toPrintHtml of the block model) and memos/routes.mjs (memo PDFs, also toPrintHtml); the handbook is handled in point 3. Choose the more robust way: a renderer straight from the block model (toPdf(doc, lang)), or one for the restricted print HTML that toPrintHtml produces (pg__ classes). Text in the PDF must match the HTML version.
2. Layout follows toPrintHtml and the print CSS: A4, the same margins, header line with document number and date, the footer line, page numbers, headings, paragraphs, lists, tables with a repeated header row and no row split across pages where avoidable, signature lines, the four markers drawn as their shapes (fact square, interpretation diamond, uncertain half-circle, gap dashed circle) with their labels, the product line colour as the only accent. Text in the PDF must be identical to the HTML version of the same document.
3. Handbooks stay the finished PDFs (part of the owner decision): handbookPdf(toolkit, lang) returns the prebuilt file public/samples/<toolkit>/<toolkit>-handbook-<lang>.pdf (ai-policy and security-evidence, en and de) instead of rendering, also inside the ZIP and on the handbook PDF route. The memo PDFs use the new renderer.
4. Check that docx (package docx) and xlsx (exceljs) run in this runtime. If exceljs does not, replace only its writing part with a minimal equivalent that produces the same sheets, columns, number formats, data validation and formulas; verify by reading the files back.
5. The ZIP of all documents (produceZip) works for both toolkits.
6. Measure the time per PDF and for the full ZIP. If that comes near the runtime's CPU or time limits, say so and propose a fix before going further.

B. Stage 3: memo generators (src/legacy/memos)
All memos in English and German: form, result page, PDF through the preview link while no mail service is configured, memo-contact storage with its opt-in exactly as the original, MEMO_PDF_PUBLIC behaviour as the original. The thank-you text only after the row was really stored.

C. Generator end to end
With the sample answers from the reference tests, run both toolkits (AI Policy Toolkit, Security Evidence Toolkit) in English and German through the generator: every document in every format (html, pdf, docx, xlsx) and the ZIP. Compare page counts and text with the reference outputs where the tests define them. Render page 1 of at least four PDFs to images and look at them.

D. Data from the old server
No data migration for now: the old Render database was in preview mode. Note it as an open point in the ledger.

Report at the end: files changed, packages added, measured times, what you verified and how, every open point. Then stop and wait for the design pass.
