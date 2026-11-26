# Workstream 2 port plan (orbit-ui @ v0.5.7)

From the 4-way drift audit. Sofia's picks for the three non-Storybook components, analysed against the current library. Read-only analysis, no code changed yet.

## Verdicts

| Component | Sofia's pick | Verdict | Why |
|---|---|---|---|
| search-input | Orbit live | KEEP-LIB (fix app-side) | The pick is the older implementation. orbit-ui already has the newer standardised version (2026-11-11). |
| dialog | Orbit live | NEW-ADDITION (`Modal`) | Not like-for-like. Pick is a high-level `<Modal>` wrapper; lib's `Dialog` is a composable Radix primitive set. Add `Modal` alongside, do not replace. |
| status-chip | Prototype | KEEP-LIB | Prototype has no reusable chip, just inline spans. Lib's `StatusChip` is the real component. Confirm soft vs outline fill with Sofia. |

Only one is a real code port: dialog, by adding a new `Modal`.

## 1. search-input -> KEEP-LIB
- Library (`orbit-ui/src/components/search-input.tsx`): controlled `{value,onChange,placeholder,ariaLabel,width}`, clear button, purple focus ring + `#92248E` icon, 8px radius/40px/white/`#D8DEE6` border. Documented as the standardised 2026-11-11 (Sofia) single shared search field.
- Pick (`orbit-core-ui/src/components/ui/search-input.tsx`): uncontrolled forwardRef, NO clear button, muted-grey icon, `rounded-lg`, token classes.
- Audit shots confirm: orbit shot = grey icon; storybook shot = purple icon, roomier. So the pick is the older/simpler/grey field. Promoting it = regression.
- Real fix: app-side adoption. orbit-core-ui drops its local search-input and consumes `@365assistance/orbit-ui` `SearchInput`.
- API-compat risk (app migration): pick is uncontrolled + spreads native props; lib is controlled `value`/`onChange(v:string)`. App call sites using `ref`/`name`/native `onChange(e)` need refactoring. Flag before scheduling.
- Optional lib polish (separate PR): tokenise the hardcoded hex (`#92248E`/`#D8DEE6`/`#242D38` -> `var(--primary)`/`var(--border-default)`/`var(--ink-primary)`). Patch bump 0.5.7 -> 0.5.8. Title: `fix(search-input): tokenise brand focus/border colours (drop hardcoded hex)`.

## 2. dialog -> NEW-ADDITION (add `Modal`, keep `Dialog`)
- Library (`orbit-ui/src/components/dialog.tsx`): composable Radix primitive set (Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogOverlay). One tokenised backdrop `rgba(15,23,42,.68)`, `--shadow-lg`, `--radius-lg`. Built from unified `radix-ui` package. (The audit storybook/dialog.png only caught a stray pill because the story's dialog was closed, not valid ground truth.)
- Pick (`orbit-core-ui/src/components/ui/modal.tsx`): high-level controlled `<Modal>` `{open,onOpenChange,title,description,size:sm|md|lg|xl,dismissible,children,footer,headerDivider,footerBar}`. Opinionated header/body/footer, Figma grey footer bar, size->max-width. Uses OLDER `@radix-ui/react-dialog` direct import (dep mismatch to resolve). Its referenced spec doc (`docs/components/Modal.md`) documents a DIFFERENT API than the code; doc is stale, build from code.
- Verdict: two different abstraction levels. Add `Modal` as a new lib component built ON TOP of the existing `Dialog` primitives (single Radix layer, single backdrop/shadow/radius token).

### Steps
1. New `orbit-ui/src/components/modal.tsx`: implement the Modal API, re-based onto the lib's `Dialog*` primitives (not a second `@radix-ui/react-dialog` import). Props: `open, onOpenChange, title, description, size, dismissible, footer, headerDivider, footerBar`.
2. New `orbit-ui/src/components/modal.stories.tsx`: default (md), sizes, headerDivider, footerBar, non-dismissible. `useState` for `open`.
3. Barrel: add `export * from "./components/modal";` to `orbit-ui/src/index.ts` after the dialog export.
4. Token check: confirm `--orbit-radius-panel`/`--orbit-bg`/`--orbit-surface`/`--orbit-focus-ring` exist in the lib token layer; else map to `--radius-lg`/`--card`/`--border-default` so Modal matches Dialog.
5. App adoption (later): orbit-core-ui drops its `ui/modal.tsx` and re-exports `Modal` from the lib. Near drop-in if token names resolve identically. Verify headerDivider/footerBar modals visually.
- Semver: minor bump (new component). API-compat risk for lib: low (pure addition).

## 3. status-chip -> KEEP-LIB
- Prototype has no reusable status-chip component, just inline `<span>`s. Nothing to promote.
- Lib's `StatusChip` is the real component. Confirm with Sofia: soft-filled vs outline style.

## Recommended order
1. Build `Modal` into the library + story (the only real code item). Show Storybook render + diff, push only after Sofia approves.
2. Write up search-input and status-chip as app-side adoption follow-ups (bigger migration, not this workstream).
