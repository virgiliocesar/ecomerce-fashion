const express = require("express");
const User = require("./user.model");
const router = express.Router();

//^ register eindpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).send({ message: "Error registering user" });
  }
});

    //^ login eindpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if (!user) {
    return res.status(404).send({ message: "user not found " });
    }

  //^ compare password using bcrypt.compare() method
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).send({ message: "password not match" });
  }
  res.status(200).send({ message: "logged in successfully", user });
});

module.exports = router;
