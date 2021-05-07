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

// @route         GET api/profile
// @description   Get profile of current user
// @access        Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const errors = {}; // initialise errors object

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

// @route         POST api/profile
// @description   Create / Update user profile
// @access        Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const errors = {}; // initialise errors object

    // get fields from request.body
    const profileFields = {};
    profileFields.user = req.user.id; // includes the users id, name, email, & avatar
    // check if user entered handle name and add it to profileFields object
    if (req.body.handle) profileFields.handle = req.body.handle;

    // check if user entered company name and add it to profileFields object
    if (req.body.company) profileFields.company = req.body.company;

    // check if user entered website link and add it to profileFields object
    if (req.body.website) profileFields.website = req.body.website;

    // check if user entered location and add it to profileFields object
    if (req.body.location) profileFields.location = req.body.location;

    // check if user entered bio and add it to profileFields object
    if (req.body.bio) profileFields.bio = req.body.bio;

    // check if user entered status and add it to profileFields object
    if (req.body.status) profileFields.status = req.body.status;

    // check if user entered githubusername details and add it to profileFields object
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // check if user entered skills: split into array since skills are added as comma separate values
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.Split(","); // split on comma
    }

    // social links
    profileFields.social = {}; // social is an object with different fields in the Profile model
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // check for user
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // then update the profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // create profile
        // first check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            // if handle exists
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          } else {
            // save profile since handle doesn't exists
            new Profile(profileFields)
              .save()
              .then((profile) => res.json(profile));
          }
        });
      }
    });
  }
);

module.exports = router;
