const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // if input is not empty, leave the name as it is, otherwise make it an empty string to be used by the 'Validator'
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //  check if job title input is empty
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is a required field";
  }

  //  check if company input is empty
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is a required field";
  }

  //  check if from input is empty
  if (Validator.isEmpty(data.from)) {
    errors.from = "From is a required field";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
