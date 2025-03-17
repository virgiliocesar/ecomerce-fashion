const express = require("express");
const Reviews = require("./reviews.model");
const router = express.Router();

//^ post a new review

router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating,productId, userId } = req.body;

      if(!comment||!rating||!productId||!userId) {
        return  res.status(201).send({ message: "Review added successfully" });
      }

    const existingReview = await Reviews.findOne({productId, userId});
  } catch (error) {
    res.status(500).send({ message: "Failed to post review" });
  }
});
