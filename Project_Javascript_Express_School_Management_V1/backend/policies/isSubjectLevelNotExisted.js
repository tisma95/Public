/**
 * @name isSubjectLevelNotExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a subject is not associated to a level identified by its id.
 */

 // Define the reference of lodash
 const _ = require("lodash");

 // Define the subject, utility and http services
 const SubjectServices = require("../services/SubjectServices");
 const UtilityServices = require("../services/UtilityServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isSubjectLevelNotExisted";
    const action = "GET_SUBJECTS_OF_LEVEL";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const levelId = req.params.levelId;
        const subjectId = req.params.subjectId;
        const subjectName = UtilityServices.getCapitalize(req.body.name);
        const response = await SubjectServices.getAllSubjectsOfLevel(levelId);
        switch (response.status) {
            case constants.SUBJECTS_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found subjects=" + JSON.stringify(response, null, 2));
                // Verify if a subject name is not associated to level
                var findSubject = _.find(response.data, {name: subjectName});
                if (findSubject && findSubject.id !== subjectId) {
                    console.info("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.SUBJECT_FOUND_SUCCESSFULLY;
                    error.message = "Level which id=" + levelId + " has already a subject=" + subjectName;
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