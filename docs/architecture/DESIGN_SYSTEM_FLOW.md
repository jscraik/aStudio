# Design System Flow

**Owner:** Jamie Scott Craik (@jscraik)  
**Last updated:** 2026-01-24

```mermaid
flowchart LR
  A[DTCG tokens\npackages/tokens/src/tokens/index.dtcg.json] --> B[Generated CSS\npackages/tokens/src/tokens.css]
  B --> C[Theme layer\npackages/ui/src/styles/theme.css]
  C --> D[UI components\npackages/ui/src/components/**]
  D --> E[Apps\nplatforms/web/apps/web + widgets + storybook]
```

Notes:
- Tokens remain the source of truth; UI uses utilities mapped via `@theme inline`.
- Apps import Tailwind and token CSS at the entry stylesheet.
