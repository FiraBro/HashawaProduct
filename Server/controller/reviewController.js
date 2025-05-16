import Review from "../model/review.js";
import User from "../model/user.js";
// @desc    Create new review
// @route   POST /api/reviews
// @access  Private

export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId,
      userId: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    // Fetch user profile image
    const user = await User.findById(req.user.id).select("userImage name");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("User fetched:", user);

    const review = new Review({
      productId,
      userId: req.user.id,
      rating,
      title,
      comment,
      images,
      verifiedPurchase: true,
      userImage: user.userImage, // ← attach user's profile image
      userName: user.name, // optional: include user name
    });

    await review.save();

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get recent testimonials (for homepage)
// @route   GET /api/reviews/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Review.find({ rating: { $gte: 4 } })
      .populate("productId", "name mainImage")
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
