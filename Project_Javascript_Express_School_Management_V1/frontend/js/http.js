/**
 * @name http.js
 * @author The World Wolf 95
 * @description
 *    This file contains the requests of application API
 */
import Utility from './utility.js';
const backendUrl = 'http://localhost:3000';

export default {
    /**
     * @name getAllLevels
     * @description
     *    This function permits to call all levels API
     */
    async getAllLevels() {
        const url = backendUrl + '/levels';
        localStorage.clear();
        Utility.startSpinner();
        axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Level::request executed with response:' + JSON.stringify(response.data, null, 2));
                localStorage.setItem('levels', JSON.stringify(response.data.data));
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Level::request executed with error:' + JSON.stringify(error, null, 2));
                Msg.danger('Problème avec le serveur merci de recommencer !');
                localStorage.setItem('levels', null);
            });
    },

    /**
     * @name createSubjectOfLevel
     * @param {String} levelId
     * @param {Object} body
     * @description
     *      This function permits to call the subject creation API 
     */
    async createSubjectOfLevel(levelId, body) {
        const url = backendUrl + '/levels/' + levelId + '/subject';
        Utility.startSpinner("Ajout en cours...");
        return await axios
                .post(url, body)
                .then(function (response) {
                    Utility.stopSpinner();
                    console.log('Subject::request executed with response:' + JSON.stringify(response.data, null, 2));
                    return response;
                })
                .catch(function (error) {
                    Utility.stopSpinner();
                    console.error('Subject::resquest executed with error:' + JSON.stringify(error, null, 2));
                    return error.response;
                });
    },

    /**
     * @name getAllSubjectsOfLevel
     * @param {String} levelId
     * @description
     *      This function permits to fetch all subjects of level identified by its id
     */
    async getAllSubjectOfLevel(levelId) {
        const url = backendUrl + '/levels/' + levelId + '/subjects';
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Subject::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Subject::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name getSubjectById
     * @param {String} levelId
     * @param {String} subjectId
     * @description
     *      This function permits to fetch a subject of level identified by its id
     */
    async getSubjectById(levelId, subjectId) {
        const url = backendUrl + '/levels/' + levelId + '/subjects/' + subjectId;
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Subject::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Subject::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name updateSubjectById
     * @param {String} levelId
     * @param {String} subjectId
     * @param {Object} body
     * @description
     *      This function permits to update the name of subject of specific level
     */
    async updateSubjectById(levelId, subjectId, body) {
        const url = backendUrl + '/levels/' + levelId + '/subjects/' + subjectId;
        Utility.startSpinner("Mise à jour en cours...");
        return await axios
            .put(url, body)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Subject::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Subject::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name deleteSubjectById
     * @param {String} levelId
     * @param {String} subjectId
     * @description
     *      This function permits to delete the subject of specific level
     */
    async deleteSubjectById(levelId, subjectId) {
        const url = backendUrl + '/levels/' + levelId + '/subjects/' + subjectId;
        Utility.startSpinner('Suppression en cours...');
        return await axios
            .delete(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Subject::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Subject::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name createClassroomOfLevel
     * @param {String} levelId
     * @param {Object} body
     * @description
     *      This function permits to call the classroom creation API 
     */
    async createClassroomOfLevel(levelId, body) {
        const url = backendUrl + '/levels/' + levelId + '/classroom';
        Utility.startSpinner("Ajout en cours...");
        return await axios
                .post(url, body)
                .then(function (response) {
                    Utility.stopSpinner();
                    console.log('Classroom::request executed with response:' + JSON.stringify(response.data, null, 2));
                    return response;
                })
                .catch(function (error) {
                    Utility.stopSpinner();
                    console.error('Classroom::resquest executed with error:' + JSON.stringify(error, null, 2));
                    return error.response;
                });
    },

    /**
     * @name getAllClassroomsOfLevel
     * @param {String} levelId
     * @description
     *      This function permits to fetch all classrooms of level identified by its id
     */
    async getAllClassroomsOfLevel(levelId) {
        const url = backendUrl + '/levels/' + levelId + '/classrooms';
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Classroom::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Classroom::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name getClassroomById
     * @param {String} levelId
     * @param {String} classroomId
     * @description
     *      This function permits to fetch a classroom of level identified by its id
     */
    async getClassroomById(levelId, classroomId) {
        const url = backendUrl + '/levels/' + levelId + '/classrooms/' + classroomId;
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Classroom::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Classroom::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name updateClassroomById
     * @param {String} levelId
     * @param {String} classroomId
     * @param {Object} body
     * @description
     *      This function permits to update the name and capacity of classroom of specific level
     */
    async updateClassroomById(levelId, classroomId, body) {
        const url = backendUrl + '/levels/' + levelId + '/classrooms/' + classroomId;
        Utility.startSpinner("Mise à jour en cours...");
        return await axios
            .put(url, body)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Classroom::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Classroom::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name deleteClassroomById
     * @param {String} levelId
     * @param {String} classroomId
     * @description
     *      This function permits to delete the classroom of specific level
     */
    async deleteClassroomById(levelId, classroomId) {
        const url = backendUrl + '/levels/' + levelId + '/classrooms/' + classroomId;
        Utility.startSpinner('Suppression en cours...');
        return await axios
            .delete(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Classroom::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Classroom::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

     /**
     * @name createStudentOfLevel
     * @param {String} levelId
     * @param {Object} body
     * @description
     *      This function permits to call the student creation API 
     */
    async createStudentOfLevel(levelId, body) {
        const url = backendUrl + '/levels/' + levelId + '/student';
        Utility.startSpinner("Ajout en cours...");
        return await axios
                .post(url, body)
                .then(function (response) {
                    Utility.stopSpinner();
                    console.log('Student::request executed with response:' + JSON.stringify(response.data, null, 2));
                    return response;
                })
                .catch(function (error) {
                    Utility.stopSpinner();
                    console.error('Student::resquest executed with error:' + JSON.stringify(error, null, 2));
                    return error.response;
                });
    },

    /**
     * @name getAllStudentsOfLevel
     * @param {String} levelId
     * @description
     *      This function permits to fetch all students of level identified by its id
     */
    async getAllStudentsOfLevel(levelId) {
        const url = backendUrl + '/levels/' + levelId + '/students';
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Student::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Student::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name getStudentById
     * @param {String} levelId
     * @param {String} studentId
     * @description
     *      This function permits to fetch a student of level identified by its id
     */
    async getStudentById(levelId, studentId) {
        const url = backendUrl + '/levels/' + levelId + '/students/' + studentId;
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Student::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Student::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },


    /**
     * @name updateStudentById
     * @param {String} levelId
     * @param {String} studentId
     * @param {Object} body
     * @description
     *      This function permits to update the name and capacity of classroom of specific level
     */
    async updateStudentById(levelId, studentId, body) {
        const url = backendUrl + '/levels/' + levelId + '/students/' + studentId;
        Utility.startSpinner("Mise à jour en cours...");
        return await axios
            .put(url, body)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Student::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Student::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name deleteStudentById
     * @param {String} levelId
     * @param {String} studentId
     * @description
     *      This function permits to delete the student of specific level
     */
    async deleteStudentById(levelId, studentId) {
        const url = backendUrl + '/levels/' + levelId + '/students/' + studentId;
        Utility.startSpinner('Suppression en cours...');
        return await axios
            .delete(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Student::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Student::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name createTeacherOfLevel
     * @param {String} levelId
     * @param {Object} body
     * @description
     *      This function permits to call the teacher creation API 
    */
    async createTeacherOfLevel(levelId, body) {
        const url = backendUrl + '/levels/' + levelId + '/teacher';
        Utility.startSpinner("Ajout en cours...");
        return await axios
                .post(url, body)
                .then(function (response) {
                    Utility.stopSpinner();
                    console.log('Teacher::request executed with response:' + JSON.stringify(response.data, null, 2));
                    return response;
                })
                .catch(function (error) {
                    Utility.stopSpinner();
                    console.error('Teacher::resquest executed with error:' + JSON.stringify(error, null, 2));
                    return error.response;
                });
    },

    /**
     * @name getAllTeachersOfLevel
     * @param {String} levelId
     * @description
     *      This function permits to fetch all teachers of level identified by its id
     */
    async getAllTeachersOfLevel(levelId) {
        const url = backendUrl + '/levels/' + levelId + '/teachers';
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Teacher::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Teacher::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name getTeacherById
     * @param {String} levelId
     * @param {String} teacherId
     * @description
     *      This function permits to fetch a teacher of level identified by its id
     */
    async getTeacherById(levelId, teacherId) {
        const url = backendUrl + '/levels/' + levelId + '/teachers/' + teacherId;
        Utility.startSpinner("Recherche en cours...");
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Teacher::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Teacher::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },

    /**
     * @name updateTeacherById
     * @param {String} levelId
     * @param {String} teacherId
     * @param {Object} body
     * @description
     *      This function permits to update the name and capacity of classroom of specific level
     */
    async updateTeacherById(levelId, teacherId, body) {
        const url = backendUrl + '/levels/' + levelId + '/teachers/' + teacherId;
        Utility.startSpinner("Mise à jour en cours...");
        return await axios
            .put(url, body)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Teacher::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Teacher::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },
    
    /**
     * @name deleteTeacherById
     * @param {String} levelId
     * @param {String} teacherId
     * @description
     *      This function permits to delete a teacher of specific level
     */
    async deleteTeacherById(levelId, teacherId) {
        const url = backendUrl + '/levels/' + levelId + '/teachers/' + teacherId;
        Utility.startSpinner('Suppression en cours...');
        return await axios
            .delete(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Teacher::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Teacher::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })
    },
    /**
     * @name getObjectsCount
     * @description
     *      This function permits to fetch the count of objects 
     */
    async getObjectsCount() {
        const url = backendUrl + "/objects/count";
        Utility.startSpinner('Mise à jour en cours...');
        return await axios
            .get(url)
            .then(function (response) {
                Utility.stopSpinner();
                console.log('Utility::request executed with response:' + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(function (error) {
                Utility.stopSpinner();
                console.error('Utility::request executed with error:' + JSON.stringify(error, null, 2));
                return error.response;
            })

    }

};