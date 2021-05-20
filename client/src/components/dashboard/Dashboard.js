import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../layout/Spinner";

class Dashboard extends Component {
  // make request immediately component loads in the DOM
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    // destructuring
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has a profile
      if (Object.keys(profile).length > 0) {
        // user has profile
        dashboardContent = <h4>Display profile</h4>;
      } else {
        // user hasn't created a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {/* converts the first character to uppercase*/}
              Welcome&nbsp;{user.name.replace(/^\w/, (c) => c.toUpperCase())}
            </p>
            <p>You don't have a profile. Please setup a profile.</p>
            <Link
              to="/create-profile"
              className="btn btn-lg btn-secondary btn-block"
            >
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// proptypes
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

// get props from redux
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
