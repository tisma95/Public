/**
 * @name student.js
 * @author The World Wolf 95
 * @description
 *    This file contains the events of student management
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
 * @name getAllStudents
 * @description
 *      This function calls the API to fetch all students of each level and store result in local storage.
 */
async function getAllStudents() {
    // Get levels list
    const levels = JSON.parse(localStorage.getItem("levels"));
    // Recuperation of students and add it in local storage
    for (var level of levels) {
        const response = await Http.getAllStudentsOfLevel(level.id);
        if (response.status === 200) {
            // CLassrooms have been found
            localStorage.setItem(level.name + "_STUDENTS", JSON.stringify(response.data.data));
        } else {
            localStorage.setItem(level.name + "_STUDENTS", JSON.stringify([]));
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
            // Call function for primary students
            onClickPrimaryStudents();
        break;
        case "COLLEGE":
            // Call function for college students
            onClickCollegeStudents();
        break;
        case "HIGH_SCHOOL":
            // Call function for high school students
            onClickHighStudents();
        break;
        case "UNIVERSITY":
            // Call function for university students
            onClickUniversityStudents();
        break;
        default:
            // Call function for all students
            onClickAllStudents();
        break;
    }
}

/**
 * @name onClickAllStudents
 * @description
 *   This function is event which will be executed when user click on all students radio button 
 */
function onClickAllStudents() {
    // Get in local storage all student of each level
    var students = [];
    const levels = JSON.parse(localStorage.getItem("levels"));
    for (var level of levels) {
        const levelStudents = JSON.parse(localStorage.getItem(level.name + "_STUDENTS"));
        for (var student of levelStudents) {
            student.levelKey = level.name;
            // Add student in all students list
            students.push(student);
        }
    }
    // Call function to update the table
    updateStudentsTable(students);
}
/**
 * @name onClickPrimaryStudents
 * @description
 *   This function is event which will be executed when user click on primary students radio button 
 */
function onClickPrimaryStudents() {
    var students = [];
    students = JSON.parse(localStorage.getItem("PRIMARY_STUDENTS"));
    if (students && students.length > 0) {
        for (var student of students) {
            student.levelKey = "PRIMARY";
        }
    }else {
        students = [];
    }
    // Call function to update the table
    updateStudentsTable(students);
}

/**
 * @name onClickCollegeStudents
 * @description
 *   This function is event which will be executed when user click on college students radio button 
 */
function onClickCollegeStudents() {
    var students = [];
    students = JSON.parse(localStorage.getItem("COLLEGE_STUDENTS"));
    if (students && students.length > 0) {
        for (var student of students) {
            student.levelKey = "COLLEGE";
        }
    }else {
        students = [];
    }
    // Call function to update the table
    updateStudentsTable(students);
}

/**
 * @name onClickHighStudents
 * @description
 *   This function is event which will be executed when user click on high school students radio button 
 */
function onClickHighStudents() {
    var students = [];
    students = JSON.parse(localStorage.getItem("HIGH_SCHOOL_STUDENTS"));
    if (students && students.length > 0) {
        for (var student of students) {
            student.levelKey = "HIGH_SCHOOL";
        }
    }else {
        students = [];
    }
    // Call function to update the table
    updateStudentsTable(students);
}

/**
 * @name onClickUniversityStudents
 * @description
 *   This function is event which will be executed when user click on university students radio button 
 */
function onClickUniversityStudents() {
    var students = [];
    students = JSON.parse(localStorage.getItem("UNIVERSITY_STUDENTS"));
    if (students && students.length > 0) {
        for (var student of students) {
            student.levelKey = "UNIVERSITY";
        }
    }else {
        students = [];
    }
    // Call function to update the table
    updateStudentsTable(students);
}

/**
 * @name onClickDeleteStudent
 * @description
 *      This function which permits to show modal which permits to confirm the suppression of student  
 */
function onClickDeleteStudent() {
    const levelId = this.getAttribute("levelId");
    const studentId = this.getAttribute("studentId");
    const levelName = this.getAttribute("levelName");
    const studentName =  this.getAttribute("studentName");
    // Update modal element element before showing
    document.getElementById("studentsBtConfirmDelete").setAttribute("levelId", levelId);
    document.getElementById("studentsBtConfirmDelete").setAttribute("studentId", studentId);
    // Update message to show
    document.getElementById("modalBody").innerHTML = 'Voulez vous vraiment supprimer l\'élève "<b>' + studentName +'</b>" du niveau "<b>' + levelName + '</b>.';
    // Show modal
    $('#modalDelete').modal('show');
}

/**
 * @name onClickConfirmDeleteButton
 * @description
 *      This function permits to delete the student and update table after suppression.
 */
async function onClickConfirmDeleteButton() {
    const levelId = this.getAttribute("levelId");
    const studentId = this.getAttribute("studentId");
    const response = await Http.deleteStudentById(levelId, studentId);
    if (response) {
        switch (response.status) {
            case 200:
                document.getElementById("studentsBtAnnulDelete").click();
                Msg.success("L'élève a bien été supprimé avec succès", 2000);
                // Update the table by the radio which is checked
                await getAllStudents();
                if (document.getElementById("studentsRdAllLevel").checked) {
                    onClickAllStudents();
                } else if (document.getElementById("studentsRdPrimaryLevel").checked) {
                    onClickPrimaryStudents();
                } else if (document.getElementById("studentsRdCollegeLevel").checked) {
                    onClickCollegeStudents();
                } else if (document.getElementById("studentsRdHighLevel").checked) {
                    onClickHighStudents();
                } else {
                    onClickUniversityStudents();
                }
                break;
            case 401:
                document.getElementById("studentsBtAnnulDelete").click();
                Msg.error("Erreur de suppression de l'élève, merci de recommencer !");
                break;
            default:
                document.getElementById("studentsBtAnnulDelete").click();
                Msg.error("Une erreur a été rencontrée merci de recommancer !");
                // Reset
                document.getElementById("studentsBtAnnulDelete").reset();
                this.verifyAddForm();
                break;
        }
    } else {
        document.getElementById("modifyStudentBtClose").click();
        Msg.danger("Erreur sur le serveur, merci de recommencer !");
    }
}

/**
 * @name updateStudentsTable
 * @param {Array} students
 * @description
 *  This function will display the table of data which given in parameter. If not data display not element div.
 */
function updateStudentsTable(students) {
    // For action add attribut levelId and levelName and after deleting update table by radio button choice show no items if no element
    var tableContent = "";
    var n = 0;
    if (students.length > 0) {
        for (var student of students) {
            // Generation of application line
            n += 1;
            // Define color by the level
            var tableLine = `<tr class="${levelsClasses[student.levelKey]}">`;
            // Adding count column
            tableLine += `<td scope="row">${n}</td>`;
            // Adding creation date
            tableLine += `<td>${new Date(student.createdAt).toLocaleDateString()}</td>`;
            // Adding modification date
            tableLine += `<td>${new Date(student.updatedAt).toLocaleDateString()}</td>`;
            // Adding last name
            tableLine += `<td>${student.lastName}</td>`;
            // Adding first name
            tableLine += `<td>${student.firstName}</td>`;
            // Adding birthday
            tableLine += `<td>${new Date(student.birthday).toLocaleDateString()}</td>`;
            // Adding Level
            tableLine += `<td>${Utility.getLevelNameByKey(student.levelKey)}</td>`;
            // Adding Action
            tableLine += `<td align="center">
                            <a href="#" class="deleteLink" levelId="${student.level}" studentId="${student.id}" studentName="${student.lastName + " " + student.firstName}" levelName="${Utility.getLevelNameByKey(student.levelKey)}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </a>
                        </td>`;
            // Close the table line
            tableLine += "</tr>";
            // Adding the line in table content
            tableContent += tableLine;
        }
        // Displayed table
        document.getElementById("studentsTableBody").innerHTML = tableContent;
        document.getElementById("studentsTable").removeAttribute("hidden");
        document.getElementById("studentsDivNoStudent").setAttribute("hidden", true);
        // Adding event on delete button
        document.querySelectorAll('.deleteLink').forEach(link => {
            link.addEventListener('click', onClickDeleteStudent)
        });
    } else {
        // Display none item to display div
        document.getElementById("studentsDivNoStudent").removeAttribute("hidden");
        document.getElementById("studentsTable").setAttribute("hidden", true);
    }
}
/**
 * BEGINNING OF EVENTS CONNECTION AND LOADING ACTIONS
 */
window.addEventListener('load', async function () {
    // Get All students
    await getAllStudents();
    // Hidden no student div and display table
    document.getElementById("studentsTable").removeAttribute("hidden");
    document.getElementById("studentsDivNoStudent").setAttribute("hidden", true);
    // Checked only all students radio button and emit input event
    document.getElementById("studentsRdAllLevel").setAttribute("checked", true);
    document.getElementById("studentsRdPrimaryLevel").removeAttribute("checked");
    document.getElementById("studentsRdCollegeLevel").removeAttribute("checked");
    document.getElementById("studentsRdHighLevel").removeAttribute("checked");
    document.getElementById("studentsRdUniversityLevel").removeAttribute("checked");
    // Trigger input all student event
    onClickAllStudents();
    // Adding event on levels radio button
    document.getElementById("studentsRdAllLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("studentsRdPrimaryLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("studentsRdCollegeLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("studentsRdHighLevel").addEventListener("input", onClickRadioButton);
    document.getElementById("studentsRdUniversityLevel").addEventListener("input", onClickRadioButton);
    // Adding event on confirm delete button
    document.getElementById("studentsBtConfirmDelete").addEventListener("click", onClickConfirmDeleteButton);
});
