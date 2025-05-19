import Product from "../model/product.js"; // Ensure this path is correct
import path from "path";
import fs from "fs";
import sharp from "sharp";

import multer from "multer";
/**
 * Create a new product with color variants
 */

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function productImageResize(req, res, next) {
  if (!req.files) return next();

  try {
    for (const fieldName in req.files) {
      for (const file of req.files[fieldName]) {
        const userId = req.user?.id || "unknown";
        const filename = `${fieldName}-${userId}-${Date.now()}.jpeg`;

        await sharp(file.buffer)
          .resize(1600, 900, {
            fit: "cover", // Crop center to make it square
            position: "center",
          })
          .toFormat("jpeg")
          .jpeg({
            quality: 90,
            progressive: true,
            chromaSubsampling: "4:4:4",
          })
          .toFile(path.join(uploadDir, filename));

        file.filename = filename; // Attach processed filename for later use
      }
    }

    next();
  } catch (err) {
    console.error("Image processing error:", err);
    next(err);
  }
}

export const createProduct = async (req, res) => {
  try {
    // Validate required fields
    const { name, description, basePrice, category } = req.body;
    if (!name || !basePrice || !category) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: name, basePrice, or category",
      });
    }

    // Process variants
    const variants = [];
    let index = 0;
    let hasValidVariant = false;

    while (true) {
      const frontFiles = req.files[`variant${index}_front`] || [];
      const sideFiles = req.files[`variant${index}_side`] || [];
      const backFiles = req.files[`variant${index}_back`] || [];
      const color = req.body[`variant${index}_color`];

      // Stop if no more variants
      if (
        frontFiles.length === 0 &&
        sideFiles.length === 0 &&
        backFiles.length === 0
      )
        break;

      // Validate variant
      if (
        frontFiles.length === 0 ||
        sideFiles.length === 0 ||
        backFiles.length === 0
      ) {
        return res.status(400).json({
          status: false,
          message: `Variant ${index} must have all three images (front, side, back)`,
        });
      }

      if (!color) {
        return res.status(400).json({
          status: false,
          message: `Variant ${index} is missing color`,
        });
      }

      variants.push({
        color,
        images: {
          front: frontFiles[0].filename,
          side: sideFiles[0].filename,
          back: backFiles[0].filename,
        },
        stock: parseInt(req.body[`variant${index}_stock`] || "0"),
        price: parseFloat(req.body[`variant${index}_price`] || basePrice),
      });

      hasValidVariant = true;
      index++;
    }

    if (!hasValidVariant) {
      return res.status(400).json({
        status: false,
        message: "At least one complete variant is required",
      });
    }

    // Create product
    const newProduct = new Product({
      name,
      description,
      basePrice: parseFloat(basePrice),
      category,
      variants,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      status: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "No product found with this ID",
      });
    }

    // Delete variant images
    product.variants.forEach((variant) => {
      ["front", "side", "back"].forEach((view) => {
        const imagePath = path.join(
          "uploads", // Update if your image directory is different
          variant.images[view]
        );

        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete ${view} image:`, err);
            }
          });
        }
      });
    });

    // Now delete product document
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: true,
      message: "Product and associated images deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getAllProduct(req, res, next) {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, basePrice, category } = req.body;

    // Find existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // Update basic fields if provided
    if (name) existingProduct.name = name;
    if (description) existingProduct.description = description;
    if (basePrice) existingProduct.basePrice = parseFloat(basePrice);
    if (category) existingProduct.category = category;

    // Update variants if new ones are provided
    const variants = [];
    let index = 0;
    let hasVariant = false;

    while (true) {
      const frontFiles = req.files?.[`variant${index}_front`] || [];
      const sideFiles = req.files?.[`variant${index}_side`] || [];
      const backFiles = req.files?.[`variant${index}_back`] || [];
      const color = req.body[`variant${index}_color`];

      if (
        frontFiles.length === 0 &&
        sideFiles.length === 0 &&
        backFiles.length === 0 &&
        !color
      ) {
        break;
      }

      if (
        frontFiles.length === 0 ||
        sideFiles.length === 0 ||
        backFiles.length === 0
      ) {
        return res.status(400).json({
          status: false,
          message: `Variant ${index} must have all three images (front, side, back)`,
        });
      }

      if (!color) {
        return res.status(400).json({
          status: false,
          message: `Variant ${index} is missing color`,
        });
      }

      variants.push({
        color,
        images: {
          front: frontFiles[0].filename,
          side: sideFiles[0].filename,
          back: backFiles[0].filename,
        },
        stock: parseInt(req.body[`variant${index}_stock`] || "0"),
        price: parseFloat(req.body[`variant${index}_price`] || basePrice),
      });

      hasVariant = true;
      index++;
    }

    if (hasVariant) {
      // Delete old images before replacing variants
      for (const variant of existingProduct.variants) {
        for (const key of ["front", "side", "back"]) {
          const filePath = path.join("uploads", variant.images[key]);
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.error(`Failed to delete image ${filePath}:`, err);
            }
          }
        }
      }

      existingProduct.variants = variants;
    }

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
