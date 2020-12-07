const ASYNC_ACTION_START = "ASYNC_ACTION_START";
const ASYNC_ACTION_FINSH = "ASYNC_ACTION_FINSH";
const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
export const APP_LOADED = "APP_LOADED";

export function asyncActionStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}
export function asyncActionFinsh() {
  return {
    type: ASYNC_ACTION_FINSH,
  };
}
export function asyncActionError(error) {
  console.log(error);
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export default function asyncReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYNC_ACTION_FINSH:
      return {
        ...state,
        loading: false,
      };
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case APP_LOADED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}
