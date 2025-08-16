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
} from "./OrderAt";

import { api } from '../Config/apiConfig'

export const createOrder = (orderData) => async (dispatch) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.log("JWT token missing!");
    return;
  }

  try {
    const response = await api.post(
      `/api/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
     return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};




export const getOrderById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await api.get(`/api/orders/${reqData.orderId}`, config);

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getOrderHistory = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ORDER_HISTORY_REQUEST
   });

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const { data } = await api.get('/api/orders/user', config);

    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const cancelOrder = (orderId) => async (dispatch) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.log("JWT token missing!");
    return;
  }

  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    const { data } = await api.put(
      `/api/orders/${orderId}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
    });

    // Optional: agar cancel ke baad order history refresh karna ho
    dispatch(getOrderHistory(token));

    alert("Order cancelled successfully!");
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    alert("Failed to cancel order");
  }
};