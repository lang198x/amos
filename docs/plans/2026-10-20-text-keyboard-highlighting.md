# Continue the manual inventory: text and keyboard input

The user approved continuing the manual-led sweep. Cover Professional §5.6
(Text) and §10.1 (Using the Keyboard). Keep Marketplace private, published
packages unchanged and runtime/edition qualification distinct from lexical facts.

1. Read both chapters, including grouped headings, dollar-valued forms, cursor
   controls, Print's keyboard shortcut and keyboard macros. Add cited chapter
   inventories in `specifications/manual-core/{05-06,10-01}.json`. Bind headings
   and printed pages to the existing held extract hashes; cross-check anomalies.
2. Extend existing inventory checks to the two declared chapters while retaining
   the original five-chapter/109-entry checks. Reproduce missing scopes before
   editing the grammar. Add no generator, dependency or parser behaviour.
3. Add text and input vocabulary with complete phrase and type-suffix boundaries.
   Preserve known-word label guards, strings and comments. Key$ is a reserved
   variable; macro payloads and Print Using masks remain strings, not embedded
   language implementations. Handle the documented ? shortcut explicitly.
4. Add a fresh mixed text/input listing plus focused tests for assignments,
   function expressions, formatted strings, macro strings and inline contexts.
   Keep the existing game/core suite passing. Prove a disabled new form fails.
5. Run package/inventory and both existing Shiki/shiki-highlights integrations,
   inspect actual npm/VSIX bytes and a consumer render, update current docs,
   commit/push and read CI. Remove task-owned disposable builds/cache/consumer.

Files: chapter JSONs/source metadata and README, existing manual test helpers,
`tests/highlighting-text-input.test.mjs`, `specifications/manual-core/examples/`,
canonical and synchronised editor grammar, coverage/provenance/verification docs.
Windows, mouse/joystick, remaining screen/object/file commands and other editions
are later sweeps; §10.1 does not qualify disc/printer/serial input overloads.
