const express = require("express");
const router = express.Router();

const cartController = require("../Controllers/CartC.js");
const authenticate = require("../Middleware/Authenticate.js");

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);
router.delete("/clear", authenticate, cartController.clearCart);

module.exports = router;
