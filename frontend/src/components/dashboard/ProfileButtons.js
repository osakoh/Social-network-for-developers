import React from "react";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";

const ProfileButtons = ({ deleteProfileAccount }) => (
  <div>
    <Link to='/edit-profile' className='btn btn-secondary btn-sm mx-2 mb-2'>
      <CgProfile className='text-info' style={{ fontSize: "1.40em" }} />
      &nbsp;Edit Profile
    </Link>
    <Link to='/add-experience' className='btn btn-secondary btn-sm mx-2 mb-2'>
      <MdWork className='text-info' style={{ fontSize: "1.40em" }} />
      &nbsp;Add Experience
    </Link>
    <Link to='/add-education' className='btn btn-secondary btn-sm mx-2 mb-2'>
      <IoSchoolSharp className='text-black' style={{ fontSize: "1.40em" }} />
      &nbsp;Add Education
    </Link>
  </div>
);

export default ProfileButtons;
