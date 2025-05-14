import ColorOption from "../model/colorOption.js";

// @desc    Get all color options
// @route   GET /api/colors
// @access  Public
export const getColorOptions = async (req, res) => {
  try {
    const colors = await ColorOption.find({ available: true })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({
      success: true,
      count: colors.length,
      data: colors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new color option
// @route   POST /api/colors
// @access  Private/Admin
export const createColorOption = async (req, res) => {
  try {
    const colorOption = new ColorOption(req.body);
    await colorOption.save();

    res.status(201).json({
      success: true,
      data: colorOption,
    });
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
