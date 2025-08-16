// const OrderService=require("../Services/OrderS");

// const createOrder = async (req, res) => {
//   const user =  req.user;
//   try {
//     let createdOrder = await OrderService.createOrder(user, req.body);
//     return res.status(201).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// const findOrderById = async (req, res) => {
//   const user =await req.user;
//   try {
//     let createdOrder = await OrderService.findOrderById(req.params.id);
//     return res.status(200).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };
// const orderHistory = async (req, res) => {
//   const user = req.user;
//   try {
//     let createdOrder = await OrderService.usersOrderHistory(user._id);
//     return res.status(200).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };
// module.exports={
//     createOrder,findOrderById,orderHistory
// }
const OrderService = require("../Services/OrderS");

const createOrder = async (req, res) => {
  const user = req.user;
  if (!user || !user._id) {
    return res.status(401).send({ error: "User not authenticated" });
  }
  try {
    let createdOrder = await OrderService.createOrder(user, req.body);
    return res.status(201).send(createdOrder);
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).send({ error: "Failed to create order" });
  }
};

const findOrderById = async (req, res) => {
  const user = req.user;
  if (!user || !user._id) {
    return res.status(401).send({ error: "User not authenticated" });
  }
  try {
    // Optionally check here if the user has rights for this order
    let order = await OrderService.findOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }
    // Add permission check if required, for example:
    // if (order.userId.toString() !== user._id.toString()) {
    //   return res.status(403).send({ error: "Access denied" });
    // }
    return res.status(200).send(order);
  } catch (error) {
    console.error("Find Order Error:", error);
    return res.status(500).send({ error: "Failed to fetch order" });
  }
};

const orderHistory = async (req, res) => {
  const user = req.user;
  if (!user || !user._id) {
    return res.status(401).send({ error: "User not authenticated" });
  }
  try {
    let orders = await OrderService.usersOrderHistory(user._id);
    return res.status(200).send(orders);
  } catch (error) {
    console.error("Order History Error:", error);
    return res.status(500).send({ error: "Failed to fetch order history" });
  }
};

const placeCODOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await OrderService.markOrderAsCOD(orderId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // Optionally: ensure the user owns this order
    const updatedOrder = await OrderService.cancelOrder(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, findOrderById, orderHistory,placeCODOrder,cancelUserOrder };
