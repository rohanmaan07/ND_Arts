import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
} from "./CartAType";

const initialState = {
  cartItems: [],
  cart: null,
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------- ADD ITEM -----------------
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload], // payload is a single item
        loading: false,
      };

    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ----------------- GET CART -----------------
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        loading: false,
      };

    case GET_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ----------------- REMOVE ITEM -----------------
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload // FIXED here
        ),
        loading: false,
      };

    case REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ----------------- UPDATE ITEM -----------------
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item // FIXED here
        ),
        loading: false,
      };

    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
          case CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        cartItems: [],
        cart: null,
        loading: false,
      };

    case CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    // ----------------- DEFAULT -----------------
    default:
      return state;
  }
};
