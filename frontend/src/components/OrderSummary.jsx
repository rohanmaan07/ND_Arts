import React, { useEffect, useState } from 'react';
import AddressCard from './AddressCard';
import CartsItems from './CartsItems';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../Store/OrderAction';
import { createPayment, placeCODOrder } from '../Store/PaymentAction';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ orderId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);

  const orderDetails = order?.order || {};
  const shippingAddress = orderDetails.shippingAddress || null;
  const orderItems = orderDetails.orderItems || [];

  const [showPaymentChoice, setShowPaymentChoice] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById({ orderId, jwt: localStorage.getItem("jwt") }));
    }
  }, [dispatch, orderId]);

  const handlePaymentClick = () => {
    if (!orderId) {
      toast.error("Order ID is missing, cannot proceed to checkout.");
      return;
    }
    setShowPaymentChoice(true);
  };

  const handleOnlinePayment = () => {
  setShowPaymentChoice(false);
  toast.info("Redirecting to online payment...");
  dispatch(createPayment(orderId, navigate)); // ✅ navigate pass kiya
};


  const handleCOD = () => {
  const token = localStorage.getItem("jwt");
  if (!orderId) {
    toast.error("Order ID is missing");
    return;
  }
  setShowPaymentChoice(false);
  toast.info("Processing your order...");
  dispatch(placeCODOrder({ orderId, jwt: token }))
    .then(() => {
      setTimeout(() => navigate("/"), 1500);
    });
};

  return (
    <div>
      <div className="p-5 shadow-lg rounded-sm border mb-3">
        <AddressCard address={shippingAddress}/>
      </div>

      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="col-span-2">
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <CartsItems key={item._id} item={item} isOrderSummary={true} />
              ))
            ) : (
                 <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center text-center w-full">
          <span className="text-[90px] mb-3">🛒</span>
          <h2 className="text-[#DCE3E9] text-3xl font-bold mb-1">
            Your Cart is Empty
          </h2>
          <p className="text-[#9ca3af] mb-6 text-lg font-medium">
            Looks like you haven’t added anything yet.<br />
            Start shopping and fill it up ✨
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-9 py-3 rounded-md bg-indigo-600 text-white text-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <span role="img" aria-label="shop">🛍️</span> Shop Now
          </button>
        </div>
      </div>
            )}
          </div>

          <div className="px-5 sticky top-0 mt-5 lg:mt-0 text-[#DCE3E9]">
            <div className="border">
              <p className="uppercase font-bold opacity-60 p-2 text-center">
                Price details
              </p>
              <hr />
              <div className="space-y-3 font-semibold p-2">
                <div className="flex justify-between pt-3">
                  <span>Price</span>
                  <span>₹{orderDetails.totalPrice ?? "0"}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">₹100</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-green-600 font-bold">
                    ₹{(orderDetails.totalPrice ? orderDetails.totalPrice + 100 : 100)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border
                  border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white
                  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handlePaymentClick}
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentChoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-10 w-100  text-center">
            <h2 className="text-black text-lg font-bold mb-4">Select Payment Method</h2>
            <button
              onClick={handleOnlinePayment}
              className="bg-green-600 text-white p-2 w-full rounded mb-3 hover:bg-green-700"
            >
              Online Payment
            </button>
            <button
              onClick={handleCOD}
              className="bg-gray-600 text-white p-2 w-full rounded hover:bg-gray-700"
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setShowPaymentChoice(false)}
              className="mt-3 text-red-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
