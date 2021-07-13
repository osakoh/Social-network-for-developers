import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileButtons from "./ProfileButtons";
import profileContext from "../context/Profile/profileContext";
import authContext from "../context/Auth/authContext";
import { MdDeleteSweep } from "react-icons/md";
import Experience from "./Experience";

const Dashboard = () => {
  const profileCtx = useContext(profileContext); // get state & functions from profile context
  const authCtx = useContext(authContext); // get state & functions from auth context

  // destructure from profile ctx
  const { profile, loading, deleteProfileAccount, getCurrentProfile } =
    profileCtx;

  // make request immediately component loads in the DOM
  useEffect(() => {
    // get profile of current user
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  // shows the dashboard content
  let dashboardContent;
  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    // check if user has a profile
    /**
     * Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
     */
    if (Object.keys(profile).length > 0) {
      // user has profile
      dashboardContent = (
        <div className='display-5 mb-3 pt-3'>
          {/* converts the first character to uppercase*/}
          Welcome,&nbsp;
          {/* links to users profile */}
          <i>
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${profile.handle}`}
            >
              {authCtx.user.name.replace(/^\w/, (c) => c.toUpperCase())}
            </Link>
          </i>
          {/* links to users profile */}
          {/* show buttons to edit profile, add experience & education */}
          <ProfileButtons />
          {/* show buttons to edit profile, add experience & education */}
          {/* Experience component */}
          {profile.experience.length !== 0 && (
            <Experience experience={profile.experience} />
          )}
          {/* Experience component */}
          {/* delete profile and account button */}
          <button
            type='button'
            className='btn btn-secondary btn-sm mx-2 mb-2 text-danger fw-bold'
            onClick={deleteProfileAccount}
          >
            <MdDeleteSweep
              className='text-danger'
              style={{ fontSize: "1.40em" }}
            />
            &nbsp;Delete account
          </button>
          {/* delete profile and account button */}
        </div>
      );
    } else {
      // user has no profile
      dashboardContent = (
        <div className='display-5 mb-3 pt-3'>
          {/* converts the first character to uppercase*/}
          Welcome,&nbsp;
          <i>{authCtx.user.name.replace(/^\w/, (c) => c.toUpperCase())} </i>
          <p className='lead mt-3'>
            You don't have a profile. Please setup a profile.
          </p>
          <i>
            <Link
              to='/create-profile'
              className='btn btn-lg btn-secondary btn-block'
            >
              Create Profile
            </Link>
          </i>
        </div>
      );
    }
  }

  return <div className='container'>{dashboardContent}</div>;
};

export default Dashboard;
