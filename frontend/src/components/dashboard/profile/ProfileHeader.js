import React from "react";
import isEmpty from "../../validation/isEmpty";
import { IoLogoTwitter, IoLogoYoutube } from "react-icons/io";
import { SiFacebook } from "react-icons/si";
import { ImLinkedin, ImInstagram, ImLocation } from "react-icons/im";

const ProfileHeader = ({ profile }) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='shadow p-3 mb-5 card rounded bg-info text-white mb-3'>
          <div className='row text-center'>
            <div className='col-4 text-center col-md-3 m-auto'>
              <img
                className='img-fluid rounded-3 mx-auto d-block'
                src={profile.user.avatar}
                alt={profile.user.name}
              />
            </div>
          </div>
          <div className='text-center'>
            <h3 className='display-5 text-center'>{profile.user.name}</h3>

            {/* company name */}
            <p className='lead text-center'>
              {profile.status}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            {/* company name */}

            {/* location */}
            {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
            <p>
              {isEmpty(profile.website) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.website}
                  target='_blank'
                  rel='noreferrer'
                >
                  <ImLocation style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* location */}

              {/* twitter */}
              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.social.twitter}
                  target='_blank'
                  rel='noreferrer'
                >
                  <IoLogoTwitter style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* twitter */}

              {/* facebook */}
              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.social.facebook}
                  target='_blank'
                  rel='noreferrer'
                >
                  <SiFacebook style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* facebook */}

              {/* linkedin */}
              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.social.linkedin}
                  target='_blank'
                  rel='noreferrer'
                >
                  <ImLinkedin style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* linkedin */}

              {/* youtube */}
              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.social.youtube}
                  target='_blank'
                  rel='noreferrer'
                >
                  <IoLogoYoutube style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* youtube */}

              {/* instagram */}
              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <a
                  className='text-white p-2'
                  href={profile.social.instagram}
                  target='_blank'
                  rel='noreferrer'
                >
                  <ImInstagram style={{ fontSize: "1.40rem" }} />
                </a>
              )}
              {/* instagram */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
