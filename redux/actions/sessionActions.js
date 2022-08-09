//import axios from "axios"
import { SESSION_FAILED, SESSION_SUCCESS, DELETE_SESSION } from "../constants/sessionConstants";

export const getSession = (login) => {
  return {
    type: SESSION_SUCCESS,
    payload: login,
  };
};

export const delSession = () => {
  return {
    type: DELETE_SESSION,
  };
};
