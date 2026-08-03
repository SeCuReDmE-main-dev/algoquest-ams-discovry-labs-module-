# AlgoQuest Hero Book Prompt Bank

Date: 2026-08-03  
Status: research hypothesis, pre-alpha, no learner deployment

## Objective

Define the research basis for a new AlgoQuest experience that takes the emotional grammar of classic gamebooks without copying their text, worlds, characters, art, titles, or proprietary systems.

The proposed unit is a **Hero Book**. One Hero Book contains **240 prompt prefabs**: six audience-specific adventures with forty prompt-quests per adventure. The six audiences are Primary 5-6, Secondary 1-2, Secondary 3-5, College, University, and Educator Player. Ten Hero Books would therefore contain 2,400 canonical prompt-quests. Three languages would be localized renderings of the same canonical quest graph, not three independently authored engines.

The central correction is architectural: this is **not** a page-turning Choose Your Own Adventure clone. A distribution engine searches a governed prompt bank for the unused quest needed now. Story gives each prompt emotional continuity; metadata, evidence, learning coverage, and narrative state determine whether the prompt is eligible.

Within one adventure run, a prompt prefab is assigned **once only**. It moves from `available` to `assigned`, then to `resolved`, `abstained`, or `incomplete`; it cannot return to `available` in that same adventure. A bounded retry belongs to the same assignment and does not consume a second prompt. The forty prompts are therefore a finite, authored quest budget that the engine distributes across the full adventure rather than a menu that can repeat the easiest activity indefinitely.

Each assigned quest must also be capable of serving two distinct progressions: the simulated Hero Book adventure and the learner's current school-year path. The first gives context, agency, and narrative reward. The second records only observable evidence against a real, age- and territory-appropriate learning objective. They meet at the prompt assignment, then remain separately explainable.

## Nine Product Directions

1. **Entry without prior expertise.** A learner can start without prior algorithmic, quantum, mathematical, or physics expertise.
2. **A real first success in fifteen minutes.** The first session produces a small, inspectable artifact rather than only an explanation or a chat exchange.
3. **Game mechanics tied to evidence.** Quests and rewards make sustained effort desirable; they never substitute for evidence of learning.
4. **Six audience bands.** Primary 5-6, Secondary 1-2, Secondary 3-5, College, University, and Educator Player receive adapted versions without cognitive labels.
5. **A governed Codex/Gemini wake-up kit.** The model helps the learner begin, clarify, and reflect through bounded contracts; it has no authority to award mastery.
6. **Prefab project construction.** The learner builds a concrete project with guided prompts, artifacts, checks, and recoverable mistakes rather than merely consuming content.
7. **Prompt-bank adventure engine.** A Hero Book contains six audience-specific adventures of forty prompts. A deterministic distributor selects an eligible, unused prompt; each card is used once per adventure run and leaves an auditable receipt.
8. **Two linked but distinct experiences.** The game view carries hero, world, quest, and narrative reward. The education view carries the real task, evidence, accessibility, and retry. The same assignment advances the story, but story choices never certify learning.
9. **School-year knowledge path and transfer.** Validated evidence maps to the active curriculum, unlocks deeper study support, and builds transferable foundations in algorithms, mathematics, physics, modelling, and responsible tool use without advertising future suite products inside the story.

## Environment / Stack Context

AlgoQuest is currently a Vite/React pre-alpha application with `/student`, `/teacher`, and a local Learning Lab. Its cross-tool contracts are typed and secret-filtered, but its current runtime remains local/fixture-led: there is no live suite API broker, backend telemetry sink, or end-to-end inter-tool proof yet.

The planned Hero Book must preserve existing role, consent, redaction, and human-review boundaries. It must not make Gemini, Codex, or the game interface an authority for learner mastery.

## Research Questions

1. Which durable gamebook patterns are useful: hero construction, persistent inventory, quest maps, state continuity, replay, and consequence?
2. How can 240 prompts produce a coherent story while remaining searchable rather than page-bound?
3. How can an adventure distribute exactly forty unique prompts while preserving prerequisites, remediation, narrative continuity, and broad subject coverage?
4. Which choices are dramatic choices, which are learning choices, and which are only presentation preferences?
5. How should the game interface and education interface share state without conflating enjoyment with evidence of learning?
6. How should each quest map to the learner's real school-year objectives without turning game points into a grade or diagnosis?
7. How can a quest teach transferable foundations in algorithms, mathematics, physics, and disciplined tool use without naming a future suite product as the lesson destination?
8. What structured context should Gemini receive so it can act as quest guide without inventing progress, artifacts, or permissions?
9. Which authoring tools and validation patterns can prevent dead ends, circular dependencies, broken translations, and inaccessible controls?
10. Which intellectual-property boundaries let the project learn from historic gamebooks while remaining original?

## Findings

### 1. The design language is useful; copying a series is not

**Confirmed by primary sources.** Fighting Fantasy demonstrates compact player attributes, inventory, and risk; Lone Wolf demonstrates an evolving campaign and a reader-facing rules handbook; DestinyQuest demonstrates character customization, quests, rewards, maps, and a visible hero sheet; Fabled Lands demonstrates persistent state across an interconnected world. Inkle's Sorcery! demonstrates that a historic gamebook can be transformed into a stateful digital narrative with a map, conditional writing, and long-term consequences.

AlgoQuest may learn from these *patterns*, but it must create its own characters, universe, prose, mechanics, visual identity, and quest content. The methods of a game are not protected as such, while the expressive text and art can be protected. Do not use protected series titles as product labels or present this as an adaptation.

### 2. Hero Book is a searchable, single-use quest bank, not a static branch tree

**Inferred from multiple secondary and primary sources.** Ink, Twine, ChoiceScript, Yarn Spinner, and Inform show different ways to manage choices, variables, conditional visibility, and recombining narrative flow. The relevant lesson for AlgoQuest is not to import one of those runtimes blindly. It is to store quests as separately addressable nodes with explicit state and validation.

Each prompt prefab needs at least:

```text
prompt_id              # stable, versioned identity
hero_book_id           # the narrative container
audience_band          # primary_5_6, secondary_1_2, secondary_3_5, college, university, educator_player
chapter                # one of five narrative acts
quest_type             # discover, choose, build, test, repair, explain, publish
story_hook             # why this matters in the world
learning_goal          # observable concept or skill
subject_tags           # algorithm, mathematics, physics, modelling, etc.
transfer_foundations   # reusable concepts, never a hidden product advertisement
prefab_target          # project/artifact being built
prerequisites          # prompt IDs, concepts, artifacts, consent gates
search_tags            # topic, time, modality, language, tool, accessibility
input_contract         # allowed learner or project evidence
gemini_turn_contract   # bounded guide instruction and output schema
evidence_gate          # deterministic acceptance rule, abstention path
next_candidates        # eligible recommendations, never an unguarded jump
localization_key       # canonical content identity across languages
version + digest       # reproducible publication and replay
```

The bank is searched by structured filters first: selected Hero Book, active adventure, declared audience band, project state, available time, target skill, completed evidence, required tool, language, and accessibility settings. Semantic search may help an adult author find a quest, but it must not silently award mastery or choose a learner's canonical progression.

Each adventure has an immutable `AdventureRun` ledger. A database uniqueness rule must prevent the same `prompt_id` from being assigned twice to the same `adventure_run_id`. The next selection considers only unused eligible cards and records why that card was selected: prerequisite digest, story-state digest, evidence-state digest, coverage deficit, and selection-policy version. The run closes only after its authored forty-card budget has been distributed, with unresolved cards visibly accounted for rather than silently treated as success.

This changes adaptation in an important way. The engine may change **order, framing, hint level, modality, and retry support**. It may not evade difficulty by silently repeating a completed card or create unreviewed prompts to fill a gap. Remediation and recovery are authored within the forty-card set and are selected by the same bounded policy.

### 3. Story continuity and prompt retrieval are different systems

**Confirmed by primary sources for the technical mechanisms; recommended architecture is an inference.** The story engine keeps a small canonical state: hero identity, world location, unresolved stakes, allies, inventory-like narrative tokens, chapter, and a short verified recap. The educational engine keeps the learner's approved evidence, prerequisites, accommodations, and progress decision. The prompt bank joins them only when it selects a quest.

Gemini must receive a compact `QuestTurn` packet, never all 240 prompts:

```text
Story Bible + safety rating + approved quest tone
Verified story recap + current location + active stakes
Selected PromptCard + allowed alternatives + required evidence
Learner-visible artifact summary + no raw sensitive data
Output schema: narration, choices, requested action, evidence request, abstain reason
```

Gemini may narrate and guide. The AlgoQuest runner validates the selected prompt, permissions, artifact receipt, and next candidate. A story choice alone cannot increase an educational statistic. A statistic changes only after the relevant evidence gate passes.

### 4. Two interfaces should be distinct views over one governed state

| Game interface | Education interface |
| --- | --- |
| Hero creation, map, character voice, story recap, quest board, cosmetic rewards, voluntary exploration | Current prefab, learning goal, explicit action, hints, artifact checklist, accessibility controls, evidence and retry state |
| Explains the narrative reason for a quest | Explains the real construction reason for a quest |
| May display non-academic story attributes | Displays only justified learning progress and never a diagnostic label |
| Lets the learner browse eligible quests | Shows why a quest is eligible, blocked, or optional |

The interfaces must not be merged into one overloaded screen. They share a `PromptCard` ID, a consent-scoped session, a project artifact reference, and a deterministic evidence receipt. They do not share raw private learner content with teachers or organizations.

### 5. One quest should yield two separate, inspectable progress records

**Recommended architecture; pending curriculum and learner validation.** A completed or attempted quest can affect both the adventure and the school-year path, but it must leave two different receipts.

| Record | What it contains | What it must not claim |
| --- | --- | --- |
| `AdventureReceipt` | assigned prompt, story consequence, quest status, map change, narrative points, cosmetic or world reward | school mastery, grade, intelligence, or diagnosis |
| `LearningEvidenceReceipt` | curriculum objective, artifact reference, evidence rule, result, retry or human-review state, date, and policy version | that a story choice or time spent equals knowledge |

The Hero Book interface can show points, possessions, world repair, allies, and chapter progress. These rewards motivate a complete adventure, but they are not a report card. The education interface shows the same quest's real learning connection in plain language: for example, observe a variable, recognize a pattern, build an algorithm, measure a result, test a prediction, or explain a decision.

Each `PromptCard` therefore has zero or more explicit `CurriculumLink` records:

```text
curriculum_pack_id       # jurisdiction, school year, subject, approved version
objective_id             # precise outcome or competency
evidence_requirement     # what counts and what does not count
contribution_weight       # bounded contribution; never an automatic final grade
teacher_review_policy     # automatic evidence, review required, or unavailable
```

The engine maintains a separate `SchoolYearPath` for the learner's active curriculum pack. It can aggregate validated evidence into a transparent knowledge view, show concepts needing practice, and guide the next eligible quest. It must not infer ability from points, use a leaderboard, expose a teacher's individual activity to management, or convert a game total directly into a school grade. A teacher's approved plan determines which curriculum pack applies; until that exists, synthetic packs are the only permitted content.

### 6. Quest progress should unlock deeper study support, not merely more game content

**Recommended architecture; evidence thresholds require classroom validation.** The point of advancing through a forty-prompt adventure is to make the learner increasingly able to study, connect, and use an idea. The system should therefore maintain a per-concept `UnderstandingPath`, separate from both story points and a formal grade:

| Evidence-backed state | Study support unlocked |
| --- | --- |
| `introduced` | concise explanation, key words, visual or concrete example |
| `guided_practice` | one visible action at a time, hints, comparison with a worked example |
| `independent_application` | an unscaffolded but bounded practice task and error-specific review |
| `transfer` | a new context linking algorithmic thinking, mathematics, physics, modelling, or tool practice |
| `explain_and_review` | learner explanation, creation of a variant, or peer/teacher-facing review artifact |

An `UnderstandingUnlock` is granted only from an eligible `LearningEvidenceReceipt`, never from a story choice, elapsed time, or accumulated adventure points. It should open a richer way to learn: a better explanation, a meaningful practice problem, a relation to another subject, a revision path, or an opportunity to explain. It must not label the learner as intelligent, weak, gifted, or incapable.

Core explanations and help remain available at every state. Unlocking changes the next appropriate depth of practice; it must never become a punishment, a paywall for knowledge, or a reason to conceal help from a learner who is blocked. The education interface shows the concept, the evidence received, what is now available, and the honest next step. The game interface translates the same advancement into the changing world of the adventure.

### 7. Six audience bands and five acts create a reusable authoring matrix

**Tentative due to missing learner trials.** The proposed matrix is a strong production constraint, not an evidence claim yet.

The audience band is chosen or explicitly assigned; it is never inferred from points, mistakes, or an alleged cognitive type. It changes language, pace, project scope, safety boundaries, and available representations. It does not replace the evidence-backed `UnderstandingPath` defined above.

| Audience band | Learner posture | Difference in prompt behavior |
| ---: | --- | --- |
| Primary 5-6 | discovers through concrete construction | short vocabulary, one visible action, frequent confirmation, tangible examples |
| Secondary 1-2 | modifies a safe baseline | guided comparison, explicit variables, named choices, short investigations |
| Secondary 3-5 | builds and debugs a constrained system | requirements, counterexamples, reproducible checks, stronger maths and modelling links |
| College | connects theory to a technical or applied project | trade-offs, documentation, data interpretation, project constraints |
| University | investigates and defends a rigorous solution | assumptions, methods, sources, limits, reproducible evidence, peer-review preparation |
| Educator Player | plays, adapts, and audits learning experiences | pedagogical variants, accessibility choices, evidence review, facilitation without surveillance |

Each audience-specific adventure has forty prompts grouped into five acts of eight: orientation, investigation, construction, verification, and publication/reflection. These acts label the prompt bank; they do not force a rigid page sequence. The distribution engine may surface a compatible repair quest before a later build quest, but each prompt remains single-use within that adventure and the evidence gate remains strict.

Every adventure also needs a coverage matrix. Its forty prompts should deliberately distribute foundations in algorithmic thinking (decomposition, state, conditions, loops, testing), mathematics (quantity, pattern, proportion, logic), physics or modelling (observation, variables, prediction, measurement), and responsible tool practice (instructions, inputs, outputs, verification, documentation). The story uses those foundations to solve meaningful world problems. It does not need to name a future SecuredMe product. When the learner later enters another tool, the familiar mental models should transfer; the education view must still state the real concept being practised in age-appropriate language.

### 8. Game mechanics must serve agency and learning evidence

**Inferred from multiple secondary sources.** Game design research distinguishes mechanics, the runtime dynamics those rules create, and the player experience. For AlgoQuest, a reward is valid only when it recognizes an observable action: a tested artifact, a clear explanation, a repaired defect, a documented decision, or an ethical refusal. Streaks, leaderboards, loot pressure, and artificial scarcity are not default mechanics.

The game may have experience points, badges, maps, and hero roles, but each must be explicitly classified as one of:

- `story_only`: atmosphere or personalization; never learning evidence;
- `practice_signal`: indicates voluntary repetition; never mastery;
- `evidence_linked`: unlocks only after a deterministic artifact or explanation gate;
- `teacher_review_required`: may be visible but requires a human decision.

### 9. Accessibility and authoring validation are first-class requirements

**Confirmed by primary sources.** Interactive fiction still needs keyboard operation, visible focus, readable controls, meaningful alternatives to drag gestures, accessible media descriptions, and tested screen-reader behavior. It also needs narrative QA: each published quest should be playtested for broken links, unreachable essential prompts, inappropriate language, false completion, and translation drift.

The authoring tool needs a visual graph and a test runner. It must find unreferenced prompts, illegal loops, impossible prerequisites, inconsistent level labels, missing localization keys, and reward paths that lack an evidence gate before publication.

## Recommended Path

1. Freeze a neutral `HeroBookManifest.v1` and `PromptCard.v1` before writing prose or UI.
2. Write one Story Bible that is wholly original: its world, protagonist, conflict, rules, tone, age ratings, prohibited themes, and visual vocabulary.
3. Author one full Primary 5-6 adventure of forty prompts, including its required coverage and recovery cards. Validate every prompt's search eligibility, single-use assignment, artifact receipt, failure, retry, pause, resume, and accessibility with synthetic runs.
4. Add an `AdventureRun` ledger and a deterministic distribution policy before the game UI. Prove that a synthetic run assigns exactly forty distinct prompt IDs, never repeats a card, and explains every selection.
5. Add a versioned `CurriculumLink` and `SchoolYearPath` contract. Use a synthetic curriculum pack first; do not claim a real school alignment without the applicable approved programme and educator review.
6. Add `UnderstandingPath` and `UnderstandingUnlock` contracts, then test that only valid evidence, never story points, can unlock deeper study support.
7. Add the five remaining audience bands through the same schema. Do not author six free-form stories that cannot share artifact rules, transfer foundations, curriculum links, or translations.
8. Add the separate game and education interfaces after the prompt runner is proven. Both interfaces query the same approved prompt bank and display their own receipt.
9. Treat Gemini and Codex as bounded quest guides. Require structured outputs and let the runner, not the model, decide which prompt is legal and whether evidence is sufficient.
10. Perform author review, curriculum review, accessibility review, rights review, and synthetic playthroughs before any learner pilot.

## Alternatives Considered

| Alternative | Decision | Reason |
| --- | --- | --- |
| Literal page-turning book with permanent numbered branches | Reject as core model | It cannot efficiently search 240 prompts by prefab, need, proof, or accommodation. The style is useful; the navigation model is not. |
| Reusable prompt menu within one adventure | Reject | It undermines the authored forty-prompt distribution, hides avoidance of difficult work, and cannot give a complete auditable adventure ledger. |
| Fully generative story with no authored quest bank | Reject | It cannot guarantee prerequisites, factual boundaries, replay, translations, or evidence gates. |
| Adopt Twine, Ink, ChoiceScript, or Yarn Spinner as the full runtime immediately | Defer | They are valuable authoring references. AlgoQuest needs a data contract integrated with its existing governance and evidence model before selecting any adapter. |
| One combined game-and-education screen | Reject | It hides why a task matters and turns pedagogical proof into entertainment pressure. |
| One undifferentiated point total | Reject | Story reward and curriculum evidence would become indistinguishable, producing false claims about school mastery. |
| One Hero Book per level with unrelated content | Reject | It multiplies authoring and localization work while breaking continuity. |

## Risks / Unknowns

- A 240-prompt Hero Book is a serious editorial program, not a prompt-template exercise. It needs an authoring calendar, playtesting budget, localization review, and version governance.
- A fixed forty-prompt adventure requires carefully authored recovery paths. The rule must distinguish a retry within one assignment from illegally reusing that prompt as a new quest.
- Transfer must be honest: the game can avoid naming other suite products, but it cannot conceal the concept being practised or collect unexplained performance data.
- School-year alignment is jurisdiction- and teacher-plan-specific. A generic mapping is a synthetic design fixture, not evidence of alignment with a live class programme.
- Google Colab has temporary runtimes and may store shared notebook text, code, outputs, and comments. It cannot be the canonical learner state or a place for sensitive content.
- Gamebook inspirations remain copyrighted and some names are protected as brands. The project must use original content and a documented provenance policy.
- The six-level matrix is a design hypothesis. It requires testing by age band and accessibility need; it must never become a diagnosis or fixed intelligence label.
- The Educator Player band must remain a private player experience. A school leader must not gain access to an educator's individual play history, reflections, or operational activity merely because that person has an organizational role.
- Any minor, classroom, persistence, or external-agent deployment remains subject to existing pre-alpha privacy, consent, and review gates.

## Sources

### Historic gamebooks, persistent heroes, and digital adaptations

1. [Fighting Fantasy: official home](https://www.fightingfantasy.com/)
2. [Fighting Fantasy: gamebook catalogue](https://www.fightingfantasy.com/ff-gamebooks)
3. [Choose Your Own Adventure: history](https://www.cyoa.com/our-history/)
4. [Project Aon: Lone Wolf Internet Editions](https://projectaon.org/en/Main/Home)
5. [Project Aon: Readers' Handbook](https://www.projectaon.org/en/ReadersHandbook/Home)
6. [Project Aon: license](https://www.projectaon.org/en/Main/License)
7. [Fabled Lands series study](https://www.gamebooks.org/Series/145/Show)
8. [DestinyQuest: hero, quests, and customisation](https://www.destiny-quest.com/)
9. [DestinyQuest: player guides and hero sheets](https://www.destiny-quest.com/downloads/)
10. [Inkle: Sorcery!](https://www.inklestudios.com/sorcery/)
11. [Inkle: Sorcery! press kit](https://www.inklestudios.com/press/sorcery/)
12. [Fighting Fantasy historical series study](https://www.gamebooks.org/Series/11/Show)
13. [ReadWriteThink: Choose Your Own Adventure hypertext writing](https://www.readwritethink.org/classroom-resources/lesson-plans/choose-your-adventure-hypertext)
14. [ReadWriteThink: student interactive-story rubric](https://www.readwritethink.org/sites/default/files/resources/lesson_images/lesson128/Student_webpage_rubric.pdf)
15. [ERIC: interactive CYOA e-books and comprehension](https://eric.ed.gov/?id=ED645162)

### Authoring, state, branching, and narrative QA

16. [Ink: official narrative scripting language](https://www.inklestudios.com/ink/)
17. [Ink: Writing with Ink reference](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)
18. [Twine: official reference](https://play.twinery.org/reference/en/)
19. [Twine Cookbook](https://twinery.org/cookbook/index.html)
20. [Inky editor source and workflow](https://github.com/inkle/inky)
21. [ChoiceScript introduction](https://www.choiceofgames.com/make-your-own-games/choicescript-intro/)
22. [Yarn Spinner documentation](https://www.yarnspinner.dev/docs/)
23. [Yarn Spinner: scripting fundamentals](https://yarnspinner.dev/docs/yarn/02-fundamentals/)
24. [Yarn Spinner: graph, tests, localization, and commands](https://www.yarnspinner.dev/features/)
25. [Inform: official documentation](https://ganelson.github.io/inform-website/doc/)
26. [Inform 7: writing a first game](https://inform-7-handbook.readthedocs.io/en/v3.0/chapter_1_getting_started/writing_your_first_game/)
27. [IFTF interactive-fiction accessibility report](https://accessibility.iftechfoundation.org/)
28. [IFComp: playtesting guidance for authors](https://ifcomp.org/about/guidelines)
29. [MDA framework: mechanics, dynamics, aesthetics](https://www.cs.northwestern.edu/~hunicke/MDA.pdf)
30. [Situating Quests: design patterns for RPG quests and levels](https://citeseerx.ist.psu.edu/document?doi=2780204f5331f9fbcc17ac029a238a663bc9c777&repid=rep1&type=pdf)
31. [Interactive narrative salience research](https://scholars.uky.edu/en/publications/manipulating-narrative-salience-in-interactive-stories-using-inde/)
32. [Automated quest generation in text adventures](https://arxiv.org/abs/1909.06283)
33. [Interactive fiction as a text-based simulation environment](https://arxiv.org/abs/1909.05398)
34. [Interactive-fiction world building with a knowledge graph](https://arxiv.org/abs/2001.10161)
35. [Educational nonlinear stories with Twine](https://learningatscale.acm.org/las2022/wp-content/uploads/2022/05/LS_2022_paper_93-2.pdf)

### Learning, assessment, accessibility, and age-aware design

36. [Narrative game-based learning for language development: systematic review](https://ijlter.org/index.php/ijlter/article/view/17868)
37. [Narrative categorization in digital game-based learning](https://bera-journals.onlinelibrary.wiley.com/doi/abs/10.1111/bjet.13004)
38. [Gamification of learning: meta-analysis](https://eric.ed.gov/?id=EJ1245270)
39. [Gamification in K-12 education: systematic review](https://doi.org/10.1111/bjet.13335)
40. [EEF: feedback evidence review](https://educationendowmentfoundation.org.uk/index.php/education-evidence/teaching-learning-toolkit/feedback)
41. [EEF: planning, monitoring, and evaluating learning](https://educationendowmentfoundation.org.uk/news/updated-resource-supporting-independence-through-questioning-a-planning-tool)
42. [K-12 Computer Science Framework: progression](https://k12cs.org/framework-statements-by-progression/)
43. [CAST UDL: optimize choice and autonomy](https://udlguidelines.cast.org/engagement/interests-identities/choice-autonomy/)
44. [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
45. [W3C: new WCAG 2.2 keyboard, drag, targets, and help criteria](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)

### Governed AI, reproducible notebooks, and rights boundaries

46. [Google Colab FAQ: execution, sharing, storage, and limits](https://research.google.com/colaboratory/intl/en-GB/faq.html)
47. [Gemini: structured outputs](https://ai.google.dev/gemini-api/docs/structured-output?authuser=14&hl=en)
48. [Gemini: tools and function calling](https://ai.google.dev/gemini-api/docs/tools?hl=en)
49. [OpenAI: plugins in Codex](https://help.openai.com/en/articles/20001256-plugins-in-codex/)
50. [U.S. Copyright Office: games and copyrightable expression](https://www.copyright.gov/register/tx-games.html)
