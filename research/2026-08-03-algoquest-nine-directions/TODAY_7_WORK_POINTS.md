# AlgoQuest: seven work points for 2026-08-03

These are the seven concrete work streams behind product directions 7-9. They are preparation work, not an authorization to change the learner runtime.

1. **Freeze the Hero Book contract.** Define `HeroBookManifest`, `AudienceBand`, `AdventureRun`, `PromptCard`, version, digest, localization, and original-content provenance.
2. **Define single-use prompt allocation.** Specify `available -> assigned -> resolved | abstained | incomplete`, the uniqueness constraint per adventure run, bounded retries, and an allocation receipt.
3. **Separate story state from education state.** Keep hero/world/stakes in one bounded state; keep prerequisites, artifact evidence, accommodations, and decisions in another.
4. **Build the curriculum crosswalk.** Define `CurriculumLink`, `SchoolYearPath`, consent and teacher-plan boundaries, and the rule that story points never become grades.
5. **Define deeper-study unlocks.** Model `introduced`, `guided_practice`, `independent_application`, `transfer`, and `explain_and_review` from evidence, while keeping core help available.
6. **Sketch the two interfaces.** Game view: story, quest, map, voluntary exploration. Education view: real task, goal, hints, accessibility, evidence, and retry.
7. **Create authoring and safety gates.** Require a detailed Hero Book dossier before prompts are authored: source provenance, history-versus-fiction boundary, cultural-review placeholder, rights boundaries, the 40-prompt arc, unreachable-prompt tests, evidence-gate tests, accessibility checks, and synthetic playthroughs.
