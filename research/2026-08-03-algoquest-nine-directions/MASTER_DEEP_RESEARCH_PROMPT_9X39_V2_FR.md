# Prompt maitresse de Deep Research 9/39 - AlgoQuest Hero Books

Date de conception: 2026-08-03

Version: 2.0, autonome et fermee sur un registre de 62 sources

## Mode d'emploi

Copier cette prompt au complet, sans la raccourcir, dans GPT Deep Research puis dans Gemini Deep Research. Faire les deux recherches independamment. Ne jamais transmettre le rapport d'un fournisseur a l'autre avant la phase de comparaison. Le chercheur ne doit supposer aucune connaissance prealable d'AlgoQuest, des Hero Books, de Qbit, de Google Colab ou d'Algorithm Builder App.

## Role impose au chercheur

Agis comme une equipe interdisciplinaire reunissant:

- un chercheur en sciences de l'apprentissage et evaluation formative;
- un specialiste de l'enseignement de l'algorithmique, des mathematiques et de la pensee informatique;
- un concepteur de jeux educatifs et de motivation non coercitive;
- un auteur et architecte de livres-jeux, fictions interactives et graphes narratifs;
- un architecte logiciel specialise en machines a etats, idempotence, provenance et tests;
- un specialiste Google Colab, Jupyter Notebook, Python et interfaces textuelles;
- un specialiste de l'accessibilite numerique et de l'Universal Design for Learning;
- un specialiste de la protection des renseignements personnels des enfants, des enseignants et des organisations;
- un juriste ou chercheur en droit d'auteur et responsabilite culturelle;
- un specialiste des usages encadres de l'IA generative en education.

Tu produis une recherche scientifique et architecturale, pas un texte publicitaire, pas un roman, pas du code et pas une approbation de deploiement.

## Contexte complet du produit

AlgoQuest est un outil educatif de la suite SecuredMe Education. Son objectif de base est d'offrir une porte d'entree concrete vers la construction d'algorithmes, les mathematiques, la physique, la logique et les fondations utiles aux autres outils de la suite. Il doit demeurer utilisable comme socle autonome. Son passage futur en alpha ne depend pas de la disponibilite des Hero Books decrits ci-dessous.

Les Hero Books sont une ligne de developpement commencee pendant la pre-alpha et destinee a murir jusqu'a la fin de la beta. Ils reprennent le plaisir structurel des anciens livres dont vous etes le heros, mais ils ne fonctionnent pas par simple renvoi de page. L'aventure recherche dans une banque gouvernee le prochain prompt admissible selon l'etat de quete, les prerequis, les choix, les preuves deja produites et les contraintes d'accessibilite.

La premiere experience s'execute dans Google Colab. Le langage visuel initial repose sur de l'ASCII art accessible: cartes, personnages, inventaires, dialogues, etats et resultats en texte monospace. Google Colab est un environnement d'execution ephemere; il ne doit pas devenir l'autorite durable de l'identite, des preuves scolaires, des prompts consommes ou de la progression.

Un Hero Book comprend six versions adaptees aux publics suivants:

1. cinquieme et sixieme annee du primaire;
2. premiere et deuxieme annee du secondaire;
3. troisieme, quatrieme et cinquieme annee du secondaire;
4. college;
5. universite;
6. professeur-joueur.

Chaque version contient quarante prompts prefabriques, soit 240 prompts editoriaux par Hero Book. Une aventure individuelle utilise au maximum les quarante prompts de sa version. Un prompt attribue ne peut etre consomme qu'une seule fois dans la meme AdventureRun. Une reprise technique doit rejouer la meme attribution; elle ne doit ni consommer un second prompt ni modifier silencieusement l'histoire.

L'experience possede deux vues reliees mais semantiquement distinctes:

- la vue aventure, qui raconte, motive, distribue les quetes et rend visibles les consequences fictives;
- la vue etude, qui montre le probleme, l'algorithme, le code, le test, l'explication et la preuve observable.

Les points, objets, niveaux et statistiques du personnage appartiennent au monde narratif. Ils ne constituent ni une note scolaire, ni une mesure d'intelligence, ni un diagnostic, ni une preuve automatique de maitrise. Les preuves d'apprentissage doivent rester observables, explicables, contestables et distinctes du jeu.

Qbit est le compagnon de continuite d'AlgoQuest. Codex ou Gemini peuvent fournir une aide bornee, proposer un indice, expliquer une erreur ou executer une action autorisee. Aucun de ces agents ne peut fixer l'etat canonique, attribuer une maitrise, profiler l'intelligence, conserver des secrets dans le notebook ou choisir seul le parcours scolaire.

Algorithm Builder App est un plugin optionnel d'AlgoQuest. Certaines quetes peuvent l'ouvrir pour construire, visualiser ou tester un algorithme, puis retourner un artefact et un recu minimal dans l'aventure. Il ne doit pas etre exige par chaque mission et son indisponibilite ne doit pas bloquer l'entree de base dans AlgoQuest.

Six univers sont actuellement des candidats narratifs, pas des contenus historiquement valides:

- un mage maya ou inca autour de l'annee 1400;
- un ninja ou ronin entre 1400 et 1600, dans un parcours pouvant mener au shogunat;
- un pirate entre 1650 et 1700, dans une progression fictive vers un empire maritime;
- un alchimiste medieval cherchant une voie druidique ancestrale et les etapes du Grand Oeuvre;
- un neurone fictif naissant dans le cerveau d'Einstein et participant aux quatre travaux de l'Annus mirabilis de 1905;
- une aventure de fantasy classique inspiree des jeux de role sur table.

Ces univers exigeront plus tard des recherches historiques, culturelles, scientifiques et juridiques propres. La presente recherche ne doit jamais transformer un symbole, une legende, une simplification narrative ou un souvenir de lecture en fait historique.

## Question centrale

Comment concevoir une architecture AlgoQuest Hero Books qui distribue quarante prompts uniques dans une aventure educative executee dans Google Colab, produit de vraies constructions algorithmiques et des preuves observables, s'adapte a six publics, preserve l'accessibilite et la vie privee, et relie progressivement le jeu au parcours scolaire sans confondre motivation narrative, evaluation, intelligence ou autorite pedagogique?

## Invariants non negociables

- Le noyau AlgoQuest reste independant des Hero Books jusqu'a la fin de la beta.
- Le Hero Book est une ligne de developpement, jamais un blocage artificiel du futur gate alpha.
- Le runtime initial est Google Colab et la grammaire visuelle initiale est l'ASCII art accessible.
- Un Hero Book contient 240 prompts: six versions de quarante prompts.
- Une AdventureRun ne consomme jamais deux fois le meme prompt.
- Une reprise technique rejoue la meme attribution de facon idempotente.
- L'etat canonique et les preuves durables ne resident pas uniquement dans Colab.
- Les points narratifs ne sont jamais une preuve de maitrise ou une mesure d'intelligence.
- Qbit, Codex et Gemini assistent; ils ne gouvernent pas la progression.
- Algorithm Builder App est un plugin optionnel et faillible, jamais une dependance universelle.
- Aucune cle, identite, reponse brute sensible ou donnee scolaire durable ne doit etre exposee dans une cellule, une sortie ou un lien Colab.
- Aucune collecte reelle d'enfant, de classe ou d'enseignant n'est autorisee par cette recherche.
- Toute affirmation d'efficacite, d'alignement scolaire ou d'accessibilite doit indiquer sa population, son territoire, sa methode et ses limites.

## Discipline scientifique et technique

- Distinguer explicitement: fait etabli, resultat limite, hypothese, inference, recommandation technique, choix de conception et speculation.
- Privilegier documentation officielle, standards, organismes publics, recherche evaluee par les pairs et publications dont la methode est accessible.
- Traiter les sites de praticiens, catalogues, videos et archives comme contexte ou inspiration, jamais comme preuve d'efficacite educative a eux seuls.
- Ne jamais inventer auteur, date, DOI, population, statistique, citation, resultat, fonctionnalite ou contenu inaccessible.
- Ne jamais conclure qu'un accord entre plusieurs sources ou entre GPT et Gemini constitue une verite.
- Distinguer engagement, persistance, reussite a une tache, comprehension, transfert et maitrise.
- Ne pas inferrer un profil cognitif, une intelligence, un handicap ou un diagnostic depuis le comportement de jeu.
- Signaler les conflits d'interets, limites d'echantillon, contextes territoriaux, sources anciennes, pages redirigees et contrats techniques susceptibles d'avoir change.
- Pour toute recommandation, indiquer le mecanisme attendu, le risque, la preuve disponible, la limite et le test necessaire.

## Architecture exacte de la recherche: 9/39

La recherche contient exactement neuf axes principaux et trente sous-recherches, soit trente-neuf objets de recherche. Il est interdit d'ajouter un dixieme axe ou une trente-et-unieme sous-recherche. Une question secondaire nouvelle doit etre classee comme lacune future et non ajoutee au 9/39.

| Axe | Sous-recherches | Nombre | Sources attribuees | Nombre |
|---|---|---:|---|---:|
| P1 | P1.1-P1.2 | 2 | S01-S02 | 2 |
| P2 | P2.1-P2.2 | 2 | S03-S04 | 2 |
| P3 | P3.1-P3.3 | 3 | S05-S06 | 2 |
| P4 | P4.1-P4.3 | 3 | S07-S08 | 2 |
| P5 | P5.1-P5.4 | 4 | S09-S10 | 2 |
| P6 | P6.1-P6.3 | 3 | S11-S12 | 2 |
| P7 | P7.1-P7.5 | 5 | S13, S14, S16, S17, S21, S24, S25, S28-S37 | 17 |
| P8 | P8.1-P8.4 | 4 | S15, S18-S20, S22, S23, S26, S27, S38-S44 | 15 |
| P9 | P9.1-P9.4 | 4 | S45-S62 | 18 |
| Total | 30 sous-recherches | 30 | S01-S62 | 62 |

### Axe 1 - Entrer sans savoir deja: le droit de commencer avant l'expertise

Cet axe determine comment AlgoQuest peut accueillir une personne qui ne connait ni le vocabulaire algorithmique, ni Google Colab, ni les conventions de programmation. Il faut distinguer une porte d'entree d'un test de niveau cache. L'enjeu est de faire accomplir une premiere action concrete, comprehensible et reversible sans humilier, infantiliser ou classer la personne. L'analyse doit comparer l'apprentissage sans ordinateur, les activites guidees, les exemples executables et la reduction progressive de l'aide. Elle doit produire des exigences observables pour la premiere mission, en tenant compte des six publics sans supposer que l'age indique automatiquement la competence.

Sous-recherches:

- P1.1 - Frictions, vocabulaire et onboarding: identifier les barrieres de premiere entree, les prerequis reellement necessaires et les formulations qui permettent de commencer sans expertise declaree.
- P1.2 - Premiere mission non diagnostique: definir une mission qui produit une trace concrete sans transformer l'erreur, le temps ou la demande d'aide en profil de personne.

Decision attendue: un contrat de premiere entree, ses interdits, ses alternatives accessibles et ses criteres de reussite minimale.

Sources attribuees: S01 et S02.

### Axe 2 - Quinze minutes pour fabriquer une premiere preuve, pas une illusion de progres

Cet axe examine la porte d'entree de quinze minutes comme objectif de conception a tester, pas comme promesse universelle. Il doit definir ce qu'est une premiere preuve honnete: un petit artefact executable, une sortie comprise, un test visible, une modification ou une explication produite par l'utilisateur. La recherche doit distinguer progression reelle, simple clic, repetition guidee et sentiment de reussite. Elle doit aussi etudier le retour apres erreur, le redemarrage d'un runtime Colab, le retrait progressif de l'aide et la capacite d'appliquer la meme idee dans une variation simple.

Sous-recherches:

- P2.1 - Criteres de l'artefact de quinze minutes: definir les preuves minimales et les conditions qui invalident une reussite seulement apparente.
- P2.2 - Feedback, erreur, reprise et transfert initial: definir comment corriger, recommencer, expliquer et verifier une application independante sans imposer la meme duree a tous.

Decision attendue: une specification testable du premier artefact et un protocole de reprise qui ne punit ni la lenteur ni l'accessibilite.

Sources attribuees: S03 et S04.

### Axe 3 - Des points qui racontent une aventure, jamais une intelligence

Cet axe separe les mecanismes de motivation du jugement sur la personne. Les points, objets, energie, reputation, inventaire et statistiques de personnage peuvent structurer le recit, rendre un choix visible et soutenir la continuite. Ils ne doivent jamais devenir une note cachee, un classement social, une etiquette cognitive ou une condition opaque d'acces au savoir. La recherche doit examiner les effets variables de la gamification, les besoins d'autonomie et de competence, les risques de controle, les formes d'echec utile et les regles de recuperation. Elle doit traduire cette distinction en modeles de donnees distincts et auditables.

Sous-recherches:

- P3.1 - Economie narrative et motivation: definir ce que les points et ressources peuvent signifier dans l'histoire, ainsi que les usages coercitifs a interdire.
- P3.2 - Separation QuestState, LearningEvidence et preferences: definir trois registres independants, leurs droits d'ecriture et les croisements interdits.
- P3.3 - Echec utile et recuperation: concevoir des consequences reversibles, des indices et des reprises sans humiliation, perte arbitraire ou blocage permanent.

Decision attendue: un modele de separation des etats et une politique de recompense non diagnostique.

Sources attribuees: S05 et S06.

### Axe 4 - Six publics, six portes d'entree, un meme respect de la personne

Cet axe recherche ce qui doit varier entre primaire, secondaire, college, universite et professeur-joueur, et ce qui doit rester commun. Le niveau de langage, la densite, l'autonomie, la nature du projet, la longueur d'une session et la forme d'aide peuvent changer. Les droits, l'accessibilite, la transparence et la separation entre jeu et preuve ne changent pas. La recherche doit inclure la variabilite motrice, visuelle, auditive, attentionnelle, linguistique et technologique. Elle doit aussi traiter le professeur comme participant possible sans permettre a une direction d'utiliser ses donnees individuelles comme outil de surveillance.

Sous-recherches:

- P4.1 - Adaptation aux six publics: definir les variations de presentation, rythme, autonomie, difficulte et projet sans dupliquer six moteurs opaques.
- P4.2 - Accessibilite de l'ASCII et des notebooks: definir largeur, contraste, clavier, lecteur d'ecran, mouvement, alternatives lineaires et charge cognitive.
- P4.3 - Professeur-joueur et confidentialite: definir ce qui reste prive, ce qui peut etre volontairement partage et ce qu'une organisation ne peut jamais inferer.

Decision attendue: une matrice des invariants communs et des adaptations explicites par public.

Sources attribuees: S07 et S08.

### Axe 5 - Le wake-up kit: une IA qui aide a avancer sans prendre la place du jugement

Cet axe definit le contrat entre Google Colab, Qbit, Codex, Gemini et l'utilisateur. Il doit commencer par les limites reelles du runtime: sessions ephemeres, quotas, stockage, partage, redemarrage et exposition involontaire de donnees. L'aide IA doit etre bornee par un objectif, des entrees minimales, une sortie structuree, une politique d'abstention et une trace explicable. Qbit assure une continuite de personnage et de contexte consentie, pas une memoire totale. Aucun modele ne decide de la prochaine preuve, du niveau scolaire ou de la maitrise. La recherche doit aussi fixer les frontieres de secrets, journaux et donnees brutes.

Sous-recherches:

- P5.1 - Limites operationnelles de Colab: documenter session, quotas, stockage, partage, reinitialisation, dependances et reprise.
- P5.2 - Contrat d'assistance Codex/Gemini: definir les actions permises, le format des sorties, les erreurs, l'abstention et les decisions interdites.
- P5.3 - Continuite de Qbit entre outils: definir un signal minimal, visible, consenti, reversible et sans profil total de l'apprenant.
- P5.4 - Secrets, journaux et donnees brutes: definir ce qui ne doit jamais apparaitre dans les cellules, sorties, liens, traces ou prompts distants.

Decision attendue: un contrat de wake-up kit et un modele de menace propre au notebook et aux agents IA.

Sources attribuees: S09 et S10. Les sources S30, S60, S61 et S62 apportent des controles transversaux sans changer leur axe principal.

### Axe 6 - Le projet prefab: apprendre parce que quelque chose tient enfin debout

Cet axe transforme chaque quete educative en increment reel d'un projet prefabrique. Un prompt ne doit pas seulement demander une reponse; il doit faire construire, modifier, executer, observer, tester ou expliquer quelque chose qui demeure intelligible. Le prefab doit declarer son but, ses prerequis, ses cellules, ses entrees, ses sorties, ses tests, ses droits, sa version et sa procedure de reprise. La recherche doit aussi definir l'integration optionnelle d'Algorithm Builder App: ouverture bornee, construction, validation, retour d'un artefact minimal, abstention et isolation des pannes. Le projet doit continuer lorsqu'un plugin est absent.

Sous-recherches:

- P6.1 - Manifest du prefab: definir le contrat editorial et technique d'un projet versionne, reproductible et explicable.
- P6.2 - Du prompt a l'increment et a la preuve Colab: definir cellule, sortie ASCII, test, explication, modification et redemarrage attendu pour chaque quete.
- P6.3 - Contrat du plugin Algorithm Builder: definir ouvrir, construire, tester, retourner un artefact ou s'abstenir, sans pouvoir canonique.

Decision attendue: un schema de prefab, un schema de recu de quete et un contrat de plugin faillible.

Sources attribuees: S11 et S12. La source S29 documente directement le produit Algorithm Builder App sans changer son axe principal.

### Axe 7 - Le prompt qui ne revient pas: construire une aventure par distribution, pas par defilement

Cet axe constitue le coeur du Hero Book. Il doit remplacer le renvoi de pages par un graphe de prompts eligibles, versionnes et attribues de facon deterministe. Chaque version de public contient quarante prompts. Le moteur doit savoir lesquels sont admissibles, reserves, presentes, completes, echoues, repris ou abandonnes. La meme commande rejouee doit retourner la meme attribution; deux commandes concurrentes ne doivent pas consommer deux noeuds. L'etat canonique doit survivre a la disparition du runtime Colab sans conserver plus de donnees qu'il n'en faut. La provenance, les droits, la traduction, les variables et le playtest font partie du contrat, pas de simples notes editoriales.

Sous-recherches:

- P7.1 - Graphe narratif contre defilement de pages: definir noeuds, prerequis, branches, convergences, boucles autorisees, fins et objectifs.
- P7.2 - Attribution unique, deterministe et idempotente: definir reservation, concurrence, consommation, reprise, conflit et non-repetition dans une AdventureRun.
- P7.3 - Persistance canonique hors Colab: definir l'etat minimal durable, la synchronisation, la reprise hors ligne et les echecs de reseau.
- P7.4 - Provenance, version, localisation et droits des prompts: definir auteur, licence, source, traduction, variables, digest et historique editorial.
- P7.5 - Playtest et recuperation: detecter noeud mort, boucle impossible, prompt orphelin, condition contradictoire, sortie illisible et plugin indisponible.

Decision attendue: un modele HeroBookManifest, PromptNode, PromptAssignment, AdventureRun et QuestReceipt, avec invariants et tests.

Sources attribuees: S13, S14, S16, S17, S21, S24, S25 et S28 a S37, soit dix-sept sources.

### Axe 8 - Deux ecrans, deux verites: l'histoire qui attire et l'etude qui prouve

Cet axe organise la coexistence de la fiction et du travail scolaire dans un notebook. La vue aventure doit rendre le monde, le choix et la consequence lisibles. La vue etude doit montrer le probleme, le raisonnement, le code, le test, l'erreur et la preuve sans les cacher sous une recompense. Les deux vues partagent un identifiant de quete, mais ne partagent pas la meme semantique. La recherche doit definir une grammaire ASCII robuste, les alternatives pour lecteurs d'ecran, le focus, le copier-coller, la largeur stable et les limites des sorties riches. Elle doit aussi etablir une discipline d'inspiration: apprendre des livres-jeux sans copier leur prose, leurs mondes, leur marque ou leur identite visuelle.

Sous-recherches:

- P8.1 - Deux vues dans le notebook: definir navigation, synchronisation et passage explicite entre aventure, construction, explication et test.
- P8.2 - Grammaire visuelle ASCII: definir cartes, inventaires, dialogues, alertes, priorites, largeur et degradation gracieuse.
- P8.3 - Accessibilite des sorties Colab: definir lecture lineaire, structure semantique, clavier, contraste, alternatives textuelles et tests assistifs.
- P8.4 - Patrimoine, inspiration, droit et responsabilite culturelle: distinguer mecanique, idee, expression protegee, representation historique et appropriation.

Decision attendue: un contrat de double vue, une grammaire ASCII accessible et une politique de provenance culturelle et juridique.

Sources attribuees: S15, S18, S19, S20, S22, S23, S26, S27 et S38 a S44, soit quinze sources.

### Axe 9 - De la quete au parcours scolaire: accumuler du savoir sans transformer l'eleve en score

Cet axe determine comment les constructions effectuees dans les aventures peuvent soutenir un parcours d'etude reel. Il doit definir des preuves observables: artefact, test, explication, correction, transfert et aide demandee. Il doit ensuite rechercher des correspondances prudentes avec les programmes pertinents aux six publics, en commencant par le Quebec et sans pretendre qu'un meme alignement vaut partout. Le portfolio doit etre prive par defaut, exportable, corrigible et supprimable. Les droits de visibilite doivent distinguer eleve, enseignant attribue, professeur-joueur et organisation. Aucun signal inter-outils ne doit transporter une note cachee, une reponse brute, un profil d'intelligence ou une surveillance comportementale.

Sous-recherches:

- P9.1 - Preuve observable sans diagnostic: definir artefact, execution, explication, correction, rappel, transfert, abstention et demande d'aide.
- P9.2 - Alignement scolaire territorial et six publics: identifier les programmes, auteurs de l'alignement, limites, ecarts et validations humaines necessaires.
- P9.3 - Portfolio prive, minimisation, export et suppression: definir propriete, finalite, retention, consentement, revocation et effacement.
- P9.4 - Roles, visibilite et transfert inter-outils: definir acces de l'eleve, de l'enseignant attribue, de l'organisation agregee et signal minimal vers la suite.

Decision attendue: un schema UnderstandingPath et LearningEvidence, une matrice d'alignement territoriale et un modele de droits sans surveillance.

Sources attribuees: S45 a S62, soit dix-huit sources.

## Protocole obligatoire pour les 62 sources

Analyser exactement les sources S01 a S62 du registre integre plus bas. Ne pas demander au commanditaire quelles sources utiliser. Ne pas remplacer silencieusement une URL et ne pas ajouter une source au corpus principal de cette premiere passe.

Pour chaque source, produire une fiche de exactement 150 mots en francais, titre, URL, identifiant et ligne de comptage exclus. Chaque fiche doit contenir:

- la nature de la source et son niveau d'autorite;
- l'auteur, l'organisme, l'annee et la date de consultation lorsqu'ils sont verifiables;
- la question, le produit, la population, le territoire ou le systeme reellement concerne;
- la methode scientifique, le standard ou le contrat technique pertinent;
- le resultat, l'exigence ou la fonctionnalite effectivement soutenue;
- sa pertinence pour les objets Pn et Pn.n qui lui sont attribues;
- au moins une limite empechant l'extrapolation excessive;
- une decision de recherche, de conception, d'architecture ou de rejet;
- un statut parmi ADMISE, ADMISE AVEC RESERVES, CONTEXTE SEULEMENT, REJETEE ou INACCESSIBLE.

Afficher apres chaque fiche: Compte: 150.

Si une URL est inaccessible, redirige vers une page non equivalente, exige une authentification ou ne permet pas de verifier son contenu, produire quand meme une fiche de 150 mots limitee au constat d'acces, aux metadonnees verifiables, au risque de l'utiliser et a la lacune creee. Ne jamais resumer un contenu non lu. Classer la source INACCESSIBLE et proposer un remplacement primaire dans la section des lacunes, sans l'integrer silencieusement aux 62 sources.

Une source peut eclairer plusieurs sous-recherches, mais elle ne compte qu'une seule fois dans le total de 62. L'affectation indiquee dans le registre est son usage principal. Toute utilisation transversale doit conserver le meme identifiant Sxx.

## Rapport obligatoire

Produire un seul rapport en francais comprenant, dans cet ordre:

1. une page de garde avec fournisseur, date, mode de recherche, bases consultees et limites d'acces;
2. un resume executif distinguant ce qui est confirme, probable, experimental, non resolu et interdit;
3. un glossaire minimal: Hero Book, prompt prefab, AdventureRun, attribution, QuestState, LearningEvidence, UnderstandingPath, Qbit, prefab, idempotence et autorite canonique;
4. le registre S01 a S62 avec exactement 150 mots par fiche;
5. les neuf axes dans l'ordre P1 a P9, chacun avec une synthese de la question principale et une reponse distincte a chacune de ses sous-recherches;
6. une matrice 9/39 indiquant pour chaque objet: sources, constats, contradictions, niveau de preuve, decision et test requis;
7. une matrice des affirmations avec les statuts SOUTENUE, PARTIELLE, NON RESOLUE, CONTREDITE ou INTERDITE DANS LE PRODUIT;
8. une matrice des contradictions entre sources, sans fabriquer de consensus;
9. une architecture conceptuelle proposee pour le graphe de quete, l'attribution unique, la double vue Colab, les prefabs, Qbit et le plugin Algorithm Builder;
10. les exigences d'accessibilite, de confidentialite, de droit d'auteur et de responsabilite culturelle;
11. un plan de tests couvrant determinisme, concurrence, reprise, non-repetition, notebook, ASCII, accessibilite, apprentissage, six publics et panne de plugin;
12. un registre des risques, lacunes et validations humaines necessaires;
13. une conclusion classee en quatre colonnes: CODABLE MAINTENANT, RECHERCHE BETA, VALIDATION PROFESSIONNELLE OU TERRITORIALE, EXCLURE;
14. une bibliographie finale avec identifiant Sxx, titre, auteur ou organisme, annee, URL, date de consultation, type de preuve et statut d'admission.

## Regles de reponse

- Ecrire dans un francais scientifique clair et definir le jargon a sa premiere occurrence.
- Ne pas ecrire l'article de blogue final et ne pas produire de code executable.
- Ne pas inventer une etude de terrain AlgoQuest: aucune etude d'apprenant n'est fournie.
- Citer chaque affirmation materielle a proximite immediate avec un ou plusieurs identifiants Sxx.
- Distinguer les caracteristiques documentees d'un outil de leur efficacite pedagogique.
- Ne pas presenter quinze minutes, quarante prompts, six publics ou l'ASCII comme efficacite prouvee; ce sont des contraintes de conception a tester.
- Ne pas proposer de collecte comportementale, biometrie, classement public, profil cognitif ou surveillance individuelle d'enseignant.
- Ne pas faire dependre la progression d'une generation non deterministe de Codex ou Gemini.
- Conserver les divergences et recommander un test ou une validation lorsqu'elles ne peuvent pas etre resolues.
- Pour toute architecture, indiquer les modes d'echec et la facon de rester utilisable sans Hero Book, sans Algorithm Builder et sans modele IA.
- Terminer par le nombre de sources admises, admises avec reserves, de contexte, rejetees et inaccessibles. Le total doit etre 62.

## Registre ferme des 62 sources et affectations

Provenance de la banque:

- S01 a S12: douze sources de fondation, soit deux pour chacun des axes P1 a P6;
- S13 a S27: quinze sources fournies pour lancer les axes P7 et P8;
- S28 a S62: trente-cinq sources additionnelles selectionnees pour fermer les besoins de P7, P8 et P9.

Cette provenance n'est pas un niveau de preuve. Chaque source doit encore etre ouverte, lue, datee, classifiee et limitee selon le protocole.

### Axe P1 - 2 sources

S01 - P1.1, P1.2 - CS Unplugged: activites de pensee informatique sans ordinateur
https://classic.csunplugged.org/

S02 - P1.1, P1.2 - Code.org: Computer Science Fundamentals
https://code.org/cs/curriculum/computer-science-fundamentals

### Axe P2 - 2 sources

S03 - P2.1, P2.2 - IES: objectifs, suivi et feedback formatif
https://ies.ed.gov/ncee/rel/reading-comprehension-k-3/teacher-pd-module1

S04 - P2.1, P2.2 - IES: enseignement differencie et etayage
https://ies.ed.gov/ncee/rel/differentiate-reading-k-3/pdf/2-3_ParticipantGuide_Modules_1-3.pdf

### Axe P3 - 2 sources

S05 - P3.1, P3.3 - Frontiers in Education: revue systematique sur gamification et engagement scolaire
https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1466926/full

S06 - P3.1, P3.3 - Self-Determination Theory: autonomie, competence et affiliation
https://selfdeterminationtheory.org/SDT/documents/2008_WangLiu_APJE.pdf

### Axe P4 - 2 sources

S07 - P4.1, P4.2 - CAST: Universal Design for Learning
https://www.cast.org/what-we-do/universal-design-for-learning/

S08 - P4.1, P4.3 - CAST: UDL Tips for Assessment
https://www.cast.org/resources/tips-articles/udl-tips-assessment/

### Axe P5 - 2 sources

S09 - P5.2, P5.4 - Documentation Gemini API: safety settings
https://ai.google.dev/gemini-api/docs/safety-settings?authuser=01&hl=en

S10 - P5.2, P5.4 - Documentation Gemini API: safety and factuality guidance
https://ai.google.dev/gemini-api/docs/safety-guidance?authuser=0

### Axe P6 - 2 sources

S11 - P6.1, P6.2 - PBLWorks: recherche sur l'apprentissage par projets
https://www.pblworks.org/research

S12 - P6.2 - IES What Works Clearinghouse: etude sur le project-based learning
https://ies.ed.gov/ncee/WWC/Study/92570

### Axe P7 - 17 sources

S13 - P7.1, P7.4 - Camille Leboulanger: Le livre sur l'ecriture dont vous etes le heros ou l'heroine
https://www.camilleleboulanger.fr/wp-content/uploads/2024/Camille%20Leboulanger%20-%20Le%20livre%20sur%20l%27%C3%A9criture%20dont%20vous%20%C3%AAtes%20le%20h%C3%A9ros%20ou%20l%27h%C3%A9ro%C3%AFne.pdf

S14 - P7.1, P7.5 - Distorya: ecrire un livre dont vous etes le heros en quatre etapes
https://distorya.fr/ecrire-son-livre-dont-vous-etes-le-heros-en-4-etapes/

S16 - P7.4 - Publier son Livre: dossier d'ecriture et d'edition d'un livre-jeu
https://publiersonlivre.fr/publier-livre/dont-vous-etes-le-heros/

S17 - P7.1, P7.4 - Amsel Suite: creer une aventure interactive
https://www.amsel-suite.com/article/54/choose-your-own-adventure-how-to-create-your-own-interactive-story

S21 - P7.1, P7.5 - CLSH Lannilis: exemple pratique de grand jeu a embranchements
https://www.clsh-lannilis.com/phocadownload/grands_jeux/histoire_heros.pdf

S24 - P7.4, P7.5 - QueFaitesVous: tutoriel de livre dont vous etes le heros
https://www.quefaitesvous.com/blog/tuto-de-livre-dont-vous-etes-le-heros/

S25 - P7.1 - Guide video de developpement de fiction textuelle
https://www.youtube.com/watch?v=mIiVVvpaowY

S28 - P7.2, P7.3 - Depot public AlgoQuest AMS Discovery Labs Module
https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-

S29 - P6.3, P7.3 - Depot public Algorithm Builder App
https://github.com/SeCuReDmE-main-dev/algorithm-builder-app

S30 - P5.1, P7.3 - FAQ officielle Google Colab
https://research.google.com/colaboratory/intl/en-GB/faq.html

S31 - P7.3, P8.1 - Documentation officielle du format Jupyter Notebook
https://nbformat.readthedocs.io/en/latest/format_description.html

S32 - P7.1, P7.2 - Inkle: langage narratif Ink
https://www.inklestudios.com/ink/

S33 - P7.1, P7.4 - Documentation mainteneur Writing with Ink
https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md

S34 - P7.1, P7.4 - Reference officielle Twine
https://play.twinery.org/reference/en/

S35 - P7.1, P7.2 - Introduction officielle ChoiceScript
https://www.choiceofgames.com/make-your-own-games/choicescript-intro/

S36 - P7.1, P7.4, P7.5 - Yarn Spinner: graphes, commandes, tests et localisation
https://www.yarnspinner.dev/features/

S37 - P7.1, P7.5 - Documentation officielle Inform 7
https://ganelson.github.io/inform-website/doc/

### Axe P8 - 15 sources

S15 - P8.4 - CoolLibri: l'art du roman a choix multiples
https://www.coollibri.com/blog/comment-ecrire-livre-choix-multiples-heros/

S18 - P8.1, P8.4 - HES-SO: guide pratique de gamification et jeux serieux
https://www.hes-so.ch/fileadmin/documents/HES-SO/Documents_HES-SO/pdf/la_HES-SO/enseignement/Projet-GGama_guide_pratique.pdf

S19 - P8.1, P8.4 - UQAM: memoire sur les structures narratives interactives
https://archipel.uqam.ca/8394/1/M14146.pdf

S20 - P8.4 - Video sur le modele du voyage du heros
https://www.youtube.com/watch?v=__Z2XUuN4HM

S22 - P8.1, P8.4 - Cursus: presentation de la plateforme Moiki
https://cursus.edu/fr/23331/moiki-une-incroyable-plateforme-de-creation-dhistoires-interactives

S23 - P8.1 - Tutoriel video Twine pour fictions interactives
https://www.youtube.com/watch?v=pA5hyyEoQy0

S26 - P8.4 - Remz: preservation et documentation des LDVELH
https://remz.ca/ldvelh/

S27 - P8.4 - Babelio: selection communautaire de classiques des livres-jeux
https://www.babelio.com/liste/7831/20-indispensables-Livres-Dont-Vous-tes-Le-Heros-

S38 - P4.2, P8.3 - Jupyter Accessibility: documentation du projet
https://jupyter-accessibility.readthedocs.io/

S39 - P8.2, P8.3 - W3C: Web Content Accessibility Guidelines 2.2
https://www.w3.org/TR/WCAG22/

S40 - P8.3 - Interactive Fiction Technology Foundation: Accessibility Testing Report
https://accessibility.iftechfoundation.org/

S41 - P8.1, P8.2 - Mechanics, Dynamics and Aesthetics framework
https://www.cs.northwestern.edu/~hunicke/MDA.pdf

S42 - P8.1, P8.3 - Educational nonlinear stories with Twine
https://learningatscale.acm.org/las2022/wp-content/uploads/2022/05/LS_2022_paper_93-2.pdf

S43 - P8.4 - U.S. Copyright Office: registration guidance for games
https://www.copyright.gov/register/tx-games.html

S44 - P8.1, P8.4 - Project Aon: Readers' Handbook
https://www.projectaon.org/en/ReadersHandbook/Home

### Axe P9 - 18 sources

S45 - P9.1, P9.2 - Systematic review of narrative game-based learning
https://ijlter.org/index.php/ijlter/article/view/17868

S46 - P9.1 - Meta-analyse sur la gamification de l'apprentissage
https://eric.ed.gov/?id=EJ1245270

S47 - P9.1 - Education Endowment Foundation: feedback
https://educationendowmentfoundation.org.uk/index.php/education-evidence/teaching-learning-toolkit/feedback

S48 - P9.1, P9.2 - Education Endowment Foundation: questionnement metacognitif et autonomie
https://educationendowmentfoundation.org.uk/news/updated-resource-supporting-independence-through-questioning-a-planning-tool

S49 - P9.2 - K-12 Computer Science Framework: progression
https://k12cs.org/framework-statements-by-progression/

S50 - P9.1, P9.2 - CAST UDL: choice and autonomy
https://udlguidelines.cast.org/engagement/interests-identities/choice-autonomy/

S51 - P9.1, P9.2 - ReadWriteThink: lecon de creation d'une aventure hypertexte
https://www.readwritethink.org/classroom-resources/lesson-plans/choose-your-adventure-hypertext

S52 - P9.1 - ReadWriteThink: grille d'evaluation d'une histoire interactive
https://www.readwritethink.org/sites/default/files/resources/lesson_images/lesson128/Student_webpage_rubric.pdf

S53 - P9.1, P9.2 - ERIC: interactive choose-your-own-adventure e-books and comprehension
https://eric.ed.gov/?id=ED645162

S54 - P9.2 - Programme de formation de l'ecole quebecoise, enseignement primaire
https://www.education.gouv.qc.ca/fileadmin/site_web/documents/dpse/formation_jeunes/prform2001nb.pdf

S55 - P9.2 - Programme de formation de l'ecole quebecoise, premier cycle du secondaire
https://www.education.gouv.qc.ca/fileadmin/site_web/documents/PFEQ/prfrmsec1ercyclev2.pdf

S56 - P9.2 - Gouvernement du Quebec: programmes d'etudes
https://www.education.gouv.qc.ca/parents-et-tuteurs/programmes-detudes

S57 - P9.2 - Gouvernement du Quebec: programmes d'etudes collegiales
https://www.quebec.ca/education/cegeps-colleges-prives/services/programmes

S58 - P9.2 - Gouvernement du Quebec: evaluation des nouveaux programmes universitaires
https://www.quebec.ca/education/universite/services-administratifs-universites/evaluation-nouveaux-programmes-universites

S59 - P9.2, P9.4 - Gouvernement du Quebec: Cadre de reference de la competence numerique
https://www.quebec.ca/education/numerique/cadre-reference

S60 - P5.2, P9.3, P9.4 - UNESCO: Guidance for generative AI in education and research
https://www.unesco.org/en/articles/guidance-generative-ai-education-research?hub=66973

S61 - P9.3, P9.4 - UNICEF Innocenti: Policy Guidance on AI for Children
https://www.unicef.org/innocenti/reports/policy-guidance-ai-children

S62 - P9.3, P9.4 - Gouvernement du Quebec: evaluation des facteurs relatifs a la vie privee
https://www.quebec.ca/gouvernement/travailler-gouvernement/normes-gouvernance-pratiques-internes/protection-des-renseignements-personnels/evaluation-facteurs-relatifs-vie-privee

## Controle final avant remise

Avant de remettre le rapport, verifier et afficher cette table de controle:

| Controle | Valeur exigee |
|---|---:|
| Axes principaux | 9 |
| Sous-recherches | 30 |
| Objets 9/39 | 39 |
| Sources P1 | 2 |
| Sources P2 | 2 |
| Sources P3 | 2 |
| Sources P4 | 2 |
| Sources P5 | 2 |
| Sources P6 | 2 |
| Sources P7 | 17 |
| Sources P8 | 15 |
| Sources P9 | 18 |
| Sources totales | 62 |
| Fiches de source | 62 |
| Mots par fiche | 150 |

Si un compte ne correspond pas, corriger le rapport avant remise. Ne jamais compenser une source manquante par une source inventee.
