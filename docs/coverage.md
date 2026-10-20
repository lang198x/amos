# Coverage and result meanings

The released 0.1.0 kit is an opening-program subset, not complete AMOS support.
The table describes current source; expanded game highlighting is unreleased.
Published npm 0.1.0 and editor 0.1.1 retain their original grammar.

| Surface | Implemented |
| --- | --- |
| Parser | Cls with no argument or an unsigned decimal literal; Print with exactly one double-quoted literal; Wait Key; End. |
| Source | Original UTF-8 text, all tokens/trivia, half-open byte ranges, typed statement nodes; recovery at line/colon boundaries. |
| Lexical rules | Case-insensitive commands, spaces/tabs, blank lines, colon separators, double-quoted strings without backslash escapes, line-start apostrophe comments and statement-start Rem comments. |
| Highlighting | Professional core forms from §§5.1–5.5, plus Bank or Risk display/sound/input vocabulary; standalone labels and declaration names, selected numeric notation, names, strings and comments. Partial vocabulary, not version validation. |
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
Creator/Easy qualification. Print/Input/text facilities defined in later chapters,
broader screen/object/file facilities, numeric notation, numeric/inline labels,
AMAL/Interface and extension vocabularies remain separate sweeps. The existing
game milestone still passes. Published packages and the private Marketplace
preview retain their earlier grammar; this source expansion is unreleased.
