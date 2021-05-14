import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  // make request immediately component mounts
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);
