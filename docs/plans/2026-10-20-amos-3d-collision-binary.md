# Trace the pinned AMOS 3D collision library

Investigate the approved remaining collision-result question in the exact
c3d.lib blob identified by the source audit. Treat disassembly/static traces as
binary evidence, separate from native execution and release compatibility.

1. Read the pinned wrapper's loader/call-table protocol and the original library
   bytes. Verify Git blob/SHA-256 and parse Hunk headers/relocations defensively.
2. Reuse the existing dependency-free Isa198x 68000 disassembler in an isolated
   temporary driver, without editing sibling repos or adding dependencies. Locate
   TD_COLLIDE through the loader table, follow both mode branches and return paths,
   and inspect subordinate calls needed to distinguish object identity from count.
3. Preserve exact file/hunk offsets, bytes, decode/control-flow evidence and limits
   under specifications/extensions/amos-3d/. Resolve only what that pinned binary
   establishes. If static evidence remains inconclusive, record the narrower gap.
4. Add focused integrity checks and a negative control, update questions/current
   docs, run package/editor checks, commit/push and inspect CI. Remove task-owned
   downloaded bytes, driver/build outputs and processes after durable evidence is
   retained. No runtime, ROM, full library or snapshot is committed or executed.

No new grammar, parser, dependency, package release or Marketplace change.


Outcome: the pinned library returns the first colliding candidate index or -1 in
single-object mode. Retained excerpts and Hunk relocation evidence support a
binary-resolved status distinct from the three source-resolved questions.
Eighteen package/inventory checks and editor sync pass; wrong-hunk and wrong-file-
offset negative controls fail as intended. The full-library checker and Ruff
checks/formatting pass. Native execution and release qualification remain open.
