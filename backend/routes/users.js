"use strict";

const jsonschema = require("jsonschema");

const express = require('express');
const User = require("../models/user");
const Review = require("../models/review");
const favoriteNewSchema = require('../schemas/favoriteNew')
const reviewUpdateSchema = require('../schemas/reviewUpdate')
const {BadRequestError} = require("../expressError");
const router = new express.Router();

/** ROUTES FOR USERS */

/** GET / => { users: [id, username, firstName, lastName, email, diet, allergies, preferences, aversions, favorites}, ... ] 
 *  Returns list of all users */
router.get("/", async function(req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({users});
    } catch (err) {
        return next(err);
    }
});

/** GET /users/[username]: gets a specific user
  * Returns a specific user */
router.get("/:username", async function(req, res, next) {
    try {
        let username = req.params.username;
        const user = await User.get(username);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

// /** GET /users/[id]: gets a user's username by id */
// router.get("/username/:id", async function (req, res, next) {
//     try {
//         const username = await User.getUsername(req.params.id);
//         return res.json({username});
//     } catch (err) {
//         return next(err);
//     }
// });

/** PATCH /[username] { user } => { user }: updates a user */
router.patch("/:username", async function (req, res, next) {
    try {
        const user = await User.update(req.params.username, req.body);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

/** DELETE users/[username]: deletes user, return status */
router.delete("/:username", async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({deleted: req.params.username});
    } catch (err) {
        return next(err);
    }
});

/** GET (gets all favorites of a user) /[username]/favorites */
router.get("/:username/favorites", async function (req, res, next) {
    try {
        const favorites = await User.getUserFavorites(req.params.username);
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
});

/** POST (adds a favorite) /[username]/lunches/[id] {state} => {favorite} 
 *  Returns {"favorited": lunchId}
*/
router.post("/:username/lunches/:id", async function (req, res, next) {
    try {
        const username = req.params.username;
        const lunchId = +req.params.id;
        await User.addFavorite(username, lunchId);
        return res.json({favorited: lunchId});
    } catch (err) {
        return next(err);
    }
});

/** DELETE (removes a favorite) /[username]/lunches/[id] {state} => {favorite}
 *  Returns {"unfavorited": lunchId}
 */
router.delete("/:username/lunches/:id", async function (req, res, next) {
    try {
        const username = req.params.username;
        const lunchId = +req.params.id;
        await User.removeFavorite(username, lunchId)
        return res.json({unfavorited: lunchId});
    } catch (err) {
        return  next(err);
    }
});

/** PATCH /reviews/[reviewId] {fld} => {review}
 *  Updates a review given its id and new data
 *  Data can include: {reviewText}
 *  Returns (id, reviewText, userId, lunchId)
 */
// router.patch("/reviews/:id", async function (req, res, next) {
//     try{
//         const validator = jsonschema.validate(req.body, reviewUpdateSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }
//         const review = await Review.update(req.params.id, req.body);
//         return res.json({review});
//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = router; 