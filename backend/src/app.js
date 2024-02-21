const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const ApiError = require("./utils/apiError");
const httpStatus = require("http-status");
const app = express();

app.use(cors());
app.options("*", cors());

app.use(passport.initialize());

passport.use("jwt", jwtStrategy);
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `Not found: ${req.url}`));
});
module.exports = app;
