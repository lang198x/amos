import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import { highlighter, tokens, fragments, scopes, assertScope } from './helpers/highlighter.mjs';

test('text/keyboard dollar forms retain their documented category in expression and assignment contexts', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const call of ['Pen$(2)', 'Paper$(0)', 'Cmove$(1,2)', 'Input$(2)', 'Scan$(69)', 'Cleft$', 'Cright$']) {
      const word = call.split('(')[0];
      const source = `MC_TEXT$=${call}`;
      const start = source.indexOf(word);
      assertScope(tokens(source, theme)[0], start, start + word.length, 'support.function.amos', source);
    }
    for (const source of ['Key$(1)="Print"', 'MC_MACRO$=Key$(1)']) {
      const start = source.indexOf('Key$');
      assertScope(tokens(source, theme)[0], start, start + 4, 'variable.language.amos', source);
    }
    for (const name of ['MC_KEY$', 'Key$Extra', 'Pen$Extra', 'InputValue']) {
      assertScope(tokens(`${name}=1`, theme)[0], 0, name.length, 'variable.other.amos', name);
    }
  }
});

test('partial multiword endings do not acquire command or function scopes', () => {
  for (const source of ['Key Shifting', 'Remember Yesterday', 'Set Tabs', 'Line InputValue']) {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const token of fragments(tokens(source, theme)[0])) {
        if (!token.content.trim()) continue;
        assert.ok(scopes(token).includes('variable.other.amos'), source);
      }
    }
  }
});

test('Text stays a command while a partial Styles ending stays an identifier', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    const line = tokens('Text Stylesheet', theme)[0];
    assertScope(line, 0, 4, 'keyword.control.amos');
    assertScope(line, 5, 15, 'variable.other.amos');
  }
});

test('format masks and macro contents stay strings while ? is a lexical print shortcut', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [prefix, body] of [['Print Using ', '###.## Key$ Input$ ?'], ['Key$(1)=', "'note Print' + Key Shift"]]) {
      const source = `${prefix}"${body}"`;
      assertScope(tokens(source, theme)[0], prefix.length + 1, prefix.length + 1 + body.length, 'string.quoted.double.amos');
    }
    const source = '?: ? "Key$?"';
    for (const start of [0, 3]) assertScope(tokens(source, theme)[0], start, start + 1, 'keyword.control.amos');
    assertScope(tokens(source, theme)[0], 6, 11, 'string.quoted.double.amos');
  }
});

test('the fresh text/keyboard listing survives both highlighting consumers and themes', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/text-keyboard.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    const result = tokens(source, theme);
    assert.equal(result.map((line) => line.map((t) => t.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('TEXT AND INPUT'));
    assert.ok(html.html.includes('Line Input'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
