import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionType";

// ==========================
// Register
// ==========================

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const { jwt } = response.data;

    console.log("Register Success:", jwt);

    localStorage.setItem("jwt", jwt);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { jwt },
    });

    // ✅ Auto Login: Register ke baad user data fetch kar lo
    dispatch(getUser());

  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ==========================
// Login
// ==========================

// export const login = (loginData) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
//     const { jwt } = response.data;

//     console.log("Login Success:", jwt);

//     localStorage.setItem("jwt", jwt);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: { jwt },
//     });

//     // ✅ Login ke baad bhi user fetch
//     dispatch(getUser());

//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };
export const login = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    // 1. Login & get JWT
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    const { jwt } = response.data;

    // 2. Use JWT to fetch user
    const userRes = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const user = userRes.data;

    // 3. ✅ Store both in localStorage (now user is defined)
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("jwt", jwt);

    // 4. ✅ Dispatch to Redux
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { jwt, user },
    });

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ==========================
// Get User Profile
// ==========================

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const token = localStorage.getItem("jwt");

    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;
    dispatch({
      type: GET_USER_SUCCESS,
      payload: user,
    });

  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ==========================
// Logout
// ==========================

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");

  dispatch({
    type: LOGOUT,
  });
};
