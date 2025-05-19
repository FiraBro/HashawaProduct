import Review from "../model/review.js";
import User from "../model/user.js";
// @desc    Create new review
// @route   POST /api/reviews
// @access  Private

export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

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

    const review = new Review({
      productId,
      userId: req.user.id, // Just store reference
      rating,
      title,
      comment,
      images,
      verifiedPurchase: true,
    });

    await review.save();

    // Populate user data when returning the review
    const populatedReview = await Review.findById(review._id).populate(
      "userId",
      "name userImage"
    );

    res.status(201).json({
      success: true,
      data: populatedReview,
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
      // .populate("userId", "name avatar")
      console.log(reviews)
      .populate({
        path: "userId",
        select: "name userImage",
      })
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
      .populate("userId", "name userImage")
      .sort({ createdAt: -1 })
      .limit(3);
console.log(testimonials)
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
// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
