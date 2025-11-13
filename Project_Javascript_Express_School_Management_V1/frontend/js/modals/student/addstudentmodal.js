/**
 * @name addstudentmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of student's adding modal
 */
import Utility from "../../utility.js";
import Http from '../../http.js';

export default {

    /**
     * @name OnClickAddButton
     * @description
     *      This function is the event of adding student button add 
     */
    async OnClickAddButton() {
        // Prepare body
        var levelName = null;
        var body = {}
        body.firstName = document.getElementById('addStudentTxtStudentFirstName').value;
        body.lastName = document.getElementById('addStudentTxtStudentLastName').value;
        body.birthday = document.getElementById('addStudentTxtStudentBirthday').value;
        // Check the level which user choses and find its id
        var levelId = null;
        if (document.getElementById('addStudentRdChoicePrimary').checked) {
            levelId = Utility.getLevelIdByName("PRIMARY");
            levelName = "Primaire";
        } else if (document.getElementById('addStudentRdChoiceCollege').checked) {
            levelId = Utility.getLevelIdByName("COLLEGE");
            levelName = "Collège"
        } else if (document.getElementById('addStudentRdChoiceHighSchool').checked) {
            levelId = Utility.getLevelIdByName("HIGH_SCHOOL");
            levelName = "Lycée";
        } else {
            levelId = Utility.getLevelIdByName("UNIVERSITY");
            levelName = "Université";
        }
        
        const response = await Http.createStudentOfLevel(levelId, body);
        
        if (response) {
            switch (response.status) {
                case 201:
                    Msg.success(`L'élève "${response.data.data.lastName} ${response.data.data.firstName}" a bien été créé avec succès`);
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Reset
                    document.getElementById('addStudentForm').reset();
                    this.verifyAddForm();
                    break;
                case 401:
                    if (response.data.key && (response.data.key === "STUDENT_AGE")) {
                        Msg.error("L'âge de l'élève doit être compris entre 5 et 60 ans, merci de recommencer !");
                    } else {
                        Msg.error("Formulaire de création d'une nouvel étudiant incorrect, merci de recommencer !");
                    }
                    break;
                case 409:
                    Msg.warning(`Le niveau "${levelName}" possède déjà l'élève "${body.lastName} ${body.firstName}"`);
                    document.getElementById('addStudentTxtStudentFirstName').classList.add('is-invalid');
                    document.getElementById('addStudentTxtStudentLastName').classList.add('is-invalid');
                    break;
                default:
                    Msg.error("Une erreur a été rencontrée merci de recommancer !");
                    // Reset
                    document.getElementById("addStudentForm").reset();
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
     *      This function permits to verify if a student form is correct
     */
    verifyAddForm() {
        var isCorrectFirstName = false;
        // Verify if a first name is correct
        var eltStudentFirstName = document.getElementById('addStudentTxtStudentFirstName');
        if (eltStudentFirstName.value.length >= 2) {
            // The correct student's first name is entried
            eltStudentFirstName.classList.remove('is-invalid');
            eltStudentFirstName.classList.add('is-valid');
            isCorrectFirstName = true;
        } else {
            eltStudentFirstName.classList.remove('is-valid');
            eltStudentFirstName.classList.add('is-invalid');
        }
        // Verify if a first name is correct
        var isCorrectLastName = false;
        var eltStudentLastName = document.getElementById('addStudentTxtStudentLastName');
        if (eltStudentLastName.value.length >= 2) {
            // The correct student's last name is entried
            eltStudentLastName.classList.remove('is-invalid');
            eltStudentLastName.classList.add('is-valid');
            isCorrectLastName = true;
        } else {
            eltStudentLastName.classList.remove('is-valid');
            eltStudentLastName.classList.add('is-invalid');
        }
        // Verify if a student birthday is correct
        var isCorrectBirthday = false;
        var eltStudentBirthday = document.getElementById('addStudentTxtStudentBirthday');
        var studentBirthday = Date.parse(eltStudentBirthday.value);
        if (isNaN(studentBirthday)) {
            // User doesn't entry a date
            isCorrectBirthday = false;
            eltStudentBirthday.classList.remove('is-valid');
            eltStudentBirthday.classList.add('is-invalid');
        } else {
            // Verify if student age is between 5 and 60 years
            var age = Utility.getAge(eltStudentBirthday.value);
            if (age < 5 || age > 60) {
                // User age is not correct
                isCorrectBirthday = false;
                eltStudentBirthday.classList.remove('is-valid');
                eltStudentBirthday.classList.add('is-invalid');
            } else {
                // User has greater than 3 years old
                isCorrectBirthday = true;
                eltStudentBirthday.classList.remove('is-invalid');
                eltStudentBirthday.classList.add('is-valid');
            }
        }
        // Verify if a level is selected
        var eltLevelPrimary = document.getElementById('addStudentRdChoicePrimary');
        var eltLevelCollege = document.getElementById('addStudentRdChoiceCollege');
        var eltLevelHighSchool = document.getElementById('addStudentRdChoiceHighSchool');
        var eltLevelUniversity = document.getElementById('addStudentRdChoiceUniversity');
        if (eltLevelPrimary.checked || eltLevelCollege.checked || eltLevelHighSchool.checked || eltLevelUniversity.checked) {
            // User choice a level
            if (isCorrectFirstName && isCorrectLastName && isCorrectBirthday) {
                document.getElementById("addStudentBtAdd").removeAttribute("disabled");
            } else {
                document.getElementById("addStudentBtAdd").setAttribute("disabled", true);
            }
        } else {
            document.getElementById("addStudentBtAdd").setAttribute("disabled", true);
        }
    }
};