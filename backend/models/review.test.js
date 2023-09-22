"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Review = require("./review.js");
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

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    let reviews = await Review.findAll();
    expect(reviews).toEqual([
      {
        id: expect.any(Number),
        reviewText: "delicious",
        username: "testuser1",
        lunchId: 1,
      },
    ]);
  });
});

// /************************************** get */

describe("get", function () {
  test("works", async function () {
    let review = await Review.get(1);
    expect(review).toEqual({
      id: 1,
      reviewText: "delicious",
      username: "testuser1",
      lunchId: 1,
    });
  });

  test("not found if no such review", async function () {
    try {
      await Review.get(900);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// /************************************** update */

describe("update", function () {
  let updateData = {
     reviewText: "Delicious!",
     username: "testuser1",
     lunchId: "1",
  };

  test("update", async function() {
    let review = await Review.update(1, updateData);
    expect(review).toEqual({
        id: 1,
        reviewText: "Delicious!",
        username: "testuser1",
        lunchId: 1,
    });
  });
})

// /************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Review.remove(1);
    const res = await db.query(
        "SELECT id FROM reviews WHERE id=1");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such review", async function () {
    try {
      await Review.remove(0);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
})

