/**
 * @name isStudentLevelExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a student is associated to a level identified by it id.
 */

 // Define the reference of lodash
 const _ = require("lodash");
 
 // Define the student and http services
 const StudentServices = require("../services/StudentServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants 
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isStudentLevelExisted";
    try {
        const levelId = req.params.levelId;
        const studentId = req.params.studentId;
        const action = "GET_STUDENT_BY_ID";
        const response = await StudentServices.getStudentById(studentId);
        switch (response.status) {
            case constants.STUDENT_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found student=" + JSON.stringify(response, null, 2));
                // Verify if the student is associated to a level
                if (response.data.level == levelId) {
                    console.log("Policy " + policy + "::is validated");
                    return next();
                } else {
                    console.log("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.STUDENT_LEVEL_NOT_FOUND;
                    error.message = "Student with id=" + studentId + " is not associated to level with id=" + levelId;
                    return HttpServices.unauthorized(res, error);
                }
            default:
                console.info("Service " + action + "::not found the student with id=" + studentId);
                console.info("Policy " + policy + "::not validated");
                var error = {};
                error.status = constants.STUDENT_NOT_FOUND;
                error.message = "Student with id=" + studentId + " not found";
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