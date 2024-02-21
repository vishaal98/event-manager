const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenTypes } = require("./tokens");
const User = require("../models/user_model");
require("dotenv").config();

// console.log(process.env.JWT_SECRETE)
const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      return done(new Error("Invalid token type", false));
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
