// The free tools' logic, imported from the browser modules: nothing here needs a DOM.
// Test values are assembled at runtime so that no file holds anything that looks like a real credential.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detect, verdict, placeholderize, summarize, highlight } from '../public/tools/personal.js';
import { decide } from '../public/tools/may-this-go-in.js';

const kinds = (text) => detect(text).map((f) => f.kind);
const exampleIban = ['AT61', '1904', '3002', '3457', '3201'].join(' '); // the published example IBAN
const svnr = ['1237', '010180'].join(' '); // check digit 7 fits the weights 3 7 9 0 5 8 4 2 1 6
const pw = ['Pass', 'wort'].join('') + ': ' + ['hunter', '2', 'example'].join('');
const token = ['sk', 'test', 'EXAMPLE'].join('_') + 'ABCDEFGHIJ1234567890';

test('personal check finds direct identifiers and sensitive data', () => {
  const text = `Kunde: Max Mustermann, geb. 12.03.1980, Tel. +43 664 1234567, max@example.com, IBAN ${exampleIban}, SV-Nr. ${svnr}, Hauptstraße 12/3, 3902 Vitis. Diagnose: Burnout. ${pw}`;
  const found = kinds(text);
  for (const k of ['name', 'birthdate', 'phone', 'email', 'iban', 'svnr', 'address', 'postal', 'health', 'secret']) assert.ok(found.includes(k), `finds ${k} in ${found}`);
  assert.equal(verdict(detect(text)), 'red');
});

test('personal check rejects an invalid IBAN and an invalid social security number', () => {
  assert.ok(!kinds(`IBAN ${exampleIban.slice(0, -1)}2`).includes('iban'), 'wrong check digits');
  assert.ok(!kinds(`Nummer ${svnr.replace('1237', '1238')}`).includes('svnr'), 'wrong check digit');
  assert.ok(kinds(svnr).includes('svnr'), 'valid check digit');
});

test('personal check stays green on a harmless business text and amber on weak signals', () => {
  const harmless = 'Angebot für einen Schaltschrank, 3 Stück, Lieferung in zwei Wochen, Montage nach DIN EN 61439. Bitte um Rückmeldung bis Freitag.';
  assert.deepEqual(detect(harmless), []);
  assert.equal(verdict([]), 'green');
  const weak = 'Termin am 14.11.2026 in 1010 Wien, Fahrzeug W-12345A.';
  assert.equal(verdict(detect(weak)), 'amber', kinds(weak).join(','));
});

test('personal check replaces findings with placeholders and escapes the highlighted view', () => {
  const text = 'Contact: Anna Beispiel <anna@example.com>, phone 0664 1234567.';
  const findings = detect(text);
  const out = placeholderize(text, findings, { name: 'NAME', email: 'EMAIL', phone: 'PHONE' });
  assert.ok(out.includes('[EMAIL]') && out.includes('[PHONE]') && !out.includes('anna@example.com'), out);
  const html = highlight(text, findings, { name: 'Name', email: 'Email', phone: 'Phone' });
  assert.ok(html.includes('&lt;') && html.includes('<mark class="pm pm--strong"'), html);
  assert.ok(summarize(findings).some((s) => s.kind === 'email' && s.n === 1));
});

test('personal check marks access data and long tokens, labels and salutations', () => {
  assert.ok(kinds(`API Key: ${token}`).includes('secret'));
  assert.ok(kinds('Sehr geehrter Herr Huber Maier, danke.').includes('name'));
  assert.ok(kinds('Kundennummer: K-2024-0815 bitte angeben').includes('reference'));
  assert.ok(!kinds('Art. 50 Abs. 4 der Verordnung (EU) 2024/1689').includes('plate'), 'no licence plate in a legal citation');
  // Common sentence forms around a password (V2 problem 11); the value is assembled at runtime.
  const value = ['Sommer', '2024'].join('');
  const word = ['Pass', 'wort'].join('');
  for (const s of [`Das ${word} für den Server ist ${value}`, `Mein ${word} heißt ${value}`, `Das neue ${word} lautet\n${value}`, `Zugang: admin / ${value}`]) {
    assert.ok(kinds(s).includes('secret'), `secret in: ${s}`);
    assert.ok(!placeholderize(s, detect(s), { secret: 'SECRET' }).includes(value), `value replaced in: ${s}`);
  }
  // "behindert" as a verb and "Schwarztee" are no health words (V2 problem 15); "Behinderung" is.
  assert.notEqual(verdict(detect('Der Stau behindert den Verkehr.')), 'red');
  assert.ok(!kinds('Wir trinken Schwarztee.').includes('health'));
  assert.ok(kinds('Grad der Behinderung 50').includes('health'));
});

test('traffic light: red for protected data, private accounts and decisions about persons', () => {
  assert.equal(decide({ data: ['persons'], access: 'approved', training: 'no', purpose: 'allowed' }).level, 'red');
  assert.equal(decide({ data: [], access: 'private', training: 'no', purpose: 'allowed' }).level, 'red');
  assert.equal(decide({ data: [], access: 'approved', training: 'no', purpose: 'person' }).level, 'red');
  const r = decide({ data: ['health', 'access'], access: 'private', training: 'unknown', purpose: 'allowed' });
  assert.equal(r.level, 'red');
  assert.deepEqual(r.reasons, ['data:access', 'data:health', 'access:private', 'training:unknown']);
});

test('traffic light: amber for open questions, green when everything is settled', () => {
  assert.equal(decide({ data: [], access: 'unknown', training: 'no', purpose: 'allowed' }).level, 'amber');
  assert.equal(decide({ data: [], access: 'approved', training: 'yes', purpose: 'allowed' }).level, 'amber');
  assert.equal(decide({ data: [], access: 'unapproved', training: 'no', purpose: 'other' }).level, 'amber');
  const g = decide({ data: [], access: 'approved', training: 'no', purpose: 'allowed' });
  assert.equal(g.level, 'green');
  assert.deepEqual(g.reasons, ['ok']);
});
