/**
 * @name utility.test.js
 * @description
 *      This file is the test of utility API.
 */

const supertest = require("supertest");
const app = require("../app.js");
console.log = console.info = console.error  = function() {}; // Disabled console.log and console.error

// Test of API => GET /objects/count
describe("Utility API Test", function() {
    it("should count the number of objects which stored in databse", function(done) {
        supertest(app)
        .get("/objects/count")
        .expect(200)
        .expect('Content-Type',/json/)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        })
    });
})