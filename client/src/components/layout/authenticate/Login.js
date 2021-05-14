import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; // to connect redux with this component
import { loginUser } from "../../../actions/authActions";
import TextField from "../../common/TextField";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      pressed: false,
    };

    // binding the this keyword to a function
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onChange: capture inputs from input fields
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onSubmit: submits the form
  onSubmit(e) {
    e.preventDefault(); // prevent default form behaviour
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  // checks if the submit button has been pressed and sets the state of pressed to true
  onPressed = (e) => {
    this.setState({ pressed: true });
  };

  // componentDidMount is invoked immediately after a component is mounted
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // componentWillReceiveProps is deprecated on new versions and replaced with getDerivedStateFromProps
  // updates the state whenever the errors props changes
  static getDerivedStateFromProps(nextProps) {
    // check if user is authenticated and redirect user to dashboard
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }

    // check if there are errors
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign into DevNet</p>

              {/* form start */}
              <form onSubmit={this.onSubmit} noValidate>
                {/* email input */}
                <TextField
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                />
                {/* email input */}

                {/* password input */}
                <TextField
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                />
                {/* password input */}

                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
                    onClick={this.onPressed}
                    type="submit"
                    className="btn btn-dark btn-block  mt-2"
                    value="Login"
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

// proptypes
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login); // loginUser: function from authActions JS
