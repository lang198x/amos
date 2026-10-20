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

Use `@lang198x/amos@0.2.0` to pin this highlighting preview. A local tarball can also be
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

Download the [AMOS editor 0.2.0 VSIX](https://github.com/lang198x/amos/releases/download/v0.2.0/lang198x-lang198x-amos-0.2.0.vsix),
then run **Extensions: Install from VSIX** from VS Code's Command Palette and
select the downloaded file. Open a plain-text `.amos.txt` listing; its language
mode should be **AMOS**. For text listings with another suffix, choose **Change
Language Mode → AMOS** explicitly. Native tokenised `.AMOS` files need decoding
and are deliberately not associated automatically.

The preview uses your editor's active theme. It colours the documented subset;
it does not provide compiler errors, completion or a language server. The package
uses identifier `lang198x.lang198x-amos` and the approved L icon. The Marketplace
submission remains private while coverage is developed and reviewed;
Microsoft validation does not trigger a public release. See the
[release decision](decisions/marketplace-release-readiness.md). The downloadable
VSIX works separately.

`editors/vscode/` is a thin declarative extension. Its grammar is generated from
the canonical file; `npm run check:editor` fails on drift. Build an installable
VSIX with `python3 scripts/package-editor.py`; this uses only Python's standard
library. The [game baseline](audit/2026-10-highlighting/README.md) identifies the
next highlighting groups without claiming full language coverage.

The 0.2.0 highlighting preview includes the
[full-game highlighting milestone](docs/coverage.md#full-game-highlighting-milestone).
Its pinned source and independently reviewed scope inventory check all 398
builtin/control-word and label occurrences in Bank or Risk in two themes.
Earlier preview assets retain their original grammar. The Rust parser remains
at 0.1.0 with its opening-program surface, and the Marketplace preview stays
private. See the [0.2.0 release notes](docs/releases/0.2.0.md).

The [manual-led core inventory](specifications/manual-core/README.md) now drives
broader coverage: current source highlights 490 BASIC entries from Professional manual
chapters 5.1–5.9, 6.1–6.5, 7.1–7.6 and 10.1–10.2, including AMAL control commands.
The file/directory I/O continuation is unreleased; preview 0.2.0 retains its
452-entry BASIC inventory.
Fourteen embedded menu commands and 36 [AMAL records](specifications/amal/README.md)
are inventoried separately; their string payloads remain opaque.
[AMOS 3D](specifications/extensions/amos-3d/README.md) is tracked as an optional
extension with a 59-record manual inventory, three source-level answers and a pinned-binary
answer to the collision-result question. The opt-in `amos-3d` profile highlights
those records in preview 0.2.0. Other manual chapters and edition/extension
qualification remain separate work.

## Optional AMOS 3D highlighting

Preview 0.2.0 adds a separate `@lang198x/amos/amos-3d` registration. The default `amos`
registration and its file associations keep their existing behaviour.

For Shiki (and Astro's Shiki language configuration), register the opt-in profile:

```js
import amos3d from '@lang198x/amos/amos-3d';

const highlighter = await createHighlighter({
  langs: [amos3d],
  themes: ['dark-plus'],
});
const html = highlighter.codeToHtml('Td Redraw', {
  lang: 'amos-3d', theme: 'dark-plus',
});
```

Import `createHighlighter` from your existing Shiki installation. For Astro,
pass `[amos3d]` as `markdown.shikiConfig.langs` and use `amos-3d` code fences.
For shiki-highlight-api, pass `amos3d` to `loadCustomLanguage`. Other TextMate
consumers can use `@lang198x/amos/amos-3d.tmLanguage.json` directly.

In the 0.2.0 VS Code preview, choose **AMOS + AMOS 3D** from the language
mode selector. To remember it for a project, add a workspace association such as
`"files.associations": { "*.amos.txt": "amos-3d" }`. The profile selects vocabulary;
it does not install the extension, qualify a release or validate a program.

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
