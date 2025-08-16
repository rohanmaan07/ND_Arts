const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Corrected case
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "Quantity cannot be less than 1"]
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  }
}, { timestamps: true }); // <-- Adds createdAt & updatedAt

module.exports = mongoose.model("CartItem", CartItemSchema);
