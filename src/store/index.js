import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "../reducer/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    eventReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
