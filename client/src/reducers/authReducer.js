import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

/**
 * reducer: is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */
const authReducer = (state = initialState, action) => {
  // evaluates the type dispatched from authActions.js
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, // ... spread operator, this copies the state and updates it
        isAuthenticated: !isEmpty(action.payload), // contains the token which includes the user data
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
