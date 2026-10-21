# Remaining highlighting work

The approved sequence is complete: **§7.7 Icons and Blocks**, **§11.1 Fonts**,
then **§12.2 Error Handling**. Current BASIC coverage is 612 chapter entries across
31 chapters, including the subsequent printer/general-port sweep. The audit baseline and representative probes below retain their
pre-implementation results; the completion record follows them. Publication
remains separate.

## Audit baseline

Reviewed against source commit `729db08` after speech coverage. The BASIC
inventory contains 543 chapter entries across 26 chapters. Counts include repeated
references and connective words; they are neither unique-instruction totals nor
a whole-language percentage. Separate inventories cover 14 embedded menu forms,
36 AMAL records and 59 optional AMOS 3D records.

The held source is the 1992 **AMOS Professional User Guide** retypeset extract,
`amos-pro-user-guide-1992-croucher-hill.txt`, SHA-256
`b0bf946502ad3ce6534e13d620dd5c017f8f6a6cd7a4c4f99ced87b1d925715c`.
It is held in the umbrella's `reference/by-system/commodore-amiga/` library;
[provenance](provenance.md) and the
[inventory source record](../specifications/manual-core/source.json) identify it.
Line references below count newline characters, preserving the extract's formfeeds.

The chapter map uses the manual contents, lines 75–700, and the existing inventory
list. The next three candidate sections were also read directly. Remaining routes
are planning categories, not completed command inventories or native evidence.

## Representative scope probes

The following fresh inputs were checked with Shiki 4.4.3 in **both** `amos` and
`amos-3d`, using dark-plus and light-plus. A pass requires every character of the
named phrase to carry its command/function scope. A partial `Get` or `Put` prefix
does not pass. None of the 16 gap forms is in the current BASIC inventory, and
each fails all four profile/theme combinations. This is a sample of gaps, not a
measurement of an entire chapter's missing vocabulary.

| Form | Fresh input | Manual page; extract line |
| --- | --- | --- |
| Get Icon | `Get Icon 1,0,0 To 15,15` | 07.07.01; 14058 |
| Get Icon Palette | `Get Icon Palette` | 07.07.01; 14073 |
| Get Block | `Get Block 1,0,0,16,16` | 07.07.03; 14163 |
| Put Block | `Put Block 1,32,32` | 07.07.03; 14177 |
| Hrev Block | `Hrev Block 1` | 07.07.04; 14208 |
| Get Cblock | `Get Cblock 1,0,0,16,16` | 07.07.04; 14226 |
| Get Fonts | `Get Fonts` | 11.01.01; 19942 |
| Set Font | `Set Font 1` | 11.01.02; 19998 |
| Text | `Text 10,20,"Ready"` | 11.01.03; 20017 |
| Font$ | `MC_FONT$=Font$(1)` | 11.01.02; 19987 |
| Text Length | `MC_WIDTH=Text Length("Ready")` | 11.01.03; 20039 |
| On Error | `On Error Goto MC_RECOVER` | 12.02.01; 21284 |
| Resume Next | `Resume Next` | 12.02.02; 21336 |
| Trap | `Trap Load "RAM:data.abk",10` | 12.02.04; 21432 |
| Errn | `MC_ERROR=Errn` | 12.02.03; 21386 |
| Err$ | `MC_ERROR$=Err$(1)` | 12.02.04; 21459 |

The positive control, `Set Double Precision`, passes all four combinations. It
is already inventoried in §5.3 (05.03.06, line 4112), although floating-point
libraries are discussed again in §11.3. A chapter absent from the inventory list
therefore does not mean that all vocabulary mentioned there is missing.
No grammar or test expectations were changed for these probes.

## Completed first three sweeps

| Sweep | Chapter entries | BASIC total | Integrations per consumer |
| --- | --- | --- | --- |
| [Icons/blocks](../specifications/manual-core/07-07.json) | 15 | 558 | 118 |
| [Fonts](../specifications/manual-core/11-01.json) | 13 (includes existing Assign) | 571 | 125 |
| [Error handling](../specifications/manual-core/12-02.json) | 11 | 582 | 131 |

Each sweep passed 22 package/inventory checks, both existing consumers and both
profiles/themes, a failing-rule control, archive byte inspection and extracted
npm rendering. See [verification](verification.md) for evidence and limits.
The original scope descriptions follow.

1. **Icons and Blocks (§7.7, pp.07.07.01–05).** Complete the remaining chapter of
   the object/animation section. Inventory icon capture/palette/pasting, insertion,
   deletion and masks, then ordinary and compacted block operations. Preserve
   longer Get/Put phrases ahead of existing bare file commands, and Hrev/Vrev
   Block commands alongside the existing image-reversal functions. A mixed
   background/overlay listing can exercise this without media or runtime changes.
2. **Fonts (§11.1, pp.11.01.01–05).** Cover font enumeration/selection, graphical
   text and metrics, and coordinate conversions. This directly improves display
   code highlighting. Preserve Text Styles and existing Assign coverage. The
   Xgraphic/Ygraphic signatures repeat Xtext/Ytext (lines 20110–11); record the
   conflict before selecting spelling evidence. Do not turn the font-clearing
   allocation example into a recommended runtime technique.
3. **Error Handling (§12.2, pp.12.02.01–04).** Cover On Error forms, Resume variants,
   Trap and error queries. Test Trap followed immediately by another command,
   complete control phrases and typed Err$ boundaries. Callback/label targets
   remain unresolved identifiers; lexical coverage cannot validate error recovery.

Each further sweep should begin with its full cited inventory and a before-change scope
measurement. Use the existing two-profile/two-theme consumer checks, fresh mixed
examples and a failing-rule control. No new parser, dependency or release follows
from these coverage milestones.

## Other manual routes

These sections do not yet have BASIC chapter inventories. They need explicit
review; they are not silently excluded from a future coverage claim.

| Route | Remaining review |
| --- | --- |
| §§9.1–9.4 Interface | Separate BASIC Dialog/resource controls from the embedded Interface language. Inventory both before deciding any standalone mode or string injection. The existing AMAL mode is not Interface coverage. |
| §10.5 parallel | Device commands, functions and transfer/status forms; the [boundary review](io-extension-boundary.md) recommends existing lexical modes with component provenance; Serial Buf and source component grouping are resolved; the 18 serial forms now have lexical coverage. Parallel is the next separate sweep. §10.3 printer/general-port forms now have a 12-entry inventory; escape payloads stay opaque. |
| §10.6 AREXX | BASIC integration commands and external script payload boundaries; no AREXX language implementation is implied. |
| §11.3 floating point | Reconcile repeated precision/maths vocabulary with existing §5.3; distinguish library/number-representation facts from missing lexical forms. |
| §11.4 multitasking | AMOS front/back/lock, waiting and inter-program communication forms. |
| §11.5 libraries/devices | Calls, bases, equates, structure access and requester/device forms. Keep the manual's Requester Extension boundary explicit. |
| §§12.1 and 12.3 monitor/errors | Review any BASIC-facing monitor forms separately from editor UI, message catalogues and explanatory examples. |
| §§1–4 and 13 installation/editor/accessories | Reconcile language forms encountered in examples and editor/direct-mode facilities; menus, shortcuts and accessory workflows are not automatically BASIC instructions. |
| Appendix A machine code | Conversion, memory, bit operations, machine-code calls and registers; substantial BASIC vocabulary remains outside the current inventory. |
| Appendix C PAL/NTSC | Reconcile display queries and timing vocabulary against screen chapters. |
| Appendix F Copper | BASIC Copper controls and queries; hardware behaviour remains a separate claim. |
| Appendices B, D and E | Review runtime distribution, extension boundaries and bank-layout reference material for additional forms; format layouts do not become parser rules. |
| Appendix G command index | Final crosscheck for missed names, aliases and roles after chapter inventories. It is a locator, not sufficient syntax or edition evidence by itself. |
| Appendices H and I | Distribution/support reference; check any language mentions during final reconciliation, without treating catalogue entries as commands. |

## Gaps that a chapter sweep cannot close

- **Lexical forms:** full numeric notation, inline/numeric labels and original-editor
  spacing/prefix rules need their own source-backed review. Current highlighting
  accepts selected forms without proving native import acceptance.
- **Embedded languages:** BASIC strings remain opaque. Menu and standalone AMAL
  coverage do not supply Interface highlighting, arbitrary compact AMAL acceptance
  or injection into BASIC strings.
- **Versions and extensions:** this Professional manual does not qualify Creator,
  Easy, every Professional release or extensions through their lifetimes. Retain
  separate evidence records and unknowns, including optional 3D profile boundaries.
- **Native/editor evidence:** token scopes and archive checks do not establish a
  visual editor review, original-runtime acceptance or educational effectiveness.
- **Parser and services:** the opening-program Rust subset, native codecs, analysis,
  LSP and compilation are separate deliverables. More coloured vocabulary does
  not enlarge their implemented surface.

Public Marketplace readiness still requires an agreed coverage scope and evidence
review under the [release decision](../decisions/marketplace-release-readiness.md).
This audit does not define a percentage target or authorise publication. Published
preview 0.2.0 retains its original assets; current additions remain unreleased.
