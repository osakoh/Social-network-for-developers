import React, { Fragment } from "react";
import {
  ImYoutube2,
  ImTwitter,
  ImLinkedin,
  ImFacebook2,
  ImInstagram,
} from "react-icons/im";

const BioSkills = ({
  profile: {
    user,
    handle,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    social,
  },
}) => {
  let socialLinks;
  if (!social) {
    socialLinks = "";
  } else {
    socialLinks = (
      <p>
        {social.youtube && (
          <a href={social.youtube} className='text-info p-2'>
            <ImYoutube2 />
          </a>
        )}

        {social.twitter && (
          <a href={social.twitter} className='text-info p-2'>
            <ImTwitter style={{ fontSize: "0.6em" }} />
          </a>
        )}

        {social.facebook && (
          <a href={social.facebook} className='text-info p-2'>
            <ImFacebook2 style={{ fontSize: "0.6em" }} />
          </a>
        )}

        {social.linkedin && (
          <a href={social.linkedin} className='text-info p-2'>
            <ImLinkedin style={{ fontSize: "0.6em" }} />
          </a>
        )}

        {social.instagram && (
          <a href={social.instagram} className='text-info p-2'>
            <ImInstagram style={{ fontSize: "0.6em" }} />
          </a>
        )}
      </p>
    );
  }

  return (
    <Fragment>
      <div className='row text-dark '>
        <div className='col-md-12 text-center'>
          <div className='card card-body mb-2' style={Style}>
            <div className='row pt-4'>
              <div className='col-4 col-3 m-auto'>
                <img
                  className='rounded-circle img-fluid'
                  src={user.avatar}
                  alt={user.name}
                />
              </div>
            </div>
            <div className='pt-2'>
              <h1 className='display-4'>{user.name}</h1>
              <p className='lead text-center'>{status}</p>
              <p>{location}</p>
              {socialLinks}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Style = {
  backgroundColor: "#ffffff",
  backgroundImage: "linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)",
  boxShadow:
    "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
};

export default BioSkills;
