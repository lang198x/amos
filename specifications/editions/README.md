# AMOS edition comparison: opening programs

This first comparison records seven forms in each of three primary manuals:
Creator (1990), Easy AMOS (1992) and Professional (1992). It establishes
documentary overlap and one wording difference; it does not qualify software
revisions, execute programs or introduce edition-specific grammar profiles.

| Form | Creator | Easy | Professional |
| --- | --- | --- | --- |
| Cls | Three forms; bare form says colour zero | Three forms; bare form says current paper | Three forms; bare form says current paper |
| Print | Item lists, separators and ? shortcut | Item lists, separators and ? shortcut | Item lists and separator effects |
| Wait Key | One keypress | One keypress | One keypress |
| End | Ends program; editor/direct-mode choices described | Same broad operation | Same broad operation |
| Assignment | Equals; string suffix | Equals; integer/real/string examples | Equals and typed examples |
| Inline If | One line; explicit Goto for label | If Then and glossary Else | One line; explicit Goto for label |
| Structured If | If / Else / End If; nested tests | Paired If / End If without Then | Paired If / End If without Then |

Each cell is bounded by the explicit finding and extract line range in
[creator.json](creator.json), [easy.json](easy.json) or
[professional.json](professional.json). A cell does not promise every overload.
The normalized forms are newly written summaries, not verbatim tokenizer input.
The three full extract hashes and bibliographic cautions are in
[sources.json](sources.json). The preservation project's
[book catalogue](https://amigasourcepres.gitlab.io/page/books/amos/) independently
identifies the manuals; it does not prove our Creator scan matches its copy.

## Differences to investigate

Creator's Cls definition (lines 7046–7061) says colour zero. Easy's glossary
(lines 13393–13399) and Professional's definition (7878–7897) say current paper.
This is a manual-wording difference, not an established runtime difference. A
bounded trial should select a non-zero paper colour, clear without an argument,
and inspect the resulting colour under separately identified installations.
Do not change compiler/parser semantics from this observation alone.

Professional's editor section explicitly describes Check 1.3 (lines 2084–2092):
it searches for commands unavailable in AMOS 1.3 and banks above index 16, then
chooses a compatible file header. This establishes an intended compatibility
boundary, not the complete changed-command set or successful native import.
The opening-program agreement cannot qualify all Creator programs for Pro.

## Revisions and extensions remain separate

A manual copyright year does not identify the software build tested. All three
records therefore leave software_revision unqualified. The existing observed
Professional 2.00 runtime profile belongs to its own source/configuration
evidence, not to the entire Professional family. No Creator/Easy native trial
has been performed here.

The Pro v2.0 Interface Summary Rev 3, Creator/Pro compiler manuals and release
notes need separate revision-scoped comparison. AMOS 3D retains its own
[59-record inventory](../extensions/amos-3d/README.md); TOME, requesters and other
extensions must retain component/version identities rather than being merged
into an assumed stock dialect. Missing evidence means unknown, not unsupported.

The Creator extract contains OCR/layout artefacts, and the retypeset books have
known numeric/identifier defects. Single quotes, spacing, numeric ranges and
exact editor key behaviour need tokenizer/runtime evidence before analysis rules
are adopted. Do not promote the manuals' suspect examples into parser tests.

## Replay the source bindings

With the three exact extracts available, run:

```sh
python3 scripts/check-edition-sources.py --source-directory /path/to/manual-texts
```

The checker requires all three source hashes and all 21 nonempty fact ranges;
changed or absent text, duplicate/missing forms and anchor mismatches fail. It
checks citation integrity, not the truth of a paraphrase or runtime behaviour.
These research records are not added to the distributable npm/VSIX assets.
