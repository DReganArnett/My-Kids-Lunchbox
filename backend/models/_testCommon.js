const bcrypt = require("bcrypt");
const db = require("../db.js");
const {BCRYPT_WORK_FACTOR} = require("../config.js");

async function commonBeforeAll() {
    // before starting the test, clear all tables
    await db.query("DELETE FROM favorites");
    await db.query("DELETE FROM reviews");
    await db.query("DELETE FROM lunches");
    await db.query("DELETE FROM users");
    
    await db.query(`
            INSERT INTO users (id, username, password, first_name, last_name, email, diet, allergies, preferences, aversions)
            VALUES (1, 'testuser1', $1, 'First1', 'Last1', 'testuser1@email.com', 'standard', 'none', 'chocolate', 'salad'),
                   (2, 'testuser2', $2, 'First2', 'Last2', 'testuser2@email.com', 'vegetarian', 'shellfish', 'pasta', 'meat')`,
        [
            await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
        ]);    

    await db.query(`
        INSERT INTO lunches (id, title, description, special_dietary_features, protein, carb, fruit, vegetable, fat, sweet, beverage)
        VALUES (1, 'Ham Sandwich', 'ham and cheese', 'none', 'ham', 'wheat bread', 'apple', 'baby carrots', 'american cheese', 'oreos', 'gatorade'),               
               (2, 'PBJ', 'peanut butter and jelly', 'none', 'peanut butter', 'sourdough bread', 'clementine', 'celery', 'string cheese', 'fruit leather', 'whole milk')`,       
    );
    
    await db.query(`
            INSERT INTO reviews (id, review_text, username, lunch_id)
            VALUES ('1', 'delicious', 'testuser1', 1)`,);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
};





    // await db.query(`
    //         INSERT INTO foods (food_title, category, serving_size, calories, fat_content, protein_content, carbohydrates, sugar)
    //         VALUES ('ham', 'protein', '3 oz', 180, 5, 3, 21, 11, 1),
    //                ('wheat bread', 'carb', '2 slices', 240, 2, 2, 30, 2, 1),
    //                ('apple', 'fruit', '1 apple', 59, 0, 0, 14, 11, 1),
    //                ('baby carrots', 'vegetable', '10 items, 30, 0, 0, 8.3, 4.8, 1),
    //                ('american cheese', 'fat', '1 slice', 80, 4, 2, 8.8, 6.2, 1),
    //                ('oreos', 'sweet', '3 cookies', 330, 8, 3, 45, 31, 1),
    //                ('gatorade', 'beverage', '12 oz', 105, 0, 0, 6.4, 5.3, 1),
    //                ('peanut butter', 'protein', '2 tbsp', 260, 16, 14, 12, 3, 2),
    //                ('sourdough bread', 'carb', '2 slices', 240, 2, 2, 24, 2, 2),
    //                ('clementine', 'fruit', '2 clementines', 80, 0, 0, 11, 8, 2),
    //                ('celery', 'vegetable', '5 sticks', 20, 0, 0, 1, 0.2, 2),
    //                ('string cheese', 'fat', '1 piece',  70, 2, 2, 2, 1, 2),
    //                ('fruit leather', 'sweet', '1 piece', 85, 1, 0.5, 21, 18, 2),
    //                ('whole milk', 'beverage', '8 oz', 100, 8, 10, 8, 10, 2)`);

  
//     await db.query(`
//             INSERT INTO lunch_foods (lunch_id, food_id)
//             VALUES  (1, 1),
//                     (1, 2),
//                     (1, 3),
//                     (1, 4),
//                     (1, 5),
//                     (1, 6),
//                     (1, 7),
//                     (2, 8),
//                     (2, 9),
//                     (2, 10),
//                     (2, 11),
//                     (2, 12),
//                     (2, 13),
//                     (2, 14)`); 
