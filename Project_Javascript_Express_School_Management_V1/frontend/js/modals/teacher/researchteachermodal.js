/**
 * @name researchteachermodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of teacher's researching modal
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
        const lastName = document.getElementById('researchTeacherTxtTeacherLastName').value.toUpperCase() || null;
        const firstName = Utility.getStringInCapitalize(document.getElementById('researchTeacherTxtTeacherFirstName').value) || null;
        const birthday = document.getElementById('researchTeacherTxtTeacherBirthday').value || null;
        const levels = JSON.parse(localStorage.getItem('levels'));
        // Fetch all teachers of each levels
        var tableContent = "";
        var numberOfTeacher = 0;
        var teachersResults = [];
        for (var level of levels) {
            const response = await Http.getAllTeachersOfLevel(level.id);
            if (response.status === 200) {
                response.data.data.forEach(teacher => {
                    teachersResults.push(teacher);
                });
            }
        }
        // Now we filter the result and take the teacher which match
        if (lastName) {
            teachersResults= teachersResults.filter(teacher => teacher.lastName === lastName);
        }

        if (firstName) {
            teachersResults = teachersResults.filter(teacher => teacher.firstName === firstName);
        }

        if (birthday) {
            teachersResults = teachersResults.filter(teacher => teacher.birthday === birthday);
        }

        if (teachersResults.length === 0) {
            // The teacher is not found we must display not found item
            document.getElementById("researchTeacherDivNothing").innerHTML = 'Aucun enseignant trouvé avec ces critères de recherche!';
            // Show the table and hide the div of not found item
            document.getElementById("researchTeacherDivNothing").style.display = 'block';
            document.getElementById("researchTeacherTableResult").style.display = 'none';
        } else {
            // Add the result
            for (var teacher of teachersResults) {
                numberOfTeacher += 1;
                tableContent += `<tr><td scope="row">${numberOfTeacher}</td><td>${teacher.lastName}</td><td>${teacher.firstName}</td><td>${new Date(teacher.birthday).toLocaleDateString()}</td><td>${Utility.getLevelNameById(teacher.level)}</td></tr>`;
            }
            // The teachers are found we will show the list in table
            document.getElementById("researchTeacherTableBodyResult").innerHTML = tableContent;
            // Show the table and hide the div of not found item
            document.getElementById("researchTeacherTableResult").style.display = 'block';
            document.getElementById("researchTeacherDivNothing").style.display = 'none';
        }
    },

    /**
     * @name verifyResearchForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyResearchForm() {
        document.getElementById("researchTeacherDivNothing").style.display = 'none';
        document.getElementById("researchTeacherTableResult").style.display = 'none';
        var lastName = document.getElementById('researchTeacherTxtTeacherLastName').value;
        var firstName = document.getElementById('researchTeacherTxtTeacherFirstName').value;
        var birthday = document.getElementById('researchTeacherTxtTeacherBirthday').value;
        if (lastName || firstName || birthday) {
            // The form is correct
            document.getElementById("researchTeacherBtResearch").removeAttribute("disabled");
        } else {
            document.getElementById("researchTeacherBtResearch").setAttribute("disabled", true);
        }
    }
};