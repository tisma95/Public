/**
 * @name addsubjectmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of subject's adding modal
 */
import Utility from "../../utility.js";
import Http from '../../http.js';

export default {

    /**
     * @name OnClickAddButton
     * @description
     *      This function is the event of adding subject button add 
     */
    async OnClickAddButton() {
        // Prepare body
        var levelName = null;
        var body = {}
        body.name = document.getElementById("addSubjectTxtSubjectName").value;
        // Check the level which user choses and find its id
        var levelId = null;
        if (document.getElementById('addSubjectRdChoicePrimary').checked) {
            levelId = Utility.getLevelIdByName("PRIMARY");
            levelName = "Primaire";
        } else if (document.getElementById('addSubjectRdChoiceCollege').checked) {
            levelId = Utility.getLevelIdByName("COLLEGE");
            levelName = "Collège"
        } else if (document.getElementById('addSubjectRdChoiceHighSchool').checked) {
            levelId = Utility.getLevelIdByName("HIGH_SCHOOL");
            levelName = "Lycée";
        } else {
            levelId = Utility.getLevelIdByName("UNIVERSITY");
            levelName = "Université";
        }
        
        const response = await Http.createSubjectOfLevel(levelId, body);
        
        if (response) {
            switch (response.status) {
                case 201:
                    Msg.success(`La matière "${response.data.data.name}" a bien été créée avec succès`);
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Reset
                    document.getElementById("addSubjectForm").reset();
                    this.verifyAddForm();
                    break;
                case 401:
                    Msg.error("Formulaire de création d'une nouvelle matière incorrect, merci de recommencer !");
                    break;
                case 409:
                    Msg.warning(`Le niveau "${levelName}" possède déjà la matière "${body.name}"`);
                    document.getElementById('addSubjectTxtSubjectName').classList.add('is-invalid');
                    break;
                default:
                    Msg.error("Une erreur a été rencontrée merci de recommancer !");
                    // Reset
                    document.getElementById("addSubjectForm").reset();
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
     *      This function permits to verify if a form is correct
     */
    verifyAddForm() {
        var isCorrectName = false;
        // Verify if a name is correct
        var eltSubjectName = document.getElementById('addSubjectTxtSubjectName');
        if (eltSubjectName.value.length >= 2) {
            // The correct subject's name is entried
            eltSubjectName.classList.remove('is-invalid');
            eltSubjectName.classList.add('is-valid');
            isCorrectName = true;
        } else {
            eltSubjectName.classList.remove('is-valid');
            eltSubjectName.classList.add('is-invalid');
        }
        // Verify if a level is selected
        var eltLevelPrimary = document.getElementById('addSubjectRdChoicePrimary');
        var eltLevelCollege = document.getElementById('addSubjectRdChoiceCollege');
        var eltLevelHighSchool = document.getElementById('addSubjectRdChoiceHighSchool');
        var eltLevelUniversity = document.getElementById('addSubjectRdChoiceUniversity');
        if (eltLevelPrimary.checked || eltLevelCollege.checked || eltLevelHighSchool.checked || eltLevelUniversity.checked) {
            // User choice a level
            if (isCorrectName) {
                document.getElementById("addSubjectBtAdd").removeAttribute("disabled");
            } else {
                document.getElementById("addSubjectBtAdd").setAttribute("disabled", true);
            }
        } else {
            document.getElementById("addSubjectBtAdd").setAttribute("disabled", true);
        }
    }
};