# First kit verification

Verified on 20 October 2026 with Rust 1.98.0 and Node 24.22.0. This records
implemented scope and actual observations, not a whole-language conformance claim.

- Fourteen Rust integration tests pass, including CLI/library agreement, exact
  source preservation, malformed input recovery, unsupported forms and unknown
  profiles. Formatting and strict Clippy pass without dependencies.
- Three Node package tests pass. They verify corpus hashes, package exports and
  exact agreement between canonical and packaged editor grammars.
- Five highlighting integration tests pass against Shiki 4.4.3 with both the
  installed shiki-highlight-api 1.3.0 and a local 2.0.0 build. These exercise real
  scopes, comment/string boundaries, dollar names, text preservation and the
  shiki-highlights output adapter. Shiki's current documentation is for 4.5.0;
  this task reused the existing 4.4.3 installation rather than changing another
  project's dependencies. Other versions are not claimed by this check.
- A deliberately disabled Print parser makes the maintained-message assertion
  fail. A disabled command-highlighting pattern makes the scope assertion fail.
  An independently changed editor grammar makes the synchronisation check fail.
  Originals were restored before the passing checks.
- The npm tarball installs in a separate consumer and renders source through
  Shiki. Its TypeScript registration is checked against the installed Shiki types.
- The generated VSIX installs with VS Code 1.139.1 in isolated settings and
  extension directories. The installed grammar matches canonical bytes. The
  first sandboxed attempt failed with `EMFILE: too many open files, watch`;
  the same isolated installation succeeded outside the sandbox. This is an
  installation and grammar-engine check, not a visual editor review.
- Five new native F2 probes have exact source/hash bindings and inspected
  screenshots: two opening-form probes accepted, numeric Print accepted, and
  two extra-argument probes rejected. Prior opening/edit/typo/repair observations
  retain their original limits. See `corpus/probes/` and `corpus/opening/`.

CI runs Rust checks, Node package/corpus checks, editor synchronisation and
package creation. The highlighting integration suite is run separately against
existing installations; CI does not download unapproved test dependencies or
silently skip a missing highlighter. Its supported-version matrix can grow once
those test dependencies are explicitly adopted.

The identical verified tarball is published as `@lang198x/amos@0.1.0` on npm
under the preview `next` tag. Registry integrity matches the GitHub preview;
a fresh registry install was compared with the canonical grammar and rendered
through the existing Shiki installation. No dependency was added to this project.
The versioned tarball retains the original pre-publication documentation.
Current availability and installation instructions are maintained in this repo.

The VSIX remains available through GitHub downloads. No Marketplace publication
is claimed.

Native file codecs/output, execution, complete name/type analysis, LSP and
qualification of Creator/Easy/other releases remain future work.
