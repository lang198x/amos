# Floating-point reconciliation and Monitor

Reconcile §11.3 before adding the single named Monitor command from §12.1.

1. Record docs/manual-reconciliation.md with exact §11.3 range and existing
   §5.3 Sin/Cos/Sqr bindings. Explain that number-format labels and library facts
   add no language entries. Keep library/numeric/runtime claims unqualified.
   Review §12.1 fully; separate Monitor's heading from buttons/shortcuts. Route
   §12.3 catalogue mentions to definitions rather than infer new forms.
2. Add specifications/manual-core/12-01.json with Monitor heading/page; measure
   its missing scope first. Add the canonical command and label exclusion, sync
   modes/editor, and add tests/highlighting-monitor.test.mjs plus a fresh mixed
   examples/monitor.amos.txt. Test existing maths scopes, labels, comments/strings
   and recovery. No numeric-notation change, UI automation or native monitoring.
3. Update source/count docs and tests to 665 entries across 36 chapters; §11.3
   stays outside the count. Run package/editor checks, both existing consumer
   suites, a missing-rule control, actual npm/VSIX byte checks and extracted
   rendering. Commit/push, read CI output and clean /private/tmp/lang198x-monitor.

No dependencies, parser changes, native execution, version bump or publication.
Marketplace remains private. A catalogue reference is not definition evidence;
Ask/Call/Set Editor and Kill Editor mentions remain their own later review.

Outcome: §11.3 was reconciled without duplicate entries; Monitor heading/page
was verified and its missing scope measured. Package checks pass 25/25 and both
consumers pass 183/183 integrations. Missing-rule controls fail both profiles;
restoration passes. All npm/VSIX source bytes and extracted all-mode/two-theme
rendering pass. The reconciliation ships in the npm archive. No native execution
or publication occurred. Remove task outputs after remote/CI retention.
