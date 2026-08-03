# Analyse légère - Rapport Deep Research Gemini 1

Date d'analyse: 2026-08-03  
Source: https://docs.google.com/document/d/1jKn-ysBaqOv1lze9N-RunKt8iPTj3SVyCw2zKjSpGxQ/edit  
Titre source: `Architecture AlgoQuest Hero Books`  
Statut: source secondaire à comparer au second rapport; aucune décision de production automatique.

## Verdict

Le rapport confirme correctement le noyau architectural: séparation entre jeu et preuve, état canonique hors Colab, attribution idempotente, double vue aventure/étude, plugin Builder App non bloquant, Qbit sans autorité, portfolio privé, accessibilité ASCII et protection des enseignants. Il constitue une bonne base de confrontation.

Il ne constitue pas encore une validation scientifique suffisante. Les références apparaissent principalement comme `[cite: Sxx]` sans argument source par source directement vérifiable dans le texte lu, et plusieurs formulations utilisent « prouve » ou « confirme » plus fortement que les limites déclarées ne le permettent.

## Points soutenus

- Séparer `QuestState`, `LearningEvidence` et préférences.
- Conserver l'autorité durable hors du runtime Colab.
- Réserver un nœud de manière idempotente pour éviter la double consommation.
- Maintenir Qbit, Codex et Gemini comme assistants non canoniques.
- Utiliser deux vues: aventure ASCII et étude centrée sur l'artefact et les tests.
- Prévoir un mode dégradé lorsque Builder App ou l'IA est indisponible.
- Ne jamais transformer points, vitesse ou réussite narrative en intelligence ou note universelle.
- Protéger le professeur-joueur contre la surveillance professionnelle.
- Exiger alternatives sémantiques et lecture linéaire lorsque l'ASCII devient inaccessible.
- Soumettre l'alignement curriculaire, la sensibilité culturelle et l'EFVP à des validations humaines.

## Corrections obligatoires

1. Le rapport emploie plusieurs fois « 240 nœuds par version de public ». Le modèle verrouillé est 40 prompts maximum par adaptation de public, 240 noyaux partagés pour les six Hero Books, 1 440 cartes révisables et 4 320 rendus dans trois langues.
2. Une partie n'utilise pas nécessairement ses 40 prompts. Elle consomme un sous-graphe comprenant scènes-pivots, choix, convergences, milestones, découvertes optionnelles et finale.
3. Un hachage de `QuestState` ne fournit pas de contexte narratif à Qbit. Il faut une projection minimale structurée accompagnée de son digest; le digest vérifie, il n'explique pas.
4. L'intégration Builder App par iframe locale ou retour direct de code Python dans Colab n'est pas démontrée. Il faut un contrat d'artefact, validation, provenance, digest, import explicite et protection contre le code non fiable.
5. Le fuzzing peut détecter beaucoup de défauts, mais ne « démontre pas mathématiquement » l'absence absolue de boucle ou de cul-de-sac. Cette garantie exige validation statique, invariants de graphe, model checking borné et tests génératifs.
6. Un portfolio contenant seulement des hachages ne suffit pas à expliquer l'apprentissage. Il faut des reçus minimisés et contestables, sans réponse brute, avec contrôle, suppression et attribution explicite.
7. L'interdiction totale des métriques de rythme ou d'hésitation doit être nuancée par le contrat Tenebris déjà conçu. Les signaux fins peuvent être calculés éphémèrement sous finalité et consentement appropriés; seules des catégories grossières autorisées peuvent sortir, sans profil caché ni autorité pédagogique.
8. L'affirmation de chiffrement de bout en bout n'est accompagnée d'aucun protocole, modèle de clés ou preuve. Elle reste une exigence à concevoir, pas une capacité confirmée.

## Éléments absents parce que décidés après la demande de recherche

Le rapport ne pouvait pas intégrer correctement les décisions apparues ensuite:

- `CanonicalStoryEnding`, `CanonicalLearningPurpose`, `AudienceResolution` et `AdventureOutcomeMatrix`;
- buts finaux par histoire, niveau, classe, territoire et langue;
- six voix distinctes, notamment la séparation étudiant universitaire/professeur-joueur;
- adaptation historique depuis un noyau de provenance commun;
- milestones inspirés de la lisibilité des succès Steam et déblocages idempotents;
- Knowledge Tokens;
- Builder App comme D6, feuille de personnage, inventaire et forge de reçus;
- carte des 60 fonctions;
- `StoryAnchorNode`, `ConvergenceNode`, sous-graphe par partie et ASCII riche réservé aux scènes structurantes;
- composition variable, rejouabilité et multijoueur;
- `NarrativeEnvelope` bornant la narration produite par Qbit.

## Décision provisoire

Conserver le rapport comme confirmation architecturale partielle. Ne pas adopter ses chiffres, ses promesses cryptographiques, son iframe Colab, ses affirmations de preuve absolue ou ses conclusions pédagogiques avant comparaison avec le second rapport et vérification des sources primaires.

La meilleure contribution immédiate du rapport est son ordre de construction: état canonique minimal, graphe déterministe, séparation des registres, double vue, mode dégradé, accessibilité, confidentialité et tests de panne. La prochaine synthèse devra y greffer les fins canoniques, les résultats par classe, les scènes-pivots, les milestones et la composition variable définis pendant le brainstorming.

