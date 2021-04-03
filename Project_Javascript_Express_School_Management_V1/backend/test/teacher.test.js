/**
 * @name teacher.test.js
 * @description
 *      This file is the test of teacher APIs.
 */

const supertest = require("supertest");
const app = require("../app.js");
const constants = require("../constants/constants.js");
const _ = require("lodash");
const LevelServices = require("../services/LevelServices.js");
const TeacherServices = require("../services/TeacherServices.js");

console.log = console.info = console.error  = function() {}; // Disabled console.log, console.info and console.error

describe("Teacher APIs Test", function() {

    // Define varibale which will be used during each test
    var primaryId = null;
    var collegeId = null;
    var universityId = null;
    var highSchoolId = null;
    var primaryTeacherId = null;
    var primaryTeacher2Id = null;

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

    // Test of API => POST /levels/:levelId/teacher 
    describe("Creation of New Teacher", function() {

        var teacherBody = {
            firstName: "John",
            lastName: "Doe",
            birthday: "1995-03-03"
        }

        it("should create teacher successfully", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/teacher")
            .send(teacherBody)
            .expect(201)
            .expect('Content-Type',/json/)
            .end(function(err, res) {
                if (err) return done(err);
                // Store teacher id in primary teacher id
                primaryTeacherId = JSON.parse(res.text).data.id
                done();
            })
        });

        it("should not create the same teacher in same level", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/teacher")
            .send(teacherBody)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create teacher while teacher first name is not found", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/teacher")
            .send(_.omit(teacherBody, "firstName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create teacher while teacher last name is not found", function(done) {
            supertest(app)
            .post("/levels/" + universityId + "/teacher")
            .send(_.omit(teacherBody, "lastName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create teacher while teacher birthday date is not found", function(done) {
            supertest(app)
            .post("/levels/" + highSchoolId + "/teacher")
            .send(_.omit(teacherBody, "birthday"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create teacher while level not found", function(done) {
            supertest(app)
            .post("/levels/bad_id/teacher")
            .send(teacherBody)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        })
    });

    // Test of API => GET /levels/:levelId/teachers
    describe("Get all Teachers of Level", function() {

        it("should get all teachers of level successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/teachers")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not get all teachers while level not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/teachers")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    // Test of API => GET /levels/:levelId/teachers/:teacherId
    describe("Get a Teacher by its id", function() {

        it("should get teacher successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get teacher while teacher not belongs to level", function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/teachers/" + primaryTeacherId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get teacher while teacher doesn't exist in level" , function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/teachers/" + primaryTeacherId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get teacher while level is not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/teachers/" + primaryTeacherId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get teacher while teacher is not found", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/teachers/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => PUT /levels/:leveId/teachers/:teacherId
    describe("Update Teacher by its id", function() {
        var newBodyOfTeacher = {
            firstName: "John 1",
            lastName: "Doe 1",
            birthday: "1994-03-03"
        };
        
        var teacher2Body = {
            firstName: "John 2",
            lastName: "Doe 2",
            birthday: "1995-03-03"
        };

        before(async () => {
            const response = await TeacherServices.createTeacherOfLevel(primaryId, teacher2Body);
            if (response.status === constants.TEACHER_CREATED_SUCCESSFULLY) {
                primaryTeacher2Id = response.data.id;
            }
        });

        it("should update teacher successfully", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .send(newBodyOfTeacher)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while the same teacher already exists in level", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .send(teacher2Body)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while teacher first name not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .send(_.omit(newBodyOfTeacher, "firstName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while teacher last name not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .send(_.omit(newBodyOfTeacher, "lastName"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while teacher birthday date not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/" + primaryTeacherId)
            .send(_.omit(newBodyOfTeacher, "birthday"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while teacher not belongs to level", function(done) {
            supertest(app)
            .put("/levels/" + collegeId + "/teachers/" + primaryTeacherId)
            .send(newBodyOfTeacher)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while level not found", function(done) {
            supertest(app)
            .put("/levels/bad_id/teachers/" + primaryTeacherId)
            .send(newBodyOfTeacher)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update teacher while teacher not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/teachers/bad_id")
            .send(newBodyOfTeacher)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => DELETE /levels/:levelId/teachers/:teacherId
    describe("Delete Teacher by its id", function() {
        // Create new teacher for test 
        var universityTeacherId = null;
        before(async () => {
            var teacherBody = {
                firstName: "John",
                lastName: "Doe",
                birthday: "1995-03-03"
            };
            const response = await TeacherServices.createTeacherOfLevel(universityId, teacherBody);
            if (response.status === constants.TEACHER_CREATED_SUCCESSFULLY) {
                universityTeacherId = response.data.id;
            }
        });

        it("should delete teacher successfully", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/teachers/" + universityTeacherId)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete teacher while teacher not belongs to level", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/teachers/" + primaryTeacherId)
            .expect(401)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete teacher while level not found", function(done) {
            supertest(app)
            .del("/levels/bad_id/teachers" + universityTeacherId)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not delete teacher while teacher not found", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/teachers/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        // Delete teacher after all tests cases
        after(async () => {
            await TeacherServices.deleteTeacherById(universityTeacherId);
        });
    });

    // Delete user which created during the success test
    after(async () => {
        await TeacherServices.deleteTeacherById(primaryTeacherId);
        await TeacherServices.deleteTeacherById(primaryTeacher2Id);
    })
});