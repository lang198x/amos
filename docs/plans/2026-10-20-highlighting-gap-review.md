# Review the remaining highlighting gaps

Approved after speech coverage. This task audits and prioritises; it does not
commission the next grammar implementation or a release.

1. Compare specifications/manual-core/source.json with the pinned Professional
   manual contents and remaining language sections, including appendices.
   Classify missing BASIC chapters separately from embedded Interface, tools,
   reference data and lexical/release qualification gaps.
2. Read the next likely bounded sections (§7.7, §11.1 and §12.2). Record cited
   representative forms and probe current scopes in both profiles and themes.
   Do not treat automatic heading extraction as a complete command inventory.
3. Write docs/highlighting-gaps.md with the audit baseline, remaining chapter
   routes, limits and recommended sequence. Link it from coverage and the README.
   Check links, source citations/counts and unchanged grammar; commit/push and
   read CI. Keep any diagnostic listing in memory; no dependency or temp build.

Outcome: docs/highlighting-gaps.md records the 543-entry/26-chapter baseline,
16 representative full-scope failures across both profiles/themes and the passing
precision control. It maps remaining chapters/appendices and proposes §7.7,
§11.1 and §12.2 next. All 16 exact citations, following page bindings, font
signature discrepancy and local links were checked; 22 package/inventory tests
pass. Grammar, parser, tests, inventories and package configuration are unchanged.
No temporary workspace or background process was created for the audit.
