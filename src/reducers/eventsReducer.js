import { types } from "../types/types";

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case types.eventSetEvents:
      return [...state, action.payload];
    case types.eventEditEvent:
      console.log(
        [...state].map((event) => {
          console.log(event.id, action.payload.id);
          return event.id === action.payload.id ? action.payload : event;
        })
      );
      return [...state].map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    default:
      return state;
  }
};
