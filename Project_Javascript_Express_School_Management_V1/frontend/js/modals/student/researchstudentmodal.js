/**
 * @name researchstudentmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of student's researching modal
 */
import Utility from "../../utility.js";
import Http from '../../http.js';

export default {
    /**
     * @name onClickResearchButton
     * @description
     *      This function is the event of research button
     */
    async onClickResearchButton() {
        const lastName = document.getElementById('researchStudentTxtStudentLastName').value.toUpperCase() || null;
        const firstName = Utility.getStringInCapitalize(document.getElementById('researchStudentTxtStudentFirstName').value) || null;
        const birthday = document.getElementById('researchStudentTxtStudentBirthday').value || null;
        const levels = JSON.parse(localStorage.getItem('levels'));
        // Fetch all students of each levels
        var tableContent = "";
        var numberOfStudent = 0;
        var studentsResults = [];
        for (var level of levels) {
            const response = await Http.getAllStudentsOfLevel(level.id);
            if (response.status === 200) {
                response.data.data.forEach(student => {
                    studentsResults.push(student);
                });
            }
        }
        // Now we filter the result and take the student which match
        if (lastName) {
            studentsResults= studentsResults.filter(student => student.lastName === lastName);
        }

        if (firstName) {
            studentsResults = studentsResults.filter(student => student.firstName === firstName);
        }

        if (birthday) {
            studentsResults = studentsResults.filter(student => student.birthday === birthday);
        }

        if (studentsResults.length === 0) {
            // The student is not found we must display not found item
            document.getElementById("researchStudentDivNothing").innerHTML = 'Aucun étudiant trouvé avec ces critères de recherche!';
            // Show the table and hide the div of not found item
            document.getElementById("researchStudentDivNothing").style.display = 'block';
            document.getElementById("researchStudentTableResult").style.display = 'none';
        } else {
            // Add the result
            for (var student of studentsResults) {
                numberOfStudent += 1;
                tableContent += `<tr><td scope="row">${numberOfStudent}</td><td>${student.lastName}</td><td>${student.firstName}</td><td>${new Date(student.birthday).toLocaleDateString()}</td><td>${Utility.getLevelNameById(student.level)}</td></tr>`;
            }
            // The students are found we will show the list in table
            document.getElementById("researchStudentTableBodyResult").innerHTML = tableContent;
            // Show the table and hide the div of not found item
            document.getElementById("researchStudentTableResult").style.display = 'block';
            document.getElementById("researchStudentDivNothing").style.display = 'none';
        }
    },

    /**
     * @name verifyResearchForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyResearchForm() {
        document.getElementById("researchStudentDivNothing").style.display = 'none';
        document.getElementById("researchStudentTableResult").style.display = 'none';
        var lastName = document.getElementById('researchStudentTxtStudentLastName').value;
        var firstName = document.getElementById('researchStudentTxtStudentFirstName').value;
        var birthday = document.getElementById('researchStudentTxtStudentBirthday').value;
        if (lastName || firstName || birthday) {
            // The form is correct
            document.getElementById("researchStudentBtResearch").removeAttribute("disabled");
        } else {
            document.getElementById("researchStudentBtResearch").setAttribute("disabled", true);
        }
    }
};