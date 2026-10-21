import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import amos from '../../index.mjs';
import { guardTokenization } from './tokenization-guard.mjs';

assert.ok(process.env.AMOS_SHIKI_MODULE, 'AMOS_SHIKI_MODULE must name an existing Shiki installation');
const { createHighlighter } = await import(pathToFileURL(process.env.AMOS_SHIKI_MODULE).href);
const seed = await createHighlighter({ langs: [amos], themes: [] });
try {
  guardTokenization(seed.getLanguage('amos'));
} finally {
  seed.dispose();
}
