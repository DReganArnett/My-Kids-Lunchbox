"use strict";

const request = require('supertest');
const app = require('../app');

const {
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
afterAll(commonAfterAll);


/** POST /auth/token *****************************************************************/

describe('POST /auth/token', function () {
    test('should successfully log in a user', async function() {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: "testuser1",
                password: "password",
            });
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });

    test('should not allow a user to log in with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: 'testuser1',
                password: 'wrong'
            });
        expect(response.statusCode).toEqual(401);
    });

    test("unauth with non-existent user", async function () {
        const resp = await request(app)
            .post("/auth/token")
            .send({
              username: "no-such-user",
              password: "password",
            });
        expect(resp.statusCode).toEqual(401);
      });

      test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/auth/token")
            .send({
              username: "testuser1",
            });
        expect(resp.statusCode).toEqual(400);
      });

      test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/auth/token")
            .send({
              username: 123,
              password: 456,
            });
        expect(resp.statusCode).toEqual(400);
      });  
      
});

/** POST auth/regiester ************************************************************ */
describe('POST /auth/register', function () {
    test('should successfully register a user', async function() {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser3',
                password: 'password',
                firstName: 'First3',
                lastName: 'Last3',
                email: 'testuser3@email.com',
                diet: 'standard',
                allergies: 'none',
                preferences: 'all',
                aversions: 'none',
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });

    test('should not register a user with a username already in the database', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'password'
            });
        expect(response.statusCode).toEqual(400); 
    });

    test("bad request with missing fields", async function () {
        const resp = await request(app)
            .post("/auth/register")
            .send({
              username: "testuser3",
            });
        expect(resp.statusCode).toEqual(400);
      });
});