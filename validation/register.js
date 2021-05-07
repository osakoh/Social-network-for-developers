const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterationInput(data) {
  let errors = {};
  // if name input is not empty, leave the name as it is, otherwise make it an empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // if name is not greater than 2 characters or name is less than 30 characters
  // isLength: takes in 2 parameters, input field & object{min, max}
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // check if name input is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is a required field";
  }

  // check if email input is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is a required field";
  }

  // check if inputted email is actually an email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  //  check if password input is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }

  // check if password input is between 6 and 20
  // isLength: takes in 2 parameters, input field & object{min, max}
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }

  //  check if password2 input is empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is a required field";
  }

  // check both password matches
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
