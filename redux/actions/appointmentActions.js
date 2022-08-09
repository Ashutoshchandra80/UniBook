import { ADD_BOOKINGS } from "../constants/sessionConstants";

export const addBooking = (booking) => {
  return {
    type: ADD_BOOKINGS,
    payload: booking,
  };
};