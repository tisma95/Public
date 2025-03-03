/**
 * @name isExistedLevel.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a level identified by its id existed.
 */

 // Define the level service and http response service
 const LevelServices = require("../services/LevelServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isExistedLevel";
    const action = "GET_LEVEL_BY_ID";
    try {
        console.info("Policy " + policy + "::called with params :" + JSON.stringify(req.params, null, 2));
        const levelId = req.params.levelId;
        const response = await LevelServices.getLevelById(levelId);
        switch (response.status) {
            case constants.LEVEL_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found level=" + JSON.stringify(response, null, 2));
                console.info("Policy " + policy + "::is validated");
                return next();
            default:
                console.info("Service " + action + "::not found level");
                console.info("Policy " + policy + "::not validated");
                response.message = "Level with id=" + levelId + " not found";
                return HttpServices.unauthorized(res, response);
        }
    } catch (err) {
        console.error("Policy " + policy + "::encountered the error :" + err);
        var error = {};
        error.status = constants.DATABASE_ERROR;
        error.error = err;
        return HttpServices.internalServerError(res, error);
    }

};