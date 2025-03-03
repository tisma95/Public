# PROJET GESTIONNAIRE DE BASE DE DONNEES : PYTHON

## Composantes

**Language:** Python <br>
**Dependances:** Python3 <br>
**Auteur:** The World Wolf 95<br>
**Github:** https://github.com/nobodyiam95

---
## Description

Il s'agit de créer une application desktop en utilisant le language python. <br>
Ce projet est à but éducatif avec pour objectifs : 
+ Apprendre à coder en Python
+ Apprendre à manipuler les données et fichiers json avec Python
+ Apprendre à créer une application mutilangage
+ Apprendre à utiliser Tkinter

Cette application consiste à repondre au besoin suivant :

Lors d'un recensement pour un festival, les agents recenseurs ont eu le besoin d'avoir un outil leur permettant de faciliter l'enregistrement de personnes. De ce fait ils vous donnent les informations suivantes : 

+ Une **personne** enregistrée est caractérisée par: un ou des **prénom(s)**, un **nom**, un **age**, un **sexe**, une ou des **langues** (Français, Anglais ou Chinois)
+ La base de données à utiliser doit être un fichier json permettant le traitement après enregistrement
+ Il peut arriver qu'on est besoin de supprimer des personnes enregistrées ou un groupe de personnes selon des caractéristiques (par exemple suppression de toutes les personnes de sexe masculin)
+ Il peut arriver aussi qu'on veuille rechercher des personnes selon des critères (par exemple afficher toutes les personnes de sexe féminin)
+ On doit pouvoir vider toute la base de données
+ Lors de l'enregistrement lorsque qu'un utilisateur ne parle aucune des langues l'enregistrement dans le fichier pour les **langues** doit être **autre**

Une personne utilisant l'application doit pouvoir réaliser les actions suivantes :

1. Selectionner un fichier de base de données
2. Créer un fichier de base de données au besoin
3. Ajouter une nouvelle personne dans le fichier
4. Supprimer une personne déjà enregistrée
5. Rechercher une ou des personnes
6. Afficher la liste de tous les enregistrés
7. Supprimer tous les inscrits
8. Annuler une saisie dans les champs
9. Changer de langue d'affichage (Anglais ou Français)
10. Quitter l'application

---
## Consignes

L'application doit respecter les contraintes suivantes :

+ Bloquer les actions tant que l'utilisateur n'a pas fourni le fichier de base de données
+ Verifier que le fichier fourni est au format json 
+ Avant enregistrement verifier que les champs sont corrects avant de réaliser l'action sinon afficher un message d'erreur
+ Lorsque l'utilisateur change de langue l'affichage doit changer selon la langue choisie

___
## Commandes

Pour démarrer l'application il faut suivre les étapes suivantes :
+ Installer **python** [Cliquer ici pour le téléchargement](https://www.python.org/downloads/)
+ Installer **pip** si ce n'est pas fait, utiliser la commande `python -m pip install`
+ Installer **python-i18n** avec la commande `python3 -m pip install python-i18n` 
+ Démarrer l'application avec la commande `python Main.py`
+ Il peut arriver que cette commande ne démarre pas l'application notamment dans le cas où vous avez installé python 3 pour celà, il faudra essayer la commande suivante : `python3 Main.py`

---
[PAGE README](README.md) <br>
[DESCRIPTION EN ANGLAIS](README_EN.md)