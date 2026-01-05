/**
 * @name TeacherController.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of teacher's model
 */

 // Define the teacher and http services
 const TeacherServices = require("../services/TeacherServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

 module.exports = {
    /**
     * @name createTeacherOfLevel
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when the creation of new teacher's request is sended. 
     */
    async createTeacherOfLevel(req, res) {
        const action = "CREATE_TEACHER_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const params = req.body;
            const levelId = req.params.levelId;
            const response = await TeacherServices.createTeacherOfLevel(levelId, params);
            switch (response.status) {
                case constants.TEACHER_CREATED_SUCCESSFULLY:
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
     * @name getAllTeachersOfLevel
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when fetch all teachers request is sended.
     */
    async getAllTeachersOfLevel(req, res) {
        const action = "GET_ALL_TEAHCERS_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const levelId = req.params.levelId;
            const response = await TeacherServices.getAllTeachersOfLevel(levelId);
            switch (response.status) {
                case constants.TEACHERS_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.TEACHERS_NOT_FOUND:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.notFound(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null, 3));
                    return HttpServices.internalServerError(res, err);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        } 
    },

    /**
     * @name getTeacherById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when fetch specific teacher's request is sended. 
     */
    async getTeacherById(req, res) {
        const action = "GET_TEACHER_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const teacherId = req.params.teacherId;
            const response = await TeacherServices.getTeacherById(teacherId);
            switch (response.status) {
                case constants.TEACHER_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.TEACHER_NOT_FOUND:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.notFound(res, response);
                default:
                    console.error("Service " + action + "::encountered the error :" + JSON.stringify(response, null,));
                    return HttpServices.internalServerError(res, response);
            }
        } catch (err) {
            console.error("Controller " + action + "::encountered the error :" + err);
            return HttpServices.internalServerError(res, err);
        }
    },

    /**
     * @name updateTeacherById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when update specific teacher's request is called
     */
    async updateTeacherById(req, res) {
        const action = "UPDATE_TEACHER_BY_ID";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const teacherId = req.params.teacherId;
            const params = req.body;
            const response = await TeacherServices.updateTeacherById(teacherId, params);
            switch (response.status) {
                case constants.TEACHER_UPDATED_SUCCESSFULLY:
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
     * @name deleteTeacherById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when delete specific teacher's request is called
     */
    async deleteTeacherById(req, res) {
        const action = "DELETE_TEACHER_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + req.params.teacherId);
            const teacherId = req.params.teacherId;
            const response = await TeacherServices.deleteTeacherById(teacherId);
            switch (response.status) {
                case constants.TEACHER_DELETED_SUCCESSFULLY:
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