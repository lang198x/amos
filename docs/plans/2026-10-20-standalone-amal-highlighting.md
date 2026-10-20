# Standalone AMAL highlighting

Status: approved; implement the discussed standalone grammar scope. The next milestone
follows the approved file/directory continuation; it does not commission a parser.

## Approved boundary

Add an explicit `amal` registration at `@lang198x/amos/amal`, a self-contained
TextMate grammar, and an AMAL language mode in the existing declarative VS Code
extension. No automatic interpretation of BASIC string contents, new dependency,
release version, publication, LSP, AST or runtime is included.

Use the existing 36 inventory records (16 commands/structures, 15 functions and
five register/family records) with a small separately cited lexical record for
significant capitals, label syntax, operators and separators. The Professional
manual is the documentary profile; it does not qualify all releases.

Recognise evidenced command spellings and compact command/function codes with
significant capitals. Lowercase padding is ignored, rather than treating AMAL
as case-insensitive BASIC. Retain the original source text; do not rewrite it.
Use lexical contexts for registers/expressions, command positions and Jump/Direct
label targets. A label definition has one significant capital and a colon;
Target: and T: therefore share the documented identity, but no label resolution
or duplicate-label diagnostic is implemented. A/X register and instruction roles
need explicit tests. Where context/evidence is insufficient, leave a neutral
scope rather than claiming validity or inventing an accepted form.

Treat Autotest parentheses, expression grouping, numbers, operators and separators
as AMAL syntax. Do not inherit BASIC Rem, apostrophe-comment or colon-separator
rules. Do not invent a string/comment syntax. Manual contradictions remain
recorded; no numeric ranges, timing, collision result or execution is validated.

## Alternatives

- Highlight literal AMAL strings inside BASIC first. This is convenient for short
  examples but requires reliable host-call context, and cannot recover programs
  assembled from variables/expressions. Defer until standalone grammar is sound.
- Build a canonical AMAL lexer/AST first. It could support analysis later but is
  a broader language-service milestone than the current highlighting need.

## Implementation and verification

1. Add `specifications/amal/lexical.json` with exact source citations from the
   existing hash-pinned extract and an independently authored mixed listing.
   Keep the register-heading discrepancy and suspicious numeric prose explicit.
2. Add `syntaxes/amal.tmLanguage.json`, `amal.mjs`, `amal.d.ts`; extend additive
   exports/files, editor manifest, sync checks and standard-library VSIX packaging.
   Keep existing AMOS/AMOS 3D exports, associations and opaque strings unchanged.
3. Add focused package and highlighting tests for every inventory member, full
   spellings/codes, lowercase padding, wrong-capital variants, A/X roles, label
   definitions/targets, Autotest/grouping and compact source boundaries. Use
   scope/range explanations to distinguish significant tokens from mere colour.
   Explicitly test uncertainty rather than silently accepting extra aliases.
4. Run all existing regressions and the new checks in both installed consumers
   and light/dark themes. Prove the checks fail when a required rule is removed.
   Inspect built npm/VSIX contents and extracted-package rendering. Update docs,
   commit/push, inspect CI and clean `/private/tmp/lang198x-amal/` if created.

Marketplace stays private. Published 0.2.0 archives and Rust parser remain unchanged.


Outcome: implemented additive standalone registration/JSON/editor mode with no
BASIC grammar changes. All 36 inventory records, 39 register members, source
lexical citations and Autotest If actions are checked. Twenty-two package checks
and 88 integrations per existing consumer pass; removing VU fails the intended
inventory check. Actual packages contain all three exact grammars; extracted
rendering and strict declarations pass. Ambiguous separatorless A/X transitions
remain neutral, as scoped. No parser, release/version or Marketplace changes.
