# AlgoQuest Hero Books Pre-Alpha Proof

Status: `pre-alpha proof line`

This document records the first implemented slice of the Hero Books plan. It does not declare the full 145-action program complete.

## Implemented Proof

- Six audience profiles are registered.
- Six Hero Book worlds are registered.
- The first adaptation is `mage-two-horizons.primary-5-6.fr-CA.1`.
- The first adaptation contains twelve prompt nodes.
- Prompt selection is deterministic for a fixed seed and state.
- A prompt can be consumed once per `AdventureRun`.
- Story state, learning evidence, and declared presentation preferences are separate concepts.
- `FirstProofReceipt.v1` requires a Builder artifact receipt, the model-limit prompt, and the milestone prompt.
- Tenebris remains disabled by default and has no mastery authority.
- `EntryMissionManifest.v1` exists for the Mage first proof and treats fifteen minutes as an ergonomic target, not a pass/fail rule.
- `ColabNotebookManifest.v1` and `ColabRoundTripReceipt.v1` exist as contracts that exclude identity, secrets and canonical state.
- A versioned notebook exists at `notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb` and is also exposed publicly for local download.
- ASCII scene rendering includes a bounded width and a linear equivalent.
- AlgoQuest exposes the `MissionEnvelope.v1` JSON in the Hero Books section so it can be explicitly pasted into Builder.
- Builder validates the imported mission before emitting an artifact receipt and rejects envelopes that claim canonical state authority.
- Builder receipt import is explicit because separate local ports cannot share browser `localStorage`.
- `BuilderWebAuthBrokerContract.v1` now exists as a closed contract: it accepts only mission envelopes and artifact receipts, carries no provider secret, carries no raw identity, and always returns `blocked-live-broker-absent` until a real broker is proven.
- Colab receipt import is explicit and rejects failed tests, wrong mission receipts, secret flags and missing digests.
- `AdventureRuntime.v1` now persists the local run, advances prompts, resets, and replays the deterministic path.
- The UI has a minimal Adventure view and Study/artifact view driven by the same runtime.
- The Study view exposes prompt count, story points, LearningEvidence token count and the linear ASCII equivalent.
- A pre-alpha gate simulates 1, 25 and 100 independent `AdventureRun` records.
- The gate simulates missing Builder proof, failed Colab proof, disabled Tenebris and small organization aggregates.
- The gate scans built assets, notebooks and proof docs for forbidden secret/raw-data markers.
- Privacy contracts cover KnowledgeToken revocation, bounded deletion receipts and hierarchy access decisions that deny teacher-private activity and raw answers.
- The current Hero Books UI can generate revocation and deletion receipt JSON, persist a bounded local receipt log, filter unsafe receipt records, and purge the local receipt cache.
- A static Hero Books accessibility gate checks labelled textareas, visible focus classes, bounded ASCII width, linear ASCII equivalent, live status and reduced-motion CSS presence. This does not replace Playwright, assistive-technology, device or Chromebook proof.
- A Chromium desktop/tablet/mobile browser gate loads the built app through Vite preview, validates the Hero Books UI, checks ARIA snapshot names, runs under reduced-motion, focuses key controls, advances one prompt, checks page overflow and exercises the privacy receipt workflow.
- The browser gate includes a Chromebook-class simulation with CPU throttling, bounded load and interaction timing budgets, DOM node budget, and JS bundle budget. This is not the same as a physical Chromebook test.

## Current Boundaries

- Hero Books do not block the AlgoQuest alpha base.
- Qbit/Codex/Gemini can narrate only through bounded envelopes in future work.
- Google Colab is not canonical state.
- Algorithm Builder produces artifact receipts; AlgoQuest owns mission and evidence policy.
- Until a live WebAuth broker exists, cross-tool local proof uses explicit receipt import rather than hidden browser storage sharing. The closed broker contract is tested, but it is not live transport evidence.
- No real student, teacher, classroom, or school data is used in this proof.

## Verification

Run:

```powershell
node scripts/hero-books-contract-test.mjs
```

The test verifies deterministic manifest digests, one-use prompt consumption, blocked premature milestones, story/evidence separation, runtime replay, first proof admission, notebook parity, the closed Builder WebAuth broker contract, anti-secret scanning, privacy projections, and one hundred identical replays with the same seed and state.

Run the broader pre-alpha gate:

```powershell
npm run hero-books:gate
```

The gate currently returns `alpha_ready: false` because WebAuth broker, live Colab round trip and real-user approval are not complete.

Run the static accessibility gate:

```powershell
npm run hero-books:a11y-static
```

Run the Chromium desktop/tablet/mobile browser gate:

```powershell
npm run build
npm run hero-books:browser
```
