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


## Optional AMOS 3D highlighting

The explicit `amos-3d` profile adds the 59 inventoried records to BASIC, using
shared canonical rules and a self-contained combined grammar. The base grammar
bytes are unchanged. Twenty package/inventory checks and editor synchronisation
pass. Seventy-four highlighting integrations pass against each existing
shiki-highlight-api installation (1.3.0 and 2.0.0), both with Shiki 4.4.3, using
dark-plus and light-plus. The new checks cover every inventory record, longer
forms, corrected source spelling, cached/overloaded examples, identifiers,
comments and opaque strings. The complete Bank or Risk listing retains
identical BASIC token scopes and colours in the combined mode.

Removing World Z from the canonical 3D fragment and recomposing makes the
59-record integration check fail. The fragment and generated grammars were
restored before the passing checks. The inventory retains conflicting historical
examples; highlighting checks use the evidenced ANGLE spelling and Advanced
call example. No alias or parser acceptance is inferred from colour.

The npm archive was extracted into an isolated consumer without dependencies;
its default and 3D imports render through existing Shiki, and their declarations
pass strict TypeScript NodeNext checking. The VSIX contains both exact canonical
grammars and declarative language registrations. No extension host code or
automatic 3D file association is added. These are package-content and grammar
engine checks, not an installed VS Code visual review or native AMOS execution.
The first npm pack attempt reported `EPERM` in the default npm cache; packaging
succeeded using an isolated temporary cache. Ruff checks/formatting pass for the
modified packager. No packages were published, release versions changed or
Marketplace availability altered. Temporary archives, consumer and cache are
removed after verification.


## Refreshed highlighting preview 0.2.0

The npm grammar and downloadable VSIX use 0.2.0. The Rust kit remains 0.1.0;
parser behaviour is unchanged. Twenty package/inventory checks, editor sync and
74 integrations against each existing consumer installation pass, in both themes.
Archive inspection verifies versions, both exact grammars, language registrations,
icon bytes, declarative execution metadata and absence of public gallery flags.
Extracted npm imports render both profiles with expected scopes in both themes;
the declarations pass strict TypeScript NodeNext checking.

The VSIX installs with VS Code 1.142.0 using task-specific settings/extensions.
Its installed manifest, both grammar files and icon match source. The first
sandboxed attempt failed with `EMFILE: too many open files, watch`; the same
isolated CLI installation passed outside the sandbox. This verifies package
installation and contents, not native visual review or original AMOS execution.
The npm release uses `next`; `latest` stays at 0.1.0. Marketplace privacy and the
existing Marketplace submission are unchanged. Publication bindings and download
checks are recorded in [the release evidence](releases/0.2.0-evidence.json).


The GitHub prerelease tag points to the verified source commit. Its npm archive,
VSIX and SHA256SUMS were downloaded again and match the tested bytes. The npm
registry's SHA-512 integrity and independently downloaded tarball match the same
archive. A fresh registry-delivered consumer renders both profiles in both themes
and passes strict declaration checking. Authenticated npm tag inspection confirms
`next: 0.2.0` and `latest: 0.1.0`; an earlier cached registry read still showed the
old next tag, so publication success alone was not treated as tag verification.

npm required a manual publishing authentication. The host browser launcher
failed; an interactive publish with `--browser=false` kept the security flow
waiting without invoking that launcher. No authentication links or tokens are
retained in the repository. Marketplace received no upload or availability change.


## Unreleased file and directory I/O highlighting

The §10.2 checklist adds 38 entries, including grouped listing variants, As and
? #, for 490 BASIC chapter entries. Every entry's exact held-source line and
following printed page footer was checked against the pinned extract. Before
changes, only Input$ had complete expected scopes among these 38 examples; the
chapter integration check failed at Dir. All 38 now pass the shared case, tab,
identifier-boundary and standalone-form checks. Punctuated directory variants
use underscore-joined legal identifier lookalikes in the suffix guards.

Twenty package/inventory checks, editor sync and 80 highlighting integrations
pass in each existing shiki-highlight-api consumer (1.3.0 and 2.0.0), both with
Shiki 4.4.3 and dark-plus/light-plus themes. Focused cases check statement-local
/W, quoted device paths/colons, normal division after colons/newlines, channel
markers, random-access connectives, read/write file variables, longer Get/Put
forms and disputed spellings. Existing full-game and optional 3D regressions
pass. Removing Eof deliberately fails the file-channel function check; the rule
and composed copies were restored before the passing checks.

Actual disposable npm/VSIX builds contain both exact canonical grammars and the
matching editor icon/registrations, with no public gallery flags. An extracted
npm consumer preserves the new mixed listing and renders both profiles/themes
with expected function scopes. No package is published or versioned asset
replaced. Released 0.2.0 retains its 452-entry BASIC inventory. No file/device
operations, include expansion, native execution, parser validation or new editor
installation is claimed for this continuation. Marketplace stays private.


## Unreleased standalone AMAL highlighting

The canonical standalone AMAL grammar and explicit registration cover all 36
inventory records: 16 command/structure records, 15 functions and five register
families expanding to 39 members. Eight exact lexical excerpt ranges and their
printed-page bindings match the hash-pinned Professional extract. The later
Autotest section explicitly supplies the extended If/eXit signature.

Twenty-two package/inventory checks and editor sync pass. Eighty-eight
highlighting integrations pass in each existing consumer installation, using
Shiki 4.4.3 with shiki-highlight-api 1.3.0 and 2.0.0, in dark-plus/light-plus.
The focused suite checks every inventory spelling/code, every register member
in normal and Autotest expressions, significant-capital variants, label targets,
A/X roles, grouping, resumed context after Autotest and neutral ambiguous compact
transitions. Basic AMOS/AMOS 3D grammar and registration bytes are unchanged,
and their string payloads remain opaque. Removing VU from the expression rules
makes the inventory check fail; canonical/editor files were restored before the
passing checks.

Actual disposable npm/VSIX builds contain all three exact grammars, the separate
AMAL parentheses configuration and expected icon/registration bytes, without
public gallery flags or executable extension code. Extracted npm imports render
the independent AMAL listing in both themes and preserve both BASIC modes;
all three declarations pass strict TypeScript NodeNext checking. Ruff checks
and formatting pass for the modified packager. These are grammar-engine and
package-content checks, not an installed editor visual review or native AMAL
execution. No versions, published 0.2.0 assets or Marketplace state change.


## Unreleased music and basic sound highlighting

Twenty-one §8.1 entries bring the BASIC inventory to 511 across 23 chapters.
Five forms passed before the change; all 21 pass now. Exact entry lines and
printed-page footers match the pinned extract, including the five §8.3 playback
definition crosschecks. Source discrepancies remain explicit inventory notes.

Twenty-two package/inventory tests and editor sync pass. Ninety-four highlighting
integrations pass in each existing consumer installation (Shiki 4.4.3 with
shiki-highlight-api 1.3.0 and 2.0.0), using dark-plus/light-plus. Focused checks
cover every music form in both BASIC profiles, complete phrases, case/tabs,
identifier suffixes, standalone builtin/label boundaries, Vumeter expressions,
strings/comments and line recovery. The independent mixed listing preserves
exact source and emits styled HTML/CSS. Removing Vumeter's function rule makes
the focused tests fail; restored canonical/profile/editor files pass again.

Disposable npm and VSIX archives contain exact canonical grammars, expected
icon/configuration/manifest bytes and no public gallery flag or executable host.
Extracted npm registrations render all three modes in both themes. No installed
editor review, audible result, native AMOS execution or argument/range validation
is claimed. Package versions, published preview 0.2.0 and Marketplace state are
unchanged.


## Unreleased sample playback and management highlighting

Ten §8.2 forms bring BASIC to 521 entries across 24 chapters. None passed the
complete phrase checks before the change. All ten heading lines and printed-page
bindings match the pinned Professional extract; source discrepancies stay explicit.
Twenty-two package/inventory checks and editor synchronisation pass.

One hundred highlighting integrations pass in each existing consumer (Shiki 4.4.3
with shiki-highlight-api 1.3.0 and 2.0.0), using dark-plus/light-plus. The focused
checks cover every form in both BASIC profiles, playback variants, complete
phrases and function/command boundaries, typed/suffixed identifiers, old Sample
and Swap commands, nested memory expressions, strings/comments and line recovery.
The mixed listing preserves exact text and emits styled HTML/CSS. Removing Sam
Swapped's function rule makes the focused suite fail in both profiles; restoring
and synchronising the canonical grammar makes it pass again.

Disposable npm/VSIX builds contain exact source grammars, icon, configuration and
manifest files, without public gallery flags or executable extension code.
Extracted npm registrations render all three modes in both themes; the sample
listing retains Sam Swapped's function scope. No installed editor review, native
audio, streaming or I/O result is claimed. Versions, published preview 0.2.0,
parser and private Marketplace availability are unchanged.


## Unreleased tracker and MED highlighting

Fifteen §8.3 chapter entries bring BASIC to 536 across 25 chapters, retaining
five AMOS music forms already inventoried in §8.1. Five passed before the change;
all 15 pass now. Each heading/page binding matches the pinned Professional
extract. Track Load's bank example discrepancy and the MMDO wording are retained
without deriving native defaults or format compatibility.

Twenty-two package/inventory checks and editor sync pass. One hundred and six
highlighting integrations pass in each existing consumer (Shiki 4.4.3 with
shiki-highlight-api 1.3.0 and 2.0.0), using dark-plus/light-plus. Focused checks
cover every form in both BASIC profiles, complete phrases, case/tabs, omitted
playback arguments, ordinary identifiers and payload protection, plus existing
music/sample commands. The mixed listing preserves exact source and emits styled
HTML/CSS. Removing Med Midi On causes the focused suite to fail in both profiles;
restoring and synchronising the grammar makes it pass again.

Disposable npm/VSIX archives contain exact source grammars, icon, configuration
and manifest files, without public gallery flags or executable extension code.
Extracted npm registrations render all three modes in both themes and retain Med
Midi On's command scope. These checks do not establish installed-editor appearance,
native module playback, library loading or MIDI behavior. Versions, parser,
published preview 0.2.0 and private Marketplace availability are unchanged.


## Unreleased speech highlighting

Seven §11.2 forms bring BASIC to 543 chapter entries across 26 chapters. None
passed before the change. All seven exact heading/page bindings match the pinned
Professional extract. Mouth Read retains its documented function role; ordinary
Read stays a command. Narrator availability and multitasking context remain
separate from lexical coverage.

Twenty-two package/inventory checks and editor sync pass. One hundred and twelve
highlighting integrations pass in each existing consumer (Shiki 4.4.3 with
shiki-highlight-api 1.3.0 and 2.0.0), using dark-plus/light-plus. Focused checks
cover all seven forms in both BASIC profiles, case/tabs, typed/suffixed lookalikes,
standalone Say versus labels, optional Say modes, omitted Set Talk parameters,
mouth expressions, quoted punctuation/apostrophes, comments and line recovery.
The mixed listing preserves exact source and emits styled HTML/CSS. Removing
Mouth Read's function alternative makes the focused suite fail in both profiles;
restoring and synchronising the grammar makes it pass again.

Disposable npm/VSIX archives contain exact source grammars, icon, configuration
and manifest files, with no public gallery flags or executable host. Extracted
npm registrations render all three modes in both themes and retain Mouth Read's
function scope. No installed-editor visual review, spoken audio, narrator setup,
mode timing or mouth animation is claimed. Versions, parser, published preview
0.2.0 and private Marketplace availability are unchanged.


## Icons/blocks continuation

All 15 §7.7 heading/page citations match the pinned extract. None passed complete
scopes before the change. All 22 package checks and 118 integrations per existing
consumer pass, in both BASIC profiles/themes. Checks cover complete phrases,
typed boundaries, Hrev/Vrev command/function roles, Get/Put regressions and opaque
payloads. Removing the new command rule fails the focused suite; restoration
passes. npm/VSIX source files match exactly, with no public flag or executable
host; extracted modes render in both themes and preserve the fresh listing.
No native image/mask/alignment result, parser or release change is claimed.


## Font continuation

All 13 §11.1 entry/page citations match the pinned extract; Assign already passed.
All 22 package checks and 125 integrations per existing consumer pass. Text
Base/Length and existing Text Styles retain function scopes beside bare Text;
typed Font$ boundaries, coordinate conversions and opaque payloads are checked.
The previous Text Stylesheet expectation now checks the documented Text command
and ordinary Stylesheet identifier. Removing the font command rule fails the
focused suite; restoration passes. npm/VSIX source bytes match, with no public
flag or executable host; extracted modes render both themes. No native font
availability, metric or rendering result, parser or release change is claimed.


## Error-handling continuation

All 11 §12.2 heading/signature and page citations match the pinned extract. None
passed complete scopes before the change. All 22 package checks and 131
integrations per existing consumer pass, in both profiles/themes. Checks cover
complete On Error/Resume phrases, Trap followed directly by another command,
Err$ boundaries, nested error queries, unresolved handler/label names and opaque
payloads. Removing the new command rule fails the focused suite; restoration
passes. npm/VSIX source bytes match with no public flag or executable host;
extracted modes render both themes and preserve the fresh listing. Native handler
behavior, code ranges and message availability remain unqualified. All three
approved sweeps are complete; parser, versions and Marketplace are unchanged.


## Printer and general port continuation

Twelve §10.3 heading/page citations match the pinned extract; none passed complete
scopes before the change. All 22 package/inventory tests and 137 integrations per
existing consumer pass in both profiles/themes. Checks cover every form, typed
boundaries, Printer Error versus Error, dump variants, Trap composition, device
strings, opaque escape payloads and existing file channels. Removing the printer
command rule fails the focused suite; restoration and editor sync pass. The fresh
mixed listing preserves exact source and emits styled HTML/CSS. No printer/port
is accessed and no native output or driver result is claimed.

Disposable npm/VSIX contents match source, including grammars/icon/configuration,
with no public gallery flags or executable host. Extracted registrations render
all modes in both themes and retain Printer Error's function scope. No installed
editor review or native device test is claimed. Versions, parser, published
preview 0.2.0 and Marketplace state are unchanged.


## Source-resolved serial continuation

The official I/O source at revision 533b4b1f5acd604814513f78e02c7b4796cb0531 was
fetched as a Git blob and verified by Git SHA-1 and SHA-256. Four hash-bound
excerpts retain the complete token table, component header, buffer dispatch and
Serial Base routine, with the upstream MIT licence. Source resolves Serial Buf
and serial/printer/parallel grouping; it exposes a Serial Base argument conflict.
No release compatibility, installed binary or native behavior is qualified.

All 18 §10.4 heading/page citations and 25 package/inventory checks pass. None
passed complete scopes before this change. Both existing consumers pass 143
highlighting integrations in both modes/themes. Checks retain Serial Buf versus
Buffer, Input$ boundaries, command/function roles, source/manual Base contexts,
opaque payloads and existing printer/port forms. Removing the serial command rule
fails; restoration passes. npm/VSIX bytes match source and have no public flag or
executable host. Extracted modes render both themes and preserve the fresh listing.
Versions, parser, published preview 0.2.0 and Marketplace are unchanged.


## Source-backed parallel continuation

Ten §10.5 entries bring BASIC to 622 across 32 chapters. All 28 serial/parallel
heading/page bindings, retained source excerpts and licence bytes were checked
against the held manual and verified original source download. Parallel's token
table corroborates Input$ spelling and component grouping; no Inputs alias is
introduced. None of the ten forms passed complete scopes before this change.

All 25 package/inventory checks and 149 integrations per existing consumer pass
in both modes/themes. Checks include typed/suffixed boundaries, both Input$
contexts, Trap composition, opaque payloads and existing serial/printer forms.
Removing the parallel command rule fails; restoration passes. npm/VSIX source
bytes match with no public flag or executable host, and extracted modes render
both themes while preserving source. No native transfer, timeout, status or
installed-release qualification follows. Versions, parser, published preview
0.2.0 and Marketplace are unchanged.


## AREXX integration continuation

Seven §10.6 named headings/page bindings bring BASIC to 629 across 33 chapters.
The bare Arexx function is distinguished from repeated page headers; all seven
entries were checked against the pinned extract. None passed complete scopes
before this change. All 25 package checks and 155 integrations per existing
consumer pass in both modes/themes. Checks include Arexx/Arexx$ roles, complete
command/function phrases, typed boundaries, reply variants, nested queries,
Trap composition, opaque script-like payloads and line recovery. Removing the
command rule fails the focused suite; restoration and editor sync pass.
No native process, port, message exchange or script execution is claimed.

Disposable npm/VSIX contents match source, including all grammars, icon and
configuration, without public flags or executable host code. Extracted modes
render both themes and retain Arexx$'s function scope. No installed-editor or
native communication review is claimed. Versions, parser, published preview
0.2.0 and Marketplace are unchanged.


## Multitasking continuation

Ten §11.4 heading/page bindings bring BASIC to 639 entries across 34 chapters.
None passed complete scopes before the change. All 25 package checks and 161
integrations per existing consumer pass in both modes/themes. Checks cover all
ten forms, typed boundaries, nested queries, Trap composition, Exec command/output
strings, existing AREXX/bank vocabulary and line recovery. Removing the command
rule fails the focused suite; restoration and editor sync pass. No native process,
program, device, scheduler or display-state behavior is qualified.

Parallel file workers intermittently exposed Shiki 4.4.3's explanation error:
`Cannot read properties of undefined (reading 'startIndex')`. Inspection found
separate scope/encoded tokenisation passes with a default 500 ms deadline. A
controlled 1 ms diagnostic observed scope-tokenisation `stoppedEarly` and reproduced
the same exception. Full suites pass with one file worker per run; the integration
command now bounds concurrency without removing tests or changing the deadline.
No third-party installation or dependency was changed.

Disposable npm and VSIX contents match source bytes, including all grammars and
editor assets. The VSIX has no public gallery flag or executable host. Extracted
npm exports render AMOS, AMOS + 3D and AMAL in both themes, preserve exact source
and retain Prg State's function scope. Versions, parser, published preview 0.2.0
and private Marketplace availability are unchanged.


## Library, equate and structure continuation

Thirteen exact heading/page bindings from §11.5, pp.11.05.01–05, were checked
against the SHA-256-pinned extract. All thirteen lacked complete scopes before
the change. BASIC now has 652 entries across 35 partially or fully inventoried
chapters; requester/device forms on pp.11.05.06–08 remain pending.

All 25 package checks and 167 integrations per existing consumer pass in both
profiles/themes. Tests cover complete phrases, typed/label boundaries, Struc and
Struc$ reads/assignments, nested calls, adjacent AREXX/task controls, opaque
case-sensitive name strings and line recovery. Removing the library command rule
fails both profiles; restoration and editor sync pass. The fresh notebook preserves
exact source and renders styled output. No library or memory operation executes,
and no ABI, equate-name resolution, structure typing or native release is qualified.

All npm and VSIX source-file bytes match, including the three grammars and editor
assets; the VSIX has no public gallery flag or executable host. Extracted exports
render all three modes in both themes, preserve exact source and retain the two
structure roles. Versions, parser, published preview 0.2.0 and private Marketplace
availability remain unchanged.


## Device I/O continuation

Nine new device forms bring BASIC to 661 entries across 35 partial/full chapters.
All 22 §11.5 library/device headings and following page bindings were checked
against the SHA-256-pinned extract. Dev First$ follows heading/examples despite
the dollar-less signature; no alias is added. Dev D0's earlier example mention
remains for definition-led review. The three requester controls remain pending.

All nine device forms lacked complete scopes before the change. All 25 package
checks and 172 integrations per existing consumer pass in both profiles/themes.
Checks cover complete phrases, typed boundaries, close variants, nested structure
access, Equ composition, opaque device names/path masks, comments and line recovery.
Removing the device command rule fails both profiles; restoration and editor sync
pass. The fresh notebook preserves exact source and emits styled HTML/CSS. No
device is accessed and no native timing, status, structure layout, channel validity
or IO lifecycle is qualified.

All npm/VSIX source-file bytes match, including editor assets, with no public
gallery flag or executable host. Extracted exports render all three modes in
both themes, preserve exact source and retain Dev Check's function scope. Versions,
parser, published preview 0.2.0 and private Marketplace availability are unchanged.
