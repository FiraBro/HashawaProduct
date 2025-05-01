const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name of the product"],
  },
  password: {
    type: String,
    required: [true, "please provide us your password"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
  },
});

const User = new mongoose.model("User", userShema);
module.exports = User;
