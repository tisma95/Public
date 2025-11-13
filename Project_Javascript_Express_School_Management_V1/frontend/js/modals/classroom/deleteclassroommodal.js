/**
 * @name deleteclassroommodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of classroom's deleting modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickDeleteButton
     * @description
     *      This function is the event of delete button of delete classroom modal
     */
    async onClickDeleteButton() {
        var levelId = Utility.getLevelIdByName(document.getElementById('deleteClassroomSelectLevel').value);
        var classroomId = document.getElementById('deleteClassroomSelectClassroom').value;
        const response = await Http.deleteClassroomById(levelId, classroomId);
        if (response) {
            switch (response.status) {
                case 200:
                    // The classroom are deleted successfully
                    Msg.success('Suppression de la classe effectuée avec succès');
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Close modal
                    document.getElementById("deleteClassroomBtClose").click();
                    break;
                default:
                    Msg.error('Une erreur a été reencontrée lors de la suppression !');
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
        document.getElementById('deleteClassroomDivSelectClassroom').style.display = 'none';
        document.getElementById('deleteClassroomDivNoClassroom').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllClassroomsOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The classrooms of level have been found, we add it in classrooms select
                            var selectContent = "<option selected>Selectionner une classe...</option>";
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
                            document.getElementById("deleteClassroomSelectClassroom").innerHTML = selectContent;
                            // Hide nothind classroom div if is show
                            document.getElementById('deleteClassroomDivNoClassroom').style.display = 'none';
                            // Show classroom select
                            document.getElementById('deleteClassroomDivSelectClassroom').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not classrooms
                            document.getElementById('deleteClassroomDivNoClassroom').innerText = 'Aucune classe créer pour ce niveau !';
                            document.getElementById('deleteClassroomDivNoClassroom').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('deleteClassroomDivSelectClassroom').style.display = 'none';
        }
    },

    /**
     * @name onSelectClassroom
     * @description
     *      This function permits to verify if user has selected a classroom 
     */
    onSelectClassroom() {
        // Verify if user selection is a classroom not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('deleteClassroomSelectLevel').value);
        if (Utility.isLevelClassroom(levelId, this.value)) {
            document.getElementById("deleteClassroomBtDelete").removeAttribute("disabled");
        } else {
            document.getElementById("deleteClassroomBtDelete").setAttribute("disabled", true);
        }
    },
};