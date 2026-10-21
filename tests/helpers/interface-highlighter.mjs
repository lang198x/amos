import assert from 'node:assert/strict';
import amosInterface from '../../interface.mjs';
import { highlighter, assertScope, fragments, scopes } from './highlighter.mjs';

await highlighter.loadLanguage(amosInterface);
export { highlighter, assertScope };
export const themes = ['dark-plus', 'light-plus'];
export const render = (source, theme) => highlighter.codeToTokensBase(source, {
  lang: 'amos-interface', theme, includeExplanation: true,
});
export const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0, source);
  assertScope(render(source, theme)[0], start, start + word.length, scope, source);
};
export const lacks = (source, word, scope, theme) => {
  const first = source.indexOf(word);
  assert.ok(first >= 0, source);
  let offset = 0;
  for (const token of fragments(render(source, theme)[0])) {
    const next = offset + token.content.length;
    if (next > first && offset < first + word.length) assert.ok(!scopes(token).includes(scope), source);
    offset = next;
  }
};
