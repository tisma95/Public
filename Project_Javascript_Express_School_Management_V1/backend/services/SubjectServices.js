/**
 * @name SubjectServices.js
 * @author The World Wolf 95
 * @description
 *    This file contains the services of subject's model
 */

// Reference of constants
const constants = require("../constants/constants");
 
// Reference of utility services
const UtilityServices = require("./UtilityServices");

// Define ORM
const orm = require("../config/orm");
const sequelize = orm.sequelize;

// Define the Subject model
const subject = require("../models/Subject");
const Subject = sequelize.define("Subject", subject, {freezeTableName: true});

module.exports = {
    /**
     * @name createSubjectOfLevel
     * @param {Object} params
     * @param {String} levelId
     * @description
     *      This function permits to create a new subject of level
     */
    async createSubjectOfLevel(levelId, params) {
        try {
            // Prepare the new subject's body
            let subjectBody = {};
            subjectBody.name = UtilityServices.getCapitalize(params.name);
            subjectBody.level = levelId;
            const newSubject = await Subject.create(subjectBody);
            return {
                status: constants.SUBJECT_CREATED_SUCCESSFULLY,
                data: newSubject
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name getAllSubjectsOfLevel
     * @param {String} levelId
     * @description
     *      This function fetch all subjects of level identified by its id.
     */
    async getAllSubjectsOfLevel(levelId) {
        try {
            const subjects = await Subject.findAll({
                where: {
                    level: levelId
                }
            });
            if (subjects.length != 0) {
                return {
                  status: constants.SUBJECTS_FOUND_SUCCESSFULLY,
                  data: subjects
                };
            } else {
                return {
                  status: constants.SUBJECTS_NOT_FOUND,
                  data: null
                };
            }
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name getSubjectById
     * @param {String} subjectId
     * @description
     *      This service permits to fetch the specific subject identified by its id.
     */
    async getSubjectById(subjectId) {
        try {
            const subject = await Subject.findOne({
                where: {
                    id: subjectId
                }
            });
            if (subject) {
                return {
                  status: constants.SUBJECT_FOUND_SUCCESSFULLY,
                  data: subject
                };
            } else {
                return {
                  status: constants.SUBJECT_NOT_FOUND,
                  data: null
                };
            }
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name updateSubjectById
     * @param {String} subjectId
     * @param {Object} params
     * @description
     *      This service updates the subject identfied by its id.
     */
    async updateSubjectById(subjectId, params) {
        try {
              // Find the specific subject
              var subject = await Subject.findOne({
                  where: {
                      id: subjectId
                  }
              });
              // Update subject name 
              subject.name = UtilityServices.getCapitalize(params.name);
              subject.save();
              return {
                status: constants.SUBJECT_UPDATED_SUCCESSFULLY,
                data: subject
              };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name deleteSubjectById
     * @param {String} subjectId
     * @description
     *      This service deletes in the database the subject identified by its id.
     */
    async deleteSubjectById(subjectId) {
        try {
            // Find the subject before destroy
            const subject = await Subject.findOne({
                where: {
                    id: subjectId
                }
            });
            // Destroy the subject
            subject.destroy();
            return {
                status: constants.SUBJECT_DELETED_SUCCESSFULLY 
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    }
};