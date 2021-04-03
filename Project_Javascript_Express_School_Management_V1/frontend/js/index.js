/**
 * @name index.js
 * @author The World Wolf 95
 * @description
 *    This file contains the events of index page elements
 */
import Http from "./http.js";
import Utility from './utility.js';
import AddSubjectModal from './modals/subject/addsubjectmodal.js';
import ResearchSubjectModal from './modals/subject/researchsubjectmodal.js';
import ModifySubjectModal from './modals/subject/modifysubjectmodal.js';
import DeleteSubjectModal from './modals/subject/deletesubjectmodal.js';
import AddClassroomModal from './modals/classroom/addclassroommodal.js';
import ResearchClassroomModal from './modals/classroom/researchclassroommodal.js';
import ModifyClassroomModal from './modals/classroom/modifyclassroommodal.js';
import DeleteClassroomModal from './modals/classroom/deleteclassroommodal.js';
import AddStudentModal from './modals/student/addstudentmodal.js';
import ResearchStudentModal from './modals/student/researchstudentmodal.js';
import ModifyStudentModal from './modals/student/modifystudentmodal.js';
import DeleteStudentModal from './modals/student/deletestudentmodal.js';
import AddTeacherModal from './modals/teacher/addteachermodal.js';
import ResearchTeacherModal from './modals/teacher/researchteachermodal.js';
import ModifyTeacherModal from './modals/teacher/modifyteachermodal.js';
import DeleteTeacherModal from './modals/teacher/deleteteachermodal.js';

/**
 * BEGINNING OF EVENTS CONNECTION
 */
window.addEventListener('load', async function () {
    // Load the default levels
    await Http.getAllLevels();
    // Update objects count
    Utility.refreshObjectsCount();
    // Adding event on add new subject button of index page
    document.getElementById('indexPageBtAddSubject').onclick = onClickAddSubject;
    // Adding event on research subject button of index page
    document.getElementById('indexPageBtResearchSubject').onclick = onClickResearchSubject;
    // Adding event on modify subject button of index page
    document.getElementById('indexPageBtModifySubject').onclick = onClickModifySubject;
    // Adding event on delete subject button of index page
    document.getElementById('indexPageBtDeleteSubject').onclick = onClickDeleteSubject;
    // Adding event on add new classroom button of index page
    document.getElementById('indexPageBtAddClassroom').onclick = onClickAddClassroom;
    // Adding event on research classroom button of index page
    document.getElementById('indexPageBtResearchClassroom').onclick = onClickResearchClassroom;
    // Adding event on modify classroom button of index page
    document.getElementById('indexPageBtModifyClassroom').onclick = onClickModifyClassroom;
    // Adding event on delete classroom button of index page
    document.getElementById('indexPageBtDeleteClassroom').onclick = onClickDeleteClassroom;
    // Adding event on add new Student button of index page
    document.getElementById('indexPageBtAddStudent').onclick = onClickAddStudent;
    // Adding event on research student button of index page
    document.getElementById('indexPageBtResearchStudent').onclick = onClickResearchStudent;
    // Adding event on modify student button of index page
    document.getElementById('indexPageBtModifyStudent').onclick = onClickModifyStudent;
    // Adding event on delete student button of index page
    document.getElementById('indexPageBtDeleteStudent').onclick = onClickDeleteStudent;
    // Adding event on add new Teacher button of index page
    document.getElementById('indexPageBtAddTeacher').onclick = onClickAddTeacher;
    // Adding event on research teacher button of index page
    document.getElementById('indexPageBtResearchTeacher').onclick = onClickResearchTeacher;
    // Adding event on modify teacher button of index page
    document.getElementById('indexPageBtModifyTeacher').onclick = onClickModifyTeacher;
    // Adding event on delete teacher button of index page
    document.getElementById('indexPageBtDeleteTeacher').onclick = onClickDeleteTeacher;
});

/**
 * ENDING OF EVENTS CONNECTION
 */

/**
 * @name onClickAddSubject
 * @description
 *    This function permits to load the modal form for adding new subject and connect events 
 */
function onClickAddSubject() {
    // Load add subject modal html in index page
    $('#modalContainer').load('html/modals/subject/addsubject.html', function () {
        // Show modal
        $('#modalAddSubject').modal('show');
        // Connection of event after modal loading
        // Add event on subject's name input
        document.getElementById('addSubjectTxtSubjectName').addEventListener('input', AddSubjectModal.verifyAddForm);
        // Add event on radio
        document.getElementById('addSubjectRdChoicePrimary').addEventListener('change', AddSubjectModal.verifyAddForm);
        document.getElementById('addSubjectRdChoiceCollege').addEventListener('change', AddSubjectModal.verifyAddForm);
        document.getElementById('addSubjectRdChoiceHighSchool').addEventListener('change', AddSubjectModal.verifyAddForm);
        document.getElementById('addSubjectRdChoiceUniversity').addEventListener('change', AddSubjectModal.verifyAddForm);
        // Add event on add subject button and form submit and stop propagation
        document.getElementById("addSubjectForm").addEventListener("submit", function(e) {
            AddSubjectModal.OnClickAddButton();
            e.preventDefault();
        });
    });
}

/**
 * @name onClickResearchSubject
 * @description
 *      This function permits to load the modal form for researching subject and connect events
 */
function onClickResearchSubject() {
    // Load research subject modal html in index page
    $('#modalContainer').load('html/modals/subject/researchsubject.html', function () {
        // Disabled research button
        document.getElementById("researchSubjectBtResearch").setAttribute('disabled', true);
        // Hidden result elements 
        document.getElementById("researchSubjectDivNothing").style.display = 'none';
        document.getElementById("researchSubjectTableResult").style.display = 'none';
        // Set subject name input in invalid
        document.getElementById('researchSubjectTxtSubjectName').classList.remove('is-valid');
        document.getElementById('researchSubjectTxtSubjectName').classList.add('is-invalid');
        // Show modal
        $('#modalResearchSubject').modal('show');
        // Add event on subject's name input
        document.getElementById('researchSubjectTxtSubjectName').addEventListener('input', ResearchSubjectModal.verifyResearchForm);
        // Add event on research subject button and submit form and stop propagation
        document.getElementById("researchSubjectForm").addEventListener("submit", function(e) {
            ResearchSubjectModal.onClickResearchButton();
            e.preventDefault();
        });
        // Add event on input subject's name when its content changes
        document.getElementById("researchSubjectTxtSubjectName").addEventListener('change', ResearchSubjectModal.onChangeTxtSubjectName);
    })
}

/**
 * @name onClickModifySubject
 * @description
 *      This function permits to load the modal form for modifying subject and connect events
 */
function onClickModifySubject() {
    // Load modify subject modal html in index page
    $('#modalContainer').load('html/modals/subject/modifysubject.html', function () {
        // Hide the select of subjects and form for set the new name of subject
        document.getElementById('modifySubjectDivSelectSubject').style.display = 'none';
        document.getElementById('modifySubjectDivSubjectName').style.display = 'none';
        document.getElementById('modifySubjectDivNoSubject').style.display = 'none';
        // Disbaled modify button
        document.getElementById("modifySubjectBtModify").setAttribute('disabled', true);
        // Set subject name input in invalid
        ModifySubjectModal.verifyModifyForm();
        // Show modal
        $('#modalModifySubject').modal('show');
        // Add event on select level
        document.getElementById('modifySubjectSelectLevel').addEventListener('change', ModifySubjectModal.onSelectLevel);
        // Add event on select subject
        document.getElementById('modifySubjectSelectSubject').addEventListener('change', ModifySubjectModal.onSelectSubject);
         // Add event on subject's name input
         document.getElementById('modifySubjectTxtSubjectName').addEventListener('input', ModifySubjectModal.verifyModifyForm);
        // Adding event of modify button and submit form and stop propagation
        document.getElementById("modifySubjectForm").addEventListener("submit", function(e) {
            ModifySubjectModal.onClickModifyButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickDeleteSubject
 * @description
 *      This function permits to load the modal for deleting subject and connect events
 */
function onClickDeleteSubject() {
    // Load delete subject modal html in index page
    $('#modalContainer').load('html/modals/subject/deletesubject.html', function () {
        // Hide the select of subjects
        document.getElementById('deleteSubjectDivSelectSubject').style.display = 'none';
        document.getElementById('deleteSubjectDivNoSubject').style.display = 'none';
        // Disbaled modify button
        document.getElementById("deleteSubjectBtDelete").setAttribute('disabled', true);
        // Show modal
        $('#modalDeleteSubject').modal('show');
        // Add event on select level
        document.getElementById('deleteSubjectSelectLevel').addEventListener('change', DeleteSubjectModal.onSelectLevel);
        // Add event on select subject level
        document.getElementById('deleteSubjectSelectSubject').addEventListener('change', DeleteSubjectModal.onSelectSubject);
        // Adding event of delete button and submit form and stop propagation
        document.getElementById("deleteSubjectForm").addEventListener("submit", function(e) {
            DeleteSubjectModal.onClickDeleteButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickAddClassroom
 * @description
 *    This function permits to load the modal form for adding new classroom and connect events 
 */
function onClickAddClassroom() {
    // Load add classroom modal html in index page
    $('#modalContainer').load('html/modals/classroom/addclassroom.html', function () {
        // Show modal
        $('#modalAddClassroom').modal('show');
        // Connection of event after modal loading
        // Add event on classroom's name input
        document.getElementById('addClassroomTxtClassroomName').addEventListener('input', AddClassroomModal.verifyAddForm);
        // Add event on classroom's capacity input
        document.getElementById('addClassroomTxtClassroomCapacity').addEventListener('input', AddClassroomModal.verifyAddForm);
        // Add event on radio
        document.getElementById('addClassroomRdChoicePrimary').addEventListener('change', AddClassroomModal.verifyAddForm);
        document.getElementById('addClassroomRdChoiceCollege').addEventListener('change', AddClassroomModal.verifyAddForm);
        document.getElementById('addClassroomRdChoiceHighSchool').addEventListener('change', AddClassroomModal.verifyAddForm);
        document.getElementById('addClassroomRdChoiceUniversity').addEventListener('change', AddClassroomModal.verifyAddForm);
        // Add event on add classroom button and form submit and stop propagation
        document.getElementById("addClassroomForm").addEventListener("submit", function(e) {
            AddClassroomModal.OnClickAddButton();
            e.preventDefault();
        });
    });
}

/**
 * @name onClickResearchClassroom
 * @description
 *      This function permits to load the modal form for researching classroom and connect events
 */
function onClickResearchClassroom() {
    // Load research classroom modal html in index page
    $('#modalContainer').load('html/modals/classroom/researchclassroom.html', function () {
        // Disabled research button
        document.getElementById("researchClassroomBtResearch").setAttribute('disabled', true);
        // Hidden result elements 
        document.getElementById("researchClassroomDivNothing").style.display = 'none';
        document.getElementById("researchClassroomTableResult").style.display = 'none';
        // Set classroom name input in invalid
        document.getElementById('researchClassroomTxtClassroomName').classList.remove('is-valid');
        document.getElementById('researchClassroomTxtClassroomName').classList.add('is-invalid');
        // Show modal
        $('#modalResearchClassroom').modal('show');
        // Add event on classroom's name input
        document.getElementById('researchClassroomTxtClassroomName').addEventListener('input', ResearchClassroomModal.verifyResearchForm);
        // Add event on research classroom button and submit form and stop propagation
        document.getElementById("researchClassroomForm").addEventListener("submit", function(e) {
            ResearchClassroomModal.onClickResearchButton();
            e.preventDefault();
        });
        // Add event on input classroom's name when its content changes
        document.getElementById("researchClassroomTxtClassroomName").addEventListener('change', ResearchClassroomModal.onChangeTxtClassroomName);
    })
}

/**
 * @name onClickModifyClassroom
 * @description
 *      This function permits to load the modal form for modifying classroom and connect events
 */
function onClickModifyClassroom() {
    // Load modify classroom modal html in index page
    $('#modalContainer').load('html/modals/classroom/modifyclassroom.html', function () {
        // Hide the select of classrooms and form for set the new name of subject
        document.getElementById('modifyClassroomDivSelectClassroom').style.display = 'none';
        document.getElementById('modifyClassroomFormModify').style.display = 'none';
        document.getElementById('modifyClassroomDivNoClassroom').style.display = 'none';
        // Disbaled modify button
        document.getElementById("modifyClassroomBtModify").setAttribute('disabled', true);
        // Initialisation of form
        ModifyClassroomModal.verifyModifyForm();
        // Show modal
        $('#modalModifyClassroom').modal('show');
        // Add event on classroom's name input
        document.getElementById('modifyClassroomTxtClassroomName').addEventListener('input', ModifyClassroomModal.verifyModifyForm);
        // Add event on classroom's capacity input
        document.getElementById('modifyClassroomTxtClassroomCapacity').addEventListener('input', ModifyClassroomModal.verifyModifyForm);
        // Add event on select level
        document.getElementById('modifyClassroomSelectLevel').addEventListener('change', ModifyClassroomModal.onSelectLevel);
        // Add event on select subject
        document.getElementById('modifyClassroomSelectClassroom').addEventListener('change', ModifyClassroomModal.onSelectClassroom);
        // Adding event of modify button and submit form and stop propagation
        document.getElementById("modifyClassroomForm").addEventListener("submit", function(e) {
            ModifyClassroomModal.onClickModifyButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickDeleteClassroom
 * @description
 *      This function permits to load the modal for deleting classroom and connect events
 */
function onClickDeleteClassroom() {
    // Load delete classroom modal html in index page
    $('#modalContainer').load('html/modals/classroom/deleteclassroom.html', function () {
        // Hide the select of classrooms
        document.getElementById('deleteClassroomDivSelectClassroom').style.display = 'none';
        document.getElementById('deleteClassroomDivNoClassroom').style.display = 'none';
        // Disbaled modify button
        document.getElementById("deleteClassroomBtDelete").setAttribute('disabled', true);
        // Show modal
        $('#modalDeleteClassroom').modal('show');
        // Add event on select level
        document.getElementById('deleteClassroomSelectLevel').addEventListener('change', DeleteClassroomModal.onSelectLevel);
        // Add event on select subject level
        document.getElementById('deleteClassroomSelectClassroom').addEventListener('change', DeleteClassroomModal.onSelectClassroom);
        // Adding event of delete button and submit form and stop propagation
        document.getElementById("deleteClassroomForm").addEventListener("submit", function(e) {
            DeleteClassroomModal.onClickDeleteButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickAddStudent
 * @description
 *    This function permits to load the modal form for adding new student and connect events 
 */
function onClickAddStudent() {
    // Load add student modal html in index page
    $('#modalContainer').load('html/modals/student/addstudent.html', function () {
        // Show modal
        $('#modalAddStudent').modal('show');
        // Connection of event after modal loading
        // Add event on student's first name input
        document.getElementById('addStudentTxtStudentFirstName').addEventListener('input', AddStudentModal.verifyAddForm);
        // Add event on student's last name input
        document.getElementById('addStudentTxtStudentLastName').addEventListener('input', AddStudentModal.verifyAddForm);
         // Add event on student's birthday input
         document.getElementById('addStudentTxtStudentBirthday').addEventListener('input', AddStudentModal.verifyAddForm);
        // Add event on radio
        document.getElementById('addStudentRdChoicePrimary').addEventListener('change', AddStudentModal.verifyAddForm);
        document.getElementById('addStudentRdChoiceCollege').addEventListener('change', AddStudentModal.verifyAddForm);
        document.getElementById('addStudentRdChoiceHighSchool').addEventListener('change', AddStudentModal.verifyAddForm);
        document.getElementById('addStudentRdChoiceUniversity').addEventListener('change', AddStudentModal.verifyAddForm);
        // Add event on add student button and form submit and stop propagation
        document.getElementById("addStudentForm").addEventListener("submit", function(e) {
            AddStudentModal.OnClickAddButton();
            e.preventDefault();
        });
    });
}

/**
 * @name onClickResearchStudent
 * @description
 *      This function permits to load the modal form for researching student and connect events
 */
function onClickResearchStudent() {
    // Load research student modal html in index page
    $('#modalContainer').load('html/modals/student/researchstudent.html', function () {
        // Disabled research button
        document.getElementById("researchStudentBtResearch").setAttribute('disabled', true);
        // Hidden result elements 
        document.getElementById("researchStudentDivNothing").style.display = 'none';
        document.getElementById("researchStudentTableResult").style.display = 'none';
        // Show modal
        $('#modalResearchStudent').modal('show');
        // Add event on student's lastName input
        document.getElementById('researchStudentTxtStudentLastName').addEventListener('input', ResearchStudentModal.verifyResearchForm);
        // Add event on student's lastName change
        document.getElementById('researchStudentTxtStudentLastName').addEventListener('change', ResearchStudentModal.verifyResearchForm);
        // Add event on student's firstName input
        document.getElementById('researchStudentTxtStudentFirstName').addEventListener('input', ResearchStudentModal.verifyResearchForm);
        // Add event on student's firstName change
        document.getElementById('researchStudentTxtStudentFirstName').addEventListener('change', ResearchStudentModal.verifyResearchForm);
         // Add event on student's birthday input
         document.getElementById('researchStudentTxtStudentBirthday').addEventListener('input', ResearchStudentModal.verifyResearchForm);
         // Add event on student's bitrhday change
         document.getElementById('researchStudentTxtStudentBirthday').addEventListener('change', ResearchStudentModal.verifyResearchForm);
        // Add event on research student button and submit form and stop propagation
        document.getElementById("researchStudentForm").addEventListener("submit", function(e) {
            ResearchStudentModal.onClickResearchButton();
            e.preventDefault();
        });
        console.log(ResearchStudentModal);
    })
}

/**
 * @name onClickModifyStudent
 * @description
 *      This function permits to load the modal form for modifying student and connect events
 */
function onClickModifyStudent() {
    // Load modify subject modal html in index page
    $('#modalContainer').load('html/modals/student/modifystudent.html', function () {
        // Hide the select of student and form for updating of subject
        document.getElementById('modifyStudentDivSelectStudent').style.display = 'none';
        document.getElementById('modifyStudentDivStudentForm').style.display = 'none';
        document.getElementById('modifyStudentDivNoStudent').style.display = 'none';
        // Disabled modify button
        document.getElementById("modifyStudentBtModify").setAttribute('disabled', true);
        // Show modal
        $('#modalModifyStudent').modal('show');
        // Add event on select level
        document.getElementById('modifyStudentSelectLevel').addEventListener('change', ModifyStudentModal.onSelectLevel);
        // Add event on select student
        document.getElementById('modifyStudentSelectStudent').addEventListener('change', ModifyStudentModal.onSelectStudent);
        // Add event on student's first name input
        document.getElementById('modifyStudentTxtStudentFirstName').addEventListener('input', ModifyStudentModal.verifyModifyForm);
        document.getElementById('modifyStudentTxtStudentFirstName').addEventListener('change', ModifyStudentModal.verifyModifyForm);
        // Add event on student's last name input
        document.getElementById('modifyStudentTxtStudentLastName').addEventListener('input', ModifyStudentModal.verifyModifyForm);
        document.getElementById('modifyStudentTxtStudentLastName').addEventListener('change', ModifyStudentModal.verifyModifyForm);
        // Add event on student's birthday input
        document.getElementById('modifyStudentTxtStudentBirthday').addEventListener('input', ModifyStudentModal.verifyModifyForm);
        document.getElementById('modifyStudentTxtStudentBirthday').addEventListener('change', ModifyStudentModal.verifyModifyForm);
        // Adding event of modify button and submit form and stop propagation
        document.getElementById("modifyStudentForm").addEventListener("submit", function(e) {
            ModifyStudentModal.onClickModifyButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickDeleteStudent
 * @description
 *      This function permits to load the modal for deleting student and connect events
 */
function onClickDeleteStudent() {
    // Load delete student modal html in index page
    $('#modalContainer').load('html/modals/student/deletestudent.html', function () {
        // Hide the select of students
        document.getElementById('deleteStudentDivSelectStudent').style.display = 'none';
        document.getElementById('deleteStudentDivNoStudent').style.display = 'none';
        // Disbaled modify button
        document.getElementById("deleteStudentBtDelete").setAttribute('disabled', true);
        // Show modal
        $('#modalDeleteStudent').modal('show');
        // Add event on select level
        document.getElementById('deleteStudentSelectLevel').addEventListener('change', DeleteStudentModal.onSelectLevel);
        // Add event on select student level
        document.getElementById('deleteStudentSelectStudent').addEventListener('change', DeleteStudentModal.onSelectStudent);
        // Adding event of delete button and submit form and stop propagation
        document.getElementById("deleteStudentForm").addEventListener("submit", function(e) {
            DeleteStudentModal.onClickDeleteButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickAddTeacher
 * @description
 *    This function permits to load the modal form for adding new teacher and connect events 
 */
function onClickAddTeacher() {
    // Load add teacher modal html in index page
    $('#modalContainer').load('html/modals/teacher/addteacher.html', function () {
        // Show modal
        $('#modalAddTeacher').modal('show');
        // Connection of event after modal loading
        // Add event on teacher's first name input
        document.getElementById('addTeacherTxtTeacherFirstName').addEventListener('input', AddTeacherModal.verifyAddForm);
        // Add event on teacher's last name input
        document.getElementById('addTeacherTxtTeacherLastName').addEventListener('input', AddTeacherModal.verifyAddForm);
         // Add event on teacher's birthday input
         document.getElementById('addTeacherTxtTeacherBirthday').addEventListener('input', AddTeacherModal.verifyAddForm);
        // Add event on radio
        document.getElementById('addTeacherRdChoicePrimary').addEventListener('change', AddTeacherModal.verifyAddForm);
        document.getElementById('addTeacherRdChoiceCollege').addEventListener('change', AddTeacherModal.verifyAddForm);
        document.getElementById('addTeacherRdChoiceHighSchool').addEventListener('change', AddTeacherModal.verifyAddForm);
        document.getElementById('addTeacherRdChoiceUniversity').addEventListener('change', AddTeacherModal.verifyAddForm);
        // Add event on add teacher button and form submit and stop propagation
        document.getElementById("addTeacherForm").addEventListener("submit", function(e) {
            AddTeacherModal.OnClickAddButton();
            e.preventDefault();
        });
    });
}

/**
 * @name onClickResearchTeacher
 * @description
 *      This function permits to load the modal form for researching teacher and connect events
 */
function onClickResearchTeacher() {
    // Load research teacher modal html in index page
    $('#modalContainer').load('html/modals/teacher/researchteacher.html', function () {
        // Disabled research button
        document.getElementById("researchTeacherBtResearch").setAttribute('disabled', true);
        // Hidden result elements 
        document.getElementById("researchTeacherDivNothing").style.display = 'none';
        document.getElementById("researchTeacherTableResult").style.display = 'none';
        // Show modal
        $('#modalResearchTeacher').modal('show');
        // Add event on teacher's lastName input
        document.getElementById('researchTeacherTxtTeacherLastName').addEventListener('input', ResearchTeacherModal.verifyResearchForm);
        // Add event on teacher's lastName change
        document.getElementById('researchTeacherTxtTeacherLastName').addEventListener('change', ResearchTeacherModal.verifyResearchForm);
        // Add event on teacher's firstName input
        document.getElementById('researchTeacherTxtTeacherFirstName').addEventListener('input', ResearchTeacherModal.verifyResearchForm);
        // Add event on teacher's firstName change
        document.getElementById('researchTeacherTxtTeacherFirstName').addEventListener('change', ResearchTeacherModal.verifyResearchForm);
         // Add event on teacher's birthday input
         document.getElementById('researchTeacherTxtTeacherBirthday').addEventListener('input', ResearchTeacherModal.verifyResearchForm);
         // Add event on teacher's bitrhday change
         document.getElementById('researchTeacherTxtTeacherBirthday').addEventListener('change', ResearchTeacherModal.verifyResearchForm);
        // Add event on research teacher button and submit form and stop propagation
        document.getElementById("researchTeacherForm").addEventListener("submit", function(e) {
            ResearchTeacherModal.onClickResearchButton();
            e.preventDefault();
        });
        console.log(ResearchTeacherModal);
    })
}

/**
 * @name onClickModifyTeacher
 * @description
 *      This function permits to load the modal form for modifying teacher and connect events
 */
function onClickModifyTeacher() {
    // Load modify subject modal html in index page
    $('#modalContainer').load('html/modals/teacher/modifyteacher.html', function () {
        // Hide the select of teacher and form for updating of subject
        document.getElementById('modifyTeacherDivSelectTeacher').style.display = 'none';
        document.getElementById('modifyTeacherDivTeacherForm').style.display = 'none';
        document.getElementById('modifyTeacherDivNoTeacher').style.display = 'none';
        // Disabled modify button
        document.getElementById("modifyTeacherBtModify").setAttribute('disabled', true);
        // Show modal
        $('#modalModifyTeacher').modal('show');
        // Add event on select level
        document.getElementById('modifyTeacherSelectLevel').addEventListener('change', ModifyTeacherModal.onSelectLevel);
        // Add event on select teacher
        document.getElementById('modifyTeacherSelectTeacher').addEventListener('change', ModifyTeacherModal.onSelectTeacher);
        // Add event on teacher's first name input
        document.getElementById('modifyTeacherTxtTeacherFirstName').addEventListener('input', ModifyTeacherModal.verifyModifyForm);
        document.getElementById('modifyTeacherTxtTeacherFirstName').addEventListener('change', ModifyTeacherModal.verifyModifyForm);
        // Add event on teacher's last name input
        document.getElementById('modifyTeacherTxtTeacherLastName').addEventListener('input', ModifyTeacherModal.verifyModifyForm);
        document.getElementById('modifyTeacherTxtTeacherLastName').addEventListener('change', ModifyTeacherModal.verifyModifyForm);
        // Add event on teacher's birthday input
        document.getElementById('modifyTeacherTxtTeacherBirthday').addEventListener('input', ModifyTeacherModal.verifyModifyForm);
        document.getElementById('modifyTeacherTxtTeacherBirthday').addEventListener('change', ModifyTeacherModal.verifyModifyForm);
        // Adding event of modify button and submit form and stop propagation
        document.getElementById("modifyTeacherForm").addEventListener("submit", function(e) {
            ModifyTeacherModal.onClickModifyButton();
            e.preventDefault();
        });
    })
}

/**
 * @name onClickDeleteTeacher
 * @description
 *      This function permits to load the modal for deleting teacher and connect events
 */
function onClickDeleteTeacher() {
    // Load delete teacher modal html in index page
    $('#modalContainer').load('html/modals/teacher/deleteteacher.html', function () {
        // Hide the select of teahcers
        document.getElementById('deleteTeacherDivSelectTeacher').style.display = 'none';
        document.getElementById('deleteTeacherDivNoTeacher').style.display = 'none';
        // Disbaled modify button
        document.getElementById("deleteTeacherBtDelete").setAttribute('disabled', true);
        // Show modal
        $('#modalDeleteTeacher').modal('show');
        // Add event on select level
        document.getElementById('deleteTeacherSelectLevel').addEventListener('change', DeleteTeacherModal.onSelectLevel);
        // Add event on select teacher level
        document.getElementById('deleteTeacherSelectTeacher').addEventListener('change', DeleteTeacherModal.onSelectTeacher);
        // Adding event of delete button and submit form and stop propagation
        document.getElementById("deleteTeacherForm").addEventListener("submit", function(e) {
            DeleteTeacherModal.onClickDeleteButton();
            e.preventDefault();
        });
    })
}