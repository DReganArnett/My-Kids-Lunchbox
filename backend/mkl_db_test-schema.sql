CREATE TABLE users(
    username VARCHAR(25) UNIQUE NOT NULL PRIMARY KEY,
    id INT, 
    password TEXT, 
    first_name TEXT,
    last_name TEXT,
    email TEXT CHECK (position('@' IN email) > 1),
    diet TEXT,
    allergies TEXT,
    preferences TEXT,
    aversions TEXT,
    lunches TEXT
);

CREATE TABLE lunches (
    id INT PRIMARY KEY, 
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
    id INT PRIMARY KEY,  
    review_text TEXT,
    username VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    lunch_id INTEGER 
        REFERENCES lunches ON DELETE CASCADE
);


CREATE TABLE favorites (
    username VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    lunch_id INT
        REFERENCES lunches ON DELETE CASCADE,
    PRIMARY KEY (username, lunch_id)
);