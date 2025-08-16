// DeliveryAddressForm.jsx

import { Button, Grid, TextField, Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Store/OrderAction";
import { getUser } from "../Store/Action";  // <- tumhara import jaisa hai
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#DCE3E9" },
    "&:hover fieldset": { borderColor: "#DCE3E9" },
    "&.Mui-focused fieldset": { borderColor: "#DCE3E9" },
  },
  "& .MuiInputLabel-root": {
    color: "#DCE3E9",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#DCE3E9",
  },
  input: { color: "#DCE3E9" },
  textarea: { color: "#DCE3E9" },
};

const DeliveryAddressForm = ({ setActiveStep, setOrderId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux se user aur uske addresses lo
  const user = useSelector((state) => state.auth.user);

  const [latestAddress, setLatestAddress] = useState(null);

  useEffect(() => {
    if (user?.address && user.address.length > 0) {
      // hamesha latest address lo (backend ne sort karke bheja hoga)
      setLatestAddress(user.address[0]);
    }
  }, [user?.address]);

  // Place order function
  const placeOrder = (address) => {
    const orderData = { user: { _id: user?._id }, address };
    const reqData = { navigate, address };

    dispatch(createOrder({ orderData, reqData }))
      .then((response) => {
        if (response?._id) setOrderId(response._id);
        if (setActiveStep) setActiveStep(2);
        dispatch(getUser()); // ✅ refresh user profile turant
      })
      .catch((error) => {
        console.error("❌ Order creation failed", error);
        alert("Order creation failed, try again!");
      });
  };

  // New address submit
  const handleNewAddress = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipcode: data.get("zip"),
      mobile: data.get("phone"),
    };

    placeOrder(address);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 3,
      }}
    >
      {/* ✅ Agar already address hai to card dikhana */}
      {latestAddress && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#1a1a1a",
            borderRadius: 2,
            color: "#DCE3E9",
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Saved Address
          </Typography>
          <Typography>
            {latestAddress.firstname} {latestAddress.lastname}
          </Typography>
          <Typography>{latestAddress.streetAddress}</Typography>
          <Typography>
            {latestAddress.city}, {latestAddress.state} -{" "}
            {latestAddress.zipcode}
          </Typography>
          <Typography>📞 {latestAddress.mobile}</Typography>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: "rgb(145,85,253)",
              color: "#DCE3E9",
              mt: 2,
              "&:hover": { bgcolor: "rgb(125, 65, 233)" },
            }}
            onClick={() => placeOrder(latestAddress)}
          >
            Deliver to this Address
          </Button>
        </Paper>
      )}

      {/* ✅ New Address Form */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          color: "#DCE3E9",
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Or Add a New Address
        </Typography>

        <form onSubmit={handleNewAddress}>
          <Grid>
            <Grid item xs={12} sm={6} className="mb-3">
              <TextField
                required
                label="First Name"
                name="firstname"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="mb-3">
              <TextField
                required
                label="Last Name"
                name="lastname"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} className="mb-3">
              <TextField
                required
                label="Address"
                name="address"
                fullWidth
                multiline
                rows={4}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="mb-3">
              <TextField
                required
                label="City"
                name="city"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="mb-3">
              <TextField
                required
                label="State/Province"
                name="state"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="mb-3">
              <TextField
                required
                label="Zip / Postal Code"
                name="zip"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Phone Number"
                name="phone"
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  bgcolor: "rgb(145,85,253)",
                  color: "#DCE3E9",
                  mt: 2,
                  "&:hover": { bgcolor: "rgb(125,65,233)" },
                }}
              >
                Save & Deliver
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default DeliveryAddressForm;
