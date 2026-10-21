import test from 'node:test';
import assert from 'node:assert/strict';
import { guardTokenization } from './helpers/tokenization-guard.mjs';

const fixture = () => {
  class Grammar {
    tokenizeLine(...args) { this.args = args; return this.result; }
    tokenizeLine2(...args) { this.args = args; return this.result; }
  }
  const seed = new Grammar();
  guardTokenization(seed);
  guardTokenization(seed);
  return new Grammar();
};

test('tokenization guard preserves completed results, arguments and receivers for both passes', () => {
  const grammar = fixture();
  const state = {};
  for (const method of ['tokenizeLine', 'tokenizeLine2']) {
    grammar.result = { stoppedEarly: false, tokens: [1, 2], ruleStack: state };
    assert.equal(grammar[method]('Print 1', state, 500), grammar.result);
    assert.deepEqual(grammar.args, ['Print 1', state, 500]);
  }
});

test('tokenization guard rejects incomplete output on later instances in either pass', () => {
  const grammar = fixture();
  grammar.result = { stoppedEarly: true, tokens: [] };
  for (const method of ['tokenizeLine', 'tokenizeLine2']) {
    assert.throws(() => grammar[method]('Print 1', null, 500), {
      message: `Incomplete Shiki tokenization: ${method} stopped early (limit 500 ms); output cannot verify highlighting`,
    });
  }
});

test('tokenization guard preserves original failures and rejects incompatible grammars', () => {
  const failure = new Error('engine failed');
  class Grammar {
    tokenizeLine() { throw failure; }
    tokenizeLine2() { throw failure; }
  }
  const grammar = new Grammar();
  guardTokenization(grammar);
  for (const method of ['tokenizeLine', 'tokenizeLine2']) assert.throws(() => grammar[method](), (error) => error === failure);
  assert.throws(() => guardTokenization({}), /expected both tokenization methods/);
});
