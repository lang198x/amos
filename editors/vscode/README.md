# AMOS highlighting

Partial AMOS TextMate syntax highlighting from Lang198x. This extension contains
no executable extension code, compiler or language server. It associates plain
UTF-8 `.amos.txt` listings; native tokenised `.AMOS` files need a separate decoder.

Install the packaged VSIX with VS Code's **Extensions: Install from VSIX**.
Common controls, opening message commands, selected functions, names, numbers,
strings and comments are highlighted. Colour does not indicate language validity
or release compatibility. See https://github.com/lang198x/amos for exact coverage.

The packaged grammar is generated from the repository's canonical grammar and
verified byte for byte. Newly authored extension files use GPL-2.0-or-later.

The publisher is Lang198x; the extension identifier is `lang198x.lang198x-amos`.
Released version 0.1.1 adds the approved publisher icon and uses a distinct
Marketplace package name. Its highlighting coverage is unchanged from 0.1.0.
Current source includes unreleased full-game highlighting for Bank or Risk;
see the repository's coverage document. Marketplace availability remains private
until a separate coverage review approves public release.
The icon comes from https://github.com/lang198x/.github/tree/main/branding;
its lettering uses Oxanium under the SIL Open Font License recorded there.


Current source also adds the opt-in **AMOS + AMOS 3D** language mode, covering
59 inventoried extension records alongside BASIC. Select it from the language
mode selector, or set a workspace file association to `amos-3d`. Automatic
`.amos.txt` detection still selects AMOS. This mode is not included in the
released 0.1.1 package yet. Movement strings stay opaque; the mode neither
installs AMOS 3D nor validates compatibility or execution.
