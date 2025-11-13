/**
 * @name subject.js
 * @author The World Wolf 95
 * @description
 *    This file contains the events of subject management
 */

import Http from "./http.js";
import Utility from './utility.js';

/**
 * DEFINE VARIABLES
 */
// Contains the class which apply by level
const levelsClasses = {
    "PRIMARY": "table-light",
    "COLLEGE": "table-info",
    "HIGH_SCHOOL": "table-primary",
    "UNIVERSITY": "table-dark",
}

/**
 * Definition of functions
 */
/**
 * @name getAllSubjects
 * @description
 *      This function calls the API to fetch all subjects of each level and store result in local storage.
 */
async function getAllSubjects() {
    // Get levels list
    const levels = JSON.parse(localStorage.getItem("levels"));
    // Recuperation of subjects and add it in local storage
    for (var level of levels) {
        const response = await Http.getAllSubjectOfLevel(level.id);
        if (response.status === 200) {
            // Subjects have been found
            localStorage.setItem(level.name + "_SUBJECTS", JSON.stringify(response.data.data));
        } else {
            localStorage.setItem(level.name + "_SUBJECTS", JSON.stringify([]));
        }
    }
}

/**
 * @name onClickRadioButton
 * @description
 *      This function is execute when user click or change radio button choice.
 */
function onClickRadioButton() {

    switch(this.value) {
        case "PRIMARY":
            // Call function for primary subjects
            onClickPrimarySubjects();
        break;
        case "COLLEGE":
            // Call function for college subjects
            onClickCollegeSubjects();
        break;
        case "HIGH_SCHOOL":
            // Call function for high school subjects
            onClickHighSubjects();
        break;
        case "UNIVERSITY":
            // Call function for university subjects
            onClickUniversitySubjects();
        break;
        default:
            // Call function for all subjects
            onClickAllSubjects();
        break;
    }
}

/**
 * @name onClickAllSubjects
 * @description
 *   This function is event which will be executed when user click on all subjects radio button 
 */
function onClickAllSubjects() {
    // Get in local storage all subject of each level
    var subjects = [];
    const levels = JSON.parse(localStorage.getItem("levels"));
    for (var level of levels) {
        const levelSubjects = JSON.parse(localStorage.getItem(level.name + "_SUBJECTS"));
        for (var subject of levelSubjects) {
            subject.levelKey = level.name;
            // Add subject in all subjects list
            subjects.push(subject);
        }
    }
    // Call function to update the table
    updateSubjectsTable(subjects);
}
/**
 * @name onClickPrimarySubjects
 * @description
 *   This function is event which will be executed when user click on primary subjects radio button 
 */
function onClickPrimarySubjects() {
    var subjects = [];
    subjects = JSON.parse(localStorage.getItem("PRIMARY_SUBJECTS"));
    if (subjects && subjects.length > 0) {
        for (var subject of subjects) {
            subject.levelKey = "PRIMARY";
        }
    }else {
        subjects = [];
    }
    // Call function to update the table
    updateSubjectsTable(subjects);
}

/**
 * @name onClickCollegeSubjects
 * @description
 *   This function is event which will be executed when user click on college subjects radio button 
 */
function onClickCollegeSubjects() {
    var subjects = [];
    subjects = JSON.parse(localStorage.getItem("COLLEGE_SUBJECTS"));
    if (subjects && subjects.length > 0) {
        for (var subject of subjects) {
            subject.levelKey = "COLLEGE";
        }
    }else {
        subjects = [];
    }
    // Call function to update the table
    updateSubjectsTable(subjects);
}

/**
 * @name onClickHighSubjects
 * @description
 *   This function is event which will be executed when user click on high school subjects radio button 
 */
function onClickHighSubjects() {
    var subjects = [];
    subjects = JSON.parse(localStorage.getItem("HIGH_SCHOOL_SUBJECTS"));
    if (subjects && subjects.length > 0) {
        for (var subject of subjects) {
            subject.levelKey = "HIGH_SCHOOL";
        }
    }else {
        subjects = [];
    }
    // Call function to update the table
    updateSubjectsTable(subjects);
}

/**
 * @name onClickUniversitySubjects
 * @description
 *   This function is event which will be executed when user click on university school subjects radio button 
 */
function onClickUniversitySubjects() {
    var subjects = [];
    subjects = JSON.parse(localStorage.getItem("UNIVERSITY_SUBJECTS"));
    if (subjects && subjects.length > 0) {
        for (var subject of subjects) {
            subject.levelKey = "UNIVERSITY";
        }
    }else {
        subjects = [];
    }
    // Call function to update the table
    updateSubjectsTable(subjects);
}

/**
 * @name onClickDeleteSubject
 * @description
 *      This function which permits to show modal which permits to confirm the suppression of subject  
 */
function onClickDeleteSubject() {
    const levelId = this.getAttribute("levelId");
    const subjectId = this.getAttribute("subjectId");
    const levelName = this.getAttribute("levelName");
    const subjectName =  this.getAttribute("subjectName");
    // Update modal element element before showing
    document.getElementById("subjectsBtConfirmDelete").setAttribute("levelId", levelId);
    document.getElementById("subjectsBtConfirmDelete").setAttribute("subjectId", subjectId);
    // Update message to show
    document.getElementById("modalBody").innerHTML = 'Voulez vous vraiment supprimer la matière "<b>' + subjectName +'</b>" du niveau "<b>' + levelName + '</b>.';
    // Show modal
    $('#modalDelete').modal('show');
}

/**
 * @name onClickConfirmDeleteButton
 * @description
 *      This function permits to delete the subject and update table after suppression.
 */
async function onClickConfirmDeleteButton() {
    const levelId = this.getAttribute("levelId");
    const subjectId = this.getAttribute("subjectId");
    const response = await Http.deleteSubjectById(levelId, subjectId);
    if (response) {
        switch (response.status) {
            case 200:
                document.getElementById("subjectsBtAnnulDelete").click();
                Msg.success("La matière a bien été supprimée avec succès", 2000);
                // Update the table by the radio which is checked
                await getAllSubjects();
                if (document.getElementById("subjectsRdAllLevel").checked) {
                    onClickAllSubjects();
                } else if (document.getElementById("subjectsRdPrimaryLevel").checked) {
                    onClickPrimarySubjects();
                } else if (document.getElementById("subjectsRdCollegeLevel").checked) {
                    onClickCollegeSubjects();
                } else if (document.getElementById("subjectsRdHighLevel").checked) {
                    onClickHighSubjects();
                } else {
                    onClickUniversitySubjects();
                }
                break;
            case 401:
                document.getElementById("subjectsBtAnnulDelete").click();
                Msg.error("Erreur de suppression de la matière, merci de recommencer !");
                break;
            default:
                document.getElementById("subjectsBtAnnulDelete").click();
                Msg.error("Une erreur a été rencontrée merci de recommancer !");
                // Reset
                document.getElementById("subjectsBtAnnulDelete").reset();
                this.verifyAddForm();
                break;
        }
    } else {
        document.getElementById("modifyStudentBtClose").click();
        Msg.danger("Erreur sur le serveur, merci de recommencer !");
    }
}

/**
 * @name updateSubjectsTable
 * @param {Array} subjects
 * @description
 *  This function will display the table of data which given in parameter. If not data display not element div.
 */
function updateSubjectsTable(subjects) {
    // For action add attribut levelId and levelName and after deleting update table by radio button choice show no items if no element
    var tableContent = "";
    var n = 0;
    if (subjects.length > 0) {
        for (var subject of subjects) {
            // Generation of application line
            n += 1;
            // Define color by the level
            var tableLine = `<tr class="${levelsClasses[subject.levelKey]}">`;
            // Adding count column
            tableLine += `<td scope="row">${n}</td>`;
            // Adding creation date
            tableLine += `<td>${new Date(subject.createdAt).toLocaleDateString()}</td>`;
            // Adding modification date
            tableLine += `<td>${new Date(subject.updatedAt).toLocaleDateString()}</td>`;
            // Adding name
            tableLine += `<td>${subject.name}</td>`;
            // Adding Level
            tableLine += `<td>${Utility.getLevelNameByKey(subject.levelKey)}</td>`;
            // Adding Action
            tableLine += `<td align="center">
                            <a href="#" class="deleteLink" levelId="${subject.level}" subjectId="${subject.id}" subjectName="${subject.name}" levelName="${Utility.getLevelNameByKey(subject.levelKey)}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </a>
                        </td>`;
            // Close the table line
            tableLine += "</tr>";
            // Adding the line in table content
            tableContent += tableLine;
        }
        // Displayed table
        document.getElementById("subjectsTableBody").innerHTML = tableContent;
        document.getElementById("subjectsTable").removeAttribute("hidden");
        document.getElementById("subjectsDivNoSubject").setAttribute("hidden", true);
        // Adding event on delete button
        document.querySelectorAll('.deleteLink').forEach(link => {
            link.addEventListener('click', onClickDeleteSubject)
        });
    } else {
        // Display none item to display div
        document.getElementById("subjectsDivNoSubject").removeAttribute("hidden");
        document.getElementById("subjectsTable").setAttribute("hidden", true);
    }
}
/**
 * BEGINNING OF EVENTS CONNECTION AND LOADING ACTIONS
 */
window.addEventListener('load', async function () {
    // Get All subjects
    await getAllSubjects();
    // Hidden no subject div and display table
    document.getElementById("subjectsTable").removeAttribute("hidden");
    document.getElementById("subjectsDivNoSubject").setAttribute("hidden", true);
    // Checked only all subjects radio button and emit input event
    document.getElementById("subjectsRdAllLevel").setAttribute("checked", true);
    document.getElementById("subjectsRdPrimaryLevel").removeAttribute("checked");
    document.getElementById("subjectsRdCollegeLevel").removeAttribute("checked");
    document.getElementById("subjectsRdHighLevel").removeAttribute("checked");
    document.getElementById("subjectsRdUniversityLevel").removeAttribute("checked");
    // Trigger input all subject event
    onClickAllSubjects();
    // Adding event on levels radio button
    document.getElementById("subjectsRdAllLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("subjectsRdPrimaryLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("subjectsRdCollegeLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("subjectsRdHighLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("subjectsRdUniversityLevel").addEventListener("input", onClickRadioButton);
    // Adding event on confirm delete button
    document.getElementById("subjectsBtConfirmDelete").addEventListener("click", onClickConfirmDeleteButton);
});
