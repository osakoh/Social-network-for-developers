// authentication

const express = require("express");
const router = express.Router(); // express router
const gravatar = require("gravatar"); // gravatar
const bcrypt = require("bcryptjs"); // for password encryption

const User = require("../../models/User"); // load user model

// @route       GET api/users/test
// @description Tests users route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route       GET api/users/register
// @description User Registration
// @access      Public
router.post("/register", (req, res) => {
  // check if email exist
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // return a 400 response with a value of 'Email already exits'
        return res.status(400).json({ email: "Email already exits" });
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

module.exports = router;

/**
 * body-parser module: used to extract the entire body portion of an incoming request stream and make it
 * available to req.body. The middleware was a part of Express.js earlier(version <=3) but now(version >=4)
 * it has to be installed separately. It is used to handle HTTP POST request in Express.js
 */
