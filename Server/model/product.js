const mongoose = require("mongoose");
const productShema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide the title"],
  },
  name: {
    type: String,
    required: [true, "please provide a name of the product"],
  },
  price: {
    type: Number,
    required: [true, "please provide a price of the product"],
  },
});

const Product = new mongoose.model("Product", productShema);
module.exports = Product;
