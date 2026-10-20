# Publish the AMOS preview to npm

The lang198x npm organisation now exists. Publish the existing verified preview
without changing its code or overwriting the GitHub release assets.

1. Verify npm owner access and download the GitHub 0.1.0 tarball/checksums to a
   temporary task directory. Compare every packaged file with the clean source.
2. Publish that exact tarball publicly as `@lang198x/amos@0.1.0` under the `next`
   tag, preserving its preview status. Stop for user authentication if required.
3. Read registry metadata/integrity and install the exact version into a fresh
   temporary consumer. Compare the installed grammar and render source with an
   existing Shiki installation; add no dependencies to the project.
4. Update `README.md` and `docs/verification.md` with actual registry availability
   and the preview install command. Commit/push after checks; update the GitHub
   release notes without replacing its versioned assets.
5. Remove temporary downloads, consumer directories and npm cache after the
   registry package and documentation commits are verified remotely.

## Outcome

Owner access was verified. The existing 0.1.0 tarball was published after npm
web authentication, without changing its bytes or version. The `next` tag
resolves to 0.1.0; npm also reports `latest` at that version. Initial registry
lookups returned E404 during processing, then became available.

The public version metadata's SHA-1 and SHA-512 integrity match the GitHub
preview. Downloading its registry tarball produced identical bytes. A fresh
install by `@lang198x/amos@next` succeeded, and the installed grammar matched the
canonical source and rendered through existing Shiki and shiki-highlights
installations. No project dependency was added. Current README/verification
and release notes now document npm availability; versioned assets remain intact.
