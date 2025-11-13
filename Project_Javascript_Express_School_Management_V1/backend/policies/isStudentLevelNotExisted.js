/**
 * @name isStudentLevelNotExisted.js 
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a student is not associated to a level identified by its id. 
 */

 // Define the reference of lodash
 const _ = require("lodash");

 // Define the student, utility and  http services
 const StudentServices = require("../services/StudentServices");
 const HttpServices = require("../services/HttpServices");
 const UtilityServices = require("../services/UtilityServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isStudentLevelNotExisted";
    const action = "GET_STUDENTS_OF_LEVEL";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const levelId = req.params.levelId;
        const studentId = req.params.studentId;
        const firstName = UtilityServices.getCapitalize(req.body.firstName);
        const lastName = req.body.lastName.toUpperCase();
        const birthday = req.body.birthday;
        const response = await StudentServices.getAllStudentsOfLevel(levelId);
        switch (response.status) {
            case constants.STUDENTS_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found students=" + JSON.stringify(response, null, 2));
                // Verify if a student is not associated to level
                var findStudent = _.find(response.data, {firstName: firstName, lastName: lastName, birthday: birthday});
                if (findStudent && studentId !== findStudent.id) {
                    console.info("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.STUDENT_FOUND_SUCCESSFULLY;
                    error.message = "Level with id=" + levelId + " has already a student=" + lastName + " " + firstName + " (" + birthday + ")";
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