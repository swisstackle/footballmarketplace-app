const { InsertResult } = require('typeorm').InsertResult;
const {init, app} = require('../dist/api/index');
const User = require('../dist/db/entities/user.entity').User;
const logger = require('../dist/logger');
const datasource = require('../dist/db/connection').datasource;
const chai = require('chai');
const chaihttp = require('chai-http');
const bcrypt = require('bcrypt');
const express = require('express');

chai.use(chaihttp);
let server;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Happy Tests for Service", () => {
    beforeAll(async () => {
        const pw = await bcrypt.hash("apassword", 10);
        server = await init();
        await datasource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
        address: "testaddress",
        name: "testusername",
        iscoach: false,
        password: pw
      })
      .execute();
      await datasource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
        address: "testcoachaddress",
        name: "testcoach",
        iscoach: true,
        password: pw
      })
      .execute();
    });
    it("Register Service passed", (done) => {
        chai.request(app)
        .post('/services/requestRegisterService')
        .send({address: "testaddress", name: "servicename.", description: "servicedesc.", password: "apassword"})
        .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
        });
    });
    it("Admit Service passed", (done) => {
        //jest.spyOn(datasource.createQueryBuilder().insert().into(User).values(Any), 'execute').mockImplementation(() => { return "test";})
        chai.request(app)
        .post('/services/admitservice')
        .send({address: "testcoachaddress", name: "servicename.", password: "apassword"})
        .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
        });
    });
    it("Buy Service passed", (done) => {
        //jest.spyOn(datasource.createQueryBuilder().insert().into(User).values(Any), 'execute').mockImplementation(() => { return "test";})
        chai.request(app)
        .post('/services/buy')
        .send({address: "testaddress", name: "servicename.", password: "apassword"})
        .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
        });
        server.close();
    });
});
