const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // if input is not empty, leave the name as it is, otherwise make it an empty string
  data.text = !isEmpty(data.text) ? data.text : "";

  // if text is not greater than 255 characters or less than 10 characters
  //  isLength: takes in 2 parameters, input field & object{min, max}
  if (!Validator.isLength(data.text, { min: 10, max: 255 })) {
    errors.text = "Post must be between 10 and 255 characters";
  }

  //  check if text input is empty
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is a required field";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
