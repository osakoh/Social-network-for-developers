import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer";
import Register from "./components/layout/authenticate/Register";
import Login from "./components/layout/authenticate/Login";
import authContext from "./components/context/Auth/authContext";
import Landing from "./components/layout/Landing";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/edit-profile/EditProfile";
import CreateProfile from "./components/create-profile/CreateProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";

const App = () => {
  // get state & functions from context
  const ctx = useContext(authContext);
  // destructure from auth context
  const { checkTokenExpired } = ctx;

  useEffect(() => {
    const jwt_token = localStorage.getItem("jwtToken");

    if (jwt_token) {
      checkTokenExpired();
    }
    // setCurrentUser isn't added as a dependency to avoid an un-ending loop
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path='/' component={Landing} />
      <main>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />

        {/* Dashboard; Switch allows redirection when logged out */}
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
        {/* Dashboard; Switch allows redirection when logged out */}

        {/* Edit-Profile; Switch allows redirection when logged out */}
        <Switch>
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        </Switch>
        {/* Edit-Profile; Switch allows redirection when logged out */}

        {/* Create-Profile; Switch allows redirection when logged out */}
        <Switch>
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
        </Switch>
        {/* Create-Profile; Switch allows redirection when logged out */}

        {/* AddExperience; Switch allows redirection when logged out */}
        <Switch>
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
        </Switch>
        {/* AddExperience; Switch allows redirection when logged out */}

        {/* AddEducation; Switch allows redirection when logged out */}
        <Switch>
          <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>
        {/* AddEducation; Switch allows redirection when logged out */}
      </main>
      <Footer />
    </Router>
  );
};

export default App;
