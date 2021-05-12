import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux"; // to connect redux with this component
import { registerUser } from "../../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      pressed: false,
    };
    // binding the this keyword
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onChange.bind(this);
  }

  // componentWillReceiveProps is deprecated on new versions and replaced with getDerivedStateFromProps
  // updates the state whenever the errors props changes
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  // onChange: capture inputs from input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onSubmit: triggers when the form is submitted
  onSubmit = (e) => {
    e.preventDefault(); // prevent default form behaviour

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  // checks if the submit button has been pressed and sets the state of pressed to true
  onPressed = (e) => {
    this.setState({ pressed: true });
  };

  render() {
    // destructuring errors from state
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Ready to Join DevNet!</p>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group mb-2">
                  {/* name input field */}
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                      "is-valid": !errors.name && this.state.pressed,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                  {/* name input field */}
                </div>
                <div className="form-group mb-2">
                  {/* email input field */}
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                      "is-valid": !errors.email && this.state.pressed,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  {/* email input field */}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group mb-2">
                  {/* password input field */}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                      "is-valid": !errors.password && this.state.pressed,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  {/* password input field */}
                </div>
                <div className="form-group mb-2">
                  {/* password2 input field */}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                      "is-valid": !errors.password2 && this.state.pressed,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                  {/* password2 input field */}
                </div>
                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
                    onClick={this.onPressed}
                    type="submit"
                    className="btn btn-dark btn-block  mt-2 "
                    value="Sign up"
                  />

                  {/* submit input: type submit */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// proptype
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// mapStateToProps/mapState: first argument passed into connect()(). Used to extract data
// a component requires from the store
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// registerUser: function from authActions JS
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
