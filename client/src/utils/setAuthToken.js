import axios from "axios";

const setAuthToken = (token) => {
  // if user logs in
  if (token) {
    // apply token to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // no token found (user isn't logged in); delete authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
