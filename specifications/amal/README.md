# Embedded AMAL inventory

This is a documentary inventory of Professional User Guide §7.6: 16 commands and
structures, 15 functions, and five register/family records. The latter cover R0–R9,
RA–RZ and X/Y/A. It is separate from the BASIC controls in manual-core/07-06.json
and adds no AMAL grammar, parser or execution qualification.

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

A later AMAL grammar needs an agreed design for significant capitals, register
families, labels, Autotest and operators. Start with explicit standalone registration
and independent tests before considering highlighting within BASIC strings. Strings
may be assembled across assignments and expressions; lexical recognition cannot
recover every resulting program. Current BASIC strings remain opaque, including
Amal, Anim and Move payloads. A separate grammar is a proposal, not implemented scope.

AMOS 3D is a distinct optional extension; see the [AMOS 3D scope](../extensions/amos-3d/README.md).
