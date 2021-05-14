import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux"; // provides the store(holds the application state)
import jwt_decode from "jwt-decode"; // to decode the token
import setAuthToken from "./utils/setAuthToken"; // set token to Authorisation header
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/authenticate/Register";
import Login from "./components/layout/authenticate/Login";

// check for token in local storage
if (localStorage.jwtToken) {
  // set token to Authorisation header
  setAuthToken(localStorage.jwtToken);
  // decode token to get user data: token contains the payload(user.id, user.name & user.avatar) and expiration date
  const decodedToken = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated in store
  store.dispatch(setCurrentUser(decodedToken));

  // convert Date to seconds because Date is in milliseconds
  const currentTime = Date.now() / 1000;
  // check if user's token is expired
  if (decodedToken.exp < currentTime) {
    // logout user. get logoutUser() from store
    // store.dispatch(logoutUser());
    logoutUser();

    // TODO: clear current profile

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      // provides the store(holds the application state)
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider> // provides the store(holds the application state)
    );
  }
}

export default App;
