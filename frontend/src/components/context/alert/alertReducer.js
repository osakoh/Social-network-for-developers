/**
 * a reducer is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * GithubState.JS which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  // evaluates the type dispatched from GithubState.js
  switch (action.type) {
    case SET_ALERT:
      return action.payload; // action.payload contains the data, res.data.items

    case REMOVE_ALERT:
      return null;

    default:
      return state;
  }
};

export default AlertReducer;
