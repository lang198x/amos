# Manual-led core vocabulary

This inventory follows the **AMOS Professional User Guide**: 109 entries from
chapters 5.1–5.5 (basics, strings, maths, control and procedures), 48 from chapter
5.6 (text), 14 from chapter 10.1 (keyboard input), 17 from 5.7 (windows), 20 from
5.8 (joystick/mouse), 54 from 6.1–6.3 (screen setup/use/effects), 25 from 5.9
(memory banks), 27 from 6.4 (drawing) and 35 from 6.5 (menus). The 349 BASIC
entries include grouped headings, connective words, typed forms and the `?`
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
