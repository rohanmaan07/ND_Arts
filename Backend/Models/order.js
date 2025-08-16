const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
        required: true
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
        required: true
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
            // required: true
        },
        transactionId: {
            type: String
        },
        paymentId: {
            type: String
        },
        status: { type: String },  
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscountPrice: {
        type: Number,
        default: 0
    },
    discount: { type: Number, default: 0 },
    orderStatus: {
        type: String,
        default: "Placed"
    },
    totalItem: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
