# Manual vocabulary reconciliation

Professional §11.3 introduces no new named BASIC definitions. Its one content
page, 11.03.01 (extract lines 20329–20377), discusses floating-point libraries and
number formats, then refers back to §5.3 at lines 20367–68. Page 11.03.02 is blank.
This review uses the SHA-256-pinned extract in the [source record](../specifications/manual-core/source.json).

The Sin/Cos/Sqr prose references at lines 20339–40 map to existing §5.3 functions:
Sin at line 4222, Cos at 4236 and Sqr at 4122. Their existing scope coverage is
checked beside Set Double Precision (line 4112); that command is defined in §5.3,
not newly defined in §11.3. No duplicate entries or extra chapter count follow.
Single Precision and Double Precision are format labels at lines 20358/20363.
They supply no standalone command or alias. Library filenames and historical
accuracy/range/performance claims are documentary context, not newly qualified
runtime facts. This slice makes no numeric-notation or parser change.

Professional §12.1, pp.12.01.01–06 (lines 21015–21271), defines Monitor at line
21029. The prose at 21033–35 explicitly allows Direct Mode or program listings.
The remaining chapter describes the monitor UI: INIT, stepping, run modes, break
points, VAL, help and quit controls. Their button labels, keyboard shortcuts and
descriptive headings are not additional BASIC definitions. Existing Load, Print,
Wait, Default, Flash and Fade mentions remain references to their earlier forms.

§12.3, pp.12.03.01–22 (lines 21473–22628), now has a full
[page-by-page vocabulary review](error-catalogue-review.md). Covered BASIC
references, an original 17-gap baseline, spelling discrepancies, editor UI and
embedded languages are routed separately. Five §13.1 gaps, Kill Editor and three Interface-facing BASIC
gaps, four Appendix A memory forms and four Copper forms are covered from their
definitions. All 17 original gaps now have definition-led lexical coverage. No catalogue wording becomes a new alias or
inventory entry. Error-code behavior and historical advice remain unqualified.

Highlighting checks prove lexical scopes and source preservation. They do not
execute the monitor, test debugger UI, qualify floating-point results, resolve
expressions or establish original-runtime acceptance.


## Appendix C display modes

Appendix C spans pp.14.C.01–06, extract lines 26104–26331; the final page is
blank. Its only new named BASIC headings are Display Height (26145, 14.C.01)
and Ntsc (26219, 14.C.03). Both are functions. They now have explicit records
in 14-C.json and complete lexical scopes, bringing BASIC to 728 entries across
44 partial/full chapter/appendix sections. The same source record/hash applies.

| Appendix C context | Existing definition | Disposition |
| --- | --- | --- |
| Screen Open with Display Height and Lowres, 26159; Screen Open/Display, 26246–47 | Screen Open 7574; Lowres 7609; Screen Display 7709 (§6.1) | Retain existing roles; query expressions and omitted Screen Display arguments receive lexical checks. |
| Global variables, 26241 | Global 5388 (§5.5) | Existing command; no duplicate entry. |
| For/To/Wait Vbl/Next, 26167–69 | Existing §§5.4/6.2 forms; Wait Vbl 8425 | Test scopes without asserting loop duration or refresh cadence. |
| If/End If and Print/End, 26228–32; branching, 26243–45 | Existing §§5.1/5.4 forms | Existing control and output vocabulary; Ntsc remains a function in conditions. |
| PAL/NTSC/SECAM territory lists, 26286–26319 | Television-standard labels; NTSC also has its separate BASIC definition above | No PAL/SECAM command, regional alias or geography-derived profile. |

Display heights, safe margins, rates, audio/AMAL speed and the A3000 front-screen
account are historical manual claims. They do not establish native results,
compatibility rules, recommended timing algorithms or model/edition profiles.
Neither the manual's loop example nor the fresh lexical notebook is executed.


## Appendices D/E: extensions and bank structures

Appendix D occupies 26332–26387, pp.14.D.01–02; its second page is blank.
Appendix E occupies 26388–27264, pp.14.E.01–18; its final page is blank. This
review uses the same hash-pinned extract. Neither appendix adds a new named
BASIC definition. The inventory remains 728 entries across 44 sections.

Appendix D's explicit example is Bell: 26354–56 identifies it as part of the
Music extension and describes that component as containing music, sound and
sample commands. Bell's existing §8.1 heading (14323) now retains that manual
component label. Appendix E repeats the separate Music-system description at
26764–67 (14.E.08). This records what the manual says; it neither proves a
particular installed binary nor assigns every sound/module command to a source
module. A source-level family ownership map remains separate work.

Set Editor Setup (26341–44) is a Configuration Menu action. Compiler and AMOS-3D
mentions at 26358–60 identify products, without adding syntax, installation
qualification or edition profiles. The existing optional AMOS 3D decision and
I/O/Requester/picture-compactor provenance remain unchanged.

| Appendix E material | Lines/pages | Disposition |
| --- | --- | --- |
| Linked bank headers, names, flags and Work/Data memory layouts | 26388–26594; 14.E.01–04 | Memory-layout reference. Names such as Music, Amal and Resource are bank identifiers in this context, not new BASIC aliases. Start/Length and Bank Swap refer to §5.9 definitions. |
| Work/Data disk headers and grouped banks; Object/Icon memory and disk layout | 26595–26743; 14.E.05–07 | Keep memory pointers separate from disk structures. LOAD/SAVE and BLOAD/BSAVE mentions refer to §5.9, with no codec implemented or format advice promoted to runtime validation. |
| Music bank sections, note/effect labels and disk storage | 26744–27020; 14.E.08–13 | Binary music data and implementation-component context. SET_VOLUME, LED_ON and other labels are bank-data tags, not additional BASIC or AMAL commands. |
| Sample banks and AMAL banks | 27021–27120; 14.E.13–15 | Sample layout, recorded movements and stored AMAL strings remain distinct from BASIC source. Existing standalone AMAL highlighting does not decode banks or activate inside strings. |
| Resource bank images, messages and Interface programs | 27122–27196; 14.E.15–16 | Embedded Interface text and image metadata remain reference material; BASIC string payloads stay opaque. |
| Pic.Pac packed bitmap/screen headers | 27197–27264; 14.E.16–18 | Pack/Spack references map to §6.2. Header fields and compression prose add no BASIC syntax or codec implementation. |

The bank references map to existing §5.9 entries: Reserve As Data/Work
(7013/7022), Save/Load (7078/7131), Bsave/Bload (7168/7183), Erase All/Temp
(7230/7257), Bank Swap (7291), Length (7348) and Start (7370). References to
Fill/Copy, Ins Bob, No Mask, Hot Spot, Hrev/Vrev/Rev and screen forms likewise
retain their earlier meanings; no duplicated inventory records follow.

Version and source questions remain explicit. The fifteen-address original-AMOS
bank description at 26424–27 contrasts with the Professional linked-list account;
it is not a validated edition model. The manual attributes Bob flipping to AMOS
V1.21 at 26703–06, but that historical statement does not qualify every release.
The held Icon disk marker reads Amlc at 26725; no byte-level spelling is resolved
here. The seven-bit movement passage at 27091–93 prints a -128 to +128 range;
no numeric bounds are inferred. Layouts, masks, persistence, relocation, music
labels and timing all need independent source/runtime evidence before use in a
codec or semantic implementation.

Lang198x owns source-language analysis and highlighting. Native format codecs
belong to Format198x, and media construction belongs to Build198x. This review
creates no codec, media, parser, extension loader or new lexical mode.


## Appendix G command index

The complete [command-index review](command-index-review.md) retains all 818 rows
from 27469–28484 (14.G.01–20). It resolves 702 BASIC references, 33 AMAL references
and 14 embedded Menu references against existing inventories, keeping 69 Interface
rows separate. Thirty rows carry source spelling/role/locator/formatting or
surface findings. Generic Exit/Wait rows target AMAL Autotest; On … Proc is a
composite of existing tokens. No new aliases, inventory entries, grammar or
parser behavior follows. BASIC stays 728 across 44 sections. Appendix G is a
locator, not independent syntax, native or edition evidence.
