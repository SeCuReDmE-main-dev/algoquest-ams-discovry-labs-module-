# AlgoQuest Hero Books: content scaling model

Date: 2026-08-03  
Status: planning arithmetic, not a production commitment

## Initial library: six Hero Books

The present decision is to prepare six Hero Book themes before deciding on a post-beta expansion:

1. **Le Gardien du Ciel et de l'Eau** - period and cultural boundary still to be selected.
2. **Le Ronin des Six Provinces** - original Japan-inspired alternate-history fantasy.
3. **La Couronne des Marees** - original maritime historical fantasy.
4. **L'Alchimiste et la Porte des Chenes** - Grand Oeuvre-based fantasy with historical boundaries.
5. **Le Neurone Sans Cerveau** - fictional inquiry around the ideas of 1905, not neuroscience about genius.
6. **Le Donjon des Sept Sceaux** - original high-fantasy gamebook about maps, runes, systems, and discovery. It may use the broad tabletop-fantasy feeling associated with early gamebooks, but it must not use Dungeons & Dragons names, worlds, creatures, rules text, art, or story material.

## Base formula

Let:

```text
H = number of Hero Book themes
A = audience bands = 6
Q = unique prompts distributed per audience-specific adventure = 40
L = localized languages = 3
```

```text
audience-specific adventures = H x A
reviewable prompt cards      = H x A x Q
localized prompt renderings  = H x A x Q x L
```

## Arithmetic for the initial six stories

```text
H = 6
A = 6
Q = 40
L = 3

adventures                  = 6 x 6        = 36
acts (5 per adventure)      = 36 x 5       = 180
reviewable prompt cards     = 6 x 6 x 40   = 1,440
localized prompt renderings = 1,440 x 3    = 4,320
```

For one learner in one audience band:

```text
one Hero Book = 40 assigned prompts maximum
all six books  = 6 x 40 = 240 assigned prompts maximum
```

The learner never sees all 1,440 prompt cards. That number is the authoring and review surface across all audience adaptations. The runner distributes only the forty cards belonging to the learner's current `AdventureRun`.

## Kernel count versus production count

It is useful to preserve two numbers:

```text
shared quest kernels = H x Q = 6 x 40 = 240
reviewable cards     = H x A x Q = 1,440
```

A shared quest kernel can preserve a common story purpose, learning goal, and artifact idea across audience bands. It does **not** remove the need to review each age- and role-specific card. Language, safety, prerequisites, evidence, pace, accessibility, and scope may differ materially between Primary 5-6 and Educator Player. Planning only for 240 prompts would undercount the actual editorial work sixfold.

## Post-beta scale scenarios

| Hero Books | Audience-specific adventures | Reviewable prompt cards | Localized renderings in 3 languages |
| ---: | ---: | ---: | ---: |
| 6 | 36 | 1,440 | 4,320 |
| 12 | 72 | 2,880 | 8,640 |
| 24 | 144 | 5,760 | 17,280 |
| 36 | 216 | 8,640 | 25,920 |

There is no honest final number today. The library should grow only after a beta demonstrates that a Hero Book can be authored, localized, tested, made accessible, and connected to a school-year path without weakening evidence or safety gates. Twelve is a reasonable next capacity scenario to model; twenty-four is a serious editorial programme, not merely more prompts.

## Relations that must remain explicit

```text
HeroBook
  -> AudienceAdventure (one of six bands)
    -> PromptCard (forty, assigned once per run)
      -> StoryState receipt
      -> Artifact pointer
      -> Evidence receipt
      -> CurriculumLink(s)
      -> UnderstandingUnlock candidate
      -> Localization rendering(s)
      -> Source and rights provenance
```

The important multiplier is not only story count. Curriculum packs, jurisdictions, source review, cultural review, localization, assets, and accessibility variants add relation records. They should be represented as links to the same prompt card, not as uncontrolled copies of the card.

## Expansion gates after beta

Before adding Hero Book 7 and beyond, require:

1. One complete 40-prompt adventure per audience band with no duplicate assignment.
2. Synthetic and human-reviewed playthroughs that show the story and learning evidence remain separate.
3. Translation and cultural-review workflow proven on at least one full Hero Book.
4. Accessibility review and remediation for the two interfaces.
5. A source, rights, and curriculum provenance record for every published card.
6. Evidence that the existing books are being completed, resumed, and used for study rather than only opened once.
