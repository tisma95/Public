/**
 * @name deletestudentmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of student's deleting modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickDeleteButton
     * @description
     *      This function is the event of delete button of delete student modal
     */
    async onClickDeleteButton() {
        var levelId = Utility.getLevelIdByName(document.getElementById('deleteStudentSelectLevel').value);
        var studentId = document.getElementById('deleteStudentSelectStudent').value;
        const response = await Http.deleteStudentById(levelId, studentId);
        if (response) {
            switch (response.status) {
                case 200:
                    // The student is deleted successfully
                    Msg.success("Suppression de l'élève effectuée avec succès");
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Close modal
                    document.getElementById("deleteStudentBtClose").click();
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
        document.getElementById('deleteStudentDivSelectStudent').style.display = 'none';
        document.getElementById('deleteStudentDivNoStudent').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllStudentsOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The students of level have been found, we add it in students select
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
                            document.getElementById("deleteStudentSelectStudent").innerHTML = selectContent;
                            // Hide nothind student div if is show
                            document.getElementById('deleteStudentDivNoStudent').style.display = 'none';
                            // Show student select
                            document.getElementById('deleteStudentDivSelectStudent').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not students
                            document.getElementById('deleteStudentDivNoStudent').innerText = 'Aucun élève créé pour ce niveau !';
                            document.getElementById('deleteStudentDivNoStudent').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('deleteStudentDivSelectStudent').style.display = 'none';
        }
    },

    /**
     * @name onSelectStudent
     * @description
     *      This function permits to verify if user has selected a student 
     */
    onSelectStudent() {
        // Verify if user selection is a student not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('deleteStudentSelectLevel').value);
        if (Utility.isLevelStudent(levelId, this.value)) {
            document.getElementById("deleteStudentBtDelete").removeAttribute("disabled");
        } else {
            document.getElementById("deleteStudentBtDelete").setAttribute("disabled", true);
        }
    },
};