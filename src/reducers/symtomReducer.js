import { types } from "../types/types";

const initialState = {
  symtom: null,
};

export const symtomReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SYMTOM:
      return { ...state, symtom: action.payload };
    default:
      return state;
  }
};
