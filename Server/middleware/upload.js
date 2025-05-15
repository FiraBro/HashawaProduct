import multer from "multer";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // unique file names
    cb(null, uniqueName);
  },
});

// File type validation (only images allowed)
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
  { name: "variant0_front" },
  { name: "variant0_side" },
  { name: "variant0_back" },
  { name: "variant1_front" },
  { name: "variant1_side" },
  { name: "variant1_back" },
]);
