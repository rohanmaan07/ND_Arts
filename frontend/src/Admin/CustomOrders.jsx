import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomOrders = () => {
  const [orders, setOrders] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://nd-arts.onrender.com/api/custom-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching custom orders", err);
      }
    };
    fetchOrders();
  }, [token]);

  // Toggle completion status by calling backend and updating state
  const markAsCompleted = async (id, currentStatus) => {
    try {
      const res = await axios.patch(
        `https://nd-arts.onrender.com/api/custom-orders/${id}/status`,
        { isCompleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, isCompleted: res.data.isCompleted } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update order status.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Orders</h2>
      {orders.length === 0 && <p>No custom orders found</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "15px",
            padding: "10px",
            background: order.isCompleted ? "rgba(13, 50, 2, 1)" : "#000000ff",
          }}
        >
          <h3>
            {order.firstname} {order.lastname}
          </h3>
          <p>
            <b>Material:</b> {order.material}
          </p>
          <p>
            <b>Colour:</b> {order.colour}
          </p>
          <p>
            <b>Size:</b> {order.size}
          </p>
          <p>
            <b>Dress Type:</b> {order.dressType}
          </p>
          <p>
            <b>Address:</b> {order.address}, {order.city}, {order.state} {order.zip}
          </p>
          <p>
            <b>Phone:</b> {order.phone}
          </p>

          {order.photos && order.photos.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {order.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt="ref"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setPreviewImg(photo)}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => markAsCompleted(order._id, order.isCompleted)}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              background: order.isCompleted ? "#155724" : "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {order.isCompleted ? "✔ Completed" : "Mark as Completed"}
          </button>
        </div>
      ))}

      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={previewImg}
            alt="preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomOrders;
