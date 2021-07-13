import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../context/Auth/authContext";

// ...rest: any other property
const PrivateRoute = ({ component: Component, ...rest }) => {
  // init context
  const ctx = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        ctx.isLoggedIn === true ? ( // if user is authenticated
          <Component {...props} /> // show the protected route(component)
        ) : (
          <Redirect to='/login' /> // else, redirect to login page
        )
      }
    />
  );
};

export default PrivateRoute;
