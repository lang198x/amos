# Interface inventory and standalone highlighting

All 69 Interface references from the command index now map to definitions in
§§9.1–9.4. This is a separate language inventory: 46 commands, 22 functions and
one structure, using 68 distinct two-letter codes. BASIC remains 728 entries
across 44 sections. A standalone opt-in lexical mode now consumes these forms;
BASIC strings remain opaque. No original execution is qualified.

The source is the same hash-pinned 1992 Professional User Guide identified in
`specifications/interface/source.json`. Four chapter files preserve exact
headings, role lines, pages and all 70 signature lines across 64 definition
blocks. Grouped function definitions are expanded into separate records. Fresh
examples are command or expression fragments, often requiring an enclosing
routine or configured resource. They are not validated complete programs.

| Chapter | Extract span | Forms | Scope |
| --- | --- | ---: | --- |
| 9.1 | 15327–16043 | 15 | Variables, output, layout, buttons, events and keyboard shortcuts. |
| 9.2 | 16044–16554 | 35 | Geometry/text queries, graphics, control, user instructions, zones and machine-code calls. |
| 9.3 | 16555–17463 | 13 | Editing zones, sliders, arrays/lists, zone queries, HyperText and screen movement. |
| 9.4 | 17464–17706 | 6 | Resource messages, images, composite borders and resource offsets. |

The 19 BASIC host forms previously inventoried under 9.1/9.3/9.4 remain separate.
Their strings stay opaque. Resource data and HyperText active-zone markup are
also distinct from the Interface source language.

## Conflicts and missing context

| Evidence | Treatment |
| --- | --- |
| SW is a screen-width function at 16080–83 and SetWriting instruction at 16258–60. | Preserve both code/role records and use a neutral builtin scope for SW. A context-free keyword rule cannot express the distinction reliably. |
| The ScreenWidth heading supplies both SW and SH signatures. | Bind SH to its actual shared heading and signature; do not invent a ScreenHeight heading. |
| AR/AS are instructions in Appendix G (27510/27529), but functions at 17015–17/17032–34. | Follow the definition roles and retain both index conflicts in the separate mapping overlay. |
| General separators at 15418–20 versus the final BU bracket exception at 15847–49. | Preserve both. No universal rule to append semicolons is implemented. Some signatures omit terminators; their text is retained exactly. |
| Postfix arithmetic examples collapse number spacing and omit symbols in parts of the table (15513–83). Min/Max capitalisation is unclear beside the two-capital instruction rule. | Preserve the question; do not infer single-digit token splitting or new operator case rules. |
| AR's signature includes a comma between operands (17017), while general expressions are postfix. | Retain the signature and an illustrative comma-bearing fragment; no argument parser is qualified. |
| CAll/CA at 16525–27 versus `Call 0VA;` at 16536. | Preserve the case difference rather than accepting a new compact spelling from one example. |
| UI parameters P1–P9, ZV in draw/change contexts, zone callbacks and HyperText markup. | Record context evidence separately. No name resolution, parameter bounds, nesting validation, callback execution or payload injection follows. |

`index.json` maps every frozen Appendix G Interface row to one chapter/code/role
record. Its two role findings are AR and AS. The earlier audit remains a baseline
with deliberately empty Interface references; this overlay adds the later
definition evidence without rewriting that history.

`lexical.json` retains source ranges for capitals and lowercase padding, command
separators, quoted strings, binary/hex literals, postfix arithmetic, conditional
operators, bracket routines and the parameter family. Its nine arithmetic labels
and six conditional symbols are separate from the 69 named forms. They do not
constitute a lexer specification or compatibility profile.

## Standalone lexical mode

Current source exposes the canonical `syntaxes/interface.tmLanguage.json`, npm
`interface` subpath and explicitly selected `amos-interface` editor mode. No file
association or BASIC-string injection is added. All 69 records have scope tests
in dark-plus/light-plus, including lowercase padding and compact capital pairs.
AR/AS follow their function definitions, while SW is a neutral builtin in either
role. Unknown capital pairs remain unclassified, including user-defined names.
Lowercase text is ignored padding; a capital inside a note is still significant.

Single/double quoted strings are opaque and recover at the next line. Decimal
integers retain all adjacent digits; binary/hex literals, P1–P9, symbolic
operators and the explicitly printed NEg form receive lexical scopes. Min/Max,
Neg with one capital and Call remain neutral. Semicolons, colons, commas and
square brackets are punctuation; recognition does not validate their placement,
the BU final-bracket exception, postfix stack effects, number ranges, custom
names, parameter counts or callback/zone contexts. HyperText data stays quoted.
The independent notebook is illustrative, not a native-qualified program.

## Verification

Run `python3 scripts/check-interface-source.py --source /path/to/the/pinned-extract`.
The checker verifies the pinned hash, every heading/role/signature/page, all
source definition blocks and signature lines, and H/I's appendix boundaries.
Package checks validate exports, canonical/editor bytes, explicit mode selection,
inventory identities, complete index routing and preserved conflicts. Integration
checks exercise the lexical mode through the existing Shiki/HTML consumers;
see [verification](verification.md) for actual runs. No check executes Interface.
Published 0.2.0 and private Marketplace availability remain unchanged.
