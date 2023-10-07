const mongoose = require("mongoose");

const User = mongoose.model("User", {
  uuid: String,
  age: Number,
});

module.exports = { User };