/**
 * @name teacher.js
 * @author The World Wolf 95
 * @description
 *    This file contains the events of teacher management
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
 * @name getAllTeachers
 * @description
 *      This function calls the API to fetch all teachers of each level and store result in local storage.
 */
async function getAllTeachers() {
    // Get levels list
    const levels = JSON.parse(localStorage.getItem("levels"));
    // Recuperation of teachers and add it in local storage
    for (var level of levels) {
        const response = await Http.getAllTeachersOfLevel(level.id);
        if (response.status === 200) {
            // CLassrooms have been found
            localStorage.setItem(level.name + "_TEACHERS", JSON.stringify(response.data.data));
        } else {
            localStorage.setItem(level.name + "_TEACHERS", JSON.stringify([]));
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
            // Call function for primary teachers
            onClickPrimaryTeachers();
        break;
        case "COLLEGE":
            // Call function for college teachers
            onClickCollegeTeachers();
        break;
        case "HIGH_SCHOOL":
            // Call function for high school teachers
            onClickHighTeachers();
        break;
        case "UNIVERSITY":
            // Call function for university teachers
            onClickUniversityTeachers();
        break;
        default:
            // Call function for all teachers
            onClickAllTeachers();
        break;
    }
}

/**
 * @name onClickAllTeachers
 * @description
 *   This function is event which will be executed when user click on all teachers radio button 
 */
function onClickAllTeachers() {
    // Get in local storage all teacher of each level
    var teachers = [];
    const levels = JSON.parse(localStorage.getItem("levels"));
    for (var level of levels) {
        const levelTeachers = JSON.parse(localStorage.getItem(level.name + "_TEACHERS"));
        for (var teacher of levelTeachers) {
            teacher.levelKey = level.name;
            // Add teacher in all teachers list
            teachers.push(teacher);
        }
    }
    // Call function to update the table
    updateTeachersTable(teachers);
}
/**
 * @name onClickPrimaryTeachers
 * @description
 *   This function is event which will be executed when user click on primary teachers radio button 
 */
function onClickPrimaryTeachers() {
    var teachers = [];
    teachers = JSON.parse(localStorage.getItem("PRIMARY_TEACHERS"));
    if (teachers && teachers.length > 0) {
        for (var teacher of teachers) {
            teacher.levelKey = "PRIMARY";
        }
    }else {
        teachers = [];
    }
    // Call function to update the table
    updateTeachersTable(teachers);
}

/**
 * @name onClickCollegeTeachers
 * @description
 *   This function is event which will be executed when user click on college teachers radio button 
 */
function onClickCollegeTeachers() {
    var teachers = [];
    teachers = JSON.parse(localStorage.getItem("COLLEGE_TEACHERS"));
    if (teachers && teachers.length > 0) {
        for (var teacher of teachers) {
            teacher.levelKey = "COLLEGE";
        }
    }else {
        teachers = [];
    }
    // Call function to update the table
    updateTeachersTable(teachers);
}

/**
 * @name onClickHighTeachers
 * @description
 *   This function is event which will be executed when user click on high school teachers radio button 
 */
function onClickHighTeachers() {
    var teachers = [];
    teachers = JSON.parse(localStorage.getItem("HIGH_SCHOOL_TEACHERS"));
    if (teachers && teachers.length > 0) {
        for (var teacher of teachers) {
            teacher.levelKey = "HIGH_SCHOOL";
        }
    }else {
        teachers = [];
    }
    // Call function to update the table
    updateTeachersTable(teachers);
}

/**
 * @name onClickUniversityTeachers
 * @description
 *   This function is event which will be executed when user click on university teachers radio button 
 */
function onClickUniversityTeachers() {
    var teachers = [];
    teachers = JSON.parse(localStorage.getItem("UNIVERSITY_TEACHERS"));
    if (teachers && teachers.length > 0) {
        for (var teacher of teachers) {
            teacher.levelKey = "UNIVERSITY";
        }
    }else {
        teachers = [];
    }
    // Call function to update the table
    updateTeachersTable(teachers);
}

/**
 * @name onClickDeleteTeacher
 * @description
 *      This function which permits to show modal which permits to confirm the suppression of teacher  
 */
function onClickDeleteTeacher() {
    const levelId = this.getAttribute("levelId");
    const teacherId = this.getAttribute("teacherId");
    const levelName = this.getAttribute("levelName");
    const teacherName =  this.getAttribute("teacherName");
    // Update modal element element before showing
    document.getElementById("teachersBtConfirmDelete").setAttribute("levelId", levelId);
    document.getElementById("teachersBtConfirmDelete").setAttribute("teacherId", teacherId);
    // Update message to show
    document.getElementById("modalBody").innerHTML = 'Voulez vous vraiment supprimer l\'enseignant "<b>' + teacherName +'</b>" du niveau "<b>' + levelName + '</b>.';
    // Show modal
    $('#modalDelete').modal('show');
}

/**
 * @name onClickConfirmDeleteButton
 * @description
 *      This function permits to delete the teacher and update table after suppression.
 */
async function onClickConfirmDeleteButton() {
    const levelId = this.getAttribute("levelId");
    const teacherId = this.getAttribute("teacherId");
    const response = await Http.deleteTeacherById(levelId, teacherId);
    if (response) {
        switch (response.status) {
            case 200:
                document.getElementById("teachersBtAnnulDelete").click();
                Msg.success("L'enseignant a bien été supprimé avec succès", 2000);
                // Update the table by the radio which is checked
                await getAllTeachers();
                if (document.getElementById("teachersRdAllLevel").checked) {
                    onClickAllTeachers();
                } else if (document.getElementById("teachersRdPrimaryLevel").checked) {
                    onClickPrimaryTeachers();
                } else if (document.getElementById("teachersRdCollegeLevel").checked) {
                    onClickCollegeTeachers();
                } else if (document.getElementById("teachersRdHighLevel").checked) {
                    onClickHighTeachers();
                } else {
                    onClickUniversityTeachers();
                }
                break;
            case 401:
                document.getElementById("teachersBtAnnulDelete").click();
                Msg.error("Erreur de suppression de l'enseignant, merci de recommencer !");
                break;
            default:
                document.getElementById("teachersBtAnnulDelete").click();
                Msg.error("Une erreur a été rencontrée merci de recommancer !");
                // Reset
                document.getElementById("teachersBtAnnulDelete").reset();
                this.verifyAddForm();
                break;
        }
    } else {
        document.getElementById("modifyTeacherBtClose").click();
        Msg.danger("Erreur sur le serveur, merci de recommencer !");
    }
}

/**
 * @name updateTeachersTable
 * @param {Array} teachers
 * @description
 *  This function will display the table of data which given in parameter. If not data display not element div.
 */
function updateTeachersTable(teachers) {
    // For action add attribut levelId and levelName and after deleting update table by radio button choice show no items if no element
    var tableContent = "";
    var n = 0;
    if (teachers.length > 0) {
        for (var teacher of teachers) {
            // Generation of application line
            n += 1;
            // Define color by the level
            var tableLine = `<tr class="${levelsClasses[teacher.levelKey]}">`;
            // Adding count column
            tableLine += `<td scope="row">${n}</td>`;
            // Adding creation date
            tableLine += `<td>${new Date(teacher.createdAt).toLocaleDateString()}</td>`;
            // Adding modification date
            tableLine += `<td>${new Date(teacher.updatedAt).toLocaleDateString()}</td>`;
            // Adding last name
            tableLine += `<td>${teacher.lastName}</td>`;
            // Adding first name
            tableLine += `<td>${teacher.firstName}</td>`;
            // Adding birthday
            tableLine += `<td>${new Date(teacher.birthday).toLocaleDateString()}</td>`;
            // Adding Level
            tableLine += `<td>${Utility.getLevelNameByKey(teacher.levelKey)}</td>`;
            // Adding Action
            tableLine += `<td align="center">
                            <a href="#" class="deleteLink" levelId="${teacher.level}" teacherId="${teacher.id}" teacherName="${teacher.lastName + " " + teacher.firstName}" levelName="${Utility.getLevelNameByKey(teacher.levelKey)}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </a>
                        </td>`;
            // Close the table line
            tableLine += "</tr>";
            // Adding the line in table content
            tableContent += tableLine;
        }
        // Displayed table
        document.getElementById("teachersTableBody").innerHTML = tableContent;
        document.getElementById("teachersTable").removeAttribute("hidden");
        document.getElementById("teachersDivNoTeacher").setAttribute("hidden", true);
        // Adding event on delete button
        document.querySelectorAll('.deleteLink').forEach(link => {
            link.addEventListener('click', onClickDeleteTeacher)
        });
    } else {
        // Display none item to display div
        document.getElementById("teachersDivNoTeacher").removeAttribute("hidden");
        document.getElementById("teachersTable").setAttribute("hidden", true);
    }
}
/**
 * BEGINNING OF EVENTS CONNECTION AND LOADING ACTIONS
 */
window.addEventListener('load', async function () {
    // Get All teachers
    await getAllTeachers();
    // Hidden no teacher div and display table
    document.getElementById("teachersTable").removeAttribute("hidden");
    document.getElementById("teachersDivNoTeacher").setAttribute("hidden", true);
    // Checked only all teachers radio button and emit input event
    document.getElementById("teachersRdAllLevel").setAttribute("checked", true);
    document.getElementById("teachersRdPrimaryLevel").removeAttribute("checked");
    document.getElementById("teachersRdCollegeLevel").removeAttribute("checked");
    document.getElementById("teachersRdHighLevel").removeAttribute("checked");
    document.getElementById("teachersRdUniversityLevel").removeAttribute("checked");
    // Trigger input all teacher event
    onClickAllTeachers();
    // Adding event on levels radio button
    document.getElementById("teachersRdAllLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("teachersRdPrimaryLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("teachersRdCollegeLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("teachersRdHighLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("teachersRdUniversityLevel").addEventListener("input", onClickRadioButton);
    // Adding event on confirm delete button
    document.getElementById("teachersBtConfirmDelete").addEventListener("click", onClickConfirmDeleteButton);
});
