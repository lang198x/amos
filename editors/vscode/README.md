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
Preview 0.2.0 includes the full Bank or Risk highlighting milestone, the
452-entry Professional BASIC inventory, and the optional 59-record AMOS 3D
profile. See the repository's coverage document for exact forms and limits.
Marketplace availability remains private until a separate coverage review
approves public release; install this preview using its downloadable VSIX.
The icon comes from https://github.com/lang198x/.github/tree/main/branding;
its lettering uses Oxanium under the SIL Open Font License recorded there.


Preview 0.2.0 also adds the opt-in **AMOS + AMOS 3D** language mode, covering
59 inventoried extension records alongside BASIC. Select it from the language
mode selector, or set a workspace file association to `amos-3d`. Automatic
`.amos.txt` detection still selects AMOS. Movement strings stay opaque; the mode neither
installs AMOS 3D nor validates compatibility or execution.


Current source additionally covers the Professional file/directory, music/basic sound,
sample, music-module, speech, icon/block, font, error-handling, printer/port, serial, parallel, AREXX and multitasking chapters, plus the library/equate/structure/device/requester forms
of §11.5, Monitor from §12.1 and five §13.1 accessory/configuration forms, bringing
its BASIC inventory to 690 entries with Appendix B’s Kill Editor and 19
Interface-facing BASIC dialogue/value/control/resource forms. These continuations are unreleased;
the downloadable 0.2.0 preview retains its 452-entry inventory. Directory options,
channel markers and record operations receive lexical scopes; file contents,
paths and actual I/O are not checked or executed by the extension.


Current source also adds standalone **AMAL** as an explicitly selected language
mode. It respects significant capitals and register/instruction contexts, with
no automatic file association or BASIC-string injection. This is unreleased;
preview 0.2.0 does not include that mode. AMAL has its own parentheses configuration
and inherits no BASIC comment or quote rules. This is lexical highlighting,
not a compiler or validation of arbitrary compact AMAL programs.
