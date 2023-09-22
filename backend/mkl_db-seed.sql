-- all test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, diet, allergies, preferences, aversions)
VALUES ('testUser1', 'password', 'Adam', 'Smith', 'adam@smith.com', 'standard', null, 'chocolate', 'salad'),
       ('testUser2', 'password', 'Amy', 'Miller', 'amy@miller.com', 'vegetarian', 'shellfish', 'cheese', 'meat'),
       ('testUser3', 'password', 'David', 'Grant', 'david@grant.com', 'dairy-free', 'dairy', 'cantaloupe', 'asparagus');


INSERT INTO lunches (title, description, special_dietary_features, protein, carb, fruit, vegetable, fat, sweet, beverage)
VALUES ('Ham Sandwich', 'ham and cheese sandwich on wheat bread with an apple, baby carrots, oreos, and gatorade', 'standard', 'ham', 'wheat bread', 'apple', 'baby carrots', 'american cheese', 'oreos', 'gatorade'),
       ('PBJ', 'Peanut butter and grape jelly on sourdough bread with a clementine, celery sticks, string cheese, and whole milk', 'standard', 'peanut butter', 'sourdough bread', 'clementine', 'celery', 'string cheese', 'grape jelly', 'whole milk'),
       ('Yogurt Parfait', 'Plain yogurt, granola and blueberries layered in a cup with water, cucumbers and ginger snaps', 'vegetarian', 'plain yogurt', 'granola', 'blueberries', 'cucumbers', 'none', 'ginger snaps', 'water'),
       ('Turkey Sandwich', 'Turkey with mayonnaise on rye bread with a banana, green bell peppers, fruit gummies and iced tea', 'standard', 'turkey', 'rye bread', 'banana', 'green bell pepper', 'mayonnaise', 'fruit gummies', 'iced tea');


INSERT INTO favorites (username, lunch_id)
VALUES  (testUser1, 1),
        (testUser1, 3) , 
        (testUser1, 4),
        (IsaacR, 1),
        (IsaacR, 2),  
        (IsaacR, 3),
        (IsaacR, 4);

INSERT INTO reviews (review_text, username, lunch_id)
VALUES ('Delicious!  I love ham!', testUser1, 1),
       ('I am allergic!', testUser2, 2),
       ('Classic! Reminds me of being a kid!', testUser3, 2),
       ('Boring and disappointing to find in a lunchbox.', testUser1, 2);
     
-- INSERT INTO foods (food_title, category, serving_size, calories, fat_content, protein_content, carbohydrates, sugar, lunch_id)
-- VALUES ('Ham', 'protein', '100 g', '141.6', '5g', '22.2g', '1g', '1.1g', 1),
--        ('Wheat Bread', 'carb', '100g', '273.8', '3.2g', '10.6g', '49.3g', '4.1g', 1),
--        ('Honecrisp Apple', 'fruit', '100g', '52.5', '0g', '0g', '14g', '10.3g', 1),
--        ('Baby Carrots', 'vegetable', '100g', '34.8', '0g', '0g', '8.3g', '4.8g', 1),
--        ('American Cheese', 'fat', '100g', '312', '23g', '17g', '8.8g', '6.2g', 1),
--        ('Oreo Cookies', 'sweet', '100g', '472', '20.8g', '3g', '74.5g', '41.5g', 1),
--        ('Gatorade', 'beverage', '100g', '26', '0g', '0g', '6.4mg', '5.3g', 1),
--        ('Peanut Butter', 'protein', '100g', '579', '49.6g', '22.1g', '24g', '6.5g', 2),
--        ('Sourdough bread', 'carb', '2 slices', '240', '2g', '2g', '24g', '2g', 2),
--        ('Clementine', 'fruit', '100g', '47', '0g', '0.8g', '11.8g', '9.2g', 2),
--        ('Celery Sticks', 'vegetable', '100g', '17.9', '0g', '0g', '4g', '2.4g', 2),
--        ('String Cheese', 'fat', '100g',  '296.6', '22.3g', '22g', '2g', '1g', 2),
--        ('Grape Jelly', 'sweet', '10g', '268.2', '0g', '0.1g', '69.3g', '50.8g', 2),
--        ('Whole Milk', 'beverage', '100g', '62.5', '3.2g', '4g', '4.8g', '5g', 2),
--        ('Plain Yogurt', 'protein', '100g', '61.5', '1.5g', '5.3g', '7g', '7.1g', 3),
--        ('Granola', 'carb', '100g', '475.7', '23.9g', '13.6g', '54.2g', '20g', 3),
--        ('Blueberries', 'fruit', '100g', '55.7', '0g', '0.7g', '14.8g', '10.3g', 3),
--        ('Water', 'beverage', '100g', '0', '0g', '0g', '0g', '0g', 3),
--        ('Ginger Snaps', 'sweet', '100g', '425', '9.8g', '5.7g', '75.7g', '20.1g', 3),
--        ('Cucumber', 'vegetable', '100g', '15.3', '0g', '0g', '3.7g', '1.7g', 3),
--        ('Turkey', 'protein', '100g', '193.1', '7.4g', '28.6g', '0.1g', '0g', 4),
--        ('Rye Bread', 'carb', '100g', '260', '3.4g', '8.5g', '48.8g', '3.9g', 4),
--        ('Mayonnaise', 'fat', '100g', '689.3', '74.4g', '0.9g', '0.6g', '0.6g', 4),
--        ('Banana', 'fruit', '100g', '89.4', '0g', '1g', '23.2g', '12.3g', 4),
--        ('Green Bell Pepper', 'vegetable', '100g', '27.3', '0g', '0g', '6.6g', '3.2g', 4),
--        ('Fruit Gummies', 'sweet', '100g', '358.1', '0g', '0g', '89.3g', '68.4g', 4),
--        ('Apple Juice', 'beverage', '100g', '46.7', '0g', '0g', '11.2g', '9.6g', 4);



-- INSERT INTO lunch_foods (lunch_id, food_id)
-- VALUES  (1, 45),
--         (1, 42),
--         (1, 43),
--         (1, 41),
--         (1, 44),
--         (1, 47),
--         (1, 46),
--         (2, 48),
--         (2, 49),
--         (2, 50), 
--         (2, 51), 
--         (2, 52),
--         (2, 53),
--         (2, 54),
--         (3, 55),
--         (3, 56),
--         (3, 57),
--         (3, 58),
--         (3, 60),
--         (3, 59),
--         (4, 63),
--         (4, 64),
--         (4, 67),
--         (4, 61),
--         (4, 68),
--         (4, 69),
--         (4, 65); 

