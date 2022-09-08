import { types } from "../types/types";

export const setEvents = (event) => ({
  type: types.eventSetEvents,
  payload: event,
});

export const editEvent = (event) => ({
  type: types.eventEditEvent,
  payload: event,
});
