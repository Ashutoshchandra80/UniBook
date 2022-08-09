import { SESSION_FAILED, SESSION_SUCCESS, DELETE_SESSION } from "../constants/sessionConstants";

export const sessionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SESSION_SUCCESS:
      return { ...state, login: payload };
    case SESSION_FAILED:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
