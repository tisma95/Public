/**
 * @name StudentController.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of Student's model
 */

 // Define the student and http response services
 const StudentServices = require("../services/StudentServices");
 const HttpServices = require("../services/HttpServices");

 // References of constants 
 const constants = require("../constants/constants");

 module.exports = {
    /**
     * @name createStudentOfLevel
     * @param {Object} req
     * @param {Object} res
     * @description 
     *      This controller is called when the creation of new student's request is sended.
     */
    async createStudentOfLevel(req, res) {
        const action = "CREATE_STUDENT_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const params = req.body;
            const levelId = req.params.levelId;
            const response = await StudentServices.createStudentOfLevel(levelId, params);
            switch (response.status) {
                case constants.STUDENT_CREATED_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.created(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    },

    /**
     * @name getAllStudentsOfLevel
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when fetch all students request is sended.
     */
    async getAllStudentsOfLevel(req, res) {
        const action = "GET_ALL_STUDENTS_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const levelId = req.params.levelId;
            const response = await StudentServices.getAllStudentsOfLevel(levelId);
            switch (response.status) {
                case constants.STUDENTS_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.STUDENTS_NOT_FOUND:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.notFound(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    },

    /**
     * @name getStudentById 
     * @param {Object} req
     * @param {Object} res
     * @description 
     *      This controller is called when fetch specific student's request is sended.
     */
    async getStudentById(req, res) {
        const action = "GET_STUDENT_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const studentId = req.params.studentId;
            const response = await StudentServices.getStudentById(studentId);
            switch (response.status) {
                case constants.STUDENT_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.STUDENT_NOT_FOUND:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.notFound(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    },

    /**
     * @name updateStudentById
     * @param {Object} req
     * @param {Object} res
     * @description 
     *      This controller is called when update specific student's request is called
     */
    async updateStudentById(req, res) {
        const action = "UPDATE_STUDENT_BY_ID";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const studentId = req.params.studentId;
            const params = req.body;
            const response = await StudentServices.updateStudentById(studentId, params);
            switch (response.status) {
                case constants.STUDENT_UPDATED_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    },

    /**
     * @name deleteStudentById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when delete specific student's request is called
     */
    async deleteStudentById(req, res) {
        const action = "DELETE_STUDENT_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + req.params.studentId);
            const studentId = req.params.studentId;
            const response = await StudentServices.deleteStudentById(studentId);
            switch (response.status) {
                case constants.STUDENT_DELETED_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    }
 };