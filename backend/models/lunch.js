"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR LUNCHES */

class Lunch {

    /** Creates a lunch (from data), update db, return new lunch data
     *  Data should include {id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage}
     *  Throws BadRequestError if lunch already in database
     */
    static async create ({title, description, protein, carb, fruit, vegetable, fat, sweet, beverage, specialDietaryFeatures}) {
        const duplicateCheck = await db.query(
                `SELECT title
                 FROM lunches
                 WHERE title = $1`,
            [title]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate lunch: ${title}`);
        
        const result = await db.query(
                `INSERT INTO lunches 
                (title, description, protein, carb, fruit, vegetable, fat, sweet, beverage, special_dietary_features)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                 RETURNING id, title, description, protein, carb, fruit, vegetable, fat, sweet, beverage, special_dietary_features AS "specialDietaryFeatures"`,
            [
                title, 
                description,
                protein,
                carb,
                fruit,
                vegetable,
                fat,
                sweet, 
                beverage,
                specialDietaryFeatures 
            ],
        );
        const lunch = result.rows[0];
        
        return lunch;
    }

    /** Finds all lunches (optional filter on searchFilters) 
     *  searchFilters (all optional): title)
     *  Returns [{id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage, favorite}, ...]
    */
    static async findAll(searchFilters = {}) {
        let query = `SELECT id,
                            title,
                            description,
                            special_dietary_features AS "specialDietaryFeatures",
                            protein,
                            carb,
                            fruit,
                            vegetable,
                            fat,
                            sweet,
                            beverage
                     FROM lunches`;
        let whereExpressions = [];
        let queryValues = [];

        const {title, description} = searchFilters;

        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL

        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (description) {
            queryValues.push(`%${description}%`);
            whereExpressions.push(`description ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results

        query += " ORDER BY title";
        const lunchesRes = await db.query(query, queryValues);
        return lunchesRes.rows;
    }


    /** Given a lunch id, return data about lunch.
   *
   * Returns [{id, title, description, specialDietaryFeatures, protein, carb, fruit, vegetable, fat, sweet, beverage, favorite}, ...]
   * Throws NotFoundError if lunch not found.
   **/
   static async get(id) {
        const lunchRes = await db.query(
            `SELECT id,
                    title,
                    description,
                    special_dietary_features AS "specialDietaryFeatures",
                    protein,
                    carb, 
                    fruit,
                    vegetable, 
                    fat, 
                    sweet,
                    beverage
            FROM lunches
            WHERE id = $1`,
        [id]);

        const lunch = lunchRes.rows[0];

        if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);
        
        const reviewsRes = await db.query (
                `SELECT id, review_text AS "reviewText", username, lunch_id AS "lunchId"
                FROM reviews
                WHERE lunch_id = $1
                ORDER BY id`,
            [id], 
        );

        lunch.reviews = reviewsRes.rows;

        return lunch;
    }

    /** Update lunch data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   * Data can include: {id, title, description, protein, carb, fruit, vegetable, fat, sweet, beverage}
   * Returns [{id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}, ...]
   * Throws NotFoundError if lunch not found.
   */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(data, {});
        
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE lunches 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    title,
                                    description,
                                    protein,
                                    carb,
                                    fruit,
                                    vegetable,
                                    fat,
                                    sweet,
                                    beverage,
                                    special_dietary_features AS "specialDietaryFeatures"`
        const result = await db.query(querySql, [...values, id]);
        const lunch = result.rows[0];
    
        if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);
    
        return lunch;
      }
    
      /** Delete given lunch from database; returns undefined.
       * Throws NotFoundError if lunch not found.
       **/
    static async remove(id) {
        const result = await db.query(
              `DELETE
               FROM lunches
               WHERE id = $1
               RETURNING id`,
            [id]);
        const lunch = result.rows[0];
    
        if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);
    }

}

module.exports = Lunch;




/** Given a diet type, return lunches that match */
    // static async getByDiet(diet) {
    //     const lunchRes = await db.query( 
    //                     `SELECT id,
    //                         title, 
    //                         description,
    //                         special_dietary_features AS "specialDietaryFeatures",
    //                         protein,
    //                         carb,
    //                         fruit,
    //                         vegetable,
    //                         fat, 
    //                         sweet,
    //                         beverage
    //                  FROM lunches
    //             WHERE special_dietary_features = $1`,
    //         [diet]);
        
    //     const lunch = lunchRes.rows[0];

    //     if (!lunch) throw new NotFoundError(`No lunch found: ${specialDietaryFeatures}`);

    //     return lunch;
    // }

    // lunch_food is abbreviated with j because it is a junction table

        // const foodsRes = await db.query(
        //        `SELECT f.*
        //          FROM lunch_foods AS j
        //          JOIN foods AS f ON j.food_id = f.id
        //          WHERE j.lunch_id=$1`,
        //     [id]); 

        // lunch.foods = foodsRes.rows;
