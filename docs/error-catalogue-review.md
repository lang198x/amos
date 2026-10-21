# Error catalogue vocabulary review

The complete Professional §12.3 catalogue, pp.12.03.01–22 (extract lines
21473–22628), has been reviewed. It supplies references and spelling conflicts,
not additional instruction definitions. The review baseline was 665 entries
across 36 chapters at `5b7d6f2`; the review itself changed no grammar. Current source covers the five §13.1 follow-ups below,
bringing BASIC to 670 entries across 37 chapters, with twelve of the original
17 gaps remaining. Parser behavior is unchanged.

The [source record](../specifications/manual-core/source.json) identifies the
held extract and SHA-256. Line numbers count newlines, preserving formfeeds.
The next section starts with Accessories at line 22629. References below describe
vocabulary, not validation of error codes, recovery advice or runtime semantics.

## Page-by-page reconciliation

| Page | Extract lines | Vocabulary disposition |
| --- | --- | --- |
| 12.03.01 | 21473–21524 | Include is covered by §10.2. Kill Editor (21499) needs its Appendix B definition. DiscDoctor is an external utility; configuration menu items and filenames are not BASIC forms. |
| 12.03.02 | 21525–21576 | Prun is covered by §11.4. Ask/Call Editor and Set Editor (21527–31) need accessory review; Set Editor conflicts with the later Set Accessory heading. Goto mark, Undo/Redo and Procedure Open/Close describe editor actions. |
| 12.03.03 | 21577–21628 | Prun is covered. Close Workbench (21607–08) needs §13.1. Search/Replace, Set Text Buffer, Information and Insert Program are editor/menu actions here. |
| 12.03.04 | 21629–21679 | Prun is covered. Ask/Call Editor and Set Accessory (21634–35, 21658) need §13.1. Set Text Buffer and macro commands refer to the editor UI. |
| 12.03.05 | 21680–21734 | Insert Program, Delete Option, Set Key Short-cut, Set Program to Menu, Set Interpreter and Block On/Off are editor operations in this context. Print/Save block mentions describe editor selections, not new BASIC overloads. |
| 12.03.06 | 21735–21784 | Data, Do/Loop, If/Else, For/Next and Then map to §§5.1/5.4. ENDIF spelling differs from the inventoried End If heading. Extension-loading prose does not qualify extension releases. |
| 12.03.07 | 21785–21836 | For/Next, If/Then, Gosub/Goto, Loop/Do, Else If, Exit/Exit If map to §5.4. Include maps to §10.2. ENDIF is retained as a spelling discrepancy, not a new alias. HELP refers to editor help. |
| 12.03.08 | 21837–21888 | Set Buffer, Procedure/End Proc, Repeat/Until, Shared, For/Next and Trap already have §§5.1/5.4/5.5/12.2 records. No placement or maximum-span rule is implemented from these messages. |
| 12.03.09 | 21889–21939 | Until/Repeat, Shared, Run, Rem, Set Buffer, While/Wend and Error are covered. Deek/Leek/Doke/Loke (21936–37) need Appendix A definitions. Errornumber in the Error example is an argument placeholder. |
| 12.03.10 | 21940–21991 | AREXX forms map to §10.6; serial setup forms to §10.4. AMAL Play versus Amplay and LOAD I FF versus Load Iff need spelling care. Pause/Let/Autotest references belong to AMAL, not BASIC aliases. |
| 12.03.11 | 21992–22045 | Reserve variants, Get/Put Block, Bob, serial forms, Arexx and Lib Open are covered. SAMPLAY, SERIAL BUFFER and MED PLAYER wording is not promoted to aliases; see discrepancies below. |
| 12.03.12 | 22046–22100 | Load Iff, Resume, Dual Playfield, Dev Do/Send and Dir$ are covered. Cop Move/Cop Swap/Copper Off (22071–72) need Appendix F. Printer/parallel bare names identify device families here. |
| 12.03.13 | 22101–22151 | Printer/Parallel/Serial Open, Kill, Eof, Resume and End Proc are covered. DiscDoctor is an external utility; operating-system/disc advice is not language syntax. |
| 12.03.14 | 22152–22205 | Rename, Append, Load/Bload/Load Iff, Open In/Out, Get/Put, Flash and Get Fonts/Set Font are covered. Bare OPEN is a family reference; PROTECT is explicitly an AmigaDOS command. |
| 12.03.15 | 22206–22259 | Serial Speed/Get, Get/Put Block, For/Next, If/Then, Gosub/Goto and Screen Open are covered. SERIAL INPUTS conflicts with Serial Input$. Cop Move/Movel/Swap need Appendix F. AMAL Autotest/Move/Anim stay in their own language context. |
| 12.03.16 | 22260–22311 | Printer Dump, Screen Open, Def Fn/Fn, Window and Input # have records. WIND is generic wording. AMAL Direct/eXit stay separate. Edialog and Dialog Open/Run need §9.3 definitions. |
| 12.03.17 | 22312–22365 | Parallel and library forms, Goto/Gosub/Restore are covered. Dialog Open needs §9.3; LA/LAbel, JUmp/JS and VA belong to embedded Interface. AMAL Autotest/eXit/Direct are separate again. |
| 12.03.18 | 22366–22419 | Menu$/Menu On, On Error Proc/Resume, Restore/Data, Bgrab, Arexx Answer/Wait and zone forms have records. MAKE MENU BANK (22372) has no exact named heading in the held extract; do not equate it to Bank To Menu or invent an alias. AMAL For/Next remain AMAL. |
| 12.03.19 | 22420–22470 | Med Load, Data/Read/Restore, Gosub, Set Stack and Set Buffer have records. TRACKER LOAD conflicts with Track Load. Close/Kill Editor and Close Workbench need their definitions. Data-bank and file-format descriptions add no syntax. |
| 12.03.20 | 22471–22522 | Pop/Gosub/Pop Proc, Parallel/Printer/Dev Open, Parallel Input$/Send, Printer Send, Stop, Return, Set Rainbow and Resume are covered. Device-error guesses are not new factual qualifications. |
| 12.03.21 | 22523–22576 | Double Buffer, Dual Priority, Screen Open, Scroll/Set Scroll, Shift Up/Down, Sprite, Wind Close/Open and Border have records. Screen Anim limitations refer to AMAL behavior, not a new BASIC command. |
| 12.03.22 | 22577–22628 | Serial Get, Flash, Def Fn/Fn, Set Wave and Wind Open/Size have records. SERIAL INPUTS remains a discrepancy. Type-mismatch examples are deliberately erroneous inputs, not new type rules or runnable fixtures. |

## Definition-led follow-ups

These 17 referenced forms have named definitions elsewhere in the held manual
and lacked complete expected scopes at the review baseline. Five §13.1 forms
are now covered; the other twelve remain. Heading lines
below locate the definitions; remaining forms still need a bounded inventory
of their signatures and surrounding context before implementation.

| Route | Forms and definition-heading lines | Catalogue examples |
| --- | --- | --- |
| §13.1 accessories/configuration | Set Accessory 22672; Call Editor 22680; Ask Editor 22696; Close Workbench 22956; Close Editor 22974 | 21527–31, 21607–08, 21634–35, 22453–57 |
| Appendix B runtime | Kill Editor 26057 | 21499, 22453 |
| §9.3 Interface-facing BASIC | Dialog Open 16573; Dialog Run 16608; Edialog 16672 | 22285–95, 22335 |
| Appendix A memory access | Deek 25366; Doke 25373; Leek 25381; Loke 25396 | 21936–37 |
| Appendix F Copper | Copper Off 27304; Cop Move 27380; Cop Movel 27389; Cop Swap 27445 | 22071–72, 22233 |

§13.1's five forms are now covered from their own headings. Take Kill Editor
next with its Appendix B runtime boundary. Interface, memory access and Copper
remain their own existing routes.
Neither this ordering nor the gap probes commission native execution.

## Spelling and context discrepancies

| Catalogue wording; line | Existing heading/evidence | Treatment |
| --- | --- | --- |
| SET EDITOR; 21528 | Set Accessory; 22672. The catalogue itself uses SET ACCESSORY at 21635. | Preserve conflict; no Set Editor alias. |
| ENDIF; 21758–65 and later | End If; §5.4 line 4593 | Catalogue spelling does not settle original-editor compact-spacing behavior. No new compact alias. |
| Amal PLay; 21942 | Amplay; §7.6 line 13673 | Keep documentary wording separate from BASIC Amplay and embedded AMAL Play. |
| LOAD I FF; 21979, 22039 | Load Iff; §6.1 | No spaced I FF alias. |
| SAMPLAY; 21999 | Sam Play; §8.2 line 14773 | No compact alias from error prose. |
| SERIAL BUFFER; 22020 | Serial Buf; §10.4 line 19453 and pinned I/O source | Retain stronger existing spelling evidence; no Buffer alias. |
| SERIAL INPUTS; 22209, 22579 | Serial Input$; §10.4 line 19430 and pinned source | No Inputs alias. |
| MED PLAYER; 22023 | Med Play and other Med forms; §8.3 | Treat as descriptive family wording, not a named command. |
| WIND; 22275 | Window and Wind Open/Close/Move/Size; §5.7 | Bare family wording supplies no extra instruction. |
| MAKE MENU BANK; 22372 | No exact named heading found in the held extract | Unresolved; Bank To Menu is not silently substituted. |
| TRACKER LOAD; 22437 | Track Load; §8.3 line 15200 | No Tracker Load alias. |
| PARALLEL INPUT; 22338–39 | Parallel Input$; §10.5 line 19616; catalogue also uses Input$ at 22489 | Keep dollar-bearing authoritative form. |

Editor UI, AmigaDOS PROTECT, external DiscDoctor, embedded AMAL and embedded
Interface references remain distinct from BASIC. Code colour does not implement
catalogue error codes, enforce the stated limits or validate the historical advice.
Verification checked the pinned source hash, all 22 contiguous page ranges and
all 17 follow-up heading bindings. Probes in both BASIC profiles and both themes
checked 17 gaps (68 assertions), 30 covered forms (120 assertions) and ten
conflicting spellings (40 assertions). These are selected scope checks supporting
the page review, not a coverage percentage or an exhaustive alias-acceptance test.

The review is complete for routing the catalogue's vocabulary; it is not a native
error-behavior test or proof of whole-language coverage.
