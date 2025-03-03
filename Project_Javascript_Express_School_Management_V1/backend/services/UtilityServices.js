/**
 * @name UtilityServices.js 
 * @author The World Wolf 95
 * @description
 *      This file contains the utilities services 
 */

// Reference of constants
const constants = require("../constants/constants");

// Define ORM
const orm = require("../config/orm");
const sequelize = orm.sequelize;

// Define the models
const student = require("../models/Student");
const Student = sequelize.define("Student", student, { freezeTableName: true });
const teacher = require("../models/Teacher");
const Teacher = sequelize.define("Teacher", teacher, { freezeTableName: true });
const subject = require("../models/Subject");
const Subject = sequelize.define("Subject", subject, { freezeTableName: true });
const classroom = require("../models/Classroom");
const Classroom = sequelize.define("Classroom", classroom, { freezeTableName: true });

 module.exports = {
     /**
      * @name getCapitalize
      * @param {String} words
      * @description
      *     This function put in capitalize each word of words.
      */
    getCapitalize(words) {
        const listOfWord = words.split(" ");
        var listOfWordInCapitalize = [];
        for (var word of listOfWord) {
            listOfWordInCapitalize.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
        return listOfWordInCapitalize.join(" "); 
    },

    /**
     * @name getObjectCount
     * @description
     *  This function permits to count the number of classrooms, students, subjects and teacher which created in database.
     */
    async getObjectCount() {
        try {
            const allStudents = await Student.findAll();
            const allTeachers = await Teacher.findAll();
            const allClassrooms = await Classroom.findAll();
            const allSubjects = await Subject.findAll();
            // Create return data
            const data = {
                STUDENTS_COUNT: allStudents.length || 0,
                TEACHERS_COUNT: allTeachers.length || 0,
                SUBJECTS_COUNT: allSubjects.length || 0,
                CLASSROOMS_COUNT: allClassrooms.length || 0,
            };
            // Return response 
            return {
                status: constants.RESSOURCES_FOUND_SUCCESSFULLY,
                data: data
            };
        } catch (err) {
            return {
              status: constants.DATABASE_ERROR,
              error: err
            };
        }
    },

     /**
     * @name getAge
     * @param {Date} date
     * @description
     *      This function permits to calculate the age of given date
     */
    getAge(date) {
        var newDate = new Date(date);
        var today = new Date();
        return today.getFullYear() - newDate.getFullYear();
    }
 };