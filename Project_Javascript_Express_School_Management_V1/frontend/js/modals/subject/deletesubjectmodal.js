/**
 * @name deletesubjectmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of subject's deleting modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickDeleteButton
     * @description
     *      This function is the event of delete button of delete subject modal
     */
    async onClickDeleteButton() {
        var levelId = Utility.getLevelIdByName(document.getElementById('deleteSubjectSelectLevel').value);
        var subjectId = document.getElementById('deleteSubjectSelectSubject').value;
        const response = await Http.deleteSubjectById(levelId, subjectId);
        if (response) {
            switch (response.status) {
                case 200:
                    // The subject is deleted successfully
                    Msg.success('Suppression de la matière effectuée avec succès');
                    // Update objects count
                    Utility.refreshObjectsCount();
                    // Close modal
                    document.getElementById("deleteSubjectBtClose").click();
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
        document.getElementById('deleteSubjectDivSelectSubject').style.display = 'none';
        document.getElementById('deleteSubjectDivNoSubject').style.display = 'none';
        // Verify user choice
        if (Utility.getLevelsKey().includes(this.value)) {
            const levelId = Utility.getLevelIdByName(this.value);
            if (Utility.isLevel(levelId)) {
                const response = await Http.getAllSubjectOfLevel(levelId);
                if (response) {
                    switch (response.status) {
                        case 200:
                            // The subjects of level have been found, we add it in subjects select
                            var selectContent = "<option selected>Selectionner une matière...</option>";
                            var selectElt = document.createElement("select");
                            selectElt.classList.add("custom-select");
                            var levelSubjects = [];
                            for (var subject of response.data.data) {
                                selectContent += `<option value="${subject.id}">${subject.name}</option>`;
                                levelSubjects.push(subject);
                            }
                            // Add in local storage
                            localStorage.setItem(levelId + '_SUBJECTS', JSON.stringify(levelSubjects));
                            // Update the content of subject select
                            document.getElementById("deleteSubjectSelectSubject").innerHTML = selectContent;
                            // Hide nothind subject div if is show
                            document.getElementById('deleteSubjectDivNoSubject').style.display = 'none';
                            // Show subject select
                            document.getElementById('deleteSubjectDivSelectSubject').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not subjects
                            document.getElementById('deleteSubjectDivNoSubject').innerText = 'Aucune matière créer pour ce niveau !';
                            document.getElementById('deleteSubjectDivNoSubject').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('deleteSubjectDivSelectSubject').style.display = 'none';
        }
    },

    /**
     * @name onSelectSubject
     * @description
     *      This function permits to verify if user has selected a subject 
     */
    onSelectSubject() {
        // Verify if user selection is a subject not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('deleteSubjectSelectLevel').value);
        if (Utility.isLevelSubject(levelId, this.value)) {
            document.getElementById("deleteSubjectBtDelete").removeAttribute("disabled");
        } else {
            document.getElementById("deleteSubjectBtDelete").setAttribute("disabled", true);
        }
    },
};