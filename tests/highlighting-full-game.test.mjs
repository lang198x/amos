import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { highlighter, tokens, scopes, fragments, assertScope } from './helpers/highlighter.mjs';

const base = new URL('../corpus/highlighting/', import.meta.url);
const source = await readFile(new URL('bank-or-risk.amos.txt', base), 'utf8');
const inventory = JSON.parse(await readFile(new URL('bank-or-risk.inventory.json', base), 'utf8'));

test('the pinned game matches every reviewed builtin and label occurrence in both themes', () => {
  assert.equal(createHash('sha256').update(source).digest('hex'), inventory.source_sha256);
  assert.equal(inventory.entries.length, 398);
  const sourceLines = source.split('\n');
  for (const theme of ['dark-plus', 'light-plus']) {
    const highlighted = tokens(source, theme);
    assert.equal(highlighted.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    for (const [line, start, end, text, scope] of inventory.entries) {
      assert.equal(sourceLines[line - 1].slice(start, end), text);
      assertScope(highlighted[line - 1], start, end, scope, `${theme} line ${line}: ${text}`);
    }
    const observed = [];
    highlighted.forEach((line, index) => {
      let offset = 0;
      for (const item of fragments(line)) {
        const own = scopes(item).find((s) => ['keyword.control.amos', 'support.function.amos',
          'variable.language.amos', 'entity.name.label.amos'].includes(s)
          || (s === 'keyword.operator.amos' && /^[A-Za-z]+$/.test(item.content)));
        if (own) observed.push([index + 1, offset, offset + item.content.length, item.content, own]);
        if (scopes(item).includes('variable.other.amos')) {
          assert.match(item.content, /^BR_[A-Z0-9_]+\$?$/, `unexpected identifier at line ${index + 1}`);
        }
        offset += item.content.length;
      }
    });
    assert.deepEqual(observed, inventory.entries, `${theme}: no extra or missing vocabulary spans`);
  }
});

test('array assignments and expression references remain identifiers', () => {
  const lines = source.split('\n');
  for (const theme of ['dark-plus', 'light-plus']) {
    const highlighted = tokens(source, theme);
    let checked = 0;
    lines.forEach((line, index) => {
      const start = line.indexOf('BR_MARK(');
      if (start < 0) return;
      assertScope(highlighted[index], start, start + 'BR_MARK'.length, 'variable.other.amos');
      checked++;
    });
    assert.equal(checked, 4);
  }
});

test.after(() => highlighter.dispose());
