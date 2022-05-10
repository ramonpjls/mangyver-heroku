import { types } from "../types/types";

const initialState = {
  object: "",
};

export const objectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OBJECT:
      return { ...state, object: action.payload };
    default:
      return state;
  }
};
