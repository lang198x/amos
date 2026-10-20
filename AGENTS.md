# AMOS language tools

Read PRINCIPLES.md, MANIFESTO.md and PRACTICE.md, then the
[org context](https://github.com/lang198x/.github/blob/main/AGENTS.md).
This independent repository owns AMOS source analysis and highlighting assets.
Rust 2024; no unwrap in library code; Clippy clean. Ask before dependencies.
Keep one parser shared by library and CLI. TextMate is a highlighting adapter,
not a second semantic implementation. Scope claims name forms and profiles.
Never infer native compatibility from host tests. Never publish runtime media,
snapshots, tokenised programs or private media paths. Format198x owns native
file codecs; native output and execution are follow-on work.
Use docs/plans/ and decisions/ for implementation plans and adopted designs.

Keep source files small and focused. Each supported AMOS instruction has its own
module under src/instructions/. Keep the dispatcher explicit; no registration or
plugin framework is needed. Split tests by concern as coverage grows.

Keep the Marketplace preview private until coverage is reviewed; consult
[release readiness](decisions/marketplace-release-readiness.md) before changing
availability or adding public gallery flags. Microsoft validation is not release
approval.
