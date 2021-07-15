/**
 * a reducer is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * GithubState.JS which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */

import { SET_LOADING, GET_REPOS, GET_USER } from "../types";

const GithubReducer = (state, action) => {
  // evaluates the type dispatched from GithubState.js
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        loading: true, // set it to true because it was initialised in GithubState.js as false
      };

    case GET_REPOS:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        repos: action.payload,
        loading: false,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default GithubReducer;
