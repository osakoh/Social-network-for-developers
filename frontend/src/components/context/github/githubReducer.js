/**
 * a reducer is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * GithubState.JS which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubReducer = (state, action) => {
  // evaluates the type dispatched from GithubState.js
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        users: action.payload, // action.payload contains the data, res.data.items
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        loading: true, // set it to true because it was initialised in GithubState.js as false
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false, // set it to true because it was initialised in GithubState.js as false
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default GithubReducer;
