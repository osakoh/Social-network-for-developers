// location, bio, social network links

const express = require("express");
const router = express.Router(); // express router
const mongoose = require("mongoose");
const passport = require("passport");
// load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile"); // load profile model
const User = require("../../models/User"); // load user model

// @route         GET api/profile
// @description   Get profile of current user
// @access        Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const errors = {}; // initialise errors object

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) // get fields from user into the response
      .then((profile) => {
        if (!profile) {
          // no profile
          errors.noprofile = "Thers is no profile associated with this user"; // add profile error to error object
          return res.status(404).json(errors);
        } else {
          // profile exist
          res.json(profile);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route         GET api/profile/handle/:handle
// @description   Get profile by hande
// @access        Public
router.get("/handle/:handle", (req, res) => {
  const errors = {}; // initialise errors object

  Profile.findOne({ handle: req.params.handle }) // retrieve handle from 'params'
    .populate("user", ["name", "avatar"]) // get fields from user into the response
    .then((profile) => {
      if (!profile) {
        // no profile with the handle exists
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } // profile with the handle exists
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route         GET api/profile/:user_id
// @description   Get profile by user ID
// @access        Public
router.get("/user/:user_id", (req, res) => {
  const errors = {}; // initialise errors object

  Profile.findOne({ user: req.params.user_id }) // retrieve handle from 'params'
    .populate("user", ["name", "avatar"]) // get fields from user into the response
    .then((profile) => {
      if (!profile) {
        // no profile with the handle exists
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } // profile with the handle exists
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route         GET api/profile/all
// @description   Get all profiles
// @access        Public
router.get("/all", (req, res) => {
  const errors = {}; // initialise errors object

  Profile.find() // retrieve all profiles
    .populate("user", ["name", "avatar"]) // get fields from user into the response
    .then((profiles) => {
      if (!profiles) {
        // no profiles
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      } // profiles exists
      res.json(profiles);
    })
    .catch((err) =>
      res.status(404).json({ profiles: "There are no profiles" })
    );
});

// @route         POST api/profile
// @description   Create / Update user profile
// @access        Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
    }

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
      profileFields.skills = req.body.skills.split(","); // split on comma
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
          { new: true } // new: true is equivalent to returnOriginal: false
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

// @route         POST api/profile/experience
// @description   Add experience to profile
// @access        Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // check validation
    if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
    }

    // get fields from request.body
    const newExp = {};
    newExp.title = req.body.title;
    newExp.company = req.body.company;
    newExp.location = req.body.location;
    newExp.from = req.body.from;
    newExp.to = req.body.to;
    newExp.current = req.body.current;
    newExp.description = req.body.description;

    // check for user
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // add to experience array
      profile.experience.unshift(newExp);

      // save profile
      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route         POST api/profile/education
// @description   Add education to profile
// @access        Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // check validation
    if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
    }

    // get fields from request.body
    const newEdu = {};
    newEdu.school = req.body.school;
    newEdu.degree = req.body.degree;
    newEdu.fieldofstudy = req.body.fieldofstudy;
    newEdu.from = req.body.from;
    newEdu.to = req.body.to;
    newEdu.current = req.body.current;
    newEdu.description = req.body.description;

    // check for user
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // add to experience array
      profile.education.unshift(newEdu);

      // save profile
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.json(err));
    });
  }
);

// @route         DELETE api/profile/experience/:exp_id
// @description   Delete experience from profile
// @access        Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    // check for user
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // find experience id
        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        // splice out of array
        profile.experience.splice(removeIndex, 1);
        // save
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) =>
        res.status(404).json({ experience: "No experience found." })
      );
  }
);

// @route         DELETE api/profile/education/:edu_id
// @description   Delete education from profile
// @access        Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    // check for user
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // find experience id
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        // splice out of array
        profile.education.splice(removeIndex, 1);
        // save
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) =>
        res.status(404).json({ experience: "No education found." })
      );
  }
);

// @route         DELETE api/profile
// @description   Delete user and profile
// @access        Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }), // protected route
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
