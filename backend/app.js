"use strict";

/** EXPRESS APP FOR My_kids_lunch */

const express = require('express');
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const {authenticateJWT} = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const foodsRoutes = require("./routes/foods");
const lunchRoutes = require("./routes/lunches");
const reviewRoutes = require("./routes/reviews");
// const favoriteRoutes = require("./routes/favorites");
const lunchFoodsRoutes = require("./routes/lunchFoods");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/foods", foodsRoutes);
app.use("/lunches", lunchRoutes);
app.use("/reviews", reviewRoutes);
// app.use("/favorites", favoriteRoutes);
app.use("/lunchfoods", lunchFoodsRoutes);


// app.use(express.json());


/** ERROR HANDLING */

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
});

module.exports = app;