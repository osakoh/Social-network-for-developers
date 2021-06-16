const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); // main authentication module

// users
const users = require("./routes/api/usersAuth");
// profiles
const profile = require("./routes/api/profile");
// post
const posts = require("./routes/api/post");

// init express
const app = express();

// middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("\n**********Connected to MongoDB*********"))
  .catch(() => console.log(`\nerr`));

// passport middleware
app.use(passport.initialize());

// configure passport
require("./config/passport")(passport);

// users routes
app.use("/api/users", users);
// profile routes
app.use("/api/profile", profile);
// posts routes
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
