import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name of the product"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
