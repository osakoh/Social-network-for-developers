import { useReducer, useContext } from "react";
import axios from "axios";
import profileReducer from "./profileReducer";
import profileContext from "./profileContext";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "../types";
import authContext from "../../context/Auth/authContext";

const ProfileState = (props) => {
  // init context
  // const ctx = useContext(authContext);
  // init profile initial states
  const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    errors: {},
  };

  // dispatch to reducer using the useReducer hook
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // get current profile: api/profile
  const getCurrentProfile = async () => {
    try {
      const res = await axios.get("/api/profile");

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      // log errors in node console
      dispatch({ type: GET_PROFILE, payload: {} });
    }
  };

  // create user profile
  const createProfile = async (profileData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/profile", profileData, config); // returns a promise
      if (res.status === 200) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // set profile loading
  const setProfileLoading = () => ({ type: PROFILE_LOADING });

  // clear profile data
  const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

  // delete account and profile
  const deleteProfileAccount = async () => {
    // this throws an uncaught promise error in the console
    if (window.confirm("Are you sure? This is permanent!")) {
      try {
        console.log("button clicked");
        // const res = await axios.delete("/api/profile");
        // if (res.status === 200) {
        //   dispatch(ctx.onLogoutHandler());
        // }
      } catch (error) {
        dispatch({ type: GET_ERRORS, payload: error.response.data });
      }
    }
  };

  // const add experience
  const addExperience = async (newExp, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/profile/experience", newExp, config); // returns a promise
      if (res.status === 200) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // const add experience
  const addEducation = async (newEdu, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/profile/education", newEdu, config); // returns a promise
      if (res.status === 200) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // return context provider
  return (
    <profileContext.Provider
      value={{
        // declare profile states here
        profile: state.profile,
        profiles: state.profiles,
        loading: state.loading,
        errors: state.errors,

        // declare functions here
        getCurrentProfile,
        createProfile,
        setProfileLoading,
        clearCurrentProfile,
        deleteProfileAccount,
        addExperience,
        addEducation,
      }}
    >
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileState;