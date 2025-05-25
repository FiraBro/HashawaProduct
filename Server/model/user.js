import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
  },
  passwordConfirm: {
    type: String,
  },
  userImage: {
    type: String,
    default: "default.jpg",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
