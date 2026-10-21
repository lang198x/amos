# Highlighting preview readiness

The readiness pass supports a public preview under the bounded scope below.
It does not authorise publication.

The recommended public scope is **Professional-based lexical highlighting for
plain-text listings**, with opt-in AMOS 3D, standalone AMAL and standalone AMOS
Interface modes. Colour identifies documented lexical forms; it does not certify
that a program compiles, runs, uses the correct arguments or works on a particular
AMOS installation. Creator, Easy and other Professional/extension revisions
remain unqualified. The Rust parser remains the separate opening-program subset.

## Lexical review

The pinned Professional manual supplies separators/comments at 3423–3480,
labels/numbered lines at 4419–4436 and procedure/label spacing at 5160–5164.
The original publisher's [tokenizer](https://github.com/AOZ-Studio/AMOS-Professional-Official/blob/533b4b1f5acd604814513f78e02c7b4796cb0531/AMOSPro%20Sources/%2BToken.s)
and [value reader](https://github.com/AOZ-Studio/AMOS-Professional-Official/blob/533b4b1f5acd604814513f78e02c7b4796cb0531/%2BILib.s#L7047)
at revision `533b4b1f5acd604814513f78e02c7b4796cb0531` independently establish single-quoted
string handling, physical-line label recognition and decimal/exponent scanning.
[Retained excerpts](../specifications/readiness/lexical-source.json) bind both
file hashes and exact line ranges, with the upstream MIT notice. These are
source observations for that revision, not new native-runtime trials.

The review reproduced split scientific/leading-dot/trailing-dot numbers, missing
labels before inline statements, a false label scope with a space before its
colon, and single-quoted text leaking into Rem/keyword scopes. Numbered Rem lines
also failed to remain comments. Current lexical rules address those cases and
preserve standalone comments, command/function precedence and opaque strings.
For example, `RC_BEGIN: Print "x"` has a label; `RC_BEGIN :` retains an unresolved
name. `Start` is an existing function and retains that scope. A line identifier
is distinct from a numeric literal used by Print.

Selected decimal/scientific forms include `.5`, `1.`, `1e3`, `1E-3` and `1 E + 3`.
Signs outside the exponent remain operators. Named labels begin physical lines
and require an immediate colon; digits at the head can identify numbered lines.
No target resolution, range checking, full tokenizer equivalence or validation
of arbitrary spacing follows. Extended identifiers, spaces within digit runs,
other encodings, shorthand/editor rewrites and unusual detokenizer spellings
remain outside the preview claim. This does not promise every AMOS literal form.

## Independent inputs

The [independent corpus](../corpus/independent/README.md) retains exact public
ASCII bytes for a 39-line file-conversion accessory and a 72-line original
compiler Interface panel, plus a 77-line numeric lister regression fixture.
Immutable source revisions, hashes, 116 reviewed source ranges and both MIT
notices are retained. These inputs predate this grammar work; they were not
written to make its tests pass. The numeric fixture is a stress input, not a
third working application. Two small programs are useful independent evidence,
not a representative survey of the AMOS software library. No source is executed.

## Visual editor review

An isolated VS Code 1.142.0 (arm64) installation loaded the built VSIX in its own settings and
extensions directories. `.amos.txt` automatically selected AMOS. Explicit
workspace associations selected AMOS + AMOS 3D, AMAL and AMOS Interface; the
status bar confirmed each mode. All four were inspected in built-in Dark Modern
and Light Modern themes. Strings/comments stayed visually separate from code,
scientific values remained numeric, and both inline and numeric label definitions
were readable. Interface's neutral SW/unknown names and AMAL's label/register
colours remained consistent with their lexical contracts. The reviewed views
showed no colour leakage into the next line or layout fault.

This is a bounded visual review on one macOS installation, not a contrast audit,
screen-reader trial or cross-platform survey. Long AMAL lines use ordinary
horizontal scrolling. No personal editor configuration or existing session was
changed. Editor/runtime status messages are not language-validation results.

## Verification result

All 35 package checks and 264 integration checks per existing consumer pass.
The six new lexical regressions failed against the earlier grammar; altered
original-source input also fails replay. Both original source files/four excerpts,
all corpus hashes/ranges, exact editor copies and extracted four-mode renders
are checked. The final inline-label/Rem interaction was reproduced, fixed and
rechecked in the installed editor in both themes. See
[verification](verification.md#bounded-highlighting-readiness-review) for the
observed failures, corrections and exact limits. Final archives retain 23 npm
files and eleven VSIX source assets matching the repository.

## Release boundary

The preview can be useful without a full parser, compiler, native file decoder,
BASIC-string injection or complete extension catalogue. Those remain separately
scoped work. BASIC vocabulary remains 728 documentary entries across 44 sections;
AMAL, AMOS 3D and Interface keep separate inventories and limitations.

Before publishing, prepare a new versioned archive and release notes that name
this scope, then approve the actual release. Published 0.2.0 must retain its
existing assets. The current review does not change Marketplace availability,
upload an archive or publish to npm. The
[private-preview decision](../decisions/marketplace-release-readiness.md) remains
binding until a public-release decision is explicitly adopted.
