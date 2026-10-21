# Serial and parallel highlighting

Approved after the I/O boundary review: resolve the buffer spelling against
original source, then add serial and parallel coverage in separate commits.

1. Fetch extensions/+IO_Ports.s and LICENSE from official revision
   533b4b1f5acd604814513f78e02c7b4796cb0531, verify Git blob hashes and SHA-256.
   Retain narrow token/dispatch excerpts and licence in specifications/extensions/io/;
   update unresolved questions only where the source actually settles them.
2. Promote the cited serial records to specifications/manual-core/10-04.json,
   preserving source-resolved spelling and explicit component provenance. Measure
   current scope coverage. Add canonical serial command/function rules, sync both
   profiles, add examples/serial.amos.txt and tests/highlighting-serial.test.mjs.
   Check aliases, dollars, longest forms, strings/comments and existing port forms.
3. Update coverage/provenance/evidence/current totals and resolve the documentary
   tests' pending-status assertions. Run all package/editor and two-consumer checks,
   failing-rule control and npm/VSIX byte/extracted rendering checks. Commit/push
   the serial sweep and inspect CI before parallel implementation.
4. Repeat for 10-05.json, examples/parallel.amos.txt and
   tests/highlighting-parallel.test.mjs, preserving Input$ versus Inputs and
   source-backed component evidence separately from native availability.
5. Record both outcomes, inspect/purge task-only source downloads, caches and
   extracted consumers in /private/tmp/lang198x-io. Confirm a clean repository.

Existing lexical modes only. No dependency, generic profile framework, parser,
installed runtime, actual serial/parallel device traffic, release/version or
Marketplace change. Handshake semantics and release compatibility remain separate.

Serial outcome: source resolves Serial Buf and component grouping, while retaining
Serial Base arity and Serial X semantic uncertainty. Eighteen serial entries bring
BASIC to 612 across 31 chapters. All 25 package checks and 143 integrations per
consumer pass, with failing-rule control, exact archive bytes and extracted modes.

Parallel outcome: ten entries bring BASIC to 622 across 32 chapters. All 25 package
checks and 149 integrations per consumer pass, plus missing-rule control, archive
byte checks and extracted rendering. All 28 manual heading/page bindings and the
retained original-source/licence bytes were rechecked before cleanup.
