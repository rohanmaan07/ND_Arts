import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  PLACE_COD_ORDER_FAIL,
  PLACE_COD_ORDER_REQUEST,
  PLACE_COD_ORDER_SUCCESS
} from './PaymentAt';

const initialState = {
  loading: false,
  paymentInfo: null,
  order: null,       
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_PAYMENT_REQUEST:
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PAYMENT_SUCCESS:
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentInfo: action.payload,
        error: null,
      };
    case CREATE_PAYMENT_FAILURE:
    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case PLACE_COD_ORDER_REQUEST:
      return { ...state, loading: true };

    case PLACE_COD_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null };

    case PLACE_COD_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default paymentReducer;
