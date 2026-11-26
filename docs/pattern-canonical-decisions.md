# Page pattern canonical decisions (Sofia, 2026-11-26)

From the page-pattern drift audit. Sofia reviewed and said only 4 patterns are good enough to promote as-is; the rest need design work.

## PROMOTE (canonical chosen, little/no new design)

| Pattern | Promote source | What it means |
|---|---|---|
| action-modals | Orbit live | Adopt the live app's action modal (title + body + Cancel/Save footer) as canonical. Document it. This is also the basis for the orbit-ui `Modal` component (workstream 2). |
| form-layout | Orbit live | Adopt the live app's grouped-fields-with-Cancel/Save form. Document as the form pattern. |
| metric-cards | Prototype | The prototype's metric card wins. Promote its anatomy (value + status dot). NOTE: Orbit live's version is the only one with a trend line, confirm with Sofia whether the promoted card should keep a trend or match the prototype exactly. |
| settings-details | Figma | The Figma settings page is canonical. Build the real settings-details layout to match Figma. |

## NEEDS DESIGN (no surface is good enough)

| Pattern | Why it needs design |
|---|---|
| table-views | Three different framings (Figma detached cards, Orbit fused toolbar+panel, prototype none). No agreed canonical. |
| dashboards | Fundamental disagreement: Figma is a numberless launcher, Orbit/proto are data dashboards. The winning design never describes a data dashboard. Needs a real dashboard design. |
| standard-modals | Only exists in live code; never designed. Needs a designed standard/content modal. |
| side-drawers | Only exists in live code; padding/width/header never pinned in design. Needs design. |
| states (empty/loading/error) | Not captured in this audit run (steer landed late). Figma has no interactive states at all. Almost certainly needs design across the board. |
| detail-profile-pages | Not captured in this audit run. Figma has a profile/settings page (per Sofia's finance-nav note) so may be partly promotable, needs a capture pass to confirm. |
| tabbed-pages | Not captured in this audit run. Needs a capture pass, then likely design. |

## Follow-ups
1. Quick audit pass to add the 3 missing patterns (states, detail-profile, tabbed) so their design/promote status is confirmed, not assumed.
2. The PROMOTE set feeds the design-system docs + orbit-ui build. action-modals promotion overlaps the Modal component work (workstream 2).
3. The NEEDS-DESIGN set is Kevin's queue, briefed off the layout-patterns reference. Dashboards and table-views are the biggest items.
4. This connects to the finance PR regressions: the detail-page and states patterns being undesigned is exactly why drawer functionality got dropped. Settle these, then fix the finance PRs consistently.
