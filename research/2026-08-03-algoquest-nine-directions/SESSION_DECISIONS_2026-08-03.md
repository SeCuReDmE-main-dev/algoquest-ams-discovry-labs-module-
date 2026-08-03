# Décisions de la journée — 3 août 2026

Statut: journal de recherche et de conception. Ce document enregistre des décisions de priorité et de produit; il ne certifie ni la maturité de production, ni l'efficacité pédagogique, ni l'autorisation d'accès pour des élèves.

## 1. Décision de priorité des outils

La question du jour n'était pas « quel dépôt contient le plus de code? ». Elle était: quel outil manque le plus de chemin réel entre une personne débutante et une compréhension qui peut être démontrée?

La conclusion de travail est **AlgoQuest**. Sa base React/TypeScript, ses surfaces élève-enseignant et ses contrats locaux existent. Le manque principal est son expérience centrale: une première entrée de quinze minutes, une quête concrète, une progression par projet, une preuve d'action et un passage explicable vers les autres outils. Il devient donc le chantier de conception prioritaire.

Cette conclusion ne dit pas que les autres dépôts sont terminés ni que leurs risques sont faibles. Elle distingue une priorité de parcours d'un audit exhaustif de maturité.

| Outil | Rôle dans la suite | Décision de journée |
| --- | --- | --- |
| AlgoQuest | Entrée vers l'algorithmique et futur parcours de quêtes | Priorité: il manque encore l'expérience d'apprentissage centrale. |
| Algorithm Builder App | Plugin de construction algorithmique pour AlgoQuest | Retrouve sa place: certaines quêtes AlgoQuest l'ouvriront pour construire, visualiser ou tester un algorithme, puis récupéreront un artefact minimal. |
| FfeD-QLC | Workbench de recherche et d'admissibilité | Conserver spécialisé; aucune transformation en porte d'entrée générale. |
| FNP-QNN | Simulateur de recherche et d'exploration | Conserver comme destination avancée, non comme première porte pour débutant. |
| FNP-QNN Gateway | Contrats, diagnostic et gouvernance de suite | Rôle d'infrastructure; pas une expérience d'élève autonome. |
| Market Guardian | Simulation et sécurité retail | Rôle spécialisé; son absence de surface élève complète reste un chantier distinct. |
| QuaNThoR | Mathématiques formelles et raisonnement | Conserver comme destination de raisonnement profond, avec Orion Vey. |
| Scholarium / Scholarium Teach | Plateforme éducative et moteur syllabique | Chantier séparé, fermé honnêtement en pré-alpha; Qbit ne reçoit aucune autorité pédagogique. |
| Synthia | Science, classification et provenance | Conserver son identité et son domaine propres. |
| Tesla Workbench | Validation et recherche FNP-QNN | Hors priorité immédiate; Qbit peut y apparaître comme continuité de parcours. |
| V.O.T Guardian | Analyse et protection vocale sous contraintes fortes | Conserver dans la Guardian Suite; Neutro reste le guide local. |
| Visual Algorithm Designer | Construction visuelle de pipelines | Conserver RaySight comme assistant local de création visuelle. |

## 2. Neuf directions de conception AlgoQuest

1. Donner le droit de commencer avant de posséder le vocabulaire expert.
2. Produire une première preuve construite en environ quinze minutes, sans promettre une progression universelle.
3. Utiliser les points comme mémoire de l'aventure, jamais comme mesure d'intelligence.
4. Prévoir six portes d'entrée: primaire 5-6, secondaire 1-2, secondaire 3-5, collège, université et professeur-joueur.
5. Concevoir un wake-up kit pour Codex et Gemini: aide bornée, contextualisée et non canonique.
6. Faire aboutir une quête à un projet prefab réel, pas à une réponse isolée.
7. Construire un moteur de prompt-bank: sélection, attribution unique, reprise, abstention et provenance.
8. Séparer l'interface de jeu de l'interface éducative tout en gardant le même reçu d'assignation.
9. Relier les artefacts validés au parcours scolaire sans réduire l'élève à un score.

## 3. Contrat Hero Book retenu

- Un Hero Book possède six aventures adaptées aux six publics.
- Chaque aventure distribue quarante prompts dans cinq actes de huit prompts.
- Un prompt est attribué une seule fois par `AdventureRun`; une reprise ne crée pas une deuxième attribution.
- Le récit, les choix narratifs et les points sont séparés des preuves éducatives et des états de compréhension.
- Une IA conversationnelle peut aider à réaliser une activité, mais elle ne peut pas attribuer une maîtrise canonique.
- Chaque carte publiée exige objectif, action attendue, accessibilité, source, droits, version, règle d'éligibilité et reçu de résultat.
- Les six thèmes initiaux sont des dossiers de recherche: aucun n'est autorisé à parler comme un fait historique, scientifique ou culturel avant revue appropriée.
- Les Hero Books constituent une ligne de développement active jusqu'à la fin de la bêta. Ils ne deviennent pas une échéance ni un point bloquant pour l'alpha du socle AlgoQuest.

## 4. Échelle réellement décidée

```text
6 Hero Books x 6 publics x 40 prompts = 1 440 cartes à écrire et revoir.
1 440 cartes x 3 langues = 4 320 rendus localisés.
1 personne dans 1 Hero Book = 40 prompts au maximum.
1 personne qui complète les 6 Hero Books = 240 prompts au maximum.
```

Le nombre de 240 décrit le parcours maximal d'une personne sur les six mondes. Il ne décrit pas la charge éditoriale totale. La distinction est obligatoire pour ne pas sous-estimer la traduction, l'accessibilité, les sources, les droits et les adaptations d'âge.

## 5. Carte de personnages validée

| Personnage | Outils | Fonction |
| --- | --- | --- |
| Qbit | AlgoQuest, FNP-QNN, Tesla Workbench, FNP-QNN Gateway, Scholarium, Scholarium Teach | Compagnon transversal de parcours; il oriente entre les outils sans devenir l'autorité locale. |
| Synthia | Synthia | Présence scientifique dédiée à la classification, à la mémoire et à la provenance. |
| Vigil | FfeD-QLC | Présence d'admissibilité, de vérification et de limites. |
| Neutro | V.O.T Guardian, Market Guardian | Gardien de la Guardian Suite: protection, équilibre et observation. |
| Orion Vey | QuaNThoR | Compagnon du raisonnement formel et mathématique. |
| RaySight | Visual Algorithm Designer | Assistant local de construction et de lecture visuelle des pipelines. |

Règle retenue: **Qbit accompagne entre les outils; le personnage spécialisé prend le relais dans son propre outil.** Le partage de Qbit ne crée ni dépendance runtime entre dépôts ni mémoire personnelle partagée par défaut. Les cartes de personnages visuelles restent un travail ultérieur; cette décision définit seulement les rôles, frontières et droits d'apparition.

## 6. Limites non négociables

- Aucun personnage ne décide de la maîtrise, du diagnostic, de l'accès ou de la sécurité.
- Aucun personnage ne reçoit les données brutes d'un autre outil simplement parce que l'identité visuelle est commune.
- Les signaux de parcours inter-outils sont minimisés, explicitement consentis, révocables et visibles par la personne.
- Qbit est hors du temps des récits historiques: carnet, atlas ou console de parcours, jamais faux personnage Maya, Inca, japonais, pirate ou alchimiste historique.
- Les Hero Books s'inspirent de mécanismes généraux de l'aventure à choix, sans copier textes, mondes, noms, illustrations ou systèmes propriétaires.

## 7. Architecture et calendrier précisés après le brainstorming

- **AlgoQuest reste autonome.** Son alpha se juge sur une porte d'entrée réelle: commencer sans vocabulaire expert, construire, exécuter, expliquer et reprendre une première action. Il ne dépend pas d'un Hero Book terminé.
- **Google Colab est le premier terrain d'exécution des aventures.** Les missions, le code, l'explication et le résultat vivent d'abord dans un notebook. La durée de session, la reprise et la persistance restent des questions de recherche; le runtime Colab n'est pas déclaré autorité durable.
- **ASCII art est le langage visuel initial.** Les cartes, lieux, inventaires, messages et retours devront être lisibles en monospace et disposer d'une lecture accessible, non décorative.
- **Algorithm Builder App devient un plugin d'AlgQuest.** Une quête peut ouvrir le plugin, faire construire ou visualiser un algorithme, puis revenir avec un artefact, un test ou une explication. L'indisponibilité du plugin ne bloque ni l'entrée ni la progression fondamentale d'AlgoQuest.
- **Le système Hero Book est étudié dans un format 9/39.** Neuf axes, trente sous-recherches, vingt-sept sources imposées et trente-cinq sources encore à rechercher. Ce programme gouverne la qualité de l'intégration future; il ne gèle pas le développement du socle.
- **La recherche précède les décisions fortes.** Les choix de calendrier, de rôle et de frontière sont valides comme décisions produit. Toute affirmation d'efficacité, d'accessibilité complète, d'alignement scolaire ou de sûreté devra ensuite être confirmée ou limitée par les recherches correspondantes.

## 8. Évaluation discrète, parcours de prompts et réutilisation exacte de Tenebris

Deux élèves peuvent commencer la même aventure et produire des biographies différentes: l'un suit par exemple `6 -> 10 -> 24 -> 12`, l'autre `10 -> 7 -> 39`. Le système n'a pas besoin d'aspirer leurs discussions ni de prétendre connaître leur pensée. Il connaît les prompts admissibles, ceux qui ont été attribués, les choix effectués, les artefacts construits, les tests exécutés et les preuves pédagogiques acceptées.

Les travaux d'hier fournissent déjà le contrat de mesure durable à réutiliser. La chirurgie Scholarium Teach représente les essais comparables par la modalité, la réussite, le délai, l'aide demandée, le rappel différé, le transfert et le refus explicite. Elle sépare progression, préférence déclarée et observation éphémère; elle interdit à cette dernière de modifier directement la maîtrise.

V.O.T Guardian fournit deux couches distinctes. Son processeur audio définit son registre natif de caractéristiques: V.O.T., jitter, shimmer, SNR, distorsion harmonique, taux de passage par zéro, centroïde spectral et MFCC. Le protocole Tenebris définit le cycle de vie: ouvrir, isoler, traiter, purger, révoquer et produire une trace bornée. AlgoQuest ne redéfinit ni la liste vocale ni le protocole. Il réutilise le cycle Tenebris à travers un adaptateur d'interaction séparé et un registre versionné propre à la modalité observée.

Pour une interaction clavier, les événements fins nécessaires au calcul peuvent exister seulement dans une fenêtre mémoire locale. Le résultat autorisé est une catégorie grossière de rythme, de variation ou d'aide, jamais la chronologie des touches, le texte, un vecteur biométrique ou une signature stable. Comme dans Teach, une erreur de traitement produit une abstention; elle ne retourne jamais une fausse valeur moyenne de secours.

Le profil AlgoQuest sépare obligatoirement la biographie du héros, les connaissances démontrées, les préférences déclarées et les observations éphémères. L'assistant peut analyser la logique observable et recommander un prochain prompt parmi les candidats admissibles. Les règles versionnées gardent l'autorité sur l'attribution, les Knowledge Tokens et l'évolution pédagogique du personnage.

Le terme **évaluation silencieuse** signifie que l'élève continue de jouer sans passer un examen séparé. Il ne signifie jamais collecte cachée. Les enseignants ne reçoivent ni chronologie de frappe, ni jitter individuel, ni vecteur vocal, ni profil psychologique. Les directions et commissions scolaires ne reçoivent que des agrégats autorisés avec `k >= 10`, sans données individuelles d'élèves ou d'enseignants et sans filtres ré-identifiants.

## 9. Rôle complet d'Algorithm Builder App

Algorithm Builder App n'est plus seulement un éditeur visuel optionnel. Dans les Hero Books, il devient la surface mécanique équivalente aux dés, à la feuille de personnage, à l'inventaire et à l'atelier de fabrication. AlgoQuest choisit et raconte la mission; Builder App fait construire l'algorithme; Colab l'exécute ou l'éprouve; le reçu technique revient à AlgoQuest; les règles pédagogiques attribuent ensuite les Knowledge Tokens.

Le dé déterministe, les statistiques du héros et les points narratifs ne certifient aucune compétence. Les preuves viennent du programme, des tests, de l'explication, du rappel et du transfert. Les algorithmes validés deviennent des objets de connaissance réutilisables par le personnage. Le backlog fonctionnel détaillé des soixante fonctions est conservé dans `ALGORITHM_BUILDER_HERO_BOOK_FUNCTION_MAP.md`.

## 10. Six mondes initiaux et apprentissages ciblés

1. **Le Gardien du Ciel et de l'Eau / Le Mage des Deux Horizons**: lecture mythique du ciel servant d'entrée vers Newton, Einstein, Riemann, la relativité, la cosmologie et les quatre interactions fondamentales, avec séparation explicite entre récit, modèle et preuve.
2. **Le Ronin des Six Provinces**: Japon imaginaire inspiré des années 1400-1600; graphes, conditions, stratégie, risque, coût, chemins et responsabilité. Devenir shogun signifie maîtriser les conséquences, pas glorifier la domination.
3. **La Couronne des Marées**: aventure maritime inspirée de 1650-1700; probabilités, routes, ressources, cryptographie simple, fraude simulée et décisions sous incertitude. La violence et le pillage ne sont pas des récompenses éducatives.
4. **L'Alchimiste et la Porte des Chênes**: Nigredo, Albedo et Rubedo comme structure symbolique pour décomposer, nettoyer, transformer, tester et recomposer. Le rapprochement druidique demeure une fiction documentée, jamais une filiation historique affirmée.
5. **Le Neurone Sans Cerveau**: fiction autour de l'Annus mirabilis de 1905; mouvement brownien, effet photoélectrique, relativité restreinte, masse-énergie, expérience de pensée et limites des analogies. Le neurone n'explique ni le génie ni le cerveau d'Einstein.
6. **Le Donjon des Sept Sceaux / La Citadelle des Algorithmes**: conditions, boucles, fonctions, structures de données, graphes, débogage et complexité prennent la forme de salles, pièges et artefacts. L'inspiration jeu de rôle reste générale et ne copie aucune propriété Dungeons & Dragons.

Ces titres restent des titres de travail. Chaque monde possède six adaptations de public et quarante prompts par adaptation. Les apprentissages changent de profondeur, pas de vérité scientifique.

## 11. Évolution du personnage et Knowledge Tokens

La chaîne retenue est:

```text
Prompt Hero Book -> choix de mission -> construction Builder App
-> exécution Colab -> ArtifactReceipt -> règle pédagogique AlgoQuest
-> Knowledge Token -> évolution du personnage -> prochain ensemble admissible
```

Les familles initiales incluent contrôle de boucle, logique de décision, modèle de mouvement, raisonnement de chemin, reprise après erreur, honnêteté du modèle, risque probabiliste et transformation par pipeline. Un token possède un identifiant, une source, une version, un digest d'artefact, une règle d'attribution et une portée. Il ne contient pas la conversation de l'élève et ne devient ni note scolaire universelle, ni diagnostic, ni monnaie commerciale.

## 12. Audit de réconciliation de la journée

Sont maintenant consignés: la priorité d'AlgoQuest; les neuf directions; les six publics; le calcul `240/1 440/4 320`; la non-répétition d'un prompt; les deux interfaces aventure et étude; Colab; ASCII; Qbit et les personnages locaux; Builder App comme plugin et atelier mécanique; les six mondes; les soixante fonctions envisagées; les Knowledge Tokens; le profil par parcours de prompts; l'assistant non canonique; la séparation étudiant, enseignant et organisation; et la réutilisation exacte de V.O.T Guardian, Tenebris et Scholarium Teach.

Restent volontairement ouverts jusqu'aux deux Deep Research: efficacité pédagogique, métriques d'interaction autorisées, seuils et catégories, validité des adaptations d'âge, sources historiques et scientifiques, architecture finale de persistance, consentement applicable aux mineurs, accessibilité complète et critères de passage alpha/bêta.

Décision verrouillée: **AlgoQuest raconte le chemin; Builder App forge l'artefact; Colab l'éprouve; l'assistant observe et propose; Tenebris gouverne le traitement éphémère; seules les règles pédagogiques versionnées font évoluer les connaissances du personnage.**

## 13. Milestones, missions complètes et déblocages

Chaque aventure doit posséder ses propres milestones visibles. Steam sert ici de référence d'interaction pour la clarté des accomplissements, pas de modèle commercial, social ou de collecte. Un milestone marque un événement significatif du parcours; une mission complète représente un ensemble d'actions terminé; un déblocage est la conséquence déterministe et vérifiable de cet accomplissement.

Les déblocages possibles comprennent une nouvelle zone, une branche narrative, un outil Builder App, une capacité du personnage, un objet d'inventaire, une énigme avancée, un mode de visualisation, une mission secondaire ou un défi de transfert. Ils ne comprennent ni loot box, ni achat, ni classement humiliant, ni récompense aléatoire indispensable, ni pression de connexion quotidienne.

Le contrat prévu sépare `AdventureMilestone`, `MissionCompletionReceipt`, `AchievementBadge` et `UnlockGrant`. Chaque reçu porte la mission, les conditions versionnées, les preuves acceptées, le digest d'état, le déblocage accordé et la règle d'idempotence. Rejouer la même preuve ne crée pas deux récompenses. Un succès narratif peut récompenser l'exploration; un déblocage pédagogique exige la preuve prévue. Les deux apparaissent au joueur, mais ils ne partagent pas la même autorité.

## 14. Six publics, six voix et six finalités

Les six adaptations d'une aventure ne sont pas des traductions mécaniques. Le langage, les expressions, le rythme, les références, la longueur des consignes, le degré d'autonomie, la forme des choix et le but final doivent refléter la réalité actuelle du public visé:

1. **Primaire 5-6**: phrases concrètes, action visible, vocabulaire introduit dans le contexte, sécurité forte et réussite construite rapidement sans ton infantilisant.
2. **Secondaire 1-2**: langage contemporain sobre, choix identitaires sans étiquetage, coopération, expérimentation et conséquences compréhensibles.
3. **Secondaire 3-5**: défis plus longs, autonomie, esprit critique, éthique, modèles concurrents et projets pouvant échouer puis être réparés.
4. **Collège**: langage de projet, méthodes, données, collaboration, spécialisation progressive et liens explicites avec les disciplines.
5. **Université**: précision technique, hypothèses, limites, reproductibilité, sources, recherche et construction d'artefacts complexes.
6. **Professeur-joueur**: conception de mission, différenciation, accessibilité, évaluation, orchestration de classe, analyse de preuves et adaptation du contenu; ses objectifs ne sont pas ceux d'un élève rejoués avec des mots plus difficiles.

La langue doit être évaluée et mise à jour par des packs éditoriaux versionnés, à partir de sources publiques appropriées, d'ateliers consentis, de panels d'élèves et d'enseignants et de tests de compréhension. Le système ne récolte pas les conversations privées pour apprendre l'argot. Il évite aussi de forcer des expressions à la mode qui vieillissent vite ou donnent l'impression qu'un adulte imite artificiellement les élèves. La fidélité recherchée est une voix crédible, actuelle et respectueuse, pas une copie intrusive de la cour d'école.

La proximité d'atmosphère entre université et enseignement ne doit pas masquer leur différence. L'étudiant universitaire parle depuis une position d'apprentissage, d'exploration, d'évaluation et d'entrée progressive dans une discipline. Le professeur parle depuis une position de préparation, de responsabilité, de médiation, de différenciation, d'éthique et de décision pédagogique. Leurs contraintes de temps, leurs risques, leurs vocabulaires professionnels, leurs formes d'humour et leurs critères de réussite ne sont pas interchangeables. Le parcours professeur constitue donc une adaptation autonome, écrite et testée avec des enseignants, jamais la version universitaire rendue artificiellement plus savante.

## 15. Une réalité historique commune, six niveaux et trois langues

Les faits historiques ne changent pas selon le niveau. Leur sélection, leur profondeur, leur vocabulaire, leur contexte, leurs sources visibles, leurs controverses et le travail demandé changent. Chaque `HistoricalClaim` doit posséder une formulation canonique, une période et un territoire, des sources, un niveau de certitude, les désaccords pertinents et une frontière explicite entre fait, interprétation, mythe et fiction du Hero Book.

- Au primaire 5-6, le système présente une chronologie claire, des acteurs situés, des objets concrets et une distinction simple entre ce qui est attesté et ce que l'aventure invente.
- Au secondaire 1-2, il introduit causes, conséquences, perspectives multiples et premières contradictions entre sources.
- Au secondaire 3-5, il ajoute contexte politique, social et économique, biais, propagande, anachronismes et comparaison de témoignages.
- Au collège, il demande de construire une argumentation, de confronter des documents et de justifier une interprétation.
- À l'université, il expose historiographie, méthodes, corpus, incertitudes, débats savants et limites documentaires.
- Pour le professeur-joueur, il ajoute objectifs curriculaires, erreurs fréquentes, choix de médiation, sensibilité culturelle, adaptations de classe et justification des documents retenus.

Une simplification peut retirer des détails; elle ne peut ni fabriquer une causalité, ni effacer une population, ni transformer une légende en archive, ni présenter une fiction comme preuve. Les six versions pointent vers le même noyau de provenance versionné afin qu'une correction historique soit répercutée dans toutes les adaptations.

Cette adaptation doit ensuite être réalisée séparément dans chaque langue publiée. Français, anglais et Castellano partagent le même `HistoricalClaim`, mais pas nécessairement la même phrase, le même exemple, le même terme scolaire, la même convention de date ou la même manière de présenter un débat. Chaque couple `public × langue` constitue une médiation éditoriale révisable, pas une traduction automatique certifiée.

Le contrat de localisation doit enregistrer locale, territoire de référence, traducteur ou réviseur, sources terminologiques, programme scolaire pertinent, choix de noms propres, faux amis, éléments culturellement sensibles et digest du noyau factuel utilisé. Une adaptation linguistique ne peut ni ajouter un fait absent du noyau sans nouvelle provenance, ni supprimer silencieusement une incertitude. Avec six publics et trois langues, chaque noyau de prompt produit jusqu'à dix-huit rendus pédagogiques distincts; c'est la raison exacte du total de `4 320` rendus pour les six Hero Books initiaux.

## 16. La question mère: le but final par histoire, niveau, classe et langue

La question qui débloque toute l'architecture est: **à la fin de cette histoire, qu'est-ce que cette personne, dans ce niveau, cette classe, ce territoire scolaire et cette langue, doit être capable de construire, expliquer, vérifier et transférer?**

Aucun ensemble de quarante prompts ne devrait être rédigé avant sa réponse. Le moteur doit posséder une `AdventureOutcomeMatrix` contenant au minimum:

- le Hero Book, le public, la classe ou le contexte de cours, la locale et le programme de référence;
- la résolution narrative finale;
- l'artefact concret à produire;
- les connaissances et méthodes visées;
- le défi de transfert vers une situation nouvelle;
- les milestones obligatoires et optionnels;
- les preuves acceptables, aides permises et critères d'abstention;
- les Knowledge Tokens et déblocages possibles;
- les adaptations de langage, d'accessibilité, d'histoire et de sécurité;
- les sources, la version et les personnes responsables de la revue.

La conception se fait ensuite à rebours:

```text
But final de classe
-> preuve de transfert
-> artefact final
-> milestones
-> cinq actes
-> quarante prompts admissibles
-> variations narratives
-> observations minimisées
```

Les six bandes de public produisent trente-six familles de buts pour les six mondes, mais la classe les précise davantage. Primaire 5 et primaire 6 ne partagent pas automatiquement le même résultat; secondaire 3, 4 et 5 non plus. Au collège, à l'université et chez les professeurs, le contexte de cours, le programme et la discipline remplacent une simple progression par âge. Les trois langues ajoutent une médiation différente sans changer la preuve scientifique ou historique centrale.

Exemple pour le monde du ciel: un élève du primaire peut terminer en construisant un modèle simple qui distingue observation, récit et force; un élève du secondaire peut programmer et expliquer une trajectoire newtonienne puis en identifier les limites; un étudiant collégial ou universitaire peut comparer des modèles, quantifier l'incertitude et situer relativité, courbure géométrique et interactions fondamentales; un professeur doit pouvoir transformer le monde en séquence enseignable, anticiper les conceptions erronées, adapter l'activité et justifier son évaluation.

Cette matrice devient le document d'autorité éditoriale avant les scénarios. Elle ne sera verrouillée qu'après les deux Deep Research et l'alignement aux programmes réellement ciblés.

L'ordre de création est donc corrigé: définir d'abord le `CanonicalStoryEnding` et le `CanonicalLearningPurpose` de chaque monde. Le dénouement fixe ce qui est résolu dans la fiction; le but d'apprentissage fixe ce que l'aventure doit rendre compréhensible ou constructible. Les adaptations de niveau viennent ensuite. Elles peuvent partager le même événement final tout en exigeant des artefacts et des preuves différents. Si un public, notamment le professeur-joueur, demande une responsabilité différente, il reçoit une `AudienceResolution` propre reliée au même noyau narratif plutôt qu'une autre histoire sans relation.

## 17. Composition variable, rejouabilité et multijoueur

Le Deep Research doit identifier les techniques permettant de garder une aventure cohérente, adaptable et presque différente à chaque lecture. Le modèle de travail devient un noyau stable entouré de modules recomposables:

```text
fin canonique + but éducatif + faits sourcés
-> actes obligatoires
-> scènes et obstacles compatibles
-> rôles et ressources
-> graphe de prompts admissibles
-> graine déterministe de partie
-> parcours individuel ou coopératif
```

La variation peut toucher l'ordre des scènes, les routes, les personnages rencontrés, les contraintes, les énigmes, les ressources, les missions secondaires et la distribution des rôles. Elle ne peut pas modifier silencieusement un fait historique, supprimer un prérequis, contourner une preuve ou rendre le résultat scolaire dépendant du hasard.

La règle « un prompt une seule fois » s'applique à un `AdventureRun`. Une nouvelle partie peut utiliser une nouvelle graine, un autre rôle et un autre sous-graphe, tout en conservant des reçus permettant de reproduire exactement la partie précédente. Le multijoueur doit distinguer état partagé, décisions individuelles, contribution de chacun, consentement, absence de données privées entre participants et mécanismes empêchant qu'un joueur réalise tout le travail. Les techniques précises restent ouvertes jusqu'à l'analyse des deux rapports.

## 18. Banque de quarante prompts, scènes-pivots et narration Qbit

Le nombre quarante représente une banque maximale pour une adaptation de public, pas quarante prompts obligatoirement consommés dans chaque partie. Un `AdventureRun` sélectionne un sous-graphe compatible avec son niveau, son état, ses choix, ses milestones et sa graine. La longueur cible réelle d'une partie reste une question de recherche et de playtest.

Les « pages hook » évoquées pendant le brainstorming deviennent des **scènes-pivots**, représentées par `StoryAnchorNode`. Elles sont les événements que toute version cohérente de l'histoire doit rencontrer. Le graphe distingue:

- `StoryAnchorNode`: scène obligatoire garantissant l'identité et la cohérence du récit;
- `ChoiceNode`: choix qui ouvre plusieurs routes admissibles;
- `ConvergenceNode`: point où des branches différentes se rejoignent sans effacer leurs conséquences;
- `MilestoneNode`: accomplissement qui produit un reçu et des déblocages;
- `OptionalDiscoveryNode`: scène secondaire, connaissance ou ressource facultative;
- `FinaleNode`: résolution reliée au `CanonicalStoryEnding` et à l'`AudienceResolution`.

Les illustrations ASCII les plus élaborées sont réservées en priorité aux scènes-pivots, milestones, cartes structurantes et finales. Les scènes variables utilisent une grammaire ASCII composable plus légère. Cette hiérarchie réduit la production sans sacrifier les moments que chaque joueur doit voir.

Qbit, incarné par Codex ou Gemini selon le choix de l'utilisateur, produit la narration de liaison à partir d'un `NarrativeEnvelope`: état autorisé, scène active, ton du public, faits permis, éléments interdits, longueur, sorties ASCII disponibles et candidats de choix. Le modèle peut formuler, adapter et relier. Il ne peut pas créer un prompt canonique, changer un fait, attribuer un token, débloquer une mission ou modifier l'état durable sans reçu déterministe du moteur.
