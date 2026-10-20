# Release the refreshed highlighting preview

Approved after the optional AMOS 3D milestone. Release npm and downloadable VSIX
as 0.2.0 previews; retain existing versions/assets and Marketplace privacy.
This releases highlighting only. Rust parser and crate versions stay unchanged.

1. Check registry tags/releases and current authorisation. Update `package.json`,
   `editors/vscode/package.json`, README files and current coverage documentation
   for the new preview. Record release scope and limits in `docs/releases/0.2.0.md`.
2. Run package/editor checks and the existing two-consumer/theme integrations.
   Build npm/VSIX archives into an isolated workspace, inspect exact grammar,
   icon, version and registration bytes, test extracted npm imports/types, and
   install the VSIX using isolated VS Code settings/extensions. No dependencies.
3. Commit/push verified release inputs, read CI, and build from that exact commit.
   Publish the verified npm archive with `next`, preserving other dist-tags, and
   create a GitHub prerelease with those exact archives and SHA-256 checksums.
   Do not upload to Marketplace, replace prior assets or change gallery flags.
4. Download both published artefacts again, verify hashes and registry integrity,
   exercise registry-delivered imports/rendering, and record the release evidence.
   Commit/push verification updates. Remove isolated caches, packages, extension
   installation and task-owned processes after durable release evidence exists.

Workspace: `/private/tmp/lang198x-preview-0.2.0/`. If authentication requires user
interaction, finish independent checks and present the specific security prompt.


Outcome: npm 0.2.0 is published under `next`, with `latest` retained at 0.1.0.
GitHub prerelease v0.2.0 retains the exact npm/VSIX archives and SHA256SUMS.
Both GitHub downloads and the registry tarball match the verified bytes; fresh
registry-delivered imports render and type-check. The VSIX installs in isolated
VS Code 1.142.0 settings, with exact grammars/icon and unchanged manifest release
fields (VS Code adds its own installation metadata). Release evidence binds the
source commit, CI, archive hashes, registry integrity and observed tags.
Marketplace, old releases and Rust parser/version remain unchanged.
