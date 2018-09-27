import { createStore, applyMiddleware } from "redux";
// import Reducer form reducers
import rootReducer from "./reducers";
// import our thunk middleware for redux
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
