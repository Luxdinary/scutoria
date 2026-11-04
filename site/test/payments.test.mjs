import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeForm, verifyStripeSignature, signPayload } from '../src/shop/payments.mjs';

test('encodeForm nests parameters the way Stripe expects', () => {
  const q = encodeForm({ mode: 'payment', line_items: [{ quantity: 1, price_data: { currency: 'eur', product_data: { name: 'X' } } }], automatic_tax: { enabled: true }, skip: undefined }).toString();
  assert.ok(q.includes('mode=payment'));
  assert.ok(q.includes('line_items%5B0%5D%5Bprice_data%5D%5Bcurrency%5D=eur'));
  assert.ok(q.includes('line_items%5B0%5D%5Bprice_data%5D%5Bproduct_data%5D%5Bname%5D=X'));
  assert.ok(q.includes('automatic_tax%5Benabled%5D=true'));
  assert.ok(!q.includes('skip'));
});

test('webhook signatures verify and tampering, wrong secrets and old timestamps are rejected', () => {
  const secret = 'whsec_test_only';
  const body = '{"id":"evt_1","type":"checkout.session.completed"}';
  const header = signPayload(body, secret);
  assert.equal(verifyStripeSignature(body, header, secret), true);
  assert.equal(verifyStripeSignature(body + ' ', header, secret), false);
  assert.equal(verifyStripeSignature(body, header, 'whsec_other'), false);
  assert.equal(verifyStripeSignature(body, signPayload(body, secret, Math.floor(Date.now() / 1000) - 1000), secret), false);
  assert.equal(verifyStripeSignature(body, '', secret), false);
  assert.equal(verifyStripeSignature(body, header, ''), false);
  assert.equal(verifyStripeSignature(body, 't=abc,v1=zz', secret), false);
});
