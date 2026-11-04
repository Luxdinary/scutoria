// Local HTTP server around the Worker-style app (src/runtime/express.mjs exposes app.handle(Request) -> Response).
// Static files come from site/public, everything else goes through the real routes. Start with `npm run local`.
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(here, '..', '..', 'public');
const PORT = Number(process.env.PORT ?? 8787);
const MIME = {
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.json': 'application/json; charset=utf-8',
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
};

const { app } = await import('../../src/server.mjs');

async function serveStatic(pathname, res) {
  if (!pathname.includes('.') || pathname.includes('..')) return false;
  const f = join(PUBLIC, decodeURIComponent(pathname));
  try {
    const s = await stat(f);
    if (!s.isFile()) return false;
    // The CORS header lets pages rendered to file:// (scripts/local/render.mjs) load the fonts from here.
    res.writeHead(200, { 'Content-Type': MIME[extname(f).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' });
    res.end(await readFile(f));
    return true;
  } catch {
    return false;
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if ((req.method === 'GET' || req.method === 'HEAD') && (await serveStatic(url.pathname, res))) return;
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = chunks.length && req.method !== 'GET' && req.method !== 'HEAD' ? Buffer.concat(chunks) : undefined;
    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers[k] = v;
    const request = new Request(url, { method: req.method, headers, body, duplex: body ? 'half' : undefined });
    const response = await app.handle(request);
    const out = {};
    response.headers.forEach((v, k) => { out[k] = v; });
    res.writeHead(response.status, out);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (e) {
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Local runner error: ' + (e?.stack ?? e));
  }
}).listen(PORT, '127.0.0.1', () => console.log(`Scutoria local runner on http://localhost:${PORT} (public: ${PUBLIC})`));
