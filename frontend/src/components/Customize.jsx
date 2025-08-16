import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import axios from "axios";

const Customize = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    material: "",
    colour: "",
    size: "",
    dressType: "",
    photos: []
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form to backend
  const handleSub = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "photos") data.append(key, formData[key]);
      });
      formData.photos.forEach((file) => {
        data.append("photos", file);
      });

      const token = localStorage.getItem("jwt");
      const res = await axios.post(
        "http://localhost:8080/api/custom-orders",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Custom order placed successfully!");
      console.log("Response:", res.data);

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        material: "",
        colour: "",
        size: "",
        dressType: "",
        photos: []
      });

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(error.response?.data?.message || "Failed to submit custom order");
    }
  };

  // Razorpay payment and post-payment order creation
  const handlePaymentForCustomize = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const { firstname, lastname, phone } = formData;

      // Get Razorpay order from backend
      const { data } = await axios.post(
        "http://localhost:8080/api/payments/customize",
        {
          name: `${firstname} ${lastname}`,
          contact: phone,
          email: "customer@example.com"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_DUtdKeiVCIaufb", // <-- your Razorpay key ID
        amount: data.amount,
        currency: data.currency,
        name: "Custom Dress Order",
        description: "₹300 Customization Payment",
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment successful!");
          handleSub(); // Save order then redirect in handleSub
        },
        prefill: {
          name: `${firstname} ${lastname}`,
          email: "customer@example.com",
          contact: phone
        },
        theme: { color: "#8e44ad" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment init failed:", err);
      alert("Payment initialization failed.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #666",
    backgroundColor: "transparent",
    color: "#DCE3E9",
    fontSize: "16px"
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "50%" }, margin: "0 auto", p: 3 }}>
      <Paper elevation={3} sx={{ backgroundColor: "#1a1a1a", borderRadius: 2, color: "#DCE3E9", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Custom Order Details
        </Typography>

        <form>
          <Stack>
            <input style={inputStyle} type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
            <textarea style={inputStyle} name="address" placeholder="Address" rows="4" value={formData.address} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="zip" placeholder="Zip / Postal Code" value={formData.zip} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="material" placeholder="What material do you want?" value={formData.material} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="colour" placeholder="Which colour?" value={formData.colour} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} required />
            <input style={inputStyle} type="text" name="dressType" placeholder="Which kind of dress you want?" value={formData.dressType} onChange={handleChange} required />

            <label style={{ marginBottom: "6px" }}>Attach reference photos (max 3)</label>
            <input
              name="photos"
              style={{ marginBottom: "14px", color: "#DCE3E9" }}
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
            />

            {/* Payment button */}
            <Button
              variant="contained"
              size="large"
              onClick={handlePaymentForCustomize}
              sx={{
                bgcolor: "rgb(145, 85, 253)",
                color: "#DCE3E9",
                "&:hover": { bgcolor: "rgb(125, 65, 233)" }
              }}
            >
              Pay ₹300 & Place Custom Order
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Customize;
