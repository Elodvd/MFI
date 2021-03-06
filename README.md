# Test MFI, application météo

## Présentation de l'application

L'application développée permet l'affichage d'un fond de carte avec plusieurs villes représentées par des points. Lors du click sur l'un de ces points, un graphique s'affiche avec les informations suivantes : température et taux d'humidité du jour, ainsi que des deux jours précédents et suivants.

## Outils

L'application utilise les librairies React, OpenLayers et Highchart. Les données affichées proviennent de l'API OpenWeatherMap.

## Installation

Cloner le projet sur sa machine hôte, dans le dossier de son choix et l'ouvrir

    git clone https://github.com/Elodvd/MFI.git
    cd elodie_david

## Lancement

### Si Docker est installé sur la machine hôte : construire l'image puis démarrer le container

    docker-compose build
    docker-compose up

Se rendre dans le navigateur et taper `localhost:3000` dans la barre de recherche

### Sans Docker, possibilité de lancer l'app via npm

Installer tous les packages du fichier `package.json` nécessaires au fonctionnement de l'app puis démarrer l'application

    npm install
    npm run start

Se rendre dans le navigateur et taper `localhost:3000` dans la barre de recherche

## Démo

![demo app](/elodie_david/public/app.JPG "demo app").
