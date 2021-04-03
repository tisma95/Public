/**
 * @name addteachermodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of teacher's adding modal
 */
import Utility from "../../utility.js";
import Http from '../../http.js';

export default {

    /**
     * @name OnClickAddButton
     * @description
     *      This function is the event of adding teacher button add 
     */
    async OnClickAddButton() {
        // Prepare body
        var levelName = null;
        var body = {}
        body.firstName = document.getElementById('addTeacherTxtTeacherFirstName').value;
        body.lastName = document.getElementById('addTeacherTxtTeacherLastName').value;
        body.birthday = document.getElementById('addTeacherTxtTeacherBirthday').value;
        // Check the level which user choses and find its id
        var levelId = null;
        if (document.getElementById('addTeacherRdChoicePrimary').checked) {
            levelId = Utility.getLevelIdByName("PRIMARY");
            levelName = "Primaire";
        } else if (document.getElementById('addTeacherRdChoiceCollege').checked) {
            levelId = Utility.getLevelIdByName("COLLEGE");
            levelName = "Collège"
        } else if (document.getElementById('addTeacherRdChoiceHighSchool').checked) {
            levelId = Utility.getLevelIdByName("HIGH_SCHOOL");
            levelName = "Lycée";
        } else {
            levelId = Utility.getLevelIdByName("UNIVERSITY");
            levelName = "Université";
        }
        
        const response = await Http.createTeacherOfLevel(levelId, body);
        
        if (response) {
            switch (response.status) {
                case 201:
                    Msg.success(`L'enseignant "${response.data.data.lastName} ${response.data.data.firstName}" a bien été créé avec succès`);
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Reset
                    document.getElementById('addTeacherForm').reset();
                    this.verifyAddForm();
                    break;
                case 401:
                    if (response.data.key && (response.data.key === "TEACHER_AGE")) {
                        Msg.error("L'âge de l'enseignant doit être compris entre 18 et 90 ans, merci de recommencer !");
                    } else {
                        Msg.error("Formulaire de création d'une nouvel étudiant incorrect, merci de recommencer !");
                    }
                    break;
                case 409:
                    Msg.warning(`Le niveau "${levelName}" possède déjà l'enseignant "${body.lastName} ${body.firstName}"`);
                    document.getElementById('addTeacherTxtTeacherFirstName').classList.add('is-invalid');
                    document.getElementById('addTeacherTxtTeacherLastName').classList.add('is-invalid');
                    break;
                default:
                    Msg.error("Une erreur a été rencontrée merci de recommancer !");
                    // Reset
                    document.getElementById("addTeacherForm").reset();
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
     *      This function permits to verify if a teacher form is correct
     */
    verifyAddForm() {
        var isCorrectFirstName = false;
        // Verify if a first name is correct
        var eltTeacherFirstName = document.getElementById('addTeacherTxtTeacherFirstName');
        if (eltTeacherFirstName.value.length >= 2) {
            // The correct teacher's first name is entried
            eltTeacherFirstName.classList.remove('is-invalid');
            eltTeacherFirstName.classList.add('is-valid');
            isCorrectFirstName = true;
        } else {
            eltTeacherFirstName.classList.remove('is-valid');
            eltTeacherFirstName.classList.add('is-invalid');
        }
        // Verify if a first name is correct
        var isCorrectLastName = false;
        var eltTeacherLastName = document.getElementById('addTeacherTxtTeacherLastName');
        if (eltTeacherLastName.value.length >= 2) {
            // The correct teacher's last name is entried
            eltTeacherLastName.classList.remove('is-invalid');
            eltTeacherLastName.classList.add('is-valid');
            isCorrectLastName = true;
        } else {
            eltTeacherLastName.classList.remove('is-valid');
            eltTeacherLastName.classList.add('is-invalid');
        }
        // Verify if a teacher birthday is correct
        var isCorrectBirthday = false;
        var eltTeacherBirthday = document.getElementById('addTeacherTxtTeacherBirthday');
        var teacherBirthday = Date.parse(eltTeacherBirthday.value);
        if (isNaN(teacherBirthday)) {
            // User doesn't entry a date
            isCorrectBirthday = false;
            eltTeacherBirthday.classList.remove('is-valid');
            eltTeacherBirthday.classList.add('is-invalid');
        } else {
            // Verify if teacher age is greater than 18 years and less than 90
            var age = Utility.getAge(eltTeacherBirthday.value);
            if (age < 18 || age > 90) {
                // User has lower than 18 years old
                isCorrectBirthday = false;
                eltTeacherBirthday.classList.remove('is-valid');
                eltTeacherBirthday.classList.add('is-invalid');
            } else {
                // User has greater than 18 years old
                isCorrectBirthday = true;
                eltTeacherBirthday.classList.remove('is-invalid');
                eltTeacherBirthday.classList.add('is-valid');
            }
        }
        // Verify if a level is selected
        var eltLevelPrimary = document.getElementById('addTeacherRdChoicePrimary');
        var eltLevelCollege = document.getElementById('addTeacherRdChoiceCollege');
        var eltLevelHighSchool = document.getElementById('addTeacherRdChoiceHighSchool');
        var eltLevelUniversity = document.getElementById('addTeacherRdChoiceUniversity');
        if (eltLevelPrimary.checked || eltLevelCollege.checked || eltLevelHighSchool.checked || eltLevelUniversity.checked) {
            // User choice a level
            if (isCorrectFirstName && isCorrectLastName && isCorrectBirthday) {
                document.getElementById("addTeacherBtAdd").removeAttribute("disabled");
            } else {
                document.getElementById("addTeacherBtAdd").setAttribute("disabled", true);
            }
        } else {
            document.getElementById("addTeacherBtAdd").setAttribute("disabled", true);
        }
    }
};