# AMOS Professional Interface inventory

This separate documentary inventory has 69 named forms across §§9.1–9.4:
46 commands, 22 functions and one structure, with 68 distinct two-letter codes.
It supplies the separate opt-in Interface lexical mode; it adds no BASIC
vocabulary, parser or string injection.

source.json pins the manual and chapter spans. Each chapter file retains the
actual heading, role/signature lines, page, code and fresh illustrative fragment.
Fragments may require draw/change routines, user parameters or host resources;
no full-program or native acceptance is claimed. SW has two role records. SH
shares the ScreenWidth heading because that is what the source prints.

index.json is a definition-led overlay on all 69 frozen command-index Interface
rows, retaining the AR/AS role conflicts. lexical.json separately records
operators, separators, significant capitals, postfix conventions and context
questions; these do not expand the named-form count or define a lexer.

See [the review](../../docs/interface-inventory.md) for lexical coverage and
limits. highlighting.interface.txt is an independent illustrative notebook, not
a native-qualified complete program. Check exact primary bindings with scripts/check-interface-source.py
--source PATH. The external pinned extract is not downloaded by CI; package
checks validate the retained inventory and cross-references.
