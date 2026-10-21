# Coverage and result meanings

Preview 0.2.0 releases the expanded BASIC and optional AMOS 3D highlighting.
The Rust parser remains at 0.1.0 with its opening-program subset. Neither surface
is complete AMOS support. Current source additionally covers §10.2 file/directory
I/O, §8.1 music/basic sound §8.2 samples §8.3 music modules and §11.2 speech; these continuations are not in preview 0.2.0.
The table describes current source.

| Surface | Implemented |
| --- | --- |
| Parser | Cls with no argument or an unsigned decimal literal; Print with exactly one double-quoted literal; Wait Key; End. |
| Source | Original UTF-8 text, all tokens/trivia, half-open byte ranges, typed statement nodes; recovery at line/colon boundaries. |
| Lexical rules | Case-insensitive commands, spaces/tabs, blank lines, colon separators, double-quoted strings without backslash escapes, line-start apostrophe comments and statement-start Rem comments. |
| Highlighting | Professional forms from §§5.1–5.9, 6.1–6.5, 7.1–7.7, 8.1–8.3, 10.1–10.6, 11.1–11.2, 11.4, 12.1–12.2 and five §13.1 accessory/configuration forms, plus library/equate/structure/device/requester forms from 11.5 and Bank or Risk display/sound vocabulary; standalone labels and declaration names, selected numeric notation, names, strings and comments. Partial vocabulary, not version validation. |
| Profiles | One named observed Pro 2.00 installation; no additional extension qualification. Creator/Easy/other Pro/derivatives are unknown. |
| Native files, LSP, compilation | Not implemented. A native .AMOS file must be decoded separately. |

`SupportedStructure` means the parser understands the listing's forms. It does
not mean its literal values are within runtime limits, static types are valid,
execution will finish, or a different installation accepts it. For example, a
large decimal is retained without narrowing it to a host integer; AMOS range and
palette checks are future analysis. `Print 2` is valid in the observed runtime,
but the host reports it as unsupported. `Prit` is an unresolved invocation rather
than a lexical error; procedure/extension resolution is not implemented.

Malformed strings and misplaced apostrophe comments are invalid within this
source contract. Other argument combinations generally remain unsupported:
we do not infer invalidity from absence in the first subset. An unsupported
statement always retains its range and prevents a successful check. Empty
colon statements also remain unsupported pending qualification.

LF, CRLF and CR delimit lines in host text. This is a text-input convention,
not a native import/encoding qualification. Columns count Unicode scalar values
and count tabs as one; they are not visual tab stops or LSP UTF-16 positions.
Unicode literal text is retained by the host; historical encoding conversion is
future codec work. Control characters other than tab/newline are rejected by
this plain-text input contract, including inside strings/comments.

CLI exit codes: 0 supported structure; 1 invalid text/form; 2 unsupported form;
3 unknown profile; 64 usage or input error. Errors use one-based line/column.
A profile is always explicit; unknown releases never default to Pro.

TextMate highlighting is lexical. It can colour unsupported or invalid source;
it cannot supply parser diagnostics or determine whether a name is a procedure.
Native .AMOS is deliberately not associated with the editor extension: only
`.amos.txt` listings are associated automatically.

## Full-game highlighting milestone

The [pinned 416-line game](../corpus/highlighting/README.md) has 398 reviewed
command/control-word, function, reserved-variable, logical-operator and label
occurrences. Every range and the complete highlighted text are checked in
dark-plus and light-plus. The inventory includes all expressions and the final
presentation routine, rather than only line heads. Array names and subroutine
targets remain identifiers. A disabled Screen Copy pattern fails this check.

Additional vocabulary, beyond the released opening/control set:

- Control/data: Gosub, Return, Dim, Randomize, Wait and Wait Vbl.
- Display: Hide, Show, Curs Off, Flash Off, Double Buffer, Autoback, Bob Update
  Off, Palette, Paper, Pen, Locate, Ink, Bar, Box, Screen Swap and Screen Copy.
- Sound/input: Play, Play Off, Wave, Volume, Set Envel and Clear Key.
- Expressions: Key State, Upper$, Scancode, Physic, Logic, Timer, And and Or.

This does not cover the whole AMOS vocabulary, AMAL/Interface languages inside
strings, all numeric representations, extension commands or edition differences.
Only standalone named label definitions get a label scope; inline/numeric labels,
procedure resolution and target resolution remain outside this milestone.
TextMate accepts spaced/tabbed spellings lexically, without qualifying how each
original runtime imports them. Parser coverage is unchanged. Public Marketplace
release still requires a separate review.

## Manual-led core milestone

Current source covers the 109 chapter entries in the
[Professional manual core inventory](../specifications/manual-core/README.md),
from §§5.1–5.5. These are named forms and connective words, including grouped
headings and typed variants; the count is not a whole-language percentage or
a count of argument overloads. Thirty-two entries passed the previous complete
phrase/boundary checks; all 109 now pass in both tested themes.

This adds missing basics, array/string operations, maths/trigonometry, logical
operators, control/data commands and procedure forms. `Param`, `Param#`, `Param$`
and `Pi#` retain their typed spelling. `Procedure` and `Def Fn` declaration names
have a function-definition scope; parameters, calls and targets remain unresolved
identifiers. Two fresh mixed listings exercise these constructs independently of
Bank or Risk.

The inventory is documentary Professional coverage, not native release or
Creator/Easy qualification. Broader file facilities, numeric notation, numeric/inline labels,
AMAL/Interface and extension vocabularies remain separate sweeps. The existing
game milestone still passes. Preview 0.2.0 includes this expansion; the private
Marketplace submission retains its earlier package.

## Text and keyboard milestone

The inventory additionally covers 48 named text entries from §5.6 and 14 keyboard
entries from §10.1, for 171 chapter entries in total. Ten of these 62 entries
passed the previous full phrase/boundary checks; all 62 now pass. New forms
include text styles and cursor controls, string-valued text functions, formatted
output, Input/Line Input/Input$, keyboard state/scan functions and macros.

Pen/Paper/Cmove and their dollar forms keep distinct command/function scopes.
Key$ has a reserved-variable scope in assignments and expressions. The `?`
keyboard shortcut is coloured as a lexical print abbreviation; the manual says
the original editor expands it to Print. No raw-shortcut persistence is inferred.
Print Using masks and Key$ payloads remain strings, without embedded execution
or format validation. A fresh text/keyboard listing checks these contexts and
exact text preservation in both themes and existing consumers.

Keyboard vocabulary does not qualify disc input overloads. No new parser
behaviour, runtime/edition qualification or public Marketplace release follows.

## Windows, input and screens milestone

Five further chapters add 91 entries: windows (§5.7), joystick/mouse (§5.8), and
screen setup, use and effects (§§6.1–6.3). The inventory now has 262 entries
across 12 chapters. Nine of the new entries passed the previous complete
phrase/boundary checks; all 91 now pass. These are chapter entries, including
overlapping references and two documented roles for Screen, rather than a count
of unique commands.

Bare Screen has a neutral built-in scope for its command and function uses;
Screen Open and Screen Width retain their specific command/function scopes.
X Mouse/Y Mouse keep reserved-variable scopes in reads and assignments. Read
Text$ is a command. Spack, Pack and Unpack carry the manual's picture-compactor
extension label, without qualifying availability. Filename and effect payloads
remain strings. A fresh mixed listing checks these contexts in both consumers.

General file I/O and broader extensions remain later work. No runtime, parser or edition qualification
is added. Published packages and Marketplace availability are unchanged.

## Memory banks, drawing and menus milestone

The inventory adds 25 bank entries (§5.9), 27 drawing entries (§6.4) and 35 menu
entries (§6.5), bringing BASIC coverage to 349 chapter entries across 15 chapters.
Six of these 87 entries passed the previous complete phrase/boundary checks;
all 87 now pass. Counts retain repeated references and distinct documented roles.
Fourteen embedded menu commands have a separate cited inventory; their payloads
remain ordinary strings and do not increase the BASIC count.

Colour's assignment and query uses share a neutral scope. Menu$ keeps its
reserved-variable scope for simple and advanced definitions. Full Reserve As
variants, bank queries, drawing phrases and menu controls have specific scopes.
Load/Save Iff still match whole phrases beside bank Load/Save. On Menu callbacks
remain unresolved identifiers. A fresh mixed listing checks these forms in both
existing consumers and themes.

Further animation, general file I/O, broader extensions and edition/release
qualification remain later work. Memory ranges, pointer safety, argument validity
and native bank/menu persistence are not established by highlighting. The parser,
published packages and private Marketplace availability are unchanged.

## Sprite, Bob and object-update milestone

The §§7.1–7.3 inventories add 53 entries (19 sprite, 21 Bob and 13 update forms),
bringing the total to 402 BASIC chapter entries. Three new entries passed the
previous complete phrase/boundary checks; all 53 now pass. Repeated chapter
references are retained, including Sprite Update and its On/Off variants.

Coverage includes object display and image-bank commands, palette aliases,
coordinate/image queries, coordinate conversion, reversal functions, priority,
masking and manual/automatic update commands. Specific phrases precede bare
object names; Sprite Base retains its function scope. Bob Update Office colours
the documented Bob Update prefix and leaves Office an identifier. Nested calls,
omitted arguments and masks receive lexical scopes without semantic validation.

All 14 embedded menu examples remain strings. Bob's BASIC command scope comes
from the independent object chapter, rather than promotion of embedded commands.
A fresh mixed listing exercises creation, positioning, updating and queries.
Embedded AMAL highlighting, broader object/icon facilities and native rendering remain later work. Parser scope, package releases and private Marketplace
availability are unchanged.

## Collision detection and IFF animation milestone

The §§7.4–7.5 inventories add 14 collision and 12 IFF entries, for 428 BASIC
chapter entries across 20 chapters. Three new entries passed the previous full
phrase/boundary checks; all 26 now pass. The 14 embedded menu records stay separate.

Bob/Sprite collision queries keep function scopes beside bare object commands.
Checks cover target ranges, Col queries, screen/hardware zones, masking and
Frame Load/Length/Play/Skip/Param expressions. Mask Iff is a command and Picture
a function. Load/Save Iff, Iff Anim, Freeze and Unfreeze have command scopes.
A fresh mixed listing preserves these contexts and literal filenames; it assumes
an already-open channel for frame expressions and does not qualify file I/O.

This is vocabulary coverage, not collision accuracy, frame decoding, mask/pointer
validation, render timing or native acceptance. Embedded AMAL highlighting and general file I/O remain separate work. Published packages, parser scope and private Marketplace
availability are unchanged.

## AMAL controls and extension planning

Professional §7.6 adds 24 BASIC entries, for 452 across 21 chapters. None passed
the previous complete phrase/boundary checks; all 24 now pass. Complete Amal,
Anim, Move and Synchro variants and Update Every retain command scopes. Amreg
has a reserved-variable scope in reads and assignments; Chanan, Chanmv, Amalerr
and Movon are functions. Channel's `To Screen Size` target phrase is recognised;
bare Screen Size is not promoted to a standalone command.

A separate [AMAL inventory](../specifications/amal/README.md) records 16 embedded
commands/structures, 15 functions and five register/family records. These are
36 documentary records, outside the BASIC count. Significant-capital behaviour,
labels, Autotest and register-family evidence are recorded for a later design.
All BASIC strings remain opaque, including invalid or incomplete AMAL payloads.
No standalone AMAL grammar, parser, validation or runtime execution is added.

[AMOS 3D](../specifications/extensions/amos-3d/README.md) now has hash-bound guide
and quick-card evidence, installation/minimum-version statements and a bounded
inventory/profile follow-on plan. It is an optional extension, distinct from AMAL.
The ANGLE REL/ANGEL REL documentary conflict is retained; later source evidence
is recorded below. No Td vocabulary or release compatibility is qualified. Published packages, parser scope and private
Marketplace availability are unchanged.

## AMOS 3D documentary inventory

The optional extension has a separate 59-record inventory across six command
families. All 46 quick-card command/function cells are covered by guide-crosschecked
records; grouped axes, overload examples, cached results and signature continuations
are retained. Two additional records describe movement/rotation string families.
This adds no entries to the 452-form Professional BASIC highlighting checklist.

Fifty-five records have documentary status, three have revision-scoped source
evidence, and one has pinned-binary evidence for the single-object Collide result.
The evidence
backlog names what must be checked before accepting spellings, call shapes or
semantics. No extension release is
qualified. The optional Td lexical profile is described below; no 3D parser,
native format or runtime is implemented.

## AMOS 3D original-source evidence

The official publisher source supplies three answers for its `Issue 1.02(AP200)`
wrapper: ANGLE REL spelling, Quit as a no-argument instruction, and Advanced as
an integer function with one parenthesised integer argument. Exact pinned source
excerpts and the verifier path support those conclusions; no native execution or
binary/source equivalence is claimed. Conflicting manual evidence remains intact.

Collide's wrappers forward the external library result unchanged. A separately
pinned [library trace](../specifications/extensions/amos-3d/collision-binary.md)
shows that its single-object mode returns the first colliding candidate index,
or -1, rather than a collision count. This does not establish native execution
or built-wrapper equivalence. Later tokens in this source also extend
beyond the quick card. The manual's 59 records do not become a complete inventory
of that source revision. No Td highlighting, parser, release qualification or
package availability change follows from this source audit.


## Optional AMOS 3D lexical profile

Current source offers `amos-3d`, containing the unchanged BASIC rules plus the
59-record extension vocabulary. The npm subpath and self-contained TextMate JSON
share the same combined grammar as VS Code's **AMOS + AMOS 3D** mode. The default
AMOS mode and file associations keep their prior behaviour.

All 59 records have command/function scope checks in both themes, including
case, horizontal spacing, grouped axes, longer phrases and documented overload
examples. ANGLE REL uses its source spelling; ANGEL REL remains documentary
conflict evidence and is not an accepted alias. Quit uses command scopes and
Advanced uses function scopes. Colouring does not enforce arguments or call shape.
Movement/rotation strings remain strings. The five additional publisher-source
tokens are excluded pending their own inventory. Profiles do not qualify editions,
installed releases, collision geometry or native acceptance. This is included in preview 0.2.0;
Marketplace availability remains private.


## Unreleased file and directory I/O

Professional §10.2 adds 38 chapter entries for a total of 490 BASIC entries.
One of the 38 spellings, Input$, already had complete function scopes; the new
inventory records its file-channel example separately. Directory listings/search,
file selection, space queries, sequential channels, record access, Run and Include
now have lexical coverage. Dir$ preserves the manual's function category but uses
a reserved-variable scope for reading/assignment, beside Pof and Command Line$.
Print #, Input #, Line Input # and ? # include their documented channel markers.

The directory-listing context confines /W to Dir/Ldir statements. It protects
quoted device paths and ends at a colon separator or line end; normal division
and both existing Get/Put phrases retain their scopes. The plural Command Lines$
signature and FIELD$ prose are documentary conflicts, not accepted new aliases.
Filenames, wildcard patterns and included source contents remain opaque.

This does not implement channel validation, file existence checks, actual
filesystem operations, record layouts, include resolution, compiler or parser
behaviour, or native release qualification. Both lexical profiles share the new
BASIC rules. Published npm/VSIX 0.2.0 and Marketplace availability are unchanged.


## Unreleased standalone AMAL

The explicit `amal` registration covers the 36 §7.6 inventory records: 16 commands
and structures, 15 functions and five register/family records expanding to 39
members. Significant capitals and lowercase padding determine lexical codes;
this grammar is case-sensitive. Instruction, expression, jump-target and Autotest
contexts distinguish A/X register roles from instruction roles. Autotest If
supports the documented eXit action after a completed expression value.

Definitions and targets have label scopes without name resolution. Decimal
integer text, signs/operators, grouping and separators are lexical only. No
BASIC comments or strings are inherited; strings in both AMOS profiles stay
opaque. Use semicolons or line boundaries for ambiguous A/X transitions after
expressions; those separatorless transitions receive neutral scopes rather than
invented acceptance. Full compact syntax, arities, loop/Autotest legality,
numeric ranges, persistence, compilation and native execution remain unqualified.
The default AMOS/AMOS 3D grammars and registrations are byte-for-byte unchanged
by this milestone. Published 0.2.0 and Marketplace availability stay unchanged.


## Music and basic sound milestone

Twenty-one §8.1 entries bring the BASIC inventory to 511 across 23 chapters.
Five forms already passed the complete phrase/boundary checks; all 21 now pass.
Coverage includes effects, voice/volume controls, note playback, wave/envelope
commands, sample-to-wave assignment, filter controls, Vumeter and basic music
playback. Music Stop/Off and Noise To retain complete command scopes. Vumeter
is a function; standalone AMAL's VU remains separate.

The five music playback entries are crosschecked against their §8.3 definitions.
Source discrepancies are retained in the inventory. A fresh mixed listing checks
both BASIC profiles and themes. String wave data and filenames remain opaque;
channels, banks, argument ranges, sound quality and native execution are not
validated. Sample management/playback, tracker/MED and speech remain later work.
This is unreleased source coverage; preview 0.2.0, parser and Marketplace state
are unchanged.


## Sample playback and management milestone

Ten §8.2 entries bring BASIC coverage to 521 chapter entries across 24 chapters.
None passed the full phrase checks before this change; all ten now pass in both
BASIC profiles and themes. Sample playback/stopping/bank selection, raw playback,
loop controls, chunk I/O and switching commands have command scopes; Sam Swapped
has a function scope. Existing Sample assignment and Swap retain their scopes.

The independent mixed listing exercises optional playback forms, file/memory
expressions and sample status without claiming a working audio streamer.
Pointers, bounds, memory type, buffer scheduling, result values and actual sound
remain unvalidated. Source discrepancies are recorded in the inventory rather
than promoted to aliases. Tracker/MED and speech remain later sweeps. This source
coverage is unreleased; published 0.2.0, parser and Marketplace state are unchanged.


## Tracker and MED music milestone

Fifteen §8.3 chapter entries bring BASIC to 536 across 25 chapters, retaining five
AMOS music forms already inventoried in §8.1. Those five passed before the change;
the ten Track/Med phrases are newly covered. All 15 pass in both BASIC profiles
and themes. Omitted-argument playback examples receive lexical scopes without
validating banks, patterns, songs or defaults. Bare Track/Med, run-together names
and suffixed lookalikes remain identifiers.

A fresh mixed listing covers module controls beside AMOS music and sample
commands. Filenames stay strings. Module formats, MED library availability,
audio interaction and MIDI output remain unqualified. Speech is a later pass.
This continuation is unreleased; parser, published 0.2.0 and Marketplace state
are unchanged.


## Speech milestone

Seven §11.2 entries bring BASIC to 543 chapter entries across 26 chapters. None
passed before this change; all seven now pass in both profiles and themes. Say,
Set Talk and Talk Misc/Stop have command scopes. Mouth Width/Height/Read have
function scopes in expressions, alongside ordinary Read's existing command role.

The fresh mixed listing exercises speech strings, optional Say modes, omitted
Set Talk parameters and mouth queries. Narrator installation, mode timing, return
values, spoken audio and mouth animation are not established by highlighting.
This continuation is unreleased; parser, published 0.2.0 and Marketplace state
are unchanged.


The [remaining-gap review](highlighting-gaps.md) maps uninventoried manual routes,
records representative pre-sweep scope failures. The approved icons/blocks, fonts
and error-handling sweeps are now complete; the review maps the remaining work.


## Icons and blocks

Fifteen §7.7 entries bring BASIC to 558 across 27 chapters. None passed complete
scopes before the change; all now pass in both profiles/themes. Full icon capture,
palette, insertion/deletion, masks, block and compacted-block phrases take priority
over bare file Get/Put. Hrev/Vrev Block are commands beside the image functions.
A fresh mixed listing checks these roles and opaque payloads. Masking, alignment,
blitter modes and image output remain unqualified. Coverage is unreleased.


## Fonts

Thirteen §11.1 chapter entries bring BASIC to 571 across 28 chapters. Assign
already passed; the other twelve forms now have complete scopes. Text draws
characters while Text Base/Length and existing Text Styles retain function scopes.
Font$, enumeration/selection and coordinate conversions have bounded scopes;
typed lookalikes remain identifiers. The fresh listing is lexical evidence only:
font availability, metrics and rendering remain unqualified. Coverage is unreleased.


## Error handling

Eleven §12.2 entries bring BASIC to 582 across 29 chapters, including explicit
On Error Goto and Resume Next forms. None passed complete scopes before this
change. Full On Error/Resume phrases, Trap/Error commands and Errn/Errtrap/Err$
queries pass in both profiles/themes. Trap immediately followed by another
command preserves both scopes; handler and recovery targets remain unresolved
identifiers. The mixed listing is a lexical fixture, without validating error
codes, handler placement, recovery behavior or native message availability.
All three approved gap sweeps are complete. Coverage remains unreleased.


## Printer and general ports

Twelve §10.3 entries bring BASIC to 594 across 30 chapters. None passed complete
scopes before this change; all now pass in both profiles/themes. Printer command
and function phrases retain distinct scopes, alongside Open Port and Port.
Existing file channels and error commands remain covered. The independent
listing preserves strings and escape payloads; no printer/device is accessed.
Pointer ranges, buffer lifetimes, status values and actual output remain
unqualified. These additions are unreleased.


The [I/O boundary review](io-extension-boundary.md) records the 18 serial and ten
parallel forms. Pinned original source resolves buffer spelling and component
grouping. Both are now included in BASIC lexical coverage. Handshake semantics and Serial Base arity remain unqualified.


## Serial

Eighteen §10.4 entries bring BASIC to 612 across 31 chapters. None passed complete
scopes before this change; all now pass in both modes/themes. Pinned official
source resolves Serial Buf and the I/O component grouping, without qualifying
installation/releases. Serial Buffer stays ordinary, Input$ remains typed and
Serial Base's arity conflict is explicit. Serial X semantics, buffers, driver
status and actual traffic remain unqualified. Coverage is unreleased.


## Parallel

Ten §10.5 entries bring BASIC to 622 across 32 chapters. None passed complete
scopes before this change; all pass in both modes/themes. Commands and queries
keep separate scopes; Input$ is recognised while Inputs remains ordinary.
Source corroborates component grouping and optional argument contexts, without
qualifying default installations, blocking, timeouts or status values. Fresh
examples preserve strings/comments and existing serial/printer roles. No devices
are accessed. These additions remain unreleased.


## AREXX integration

Seven §10.6 entries bring BASIC to 629 across 33 chapters. None passed complete
scopes before the change; all now pass in both modes/themes. Arexx Open/Close/
Wait/Answer are commands; Arexx Exist, Arexx and Arexx$ are functions. Complete
phrases, dollars and identifier boundaries retain their scopes beside existing
port and error controls. The fresh listing preserves port names and script-like
payloads as strings. No process, message port or script is executed. Exec startup
is covered by §11.4 below; editor-integration references need their own later
definitions. OS/library availability and message protocols remain unqualified.
Coverage is unreleased.


## Multitasking and inter-program communication

Ten §11.4 entries bring BASIC to 639 across 34 chapters. None passed complete
scopes before the change; all pass in both modes/themes. Multi Wait, Amos display/
toggle controls, Prun and Exec have command scopes; Amos Here and Prg Under/State
are functions. Exec completes the startup-command vocabulary referenced by AREXX.
Ask/Call Editor references remain later work at their own definitions.

The fresh listing checks command/output strings and status queries beside existing
AREXX, Trap, Param, Command Line$ and Bgrab forms. No process, program or device is
launched, and no display/system setting is changed. Timing, task state, lifecycle
and native parameter effects remain unqualified. These additions are unreleased.


## Library calls, equates and structure access

Thirteen named forms from §11.5, pp.11.05.01–05, bring BASIC to 652 entries
across 35 partially or fully inventoried chapters. Lib Open/Close and Set Equate
Bank are commands; library calls/bases and Lvo/Equ are functions. Struc retains
the reserved-variable scope; Struc$ retains the heading's function scope in both
read and assignment contexts. Colour does not validate an assignment or type.

Equate/offset names stay opaque strings, including case distinctions. No library
is opened or called by the fresh notebook. Registers, ABI, memory access, name
resolution and runtime availability remain unqualified. Device forms are covered
below; requester controls are covered separately below. These additions
are unreleased.


## Device I/O

Nine named §11.5 device forms bring BASIC to 661 entries across 35 partial/full
chapters. Dev Open/Close/Do/Send/Abort have command scopes; Dev First$/Next$/Check/
Base are functions. Dev First$ keeps its heading/example spelling; the signature
that omits the dollar sign supplies no alias. All nine lacked complete scopes
before the change and pass in both profiles/themes.

The mixed notebook nests Dev Base inside Struc/Struc$ and places Equ beside device
commands. Device names, path masks and command/equate strings remain opaque. No
device is accessed and no status, timing, memory layout, channel validity or IO
lifecycle is qualified. Dev D0's earlier example mention awaits its own definition.
The three Requester Extension controls are covered below. Additions are unreleased.


## Requester Extension controls

Request Wb, Request On and Request Off bring BASIC to 664 entries across 35
inventoried chapters, including 25 named §11.5 headings. All three lacked complete
scopes before the change and pass in both profiles/themes. Each retains the
manual's Requester Extension component label. Bare Request and incomplete/suffixed
phrases retain ordinary identifier scopes; existing On behavior stays intact.

The mixed notebook places requester controls beside Trap, device/library forms
and AMOS display queries. Strings/comments remain opaque. No requester setting
is changed, and no visibility, cancellation, Workbench routing or installed release
is qualified. Dev D0's example mention still needs its own definition-led review;
coverage of these named headings is not whole-chapter semantic validation.
The additions remain unreleased.


## Floating-point reconciliation and Monitor

[Reconciliation](manual-reconciliation.md) records no new named BASIC definition
in §11.3. Sin/Cos/Sqr already have §5.3 scopes; Single/Double Precision are format
labels. Library files, number-format claims and co-processor behavior are not
new runtime qualifications. No numeric-notation or parser change follows.

Monitor from §12.1 brings BASIC to 665 entries across 36 inventoried chapters.
It lacked command scope before the change; both profiles/themes now retain its
command role, including beside colon separators. Monitor lookalikes stay ordinary
names, while UI labels in strings/comments remain opaque. Buttons and shortcuts
are not extra BASIC forms. The full [§12.3 catalogue review](error-catalogue-review.md)
routes vocabulary to existing coverage and definitions; its original 17-gap baseline now has five §13.1 forms covered and twelve
gaps remaining. No monitor execution,
stepping, breakpoint, evaluation or return-to-program behavior is qualified.
The additions remain unreleased.


## Accessory and configuration statements

Five named §13.1 forms bring BASIC to 670 entries across 37 chapters. Set Accessory,
Call Editor, Ask Editor and Close Workbench/Editor receive complete command scopes
in both BASIC modes/themes. Ask Editor follows its instruction heading and statement
signatures; a return role does not turn it into an expression function.

The notebook checks one/three-parameter editor statement contexts, file Close, Trap,
Request On and existing task/error queries. Strings/comments remain opaque.
Set Editor is not an alias; Kill Editor remains separate. No editor/accessory
function ID, parameter semantics, eligibility, memory saving or native Workbench/
editor state change is qualified. Configuration UI options are not additional
language definitions. Additions remain unreleased.
