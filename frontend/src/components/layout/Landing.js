import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import authContext from "../context/Auth/authContext";
import showcase from "../img/showcase.jpg";

const Div = styled.div`
  position: relative;
  background: url(${showcase}) no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  /* margin-top: -24px; */
  margin-bottom: -50px;

  & img {
    width: 100%;
    height: 100%;
  }

  .landing-inner {
    padding-top: 100px;
  }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Landing = () => {
  // init useHistory
  const history = useHistory();
  // get state & functions from context
  const ctx = useContext(authContext);
  // destructure from context
  const { isLoggedIn } = ctx;

  // redirect user to dashboard if loggedin
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }

    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <Div>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4 text-light'>DevNet</h1>
              <p className='lead'>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link to='/register' className='btn btn-primary mx-2 mb-3'>
                Register
              </Link>

              <Link to='/login' className='btn btn-light mx-2 mb-3'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Landing;
