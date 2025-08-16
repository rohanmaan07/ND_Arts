const express = require('express');
const router = express.Router();
const customOrderController = require('../Controllers/CustomC');
const authenticate = require('../Middleware/Authenticate'); // Agar chahiye to user authentication

const multer = require('multer');

// Multer config for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Public route for order creation (with file upload)
router.post(
  '/',
  authenticate, // optional, remove if open to public
  upload.array('photos', 3), // max 3 files
  customOrderController.createCustomOrder
);

// Admin route to get all custom orders
router.get(
  '/',
  authenticate, // optional, secure admin only
  customOrderController.getCustomOrders
);
router.patch(
  '/:id/status',
  authenticate,
  customOrderController.updateOrderStatus
);
module.exports = router;
