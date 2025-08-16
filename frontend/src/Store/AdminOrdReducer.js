import {
  GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
  CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE,
  PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, PLACED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CANCELED_ORDER_FAILURE,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,
  SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS, SHIP_ORDER_FAILURE
} from "./AdminOrdAT";

const initialState = {
  loading: false,
  orders: [],
  error: "",
  confirmed: null,
  placed: null,
  delivered: null,
  canceled: null,
  shipped: null
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true, error: "" };

    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: "" };

    case GET_ORDERS_FAILURE:
      return { ...state, loading: false, orders: [], error: action.payload };

    case CONFIRMED_ORDER_REQUEST:
    case PLACED_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case CANCELED_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true, error: "" };

    case CONFIRMED_ORDER_SUCCESS:
      return { ...state, loading: false, confirmed: action.payload };
    case PLACED_ORDER_SUCCESS:
      return { ...state, loading: false, placed: action.payload };
    case DELIVERED_ORDER_SUCCESS:
      return { ...state, loading: false, delivered: action.payload };
    case CANCELED_ORDER_SUCCESS:
      return { ...state, loading: false, canceled: action.payload };
    case SHIP_ORDER_SUCCESS:
      return { ...state, loading: false, shipped: action.payload };
    case DELETE_ORDER_SUCCESS:
      return { ...state, loading: false, orders: state.orders.filter(o => o._id !== action.payload) };

    case CONFIRMED_ORDER_FAILURE:
    case PLACED_ORDER_FAILURE:
    case DELIVERED_ORDER_FAILURE:
    case CANCELED_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default adminOrderReducer;
