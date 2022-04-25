import { types } from "../types/types";

const initialState = {
  user: {},
};

export const useReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, user: action.payload };
    case types.LOGOUT:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
