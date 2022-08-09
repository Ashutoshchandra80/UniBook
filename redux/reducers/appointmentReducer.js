const { ADD_BOOKINGS } = require('../constants/sessionConstants');

const initialState = {};

export const appointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKINGS:
      return { ...state, booking: payload };
    default:
      return state;
  }
};