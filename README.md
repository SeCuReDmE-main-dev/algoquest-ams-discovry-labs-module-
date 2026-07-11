# AlgoQuest Qbit Education

[![SecuredMe Education Suite public calendar](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

**Attribution:** Jean-Sébastien Beaulieu · [ORCID 0009-0007-2904-0443](https://orcid.org/0009-0007-2904-0443) · [SecuredMe](https://securedme.ca) · [AlgoQuest](https://algoquest.securedme.ca)

<div align="center">
  <img width="1200" alt="AlgoQuest Qbit Education public banner" src="assets/brand-selected/algoquest-public-banner.png" />
</div>

<!-- SECUREDME-SUITE-BADGES:START -->
[![Issues](https://img.shields.io/github/issues/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-?color=161B6A)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/issues)
[![Milestones](https://img.shields.io/badge/milestones-M0--M7-23B8FF)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/milestones)
[![Project Board](https://img.shields.io/badge/project-kanban-6F42FF)](https://github.com/users/SeCuReDmE-main-dev/projects/3)
[![Branch](https://img.shields.io/badge/branch-main-0E7490)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/tree/main)
<!-- SECUREDME-SUITE-BADGES:END -->

> **Status:** pre-alpha / in development.

AlgoQuest in this repository is a **React + Vite learning + gateway-interoperability module** built for the SecuredMe Education suite.  
It has two concurrent objectives:

1. Give students and teachers a usable interface for algorithm learning.
2. Demonstrate deterministic, local-only integration contracts for cross-app education orchestration (Gateway-style sessions, install sequence, metrics, and local pointer/event ingestion).

This module is already significantly larger than a demo. It combines:

- a student/teacher education hub with explicit surface separation,
- an interactive "Learning Lab" with multiple lesson sections,
- suite interoperability services using browser-local contract queues,
- static MkDocs documentation with self-hosted accessibility controls,
- a curated brand system (tiny mark, banners, badges, logos, and selected publication assets).

## Repo map (high signal)

| Path | Responsibility |
| --- | --- |
| `App.tsx` | Route-surface switcher, global state entrypoint, surface-aware learning lab launch. |
| `components/education/EducationHub.tsx` | Main application UI for both `student` and `teacher` surfaces. |
| `components/sections/` | Learning modules for the legacy quiz/build/performance/paradigm/innovation lab. |
| `services/qbitCompanion.ts` | Contract builder + validation helpers (`session`, `qbit`, metrics, secret scanning). |
| `services/educationInterop.ts` | LocalStorage interop for VAD artifact events, VOT Guardian pointers, and install-sequence persistence + metrics derivation. |
| `data/educationFixtures.ts` | Contract-safe fixture defaults used in absence of external event queues. |
| `types.ts` | Shared contracts and enums for all education/gateway payloads. |
| `components/ui/` | Shared surface primitives (`Card`, `NavButton`). |
| `docs/`, `overrides/`, `docs/javascripts/*`, `docs/stylesheets/*` | MkDocs Material education site with in-browser dark/light + Access console. |
| `assets/brand-selected/`, `assets/securedme/education/` | Brand system, logos, banners, and doc visuals. |

## What the app does

### 1) EducationHub (two surfaces only)

The hub is rendered by default from `App.tsx` and has strict surface partitioning:

- **Student surface** (`/student`)
  - Shows validated artifact details inherited from Visual Algorithm Designer event queue.
  - Supports role selection between:
    - `student_minor`
    - `student_adult`
  - Displays student metric store + install metrics.
- **Teacher surface** (`/teacher`)
  - Shows redacted/planned classroom metrics, aggregate recommendations, and a 11-app connection queue.
  - Uses the same metric pipeline but with aggregate/redacted surface semantics.

#### Surface controls in the UI
- Install scope chooser: `Enable for this tool`, `Enable for suite`, `Skip for now`.
- Gateway snapshot panel: doctor status, requested tool, selected-tool status, persisted/dry-run marker.
- Qbit helper panel with enable/skip controls.
- Motion toggle (reduced motion) for comfort / accessibility.
- Learning Lab launcher.

### 2) Learning Lab modules

Accessible via "Learning Lab" from hub:

- `components/sections/HomeSection.tsx` – onboarding and launch points to sections.
- `ProblemTypesSection.tsx` – 3-question quiz logic.
- `BuildAlgoSection.tsx` – drag/drop ordering game.
- `PerformanceSection.tsx` – linear search visualization.
- `ParadigmsSection.tsx` – greedy path demo.
- `InnovationSection.tsx` – local-topic exploration panel.

### 3) Gateway-style integration layer

`EducationHub` and service files model a local-safe interop contract for cross-tool workflows.

- Core contracts in `types.ts`:
  - `EducationSessionRole`
  - `StudentLearningEvent`
  - `GuardianArtifactPointer`
  - `TeacherPlanningEvent`
  - `EducationMetricsEnvelope`
  - `QbitIntervention`
  - `GatewayInstallSequence`
- Contract validation helpers in `qbitCompanion.ts`:
  - `validateGatewayContext`
  - `buildSession`
  - `getConsentScope`
  - `hasSecretLikeField`
- Local interoperability in `educationInterop.ts`:
  - `readLatestVadLearningEvent`
  - `readLatestGuardianPointer`
  - `readInstallSequenceFromStorage`
  - `persistInstallSequence`
  - `buildStudentMetricsFromLearningEvent`
  - `buildTeacherMetricsFromLearningEvent`
  - `buildTeacherPlanningFromLearningEvent`
  - `buildInstallMetricsFromSequence`

#### LocalStorage contracts used

| Key | Purpose |
| --- | --- |
| `securedme.education.algoquest.outbox.v1` | Ingests latest validated Visual Algorithm Designer artifact event. |
| `securedme.education.vot-guardian.outbox.v1` | Ingests latest VOT Guardian pointer event. |
| `securedme.education.algoquest.install-sequence.v1` | Persists install sequence choice per surface/session role. |

Install sequence shape is validated against `GatewayInstallSequence` and is only persisted when it is structurally valid and secret-safe.

## Data behavior you should know

- Fixture default in this repo: score threshold is `93`, matching `data/educationFixtures.ts`.
- Student risk flags in the fixture include `privacy`, `secret`.
- Teacher planning is produced as redacted aggregate guidance.
- Install metrics are surfaced separately for student and teacher as:
  - `gateway_install_offer`
  - `gateway_consent_scope`
- Session context is generated locally by `buildSession(...)` and validated on render; mismatches surface through guard errors before sensitive content path usage.

## Security and secret boundary

This module enforces boundary checks in code:

- `raw_secret_stored` is expected false on all contract objects.
- secret-like keys detection rejects common private material patterns (API keys, passwords, cookies, tokens, roster-level identifiers, etc.).
- no `.env` local secrets are required for the current flow.
- official AI-assisted classroom providers are constrained by repository governance (see `AGENTS.md`, `SCHOOL_TOOL_GOVERNANCE.md`, `SECURITY.md`).

Relevant docs:
- [SCHOOL_TOOL_GOVERNANCE.md](./SCHOOL_TOOL_GOVERNANCE.md)
- [SAFETY.md](./SAFETY.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [AGENTS.md](./AGENTS.md)

## Documentation site (docs/ + MkDocs)

Repo includes a docs surface intentionally kept independent from app runtime:

- `mkdocs.yml`
- `docs/index.md`
- `docs/accessibility/edge-user-console.md`
- `docs/accessibility/neurodivergent-comfort.md`
- `overrides/partials/content.html`
- `docs/stylesheets/securedme-education.css`
- `docs/stylesheets/securedme-theme-toggle.css`
- `docs/stylesheets/securedme-accessibility.css`
- `docs/javascripts/securedme-theme-toggle.js`
- `docs/javascripts/securedme-accessibility.js`

Docs behavior:
- Light/dark mode button with local persistence key `securedme:theme:v1`.
- Access console with local persistence key `securedme:a11y:v2` and automatic migration from `securedme:a11y:v1`.
- Shortcuts:
  - `Ctrl+U` open/close Access console
  - `Esc` close console
  - `Ctrl+Alt+S` toggle sprint timer.

## Running the project locally

### Frontend app

```powershell
npm install
npm run dev
```

Build:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

### Documentation site

```powershell
python -m mkdocs build --strict
```

## Quality checks completed

- `npm install`
- `npm run build` ✅
- `python -m mkdocs build --strict` ✅

No automated unit test script is defined in `package.json` yet.

## Suite and branding notes

- Base asset set: `assets/brand-selected/*`
- Cross-doc brand assets: `assets/securedme/education/*`
- QA screenshots: `qa/` (desktop/mobile captures for learner + teacher).
- `assets/video/` and `assets/pdf/` contain optional reference/media artifacts used for docs or distribution context.

## Governance and license

- License: Secured Educational License 2.0 (SEL-2.0), local reference `LicenseRef-SEL-2.0`.
- Not OSI-approved, not listed in SPDX.
- This is pre-alpha; maintainer-reviewed PR pipeline is the only official support route for stable school-tool releases.

See:
- [LICENSE](./LICENSE)
- [NOTICE](./NOTICE)
- [DISCLAIMER](./DISCLAIMER)

## Contribution boundaries

- Changes should keep contract types/validators and UI partitioning coherent.
- Keep student/teacher separation explicit in any new surfaces.
- Never add new local secret fields into contract objects.
- If you add education routes or providers, preserve official support boundaries and documented provider constraints.

## Roadmap candidates (from code-state signals)

- Add unit/integration test harness (Vitest / Playwright) around:
  - surface routing (`/student` vs `/teacher`),
  - install-sequence persistence + `consent_scope`,
  - event reader guards in `educationInterop`.
- Add explicit install contract migration for sequence schema/version.
- Add fixture-backed tests for `buildInstallMetricsFromSequence` edge cases.
- Add a script that validates README repository map against actual file presence.
