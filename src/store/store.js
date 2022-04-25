import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { useReducer } from "../reducers/userReducer";
import { noticeReducer } from "../reducers/noticeReducer";

const reducers = combineReducers({
  user: useReducer,
  notice: noticeReducer,
  noticeType: noticeReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
