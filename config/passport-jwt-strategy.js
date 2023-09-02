const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codieal",
};

//see the documentation of the passport JWT to write this part of code

passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    //jwt_payload bcoz it contains the encrypted info of the user
    User.findOne(jwt_payload.id, function (err, user) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
