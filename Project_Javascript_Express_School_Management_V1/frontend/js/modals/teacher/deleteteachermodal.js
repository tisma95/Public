/**
 * @name deleteteachermodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of teacher's deleting modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickDeleteButton
     * @description
     *      This function is the event of delete button of delete teacher modal
     */
    async onClickDeleteButton() {
        var levelId = Utility.getLevelIdByName(document.getElementById('deleteTeacherSelectLevel').value);
        var teacherId = document.getElementById('deleteTeacherSelectTeacher').value;
        const response = await Http.deleteTeacherById(levelId, teacherId);
        if (response) {
            switch (response.status) {
                case 200:
                    // The teacher is deleted successfully
                    Msg.success("Suppression de l'enseignant effectuée avec succès");
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Close modal
                    document.getElementById("deleteTeacherBtClose").click();
                    break;
                default:
                    Msg.error('Une erreur a été rencontrée lors de la suppression !');
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
        document.getElementById('deleteTeacherDivSelectTeacher').style.display = 'none';
        document.getElementById('deleteTeacherDivNoTeacher').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllTeachersOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The teachers of level have been found, we add it in teachers select
                            var selectContent = "<option selected>Selectionner une enseignant...</option>";
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
                            document.getElementById("deleteTeacherSelectTeacher").innerHTML = selectContent;
                            // Hide nothind teacher div if is show
                            document.getElementById('deleteTeacherDivNoTeacher').style.display = 'none';
                            // Show teacher select
                            document.getElementById('deleteTeacherDivSelectTeacher').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not teachers
                            document.getElementById('deleteTeacherDivNoTeacher').innerText = 'Aucun enseignant créer pour ce niveau !';
                            document.getElementById('deleteTeacherDivNoTeacher').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('deleteTeacherDivSelectTeacher').style.display = 'none';
        }
    },

    /**
     * @name onSelectTeacher
     * @description
     *      This function permits to verify if user has selected a teacher 
     */
    onSelectTeacher() {
        // Verify if user selection is a teacher not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('deleteTeacherSelectLevel').value);
        if (Utility.isLevelTeacher(levelId, this.value)) {
            document.getElementById("deleteTeacherBtDelete").removeAttribute("disabled");
        } else {
            document.getElementById("deleteTeacherBtDelete").setAttribute("disabled", true);
        }
    },
};