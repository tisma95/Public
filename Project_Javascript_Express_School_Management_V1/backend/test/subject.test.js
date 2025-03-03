/**
 * @name subject.test.js
 * @description
 *      This file is the test of subject APIs.
 */

const supertest = require("supertest");
const app = require("../app.js");
const constants = require("../constants/constants.js");
const _ = require("lodash");
const LevelServices = require("../services/LevelServices.js");
const SubjectServices = require("../services/SubjectServices.js");

console.log = console.info = console.error  = function() {}; // Disabled console.log, console.info and console.error

describe("Subject APIs Test", function() {

    // Define varibale which will be used during each test
    var primaryId = null;
    var collegeId = null;
    var universityId = null;
    var highSchoolId = null;
    var primarySubjectId = null;
    var primarySubject2Id = null;

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

    // Test of API => POST /levels/:levelId/subject 
    describe("Creation of New Subject", function() {

        var subjectBody = {
            name: "Science"
        }

        it("should create subject successfully", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/subject")
            .send(subjectBody)
            .expect(201)
            .expect('Content-Type',/json/)
            .end(function(err, res) {
                if (err) return done(err);
                // Store subject id in primary subject id
                primarySubjectId = JSON.parse(res.text).data.id
                done();
            })
        });

        it("should not create the same subject in same level", function(done) {
            supertest(app)
            .post("/levels/" + primaryId + "/subject")
            .send(subjectBody)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create subject while subject's name is not found", function(done) {
            supertest(app)
            .post("/levels/" + collegeId + "/subject")
            .send(_.omit(subjectBody, "name"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not create subject while level not found", function(done) {
            supertest(app)
            .post("/levels/bad_id/subject")
            .send(subjectBody)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        })
    });

    // Test of API => GET /levels/:levelId/subjects
    describe("Get all Subjects of Level", function() {

        it("should get all subjects of level successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/subjects")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });

        it("should not get all subjects while level not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/subjects")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    // Test of API => GET /levels/:levelId/subjects/:subjectId
    describe("Get a Subject by its id", function() {

        it("should get subject successfully", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/subjects/" + primarySubjectId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get subject while subject not belongs to level", function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/subjects/" + primarySubjectId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get subject while subject doesn't exist in level" , function(done) {
            supertest(app)
            .get("/levels/" + collegeId + "/subjects/" + primarySubjectId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get subject while level is not found", function(done) {
            supertest(app)
            .get("/levels/bad_id/subjects/" + primarySubjectId)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not get subject while subject is not found", function(done) {
            supertest(app)
            .get("/levels/" + primaryId + "/subjects/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => PUT /levels/:leveId/subjects/:subjectId
    describe("Update Subject by its id", function() {
        var newBodyOfSubject = {
            name: "Informatic"
        };
        
        var subject2Body = {
            name: "Mathematic"
        };

        before(async () => {
            const response = await SubjectServices.createSubjectOfLevel(primaryId, subject2Body);
            if (response.status === constants.SUBJECT_CREATED_SUCCESSFULLY) {
                primarySubject2Id = response.data.id;
            }
        });

        it("should update subject successfully", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/subjects/" + primarySubjectId)
            .send(newBodyOfSubject)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update subject while the same subject already exists in level", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/subjects/" + primarySubjectId)
            .send(subject2Body)
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update subject while subject's name not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/subjects/" + primarySubjectId)
            .send(_.omit(newBodyOfSubject, "name"))
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update subject while subject not belongs to level", function(done) {
            supertest(app)
            .put("/levels/" + collegeId + "/subjects/" + primarySubjectId)
            .send(newBodyOfSubject)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update subject while level not found", function(done) {
            supertest(app)
            .put("/levels/bad_id/subjects/" + primarySubjectId)
            .send(newBodyOfSubject)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not update subject while subject not found", function(done) {
            supertest(app)
            .put("/levels/" + primaryId + "/subjects/bad_id")
            .send(newBodyOfSubject)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
        });
    });

    // Test of API => DELETE /levels/:levelId/subjects/:subjectId
    describe("Delete Subject by its id", function() {
        // Create new subject for test 
        var universitySubjectId = null;
        before(async () => {
            var subjectBody = {
                name: "Science"
            };
            const response = await SubjectServices.createSubjectOfLevel(universityId, subjectBody);
            if (response.status === constants.SUBJECT_CREATED_SUCCESSFULLY) {
                universitySubjectId = response.data.id;
            }
        });

        it("should delete subject successfully", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/subjects/" + universitySubjectId)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete subject while subject not belongs to level", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/subjects/" + primarySubjectId)
            .expect(401)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
        });

        it("should not delete subject while level not found", function(done) {
            supertest(app)
            .del("/levels/bad_id/subjects" + universitySubjectId)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        it("should not delete subject while subject not found", function(done) {
            supertest(app)
            .del("/levels/" + universityId + "/subjects/bad_id")
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });

        // Delete subject after all tests cases
        after(async () => {
            await SubjectServices.deleteSubjectById(universitySubjectId);
        });
    });

    // Delete user which created during the success test
    after(async () => {
        await SubjectServices.deleteSubjectById(primarySubjectId);
        await SubjectServices.deleteSubjectById(primarySubject2Id);
    })
});