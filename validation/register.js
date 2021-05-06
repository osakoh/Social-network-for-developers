const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterationInput(data) {
  let errors = {};
  // if name is not greater than 2 characters or name is less than 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
