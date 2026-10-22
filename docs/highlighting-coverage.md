# Highlighting vocabulary and evidence

The four highlighting modes in preview 0.3.0 share the scope described here.
The public editor preview 0.3.1 uses the same grammar bytes. The
[current support guide](coverage.md) explains parser results, profiles and limits.
See the [release record](releases/0.3.0.md) for the published package boundary.

This reference groups the vocabulary by manual chapter and source review.
Counts retain repeated chapter entries and distinct roles. They are not unique
instruction totals or a whole-language percentage. BASIC has 728 entries across
44 partial/full sections; 3D, AMAL and Interface have separate inventories.
Colour checks establish lexical scopes. They do not prove native acceptance,
argument validity, installed components or runtime results. BASIC strings stay
opaque in both BASIC modes. Evidence links retain conflicts and untested limits.

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
The original game milestone covers standalone named labels. Current source also
recognises line-head labels followed by statements and numeric line identifiers,
as described in the readiness review below; procedure/target resolution remains separate.
TextMate accepts spaced/tabbed spellings lexically, without qualifying how each
original runtime imports them. These rules add no parser forms.

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
game milestone still passes.

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

Keyboard vocabulary does not qualify disc input overloads.

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

Broader extension qualification remains later work. No runtime, parser or edition qualification
is added.

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

Broader extensions and edition/release qualification remain later work. Memory ranges, pointer safety, argument validity
and native bank/menu persistence are not established by highlighting.

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
Native rendering remains unqualified.

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
validation, render timing or native acceptance. Embedded AMAL strings stay opaque.

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
labels, Autotest and register-family evidence are recorded in the standalone design.
All BASIC strings remain opaque, including invalid or incomplete AMAL payloads.
Standalone AMAL highlighting is described below. AMAL parsing, validation and runtime execution are not implemented.

[AMOS 3D](../specifications/extensions/amos-3d/README.md) now has hash-bound guide
and quick-card evidence, installation/minimum-version statements and a bounded
inventory/profile follow-on plan. It is an optional extension, distinct from AMAL.
The ANGLE REL/ANGEL REL documentary conflict is retained; later source evidence
is recorded below. The opt-in Td vocabulary is described below. Release compatibility remains unqualified.

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
of that source revision.


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
installed releases, collision geometry or native acceptance.


<a id="unreleased-file-and-directory-io"></a>

## File and directory I/O

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
BASIC rules.


<a id="unreleased-standalone-amal"></a>

## Standalone AMAL

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
Standalone AMAL uses its own grammar and registration.


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
validated. Sample, tracker/MED and speech vocabulary are covered below.


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
than promoted to aliases. Tracker/MED and speech vocabulary are covered below.


## Tracker and MED music milestone

Fifteen §8.3 chapter entries bring BASIC to 536 across 25 chapters, retaining five
AMOS music forms already inventoried in §8.1. Those five passed before the change;
the ten Track/Med phrases are newly covered. All 15 pass in both BASIC profiles
and themes. Omitted-argument playback examples receive lexical scopes without
validating banks, patterns, songs or defaults. Bare Track/Med, run-together names
and suffixed lookalikes remain identifiers.

A fresh mixed listing covers module controls beside AMOS music and sample
commands. Filenames stay strings. Module formats, MED library availability,
audio interaction and MIDI output remain unqualified. Speech vocabulary is covered below.


## Speech milestone

Seven §11.2 entries bring BASIC to 543 chapter entries across 26 chapters. None
passed before this change; all seven now pass in both profiles and themes. Say,
Set Talk and Talk Misc/Stop have command scopes. Mouth Width/Height/Read have
function scopes in expressions, alongside ordinary Read's existing command role.

The fresh mixed listing exercises speech strings, optional Say modes, omitted
Set Talk parameters and mouth queries. Narrator installation, mode timing, return
values, spoken audio and mouth animation are not established by highlighting.


The [remaining-gap review](highlighting-gaps.md) maps uninventoried manual routes,
records representative pre-sweep scope failures. Icons/blocks, fonts and error-handling vocabulary are covered below.


## Icons and blocks

Fifteen §7.7 entries bring BASIC to 558 across 27 chapters. None passed complete
scopes before the change; all now pass in both profiles/themes. Full icon capture,
palette, insertion/deletion, masks, block and compacted-block phrases take priority
over bare file Get/Put. Hrev/Vrev Block are commands beside the image functions.
A fresh mixed listing checks these roles and opaque payloads. Masking, alignment,
blitter modes and image output remain unqualified.


## Fonts

Thirteen §11.1 chapter entries bring BASIC to 571 across 28 chapters. Assign
already passed; the other twelve forms now have complete scopes. Text draws
characters while Text Base/Length and existing Text Styles retain function scopes.
Font$, enumeration/selection and coordinate conversions have bounded scopes;
typed lookalikes remain identifiers. The fresh listing is lexical evidence only:
font availability, metrics and rendering remain unqualified.


## Error handling

Eleven §12.2 entries bring BASIC to 582 across 29 chapters, including explicit
On Error Goto and Resume Next forms. None passed complete scopes before this
change. Full On Error/Resume phrases, Trap/Error commands and Errn/Errtrap/Err$
queries pass in both profiles/themes. Trap immediately followed by another
command preserves both scopes; handler and recovery targets remain unresolved
identifiers. The mixed listing is a lexical fixture, without validating error
codes, handler placement, recovery behavior or native message availability.
All three approved gap sweeps are complete.


## Printer and general ports

Twelve §10.3 entries bring BASIC to 594 across 30 chapters. None passed complete
scopes before this change; all now pass in both profiles/themes. Printer command
and function phrases retain distinct scopes, alongside Open Port and Port.
Existing file channels and error commands remain covered. The independent
listing preserves strings and escape payloads; no printer/device is accessed.
Pointer ranges, buffer lifetimes, status values and actual output remain
unqualified.


The [I/O boundary review](io-extension-boundary.md) records the 18 serial and ten
parallel forms. Pinned original source resolves buffer spelling and component
grouping. Both are now included in BASIC lexical coverage. Handshake semantics and Serial Base arity remain unqualified.


## Serial

Eighteen §10.4 entries bring BASIC to 612 across 31 chapters. None passed complete
scopes before this change; all now pass in both modes/themes. Pinned official
source resolves Serial Buf and the I/O component grouping, without qualifying
installation/releases. Serial Buffer stays ordinary, Input$ remains typed and
Serial Base's arity conflict is explicit. Serial X semantics, buffers, driver
status and actual traffic remain unqualified.


## Parallel

Ten §10.5 entries bring BASIC to 622 across 32 chapters. None passed complete
scopes before this change; all pass in both modes/themes. Commands and queries
keep separate scopes; Input$ is recognised while Inputs remains ordinary.
Source corroborates component grouping and optional argument contexts, without
qualifying default installations, blocking, timeouts or status values. Fresh
examples preserve strings/comments and existing serial/printer roles. No devices
are accessed.


## AREXX integration

Seven §10.6 entries bring BASIC to 629 across 33 chapters. None passed complete
scopes before the change; all now pass in both modes/themes. Arexx Open/Close/
Wait/Answer are commands; Arexx Exist, Arexx and Arexx$ are functions. Complete
phrases, dollars and identifier boundaries retain their scopes beside existing
port and error controls. The fresh listing preserves port names and script-like
payloads as strings. No process, message port or script is executed. Exec startup
is covered by §11.4 below; Ask/Call Editor are covered by their §13.1 definitions. OS/library availability and message protocols remain unqualified.


## Multitasking and inter-program communication

Ten §11.4 entries bring BASIC to 639 across 34 chapters. None passed complete
scopes before the change; all pass in both modes/themes. Multi Wait, Amos display/
toggle controls, Prun and Exec have command scopes; Amos Here and Prg Under/State
are functions. Exec completes the startup-command vocabulary referenced by AREXX.
Ask/Call Editor have separate §13.1 coverage below.

The fresh listing checks command/output strings and status queries beside existing
AREXX, Trap, Param, Command Line$ and Bgrab forms. No process, program or device is
launched, and no display/system setting is changed. Timing, task state, lifecycle
and native parameter effects remain unqualified.


## Library calls, equates and structure access

Thirteen named forms from §11.5, pp.11.05.01–05, bring BASIC to 652 entries
across 35 partially or fully inventoried chapters. Lib Open/Close and Set Equate
Bank are commands; library calls/bases and Lvo/Equ are functions. Struc retains
the reserved-variable scope; Struc$ retains the heading's function scope in both
read and assignment contexts. Colour does not validate an assignment or type.

Equate/offset names stay opaque strings, including case distinctions. No library
is opened or called by the fresh notebook. Registers, ABI, memory access, name
resolution and runtime availability remain unqualified. Device forms are covered
below; requester controls are covered separately below.


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
The three Requester Extension controls are covered below.


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
routes vocabulary to existing coverage and definitions; its original 17 gaps
now have definition-led lexical coverage, including the Copper forms below. No monitor execution,
stepping, breakpoint, evaluation or return-to-program behavior is qualified.


## Accessory and configuration statements

Five named §13.1 forms bring BASIC to 670 entries across 37 chapters. Set Accessory,
Call Editor, Ask Editor and Close Workbench/Editor receive complete command scopes
in both BASIC modes/themes. Ask Editor follows its instruction heading and statement
signatures; a return role does not turn it into an expression function.

The notebook checks one/three-parameter editor statement contexts, file Close, Trap,
Request On and existing task/error queries. Strings/comments remain opaque.
Set Editor is not an alias; Kill Editor has a separate Appendix B record. No editor/accessory
function ID, parameter semantics, eligibility, memory saving or native Workbench/
editor state change is qualified. Configuration UI options are not additional
language definitions.


## Appendix B runtime command

Kill Editor brings BASIC to 671 entries across 38 chapters/appendix sections.
Its exact heading on 14.B.01 supplies command scope in both profiles/themes;
file Kill and previous Close/Ask Editor forms retain their scopes. Configuration
menu text, runtime filenames and comments remain opaque. No Set Editor alias
is added from the [Set Editor] menu option on 14.B.02.

The manual requires configuration enablement and excludes accessory/Prun-launched
programs. The notebook executes none of these operations. Eligibility, editor
unload, warm-start/session restoration, memory effects and runtime distribution
remain unqualified.


## Interface-facing BASIC dialogue entry points

Six forms from partial §§9.1/9.3 inventories bring BASIC to 677 entries across
40 chapter/appendix sections. Dialog Open/Close are commands; Dialog Box/Run,
Edialog and Dialog are functions. Longer phrases win over the Dialog status
query; bare function labels and typed lookalikes retain their intended boundaries.

Interface programs remain opaque strings, including significant capitals,
separators, quoted payloads and embedded commands. The mixed notebook checks
Trap, nested queries and existing Request/error forms without opening a native
UI. Channel validity, parameter meanings, event/status/error results and timing
remain unqualified. Zone/value queries, Array and update/freeze/clear are covered
below; resource controls have separate coverage below. Standalone Interface
highlighting is described below; injection into BASIC strings remains separate.


## Interface-facing zone values and channel controls

Nine more §9.3 forms bring BASIC to 686 entries across 40 chapter/appendix
sections, including fourteen BASIC headings in §9.3. Rdialog/Rdialog$,
Vdialog/Vdialog$ and Array are functions; Dialog Update/Freeze/Unfreeze/Clr
are commands. Vdialog/Vdialog$ keep function scopes in reads and assignments.
Their short heading descriptions conflict with the numeric/string signatures
and prose; highlighting does not validate those data types.

The mixed notebook checks nested Array calls, optional channel/update contexts
and existing dialogue queries. ArrayRead and other embedded Interface vocabulary
remain separate; all BASIC string payloads stay opaque. No native channel, zone,
event, array-memory or update/freeze behavior is qualified. §9.4 resource controls have separate coverage below.


## Interface-facing BASIC resources

Four §9.4 forms bring BASIC to 690 entries across 41 partial/full chapter/appendix
sections. Resource Bank, Resource Screen Open and Resource Unpack are commands;
Resource$ is a function. The retypeset page misprint 09.03.04 is retained beside
the original-manual page 09.04.04 for Screen Open/Unpack. Prose RESOURCES creates
no alias. Existing BASIC Unpack and Screen Open retain their scopes.

The six embedded resource definitions remain separate Interface vocabulary; their
BASIC string payloads stay opaque. No resource availability, bank fallback, message
index/content, screen/image/memory effect or native execution is qualified.


## Appendix A direct memory reads and writes

Eight forms bring BASIC to 698 entries across 42 partial/full chapter/appendix
sections. Peek/Deek/Leek/Peek$ are functions; Poke/Doke/Loke/Poke$ are commands.
Dollar-bearing forms retain complete scopes and typed lookalikes stay ordinary.
Four original catalogue gaps close here; the Copper follow-up is covered below. Appendix A
remains partial: block/address, conversion and bit forms are covered below; calls and registers
are covered below.

The notebook checks expressions, Trap and prior resource/error forms with no
memory operation executed. PEEKS prose supplies no alias. Address validity/
alignment, widths, signed results, string bounds/stop behavior and runtime
compatibility remain unqualified.


## Appendix A blocks and variable addresses

Copy, Fill, Hunt and Varptr bring BASIC to 702 entries across 42 partial/full
chapter/appendix sections. Copy/Fill are commands; Hunt/Varptr are functions.
The existing To connective keeps its scope in copy/fill/search range syntax.
The fresh notebook combines nested queries, typed variable arguments, Trap and
existing direct read/write forms while preserving strings/comments.

INSTR$ in Hunt’s prose creates no alias for Instr. No range endpoint, overlap,
alignment, pattern, search result, variable representation or address lifetime
is qualified, and no memory operation executes. The Copper catalogue follow-up is covered below.


## Appendix A conversions and bit operations

Bin$/Hex$, Rol.B/W/L, Ror.B/W/L, Btst, Bset, Bchg and Bclr bring BASIC to
714 entries across 42 partial/full chapter/appendix sections. Dollar suffixes
and complete sized rotate spellings retain scopes in both BASIC profiles;
bare Rol/Ror and unsupported sizes gain no command alias. Strings/comments,
identifier boundaries and existing binary/hexadecimal notation are checked.

The manual's Bin$ digit prose and later 32-digit example disagree; no validated
limit is inferred. Rotate-as-multiply/divide prose and Btst memory-width prose
supply no implemented arithmetic or address semantics. No native operation
executes. Machine-code calls/registers are covered below; the Copper catalogue follow-up is covered below.


## Appendix A machine-code calls and registers

Pload/Call commands and Areg/Dreg reserved variables bring BASIC to 718 entries
across 42 partial/full chapter/appendix sections. Reads and assignments retain
register scopes; existing Call Editor and Lib Call phrases retain complete scopes.
Optional call arguments, nested address queries, cases, typed boundaries,
strings/comments and line recovery have lexical checks in both BASIC profiles.

The manual's reserved-variable headings govern register classification despite
nearby function prose. Insert Program is an Editor action; assembly mnemonics,
register names and stack-format prose add no BASIC definitions. No file loads,
code execution, ABI, register access limits or bank lifetime are qualified.the Copper catalogue follow-up is covered below.


## Appendix F Copper

Eight named headings bring BASIC to 726 entries across 43 partial/full chapter/
appendix sections. Copper On/Off and Cop Move/Movel/Wait/Reset/Swap are commands;
Cop Logic is a function. Complete phrase scopes include separators, optional
mask arguments remain ordinary expressions, and Move/Movel retain boundaries.
Both BASIC profiles preserve strings/comments and recover at line boundaries.

Cop Logic's definition says instruction, but its return-value signature and
Command Index say function. The Cop Wait example uses y=130 while its comment
says 100; no native result is inferred. Hardware MOVE/WAIT/SKIP, registers,
capacity, address lifetime, screen interactions and timing remain unqualified.
No copper list is built or executed. The four Copper catalogue gaps close the
original 17-form audit; this is not a whole-language or release-readiness claim.


## Appendix C display-mode queries

Display Height and Ntsc bring BASIC to 728 entries across 44 partial/full
chapter/appendix sections. Both receive function scopes in expressions, branch
conditions and screen arguments; typed identifiers and strings/comments retain
their scopes. Existing Screen Open/Display, Lowres, Global and Wait Vbl examples
are reconciled without duplicate entries. PAL and SECAM gain no command aliases.

The manual's display heights, margins, refresh rates, loop duration, music/AMAL
speed and A3000 switching advice remain unqualified. No screen or timing routine
executes in the lexical checks. The original 17 catalogue gaps remain closed;


## Appendices D/E component and bank boundaries

Appendices D/E add no named BASIC forms; totals remain 728 entries across
44 sections. Bell now retains its explicit manual-labelled Music Extension
provenance. A component label within the ordinary lexical inventory is not an
installed-release or source-module qualification, and creates no new mode.

The reconciliation distinguishes memory headers, disk bank structures, music
labels, stored AMAL/Interface text and packed-image headers from BASIC definitions.
Version-sensitive and suspect layout prose remains documented without inferred
codec rules. No bank, sound or embedded program is executed.


## Complete command-index cross-check

All 818 Appendix G rows are reconciled: 702 BASIC, 33 AMAL, 14 embedded Menu
and 69 Interface references. The latter now have the separate inventory below.
Thirty flagged rows preserve spelling, role, locator, formatting and surface
conflicts. Definition-backed references cover the BASIC vocabulary, including
On … Proc as existing tokens. Generic Exit/Wait entries point to AMAL Autotest.
No new aliases or grammar behavior follows; BASIC remains 728 entries across
44 sections. The report and all row records retain their source provenance.
This bounded audit establishes neither whole-language nor release readiness.


## Reference appendices and standalone Interface

H/I's complete library/distribution/support material introduces no new language
forms. Historical service/licence wording and product names remain context.
The separate Interface inventory now contains 69 forms (46 commands, 22 functions,
one structure) and maps every index row. Its 68 distinct codes preserve SW's
two roles and the AR/AS index conflicts. All definition/signature bindings and
lexical-context evidence are retained separately from BASIC and operators.

BASIC stays 728 entries across 44 sections. Current source adds a standalone
`amos-interface` registration through the `interface` npm subpath and an explicitly
selected editor mode, with exact canonical/editor bytes. Both themes recognise
every inventory record, significant capitals/lowercase padding, opaque quoted
strings, integer/binary/hex literals, P1–P9, symbolic operators/NEg and punctuation.
SW remains a neutral builtin; AR/AS follow function definitions. Min/Max and Call
are unresolved, unknown pairs stay neutral, and adjacent digits are not split.

This is lexical coverage: no postfix/argument/terminator validation, custom-name
resolution, ZV context qualification or HyperText injection. BASIC strings remain
opaque.
No resource access, native execution or release qualification follows.


## Readiness lexical review

The [bounded readiness review](highlighting-readiness.md) records pinned original
source evidence and fixes for selected leading/trailing-dot and scientific
literals, inline statements after line-head labels, numeric line identifiers,
single-quoted BASIC strings and numbered Rem comments. A space before a named
label's colon retains an unresolved name. Commands/functions retain precedence.
Both quotes are opaque with line recovery; line-start apostrophes remain comments.

These changes affect both BASIC highlighting profiles, not the Rust parser.
Scientific values are not range-checked, jump targets remain unresolved, and
arbitrary spacing, original-editor rewrites, extended identifiers/encodings and
all-edition equivalence remain unqualified. The independent corpus contains two
small external programs plus a numeric regression fixture; it is not a whole-
language or representative-software coverage percentage. Publication remains
separate from the readiness recommendation.
