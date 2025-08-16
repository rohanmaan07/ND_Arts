import React, { useEffect } from "react";
import CartsItems from "./CartsItems";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Store/CartAction";
import { Loader } from "../Pages/Loader";

const Carts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux se cartItems aur loading state lao
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const loading = useSelector((state) => state.cart.loading);

  // Frontend pe total price calculate karo
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    navigate("/checkout?step=1");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Loader dikhao jab loading true ho
  if (loading) {
    return <Loader />;
  }

  // ⭐⭐ Full Center empty cart section ⭐⭐
  if (cartItems.length === 0) {
    return (
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
    );
  }

  // ⭐⭐ Show cart items normally ⭐⭐
  return (
    <div className="min-h-screen flex flex-col">
      <div className="lg:grid grid-cols-3 lg:px-16 relative flex-1">
        {/* Cart Items Section */}
        <div className="col-span-2">
          {cartItems.map((item) =>
            item && item._id ? (
              <CartsItems key={item._id} item={item} />
            ) : null
          )}
        </div>

        {/* Price Details Section */}
        <div className="px-5 sticky top-0 mt-5 lg:mt-0 text-[#DCE3E9]">
          <div className="border rounded p-3">
            <p className="uppercase font-bold opacity-60 p-2 text-center">
              Price details
            </p>
            <hr />
            <div className="space-y-3 font-semibold p-2">
              <div className="flex justify-between pt-3">
                <span>Price</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="font-bold">Total Amount</span>
                <span className="text-green-600 font-bold">₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
