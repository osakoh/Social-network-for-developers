// location, bio, social network links

const express = require("express");
// express router
const router = express.Router();

// @route       GET api/profile/test
// @description Tests profile route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

module.exports = router;
