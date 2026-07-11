# Architecture

This page is a practical map of how AlgoQuest is implemented in this repository.

## Surface routing

- `App.tsx` initializes with:
  - `surface` from URL path (`/teacher` => teacher, otherwise student),
  - `showLearningLab` as a mode switch.
- `EducationHub` is the default surface for both `student` and `teacher`.
- Learning lab mode uses section navigation (`home`, `problem-types`, `build-algo`, `performance`, `paradigms`, `innovation`) with local components.
- Query args drive local install/role context (`?tool`, `?role`) for repeatable testing and debug seeding.

| Surface | Entry | Purpose |
| --- | --- | --- |
| student | `/student` | Detailed validated-algorithm flow + student metrics + role selector (`student_minor`, `student_adult`). |
| teacher | `/teacher` | Redacted classroom planning + aggregate metrics + app connection queue. |
| lab mode | manual via `Learning Lab` button | Quiz + drag/drop + algorithm visuals. |

## Interop services

`services/educationInterop.ts` is the local boundary with suite-style inputs.

- **Read latest validated learning event:** `readLatestVadLearningEvent(fallbackEvent)`
- **Read guardian pointer:** `readLatestGuardianPointer()`
- **Read install choice:** `readInstallSequenceFromStorage(fallbackSequence)`
- **Persist install choice:** `persistInstallSequence(sequence)`
- **Build metrics:** `buildStudentMetricsFromLearningEvent`, `buildTeacherMetricsFromLearningEvent`, `buildInstallMetricsFromSequence`
- **Build planning event:** `buildTeacherPlanningFromLearningEvent`

`EducationHub` can now also target a specific suite app as `requested_tool_slug` and keeps that target in local contract state.
`selected_tool_status` transitions are rendered in teacher queue state as:
- `all` for suite scope,
- `selected` for installed target,
- `waiting` for queued entries.

## Local storage contracts

- `securedme.education.algoquest.outbox.v1`
  - source object shape: `StudentLearningEvent` queue for reading from VAD.
- `securedme.education.vot-guardian.outbox.v1`
  - source object shape: `GuardianArtifactPointer` queue for guardian handoff.
- `securedme.education.algoquest.install-sequence.v1`
  - source object shape: `GatewayInstallSequence` state for offer and consent scope.

Only values passing local schema checks and no-secret heuristics are accepted.

## Contract stack

Defined in `types.ts` and validated/created by `services/qbitCompanion.ts`:

- `EducationSessionRole`
- `StudentLearningEvent`
- `GuardianArtifactPointer`
- `TeacherPlanningEvent`
- `EducationMetricsEnvelope`
- `QbitIntervention`
- `GatewayInstallSequence`

`qbitCompanion` also provides:

- `buildSession` for local session objects
- `validateGatewayContext` (surface-role mismatch and expiry checks)
- `getConsentScope` (`none` / `tool` / `suite`)
- `hasSecretLikeField` guard to reject obvious secret-bearing payloads
- `renderQbitBadge`, `renderQbitNudge`, `renderQbitPlanner` helpers used by the UI

## Secret boundary and safety posture

- `raw_secret_stored` is expected false for active payloads.
- Secret-like fields are rejected by local validation.
- No `.env` is required for this repository flow.
- Official safe-provider constraints are defined in:
  - `AGENTS.md`
  - `SCHOOL_TOOL_GOVERNANCE.md`
  - `SECURITY.md`

## Documentation behavior

- Accessibility and theme controls are client-side only.
- Theme key: `securedme:theme:v1`
- Access console key: `securedme:a11y:v2` with migration from `securedme:a11y:v1`
- Keyboard bindings:
  - `Ctrl+U` open/close Access
  - `Esc` close Access
  - `Ctrl+Alt+S` toggle sprint timer

## Verification targets

Before release, run:

```powershell
npm run validate
# or run equivalent explicit steps:
npm run build
npx tsc --noEmit
python -m mkdocs build --strict
```

`npm test` is alias to `npm run validate` and should stay green before merge.
