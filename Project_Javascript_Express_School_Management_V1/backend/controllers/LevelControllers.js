/**
 * @name LevelControllers.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of level's model
 */

// Define the level and http services
const LevelServices = require("../services/LevelServices");
const HttpServices = require("../services/HttpServices");

// Reference of constants
const constants = require("../constants/constants");

module.exports = {
  /**
   * @name getAllLevels
   * @description
   *    This controller permit to fetch all levels
   */
  async getAllLevels(req, res) {
    const action = "GET_ALL_LEVELS";
    try {
      console.info("Controller " + action + "::called with param :" + JSON.stringify(req.params, null, 3));
      const response = await LevelServices.getAllLevels();
      switch (response.status) {
        case constants.LEVELS_FOUND_SUCCESSFULLY:
          console.info("Service " + action + "::called with response :" + JSON.stringify(response, null, 3));
          return HttpServices.fetched(res, response);
        case constants.LEVELS_NOT_FOUND:
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
  }
};
