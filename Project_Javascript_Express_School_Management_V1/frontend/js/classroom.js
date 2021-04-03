/**
 * @name classroom.js
 * @author The World Wolf 95
 * @description
 *    This file contains the events of classroom management
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
 * @name getAllClassrooms
 * @description
 *      This function calls the API to fetch all classrooms of each level and store result in local storage.
 */
async function getAllClassrooms() {
    // Get levels list
    const levels = JSON.parse(localStorage.getItem("levels"));
    // Recuperation of classrooms and add it in local storage
    for (var level of levels) {
        const response = await Http.getAllClassroomsOfLevel(level.id);
        if (response.status === 200) {
            // CLassrooms have been found
            localStorage.setItem(level.name + "_CLASSROOMS", JSON.stringify(response.data.data));
        } else {
            localStorage.setItem(level.name + "_CLASSROOMS", JSON.stringify([]));
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
            // Call function for primary classrooms
            onClickPrimaryClassrooms();
        break;
        case "COLLEGE":
            // Call function for college classrooms
            onClickCollegeClassrooms();
        break;
        case "HIGH_SCHOOL":
            // Call function for high school classrooms
            onClickHighClassrooms();
        break;
        case "UNIVERSITY":
            // Call function for university classrooms
            onClickUniversityClassrooms();
        break;
        default:
            // Call function for all classrooms
            onClickAllClassrooms();
        break;
    }
}

/**
 * @name onClickAllClassrooms
 * @description
 *   This function is event which will be executed when user click on all classrooms radio button 
 */
function onClickAllClassrooms() {
    // Get in local storage all classroom of each level
    var classrooms = [];
    const levels = JSON.parse(localStorage.getItem("levels"));
    for (var level of levels) {
        const levelClassrooms = JSON.parse(localStorage.getItem(level.name + "_CLASSROOMS"));
        for (var classroom of levelClassrooms) {
            classroom.levelKey = level.name;
            // Add classroom in all classrooms list
            classrooms.push(classroom);
        }
    }
    // Call function to update the table
    updateClassroomsTable(classrooms);
}
/**
 * @name onClickPrimaryClassrooms
 * @description
 *   This function is event which will be executed when user click on primary classrooms radio button 
 */
function onClickPrimaryClassrooms() {
    var classrooms = [];
    classrooms = JSON.parse(localStorage.getItem("PRIMARY_CLASSROOMS"));
    if (classrooms && classrooms.length > 0) {
        for (var classroom of classrooms) {
            classroom.levelKey = "PRIMARY";
        }
    }else {
        classrooms = [];
    }
    // Call function to update the table
    updateClassroomsTable(classrooms);
}

/**
 * @name onClickCollegeClassrooms
 * @description
 *   This function is event which will be executed when user click on college classrooms radio button 
 */
function onClickCollegeClassrooms() {
    var classrooms = [];
    classrooms = JSON.parse(localStorage.getItem("COLLEGE_CLASSROOMS"));
    if (classrooms && classrooms.length > 0) {
        for (var classroom of classrooms) {
            classroom.levelKey = "COLLEGE";
        }
    }else {
        classrooms = [];
    }
    // Call function to update the table
    updateClassroomsTable(classrooms);
}

/**
 * @name onClickHighClassrooms
 * @description
 *   This function is event which will be executed when user click on high school classrooms radio button 
 */
function onClickHighClassrooms() {
    var classrooms = [];
    classrooms = JSON.parse(localStorage.getItem("HIGH_SCHOOL_CLASSROOMS"));
    if (classrooms && classrooms.length > 0) {
        for (var classroom of classrooms) {
            classroom.levelKey = "HIGH_SCHOOL";
        }
    }else {
        classrooms = [];
    }
    // Call function to update the table
    updateClassroomsTable(classrooms);
}

/**
 * @name onClickUniversityClassrooms
 * @description
 *   This function is event which will be executed when user click on university classrooms radio button 
 */
function onClickUniversityClassrooms() {
    var classrooms = [];
    classrooms = JSON.parse(localStorage.getItem("UNIVERSITY_CLASSROOMS"));
    if (classrooms && classrooms.length > 0) {
        for (var classroom of classrooms) {
            classroom.levelKey = "UNIVERSITY";
        }
    }else {
        classrooms = [];
    }
    // Call function to update the table
    updateClassroomsTable(classrooms);
}

/**
 * @name onClickDeleteClassroom
 * @description
 *      This function which permits to show modal which permits to confirm the suppression of classroom  
 */
function onClickDeleteClassroom() {
    const levelId = this.getAttribute("levelId");
    const classroomId = this.getAttribute("classroomId");
    const levelName = this.getAttribute("levelName");
    const classroomName =  this.getAttribute("classroomName");
    // Update modal element element before showing
    document.getElementById("classroomsBtConfirmDelete").setAttribute("levelId", levelId);
    document.getElementById("classroomsBtConfirmDelete").setAttribute("classroomId", classroomId);
    // Update message to show
    document.getElementById("modalBody").innerHTML = 'Voulez vous vraiment supprimer la classe "<b>' + classroomName +'</b>" du niveau "<b>' + levelName + '"</b>.';
    // Show modal
    $('#modalDelete').modal('show');
}

/**
 * @name onClickConfirmDeleteButton
 * @description
 *      This function permits to delete the classroom and update table after suppression.
 */
async function onClickConfirmDeleteButton() {
    const levelId = this.getAttribute("levelId");
    const classroomId = this.getAttribute("classroomId");
    const response = await Http.deleteClassroomById(levelId, classroomId);
    if (response) {
        switch (response.status) {
            case 200:
                document.getElementById("classroomsBtAnnulDelete").click();
                Msg.success("La classe a bien été supprimée avec succès", 2000);
                // Update the table by the radio which is checked
                await getAllClassrooms();
                if (document.getElementById("classroomsRdAllLevel").checked) {
                    onClickAllClassrooms();
                } else if (document.getElementById("classroomsRdPrimaryLevel").checked) {
                    onClickPrimaryClassrooms();
                } else if (document.getElementById("classroomsRdCollegeLevel").checked) {
                    onClickCollegeClassrooms();
                } else if (document.getElementById("classroomsRdHighLevel").checked) {
                    onClickHighClassrooms();
                } else {
                    onClickUniversityClassrooms();
                }
                break;
            case 401:
                document.getElementById("classroomsBtAnnulDelete").click();
                Msg.error("Erreur de suppression de la classe, merci de recommencer !");
                break;
            default:
                document.getElementById("classroomsBtAnnulDelete").click();
                Msg.error("Une erreur a été rencontrée merci de recommancer !");
                // Reset
                document.getElementById("classroomsBtAnnulDelete").reset();
                this.verifyAddForm();
                break;
        }
    } else {
        document.getElementById("modifyStudentBtClose").click();
        Msg.danger("Erreur sur le serveur, merci de recommencer !");
    }
}

/**
 * @name updateClassroomsTable
 * @param {Array} classrooms
 * @description
 *  This function will display the table of data which given in parameter. If not data display not element div.
 */
function updateClassroomsTable(classrooms) {
    // For action add attribut levelId and levelName and after deleting update table by radio button choice show no items if no element
    var tableContent = "";
    var n = 0;
    if (classrooms.length > 0) {
        for (var classroom of classrooms) {
            // Generation of application line
            n += 1;
            // Define color by the level
            var tableLine = `<tr class="${levelsClasses[classroom.levelKey]}">`;
            // Adding count column
            tableLine += `<td scope="row">${n}</td>`;
            // Adding creation date
            tableLine += `<td>${new Date(classroom.createdAt).toLocaleDateString()}</td>`;
            // Adding modification date
            tableLine += `<td>${new Date(classroom.updatedAt).toLocaleDateString()}</td>`;
            // Adding name
            tableLine += `<td>${classroom.name}</td>`;
            // Adding capacity
            tableLine += `<td>${classroom.capacity}</td>`;
            // Adding Level
            tableLine += `<td>${Utility.getLevelNameByKey(classroom.levelKey)}</td>`;
            // Adding Action
            tableLine += `<td align="center">
                            <a href="#" class="deleteLink" levelId="${classroom.level}" classroomId="${classroom.id}" classroomName="${classroom.name}" levelName="${Utility.getLevelNameByKey(classroom.levelKey)}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </a>
                        </td>`;
            // Close the table line
            tableLine += "</tr>";
            // Adding the line in table content
            tableContent += tableLine;
        }
        // Displayed table
        document.getElementById("classroomsTableBody").innerHTML = tableContent;
        document.getElementById("classroomsTable").removeAttribute("hidden");
        document.getElementById("classroomsDivNoClassroom").setAttribute("hidden", true);
        // Adding event on delete button
        document.querySelectorAll('.deleteLink').forEach(link => {
            link.addEventListener('click', onClickDeleteClassroom)
        });
    } else {
        // Display none item to display div
        document.getElementById("classroomsDivNoClassroom").removeAttribute("hidden");
        document.getElementById("classroomsTable").setAttribute("hidden", true);
    }
}
/**
 * BEGINNING OF EVENTS CONNECTION AND LOADING ACTIONS
 */
window.addEventListener('load', async function () {
    // Get All classrooms
    await getAllClassrooms();
    // Hidden no classroom div and display table
    document.getElementById("classroomsTable").removeAttribute("hidden");
    document.getElementById("classroomsDivNoClassroom").setAttribute("hidden", true);
    // Checked only all classrooms radio button and emit input event
    document.getElementById("classroomsRdAllLevel").setAttribute("checked", true);
    document.getElementById("classroomsRdPrimaryLevel").removeAttribute("checked");
    document.getElementById("classroomsRdCollegeLevel").removeAttribute("checked");
    document.getElementById("classroomsRdHighLevel").removeAttribute("checked");
    document.getElementById("classroomsRdUniversityLevel").removeAttribute("checked");
    // Trigger input all classroom event
    onClickAllClassrooms();
    // Adding event on levels radio button
    document.getElementById("classroomsRdAllLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("classroomsRdPrimaryLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("classroomsRdCollegeLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("classroomsRdHighLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("classroomsRdUniversityLevel").addEventListener("input", onClickRadioButton);
    // Adding event on confirm delete button
    document.getElementById("classroomsBtConfirmDelete").addEventListener("click", onClickConfirmDeleteButton);
});
