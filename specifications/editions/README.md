# AMOS edition comparison: opening programs

This first comparison records seven forms in each of three primary manuals:
Creator (1990), Easy AMOS (1992) and Professional (1992). It establishes
documentary overlap and one wording difference. Separate native trials below
cover exact revisions and programs. Neither layer enables new CLI profiles.

| Form | Creator | Easy | Professional |
| --- | --- | --- | --- |
| Cls | Three forms; bare form says colour zero | Three forms; bare form says current paper | Three forms; bare form says current paper |
| Print | Item lists, separators and ? shortcut | Item lists, separators and ? shortcut | Item lists and separator effects |
| Wait Key | One keypress | One keypress | One keypress |
| End | Ends program; editor/direct-mode choices described | Same broad operation | Same broad operation |
| Assignment | Equals; string suffix | Equals; integer/real/string examples | Equals and typed examples |
| Inline If | One line; explicit Goto for label | If Then and glossary Else | One line; explicit Goto for label |
| Structured If | If / Else / End If; nested tests | Paired If / End If without Then | Paired If / End If without Then |

Each cell covers only the finding and source lines in
[creator.json](creator.json), [easy.json](easy.json) or
[professional.json](professional.json). It does not promise every form of a command.
The form names are our summaries, not source text to pass to a parser.
[sources.json](sources.json) records the hashes of all three source extracts
and known limits of each book. The
[book catalogue](https://amigasourcepres.gitlab.io/page/books/amos/) lists the
manuals. It does not prove that our Creator scan is the same copy.

## Cls: manuals and native trials

Creator's Cls definition (lines 7046–7061) says colour zero. Easy's glossary
(lines 13393–13399) and Professional's definition (7878–7897) say current paper.

Four controlled trials each in [Professional 2.00](../../corpus/editions/cls/README.md),
[Creator 1.1](../../corpus/editions/cls/creator/README.md) and
[Easy 1.01](../../corpus/editions/cls/easy/README.md) give the same result.
Bare Cls follows paper colour at two non-zero paper values. Explicit Cls 0
clears to black. The Creator 1.1 result contradicts its manual's wording.
We have not established why that wording differs or how other revisions behave.
These trials do not justify wider parser or compiler rules.

Easy's original installer produced its Programs, Examples and Tutorial disks.
A separate [Save/Load trial](../../corpus/editions/save-load/easy/README.md)
saved one 56-byte program, then loaded and ran it in a fresh editor.
An [independent FS-UAE Save](../../corpus/editions/save-load/easy/reference-save.md)
produced the same native program and bitmap bytes. This exposed a disk-checker
policy bug, fixed in Format198x 0.3.4; [delivery](../../docs/roadmap.md) tracks
its consumers. It does not qualify all native files or provide a Lang198x codec.

The Professional editor's Check 1.3 command (lines 2084–2092) looks for commands
absent from AMOS 1.3 and banks above index 16. It then chooses a file header.
This describes an intended boundary between versions. It does not list all
changed commands or prove that we can import a native file. Agreement on the
opening forms cannot qualify every Creator program for Professional.

## Perfect 10 block

The [bounded block trials](../../corpus/editions/perfect-ten/README.md) run the
exact maintained fragment in Creator 1.1, Easy 1.01 and Professional 2.00. All
three produce the expected values for equal and unequal totals. All reject a
missing assignment value and a missing End If. Their error wording differs.
The trials bind input, inspected captures and each environment. They do not
qualify other forms, import native files or add CLI profiles.

## Other versions and extensions

A book's year does not identify a software build. The three manual records
therefore leave software_revision unknown. The native trials each bind their
own software and setup. None covers all seven forms in the table.

We still need to compare the Pro v2.0 Interface Summary Rev 3, compiler manuals
and release notes. AMOS 3D has its own
[59-record inventory](../extensions/amos-3d/README.md).
Keep TOME, requesters and other extensions tied to their own versions.
A gap in our evidence means unknown, not unsupported.

The Creator scan has text and layout errors. The retypeset books also have
known errors in numbers and names. Check quotes, spacing, number ranges and
editor keys in the original software before adopting new analysis rules.
Do not turn suspect book examples into parser tests.

## Replay the source bindings

With the three exact extracts available, run:

```sh
python3 scripts/check-edition-sources.py --source-directory /path/to/manual-texts
```

The checker requires all three source hashes and all 21 fact ranges. It fails
if text changes or is absent, a form is repeated or missing, or an anchor does
not match. This checks the source links. It cannot prove that a summary is true
or that a command runs. The research records do not ship in npm or the VSIX.
