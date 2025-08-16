const customOrderService = require('../Services/CustomS');

const createCustomOrder = async (req, res) => {
  try {
    const savedOrder = await customOrderService.createCustomOrder(req.body, req.files);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomOrders = async (req, res) => {
  try {
    const orders = await customOrderService.getAllCustomOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await customOrderService.updateOrderStatus(
      req.params.id,
      req.body.isCompleted
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCustomOrder,
  getCustomOrders,
  updateOrderStatus
};
