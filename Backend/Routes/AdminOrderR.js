// routes/adminOrderRoutes.js
const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/AdminOrderC.js");
const authenticate = require("../Middleware/Authenticate.js");

router.get("/", authenticate, orderController.getAllOrders);

router.put('/:orderId/confirmed', authenticate, orderController.confirmOrder);
router.put('/:orderId/ship', authenticate, orderController.shipOrder);
router.put('/:orderId/deliver', authenticate, orderController.deliverOrder);
router.put('/:orderId/cancel', authenticate, orderController.cancelOrder);
router.delete('/:orderId', authenticate, orderController.deleteOrder);

module.exports = router;
