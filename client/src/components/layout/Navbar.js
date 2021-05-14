/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/logo.png";
import { connect } from "react-redux"; // to connect redux with this component
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    // destructuring isAuthenticated & user from auth
    const { isAuthenticated, user } = this.props.auth;

    // onLogoutClick function
    // const onLogoutClick = (e) => {
    //   e.preventDefault();
    //   this.props.logoutUser();
    // };

    // shows if user is logged in/authenticated
    const authLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              this.props.logoutUser();
            }}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="Image shows if you have a Gravatar connected to your email"
              style={{ width: "25px", marginRight: "5px" }}
            />
            Logout
          </a>
        </li>
      </ul>
    );

    // shows if user is logged out/not authenticated
    const guestLinks = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark mb-4 navBg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt={"logo"} className="navPhoto" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>

            {/* show different links if user is authenticated / logged in */}
            {isAuthenticated ? authLinks : guestLinks}
            {/* show different links if user is authenticated / logged in */}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
