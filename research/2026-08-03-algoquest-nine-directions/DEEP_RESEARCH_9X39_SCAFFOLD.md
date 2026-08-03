# AlgoQuest: scaffold de Deep Research 9/39

> STATUT HISTORIQUE: remplace le 2026-08-03 par `MASTER_DEEP_RESEARCH_PROMPT_9X39_V2_FR.md`. Ce fichier conserve la trace du raisonnement initial, mais ne doit plus etre transmis a GPT ou Gemini.

Date: 2026-08-03

Statut: preparation de recherche et de conception. Ce document ne constitue ni un gate alpha, ni une preuve pedagogique, ni une autorisation de collecte ou de deploiement.

## Decision de calendrier

AlgoQuest reste le socle autonome avec lequel il a ete presente aujourd'hui. Son alpha ne depend pas de la disponibilite d'un Hero Book, d'une banque complete de prompts ou d'un univers de jeu. Il doit pouvoir offrir une premiere construction reelle, executable et explicable sans cette couche.

Les Hero Books deviennent une ligne de developpement commencee aujourd'hui et poursuivie jusqu'a la fin de la beta. Ils pourront enrichir AlgoQuest lorsque leur recherche, leur contenu, leur etat de quete, leurs droits, leurs adaptations d'age et leurs tests seront prets. Ils ne peuvent ni retarder artificiellement l'alpha du socle ni etre annonces comme acquis avant leurs propres preuves.

Algorithm Builder App entre dans cette architecture comme plugin d'AlgoQuest. Certaines quetes ouvriront une mission de construction algorithmique dans Algorithm Builder, puis retourneront dans l'aventure avec un artefact et un recu minimal. Il ne devient pas une dependance obligatoire de chaque premiere mission et AlgoQuest ne cesse jamais de fonctionner lorsqu'il est indisponible.

## Runtime et langage visuel verrouilles

- La premiere experience de jeu et d'etude s'execute dans Google Colab.
- Les visuels initiaux sont en ASCII art: texte monospace, cartes, inventaires, etats, retours et representations de monde.
- Google Colab est un runtime ephemere et ne peut pas etre presume comme autorite durable des quetes, des preuves ou des prompts attribues.
- Codex, Gemini et Qbit peuvent assister une action bornee. Ils ne choisissent pas l'etat canonique, la maitrise, l'identite ou la prochaine quete.
- Un Hero Book contient actuellement 240 prompts prefab: six niveaux de quarante prompts. Un prompt attribue ne peut etre utilise qu'une fois dans la meme aventure.

## Comptage

| Ensemble | Nombre | Regle |
|---|---:|---|
| Axes principaux | 9 | Les neuf chapitres definissent les neuf questions meres. |
| Sous-recherches | 30 | Chaque objet est borne et livre une decision precise. |
| Objets de recherche | 39 | Neuf axes plus trente sous-recherches. |
| Sources cibles | 62 | Une source a un usage principal et ne compte qu'une fois. |
| Sources fixees P1 a P6 | 12 | Deux sources par axe. |
| Sources fournies P7 et P8 | 15 | Incluses sans etre sur-evaluees. |
| Sources a rechercher | 35 | Emplacements reels, pas des sources pretendues trouvees. |

La banque SOURCE_BANK_62.md est une banque de candidats historique. Ce scaffold est la repartition canonique du travail 9/39. Une URL ne compte dans les 62 qu'apres verification de l'auteur, de la date, du niveau de preuve, du statut d'usage et de son affectation.

## Repartition des sources

| Axe | Sous-recherches | Sources fixees | Sources a acquerir | Total |
|---|---:|---:|---:|---:|
| P1 | 2 | 2 | 0 | 2 |
| P2 | 2 | 2 | 0 | 2 |
| P3 | 3 | 2 | 0 | 2 |
| P4 | 3 | 2 | 0 | 2 |
| P5 | 4 | 2 | 0 | 2 |
| P6 | 3 | 2 | 0 | 2 |
| P7 | 5 | 7 | 10 | 17 |
| P8 | 4 | 8 | 7 | 15 |
| P9 | 4 | 0 | 18 | 18 |
| Total | 30 | 27 | 35 | 62 |

# Les neuf axes

## P1. Entrer sans savoir deja: le droit de commencer avant l'expertise

Question mere: comment faire entrer une personne debutante sans test cache, sans vocabulaire humiliant et sans promesse de competence non prouvee?

Decision attendue: une premiere porte d'entree qui demande une action concrete et consentie, sans classer l'age, l'intelligence ou le niveau reel.

Sources fixes: CS Unplugged; Code.org Computer Science Fundamentals.

## P2. Quinze minutes pour fabriquer une premiere preuve, pas une illusion de progres

Question mere: quelle preuve honnete peut etre construite, executee, comprise et reprise durant une premiere seance d'environ quinze minutes?

Decision attendue: un petit artefact, un test visible, une explication courte et une reprise possible. Quinze minutes est une contrainte a tester, jamais une promesse universelle.

Sources fixes: IES Goal Setting, Monitoring, and Formative Feedback; IES Differentiated Instruction and Scaffolding.

## P3. Des points qui racontent une aventure, jamais une intelligence

Question mere: comment garder des ressources narratives et de la memoire de quete sans les transformer en classement de personnes?

Decision attendue: separation stricte entre etat fictif, preuve pedagogique observable et preference declaree. Les points servent le monde de l'aventure; ils ne mesurent pas l'intelligence.

Sources fixes: revue systematique Frontiers sur la gamification; theorie de l'autodetermination.

## P4. Six publics, six portes d'entree, un meme respect de la personne

Question mere: qu'est-ce qui doit changer entre les publics et les besoins d'accessibilite, et qu'est-ce qui doit rester identique dans l'autonomie et la preuve?

Decision attendue: six adaptations de presentation et de rythme, sans creer six moteurs opaques ni surveiller les enseignants.

Sources fixes: CAST Universal Design for Learning; CAST UDL Assessment Tips.

## P5. Le wake-up kit: une IA qui aide a avancer sans prendre la place du jugement

Question mere: comment faire cohabiter Google Colab, Qbit, Codex, Gemini et des notebooks executables sans leur deleguer la progression, l'identite, les secrets ou l'etat de l'aventure?

Decision attendue: un contrat de session Colab et d'assistance IA avec entrees bornees, sorties structurees, erreurs visibles, absence de secrets en cellule et aucune autorite pedagogique au modele.

Sources fixes: Gemini API Safety Settings; Gemini API Safety and Factuality.

## P6. Le projet prefab: apprendre parce que quelque chose tient enfin debout

Question mere: comment faire qu'une quete conduise a une construction reelle, petite mais modifiable, testable, expliquable et relancable?

Decision attendue: un prefab versionne pour Colab, et un contrat de plugin pour Algorithm Builder App. Une quete peut utiliser Algorithm Builder pour construire ou visualiser un algorithme, mais son indisponibilite n'annule jamais l'entree dans AlgoQuest.

Sources fixes: PBLWorks Research; IES/WWC Project-Based Learning Study.

## P7. Le prompt qui ne revient pas: construire une aventure par distribution, pas par defilement

Question mere: comment attribuer de maniere deterministe et rejouable les prompts d'un Hero Book, sans en repeter un seul dans la meme aventure?

Decision attendue: un moteur de quete distinct de Colab, avec HeroBookManifest, PromptNode, PromptAssignment, QuestState, recus, version, digest, reprise et regle de non-repetition. Cette ligne se construit pendant la beta; elle n'est pas une dependance alpha du socle.

Sources: sept sources fournies et dix acquisitions obligatoires.

## P8. Deux ecrans, deux verites: l'histoire qui attire et l'etude qui prouve

Question mere: comment presenter dans Google Colab une aventure engageante et une vue d'etude claire sans faire disparaitre la difficulte reelle sous le decor?

Decision attendue: deux vues reliees au meme etat: aventure ASCII et etude/projet. La premiere explique pourquoi continuer; la seconde expose l'action, la construction, le test et la preuve.

Sources: huit sources fournies et sept acquisitions obligatoires.

## P9. De la quete au parcours scolaire: accumuler du savoir sans transformer l'eleve en score

Question mere: comment relier une construction reelle a un parcours d'etude sans instaurer de classement, de surveillance ou de profilage?

Decision attendue: un UnderstandingPath minimal, prive par defaut, reversible et separe du jeu. Toute correspondance avec une annee ou un programme exige une analyse territoriale et une decision humaine explicite.

Sources: dix-huit acquisitions obligatoires.

# Les trente sous-recherches

| ID | Objet borne | Resultat attendu |
|---|---|---|
| P1.1 | Friction de depart et vocabulaire | Liste des obstacles de premiere entree et regles de langage. |
| P1.2 | Premiere mission non diagnostique | Mission qui produit une trace sans profiler la personne. |
| P2.1 | Criteres de l'artefact de quinze minutes | Preuve minimale: execution, sortie, test ou explication. |
| P2.2 | Retour, correction et reprise | Contrat de recuperation apres erreur, confusion ou redemarrage. |
| P3.1 | Economie narrative | Points, objets et ressources qui servent l'histoire sans classer. |
| P3.2 | Separation des etats | Limites entre QuestState, LearningEvidence et preferences. |
| P3.3 | Echec utile | Consequence reversible et aide sans humiliation. |
| P4.1 | Adaptation aux six publics | Presentation, rythme et autonomie par bande d'usage. |
| P4.2 | Accessibilite ASCII | Largeur, contraste, clavier, lecteur d'ecran et vue lineaire. |
| P4.3 | Enseignant participant | Regles d'acces qui interdisent la surveillance individuelle. |
| P5.1 | Limites reelles de Colab | Session, reinitialisation, quotas, partage, stockage et reprise. |
| P5.2 | Contrat Codex/Gemini | Aide, indice et validation structurelle autorises; progression interdite. |
| P5.3 | Qbit entre outils | Signal minimal, consenti, visible et revocable. |
| P5.4 | Carnet, secrets et traces | Aucune cle ni donnee sensible dans cellule, sortie ou historique. |
| P6.1 | Manifest prefab | But, cellules, entrees, sorties, tests, droits et version. |
| P6.2 | Quete vers increment et preuve Colab | Une action utile par prompt, avec cellule, sortie ASCII, test, explication ou reprise visible; jamais une commande vide. |
| P6.3 | Plugin Algorithm Builder | Contrat ouvrir, construire, tester, retourner un artefact ou s'abstenir. |
| P7.1 | Graphe de quete contre pages | Structure d'etats, objectifs, branches, boucles et dependances. |
| P7.2 | Attribution unique et idempotente | Reservation, reprise, conflit et non-repetition dans AdventureRun. |
| P7.3 | Persistance hors Colab | Etat minimal qui survit au runtime sans donnee sensible. |
| P7.4 | Provenance et localisation de prompt | Auteur, licence, version, traduction et variables. |
| P7.5 | Playtest et recuperation | Noud mort, boucle, prompt orphelin, panne et sortie non lisible. |
| P8.1 | Deux vues dans le notebook | Passage entre aventure, code, explication et test. |
| P8.2 | Grammaire ASCII | Cartes, inventaire, message critique, hierarchie et largeur stable. |
| P8.3 | Accessibilite des sorties Colab | Texte alternatif, focus, copier-coller et lecture lineaire. |
| P8.4 | Patrimoine, inspiration et droits | Inspiration structurelle sans copie de prose, univers ou identite. |
| P9.1 | Preuve sans diagnostic | Artefact, explication, test, correction, transfert et aide demandee. |
| P9.2 | Alignement scolaire reel | Programme, territoire, auteur de l'alignement et limites. |
| P9.3 | Portfolio prive et suppression | Propriete, export, expiration, revocation et effacement. |
| P9.4 | Roles et transfert inter-outils | Visibilite eleve, enseignant attribue, organisation agregee et signal minimal. |

# Registre des 27 sources deja imposees

## P1 a P6: douze sources fixes

S01 P1 - https://classic.csunplugged.org/
S02 P1 - https://code.org/cs/curriculum/computer-science-fundamentals
S03 P2 - https://ies.ed.gov/ncee/rel/reading-comprehension-k-3/teacher-pd-module1
S04 P2 - https://ies.ed.gov/ncee/rel/differentiate-reading-k-3/pdf/2-3_ParticipantGuide_Modules_1-3.pdf
S05 P3 - https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1466926/full
S06 P3 - https://selfdeterminationtheory.org/SDT/documents/2008_WangLiu_APJE.pdf
S07 P4 - https://www.cast.org/what-we-do/universal-design-for-learning/
S08 P4 - https://www.cast.org/resources/tips-articles/udl-tips-assessment/
S09 P5 - https://ai.google.dev/gemini-api/docs/safety-settings?authuser=01&hl=en
S10 P5 - https://ai.google.dev/gemini-api/docs/safety-guidance?authuser=0
S11 P6 - https://www.pblworks.org/research
S12 P6 - https://ies.ed.gov/ncee/WWC/Study/92570

## P7 et P8: quinze sources fournies

S13 P7 - http://www.camilleleboulanger.fr/wp-content/uploads/2024/Camille%20Leboulanger%20-%20Le%20livre%20sur%20l%27%C3%A9criture%20dont%20vous%20%C3%AAtes%20le%20h%C3%A9ros%20ou%20l%27h%C3%A9ro%C3%AFne.pdf
S14 P7 - https://distorya.fr/ecrire-son-livre-dont-vous-etes-le-heros-en-4-etapes/
S15 P8 - https://www.coollibri.com/blog/comment-ecrire-livre-choix-multiples-heros/
S16 P7 - https://publiersonlivre.fr/publier-livre/dont-vous-etes-le-heros/
S17 P7 - https://www.amsel-suite.com/fr/article/54/livre-dont-vous-etes-le-heros-comment-creer-sa-propre-aventure
S18 P8 - https://www.hes-so.ch/fileadmin/documents/HES-SO/Documents_HES-SO/pdf/la_HES-SO/enseignement/Projet-GGama_guide_pratique.pdf
S19 P8 - https://archipel.uqam.ca/8394/1/M14146.pdf
S20 P8 - https://www.youtube.com/watch?v=__Z2XUuN4HM
S21 P7 - https://www.clsh-lannilis.com/phocadownload/grands_jeux/histoire_heros.pdf
S22 P8 - https://cursus.edu/fr/23331/moiki-une-incroyable-plateforme-de-creation-dhistoires-interactives
S23 P8 - https://www.youtube.com/watch?v=pA5hyyEoQy0
S24 P7 - https://www.quefaitesvous.com/blog/tuto-de-livre-dont-vous-etes-le-heros/
S25 P7 - https://www.youtube.com/watch?v=mIiVVvpaowY
S26 P8 - https://remz.ca/ldvelh/
S27 P8 - https://www.babelio.com/liste/7831/20-indispensables-Livres-Dont-Vous-tes-Le-Heros-

Ces sources sont classifiees provisoirement comme guides praticiens, archives, references d'outil ou inspiration. Elles ne demontrent pas seules une efficacite educative.

# Les 35 acquisitions obligatoires

## P7: S28 a S37

S28: source primaire ou academique sur graphes narratifs et structures de choix.
S29: documentation technique sur idempotence, reservation ou attribution unique.
S30: documentation officielle Google Colab sur session, runtime et persistance.
S31: documentation officielle Jupyter ou Colab sur reprise et sorties de notebook.
S32: reference primaire sur minimisation de l'etat de parcours.
S33: documentation sur versioning et localisation de contenu narratif.
S34: reference officielle sur droits d'auteur et expression de jeu.
S35: documentation de test de fiction interactive ou de graphes.
S36: reference d'accessibilite pour recit textuel et choix clavier.
S37: etude critique de generation de quetes sous contraintes.

## P8: S38 a S44

S38: documentation officielle Colab sur interface notebook, partage et sorties.
S39: reference de conception d'interface textuelle ou monospace.
S40: reference Unicode et politique de caracteres compatibles terminal et navigateur.
S41: reference W3C sur texte, contraste, focus et alternatives.
S42: reference sur accessibilite de Jupyter notebooks.
S43: source primaire sur histoire ou edition des gamebooks.
S44: reference sur representation historique et culturelle responsable.

## P9: S45 a S62

S45: evaluation formative.
S46: transfert dans une tache nouvelle.
S47: auto-explication et justification de l'eleve.
S48: erreur productive et reprise.
S49: programme officiel Quebec primaire 5-6.
S50: programme officiel Quebec secondaire 1-2.
S51: programme officiel Quebec secondaire 3-5.
S52: reference collegiale pertinente.
S53: reference universitaire pertinente.
S54: reference de developpement professionnel pour professeur-joueur.
S55: Loi 25, EFVP ou guidance quebecoise officielle.
S56: donnees d'enfants et education.
S57: conservation, export et suppression.
S58: risques des learning analytics.
S59: controle d'acces par role en education.
S60: agregation et seuils anti-reidentification.
S61: portabilite ou interoperabilite des acquis.
S62: equite, biais et decisions automatisees.

# Prompt final de Deep Research

Vous etes chercheur ou chercheuse pour AlgoQuest.

Objet de recherche: [P?.? et titre exact]
Question mere: [question de l'axe]
Question bornee: [question de la sous-recherche]
Decision attendue: [decision a rendre possible]

Contexte non negociable:
- AlgoQuest est le socle autonome de la suite et son alpha ne depend pas du systeme Hero Book.
- Les Hero Books sont une ligne de developpement active jusqu'a la fin beta.
- Le jeu s'execute dans Google Colab.
- Le langage visuel initial est ASCII art et doit rester accessible.
- Un Hero Book compte actuellement six niveaux de quarante prompts prefab.
- Un prompt ne peut etre utilise qu'une fois dans la meme aventure.
- Algorithm Builder App est un plugin utilisable par certaines quetes; il n'est pas une dependance obligatoire du socle.
- Codex, Gemini et Qbit peuvent aider; ils ne decident ni de la maitrise, ni de l'etat canonique, ni de l'identite.
- Les points racontent une aventure; ils ne mesurent jamais une intelligence.

Travail demande:
1. Rechercher d'abord des sources primaires, officielles ou academiques.
2. Donner URL directe, auteur, date, niveau de preuve, licence ou statut d'usage.
3. Separarer clairement faits confirmes, inférences de conception et inspirations.
4. Identifier contradictions, limites, populations absentes et risques.
5. Proposer au plus trois decisions de conception, chacune liee a une source.
6. Donner les contrats, tests et risques impliques par chaque decision.
7. Dire explicitement ce que les sources ne permettent pas d'affirmer.

Interdictions:
- Ne pas traiter une mecanique de jeu comme preuve automatique d'apprentissage.
- Ne pas diagnostiquer un eleve, un enseignant ou un profil cognitif.
- Ne pas suggerer de stocker une cle ou une donnee sensible dans un notebook Colab.
- Ne pas copier la prose, les univers, les cartes ou l'identite de livres-jeux existants.
- Ne pas presenter une hypothese produit comme un fait scientifique.

# Gate de recherche, pas gate alpha

Le 9/39 gouverne la qualite de la ligne Hero Book et de son integration future. Il ne bloque pas le developpement du socle AlgoQuest ni son alpha. Avant de publier une aventure ou de la presenter comme un parcours educatif valide, il faudra toutefois:

1. verifier et classifier les 62 sources sans double comptage;
2. resoudre par preuves les limites de Colab, la persistance, l'ASCII et l'accessibilite;
3. tester l'attribution unique et la reprise de prompt;
4. documenter droits, cultures historiques, curriculum et donnees;
5. lier toute affirmation forte a une source ou la marquer comme hypothese.
