import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import amos from '../../index.mjs';

assert.ok(process.env.AMOS_SHIKI_MODULE, 'AMOS_SHIKI_MODULE must name an existing Shiki installation');
const { createHighlighter } = await import(pathToFileURL(process.env.AMOS_SHIKI_MODULE).href);
export const highlighter = await createHighlighter({ langs: [amos], themes: ['dark-plus', 'light-plus'] });
export const tokens = (source, theme = 'dark-plus') => highlighter.codeToTokensBase(source, {
  lang: 'amos', theme, includeExplanation: true,
});
export const scopes = (token) => token.explanation?.flatMap((item) => item.scopes.map((s) => s.scopeName)) ?? [];

// Check every character of a source range, even when theme styles merge tokens.
export const assertScope = (line, start, end, scope, context = '') => {
  assert.ok(end > start, `empty expectation: ${context}`);
  let offset = 0;
  let checked = 0;
  for (const token of line) {
    const next = offset + token.content.length;
    const overlap = Math.max(0, Math.min(next, end) - Math.max(offset, start));
    if (overlap) {
      assert.ok(scopes(token).includes(scope), `${context}: ${JSON.stringify(token.content)} lacks ${scope}`);
      checked += overlap;
    }
    offset = next;
  }
  assert.equal(checked, end - start, `uncovered range: ${context}`);
};
