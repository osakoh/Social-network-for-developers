import React from "react";
import PropTypes from "prop-types";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import isEmpty from "../../validation/isEmpty";

const ProfileAbout = ({ profile }) => {
  // Get first name
  const firstName = profile.user.name.trim().split(" ")[0];

  // Skill List
  const skills = profile.skills.map((skill, index) => (
    <div key={index} className='p-3'>
      <IoIosCheckmarkCircleOutline style={{ fontSize: "1.40rem" }} /> {skill}
    </div>
  ));

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='shadow p-3 mb-4 bg-body rounded'>
          <h3 className='text-center text-info'>{firstName}'s Bio</h3>
          <p className='lead'>
            {isEmpty(profile.bio) ? (
              <span>{firstName} No bio added.</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
          <hr />
          <h3 className='text-center text-info'>Skill Set</h3>
          <div className='row'>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
