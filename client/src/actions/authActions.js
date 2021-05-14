import axios from 'axios'; // for HTTP request
import setAuthToken from '../utils/setAuthToken'; // set token to Authorisation header
import jwt_decode from 'jwt-decode'; // to decode the token
import { GET_ERRORS, SET_CURRENT_USER } from './types';

/**
 * register user
 * userData param: reps newUser object from the form in Register JS
 * history param: reps this.props.history from Register JS to allow for redirection in actions
 *
 * dispatch: used to dispatch a type to a reducer (authReducer)
 */
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    // redirect to login page
    .then((res) => history.push('/login'))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// to redirect within a component
// this.props.history.push('/login')

// login - Get user Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // extract token form response
      const { token } = res.data;
      // persist to local storage; localstorage only stores strings, however, token is a string
      localStorage.setItem('jwtToken', token);
      // set token to Authorisation header so the user can access protected routes
      setAuthToken(token);
      // decode token to get user data: token contains the payload(user.id, user.name & user.avatar) and expiration date
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

export const logoutUser = () => (dispatch) => {
  // remove token from local storage
  localStorage.removeItem('jwtToken');

  // remove token from Authorization header
  setAuthToken(false); // this deletes the auth header. check setAuthToken script for details

  // set current user to an empty object, thereby setting isAuthenticated to false because actions.payload is empty
  dispatch(setCurrentUser({}));
};
