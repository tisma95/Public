/**
 * @name StudentServices.js
 * @author The World Wolf 95
 * @description
 *      This file contains the services of student's model
 */

 // Reference of constants
 const constants = require("../constants/constants");
 
 // Reference of utility services
 const UtilityServices = require("./UtilityServices");

 // Define ORM
 const orm = require("../config/orm");
 const sequelize = orm.sequelize;

 // Define the Student model
 const student = require("../models/Student");
 const Student = sequelize.define("Student", student, {freezeTableName: true});

 module.exports =  {
     /**
      * @name createStudentOfLevel
      * @param {String} levelId
      * @param {Object} params 
      * @description
      *     This services permits to create a new student of level
      */
    async createStudentOfLevel(levelId, params) {
        try {
            // Prepare the new student's body
            let studentBody = {};
            studentBody.lastName = params.lastName.toUpperCase();
            studentBody.birthday = params.birthday;
            studentBody.level = levelId;
            // Put each first name in capitalize
            studentBody.firstName = UtilityServices.getCapitalize(params.firstName);
            const newStudent = await Student.create(studentBody);
            return {
                status: constants.STUDENT_CREATED_SUCCESSFULLY,
                data: newStudent
            }

        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name getAllStudentsOfLevel
     * @param {String} levelId
     * @description
     *      This function fetch all students of level identified by its id.
     */
    async getAllStudentsOfLevel(levelId) {
        try {
            const students = await Student.findAll({
                where: {
                    level: levelId
                }
            });
            if (students.length != 0) {
                return {
                  status: constants.STUDENTS_FOUND_SUCCESSFULLY,
                  data: students
                };
            } else {
                return {
                  status: constants.STUDENTS_NOT_FOUND,
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
     * @name getStudentById
     * @param {String} studentId
     * @decription
     *      This service permits to fetch the specific student identified by its id
     */
    async getStudentById(studentId) {
        try {
            const student = await Student.findOne({
                where: {
                    id: studentId
                }
            });
            if (student) {
                return {
                    status: constants.STUDENT_FOUND_SUCCESSFULLY,
                    data: student
                };
            } else {
                return {
                    status: constants.STUDENT_NOT_FOUND,
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
     * @name updateStudentById
     * @param {String} studentId
     * @param {Object} params
     * @description
     *      This service updates the student identified by its id.
     */
    async updateStudentById(studentId, params) {
        try {
            // Find the specific student
            var student = await Student.findOne({
            where: {
                id: studentId
            }
            });
            // Update student's informations
            student.lastName = params.lastName.toUpperCase();
            student.birthday = params.birthday;
            // Put each first name in capitalize
            student.firstName = UtilityServices.getCapitalize(params.firstName);
            // Update the student
            student.save();
            return {
                status: constants.STUDENT_UPDATED_SUCCESSFULLY,
                data: student
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name deleteStudentById
     * @param {String} studentId
     * @description
     *      This service deletes in the database the student identified by its id.
     */
    async deleteStudentById(studentId) {
        try {
            // Find the student before destroy
            const student = await Student.findOne({
                where: {
                    id: studentId
                }
            });
            // Destroy the student
            student.destroy();
            return {
                status: constants.STUDENT_DELETED_SUCCESSFULLY
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    }
 }