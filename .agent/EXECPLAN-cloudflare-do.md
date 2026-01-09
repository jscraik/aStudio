# Cloudflare Template: Migrate ChatUIWidgetServer to Durable Object

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This plan follows `.agent/PLANS.md`.

## Purpose / Big Picture

Migrate `packages/cloudflare-template` from instantiating `ChatUIWidgetServer` on every `/mcp` request to running the MCP server inside a Cloudflare Durable Object (DO). This aligns configuration with runtime behavior, reduces per-request initialization work, and enables future stateful behavior (caching, sessions, storage) without changing the external HTTP API.

Success is visible by starting `wrangler dev`, calling `GET /mcp` and `POST /mcp` MCP methods successfully, and confirming tools remain discoverable (including tool `_meta` such as `openai/outputTemplate`).

## What is a Durable Object (plain language)

A Cloudflare Durable Object is a single, named instance of code that Cloudflare keeps "sticky" to one location at a time, with a consistent identity and access to durable storage. Requests can be routed to that instance by ID. This is useful when you want one place to keep shared server state (or per-session state) instead of rebuilding it for every request.

In this migration, the DO owns one `ChatUIWidgetServer` instance and forwards requests to it.

## Progress

- [x] (2026-01-09T00:45Z) Created ExecPlan for migrating `ChatUIWidgetServer` to a Durable Object.
- [ ] (TBD) Confirm DO routing strategy (singleton vs session-keyed) and document final choice.
- [ ] (TBD) Update `wrangler.jsonc` to add DO binding `WIDGET_SERVER` and migrations for `ChatUIWidgetServerDO`.
- [ ] (TBD) Update `src/worker/index.ts` to export `ChatUIWidgetServerDO` and route `/mcp` requests through the DO stub.
- [ ] (TBD) Update `packages/cloudflare-template/README.md` to match DO-backed architecture.
- [ ] (TBD) Run validation commands; record results and any issues.

## Surprises & Discoveries

- Observation: (none yet)
  Evidence: (none yet)

## Decision Log

- Decision: Use binding name `WIDGET_SERVER` and DO class name `ChatUIWidgetServerDO`.
  Rationale: Explicit, short binding name that matches repo naming conventions; class name clarifies purpose.
  Date/Author: TBD / Codex

- Decision: Route `/mcp` to a singleton DO instance using `idFromName("default")` (initial migration).
  Rationale: Minimal scope and no need to introduce a session ID contract; can be upgraded later to session-keyed routing if required.
  Date/Author: TBD / Codex

- Decision: Keep `ChatUIWidgetServer` as the core protocol handler; add a thin DO wrapper that owns initialization and delegates to `handleMcpRequest`.
  Rationale: Minimal code churn; preserves existing MCP behavior, security headers, and tool/resource registration patterns.
  Date/Author: TBD / Codex

## Outcomes & Retrospective (complete after execution)

- Expected outcome: `/mcp` is handled by `ChatUIWidgetServerDO`, asset serving via `ASSETS` remains unchanged, and MCP responses are unchanged except for lifecycle/initialization behavior.
- Unexpected regressions: (TBD)
- Follow-ups: (TBD)

## Context and Orientation

### Current state (pre-migration)

- `packages/cloudflare-template/src/worker/index.ts`
  - Defines `ChatUIWidgetServer` with `init()` that registers widget resources and example tools from `widgetManifest`.
  - Worker `fetch()` routes `/mcp` to `ChatUIWidgetServer.serve(request, env)` which constructs a new server per request.

- `packages/cloudflare-template/wrangler.jsonc`
  - Defines `ASSETS` binding for `./dist/client`.
  - Does not currently declare Durable Objects bindings/migrations.

### Target state (post-migration)

- `wrangler.jsonc` declares a Durable Object binding named `WIDGET_SERVER` with class `ChatUIWidgetServerDO`, plus a migration tag introducing that class.
- `index.ts` exports `ChatUIWidgetServerDO`.
- Worker `fetch()` routes `/mcp` to the DO stub `env.WIDGET_SERVER.get(id).fetch(request)`.
- Tools remain discoverable via `GET /mcp` and `tools/list` responses, including tool `_meta` fields (needed for widget output templates).

## Plan of Work

1) Update `packages/cloudflare-template/wrangler.jsonc` to define DO binding and migrations.
2) Update `packages/cloudflare-template/src/worker/index.ts` to implement `ChatUIWidgetServerDO` and route `/mcp` through the DO.
3) Update `packages/cloudflare-template/README.md` to document DO-backed runtime architecture and any developer workflow implications.
4) Run validation and record results.

## Concrete Steps

### Step 1 — Update `packages/cloudflare-template/wrangler.jsonc`

Goal: Declare DO binding and migration so the runtime environment matches the code.

Edits:
- Add:
  - `durable_objects.bindings[]` with `{ name: "WIDGET_SERVER", class_name: "ChatUIWidgetServerDO" }`
  - `migrations[]` with an initial tag (e.g. `v1`) declaring `new_classes: ["ChatUIWidgetServerDO"]`

Acceptance for this step:
- `wrangler types` runs without schema errors.
- `wrangler dev` starts without complaining about missing DO bindings/classes.

### Step 2 — Update `packages/cloudflare-template/src/worker/index.ts`

Goal: Move MCP server lifecycle into a Durable Object and keep the external API stable.

Edits:
- Update the `Env` interface to include:
  - `WIDGET_SERVER: DurableObjectNamespace`
- Add an exported class `ChatUIWidgetServerDO`:
  - Constructor `(state: DurableObjectState, env: Env)`
  - Owns a `ChatUIWidgetServer` instance
  - Ensures `init()` is executed once (use an `initPromise` guard)
  - Implements `fetch(request)` delegating to `server.handleMcpRequest(request)`
- Update the default `fetch` handler to route `/mcp` through the DO stub:
  - `const id = env.WIDGET_SERVER.idFromName("default")`
  - `return env.WIDGET_SERVER.get(id).fetch(request)`
- Keep `/src/*` and `/assets/*` routing to `env.ASSETS.fetch(request)` unchanged.

Notes:
- Keep tool discovery responses unchanged and ensure tool `_meta` remains included in:
  - `GET /mcp` capabilities response
  - `POST /mcp` with `{"method":"tools/list"}` response

Acceptance for this step:
- `GET /mcp` returns JSON with `resources[]` and `tools[]` (including `_meta` when present).
- `POST /mcp` `tools/list` returns the same tool set (including `_meta`).

### Step 3 — Update `packages/cloudflare-template/README.md`

Goal: Ensure documentation matches the DO-backed implementation.

Edits:
- In configuration/features sections that mention Durable Objects:
  - Clarify that the MCP server runs inside a Durable Object (`ChatUIWidgetServerDO`) via binding `WIDGET_SERVER`.
  - Clarify that DO storage is available for future use (if not used yet, say so explicitly).
- Keep existing dev workflow guidance accurate:
  - `pnpm dev` runs `prebuild` before `wrangler dev` so widget assets and the generated manifest exist.

Acceptance for this step:
- README no longer describes an architecture that differs from actual runtime routing.

## Validation and Acceptance

Run from repo root.

Required commands:
- `pnpm -C packages/cloudflare-template prebuild`
- `pnpm -C packages/cloudflare-template typecheck`
- `pnpm -C packages/cloudflare-template cf-typegen`
- `pnpm -C packages/cloudflare-template dev`

Manual verification (while `pnpm -C packages/cloudflare-template dev` is running):
- `GET http://localhost:8787/mcp`
  - Confirms capabilities JSON
  - Confirms tools include `_meta` (when defined), especially `openai/outputTemplate`
- `POST http://localhost:8787/mcp` with JSON body `{ "method": "tools/list" }`
  - Confirms tools list and `_meta`
- Request a known widget asset path under `/src/...` or `/assets/...` and confirm a 200 response via `ASSETS`.

Optional (stronger confidence):
- `pnpm -C packages/cloudflare-template check`

Acceptance criteria:
- Dev server starts successfully.
- `/mcp` works through the DO binding with correct responses.
- Tool discovery includes `_meta` for widget output templates.
- Asset routes still serve widget files.

## Idempotence and Recovery

- These changes are deterministic and safe to re-run.
- Rollback plan:
  - Revert `/mcp` routing in worker `fetch()` to per-request `ChatUIWidgetServer.serve(request, env)`.
  - Remove `durable_objects` and `migrations` sections from `wrangler.jsonc`.
- Migration discipline:
  - After first deploy, do not rewrite old migrations; add a new migration tag for future DO class changes.

## Risks / Edge Cases

- Singleton DO throughput: All `/mcp` traffic goes to one DO instance. Mitigation: later introduce session-keyed DO routing using a stable session ID if needed.
- Initialization behavior change: `init()` runs once per DO lifecycle instead of once per request. Mitigation: ensure `init()` remains idempotent and does not assume per-request freshness.
- Binding mismatch: If `wrangler.jsonc` and deployed bindings diverge, `/mcp` will fail. Mitigation: keep `cf-typegen` and local `wrangler dev` as required checks in this plan.