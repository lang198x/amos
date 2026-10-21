# Command-index reconciliation

All 818 rows of the Professional User Guide's 20-page Appendix G have been
reconciled. The audit finds no new indivisible BASIC vocabulary to add. It
retains spelling, role, locator and language-boundary conflicts instead of
turning index wording into aliases. BASIC remains 728 entries across 44 sections;
the parser and grammars are unchanged.

The pinned extract and SHA-256 are identified in the BASIC source record.
Appendix G occupies lines 27469–28484, pp.14.G.01–20; Appendix H starts at
28485. The audit baseline is `6091e09`. Repository data under
`specifications/command-index/` retains every row's line, index page, printed
role/target, resolved surface, inventory references and finding codes. Each page
is a separate file. Descriptive synopses are not treated as definitions.

| Resolved surface | Rows | Result |
| --- | ---: | --- |
| BASIC | 702 | Existing inventory references, including one composite On … Proc context. |
| AMAL | 33 | 31 explicitly labelled rows plus two generic labels resolved by Autotest definitions. |
| Embedded Menu | 14 | Existing documentary inventory; BASIC string payloads remain opaque. |
| Interface | 69 | Retained as a separate definition-led inventory route; no lexical mode or BASIC alias is added. |
| Total | 818 | All rows accounted for; counts are index rows, not unique words or a coverage percentage. |

## Conflicts retained

Thirty rows carry findings. Counts by finding overlap: 11 spelling, one
capitalisation, four role, 11 locator, two surface-label, one composite, one
missing-colon and one target-decoration finding.

| Index wording/line | Definition evidence and disposition |
| --- | --- |
| AM REG, 27501 | AMREG heading and read/assignment signatures at 13648–53. Retain Amreg; no spaced alias. |
| INPUT#, LINE INPUT#, PRINT#, 27853/27912/28099 | Existing Input #/Line Input #/Print # at 18655/18671/18640. Record index spacing; acceptance of compact source is a separate lexical/native question. |
| X/Y CURS, 28430/28447 | XCURS/YCURS headings at 5981/5985. No spaced aliases. |
| X/Y GRAPHIC and X/Y TEXT, 28431/28448/28437/28462 | Joined headings at 20107/20108/20096/20097. Existing signature discrepancy stays recorded in §11.1; the index does not resolve semantics. |
| ELipse, 27718; Ink, 27848 | ELLIPSE/ELlipse at 10204–06 and INK/INk at 10124–26. Preserve index spelling/capitalisation differences; significant Menu prefixes are not redefined. |
| DIR$ reserved variable, 27698 | Definition at 18272–75 calls it a function and shows reads/assignment. Existing inventory kind remains function with variable-language lexical scope. |
| LACED function, 27893 | Reserved-variable heading at 8169–73 governs the existing role. |
| LIB CLOSE System Function, 27905 | Instruction heading and statement signatures at 20623–26 govern command scope. System is a role qualifier, not part of the spelling. |
| RAIN reserved variable, 28126 | Function heading and assignment signature at 8792–94 govern existing function scope. |
| EXIT Structure and WAIT Instruction, 27749/28413, both targeting 7.6.16 | Autotest context at 13544–52 identifies AMAL eXit/Wait. These rows reference the existing AMAL definitions; they do not qualify BASIC Exit/Wait or add an alias. |
| ON PROC, 28026 | Heading ON … PROC at 5235 and signature On variable value Proc NAME at 5237. Existing On/Proc tokens cover the composite; no contiguous On Proc keyword is introduced. |
| If AMAL Structure without a colon, 27842 | Row is retained explicitly rather than skipped by the parser. |
| PI# target `PI 5.3.07`, 28070 | Retain printed target decoration and the separately parsed locator; no extra spelling. |

## Locator differences

These findings compare the index target with existing inventory citations. A
difference can identify another discussion context, not necessarily a bad link.
No inventory page is overwritten from an index lookup.

| Index row/target | Existing definition or context |
| --- | --- |
| Arexx Close 27522 → 10.6.02; Arexx Exist 27523 → 0.6.02 | Headings 19796/19805, both 10.06.03. The printed zero-section locator is retained. |
| Arexx$ 27525 → 10.6.03 | Heading 19860, 10.06.04. |
| As 27528 → 5.9.02 | Reserve As bank context versus the existing Field connective at 18773, 10.02.14. No standalone overload is inferred. |
| Chip Free 27604 → 3.1.05 | Existing §5.9 prose/example at 7054–56, 05.09.03. The earlier Direct Mode example at 1373 is an alternate context, not an added definition. |
| Menu On 27966 → 6.5.05 | Heading 9477, 06.05.02. |
| Rem 28134 → 5.1.1 | Heading 3454, 05.01.10. Retain the printed locator. |
| Voice/Volume 28394/28395 → 8.3.03 | Headings 14403/14387, 08.01.03. |
| Exit/Wait 27749/28413 → 7.6.16 | Later AMAL Autotest restatements at 13544–52; initial existing AMAL definitions are on 07.06.06/07.06.07. |

## Reproduction and limits

Run `python3 scripts/audit-command-index.py --source /path/to/the/pinned-extract --check`.
Without `--check`, the command regenerates the per-page audit. It requires the
pinned hash, exact appendix boundaries, 20 nonempty ordered pages and 818 rows.
Unparsed rows, unexpected non-row text, unmapped non-Interface names and extra
JSON files fail the check. Case matching is a comparison aid, not permission to
change significant AMAL/Menu capitals or accept new BASIC spacing.

Package tests validate page continuity, unique ordered row lines, all inventory
references (including role), surface totals and exceptional routing. The complete
source replay additionally checks that no source row was omitted. Original
runtime acceptance, version/extension availability, Interface definitions and
public Marketplace readiness remain separate work. The index adds no syntax,
semantic analysis or native execution evidence.
