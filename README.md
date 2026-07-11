# AlgoQuest Qbit Education

[![SecuredMe Education Suite](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

![AlgoQuest banner](assets/brand-selected/algoquest-public-banner.png)

**Status:** `pre-alpha` / `in development`

`algoquest-ams-discovry-labs-module-` is a React + Vite education module that sits inside the SecuredMe Education stack.  
It implements:

- a dual-surface hub for students and teachers (`/student`, `/teacher`)
- gateway-style local contracts for install decisions and tool handoff
- a small Learning Lab of algorithm exercises
- MkDocs documentation with a self-hosted accessibility console and theme controls.

There is no backend in this module. All cross-tool interoperability is contract-driven and local-storage based in the browser.

---

## 1) What this module contains

### Runtime UI

- `index.html` and `index.tsx` bootstrap the app.
- `App.tsx` chooses surface from pathname and switches into Learning Lab mode.
- `components/education/EducationHub.tsx` renders all student/teacher contract surfaces.
- `components/sections/*` render interactive labs:
  - `HomeSection` (intro and section entry points)
  - `ProblemTypesSection` (3-question quiz)
  - `BuildAlgoSection` (drag/drop algorithm ordering)
  - `PerformanceSection` (linear search visualization)
  - `ParadigmsSection` (greedy path demo)
  - `InnovationSection` (school-safe exploration topics)
- `components/ui/*` contains shared UI primitives.

### Contract and interop layer

- `services/qbitCompanion.ts` contains contract builders, type-safe validators, and anti-secret guardrails.
- `services/educationInterop.ts` reads/writes localStorage contracts and maps validated payloads into internal metric/planning envelopes.
- `types.ts` is the contract model source of truth.
- `data/educationFixtures.ts` provides deterministic fixtures used for local fallback and seeded smoke scenarios.

### Documentation stack

- `mkdocs.yml`, `docs/*`, and `overrides/*` define a local docs site with:
  - dark/light toggle persistence
  - accessibility profile console
  - keyboard shortcuts and sprint helpers
  - localStorage-driven UX preferences.

---

## 2) Prerequisites and commands

```bash
npm install
npm run dev
```

### Build and validation

```bash
npm run build
npm run validate
npm test
```

`npm test` is currently wired as:

```bash
npm run build && npx tsc --noEmit && python -m mkdocs build --strict
```

### Docs workflow

```bash
python -m mkdocs build --strict
```

---

## 3) Surfaces and behavior

### Student surface (`/student`)

- Loads a validated Visual Algorithm Designer artifact from outbox storage if available.
- Supports learner roles:
  - `student_minor` (beginner-safe path)
  - `student_adult` (fuller pacing)
- Shows validated-algorithm score/threshold, risk flags, guidance, local metric rows, and install consent controls.
- Presents a Qbit companion panel with enable/skip handling.

### Teacher surface (`/teacher`)

- Displays a redacted aggregate planning snapshot.
- Shows planning rows and classroom-level metrics only.
- Includes a 11-app connection queue (for contract continuity across the suite).
- Uses the same Qbit/consent flow, with teacher-specific intervention posture.

### Learning Lab mode

- Triggered from Education Hub.
- Does not alter stored gateway/interoperability contracts directly.
- Covers problem identification, build/check workflows, and algorithm intuition modules.

---

## 4) Contract model (localStorage)

The contract layer uses strict structural checks with secret-safe filtering.

### Storage keys

| Key | Purpose |
| --- | --- |
| `securedme.education.algoquest.outbox.v1` | VAD validated learning event feed |
| `securedme.education.vot-guardian.outbox.v1` | guardian pointer feed |
| `securedme.education.algoquest.install-sequence.v1` | install/consent state for this tool and suite |

### Core contracts defined in `types.ts`

- `EducationSessionRole`
- `StudentLearningEvent`
- `GuardianArtifactPointer`
- `TeacherPlanningEvent`
- `EducationMetricsEnvelope`
- `QbitIntervention`
- `GatewayInstallSequence`
- domain learning types used by sections (`ProblemTypeQuestion`, `GreedyGraph`, etc.)

### Gate sequence semantics

`GatewayInstallSequence` models the install contract in one object:

1. `gateway_doctor` check status (`passed` / `failed`)
2. AlgoQuest offer status:
   - `enable_for_this_tool`
   - `enable_for_suite`
   - `skip_for_now`
3. selected tool state (`pending` / `blocked` / `installed`)

Derived consent scope:
- `none` when skipped
- `tool` when enabled only for selected app
- `suite` when enabled at suite level

---

## 5) Cross-tool data flow in practice

### 1. VAD -> AlgoQuest

- `readLatestVadLearningEvent()` scans `securedme.education.algoquest.outbox.v1` and selects the latest valid event.
- Accepted events require:
  - exact schema `securedme.education.student-learning-event.v1`
  - `app_slug = visual-algorithm`
  - artifact prefix `vad:validated-algorithm:`
  - `score >= threshold`
  - no obvious secret-like fields
  - `raw_secret_stored === false`

### 2. VOT-Guardian pointer chaining

- `readLatestGuardianPointer()` reads `securedme.education.vot-guardian.outbox.v1`.
- Accepted pointer values require:
  - schema `securedme.education.artifact-pointer.v1`
  - `target_app = vot-guardian`
  - `consent_required = true`
  - explicit `artifact_ref` prefix and redaction flags.

### 3. Install decision continuity

- A saved `GatewayInstallSequence` is loaded at startup with `readInstallSequenceFromStorage`.
- The current target app can be selected from the 11-app suite list in the hub contract panel.
- Any target change or offer change updates local persisted state through `persistInstallSequence`.
- Metric envelopes are produced from sequence state by `buildInstallMetricsFromSequence`:
  - `gateway_install_offer`
  - `gateway_consent_scope`

### 4. Derivation of planning/metrics

- Student event -> `buildStudentMetricsFromLearningEvent` for student surface.
- Student event -> `buildTeacherPlanningFromLearningEvent` for teacher planning fallback.
- Student event -> `buildTeacherMetricsFromLearningEvent` for aggregate planning metrics.

---

## 6) Security and safety posture

- `raw_secret_stored` is expected to be `false` for accepted payloads.
- `hasSecretLikeField()` rejects obvious secrets in payloads and nested objects.
- No `.env` injection path is required for current local flow.
- Official AI route constraints are defined in:
  - `AGENTS.md`
  - `SCHOOL_TOOL_GOVERNANCE.md`
  - `SECURITY.md`
  - `SAFETY.md`

---

## 7) Accessibility and docs behavior

Current docs integration provides:

- Material theme toggle with persistent key `securedme:theme:v1`
- Access console with persistent key migration to `securedme:a11y:v2`
- Keyboard shortcuts:
  - `Ctrl + U` open/close Access
  - `Esc` close Access
  - `Ctrl + Alt + S` start/stop sprint timer

---

## 8) Current validation status

Latest intended verification command set:

```bash
npm test
```

This executes:

- app build
- TypeScript type check (`tsc --noEmit`)
- MkDocs strict docs build

No dedicated Playwright/Vitest suite is committed in this module yet; coverage focus is currently contract validation + static build integrity.

---

## 9) Repository references

- App entry and contracts: `index.tsx`, `App.tsx`, `services/*`, `types.ts`, `data/educationFixtures.ts`, `components/*`
- Docs and runtime controls: `mkdocs.yml`, `docs/*`, `overrides/*`, `docs/javascripts/*`, `docs/stylesheets/*`
- Governance and legal:
  - `LICENSE` (`LicenseRef-SEL-2.0`)
  - `NOTICE`
  - `DISCLAIMER`
- Upstream repository: `https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-`
