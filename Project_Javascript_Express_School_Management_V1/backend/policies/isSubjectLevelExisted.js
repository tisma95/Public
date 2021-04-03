/**
 * @name isSubjectLevelExisted.js
 * @author The World Wolf 95
 * @description
 *      This policy permits to check if a subject is associated to a level identified by it id.
 */

 // Define the reference of lodash
 const _ = require("lodash");

 // Define the subject and http services
 const SubjectServices = require("../services/SubjectServices");
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = async function(req, res, next) {
    const policy = "isSubjectLevelExisted";
    try {
        const levelId = req.params.levelId;
        const subjectId = req.params.subjectId;
        const action  = "GET_SUBJECT_BY_ID";
        const response = await SubjectServices.getSubjectById(subjectId);
        switch (response.status) {
            case constants.SUBJECT_FOUND_SUCCESSFULLY:
                console.info("Service " + action + "::found subject=" + JSON.stringify(response, null, 2));
                // Verify if the subject is associated to a level
                if (response.data.level === levelId) {
                    console.log("Policy " + policy + "::is validated");
                    return next();
                } else {
                    console.log("Policy " + policy + "::not validated");
                    var error = {};
                    error.status = constants.SUBJECT_LEVEL_NOT_FOUND;
                    error.message = "Subject with id=" + subjectId + " is not associated to level with id=" + levelId;
                    return HttpServices.unauthorized(res, error);
                }
            default:
                console.info("Service " + action + "::not found the subject with id=" + subjectId);
                console.info("Policy " + policy + "::not validated");
                var error = {};
                error.status = constants.SUBJECT_NOT_FOUND;
                error.message = "Subject with id=" + subjectId + " not found";
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