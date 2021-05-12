import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

/**
 * register user
 * userData param: reps newUser object from the form in Register JS
 * history param: reps this.props.history from Register JS to allow for redirection in actions
 *
 * dispatch: used to dispatch a type to a reducer (authReducer)
 */
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    // redirect to login page
    .then((res) => history.push("/login"))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// to redirect within a component
// this.props.history.push('/login')

// login - Get user Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // extract token form response
      const { token } = res.data;
      // save to local storage; localstorage only stores strings, however, token is a string
      localStorage.setItem("jwtToken", token);
      // set token to Authorisation header
      setAuthToken(token);
      // decode token to get user data: token contains the payload which includes, the user.id, user.name & user.avatar
      const decodedToken = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return { type: SET_CURRENT_USER, payload: decoded };
};
