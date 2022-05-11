import { types } from "../types/types";

const initialState = {
  cause: null,
};

export const causeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CAUSE:
      return { ...state, cause: action.payload };
    default:
      return state;
  }
};
