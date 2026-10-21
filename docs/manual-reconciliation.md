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
