import { createStore, applyMiddleware } from "redux";
// import Reducer form reducers
import rootReducer from "./reducers";
// import our logger for redux
import { logger } from "redux-logger";

export const store = createStore(rootReducer, applyMiddleware(logger));
