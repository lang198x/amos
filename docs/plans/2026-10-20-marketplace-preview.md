# Make the AMOS editor preview discoverable

Prioritise highlighting and VS Code distribution. Use the agreed `lang198x`
Marketplace publisher. Native-file output remains the next toolchain milestone;
this work introduces no compiler, parser expansion, dependency or universal AST.

1. Register the publisher through the official Marketplace management UI after
   the user signs in. Use ID `lang198x` and display name `Lang198x`; leave optional
   domain verification empty unless ownership is established. Never put account
   credentials or authentication URLs in Git. Stop for any necessary account or
   terms action that requires the user.
2. Review the existing `editors/vscode/` manifest, README, language configuration
   and versioned 0.1.0 VSIX. Inspect the installed extension in isolated VS Code
   settings using a source showcase in dark and light themes. Preserve the user's
   existing editor sessions and settings. Retain review captures as public evidence
   only after checking for private paths or unrelated content.
3. Publish the already verified 0.1.0 VSIX if its review passes. If review reveals
   a bug, reproduce/explain it and make a bounded patch with a new version rather
   than replacing the existing release. Verify the Marketplace listing and a
   fresh Marketplace install; downloadable VSIX remains a distribution fallback.
4. Update `README.md`, `editors/vscode/README.md` and `docs/verification.md` with
   actual install routes and coverage. Commit/push after package checks, keeping
   the versioned preview assets unchanged.
5. Record the next highlighting scope: audit a pinned Bank or Risk listing with
   the current grammar and manual citations, then identify supported scope gaps
   and independent boundary cases. The recommended next release expands AMOS
   highlighting before starting Blitz. No claim of full grammar or release
   validation follows from colouring source.
6. Remove temporary editor installs/downloads and stop task-owned editor
   processes. Keep only durable source records and necessary review evidence.

Publishing and broader highlighting are separate bounded changes. VS Code uses
one canonical grammar shared with npm/Shiki; editor adapters do not own a second
semantic implementation. Keep source and test files small as this grows.

## Publication follow-up

The user completed publisher creation and uploaded the approved L logo. The
0.1.0 upload was rejected: "The extension 'amos' already exists in the Marketplace.
Please use a different 'name' in the package.json file". The user chose the
replacement editor name `lang198x-amos` and approved including the icon in 0.1.1.

1. Change only `editors/vscode/package.json` name/version/icon, copy the approved
   PNG with provenance, and teach `scripts/package-editor.py` to package its PNG
   content type and Marketplace icon asset. npm and Rust remain at 0.1.0.
2. Run package checks and inspect the actual VSIX manifest, PNG and canonical
   grammar. Install the new VSIX in isolated directories; do not retry native
   editor selection, which automatic approval review rejected due to the risk of
   binding a private editor window. Native visual inspection remains unverified.
3. Publish the new VSIX, verify visible Marketplace status and fresh registry
   installation if available, then update actual availability documentation.
4. Commit/push and retain the release asset before cleaning task-owned resources.

## Earlier outcome

The user chose a new `lang198x` publisher. The Marketplace management route
reached Microsoft sign-in, but two user sign-in attempts stalled. The browser
connection then timed out while inspecting the existing page. No publisher was
created, agreement accepted or extension uploaded; the cause is not established
as a Microsoft account fault. Do not keep restarting this authentication flow.

The existing versioned VSIX was downloaded, checked against its release SHA-256
and installed successfully into task-specific editor directories. The native
control API selected the user's existing Code window rather than the isolated
instance, so no native visual review is claimed and that window was not edited.
Publishing remains pending. The direct VSIX installation instructions and bounded
coverage are documented in README; existing release assets are unchanged.

The reproducible highlighting baseline lives in
`audit/2026-10-highlighting/{README.md,scan.mjs,statement-heads.json}`. It binds a
pinned full-game source and the released grammar. It inspects physical-line head
candidates only; BR_MARK demonstrates why candidates are not all commands.
An empty source was rejected before any output write. Grammar, parser and npm
package code were not changed, and no dependency was added.

## Current outcome

Publisher creation and its approved L logo are confirmed. The renamed 0.1.1
upload is accepted and shows Verifying / Private; public installation remains
pending Microsoft validation. CI passes for a21cbf5. GitHub release v0.1.1
retains the exact VSIX and checksum, independently downloaded and compared.
The installed grammar/icon match source. Native visual review remains unverified
after automatic approval review blocked editor-window selection. No retry of
that UI action was made. Temporary downloads and isolated settings are disposable
once cleanup confirms no task-owned Code process remains.
