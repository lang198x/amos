import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { highlighter } from './helpers/highlighter.mjs';
import amos from '../index.mjs';

// Exercise the actual TextMate engine through the integration preloader. A clock
// jump gives a reproducible early stop without depending on machine load.
const starved = (run) => {
  const now = Date.now;
  let elapsed = 0;
  Date.now = () => now() + (elapsed += 1000);
  try { return run(); } finally { Date.now = now; }
};
const source = 'Print 1: '.repeat(100);

test('both real TextMate passes reject early stops at the unchanged deadline', () => {
  const grammar = highlighter.getLanguage('amos');
  for (const method of ['tokenizeLine', 'tokenizeLine2']) {
    assert.throws(() => starved(() => grammar[method](source, null, 500)), new RegExp(`Incomplete Shiki tokenization: ${method} stopped early`));
  }
});

test('the selected shiki-highlights consumer also rejects incomplete tokenization', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE);
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  // The API awaits its singleton/theme before tokenizing; keep the clock guard
  // active until the asynchronous rendering has settled.
  const now = Date.now;
  let elapsed = 0;
  Date.now = () => now() + (elapsed += 1000);
  try {
    await assert.rejects(() => api.codeToHighlightHtml(source, { lang: 'amos', theme: 'dark-plus' }), /Incomplete Shiki tokenization: tokenizeLine2 stopped early/);
  } finally {
    Date.now = now;
  }
});

test.after(() => highlighter.dispose());
