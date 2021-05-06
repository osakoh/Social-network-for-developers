const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // if name input is not empty, leave the name as it is, otherwise make it an empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // check if inputted email is actually an email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  // check if email input is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is a required field";
  }

  //  check if password input is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
