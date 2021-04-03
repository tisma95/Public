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
     *      This function is the event of modify button of modify teacher button
     */
    async onClickModifyButton() {
        // Prepare request body
        var body = {};
        body.firstName = document.getElementById('modifyTeacherTxtTeacherFirstName').value;
        body.lastName = document.getElementById('modifyTeacherTxtTeacherLastName').value;
        body.birthday = document.getElementById('modifyTeacherTxtTeacherBirthday').value;
        var levelId = Utility.getLevelIdByName(document.getElementById('modifyTeacherSelectLevel').value);
        var teacherId = document.getElementById('modifyTeacherSelectTeacher').value;
        const response = await Http.updateTeacherById(levelId, teacherId, body);
        if (response) {
            switch (response.status) {
                case 200:
                    // The teacher is updated successfully
                    Msg.success("Mise à jour de l'enseignant effectuée avec succès");
                    // Close modal
                    document.getElementById("modifyTeacherBtClose").click();
                    break;
                case 401:
                    if (response.data.key && (response.data.key === "TEACHER_AGE")) {
                        Msg.error("L'âge de l'enseignant doit être compris entre 18 et 90 ans, merci de recommencer !");
                    } else {
                        Msg.error("Formulaire de création d'une nouvel étudiant incorrect, merci de recommencer !");
                    }
                    break;
                case 409:
                    var levelName = Utility.getLevelNameByKey(document.getElementById('modifyTeacherSelectLevel').value);
                    var teacherFeature = `${body.lastName} ${body.firstName} (${new Date(body.birthday).toLocaleDateString()})`;
                    Msg.warning(`Le niveau "${levelName}" possède déjà un étudiant ${teacherFeature}`);
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
        document.getElementById('modifyTeacherDivSelectTeacher').style.display = 'none';
        document.getElementById('modifyTeacherDivTeacherForm').style.display = 'none';
        document.getElementById('modifyTeacherDivNoTeacher').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllTeachersOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The teachers of level have been found, we add it in teacher select
                            var selectContent = "<option selected>Selectionner un enseignant...</option>";
                            var selectElt = document.createElement("select");
                            selectElt.classList.add("custom-select");
                            var levelTeachers = [];
                            for (var teacher of response.data.data) {
                                selectContent += `<option value="${teacher.id}">${teacher.lastName} ${teacher.firstName} (${new Date(teacher.birthday).toLocaleDateString()})</option>`;
                                levelTeachers.push(teacher);
                            }
                            // Add in local storage
                            localStorage.setItem(levelId + '_TEACHERS', JSON.stringify(levelTeachers));
                            // Update the content of teacher select
                            document.getElementById("modifyTeacherSelectTeacher").innerHTML = selectContent;
                            // Hide nothing teacher div if is show
                            document.getElementById('modifyTeacherDivNoTeacher').style.display = 'none';
                            // Show teacher select
                            document.getElementById('modifyTeacherDivSelectTeacher').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not teachers
                            document.getElementById('modifyTeacherDivNoTeacher').innerText = 'Aucun enseignant créé pour ce niveau !';
                            document.getElementById('modifyTeacherDivNoTeacher').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('modifyTeacherDivSelectTeacher').style.display = 'none';
            document.getElementById('modifyTeacherDivTeacherForm').style.display = 'none';
        }
    },

    /**
     * @name onSelectTeacher
     * @description
     *      This function permits to verify if user has selected a teacher 
     */
    async onSelectTeacher() {
        // Verify if user selection is a classroom not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('modifyTeacherSelectLevel').value);
        if (Utility.isLevelTeacher(levelId, this.value)) {
            document.getElementById('modifyTeacherDivTeacherForm').style.display = 'block';
            // Initialisation of form by the teacher features
            const response = await Http.getTeacherById(levelId, this.value);
            if (response && response.status === 200) {
                document.getElementById('modifyTeacherTxtTeacherFirstName').value = response.data.data.firstName;
                document.getElementById('modifyTeacherTxtTeacherLastName').value = response.data.data.lastName;
                document.getElementById('modifyTeacherTxtTeacherBirthday').value = response.data.data.birthday;
            }
        } else {
            document.getElementById('modifyTeacherDivTeacherForm').style.display = 'none';
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
        var eltTeacherFirstName = document.getElementById('modifyTeacherTxtTeacherFirstName');
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
        var eltTeacherLastName = document.getElementById('modifyTeacherTxtTeacherLastName');
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
        var eltTeacherBirthday = document.getElementById('modifyTeacherTxtTeacherBirthday');
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
                // User has lower than 5 years old
                isCorrectBirthday = false;
                eltTeacherBirthday.classList.remove('is-valid');
                eltTeacherBirthday.classList.add('is-invalid');
            } else {
                // User has greater than 3 years old
                isCorrectBirthday = true;
                eltTeacherBirthday.classList.remove('is-invalid');
                eltTeacherBirthday.classList.add('is-valid');
            }
        }
        if (isCorrectFirstName && isCorrectLastName && isCorrectBirthday) {
            document.getElementById("modifyTeacherBtModify").removeAttribute("disabled");
        } else {
            document.getElementById("modifyTeacherBtModify").setAttribute("disabled", true);
        }
    }
};