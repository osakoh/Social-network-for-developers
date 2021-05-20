import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"; // provides the store(holds the application state)
import jwt_decode from "jwt-decode"; // to decode the token
import setAuthToken from "./utils/setAuthToken"; // set token to Authorisation header
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";

import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/authenticate/Register";
import Login from "./components/layout/authenticate/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

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
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login page
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

              <Switch>
                {/* Switch allows redirection when logged out */}
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              {/* Switch allows redirection when logged out */}

              <Switch>
                {/* Switch allows redirection when logged out */}
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              {/* Switch allows redirection when logged out */}
            </div>
            <Footer />
          </div>
        </Router>
      </Provider> // provides the store(holds the application state)
    );
  }
}

export default App;
