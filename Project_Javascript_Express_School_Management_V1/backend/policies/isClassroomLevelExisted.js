/**
 * @name isClassroomLevelExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to check if a classroom is associated to a level identified by its id.
 */

 // Define the reference of lodash
 const _ = require("lodash");

 // Define the classroom and http services
 const ClassroomServices = require("../services/ClassroomServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isClassroomLevelExisted";
    try {
        const levelId = req.params.levelId;
        const classroomId = req.params.classroomId;
        const action = "GET_CLASSROOM_BY_ID";
        const response = await ClassroomServices.getClassroomById(classroomId);
        switch (response.status) {
            case constants.CLASSROOM_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found classroom=" + JSON.stringify(response, null, 2));
                // Verify if the classroom is associated to a level
                if (response.data.level === levelId) {
                    console.log("Policy " + policy + "::is validated");
                    return next();
                } else {
                    console.log("Polcicy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.CLASSROOM_NOT_FOUND;
                    error.message = "Classroom with id=" + classroomId + " is not associated to level with id=" + levelId;
                    return HttpServices.unauthorized(res, error);
                }
            default:
                console.info("Service " + action + "::not found the classroom with id=" + classroomId);
                console.info("Policy " + policy + "::not validated");
                var error = {};
                error.status = constants.CLASSROOM_NOT_FOUND;
                error.message = "Classroom with id=" + classroomId + " not found";
                return HttpServices.unauthorized(res, error);
        }
    } catch (err) {
        console.error("Policy " + policy + "::encountered the error :" + err);
        var error = {};
        error.status = constants.DATABASE_ERROR;
        error.error = err;
        return HttpServices.internalServerError(res, error);
    }
};