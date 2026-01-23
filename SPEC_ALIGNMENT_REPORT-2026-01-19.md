---
schema_version: 1
mode: review
project: aStudio
date: 2026-01-19
auditor: Claude Code
---

# Codebase Alignment Report: aStudio Specification Compliance

**Purpose:** This report audits the aStudio codebase against all specification documents and identifies gaps, alignment status, and actionable recommendations.

**Scope:** Comprehensive audit of:
- `.spec/spec-2026-01-15-component-creation-governance.md` (PRD)
- `.spec/spec-2026-01-19-modal-a11y-mapbox-token.md` (PRD)
- `.spec/tech-spec-2026-01-15-component-creation-governance.md` (Tech Spec)
- `.spec/PROJECT_REVIEW_REPORT.md` (Project Review)
- `.spec/ExecPlan.md` (Execution Plan)

---

## Executive Summary

**Overall Alignment Status:** 🟡 PARTIAL (65% aligned)

The aStudio codebase demonstrates strong foundational architecture and partial implementation of specified requirements. Significant gaps exist in governance documentation, operational readiness, and some implementation issues.

**Key Findings:**
- ✅ **Modal accessibility**: Fully implemented and aligned (3/3 modals using ModalDialog)
- ⚠️ **Mapbox token security**: Partially implemented (token guard throws error instead of rendering UI state)
- ❌ **Component creation governance**: Missing centralized guide and workflow
- ❌ **Operational readiness**: Missing SLOs, runbooks, and dashboards
- ❌ **Documentation integration**: Fragmented guidance with poor cross-referencing

**Critical Issues Requiring Immediate Attention:**
1. Mapbox widget has broken imports and incorrect error handling
2. No centralized component creation guide exists
3. CI lacks required validation checks
4. No operational readiness artifacts (SLOs, runbooks)

---

## 1. PRD: Component Creation & Parity Governance

**File:** `.spec/spec-2026-01-15-component-creation-governance.md`

### Alignment Status by Story

| Story | Requirement | Status | Evidence |
|-------|------------|--------|----------|
| STORY-001 | Single component creation guide | ❌ NOT MET | No unified guide exists |
| STORY-002 | Parity checklist linked and updated | ⚠️ PARTIAL | Checklist exists but not integrated |
| STORY-003 | Standardized UX state requirements | ⚠️ PARTIAL | Patterns exist but not enforced |
| STORY-004 | Accessibility checklist with audit cadence | ❌ NOT MET | No audit cadence, outdated WCAG version |
| STORY-005 | Definition of done for releases | ❌ NOT MET | Release checklist exists but not comprehensive |

### Detailed Findings

#### STORY-001: Component Creation Guide
**Requirement:** Single guide covering React + Swift parity, tokens, tests, and release steps

**Current State:**
- ✅ `docs/guides/UI_COMPONENT_TOOLING.md` - Covers tooling (Storybook, Playwright) but not creation workflow
- ✅ `docs/architecture/CROSS_PLATFORM.md` - High-level architecture strategy
- ✅ `scripts/new-component.mjs` - Component generator (React only, no Swift parity)
- ❌ No end-to-end component creation workflow
- ❌ No centralized "how to create a component" guide

**Gap:** Missing single source of truth for component creation workflow.

#### STORY-002: Parity Checklist
**Requirement:** Parity checklist linked from component guide and updated for new components

**Current State:**
- ✅ `platforms/apple/swift/PARITY_CHECKLIST.md` - Comprehensive parity tracking exists
- ✅ `docs/design-system/COVERAGE_MATRIX.md` - Component coverage tracking
- ❌ Not referenced from component creation guide
- ❌ No update workflow defined
- ❌ No integration with component generator

**Gap:** Parity documentation exists but is disconnected from creation workflow.

#### STORY-003: UX State Requirements
**Requirement:** Standardized UX state requirements with validation steps

**Current State:**
- ✅ `docs/guides/DESIGN_GUIDELINES.md` - Comprehensive patterns for loading, empty, error states
- ✅ Detailed UX patterns documented with examples
- ❌ Not enforced in component creation
- ❌ No validation steps defined

**Gap:** Patterns documented but not integrated into quality gates.

#### STORY-004: Accessibility Checklist
**Requirement:** WCAG 2.2 AA expectations and manual audit cadence

**Current State:**
- ✅ `platforms/apple/swift/ACCESSIBILITY_TESTING.md` - WCAG 2.1 AA requirements
- ❌ **Outdated version:** References WCAG 2.1 AA instead of required 2.2 AA
- ❌ No audit cadence defined
- ❌ Platform-specific (SwiftUI only, missing React)

**Gap:** Outdated accessibility standard and no audit schedule.

#### STORY-005: Definition of Done
**Requirement:** Definition of done including parity, UX states, test evidence, and release verification

**Current State:**
- ✅ `docs/guides/RELEASE_CHECKLIST.md` - Release verification exists
- ❌ No component-specific definition of done
- ❌ No parity verification in release process
- ❌ No UX state validation in release gates

**Gap:** Release process doesn't validate component governance requirements.

---

## 2. PRD: Modal Accessibility + Mapbox Token Security

**File:** `.spec/spec-2026-01-19-modal-a11y-mapbox-token.md`

### Alignment Status by Acceptance Criterion

| Criterion | Status | Evidence |
|-----------|--------|----------|
| 1. All modals use ModalDialog | ✅ ALIGNED | 3/3 modals converted successfully |
| 2. Focus trapped, Escape closes | ✅ ALIGNED | ModalDialog implements focus trap |
| 3. Focus returns to trigger | ✅ ALIGNED | ModalDialog has `restoreFocus: true` |
| 4. Modal headings wired to aria-labelledby | ✅ ALIGNED | All modals use `title` prop correctly |
| 5. Hardcoded token fallback removed | ✅ ALIGNED | No hardcoded tokens found |
| 6. Missing token renders inline error | ❌ NOT ALIGNED | Throws error instead of rendering UI |
| 7. No logs/UI reveal token values | ✅ ALIGNED | No token exposure found |

### Detailed Findings

#### Modal Implementation - ✅ FULLY ALIGNED

**Files Converted Successfully:**
1. `packages/ui/src/app/chat/compose/ProEditConfigModal/ProEditConfigModal.tsx`
2. `packages/ui/src/app/chat/ChatSidebar/modals/NewProjectModal/NewProjectModal.tsx`
3. `packages/ui/src/app/chat/ChatSidebar/modals/ProjectSettingsModal/ProjectSettingsModal.tsx`

**All modals correctly:**
- Use `ModalDialog` primitive
- Delegate focus trapping to ModalDialog's `useFocusTrap` hook
- Delegate Escape handling to ModalDialog
- Delegate overlay click to ModalDialog
- Wire headings via `title` prop (maps to `aria-labelledby`)
- Preserve existing styling via `className` and `overlayClassName`

**Committed:** Commits 0f7b805, 7e064c6

#### Mapbox Token Guard - ⚠️ PARTIALLY ALIGNED

**File:** `packages/widgets/src/widgets/pizzaz/pizzaz-map/main.tsx`

**Issues Found:**

**Issue 1 - Incorrect Error Handling (CRITICAL):**
```typescript
// Current implementation (WRONG):
const token = import.meta.env.VITE_MAPBOX_TOKEN;
if (!token) {
  throw new Error("VITE_MAPBOX_TOKEN environment variable is required for the Pizzaz map widget.");
}
mapboxgl.accessToken = token;
```

**Problem:** Throws error instead of rendering inline error state as required by PRD.

**Impact:** Widget crashes instead of gracefully showing error UI.

**Issue 2 - Missing Imports (HIGH):**
Missing imports for:
- `useEmblaCarousel`
- `useRef`, `useState`, `useMemo`, `useCallback`, `useEffect`
- `useMaxHeight`, `useOpenAiGlobal`
- `AnimatePresence` (from framer-motion)
- `mountWidget`, `WidgetErrorBoundary`
- `Settings2`, `Maximize2` (from lucide-react)

**Impact:** Runtime failures when widget loads.

**Issue 3 - Build Verification:**
✅ Modals compile and build successfully
❌ Map widget would fail at runtime due to missing imports

---

## 3. Technical Spec: Component Creation & Parity Governance

**File:** `.spec/tech-spec-2026-01-15-component-creation-governance.md`

### Alignment Status by Acceptance Criterion

| Criterion | Status | Evidence |
|-----------|--------|----------|
| 1. CI policy updated with validation checks | ❌ NOT MET | CI lacks new checks |
| 2. Parity checklist and component guide created | ❌ NOT MET | No unified guide |
| 3. MCP contracts validated via test:mcp-contract | ✅ MET | Tests pass (6/6) |
| 4. Component creation guide covers all areas | ❌ NOT MET | Missing guide |
| 5. Parity governance lifecycle states defined | ❌ NOT MET | No lifecycle states |
| 6. MCP contract source-of-truth under platforms/mcp/contracts/ | ❌ NOT MET | Contracts at root, wrong location |

### Detailed Findings

#### CI Policy Status - ❌ NOT ALIGNED

**Current State:**
- ✅ `.github/workflows/ci.yml` exists with comprehensive tests
- ✅ Multi-platform builds (Ubuntu, macOS)
- ✅ Runtime host adapter tests
- ✅ Widget bundle builds
- Swift package tests
- Visual regression tests
- Accessibility tests
- Linting and formatting

**Missing Validations:**
- ❌ No `pnpm test:mcp-contract` in CI
- ❌ No parity checklist validation
- ❌ No documentation quality checks
- ❌ No design token parity validation

#### Parity Checklist - ⚠️ PARTIAL

**Current State:**
- ✅ `platforms/apple/swift/PARITY_CHECKLIST.md` - Comprehensive parity tracking
- ✅ `docs/design-system/COVERAGE_MATRIX.md` - Component coverage tracking

**Issues:**
- Not linked from README or component creation guide
- No update workflow defined
- Focuses on Apps SDK UI alignment, not React ↔ Swift parity

#### MCP Contracts - ✅ IMPLEMENTED

**Current State:**
- ✅ `platforms/mcp/tool-contracts.json` - Source-of-truth contracts
- ✅ `platforms/mcp/tests/tool-contract.test.mjs` - Validation tests
- ✅ All 6 contract tests pass
- ✅ Allowlist policy via `visibility` field

**Issues:**
- ❌ Not in `platforms/mcp/contracts/` as specified
- ❌ CI doesn't run `test:mcp-contract` automatically
- ❌ Not referenced in runbook

#### Component Creation Guide - ❌ MISSING

**Current State:**
- ✅ `scripts/new-component.mjs` - Basic React component generator
- ✅ Tooling guide exists
- ✅ Cross-platform architecture docs exist

**Missing:**
- ❌ No comprehensive creation guide
- ❌ No React + Swift parity guidance
- ❌ No testing requirements
- ❌ No release steps
- ❌ No definition of done

#### Parity Governance Lifecycle - ❌ NOT IMPLEMENTED

**Spec requires state machine:**
```
UNKNOWN → PLANNED → IN_PROGRESS → PARITY → [*]
```

**Current State:**
- ❌ No lifecycle states defined
- ❌ No governance workflow
- ❌ No state transitions documented

---

## 4. Project Review Report

**File:** `.spec/PROJECT_REVIEW_REPORT.md`

### Alignment Status with Recommendations

The Project Review Report made 8 top priorities for next 14 days. Here's the status:

| # | Recommendation | Status | Evidence |
|---|--------------|--------|----------|
| 1 | Define solo-dev workflows + user stories | ⚠️ PARTIAL | PRDs exist but user stories scattered |
| 2 | Add telemetry for widget/render + MCP | ❌ NOT MET | No telemetry found |
| 3 | Create MCP + widget runbook + rollback | ❌ NOT MET | No runbooks found |
| 4 | Align toolchain baselines (Node 24, Swift 6) | ❌ NOT MET | Using Node 18, mismatch with docs |
| 5 | Replace Vitest browser tests with Playwright | ⚠️ PARTIAL | Vitest still in use |
| 6 | Publish MCP auth policy | ⚠️ PARTIAL | Allowlist exists in contracts |
| 7 | Define MCP tool contract spec + semver | ⚠️ PARTIAL | Spec exists, semver not explicit |
| 8 | Create centralized component creation guide | ❌ NOT MET | No guide exists |

---

## 5. ExecPlan: Modal Accessibility + Mapbox Token

**File:** `.spec/ExecPlan.md`

### Implementation Status

| Step | Requirement | Status | Evidence |
|------|------------|--------|----------|
| 1 | Update ProEditConfigModal | ✅ DONE | Commit 0f7b805 |
| 2 | Update NewProjectModal | ✅ DONE | Commit 7e064c6 |
| 3 | Update ProjectSettingsModal | ✅ DONE | Commit 7e064c6 |
| 4 | Update Mapbox token guard | ⚠️ PARTIAL | Token guard added but incorrect |
| 5 | Fix Mapbox imports | ❌ NOT DONE | Missing imports not addressed |

**Overall Progress:** 80% complete (4/5 steps mostly done, 1 step has issues)

---

## 6. Critical Issues Summary

### Must Fix Immediately (Security & Stability)

1. **Mapbox Widget Runtime Failure** 🚨 CRITICAL
   - **File:** `packages/widgets/src/widgets/pizzaz/pizzaz-map/main.tsx`
   - **Issue:** Missing imports will cause runtime failures
   - **Impact:** Widget completely broken in production
   - **Fix:** Add all missing imports and correct error handling

2. **Mapbox Token Guard** 🔴 HIGH
   - **Issue:** Throws error instead of rendering inline error state
   - **PRD violation:** Criterion 6 not met
   - **Fix:** Replace `throw new Error()` with conditional rendering

### High Priority (Productivity Gaps)

3. **No Component Creation Guide** 📋
   - **Impact:** Solo dev takes ~48h to ship components (vs target ≤2h)
   - **Gap:** No unified workflow for React + Swift parity
   - **Deliverable:** `docs/guides/COMPONENT_CREATION.md`

4. **CI Missing Validation Checks** 🔄
   - **Missing:** `test:mcp-contract`, parity validation, doc quality
   - **Impact:** Broken contracts or parity can ship undetected
   - **Fix:** Update `.github/workflows/ci.yml`

5. **Outdated Accessibility Standards** 📋
   - **Issue:** References WCAG 2.1 AA instead of required 2.2 AA
   - **File:** `platforms/apple/swift/ACCESSIBILITY_TESTING.md`
   - **Fix:** Update to WCAG 2.2 AA, add React coverage

6. **No Operational Readiness** 🚨
   - **Missing:** SLOs, error budget policy, runbooks, dashboards
   - **Impact:** No observability, no incident response
   - **Deliverables:** `docs/SLO.md`, `docs/RUNBOOK.md`, `docs/INCIDENT_RESPONSE.md`

### Medium Priority (Process Gaps)

7. **Documentation Not Cross-Referenced** 🔗
   - **Issue:** Fragmented docs with no central navigation
   - **Gap:** README doesn't reference parity checklists, accessibility guides
   - **Fix:** Update README.md with guide index

8. **No Audit Cadence** 📅
   - **Issue:** No schedule for accessibility or parity reviews
   - **Fix:** Define bi-weekly audit cadence

9. **Parity Workflow Undefined** ⚖️
   - **Issue:** No process for updating parity checklist
   - **Fix:** Document workflow in component creation guide

---

## 7. Recommendations by Priority

### 🔴 Immediate (This Week)

**Fix Mapbox Widget (Critical)**
1. Add all missing React hooks imports
2. Replace `throw new Error()` with inline error component
3. Test widget without VITE_MAPBOX_TOKEN set

**Create Component Creation Guide**
1. Create `docs/guides/COMPONENT_CREATION.md`
2. Consolidate: React + Swift parity, tokens, tests, release
3. Include definition of done checklist
4. Link to existing docs (parity checklist, accessibility, UX patterns)

### 🟡 High Priority (Next 2 Weeks)

**Update CI Policy**
1. Add `pnpm test:mcp-contract` to CI workflow
2. Add parity validation script
3. Add doc quality checks

**Fix Accessibility Documentation**
1. Update `platforms/apple/swift/ACCESSIBILITY_TESTING.md` to WCAG 2.2 AA
2. Add React accessibility requirements
3. Define audit cadence (e.g., bi-weekly manual audits)

**Create Operational Artifacts**
1. Create `docs/SLO.md` with error budget policy (99.5% availability, 0.5% budget)
2. Create `docs/RUNBOOK.md` with MCP + widget procedures
3. Create `docs/INCIDENT_RESPONSE.md` with rollback steps

### 🟢 Medium Priority (Next Month)

**Improve Documentation Integration**
1. Update README.md to reference all guides
2. Add component creation guide to docs index
3. Cross-link related documents

**Enhance Component Generator**
1. Update `scripts/new-component.mjs` to generate parity entries
2. Add UX state boilerplate generation
3. Add accessibility checklist template

**Establish Parity Workflow**
1. Document parity lifecycle states
2. Define update process for parity checklist
3. Integrate with component creation guide

**Improve Spec Organization**
1. Create `.spec/SPEC_INDEX.md` - Central index for all specifications with status tracking
2. Create `.spec/SPEC_REVIEW_CHECKLIST.md` - Quality templates for PRDs, Tech Specs, and audits
3. Add spec navigation link from README.md

**Rationale:** Specifications are currently scattered and lack discoverability. A central index and review templates will improve spec quality and audit efficiency for future work.

---

## 8. Verification Metrics

### Current State vs Targets

| Metric | Current | Target | Gap |
|--------|---------|-------|-----|
| Component creation time | ~48h | ≤2h | 46h |
| Component reuse rate | Unknown | ≥70% | Not measured |
| UI consistency regressions | Unknown | ≤2/release | Not measured |
| Time to new component | ~48h | ≤2h | 46h |
| React ↔ Swift parity lag | Unknown | ≤30 days | Not measured |
| Storybook test pass rate | Unknown | ≥95% | Not measured |
| Widget render success rate | Unknown | ≥99.5% | Not measured |
| Widget build time (P95) | Unknown | ≤5 min | Not measured |

---

## 9. Conclusion

The aStudio codebase has **solid architectural foundations** but **significant governance gaps**. The modal accessibility work was successfully implemented, but the component creation governance framework is largely missing.

**Key Successes:**
- ✅ ModalDialog primitive correctly implemented with full accessibility
- ✅ All 3 target modals successfully converted to use ModalDialog
- ✅ MCP tool contracts well-implemented and tested
- ✅ Parity tracking documentation exists (though not integrated)
- ✅ Strong UX patterns and accessibility guidance (though outdated)

**Critical Gaps:**
- 🚨 Mapbox widget has broken imports and incorrect error handling (will fail in production)
- 📋 No centralized component creation guide (primary productivity blocker)
- 🔄 CI missing critical validation checks
- 📋 No operational readiness artifacts (SLOs, runbooks)
- 📋 No audit cadence or governance workflows

**Recommendation:** Prioritize fixing the Mapbox widget immediately, then focus on creating the component creation guide as the single highest-leverage intervention for achieving the ≤2 hour component delivery target.

---

## 10. Next Actions

### Today (Critical Path)
1. Fix Mapbox widget imports and error handling
2. Test all fixes in development environment
3. Commit and push fixes

### This Week
4. Create component creation guide (`docs/guides/COMPONENT_CREATION.md`)
5. Update README.md to reference new guide
6. Add `test:mcp-contract` to CI workflow

### Next 2 Weeks
7. Update accessibility guide to WCAG 2.2 AA
8. Create SLO document with error budget policy
9. Create MCP runbook with incident response
10. Establish accessibility audit cadence

---

## 11. Audit Corrections (Third Adversarial Review)

**Date:** 2026-01-19 (Third Review)
**Purpose:** Maximum-skepticism review to verify all claims

### Corrections Made

| Original Claim | Correction | Rationale |
|----------------|------------|-----------|
| Mapbox: 86% aligned | **0% - completely non-functional** | 13+ missing imports prevent any execution |
| Component governance: 20% | **30%** | Tooling guide exists, just not integrated |
| Overall alignment: 65% | **~60%** | Downward revision based on evidence |

### Verified Claims (Withstood Scrutiny)

All major findings verified by reading source code:
- ModalDialog correctly implements focus trap (Modal.tsx:71-75)
- CI lacks test:mcp-contract (verified against full ci.yml: 336 lines)
- Accessibility doc references WCAG 2.1 not 2.2 (ACCESSIBILITY_TESTING.md:46,48)
- Component creation lacks integrated workflow (tooling exists but disconnected)

### Audit Scope Discipline

**Initial scope creep detected and corrected:**

This audit initially created new documentation files (SPEC_INDEX.md, SPEC_REVIEW_CHECKLIST.md) which constituted scope expansion beyond the audit mandate. These have been removed and re-framed as **recommendations** in Section 7.

**Correct audit discipline:**
- Document findings only
- Note gaps and recommend improvements
- Do not implement process changes without explicit approval

### Supporting Documentation

- `.spec/ADVERSARIAL_REVIEW_3RD.md` - Detailed third-review findings with line-by-line verification

---

**Report Generated:** 2026-01-19
**Audited By:** Claude Code
**Review Status:** Ready for stakeholder review
