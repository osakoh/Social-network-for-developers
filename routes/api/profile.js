// location, bio, social network links

const express = require("express");
const router = express.Router(); // express router
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile"); // load profile model
const User = require("../../models/User"); // load user model

// @route       GET api/profile/test
// @description Tests profile route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route       GET api/profile
// @description Current users profile
// @access      Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          // no profile
          errors.noprofile = "User has no profile"; // add profile error to error object
          return res.status(404).json(errors);
        } else {
          // profile exist
          res.json(profile);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
