import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import isEmpty from "../../validation/isEmpty";

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state, // ... spread operator copies the state
        errors: action.payload, // action.payload contains the errors object
      };

    case SET_CURRENT_USER:
      return {
        ...state, // ... spread operator copies the state
        isLoggedIn: !isEmpty(action.payload), // true if action.payload is not Empty; otherwise false
        user: action.payload, // contains the token which includes the user data
      };

    default:
      return {
        state,
      };
  }
};

export default authReducer;
