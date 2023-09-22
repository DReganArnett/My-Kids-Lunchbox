"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const LunchFood = require("../models/lunchFood");
const lunchFoodNewSchema = require("../schemas/lunchFoodNew.json");
const lunchFoodUpdateSchema = require("../schemas/lunchFoodUpdate.json");


const router = express.Router({mergeParams: true});

/** ROUTES FOR LunchFoods */

/** POST / {lunch} => {lunch} 
 *  Adds a lunch to database
 *  Lunch should be {title, protein, carb, fruit, vegetable, fat, sweet, beverage, userId}
 *  Returns {id, title, protein, carb, fruit, vegetable, fat, sweet, beverage, userId}
 */
router.post("/", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, lunchFoodNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const lunch = await LunchFood.create(req.body);
        return res.status(201).json({lunch});
    } catch (err) {
        return next(err);
    }
});

/** GET /[lunchId] => {lunchFoods}
 *  Gets foods associated with a lunch by lunchId
 */
router.get("/lunches/:id", async function (req, res, next) {
    try {
        console.log(typeof req.params.id)
        const lunchFoods = await LunchFood.getFoodsForLunch(req.params.id);
        return res.json({lunchFoods});
    } catch (err) {
        return next(err);
    }
});

/** GET /[foodId] => {foodLunches}
 *  Gets lunches associated with a food by foodId
 *  Returns {id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}
 */
router.get("/foods/:id", async function (req, res, next) {
    try {
        console.log(typeof req.params.id)
        const foodLunches = await LunchFood.getLunchesForFood(req.params.id);
        return res.json({foodLunches});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id] {fld1, fld2, ...} => {lunchFood}
 *  Updates a lunchFood given its id and new data
 *  Data can include: {lunch_id, food_id}
 *  Returns (id, lunch_id, food_id)
 */
router.patch("/:id", async function (req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, lunchFoodUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const lunch = await LunchFood.update(req.params.id, req.body);
        return res.json({lunch});
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[lunchId] => {deleted: id}
 *  Deletes a lunch from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try{
        await Lunch.remove(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});


module.exports = router;