const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generatetoken");
const router = express.Router();

//^ register endpoint
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

//^ login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found " });
    }

    //^ compare password using bcrypt.compare() method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "password not match" });
    }
    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      message: "logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(400).send({ message: "Error logging in user" });
  }
});

module.exports = router;
