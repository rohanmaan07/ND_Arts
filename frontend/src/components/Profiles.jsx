import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";

const Profiles = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: {
      firstname: "",
      lastname: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      mobile: ""
    }
  });

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  let addressObj = {};
  if (Array.isArray(userData.address)) {
    addressObj = userData.address.length ? userData.address[userData.address.length - 1] : {};
  } else if (userData.address && typeof userData.address === "object") {
    addressObj = userData.address;
  }

  setFormData(prev => ({
    ...prev,
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    address: {
      firstname: addressObj.firstname || "",
      lastname: addressObj.lastname || "",
      streetAddress: addressObj.streetAddress || "",
      city: addressObj.city || "",
      state: addressObj.state || "",
      zipcode: addressObj.zipcode || "",
      mobile: addressObj.mobile || ""
    }
  }));
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length === 2 && nameParts[0] === "address") {
      const key = nameParts[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    try {
      const res = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      alert("Failed to update profile: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "40px auto", p: 3 }}>
      <Paper elevation={3} sx={{ backgroundColor: "#1a1a1a", borderRadius: 2, color: "#DCE3E9", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Your Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Top level firstName */}
            {/* <TextField
              label="First Name"
              name="firstName"
              variant="filled"
              value={formData.firstName}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            /> */}

            {/* Top level lastName */}
            {/* <TextField
              label="Last Name"
              name="lastName"
              variant="filled"
              value={formData.lastName}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            /> */}

            <TextField
              label="First Name"
              name="address.firstname"
              variant="filled"
              value={formData.address.firstname}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="Last Name "
              name="address.lastname"
              variant="filled"
              value={formData.address.lastname}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="Street Address"
              name="address.streetAddress"
              variant="filled"
              value={formData.address.streetAddress}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="City"
              name="address.city"
              variant="filled"
              value={formData.address.city}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="State/Province"
              name="address.state"
              variant="filled"
              value={formData.address.state}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="Zip / Postal Code"
              name="address.zipcode"
              variant="filled"
              value={formData.address.zipcode}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <TextField
              label="Phone Number"
              name="address.mobile"
              variant="filled"
              value={formData.address.mobile}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#1F3B53", borderRadius: 1, input: { color: "#DCE3E9" } }}
              InputLabelProps={{ style: { color: "#B0BAC5" } }}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                bgcolor: "rgb(145, 85, 253)",
                color: "#DCE3E9",
                "&:hover": { bgcolor: "rgb(125, 65, 233)" }
              }}
            >
              Save Profile
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Profiles;
