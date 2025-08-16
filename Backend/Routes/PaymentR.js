const express = require("express");
const router = express.Router();
const authenticate = require("../Middleware/Authenticate.js");
const paymentController = require("../Controllers/PaymentC");

// ✅ FIX: Put customize route before /:id route
router.post("/customize", authenticate, paymentController.createPaymentLink);

// Normal order payment
router.post("/:id", authenticate, paymentController.createPaymentLink);

// Payment status update
router.get("/", authenticate, paymentController.updatePaymentInformation);

module.exports = router;
