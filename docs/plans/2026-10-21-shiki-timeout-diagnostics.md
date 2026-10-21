# Fail clearly when Shiki tokenization stops early

1. Add tests/helpers/tokenization-guard.mjs to wrap the installed TextMate
   grammar prototype's two tokenization methods in integration test processes.
   Preserve arguments, state, results and exceptions; reject stoppedEarly before
   Shiki can combine incomplete scope/encoded passes. No retries, deadline changes
   or production/dependency edits. Guard installation must reject an unexpected
   grammar shape rather than silently leave verification unprotected.
2. Add tests/helpers/install-tokenization-guard.mjs as the integration --import
   preloader. Load the existing AMOS registration through AMOS_SHIKI_MODULE,
   install the guard for that TextMate implementation, dispose the seed
   highlighter, then let ordinary tests create their own instances. This also
   covers consumer instances sharing the selected Shiki installation.
3. Add tests/tokenization-guard.test.mjs to package checks. Verify both methods,
   later instances, unchanged arguments/results/errors and rejected incompatible
   shapes. Add a real-Shiki integration check with controlled clock starvation;
   prove both passes fail explicitly and preserve the ordinary finite limit.
4. Run package/editor checks, the controlled integration check and serial full
   consumer suites separately with bounded external runtimes. A host-starvation
   failure remains failure: record it without retries or a green claim. Record
   npm/VSIX source-byte checks, inspect the diff, commit/push and check CI. Keep
   grammar, registration, parser, versions and private availability unchanged.

Temporary logs and packaging outputs: /private/tmp/lang198x-shiki-timeout-check.
Remove them after evidence is retained and the remote commit/CI are verified.
Standalone Interface implementation remains the next design discussion.

Outcome: 32 package checks, editor sync and both 248-check serial consumer suites
pass. Controlled real-engine starvation rejects both passes and both consumer
instances; removing the preload makes both real-engine controls fail. All 19 npm
files and nine VSIX source assets match source bytes. No production/dependency,
grammar, parser, version or publication change. The Interface proposal awaits
design agreement before implementation.
