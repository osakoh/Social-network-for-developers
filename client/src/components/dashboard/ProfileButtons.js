import React from "react";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";

const ProfileButtons = () => (
  <div className="btn-group mb-4" role="group">
    <Link to="/edit-profile" className="btn btn-secondary btn-sm mx-2">
      <CgProfile className="text-info" style={{ fontSize: "1.48em" }} />
      &nbsp;Edit Profile
    </Link>
    <Link to="/add-experience" className="btn btn-secondary btn-sm mx-2">
      <MdWork className="text-info" style={{ fontSize: "1.47em" }} />
      &nbsp;Add Experience
    </Link>
    <Link to="/add-education" className="btn btn-secondary btn-sm mx-2">
      <IoSchoolSharp className="text-black" style={{ fontSize: "1.50em" }} />
      &nbsp;Add Education
    </Link>
  </div>
);

export default ProfileButtons;
