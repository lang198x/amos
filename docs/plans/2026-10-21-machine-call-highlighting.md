# Appendix A calls and registers

1. Bind Pload/Call to 14.A.14 and Areg/Dreg to 14.A.15 using exact
   headings in the hash-pinned manual. Measure existing scopes before editing.
   Append four records to specifications/manual-core/14-A.json (718 total).
2. Add a command rule after existing longer command forms, preserve Call Editor,
   and add reserved-variable register scopes for reads/assignments. Sync combined
   and editor assets. Add tests/highlighting-machine-calls.test.mjs and a fresh
   examples/machine-calls.amos.txt covering address/bank and optional arguments,
   register contexts, nested existing forms, boundaries, opaque payloads and
   line recovery. Bound the prior bits test to its twelve forms; update the old accessory
   missing-Call expectation now that its definition is inventoried.
3. Update current coverage/provenance/status docs; keep Appendix A procedural
   insertion UI and assembly prose distinct from BASIC headings. Run package,
   sync, both full consumer suites sequentially, missing-rule control and
   npm/VSIX byte/extracted-render checks. Commit/push, inspect CI and remove
   /private/tmp/lang198x-calls artifacts.

No dependencies, parser/API change, native loading/execution, ABI qualification,
version bump or publication. Register access limits, stack/parameter formats,
relocation and bank lifetime remain unqualified. Four Copper catalogue gaps remain.

Outcome: all 28 Appendix A heading/page bindings match the pinned extract.
Four new forms lacked scopes before implementation. Package checks pass 25/25;
both consumers pass 234/234 integrations. Missing-command-rule controls fail
both profiles, then restoration passes. Complete existing call phrases retain
scopes. npm/VSIX source bytes and extracted all-mode/two-theme source/render
checks pass. No native operation or publication occurred. Remove task outputs
after verifying exact remote retention and CI.
