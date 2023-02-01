const express = require("express");
const router = express.Router();
require("dotenv").config();

const Magazine = require("../../models/Magazine");

router.get("/edit", async (req, res) => {
  const { _id } = req.body;

  const article = await Magazine.findOne({
    _id: _id,
  }).lean();

  if (!article) {
    return res.status(404).json({
      status: "error",
      error: error,
      errorMessage: error.message,
      message: "article not found",
    });
  }

  try {
    const response = await Magazine.updateOne(
      { _id: article._id },
      {
        $set: {
          userName: req.body.userName,
          sub_title: req.body.sub_title,
          title: req.body.title,
          content: req.body.content,
        },
      }
    );

    res.status(202).json({
      status: "202 OK",
      message: "Article updated successfully",
      result: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Article Updating Error",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
