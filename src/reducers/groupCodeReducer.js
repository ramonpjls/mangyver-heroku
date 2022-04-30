import { types } from "../types/types";

const initialState = {
  groupCode: "",
};

export const groupCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GROUPCODE:
      return { ...state, groupCode: action.payload };
    default:
      return state;
  }
};
