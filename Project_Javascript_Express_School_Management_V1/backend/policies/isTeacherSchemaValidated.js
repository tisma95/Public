/**
 * @name isTeacherSchemaValidated.js
 * @author The World Wolf
 * @description
 *      This policy permits to verify if a teacher body which sended is correct.
 */
 
 // Reference of joi
 const Joi = require("@hapi/joi");

 // Define the http response service
 const HttpServices = require("../services/HttpServices");

  // Define the UtilityServices
  const UtilityServices = require("../services/UtilityServices");

 // Reference of constants
 const constants = require("../constants/constants");

module.exports = function(req, res, next) {
    const policy = "isTeacherSchemaValidated";
    try {
        console.info("Policy " + policy + "::called with body :" + JSON.stringify(req.body, null, 2));
        const schema = Joi.object({
            firstName: Joi.string().min(2).max(100).required(),
            lastName: Joi.string().min(2).max(100).required(),
            birthday: Joi.date().iso().required()
        });
        const {value, error} = schema.validate(req.body);
        if (error) {
            console.error("Policy " + policy + "::not validated");
            return HttpServices.unauthorized(res, error);
        } else {
            // Here we can verify if teacher age is between 18 and 90 years old
             const teacherAge = UtilityServices.getAge(req.body.birthday);
             if (teacherAge < 18 || teacherAge > 90) {
                console.error("Policy " + policy + "::not validated, teacher age is " + teacherAge);
                const errors = {
                    key: "TEACHER_AGE",
                    message: "Teacher age must be between 18 and 90, the birthday date is not correct",
                    value: req.body.birthday
                };
                return HttpServices.unauthorized(res, errors);
             } else {
                console.info("Policy " + policy + "::is validated");
                return next();
             }

        }
    } catch (err) {
        console.error("Policy " + policy + "::encountered the error :" + err);
        var error = {};
        error.status = constants.DATABASE_ERROR;
        error.error = err;
        return HttpServices.internalServerError(res, error); 
    }
};