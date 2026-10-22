# AMOS preview: next milestones

The public previews are npm 0.3.0 and editor 0.3.1. Code198x now uses the npm
package in its lesson listings. Next, we will extend the edition evidence and
agree a useful parser slice. Native import follows that plain-text workflow.
Blitz follows AMOS. Track the work in [roadmap #5](https://github.com/lang198x/amos/issues/5).

| Milestone | Current evidence and next boundary | Issue |
| --- | --- | --- |
| Published consumer adoption | Complete: [website PR #905](https://github.com/code198x/website/pull/905) is merged. Both loaders use the pinned npm 0.3.0 grammar. | [website #900](https://github.com/code198x/website/issues/900), closed |
| Editions and releases | Seven forms are compared across three manuals. Separate native trials cover four Cls cases each in Creator 1.1, Easy 1.01 and Professional 2.00. Other forms and revisions remain open. | [#1](https://github.com/lang198x/amos/issues/1) |
| Bare Cls disagreement | Resolved for the three tested revisions: bare Cls follows paper colour; explicit Cls 0 clears to black. Creator 1.1 contradicts its manual. The origin of that wording is unknown. | [#2](https://github.com/lang198x/amos/issues/2), closed |
| Native Easy Save/Load | One 56-byte program saved, loaded and ran in a fresh Easy editor. FS-UAE independently produced the same program and bitmap bytes. Format198x 0.3.4 fixes the checker's bitmap policy; Build198x adoption is in [PR #76](https://github.com/build198x/build198x/pull/76). | [#6](https://github.com/lang198x/amos/issues/6) |
| Useful parser slice | Agree a small Bank or Risk fragment, its expression operators, one conditional form, AST nodes and errors before code. First strengthen tests of the current parser. | [#3](https://github.com/lang198x/amos/issues/3) |
| Native AMOS import | Define the Format198x codec and Lang198x analysis boundary, unknown-token handling and lawful fixtures before code. | [#4](https://github.com/lang198x/amos/issues/4) |

The [edition comparison](../specifications/editions/README.md) links the sources
and native trials. These trials cover their exact programs and installations.
They do not qualify a whole edition or enable Creator/Easy CLI profiles.

The parser still handles only the four [opening forms](coverage.md). Broad
highlighting does not prove that a program parses or runs. Property tests and
fuzzing will test source preservation, spans, recovery and repeatable results.
They cannot replace trials in the original software.

Completing a milestone does not approve a stable release, broader parser design
or new dependency. Native import, an LSP and compilation remain separate work.
