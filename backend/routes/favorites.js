"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const Favorite = require("../models/favorite");
const favoriteUpdateSchema = require("../schemas/favoriteUpdate.json");
const favoriteNewSchema = require("../schemas/favoriteNew.json");
const router = express.Router({mergeParams: true});

/** ROUTES FOR FAVORITES */

/** POST /{favorite} => {favorite}
 *  Adds a favorite to the database
 *  Favorite should be {userId, lunchId, isFavorite}
 *  Returns {id, userId, LunchId, isFavorite}
 */
router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, favoriteNewSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const favorite = await Favorite.create(req.body);
        return res.status(201).json({favorite});
    } catch (err) {
        return next(err);
    }
});

/** GET / 
 *  Gets all favorites
 *  Returns {id, userId, lunchId, isFavorite}
 */
router.get("/", async function (req, res, next) {
    try {
        const favorites = await Favorite.findAll();
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
}); 

/** GET /[userId] => {favorites}
 *  Gets favorites associated with a user
 *  Returns {id, lunchId, isFavorite}
 */
router.get("/user/:id", async function (req, res, next) {
    try {
        const favorites = await Favorite.findAllFavoritesOnUser(req.params.id);
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
});

/** GET /[lunchId] => {favorites}
 *  Gets favorites associated wih a lunch
 *  Returns {id, userId, isFavorite}
 */
router.get("/lunch/:id", async function (req, res, next) {
    try {
        const favorites = await Favorite.findAllFavoritesOnLunch(req.params.id);
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id] {fld1, fld2, ...} => {favorite}
 *  Updates a favorite given it's lunchId and isFavorite status
 *  Returns {id, userId, lunchId, isFavorite}
 */
router.patch("/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, favoriteUpdateSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const favorite = await Favorite.updateFavorite(req.params.id, req.body);
        return res.json({favorite});
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id] => {deleted: id}
 *  Deletes a favorite from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try {
        await Favorite.removeFavorite(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;