"use strict";

const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR REVIEWS */

class Review {
    
    /** Creates a review (from data), update db, return new review data
     *  Data should include {id, reviewText, username, lunchId}
     */
    static async create ({reviewText, username, lunchId}) {
       const result = await db.query(
                `INSERT INTO reviews
                 (review_text, username, lunch_id)
                 VALUES ($1, $2, $3)
                 RETURNING id, review_text AS "reviewText", username, lunch_id AS "lunchId"`,
            [
                reviewText,
                username,
                lunchId,
            ],
       );
       const review = result.rows[0];
       return review;
    }

    /** Finds all reviews
     *  Returns [{id, reviewText, username, lunchId}, ...]
     */
    static async findAll() {
        let query = `SELECT id,
                            review_text AS "reviewText",
                            username,
                            lunch_id AS "lunchId"
                     FROM reviews`;
        
        query += " ORDER BY id";
        const reviewRes = await db.query(query);
        return reviewRes.rows;
    }

    /** Given a review id, return data about a review
     *  Returns [{id, reviewText, username, lunchId}, ...]
     *  Throws NotFoundError if review is not found
     */
    static async get(id) {
        const reviewRes = await db.query(
                `SELECT id,
                        review_text AS "reviewText",
                        username,
                        lunch_id AS "lunchId"
                 FROM reviews
                 WHERE id = $1`,
            [id]);
        
        const review = reviewRes.rows[0];

        if (!review) throw new NotFoundError(`No review found: ${id}`);

        return review;
    }

    /** Update reviewText with data
     *  Returns {id, reviewText, userId, lunchId}
     *  Throws NotFoundError if review is not found
     */
    static async update(id, data) {
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                reviewText: "review_text",
                username: "username",
                lunchId: "lunch_id",
            });
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE reviews
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id, 
                                    review_text AS "reviewText",
                                    username,
                                    lunch_id AS "lunchId"`
        const result = await db.query(querySql, [...values, id]);
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`No review found: ${id}`);

        return review;                             
    }

    /** Deletes a given review from database; returns undefined
     *  Throws NotFoundError if review is not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE 
                 FROM reviews
                 WHERE id = $1
                 RETURNING id`,
            [id]);
        const review = result.rows[0];
        if (!review) throw new NotFoundError(`No review found: ${id}`);
    }

}

module.exports = Review;