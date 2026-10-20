# First kit verification

Verified on 20 October 2026 with Rust 1.98.0 and Node 24.22.0. This records
implemented scope and actual observations, not a whole-language conformance claim.

- Fourteen Rust integration tests pass, including CLI/library agreement, exact
  source preservation, malformed input recovery, unsupported forms and unknown
  profiles. Formatting and strict Clippy pass without dependencies.
- Three Node package tests pass. They verify corpus hashes, package exports and
  exact agreement between canonical and packaged editor grammars.
- Five highlighting integration tests pass against Shiki 4.4.3 with both the
  installed shiki-highlight-api 1.3.0 and a local 2.0.0 build. These exercise real
  scopes, comment/string boundaries, dollar names, text preservation and the
  shiki-highlights output adapter. Shiki's current documentation is for 4.5.0;
  this task reused the existing 4.4.3 installation rather than changing another
  project's dependencies. Other versions are not claimed by this check.
- A deliberately disabled Print parser makes the maintained-message assertion
  fail. A disabled command-highlighting pattern makes the scope assertion fail.
  An independently changed editor grammar makes the synchronisation check fail.
  Originals were restored before the passing checks.
- The npm tarball installs in a separate consumer and renders source through
  Shiki. Its TypeScript registration is checked against the installed Shiki types.
- The generated VSIX installs with VS Code 1.139.1 in isolated settings and
  extension directories. The installed grammar matches canonical bytes. The
  first sandboxed attempt failed with `EMFILE: too many open files, watch`;
  the same isolated installation succeeded outside the sandbox. This is an
  installation and grammar-engine check, not a visual editor review.
- Five new native F2 probes have exact source/hash bindings and inspected
  screenshots: two opening-form probes accepted, numeric Print accepted, and
  two extra-argument probes rejected. Prior opening/edit/typo/repair observations
  retain their original limits. See `corpus/probes/` and `corpus/opening/`.

CI runs Rust checks, Node package/corpus checks, editor synchronisation and
package creation. The highlighting integration suite is run separately against
existing installations; CI does not download unapproved test dependencies or
silently skip a missing highlighter. Its supported-version matrix can grow once
those test dependencies are explicitly adopted.

The identical verified tarball is published as `@lang198x/amos@0.1.0` on npm
under the preview `next` tag. Registry integrity matches the GitHub preview;
a fresh registry install was compared with the canonical grammar and rendered
through the existing Shiki installation. No dependency was added to this project.
The versioned tarball retains the original pre-publication documentation.
Current availability and installation instructions are maintained in this repo.

The original 0.1.0 VSIX remains available through GitHub downloads. Microsoft
rejected its `amos` package name as already present in the Marketplace. The
user-approved editor-only 0.1.1 uses `lang198x-amos` and the approved L PNG icon.
Its VSIX identity, version, icon manifest asset, PNG dimensions, exact icon bytes
and canonical grammar were inspected. Three Node package checks and editor
synchronisation pass; the new VSIX installs in isolated directories. The first
sandboxed attempt failed with `EMFILE: too many open files, watch`; the isolated
CLI installation then succeeded outside the sandbox. Native window selection
was rejected by automatic approval review because it could bind a private editor
window, so no native visual inspection is claimed. Microsoft accepted the renamed
upload and currently shows 0.1.1 as Verifying and Private. Public Marketplace release is intentionally
deferred until highlighting coverage is reviewed; a fresh public Marketplace
installation has not been tested. The exact VSIX is retained in the
GitHub v0.1.1 preview release; its downloaded SHA-256 and isolated installed
grammar/icon bytes match the verified package.
CI passes at commit `a21cbf5f6798b0b6b011b69479edfddef32213e9`.
The npm package, Rust crate and highlighting coverage remain at 0.1.0.

Native file codecs/output, execution, complete name/type analysis, LSP and
qualification of Creator/Easy/other releases remain future work.

## Unreleased full-game highlighting

The complete pinned Bank or Risk source has 398 reviewed vocabulary and label
occurrences. The independent inventory binds exact source spans and its SHA-256.
Every occurrence passes in Shiki 4.4.3 with dark-plus and light-plus, with no extra
or missing builtin spans. Exact source text is retained and all four array uses
remain identifiers. Boundary tests cover case, tabs, longer names, type suffixes,
multiword endings, strings, comments and unresolved calls. Scope assertions inspect
each explanation fragment: theme-coalesced punctuation cannot borrow a neighbouring
operator's scope. Disabling Screen Copy makes the full-game test fail at line 414;
the original grammar was restored before passing checks.

Four package/corpus checks and fourteen integration tests pass. Integrations use
the existing shiki-highlight-api 1.3.0 and local 2.0.0 build, including full-game
rendering in both themes. No dependency was added. npm and VSIX builds retain
the exact canonical grammar and valid icon metadata; these are disposable local
build checks, not replacements for versioned preview assets or registry uploads.
The Marketplace preview remains private. Host parsing and original-runtime
qualification are unchanged.

## Unreleased manual-led core highlighting

The Professional manual's §§5.1–5.5 have a 109-entry inventory with page and
extract-line citations, typed/grouped forms and fresh examples. The baseline
passed all lexical checks for 32 entries; all 109 now pass. Twenty-four integration
tests cover both themes, existing game ranges, declaration scopes, identifier and
typed-suffix boundaries, strings/comments, malformed declaration boundaries and
two independent mixed listings. Existing shiki-highlight-api 1.3.0 and local
2.0.0 integrations are exercised with Shiki 4.4.3. Five dependency-free package
and inventory checks pass.

Removing Param's typed suffix recognition makes the manual test fail specifically
on Param#; the original rule is restored before passing checks. The inventory
metadata check also detected a pagination discrepancy: four maths entries appear
on 05.03.08 in the original-manual extract, while the held retypeset edition
prints 05.02.08. Both source hashes and the discrepancy are retained; the chapter/page consistency
check passes without suppressing mismatches.

These are lexical/documentary checks, not new runtime acceptance observations.
Parser scope, original execution and edition qualification are unchanged.

## Unreleased text and keyboard highlighting

The §5.6 and §10.1 inventories add 48 text and 14 keyboard entries, retaining
the earlier five-chapter/109-entry check. All 171 entries have source-line/page
bindings and pass lexical checks. Thirty integration tests pass against Shiki
4.4.3 with both existing shiki-highlight-api 1.3.0 and local 2.0.0 consumers;
five package/inventory checks pass. Tests distinguish commands, dollar-valued
functions and Key$ assignments/reads, guard multiword endings and macro/format
strings, and preserve a fresh mixed listing in both themes. Existing game and
core expectations still pass.

Disabling Key$'s reserved-variable pattern makes the new context test fail on
the exact Key$ range; it was restored before the passing run. The `?` shortcut
has a lexical scope, without a claim about native persistence. No original AMOS
code or keyboard macro was executed, and no editor/system setting was changed.
Published packages and the private Marketplace preview are unchanged.

## Unreleased windows, input and screen highlighting

The five new inventories (§§5.7, 5.8, 6.1–6.3) add 91 entries; nine passed the
previous complete checks. All 262 entries now pass in both themes. Each cited
line/page and both source hashes match the held extracts. The earlier 109/171
inventory checks and all 398 pinned game ranges remain intact.

Forty integration tests pass against Shiki 4.4.3 with existing shiki-highlight-api
1.3.0 and local 2.0.0 consumers. Five package/inventory checks and exact editor
synchronisation pass. Focused checks cover Screen's dual documented role, full
phrases, coordinate reads/assignments, suffix boundaries, Read Text$, literal
filenames and effect strings. Removing the X Mouse reserved-variable rule fails
on `MC_VALUE=X Mouse`; the original rule was restored before passing checks.

The built npm tarball and VSIX contain the exact canonical grammar; VSIX icon
bytes/metadata match and no public gallery flags are present. The extracted npm
registration preserves the fresh mixed listing and new scopes in both themes.
These are disposable build checks at existing version numbers, not publications
or replacement release assets. No original AMOS code was executed. Parser scope,
edition qualification and private Marketplace availability remain unchanged.

## Unreleased memory-bank, drawing and menu highlighting

The §§5.9, 6.4 and 6.5 inventories add 87 BASIC entries (six previously passing),
for 349 total. Fourteen embedded menu commands are recorded separately. All 363
source-line/page bindings and both held-source hashes match. The earlier
109/171/262-entry checks and all 398 game expectations remain intact.

Forty-eight integration tests pass in both existing consumers (shiki-highlight-api
1.3.0 and local 2.0.0 with Shiki 4.4.3), in dark and light themes. Six package and
inventory checks pass. Focused checks cover long bank/menu phrases, bank queries,
Colour's dual role, Menu$ definitions, callback identifiers and all embedded
payloads. Disabling Menu$'s reserved-variable rule fails on the exact Menu$ range;
it was restored before passing checks. A fresh mixed listing preserves its text
and selected scopes through both consumers.

Disposable npm/VSIX builds contain the exact canonical grammar; the VSIX icon
bytes/metadata match and there are no public gallery flags. The extracted npm
registration renders the new listing in both themes. These checks do not publish
packages, change preview assets or establish native bank/file/menu acceptance.
Parser scope, edition qualification and private Marketplace availability remain
unchanged. No dependency was added.

## Unreleased sprite, Bob and update highlighting

The §§7.1–7.3 inventories add 53 entries (three previously passing), for 402 BASIC
chapter entries plus 14 separate embedded menu records. All 416 source-line/page
bindings and both source hashes match. The earlier 109/171/262/349 checks and
all 398 game expectations remain intact.

Fifty-six integration tests pass in each existing consumer (shiki-highlight-api
1.3.0 and local 2.0.0 with Shiki 4.4.3), in both themes. Six package/inventory
checks and editor synchronisation pass. Focused checks cover whole update and
palette phrases, Sprite Base, nested coordinate/reversal expressions, omitted
arguments, masks, typed suffixes and opaque menu/AMAL-like strings. Disabling
Hrev fails on its exact range in a Bob expression; it was restored before the
passing checks. The old Bob Update Office expectation now checks the documented
Bob Update prefix and the ordinary Office identifier separately.

Actual npm/VSIX builds contain the canonical grammar; icon bytes/metadata match
and public gallery flags are absent. The extracted npm registration preserves
the fresh listing and key scopes in both themes. Disposable builds do not replace
release assets or publish packages. No native animation, rendering, AMAL or
image-bank persistence is qualified. Parser scope and Marketplace availability
remain unchanged; no dependency was added.

## Unreleased collision and IFF highlighting

The §§7.4–7.5 inventories add 26 entries (three previously passing), for 428 BASIC
entries and 14 separate embedded menu records. All 442 source-line/page bindings
and both held-source hashes match. Earlier 109/171/262/349/402 checks and all 398
game expectations remain intact.

Sixty-three integration tests pass in each existing consumer (shiki-highlight-api
1.3.0 and local 2.0.0 with Shiki 4.4.3), in both themes. Six package/inventory
checks and editor synchronisation pass. Focused checks distinguish collision
functions from object commands, target-range connectives, nested zone queries,
Zone$, frame functions and IFF mask commands/queries. Literal filenames, AMAL-like
strings, typed suffixes and transcription mistakes retain conservative scopes.
Disabling Frame Play fails at its exact phrase in an expression; it was restored
before passing checks.

Actual npm/VSIX builds contain the canonical grammar and matching icon metadata
and bytes, with no public gallery flags. An extracted npm registration preserves
the new mixed listing and critical scopes in both themes. These disposable builds
do not publish packages or replace release assets. Native collision results,
file/channel behaviour, animation contents, pointers, timing and AMAL remain
unqualified. Parser scope and private Marketplace availability are unchanged;
no dependency was added.

## Unreleased AMAL controls and AMOS 3D scope

Professional §7.6 adds 24 BASIC controls (none previously passing), for 452 BASIC
entries. Separate inventories retain 14 menu records and 36 AMAL records. All
502 line/page bindings, six AMOS 3D evidence bindings and four held-source hashes
match. Earlier 109/171/262/349/402/428 checks and all 398 game expectations remain.

Sixty-nine integration tests pass in each existing consumer (shiki-highlight-api
1.3.0 and local 2.0.0 with Shiki 4.4.3), in both themes. Eight package/inventory
checks and editor sync pass. Checks cover complete BASIC control forms, Amreg
reads/assignments, case/typed boundaries, the Screen Size target context and all
embedded AMAL examples as opaque strings. Significant-capital variants do not
receive embedded validation. Disabling Amreg fails on its exact assignment range;
it was restored before passing checks. AMOS 3D remains outside builtin coverage.

Actual npm/VSIX grammar and icon bytes/metadata match, with public flags absent.
An extracted npm registration preserves the fresh listing and critical scopes in
both themes. Builds are disposable, with no registry/preview asset replacement.
No AMAL compiler, grammar, runtime, extension installation or native compatibility
qualification is added. The AMOS 3D spelling conflict and profile requirements
remain recorded follow-on work. No dependency was added; parser scope and private
Marketplace availability are unchanged.

## AMOS 3D inventory verification

This documentary-only change records 59 extension entries in six family files,
46 quick-card cells, four open evidence questions and two string-family records.
Both held-source hashes and all 213 stored citation occurrences match their exact
text lines and printed pages. Independently reconstructing the quick-card cells
from the held extract reproduces all 46 entries, excluding only the title.

Thirteen dependency-free package/inventory checks and editor synchronisation pass.
The new checks require unique entries, all axis variants, 11 cached-result forms,
complete quick-card coverage and explicit unresolved statuses. Removing Td World Z
makes the axis-completeness test fail; it was restored before the passing suite.

The canonical/editor grammars, public exports and versions are unchanged; no new
highlighting integration result is claimed for this inventory-only change. No
package is published, no media is installed and no native program is executed.
The 452 BASIC entries, 14 menu records and 36 AMAL records remain separate from
this optional extension. Marketplace availability remains private.

## AMOS 3D original-source audit

The pinned official +3d.s wrapper and +Verif.s verifier have verified SHA-256/Git
blob bindings. All 14 exact excerpt ranges match. Token-name inspection confirms
ANGLE REL and no ANGEL REL in that table. Quit's instruction metadata/dispatch
and Advanced's function signature/verifier path support three source-only answers.
Collision wrappers pass the library return through unchanged; the result meaning
remains open. No binary, runtime, extension installation or release is qualified.

Sixteen package/inventory checks and editor sync pass. Marking the collision
finding source-resolved deliberately fails the preserved-boundary check; it was
restored before the passing suite. Documentary conflicts remain linked to their
revision-scoped findings. Grammar bytes, registrations, exports and versions are
unchanged. No new highlighting integration result is claimed for this source audit.
No package is published and Marketplace remains private.


## AMOS 3D library return-value audit

Static analysis of the pinned 47,696-byte c3d.lib follows cold-start's returned
function table, entry 23 and its Hunk relocation to the collision routine. The
single-object mode stops at the first successful predicate and returns its
candidate index, or -1 if none is found. Exact bytes, offsets, branch/return paths,
file hashes and tool revision are retained in `collision-binary.json`; the
[trace](../specifications/extensions/amos-3d/collision-binary.md) explains the result.
The library was read, not executed. Geometry, errors, installed releases and
built-wrapper equivalence are outside this conclusion.

Eighteen package/inventory checks and editor synchronisation pass. The separate
standard-library Python checker validates the full original file, all 29 Hunk
records, retained excerpts and dispatch relocations. A wrong target hunk fails
the package evidence check; a wrong excerpt file offset fails the full-library
check. Both negative controls were restored before the passing checks. Ruff
checks and formatting pass for that checker. No grammar, API, version, dependency,
package publication or Marketplace availability changes follow from this audit.
