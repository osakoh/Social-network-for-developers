import axios from "axios";
import { GET_ERRORS } from "./types";

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
