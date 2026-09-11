# @365assistance/orbit-ui

The shared React component library for 365 Assistance — the canonical Orbit365 design-system primitives, with **Storybook** as the visual surface for viewing and managing them.

**Canonical source:** the `renewal-portal` `src/components/ui/` primitives. This library is the one true home; apps consume it instead of keeping their own copies, so what you see in Storybook is exactly what ships.

---

## What's inside

- **24 primitives** (React + Radix + Tailwind v4 + CVA), each styled from Orbit tokens.
- **Storybook** — the visual catalogue / view-and-manage surface.
- **Rollup** build → ESM + CJS + `.d.ts` type declarations.
- **Token layer** (`dist/styles.css`) — consumers import once at app root.

### Components
Accordion · Alert · Badge · Breadcrumb · Button · Card · DateTimePicker · Dialog · EmptyState · ErrorState · FieldHelp · Input · Label · Pill · PortalSelect · SearchInput · Select · SegmentedControl · Separator · Spinner · Table · Tabs · Toast · Tooltip

> **Deliberately excluded:** `NativeSelect`. Design rule (Sofia, 2026-09-11): dropdowns are **always** on-brand styled — never a raw native `<select>`. Use `Select` or `PortalSelect`.

---

## Scripts

```bash
npm install
npm run storybook        # dev Storybook on :6006
npm run build            # Rollup → dist/ (ESM + CJS + types + styles.css)
npm run build-storybook  # static Storybook → storybook-static/
npm run typecheck        # tsc --noEmit
```

## Consuming it

Published to **GitHub Packages** (private, `365assistance` org). Consumers need an `.npmrc` pointing the scope at the GitHub registry:

```
# .npmrc
@365assistance:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}   # a token with read:packages
```

```bash
npm install @365assistance/orbit-ui
```

```tsx
// once, at app root:
import '@365assistance/orbit-ui/styles.css'

// anywhere:
import { Button, Card, Dialog } from '@365assistance/orbit-ui'
```

> **Styling requirement:** these primitives are styled with **Tailwind v4** + the Orbit semantic-token layer. A consuming app needs Tailwind v4 and to import `styles.css`. `orbit-core-ui` is currently on Tailwind v3 — it must migrate to v4 before it can render these correctly. (That's the next phase, tracked separately.)

## Notes / decisions

- **Router-agnostic Breadcrumb:** the library never depends on a router. `Breadcrumb` takes a `linkComponent` prop (pass react-router's `Link`, Next's `Link`, etc.); falls back to a plain `<a>`.
- **Three select-family primitives** (`Select` Radix, `PortalSelect` custom-portalled) carried over as-is. Candidate for consolidation later.
- **`shadcn` + `tw-animate-css`** are devDeps only, needed so Storybook resolves the token CSS `@import`s.

## Publishing

Publishing is automated via GitHub Actions (`.github/workflows/publish.yml`). The org forbids classic PATs for Packages, so CI uses the built-in `GITHUB_TOKEN`. To cut a release:

```bash
# bump version in package.json, commit, then:
git tag vX.Y.Z && git push origin vX.Y.Z
```

The workflow typechecks, builds, and publishes. (Or run it manually via `workflow_dispatch`.)

## Status

**Published:** `@365assistance/orbit-ui@0.1.0` (GitHub Packages, private). 24 components, 68 Storybook stories. Storybook live at https://archer.tail045ab7.ts.net/orbit-ui/ .

Next: migrate `orbit-core-ui` to Tailwind v4 + semantic tokens so it can consume this library, then point the tenants page at these primitives.
