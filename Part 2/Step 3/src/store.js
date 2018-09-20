import { createStore, applyMiddleware } from "redux";
// import Reducer form reducers
import rootReducer from "./reducers";
// import our logger for redux
import { logger } from "redux-logger";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  applyMiddleware(logger),
  applyMiddleware(thunk)
);
