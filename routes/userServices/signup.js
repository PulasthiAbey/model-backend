const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/User");

router.get("/", async (req, res) => {
  res.status(200).json({ message: "this is the signup route" });
});

router.post("/", async (req, res) => {
  const pwd = req.body.password;

  const hashedPassword = await bcrypt.hash(pwd, 10);

  const userFromDb = await User.findOne({
    email: req.body.email,
  }).lean();

  if (userFromDb) {
    return res.status(404).json({
      status: "error",
      error: error,
      message: "user already exists in the database",
    });
  }

  const register = new User({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    userType: req.body.userType,
    mobile: req.body.mobile,
  });

  try {
    const result = await register.save();
    const webToken = jwt.sign(
      {
        userName: register.email,
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: "200 OK",
      token: webToken,
      result: result,
      user: register,
      message: "User created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the user",
    });
  }
});

module.exports = router;
