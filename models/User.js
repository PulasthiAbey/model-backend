const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    password: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      required: true,
      type: "string",
    },
    userType: {
      type: "string",
      required: true,
      default: "COMMON",
    },
    mobile: {
      type: "string",
      required: false,
    },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", registerSchema);
