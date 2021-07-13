import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/Auth/authContext";

const Navigation = () => {
  // get state & functions from context
  const ctx = useContext(authContext);
  // destructure from auth context
  const { user, isLoggedIn, onLogoutHandler } = ctx;

  // navlink to show depending on if the auth status of user
  let link;

  // link to show if user is logged in/authenticated
  const authLinks = (
    <ul className='navbar-nav ms-auto'>
      <li className='nav-item'>
        <button
          type='button'
          className='btn text-dark font-weight-bold border-2 btn-light'
          onClick={onLogoutHandler}
        >
          <img
            className='rounded-circle'
            src={user.avatar}
            alt={user.name}
            title='Image shows if you have a Gravatar connected to your email'
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </button>
      </li>
    </ul>
  );

  // link to show if user is logged out/not authenticated
  const guestLinks = (
    <ul className='navbar-nav ms-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  // check if user is logged in or not
  // if (ctx.isLoggedIn) {
  //   link = authLinks; // user is logged in
  // } else {
  //   link = guestLinks; // user not logged in
  // }

  link = isLoggedIn ? (link = authLinks) : (link = guestLinks);

  return link;
  // return authLinks;
};

export default Navigation;
