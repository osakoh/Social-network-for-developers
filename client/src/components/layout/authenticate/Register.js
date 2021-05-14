import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux"; // to connect redux with this component
import { registerUser } from "../../../actions/authActions";
import TextField from "../../common/TextField";

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

  // componentDidMount is invoked immediately after a component is mounted
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

              {/* form start */}
              <form onSubmit={this.onSubmit} noValidate>
                {/* name input field */}
                <TextField
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  error={errors.name}
                  type="text"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                />
                {/* name input field */}

                {/* email input field */}
                <TextField
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  info="Use an Email account linked with Gravatar to display a profile image."
                />
                {/* email input field */}

                {/* password input field */}
                <TextField
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                />
                {/* password input field */}

                {/* password2 input field */}
                <TextField
                  name="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  error={errors.password2}
                  type="password"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                />
                {/* password2 input field */}

                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
                    onClick={this.onPressed}
                    type="submit"
                    className="btn btn-dark btn-block  mt-2 "
                    value="Sign up"
                  />
                </div>
                {/* submit input: type submit */}
              </form>
              {/* form end */}
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
