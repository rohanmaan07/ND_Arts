const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Assume your user model is "users" (ok if so)
        required: true
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem", // Must match your CartItem model name
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0
    },
    totalDiscount: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
