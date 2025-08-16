import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = ({
  productImage,
  productName,
  size,
  price,
  orderStatus = "PLACED", // default status agar na mile
}) => {
  const isDelivered = orderStatus === "DELIVERED";
  const isShipped = orderStatus === "SHIPPED";
  const isCancelled = orderStatus === "CANCELLED";

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "space-between", cursor: "default" }}
      className="text-[#DCE3E9] mt-5 w-[70rem] hover:shadow-lg p-4 rounded-md"
    >
      {/* Product Info */}
      <Grid item xs={12} md={5}>
        <div className="flex items-center">
          {productImage ? (
            <img
              className="w-[10rem] h-[10rem] object-cover object-top rounded"
              src={productImage}
              alt={productName}
            />
          ) : (
            <div className="w-[10rem] h-[10rem] bg-gray-700 rounded flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="ml-5 space-y-2">
            <p className="text-lg font-semibold">{productName}</p>
            <p className="opacity-50 text-sm font-medium">Size: {size}</p>
          </div>
        </div>
      </Grid>

      {/* Price */}
      <Grid item xs={12} md={2} className="flex items-center justify-center">
        <p className="text-lg font-semibold">₹{price}</p>
      </Grid>

      {/* Delivery Status */}
      <Grid item xs={12} md={5} className="flex flex-col justify-center">
        {isCancelled ? (
          <p className="text-red-500 font-medium">Order Cancelled</p>
        ) : isDelivered ? (
          <>
            <p className="flex items-center text-green-500 font-medium">
              <AdjustIcon sx={{ width: 18, height: 18 }} className="mr-2" />
              Delivered
            </p>
            <p>Your item has been delivered.</p>
          </>
        ) : isShipped ? (
          <p className="flex items-center text-blue-500 font-medium">
            <AdjustIcon sx={{ width: 18, height: 18 }} className="mr-2" />
            Shipped - expected delivery soon
          </p>
        ) : (
          <p className="flex items-center text-yellow-500 font-medium">
            <AdjustIcon sx={{ width: 18, height: 18 }} className="mr-2" />
            Order placed - expected delivery soon
          </p>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderCard;
