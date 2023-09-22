"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Lunch  = require("../models/lunch");
const Review = require("../models/review");
const {createToken} = require("../helpers/tokens");

async function commonBeforeAll() {
    await db.query("DELETE FROM reviews");
    await db.query("DELETE FROM favorites");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lunches");
    
    await User.register({
        id: 1,
        username: "testuser1", 
        password: "password", 
        firstName: "First1", 
        lastName: "Last1", 
        email: "testuser1@email.com", 
        diet: "standard", 
        allergies: "none", 
        preferences: "chocolate", 
        aversions: "salad",
    });

    await User.register({
        id: 2,
        username: "testuser2", 
        password: "password", 
        firstName: "First2", 
        lastName: "Last2", 
        email: "testuser2@email.com", 
        diet: "vegetarian", 
        allergies: "shellfish", 
        preferences: "pasta", 
        aversions: "meat",
    });
    
    await Lunch.create({
        id: 1,
        title: "ham sandwich", 
        description: "ham and cheese",
        specialDietaryFeatures: "none",
        protein:"ham", 
        carb: "wheat bread", 
        fruit: "apple", 
        vegetable: "baby carrots", 
        fat: "american cheese", 
        sweet: "oreos", 
        beverage: "gatorade",
    });
    
    await Lunch.create({
        id: 2,
        title: "PBJ", 
        description: "peanut butter and jelly",
        specialDietaryFeatures: "none",
        protein: "peanut butter", 
        carb: "sourdough bread", 
        fruit: "clementine", 
        vegetable: "celery", 
        fat: "string cheese", 
        sweet: "fruit leather", 
        beverage: "whole milk",
    });
  
    // await Review.create({
    //     reviewText: 'delicious', 
    //     username: 'testuser1', 
    //     lunchId: '1',
    // });
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

const testuser1Token = createToken({username: 'testuser1'});
const testuser2Token = createToken({username: 'testuser2'});


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testuser1Token,
    testuser2Token,
};



// await Food.create(
    //     {foodTitle: 'ham', category: 'protein', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'wheat bread', category: 'carb', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'apple', category: 'fruit', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'baby carrots', category: 'vegetable', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {fooTitle: 'american cheese', category: 'fat', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'oreos', category: 'sweet', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbodhydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'gatorade', category: 'beverage', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(               
    //     {foodTitle: 'peanut butter', category: 'protein', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'rye bread', category: 'carb', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'clementine', category: 'fruit', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'celery', category: 'vegetable', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'string cheese', category: 'fat', servingSize: '100g',  calories: '1',  fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'fruit leather', category: 'sweet', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    // await Food.create(
    //     {foodTitle: 'whole milk', category: 'beverage', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
            
// await LunchFood.create(
    //     {lunchId: 1, foodId: 1,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 2,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 3,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 4,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 5,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 6,});
    // await LunchFood.create(
    //     {lunchId: 1, foodId: 7,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 8,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 9,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 10,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 11,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 12,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 13,});
    // await LunchFood.create(
    //     {lunchId: 2, foodId: 14,});    