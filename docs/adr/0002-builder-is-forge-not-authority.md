# ADR 0002: Algorithm Builder Is Forge, Not Authority

Status: accepted

Date: 2026-08-03

## Context

Algorithm Builder is needed inside Hero Books as the mechanical surface: character sheet, deterministic die, inventory, construction workbench and artifact exporter. That makes it powerful enough to influence the learner experience, so its authority must be bounded.

## Decision

Algorithm Builder can construct, visualize, test and export algorithm artifacts through `AlgorithmArtifactReceipt.v1`. It cannot select story prompts, award story milestones, issue Knowledge Tokens, diagnose a learner, retain sensitive traces, or decide mastery.

## Consequences

- Builder exposes a `BuilderCapabilityManifest.v1`.
- Capabilities are classified as `available`, `planned`, `disabled` or `forbidden`.
- AlgoQuest rejects or ignores any Builder output that is not a valid receipt.
- The legacy score event remains compatibility material, but Hero Books use artifact receipts.

## Current Evidence

- `algorithm-builder-app/src/algoquestQbitAdapter.js` creates `AlgorithmArtifactReceipt.v1`.
- `algorithm-builder-app/scripts/smoke-test.js` verifies the manifest, forbidden capabilities and receipt contract.
