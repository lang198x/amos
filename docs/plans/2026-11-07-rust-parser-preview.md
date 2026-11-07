# Rust parser preview 0.1.0

The user approved preparing and releasing the first Rust parser preview on
7 November 2026. npm 0.3.0 and editor 0.3.1 stay unchanged. The adopted parser
slice and production dependency policy stay unchanged.

1. In `README.md`, replace the eleven links whose targets are absent from the
   Cargo archive with explicit repository links. Preserve `Cargo.toml`'s package
   allowlist. Verify every target exists and the replacement count is eleven.
2. Add `docs/releases/rust-0.1.0.md` with Rust-specific installation, exact
   supported forms, result/exit meanings, byte spans, recovery and unsupported
   forms. Verify claims against `docs/coverage.md`, the parser decision and
   existing tests. Link these notes and installation from `README.md`.
3. Run formatting, Clippy, tests, package listing and publication dry-run in an
   isolated task cache. Run packaged-source tests and CLI positive/negative
   examples. Check no dependency, npm, editor or grammar bytes changed.
4. Commit and push the documentation-only change, open a PR, and require all
   current CI checks. Obtain parent review before merge or publication.
5. After approval, publish the checked source as `lang198x-amos` 0.1.0 using
   Cargo's normal manual publication. Retain reviewed release notes and source
   identity. Read the registry back, download the actual crate, verify registry
   checksum and source contents, run its tests and check CLI outcomes. Record
   durable evidence locally. Remove this task's worktree and caches after its
   commit is retained remotely; preserve inherited workspaces.

No new dependency, pipeline, parser behaviour, native codec, compiler or LSP
work is part of this release.
