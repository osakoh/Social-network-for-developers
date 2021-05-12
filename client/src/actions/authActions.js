import axios from "axios";
import { GET_ERRORS } from "./types";

// register user
export const registerUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    // redirect to login page
    .then((res) => console.log(res.data))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// to redirect within a component
// this.props.history.push('/login')
