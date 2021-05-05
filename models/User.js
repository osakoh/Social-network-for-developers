const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 *  Relational   |  MongoDB
 * - Database    |  Database
 * - Table       |  Collection
 * - Row         |  Document
 * - Index       |  Index
 * - Join        |  $lookup
 * - Foreign Key | Reference
 */

// creating the db structure and organisation - Schema; An instance of a model is called a document
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("users", UserSchema);
