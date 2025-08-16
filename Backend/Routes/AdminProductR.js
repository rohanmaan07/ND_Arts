const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductC.js");
const authenticate = require("../Middleware/Authenticate.js");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  authenticate,
  upload.single("image"),  // yahan 'image' usi naam ka hona chahiye jo frontend se aayega
  productController.createProduct
);

// router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleproducts);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

module.exports = router;
