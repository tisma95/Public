/**
 * @name classroom.test.js
 * @description
 *      This file is the test of classroom APIs.
 */

const supertest = require("supertest");
const app = require("../app.js");
const constants = require("../constants/constants.js");
const _ = require("lodash");
const LevelServices = require("../services/LevelServices.js");
const ClassroomServices = require("../services/ClassroomServices.js");

console.log = console.info = console.error  = function() {}; // Disabled console.log, console.info and console.error

describe("Classroom APIs Test", function() {

    // Define varibale which will be used during each test
    var primaryId = null;
    var collegeId = null;
    var universityId = null;
    var highSchoolId = null;
    var universityClassroomId = null;
    var universityClassroom2Id = null;

    // Get all levels and store level id
    before(async () => {
        const response = await LevelServices.getAllLevels();
        if (response.status == constants.LEVELS_FOUND_SUCCESSFULLY) {
            for (var level of response.data) {
                switch (level.name) {
                    case "PRIMARY":
                        universityId = level.id;
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

    // Test of API => POST /levels/:levelId/classroom 
    describe("Creation of New Classroom", function() {

        var classroomBody = {
            name: "Master 1",
            capacity: 12
        }

        it("should create classroom successfully", function(done) {
            supertest(app)
            .post("/levels/" + universityId + "/classroom")
            .send(classroomBody)
            .expect(201)
            .expect('Content-Type',/json/)
            .end(function(err, res) {
                if (err) return done(err);
                // Store classroom id in primary classroom id
                universityClassroomId = JSON.parse(res.text).data.id
                done();
            })
        });

        it("should not create the same classroom in same level", function(done) {
            supertest(app)
            .post("/levels/" + universityId + "/classroom")
            .send(classroomBody)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create classroom while classroom's name is not found", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/classroom")
            .send(_.omit(classroomBody, "name"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create classroom while classroom's capacity is not found", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/classroom")
            .send(_.omit(classroomBody, "capacity"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create classroom while classroom's capacity is not greater than 0", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/classroom")
            .send(_.set(classroomBody, "capacity", 0))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create classroom while level not found", function(done) {
            supertest(app)
            .post("/levels/bad_id/classroom")
            .send(classroomBody)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        })
    });

    // Test of API => GET /levels/:levelId/classrooms
    describe("Get all Classrooms of Level", function() {

        it("should get all classrooms of level successfully", function(done) {
            supertest(app)
            .get("/levels/" + universityId + "/classrooms")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not get all classrooms while level not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/classrooms")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    // Test of API => GET /levels/:levelId/classrooms/:classroomId
    describe("Get a Classroom by its id", function() {

        it("should get classroom successfully", function(done) {
            supertest(app)
            .get("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get classroom while classroom not belongs to level", function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/classrooms/" + universityClassroomId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get classroom while classroom doesn't exist in level" , function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/classrooms/" + universityClassroomId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get classroom while level is not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/classrooms/" + universityClassroomId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get classroom while classroom is not found", function(done) {
            supertest(app)
            .get("/levels/" + universityId + "/classrooms/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => PUT /levels/:leveId/classrooms/:classroomId
    describe("Update Classroom by its id", function() {
        var newBodyOfClassroom = {
            name: "Master 2",
            capacity: 20
        };
        
        var classroom2Body = {
            name: "Master 1",
            capacity: 25
        };

        before(async () => {
            const response = await ClassroomServices.createClassroomOfLevel(universityId, classroom2Body);
            if (response.status === constants.CLASSROOM_CREATED_SUCCESSFULLY) {
                universityClassroom2Id = response.data.id;
            }
        });

        it("should update classroom successfully", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .send(newBodyOfClassroom)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while the same classroom already exists in level", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .send(classroom2Body)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while classroom's name not found", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .send(_.omit(newBodyOfClassroom, "name"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while classroom's capacity not found", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .send(_.omit(newBodyOfClassroom, "capacity"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while classroom's capacity is not greater than 0", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/" + universityClassroomId)
            .send(_.set(newBodyOfClassroom, "capacity", 0))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while classroom not belongs to level", function(done) {
            supertest(app)
            .put("/levels/" + collegeId + "/classrooms/" + universityClassroomId)
            .send(newBodyOfClassroom)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while level not found", function(done) {
            supertest(app)
            .put("/levels/bad_id/classrooms/" + universityClassroomId)
            .send(newBodyOfClassroom)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update classroom while classroom not found", function(done) {
            supertest(app)
            .put("/levels/" + universityId + "/classrooms/bad_id")
            .send(newBodyOfClassroom)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => DELETE /levels/:levelId/classrooms/:classroomId
    describe("Delete Classroom by its id", function() {
        // Create new classroom for test 
        var collegeClassroomId = null;
        before(async () => {
            var classroomBody = {
                name: "First Degree",
                capacity: 25
            };
            const response = await ClassroomServices.createClassroomOfLevel(collegeId, classroomBody);
            if (response.status === constants.CLASSROOM_CREATED_SUCCESSFULLY) {
                collegeClassroomId = response.data.id;
            }
        });

        it("should delete classroom successfully", function(done) {
            supertest(app)
            .del("/levels/" + collegeId + "/classrooms/" + collegeClassroomId)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete classroom while classroom not belongs to level", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/classrooms/" + collegeClassroomId)
            .expect(401)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete classroom while level not found", function(done) {
            supertest(app)
            .del("/levels/bad_id/classrooms" + collegeClassroomId)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not delete classroom while classroom not found", function(done) {
            supertest(app)
            .del("/levels/" + collegeId + "/classrooms/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        // Delete classroom after all tests cases
        after(async () => {
            await ClassroomServices.deleteClassroomById(universityClassroomId);
        });
    });

    // Delete user which created during the success test
    after(async () => {
        await ClassroomServices.deleteClassroomById(universityClassroomId);
        await ClassroomServices.deleteClassroomById(universityClassroom2Id);
    })
});