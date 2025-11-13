/**
 * @name ClassroomControllers.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of classroom's model
 */

// Define the classroom and http services
const ClassroomServices = require("../services/ClassroomServices");
const HttpServices = require("../services/HttpServices");

// Reference of constants
const constants = require("../constants/constants");

module.exports = {
  /**
   * @name createClassroomOfLevel
   * @param {Object} req
   * @param {Object} res
   * @description
   *      This controller is called when the creation of new classroom's request is sendend.
   */
  async createClassroomOfLevel(req, res) {
    const action = "CREATE_CLASSROOM_OF_LEVEL";
    try {
      console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
      const params = req.body;
      const levelId = req.params.levelId;
      const response = await ClassroomServices.createClassroomOfLevel(levelId, params);
      switch (response.status) {
        case constants.CLASSROOM_CREATED_SUCCESSFULLY:
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
   * @name getAllClassroomsOfLevel
   * @param {Object} req
   * @param {Object} res
   * @description
   *      This controller is called when fetch all classroom's request is sended.
   */
  async getAllClassroomsOfLevel(req, res) {
    const action = "GET_ALL_CLASSROOMS_OF_LEVEL";
    try {
      console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
      const levelId = req.params.levelId;
      const response = await ClassroomServices.getAllClassroomsOfLevel(levelId);
      switch (response.status) {
        case constants.CLASSROOMS_FOUND_SUCCESSFULLY:
          console.info("Service " + action + "::executed with response :" + JSON.stringify(response, null, 3));
          return HttpServices.fetched(res, response);
        case constants.CLASSROOMS_NOT_FOUND:
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
   * @name getClassroomById
   * @param {Object} req
   * @param {Object} res
   * @description
   *      This controller is called when fetch specific classroom's request is sended.
   */
  async getClassroomById(req, res) {
    const action = "GET_CLASSROOM_BY_ID";
    try {
      console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
      const classroomId = req.params.classroomId;
      const response = await ClassroomServices.getClassroomById(classroomId);
      switch (response.status) {
        case constants.CLASSROOM_FOUND_SUCCESSFULLY:
          console.info("Service " + action + "::executed with response " + JSON.stringify(response, null, 3));
          return HttpServices.fetched(res, response);
        case constants.CLASSROOM_NOT_FOUND:
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
   * @name updateClassroomById
   * @param {Object} req
   * @param {Object} res
   * @description
   *      This controller is called when update specific classroom's request is sended.
   */
  async updateClassroomById(req, res) {
    const action = "UPDATE_CLASSROOM_BY_ID";
    try {
      console.info("Controller " + action + "::called with body :" + JSON.stringify(req.body, null, 3));
      const classroomId = req.params.classroomId;
      const params = req.body;
      const response = await ClassroomServices.updateClassroomById(classroomId, params);
      switch (response.status) {
        case constants.CLASSROOM_UPDATED_SUCCESSFULLY:
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
   * @name deleteClassroomById
   * @param {Object} req
   * @param {Object} res
   * @description
   *      This controller is called when delete specific classroom's request is sended.
   */
  async deleteClassroomById(req, res) {
    const action = "DELETE_CLASSROOM_BY_ID";
    try {
      console.info("Controller " + action + "::called with param :" + req.params.classroomId);
      const classroomId = req.params.classroomId;
      const response = await ClassroomServices.deleteClassroomById(classroomId);
      switch (response.status) {
        case constants.CLASSROOM_DELETED_SUCCESSFULLY:
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