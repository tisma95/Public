/**
 * @name routes.js
 * @author The World Wolf 95
 * @description
 *      This file contains the application routes.
 */

// Define router reference
var express = require("express");
var router = express.Router();
// Define the policies references
const policies = require("./policies");
// Define controllers references
const LevelControllers = require("../controllers/LevelControllers");
const StudentControllers = require("../controllers/StudentControllers");
const SubjectControllers = require("../controllers/SubjectControllers");
const TeacherControllers = require("../controllers/TeacherControllers");
const ClassroomController = require("../controllers/ClassroomControllers");
const UtilityController = require("../controllers/UtilityControllers");

// Define swagger doc package
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import swagger doc options
const swaggerDocOptions = require("../doc/swaggerapidoc");

// Define Utility API's routes
router.get("/objects/count", UtilityController.getObjectCount);

// Define Level API's routes
router.get("/levels", LevelControllers.getAllLevels);

// Define Subject API's routes
router.post("/levels/:levelId/subject", policies.createSubjectOfLevel, SubjectControllers.createSubjectOfLevel);
router.get("/levels/:levelId/subjects", policies.getAllSubjectsOfLevel, SubjectControllers.getAllSubjectsOfLevel);
router.get("/levels/:levelId/subjects/:subjectId", policies.getSubjectById, SubjectControllers.getSubjectById);
router.put("/levels/:levelId/subjects/:subjectId", policies.updateSubjectById, SubjectControllers.updateSubjectById);
router.delete("/levels/:levelId/subjects/:subjectId", policies.deleteSubjectById, SubjectControllers.deleteSubjectById);

// Define Student API's routes
router.post("/levels/:levelId/student", policies.createStudentOfLevel, StudentControllers.createStudentOfLevel);
router.get("/levels/:levelId/students", policies.getAllStudentsOfLevel, StudentControllers.getAllStudentsOfLevel);
router.get("/levels/:levelId/students/:studentId", policies.getStudentById, StudentControllers.getStudentById);
router.put("/levels/:levelId/students/:studentId", policies.updateStudentById, StudentControllers.updateStudentById);
router.delete("/levels/:levelId/students/:studentId", policies.deleteStudentById, StudentControllers.deleteStudentById);

// Define Teacher API's routes
router.post("/levels/:levelId/teacher", policies.createTeacherOfLevel, TeacherControllers.createTeacherOfLevel);
router.get("/levels/:levelId/teachers", policies.getAllTeachersOfLevel, TeacherControllers.getAllTeachersOfLevel);
router.get("/levels/:levelId/teachers/:teacherId", policies.getTeacherById, TeacherControllers.getTeacherById);
router.put("/levels/:levelId/teachers/:teacherId", policies.updateTeacherById, TeacherControllers.updateTeacherById);
router.delete("/levels/:levelId/teachers/:teacherId", policies.deleteTeacherById, TeacherControllers.deleteTeacherById);

// Define Classroom API's routes
router.post("/levels/:levelId/classroom", policies.createClassroomOfLevel, ClassroomController.createClassroomOfLevel);
router.get("/levels/:levelId/classrooms", policies.getAllClassroomsOfLevel, ClassroomController.getAllClassroomsOfLevel);
router.get("/levels/:levelId/classrooms/:classroomId", policies.getClassroomById, ClassroomController.getClassroomById);
router.put("/levels/:levelId/classrooms/:classroomId", policies.updateClassroomById, ClassroomController.updateClassroomById);
router.delete("/levels/:levelId/classrooms/:classroomId", policies.deleteClassroomById, ClassroomController.deleteClassroomById);

// Define API Doc route
router.use("/apidoc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerDocOptions.apidocOptions), swaggerDocOptions.uiOptions));

// Exports the router
module.exports = router;
