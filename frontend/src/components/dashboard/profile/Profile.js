import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import profileContext from "../../context/Profile/profileContext";
import { IoIosPeople } from "react-icons/io";
import Spinner from "../../layout/Spinner";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileCreds from "../profile/ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import githubContext from "../../context/github/githubContext";

const Profile = (props) => {
  // init history
  const history = useHistory();
  // get state & functions from profile context
  const profileCtx = useContext(profileContext);
  // initialise GithubContext
  const githubCtx = useContext(githubContext);

  // destructure from profile ctx
  const { profile, loading, getProfileByHandle } = profileCtx;

  // call getProfileByHandle on mount
  useEffect(() => {
    // if (profile === null && loading) {
    getProfileByHandle(props.match.params.handle);
    // history.push("/not-found");
    //   }
    // eslint-disable-next-line
  }, []);

  // redirect to Not found page if no profile and profile loading
  useEffect(() => {
    // if (profile === null && loading) {
    //   console.log("Not found: From Profile Component");
    //   console.log(githubCtx.loading, profile.username);
    //   // history.push("/not-found");
    // }
    // eslint-disable-next-line
  }, [profile, loading]);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div className='pb-5 mb-5'>
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

            {profileContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
