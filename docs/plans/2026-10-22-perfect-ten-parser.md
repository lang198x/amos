# Parse the approved Perfect 10 slice

1. Add typed Name, Negate and Equal expressions, Assignment and If statements
   in `src/ast.rs`. Implement bounded expression parsing in `src/expression.rs`
   and assignment parsing in `src/instructions/assignment.rs`.
2. Extract line/colon segments into `src/segments.rs`. Add
   `src/instructions/if_block.rs` for complete multiline blocks. The parser
   dispatcher keeps opening forms unchanged. Scan unsupported nested/Else
   blocks without accepting their contents as a supported block. Missing End If
   leaves later statements available for recovery.
3. Add exact-fragment, malformed/recovery, unsupported-neighbour and CLI tests.
   Extend `tests/support/invariants.rs` to visit new nodes and child ranges.
   Add generated block cases. Verify the fragment was unsupported before this
   change, then run tests, strict Clippy, fmt and a bounded fuzz campaign.
4. Update current coverage, roadmap and issue #3 with precise host-only scope.
   Check links and grade-10 prose, push the verified change and read its CI.

Do not change existing opening forms, runtime profiles, highlighting packages,
native codecs or publication versions. Keep production dependencies empty.


## Verification

The exact fragment returned Unsupported before the change. Current tests check
its one If node, equality names, three assignment targets/values, the negative
integer and the quoted message. The CLI checks the same retained fragment.
Four generated properties now run 512 cases each. Existing opening-form tests
remain in force; no runtime profile or highlighting asset changed.

The first strict Clippy run rejected an `expect()` in the new test. The test now
returns a Result instead; strict Clippy passes. The 60-second fuzz campaign ran
410,983 inputs in 61 seconds with no failure (coverage counter 891, feature
counter 3,363, reported RSS 459 MiB). Its growing input limit reached 321 bytes;
this is not exhaustive exploration of the configured 4 KiB maximum. The tool,
nightly and resource bounds match the source-contract test plan.
