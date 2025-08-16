const CartService = require("../Services/CartS");
const Address = require("../Models/address");
const Order = require("../Models/order");
const OrderItem = require("../Models/orderItem");
const User = require("../Models/user");

async function createOrder(user, shippingAddressWrapper) {
  try {
    let address;

    // shippingAddressWrapper me aapka complete object aa raha hai, jisme actual address nested hota hai
    let shippingAddress =
      shippingAddressWrapper?.orderData?.address
        ? shippingAddressWrapper.orderData.address
        : shippingAddressWrapper;

    // *** FIX: Agar shippingAddress object hai to use array me wrap karo, kyunki User model me address field array hai ***
    if (shippingAddress && !Array.isArray(shippingAddress)) {
      shippingAddress = [shippingAddress];  // <-- Yeh fix lagaya hai
    }

    console.log("Extracted shippingAddress:", shippingAddress);

    if (shippingAddress[0]._id) {
      // Agar address pahle se exist karta hai (update/order ke liye)
      address = await Address.findById(shippingAddress[0]._id);
      if (!address) throw new Error("Address not found.");
    } else {
      // Naya address create karna hai (flat object format expected hai)
      // shippingAddress is now an array, so use shippingAddress[0]
      address = new Address({
        firstname: shippingAddress[0].firstname,
        lastname: shippingAddress[0].lastname,
        streetAddress: shippingAddress[0].streetAddress,
        city: shippingAddress[0].city,
        state: shippingAddress[0].state,
        zipcode: shippingAddress[0].zipcode,
        mobile: shippingAddress[0].mobile,
        user: user._id,
      });

      await address.save();

      // User ke addresses me naya address add kar do (ObjectId array me push kar rahe hain, sahi hai)
     await User.findByIdAndUpdate(user._id, {
  address: [address._id]
});

      // shippingAddress ko updated kar do taaki aage address._id mile order ke liye
      shippingAddress[0]._id = address._id;
    }

    // User ka cart fetch karo
    const cart = await CartService.findUserCart(user._id);
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      throw new Error("Cart is empty. Cannot place order.");
    }

    // Order items create karo
    const orderItemIds = [];
    for (const item of cart.cartItems) {
      const productId = item.product._id || item.product;
      if (!productId) throw new Error("Product ID missing in cart item.");

      const orderItem = new OrderItem({
        price: item.price,
        product: productId,
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItemIds.push(createdOrderItem._id);
    }

    // Order create karo (shippingAddress me sirf ObjectId dena hai)
    const newOrder = new Order({
      user: user._id,
      orderItems: orderItemIds,
      totalPrice: cart.totalPrice,
      totalDiscountPrice: cart.totalDiscountPrice || (cart.totalPrice - cart.discount),
      discount: cart.discount,
      totalItem: cart.totalItem,
      shippingAddress: address._id,  // <-- Address ka ObjectId yahan dena zaroori hai
      orderStatus: "PLACED",
      paymentDetails: {
        status: "PENDING",
      },
    });

    const savedOrder = await newOrder.save();

    // Populate karke order return karo
    return await findOrderById(savedOrder._id);
  } catch (error) {
    console.error("Create Order Error:", error);
    throw new Error(`Order creation failed: ${error.message}`);
  }
}


async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({
        path: "orderItems",
        populate: { path: "product" }
      })
      .populate("shippingAddress");

    if (!order) throw new Error("Order not found.");

    return order;
  } catch (error) {
    throw new Error(`Find order failed: ${error.message}`);
  }
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems",
        populate: { path: "product" }
      })
      .populate("shippingAddress")
      .lean();

    return orders;
  } catch (error) {
    throw new Error(`User order history failed: ${error.message}`);
  }
}

async function getAllOrders() {
  try {
    return await Order.find()
      .populate({
        path: "orderItems",
        populate: { path: "product" }
      })
      .populate("user")
      .populate("shippingAddress")
      .lean();
  } catch (error) {
    throw new Error(`Get all orders failed: ${error.message}`);
  }
}

async function updateOrderStatus(orderId, status, paymentStatus = null) {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = status;

    if (paymentStatus) {
      order.paymentDetails.status = paymentStatus;
    }

    return await order.save();
  } catch (error) {
    throw new Error(`Update order status failed: ${error.message}`);
  }
}

// Wrapper functions
const placeOrder = (orderId) => updateOrderStatus(orderId, "PLACED", "COMPLETED");
const confirmOrder = (orderId) => updateOrderStatus(orderId, "CONFIRMED");
const shipOrder = (orderId) => updateOrderStatus(orderId, "SHIPPED");
const deliverOrder = (orderId) => updateOrderStatus(orderId, "DELIVERED");

const cancelOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  if (["DELIVERED", "SHIPPED", "CANCELLED"].includes(order.orderStatus)) {
    throw new Error(`Order cannot be cancelled. Current status: ${order.orderStatus}`);
  }

  order.orderStatus = "CANCELLED";
  order.paymentDetails.status = "REFUNDED";
  return await order.save();
};


async function deleteOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    return await Order.findByIdAndDelete(order._id);
  } catch (error) {
    throw new Error(`Delete order failed: ${error.message}`);
  }
}

const markOrderAsCOD = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  order.paymentDetails.paymentMethod = 'COD';
order.paymentDetails.status = 'Pending'; // Add status field in schema if needed
order.orderStatus = 'Placed';


  await order.save();
  return order;
};
module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
  usersOrderHistory,
  getAllOrders,
  findOrderById,
  markOrderAsCOD
};
