const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (userId, userEmail) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Intervue Pro",
            description: "Unlimited interviews, company filters, AI feedback",
          },
          unit_amount: 999,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.CLIENT_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.CLIENT_URL}/pricing`,
    metadata: {
      userId: userId.toString(),
    },
  });

  return session;
};

const constructWebhookEvent = (payload, signature) => {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
};

module.exports = { createCheckoutSession, constructWebhookEvent };
