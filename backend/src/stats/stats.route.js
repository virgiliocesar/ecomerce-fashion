import express from "express";
import Stats from "./stats.model";
const router = express.Router();

router.get("/stats", async (req, res) => {
    try {
      const stats = await Stats.find();
      res.status(200).send(stats);
    } catch (error) {
      console.error("Error getting stats:", error);
      res.status(500).send({ message: "Failed to get stats" });
    }
  });