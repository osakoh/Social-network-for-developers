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
import Profile from "./components/dashboard/profile/Profile";
import Profiles from "./components/dashboard/profiles/Profiles";
import NotFound from "./components/not-found/NotFound";

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

  //  className='container' style={{ marginBottom: "10vh", padding: "5px" }}
  return (
    <Router>
      <Header />
      <main
      // className='container'
      // style={{ marginBottom: "10vh", padding: "5px" }}
      >
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          {/* 'handle' is passed as part of the url */}
          <Route exact path='/profile/:handle' component={Profile} />
          {/* 'handle' is passed as part of the url */}
        </Switch>
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
        {/* Not found component */}
        {/* <Route component={NotFound} /> */}
        {/* Not found component */}
      </main>

      <Footer />
    </Router>
  );
};

export default App;

/**
 * Min-Width
// X-Small devices (portrait phones, less than 576px)
@media screen and (min-width: 576px) { ... }

// Small devices (landscape phones, 576px and up)
@media screen and (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media screen and (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media screen and (min-width: 992px) { ... }

// X-Large devices (large desktops, 1200px and up)
@media screen and (min-width: 1200px) { ... }

// XX-Large devices (larger desktops, 1400px and up)
@media screen and (min-width: 1400px) { ... }


Max-Width
// X-Small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }

// X-Large devices (large desktops, less than 1400px)
@media (max-width: 1399.98px) { ... }

// XX-Large devices (larger desktops)
// No media query since the xxl breakpoint has no upper bound on its width


Between breakpoints

Similarly, media queries may span multiple breakpoint widths:
// Example
// Apply styles starting from medium devices and up to extra large devices
@media (min-width: 768px) and (max-width: 1199.98px) { ... }

 */
