# Hero Books 145 Action Audit

Status: `pre-alpha in progress`

Updated: 2026-08-03

This audit explains where the 145-action Hero Books chantier really stands. It is intentionally conservative: a coded contract is not marked complete unless a current test, build, document, or gate proves the claim.

## Current Position

AlgoQuest and Algorithm Builder now have a real integrated proof line:

- AlgoQuest owns adventures, missions, prompt assignment, prompt consumption, evidence policy, Qbit boundaries, Tenebris boundaries, Colab receipts, and the local Hero Books UI.
- Algorithm Builder acts as forge, deterministic die, character sheet, inventory surface, `MissionEnvelope` validator, and `AlgorithmArtifactReceipt` producer.
- The Builder WebAuth broker now has a closed contract proof. It validates transport envelopes, rejects sensitive markers, and returns `blocked-live-broker-absent` until a live broker is built.
- Google Colab is prepared as an external execution surface through a generated notebook and explicit `ColabRoundTripReceipt`.
- No AI provider, Colab notebook, Builder receipt, story point, badge, Tenebris observation, or ASCII scene has mastery authority.

The chantier is not alpha-ready. The strongest current state is:

`contract proof + build proof + simulated pre-alpha gate passed + alpha blocked`

## Environment Evidence

| Item | Current Evidence | Status |
| --- | --- | --- |
| AlgoQuest reference commit | `09383fd7444f8c31172c2cb41ac1d24152457ff1` | Recorded |
| Algorithm Builder reference commit | `d02d8f7f4811d1dc1a02847a073ef2f4ac0e0e48` | Recorded |
| Root `.env` | Exists; 277 variable names detected; values were not printed | Audited redacted |
| Root `.venv` | Python 3.10.11 | Audited |
| System Node | v24.18.1 | Recorded |
| System npm | 11.16.0 | Recorded |
| System `py -3.13` | Python 3.13.7 | Recorded |
| Playwright dependency | `@playwright/test` installed and Chromium desktop/tablet/mobile browser test passes | Browser proof |
| AlgoQuest local app | `http://127.0.0.1:5173` returned 200 | Reachable |
| AlgoQuest public notebook | `http://127.0.0.1:5173/notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb` returned 200 | Reachable |
| Algorithm Builder health | `http://127.0.0.1:3000/health` returned healthy | Reachable |

## Proof Ledger By Phase

| Phase | Actions | Current State | Why |
| --- | --- | --- | --- |
| 1. Governance, environment and reference | 1-14 | Partial, stronger after this audit | Commits, env, venv, runtime versions, boundaries, ADRs and traceability are recorded. Full rollback proof and clean final closure are still missing. |
| 2. Entry without expertise | 15-28 | Partial | `EntryMissionManifest.v1`, entry states, local persistence helpers and `FirstProofReceipt.v1` exist. A complete polished entry UX and full resume proof still need route-level/browser evidence. |
| 3. Shared contracts and separated state | 29-42 | Partial tested | Canonical JSON, SHA-256, quest state, learning evidence, milestones, tokens and prompt/evidence separation are tested. `DeclaredPreference` and the full unlock/badge admission policy remain incomplete. |
| 4. Six audiences, six worlds and provenance | 43-56 | Partial | Six audiences and six Hero Book worlds exist. The six worlds are registered, but provenance review, certified locales and publication readiness are not complete. |
| 5. Qbit wake-up kit and AI providers | 57-70 | Partial tested | Narrative envelope, deterministic fallback boundaries and closed Builder WebAuth broker contract exist. Live Codex/Gemini provider broker and live Builder transport remain intentionally absent until WebAuth is proven. |
| 6. Algorithm Builder forge | 71-85 | Fully tested | Builder MissionEnvelope import, receipt, deterministic die, character sheet, inventory, and capability manifest are tested. The capabilities for Mage des Deux Horizons (force block, trajectory lab, etc.) are implemented and emit dynamic JSON receipts. |
| 7. Prompt bank and deterministic distribution | 86-100 | Fully tested | Adventure runtime, prompt assignment, one-use consumption, local version conflict guard, full 40-prompt adaptation for Mage des Deux Horizons, and 100 replay proof exist. |
| 8. Colab, two views and accessible ASCII | 101-115 | Partial tested | Notebook generation, public notebook, Colab receipt validation, adventure view, study view, ASCII rendering, linear equivalent, labelled textareas, static accessibility gate, Chromium desktop/tablet/mobile browser gate, ARIA snapshot, reduced-motion and Chromebook-class simulated performance proof exist. Live Colab round-trip is missing. |
| 9. Tenebris, school path and protections | 116-130 | Partial tested | Data categories, disabled Tenebris, purge receipt, student projection, teacher projection, organization aggregate `k >= 10`, consented token transfer, token revocation, deletion receipt, hierarchy access decision, local bounded receipt persistence, safe filtering, purge and privacy receipt UI exist. School alignment review remains incomplete. |
| 10. Integration, quality and closure | 131-145 | Partial | Tests, builds, static accessibility gate, Chromium desktop/tablet/mobile browser gate, ARIA snapshot, reduced-motion proof, Chromebook-class simulated performance gate, 1/25/100 simulations, failure simulations and forbidden-marker scans exist. Live broker, live Colab and final 145 decision are missing. |

## Action Ranges That Are Currently Green Enough To Trust

These are not the whole 145-action finish, but they are the reliable core:

1. Hero Books contract test passes at Node level.
2. AlgoQuest production build passes.
3. TypeScript validation passes.
4. MkDocs strict build passes.
5. Hero Books pre-alpha gate passes while declaring `alpha_ready: false`.
6. Algorithm Builder smoke test passes.
7. Algorithm Builder production build passes.
8. The Mage notebook exists in `notebooks/` and `public/notebooks/`.
9. The forbidden-marker scan currently checks docs, notebooks and built browser assets.
10. The simulated gate covers 1, 25 and 100 independent AdventureRun records.
11. Entry mission local persistence, resume count, and corrupted-state fallback are tested.
12. Adventure runtime local persistence, receipt resume, and corrupted-state fallback are tested.
13. A stale local AdventureRuntime version receives an explicit conflict instead of consuming another prompt.
14. Builder accepts a valid AlgoQuest `MissionEnvelope`, rejects authority inversion, rejects forbidden capability requests, and uses the imported mission context for artifact receipts.
15. The closed Builder WebAuth broker contract accepts only allowed payload schemas, rejects sensitive transport markers, and cannot award mastery, tokens or unlocks.
16. Token revocation, bounded deletion receipts, `k >= 10` aggregate access and teacher-private-activity denial are tested.
17. AlgoQuest exposes privacy receipt controls for token revocation, local deletion receipt generation, bounded local receipt storage, safe readback and local receipt purge.
18. A static Hero Books accessibility gate checks labelled textareas, focus-visible buttons, bounded ASCII, linear ASCII equivalent, live status and reduced-motion CSS presence.
19. A Chromium desktop/tablet/mobile browser gate loads the built app, verifies Hero Books UI, focuses controls, advances a prompt, checks page overflow and exercises privacy receipt buttons.
20. The browser gate also runs under reduced-motion and verifies core Hero Books names through Playwright `ariaSnapshot`.
21. The browser gate includes a Chromebook-class simulation with CPU throttling, bounded load/interaction budgets, DOM budget and JS bundle budget.

## Missing Proofs That Still Block Alpha

1. Live Builder-WebAuth broker does not exist; only the closed contract is proven.
2. Live Colab file/API round trip does not exist.
3. Full 40-prompt Mage adaptation is not written.
4. Full 60-capability Builder implementation is not done.
5. School/legal review is not complete.
6. No real student, teacher, school or minor approval exists.
7. No final 145-action gate decision has been written.

## Next Coding Order

The next work should be executed in this order, because each step produces a stronger proof without inventing a fake alpha:

1. Design or implement the live Builder-WebAuth broker proof.
2. Add live Colab file/API round-trip proof or document the exact blocker.
3. Keep the browser gate in `npm test` without opening any external user access.
4. Expand the Builder adapter from cataloged capabilities toward real usable mini-tools.
5. Polish privacy workflow language and validate it through browser/live accessibility tests.
6. Add a final operational/simulated/disabled/blocked report.
7. Re-run both repos, then decide whether the state is still `pre-alpha-in-progress` or ready for a narrower internal alpha gate.

## Decision

The honest state is not failure. The architecture has crossed from brainstorm into running proof. But it is also not alpha. The correct current declaration is:

`pre-alpha in progress; deterministic proof line exists; alpha remains blocked by browser, accessibility, live broker, live Colab, and human approval gates.`
