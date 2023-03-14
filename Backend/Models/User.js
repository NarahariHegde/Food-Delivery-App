const mongoose = require("mongoose");
// const validator=require("validator");
const data = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: [true, "email id already present"],
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("invalid email");
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", data);
