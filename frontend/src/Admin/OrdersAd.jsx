import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Avatar, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  deleteOrder, getOrders, confirmOrder, shipOrder, deliveredOrder,
} from "../Store/AdminOrdAct";
import { Loader } from "../Pages/Loader";

const OrdersAd = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((store) => store.adminOrder);

  const [openUserModal, setOpenUserModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId)).then(() => {
      dispatch(getOrders());
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    let action;
    if (newStatus === "CONFIRMED") action = confirmOrder(orderId);
    else if (newStatus === "SHIPPED") action = shipOrder(orderId);
    else if (newStatus === "DELIVERED") action = deliveredOrder(orderId);

    if (action) dispatch(action).then(() => dispatch(getOrders()));
  };

  const getStatusStyle = (status) => ({
    backgroundColor:
      status === "CONFIRMED" ? "#2196f3" :
      status === "SHIPPED" ? "#9c27b0" :
      status === "DELIVERED" ? "#4caf50" :
      status === "CANCELLED" ? "#f44336" : "#ff9800",
    color: "#fff", padding: "4px 8px", borderRadius: "4px",
    fontWeight: "bold", textTransform: "capitalize"
  });

  const handleUserClick = (order) => {
    setSelectedOrder(order);
    setOpenUserModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-5" style={{ backgroundColor: "#01090C" }}>
      <ToastContainer />

      <TableContainer component={Paper} sx={{ backgroundColor: "#0F1A1C" }}>
        <Table sx={{ minWidth: 950 }} aria-label="order table">
          <TableHead>
            <TableRow>
              {["Image", "Order Id", "Title", "Quantity", "Price", "Status", "Actions", "Delete"].map((header) => (
                <TableCell key={header} sx={{ color: "#DCE3E9", fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: "red" }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : orders?.length > 0 ? (
              orders.map((order) =>
                order.orderItems.map((item) => (
                  <TableRow key={item._id}>
                    {/* Product Image */}
                    <TableCell>
                      <Avatar src={item.product?.imageUrl || ""} />
                    </TableCell>

                    {/* Order ID (click to view user) */}
                    <TableCell
                      sx={{ color: "#4FC3F7", cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => handleUserClick(order)}
                    >
                      {order._id}
                    </TableCell>

                    {/* Product Title */}
                    <TableCell sx={{ color: "#DCE3E9" }}>{item.product?.title}</TableCell>

                    {/* Quantity */}
                    <TableCell sx={{ color: "#DCE3E9" }}>{item.quantity}</TableCell>

                    {/* Price */}
                    <TableCell sx={{ color: "#DCE3E9" }}>
                      ₹{item.product?.discountedPrice || item.price}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span style={getStatusStyle(order.orderStatus || "PENDING")}>
                        {order.orderStatus || "PENDING"}
                      </span>
                    </TableCell>

                    {/* Actions Dropdown */}
                    <TableCell>
                      <Select
                        value=""
                        displayEmpty
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        sx={{
                          backgroundColor: "#1E2A2C",
                          color: "#DCE3E9",
                          minWidth: "120px",
                        }}
                      >
                        <MenuItem value="" disabled>Update Status</MenuItem>
                        <MenuItem value="CONFIRMED">Confirm</MenuItem>
                        <MenuItem value="SHIPPED">Shipped</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                      </Select>
                    </TableCell>

                    {/* Delete Button */}
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(order._id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: "#DCE3E9" }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Info Modal */}
      <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)}>
        <DialogTitle>User & Shipping Details</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <div style={{ color: "#000", lineHeight: "1.8" }}>
              <h4>👤 User Details</h4>
              <p><strong>Name:</strong> {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email}</p>

              <h4 style={{ marginTop: "1rem" }}>📍 Shipping Address</h4>
              <p><strong>Name:</strong> {selectedOrder.shippingAddress?.firstname} {selectedOrder.shippingAddress?.lastname}</p>
              <p><strong>Street:</strong> {selectedOrder.shippingAddress?.streetAddress}</p>
              <p><strong>City:</strong> {selectedOrder.shippingAddress?.city}</p>
              <p><strong>State:</strong> {selectedOrder.shippingAddress?.state}</p>
              <p><strong>Zipcode:</strong> {selectedOrder.shippingAddress?.zipcode}</p>
              <p><strong>Mobile:</strong> {selectedOrder.shippingAddress?.mobile}</p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersAd;
