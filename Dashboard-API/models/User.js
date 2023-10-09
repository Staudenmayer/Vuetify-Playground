const mongoose = require("mongoose");

const User = mongoose.model("User", {
  uuid: String,
  age: Number,
  img: String,
  imgFormat: String,
});

module.exports = { User };