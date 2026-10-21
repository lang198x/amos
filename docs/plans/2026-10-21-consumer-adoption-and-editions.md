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
