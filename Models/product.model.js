// product.model.js
const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // Add other fields related to the product if needed
});

// Create the Product model using the defined schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
