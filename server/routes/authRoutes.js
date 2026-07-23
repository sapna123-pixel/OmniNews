const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});



// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      "mysecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      username: user.username,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;