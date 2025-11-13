/**
 * @name level.test.js
 * @description
 *      This file is the test of Level APIs.
 */

const supertest = require("supertest");
const app = require("../app.js");
console.log = console.info = console.error  = function() {}; // Disabled console.log and console.error

// Test of API => GET /levels
describe("Level APIs Test", function() {
    
    it("should get all default levels which stored in database", function(done) {
        supertest(app)
        .get("/levels")
        .expect(200)
        .expect('Content-Type',/json/)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        })
    });
});