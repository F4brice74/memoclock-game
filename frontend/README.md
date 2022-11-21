# MEMOCLOCK GAME FRONTEND

projet créé avec [Create React App](https://github.com/facebook/create-react-app).

## SCRIPTS DISPONIBLES

### `yarn start`

lance le projet en mode développement.\
Ouvrir [http://localhost:3000](http://localhost:3000) pour voir le résultat
la page sera automatiquement reloadée en cas de modification.

### `yarn test`

lance les tests ("à implémenter").\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds l'app pour la producttion dans le dossier `build`.\
info sur le déploiement [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Plus d'infos

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## ORGANISATION DU PROJET

### dossier `component` :

vous retrouverez tous les composants utilisé pour construire le projet avec pour chaque un fichier css attaché

### dossier `api` :

vous retoruverez les méthodes d'appel au backend pour la récupération et le traitement des données.

### dossier `utils` :

ici sont rangées les méthodes utilitaires

### dossier `image` :

l'ensemble des images utilisées sont stockées ici

### dossier `type` :

les types génériques sont regroupés dans ce dossier

## AMELIORATIONS PROPOSEES

de nombreuses améliorations peuvent être apportées au projet, dont entre autres : \

- implémenter les tests unitaires pour chaque composant
- création d'une authentification et/ou enregistrement du nom du joueur
- création des méthodes de suppression de données (DELETE)
- choix de nombre de cartes dans le tableau de départ
- amélioration de l'ui (notamment au click sur les cartes)
- filtrer/trier les scores : meilleurs scores, meilleurs temps, date ...
- timer plus efficace et précis
