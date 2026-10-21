import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import amosInterface from '../interface.mjs';
import { highlighter, assertScope, fragments, scopes } from './helpers/highlighter.mjs';

await highlighter.loadLanguage(amos3d, amosInterface);
const base = new URL('../corpus/independent/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('sources.json', base), 'utf8'));
assert.equal(manifest.sources.length, 3);
const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
for (const item of manifest.sources) {
  test(`independent ${item.kind} retains reviewed scopes, exact source and rendered styles`, async () => {
    const raw = await readFile(new URL(item.file, base));
    assert.equal(createHash('sha256').update(raw).digest('hex'), item.sha256);
    const source = raw.toString('utf8');
    const registrations = item.file.includes('interface') ? [amosInterface] : [amos, amos3d];
    for (const registration of registrations) {
      await api.loadCustomLanguage(registration);
      for (const theme of ['dark-plus', 'light-plus']) {
        const lines = highlighter.codeToTokensBase(source, { lang: registration.name, theme, includeExplanation: true });
        assert.equal(lines.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
        for (const [line, start, end, word, scope] of item.ranges) {
          assert.equal(source.split('\n')[line - 1].slice(start, end), word);
          assertScope(lines[line - 1], start, end, scope, `${item.file}:${line}`);
        }
        if (item.file === 'numbers.amos.txt') {
          let checked = 0;
          for (const [index, line] of source.split('\n').entries()) {
            if (!line.startsWith('Data ')) continue;
            const literal = line.slice(5).replace(/^-/, '');
            const numeric = fragments(lines[index]).filter((part) => scopes(part).includes('constant.numeric.decimal.amos'));
            assert.deepEqual(numeric.map((part) => part.content), [literal], line);
            checked += 1;
          }
          assert.equal(checked, 76);
        }
        const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
        assert.ok(html.css.includes('::highlight('));
        assert.ok(html.stats.uniqueStyles >= 2);
      }
    }
  });
}

test.after(() => highlighter.dispose());
