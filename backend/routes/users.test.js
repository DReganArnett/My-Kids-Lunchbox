"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds,
  testLunchIds,
  testFavoriteIds,
  testReviewIds,
  testuser1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users */

describe("GET /users", function () {
  test("works", async function () {
    const resp = await request(app)
        .get("/users")
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({
      users: [
        {
            id: expect.any(Number),
            username: "testuser1",
            firstname: "First1",
            lastname: "Last1",
            email: "testuser1@email.com",
            diet: "standard",
            allergies: "none",
            preferences: "chocolate",
            aversions: "salad",
        },
        {
            id: expect.any(Number),
            username: "testuser2",
            firstname: "First2",
            lastname: "Last2",
            email: "testuser2@email.com",
            diet: "vegetarian",
            allergies: "shellfish",
            preferences: "pasta",
            aversions: "meat",
        },
      ],
    });
  });
});

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("not found if user not found", async function () {
    const resp = await request(app)
        .get(`/users/nope`)
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works", async function () {
    const resp = await request(app)
        .patch(`/users/testuser1`)
        .send({
          firstName: "NewFirst",
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({
      user: {
        id: expect.any(Number),
        username: "testuser1",
        firstName: "NewFirst",
        lastName: "Last1",
        email: "testuser1@email.com",
        diet: "standard",
        allergies: "none",
        preferences: "chocolate",
        aversions: "salad",
      },
    });
  });

  test("works: can set new password", async function () {
    const resp = await request(app)
        .patch(`/users/testuser1`)
        .send({
          password: "new-password",
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({
      user: {
        //id: testUserIds[0],
        id: expect.any(Number),
        username: "testuser1",
        firstName: "First1",
        lastName: "Last1",
        email: "testuser1@email.com",
        diet: "standard",
        allergies: "none",
        preferences: "chocolate",
        aversions: "salad",
      },
    });
    const isSuccessful = await User.authenticate("testuser1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/users/testuser1`)
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({ deleted: "testuser1" });
  });
});


