"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
} = require("../expressError");

const {BCRYPT_WORK_FACTOR} = require("../config.js");

/** METHODS FOR USERS */

class User {
    /** Authenticate user with username and password
     *  Returns {username, first_name, last_name, email, diet, allergies, preferences, aversions}
     *  Throws Unauthorizederror if user is not found or password is invalid
     */
    static async authenticate(username, password) {
        // look for user
        const result = await db.query(
                `SELECT id,
                    username, 
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    diet,
                    allergies,
                    preferences,
                    aversions
                FROM users
                WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid= await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username or password");
    }

    /** Register user with data
    *   Returns {id, username, password, firstName, lastName, email}
    *   Throws BadRequestError on duplicates
    */
    static async register({username, password, firstName, lastName, email, diet, allergies, preferences, aversions}) {
        const duplicateCheck = await db.query(
                `SELECT username
                 FROM users
                 WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword  = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
                `INSERT INTO users
                (username, 
                 password,
                 first_name, 
                 last_name,
                 email,
                 diet,
                 allergies,
                 preferences,
                 aversions)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING username, first_name AS "firstName", last_name AS "lastName", email, diet, allergies, preferences, aversions`,
            [
                username, 
                hashedPassword,
                firstName, 
                lastName,
                email,
                diet,
                allergies,
                preferences, 
                aversions,
            ],
        );

        const user = result.rows[0];
        return user;
    }

    /** Find all users
     *  Returns [{id, username, first_name, last_name, email, diet, allergies, preferences, aversions},...]
     */
    static async findAll() {
        const result = await db.query(
                `SELECT id,
                        username, 
                        first_name AS firstName,
                        last_name AS lastName,
                        email,
                        diet,
                        allergies,
                        preferences, 
                        aversions
                 FROM users
                 ORDER BY username`,
        );
        return result.rows;
    }

    /** Given a username , return data about that user
     *  Returns {id, username, first_name, last_name, email, diet, allergies, preferences, aversions}
    */
    static async get(username) {
        const userRes = await db.query(
                `SELECT username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        diet,
                        allergies,
                        preferences,
                        aversions
                 FROM users
                 WHERE username = $1`,
            [username],
        );
        
        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        const userFavoritesRes = await db.query(
                    `SELECT f.lunch_id
                     FROM favorites AS f
                     WHERE f.username = $1`,
                [username]);
        
        user.favorites = userFavoritesRes.rows.map(f => f.lunch_id);

        const userReviewsRes = await db.query(
                    `SELECT r.id,
                            r.review_text,
                            r.lunch_id,
                            r.username
                     FROM reviews AS r
                     WHERE r.username = $1`,
                [username]);
        
        user.reviews = userReviewsRes.rows;

        return user;
    }

    /** Updates user data with `data 
     *  This is a "partial update" -- it's find if data doesn't contain all
     *  the fields; this only changes provided ones
     * 
     *  Data can include: 
     *      {firstName, lastName, email, diet, allergies, preferences, aversions}
     *  Returns {id, username, firstName, lastName, email, diet, preferences, aversions}
     *  Throws NotFoundError if not found
    */
    static async update(username, data) {
        if(data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName:  "last_name",
            });
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    id,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    diet,
                                    allergies,
                                    preferences,
                                    aversions`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    /** Delete a given user from database; returns undefined */
    static async remove(username) {
        let result = await db.query(
                `DELETE
                 FROM users
                 WHERE username = $1
                 RETURNING username`,
            [username],     
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);
    }

    /** Adds a lunch to user's favorites list */
    static async addFavorite(username, lunchId) {
        const preCheck = await db.query(
              `SELECT id
               FROM lunches
               WHERE id = $1`, [lunchId]);
        const lunch = preCheck.rows[0];
    
        if (!lunch) throw new NotFoundError(`No lunch: ${lunchId}`);
    
        const preCheck2 = await db.query(
              `SELECT username
               FROM users
               WHERE username = $1`, [username]);
        const user = preCheck2.rows[0];
    
        if (!user) throw new NotFoundError(`No user: ${username}`);
    
        await db.query(
              `INSERT INTO favorites (lunch_id, username)
               VALUES ($1, $2)`,
            [lunchId, username]);
    }

    /** Gets all favorites associated with a user */
    static async getUserFavorites(username) {
        let res = await db.query(
                `SELECT username,
                        lunch_id AS "lunchId"
                     FROM favorites 
                     WHERE username = $1`,
                [username]);
        const favorites = res.rows;
        return favorites;
    }

    /** Removes a lunch from users favorites list */
    static async removeFavorite(username, lunchId) {
        await db.query(
                `DELETE 
                 FROM favorites
                 WHERE username = $1
                 AND lunch_id = $2`,
            [username, lunchId]
        );
    }

    
    
}

module.exports = User;