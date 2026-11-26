# Orbit page layout patterns

A reference for designing and building Orbit app pages. These are the real, canonical layout patterns the live Orbit app already uses (from `orbit-core-ui/src/components/ui/page.tsx` and the app shell in `components/layout/`). Build new screens against these so pages stay consistent instead of drifting per screen.

Rules of the house: no em dashes, no emojis. Token-only styling (CSS variables), never hardcoded hex.

---

## 1. The app shell (every authenticated screen)

Every page sits inside a fixed shell:

```
+----------+-------------------------------------------------+
|          |  Header (top bar: breadcrumb, search, user)     |
|          +-------------------------------------------------+
| Sidebar  |                                                 |
|  (nav)   |   #main  (the page content, scrolls)            |
|          |                                                 |
|          |                                                 |
+----------+-------------------------------------------------+
```

- **Sidebar**: left, fixed. Collapsible (persisted in `localStorage`), becomes a mobile overlay under 768px.
- **Header**: top, fixed. Hamburger on mobile, skip-link is the first focusable element.
- **#main**: the scroll region. This is the only part a page template controls. Everything below is "inside #main".

Do not rebuild the shell per page. A page is just what goes inside `#main`.

---

## 2. The standard list / index page (the workhorse)

Used by Tenants, Users, Permissions, Policies, Services, Invoices, and most "manage a thing" screens. This is the pattern to reach for first.

```
PageContainer  (scroll, page background, 32px padding)
|
|  PageHeader        Title (h1, 28px bold) + subtitle + right-aligned actions
|
|  MetricGrid        KPI row: 1 / 2 / 4 columns responsive (MetricCard x N)
|
|  Toolbar           Search (left)            Filters + actions (right)
|
|  DataPanel         The bordered surface wrapping the table/list
|  |                 ...rows...
|  +--- footer       "Showing X of Y"  +  pagination
```

**Vertical rhythm:** PageHeader has `mb-8` (32px) below it, MetricGrid `mb-8`, Toolbar `mb-5` (20px). Keep that rhythm.

### Building blocks

| Block | Role | Key spec |
|---|---|---|
| `PageContainer` | Scroll + background + padding shell | `p-8`; `width="contained"` gives a centered `max-w-5xl` for form-like pages |
| `PageHeader` | Title + subtitle + actions | h1 28px bold, subtitle 14px muted (max-w-2xl), actions right-aligned, gap-2 |
| `MetricGrid` | KPI tiles row | responsive `grid-cols-1 sm:2 lg:4`, `gap-5` |
| `MetricCard` | One KPI tile | icon tile (48px) + label (14px medium muted) + value (26px bold); color = brand / success / warning / error / info / neutral |
| `Toolbar` | Search + filter row in a panel | left slot = search, right slot = filters/actions; stacks on mobile |
| `DataPanel` | Bordered surface around a table/list | rounded panel, card elevation, optional footer row |

### When to drop blocks

- No KPIs for this entity: omit MetricGrid.
- No search/filter: omit Toolbar.
- The DataPanel is the only thing that is almost always present.

---

## 3. The contained / form page

Used for settings, create/edit forms, permission matrices. Narrower, centered, reading-width.

```
PageContainer (width="contained"  ->  mx-auto max-w-5xl)
|
|  PageHeader
|
|  FormSection      collapsible or borderless grouped fields
|  FormSection
|  FormSection
|
|  (sticky action row: Cancel ghost left, Save primary right)
```

- Use `FormSection` (orbit-ui) to group fields. It supports collapsible, non-collapsible, and borderless modes.
- Keep one column of fields at reading width. Do not stretch form fields to full page width.
- Primary action bottom-right, cancel/ghost to its left.

---

## 4. The detail / entity page (master + drawer)

Used when you open one record from a list (a case, a tenant, a policy).

```
PageContainer
|
|  PageHeader   (record name as title, status chip, record-level actions)
|
|  two-column or tabbed body:
|     left/main: the record's detail cards
|     right/aside: metadata, activity, related items
```

- For "peek without leaving the list", use `Drawer` / `EntityDrawer` (orbit-ui) that slides over the list, rather than a full navigation.
- One modal/drawer open at a time. Never nest.

---

## 5. The dashboard / overview page

Used for landing dashboards (finance dashboard, team monitor).

```
PageContainer
|
|  PageHeader
|
|  MetricGrid      (the headline numbers)
|
|  grid of cards:  charts, live activity, breakdowns
|                  (use a 12-col mental grid; cards span 4 / 6 / 8 / 12)
```

- Lead with the KPI row, then compose cards beneath on a 12-column grid.
- Keep each card to one idea. A busy dashboard is a set of simple cards, not one dense card.

---

## 6. Empty, loading, and error states (do not skip these)

Every data surface needs all three designed, not just the happy path. orbit-ui has primitives for each:

- **EmptyState**: first-run or no-results. Icon + short line + a primary action.
- **Loading**: skeletons in the DataPanel, or the Spinner for small areas. Do not shift layout when data arrives.
- **ErrorState**: what went wrong + a retry. Never leave a blank panel.

---

## 7. Spacing, grid, and tokens (the non-negotiables)

- **Page padding:** 32px (`p-8`) on the PageContainer.
- **Section gaps:** 32px between major sections (header, metrics, data), 20px above the data panel.
- **Card gaps:** 20px (`gap-5`) in grids.
- **Radii:** panels use `--orbit-radius-panel`; controls use `--orbit-radius-control`. Do not invent radii.
- **Elevation:** cards use `--orbit-elevation-card`, raised/hover uses `--orbit-elevation-raised`.
- **Color:** always tokens (`--ink-primary`, `--ink-muted`, `--border-default`, `--surface-page`, `--orbit-brand-primary`, status tokens). Never a raw hex in a layout.
- **Type:** page title 28px bold, section/card title ~16px semibold, body 14px, muted labels 14px medium. Metric value 26px bold.
- **Touch target:** controls respect `--orbit-min-touch`.

---

## 8. Accessibility baseline (every page)

- Skip-link is the first focusable element (already in the shell).
- One `<h1>` per page (the PageHeader title). Headings descend in order.
- Main content region is `#main`.
- Every interactive control has a visible focus ring (`--orbit-focus-ring`), never removed.
- Search and icon-only buttons have accessible labels.

---

## 9. Quick decision guide

| You are designing... | Use pattern |
|---|---|
| A list of records to manage | 2. Standard list page |
| A settings or create/edit screen | 3. Contained / form page |
| A single record's detail view | 4. Detail / entity page |
| A landing overview with numbers and charts | 5. Dashboard page |
| Any data surface | add 6. empty / loading / error states |

Start from the closest pattern, then remove blocks you do not need. Do not add a new page skeleton. If a screen genuinely does not fit any of these, flag it rather than inventing a one-off layout.
