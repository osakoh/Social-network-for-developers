import { useReducer, useContext } from "react";
import jwt_decode from "jwt-decode"; // to decode the token
import setAuthToken from "../../utils/setAuthToken"; // set token to Authorisation header
import authReducer from "./authReducer";
import authContext from "./authContext";
// import profileContext from "../Profile/profileContext";
import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import axios from "axios";

const AuthState = (props) => {
  // declare initial states for the registration form
  const initialState = {
    errors: {},
    isLoggedIn: false,
    user: {},
  };
  // init profile context
  // const profileCtx = useContext(profileContext);

  // dispatch to reducer using the useReducer hook
  const [state, dispatch] = useReducer(authReducer, initialState);

  // declare functions/methods here

  // register the user and redirect to the login page
  const registerUser = async (userData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users/register", userData, config);

      if (res.status === 200) {
        history.push("/login");
      }
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // logs the user
  const loginUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // response
      const res = await axios.post("/api/users/login", userData, config);

      // extract(destructure) token from response
      const { token } = res.data;
      // persist to local storage; localstorage only stores strings, however, token is a string
      localStorage.setItem("jwtToken", token);
      // set token to Authorisation header so the user can access protected routes
      setAuthToken(token);
      // decode token to get user data: token contains the payload(user.id, user.name & user.avatar) and expiration date
      const decodedToken = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decodedToken));
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // deletes token from LS which logs the user out
  const onLogoutHandler = () => {
    // button of type button has no default behaviour
    // remove token from local storage
    localStorage.removeItem("jwtToken");
    // remove token from Authorization header
    setAuthToken(false); // this deletes the auth header. check setAuthToken script for details
    // set current user to an empty object, thereby setting isAuthenticated to false because actions.payload is empty
    dispatch(setCurrentUser({}));
    // redirect to login page
    // window.location.href = "/login";
  };

  // deletes token from  authorization header if the users token is expired
  const checkTokenExpired = () => {
    if (localStorage.jwtToken) {
      // set token to Authorisation header
      setAuthToken(localStorage.jwtToken);
      // decode token to get user data: token contains the payload(user.id, user.name & user.avatar) and expiration date
      const decodedToken = jwt_decode(localStorage.jwtToken);
      // set user and isAuthenticated in store
      dispatch(setCurrentUser(decodedToken));

      // convert Date to seconds because Date is in milliseconds
      const currentTime = Date.now() / 1000;
      // check if user's token is expired
      if (decodedToken.exp < currentTime) {
        //  // redirect to login page
        dispatch(onLogoutHandler());
        // clear current profile
        // dispatch(profileCtx.clearCurrentProfile());
      }
    }
  };

  // set logged in user from the decoded token
  const setCurrentUser = (decoded) => {
    return { type: SET_CURRENT_USER, payload: decoded };
  };

  // return a context provider
  return (
    <authContext.Provider
      // value contains the states and functions
      value={{
        // declare states here
        errors: state.errors,
        isLoggedIn: state.isLoggedIn,
        user: state.user,

        // declare functions/methods here
        registerUser,
        loginUser,
        onLogoutHandler,
        checkTokenExpired,
        setCurrentUser,
      }}
    >
      {/* will be used to wrap the entire App component */}
      {props.children}
      {/* will be used to wrap the entire App component */}
    </authContext.Provider>
  );
};

export default AuthState;
