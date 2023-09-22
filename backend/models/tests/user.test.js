"use strict";

const db = require('../../db');
const User = require('../user');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../../expressError");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/****************************************************** authenticate  */
describe("authenticate", function () {
    test("works", async function() {
        const user = await User.authenticate("testuser1", "password");
        expect(user).toEqual({
            username: "testuser1",
            firstName: "First1",
            lastName: "last1",
            email: 'testuser1@email.com',
            diet: 'standard',
            allergies: "none",
            preferences: "chocolate",
            aversions: "salad",
        });
    });

    test ("unauthorized if no such user", async function () {
        try {
            await User.authenticate("none", "password");
            fail(); 
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
})