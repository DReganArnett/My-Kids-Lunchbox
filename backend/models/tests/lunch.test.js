"use strict":

const db = require("../db.js");
const{ BadRequestError, NotFoundError} = require("../expressError");
const Lunch = require("../lunch.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************************************************************** create */

descripe("create", function() {
    const newLunch = {
        title: "New",
        description: "new description",
        protein: "newProtein",
        carb: "newCarb",
        fruit: "newFruit",
        vegetable: "newVegetable",
        fat: "newFat",
        sweet: "newSweet",
        beverage: "newBeverage",
    };

    test("works", async function () {
        let lunch = await Lunch.create(newLunch);
        expect(lunch).toEqual(newLunch);

        const result = await db.query(
                `SELECT id, title, description, protein, fruit, vegetable, fat, sweet, beverage
                 FROM lunches
                 WHERE title = "New"`);
        expect(result.rows).toEqual([
            {
                id: 1,
                title: "New",
                description: "new description",
                protein: "newProtein",
                fruit: "newFruit",
                vegetable: "newVegetable",
                fat: "newFat",
                sweet: "newSweet",
                beverage: "newBeverage",
            }
        ]);
    });

    test("bad request with duplicate", async function() {
        try{
            await Lunch.create(newLunch);
            await Lunch.create(newLunch);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});