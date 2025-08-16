import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../Store/ProductAction";
import { Loader } from "../Pages/Loader";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const categoryOptions = [
  { id: "687e25b8dbdf51db99a55ba4", name: "Men Shirt" },
  { id: "687e27da21dc8cab2ca1e5a0", name: "Saree" },
  { id: "6880e290d66a87db6470324d", name: "Women Tops" },
  { id: "68812769b8b08e4e35bed34b", name: "Women Kurta" },
  { id: "6881294ab8b08e4e35bed42e", name: "Men Pant" },
];

const textFieldStyles = {
  bgcolor: "#23272f",
  borderRadius: 2,
  input: { color: "#DCE3E9" },
  label: { color: "#DCE3E9" },
  "& .MuiOutlinedInput-root": { color: "#DCE3E9" },
};

const Create = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    color: "",
    size: initialSizes,
    thirdLevelCategory: "",
    category: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : name;
    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prev) => ({
      ...prev,
      size: sizes,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const resetForm = () => {
    setProductData({
      title: "",
      description: "",
      price: "",
      discountedPrice: "",
      discountPercent: "",
      quantity: "",
      color: "",
      size: initialSizes,
      thirdLevelCategory: "",
      category: "",
    });
    setSelectedImage(null);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "rohan_mandal");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqrxqpsyv/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwt) {
      setError("JWT token missing! Please login first.");
      return;
    }
    setLoading(true);

    try {
      let imageUrl = "";

      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }

      const formattedData = {
        ...productData,
        imageUrl,
        price: Number(productData.price),
        discountedPrice: Number(productData.discountedPrice),
        discountPercent: productData.discountPercent
          ? Number(productData.discountPercent)
          : 0,
        quantity: Number(productData.quantity),
        size: productData.size.map((s) => ({
          ...s,
          quantity: Number(s.quantity),
        })),
      };

      const res = await dispatch(createProduct({ data: formattedData, jwt }));

      if (res) {
        setSuccess(true);
        resetForm();
      } else {
        setError("Product creation failed!");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: { xs: "100%", md: "70%" }, margin: "0 auto", p: 3}}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          color: "#DCE3E9",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Create New Product
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Title row */}
          <div>
            <TextField
              label="Title"
              name="title"
              required
              fullWidth
              value={productData.title}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </div>
          {/* Description row */}
          <div>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              required
              value={productData.description}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </div>
          {/* Image row */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                marginBottom: "12px",
                color: "#DCE3E9",
                backgroundColor: "#23272f",
                borderRadius: "6px",
                width: "100%",
              }}
              required
            />
          </div>
          {/* Row: Color, Price, Quantity */}
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              label="Color"
              name="color"
              required
              fullWidth
              value={productData.color}
              onChange={handleChange}
              sx={textFieldStyles}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              required
              fullWidth
              value={productData.price}
              onChange={handleChange}
              sx={textFieldStyles}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              required
              fullWidth
              value={productData.quantity}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </div>
          {/* Row: Discounted Price, Discount Percent */}
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              label="Discounted Price"
              name="discountedPrice"
              type="number"
              fullWidth
              value={productData.discountedPrice}
              onChange={handleChange}
              sx={textFieldStyles}
            />
            <TextField
              label="Discount Percent"
              name="discountPercent"
              type="number"
              fullWidth
              value={productData.discountPercent}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </div>
          {/* Sizes & Quantities in one row with spacing */}
          <div style={{ display: "flex", gap: "20px" }}>
            {productData.size.map((s, i) => (
              <TextField
                key={i}
                label={`${s.name} Quantity`}
                name="size_quantity"
                type="number"
                value={s.quantity}
                onChange={(e) => handleSizeChange(e, i)}
                sx={{ ...textFieldStyles, flex: "1" }}
              />
            ))}
          </div>
          {/* Category and Category ID in one row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              select
              label="Category"
              name="thirdLevelCategory"
              fullWidth
              required
              value={productData.thirdLevelCategory}
              onChange={(e) => {
                const selectedCategory = categoryOptions.find(
                  (cat) => cat.name === e.target.value
                );
                setProductData((prev) => ({
                  ...prev,
                  thirdLevelCategory: selectedCategory.name,
                  category: selectedCategory.id,
                }));
              }}
              sx={{ ...textFieldStyles, flex: "1" }}
              SelectProps={{ native: true }}
            >
              <option value="" disabled></option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </TextField>
            <TextField
              label="Category ID"
              name="category"
              fullWidth
              required
              value={productData.category}
              InputProps={{ readOnly: true }}
              sx={{ ...textFieldStyles, flex: "1" }}
            />
          </div>
          {/* Submit button */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            sx={{
              bgcolor: "rgb(145, 85, 253)",
              color: "#DCE3E9",
              mt: 1,
              "&:hover": { bgcolor: "rgb(125, 65, 233)" },
            }}
            disabled={loading}
          >
            Create Product
          </Button>
        </form>
        {/* Snackbar/Alerts */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">Product created successfully!</Alert>
        </Snackbar>
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={3000}
          onClose={() => setError("")}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Create;
