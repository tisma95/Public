/**
 * @name isTeacherLevelNotExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a teacher is not associated to a level identified by its id. 
 */

 // Define the reference of lodash
 const  _ = require("lodash");

 // Defien the teacher, utility and http services
 const TeacherServices = require("../services/TeacherServices");
 const HttpServices = require("../services/HttpServices");
 const UtilityServices = require("../services/UtilityServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isTeacherLevelNotExisted";
    const action = "GET_TEACHERS_OF_LEVEL";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const levelId = req.params.levelId;
        const teacherId = req.params.teacherId;
        const firstName = UtilityServices.getCapitalize(req.body.firstName);
        const lastName = req.body.lastName.toUpperCase();
        const birthday = req.body.birthday;
        const response = await TeacherServices.getAllTeachersOfLevel(levelId);
        switch (response.status) {
            case constants.TEACHERS_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found teachers=" + JSON.stringify(response, null, 2));
                // Verify if a teacher is not associated to level
                var findTeacher = _.find(response.data, {firstName: firstName, lastName: lastName, birthday: birthday});
                if (findTeacher && findTeacher.id !== teacherId) {
                    console.info("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.TEACHER_FOUND_SUCCESSFULLY;
                    error.message = "Level with id=" + levelId + " has already a teacher=" + lastName + " " + firstName + " (" + birthday + ")";
                    return HttpServices.conflict(res, error);
                } else {
                    console.info("Policy " + policy + "::is validated");
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