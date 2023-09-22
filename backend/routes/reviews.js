"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const Review = require("../models/review");
const reviewNewSchema = require("../schemas/reviewNew");
const reviewUpdateSchema = require("../schemas/reviewUpdate");
const reviewSearchSchema = require("../schemas/reviewSearch");

const router = express.Router({mergParams: true});

/** ROUTES FOR REVIEWS */

/** POST / {review} => {review} 
 *  Adds a review to database
 *  Review should be {reviewText, username, lunchId}
 *  Returns {id, username,lunchId}
 */
router.post("/", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, reviewNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const review = await Review.create(req.body);
        return res.status(201).json({review});
    } catch (err) {
        return next(err);
    }
});

/** GET / => {reviews: [{id, reviewText, username, lunchId}, ...]} 
 *  Gets all reviews
*/
router.get("/", async function (req, res, next) {
    const q = req.query;  
    try {
        const validator = jsonschema.validate(q, reviewSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const reviews = await Review.findAll(q);
        return res.json({reviews});
    } catch (err) {
        return next(err);
    }
});

/** GET /[reviewId] => {review}
 *  Gets specific review by its id
 *  Returns {id, reviewText, username, lunchId}
 */
router.get("/:id", async function (req, res, next) {
    try {
        const review = await Review.get(req.params.id);
        return res.json({review});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /reviews/[reviewId] {fld} => {review}
 *  Updates a review given its id and new data
 *  Data can include: {reviewText}
 *  Returns (id, reviewText, userId, lunchId)
 */
router.patch("/:id", async function (req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, reviewUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const review = await Review.update(req.params.id, req.body);
        return res.json({review});
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[reviewId] => {deleted: id}
 *  Deletes a review from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try{
        await Review.remove(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});


module.exports = router;