/**
 * @name modifyclassroommodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of classroom's modifying modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickModifyButton
     * @description
     *      This function is the event of modify button of modify student button
     */
    async onClickModifyButton() {
        // Prepare request body
        var body = {};
        body.firstName = document.getElementById('modifyStudentTxtStudentFirstName').value;
        body.lastName = document.getElementById('modifyStudentTxtStudentLastName').value;
        body.birthday = document.getElementById('modifyStudentTxtStudentBirthday').value;
        var levelId = Utility.getLevelIdByName(document.getElementById('modifyStudentSelectLevel').value);
        var studentId = document.getElementById('modifyStudentSelectStudent').value;
        const response = await Http.updateStudentById(levelId, studentId, body);
        if (response) {
            switch (response.status) {
                case 200:
                    // The student is updated successfully
                    Msg.success("Mise à jour de l'élève effectuée avec succès");
                    // Close modal
                    document.getElementById("modifyStudentBtClose").click();
                    break;
                case 401:
                    if (response.data.key && (response.data.key === "STUDENT_AGE")) {
                        Msg.error("L'âge de l'élève doit être compris entre 5 et 60 ans, merci de recommencer !");
                    } else {
                        Msg.error("Formulaire de création d'une nouvel étudiant incorrect, merci de recommencer !");
                    }
                    break;
                case 409:
                    var levelName = Utility.getLevelNameByKey(document.getElementById('modifyStudentSelectLevel').value);
                    var studentFeature = `${body.lastName} ${body.firstName} (${new Date(body.birthday).toLocaleDateString()})`;
                    Msg.warning(`Le niveau "${levelName}" possède déjà un étudiant ${studentFeature}`);
                    break;
                default:
                    Msg.error('Une erreur a été rencontrée lors de la mise à jour !');
                    break;
            }
        } else {
            Msg.danger('Erreur sur le serveur, merci de recommencer !');
        }
    },

    /**
     * @name onSelectLevel
     * @description
     *  This function permits to verify the level which user has selected
     */
    async onSelectLevel() {
        // Hide result elements
        document.getElementById('modifyStudentDivSelectStudent').style.display = 'none';
        document.getElementById('modifyStudentDivStudentForm').style.display = 'none';
        document.getElementById('modifyStudentDivNoStudent').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllStudentsOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The students of level have been found, we add it in student select
                            var selectContent = "<option selected>Selectionner un élève...</option>";
                            var selectElt = document.createElement("select");
                            selectElt.classList.add("custom-select");
                            var levelStudents = [];
                            for (var student of response.data.data) {
                                selectContent += `<option value="${student.id}">${student.lastName} ${student.firstName} (${new Date(student.birthday).toLocaleDateString()})</option>`;
                                levelStudents.push(student);
                            }
                            // Add in local storage
                            localStorage.setItem(levelId + '_STUDENTS', JSON.stringify(levelStudents));
                            // Update the content of student select
                            document.getElementById("modifyStudentSelectStudent").innerHTML = selectContent;
                            // Hide nothing student div if is show
                            document.getElementById('modifyStudentDivNoStudent').style.display = 'none';
                            // Show student select
                            document.getElementById('modifyStudentDivSelectStudent').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not students
                            document.getElementById('modifyStudentDivNoStudent').innerText = 'Aucun élève créé pour ce niveau !';
                            document.getElementById('modifyStudentDivNoStudent').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('modifyStudentDivSelectStudent').style.display = 'none';
            document.getElementById('modifyStudentDivStudentForm').style.display = 'none';
        }
    },

    /**
     * @name onSelectStudent
     * @description
     *      This function permits to verify if user has selected a student 
     */
    async onSelectStudent() {
        // Verify if user selection is a classroom not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('modifyStudentSelectLevel').value);
        if (Utility.isLevelStudent(levelId, this.value)) {
            document.getElementById('modifyStudentDivStudentForm').style.display = 'block';
            // Initialisation of form by the student features
            const response = await Http.getStudentById(levelId, this.value);
            if (response && response.status === 200) {
                document.getElementById('modifyStudentTxtStudentFirstName').value = response.data.data.firstName;
                document.getElementById('modifyStudentTxtStudentLastName').value = response.data.data.lastName;
                document.getElementById('modifyStudentTxtStudentBirthday').value = response.data.data.birthday;
            }
        } else {
            document.getElementById('modifyStudentDivStudentForm').style.display = 'none';
        }
    },

    /**
     * @name verifyModifyForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyModifyForm() {
        var isCorrectFirstName = false;
        // Verify if a first name is correct
        var eltStudentFirstName = document.getElementById('modifyStudentTxtStudentFirstName');
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
        var eltStudentLastName = document.getElementById('modifyStudentTxtStudentLastName');
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
        var eltStudentBirthday = document.getElementById('modifyStudentTxtStudentBirthday');
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
                // User has lower than 5 years old
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
        if (isCorrectFirstName && isCorrectLastName && isCorrectBirthday) {
            document.getElementById("modifyStudentBtModify").removeAttribute("disabled");
        } else {
            document.getElementById("modifyStudentBtModify").setAttribute("disabled", true);
        }
    }
};