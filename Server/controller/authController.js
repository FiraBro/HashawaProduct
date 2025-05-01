import User from "../model/user";
import jwt from "jsonwebtoken";

/**
 * Handles user registration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = jwt.sign(newUser._id, process.env.SECRET);
    res.status(201).json({ status: "false", user: newUser, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
