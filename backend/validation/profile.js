const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // if inputs are not empty, leave them as they are, otherwise make them empty strings
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // if handle is not greater than 4 characters or less than 25 characters
  //  isLength: takes in 2 parameters, input field & object{min, max}
  if (!Validator.isLength(data.handle, { min: 4, max: 25 })) {
    errors.handle = "Handle must be between 4 and 25 characters";
  }

  // check if handle is empty
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is a required field";
  }

  // check if status is empty
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is a required field";
  }

  // check if skills is empty
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills is a required field";
  }

  // format as url
  // first check if url field is not empty
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // format as url
  // first check if youtube field is not empty
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid YouTube URL";
    }
  }

  // format as url
  // first check if twitter field is not empty
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid Twitter URL";
    }
  }

  // format as url
  // first check if facebook field is not empty
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid FaceBook URL";
    }
  }

  // format as url
  // first check if linkedin field is not empty
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid LinkedIn URL";
    }
  }

  // format as url
  // first check if instagram field is not empty
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid Instagram URL";
    }
  }

  return {
    errors, // errors: errors,
    isValid: isEmpty(errors),
  };
};
