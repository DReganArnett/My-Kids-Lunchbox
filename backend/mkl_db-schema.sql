CREATE TABLE users(
    username VARCHAR(25) UNIQUE NOT NULL PRIMARY KEY,
    id SERIAL, 
    password TEXT NOT NULL, 
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    diet TEXT,
    allergies TEXT,
    preferences TEXT,
    aversions TEXT,
    lunches TEXT
);

CREATE TABLE lunches (
    id SERIAL PRIMARY KEY, 
    title TEXT,  
    description TEXT,   
    protein TEXT,
    carb TEXT,
    fruit TEXT,
    vegetable TEXT,
    fat TEXT,
    sweet TEXT,
    beverage TEXT,
    special_dietary_features TEXT
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  
    review_text TEXT NOT NULL,
    username VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    lunch_id INTEGER 
        REFERENCES lunches ON DELETE CASCADE
);

CREATE TABLE favorites (
    username VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    lunch_id INTEGER
        REFERENCES lunches ON DELETE CASCADE,
    PRIMARY KEY (username, lunch_id)
);

-- CREATE TABLE foods (
--     id SERIAL PRIMARY KEY,
--     title TEXT NOT NULL,
--     category TEXT NOT NULL,
--     serving_size TEXT,
--     calories TEXT,
--     fat TEXT,
--     protein TEXT,
--     carbohydrates TEXT,
--     sugar TEXT,
--     lunch_id TEXT
--         REFERENCES lunches
-- );

-- CREATE TABLE lunch_foods (
--     lunch_id INTEGER    
--         REFERENCES lunches,
--     food_id INTEGER
--         REFERENCES foods
-- );


