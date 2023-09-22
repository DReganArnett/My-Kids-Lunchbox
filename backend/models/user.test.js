"use strict";

const db = require('../db.js');
const User = require('./user.js');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/****************************************************** authenticate  */
describe("authenticate", function () {
    test("works", async function() {
        let user = await User.authenticate("testuser1", "password");
        expect(user).toEqual({
            username: "testuser1",
            firstName: "First1",
            lastName: "Last1",
            email: "testuser1@email.com",
            diet: "standard",
            allergies: "none",
            preferences: "chocolate",
            aversions: "salad",
            id: expect.any(Number),
        });
    });

    test ("unauthorized if no such user", async function () {
        try {
            await User.authenticate("none", "password");
            fail(); 
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/****************************************************** register */

describe('register', function() {
    const newUser = {
        username: 'new',
        firstName: 'NewFirst',
        lastName: 'NewLast',
        email: 'new@email.com',
        diet: 'standard',
        allergies: 'none',
        preferences: 'everything',
        aversions: 'nothing',
    };

    test('works', async function() {
        let user  = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username='new'");
        expect(found.rows.length).toEqual(1);
    });

    test('bad request with duplicate user', async function() {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/****************************************************** findAll */

describe('findAll', function () {
    test('works', async function() {
        const users = await User.findAll();
        expect(users).toEqual([
            {   
                id: expect.any(Number),
                username: "testuser1",
                firstname: "First1",
                lastname: "Last1",
                email: "testuser1@email.com",
                diet: "standard",
                allergies: "none",
                preferences: "chocolate",
                aversions: "salad",
            },
            {
                id: expect.any(Number),
                username: "testuser2",
                firstname: 'First2',
                lastname: "Last2",
                email: "testuser2@email.com",
                diet: "vegetarian",
                allergies: "shellfish",
                preferences: "pasta",
                aversions: "meat",
            },
        ]);
    });
});

/****************************************************** get */

describe("get", function () {
    // test('works', async function () {
    //     let user = await User.get("testuser1");
    //     expect(user).toEqual({
    //         id: expect.any(Number),
    //         username: "testuser1",
    //         firstName: "First1",
    //         lastName: "Last1",
    //         email: "testuser1@email.com",
    //         diet: "standard",
    //         allergies: "none",
    //         preferences: "chocolate",
    //         aversions: "salad",
    //         "favorites" : [],
    //         "reviews": [
    //             {
    //                 "id": expect.any(Number),
    //                 "review_text" : "delicious",
    //                 "lunch_id" : "1",
    //                 "username" : "testuser1",
    //             },  
    //         ]
    //     });
    // });

    test("not found if no such user", async function () {
        try {
            await User.get("wrong");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/****************************************************** update */

describe("update", function() {
    const updateData = {
        id: expect.any(Number),
        username: "testuser1",
        firstName: "NewFirst",
        lastName: "Last1",
        email: "testuser1@email.com",
        diet: "standard",
        allergies: "none",
        preferences: "chocolate",
        aversions: "salad",
    };
    
    // test("works", async function () {
    //     let user = await User.update("testuser1", updateData);
    //     expect(user).toEqual({
    //         username: "testuser1",
    //         ...updateData,
    //     });
    // });

    test("not found if no such user", async function () {
        try {
          await User.update("wrong", {
            firstName: "test",
          });
          fail();
        } catch (err) {
          expect(err instanceof NotFoundError).toBeTruthy();
        }
      });
});

/****************************************************** remove */

describe("remove", function () {
    test("works", async function () {
      await User.remove("testuser1");
      const res = await db.query(
          "SELECT * FROM users WHERE username='testuser1'");
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such user", async function () {
      try {
        await User.remove("wrong");
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
  




// "use strict";

// const db = require('../db.js');
// const User = require('./user.js');

// const {
//     NotFoundError,
//     BadRequestError,
//     UnauthorizedError
// } = require("../expressError");

// const {
//     commonBeforeAll,
//     commonBeforeEach,
//     commonAfterEach,
//     commonAfterAll,
//     //testLunchIds,
//     //testUserIds,
//     //testFavoriteIds,
// } = require("./_testCommon");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

// /****************************************************** authenticate  */
// describe("authenticate", function () {
//     test("works", async function() {
//         let user = await User.authenticate("testuser1", "password");
//         expect(user).toEqual({
//             //id: expect.any(Number),
//             username: "testuser1",
//             firstName: "First1",
//             lastName: "Last1",
//             email: "testuser1@email.com",
//             diet: "standard",
//             allergies: "none",
//             preferences: "chocolate",
//             aversions: "salad",
//         });
//     });

//     test ("unauthorized if no such user", async function () {
//         try {
//             await User.authenticate("none", "password");
//             fail(); 
//         } catch (err) {
//             expect(err instanceof UnauthorizedError).toBeTruthy();
//         }
//     });
// });

// /****************************************************** register */

// describe('register', function() {
//     const newUser = {
//         username: 'new',
//         firstName: 'NewFirst',
//         lastName: 'NewLast',
//         email: 'new@email.com',
//         diet: 'standard',
//         allergies: 'none',
//         preferences: 'everything',
//         aversions: 'nothing',
//     };

//     test('works', async function() {
//         let user  = await User.register({
//             ...newUser,
//             password: "password",
//         });
//         expect(user).toEqual(newUser);
//         const found = await db.query("SELECT * FROM users WHERE username='new'");
//         expect(found.rows.length).toEqual(1);
//     });

//     test('bad request with duplicate user', async function() {
//         try {
//             await User.register({
//                 ...newUser,
//                 password: "password",
//             });
//             await User.register({
//                 ...newUser,
//                 password: "password",
//             });
//             fail();
//         } catch (err) {
//             expect(err instanceof BadRequestError).toBeTruthy();
//         }
//     });
// });

// /****************************************************** findAll */

// describe('findAll', function () {
//     test('works', async function() {
//         const users = await User.findAll();
//         expect(users).toEqual([
//             {   
//                 //id: testUserIds[0],
//                 id: expect.any(Number),
//                 username: "testuser1",
//                 firstname: "First1",
//                 lastname: "Last1",
//                 email: "testuser1@email.com",
//                 diet: "standard",
//                 allergies: "none",
//                 preferences: "chocolate",
//                 aversions: "salad",
//                 // favorites: [
//                 //     {
//                 //         username: "testuser1",
//                 //         lunchId: testLunchIds[0],
//                 //     }    
//                 // ]
//             },
//             {
//                 //id: testUserIds[1],
//                 id: expect.any(Number),
//                 username: "testuser2",
//                 firstname: 'First2',
//                 lastname: "Last2",
//                 email: "testuser2@email.com",
//                 diet: "vegetarian",
//                 allergies: "shellfish",
//                 preferences: "pasta",
//                 aversions: "meat",
//                 // favorites: [],
//             },
//         ]);
//     });
// });

// /****************************************************** get */

// describe("get", function () {
//     // test('works', async function () {
//     //     let user = await User.get("testuser1");
//     //     expect(user).toEqual({
//     //         //id: testUserIds[0],
//     //         id: expect.any(Number),
//     //         username: "testuser1",
//     //         firstName: "First1",
//     //         lastName: "Last1",
//     //         email: "testuser1@email.com",
//     //         diet: "standard",
//     //         allergies: "none",
//     //         preferences: "chocolate",
//     //         aversions: "salad",
//     //         "favorites" : [
//     //             {
//     //                 username: 'testuser1',
//     //                 lunch_id: testLunchIds[0],
//     //             }
//     //         ],        
//     //         "reviews": [
//     //             {
//     //                 id: testReviewIds[0],
//     //                 review_text : "delicious",
//     //                 lunch_id : "1",
//     //                 username : "testuser1",
//     //             },  
//     //         ],
//     //     });
//     // });

//     test("not found if no such user", async function () {
//         try {
//             await User.get("wrong");
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//         }
//     });
// });

// /****************************************************** update */

// describe("update", function() {
//     const updateData = {
//         //id: testUserIds[0],
//         id: expect.any(Number),
//         username: "testuser1",
//         firstName: "NewFirst",
//         lastName: "Last1",
//         email: "testuser1@email.com",
//         diet: "standard",
//         allergies: "none",
//         preferences: "chocolate",
//         aversions: "salad",
//     };
    
//     // test("works", async function () {
//     //     let user = await User.update("testuser1", updateData);
//     //     expect(user).toEqual({
//     //         username: "testuser1",
//     //         ...updateData,
//     //     });
//     // });

//     test("not found if no such user", async function () {
//         try {
//           await User.update("wrong", {
//             firstName: "test",
//           });
//           fail();
//         } catch (err) {
//           expect(err instanceof NotFoundError).toBeTruthy();
//         }
//       });
// });

// /****************************************************** remove */

// describe("remove", function () {
//     test("works", async function () {
//       await User.remove("testuser1");
//       const res = await db.query(
//           "SELECT * FROM users WHERE username='testuser1'");
//       expect(res.rows.length).toEqual(0);
//     });
  
//     test("not found if no such user", async function () {
//       try {
//         await User.remove("wrong");
//         fail();
//       } catch (err) {
//         expect(err instanceof NotFoundError).toBeTruthy();
//       }
//     });
//   });
  
