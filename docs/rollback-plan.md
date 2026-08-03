# Plan de Retour Arrière (Rollback Plan) - Hero Books

## Objectif
Garantir que le module Hero Books peut être désactivé, retiré, ou contourné sans casser le fonctionnement de base d'AlgoQuest, en cas de défaut majeur, de problème d'infrastructure ou de décision de suspension (Tenebris / Sécurité).

## Stratégie d'Isolation (Feature Flags et Boundaries)

1. **Isolation de l'interface (UI) :**
   - Le point d'entrée de Hero Books doit être conditionné par un drapeau de fonctionnalité (Feature Flag) ou un état de configuration globale dans `securedme-settings-operator`.
   - Si le module est désactivé, l'interface utilisateur d'AlgoQuest retombe sur la vue classique du laboratoire de découverte sans afficher les routes, composants et menus de Hero Books.

2. **Isolation de l'état (State) :**
   - Les registres `QuestState`, `LearningEvidence` et `DeclaredPreference` de Hero Books ne doivent pas écraser les profils utilisateurs existants, mais agir comme des ajouts indépendants.
   - Si Hero Books est retiré, les données existantes restent orphelines mais ne corrompent pas la progression standard d'AlgoQuest.

3. **Indépendance des dépendances :**
   - L'Algorithm Builder ne doit pas dépendre de variables de Hero Books pour s'exécuter dans son mode standalone. 
   - Les appels d'API vers les adaptateurs Qbit, Codex, et Gemini pour Hero Books (NarrativeProvider) sont enveloppés dans des clauses de secours (`try/catch` avec fallback local déterministe). En cas de rollback, les appels externes ne bloquent pas le rendu.

## Procédure de Retour Arrière (Urgence)

Si Hero Books cause une instabilité bloquante dans la branche `main` de production :
1. Définir le statut du module Hero Books à `suspended` dans la configuration globale (via `securedme-settings-operator` ou variable d'environnement `HERO_BOOKS_ENABLED=false`).
2. Aucun redéploiement d'Algorithm Builder ne devrait être nécessaire si l'API AlgoQuest cesse de demander des reçus `AlgorithmArtifactReceipt`.
3. Révoquer l'accès aux adaptateurs IA liés à la narration Hero Books pour limiter les coûts/hallucinations, sans impacter la fonctionnalité standard d'AlgoQuest.

## Critères de Validation du Rollback
- AlgoQuest s'exécute correctement sans aucune erreur de composant manquant.
- La suite de tests de référence d'AlgoQuest passe sans dépendre d'états mockés de Hero Books.
- Algorithm Builder s'exécute sans erreur de compilation.
