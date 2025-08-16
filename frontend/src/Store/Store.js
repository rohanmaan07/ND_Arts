import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Reducer";
import customerProductReducer from "./ProductReducer";
import { cartReducer } from "./CartReducer";
import { orderReducer } from "./OrderReducer";
import adminOrderReducer from "./AdminOrdReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product:customerProductReducer,
  cart:cartReducer,
  order:orderReducer,
  adminOrder:adminOrderReducer,
});

const savedJwt = localStorage.getItem("jwt");

const preloadedState = {
  auth: {
    user: null,
    isLoading: false,
    error: null,
    jwt: savedJwt || null,
  },
};

export const store = legacy_createStore(rootReducers, preloadedState, applyMiddleware(thunk));
