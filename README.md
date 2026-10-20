# AMOS language kit

Parse small AMOS listings, check the supported opening-program surface, and
highlight source in Shiki and TextMate-based editors.

This is the first bounded implementation. It builds a typed AST with complete
source tokens and locations. It does not yet read/write native `.AMOS` files,
compile programs or provide an LSP server. [Coverage](docs/coverage.md) names the
supported forms and result meanings; [provenance](docs/provenance.md) records
manual sources and original-runtime observations.

## Check a listing

With stable Rust 1.98 or later:

```sh
cargo run -- check --profile amos-pro-2.00-observed corpus/opening/sources/message.amos.txt
cargo test
cargo fmt --check
cargo clippy --all-targets -- -D warnings
```

A successful result reports supported source structure. It does not establish
native runtime compatibility. Unsupported statements, unresolved names and
unknown profiles cannot pass silently. The library exposes `parse` and `check`
with typed statements, tokens and byte spans. Each implemented instruction lives
in its own small Rust module under `src/instructions/`.

## Highlight a listing

The dependency-free grammar package is published on npm under the preview
`next` tag. Install it in a consumer which already uses Shiki:

```sh
npm install @lang198x/amos@next
```

Use `@lang198x/amos@0.1.0` to pin this first preview. A local tarball can also be
built with `npm pack --pack-destination dist` after creating `dist/`.

```js
import { createHighlighter } from 'shiki';
import amos from '@lang198x/amos';

const highlighter = await createHighlighter({
  langs: [amos],
  themes: ['dark-plus'],
});
const html = highlighter.codeToHtml('Print "Hello"', {
  lang: 'amos',
  theme: 'dark-plus',
});
highlighter.dispose();
```

For shiki-highlights' `shiki-highlight-api`:

```js
import { loadCustomLanguage, codeToHighlightHtml } from 'shiki-highlight-api';
import amos from '@lang198x/amos';

await loadCustomLanguage(amos);
const result = await codeToHighlightHtml('Print "Hello"', { lang: 'amos' });
```

Other TextMate consumers can use `syntaxes/amos.tmLanguage.json` directly.
The grammar provides theme-independent scopes; consumers choose their colours.
Compatibility with other engines must be tested before it is advertised.

## VS Code

`editors/vscode/` is a thin declarative extension. Its grammar is generated from
the canonical file; `npm run check:editor` fails on drift. Build an installable
VSIX with `python3 scripts/package-editor.py`; this uses only Python's standard
library. No Marketplace publication is implied by a local package.

## Verify packages

Node 24 or later is required for package checks:

```sh
npm test
npm run check:editor
```

Integration tests require existing installations, not hidden downloads. Set
`AMOS_SHIKI_MODULE` to Shiki's module entry file and `AMOS_HIGHLIGHT_API_MODULE`
to shiki-highlight-api's ESM entry file, then run `npm run test:integrations`.
Missing integrations fail the check; the suite never silently skips them.
See [verification](docs/verification.md) for versions actually exercised.

## Ownership and licence

Lang198x owns the AMOS frontend and highlighting. Format198x owns native file
codecs; Build198x owns media packaging. Native loadable output is a later
milestone, with direct compilation beyond the initial need.

New implementation and grammar: GPL-2.0-or-later, see LICENSE. Retained teaching
sources under `corpus/opening/`: MIT, see `corpus/LICENSE`. Runtime screenshots
are evidence of original software, not newly licensed Lang198x code.
