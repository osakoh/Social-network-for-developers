// authentication

const express = require("express");
const router = express.Router(); // express router
const gravatar = require("gravatar"); // gravatar
const bcrypt = require("bcryptjs"); // for password encryption
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport"); // for protected routes

const validateRegisterationInput = require("../../validation/register"); //for validating user input
const validateLoginInput = require("../../validation/login"); //for validating user input

const User = require("../../models/User"); // load user model

// @route       GET api/users/test
// @description Tests users route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route       GET api/users/register
// @description User Registration
// @access      Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterationInput(req.body);

  // validate user input: check if errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if email exist
  User.findOne({ email: req.body.email })
    .then((user) => {
      errors.email = "Email already exits"; // add email error to error object
      if (user) {
        // return a 400 response with a value of 'Email already exits'
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // size
          r: "pg", // rating
          d: "mm", // default pic
        });

        // new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, // avatar: avatar,
          password: req.body.password,
        });

        // generate salt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; // set the password to the hashed password
            newUser
              .save() // saves the user
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch();
});

// @route       GET api/users/login
// @description Returns user token(JWT) / Login user
// @access      Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // validate user input: check for errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // use email to find user; {email:email}
  User.findOne({ email }).then((user) => {
    // email check:
    if (!user) {
      errors.email = "User not found"; // add email error to error object
      // user doesn't exist
      return res.status(404).json(errors); // return 404 status
    }

    // password check: compare(text, hashed_password)
    bcrypt.compare(password, user.password).then((isMatch) => {
      // user passes authentication / password match
      if (isMatch) {
        // payload:what should be included in the token
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        // Sign asynchronously: generates the token
        jwt.sign(
          // default algorithm: HS256
          payload,
          keys.secretOrKey, // secretOrPrivateKey is a string, buffer, or object containing either the secret for HMAC algorithms
          { expiresIn: 3600 }, // expiresIn: time span in seconds
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        ); // expiresIn: user is logged out after 1hr
      } else {
        errors.password = "Incorrect password"; // add password error to error object
        // password doesn't match
        return res.status(400).json(errors);
      }
    });
  });
});

// @route       GET api/users/current
// @description Returns the current user
// @access      Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  }
);

module.exports = router;

/**
 * body-parser module: used to extract the entire body portion of an incoming request stream and make it
 * available to req.body. The middleware was a part of Express.js earlier(version <=3) but now(version >=4)
 * it has to be installed separately. It is used to handle HTTP POST request in Express.js
 */
