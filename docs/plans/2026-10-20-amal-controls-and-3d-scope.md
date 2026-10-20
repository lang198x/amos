# AMAL controls, embedded inventory and AMOS 3D scope

The user approved AMAL's BASIC controls first, a separate embedded-language
inventory, and consideration of AMOS 3D. Continue the manual-led approach without
adding dependencies, parser behaviour, public releases or runtime qualification.

1. Inventory Professional §7.6 BASIC-facing controls in manual-core/07-06.json,
   including STOS-compatible animation controls and Amreg's reserved-variable role.
   Record AMAL commands, functions and register families in a separate small
   `specifications/amal/` inventory with source-line/page bindings. Preserve capital
   letter significance and discrepancies; keep BASIC strings opaque.
2. Read the held AMOS 3D guide/quick card. Add source-bound extension evidence
   under `specifications/extensions/amos-3d/`: installation and version statements,
   command-family scope and spelling discrepancies. Define a bounded follow-on
   inventory/profile qualification milestone; do not silently merge Td words into
   core or infer Creator/Professional compatibility from a minimum-version claim.
3. Measure current lexical gaps, extend existing metadata/checklist tests and
   canonical TextMate rules, preserving earlier counts and full-game expectations.
   Match Amal/Anim/Move/Synchro variants and Update Every before shorter forms.
   Channel target vocabulary includes Screen Size in its documented context.
4. Add a mixed BASIC listing and focused AMAL boundary tests: strings remain
   strings, BASIC keywords stay case-insensitive, embedded-only vocabulary stays
   out of BASIC, Amreg assignments/reads and callback/status forms retain scopes.
   Disable one new rule to prove failure, restore, then run both existing consumers.
5. Verify all citations/hashes, package checks/editor sync, actual npm/VSIX contents
   and an extracted npm consumer. Update docs, commit/push, read CI output and
   remove disposable packages/cache files.

A standalone AMAL grammar and automatic highlighting within strings need a later
agreed design: capital-letter tokenisation, labels/registers, Autotest, construction
of strings across expressions, and consumer/editor registration are distinct from
BASIC. AMOS 3D is a separate optional extension; its native availability, runtime
behaviour, releases and tokenised persistence remain unqualified.

Outcome: 24 BASIC controls (none previously passing), 36 separate AMAL records
and six AMOS 3D evidence records. All 502 BASIC/menu/AMAL citations, six extension
bindings and four source hashes match. Disabling Amreg produces the expected
precise failure before restoration. Embedded grammars/profile selection remain
proposals; AMOS 3D has a concrete source-bound follow-on scope.
Sixty-nine integrations pass in each existing consumer and eight package checks
pass. Actual npm/VSIX contents preserve grammar/icon bytes without public flags;
the extracted npm registration preserves the listing and five critical scopes.
