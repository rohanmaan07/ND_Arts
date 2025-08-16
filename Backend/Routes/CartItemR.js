const express=require("express");
const router=express.Router();

const cartItemController = require("../Controllers/CartItemC.js");
const authenticate = require("../Middleware/Authenticate.js");

router.put('/:id', authenticate, cartItemController.updateCartItem);
router.delete('/:id', authenticate, cartItemController.removeCartItem);
// router.get('/:id', authenticate, cartItemController.getCartItemById); // optional

module.exports = router;