// orderReducer.js

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE,
    CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE
} from './OrderAt';

const initialState = {
    orders: [],     // User ki order history ke liye
    order: null,    // Single order detail ke liye
    error: null,
    loading: false,
    success: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // Create Order
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
            };
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Get Order by ID
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Get Order History
        case GET_ORDER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case GET_ORDER_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        
         case CANCEL_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        // Orders me jis order ka id match kare uska status update
        orders: state.orders.map((o) =>
          o._id === action.payload._id ? action.payload : o
        ),
        order:
          state.order && state.order._id === action.payload._id
            ? action.payload
            : state.order,
      };

    case CANCEL_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
