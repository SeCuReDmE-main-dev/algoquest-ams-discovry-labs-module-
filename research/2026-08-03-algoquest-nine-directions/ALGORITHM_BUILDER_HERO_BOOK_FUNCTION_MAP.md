# Algorithm Builder App - carte de 60 fonctions Hero Book

Date: 2026-08-03  
Statut: décisions de conception et backlog; aucune fonction de cette liste n'est déclarée livrée sans preuve dans le dépôt.

## Rôle transversal

Algorithm Builder App sert de feuille de personnage, de système de dé déterministe, d'inventaire, d'atelier algorithmique et de générateur de reçus. AlgoQuest gouverne l'histoire et les missions. Colab exécute les expériences. Qbit assure la continuité visible. Codex ou Gemini peut aider dans les limites de la mission, sans attribuer la maîtrise.

Les contrats transversaux prévus sont `HeroBookManifest`, `AdventureRun`, `PromptAssignment`, `CharacterSheet`, `KnowledgeToken`, `AlgorithmArtifactReceipt`, `AdventureMilestone`, `MissionCompletionReceipt`, `AchievementBadge`, `UnlockGrant` et `PurgeReceipt`.

Un jet de dé est reproductible à partir d'une graine de session et d'un compteur. Une récompense narrative ne certifie pas un apprentissage. Un Knowledge Token exige une preuve versionnée. Une observation éphémère ne peut pas modifier directement la maîtrise.

## 1. Le Gardien du Ciel et de l'Eau / Le Mage des Deux Horizons

1. `CosmosCharacterSheet`: attributs de modèle, observation, mesure, comparaison et honnêteté scientifique.
2. `SeededCelestialDie`: événements célestes déterministes, rejouables et liés au reçu de session.
3. `AsciiSkyMap`: carte accessible du ciel, du temple, des observatoires et des routes.
4. `CycleCalendarBuilder`: construction de cycles, périodes, calendriers et prédictions vérifiables.
5. `NewtonianTrajectoryLab`: forces, mouvement, gravité et trajectoires adaptées au niveau.
6. `ModelComparator`: comparaison bornée de descriptions newtoniennes et relativistes.
7. `CurvedGridExplorer`: représentation pédagogique de courbure inspirée de la géométrie de Riemann sans la réduire à une image trompeuse.
8. `FundamentalInteractionsRegistry`: déblocage progressif des quatre interactions fondamentales et de leurs domaines.
9. `ScientificModelReceipt`: hypothèse, données, prédiction, résultat, incertitude et limite.
10. `CosmologyColabExport`: notebook reproductible pour simulation, graphique, test et explication.

## 2. Le Ronin des Six Provinces

11. `RoninCharacterSheet`: stratégie, observation, discipline, responsabilité et récupération après erreur.
12. `SeededTacticalDie`: événements de terrain reproductibles sans hasard opaque.
13. `ProvinceRouteGraph`: graphe des provinces, coûts, risques, alliances et prérequis.
14. `DecisionTreeForge`: construction visuelle de conditions, branches et conséquences.
15. `PathRiskSimulator`: comparaison des chemins selon coût, délai, risque et résultat attendu.
16. `OathConsequenceLedger`: registre narratif des engagements et conséquences, séparé de la note scolaire.
17. `NonviolentEquipmentInventory`: outils de cartographie, négociation, mesure et logistique.
18. `LocalGlobalChoiceTest`: énigmes montrant le conflit entre meilleur choix local et résultat global.
19. `RouteOptimizerColabExport`: notebook de parcours, recherche et optimisation explicable.
20. `ExplainableDecisionReceipt`: options admissibles, règle, choix, preuve et limite.

## 3. La Couronne des Marées

21. `CaptainCharacterSheet`: navigation, probabilité, logistique, confiance et responsabilité d'équipage.
22. `SeededSeaDie`: météo, courant, rencontre et panne déterministes.
23. `AsciiMaritimeMap`: ports, routes, courants, zones de risque et état du voyage.
24. `ResourceLedger`: eau, nourriture, équipage, cargaison et capacité avec transactions vérifiables.
25. `RouteProbabilityLab`: probabilités simples ou avancées selon le niveau.
26. `CipherWorkbench`: encodeur et décodeur pédagogique avec provenance historique.
27. `FraudSignalPuzzle`: détection simulée d'incohérences sans accusation réelle.
28. `AverageExtremeRiskComparator`: distinction entre moyenne, dispersion et événement extrême.
29. `PortAllianceSystem`: contrats, réputation narrative et coopération sans économie manipulatrice.
30. `FleetColabExport`: notebook de routes, ressources, scénarios et sensibilité.

## 4. L'Alchimiste et la Porte des Chênes

31. `AlchemistCharacterSheet`: décomposition, purification, transformation, test et recomposition.
32. `SeededAthanorDie`: instabilité de laboratoire déterministe et non punitive.
33. `GrandWorkPipeline`: pipeline Nigredo, Albedo et Rubedo, avec Citrinitas optionnelle si sourcée et adaptée.
34. `ProblemDecomposer`: séparation d'un problème en données, règles, étapes et inconnues.
35. `DataPurifier`: nettoyage, validation et traçabilité des variables.
36. `PureFunctionForge`: construction de fonctions sans effet caché.
37. `TransformationLedger`: comparaison avant/après et justification de chaque transformation.
38. `ClaimBoundaryTest`: classement entre métaphore, hypothèse, interprétation et preuve.
39. `PhilosophersStoneArtifact`: artefact final symbolique construit à partir des étapes prouvées, jamais promesse de transmutation réelle.
40. `TestedPipelineColabExport`: notebook exécutable avec assertions, erreurs et reprise.

## 5. Le Neurone Sans Cerveau

41. `NeuronCharacterSheet`: curiosité, expérience de pensée, mesure, contradiction et limite d'analogie.
42. `SeededSynapseDie`: événements narratifs reproductibles dans le cerveau fictif.
43. `AsciiThoughtMap`: carte accessible des quatre mondes scientifiques de 1905.
44. `BrownianMotionLab`: simulation de mouvement brownien et distinction signal/bruit.
45. `LightEnergyExplorer`: représentation adaptée de l'effet photoélectrique.
46. `ObserverFrameComparator`: comparaison de référentiels et mesures sans slogan simplificateur.
47. `AnalogyLimitLedger`: enregistrement de ce que l'analogie explique et de ce qu'elle déforme.
48. `ThoughtExperimentBuilder`: variables, hypothèses, observateurs, prédictions et cas limites.
49. `AnnusMirabilisConceptMap`: relations entre les quatre articles sans les fusionner.
50. `ScientificMiniLabColabExport`: notebook reproductible avec données, modèle, résultat et discussion.

## 6. Le Donjon des Sept Sceaux / La Citadelle des Algorithmes

51. `AlgorithmAdventurerSheet`: logique, débogage, structure, efficacité et explication.
52. `SeededRoomDie`: salle, contrainte et défi reproductibles.
53. `AlgorithmInventory`: fonctions, boucles, conditions, piles, files, graphes et artefacts acquis.
54. `VisualConstructionCanvas`: assemblage et inspection visuelle d'algorithmes.
55. `CodeGenerator`: génération bornée de code depuis une structure validée.
56. `StepDebugger`: exécution pas à pas, état des variables, erreur et reprise.
57. `ComplexityIntuitionLab`: comparaison empirique de temps et mémoire adaptée au niveau.
58. `ArtifactChestUnlocker`: coffre débloqué par reçu d'artefact, jamais par simple clic ou réponse IA.
59. `ColabRoundTrip`: export, exécution, import et comparaison de digest entre Builder App et Colab.
60. `CitadelFinalReceipt`: prompt utilisé, blocs, code, tests, explication, transfert, milestones et tokens accordés.

## Relation avec les fins d'histoire

Ces fonctions ne déterminent pas seules les aventures. Pour chaque monde, le `CanonicalStoryEnding` et le `CanonicalLearningPurpose` sont définis avant le choix des fonctions. L'`AdventureOutcomeMatrix` précise ensuite, pour chaque public, classe, territoire et langue, quelles fonctions sont obligatoires, optionnelles ou interdites, quel artefact final est attendu et quelle preuve permet un déblocage.

## Frontière Tenebris

Les métriques acoustiques appartiennent au registre V.O.T Guardian. Le cycle éphémère Tenebris est réutilisable par contrat. Les observations d'interaction propres à Builder App doivent passer par un adaptateur versionné; seuls des résultats grossiers autorisés peuvent sortir de la fenêtre mémoire. Les métriques durables de parcours reprennent les catégories déjà conçues dans Scholarium Teach: réussite, délai, aide demandée, rappel différé, transfert et refus explicite.

