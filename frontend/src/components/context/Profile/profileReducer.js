import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "../types";

const profileReducer = (state, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        loading: true, // set loading to true
      };

    case GET_PROFILE:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        profile: action.payload, // fill profile object with profile data
        loading: false, // set loading back to false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    case GET_ERRORS:
      return {
        ...state, // ... spread operator copies the state
        errors: action.payload, // action.payload contains the errors object
      };
    default:
      return state;
  }
};

export default profileReducer;
