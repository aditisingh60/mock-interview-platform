const User = require("../models/User");
const { createCheckoutSession, constructWebhookEvent } = require("../services/stripeService");

// ─── CREATE CHECKOUT SESSION ─────────────────────────────
const createCheckout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const session = await createCheckoutSession(user._id, user.email);

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ─── STRIPE WEBHOOK ──────────────────────────────────────
const handleWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = constructWebhookEvent(req.body, signature);
  } catch (err) {
    return res.status(400).json({ message: `Webhook error: ${err.message}` });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata.userId;
      await User.findByIdAndUpdate(userId, {
        subscription: "pro",
        stripeSessionId: session.id,
      });
      console.log(`User ${userId} upgraded to Pro ✅`);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;
      if (userId) {
        await User.findByIdAndUpdate(userId, { subscription: "free" });
        console.log(`User ${userId} downgraded to Free ⬇️`);
      }
      break;
    }
    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.json({ received: true });
};

// ─── GET SUBSCRIPTION STATUS ─────────────────────────────
const getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("subscription interviewsToday lastInterviewDate");
    res.status(200).json({ 
      subscription: user.subscription,
      interviewsToday: user.interviewsToday,
      lastInterviewDate: user.lastInterviewDate,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createCheckout, handleWebhook, getSubscriptionStatus };
