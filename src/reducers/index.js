import { combineReducers } from "redux";

import { eventsReducer } from "./eventsReducer";

const reducers = {
  events: eventsReducer,
};

export default combineReducers(reducers);
