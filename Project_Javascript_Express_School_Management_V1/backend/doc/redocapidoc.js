/**
 * @name swaggerapidoc.js
 * @author The World Wolf 95
 * @description
 *      This file permits to configure application swagger API Doc.
 */

// Import fs module
const fs = require("fs");

// Set the config type
const config = require("../config/config").env == "local" ? require("../config/config").local : require("../config/config").production;

// Load base options
const apidocOptions = require("./options.json").redoc;
// Load project description
const description = require("../doc/description");
// Add swagger doc description
apidocOptions.info.description = description.redoc;
// Populate options before sending
apidocOptions.servers[0].url = config.host; //=> Define the backend path
// Load and define models schemas
const levelModel = require("./models/redoc/level.json"); //=> Load the json which describes Level's Model
apidocOptions.components.schemas.Level = levelModel; //=> Add level model description in options
const classroomModel = require("./models/redoc/classroom.json"); //=> Load the json which describes Classroom's Model
apidocOptions.components.schemas.Classroom = classroomModel; //=> Add classroom model description in options
const studentModel = require("./models/redoc/student.json"); //=> Load the json which describes Student's Model
apidocOptions.components.schemas.Student = studentModel; //=> Add student model description in options
const subjectModel = require("./models/redoc/subject.json"); //=> Load the json which describes Subject's Model
apidocOptions.components.schemas.Subject = subjectModel; //=> Add subject model description in options
const teacherModel = require("./models/redoc/teacher.json"); //=> Load the json which describes Teacher's Model
apidocOptions.components.schemas.Teacher = teacherModel; //=> Add teacher model description in options

// Load and define level API
const getDefaultLevel = require("./api/redoc/level/getDefaultLevel.json"); //=> Load default level API description
apidocOptions.paths["/levels"]["get"] = getDefaultLevel; //=> Add default level API description in options

// Load and define subject APIs
const createSubject = require("./api/redoc/subject/createSubject.json"); //=> Load create subject API description
apidocOptions.paths["/levels/{levelId}/subject"]["post"] = createSubject; //=> Add create subject API description in options
const getSubjects = require("./api/redoc/subject/getSubjects.json"); //=> Load get all subjects of level API description
apidocOptions.paths["/levels/{levelId}/subjects"]["get"] = getSubjects; //=> Add get all subjects of level API description in options
const getSubject = require("./api/redoc/subject/getSubject.json"); //=> Load get subject of level by id API description
apidocOptions.paths["/levels/{levelId}/subjects/{subjectId}"]["get"] = getSubject; //=> Add get subject of level by id API description in options
const updateSubject = require("./api/redoc/subject/updateSubject.json"); //=> Load update subject of level by id API description
apidocOptions.paths["/levels/{levelId}/subjects/{subjectId}"]["put"] = updateSubject; //=> Add update subject of level by id API description in options
const deleteSubject = require("./api/redoc/subject/deleteSubject.json"); //=> Load delete subject of level by id API description
apidocOptions.paths["/levels/{levelId}/subjects/{subjectId}"]["delete"] = deleteSubject; //=> Add delete subject of level by id API description in options

// Load and define classroom APIs
const createClassroom = require("./api/redoc/classroom/createClassroom.json"); //=> Load create classroom API description
apidocOptions.paths["/levels/{levelId}/classroom"]["post"] = createClassroom; //=> Add create classroom API description in options
const getClassrooms = require("./api/redoc/classroom/getClassrooms.json"); //=> Load get all classrooms of level API description
apidocOptions.paths["/levels/{levelId}/classrooms"]["get"] = getClassrooms; //=> Add get all classrooms of level API description in options
const getClassroom = require("./api/redoc/classroom/getClassroom.json"); //=> Load get classroom of level by id API description
apidocOptions.paths["/levels/{levelId}/classrooms/{classroomId}"]["get"] = getClassroom; //=> Add get classroom of level by id API description in options
const updateClassroom = require("./api/redoc/classroom/updateClassroom.json"); //=> Load update classroom of level by id API description
apidocOptions.paths["/levels/{levelId}/classrooms/{classroomId}"]["put"] = updateClassroom; //=> Add update classroom of level by id API description in options
const deleteClassroom = require("./api/redoc/classroom/deleteClassroom.json"); //=> Load delete classroom of level by id API description
apidocOptions.paths["/levels/{levelId}/classrooms/{classroomId}"]["delete"] = deleteClassroom; //=> Add delete classroom of level by id API description in options


// Load and define student APIs
const createStudent = require("./api/redoc/student/createStudent.json"); //=> Load create student API description
apidocOptions.paths["/levels/{levelId}/student"]["post"] = createStudent; //=> Add create student API description in options
const getStudents = require("./api/redoc/student/getStudents.json"); //=> Load get all students of level API description
apidocOptions.paths["/levels/{levelId}/students"]["get"] = getStudents; //=> Add get all students of level API description in options
const getStudent = require("./api/redoc/student/getStudent.json"); //=> Load get student of level by id API description
apidocOptions.paths["/levels/{levelId}/students/{studentId}"]["get"] = getStudent; //=> Add get student of level by id API description in options
const updateStudent = require("./api/redoc/student/updateStudent.json"); //=> Load update student of level by id API description
apidocOptions.paths["/levels/{levelId}/students/{studentId}"]["put"] = updateStudent; //=> Add update student of level by id API description in options
const deleteStudent = require("./api/redoc/student/deleteStudent.json"); //=> Load delete student of level by id API description
apidocOptions.paths["/levels/{levelId}/students/{studentId}"]["delete"] = deleteStudent; //=> Add delete student of level by id API description in options


// Load and define teacher APIs
const createTeacher = require("./api/redoc/teacher/createTeacher.json"); //=> Load create teacher API description
apidocOptions.paths["/levels/{levelId}/teacher"]["post"] = createTeacher; //=> Add create teacher API description in options
const getTeachers = require("./api/redoc/teacher/getTeachers.json"); //=> Load get all teachers of level API description
apidocOptions.paths["/levels/{levelId}/teachers"]["get"] = getTeachers; //=> Add get all teachers of level API description in options
const getTeacher = require("./api/redoc/teacher/getTeacher.json"); //=> Load get teacher of level by id API description
apidocOptions.paths["/levels/{levelId}/teachers/{teacherId}"]["get"] = getTeacher; //=> Add get teacher of level by id API description in options
const updateTeacher = require("./api/redoc/teacher/updateTeacher.json"); //=> Load update teacher of level by id API description
apidocOptions.paths["/levels/{levelId}/teachers/{teacherId}"]["put"] = updateTeacher; //=> Add update teacher of level by id API description in options
const deleteTeacher = require("./api/redoc/teacher/deleteTeacher.json"); //=> Load delete teacher of level by id API description
apidocOptions.paths["/levels/{levelId}/teachers/{teacherId}"]["delete"] = deleteTeacher; //=> Add delete teacher of level by id API description in options


// Load and define utility API
const objectCount = require("./api/redoc/utility/getObjectCount.json"); //=> Load count object API description
apidocOptions.paths["/objects/count"]["get"] = objectCount; //=> Add count object API description in options

// Stringify json before export
const json = JSON.stringify(apidocOptions);

fs.writeFile("./doc/dist/redocoptions.json", json, (err) => {
    if (!err) {
        console.log("done");
    } else {
        console.log(err);
    }
});