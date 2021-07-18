import { useReducer, useContext } from "react";
import axios from "axios";
import profileReducer from "./profileReducer";
import profileContext from "./profileContext";
import authContext from "../Auth/authContext";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "../types";

// clear profile data
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

const ProfileState = (props) => {
  // init profile initial states
  const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    errors: {},
  };

  // init context
  const ctx = useContext(authContext);

  // dispatch to reducer using the useReducer hook
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // get current profile: api/profile
  const getCurrentProfile = async () => {
    dispatch(setProfileLoading());

    try {
      const res = await axios.get("/api/profile");

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PROFILE, payload: {} });
    }
  };

  // Get profile by handle
  const getProfileByHandle = async (handle) => {
    dispatch(setProfileLoading());

    try {
      const res = await axios.get(`/api/profile/handle/${handle}`);

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PROFILE, payload: null });
    }
  };

  // Get profile by handle
  const getProfileByUserID = async (user_id) => {
    dispatch(setProfileLoading());

    try {
      const res = await axios.get(`/api/profile/user/${user_id}`);

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PROFILE, payload: null });
    }
  };

  // Get all profiles
  const getProfiles = async () => {
    dispatch(setProfileLoading());

    try {
      const res = await axios.get("/api/profile/all");

      dispatch({ type: GET_PROFILES, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PROFILES, payload: null });
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

  // delete account and profile
  const deleteProfileAccount = async () => {
    // this throws an uncaught promise error in the console
    if (window.confirm("Are you sure? This is permanent!")) {
      try {
        // console.log("button clicked");
        const res = await axios.delete("/api/profile");
        if (res.status === 200) {
          // onLogoutHandler: removes token from local storage
          // onLogoutHandler: removes token from Authorization header
          ctx.onLogoutHandler();
        }
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

  // handles the adding of an education to the profile model
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

  // handles deleting of an experience from the profile model
  const deleteExperience = async (expId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/profile/experience/${expId}`,
        config
      ); // returns a promise
      if (res.status === 200) {
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // handles deleting of an education from the profile model
  const deleteEducation = async (eduId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(`/api/profile/education/${eduId}`, config); // returns a promise
      if (res.status === 200) {
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
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
        getProfiles,
        getProfileByHandle,
        getProfileByUserID,
        createProfile,
        setProfileLoading,
        clearCurrentProfile,
        deleteProfileAccount,
        addExperience,
        addEducation,
        deleteExperience,
        deleteEducation,
      }}
    >
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileState;
