# AlgoQuest Qbit Education

## 0) One-line status

**AlgoQuest Qbit Education** is the education runtime for the SecuredMe suite.

- Status: **pre-alpha / in development**
- License: **Secured Educational License 2.0** (`LicenseRef-SEL-2.0`)
- AI route governance: official classroom workflows are constrained to **Codex/OpenAI** and **Antigravity/Gemini**.

---

## 1) What this repository now contains

The repo now has:

- A dual-surface runtime (`/student`, `/teacher`)
- A contract-first interoperability layer with local storage contracts
- A suite-connect decision surface with 11 app queue support
- A local Learning Lab (6 sections) with keyboard navigation
- MkDocs + accessibility controls + theme controls
- A strict local secret-safety posture (no raw student secrets in records)

## 2) Getting started

```bash
npm install
npm run dev
```

```bash
npm test
```

`npm test` maps to:

```bash
npm run build
npx tsc --noEmit
python -m mkdocs build --strict
```

## 3) Runtime architecture

### 3.1 App bootstrap and routing (`App.tsx`)

- `App.tsx` chooses surface from URL pathname:
  - `/teacher` => `teacher`
  - all other paths => `student`
- Clicking **Learning Lab** switches into a local module mode.
- Lab section order is fixed:
  1. `home`
  2. `problem-types`
  3. `build-algo`
  4. `performance`
  5. `paradigms`
  6. `innovation`
- While in lab mode, left/right arrows move section-by-section.

### 3.2 Student / Teacher surfaces (`components/education/EducationHub.tsx`)

**Student Surface**

- Uses validated fixture/contract input as a baseline:
  - `readLatestVadLearningEvent()` from `educationInterop`
- Displays:
  - validated artifact score + threshold
  - next-step hints
  - risk flags and consent status
  - student/install metric rows built from fixtures/events
- Supports explicit learner profile toggle:
  - `student_minor`
  - `student_adult`

**Teacher Surface**

- Uses aggregate planning derived from student payload:
  - no raw learner event is shown
  - redacted aggregate metrics and classroom planning fields only
- Shows suite queue projection from install scope/target state.
- Session role/surface consistency is checked before rendering sensitive panels.

### 3.3 Learning lab modules (`components/sections/*`)

- `HomeSection.tsx`: onboarding cards and surface navigation shortcuts
- `ProblemTypesSection.tsx`: MCQ quiz with immediate explanation
- `BuildAlgoSection.tsx`: drag-and-drop algorithm ordering challenge
- `PerformanceSection.tsx`: linear search simulation with status and step count
- `ParadigmsSection.tsx`: greedy path walk, dead-end and completion states
- `InnovationSection.tsx`: topic selector + generated guidance panel

## 4) Contract and interoperability model

### 4.1 Core contracts (`types.ts`)

- `EducationSessionRole`
- `StudentLearningEvent`
- `GuardianArtifactPointer`
- `TeacherPlanningEvent`
- `EducationMetricsEnvelope`
- `QbitIntervention`
- `GatewayInstallSequence`
- Enums/types for `EducationSurface`, `GatewayRole`, and `ConsentScope`

### 4.2 Contract builders and validation (`services/qbitCompanion.ts`, `services/educationInterop.ts`)

- `buildSession()` generates WebAuth-compatible session roles for local rendering.
- `buildInstallSequence()` builds deterministic install state from role/tool/offer.
- `emit...()` helpers create typed payloads with contract metadata and `raw_secret_stored = false`.
- `validateGatewayContext()` enforces:
  - schema/version checks
  - role/surface match
  - expiration window
  - no obvious secret-like fields in payloads

### 4.3 Local storage keys and readers

| Key | Reader | Producer | Purpose |
| --- | --- | --- | --- |
| `securedme.education.algoquest.outbox.v1` | `readLatestVadLearningEvent` | `educationInterop` | latest validated student learning event |
| `securedme.education.vot-guardian.outbox.v1` | `readLatestGuardianPointer` | `educationInterop` | latest guardian pointer (read-only) |
| `securedme.education.algoquest.install-sequence.v1` | `readInstallSequenceFromStorage` / `persistInstallSequence` | `educationInterop` | suite offer + consent + selected tool state |

### 4.4 Suite connectivity and install sequencing

- Default seed fixture: `buildInstallSequence('visual-algorithm', 'student_minor', 'enable_for_suite')`
- Queue apps (`suiteAppsToConnect`):
  `visual-algorithm`, `vot-guardian`, `algorithm-builder`, `fnpqnn`, `gateway`, `ffed-qlc`, `quanthor`, `synthia`, `scholarium`, `market-guardian`, `tesla-workbench`, plus current target context handling.
- Consent mapping:
  - `skip_for_now` => `none`
  - `enable_for_this_tool` => `tool`
  - `enable_for_suite` => `suite`

## 5) Governance, safety, and non-functional constraints

- Raw learner secrets are not persisted by contract in this repo layer.
- Secret-like field filtering is enforced before state writes:
  - `hasSecretLikeField()` and explicit forbidden token-like key guards.
- No production-grade claims are made from this repo alone.
- All outputs and planning are local/simulation-oriented unless a human-reviewed deployment adds approved backend integration.

## 6) Docs + accessibility stack

### 6.1 MkDocs

- Config: `mkdocs.yml`
- Main docs:
  - `docs/index.md`
  - `docs/architecture.md`
  - `docs/accessibility/edge-user-console.md`
  - `docs/accessibility/neurodivergent-comfort.md`

### 6.2 Runtime docs controls

- Theme: `docs/javascripts/securedme-theme-toggle.js` (`securedme:theme:v1`)
- Accessibility panel: `docs/javascripts/securedme-accessibility.js` (`securedme:a11y:v2`, legacy `...:v1`)
- Styles:
  - `docs/stylesheets/securedme-education.css`
  - `docs/stylesheets/securedme-theme-toggle.css`
  - `docs/stylesheets/securedme-accessibility.css`

## 7) Repo layout (quick map)

```text
App.tsx
index.tsx
components/
  education/
    EducationHub.tsx
  sections/
    HomeSection.tsx
    ProblemTypesSection.tsx
    BuildAlgoSection.tsx
    PerformanceSection.tsx
    ParadigmsSection.tsx
    InnovationSection.tsx
  ui/
    Card.tsx
    NavButton.tsx
services/
  qbitCompanion.ts
  educationInterop.ts
data/
  educationFixtures.ts
constants.ts
types.ts
docs/
  index.md
  architecture.md
  accessibility/
  javascripts/
  stylesheets/
  overrides/
mkdocs.yml
assets/
  brand-selected/
  final*/
  Favio et app icon final/
  ...
```

## 8) Repo sync + Git health (if `git push` fails)

Current branch check (before pushing):

```powershell
git status -sb
git log --oneline --decorate --graph --max-count=8
```

Push dry-run (to isolate transport vs commit issues):

```powershell
git push --dry-run origin main:main
```

If GitHub rejects with `GH001: Large files detected`:

1. Verify largest outbound objects in current history before rewriting:

```powershell
# list objects > 100MB in current branch history
$THRESHOLD = 104857600
git rev-list --objects HEAD | ForEach-Object {
  $parts = $_ -split ' ', 2
  if ($parts.Count -eq 2) {
    $obj = $parts[0]
    $path = $parts[1]
    $size = [int64](git cat-file -s $obj)
    if ($size -gt $THRESHOLD) {
      Write-Output ("{0}`t{1}`t{2}" -f $size, $obj, $path)
    }
  }
}
```

2. If large assets are expected and still needed, implement LFS in `main` and re-add cleanly:

- `git lfs install`
- `git lfs track "assets/**/*.mp4" "assets/**/*.pdf"` (scope as needed)
- add/update `.gitattributes`
- remove and re-add tracked large files from the right commit point

3. If large object already exists in existing pushed commits, coordinate a proper history rewrite with maintainer approval.

## 9) Known gaps for next iteration

- No live suite API broker in this repo yet (local contracts are deterministic today).
- No automated e2e suite-tool contract smoke tests.
- No backend-backed telemetry sink.
- `npm test` remains the current release-quality gate.

## 10) Governance references

- `AGENTS.md`
- `SCHOOL_TOOL_GOVERNANCE.md`
- `SECURITY.md`
- `SAFETY.md`
