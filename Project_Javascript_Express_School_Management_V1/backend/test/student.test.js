/**
 * @name student.test.js
 * @description
 *      This file is the test of student APIs.
 */

const supertest = require("supertest");
const app = require("../app.js");
const constants = require("../constants/constants.js");
const _ = require("lodash");
const LevelServices = require("../services/LevelServices.js");
const StudentServices = require("../services/StudentServices.js");

console.log = console.info = console.error  = function() {}; // Disabled console.log, console.info and console.error

describe("Student APIs Test", function() {

    // Define varibale which will be used during each test
    var primaryId = null;
    var collegeId = null;
    var universityId = null;
    var highSchoolId = null;
    var primaryStudentId = null;
    var primaryStudent2Id = null;

    // Get all levels and store level id
    before(async () => {
        const response = await LevelServices.getAllLevels();
        if (response.status == constants.LEVELS_FOUND_SUCCESSFULLY) {
            for (var level of response.data) {
                switch (level.name) {
                    case "PRIMARY":
                        primaryId = level.id;
                    break;
                    case "COLLEGE":
                        collegeId = level.id;
                    break;
                    case "UNIVERSITY":
                        universityId = level.id;
                    break;
                    default:
                        highSchoolId = level.id;
                    break;
                }
            }
        }
    })

    // Test of API => POST /levels/:levelId/student 
    describe("Creation of New Student", function() {

        var studentBody = {
            firstName: "John",
            lastName: "Doe",
            birthday: "1995-03-03"
        }

        it("should create student successfully", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/student")
            .send(studentBody)
            .expect(201)
            .expect('Content-Type',/json/)
            .end(function(err, res) {
                if (err) return done(err);
                // Store student id in primary student id
                primaryStudentId = JSON.parse(res.text).data.id
                done();
            })
        });

        it("should not create the same student in same level", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/student")
            .send(studentBody)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create student while student first name is not found", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/student")
            .send(_.omit(studentBody, "firstName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create student while student last name is not found", function(done) {
            supertest(app)
            .post("/levels/" + universityId + "/student")
            .send(_.omit(studentBody, "lastName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create student while student birthday date is not found", function(done) {
            supertest(app)
            .post("/levels/" + highSchoolId + "/student")
            .send(_.omit(studentBody, "birthday"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create student while level not found", function(done) {
            supertest(app)
            .post("/levels/bad_id/student")
            .send(studentBody)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        })
    });

    // Test of API => GET /levels/:levelId/students
    describe("Get all Students of Level", function() {

        it("should get all students of level successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/students")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not get all students while level not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/students")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    // Test of API => GET /levels/:levelId/students/:studentId
    describe("Get a Student by its id", function() {

        it("should get student successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/students/" + primaryStudentId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get student while student not belongs to level", function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/students/" + primaryStudentId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get student while student doesn't exist in level" , function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/students/" + primaryStudentId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get student while level is not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/students/" + primaryStudentId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get student while student is not found", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/students/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => PUT /levels/:leveId/students/:studentId
    describe("Update Student by its id", function() {
        var newBodyOfStudent = {
            firstName: "John 1",
            lastName: "Doe 1",
            birthday: "1994-03-03"
        };
        
        var student2Body = {
            firstName: "John 2",
            lastName: "Doe 2",
            birthday: "1995-03-03"
        };

        before(async () => {
            const response = await StudentServices.createStudentOfLevel(primaryId, student2Body);
            if (response.status === constants.STUDENT_CREATED_SUCCESSFULLY) {
                primaryStudent2Id = response.data.id;
            }
        });

        it("should update student successfully", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/" + primaryStudentId)
            .send(newBodyOfStudent)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while the same student already exists in level", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/" + primaryStudentId)
            .send(student2Body)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while student first name not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/" + primaryStudentId)
            .send(_.omit(newBodyOfStudent, "firstName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while student last name not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/" + primaryStudentId)
            .send(_.omit(newBodyOfStudent, "lastName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while student birthday date not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/" + primaryStudentId)
            .send(_.omit(newBodyOfStudent, "birthday"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while student not belongs to level", function(done) {
            supertest(app)
            .put("/levels/" + collegeId + "/students/" + primaryStudentId)
            .send(newBodyOfStudent)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while level not found", function(done) {
            supertest(app)
            .put("/levels/bad_id/students/" + primaryStudentId)
            .send(newBodyOfStudent)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update student while student not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/students/bad_id")
            .send(newBodyOfStudent)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => DELETE /levels/:levelId/students/:studentId
    describe("Delete Student by its id", function() {
        // Create new student for test 
        var universityStudentId = null;
        before(async () => {
            var studentBody = {
                firstName: "John",
                lastName: "Doe",
                birthday: "1995-03-03"
            };
            const response = await StudentServices.createStudentOfLevel(universityId, studentBody);
            if (response.status === constants.STUDENT_CREATED_SUCCESSFULLY) {
                universityStudentId = response.data.id;
            }
        });

        it("should delete student successfully", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/students/" + universityStudentId)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete student while student not belongs to level", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/students/" + primaryStudentId)
            .expect(401)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete student while level not found", function(done) {
            supertest(app)
            .del("/levels/bad_id/students" + universityStudentId)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not delete student while student not found", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/students/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        // Delete student after all tests cases
        after(async () => {
            await StudentServices.deleteStudentById(universityStudentId);
        });
    });

    // Delete user which created during the success test
    after(async () => {
        await StudentServices.deleteStudentById(primaryStudentId);
        await StudentServices.deleteStudentById(primaryStudent2Id);
    })
});