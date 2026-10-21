import test from 'node:test';
import assert from 'node:assert/strict';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope, fragments, scopes } from './helpers/highlighter.mjs';

await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0, source);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, source);
};
for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} ordinary decimal/scientific forms stay whole without stealing identifiers`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const literal of ['0', '12', '.5', '1.', '1.25', '1e3', '1E+17', '2.2250738585072e-308', '9.22337 E+18', '.5 E - 3']) {
        const line = render(`Print ${literal}`, lang, theme)[0];
        const numbers = fragments(line).filter((part) => scopes(part).includes('constant.numeric.decimal.amos'));
        assert.deepEqual(numbers.map((part) => part.content), [literal], literal);
      }
      for (const name of ['VALUE1E3', 'E10', 'VALUE#', 'VALUE_123']) check(`${name}=1`, name, 'variable.other.amos', lang, theme);
      for (const literal of ['$FF', '%1010']) check(`Print ${literal}`, literal, literal[0] === '$' ? 'constant.numeric.hex.amos' : 'constant.numeric.binary.amos', lang, theme);
      check('Print -1e-3', '-', 'keyword.operator.amos', lang, theme);
      check('Print 1e-3-2', '1e-3', 'constant.numeric.decimal.amos', lang, theme);
    }
  });

  test(`${lang} line-head named/numeric labels coexist with inline statements and preserve keyword precedence`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const source of ['RC_BEGIN:', 'RC_BEGIN: Print "x"', '  RC_BEGIN:Print "x"']) check(source, 'RC_BEGIN', 'entity.name.label.amos', lang, theme);
      for (const source of ['5 Print "x"', '  10: Print "x"', '100']) check(source, source.trim().match(/^[0-9]+/)[0], 'entity.name.label.amos', lang, theme);
      check('RC_BEGIN :', 'RC_BEGIN', 'variable.other.amos', lang, theme);
      check('Print 10: RC_BEGIN:', 'RC_BEGIN', 'variable.other.amos', lang, theme);
      check('Print: End', 'Print', 'keyword.control.amos', lang, theme);
      check('Start:', 'Start', 'support.function.amos', lang, theme);
      check('Print 5', '5', 'constant.numeric.decimal.amos', lang, theme);
    }
  });

  test(`${lang} both quote forms remain opaque while physical-line apostrophes remain comments`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const [quote, kind] of [['"', 'double'], ["'", 'single']]) {
        const text = 'Rem: Print 1e3 RC_BEGIN: \\path';
        check(`Print ${quote}${text}${quote}: End`, text, `string.quoted.${kind}.amos`, lang, theme);
        const result = render(`Print ${quote}unfinished\nEnd`, lang, theme);
        assertScope(result[1], 0, 3, 'keyword.control.amos');
      }
      check("  'Print 'text'", "Print 'text'", 'comment.line.apostrophe.amos', lang, theme);
      check('Print 1: Rem "text": End', '"text": End', 'comment.line.rem.amos', lang, theme);
      check('10 Rem Print "ignored"', '10', 'entity.name.label.amos', lang, theme);
      check('10 Rem Print "ignored"', 'Rem Print "ignored"', 'comment.line.rem.amos', lang, theme);
      check('RC_BEGIN: Rem Print "ignored"', 'RC_BEGIN', 'entity.name.label.amos', lang, theme);
      check('RC_BEGIN: Rem Print "ignored"', 'Rem Print "ignored"', 'comment.line.rem.amos', lang, theme);
      check('Remember=1', 'Remember', 'variable.other.amos', lang, theme);
      check("Dir 'RAM:Rem'", 'RAM:Rem', 'string.quoted.single.amos', lang, theme);
    }
  });
}

test.after(() => highlighter.dispose());
