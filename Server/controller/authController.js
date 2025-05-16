import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Multer configuration for memory storage and image filtering
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware to handle single image upload under field 'userImage'
export const uploadPhoto = upload.single("userImage");

// Middleware to resize user photo and save to disk

export async function userPhotoResize(req, res, next) {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // Ensure directory exists
  const uploadDir = path.join("uploads", "userImage");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadDir, req.file.filename));
  } catch (error) {
    return next(error);
  }

  next();
}

// Utility to filter allowed fields from an object
const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Update current user profile (except password)
export async function updateMe(req, res, next) {
  try {
    if (req.body.password) {
      return res.status(400).json({
        status: "fail",
        message:
          "This is not the right place for updating password, please use reset-password instead!",
      });
    }

    // Filter only allowed fields
    const filteredFields = filterObj(req.body, ["name", "email"]);

    if (req.file) filteredFields.userImage = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredFields,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

// Register new user
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ status: "success", user: newUser, token });
  } catch (error) {
    next(error);
  }
}

// User login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: "success",
      message: "Login successful.",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
}

// Protect middleware to verify JWT token
export async function Protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Middleware to restrict access to certain roles
export function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed, please try again later!",
      });
    }
    next();
  };
}
