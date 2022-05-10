import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { useReducer } from "../reducers/userReducer";
import { noticeReducer } from "../reducers/noticeReducer";
import { machineReducer } from "../reducers/machineReducer";
import { groupCodeReducer } from "../reducers/groupCodeReducer";
import { objectReducer } from "../reducers/objectReducer";
import { symtomReducer } from "../reducers/symtomReducer";
import { causeReducer } from "../reducers/causeReducer";

const reducers = combineReducers({
  user: useReducer,
  notice: noticeReducer,
  machine: machineReducer,
  groupCode: groupCodeReducer,
  noticeType: noticeReducer,
  object: objectReducer,
  symtom: symtomReducer,
  cause: causeReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
