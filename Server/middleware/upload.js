import multer from "multer";

// Use memory storage for processing with Sharp
const storage = multer.memoryStorage();

// File filter for image validation
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// Multer upload configuration
export const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "userImage", maxCount: 1 },
  { name: "variant0_front" },
  { name: "variant0_side" },
  { name: "variant0_back" },
  { name: "variant1_front" },
  { name: "variant1_side" },
  { name: "variant1_back" },
]);
