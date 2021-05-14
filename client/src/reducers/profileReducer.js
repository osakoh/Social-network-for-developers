import {
  GET_PROFILE,
  PROFILE_LOADING,
  //   GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

const profileReducer = (state = initialState, action) => {
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

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
