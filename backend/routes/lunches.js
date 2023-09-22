"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const Lunch = require("../models/lunch");
const lunchNewSchema = require("../schemas/lunchNew.json");
const lunchUpdateSchema = require("../schemas/lunchUpdate");
const lunchSearchSchema = require("../schemas/lunchSearch.json");

const router = express.Router({mergeParams: true});

/** ROUTES FOR LUNCHES */

/** POST / {lunch} => {lunch} 
 *  Adds a lunch to database
 *  Lunch should be {title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage}
 *  Returns {id, title, description, special_dietary_features AS "specialDietaryFeatures", protein, carb, fruit, vegetable, fat, sweet, beverage}
 */
router.post("/", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, lunchNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const lunch = await Lunch.create(req.body);
        return res.status(201).json({lunch});
    } catch (err) {
        return next(err);
    }
});

/** GET / => {lunches: [{id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, bevereage, userId}, ...]} 
 *  Gets all lunches or search results
 *  Can provide search filter in query: title, description, specialDietaryFeatures
 */ 
 
router.get("/", async function (req, res, next) {
    const q = req.query;  
    
    try {
        const validator = jsonschema.validate(q, lunchSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const lunches = await Lunch.findAll(q);
        return res.json({lunches});
    } catch (err) {
        return next(err);
    }
});

/** GET /[lunchId] => {lunch}
 *  Gets specific lunch by its id
 *  Returns {id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage}
 */
router.get("/:id", async function (req, res, next) {
    try {
        const lunch = await Lunch.get(req.params.id);
        return res.json({lunch});
    } catch (err) {
        return next(err);
    }
});

/** GET /[diet] => {lunch}
 *  Gets lunches by diet type
 *  Returns {id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage}
 */
router.get("/:diet", async function (req, res, next) {
    try {
        const lunches = await Lunch.get(req.params.diet);
        return res.json({lunches});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[lunchId] {fld1, fld2, ...} => {lunch}
 *  Updates a lunch given its id and new data
 *  Data can include: {title, protein, carb, fruit, vegetable, fat, sweet, beverage}
 *  Returns (id, title, protein, carb, fruit, vegetable, fat, sweet, beverage)
 */
router.patch("/:id", async function (req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, lunchUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const lunch = await Lunch.update(req.params.id, req.body);
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