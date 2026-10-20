# Provenance

The implementation and grammar are newly authored. The website's existing
AMOS grammar was inspected at code198x/website revision
`7412570891a79c0485b3d894cefd4cf74eb924eb`, but not copied: its applicable software
licence was not established. The website prose licence excludes software.

Language facts were checked against the original **AMOS Professional User Guide**,
[Internet Archive source](https://archive.org/details/AmosProfessionalManual):

- §5.1, pp. 05.01.01–03: strings, variable names and numeric types.
- §5.1, pp. 05.01.07–10: End, command separation, case/spacing and comments.
  In particular, apostrophe comments are restricted to the beginning of a line;
  inline comments use colon followed by Rem.
- §5.2: Chr$ and Str$ string functions.
- §5.3: Rnd.
- §6.1, p. 06.01.07: Cls with no argument, a colour, or a rectangular region.
- §10.1: Inkey$ and Wait Key.
- §14.1: binary and hexadecimal notation.

These are language facts, not a claim that every edition behaves identically.
The AMOS-specific grammar is deliberately partial; it is not copied manual text.

[Opening sources](../corpus/opening/README.md) retain their upstream MIT licence
and immutable provenance. [New native probes](../corpus/probes/README.md) record
exact input hashes, screenshots and a pinned runtime profile. Host parser tests
include additional generated and malformed inputs; these are not native trials.

TextMate follows the documented
[VS Code grammar interface](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide).
Shiki's [custom-language interface](https://shiki.style/guide/load-lang) consumes
that grammar. The VS Code extension owns no second copy of the language rules:
its packaged grammar is generated from, and checked against, the canonical file.
