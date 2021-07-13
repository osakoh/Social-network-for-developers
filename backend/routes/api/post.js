// comments

const express = require("express");
const router = express.Router(); // express router
const mongoose = require("mongoose");
const passport = require("passport"); // authenticating private/protected routes
const Post = require("../../models/Post"); // Post model
const Profile = require("../../models/Profile"); // Post model
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
      user: req.user.id,
    });

    // save post
    newPost.save().then((post) => res.json(post));
  }
);

// @route       DELETE api/posts/:id
// @description Delete post by id
// @access      Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            // check if user owns the post
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "Unauthorized user" });
            }
            // delete post: user owns the post
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch((err) =>
                res.status(404).json({ postnotfound: "Post not found" })
              );
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "This post was not found" })
          );
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: "This post doesn't exist" })
      );
  }
);

// @route         POST api/posts/like/:id
// @description   Like a post based on the post id
// @access        Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            // check if the user has already liked a post: user's id is in a post.likes array
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User already like this post" });
            } else {
              // user hasn't liked a post: add user id to likes array
              post.likes.unshift({ user: req.user.id });
              // save to db
              post
                .save()
                .then((post) => res.json(post))
                .catch((err) =>
                  res
                    .status(501)
                    .json({ notsaved: "Error encountered while saving" })
                );
            }
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "This post was not found" })
          );
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: "This post doesn't exist" })
      );
  }
);

// @route         POST api/posts/unlike/:id
// @description   Unlike a post based on the post id
// @access        Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            // check if the user has already hasn't liked a post: user's id is not in a post.likes array
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notliked: "You haven't liked this post" });
            } else {
              // get index to remove
              const removeIndex = post.likes
                .map((item) => item.user.toString())
                .indexOf(req.user.id);
              // splice out of the array
              post.likes.splice(removeIndex, 1);

              // save to db
              post
                .save()
                .then((post) => res.json(post))
                .catch((err) =>
                  res
                    .status(501)
                    .json({ notsaved: "Error encountered while saving" })
                );
            }
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "This post was not found" })
          );
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: "This post doesn't exist" })
      );
  }
);

// @route         POST api/posts/comment/:id
// @description   Add comment to post based on the post id
// @access        Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
      // send 400 status
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // add to comments array
        post.comments.unshift(newComment);
        // save to DB
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      })
      .catch((err) => res.status(404).json({ postnotfound: "Post on found" }));
  }
);

// @route         DELETE api/posts/comment/:id/:comment_id
// @description   Remove comment from post based on the post id and the comment_id
// @access        Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // check if the comment exist
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        } else {
          //comment exists
          // get remove index
          const removeIndex = post.comments
            .map((item) => item._id.toString())
            .indexOf(req.params.comment_id);
          // splice comment from array
          post.comments.splice(removeIndex, 1);
          // save post to DB
          post.save().then((post) => res.json(post));
        }
      })
      .catch((err) => res.status(404).json({ postnotfound: "Post on found" }));
  }
);

module.exports = router;
