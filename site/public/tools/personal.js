// "Is there anything personal in it?" Runs entirely in the browser. The script makes no network calls; the page's policy also blocks them.
// The same module is imported by the tests in Node, so the detection functions carry no DOM.

const KINDS = ['secret', 'iban', 'ibanmaybe', 'svnr', 'idde', 'email', 'phone', 'health', 'birthdate', 'address', 'name', 'reference', 'healthmaybe', 'postal', 'plate', 'date', 'idnum'];
const PRIORITY = Object.fromEntries(KINDS.map((k, i) => [k, i]));
// Direct identifiers and sensitive data: red. Weak signals that identify only in context: amber.
export const STRONG = new Set(['secret', 'iban', 'svnr', 'idde', 'email', 'phone', 'health', 'birthdate', 'address', 'name', 'reference']);

// Word edges that also work for umlauts (\b in JavaScript knows only ASCII letters).
const B = '(?<![\\p{L}\\p{N}])';
const E = '(?![\\p{L}\\p{N}])';

// Health words (Art. 9 GDPR): stems without a closing edge, so that plural and compound forms count; stems that typically sit inside
// a compound (Psychotherapie, Hausarzt, erkrankt) also without an opening edge. The list is named in the limits text of the tool page.
const HEALTH = new RegExp([
  'krank\\p{L}*', '(?<!schw)arzt\\p{L}*', 'ärzt\\p{L}*', 'therap\\p{L}*', 'behinderung\\p{L}*', `${B}Schwerbehind\\p{L}*`, 'bandscheib\\p{L}*', 'arbeitsunfähig\\p{L}*',
  `${B}diagnos\\p{L}*`, `${B}AU-Bescheinigung\\p{L}*`, `${B}Kur${E}`, `${B}Reha\\p{L}*`, `${B}Covid\\p{L}*`, `${B}Corona\\p{L}*`, `${B}Krebs${E}`,
  `${B}Medikament\\p{L}*`, `${B}schwanger\\p{L}*`, `${B}Burnout${E}`, `${B}Depression\\p{L}*`, `${B}allerg\\p{L}*`,
  `${B}sick${E}`, `${B}ill${E}`, `${B}illness\\p{L}*`, `${B}cancer${E}`, `${B}diabet\\p{L}*`, `${B}medication\\p{L}*`, `${B}disabilit\\p{L}*`,
  `${B}pregnan\\p{L}+`, `${B}surger\\p{L}*`, `${B}hospital\\p{L}*`,
].join('|'), 'giu');
// "Befund", "Operation" and "behindert" are health words only in a health context ("Befund aus dem Audit", "Operation Lagerumzug",
// "der Stau behindert den Verkehr"); without one they count as possible (amber), never as nothing.
const HEALTH_MAYBE = new RegExp(`befund\\p{L}*|(?<!ko|co)operation\\p{L}*|${B}behindert\\p{L}*${E}`, 'giu');
const HEALTH_CONTEXT = new RegExp(`${B}(?:patient\\p{L}*|klinik\\p{L}*|clinic\\p{L}*|spital\\p{L}*|medizin\\p{L}*|medical|blut\\p{L}*|blood|röntgen\\p{L}*|x-ray|MRT|MRI)${E}`, 'iu');

// Access data: a keyword, then a separator (":", "=", "is", "ist", "lautet", "heißt", "für …:" or "für … ist") or directly a value
// with a digit, then the rest of the line up to 60 characters. After "is", "ist" and "lautet" the value may start on the next line.
// Without a separator, "Passwort-Manager", "password policy" or "login page" stay unmarked.
const SECRET_KEY = new RegExp(`${B}(?:Passwort|Kennwort|Passphrase|Passcode|Password|Passwd|pwd|pw|PIN|API[- ]?Key|Secret|Token|Zugangscode|Zugangsdaten|Zugang|Login|WLAN|WiFi|Wi-Fi|Schlüssel)${E}`, 'giu');
const SECRET_SEP = [
  /^[ \t]*[:=][ \t]*(?:\r?\n[ \t]*)?/u,
  /^[ \t]+(?:is|ist|lautet|lauten)[ \t]*:?(?:[ \t]*\r?\n[ \t]*|[ \t]+)/iu,
  /^[ \t]+(?:heißt|heisst)[ \t]*:?[ \t]+/iu,
  /^[ \t]+(?:für|for)[ \t]+[^:=\n]{1,40}?[ \t]*[:=][ \t]*/iu,
  /^[ \t]+(?:für|for|des|der|vom|of)[ \t]+[^:=\n]{1,40}?[ \t]+(?:ist|is|lautet|heißt)[ \t]*:?[ \t]+/iu,
];
// A value with a digit right after the keyword, without separator ("PIN 1234", "pw Garten77"), counts only for password words.
const SECRET_DIRECT = /^[ \t]+(?=[^\s]*\d)(?=[^\s]{4,})/u;
const PASSWORD_WORD = /^(?:Passwort|Kennwort|Passphrase|Passcode|Password|Passwd|pwd|pw|PIN|Zugangscode)$/iu;
const TOKEN = /\b(?:sk|pk|rk|whsec)_(?:live|test)_[A-Za-z0-9]{8,}\b|\b[A-Za-z0-9_-]{40,}\b/g;
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// IBAN: two letters and two check digits, then letters or digits with single spaces between groups; the exact length for Austria and
// Germany, 15 to 34 elsewhere, and the IBAN has to end where a group ends (no free tail such as "BIC" or "EUR").
const IBAN_START = new RegExp(`${B}[A-Za-z]{2}\\d{2}`, 'gu');
const IBAN_LENGTH = { AT: 20, DE: 22 };
const SVNR = /\b\d{4}[ ]?(?:0[1-9]|[12]\d|3[01])(?:0[1-9]|1[0-2])\d{2}\b/g;
// German identifiers: pension insurance number (2 digits, date of birth, letter, 3 digits), tax ID (11 digits, also grouped),
// health insurance number (letter and 9 digits), ID card number (9 letters and digits).
const RVNR = new RegExp(`${B}\\d{2}[ ]?(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|1[0-2])\\d{2}[ ]?[A-Z][ ]?\\d{3}${E}`, 'gu');
const TAXID = new RegExp(`${B}\\d{2}[ ]?\\d{3}[ ]?\\d{3}[ ]?\\d{3}${E}`, 'gu');
const KVNR = new RegExp(`${B}[A-Z]\\d{9}${E}`, 'gu');
const IDCARD = new RegExp(`${B}(?=[A-Z0-9]*\\d)(?=[A-Z0-9]*[A-Z])[A-Z0-9]{9}${E}`, 'gu');
const TAX_CUE = /(?:Steuer-?ID|Steuer-?Id-?Nr\.?|IdNr\.?|Steueridentifikationsnummer|Identifikationsnummer|TIN|tax ID)\s*[:.#]?\s*$/iu;
const KV_CUE = /(?:Versichertennummer|Versicherten-?Nr\.?|KVNR|Krankenversichertennummer|Krankenversicherungsnummer|eGK)\s*[:.#]?\s*$/iu;
const ID_CUE = /(?:Ausweis\p{L}*|Personalausweis\p{L}*|Reisepass\p{L}*|Passnummer|Pass-Nr\.?|ID card|identity card|passport)\s*(?:Nr\.?|No\.?|number)?\s*[:.#]?\s*$/iu;
// Phone numbers: "+" or "00" at the start of a number, or a leading 0; accepted only with "+" or a separator, so that an EAN or
// another long digit string is not a phone number.
const PHONE = /(?<![\p{N}])(?:\+|00)\d{1,3}[\s/.-]?\(?\d{1,5}\)?(?:[\s/.-]?\d{2,5}){2,4}|\b0\d{2,4}[\s/.-]?\d{3,8}(?:[\s/.-]?\d{2,6})?\b/gu;
const DATE = /\b(?:0?[1-9]|[12]\d|3[01])[./-](?:0?[1-9]|1[0-2])[./-](?:19|20)\d{2}\b/g;
const BIRTH_CUE = /(?:geb\.?|geboren|Geburtsdatum|Geb\.-Dat\.?|born|date of birth|DOB)\s*(?:am|on)?\s*:?\s*$/iu;
// Street addresses: one word ending in a street word ("Hauptstraße 5"), or one or two capitalised words before a separate street word
// ("Wiener Straße 12", "Lange Gasse 7/3", "Am Graben 3"), or the house number first ("5 High Street"). Word chains are capped,
// house numbers run from 1 to 1899, so that a year is not a house number.
const HOUSE = '(?:[1-9]\\d{0,2}|1[0-8]\\d{2})[a-zA-Z]?(?:\\s*\\/\\s*\\d{1,4}[a-zA-Z]?){0,3}';
const STREET_END = '(?:straße|strasse|str\\.|gasse|platz|weg|allee|ring|ufer|steig|zeile|damm|graben|markt|kai|lände|gürtel)';
const STREET_WORD = '(?:Straße|Strasse|Str\\.|Gasse|Platz|Weg|Allee|Ring|Ufer|Steig|Zeile|Damm|Graben|Markt|Kai|Lände|Gürtel|Promenade|Street|Road|Avenue|Lane|Drive)';
const STREET_EN = '(?:Street|St\\.|Road|Rd\\.|Avenue|Ave\\.|Lane|Drive|Way|Close|Court|Square|Place|Terrace|Row|Gardens|Crescent|Hill)';
const ADDRESS = new RegExp(
  `${B}(?:[\\p{Lu}][\\p{L}-]{0,40}${STREET_END}|(?:[\\p{Lu}][\\p{L}.'-]{0,30}[ ]){1,2}${STREET_WORD})[ ]?${HOUSE}${E}`
  + `|${B}(?:[1-9]\\d{0,3})[a-zA-Z]?[ ](?:[\\p{Lu}][\\p{L}.'-]{0,30}[ ]){1,3}${STREET_EN}${E}`,
  'gu');
const POSTAL = /\b(?:A-|D-|CH-)?\d{4,5}\s+[\p{Lu}][\p{L}-]+(?:\s(?:am|an der|bei|im)\s[\p{Lu}][\p{L}-]+|\s[\p{Lu}][\p{L}-]+)?\b/gu;
// A year before a noun is not a postal code ("im Jahr 2024 Umsatz").
const YEAR_CUE = /(?:Jahr(?:es|e)?|Geschäftsjahr|Wirtschaftsjahr|seit|bis|ab|Ende|Anfang|Mitte|year|since|until|FY)\s*$/iu;
// Names after a salutation or title, ending at a word edge: before a comma, a full stop, a bracket, a quote or the line end.
const SALUTATION = '(?:Herrn?|Frau|Hr\\.|Fr\\.|Mr\\.?|Mrs\\.?|Ms\\.?|Dr\\.|Mag\\.|Ing\\.|Dipl\\.-Ing\\.|Prof\\.)';
const NAME_SALUTATION = new RegExp(`${B}(?:${SALUTATION}[ \\t]+)+[\\p{Lu}][\\p{L}'-]+(?:[ \\t]+[\\p{Lu}][\\p{L}'-]+){0,2}(?=[\\s,.;:!?)\\]}"'»«“”„/<>]|$)`, 'gu');
const NAME_LABEL = /\b(?:Name|Kunde|Kundin|Mitarbeiter(?:in)?|Bewerber(?:in)?|Patient(?:in)?|Ansprechpartner(?:in)?|Customer|Employee|Applicant|Patient|Contact)\s*:\s*([\p{Lu}][\p{L}'-]+(?:\s[\p{Lu}][\p{L}'-]+){0,3})/gu;
const NAME_CALL = /\bcall[ \t]+([\p{Lu}][\p{L}'-]+[ \t]+[\p{Lu}][\p{L}'-]+)(?=[ \t]+back\b)/gu;
const REFERENCE = /\b(?:Kundennummer|Kunden-?Nr\.?|Kd\.?-?Nr\.?|Auftragsnummer|Auftrags?-?Nr\.?|Rechnungsnummer|Rechnungs-?Nr\.?|Vertragsnummer|Personalnummer|Versicherungsnummer|Polizzennummer|Customer (?:no\.?|number)|Order (?:no\.?|number)|Invoice (?:no\.?|number)|Contract (?:no\.?|number)|Employee (?:no\.?|number)|Policy (?:no\.?|number))\s*[:#]?\s*[A-Z0-9][A-Z0-9/-]{2,}/giu;
const PLATE = /\b[A-Z]{1,3}[- ]\d{1,5}[ ]?[A-Z]{1,2}\b|\b[A-Z]{1,3}[- ][A-Z]{1,2}[ ]?\d{1,4}[EH]?\b/g;
const IDNUM = /\b\d{9,12}\b/g;

function mod97(s) {
  const rearranged = s.slice(4) + s.slice(0, 4);
  let rem = 0;
  for (const ch of rearranged) {
    const v = ch >= 'A' && ch <= 'Z' ? String(ch.charCodeAt(0) - 55) : ch;
    for (const d of v) rem = (rem * 10 + Number(d)) % 97;
  }
  return rem === 1;
}

// Austrian social security number: three digits, check digit, date of birth; weights 3 7 9 0 5 8 4 2 1 6, check = sum mod 11.
function svnrValid(raw) {
  const d = raw.replace(/\s+/g, '');
  if (d.length !== 10) return false;
  const w = [3, 7, 9, 0, 5, 8, 4, 2, 1, 6];
  const sum = [...d].reduce((acc, ch, i) => acc + Number(ch) * w[i], 0);
  return sum % 11 === Number(d[3]);
}

// German tax ID: first digit not 0, one digit of the first ten repeated two or three times, check digit by ISO 7064 MOD 11,10.
function taxIdValid(raw) {
  const d = raw.replace(/\s+/g, '');
  if (d.length !== 11 || d[0] === '0') return false;
  const counts = {};
  for (const ch of d.slice(0, 10)) counts[ch] = (counts[ch] ?? 0) + 1;
  const repeated = Object.values(counts).filter((n) => n > 1);
  if (repeated.length !== 1 || repeated[0] > 3) return false;
  let product = 10;
  for (let i = 0; i < 10; i++) {
    let sum = (Number(d[i]) + product) % 10;
    if (sum === 0) sum = 10;
    product = (sum * 2) % 11;
  }
  const check = (11 - product) % 10;
  return check === Number(d[10]);
}

function digits(s) { return (s.match(/\d/g) ?? []).length; }

function collect(text, re, kind, accept = () => true, map = null) {
  const out = [];
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(text))) {
    const value = map ? map(m) : m[0];
    const start = map ? m.index + m[0].indexOf(value) : m.index;
    if (m[0].length === 0) re.lastIndex++;
    if (!value || !accept(value, m)) continue;
    out.push({ start, end: start + value.length, kind, text: value });
  }
  return out;
}

const before = (text, index, n = 40) => text.slice(Math.max(0, index - n), index);

// A health stem found inside a word marks the whole word ("erkrankt", "Hausarzt"), so that no part of it stays in the copy.
function wholeWords(text, findings) {
  const letter = /[\p{L}\p{N}]/u;
  return findings.map((f) => {
    let { start, end } = f;
    while (start > 0 && letter.test(text[start - 1])) start--;
    while (end < text.length && letter.test(text[end])) end++;
    return { ...f, start, end, text: text.slice(start, end) };
  });
}

// Access data: every keyword is checked on its own, so that a second keyword further along the line is not lost.
function secrets(text) {
  const out = [];
  SECRET_KEY.lastIndex = 0;
  let m;
  while ((m = SECRET_KEY.exec(text))) {
    const afterKey = m.index + m[0].length;
    const rest = text.slice(afterKey);
    const sep = SECRET_SEP.map((re) => rest.match(re)).find(Boolean) ?? (PASSWORD_WORD.test(m[0]) ? rest.match(SECRET_DIRECT) : null);
    if (!sep) continue;
    const valueStart = afterKey + sep[0].length;
    const value = (text.slice(valueStart).match(/^[^\r\n]{0,60}/)?.[0] ?? '').replace(/\s+$/u, '');
    if ((value.match(/\S/g) ?? []).length < 3) continue;
    const end = valueStart + value.length;
    out.push({ start: m.index, end, kind: 'secret', text: text.slice(m.index, end) });
  }
  return out;
}

// IBANs and IBAN-shaped strings whose check digits do not fit.
function ibans(text) {
  const out = [];
  IBAN_START.lastIndex = 0;
  let m;
  while ((m = IBAN_START.exec(text))) {
    const start = m.index;
    const chars = [];
    const ends = [];
    let j = start;
    while (j < text.length && chars.length < 34) {
      const c = text[j];
      if (/[A-Za-z0-9]/.test(c)) { chars.push(c.toUpperCase()); ends.push(j + 1); j++; } else if (c === ' ' && /[A-Za-z0-9]/.test(text[j + 1] ?? '')) j++; else break;
    }
    const groupEnd = (k) => !/[A-Za-z0-9]/.test(text[ends[k]] ?? '');
    const country = chars.slice(0, 2).join('');
    const fixed = IBAN_LENGTH[country];
    const lengths = fixed ? [fixed] : Array.from({ length: Math.max(0, Math.min(34, chars.length) - 14) }, (_, i) => Math.min(34, chars.length) - i);
    const valid = lengths.find((n) => n <= chars.length && groupEnd(n - 1) && mod97(chars.slice(0, n).join('')));
    let n = valid ?? null;
    let kind = 'iban';
    if (!n) {
      kind = 'ibanmaybe';
      if (fixed) n = chars.length >= fixed && groupEnd(fixed - 1) ? fixed : null;
      else {
        // up to the last group that still holds a digit, so that "BIC" or "EUR" after it is not taken in
        for (let k = chars.length - 1; k >= 14 && !n; k--) {
          if (!groupEnd(k)) continue;
          let g = k;
          while (g > 0 && !groupEnd(g - 1)) g--;
          if (/\d/.test(chars.slice(g, k + 1).join(''))) n = k + 1;
        }
      }
    }
    if (!n) continue;
    out.push({ start, end: ends[n - 1], kind, text: text.slice(start, ends[n - 1]) });
    IBAN_START.lastIndex = ends[n - 1];
  }
  return out;
}

// German identifiers; the tax, health insurance and ID card numbers count as such after their label, or (tax ID) with a valid check digit.
function germanIds(text) {
  const out = [];
  const push = (m, kind = 'idde') => out.push({ start: m.index, end: m.index + m[0].length, kind, text: m[0] });
  for (const re of [RVNR, TAXID, KVNR, IDCARD]) re.lastIndex = 0;
  let m;
  while ((m = RVNR.exec(text))) push(m);
  while ((m = TAXID.exec(text))) {
    if (TAX_CUE.test(before(text, m.index)) || taxIdValid(m[0])) push(m);
    else if (/\s/.test(m[0])) push(m, 'idnum');
  }
  while ((m = KVNR.exec(text))) push(m, KV_CUE.test(before(text, m.index)) ? 'idde' : 'idnum');
  while ((m = IDCARD.exec(text))) if (ID_CUE.test(before(text, m.index))) push(m);
  return out;
}

// All findings. Where findings overlap, the kind of the highest priority wins and the marked span also covers the overlapping
// direct identifiers, so that no part of one stays visible in the copy with placeholders. A weak signal that overlaps
// ("3201 BIC" read as postal code after an IBAN) is dropped without widening the span.
export function detect(text) {
  const t = String(text ?? '');
  if (!t.trim()) return [];
  const healthContext = HEALTH_CONTEXT.test(t) || new RegExp(HEALTH.source, 'iu').test(t);
  let all = [
    ...secrets(t),
    ...collect(t, TOKEN, 'secret', (v) => /\d/.test(v) && /[A-Za-z]/.test(v) && !/^https?:/.test(v)),
    ...ibans(t),
    ...collect(t, SVNR, 'svnr', svnrValid),
    ...germanIds(t),
    ...collect(t, EMAIL, 'email'),
    ...collect(t, PHONE, 'phone', (v) => digits(v) >= 7 && digits(v) <= 15 && (v.startsWith('+') || /[\s/.()-]/.test(v))),
    ...wholeWords(t, collect(t, HEALTH, 'health')),
    ...wholeWords(t, collect(t, HEALTH_MAYBE, healthContext ? 'health' : 'healthmaybe')),
    ...collect(t, DATE, 'date'),
    ...collect(t, ADDRESS, 'address'),
    ...collect(t, POSTAL, 'postal', (v, m) => {
      const n = Number(v.match(/\d{4,5}/)?.[0]);
      return !(n >= 1900 && n <= 2099 && YEAR_CUE.test(before(t, m.index, 24)));
    }),
    ...collect(t, NAME_SALUTATION, 'name'),
    ...collect(t, NAME_LABEL, 'name', () => true, (m) => m[1]),
    ...collect(t, NAME_CALL, 'name', () => true, (m) => m[1]),
    ...collect(t, REFERENCE, 'reference'),
    ...collect(t, PLATE, 'plate', (v) => /\d/.test(v) && !/^(?:EU|EG|DIN|ISO|EN|ART|ABS|NR|VO|KI)\b/i.test(v)),
    ...collect(t, IDNUM, 'idnum'),
  ];
  // A date right after "born" or "geb." is a date of birth.
  all = all.map((f) => (f.kind === 'date' && BIRTH_CUE.test(t.slice(Math.max(0, f.start - 24), f.start)) ? { ...f, kind: 'birthdate' } : f));
  all.sort((a, b) => a.start - b.start || PRIORITY[a.kind] - PRIORITY[b.kind] || b.end - a.end);
  let kept = [];
  for (const f of all) {
    const clashes = kept.filter((k) => f.start < k.end && f.end > k.start);
    if (!clashes.length) { kept.push(f); continue; }
    const group = [...clashes, f];
    const winner = group.reduce((w, x) => (PRIORITY[x.kind] < PRIORITY[w.kind] ? x : w));
    const span = group.filter((x) => x === winner || STRONG.has(x.kind));
    const start = Math.min(...span.map((x) => x.start));
    const end = Math.max(...span.map((x) => x.end));
    kept = kept.filter((k) => !clashes.includes(k));
    kept.push({ start, end, kind: winner.kind, text: t.slice(start, end) });
  }
  return kept.sort((a, b) => a.start - b.start);
}


export function verdict(findings) {
  if (findings.some((f) => STRONG.has(f.kind))) return 'red';
  if (findings.length) return 'amber';
  return 'green';
}

export function placeholderize(text, findings, labels) {
  let out = '';
  let pos = 0;
  for (const f of findings) {
    out += text.slice(pos, f.start) + `[${labels[f.kind] ?? f.kind.toUpperCase()}]`;
    pos = f.end;
  }
  return out + text.slice(pos);
}

export function summarize(findings) {
  const counts = {};
  for (const f of findings) counts[f.kind] = (counts[f.kind] ?? 0) + 1;
  return KINDS.filter((k) => counts[k]).map((k) => ({ kind: k, n: counts[k] }));
}

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function highlight(text, findings, labels) {
  let out = '';
  let pos = 0;
  for (const f of findings) {
    out += escapeHtml(text.slice(pos, f.start)) + `<mark class="pm pm--${STRONG.has(f.kind) ? 'strong' : 'weak'}" title="${escapeHtml(labels[f.kind] ?? f.kind)}">${escapeHtml(text.slice(f.start, f.end))}</mark>`;
    pos = f.end;
  }
  return out + escapeHtml(text.slice(pos));
}

// ---------- page wiring (browser only) ----------
if (typeof document !== 'undefined' && document.getElementById('tool-config') && document.getElementById('text')) {
  const cfg = JSON.parse(document.getElementById('tool-config')?.textContent ?? '{}');
  const ta = document.getElementById('text');
  const view = document.getElementById('view');
  const light = document.getElementById('light');
  const verdictEl = document.getElementById('verdict');
  const list = document.getElementById('findings');
  const ph = document.getElementById('placeholders');
  const phBtn = document.getElementById('placeholder-btn');
  const copyBtn = document.getElementById('copy-btn');
  const count = document.getElementById('count');
  let last = { text: '', findings: [] };
  const render = () => {
    const text = ta.value;
    const findings = detect(text);
    const v = verdict(findings);
    last = { text, findings };
    view.innerHTML = text ? highlight(text, findings, cfg.labels) : `<span class="pm-empty">${escapeHtml(cfg.empty)}</span>`;
    light.className = `light light--${text ? v : 'off'}`;
    verdictEl.textContent = text ? cfg.verdicts[v] : cfg.start;
    const sum = summarize(findings);
    list.innerHTML = sum.map((s) => `<li><span class="sc-pill ${STRONG.has(s.kind) ? 'sc-pill--red' : 'sc-pill--amber'}">${s.n}</span> ${escapeHtml(cfg.labels[s.kind])}</li>`).join('');
    count.textContent = text ? cfg.countText(findings.length) : '';
    phBtn.disabled = !findings.length;
  };
  cfg.countText = (n) => (cfg.count ?? '%n').replace('%n', String(n));
  ta.addEventListener('input', render);
  phBtn?.addEventListener('click', () => { ph.value = placeholderize(last.text, last.findings, cfg.placeholders); ph.hidden = false; copyBtn.hidden = false; });
  copyBtn?.addEventListener('click', async () => { try { await navigator.clipboard.writeText(ph.value); copyBtn.textContent = cfg.copied; } catch { ph.select(); } });
  render();
}
