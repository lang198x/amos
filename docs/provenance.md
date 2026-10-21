# Provenance

The implementation and grammar are newly authored. The website's existing
AMOS grammar was inspected at code198x/website revision
`7412570891a79c0485b3d894cefd4cf74eb924eb`, but not copied: its applicable software
licence was not established. The website prose licence excludes software.

Language facts were checked against the original **AMOS Professional User Guide**,
[Internet Archive source](https://archive.org/details/AmosProfessionalManual):

- §5.1, pp. 05.01.01–03: strings, variable names and numeric types.
- §5.1, pp. 05.01.07–10: End, command separation, case/spacing and comments.
  In particular, apostrophe comments are restricted to the beginning of a line;
  inline comments use colon followed by Rem.
- §5.2: Chr$ and Str$ string functions.
- §5.3: Rnd.
- §6.1, p. 06.01.07: Cls with no argument, a colour, or a rectangular region.
- §10.1: Inkey$ and Wait Key.
- §14.1: binary and hexadecimal notation.

Full-game highlighting additionally uses the original manual's §5.1 (Dim and
Wait), §5.3 (Randomize and Timer), and §5.4 (Gosub/Return, labels, And/Or).
The [full-game fixture](../corpus/highlighting/README.md) retains its pinned
upstream source and MIT attribution. These facts identify vocabulary, not a new
parser capability or cross-release qualification.

Display forms come from §5.6 (Pen, Paper, Locate, Curs Off), §5.8 (Hide/Show),
§6.2 (Screen Copy/Swap, Physic/Logic and Wait Vbl), §6.3 (Flash Off), §6.4
(Ink, Palette, Bar and Box), §7.2 (Double Buffer and Bob Update Off), and §7.3
(Autoback). Multiword forms are matched as complete lexical phrases.

Sound uses §8.1's BASIC music commands (Play pitch,delay; Play Off; Wave; Volume;
Set Envel), not the separate AMAL `PLay` instruction in §7.6. Input uses §10.1
(Key State, Scancode and Clear Key); Upper$ is in §5.2. Timer is a reserved
variable, while Physic and Logic are functions. Labels are scoped only at a
standalone definition; Gosub targets and procedure invocations are not resolved.

These are language facts, not a claim that every edition behaves identically.
The AMOS-specific grammar is deliberately partial; it is not copied manual text.

The [manual-led core inventory](../specifications/manual-core/README.md) covers
named forms and connective words in §§5.1–5.5, including grouped headings and
typed variants. Each entry cites its printed page and exact line in a hash-pinned
primary extract. Examples are newly authored. It distinguishes documentary
Professional coverage from Creator/Easy, individual release and extension
qualification. Suspect range/comparison prose and lost underscores in the held
extract are recorded rather than converted into language semantics.

The continuation inventories §5.6 (text output, cursor/control strings,
formatting and the keyboard `?` shortcut) and §10.1 (keyboard functions, input,
buffer controls and macros). Pen/Paper/Cmove have distinct dollar-valued forms;
Key$ is documented as a reserved variable. Macro payloads and formatting masks
remain strings. These citations do not qualify other I/O overloads or execute
the described keyboard operations.

The window/input/screen continuation cites §§5.7, 5.8 and 6.1–6.3, bringing the
inventory to 262 chapter entries. Screen's separate command and function headings
are retained with a common neutral lexical scope. X Mouse, Y Mouse and Laced
are labelled reserved variables; Read Text$ is labelled an instruction. The
manual labels Spack, Pack and Unpack as picture-compactor extension commands;
the inventory preserves that component evidence without inferring availability.
All entry lines/pages and both held-extract hashes were crosschecked.

The bank/drawing/menu continuation cites §§5.9, 6.4 and 6.5: 87 further BASIC
entries, for 349 total, and 14 separately recorded embedded menu commands.
Colour has separate function and instruction descriptions. Menu$ is labelled a
reserved variable for simple definitions and an instruction for advanced item
assignments; both records retain a reserved-variable lexical scope. The menu
chapter specifies two-character embedded prefixes inside strings. Recording these
does not add standalone BASIC instructions or interpret string contents. The
bank chapter's contradictory upper bank numbers are not turned into validation.
All 363 recorded line/page bindings match the hash-pinned extract.

The object continuation cites §§7.1–7.3: 53 further entries, for 402 BASIC
chapter entries in total. It includes the Get Object Palette alias explicitly
named in §7.1, all update variants, coordinate conversions and reversal functions.
All 416 BASIC/embedded line/page bindings match the held extract. The held
Get Bob signature and Hrev flag example contain discrepancies with nearby prose;
they are recorded in the inventory README without becoming semantic rules.
Lexical coverage does not establish image-flag values or rendered behaviour.

The collision/IFF continuation cites §§7.4–7.5: 26 further entries, for 428 BASIC
chapter entries plus the 14 separate embedded menu records. All 442 recorded
line/page bindings match the held extract. It follows the function headings for
collision and frame queries, and instruction headings for Iff Anim and Mask Iff.
Conflicting nearby prose labels and apparent `Bobsprite 001`/`Form Param` example
transcriptions are recorded without inventing overloads or aliases. These
citations do not implement IFF decoding or qualify AMAL, collision accuracy or
original animation timing.

Professional §7.6 supplies 24 BASIC-facing AMAL/STOS controls, for 452 BASIC
entries. A separate AMAL inventory retains 16 commands/structures, 15 functions
and five register/family records. Its capital-significant codes are not treated as
case-insensitive BASIC. The RA–RI heading conflicts with the following 26-register
A–Z prose; both are retained. The Movon heading/prose differ from its printed
Move On signature; no new expression overload is inferred. All 502 BASIC/menu/
AMAL line/page bindings match the held extract.

AMOS 3D's separately held guide and quick card have their own SHA-256 bindings
and six exact evidence records. They identify optional installation and a stated
AMOS 1.3 minimum, not compatibility qualification for every later release. The
guide's ANGLE REL prose conflicts with its ANGEL REL signature and quick card;
accepted spellings require further primary evidence. The source catalogue's 1991
bibliographic date is retained with its title-page caveat. No 3D grammar or runtime
support follows from collecting these sources.

[Opening sources](../corpus/opening/README.md) retain their upstream MIT licence
and immutable provenance. [New native probes](../corpus/probes/README.md) record
exact input hashes, screenshots and a pinned runtime profile. Host parser tests
include additional generated and malformed inputs; these are not native trials.

TextMate follows the documented
[VS Code grammar interface](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide).
Shiki's [custom-language interface](https://shiki.style/guide/load-lang) consumes
that grammar. The VS Code extension owns no second copy of the language rules:
its packaged grammar is generated from, and checked against, the canonical file.

The expanded AMOS 3D inventory crosschecks 59 records against the guide's
programming chapter and every one of the quick card's 46 command/function cells.
All 213 stored line/page citation occurrences (including the six scope evidence
records) and both held-source hashes match. These counts include repeated
citations, not independent observations. The card's Background continuation and
cached-result rows are retained. Four uncertainties are explicit in the extension's
questions file; agreement between retypeset documents is not runtime qualification.
Movement/rotation string records preserve the guide's STOS/redraw context without
inferring full AMAL support.

AMOS 3D source conclusions cite AOZ-Studio's original AMOS Professional release,
commit `533b4b1f5acd604814513f78e02c7b4796cb0531`, files `AMOSPro Sources/+3d.s`
and `+Verif.s`. Both full-file SHA-256 and Git blob bindings and all 17 excerpt
ranges were checked. Their MIT notice is retained alongside the excerpts.
The wrapper's own label is Issue 1.02(AP200); its token table, dispatch routines
and verifier support three revision-scoped answers. A scan of the pinned token
table finds ANGLE REL and no ANGEL REL. Collision return semantics lie beyond
the wrapper in c3d.lib. Its separately pinned Git blob and SHA-256, relocation
chain and exact code excerpts are retained in
[collision-binary.json](../specifications/extensions/amos-3d/collision-binary.json).
Static analysis shows an object index or -1 in single-object mode. No binary or
original-runtime equivalence is inferred from source inspection.


The optional 3D lexical profile uses those 59 guide/card records and the pinned
source conclusions for role and spelling. Its canonical fragment is
`syntaxes/extensions/amos-3d.json`; explicit composition embeds the unchanged
BASIC rules into a self-contained grammar for both package and editor consumers.
The mixed `highlighting.amos.txt` fixture is newly authored under this repository's
licence and is a lexical test, not a runnable demonstration with installed models.


The file/directory continuation cites Professional §10.2, pp.10.02.02–16, in the
same hash-pinned retypeset extract. All 38 entry lines and their following printed
page footers were checked against the held text. Directory/W and Ldir/W headings,
the ? # abbreviation and As field connective are included explicitly. Dir$'s
read/write signatures support its variable scope despite the function heading.
The Command Lines$ signature (line 18486), FIELD$ prose (18775), and Line Input #
function wording (18675) remain discrepancies; the heading/example spellings and
statement roles drive this lexical inventory. No native semantics follow from
those documentary choices. The independent file-io fixture is newly authored
under this repository's licence and was not executed as an AMOS program.


Standalone AMAL lexical rules cite eight exact ranges in the same hash-pinned
Professional manual extract. They cover significant capitals/padding, labels,
separators, expressions, registers, Autotest and the extended If action signatures
on 07.06.17. All range text and following page footers were checked against the
held extract. This does not qualify a compiled program or individual release.
The 36 documentary records remain separate from BASIC's chapter entries;
the new standalone fixture is authored here and is not a native execution claim.


Music/basic sound coverage cites Professional §8.1, pp.08.01.01–10, in the same
hash-pinned extract. All 21 entry lines and following printed-page footers were
checked, along with five playback definition citations on pp.08.03.01–02.
The repeated MVOLUME speed wording at line 14729 is retained; the Tempo example
at 14743 and definition at 15167 identify the speed command. The voice-table
2,4 wording at 14431 is retained without deriving channel semantics. The fresh
music fixture is authored here as a lexical input and was not executed natively.


Sample coverage cites ten headings in Professional §8.2, pp.08.02.01–06, in the
same hash-pinned held extract. Each exact heading line and following page footer
was checked against the held text. Sam Swapped is labelled a function, distinct
from Sam Swap. The latter's signature and 08.02.07 listing use To, while its
08.02.06 example uses a comma after the voice mask. The looping prose's SAMRAW
reference is retained as a discrepancy; the heading/signature give Sam Raw.
The newly authored samples fixture follows the signatures and is a lexical
input, without native sample playback, streaming or filesystem execution.


Music-module coverage cites all 15 named headings in Professional §8.3,
pp.08.03.01–04, in the same pinned extract. Each heading and following page footer
was checked. Five AMOS music entries overlap §8.1's cross-references. Track Load's
signature includes a bank while its looping example omits one; no loading default
is inferred. MED prose prints MMDO beside MMD1; this is retained as source wording,
not format qualification. The independent music-modules fixture is authored here
and was not executed with a tracker module, MED library or MIDI device.


Speech coverage cites seven named headings in Professional §11.2, pp.11.02.01–03,
in the same pinned extract. Every heading line and following printed-page footer
was checked. The manual labels Mouth Read a function, allows omitted Set Talk
parameters with commas preserved and gives Say an optional mode. The chapter's
narrator and multitasking context is retained without qualifying installation,
editions or output. The independent speech fixture is authored here and was not
executed with the narrator device or used to measure mouth animation.


The 15 §7.7 icon/block headings and printed pages (07.07.01–05) were checked
against the pinned extract. The Paste Icon section illustrates Get/Put Block;
its heading/signature supply the icon spelling. Fresh icon/block examples are
lexical inputs and do not establish native rendering, masks or alignment.


The 13 font entries cite §11.1, pp.11.01.01–04, with exact headings/page bindings
checked against the pinned extract. Xgraphic/Ygraphic headings and conversion
prose identify the functions; signatures at 20110–11 incorrectly repeat Xtext/
Ytext. The discrepancy is retained without inventing conversion rules. Assign
overlaps §10.2. The fresh font listing does not establish native font results.


The §12.2 inventory has nine named headings plus the explicitly shown On Error
Goto and Resume Next forms, for 11 entries on pp.12.02.01–04. Exact heading/
signature lines and page bindings match the pinned extract. Resume Label's setup/
handler wording and the RESUMEL ABEL typo are retained without deriving recovery
placement rules. Fresh error examples are lexical inputs, not executed handlers
or evidence of message availability in compiled programs.


The 12 §10.3 printer/port entries cite exact headings and printed pages
10.03.01–07 in the pinned extract. The FRACCOLS $FFFF/$FFF wording and the
Open Port loop's ten-line description versus 0 To 10 are retained without
inferring semantics. Embedded printer controls and dump labels are distinct
from BASIC forms. The fresh printer fixture is a lexical input, not hardware,
device-driver, pointer or output evidence.


Serial uses 18 exact §10.4 heading/page citations and the pinned official
extensions/+IO_Ports.s revision recorded in specifications/extensions/io/
original-source.json. Raw Git blob and SHA-256 were verified; retained complete
token-table and narrow component/dispatch excerpts are hash-bound with the MIT
licence. Serial Buf is a token; Serial Buffer is absent. The same source groups
serial/printer/parallel. Serial Base takes a channel there, unlike the manual
signature. No native arity, handshake, driver or release qualification follows.


Parallel uses ten exact §10.5 heading/page citations and the retained original
I/O token table. Both Input$ signatures are visible in the source; the manual's
PARALLEL INPUTS prose does not establish an alias. Pinned source places parallel
in the same I/O component as serial/printer. That evidence does not qualify
native device traffic, buffer/pointer behavior, timeouts or installed releases.
