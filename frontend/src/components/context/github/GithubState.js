/*
App  level states are initialised and a provider is exported which is used to wrap
the entire application.
*/

import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

// check environment
if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// initial state
const GithubState = (props) => {
  // global state for github
  const initialState = {
    repos: [],
    loading: false,
    user: {},
  };

  // dispatch type to reduce
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // get user repos
  const getUserRepos = async (username) => {
    // set state before making the request
    dispatch(setLoading());

    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      const resData = await res.json();

      dispatch({ type: GET_REPOS, payload: resData });
    } catch (error) {
      dispatch({ type: GET_REPOS, payload: null });
    }
  };

  // get a single Github user
  const getSingleUser = async (username) => {
    // set state before making the request
    dispatch(setLoading());

    const res = await fetch(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    const resData = await res.json();

    // reset the states; individual user's details are stored in a 'data' array as shown in the github documentation
    dispatch({ type: GET_USER, payload: resData });
  };

  // set loading
  // type: match a string variable in type JS
  const setLoading = () => ({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        // value contains any variable that should be available to the entire application
        repos: state.repos,
        loading: state.loading,
        user: state.user,

        getUserRepos,
        getSingleUser,
      }} // value contains any variable that should be available to the entire application
    >
      {/* because the entire application will be wrap with the provider*/}
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

/**
 * Axios performs automatic transforms of JSON data.
 * Fetch is a two-step process when handling JSON data- first,
 * to make the actual request; second, to call the .json() method on the response.
 */
