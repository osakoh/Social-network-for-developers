import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "../common/TextField";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    // class component state
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skill: "",
      githubusername: "",
      bio: "",
      displaySocialInputs: false,
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
      pressed: false,
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// proptypes
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps)(CreateProfile);
