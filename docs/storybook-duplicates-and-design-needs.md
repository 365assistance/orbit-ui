# orbit-ui: duplicates to plan removal + what needs designing

Prepared 2026-11-26 for Sofia. Two lists: (A) duplicate/overlapping components in the library so we can plan removals, (B) important components and patterns that still need design. 40 components in the library today; 38 have stories (filter-select and form-field have none).

## DECISIONS (Sofia 2026-11-26)
- Chips: **Pill (outlined) wins**, Badge retired. Badge now deprecated in code + moved to Storybook "Deprecated/" group; remove once orbit-core-ui (~5 files) migrates.
- Selects: **PortalSelect only**. Plain Select deprecated (code + Storybook "Deprecated/" group). NativeSelect kept only where native semantics needed. searchable-select (app) decision still open.
- Metric card: Sofia wants more minimal than either audit option. 3 options mocked (docs/metric-card-options.html), awaiting her pick + change-indicator in/out.

## A. Duplicates / overlaps (plan for removal or consolidation)

Ranked by how much they actually overlap. Note several are deliberately-distinct siblings with clear docs, those are "confirm, do not blindly merge". True redundancy is flagged.

### 1. Chips: badge vs pill vs status-chip  (3 components, real overlap)
- `badge.tsx` (49l): cva variant chip, rounded-4xl, small.
- `pill.tsx` (92l): "small labelled chip, distinct from Badge", built to kill 48 inline `borderRadius:9999` spans.
- `status-chip.tsx` (100l): outline pill + coloured status dot, the scannable state affordance.
- Verdict: three chip shapes is the classic drift the audit flagged. status-chip has a clear distinct job (state + dot). badge vs pill is the real duplication, two chips doing near-identical label work. CONSOLIDATE badge + pill into one, keep status-chip. Decision needed: which of badge/pill is the survivor.

### 2. Selects: select vs native-select vs portal-select vs filter-select  (4 components)
- `select.tsx` (192l): Radix composable Select primitive (the general dropdown).
- `native-select.tsx` (62l): styled native `<select>` for native form semantics.
- `portal-select.tsx` (175l): portalled fully-styled on-brand option list (for dark mode / on-brand open list).
- `filter-select.tsx` (96l): compact h-8 pill dropdown for FilterBar only. NO story.
- Plus `searchable-select` exists in the APP (orbit-core-ui), not the lib.
- Verdict: four select variants is a lot. native-select and filter-select have narrow, defensible niches. select vs portal-select is the overlap worth resolving (both are "styled dropdown with a custom option list"). CONSOLIDATE select + portal-select, or clearly document when to use which. Also decide whether searchable-select should be promoted into the lib (it is a 5th variant living only in the app). filter-select needs a story regardless.

### 3. Cards: card vs table-card vs stat-card  (contains HeroStatCard + StatCard)
- `card.tsx` (103l): base card.
- `table-card.tsx` (145l): card specialised to fuse a Table's header band flush (Sofia 2026-11-13).
- `stat-card.tsx` (183l): HeroStatCard + StatCard (two more surfaces).
- Verdict: NOT true duplicates, these are a base + specialisations. But stat-card bundles two components (Hero + Stat) and the pattern audit picked the PROTOTYPE metric card as canonical, so stat-card/StatCard needs reconciling against that pick (and the trend-line question). Action: align StatCard with the promoted metric-card, not remove.

### 4. Dialog vs the incoming Modal  (workstream 2)
- `dialog.tsx` (160l): composable Radix dialog primitive set.
- `confirm-destroy-dialog.tsx` (75l): built on dialog, a specific confirm. Fine.
- Incoming `Modal` (workstream 2, action-modals promoted from Orbit live): high-level wrapper on top of dialog.
- Verdict: NOT a duplicate if built correctly, Modal sits ON dialog. Risk: if Modal is added without being based on dialog, we get two modal systems. Build Modal on the existing dialog primitives.

### 5. Tabs vs SegmentedControl  (minor)
- `tabs.tsx`: Radix tabs. `SegmentedControl.tsx`: "single portal-wide segmented toggle / tab pattern".
- Verdict: overlapping mental model (both switch views). Low urgency, but document when to use tabs vs segmented control so they do not drift into the same use.

### Quick-win housekeeping
- `filter-select` and `form-field`: add stories (currently invisible in Storybook).

## B. Important components / patterns that still need DESIGN

From the pattern audit (Sofia: only 4 patterns good enough to promote; rest need design). No surface is good enough for these:

### Patterns
- **Dashboards** (biggest). The winning Figma design is a numberless shortcut launcher, not a data dashboard. A real KPI + chart dashboard layout must be designed.
- **Table views.** Three different framings across surfaces, no agreed canonical. Needs one designed list-page framing (toolbar + data panel).
- **Standard modals** (content/info modal). Only exists in live code, never designed.
- **Side drawers.** Only in live code; width, header, padding never pinned in design.
- **Empty / loading / error states.** Figma has no interactive states at all. Needs a designed set (empty, skeleton/loading, error+retry) usable across every data surface.
- **Detail / profile pages.** Needs a capture pass to confirm; Figma profile/settings page may be partly promotable.
- **Tabbed pages.** Needs a capture pass, then likely design of the tab-strip-relative-to-header pattern.

### Components implied by the above
- A canonical **Dashboard** composition (metric row + chart cards grid).
- A designed **states** set (EmptyState exists but needs a design spec; a real **Skeleton/Loading** treatment; ErrorState exists but needs design alignment).
- A **Modal** (standard + action) design so the library Modal has a design to match, not just live code.
- A **Drawer** design spec (so EntityDrawer matches a design, not dev defaults).

## Recommended sequence
1. Update Storybook: add the Modal (action-modals pick), add missing stories (filter-select, form-field), and annotate the duplicate clusters above so they are visible.
2. Decide the survivors for the two real duplications (badge vs pill; select vs portal-select) and whether searchable-select joins the lib.
3. Design queue (hold from Kevin until Sofia releases it): dashboards and table views first, then states, standard modal, side drawer, detail/profile, tabbed.
