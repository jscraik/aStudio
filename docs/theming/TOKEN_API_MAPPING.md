# Token API Mapping (Tailwind v4)

**Owner:** Jamie Scott Craik (@jscraik)  
**Last updated:** 2026-01-24  
**Scope:** How token names map to Tailwind utilities without changing token sources.

## Purpose

Provide a stable token API that components use via utilities (e.g., `bg-bg`, `text-fg`). The source of truth remains the DTCG token bundle.

## Source of Truth

- DTCG tokens: `packages/tokens/src/tokens/index.dtcg.json`
- Generated CSS variables: `packages/tokens/src/tokens.css`, `packages/tokens/src/foundations.css`
- Tailwind theme layer: `packages/ui/src/styles/theme.css`

## Mapping Rules

Tailwind v4 uses `@theme inline` variables to define utilities:

- `--color-*` → `bg-*`, `text-*`, `border-*`
- `--radius-*` → `rounded-*`
- `--shadow-*` → `shadow-*`
- `--spacing-*` → `p-*`, `m-*`, `gap-*`
- `--font-*` → `font-*`
- `--text-*` → `text-*`

The `@theme` values should reference runtime CSS variables (e.g., `--ds-bg`) so theme switching stays in `themes.css`/tokens CSS.

## Recommended Utilities (Examples)

- `bg-bg` / `text-fg` / `border-border`
- `bg-accent` / `text-accent-fg`
- `rounded-md` / `shadow-sm`

## Where Theme Values Live

Use CSS variables for runtime theme switching (light/dark):

- `:root` for default theme
- `[data-theme="dark"]` for dark theme overrides

## Do Not

- Do not hardcode hex values in components.
- Do not redefine token sources in app CSS.
- Do not bypass `@theme` mappings for system-level tokens.
