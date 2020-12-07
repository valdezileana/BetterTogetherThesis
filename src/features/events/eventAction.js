import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS,
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinsh,
} from "./../../app/async/asyncReducer";
import { fetchSampleData } from "./../../app/api/mockApi";

export const loadEvents = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionFinsh());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    payload: event,
  };
}
