const express = require("express");
const Order = require("./orders.model");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//^ create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  try {
    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "BRL",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Error adding products" });
  }
});

//^ confirm paymant

router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      const amount = session.amount_total / 100;
      order = new Order({
        orderId: paymentIntentId,
        amount: amount,
        products: lineItems,
        email: session.customer_details.email,
        status:
          session.payment_intent.status === "succeeded" ? "pendente" : "failed",
      });
    } else {
      order.status =
        session.payment_intent.status === "succeeded" ? "pendente" : "failed";
    }
    await order.save();
    res.json({order});
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Error confirming payment" });
  }
});

module.exports = router;
