import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amosInterface from '../interface.mjs';
import amos3d from '../amos-3d.mjs';
import { fragments, scopes } from './helpers/highlighter.mjs';
import { highlighter, render, check, themes, assertScope } from './helpers/interface-highlighter.mjs';

const lexical = JSON.parse(await readFile(new URL('../specifications/interface/lexical.json', import.meta.url), 'utf8'));

test('Interface literals, operators and parameter functions retain separate lexical scopes', () => {
  for (const theme of themes) {
    for (const [word, kind] of [['123', 'decimal'], ['$2a', 'hex'], ['$ABCD', 'hex'], ['%101010', 'binary']]) {
      check(`SV 0,${word};`, word, `constant.numeric.${kind}.amos-interface`, theme);
    }
    const operands = fragments(render('12 3 +', theme)[0]).filter((token) => scopes(token).includes('constant.numeric.decimal.amos-interface'));
    assert.deepEqual(operands.map((token) => token.content), ['12', '3']);
    for (const word of [...lexical.conditional, '+', '-', '*', '/', '!', '#', 'NEg']) {
      check(`SV 0,2 3 ${word};`, word, 'keyword.operator.amos-interface', theme);
    }
    for (const word of lexical.parameter_family.members) check(word, word, 'variable.parameter.amos-interface', theme);
    for (const word of ['P0', 'P10', 'p1']) {
      const line = render(word, theme)[0];
      assert.ok(line.every((token) => !token.explanation.some((part) => part.scopes.some((scope) => scope.scopeName === 'variable.parameter.amos-interface'))));
    }
    for (const word of [';', ':', ',']) check(`SV 0,1${word}`, word, 'punctuation.separator.amos-interface', theme);
    const button = "BU 2,8,8,64,16,0,0,1;[PR 2,2,'Go',3;][]";
    check(button, '[', 'punctuation.section.brackets.begin.amos-interface', theme);
    check(button, ']', 'punctuation.section.brackets.end.amos-interface', theme);
  }
});

test('Interface quotes are opaque and recover at the next line; lowercase notes are not BASIC comments', () => {
  for (const theme of themes) {
    for (const [quote, kind] of [["'", 'single'], ['"', 'double']]) {
      const payload = 'SW PR IF [] {zone} $FF P1 ;';
      check(`PR 0,0,${quote}${payload}${quote},3;`, payload, `string.quoted.${kind}.amos-interface`, theme);
      const lines = render(`PR 0,0,${quote}unfinished\nEX;`, theme);
      assertScope(lines[1], 0, 2, 'keyword.control.amos-interface');
    }
    check("'back\\slash'", 'back\\slash', 'string.quoted.single.amos-interface', theme);
    check('rem lowercase notes', 'rem lowercase notes'.split(' ')[0], 'meta.ignored.amos-interface', theme);
    check('rem PR 0,0,1,3;', 'PR', 'keyword.control.amos-interface', theme);
    check('Rem PR 0,0,1,3;', 'Rem', 'meta.unclassified.amos-interface', theme);
  }
});

test('BASIC payloads stay opaque in both existing BASIC modes', async () => {
  await highlighter.loadLanguage(amos3d);
  for (const theme of themes) {
    for (const lang of ['amos', 'amos-3d']) {
      const source = 'D$="BA 0,0; SI 80,40; PR 0,0,SW,3; EX;"';
      const result = highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
      assertScope(result[0], source.indexOf('"') + 1, source.lastIndexOf('"'), 'string.quoted.double.amos');
    }
  }
});

test('independent Interface notebook preserves source and produces styled HTML in both themes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE);
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amosInterface);
  const source = await readFile(new URL('../specifications/interface/highlighting.interface.txt', import.meta.url), 'utf8');
  for (const theme of themes) {
    assert.equal(render(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos-interface', theme });
    assert.ok(html.html.includes('GraphicBox'));
    assert.ok(html.html.includes('CAll'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.uniqueStyles >= 3);
  }
});

test.after(() => highlighter.dispose());
