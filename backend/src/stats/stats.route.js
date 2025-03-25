const express = require("express");
const User = require("../users/user.model");
const Order = require("../orders/orders.model");
const Reviews = require("../reviews/reviews.model");
const Products = require("../products/products.model");
const router = express.Router();

//^ User stats by email.
router.get("/user-stats/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    //^ Sum of all orders
    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;


    //^ get total review
    const totalReviews = await Reviews.countDocuments({ userId: user._id });

    //^ total purchased products
    const purchasedProductIds = await Order.distinct("products.productId", {
      email: email,
    });

    const totalPurchasedProducts = purchasedProductIds.length;
    res.status(200).send({
      totalPaymentsAmount,
      totalReviews,
      totalPurchasedProducts,
    })
    
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).send({ message: "Failed to fetch user stats" });
  }
});

//^ admin status

module.exports = router;