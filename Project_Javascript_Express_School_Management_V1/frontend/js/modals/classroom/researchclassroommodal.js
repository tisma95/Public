/**
 * @name researchclassroommodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of classroom's researching modal
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
        const classroomName = Utility.getStringInCapitalize(document.getElementById("researchClassroomTxtClassroomName").value);
        const levels = JSON.parse(localStorage.getItem('levels'));
        // Fetch all classrooms of each levels
        var tableContent = "";
        var numberOfClassroom = 0;
        for (var level of levels) {
            const response = await Http.getAllClassroomsOfLevel(level.id);
            if (response.status === 200) {
                response.data.data.forEach(classroom => {
                    if (classroom.name === classroomName) {
                        numberOfClassroom += 1;
                        tableContent += `<tr><td scope="row">${numberOfClassroom}</td><td>${classroomName}</td><td>${classroom.capacity}</td><td>${Utility.getLevelNameByKey(level.name)}</td></tr>`;
                    } 
                });
            }
        }
        // Add the result
        if (numberOfClassroom === 0) {
            // The classroom is not found we must display not found item
            document.getElementById("researchClassroomDivNothing").innerHTML = 'Aucune classe "' + classroomName + '" trouvée !';
            // Show the table and hide the div of not found item
            document.getElementById("researchClassroomDivNothing").style.display = 'block';
            document.getElementById("researchClassroomTableResult").style.display = 'none';
        } else {
            // The level classrooms are been found
            // The classroom is found we will show the list in table
            document.getElementById("researchClassroomTableBodyResult").innerHTML = tableContent;
            // Show the table and hide the div of not found item
            document.getElementById("researchClassroomTableResult").style.display = 'block';
            document.getElementById("researchClassroomDivNothing").style.display = 'none';
        }
    },

    /**
     * @name onChangeTxtClassroomName
     * @description
     *      This function contains the event of input of classroom name
     */
    onChangeTxtClassroomName() {
        document.getElementById("researchClassroomDivNothing").style.display = 'none';
        document.getElementById("researchClassroomTableResult").style.display = 'none';
    },

    /**
     * @name verifyResearchForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyResearchForm() {
        document.getElementById("researchClassroomDivNothing").style.display = 'none';
        document.getElementById("researchClassroomTableResult").style.display = 'none';
        var eltClassroomName = document.getElementById('researchClassroomTxtClassroomName');
        if (eltClassroomName.value.length >= 2) {
            // The correct classroom's name is entried
            eltClassroomName.classList.remove('is-invalid');
            eltClassroomName.classList.add('is-valid');
            document.getElementById("researchClassroomBtResearch").removeAttribute("disabled");
        } else {
            eltClassroomName.classList.remove('is-valid');
            eltClassroomName.classList.add('is-invalid');
            document.getElementById("researchClassroomBtResearch").setAttribute("disabled", true);
        }
    }
};