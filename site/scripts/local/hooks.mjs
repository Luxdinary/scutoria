// Resolve hook: src/runtime/files.mjs (import.meta.glob, Vite) becomes a file-system reader and src/db.mjs (Supabase)
// becomes the SQLite reference wrapped in promises. Nothing in src/ changes; the production code stays as it is.
export async function resolve(specifier, context, nextResolve) {
  const r = await nextResolve(specifier, context);
  const u = String(r.url).replace(/\\/g, '/');
  if (u.endsWith('/site/src/runtime/files.mjs')) return { ...r, url: new URL('./files.mjs', import.meta.url).href };
  if (u.endsWith('/site/src/db.mjs')) return { ...r, url: new URL('./db.mjs', import.meta.url).href };
  return r;
}
