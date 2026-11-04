// File-system version of src/runtime/files.mjs for the local runner: same three exports, read from site/.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const file = (rel) => resolve(site, rel);

export function readText(rel) {
  return readFileSync(file(rel), 'utf8');
}
export function readBase64(rel) {
  return readFileSync(file(rel)).toString('base64');
}
export function readBinary(rel) {
  return readFileSync(file(rel));
}
