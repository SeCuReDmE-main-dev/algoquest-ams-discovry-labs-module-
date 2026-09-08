# Android device proof — première passe

Cette vérification confirme la chaîne réelle après la compilation APK. Elle ne doit pas être remplacée par un test de stockage simulé.

## Préconditions

- APK produit par `npm run mobile:android:verify`.
- Téléphone ou émulateur Android API 24 ou plus récent, autorisé par `adb devices`.
- Aucune donnée réelle d’apprenant.

## Parcours borné

1. Installer l’APK debug et ouvrir **AlgoQuest**.
2. Choisir « L’horizon lointain » depuis la planche.
3. Ouvrir la fiche du héros, aller dans **Atelier**, saisir une force et lancer la simulation.
4. Revenir à la planche et vérifier que la trajectoire affichée correspond aux paramètres.
5. Saisir un brouillon dans la fiche, envoyer l’application en arrière-plan, puis la reprendre.
6. Forcer l’arrêt de l’application, la rouvrir et vérifier la même partie, la même activité et le brouillon conservé.
7. Terminer une activité, forcer de nouveau l’arrêt, rouvrir et vérifier que la récompense n’a été accordée qu’une fois.
8. Activer la taille de police Android à 200 %, parcourir Planche/Fiche/Qbit et vérifier focus, défilement vertical et absence de contrôle inaccessible.
9. Activer « Supprimer les animations » ou la réduction de mouvement et vérifier que la trajectoire reste compréhensible.

## Preuve à conserver

Enregistrer la version Android, le modèle ou profil d’émulateur, l’empreinte SHA-256 de l’APK, l’heure UTC, le résultat de chaque étape et toute anomalie. Ne pas enregistrer de compte, de jeton ou de donnée d’apprenant.
