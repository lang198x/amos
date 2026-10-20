# Coverage and result meanings

The released 0.1.0 kit is an opening-program subset, not complete AMOS support.
The table describes current source; expanded game highlighting is unreleased.
Published npm 0.1.0 and editor 0.1.1 retain their original grammar.

| Surface | Implemented |
| --- | --- |
| Parser | Cls with no argument or an unsigned decimal literal; Print with exactly one double-quoted literal; Wait Key; End. |
| Source | Original UTF-8 text, all tokens/trivia, half-open byte ranges, typed statement nodes; recovery at line/colon boundaries. |
| Lexical rules | Case-insensitive commands, spaces/tabs, blank lines, colon separators, double-quoted strings without backslash escapes, line-start apostrophe comments and statement-start Rem comments. |
| Highlighting | Professional forms from §§5.1–5.9, 6.1–6.5 and 10.1, plus Bank or Risk display/sound vocabulary; standalone labels and declaration names, selected numeric notation, names, strings and comments. Partial vocabulary, not version validation. |
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
Creator/Easy qualification. Broader object/file facilities, numeric notation, numeric/inline labels,
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

Objects, general file I/O and broader extensions remain later work. No runtime, parser or edition qualification
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

Objects and animation, general file I/O, broader extensions and edition/release
qualification remain later work. Memory ranges, pointer safety, argument validity
and native bank/menu persistence are not established by highlighting. The parser,
published packages and private Marketplace availability are unchanged.
