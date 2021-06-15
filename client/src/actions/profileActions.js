import axios from "axios"; // for HTTP request
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from "./types";
import { logoutUser } from "./authActions";

// get current profile: api/profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  // request to api/profile
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData) // returns a promise
    .then((res) => history.push("/dashboard")) // redirect to Dashboard
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// profile loading
export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// clear profile data
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

// delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This is permanent!")) {
    axios
      .delete("/api/profile")
      // .then((res) => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .then((res) => dispatch(logoutUser()))
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      );
  }
};
