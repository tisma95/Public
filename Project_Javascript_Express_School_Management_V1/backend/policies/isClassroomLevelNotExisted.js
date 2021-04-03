/**
 * @name isClassroomLevelNotExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a classroom is not associated to a level identified by its id. 
 */
 
 // Define the reference of lodash
 const _ = require("lodash");

 // Define the classroom, utility and http services
 const ClassroomServices = require("../services/ClassroomServices");
 const UtilityServices = require("../services/UtilityServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants 
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isClassroomLevelNotExisted";
    const action = "GET_CLASSROOMS_OF_LEVEL";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const levelId = req.params.levelId;
        const classroomId = req.params.classroomId;
        const classroomName = UtilityServices.getCapitalize(req.body.name);
        const response = await ClassroomServices.getAllClassroomsOfLevel(levelId);
        switch (response.status) {
            case constants.CLASSROOMS_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found classrooms=" + JSON.stringify(response, null, 2));
                // Verify if a classroom name is not associated to level
                var findClassroom = _.find(response.data, {name: classroomName});
                if (findClassroom && findClassroom.id !== classroomId) {
                    console.info("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.CLASSROOM_FOUND_SUCCESSFULLY;
                    error.message = "Level which id=" + levelId + " has already a classroom=" + classroomName;
                    return HttpServices.conflict(res, error);
                } else {
                    console.info("Polcicy " + policy + "::is validated");
                    return next();
                }
            default:
                console.info("Policy " + policy + "::is validated");
                return next();
        }
    } catch (err) {
        console.error("Policy " + policy + "::encountered the error :" + err);
        var error = {};
        error.status = constants.DATABASE_ERROR;
        error.error = err;
        return HttpServices.internalServerError(res, error);
    }
};