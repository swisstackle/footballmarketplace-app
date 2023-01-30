const server = require('../dist/index.js');
const chai = require("chai");
let chaiHttp = require("chai-http");
const { describe, it } = require('node:test');

chai.should();
chai.use(chaiHttp);

describe("Happy Test", () => {
    it("Server works", (done) => {
        chai.request(server)
        .get("/")
        .end((err, response) => {
            response.should.have.status(200);
            response.text.should.be.equal("Root route is working");
            done();
        });
    });
});
