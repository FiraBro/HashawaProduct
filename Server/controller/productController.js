import Product from "../model/product.js";

/**
 * Create a new product with color variants
 */
export async function createProduct(req, res) {
  try {
    const { name, description, basePrice, category, variants } = req.body;

    if (
      !name ||
      !variants ||
      !Array.isArray(variants) ||
      variants.length === 0
    ) {
      return res.status(400).json({
        message: "Product name and at least one variant are required.",
      });
    }

    const newProduct = new Product({
      name,
      description,
      basePrice,
      category,
      variants,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      status: true,
      product: savedProduct,
    });
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
