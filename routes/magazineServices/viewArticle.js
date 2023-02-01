const express = require("express");
const router = express.Router();
require("dotenv").config();

const Magazine = require("../../models/Magazine");

router.get("/view_all", async (req, res) => {
  try {
    const user = await Magazine.find();
    res.status(200).json({
      status: "202 OK",
      message: "Articles fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the article list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
