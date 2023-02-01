const express = require("express");
const router = express.Router();

const Magazine = require("../models/Magazine");

router.get("/", async (req, res) => {
  res.status(200).json({ message: "this is the create new article route" });
});

router.post("/", async (req, res) => {
  const productNew = new Magazine({
    title: req.body.title,
    userName: req.user.userName,
    sub_title: req.body.sub_title,
    content: req.body.content,
  });

  try {
    const result = await productNew.save();
    res.status(201).json({
      status: "200 OK",
      result: result,
      user: productNew,
      message: "Article created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the Article",
    });
  }
});

module.exports = router;
