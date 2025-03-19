const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  try {
    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
            metadata: {
              id: product.id,
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      };
    });

    const sesseion = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ url: sesseion.id });

    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ message: "Error adding products" });
  }
});