// comments

const express = require("express");
// express router
const router = express.Router();

// @route       GET api/posts/test
// @description Tests post route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
