import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

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

  // onChange: capture inputs from input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onSubmit: submits the form
  onSubmit = (e) => {
    e.preventDefault(); // prevent default form behaviour

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    // register user
    axios
      .post("/api/users/register", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  };

  onPressed = (e) => {
    this.setState({ pressed: true });
  };

  render() {
    const { errors } = this.state; // destructuring errors from state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Ready to Join DevNetwork!</p>
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

export default Register;
