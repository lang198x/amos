# Floating-point and monitor reconciliation

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
references, 17 definition-led gaps, spelling discrepancies, editor UI and embedded
languages are routed separately. No catalogue wording becomes a new alias or
inventory entry. Error-code behavior and historical advice remain unqualified.

Highlighting checks prove lexical scopes and source preservation. They do not
execute the monitor, test debugger UI, qualify floating-point results, resolve
expressions or establish original-runtime acceptance.
