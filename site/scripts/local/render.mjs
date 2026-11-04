// Renders one page module to an HTML file without the HTTP server, for screenshots while the running server is left alone.
// Usage: node --disable-warning=ExperimentalWarning --import ./scripts/local/register.mjs scripts/local/render.mjs <module> <export> <lang> <out.html> [json-args]
// Example: node ... render.mjs ./src/pages/library.mjs libraryPage de out/library-de.html
// Asset links (/tokens.css, /img/...) are pointed at http://127.0.0.1:8787 so that the file opens with styles from the local server.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Optional fifth argument: a JSON array of further arguments for the page function. Optional sixth: a CSS file (absolute
// path) linked after the site's stylesheets, so that a stylesheet in progress can be tried before it is merged into cinema.css.
const [mod, fn, lang, out, extra, extraCss] = process.argv.slice(2);
if (!mod || !fn || !lang || !out) { console.error('usage: render.mjs <module> <export> <lang> <out.html> [json-args] [extra.css]'); process.exit(2); }
const m = await import(pathToFileURL(resolve(mod)).href);
const args = extra ? JSON.parse(extra) : [];
let html = await m[fn](lang, ...args);
if (typeof html !== 'string') html = String(html);
html = html.replace(/(href|src)="\/(?!\/)/g, '$1="http://127.0.0.1:8787/').replace(/url\("\/(?!\/)/g, 'url("http://127.0.0.1:8787/');
if (extraCss) html = html.replace('</head>', `<link rel="stylesheet" href="${pathToFileURL(resolve(extraCss)).href}">\n</head>`);
mkdirSync(dirname(resolve(out)), { recursive: true });
writeFileSync(resolve(out), html);
console.log(`${out}: ${html.length} chars`);
