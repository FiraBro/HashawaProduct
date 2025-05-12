import Order from "../model/Order.js";
import Cart from "../model/cart.js";

// 📦 Place order from cart
export const placeOrder = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    variantColor: item.variantColor,
    quantity: item.quantity,
    priceAtPurchase: item.product.basePrice, // or handle variant price
  }));

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const newOrder = new Order({
    user: userId,
    items: orderItems,
    totalAmount,
    address: req.body.address, // should come from frontend
    history: [{ status: "placed", date: new Date() }],
  });

  await newOrder.save();
  await Cart.deleteOne({ user: userId });

  res.status(201).json(newOrder);
};

// 📍 Get tracking info
export const getOrderTracking = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate("items.product");

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({
    status: order.status,
    trackingNumber: order.trackingNumber,
    courier: order.courier,
    history: order.history,
    items: order.items,
    totalAmount: order.totalAmount,
    address: order.address,
  });
};

// ⚙️ Update status (admin or webhook)
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  order.history.push({ status, date: new Date() });

  await order.save();

  res.json({ message: "Order status updated", order });
};
