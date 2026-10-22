# Qualify the read-only importer

A native decoder needs evidence from stored files. The three-edition typed
trials establish behavior of the Perfect 10 source, not its persisted bytes.
Use those trials as expected behavior, then qualify the file boundary separately.

## Staged delivery

| Stage | Deliverable | Required evidence |
| --- | --- | --- |
| 1: envelope | A small read-only reader and inspector, after the placement decision | Header/body/tail ranges, checked sizes, exact retention and failure controls. No claim of token or bank validity. |
| 2: records | Explicit wire-profile token framing and listing segments | Opening programs and Perfect 10 saved by each claimed original revision; native listing/export comparison; exact profile/table bindings. |
| 3: analysis | Lang198x converts a complete qualified listing and calls its existing parser | Direct-text and imported-text AST/diagnostic agreement after accounting for source maps. Unknown or unmapped input blocks clean whole-file success. |
| 4: editor | A read-only projected source view | The CLI path works first; file identity, errors and byte/source navigation survive the adapter. Separate design approval before adding editor behavior. |

Do not bundle all four stages into the first commit. No stage silently enables
Creator/Easy language profiles or changes the published highlighting preview.
An extension table is a separate qualification unit, not an optional guess.

## Fixtures and rights

Retain public authored source and expected observations. Save that source in
independently identified Creator 1.1, Easy 1.01 and Pro 2.00 environments. Load
it into a fresh editor, inspect its listing and compare execution values. Use
native ASCII export where available; otherwise record the limits of the visual
comparison. Native Save and Load must both be observed, not inferred from a
non-empty file or a completed disk write.

Bind source, native-file, media, runtime, firmware and tool hashes. Record which
editor changes spelling or spacing. Keep a second emulator or original machine
comparison separate from the primary result; a shared format library is not an
independent decoding oracle. Use complete projected text comparisons, rather
than checking only a few command names.

The existing Easy 56-byte file is one private acceptance specimen. It cannot
stand in for all three editions or a game with extensions. Native files,
runtime media, snapshots and registration data remain outside this Lang198x
repository. Publish only reviewed authored text, hashes and inspected captures.

Public format tests may use newly authored header/record fragments once their
provenance and destination rules are checked. Keep whole tokenised programs
private under the current policy. Do not assume that a source repository's MIT
notice applies to every bundled disk or example. The publisher source licence
is retained here for attribution, not as permission to redistribute runtime
media. No new binary fixture is approved by this design document.

## Tests that can fail

- Truncate each header and record boundary, including length and value payloads.
- Try lengths that cross the body/tail boundary, arithmetic limits, zero-progress
  records, malformed string/name lengths and unknown procedure layouts.
- Change a token to an unknown built-in; change an extension slot and offset.
  The bytes must survive, and projection must become incomplete.
- Put a bank-looking signature inside a string. It must not end the source body.
- Put source-looking tokens in the tail. They must not become program text.
- Exercise an empty program and opaque non-empty tail. Do not assume both are bad.
- Use non-ASCII stored text, expanded commands, generated spaces and ambiguous
  reverse-map lookups. Check ranges against the original bytes and UTF-8 view.
- Compare native and direct-text analysis through the canonical parser. Parser
  support must not expand merely because import succeeds.

Generated tests should cover truncations, boundary sizes and record sequences.
Fuzz the bounded envelope before adding token walking, then add payload and map
invariants as those stages land. A crash, timeout or allocation-limit failure
must fail. Run against public synthetic fragments and keep private originals
out of any uploaded corpus. Existing approved fuzz tools need no runtime deps;
new dependencies or a new crate setup still need approval.

Byte retention is an invariant, not a writer milestone. Hash the untouched
input and all retained regions; ensure their declared coverage agrees with
the envelope. Do not claim encode/decode round trips while output is unimplemented.

## Verify this research

Run the source verifier against the exact five files listed in `sources.json`:

```sh
python3 scripts/check-native-import-sources.py --directory /path/to/pinned-source
```

It checks raw file and Git object hashes, twelve non-empty ranges and complete
IDs. Re-encoding a source file, removing a file or dropping a required range
must fail. This binds the research to source; it cannot prove our interpretation
or native binary equivalence. Those need the independent trials above.
