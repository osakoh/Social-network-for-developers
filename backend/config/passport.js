const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users"); // from the model
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// passport: from server js-> require("./config/passport")(passport);
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            // user is found
            return done(null, user);
          } else {
            // user not found
            return done(null, false);
          }
        })
        .catch((err) => console.log(err));
    })
  );
};

/***
 * options: is an object literal containing options to control how the token is extracted 
 * from the request or verified.
 * jwt_payload: is gotten from jwt.sign() in server.js; it's an object literal containing the decoded JWT payload.
   done: the first passport error callback that accepts arguments done(error, user, info)
 */
