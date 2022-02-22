import { types } from "../types/types";

const initialState = {
  notice: [],
  noticeType: {},
};

export const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTICE:
      return { ...state, notice: action.payload };
    case types.NOTICETYPE:
      return { ...state, noticeType: action.payload };
    default:
      return state;
  }
};
