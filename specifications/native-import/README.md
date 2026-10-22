# Read native AMOS files: proposed first step

Build a read-only importer that shows known source and preserves every unknown
byte. Start with a file inspector, then connect complete text projections to
the existing parser. Keep a native file's layout, readable text and language
analysis as three distinct results. None proves that a program will run.

This is a proposal for review. No codec, dependency, public API or editor file
association is added by this specification. It follows the
[three-edition trials](../../corpus/editions/perfect-ten/README.md), which test
typed text, and the earlier
[Easy Save/Load trial](../../corpus/editions/save-load/easy/README.md).

## The useful first result

A user supplies an existing native file and chooses a wire profile: the exact
rules used to read its bytes. The inspector reports the header, body and bank
ranges. Where the profile is qualified, it also shows a readable listing and
maps that text back to the native byte ranges. It labels unresolved regions.
It never overwrites the input.

The first source projections target the opening forms and Perfect 10 block.
We must qualify saved examples from Creator 1.1, Easy 1.01 and Pro 2.00 before
claiming this for each edition. Their shared typed-source results do not prove
shared tokens. Other revisions and extensions stay explicit, open work.

A complete projection may then enter the current source parser. An unsupported
parser form remains unsupported even when its native bytes were decoded well.
An incomplete projection cannot produce a clean whole-program analysis result.

## Ownership

| Owner | Proposed responsibility |
| --- | --- |
| Format198x | Native headers, lengths, record framing, wire-profile token maps, raw values, bank ranges and byte-linked listing segments. No AST or program execution. |
| Lang198x | Choose the wire and language profiles, convert text under an explicit encoding policy, compose source maps, then use the canonical parser and analysis. |
| Existing CLI | Read-only inspection first. Existing plain UTF-8 check behavior stays explicit. Native files do not silently enter the old text path. |
| Editor adapter | A later read-only view of projected text. No automatic `.AMOS` association, diagnostics or editing until the CLI path is qualified. |

Format198x's [BASIC tokeniser decision](https://github.com/format198x/format198x/blob/5cba1383852c44ebe18088e328da9ba7c7971752/decisions/basic-tokenisers.md)
places token bytes and listing at the format boundary. Lang198x keeps the typed
AST. We should use that precedent, with no shared AST or second parser.
These are responsibilities, not adopted Rust types or methods.

## Placement needs a decision before code

The [Format198x instructions](https://github.com/format198x/format198x/blob/5cba1383852c44ebe18088e328da9ba7c7971752/AGENTS.md)
say: “A format crate is not started here.” The normal
[graduation rule](https://github.com/stevehill1981/198x/blob/a0fe6457e29e7d9068aa2eb1aa7c163285cb851c/decisions/formats-graduate-to-their-own-projects.md)
moves an existing format implementation with its history and spec. We have no
AMOS implementation to move. Issue #4 also rules out a codec inside Lang198x.
We must settle this before creating one, rather than silently choosing a repo.

I recommend a narrow bootstrap exception: create the AMOS reader in Format198x,
with Lang198x as its named consumer and the original AMOS software as producer.
Record the exception in Format198x's decisions folder. Name the broader rule
it overrides and explain why no originating family implementation exists.
The proposed crate name is `format198x-commodore-amiga-amos`.

The alternative is to keep the design pending until an existing implementation
can meet the normal graduation route. Creating a private Lang198x codec would
conflict with the agreed boundary and is not proposed. No exception or crate is
adopted here; approval of this proposal must settle that placement.

## Read the design

- [Evidence](evidence.md): headers, token records, source limits and open questions.
- [Read contract](read-contract.md): raw bytes, unknown forms, encoding and maps.
- [Qualification](qualification.md): fixtures, negative controls and staged delivery.
- [Placement decision draft](placement-decision-draft.md): the exact proposed exception.
- [Source bindings](sources.json): pinned files and line-range hashes.

The next implementation step is the envelope reader only, after scope and
placement approval. Native writing, compilation, execution, bank decoding,
include loading and an LSP remain outside this import milestone.
