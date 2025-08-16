import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  useMediaQuery,
  Chip
} from "@mui/material";
import OrderCard from "./OrderCard";
import { getOrderHistory, cancelOrder } from "../Store/OrderAction";
import { Loader } from "../Pages/Loader";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const token = localStorage.getItem("jwt");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (token) {
      dispatch(getOrderHistory(token));
    }
  }, [dispatch, token]);

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(orderId, token));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.trim().toUpperCase()) {
      case "PLACED":
        return "primary";
      case "PENDING":
        return "warning";
      case "CONFIRMED":
        return "secondary";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center", color: "#DCE3E9" }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: "#DCE3E9", textAlign: "center", mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        background: "rgb(1, 9, 12)",
        minHeight: "100vh",
        py: 2,
        px: { xs: 1, sm: 2, md: 4 },
        color: "#DCE3E9"
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: "1800px", margin: "0 auto" }}
      >
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {orders.length === 0 ? (
              // ✅ Improved Empty Orders UI
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "70vh",
                  textAlign: "center",
                  color: "#DCE3E9"
                }}
              >
                <Typography variant="h2" sx={{ mb: 2, fontSize: "80px" }}>
                  📦
                </Typography>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                  You don’t have any orders yet
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#9ca3af" }}>
                  Looks like you haven’t placed anything yet.
                  <br /> Start shopping and grab something you love ✨
                </Typography>
                <button
                  onClick={() => (window.location.href = "/products")}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "rgb(145,85,253)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(125,65,233)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(145,85,253)")
                  }
                >
                  🛍️ Start Shopping
                </button>
              </Box>
            ) : (
              orders.map((order) => (
                <Box
                  key={order._id}
                  sx={{
                    border: "1px solid #333",
                    borderRadius: 2,
                    p: { xs: 1, sm: 2 },
                    mb: 1,
                    overflow: "hidden",
                    bgcolor: "rgba(12,18,25,0.8)"
                  }}
                >
                  {/* Order Header with Name, Price, Description & Status */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      flexWrap: "wrap",
                      gap: 1
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
                        {order.orderItems[0]?.product?.title || "Product Name"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, maxWidth: "800px" }}
                      >
                        {order.orderItems[0]?.product?.description ||
                          "No description available."}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mt: 0.5, color: "#4caf50" }}
                      >
                        ₹{order.orderItems[0]?.price
                          ? order.orderItems.price
                          : "0"}
                      </Typography>
                    </Box>

                    {/* ✅ Fixed Chip (not cut off) */}
                    <Chip
                      label={order.orderStatus || "UNKNOWN"}
                      color={getStatusColor(order.orderStatus)}
                      sx={{
                        fontWeight: 600,
                        px: 2,
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        minWidth: "110px",
                        flexShrink: 0,
                        textAlign: "center"
                      }}
                    />
                  </Box>

                  {/* Product Cards */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" }
                    }}
                  >
                    {order.orderItems.map((item) => (
                      <Box
                        key={item._id}
                        sx={{
                          flex: "1 1 280px",
                          minWidth: "240px",
                          maxWidth: "420px"
                        }}
                      >
                        <OrderCard
                          id={order._id}
                          productImage={item.product?.imageUrl || ""}
                          productName={item.product?.title || "Product"}
                          size={item.size}
                          price={item.price}
                          orderStatus={order.orderStatus}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Cancel button */}
                  {order?.orderStatus &&
                    ["PLACED", "PENDING", "CONFIRMED"].includes(
                      order.orderStatus.trim().toUpperCase()
                    ) && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "stretch", sm: "center" },
                          justifyContent: "flex-end"
                        }}
                      >
                        <button
                          onClick={() => handleCancel(order._id)}
                          style={{
                            padding: "10px 22px",
                            backgroundColor: "red",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            width: isMobile ? "100%" : "180px",
                            fontWeight: 600,
                            fontSize: "16px"
                          }}
                        >
                          Cancel Order
                        </button>
                      </Box>
                    )}
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
