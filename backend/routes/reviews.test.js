"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testuser1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /reviews */

describe("GET /reviews", function () {
  test("not found if no reviews", async function() {
    const resp = await request(app).get(`/reviews/7`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** GET /reviews/:id */

describe("GET /reviews/:id", function () {
    test("not found for no such review", async function () {
        const resp = await request(app).get(`/reviews/999`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /reviews/:id */

describe("PATCH /reviews/:id", function () {
  test("not found on no such review", async function () {
    const resp = await request(app)
        .patch(`/reviews/999`)
        .send({
          reviewText: "newText",
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** DELETE /reviews/:id */

describe("DELETE /reviews/:id", function () {
  
  test("not found for no such review", async function () {
    const resp = await request(app)
        .delete(`/reviews/999`)
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
