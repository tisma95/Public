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
     *      This function is the event of modify button of modify classroom button
     */
    async onClickModifyButton() {
        // Prepare request body
        var body = {};
        body.name = document.getElementById('modifyClassroomTxtClassroomName').value;
        body.capacity = document.getElementById('modifyClassroomTxtClassroomCapacity').value;
        var levelId = Utility.getLevelIdByName(document.getElementById('modifyClassroomSelectLevel').value);
        var classroomId = document.getElementById('modifyClassroomSelectClassroom').value;
        const response = await Http.updateClassroomById(levelId, classroomId, body);
        if (response) {
            switch (response.status) {
                case 200:
                    // The classroom is updated successfully
                    Msg.success('Mise à jour de la classe effectuée avec succès');
                    // Close modal
                    document.getElementById("modifyClassroomBtClose").click();
                    break;
                case 401:
                    Msg.error("Formulaire de mise à jour d'une classe incorrect, merci de recommencer !");
                    break;
                case 409:
                    var levelName = Utility.getLevelNameByKey(document.getElementById('modifyClassroomSelectLevel').value);
                    var classroomName = Utility.getStringInCapitalize(document.getElementById('modifyClassroomTxtClassroomName').value);
                    Msg.warning(`Le niveau "${levelName}" possède déjà une classe "${classroomName}"`);
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
        document.getElementById('modifyClassroomDivSelectClassroom').style.display = 'none';
        document.getElementById('modifyClassroomFormModify').style.display = 'none';
        document.getElementById('modifyClassroomDivNoClassroom').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllClassroomsOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The classrooms of level have been found, we add it in classrooms select
                            var selectContent = "<option selected>Selectionner une matière...</option>";
                            var selectElt = document.createElement("select");
                            selectElt.classList.add("custom-select");
                            var levelClassrooms = [];
                            for (var classroom of response.data.data) {
                                selectContent += `<option value="${classroom.id}">${classroom.name}</option>`;
                                levelClassrooms.push(classroom);
                            }
                            // Add in local storage
                            localStorage.setItem(levelId + '_CLASSROOMS', JSON.stringify(levelClassrooms));
                            // Update the content of classroom select
                            document.getElementById("modifyClassroomSelectClassroom").innerHTML = selectContent;
                            // Hide nothing classroom div if is show
                            document.getElementById('modifyClassroomDivNoClassroom').style.display = 'none';
                            // Show classroom select
                            document.getElementById('modifyClassroomDivSelectClassroom').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not classrooms
                            document.getElementById('modifyClassroomDivNoClassroom').innerText = 'Aucune classe créée pour ce niveau !';
                            document.getElementById('modifyClassroomDivNoClassroom').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('modifyClassroomDivSelectClassroom').style.display = 'none';
            document.getElementById('modifyClassroomFormModify').style.display = 'none';
        }
    },

    /**
     * @name onSelectClassroom
     * @description
     *      This function permits to verify if user has selected a classroom 
     */
    async onSelectClassroom() {
        // Verify if user selection is a classroom not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('modifyClassroomSelectLevel').value);
        if (Utility.isLevelClassroom(levelId, this.value)) {
            document.getElementById('modifyClassroomFormModify').style.display = 'block';
            // Initialisation of form by the classroom features
            const response = await Http.getClassroomById(levelId, this.value);
            if (response && response.status === 200) {
                document.getElementById('modifyClassroomTxtClassroomName').value = response.data.data.name;
                document.getElementById('modifyClassroomTxtClassroomCapacity').value = response.data.data.capacity;
                // Add inputs elements in valid element 
                document.getElementById('modifyClassroomTxtClassroomName').classList.remove('is-invalid');
                document.getElementById('modifyClassroomTxtClassroomName').classList.add('is-valid');
                document.getElementById('modifyClassroomTxtClassroomCapacity').classList.remove('is-invalid');
                document.getElementById('modifyClassroomTxtClassroomCapacity').classList.add('is-valid');
            }
        } else {
            document.getElementById('modifyClassroomFormModify').style.display = 'none';
        }
    },

    /**
     * @name verifyModifyForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyModifyForm() {
        // Verify if a name is correct
        var isCorrectName = false;
        var eltClassroomName = document.getElementById('modifyClassroomTxtClassroomName');
        if (eltClassroomName.value.length >= 2) {
            // The correct classroom's name is entried
            isCorrectName = true;
            eltClassroomName.classList.remove('is-invalid');
            eltClassroomName.classList.add('is-valid');
        } else {
            isCorrectName = false;
            eltClassroomName.classList.remove('is-valid');
            eltClassroomName.classList.add('is-invalid');
            document.getElementById("modifyClassroomBtModify").setAttribute("disabled", true);
        }
         // Verify if a classroom capacity is correct
         var isCorrectCapacity = false;
         var eltClassroomCapacity = document.getElementById('modifyClassroomTxtClassroomCapacity');
         try {
             var classroomCapacity = parseInt(eltClassroomCapacity.value);
             // User entry a integer
             if ((classroomCapacity < 2) || (classroomCapacity > 100) || isNaN(classroomCapacity)) {
                 // User doesn't entry a correct number
                 isCorrectCapacity = false;
                 eltClassroomCapacity.classList.remove('is-valid');
                 eltClassroomCapacity.classList.add('is-invalid');
                 document.getElementById("modifyClassroomBtModify").setAttribute("disabled", true);
             } else {
                 // User entry is correct
                 isCorrectCapacity = true;
                 eltClassroomCapacity.classList.remove('is-invalid');
                 eltClassroomCapacity.classList.add('is-valid');
                 if (isCorrectName) {
                    document.getElementById("modifyClassroomBtModify").removeAttribute("disabled");
                 }
             }
         } catch {
            // User
            isCorrectCapacity = false;
            eltClassroomCapacity.classList.remove('is-valid');
            eltClassroomCapacity.classList.add('is-invalid');
            document.getElementById("modifyClassroomBtModify").setAttribute("disabled", true);
         }
    }
};