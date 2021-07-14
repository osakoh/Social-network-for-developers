import React, { useContext, useEffect } from "react";
import Spinner from "../../layout/Spinner";
import profileContext from "../../context/Profile/profileContext";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const profileCtx = useContext(profileContext); // get state & functions from profile context

  // destructure from profile ctx
  const { profiles, loading, getProfiles } = profileCtx;

  // make request immediately component loads in the DOM
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line
  }, []);

  let profileItems;

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    //   show profile items containing all profiles
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4 className='card rounded-3'>No profiles found...</h4>;
    }
  }

  return (
    <div className='profiles'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='rounded-3 m-4 mb-5 display-5 text-center'>
              Developer Profiles
              <p className='lead text-center text-dark'>
                Browse and connect with developers
              </p>
            </h2>

            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
