# Manual-led core vocabulary

This inventory follows the **AMOS Professional User Guide**: 109 entries from
chapters 5.1–5.5 (basics, strings, maths, control and procedures), 48 from chapter
5.6 (text), 14 from chapter 10.1 (keyboard input), 17 from 5.7 (windows), 20 from
5.8 (joystick/mouse), 54 from 6.1–6.3 (screen setup/use/effects), 25 from 5.9
(memory banks), 27 from 6.4 (drawing), 35 from 6.5 (menus), 19 from 7.1
(sprites), 21 from 7.2 (Bobs), 13 from 7.3 (object updating), 14 from 7.4
(collisions), 12 from 7.5 (IFF animation), 24 from 7.6 (BASIC AMAL controls),
38 from 10.2 (file/directory I/O) 21 from 8.1 (music/basic sound) ten from 8.2 (samples) 15 from 8.3 (music modules) and seven from 11.2 (speech) and 15 from 7.7 (icons/blocks) and 13 from 11.1 (fonts) and 11 from 12.2 (error handling) and 12 from 10.3 (printer/ports) and 18 from 10.4 (serial) and ten from 10.5 (parallel) and seven from 10.6 (AREXX integration) and ten from 11.4 (multitasking), plus 22 from the library/equate/structure/device parts of 11.5 (pp.11.05.01–08; requester controls pending).
The 661 BASIC entries include grouped headings, connective words, typed forms and the `?`
print shortcut. Fourteen embedded menu commands are recorded separately in
`06-05.json`, outside the BASIC vocabulary count.
Each entry cites a printed page and a line in the hash-pinned held extract
identified by `source.json`. Examples are freshly authored, not copied listings.

The chapter files are the review checklist and test inputs. They are not generated
from the grammar. The grammar remains the canonical TextMate asset; this work adds
no grammar generator or second parser. Record spelling, documented category and
lexical examples here before changing coverage claims.

The inventory covers named core forms, not every lexical rule, command mentioned
in an example, or every argument overload. Print and Input receive their own
instruction entries in the text and keyboard chapters. AMAL, broader extension
vocabularies and Creator/Easy editions require their own inventories. A 1992 Professional manual
is not evidence that every release accepts every listed form.

The held extract has visible typesetting/transcription defects: examples lose
underscores, the integer-range paragraph is suspect, and a comparison table uses
`>` twice. Do not turn these into executable rules. Command-prefix restrictions
in §5.1 concern original editor acceptance; conservative whole-word highlighting
of a command-like identifier is not a validity judgement. No new native tests
are claimed by this documentary inventory.

Fresh example identifiers use `MC_` to avoid known command-prefix restrictions.
Mixed listings under `examples/` combine forms without deriving their
expectations from the game. They are lexical test inputs under the repository's
GPL-2.0-or-later licence, not newly qualified native programs.

The Degree/Radian/Sin/Cos page is misprinted as `05.02.08` in the retypeset
extract. A separate original-manual extract gives `05.03.08`. Those four entries
cite the original pagination and retain `held_retypeset_page`; `source.json`
binds both extracts. The chapter/page consistency check caught this discrepancy.

Tests check complete phrases, letter case, spaces/tabs, typed builtin variants,
suffix and identifier boundaries, comments/strings and unchanged full-game
coverage. Passing entries mean lexical coverage of the recorded forms, not
complete syntax, semantics, runtime compatibility or public-release readiness.

`Procedure` and `Def Fn` declaration names receive a definition scope. Parameters,
bare calls, `Proc` targets and `Fn` references remain generic identifiers; colouring
a declaration does not establish name resolution or type checking. Numeric and
inline labels, full numeric notation and commands defined in later chapters are
separate work.

The `?` entry is the manual's keyboard shorthand, which the original editor
expands to Print; colouring it does not establish native persistence of the raw
shortcut. Print Using masks and Key$ macro payloads remain ordinary strings.
The keyboard inventory does not qualify disc input overloads or execute macros.

`Screen` is documented as both a command and function. Both records are retained,
with an explicit neutral `keyword.other.amos` scope; specific phrases such as
Screen Open and Screen Width keep command and function scopes. The inventory
key includes kind so these distinct uses cannot silently overwrite each other.
X Mouse/Y Mouse and Laced are reserved variables; Read Text$ is a command.
Spack, Pack and Unpack retain the manual's picture-compactor extension label.
Their lexical recognition does not establish installation availability. Filenames,
Flash sequences and Rainbow component patterns remain opaque strings.

Colour's command and function descriptions share the neutral scope used for
Screen. Menu$ keeps a reserved-variable scope for both the simple definition
and the advanced assignment that the manual labels an instruction. Distinct
kinds remain separate cited records. These scopes do not resolve argument types.

The menu chapter's embedded commands form a separate language inside strings.
The `embedded_entries` records retain full names, two-letter prefixes, citations
and literal examples. They do not add BASIC keywords or enable string parsing.
Callback targets remain unresolved identifiers. Bank sizes, pointer arithmetic,
file formats and original execution are outside these lexical checks. The bank
chapter gives conflicting upper bank numbers (65535 and 65536); no numeric limit
is inferred from that prose.

The object chapters include complete update variants, coordinate conversions,
image-reversal functions and the named Get Object Palette alias. Bare Bob and
Sprite are BASIC commands independently of their names appearing inside menu
strings; the embedded inventory does not determine BASIC coverage. Specific
phrases and functions retain priority over bare object names, including Sprite
Base. Omitted arguments receive lexical coverage without argument validation.

The held Bob chapter prints `$800+n` beside prose naming `$8000` as the horizontal
reversal flag, and its first Get Bob signature repeats x2 where the surrounding
prose describes a top-left coordinate pair. These discrepancies are not converted
into image flags or argument rules. Hardware limits, masking, update timing and
actual rendered results require separate evidence.

Collision functions retain their complete Bob/Sprite prefixes and optional target
range examples. Zone, Hzone and Mouse Zone are functions; Reserve/Set/Reset Zone
are commands. Frame Load/Length/Play/Skip/Param and Picture are functions, while
Mask Iff and Iff Anim follow their instruction headings. Nearby prose calls the
latter two functions, but shows statement usage; no alternate expression forms
are inferred. The held examples also contain `Bobsprite 001` and `Form Param`,
which are not promoted to builtin spellings. Function headings give Bobsprite Col
and Frame Param. Masks, collision results, frame data/pointers and timing are not
validated. General file-channel I/O is inventoried separately in §10.2.

The AMAL chapter's BASIC controls and STOS-compatible Move/Anim controls are
inventoried here. Amreg is a reserved variable; Chanan, Chanmv, Amalerr and Movon
are functions. The held Movon signature says Move On, while its heading and prose
name Movon; no function overload is inferred for the Move On command. Channel
has both object and screen targets; `To Screen Size` is recognised as a target
phrase without promoting bare Screen Size to a standalone command.

The [embedded AMAL inventory](../amal/README.md) retains significant capitals,
functions and register families separately; no embedded grammar is implemented.
The [AMOS 3D scope](../extensions/amos-3d/README.md) records optional-extension
sources and unresolved spellings, not extra Professional core vocabulary or
qualified releases. AMOS 3D is separate from AMAL.


The file/directory chapter includes both forms of directory listings (including
printer listings), selection/search functions, sequential channels, random-access
records and program/include filenames. Its 38 entries include the `As` connective
and `? #` shortcut; the Input$ spelling also appears in the keyboard chapter with
a different example. These are chapter entries, not a count of unique instructions.

Dir$ retains its documented function kind, with a reserved-variable lexical scope
because pp.10.02.05 shows reads and assignments. Pof and Command Line$ also receive
reserved-variable scopes. The Command Line$ heading and repeated examples use
the singular spelling, but extract line 18486 says `Command Lines$`; that plural
is retained as a discrepancy, not a new highlighted alias. Line 18775 says
`FIELD$` while the heading/signature/examples say Field. Line Input # has a
structure heading and statement examples even though nearby prose calls it a
function; it receives a command scope.

Directory `/W` is an option inside Dir/Ldir statements, not a global keyword.
Quoted paths protect internal colons, and the context ends at the next statement
separator or line end. File-channel forms retain their whitespace-separated #
marker without treating typed identifiers such as `Print#` as file operations.
Filenames, wildcard patterns and included programs remain opaque/unresolved.
No channel, field size, random-access layout, pointer range, include expansion,
filesystem mutation or original runtime acceptance is validated by highlighting.


The music chapter includes effects, voices/volume, notes, wave definitions,
noise/sample assignment, envelopes, filter controls, Vumeter and five music
playback controls. The playback entries also cite their full definitions in
§8.3. Line 14729 repeats MVOLUME for speed, while the example and §8.3 identify
Tempo. The voice table at line 14431 lists voices 2,4 for mask 6, despite the
zero-based 0–3 description; no channel mapping is inferred. Sample here assigns
a bank sample to a wave. The sample-management/playback, tracker/MED and speech
chapters remain separate sweeps. Wave payloads stay strings; no bank, amplitude,
voice mask, pitch, envelope, volume or tempo validity is established.


The sample chapter adds Sam Play/Stop/Bank/Raw, Sam Loop On/Off, Sload, Ssave,
Sam Swap and the Sam Swapped function. Complete phrase boundaries distinguish
Sam Swap from Sam Swapped; bare Sam and run-together Samraw remain identifiers.
The §8.2 signature and later listing use `Sam Swap voices To address,length`,
while the example on 08.02.06 uses a comma after voices. This discrepancy stays
explicit; the fresh examples follow the signature without qualifying either
syntax natively. Ssave's start To end is distinct from Sload's address,length.
Highlighting does not validate data bounds, CHIP memory, audio frequency,
refill timing, swap results or sample bank availability.


The music-module chapter adds 15 chapter entries: five AMOS music controls already
recorded in §8.1 and ten Track/Med forms. Counts retain chapter overlap rather
than reporting unique instructions. All are commands. Track/Med Play include
omitted-bank examples; highlighting does not validate playback defaults.
Track Load's signature supplies a bank, while a later example omits it. The MED
prose prints MMDO alongside MMD1; neither this spelling nor the library discussion
qualifies module versions, native loading, playback interaction or MIDI output.
Module filenames remain opaque strings. Speech remains a separate sweep.


The speech chapter adds Say, Set Talk, Talk Misc/Stop and the Mouth Width/Height/
Read functions. Mouth Read retains the manual's function role, while ordinary
Read remains a command. Set Talk's omitted parameters keep their commas, and
Say's optional mode receives lexical coverage without range or timing checks.
Speech strings stay opaque, including command-looking words, punctuation and
apostrophes. Narrator availability, edition differences, spoken output and mouth
animation remain unqualified; these are newly authored lexical examples.


The printer chapter adds six Printer commands, four Printer functions and the
Open Port command/Port function. Printer Error is a query; Error remains a
command. Printer escape payloads and device strings stay opaque. Dump setting
labels are not promoted to BASIC constants. The FRACCOLS explanation uses both
$FFFF and $FFF while describing half width, and an example describes ten lines
while looping 0 To 10; neither discrepancy becomes an executable rule.
No driver status, buffer, pointer, printout or device-readiness behavior is
qualified. Serial/parallel extension commands need their own review.


Serial forms carry the manual's I/O Extension label corroborated by pinned source.
Serial Buf is the source token; Serial Buffer is not an accepted alias. Serial
Base's source argument conflicts with the manual's omitted channel. Serial X
semantics remain unresolved. Scope coverage establishes none of these runtime
rules, device availability or edition/release compatibility.


Parallel forms carry source-revision I/O component provenance. Input$ keeps its
typed spelling; PARALLEL INPUTS prose is not promoted to an alias. Source and
manual optional-argument contexts are lexical checks, not native blocking,
timeout, pointer, status or driver validation. No device traffic is performed.


The AREXX chapter adds seven AMOS-facing forms: four commands and three
functions, including bare Arexx and typed Arexx$. Port/message strings remain
opaque; this is not a grammar for the separate AREXX language. Blank CLI example
blocks in the held extract are not reconstructed. Exec startup is covered by
§11.4 below; Ask/Call Editor mentions remain later inventory work at their own
definitions. Library
availability, port/message ranges, response obligations and native communication
are not established by highlighting.


The multitasking chapter adds task/display controls, Prun/Exec commands and
Amos Here/Prg Under/Prg State queries. Command Line$ stays a reserved variable;
the chapter's COMMAND LINES prose creates no alias. Exec's two-argument signature
and the earlier one-argument AREXX startup example are lexical contexts, not
qualified overloads. CLI commands, output-device names and program filenames
stay strings. Scheduler timing, display changes, program lifecycle, file/bank
sharing and process results remain unqualified.


The §11.5 inventory is partial. Its first thirteen named forms cover library
open/close/calls/bases, equates and structure access; nine further entries cover
device enumeration, control and status on pp.11.05.06–08. The three Requester
Extension controls on p.11.05.06 remain for a later inventory. Struc's reserved-variable role and
Struc$'s function heading are retained even in write contexts. This does not
validate data types, equate-name case, library availability or calling conventions.


Dev First$ follows its heading and examples despite the dollar-less signature
at extract line 20888. No Dev First alias is added. Dev D0 in an earlier equate
example remains for review at its own definition. Device names, path masks and
equate names stay strings; status, lifecycle and native IO effects are unqualified.
