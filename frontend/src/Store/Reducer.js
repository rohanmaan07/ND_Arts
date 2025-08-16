
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionType";

const initialState = {
  user: null,
  jwt: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // console.log("LOGIN_SUCCESS payload:", action.payload);

      return {
        
        ...state,
        isLoading: false,
        error: null,
        jwt: action.payload.jwt,  // ✅ fixed from `jwt` to `token`
        user: action.payload.user,  // ✅ user is properly stored
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
