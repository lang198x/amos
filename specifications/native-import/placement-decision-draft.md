# Draft: start the native AMOS reader in Format198x

**Status:** Proposed, not adopted. Move this record to Format198x's decisions
folder only after approval. It grants no permission to implement the codec yet.

## Proposed exception

Start `format198x-commodore-amiga-amos` directly in Format198x, with Lang198x as
its first named consumer. The original AMOS software produces the files.
There is no family implementation whose code and history can graduate.

For this crate only, override the Format198x instruction “A format crate is
not started here” and the normal bootstrap route in the
[family graduation decision](https://github.com/stevehill1981/198x/blob/a0fe6457e29e7d9068aa2eb1aa7c163285cb851c/decisions/formats-graduate-to-their-own-projects.md).
The reason is narrow: our producer is outside the family, our consumer is known,
and the agreed Lang198x boundary forbids a private native codec. Building one
there just to move it would add work without changing who owns the contract.
This exception does not change how existing family format crates graduate.

## What it permits

After adoption and a small implementation plan, start with a read-only envelope
reader. Preserve native bytes and explicit wire profiles. Keep the existing
naming rule, stable Rust, no runtime dependencies, and the usual test/release
checks. New dependencies and public API choices still need their own agreement.

Move the canonical wire specification, source bindings and this adopted record
to Format198x with history. Lang198x keeps its source-analysis and editor
requirements and links to the moved wire specification. Keep one owner for each
rule; do not maintain two copies of the file format.

Native output, compilation, execution and broader language parsing are outside
this exception. Publication or a stable release also requires separate review.

## Reconsult before

Starting another format directly in Format198x, adding native output, changing
the ownership split, or copying these format rules back into Lang198x.
