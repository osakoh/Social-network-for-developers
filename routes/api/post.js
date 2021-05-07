// comments

const express = require("express");
const router = express.Router(); // express router
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post"); // Post model
const validatePostInput = require("../../validation/Post");

// @route       GET api/posts
// @description Get all posts
// @access      Public
router.get("/", (req, res) => {
  Post.find() // retrieve all post from the Post model
    .sort({ date: -1 }) // sort post according to date based on newest/most recent post
    .then((posts) => res.json(posts))
    .catch((err) => {
      res.status(404).json({ nopostsfound: "No posts found" });
    });
});

// @route       GET api/posts/:id
// @description Get post by id
// @access      Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id) // retrieve single post by id
    .then((post) => res.json(post))
    .catch((err) => {
      res.status(404).json({ nopostfound: "No post found" });
    });
});

// @route         POST api/posts
// @description   Create/Add post
// @access        Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
      // send 400 status
      return res.status(400).json(errors);
    }

    // newPost object to hold fields retrieved from the body of the request
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.id,
    });

    // save post
    newPost.save().then((post) => res.json(post));
  }
);

module.exports = router;
