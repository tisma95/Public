/**
 * @name researchsubjectmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of subject's researching modal
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
        const subjectName = Utility.getStringInCapitalize(document.getElementById("researchSubjectTxtSubjectName").value);
        const levels = JSON.parse(localStorage.getItem('levels'));
        // Fetch all subjects of each levels
        var tableContent = "";
        var numberOfSubject = 0;
        for (var level of levels) {
            const response = await Http.getAllSubjectOfLevel(level.id);
            if (response.status === 200) {
                response.data.data.forEach(subject => {
                    if (subject.name === subjectName) {
                        numberOfSubject += 1;
                        tableContent += `<tr><td scope="row">${numberOfSubject}</td><td>${subjectName}</td><td>${Utility.getLevelNameByKey(level.name)}</td></tr>`;
                    } 
                });
            }
        }
        // Add the result
        if (numberOfSubject === 0) {
            // The subject is not found we must display not found item
            document.getElementById("researchSubjectDivNothing").innerHTML = 'Aucune matière "' + subjectName + '" trouvée !';
            // Show the table and hide the div of not found item
            document.getElementById("researchSubjectDivNothing").style.display = 'block';
            document.getElementById("researchSubjectTableResult").style.display = 'none';
        } else {
            // The level subjects are been found
            // The subject is found we will show the list in table
            document.getElementById("researchSubjectTableBodyResult").innerHTML = tableContent;
            // Show the table and hide the div of not found item
            document.getElementById("researchSubjectTableResult").style.display = 'block';
            document.getElementById("researchSubjectDivNothing").style.display = 'none';
        }
    },

    /**
     * @name onChangeTxtSubjectName
     * @description
     *      This function contains the event of input of subject name
     */
    onChangeTxtSubjectName() {
        document.getElementById("researchSubjectDivNothing").style.display = 'none';
        document.getElementById("researchSubjectTableResult").style.display = 'none';
    },

    /**
     * @name verifyResearchForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyResearchForm() {
        document.getElementById("researchSubjectDivNothing").style.display = 'none';
        document.getElementById("researchSubjectTableResult").style.display = 'none';
        var eltSubjectName = document.getElementById('researchSubjectTxtSubjectName');
        if (eltSubjectName.value.length >= 2) {
            // The correct subject's name is entried
            eltSubjectName.classList.remove('is-invalid');
            eltSubjectName.classList.add('is-valid');
            document.getElementById("researchSubjectBtResearch").removeAttribute("disabled");
        } else {
            eltSubjectName.classList.remove('is-valid');
            eltSubjectName.classList.add('is-invalid');
            document.getElementById("researchSubjectBtResearch").setAttribute("disabled", true);
        }
    }
};