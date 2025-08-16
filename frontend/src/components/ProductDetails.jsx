import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../Store/ProductAction";
import { Radio, RadioGroup } from "@headlessui/react";
import { addItemToCart } from "../Store/CartAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Pages/Loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { product, loading, error } = useSelector((state) => state.product);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(findProductsById({ productId }));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product.size?.length > 0) {
      const available = product.size.find((s) => s.inStock);
      setSelectedSize(available ? available.name : null);
    }
  }, [product]);

  const handleAddToCart = async () => {
    const userString = localStorage.getItem("user");
    let user = null;

    try {
      if (userString && userString !== "undefined") {
        user = JSON.parse(userString);
      }
    } catch (err) {
      console.error("❌ Error parsing user from localStorage:", err);
    }

    if (!user?._id) {
      toast.error("Please login to add items to cart.");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity (minimum 1).");
      return;
    }

    const data = {
      productId,
      size: selectedSize,
      userId: user._id,
      quantity,
    };

    try {
      await dispatch(addItemToCart(data));
      navigate("/cart");
    } catch (err) {
      toast.error("Failed to add item to cart. Please try again!");
    }
  };

  // Loader Component
  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return <div className="text-red-500 p-10">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-white p-10">No product found.</div>;
  }

  return (
    <div style={{ backgroundColor: "rgb(1, 9, 12)" }}>
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={product.imageUrl || "/placeholder-image.png"}
                alt={product.title || "Product Image"}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-xl font-semibold text-[#DCE3E9]">
                {product.brand || "Universaloutfit"}
              </h1>
              <div className="text-lg lg:text-xl text-[#DCE3E9] opacity-60 pt-1">
                {product.title}
              </div>
            </div>
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-[#DCE3E9] mt-6">
                <div className="font-semibold">₹{product.price}</div>
              </div>
              <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-[#DCE3E9]">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.size?.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          disabled={false}
                          className={({ checked }) =>
                            classNames(
                              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium text-gray-900 uppercase cursor-pointer bg-white text-gray-900 shadow-xs transition-all duration-150",
                              checked
                                ? "ring-2 ring-blue-600 ring-offset-2 border-blue-600"
                                : "border-gray-300"
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <span>{size.name}</span>
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent"
                              />
                            </>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                {/* Quantity Input */}
                <div className="mt-6">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-white"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Add to Bag
                </button>
              </form>
            </div>
            <div className="py-10 lg:col-span-2 lg:pt-6 lg:pr-8 lg:pb-16">
              <div className="space-y-6">
                <p className="text-base text-[#DCE3E9]">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Toast Container for toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
