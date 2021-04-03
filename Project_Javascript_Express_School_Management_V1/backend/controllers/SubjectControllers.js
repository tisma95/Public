/**
 * @name SubjectControllers.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of subject's model
 */

 // Define the subject and http services
 const SubjectServices = require("../services/SubjectServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

 module.exports = {
   /**
    * @name createSubjectOfLevel
    * @param {Object} req
    * @param {Object} res
    * @description
    *      This controller is called when the creation of new subject's request is sended.
    */
    async createSubjectOfLevel(req, res) {
        const action = "CREATE_SUBJECT_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const params = req.body;
            const levelId = req.params.levelId;
            const response = await SubjectServices.createSubjectOfLevel(levelId, params);
            switch (response.status) {
                case constants.SUBJECT_CREATED_SUCCESSFULLY:
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
    * @name getAllSubjectsOfLevel
    * @param {Object} req
    * @param {Object} res
    * @description
    *      This controller is called when fetch all subject's request is sended.
    */
    async getAllSubjectsOfLevel(req, res) {
        const action = "GET_ALL_SUBJECTS_OF_LEVEL";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const levelId = req.params.levelId;
            const response = await SubjectServices.getAllSubjectsOfLevel(levelId);
            switch (response.status) {
                case constants.SUBJECTS_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.SUBJECTS_NOT_FOUND:
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
     * @name getSubjectById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when fetch specific subject's request is sended.
     */
    async getSubjectById(req, res) {
        const action = "GET_SUBJECT_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
            const subjectId = req.params.subjectId;
            const response = await SubjectServices.getSubjectById(subjectId);
            switch (response.status) {
                case constants.SUBJECT_FOUND_SUCCESSFULLY:
                    console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
                    return HttpServices.fetched(res, response);
                case constants.SUBJECT_NOT_FOUND:
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
     * @name updateSubjectById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when update specific subject's request is called.
     */
    async updateSubjectById(req, res) {
        const action = "UPDATE_SUBJECT_BY_ID";
        try {
            console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
            const subjectId = req.params.subjectId;
            const params = req.body;
            const response = await SubjectServices.updateSubjectById(subjectId, params);
            switch (response.status) {
                case constants.SUBJECT_UPDATED_SUCCESSFULLY:
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
     * @name deleteSubjectById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when delete specific subject's request is called.
     */
    async deleteSubjectById(req, res) {
        const action = "DELETE_SUBJECT_BY_ID";
        try {
            console.info("Controller " + action + "::called with param :" + req.params.subjectId);
            const subjectId = req.params.subjectId;
            const response = await SubjectServices.deleteSubjectById(subjectId);
            switch (response.status) {
                case constants.SUBJECT_DELETED_SUCCESSFULLY:
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