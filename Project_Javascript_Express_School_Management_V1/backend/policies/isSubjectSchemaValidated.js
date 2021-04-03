/**
 * @name isSubjectSchemaValidated.js 
 * @author The World Wolf 95
 * @description
 *      This policy permits to verify if a subject body which sended is correct.
 */

 // Reference of joi
 const Joi = require("@hapi/joi");

 // Define the http response service
 const HttpServices = require("../services/HttpServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = function(req, res, next) {
    const policy = "isSubjectSchemaValidated";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const schema = Joi.object({
            name: Joi.string().min(2).max(45).required()
        });
        const {value, error} = schema.validate(req.body);
        if (error) {
            console.error("Policy " + policy + "::not validated");
            return HttpServices.unauthorized(res, error);
        } else {
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