const razorpay = require("../config/razorpay");
const orderService = require("../Services/OrderS");

const createPaymentLink = async (orderId, isCustomize = false, customUser = {}) => {
  try {
    if (isCustomize) {
      // ✅ Custom order (₹300 fixed)
      const order = await razorpay.orders.create({
        amount: 300 * 100,
        currency: "INR",
        receipt: `custom_${Date.now()}`,
      });

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      };
    } else {
      // ✅ Normal store order
      const orderData = await orderService.findOrderById(orderId);
      if (!orderData) throw new Error("Order not found");

      // If delivery charges apply:
      const totalAmount = (orderData.totalPrice + 100) * 100;

      const order = await razorpay.orders.create({
        amount: totalAmount,
        currency: "INR",
        receipt: `order_${orderId}`
      });

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      };
    }
  } catch (error) {
    console.error("Error while creating payment order:", error);
    throw error;
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.razorpay_payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);
    if (!order) throw new Error("Order not found");

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";
      await order.save();
    }

    return { message: "Your order is placed", success: true };
  } catch (error) {
    console.error("Error updating payment info:", error);
    return { message: "Failed to update payment", success: false };
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation
};
