import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authContext from "../../context/Auth/authContext";
import TextField from "../../common/TextField";

const Login = () => {
  // init state
  const [state, setState] = useState({
    email: "",
    password: "",
    pressed: false,
  });
  // init useHistory
  const history = useHistory();
  // init context
  const ctx = useContext(authContext);
  // destructure from context
  const { errors, loginUser, isLoggedIn } = ctx;

  // checks if the user is logged in, then forward to the dashboard
  useEffect(
    () => {
      if (isLoggedIn) {
        history.push("/dashboard");
      }
    },

    // eslint-disable-next-line
    [isLoggedIn]
  );

  // checks if the submit button has been pressed and sets the state of pressed to true
  const onPressedHandler = () => {
    setState({ ...state, pressed: true });
  };

  // captures input values dynamically using the 'name' attribute on the input field
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // submits the login form
  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent page refresh when button is clicked
    const newUser = { email: state.email, password: state.password };
    // function to log user
    loginUser(newUser);
    // reset email & password
    setState({ ...state, email: "", password: "", pressed: false });
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>Sign into CodeNet</p>

            {/* form start */}
            <form onSubmit={onSubmitHandler} noValidate>
              {/* email input */}
              <TextField
                name='email'
                placeholder='Email Address'
                value={state.email}
                error={errors.email}
                type='email'
                onChange={onChangeHandler}
                isPressed={state.pressed}
              />
              {/* email input */}

              {/* password input */}
              <TextField
                name='password'
                placeholder='Password'
                value={state.password}
                error={errors.password}
                type='password'
                onChange={onChangeHandler}
                isPressed={state.pressed}
              />
              {/* password input */}

              {/* submit input: type submit */}
              <div className='d-grid'>
                <input
                  onClick={onPressedHandler}
                  type='submit'
                  className='btn btn-dark btn-block mt-2'
                  value='Login'
                />
              </div>
              {/* submit input: type submit */}

              {/* link to registration page */}
              <div className='d-grid mt-2'>
                <Link to='/register' className='btn btn-info btn-block'>
                  Register
                </Link>
              </div>
              {/* link to registration page */}
            </form>
            {/* form end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
