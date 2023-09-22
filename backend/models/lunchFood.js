"use strict";

const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");


/** METHODS FOR LUNCHFOODS */

class LunchFood {

    /** Creates a lunchFood (from data), update db, return new lunchFood data
     *  Data should include {lunchId, foodId}
     *  Throws BadRequestError if lunch already in database
     */
    static async create ({lunchId, foodId}) {
        // const duplicateCheck = await db.query(
        //         `SELECT lunch_id AS "lunchId",
        //                  food_id AS "foodId",
        //          FROM lunchFoods
        //          WHERE lunch_id = $1 AND food_id = $2`,
        //     {lunchId, foodId});

        // if (duplicateCheck.rows[0])
        //     throw new BadRequestError(`Duplicate lunchFood: ${id}`);
        
        const result = await db.query(
                `INSERT INTO lunchFoods
                 (lunch_id, food_id)
                 VALUES ($1, $2)
                 RETURNING id, lunch_id AS "lunchId", food_id AS "foodId"`,
            [
                lunchId, 
                foodId,
            ],
        );
        const lunchFood = result.rows[0];
        
        return lunchFood;
    }

    /** Given a lunch id, return foods associated with that lunch.
   *
   **/
   static async getFoodsForLunch(lunchId) {
    const lunchFoodsRes = await db.query(
        `SELECT id,
                lunch_id AS "lunchId",
                food_id AS "foodId"  
        FROM lunch_foods
        WHERE lunch_id = $1`,
    [lunchId]);

    const lunchFoods = lunchFoodsRes.rows;

    if (!lunchId) throw new NotFoundError(`No lunch found: ${id}`);
    
    return lunchFoods;
   }

    /** Given a food id, return lunches associated with that food.
   *
   **/
    static async getLunchesForFood(foodId) {
        const foodLunchesRes = await db.query(
            `SELECT id,
                    lunch_id AS "lunchId",
                    food_id AS "foodId"  
            FROM lunch_foods
            WHERE food_id = $1`,
        [foodId]);
    
        const foodLunches = foodLunchesRes.rows;
    
        if (!foodId) throw new NotFoundError(`No food found: ${id}`);
        
        return foodLunches;
    }

    /** Update lunchFood data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   * Data can include: {id, lunch_id, food_id}
   * Returns [{id, lunch_id, food_id}, ...]
   * Throws NotFoundError if id not found.
   */
    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(data, {});
        
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE lunchFoods 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    lunch_id AS "lunchId",
                                    food_id AS "foodId"`
        const result = await db.query(querySql, [...values, id]);
        const lunchFood = result.rows[0];
    
        if (!id) throw new NotFoundError(`No lunch found: ${id}`);
    
        return lunchFood;
      }
    
      /** Delete given lunchFood from database; returns undefined.
       * Throws NotFoundError if id not found.
       **/
    static async remove(id) {
        const result = await db.query(
              `DELETE
               FROM lunchFoods
               WHERE id = $1
               RETURNING id`,
            [id]);
        const lunchFood = result.rows[0];
    
        if (!id) throw new NotFoundError(`No record found: ${id}`);
    }
}

module.exports = LunchFood;