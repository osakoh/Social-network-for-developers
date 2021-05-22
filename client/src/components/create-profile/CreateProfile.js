import React, { Component } from "react";
import { connect } from "react-redux"; // to connect redux with this component
import PropTypes from "prop-types";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import InputGroup from "../common/InputGroup";
import SelectInput from "../common/SelectInput";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom"; // allows CreateProfile component has access to this.props.history so it can redirect the user with this.props.history.push
import {
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    // class component state
    this.state = {
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
      errors: {},
      pressed: false,
    };
  }

  // onChange: capture inputs from input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // componentWillReceiveProps is deprecated on new versions and replaced with getDerivedStateFromProps
  // updates the state whenever the props (errors) changes
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  // onSubmit: submits the form
  onSubmit = (e) => {
    e.preventDefault(); // prevent default form behaviour

    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };

    // call createprofile api
    this.props.createProfile(profileData, this.props.history);
  };

  // checks if the submit button has been pressed and sets the state of pressed to true
  onPressed = (e) => {
    this.setState({ pressed: true });
  };

  render() {
    // destructuring errors from state
    const { errors, displaySocialInputs } = this.state;

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

    // toggle social input fields
    if (displaySocialInputs) {
      socialLinks = (
        <div>
          {/* twitter input group */}
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            isPressed={this.state.pressed}
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
            icon={tIcon}
          />
          {/* twitter input group */}

          {/* facebook input group */}
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            isPressed={this.state.pressed}
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
            icon={fIcon}
          />
          {/* facebook input group */}

          {/* linkedin input group */}
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            isPressed={this.state.pressed}
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
            icon={lIcon}
          />
          {/* linkedin input group */}

          {/* youtube input group */}
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            isPressed={this.state.pressed}
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
            icon={yIcon}
          />
          {/* youtube input group */}

          {/* instagram input group */}
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            isPressed={this.state.pressed}
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
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
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-4">* = required field</small>
              <form onSubmit={this.onSubmit}>
                {/* handle input field */}
                <TextField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.handle}
                  info="Handle should be unique"
                />
                {/* handle input field */}

                {/* select status input field */}
                <SelectInput
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  options={options}
                  error={errors.status}
                  info="Select your status"
                />
                {/* select status input field */}

                {/* company input field */}
                <TextField
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.company}
                  info="Name of your company or company you work for"
                />
                {/* company input field */}

                {/* website input field */}
                <TextField
                  placeholder="Website URL"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.website}
                  info="Your website URL"
                />
                {/* website input field */}

                {/* location input field */}
                <TextField
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.location}
                  info="Town/City & County (eg. Hatfield, Hertfordshire)"
                />
                {/* location input field */}

                {/* skills[array] input field */}
                <TextField
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.skills}
                  info="Please use comma separated values (eg. Python, Django, Java)"
                />
                {/* skills[array] input field */}

                {/* github username field */}
                <TextField
                  placeholder="Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.githubusername}
                  info="Include Github username to get your latest repos"
                />
                {/* github username field */}

                {/* bio text area input field */}
                <TextArea
                  placeholder="Summary about you"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  isPressed={this.state.pressed}
                  error={errors.bio}
                />
                {/* bio text area input field */}

                {/* social links: hidden by default */}
                <div className="mt-4 mb-3 text-center">
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState((prevState) => ({
                          displaySocialInputs: !prevState.displaySocialInputs,
                        }));
                      }}
                    >
                      Add Social links (Optional)
                    </button>
                  </div>
                </div>
                {socialLinks}
                {/* social links: hidden by default */}

                {/* submit input: type submit */}
                <div className="d-grid">
                  <input
                    onClick={this.onPressed}
                    type="submit"
                    className="btn btn-dark btn-block  mt-2"
                    value="Create profile"
                  />
                </div>
                {/* submit input: type submit */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// proptypes
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
