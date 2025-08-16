import React from "react";
import { IconButton, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../Store/CartAction";

const CartsItems = ({ item, isOrderSummary = false }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    if (!item?._id) return;
    const newQuantity = (item.quantity || 0) + num;
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ cartItemId: item._id, quantity: newQuantity }));
  };

  const handleRemove = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
  };

  return (
    <div className="p-5 shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="w-[10rem] h-[12rem] lg:w-[11rem] lg:h-[15rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product?.imageUrl || "/placeholder-cart.png"}
            alt={item.product?.title || "Product Image"}
          />
        </div>

        <div className="ml-15 space-y-7 text-[#DCE3E9]">
          <p className="font-semibold">{item.product?.title || "No Title"}</p>
          <p className="opacity-70">Size: {item.size || "-"}</p>

          <div className="flex space-x-5 items-center text-lg lg:text-xl text-[#DCE3E9] mt-6">
            <p className="font-semibold">{item.price != null ? item.price : "-"}</p>
          </div>
        </div>
      </div>

      {/* Show quantity controls and remove button only if NOT order summary */}
      {!isOrderSummary && (
        <div className="lg:flex items-center lg:space-x-10 pt-4 text-[#DCE3E9]">
          {/* Quantity controls */}
          <div className="flex items-center space-x-2 text-[#DCE3E9]">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={(item.quantity || 1) <= 1}
            >
              <RemoveCircleOutlineIcon className="text-[#DCE3E9]" />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">{item.quantity || 1}</span>

            <IconButton onClick={() => handleUpdateCartItem(1)}>
              <AddCircleOutlineIcon className="text-[#DCE3E9]" />
            </IconButton>
          </div>

          {/* Remove button */}
          <div className="lg:pl-10 pl-55">
            <Button
              onClick={() => handleRemove(item._id)}
              variant="outlined"
              color="error"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Show quantity only if in order summary */}
      {isOrderSummary && (
        <div className="pt-4 text-[#DCE3E9] font-semibold">
          Quantity: {item.quantity || 1}
        </div>
      )}
    </div>
  );
};

export default CartsItems;
