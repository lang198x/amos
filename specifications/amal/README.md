# AMAL inventory and standalone highlighting

This is a documentary inventory of Professional User Guide §7.6: 16 commands and
structures, 15 functions, and five register/family records. The latter cover R0–R9,
RA–RZ and X/Y/A. It is separate from the BASIC controls in manual-core/07-06.json
and drives a separate standalone lexical grammar. It adds no AMAL parser or
execution qualification.

Entries retain the spelling that shows significant capitals, the command/function
code, printed page, held-extract line and a fresh lexical example. Lower-case
letters are ignored by AMAL; upper-case letters are significant. Thus Move and
M reduce to M, PLay to PL, AUtotest to AU and eXit to X. Treating embedded AMAL as
case-insensitive BASIC would give misleading results: IF is not the If structure.
Labels use a significant capital plus a colon; other separators and expression
rules also differ from BASIC. The source hash is shared with the core inventory.

The external-register heading says RA to RI, while its following prose describes
26 registers, A to Z. Both are retained in the RA family record. Other suspect
register and range prose is not converted into executable rules. Examples may
require an Autotest, labels, objects or a prerecorded path; they are lexical inputs,
not standalone qualified programs.

The standalone grammar implements the recorded command/function codes, lowercase
padding, all 39 register members, one-capital labels/targets, decimal integer
text, listed operators, separators and grouping. [lexical.json](lexical.json)
retains eight exact primary-source excerpt ranges for these choices. Registers
and functions have expression scopes; A and X have instruction scopes in command
positions. The Autotest section's extended If signatures support Jump, Direct
and eXit actions; the X at the start of an expression remains a register.

For example, `IF` receives separate If/For lexical contexts rather than being
folded into `If`. `T:` and `Target:` have the same documented significant label
letter, but this grammar does not resolve references or detect duplicate labels.
The register table's RA–RI heading and the random-number range prose remain
uncertainties, not executable limits.

Use the explicit `amal` registration and AMAL editor mode. The grammar stays
separate from BASIC and its optional 3D profile; all BASIC strings remain opaque,
including Amal, Anim and Move payloads assembled from literals or variables.
No BASIC comment/string syntax is inherited. Native animation banks need separate
codecs; this mode accepts plain-text listings only.

This is bounded lexical coverage. It does not validate expression order, argument
counts, numeric ranges, loop/Autotest legality, timing or runtime versions. Use
semicolons or line boundaries to disambiguate instructions A/X after expressions:
separatorless transitions such as `M0,0,4A1,(1,4)` remain neutral at A. This does
not qualify every unused-character separator, padding placement, number format
or compact program. The independent `highlighting.amal.txt` fixture is newly
authored under this repository's licence and has not been run as native AMAL.
Current additions are unreleased; the published 0.2.0 packages remain unchanged.

AMOS 3D is a distinct optional extension; see the [AMOS 3D scope](../extensions/amos-3d/README.md).
