const express = require("express");
const router = express.Router();
const { createCheckout, handleWebhook, getSubscriptionStatus } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

// Stripe webhook — raw body chahiye
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

// Checkout session create karo
router.post("/create-checkout", authMiddleware, createCheckout);

// Subscription status
router.get("/status", authMiddleware, getSubscriptionStatus);

module.exports = router;
