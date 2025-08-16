const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  discountPercent: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  thirdLevelCategory: {
    type: String,
    required: true,
  },

  // ✅ Correct type & ref for populate to work
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // 👈 match with Category model name, not collection
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Use singular model name ("Product") and mongoose will pluralize to "products"
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
