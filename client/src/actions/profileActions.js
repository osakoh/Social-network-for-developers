import axios from "axios"; // for HTTP request
import {
  GET_PROFILE,
  PROFILE_LOADING,
  //   GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "./types";

// get current profile: api/profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  // request to api/profile
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

// profile loading
export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// clear profile data
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });
