/**
 * @name policies.js
 * @author The World Wolf 95
 * @description
 *      This file contains the application policies which apply on APIs routes. 
 */

 // Define the level's APIs policies references
 const isExistedLevel = require("../policies/isExistedLevel");
 
 // Define the subject's APIs policies references
 const isSubjectLevelExisted = require("../policies/isSubjectLevelExisted");
 const isSubjectLevelNotExisted = require("../policies/isSubjectLevelNotExisted");
 const isSubjectSchemaValidated = require("../policies/isSubjectSchemaValidated");

 // Define the student's APIs policiies references
 const isStudentLevelExisted = require("../policies/isStudentLevelExisted");
 const isStudentLevelNotExisted = require("../policies/isStudentLevelNotExisted");
 const isStudentSchemaValidated = require("../policies/isStudentSchemaValidated");

 // Define the teacher's APIs policies references
 const isTeacherLevelExisted = require("../policies/isTeacherLevelExisted");
 const isTeacherLevelNotExisted = require("../policies/isTeacherLevelNotExisted");
 const isTeacherSchemaValidated = require("../policies/isTeacherSchemaValidated");

 // Define the classroom's APIs policies references
 const isClassroomLevelExisted = require("../policies/isClassroomLevelExisted");
 const isClassroomLevelNotExisted = require("../policies/isClassroomLevelNotExisted");
 const isClassroomSchemaValidated = require("../policies/isClassroomSchemaValidated");

module.exports = {
    // Subject's Controllers policies
    createSubjectOfLevel: [isExistedLevel, isSubjectSchemaValidated, isSubjectLevelNotExisted],
    getAllSubjectsOfLevel: [isExistedLevel],
    getSubjectById: [isExistedLevel, isSubjectLevelExisted],
    updateSubjectById: [isExistedLevel, isSubjectLevelExisted, isSubjectSchemaValidated, isSubjectLevelNotExisted],
    deleteSubjectById: [isExistedLevel, isSubjectLevelExisted],

    // Student's Controllers policies
    createStudentOfLevel: [isExistedLevel, isStudentSchemaValidated, isStudentLevelNotExisted],
    getAllStudentsOfLevel: [isExistedLevel],
    getStudentById: [isExistedLevel, isStudentLevelExisted],
    updateStudentById: [isExistedLevel, isStudentLevelExisted, isStudentSchemaValidated, isStudentLevelNotExisted],
    deleteStudentById: [isExistedLevel, isStudentLevelExisted],

    // Teacher's Controllers policies
    createTeacherOfLevel: [isExistedLevel, isTeacherSchemaValidated, isTeacherLevelNotExisted],
    getAllTeachersOfLevel: [isExistedLevel],
    getTeacherById: [isExistedLevel, isTeacherLevelExisted],
    updateTeacherById: [isExistedLevel, isTeacherLevelExisted, isTeacherSchemaValidated, isTeacherLevelNotExisted],
    deleteTeacherById: [isExistedLevel, isTeacherLevelExisted],

    // Classroom's Controllers policies
    createClassroomOfLevel: [isExistedLevel, isClassroomSchemaValidated, isClassroomLevelNotExisted],
    getAllClassroomsOfLevel: [isExistedLevel],
    getClassroomById: [isExistedLevel, isClassroomLevelExisted],
    updateClassroomById: [isExistedLevel, isClassroomLevelExisted, isClassroomSchemaValidated, isClassroomLevelNotExisted],
    deleteClassroomById: [isExistedLevel, isClassroomLevelExisted]
};