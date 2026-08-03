# Hero Books Traceability Matrix

Status: pre-alpha working matrix

This matrix links the nine article chapters to implementation surfaces and current evidence. It is intentionally conservative: `planned` means not yet proven operationally.

| Chapter | Product Question | Current Contract Or Component | Evidence Status |
| --- | --- | --- | --- |
| 1. Entrer sans savoir deja | Can a learner begin without already knowing algorithm vocabulary? | `EntryMissionManifest.v1` planned; Mage intro prompt exists | Partial |
| 2. Quinze minutes pour fabriquer une premiere preuve | Can a learner produce a first artifact quickly without making 15 minutes a pass/fail rule? | `FirstProofReceipt.v1`, Builder artifact receipt | Partial and tested |
| 3. Des points qui racontent une aventure, jamais une intelligence | Can game points stay separate from evidence? | `QuestState`, `LearningEvidence` | Tested |
| 4. Six publics, six portes d entree | Can the same world adapt to six audiences without fake diagnosis? | `AudienceProfile` registry | Registered, not fully rendered |
| 5. Le wake-up kit | Can Qbit/Codex/Gemini assist without authority? | `NarrativeEnvelope.v1` partial, Qbit boundary docs | Partial |
| 6. Le projet prefab | Can a prefab become an actual constructed algorithm? | `AlgorithmArtifactReceipt.v1`, `BuilderCapabilityManifest.v1` | Tested at contract level |
| 7. Le prompt qui ne revient pas | Can one prompt be consumed once per adventure? | `PromptAssignment`, `PromptConsumptionReceipt` | Tested with 100 replays |
| 8. Deux ecrans, deux verites | Can adventure and study views share the same mission without hiding the work? | `AdventureRuntime`, Adventure view, Study/artifact view, Colab contracts | Partial and tested |
| 9. De la quete au parcours scolaire | Can evidence remain useful without accumulating the person? | Tenebris policy, student/teacher/org projections | Partial and tested |

## Current Test Coverage

- `node scripts/hero-books-contract-test.mjs`
- `npm run hero-books:gate`
- `npm test` in AlgoQuest
- `npm test` and `npm run build` in Algorithm Builder

## Known Missing Proofs

- Full `EntryMissionManifest.v1` runtime.
- Full polished two-view adventure/study interface.
- Live Colab execution and file/API round-trip import.
- Browser Playwright and accessibility gate.
- Full 60-capability Builder implementation.
- Full 145-action completion audit.
