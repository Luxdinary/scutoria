// A small Express 5 compatible router for the Worker runtime, so the original route code runs unchanged.
// Supports what the site uses: use/get/post, :params, query, urlencoded/raw bodies, status/type/set/append/send/json/redirect.
const TYPES = { html: 'text/html; charset=utf-8', text: 'text/plain; charset=utf-8', 'text/plain': 'text/plain; charset=utf-8', json: 'application/json; charset=utf-8', 'application/xml': 'application/xml; charset=utf-8', xml: 'application/xml; charset=utf-8' };

function compile(path) {
  const keys = [];
  const src = path.replace(/[.*+?^${}()|[\]\\]/g, (c) => (c === ':' ? c : '\\' + c)).replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; });
  return { re: new RegExp('^' + src + '$'), keys };
}

function makeRes() {
  const res = { statusCode: 200, headers: new Headers(), body: null, done: false };
  res.status = (c) => { res.statusCode = c; return res; };
  res.type = (t) => { res.headers.set('Content-Type', TYPES[t] ?? t); return res; };
  res.set = (k, v) => { if (typeof k === 'object') { for (const [a, b] of Object.entries(k)) res.headers.set(a, b); } else res.headers.set(k, v); return res; };
  res.append = (k, v) => { res.headers.append(k, v); return res; };
  res.get = (k) => res.headers.get(k);
  res.send = (b) => {
    if (!res.headers.has('Content-Type')) res.type(typeof b === 'string' ? 'html' : 'application/octet-stream');
    res.body = b; res.done = true; return res;
  };
  res.json = (o) => { res.type('json'); return res.send(JSON.stringify(o)); };
  res.redirect = (a, b) => { const [code, url] = b === undefined ? [302, a] : [a, b]; res.statusCode = code; res.headers.set('Location', url); res.body = ''; res.done = true; return res; };
  res.end = (b) => res.send(b ?? '');
  return res;
}

export default function express() {
  const layers = [];
  const add = (method, path, fns) => {
    if (typeof path === 'function') { fns = [path, ...fns]; path = null; }
    const m = path ? compile(path) : null;
    for (const fn of fns) layers.push({ method, m, fn });
  };
  const app = {
    disable() {}, set() {},
    use: (path, ...fns) => add(null, path, fns),
    get: (path, ...fns) => add('GET', path, fns),
    post: (path, ...fns) => add('POST', path, fns),
    async handle(request) {
      const url = new URL(request.url);
      const raw = request.method === 'POST' ? new Uint8Array(await request.arrayBuffer()) : null;
      const ctype = request.headers.get('content-type') ?? '';
      let body = {};
      if (raw && ctype.includes('application/x-www-form-urlencoded')) body = Object.fromEntries(new URLSearchParams(new TextDecoder().decode(raw)));
      const req = {
        method: request.method === 'HEAD' ? 'GET' : request.method,
        path: decodeURIComponent(url.pathname), url: url.pathname + url.search, originalUrl: url.pathname + url.search,
        query: Object.fromEntries(url.searchParams), params: {}, body, rawBody: raw,
        protocol: (request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '')),
        hostname: url.hostname, headers: Object.fromEntries(request.headers),
        get: (h) => request.headers.get(h) ?? undefined,
        ip: request.headers.get('cf-connecting-ip') ?? '',
      };
      const res = makeRes();
      let i = 0;
      const next = async (err) => {
        if (res.done) return;
        while (i < layers.length) {
          const L = layers[i++];
          if (L.method && L.method !== req.method) continue;
          if (L.m) { const hit = L.m.re.exec(req.path); if (!hit) continue; req.params = Object.fromEntries(L.m.keys.map((k, j) => [k, decodeURIComponent(hit[j + 1])])); }
          if (err) { if (L.fn.length === 4) { try { await L.fn(err, req, res, next); } catch (e) { err = e; continue; } return; } continue; }
          if (L.fn.length === 4) continue;
          try { await L.fn(req, res, next); } catch (e) { err = e; continue; }
          return;
        }
        if (err && !res.done) { console.error(err); res.status(500).type('text').send('Internal error'); }
      };
      await next();
      const out = request.method === "HEAD" ? null : res.body;
      return new Response(out, { status: res.statusCode, headers: res.headers });
    },
  };
  return app;
}
// Middleware factories Express offers; here the body is parsed in handle(), static files are served by the host.
express.static = () => (req, res, next) => next();
express.urlencoded = () => (req, res, next) => next();
express.raw = () => (req, res, next) => { req.body = req.rawBody; next(); };
