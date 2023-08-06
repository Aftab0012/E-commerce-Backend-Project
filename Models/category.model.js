// category.model.js
const mongoose = require("mongoose");

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add other fields related to the category if needed
});

// Create the Category model using the defined schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
