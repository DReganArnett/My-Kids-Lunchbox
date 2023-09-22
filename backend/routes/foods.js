"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const Food = require("../models/food");
const foodNewSchema = require("../schemas/foodNew.json");
const foodUpdateSchema = require("../schemas/foodUpdate.json");
const foodSearchSchema = require("../schemas/foodSearch.json");
const router = express.Router({mergeParams: true});


/** ROUTES FOR FOODS */

/** POST /{food} => {food}
 *  Adds a food to the database
 *  Food should be {foodTitle, category, servingSize, calories, fatContent, proteinContent, carbodydrates, sugar, lunchId}
 *  Returns {id, foodTitle, category, servingSize, calories, fatContent, proteinContent, carbodydrates, sugar, lunchId}
 */
router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, foodNewSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const food = await Food.create({...req.body});
        return res.status(201).json({food});
    } catch (err) {
        return next(err);
    }
});

/** GET / => 
 *  Gets all foods, or filtered search results
 *  {foods: [{id, title, category, servingSize, calories, fat, protein, carbodydrates, sugar, lunchId}, ...]}
 *  Can provide search filter in query:
 *  - title (will find case-insensitive, partial matches)
 *  - category (will find case-insensitive, partial matches)
 */
router.get("/", async function (req, res, next) {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, foodSearchSchema);
        if (!validator.valid) {
            const errs  = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const foods = await Food.findAll(q);
        return res.json({foods});
    } catch (err) {
        return next(err);
    }
});

/** GET /[id] => {food} 
 *  Gets a food given its id
 * Returns {id, foodTitle, category, servingSize, calories, fatContent, proteinContent, carbohydrates, sugar, lunchId}
*/
router.get("/:id", async function (req, res, next) {
    try {
        const food = await Food.get(req.params.id);
        return res.json({food});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id] {fld1, fld2, ...} => {food}
 *  Updates a food given its id and new data
 *  Returns {id, foodTitle, category, servingSize, calories, fatContent, proteinContent, carbohydrates, sugar, lunchId}
 */
router.patch("/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, foodUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const food = await Food.update(req.params.id, req.body);
        return res.json({food});
    } catch (err) {
        return next (err);
    }
});

/** DELETE /[id] => {deleted: id}
 *  Deletes a food from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try{
        await Food.remove(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;