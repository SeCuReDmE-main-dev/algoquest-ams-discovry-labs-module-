# Hero Book dossier template

Status: required design record before a Hero Book receives its first canonical prompt.

## 1. Identity

- `hero_book_id`:
- Working title:
- One-sentence promise:
- Primary audience band:
- Additional audience adaptations:
- Locale, time period, and geography:

## 2. Truth boundary

- What is historically or scientifically supported:
- What is an interpretation or contested source:
- What is original fantasy:
- What must never be presented as fact, medicine, religion, or cultural authority:
- Cultural, historical, scientific, or pedagogical reviewers required:

## 3. Story contract

- Player identity and agency:
- Initial problem:
- Stakes:
- Allies, opponents, and community:
- World rules:
- Ending earned by the player:
- Explicit non-goals: violence spectacle, stereotype, historical impersonation, harmful instruction, or forced disclosure.

## 4. Forty-prompt adventure arc

Define five acts of eight prompts. A prompt is assigned once per `AdventureRun`; a retry belongs to that same assignment.

| Act | Prompts | Narrative change | Real learner action | Required artifact or evidence | Recovery path |
| --- | ---: | --- | --- | --- | --- |
| 1. Orientation | 8 |  |  |  |  |
| 2. Investigation | 8 |  |  |  |  |
| 3. Construction | 8 |  |  |  |  |
| 4. Verification | 8 |  |  |  |  |
| 5. Resolution and reflection | 8 |  |  |  |  |

## 5. Learning contract

- Algorithmic foundations:
- Mathematics foundations:
- Physics, science, or modelling foundations:
- Responsible tool-practice foundations:
- Curriculum links by audience band:
- `UnderstandingPath` changes expected from evidence:
  - `introduced`
  - `guided_practice`
  - `independent_application`
  - `transfer`
  - `explain_and_review`

Story points, elapsed time, and narrative choices cannot certify any of these states.

## 6. Two-experience design

### Game view

- Hero, map, location, stakes, quest board, optional exploration, and narrative rewards:

### Education view

- Learning goal, learner action, hint policy, accessibility options, evidence criterion, retry state, and school-year link:

### Shared records only

- `PromptCard` ID:
- `AdventureRun` receipt:
- Artifact pointer:
- Deterministic evidence receipt:

## 7. Prompt-bank contract

- Eligibility filters:
- Prerequisites:
- Bounded alternatives:
- Reason recorded for every assignment:
- Single-use database constraint:
- Pause and resume behavior:
- Abstention behavior:
- Localization and version digest:

## 8. Safety, privacy, and accessibility

- Audience suitability and content rating:
- Prohibited content and unsafe actions:
- Required accessibility alternatives:
- Data minimization and consent boundaries:
- Teacher and organization visibility limits:

## 9. Rights and provenance

- Source list with claim-level citations:
- Originality statement:
- Protected works, cultures, or names that must not be copied or impersonated:
- Asset and license register:

## 10. Acceptance tests

1. Every prompt is reachable only when eligible and cannot be assigned twice in one adventure.
2. A story choice cannot award learning mastery.
3. Every curriculum claim points to a versioned, reviewed objective.
4. The game and education views explain the same assignment without exposing unnecessary data.
5. Keyboard, screen-reader, motion, contrast, and non-drag alternatives work.
6. A synthetic run completes, pauses, retries, abstains, and resumes without a missing receipt.
