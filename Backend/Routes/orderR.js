const authenticate = require("../Middleware/Authenticate.js");
const express=require("express");
const router=express.Router();
const orderController = require("../Controllers/OrderC.js");

router.post("/", authenticate, orderController.createOrder);
router.get("/user", authenticate, orderController.orderHistory);
router.get("/:id", authenticate, orderController.findOrderById);
router.put('/:id/cod',authenticate, orderController.placeCODOrder);
router.put('/:id/cancel', authenticate, orderController.cancelUserOrder);


module.exports = router;