// import axios from 'axios'; // axios import karein
// import { API_BASE_URL } from "../Config/apiConfig";
// import {
//   CREATE_PAYMENT_FAILURE,
//   CREATE_PAYMENT_REQUEST,
//   UPDATE_PAYMENT_REQUEST,
//   UPDATE_PAYMENT_FAILURE,
//   PLACE_COD_ORDER_FAIL,
//   PLACE_COD_ORDER_REQUEST,
//   PLACE_COD_ORDER_SUCCESS
// } from "./PaymentAt";
// import { toast } from 'react-toastify'; 
// export const createPayment = (orderId) => async (dispatch) => {
//   dispatch({ type: CREATE_PAYMENT_REQUEST });
//   try {
//     const token = localStorage.getItem('jwt');  // ya jahan token store ho
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json', // agar zarurat ho
//       },
//     };

//     const { data } = await axios.post(
//       `${API_BASE_URL}/api/payments/${orderId}`,
//       {},
//       config
//     );

//     if (data.payment_link_url) {
//       window.location.href = data.payment_link_url;
//     }
//     // dispatch success action agar needed
//   } catch (error) {
//     dispatch({
//       type: CREATE_PAYMENT_FAILURE,
//       payload: error.response?.data?.message || error.message || 'Payment failed',
//     });
//   }
// };
// export const updatePayment = (reqData) => async (dispatch) => {
//   dispatch({ type: UPDATE_PAYMENT_REQUEST });
//   try {
//     const { data } = await axios.get(              // axios.get use karen
//       `${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
//     );
//     console.log("update payment : ", data);
//     // Agar aapko success action dispatch karna hai to yahan add karen
//     // dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       // UPDATE_PAYMENT_FAILURE agar define kiya hai to use karen
//       type: UPDATE_PAYMENT_FAILURE || CREATE_PAYMENT_FAILURE,
//       payload: error.message || "Payment update failed",
//     });
//   }
// };

// export const placeCODOrder = ({ orderId, jwt }) => async (dispatch) => {
//   try {
//     dispatch({ type: PLACE_COD_ORDER_REQUEST });

//     const { data } = await axios.put(
//       `${API_BASE_URL}/api/orders/${orderId}/cod`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         }
//       }
//     );

//     dispatch({ type: PLACE_COD_ORDER_SUCCESS, payload: data });

//     // ✅ Success alert
//     alert("Order placed successfully with Cash on Delivery!");

//     return data;
//   } catch (error) {
//     dispatch({
//       type: PLACE_COD_ORDER_FAIL,
//       payload: error.response?.data?.message || error.message
//     });

//     // ❌ Error alert
//     alert("Failed to place COD order");

//     throw error;
//   }
// };
import axios from 'axios';
import { API_BASE_URL } from "../Config/apiConfig";
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  PLACE_COD_ORDER_FAIL,
  PLACE_COD_ORDER_REQUEST,
  PLACE_COD_ORDER_SUCCESS
} from "./PaymentAt";
import { toast } from 'react-toastify';

// 🔹 Normal store order Razorpay payment
// createPayment(orderId, navigate)
export const createPayment = (orderId, navigate) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const token = localStorage.getItem('jwt');
    const { data } = await axios.post(
      `${API_BASE_URL}/api/payments/${orderId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: "rzp_test_DUtdKeiVCIaufb",
      amount: data.amount,
      currency: data.currency,
      name: "ND Arts",
      description: "Order Payment",
      order_id: data.orderId,
      handler: function (response) {
        alert("Payment successful!");

        dispatch(updatePayment({
          paymentId: response.razorpay_payment_id,
          orderId: orderId
        }));

        // ✅ Payment ke baad redirect
        navigate("/");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message || 'Payment failed',
    });
  }
};


// 🔹 Update payment info in DB after payment success
export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );

    console.log("update payment : ", data);
    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.message || "Payment update failed",
    });
  }
};

// 🔹 Cash on Delivery
export const placeCODOrder = ({ orderId, jwt }) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_COD_ORDER_REQUEST });

    const { data } = await axios.put(
      `${API_BASE_URL}/api/orders/${orderId}/cod`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    dispatch({ type: PLACE_COD_ORDER_SUCCESS, payload: data });
    alert("Order placed successfully with Cash on Delivery!");
    return data;
  } catch (error) {
    dispatch({
      type: PLACE_COD_ORDER_FAIL,
      payload: error.response?.data?.message || error.message
    });
    toast.error("Failed to place COD order");
    throw error;
  }
};
