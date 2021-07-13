import { useReducer } from "react";
import errorContext from "./errorContext";
import errorReducer from "./errorReducer";
import { GET_ERRORS } from "../types";

const ErrorState = (props) => {
  // initial state: since error is the only state, we set the entire state to an empty object
  const initialState = {};

  // dispatch actions using the useReducer hook
  const [state, dispatch] = useReducer(errorReducer, initialState);

  // dispatch errors
  const getErrors = () => {
    dispatch({ type: GET_ERRORS });
  };

  // return a context provider
  return (
    <errorContext.Provider
      value={{
        errors: state, // it's not an object because the entire state was set to an empty object (const initialState = {})

        getErrors,
      }}
    >
      {/* will be used to wrap the entire App component */}
      {props.children}
      {/* will be used to wrap the entire App component */}
    </errorContext.Provider>
  );
};

export default ErrorState;
