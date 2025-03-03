/**
 * @name isTeacherLevelExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a teacher is associated to a level identified by its id.   
 */

 // Define the reference of lodash
 const _ = require("lodash");

 // Define the student and http services
 const TeacherServices = require("../services/TeacherServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isTeacherLevelExisted";
    try {
        const levelId = req.params.levelId;
        const teacherId = req.params.teacherId;
        const action = "GET_TEACHER_BY_ID";
        const response = await TeacherServices.getTeacherById(teacherId);
        switch (response.status) {
            case constants.TEACHER_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found teacher=" + JSON.stringify(response, null, 2));
                // Verify if the teacher is associated to a level
                if (response.data.level === levelId) {
                    console.log("Policy " + policy + "::is validated");
                    return next();
                } else {
                    console.log("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.TEACHER_LEVEL_NOT_FOUND;
                    error.message = "Teacher with id=" + teacherId + " is not associated to level with id=" + levelId;
                    return HttpServices.unauthorized(res, error);
                }
            default:
                console.info("Service " + action + "::not found the teacher with id=" + teacherId);
                console.info("Policy " + policy + "::not validated");
                var error = {};
                error.status = constants.TEACHER_NOT_FOUND;
                error.message = "Teacher with id=" + teacherId + " not found";
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