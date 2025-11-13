/**
 * @name ClassroomControllers.js
 * @author The World Wolf 95
 * @description
 *      This file contains the controllers of shared function
 */

// Define the utility and http services
const UtilityServices = require("../services/UtilityServices");
const HttpServices = require("../services/HttpServices");

// Reference of constants
const constants = require("../constants/constants");

module.exports = {
    /**
     * @name getObjectCount
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This controller is called when to send the count of stored objects
     */
    async getObjectCount(req, res) {
      const action = "GET_OBJECT_COUNT";
      try {
        console.info("Controller " + action + "::called with params :" + JSON.stringify(req.params, null, 3));
        const response = await UtilityServices.getObjectCount();
        switch (response.status) {
          case constants.RESSOURCES_FOUND_SUCCESSFULLY:
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
}