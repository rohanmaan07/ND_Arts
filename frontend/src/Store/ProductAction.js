import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS
} from "./ProductActionTyp";

import { api ,API_BASE_URL} from "../Config/apiConfig";

// Find products with filters
export const findProducts = (reqData) => async (dispatch) => {
  const {
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  dispatch({ type: FIND_PRODUCTS_REQUEST });

  try {
    const { data } = await api.get(
      `/api/products?size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
console.log("PRODUCTS API RESPONSE:", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Find single product by ID
export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  const { productId } = reqData;

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("API ERROR:", error); 
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const createProduct = ({ data, jwt }) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const res = await api.post(
      `/api/admin/products`,
      data,  // direct product object
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
    toast.success("Product created successfully!");
    return res.data;

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: errorMsg });
    toast.error(errorMsg);
    throw error; // taaki frontend me catch ho jaye
  }
};

import { toast } from 'react-toastify';

export const deleteProduct = (productId, filters) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    toast.success("Product deleted successfully!"); // ✅ Toast success

    // Auto-refresh
    dispatch(findProducts(filters));

  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to delete product!"); // ❌ Toast error
  }
};


