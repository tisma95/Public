/**
 * @name addclassroommodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of classroom's adding modal
 */
import Utility from "../../utility.js";
import Http from '../../http.js';

export default {

    /**
     * @name OnClickAddButton
     * @description
     *      This function is the event of adding classroom button add 
     */
    async OnClickAddButton() {
        // Prepare body
        var levelName = null;
        var body = {}
        body.name = document.getElementById('addClassroomTxtClassroomName').value;
        body.capacity = document.getElementById('addClassroomTxtClassroomCapacity').value;
        // Check the level which user choses and find its id
        var levelId = null;
        if (document.getElementById('addClassroomRdChoicePrimary').checked) {
            levelId = Utility.getLevelIdByName("PRIMARY");
            levelName = "Primaire";
        } else if (document.getElementById('addClassroomRdChoiceCollege').checked) {
            levelId = Utility.getLevelIdByName("COLLEGE");
            levelName = "Collège"
        } else if (document.getElementById('addClassroomRdChoiceHighSchool').checked) {
            levelId = Utility.getLevelIdByName("HIGH_SCHOOL");
            levelName = "Lycée";
        } else {
            levelId = Utility.getLevelIdByName("UNIVERSITY");
            levelName = "Université";
        }
        
        const response = await Http.createClassroomOfLevel(levelId, body);
        
        if (response) {
            switch (response.status) {
                case 201:
                    Msg.success(`La classe "${response.data.data.name}" a bien été créée avec succès`);
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Reset
                    document.getElementById('addClassroomForm').reset();
                    this.verifyAddForm();
                    break;
                case 401:
                    Msg.error("Formulaire de création d'une nouvelle classe incorrect, merci de recommencer !");
                    break;
                case 409:
                    Msg.warning(`Le niveau "${levelName}" possède déjà la classe "${body.name}"`);
                    document.getElementById('addClassroomTxtClassroomName').classList.add('is-invalid');
                    break;
                default:
                    Msg.error("Une erreur a été rencontrée merci de recommancer !");
                    // Reset
                    document.getElementById("addClassroomForm").reset();
                    this.verifyAddForm();
                    break;
            }
        } else {
            Msg.danger("Erreur sur le serveur, merci de recommencer !");
        }
    },

    /**
     * @name verifyAddForm
     * @description
     *      This function permits to verify if a classroom form is correct
     */
    verifyAddForm() {
        var isCorrectName = false;
        // Verify if a name is correct
        var eltClassroomName = document.getElementById('addClassroomTxtClassroomName');
        if (eltClassroomName.value.length >= 2) {
            // The correct classroom's name is entried
            eltClassroomName.classList.remove('is-invalid');
            eltClassroomName.classList.add('is-valid');
            isCorrectName = true;
        } else {
            eltClassroomName.classList.remove('is-valid');
            eltClassroomName.classList.add('is-invalid');
        }
        // Verify if a classroom capacity is correct
        var isCorrectCapacity = false;
        var eltClassroomCapacity = document.getElementById('addClassroomTxtClassroomCapacity');
        try {
            var classroomCapacity = parseInt(eltClassroomCapacity.value);
            // User entry a integer
            if ((classroomCapacity < 2) || (classroomCapacity > 100) || isNaN(classroomCapacity)) {
                // User doesn't entry a correct number
                isCorrectCapacity = false;
                eltClassroomCapacity.classList.remove('is-valid');
                eltClassroomCapacity.classList.add('is-invalid');
            } else {
                // User entry is correct
                isCorrectCapacity = true;
                eltClassroomCapacity.classList.remove('is-invalid');
                eltClassroomCapacity.classList.add('is-valid');
            }
        } catch {
            // User
            isCorrectCapacity = false;
            eltClassroomCapacity.classList.remove('is-valid');
            eltClassroomCapacity.classList.add('is-invalid');
        }
        // Verify if a level is selected
        var eltLevelPrimary = document.getElementById('addClassroomRdChoicePrimary');
        var eltLevelCollege = document.getElementById('addClassroomRdChoiceCollege');
        var eltLevelHighSchool = document.getElementById('addClassroomRdChoiceHighSchool');
        var eltLevelUniversity = document.getElementById('addClassroomRdChoiceUniversity');
        if (eltLevelPrimary.checked || eltLevelCollege.checked || eltLevelHighSchool.checked || eltLevelUniversity.checked) {
            // User choice a level
            if (isCorrectName && isCorrectCapacity) {
                document.getElementById("addClassroomBtAdd").removeAttribute("disabled");
            } else {
                document.getElementById("addClassroomBtAdd").setAttribute("disabled", true);
            }
        } else {
            document.getElementById("addClassroomBtAdd").setAttribute("disabled", true);
        }
    }
};