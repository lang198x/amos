# Coverage and result meanings

Use the published preview to colour plain-text AMOS listings. Use the Rust
parser to inspect the small set of forms below. Colour, parsed structure and
native execution answer different questions.

The npm preview is 0.3.0. The public editor preview is 0.3.1 and uses the same
four grammars. Rust remains 0.1.0; the table below describes current source,
including the [Perfect 10 block](../decisions/perfect-ten-parser-slice.md).
See [release evidence](releases/0.3.0.md) for the published assets.

## Forms the parser understands

| Form | Current limit |
| --- | --- |
| `Cls` | No argument, or one unsigned decimal literal. |
| `Print` | Exactly one double-quoted string literal. |
| `Wait Key` and `End` | No arguments. |
| Named assignment | An integer, string or name; one unary minus is allowed. |
| Multiline `If` / `End If` | One equality test and a body of supported statements. |

Else, nested If, arithmetic, arrays and inline If remain unsupported. The
parser keeps their source. It does not run code, resolve names or check types.
See the [source tests](testing.md) and [native evidence](verification.md).

Commands ignore case. The parser accepts spaces, tabs, blank lines and colon
separators. Strings use double quotes with no backslash escapes. A line-start
apostrophe starts a comment. Rem starts a comment at a statement boundary.
Empty colon statements remain unsupported.

## What a result means

`SupportedStructure` means the parser knows each form in the listing. It does
not check value ranges, types, palette limits or whether execution will finish.
Large integers keep their text without being forced into a host integer type.
A success does not show that another AMOS edition accepts the code.

`Unsupported` means a form falls outside this parser. For example, native AMOS
accepts `Print 2`, but this parser does not yet support it. An unknown call such
as `Prit` may be a procedure or extension name. It stays unresolved. We do not
label it a typo without more evidence. Any unsupported form prevents success.

`Invalid` means text breaks a rule that this parser checks. Examples include an
open string, a missing assignment value, or an apostrophe comment in the wrong
place. An unsupported form is not, on that basis alone, invalid AMOS.

| CLI exit | Meaning |
| --- | --- |
| 0 | Supported structure |
| 1 | Invalid text or form |
| 2 | Unsupported form |
| 3 | Unknown profile |
| 64 | Usage or input error |

A profile must be explicit. The only enabled CLI profile is
`amos-pro-2.00-observed`. Unknown releases do not default to it. Separate native
trials cover Cls and the Perfect 10 block in Creator 1.1, Easy 1.01 and Pro 2.00. They do not enable CLI profiles or
qualify other forms, revisions or extensions. See the
[edition evidence](../specifications/editions/README.md).

## Text and positions

The parser keeps all UTF-8 source bytes, tokens, spaces and comments. Typed
nodes refer to byte ranges whose start is included and end is excluded.
Recovery uses line and colon boundaries; unsupported blocks keep their full
range. This lets tools show source without silently dropping unknown code.

LF, CRLF and CR end lines. Errors use one-based line and column numbers.
Columns count Unicode scalar values, with each tab counting as one. These are
not screen columns or LSP UTF-16 positions. Unicode text is kept as supplied;
conversion from Amiga text encodings is future codec work. Control characters
other than tab and line endings are rejected, even in strings and comments.

## Four highlighting modes

| Mode | Select it through npm | Scope |
| --- | --- | --- |
| AMOS | Default import | Professional-based BASIC vocabulary |
| AMOS + AMOS 3D | `@lang198x/amos/amos-3d` | BASIC plus the optional 3D vocabulary |
| AMAL | `@lang198x/amos/amal` | Standalone AMAL text |
| AMOS Interface | `@lang198x/amos/interface` | Standalone Interface text |

Select each extra mode on purpose. BASIC strings stay opaque, including AMAL
and Interface code stored in them. Only plain-text `.amos.txt` files select
AMOS in the editor by default. Native `.AMOS` files need a decoder first.

TextMate rules colour words and punctuation. They can colour invalid or
unsupported code. They do not provide parser errors, resolve calls or qualify
an edition. See the [vocabulary reference](highlighting-coverage.md) for exact
forms, counts, source conflicts and evidence. Native import, LSP services and
compilation are not implemented.

## Detailed vocabulary

These links retain the old section addresses and lead to the full reference.

<a id="full-game-highlighting-milestone"></a>

- [Full-game highlighting milestone](highlighting-coverage.md#full-game-highlighting-milestone)

<a id="manual-led-core-milestone"></a>

- [Manual-led core milestone](highlighting-coverage.md#manual-led-core-milestone)

<a id="text-and-keyboard-milestone"></a>

- [Text and keyboard milestone](highlighting-coverage.md#text-and-keyboard-milestone)

<a id="windows-input-and-screens-milestone"></a>

- [Windows, input and screens milestone](highlighting-coverage.md#windows-input-and-screens-milestone)

<a id="memory-banks-drawing-and-menus-milestone"></a>

- [Memory banks, drawing and menus milestone](highlighting-coverage.md#memory-banks-drawing-and-menus-milestone)

<a id="sprite-bob-and-object-update-milestone"></a>

- [Sprite, Bob and object-update milestone](highlighting-coverage.md#sprite-bob-and-object-update-milestone)

<a id="collision-detection-and-iff-animation-milestone"></a>

- [Collision detection and IFF animation milestone](highlighting-coverage.md#collision-detection-and-iff-animation-milestone)

<a id="amal-controls-and-extension-planning"></a>

- [AMAL controls and extension planning](highlighting-coverage.md#amal-controls-and-extension-planning)

<a id="amos-3d-documentary-inventory"></a>

- [AMOS 3D documentary inventory](highlighting-coverage.md#amos-3d-documentary-inventory)

<a id="amos-3d-original-source-evidence"></a>

- [AMOS 3D original-source evidence](highlighting-coverage.md#amos-3d-original-source-evidence)

<a id="optional-amos-3d-lexical-profile"></a>

- [Optional AMOS 3D lexical profile](highlighting-coverage.md#optional-amos-3d-lexical-profile)

<a id="unreleased-file-and-directory-io"></a>

- [file and directory I/O](highlighting-coverage.md#unreleased-file-and-directory-io)

<a id="unreleased-standalone-amal"></a>

- [standalone AMAL](highlighting-coverage.md#unreleased-standalone-amal)

<a id="music-and-basic-sound-milestone"></a>

- [Music and basic sound milestone](highlighting-coverage.md#music-and-basic-sound-milestone)

<a id="sample-playback-and-management-milestone"></a>

- [Sample playback and management milestone](highlighting-coverage.md#sample-playback-and-management-milestone)

<a id="tracker-and-med-music-milestone"></a>

- [Tracker and MED music milestone](highlighting-coverage.md#tracker-and-med-music-milestone)

<a id="speech-milestone"></a>

- [Speech milestone](highlighting-coverage.md#speech-milestone)

<a id="icons-and-blocks"></a>

- [Icons and blocks](highlighting-coverage.md#icons-and-blocks)

<a id="fonts"></a>

- [Fonts](highlighting-coverage.md#fonts)

<a id="error-handling"></a>

- [Error handling](highlighting-coverage.md#error-handling)

<a id="printer-and-general-ports"></a>

- [Printer and general ports](highlighting-coverage.md#printer-and-general-ports)

<a id="serial"></a>

- [Serial](highlighting-coverage.md#serial)

<a id="parallel"></a>

- [Parallel](highlighting-coverage.md#parallel)

<a id="arexx-integration"></a>

- [AREXX integration](highlighting-coverage.md#arexx-integration)

<a id="multitasking-and-inter-program-communication"></a>

- [Multitasking and inter-program communication](highlighting-coverage.md#multitasking-and-inter-program-communication)

<a id="library-calls-equates-and-structure-access"></a>

- [Library calls, equates and structure access](highlighting-coverage.md#library-calls-equates-and-structure-access)

<a id="device-io"></a>

- [Device I/O](highlighting-coverage.md#device-io)

<a id="requester-extension-controls"></a>

- [Requester Extension controls](highlighting-coverage.md#requester-extension-controls)

<a id="floating-point-reconciliation-and-monitor"></a>

- [Floating-point reconciliation and Monitor](highlighting-coverage.md#floating-point-reconciliation-and-monitor)

<a id="accessory-and-configuration-statements"></a>

- [Accessory and configuration statements](highlighting-coverage.md#accessory-and-configuration-statements)

<a id="appendix-b-runtime-command"></a>

- [Appendix B runtime command](highlighting-coverage.md#appendix-b-runtime-command)

<a id="interface-facing-basic-dialogue-entry-points"></a>

- [Interface-facing BASIC dialogue entry points](highlighting-coverage.md#interface-facing-basic-dialogue-entry-points)

<a id="interface-facing-zone-values-and-channel-controls"></a>

- [Interface-facing zone values and channel controls](highlighting-coverage.md#interface-facing-zone-values-and-channel-controls)

<a id="interface-facing-basic-resources"></a>

- [Interface-facing BASIC resources](highlighting-coverage.md#interface-facing-basic-resources)

<a id="appendix-a-direct-memory-reads-and-writes"></a>

- [Appendix A direct memory reads and writes](highlighting-coverage.md#appendix-a-direct-memory-reads-and-writes)

<a id="appendix-a-blocks-and-variable-addresses"></a>

- [Appendix A blocks and variable addresses](highlighting-coverage.md#appendix-a-blocks-and-variable-addresses)

<a id="appendix-a-conversions-and-bit-operations"></a>

- [Appendix A conversions and bit operations](highlighting-coverage.md#appendix-a-conversions-and-bit-operations)

<a id="appendix-a-machine-code-calls-and-registers"></a>

- [Appendix A machine-code calls and registers](highlighting-coverage.md#appendix-a-machine-code-calls-and-registers)

<a id="appendix-f-copper"></a>

- [Appendix F Copper](highlighting-coverage.md#appendix-f-copper)

<a id="appendix-c-display-mode-queries"></a>

- [Appendix C display-mode queries](highlighting-coverage.md#appendix-c-display-mode-queries)

<a id="appendices-de-component-and-bank-boundaries"></a>

- [Appendices D/E component and bank boundaries](highlighting-coverage.md#appendices-de-component-and-bank-boundaries)

<a id="complete-command-index-cross-check"></a>

- [Complete command-index cross-check](highlighting-coverage.md#complete-command-index-cross-check)

<a id="reference-appendices-and-standalone-interface"></a>

- [Reference appendices and standalone Interface](highlighting-coverage.md#reference-appendices-and-standalone-interface)

<a id="readiness-lexical-review"></a>

- [Readiness lexical review](highlighting-coverage.md#readiness-lexical-review)
