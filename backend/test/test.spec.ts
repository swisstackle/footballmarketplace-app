import server from '../src/api/index';
import chai from "chai";
import chaiHttp from "chai-http";
import {describe } from 'mocha';
chai.should();
chai.use(chaiHttp);

describe("Happy Tests", () => {
    it("Server works", (done) => {
        chai.request(server)
        .get("/")
        .end((err: Error, response) => {
            response.status.should.be.equal(200);
            response.text.should.be.equal("Root route is working");
            done();
        });
    });
    it("Register User", (done) => {
        chai.request(server)
        .post("/users/register", )
        .send({username:"alain", password:"mypassword", address:"myaddress"})
        .end((err: Error, response) => {
            response.status.should.be.equal(200);
            response.text.should.be.equal("Success");
            done();
        });
    });
});