import Cart from "../model/cart.js";
import Product from "../model/product.js";

/**
 * Add item to cart
 */
export async function addToCart(req, res) {
  try {
    const { productId, variantColor, quantity } = req.body;
    const userId = req.user.id; // assuming user is authenticated

    if (!productId || !variantColor || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.find((v) => v.color === variantColor);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantColor === variantColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, variantColor, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(req, res) {
  try {
    const { productId, variantColor } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.variantColor === variantColor
        )
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ length: cart.length, cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
  }
}
/**
 * Update quantity of an item in the cart (increment/decrement)
 */
export async function updateCartQuantity(req, res) {
  try {
    const { productId, variantColor, action } = req.body;
    const userId = req.user.id;

    if (!productId || !variantColor || !action) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variantColor === variantColor
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        // Automatically remove the item if quantity drops to zero
        cart.items = cart.items.filter(
          (i) =>
            !(
              i.product.toString() === productId &&
              i.variantColor === variantColor
            )
        );
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (err) {
    console.error("Update cart quantity error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
