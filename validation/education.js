const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // if input is not empty, leave the name as it is, otherwise make it an empty string to be used by the 'Validator'
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //  check if job school input is empty
  if (Validator.isEmpty(data.school)) {
    errors.school = "School is a required field";
  }

  //  check if degree input is empty
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is a required field";
  }

  //  check if fieldofstudy input is empty
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Fieldofstudy is a required field";
  }

  //  check if From input is empty
  if (Validator.isEmpty(data.from)) {
    errors.From = "From is a required field";
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
