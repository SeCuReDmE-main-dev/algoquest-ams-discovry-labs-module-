# ADR 0001: AlgoQuest Owns Missions And Evidence

Status: accepted

Date: 2026-08-03

## Context

The Hero Books line connects AlgoQuest, Algorithm Builder, Google Colab, Qbit, Codex, Gemini and future suite tools. Without a strict authority boundary, story points, model narration, notebook output, or Builder UI events could accidentally become learning proof.

## Decision

AlgoQuest is the authority for missions, prompt assignment, prompt consumption, progression policy, evidence admission, Knowledge Tokens, milestones and unlocks.

Algorithm Builder, Colab, Qbit, Codex and Gemini may produce artifacts, explanations, receipts or bounded narration. They do not decide mastery and they do not mutate canonical learning evidence by themselves.

## Consequences

- `QuestState` may move the fictional adventure.
- `LearningEvidence` changes only through versioned AlgoQuest rules.
- A Builder receipt can support a proof, but it is not proof alone.
- A model response can help narrate or explain, but it cannot create a canonical prompt, source, token or unlock.
- Colab execution is imported through receipts and never becomes durable authority.

## Current Evidence

- `services/heroBooks.js` implements prompt assignment, consumption and first proof admission.
- `scripts/hero-books-contract-test.mjs` verifies prompt one-use, deterministic replay and story/evidence separation.
