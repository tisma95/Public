/**
 * @name ClassroomServices.js
 * @author The World Wolf 95
 * @description
 *      THis file contains the services of classroom's model  
 */

 // Reference of constants
 const constants = require("../constants/constants");

 // Reference of utility services
 const UtilityServices = require("./UtilityServices");

 // Define ORM
 const orm = require("../config/orm");
 const sequelize = orm.sequelize;

 // Define the Classroom model
 const classroom = require("../models/Classroom");
 const Classroom = sequelize.define("Classroom", classroom, {freezeTableName: true});

module.exports = {
    /**
     * @name createClassroomOfLevel
     * @param {Object} params
     * @param {String} levelId
     * @description
     *      This function permits to create a new classroom of level
     */
    async createClassroomOfLevel(levelId, params) {
        try {
            // Prepre the new classroom's body
            let classroomBody = {};
            classroomBody.name = UtilityServices.getCapitalize(params.name);
            classroomBody.capacity = params.capacity;
            classroomBody.level = levelId;
            const newClassroom = await Classroom.create(classroomBody);
            return {
                status: constants.CLASSROOM_CREATED_SUCCESSFULLY,
                data: newClassroom
            };
        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                error: err
            };
        }
    },

    /**
     * @name getAllClassroomsOfLevel
     * @param {String} levelId
     * @description
     *      This function fetch all classrooms of level identified by its id.
     */
    async getAllClassroomsOfLevel(levelId) {
        try {
            const classrooms = await Classroom.findAll({
                where: {
                    level: levelId
                }
            });
            if (classrooms.length != 0) {
                return {
                    status: constants.CLASSROOMS_FOUND_SUCCESSFULLY,
                    data: classrooms
                };
            } else {
                return {
                    status: constants.CLASSROOMS_NOT_FOUND,
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
     * @name getClassroomById
     * @param {String} classroomId
     * @description
     *      This service permits to fetch a specific classroom identified by its id.
     */
    async getClassroomById(classroomId) {
        try {
            const classroom = await Classroom.findOne({
                where: {
                    id: classroomId
                }
            });
            if (classroom) {
                return {
                    status: constants.CLASSROOM_FOUND_SUCCESSFULLY,
                    data: classroom
                };
            } else {
                return {
                    status: constants.CLASSROOM_NOT_FOUND,
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
     * @name updateClassroomById
     * @param {String} classroomId
     * @param {Object} params
     * @description
     *      This service updated a classroom identified by its id.
     */
    async updateClassroomById(classroomId, params) {
        try {
            // Find the specific classroom
            var classroom = await Classroom.findOne({
                where: {
                    id: classroomId
                }
            });
            // Update the classroom
            classroom.name = UtilityServices.getCapitalize(params.name);
            classroom.capacity = params.capacity;
            classroom.save();
            return {
                status: constants.CLASSROOM_UPDATED_SUCCESSFULLY,
                data: classroom
            };
        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                error: err
            }; 
        }
    },

    /**
     * @name deleteClassroomById
     * @param {String} classroomId
     * @description
     *      This service deletes in the database the classroom identified by its id.
     */
    async deleteClassroomById(classroomId) {
        try {
            // Find the classroom before destroy
            const classroom = await Classroom.findOne({
                where: {
                    id: classroomId
                }
            });
            // Destroy the classroom
            classroom.destroy();
            return {
                status: constants.CLASSROOM_DELETED_SUCCESSFULLY
            };
        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                error: err
            };
        }
    }
};