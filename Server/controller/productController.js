import Product from "../model/product.js";

/**
 * Create a new product with color variants
 */
export async function createProduct(req, res) {
  try {
    const { name, description, basePrice, category } = req.body;

    const variants = [];

    let index = 0;
    while (
      req.files[`variant${index}_front`] ||
      req.files[`variant${index}_side`] ||
      req.files[`variant${index}_back`]
    ) {
      const front = req.files[`variant${index}_front`]?.[0]?.filename;
      const side = req.files[`variant${index}_side`]?.[0]?.filename;
      const back = req.files[`variant${index}_back`]?.[0]?.filename;

      if (!front || !side || !back) {
        return res.status(400).json({
          message: `Variant ${index} must have front, side, and back images.`,
        });
      }

      variants.push({
        color: req.body[`variant${index}_color`] || "Default",
        images: {
          front,
          side,
          back,
        },
        stock: parseInt(req.body[`variant${index}_stock`] || "0"),
        price: parseFloat(req.body[`variant${index}_price`] || basePrice),
      });

      index++;
    }

    const newProduct = new Product({
      name,
      description,
      basePrice,
      category,
      variants,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ status: true, product: savedProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

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
