# Adopt the published preview and inventory AMOS editions

Steve approved real-consumer adoption checks, then a manual-backed edition
compatibility inventory and a small issue roadmap. Parser behaviour, native
codecs, runtime execution and further publication are separate milestones.

1. Audit the actual Code198x lesson renderer, retained Shiki API loader and
   their local AMOS grammar. Preserve unrelated website review work. Request
   approval before adding @lang198x/amos@0.3.0 to the consumer. Its plan lives
   in the website repo's docs/plans/2026-10-21-published-amos.md.
2. Test actual lesson/sample source through published npm assets and the installed
   Marketplace extension. Record package versions, source hashes, selected modes
   and limitations in docs/consumer-adoption.md. File demonstrated bugs first.
3. Read the Creator, Easy and Professional primary texts and provenance. Create
   specifications/editions/README.md and sources.json plus one small cited
   comparison file per edition. Start with the opening-program/branch/expression
   surface relevant to current lessons; identify exact revisions as unknown
   unless the source proves them. Do not infer absence from a failed text search.
4. Check source hashes/citations and clear documentary/runtime distinctions. Add
   a compact roadmap in docs/roadmap.md and GitHub issues with bounded deliverables
   and acceptance checks for adoption, edition qualification, parser slice and
   native import. Keep future designs proposed until explicitly agreed.
5. Run checks appropriate to changed files in each owning repo, commit/push task
   changes only, read CI, verify remote issue retention, and clean task artifacts.

No reference text or runtime media is copied into distributable assets. Existing
consumer shapes and UI styles remain unchanged. The parser is not expanded by
this documentary inventory.

## Outcome

The reviewed website change is retained in PR #902, not merged/deployed. The
exact approved registry integrity, failing baseline regression, passing real
lesson source/rendering checks and isolated Marketplace editor views are recorded
in docs/consumer-adoption.md. All 478 browser checks pass in the correctly
configured rerun; offline links have zero errors. The original homepage timeout
and invalid manual-run environment are retained, not hidden.

The first edition inventory is committed at 9e7859161d4659b4f3336181f69dcb4eb0838dde:
21 documentary records, three exact source hashes and an altered-source negative
control. Software revisions and native behaviour remain unqualified. Roadmap
#5 and issues #1–4 track further work; website #900 owns adoption and #901 tracks
the observed unrelated homepage navigation timeout. No parser or grammar profile
change follows from the manual comparison.

The finished linked worktree is removed after verifying its exact remote commit.
Only task-owned unchanged files are restored in the shared website checkout;
unrelated review files remain intact. Temporary editor/profile/log processes and
files are cleaned after their results are retained.
