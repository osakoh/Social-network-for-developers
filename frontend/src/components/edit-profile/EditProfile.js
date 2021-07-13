import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "../common/TextField";
import InputGroup from "../common/InputGroup";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import profileContext from "../context/Profile/profileContext";
import {
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import isEmpty from "../validation/isEmpty";

const EditProfile = () => {
  // init state
  const [state, setState] = useState({
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    displaySocialInputs: false,
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    pressed: false,
  });

  // init useHistory
  const history = useHistory();

  // get state & functions from profile context
  const profileCtx = useContext(profileContext);
  // destructure from context
  const { errors, profile, getCurrentProfile, createProfile } = profileCtx;

  // call getprofile
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  // sets the state to the current profile state
  useEffect(() => {
    // if there's a profile
    if (profile) {
      // bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // check if profile field exist, otherwise make it an empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      // check for social; social is an object not a string
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // set the state to the current profile coming from the db
      setState({
        handle: profile.handle,
        status: profile.status,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
    // eslint-disable-next-line
  }, [profile]);

  // captures input values dynamically using the 'name' attribute on the input field
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // checks if the submit button has been pressed and sets the state of pressed to true
  const onPressedHandler = () => {
    setState({ ...state, pressed: true });
  };

  // show/hide social links when button is clicked
  const toggleSocialLinks = () => {
    setState({ ...state, displaySocialInputs: !state.displaySocialInputs });
  };

  // onSubmit: submits the form
  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent default form behaviour

    const profileData = {
      handle: state.handle,
      status: state.status,
      company: state.company,
      website: state.website,
      location: state.location,
      skills: state.skills,
      githubusername: state.githubusername,
      bio: state.bio,
      twitter: state.twitter,
      facebook: state.facebook,
      linkedin: state.linkedin,
      youtube: state.youtube,
      instagram: state.instagram,
    };

    // call createprofile api
    createProfile(profileData, history);
  };

  let socialLinks;

  // array containing fontawesome icons
  let faIcons = [
    <FaTwitter />,
    <FaFacebookF />,
    <FaLinkedinIn />,
    <FaYoutube />,
    <FaInstagram />,
  ];

  // destructuring icons  from faIcons
  const [tIcon, fIcon, lIcon, yIcon, iIcon] = faIcons;

  // show social input fields when button is clicked
  if (state.displaySocialInputs) {
    socialLinks = (
      <div>
        {/* twitter input group */}
        <InputGroup
          placeholder='Twitter Profile URL'
          name='twitter'
          isPressed={state.pressed}
          value={state.twitter}
          onChange={onChangeHandler}
          error={errors.twitter}
          icon={tIcon}
        />
        {/* twitter input group */}

        {/* facebook input group */}
        <InputGroup
          placeholder='Facebook Page URL'
          name='facebook'
          isPressed={state.pressed}
          value={state.facebook}
          onChange={onChangeHandler}
          error={errors.facebook}
          icon={fIcon}
        />
        {/* facebook input group */}

        {/* linkedin input group */}
        <InputGroup
          placeholder='LinkedIn Profile URL'
          name='linkedin'
          isPressed={state.pressed}
          value={state.linkedin}
          onChange={onChangeHandler}
          error={errors.linkedin}
          icon={lIcon}
        />
        {/* linkedin input group */}

        {/* youtube input group */}
        <InputGroup
          placeholder='YouTube Channel URL'
          name='youtube'
          isPressed={state.pressed}
          value={state.youtube}
          onChange={onChangeHandler}
          error={errors.youtube}
          icon={yIcon}
        />
        {/* youtube input group */}

        {/* instagram input group */}
        <InputGroup
          placeholder='Instagram Profile URL'
          name='instagram'
          isPressed={state.pressed}
          value={state.instagram}
          onChange={onChangeHandler}
          error={errors.instagram}
          icon={iIcon}
        />
        {/* instagram input group */}
      </div>
    );
  }

  // options for select input field
  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Intern", value: "Intern" },
    { label: "Graduate Developer", value: "Graduate Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Mid-level Developer", value: "Mid-level Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Associate Developer", value: "Associate Developer" },
    { label: "Manager", value: "Manager" },
    { label: "CTO", value: "CTO" },
    { label: "Other", value: "Other" },
  ];

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-md-7 mx-auto'>
            <Link to='/dashboard' className='btn btn-sm btn-primary mt-3 mb-3'>
              Back to dashboard
            </Link>
            <h4 className='card-header display-5 text-center rounded-3'>
              Edit Profile
            </h4>
            <small className='d-block pb-4'>
              <span className='text-danger'>*</span> = required field
            </small>
            <form onSubmit={onSubmitHandler}>
              {/* handle input field */}
              <TextField
                placeholder='* Profile Handle'
                name='handle'
                value={state.handle}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.handle}
                info='Handle should be unique'
              />
              {/* handle input field */}

              {/* select status input field */}
              <SelectInput
                placeholder='* Status'
                name='status'
                value={state.status}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                options={options}
                error={errors.status}
                info='Select your status'
              />
              {/* select status input field */}

              {/* company input field */}
              <TextField
                placeholder='Company'
                name='company'
                value={state.company}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.company}
                info='Name of your company or company you work for'
              />
              {/* company input field */}

              {/* website input field */}
              <TextField
                placeholder='Website URL'
                name='website'
                value={state.website}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.website}
                info='Your website URL'
              />
              {/* website input field */}

              {/* location input field */}
              <TextField
                placeholder='Location'
                name='location'
                value={state.location}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.location}
                info='Town/City & County (eg. Hatfield, Hertfordshire)'
              />
              {/* location input field */}

              {/* skills[array] input field */}
              <TextField
                placeholder='* Skills'
                name='skills'
                value={state.skills}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.skills}
                info='Please use comma separated values (eg. Python, Django, Java)'
              />
              {/* skills[array] input field */}

              {/* github username field */}
              <TextField
                placeholder='Github username'
                name='githubusername'
                value={state.githubusername}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.githubusername}
                info='Include Github username to get your latest repos'
              />
              {/* github username field */}

              {/* bio text area input field */}
              <TextArea
                placeholder='Summary about you'
                name='bio'
                value={state.bio}
                onChange={onChangeHandler}
                isPressed={state.pressed}
                error={errors.bio}
              />
              {/* bio text area input field */}

              {/* social links: hidden by default */}
              <div className='mt-4 mb-3 text-center'>
                <div className='d-grid'>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    onClick={toggleSocialLinks}
                  >
                    Add Social links (Optional)
                  </button>
                </div>
              </div>
              {socialLinks}
              {/* social links: hidden by default */}

              {/* submit input: type submit */}
              <div className='d-grid'>
                <input
                  onClick={onPressedHandler}
                  type='submit'
                  className='btn btn-dark btn-block  mt-2'
                  value='Edit profile'
                />
              </div>
              {/* submit input: type submit */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
