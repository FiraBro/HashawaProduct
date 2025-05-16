import Product from "../model/product.js"; // Ensure this path is correct

/**
 * Create a new product with color variants
 */

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
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(400).json({
        status: false,
        message: "No product found with this ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      deletedProduct, // optional: useful for frontend
    });
  } catch (error) {
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
