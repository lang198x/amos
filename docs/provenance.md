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

[Opening sources](../corpus/opening/README.md) retain their upstream MIT licence
and immutable provenance. [New native probes](../corpus/probes/README.md) record
exact input hashes, screenshots and a pinned runtime profile. Host parser tests
include additional generated and malformed inputs; these are not native trials.

TextMate follows the documented
[VS Code grammar interface](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide).
Shiki's [custom-language interface](https://shiki.style/guide/load-lang) consumes
that grammar. The VS Code extension owns no second copy of the language rules:
its packaged grammar is generated from, and checked against, the canonical file.
