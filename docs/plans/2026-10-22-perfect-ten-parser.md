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
