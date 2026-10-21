# Publish a verified highlighting preview

Use npm trusted publishing through GitHub Actions. The connection for
`@lang198x/amos` is bound to `lang198x/amos`, workflow `publish-preview.yml`.
It allows direct npm publication and staging, without separate dist-tag access.
The workflow contains no npm token or publishing secret.

Prepare both archives and release evidence before publishing. Keep the exact
source commit, successful CI, archive sizes, SHA-256 and SHA-512 integrity in
`docs/releases/<version>-evidence.json`. Attach both archives and SHA256SUMS to
a draft GitHub prerelease. Download and compare the retained bytes.

After release approval, publish the GitHub prerelease with its tag at the
verified source commit. Commit the publishing workflow and evidence on main.
Run the workflow from main with the published tag, for example:

```sh
gh workflow run publish-preview.yml --repo lang198x/amos --ref main -f tag=v0.3.0
```

The guard rejects drafts, stable releases, a wrong release identity/source tag,
incomplete evidence, changed archives and a changed checksum asset. It publishes
the retained npm archive explicitly to `next`, without rebuilding from main.
Use `./` for relative archive paths: npm otherwise treats a two-component path
as a GitHub repository shorthand.

A successful workflow is only the first publication signal. Read the registry
back after processing; compare the downloaded tarball and integrity to the
approved artifact, verify next and latest, and inspect provenance. npm's settings
should mark the trusted connection Valid after its first successful publication.
A repeated run fails on an already-published version; do not repack or overwrite
a release to make a retry succeed.

Marketplace upload is currently a separate authenticated browser operation.
Verify version, prerelease-channel property and public/private availability
independently. A Preview label alone proves neither prerelease-channel selection
nor public visibility. Record the exact uploaded archive and the observed result.
The public preview authorization is scoped by
[release readiness](../../decisions/marketplace-release-readiness.md).

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) and
[VS Code publication](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).
