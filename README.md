# AMOS language kit

Parse small AMOS listings, check a bounded source surface, and
highlight AMOS, standalone AMAL and Interface source in Shiki and TextMate-based editors.

Highlighting follows the Professional manual, with opt-in AMOS 3D, standalone
AMAL and standalone Interface modes. Creator, Easy and other release/extension
revisions remain unqualified. The [readiness review](docs/highlighting-readiness.md)
states the tested scope and remaining limits.

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
native runtime compatibility. Unsupported statements, unresolved statement calls and
unknown profiles cannot pass silently. The library exposes `parse` and `check`
with typed statements, tokens and byte spans. Each implemented instruction lives
in its own small Rust module under `src/instructions/`.

## Highlight a listing

Highlighting preview **0.3.0 is published**; see the
[release notes](docs/releases/0.3.0.md) for scope and limits. It adds standalone
AMAL/Interface and the readiness fixes.

The currently published dependency-free grammar package is available on npm
under the preview `next` tag (0.3.0). Install it in a consumer which already uses Shiki:

```sh
npm install @lang198x/amos@next
```

Use `@lang198x/amos@0.3.0` to pin this highlighting preview. A local tarball can also be
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

Install [AMOS — Lang198x](https://marketplace.visualstudio.com/items?itemName=lang198x.lang198x-amos)
and select **Install Pre-Release Version** (0.3.1). The editor-only patch adds
public-listing metadata and installation text; its four grammars match npm
preview 0.3.0 exactly.

Alternatively, download the [0.3.1 VSIX](https://github.com/lang198x/amos/releases/download/v0.3.1/lang198x-lang198x-amos-0.3.1.vsix),
then use **Extensions: Install from VSIX**. Open a plain-text `.amos.txt` listing;
its mode should be **AMOS**. For another suffix, choose **Change Language Mode →
AMOS** explicitly. Native tokenised `.AMOS` files require decoding and are not
associated automatically. Select the optional 3D, AMAL and Interface modes
explicitly as described below.

The preview uses the active theme and colours the documented lexical subset.
It does not provide compiler errors, completion or a language server. Its
identifier is `lang198x.lang198x-amos`, with the approved L icon. Public preview
approval is recorded in the
[release decision](decisions/marketplace-release-readiness.md).

`editors/vscode/` is a thin declarative extension. Its grammar is generated from
the canonical file; `npm run check:editor` fails on drift. Build an installable
VSIX with `python3 scripts/package-editor.py --pre-release --public`; this uses only Python's standard
library. The [game baseline](audit/2026-10-highlighting/README.md) identifies the
next highlighting groups without claiming full language coverage.

The 0.2.0 highlighting preview includes the
[full-game highlighting milestone](docs/coverage.md#full-game-highlighting-milestone).
Its pinned source and independently reviewed scope inventory check all 398
builtin/control-word and label occurrences in Bank or Risk in two themes.
Earlier preview assets retain their original grammar. The Rust parser remains
at version 0.1.0; current source adds the approved Perfect 10 block. See the
[0.2.0 release notes](docs/releases/0.2.0.md) for that earlier milestone.

The [manual-led core inventory](specifications/manual-core/README.md) now drives
broader coverage: current source highlights 728 BASIC entries from Professional manual
chapters 5.1–5.9, 6.1–6.5, 7.1–7.7, 8.1–8.3, 19 Interface-facing BASIC forms from 9.1/9.3/9.4, 10.1–10.6, 11.1–11.2, 11.4–11.5, 12.1–12.2 and five §13.1 accessory/configuration forms, Appendix B’s Kill Editor and twenty-eight Appendix A memory/conversion/bit/call/register forms, plus eight Appendix F Copper forms and two Appendix C display-mode queries.
The file/directory I/O, music/basic sound, sample, music-module, speech, icon/block, font, error-handling, printer/port, serial, parallel, AREXX, multitasking, library/equate/structure/device/requester, Monitor, accessory/configuration, Kill Editor, dialogue, zone/value, resource, direct-memory, block/address, conversion, bit-operation, machine-code call, register, Copper and display-mode continuations are
in preview 0.3.0; published 0.2.0 retains its 452-entry BASIC inventory.
Fourteen embedded menu commands and 36 [AMAL records](specifications/amal/README.md)
are inventoried separately. Current source adds standalone AMAL highlighting;
BASIC string payloads remain opaque. Preview 0.3.0 includes this
mode; published 0.2.0 does not.
[AMOS 3D](specifications/extensions/amos-3d/README.md) is tracked as an optional
extension with a 59-record manual inventory, three source-level answers and a pinned-binary
answer to the collision-result question. The opt-in `amos-3d` profile highlights
those records in preview 0.2.0. Other manual chapters and edition/extension
qualification remain separate work. See the [remaining-gap review](docs/highlighting-gaps.md)
for the proposed next sweeps and unresolved surfaces.

The separate [Interface inventory](docs/interface-inventory.md) maps 69 embedded-language
forms to their definitions, retaining role collisions and lexical questions.
Current source exposes a separate opt-in Interface mode; BASIC strings remain
opaque. H/I’s historical reference material is reconciled without adding vocabulary.

The [command-index review](docs/command-index-review.md) reconciles all 818 Appendix G
rows against the existing inventories, retaining conflicts and separate Interface
references. It adds no grammar rules or vocabulary.

The [appendix reconciliation](docs/manual-reconciliation.md) records Bell’s explicit
Music Extension provenance and separates memory-bank layouts from BASIC source.
It adds no vocabulary, native codec or installed-extension qualification.

The [I/O boundary review](docs/io-extension-boundary.md) records 28 serial/parallel
forms with pinned source spelling/component evidence; both serial and parallel now have lexical coverage.

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

## Standalone AMAL highlighting

Current source adds `@lang198x/amos/amal`, the `amal` language registration and
`@lang198x/amos/amal.tmLanguage.json`. These are included in preview 0.3.0; published
0.2.0 does not export them. Load the registration with Shiki or
shiki-highlight-api in the same way as the AMOS modes, selecting `lang: 'amal'`:

```js
import amal from '@lang198x/amos/amal';

await highlighter.loadLanguage(amal);
const html = highlighter.codeToHtml('Target: Move 1,0,4; Pause; Jump Target', {
  lang: 'amal', theme: 'dark-plus',
});
```

For Astro, add `amal` to `markdown.shikiConfig.langs` and use `amal` code fences.
The source-built VS Code extension adds an explicit **AMAL** language mode.
Automatic file associations stay unchanged. This mode highlights standalone plain
text, not native animation banks or AMAL strings inside BASIC.

Capitalization carries meaning: `Anim`, `Animate` and `Anything` all reduce to
`A`, while `IF` is not the same significant-code sequence as `If`. Labels also
have one significant capital. The [AMAL scope and limits](specifications/amal/README.md)
describe register/instruction contexts and the neutral fallback for ambiguous
compact input. Colour does not establish syntax, label resolution or execution.

## Standalone Interface (preview 0.3.0)

Current source provides `@lang198x/amos/interface` and the explicit **AMOS
Interface** editor mode (`amos-interface`). Preview 0.3.0 includes
these; published 0.2.0 does not. Use the preview to try the mode:

```js
import { createHighlighter } from 'shiki';
import amosInterface from '@lang198x/amos/interface';

const highlighter = await createHighlighter({
  langs: [amosInterface],
  themes: ['dark-plus'],
});
const html = highlighter.codeToHtml("BAse 24,32; PRint 8,12,'Ready',3; EXit;", {
  lang: 'amos-interface', theme: 'dark-plus',
});
highlighter.dispose();
```

The mode recognises the 68 distinct codes behind 69 manual records, significant
capitals/lowercase padding, quotes, integer/binary/hex literals, P1–P9, operators
and punctuation. SW keeps a neutral builtin scope because it has two roles.
Min/Max and Call remain unresolved spellings; CAll/CA follows its definition.
No automatic association or BASIC-string injection is added. Colour does not
validate postfix expressions, terminators, custom names or native execution.
See the [Interface inventory and limits](docs/interface-inventory.md).

## Verify source analysis

Current source also parses the approved [Perfect 10 slice](docs/coverage.md):
named assignments, literals/names, unary minus, and equality in multiline
If / End If. Else, nesting, arithmetic, arrays and inline If stay unsupported.
This adds host analysis only; profiles and native compatibility are unchanged.

See the [testing guide](docs/testing.md) for fixture checks, generated property
tests and a bounded fuzz run. These checks test the host parser; native trials
remain separate evidence.

## Verify packages

Node 24 or later is required for package checks:

```sh
npm test
npm run check:editor
```

Integration tests require existing installations, not hidden downloads. Set
`AMOS_SHIKI_MODULE` to Shiki's module entry file and `AMOS_HIGHLIGHT_API_MODULE`
to shiki-highlight-api's ESM entry file, then run `npm run test:integrations`.
The integration preloader rejects incomplete Shiki tokenization before it can
count as verification evidence; a timeout remains a failed check. For a single
test file, retain `node --import ./tests/helpers/install-tokenization-guard.mjs --test tests/highlighting.test.mjs`.
Missing integrations fail the check; the suite never silently skips them.
See [verification](docs/verification.md) for versions actually exercised.

## Ownership and licence

Lang198x owns the AMOS frontend and highlighting. Format198x owns native file
codecs; Build198x owns media packaging. Native loadable output is a later
milestone, with direct compilation beyond the initial need.

New implementation and grammar: GPL-2.0-or-later, see LICENSE. Retained teaching
sources under `corpus/opening/`: MIT, see `corpus/LICENSE`. Runtime screenshots
are evidence of original software, not newly licensed Lang198x code.

## Preview publication

The npm preview uses GitHub Actions OIDC trusted publishing, bound to
`lang198x/amos` and `publish-preview.yml`. The successful 0.3.0 publication
verified the retained archive before publishing to next. Registry download bytes,
signature and provenance attestation are verified; latest remains 0.1.0.
See the [publishing procedure](docs/releases/publishing.md) for future previews.
