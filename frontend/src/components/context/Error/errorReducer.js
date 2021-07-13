import { GET_ERRORS } from "../types";

const errorReducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      // no need to copy the state using spread operator, since error is the only state
      // payload is the object name used
      return action.payload; // action.payload contains the errors object

    default:
      return state;
  }
};

export default errorReducer;
