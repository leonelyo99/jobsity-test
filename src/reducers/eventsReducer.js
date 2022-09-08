import { types } from "../types/types";

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case types.eventSetEvents:
      return [...state, action.payload];
    case types.eventEditEvent:
      return [...state].map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    default:
      return state;
  }
};
