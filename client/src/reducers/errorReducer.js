import { GET_ERRORS } from "../actions/types";

const initialState = {};

/**
 * reducer: is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // action.payload contains the errors object
    default:
      return state;
  }
};

export default errorReducer;
