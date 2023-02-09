
const { InsertResult } = require('typeorm').InsertResult;
const {init, teardownDb, app} = require('../dist/api/index');
const User = require('../dist/db/entities/user.entity').User;
const datasource = require('../dist/db/connection').datasource;
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);
let server;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Happy Tests for Users", () => {
    beforeAll(async () => {
        server = await init();
    });
    afterAll(async () => {
        await server.close();
    });
    describe("Register User Tests", () => {
        it("Happy Test", (done) => {
            //jest.spyOn(datasource.createQueryBuilder().insert().into(User).values(Any), 'execute').mockImplementation(() => { return "test";})
            chai.request(app)
            .post('/users/register')
            .send({address: "anaddress", username: "aname", password: "apassword"})
            .end((err, res) => {
                expect(err).toBe(null);
                expect(res.status).toBe(200);
                done();
            });
            
        });
    });
    describe("Register Coach Tests", () => {
        it("Happy Test", (done) => {
            chai.request(app)
            .post('/users/registercoach')
            .send({address: "coachaddress", username: "coachcole2", password: "apassword"})
            .end((err, res) => {
                expect(err).toBe(null);
                expect(res.status).toBe(200);
                done();
            });
            
        });
    });
    
});
