# AMOS preview: next milestones

The public previews are npm 0.3.0 and editor 0.3.1. Code198x now uses the npm
package in its lesson listings. Current Rust source parses the approved Perfect 10 block. Open work covers
more edition trials, the coverage guide and native import design. Blitz follows AMOS. Track the work in [roadmap #5](https://github.com/lang198x/amos/issues/5).

| Milestone | Current evidence and next boundary | Issue |
| --- | --- | --- |
| Published consumer adoption | Complete: [website PR #905](https://github.com/code198x/website/pull/905) is merged. Both loaders use the pinned npm 0.3.0 grammar. | [website #900](https://github.com/code198x/website/issues/900), closed |
| Editions and releases | Seven forms are compared across three manuals. Separate native trials cover four Cls cases each in Creator 1.1, Easy 1.01 and Professional 2.00. Other forms and revisions remain open. | [#1](https://github.com/lang198x/amos/issues/1) |
| Bare Cls disagreement | Resolved for the three tested revisions: bare Cls follows paper colour; explicit Cls 0 clears to black. Creator 1.1 contradicts its manual. The origin of that wording is unknown. | [#2](https://github.com/lang198x/amos/issues/2), closed |
| Native Easy Save/Load | One 56-byte program saved, loaded and ran in a fresh Easy editor. FS-UAE independently produced the same program and bitmap bytes. Format198x 0.3.4 fixes the checker's bitmap policy. Both Build198x 0.2.13 releases are published; downloaded Mac binaries pass nine unchanged images and five corruption controls. | [#6](https://github.com/lang198x/amos/issues/6), closed |
| Useful parser slice | Approved: Bank or Risk lines 128–132, named assignments, literals/names, unary minus and equality in multiline If / End If. Current source implements that slice with generated tests and fuzzing; broader forms stay unsupported. | [#3](https://github.com/lang198x/amos/issues/3), closed |
| Native AMOS import | Define the Format198x codec and Lang198x analysis boundary, unknown-token handling and lawful fixtures before code. | [#4](https://github.com/lang198x/amos/issues/4) |

The [edition comparison](../specifications/editions/README.md) links the sources
and native trials. These trials cover their exact programs and installations.
They do not qualify a whole edition or enable Creator/Easy CLI profiles.

The parser handles the [opening forms and Perfect 10 slice](coverage.md). Broad
highlighting does not prove that a program parses or runs. Property tests and
fuzzing check source preservation, spans, recovery and repeatable results.
They cannot replace trials in the original software.

Completing a milestone does not approve a stable release, broader parser design
or new dependency. Native import, an LSP and compilation remain separate work.

The remaining [coverage-guide edit](https://github.com/lang198x/amos/issues/7)
aims at grade 10 without losing technical detail or links.
[Build198x #79](https://github.com/build198x/build198x/issues/79) tracks unattended
release authentication; manual recovery is verified.
