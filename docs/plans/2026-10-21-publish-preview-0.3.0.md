# Publish preview 0.3.0 with npm trusted publishing

Publish the approved GitHub/npm/Marketplace preview. Keep npm latest at 0.1.0,
use next for 0.3.0, retain both verified archives, and keep Rust at 0.1.0.
Steve explicitly approved publishing everything after the coverage review.

1. Record the scoped public Marketplace preview approval in
   decisions/marketplace-release-readiness.md and align AGENTS.md.
2. Add .github/workflows/publish-preview.yml: manual dispatch from main only,
   GitHub-hosted runner, OIDC permission, no npm secret. Verify a published
   prerelease and its tag against committed release evidence, check both archive
   sizes/hashes and checksums, then publish the exact retained npm archive to next.
   Implement verification in scripts/verify-preview-release.py with meaningful
   negative cases in tests/test_preview_release.py; run those in check.yml.
3. Commit/push and inspect CI before configuring npm's trusted publisher for
   lang198x/amos, publish-preview.yml, direct npm publish only. Do not grant
   separate dist-tag management. Verify using the actual 0.3.0 publish.
4. Re-download/verify the draft assets into
   /private/tmp/lang198x-publish-0.3.0, publish the GitHub prerelease, dispatch
   trusted npm publication, and inspect registry bytes/tags/provenance.
5. Upload the exact retained VSIX via Marketplace, make the approved preview
   public, and verify the listing/version/prerelease status. If authentication
   needs the account owner, request that handoff while continuing other work.
6. Record observed publication evidence and current installation instructions,
   commit/push, inspect CI, and remove task-owned temporary files/processes.

No new package dependency, parser change, stable npm promotion, native codec or
new runtime qualification is part of this publication.

## Marketplace visibility finding

The exact 0.3.0 upload validates successfully but stays Private. After validation
its available actions are Reports, View Extension, Update and Remove; there is
no Make Public action. The retained VSIX intentionally has no Public flag.
Preserve that published artifact. Add explicit --public packaging and publish an
editor-only 0.3.1 preview with Public + Preview and the same prerelease property.
Update the editor README for actual installation; keep all four grammars intact.
Verify both private/public packaging and unchanged grammar bytes, commit/push,
then attach the distinct 0.3.1 VSIX/checksum to a GitHub prerelease and upload it.
npm stays 0.3.0; release-only editor patches have independent version numbers.
