import { api } from "../Config/apiConfig";
import {
  GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE,
  CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE,
  PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, PLACED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CANCELED_ORDER_FAILURE,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,
  SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS, SHIP_ORDER_FAILURE
} from "./AdminOrdAT";

// Get all orders
export const getOrders = (reqData) => async (dispatch) => {
  console.log("Fetching all orders", reqData);
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const response = await api.get("/api/admin/order", { params: reqData });
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching orders", error);
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload: error.message
    });
  }
};

// Confirm Order
export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/order/${orderId}/confirmed`);
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
  }
};

// Ship Order
export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIP_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/order/${orderId}/ship`);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
  }
};

// Delivered Order
export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/order/${orderId}/deliver`);
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
  }
};

// Cancel Order
export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/order/${orderId}/cancel`);
    dispatch({ type: CANCELED_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CANCELED_ORDER_FAILURE, payload: error.message });
  }
};

// Place Order
export const placedOrder = (orderId) => async (dispatch) => {
  dispatch({ type: PLACED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/order/${orderId}/place`);
    dispatch({ type: PLACED_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: PLACED_ORDER_FAILURE, payload: error.message });
  }
};

// Delete Order
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    await api.delete(`/api/admin/order/${orderId}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};
