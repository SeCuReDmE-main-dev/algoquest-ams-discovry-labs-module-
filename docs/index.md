# AlgoQuest Qbit Education

[![SecuredMe Education Suite public calendar](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

![AlgoQuest Qbit Education public banner](assets/brand-selected/algoquest-public-banner.png)

AlgoQuest is the **education-facing interface** for a broader SecuredMe classroom stack. It combines:

- a dual-surface learning app (`student` / `teacher`),
- Gateway-style local interop for install decisions and metrics,
- a built-in accessibility surface for reader support,
- a modular documentation layer with self-hosted controls.

## Start here

- **Run the app:** `npm install` then `npm run dev`.
- **Run the docs site:** `python -m mkdocs build --strict` (or your local mkdocs serve flow).
- **Read runtime behavior:** this documentation set and `README.md` (repository root).
- **Run all checks:** `npm test`.

### Fast start by persona

- **For learners (`/student`)**
  - Start with EducationHub at `/student`.
  - Choose `student_minor` or `student_adult` in the left rail.
  - Open **Learning Lab** to access quiz, build, performance, paradigms, and innovation modules.
- **For teachers (`/teacher`)**
  - Start at `/teacher`.
  - Review redacted planning signals + suite install queue.
  - Verify no raw learner artifact is exposed.

## What this site documents

- **Gateway contract model**
  - storage contracts,
  - session and install sequence semantics,
  - student vs teacher payload boundaries,
  - consent and redaction posture.
- **Accessibility and comfort**
  - dark/light theme switch,
  - self-hosted Access console,
  - local-only controls and sprint/session helpers.
- **Learner-facing app layers**
  - education hub,
  - learning lab modules,
  - role-aware surface behaviors.

### Current quality notes

- This repository is currently pre-alpha; behavior is deterministic and local-first.
- Interoperability is contract-driven with local secret-screening rules.
- Future changes should preserve suite tool identifiers and storage keys for integration continuity.

## Quick links

- [Edge User Console](accessibility/edge-user-console.md)
- [Neurodivergent Comfort](accessibility/neurodivergent-comfort.md)
- [Project README](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-#readme)
- [Architecture details](architecture.md)

## Developer notes

- The MkDocs theme is customized via `overrides/partials/content.html`.
- Theme controls are injected via:
  - `docs/javascripts/securedme-theme-toggle.js`
  - `docs/javascripts/securedme-accessibility.js`
- Styles are in:
  - `docs/stylesheets/securedme-education.css`
  - `docs/stylesheets/securedme-theme-toggle.css`
  - `docs/stylesheets/securedme-accessibility.css`

## Architecture summary

At a high level:

1. **Application runtime** (`App.tsx`, `components/*`) renders student/teacher surfaces and local lab modules.
2. **Interop services** (`services/*`) validate and shape events from browser storage and contract-safe fixtures.
3. **Contract definitions** (`types.ts`) define explicit object schemas used across the stack.
4. **Documentation shell** (`docs/*`, `overrides/*`) exposes reader settings and project documentation.

---

For implementation specifics (payloads, validation rules, local keys), see the next section in this docs set.
