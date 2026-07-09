[![SecuredMe Education Suite public calendar](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

**Attribution:** Jean-Sebastien Beaulieu · [ORCID 0009-0007-2904-0443](https://orcid.org/0009-0007-2904-0443) · [SecuredMe](https://securedme.ca) · [AlgoQuest](https://algoquest.securedme.ca)

<!-- SECUREDME-SUITE-BADGES:START -->
[![Issues](https://img.shields.io/github/issues/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-?color=161B6A)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/issues)
[![Milestones](https://img.shields.io/badge/milestones-M0--M7-23B8FF)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/milestones)
[![Project Board](https://img.shields.io/badge/project-kanban-6F42FF)](https://github.com/users/SeCuReDmE-main-dev/projects/3)
[![Branch](https://img.shields.io/badge/branch-main-0E7490)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/tree/main)
<!-- SECUREDME-SUITE-BADGES:END -->

<!-- SECUREDME-STARTUP-SUPPORT:START -->
<p align="center">
  <a href="https://e2b.dev/startups">
    <img alt="Gateway-ready E2B audit lane" src="https://img.shields.io/badge/Gateway--ready-E2B%20audit%20lane-FF8800?style=for-the-badge" />
  </a>
  <a href="https://www.datadoghq.com/partner/datadog-for-startups/">
    <img alt="Gateway-ready Datadog observability" src="https://img.shields.io/badge/Gateway--ready-Datadog%20observability-632CA6?style=for-the-badge&amp;logo=datadog&amp;logoColor=white" />
  </a>
</p>

> **Gateway support acknowledgement.** This SecuredMe school tool is gateway-compatible. E2B audit support and Datadog observability are routed through the shared SecuredMe gateway when that lane is configured; this repository does not claim a direct E2B or Datadog runtime dependency by default, and no E2B or Datadog secret is stored in this README.
<!-- SECUREDME-STARTUP-SUPPORT:END -->

<div align="center">
  <img width="1200" alt="AlgoQuest Qbit Education public banner" src="assets/brand-selected/algoquest-public-banner.png" />
</div>

# AlgoQuest Qbit Education

AlgoQuest is a pre-alpha SecuredMe Education app for beginner algorithm learning and suite-wide Qbit companion routing. It combines a student/teacher education hub with an interactive algorithm discovery lab.

The current codebase is larger than a simple algorithm demo. It includes:

- a React/Vite app shell;
- separate `/student` and `/teacher` education surfaces;
- Gateway-style session, consent, install-order, Qbit, metric, and secret-boundary contracts;
- Visual Algorithm Designer and V.O.T Guardian localStorage interoperability;
- a legacy interactive learning lab for algorithm basics;
- selected AlgoQuest brand assets for public, docs, favicon, and cross-app tiny mark use;
- MkDocs documentation with SecuredMe Education theme and self-hosted accessibility controls.

> **Status:** pre-alpha / in development. This repository is not a stable classroom release yet, and the maintained project does not evaluate external PRs for merge until the stability gate is lifted.

## What The App Does

### Qbit Education Hub

`App.tsx` starts in the education hub by default. The hub is implemented in `components/education/EducationHub.tsx` and provides two surfaces:

| Surface | Route | Purpose |
| --- | --- | --- |
| Student | `/student` | Shows a validated algorithm artifact, score/threshold state, Qbit support, student metric rows, and optional V.O.T Guardian pointer status. |
| Teacher | `/teacher` | Shows aggregate-only planning information, redacted teacher metrics, intervention recommendation state, and the 11-app connection queue. |

The hub keeps student and teacher concepts separate. Teacher metrics are aggregate/redacted; student events can include direct learning progress but must remain secret-safe.

### Gateway And Qbit Contracts

The app models the suite contract shape used by the broader SecuredMe Education work:

- `GatewayInstallSequence`
- `EducationSessionRole`
- `StudentLearningEvent`
- `TeacherPlanningEvent`
- `EducationMetricsEnvelope`
- `QbitIntervention`
- `GuardianArtifactPointer`

The contract types live in `types.ts`. Runtime helpers live in `services/qbitCompanion.ts` and `services/educationInterop.ts`.

Important boundaries:

- install order is `gateway_doctor -> algoquest_companion_offer -> selected_tool`;
- raw secrets, tokens, cookies, student names, roster fields, and `.env` material are rejected by local helpers;
- browser WebAuth and fingerprinted Gateway approval are the intended school route when authentication is needed;
- no local API key or `.env.local` is required for the current app.

### Education Suite Interop

`services/educationInterop.ts` reads local event queues from browser `localStorage`:

| Storage key | Purpose |
| --- | --- |
| `securedme.education.algoquest.outbox.v1` | Reads Visual Algorithm Designer learning events that pass schema, score threshold, and secret checks. |
| `securedme.education.vot-guardian.outbox.v1` | Reads V.O.T Guardian artifact pointers without embedding raw payloads. |

Fallback fixtures are in `data/educationFixtures.ts`. They model a VAD artifact scoring `93/93`, risk flags, Qbit intervention state, teacher planning, and the 11 non-hub apps to connect.

### Learning Lab

The older learning lab is still available from the hub through `Learning Lab`. It includes:

- problem-type quiz;
- drag/drop "build an algorithm" ordering exercise;
- linear-search performance visualization;
- greedy-path graph demonstration;
- future-algorithm topic guidance.

The learning lab sections live in `components/sections/`.

## Brand And Assets

AlgoQuest now uses the selected Qbit Education asset set in `assets/brand-selected/`.

| Role | Path | Source | Use |
| --- | --- | --- | --- |
| Tiny cross-app mark | `assets/brand-selected/algoquest-tiny-mark.png` | `assets/Favio et app icon final/1.png` | Favicon, compact Qbit badge, all-app tiny mark. |
| Public banner | `assets/brand-selected/algoquest-public-banner.png` | `assets/final banner/6.png` | README/docs hero and public-facing image. |
| Logo lockup | `assets/brand-selected/algoquest-logo-lockup.png` | `assets/final logo/1.png` | Brand lockup and presentation use. |
| Companion badge | `assets/brand-selected/algoquest-companion-badge.png` | `assets/final badge/5.png` | Onboarding and Qbit companion explanation only. |

The selection manifest is `assets/brand-selected/algoquest-brand-selection.json`.

The tiny mark has also been distributed into the 11 non-hub Education app manifests through the suite-level adapter surface. The Gateway contract now requires the `qbit_badge_asset_file` check so the badge path, role, and SHA-256 can be validated.

## Repository Map

| Path | Responsibility |
| --- | --- |
| `App.tsx` | Top-level app state, surface routing, and switch between Qbit hub and learning lab. |
| `components/education/` | Student/teacher Qbit Education hub UI. |
| `components/sections/` | Interactive algorithm learning lab modules. |
| `components/ui/` | Small shared UI primitives. |
| `services/qbitCompanion.ts` | Contract emitters, session helpers, Qbit helpers, and secret-like field detection. |
| `services/educationInterop.ts` | Reads/writes suite event boundaries and derives metrics/planning events. |
| `data/educationFixtures.ts` | Pre-alpha contract-safe fixtures used by the hub. |
| `types.ts` | Shared TypeScript contracts for Gateway, Qbit, metrics, student, teacher, and Guardian events. |
| `assets/brand-selected/` | Canonical AlgoQuest selected brand assets. |
| `assets/securedme/education/` | Shared SecuredMe Education visual theme assets. |
| `docs/` | MkDocs documentation source, including accessibility pages and local JS/CSS controls. |
| `qa/` | Screenshot evidence from previous visual checks. |

## Run Locally

Prerequisites:

- Node.js
- npm

Install and run:

```powershell
npm install
npm run dev
```

Build:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

The app is a Vite React project. Tailwind is currently loaded through the CDN in `index.html`, and Inter is loaded through Google Fonts. There is no committed test script in `package.json` at this stage.

## Documentation Site

The MkDocs documentation lives in `docs/` and uses Material for MkDocs with SecuredMe Education theme overrides.

Build docs:

```powershell
python -m mkdocs build --strict
```

Docs include:

- public AlgoQuest banner;
- dark/light mode;
- self-hosted Access console;
- neurodivergent comfort controls;
- no third-party accessibility SaaS widget;
- browser-local settings only.

## Safety, Security, And Governance

AlgoQuest is a supervised education tool. It must not be converted into an abuse, bypass, fraud, theft, malware, credential, surveillance, enforcement, or autonomous decision tool.

Read:

- `SCHOOL_TOOL_GOVERNANCE.md`
- `SAFETY.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `AGENTS.md`

Official school AI-assisted routes are Codex/OpenAI and Antigravity/Gemini through governed browser-authenticated workflows. Generic local AI routes, raw-token student flows, uncensored local providers, and unknown agent providers are not maintained as official classroom routes.

## License

This project uses the Secured Educational License 2.0, local reference `LicenseRef-SEL-2.0`.

See:

- `LICENSE`
- `NOTICE`
- `DISCLAIMER`

The license is custom to SecuredMe and is not currently OSI-approved or listed in the SPDX License List.

## Current Limits

- Pre-alpha: not a stable classroom release.
- No package-level unit test script is currently defined.
- Gateway/WebAuth is represented through local contract helpers and fixtures in this repo; live gateway execution belongs to the broader suite.
- External PR review is paused until the official school-tool stability gate is lifted.
- Public docs and app builds are available locally, but deployment readiness depends on the wider SecuredMe Education release process.
