import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "../../common/TextField";
import authContext from "../../context/Auth/authContext";

const Register = () => {
  // init state
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    pressed: false,
  });
  // init useHistory
  const history = useHistory();
  // get state & functions from context
  const ctx = useContext(authContext);
  // destructure from auth ctx
  const { registerUser, errors, isLoggedIn } = ctx;

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

  // submit registration form
  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent page refresh on submit

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };
    registerUser(newUser, history);
    // reset email & password
    setState({
      ...state,
      name: "",
      password: "",
      password2: "",
      pressed: false,
    });
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h2 className='display-5 text-center m-5'>
              Connect with other Developers at DevNet!
            </h2>

            {/* form start */}
            <form onSubmit={onSubmitHandler} noValidate>
              {/* name input field */}
              <TextField
                name='name'
                placeholder='Name'
                value={state.name}
                error={errors.name}
                type='text'
                isPressed={state.pressed}
                onChange={onChangeHandler}
              />
              {/* name input field */}

              {/* email input field */}
              <TextField
                name='email'
                placeholder='Email'
                value={state.email}
                error={errors.email}
                type='email'
                isPressed={state.pressed}
                onChange={onChangeHandler}
                info='Use an Email account linked with Gravatar to display a profile image.'
              />
              {/* email input field */}

              {/* password input field */}
              <TextField
                name='password'
                placeholder='Password'
                value={state.password}
                error={errors.password}
                type='password'
                isPressed={state.pressed}
                onChange={onChangeHandler}
              />
              {/* password input field */}

              {/* password2 input field */}
              <TextField
                name='password2'
                placeholder='Confirm Password'
                value={state.password2}
                error={errors.password2}
                type='password'
                isPressed={state.pressed}
                onChange={onChangeHandler}
              />
              {/* password2 input field */}

              {/* submit input: type submit */}
              <div className='d-grid'>
                <input
                  onClick={onPressedHandler}
                  type='submit'
                  className='btn btn-dark btn-block  mt-2 '
                  value='Sign up'
                />
              </div>
              {/* submit input: type submit */}
              {/* link to registration page */}
              <div className='d-grid mt-2'>
                <Link to='/login' className='btn btn-info btn-block'>
                  Login
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

export default Register;
