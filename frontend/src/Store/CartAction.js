import { api } from "../Config/apiConfig";
import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
} from "./CartAType";
import { toast } from "react-toastify";

// ✅ 1. Get Cart
export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
    const { data } = await api.get("/api/cart/");
    dispatch({ type: GET_CART_SUCCESS, payload: data });
    // console.log("cart", data);
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ 2. Add Item to Cart
export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.put("/api/cart/add", reqData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    return data; // optional, agar frontend me use karna ho
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    // Throw error to propagate it to frontend catch block
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  try {
    await api.delete(`/api/cartItems/${cartItemId}`);
    
    // Send cartItemId as payload so reducer can use it to filter
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ 4. Update Cart Item (Fixed `/cartItems` instead of `/cart_items`)
export const updateCartItem = ({ cartItemId, quantity }) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  try {
    const { data } = await api.put(`/api/cartItems/${cartItemId}`, { quantity });
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });

  try {
    await api.delete("/api/cart/clear"); // Backend endpoint jaisa banaya tha
    dispatch({ type: CLEAR_CART_SUCCESS });
    toast.success("Cart cleared successfully!");
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error("Failed to clear cart.");
  }
};