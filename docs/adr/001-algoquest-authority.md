# ADR 001 : Autorité d'AlgoQuest sur les missions et preuves

## Contexte
Le système AlgoQuest Hero Books intègre deux applications majeures : `algoquest-ams-discovry-labs-module-` et `algorithm-builder-app`. Il est nécessaire de définir clairement les responsabilités pour éviter les conflits d'état, la duplication des logiques et les risques de fraude ou d'incohérence pédagogique.

## Décision
**AlgoQuest (`algoquest-ams-discovry-labs-module-`) détient l'autorité absolue et exclusive sur :**
1. La définition, la distribution, et la validation des missions.
2. L'attribution des preuves pédagogiques (Learning Evidence), des badges et des déblocages.
3. La progression du joueur et la narration (Qbit).
4. Les interfaces de présentation des quêtes et des parcours.

Aucune autre application, fournisseur d'IA, ou notebook Colab ne peut s'attribuer cette autorité ou générer des preuves sans l'approbation d'AlgoQuest.

## Conséquences
- Toute progression ou preuve générée par un outil externe doit être soumise à AlgoQuest sous forme de reçu validé.
- Les autres modules (comme Algorithm Builder) doivent agir comme de simples outils (feuille de personnage, inventaire, forge) sans état narratif.
