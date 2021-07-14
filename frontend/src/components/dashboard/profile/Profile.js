import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import profileContext from "../../context/Profile/profileContext";
import { IoIosPeople } from "react-icons/io";
import Spinner from "../../layout/Spinner";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileCreds from "../profile/ProfileCreds";
import ProfileGithub from "../profile/ProfileGithub";

const Profile = (props) => {
  // init history
  const history = useHistory();
  // get state & functions from profile context
  const profileCtx = useContext(profileContext);

  // destructure from profile ctx
  const { profile, loading, getProfileByHandle } = profileCtx;

  // call getProfileByHandle on mount
  useEffect(() => {
    getProfileByHandle(props.match.params.handle);
    // eslint-disable-next-line
  }, []);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
              Back To Profiles
            </Link>
          </div>
          <div className='col-md-6' />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <div className='profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            {/* back to profiles button */}
            <Link to='/profiles' className='btn btn-sm btn-primary mt-3 mb-3'>
              Back to Profiles <IoIosPeople style={{ fontSize: "1.40rem" }} />
            </Link>
            {/* back to profiles button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
