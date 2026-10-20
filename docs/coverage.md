# Coverage and result meanings

The released 0.1.0 kit is an opening-program subset, not complete AMOS support.
The table describes current source; expanded game highlighting is unreleased.
Published npm 0.1.0 and editor 0.1.1 retain their original grammar.

| Surface | Implemented |
| --- | --- |
| Parser | Cls with no argument or an unsigned decimal literal; Print with exactly one double-quoted literal; Wait Key; End. |
| Source | Original UTF-8 text, all tokens/trivia, half-open byte ranges, typed statement nodes; recovery at line/colon boundaries. |
| Lexical rules | Case-insensitive commands, spaces/tabs, blank lines, colon separators, double-quoted strings without backslash escapes, line-start apostrophe comments and statement-start Rem comments. |
| Highlighting | Professional forms from §§5.1–5.9, 6.1–6.5, 7.1–7.6 and 10.1, plus Bank or Risk display/sound vocabulary; standalone labels and declaration names, selected numeric notation, names, strings and comments. Partial vocabulary, not version validation. |
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
game milestone still passes. Published packages and the private Marketplace
preview retain their earlier grammar; this source expansion is unreleased.

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
The ANGLE REL/ANGEL REL discrepancy remains unresolved; no Td vocabulary or
release compatibility is qualified. Published packages, parser scope and private
Marketplace availability are unchanged.
