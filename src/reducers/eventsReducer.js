import { types } from "../types/types";

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case types.eventSetEvents:
      return [...state, action.payload];
    default:
      return state;
  }
};
