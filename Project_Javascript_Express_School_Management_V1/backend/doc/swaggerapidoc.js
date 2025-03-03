/**
 * @name swaggerapidoc.js
 * @author The World Wolf 95
 * @description
 *      This file permits to configure application swagger API Doc.
 */

// Set the config type
const config = require("../config/config").env == "local" ? require("../config/config").local : require("../config/config").production;

// Load base options
const apidocOptions = require("./options.json").swagger;
// Load project description
const description = require("../doc/description");
// Add swagger doc description
apidocOptions.definition.info.description = description.swagger;
// Populate options before sending
apidocOptions.definition.servers[0].url = config.host; //=> Define the backend path
// Load and define models schemas
const levelModel = require("./models/swagger/level.json"); //=> Load the json which describes Level's Model
apidocOptions.definition.components.schemas.Level = levelModel; //=> Add level model description in options
const classroomModel = require("./models/swagger/classroom.json"); //=> Load the json which describes Classroom's Model
apidocOptions.definition.components.schemas.Classroom = classroomModel; //=> Add classroom model description in options
const studentModel = require("./models/swagger/student.json"); //=> Load the json which describes Student's Model
apidocOptions.definition.components.schemas.Student = studentModel; //=> Add student model description in options
const subjectModel = require("./models/swagger/subject.json"); //=> Load the json which describes Subject's Model
apidocOptions.definition.components.schemas.Subject = subjectModel; //=> Add subject model description in options
const teacherModel = require("./models/swagger/teacher.json"); //=> Load the json which describes Teacher's Model
apidocOptions.definition.components.schemas.Teacher = teacherModel; //=> Add teacher model description in options

// Load and define level API
const getDefaultLevel = require("./api/swagger/level/getDefaultLevel.json"); //=> Load default level API description
apidocOptions.definition.paths["/levels"]["get"] = getDefaultLevel; //=> Add default level API description in options

// Load and define subject APIs
const createSubject = require("./api/swagger/subject/createSubject.json"); //=> Load create subject API description
apidocOptions.definition.paths["/levels/{levelId}/subject"]["post"] = createSubject; //=> Add create subject API description in options
const getSubjects = require("./api/swagger/subject/getSubjects.json"); //=> Load get all subjects of level API description
apidocOptions.definition.paths["/levels/{levelId}/subjects"]["get"] = getSubjects; //=> Add get all subjects of level API description in options
const getSubject = require("./api/swagger/subject/getSubject.json"); //=> Load get subject of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/subjects/{subjectId}"]["get"] = getSubject; //=> Add get subject of level by id API description in options
const updateSubject = require("./api/swagger/subject/updateSubject.json"); //=> Load update subject of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/subjects/{subjectId}"]["put"] = updateSubject; //=> Add update subject of level by id API description in options
const deleteSubject = require("./api/swagger/subject/deleteSubject.json"); //=> Load delete subject of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/subjects/{subjectId}"]["delete"] = deleteSubject; //=> Add delete subject of level by id API description in options

// Load and define classroom APIs
const createClassroom = require("./api/swagger/classroom/createClassroom.json"); //=> Load create classroom API description
apidocOptions.definition.paths["/levels/{levelId}/classroom"]["post"] = createClassroom; //=> Add create classroom API description in options
const getClassrooms = require("./api/swagger/classroom/getClassrooms.json"); //=> Load get all classrooms of level API description
apidocOptions.definition.paths["/levels/{levelId}/classrooms"]["get"] = getClassrooms; //=> Add get all classrooms of level API description in options
const getClassroom = require("./api/swagger/classroom/getClassroom.json"); //=> Load get classroom of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/classrooms/{classroomId}"]["get"] = getClassroom; //=> Add get classroom of level by id API description in options
const updateClassroom = require("./api/swagger/classroom/updateClassroom.json"); //=> Load update classroom of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/classrooms/{classroomId}"]["put"] = updateClassroom; //=> Add update classroom of level by id API description in options
const deleteClassroom = require("./api/swagger/classroom/deleteClassroom.json"); //=> Load delete classroom of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/classrooms/{classroomId}"]["delete"] = deleteClassroom; //=> Add delete classroom of level by id API description in options


// Load and define student APIs
const createStudent = require("./api/swagger/student/createStudent.json"); //=> Load create student API description
apidocOptions.definition.paths["/levels/{levelId}/student"]["post"] = createStudent; //=> Add create student API description in options
const getStudents = require("./api/swagger/student/getStudents.json"); //=> Load get all students of level API description
apidocOptions.definition.paths["/levels/{levelId}/students"]["get"] = getStudents; //=> Add get all students of level API description in options
const getStudent = require("./api/swagger/student/getStudent.json"); //=> Load get student of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/students/{studentId}"]["get"] = getStudent; //=> Add get student of level by id API description in options
const updateStudent = require("./api/swagger/student/updateStudent.json"); //=> Load update student of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/students/{studentId}"]["put"] = updateStudent; //=> Add update student of level by id API description in options
const deleteStudent = require("./api/swagger/student/deleteStudent.json"); //=> Load delete student of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/students/{studentId}"]["delete"] = deleteStudent; //=> Add delete student of level by id API description in options


// Load and define teacher APIs
const createTeacher = require("./api/swagger/teacher/createTeacher.json"); //=> Load create teacher API description
apidocOptions.definition.paths["/levels/{levelId}/teacher"]["post"] = createTeacher; //=> Add create teacher API description in options
const getTeachers = require("./api/swagger/teacher/getTeachers.json"); //=> Load get all teachers of level API description
apidocOptions.definition.paths["/levels/{levelId}/teachers"]["get"] = getTeachers; //=> Add get all teachers of level API description in options
const getTeacher = require("./api/swagger/teacher/getTeacher.json"); //=> Load get teacher of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/teachers/{teacherId}"]["get"] = getTeacher; //=> Add get teacher of level by id API description in options
const updateTeacher = require("./api/swagger/teacher/updateTeacher.json"); //=> Load update teacher of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/teachers/{teacherId}"]["put"] = updateTeacher; //=> Add update teacher of level by id API description in options
const deleteTeacher = require("./api/swagger/teacher/deleteTeacher.json"); //=> Load delete teacher of level by id API description
apidocOptions.definition.paths["/levels/{levelId}/teachers/{teacherId}"]["delete"] = deleteTeacher; //=> Add delete teacher of level by id API description in options


// Load and define utility API
const objectCount = require("./api/swagger/utility/getObjectCount.json"); //=> Load count object API description
apidocOptions.definition.paths["/objects/count"]["get"] = objectCount; //=> Add count object API description in options


// Export swagger configuration for using it in route file
module.exports = {
    // UI options of swagger documentation
    uiOptions: {
        customCss: `
                .topbar-wrapper img {content:url("${config.host}/logo.jpg")}
                head link[rel="icon"] {background-color: "#ff0000";}`,
        customSiteTitle: "School Management APIs Doc",
        customFavIcon: "${config.host}/logo.ico",
    },
    apidocOptions: apidocOptions
};