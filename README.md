# AlgoQuest Qbit Education

[![SecuredMe Education Suite](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

![AlgoQuest banner](assets/brand-selected/algoquest-public-banner.png)

**Status:** `pre-alpha` / `in development`
**Version target:** local workspace module (`algoquest-ams-discovry-labs-module-`)
**License:** `Secured Educational License 2.0` (metadata `LicenseRef-SEL-2.0`)

`algoquest-ams-discovry-labs-module-` is a React + Vite educational module in the SecuredMe suite. It is a local, contract-driven runtime that exposes:

- student and teacher surfaces (`/student`, `/teacher`)
- a local Gateway-style install/consent control plane
- a Learning Lab built with interactive algorithm mini-modules
- docs support for accessibility and theme controls

The repo is intentionally split into **runtime app behavior**, **interop contracts**, and **documentation shell** so each domain can be reasoned about independently.

---

## Table of contents

- [Repository orientation](#repository-orientation)
- [How the app works](#how-the-app-works)
- [Directory map](#directory-map)
- [Contract model and local storage](#contract-model-and-local-storage)
- [Data flow](#data-flow)
- [UI behaviors in practice](#ui-behaviors-in-practice)
- [Learning lab modules](#learning-lab-modules)
- [Docs and accessibility shell](#docs-and-accessibility-shell)
- [Security and governance](#security-and-governance)
- [Run, build, and validate](#run-build-and-validate)
- [Current limits and known gaps](#current-limits-and-known-gaps)
- [Troubleshooting sync notes](#troubleshooting-sync-notes)

---

## Repository orientation

This module is designed as a small, deterministic React app with strict local boundaries:

- **No backend service calls are required** for core flows.
- All inter-tool data imports come from browser storage queues and strict schema checks.
- Every persisted contract uses explicit schema IDs + secret-protection heuristics.
- Surfaces can be toggled by URL and internal state:
  - `/student` for learner flow
  - `/teacher` for aggregate classroom planning
  - `/student-learning-lab` is not a route path; Lab is entered from in-app navigation via `Learning Lab`

Primary implementation status: pre-alpha prototype to validate interoperability patterns before broad rollout.

---

## How the app works

### 1) Surface bootstrap

`App.tsx` controls app-level mode:

- Detects surface from path: `/teacher` => `teacher`, otherwise defaults to `student`.
- Keeps `showLearningLab` local state to switch between:
  - `EducationHub` (default experience for both surfaces), and
  - section-based Learning Lab (when `Learning Lab` button is activated).
- Uses `SectionId` routing (`home`, `problem-types`, `build-algo`, `performance`, `paradigms`, `innovation`) in lab mode.

### 2) Entry and navigation

- `EducationHub` is the default view for both learner and teacher personas.
- In each surface:
  - a left rail displays contract badges, install path controls, and target-tool selection.
- Switching surface uses browser history (`pushState`), avoiding page reload.
- URL query params can hydrate default behavior:
  - `?tool=<slug>` => requested app in install queue
  - `?role=<student_minor|student_adult|teacher>` => initial role hint

### 3) Contract bootstrap and persistence

- `readInstallSequenceFromStorage` loads persisted gateway decisions at startup.
- The active install contract is updated by UI actions and persisted through `persistInstallSequence`.
- `validateGatewayContext` checks session-role compatibility and secret-like anomalies each render.
- Every render path uses safe defaults if persisted contracts are missing or invalid.

### 4) Teacher vs student split

- **Student surface (`/student`)**
  - shows validated algorithm artifact summary from VAD-like payload,
  - renders local metrics and install metrics rows,
  - exposes learner role selector (`student_minor`, `student_adult`),
  - renders Qbit companion panel and guardian prompt actions.

- **Teacher surface (`/teacher`)**
  - redacts raw learners and shows aggregate planning event + aggregate metrics,
  - shows install plan and connection queue status,
  - keeps planning context in non-identifying summary form.

---

## Directory map

### App/runtime

- `App.tsx`  
  - application shell, surface handling, section entry, and header shell in lab mode
- `index.tsx`  
  - React bootstrapping (StrictMode root render)
- `constants.ts`  
  - quiz questions, lab datasets, graph constants, greedy graph, and problem constants
- `components/education/EducationHub.tsx`  
  - dual-surface hub, contract snapshot pane, role selector, install controls, metrics + Qbit rendering
- `components/sections/*`  
  - interactive learning mini-modules
- `components/ui/*`  
  - simple shared primitives (`Card`, `NavButton`)

### Contracts and adapters

- `types.ts`
  - canonical domain model interfaces and enums for all local contracts
- `services/qbitCompanion.ts`
  - typed contract builders, validators, and helper formatters
- `services/educationInterop.ts`
  - localStorage ingress, schema filtering, and contract-based metric/event derivations
- `data/educationFixtures.ts`
  - fixture default payloads for fallback and local deterministic behavior

### Documentation and assets

- `docs/*`, `overrides/*`
  - MkDocs documentation site and themed UI customizations
- `qa/*`
  - smoke/screenshots of student and teacher states
- `assets/*`, `site/*`, `dist/*`
  - visual resources and build artifacts

---

## Contract model and local storage

### Core contract files

- `types.ts` defines these primary contracts:
  - `EducationSessionRole`
  - `StudentLearningEvent`
  - `GuardianArtifactPointer`
  - `TeacherPlanningEvent`
  - `EducationMetricsEnvelope`
  - `QbitIntervention`
  - `GatewayInstallSequence`

### Local storage keys

| Key | Producer/Consumer | Domain |
| --- | --- | --- |
| `securedme.education.algoquest.outbox.v1` | `readLatestVadLearningEvent` | VAD-like validated learning events |
| `securedme.education.vot-guardian.outbox.v1` | `readLatestGuardianPointer` | guardian redirection pointers |
| `securedme.education.algoquest.install-sequence.v1` | `readInstallSequenceFromStorage`, `persistInstallSequence` | gateway offer + requested app + install/consent state |

### Contract behavior rules

- All contracts require exact `schema` versions and are validated before use.
- `raw_secret_stored` must remain `false` for accepted payloads.
- `hasSecretLikeField()` rejects obvious secret-bearing keys and obvious secret-like strings.
- `Qbit` helpers infer nudge state from consent scope.
- Missing/invalid external payloads fallback to trusted fixtures, never crash the render path.

---

## Data flow

1. **Read latest learner artifact feed**
   - `readLatestVadLearningEvent(fallback)` loads the latest valid entry from `ALGOQUEST_OUTBOX_STORAGE_KEY`.
   - Acceptance rules:
     - schema `securedme.education.student-learning-event.v1`
     - app slug `visual-algorithm`
     - `artifact_ref` prefix `vad:validated-algorithm:`
     - `score >= threshold`
     - no raw secret leak flags
2. **Read guardian pointer**
   - `readLatestGuardianPointer()` reads from `GUARDIAN_OUTBOX_STORAGE_KEY` with schema guardrails (`target_app = vot-guardian`, consent required, redaction flags).
3. **Load/persist install sequence**
   - `readInstallSequenceFromStorage(fallback)` loads sequence contract if valid.
   - `persistInstallSequence` writes only after validation and secret screening.
4. **Build derived events/metrics**
   - `buildStudentMetricsFromLearningEvent` -> student metric envelopes
   - `buildTeacherPlanningFromLearningEvent` -> teacher planning event
   - `buildTeacherMetricsFromLearningEvent` -> teacher aggregate metrics
   - `buildInstallMetricsFromSequence` -> install/consent continuity metrics
5. **Render with context**
   - `validateGatewayContext` enforces role/surface/session congruence and expiry.
   - Qbit UI uses `renderQbitBadge`, `renderQbitNudge`, `renderQbitPlanner`.

### Install/consent sequence semantics

`GatewayInstallSequence` shape:

- `doctor_status`: `passed | failed` (currently mocked as preset baseline in fixture)
- `algoquest_offer_status`:
  - `enable_for_this_tool`
  - `enable_for_suite`
  - `skip_for_now`
- `selected_tool_status`:
  - `pending | blocked | installed`
- `requested_tool_slug`: current suite target slug
- `selected_tool_status` transitions:
  - suite offer => installed
  - skip => blocked
  - pending => pending until user action
- Derived consent by `getConsentScope()`:
  - `none` for skipped or absent enablement
  - `tool` for single-target enable
  - `suite` when suite-wide install is accepted

### Suite continuity list

`suiteAppsToConnect` currently contains:

`visual-algorithm`, `vot-guardian`, `algorithm-builder`, `fnpqnn`, `gateway`, `ffed-qlc`, `quanthor`, `synthia`, `scholarium`, `market-guardian`, `tesla-workbench`

The Hub UI now derives queue size from runtime list length so label stays synchronized automatically.

---

## UI behaviors in practice

### Sidebar controls (`EducationHub`)

- WebAuth/gateway verification badge (static/local simulation)
- active role and expected surface indicators
- learner role controls on student surface
- install sequence step list (`gateway_doctor`, `algoquest_companion_offer`, `selected_tool`)
- target app selector (`?tool=<slug>` and clickable options)
- gateway snapshot:
  - doctor check
  - algoquest offer status
  - target tool
  - selected tool status
  - choice record mode (`dry-run` vs persisted)
- actions:
  - `Enable for this tool`
  - `Enable for suite`
  - `Skip for now`

### Student surface widgets

- validated algorithm metadata card
- metric store
- install metrics panel
- Qbit panel with enable/skip actions

### Teacher surface widgets

- aggregate planning card and recommendation summary
- aggregate metrics list
- install metrics list
- suite queue list with per-tool status (`all`, `selected`, `waiting`)

---

## Learning lab modules

Under `components/sections`:

- `HomeSection.tsx`  
  - welcome landing + entry points to lab modules
- `ProblemTypesSection.tsx`  
  - 3-question quiz with per-question explanation
- `BuildAlgoSection.tsx`  
  - drag/drop ordering challenge with distractor
- `PerformanceSection.tsx`  
  - linear search bar visualization with animation and reset/start controls
- `ParadigmsSection.tsx`  
  - greedy path demo on a fixed graph
- `InnovationSection.tsx`  
  - local topic explorations (quantum computing, AI/ML, DNA computing, neuromorphic)

These modules are standalone educational UI pieces and are not directly persisted as cross-tool contracts.

---

## Docs and accessibility shell

MkDocs is configured in `mkdocs.yml` with Material and local scripts:

- `docs/javascripts/securedme-theme-toggle.js`
  - stores palette under `securedme:theme:v1`
- `docs/javascripts/securedme-accessibility.js`
  - access console + profiles + profile persistence under `securedme:a11y:v2`
- `docs/stylesheets/securedme-education.css`
- `docs/stylesheets/securedme-theme-toggle.css`
- `docs/stylesheets/securedme-accessibility.css`

### Docs entry points

- `docs/index.md`
- `docs/architecture.md`
- `docs/accessibility/edge-user-console.md`
- `docs/accessibility/neurodivergent-comfort.md`

Behavior notes:

- no third-party tracking in docs scripts
- local-only preferences
- no backend requirement for docs mode

---

## Security and governance

### Boundaries

- secret-like values are screened before contract acceptance.
- student privacy scope is represented in redacted/aggregate status by design.
- official AI routes for classroom context are governed by repository policy files.

See:

- [`AGENTS.md`](./AGENTS.md)
- [`SCHOOL_TOOL_GOVERNANCE.md`](./SCHOOL_TOOL_GOVERNANCE.md)
- [`SECURITY.md`](./SECURITY.md)
- [`SAFETY.md`](./SAFETY.md)

### Licenses and notices

- license text: `LICENSE`
- legal references: `NOTICE`
- general caveats: `DISCLAIMER`

---

## Run, build, and validate

### Setup

```bash
npm install
```

### Dev

```bash
npm run dev
```

### Validation

```bash
npm run validate
# or equivalent:
npm run build
npx tsc --noEmit
python -m mkdocs build --strict
```

### Test entry

```bash
npm test
```

`npm test` points to `npm run validate`, so it enforces app build, TS check, and strict docs build.

---

## Current limits and known gaps

- No backend API integration in this module.
- Cross-tool continuity is currently simulated through local contract schemas and storage.
- No Playwright/Vitest suites are currently committed.
- The install sequence starts from fixture-driven defaults and local storage state.

Potential next hardening points:

- explicit schema migration strategy per contract version
- stronger session fingerprint binding
- explicit suite API adapters for all 10 target tools
- end-to-end integration tests against real persisted queues

---

## Troubleshooting sync notes

If the repo feels “out of sync,” verify:

- Git working tree status has only intended changes.
- README content and UI labels come from runtime values (`suiteAppsToConnect.length` instead of hardcoded count).
- storage contract values match current schema keys and validation rules.

Quick check:

```bash
git status --short
npm test
```

Expected minimum status during this iteration:

- a deliberate working tree diff only for documentation changes and explicit feature changes you made.

---

## Repository references

- Code entry: `index.tsx`, `App.tsx`, `components/*`, `services/*`, `types.ts`
- Contract fixtures: `data/educationFixtures.ts`
- Architecture map: `docs/architecture.md`
- Accessibility docs: `docs/accessibility/*`
- Governance and safety: `AGENTS.md`, `SCHOOL_TOOL_GOVERNANCE.md`, `SECURITY.md`, `SAFETY.md`, `NOTICE`, `LICENSE`, `DISCLAIMER`
- Project upstream: `https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-`
