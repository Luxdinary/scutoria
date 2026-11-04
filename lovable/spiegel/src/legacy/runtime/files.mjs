// Lovable: the server has no file system. Content and the design files are bundled at build time.
const TEXT = {
  ...import.meta.glob('/content/**/*.{md,json}', { query: '?raw', import: 'default', eager: true }),
  ...import.meta.glob('/public/*.css', { query: '?raw', import: 'default', eager: true }),
};
const FONTS = import.meta.glob('/public/fonts/*.woff2', { query: '?inline', import: 'default', eager: true });

export function readText(rel) {
  const v = TEXT['/' + rel];
  if (v === undefined) throw new Error(`File not bundled: ${rel}`);
  return v;
}
export function readBase64(rel) {
  const v = FONTS['/' + rel];
  if (v === undefined) throw new Error(`File not bundled: ${rel}`);
  return String(v).replace(/^data:[^,]*,/, '');
}
