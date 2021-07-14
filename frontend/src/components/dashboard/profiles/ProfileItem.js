import React from "react";
import { Link } from "react-router-dom";
import { ImArrowRight } from "react-icons/im";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import isEmpty from "../../validation/isEmpty";

const ProfileItem = ({ profile }) => {
  return (
    <div className='card mb-4 card-body bg-light'>
      <div className='row'>
        {/* gravatar img */}
        <div className='col-2'>
          <img
            src={profile.user.avatar}
            alt={profile.user.name}
            className='img-fluid rounded-3'
          />
        </div>
        {/* gravatar img */}

        {/* name, status and company */}
        <div className='col-8 col-lg-6 col-md-4'>
          <h3>
            <Link
              to={`/profile/${profile.handle}`}
              style={{ textDecoration: "none" }}
            >
              {profile.user.name}
            </Link>
          </h3>
          <p>
            {profile.status}
            {isEmpty(profile.company) ? null : (
              <span> at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.handle}`} className='btn btn-info'>
            View Profile <ImArrowRight />
          </Link>
        </div>
        {/* name, status and company */}

        {/* skill set */}
        <div className='col-2 col-md-4 d-none d-md-block'>
          <h4>Tech Skills</h4>
          <ul className='list-group'>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className='list-group-item'>
                <IoIosCheckmarkCircleOutline /> {skill}
              </li>
            ))}
          </ul>
        </div>
        {/* skill set */}
      </div>
    </div>
  );
};

export default ProfileItem;
