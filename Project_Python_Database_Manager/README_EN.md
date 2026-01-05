# PROJECT DATABASE MANAGER : PYTHON

## Composantes

**Language:** Python <br>
**Dependances:** Python3 <br>
**Author:** The World Wolf 95 <br>
**Github:** https://github.com/nobodyiam95

---
## Description

The goal is to create an desktop application which used the language Python.
This project is educational project with the objectives :
+ Training on the programming in Python
+ Training on datas and json file manipulation with Python
+ Training on the creation of multilanguage application
+ Training on the using of Tkinter

This application consists to reply at need as follow :

During a register for a festival, the registar have the need to have an application which permits to facilate the register of persons. They give you the informations below :

+ An **person** saved for the festival is characterized  by: a first name, a last name, an age, a sex, one or many **languages** (French, English or Chinese)
+ The database which used must be a json file which permits the treatment after saving
+ It can happen that we want to delete a registered person ou a group of persons by characteristics (for example deleting of all persons with male sex)
+ It can happen that we want to reseach persons by characteristics (for example show all persons of female sex)
+ We can drop the database
+ During registration when an user doesn't speak none of the languages the saving in the file for the **languages** must be **other**

A person using the application must be able to perform the following actions :

1. Select the file of database
2. Create the file of database if necessary
3. Add a new person in the file
4. Delete a person already saved
5. Research one or many persons
6. Display the list of all saved persons
7. Delete all saved persons
8. Cancel entries in inputs
9. Change the display language (English or French)
10. Quit the application

---
## Instructions

The application must respect the constraints below :

+ Block the actions while the user doesn't give the database file
+ Check if the choosen file is on json format
+ Before registration check that the inputs are correct before to realize the action else display an error message
+ When the user change the language, the displaying must change according to the language chosen

## Installation

For running the application we must apply the steps below :
+ Install **python** [Click here for download](https://www.python.org/downloads/)
+ Install **pip** if it is not install, use the command `python -m pip install`
+ Install **python-i18n** with the command `python3 -m pip install python-i18n`
+ Run the application with the command `python Main.py`
+ It is possible that this command doesn't run the application when you have installed python 3, you must try with the command `python3 Main.py`

---
[PAGE README](README.md) <br>
[DESCRIPTION IN ENGLISH](README_EN.md)