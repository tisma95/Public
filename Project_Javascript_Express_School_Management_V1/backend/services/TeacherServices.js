/**
 * @name TeacherServices.js 
 * @author The World Wolf 95
 * @description
 *      This file contains the services of teacher's model
 */

 // Reference of constants
 const constants = require("../constants/constants");

 // Reference of utility services
 const UtilityServices = require("./UtilityServices");

 // Define ORM
 const orm = require("../config/orm");
 const sequelize = orm.sequelize;

 // Define the Teacher model
 const teacher = require("../models/Teacher");
const { param } = require("../config/routes");
 const Teacher = sequelize.define("Teacher", teacher, {freezeTableName: true});

 module.exports = {
   /**
    * @name createTeacherOfLevel
    * @param {String} levelId
    * @param {Object} params
    * @description
    *      This services permits to create a new teacher of level
    */
    async createTeacherOfLevel(levelId, params) {
        try {
            // Prepare the new teacher's body
            let teacherBody = {};
            teacherBody.lastName = params.lastName.toUpperCase();
            teacherBody.birthday = params.birthday;
            teacherBody.level = levelId;
            // Put each first name in capitalize
            teacherBody.firstName = UtilityServices.getCapitalize(params.firstName);
            const newTeacher = await Teacher.create(teacherBody);
            return {
                status: constants.TEACHER_CREATED_SUCCESSFULLY,
                data: newTeacher
            };
        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                error: err
            };
        }
    },

   /**
    * @name getAllTeachersOfLevel
    * @param {String} levelId
    * @description
    *      This function fetch all teachers of level identified by its id.
    */
    async getAllTeachersOfLevel(levelId) {
        try {
            const teachers = await Teacher.findAll({
                where: {
                level: levelId
                }
            });
            if (teachers.length != 0) {
                return {
                    status: constants.TEACHERS_FOUND_SUCCESSFULLY,
                    data: teachers
                };
            } else {
                return {
                    status: constants.TEACHERS_NOT_FOUND,
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
     * @name getTeacherById
     * @param {String} teacherId
     * @description
     *      This service permits to fetch the specific teacher identified by its id.
     */
    async getTeacherById(teacherId) {
        try {
            const teacher = await Teacher.findOne({
                where: {
                    id: teacherId
                }
            });
            if (teacher) {
                return {
                    status: constants.TEACHER_FOUND_SUCCESSFULLY,
                    data: teacher
                };
            } else {
                return {
                    status: constants.TEACHER_NOT_FOUND,
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
     * @name updateTeacherById
     * @param {String} teacherId
     * @param {Object} params
     * @description
     *      This service updates the teacher identified by its id.
     */
    async updateTeacherById(teacherId, params) {
        try {
            // Find the specific teacher
            var teacher = await Teacher.findOne({
                where: {
                    id: teacherId
                }
            });
            // Update teacher's informations
            teacher.lastName = params.lastName.toUpperCase();
            teacher.birthday = params.birthday;
            // Put each first name in capitalize
            teacher.firstName = UtilityServices.getCapitalize(params.firstName);
            // Update the teacher
            teacher.save();
            return {
                status: constants.TEACHER_UPDATED_SUCCESSFULLY,
                data: teacher
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

    /**
     * @name deleteTeacherById
     * @param {String} teacherId
     * @description
     *      This service deletes in the database the teacher identified by its id.
     */
    async deleteTeacherById(teacherId) {
        try {
            // Find the teacher before destroy
            const teacher = await Teacher.findOne({
                where: {
                    id: teacherId
                }
            });
            // Destroy the teacher
            teacher.destroy();
            return {
                status: constants.TEACHER_DELETED_SUCCESSFULLY
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    }
 };