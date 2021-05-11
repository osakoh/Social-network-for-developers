import { TEST_DISPATCH } from "../actions/types";

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
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state, // ... spread operator, this copyies the state and updates it
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
