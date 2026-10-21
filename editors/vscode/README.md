# AMOS highlighting preview 0.3.0

Professional-based AMOS syntax highlighting from Lang198x, with optional AMOS
3D, standalone AMAL and standalone Interface modes. This is a preview: colour
identifies lexical forms, not valid arguments, native execution or compatibility
with every AMOS edition. No compiler or language server is included.

Install the candidate VSIX with **Extensions: Install from VSIX**. It carries
both a Preview label and prerelease-channel metadata. Preparation does not change
Marketplace availability. The extension identifier remains
`lang198x.lang198x-amos`.

## Choose a language mode

- **AMOS** selects the Professional-based BASIC vocabulary. Plain UTF-8
  `.amos.txt` listings select this mode automatically.
- **AMOS + AMOS 3D** adds the optional extension vocabulary. Select it explicitly
  or associate a workspace filename pattern with `amos-3d`.
- **AMAL** highlights standalone AMAL text using significant capitals and
  register/instruction contexts. Select `amal` explicitly.
- **AMOS Interface** highlights standalone Interface text with significant
  capital pairs, lowercase padding, quotes and punctuation. Select
  `amos-interface` explicitly. SW retains a neutral builtin scope.

Native tokenised `.AMOS` files require a separate decoder. BASIC string payloads
remain opaque; selecting a mode does not install a runtime or an extension.

## Scope and limits

The inventories retain 728 BASIC entries across 44 partial/full manual sections,
59 AMOS 3D records, 36 AMAL records and 69 Interface records/68 codes. These are
not unique-instruction totals or a whole-language coverage percentage. Selected
decimal/scientific literals, line-head inline/numeric labels, both BASIC quote
forms and corrected numbered/inline Rem comments are included.

Creator, Easy, other Professional revisions and extension versions remain
unqualified. There is no postfix/argument/terminator validation, custom-name
resolution, resource loading or execution. The Rust parser remains separate and
limited to its opening-program subset.

All four modes have bounded native VS Code dark/light review and consumer tests.
See the repository's [release notes](https://github.com/lang198x/amos/blob/main/docs/releases/0.3.0.md),
[coverage](https://github.com/lang198x/amos/blob/main/docs/coverage.md) and
[readiness review](https://github.com/lang198x/amos/blob/main/docs/highlighting-readiness.md)
for exact evidence and remaining limits. Published 0.2.0 retains its older assets;
this candidate is prepared for publication.

## Build and licence

Build with `python3 scripts/package-editor.py --pre-release` from the repository
root. The declarative extension contains no executable extension code. Its
canonical grammars are verified byte for byte against the npm assets; missing
prerelease-channel selection fails packaging.

Newly authored extension files use GPL-2.0-or-later. The approved L icon comes
from https://github.com/lang198x/.github/tree/main/branding; its lettering uses
Oxanium under the SIL Open Font License recorded there.
