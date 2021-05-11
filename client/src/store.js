import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};
const middeware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middeware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

/**
 * spread operator(...): allows you to spread the contents of an array/iterable across zero or more arguments.
 *
 * createStore: takes in 3 arguments namely, reducer, initialState/preloadedState, & an enhancer such as
 * middleware(applyMiddleware), presistence etc.
 *
 * Redux Thunk: a middleware that allows you to return functions, rather than just actions, within Redux.
 * This allows for delayed actions, including working with promises.
 *
 * reducer: is a function that contains a state and an action. It deceides what the state would be after
 * each action. So, if a button is clicked in one of the components, an action is called in
 * which then dispatches a type and/or a payload(data) to the reducer.
 * The reducer then sends it down to any component that requires it.
 */
