const mongoose = require("mongoose");

const magazineSchema = mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    userName: {
      type: "string",
      required: true,
    },
    sub_title: {
      required: true,
      type: "string",
    },
    content: {
      type: "string",
      required: true,
    },
  },
  { collection: "Magazine" }
);

module.exports = mongoose.model("Magazine", magazineSchema);
