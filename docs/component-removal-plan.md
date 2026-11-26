# orbit-ui component removal plan (2026-11-26)

From a read-only usage audit across the 4 consumers of the library (orbit-core-ui + case-management-prototype + case-overview-prototype + orbit-workflow-prototype). Goal: remove unused and duplicate components. NOTHING deleted yet.

## Critical caveat (must not be skipped)
A naive "unused = delete" is wrong for components we JUST shipped. `modal` and `metric-card` were added today (v0.6.0) as canonical components. No consumer has adopted them yet, so they look "unused", but deleting them would undo today's work and remove the things we want screens to adopt. They are KEEP (newly shipped, adoption pending), not delete.

Same logic for anything intended as a forward standard.

## External import surface (what the 4 consumers actually pull from the package)
- orbit-core-ui: cn, Button, Pill, PillVariant, Input, Dialog family, Alert family, SearchInput, EmptyState, Table family, FilterBar, Tooltip family
- case-management-prototype: cn only
- case-overview-prototype: cn, Button, Badge, Pill, Input, Separator, Tabs family
- orbit-workflow-prototype (widest): cn, Button, StatusChip, Card family, RowList family, Separator, Pill, Badge, Table family, StatCard, TableToolbar, FilterBar, FilterSelect, SearchInput, FormField, PortalSelect

## Library internal dependencies (do not delete a depended-on component)
- confirm-destroy-dialog -> dialog, button, spinner
- modal -> dialog
- pagination -> button
- entity-drawer -> drawer, button
- field-help -> tooltip
- form-field -> field-help, label
- setup-wizard -> button

## PART A: library components

### A1. Genuinely dead: unused by all 4 consumers AND not newly-shipped AND not depended on
Candidates to delete now (verify each before deletion):
- SegmentedControl
- accordion
- breadcrumb
- date-time-picker
- entity-drawer (then drawer becomes deletable, its only dependent)
- error-state
- form-section
- native-select (not even exported)
- pagination
- select (already deprecated today)
- setup-wizard
- table-card
- confirm-destroy-dialog (then spinner becomes deletable, its only dependent)
- toast (library's own; app has its own toaster, see Part B)

Transitively freed once the above go: drawer, spinner.

### A2. Looks unused but KEEP
- modal, metric-card: JUST SHIPPED as canonical. Adoption pending. KEEP.
- field-help, label: used by form-field (which workflow-proto uses). KEEP.
- badge, select: deprecated today, still used by consumers (case-overview-proto imports Badge; keep until those migrate). KEEP for now.

### A3. Used, must stay
button, input, pill, separator, tabs, dialog, alert, search-input, empty-state, table, filter-bar, filter-select, tooltip, card, row-list, status-chip, stat-card, table-toolbar, form-field, portal-select, plus cn.

## PART B: library vs app-local duplication (the bigger drift)
orbit-core-ui has its OWN primitive set at src/components/ui/* and uses those instead of the library. Duplicate pairs where the app uses its local copy and the library copy is largely unused:
- button, badge, drawer, table, search-input, empty-state: app has local + library has it. Canonical direction (per audit): app adopts the library component, deletes its local copy. This is an APP-SIDE migration, not a library deletion.
- app-local with NO library equivalent (promote candidates, do not delete): switch, stepper, icon-button, multi-select, toaster/use-toast, page, row-actions.

Note: the app's local Modal (ui/modal.tsx) is what the new library Modal was promoted from. Once the app adopts the library Modal, its local one goes. Until then both exist.

## Recommended sequencing (safe)
1. Phase 1 (library-only, zero external risk): delete the A1 dead set + transitively-freed drawer/spinner, and their stories. Bump minor, republish. No consumer imports them, so nothing breaks. KEEP modal/metric-card.
2. Phase 2 (app-side migration, separate project): orbit-core-ui adopts library Button/Badge/Table/SearchInput/EmptyState/Drawer/Modal and deletes its local ui/* duplicates. This is where the real duplication clears, but it is app work with per-screen verification.
3. Phase 3: promote the app-only components with no library equivalent (switch, stepper, icon-button, multi-select, toaster) into the library so the app can eventually import everything from one place.

## What needs Sofia's call
- Approve the Phase 1 dead-component deletion list (safe, library-only).
- Confirm modal + metric-card are KEEP (do not delete the things we just shipped).
- Phase 2 and 3 are bigger; schedule separately.
