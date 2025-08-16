// controllers/AdminOrderC.js
const OrderService = require("../Services/OrderS");
const Order=require("../Models/order")
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const confirmOrder = async (req, res) => {
    try {
        const order = await OrderService.confirmOrder(req.params.orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const shipOrder = async (req, res) => {
    try {
        const order = await OrderService.shipOrder(req.params.orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deliverOrder = async (req, res) => {
    try {
        const order = await OrderService.deliverOrder(req.params.orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await OrderService.cancelOrder(req.params.orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await OrderService.deleteOrder(req.params.orderId);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    deleteOrder
};
