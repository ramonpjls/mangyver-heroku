import { types } from "../types/types";

const initialState = {
  machine: null,
};

export const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MACHINE:
      return { ...state, machine: action.payload };
    default:
      return state;
  }
};
