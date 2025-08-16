const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductC.js");
const authenticate = require("../Middleware/Authenticate.js");

router.get("/", authenticate, productController.getAllProducts);
// router.get("/id/:id", authenticate, productController.findProductById);
router.get("/id/:id", productController.findProductById);
router.get("/homepage", productController.getHomePageProducts); 
router.get("/clothing", productController.getRemainingClothingProducts);


module.exports = router;
