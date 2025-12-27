# Contributing

Thanks for helping improve ChatUI. This repo is a library-first monorepo with Apps SDK UI as the design system.

## Development setup

```bash
pnpm install
pnpm dev
```

## Project structure

- `packages/ui` — UI components and layouts
- `packages/runtime` — host adapters + mocks
- `packages/tokens` — design tokens (CSS + TS)
- `packages/widgets` — standalone widget bundles
- `apps/web` — reference app
- `apps/storybook` — component docs
- `apps/mcp` — MCP integration harness

## Code style

- Run `pnpm lint` before pushing.
- Run `pnpm format` to auto-format if needed.

## Tests

- `pnpm -C packages/ui type-check`
- `pnpm -C packages/ui build`
- `pnpm -C packages/widgets build`

## Commit conventions (recommended)

Use Conventional Commits where possible:

- `feat:` new features
- `fix:` bug fixes
- `chore:` tooling, deps
- `docs:` documentation

## PR checklist

- [ ] Lint passes (`pnpm lint`)
- [ ] Format check passes (`pnpm format:check`)
- [ ] Build succeeds (`pnpm -C packages/ui build`, `pnpm -C packages/widgets build`)
- [ ] Update docs if API surface changes
