import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign into DevNetwork</p>
              <form onSubmit={this.onSubmit}>
                {/* email input */}
                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                {/* email input */}

                {/* password input */}
                <div className="form-group mb-2">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                {/* password input */}

                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
                    type="submit"
                    className="btn btn-dark btn-block  mt-2"
                    value="Login"
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

export default Login;
