/**
 * @name modifysubjectmodal.js
 * @author The World Wolf 95
 * @description
 *      This file contains the events of subject's modifying modal
 */
import Utility from '../../utility.js';
import Http from '../../http.js';

export default {
    /**
     * @name onClickModifyButton
     * @description
     *      This function is the event of modify button of modify subject button
     */
    async onClickModifyButton() {
        // Prepare request body
        var body = {};
        body.name = document.getElementById('modifySubjectTxtSubjectName').value;
        var levelId = Utility.getLevelIdByName(document.getElementById('modifySubjectSelectLevel').value);
        var subjectId = document.getElementById('modifySubjectSelectSubject').value;
        const response = await Http.updateSubjectById(levelId, subjectId, body);
        if (response) {
            switch (response.status) {
                case 200:
                    // The subject are updated successfully
                    Msg.success('Mise à jour de la matière effectuée avec succès');
                    // Close modal
                    document.getElementById("modifySubjectBtClose").click();
                    break;
                case 401:
                    Msg.error("Formulaire de mise à jour d'une matière incorrect, merci de recommencer !");
                    break;
                case 409:
                    var levelName = Utility.getLevelNameByKey(document.getElementById('modifySubjectSelectLevel').value);
                    var subjectName = Utility.getStringInCapitalize(document.getElementById('modifySubjectTxtSubjectName').value);
                    Msg.warning(`Le niveau "${levelName}" possède déjà une matière "${subjectName}"`);
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
        document.getElementById('modifySubjectDivSelectSubject').style.display = 'none';
        document.getElementById('modifySubjectDivSubjectName').style.display = 'none';
        document.getElementById('modifySubjectDivNoSubject').style.display = 'none';
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
                            document.getElementById("modifySubjectSelectSubject").innerHTML = selectContent;
                            // Hide nothing subject div if is show
                            document.getElementById('modifySubjectDivNoSubject').style.display = 'none';
                            // Show subject select
                            document.getElementById('modifySubjectDivSelectSubject').style.display = 'flex';
                            break;
                        case 404:
                            // The level has not subjects
                            document.getElementById('modifySubjectDivNoSubject').innerText = 'Aucune matière créée pour ce niveau !';
                            document.getElementById('modifySubjectDivNoSubject').style.display = 'block';
                            break;
                    }
                } else {
                    Msg.danger("Erreur sur le serveur, merci de recommencer !");
                }
            }
        } else {
            // Selection is not correct
            document.getElementById('modifySubjectDivSelectSubject').style.display = 'none';
            document.getElementById('modifySubjectDivSubjectName').style.display = 'none';
        }
    },

    /**
     * @name onSelectSubject
     * @description
     *      This function permits to verify if user has selected a subject 
     */
    async onSelectSubject() {
        // Verify if user selection is a subject not a select placeholder
        const levelId = Utility.getLevelIdByName(document.getElementById('modifySubjectSelectLevel').value);
        if (Utility.isLevelSubject(levelId, this.value)) {
            // Initialisation of form by the subject feature
            const response = await Http.getSubjectById(levelId, this.value);
            if (response && response.status === 200) {
                document.getElementById('modifySubjectDivSubjectName').style.display = 'block';
                document.getElementById('modifySubjectTxtSubjectName').value = response.data.data.name;
                 // Add input element in valid element 
                document.getElementById('modifySubjectTxtSubjectName').classList.add('is-valid');
                document.getElementById('modifySubjectTxtSubjectName').classList.remove('is-invalid');
            }
        } else {
            document.getElementById('modifySubjectDivSubjectName').style.display = 'none';
        }
    },

    /**
     * @name verifyModifyForm
     * @description
     *      This function permits to verify if a form is correct
     */
    verifyModifyForm() {
        // Verify if a name is correct
        var eltSubjectName = document.getElementById('modifySubjectTxtSubjectName');
        if (eltSubjectName.value.length >= 2) {
            // The correct subject's name is entried
            eltSubjectName.classList.remove('is-invalid');
            eltSubjectName.classList.add('is-valid');
            document.getElementById("modifySubjectBtModify").removeAttribute("disabled");
        } else {
            eltSubjectName.classList.remove('is-valid');
            eltSubjectName.classList.add('is-invalid');
            document.getElementById("modifySubjectBtModify").setAttribute("disabled", true);
        }
    }
};