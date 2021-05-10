import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
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

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    console.log(user);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Ready to Join DevNetwork!</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group mb-2">
                  {/* name input field */}
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {/* name input field */}
                </div>
                <div className="form-group mb-2">
                  {/* email input field */}
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
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
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {/* password input field */}
                </div>
                <div className="form-group mb-2">
                  {/* password2 input field */}
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {/* password2 input field */}
                </div>
                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
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
